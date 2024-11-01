<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\CMS\Event\Result\ResultAware;
use Joomla\CMS\Event\Result\ResultAwareInterface;
use Joomla\Event\Event;

\defined('_JEXEC') or die;

class YTDynamicsMatchTemplateEvent extends Event implements ResultAwareInterface
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
		return $this->arguments['result'] ?? null;
	}

	public function typeCheckResult($data): void
	{
		// TODO: Implement typeCheckResult() method.
	}

	public function __serialize(): array
	{
		// TODO: Implement __serialize() method.
	}

	public function __unserialize(array $data): void
	{
		// TODO: Implement __unserialize() method.
	}

}