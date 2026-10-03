<?php

use Joomla\CMS\Language\Text;

$image = $this->el('image', [
	'src' => $props['image'] ?? '',
	'alt' => $props['image_alt'] ?? '',
	'loading' => ($element['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy',
]);
$lightbox = filter_var($element['lightbox'] ?? false, FILTER_VALIDATE_BOOLEAN);
$caption = filter_var($element['lightbox_caption'] ?? true, FILTER_VALIDATE_BOOLEAN)
	? ($props['image_alt'] ?? '')
	: '';
$imageUrl = htmlspecialchars((string) ($props['image'] ?? ''), ENT_QUOTES, 'UTF-8');
$imageAlt = htmlspecialchars((string) ($props['image_alt'] ?? ''), ENT_QUOTES, 'UTF-8');
$lightboxLabel = htmlspecialchars(Text::sprintf(
	'PLG_YTDYNAMICS_GALLERY_OPEN_LIGHTBOX',
	$props['image_alt'] ?? ''
), ENT_QUOTES, 'UTF-8');
$lightboxCaption = htmlspecialchars((string) $caption, ENT_QUOTES, 'UTF-8');
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
$slide = $this->el('div', [
	'class' => ['el-item', 'rmslideshow__slide'],
	'role' => 'group',
	'aria-roledescription' => Text::_('PLG_YTDYNAMICS_GALLERY_SLIDE'),
	'aria-label' => Text::sprintf(
		'PLG_YTDYNAMICS_GALLERY_SLIDE_POSITION',
		(int) ($index ?? 0) + 1,
		max(1, (int) ($total ?? 1)),
	),
]);

?>

<?= $slide($props, $attrs) ?>
	<?php if ($lightbox) : ?>
	<a class="rmslideshow__lightbox uk-display-block uk-position-relative uk-transition-toggle"
	   href="<?= $imageUrl ?>"
	   data-rm-lightbox
	   data-type="image"
	   data-alt="<?= $imageAlt ?>"
	   <?= $caption !== '' ? 'data-caption="' . $lightboxCaption . '"' : '' ?>
	   aria-label="<?= $lightboxLabel ?>">
	<?php endif ?>
	<div class="rmslideshow__slide__image uk-flex uk-flex-center uk-flex-middle"<?= $mediaStyle !== '' ? ' style="' . $mediaStyle . '"' : '' ?>>
	        <?= $image($props) ?>
    </div>
	<?php if ($lightbox) : ?>
		<span class="rmslideshow__lightbox-icon uk-position-center uk-transition-fade" uk-overlay-icon aria-hidden="true"></span>
	</a>
	<?php endif ?>
<?= $slide->end() ?>
