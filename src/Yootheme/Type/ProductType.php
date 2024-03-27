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
						'label'   => trans('Title'),
						'filters' => ['limit'],
					],
				],

				'alias' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Alias'),
						'filters' => ['limit'],
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

				'id' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

				'media' => [
					'type'       => 'ImageType',
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

}
