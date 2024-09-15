<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Exception;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use function YOOtheme\trans;

class RMCategoryParamsType extends BaseType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config(): array
	{
		$fields = ['fields' => []];

		try
		{
			Form::addFormPath(JPATH_ROOT . '/administrator/components/com_radicalmart/forms');

			$model = Factory::getApplication()->bootComponent('com_radicalmart')
				->getMVCFactory()
				->createModel('Category', 'Administrator', ['ignore_request' => true]);
			$form  = $model->getForm();

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

			return parent::triggerEvent($fields);
		}
		catch (Exception $e)
		{
			return $fields;
		}

	}

}