<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Router\SiteRouter;
use Joomla\Component\RadicalMart\Site\Helper\RouteHelper;
use Joomla\Component\RadicalMart\Site\Mapping\CategoryMapping;
use YOOtheme\Config;

class LoadTemplateUrl
{
    private const PRODUCT_LIST_VIEW_PARAMETER = 'com_radicalmart_category_list_item_template';
    private const PRODUCT_LIST_VIEWS = ['grid', 'list', 'table'];

    public Config $config;
    public SiteRouter $router;

    public function __construct(Config $config, SiteRouter $router)
    {
        $this->config = $config;
        $this->router = $router;
    }

    public function handle(array $template): array
    {
        $url = '';

        try {
            switch ($template['type'] ?? '') {
                case 'com_radicalmart.category':
                    $lang        = $this->getLanguage($template);
                    $categoryIds = $this->getPreviewCategoryIds($template);

                    if ($categoryIds) {
                        $url = RouteHelper::getCategoryViewRoute($categoryIds[0], $lang);
                    }
                    break;

                case 'com_radicalmart.categories':
                case 'com_radicalmart.categories.alphabetical':
                    $lang        = $this->getLanguage($template);
                    $categoryIds = $this->normalizeIds($template['query']['catid'] ?? []);
                    $layout      = $template['type'] === 'com_radicalmart.categories.alphabetical'
                        ? 'alphabetical'
                        : 'categories';
                    $url         = RouteHelper::getCategoryViewRoute($categoryIds[0] ?? 1, $lang);
                    $url        .= (str_contains($url, '?') ? '&' : '?') . 'layout=' . $layout;
                    break;

                case 'com_radicalmart.product':
                    $productIds  = $this->normalizeIds($template['query']['id'] ?? []);
                    $categoryIds = $this->normalizeIds($template['query']['catid'] ?? []);

                    if (!$productIds) {
                        foreach ($this->getPreviewCategoryIds($template) as $categoryId) {
                            if ($product = $this->getFirstProduct($categoryId)) {
                                $productIds = [(int) $product->id];

                                if ($categoryId > 1) {
                                    $categoryIds = [$categoryId];
                                } elseif (!$categoryIds) {
                                    $category = $product->category ?? null;
                                    $categoryId = is_object($category)
                                        ? (int) ($category->id ?? 0)
                                        : (int) $category;

                                    if ($categoryId > 0) {
                                        $categoryIds = [$categoryId];
                                    }
                                }

                                break;
                            }
                        }
                    }

                    if ($productIds) {
                        $url = RouteHelper::getProductRoute(
                            $productIds[0],
                            $categoryIds[0] ?? 1,
                            $this->getLanguage($template),
                        );
                    }
                    break;

                case 'com_radicalmart.orders':
                    $url = RouteHelper::getOrdersRoute($this->getLanguage($template));
                    break;

                case 'com_radicalmart.order':
                    $orderId = (array) ($template['query']['id'] ?? []);
                    if ($orderId) {
                        $url = RouteHelper::getOrderRoute($orderId[0], $this->getLanguage($template));
                    }
                    break;

                case 'com_radicalmart.personal':
                    $url = RouteHelper::getPersonalRoute($this->getLanguage($template));
                    break;

                case 'com_radicalmart.settings':
                    $url = RouteHelper::getSettingsRoute($this->getLanguage($template));
                    break;
            }

            if (!empty($url)) {
                $url = $this->addProductListView($url, $template);
                $template['url'] = (string)$this->router->build($url);
            }
        } finally {
            return $template;
        }
    }

    protected function getLanguage(array $template): string
    {
        return preg_replace_callback(
            '/-\w{2}$/',
            fn($matches) => strtoupper($matches[0]),
            $template['query']['lang'] ?? '',
        );
    }

    private function addProductListView(string $url, array $template): string
    {
        $view = $template['query']['product_list_view'] ?? '';

        if (!is_string($view) || !in_array($view, self::PRODUCT_LIST_VIEWS, true)) {
            return $url;
        }

        $separator = str_contains($url, '?') ? '&' : '?';

        return $url . $separator . self::PRODUCT_LIST_VIEW_PARAMETER . '=' . $view;
    }

    private function getFirstProduct(int $categoryId): ?object
    {
        try {
            $model = Factory::getApplication()
                ->bootComponent('com_radicalmart')
                ->getMVCFactory()
                ->createModel('Products', 'Site', ['ignore_request' => true]);

            $model->setState('params', ComponentHelper::getParams('com_radicalmart'));
            $model->setState('category.id', max(1, $categoryId));
            $model->setState('filter.published', 1);
            $model->setState('filter.language', Multilanguage::isEnabled());
            $model->setState('list.start', 0);
            $model->setState('list.limit', 1);
            $model->setState('list.ordering', 'p.id');
            $model->setState('list.direction', 'ASC');

            $products = $model->getItems();

            return $products[0] ?? null;
        } catch (\Throwable) {
            return null;
        }
    }

    private function normalizeIds(mixed $ids): array
    {
        return array_values(
            array_filter(array_map('intval', (array) $ids), static fn(int $id): bool => $id > 0),
        );
    }

    private function getPreviewCategoryIds(array $template): array
    {
        $categoryIds = $this->normalizeIds($template['query']['catid'] ?? []);

        if (!$categoryIds) {
            return [1];
        }

        $includeChildren = $template['query']['include_child_categories'] ?? '';

        if (!in_array($includeChildren, ['include', 'only'], true)) {
            return $categoryIds;
        }

        $childIds = [];
        foreach ($categoryIds as $categoryId) {
            $childIds = array_merge($childIds, CategoryMapping::getSubCategories($categoryId));
        }
        $childIds = array_values(array_unique($childIds));

        return $includeChildren === 'only'
            ? $childIds
            : array_values(array_unique(array_merge($categoryIds, $childIds)));
    }
}
