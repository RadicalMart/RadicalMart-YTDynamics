<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Fields;

use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMChoiceFieldType
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
