<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Search;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use function YOOtheme\trans;

class RMSearchType extends BaseType
{

	public static function config()
	{
		return parent::triggerEvent([
			'fields' => [
				'count'   => [
					'type'     => 'Int',
					'metadata' => [
						'label' => trans('Count'),
					],
				],
				'text'    => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Text'),
					]
				],
				'keyword' => [
					'type'       => 'String',
					'metadata'   => [
						'label' => trans('Keyword'),
					]
				],
			],

			'metadata' => [
				'type'  => true,
				'label' => trans('Search'),
			],
		]);
	}

}