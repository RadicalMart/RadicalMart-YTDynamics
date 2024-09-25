<?php
/*
 * @package     RadicalMart Bonuses Package
 * @subpackage  com_radicalmart_bonuses
 * @version     __DEPLOY_VERSION__
 * @author      RadicalMart Team - radicalmart.ru
 * @copyright   Copyright (c) 2024 RadicalMart. All rights reserved.
 * @license     GNU/GPL license: https://www.gnu.org/copyleft/gpl.html
 * @link        https://radicalmart.ru/
 */

\defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

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
<div id="RadicalMartBonuses" class="bonuses-points">
	<?php if (empty($this->items)) : ?>
        <div class="alert alert-info">
            <span class="icon-info-circle" aria-hidden="true"></span><span
                    class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
			<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS_NO_ITEMS'); ?>
        </div>
	<?php else : ?>
        <table id="pointsList" class="table  table-bordered">

            <thead>
            <tr>

                <th scope="col" class="w-1">
					<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS_END'); ?>
                </th>
                <th scope="col" class="d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS_REASON'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS_CREATED'); ?>
                </th>
                <th scope="col" class="w-10 d-none d-md-table-cell">
					<?php echo Text::_('COM_RADICALMART_BONUSES_POINTS_CREATED_BY'); ?>
                </th>
            </tr>
            </thead>
            <tbody>
			<?php foreach ($this->items as $i => $item) : ?>
                <tr class="row<?php echo $i % 2; ?>">
                    <th class="text-nowrap">
                        <div>
									<span class="text-<?php echo ($item->points > 0) ? 'success' : 'danger'; ?>">
										<?php echo $item->points; ?>
									</span>
                        </div>
                    </th>
                    <td class="small text-nowrap d-none d-md-table-cell">
						<?php echo (empty($item->end)) ? Text::_('JNEVER') :
							HTMLHelper::date($item->end, Text::_('DATE_FORMAT_LC5')); ?>
                    </td>
                    <td class="small d-none d-md-table-cell">
						<?php if (!empty($item->reason)): ?>
							<?php echo $item->reason->text; ?>
						<?php endif; ?>
                    </td>
                    <td class="small text-nowrap d-none d-md-table-cell">
						<?php echo HTMLHelper::date($item->created, Text::_('DATE_FORMAT_LC5')); ?>
                    </td>
                    <td class="text-nowrap d-none d-md-table-cell">
						<?php echo $item->created_by->name; ?>
                    </td>
                </tr>
			<?php endforeach; ?>
            </tbody>
        </table>
		<?php echo $this->pagination->getListFooter(); ?>
	<?php endif; ?>
</div>