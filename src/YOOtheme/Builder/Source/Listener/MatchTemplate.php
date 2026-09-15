<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener;

use Joomla\CMS\Document\Document;
use Joomla\CMS\Factory;
use Joomla\Component\RadicalMart\Site\Mapping\CategoryMapping;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsMatchTemplateEvent;

class MatchTemplate
{
    private const PRODUCT_LIST_VIEW_PARAMETER = 'com_radicalmart_category_list_item_template';
    private const PRODUCT_LIST_VIEWS = ['grid', 'list', 'table'];

    public string $language;

    public function __construct(?Document $document)
    {
        $this->language = $document->getLanguage() ?: 'en-gb';
    }

    /**
     * @param   \YOOtheme\Theme\Joomla\LoadTemplateEvent  $event
     *
     * @return array|null
     * @throws \Exception
     * @since        DEPLOY_VERSION
     * @noinspection PhpMissingParamTypeInspection
     */
    public function handle($event): ?array
    {
        if ($event->getTpl()) {
            return null;
        }

        $input = Factory::getApplication()->getInput();

        $view    = $event->getView();
        $context = $event->getContext();
        $tpl     = $event->getTpl();

        // RadicalMart exposes the former categories views through the request
        // layout. Do not fall back to the view layout: it can be changed later
        // from category params and would make a regular category page match a
        // categories template.
        $layout = $view->getLayout();
        if (!str_starts_with($context, 'com_radicalmart') && $context !== 'com_users.profile') {
            return null;
        }

//        if (!empty($layout)) {
//            $context .= '.' . $layout;
//        }

        if ($context === 'com_radicalmart.product') {
            /** @var \Joomla\Component\RadicalMart\Site\Model\ProductModel $model */
            $model       = $view->getModel();
            $item        = $model->getItem();
            $variability = $item->variability;

            return [
                'type'   => $context,
                'query'  => [
                    'catid' => fn($ids, $query): bool => $this->matchCategory(
                        (int) $item->category->id,
                        $ids,
                        $query['include_child_categories'] ?? 'include',
                    ),
                    'lang'  => $this->language,
                ],
                'params' => [
                    'item'        => $item,
                    'variability' => $variability,
                ],
            ];
        }

        if (
            $context === 'com_radicalmart.categories' ||
            $context === 'com_radicalmart.categories.alphabetical'
        ) {
            $pagination = $view->get('pagination');

            return [
                'type'   => $context,
                'query'  => [
                    'catid' => fn($ids): bool => $this->matchCategory(
                        $input->getInt('id', 1),
                        $ids,
                        '',
                    ),
                    'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
                    'lang'  => $this->language,
                ],
                'params' => [
                    'items'      => $view->get('items'),
                    'pagination' => $pagination,
                ],
            ];
        }

        if ($context === 'com_radicalmart.category') {
            /** @var \Joomla\Component\RadicalMart\Site\Model\CategoryModel $categoryModel */
            $categoryModel      = $view->getModel();
            $requestedCategoryId = $input->getInt('id');
            $category           = $requestedCategoryId > 0
                ? $categoryModel->getItem($requestedCategoryId)
                : $categoryModel->getItem();
            $children      = $categoryModel->getChildren($category->id);

            if (in_array($layout, ['categories', 'alphabetical'], true)) {
                $templateContext = $layout === 'alphabetical'
                    ? 'com_radicalmart.categories.alphabetical'
                    : 'com_radicalmart.categories';

                return [
                    'type' => $templateContext,
                    'query' => [
                        'catid' => fn($ids): bool => $this->matchCategory(
                            (int) $category->id,
                            $ids,
                            '',
                        ),
                        'lang' => $this->language,
                    ],
                    'params' => [
                        'category' => $category,
                        'items' => is_array($children) ? $children : [],
                    ],
                ];
            }

            $items      = $categoryModel->getItems();
            $pagination = $categoryModel->getPagination();

            return [
                'type'   => $context,
                'query'  => [
                    'catid' => fn($ids, $query): bool => $this->matchCategory(
                        (int) $category->id,
                        $ids,
                        $query['include_child_categories'] ?? 'include',
                    ),
                    'pages'             => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
                    'product_list_view' => $this->getProductListView(),
                    'lang'              => $this->language,
                ],
                'params' => [
                    'category'   => $category,
                    'items'      => $items,
                    'children'   => $children,
                    'pagination' => $pagination,
                ],
            ];
        }

        if ($context === 'com_radicalmart_search.search') {
            $pagination = $view->get('pagination');

            return [
                'type'   => $context,
                'query'  => [
                    'pages'             => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
                    'product_list_view' => $this->getProductListView(),
                    'lang'              => $this->language,
                ],
                'params' => [
                    'items'      => $view->get('items'),
                    'pagination' => $pagination,
                ],
            ];
        }

        // TODO: Вопросики! А нах оно тут нужно?
        if ($context === 'com_users.profile') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart.orders') {
            $pagination = $view->get('pagination');

            return [
                'type'   => $context,
                'query'  => [
                    'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
                    'lang'  => $this->language,
                ],
                'params' => [
                    'items'      => $view->get('items'),
                    'pagination' => $pagination,
                ],
            ];
        }

        if ($context === 'com_radicalmart.order') {
            return [
                'type'   => $context,
                'query'  => [
                    'lang' => $this->language,
                ],
                'params' => [
                    'item' => $view->get('order'),
                ],
            ];
        }

        if ($context === 'com_radicalmart.settings') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart.personal') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart_favorites.favorites') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart_compare.compare') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart_bonuses.points') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart_bonuses.codes') {
            return [
                'type'  => $context,
                'query' => [
                    'lang' => $this->language,
                ],
            ];
        }

        if ($context === 'com_radicalmart_landings.page') {
            $category   = $view->get('category');
            $page       = $view->get('page');
            $items      = $view->get('items');
            $pagination = $view->get('pagination');

            return [
                'type'   => $context,
                'query'  => [
                    'catid'             => $category->id,
                    'pages'             => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
                    'product_list_view' => $this->getProductListView(),
                    'lang'              => $this->language,
                ],
                'params' => [
                    'category'   => $category,
                    'page'       => $page,
                    'items'      => $items,
                    'pagination' => $pagination,
                ],
            ];
        }

        $event = new YTDynamicsMatchTemplateEvent(
            'onRadicalMartYTDynamicsMatchTemplate',
            ['match' => &$this, 'context' => $context, 'view' => &$view, 'tpl' => $tpl],
        );

        Factory::getApplication()->getDispatcher()->dispatch(
            'onRadicalMartYTDynamicsMatchTemplate',
            $event,
        );

        $template = $event->getResult();

        if (is_array($template) && count($template) > 0) {
            return $template;
        }

        return null;
    }

    private function matchCategory(
        int $categoryId,
        mixed $categoryIds,
        mixed $includeChildren,
    ): bool {
        $categoryIds = array_values(
            array_filter(
                array_map('intval', (array) $categoryIds),
                static fn(int $id): bool => $id > 0,
            ),
        );
        $match = in_array($categoryId, $categoryIds, true);

        if (!in_array($includeChildren, ['include', 'only'], true)) {
            return $match;
        }

        if ($match) {
            return $includeChildren === 'include';
        }

        $path = CategoryMapping::getPath($categoryId);

        return is_array($path) && (bool) array_intersect(array_keys($path), $categoryIds);
    }

    private function getProductListView(): string
    {
        $input = Factory::getApplication()->getInput();
        $view  = $input->get->getCmd(self::PRODUCT_LIST_VIEW_PARAMETER);

        if (!$view) {
            $view = $input->cookie->getCmd(self::PRODUCT_LIST_VIEW_PARAMETER, 'grid');
        }

        return in_array($view, self::PRODUCT_LIST_VIEWS, true) ? $view : 'grid';
    }

}
