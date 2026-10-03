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
    private int $filterModuleId = 0;
    private int $filterMobileModuleId = 0;

    private const PREFIX = 'food-';

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
            $this->clearCatalogue();
            $this->ensureRussianComponentLanguage();
            $this->ensureFoodImages();
            $this->ensureCategories();
            $this->ensureFields();
            $this->createProductsAndMetas();
			$this->refreshCategoryPrices();
            $this->ensureFilterModule();
            $articleId = $this->ensureShowcaseArticle();
            $this->ensureMenuItem($articleId);
            // The filter can be created before the menu because the showcase
            // embeds it, then it is rebound to the final catalogue route.
            $this->ensureFilterModule();
            $this->configureRadicalMart();
            $this->configureYootheme();
            $this->configureSiteLanguage();
            $this->ensureProductTemplate();
            $this->ensureCategoryTemplate();
            $this->installYoothemeKey();
            $this->db->commit();
        } catch (Throwable $error) {
            $this->db->rollBack();
            throw $error;
        }

        $counts = [
            'products' => (int) $this->value("SELECT COUNT(*) FROM joom_radicalmart_products"),
            'metas' => (int) $this->value("SELECT COUNT(*) FROM joom_radicalmart_metas"),
            'categories' => count($this->categoryIds),
        ];

        echo json_encode([
            'status' => 'ok',
            'generated' => $counts,
            'showcase' => '/index.php/food-market',
            'license' => getenv('YOOTHEME_KEY') ? 'configured' : 'unchanged',
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    }

    private function clearCatalogue(): void
    {
        // Validate the destructive scope before deleting anything. This demo
        // seeder owns only the generated `food-*` branch under category #5.
        $unknown = (int) $this->value(
            "SELECT COUNT(*) FROM joom_radicalmart_categories WHERE parent_id = 5 AND alias NOT LIKE 'food-%'"
        );
        if ($unknown > 0) {
            throw new RuntimeException('Category #5 has unknown children; catalogue cleanup was stopped.');
        }

        $this->query('DELETE FROM joom_radicalmart_categories_items');
        $this->query('DELETE FROM joom_radicalmart_products');
        $this->query('DELETE FROM joom_radicalmart_metas');
        $this->query('DELETE FROM joom_radicalmart_fields');
        $this->query('DELETE FROM joom_radicalmart_fieldsets');
        $this->query('DELETE FROM joom_radicalmart_categories WHERE id NOT IN (1, 5)');
        $this->update('joom_radicalmart_categories', [
            'parent_id' => 1,
            'level' => 1,
            'lft' => 1,
            'rgt' => 22,
            'path' => 'food-market',
            'title' => 'Зелёная лавка',
            'alias' => 'food-market',
            'introtext' => 'Свежие продукты и товары на каждый день.',
            'search_text' => 'зелёная лавка продукты еда доставка',
            'media' => $this->json(['image' => 'images/food-market/hero.svg', 'gallery' => []]),
            'totals' => '{}',
        ], 'id = 5');
        $this->update('joom_radicalmart_categories', ['lft' => 0, 'rgt' => 23], 'id = 1');

        $menuIds = $this->column("SELECT id FROM joom_menu WHERE alias LIKE 'ytdynamics-catalog-%' OR alias IN ('ytdynamics-demo-catalog','ytdynamics-mega-catalog','ytdynamics-product-atoms')");
        if ($menuIds) {
            $marks = implode(',', array_fill(0, count($menuIds), '?'));
            $this->query("DELETE FROM joom_menu WHERE id IN ({$marks})", $menuIds);
        }
    }

    private function ensureFoodImages(): void
    {
        $directory = $this->siteRoot() . '/images/food-market';
        if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to create food market image directory.');
        }

        $assets = [
            'hero' => ['Свежие продукты', '#f3ead7', '#2f6b45', '#dba55b'],
            'vegetables' => ['Овощи и зелень', '#e4f1dc', '#4f8a45', '#f0a34a'],
            'fruits' => ['Фрукты и ягоды', '#fff0df', '#e06a44', '#8fbf55'],
            'dairy' => ['Молочные продукты', '#e8f3f6', '#4e91a8', '#f3c969'],
            'bakery' => ['Хлеб и выпечка', '#f7ead8', '#ad713c', '#e8b36b'],
            'meat' => ['Мясо и птица', '#f7e2df', '#a84f4d', '#df8e78'],
            'fish' => ['Рыба и морепродукты', '#e0f0ef', '#327b7d', '#e99c5b'],
            'grocery' => ['Бакалея', '#f3edd7', '#8b7544', '#d4a84e'],
            'drinks' => ['Напитки', '#e4edf5', '#3f75a2', '#80b761'],
            'sweets' => ['Сладости', '#f7e5ed', '#ad5d83', '#e6a85e'],
            'frozen' => ['Замороженные продукты', '#e4eef8', '#567fa9', '#8db4cf'],
        ];

        foreach ($assets as $slug => [$title, $background, $accent, $secondary]) {
            $safeTitle = htmlspecialchars($title, ENT_XML1 | ENT_QUOTES, 'UTF-8');
            $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="{$safeTitle}">
  <rect width="1200" height="800" rx="54" fill="{$background}"/>
  <circle cx="1010" cy="150" r="190" fill="{$secondary}" opacity=".28"/>
  <circle cx="190" cy="650" r="145" fill="{$accent}" opacity=".13"/>
  <path d="M600 190c-118 0-216 91-229 207 75-63 168-86 279-70-78 27-139 75-183 143 42 90 131 152 234 152 144 0 260-116 260-260-141-4-257 37-361 123 20-94 8-193-34-295h34z" fill="{$accent}"/>
  <path d="M487 540c92-145 215-240 374-287" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round" opacity=".86"/>
  <text x="72" y="92" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="{$accent}">ЗЕЛЁНАЯ ЛАВКА</text>
  <text x="72" y="720" font-family="Arial,sans-serif" font-size="62" font-weight="800" fill="{$accent}">{$safeTitle}</text>
</svg>
SVG;
            if (file_put_contents($directory . '/' . $slug . '.svg', $svg) === false) {
                throw new RuntimeException('Unable to write food market asset: ' . $slug);
            }
        }
    }

    private function ensureRussianComponentLanguage(): void
    {
        $root = $this->siteRoot();
        $source = $root . '/administrator/language/ru-RU/com_radicalmart.ini';
        $targetDirectory = $root . '/language/ru-RU';
        $target = $targetDirectory . '/com_radicalmart.ini';
        if (!is_file($source)) {
            return;
        }
        if (!is_dir($targetDirectory) && !mkdir($targetDirectory, 0775, true) && !is_dir($targetDirectory)) {
            throw new RuntimeException('Unable to create Russian site language directory.');
        }
        if (!copy($source, $target)) {
            throw new RuntimeException('Unable to install RadicalMart Russian site translations.');
        }
    }

    private function ensureCategories(): void
    {
        $catalogue = $this->row("SELECT * FROM joom_radicalmart_categories WHERE id = 5");
        if (!$catalogue) {
            throw new RuntimeException('Demo shop category #5 is missing.');
        }

        $categories = [
            ['vegetables', 'Овощи и зелень', 'Свежие сезонные овощи, салаты и ароматная зелень.', 'vegetables.svg'],
            ['fruits', 'Фрукты и ягоды', 'Спелые фрукты, ягоды и цитрусовые на каждый день.', 'fruits.svg'],
            ['dairy', 'Молочные продукты', 'Молоко, йогурты, сыры, творог и сливочные продукты.', 'dairy.svg'],
            ['bakery', 'Хлеб и выпечка', 'Ремесленный хлеб, круассаны и свежая выпечка.', 'bakery.svg'],
            ['meat', 'Мясо и птица', 'Охлаждённое мясо, птица и полуфабрикаты.', 'meat.svg'],
            ['fish', 'Рыба и морепродукты', 'Рыба, креветки и морские деликатесы.', 'fish.svg'],
            ['grocery', 'Бакалея', 'Крупы, паста, соусы, масло и продукты для кухни.', 'grocery.svg'],
            ['drinks', 'Напитки', 'Вода, соки, кофе, чай и освежающие напитки.', 'drinks.svg'],
            ['sweets', 'Сладости', 'Шоколад, печенье, десерты и полезные перекусы.', 'sweets.svg'],
            ['frozen', 'Замороженные продукты', 'Овощные смеси, ягоды, мороженое и готовые блюда.', 'frozen.svg'],
        ];

        foreach ($categories as $index => [$slug, $title, $description, $image]) {
            $alias = self::PREFIX . $slug;
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_categories WHERE alias = ?', [$alias]) ?: 0);
            $data = [
                'parent_id' => 5,
                'level' => 2,
                'path' => 'food-market/' . $alias,
                'title' => $title,
                'alias' => $alias,
                'type' => 'category',
                'introtext' => $description,
                'fulltext' => '',
                'search_text' => mb_strtolower("{$title} {$description}"),
                'prices' => '{}',
                'media' => $this->json(['image' => 'images/food-market/' . $image, 'gallery' => []]),
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
            ['food-characteristics']
        ) ?: 0);
        $fieldset = [
            'title' => 'Параметры продуктов',
            'alias' => 'food-characteristics',
            'description' => 'Варианты бренда, фасовки и упаковки продуктового магазина',
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
            'food-brand' => [
                'Бренд',
                [
                    'green-farm' => ['Green Farm', '#4f8a45'],
                    'daily-fresh' => ['Daily Fresh', '#e0a040'],
                ],
            ],
            'food-weight' => [
                'Фасовка',
                [
                    'small' => ['Малая', ''],
                    'family' => ['Семейная', ''],
                ],
            ],
            'food-pack' => [
                'Упаковка',
                [
                    'eco' => ['Эко', ''],
                    'classic' => ['Классическая', ''],
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
            'food-origin' => 'Происхождение',
            'food-composition' => 'Состав',
            'food-storage' => 'Условия хранения',
            'food-shelf-life' => 'Срок годности',
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
        $baseFamilies = [
            'vegetables' => [['Томаты сливовидные', 239, 'Сочные томаты для салатов и горячих блюд.'], ['Огурцы хрустящие', 189, 'Свежие огурцы с тонкой кожицей.'], ['Картофель молодой', 129, 'Отборный молодой картофель.'], ['Салат листовой', 159, 'Хрустящий салат, собранный утром.']],
            'fruits' => [['Яблоки сладкие', 179, 'Ароматные яблоки с плотной мякотью.'], ['Груши медовые', 249, 'Сочные груши десертных сортов.'], ['Апельсины', 219, 'Яркие цитрусовые с насыщенным вкусом.'], ['Ягоды сезонные', 399, 'Свежая смесь отборных ягод.']],
            'dairy' => [['Молоко фермерское', 139, 'Натуральное пастеризованное молоко.'], ['Йогурт густой', 119, 'Йогурт с живыми культурами.'], ['Творог зернёный', 189, 'Свежий творог с нежной текстурой.'], ['Сыр полутвёрдый', 349, 'Сыр с выразительным сливочным вкусом.']],
            'bakery' => [['Хлеб ремесленный', 149, 'Хлеб длительной ферментации на закваске.'], ['Багет французский', 109, 'Хрустящий багет с воздушным мякишем.'], ['Круассан сливочный', 129, 'Слоёный круассан на сливочном масле.'], ['Пирог домашний', 389, 'Домашний пирог с сезонной начинкой.']],
            'meat' => [['Филе куриное', 429, 'Охлаждённое филе без кожи.'], ['Индейка фермерская', 549, 'Нежное филе индейки.'], ['Говядина мякоть', 899, 'Отборная говядина для тушения и запекания.'], ['Котлеты домашние', 459, 'Охлаждённые котлеты из натурального мяса.']],
            'fish' => [['Филе лосося', 1099, 'Охлаждённое филе атлантического лосося.'], ['Форель радужная', 799, 'Свежая радужная форель.'], ['Креветки тигровые', 949, 'Крупные очищенные креветки.'], ['Треска филе', 629, 'Нежное филе трески без костей.']],
            'grocery' => [['Паста из твёрдых сортов', 169, 'Итальянская паста из твёрдой пшеницы.'], ['Рис жасмин', 229, 'Ароматный длиннозёрный рис.'], ['Масло оливковое', 699, 'Оливковое масло первого холодного отжима.'], ['Гранола ореховая', 319, 'Хрустящая гранола с орехами и семенами.']],
            'drinks' => [['Сок прямого отжима', 249, 'Натуральный сок без добавленного сахара.'], ['Вода минеральная', 89, 'Природная минеральная вода.'], ['Кофе зерновой', 649, 'Свежая обжарка с шоколадным профилем.'], ['Чай листовой', 389, 'Отборный крупнолистовой чай.']],
            'sweets' => [['Шоколад тёмный', 229, 'Шоколад с высоким содержанием какао.'], ['Печенье овсяное', 179, 'Рассыпчатое печенье с цельными хлопьями.'], ['Пастила яблочная', 249, 'Натуральная пастила без добавленного сахара.'], ['Конфеты ореховые', 349, 'Конфеты с ореховой начинкой.']],
            'frozen' => [['Овощная смесь', 229, 'Быстрозамороженные сезонные овощи.'], ['Ягоды замороженные', 369, 'Ягоды шоковой заморозки.'], ['Мороженое пломбир', 199, 'Сливочный пломбир по классической рецептуре.'], ['Пельмени домашние', 449, 'Пельмени с натуральной мясной начинкой.']],
        ];
        $collections = ['Классика', 'Фермерская', 'Отборная', 'Домашняя', 'Органик', 'Премиум', 'Семейная', 'Сезонная', 'Гурмэ', 'Эко'];
        $families = [];
        foreach ($baseFamilies as $slug => $items) {
            foreach ($collections as $collectionIndex => $collection) {
                foreach ($items as [$name, $price, $description]) {
                    $families[$slug][] = ["{$name} · {$collection}", $price + $collectionIndex * 17, "{$description} Линейка «{$collection}». "];
                }
            }
        }

        $images = array_combine(array_keys($families), array_map(static fn(string $slug): string => $slug . '.svg', array_keys($families)));
        $colorSets = [];
        foreach (array_keys($families) as $slug) {
            $colorSets[$slug] = ['green-farm', 'daily-fresh'];
        }
        $categoryTitles = [
            'vegetables' => 'Овощи и зелень', 'fruits' => 'Фрукты и ягоды', 'dairy' => 'Молочные продукты',
            'bakery' => 'Хлеб и выпечка', 'meat' => 'Мясо и птица', 'fish' => 'Рыба и морепродукты',
            'grocery' => 'Бакалея', 'drinks' => 'Напитки', 'sweets' => 'Сладости',
            'frozen' => 'Замороженные продукты',
        ];

        $globalOrdering = 100;
        $familyNumber = 1;
        foreach ($families as $categorySlug => $categoryFamilies) {
            $categoryId = $this->categoryIds[$categorySlug];
            foreach ($categoryFamilies as $familyIndex => [$familyName, $basePrice, $description]) {
                $familySlug = $this->slug($familyName);
                // Cyrillic titles may transliterate to an empty slug on lean
                // PHP images. The stable family number guarantees unique SEF
                // routes and unique generated media paths in every runtime.
                $metaAlias = self::PREFIX . $categorySlug . '-' . sprintf('%03d', $familyNumber)
                    . ($familySlug !== '' ? '-' . $familySlug : '');
                $variantIds = [];
                $metaProducts = [];
                $metaStock = 0;
                $prices = [];
                $metaFields = [];
                $metaStockRows = [];
                $variantNumber = 0;
                $familyImage = 'images/food-market/' . $images[$categorySlug];

                foreach ($colorSets[$categorySlug] as $colorIndex => $color) {
                    foreach (['small', 'family'] as $sizeIndex => $size) {
                        foreach (['eco', 'classic'] as $editionIndex => $edition) {
                            $variantNumber++;
                            $price = $basePrice
                                + ($colorIndex * 900)
                                + ($sizeIndex * (int) round($basePrice * 0.08 / 100) * 100)
                                + ($editionIndex * (int) round($basePrice * 0.18 / 100) * 100);
                            $stock = (($familyNumber * 11 + $variantNumber * 7) % 31) + 2;
                            $title = sprintf(
                                '%s — %s, %s, %s',
                                $familyName,
                                $this->optionLabel('food-brand', $color),
                                $this->optionLabel('food-weight', $size),
                                $this->optionLabel('food-pack', $edition)
                            );
                            $alias = $metaAlias . '-' . $color . '-' . $size . '-' . $edition;
                            $fields = [
                                'food-brand' => $color,
                                'food-weight' => $size,
                                'food-pack' => $edition,
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
                                'code' => sprintf('FOOD-%03d-%02d', $familyNumber, $variantNumber),
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
                                'fulltext' => "{$description} Выберите бренд, фасовку и тип упаковки.",
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
                                        ['type' => 'image', 'src' => 'images/food-market/' . $images[$categorySlug], 'alt' => $familyName . ' — обзор'],
                                    ],
                                ]),
                                'params' => $this->json($this->productParams()),
                                'changelogs' => '{}',
                                'plugins' => '{}',
                                'language' => '*',
                            ]);

                            $variantIds[] = $productId;
                            $indexedFields = $fields + [
                                'com_radicalmart_state' => 1,
                                'com_radicalmart_in_stock' => 1,
                            ];
                            $metaProducts['p' . $productId] = [
                                'id' => $productId,
                                'priority' => 9 - $variantNumber,
                                'alias' => $alias,
                                'title' => $title,
                                'category' => $categoryId,
                                'category_state' => 1,
                                'fields' => $indexedFields,
                                'in_stock' => 1,
                                'state' => 1,
                                'published' => 1,
                                'prices' => $priceData,
                            ];
                            $metaFields['p' . $productId] = $indexedFields;
                            $metaStockRows['p' . $productId] = $stockData;
                            $metaStock += $stock;
                            $prices[] = $finalPrice;
                        }
                    }
                }

                $metaPriceData = ['rub' => ['currency' => 'RUB', 'min' => min($prices), 'max' => max($prices)]];
                $metaId = $this->insert('joom_radicalmart_metas', [
                    'title' => $familyName,
                    'alias' => $metaAlias,
                    'code' => sprintf('FOOD-FAMILY-%03d', $familyNumber),
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
                    'prices' => $this->json($metaPriceData),
                    'stock' => $this->json($metaStockRows),
                    'in_stock' => 1,
                    'fields' => $this->json($metaFields),
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
                $this->indexMeta(
                    $metaId,
                    $categoryId,
                    $familyName,
                    $description,
                    $metaPriceData,
                    $metaStockRows,
                    $metaFields,
                    $globalOrdering++,
                    min($prices)
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

            for ($simpleIndex = 1; $simpleIndex <= 40; $simpleIndex++) {
                $title = sprintf('%s · товар дня %02d', $categoryTitles[$categorySlug], $simpleIndex);
                $price = 79 + (array_search($categorySlug, array_keys($families), true) * 43) + $simpleIndex * 19;
                $stock = 7 + $simpleIndex * 4;
                $image = 'images/food-market/' . $images[$categorySlug];
                $simpleDiscount = $simpleIndex === 4 ? max(10, (int) round($price * 0.1 / 10) * 10) : 0;
                $simpleDiscount = min($simpleDiscount, max(0, $price - 1));
                $priceData = $this->price($price, $simpleDiscount);
                $fields = $this->specificationValues($categorySlug, $familyNumber + $simpleIndex, 'family', 'eco');
                $productId = $this->insert('joom_radicalmart_products', [
                    'title' => $title,
                    'alias' => self::PREFIX . $categorySlug . '-select-' . $simpleIndex,
                    'code' => sprintf('FOOD-%s-S%02d', strtoupper(substr($categorySlug, 0, 3)), $simpleIndex),
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
                    'introtext' => 'Популярный продукт на каждый день без вариативности.',
                    'fulltext' => 'Свежий продукт с понятным составом, фасовкой и быстрой доставкой.',
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
                    'Популярный продукт на каждый день без вариативности.',
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
                'totals' => $this->json(['items' => 80, 'products' => 360, 'metas' => 40]),
            ], 'id = ?', [$categoryId]);
        }
        $this->update('joom_radicalmart_categories', [
            'totals' => $this->json(['items' => 800, 'products' => 3600, 'metas' => 400]),
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
        $filterPrices = array_map(static fn(array $price): array => [
            'min' => (int) ($price['final'] ?? 0),
            'max' => (int) ($price['base'] ?? $price['final'] ?? 0),
        ], $prices);

        foreach ([1, 5, $categoryId] as $indexedCategoryId) {
            $this->insert('joom_radicalmart_categories_items', [
                'item_id' => $productId,
                'category_id' => $indexedCategoryId,
                'type' => 'product',
                'in_stock' => 1,
                'state' => 1,
                'language' => '*',
                'filter_categories' => $categories,
                'filter_prices' => $this->json($filterPrices),
                'filter_fields' => $this->json(['p' . $productId => $filterFields]),
                'filter_stock' => $this->json(['p' . $productId => $stock]),
                'filter_text' => mb_strtolower("{$title} {$description}"),
                'ordering' => $ordering,
                'ordering_title' => mb_substr(mb_strtolower($title), 0, 40),
                'ordering_price' => $finalPrice,
                'ordering_rating' => 0,
                'ordering_date' => time() - $ordering,
            ]);
        }
    }

    private function refreshCategoryPrices(): void
    {
        $rows = $this->db->query(
            "SELECT category_id,
                    MIN(CAST(JSON_UNQUOTE(JSON_EXTRACT(filter_prices, '$.rub.min')) AS DECIMAL(20, 4))) AS min_price,
                    MAX(CAST(JSON_UNQUOTE(JSON_EXTRACT(filter_prices, '$.rub.max')) AS DECIMAL(20, 4))) AS max_price
             FROM joom_radicalmart_categories_items
             WHERE state = 1
               AND JSON_EXTRACT(filter_prices, '$.rub.min') IS NOT NULL
               AND JSON_EXTRACT(filter_prices, '$.rub.max') IS NOT NULL
             GROUP BY category_id"
        )->fetchAll();

        foreach ($rows as $row) {
            $minimum = (float) $row['min_price'];
            $maximum = (float) $row['max_price'];
            if ($minimum <= 0 || $maximum <= 0) {
                continue;
            }
            $this->update('joom_radicalmart_categories', [
                'prices' => $this->json(['rub' => [
                    'currency' => 'RUB',
                    'min' => $minimum,
                    'max' => $maximum,
                ]]),
            ], 'id = ?', [(int) $row['category_id']]);
        }
    }

    private function indexMeta(
        int $metaId,
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

        foreach ([1, 5, $categoryId] as $indexedCategoryId) {
            $this->insert('joom_radicalmart_categories_items', [
                'item_id' => $metaId * -1,
                'category_id' => $indexedCategoryId,
                'type' => 'meta',
                'in_stock' => 1,
                'state' => 1,
                'language' => '*',
                'filter_categories' => $categories,
                'filter_prices' => $this->json($prices),
                'filter_fields' => $this->json($fields),
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
            ['food-market']
        ) ?: 0);
        $layout = $this->buildLayout();
        $fulltext = '<!-- ' . $this->json($layout) . ' -->';
        $intro = '<p>Продуктовый интернет-магазин: 3600 SKU, 400 метатоваров и 10 категорий.</p>';
        $data = [
            'title' => 'Зелёная лавка · продукты с доставкой',
            'alias' => 'food-market',
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
            'metadesc' => 'Свежие продукты, фермерские товары и доставка из Зелёной лавки',
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

    private function ensureFilterModule(): void
    {
        $menuItem = (int) ($this->value("SELECT id FROM joom_menu WHERE alias = 'food-market' AND client_id = 0 LIMIT 1") ?: 0);
        foreach (['Фильтр продуктов', 'Фильтр продуктов — мобильный'] as $index => $title) {
            $id = (int) ($this->value(
                "SELECT id FROM joom_modules WHERE module = 'mod_radicalmart_filter' AND title = ?",
                [$title]
            ) ?: 0);
            $data = [
                'title' => $title,
                'note' => 'Generated by food store seeder',
                'content' => '', 'ordering' => $index + 1, 'position' => '',
                'checked_out' => null, 'checked_out_time' => null,
                'publish_up' => null, 'publish_down' => null, 'published' => 1,
                'module' => 'mod_radicalmart_filter', 'access' => 1, 'showtitle' => 1,
                'params' => $this->json([
                    'category' => 5, 'menu_item' => $menuItem, 'ajax' => 1,
                    'ajax_auto_submit' => 1, 'layout' => '_:default',
                    'moduleclass_sfx' => '', 'cache' => 0,
                ]),
                'client_id' => 0, 'language' => '*',
            ];
            if ($id) {
                $this->update('joom_modules', $data, 'id = ?', [$id]);
            } else {
                $data['asset_id'] = 0;
                $id = $this->insert('joom_modules', $data);
            }
            $this->query('DELETE FROM joom_modules_menu WHERE moduleid = ?', [$id]);
            $this->insert('joom_modules_menu', ['moduleid' => $id, 'menuid' => 0]);
            if ($index === 0) {
                $this->filterModuleId = $id;
            } else {
                $this->filterMobileModuleId = $id;
            }
        }
    }

    private function buildLayout(): array
    {
        $categoryCards = [];
        $slides = [];
        foreach ($this->categoryIds as $slug => $id) {
            $title = [
                'vegetables' => 'Овощи и зелень', 'fruits' => 'Фрукты и ягоды', 'dairy' => 'Молочные продукты',
                'bakery' => 'Хлеб и выпечка', 'meat' => 'Мясо и птица', 'fish' => 'Рыба и морепродукты',
                'grocery' => 'Бакалея', 'drinks' => 'Напитки', 'sweets' => 'Сладости', 'frozen' => 'Замороженные продукты',
            ][$slug];
            $image = 'images/food-market/' . $slug . '.svg';
            $categoryCards[] = [
                'type' => 'rmgrid_item',
                'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'name' => $title],
                'children' => [
                    ['type' => 'image', 'props' => ['image' => $image, 'image_alt' => $title, 'image_border' => 'rounded']],
                    ['type' => 'headline', 'props' => ['content' => $title, 'title_element' => 'h3', 'title_style' => 'h4', 'margin_top' => 'small']],
                    ['type' => 'text', 'props' => ['content' => '40 метатоваров · 360 SKU', 'text_style' => 'meta', 'margin_top' => 'small']],
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
                                ['type' => 'text', 'props' => ['content' => 'НАТУРАЛЬНО · СВЕЖО · С ДОСТАВКОЙ', 'text_style' => 'meta']],
                                ['type' => 'headline', 'props' => ['content' => 'Продукты, которым можно доверять', 'title_element' => 'h1', 'title_style' => 'hero']],
                                ['type' => 'text', 'props' => ['content' => '3600 товаров · 400 семейств вариантов · 10 категорий · полностью динамический Builder', 'text_style' => 'lead', 'margin_top' => 'small']],
                                $this->button('Перейти в каталог', '#catalog-products', 'secondary', 'large'),
                            ],
                        ], ['type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
                            ['type' => 'image', 'props' => ['image' => 'images/food-market/hero.svg', 'image_alt' => 'Свежие продукты', 'image_border' => 'rounded']],
                        ]]],
                    ]],
                ],
                $this->section('Навигация по каталогу', [
                    ['type' => 'module', 'props' => ['module' => (string) $this->filterModuleId, 'style' => 'card-default', 'showtitle' => true, 'title_style' => 'h4', 'class' => 'food-market-filter']],
                    ['type' => 'rmordering', 'props' => ['ordering_width' => 'medium']],
                    ['type' => 'rmlayoutswitcher', 'props' => ['show_grid_button' => true, 'show_compact_button' => true, 'show_list_button' => true, 'show_table_button' => true, 'switcher_breakpoint' => 's']],
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
                                ['type' => 'text', 'props' => ['content' => 'Овощи и зелень<br>Фрукты и ягоды<br>Молочные продукты<br>Хлеб и выпечка<br>Мясо и птица<br>Рыба и морепродукты<br>Бакалея<br>Напитки<br>Сладости<br>Замороженные продукты']],
                            ]],
                        ]],
                    ]],
                ], 'default', 'small'),
                $this->section('Категории магазина', [[
                    'type' => 'rmgrid',
                    'props' => ['mode' => 'default', 'grid_column_gap' => 'small', 'grid_row_gap' => 'small', 'grid_default' => '1', 'grid_small' => '2', 'grid_medium' => '3', 'grid_large' => '3'],
                    'children' => $categoryCards,
                ]], 'muted', 'default'),
                $this->section('Витрина категорий', [[
                    'type' => 'rmslideshow',
                    'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'gallery_orientation' => 'horizontal', 'slideshow_autoplay' => true, 'slideshow_autoplay_interval' => 5, 'nav' => 'thumbnav', 'thumbnav_position' => 'bottom', 'thumbnav_orientation' => 'horizontal', 'nav_arrows' => true, 'slidenav' => 'default', 'lightbox' => true, 'lightbox_controls' => true],
                    'children' => $slides,
                ]], 'default', 'default'),
                $this->section('Карточки с вариативностью', [
                    ['type' => 'rmbulkactions', 'props' => ['count_label' => 'Выбрано:', 'cart_label' => 'Добавить выбранное', 'clear_label' => 'Снять выбор', 'button_style' => 'primary', 'button_size' => 'small', 'show_clear' => true, 'margin_bottom' => 'medium']],
                    [
                        'type' => 'rmgrid',
                        'props' => ['id' => 'catalog-products', 'mode' => 'radicalmart_tile', 'grid_column_gap' => 'medium', 'grid_row_gap' => 'medium', 'grid_default' => '1', 'grid_small' => '2', 'grid_large' => '3', 'filter' => false],
                        'children' => $productCards,
                    ],
                    [
                        'type' => 'rmgrid',
                        'props' => ['mode' => 'radicalmart_compact', 'grid_column_gap' => 'small', 'grid_row_gap' => 'small', 'grid_default' => '1', 'grid_small' => '2', 'grid_medium' => '3', 'grid_large' => '4', 'filter' => false],
                        'children' => $productCards,
                    ],
                    [
                        'type' => 'rmgrid',
                        'props' => ['mode' => 'radicalmart_list', 'grid_column_gap' => 'small', 'grid_row_gap' => 'medium', 'grid_default' => '1', 'grid_small' => '1', 'grid_medium' => '1', 'grid_large' => '1', 'filter' => false],
                        'children' => $productCards,
                    ],
                    [
                        'type' => 'rmtable',
                        'props' => ['mode' => 'radicalmart_price', 'caption' => 'Товары и цены', 'caption_style' => 'lead', 'table_style' => 'divider', 'table_hover' => true, 'container_style' => 'default', 'container_size' => 'small', 'container_border' => true, 'container_radius' => true, 'container_shadow' => 'small', 'responsive_mode' => 'cards', 'responsive_breakpoint' => 'm', 'mobile_card_gap' => 'small', 'mobile_card_padding' => 'small', 'sticky_first' => true],
                        'children' => $tableRows,
                    ],
                ], 'muted', 'default'),
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
                        ['type' => 'rmproductselect', 'props' => ['product_id' => $item['product_id'], 'label' => 'Выбрать', 'show_title' => false]],
                        ['type' => 'rmproductbadges', 'props' => ['product_id' => $item['product_id'], 'show_icons' => true, 'show_titles' => false, 'direction' => 'horizontal', 'limit' => 3]],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'image', 'image_ratio' => '4/3', 'image_fit' => 'cover', 'image_border' => 'rounded']],
                        ['type' => 'text', 'props' => ['content' => $item['category'], 'text_style' => 'meta', 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'title', 'title_element' => 'h3', 'title_style' => 'h4', 'margin_top' => 'small']],
                        ['type' => 'rmproductrating', 'props' => ['product_id' => $item['product_id'], 'show_value' => true, 'show_count' => true, 'show_empty' => true, 'size' => 16, 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['product_id' => $item['product_id'], 'field' => 'price', 'text_style' => 'lead', 'margin_top' => 'small']],
                        ['type' => 'rmproductunit', 'props' => ['product_id' => $item['product_id'], 'show_price' => false, 'unit_style' => 'short', 'margin_top' => 'small']],
                        ['type' => 'rmproductstock', 'props' => ['product_id' => $item['product_id'], 'show_quantity' => false, 'show_progress' => false, 'text_style' => 'small', 'margin_top' => 'small']],
                    ]],
                    ['type' => 'rmproductcard_dropdown', 'props' => ['display_mode' => 'hover', 'hover_breakpoint' => 'm', 'panel_style' => 'default', 'panel_padding' => 'small'], 'children' => [
                        ['type' => 'rmvariantselector', 'props' => ['product_id' => $item['product_id'], 'variant_fields' => ['food-brand', 'food-weight', 'food-pack'], 'style' => 'buttons', 'action' => 'ajax', 'show_labels' => true, 'show_selected_value' => true, 'disable_unavailable' => true, 'update_url' => false]],
                        ['type' => 'rmbuy', 'props' => ['product_id' => $item['product_id'], 'label' => 'В корзину', 'button_style' => 'primary', 'button_size' => 'small', 'show_count' => false, 'fullwidth' => true]],
                        ['type' => 'rmproductaction', 'props' => ['product_id' => $item['product_id'], 'action' => 'favorite', 'favorite_label' => 'В избранное', 'button_style' => 'text', 'icon_only' => false]],
                        ['type' => 'rmproductaction', 'props' => ['product_id' => $item['product_id'], 'action' => 'compare', 'compare_label' => 'Сравнить', 'button_style' => 'text', 'icon_only' => false]],
                        ['type' => 'rmproductbonus', 'props' => ['product_id' => $item['product_id'], 'label' => 'Бонусов за покупку', 'text_style' => 'small']],
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
        $menuId = (int) ($this->value('SELECT id FROM joom_menu WHERE alias = ?', ['food-market']) ?: 0);
        $componentId = (int) $this->value("SELECT extension_id FROM joom_extensions WHERE element = 'com_radicalmart' AND type = 'component'");
        $data = [
            'menutype' => 'mainmenu',
            'title' => 'МАГАЗИН',
            'alias' => 'food-market',
            'note' => 'Generated food store',
            'path' => 'food-market',
            'link' => 'index.php?option=com_radicalmart&view=category&id=5',
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
        } else {
            $right = (int) $this->value("SELECT MAX(rgt) FROM joom_menu WHERE menutype = 'mainmenu'");
            $data['lft'] = $right + 1;
            $data['rgt'] = $right + 2;
            $this->insert('joom_menu', $data);
        }

        $this->ensureShowcaseMenuItem($articleId);
    }

    private function ensureShowcaseMenuItem(int $articleId): void
    {
        $alias = 'food-market-elements';
        $menuId = (int) ($this->value('SELECT id FROM joom_menu WHERE alias = ? AND client_id = 0', [$alias]) ?: 0);
        $componentId = (int) $this->value("SELECT extension_id FROM joom_extensions WHERE element = 'com_content' AND type = 'component'");
        $data = [
            'menutype' => 'mainmenu', 'title' => 'Компоненты магазина', 'alias' => $alias,
            'note' => 'Generated food store element showcase', 'path' => $alias,
            'link' => 'index.php?option=com_content&view=article&id=' . $articleId,
            'type' => 'component', 'published' => 1, 'parent_id' => 1, 'level' => 1,
            'component_id' => $componentId, 'checked_out' => null, 'checked_out_time' => null,
            'browserNav' => 0, 'access' => 1, 'img' => '', 'template_style_id' => 0,
            'params' => $this->json(['menu_show' => 0]), 'home' => 0, 'language' => '*',
            'client_id' => 0, 'publish_up' => null, 'publish_down' => null,
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
            'style' => 'craft:light-beige',
            'logo' => ['text' => 'ЗЕЛЁНАЯ ЛАВКА'],
            'site' => ['layout' => 'full'],
            'header' => ['layout' => 'horizontal-right', 'width' => 'expand'],
            'navbar' => ['sticky' => 1],
            'mobile' => [
                'breakpoint' => 'm',
                'header' => ['layout' => 'horizontal-right'],
                'navbar' => ['sticky' => 1],
                'dialog' => ['layout' => 'offcanvas-top', 'offcanvas' => ['mode' => 'slide', 'flip' => true]],
            ],
            'footer' => ['content' => 'ЗЕЛЁНАЯ ЛАВКА · свежие продукты с доставкой'],
        ]);
        $params['config'] = $this->json($config);
        $this->query('UPDATE joom_template_styles SET params = ? WHERE id = 12', [$this->json($params)]);
    }

    private function configureSiteLanguage(): void
    {
        $hasRussian = (int) $this->value("SELECT COUNT(*) FROM joom_extensions WHERE type = 'language' AND element = 'ru-RU' AND client_id = 0") > 0;
        if (!$hasRussian) {
            return;
        }
        $params = json_decode((string) $this->value(
            "SELECT params FROM joom_extensions WHERE element = 'com_languages' AND type = 'component'"
        ), true) ?: [];
        $params['site'] = 'ru-RU';
        $this->query(
            "UPDATE joom_extensions SET params = ? WHERE element = 'com_languages' AND type = 'component'",
            [$this->json($params)]
        );
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
            'name' => 'Food Market — Dynamic Product',
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

    private function ensureCategoryTemplate(): void
    {
        $customData = json_decode((string) $this->value(
            "SELECT custom_data FROM joom_extensions WHERE element = 'yootheme' AND folder = 'system'"
        ), true) ?: [];
        $templates = (array) ($customData['templates'] ?? []);
        foreach ($templates as $id => $template) {
            if (($template['type'] ?? '') === 'com_radicalmart.category') {
                unset($templates[$id]);
            }
        }
        $templates = ['FOODCATALOG' => [
            'type' => 'com_radicalmart.category',
            'name' => 'Food Market — Dynamic Catalogue',
            'query' => ['catid' => [5], 'include_child_categories' => '1', 'pages' => '', 'product_list_view' => ''],
            'layout' => $this->categoryTemplateLayout(),
        ]] + $templates;
        $customData['templates'] = $templates;
        $this->query(
            "UPDATE joom_extensions SET custom_data = ? WHERE element = 'yootheme' AND folder = 'system'",
            [$this->json($customData)]
        );
    }

    private function categoryTemplateLayout(): array
    {
        $categoryButtons = [];
        foreach ([
            'vegetables' => 'Овощи', 'fruits' => 'Фрукты', 'dairy' => 'Молочное', 'bakery' => 'Выпечка',
            'meat' => 'Мясо', 'fish' => 'Рыба', 'grocery' => 'Бакалея', 'drinks' => 'Напитки',
            'sweets' => 'Сладости', 'frozen' => 'Заморозка',
        ] as $slug => $label) {
            $categoryButtons[] = [
                'type' => 'button_item',
                'props' => ['content' => $label, 'link' => '/index.php/food-market/food-' . $slug, 'button_style' => 'default'],
            ];
        }
        $dynamicCard = [
            'type' => 'rmgrid_item',
            'props' => ['panel_style' => '', 'name' => 'Продукт', 'source' => ['query' => ['name' => 'radicalMartProducts']]],
            'children' => [[
                'type' => 'rmproductcard',
                'props' => ['panel_style' => 'card-default', 'panel_padding' => 'small', 'panel_hover' => true],
                'children' => [
                    ['type' => 'rmproductcard_main', 'props' => [], 'children' => [
                        ['type' => 'rmproductselect', 'props' => ['label' => 'Выбрать', 'show_title' => false]],
                        ['type' => 'rmproductbadges', 'props' => ['show_icons' => true, 'show_titles' => false, 'limit' => 3]],
                        ['type' => 'rmproductfield', 'props' => ['field' => 'image', 'image_ratio' => '4/3', 'image_fit' => 'cover', 'image_border' => 'rounded']],
                        ['type' => 'rmproductfield', 'props' => ['field' => 'title', 'title_element' => 'h2', 'title_style' => 'h4', 'margin_top' => 'small']],
                        ['type' => 'rmproductrating', 'props' => ['show_value' => true, 'show_count' => true, 'show_empty' => false, 'size' => 16, 'margin_top' => 'small']],
                        ['type' => 'rmproductfield', 'props' => ['field' => 'price', 'text_style' => 'lead', 'show_base_price' => true, 'show_discount' => true, 'margin_top' => 'small']],
                        ['type' => 'rmproductunit', 'props' => ['show_price' => false, 'unit_style' => 'short', 'margin_top' => 'small']],
                        ['type' => 'rmproductstock', 'props' => ['show_quantity' => false, 'show_progress' => false, 'in_stock_label' => 'В наличии', 'out_of_stock_label' => 'Нет в наличии', 'text_style' => 'small', 'margin_top' => 'small']],
                    ]],
                    ['type' => 'rmproductcard_dropdown', 'props' => ['display_mode' => 'hover', 'hover_breakpoint' => 'm', 'panel_style' => 'default', 'panel_padding' => 'small', 'show_divider' => true], 'children' => [
                        ['type' => 'rmvariantselector', 'props' => ['variant_fields' => ['food-brand', 'food-weight', 'food-pack'], 'style' => 'buttons', 'action' => 'ajax', 'show_labels' => true, 'show_selected_value' => true, 'disable_unavailable' => true, 'update_url' => false]],
                        ['type' => 'rmbuy', 'props' => ['label' => 'В корзину', 'button_style' => 'primary', 'button_size' => 'small', 'show_count' => false, 'fullwidth' => true]],
                        ['type' => 'rmproductaction', 'props' => ['action' => 'favorite', 'favorite_label' => 'В избранное', 'button_style' => 'text', 'icon_only' => false]],
                        ['type' => 'rmproductaction', 'props' => ['action' => 'compare', 'compare_label' => 'Сравнить', 'button_style' => 'text', 'icon_only' => false]],
                        ['type' => 'rmproductbonus', 'props' => ['label' => 'Бонусов за покупку', 'text_style' => 'small']],
                        ['type' => 'rmquickview', 'props' => ['label' => 'Быстрый просмотр', 'button_style' => 'text', 'button_size' => 'small', 'modal_size' => 'container', 'fullwidth' => true]],
                    ]],
                ],
            ]],
        ];
        return [
            'type' => 'layout',
            'children' => [[
                'type' => 'section',
                'props' => ['style' => 'default', 'padding' => 'default', 'width' => 'expand'],
                'children' => [
                    [
                        'type' => 'row',
                        'props' => [],
                        'children' => [[
                            'type' => 'column',
                            'props' => ['width_medium' => '1-1'],
                            'children' => [
                                ['type' => 'text', 'props' => ['content' => 'ЗЕЛЁНАЯ ЛАВКА · КАТАЛОГ', 'text_style' => 'meta']],
                                ['type' => 'headline', 'props' => ['content' => 'Свежие продукты', 'title_element' => 'h1', 'title_style' => 'heading-small', 'margin_top' => 'small']],
                                ['type' => 'text', 'props' => ['content' => 'Выбирайте варианты по бренду, фасовке и упаковке. Фильтры и сортировка работают с данными RadicalMart.', 'text_style' => 'lead', 'margin_top' => 'small']],
                            ],
                        ]],
                    ],
                    [
                        'type' => 'row',
                        'props' => ['margin_top' => 'medium'],
                        'children' => [[
                            'type' => 'column',
                            'props' => ['width_medium' => '1-1'],
                            'children' => [[
                                'type' => 'button',
                                'props' => ['button_size' => 'small', 'class' => 'food-market-categories'],
                                'children' => $categoryButtons,
                            ]],
                        ]],
                    ],
                    [
                        'type' => 'row',
                        'props' => ['column_gap' => 'medium', 'row_gap' => 'medium', 'margin_top' => 'large'],
                        'children' => [
                            ['type' => 'column', 'props' => ['width_medium' => '1-4'], 'children' => [
                                ['type' => 'module', 'props' => ['module' => (string) $this->filterModuleId, 'style' => 'card-default', 'showtitle' => true, 'title_style' => 'h4', 'class' => 'food-market-filter-desktop uk-visible@m']],
                                ['type' => 'rmoffcanvas', 'props' => ['label' => 'Фильтры', 'icon' => 'settings', 'button_style' => 'secondary', 'fullwidth' => true, 'mode' => 'slide', 'side' => 'left', 'panel_width' => 'medium', 'panel_padding' => 'small', 'overlay' => true, 'show_close' => true, 'class' => 'uk-hidden@m'], 'children' => [
                                    ['type' => 'headline', 'props' => ['content' => 'Фильтр продуктов', 'title_element' => 'h2', 'title_style' => 'h4', 'margin_bottom' => 'small']],
                                    ['type' => 'module', 'props' => ['module' => (string) $this->filterMobileModuleId, 'style' => '', 'showtitle' => false]],
                                ]],
                            ]],
                            ['type' => 'column', 'props' => ['width_medium' => '3-4'], 'children' => [
                                ['type' => 'row', 'props' => ['column_gap' => 'small', 'row_gap' => 'small'], 'children' => [
                                    ['type' => 'column', 'props' => ['width' => 'expand'], 'children' => [
                                        ['type' => 'rmordering', 'props' => ['ordering_width' => 'full']],
                                    ]],
                                    ['type' => 'column', 'props' => ['width' => 'auto'], 'children' => [
                                        ['type' => 'rmlayoutswitcher', 'props' => ['show_grid_button' => true, 'show_compact_button' => true, 'show_list_button' => true, 'show_table_button' => false]],
                                    ]],
                                ]],
                                ['type' => 'rmsearch', 'props' => ['placeholder' => 'Найти продукт', 'aria_label' => 'Поиск по каталогу', 'search_style' => 'large', 'search_icon' => 'right', 'margin_top' => 'small', 'class' => 'food-market-search']],
                                ['type' => 'rmbulkactions', 'props' => ['count_label' => 'Выбрано:', 'cart_label' => 'В корзину', 'clear_label' => 'Очистить', 'button_style' => 'primary', 'show_clear' => true, 'margin_top' => 'small']],
                                ['type' => 'rmgrid', 'props' => ['mode' => 'default', 'grid_column_gap' => 'medium', 'grid_row_gap' => 'medium', 'grid_default' => '1', 'grid_small' => '1', 'grid_large' => '1', 'margin_top' => 'medium'], 'children' => [$dynamicCard]],
                                ['type' => 'rmlazypagination', 'props' => ['button_label' => 'Загрузить ещё', 'loading_label' => 'Загрузка…', 'complete_label' => 'Все товары загружены', 'auto_after_click' => true, 'show_pages' => true, 'update_url' => false, 'preload_distance' => 500, 'button_style' => 'default', 'button_size' => 'large', 'margin_top' => 'large']],
                            ]],
                        ],
                    ],
                ],
            ]],
            'version' => '5.0.42',
        ];
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
											'sync_product_media' => true,
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
										'children' => [[
											'type' => 'rmslideshow_item',
											'props' => ['name' => 'Медиа товара'],
											'source' => [
												'query' => ['name' => '#parent', 'field' => ['name' => 'media']],
												'props' => [
													'image' => ['name' => 'src'],
													'image_alt' => ['name' => 'alt'],
												],
											],
										]],
                                    ]],
                                ],
                                [
                                    'type' => 'column',
                                    'props' => ['width_medium' => '2-5'],
                                    'children' => [
                                        ['type' => 'rmproductbadges', 'props' => ['show_icons' => true, 'show_titles' => true, 'direction' => 'horizontal']],
                                        ['type' => 'text', 'props' => ['content' => 'ЗЕЛЁНАЯ ЛАВКА · СВЕЖИЙ ПРОДУКТ', 'text_style' => 'meta', 'margin_top' => 'small']],
                                        ['type' => 'rmproductrating', 'props' => ['show_value' => true, 'show_count' => true, 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'title', 'title_element' => 'h1', 'title_style' => 'h1', 'link_product' => false, 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'code', 'text_style' => 'meta', 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'price', 'text_style' => 'large', 'show_base_price' => true, 'show_discount' => true, 'margin_top' => 'default']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'availability', 'margin_top' => 'small']],
                                        ['type' => 'rmproductstock', 'props' => ['show_quantity' => true, 'show_progress' => true, 'progress_threshold' => 30, 'margin_top' => 'small']],
                                        ['type' => 'rmproductunit', 'props' => ['show_price' => true, 'unit_style' => 'long', 'margin_top' => 'small']],
                                        ['type' => 'rmproductfield', 'props' => ['field' => 'description', 'text_style' => 'lead', 'margin_top' => 'default']],
                                        ['type' => 'rmvariantselector', 'props' => ['style' => 'buttons', 'action' => 'ajax', 'button_style' => 'default', 'image_fit' => 'contain', 'show_labels' => true, 'show_selected_value' => true, 'disable_unavailable' => true, 'update_url' => 'replace', 'margin_top' => 'default']],
                                        ['type' => 'rmbuy', 'props' => ['show_count' => true, 'button_style' => 'primary', 'button_size' => 'large', 'mobile_stack' => true, 'fullwidth' => true, 'margin_top' => 'default']],
                                        ['type' => 'rmproductaction', 'props' => ['action' => 'favorite', 'favorite_label' => 'В избранное', 'button_style' => 'text', 'icon_only' => false, 'margin_top' => 'small']],
                                        ['type' => 'rmproductbonus', 'props' => ['label' => 'Начислим бонусов', 'margin_top' => 'small']],
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
            'quantity_units' => 'уп.', 'stock_accounting' => '1',
            'seo_product_title' => '', 'seo_product_description' => '', 'seo_product_image' => '',
            'seo_product_robots' => '', 'seo_product_h1' => '', 'product_layout' => '',
        ];
    }

    private function specificationValues(string $category, int $family, string $size, string $edition): array
    {
        $origins = [
            'vegetables' => 'Краснодарский край', 'fruits' => 'Юг России', 'dairy' => 'Тверская область',
            'bakery' => 'Собственная пекарня', 'meat' => 'Белгородская область', 'fish' => 'Мурманская область',
            'grocery' => 'Россия и Средиземноморье', 'drinks' => 'Экологичные источники России',
            'sweets' => 'Собственное производство', 'frozen' => 'Россия',
        ];
        $compositions = [
            'vegetables' => '100% свежий продукт', 'fruits' => '100% свежий продукт',
            'dairy' => 'Натуральное молоко, закваска', 'bakery' => 'Мука, вода, закваска, соль',
            'meat' => '100% охлаждённое мясо', 'fish' => '100% рыба или морепродукты',
            'grocery' => 'Натуральные ингредиенты', 'drinks' => 'Без искусственных красителей',
            'sweets' => 'Натуральные ингредиенты', 'frozen' => 'Продукты шоковой заморозки',
        ];
        $cold = in_array($category, ['dairy', 'meat', 'fish', 'frozen'], true);
        $days = 3 + (($family * 7) % 27) + ($edition === 'classic' ? 4 : 0);

        return [
            'food-origin' => $origins[$category] ?? 'Россия',
            'food-composition' => $compositions[$category] ?? 'Натуральные ингредиенты',
            'food-storage' => $cold ? 'Хранить при температуре от 0 до +6 °C' : 'Хранить в сухом прохладном месте',
            'food-shelf-life' => $days . ' дней',
        ];
    }

    private function optionLabel(string $field, string $value): string
    {
        $labels = [
            'food-brand' => ['green-farm' => 'Green Farm', 'daily-fresh' => 'Daily Fresh', 'bio-village' => 'Bio Village', 'family-choice' => 'Family Choice'],
            'food-weight' => ['small' => 'малая фасовка', 'family' => 'семейная фасовка', 'large' => 'большая фасовка'],
            'food-pack' => ['eco' => 'эко-упаковка', 'classic' => 'классическая упаковка', 'gift' => 'подарочная упаковка'],
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
        $sourcePath = $root . '/images/food-market/' . $sourceName;
        $relativePath = 'images/food-market/variants/' . $alias . '.svg';
        $targetPath = $root . '/' . $relativePath;
        $source = @file_get_contents($sourcePath);
        if ($source === false) {
            return 'images/food-market/' . $sourceName;
        }

        $palette = [
            'green-farm' => '#4f8a45', 'daily-fresh' => '#e0a040',
            'bio-village' => '#397e6b', 'family-choice' => '#c96851',
        ];
        $accent = $palette[$color] ?? '#52606d';
        $colorLabel = mb_strtoupper($this->optionLabel('food-brand', $color));
        $sizeLabel = mb_strtoupper($this->optionLabel('food-weight', $size));
        $editionLabel = mb_strtoupper($this->optionLabel('food-pack', $edition));
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
            return 'images/food-market/' . $sourceName;
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
