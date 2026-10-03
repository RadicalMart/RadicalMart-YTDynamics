<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.table');
$assets->useScript('plg_system_ytdynamics.table');

$value = static fn(array $allowed, mixed $candidate, string $fallback = ''): string =>
	in_array((string) $candidate, $allowed, true) ? (string) $candidate : $fallback;

$style = $value(['', 'divider', 'striped'], $props['table_style'] ?? '', 'divider');
$size = $value(['', 'small', 'large'], $props['table_size'] ?? '');
$layout = $value(['auto', 'fixed'], $props['table_layout'] ?? 'auto', 'auto');
$headerStyle = $value(['', 'default', 'muted', 'primary', 'secondary'], $props['header_style'] ?? '');
$responsive = $value(['scroll', 'stack', 'cards', 'uikit', 'none'], $props['responsive_mode'] ?? 'scroll', 'scroll');
$breakpoint = $value(['s', 'm', 'l', 'xl'], $props['responsive_breakpoint'] ?? 'm', 'm');
$labelPosition = $value(['auto', 'left', 'top', 'hidden'], $props['mobile_label_position'] ?? 'auto', 'auto');
$labelWidth = $value(['30', '36', '40', '45'], $props['mobile_label_width'] ?? '36', '36');
$labelStyle = $value(['muted', 'default', 'meta', 'bold'], $props['mobile_label_style'] ?? 'muted', 'muted');
$labelGap = $value(['compact', 'small', 'default', 'large'], $props['mobile_label_gap'] ?? 'default', 'default');
$cellPadding = $value(['compact', 'small', 'default', 'large'], $props['mobile_cell_padding'] ?? 'default', 'default');
$stackPadding = $value(['none', 'small', 'default', 'large'], $props['stack_row_padding'] ?? 'default', 'default');
$stackGap = $value(['none', 'small', 'default', 'large'], $props['stack_row_gap'] ?? 'none', 'none');
$cardStyle = $value(['default', 'muted', 'primary', 'secondary'], $props['mobile_card_style'] ?? 'default', 'default');
$cardGap = $value(['none', 'small', 'default', 'large'], $props['mobile_card_gap'] ?? 'default', 'default');
$cardPadding = $value(['small', 'default', 'large'], $props['mobile_card_padding'] ?? 'default', 'default');
$cardMinWidth = $value(['', '240', '300', '360'], $props['mobile_card_min_width'] ?? '');
$mobileFooter = $value(['show', 'hide'], $props['mobile_footer'] ?? 'show', 'show');
$containerStyle = $value(['', 'default', 'primary', 'secondary'], $props['container_style'] ?? '');
$containerSize = $value(['small', 'default'], $props['container_size'] ?? 'default', 'default');
$containerShadow = $value(['', 'small', 'medium', 'large', 'xlarge'], $props['container_shadow'] ?? '');
$minimumWidth = $value(['', '480', '640', '800', '960', '1200'], $props['table_min_width'] ?? '');
$maximumHeight = $value(['', 'small', 'medium', 'large'], $props['table_max_height'] ?? '');
$stickyStyle = $value(['default', 'muted', 'primary', 'secondary'], $props['sticky_header_style'] ?? 'default', 'default');
$stickyOffset = $value(['0', '20', '40', '80'], $props['sticky_offset'] ?? '0', '0');
$captionPosition = ($props['caption_position'] ?? 'top') === 'bottom' ? 'bottom' : 'top';
$captionAlign = $value(['left', 'center', 'right'], $props['caption_align'] ?? 'left', 'left');
$captionStyle = $value(['default', 'muted', 'meta', 'lead', 'small'], $props['caption_style'] ?? 'default', 'default');
$captionHidden = ($props['caption_visibility'] ?? 'visible') === 'hidden';
$caption = trim((string) ($props['caption'] ?? ''));
$scrollLabel = trim((string) ($props['scroll_label'] ?? '')) ?: ($caption ?: Text::_('PLG_YTDYNAMICS_TABLE_SCROLL_REGION'));
$emptyText = trim((string) ($props['empty_text'] ?? ''));
$emptyText = $emptyText !== '' ? Text::_($emptyText) : '';

$sections = ['head' => [], 'body' => [], 'foot' => []];
foreach ($children as $child)
{
	$type = $value(['head', 'body', 'foot'], $child->props['row_type'] ?? 'body', 'body');
	$sections[$type][] = $child;
}

$columnLabels = [];
$headerGrid = [];
foreach ($sections['head'] as $rowIndex => $row)
{
	$columnIndex = 0;
	foreach ($row->children ?? [] as $cell)
	{
		while (!empty($headerGrid[$rowIndex][$columnIndex]))
		{
			$columnIndex++;
		}

		$label = trim((string) ($cell->props['mobile_label'] ?? ''));
		$label = $label !== '' ? $label : trim(strip_tags((string) ($cell->props['text'] ?? '')));
		$colspan = max(1, min(24, (int) ($cell->props['colspan'] ?? 1)));
		$rowspan = max(1, min(100, (int) ($cell->props['rowspan'] ?? 1)));
		for ($rowOffset = 0; $rowOffset < $rowspan; $rowOffset++)
		{
			for ($columnOffset = 0; $columnOffset < $colspan; $columnOffset++)
			{
				$column = $columnIndex + $columnOffset;
				$headerGrid[$rowIndex + $rowOffset][$column] = true;
				if ($label !== '')
				{
					$columnLabels[$column] = $label;
				}
			}
		}
		$columnIndex += $colspan;
	}
}
if ($columnLabels)
{
	ksort($columnLabels);
	$maxColumn = max(array_keys($columnLabels));
	$columnLabels = array_replace(array_fill(0, $maxColumn + 1, ''), $columnLabels);
}

$columnCount = count($columnLabels);
if ($columnCount === 0 && !empty($sections['body'][0]->children))
{
	foreach ($sections['body'][0]->children as $cell)
	{
		$columnCount += max(1, min(24, (int) ($cell->props['colspan'] ?? 1)));
	}
}
$columnCount = max(1, $columnCount);
$scrollRegion = $responsive === 'scroll' || $maximumHeight !== '' || $minimumWidth !== '';
$stickyHeader = !empty($props['sticky_header']) && $maximumHeight !== '';

$frame = $this->el('div', [
	'class' => [
		'rm-table-frame',
		'uk-card uk-card-' . $containerStyle => $containerStyle,
		'uk-light' => in_array($containerStyle, ['primary', 'secondary'], true),
		'uk-card-body' => $containerStyle,
		'uk-card-small' => $containerStyle && $containerSize === 'small',
		'rm-table-frame--border' => !empty($props['container_border']),
		'uk-border-rounded' => !empty($props['container_radius']),
		'uk-box-shadow-' . $containerShadow => $containerShadow,
		'rm-table-frame--scroll-shadow' => $scrollRegion && !empty($props['scroll_shadow']),
	],
]);

$wrapper = $this->el('div', [
	'class' => [
		'rm-table-wrapper',
		'uk-overflow-auto rm-table-wrapper--overflow' => $scrollRegion,
		'rm-table-wrapper--height-' . $maximumHeight => $maximumHeight,
		'rm-table-wrapper--sticky-header rm-table-wrapper--sticky-' . $stickyStyle => $stickyHeader,
		'rm-table-wrapper--responsive-' . $responsive => in_array($responsive, ['stack', 'cards'], true),
		'rm-table-wrapper--breakpoint-' . $breakpoint => in_array($responsive, ['stack', 'cards'], true),
		'rm-table-wrapper--sticky-first' => !empty($props['sticky_first']),
		'rm-table-wrapper--sticky-last' => !empty($props['sticky_last']),
		'rm-table-wrapper--sticky-safe' => !empty($props['sticky_responsive']),
		'rm-table-wrapper--sticky-offset-' . $stickyOffset => $stickyHeader,
	],
	'data-rm-table' => true,
	'data-rm-table-scroll' => $scrollRegion ? true : false,
	'role' => $scrollRegion ? 'region' : false,
	'aria-label' => $scrollRegion && $scrollLabel !== '' ? $scrollLabel : false,
]);

$table = $this->el('table', [
	'class' => [
		'rm-table uk-table',
		'uk-table-' . $style => $style,
		'uk-table-' . $size => $size,
		'uk-table-hover' => !empty($props['table_hover']),
		'uk-table-justify' => !empty($props['table_justify']),
		'uk-table-middle' => !empty($props['table_vertical_align']),
		'uk-table-responsive' => $responsive === 'uikit',
		'rm-table--layout-' . $layout,
		'rm-table--' . $responsive,
		'rm-table--breakpoint-' . $breakpoint => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--labels-' . $labelPosition => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--label-width-' . $labelWidth => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--label-' . $labelStyle => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--label-gap-' . $labelGap => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--cell-padding-' . $cellPadding => in_array($responsive, ['stack', 'cards'], true),
		'rm-table--stack-padding-' . $stackPadding => $responsive === 'stack',
		'rm-table--stack-gap-' . $stackGap => $responsive === 'stack',
		'rm-table--card-' . $cardStyle => $responsive === 'cards',
		'rm-table--card-gap-' . $cardGap => $responsive === 'cards',
		'rm-table--card-padding-' . $cardPadding => $responsive === 'cards',
		'rm-table--card-min-' . $cardMinWidth => $responsive === 'cards' && $cardMinWidth,
		'rm-table--mobile-footer-hidden' => $mobileFooter === 'hide',
		'rm-table--min-' . $minimumWidth => $minimumWidth,
	],
]);

$renderRows = static function (array $rows, string $section) use ($builder, $columnLabels, $responsive): void {
	foreach ($rows as $row)
	{
		echo $builder->render($row, [
			'column_labels' => $columnLabels,
			'table_responsive' => $responsive,
			'row_section' => $section,
		]);
	}
};
?>
<?= $frame($props, $attrs) ?>
	<?= $wrapper() ?>
		<?= $table() ?>
		<?php if ($caption !== '') : ?>
			<caption class="rm-table__caption uk-text-<?= $captionAlign ?><?= $captionHidden ? ' uk-hidden-visually' : '' ?><?= $captionStyle !== 'default' ? ' uk-text-' . $captionStyle : '' ?>" style="caption-side: <?= $captionPosition ?>"><?= htmlspecialchars($caption, ENT_QUOTES, 'UTF-8') ?></caption>
		<?php endif; ?>
		<?php if ($sections['head']) : ?>
			<thead class="rm-table__head<?= $headerStyle ? ' uk-background-' . $headerStyle : '' ?><?= in_array($stickyHeader ? $stickyStyle : $headerStyle, ['primary', 'secondary'], true) ? ' uk-light' : '' ?>">
				<?php $renderRows($sections['head'], 'head'); ?>
			</thead>
		<?php endif; ?>
		<tbody class="rm-table__body">
		<?php if ($sections['body']) : ?>
			<?php $renderRows($sections['body'], 'body'); ?>
		<?php elseif ($emptyText !== '') : ?>
			<tr class="rm-table__empty"><td colspan="<?= $columnCount ?>" class="rm-table__empty-cell uk-text-center uk-text-muted"><?= htmlspecialchars($emptyText, ENT_QUOTES, 'UTF-8') ?></td></tr>
		<?php endif; ?>
		</tbody>
		<?php if ($sections['foot']) : ?>
			<tfoot class="rm-table__foot">
				<?php $renderRows($sections['foot'], 'foot'); ?>
			</tfoot>
		<?php endif; ?>
		<?= $table->end() ?>
	<?= $wrapper->end() ?>
<?= $frame->end() ?>
