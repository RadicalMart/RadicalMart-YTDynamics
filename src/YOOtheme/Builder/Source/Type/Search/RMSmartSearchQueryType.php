<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Search;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMSmartSearchQueryType
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
				'radicalMartSmartSearchProducts' => [
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
						'label'  => trans('RM Products'),
						'view'   => ['com_finder.search'],
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
			($root['template'] ?? 'com_finder.search') !== 'com_finder.search'
			|| empty($root['items'])
			|| !is_array($root['items'])
		)
		{
			return [];
		}

		if (!empty($root['items']))
		{
			$items = $root['items'];
			$ids   = [];

			foreach ($items as $item)
			{
				if (empty($item->url) || !str_contains($item->url, 'com_radicalmart'))
				{
					continue;
				}

				$id = (int) ($item->id ?? 0);
				if ($id > 0)
				{
					$ids[] = $id;
				}
			}

			if (!$ids)
			{
				return [];
			}

			$model = Factory::getApplication()->bootComponent('com_radicalmart')
				->getMVCFactory()
				->createModel('Products', 'Site', ['ignore_request' => true]);
			$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
			$model->setState('filter.published', 1);

			if (!empty($args['offset']))
			{
				$model->setState('list.start', (int) $args['offset']);
			}

			if (!empty($args['limit']))
			{
				$model->setState('list.limit', (int) $args['limit']);
			}

			$model->setState('filter.item_id', $ids);

			// Set language filter state
			$model->setState('filter.language', Multilanguage::isEnabled());

			return $model->getItems();
		}

		return [];
	}

}
