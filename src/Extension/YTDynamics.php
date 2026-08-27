<?php
namespace Joomla\Plugin\System\YTDynamics\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\Event\SubscriberInterface;
use Joomla\Filesystem\Path;
use YOOtheme\Application;

class YTDynamics extends CMSPlugin implements SubscriberInterface
{
    protected $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        return [
            'onAfterInitialise' => 'onAfterInitialise',
        ];
    }

    public function onAfterInitialise(): void
    {
        if (!class_exists(Application::class, false)) {
            return;
        }

        PluginHelper::importPlugin('radicalmart');
        PluginHelper::importPlugin('radicalmart_ytdynamics');

        Application::getInstance()
            ->load(Path::clean(JPATH_PLUGINS . '/system/ytdynamics/src/YOOtheme/bootstrap.php'));
    }
}