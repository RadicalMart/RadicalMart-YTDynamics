<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use function YOOtheme\trans;

class RMProductParamsType
{

	public static function config()
	{

		Form::addFormPath(JPATH_ROOT . '/administrator/components/com_radicalmart/forms');

		$fields = ['fields' => []];
		$model  = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Product', 'Administrator', ['ignore_request' => true]);
		$form   = $model->getForm();

		// получаем params от формы
		$params = $form->getGroup('params');

		// проходим params и создаем поля
		foreach ($params as $key => $value)
		{
			$fields['fields'][$value->fieldname] = [
				'type'     => 'String',
				'metadata' => [
					'label' => trans($value->fieldname),
				]
			];
		}

		return $fields;
	}

}