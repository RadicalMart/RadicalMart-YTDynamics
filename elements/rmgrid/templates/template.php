<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$mode                 = $props['mode'];

if(str_contains($mode, 'radicalmart_'))
{
	$app                  = Factory::getApplication();
	$cookieName           = 'radicalmart_products-list_layout';
	$productsListTemplate = $app->input->cookie->get($cookieName, 'grid');

	$cookieName           = 'radicalmart_products-list_ordering';
	$productsListOrdering = $app->input->cookie->get($cookieName);

    if($mode === 'radicalmart_grid' && $productsListTemplate !== 'grid')
    {
        return;
    }

	if($mode === 'radicalmart_list' && $productsListTemplate !== 'list')
	{
		return;
	}

}


$el = $this->el('div', []);

// Grid
$grid = $this->el('div', [

	'class'            => [
		'uk-grid',
		'uk-child-width-[1-{@!grid_default: auto}]{grid_default}',
		'uk-child-width-[1-{@!grid_small: auto}]{grid_small}@s',
		'uk-child-width-[1-{@!grid_medium: auto}]{grid_medium}@m',
		'uk-child-width-[1-{@!grid_large: auto}]{grid_large}@l',
		'uk-child-width-[1-{@!grid_xlarge: auto}]{grid_xlarge}@xl',
		'uk-flex-center {@grid_column_align} {@!grid_masonry}',
		'uk-flex-middle {@grid_row_align} {@!grid_masonry}',
		$props['grid_column_gap'] == $props['grid_row_gap'] ? 'uk-grid-{grid_column_gap}' : '[uk-grid-column-{grid_column_gap}] [uk-grid-row-{grid_row_gap}]',
		'uk-grid-divider {@grid_divider} {@!grid_column_gap:collapse} {@!grid_row_gap:collapse}' => count($children) > 1,
		'uk-grid-match',
	],
	'uk-grid'          => true,
	'radicalmart-ajax' => 'products'
]);

?>

<?= $el($props, $attrs) ?>

<?= $grid($props) ?>
<?php foreach ($children as $child) : ?>
    <div><?= $builder->render($child, ['element' => $props]) ?></div>
<?php endforeach ?>
<?= $grid->end() ?>

<?= $el->end() ?>
