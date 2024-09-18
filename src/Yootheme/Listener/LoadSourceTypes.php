<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsSourceEvent;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type;
use YOOtheme\Builder\Source;
use function YOOtheme\trans;

class LoadSourceTypes
{

	public function handle($source): void
	{

		$query = [
			Type\Category\RMCustomCategoriesQueryType::config(),
			Type\Category\RMCustomCategoriesWithChildQueryType::config(),
			Type\Category\RMCustomCategoryQueryType::config(),
			Type\Category\RMCategoriesQueryType::config(),

			Type\Product\RMCustomProductsQueryType::config(),
			Type\Product\RMCustomProductsQueryType::config(),
			Type\Product\RMProductsQueryType::config(),
			Type\Product\RMProductQueryType::config(),

			Type\LK\RMLKQueryType::config(),
		];

		$types = [
			// Category
			['RMCategoryType', Type\Category\RMCategoryType::config()],
			['RMCategoryChildType', Type\Category\RMCategoryChildType::config()],
			['RMCategoryParamsType', Type\Category\RMCategoryParamsType::config()],
			['RMCategoryMediaType', Type\Category\RMCategoryMediaType::config()],

			// Product
			['RMProductType', Type\Product\RMProductType::config()],
			['RMProductPriceType', Type\Product\RMProductPriceType::config()],
			['RMProductImageType', Type\Product\RMProductImageType::config()],
			['RMProductStockType', Type\Product\RMProductStockType::config()],
			['RMProductParamsType', Type\Product\RMProductParamsType::config()],

			// Product fields
			['RMFieldType', Type\Product\RMFieldType::config()],
			['RMChoiceFieldStringType', Type\Product\Fields\RMChoiceFieldStringType::config()],
			['RMChoiceFieldType', Type\Product\Fields\RMChoiceFieldType::config()],
			['RMValueFieldType', Type\Product\Fields\RMValueFieldType::config()],

			// LK
			['RMMenuType', Type\LK\RMMenuType::config()],
			['RMUserType', Type\LK\RMUserType::config()],
			['RMPersonalType', Type\LK\RMPersonalType::config()],
			['RMSettingsType', Type\LK\RMSettingsType::config()],
			['RMOrderType', Type\LK\RMOrderType::config()],
		];

		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsSource',
			new YTDynamicsSourceEvent('onRadicalMartYTDynamicsSource', ['query' => &$query, 'types' => &$types])
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
							'call' => Type\Product\RMFieldsType::class . '::field',
						],
					],
				],
			],
		);

		$source->objectType($fieldType, Type\Product\RMFieldsType::config($source, 'RMProductType', $fields));
	}

}