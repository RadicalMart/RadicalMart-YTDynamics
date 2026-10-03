<?php

$sourceConfig = $source ?? ($props['source'] ?? null);
$sourceQuery = is_object($sourceConfig)
	? ($sourceConfig->query ?? null)
	: (is_array($sourceConfig) ? ($sourceConfig['query'] ?? null) : null);
$sourceName = is_object($sourceQuery)
	? (string) ($sourceQuery->name ?? '')
	: (is_array($sourceQuery) ? (string) ($sourceQuery['name'] ?? '') : '');
$isDynamicProductCollection = $sourceName === 'radicalMartProducts' && !empty($items) && is_array($items);

if ($isDynamicProductCollection)
{
	$parentProps = isset($element)
		? (is_object($element) ? get_object_vars($element) : (array) $element)
		: [];
	$allowedGaps = ['', 'small', 'medium', 'large', 'collapse'];
	$columnGap = in_array(($parentProps['grid_column_gap'] ?? ''), $allowedGaps, true)
		? (string) ($parentProps['grid_column_gap'] ?? '')
		: '';
	$rowGap = in_array(($parentProps['grid_row_gap'] ?? ''), $allowedGaps, true)
		? (string) ($parentProps['grid_row_gap'] ?? '')
		: '';
	$gapClasses = [];
	$heightMode = in_array(($parentProps['dynamic_height_mode'] ?? 'row'), ['natural', 'row', 'all'], true)
		? (string) ($parentProps['dynamic_height_mode'] ?? 'row')
		: 'row';

	if ($columnGap === $rowGap)
	{
		if ($columnGap !== '')
		{
			$gapClasses[] = 'uk-grid-' . $columnGap;
		}
	}
	else
	{
		if ($columnGap !== '')
		{
			$gapClasses[] = 'uk-grid-column-' . $columnGap;
		}
		if ($rowGap !== '')
		{
			$gapClasses[] = 'uk-grid-row-' . $rowGap;
		}
	}

	if (!empty($parentProps['grid_divider']) && $columnGap !== 'collapse' && $rowGap !== 'collapse')
	{
		$gapClasses[] = 'uk-grid-divider';
	}
	if (!empty($parentProps['grid_column_align']))
	{
		$gapClasses[] = 'uk-flex-center';
	}
	if (!empty($parentProps['grid_row_align']))
	{
		$gapClasses[] = 'uk-flex-middle';
	}

	$requestedLayout = (string) ($props['dynamic_layout'] ?? '');
	$layout = in_array($requestedLayout, ['tile', 'compact', 'list'], true)
		? $requestedLayout
		: \Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState::layout();
	$layout = in_array($layout, ['tile', 'compact', 'list'], true) ? $layout : 'tile';
	$gridClasses = [];
	if ($layout === 'list')
	{
		$gridClasses[] = 'uk-child-width-1-1';
	}
	else
	{
		$columnSettings = [
			'grid_default' => '',
			'grid_small' => '@s',
			'grid_medium' => '@m',
			'grid_large' => '@l',
			'grid_xlarge' => '@xl',
		];
		foreach ($columnSettings as $property => $suffix)
		{
			$value = (string) ($parentProps['dynamic_' . $property] ?? $parentProps[$property] ?? '');
			if (preg_match('/^[1-6]$/', $value))
			{
				$gridClasses[] = 'uk-child-width-1-' . $value . $suffix;
			}
			elseif ($value === 'auto')
			{
				$gridClasses[] = 'uk-child-width-auto' . $suffix;
			}
		}

		// Old saved layouts may predate the native RM Grid column controls.
		// Keep a usable fallback without overriding any configured breakpoint.
		if (!$gridClasses)
		{
			$gridClasses = $layout === 'compact'
				? ['uk-child-width-1-2@s', 'uk-child-width-1-4@xl']
				: ['uk-child-width-1-2@s', 'uk-child-width-1-3@l'];
		}
	}
	$cards = [];

	foreach ($items as $item)
	{
		$itemData = is_object($item) ? get_object_vars($item) : (is_array($item) ? $item : []);
		$productId = (int) ($itemData['id'] ?? $itemData['product_id'] ?? 0);

		if (($itemData['type'] ?? '') === 'variability' && !empty($itemData['products']))
		{
			$products = is_object($itemData['products'])
				? get_object_vars($itemData['products'])
				: (array) $itemData['products'];
			$representative = reset($products);
			$productId = is_object($representative)
				? (int) ($representative->id ?? 0)
				: (is_array($representative) ? (int) ($representative['id'] ?? 0) : 0);
		}

		if ($productId < 1)
		{
			continue;
		}

		try
		{
			$product = \Joomla\Plugin\System\YTDynamics\Service\ProductPresentation::get($productId);
		}
		catch (\Throwable)
		{
			continue;
		}

		$cards[] = '<div class="rm-dynamic-product-grid__cell"><div class="rm-grid-item rm-grid-item--dynamic el-item">'
			. $builder->render($children, ['rmProduct' => $product])
			. '</div></div>';
	}

	if ($cards)
	{
		echo '<div class="rm-dynamic-product-grid rm-dynamic-product-grid--' . $layout . ' uk-grid ' . implode(' ', $gridClasses)
			. ($gapClasses ? ' ' . implode(' ', $gapClasses) : '')
			. ' rm-dynamic-product-grid--height-' . $heightMode
			. ($heightMode !== 'natural' ? ' uk-grid-match' : '')
			. '" data-radicalmart-ajax="products" uk-grid'
			. ($heightMode === 'all'
				? ' uk-height-match="target: > .rm-dynamic-product-grid__cell > .rm-grid-item; row: false"'
				: '')
			. '>'
			. implode('', $cards) . '</div>';
	}

	return;
}

$content = $builder->render($children, isset($rmProduct) && is_array($rmProduct) ? ['rmProduct' => $rmProduct] : []);
$panelStyle = in_array(($props['panel_style'] ?? ''), [
	'',
	'card-default',
	'card-primary',
	'card-secondary',
	'card-hover',
	'card-overlay',
	'tile-default',
	'tile-muted',
	'tile-primary',
	'tile-secondary',
], true) ? ($props['panel_style'] ?? '') : '';
$panelPadding = in_array(($props['panel_padding'] ?? ''), ['', 'small', 'default', 'large'], true)
	? ($props['panel_padding'] ?? '') : '';
$itemMaxwidth = in_array(($props['item_maxwidth'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', '2xlarge'], true)
	? ($props['item_maxwidth'] ?? '') : '';
$props['panel_style'] = $panelStyle;
$props['panel_padding'] = $panelPadding;
$props['item_maxwidth'] = $itemMaxwidth;

$classes = [
	'el-item',
	'rm-grid-item',
	'uk-margin-auto uk-width-{item_maxwidth}',
	'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
	'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
	'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding}',
	'uk-card-body {@panel_style: card-.*} {@panel_padding}',
];

$itemElement = $props['item_element'] ?? $props['html_element'] ?? '';
$el = $this->el($itemElement ?: 'div', [

	'class' => $classes,
]);

?>
<?= $el($props, $attrs) ?>
<div class="rm-grid-item__content"><?= $content ?></div>
<?= $el->end() ?>
