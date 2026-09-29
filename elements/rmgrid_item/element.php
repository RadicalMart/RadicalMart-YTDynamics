<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::itemFromJson(__DIR__);
$config['transforms']['render'] = static function ($node, $params): void {
	$node->props['root'] = !$params['parent'];

	// Older RM Grid items stored default margins on every card. Inside a grid
	// this duplicates the configured row gap and prevents clean height matching.
	if (($node->props['margin_top'] ?? '') === 'default'
		&& ($node->props['margin_bottom'] ?? '') === 'default')
	{
		$node->props['margin_top'] = '';
		$node->props['margin_bottom'] = '';
	}
};

return $config;
