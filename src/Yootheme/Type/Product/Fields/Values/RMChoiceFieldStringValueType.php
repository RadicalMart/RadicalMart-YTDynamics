<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Values;

use Joomla\CMS\Language\Text;
use function YOOtheme\trans;

class RMChoiceFieldStringValueType
{
    /**
     * @return array
     */
    public static function config()
    {
        $field = [
            'type' => 'String',
            'args' => [
                'separator' => [
                    'type' => 'String',
                ],
            ],
            'metadata' => [
                'arguments' => [
                    'separator' => [
                        'label' => trans('Separator'),
                        'description' => trans('Set the separator between fields.'),
                        'default' => ', ',
                    ],
                ],
            ],
        ];

        return [
            'fields' => [
                'text' => array_merge_recursive($field, [
                    'metadata' => [
                        'label' => trans('Texts'),
                    ],
                    'extensions' => [
                        'call' => __CLASS__ . '::resolveTexts',
                    ],
                ]),

                'value' => array_merge_recursive($field, [
                    'metadata' => [
                        'label' => trans('Values'),
                    ],
                    'extensions' => [
                        'call' => __CLASS__ . '::resolveValues',
                    ],
                ]),
            ],
        ];
    }

    public static function resolveTexts($item, $args)
    {
        $args += ['separator' => ', '];

        $result = array_map(fn($item) => Text::_($item), array_column($item, 'text'));

        return join($args['separator'], $result);
    }

    public static function resolveValues($item, $args)
    {
        $args += ['separator' => ', '];

        return join($args['separator'], array_column($item, 'value'));
    }
}
