<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use function YOOtheme\trans;

class RMCustomCategoriesWithChildQueryType extends RMCustomCategoriesQueryType
{
    public static function config(): array
    {
        return [
            'fields' => [
                'customRadicalMartCategoriesWithChild' => [
                    'type' => [
                        'listOf' => 'RMCategoryChildType',
                    ],

                    'args' => [
                        'catid'           => [
                            'type' => 'Int',
                            'defaultValue' => 1,
                        ],
                        'offset'          => [
                            'type' => 'Int',
                            'defaultValue' => 0,
                        ],
                        'limit'           => [
                            'type' => 'Int',
                            'defaultValue' => 10,
                        ],
                        'order'           => [
                            'type' => 'String',
                            'defaultValue' => 'lft',
                        ],
                        'order_direction' => [
                            'type' => 'String',
                            'defaultValue' => 'ASC',
                        ],
                        'order_alphanum'  => [
                            'type' => 'Boolean',
                        ],
                    ],

                    'metadata' => [
                        'label'  => trans('RadicalMart Categories with Children by Parameters'),
                        'group'  => trans('RadicalMart'),
                        'fields' => [
                            'catid'          => [
                                'label'       => trans('Parent Category'),
                                'description' => trans(
                                    'Categories are only loaded from the selected parent category.',
                                ),
                                'type'        => 'select',
                                'default'     => 1,
                                'options'     => [
                                    ['value' => 1, 'text' => trans('Root')],
                                    ['evaluate' => 'yootheme.builder.radicalmart_categories'],
                                ],
                            ],
                            '_offset'        => [
                                'description' => trans(
                                    'Set the starting point and limit the number of articles.',
                                ),
                                'type'        => 'grid',
                                'width'       => '1-2',
                                'fields'      => [
                                    'offset' => [
                                        'label'    => trans('Start'),
                                        'type'     => 'number',
                                        'default'  => 0,
                                        'modifier' => 1,
                                        'attrs'    => [
                                            'min'      => 1,
                                            'required' => true,
                                        ],
                                    ],
                                    'limit'  => [
                                        'label'   => trans('Quantity'),
                                        'type'    => 'limit',
                                        'default' => 10,
                                        'attrs'   => [
                                            'min' => 1,
                                        ],
                                    ],
                                ],
                            ],
                            '_order'         => [
                                'type'   => 'grid',
                                'width'  => '1-2',
                                'fields' => [
                                    'order'           => [
                                        'label'   => trans('Order'),
                                        'type'    => 'select',
                                        'default' => 'lft',
                                        'options' => [
                                            trans('Category Order') => 'lft',
                                            trans('Alphabetical') => 'title',
                                            trans('ID') => 'id',
                                        ],
                                    ],
                                    'order_direction' => [
                                        'label'   => trans('Direction'),
                                        'type'    => 'select',
                                        'default' => 'ASC',
                                        'options' => [
                                            trans('Ascending')  => 'ASC',
                                            trans('Descending') => 'DESC',
                                        ],
                                    ],
                                ],
                            ],
                            'order_alphanum' => [
                                'text' => trans('Alphanumeric Ordering'),
                                'type' => 'checkbox',
                            ],
                        ],
                    ],

                    'extensions' => [
                        'call' => __CLASS__ . '::resolve',
                    ],
                ],
            ],
        ];
    }

    /**
     * @throws \Exception
     */
    public static function resolve($root, array $args): array
    {
        return parent::resolve($root, $args);
    }
}
