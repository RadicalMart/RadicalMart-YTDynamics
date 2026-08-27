<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\LK;

use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;

class RMMenuType extends BaseType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{

		return parent::triggerEvent([
			'fields' => [

				'link' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Link'),
					],
				],

				'text' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Text'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::text',
					],
				],

				'current' => [
					'type' => 'Boolean',
					'metadata' => [
						'label' => trans('Active'),
					],
				]
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Menu'),
			],
		]);
	}

	public static function text($item)
	{
		return Text::_($item['text']);
	}

}
