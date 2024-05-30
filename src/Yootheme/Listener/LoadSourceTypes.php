<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Factory;
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

		$this->configFields($source, 'RMProductType', $fields);
	}

	protected function configFields($source, $type, array $fields): void
	{
		// add field on type
		$source->objectType(
			$type,
			[
				'fields' => [
					'field' => [
						'type'       => ($fieldType = "{$type}Fields"),
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

		// configure field type
		$source->objectType($fieldType, Type\RMFieldsType::config($source, $type, $fields));
	}

}