<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\Plugin\System\YTDynamics\Yootheme\Type;
use YOOtheme\Builder\Source;
use function YOOtheme\trans;

class LoadSourceTypes
{

	public function handle($source): void
	{

		$query = [
			Type\CustomCategoriesQueryType::config(),
			Type\CustomCategoriesWithChildQueryType::config(),
			Type\CustomCategoryQueryType::config(),
			Type\CustomProductsQueryType::config(),
			Type\CustomProductsQueryType::config(),
			Type\CategoriesQueryType::config(),
			Type\ProductsQueryType::config(),
			Type\ProductQueryType::config(),
		];

		$types = [
			['CategoryType', Type\CategoryType::config()],
			['CategoryParamsType', Type\CategoryParamsType::config()],
			['CategoryMediaType', Type\CategoryMediaType::config()],
			['ProductType', Type\ProductType::config()],
			['PriceType', Type\PriceType::config()],
			['ProductImageType', Type\ProductImageType::config()],
			['FieldType', Type\FieldType::config()],
			['ProductParamsType', Type\ProductParamsType::config()],
		];

		foreach ($query as $args)
		{
			$source->queryType($args);
		}

		foreach ($types as $args)
		{
			$source->objectType(...$args);
		}

	}

}