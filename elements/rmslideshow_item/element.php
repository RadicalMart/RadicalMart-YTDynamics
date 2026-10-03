<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::itemFromJson(__DIR__);
$config['transforms']['render'] = static function ($node): bool {
	return !empty($node->props['image']);
};

return $config;
