<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$mode = $props['mode'];

if (str_contains($mode, 'radicalmart_'))
{
	$app                  = Factory::getApplication();
	$cookieName           = 'com_radicalmart_category_list_item_template';
	$productsListTemplate = $app->input->get->getCmd($cookieName)
		?: $app->input->cookie->getCmd($cookieName, 'grid');
	$productsListTemplate = in_array($productsListTemplate, ['grid', 'list', 'table'], true)
		? $productsListTemplate
		: 'grid';

	if ($mode === 'radicalmart_grid' && $productsListTemplate !== 'grid')
	{
		return;
	}

	if ($mode === 'radicalmart_list' && $productsListTemplate !== 'list')
	{
		return;
	}

}

$children = array_values(array_filter($children, fn($child) => !empty($child->children)));
$empty = empty($children);

$el     = $this->el('div', []);
$config = [

	'class'   => [
		'uk-grid',
	],
	'uk-grid' => true,
];

if (!$empty)
{
	$config['class'] = array_merge($config['class'], [
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
	]);
}
else
{
	$config['class'] = array_merge($config['class'], [
		'uk-child-width-1-1',
	]);
}

// Grid
$grid = $this->el('div', $config);

?>

<?= $el($props, $attrs) ?>

<?= $grid($props) ?>
<?php if (!$empty) : ?>
	<?php foreach ($children as $child) : ?>
		<div><?= $builder->render($child, ['element' => $props]) ?></div>
	<?php endforeach ?>
<?php else: ?>
	<div>
		<div class="uk-alert uk-alert-warning"><?= Text::_('JGLOBAL_NO_MATCHING_RESULTS') ?></div>
	</div>
<?php endif; ?>
<?= $grid->end() ?>

<?= $el->end() ?>
