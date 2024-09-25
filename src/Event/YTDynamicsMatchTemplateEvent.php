<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\CMS\Event\Result\ResultAware;
use Joomla\Event\Event;

\defined('_JEXEC') or die;

class YTDynamicsMatchTemplateEvent extends Event
{

	use ResultAware;

	public function getContext(): string
	{
		return $this->arguments['context'];
	}

	public function getView(): mixed
	{
		return $this->arguments['view'];
	}

	public function getTpl(): mixed
	{
		return $this->arguments['tpl'];
	}

	public function getResult()
	{
		return $this->arguments['result'];
	}

}