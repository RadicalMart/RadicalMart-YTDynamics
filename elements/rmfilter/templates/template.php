<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\Registry\Registry;

$moduleId = (int) ($props['module'] ?? 0);
$module = $moduleId > 0 ? ModuleHelper::getModuleById((string) $moduleId) : null;

if (!$module || empty($module->id) || $module->module !== 'mod_radicalmart_filter')
{
	return;
}

// The stock Ajax response only knows about the component's native product
// list. Builder grids are dynamic-source content, so a canonical GET reload
// is required to keep the module, URL and every Builder collection in sync.
$module = clone $module;
$moduleParams = new Registry($module->params);
$moduleParams->set('ajax', 0);
$module->params = $moduleParams->toString();

$presentation = in_array(($props['presentation'] ?? 'responsive'), ['responsive', 'dropdown', 'accordion'], true)
	? $props['presentation'] : 'responsive';
$breakpoint = max(640, min(1440, (int) ($props['desktop_breakpoint'] ?? 960)));
$dropdownWidth = max(220, min(640, (int) ($props['dropdown_width'] ?? 320)));
$dropdownMaxHeight = max(180, min(720, (int) ($props['dropdown_max_height'] ?? 420)));
$delay = max(0, min(1500, (int) ($props['auto_submit_delay'] ?? 250)));
$mobileInitialOpen = in_array(($props['mobile_initial_open'] ?? 'first'), ['first', 'active', 'none', 'module'], true)
	? $props['mobile_initial_open'] : 'first';

unset($module->contentRendered);
$renderer = Factory::getApplication()->getDocument()->loadRenderer('module');
$content = trim((string) $renderer->render($module, ['style' => 'none']));
if ($content === '')
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.catalog-navigation');
$assets->useScript('plg_system_ytdynamics.catalog-navigation');

$el = $this->el('div', [
	'class' => ['rm-filter', 'rm-filter--' . $presentation],
	'data-rm-filter' => true,
	'data-presentation' => $presentation,
	'data-breakpoint' => $breakpoint,
	'data-auto-submit' => !empty($props['auto_submit']) ? 'true' : 'false',
	'data-auto-submit-delay' => $delay,
	'data-close-on-change' => !empty($props['close_on_change']) ? 'true' : 'false',
	'data-show-active-count' => !array_key_exists('show_active_count', $props) || !empty($props['show_active_count']) ? 'true' : 'false',
	'data-show-submit' => !array_key_exists('show_submit', $props) || !empty($props['show_submit']) ? 'true' : 'false',
	'data-mobile-initial-open' => $mobileInitialOpen,
	'style' => '--rm-filter-dropdown-width: ' . $dropdownWidth . 'px; --rm-filter-dropdown-max-height: ' . $dropdownMaxHeight . 'px;',
]);
?>
<?= $el($props, $attrs) ?>
<div class="rm-filter__module"><?= $content ?></div>
<?= $el->end() ?>
