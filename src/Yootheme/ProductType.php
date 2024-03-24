<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme;

use Joomla\CMS\Factory;
use function YOOtheme\trans;

class ProductType
{
    /**
     * @return array
     */
    public static function config()
    {
        return [
            'fields' => [
                'title' => [
                    'type'     => 'String',
                    'metadata' => [
                        'label'   => trans('Title'),
                        'filters' => ['limit'],
                    ],
                ],

                'categories' => [
                    'type'       => 'CategoryType',
                    'metadata'   => [
                        'label' => trans('Category'),
                    ],
                    'extensions' => [
                        'call' => __CLASS__ . '::category',
                    ],
                ],

                'id' => [
                    'type'     => 'String',
                    'metadata' => [
                        'label' => trans('ID'),
                    ],
                ],

            ],

            'metadata' => [
                'type'  => true,
                'label' => trans('Product'),
            ],
        ];
    }

    public static function category($item)
    {
        $model = Factory::getApplication()->bootComponent('com_radicalmart')
            ->getMVCFactory()
            ->createModel('Categories', 'Administrator', ['ignore_request' => true]);

        return $model->getItem($item->catid);
    }

}
