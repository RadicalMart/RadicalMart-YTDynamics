<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Categories\Categories;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCustomCategoryQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'CustomRadicalMartCategory' => [
					'type' => 'RMCategoryType',

					'args' => [
						'id' => [
							'type' => 'Int',
						],
					],

					'metadata' => [
						'label'  => trans('Custom Category'),
						'group'  => trans('RadicalMart'),
						'fields' => [
							'id' => [
								'label'        => trans('Category'),
								'type'         => 'select',
								'defaultIndex' => 0,
								'options'      => [['evaluate' => 'yootheme.builder.radicalmart_categories']],
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
			->createModel('Category', 'Site', ['ignore_request' => true]);

		return $model->getItem($args['id']);
	}
}
