<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type;

use YOOtheme\Arr;
use YOOtheme\Builder\Source;
use YOOtheme\Config;
use YOOtheme\Event;
use YOOtheme\Path;
use YOOtheme\Str;
use function YOOtheme\app;

class RMFieldsType extends BaseType
{

	public static function config(Source $source, $type, array $fields)
	{
		return parent::triggerEvent([
			'fields' => array_filter(
				array_reduce(
					$fields,
					fn($fields, $field) => $fields +
						static::configFields(
							$field,
							[
								'type'       => 'String',
								'name'       => $field->alias,
								'metadata'   => [
									'label' => $field->title,
									'group' => $field->group_title ?? '',
								],
								'extensions' => [
									'call' => "{$type}.fields@resolve",
								],
							],
							$source,
							$type,
						),
					[],
				),
			),

			'extensions' => [
				'bind' => [
					"{$type}.fields" => [
						'class' => __CLASS__,
						'args'  => [],
					],
				],
			],
		]);
	}

	protected static function configFields($field, array $config, Source $source, $type)
	{

		$field_plugin = ucfirst(strtolower($field->plugin));
		$class_name   = 'Joomla\\Plugin\\System\\YTDynamics\\Yootheme\\Type\\Fields\\Plugins\\' . $field_plugin;

		if (!class_exists($class_name))
		{
			return [];
		}

		return forward_static_call([$class_name, 'configFields'], $field, $config, $source, $type);
	}

	public function resolve($item, $args, $ctx, $info)
	{
		$name  = $info->fieldName;
		$field = $item->fields[$name];

		$field_plugin = ucfirst(strtolower($field->plugin));
		$class_name   = 'Joomla\\Plugin\\System\\YTDynamics\\Yootheme\\Type\\Fields\\Plugins\\' . $field_plugin;

		$object = new $class_name;

		return call_user_func([$object, 'resolve'], $field, $args, $ctx, $info);
	}

	public static function field($item, $args, $ctx, $info)
	{
		return $item;
	}

}