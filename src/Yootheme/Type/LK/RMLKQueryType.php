<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMLKQueryType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		return [
			'fields' => [
				'menu' => [
					'type'       => [
						'listOf' => 'RMMenuType'
					],
					'metadata'   => [
						'label' => trans('Menus'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::menu',
					],
				],
				'user' => [
					'type'       => 'RMUserType',
					'metadata'   => [
						'label' => trans('User'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::user',
					],
				],
			],
		];
	}

	public static function menu($root, array $args)
	{
		return UserHelper::getMenu();
	}

	public static function user($root, $args)
	{
		$user         = Factory::getApplication()->getIdentity();
		$user->avatar = UserHelper::getAvatar($user->id);

		return $user;
	}

}
