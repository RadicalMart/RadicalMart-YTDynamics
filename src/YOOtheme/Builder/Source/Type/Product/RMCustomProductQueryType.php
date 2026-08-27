<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use function YOOtheme\trans;

class RMCustomProductQueryType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{
		return [
			'fields' => [
				'customRadicalMartProduct' => [
					'type' => 'RMProductType',

					'args' => [
						'id' => [
							'type' => 'String',
						]
					],

					'metadata' => [
						'label'  => trans('RadicalMart Product by ID'),
						'group'  => trans('RadicalMart'),
						'fields' => [
							'id' => [
								'label'       => trans('Select Manually'),
								'description' => trans('Select product manually'),
								'module'      => 'com_radicalmart',
								'type'        => 'select-item',
								'labels'      => ['type' => trans('Product')],
							],
						],
					],

					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
			],
		];
	}

	public static function resolve($root, array $args)
	{
		if (empty($args['id']))
		{
			return null;
		}

		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Product', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		$model->setState('product.id', (int) $args['id']);
		$model->setState('filter.published', 1);

		// Set language filter state
		$model->setState('filter.language', Multilanguage::isEnabled());

		try
		{
			$product = $model->getItem();
		}
		catch (\Throwable)
		{
			return null;
		}

		if (!$product || !$product->category || (int) ($product->category->state ?? 0) !== 1)
		{
			return null;
		}

		return $product;
	}

}
