<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;
use Joomla\CMS\HTML\HTMLHelper;

class RMSettingsType extends BaseType
{
	/**
	 * @return array
	 */
	public static function config()
	{

		return parent::triggerEvent([
			'fields' => [

				'component' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Component'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::component',
					],
				],

			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Settings'),
			],
		]);
	}

	public static function component($item)
	{

		$view = Factory::getApplication()
			->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createView('Settings', '', 'Html');

		$model = Factory::getApplication()
			->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Settings', 'Site', ['ignore_request' => false]);


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

		$view->display('ytdsettings');

		return ob_get_clean();


	}

}
