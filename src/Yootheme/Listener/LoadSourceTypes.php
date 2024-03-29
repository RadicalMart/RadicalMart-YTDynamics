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
			Type\CustomProductsQueryType::config(),
			Type\ProductsQueryType::config(),
			Type\ProductQueryType::config(),
		];

		$types = [
			['CategoryType', Type\CategoryType::config()],
			['ProductListType', Type\ProductListType::config()],
			['ProductType', Type\ProductType::config()],
			['PriceType', Type\PriceType::config()],
			['ProductImageType', Type\ProductImageType::config()],
			['FieldType', Type\FieldType::config()],
			['ParamsType', Type\ParamsType::config()],
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