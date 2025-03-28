<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use function YOOtheme\trans;

class RMCustomProductQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'CustomRadicalMartProduct' => [
					'type' => 'RMProductType',

					'args' => [
						'id' => [
							'type' => 'String',
						]
					],

					'metadata' => [
						'label'  => trans('RM Custom Product'),
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
		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Product', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		if (!empty($args['id']))
		{
			$model->setState('product.id', (int)$args['id']);
		}

		// Set language filter state
		$model->setState('filter.language', Multilanguage::isEnabled());

		return $model->getItem();
	}

}
