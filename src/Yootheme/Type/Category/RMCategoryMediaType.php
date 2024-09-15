<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Category;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMCategoryMediaType extends BaseType
{

	/**
	 *
	 * @return array
	 *
	 * @since version
	 */
	public static function config()
	{
		return parent::triggerEvent([
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
		]);
	}

}