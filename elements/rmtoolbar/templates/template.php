<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$app                  = Factory::getApplication();
$cookieName           = 'radicalmart_products-list_layout';
$productsListTemplate = $app->input->cookie->get($cookieName, 'grid');

$cookieName           = 'radicalmart_products-list_ordering';
$productsListOrdering = $app->input->cookie->get($cookieName);

$options = [
	'p.ordering ASC' => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_ORDERING',
	'price ASC'      => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_PRICE_ASC',
	'price DESC'     => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_PRICE_DESC',
	'p.created DESC' => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_CREATED',
	'p.title ASC'    => 'COM_RADICALMART_PRODUCTS_LIST_ORDERING_TITLE',
];

$el = $this->el('div', [

	'class' => [
		'uk-card uk-card-default uk-card-body uk-card-small',
	],

]);
?>

<?= $el([], $attrs) ?>

    <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small">
            <select class="uk-select uk-form-width-medium" onchange="setProductsOrdering(this.value);">
				<?php foreach ($options as $value => $text): ?>
                    <option value="<?php echo $value; ?>"
						<?php if (strtolower($value) === strtolower($productsListOrdering)) echo 'selected'; ?>>
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
