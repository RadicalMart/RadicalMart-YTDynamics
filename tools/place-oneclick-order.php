<?php

declare(strict_types=1);

/**
 * Adds the RM One Click Order element to the active shared Premier product
 * template without rebuilding the rest of the YOOtheme layout.
 */

$databaseHost = getenv('JOOMLA_DB_HOST') ?: 'db:3306';
$databasePort = '3306';
if (str_contains($databaseHost, ':'))
{
	[$databaseHost, $databasePort] = explode(':', $databaseHost, 2);
}

$database = new PDO(
	'mysql:host=' . $databaseHost . ';port=' . $databasePort . ';dbname=' . (getenv('JOOMLA_DB_NAME') ?: 'database') . ';charset=utf8mb4',
	getenv('JOOMLA_DB_USER') ?: 'joomla',
	getenv('JOOMLA_DB_PASSWORD') ?: '',
	[
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
	]
);

$statement = $database->query(
	"SELECT extension_id, custom_data
	 FROM joom_extensions
	 WHERE element = 'yootheme' AND folder = 'system'
	 LIMIT 1"
);
$extension = $statement->fetch();
if (!$extension)
{
	throw new RuntimeException('The YOOtheme system extension was not found.');
}

$customData = json_decode((string) $extension['custom_data'], true, 512, JSON_THROW_ON_ERROR);
$template =& $customData['templates']['PREMIERPRODUCT'];
if (!is_array($template) || !isset($template['layout']) || !is_array($template['layout']))
{
	throw new RuntimeException('The PREMIERPRODUCT layout was not found.');
}

$oneClick = [
	'type' => 'rmoneclick',
	'props' => [
		'radicalform_target' => 'oneclick',
		'subject' => 'Заказ в 1 клик: {product_name}',
		'display_mode' => 'modal',
		'trigger_display' => 'button',
		'button_label' => 'Купить в 1 клик',
		'button_style' => 'default',
		'button_size' => 'large',
		'button_icon' => 'bolt',
		'button_fullwidth' => true,
		'modal_title' => 'Купить в 1 клик',
		'modal_size' => 'xlarge',
		'modal_layout' => 'split',
		'modal_center' => true,
		'send_product_id' => true,
		'send_product_name' => true,
		'send_product_code' => true,
		'send_product_url' => true,
		'send_product_price' => true,
		'summary_show_image' => true,
		'summary_show_price' => true,
		'summary_show_bonus' => false,
		'summary_show_stock' => false,
		'summary_column_width' => 40,
		'summary_image_height' => 460,
		'summary_image_height_mode' => 'fixed',
		'summary_image_fit' => 'contain',
		'summary_image_position' => 'center',
		'summary_image_background' => '#f7f7fb',
		'summary_mix_blend_mode' => 'normal',
		'submit_label' => 'Отправить заказ',
		'submit_style' => 'primary',
		'submit_size' => 'large',
		'submit_icon' => 'check',
		'submit_fullwidth' => true,
		'margin_top' => 'small',
	],
	'children' => [
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Ф.И.О.', 'field_name' => 'name', 'field_type' => 'text', 'autocomplete' => 'name', 'required' => true, 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Телефон', 'field_name' => 'phone', 'field_type' => 'tel', 'placeholder' => '+7 912 345-67-89', 'autocomplete' => 'tel', 'required' => true, 'width' => 'full', 'error_text' => 'Укажите номер телефона']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'E-Mail', 'field_name' => 'email', 'field_type' => 'email', 'autocomplete' => 'email', 'required' => true, 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Комментарий к заказу', 'field_name' => 'comment', 'field_type' => 'textarea', 'rows' => 4, 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Стоимость доставки', 'field_name' => 'delivery', 'field_type' => 'select', 'options' => "manager|Уточнить у менеджера\npickup|Самовывоз\ncourier|Доставка курьером", 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Адрес доставки', 'field_name' => 'delivery_address', 'field_type' => 'text', 'placeholder' => 'Город, улица, дом, квартира', 'autocomplete' => 'street-address', 'required' => true, 'show_when_field' => 'delivery', 'show_when_value' => 'courier', 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями обработки персональных данных', 'label_link_text' => 'обработки персональных данных', 'field_name' => 'privacy', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями публичной оферты', 'label_link_text' => 'публичной оферты', 'field_name' => 'offer', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
		['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями передачи данных третьим лицам', 'label_link_text' => 'передачи данных третьим лицам', 'field_name' => 'third_party', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
	],
];

$insertAfterBuy = static function (array &$node) use (&$insertAfterBuy, $oneClick): bool {
	if (!empty($node['children']) && is_array($node['children']))
	{
		foreach ($node['children'] as $index => $child)
		{
			if (is_array($child) && ($child['type'] ?? '') === 'rmbuy')
			{
				array_splice($node['children'], $index + 1, 0, [$oneClick]);

				return true;
			}
		}

		foreach ($node['children'] as &$child)
		{
			if (is_array($child) && $insertAfterBuy($child))
			{
				unset($child);

				return true;
			}
		}
		unset($child);
	}

	return false;
};

$found = false;
$changed = false;
$configureExisting = static function (array &$node) use (&$configureExisting, &$found, &$changed, $oneClick): void {
	if (($node['type'] ?? '') === 'rmoneclick')
	{
		$found = true;
		$props = array_replace((array) ($node['props'] ?? []), $oneClick['props']);
		if (($node['props'] ?? []) !== $props)
		{
			$node['props'] = $props;
			$changed = true;
		}
		if (($node['children'] ?? []) !== $oneClick['children'])
		{
			$node['children'] = $oneClick['children'];
			$changed = true;
		}

		return;
	}

	if (empty($node['children']) || !is_array($node['children']))
	{
		return;
	}

	foreach ($node['children'] as &$child)
	{
		if (is_array($child))
		{
			$configureExisting($child);
		}
	}
	unset($child);
};
$configureExisting($template['layout']);

if (!$found)
{
	if (!$insertAfterBuy($template['layout']))
	{
		throw new RuntimeException('No RM Add to Cart element was found in PREMIERPRODUCT.');
	}
	$changed = true;
}

if (!$changed)
{
	echo json_encode(['status' => 'unchanged', 'reason' => 'rmoneclick is already configured'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
	exit(0);
}

$backupDirectory = getenv('JOOMLA_ROOT') ?: '/var/www/html';
$backupDirectory = rtrim($backupDirectory, '/') . '/tmp';
if (!is_dir($backupDirectory) && !mkdir($backupDirectory, 0775, true) && !is_dir($backupDirectory))
{
	throw new RuntimeException('Unable to create the Joomla tmp directory.');
}
$backupPath = $backupDirectory . '/yootheme-before-oneclick-' . gmdate('Ymd-His') . '.json';
if (file_put_contents($backupPath, (string) $extension['custom_data']) === false)
{
	throw new RuntimeException('Unable to back up YOOtheme custom_data.');
}

$encoded = json_encode($customData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
$database->beginTransaction();
try
{
	$update = $database->prepare('UPDATE joom_extensions SET custom_data = ? WHERE extension_id = ?');
	$update->execute([$encoded, (int) $extension['extension_id']]);
	$database->commit();
}
catch (Throwable $error)
{
	$database->rollBack();
	throw $error;
}

echo json_encode([
	'status' => $found ? 'updated' : 'ok',
	'template' => 'PREMIERPRODUCT',
	'placement' => $found ? 'existing rmoneclick' : 'after rmbuy',
	'target' => 'oneclick',
	'backup' => $backupPath,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR) . PHP_EOL;
