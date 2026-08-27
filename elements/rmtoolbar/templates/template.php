<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

$app                  = Factory::getApplication();
$cookieName           = 'com_radicalmart_category_list_item_template';
$productsListTemplate = $app->input->get->getCmd($cookieName)
	?: $app->input->cookie->getCmd($cookieName, 'grid');
$productsListTemplate = in_array($productsListTemplate, ['grid', 'list', 'table'], true)
	? $productsListTemplate
	: 'grid';

$cookieName           = 'com_radicalmart_category_list_ordering';
$productsListOrdering = $app->input->cookie->getString($cookieName, '');

$options = [
	'ordering ASC'         => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_ORDERING',
	'ordering_title ASC'   => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_TITLE_ASC',
	'ordering_title DESC'  => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_TITLE_DESC',
	'ordering_price ASC'   => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_PRICE_ASC',
	'ordering_price DESC'  => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_PRICE_DESC',
	'ordering_rating ASC'  => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_RATING_ASC',
	'ordering_rating DESC' => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_RATING_DESC',
	'ordering_date ASC'    => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_DATE_ASC',
	'ordering_date DESC'   => 'COM_RADICALMART_CATEGORY_ITEMS_ORDERING_DATE_DESC',
];

if (!isset($options[$productsListOrdering]))
{
	$productsListOrdering = 'ordering ASC';
}

$cookiePath = Uri::root(true) . '/';
$cookieFallbackScript = sprintf(
	'(function () {'
	. 'const path = %1$s;'
	. 'const setCookie = function (name, value) {'
	. 'document.cookie = name + "=" + value + "; expires="'
	. ' + (new Date(Date.now() + 6.04e+8)).toUTCString() + "; path=" + path;'
	. '};'
	. 'window.setProductsListTemplate = window.setProductsListTemplate || function (value) {'
	. 'setCookie("com_radicalmart_category_list_item_template", value); window.location.reload();'
	. '};'
	. 'window.setProductsOrdering = window.setProductsOrdering || function (value) {'
	. 'setCookie("com_radicalmart_category_list_ordering", value);'
	. 'const url = new URL(window.location.href); url.searchParams.delete("start"); window.location.href = url.toString();'
	. '};'
	. '}());',
	json_encode($cookiePath, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP),
);
Factory::getApplication()
	->getDocument()
	->getWebAssetManager()
	->addInlineScript($cookieFallbackScript, ['name' => 'plg_system_ytdynamics.product_list_cookie_fallback']);

$el = $this->el('div', [

	'class' => [
		'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
		'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
		'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding}',
		'uk-card-body {@panel_style: card-.*} {@panel_padding}',
	],
]);



?>

<?= $el($props, $attrs) ?>

<div class="uk-grid-small uk-flex-middle" uk-grid>
	<div class="uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small">
		<select class="uk-select uk-form-width-medium"
		        aria-label="<?php echo Text::_('COM_RADICALMART_CATEGORY_ITEMS_ORDERING_ORDERING'); ?>"
		        onchange="setProductsOrdering(this.value);">
			<?php foreach ($options as $value => $text): ?>
				<option value="<?php echo $value; ?>" <?php if (strtolower($value) === strtolower($productsListOrdering)) { echo 'selected'; } ?>>
					<?php echo Text::_($text); ?>
				</option>
			<?php endforeach; ?>
		</select>
	</div>
	<div class="uk-width-auto@s uk-flex uk-flex-center uk-flex-middle">
		<ul class="uk-subnav uk-iconnav uk-margin-small-left uk-visible@s">
			<li class="<?php echo ($productsListTemplate === 'grid') ? 'uk-active' : ''; ?>">
				<button type="button" class="uk-icon-button"
				        uk-icon="grid" uk-tooltip onclick="setProductsListTemplate('grid')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_GRID'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_GRID'); ?>"></button>
			</li>
			<li class="<?php echo ($productsListTemplate === 'list') ? 'uk-active' : ''; ?>">
				<button type="button" class="uk-icon-button"
				        uk-icon="list" uk-tooltip onclick="setProductsListTemplate('list')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_LIST'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_LIST'); ?>"></button>
			</li>
			<li class="<?php echo ($productsListTemplate === 'table') ? 'uk-active' : ''; ?>">
				<button type="button" class="uk-icon-button"
				        uk-icon="table" uk-tooltip onclick="setProductsListTemplate('table')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_TABLE'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_TABLE'); ?>"></button>
			</li>
		</ul>
	</div>
</div>

<div radicalmart-ajax="loading"
     class="uk-position-fixed uk-position-cover uk-position-z-index uk-overlay-default uk-flex uk-flex-middle uk-flex-center"
     style="display: none">
	<div uk-spinner="ratio: 3"></div>
</div>

<?= $el->end() ?>
