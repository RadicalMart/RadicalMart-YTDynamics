<?php

$content = trim($builder->render($children));
$buttonStyle = in_array($props['button_style'] ?? '', ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? $props['button_style'] : 'primary';
$buttonSize = in_array($props['button_size'] ?? '', ['small', 'large'], true) ? $props['button_size'] : '';
$modalSize = in_array($props['modal_size'] ?? '', ['default', 'auto', 'small', 'large', 'xlarge', 'container', 'full'], true)
	? $props['modal_size'] : 'default';
$iconAlign = ($props['icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$closeStyle = ($props['close_style'] ?? 'default') === 'outside' ? 'outside' : 'default';
$role = ($props['role'] ?? 'dialog') === 'alertdialog' ? 'alertdialog' : 'dialog';
$contentWrapper = ($props['content_wrapper'] ?? 'body') === 'none' ? 'none' : 'body';

static $instance = 0;
$instance++;
$seed = (string) ($attrs['data-id'] ?? $props['id'] ?? 'modal') . '-' . $instance;
$targetId = 'rm-modal-' . substr(hash('sha256', $seed), 0, 12);

$widths = [
	'small'  => 'width: min(480px, calc(100vw - 30px));',
	'large'  => 'width: min(900px, calc(100vw - 30px));',
	'xlarge' => 'width: min(1200px, calc(100vw - 30px));',
];
$root = $this->el('div');
$button = $this->el('button', [
	'type' => 'button',
	'class' => [
		'rm-modal__trigger',
		'uk-button uk-button-' . $buttonStyle,
		'uk-button-' . $buttonSize => $buttonSize,
		'uk-width-1-1' => !empty($props['fullwidth']),
	],
	'uk-toggle' => 'target: #' . $targetId,
	'aria-controls' => $targetId,
	'aria-haspopup' => 'dialog',
]);
$modal = $this->el('div', [
	'id' => $targetId,
	'class' => [
		'rm-modal',
		'uk-modal-container' => $modalSize === 'container',
		'uk-modal-full' => $modalSize === 'full',
		'uk-flex-top' => !empty($props['center']),
	],
	'uk-modal' => sprintf(
		'bg-close: %s; esc-close: %s; stack: %s; container: %s; role: %s',
		!empty($props['bg_close']) ? 'true' : 'false',
		!empty($props['esc_close']) ? 'true' : 'false',
		!empty($props['stack']) ? 'true' : 'false',
		!array_key_exists('container', $props) || !empty($props['container']) ? 'true' : 'false',
		$role,
	),
]);
$dialog = $this->el('div', [
	'class' => [
		'rm-modal__dialog uk-modal-dialog',
		'uk-width-auto' => $modalSize === 'auto',
		'uk-margin-auto-vertical' => !empty($props['center']),
	],
	'style' => $widths[$modalSize] ?? false,
	'uk-overflow-auto' => $contentWrapper === 'none' && !empty($props['overflow_auto']) ? true : false,
]);
$closeClass = $modalSize === 'full'
	? 'uk-modal-close-full uk-close-large'
	: 'uk-modal-close-' . $closeStyle . (!empty($props['close_large']) ? ' uk-close-large' : '');
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
<?= $modal() ?>
<?= $dialog() ?>
<?php if (!empty($props['show_close'])) : ?>
	<button class="rm-modal__close <?= $closeClass ?>" type="button" uk-close aria-label="Close"></button>
<?php endif; ?>
<?php if ($contentWrapper === 'body') : ?>
	<div class="rm-modal__body uk-modal-body"<?= !empty($props['overflow_auto']) ? ' uk-overflow-auto' : '' ?>><?= $content ?></div>
<?php else : ?>
	<?= $content ?>
<?php endif; ?>
<?= $dialog->end() ?>
<?= $modal->end() ?>
<?= $root->end() ?>
