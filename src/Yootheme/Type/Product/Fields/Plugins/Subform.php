<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins;

use YOOtheme\Builder\Source;
use YOOtheme\Str;

class Subform extends General
{

	public static function configFields($field, array $config, Source $source, $type)
	{
		$field_type = 'Subform';

		$config = is_callable($callback = [__CLASS__, "config{$field_type}"])
			? $callback($field, $config, $source, $type)
			: static::configGenericField($field, $config);

		return array_is_list($config)
			? array_combine(array_column($config, 'name'), $config)
			: [$config['name'] => $config];
	}

	protected static function configSubform($field, array $config, Source $source)
	{
		$fields = [];

		foreach ((array) $field->params->get('fields') as $params)
		{
			$fields[$params->name] = [
				'type'     => 'String',
				'name'     => Str::snakeCase($params->name),
				'metadata' => [
					'label'   => $params->label,
					'filters' => !in_array($params->type, ['number']) ? ['limit'] : [],
				],
			];
		}

		if ($fields)
		{
			$name = Str::camelCase(['Field', $field->alias], true);
			$source->objectType($name, compact('fields'));

			return ['type' => ['listOf' => $name]] + $config;
		}
	}

	public function resolve($field, $args, $ctx, $info)
	{

		$fields = [];

		foreach ($field->params->get('fields', []) as $subField)
		{
			$fields[$subField->name] = $subField->type;
		}

		return array_map(function ($vals) use ($fields) {
			$values = [];

			foreach ($vals as $name => $value)
			{
				$values[Str::snakeCase($name)] = $value;
			}

			return $values;

		}, array_values((is_string($field->rawvalue) ? json_decode($field->rawvalue, true) : $field->rawvalue) ?: []));


	}

}