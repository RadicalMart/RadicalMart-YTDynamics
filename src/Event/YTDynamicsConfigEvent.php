<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\Event\Event;

\defined('_JEXEC') or die;

class YTDynamicsConfigEvent extends Event
{

	public function getConfig(): array
	{
		return $this->arguments['config'];
	}

}