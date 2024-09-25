<?php

\defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\Component\RadicalMart\Administrator\Helper\PriceHelper;
use Joomla\Utilities\ArrayHelper;

// Load assets
/** @var \Joomla\CMS\WebAsset\WebAssetManager $assets */
$assets = $this->document->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('com_radicalmart');
if ($this->params->get('radicalmart_js', 1))
{
	$assets->useScript('com_radicalmart.site');
}

if ($this->params->get('trigger_js', 1))
{
	$assets->useScript('com_radicalmart.site.trigger');
}
?>
<div id="RadicalMartBonuses" class="bonuses-codes">
	<?php if (empty($this->items)) : ?>
        <div class="alert alert-info">
            <span class="icon-info-circle" aria-hidden="true"></span><span
                    class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
			<?php echo Text::_('COM_RADICALMART_BONUSES_CODES_NO_ITEMS'); ?>
        </div>
	<?php else : ?>
        <table id="codesList" class="table  table-bordered">
            <thead>
            <tr>
                <th scope="col" class="w-1">
					<?php echo Text::_('COM_RADICALMART_BONUSES_CODE'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_PRICE_DISCOUNT'); ?>
                </th>
                <th scope="col" class="d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_ORDERS'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_CODE_CREATED'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_CODE_CREATED_BY'); ?>
                </th>
            </tr>
            </thead>
            <tbody>
			<?php foreach ($this->items as $i => $item): ?>
                <tr class="row<?php echo $i % 2; ?> <?php if (!$item->enabled) echo 'bg-danger'; ?>">
                    <th class="text-nowrap">
                        <a href="javascript:void(0);" class="<?php if (!$item->enabled) echo 'text-light'; ?>"
                           onclick="new bootstrap.Toast(document.querySelector('#radicalmartBonusesCode_<?php echo $item->id; ?> .toast'), {autohide: false}).show();">
							<?php echo $item->code; ?>
                        </a>
                        <div id="radicalmartBonusesCode_<?php echo $item->id; ?>"
                             class="toast-container position-fixed p-3 top-50 start-50 translate-middle">
                            <div class="toast bg-opacity-100 bg-white">
                                <div class="toast-header">
                                    <span class="icon-circle text-success me-2"></span>
                                    <strong class="me-auto"><?php echo Text::_('COM_RADICALMART_BONUSES_CODE'); ?></strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                                </div>
                                <div class="toast-body">
                                    <div class="h2">
										<?php echo $item->code; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th>
                    <td class="small text-nowrap d-none d-md-table-cell <?php if (!$item->enabled) echo 'text-light'; ?>">
						<?php echo (strpos($item->discount, '%') !== false) ? $item->discount :
							PriceHelper::toString($item->discount); ?>
                    </td>
                    <td class="small d-none d-md-table-cell  <?php if (!$item->enabled) echo 'text-light'; ?>">
						<?php if (!empty($item->orders))
						{
							echo implode(',', ArrayHelper::getColumn($item->orders, 'number'));
						} ?>
                    </td>
                    <td class="small text-nowrap d-none d-md-table-cell <?php if (!$item->enabled) echo 'text-light'; ?>">
						<?php echo HTMLHelper::date($item->created, Text::_('DATE_FORMAT_LC5')); ?>
                    </td>
                    <td class="text-nowrap d-none d-md-table-cell <?php if (!$item->enabled) echo 'text-light'; ?>">
						<?php echo $item->created_by->name; ?>
                    </td>
                </tr>
			<?php endforeach; ?>
            </tbody>
        </table>
		<?php echo $this->pagination->getListFooter(); ?>
	<?php endif; ?>
</div>