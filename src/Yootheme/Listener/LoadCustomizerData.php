<?php

namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use YOOtheme\Config;
use YOOtheme\Metadata;
use YOOtheme\Path;
use YOOtheme\Url;

class LoadCustomizerData
{
	public Config $config;
	public Metadata $metadata;

	public function __construct(Config $config, Metadata $metadata)
	{
		$this->config = $config;
		$this->metadata = $metadata;
	}

	public function handle(): void
	{
		// Include tour picker script
		$this->metadata->set('script:customizer.rm.product', ['src' => Url::to(implode('/', ['media', 'plg_system_ytdynamics', 'js', 'picker-product.min.js'])), '', 'defer' => true]);
	}
}
