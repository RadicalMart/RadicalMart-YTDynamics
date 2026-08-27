<?php

$image = $this->el('image', [
	'src' => $props['image'] ?? '',
	'alt' => $props['image_alt'] ?? '',
	'loading' => 'lazy',
]);

?>

<div class="rmslideshow__slide">
	<div class="rmslideshow__slide__image">
	        <?= $image($props) ?>
    </div>
</div>
