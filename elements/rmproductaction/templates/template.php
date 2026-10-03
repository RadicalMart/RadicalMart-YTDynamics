<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;
$product = ProductPresentation::resolve(isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null, (int) ($props['product_id'] ?? 0));
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useScript('plg_system_ytdynamics.product-interactions'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$action = ($props['action'] ?? 'favorite') === 'compare' ? 'compare' : 'favorite'; $defaultLabel = $action === 'favorite' ? Text::_('PLG_YTDYNAMICS_FAVORITE') : Text::_('PLG_YTDYNAMICS_COMPARE'); $label = trim((string) ($props[$action . '_label'] ?? '')) ?: $defaultLabel; $icon = (string) ($props[$action . '_icon'] ?? ($action === 'favorite' ? 'heart' : 'copy')); $style = in_array(($props['button_style'] ?? 'default'), ['default', 'primary', 'secondary', 'text', 'link'], true) ? ($props['button_style'] ?? 'default') : 'default';
$size = in_array(($props['button_size'] ?? ''), ['', 'small', 'large'], true) ? (string) ($props['button_size'] ?? '') : '';
$button = $this->el('button', ['class' => ['rm-product-action rm-product-action--' . $action, 'uk-icon-button' => !empty($props['icon_only']), 'uk-button uk-button-' . $style => empty($props['icon_only']), 'uk-button-' . $size => empty($props['icon_only']) && $size !== '', 'uk-width-1-1' => empty($props['icon_only']) && !empty($props['fullwidth'])], 'type' => 'button', 'data-rm-product-action' => $action, 'data-product-id' => (int) $product['id'], 'data-label' => $label, 'aria-label' => trim($label . ' ' . ($product['title'] ?? '')), 'aria-pressed' => 'false', 'hidden' => true]);
?>
<?= $button($props, $attrs) ?><?php if ($icon !== '') : ?><span uk-icon="<?= htmlspecialchars($icon, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true"<?= empty($props['icon_only']) ? ' class="uk-margin-small-right"' : '' ?>></span><?php endif; ?><?php if (empty($props['icon_only'])) echo htmlspecialchars($label, ENT_QUOTES, 'UTF-8'); ?><?= $button->end() ?>
