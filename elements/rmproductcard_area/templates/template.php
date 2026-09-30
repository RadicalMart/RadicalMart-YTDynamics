<?php

namespace YOOtheme;

$area = ($props['area'] ?? 'visible') === 'reveal' ? 'reveal' : 'visible';
$position = ($props['position'] ?? 'after') === 'before' ? 'before' : 'after';
$el = $this->el('div', [
	'class' => [
		'rm-product-card__area',
		'rm-product-card__area--' . $area,
		'rm-product-card__area--' . $area . '-' . $position => $area === 'reveal',
		'rm-product-card__main' => $area === 'visible',
		'rm-product-card__dropdown' => $area === 'reveal',
	],
	'data-rm-card-area' => $area,
]);
?>
<?= $el($props, $attrs) ?>
	<?= $builder->render($children, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []) ?>
<?= $el->end() ?>
