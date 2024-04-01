<?php \defined('_JEXEC') or die; ?>

<?php if ($productsListTemplate === 'grid'): ?>
	<?php echo $this->render("{$__dir}/template-grid", compact('props', 'productsListTemplate', 'productsListOrdering')); ?>
<?php endif; ?>

<?php if ($productsListTemplate === 'list'): ?>
	<?php echo $this->render("{$__dir}/template-list", compact('props', 'productsListTemplate', 'productsListOrdering')); ?>
<?php endif; ?>
