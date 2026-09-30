<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = require JPATH_ROOT . '/templates/yootheme/packages/builder-joomla/elements/search/element.php';
$config = array_replace_recursive($config, ElementConfig::fromJson(__DIR__));

return $config;
