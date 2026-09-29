<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

$productId = (int) ($props['product_id'] ?? 0);
$templateId = trim((string) ($props['quickview_template'] ?? ''));
$contentMode = ($props['content_mode'] ?? 'automatic') === 'builder' && $templateId !== ''
	? 'builder' : 'automatic';
if ($productId < 1)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');
$assets->useScript('plg_system_ytdynamics.gallery');
$assets->useStyle('plg_system_ytdynamics.gallery');
$assets->useScript('com_radicalmart.site.cart');
$assets->useScript('com_radicalmart.site');
$assets->useScript('com_radicalmart.site.trigger');
foreach ([
	'PLG_YTDYNAMICS_QUICK_VIEW',
	'PLG_YTDYNAMICS_ERROR_LOAD_PRODUCT',
	'PLG_YTDYNAMICS_NO_IMAGE',
	'PLG_YTDYNAMICS_DETAILS',
	'PLG_YTDYNAMICS_QUANTITY',
	'COM_RADICALMART_IN_STOCK',
	'COM_RADICALMART_NOT_IN_STOCK',
	'COM_RADICALMART_CART_ADD',
] as $key)
{
	Text::script($key);
}

$endpoint = rtrim(Uri::root(), '/') . '/index.php?option=com_ajax&plugin=ytdynamics&group=system&format=json';
$buttonStyle = in_array($props['button_style'] ?? '', ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? $props['button_style'] : 'default';
$buttonSize = in_array($props['button_size'] ?? '', ['small', 'large'], true) ? $props['button_size'] : '';
$iconAlign = ($props['icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$settings = json_encode([
	'modalSize'       => in_array($props['modal_size'] ?? '', ['', 'container', 'large'], true) ? $props['modal_size'] : 'container',
	'showDescription' => !empty($props['show_description']),
	'showCode'        => !empty($props['show_code']),
	'showVariants'    => !empty($props['show_variants']),
	'showCart'        => !empty($props['show_cart']),
], JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

$el = $this->el('div');
$el->attr([
	'data-rm-quick-view-root' => true,
]);
$button = $this->el('button', [
	'type' => 'button',
	'class' => [
		'rmquickview__trigger uk-button uk-button-' . $buttonStyle,
		'uk-button-' . $buttonSize => $buttonSize,
		'uk-width-1-1' => !empty($props['fullwidth']),
	],
	'data-rm-quick-view' => $productId,
	'data-endpoint' => $endpoint,
	'data-settings' => $settings,
	'data-content-mode' => $contentMode,
	'data-template-id' => $templateId,
]);
?>
<?= $el($props, $attrs) ?>
<?= $button($props) ?>
<?php if (!empty($props['icon']) && $iconAlign === 'left') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['label']) ? ' class="uk-margin-small-right"' : '' ?>></span>
<?php endif; ?>
<?= htmlspecialchars((string) ($props['label'] ?? ''), ENT_QUOTES, 'UTF-8') ?>
<?php if (!empty($props['icon']) && $iconAlign === 'right') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['label']) ? ' class="uk-margin-small-left"' : '' ?>></span>
<?php endif; ?>
<?= $button->end() ?>
<?= $el->end() ?>
