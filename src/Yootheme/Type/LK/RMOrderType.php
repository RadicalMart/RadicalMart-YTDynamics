<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMOrderType extends BaseType
{
	/**
	 * @return array
	 */
	public static function config()
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
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Currency'),
					],
				],

				'total' => [
					'type'       => 'RMOrderTotalType',
					'metadata'   => [
						'label' => trans('Total'),
					]
				],

				'status' => [
					'type'       => 'RMOrderStatusType',
					'metadata'   => [
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
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Order'),
			],
		]);
	}

}