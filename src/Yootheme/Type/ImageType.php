<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class ImageType
{

	public static function config()
	{
		return [
			'fields' => [
				'src' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Src'),
					],
				],
				'alt' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Alt'),
					],
				],
			]
		];
	}
}