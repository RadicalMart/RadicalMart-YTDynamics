<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMProductType
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
					'type'     => 'RMPriceType',
					'metadata' => [
						'label' => trans('Price'),
					],
				],

				'prices' => [
					'type'     => [
						'listOf' => 'RMPriceType'
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

				'fields' => [
					'type'     => [
						'listOf' => 'RMFieldType'
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
		if($item->params instanceof Registry)
		{
			return $item->params->toArray();
		}

		return [];
	}

}
