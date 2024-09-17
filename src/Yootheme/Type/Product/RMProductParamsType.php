<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;
use Joomla\Plugin\System\YTDynamics\Model\ProductModel;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMProductParamsType extends BaseType
{

	public static function config()
	{
		$fields = ['fields' => []];

		$model = new ProductModel(['ignore_request' => true]);
		$model->setDatabase(Factory::getContainer()->get(DatabaseInterface::class));
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
		$form = $model->getForm();

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

}