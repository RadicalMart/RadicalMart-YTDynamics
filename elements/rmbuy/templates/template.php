<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$productId = isset($rmProduct['id']) ? (int) $rmProduct['id'] : (int) ($props['product_id'] ?? 0);
if ($productId < 1)
{
	$input = Factory::getApplication()->getInput();
	if ($input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product')
	{
		$productId = $input->getInt('id');
	}
}

$number = static function ($value, string $fallback): string {
	return is_numeric($value) ? (string) (0 + $value) : $fallback;
};

$step = $number($props['step'] ?? null, '1');
$step = (float) $step > 0 ? $step : '1';
$min = $number($props['min'] ?? null, '1');
$max = $number($props['max'] ?? null, '');
$max = $max !== '' && (float) $max >= (float) $min ? $max : '';
$stepAttr = htmlspecialchars($step, ENT_QUOTES, 'UTF-8');
$minAttr = htmlspecialchars($min, ENT_QUOTES, 'UTF-8');
$maxAttr = htmlspecialchars($max, ENT_QUOTES, 'UTF-8');
$buttonStyle = in_array(($props['button_style'] ?? 'primary'), ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? ($props['button_style'] ?? 'primary') : 'primary';
$buttonSize = in_array(($props['button_size'] ?? ''), ['', 'small', 'large'], true)
	? ($props['button_size'] ?? '') : '';
$iconAlign = ($props['icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$label = trim((string) ($props['label'] ?? ''));
$label = $label !== '' ? $label : Text::_('COM_RADICALMART_CART_ADD');
$successLabel = Text::_('PLG_YTDYNAMICS_CART_ADDED');
$loadingLabel = Text::_('PLG_YTDYNAMICS_LOADING');
$mobileStack = !array_key_exists('mobile_stack', $props) || !empty($props['mobile_stack']);
$showCount = !empty($props['show_count']);
$fullwidth = !empty($props['fullwidth']);

$el = $this->el('div', []);

$el_cart = $this->el('div', [
		'class' => [
			'rm-buy',
			'uk-child-width-auto',
			'uk-flex-wrap uk-flex-nowrap@s' => $mobileStack,
			'uk-flex-nowrap' => !$mobileStack,
			'uk-flex-middle',
			'uk-flex-{text_align}[@{text_align_breakpoint} [uk-flex-{text_align_fallback}]]' => !$fullwidth,
	],

	'uk-grid'          => true,
	'radicalmart-cart' => 'product',
	'data-id'          => $productId,
	'data-rm-cart-success' => $successLabel,
	'data-rm-cart-loading' => $loadingLabel,
]);


$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('com_radicalmart');
$assets->useScript('bootstrap.toast');
$assets->useScript('bootstrap.offcanvas');
$assets->useScript('com_radicalmart.site.cart');
$assets->useScript('com_radicalmart.site');
$assets->useScript('com_radicalmart.site.trigger');

?>

<?= $el($props, $attrs) ?>
<?= $el_cart($props) ?>
<?php if ($showCount) : ?>
    <div class="rm-buy__quantity uk-flex uk-flex-middle uk-button-group">
        <button type="button"
                class="rm-buy__decrease uk-icon-button uk-margin-small-right"
                uk-icon="minus"
                radicalmart-cart="quantity_minus"
                aria-label="<?= Text::_('PLG_YTDYNAMICS_QUANTITY_DECREASE') ?>"></button>
        <input radicalmart-cart="quantity" type="number" name="quantity"
               class="rm-buy__input uk-input uk-form-width-small uk-text-center"
	               inputmode="decimal"
	               aria-label="<?= Text::_('PLG_YTDYNAMICS_QUANTITY') ?>"
	               step="<?php echo $stepAttr; ?>"
	               min="<?php echo $minAttr; ?>"
				<?php if ($maxAttr !== '')
				{
					echo 'max="' . $maxAttr . '"';
				}
				?>
	               value="<?php echo $minAttr; ?>"/>
        <button type="button"
                class="rm-buy__increase uk-icon-button uk-margin-small-left"
                uk-icon="plus"
                radicalmart-cart="quantity_plus"
                aria-label="<?= Text::_('PLG_YTDYNAMICS_QUANTITY_INCREASE') ?>"></button>
    </div>
<?php endif; ?>
	    <div class="rm-buy__action<?= $mobileStack && $showCount ? ' uk-width-1-1 ' . ($fullwidth ? 'uk-width-expand@s' : 'uk-width-auto@s') : ($fullwidth ? ' uk-width-expand' : '') ?>">
			<?php if (!$showCount) : ?>
	            <input radicalmart-cart="quantity" type="hidden" name="quantity" value="<?php echo $minAttr; ?>"/>
		<?php endif; ?>
        <button radicalmart-cart="add" type="button"
	                class="rm-buy__button uk-button uk-button-<?= $buttonStyle ?> uk-text-nowrap<?= $buttonSize ? ' uk-button-' . $buttonSize : '' ?><?= $fullwidth || ($mobileStack && $showCount) ? ' uk-width-1-1' : '' ?><?= !$fullwidth && $mobileStack && $showCount ? ' uk-width-auto@s' : '' ?>">
			<?php if (!empty($props['icon']) && $iconAlign === 'left') : ?>
				<span uk-icon="icon: <?= htmlspecialchars((string) $props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= $label !== '' ? ' class="uk-margin-small-right"' : '' ?>></span>
			<?php endif; ?>
			<?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
			<?php if (!empty($props['icon']) && $iconAlign === 'right') : ?>
				<span uk-icon="icon: <?= htmlspecialchars((string) $props['icon'], ENT_QUOTES, 'UTF-8') ?>"<?= $label !== '' ? ' class="uk-margin-small-left"' : '' ?>></span>
			<?php endif; ?>
        </button>
    </div>
<?= $el_cart->end() ?>
<?= $el->end() ?>
