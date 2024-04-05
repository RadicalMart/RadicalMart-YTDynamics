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

?>

<?php \defined('_JEXEC') or die;

$el = $this->el('div', [

]);

// Grid
$grid = $this->el('div', [

	'class' => [
		'uk-grid',
		'uk-child-width-1',
	],

	'uk-grid' => ' ',

]);

?>

<?= $el($props, $attrs) ?>

<?= $grid($props) ?>
<?php foreach ($children as $child) : ?>
    <div><?= $builder->render($child, ['element' => $props]) ?></div>
<?php endforeach ?>
<?= $grid->end() ?>

<?= $el->end() ?>
