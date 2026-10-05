<?php

$title = trim((string) ($props['title'] ?? '')) ?: 'Contact link';
$tooltip = trim((string) ($props['tooltip'] ?? '')) ?: $title;
$link = trim((string) ($props['link'] ?? ''));
$icon = trim((string) ($props['icon'] ?? '')) ?: 'link';
$context = $rm_help_menu ?? ['show_labels' => false, 'index' => 0];
$customStyle = [];
if (!empty($props['background_color'])) $customStyle[] = '--rm-help-item-icon-bg:' . $props['background_color'];
if (!empty($props['hover_background_color'])) $customStyle[] = '--rm-help-item-hover-bg:' . $props['hover_background_color'];
if (!empty($props['icon_color'])) $customStyle[] = '--rm-help-item-icon-color:' . $props['icon_color'];
if (!empty($props['label_background_color'])) $customStyle[] = '--rm-help-label-bg:' . $props['label_background_color'];
if (!empty($props['label_color'])) $customStyle[] = '--rm-help-label-color:' . $props['label_color'];
$buttonSize = max(0, min(100, (int) ($props['button_size'] ?? 0)));
if ($buttonSize > 0) $customStyle[] = '--rm-help-item-size:' . $buttonSize . 'px';
$customStyle[] = '--rm-help-item-icon-size:' . max(14, min(52, (int) ($props['icon_size'] ?? 24))) . 'px';
$shape = in_array(($props['button_shape'] ?? 'circle'), ['circle', 'rounded', 'square'], true) ? $props['button_shape'] : 'circle';
$customStyle[] = '--rm-help-item-radius:' . match ($shape) {
	'square' => '0px',
	'rounded' => '14px',
	default => '999px',
};
$customStyle[] = '--rm-help-index:' . max(0, (int) ($context['index'] ?? 0));
$showTooltip = (!array_key_exists('show_tooltip', $props) || !empty($props['show_tooltip']))
	&& !empty($context['show_tooltips']);
$tooltipPosition = ($context['side'] ?? 'right') === 'left' ? 'right' : 'left';
$tooltipOptions = 'pos: ' . $tooltipPosition . '; delay: ' . max(0, (int) ($context['tooltip_delay'] ?? 120));
$item = $this->el('li', ['class' => ['el-item rm-help-menu__item'], 'style' => implode(';', $customStyle)]);
$anchor = $this->el($link !== '' ? 'a' : 'span', [
	'class' => ['rm-help-menu__link'],
	'href' => $link !== '' ? $link : false,
	'target' => $link !== '' && !empty($props['link_target']) ? '_blank' : false,
	'download' => $link !== '' && !empty($props['link_download']),
	'rel' => ['nofollow' => !empty($props['link_rel_nofollow']), 'noreferrer' => !empty($props['link_rel_noreferrer'])],
	'aria-label' => $title,
	'title' => $showTooltip ? $tooltip : false,
	'uk-tooltip' => $showTooltip ? $tooltipOptions : false,
	'tabindex' => $link === '' && $showTooltip ? '0' : false,
	'data-rm-help-link' => $link !== '',
]);
?>
<?= $item($props, $attrs) ?>
	<?= $anchor($props) ?>
		<?php if (!empty($context['show_labels'])) : ?><span class="rm-help-menu__label"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
		<span class="rm-help-menu__item-icon" uk-icon="icon: <?= htmlspecialchars($icon, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true"></span>
	<?= $anchor->end() ?>
<?= $item->end() ?>
