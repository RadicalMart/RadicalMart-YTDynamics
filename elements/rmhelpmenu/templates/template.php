<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.floating-navigation');
$assets->useScript('plg_system_ytdynamics.floating-navigation');

$side = in_array(($props['side'] ?? 'right'), ['left', 'center', 'right'], true) ? $props['side'] : 'right';
$verticalPosition = in_array(($props['vertical_position'] ?? 'bottom'), ['top', 'middle', 'bottom'], true) ? $props['vertical_position'] : 'bottom';
$direction = ($props['direction'] ?? 'up') === 'down' ? 'down' : 'up';
$visibility = in_array(($props['visibility_mode'] ?? 'all'), ['all', 'mobile', 'tablet'], true) ? $props['visibility_mode'] : 'all';
$buttonLabel = trim((string) ($props['button_label'] ?? '')) ?: 'Помощь и контакты';
$buttonIcon = trim((string) ($props['button_icon'] ?? '')) ?: 'receiver';
$closeIcon = trim((string) ($props['close_icon'] ?? '')) ?: 'close';
$buttonPulse = !array_key_exists('button_pulse', $props) || !empty($props['button_pulse']);
$style = implode(';', [
	'--rm-help-trigger-bg:' . (($props['button_background'] ?? '') ?: 'var(--ytdynamics-primary-background)'),
	'--rm-help-trigger-color:' . (($props['button_color'] ?? '') ?: 'var(--ytdynamics-inverse-color)'),
	'--rm-help-item-bg:' . (($props['item_background'] ?? '') ?: 'var(--ytdynamics-background)'),
	'--rm-help-item-color:' . (($props['item_color'] ?? '') ?: 'var(--ytdynamics-color)'),
	'--rm-help-size:' . max(40, min(120, (int) ($props['button_size'] ?? 68))) . 'px',
	'--rm-help-item-size:' . max(32, min(100, (int) ($props['item_size'] ?? 56))) . 'px',
	'--rm-help-gap:' . max(0, min(50, (int) ($props['items_gap'] ?? 12))) . 'px',
	'--rm-help-offset-x:' . max(0, min(240, (int) ($props['horizontal_offset'] ?? 20))) . 'px',
	'--rm-help-offset-y:' . max(0, min(500, (int) ($props['bottom_offset'] ?? 90))) . 'px',
	'--rm-help-z:' . max(1, min(2000, (int) ($props['z_index'] ?? 1040))),
	'--rm-help-backdrop-color:' . (($props['backdrop_color'] ?? '') ?: 'var(--ytdynamics-emphasis-color)'),
	'--rm-help-backdrop-opacity:' . max(0, min(90, (int) ($props['backdrop_opacity'] ?? 35))) . '%',
	'--rm-help-pulse-color:' . (($props['pulse_color'] ?? '') ?: (($props['button_background'] ?? '') ?: 'var(--ytdynamics-primary-background)')),
	'--rm-help-pulse-opacity:' . max(5, min(70, (int) ($props['pulse_opacity'] ?? 24))) . '%',
	'--rm-help-pulse-scale:' . max(110, min(200, (int) ($props['pulse_scale'] ?? 145))) / 100,
	'--rm-help-pulse-duration:' . max(700, min(5000, (int) ($props['pulse_duration'] ?? 1800))) . 'ms',
]);
$root = $this->el('div', [
	'class' => [
		'uk-panel rm-help-menu',
		'rm-help-menu--left' => $side === 'left',
		'rm-help-menu--center' => $side === 'center',
		'rm-help-menu--top' => $verticalPosition === 'top',
		'rm-help-menu--middle' => $verticalPosition === 'middle',
		'rm-help-menu--down' => $direction === 'down',
		'rm-help-menu--pulse' => $buttonPulse,
		'rm-floating--mobile' => $visibility === 'mobile',
		'rm-floating--tablet' => $visibility === 'tablet',
	],
	'style' => $style,
	'data-rm-help-menu' => true,
	'data-open' => !empty($props['open_initially']) ? 'true' : 'false',
	'data-close-on-link' => !empty($props['close_on_link']) ? 'true' : 'false',
]);
$context = [
	'show_labels' => !empty($props['show_labels']),
	'show_tooltips' => !array_key_exists('show_tooltips', $props) || !empty($props['show_tooltips']),
	'tooltip_delay' => max(0, min(1000, (int) ($props['tooltip_delay'] ?? 120))),
	'side' => $side,
];
?>
<?= $root($props, $attrs) ?>
	<?php if (!empty($props['show_backdrop'])) : ?><button type="button" class="rm-help-menu__backdrop" data-rm-help-backdrop hidden aria-label="Закрыть меню помощи"></button><?php endif; ?>
	<ul class="rm-help-menu__panel" data-rm-help-panel aria-hidden="true">
		<?php foreach (array_values($children) as $index => $child) echo $builder->render($child, ['element' => $props, 'rm_help_menu' => $context + ['index' => $index]]); ?>
	</ul>
	<button type="button" class="rm-help-menu__trigger" data-rm-help-trigger aria-expanded="false" aria-label="<?= htmlspecialchars($buttonLabel, ENT_QUOTES, 'UTF-8') ?>">
		<span class="rm-help-menu__open-icon" uk-icon="icon: <?= htmlspecialchars($buttonIcon, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true"></span>
		<span class="rm-help-menu__close-icon" uk-icon="icon: <?= htmlspecialchars($closeIcon, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true"></span>
	</button>
<?= $root->end() ?>
