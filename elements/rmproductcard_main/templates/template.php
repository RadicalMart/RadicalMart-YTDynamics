<?php

namespace YOOtheme;

$layout = ($props['layout'] ?? 'flow') === 'column' ? 'column' : 'flow';
$heightMode = ($props['height_mode'] ?? 'natural') === 'fill' ? 'fill' : 'natural';
$verticalAlign = in_array(($props['vertical_align'] ?? 'top'), ['top', 'center', 'bottom', 'between'], true)
	? (string) ($props['vertical_align'] ?? 'top') : 'top';
$itemsGap = in_array(($props['items_gap'] ?? 'none'), ['none', 'small', 'default', 'large'], true)
	? (string) ($props['items_gap'] ?? 'none') : 'none';
$el = $this->el('div', ['class' => [
	'rm-product-card__main',
	'uk-flex uk-flex-column rm-product-card__main--column' => $layout === 'column',
	'uk-flex-1 rm-product-card__main--height-fill' => $layout === 'column' && $heightMode === 'fill',
	'rm-product-card__main--align-' . $verticalAlign => $layout === 'column' && $heightMode === 'fill',
	'rm-product-card__main--gap-' . $itemsGap => $layout === 'column' && $itemsGap !== 'none',
]]);
$content = trim($builder->render($children, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []));
?>
<?= $el($props, $attrs) ?>
<?= $content ?>
<?= $el->end() ?>
