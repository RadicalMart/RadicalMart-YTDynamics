<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMProductPluginsBlockType extends BaseType
{

	public static function config()
	{
		$fields = [
			'fields' => []
		];

		$params = ComponentHelper::getParams('com_radicalmart');
		$blocks = (array) $params->get('related_blocks');

		foreach ($blocks as $block)
		{
			$fields['fields'][$block->alias] = [
				'type'       => [
					'listOf' => 'RMProductType'
				],
				'metadata'   => [
					'label' => trans($block->title),
				],
				'extensions' => [
					'call' => __CLASS__ . '::products',
				],
			];
		}

		return parent::triggerEvent($fields);
	}

	public static function products($item, $args)
	{
		$ids = [];

		foreach ($item as $row)
		{
			$ids[] = (int) $row['id'];
		}

		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Products', 'Site', ['ignore_request' => true]);
		$model->setState('params', ComponentHelper::getParams('com_radicalmart'));

		$model->setState('filter.item_id', $ids);

		return $model->getItems();
	}

}