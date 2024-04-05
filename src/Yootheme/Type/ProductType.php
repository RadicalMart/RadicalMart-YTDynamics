<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class ProductType
{
	/**
	 * @return array
	 */
	public static function config()
	{

		return [
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

				'price' => [
					'type'     => 'PriceType',
					'metadata' => [
						'label' => trans('Price'),
					],
				],

				'prices' => [
					'type'     => [
						'listOf' => 'PriceType'
					],
					'metadata' => [
						'label' => trans('Prices'),
					],
				],

				'category' => [
					'type'       => 'CategoryType',
					'metadata'   => [
						'label' => trans('Category'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::category',
					],
				],

				'categories' => [
					'type'     => [
						'listOf' => 'CategoryType'
					],
					'metadata' => [
						'label' => trans('Categories'),
					],
				],

				'mediafirst' => [
					'type'       => 'ProductImageType',
					'metadata'   => [
						'label' => trans('Media first'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::mediaFirst',
					],
				],

				'media' => [
					'type'       => [
						'listOf' => 'ProductImageType'
					],
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],

				'params' => [
					'type'       => 'ProductParamsType',
					'metadata'   => [
						'label' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],

				'fields' => [
					'type'     => [
						'listOf' => 'FieldType'
					],
					'metadata' => [
						'label' => trans('Fields'),
					],
				]
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Product'),
			],
		];

	}

	public static function category($item)
	{
		return $item->category;
	}

	public static function mediaFirst($item, $args)
	{
		$media   = $item->media;
		$gallery = $media->get('gallery');
		$first   = array_shift($gallery);

		return (array) $first;
	}

	public static function media($item, $args)
	{

		$media   = $item->media;
		$gallery = $media->get('gallery');

		return (array) $gallery;
	}

	public static function params($item, $args)
	{
		return $item->params->toArray();
	}

}
