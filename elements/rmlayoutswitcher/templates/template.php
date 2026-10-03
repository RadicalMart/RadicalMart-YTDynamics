<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState;

$activeLayout = ProductListState::layout();
$breakpoint = in_array(($props['switcher_breakpoint'] ?? 's'), ['', 's', 'm', 'l'], true)
	? ($props['switcher_breakpoint'] ?? 's')
	: 's';
$style = in_array(($props['switcher_style'] ?? 'icon'), ['icon', 'text', 'icon_text'], true)
	? ($props['switcher_style'] ?? 'icon')
	: 'icon';

$layouts = [
	'tile' => [
		'show' => $props['show_grid_button'] ?? true,
		'icon' => 'grid',
		'label' => trim((string) ($props['tile_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_LAYOUT_TILE'),
	],
	'compact' => [
		'show' => $props['show_compact_button'] ?? true,
		'icon' => 'thumbnails',
		'label' => trim((string) ($props['compact_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_LAYOUT_COMPACT'),
	],
	'list' => [
		'show' => $props['show_list_button'] ?? true,
		'icon' => 'list',
		'label' => trim((string) ($props['list_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_LAYOUT_LIST'),
	],
	'price' => [
		'show' => $props['show_table_button'] ?? false,
		'icon' => 'table',
		'label' => trim((string) ($props['price_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_LAYOUT_PRICE'),
	],
];
$visibleLayouts = array_filter($layouts, static fn(array $layout): bool => $layout['show']);

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.toolbar');
$assets->useScript('plg_system_ytdynamics.toolbar');

$el = $this->el('div', [
	'class' => ['uk-panel rm-layout-switcher'],
	'data-rm-layout-switcher' => true,
	'data-mode-cookie' => ProductListState::modeCookie(),
	'data-layout-cookie' => ProductListState::LAYOUT_COOKIE,
	'data-cookie-path' => Uri::root(true) . '/',
	'data-rm-layouts' => implode(',', array_keys($visibleLayouts)),
]);
?>

<?= $el($props, $attrs) ?>
	<?php if ($visibleLayouts): ?>
	<div class="rm-toolbar__layouts uk-flex uk-flex-middle<?= $breakpoint ? ' uk-visible@' . $breakpoint : '' ?>">
		<ul class="uk-subnav <?= $style === 'icon' ? 'uk-iconnav' : 'uk-subnav-pill' ?>">
			<?php foreach ($visibleLayouts as $layout => $settings):
				$active = $activeLayout === $layout;
				$label = htmlspecialchars($settings['label'], ENT_QUOTES, 'UTF-8');
			?>
			<li class="<?= $active ? 'uk-active' : '' ?>">
				<button type="button"
				        class="rm-toolbar__layout-button <?= $style === 'icon' ? 'uk-icon-button' : 'uk-button uk-button-default uk-button-small' ?>"
				        data-rm-layout="<?= $layout ?>"
				        aria-pressed="<?= $active ? 'true' : 'false' ?>"
				        aria-label="<?= $label ?>"
				        title="<?= $label ?>"<?= $style === 'icon' ? ' uk-tooltip' : '' ?>>
					<?php if ($style !== 'text'): ?>
					<span<?= $style === 'icon_text' ? ' class="uk-margin-small-right"' : '' ?> uk-icon="icon: <?= $settings['icon'] ?>"></span>
					<?php endif; ?>
					<?php if ($style !== 'icon'): ?><span><?= $label ?></span><?php endif; ?>
				</button>
			</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php if ($breakpoint): ?>
	<div class="rm-toolbar__layouts-mobile uk-hidden@<?= $breakpoint ?>">
		<select class="rm-toolbar__layout-select uk-select" aria-label="<?= htmlspecialchars(Text::_('PLG_YTDYNAMICS_LAYOUT_SELECT'), ENT_QUOTES, 'UTF-8') ?>">
			<?php foreach ($visibleLayouts as $layout => $settings): ?>
			<option value="<?= $layout ?>"<?= $activeLayout === $layout ? ' selected' : '' ?>><?= htmlspecialchars($settings['label'], ENT_QUOTES, 'UTF-8') ?></option>
			<?php endforeach; ?>
		</select>
	</div>
	<?php endif; ?>
	<?php endif; ?>
<?= $el->end() ?>
