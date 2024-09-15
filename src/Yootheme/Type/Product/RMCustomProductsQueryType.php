<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCustomProductsQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'CustomRadicalMartProducts' => [
					'type' => [
						'listOf' => 'RMProductType'
					],

					'args' => [
						'category'        => [
							'type' => [
								'listOf' => 'Int',
							],
						],
						'ids'             => [
							'type' => 'String',
						],
						'offset'          => [
							'type' => 'Int',
						],
						'limit'           => [
							'type' => 'Int',
						],
						'order'           => [
							'type' => 'String',
						],
						'order_direction' => [
							'type' => 'String',
						],
						'order_alphanum'  => [
							'type' => 'Boolean',
						],
					],

					'metadata' => [
						'label'  => trans('RM Custom Products'),
						'group'  => trans('RadicalMart'),
						'fields' => [
							'category'       => [
								'label'   => trans('Filter by category'),
								'type'    => 'select',
								'default' => [],
								'options' => [['evaluate' => 'yootheme.builder.radicalmart_categories']],
								'attrs'   => [
									'multiple' => true,
									'class'    => 'uk-height-small',
								],
							],
							'ids'            => [
								'label'   => trans('Filter by IDs'),
								'type'    => 'text',
								'default' => '',
							],
							'_offset'        => [
								'description' => trans(
									'Set the starting point and limit the number of articles.'
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
										'label'   => trans('Quantity'),
										'type'    => 'limit',
										'default' => 10,
										'attrs'   => [
											'min' => 1,
										],
									],
								],
							],
							'_order'         => [
								'type'   => 'grid',
								'width'  => '1-2',
								'fields' => [
									'order'           => [
										'label'   => trans('Order'),
										'type'    => 'select',
										'default' => 'publish_up',
										'options' => [
											[
												'evaluate' =>
													'yootheme.builder.sources.articleOrderOptions',
											],
										],
									],
									'order_direction' => [
										'label'   => trans('Direction'),
										'type'    => 'select',
										'default' => 'DESC',
										'options' => [
											trans('Ascending')  => 'ASC',
											trans('Descending') => 'DESC',
										],
									],
								],
							],
							'order_alphanum' => [
								'text' => trans('Alphanumeric Ordering'),
								'type' => 'checkbox',
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
			->createModel('Products', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		if (!empty($args['category']))
		{
			if (is_array($args['category']))
			{
				$model->setState('filter.categories', $args['category']);
			}
		}

		if (!empty($args['limit']))
		{
			$model->setState('list.limit', (int) $args['limit']);
		}

		if (!empty($args['ids']))
		{
			$ids = explode(',', $args['ids']);
			array_walk($ids, static function ($id) {
				return trim((int) $id);
			});

			$model->setState('filter.item_id', $ids);

		}

		return $model->getItems();
	}

}