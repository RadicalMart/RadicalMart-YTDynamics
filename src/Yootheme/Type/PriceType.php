<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class PriceType
{

	public static function config()
	{
		return [
			'fields' => [
				'currency' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('currency'),
					],
				],
				'base_string' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('base_string'),
					],
				],
				'base_seo' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('base_seo'),
					],
				],
			]
		];
	}

}