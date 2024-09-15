<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsTypeConfigEvent;
use function YOOtheme\trans;

class BaseType
{

	public static function triggerEvent($config = [])
	{
		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsTypeConfig',
			new YTDynamicsTypeConfigEvent('onRadicalMartYTDynamicsTypeConfig', ['type' => static::class, 'config' => &$config])
		);

		return $config;
	}

}