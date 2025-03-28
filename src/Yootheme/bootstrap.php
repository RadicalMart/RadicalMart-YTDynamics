<?php

use Joomla\Plugin\System\YTDynamics\Yootheme\Controller\SourceController;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadBuilderConfig;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadCustomizerData;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadSourceTypes;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\LoadTemplate;
use Joomla\Plugin\System\YTDynamics\Yootheme\Listener\MatchTemplate;
use YOOtheme\Builder\BuilderConfig;
use YOOtheme\Builder;

return [

	'routes' => [
		['get', '/rm/products', [SourceController::class, 'products']],
	],

	'events' => [
		'customizer.init' => [
			LoadCustomizerData::class => ['@handle', 10],
		],
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