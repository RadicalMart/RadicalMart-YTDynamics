<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Fields\Plugins;

use YOOtheme\Builder\Source;

class Standard extends General
{

	public static function configFields($field, array $config, Source $source, $type)
	{
		$field_type = ucfirst(strtolower($field->params->get('type')));

		$config = is_callable($callback = [__CLASS__, "config{$field_type}"])
			? $callback($field, $config, $source, $type)
			: static::configGenericField($field, $config);

		return array_is_list($config)
			? array_combine(array_column($config, 'name'), $config)
			: [$config['name'] => $config];
	}

	protected static function configText($field, array $config)
	{
		return array_replace_recursive($config, ['metadata' => ['filters' => ['limit']]]);
	}

	protected static function configTextarea($field, array $config)
	{
		return array_replace_recursive($config, ['metadata' => ['filters' => ['limit']]]);
	}

	protected static function configEditor($field, array $config)
	{
		return array_replace_recursive($config, ['metadata' => ['filters' => ['limit']]]);
	}

	protected static function configList($field, array $config)
	{
		if ((int) $field->params->get('multiple'))
		{
			return [
				[
					'type' => ['listOf' => 'RMChoiceFieldType'],
				] + $config,
				[
					'name' => "{$config['name']}String",
					'type' => 'RMChoiceFieldStringType',
				] + $config,
			];
		}

		return ['type' => 'RMChoiceFieldType'] + $config;
	}

	protected static function configCheckboxes($field, array $config)
	{
		if ((int) $field->params->get('multiple'))
		{
			return [
				[
					'type' => ['listOf' => 'RMChoiceFieldType'],
				] + $config,
				[
					'name' => "{$config['name']}String",
					'type' => 'RMChoiceFieldStringType',
				] + $config,
			];
		}

		return ['type' => 'RMChoiceFieldType'] + $config;
	}

	public function resolve($field, $args, $ctx, $info)
	{
		return $this->resolveField($field, $field->rawvalue);
	}

	public function resolveField($field, $value)
	{
		$field_type = ucfirst(strtolower($field->params->get('type')));

		if (is_callable($callback = [$this, "resolve{$field_type}"]))
		{
			return $callback($field);
		}

		return $this->resolveGenericField($field, $value);
	}

	public function resolveGenericField($field, $value)
	{
		return $field->value;
	}

	public function resolveList($field)
	{
		return $this->resolveSelect($field, (bool) ((int) $field->params->get('multiple')));
	}

	public function resolveCheckboxes($field)
	{
		return $this->resolveSelect($field, (bool) ((int) $field->params->get('multiple')));
	}

	public function resolveSelect($field, $multiple = false)
	{
		$result = [];

		foreach ($field->options as $option)
		{

			if (in_array($option['value'], (array) $field->rawvalue ?: []))
			{
				if ($multiple)
				{
					$result[] = $option;
					continue;
				}

				return $option;
			}
		}

		return $result;
	}

}