<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme;

use function YOOtheme\trans;

class CategoryType
{
	/**
	 * @return array
	 */
	public static function config()
	{
		return [
			'fields' => [
				'title' => [
					'type'     => 'String',
					'metadata' => [
						'label'   => trans('Title'),
						'filters' => ['limit'],
					],
				],

				'id' => [
					'type'     => 'String',
					'metadata' => [
						'label' => trans('ID'),
					],
				],

			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Category'),
			],
		];
	}

}
