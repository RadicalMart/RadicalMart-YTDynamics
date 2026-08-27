<?php

$image = $this->el('image', [
	'src' => $props['image'] ?? '',
	'alt' => $props['image_alt'] ?? '',
	'loading' => 'lazy',
]);

?>

<div class="rmslideshow-thumbs__slide rmslideshow-thumbs__slide--selected">
	<div class="rmslideshow-thumbs__slide__image">
		<?= $image($props) ?>
	</div>
</div>
