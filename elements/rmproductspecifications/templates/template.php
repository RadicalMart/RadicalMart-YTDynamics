<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null;
$productId = (int) ($props['product_id'] ?? 0);
if (!$product && $productId < 1)
{
	$input = Factory::getApplication()->getInput();
	if ($input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product')
	{
		$productId = $input->getInt('id');
	}
}
if (!$product && $productId > 0)
{
	try
	{
		$product = ProductPresentation::get($productId);
	}
	catch (\Throwable)
	{
		$product = null;
	}
}
if (!$product)
{
	return;
}

$layout = in_array(($props['layout'] ?? 'description-list'), ['description-list', 'table', 'grid'], true)
	? ($props['layout'] ?? 'description-list') : 'description-list';
$showVariants = !array_key_exists('show_variant_fields', $props) || !empty($props['show_variant_fields']);
$showTitles = !array_key_exists('show_fieldset_titles', $props) || !empty($props['show_fieldset_titles']);
$divider = !array_key_exists('divider', $props) || !empty($props['divider']);
$selectedFields = array_values(array_filter(array_map(
	static fn($alias): string => trim((string) $alias),
	(array) ($props['selected_fields'] ?? []),
)));
$selectedFieldMap = array_fill_keys($selectedFields, true);
$fieldLimit = max(0, min(24, (int) ($props['field_limit'] ?? 0)));
$fieldsRemaining = $fieldLimit ?: PHP_INT_MAX;
$legacyColumns = in_array((string) ($props['columns'] ?? '2'), ['1', '2', '3', '4'], true)
	? (string) ($props['columns'] ?? '2') : '2';
$columnValue = static fn($value, string $fallback): string => in_array((string) $value, ['1', '2', '3', '4'], true)
	? (string) $value : $fallback;
$columnsSmall = $columnValue($props['columns_small'] ?? '1', '1');
$columnsMedium = $columnValue($props['columns_medium'] ?? $legacyColumns, $legacyColumns);
$columnsLarge = $columnValue($props['columns_large'] ?? $legacyColumns, $legacyColumns);
$tableResponsive = in_array(($props['table_responsive'] ?? 'scroll'), ['scroll', 'stack'], true)
	? ($props['table_responsive'] ?? 'scroll') : 'scroll';
$tableStackBreakpoint = in_array(($props['table_stack_breakpoint'] ?? 's'), ['s', 'm'], true)
	? ($props['table_stack_breakpoint'] ?? 's') : 's';
$fieldsets = [];
foreach ((array) ($product['fieldsets'] ?? []) as $fieldset)
{
	$fields = array_values(array_filter(
		(array) ($fieldset['fields'] ?? []),
		static fn(array $field): bool => ($showVariants || empty($field['variant']))
			&& (!$selectedFieldMap || isset($selectedFieldMap[(string) ($field['alias'] ?? '')])),
	));
	if ($fieldsRemaining < count($fields))
	{
		$fields = array_slice($fields, 0, $fieldsRemaining);
	}
	if ($fields)
	{
		$fieldset['fields'] = $fields;
		$fieldsets[] = $fieldset;
		$fieldsRemaining -= count($fields);
		if ($fieldsRemaining <= 0)
		{
			break;
		}
	}
}
if (!$fieldsets)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$el = $this->el('div', [
	'class' => ['rm-product-specifications', 'rm-product-specifications--' . $layout],
	'data-rm-product-specifications' => true,
	'data-layout' => $layout,
	'data-show-fieldset-titles' => $showTitles ? 'true' : 'false',
	'data-show-variant-fields' => $showVariants ? 'true' : 'false',
	'data-selected-fields' => implode(',', $selectedFields),
	'data-field-limit' => (string) $fieldLimit,
	'data-divider' => $divider ? 'true' : 'false',
	'data-striped' => !empty($props['striped']) ? 'true' : 'false',
	'data-columns-small' => $columnsSmall,
	'data-columns-medium' => $columnsMedium,
	'data-columns-large' => $columnsLarge,
	'data-table-responsive' => $tableResponsive,
	'data-table-stack-breakpoint' => $tableStackBreakpoint,
]);
$renderValue = static fn(array $field): string => (string) ($field['value'] ?? htmlspecialchars((string) ($field['text'] ?? ''), ENT_QUOTES, 'UTF-8'));
?>
<?= $el($props, $attrs) ?>
<div class="rm-product-specifications__content">
	<?php foreach ($fieldsets as $fieldset) : ?>
	<section class="rm-product-specifications__fieldset">
		<?php if ($showTitles && trim((string) ($fieldset['title'] ?? '')) !== '') : ?>
		<h3 class="rm-product-specifications__title uk-h4"><?= htmlspecialchars((string) $fieldset['title'], ENT_QUOTES, 'UTF-8') ?></h3>
		<?php endif ?>
		<?php if ($layout === 'table') : ?>
		<div class="rm-product-specifications__table-wrap<?= $tableResponsive === 'scroll' ? ' uk-overflow-auto' : '' ?>">
		<table class="rm-product-specifications__table uk-table uk-table-small<?= $divider ? ' uk-table-divider' : '' ?><?= !empty($props['striped']) ? ' uk-table-striped' : '' ?>"><tbody>
			<?php foreach ($fieldset['fields'] as $field) : ?><tr class="rm-product-specifications__item"><th class="rm-product-specifications__label" scope="row"><?= htmlspecialchars((string) $field['title'], ENT_QUOTES, 'UTF-8') ?></th><td class="rm-product-specifications__value"><?= $renderValue($field) ?></td></tr><?php endforeach ?>
		</tbody></table></div>
		<?php elseif ($layout === 'grid') : ?>
		<div class="rm-product-specifications__grid uk-child-width-1-1 uk-child-width-1-<?= $columnsSmall ?>@s uk-child-width-1-<?= $columnsMedium ?>@m uk-child-width-1-<?= $columnsLarge ?>@l<?= $divider ? ' uk-grid-divider' : '' ?>" uk-grid>
			<?php foreach ($fieldset['fields'] as $field) : ?><div class="rm-product-specifications__item"><div class="rm-product-specifications__label uk-text-meta"><?= htmlspecialchars((string) $field['title'], ENT_QUOTES, 'UTF-8') ?></div><div class="rm-product-specifications__value uk-margin-small-top"><?= $renderValue($field) ?></div></div><?php endforeach ?>
		</div>
		<?php else : ?>
		<dl class="rm-product-specifications__list uk-description-list<?= $divider ? ' uk-description-list-divider' : '' ?>">
			<?php foreach ($fieldset['fields'] as $field) : ?><div class="rm-product-specifications__item"><dt class="rm-product-specifications__label"><?= htmlspecialchars((string) $field['title'], ENT_QUOTES, 'UTF-8') ?></dt><dd class="rm-product-specifications__value"><?= $renderValue($field) ?></dd></div><?php endforeach ?>
		</dl>
		<?php endif ?>
	</section>
	<?php endforeach ?>
</div>
<?= $el->end() ?>
