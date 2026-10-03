<?php

namespace YOOtheme;

$positions = [
	'top-left' => [1, 1, 'start', 'start'],
	'top-center' => [1, 2, 'center', 'start'],
	'top-right' => [1, 3, 'end', 'start'],
	'center-left' => [2, 1, 'start', 'center'],
	'center' => [2, 2, 'center', 'center'],
	'center-right' => [2, 3, 'end', 'center'],
	'bottom-left' => [3, 1, 'start', 'end'],
	'bottom-center' => [3, 2, 'center', 'end'],
	'bottom-right' => [3, 3, 'end', 'end'],
];
$position = array_key_exists(($props['position'] ?? ''), $positions) ? $props['position'] : 'top-right';
[$row, $column, $justify, $align] = $positions[$position];
$span = in_array(($props['span'] ?? 'cell'), ['cell', 'row', 'cover'], true) ? $props['span'] : 'cell';
$direction = ($props['direction'] ?? 'column') === 'row' ? 'row' : 'column';
$gap = in_array(($props['gap'] ?? 'small'), ['none', 'small', 'default', 'large'], true)
	? $props['gap'] : 'small';
$inset = in_array(($props['inset'] ?? 'small'), ['none', 'small', 'default', 'large'], true)
	? $props['inset'] : 'small';
$visibility = in_array(($props['visibility_mode'] ?? 'always'), ['always', 'interaction', 'focus'], true)
	? $props['visibility_mode'] : 'always';
$animation = in_array(($props['animation'] ?? 'fade'), ['fade', 'slide-up', 'slide-down', 'scale'], true)
	? $props['animation'] : 'fade';
$breakpoint = in_array(($props['position_breakpoint'] ?? 'all'), ['all', 's', 'm', 'l', 'xl'], true)
	? $props['position_breakpoint'] : 'all';
$fallback = ($props['fallback_display'] ?? 'inline') === 'hidden' ? 'hidden' : 'inline';
$zIndex = max(1, min(50, (int) ($props['z_index'] ?? 10)));
$content = trim($builder->render($children, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []));

// `position` is a reserved Builder property. YOOtheme's global element
// transform runs before this template and adds its own uk-position class plus
// empty position styles to $attrs. This element uses the property for its
// internal 3 x 3 grid, so remove only those generated attributes and preserve
// custom classes/styles from the Advanced tab.
if (isset($attrs['class']))
{
	$attrs['class'] = array_values(array_filter(
		(array) $attrs['class'],
		static fn($class) => !str_contains((string) $class, 'uk-position-{position}')
	));
}
if (isset($attrs['style']))
{
	$attrs['style'] = array_values(array_filter(
		(array) $attrs['style'],
		static fn($style) => !str_contains((string) $style, '{position_')
	));
	if (!$attrs['style'])
	{
		unset($attrs['style']);
	}
}

$el = $this->el('div', [
	'class' => [
		'rm-product-card__position',
		'rm-product-card__position--' . $position,
		'rm-product-card__position--span-' . $span,
		'rm-product-card__position--fallback-hidden' => $fallback === 'hidden',
	],
	'data-rm-product-card-position' => true,
	'data-position-breakpoint' => $breakpoint,
	'data-visibility-mode' => $visibility,
	'data-animation' => $animation,
	'style' => '--rm-card-position-row:' . $row
		. ';--rm-card-position-column:' . $column
		. ';--rm-card-position-justify:' . $justify
		. ';--rm-card-position-align:' . $align
		. ';--rm-card-position-z:' . $zIndex,
]);
?>
<?= $el($props, $attrs) ?>
	<div class="rm-product-card__position-content rm-product-card__position-content--<?= $direction ?> rm-product-card__position-content--gap-<?= $gap ?> rm-product-card__position-content--inset-<?= $inset ?>">
		<?= $content ?>
	</div>
<?= $el->end() ?>
