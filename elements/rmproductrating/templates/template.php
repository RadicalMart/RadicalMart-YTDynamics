<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(
	isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null,
	(int) ($props['product_id'] ?? 0)
);
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$rating = (array) ($product['rating'] ?? []); $max = max(1, (float) ($rating['max'] ?? 5)); $value = max(0, min($max, (float) ($rating['value'] ?? 0))); $available = !empty($rating['available']);
$style = '--rm-product-rating-percent: ' . (($value / $max) * 100) . '%; --rm-product-rating-size: ' . max(12, min(48, (int) ($props['size'] ?? 18))) . 'px';
$color = trim((string) ($props['color'] ?? ''));
if ($color !== '') $style .= '; --rm-product-rating-color: ' . htmlspecialchars($color, ENT_QUOTES, 'UTF-8');
$root = $this->el('div', ['class' => ['rm-product-rating'], 'style' => $style, 'data-rm-product-rating' => true, 'data-show-count' => !empty($props['show_count']) ? 'true' : 'false', 'data-show-empty' => !empty($props['show_empty']) ? 'true' : 'false', 'role' => 'img', 'aria-label' => $value . ' / ' . $max, 'hidden' => !$available && empty($props['show_empty'])]);
?>
<?= $root($props, $attrs) ?><span class="rm-product-rating__stars" data-rm-product-rating-stars aria-hidden="true"></span><?php if (!empty($props['show_value'])) : ?><span class="rm-product-rating__value" data-rm-product-rating-value><?= htmlspecialchars(number_format($value, 1, '.', ''), ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?><?php if (!empty($props['show_count'])) : ?><span class="rm-product-rating__count uk-text-meta" data-rm-product-rating-count><?= (int) ($rating['count'] ?? 0) ?></span><?php endif; ?><?= $root->end() ?>
