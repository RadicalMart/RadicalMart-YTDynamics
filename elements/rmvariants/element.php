<?php

namespace YOOtheme;

// Backward-compatible renderer for layouts saved before RM Product Card was
// renamed from the ambiguous `rmvariants` type. It stays out of the element
// picker, while existing pages continue to render until their stored type is
// migrated to `rmproductcard`.
$config = require dirname(__DIR__) . '/rmproductcard/element.php';
$config['name'] = 'rmvariants';
$config['title'] = 'RM Product Card (Legacy)';
$config['element'] = false;
$config['group'] = '';

return $config;
