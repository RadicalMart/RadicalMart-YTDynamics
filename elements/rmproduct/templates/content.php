<?php if (!empty($children)) : ?>
<div>
	<?php foreach ($children as $child) : ?>
		<?= $builder->render($child, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []) ?>
	<?php endforeach ?>
</div>
<?php endif ?>
