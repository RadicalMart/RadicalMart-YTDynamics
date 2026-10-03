<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
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

$fieldSource = ($props['field_source'] ?? 'system') === 'custom' ? 'custom' : 'system';
$field = $fieldSource === 'custom'
	? 'custom'
	: (in_array(($props['field'] ?? 'title'), ['title', 'image', 'price', 'base_price', 'discount', 'benefit', 'availability', 'stock_quantity', 'unit', 'code', 'category', 'manufacturer', 'description', 'full_description'], true)
		? (string) ($props['field'] ?? 'title') : 'title');
$customFieldAlias = trim((string) ($props['custom_field'] ?? ''));
$customField = null;
if ($field === 'custom' && $customFieldAlias !== '')
{
	foreach ((array) ($product['fieldsets'] ?? []) as $fieldset)
	{
		foreach ((array) ($fieldset['fields'] ?? []) as $candidate)
		{
			if ((string) ($candidate['alias'] ?? '') === $customFieldAlias)
			{
				$customField = $candidate;
				break 2;
			}
		}
	}
}
$customValueMode = ($props['custom_value_mode'] ?? 'formatted') === 'text' ? 'text' : 'formatted';
$emptyText = (string) ($props['empty_text'] ?? '');
$beforeValue = (string) ($props['before_value'] ?? '');
$afterValue = (string) ($props['after_value'] ?? '');
$affixGap = in_array(($props['affix_gap'] ?? 'none'), ['none', 'space', 'small'], true)
	? (string) ($props['affix_gap'] ?? 'none') : 'none';
$hasAffix = $field !== 'image' && ($beforeValue !== '' || $afterValue !== '');
$linkProduct = !array_key_exists('link_product', $props) || !empty($props['link_product']);
$textStyle = in_array(($props['text_style'] ?? ''), ['', 'lead', 'meta', 'small', 'large', 'bold'], true)
	? ($props['text_style'] ?? '') : '';
$textWeight = in_array(($props['text_weight'] ?? ''), ['', 'light', 'normal', 'bold', 'lighter', 'bolder'], true)
	? (string) ($props['text_weight'] ?? '') : '';
$textColor = in_array(($props['text_color'] ?? ''), ['', 'muted', 'emphasis', 'primary', 'secondary', 'success', 'warning', 'danger'], true)
	? (string) ($props['text_color'] ?? '') : '';
$maxLines = max(0, min(6, (int) ($props['max_lines'] ?? 0)));
$minLines = max(0, min(6, (int) ($props['min_lines'] ?? 0)));
$minLinesBreakpoint = in_array(($props['min_lines_breakpoint'] ?? ''), ['', 's', 'm', 'l', 'xl'], true)
	? (string) ($props['min_lines_breakpoint'] ?? '') : '';
$root = $this->el('div', [
	'class' => [
		'rm-product-field',
		'rm-product-field--' . $field,
		'rm-product-field--affixed' => $hasAffix,
		'rm-product-field--affix-gap-' . $affixGap => $hasAffix && $affixGap !== 'none',
		'uk-text-' . $textStyle => $textStyle !== '',
		'uk-text-' . $textWeight => $textWeight !== '',
		'uk-text-' . $textColor => $textColor !== '',
		'rm-product-field--clamp-' . $maxLines => $maxLines > 0,
		'rm-product-field--min-lines-' . ($minLinesBreakpoint !== '' ? $minLinesBreakpoint . '-' : '') . $minLines => $minLines > 0,
	],
	'data-rm-product-field' => $field === 'custom' ? 'custom:' . $customFieldAlias : $field,
	'data-rm-product-custom-field' => $field === 'custom' ? true : null,
	'data-field-alias' => $field === 'custom' ? $customFieldAlias : null,
	'data-value-mode' => $field === 'custom' ? $customValueMode : null,
	'data-show-label' => $field === 'custom' && !empty($props['show_custom_label']) ? 'true' : null,
	'data-label-separator' => $field === 'custom' ? (string) ($props['custom_label_separator'] ?? ': ') : null,
	'data-empty-text' => $field === 'custom' ? $emptyText : null,
	'hidden' => $field === 'custom' && !$customField && $emptyText === '',
]);
$url = htmlspecialchars((string) ($product['link'] ?? ''), ENT_QUOTES, 'UTF-8');
$title = htmlspecialchars((string) ($product['title'] ?? ''), ENT_QUOTES, 'UTF-8');
?>
<?= $root($props, $attrs) ?>
<?php if ($hasAffix && $beforeValue !== '') : ?><span class="rm-product-field__before"><?= htmlspecialchars($beforeValue, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
<?php if ($field === 'custom') :
	$customTitle = (string) ($customField['title'] ?? $customFieldAlias);
	$customValue = $customField
		? ($customValueMode === 'formatted'
			? (string) ($customField['value'] ?? '')
			: htmlspecialchars((string) ($customField['text'] ?? ''), ENT_QUOTES, 'UTF-8'))
		: htmlspecialchars($emptyText, ENT_QUOTES, 'UTF-8');
	?>
	<span class="rm-product-field__custom-label" data-rm-product-custom-label<?= empty($props['show_custom_label']) ? ' hidden' : '' ?>><?= htmlspecialchars($customTitle . (string) ($props['custom_label_separator'] ?? ': '), ENT_QUOTES, 'UTF-8') ?></span>
	<span class="rm-product-field__custom-value" data-rm-product-custom-value><?= $customValue ?></span>
<?php elseif ($field === 'image') :
	$media = (array) ($product['media'] ?? []);
	$image = (array) ($media[0] ?? []);
	$src = htmlspecialchars((string) ($image['src'] ?? ''), ENT_QUOTES, 'UTF-8');
	$alt = htmlspecialchars((string) ($image['alt'] ?? $product['title'] ?? ''), ENT_QUOTES, 'UTF-8');
	$fit = ($props['image_fit'] ?? 'contain') === 'cover' ? 'cover' : 'contain';
	$ratio = in_array(($props['image_ratio'] ?? ''), ['', '1/1', '4/3', '3/2', '16/9', '1:1', '4:3', '3:2', '16:9'], true)
		? ($props['image_ratio'] ?? '') : '';
	// Older saved layouts used `4:3`; normalise it as well so the media box
	// always reserves its height before a lazy image has loaded.
	$ratio = str_replace(':', '/', $ratio);
	$height = trim((string) ($props['image_height'] ?? ''));
	$height = preg_match('/^(?:auto|\d+(?:\.\d+)?(?:px|r?em|%|v[hw]|svh|lvh|dvh))$/i', $height) ? $height : '';
	$imageStyle = ['object-fit: ' . $fit];
	if ($height !== '') $imageStyle[] = 'height: ' . $height;
	elseif ($ratio !== '') $imageStyle[] = 'aspect-ratio: ' . $ratio;
	$resizeWidth = max(0, min(2400, (int) ($props['image_resize_width'] ?? 800)));
	$resizeHeight = max(0, min(2400, (int) ($props['image_resize_height'] ?? 0)));
	$imageElement = $src !== '' ? $this->el('image', [
		'class' => ['rm-product-field__image', 'uk-width-1-1'],
		'data-rm-product-image' => true,
		'src' => html_entity_decode($src, ENT_QUOTES, 'UTF-8'),
		'alt' => html_entity_decode($alt, ENT_QUOTES, 'UTF-8'),
		'loading' => ($props['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy',
		'width' => $resizeWidth ?: null,
		'height' => $resizeHeight ?: null,
		'thumbnail' => $resizeWidth > 0 || $resizeHeight > 0,
		'style' => implode('; ', $imageStyle),
	]) : null;
	?>
	<?php if ($linkProduct && $url !== '') : ?><a class="rm-product-field__link uk-display-block" href="<?= $url ?>" data-rm-product-link><?php endif; ?>
	<?php if ($imageElement) : ?><?= $imageElement($props) ?><?php else : ?><img class="rm-product-field__image uk-width-1-1" data-rm-product-image alt="<?= $alt ?>" loading="<?= ($props['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy' ?>" style="<?= htmlspecialchars(implode('; ', $imageStyle), ENT_QUOTES, 'UTF-8') ?>" hidden><?php endif; ?>
	<?php if ($linkProduct && $url !== '') : ?></a><?php endif; ?>
<?php elseif ($field === 'title') :
	$tag = in_array(($props['title_element'] ?? 'h3'), ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'], true)
		? ($props['title_element'] ?? 'h3') : 'h3';
	$titleStyle = in_array(($props['title_style'] ?? ''), ['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], true)
		? ($props['title_style'] ?? '') : '';
	?>
	<<?= $tag ?> class="rm-product-field__title<?= $titleStyle !== '' ? ' uk-' . $titleStyle : '' ?> uk-margin-remove">
		<?php if ($linkProduct && $url !== '') : ?><a class="rm-product-field__link uk-link-heading" href="<?= $url ?>" data-rm-product-link data-rm-product-title><?= $title ?></a><?php else : ?><span data-rm-product-title><?= $title ?></span><?php endif; ?>
	</<?= $tag ?>>
<?php elseif ($field === 'price') :
	$price = (array) ($product['price'] ?? []);
	$discountEnabled = !empty($price['discountEnabled']);
	$quantity = (array) ($product['quantity'] ?? []);
	$unitStyle = ($props['unit_style'] ?? 'short') === 'long' ? 'long' : 'short';
	$unit = (string) ($unitStyle === 'long'
		? ($quantity['unit'] ?? $quantity['units'] ?? '')
		: ($quantity['unitShort'] ?? $quantity['units'] ?? ''));
	$showUnit = !empty($props['show_unit']);
	?>
	<div class="rm-product-field__price" data-rm-product-price
		 data-show-base="<?= !empty($props['show_base_price']) ? 'true' : 'false' ?>"
		 data-show-discount="<?= !empty($props['show_discount']) ? 'true' : 'false' ?>"
		 data-show-unit="<?= $showUnit ? 'true' : 'false' ?>"
		 data-unit-style="<?= $unitStyle ?>">
		<s class="rm-product-field__price-base uk-text-muted uk-margin-small-right" data-rm-product-price-base<?= !$discountEnabled || empty($props['show_base_price']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($price['base'] ?? ''), ENT_QUOTES, 'UTF-8') ?></s>
		<span class="rm-product-field__price-final" data-rm-product-price-final><?= htmlspecialchars((string) ($price['final'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
		<span class="rm-product-field__price-unit" data-rm-product-price-unit-wrap<?= !$showUnit || $unit === '' ? ' hidden' : '' ?>><span class="rm-product-field__price-unit-separator"><?= htmlspecialchars((string) ($props['unit_separator'] ?? '/'), ENT_QUOTES, 'UTF-8') ?></span><span data-rm-product-price-unit><?= htmlspecialchars($unit, ENT_QUOTES, 'UTF-8') ?></span></span>
		<span class="rm-product-field__discount uk-label uk-label-danger uk-margin-small-left" data-rm-product-discount<?= !$discountEnabled || empty($props['show_discount']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($price['discount'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
	</div>
<?php elseif ($field === 'availability') :
	$inLabel = trim((string) ($props['in_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_IN_STOCK');
	$outLabel = trim((string) ($props['out_of_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_NOT_IN_STOCK');
	$inStock = !empty($product['inStock']);
	?>
	<div class="rm-product-field__availability <?= $inStock ? 'uk-text-success' : 'uk-text-muted' ?>" data-rm-product-availability
		 data-label-in="<?= htmlspecialchars($inLabel, ENT_QUOTES, 'UTF-8') ?>" data-label-out="<?= htmlspecialchars($outLabel, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($inStock ? $inLabel : $outLabel, ENT_QUOTES, 'UTF-8') ?></div>
<?php elseif ($field === 'base_price') : ?>
	<span class="rm-product-field__base-price" data-rm-product-base-price><?= htmlspecialchars((string) ($product['price']['base'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'discount') : ?>
	<span class="rm-product-field__discount-value" data-rm-product-discount-value<?= empty($product['price']['discountEnabled']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($product['price']['discount'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'benefit') : ?>
	<span class="rm-product-field__benefit" data-rm-product-benefit<?= empty($product['price']['benefitValue']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($product['price']['benefit'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'stock_quantity') :
	$quantity = (array) ($product['quantity'] ?? []); $amount = (float) ($quantity['all'] ?? 0); $stockAccounting = !empty($quantity['stockAccounting']); ?>
	<span class="rm-product-field__stock-quantity" data-rm-product-stock-quantity<?= !$stockAccounting ? ' hidden' : '' ?>><?= $stockAccounting ? htmlspecialchars(trim($amount . ' ' . ($quantity['unitShort'] ?? $quantity['units'] ?? '')), ENT_QUOTES, 'UTF-8') : '' ?></span>
<?php elseif ($field === 'unit') :
	$quantity = (array) ($product['quantity'] ?? []); ?>
	<span class="rm-product-field__unit" data-rm-product-unit-value<?= empty($quantity['unitShort']) && empty($quantity['units']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($quantity['unitShort'] ?? $quantity['units'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'code') : ?>
	<span class="rm-product-field__code" data-rm-product-code><?= htmlspecialchars((string) ($product['code'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'category') :
	$category = (array) ($product['category'] ?? []); $categoryTitle = htmlspecialchars((string) ($category['title'] ?? ''), ENT_QUOTES, 'UTF-8'); $categoryLink = htmlspecialchars((string) ($category['link'] ?? ''), ENT_QUOTES, 'UTF-8'); ?>
	<?php if ($linkProduct && $categoryLink !== '') : ?><a class="rm-product-field__category" href="<?= $categoryLink ?>" data-rm-product-category<?= $categoryTitle === '' ? ' hidden' : '' ?>><?= $categoryTitle ?></a><?php else : ?><span class="rm-product-field__category" data-rm-product-category<?= $categoryTitle === '' ? ' hidden' : '' ?>><?= $categoryTitle ?></span><?php endif; ?>
<?php elseif ($field === 'manufacturer') :
	$manufacturer = (array) (($product['manufacturers'] ?? [])[0] ?? []); $manufacturerTitle = htmlspecialchars((string) ($manufacturer['title'] ?? ''), ENT_QUOTES, 'UTF-8'); $manufacturerLink = htmlspecialchars((string) ($manufacturer['link'] ?? ''), ENT_QUOTES, 'UTF-8'); ?>
	<?php if ($linkProduct && $manufacturerLink !== '') : ?><a class="rm-product-field__manufacturer" href="<?= $manufacturerLink ?>" data-rm-product-manufacturer<?= $manufacturerTitle === '' ? ' hidden' : '' ?>><?= $manufacturerTitle ?></a><?php else : ?><span class="rm-product-field__manufacturer" data-rm-product-manufacturer<?= $manufacturerTitle === '' ? ' hidden' : '' ?>><?= $manufacturerTitle ?></span><?php endif; ?>
<?php elseif ($field === 'description') : ?>
	<div class="rm-product-field__description" data-rm-product-description><?= (string) ($product['introtextHtml'] ?? htmlspecialchars((string) ($product['introtext'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
<?php else : ?>
	<div class="rm-product-field__full-description" data-rm-product-full-description><?= (string) ($product['fulltextHtml'] ?? htmlspecialchars((string) ($product['fulltext'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
<?php endif; ?>
<?php if ($hasAffix && $afterValue !== '') : ?><span class="rm-product-field__after"><?= htmlspecialchars($afterValue, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
<?= $root->end() ?>
