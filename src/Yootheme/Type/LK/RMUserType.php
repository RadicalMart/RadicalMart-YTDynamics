<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;
use Joomla\CMS\HTML\HTMLHelper;

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

				'avatar' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Avatar'),
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('User'),
			],
		]);
	}

	public static function text($item)
	{
		return HTMLHelper::image(($item->avantar) ?: 'com_radicalmart/no-avatar.svg', htmlspecialchars($item->name));
	}

}
