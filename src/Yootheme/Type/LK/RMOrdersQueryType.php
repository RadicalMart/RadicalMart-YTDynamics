<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use function YOOtheme\trans;

class RMOrdersQueryType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		return [
			'fields' => [
				'order' => [
					'type'       => 'RMOrderType',
					'args'       => [
						'offset' => [
							'type' => 'Int',
						],
					],
					'metadata'   => [
						'label'  => trans('Order'),
						'view'   => ['com_radicalmart.order'],
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
				'orders'  => [
					'type'       => [
						'listOf' => 'RMOrderType',
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
						'label'  => trans('Orders'),
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

		if (!empty($root['items']))
		{
			$items = $root['items'];

			if ($args['offset'] || $args['limit'])
			{
				$items = array_slice($items, (int) $args['offset'], (int) $args['limit'] ?: null);
			}

			return $items;
		}
		else
		{
			return [-1 => true];
		}
	}

	public static function resolveSingle($root, array $args)
	{
		return $root['items'][$args['offset'] ?? 0] ?? null;
	}

}
