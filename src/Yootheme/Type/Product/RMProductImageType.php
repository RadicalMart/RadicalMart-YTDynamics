<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMProductImageType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'src' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Src'),
					],
				],
				'alt' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alt'),
					],
				],
			]
		]);
	}

}