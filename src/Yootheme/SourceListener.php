<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme;

use YOOtheme\Builder\Source;
use YOOtheme\Builder\Joomla\Fields\Type;
use function YOOtheme\trans;

class SourceListener
{
    /**
     * @param Source $source
     */
    public static function initSource($source)
    {
        $types = [
            'CategoryType' => 'com_radicalmart.category',
            'ProductType' => 'com_radicalmart.product',
        ];

        $source->objectType('CategoryType', CategoryType::config());
        $source->queryType(CategoriesQueryType::config());

        $source->objectType('ProductType', ProductType::config());
        $source->queryType(ProductsQueryType::config());

    }

}