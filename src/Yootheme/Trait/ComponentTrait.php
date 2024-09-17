<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Trait;

use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;

trait ComponentTrait
{

	/**
	 * @param $name
	 * @param $template
	 *
	 * @return string
	 *
	 * @since version
	 */
	public static function getRenderComponent($name, $template)
	{
		try
		{
			$view = Factory::getApplication()
				->bootComponent('com_radicalmart')
				->getMVCFactory()
				->createView($name, '', 'Html');

			$model = Factory::getApplication()
				->bootComponent('com_radicalmart')
				->getMVCFactory()
				->createModel($name, 'Site', ['ignore_request' => false]);

			$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
			$assets->getRegistry()->addExtensionRegistryFile('com_radicalmart');

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