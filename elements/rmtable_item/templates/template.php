<?php

$rowType = in_array(($props['row_type'] ?? 'body'), ['head', 'body', 'foot'], true)
	? ($props['row_type'] ?? 'body') : 'body';
$labels = is_array($column_labels ?? null) ? $column_labels : [];
$responsive = in_array(($table_responsive ?? 'scroll'), ['scroll', 'stack', 'cards', 'none'], true)
	? $table_responsive : 'scroll';

$row = $this->el('tr', [
	'class' => [
		'el-item',
		'rm-table__row',
		'uk-active' => !empty($props['row_active']),
		'uk-background-muted' => ($props['row_background'] ?? '') === 'muted',
		'uk-background-primary uk-light' => ($props['row_background'] ?? '') === 'primary',
		'uk-background-secondary uk-light' => ($props['row_background'] ?? '') === 'secondary',
	],
	'data-section' => $rowType,
]);
?>
<?= $row($props, $attrs) ?>
<?php foreach ($children as $index => $cell) : ?>
	<?= $builder->render($cell, [
		'cell_index' => $index,
		'column_label' => $labels[$index] ?? '',
		'row_type' => $rowType,
		'table_responsive' => $responsive,
	]) ?>
<?php endforeach; ?>
<?= $row->end() ?>
