<?php

$title = trim((string) ($props['title'] ?? '')) ?: 'Navigation item';
$link = trim((string) ($props['link'] ?? ''));
$icon = trim((string) ($props['icon'] ?? ''));
$badge = trim((string) ($props['badge'] ?? ''));
$context = $rm_bottom_nav ?? ['show_labels' => true, 'auto_active' => false, 'current_url' => ''];
$normalizeUrl = static function (string $url): string {
	$path = rtrim((string) parse_url(html_entity_decode($url), PHP_URL_PATH), '/') ?: '/';
	$query = (string) parse_url(html_entity_decode($url), PHP_URL_QUERY);
	return $path . ($query !== '' ? '?' . $query : '');
};
$autoActive = !array_key_exists('auto_active', $props) || !empty($props['auto_active']);
$active = !empty($props['active']) || (
	!empty($context['auto_active'])
	&& $autoActive
	&& $link !== ''
	&& $normalizeUrl($link) === $normalizeUrl((string) ($context['current_url'] ?? ''))
);
$customStyle = [];
if (!empty($props['color'])) $customStyle[] = '--rm-bottom-nav-item-color:' . $props['color'];
if (!empty($props['background_color'])) $customStyle[] = '--rm-bottom-nav-item-bg:' . $props['background_color'];
if (!empty($props['active_color'])) $customStyle[] = '--rm-bottom-nav-item-active-color:' . $props['active_color'];
if (!empty($props['active_background_color'])) $customStyle[] = '--rm-bottom-nav-item-active-bg:' . $props['active_background_color'];
$item = $this->el('li', [
	'class' => ['el-item rm-bottom-navigation__item', 'is-active' => $active],
	'style' => $customStyle ? implode(';', $customStyle) : false,
]);
$anchor = $this->el($link !== '' ? 'a' : 'span', [
	'class' => ['rm-bottom-navigation__link'],
	'href' => $link !== '' ? $link : false,
	'target' => $link !== '' && !empty($props['link_target']) ? '_blank' : false,
	'download' => $link !== '' && !empty($props['link_download']),
	'rel' => ['nofollow' => !empty($props['link_rel_nofollow']), 'noreferrer' => !empty($props['link_rel_noreferrer'])],
	'aria-current' => $active ? 'page' : false,
	'aria-label' => empty($context['show_labels']) ? $title : false,
]);
?>
<?= $item($props, $attrs) ?>
	<?= $anchor($props) ?>
		<?php if ($icon !== '') : ?><span class="rm-bottom-navigation__icon" uk-icon="icon: <?= htmlspecialchars($icon, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true"></span><?php endif; ?>
		<?php if (!empty($context['show_labels'])) : ?><span class="rm-bottom-navigation__label"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
		<?php if ($badge !== '') : ?><span class="rm-bottom-navigation__badge uk-badge"><?= htmlspecialchars($badge, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
	<?= $anchor->end() ?>
<?= $item->end() ?>
