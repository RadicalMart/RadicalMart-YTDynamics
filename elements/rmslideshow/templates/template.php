<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$el = $this->el('div', [

	'class' => [
		'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
		'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
		'uk-tile-hover {@panel_style: tile-.*} {@panel_link}'              => $props['link'],
		'uk-card-hover {@!panel_style: |card-hover|tile-.*} {@panel_link}' => $props['link'],
		'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-card-body {@panel_style: card-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
		'uk-flex {@panel_style} {@has_panel_image_no_padding} {@image_align: left|right}', // Let images cover the card/tile height if they have different heights
	],

]);

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$wa->useScript('plg_system_ytdynamics.gallery');

$slide_spacing        = '25px';
$slide_height         = '600px';
$slide_height_thumb   = $slide_height;
$thumbs_slide_spacing = '15px';
$thumbs_slide_count   = '5';
$nav_height           = '30px';

$slide_height_thumb = '(' . $slide_height_thumb . ' - ' . $nav_height . ' * 2)';

?>

    <style>
        .rmslideshow {
            margin: auto;
        }

        .rmslideshow__viewport {
            border: 1px solid #ddd;
            overflow: hidden;
        }

        .rmslideshow__container {
            backface-visibility: hidden;
            display: flex;
            touch-action: pan-y pinch-zoom;
            max-height: <?php echo $slide_height; ?>;
        }

        .rmslideshow__slide {
            flex: 0 0 100%;
            min-width: 0;
        }

        .rmslideshow__slide__image {
            height: <?php echo $slide_height; ?>;
        }

        .rmslideshow__slide__image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }

        .rmslideshow-thumbs {
        }

        .rmslideshow-thumbs__navigate {
            height: <?php echo $nav_height; ?>;
            cursor: pointer;
        }

        .rmslideshow-thumbs__viewport {
            overflow: hidden;
        }

        .rmslideshow-thumbs__container {
            touch-action: pan-x pinch-zoom;
            max-height: calc(<?php echo $slide_height_thumb; ?>);
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(<?php echo $thumbs_slide_count; ?>, 1fr);
            grid-column-gap: 0;
            grid-row-gap: <?php echo $thumbs_slide_spacing; ?>;
        }

        .rmslideshow-thumbs__slide {
            border: 1px solid #ddd;
            height: calc((<?php echo $slide_height_thumb; ?> + <?php echo $thumbs_slide_spacing; ?>) / <?php echo $thumbs_slide_count;?> - <?php echo $thumbs_slide_spacing; ?>);
        }

        .rmslideshow-thumbs__slide:last-child {
            margin-bottom: <?php echo $thumbs_slide_spacing; ?>;
        }

        .rmslideshow-thumbs__slide__image {
            width: 100%;
            height: 100%;
        }

        .rmslideshow-thumbs__slide__image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }
    </style>

<?php echo $el($props, $attrs) ?>
    <div class="rmslideshow">
        <div data-uk-grid>
            <div class="uk-width-small">
                <div class="rmslideshow-thumbs rmslideshow-vertical">
                    <div class="rmslideshow-thumbs__navigate rmslideshow-thumbs__prev uk-flex uk-flex-center uk-flex-middle">
                        <i data-uk-icon="icon: chevron-up;ratio: 2;"></i>
                    </div>
                    <div class="rmslideshow-thumbs__viewport">
                        <div class="rmslideshow-thumbs__container">
							<?php foreach ($children as $child) : ?>
								<?= $builder->render($child, ['element' => $props, 'template' => 'thumb']) ?>
							<?php endforeach ?>
                        </div>
                    </div>
                    <div class="rmslideshow-thumbs__navigate rmslideshow-thumbs__next uk-flex uk-flex-center uk-flex-middle">
                        <i data-uk-icon="icon: chevron-down;ratio: 2;"></i>
                    </div>
                </div>
            </div>
            <div class="uk-width-expand">
                <div class="rmslideshow__viewport">
                    <div class="rmslideshow__container">
						<?php foreach ($children as $child) : ?>
							<?= $builder->render($child, ['element' => $props, 'template' => 'slide']) ?>
						<?php endforeach ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php echo $el->end() ?>