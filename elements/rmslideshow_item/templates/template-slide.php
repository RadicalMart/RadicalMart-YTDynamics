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
	<div class="rmslideshow__slide__image uk-flex uk-flex-center uk-flex-middle">
	        <?= $image($props) ?>
    </div>
	<?php if ($lightbox) : ?>
		<span class="rmslideshow__lightbox-icon uk-position-center uk-transition-fade" uk-overlay-icon aria-hidden="true"></span>
	</a>
	<?php endif ?>
<?= $slide->end() ?>
