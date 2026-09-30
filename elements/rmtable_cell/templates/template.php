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
$width = in_array(($props['cell_width'] ?? ''), ['', 'shrink', 'expand', '1-6', '1-5', '1-4', '1-3', '2-5', '1-2', '3-5', '2-3', '3-4', '4-5', '5-6', 'small', 'medium', 'large'], true)
	? ($props['cell_width'] ?? '') : '';
$align = in_array(($props['text_align'] ?? ''), ['', 'left', 'center', 'right', 'justify'], true)
	? ($props['text_align'] ?? '') : '';
$vertical = in_array(($props['vertical_align'] ?? ''), ['', 'top', 'middle', 'bottom'], true)
	? ($props['vertical_align'] ?? '') : '';
$background = in_array(($props['cell_background'] ?? ''), ['', 'default', 'muted', 'primary', 'secondary'], true)
	? ($props['cell_background'] ?? '') : '';
$visibilityMode = in_array(($props['visibility_mode'] ?? ''), ['', 'phone', 'visible-s', 'visible-m', 'visible-l', 'visible-xl', 'hidden-s', 'hidden-m', 'hidden-l', 'hidden-xl'], true)
	? ($props['visibility_mode'] ?? '') : '';
$wrapMode = in_array(($props['wrap_mode'] ?? 'normal'), ['normal', 'nowrap', 'truncate', 'break'], true)
	? ($props['wrap_mode'] ?? 'normal') : 'normal';
$textStyle = in_array(($props['text_style'] ?? ''), ['', 'muted', 'meta', 'lead', 'small', 'large', 'bold'], true)
	? ($props['text_style'] ?? '') : '';
$mobileBehavior = in_array(($props['mobile_behavior'] ?? 'show'), ['show', 'hide', 'full'], true)
	? ($props['mobile_behavior'] ?? 'show') : 'show';
$mobileLabelPosition = in_array(($props['mobile_label_position'] ?? ''), ['', 'left', 'top', 'hidden'], true)
	? ($props['mobile_label_position'] ?? '') : '';
$mobileTextAlign = in_array(($props['mobile_text_align'] ?? 'left'), ['left', 'center', 'right'], true)
	? ($props['mobile_text_align'] ?? 'left') : 'left';
$mobileOrder = in_array(($props['mobile_order'] ?? ''), ['', 'first', 'last'], true)
	? ($props['mobile_order'] ?? '') : '';
$mobileLabel = trim((string) ($props['mobile_label'] ?? '')) ?: trim((string) ($column_label ?? ''));
$headers = array_filter(
	preg_split('/\s+/', trim((string) ($props['headers'] ?? ''))) ?: [],
	static fn(string $id): bool => (bool) preg_match('/^[A-Za-z][A-Za-z0-9_:.-]*$/', $id),
);
$content = trim($builder->render($children));

$cell = $this->el($tag, [
	'class' => [
		'el-item',
		'rm-table__cell',
		'rm-table__cell--' . $vertical => $vertical,
		'uk-table-shrink' => $width === 'shrink',
		'uk-table-expand' => $width === 'expand',
		'uk-width-' . $width => $width && !in_array($width, ['shrink', 'expand'], true),
		'uk-text-' . $align => $align,
		'uk-padding-remove' => !empty($props['remove_padding']),
		'uk-background-' . $background => $background,
		'uk-light' => in_array($background, ['primary', 'secondary'], true),
		'uk-table-link' => !empty($props['link_cell']),
		'uk-hidden@s' => in_array($visibilityMode, ['phone', 'hidden-s'], true),
		'rm-table__cell--' . $visibilityMode => str_starts_with($visibilityMode, 'visible-'),
		'uk-hidden@m' => $visibilityMode === 'hidden-m',
		'uk-hidden@l' => $visibilityMode === 'hidden-l',
		'uk-hidden@xl' => $visibilityMode === 'hidden-xl',
		'rm-table__cell--mobile-hidden' => $mobileBehavior === 'hide',
		'rm-table__cell--mobile-full' => $mobileBehavior === 'full',
		'rm-table__cell--label-' . $mobileLabelPosition => $mobileLabelPosition,
		'rm-table__cell--mobile-align-' . $mobileTextAlign,
		'rm-table__cell--mobile-order-' . $mobileOrder => $mobileOrder,
	],
	'colspan' => $colspan > 1 ? $colspan : false,
	'rowspan' => $rowspan > 1 ? $rowspan : false,
	'scope' => $tag === 'th' ? $scope : false,
	'aria-sort' => $tag === 'th' && $sort ? $sort : false,
	'abbr' => $tag === 'th' && trim((string) ($props['header_abbr'] ?? '')) !== '' ? trim((string) $props['header_abbr']) : false,
	'headers' => $tag === 'td' && $headers ? implode(' ', $headers) : false,
	'data-label' => $rowType !== 'head' && $mobileLabel !== '' ? $mobileLabel : false,
	'data-column' => max(0, (int) ($cell_index ?? 0)) + 1,
]);
?>
<?= $cell($props, $attrs) ?>
<div class="rm-table__cell-content<?= $wrapMode !== 'normal' ? ' uk-text-' . $wrapMode : '' ?><?= $textStyle ? ' uk-text-' . $textStyle : '' ?>">
	<?php if ($content !== '') : ?>
		<?= $content ?>
	<?php else : ?>
		<?= (string) ($props['text'] ?? '') ?>
	<?php endif; ?>
</div>
<?= $cell->end() ?>
