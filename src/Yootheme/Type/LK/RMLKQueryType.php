<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Factory;
use function YOOtheme\trans;
use Joomla\Component\RadicalMart\Administrator\Helper\UserHelper;

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
				'RadicalMartMenu'     => [
					'type'       => [
						'listOf' => 'RMMenuType'
					],
					'metadata'   => [
						'label' => trans('RM Menus'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::menu',
					],
				],
				'RadicalMartUser'     => [
					'type'       => 'RMUserType',
					'metadata'   => [
						'label' => trans('RM User'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::user',
					],
				],


				'RadicalMartPersonalComponent' => [
					'type'       => 'RMPersonalComponentType',
					'metadata'   => [
						'label' => trans('RM Personal'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartSettingsComponent' => [
					'type'       => 'RMSettingsComponentType',
					'metadata'   => [
						'label' => trans('RM Settings'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartOrdersComponent' => [
					'type'       => 'RMOrdersComponentType',
					'metadata'   => [
						'label' => trans('RM Orders'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartOrderComponent' => [
					'type'       => 'RMOrderComponentType',
					'metadata'   => [
						'label' => trans('RM Order'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
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

	public static function component($root, array $args)
	{
		return (object) ['component' => 'html'];
	}

}
