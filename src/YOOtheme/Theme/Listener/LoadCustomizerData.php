<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Theme\Listener;

use YOOtheme\Config;
use YOOtheme\Metadata;

class LoadCustomizerData
{
    public Config $config;
    public Metadata $metadata;

    public function __construct(Config $config, Metadata $metadata)
    {
        $this->config   = $config;
        $this->metadata = $metadata;
    }

    public function handle(): void
    {
        $this->metadata->set('script:customizer.rm.product',
            [
                'src'   => '/media/plg_system_ytdynamics/js/picker-product.min.js',
                '',
                'defer' => true,
            ],
        );
    }
}
