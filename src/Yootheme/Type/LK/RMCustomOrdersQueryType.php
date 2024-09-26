<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCustomOrdersQueryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'CustomRadicalMartOrders' => [

					'type' => [
						'listOf' => 'RMOrderType'
					],

					'args' => [
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
						'label'  => trans('RM Custom Orders'),
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
			->createModel('Orders', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		$user = Factory::getApplication()->getIdentity();

		$model->setState('user.id', (int) $user->id);

		if (!empty($args['limit']))
		{
			$model->setState('list.limit', (int) $args['limit']);
		}

		//dd($model->getItems());

		return $model->getItems();
	}

}