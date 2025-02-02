<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsTypeConfigEvent;
use Joomla\Plugin\System\YTDynamics\Helper\ParamsHelper;
use Joomla\Registry\Registry;
use function YOOtheme\trans;

class BaseType
{

	protected static $params;

	public static function triggerEvent($config = [])
	{
		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsTypeConfig',
			new YTDynamicsTypeConfigEvent('onRadicalMartYTDynamicsTypeConfig', ['type' => static::class, 'config' => &$config])
		);

		return $config;
	}

	protected static function getParam($name, $default = null)
	{
		if (!(static::$params instanceof Registry))
		{
			static::$params = ParamsHelper::all();
		}

		return static::$params->get($name, $default);
	}

}