<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$bonus = (array) ($product['bonus'] ?? []); $available = !empty($bonus['available']); $style = in_array(($props['text_style'] ?? 'meta'), ['', 'meta', 'small', 'lead'], true) ? ($props['text_style'] ?? 'meta') : 'meta';
$weight = in_array(($props['text_weight'] ?? ''), ['', 'light', 'normal', 'bold', 'lighter', 'bolder'], true) ? (string) ($props['text_weight'] ?? '') : '';
$color = in_array(($props['text_color'] ?? ''), ['', 'muted', 'emphasis', 'primary', 'secondary', 'success', 'warning', 'danger'], true) ? (string) ($props['text_color'] ?? '') : '';
$root = $this->el('div', ['class' => ['rm-product-bonus', 'uk-text-' . $style => $style !== '', 'uk-text-' . $weight => $weight !== '', 'uk-text-' . $color => $color !== ''], 'data-rm-product-bonus' => true, 'data-show-empty' => !empty($props['show_empty']) ? 'true' : 'false', 'hidden' => !$available && empty($props['show_empty'])]);
?>
<?= $root($props, $attrs) ?><?php if (!empty($props['icon'])) : ?><span uk-icon="<?= htmlspecialchars((string) $props['icon'], ENT_QUOTES, 'UTF-8') ?>" class="uk-margin-small-right" aria-hidden="true"></span><?php endif; ?><?= htmlspecialchars((string) ($props['label'] ?? ''), ENT_QUOTES, 'UTF-8') ?> <span class="rm-product-bonus__value" data-rm-product-bonus-value><?= htmlspecialchars((string) ($bonus['text'] ?? ''), ENT_QUOTES, 'UTF-8') ?></span><?= $root->end() ?>
