<?php

declare(strict_types=1);

/**
 * Export YOOtheme Pro Builder pages and dynamic templates from the current
 * Joomla database into a portable bundle.
 *
 * Run inside the Joomla container, for example:
 *   php /var/www/html/tmp/export-yootheme-layouts.php /var/www/html/tmp/yootheme-layout-export
 */
final class YoothemeLayoutExporter
{
    private const IMPORT_VERSION = '5.0.42';

    private PDO $db;
    private string $output;
    private array $bindings = [];
    private array $assets = [];
    private array $elementTypes = [];

    public function __construct(string $output)
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
        $this->output = rtrim($output, '/');
    }

    public function run(): void
    {
        $this->prepareOutput();

        $pages = $this->exportPages();
        $templates = $this->exportTemplates();
        $assets = $this->exportReferencedAssets();

        sort($this->elementTypes);
        $manifest = [
            'format' => 'ytdynamics-yootheme-layout-bundle',
            'formatVersion' => 1,
            'generatedAt' => gmdate(DATE_ATOM),
            'requirements' => [
                'joomla' => '5.x',
                'yoothemePro' => '5.x',
                'radicalMart' => 'required for RM elements and dynamic sources',
                'ytdynamics' => $this->pluginVersion(),
                'radicalMartFilter' => 'required only by layouts containing the filter module',
            ],
            'counts' => [
                'pages' => count($pages),
                'templates' => count($templates),
                'bindings' => count($this->bindings),
                'assets' => count($assets),
            ],
            'pages' => $pages,
            'templates' => $templates,
            'elementTypes' => $this->elementTypes,
        ];

        $this->writeJson('manifest.json', $manifest);
        $this->writeJson('bindings.json', $this->bindings);
        $this->writeJson('assets/index.json', $assets);
        $this->writeReadme($manifest);
        $this->validateBundle($manifest);

        echo $this->json([
            'status' => 'ok',
            'output' => $this->output,
            'pages' => count($pages),
            'templates' => count($templates),
            'bindings' => count($this->bindings),
            'assets' => count($assets),
            'elementTypes' => count($this->elementTypes),
        ], false) . PHP_EOL;
    }

    private function exportPages(): array
    {
        $rows = $this->db->query(
            "SELECT id, title, alias, `fulltext` AS builder_text
             FROM joom_content
             WHERE `fulltext` LIKE '<!-- {%'
             ORDER BY id"
        )->fetchAll();
        $result = [];

        foreach ($rows as $row) {
            $layout = $this->decodeBuilderComment((string) $row['builder_text']);
            $this->assertLayout($layout, 'article #' . $row['id']);
            $alias = $this->slug((string) $row['alias'], 'page-' . $row['id']);
            $scope = 'page:' . $alias;

            $this->collectLayoutMetadata($layout);
            $portable = $this->makePortable($layout, $scope);
            if (empty($portable['version'])) {
                $portable['version'] = self::IMPORT_VERSION;
            }

            $this->writeJson('source/pages/' . $alias . '.json', $layout);
            $this->writeJson('import/pages/' . $alias . '.json', $portable);

            $result[] = [
                'sourceId' => (int) $row['id'],
                'title' => (string) $row['title'],
                'alias' => (string) $row['alias'],
                'importFile' => 'import/pages/' . $alias . '.json',
                'sourceFile' => 'source/pages/' . $alias . '.json',
                'version' => (string) ($layout['version'] ?? ''),
            ];
        }

        return $result;
    }

    private function exportTemplates(): array
    {
        $query = $this->db->query(
            "SELECT custom_data
             FROM joom_extensions
             WHERE element = 'yootheme' AND folder = 'system'
             LIMIT 1"
        );
        $customData = json_decode((string) $query->fetchColumn(), true, 512, JSON_THROW_ON_ERROR);
        $templates = (array) ($customData['templates'] ?? []);
        $result = [];

        foreach ($templates as $id => $template) {
            if (!is_array($template) || !isset($template['layout']) || !is_array($template['layout'])) {
                continue;
            }

            $layout = $template['layout'];
            $this->assertLayout($layout, 'template ' . $id);
            $name = trim((string) ($template['name'] ?? $id));
            $slug = $this->slug($name, strtolower((string) $id));
            $scope = 'template:' . $slug;

            $this->collectLayoutMetadata($layout);
            $portableLayout = $this->makePortable($layout, $scope);
            if (empty($portableLayout['version'])) {
                $portableLayout['version'] = self::IMPORT_VERSION;
            }
            $portableTemplate = $template;
            $portableTemplate['layout'] = $portableLayout;

            if (!empty($portableTemplate['query']['catid'])) {
                $this->bindings[] = [
                    'scope' => $scope,
                    'path' => '/query/catid',
                    'kind' => 'category',
                    'original' => $portableTemplate['query']['catid'],
                    'action' => 'Select the destination RadicalMart category in the template assignment.',
                ];
                $portableTemplate['query']['catid'] = [];
            }

            $sourceDefinition = [
                'sourceId' => (string) $id,
                'name' => $name,
                'type' => (string) ($template['type'] ?? ''),
                'query' => (array) ($template['query'] ?? []),
                'layout' => $layout,
            ];
            $importDefinition = [
                'name' => $name,
                'type' => (string) ($template['type'] ?? ''),
                'query' => (array) ($portableTemplate['query'] ?? []),
                'layout' => $portableLayout,
            ];

            $this->writeJson('source/templates/' . $slug . '.template.json', $sourceDefinition);
            $this->writeJson('import/templates/' . $slug . '.json', $portableLayout);
            $this->writeJson('import/templates/' . $slug . '.template.json', $importDefinition);

            $result[] = [
                'sourceId' => (string) $id,
                'name' => $name,
                'type' => (string) ($template['type'] ?? ''),
                'importFile' => 'import/templates/' . $slug . '.json',
                'definitionFile' => 'import/templates/' . $slug . '.template.json',
                'sourceFile' => 'source/templates/' . $slug . '.template.json',
                'version' => (string) ($layout['version'] ?? ''),
            ];
        }

        return $result;
    }

    private function makePortable(array $layout, string $scope): array
    {
        $walk = function (array $node, string $path) use (&$walk, $scope): array {
            $type = (string) ($node['type'] ?? '');
            $props = (array) ($node['props'] ?? []);

            if ($type === 'module' && isset($props['module']) && (string) $props['module'] !== '') {
                $this->bindings[] = [
                    'scope' => $scope,
                    'path' => $path . '/props/module',
                    'kind' => 'module',
                    'original' => $props['module'],
                    'action' => 'Select the matching module after importing the layout.',
                ];
                $props['module'] = '';
            }

            if (array_key_exists('product_id', $props) && (string) $props['product_id'] !== '') {
                $this->bindings[] = [
                    'scope' => $scope,
                    'path' => $path . '/props/product_id',
                    'kind' => 'product',
                    'original' => $props['product_id'],
                    'action' => 'Choose a product from the destination RadicalMart catalogue.',
                ];
                $props['product_id'] = '';
            }

            if (isset($props['link']) && is_string($props['link']) && str_starts_with($props['link'], '/index.php/')) {
                $this->bindings[] = [
                    'scope' => $scope,
                    'path' => $path . '/props/link',
                    'kind' => 'link',
                    'original' => $props['link'],
                    'action' => 'Select the corresponding destination menu item or route.',
                ];
                $props['link'] = '#';
            }

            if ($props !== [] || array_key_exists('props', $node)) {
                $node['props'] = $props;
            }

            if (isset($node['children']) && is_array($node['children'])) {
                foreach ($node['children'] as $index => $child) {
                    if (is_array($child)) {
                        $node['children'][$index] = $walk($child, $path . '/children/' . $index);
                    }
                }
            }

            return $node;
        };

        return $walk($layout, '');
    }

    private function collectLayoutMetadata(array $node): void
    {
        $type = trim((string) ($node['type'] ?? ''));
        if ($type !== '') {
            $this->elementTypes[$type] = $type;
        }

        foreach ((array) ($node['props'] ?? []) as $key => $value) {
            if ($key === 'image' && is_string($value) && str_starts_with($value, 'images/')) {
                $this->assets[$value] = $value;
            }
        }

        foreach ((array) ($node['children'] ?? []) as $child) {
            if (is_array($child)) {
                $this->collectLayoutMetadata($child);
            }
        }
    }

    private function exportReferencedAssets(): array
    {
        $result = [];
        ksort($this->assets);

        foreach ($this->assets as $relative) {
            $source = '/var/www/html/' . ltrim($relative, '/');
            $destination = $this->output . '/assets/' . ltrim($relative, '/');
            $entry = ['path' => $relative, 'included' => false];

            if (is_file($source)) {
                $this->ensureDirectory(dirname($destination));
                if (!copy($source, $destination)) {
                    throw new RuntimeException('Unable to copy referenced asset: ' . $relative);
                }
                $entry['included'] = true;
                $entry['sha256'] = hash_file('sha256', $destination);
            }
            $result[] = $entry;
        }

        return $result;
    }

    private function decodeBuilderComment(string $fulltext): array
    {
        if (!preg_match('/^\s*<!--\s*(\{.*\})\s*-->\s*$/s', $fulltext, $matches)) {
            throw new RuntimeException('Article contains an unsupported Builder payload.');
        }

        return json_decode($matches[1], true, 512, JSON_THROW_ON_ERROR);
    }

    private function assertLayout(array $layout, string $label): void
    {
        if (($layout['type'] ?? '') !== 'layout' || !isset($layout['children']) || !is_array($layout['children'])) {
            throw new RuntimeException("Invalid YOOtheme layout in {$label}.");
        }
    }

    private function validateBundle(array $manifest): void
    {
        if (($manifest['counts']['pages'] ?? 0) < 1 || ($manifest['counts']['templates'] ?? 0) < 1) {
            throw new RuntimeException('The export bundle is incomplete.');
        }

        foreach (array_merge($manifest['pages'], $manifest['templates']) as $entry) {
            foreach (['importFile', 'sourceFile'] as $key) {
                $file = $this->output . '/' . $entry[$key];
                if (!is_file($file)) {
                    throw new RuntimeException('Missing exported file: ' . $entry[$key]);
                }
                json_decode((string) file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
            }
        }

        foreach ($manifest['pages'] as $entry) {
            $portable = (string) file_get_contents($this->output . '/' . $entry['importFile']);
            if (preg_match('/"(?:module|product_id)"\s*:\s*"?[1-9][0-9]*"?/', $portable)) {
                throw new RuntimeException('Portable page still contains a database-specific numeric binding: ' . $entry['alias']);
            }
        }
    }

    private function prepareOutput(): void
    {
        if ($this->output === '' || $this->output === '/' || !str_contains($this->output, 'yootheme-layout')) {
            throw new RuntimeException('Refusing unsafe export directory: ' . $this->output);
        }
        if (is_dir($this->output)) {
            $this->removeTree($this->output);
        }
        foreach (['source/pages', 'source/templates', 'import/pages', 'import/templates', 'assets'] as $directory) {
            $this->ensureDirectory($this->output . '/' . $directory);
        }
    }

    private function removeTree(string $directory): void
    {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($directory, FilesystemIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($iterator as $item) {
            $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
        }
        rmdir($directory);
    }

    private function ensureDirectory(string $directory): void
    {
        if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory)) {
            throw new RuntimeException('Unable to create directory: ' . $directory);
        }
    }

    private function writeJson(string $relative, mixed $value): void
    {
        $path = $this->output . '/' . $relative;
        $this->ensureDirectory(dirname($path));
        if (file_put_contents($path, $this->json($value) . PHP_EOL) === false) {
            throw new RuntimeException('Unable to write file: ' . $relative);
        }
    }

    private function writeReadme(array $manifest): void
    {
        $text = <<<'MD'
# YTDynamics · YOOtheme Pro layouts

Пакет содержит макеты YOOtheme Pro Builder, экспортированные из тестового проекта YTDynamics.

## Что импортировать

1. Установите RadicalMart, YOOtheme Pro 5.x и совместимую версию YTDynamics.
2. Для обычной Builder-страницы откройте Layout → Library → My Layouts → Upload и загрузите нужный JSON из `import/pages/`.
3. Для динамического шаблона создайте новый template нужного типа, назначьте его категории/странице и импортируйте JSON из `import/templates/` в его Builder.
4. Откройте `bindings.json` и назначьте модули, товары, категории и ссылки, которые зависят от базы целевого проекта.
5. Скопируйте содержимое `assets/images/` в каталог `images/` Joomla с сохранением путей.

`import/` содержит очищенные переносимые макеты. `source/` — точная резервная копия исходных макетов вместе с исходными ID и назначениями.

Файлы `*.template.json` содержат тип и исходные параметры динамического шаблона для справки; непосредственно в Builder импортируется соседний JSON без суффикса `.template`.

MD;
        $text .= sprintf(
            "\nСостав пакета: %d Builder-страниц, %d динамических шаблона, %d записей привязок и %d ресурсов.\n",
            $manifest['counts']['pages'],
            $manifest['counts']['templates'],
            $manifest['counts']['bindings'],
            $manifest['counts']['assets']
        );
        file_put_contents($this->output . '/README.md', $text);
    }

    private function pluginVersion(): string
    {
        $manifest = '/var/www/html/plugins/system/ytdynamics/ytdynamics.xml';
        if (!is_file($manifest)) {
            return 'unknown';
        }
        $xml = simplexml_load_file($manifest);
        return $xml ? (string) $xml->version : 'unknown';
    }

    private function slug(string $value, string $fallback): string
    {
        $value = trim($value);
        $transliterated = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
        $slug = strtolower((string) ($transliterated ?: $value));
        $slug = trim((string) preg_replace('/[^a-z0-9]+/', '-', $slug), '-');
        return $slug !== '' ? $slug : $fallback;
    }

    private function json(mixed $value, bool $pretty = true): string
    {
        $flags = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR;
        if ($pretty) {
            $flags |= JSON_PRETTY_PRINT;
        }
        return json_encode($value, $flags);
    }
}

$output = $argv[1] ?? '/var/www/html/tmp/ytdynamics-yootheme-layout-export';
(new YoothemeLayoutExporter($output))->run();
