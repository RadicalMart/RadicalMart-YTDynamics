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

$field = in_array(($props['field'] ?? 'title'), ['title', 'image', 'price', 'availability', 'code', 'description', 'full_description'], true)
	? ($props['field'] ?? 'title') : 'title';
$linkProduct = !array_key_exists('link_product', $props) || !empty($props['link_product']);
$textStyle = in_array(($props['text_style'] ?? ''), ['', 'lead', 'meta', 'small', 'large', 'bold'], true)
	? ($props['text_style'] ?? '') : '';
$root = $this->el('div', [
	'class' => [
		'rm-product-field',
		'rm-product-field--' . $field,
		'uk-text-' . $textStyle => $textStyle !== '',
	],
	'data-rm-product-field' => $field,
]);
$url = htmlspecialchars((string) ($product['link'] ?? ''), ENT_QUOTES, 'UTF-8');
$title = htmlspecialchars((string) ($product['title'] ?? ''), ENT_QUOTES, 'UTF-8');
?>
<?= $root($props, $attrs) ?>
<?php if ($field === 'image') :
	$media = (array) ($product['media'] ?? []);
	$image = (array) ($media[0] ?? []);
	$src = htmlspecialchars((string) ($image['src'] ?? ''), ENT_QUOTES, 'UTF-8');
	$alt = htmlspecialchars((string) ($image['alt'] ?? $product['title'] ?? ''), ENT_QUOTES, 'UTF-8');
	$fit = ($props['image_fit'] ?? 'contain') === 'cover' ? 'cover' : 'contain';
	$ratio = in_array(($props['image_ratio'] ?? ''), ['', '1/1', '4/3', '3/2', '16/9'], true)
		? ($props['image_ratio'] ?? '') : '';
	$height = trim((string) ($props['image_height'] ?? ''));
	$height = preg_match('/^(?:auto|\d+(?:\.\d+)?(?:px|r?em|%|v[hw]|svh|lvh|dvh))$/i', $height) ? $height : '';
	$imageStyle = ['object-fit: ' . $fit];
	if ($height !== '') $imageStyle[] = 'height: ' . $height;
	elseif ($ratio !== '') $imageStyle[] = 'aspect-ratio: ' . $ratio;
	?>
	<?php if ($linkProduct && $url !== '') : ?><a class="rm-product-field__link uk-display-block" href="<?= $url ?>" data-rm-product-link><?php endif; ?>
	<img class="rm-product-field__image uk-width-1-1" data-rm-product-image src="<?= $src ?>" alt="<?= $alt ?>"
		 loading="<?= ($props['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy' ?>"
		 style="<?= htmlspecialchars(implode('; ', $imageStyle), ENT_QUOTES, 'UTF-8') ?>"<?= $src === '' ? ' hidden' : '' ?>>
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
	?>
	<div class="rm-product-field__price" data-rm-product-price
		 data-show-base="<?= !empty($props['show_base_price']) ? 'true' : 'false' ?>"
		 data-show-discount="<?= !empty($props['show_discount']) ? 'true' : 'false' ?>">
		<s class="rm-product-field__price-base uk-text-muted uk-margin-small-right" data-rm-product-price-base<?= !$discountEnabled || empty($props['show_base_price']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($price['base'] ?? ''), ENT_QUOTES, 'UTF-8') ?></s>
		<span class="rm-product-field__price-final" data-rm-product-price-final><?= htmlspecialchars((string) ($price['final'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
		<span class="rm-product-field__discount uk-label uk-label-danger uk-margin-small-left" data-rm-product-discount<?= !$discountEnabled || empty($props['show_discount']) ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($price['discount'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
	</div>
<?php elseif ($field === 'availability') :
	$inLabel = trim((string) ($props['in_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_IN_STOCK');
	$outLabel = trim((string) ($props['out_of_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_NOT_IN_STOCK');
	$inStock = !empty($product['inStock']);
	?>
	<div class="rm-product-field__availability <?= $inStock ? 'uk-text-success' : 'uk-text-muted' ?>" data-rm-product-availability
		 data-label-in="<?= htmlspecialchars($inLabel, ENT_QUOTES, 'UTF-8') ?>" data-label-out="<?= htmlspecialchars($outLabel, ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($inStock ? $inLabel : $outLabel, ENT_QUOTES, 'UTF-8') ?></div>
<?php elseif ($field === 'code') : ?>
	<span class="rm-product-field__code" data-rm-product-code><?= htmlspecialchars((string) ($product['code'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
<?php elseif ($field === 'description') : ?>
	<div class="rm-product-field__description" data-rm-product-description><?= (string) ($product['introtextHtml'] ?? htmlspecialchars((string) ($product['introtext'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
<?php else : ?>
	<div class="rm-product-field__full-description" data-rm-product-full-description><?= (string) ($product['fulltextHtml'] ?? htmlspecialchars((string) ($product['fulltext'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
<?php endif; ?>
<?= $root->end() ?>
