<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::collection(
	'switcher',
	'rmswitcher',
	'RM Switcher',
	'rmswitcher_item'
);
$config['placeholder']['children'] = array_map(
	static fn(int $index): array => [
		'type' => 'rmswitcher_item',
		'props' => [
			'name' => "Item {$index}",
			'title' => "Item {$index}",
			'label' => "Item {$index}",
		],
		'children' => [
			[
				'type' => 'headline',
				'props' => [
					'content' => "Switcher item {$index}",
					'title_element' => 'h3',
					'title_style' => 'h4',
				],
			],
			[
				'type' => 'text',
				'props' => ['content' => 'Build this panel with any YOOtheme or RadicalMart elements.'],
			],
		],
	],
	range(1, 3),
);
$config = ElementConfig::setTabFields($config, 'Content', [
	'content',
	'show_image',
	'show_label',
	'show_thumbnail',
]);
$config = ElementConfig::keepSettingGroups($config, ['Switcher', 'Navigation', 'General']);

return $config;
