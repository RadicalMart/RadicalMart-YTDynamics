<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsConfigEvent;
use YOOtheme\Config;

use function YOOtheme\trans;

class LoadBuilderConfig
{
    public Config $config;

    public function __construct(Config $config)
    {
        $this->config = $config;
    }

    /**
     * @throws \Exception
     */
    public function handle($config): void
    {
        $application = Factory::getApplication();
        /** @var \Joomla\Component\RadicalMart\Administrator\Extension\RadicalMartComponent $radicalmart */
        $radicalmart = $application->bootComponent('com_radicalmart');

        /** @var \Joomla\Component\RadicalMart\Administrator\Model\CategoriesModel $categoriesModel */
        $categoriesModel = $radicalmart
            ->getMVCFactory()
            ->createModel('Categories', 'Administrator', ['ignore_request' => true]);
        $categoriesModel->setState('filter.published', 1);
        $categoriesModel->setState('list.ordering', 'c.lft');
        $categoriesModel->setState('list.direction', 'asc');
        $categoriesModel->setState('list.limit', 0);
        $categories = $categoriesModel->getItems();

        /** @var \Joomla\Component\RadicalMart\Administrator\Model\FieldsetsModel $fieldsetsModel */
        $fieldsetsModel = $radicalmart
            ->getMVCFactory()
            ->createModel('Fieldsets', 'Administrator', ['ignore_request' => true]);
        $fieldsetsModel->setState('list.limit', 0);
        $fieldsets = $fieldsetsModel->getItems();

        $templates = $this->getTemplates();

        $config->merge([
            'templates'              => $templates,
            'radicalmart_categories' => array_map(
                fn($category) => [
                    'value' => (string)$category->id,
                    'text' => $category->level > 1
                        ? str_repeat('- ', ($category->level - 1)) . $category->title
                        : $category->title
                ],
                $categories,
            ),
            'radicalmart_fieldsets'  => array_map(
                fn($fieldset) => ['value' => (string)$fieldset->id, 'text' => $fieldset->title],
                $fieldsets,
            ),
        ]);

        $application->getDispatcher()->dispatch(
            YTDynamicsConfigEvent::EVENT_NAME,
            new YTDynamicsConfigEvent(YTDynamicsConfigEvent::EVENT_NAME, ['config' => &$config]),
        );
    }

    private function getTemplates(): array
    {
        $languageField = [
            'label'        => trans('Limit by Language'),
            'type'         => 'select',
            'defaultIndex' => 0,
            'options'      => [['evaluate' => 'YOOtheme.builder.languages']],
            'show'         => 'YOOtheme.builder.languages.length > 1 || lang',
        ];

        $productListViewField = [
            'label'       => trans('Limit by Product List View'),
            'description' => trans(
                'The template is only assigned when products are displayed using the selected view.',
            ),
            'type'        => 'select',
            'default'     => '',
            'options'     => [
                trans('Any')   => '',
                trans('Grid')  => 'grid',
                trans('List')  => 'list',
                trans('Table') => 'table',
            ],
        ];

        $includeChildCategoriesField = [
            'type'    => 'select',
            'options' => [
                trans('Exclude child categories')      => '',
                trans('Include child categories')      => 'include',
                trans('Only include child categories') => 'only',
            ],
        ];

        return [
            'com_radicalmart.product' => [
                'label'    => trans('RadicalMart Product'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'catid' => ($category = [
                                'label'   => trans('Limit by Categories'),
                                'type'    => 'select',
                                'default' => [],
                                'options' => [['evaluate' => 'yootheme.builder.radicalmart_categories']],
                                'attrs'   => [
                                    'multiple' => true,
                                    'class'    => 'uk-height-small',
                                ],
                            ]),
                            'include_child_categories' => [
                                'description' => trans(
                                    'The template is only assigned to products from the selected categories. Use the <kbd>shift</kbd> or <kbd>ctrl/cmd</kbd> key to select multiple categories.',
                                ),
                            ] + $includeChildCategoriesField,
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.categories' => [
                'label'    => trans('RadicalMart Categories'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'catid' => [
                                'description' => trans(
                                    'The template is only assigned when building starts from one of the selected categories.',
                                ),
                            ] + $category,
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.categories.alphabetical' => [
                'label'    => trans('RadicalMart Categories (Alphabetical)'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'catid' => [
                                'description' => trans(
                                    'The template is only assigned when building starts from one of the selected categories.',
                                ),
                            ] + $category,
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.category' => [
                'label'    => trans('RadicalMart Category'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'catid' => $category,
                            'include_child_categories' => [
                                'description' => trans(
                                    'The template is only assigned to the selected category pages. Use the <kbd>shift</kbd> or <kbd>ctrl/cmd</kbd> key to select multiple categories.',
                                ),
                            ] + $includeChildCategoriesField,
                            'pages' => [
                                'label'       => trans('Limit by Page Number'),
                                'description' => trans(
                                    'The template is only assigned to the selected pages of the category product list.',
                                ),
                                'type'        => 'select',
                                'options'     => [
                                    trans('All pages')             => '',
                                    trans('First page')            => 'first',
                                    trans('All except first page') => 'except_first',
                                ],
                            ],
                            'product_list_view' => $productListViewField,
                            'lang'              => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.personal' => [
                'label'    => trans('RadicalMart Personal Account'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.settings' => [
                'label'    => trans('RadicalMart Account Settings'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.orders' => [
                'label'    => trans('RadicalMart Orders'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart.order' => [
                'label'    => trans('RadicalMart Order'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_users.profile' => [
                'label'    => trans('RadicalMart User Profile'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_favorites.favorites' => [
                'label'    => trans('RadicalMart Favorites'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_compare.compare' => [
                'label'    => trans('RadicalMart Product Comparison'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_bonuses.points' => [
                'label'    => trans('RadicalMart Bonus Points'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_bonuses.codes' => [
                'label'    => trans('RadicalMart Bonus Codes'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'lang' => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_search.search' => [
                'label'    => trans('RadicalMart Search Results'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'product_list_view' => $productListViewField,
                            'lang'              => $languageField,
                        ],
                    ],
                ],
            ],

            'com_radicalmart_landings.page' => [
                'label'    => trans('RadicalMart Landing Page'),
                'fieldset' => [
                    'default' => [
                        'fields' => [
                            'product_list_view' => $productListViewField,
                            'lang'              => $languageField,
                        ],
                    ],
                ],
            ],
        ];
    }

}
