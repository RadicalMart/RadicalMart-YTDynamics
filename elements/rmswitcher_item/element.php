<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::itemFromJson(__DIR__);
$config['fields']['image_focal_point'] = [
	'label' => 'Focal Point',
	'type' => 'select',
	'options' => [
		'Top Left' => 'top-left',
		'Top Center' => 'top-center',
		'Top Right' => 'top-right',
		'Center Left' => 'center-left',
		'Center Center' => '',
		'Center Right' => 'center-right',
		'Bottom Left' => 'bottom-left',
		'Bottom Center' => 'bottom-center',
		'Bottom Right' => 'bottom-right',
	],
	'source' => true,
];
$config['fields']['thumbnail_focal_point'] = $config['fields']['image_focal_point'];
$config['fields']['thumbnail_focal_point']['enable'] = 'thumbnail';
$config = ElementConfig::setSettingGroupFields($config, 'Nav', [
	'title',
	'label',
	'image',
	'image_focal_point',
	'image_alt',
	'thumbnail',
	'thumbnail_focal_point',
]);
$config['transforms']['render'] = static function ($node, $params): void {
	$node->props['root'] = !$params['parent'];
};

return $config;
