<?php

$src = $props['image'] ?? $props['poster'] ?? '';
if ($src === '')
{
	return;
}

$image = $this->el('image', [
	'src' => $src,
	'alt' => $props['image_alt'] ?? '',
	'loading' => 'lazy',
]);

echo $image($props);
