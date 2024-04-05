<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class ProductListType
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

				'title' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					],
				],

				'link' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],

				'introtext' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Introtext'),
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


				'fields' => [
					'type'     => [
						'listOf' => 'FieldType'
					],
					'metadata' => [
						'label' => trans('Fields'),
					],
				],

				'params' => [
					'type'       => 'ParamsType',
					'metadata'   => [
						'label' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],

				'media' => [
					'type'       => 'ProductImageType',
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
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
		$first   = array_shift($gallery);

		return (array) $first;
	}

	public static function params($item, $args)
	{
		return $item->params->toArray();
	}

}
