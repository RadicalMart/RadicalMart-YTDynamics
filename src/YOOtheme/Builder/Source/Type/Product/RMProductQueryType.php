<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMProductQueryType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config(): array
	{
		return [
			'fields' => [
				'radicalMartProduct'     => [
					'type'       => 'RMProductType',
					'metadata'   => [
						'label' => trans('RadicalMart Product'),
						'view'  => ['com_radicalmart.product'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
				'radicalMartProductMeta' => [
					'type'       => [
						'listOf' => 'RMProductMetaType'
					],
					'metadata'   => [
						'label' => trans('RadicalMart Product Metadata'),
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
		if (($root['template'] ?? 'com_radicalmart.product') !== 'com_radicalmart.product')
		{
			return null;
		}

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
		if (
			($root['template'] ?? 'com_radicalmart.product') !== 'com_radicalmart.product'
			|| empty($root['variability'])
			|| empty($root['variability']->products)
		)
		{
			return [];
		}

		$id       = (int) Factory::getApplication()->getInput()->get('id');
		$products = $root['variability']->products;

		foreach ($products as &$product)
		{
			if ($product->id === $id)
			{
				$product->isActive = true;
			}
			else
			{
				$product->isActive = false;
			}
		}

		return $products;
	}

}
