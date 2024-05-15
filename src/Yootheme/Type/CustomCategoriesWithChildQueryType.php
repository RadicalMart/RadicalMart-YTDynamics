<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class CustomCategoriesWithChildQueryType extends CustomCategoriesQueryType
{
    /**
     * @return array
     */
    public static function config()
    {
        return [
            'fields' => [
                'CustomRadicalMartCategories' => [
                    'type' => [
                        'listOf' => 'CategoryType'
                    ],

                    'args' => [
	                    'catid' => [
		                    'type' => 'Int',
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
                        'label' => trans('Custom Categories with child categories'),
                        'group' => trans('RadicalMart'),
                        'fields' => [
	                        'catid' => [
		                        'label' => trans('Parent Category'),
		                        'description' => trans(
			                        'Categories are only loaded from the selected parent category.',
		                        ),
		                        'type' => 'select',
		                        'default' => 1,
		                        'options' => [
			                        ['value' => 1, 'text' => trans('Root')],
			                        ['evaluate' => 'yootheme.builder.radicalmart_categories'],
		                        ],
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

        $model = Factory::getApplication()->bootComponent('com_radicalmart')
            ->getMVCFactory()
            ->createModel('Categories', 'Site', ['ignore_request' => true]);

		$model->setState('category.id', (int) $args['catid']);

	    if(!empty($args['limit']))
	    {
		    $model->setState('list.limit', (int) $args['limit']);
	    }

		$items = $model->getItems();

		foreach ($items as $item)
		{
			$model->setState('category.id', (int) $item->id);
			$item->child = $model->getItems();
		}

        return $items;
    }

}
