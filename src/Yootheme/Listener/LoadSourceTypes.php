<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\Plugin\System\YTDynamics\Event\EventYTDynamics;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type;
use YOOtheme\Builder\Source;
use function YOOtheme\trans;

class LoadSourceTypes
{

	public function handle($source): void
	{

		$query = [
			Type\RMCustomCategoriesQueryType::config(),
			Type\RMCustomCategoriesWithChildQueryType::config(),
			Type\RMCustomCategoryQueryType::config(),
			Type\RMCustomProductsQueryType::config(),
			Type\RMCustomProductsQueryType::config(),
			Type\RMCategoriesQueryType::config(),
			Type\RMProductsQueryType::config(),
			Type\RMProductQueryType::config(),
		];

		$types = [
			['RMCategoryType', Type\RMCategoryType::config()],
			['RMCategoryChildType', Type\RMCategoryChildType::config()],
			['RMCategoryParamsType', Type\RMCategoryParamsType::config()],
			['RMCategoryMediaType', Type\RMCategoryMediaType::config()],
			['RMProductType', Type\RMProductType::config()],
			['RMPriceType', Type\RMPriceType::config()],
			['RMProductImageType', Type\RMProductImageType::config()],
			['RMFieldType', Type\RMFieldType::config()],
			['RMProductParamsType', Type\RMProductParamsType::config()],
			['RMChoiceFieldStringType', Type\Fields\RMChoiceFieldStringType::config()],
			['RMChoiceFieldType', Type\Fields\RMChoiceFieldType::config()],
			['RMValueFieldType', Type\Fields\RMValueFieldType::config()],
		];

		PluginHelper::importPlugin('ytdynamics');

		Factory::getApplication()->getDispatcher()->dispatch(
			'onYTDynamics',
			new EventYTDynamics('onYTDynamics', ['query' => $query, 'types' => &$types])
		);

		foreach ($query as $args)
		{
			$source->queryType($args);
		}

		foreach ($types as $args)
		{
			$source->objectType(...$args);
		}

		$model = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Fields', 'Administrator', ['ignore_request' => true]);
		$model->setState('list.limit', 0);
		$fields = $model->getItems();

		// Добавляем поля
		$source->objectType(
			'RMProductType',
			[
				'fields' => [
					'field' => [
						'type'       => ($fieldType = "RMProductTypeFields"),
						'metadata'   => [
							'label' => trans('Fields'),
						],
						'extensions' => [
							'call' => Type\RMFieldsType::class . '::field',
						],
					],
				],
			],
		);

		$source->objectType($fieldType, Type\RMFieldsType::config($source, 'RMProductType', $fields));
	}

}