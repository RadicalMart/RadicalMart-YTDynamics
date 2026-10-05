<?php

$index = (int) ($index ?? 0);
$hidden = (bool) ($hidden ?? false);
$image = trim((string) ($props['image'] ?? ''));
$video = trim((string) ($props['video'] ?? ''));
$poster = trim((string) ($props['poster'] ?? ''));
$type = $video !== '' ? 'video' : 'image';
$src = $type === 'video' ? $video : $image;
$preview = $type === 'video' ? $poster : $image;
$alt = (string) ($props['image_alt'] ?? '');
$fit = in_array(($props['image_fit'] ?? ''), ['contain', 'cover'], true) ? (string) $props['image_fit'] : '';
$positionKey = in_array(($props['image_position'] ?? ''), ['', 'center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'], true) ? (string) ($props['image_position'] ?? '') : '';
$background = trim((string) ($props['background_color'] ?? ''));
$blendModes = ['', 'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
$blend = in_array(($props['mix_blend_mode'] ?? ''), $blendModes, true) ? (string) ($props['mix_blend_mode'] ?? '') : '';
$border = in_array(($gallery_border ?? ''), ['', 'rounded', 'pill', 'circle'], true) ? (string) ($gallery_border ?? '') : '';
$shadow = in_array(($gallery_shadow ?? ''), ['', 'small', 'medium', 'large', 'xlarge', 'bottom'], true) ? (string) ($gallery_shadow ?? '') : '';
$itemStyle = [];
if ($fit !== '') $itemStyle[] = '--rm-product-gallery-item-fit:' . $fit;
if ($positionKey !== '') $itemStyle[] = '--rm-product-gallery-item-position:' . str_replace('-', ' ', $positionKey);
if ($background !== '') $itemStyle[] = '--rm-product-gallery-item-background:' . $background;
if ($blend !== '') $itemStyle[] = '--rm-product-gallery-item-blend:' . $blend;

$item = $this->el('article', [
	'class' => [
		'el-item',
		'rm-product-gallery__item',
		'uk-overflow-hidden',
		'uk-border-' . $border => $border !== '',
		'uk-box-shadow-' . $shadow => $shadow !== '',
	],
	'data-rm-product-gallery-item' => true,
	'data-media-index' => $index,
	'data-media-type' => $type,
	'style' => implode(';', $itemStyle),
	'hidden' => $hidden,
]);
$lightbox = filter_var($element['lightbox'] ?? true, FILTER_VALIDATE_BOOLEAN);
$caption = filter_var($element['lightbox_caption'] ?? true, FILTER_VALIDATE_BOOLEAN);
$loading = ($element['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy';
?>
<?= $item($props, $attrs) ?>
	<?php if ($lightbox) : ?><a class="rm-product-gallery__link uk-display-block uk-position-relative uk-transition-toggle" href="<?= htmlspecialchars($src, ENT_QUOTES, 'UTF-8') ?>" data-rm-product-gallery-lightbox<?= $type === 'image' ? ' data-type="image"' : '' ?><?= $caption && $alt !== '' ? ' data-caption="' . htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') . '"' : '' ?> aria-label="<?= htmlspecialchars($type === 'video' ? 'Открыть видео' : 'Открыть изображение', ENT_QUOTES, 'UTF-8') ?>"><?php endif; ?>
	<span class="rm-product-gallery__media uk-flex uk-flex-center uk-flex-middle">
		<?php if ($preview !== '') : ?><img src="<?= htmlspecialchars($preview, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') ?>" loading="<?= $loading ?>"><?php endif; ?>
		<?php if ($type === 'video') : ?><span class="rm-product-gallery__play uk-icon-button" uk-icon="icon: play" aria-hidden="true"></span><?php endif; ?>
	</span>
	<?php if ($lightbox) : ?></a><?php endif; ?>
<?= $item->end() ?>
