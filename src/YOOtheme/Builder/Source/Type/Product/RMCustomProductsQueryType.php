<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use function YOOtheme\trans;

class RMCustomProductsQueryType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{
		return [
			'fields' => [
				'customRadicalMartProducts' => [
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
							'defaultValue' => 0,
						],
						'limit'           => [
							'type' => 'Int',
							'defaultValue' => 10,
						],
						'order'           => [
							'type' => 'String',
							'defaultValue' => 'ordering',
						],
						'order_direction' => [
							'type' => 'String',
							'defaultValue' => 'DESC',
						],
					],

					'metadata' => [
						'label'  => trans('RadicalMart Products by Parameters'),
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
										'default' => 'ordering',
										'options' => [
											trans('Ordering') => 'ordering',
											trans('Price') => 'price',
											trans('Created') => 'created',
											trans('Title') => 'title',
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
			'category' => [],
			'ids' => '',
			'offset' => 0,
			'limit' => 10,
			'order' => 'ordering',
			'order_direction' => 'DESC',
		];

		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Products', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		if (!empty($args['category']))
		{
			if (!is_array($args['category']))
			{
				$args['category'] = [$args['category']];
			}

			$model->setState('filter.categories', $args['category']);
		}

		$model->setState('filter.published', 1);

		$model->setState('list.start', max(0, (int) $args['offset']));
		$model->setState('list.limit', max(0, (int) $args['limit']));

		if (!empty($args['ids']))
		{
			$ids = array_values(array_filter(array_map('intval', explode(',', $args['ids']))));

			$model->setState('filter.item_id', $ids);
		}

		$orderColumns = [
			'ordering' => 'p.ordering',
			'price' => 'p.ordering_price',
			'created' => 'p.created',
			'title' => 'p.title',
			// Preserve values stored by older source configurations.
			'p.ordering' => 'p.ordering',
			'p.ordering_price' => 'p.ordering_price',
			'p.created' => 'p.created',
			'p.title' => 'p.title',
		];
		$model->setState('list.ordering', $orderColumns[$args['order']] ?? $orderColumns['ordering']);
		$model->setState(
			'list.direction',
			strtoupper((string) $args['order_direction']) === 'ASC' ? 'ASC' : 'DESC',
		);

		// Set language filter state
		$model->setState('filter.language', Multilanguage::isEnabled());

		return $model->getItems();
	}

}
