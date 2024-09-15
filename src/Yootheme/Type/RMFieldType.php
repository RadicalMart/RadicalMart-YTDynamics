<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class RMFieldType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'id'          => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],
				'alias'       => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Alias'),
					],
				],
				'area'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Area'),
					],
				],
				'fieldset'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Fieldset'),
					],
				],
				'title'       => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Title'),
					],
				],
				'description' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Description'),
					],
				],
				'rawvalue'    => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Raw value'),
					],
				],
				'value'       => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Value'),
					],
				],
			]
		]);
	}

}