<?php namespace Joomla\Plugin\System\YTDynamics\Helper;


use Joomla\CMS\Factory;
use Joomla\Registry\Registry;

class ParamsHelper
{
    /**
     * @throws \Exception
     */
    public static function all(): ?Registry
	{
		$plugin = Factory::getApplication()->bootPlugin('ytdynamics', 'system');

		return $plugin->params;
	}

    /**
     * @throws \Exception
     */
    public static function get(string $name, mixed $default = null)
	{
		return static::all()?->get($name, $default);
	}
}