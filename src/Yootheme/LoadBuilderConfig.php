<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme;

use Joomla\CMS\Factory;
use YOOtheme\Builder\BuilderConfig;
use YOOtheme\Config;

class LoadBuilderConfig
{
	public Config $config;

	public function __construct(Config $config)
	{
		$this->config = $config;
	}

	public function handle($config): void
	{
		$model_categories = Factory::getApplication()->bootComponent('com_radicalmart')
			->getMVCFactory()
			->createModel('Categories', 'Administrator', ['ignore_request' => true]);

		$model_categories->setState('filter.published', 1);
		$categories = $model_categories->getItems();
		$options    = [];

		foreach ($categories as $category)
		{
			$options[] = ['value' => $category->id, 'text' => $category->title];
		}

		$config->merge([
			'categories' => $options
		]);

	}

}
