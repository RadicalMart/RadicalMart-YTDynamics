<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Values;

use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMListFieldValueType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'text' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Text'),
					],
					'extensions' => [
						'call' => __CLASS__ . '::text',
					],
				],

				'image' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Image'),
					],
				],

				'value' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('Value'),
					],
				],
			],
		];
	}

	public static function text($choice)
	{
		$text = $choice->text ?? ($choice['text'] ?? null);

		if ($text)
		{
			return Text::_($text);
		}
	}
}
