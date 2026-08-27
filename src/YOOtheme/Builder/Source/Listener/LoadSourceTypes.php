<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsSourceEvent;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type;
use YOOtheme\Builder\Source;
use function YOOtheme\trans;
use YOOtheme\Translator;

class LoadSourceTypes
{
    public function __construct(private Translator $translator)
    {
    }

    /**
     * @throws \Exception
     */
    public function handle($source): void
    {
        $locale = str_replace('-', '_', $this->translator->getLocale());
        $translations = dirname(__DIR__, 5) . "/languages/{$locale}.json";

        if (is_file($translations)) {
            $this->translator->addResource($translations);
        }

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
//
        $types = [
            // Category
            ['RMCategoryType', Type\Category\RMCategoryType::config()],
            ['RMCategoryChildType', Type\Category\RMCategoryChildType::config()],
            ['RMCategoryParamsType', Type\Category\RMCategoryParamsType::config()],
            ['RMCategoryMediaType', Type\Category\RMCategoryMediaType::config()],

            // Product
            ['RMProductType', Type\Product\RMProductType::config()],
            ['RMProductMetaType', Type\Product\RMProductMetaType::config()],
            ['RMProductPriceType', Type\Product\RMProductPriceType::config()],
            ['RMProductImageType', Type\Product\RMProductImageType::config()],
            ['RMProductStockType', Type\Product\RMProductStockType::config()],
            ['RMProductParamsType', Type\Product\RMProductParamsType::config()],

            // Product fields
            ['RMFieldType', Type\Product\Fields\RMFieldType::config()],
            ['RMChoiceFieldStringValueType', Type\Product\Fields\Values\RMChoiceFieldStringValueType::config()],
            ['RMChoiceFieldValueType', Type\Product\Fields\Values\RMChoiceFieldValueType::config()],
            ['RMGeneralFieldValueType', Type\Product\Fields\Values\RMGeneralFieldValueType::config()],
            ['RMListFieldValueType', Type\Product\Fields\Values\RMListFieldValueType::config()],

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

        Factory::getApplication()
            ->getDispatcher()
            ->dispatch(
                'onRadicalMartYTDynamicsSource',
                new YTDynamicsSourceEvent(
                    'onRadicalMartYTDynamicsSource',
                    ['source' => &$source, 'query' => &$query, 'types' => &$types]
                )
            );

        foreach ($query as $args) {
            $source->queryType($args);
        }

        foreach ($types as $args) {
            $source->objectType(...$args);
        }

        /** @var \Joomla\Component\RadicalMart\Administrator\Extension\RadicalMartComponent $component */
        $component = Factory::getApplication()->bootComponent('com_radicalmart');
        /** @var \Joomla\Component\RadicalMart\Administrator\Model\FieldsModel $fieldsModel */
        $fieldsModel = $component->getMVCFactory()
            ->createModel('Fields', 'Administrator', ['ignore_request' => true]);
        $fieldsModel->setState('filter.published', 1);
        $fieldsModel->setState('list.limit', 0);

        $fields = $fieldsModel->getItems();

        if (empty($fields)) {
            return;
        }

        static::configFields($source, 'RMProductType', $fields);
        static::configFields($source, 'RMProductMetaType', $fields);
    }

    protected static function configFields(Source $source, string $type, array $fields): void
    {
        $fieldType = "{$type}Fields";

        $source->objectType(
            $type,
            [
                'fields' => [
                    'field' => [
                        'type' => $fieldType,
//                        'metadata' => [
//                            'label' => trans('Custom Fields'),
////                            'group' => trans('Data'),
//                        ],
                        'extensions' => [
                            'call' => Type\Product\RMFieldsType::class . '::field',
                        ],
                    ],
                ],
            ],
        );

        $source->objectType(
            $fieldType,
            fn() => Type\Product\RMFieldsType::config($source, $type, $fields),
        );
    }
}
