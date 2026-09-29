<?php

use Joomla\CMS\Factory;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.table');

$style = in_array(($props['table_style'] ?? ''), ['', 'divider', 'striped'], true)
	? ($props['table_style'] ?? '') : 'divider';
$size = in_array(($props['table_size'] ?? ''), ['', 'small', 'large'], true)
	? ($props['table_size'] ?? '') : '';
$responsive = in_array(($props['responsive_mode'] ?? 'scroll'), ['scroll', 'stack', 'cards', 'none'], true)
	? ($props['responsive_mode'] ?? 'scroll') : 'scroll';
$breakpoint = in_array(($props['responsive_breakpoint'] ?? 'm'), ['s', 'm', 'l', 'xl'], true)
	? ($props['responsive_breakpoint'] ?? 'm') : 'm';
$captionPosition = ($props['caption_position'] ?? 'top') === 'bottom' ? 'bottom' : 'top';

$sections = ['head' => [], 'body' => [], 'foot' => []];
foreach ($children as $child)
{
	$type = in_array(($child->props['row_type'] ?? 'body'), ['head', 'body', 'foot'], true)
		? ($child->props['row_type'] ?? 'body') : 'body';
	$sections[$type][] = $child;
}

$columnLabels = [];
if (!empty($sections['head'][0]->children))
{
	foreach ($sections['head'][0]->children as $cell)
	{
		$columnLabels[] = trim(strip_tags((string) ($cell->props['text'] ?? '')));
	}
}

$columnCount = count($columnLabels);
if ($columnCount === 0 && !empty($sections['body'][0]->children))
{
	$columnCount = count($sections['body'][0]->children);
}
$columnCount = max(1, $columnCount);

$itemCss = [];
foreach ($children as $row)
{
	if (!empty($row->props['css']))
	{
		$itemCss[] = $row->props['css'];
	}
	foreach ($row->children ?? [] as $cell)
	{
		if (!empty($cell->props['css']))
		{
			$itemCss[] = $cell->props['css'];
		}
	}
}
$itemCss = preg_replace('/[\r\n\t\h]+/u', ' ', implode("\n", $itemCss));

$root = $this->el('div', [
	'class' => [
		'rm-table-wrapper',
		'rm-table-wrapper--overflow uk-overflow-auto' => $responsive === 'scroll',
		'rm-table-wrapper--sticky-header' => !empty($props['sticky_header']),
		'rm-table-wrapper--sticky-first' => !empty($props['sticky_first']),
		'rm-table-wrapper--sticky-last' => !empty($props['sticky_last']),
	],
]);
$table = $this->el('table', [
	'class' => [
		'rm-table uk-table',
		'uk-table-' . $style => $style,
		'uk-table-' . $size => $size,
		'uk-table-hover' => !empty($props['table_hover']),
		'uk-table-justify' => !empty($props['table_justify']),
		'uk-table-middle' => !empty($props['table_vertical_align']),
		'rm-table--' . $responsive,
		'rm-table--breakpoint-' . $breakpoint => in_array($responsive, ['stack', 'cards'], true),
	],
]);
?>
<?php if ($itemCss !== '') : ?>
	<style class="uk-margin-remove-adjacent"><?= $itemCss ?></style>
<?php endif; ?>
<?= $root($props, $attrs) ?>
	<?= $table() ?>
	<?php if (!empty($props['caption'])) : ?>
		<caption class="rm-table__caption" style="caption-side: <?= $captionPosition ?>"><?= htmlspecialchars((string) $props['caption'], ENT_QUOTES, 'UTF-8') ?></caption>
	<?php endif; ?>
	<?php if ($sections['head']) : ?>
		<thead class="rm-table__head">
		<?php foreach ($sections['head'] as $row) : ?>
			<?= $builder->render($row, ['column_labels' => $columnLabels, 'table_responsive' => $responsive]) ?>
		<?php endforeach; ?>
		</thead>
	<?php endif; ?>
	<tbody class="rm-table__body">
	<?php if ($sections['body']) : ?>
		<?php foreach ($sections['body'] as $row) : ?>
			<?= $builder->render($row, ['column_labels' => $columnLabels, 'table_responsive' => $responsive]) ?>
		<?php endforeach; ?>
	<?php elseif (!empty($props['empty_text'])) : ?>
		<tr class="rm-table__empty"><td colspan="<?= $columnCount ?>" class="rm-table__empty-cell uk-text-center uk-text-muted"><?= htmlspecialchars((string) $props['empty_text'], ENT_QUOTES, 'UTF-8') ?></td></tr>
	<?php endif; ?>
	</tbody>
	<?php if ($sections['foot']) : ?>
		<tfoot class="rm-table__foot">
		<?php foreach ($sections['foot'] as $row) : ?>
			<?= $builder->render($row, ['column_labels' => $columnLabels, 'table_responsive' => $responsive]) ?>
		<?php endforeach; ?>
		</tfoot>
	<?php endif; ?>
	<?= $table->end() ?>
<?= $root->end() ?>
