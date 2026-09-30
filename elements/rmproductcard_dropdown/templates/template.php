<?php

namespace YOOtheme;

use Joomla\CMS\Factory;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$displayMode = ($props['display_mode'] ?? 'hover') === 'hover' ? 'hover' : 'default';
$breakpoint = in_array(($props['hover_breakpoint'] ?? 'm'), ['s', 'm', 'l', 'xl'], true)
	? ($props['hover_breakpoint'] ?? 'm') : 'm';
$style = in_array(($props['panel_style'] ?? 'default'), ['default', 'primary', 'secondary'], true)
	? ($props['panel_style'] ?? 'default') : 'default';
$padding = in_array(($props['panel_padding'] ?? 'default'), ['none', 'small', 'default', 'large'], true)
	? ($props['panel_padding'] ?? 'default') : 'default';
$maxHeight = max(240, min(1000, (int) ($props['max_height'] ?? 680)));
$content = trim($builder->render($children, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []));
$el = $this->el('div', [
	'class' => [
		'rm-product-card__dropdown',
		'rm-product-card__dropdown--hover' => $displayMode === 'hover',
		'rm-product-card__dropdown--divider' => !empty($props['show_divider']),
		'rm-product-card__dropdown--surface-' . $style,
		'rm-product-card__dropdown--padding-' . $padding,
	],
	'data-rm-product-card-dropdown' => true,
	'data-display-mode' => $displayMode,
	'data-hover-breakpoint' => $breakpoint,
	'style' => '--rm-product-card-dropdown-max-height: ' . $maxHeight . 'px',
]);
?>
<?= $el($props, $attrs) ?>
<?= $content ?>
<?= $el->end() ?>
