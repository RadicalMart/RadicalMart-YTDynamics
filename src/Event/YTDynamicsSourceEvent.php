<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\Event\Event;
use YOOtheme\Builder\Source;

\defined('_JEXEC') or die;

class YTDynamicsSourceEvent extends Event
{

	public function getSource(): Source
	{
		return $this->arguments['source'];
	}

	public function getQuery(): array
	{
		return $this->arguments['query'];
	}

	public function getTypes(): array
	{
		return $this->arguments['types'];
	}

}