<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\RadicalMart\Site\Helper\RouteHelper;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\ParameterType;

$app = Factory::getApplication();
$sourceMode = ($props['source_mode'] ?? 'categories') === 'items' ? 'items' : 'categories';
$rootId = max(1, (int) ($props['root_category'] ?? 1));
$currentId = $app->getInput()->getCmd('option') === 'com_radicalmart'
	&& $app->getInput()->getCmd('view') === 'category'
	? $app->getInput()->getInt('id') : 0;
$maxDepth = max(0, min(8, (int) ($props['max_depth'] ?? 0)));
$title = trim((string) ($props['title'] ?? '')) ?: 'Каталог';
$minHeight = max(0, min(1200, (int) ($props['panel_min_height'] ?? 520)));
$showCount = !empty($props['show_item_count']);
$highlightCurrent = !empty($props['highlight_current']);
$currentPath = rtrim((string) parse_url(Uri::getInstance()->toString(), PHP_URL_PATH), '/');

/** @var DatabaseInterface $db */
$db = Factory::getContainer()->get(DatabaseInterface::class);

$routeCategory = static function (object $category): string {
	$slug = (int) $category->id . ':' . (string) $category->alias;
	return Route::link('site', RouteHelper::getCategoryViewRoute($slug, $category->language ?? '*'));
};
$categoryCount = static function (object $category): int {
	$totals = is_array($category->totals ?? null)
		? $category->totals
		: (json_decode((string) ($category->totals ?? ''), true) ?: []);
	return (int) ($totals['items'] ?? $totals['products'] ?? 0);
};
$linkIsCurrent = static function (string $link) use ($currentPath): bool {
	if ($link === '' || $currentPath === '') return false;
	$path = rtrim((string) parse_url($link, PHP_URL_PATH), '/');
	return $path !== '' && $path === $currentPath;
};

// Both the RadicalMart source and Builder items are normalized to this same
// recursive node contract before any HTML is rendered.
$menuItems = [];
$rootLink = '';
$rootKey = $sourceMode === 'items' ? 'items-root' : (string) $rootId;

if ($sourceMode === 'categories')
{
	$rootQuery = $db->createQuery()
		->select($db->quoteName(['id', 'parent_id', 'title', 'alias', 'language', 'totals']))
		->from($db->quoteName('#__radicalmart_categories'))
		->where($db->quoteName('id') . ' = :rootId')
		->bind(':rootId', $rootId, ParameterType::INTEGER);
	$root = $db->setQuery($rootQuery)->loadObject();
	if (!$root) return;
	$rootLink = $routeCategory($root);

	$query = $db->createQuery()
		->select($db->quoteName(['id', 'parent_id', 'level', 'lft', 'title', 'alias', 'language', 'totals']))
		->from($db->quoteName('#__radicalmart_categories'))
		->where($db->quoteName('id') . ' != :rootId')
		->where($db->quoteName('state') . ' = 1')
		->where($db->quoteName('show') . ' = 1')
		->order($db->quoteName('lft') . ' ASC, ' . $db->quoteName('id') . ' ASC')
		->bind(':rootId', $rootId, ParameterType::INTEGER);
	if (Multilanguage::isEnabled())
	{
		$query->whereIn($db->quoteName('language'), [$app->getLanguage()->getTag(), '*'], ParameterType::STRING);
	}
	$records = $db->setQuery($query)->loadObjectList();
	$childrenByParent = [];
	foreach ($records as $record)
	{
		$childrenByParent[(int) $record->parent_id][] = $record;
	}

	$normalizeCategories = static function (int $parentId, int $depth) use (
		&$normalizeCategories,
		$childrenByParent,
		$maxDepth,
		$currentId,
		$highlightCurrent,
		$routeCategory,
		$categoryCount
	): array {
		if ($maxDepth > 0 && $depth > $maxDepth) return [];
		$result = [];
		foreach ($childrenByParent[$parentId] ?? [] as $category)
		{
			$id = (int) $category->id;
			$result[] = [
				'key' => (string) $id,
				'title' => trim((string) $category->title),
				'link' => $routeCategory($category),
				'count' => $categoryCount($category),
				'current' => $highlightCurrent && $id === $currentId,
				'children' => $normalizeCategories($id, $depth + 1),
				'node' => null,
			];
		}
		return $result;
	};
	$menuItems = $normalizeCategories($rootId, 1);
}
else
{
	$categoryIds = [];
	$collectCategoryIds = static function (array $nodes) use (&$collectCategoryIds, &$categoryIds): void {
		foreach ($nodes as $node)
		{
			$id = (int) ($node->props['category_id'] ?? 0);
			if ($id > 0) $categoryIds[$id] = $id;
			if (!empty($node->children)) $collectCategoryIds($node->children);
		}
	};
	$collectCategoryIds($children);

	$categories = [];
	if ($categoryIds)
	{
		$query = $db->createQuery()
			->select($db->quoteName(['id', 'title', 'alias', 'language', 'totals']))
			->from($db->quoteName('#__radicalmart_categories'))
			->whereIn($db->quoteName('id'), array_values($categoryIds), ParameterType::INTEGER);
		foreach ($db->setQuery($query)->loadObjectList() as $category)
		{
			$categories[(int) $category->id] = $category;
		}
	}

	$normalizeItems = static function (array $nodes, array $path, int $depth) use (
		&$normalizeItems,
		$categories,
		$maxDepth,
		$currentId,
		$highlightCurrent,
		$routeCategory,
		$categoryCount,
		$linkIsCurrent
	): array {
		if ($maxDepth > 0 && $depth > $maxDepth) return [];
		$result = [];
		foreach (array_values($nodes) as $index => $node)
		{
			$itemPath = [...$path, $index + 1];
			$categoryId = (int) ($node->props['category_id'] ?? 0);
			$category = $categories[$categoryId] ?? null;
			$itemTitle = trim(strip_tags((string) ($node->props['title'] ?? '')));
			$itemLink = trim((string) ($node->props['link'] ?? ''));
			if ($itemTitle === '' && $category) $itemTitle = trim((string) $category->title);
			if ($itemLink === '' && $category) $itemLink = $routeCategory($category);
			if ($itemTitle === '') $itemTitle = 'Menu item';
			$manualCount = $node->props['item_count'] ?? null;
			$result[] = [
				'key' => 'item-' . implode('-', $itemPath),
				'title' => $itemTitle,
				'link' => $itemLink,
				'count' => is_numeric($manualCount) ? (int) $manualCount : ($category ? $categoryCount($category) : 0),
				'current' => $highlightCurrent && (
					!empty($node->props['current'])
					|| ($categoryId > 0 && $categoryId === $currentId)
					|| $linkIsCurrent($itemLink)
				),
				'children' => $normalizeItems($node->children ?? [], $itemPath, $depth + 1),
				'node' => $node,
			];
		}
		return $result;
	};
	$menuItems = $normalizeItems($children, [], 1);
	$rootLink = trim((string) ($props['root_link'] ?? ''));
}

if (!$menuItems) return;

// Panels are siblings in the DOM. The parent key forms an explicit navigation
// graph, so forward/back works at any depth without hardcoded category levels.
$panels = [];
$currentPanel = null;
$createPanel = static function (
	string $key,
	string $panelTitle,
	string $panelLink,
	?string $parentKey,
	array $items
) use (&$createPanel, &$panels, &$currentPanel): void {
	$panels[$key] = [
		'key' => $key,
		'title' => $panelTitle,
		'link' => $panelLink,
		'parent' => $parentKey,
		'items' => $items,
	];
	foreach ($items as $item)
	{
		if ($item['current']) $currentPanel = $item['children'] ? $item['key'] : $key;
		if ($item['children'])
		{
			$createPanel($item['key'], $item['title'], $item['link'], $key, $item['children']);
		}
	}
};
$createPanel($rootKey, $title, $rootLink, null, $menuItems);
$initialPanel = !empty($props['open_current_branch']) && $currentPanel !== null ? $currentPanel : $rootKey;

$assets = $app->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.catalog-navigation');
$assets->useScript('plg_system_ytdynamics.catalog-navigation');

$el = $this->el('nav', [
	'class' => ['rm-catalog-menu'],
	'data-rm-catalog-menu' => true,
	'data-initial-panel' => $initialPanel,
	'aria-label' => $title,
	'style' => $minHeight ? '--rm-catalog-menu-min-height: ' . $minHeight . 'px;' : '',
]);

$renderPlainItem = static function (array $item) use ($showCount): void {
	$hasChildren = !empty($item['children']);
	$link = htmlspecialchars($item['link'], ENT_QUOTES, 'UTF-8');
	$titleText = htmlspecialchars($item['title'], ENT_QUOTES, 'UTF-8');
	$key = htmlspecialchars($item['key'], ENT_QUOTES, 'UTF-8');
	?>
	<li class="el-item rm-catalog-menu__item<?= $item['current'] ? ' is-current' : '' ?>">
		<?php if ($item['link'] !== '') : ?>
		<a class="rm-catalog-menu__link" href="<?= $link ?>"<?= $item['current'] ? ' aria-current="page"' : '' ?>>
			<span><?= $titleText ?></span><?php if ($showCount) : ?><small><?= (int) $item['count'] ?></small><?php endif; ?>
		</a>
		<?php else : ?>
		<span class="rm-catalog-menu__link"><span><?= $titleText ?></span><?php if ($showCount) : ?><small><?= (int) $item['count'] ?></small><?php endif; ?></span>
		<?php endif; ?>
		<?php if ($hasChildren) : ?>
		<button type="button" class="rm-catalog-menu__forward" data-rm-catalog-forward="<?= $key ?>" aria-label="Открыть <?= $titleText ?>" uk-icon="chevron-right"></button>
		<?php elseif ($item['link'] !== '') : ?>
		<a class="rm-catalog-menu__forward" href="<?= $link ?>" aria-label="Перейти в <?= $titleText ?>" uk-icon="chevron-right"></a>
		<?php endif; ?>
	</li>
	<?php
};
?>
<?= $el($props, $attrs) ?>
<div class="rm-catalog-menu__viewport">
	<?php foreach ($panels as $panel) :
		$panelKey = htmlspecialchars($panel['key'], ENT_QUOTES, 'UTF-8');
		$parentKey = htmlspecialchars((string) ($panel['parent'] ?? ''), ENT_QUOTES, 'UTF-8');
		$panelTitle = htmlspecialchars($panel['title'], ENT_QUOTES, 'UTF-8');
	?>
	<section class="rm-catalog-menu__panel<?= $panel['key'] === $initialPanel ? ' is-active' : '' ?>"
	         data-rm-catalog-panel="<?= $panelKey ?>" data-parent-panel="<?= $parentKey ?>"
	         aria-hidden="<?= $panel['key'] === $initialPanel ? 'false' : 'true' ?>">
		<header class="rm-catalog-menu__header">
			<?php if ($panel['parent'] !== null) : ?>
			<button type="button" class="rm-catalog-menu__back" data-rm-catalog-back="<?= $parentKey ?>" aria-label="Назад" uk-icon="arrow-left"></button>
			<?php endif; ?>
			<?php if ($panel['link'] !== '' && ($panel['parent'] !== null || !empty($props['show_root_link']))) : ?>
			<a class="rm-catalog-menu__title" href="<?= htmlspecialchars($panel['link'], ENT_QUOTES, 'UTF-8') ?>"><?= $panelTitle ?></a>
			<?php else : ?>
			<strong class="rm-catalog-menu__title"><?= $panelTitle ?></strong>
			<?php endif; ?>
		</header>
		<ul class="rm-catalog-menu__list">
			<?php foreach ($panel['items'] as $item) : ?>
				<?php if ($item['node']) : ?>
					<?= $builder->render($item['node'], ['catalog_item' => $item, 'catalog_show_count' => $showCount]) ?>
				<?php else : ?>
					<?php $renderPlainItem($item) ?>
				<?php endif; ?>
			<?php endforeach; ?>
		</ul>
	</section>
	<?php endforeach; ?>
</div>
<?= $el->end() ?>
