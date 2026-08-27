<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Trait;

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\Filesystem\Path;
use RuntimeException;
use Throwable;

trait RenderComponentTrait
{
    /**
     * @throws \Exception
     */
    public static function getRenderComponent(string $componentName, string $name, ?string $template = null): string
    {
        $application = Factory::getApplication();
		$bufferLevel = ob_get_level();

        if(!($application instanceof CMSApplication)){
            return '';
        }

        try {
            /** @var \Joomla\CMS\Extension\Component $component */
            $component = Factory::getApplication()->bootComponent($componentName);

            if (!method_exists($component, 'getMVCFactory')) {
                throw new RuntimeException('Component must be implement getMVCFactory method');
            }

            /** @var \Joomla\CMS\MVC\View\HtmlView $view */
            $view = $component
                ->getMVCFactory()
                ->createView($name, '', 'Html');

            /** @var \Joomla\CMS\MVC\Model\BaseDatabaseModel $model */
            $model = $component
                ->getMVCFactory()
                ->createModel($name, 'Site', ['ignore_request' => false]);

            $document = Factory::getApplication()->getDocument();

            $assets = $document->getWebAssetManager();
            $assets->getRegistry()->addExtensionRegistryFile($componentName);

			Form::addFormPath(Path::clean(JPATH_ROOT . '/components/' . $componentName . '/forms'));

            if ($view instanceof DocumentAwareInterface) {
                $view->setDocument($document);
            }

            $view->setModel($model, true);
            $view->addTemplatePath(Path::clean(JPATH_PLUGINS . '/system/ytdynamics/template'));

            ob_start();

            $view->display($template);

            return ob_get_clean();
        } catch (Throwable $e) {
			while (ob_get_level() > $bufferLevel) {
				ob_end_clean();
			}

            //TODO: Разобраться, как прошка пишет логи в console log и реализовать тут отдачу лога
            return '';
        }
    }
}
