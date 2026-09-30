<?php

namespace Joomla\Plugin\System\YTDynamics\Service;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Registry\Registry;

final class ProductPresentation
{
	/** @var array<int, object> */
	private static array $products = [];

	/** @var array<string, array> */
	private static array $presentations = [];

	public static function get(int $productId, bool $withVariants = true): array
	{
		$cacheKey = $productId . ':' . (int) $withVariants;
		if (isset(self::$presentations[$cacheKey]))
		{
			return self::$presentations[$cacheKey];
		}

		$product = self::load($productId);

		$result = self::normaliseProduct($product);
		$result['variants'] = $withVariants ? self::normaliseVariants($product) : null;

		return self::$presentations[$cacheKey] = $result;
	}

	public static function load(int $productId): object
	{
		if ($productId < 1)
		{
			throw new \InvalidArgumentException(Text::_('PLG_YTDYNAMICS_ERROR_PRODUCT_ID'), 400);
		}

		if (isset(self::$products[$productId]))
		{
			return self::$products[$productId];
		}

		$model = Factory::getApplication()
			->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Product', 'Site', ['ignore_request' => true]);

		if (!$model)
		{
			throw new \RuntimeException(Text::_('PLG_YTDYNAMICS_ERROR_COMPONENT'), 500);
		}

		// Force the public catalogue rules. In particular, never expose an
		// unpublished variant through com_ajax or a builder preview.
		$model->getState();
		$model->setState('filter.published', 1);
		$model->setState('filter.language', Multilanguage::isEnabled());
		$model->setState('product.id', $productId);

		$product = $model->getItem($productId);
		if (!$product || empty($product->id))
		{
			throw new \RuntimeException(Text::_('PLG_YTDYNAMICS_ERROR_PRODUCT_NOT_FOUND'), 404);
		}
		if (empty($product->category) || (int) ($product->category->state ?? 0) !== 1)
		{
			throw new \RuntimeException(Text::_('PLG_YTDYNAMICS_ERROR_PRODUCT_NOT_FOUND'), 404);
		}

		return self::$products[$productId] = $product;
	}

	private static function normaliseProduct(object $product): array
	{
		$price = isset($product->price) && is_array($product->price) ? $product->price : [];
		$quantity = isset($product->quantity) && is_array($product->quantity) ? $product->quantity : [];

		return [
			'id'        => (int) $product->id,
			'title'     => (string) ($product->title ?? ''),
			'code'      => (string) ($product->code ?? ''),
			'link'      => self::absoluteUrl((string) ($product->link ?? '')),
			'introtext' => trim(strip_tags((string) ($product->introtext ?? ''))),
			'introtextHtml' => (string) ($product->introtext ?? ''),
			'fulltext' => trim(strip_tags((string) ($product->fulltext ?? ''))),
			'fulltextHtml' => (string) ($product->fulltext ?? ''),
			'inStock'   => !empty($product->in_stock),
			'quantity'  => [
				'min'  => (float) ($quantity['min'] ?? 1),
				'max'  => isset($quantity['max']) && (float) $quantity['max'] > 0
					? (float) $quantity['max'] : null,
				'step' => (float) ($quantity['step'] ?? 1),
			],
			'price'     => [
				'final'           => (string) ($price['final_string'] ?? ''),
				'base'            => (string) ($price['base_string'] ?? ''),
				'discount'        => (string) ($price['discount_string'] ?? ''),
				'discountEnabled' => !empty($price['discount_enable']),
			],
			'media'     => self::normaliseMedia($product),
			'fieldsets' => self::normaliseFieldsets($product),
		];
	}

	private static function normaliseFieldsets(object $product): array
	{
		$fieldsets = [];
		$variantAliases = array_fill_keys(array_map(
			static fn($alias): string => (string) $alias,
			array_keys((array) ($product->variability->fields ?? [])),
		), true);

		foreach ((array) ($product->fieldsets ?? []) as $fieldsetKey => $fieldset)
		{
			if (!is_object($fieldset))
			{
				continue;
			}

			$fields = [];
			foreach ((array) ($fieldset->fields ?? []) as $fieldKey => $field)
			{
				if (!is_object($field) || !isset($field->value) || $field->value === false)
				{
					continue;
				}

				$value = is_scalar($field->value) ? (string) $field->value : '';
				if (trim($value) === '')
				{
					continue;
				}

				$alias = (string) ($field->alias ?? $fieldKey);
				$textValue = preg_replace('#<br\s*/?>#i', ' · ', $value) ?? $value;
				$fields[] = [
					'alias' => $alias,
					'title' => (string) ($field->title ?? $alias),
					'value' => $value,
					'text' => trim(html_entity_decode(strip_tags($textValue), ENT_QUOTES | ENT_HTML5, 'UTF-8')),
					'variant' => isset($variantAliases[$alias]),
				];
			}

			if (!$fields)
			{
				continue;
			}

			$alias = (string) ($fieldset->alias ?? $fieldsetKey);
			$fieldsets[] = [
				'alias' => $alias,
				'title' => (string) ($fieldset->title ?? ''),
				'fields' => $fields,
			];
		}

		return $fieldsets;
	}

	private static function normaliseVariants(object $product): ?array
	{
		$variability = $product->variability ?? false;
		if (!$variability || empty($variability->products) || empty($variability->fields))
		{
			return null;
		}

		$products = [];
		foreach ($variability->products as $variant)
		{
			if (empty($variant->id) || empty($variant->fieldsVariability))
			{
				continue;
			}

			$fields = [];
			foreach ($variant->fieldsVariability as $alias => $value)
			{
				$fields[(string) $alias] = (string) $value;
			}

			$products[] = [
				'id'      => (int) $variant->id,
				'title'   => (string) ($variant->title ?? ''),
				'link'    => self::absoluteUrl((string) ($variant->link ?? '')),
				'inStock' => !empty($variant->in_stock),
				'fields'  => $fields,
			];
		}

		$fields = [];
		foreach ($variability->fields as $alias => $field)
		{
			$values = array_values(array_unique(array_map(
				static fn($value): string => (string) $value,
				(array) ($variability->fieldValues[$alias] ?? [])
			)));
			if (!$values)
			{
				continue;
			}

			$optionMap = [];
			foreach ((array) ($field->options ?? []) as $option)
			{
				$option = is_object($option) ? get_object_vars($option) : (array) $option;
				if (!array_key_exists('value', $option))
				{
					continue;
				}

				$optionMap[(string) $option['value']] = [
					'label' => Text::_((string) ($option['text'] ?? $option['value'])),
					'image' => self::absoluteUrl((string) ($option['image'] ?? $option['src'] ?? '')),
					'color' => (string) ($option['color'] ?? ''),
				];
			}

			$options = [];
			foreach ($values as $value)
			{
				$option = $optionMap[$value] ?? [];
				$options[] = [
					'value' => $value,
					'label' => (string) ($option['label'] ?? $value),
					'image' => (string) ($option['image'] ?? ''),
					'color' => (string) ($option['color'] ?? ''),
				];
			}

			$fields[] = [
				'alias'   => (string) $alias,
				'title'   => (string) ($field->title ?? $alias),
				'options' => $options,
			];
		}

		return $fields && $products ? [
			'metaId'         => (int) ($variability->id ?? 0),
			'currentProduct' => (int) $product->id,
			'fields'         => $fields,
			'products'       => $products,
		] : null;
	}

	private static function normaliseMedia(object $product): array
	{
		$media = $product->media ?? new Registry();
		if (!$media instanceof Registry)
		{
			$media = new Registry($media);
		}

		$items = [];
		$seen = [];
		$add = static function (string $src, string $alt = '') use (&$items, &$seen, $product): void {
			$src = self::absoluteUrl($src);
			if ($src === '' || isset($seen[$src]))
			{
				return;
			}
			$seen[$src] = true;
			$items[] = ['src' => $src, 'alt' => $alt !== '' ? $alt : (string) ($product->title ?? '')];
		};

		$add((string) $media->get('image', ''));
		foreach ((array) $media->get('gallery', []) as $item)
		{
			$item = is_object($item) ? get_object_vars($item) : (array) $item;
			if (($item['type'] ?? 'image') !== 'image')
			{
				continue;
			}
			$add((string) ($item['src'] ?? ''), (string) ($item['alt'] ?? ''));
		}

		return $items;
	}

	private static function absoluteUrl(string $url): string
	{
		$url = trim($url);
		if ($url === '' || preg_match('#^(?:https?:)?//#i', $url))
		{
			return $url;
		}

		return rtrim(Uri::root(), '/') . '/' . ltrim($url, '/');
	}
}
