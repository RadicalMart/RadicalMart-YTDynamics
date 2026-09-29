<?php

namespace YOOtheme;

$config = require JPATH_ROOT . '/templates/yootheme/packages/builder-joomla/elements/search/element.php';
$config['name'] = 'rmsearch';
$config['title'] = 'RM Search';
$config['group'] = 'RadicalMart';
$config['icon'] = '${url:images/icon.svg}';
$config['iconSmall'] = '${url:images/iconSmall.svg}';
$config['templates']['render'] = __DIR__ . '/templates/template.php';

return $config;
