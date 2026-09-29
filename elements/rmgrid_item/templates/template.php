<?php

$content = $builder->render($children);
$panelStyle = in_array(($props['panel_style'] ?? ''), [
	'',
	'card-default',
	'card-primary',
	'card-secondary',
	'card-hover',
	'card-overlay',
	'tile-default',
	'tile-muted',
	'tile-primary',
	'tile-secondary',
], true) ? ($props['panel_style'] ?? '') : '';
$panelPadding = in_array(($props['panel_padding'] ?? ''), ['', 'small', 'default', 'large'], true)
	? ($props['panel_padding'] ?? '') : '';
$itemMaxwidth = in_array(($props['item_maxwidth'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', '2xlarge'], true)
	? ($props['item_maxwidth'] ?? '') : '';
$props['panel_style'] = $panelStyle;
$props['panel_padding'] = $panelPadding;
$props['item_maxwidth'] = $itemMaxwidth;

$classes = [
	'el-item',
	'rm-grid-item',
	'uk-margin-auto uk-width-{item_maxwidth}',
	'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
	'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
	'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding}',
	'uk-card-body {@panel_style: card-.*} {@panel_padding}',
];

$itemElement = $props['item_element'] ?? $props['html_element'] ?? '';
$el = $this->el($itemElement ?: 'div', [

	'class' => $classes,
]);

?>

<?= $el($props, $attrs) ?>
<div class="rm-grid-item__content"><?= $content ?></div>
<?= $el->end() ?>
