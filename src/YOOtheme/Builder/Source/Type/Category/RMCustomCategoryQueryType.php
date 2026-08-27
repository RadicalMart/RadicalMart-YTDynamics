<?php namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Type\Category;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use function YOOtheme\trans;

class RMCustomCategoryQueryType
{
	/**
	 * @return array
	 */
	public static function config(): array
	{
		return [
			'fields' => [
				'customRadicalMartCategory' => [
					'type' => 'RMCategoryType',

					'args' => [
						'id' => [
							'type' => 'Int',
						],
					],

					'metadata' => [
						'label'  => trans('RadicalMart Category by ID'),
						'group'  => trans('RadicalMart'),
						'fields' => [
							'id' => [
								'label'   => trans('Category'),
								'type'    => 'select',
								'default' => 1,
								'options' => [
									['value' => 1, 'text' => trans('Root')],
									['evaluate' => 'yootheme.builder.radicalmart_categories']
								],
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
    public static function resolve($root, array $args): ?object
    {
        if (empty($args['id'])) {
            return null;
        }

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

		try {
			return $categoryModel->getItem((int) $args['id']) ?: null;
		} catch (\Throwable) {
			return null;
		}
	}
}
