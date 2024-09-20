<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Trait;

use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;

trait ComponentTrait
{

	/**
	 * @param $component
	 * @param $name
	 * @param $template
	 *
	 * @return string
	 *
	 * @since version
	 */
	public static function getRenderComponent($component, $name, $template)
	{
		try
		{
			$view = Factory::getApplication()
				->bootComponent($component)
				->getMVCFactory()
				->createView($name, '', 'Html');

			$model = Factory::getApplication()
				->bootComponent($component)
				->getMVCFactory()
				->createModel($name, 'Site', ['ignore_request' => false]);

			$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
			$assets->getRegistry()->addExtensionRegistryFile($component);

			Form::addFormPath(implode(DIRECTORY_SEPARATOR, [JPATH_BASE, 'components', 'com_radicalmart', 'forms']));

			$document = Factory::getApplication()->getDocument();

			if ($view instanceof DocumentAwareInterface && $document)
			{
				$view->setDocument($document);
			}

			$view->setModel($model, true);
			$view->addTemplatePath(implode(DIRECTORY_SEPARATOR, [JPATH_PLUGINS, 'system', 'ytdynamics', 'template']));

			ob_start();

			$view->display($template);

			return ob_get_clean();
		}
		catch (\Throwable $e)
		{
			return '';
		}
	}

}