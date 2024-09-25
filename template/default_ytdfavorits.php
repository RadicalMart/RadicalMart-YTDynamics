<?php

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

if ($this->mode === 'shop')
{
	HTMLHelper::script('com_radicalmart/cart.min.js', array('version' => 'auto', 'relative' => true));
	HTMLHelper::script('com_radicalmart/axios.min.js', array('version' => 'auto', 'relative' => true));
	if ($this->params->get('radicalmart_js', 1))
	{
		HTMLHelper::script('com_radicalmart/radicalmart.min.js', array('version' => 'auto', 'relative' => true));
	}
}

if ($this->params->get('trigger_js', 1))
{
	HTMLHelper::script('com_radicalmart/trigger.min.js', array('version' => 'auto', 'relative' => true));
}

$showAddition = ((!$this->pagination || (int) $this->pagination->pagesCurrent === 1));

?>
	<div id="RadicalMartFavorites" class="radicalmart-container favorites">
		<div>
			<?php if (empty($this->items)) : ?>
				<div class="alert alert-info">
					<span class="icon-info-circle" aria-hidden="true"></span>
					<span class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
					<?php echo Text::_('COM_RADICALMART_FAVORITES_ERROR_PRODUCTS_NOT_FOUND'); ?>
				</div>
			<?php else: ?>
				<div class="products-list">
					<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
						<?php foreach ($this->items as $item)
						{
							$layout = ($item->isMeta) ? 'components.radicalmart_favorites.metas.' . $item->type . '.item.grid'
								: 'components.radicalmart_favorites.products.item.grid';

							echo '<div class="mb-3">' . LayoutHelper::render($layout, ['product' => $item, 'mode' => $this->mode]) . '</div>';
						} ?>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
<?php if ($this->items && $this->pagination): ?>
	<div class="list-pagination mt-3">
		<?php echo $this->pagination->getPaginationLinks(); ?>
	</div>
<?php endif; ?>