<?php

namespace YOOtheme;

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::fromJson(__DIR__);
$config['title'] = 'RM Product Card Area (Legacy)';
$config['element'] = false;
$config['group'] = '';

return $config;
