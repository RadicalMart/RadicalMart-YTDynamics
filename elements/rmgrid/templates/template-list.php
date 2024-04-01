<?php \defined('_JEXEC') or die;

$el = $this->el('div', [

]);

// Grid
$grid = $this->el('div', [

	'class' => [
		'uk-grid',
		'uk-child-width-1-1',
	],

	'uk-grid' => '',

]);

?>

<?= $el($props, $attrs) ?>

<?= $grid($props) ?>
<?php foreach ($children as $child) : ?>
	<div><?= $builder->render($child, ['element' => $props]) ?></div>
<?php endforeach ?>
<?= $grid->end() ?>

<?= $el->end() ?>
