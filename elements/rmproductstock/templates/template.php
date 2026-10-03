<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$quantity = (array) ($product['quantity'] ?? []); $inStock = !empty($product['inStock']); $amount = (float) ($quantity['all'] ?? 0); $stockAccounting = !empty($quantity['stockAccounting']); $threshold = max(1, (float) ($props['progress_threshold'] ?? 10));
$inLabel = trim((string) ($props['in_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_IN_STOCK'); $outLabel = trim((string) ($props['out_of_stock_label'] ?? '')) ?: Text::_('COM_RADICALMART_NOT_IN_STOCK');
$style = in_array(($props['text_style'] ?? ''), ['', 'meta', 'small', 'lead'], true) ? ($props['text_style'] ?? '') : '';
$root = $this->el('div', ['class' => ['rm-product-stock', 'uk-text-' . $style => $style !== ''], 'data-rm-product-stock' => true, 'data-label-in' => $inLabel, 'data-label-out' => $outLabel, 'data-show-quantity' => !empty($props['show_quantity']) ? 'true' : 'false', 'data-show-progress' => !empty($props['show_progress']) ? 'true' : 'false', 'data-progress-threshold' => $threshold]);
?>
<?= $root($props, $attrs) ?><div class="rm-product-stock__line"><span class="rm-product-stock__status <?= $inStock ? 'uk-text-success' : 'uk-text-muted' ?>" data-rm-product-stock-status><?= htmlspecialchars($inStock ? $inLabel : $outLabel, ENT_QUOTES, 'UTF-8') ?></span><span class="rm-product-stock__amount uk-text-meta" data-rm-product-stock-amount<?= empty($props['show_quantity']) || !$stockAccounting ? ' hidden' : '' ?>><?= htmlspecialchars(trim($amount . ' ' . ($quantity['unitShort'] ?? $quantity['units'] ?? '')), ENT_QUOTES, 'UTF-8') ?></span></div><progress class="rm-product-stock__progress uk-progress" data-rm-product-stock-progress value="<?= min($amount, $threshold) ?>" max="<?= $threshold ?>"<?= empty($props['show_progress']) || !$stockAccounting ? ' hidden' : '' ?>></progress><?= $root->end() ?>
