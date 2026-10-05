<?php
namespace YOOtheme;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;
$config = ElementConfig::fromJson(__DIR__);

// Kept as a renderer for existing layouts. New layouts should use
// RM Product Price, which owns the complete final/base/discount/unit output.
$config['element'] = false;
$config['group'] = '';
$config['title'] = 'RM Product Unit Price (Legacy)';

return $config;
