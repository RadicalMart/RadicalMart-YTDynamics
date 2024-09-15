<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields;

use function YOOtheme\trans;

class RMValueFieldType
{
    /**
     * @return array
     */
    public static function config()
    {
        return [
            'fields' => [
                'value' => [
                    'type' => 'String',
                    'metadata' => [
                        'label' => trans('Value'),
                    ],
                ],
            ],
        ];
    }
}
