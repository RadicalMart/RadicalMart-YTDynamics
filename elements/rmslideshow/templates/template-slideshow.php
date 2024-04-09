<?php ?>

<div class="rmslideshow rmslideshow-<?php echo $config['mode']; ?>" uk-slideshow="min-height: 500;" type="<?php echo $config['type']; ?>">

    <div class="uk-margin slider" >
        <div uk-slider="draggable: false;">
		    <?php echo $this->render("{$__dir}/template-nav", compact('props')) ?>
        </div>
    </div>


    <div class="uk-position-relative items">

        <div class="uk-slideshow-items uk-background-primary">
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa1-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa2-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa3-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa4-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa5-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa1-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa2-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
            <div class="uk-text-center">
                <img src="/images/sampledata/cassiopeia/nasa3-400.jpg" class="uk-object-contain uk-height-1-1"
                     alt="">
            </div>
        </div>

		<?php if ($config['type'] === 'main') : ?>
            <div class="uk-hidden@s uk-light">
                <a class="uk-position-center-left uk-position-small" href uk-slidenav-previous
                   uk-slideshow-item="previous"></a>
                <a class="uk-position-center-right uk-position-small" href uk-slidenav-next
                   uk-slideshow-item="next"></a>
            </div>

            <div class="uk-visible@s">
                <a class="uk-position-center-left-out uk-position-small" href uk-slidenav-previous
                   uk-slideshow-item="previous"></a>
                <a class="uk-position-center-right-out uk-position-small" href uk-slidenav-next
                   uk-slideshow-item="next"></a>
            </div>
		<?php endif; ?>
    </div>

</div>
