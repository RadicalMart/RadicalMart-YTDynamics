<?php ?>

<div class="rmslideshow" type="preview" uk-slideshow="min-height: 500;">

    <div class="uk-position-relative">

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

    </div>

    <div class="uk-margin" uk-slider>
        <?php echo $this->render("{$root_dir}/{$mode}/template-preview-slider", compact('props')) ?>
    </div>
</div>
