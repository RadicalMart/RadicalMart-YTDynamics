<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

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

$el = $this->el('div', []);

$el_cart = $this->el('div', [
	'class' => [
		'uk-child-width-auto',
		'uk-flex-nowrap',
		'uk-flex-middle',
		'uk-flex-{text_align}[@{text_align_breakpoint} [uk-flex-{text_align_fallback}]] {@!fullwidth}',
	],

	'uk-grid'          => true,
	'radicalmart-cart' => 'product',
	'data-id'               => (int) ($props['product_id'] ?? 0)
]);


$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->useScript('com_radicalmart.site.cart');
$assets->useScript('com_radicalmart.site');
$assets->useScript('com_radicalmart.site.trigger');

?>

<?php echo $el($props, $attrs) ?>
<?php echo $el_cart($props) ?>
<?php if ($props['show_count']) : ?>
    <div class="uk-flex uk-flex-middle uk-button-group">
                            <span class="uk-link uk-margin-small-right"
                                  uk-icon="icon: minus"
                                  radicalmart-cart="quantity_minus" style="min-width: 20px;"></span>
        <input radicalmart-cart="quantity" type="text" name="quantity"
               class="uk-input uk-form-width-small uk-text-center"
	               step="<?php echo $stepAttr; ?>"
	               min="<?php echo $minAttr; ?>"
				<?php if ($maxAttr !== '')
				{
					echo 'max="' . $maxAttr . '"';
				}
				?>
	               value="<?php echo $minAttr; ?>"/>
        <span class="uk-link uk-margin-small-left"
              uk-icon="icon: plus"
              radicalmart-cart="quantity_plus" style="min-width: 20px;"></span>
    </div>
<?php endif; ?>
    <div>
		<?php if (!$props['show_count']) : ?>
	            <input radicalmart-cart="quantity" type="hidden" name="quantity" value="<?php echo $minAttr; ?>"/>
		<?php endif; ?>
        <button radicalmart-cart="add" type="button" class="uk-button uk-button-primary uk-text-nowrap">
			<?php echo Text::_('COM_RADICALMART_CART_ADD'); ?>
        </button>
    </div>
<?php echo $el_cart->end() ?>
<?php echo $el->end() ?>
