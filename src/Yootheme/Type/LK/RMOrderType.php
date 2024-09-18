<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\Yootheme\Trait\ComponentTrait;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMOrderType extends BaseType
{
	use ComponentTrait;

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
				'label' => trans('Order'),
			],
		]);
	}

	public static function component($item)
	{
		return static::getRenderComponent('Orders', 'ytdorders');
	}

}
