<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class CategoryListType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'id'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],
				'alias'     => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],
				'title'     => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Title'),
						'filters' => ['limit'],
					],
				],
				'introtext' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Introtext'),
						'filters' => ['limit'],
					],
				],
				'media'     => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],
				'link'      => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Category'),
			],
		];
	}

	public static function media($item)
	{
		return $item->media->get('image');
	}

}
