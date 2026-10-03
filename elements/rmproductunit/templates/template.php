<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$quantity = (array) ($product['quantity'] ?? []); $long = ($props['unit_style'] ?? 'short') === 'long'; $unit = (string) ($long ? ($quantity['unit'] ?? $quantity['units'] ?? '') : ($quantity['unitShort'] ?? $quantity['units'] ?? ''));
$style = in_array(($props['text_style'] ?? 'meta'), ['', 'meta', 'small', 'lead'], true) ? ($props['text_style'] ?? 'meta') : 'meta';
$root = $this->el('div', ['class' => ['rm-product-unit', 'uk-text-' . $style => $style !== ''], 'data-rm-product-unit' => true, 'data-unit-style' => $long ? 'long' : 'short', 'hidden' => $unit === '']);
?>
<?= $root($props, $attrs) ?><?php if (!empty($props['show_price'])) : ?><span class="rm-product-unit__price" data-rm-product-unit-price><?= htmlspecialchars((string) ($product['price']['final'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span><span class="rm-product-unit__separator"><?= htmlspecialchars((string) ($props['separator'] ?? '/'), ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?><span class="rm-product-unit__label" data-rm-product-unit-label><?= htmlspecialchars($unit, ENT_QUOTES, 'UTF-8') ?></span><?= $root->end() ?>
