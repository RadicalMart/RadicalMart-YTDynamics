<?php

if (empty($props['image'])) {
	return;
}

$image = $this->el('image', [
	'src' => $props['image'],
	'alt' => $props['image_alt'] ?? '',
	'loading' => 'lazy',
]);

echo $image($props);
