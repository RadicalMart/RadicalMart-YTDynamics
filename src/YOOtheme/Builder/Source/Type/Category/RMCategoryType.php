<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMCategoryType extends BaseType
{
    /**
     * @throws \Exception
     */
    public static function config(): array
    {
		return parent::triggerEvent([
			'fields' => [
				'id'             => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],
				'alias'          => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],
				'title'          => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Title'),
						'filters' => ['limit'],
					],
				],
				'introtext'      => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Introtext'),
						'filters' => ['limit'],
					],
				],
				'fulltext'      => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Fulltext'),
						'filters' => ['limit'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::fulltext',
					],
				],
				'total_products' => [
					'type'     => 'Int',
					'metadata' => [
						'label' => trans('Total products'),
						'group' => trans('Totals'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::totalProducts',
					],
				],
				'total_metas'    => [
					'type'     => 'Int',
					'metadata' => [
						'label' => trans('Total metas'),
						'group' => trans('Totals'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::totalMetas',
					],
				],
				'link'           => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],
				'media'          => [
					'type'       => 'RMCategoryMediaType',
					'metadata'   => [
						'label' => trans('Media'),
						'group' => trans('Media'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::media',
					],
				],
				'params'         => [
					'type'       => 'RMCategoryParamsType',
					'metadata'   => [
						'label' => trans('Params'),
						'group' => trans('Params'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::params',
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Category'),
			],
		]);
	}

	public static function media($item)
	{
		if (($item->media ?? null) instanceof Registry)
		{
			return $item->media->toArray();
		}

		return [];
	}

	public static function params($item, $args)
	{
		if (($item->params ?? null) instanceof Registry)
		{
			return $item->params->toArray();
		}

		return [];
	}

	public static function fulltext($item): string
	{
		if (property_exists($item, 'fulltext'))
		{
			return (string) $item->fulltext;
		}

		static $values = [];
		$id = (int) ($item->id ?? 0);
		if (!$id)
		{
			return '';
		}

		if (!array_key_exists($id, $values))
		{
			try
			{
				$model = Factory::getApplication()->bootComponent('com_radicalmart')
					->getMVCFactory()
					->createModel('Category', 'Site', ['ignore_request' => true]);
				$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
				$model->setState('filter.published', 1);
				$model->setState('filter.language', Multilanguage::isEnabled());
				$category = $model->getItem($id);
				$values[$id] = $category ? (string) ($category->fulltext ?? '') : '';
			}
			catch (\Throwable)
			{
				$values[$id] = '';
			}
		}

		return $values[$id];
	}

	public static function totalProducts($item): int
	{
		return static::total($item, 'products', 'total_products');
	}

	public static function totalMetas($item): int
	{
		return static::total($item, 'metas', 'total_metas');
	}

	protected static function total($item, string $key, string $fallback): int
	{
		if (($item->totals ?? null) instanceof Registry)
		{
			return (int) $item->totals->get($key, 0);
		}

		return (int) ($item->{$fallback} ?? 0);
	}
}
