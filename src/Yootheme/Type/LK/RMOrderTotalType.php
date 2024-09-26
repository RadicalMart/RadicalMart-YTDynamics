<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMOrderTotalType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'quantity'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Quantity'),
					],
				],

				'products'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Products'),
					],
				],

				'base'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Base'),
					],
				],

				'fee'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Fee'),
					],
				],

				'final'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Final'),
					],
				],

				'order_discount'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Order discount'),
					],
				],

				'order_discount_event'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Order discount event'),
					],
				],

				'discount'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Discount'),
					],
				],

				'final_string'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Final string'),
					],
				],

				'final_seo'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Final seo'),
					],
				],

				'final_number'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Final number'),
					],
				],

			]
		]);
	}

}