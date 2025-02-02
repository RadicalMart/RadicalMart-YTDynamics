<?php namespace Joomla\Plugin\System\YTDynamics\Helper;


use Joomla\CMS\Factory;

class ParamsHelper
{

	public static function all()
	{
		$plugin = Factory::getApplication()->bootPlugin('ytdynamics', 'system');

		return $plugin->params;
	}

	public static function get($name, $default = null)
	{
		$plugin = Factory::getApplication()->bootPlugin('ytdynamics', 'system');

		return $plugin->params->get($name, $default);
	}

}