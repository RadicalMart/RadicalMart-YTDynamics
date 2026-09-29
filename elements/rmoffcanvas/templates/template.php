<?php

$content = trim($builder->render($children));
$buttonStyle = in_array($props['button_style'] ?? '', ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? $props['button_style'] : 'primary';
$buttonSize = in_array($props['button_size'] ?? '', ['small', 'large'], true) ? $props['button_size'] : '';
$mode = in_array($props['mode'] ?? '', ['slide', 'push', 'reveal', 'none'], true) ? $props['mode'] : 'slide';
$panelWidth = in_array($props['panel_width'] ?? '', ['small', 'medium', 'large', 'xlarge'], true)
	? $props['panel_width'] : 'medium';
$iconAlign = ($props['icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$role = ($props['role'] ?? 'dialog') === 'alertdialog' ? 'alertdialog' : 'dialog';
$widths = ['small' => 320, 'medium' => 420, 'large' => 520, 'xlarge' => 640];

static $instance = 0;
$instance++;
$seed = (string) ($attrs['data-id'] ?? $props['id'] ?? 'offcanvas') . '-' . $instance;
$targetId = 'rm-offcanvas-' . substr(hash('sha256', $seed), 0, 12);

$root = $this->el('div');
$button = $this->el('button', [
	'type' => 'button',
	'class' => [
		'rm-offcanvas__trigger',
		'uk-button uk-button-' . $buttonStyle,
		'uk-button-' . $buttonSize => $buttonSize,
		'uk-width-1-1' => !empty($props['fullwidth']),
	],
	'uk-toggle' => 'target: #' . $targetId,
	'aria-controls' => $targetId,
	'aria-haspopup' => 'dialog',
]);
$offcanvas = $this->el('div', [
	'id' => $targetId,
	'class' => ['rm-offcanvas'],
	'uk-offcanvas' => sprintf(
		'mode: %s; flip: %s; overlay: %s; bg-close: %s; esc-close: %s; swiping: %s; stack: %s; container: %s; role: %s',
		$mode,
		($props['side'] ?? 'right') === 'right' ? 'true' : 'false',
		!empty($props['overlay']) ? 'true' : 'false',
		!empty($props['bg_close']) ? 'true' : 'false',
		!empty($props['esc_close']) ? 'true' : 'false',
		!array_key_exists('swiping', $props) || !empty($props['swiping']) ? 'true' : 'false',
		!empty($props['stack']) ? 'true' : 'false',
		!empty($props['container']) ? 'true' : 'false',
		$role,
	),
]);
$bar = $this->el('div', [
	'class' => ['rm-offcanvas__bar uk-offcanvas-bar'],
	'style' => sprintf('width: min(%dpx, 100vw);', $widths[$panelWidth]),
]);
?>
<?= $root($props, $attrs) ?>
<?= $button($props) ?>
<?php if (!empty($props['icon']) && $iconAlign === 'left') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['label']) ? ' class="uk-margin-small-right"' : '' ?>></span>
<?php endif; ?>
<?= htmlspecialchars((string) ($props['label'] ?? ''), ENT_QUOTES, 'UTF-8') ?>
<?php if (!empty($props['icon']) && $iconAlign === 'right') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['label']) ? ' class="uk-margin-small-left"' : '' ?>></span>
<?php endif; ?>
<?= $button->end() ?>
<?= $offcanvas() ?>
<?= $bar() ?>
<?php if (!empty($props['show_close'])) : ?>
	<button class="rm-offcanvas__close uk-offcanvas-close<?= !empty($props['close_large']) ? ' uk-close-large' : '' ?>" type="button" uk-close aria-label="Close"></button>
<?php endif; ?>
<div class="rm-offcanvas__content"><?= $content ?></div>
<?= $bar->end() ?>
<?= $offcanvas->end() ?>
<?= $root->end() ?>
