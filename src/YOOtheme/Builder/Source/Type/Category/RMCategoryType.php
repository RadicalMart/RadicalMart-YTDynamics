<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;
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
				$db = Factory::getContainer()->get(DatabaseInterface::class);
				$query = $db->createQuery()
					->select($db->quoteName('fulltext'))
					->from($db->quoteName('#__radicalmart_categories'))
					->where($db->quoteName('id') . ' = :id')
					->where($db->quoteName('state') . ' = 1')
					->bind(':id', $id, ParameterType::INTEGER);

				if (Multilanguage::isEnabled())
				{
					$query->whereIn(
						$db->quoteName('language'),
						[Factory::getApplication()->getLanguage()->getTag(), '*'],
						ParameterType::STRING,
					);
				}

				$values[$id] = (string) ($db->setQuery($query)->loadResult() ?? '');
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
