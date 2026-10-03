<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = ProductPresentation::resolve(
	isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null,
	(int) ($props['product_id'] ?? 0)
);
if (!$product)
{
	return;
}

$media = array_values(array_filter(
	(array) ($product['media'] ?? []),
	static fn($item) => is_array($item) && trim((string) ($item['src'] ?? '')) !== ''
));
$limit = max(0, min(20, (int) ($props['max_images'] ?? 0)));
if ($limit > 0)
{
	$media = array_slice($media, 0, $limit);
}
if (!$media)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$fit = ($props['image_fit'] ?? 'contain') === 'cover' ? 'cover' : 'contain';
$positionKey = in_array(($props['image_position'] ?? 'center'), [
	'center', 'top-left', 'top-center', 'top-right', 'center-left', 'center-right',
	'bottom-left', 'bottom-center', 'bottom-right',
], true) ? (string) ($props['image_position'] ?? 'center') : 'center';
$position = str_replace('-', ' ', $positionKey);
$ratio = in_array(($props['image_ratio'] ?? '1/1'), ['', '1/1', '4/3', '3/2', '16/9', '1:1', '4:3', '3:2', '16:9'], true)
	? str_replace(':', '/', (string) ($props['image_ratio'] ?? '1/1')) : '1/1';
$height = trim((string) ($props['image_height'] ?? ''));
$height = preg_match('/^(?:auto|\d+(?:\.\d+)?(?:px|r?em|%|v[hw]|svh|lvh|dvh))$/i', $height) ? $height : '';
$resizeWidth = max(0, min(2400, (int) ($props['image_resize_width'] ?? 800)));
$resizeHeight = max(0, min(2400, (int) ($props['image_resize_height'] ?? 0)));
$transition = ($props['transition'] ?? 'fade') === 'none' ? 'none' : 'fade';
$indicatorStyle = in_array(($props['indicator_style'] ?? 'bars'), ['bars', 'dots', 'none'], true)
	? $props['indicator_style'] : 'bars';
$loading = ($props['image_loading'] ?? 'lazy') === 'eager' ? 'eager' : 'lazy';
$linkProduct = !array_key_exists('link_product', $props) || !empty($props['link_product']);
$link = $linkProduct ? (string) ($product['link'] ?? '') : '';
$title = (string) ($product['title'] ?? '');
$backgroundColor = trim((string) ($props['background_color'] ?? ''));
$blendModes = [
	'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn',
	'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
];
$mixBlendMode = in_array(($props['mix_blend_mode'] ?? 'normal'), $blendModes, true)
	? (string) ($props['mix_blend_mode'] ?? 'normal')
	: 'normal';
$imagePadding = in_array(($props['image_padding'] ?? ''), ['', 'small', 'default', 'large'], true)
	? (string) ($props['image_padding'] ?? '')
	: '';
$imageBorder = in_array(($props['image_border'] ?? ''), ['', 'rounded', 'circle', 'pill'], true)
	? (string) ($props['image_border'] ?? '')
	: '';
$imageBoxShadow = in_array(($props['image_box_shadow'] ?? ''), ['', 'small', 'medium', 'large', 'xlarge', 'bottom'], true)
	? (string) ($props['image_box_shadow'] ?? '')
	: '';
$imagePaddingClass = match ($imagePadding) {
	'small' => 'uk-padding-small',
	'default' => 'uk-padding',
	'large' => 'uk-padding-large',
	default => '',
};
$frameStyle = [
	'--rm-product-hover-fit:' . $fit,
	'--rm-product-hover-position:' . $position,
	'--rm-product-hover-blend-mode:' . $mixBlendMode,
];
if ($backgroundColor !== '')
{
	$frameStyle[] = '--rm-product-hover-background:' . $backgroundColor;
}
if ($height !== '')
{
	$frameStyle[] = 'height:' . $height;
}
elseif ($ratio !== '')
{
	$frameStyle[] = 'aspect-ratio:' . $ratio;
}

$root = $this->el('div', [
	'class' => ['rm-product-hover-gallery'],
	'data-rm-product-hover-gallery' => true,
	'data-max-images' => $limit,
	'data-loading' => $loading,
	'data-transition' => $transition,
	'data-indicators' => $indicatorStyle,
	'data-reset-on-leave' => !array_key_exists('reset_on_leave', $props) || !empty($props['reset_on_leave']) ? 'true' : 'false',
	'aria-label' => $title,
]);
$frame = $this->el($link !== '' ? 'a' : 'div', [
	'class' => [
		'rm-product-hover-gallery__viewport',
		'uk-border-' . $imageBorder => $imageBorder !== '',
		'uk-box-shadow-' . $imageBoxShadow => $imageBoxShadow !== '',
	],
	'href' => $link !== '' ? $link : null,
	'data-rm-product-link' => $link !== '' ? true : null,
	'tabindex' => $link === '' ? 0 : null,
	'style' => implode(';', $frameStyle),
]);
?>
<?= $root($props, $attrs) ?>
	<?= $frame() ?>
		<?php foreach ($media as $index => $image) :
			$imageElement = $this->el('image', [
				'class' => [
					'rm-product-hover-gallery__image',
					$imagePaddingClass,
					'rm-product-hover-gallery__image--active' => $index === 0,
				],
				'data-rm-product-hover-image' => true,
				'data-index' => $index,
				'src' => (string) $image['src'],
				'alt' => (string) ($image['alt'] ?? $title),
				'loading' => $index === 0 ? $loading : 'lazy',
				'decoding' => 'async',
				'width' => $resizeWidth ?: null,
				'height' => $resizeHeight ?: null,
				'thumbnail' => $resizeWidth > 0 || $resizeHeight > 0,
				'aria-hidden' => $index === 0 ? 'false' : 'true',
			]);
			?><?= $imageElement($props) ?><?php endforeach; ?>
		<?php if (count($media) > 1 && $indicatorStyle !== 'none') : ?>
			<span class="rm-product-hover-gallery__indicators rm-product-hover-gallery__indicators--<?= $indicatorStyle ?>" aria-hidden="true" data-rm-product-hover-indicators>
				<?php foreach ($media as $index => $_image) : ?><span class="rm-product-hover-gallery__indicator<?= $index === 0 ? ' rm-product-hover-gallery__indicator--active' : '' ?>" data-index="<?= $index ?>"></span><?php endforeach; ?>
			</span>
		<?php endif; ?>
	<?= $frame->end() ?>
<?= $root->end() ?>
