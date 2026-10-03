<?php

declare(strict_types=1);

/**
 * Creates one idempotent YOOtheme Builder demo for the reusable RadicalMart
 * product atoms. Products are selected from tools/seed-large-demo-catalog.php.
 *
 * Run from the host repository root:
 *   docker compose exec -T app php /dev/stdin < tools/seed-product-atoms-demo.php
 */
final class ProductAtomsDemoSeeder
{
    private const ARTICLE_CATEGORY_ID = 2;
    private const CREATED_BY = 42;
    private const ALIAS = 'ytdynamics-product-atoms';

    private PDO $db;
    private string $now;
    private array $products = [];

    public function __construct()
    {
        $host = getenv('JOOMLA_DB_HOST') ?: 'db';
        $name = getenv('JOOMLA_DB_NAME') ?: 'database';
        $user = getenv('JOOMLA_DB_USER') ?: 'joomla';
        $pass = getenv('JOOMLA_DB_PASSWORD') ?: '';

        $this->db = new PDO(
            "mysql:host={$host};dbname={$name};charset=utf8mb4",
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        $this->now = gmdate('Y-m-d H:i:s');
    }

    public function run(): void
    {
        $this->products = $this->loadProducts();
        if (count($this->products) < 3) {
            throw new RuntimeException(
                'The large demo catalogue is missing. Run tools/seed-large-demo-catalog.php first.'
            );
        }

        $this->db->beginTransaction();
        try {
            $articleId = $this->upsertArticle($this->atomsLayout());
            $this->upsertMenu($articleId);
            $this->db->commit();
        } catch (Throwable $error) {
            $this->db->rollBack();
            throw $error;
        }

        echo json_encode(
            [
                'status' => 'ok',
                'products' => count($this->products),
                'article_id' => $articleId,
                'page' => '/index.php/' . self::ALIAS,
            ],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
        ) . PHP_EOL;
    }

    private function loadProducts(): array
    {
        $sql = <<<'SQL'
SELECT p.id,
       p.title,
       p.alias,
       p.code,
       p.meta_variability,
       c.title AS category_title
FROM joom_radicalmart_products AS p
INNER JOIN (
    SELECT meta_variability, MIN(id) AS product_id
    FROM joom_radicalmart_products
    WHERE alias LIKE 'mega-demo-%' AND meta_variability > 0 AND state = 1
    GROUP BY meta_variability
) AS selected ON selected.product_id = p.id
LEFT JOIN joom_radicalmart_categories AS c ON c.id = p.category
ORDER BY c.id, p.id
LIMIT 6
SQL;

        return $this->query($sql)->fetchAll();
    }

    private function atomsLayout(): array
    {
        $cards = [];
        foreach ($this->products as $product) {
            $cards[] = $this->productGridItem($product);
        }

        return $this->layout([
            $this->section('', [
                $this->node('text', [
                    'content' => 'YTDYNAMICS · PRODUCT ATOMS',
                    'text_style' => 'meta',
                ]),
                $this->node('headline', [
                    'content' => 'Атомарные элементы товара',
                    'title_element' => 'h1',
                    'title_style' => 'heading-small',
                    'margin_top' => 'small',
                ]),
                $this->node('text', [
                    'content' => 'Одна адаптивная витрина, собранная из независимых элементов Builder. Карточка передаёт контекст товара, но не задаёт внешний вид и порядок данных.',
                    'text_style' => 'lead',
                    'margin_top' => 'small',
                    'maxwidth' => 'xlarge',
                ]),
            ], 'default', 'small'),
            $this->section('Рабочая композиция', [
                $this->node('text', [
                    'content' => 'Отметьте несколько товаров: групповая панель обновляется без привязки к разметке карточки. Избранное, сравнение, рейтинг, бонусы и бейджи автоматически скрываются, если соответствующий провайдер или данные недоступны.',
                    'text_style' => 'small',
                    'margin_bottom' => 'medium',
                ]),
                $this->node('rmbulkactions', [
                    'count_label' => 'Выбрано:',
                    'cart_label' => 'Добавить выбранное',
                    'clear_label' => 'Снять выбор',
                    'button_style' => 'primary',
                    'button_size' => 'small',
                    'show_clear' => true,
                    'selection_root' => '',
                    'margin_bottom' => 'large',
                ]),
                $this->node('rmgrid', [
                    'mode' => 'default',
                    'grid_column_gap' => 'medium',
                    'grid_row_gap' => 'medium',
                    'grid_default' => '1',
                    'grid_small' => '2',
                    'grid_large' => '3',
                    'filter' => false,
                ], $cards),
            ], 'muted', 'default'),
        ]);
    }

    private function productGridItem(array $product): array
    {
        $id = (int) $product['id'];

        return $this->node('rmgrid_item', [
            'panel_style' => 'card-default',
            'panel_padding' => 'default',
            'name' => (string) $product['title'],
        ], [
            $this->node('rmproductcard', ['product_id' => $id], [
                $this->node('rmproductcard_main', [], [
                    $this->row([
                        $this->column([
                            $this->node('rmproductbadges', [
                                'product_id' => $id,
                                'direction' => 'horizontal',
                                'show_icons' => true,
                                'show_titles' => true,
                                'link_badges' => true,
                                'size' => 20,
                                'limit' => 3,
                            ]),
                        ], ['width' => 'expand']),
                        $this->column([
                            $this->node('rmproductaction', [
                                'product_id' => $id,
                                'action' => 'favorite',
                                'favorite_label' => 'В избранное',
                                'favorite_icon' => 'heart',
                                'button_style' => 'text',
                                'icon_only' => true,
                            ]),
                        ], ['width' => 'auto']),
                        $this->column([
                            $this->node('rmproductaction', [
                                'product_id' => $id,
                                'action' => 'compare',
                                'compare_label' => 'Сравнить',
                                'compare_icon' => 'copy',
                                'button_style' => 'text',
                                'icon_only' => true,
                            ]),
                        ], ['width' => 'auto']),
                    ], [
                        'column_gap' => 'small',
                        'row_gap' => 'small',
                        'vertical_align' => 'middle',
                        'margin_bottom' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'image',
                        'link_product' => true,
                        'image_ratio' => '4/3',
                        'image_fit' => 'contain',
                        'image_loading' => 'lazy',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'category',
                        'text_style' => 'meta',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'manufacturer',
                        'text_style' => 'meta',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'title',
                        'link_product' => true,
                        'title_element' => 'h2',
                        'title_style' => 'h4',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'code',
                        'text_style' => 'meta',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductrating', [
                        'product_id' => $id,
                        'show_value' => true,
                        'show_count' => true,
                        'show_empty' => true,
                        'size' => 18,
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'price',
                        'text_style' => 'large',
                        'show_base_price' => true,
                        'show_discount' => true,
                        'margin_top' => 'small',
                    ]),
                    $this->row([
                        $this->column([
                            $this->node('rmproductfield', [
                                'product_id' => $id,
                                'field' => 'base_price',
                                'text_style' => 'small',
                            ]),
                        ], ['width' => 'expand']),
                        $this->column([
                            $this->node('rmproductfield', [
                                'product_id' => $id,
                                'field' => 'discount',
                                'text_style' => 'small',
                            ]),
                        ], ['width' => 'auto']),
                        $this->column([
                            $this->node('rmproductfield', [
                                'product_id' => $id,
                                'field' => 'benefit',
                                'text_style' => 'small',
                            ]),
                        ], ['width' => 'auto']),
                    ], ['column_gap' => 'small', 'row_gap' => 'small', 'margin_top' => 'small']),
                    $this->node('rmproductstock', [
                        'product_id' => $id,
                        'in_stock_label' => 'В наличии',
                        'out_of_stock_label' => 'Нет в наличии',
                        'show_quantity' => true,
                        'show_progress' => true,
                        'progress_threshold' => 10,
                        'text_style' => 'small',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductunit', [
                        'product_id' => $id,
                        'show_price' => true,
                        'unit_style' => 'short',
                        'separator' => '/',
                        'text_style' => 'small',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductbonus', [
                        'product_id' => $id,
                        'label' => 'Бонус:',
                        'icon' => 'gift',
                        'show_empty' => true,
                        'text_style' => 'small',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductfield', [
                        'product_id' => $id,
                        'field' => 'description',
                        'text_style' => 'small',
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductspecifications', [
                        'product_id' => $id,
                        'selected_fields' => [
                            'catalog-material',
                            'catalog-performance',
                            'catalog-warranty',
                            'catalog-package',
                        ],
                        'layout' => 'description-list',
                        'show_fieldset_titles' => false,
                        'show_variant_fields' => false,
                        'divider' => true,
                        'field_limit' => 4,
                        'columns_small' => '1',
                        'columns_medium' => '1',
                        'columns_large' => '1',
                        'margin_top' => 'medium',
                    ]),
                    $this->node('rmvariantselector', [
                        'product_id' => $id,
                        'variant_fields' => ['catalog-color', 'catalog-size', 'catalog-edition'],
                        'style' => 'buttons',
                        'action' => 'ajax',
                        'button_style' => 'default',
                        'image_fit' => 'contain',
                        'show_labels' => true,
                        'show_selected_value' => true,
                        'disable_unavailable' => true,
                        'update_url' => 'none',
                        'margin_top' => 'medium',
                    ]),
                    $this->node('rmbuy', [
                        'product_id' => $id,
                        'label' => 'В корзину',
                        'button_style' => 'primary',
                        'show_count' => true,
                        'mobile_stack' => true,
                        'fullwidth' => true,
                        'margin_top' => 'medium',
                    ]),
                    $this->node('rmquickview', [
                        'product_id' => $id,
                        'label' => 'Быстрый просмотр',
                        'button_style' => 'default',
                        'modal_size' => 'container',
                        'content_mode' => 'automatic',
                        'mobile_fullscreen' => true,
                        'fullwidth' => true,
                        'margin_top' => 'small',
                    ]),
                    $this->node('rmproductselect', [
                        'product_id' => $id,
                        'label' => 'Выбрать товар',
                        'show_title' => false,
                        'disable_out_of_stock' => true,
                        'margin_top' => 'small',
                    ]),
                ]),
            ]),
        ]);
    }

    private function section(
        string $title,
        array $children,
        string $style = 'default',
        string $padding = 'default'
    ): array {
        if ($title !== '') {
            array_unshift($children, $this->node('headline', [
                'content' => $title,
                'title_element' => 'h2',
                'title_style' => 'h2',
                'margin_bottom' => 'medium',
            ]));
        }

        return $this->node('section', ['style' => $style, 'padding' => $padding, 'width' => 'default'], [
            $this->row([$this->column($children, ['width_medium' => '1-1'])]),
        ]);
    }

    private function layout(array $sections): array
    {
        return ['type' => 'layout', 'children' => $sections, 'version' => '5.0.42'];
    }

    private function row(array $columns, array $props = []): array
    {
        return $this->node('row', $props, $columns);
    }

    private function column(array $children, array $props = []): array
    {
        return $this->node('column', $props, $children);
    }

    private function node(string $type, array $props = [], array $children = []): array
    {
        $node = ['type' => $type];
        if ($props !== []) {
            $node['props'] = $props;
        }
        if ($children !== []) {
            $node['children'] = $children;
        }

        return $node;
    }

    private function upsertArticle(array $layout): int
    {
        $id = (int) ($this->value('SELECT id FROM joom_content WHERE alias = ?', [self::ALIAS]) ?: 0);
        $data = [
            'title' => 'Атомарные элементы товара YTDynamics',
            'alias' => self::ALIAS,
            'introtext' => '<p>Generated YTDynamics product atom demo.</p>',
            'fulltext' => '<!-- ' . $this->json($layout) . ' -->',
            'state' => 1,
            'catid' => self::ARTICLE_CATEGORY_ID,
            'modified' => $this->now,
            'modified_by' => self::CREATED_BY,
            'images' => '{}',
            'urls' => '{}',
            'attribs' => '{}',
            'metakey' => '',
            'metadesc' => 'YTDynamics atomic product element Builder demo',
            'access' => 1,
            'metadata' => '{}',
            'featured' => 0,
            'language' => '*',
            'note' => 'Generated by tools/seed-product-atoms-demo.php',
        ];
        if ($id > 0) {
            $this->update('joom_content', $data, 'id = ?', [$id]);
            return $id;
        }

        $data += [
            'asset_id' => 0,
            'created' => $this->now,
            'created_by' => self::CREATED_BY,
            'created_by_alias' => '',
            'checked_out' => null,
            'checked_out_time' => null,
            'publish_up' => $this->now,
            'publish_down' => null,
            'version' => 1,
            'ordering' => 0,
            'hits' => 0,
        ];

        return $this->insert('joom_content', $data);
    }

    private function upsertMenu(int $articleId): void
    {
        $id = (int) ($this->value('SELECT id FROM joom_menu WHERE alias = ?', [self::ALIAS]) ?: 0);
        $componentId = (int) $this->value(
            "SELECT extension_id FROM joom_extensions WHERE element = 'com_content' AND type = 'component'"
        );
        $data = [
            'menutype' => 'mainmenu',
            'title' => 'PRODUCT ATOMS',
            'alias' => self::ALIAS,
            'note' => 'Generated product atom demo',
            'path' => self::ALIAS,
            'link' => 'index.php?option=com_content&view=article&id=' . $articleId,
            'type' => 'component',
            'published' => 1,
            'parent_id' => 1,
            'level' => 1,
            'component_id' => $componentId,
            'checked_out' => null,
            'checked_out_time' => null,
            'browserNav' => 0,
            'access' => 1,
            'img' => '',
            'template_style_id' => 0,
            'params' => '{}',
            'home' => 0,
            'language' => '*',
            'client_id' => 0,
            'publish_up' => null,
            'publish_down' => null,
        ];
        if ($id > 0) {
            $this->update('joom_menu', $data, 'id = ?', [$id]);
            return;
        }

        $right = (int) $this->value("SELECT COALESCE(MAX(rgt), 1) FROM joom_menu WHERE menutype = 'mainmenu'");
        $data['lft'] = $right + 1;
        $data['rgt'] = $right + 2;
        $this->insert('joom_menu', $data);
    }

    private function json(mixed $value): string
    {
        return json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }

    private function query(string $sql, array $params = []): PDOStatement
    {
        $statement = $this->db->prepare($sql);
        $statement->execute(array_values($params));
        return $statement;
    }

    private function value(string $sql, array $params = []): mixed
    {
        return $this->query($sql, $params)->fetchColumn();
    }

    private function insert(string $table, array $data): int
    {
        $columns = array_keys($data);
        $marks = implode(',', array_fill(0, count($columns), '?'));
        $sql = sprintf('INSERT INTO %s (`%s`) VALUES (%s)', $table, implode('`,`', $columns), $marks);
        $this->query($sql, array_values($data));
        return (int) $this->db->lastInsertId();
    }

    private function update(string $table, array $data, string $where, array $whereParams = []): void
    {
        $assignments = implode(', ', array_map(
            static fn(string $column): string => "`{$column}` = ?",
            array_keys($data)
        ));
        $this->query(
            "UPDATE {$table} SET {$assignments} WHERE {$where}",
            array_merge(array_values($data), $whereParams)
        );
    }
}

(new ProductAtomsDemoSeeder())->run();
