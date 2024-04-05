<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$el = $this->el('div', [

	'class' => [
		'uk-child-width-auto',
		'uk-flex-nowrap',
		'uk-flex-middle',
		'uk-flex-{text_align}[@{text_align_breakpoint} [uk-flex-{text_align_fallback}]] {@!fullwidth}',
	],

	'uk-grid'          => true,
	'radicalmart-cart' => 'product',
	'data-id'          => $props['product_id']
]);

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->useScript('com_radicalmart.site.cart');
$assets->useScript('com_radicalmart.site');
$assets->useScript('com_radicalmart.site.trigger');

?>

<?php echo $el($props, $attrs) ?>
<?php if ($props['show_count']) : ?>
    <div class="uk-flex uk-flex-middle uk-button-group">
                            <span class="uk-link uk-margin-small-right"
                                  uk-icon="icon: minus"
                                  radicalmart-cart="quantity_minus" style="min-width: 20px;"></span>
        <input radicalmart-cart="quantity" type="text" name="quantity"
               class="uk-input uk-form-width-small uk-text-center"
               step="<?php echo $props['step']; ?>"
               min="<?php echo $props['min']; ?>"
			<?php if (!empty($props['max']))
			{
				echo 'max="' . $props['max'] . '"';
			}
			?>
               value="<?php echo $props['min']; ?>"/>
        <span class="uk-link uk-margin-small-left"
              uk-icon="icon: plus"
              radicalmart-cart="quantity_plus" style="min-width: 20px;"></span>
    </div>
<?php endif; ?>
    <div>
		<?php if (!$props['show_count']) : ?>
            <input radicalmart-cart="quantity" type="hidden" name="quantity" value="<?php echo $props['min']; ?>"/>
		<?php endif; ?>
        <button radicalmart-cart="add" type="button" class="uk-button uk-button-primary uk-text-nowrap">
			<?php echo Text::_('COM_RADICALMART_CART_ADD'); ?>
        </button>
    </div>
<?php echo $el->end() ?>