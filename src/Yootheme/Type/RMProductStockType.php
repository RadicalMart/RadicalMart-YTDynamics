<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMProductStockType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'all' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('All'),
					],
				],
			]
		]);
	}

}