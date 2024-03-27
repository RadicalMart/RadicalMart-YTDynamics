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
		];

		$types = [
			['CategoryType', Type\CategoryType::config()],
			['ProductType', Type\ProductType::config()],
			['PriceType', Type\PriceType::config()],
			['ImageType', Type\ImageType::config()],
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