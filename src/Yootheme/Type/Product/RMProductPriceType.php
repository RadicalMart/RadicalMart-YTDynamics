<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMProductPriceType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'currency'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('currency'),
					],
				],
				'min'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('min'),
					],
				],
				'min_string'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('min_string'),
					],
				],
				'min_seo'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('min_seo'),
					],
				],
				'min_number'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('min_number'),
					],
				],
				'max'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('max'),
					],
				],
				'max_string'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('max_string'),
					],
				],
				'max_seo'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('max_seo'),
					],
				],
				'max_number'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('max_number'),
					],
				],
				'purchase'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('purchase'),
					],
				],
				'purchase_string' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('purchase_string'),
					],
				],
				'purchase_seo'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('purchase_seo'),
					],
				],
				'purchase_number' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('purchase_number'),
					],
				],
				'extra'           => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('extra'),
					],
				],
				'extra_string'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('extra_string'),
					],
				],
				'extra_seo'       => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('extra_seo'),
					],
				],
				'extra_number'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('extra_number'),
					],
				],
				'base'            => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('base'),
					],
				],
				'base_string'     => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('base_string'),
					],
				],
				'base_seo'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('base_seo'),
					],
				],
				'base_number'     => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('base_number'),
					],
				],
				'discount'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('discount'),
					],
				],
				'discount_end'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Discount End'),
					],
				],
				'final'           => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('final'),
					],
				],
				'final_string'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('final_string'),
					],
				],
				'final_seo'       => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('final_seo'),
					],
				],
				'final_number'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('final_number'),
					],
				],
				'benefit'         => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('benefit'),
					],
				],
				'benefit_string'  => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('benefit_string'),
					],
				],
				'benefit_seo'     => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('benefit_seo'),
					],
				],
				'benefit_number'  => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('benefit_number'),
					],
				],
			]
		]);
	}

}