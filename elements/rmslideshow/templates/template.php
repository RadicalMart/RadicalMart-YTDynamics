<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;

$mode     = 'horizontal';
$root_dir = $__dir;

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
$thumbs_slide_spacing = '15px';
$thumbs_slide_count   = '7';


$mode = 'vertical';

if ($mode == 'vertical')
{

}
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

        .rmslideshow-thumbs__viewport {
            overflow: hidden;
            padding-top: <?php echo $thumbs_slide_spacing; ?>;
        }

        .rmslideshow-thumbs__container {
            display: flex;
            touch-action: pan-x pinch-zoom;
            margin-top: calc(<?php echo $slide_spacing; ?> * -1);
            height: calc(<?php echo $slide_spacing; ?> + <?php echo $slide_height; ?>);
            flex-direction: column;
        }

        .rmslideshow-thumbs__slide {
            border: 1px solid #ddd;
            flex: 0 0 calc(100% / <?php echo $thumbs_slide_count ?> - <?php echo $thumbs_slide_spacing; ?>);
            min-width: 0;
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
                <div class="rmslideshow-thumbs">
                    <div class="rmslideshow-thumbs__viewport">
                        <div class="rmslideshow-thumbs__container">
							<?php for ($i = 0; $i < 15; $i++): ?>
								<?php echo $this->render("{$__dir}/template-thumb", compact('props', 'root_dir')); ?>
							<?php endfor; ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-width-expand">
                <div class="rmslideshow__viewport">
                    <div class="rmslideshow__container">
						<?php for ($i = 0; $i < 15; $i++): ?>
							<?php echo $this->render("{$__dir}/template-slide", compact('props', 'root_dir')); ?>
						<?php endfor; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php echo $el->end() ?>