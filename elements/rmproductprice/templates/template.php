<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$price = (array) ($product['price'] ?? []);
$quantity = (array) ($product['quantity'] ?? []);
$discountEnabled = !empty($price['discountEnabled']);
$baseValue = (float) ($price['baseValue'] ?? 0);
$finalValue = (float) ($price['finalValue'] ?? 0);
$discountPercent = $discountEnabled && $baseValue > 0
	? max(0, (int) round((($baseValue - $finalValue) / $baseValue) * 100))
	: 0;
$discountMode = in_array(($props['discount_mode'] ?? 'percent'), ['percent', 'amount', 'both'], true)
	? (string) ($props['discount_mode'] ?? 'percent') : 'percent';
$discountAmount = trim((string) ($price['discount'] ?? ''));
$discountText = match ($discountMode)
{
	'amount' => $discountAmount !== '' ? '-' . ltrim($discountAmount, "-− ") : '',
	'both' => trim(($discountPercent > 0 ? '-' . $discountPercent . '%' : '') . ($discountAmount !== '' ? ' · -' . ltrim($discountAmount, "-− ") : '')),
	default => $discountPercent > 0 ? '-' . $discountPercent . '%' : '',
};
$unitStyle = ($props['unit_style'] ?? 'short') === 'long' ? 'long' : 'short';
$unit = (string) ($unitStyle === 'long'
	? ($quantity['unit'] ?? $quantity['units'] ?? '')
	: ($quantity['unitShort'] ?? $quantity['units'] ?? ''));
$showUnit = !empty($props['show_unit']);
$showBase = !empty($props['show_base_price']);
$showDiscount = !empty($props['show_discount']);
$showSavings = !empty($props['show_savings']);
$layout = in_array(($props['layout'] ?? 'inline'), ['inline', 'wrap', 'stack'], true)
	? (string) ($props['layout'] ?? 'inline') : 'inline';
$gap = in_array(($props['gap'] ?? 'small'), ['none', 'small', 'default', 'large'], true)
	? (string) ($props['gap'] ?? 'small') : 'small';
$finalStyle = in_array(($props['final_style'] ?? 'large'), ['', 'meta', 'small', 'large', 'lead'], true) ? (string) ($props['final_style'] ?? 'large') : 'large';
$finalWeight = in_array(($props['final_weight'] ?? 'bold'), ['', 'light', 'normal', 'bold', 'lighter', 'bolder'], true) ? (string) ($props['final_weight'] ?? 'bold') : 'bold';
$finalColor = in_array(($props['final_color'] ?? 'emphasis'), ['', 'muted', 'emphasis', 'primary', 'secondary', 'success', 'warning', 'danger'], true) ? (string) ($props['final_color'] ?? 'emphasis') : 'emphasis';
$unitTextStyle = in_array(($props['unit_style_text'] ?? ''), ['', 'meta', 'small', 'large', 'lead'], true) ? (string) ($props['unit_style_text'] ?? '') : '';
$unitColor = in_array(($props['unit_color'] ?? ''), ['', 'muted', 'emphasis', 'primary', 'secondary', 'success', 'warning', 'danger'], true) ? (string) ($props['unit_color'] ?? '') : '';
$baseStyle = in_array(($props['base_style'] ?? ''), ['', 'meta', 'small', 'large', 'lead'], true) ? (string) ($props['base_style'] ?? '') : '';
$baseColor = in_array(($props['base_color'] ?? 'muted'), ['', 'muted', 'emphasis', 'primary', 'secondary', 'success', 'warning', 'danger'], true) ? (string) ($props['base_color'] ?? 'muted') : 'muted';
$discountStyle = in_array(($props['discount_style'] ?? 'danger'), ['', 'success', 'warning', 'danger'], true) ? (string) ($props['discount_style'] ?? 'danger') : 'danger';
$beforeValue = (string) ($props['before_value'] ?? '');
$afterValue = (string) ($props['after_value'] ?? '');

$root = $this->el('div', [
	'class' => [
		'rm-product-price',
		'rm-product-price--' . $layout,
		'rm-product-price--gap-' . $gap,
	],
	'data-rm-product-price' => true,
	'data-show-base' => $showBase ? 'true' : 'false',
	'data-show-discount' => $showDiscount ? 'true' : 'false',
	'data-show-savings' => $showSavings ? 'true' : 'false',
	'data-show-unit' => $showUnit ? 'true' : 'false',
	'data-unit-style' => $unitStyle,
	'data-discount-mode' => $discountMode,
]);
?>
<?= $root($props, $attrs) ?>
	<?php if ($beforeValue !== '') : ?><span class="rm-product-price__before"><?= htmlspecialchars($beforeValue, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
	<span class="rm-product-price__final-group">
		<span class="rm-product-price__final<?= $finalStyle !== '' ? ' uk-text-' . $finalStyle : '' ?><?= $finalWeight !== '' ? ' uk-text-' . $finalWeight : '' ?><?= $finalColor !== '' ? ' uk-text-' . $finalColor : '' ?>" data-rm-product-price-final><?= htmlspecialchars((string) ($price['final'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span><span class="rm-product-price__unit<?= $unitTextStyle !== '' ? ' uk-text-' . $unitTextStyle : '' ?><?= $unitColor !== '' ? ' uk-text-' . $unitColor : '' ?>" data-rm-product-price-unit-wrap<?= !$showUnit || $unit === '' ? ' hidden' : '' ?>><span class="rm-product-price__unit-separator"><?= htmlspecialchars((string) ($props['unit_separator'] ?? '/'), ENT_QUOTES, 'UTF-8') ?></span><span data-rm-product-price-unit><?= htmlspecialchars($unit, ENT_QUOTES, 'UTF-8') ?></span></span>
	</span>
	<s class="rm-product-price__base<?= $baseStyle !== '' ? ' uk-text-' . $baseStyle : '' ?><?= $baseColor !== '' ? ' uk-text-' . $baseColor : '' ?>" data-rm-product-price-base<?= !$discountEnabled || !$showBase ? ' hidden' : '' ?>><?= htmlspecialchars((string) ($price['base'] ?? ''), ENT_QUOTES, 'UTF-8') ?></s>
	<span class="rm-product-price__discount uk-label<?= $discountStyle !== '' ? ' uk-label-' . $discountStyle : '' ?>" data-rm-product-discount<?= !$discountEnabled || !$showDiscount || $discountText === '' ? ' hidden' : '' ?>><?= htmlspecialchars($discountText, ENT_QUOTES, 'UTF-8') ?></span>
	<span class="rm-product-price__savings uk-text-muted" data-rm-product-price-savings<?= !$discountEnabled || !$showSavings || empty($price['benefit']) ? ' hidden' : '' ?>><span data-rm-product-price-savings-prefix><?= htmlspecialchars((string) ($props['savings_prefix'] ?? 'Экономия '), ENT_QUOTES, 'UTF-8') ?></span><span data-rm-product-price-savings-value><?= htmlspecialchars((string) ($price['benefit'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span></span>
	<?php if ($afterValue !== '') : ?><span class="rm-product-price__after"><?= htmlspecialchars($afterValue, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
<?= $root->end() ?>
