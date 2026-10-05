<?php

declare(strict_types=1);

/**
 * Adds editable RM Bottom Navigation and RM Help Menu examples to the active
 * shared Premier catalogue and product templates without rebuilding layouts.
 */

$databaseHost = getenv('JOOMLA_DB_HOST') ?: 'db:3306';
$databasePort = '3306';
if (str_contains($databaseHost, ':'))
{
	[$databaseHost, $databasePort] = explode(':', $databaseHost, 2);
}

$database = new PDO(
	'mysql:host=' . $databaseHost . ';port=' . $databasePort . ';dbname=' . (getenv('JOOMLA_DB_NAME') ?: 'database') . ';charset=utf8mb4',
	getenv('JOOMLA_DB_USER') ?: 'joomla',
	getenv('JOOMLA_DB_PASSWORD') ?: '',
	[
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
	]
);

$extension = $database->query(
	"SELECT extension_id, custom_data
	 FROM joom_extensions
	 WHERE element = 'yootheme' AND folder = 'system'
	 LIMIT 1"
)->fetch();
if (!$extension)
{
	throw new RuntimeException('The YOOtheme system extension was not found.');
}

$customData = json_decode((string) $extension['custom_data'], true, 512, JSON_THROW_ON_ERROR);
$examples = [
	[
		'type' => 'rmbottomnav',
		'props' => [
			'fixed' => true,
			'reserve_space' => true,
			'visibility_mode' => 'mobile',
			'hide_scrollbar' => true,
			'show_labels' => true,
			'auto_active' => true,
			'max_width' => 780,
			'item_min_width' => 82,
		],
		'children' => [
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Главная', 'icon' => 'home', 'link' => '/']],
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Каталог', 'icon' => 'grid', 'link' => '/index.php']],
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Корзина', 'icon' => 'cart', 'link' => '/index.php?option=com_radicalmart&view=cart']],
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Избранное', 'icon' => 'heart', 'link' => '/index.php?option=com_radicalmart&view=favorites']],
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Сравнение', 'icon' => 'copy', 'link' => '/index.php?option=com_radicalmart&view=compare']],
			['type' => 'rmbottomnav_item', 'props' => ['title' => 'Кабинет', 'icon' => 'user', 'link' => '/index.php?option=com_users&view=profile']],
		],
	],
	[
		'type' => 'rmhelpmenu',
		'props' => [
			'button_label' => 'Помощь и контакты',
			'button_icon' => 'receiver',
			'close_icon' => 'close',
			'side' => 'right',
			'direction' => 'up',
			'visibility_mode' => 'all',
			'show_labels' => false,
			'show_backdrop' => true,
			'close_on_link' => true,
			'bottom_offset' => 96,
		],
		'children' => [
			['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Позвонить', 'icon' => 'receiver', 'link' => 'tel:+79990000000', 'background_color' => '#315efb', 'icon_color' => '#ffffff']],
			['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать в Telegram', 'icon' => 'comments', 'link' => 'https://t.me/example', 'link_target' => true, 'background_color' => '#2aabee', 'icon_color' => '#ffffff']],
			['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать в WhatsApp', 'icon' => 'commenting', 'link' => 'https://wa.me/79990000000', 'link_target' => true, 'background_color' => '#25d366', 'icon_color' => '#ffffff']],
			['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать на почту', 'icon' => 'mail', 'link' => 'mailto:mail@example.com', 'background_color' => '#1e87f0', 'icon_color' => '#ffffff']],
			['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Раздел помощи', 'icon' => 'question', 'link' => '/help', 'background_color' => '#6f42c1', 'icon_color' => '#ffffff']],
		],
	],
];

$containsType = static function (array $node, string $type) use (&$containsType): bool {
	if (($node['type'] ?? '') === $type)
	{
		return true;
	}
	if (empty($node['children']) || !is_array($node['children']))
	{
		return false;
	}
	foreach ($node['children'] as $child)
	{
		if (is_array($child) && $containsType($child, $type))
		{
			return true;
		}
	}

	return false;
};

$appendToColumnWithType = static function (array &$node, string $anchorType, array $items) use (&$appendToColumnWithType, $containsType): bool {
	if (($node['type'] ?? '') === 'column' && $containsType($node, $anchorType))
	{
		$node['children'] ??= [];
		array_push($node['children'], ...$items);

		return true;
	}
	if (empty($node['children']) || !is_array($node['children']))
	{
		return false;
	}
	foreach ($node['children'] as &$child)
	{
		if (is_array($child) && $appendToColumnWithType($child, $anchorType, $items))
		{
			unset($child);

			return true;
		}
	}
	unset($child);

	return false;
};

$placements = [];
$changed = false;
foreach (['PREMIERCATALOG' => 'rmlazypagination', 'PREMIERPRODUCT' => 'rmproductaction'] as $templateName => $anchorType)
{
	$template =& $customData['templates'][$templateName];
	if (!is_array($template) || !isset($template['layout']) || !is_array($template['layout']))
	{
		throw new RuntimeException("The {$templateName} layout was not found.");
	}

	$missing = array_values(array_filter(
		$examples,
		static fn(array $example): bool => !$containsType($template['layout'], (string) $example['type'])
	));
	if (!$missing)
	{
		$placements[$templateName] = 'unchanged';
		unset($template);
		continue;
	}
	if (!$appendToColumnWithType($template['layout'], $anchorType, $missing))
	{
		throw new RuntimeException("No target column containing {$anchorType} was found in {$templateName}.");
	}

	$changed = true;
	$placements[$templateName] = array_column($missing, 'type');
	unset($template);
}

if (!$changed)
{
	echo json_encode(['status' => 'unchanged', 'templates' => $placements], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
	exit(0);
}

$backupDirectory = rtrim(getenv('JOOMLA_ROOT') ?: '/var/www/html', '/') . '/tmp';
if (!is_dir($backupDirectory) && !mkdir($backupDirectory, 0775, true) && !is_dir($backupDirectory))
{
	throw new RuntimeException('Unable to create the Joomla tmp directory.');
}
$backupPath = $backupDirectory . '/yootheme-before-floating-navigation-' . gmdate('Ymd-His') . '.json';
if (file_put_contents($backupPath, (string) $extension['custom_data']) === false)
{
	throw new RuntimeException('Unable to back up YOOtheme custom_data.');
}

$encoded = json_encode($customData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
$database->beginTransaction();
try
{
	$update = $database->prepare('UPDATE joom_extensions SET custom_data = ? WHERE extension_id = ?');
	$update->execute([$encoded, (int) $extension['extension_id']]);
	$database->commit();
}
catch (Throwable $error)
{
	$database->rollBack();
	throw $error;
}

echo json_encode([
	'status' => 'ok',
	'templates' => $placements,
	'backup' => $backupPath,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR) . PHP_EOL;
