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
							'defaultValue' => 'id',
						],
						'order_direction' => [
							'type' => 'String',
							'defaultValue' => 'DESC',
						],
						// Kept for GraphQL queries saved by older plugin versions.
						'order_alphanum' => [
							'type' => 'Boolean',
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
										'default' => 'id',
										'options' => [
											trans('ID') => 'id',
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
			'order' => 'id',
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

		$offset = max(0, (int) $args['offset']);
		$limit = max(0, (int) $args['limit']);
		$isPriceOrder = in_array($args['order'], ['price', 'p.ordering_price'], true);

		// RadicalMart 3 no longer has ordering_price. Price sorting therefore has
		// to happen after the model has prepared the current-currency price.
		$model->setState('list.start', $isPriceOrder ? 0 : $offset);
		$model->setState('list.limit', $isPriceOrder ? 0 : $limit);

		if (!empty($args['ids']))
		{
			$ids = array_values(array_filter(array_map('intval', explode(',', $args['ids']))));

			$model->setState('filter.item_id', $ids);
		}

		$orderColumns = [
			'id' => 'p.id',
			'ordering' => 'p.id',
			'price' => 'p.id',
			'created' => 'p.created',
			'title' => 'p.title',
			// Preserve values stored by older source configurations.
			'p.id' => 'p.id',
			'p.ordering' => 'p.id',
			'p.ordering_price' => 'p.id',
			'p.created' => 'p.created',
			'p.title' => 'p.title',
		];
		$model->setState('list.ordering', $orderColumns[$args['order']] ?? $orderColumns['id']);
		$direction = strtoupper((string) $args['order_direction']) === 'ASC' ? 'ASC' : 'DESC';
		$model->setState(
			'list.direction',
			$direction,
		);

		// Set language filter state
		$model->setState('filter.language', Multilanguage::isEnabled());

		$items = $model->getItems();

		if ($isPriceOrder)
		{
			usort($items, static function ($left, $right) use ($direction): int {
				$leftPrice = (float) ($left->price['final'] ?? $left->price['base'] ?? 0);
				$rightPrice = (float) ($right->price['final'] ?? $right->price['base'] ?? 0);
				$result = $leftPrice <=> $rightPrice;

				if ($result === 0)
				{
					$result = ((int) ($left->id ?? 0)) <=> ((int) ($right->id ?? 0));
				}

				return $direction === 'ASC' ? $result : -$result;
			});

			$items = array_slice($items, $offset, $limit ?: null);
		}

		return $items;
	}

}
