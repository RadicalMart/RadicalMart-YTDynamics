<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use function YOOtheme\trans;

class RMOrdersQueryType
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
					'radicalMartOrders' => [
						'type'       => 'RMOrderType',
						'metadata'   => [
							'label'  => trans('RM order'),
							'view'   => ['com_radicalmart.order'],
							'group'  => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolveSingle',
					],
				],
				'orders'  => [
					'type'       => [
						'listOf' => 'RMOrderType',
					],
					'args'       => [
						'offset' => [
							'type' => 'Int',
							'defaultValue' => 0,
						],
						'limit'  => [
							'type' => 'Int',
						],
					],
					'metadata'   => [
						'label'  => trans('RM orders'),
						'view'   => ['com_radicalmart.orders'],
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

		if (($root['template'] ?? 'com_radicalmart.orders') !== 'com_radicalmart.orders')
		{
			return [];
		}

		if (!empty($root['items']) && is_array($root['items']))
		{
			$items = $root['items'];

			if ($args['offset'] || $args['limit'])
			{
				$items = array_slice($items, (int) $args['offset'], (int) $args['limit'] ?: null);
			}

			return $items;
		}

		return [];
	}

	public static function resolveSingle($root, array $args = [])
	{
		if (($root['template'] ?? 'com_radicalmart.order') !== 'com_radicalmart.order')
		{
			return null;
		}

		return $root['item'] ?? null;
	}

}
