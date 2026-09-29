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

?>

<li class="rmslideshow-thumbs__slide">
	<?php if (($element['nav'] ?? 'thumbnav') === 'dotnav') : ?>
	<a href="#"
	   aria-label="<?= Text::sprintf('PLG_YTDYNAMICS_GALLERY_SHOW_IMAGE', $index + 1) ?>"></a>
	<?php else : ?>
	<a href="#"
	   class="<?= $thumbClasses ?>"
	   aria-label="<?= Text::sprintf('PLG_YTDYNAMICS_GALLERY_SHOW_IMAGE', $index + 1) ?>">
		<span class="rmslideshow-thumbs__slide__image uk-flex uk-flex-center uk-flex-middle">
			<?= $image($props) ?>
		</span>
	</a>
	<?php endif ?>
</li>
