<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMCategoryType extends BaseType
{

	/**
	 * @param $config
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		parent::triggerEvent([
			'fields' => [
				'id'             => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],
				'alias'          => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],
				'title'          => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Title'),
						'filters' => ['limit'],
					],
				],
				'introtext'      => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Introtext'),
						'filters' => ['limit'],
					],
				],
				'total_products' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Total products'),
					],
				],
				'total_metas'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Total metas'),
					],
				],
				'link'           => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],
				'media'          => [
					'type'       => 'RMCategoryMediaType',
					'metadata'   => [
						'label' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],
				'params'         => [
					'type'       => 'RMCategoryParamsType',
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
		]);
	}

	public static function media($item)
	{
		if ($item->media instanceof Registry)
		{
			return $item->media->toArray();
		}

		return [];
	}

	public static function params($item, $args)
	{
		if ($item->params instanceof Registry)
		{
			return $item->params->toArray();
		}

		return [];
	}

}
