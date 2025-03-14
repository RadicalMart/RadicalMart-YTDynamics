<?php namespace Joomla\Plugin\System\YTDynamics\Event;

use Joomla\CMS\Event\Result\ResultAware;
use Joomla\CMS\Event\Result\ResultAwareInterface;
use Joomla\Event\Event;
use YOOtheme\Builder\Source;

\defined('_JEXEC') or die;

class YTDynamicsResultEvent extends Event implements ResultAwareInterface
{

	use ResultAware;

	public function getResult()
	{
		return $this->arguments['result'] ?? [];
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