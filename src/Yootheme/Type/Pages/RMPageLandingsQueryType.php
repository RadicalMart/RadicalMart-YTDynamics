<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Pages;

use function YOOtheme\trans;

class RMPageLandingsQueryType
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
				'RadicalMartPagesLanding'         => [
					'type'       => 'RMPageLandingType',
					'metadata'   => [
						'label' => trans('RM landing page'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_landings.page'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::page',
					],
				],
				'RadicalMartPagesLandingProducts' => [
					'type'       => [
						'listOf' => 'RMProductType',
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
						'label' => trans('Products'),
						'view'  => ['com_radicalmart_landings.page'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::items',
					],
				],
			],
		];
	}

	public static function page($root, array $args)
	{
		return $root['page'] ?? [];
	}

	public static function category($root, array $args)
	{
		return $root['category'] ?? [];
	}

	public static function items($root, array $args)
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

		return [-1 => true];
	}


}
