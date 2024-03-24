<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme;

use Joomla\CMS\Factory;
use Joomla\Component\RZ\Administrator\Helper\MultisiteHelper;
use function YOOtheme\trans;

class ProductsQueryType
{
    /**
     * @return array
     */
    public static function config()
    {
        return [
            'fields' => [
                'Offices' => [
                    'type' => [
                        'listOf' => 'ProductType'
                    ],

                    'args' => [
                        'category' => [
                            'type' => [
                                'listOf' => 'String',
                            ],
                        ],
                        'offset' => [
                            'type' => 'Int',
                        ],
                        'limit' => [
                            'type' => 'Int',
                        ],
                        'order' => [
                            'type' => 'String',
                        ],
                        'order_direction' => [
                            'type' => 'String',
                        ],
                        'order_alphanum' => [
                            'type' => 'Boolean',
                        ],
                    ],

                    'metadata' => [
                        'label' => trans('Products'),
                        'group' => trans('Custom'),
                        'fields' => [
                            'category' => [
                                'label' => trans('Filter by category'),
                                'type' => 'select',
                                'default' => [],
                                'options' => [['evaluate' => 'yootheme.builder.categories']],
                                'attrs' => [
                                    'multiple' => true,
                                    'class' => 'uk-height-small',
                                ],
                            ],
                            'favorite' => [
                                'label' => trans('Filter by favorite'),
                                'type' => 'checkbox',
                            ],
                            '_offset' => [
                                'description' => trans(
                                    'Set the starting point and limit the number of articles.'
                                ),
                                'type' => 'grid',
                                'width' => '1-2',
                                'fields' => [
                                    'offset' => [
                                        'label' => trans('Start'),
                                        'type' => 'number',
                                        'default' => 0,
                                        'modifier' => 1,
                                        'attrs' => [
                                            'min' => 1,
                                            'required' => true,
                                        ],
                                    ],
                                    'limit' => [
                                        'label' => trans('Quantity'),
                                        'type' => 'limit',
                                        'default' => 10,
                                        'attrs' => [
                                            'min' => 1,
                                        ],
                                    ],
                                ],
                            ],
                            '_order' => [
                                'type' => 'grid',
                                'width' => '1-2',
                                'fields' => [
                                    'order' => [
                                        'label' => trans('Order'),
                                        'type' => 'select',
                                        'default' => 'publish_up',
                                        'options' => [
                                            [
                                                'evaluate' =>
                                                    'yootheme.builder.sources.articleOrderOptions',
                                            ],
                                        ],
                                    ],
                                    'order_direction' => [
                                        'label' => trans('Direction'),
                                        'type' => 'select',
                                        'default' => 'DESC',
                                        'options' => [
                                            trans('Ascending') => 'ASC',
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

    public static function resolve($root, array $args)
    {
        $model = Factory::getApplication()->bootComponent('com_rz')
            ->getMVCFactory()
            ->createModel('Products', 'Administrator', ['ignore_request' => true]);

        if (!empty($args['category'])) {
            if (is_int($args['category'])) {
                $model->setState('filter.category', (int)$args['category']);
            }
        }

        return $model->getItems();
    }

}
