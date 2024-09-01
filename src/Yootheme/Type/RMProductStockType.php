<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMProductStockType
{

	public static function config()
	{
		return [
			'fields' => [
				'all' => [
					'type' => 'String',
					'metadata' => [
						'label' => trans('All'),
					],
				],
			]
		];
	}

}