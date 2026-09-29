<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product;

use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMProductType extends BaseType
{
	private static array $imageCache = [];

	/**
	 * @return array
	 */
	public static function config(): array
	{

		return parent::triggerEvent([
			'fields' => [

				'id' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

				'link' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],

				'title' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					],
				],

				'introtext' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Introtext'),
					],
				],

				'fulltext' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Fulltext'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::fulltext',
					],
				],

				'in_stock' => [
					'type'     => 'Boolean',
					'metadata' => [
						'label' => trans('In stock'),
						'group' => trans('Checkout'),
					],
				],

				'alias' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],

				'code' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Code'),
					],
				],

				'stock' => [
					'type'       => 'RMProductStockType',
					'metadata'   => [
						'label' => trans('Stock'),
						'group' => trans('Checkout'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::stock',
					],
				],

				'price' => [
					'type'     => 'RMProductPriceType',
					'metadata' => [
						'label' => trans('Price'),
						'group' => trans('Prices'),
					],
				],

				'prices' => [
					'type'     => [
						'listOf' => 'RMProductPriceType'
					],
					'metadata' => [
						'label' => trans('Prices'),
						'group' => trans('Prices'),
					],
				],

				'category' => [
					'type'       => 'RMCategoryType',
					'metadata'   => [
						'label' => trans('Category'),
						'group' => trans('Categories'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::category',
					],
				],

				'categories' => [
					'type'     => [
						'listOf' => 'RMCategoryType'
					],
					'metadata' => [
						'label' => trans('Categories'),
						'group' => trans('Categories'),
					],
				],

				'image' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Image'),
						'group' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::image',
					],
				],

				'mediafirst' => [
					'type'       => 'RMProductImageType',
					'metadata'   => [
						'label' => trans('Media first'),
						'group' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::mediaFirst',
					],
				],

				'media' => [
					'type'       => [
						'listOf' => 'RMProductImageType'
					],
					'metadata'   => [
						'label' => trans('Media'),
						'group' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],

				'params' => [
					'type'       => 'RMProductParamsType',
					'metadata'   => [
						'label' => trans('Params'),
						'group' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],

				'plugins' => [
					'type'       => 'RMProductPluginsType',
					'metadata'   => [
						'label' => trans('Plugins'),
						'group' => trans('Plugins'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::plugins',
					],
				],

				'fields' => [
					'type'     => [
						'listOf' => 'RMFieldType'
					],
				],

				'favorite' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Favorite'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::favorite',
					],
				],

				'compare' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Compare'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::compare',
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Product'),
			],
		]);
	}

	public static function category($item)
	{
		return $item->category ?? null;
	}

	public static function fulltext($item): string
	{
		if (property_exists($item, 'fulltext'))
		{
			return (string) $item->fulltext;
		}

		static $values = [];
		$id = (int) ($item->id ?? 0);
		if (!$id)
		{
			return '';
		}

		$isMeta = property_exists($item, 'products');
		$cacheKey = ($isMeta ? 'meta:' : 'product:') . $id;

		if (!array_key_exists($cacheKey, $values))
		{
			try
			{
				$db = Factory::getContainer()->get(DatabaseInterface::class);
				$query = $db->createQuery()
					->select($db->quoteName('fulltext'))
					->from($db->quoteName($isMeta ? '#__radicalmart_metas' : '#__radicalmart_products'))
					->where($db->quoteName('id') . ' = :id')
					->where($db->quoteName('state') . ' = 1')
					->bind(':id', $id, ParameterType::INTEGER);

				if (Multilanguage::isEnabled())
				{
					$query->whereIn(
						$db->quoteName('language'),
						[Factory::getApplication()->getLanguage()->getTag(), '*'],
						ParameterType::STRING,
					);
				}

				$values[$cacheKey] = (string) ($db->setQuery($query)->loadResult() ?? '');
			}
			catch (\Throwable)
			{
				$values[$cacheKey] = '';
			}
		}

		return $values[$cacheKey];
	}

	public static function hydrateImages(array $items): void
	{
		$itemsByVariantId = [];

		foreach ($items as $item)
		{
			if (!is_object($item) || !empty($item->image))
			{
				continue;
			}

			if (($item->media ?? null) instanceof Registry)
			{
				$image = $item->media->get('image');

				if (!empty($image))
				{
					$item->image = $image;
					continue;
				}
			}

			$products = $item->products ?? [];

			if ($products instanceof Registry)
			{
				$products = $products->toArray();
			}
			elseif ($products instanceof \Traversable)
			{
				$products = iterator_to_array($products, false);
			}
			elseif (!is_array($products))
			{
				$products = (array) $products;
			}

			$variant = reset($products);
			$variantId = is_array($variant)
				? (int) ($variant['id'] ?? 0)
				: (int) (is_object($variant) ? ($variant->id ?? 0) : 0);

			if ($variantId > 0)
			{
				if (array_key_exists($variantId, self::$imageCache))
				{
					if (self::$imageCache[$variantId] !== '')
					{
						$item->image = self::$imageCache[$variantId];
					}

					continue;
				}

				$itemsByVariantId[$variantId][] = $item;
			}
		}

		if (!$itemsByVariantId)
		{
			return;
		}

		try
		{
			$variantIds = array_keys($itemsByVariantId);
			foreach ($variantIds as $variantId)
			{
				self::$imageCache[$variantId] = '';
			}

			$db = Factory::getContainer()->get(DatabaseInterface::class);
			$query = $db->createQuery()
				->select([$db->quoteName('id'), $db->quoteName('media')])
				->from($db->quoteName('#__radicalmart_products'))
				->whereIn($db->quoteName('id'), $variantIds, ParameterType::INTEGER)
				->where($db->quoteName('state') . ' = 1');

			if (Multilanguage::isEnabled())
			{
				$query->whereIn(
					$db->quoteName('language'),
					[Factory::getApplication()->getLanguage()->getTag(), '*'],
					ParameterType::STRING,
				);
			}

			foreach ($db->setQuery($query)->loadAssocList('id') as $variantId => $variant)
			{
				$image = (string) (new Registry($variant['media'] ?? ''))->get('image', '');
				self::$imageCache[(int) $variantId] = $image;
			}

			foreach ($itemsByVariantId as $variantId => $variantItems)
			{
				$image = self::$imageCache[$variantId] ?? '';
				if ($image === '')
				{
					continue;
				}

				foreach ($variantItems as $item)
				{
					$item->image = $image;
				}
			}
		}
		catch (\Throwable)
		{
			// Keep source resolution working when RadicalMart cannot load a variant.
		}
	}

	public static function image($item): string
	{
		$image = $item->image ?? null;

		if (!$image && ($item->media ?? null) instanceof Registry)
		{
			$image = $item->media->get('image');
		}

		return static::normalizeImagePath($image ?: static::getParam('product.medianotfound', ''));
	}

	public static function mediaFirst($item, $args): array
	{
		$image = '';

		if (($item->media ?? null) instanceof Registry)
		{
			$gallery = (array) $item->media->get('gallery');
			$first = reset($gallery);

			if ($first instanceof Registry)
			{
				$image = $first->get('src', '');
			}
			elseif (is_array($first))
			{
				$image = $first['src'] ?? '';
			}
			elseif (is_object($first))
			{
				$image = $first->src ?? '';
			}
			elseif (is_string($first))
			{
				$image = $first;
			}
		}

		$image = static::normalizeImagePath($image);

		return [
			'src' => $image ?: static::image($item),
			'alt' => (string) ($item->title ?? ''),
		];
	}

	private static function normalizeImagePath(mixed $image): string
	{
		if (!is_scalar($image) && !($image instanceof \Stringable))
		{
			return '';
		}

		$image = trim((string) $image);

		if (
			$image === ''
			|| str_starts_with($image, '/')
			|| preg_match('#^[a-z][a-z0-9+.-]*:#i', $image)
		)
		{
			return $image;
		}

		return '/' . $image;
	}

	public static function media($item, $args)
	{

		$result = [];

		if (!empty($item->media))
		{
			$media  = $item->media;
			$result = (array) $media->get('gallery');

			if (empty($result))
			{
				$not_found = static::getParam('product.medianotfound');

				if (!empty($not_found))
				{
					$result[] = ['src' => $not_found, 'alt' => $item->title];
				}
			}
		}

		return $result;
	}

	public static function stock($item)
	{
		return $item->stock ?? null;
	}

	public static function params($item, $args)
	{
		if (($item->params ?? null) instanceof Registry)
		{
			return $item->params->toArray();
		}

		return [];
	}

	public static function plugins($item, $args)
	{

		if (($item->plugins ?? null) instanceof Registry)
		{
			return $item->plugins->toArray();
		}

		return [];
	}

	public static function favorite($item, $args)
	{
		$helper = \Joomla\Component\RadicalMartFavorites\Site\Helper\FavoritesHelper::class;
		if (!class_exists($helper))
		{
			return '';
		}

		$result  = [];
		$context = 'com_radicalmart.product';

		// Display stats
		$active   = $helper::checkActive($item->id);
		$result[] = LayoutHelper::render('components.radicalmart_favorites.buttons.toggle', ['product_id' => $item->id, 'active' => $active, 'context' => $context]);

		return implode("\n", $result);
	}

	public static function compare($item, $args)
	{
		$helper = \Joomla\Component\RadicalMartCompare\Site\Helper\CompareHelper::class;
		if (!class_exists($helper) || empty($item->category->id))
		{
			return '';
		}

		$result  = [];
		$context = 'com_radicalmart.product';

		// Display stats
		$active   = $helper::checkActive($item->id);
		$result[] = LayoutHelper::render('components.radicalmart_compare.buttons.toggle', [
			'product_id' => $item->id,
			'category_id' => $item->category->id,
			'active' => $active,
			'context' => $context
		]);

		return implode("\n", $result);
	}

	public static function event($article)
	{
		return $article;
	}

}
