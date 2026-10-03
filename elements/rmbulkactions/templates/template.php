<?php
namespace YOOtheme;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('com_radicalmart');
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('bootstrap.toast'); $assets->useScript('bootstrap.offcanvas'); $assets->useScript('com_radicalmart.site.cart'); $assets->useScript('com_radicalmart.site'); $assets->useScript('plg_system_ytdynamics.product-interactions'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
foreach (['PLG_YTDYNAMICS_BULK_CART_UNAVAILABLE', 'PLG_YTDYNAMICS_BULK_ADDING', 'PLG_YTDYNAMICS_BULK_ADDED', 'PLG_YTDYNAMICS_BULK_ADD_FAILED'] as $key) Text::script($key);
$cartLabel = trim((string) ($props['cart_label'] ?? '')) ?: Text::_('COM_RADICALMART_CART_ADD'); $clearLabel = trim((string) ($props['clear_label'] ?? '')) ?: Text::_('JCLEAR');
$countLabel = trim((string) ($props['count_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_SELECTED');
$style = in_array(($props['button_style'] ?? 'primary'), ['default', 'primary', 'secondary'], true) ? ($props['button_style'] ?? 'primary') : 'primary'; $size = in_array(($props['button_size'] ?? ''), ['', 'small', 'large'], true) ? ($props['button_size'] ?? '') : '';
$root = $this->el('div', ['class' => ['rm-bulk-actions'], 'data-rm-bulk-actions' => true, 'data-selection-root' => trim((string) ($props['selection_root'] ?? ''))]);
?>
<?= $root($props, $attrs) ?><span class="rm-bulk-actions__count"><?= htmlspecialchars($countLabel, ENT_QUOTES, 'UTF-8') ?> <strong data-rm-selection-count>0</strong></span><button type="button" class="rm-bulk-actions__cart uk-button uk-button-<?= $style ?><?= $size ? ' uk-button-' . $size : '' ?>" data-rm-bulk-action="cart" disabled><?= htmlspecialchars($cartLabel, ENT_QUOTES, 'UTF-8') ?></button><?php if (!empty($props['show_clear'])) : ?><button type="button" class="rm-bulk-actions__clear uk-button uk-button-text" data-rm-bulk-action="clear" disabled><?= htmlspecialchars($clearLabel, ENT_QUOTES, 'UTF-8') ?></button><?php endif; ?><span class="rm-bulk-actions__status uk-text-meta" data-rm-bulk-status role="status" aria-live="polite"></span><?= $root->end() ?>
