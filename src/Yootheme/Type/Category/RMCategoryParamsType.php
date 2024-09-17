<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Category;

use Exception;
use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;
use Joomla\Plugin\System\YTDynamics\Model\CategoryModel;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
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
			$model = new CategoryModel(['ignore_request' => true],);
			$model->setDatabase(Factory::getContainer()->get(DatabaseInterface::class));
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
		catch (Exception $e)
		{
			return $fields;
		}

	}

}