<?php

declare(strict_types=1);

/**
 * Imports the local Aspro Premier reference catalogue into RadicalMart.
 *
 * The script owns only products whose aliases start with `premier-demo-` and
 * categories whose aliases start with `food-premier-`, so repeated runs do not
 * disturb the rest of the demo catalogue.
 */
final class PremierDemoProductSeeder
{
    private PDO $db;
    private string $now;
    private string $root;
    private array $categoryIds = [];

    public function __construct()
    {
        $host = getenv('JOOMLA_DB_HOST') ?: 'db';
        $name = getenv('JOOMLA_DB_NAME') ?: 'database';
        $user = getenv('JOOMLA_DB_USER') ?: 'joomla';
        $pass = getenv('JOOMLA_DB_PASSWORD') ?: '';
        $this->db = new PDO("mysql:host={$host};dbname={$name};charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $this->now = gmdate('Y-m-d H:i:s');
        $this->root = $this->siteRoot();
    }

    public function run(): void
    {
        $cataloguePath = $this->root . '/images/premier-demo/catalog.json';
        $catalogue = json_decode((string) file_get_contents($cataloguePath), true, 512, JSON_THROW_ON_ERROR);
        $this->validateAssets($catalogue);

        $this->db->beginTransaction();
        try {
            $this->removeOwnedProducts();
            $this->ensureCategories((array) ($catalogue['categories'] ?? []));
			$fieldDefinitions = $this->ensureFields($catalogue);
			$ids = $this->createProducts((array) ($catalogue['products'] ?? []), $fieldDefinitions);
			$this->refreshCategoryPrices();
            $this->db->commit();
        } catch (Throwable $error) {
            $this->db->rollBack();
            throw $error;
        }

        echo json_encode([
            'status' => 'ok',
            'products' => count($ids),
            'ids' => $ids,
            'catalogue' => '/index.php/food-market',
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    }

    private function validateAssets(array $catalogue): void
    {
        foreach ((array) ($catalogue['products'] ?? []) as $product) {
            foreach ((array) ($product['images'] ?? []) as $image) {
                $path = $this->root . '/images/premier-demo/' . ltrim((string) $image, '/');
                if (!is_file($path)) {
                    throw new RuntimeException('Missing Premier demo image: ' . $path);
                }
            }
        }
    }

    private function removeOwnedProducts(): void
    {
        $ids = $this->column("SELECT id FROM joom_radicalmart_products WHERE alias LIKE 'premier-demo-%'");
        if (!$ids) {
            return;
        }
        $marks = implode(',', array_fill(0, count($ids), '?'));
        $this->query("DELETE FROM joom_radicalmart_categories_items WHERE item_id IN ({$marks})", $ids);
        $this->query("DELETE FROM joom_radicalmart_products WHERE id IN ({$marks})", $ids);
    }

    private function ensureCategories(array $categories): void
    {
        $parent = $this->row('SELECT id, path, level FROM joom_radicalmart_categories WHERE id = 5');
        if (!$parent) {
            throw new RuntimeException('RadicalMart catalogue category #5 is missing.');
        }

        foreach ($categories as $slug => $title) {
            $alias = 'food-premier-' . $slug;
            $data = [
                'parent_id' => 5,
                'level' => 2,
                'path' => trim((string) $parent['path'], '/') . '/' . $alias,
                'title' => (string) $title,
                'alias' => $alias,
                'type' => 'category',
                'introtext' => 'Категория демонстрационных товаров Аспро: Премьер.',
                'fulltext' => '',
                'search_text' => mb_strtolower((string) $title),
                'prices' => '{}',
                'media' => '{}',
                'fields' => '{}',
                'totals' => '{}',
                'state' => 1,
                'show' => 1,
                'params' => $this->json(['category_items_limit' => 24, 'category_items_ordering' => 'ordering']),
                'plugins' => '{}',
                'language' => '*',
            ];
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_categories WHERE alias = ?', [$alias]) ?: 0);
            if ($id > 0) {
                $this->update('joom_radicalmart_categories', $data, 'id = ?', [$id]);
            } else {
                $data['lft'] = 0;
                $data['rgt'] = 0;
                $id = $this->insert('joom_radicalmart_categories', $data);
            }
            $this->categoryIds[(string) $slug] = $id;
        }
    }

    private function ensureFields(array $catalogue): array
    {
        $fieldsetId = (int) ($this->value(
            'SELECT id FROM joom_radicalmart_fieldsets WHERE alias = ?',
            ['premier-characteristics']
        ) ?: 0);
        $fieldset = [
            'title' => 'Характеристики товаров Премьер',
            'alias' => 'premier-characteristics',
            'description' => 'Характеристики импортированных демонстрационных товаров',
            'params' => $this->json(['display_product_form_tab' => 'fields', 'display_product_form_full_width' => 0]),
            'ordering' => 30,
            'plugins' => '{}',
        ];
        if ($fieldsetId > 0) {
            $this->update('joom_radicalmart_fieldsets', $fieldset, 'id = ?', [$fieldsetId]);
        } else {
            $fieldsetId = $this->insert('joom_radicalmart_fieldsets', $fieldset);
        }

		$valuesByTitle = [];
		foreach ((array) ($catalogue['products'] ?? []) as $product) {
			foreach ((array) ($product['properties'] ?? []) as $title => $value) {
				$valuesByTitle[(string) $title][(string) $value] = true;
			}
		}

		$definitions = [];
		$categoryIds = implode(',', array_merge([5], array_values($this->categoryIds)));
		foreach ($valuesByTitle as $title => $uniqueValues) {
			$alias = 'premier-' . $this->propertyAlias($title);
			$type = $title === 'Вес, кг' ? 'number' : (in_array($title, [
				'Особенности', 'Страна производства', 'Срок годности', 'Тип', 'Аромат',
			], true) ? 'checkboxes' : 'text');
			$options = [];
			$valueKeys = [];
			if ($type === 'checkboxes') {
				foreach (array_keys($uniqueValues) as $optionOrdering => $value) {
					$key = 'v-' . substr(sha1($title . ':' . $value), 0, 12);
					$valueKeys[$value] = $key;
					$options[$key] = [
						'text' => $value,
						'value' => $key,
						'image' => '',
						'color' => '',
						'option_ordering' => $optionOrdering,
						'option_categories' => $categoryIds,
					];
				}
			}
			$data = [
                'title' => $title,
                'alias' => $alias,
                'area' => 'products',
                'all_categories' => 1,
                'plugin' => 'standard',
                'fieldset_administrator' => $fieldsetId,
                'fieldset_site' => $fieldsetId,
                'description' => 'Импортированная характеристика «' . $title . '»',
				'options' => $this->json($options),
                'note' => '',
                'state' => 1,
                'params' => $this->json([
					'type' => $type,
					'required' => 0,
					'multiple' => 0,
					'null_value' => 0,
					'display_products' => 1,
					'display_products_as' => 'string',
					'display_product' => 1,
					'display_product_as' => 'string',
					'display_filter' => $type === 'text' ? 0 : 1,
					'display_filter_as' => $type === 'checkboxes' ? 'checkboxes' : 'range',
					'display_filter_operator' => 'or',
					'display_variability' => 0,
				]),
				'ordering' => 70 + count($definitions),
                'plugins' => '{}',
                'language' => '*',
            ];
            $id = (int) ($this->value('SELECT id FROM joom_radicalmart_fields WHERE alias = ?', [$alias]) ?: 0);
            if ($id > 0) {
                $this->update('joom_radicalmart_fields', $data, 'id = ?', [$id]);
            } else {
                $this->insert('joom_radicalmart_fields', $data);
            }
			$definitions[$title] = ['alias' => $alias, 'type' => $type, 'values' => $valueKeys];
		}

		return $definitions;
	}

	private function createProducts(array $products, array $fieldDefinitions): array
    {
        $ids = [];
        foreach ($products as $index => $product) {
            $categoryId = $this->categoryIds[(string) $product['category']] ?? 0;
            if ($categoryId < 1) {
                throw new RuntimeException('Unknown Premier demo category: ' . (string) $product['category']);
            }

            $base = (int) ($product['base_price'] ?? $product['price']);
            $final = (int) $product['price'];
            $discount = max(0, $base - $final);
            $prices = $this->price($base, $discount);
            $stock = ['all' => 5 + (($index * 7) % 23)];
			$fields = [];
			foreach ((array) ($product['properties'] ?? []) as $title => $value) {
				if (isset($fieldDefinitions[$title])) {
					$definition = $fieldDefinitions[$title];
					$fieldValue = (string) $value;
					if ($definition['type'] === 'checkboxes') {
						$fieldValue = [(string) ($definition['values'][$fieldValue] ?? $fieldValue)];
					}
					$fields[$definition['alias']] = $fieldValue;
				}
            }

            $images = array_map(
                static fn(string $image): string => 'images/premier-demo/' . ltrim($image, '/'),
                (array) ($product['images'] ?? [])
            );
            $title = (string) $product['title'];
            $description = (string) ($product['description'] ?? '');
            $alias = 'premier-demo-' . (string) $product['alias'];
            $media = [
                'image' => (string) ($images[0] ?? ''),
                'gallery' => array_map(
                    static fn(string $image): array => ['type' => 'image', 'src' => $image, 'alt' => $title],
                    $images
                ),
            ];
            $plugins = [
                'rating' => [
                    'value' => (float) ($product['rating'] ?? 0),
                    'count' => (int) ($product['reviews'] ?? 0),
                ],
                'bonus' => [
                    'value' => round($final * 0.1, 2),
                    'text' => '+' . $this->number($final * 0.1) . ' на счет',
                ],
            ];

            $id = $this->insert('joom_radicalmart_products', [
                'title' => $title,
                'alias' => $alias,
                'code' => sprintf('PREMIER-%03d', $index + 1),
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
                'fulltext' => $description,
                'search_text' => mb_strtolower($title . ' ' . $description),
                'prices' => $this->json($prices),
                'stock' => $this->json($stock),
                'in_stock' => 1,
                'shipping' => '{}',
                'fields' => $this->json($fields),
                'state' => 1,
                'media' => $this->json($media),
                'params' => $this->json($this->productParams((string) ($product['unit'] ?? 'шт'))),
                'changelogs' => '{}',
                'plugins' => $this->json($plugins),
                'language' => '*',
            ]);
            $this->indexProduct($id, $categoryId, $title, $description, $prices, $stock, $fields, $index + 1, $final);
            $ids[$alias] = $id;
        }

        foreach ($this->categoryIds as $categoryId) {
            $count = (int) $this->value(
                "SELECT COUNT(*) FROM joom_radicalmart_categories_items WHERE category_id = ? AND type = 'product' AND item_id > 0",
                [$categoryId]
            );
            $this->update('joom_radicalmart_categories', ['totals' => $this->json(['items' => $count, 'products' => $count])], 'id = ?', [$categoryId]);
        }

        return $ids;
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
        $filterFields = $fields + ['com_radicalmart_state' => 1, 'com_radicalmart_in_stock' => 1];
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
                'filter_categories' => "1,5,{$categoryId}",
                'filter_prices' => $this->json($filterPrices),
                'filter_fields' => $this->json(['p' . $productId => $filterFields]),
                'filter_stock' => $this->json(['p' . $productId => $stock]),
                'filter_text' => mb_strtolower($title . ' ' . $description),
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

    private function price(int $base, int $discount): array
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

    private function productParams(string $unit): array
    {
        return [
            'quantity_min' => '1',
            'quantity_step' => '1',
            'quantity_max' => '',
            'quantity_units' => $unit,
            'stock_accounting' => '1',
            'seo_product_title' => '',
            'seo_product_description' => '',
            'seo_product_image' => '',
            'seo_product_robots' => '',
            'seo_product_h1' => '',
            'product_layout' => '',
        ];
    }

    private function propertyAlias(string $title): string
    {
        return match ($title) {
            'Вес, кг' => 'weight',
            'Состав' => 'composition',
            'Особенности' => 'features',
            'Страна производства' => 'origin',
            'Срок годности' => 'shelf-life',
            'Условия хранения' => 'storage',
            'Тип' => 'type',
            'Аромат' => 'aroma',
            default => substr(sha1($title), 0, 12),
        };
    }

    private function number(float $value): string
    {
        return rtrim(rtrim(number_format($value, 2, '.', ''), '0'), '.');
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
        $sets = implode(',', array_map(static fn(string $column): string => "`{$column}` = ?", array_keys($data)));
        $this->query("UPDATE {$table} SET {$sets} WHERE {$where}", array_merge(array_values($data), $whereParams));
    }
}

(new PremierDemoProductSeeder())->run();
