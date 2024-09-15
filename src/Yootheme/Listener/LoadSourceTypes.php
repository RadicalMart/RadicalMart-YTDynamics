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

		PluginHelper::importPlugin('radicalmart_ytdynamics');

		$query = [
			Type\RMCustomCategoriesQueryType::config(),
			Type\RMCustomCategoriesWithChildQueryType::config(),
			Type\RMCustomCategoryQueryType::config(),
			Type\RMCustomProductsQueryType::config(),
			Type\RMCustomProductsQueryType::config(),
			Type\RMCategoriesQueryType::config(),
			Type\RMProductsQueryType::config(),
			Type\RMProductQueryType::config(),
			Type\RMUserQueryType::config(),
			Type\RMMenuQueryType::config(),
		];

		$types = [
			['RMCategoryType', Type\RMCategoryType::config()],
			['RMCategoryChildType', Type\RMCategoryChildType::config()],
			['RMCategoryParamsType', Type\RMCategoryParamsType::config()],
			['RMCategoryMediaType', Type\RMCategoryMediaType::config()],

			['RMProductType', Type\RMProductType::config()],
			['RMProductPriceType', Type\RMProductPriceType::config()],
			['RMProductImageType', Type\RMProductImageType::config()],
			['RMProductStockType', Type\RMProductStockType::config()],
			['RMProductParamsType', Type\RMProductParamsType::config()],

			['RMFieldType', Type\RMFieldType::config()],
			['RMChoiceFieldStringType', Type\Fields\RMChoiceFieldStringType::config()],
			['RMChoiceFieldType', Type\Fields\RMChoiceFieldType::config()],
			['RMValueFieldType', Type\Fields\RMValueFieldType::config()],
			['RMUserType', Type\RMUserType::config()],

			['RMMenuType', Type\RMMenuType::config()],
		];

		PluginHelper::importPlugin('ytdynamics');

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
							'call' => Type\RMFieldsType::class . '::field',
						],
					],
				],
			],
		);

		$source->objectType($fieldType, Type\RMFieldsType::config($source, 'RMProductType', $fields));
	}

}