<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState;

$config = ElementConfig::fromJson(__DIR__);
$config['transforms']['render'] = static function ($node): bool {
	return ProductListState::matchesMode((string) ($node->props['mode'] ?? 'default'));
};

return $config;
