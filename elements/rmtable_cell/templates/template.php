<?php

$rowType = in_array(($row_type ?? 'body'), ['head', 'body', 'foot'], true) ? $row_type : 'body';
$cellType = in_array(($props['cell_type'] ?? 'auto'), ['auto', 'header', 'data'], true)
	? ($props['cell_type'] ?? 'auto') : 'auto';
$tag = $cellType === 'header' || ($cellType === 'auto' && $rowType === 'head') ? 'th' : 'td';
$scope = in_array(($props['scope'] ?? 'auto'), ['auto', 'col', 'row', 'colgroup', 'rowgroup'], true)
	? ($props['scope'] ?? 'auto') : 'auto';
if ($tag === 'th' && $scope === 'auto')
{
	$scope = $rowType === 'head' ? 'col' : 'row';
}
$sort = in_array(($props['aria_sort'] ?? ''), ['', 'ascending', 'descending', 'none'], true)
	? ($props['aria_sort'] ?? '') : '';
$colspan = max(1, min(24, (int) ($props['colspan'] ?? 1)));
$rowspan = max(1, min(100, (int) ($props['rowspan'] ?? 1)));
$width = in_array(($props['cell_width'] ?? ''), ['', 'shrink', 'expand', 'small', 'medium', 'large'], true)
	? ($props['cell_width'] ?? '') : '';
$align = in_array(($props['text_align'] ?? ''), ['', 'left', 'center', 'right', 'justify'], true)
	? ($props['text_align'] ?? '') : '';
$vertical = in_array(($props['vertical_align'] ?? ''), ['', 'top', 'middle', 'bottom'], true)
	? ($props['vertical_align'] ?? '') : '';
$background = in_array(($props['cell_background'] ?? ''), ['', 'default', 'muted', 'primary', 'secondary'], true)
	? ($props['cell_background'] ?? '') : '';
$visibilityMode = in_array(($props['visibility_mode'] ?? ''), ['', 'visible-s', 'visible-m', 'hidden-m'], true)
	? ($props['visibility_mode'] ?? '') : '';
$mobileLabel = trim((string) ($props['mobile_label'] ?? '')) ?: trim((string) ($column_label ?? ''));
$content = trim($builder->render($children));

$cell = $this->el($tag, [
	'class' => [
		'el-item',
		'rm-table__cell',
		'rm-table__cell--' . $vertical => $vertical,
		'uk-table-shrink' => $width === 'shrink',
		'uk-table-expand' => $width === 'expand',
		'uk-width-' . $width => in_array($width, ['small', 'medium', 'large'], true),
		'uk-text-' . $align => $align,
		'uk-text-nowrap' => !empty($props['nowrap']),
		'uk-padding-remove' => !empty($props['remove_padding']),
		'uk-background-' . $background => $background,
		'uk-light' => in_array($background, ['primary', 'secondary'], true),
		'uk-visible@s' => $visibilityMode === 'visible-s',
		'uk-visible@m' => $visibilityMode === 'visible-m',
		'uk-hidden@m' => $visibilityMode === 'hidden-m',
	],
	'colspan' => $colspan > 1 ? $colspan : false,
	'rowspan' => $rowspan > 1 ? $rowspan : false,
	'scope' => $tag === 'th' ? $scope : false,
	'aria-sort' => $tag === 'th' && $sort ? $sort : false,
	'data-label' => $rowType !== 'head' && $mobileLabel !== '' ? $mobileLabel : false,
]);
?>
<?= $cell($props, $attrs) ?>
<div class="rm-table__cell-content">
	<?php if ($content !== '') : ?>
		<?= $content ?>
	<?php else : ?>
		<?= (string) ($props['text'] ?? '') ?>
	<?php endif; ?>
</div>
<?= $cell->end() ?>
