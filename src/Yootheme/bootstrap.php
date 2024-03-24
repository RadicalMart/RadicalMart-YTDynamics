<?php

use Joomla\Plugin\System\YTDynamics\Yootheme\LoadBuilderConfig;
use Joomla\Plugin\System\YTDynamics\Yootheme\SourceListener;
use YOOtheme\Builder\BuilderConfig;

return [

    'routes' => [
        // noop
    ],

    'events' => [
        'source.init' => [SourceListener::class => 'initSource'],
        BuilderConfig::class => [LoadBuilderConfig::class => '@handle'],
    ],

];