<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use function YOOtheme\trans;

class RMProductMetaType extends RMProductType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		$config = parent::config();

		$config['fields']['isActive'] = [
			'type'     => 'Boolean',
			'metadata' => [
				'label' => trans('Active'),
			],
		];

		$config['fields']['isActiveClass'] = [
			'type'     => 'String',
			'metadata' => [
				'label' => trans('Active class'),
			],
			'extensions' => [
				'call' => __CLASS__ . '::isActiveClass',
			],
		];

		return parent::triggerEvent($config);
	}

	public static function isActiveClass($item)
	{
		return $item->isActive ? 'active' : '';
	}

}