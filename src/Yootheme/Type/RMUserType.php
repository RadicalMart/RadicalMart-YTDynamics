<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class RMUserType extends BaseType
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

				'name' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Name'),
					],
				],

				'email' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('E-mail'),
					],
				],

			],

			'metadata' => [
				'type'  => true,
				'label' => trans('User'),
			],
		]);
	}


}
