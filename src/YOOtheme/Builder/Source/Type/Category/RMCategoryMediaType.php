<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\BaseType;

use function YOOtheme\trans;

class RMCategoryMediaType extends BaseType
{

    /**
     * @throws \Exception
     */
    public static function config(): array
    {
        return parent::triggerEvent([
            'fields' => [
                'image' => [
                    'type'     => 'String',
                    'metadata' => [
                        'label' => trans('Image'),
                    ],
                ],
                'icon'  => [
                    'type'     => 'String',
                    'metadata' => [
                        'label' => trans('Icon'),
                    ],
                ],
            ],
        ]);
    }

}