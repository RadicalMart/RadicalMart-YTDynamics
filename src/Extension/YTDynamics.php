<?php namespace Joomla\Plugin\System\YTDynamics\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\SubscriberInterface;
use YOOtheme\Application;

class YTDynamics extends CMSPlugin implements SubscriberInterface
{
	protected $app;

	protected $db;

	protected $autoloadLanguage = true;

	public static function getSubscribedEvents(): array
	{
		return [
			'onAfterInitialise' => 'onAfterInitialise',
		];
	}

	public function onAfterInitialise()
	{

		if (!class_exists(Application::class, false))
		{
			return;
		}

		Application::getInstance()->load(implode('/', [JPATH_PLUGINS, 'system', 'ytdynamics', 'src', 'Yootheme']) . '/bootstrap.php');
	}

}