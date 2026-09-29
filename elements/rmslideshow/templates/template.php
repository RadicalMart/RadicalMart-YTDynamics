<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

if (empty($children))
{
	return;
}

$el = $this->el('div', [

	'class' => [
		'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
		'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
		'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-card-body {@panel_style: card-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-flex {@panel_style} {@has_panel_image_no_padding} {@image_align: left|right}', // Let images cover the card/tile height if they have different heights
	],

]);

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$wa->useStyle('plg_system_ytdynamics.gallery');
$wa->useScript('plg_system_ytdynamics.gallery');

$clamp = static function ($value, int $min, int $max, int $fallback): int {
	$value = filter_var($value, FILTER_VALIDATE_INT);

	return $value === false ? $fallback : max($min, min($max, $value));
};
$toBoolean = static function ($value, bool $fallback = false): bool {
	if ($value === null)
	{
		return $fallback;
	}

	return filter_var($value, FILTER_VALIDATE_BOOLEAN);
};
$galleryHeight = $clamp($props['gallery_height'] ?? null, 250, 1000, 600);
$galleryMobileHeight = $clamp($props['gallery_mobile_height'] ?? null, 180, 600, 320);
$thumbnailCount = $clamp($props['thumbnail_count'] ?? null, 2, 10, 5);
$thumbnavSize = $clamp($props['thumbnav_size'] ?? null, 64, 160, 100);
$slideGap = $clamp($props['slide_gap'] ?? null, 0, 80, 25);
$thumbnailGap = $clamp($props['thumbnail_gap'] ?? null, 0, 40, 15);
$orientation = ($props['gallery_orientation'] ?? 'vertical') === 'horizontal' ? 'horizontal' : 'vertical';
$nav = in_array(($props['nav'] ?? 'thumbnav'), ['', 'dotnav', 'thumbnav'], true)
	? ($props['nav'] ?? 'thumbnav')
	: 'thumbnav';
$thumbnavOrientation = in_array(($props['thumbnav_orientation'] ?? 'auto'), ['auto', 'vertical', 'horizontal'], true)
	? ($props['thumbnav_orientation'] ?? 'auto')
	: 'auto';
$requestedThumbnavPosition = in_array(($props['thumbnav_position'] ?? ''), ['', 'left', 'right', 'top', 'bottom'], true)
	? ($props['thumbnav_position'] ?? '')
	: '';
$thumbAxis = match ($thumbnavOrientation) {
	'vertical' => 'y',
	'horizontal' => 'x',
	default => $requestedThumbnavPosition
		? (in_array($requestedThumbnavPosition, ['left', 'right'], true) ? 'y' : 'x')
		: ($orientation === 'vertical' ? 'y' : 'x'),
};
$thumbnavPosition = $requestedThumbnavPosition ?: ($thumbAxis === 'y' ? 'left' : 'bottom');
$loop = $toBoolean($props['slideshow_loop'] ?? null, true);
$drag = $toBoolean($props['slideshow_drag'] ?? null, true);
$autoplay = $toBoolean($props['slideshow_autoplay'] ?? null);
$autoplayPause = $toBoolean($props['slideshow_autoplay_pause'] ?? null, true);
$autoplayInterval = $clamp($props['slideshow_autoplay_interval'] ?? null, 3, 20, 7);
$navArrows = $toBoolean($props['nav_arrows'] ?? null, true);
$velocity = filter_var($props['slideshow_velocity'] ?? 1, FILTER_VALIDATE_FLOAT);
$velocity = $velocity === false ? 1.0 : max(0.5, min(3.0, $velocity));
$duration = max(10, min(60, (int) round(30 / $velocity)));
$imageFit = in_array(($props['image_fit'] ?? 'contain'), ['contain', 'cover'], true)
	? ($props['image_fit'] ?? 'contain')
	: 'contain';
$imagePositionKey = in_array(($props['image_position'] ?? 'center'), [
	'center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right',
	'bottom-left', 'bottom-center', 'bottom-right',
], true) ? ($props['image_position'] ?? 'center') : 'center';
$imagePosition = str_replace('-', ' ', $imagePositionKey);
$slidenav = ($props['slidenav'] ?? 'default') === 'default';
$slidenavHover = $toBoolean($props['slidenav_hover'] ?? null);
$slidenavLarge = $toBoolean($props['slidenav_large'] ?? null);
$slidenavBreakpoint = in_array(($props['slidenav_breakpoint'] ?? 's'), ['', 's', 'm', 'l', 'xl'], true)
	? ($props['slidenav_breakpoint'] ?? 's')
	: 's';
$lightbox = $toBoolean($props['lightbox'] ?? null);
$lightboxControls = $toBoolean($props['lightbox_controls'] ?? null);
$lightboxCounter = $toBoolean($props['lightbox_counter'] ?? null);
$lightboxBgClose = $toBoolean($props['lightbox_bg_close'] ?? null, true);
$lightboxAnimation = in_array(($props['lightbox_animation'] ?? ''), ['', 'fade', 'scale'], true)
	? ($props['lightbox_animation'] ?? '')
	: '';
$lightboxNav = in_array(($props['lightbox_nav'] ?? ''), ['', 'dotnav', 'thumbnav'], true)
	? ($props['lightbox_nav'] ?? '')
	: '';
$lightboxOptions = ['toggle: a[data-rm-lightbox]'];

if ($lightboxAnimation)
{
	$lightboxOptions[] = 'animation: ' . $lightboxAnimation;
}

if ($lightboxNav)
{
	$lightboxOptions[] = 'nav: ' . $lightboxNav;
	$lightboxOptions[] = 'slidenav: false';
}

if ($lightboxControls)
{
	$lightboxOptions[] = 'delay-controls: 0';
}

if ($lightboxCounter)
{
	$lightboxOptions[] = 'counter: true';
}

if (!$lightboxBgClose)
{
	$lightboxOptions[] = 'bg-close: false';
}

$lightboxOptions = implode('; ', $lightboxOptions);
$navigationSize = 40;
$thumbnailHeight = max(40, ($galleryHeight - ($navigationSize * 2) - (($thumbnailCount - 1) * $thumbnailGap)) / $thumbnailCount);
$thumbnailWidth = 100 / $thumbnailCount;
$thumbnailWidthOffset = (($thumbnailCount - 1) * $thumbnailGap) / $thumbnailCount;
$galleryStyle = sprintf(
	'--rm-gallery-height:%dpx;--rm-gallery-mobile-height:%dpx;--rm-gallery-thumbnails:%d;--rm-gallery-gap:%dpx;'
	. '--rm-gallery-thumbnail-gap:%dpx;--rm-gallery-thumbnail-height:%.2fpx;'
	. '--rm-gallery-thumbnail-width:%.6f%%;--rm-gallery-thumbnail-width-offset:%.2fpx;'
	. '--rm-gallery-navigation-size:%dpx;--rm-gallery-thumbnav-size:%dpx;'
	. '--rm-gallery-image-fit:%s;--rm-gallery-image-position:%s',
	$galleryHeight,
	$galleryMobileHeight,
	$thumbnailCount,
	$slideGap,
	$thumbnailGap,
	$thumbnailHeight,
	$thumbnailWidth,
	$thumbnailWidthOffset,
	$navigationSize,
	$thumbnavSize,
	$imageFit,
	$imagePosition
);
$border = in_array(($props['slideshow_border'] ?? ''), ['', 'rounded'], true)
	? ($props['slideshow_border'] ?? '')
	: '';
$boxShadow = in_array(($props['slideshow_box_shadow'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', 'bottom'], true)
	? ($props['slideshow_box_shadow'] ?? '')
	: '';
$mediaClasses = trim(implode(' ', array_filter([
	'uk-overflow-hidden',
	'uk-background-muted',
	$border ? 'uk-border-' . $border : '',
	$boxShadow ? 'uk-box-shadow-' . $boxShadow : '',
])));

?>
<?= $el($props, $attrs) ?>
    <div class="rmslideshow rmslideshow--<?= $orientation ?> rmslideshow--nav-<?= $nav ?: 'none' ?> rmslideshow--thumbnav-position-<?= $thumbnavPosition ?> rmslideshow--thumbnav-<?= $thumbAxis === 'y' ? 'vertical' : 'horizontal' ?><?= $nav === 'thumbnav' ? ($navArrows ? ' rmslideshow--thumbnav-arrows' : ' rmslideshow--thumbnav-no-arrows') : '' ?> uk-position-relative<?= $slidenavHover ? ' uk-visible-toggle' : '' ?>"
         data-orientation="<?= $orientation ?>"
		 data-thumb-axis="<?= $thumbAxis ?>"
		 data-nav="<?= $nav ?>"
		 data-loop="<?= $loop ? 'true' : 'false' ?>"
		 data-drag="<?= $drag ? 'true' : 'false' ?>"
		 data-duration="<?= $duration ?>"
		 data-autoplay="<?= $autoplay ? 'true' : 'false' ?>"
		 data-autoplay-delay="<?= $autoplayInterval * 1000 ?>"
		 data-autoplay-pause="<?= $autoplayPause ? 'true' : 'false' ?>"
		<?= $slidenavHover ? ' tabindex="-1"' : '' ?>
         style="<?= $galleryStyle ?>">
        <div class="rmslideshow__layout">
            <?php if ($nav) : ?>
            <div class="rmslideshow__thumbs rmslideshow__thumbs--<?= $nav ?>">
                <div class="rmslideshow-thumbs">
					<?php if ($nav === 'thumbnav' && $navArrows) : ?>
                    <button type="button"
                            class="rmslideshow-thumbs__navigate rmslideshow-thumbs__prev uk-icon-button"
                            aria-label="<?= Text::_('PLG_YTDYNAMICS_GALLERY_PREVIOUS') ?>">
                        <span uk-icon="icon: chevron-left"></span>
                    </button>
					<?php endif ?>
                    <div class="rmslideshow-thumbs__viewport">
						<ul class="rmslideshow-thumbs__container <?= $nav === 'dotnav' ? 'uk-dotnav uk-flex-center' : 'uk-thumbnav' . ($thumbAxis === 'y' ? ' uk-thumbnav-vertical' : '') . ' uk-flex-nowrap' ?>">
							<?php foreach ($children as $index => $child) : ?>
								<?= $builder->render($child, ['element' => $props, 'template' => 'thumb', 'index' => $index]) ?>
							<?php endforeach ?>
						</ul>
                    </div>
					<?php if ($nav === 'thumbnav' && $navArrows) : ?>
                    <button type="button"
                            class="rmslideshow-thumbs__navigate rmslideshow-thumbs__next uk-icon-button"
                            aria-label="<?= Text::_('PLG_YTDYNAMICS_GALLERY_NEXT') ?>">
                        <span uk-icon="icon: chevron-right"></span>
                    </button>
					<?php endif ?>
                </div>
            </div>
			<?php endif ?>
            <div class="rmslideshow__main uk-position-relative">
				<div class="rmslideshow__viewport <?= $mediaClasses ?>" aria-roledescription="carousel">
                    <div class="rmslideshow__container"<?= $lightbox ? ' uk-lightbox="' . htmlspecialchars($lightboxOptions, ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
						<?php foreach ($children as $child) : ?>
							<?= $builder->render($child, ['element' => $props, 'template' => 'slide']) ?>
						<?php endforeach ?>
                    </div>
                </div>
				<?php if ($slidenav) :
					$slidenavClasses = trim(implode(' ', array_filter([
						'rmslideshow__slidenav',
						$slidenavLarge ? 'uk-slidenav-large' : '',
						$slidenavHover ? 'uk-hidden-hover uk-hidden-touch' : '',
						$slidenavBreakpoint ? 'uk-visible@' . $slidenavBreakpoint : '',
					])));
				?>
				<button type="button"
						class="<?= $slidenavClasses ?> rmslideshow__prev uk-position-center-left uk-position-small"
						uk-slidenav-previous
						aria-label="<?= Text::_('PLG_YTDYNAMICS_GALLERY_PREVIOUS') ?>"></button>
				<button type="button"
						class="<?= $slidenavClasses ?> rmslideshow__next uk-position-center-right uk-position-small"
						uk-slidenav-next
						aria-label="<?= Text::_('PLG_YTDYNAMICS_GALLERY_NEXT') ?>"></button>
				<?php endif ?>
            </div>
        </div>
    </div>
<?= $el->end() ?>
