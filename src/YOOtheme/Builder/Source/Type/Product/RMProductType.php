<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMProductType extends BaseType
{
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

		if (!array_key_exists($id, $values))
		{
			try
			{
				$model = Factory::getApplication()->bootComponent('com_radicalmart')
					->getMVCFactory()
					->createModel('Product', 'Site', ['ignore_request' => true]);
				$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
				$model->setState('filter.published', 1);
				$model->setState('filter.language', Multilanguage::isEnabled());
				$product = $model->getItem($id);
				$values[$id] = $product ? (string) ($product->fulltext ?? '') : '';
			}
			catch (\Throwable)
			{
				$values[$id] = '';
			}
		}

		return $values[$id];
	}

	public static function image($item): string
	{
		$image = $item->image ?? null;

		if (!$image && ($item->media ?? null) instanceof Registry)
		{
			$image = $item->media->get('image');
		}

		return (string) ($image ?: static::getParam('product.medianotfound', ''));
	}

	public static function mediaFirst($item, $args)
	{
		$result = null;

		if (!empty($item->media))
		{
			$media   = $item->media;
			$gallery = (array) $media->get('gallery');
			$result  = array_shift($gallery);

			if (empty($result))
			{
				$not_found = static::getParam('product.medianotfound');

				if (!empty($not_found))
				{
					$result = ['src' => $not_found, 'alt' => $item->title];
				}
			}
		}

		return $result;
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
