<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;

class RMOrderStatusParamsType extends BaseType
{

	public static function config(): array
	{
		return parent::triggerEvent([
			'fields' => [
				'class_admin'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Class admin'),
					],
				],

				'class_site'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Class site'),
					],
				],

				'message'        => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Message'),
					],
				],
			]
		]);
	}

}