<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;

use function YOOtheme\trans;

class RMCategoryChildType extends RMCategoryType
{
    public static function config(): array
    {
        $config = parent::config();

        $config['fields']['child'] = [
            'type'       => [
                'listOf' => 'RMCategoryChildType',
            ],
            'metadata'   => [
                'label' => trans('Child Categories'),
				'group' => trans('Categories'),
            ],
            'extensions' => [
                'call' => __CLASS__ . '::child',
            ],
        ];

        return $config;
    }

    /**
     * @throws \Exception
     */
    public static function child($item): array
    {
        $application = Factory::getApplication();
        /** @var \Joomla\Component\RadicalMart\Administrator\Extension\RadicalMartComponent $radicalMart */
        $radicalMart = $application->bootComponent('com_radicalmart');
        /** @var \Joomla\Component\RadicalMart\Site\Model\CategoryModel $categoryModel */
        $categoryModel = $radicalMart
            ->getMVCFactory()
            ->createModel('Category', 'Site', ['ignore_request' => true]);
        $categoryModel->setState('params', ComponentHelper::getParams('com_radicalmart'));
        $categoryModel->setState('category.id', (int)$item->id);
        $categoryModel->setState('filter.published', 1);
        $categoryModel->setState('filter.language', Multilanguage::isEnabled());

        $children = $categoryModel->getChildren($item->id);

        return is_array($children) ? $children : [];
    }
}
