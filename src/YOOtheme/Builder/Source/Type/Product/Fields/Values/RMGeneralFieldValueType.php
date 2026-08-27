<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Product\Fields\Values;

use function YOOtheme\trans;

class RMGeneralFieldValueType
{
    /**
     * @return array
     */
    public static function config(): array
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
