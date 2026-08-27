<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Pages;

use function YOOtheme\trans;

class RMPageLandingsQueryType
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
				'radicalMartPagesLanding'         => [
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
				'radicalMartPagesLandingProducts' => [
					'type'       => [
						'listOf' => 'RMProductType',
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
		if (($root['template'] ?? 'com_radicalmart_landings.page') !== 'com_radicalmart_landings.page')
		{
			return null;
		}

		return $root['page'] ?? null;
	}

	public static function category($root, array $args)
	{
		return $root['category'] ?? null;
	}

	public static function items($root, array $args)
	{
		$args += [
			'offset' => 0,
			'limit'  => null,
		];

		if (
			($root['template'] ?? 'com_radicalmart_landings.page') !== 'com_radicalmart_landings.page'
			|| empty($root['items'])
			|| !is_array($root['items'])
		)
		{
			return [];
		}

		if (!empty($root['items']))
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


}
