<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Layout\LayoutHelper;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMProductType extends BaseType
{
	/**
	 * @return array
	 */
	public static function config()
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
				],

				'in_stock' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('In stock'),
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
					],
					'extensions' => [
						'call' => __CLASS__ . '::stock',
					],
				],

				'price' => [
					'type'     => 'RMProductPriceType',
					'metadata' => [
						'label' => trans('Price'),
					],
				],

				'prices' => [
					'type'     => [
						'listOf' => 'RMProductPriceType'
					],
					'metadata' => [
						'label' => trans('Prices'),
					],
				],

				'category' => [
					'type'       => 'RMCategoryType',
					'metadata'   => [
						'label' => trans('Category'),
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
					],
				],

				'mediafirst' => [
					'type'       => 'RMProductImageType',
					'metadata'   => [
						'label' => trans('Media first'),
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
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],

				'params' => [
					'type'       => 'RMProductParamsType',
					'metadata'   => [
						'label' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],

				'plugins' => [
					'type'       => 'RMProductPluginsType',
					'metadata'   => [
						'label' => trans('Plugins'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::plugins',
					],
				],

				'fields' => [
					'type'     => [
						'listOf' => 'RMFieldType'
					],
					'metadata' => [
						'label' => trans('Fields'),
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
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Product'),
			],
		]);
	}

	public static function category($item)
	{
		return $item->category;
	}

	public static function mediaFirst($item, $args)
	{
		$result = [];

		if (!empty($item->media))
		{
			$media   = $item->media;
			$gallery = (array) $media->get('gallery');
			$result   = array_shift($gallery);

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
		return $item->stock;
	}

	public static function params($item, $args)
	{
		if ($item->params instanceof Registry)
		{
			return $item->params->toArray();
		}

		return [];
	}

	public static function plugins($item, $args)
	{

		if ($item->plugins instanceof Registry)
		{
			return $item->plugins->toArray();
		}

		return [];
	}

	public static function favorite($item, $args)
	{
		$result  = [];
		$context = 'com_radicalmart.product';

		// Display stats
		$active   = \Joomla\Component\RadicalMartFavorites\Site\Helper\FavoritesHelper::checkActive($item->id);
		$result[] = LayoutHelper::render('components.radicalmart_favorites.buttons.toggle', ['product_id' => $item->id, 'active' => $active, 'context' => $context]);

		return implode("\n", $result);
	}

	public static function event($article)
	{
		return $article;
	}

}
