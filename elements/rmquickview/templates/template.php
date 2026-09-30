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
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->getRegistry()->addExtensionRegistryFile('com_radicalmart');
$assets->useScript('bootstrap.toast');
$assets->useScript('bootstrap.offcanvas');
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
	'JLIB_HTML_BEHAVIOR_CLOSE',
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
$label = trim((string) ($props['label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_QUICK_VIEW');
$accessibleLabel = trim((string) ($props['accessible_label'] ?? '')) ?: $label;
$modalClass = preg_replace('/[^A-Za-z0-9_-]+/', ' ', trim((string) ($props['modal_class'] ?? '')));
$settings = json_encode([
	'modalSize'       => in_array($props['modal_size'] ?? '', ['', 'small', 'large', 'xlarge', 'container', 'full'], true) ? $props['modal_size'] : 'container',
	'modalClass'      => trim((string) $modalClass),
	'contentPadding'  => in_array($props['content_padding'] ?? '', ['none', 'small', 'default', 'large'], true)
		? $props['content_padding'] : 'default',
	'modalCenter'     => !array_key_exists('modal_center', $props) || !empty($props['modal_center']),
	'mobileFullscreen' => !array_key_exists('mobile_fullscreen', $props) || !empty($props['mobile_fullscreen']),
	'showClose'       => !array_key_exists('show_close', $props) || !empty($props['show_close']),
	'closeLarge'      => !empty($props['close_large']),
	'bgClose'         => !array_key_exists('bg_close', $props) || !empty($props['bg_close']),
	'escClose'        => !array_key_exists('esc_close', $props) || !empty($props['esc_close']),
	'overflowAuto'    => !empty($props['overflow_auto']),
	'showDescription' => !empty($props['show_description']),
	'showCode'        => !empty($props['show_code']),
	'showVariants'    => !empty($props['show_variants']),
	'showCart'        => !empty($props['show_cart']),
], JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

$el = $this->el('div');
$el->attr([
	'data-rm-quick-view-root' => true,
	'data-rm-quick-view-label' => $accessibleLabel,
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
	'aria-haspopup' => 'dialog',
]);
?>
<?= $el($props, $attrs) ?>
<?= $button($props) ?>
<?php if (!empty($props['icon']) && $iconAlign === 'left') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>" class="uk-margin-small-right"></span>
<?php endif; ?>
	<?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
<?php if (!empty($props['icon']) && $iconAlign === 'right') : ?>
	<span uk-icon="icon: <?= htmlspecialchars($props['icon'], ENT_QUOTES, 'UTF-8') ?>" class="uk-margin-small-left"></span>
<?php endif; ?>
<?= $button->end() ?>
<?= $el->end() ?>
