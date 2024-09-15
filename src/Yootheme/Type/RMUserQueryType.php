<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMUserQueryType
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
				'product' => [
					'type'       => 'RMUserType',
					'metadata'   => [
						'label' => trans('User'),
						'view'  => ['com_users.profile'],
						'group' => trans('Page'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::resolve',
					],
				],
			],
		];
	}

	public static function resolve($root)
	{
		if (isset($root['item']))
		{
			return $root['item'];
		}
	}

}
