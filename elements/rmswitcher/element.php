<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::collection(
	'switcher',
	'rmswitcher',
	'RM Switcher',
	'rmswitcher_item'
);
$config['placeholder']['children'] = [
	['type' => 'rmswitcher_item', 'props' => []],
];
$config['fieldset']['default']['fields'][0]['fields'] = [
	'content',
	'show_image',
	'show_label',
	'show_thumbnail',
];
$config = ElementConfig::keepSettingGroups($config, ['Switcher', 'Navigation', 'General']);

return $config;
