<?php
namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use function YOOtheme\trans;

class RMCategoriesQueryType
{
    /**
     * @return array
     */
    public static function config(): array
    {
        return [
            'fields' => [
                'radicalMartCategory'      => [
                    'type'       => 'RMCategoryType',
                    'metadata'   => [
                        'label'  => trans('RadicalMart Category'),
                        'view'   => ['com_radicalmart.category'],
                        'group'  => trans('Page'),
                    ],
                    'extensions' => [
                        'call' => __CLASS__ . '::resolveSingle',
                    ],
                ],
                'radicalMartCategoryChild' => [
                    'type'       => 'RMCategoryChildType',
                    'metadata'   => [
                        'label'  => trans('RadicalMart Category with Children'),
                        'view'   => ['com_radicalmart.category'],
                        'group'  => trans('Page'),
                    ],
                    'extensions' => [
                        'call' => __CLASS__ . '::resolveWithChildren',
                    ],
                ],
                'radicalMartCategories'    => [
                    'type'       => [
                        'listOf' => 'RMCategoryType',
                    ],
                    'args'       => [
                        'offset' => [
                            'type' => 'Int',
                            'defaultValue' => 0,
                        ],
                        'limit'  => [
                            'type' => 'Int',
                        ],
                    ],
                    'metadata'   => [
                        'label'  => trans('RadicalMart Categories'),
                        'view'   => [
                            'com_radicalmart.categories',
                            'com_radicalmart.categories.alphabetical',
                        ],
                        'group'  => trans('Page'),
                        'fields' => [
                            '_offset' => [
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
                                        'label' => trans('Quantity'),
                                        'type'  => 'limit',
                                        'attrs' => [
                                            'placeholder' => trans('No limit'),
                                            'min'         => 0,
                                        ],
                                    ],
                                ],
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

    public static function resolve($root, array $args)
    {
        $args += [
            'offset' => 0,
            'limit'  => null,
        ];

        $views = ['com_radicalmart.categories', 'com_radicalmart.categories.alphabetical'];
        if (!in_array($root['template'] ?? $views[0], $views, true)) {
            return [];
        }

        if (isset($root['items']) && is_array($root['items'])) {
            $items = $root['items'];

            if ($args['offset'] || $args['limit']) {
                $items = array_slice($items, (int)$args['offset'], (int)$args['limit'] ?: null);
            }

            return $items;
        }

        return [];
    }

    /**
     * @throws \Exception
     */
    public static function resolveSingle($root, array $args = [])
    {
        if (($root['template'] ?? 'com_radicalmart.category') !== 'com_radicalmart.category') {
            return null;
        }

        if (empty($root['category']) || !is_object($root['category'])) {
            return null;
        }

        return $root['category'];
    }

    public static function resolveWithChildren($root, array $args = [])
    {
        $category = static::resolveSingle($root, $args);
        if (!$category) {
            return null;
        }

        $category->child = is_array($root['children'] ?? null) ? $root['children'] : [];

        return $category;
    }
}
