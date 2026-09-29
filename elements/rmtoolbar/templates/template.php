<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState;

$productsListTemplate = ProductListState::layout();
$showGridButton  = $props['show_grid_button'] ?? true;
$showListButton  = $props['show_list_button'] ?? true;
$showTableButton = $props['show_table_button'] ?? true;
$showOrdering = $props['show_ordering'] ?? true;
$orderingWidth = in_array(($props['ordering_width'] ?? 'medium'), ['', 'small', 'medium', 'large', 'full'], true)
	? ($props['ordering_width'] ?? 'medium') : 'medium';
$switcherBreakpoint = in_array(($props['switcher_breakpoint'] ?? 's'), ['', 's', 'm', 'l'], true)
	? ($props['switcher_breakpoint'] ?? 's') : 's';

$productsListOrdering = ProductListState::ordering();
$options = ProductListState::orderingOptions();

$cookiePath = Uri::root(true) . '/';
$cookieFallbackScript = sprintf(
	'(function () {'
	. 'const path = %1$s;'
	. 'const setCookie = function (name, value) {'
	. 'document.cookie = name + "=" + value + "; expires="'
	. ' + (new Date(Date.now() + 6.04e+8)).toUTCString() + "; path=" + path;'
	. '};'
	. 'window.setProductsListTemplate = window.setProductsListTemplate || function (value) {'
	. 'setCookie(' . json_encode(ProductListState::LAYOUT_COOKIE) . ', value); window.location.reload();'
	. '};'
	. 'window.setProductsOrdering = window.setProductsOrdering || function (value) {'
	. 'setCookie(' . json_encode(ProductListState::ORDERING_COOKIE) . ', value);'
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

<div class="rm-toolbar__controls uk-grid-small uk-flex-middle" uk-grid>
	<?php if ($showOrdering): ?>
	<div class="rm-toolbar__ordering uk-width-expand@s uk-flex uk-flex-center uk-flex-left@s uk-text-small">
		<select class="rm-toolbar__select uk-select<?= $orderingWidth === 'full' ? ' uk-width-1-1' : ($orderingWidth ? ' uk-form-width-' . $orderingWidth : '') ?>"
		        aria-label="<?php echo Text::_('COM_RADICALMART_CATEGORY_ITEMS_ORDERING_ORDERING'); ?>"
		        onchange="setProductsOrdering(this.value);">
			<?php foreach ($options as $value => $text): ?>
				<option value="<?php echo htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); ?>" <?php if ($value === $productsListOrdering) { echo 'selected'; } ?>>
					<?php echo Text::_($text); ?>
				</option>
			<?php endforeach; ?>
		</select>
	</div>
	<?php endif; ?>
	<?php if ($showGridButton || $showListButton || $showTableButton): ?>
	<div class="rm-toolbar__layouts uk-width-auto@s uk-flex uk-flex-center uk-flex-middle<?= $switcherBreakpoint ? ' uk-visible@' . $switcherBreakpoint : '' ?>">
		<ul class="uk-subnav uk-iconnav uk-margin-small-left">
			<?php if ($showGridButton): ?>
			<li class="<?php echo ($productsListTemplate === 'grid') ? 'uk-active' : ''; ?>">
				<button type="button" class="rm-toolbar__layout-button uk-icon-button"
				        uk-icon="grid" uk-tooltip onclick="setProductsListTemplate('grid')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_GRID'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_GRID'); ?>"></button>
			</li>
			<?php endif; ?>
			<?php if ($showListButton): ?>
			<li class="<?php echo ($productsListTemplate === 'list') ? 'uk-active' : ''; ?>">
				<button type="button" class="rm-toolbar__layout-button uk-icon-button"
				        uk-icon="list" uk-tooltip onclick="setProductsListTemplate('list')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_LIST'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_LIST'); ?>"></button>
			</li>
			<?php endif; ?>
			<?php if ($showTableButton): ?>
			<li class="<?php echo ($productsListTemplate === 'table') ? 'uk-active' : ''; ?>">
				<button type="button" class="rm-toolbar__layout-button uk-icon-button"
				        uk-icon="table" uk-tooltip onclick="setProductsListTemplate('table')"
				        aria-label="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_TABLE'); ?>"
				        title="<?php echo Text::_('COM_RADICALMART_PRODUCTS_LIST_LAYOUT_TABLE'); ?>"></button>
			</li>
			<?php endif; ?>
		</ul>
	</div>
	<?php endif; ?>
</div>

<div radicalmart-ajax="loading"
     class="rm-toolbar__loader uk-position-fixed uk-position-cover uk-position-z-index uk-overlay-default uk-flex uk-flex-middle uk-flex-center"
     style="display: none">
	<div uk-spinner="ratio: 3"></div>
</div>

<?= $el->end() ?>
