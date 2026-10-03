<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.lazy-pagination');
$assets->useScript('plg_system_ytdynamics.lazy-pagination');

$buttonStyle = in_array(($props['button_style'] ?? 'default'), ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? ($props['button_style'] ?? 'default')
	: 'default';
$buttonSize = in_array(($props['button_size'] ?? 'large'), ['', 'small', 'large'], true)
	? ($props['button_size'] ?? 'large')
	: 'large';
$buttonClasses = ['uk-button', 'uk-button-' . $buttonStyle];
if ($buttonSize !== '') $buttonClasses[] = 'uk-button-' . $buttonSize;
if (!empty($props['button_fullwidth'])) $buttonClasses[] = 'uk-width-1-1';
$buttonMinWidth = max(80, min(800, (int) ($props['button_min_width'] ?? 220)));
$buttonHeight = max(32, min(120, (int) ($props['button_height'] ?? 56)));

$el = $this->el('div', [
	'class' => ['uk-panel rm-lazy-pagination uk-text-{text_align}[@{text_align_breakpoint} [uk-text-{text_align_fallback}]]'],
	'data-rm-lazy-pagination' => true,
	'data-next-url' => (string) ($props['next_url'] ?? ''),
	'data-target-selector' => (string) ($props['target_selector'] ?? '[data-rm-product-scope]'),
	'data-auto-after-click' => !empty($props['auto_after_click']) ? 'true' : 'false',
	'data-update-url' => !empty($props['update_url']) ? 'true' : 'false',
	'data-preload-distance' => max(0, min(1600, (int) ($props['preload_distance'] ?? 500))),
	'data-loading-label' => (string) ($props['loading_label'] ?? 'Loading…'),
	'data-complete-label' => (string) ($props['complete_label'] ?? 'All products loaded'),
	'data-page-current' => (int) ($props['page_current'] ?? 1),
	'data-pages-total' => (int) ($props['pages_total'] ?? 1),
]);
?>

<?= $el($props, $attrs) ?>
	<button type="button" class="rm-lazy-pagination__button <?= implode(' ', $buttonClasses) ?>"
	        style="--rm-lazy-button-min-width: <?= $buttonMinWidth ?>px; --rm-lazy-button-height: <?= $buttonHeight ?>px;">
		<span class="rm-lazy-pagination__spinner" aria-hidden="true"></span>
		<span class="rm-lazy-pagination__label"><?= htmlspecialchars((string) ($props['button_label'] ?? 'Load more'), ENT_QUOTES, 'UTF-8') ?></span>
	</button>
	<div class="rm-lazy-pagination__status uk-hidden" aria-live="polite"></div>
	<?php if (!empty($props['show_pages']) && !empty($props['pagination_pages'])): ?>
	<nav class="rm-lazy-pagination__pages" aria-label="<?= htmlspecialchars(Text::_('TPL_YOOTHEME_PAGINATION'), ENT_QUOTES, 'UTF-8') ?>">
		<ul class="uk-pagination uk-flex-center uk-margin-small-top uk-margin-remove-bottom" uk-margin>
			<?php foreach ($props['pagination_pages'] as $key => $page): ?>
				<?php if ($page->active): ?>
				<li class="uk-active"<?= is_int($key) ? ' data-rm-page="' . $key . '"' : '' ?>><span aria-current="page"><?= $page->text ?></span></li>
				<?php elseif ($page->link): ?>
				<li<?= is_int($key) ? ' data-rm-page="' . $key . '"' : '' ?>>
					<a href="<?= htmlspecialchars($page->link, ENT_QUOTES, 'UTF-8') ?>"<?= in_array($key, ['previous', 'next'], true) ? ' aria-label="' . htmlspecialchars($page->text, ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
						<?php if ($key === 'previous'): ?><span uk-pagination-previous></span><?php elseif ($key === 'next'): ?><span uk-pagination-next></span><?php else: ?><?= $page->text ?><?php endif; ?>
					</a>
				</li>
				<?php else: ?>
				<li class="uk-disabled"><span><?= $page->text ?></span></li>
				<?php endif; ?>
			<?php endforeach; ?>
		</ul>
	</nav>
	<?php endif; ?>
<?= $el->end() ?>
