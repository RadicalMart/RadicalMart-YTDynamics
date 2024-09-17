<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\LK;

use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\Plugin\System\YTDynamics\Yootheme\Trait\ComponentTrait;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;
use Joomla\CMS\HTML\HTMLHelper;

class RMSettingsType extends BaseType
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
				'label' => trans('Settings'),
			],
		]);
	}

	public static function component($item)
	{
		return static::getRenderComponent('Settings', 'ytdsettings');
	}

}
