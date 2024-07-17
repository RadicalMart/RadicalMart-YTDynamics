<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use function YOOtheme\trans;

class RMCategoryChildType extends RMCategoryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		$config = parent::config();

		$config['fields']['child'] = [
			'type'       => [
				'listOf' => 'RMCategoryChildType'
			],
			'metadata'   => [
				'label' => trans('Child'),
			],
			'extensions' => [
				'call' => __CLASS__ . '::child',
			],
		];

		return $config;
	}

	public static function child($item)
	{
		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Categories', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));
		$model->setState('category.id', (int) $item->id);

		return $model->getItems();
	}

}
