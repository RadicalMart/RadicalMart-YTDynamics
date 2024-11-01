<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use function YOOtheme\trans;

class RMProductQueryType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		return [
			'fields' => [
				'RadicalMartProduct'     => [
					'type'       => 'RMProductType',
					'metadata'   => [
						'label' => trans('Product'),
						'view'  => ['com_radicalmart.product'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
				'RadicalMartProductMeta' => [
					'type'       => [
						'listOf' => 'RMProductType'
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
