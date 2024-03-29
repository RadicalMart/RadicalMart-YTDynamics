<?php

$el = $this->el('div');

// Grid
$grid = $this->el('div', [

	'class' => [
		'uk-flex-middle',
		'uk-flex-{text_align}[@{text_align_breakpoint} [uk-flex-{text_align_fallback}]] {@!fullwidth}',
	],

	'uk-grid' => true,
]);

$assets = $this->document->getWebAssetManager();
$assets->useScript('com_radicalmart.site.cart');
$assets->useScript('com_radicalmart.site');
$assets->useScript('com_radicalmart.site.trigger');

?>

<?= $el($props, $attrs) ?>

<div radicalmart-cart="product" data-id="<?php echo $this->product->id; ?>" class="uk-margin">
    <div class="uk-child-width-auto uk-flex-middle" uk-grid="">
        <div class="uk-flex uk-flex-middle">
                            <span class="uk-link uk-margin-small-right"
                                  uk-icon="icon: minus"
                                  radicalmart-cart="quantity_minus"></span>
            <input radicalmart-cart="quantity" type="text" name="quantity"
                   class="uk-input uk-form-width-small uk-text-center"
                   step="<?php echo $this->product->quantity['step']; ?>"
                   min="<?php echo $this->product->quantity['min']; ?>"
				<?php if (!empty($this->product->quantity['max']))
				{
					echo 'max="' . $this->product->quantity['max'] . '"';
				}
				?>
                   value="<?php echo $this->product->quantity['min']; ?>"/>
            <span class="uk-link uk-margin-small-left"
                  uk-icon="icon: plus"
                  radicalmart-cart="quantity_plus"></span>
        </div>
        <div>
            <button radicalmart-cart="add" type="button" class="uk-button uk-button-primary">
				<?php echo Text::_('COM_RADICALMART_CART_ADD'); ?>
            </button>
        </div>
    </div>
</div>

</div>
