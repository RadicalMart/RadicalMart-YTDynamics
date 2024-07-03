<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCategoriesQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'category'   => [
					'type'       => 'RMCategoryType',
					'args'       => [
						'offset' => [
							'type' => 'Int',
						],
					],
					'metadata'   => [
						'label'  => trans('Category'),
						'view'   => ['com_radicalmart.category'],
						'group'  => trans('Page'),
						'fields' => [
							'offset' => [
								'label'       => trans('Start'),
								'description' => trans(
									'Set the starting point to specify which article is loaded.',
								),
								'type'        => 'number',
								'default'     => 0,
								'modifier'    => 1,
								'attrs'       => [
									'min'      => 1,
									'required' => true,
								],
							],
						],
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolveSingle',
					],
				],
				'categories' => [
					'type'       => [
						'listOf' => 'RMCategoryType',
					],
					'args'       => [
						'offset' => [
							'type' => 'Int',
						],
						'limit'  => [
							'type' => 'Int',
						],
					],
					'metadata'   => [
						'label'  => trans('Categories'),
						'view'   => ['com_radicalmart.categories'],
						'group'  => trans('Page'),
						'fields' => [
							'_offset' => [
								'description' => trans(
									'Set the starting point and limit the number of articles.',
								),
								'type'        => 'grid',
								'width'       => '1-2',
								'fields'      => [
									'offset' => [
										'label'    => trans('Start'),
										'type'     => 'number',
										'default'  => 0,
										'modifier' => 1,
										'attrs'    => [
											'min'      => 1,
											'required' => true,
										],
									],
									'limit'  => [
										'label' => trans('Quantity'),
										'type'  => 'limit',
										'attrs' => [
											'placeholder' => trans('No limit'),
											'min'         => 0,
										],
									],
								],
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
		$args += [
			'offset' => 0,
			'limit'  => null,
		];

		if (isset($root['items']))
		{
			$items = $root['items'];

			if ($args['offset'] || $args['limit'])
			{
				$items = array_slice($items, (int) $args['offset'], (int) $args['limit'] ?: null);
			}

			return $items;
		}
	}

	public static function resolveSingle($root, array $args)
	{
		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Categories', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
		$model->setContext('context');

		$category = $root['category'];
		$model->setState('category.id', (int) $category->id);
		$category->child = $model->getItems();

		return $category;
	}

}
