<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;
use Joomla\Component\RadicalMart\Administrator\Helper\UserHelper;

class RMMenuQueryType
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
				'user' => [
					'type'       => [
						'listOf' => 'RMMenuType'
					],
					'metadata'   => [
						'label' => trans('Menus'),
						'group' => trans('RadicalMart'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
			],
		];
	}

	public static function resolve($root, array $args)
	{
		return UserHelper::getMenu();
	}

}
