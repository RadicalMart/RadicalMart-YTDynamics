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

?>

<style>
    .rmslideshow {
        position: relative;
    }

    .rmslideshow-vertical .slider {
        position: absolute;
        left: calc(-50% + 250px);
        top: 45%;
        transform: rotate(90deg);
        width: calc(100% - 350px);
    }

    .rmslideshow-vertical .slider li > a {
        transform: rotate(-90deg);
    }

    .rmslideshow-vertical .items {
        margin-left: 150px;
    }
</style>

<?php echo $el($props, $attrs) ?>

<?php
$config = [
	'mode' => 'vertical',
	'type' => 'preview',
];
echo $this->render("{$__dir}/template-slideshow", compact('props', 'config'));
?>

<?php echo $el->end() ?>

<div id="modal-full" class="uk-modal-full uk-height-1-1" uk-modal>
    <div class="uk-modal-dialog uk-height-1-1">
        <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
        <div class="uk-padding-small">
            <div class="uk-container uk-container-center">
				<?php
				$config = [
					'mode' => 'vertical',
					'type' => 'main'
				];
				echo $this->render("{$__dir}/template-slideshow", compact('props', 'config'));
				?>
            </div>
        </div>
    </div>
</div>

<script>


    document.addEventListener('DOMContentLoaded', function () {
        let imgs = document.querySelectorAll('[type=preview] .uk-slideshow-items img');

        for (let i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener('click', function (ev) {
                UIkit.modal('#modal-full').show();
            });
        }

        let slider = document.querySelectorAll('[uk-slider]');
        for (let i = 0; i < slider.length; i++) {

            let direct = '';
            let previous = slider[i].querySelectorAll('[uk-slidenav-previous]');
            let next = slider[i].querySelectorAll('[uk-slidenav-next]');

            for (let j = 0; j < previous.length; j++) {
                previous[j].addEventListener('click', function () {
                    if (direct === 'previous') {
                        return;
                    }
                    direct = 'previous';
                    this.click();
                });
            }

            for (let j = 0; j < next.length; j++) {
                next[j].addEventListener('click', function () {
                    if (direct === 'next') {
                        return;
                    }
                    direct = 'next';
                    this.click();
                });
            }

        }
    });


</script>
