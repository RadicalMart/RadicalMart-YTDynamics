<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Search;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMSearchQueryType
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
				'radicalMartSearch'        => [
					'type'       => 'RMSearchType',
					'metadata'   => [
						'label' => trans('RM search'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_search.search'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::search',
					],
				],
				'radicalMartSearchProducts' => [
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
						'label'  => trans('Products'),
						'view'   => ['com_radicalmart_search.search'],
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

		if (
			($root['template'] ?? 'com_radicalmart_search.search') !== 'com_radicalmart_search.search'
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

	public static function search($root, array $args)
	{
		if (($root['template'] ?? 'com_radicalmart_search.search') !== 'com_radicalmart_search.search')
		{
			return null;
		}

		$keyword = Factory::getApplication()->input->getString('keyword', '');
		$items = is_array($root['items'] ?? null) ? $root['items'] : [];

		return (object) [
			'count'   => count($items),
			'text'    => !empty($keyword) ? Text::sprintf('Результаты поиска по запросу: %s', $keyword) : Text::_('Поиск по сайту'),
			'keyword' => $keyword,
		];
	}

}
