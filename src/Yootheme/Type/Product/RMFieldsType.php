<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsResultEvent;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\BaseType;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins\GalleryPluginTypeType;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins\GeneralPluginType;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins\RangePluginType;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins\StandardPluginType;
use Joomla\Plugin\System\YTDynamics\Yootheme\Type\Product\Fields\Plugins\SubformPluginType;
use YOOtheme\Arr;
use YOOtheme\Builder\Source;
use YOOtheme\Config;
use YOOtheme\Event;
use YOOtheme\Path;
use YOOtheme\Str;
use function YOOtheme\app;

class RMFieldsType extends BaseType
{

	protected static $plugins_map = [
		'general'  => GeneralPluginType::class,
		'standard' => StandardPluginType::class,
		'subform'  => SubformPluginType::class,
		'gallery'  => GalleryPluginTypeType::class,
		'range'    => RangePluginType::class,
	];

	public static function config(Source $source, $type, array $fields)
	{
		$event = new YTDynamicsResultEvent(
			'onRadicalMartYTDynamicsProductFieldsTypeConfig',
			[]
		);

		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsProductFieldsTypeConfig',
			$event
		);

		$class_name_event = $event->getResult();

		if (is_array($class_name_event) && count($class_name_event) > 0)
		{
			foreach ($class_name_event as $event)
			{
				static::$plugins_map = array_merge(static::$plugins_map, $event);
			}
		}

		return parent::triggerEvent([
			'fields' => array_filter(
				array_reduce(
					$fields,
					static fn($fields, $field) => $fields +
						static::configFields(
							$field,
							[
								'type'       => 'String',
								'name'       => strtr($field->alias, '-', '_'),
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

		$field_plugin = strtolower($field->plugin);

		$class_name = static::$plugins_map[$field_plugin] ?? '';

		if (!class_exists($class_name))
		{
			return [];
		}

		return forward_static_call([$class_name, 'configFields'], $field, $config, $source, $type);
	}

	public function resolve($item, $args, $ctx, $info)
	{
		$name = strtr($info->fieldName, '_', '-');

		if (empty($item->fields[$name]))
		{
			return;
		}

		$field = $item->fields[$name];

		$field_plugin = strtolower($field->plugin);
		$class_name   = static::$plugins_map[$field_plugin] ?? '';

		$object = new $class_name;

		return $object->resolve($field, $args, $ctx, $info);
	}

	public static function field($item, $args, $ctx, $info)
	{
		return $item;
	}

}