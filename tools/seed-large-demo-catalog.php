<?php

declare(strict_types=1);

/**
 * Builds a large, repeatable RadicalMart/YOOtheme Pro demo catalogue.
 *
 * Run inside the Joomla container:
 *   php /var/www/html/../plugins/system/ytdynamics/../../../tools/seed-large-demo-catalog.php
 *
 * In this repository the script is copied to /var/www/html/tmp before running.
 */

final class DemoCatalogueSeeder
{
    private PDO $db;
    private string $now;
    private array $categoryIds = [];
    private array $fieldIds = [];
    private array $specFieldIds = [];
    private array $featured = [];
    private array $tableProducts = [];

    private const PREFIX = 'mega-demo-';

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
        $this->db->beginTransaction();

        try {
            $this->ensureCategories();
            $this->ensureFields();
            $this->removeGeneratedProducts();
            $this->createProductsAndMetas();
            $articleId = $this->ensureShowcaseArticle();
            $this->ensureMenuItem($articleId);
            $this->configureRadicalMart();
            $this->configureYootheme();
            $this->ensureProductTemplate();
            $this->installYoothemeKey();
            $this->db->commit();
        } catch (Throwable $error) {
            $this->db->rollBack();
            throw $error;
        }

        $counts = [
            'products' => (int) $this->value("SELECT COUNT(*) FROM joom_radicalmart_products WHERE alias LIKE 'mega-demo-%'"),
            'metas' => (int) $this->value("SELECT COUNT(*) FROM joom_radicalmart_metas WHERE alias LIKE 'mega-demo-%'"),
            'categories' => count($this->categoryIds),
        ];

        echo json_encode([
            'status' => 'ok',
            'generated' => $counts,
            'showcase' => '/index.php/ytdynamics-mega-catalog',
            'license' => getenv('YOOTHEME_KEY') ? 'configured' : 'unchanged',
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    }

    private function ensureCategories(): void
    {
        $catalogue = $this->row("SELECT * FROM joom_radicalmart_categories WHERE id = 5");
        if (!$catalogue) {
            throw new RuntimeException('Demo shop category #5 is missing.');
        }

        $categories = [
            ['electronics', 'Электроника', 'Гаджеты для работы, общения и развлечений.', 'electronics.svg'],
            ['smart-home', 'Умный дом', 'Свет, климат, безопасность и домашняя автоматизация.', 'smart-home.svg'],
            ['garden', 'Сад и дача', 'Инструменты и техника для участка и загородного дома.', 'garden.svg'],
            ['workshop', 'Мастерская', 'Электроинструмент, измерение и оснащение рабочего места.', 'workshop.svg'],
            ['office', 'Офис', 'Эргономичная мебель и техника для продуктивной работы.', 'office.svg'],
            ['sport', 'Спорт и путешествия', 'Экипировка для движения, отдыха и поездок.', 'sport.svg'],
        ];

        foreach ($categories as $index => [$slug, $title, $description, $image]) {
            $alias = self::PREFIX . $slug;
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_categories WHERE alias = ?', [$alias]) ?: 0);
            $data = [
                'parent_id' => 5,
                'level' => 2,
                'path' => 'demo-shop/' . $alias,
                'title' => $title,
                'alias' => $alias,
                'type' => 'category',
                'introtext' => $description,
                'fulltext' => '',
                'search_text' => mb_strtolower("{$title} {$description}"),
                'prices' => '{}',
                'media' => $this->json(['image' => 'images/demo-catalog/' . $image, 'gallery' => []]),
                'fields' => '{}',
                'totals' => '{}',
                'state' => 1,
                'show' => 1,
                'params' => $this->json([
                    'category_items_limit' => 24,
                    'category_items_ordering' => 'ordering',
                    'category_layout' => '_:default',
                ]),
                'plugins' => '{}',
                'language' => '*',
            ];

            if ($id) {
                $this->update('joom_radicalmart_categories', $data, 'id = ?', [$id]);
            } else {
                $data['lft'] = 0;
                $data['rgt'] = 0;
                $id = $this->insert('joom_radicalmart_categories', $data);
            }

            $this->categoryIds[$slug] = $id;
        }

        // Rebuild this small branch deterministically. Abort instead of moving
        // unknown user categories, so the script cannot silently damage them.
        $unknown = (int) $this->value(
            "SELECT COUNT(*) FROM joom_radicalmart_categories WHERE parent_id = 5 AND alias NOT LIKE 'mega-demo-%'"
        );
        if ($unknown > 0) {
            throw new RuntimeException('Category #5 has unknown children; nested-set rebuild was stopped.');
        }

        $cursor = 6;
        foreach (array_keys($categories) as $index) {
            $slug = $categories[$index][0];
            $id = $this->categoryIds[$slug];
            $this->update('joom_radicalmart_categories', ['lft' => $cursor, 'rgt' => $cursor + 1], 'id = ?', [$id]);
            $cursor += 2;
        }
        $this->update('joom_radicalmart_categories', ['lft' => 5, 'rgt' => $cursor], 'id = 5');
        $this->update('joom_radicalmart_categories', ['rgt' => $cursor + 1], 'id = 1');
    }

    private function ensureFields(): void
    {
        $fieldsetId = (int) ($this->value(
            'SELECT id FROM joom_radicalmart_fieldsets WHERE alias = ?',
            ['mega-demo-characteristics']
        ) ?: 0);
        $fieldset = [
            'title' => 'Параметры каталога',
            'alias' => 'mega-demo-characteristics',
            'description' => 'Универсальные вариативные поля большого демо-каталога',
            'params' => $this->json(['display_product_form_tab' => 'fields', 'display_product_form_full_width' => 0]),
            'ordering' => 20,
            'plugins' => '{}',
        ];
        if ($fieldsetId) {
            $this->update('joom_radicalmart_fieldsets', $fieldset, 'id = ?', [$fieldsetId]);
        } else {
            $fieldsetId = $this->insert('joom_radicalmart_fieldsets', $fieldset);
        }

        $allCategoryIds = implode(',', array_merge([5], array_values($this->categoryIds)));
        $definitions = [
            'catalog-color' => [
                'Цвет',
                [
                    'graphite' => ['Графит', '#343a40'],
                    'sand' => ['Песочный', '#d6b98c'],
                    'forest' => ['Лесной', '#426b50'],
                    'ocean' => ['Океан', '#397e9b'],
                    'coral' => ['Коралловый', '#d46b5f'],
                    'snow' => ['Белый', '#f3f4f5'],
                ],
            ],
            'catalog-size' => [
                'Размер',
                [
                    'compact' => ['Компактный', ''],
                    'standard' => ['Стандартный', ''],
                    'large' => ['Большой', ''],
                    'xl' => ['XL', ''],
                ],
            ],
            'catalog-edition' => [
                'Исполнение',
                [
                    'base' => ['Base', ''],
                    'plus' => ['Plus', ''],
                    'pro' => ['Pro', ''],
                    'max' => ['Max', ''],
                ],
            ],
        ];

        foreach ($definitions as $alias => [$title, $options]) {
            $storedOptions = [];
            $ordering = 0;
            foreach ($options as $value => [$text, $color]) {
                $storedOptions[$value] = [
                    'text' => $text,
                    'value' => $value,
                    'image' => '',
                    'color' => $color,
                    'option_ordering' => $ordering++,
                    'option_categories' => $allCategoryIds,
                ];
            }
            $data = [
                'title' => $title,
                'alias' => $alias,
                'area' => 'products',
                'all_categories' => 1,
                'plugin' => 'standard',
                'fieldset_administrator' => $fieldsetId,
                'fieldset_site' => $fieldsetId,
                'description' => "Вариативное поле «{$title}»",
                'options' => $this->json($storedOptions),
                'note' => '',
                'state' => 1,
                'params' => $this->json([
                    'type' => 'list',
                    'required' => 1,
                    'multiple' => 0,
                    'null_value' => 0,
                    'display_products' => 1,
                    'display_products_as' => 'string',
                    'display_product' => 1,
                    'display_product_as' => 'string',
                    'display_filter' => 1,
                    'display_filter_as' => 'checkboxes',
                    'display_filter_operator' => 'or',
                    'display_variability' => 1,
                    'display_variability_as' => 'buttons',
                ]),
                'ordering' => 20 + count($this->fieldIds),
                'plugins' => '{}',
                'language' => '*',
            ];
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_fields WHERE alias = ?', [$alias]) ?: 0);
            if ($id) {
                $this->update('joom_radicalmart_fields', $data, 'id = ?', [$id]);
            } else {
                $id = $this->insert('joom_radicalmart_fields', $data);
            }
            $this->fieldIds[$alias] = $id;
        }

        $specifications = [
            'catalog-material' => 'Материал',
            'catalog-performance' => 'Ключевой параметр',
            'catalog-warranty' => 'Гарантия',
            'catalog-package' => 'Комплектация',
        ];
        foreach ($specifications as $alias => $title) {
            $data = [
                'title' => $title,
                'alias' => $alias,
                'area' => 'products',
                'all_categories' => 1,
                'plugin' => 'standard',
                'fieldset_administrator' => $fieldsetId,
                'fieldset_site' => $fieldsetId,
                'description' => "Характеристика «{$title}»",
                'options' => '{}',
                'note' => '',
                'state' => 1,
                'params' => $this->json([
                    'type' => 'text',
                    'required' => 0,
                    'multiple' => 0,
                    'null_value' => 0,
                    'display_products' => 1,
                    'display_products_as' => 'string',
                    'display_product' => 1,
                    'display_product_as' => 'string',
                    'display_filter' => 0,
                    'display_variability' => 0,
                ]),
                'ordering' => 40 + count($this->specFieldIds),
                'plugins' => '{}',
                'language' => '*',
            ];
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_fields WHERE alias = ?', [$alias]) ?: 0);
            if ($id) {
                $this->update('joom_radicalmart_fields', $data, 'id = ?', [$id]);
            } else {
                $id = $this->insert('joom_radicalmart_fields', $data);
            }
            $this->specFieldIds[$alias] = $id;
        }
    }

    private function removeGeneratedProducts(): void
    {
        $productIds = $this->column("SELECT id FROM joom_radicalmart_products WHERE alias LIKE 'mega-demo-%'");
        $metaIds = $this->column("SELECT id FROM joom_radicalmart_metas WHERE alias LIKE 'mega-demo-%'");

        if ($productIds) {
            $marks = implode(',', array_fill(0, count($productIds), '?'));
            $this->query("DELETE FROM joom_radicalmart_categories_items WHERE item_id IN ({$marks})", $productIds);
            $this->query("DELETE FROM joom_radicalmart_products WHERE id IN ({$marks})", $productIds);
        }
        if ($metaIds) {
            $negative = array_map(static fn($id) => -(int) $id, $metaIds);
            $marks = implode(',', array_fill(0, count($negative), '?'));
            $this->query("DELETE FROM joom_radicalmart_categories_items WHERE item_id IN ({$marks})", $negative);
            $marks = implode(',', array_fill(0, count($metaIds), '?'));
            $this->query("DELETE FROM joom_radicalmart_metas WHERE id IN ({$marks})", $metaIds);
        }
    }

    private function createProductsAndMetas(): void
    {
        $families = [
            'electronics' => [
                ['Pulse One', 42990, 'Смартфон с ярким OLED-экраном и камерой для каждого дня.'],
                ['AeroBook', 89990, 'Лёгкий ноутбук для мобильной работы и творчества.'],
                ['EchoPods', 8990, 'Беспроводные наушники с активным шумоподавлением.'],
                ['Vision Tab', 34990, 'Планшет для заметок, контента и поездок.'],
                ['Nova Watch', 18990, 'Умные часы с мониторингом активности и сна.'],
            ],
            'smart-home' => [
                ['Lumi Lamp', 4990, 'Умный светильник с гибкой температурой и сценариями.'],
                ['Air Sense', 7990, 'Датчик качества воздуха для здорового микроклимата.'],
                ['Guard Camera', 11990, 'Домашняя камера с ночным режимом и уведомлениями.'],
                ['Thermo Control', 13990, 'Термостат для точного и экономного отопления.'],
                ['Clean Robot', 32990, 'Робот-пылесос с картографией и влажной уборкой.'],
            ],
            'garden' => [
                ['Terra Drip', 5990, 'Набор капельного полива для грядок и теплиц.'],
                ['GreenGrow', 2490, 'Универсальный комплект для выращивания рассады.'],
                ['Forge Garden', 7490, 'Надёжный ручной инструмент из стали и дерева.'],
                ['Aqua Pump', 18990, 'Компактный насос для полива и технической воды.'],
                ['Patio Light', 6490, 'Уличный светильник для террасы и сада.'],
            ],
            'workshop' => [
                ['Volt Drill', 12990, 'Аккумуляторная дрель для дома и мастерской.'],
                ['CutPro', 16990, 'Точная пила с удобной регулировкой глубины.'],
                ['Weld Mini', 22990, 'Компактный сварочный аппарат для частной мастерской.'],
                ['Measure Laser', 8990, 'Лазерный дальномер с быстрыми расчётами.'],
                ['SandPro', 11490, 'Шлифовальная машина с эффективным пылеудалением.'],
            ],
            'office' => [
                ['Ergo Chair', 29990, 'Кресло с тонкой настройкой посадки и поддержкой спины.'],
                ['Lift Desk', 44990, 'Стол с электрической регулировкой высоты.'],
                ['Focus Lamp', 5990, 'Рабочая лампа с направленным светом без бликов.'],
                ['Quiet Keyboard', 9990, 'Тихая клавиатура для сосредоточенной работы.'],
                ['Dock Station', 14990, 'Док-станция для подключения рабочего пространства одним кабелем.'],
            ],
            'sport' => [
                ['Trail Backpack', 10990, 'Рюкзак для коротких походов и активных выходных.'],
                ['Flow Bottle', 2490, 'Термобутылка для тренировки и дороги.'],
                ['Camp Light', 3990, 'Фонарь с мягким рассеянным светом для кемпинга.'],
                ['Run Watch', 15990, 'Спортивные часы с GPS и тренировочными режимами.'],
                ['Yoga Mat', 4490, 'Нескользящий коврик с комфортной амортизацией.'],
            ],
        ];

        $images = [
            'electronics' => 'electronics.svg',
            'smart-home' => 'smart-home.svg',
            'garden' => 'garden.svg',
            'workshop' => 'workshop.svg',
            'office' => 'office.svg',
            'sport' => 'sport.svg',
        ];
        $colorSets = [
            'electronics' => ['graphite', 'snow'],
            'smart-home' => ['sand', 'snow'],
            'garden' => ['forest', 'sand'],
            'workshop' => ['graphite', 'coral'],
            'office' => ['graphite', 'ocean'],
            'sport' => ['ocean', 'coral'],
        ];
        $categoryTitles = [
            'electronics' => 'Электроника',
            'smart-home' => 'Умный дом',
            'garden' => 'Сад и дача',
            'workshop' => 'Мастерская',
            'office' => 'Офис',
            'sport' => 'Спорт и путешествия',
        ];

        $globalOrdering = 100;
        $familyNumber = 1;
        foreach ($families as $categorySlug => $categoryFamilies) {
            $categoryId = $this->categoryIds[$categorySlug];
            foreach ($categoryFamilies as $familyIndex => [$familyName, $basePrice, $description]) {
                $familySlug = $this->slug($familyName);
                $metaAlias = self::PREFIX . $categorySlug . '-' . $familySlug;
                $variantIds = [];
                $metaProducts = [];
                $metaStock = 0;
                $prices = [];
                $variantNumber = 0;
                $familyImage = 'images/demo-catalog/' . $images[$categorySlug];

                foreach ($colorSets[$categorySlug] as $colorIndex => $color) {
                    foreach (['compact', 'standard'] as $sizeIndex => $size) {
                        foreach (['base', 'pro'] as $editionIndex => $edition) {
                            $variantNumber++;
                            $price = $basePrice
                                + ($colorIndex * 900)
                                + ($sizeIndex * (int) round($basePrice * 0.08 / 100) * 100)
                                + ($editionIndex * (int) round($basePrice * 0.18 / 100) * 100);
                            $stock = (($familyNumber * 11 + $variantNumber * 7) % 31) + 2;
                            $title = sprintf(
                                '%s — %s, %s, %s',
                                $familyName,
                                $this->optionLabel('catalog-color', $color),
                                $this->optionLabel('catalog-size', $size),
                                $this->optionLabel('catalog-edition', $edition)
                            );
                            $alias = $metaAlias . '-' . $color . '-' . $size . '-' . $edition;
                            $fields = [
                                'catalog-color' => $color,
                                'catalog-size' => $size,
                                'catalog-edition' => $edition,
                            ] + $this->specificationValues($categorySlug, $familyNumber, $size, $edition);
                            $discount = (($familyNumber + $variantNumber) % 9 === 0) ? (int) round($price * 0.1 / 10) * 10 : 0;
                            $finalPrice = $price - $discount;
                            $priceData = $this->price($price, $discount);
                            $stockData = ['all' => $stock];
                            $image = $this->createVariantImage(
                                $images[$categorySlug],
                                $alias,
                                $color,
                                $size,
                                $edition
                            );
                            if ($variantNumber === 1) {
                                $familyImage = $image;
                            }
                            $productId = $this->insert('joom_radicalmart_products', [
                                'title' => $title,
                                'alias' => $alias,
                                'code' => sprintf('MEGA-%02d-%02d', $familyNumber, $variantNumber),
                                'category' => $categoryId,
                                'category_pathway' => 0,
                                'category_route' => 0,
                                'categories_additional' => '',
                                'categories_all' => "1,5,{$categoryId}",
                                'meta_variability' => 0,
                                'created' => $this->now,
                                'created_by' => 42,
                                'modified' => $this->now,
                                'modified_by' => 42,
                                'introtext' => $description,
                                'fulltext' => "{$description} Выберите подходящие цвет, размер и исполнение.",
                                'search_text' => mb_strtolower("{$title} {$description} {$categoryTitles[$categorySlug]}"),
                                'prices' => $this->json($priceData),
                                'stock' => $this->json($stockData),
                                'in_stock' => 1,
                                'shipping' => '{}',
                                'fields' => $this->json($fields),
                                'state' => 1,
                                'media' => $this->json([
                                    'image' => $image,
                                    'gallery' => [
                                        ['type' => 'image', 'src' => $image, 'alt' => $title],
                                        ['type' => 'image', 'src' => 'images/demo-catalog/' . $images[$categorySlug], 'alt' => $familyName . ' — обзор'],
                                    ],
                                ]),
                                'params' => $this->json($this->productParams()),
                                'changelogs' => '{}',
                                'plugins' => '{}',
                                'language' => '*',
                            ]);

                            $variantIds[] = $productId;
                            $metaProducts['p' . $productId] = ['id' => $productId, 'priority' => 9 - $variantNumber];
                            $metaStock += $stock;
                            $prices[] = $finalPrice;
                            $this->indexProduct(
                                $productId,
                                $categoryId,
                                $title,
                                $description,
                                $priceData,
                                $stockData,
                                $fields,
                                $globalOrdering++,
                                $finalPrice
                            );
                        }
                    }
                }

                $metaId = $this->insert('joom_radicalmart_metas', [
                    'title' => $familyName,
                    'alias' => $metaAlias,
                    'code' => sprintf('MEGA-FAMILY-%02d', $familyNumber),
                    'type' => 'variability',
                    'category' => $categoryId,
                    'category_pathway' => 0,
                    'category_route' => 0,
                    'categories_additional' => '',
                    'categories_all' => "1,5,{$categoryId}",
                    'created' => $this->now,
                    'created_by' => 42,
                    'modified' => $this->now,
                    'modified_by' => 42,
                    'introtext' => $description,
                    'fulltext' => "{$description} Семейство объединяет восемь совместимых вариантов.",
                    'search_text' => mb_strtolower("{$familyName} {$description} {$categoryTitles[$categorySlug]}"),
                    'products' => $this->json($metaProducts),
                    'prices' => $this->json(['rub' => ['currency' => 'RUB', 'min' => min($prices), 'max' => max($prices)]]),
                    'stock' => $this->json(['all' => $metaStock]),
                    'in_stock' => 1,
                    'fields' => '{}',
                    'state' => 1,
                    'media' => $this->json(['image' => $familyImage, 'gallery' => []]),
                    'params' => $this->json(['variability_fields' => array_values($this->fieldIds)]),
                    'plugins' => '{}',
                    'language' => '*',
                ]);

                $marks = implode(',', array_fill(0, count($variantIds), '?'));
                $this->query(
                    "UPDATE joom_radicalmart_products SET meta_variability = ? WHERE id IN ({$marks})",
                    array_merge([$metaId], $variantIds)
                );

                if ($familyIndex === 0) {
                    $this->featured[] = [
                        'product_id' => $variantIds[0],
                        'meta_id' => $metaId,
                        'title' => $familyName,
                        'category' => $categoryTitles[$categorySlug],
                        'image' => $familyImage,
                    ];
                }
                if (count($this->tableProducts) < 8) {
                    $this->tableProducts[] = [
                        'id' => $variantIds[0],
                        'title' => $familyName,
                        'category' => $categoryTitles[$categorySlug],
                        'price' => min($prices),
                        'stock' => $metaStock,
                    ];
                }
                $familyNumber++;
            }

            for ($simpleIndex = 1; $simpleIndex <= 4; $simpleIndex++) {
                $title = sprintf('%s Select %02d', $categoryTitles[$categorySlug], $simpleIndex);
                $price = 1490 + (array_search($categorySlug, array_keys($families), true) * 1700) + $simpleIndex * 900;
                $stock = 7 + $simpleIndex * 4;
                $image = 'images/demo-catalog/' . $images[$categorySlug];
                $priceData = $this->price($price, $simpleIndex === 4 ? 300 : 0);
                $fields = $this->specificationValues($categorySlug, $familyNumber + $simpleIndex, 'standard', 'base');
                $productId = $this->insert('joom_radicalmart_products', [
                    'title' => $title,
                    'alias' => self::PREFIX . $categorySlug . '-select-' . $simpleIndex,
                    'code' => sprintf('MEGA-%s-S%02d', strtoupper(substr($categorySlug, 0, 3)), $simpleIndex),
                    'category' => $categoryId,
                    'category_pathway' => 0,
                    'category_route' => 0,
                    'categories_additional' => '',
                    'categories_all' => "1,5,{$categoryId}",
                    'meta_variability' => 0,
                    'created' => $this->now,
                    'created_by' => 42,
                    'modified' => $this->now,
                    'modified_by' => 42,
                    'introtext' => 'Самостоятельный товар без вариативности для проверки смешанного каталога.',
                    'fulltext' => 'Готовое решение с понятной комплектацией и быстрой покупкой.',
                    'search_text' => mb_strtolower("{$title} {$categoryTitles[$categorySlug]} самостоятельный товар"),
                    'prices' => $this->json($priceData),
                    'stock' => $this->json(['all' => $stock]),
                    'in_stock' => 1,
                    'shipping' => '{}',
                    'fields' => $this->json($fields),
                    'state' => 1,
                    'media' => $this->json(['image' => $image, 'gallery' => [['type' => 'image', 'src' => $image, 'alt' => $title]]]),
                    'params' => $this->json($this->productParams()),
                    'changelogs' => '{}',
                    'plugins' => '{}',
                    'language' => '*',
                ]);
                $this->indexProduct(
                    $productId,
                    $categoryId,
                    $title,
                    'Самостоятельный товар без вариативности для проверки смешанного каталога.',
                    $priceData,
                    ['all' => $stock],
                    $fields,
                    $globalOrdering++,
                    $priceData['rub']['final']
                );
            }
        }

        foreach ($this->categoryIds as $categoryId) {
            $this->update('joom_radicalmart_categories', [
                'totals' => $this->json(['items' => 44, 'products' => 44, 'metas' => 5]),
            ], 'id = ?', [$categoryId]);
        }
        $this->update('joom_radicalmart_categories', [
            'totals' => $this->json(['items' => 264, 'products' => 264, 'metas' => 30]),
        ], 'id = 5');
    }

    private function indexProduct(
        int $productId,
        int $categoryId,
        string $title,
        string $description,
        array $prices,
        array $stock,
        array $fields,
        int $ordering,
        int $finalPrice
    ): void {
        $categories = "1,5,{$categoryId}";
        $filterFields = $fields;
        $filterFields['com_radicalmart_state'] = 1;
        $filterFields['com_radicalmart_in_stock'] = 1;

        foreach ([1, 5, $categoryId] as $indexedCategoryId) {
            $this->insert('joom_radicalmart_categories_items', [
                'item_id' => $productId,
                'category_id' => $indexedCategoryId,
                'type' => 'product',
                'in_stock' => 1,
                'state' => 1,
                'language' => '*',
                'filter_categories' => $categories,
                'filter_prices' => $this->json($prices),
                'filter_fields' => $this->json($fields ? $filterFields : ['p' . $productId => $filterFields]),
                'filter_stock' => $this->json($stock),
                'filter_text' => mb_strtolower("{$title} {$description}"),
                'ordering' => $ordering,
                'ordering_title' => mb_substr(mb_strtolower($title), 0, 40),
                'ordering_price' => $finalPrice,
                'ordering_rating' => 0,
                'ordering_date' => time() - $ordering,
            ]);
        }
    }

    private function ensureShowcaseArticle(): int
    {
        $articleId = (int) ($this->value(
            'SELECT id FROM joom_content WHERE alias = ?',
            ['ytdemo-mega-catalog']
        ) ?: 0);
        $layout = $this->buildLayout();
        $fulltext = '<!-- ' . $this->json($layout) . ' -->';
        $intro = '<p>Большой тестовый каталог RadicalMart: 264 товара, 30 семейств вариантов и 6 категорий.</p>';
        $data = [
            'title' => 'Большой каталог · YTDynamics',
            'alias' => 'ytdemo-mega-catalog',
            'introtext' => $intro,
            'fulltext' => $fulltext,
            'state' => 1,
            'catid' => 2,
            'modified' => $this->now,
            'modified_by' => 42,
            'images' => '{}',
            'urls' => '{}',
            'attribs' => '{}',
            'metakey' => '',
            'metadesc' => 'Демонстрационный каталог RadicalMart и YOOtheme Pro',
            'access' => 1,
            'metadata' => '{}',
            'featured' => 0,
            'language' => '*',
            'note' => 'Generated by tools/seed-large-demo-catalog.php',
        ];
        if ($articleId) {
            $this->update('joom_content', $data, 'id = ?', [$articleId]);
            return $articleId;
        }

        $data += [
            'asset_id' => 0,
            'created' => $this->now,
            'created_by' => 42,
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

    private function buildLayout(): array
    {
        $categoryCards = [];
        $slides = [];
        foreach ($this->categoryIds as $slug => $id) {
            $title = [
                'electronics' => 'Электроника', 'smart-home' => 'Умный дом', 'garden' => 'Сад и дача',
                'workshop' => 'Мастерская', 'office' => 'Офис', 'sport' => 'Спорт и путешествия',
            ][$slug];
            $image = 'images/demo-catalog/' . [
                'electronics' => 'electronics.svg', 'smart-home' => 'smart-home.svg', 'garden' => 'garden.svg',
                'workshop' => 'workshop.svg', 'office' => 'office.svg', 'sport' => 'sport.svg',
            ][$slug];
            $categoryCards[] = [
                'type' => 'rmgrid_item',
                'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'name' => $title],
                'children' => [
                    ['type' => 'image', 'props' => ['image' => $image, 'image_alt' => $title, 'image_border' => 'rounded']],
                    ['type' => 'headline', 'props' => ['content' => $title, 'title_element' => 'h3', 'title_style' => 'h4', 'margin_top' => 'small']],
                    ['type' => 'text', 'props' => ['content' => '5 метатоваров · 44 варианта', 'text_style' => 'meta', 'margin_top' => 'small']],
                    $this->button('Открыть категорию', '/index.php?option=com_radicalmart&view=category&id=' . $id, 'text'),
                ],
            ];
            $slides[] = ['type' => 'rmslideshow_item', 'props' => ['image' => $image, 'image_alt' => $title, 'name' => $title]];
        }

        $productCards = [];
        foreach ($this->featured as $item) {
            $productCards[] = $this->productCard($item);
        }

        $tableRows = [[
            'type' => 'rmtable_item',
            'props' => ['row_type' => 'head', 'name' => 'Заголовок'],
            'children' => array_map(
                static fn(string $text): array => ['type' => 'rmtable_cell', 'props' => ['text' => $text, 'scope' => 'col']],
                ['Товар', 'Категория', 'Цена', 'Остаток', 'Действие']
            ),
        ]];
        foreach ($this->tableProducts as $item) {
            $tableRows[] = [
                'type' => 'rmtable_item',
                'props' => ['row_type' => 'body', 'name' => $item['title']],
                'children' => [
                    ['type' => 'rmtable_cell', 'props' => ['text' => '<strong>' . $item['title'] . '</strong>', 'mobile_label' => 'Товар']],
                    ['type' => 'rmtable_cell', 'props' => ['text' => $item['category'], 'mobile_label' => 'Категория']],
                    ['type' => 'rmtable_cell', 'props' => ['text' => number_format($item['price'], 0, ',', ' ') . ' ₽', 'mobile_label' => 'Цена', 'wrap_mode' => 'nowrap']],
                    ['type' => 'rmtable_cell', 'props' => ['text' => (string) $item['stock'], 'mobile_label' => 'Остаток']],
                    ['type' => 'rmtable_cell', 'props' => ['mobile_label' => 'Действие', 'children' => [], 'content' => []], 'children' => [
                        ['type' => 'rmbuy', 'props' => ['product_id' => $item['id'], 'label' => 'В корзину', 'button_style' => 'primary', 'button_size' => 'small', 'show_count' => false]],
                    ],
                ]],
            ];
        }

        return [
            'type' => 'layout',
            'children' => [
                [
                    'type' => 'section',
                    'props' => ['style' => 'primary', 'padding' => 'large', 'overlap' => false],
                    'children' => [[
                        'type' => 'row', 'props' => ['layout' => '1-2,1-2'], 'children' => [[
                            'type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
                                ['type' => 'headline', 'props' => ['content' => 'Каталог, который проверяет всё', 'title_element' => 'h1', 'title_style' => 'hero', 'title_decoration' => 'bullet']],
                                ['type' => 'text', 'props' => ['content' => '264 товара · 30 семейств вариантов · 6 категорий · универсальные элементы Builder', 'text_style' => 'lead', 'margin_top' => 'small']],
                                $this->button('Смотреть товары', '#catalog-products', 'secondary', 'large'),
                            ],
                        ], ['type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
                            ['type' => 'image', 'props' => ['image' => 'images/demo-catalog/electronics.svg', 'image_alt' => 'Умная электроника', 'image_border' => 'rounded']],
                        ]]],
                    ]],
                ],
                $this->section('Навигация по каталогу', [
                    ['type' => 'rmtoolbar', 'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'show_ordering' => true, 'ordering_width' => 'medium', 'show_grid_button' => true, 'show_list_button' => true, 'show_table_button' => true]],
                    ['type' => 'row', 'props' => ['margin_top' => 'medium'], 'children' => [
                        ['type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
                            ['type' => 'rmsearch', 'props' => ['placeholder' => 'Найти товар или категорию', 'aria_label' => 'Поиск по каталогу', 'search_style' => 'large', 'search_icon' => 'right']],
                        ]],
                        ['type' => 'column', 'props' => ['width_medium' => '1-4'], 'children' => [
                            ['type' => 'rmmodal', 'props' => ['label' => 'Помощь с выбором', 'button_style' => 'default', 'modal_size' => 'container', 'fullwidth' => true], 'children' => [
                                ['type' => 'headline', 'props' => ['content' => 'Помощь с выбором', 'title_element' => 'h2', 'title_style' => 'h3']],
                                ['type' => 'text', 'props' => ['content' => 'Используйте фильтры RadicalMart, быстрый просмотр и переключатель вариантов прямо в карточке.']],
                            ]],
                        ]],
                        ['type' => 'column', 'props' => ['width_medium' => '1-4'], 'children' => [
                            ['type' => 'rmoffcanvas', 'props' => ['label' => 'Категории', 'button_style' => 'secondary', 'mode' => 'push', 'side' => 'right', 'panel_width' => 'medium', 'fullwidth' => true], 'children' => [
                                ['type' => 'headline', 'props' => ['content' => 'Разделы магазина', 'title_element' => 'h3', 'title_style' => 'h4']],
                                ['type' => 'text', 'props' => ['content' => 'Электроника<br>Умный дом<br>Сад и дача<br>Мастерская<br>Офис<br>Спорт и путешествия']],
                            ]],
                        ]],
                    ]],
                ], 'default', 'small'),
                $this->section('Шесть направлений', [[
                    'type' => 'rmgrid',
                    'props' => ['mode' => 'default', 'grid_column_gap' => 'small', 'grid_row_gap' => 'small', 'grid_default' => '1', 'grid_small' => '2', 'grid_medium' => '3', 'grid_large' => '3'],
                    'children' => $categoryCards,
                ]], 'muted', 'default'),
                $this->section('Витрина категорий', [[
                    'type' => 'rmslideshow',
                    'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'gallery_orientation' => 'horizontal', 'slideshow_autoplay' => true, 'slideshow_autoplay_interval' => 5, 'nav' => 'thumbnav', 'thumbnav_position' => 'bottom', 'thumbnav_orientation' => 'horizontal', 'nav_arrows' => true, 'slidenav' => 'default', 'lightbox' => true, 'lightbox_controls' => true],
                    'children' => $slides,
                ]], 'default', 'default'),
                $this->section('Карточки с вариативностью', [[
                    'type' => 'rmgrid',
                    'props' => ['id' => 'catalog-products', 'mode' => 'default', 'grid_column_gap' => 'medium', 'grid_row_gap' => 'medium', 'grid_default' => '1', 'grid_small' => '2', 'grid_large' => '3', 'filter' => false],
                    'children' => $productCards,
                ]], 'muted', 'default'),
                $this->section('Разные сценарии представления', [[
                    'type' => 'rmswitcher',
                    'props' => ['show_label' => true, 'switcher_style' => 'tab', 'switcher_align' => 'center', 'switcher_animation' => 'fade'],
                    'children' => [
                        $this->switcherItem('Карточки', 'Карточки', 'RM Grid принимает произвольные Builder-фрагменты: изображение, цену, поля, вариантность, покупку и Quick View.'),
                        $this->switcherItem('Сравнение', 'Сравнение', 'RM Table поддерживает прокрутку, карточки на мобильном, sticky-колонки, подписи ячеек и вложенные элементы.'),
                        $this->switcherItem('Интерактив', 'Интерактив', 'RM Slideshow, Modal, Offcanvas, Toolbar и Search работают в общей системе UIkit 3 и наследуют стиль темы.'),
                    ],
                ]], 'default', 'default'),
                $this->section('Быстрое сравнение', [[
                    'type' => 'rmtable',
                    'props' => ['caption' => 'Популярные семейства товаров', 'caption_style' => 'lead', 'table_style' => 'divider', 'table_hover' => true, 'container_style' => 'default', 'container_size' => 'small', 'container_border' => true, 'container_radius' => true, 'container_shadow' => 'small', 'responsive_mode' => 'cards', 'responsive_breakpoint' => 'm', 'mobile_card_gap' => 'small', 'mobile_card_padding' => 'small', 'sticky_first' => true],
                    'children' => $tableRows,
                ]], 'muted', 'default'),
            ],
        ];
    }

    private function productCard(array $item): array
    {
        return [
            'type' => 'rmgrid_item',
            'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'name' => $item['title'], 'class' => 'catalog-product-card'],
            'children' => [[
                'type' => 'rmproductcard',
                'props' => ['product_id' => $item['product_id'], 'panel_style' => '', 'class' => 'catalog-product-card__body'],
                'children' => [
                    ['type' => 'rmproductcard_main', 'props' => [], 'children' => [
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'image', 'image_ratio' => '4:3', 'image_fit' => 'cover', 'image_border' => 'rounded']],
                        ['type' => 'text', 'props' => ['content' => $item['category'], 'text_style' => 'meta', 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'title', 'title_element' => 'h3', 'title_style' => 'h4', 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'price', 'text_style' => 'lead', 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'availability', 'margin_top' => 'small']],
                    ]],
                    ['type' => 'rmproductcard_dropdown', 'props' => ['display_mode' => 'hover', 'hover_breakpoint' => 'm', 'panel_style' => 'default', 'panel_padding' => 'small'], 'children' => [
                        ['type' => 'rmvariantselector', 'props' => ['product_id' => $item['product_id'], 'variant_fields' => ['catalog-color', 'catalog-size', 'catalog-edition'], 'style' => 'buttons', 'action' => 'ajax', 'show_labels' => true, 'show_selected_value' => true, 'disable_unavailable' => true, 'update_url' => false]],
                        ['type' => 'rmbuy', 'props' => ['product_id' => $item['product_id'], 'label' => 'В корзину', 'button_style' => 'primary', 'button_size' => 'small', 'show_count' => false, 'fullwidth' => true]],
                        ['type' => 'rmquickview', 'props' => ['product_id' => $item['product_id'], 'label' => 'Быстрый просмотр', 'button_style' => 'text', 'button_size' => 'small', 'modal_size' => 'container', 'fullwidth' => true]],
                    ]],
                ],
            ]],
        ];
    }

    private function section(string $title, array $children, string $style = 'default', string $padding = 'default'): array
    {
        return [
            'type' => 'section',
            'props' => ['style' => $style, 'padding' => $padding],
            'children' => [[
                'type' => 'row', 'props' => [], 'children' => [[
                    'type' => 'column', 'props' => ['width_medium' => '1-1'], 'children' => array_merge([
                        ['type' => 'headline', 'props' => ['content' => $title, 'title_element' => 'h2', 'title_style' => 'h2', 'margin_bottom' => 'medium']],
                    ], $children),
                ]],
            ]],
        ];
    }

    private function switcherItem(string $name, string $label, string $content): array
    {
        return [
            'type' => 'rmswitcher_item',
            'props' => ['name' => $name, 'title' => $name, 'label' => $label, 'panel_style' => 'card-default', 'panel_padding' => 'default'],
            'children' => [
                ['type' => 'headline', 'props' => ['content' => $name, 'title_element' => 'h3', 'title_style' => 'h3']],
                ['type' => 'text', 'props' => ['content' => $content, 'text_style' => 'lead', 'margin_top' => 'small']],
            ],
        ];
    }

    private function button(string $content, string $link, string $style = 'default', string $size = ''): array
    {
        return [
            'type' => 'button',
            'props' => ['button_size' => $size, 'margin_top' => 'small'],
            'children' => [[
                'type' => 'button_item',
                'props' => ['content' => $content, 'link' => $link, 'button_style' => $style],
            ]],
        ];
    }

    private function ensureMenuItem(int $articleId): void
    {
        $menuId = (int) ($this->value('SELECT id FROM joom_menu WHERE alias = ?', ['ytdynamics-mega-catalog']) ?: 0);
        $componentId = (int) $this->value("SELECT extension_id FROM joom_extensions WHERE element = 'com_content' AND type = 'component'");
        $data = [
            'menutype' => 'mainmenu',
            'title' => 'MEGA CATALOG',
            'alias' => 'ytdynamics-mega-catalog',
            'note' => 'Generated demo catalogue',
            'path' => 'ytdynamics-mega-catalog',
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
        if ($menuId) {
            $this->update('joom_menu', $data, 'id = ?', [$menuId]);
            return;
        }

        $right = (int) $this->value("SELECT MAX(rgt) FROM joom_menu WHERE menutype = 'mainmenu'");
        $data['lft'] = $right + 1;
        $data['rgt'] = $right + 2;
        $this->insert('joom_menu', $data);
    }

    private function configureRadicalMart(): void
    {
        $params = json_decode((string) $this->value(
            "SELECT params FROM joom_extensions WHERE element = 'com_radicalmart' AND type = 'component'"
        ), true) ?: [];
        $params['products_limit'] = 24;
        $params['products_ordering_in_stock'] = 1;
        $this->query(
            "UPDATE joom_extensions SET params = ? WHERE element = 'com_radicalmart' AND type = 'component'",
            [$this->json($params)]
        );
    }

    private function configureYootheme(): void
    {
        $params = json_decode((string) $this->value('SELECT params FROM joom_template_styles WHERE id = 12'), true) ?: [];
        $config = json_decode((string) ($params['config'] ?? '{}'), true) ?: [];
        $config = array_replace_recursive($config, [
            'style' => 'tech-space:white-blue',
            'logo' => ['text' => 'RADICAL STORE'],
            'site' => ['layout' => 'full'],
            'header' => ['layout' => 'horizontal-right', 'width' => 'expand'],
            'navbar' => ['sticky' => 1],
            'mobile' => [
                'breakpoint' => 'm',
                'header' => ['layout' => 'horizontal-right'],
                'navbar' => ['sticky' => 1],
                'dialog' => ['layout' => 'offcanvas-top', 'offcanvas' => ['mode' => 'slide', 'flip' => true]],
            ],
            'footer' => ['content' => 'RADICAL STORE · тестовый каталог YTDynamics'],
        ]);
        $params['config'] = $this->json($config);
        $this->query('UPDATE joom_template_styles SET params = ? WHERE id = 12', [$this->json($params)]);
    }

    private function ensureProductTemplate(): void
    {
        $customData = json_decode((string) $this->value(
            "SELECT custom_data FROM joom_extensions WHERE element = 'yootheme' AND folder = 'system'"
        ), true) ?: [];
        $templates = (array) ($customData['templates'] ?? []);
        $templateId = 'RMPAGEDEMO';
        foreach ($templates as $id => $template) {
            if (($template['type'] ?? '') === 'com_radicalmart.product') {
                $templateId = (string) $id;
                break;
            }
        }

        $template = [
            'type' => 'com_radicalmart.product',
            'name' => 'YTDynamics — AJAX Product Page',
            'query' => ['catid' => []],
            'layout' => $this->productTemplateLayout(),
        ];
        unset($templates[$templateId]);
        $customData['templates'] = [$templateId => $template] + $templates;
        $this->query(
            "UPDATE joom_extensions SET custom_data = ? WHERE element = 'yootheme' AND folder = 'system'",
            [$this->json($customData)]
        );
    }

    private function productTemplateLayout(): array
    {
        return [
            'type' => 'layout',
            'children' => [[
                'type' => 'section',
                'props' => ['style' => 'default', 'padding' => 'large', 'width' => 'default'],
                'children' => [[
                    'type' => 'rmproduct',
                    'props' => ['update_document_title' => true],
                    'source' => ['query' => ['name' => 'radicalMartProduct']],
                    'children' => [
                        [
                            'type' => 'row',
                            'props' => ['column_gap' => 'large', 'row_gap' => 'large', 'vertical_align' => 'middle'],
                            'children' => [
                                [
                                    'type' => 'column',
                                    'props' => ['width_medium' => '3-5'],
                                    'children' => [[
                                        'type' => 'rmslideshow',
                                        'props' => [
                                            'product_media' => true,
                                            'gallery_orientation' => 'horizontal',
                                            'gallery_mobile_orientation' => 'horizontal',
                                            'gallery_height' => 520,
                                            'gallery_mobile_height' => 300,
                                            'image_fit' => 'contain',
                                            'image_loading' => 'eager',
                                            'nav' => 'thumbnav',
                                            'thumbnav_orientation' => 'horizontal',
                                            'thumbnav_mobile_orientation' => 'horizontal',
                                            'thumbnav_position' => 'bottom',
                                            'thumbnav_size' => 92,
                                            'thumbnail_count' => 4,
                                            'nav_arrows' => true,
                                            'slidenav' => 'default',
                                            'slidenav_hover' => true,
                                            'slideshow_border' => 'rounded',
                                            'slideshow_box_shadow' => 'small',
                                            'lightbox' => true,
                                            'lightbox_controls' => true,
                                            'lightbox_counter' => true,
                                        ],
                                    ]],
                                ],
                                [
                                    'type' => 'column',
                                    'props' => ['width_medium' => '2-5'],
                                    'children' => [
                                        ['type' => 'text', 'props' => ['content' => 'RADICALMART · AJAX PRODUCT', 'text_style' => 'meta']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'title', 'title_element' => 'h1', 'title_style' => 'h1', 'link_product' => false, 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'code', 'text_style' => 'meta', 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'price', 'text_style' => 'large', 'show_base_price' => true, 'show_discount' => true, 'margin_top' => 'default']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'availability', 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'description', 'text_style' => 'lead', 'margin_top' => 'default']],
                                        ['type' => 'rmvariantselector', 'props' => ['style' => 'buttons', 'action' => 'ajax', 'button_style' => 'default', 'image_fit' => 'contain', 'show_labels' => true, 'show_selected_value' => true, 'disable_unavailable' => true, 'update_url' => 'replace', 'margin_top' => 'default']],
                                        ['type' => 'rmbuy', 'props' => ['show_count' => true, 'button_style' => 'primary', 'button_size' => 'large', 'mobile_stack' => true, 'fullwidth' => true, 'margin_top' => 'default']],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'type' => 'row',
                            'props' => ['column_gap' => 'large', 'row_gap' => 'large', 'margin_top' => 'large'],
                            'children' => [
                                [
                                    'type' => 'column',
                                    'props' => ['width_medium' => '1-2'],
                                    'children' => [
                                        ['type' => 'headline', 'props' => ['content' => 'О товаре', 'title_element' => 'h2', 'title_style' => 'h3']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'full_description', 'text_style' => 'lead', 'margin_top' => 'small']],
                                    ],
                                ],
                                [
                                    'type' => 'column',
                                    'props' => ['width_medium' => '1-2'],
                                    'children' => [
                                        ['type' => 'headline', 'props' => ['content' => 'Характеристики', 'title_element' => 'h2', 'title_style' => 'h3']],
                                        ['type' => 'rmproductspecifications', 'props' => ['layout' => 'description-list', 'show_fieldset_titles' => false, 'show_variant_fields' => false, 'divider' => true, 'margin_top' => 'small']],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ]],
            ]],
            'version' => '5.0.42',
        ];
    }

    private function installYoothemeKey(): void
    {
        $key = trim((string) getenv('YOOTHEME_KEY'));
        if ($key === '') {
            return;
        }

        $sites = $this->query(
            "SELECT us.update_site_id, us.extra_query
             FROM joom_update_sites us
             INNER JOIN joom_update_sites_extensions usex ON usex.update_site_id = us.update_site_id
             INNER JOIN joom_extensions e ON e.extension_id = usex.extension_id
             WHERE e.element = 'pkg_yootheme'"
        )->fetchAll();
        foreach ($sites as $site) {
            parse_str((string) $site['extra_query'], $query);
            $query['key'] = $key;
            $this->query(
                'UPDATE joom_update_sites SET extra_query = ? WHERE update_site_id = ?',
                [http_build_query($query), $site['update_site_id']]
            );
        }
    }

    private function price(int $base, int $discount = 0): array
    {
        return ['rub' => [
            'currency' => 'RUB',
            'purchase_enable' => 0,
            'purchase' => 0,
            'extra' => '',
            'base' => $base,
            'discount_enable' => $discount > 0 ? 1 : 0,
            'discount' => $discount ?: '',
            'discount_end' => '',
            'final' => $base - $discount,
            'benefit' => $discount,
            'hide' => '0',
        ]];
    }

    private function productParams(): array
    {
        return [
            'quantity_min' => '1', 'quantity_step' => '1', 'quantity_max' => '',
            'quantity_units' => 'шт.', 'stock_accounting' => '1',
            'seo_product_title' => '', 'seo_product_description' => '', 'seo_product_image' => '',
            'seo_product_robots' => '', 'seo_product_h1' => '', 'product_layout' => '',
        ];
    }

    private function specificationValues(string $category, int $family, string $size, string $edition): array
    {
        $materials = [
            'electronics' => 'Алюминий и закалённое стекло',
            'smart-home' => 'Поликарбонат и алюминий',
            'garden' => 'Сталь с защитным покрытием',
            'workshop' => 'Усиленный композит и сталь',
            'office' => 'Алюминий, текстиль и пластик',
            'sport' => 'Износостойкий нейлон',
        ];
        $performanceLabels = [
            'electronics' => 'Автономность',
            'smart-home' => 'Подключение',
            'garden' => 'Рабочая площадь',
            'workshop' => 'Мощность',
            'office' => 'Нагрузка',
            'sport' => 'Полезный объём',
        ];
        $performanceUnits = [
            'electronics' => 'ч',
            'smart-home' => 'Wi-Fi 2.4/5 ГГц',
            'garden' => 'м²',
            'workshop' => 'Вт',
            'office' => 'кг',
            'sport' => 'л',
        ];
        $base = 10 + (($family * 7) % 18) + ($size === 'standard' ? 6 : 0) + ($edition === 'pro' ? 8 : 0);
        $performance = $category === 'smart-home'
            ? $performanceUnits[$category]
            : $performanceLabels[$category] . ': ' . ($category === 'workshop' ? $base * 35 : $base) . ' ' . $performanceUnits[$category];

        return [
            'catalog-material' => $materials[$category] ?? 'Комбинированные материалы',
            'catalog-performance' => $performance,
            'catalog-warranty' => $edition === 'pro' ? '36 месяцев' : '24 месяца',
            'catalog-package' => $edition === 'pro'
                ? 'Товар, расширенный комплект, кейс, документация'
                : 'Товар, базовый комплект, документация',
        ];
    }

    private function optionLabel(string $field, string $value): string
    {
        $labels = [
            'catalog-color' => ['graphite' => 'графит', 'sand' => 'песочный', 'forest' => 'лесной', 'ocean' => 'океан', 'coral' => 'коралловый', 'snow' => 'белый'],
            'catalog-size' => ['compact' => 'компактный', 'standard' => 'стандартный'],
            'catalog-edition' => ['base' => 'Base', 'pro' => 'Pro'],
        ];
        return $labels[$field][$value] ?? $value;
    }

    private function createVariantImage(
        string $sourceName,
        string $alias,
        string $color,
        string $size,
        string $edition
    ): string {
        $root = $this->siteRoot();
        $sourcePath = $root . '/images/demo-catalog/' . $sourceName;
        $relativePath = 'images/demo-catalog/variants/' . $alias . '.svg';
        $targetPath = $root . '/' . $relativePath;
        $source = @file_get_contents($sourcePath);
        if ($source === false) {
            return 'images/demo-catalog/' . $sourceName;
        }

        $palette = [
            'graphite' => '#374151', 'snow' => '#f5f7fa', 'sand' => '#d6b98c',
            'forest' => '#39734d', 'ocean' => '#3186a0', 'coral' => '#ef6f61',
        ];
        $accent = $palette[$color] ?? '#52606d';
        $colorLabel = mb_strtoupper($this->optionLabel('catalog-color', $color));
        $sizeLabel = mb_strtoupper($this->optionLabel('catalog-size', $size));
        $editionLabel = mb_strtoupper($this->optionLabel('catalog-edition', $edition));
        $variantLabel = htmlspecialchars("{$sizeLabel} · {$editionLabel}", ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $colorText = htmlspecialchars($colorLabel, ENT_XML1 | ENT_QUOTES, 'UTF-8');

        $overlay = <<<SVG
  <g aria-hidden="true">
    <rect x="706" y="642" width="420" height="94" rx="47" fill="#ffffff" fill-opacity=".94"/>
    <circle cx="758" cy="689" r="27" fill="{$accent}" stroke="#ffffff" stroke-width="5"/>
    <text x="802" y="680" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#20242c">{$colorText}</text>
    <text x="802" y="710" font-family="Arial,sans-serif" font-size="18" font-weight="600" fill="#69707d">{$variantLabel}</text>
  </g>
SVG;
        $svg = preg_replace('/<\/svg>\s*$/', $overlay . "\n</svg>", $source, 1);
        if (!is_string($svg)) {
            return 'images/demo-catalog/' . $sourceName;
        }

        $directory = dirname($targetPath);
        if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to create demo variant image directory.');
        }
        if (file_put_contents($targetPath, $svg) === false) {
            throw new RuntimeException('Unable to write demo variant image: ' . $targetPath);
        }

        return $relativePath;
    }

    private function siteRoot(): string
    {
        foreach ([(string) getenv('JOOMLA_ROOT'), dirname(__DIR__), '/var/www/html'] as $root) {
            $root = rtrim($root, '/');
            if ($root !== '' && is_file($root . '/configuration.php')) {
                return $root;
            }
        }
        throw new RuntimeException('Joomla root was not found.');
    }

    private function slug(string $value): string
    {
        return strtolower(trim((string) preg_replace('/[^a-z0-9]+/i', '-', $value), '-'));
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

    private function row(string $sql, array $params = []): array|false
    {
        return $this->query($sql, $params)->fetch();
    }

    private function column(string $sql, array $params = []): array
    {
        return $this->query($sql, $params)->fetchAll(PDO::FETCH_COLUMN);
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
        $assignments = implode(', ', array_map(static fn(string $column): string => "`{$column}` = ?", array_keys($data)));
        $this->query("UPDATE {$table} SET {$assignments} WHERE {$where}", array_merge(array_values($data), $whereParams));
    }
}

(new DemoCatalogueSeeder())->run();
