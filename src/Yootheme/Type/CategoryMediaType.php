<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use function YOOtheme\trans;

class CategoryMediaType
{

	public static function config()
	{
		return [
			'fields' => [
				'image' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Image'),
					],
				],
				'icon' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Icon'),
					],
				],
			]
		];
	}
}