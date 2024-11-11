<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins;

use YOOtheme\Builder\Source;
use YOOtheme\Str;

class Gallery extends General
{

	public static function configFields($field, array $config, Source $source, $type)
	{
		$field_type = 'Gallery';

		$config = is_callable($callback = [__CLASS__, "config{$field_type}"])
			? $callback($field, $config, $source, $type)
			: static::configGenericField($field, $config);

		return array_is_list($config)
			? array_combine(array_column($config, 'name'), $config)
			: [$config['name'] => $config];
	}

	protected static function configGallery($field, array $config, Source $source)
	{
		$fields = [
			'type' => [
				'type'     => 'String',
				'metadata' => [
					'label' => 'Type'
				],
			],
			'src'  => [
				'type'     => 'String',
				'metadata' => [
					'label' => 'Src'
				],
			],
			'text' => [
				'type'     => 'String',
				'metadata' => [
					'label' => 'Text'
				],
			],
		];

		$name = Str::camelCase(['Field', $field->alias], true);
		$source->objectType($name, compact('fields'));

		return ['type' => ['listOf' => $name]] + $config;

	}

	public function resolve($field, $args, $ctx, $info)
	{
		return array_map(static function ($vals) {
			$values = [];

			foreach ($vals as $name => $value)
			{
				$values[Str::snakeCase($name)] = $value;
			}

			return $values;

		}, array_values((is_string($field->rawvalue) ? json_decode($field->rawvalue, true) : $field->rawvalue) ?: []));
	}

}