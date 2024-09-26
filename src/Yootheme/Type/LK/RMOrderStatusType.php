<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMOrderStatusType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'id'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

				'title'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					],
				],

				'alias'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],

				'description'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Description'),
					],
				],

				'default'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Default'),
					],
				],

				'params'        => [
					'type'     => 'RMOrderStatusParamsType',
					'metadata' => [
						'label' => trans('params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],
			]
		]);
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