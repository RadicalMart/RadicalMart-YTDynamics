<?php

use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener\LoadTemplateUrl;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\SourceController;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener\LoadBuilderConfig;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Theme\Listener\LoadCustomizerData;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener\LoadSourceTypes;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener\LoadTemplate;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source\Listener\MatchTemplate;
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
		'builder.template.load' => [LoadTemplateUrl::class => '@handle'],
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