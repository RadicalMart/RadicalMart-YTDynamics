<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$app                  = Factory::getApplication();
$cookieName           = 'radicalmart_products-list_layout';
$productsListTemplate = $app->input->cookie->get($cookieName, 'grid');

$cookieName           = 'radicalmart_products-list_ordering';
$productsListOrdering = $app->input->cookie->get($cookieName);

?>

<div radicalmart-ajax="loading"
     class="uk-position-fixed uk-position-cover uk-position-z-index uk-overlay-default uk-flex uk-flex-middle uk-flex-center"
     style="display: none">
    <div uk-spinner="ratio: 3"></div>
</div>

<?php echo $this->render("{$__dir}/template-toolbar", compact('element', 'props', 'attrs', 'productsListTemplate', 'productsListOrdering')); ?>

<?php if ($productsListTemplate === 'grid'): ?>
	<?php echo $this->render("{$__dir}/template-grid", compact('props', 'productsListTemplate', 'productsListOrdering')); ?>
<?php endif; ?>

<?php if ($productsListTemplate === 'list'): ?>
	<?php echo $this->render("{$__dir}/template-list", compact('props', 'productsListTemplate', 'productsListOrdering')); ?>
<?php endif; ?>