<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\CMS\Document\DocumentAwareInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Trait\RenderComponentTrait;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;
use Joomla\CMS\HTML\HTMLHelper;

class RMComponentSettingsType extends BaseType
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
				'label' => trans('Settings'),
			],
		]);
	}

	public static function component($item)
	{
		return static::getRenderComponent('com_radicalmart', 'Settings', 'ytdsettings');
	}

}
