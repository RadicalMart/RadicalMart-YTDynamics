<?php
/*
* @package     RadicalMart Compare Component
* @version     __DEPLOY_VERSION__
* @author      CaveDesign Studio - cavedesign.ru
* @copyright   Copyright (c) 2009 - $today.year CaveDesign Studio. All Rights Reserved.
* @license     GNU/GPL license: https://www.gnu.org/copyleft/gpl.html
* @link        https://cavedesign.ru/
*/

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

$template = Factory::getApplication()->getTemplate();

if ($template !== 'yootheme' && $this->params->get('uikit', 1))
{
	HTMLHelper::stylesheet('com_radicalmart/uikit.min.css', array('version' => 'auto', 'relative' => true));
	HTMLHelper::script('com_radicalmart/uikit.min.js', array('version' => 'auto', 'relative' => true));
	HTMLHelper::script('com_radicalmart/uikit-icons.min.js', array('version' => 'auto', 'relative' => true));
}

if ($template === 'cassiopeia')
{
	HTMLHelper::_('bootstrap.tab');
}

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
	<div id="RadicalMartCompare" class="radicalmart-container compare">
		<div>
			<?php if (empty($this->items)) : ?>
				<div class="alert alert-info">
					<span class="icon-info-circle" aria-hidden="true"></span>
					<span class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
					<?php echo Text::_('COM_RADICALMART_COMPARE_ERROR_PRODUCTS_NOT_FOUND'); ?>
				</div>
			<?php else: ?>

				<ul class="nav nav-pills" id="categoryTabs" role="tablist">
					<?php $i = 0; ?>
					<?php foreach ($this->groupedItems as $catId => $group): ?>
						<li class="nav-item" role="presentation">
							<button
								class="nav-link <?php echo $i === 0 ? 'active' : ''; ?>"
								id="tab-<?php echo $catId; ?>"
								data-bs-toggle="tab"
								data-bs-target="#content-<?php echo $catId; ?>"
								type="button"
								role="tab"
								aria-controls="content-<?php echo $catId; ?>"
								aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>">
								<?php echo htmlspecialchars($group['category']['title']); ?>
							</button>
						</li>
						<?php $i++; ?>
					<?php endforeach; ?>
				</ul>

				<div class="tab-content" id="categoryTabsContent">
					<?php $i = 0; ?>
					<?php foreach ($this->groupedItems as $catId => $group): ?>
						<div
							class="tab-pane fade <?php echo $i === 0 ? 'show active' : ''; ?>"
							id="content-<?php echo $catId; ?>"
							role="tabpanel"
							aria-labelledby="tab-<?php echo $catId; ?>">
							<div class="products-list">
								<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
									<?php foreach ($group['items'] as $item)
									{
										$layout = ($item->isMeta) ? 'components.radicalmart_compare.metas.' . $item->type . '.item.grid'
											: 'components.radicalmart_compare.products.item.grid';

										echo '<div class="mb-3">' . LayoutHelper::render($layout, ['product' => $item, 'mode' => $this->mode]) . '</div>';
									} ?>
								</div>
							</div>
							<div class="compare-list">
								<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
									<?php foreach ($group['items'] as $item)
									{
										$layout = ($item->isMeta) ? 'components.radicalmart_compare.metas.' . $item->type . '.item.compare'
											: 'components.radicalmart_compare.products.item.compare';

										echo '<div class="mb-3">' . LayoutHelper::render($layout, ['product' => $item, 'mode' => $this->mode]) . '</div>';
									} ?>
								</div>
							</div>
						</div>
						<?php $i++; ?>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>


<?php if ($this->items && $this->pagination): ?>
	<div class="list-pagination mt-3">
		<?php echo $this->pagination->getPaginationLinks(); ?>
	</div>
<?php endif; ?>