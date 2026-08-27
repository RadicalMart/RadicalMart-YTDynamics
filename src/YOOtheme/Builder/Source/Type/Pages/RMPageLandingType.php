<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Pages;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMPageLandingType extends BaseType
{

	public static function config(): array
	{
		return parent::triggerEvent([
			'fields' => [
				'title'     => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					]
				],
				'introtext' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Intro text'),
					]
				],
				'params'    => [
					'type'       => 'RMPageLandingParamsType',
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
				'label' => trans('Page'),
			],
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