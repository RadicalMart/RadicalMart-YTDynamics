<?php

namespace YOOtheme;

\defined('_JEXEC') or die;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState;

$config = ElementConfig::collection('grid', 'rmgrid', 'RM Grid', 'rmgrid_item');
$config['defaults']['mode'] = 'default';
$config['placeholder']['children'] = array_map(
	static fn(int $index): array => [
		'type' => 'rmgrid_item',
		'props' => [
			'name' => "Item {$index}",
			'panel_style' => 'card-default',
			'panel_padding' => 'default',
		],
		'children' => [
			[
				'type' => 'headline',
				'props' => [
					'content' => "Item {$index}",
					'title_element' => 'h3',
					'title_style' => 'h4',
				],
			],
			[
				'type' => 'text',
				'props' => [
					'content' => 'Build this card with any YOOtheme or RadicalMart elements.',
					'margin_bottom' => '',
				],
			],
		],
	],
	range(1, 3),
);
$config['fields']['mode'] = [
	'label' => 'Mode',
	'type' => 'select',
	'options' => [
		'Default' => 'default',
		'RadicalMart Grid' => 'radicalmart_grid',
		'RadicalMart List' => 'radicalmart_list',
	],
];

$config = ElementConfig::setTabFields($config, 'Content', ['content']);
$config = ElementConfig::keepSettingGroups(
	$config,
	['Grid', 'Columns', 'Filter', 'General']
);
$config = ElementConfig::prependSettingGroup($config, [
	'label' => 'Mode',
	'type' => 'group',
	'divider' => true,
	'fields' => ['mode'],
]);

$config['fields']['css']['description'] = 'Custom CSS is scoped to this RM Grid. Use the selectors below for the grid, filter navigation and custom card parts.';
$config['fields']['css']['attrs']['hints'] = [
	'.el-element',
	'.el-nav',
	'.el-item',
	'.rm-grid-item',
	'.rm-grid-item__content',
];

$coreRender = $config['transforms']['render'] ?? null;
$config['transforms']['render'] = static function ($node, $params) use ($coreRender) {
	if (!ProductListState::matchesMode((string) ($node->props['mode'] ?? 'default')))
	{
		return false;
	}

	// RM Grid items are arbitrary Builder fragments. A parent lightbox would
	// capture data-type links belonging to nested elements and cannot build the
	// standard Grid captions, so lightboxes remain the responsibility of those
	// nested elements.
	$node->props['lightbox'] = false;

	return $coreRender ? $coreRender($node, $params) : null;
};

return $config;
