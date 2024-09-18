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
		$model_categories->setState('list.limit, 0');
		$categories = $model_categories->getItems();

		$model_fieldsets = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Fieldsets', 'Administrator', ['ignore_request' => true]);
		$model_fieldsets->setState('list.limit, 0');
		$fieldsets = $model_fieldsets->getItems();

		$options_categories = [];
		$options_fieldsets  = [];

		foreach ($categories as $category)
		{
			$options_categories[] = ['value' => $category->id, 'text' => $category->title];
		}

		foreach ($fieldsets as $fieldset)
		{
			$options_fieldsets[] = ['value' => $fieldset->id, 'text' => $fieldset->title];
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
				'label'    => trans('RM single product'),
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
				'label'    => trans('RM list all categories'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang' => $languageField,
						],
					],
				],
			],

			'com_radicalmart.categories.alphabetical' => [
				'label'    => trans('RM list all categories alphabetical'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang' => $languageField,
						],
					],
				],
			],

			'com_radicalmart.category' => [
				'label'    => trans('RM Category'),
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

			'com_users.profile' => [
				'label'    => trans('RM user'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang'  => $languageField,
						],
					],
				],
			],

			'com_radicalmart.personal' => [
				'label'    => trans('RM personal'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang'  => $languageField,
						],
					],
				],
			],

			'com_radicalmart.settings' => [
				'label'    => trans('RM settings'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang'  => $languageField,
						],
					],
				],
			],

			'com_radicalmart.orders' => [
				'label'    => trans('RM Orders'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang'  => $languageField,
						],
					],
				],
			],

			'com_radicalmart.order' => [
				'label'    => trans('RM Order'),
				'fieldset' => [
					'default' => [
						'fields' => [
							'lang'  => $languageField,
						],
					],
				],
			],
		];

		$config->merge([
			'templates'              => $templates,
			'radicalmart_categories' => $options_categories,
			'radicalmart_fieldsets'  => $options_fieldsets,
		]);

	}

}
