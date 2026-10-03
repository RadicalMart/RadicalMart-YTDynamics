<?php

if (isset($catalog_item))
{
	$hasChildren = !empty($catalog_item['children']);
	$link = (string) ($catalog_item['link'] ?? '');
	$title = (string) ($catalog_item['title'] ?? 'Menu item');
	$key = (string) ($catalog_item['key'] ?? '');
	$current = !empty($catalog_item['current']);
	$count = (int) ($catalog_item['count'] ?? 0);

	$item = $this->el('li', [
		'class' => [
			'el-item rm-catalog-menu__item',
			'is-current' => $current,
		],
	]);
	$linkElement = $this->el($link !== '' ? 'a' : 'span', [
		'class' => ['rm-catalog-menu__link'],
		'href' => $link !== '' ? $link : false,
		'target' => $link !== '' && !empty($props['link_target']) ? '_blank' : false,
		'download' => $link !== '' && !empty($props['link_download']),
		'rel' => [
			'nofollow' => !empty($props['link_rel_nofollow']),
			'noreferrer' => !empty($props['link_rel_noreferrer']),
		],
		'aria-current' => $current ? 'page' : false,
	]);
	?>
	<?= $item($props, $attrs) ?>
		<?= $linkElement($props) ?>
			<span><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></span>
			<?php if (!empty($catalog_show_count)) : ?><small><?= $count ?></small><?php endif; ?>
		<?= $linkElement->end() ?>
		<?php if ($hasChildren) : ?>
		<button type="button" class="rm-catalog-menu__forward" data-rm-catalog-forward="<?= htmlspecialchars($key, ENT_QUOTES, 'UTF-8') ?>" aria-label="Открыть <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" uk-icon="chevron-right"></button>
		<?php elseif ($link !== '') : ?>
		<a class="rm-catalog-menu__forward" href="<?= htmlspecialchars($link, ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['link_target']) ? ' target="_blank"' : '' ?> aria-label="Перейти в <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" uk-icon="chevron-right"></a>
		<?php endif; ?>
	<?= $item->end() ?>
	<?php
	return;
}

$preview = $this->el('div', [
	'class' => ['el-item rm-catalog-menu-builder-item'],
]);
?>
<?= $preview($props, $attrs) ?>
	<strong><?= htmlspecialchars(trim((string) ($props['title'] ?? '')) ?: 'Menu item', ENT_QUOTES, 'UTF-8') ?></strong>
	<?php if ($children) : ?>
	<div class="uk-margin-small-left uk-margin-small-top">
		<?php foreach ($children as $child) : ?>
			<?= $builder->render($child, ['element' => $element ?? []]) ?>
		<?php endforeach; ?>
	</div>
	<?php endif; ?>
<?= $preview->end() ?>
