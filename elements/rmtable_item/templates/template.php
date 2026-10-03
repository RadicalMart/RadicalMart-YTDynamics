<?php

$rowType = in_array(($props['row_type'] ?? 'body'), ['head', 'body', 'foot'], true)
	? ($props['row_type'] ?? 'body') : 'body';
$labels = is_array($column_labels ?? null) ? $column_labels : [];
$responsive = in_array(($table_responsive ?? 'scroll'), ['scroll', 'stack', 'cards', 'uikit', 'none'], true)
	? $table_responsive : 'scroll';
$background = in_array(($props['row_background'] ?? ''), ['', 'muted', 'primary', 'secondary'], true)
	? ($props['row_background'] ?? '') : '';
$divider = in_array(($props['row_divider'] ?? ''), ['', 'top', 'bottom', 'both'], true)
	? ($props['row_divider'] ?? '') : '';
$visibility = in_array(($props['row_visibility'] ?? ''), ['', 'phone', 'visible-s', 'visible-m', 'visible-l', 'visible-xl', 'hidden-s', 'hidden-m', 'hidden-l', 'hidden-xl'], true)
	? ($props['row_visibility'] ?? '') : '';
$cardStyle = in_array(($props['mobile_card_style'] ?? ''), ['', 'default', 'muted', 'primary', 'secondary'], true)
	? ($props['mobile_card_style'] ?? '') : '';
$cardShadow = in_array(($props['mobile_card_shadow'] ?? ''), ['', 'none', 'small', 'medium', 'large'], true)
	? ($props['mobile_card_shadow'] ?? '') : '';

$row = $this->el('tr', [
	'class' => [
		'el-item',
		'rm-table__row',
		'uk-active' => !empty($props['row_active']),
		'uk-background-muted' => $background === 'muted',
		'uk-background-primary uk-light' => $background === 'primary',
		'uk-background-secondary uk-light' => $background === 'secondary',
		'rm-table__row--divider-' . $divider => $divider,
		'uk-hidden@s' => in_array($visibility, ['phone', 'hidden-s'], true),
		'rm-table__row--' . $visibility => str_starts_with($visibility, 'visible-'),
		'uk-hidden@m' => $visibility === 'hidden-m',
		'uk-hidden@l' => $visibility === 'hidden-l',
		'uk-hidden@xl' => $visibility === 'hidden-xl',
		'rm-table__row--mobile-' . $cardStyle => $cardStyle,
		'rm-table__row--mobile-shadow-' . $cardShadow => $cardShadow,
	],
	'data-section' => $rowType,
	'data-rm-table-static-inverse' => in_array($background, ['primary', 'secondary'], true) ? 'true' : 'false',
	'data-rm-table-mobile-style' => $cardStyle ?: 'inherit',
	'aria-label' => trim((string) ($props['row_aria_label'] ?? '')) ?: false,
]);
?>
<?= $row($props, $attrs) ?>
<?php $columnIndex = 0; ?>
<?php foreach ($children as $cell) : ?>
	<?= $builder->render($cell, [
		'cell_index' => $columnIndex,
		'column_label' => $labels[$columnIndex] ?? '',
		'row_type' => $rowType,
		'table_responsive' => $responsive,
	]) ?>
	<?php $columnIndex += max(1, min(24, (int) ($cell->props['colspan'] ?? 1))); ?>
<?php endforeach; ?>
<?= $row->end() ?>
