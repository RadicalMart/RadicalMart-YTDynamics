<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Values;

use function YOOtheme\trans;

class RMGeneralFieldValueType
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
