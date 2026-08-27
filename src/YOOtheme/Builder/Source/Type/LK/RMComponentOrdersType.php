<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Trait\RenderComponentTrait;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;

class RMComponentOrdersType extends BaseType
{
	use RenderComponentTrait;

	/**
	 * @return array
	 */
	public static function config(): array
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
				'label' => trans('Orders'),
			],
		]);
	}

	public static function component($item)
	{
		return static::getRenderComponent('com_radicalmart', 'Orders', 'ytdorders');
	}

}
