<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class RMUserType extends BaseType
{

	/**
	 * @param $config
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		parent::triggerEvent([
			'fields' => [
				'id'             => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],
				'name'             => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Name'),
					],
				],
				'email'             => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('E-mail'),
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Category'),
			],
		]);
	}

}
