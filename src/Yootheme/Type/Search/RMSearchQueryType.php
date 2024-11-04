<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Search;

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
	public static function config()
	{
		return [
			'fields' => [
				'RadicalMartSearch'        => [
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
				'RadicalMartSearchProducts' => [
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

	public static function search($root, array $args)
	{
		$keyword = Factory::getApplication()->input->getString('keyword', '');

		return (object) [
			'count'   => count($root['items']),
			'text'    => !empty($keyword) ? Text::sprintf('Результаты поиска по запросу: %s', $keyword) : Text::_('Поиск по сайту'),
			'keyword' => $keyword,
		];
	}

}
