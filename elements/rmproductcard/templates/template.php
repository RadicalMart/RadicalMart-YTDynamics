<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$productId = isset($rmProduct['id']) ? (int) $rmProduct['id'] : (int) ($props['product_id'] ?? 0);
if ($productId < 1)
{
	$input = Factory::getApplication()->getInput();
	if ($input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product')
	{
		$productId = $input->getInt('id');
	}
}

try
{
	$product = isset($rmProduct) && is_array($rmProduct)
		? $rmProduct
		: ($productId > 0 ? ProductPresentation::get($productId) : null);
}
catch (\Throwable)
{
	$product = null;
}

if (!$product)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$panelStyle = in_array(($props['panel_style'] ?? ''), ['', 'card-default', 'card-primary', 'card-secondary'], true)
	? ($props['panel_style'] ?? '') : '';
$panelPadding = in_array(($props['panel_padding'] ?? 'default'), ['small', 'default', 'large'], true)
	? ($props['panel_padding'] ?? 'default') : 'default';
$props['panel_style'] = $panelStyle;
$props['panel_padding'] = $panelPadding;

$content = trim($builder->render($children, ['rmProduct' => $product]));
$json = json_encode($product, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
	| JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
$el = $this->el('div', [
	'class' => [
		'rm-product-card',
		'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
		'uk-card-body {@panel_style: card-.*} {@panel_padding}',
		'uk-card-hover' => !empty($props['panel_hover']) && $panelStyle !== '',
	],
	'data-rm-product-scope' => true,
	'data-rm-product-id' => (int) $product['id'],
]);
?>
<?= $el($props, $attrs) ?>
<script type="application/json" class="rm-product-card__data"><?= $json ?></script>
<?= $content ?>
<?= $el->end() ?>
