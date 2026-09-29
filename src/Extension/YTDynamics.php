<?php
namespace Joomla\Plugin\System\YTDynamics\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\CMS\Event\Plugin\AjaxEvent;
use Joomla\Event\SubscriberInterface;
use Joomla\Filesystem\Path;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
use Joomla\Plugin\System\YTDynamics\Service\QuickViewRenderer;
use YOOtheme\Application;

class YTDynamics extends CMSPlugin implements SubscriberInterface
{
    protected $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        return [
            'onAfterInitialise' => 'onAfterInitialise',
            'onAjaxYtdynamics' => 'onAjaxYtdynamics',
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

    public function onAjaxYtdynamics(AjaxEvent $event): void
    {
        $input = $this->getApplication()->getInput();
        $task = $input->getCmd('task');

        if (!in_array($task, ['quickView', 'quickViewLayout', 'variant'], true)) {
            throw new \InvalidArgumentException('Unknown YTDynamics AJAX task.', 400);
        }

		if ($task === 'quickViewLayout') {
			$event->updateEventResult(QuickViewRenderer::render(
				$input->getInt('product_id'),
				$input->getString('template_id'),
			));
			return;
		}

        $event->updateEventResult(ProductPresentation::get(
            $input->getInt('product_id'),
            $task === 'quickView'
        ));
    }
}
