<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Pages;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;
use function YOOtheme\trans;

class RMPageLandingParamsType extends BaseType
{

	public static function config(): array
	{
		return parent::triggerEvent([
			'fields' => [
				'seo_landing_page_title'    => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Page title'),
					]
				],
				'seo_landing_page_description' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Page description'),
					]
				],
				'seo_landing_page_h1' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Page h1'),
					]
				],
				'seo_landing_page_image' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Page image'),
					]
				],
			]
		]);
	}

}