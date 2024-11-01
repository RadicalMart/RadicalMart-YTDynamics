<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$app                  = Factory::getApplication();
$cookieName           = 'radicalmart_products-list_layout';
$productsListTemplate = $app->input->cookie->get($cookieName, 'grid');

$cookieName           = 'radicalmart_products-list_ordering';
$productsListOrdering = $app->input->cookie->get($cookieName, '');

$options = [
	'p.ordering ASC' => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_ORDERING',
	'price ASC'      => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_PRICE_ASC',
	'price DESC'     => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_PRICE_DESC',
	'p.created DESC' => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_CREATED',
	'p.title ASC'    => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_TITLE',
];

$el = $this->el('div', [

	'class' => [
		'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
		'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
		//'uk-tile-hover {@panel_style: tile-.*} {@panel_link}'              => $props['link'],
		//'uk-card-hover {@!panel_style: |card-hover|tile-.*} {@panel_link}' => $props['link'],
		'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-card-body {@panel_style: card-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-flex {@panel_style} {@has_panel_image_no_padding} {@image_align: left|right}', // Let images cover the card/tile height if they have different heights
	],
]);

?>

<?= $el($props, $attrs) ?>

<div class="uk-grid-small uk-flex-middle" uk-grid>
    <div class="uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small">
        <select class="uk-select uk-form-width-medium" onchange="setProductsOrdering(this.value);">
			<?php foreach ($options as $value => $text): ?>
                <option value="<?php echo $value; ?>" <?php if (strtolower($value) === strtolower($productsListOrdering)) { echo 'selected'; } ?>>
					<?php echo Text::_($text); ?>
                </option>
			<?php endforeach; ?>
        </select>
    </div>
    <div class="uk-width-auto@s uk-flex uk-flex-center uk-flex-middle">
		<?php
		//if (!empty($this->modules['radicalmart-filter-mobile'])):
		if (false):
			?>
            <span class="uk-button uk-button-default uk-button-small uk-hidden@m"
                  uk-toggle="target: #productsFilters">
									<span class="uk-margin-xsmall-right" uk-icon="icon: settings; ratio: .75;"></span>
									<?php echo Text::_('COM_RADICALMART_FILTERS'); ?>
								</span>
		<?php endif; ?>
        <ul class="uk-subnav uk-iconnav uk-margin-small-left uk-visible@s">
            <li class="<?php echo ($productsListTemplate === 'grid') ? 'uk-active' : ''; ?>">
									<span class="uk-link"
                                          uk-icon="grid" uk-tooltip onclick="setProductsListTemplate('grid')"
                                          title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_GRID'); ?>"></span>
            </li>
            <li class="<?php echo ($productsListTemplate === 'list') ? 'uk-active' : ''; ?>">
									<span class="uk-link"
                                          uk-icon="list" uk-tooltip onclick="setProductsListTemplate('list')"
                                          title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_LIST'); ?>"></span>
            </li>
        </ul>
    </div>
</div>

<?= $el->end() ?>

<div radicalmart-ajax="loading"
     class="uk-position-fixed uk-position-cover uk-position-z-index uk-overlay-default uk-flex uk-flex-middle uk-flex-center"
     style="display: none">
    <div uk-spinner="ratio: 3"></div>
</div>
