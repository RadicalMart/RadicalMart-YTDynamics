<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

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
	public static function config(): array
	{
		return [
			'fields' => [
				'radicalMartMenu'               => [
					'type'       => [
						'listOf' => 'RMMenuType'
					],
					'metadata'   => [
						'label' => trans('RadicalMart Menu'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::menu',
					],
				],
				'radicalMartUser'               => [
					'type'       => 'RMUserType',
					'metadata'   => [
						'label' => trans('RadicalMart User'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::user',
					],
				],
				'radicalMartComponentPersonal'  => [
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
				'radicalMartComponentSettings'  => [
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
				'radicalMartComponentOrders'    => [
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
				'radicalMartComponentOrder'     => [
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
				'radicalMartComponentFavorites' => [
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
				'radicalMartComponentCompare'   => [
					'type'       => 'RMComponentCompareType',
					'metadata'   => [
						'label' => trans('RM component compare'),
						'group' => trans('Page'),
						'view'  => ['com_radicalmart_compare.compare'],
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],
				'radicalMartComponentCodes'     => [
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
				'radicalMartComponentPoints'    => [
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
