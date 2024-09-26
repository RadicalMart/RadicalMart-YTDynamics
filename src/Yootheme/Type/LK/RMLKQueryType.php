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
				'RadicalMartMenu'              => [
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
				'RadicalMartUser'              => [
					'type'       => 'RMUserType',
					'metadata'   => [
						'label' => trans('RM user'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::user',
					],
				],
				'RadicalMartComponentPersonal' => [
					'type'       => 'RMComponentPersonalType',
					'metadata'   => [
						'label' => trans('RM component personal'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart.personal'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentSettings' => [
					'type'       => 'RMComponentSettingsType',
					'metadata'   => [
						'label' => trans('RM component settings'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart.settings'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentOrders'   => [
					'type'       => 'RMComponentOrdersType',
					'metadata'   => [
						'label' => trans('RM component orders'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart.orders'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentOrder'    => [
					'type'       => 'RMComponentOrderType',
					'metadata'   => [
						'label' => trans('RM component order'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart.order'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentFavorites'   => [
					'type'       => 'RMComponentFavoritesType',
					'metadata'   => [
						'label' => trans('RM component favorites'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_favorites.favorites'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentCodes'    => [
					'type'       => 'RMComponentCodesType',
					'metadata'   => [
						'label' => trans('RM component codes'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_bonuses.codes'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'RadicalMartComponentPoints'   => [
					'type'       => 'RMComponentPointsType',
					'metadata'   => [
						'label' => trans('RM component points'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_bonuses.points'],
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
