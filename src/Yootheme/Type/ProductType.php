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

				'categories' => [
					'type'       => 'CategoryType',
					'metadata'   => [
						'label' => trans('Category'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::category',
					],
				],

				'link' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],

				'id' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

				'media' => [
					'type'       => [
						'listOf' => 'ImageType'
					],
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],

				'fields' => [
					'type'       => [
						'listOf' => 'FieldType'
					],
					'metadata'   => [
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
		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Categories', 'Administrator', ['ignore_request' => true]);

		return $model->getItem($item->catid);
	}

	public static function media($item, $args)
	{

		$media   = $item->media;
		$gallery = $media->get('gallery');

		return (array) $gallery;
	}

}
