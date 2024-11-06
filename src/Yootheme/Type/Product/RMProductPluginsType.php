<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMProductPluginsType extends BaseType
{

	public static function config()
	{
		$fields = [];

		// заложено для дальнейшего расширения
		$fields = array_merge($fields, static::getFieldRelated());

		return parent::triggerEvent([
			'fields' => $fields,
		]);
	}

	protected static function getFieldRelated()
	{
		$params = ComponentHelper::getParams('com_radicalmart');

		if (!((int) $params->get('related_enable', 0)))
		{
			return [];
		}

		return [
			'related' => [
				'type'     => [
					'listOf' => 'RMProductPluginsBlockType'
				],
				'metadata' => [
					'label' => trans('Related blocks'),
				],
			]
		];
	}

}