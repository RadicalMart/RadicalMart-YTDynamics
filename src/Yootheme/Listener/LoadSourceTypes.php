<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsSourceEvent;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type;
use YOOtheme\Builder\Source;
use function YOOtheme\trans;

class LoadSourceTypes
{

	public function handle($source): void
	{

		$query = [
			// Category
			Type\Category\RMCustomCategoriesQueryType::config(),
			Type\Category\RMCustomCategoriesWithChildQueryType::config(),
			Type\Category\RMCustomCategoryQueryType::config(),
			Type\Category\RMCategoriesQueryType::config(),

			// Product
			Type\Product\RMCustomProductQueryType::config(),
			Type\Product\RMCustomProductsQueryType::config(),
			Type\Product\RMProductsQueryType::config(),
			Type\Product\RMProductQueryType::config(),

			// LK
			Type\LK\RMLKQueryType::config(),
			Type\LK\RMOrdersQueryType::config(),
			Type\LK\RMCustomOrdersQueryType::config(),

			// Page
			Type\Pages\RMPageLandingsQueryType::config(),

			// Search
			Type\Search\RMSearchQueryType::config(),
			Type\Search\RMSmartSearchQueryType::config(),
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

			// Product plugins
			['RMProductPluginsType', Type\Product\RMProductPluginsType::config()],
			['RMProductPluginsBlockType', Type\Product\RMProductPluginsBlockType::config()],

			// LK
			['RMMenuType', Type\LK\RMMenuType::config()],
			['RMUserType', Type\LK\RMUserType::config()],
			['RMOrderType', Type\LK\RMOrderType::config()],
			['RMOrderStatusType', Type\LK\RMOrderStatusType::config()],
			['RMOrderTotalType', Type\LK\RMOrderTotalType::config()],
			['RMOrderStatusParamsType', Type\LK\RMOrderStatusParamsType::config()],
			['RMComponentPersonalType', Type\LK\RMComponentPersonalType::config()],
			['RMComponentSettingsType', Type\LK\RMComponentSettingsType::config()],
			['RMComponentOrdersType', Type\LK\RMComponentOrdersType::config()],
			['RMComponentOrderType', Type\LK\RMComponentOrderType::config()],
			['RMComponentPointsType', Type\LK\RMComponentPointsType::config()],
			['RMComponentCodesType', Type\LK\RMComponentCodesType::config()],
			['RMComponentFavoritesType', Type\LK\RMComponentFavoritesType::config()],
			['RMComponentCompareType', Type\LK\RMComponentCompareType::config()],

			// Pages
			['RMPageLandingType', Type\Pages\RMPageLandingType::config()],
			['RMPageLandingParamsType', Type\Pages\RMPageLandingParamsType::config()],

			// Search
			['RMSearchType', Type\Search\RMSearchType::config()],

		];

		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsSource',
			new YTDynamicsSourceEvent('onRadicalMartYTDynamicsSource', ['source' => &$source, 'query' => &$query, 'types' => &$types])
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