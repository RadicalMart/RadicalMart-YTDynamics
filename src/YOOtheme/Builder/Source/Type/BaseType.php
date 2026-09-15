<?php
namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsTypeConfigEvent;
use Joomla\Plugin\System\YTDynamics\Helper\ParamsHelper;
use Joomla\Registry\Registry;

class BaseType
{
    protected static ?Registry $params = null;

    /**
     * @throws \Exception
     */
    public static function triggerEvent($config = [])
    {
        Factory::getApplication()
            ->getDispatcher()
            ->dispatch(
                YTDynamicsTypeConfigEvent::EVENT_NAME,
                new YTDynamicsTypeConfigEvent(
                    YTDynamicsTypeConfigEvent::EVENT_NAME,
                    ['type' => static::class, 'config' => &$config],
                ),
            );

        return $config;
    }

    /**
     * @throws \Exception
     */
    protected static function getParam(string $name, mixed $default = null)
    {
        if (!(static::$params instanceof Registry)) {
            static::$params = ParamsHelper::all();
        }

        return static::$params->get($name, $default);
    }
}
