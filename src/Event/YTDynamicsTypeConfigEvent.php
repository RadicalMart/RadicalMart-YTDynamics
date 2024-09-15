<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\Event\Event;
use YOOtheme\Builder\Source;

\defined('_JEXEC') or die;

class YTDynamicsTypeConfigEvent extends Event
{

	public function getType(): string
	{
		return $this->arguments['type'];
	}

	public function getConfig(): array
	{
		return $this->arguments['config'];
	}

}