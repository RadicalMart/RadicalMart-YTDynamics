<?php

namespace YOOtheme;

use Joomla\CMS\Factory;

if (empty($children))
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.gallery');
$assets->useScript('plg_system_ytdynamics.gallery');

$clamp = static fn($value, int $min, int $max, int $fallback): int => is_numeric($value) ? max($min, min($max, (int) $value)) : $fallback;
$toBoolean = static fn($value, bool $fallback = false): bool => $value === null ? $fallback : filter_var($value, FILTER_VALIDATE_BOOLEAN);
$columnsS = $clamp($props['columns_s'] ?? null, 1, 4, 2);
$columnsM = $clamp($props['columns_m'] ?? null, 1, 6, 2);
$columnsL = $clamp($props['columns_l'] ?? null, 1, 6, 2);
$columnsXl = $clamp($props['columns_xl'] ?? null, 1, 6, 2);
$columnGap = $clamp($props['column_gap'] ?? null, 0, 80, 4);
$rowGap = $clamp($props['row_gap'] ?? null, 0, 80, 4);
$initialItems = $clamp($props['initial_items'] ?? null, 0, 20, 4);
$showMore = $toBoolean($props['show_more'] ?? null, true) && $initialItems > 0;
$hasOverflow = $showMore && count($children) > $initialItems;
$collapse = $toBoolean($props['collapse_after_expand'] ?? null);
$ratio = in_array(($props['image_ratio'] ?? '3/4'), ['', '1/1', '3/4', '2/3', '4/3', '3/2', '16/9'], true) ? (string) ($props['image_ratio'] ?? '3/4') : '3/4';
$fit = ($props['image_fit'] ?? 'cover') === 'contain' ? 'contain' : 'cover';
$positionKey = in_array(($props['image_position'] ?? 'center'), ['center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'], true) ? (string) ($props['image_position'] ?? 'center') : 'center';
$position = str_replace('-', ' ', $positionKey);
$loading = ($props['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy';
$background = trim((string) ($props['background_color'] ?? ''));
$blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
$blend = in_array(($props['mix_blend_mode'] ?? 'normal'), $blendModes, true) ? (string) ($props['mix_blend_mode'] ?? 'normal') : 'normal';
$border = in_array(($props['border'] ?? 'rounded'), ['', 'rounded', 'pill', 'circle'], true) ? (string) ($props['border'] ?? 'rounded') : 'rounded';
$shadow = in_array(($props['box_shadow'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', 'bottom'], true) ? (string) ($props['box_shadow'] ?? '') : '';
$mobileLayout = in_array(($props['mobile_layout'] ?? 'scroll'), ['scroll', 'grid', 'stack'], true) ? (string) ($props['mobile_layout'] ?? 'scroll') : 'scroll';
$mobileColumns = $clamp($props['mobile_columns'] ?? null, 1, 2, 1);
$mobileItemWidth = $clamp($props['mobile_item_width'] ?? null, 50, 100, 78);
$mobileColumnGap = $clamp($props['mobile_column_gap'] ?? null, 0, 40, 4);
$mobileRowGap = $clamp($props['mobile_row_gap'] ?? null, 0, 40, 4);
$lightbox = $toBoolean($props['lightbox'] ?? null, true);
$lightboxOptions = ['toggle: a[data-rm-product-gallery-lightbox]'];
if ($toBoolean($props['lightbox_controls'] ?? null, true)) $lightboxOptions[] = 'delay-controls: 0';
if ($toBoolean($props['lightbox_counter'] ?? null, true)) $lightboxOptions[] = 'counter: true';
if (!$toBoolean($props['lightbox_bg_close'] ?? null, true)) $lightboxOptions[] = 'bg-close: false';
$lightboxAnimation = in_array(($props['lightbox_animation'] ?? ''), ['', 'fade', 'scale'], true) ? (string) ($props['lightbox_animation'] ?? '') : '';
if ($lightboxAnimation !== '') $lightboxOptions[] = 'animation: ' . $lightboxAnimation;
$caption = $toBoolean($props['lightbox_caption'] ?? null, true);
$buttonStyle = in_array(($props['button_style'] ?? 'default'), ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true) ? (string) ($props['button_style'] ?? 'default') : 'default';
$buttonSize = in_array(($props['button_size'] ?? ''), ['', 'small', 'large'], true) ? (string) ($props['button_size'] ?? '') : '';
$showMoreLabel = trim((string) ($props['show_more_label'] ?? '')) ?: 'Показать ещё фото';
$showLessLabel = trim((string) ($props['show_less_label'] ?? '')) ?: 'Скрыть дополнительные фото';
$style = sprintf('--rm-product-gallery-columns-s:%d;--rm-product-gallery-columns-m:%d;--rm-product-gallery-columns-l:%d;--rm-product-gallery-columns-xl:%d;--rm-product-gallery-column-gap:%dpx;--rm-product-gallery-row-gap:%dpx;--rm-product-gallery-mobile-columns:%d;--rm-product-gallery-mobile-width:%d%%;--rm-product-gallery-mobile-column-gap:%dpx;--rm-product-gallery-mobile-row-gap:%dpx;--rm-product-gallery-fit:%s;--rm-product-gallery-position:%s;--rm-product-gallery-blend:%s', $columnsS, $columnsM, $columnsL, $columnsXl, $columnGap, $rowGap, $mobileColumns, $mobileItemWidth, $mobileColumnGap, $mobileRowGap, $fit, $position, $blend);
if ($ratio !== '') $style .= ';--rm-product-gallery-ratio:' . $ratio;
if ($background !== '') $style .= ';--rm-product-gallery-background:' . $background;

$root = $this->el('div', [
	'class' => [
		'rm-product-gallery',
		'rm-product-gallery--mobile-' . $mobileLayout,
		'rm-product-gallery--ratio-auto' => $ratio === '',
		'rm-product-gallery--hide-scrollbar' => $mobileLayout === 'scroll' && empty($props['mobile_scrollbar']),
		'rm-product-gallery--border-' . $border => $border !== '',
		'rm-product-gallery--shadow-' . $shadow => $shadow !== '',
	],
	'data-rm-product-gallery-grid' => true,
	'data-sync-product-media' => !empty($props['sync_product_media']) ? 'true' : 'false',
	'data-visible-limit' => $initialItems,
	'data-collapse' => $collapse ? 'true' : 'false',
	'data-expanded' => 'false',
	'data-image-loading' => $loading,
	'data-lightbox' => $lightbox ? 'true' : 'false',
	'data-lightbox-caption' => $caption ? 'true' : 'false',
	'data-show-more' => $showMore ? 'true' : 'false',
	'data-show-more-label' => $showMoreLabel,
	'data-show-less-label' => $showLessLabel,
	'style' => $style,
]);
$buttonClass = trim('rm-product-gallery__more-button uk-button uk-button-' . $buttonStyle . ($buttonSize !== '' ? ' uk-button-' . $buttonSize : '') . (!empty($props['button_fullwidth']) ? ' uk-width-1-1' : ''));
?>
<?= $root($props, $attrs) ?>
	<div class="rm-product-gallery__items"<?= $lightbox ? ' uk-lightbox="' . htmlspecialchars(implode('; ', $lightboxOptions), ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
		<?php foreach ($children as $index => $child) : ?>
			<?= $builder->render($child, [
				'element' => $props,
				'index' => $index,
				'total' => count($children),
				'hidden' => $hasOverflow && $index >= $initialItems,
			]) ?>
		<?php endforeach; ?>
		<?php if ($showMore) : ?>
		<div class="rm-product-gallery__more"<?= $hasOverflow ? '' : ' hidden' ?>>
			<button type="button" class="<?= $buttonClass ?>" data-rm-product-gallery-toggle aria-expanded="false"><?= htmlspecialchars($showMoreLabel, ENT_QUOTES, 'UTF-8') ?></button>
		</div>
		<?php endif; ?>
	</div>
<?= $root->end() ?>
