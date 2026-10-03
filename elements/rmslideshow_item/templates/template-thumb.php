<?php

use Joomla\CMS\Language\Text;

$image = $this->el('image', [
	'src' => $props['image'] ?? '',
	'alt' => $props['image_alt'] ?? '',
	'loading' => ($element['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy',
]);

$border = in_array(($element['slideshow_border'] ?? ''), ['', 'rounded'], true)
	? ($element['slideshow_border'] ?? '')
	: '';
$boxShadow = in_array(($element['slideshow_box_shadow'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', 'bottom'], true)
	? ($element['slideshow_box_shadow'] ?? '')
	: '';
$thumbClasses = trim(implode(' ', array_filter([
	'uk-display-block',
	'uk-overflow-hidden',
	'uk-background-muted',
	$border ? 'uk-border-' . $border : '',
	$boxShadow ? 'uk-box-shadow-' . $boxShadow : '',
])));
$fit = in_array(($props['image_fit'] ?? ''), ['contain', 'cover'], true) ? (string) $props['image_fit'] : '';
$positionKey = in_array(($props['image_position'] ?? ''), ['', 'center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'], true) ? (string) ($props['image_position'] ?? '') : '';
$background = trim((string) ($props['background_color'] ?? ''));
$blendModes = ['', 'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
$blend = in_array(($props['mix_blend_mode'] ?? ''), $blendModes, true) ? (string) ($props['mix_blend_mode'] ?? '') : '';
$mediaStyle = [];
if ($fit !== '') $mediaStyle[] = '--rm-gallery-item-image-fit:' . $fit;
if ($positionKey !== '') $mediaStyle[] = '--rm-gallery-item-image-position:' . str_replace('-', ' ', $positionKey);
if ($background !== '') $mediaStyle[] = '--rm-gallery-item-background:' . $background;
if ($blend !== '') $mediaStyle[] = '--rm-gallery-item-image-blend-mode:' . $blend;
$mediaStyle = htmlspecialchars(implode(';', $mediaStyle), ENT_QUOTES, 'UTF-8');

?>

<li class="rmslideshow-thumbs__slide">
	<?php if (($element['nav'] ?? 'thumbnav') === 'dotnav') : ?>
	<a href="#"
	   aria-label="<?= Text::sprintf('PLG_YTDYNAMICS_GALLERY_SHOW_IMAGE', $index + 1) ?>"></a>
	<?php else : ?>
	<a href="#"
	   class="<?= $thumbClasses ?>"
	   aria-label="<?= Text::sprintf('PLG_YTDYNAMICS_GALLERY_SHOW_IMAGE', $index + 1) ?>">
		<span class="rmslideshow-thumbs__slide__image uk-flex uk-flex-center uk-flex-middle"<?= $mediaStyle !== '' ? ' style="' . $mediaStyle . '"' : '' ?>>
			<?= $image($props) ?>
		</span>
	</a>
	<?php endif ?>
</li>
