<?php

use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadBuilderConfig;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadSourceTypes;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadTemplate;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\MatchTemplate;
use YOOtheme\Builder\BuilderConfig;
use YOOtheme\Builder;

return [

	'routes' => [
		// noop
	],

	'events' => [
		'source.init'        => [LoadSourceTypes::class => '@handle'],
		'builder.template'   => [MatchTemplate::class => '@handle'],
		//'builder.template.load' => [LoadTemplateUrl::class => '@handle'],
		BuilderConfig::class => [LoadBuilderConfig::class => '@handle'],
	],

	'actions' => [
		'onLoadTemplate' => [LoadTemplate::class => '@handle'],
	],

	'extend' => [
		Builder::class => function (Builder $builder) {
			$builder->addTypePath(JPATH_ROOT . '/plugins/system/ytdynamics/elements/*/element.json');
		},
	]

];