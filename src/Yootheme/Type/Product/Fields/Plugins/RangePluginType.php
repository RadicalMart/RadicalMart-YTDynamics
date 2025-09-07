<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins;

use YOOtheme\Builder\Source;
use YOOtheme\Str;

class RangePluginType extends GeneralPluginType
{

	public static function configFields($field, array $config, Source $source, $type)
	{
		$field_type = ucfirst(strtolower($field->params->get('type')));

		$config = is_callable($callback = [__CLASS__, "config{$field_type}"])
			? $callback($field, $config, $source, $type)
			: static::configSingle($field, $config);

		return array_is_list($config)
			? array_combine(array_column($config, 'name'), $config)
			: [$config['name'] => $config];
	}

	protected static function configSingle($field, array $config)
	{
		return array_replace_recursive($config, ['metadata' => ['filters' => ['limit']]]);
	}

	protected static function configRange($field, array $config, Source $source)
	{
		$fields = [
			'from' => [
				'type'     => 'Float',
				'metadata' => [
					'label' => 'From'
				],
			],
			'to'  => [
				'type'     => 'Float',
				'metadata' => [
					'label' => 'To'
				],
			],
			'string' => [
				'type'     => 'String',
				'metadata' => [
					'label' => 'String'
				],
			],
		];

		$name = Str::camelCase(['Field', $field->alias], true);
		$source->objectType($name, compact('fields'));

		return ['type' => $name] + $config;
	}

	public function resolve($field, $args, $ctx, $info)
	{
		return $this->resolveField($field);
	}

	public function resolveField($field)
	{
		$field_type = ucfirst(strtolower($field->params->get('type')));

		if (is_callable($callback = [$this, "resolve{$field_type}"]))
		{
			return $callback($field);
		}

		return $this->resolveSingle($field);
	}

	public function resolveSingle($field)
	{
		return $field->value;
	}

	public function resolveRange($field)
	{
		return [
			'from' => $field->rawvalue['from'],
			'to' => $field->rawvalue['to'],
			'string' => $field->value,
		];
	}
}