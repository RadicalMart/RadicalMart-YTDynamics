<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element;

use JsonException;
use RuntimeException;

final class ElementConfig
{
	/**
	 * Load a plugin-owned JSON element through YOOtheme's PHP element API.
	 *
	 * @throws JsonException
	 */
	public static function fromJson(string $directory): array
	{
		$file = $directory . '/element.json';
		$config = json_decode((string) file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);

		foreach ($config['templates'] ?? [] as $name => $template)
		{
			if (is_string($template) && str_starts_with($template, './'))
			{
				$config['templates'][$name] = $directory . substr($template, 1);
			}
		}

		return $config;
	}

	/**
	 * Load the matching element definition from the installed YOOtheme Pro 5.x.
	 */
	public static function fromCore(string $name): array
	{
		$file = JPATH_ROOT . "/templates/yootheme/packages/builder/elements/{$name}/element.php";

		if (!is_file($file))
		{
			throw new RuntimeException("YOOtheme element definition not found: {$name}");
		}

		return require $file;
	}

	/**
	 * Create a custom collection element backed by the current YOOtheme definition.
	 */
	public static function collection(
		string $coreName,
		string $name,
		string $title,
		string $itemType
	): array
	{
		$config = self::fromCore($coreName);
		$config['name'] = $name;
		$config['title'] = $title;
		$config['group'] = 'RadicalMart';
		$config['icon'] = '${url:images/icon.svg}';
		$config['iconSmall'] = '${url:images/iconSmall.svg}';

		foreach ($config['placeholder']['children'] ?? [] as &$child)
		{
			$child['type'] = $itemType;
		}
		unset($child);

		$config['fields']['content']['item'] = $itemType;
		unset($config['fields']['content']['media']);

		return $config;
	}

	/**
	 * Keep custom item layouts compatible with the YOOtheme 5.x item API while
	 * still rendering the legacy html_element property from saved layouts.
	 *
	 * @throws JsonException
	 */
	public static function itemFromJson(string $directory): array
	{
		$config = self::fromJson($directory);
		$config['title'] = 'Item';
		$config['fields']['item_element'] = '${builder.html_element_item}';
		unset($config['fields']['html_element']);
		$config['fieldset'] = self::replaceValues(
			$config['fieldset'] ?? [],
			[
				'html_element' => 'item_element',
				'${builder.advanced}' => '${builder.advancedItem}',
			]
		);

		return $config;
	}

	public static function keepSettingGroups(array $config, array $labels): array
	{
		$tabs = &$config['fieldset']['default']['fields'];

		if (!isset($tabs[1]['fields']) || !is_array($tabs[1]['fields']))
		{
			return $config;
		}

		$tabs[1]['fields'] = array_values(array_filter(
			$tabs[1]['fields'],
			static fn($group) => !is_array($group) || in_array($group['label'] ?? '', $labels, true)
		));

		return $config;
	}

	private static function replaceValues(array $items, array $replacements): array
	{
		foreach ($items as $key => $value)
		{
			if (is_array($value))
			{
				$items[$key] = self::replaceValues($value, $replacements);
			}
			elseif (is_string($value) && isset($replacements[$value]))
			{
				$items[$key] = $replacements[$value];
			}
		}

		return $items;
	}
}
