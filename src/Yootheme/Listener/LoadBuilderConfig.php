<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Factory;
use YOOtheme\Builder\BuilderConfig;
use YOOtheme\Config;
use function YOOtheme\trans;

class LoadBuilderConfig
{
	public Config $config;

	public function __construct(Config $config)
	{
		$this->config = $config;
	}

	public function handle($config): void
	{
		$model_categories = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Categories', 'Administrator', ['ignore_request' => true]);

		$model_categories->setState('filter.published', 1);
		$categories = $model_categories->getItems();
		$options    = [
		];

		foreach ($categories as $category)
		{
			$options[] = ['value' => $category->id, 'text' => $category->title];
		}

		$languageField = [
			'label'        => trans('Limit by Language'),
			'type'         => 'select',
			'defaultIndex' => 0,
			'options'      => [['evaluate' => 'yootheme.builder.languages']],
			'show'         => 'yootheme.builder.languages.length > 1 || lang',
		];

		$templates = [
			'com_radicalmart.product' => [
				'label'    => trans('Single Product'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'catid' => ($category = [
								'label'       => trans('Limit by Categories'),
								'description' => trans(
									'The template is only assigned to articles from the selected categories. Articles from child categories are not included. Use the <kbd>shift</kbd> or <kbd>ctrl/cmd</kbd> key to select multiple categories.',
								),
								'type'        => 'select',
								'default'     => [],
								'options'     => [['evaluate' => 'yootheme.builder.radicalmart_categories']],
								'attrs'       => [
									'multiple' => true,
									'class'    => 'uk-height-small',
								],
							]),
							'lang'  => $languageField,
						],
					],
				],
			],

			'com_radicalmart.categories' => [
				'label'    => trans('List All Categories'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang' => $languageField,
						],
					],
				],
			],

			'com_radicalmart.category' => [
				'label'    => trans('Category RadicalMart'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'catid' =>
								[
									'label'       => trans('Limit by Categories'),
									'description' => trans(
										'The template is only assigned to the selected categories. Child categories are not included. Use the <kbd>shift</kbd> or <kbd>ctrl/cmd</kbd> key to select multiple categories.',
									),
								] + $category,
							'pages' => [
								'label'       => trans('Limit by Page Number'),
								'description' => trans(
									'The template is only assigned to the selected pages.',
								),
								'type'        => 'select',
								'options'     => [
									trans('All pages')             => '',
									trans('First page')            => 'first',
									trans('All except first page') => 'except_first',
								],
							],
							'lang'  => $languageField,
						],
					],
				],
			],
		];

		$config->merge([
			'templates'              => $templates,
			'radicalmart_categories' => $options
		]);

	}

}
