<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCustomOrdersQueryType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{
		return [
			'fields' => [
				'customRadicalMartOrders' => [

					'type' => [
						'listOf' => 'RMOrderType'
					],

					'args' => [
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
					],

					'metadata' => [
						'label'  => trans('RadicalMart Orders by Parameters'),
						'group'  => trans('RadicalMart'),
						'fields' => [
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
										trans('Created') => 'created',
										trans('Number') => 'number',
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
			'offset' => 0,
			'limit' => 10,
			'order' => 'id',
			'order_direction' => 'DESC',
		];

		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Orders', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		$user = Factory::getApplication()->getIdentity();
		if ($user->guest || (int) $user->id <= 0)
		{
			return [];
		}

		$model->setState('user.id', (int) $user->id);

		$model->setState('list.start', max(0, (int) $args['offset']));
		$model->setState('list.limit', max(0, (int) $args['limit']));

		$orderColumns = [
			'id' => 'o.id',
			'created' => 'o.created',
			'number' => 'o.number',
			// Preserve valid values stored by older configurations.
			'o.id' => 'o.id',
			'o.created' => 'o.created',
			'o.number' => 'o.number',
		];
		$model->setState('list.ordering', $orderColumns[$args['order']] ?? $orderColumns['id']);
		$model->setState(
			'list.direction',
			strtoupper((string) $args['order_direction']) === 'ASC' ? 'ASC' : 'DESC',
		);

		return $model->getItems();
	}

}
