<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$disabled = empty($product['inStock']) && !empty($props['disable_out_of_stock']); $title = (string) ($product['title'] ?? ''); $baseLabel = trim((string) ($props['label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_SELECT'); $showTitle = !empty($props['show_title']); $label = $showTitle ? trim($baseLabel . ' ' . $title) : $baseLabel;
$root = $this->el('label', ['class' => ['rm-product-select'], 'data-rm-product-select' => true, 'data-disable-out-of-stock' => !empty($props['disable_out_of_stock']) ? 'true' : 'false', 'data-base-label' => $baseLabel, 'data-show-title' => $showTitle ? 'true' : 'false']);
?>
<?= $root($props, $attrs) ?><input class="rm-product-select__input uk-checkbox" type="checkbox" value="<?= (int) $product['id'] ?>" data-product-id="<?= (int) $product['id'] ?>" data-product-title="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" data-quantity="<?= htmlspecialchars((string) ($product['quantity']['min'] ?? 1), ENT_QUOTES, 'UTF-8') ?>"<?= $disabled ? ' disabled' : '' ?>><span class="rm-product-select__label" data-rm-product-select-label><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></span><?= $root->end() ?>
