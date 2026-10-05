<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$files = glob($root . '/elements/*/element.json') ?: [];
$names = [];
$errors = [];

foreach ($files as $file)
{
	try
	{
		$config = json_decode((string) file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
	}
	catch (JsonException $exception)
	{
		$errors[] = str_replace($root . '/', '', $file) . ': ' . $exception->getMessage();
		continue;
	}

	$name = trim((string) ($config['name'] ?? ''));
	if ($name === '')
	{
		$errors[] = str_replace($root . '/', '', $file) . ': missing element name';
	}
	elseif (isset($names[$name]))
	{
		$errors[] = str_replace($root . '/', '', $file) . ": duplicate element name {$name}";
	}
	else
	{
		$names[$name] = $file;
	}

	foreach (($config['templates'] ?? []) as $template)
	{
		if (is_string($template) && str_starts_with($template, './') && !is_file(dirname($file) . substr($template, 1)))
		{
			$errors[] = str_replace($root . '/', '', $file) . ": missing template {$template}";
		}
	}
}

if ($errors)
{
	fwrite(STDERR, implode(PHP_EOL, $errors) . PHP_EOL);
	exit(1);
}

printf("Validated %d element definitions.%s", count($files), PHP_EOL);
