<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product\Fields\Values;

use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMChoiceFieldValueType
{
	/**
	 * @return array
	 */
	public static function config(): array
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
