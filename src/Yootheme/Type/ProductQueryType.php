<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class ProductQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'product'     => [
					'type'       => 'ProductType',
					'metadata'   => [
						'label' => trans('Product'),
						'view'  => ['com_radicalmart.product'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
				'productMeta' => [
					'type'       => [
						'listOf' => 'ProductListType'
					],
					'metadata'   => [
						'label' => trans('ProductMeta'),
						'view'  => ['com_radicalmart.product'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::meta',
					],
				],
			],
		];
	}

	public static function resolve($root)
	{
		if (isset($root['product']))
		{
			return $root['product'];
		}

		if (isset($root['item']))
		{
			return $root['item'];
		}
	}

	public static function meta($root)
	{
		return $root['variability']->products;
	}

}
