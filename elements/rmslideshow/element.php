<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::fromJson(__DIR__);
$config['title'] = 'RM Slideshow';
$config['defaults'] = ($config['defaults'] ?? []) + [
	'gallery_orientation' => 'vertical',
	'gallery_height' => 600,
	'gallery_mobile_height' => 320,
	'slideshow_loop' => true,
	'slideshow_drag' => true,
	'slideshow_velocity' => 1,
	'slideshow_autoplay_pause' => true,
	'slideshow_autoplay_interval' => 7,
	'nav' => 'thumbnav',
	'thumbnav_orientation' => 'auto',
	'thumbnav_position' => '',
	'thumbnav_size' => 100,
	'nav_arrows' => true,
	'slidenav' => 'default',
	'slidenav_breakpoint' => 's',
	'image_fit' => 'contain',
	'image_position' => 'center',
	'image_loading' => 'lazy',
	'thumbnail_count' => 5,
	'slide_gap' => 25,
	'thumbnail_gap' => 15,
	'slideshow_border' => 'rounded',
	'slideshow_box_shadow' => '',
	'lightbox_bg_close' => true,
	'lightbox_caption' => true,
];
$config['fields'] = ($config['fields'] ?? []) + [
	'gallery_orientation' => [
		'label' => 'Main Slideshow Direction',
		'description' => 'Set the movement direction of the large slides independently from the thumbnails.',
		'type' => 'select',
		'options' => [
			'Vertical' => 'vertical',
			'Horizontal' => 'horizontal',
		],
	],
	'gallery_height' => [
		'label' => 'Height',
		'type' => 'range',
		'attrs' => ['min' => 250, 'max' => 1000, 'step' => 25],
	],
	'gallery_mobile_height' => [
		'label' => 'Mobile Height',
		'type' => 'range',
		'attrs' => ['min' => 180, 'max' => 600, 'step' => 20],
	],
	'image_fit' => [
		'label' => 'Image Fit',
		'description' => 'Choose whether images are fully visible or fill the slideshow area.',
		'type' => 'select',
		'options' => [
			'Contain' => 'contain',
			'Cover' => 'cover',
		],
	],
	'image_position' => [
		'label' => 'Image Position',
		'type' => 'select',
		'options' => [
			'Center' => 'center',
			'Top Left' => 'top-left',
			'Top Center' => 'top-center',
			'Top Right' => 'top-right',
			'Center Left' => 'center-left',
			'Center Right' => 'center-right',
			'Bottom Left' => 'bottom-left',
			'Bottom Center' => 'bottom-center',
			'Bottom Right' => 'bottom-right',
		],
		'enable' => "image_fit == 'cover'",
	],
	'image_loading' => [
		'label' => 'Image Loading',
		'type' => 'select',
		'options' => [
			'Lazy' => 'lazy',
			'Eager' => 'eager',
		],
	],
	'slideshow_loop' => [
		'label' => 'Loop',
		'type' => 'checkbox',
		'text' => 'Loop slides continuously',
	],
	'slideshow_drag' => [
		'type' => 'checkbox',
		'text' => 'Enable mouse and touch dragging',
	],
	'slideshow_velocity' => [
		'label' => 'Velocity',
		'description' => 'Set the transition velocity, similar to the native YOOtheme Pro slideshow.',
		'type' => 'range',
		'attrs' => ['min' => 0.5, 'max' => 3, 'step' => 0.1],
	],
	'slideshow_autoplay' => [
		'label' => 'Autoplay',
		'type' => 'checkbox',
		'text' => 'Enable autoplay',
	],
	'slideshow_autoplay_pause' => [
		'type' => 'checkbox',
		'text' => 'Pause autoplay on hover and focus',
		'enable' => 'slideshow_autoplay',
	],
	'slideshow_autoplay_interval' => [
		'label' => 'Autoplay Interval',
		'description' => 'Set the autoplay interval in seconds.',
		'type' => 'range',
		'attrs' => ['min' => 3, 'max' => 20, 'step' => 1],
		'enable' => 'slideshow_autoplay',
	],
	'nav' => [
		'label' => 'Navigation',
		'description' => 'Select the navigation type.',
		'type' => 'select',
		'options' => [
			'None' => '',
			'Dotnav' => 'dotnav',
			'Thumbnav' => 'thumbnav',
		],
	],
	'thumbnav_orientation' => [
		'label' => 'Thumbnail Direction',
		'description' => 'Set the thumbnail movement direction independently from the main slideshow. Auto derives it from the thumbnail position.',
		'type' => 'select',
		'options' => [
			'Auto' => 'auto',
			'Vertical' => 'vertical',
			'Horizontal' => 'horizontal',
		],
		'enable' => "nav == 'thumbnav'",
	],
	'thumbnav_position' => [
		'label' => 'Position',
		'description' => 'Auto places vertical thumbnails on the left and horizontal thumbnails at the bottom.',
		'type' => 'select',
		'options' => [
			'Auto' => '',
			'Left' => 'left',
			'Right' => 'right',
			'Top' => 'top',
			'Bottom' => 'bottom',
		],
		'enable' => "nav == 'thumbnav'",
	],
	'thumbnav_size' => [
		'label' => 'Thumbnail Size',
		'description' => 'Set the width of a vertical thumbnav or height of a horizontal thumbnav.',
		'type' => 'range',
		'attrs' => ['min' => 64, 'max' => 160, 'step' => 4],
		'enable' => "nav == 'thumbnav'",
	],
	'nav_arrows' => [
		'type' => 'checkbox',
		'text' => 'Show thumbnav arrows',
		'enable' => "nav == 'thumbnav'",
	],
	'slidenav' => [
		'label' => 'Slidenav',
		'description' => 'Show previous and next controls over the main slideshow.',
		'type' => 'select',
		'options' => [
			'None' => '',
			'Default' => 'default',
		],
	],
	'slidenav_hover' => [
		'type' => 'checkbox',
		'text' => 'Show on hover only',
		'enable' => 'slidenav',
	],
	'slidenav_large' => [
		'type' => 'checkbox',
		'text' => 'Larger style',
		'enable' => 'slidenav',
	],
	'slidenav_breakpoint' => [
		'label' => 'Breakpoint',
		'description' => 'Display the slidenav only on this device width and larger.',
		'type' => 'select',
		'options' => [
			'Always' => '',
			'Small (Phone Landscape)' => 's',
			'Medium (Tablet Landscape)' => 'm',
			'Large (Desktop)' => 'l',
			'X-Large (Large Screens)' => 'xl',
		],
		'enable' => 'slidenav',
	],
	'thumbnail_count' => [
		'label' => 'Visible Thumbnails',
		'type' => 'range',
		'attrs' => ['min' => 2, 'max' => 10, 'step' => 1],
	],
	'slide_gap' => [
		'label' => 'Main/Thumbnail Gap',
		'type' => 'range',
		'attrs' => ['min' => 0, 'max' => 80, 'step' => 5],
	],
	'thumbnail_gap' => [
		'label' => 'Thumbnail Gap',
		'type' => 'range',
		'attrs' => ['min' => 0, 'max' => 40, 'step' => 5],
	],
	'slideshow_border' => [
		'label' => 'Border',
		'type' => 'select',
		'options' => [
			'None' => '',
			'Rounded' => 'rounded',
		],
	],
	'slideshow_box_shadow' => [
		'label' => 'Box Shadow',
		'type' => 'select',
		'options' => [
			'None' => '',
			'Small' => 'small',
			'Medium' => 'medium',
			'Large' => 'large',
			'X-Large' => 'xlarge',
			'Bottom' => 'bottom',
		],
	],
	'lightbox' => [
		'label' => 'Lightbox',
		'type' => 'checkbox',
		'text' => 'Open images in a lightbox gallery',
	],
	'lightbox_controls' => [
		'type' => 'checkbox',
		'text' => 'Show controls always',
		'enable' => 'lightbox',
	],
	'lightbox_counter' => [
		'type' => 'checkbox',
		'text' => 'Show counter',
		'enable' => 'lightbox',
	],
	'lightbox_bg_close' => [
		'type' => 'checkbox',
		'text' => 'Close on background click',
		'enable' => 'lightbox',
	],
	'lightbox_caption' => [
		'type' => 'checkbox',
		'text' => 'Use image alt text as caption',
		'enable' => 'lightbox',
	],
	'lightbox_animation' => [
		'label' => 'Animation',
		'description' => 'Select the transition between two lightbox slides.',
		'type' => 'select',
		'options' => [
			'Slide' => '',
			'Fade' => 'fade',
			'Scale' => 'scale',
		],
		'enable' => 'lightbox',
	],
	'lightbox_nav' => [
		'label' => 'Navigation',
		'description' => 'Select the navigation type inside the lightbox.',
		'type' => 'select',
		'options' => [
			'Slidenav' => '',
			'Dotnav' => 'dotnav',
			'Thumbnav' => 'thumbnav',
		],
		'enable' => 'lightbox',
	],
];
array_splice($config['fieldset']['default']['fields'][1]['fields'], 0, 0, [
	[
		'label' => 'Slideshow',
		'type' => 'group',
		'divider' => true,
		'fields' => [
			'gallery_orientation',
			'gallery_height',
			'gallery_mobile_height',
			'image_fit',
			'image_position',
			'image_loading',
			'slideshow_loop',
			'slideshow_drag',
			'slideshow_border',
			'slideshow_box_shadow',
		],
	],
	[
		'label' => 'Animation',
		'type' => 'group',
		'divider' => true,
		'fields' => [
			'slideshow_velocity',
			'slideshow_autoplay',
			'slideshow_autoplay_pause',
			'slideshow_autoplay_interval',
		],
	],
	[
		'label' => 'Navigation',
		'type' => 'group',
		'divider' => true,
			'fields' => [
			'nav',
			'thumbnav_orientation',
			'thumbnav_position',
			'thumbnav_size',
			'thumbnail_count',
			'nav_arrows',
			'slide_gap',
			'thumbnail_gap',
		],
	],
	[
		'label' => 'Slidenav',
		'type' => 'group',
		'divider' => true,
		'fields' => [
			'slidenav',
			'slidenav_hover',
			'slidenav_large',
			'slidenav_breakpoint',
		],
	],
	[
		'label' => 'Lightbox',
		'type' => 'group',
		'divider' => true,
		'fields' => [
			'lightbox',
			'lightbox_controls',
			'lightbox_counter',
			'lightbox_bg_close',
			'lightbox_caption',
			'lightbox_animation',
			'lightbox_nav',
		],
	],
]);

return $config;
