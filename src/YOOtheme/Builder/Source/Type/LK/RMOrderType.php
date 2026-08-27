<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\CMS\Date\Date;
use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;

class RMOrderType extends BaseType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{

		return parent::triggerEvent([
			'fields' => [

				'id' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

				'number' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Number'),
					],
				],

				'currency' => [
					'type'       => 'String',
					'metadata' => [
						'label' => trans('Currency'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::currency',
					],
				],

				'created' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Created'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::created',
					],
				],
				'total'   => [
					'type'     => 'RMOrderTotalType',
					'metadata' => [
						'label' => trans('Total'),
					]
				],

				'status' => [
					'type'     => 'RMOrderStatusType',
					'metadata' => [
						'label' => trans('Status'),
					]
				],

				'title' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					],
				],

				'slug' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Slug'),
					],
				],

				'link' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],

				'products' => [
					'type' => [
						'listOf' => 'RMProductType'
					],
					'metadata' => [
						'label' => trans('Products'),
					],
				],

			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Order'),
			],
		]);
	}

	public static function created($item)
	{
		if (empty($item->created))
		{
			return '';
		}

		return (new Date($item->created))->format(Text::_('DATE_FORMAT_LC5'));
	}

	public static function currency($item): string
	{
		if (is_array($item->currency ?? null))
		{
			return (string) ($item->currency['code'] ?? '');
		}

		return (string) ($item->currency ?? '');
	}

}
