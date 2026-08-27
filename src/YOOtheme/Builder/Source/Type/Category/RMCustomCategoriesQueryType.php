<?php
namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;

use function YOOtheme\trans;

class RMCustomCategoriesQueryType
{
    public static function config(): array
    {
        return [
            'fields' => [
                'customRadicalMartCategories' => [
                    'type' => [
                        'listOf' => 'RMCategoryType',
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
                        'label'  => trans('RadicalMart Categories by Parameters'),
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
        $args += [
            'catid' => 1,
            'offset' => 0,
            'limit' => 10,
            'order' => 'lft',
            'order_direction' => 'ASC',
            'order_alphanum' => false,
        ];

        $application = Factory::getApplication();
        /** @var \Joomla\Component\RadicalMart\Administrator\Extension\RadicalMartComponent $radicalMart */
        $radicalMart = $application->bootComponent('com_radicalmart');
        /** @var \Joomla\Component\RadicalMart\Site\Model\CategoryModel $categoryModel */
        $categoryModel = $radicalMart
            ->getMVCFactory()
            ->createModel('Category', 'Site', ['ignore_request' => true]);

        $categoryModel->setState('params', ComponentHelper::getParams('com_radicalmart'));
        $categoryModel->setState('filter.published', 1);
        $categoryModel->setState('filter.language', Multilanguage::isEnabled());

        $categoryId = max(1, (int) $args['catid']);
        $categoryModel->setState('category.id', $categoryId);

        $categories = $categoryModel->getChildren($categoryId);
        if (!is_array($categories)) {
            return [];
        }

        $columns = ['lft', 'title', 'id'];
        $column = in_array($args['order'], $columns, true) ? $args['order'] : 'lft';
        $direction = strtoupper((string) $args['order_direction']) === 'DESC' ? -1 : 1;
        $alphanumeric = !empty($args['order_alphanum']);

        usort($categories, static function ($category, $other) use ($column, $direction, $alphanumeric) {
            $value = $category->{$column} ?? null;
            $otherValue = $other->{$column} ?? null;
            $comparison = $alphanumeric
                ? strnatcasecmp((string) $value, (string) $otherValue)
                : ($value <=> $otherValue);

            return $comparison * $direction;
        });

        return array_slice(
            $categories,
            max(0, (int) $args['offset']),
            max(0, (int) $args['limit']) ?: null,
        );
    }

}
