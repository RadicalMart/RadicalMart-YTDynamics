<?php if (!empty($children)) : ?>
<div>
	<?php foreach ($children as $child) : ?>
		<?= $builder->render($child) ?>
	<?php endforeach ?>
</div>
<?php endif ?>
