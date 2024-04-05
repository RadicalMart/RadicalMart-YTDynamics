<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class CategoryType
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
				'link'      => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],
				'media'     => [
					'type'       => 'CategoryMediaType',
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],
				'params'    => [
					'type'       => 'CategoryParamsType',
					'metadata'   => [
						'label' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
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
		return $item->media->toArray();
	}

	public static function params($item, $args)
	{
		return $item->params->toArray();
	}

}
