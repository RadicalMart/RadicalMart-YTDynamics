<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.floating-navigation');
$assets->useScript('plg_system_ytdynamics.floating-navigation');

$visibility = in_array(($props['visibility_mode'] ?? 'mobile'), ['all', 'mobile', 'tablet'], true) ? $props['visibility_mode'] : 'mobile';
$fixed = !empty($props['fixed']);
$layout = in_array(($props['layout_mode'] ?? 'scroll'), ['scroll', 'stretch', 'grid'], true) ? $props['layout_mode'] : 'scroll';
$maxWidth = max(0, min(1600, (int) ($props['max_width'] ?? 780)));
$style = implode(';', [
	'--rm-bottom-nav-bg:' . (($props['background_color'] ?? '') ?: 'var(--ytdynamics-background)'),
	'--rm-bottom-nav-color:' . (($props['text_color'] ?? '') ?: 'var(--ytdynamics-color)'),
	'--rm-bottom-nav-active:' . (($props['active_color'] ?? '') ?: 'var(--ytdynamics-primary-color)'),
	'--rm-bottom-nav-gap:' . max(0, min(40, (int) ($props['gap'] ?? 4))) . 'px',
	'--rm-bottom-nav-padding-x:' . max(0, min(60, (int) ($props['padding_x'] ?? 8))) . 'px',
	'--rm-bottom-nav-padding-y:' . max(0, min(40, (int) ($props['padding_y'] ?? 8))) . 'px',
	'--rm-bottom-nav-item-min:' . max(48, min(220, (int) ($props['item_min_width'] ?? 78))) . 'px',
	'--rm-bottom-nav-columns:' . max(1, min(12, (int) ($props['columns'] ?? 5))),
	'--rm-bottom-nav-icon-size:' . max(14, min(64, (int) ($props['icon_size'] ?? 28))) . 'px',
	'--rm-bottom-nav-label-size:' . max(9, min(28, (int) ($props['label_size'] ?? 13))) . 'px',
	'--rm-bottom-nav-offset:' . max(0, min(240, (int) ($props['bottom_offset'] ?? 0))) . 'px',
	'--rm-bottom-nav-z:' . max(1, min(2000, (int) ($props['z_index'] ?? 1030))),
	'--rm-bottom-nav-max-width:' . ($maxWidth > 0 ? $maxWidth . 'px' : '100%'),
	'--rm-bottom-nav-radius:' . max(0, min(60, (int) ($props['border_radius'] ?? 18))) . 'px',
]);

$root = $this->el('nav', [
	'class' => [
		'uk-panel rm-bottom-navigation',
		'rm-bottom-navigation--fixed' => $fixed,
		'rm-bottom-navigation--layout-' . $layout,
		'rm-bottom-navigation--hide-scrollbar' => $layout === 'scroll' && !empty($props['hide_scrollbar']),
		'rm-floating--mobile' => $visibility === 'mobile',
		'rm-floating--tablet' => $visibility === 'tablet',
	],
	'style' => $style,
	'aria-label' => 'Основная навигация',
	'data-rm-bottom-navigation' => true,
	'data-fixed' => $fixed ? 'true' : 'false',
	'data-reserve-space' => !empty($props['reserve_space']) ? 'true' : 'false',
	'data-bottom-offset' => max(0, min(240, (int) ($props['bottom_offset'] ?? 0))),
]);
$context = [
	'show_labels' => !empty($props['show_labels']),
	'auto_active' => !empty($props['auto_active']),
	'current_url' => Uri::getInstance()->toString(['path', 'query']),
];
?>
<?= $root($props, $attrs) ?>
	<ul class="rm-bottom-navigation__track">
		<?php foreach ($children as $child) echo $builder->render($child, ['element' => $props, 'rm_bottom_nav' => $context]); ?>
	</ul>
<?= $root->end() ?>
