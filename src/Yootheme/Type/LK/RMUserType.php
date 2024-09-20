<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Router\Route;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
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

				'username' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Username'),
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

				'edit' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link edit'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::edit',
					],
				],

				'logout' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link logout'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::logout',
					],
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('User'),
			],
		]);
	}

	public static function edit($item)
	{
		return Route::link('site', 'index.php?option=com_radicalmart&view=settings');
	}

	public static function logout($item)
	{
		return Route::link('site', 'index.php?option=com_users&view=login&layout=logout&task=user.menulogout');
	}

}
