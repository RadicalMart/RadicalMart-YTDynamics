<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$app                  = Factory::getApplication();
$cookieName           = 'radicalmart_products-list_layout';
$productsListTemplate = $app->input->cookie->get($cookieName, 'grid');

$cookieName           = 'radicalmart_products-list_ordering';
$productsListOrdering = $app->input->cookie->get($cookieName);

if ($productsListTemplate !== 'list')
{
	return;
}

$el = $this->el('div', [

]);

// Grid
$grid = $this->el('div', [

	'class' => [
		'uk-grid',
		'uk-child-width-1-1',
		$props['grid_column_gap'] == $props['grid_row_gap'] ? 'uk-grid-{grid_column_gap}' : '[uk-grid-column-{grid_column_gap}] [uk-grid-row-{grid_row_gap}]',
	],

	'uk-grid' => true,

]);

?>

<?= $el($props, $attrs) ?>

<?= $grid($props) ?>
<?php foreach ($children as $child) : ?>
    <div><?= $builder->render($child, ['element' => $props]) ?></div>
<?php endforeach ?>
<?= $grid->end() ?>

<?= $el->end() ?>
