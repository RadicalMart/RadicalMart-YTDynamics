<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element;

use Joomla\CMS\Factory;

final class ProductListState
{
	public const LAYOUT_COOKIE = 'com_radicalmart_category_list_item_template';
	public const ORDERING_COOKIE = 'com_radicalmart_category_list_ordering';

	private const LAYOUTS = ['grid', 'list', 'table'];

	private const ORDERINGS = [
		'ordering ASC' => 'PLG_YTDYNAMICS_ORDERING_DEFAULT',
		'ordering_price ASC' => 'PLG_YTDYNAMICS_ORDERING_PRICE_ASC',
		'ordering_price DESC' => 'PLG_YTDYNAMICS_ORDERING_PRICE_DESC',
		'ordering_date DESC' => 'PLG_YTDYNAMICS_ORDERING_DATE_DESC',
		'ordering_title ASC' => 'PLG_YTDYNAMICS_ORDERING_TITLE_ASC',
	];

	public static function layout(): string
	{
		$input = Factory::getApplication()->getInput();
		$layout = $input->get->getCmd(self::LAYOUT_COOKIE)
			?: $input->cookie->getCmd(self::LAYOUT_COOKIE, 'grid');

		return in_array($layout, self::LAYOUTS, true) ? $layout : 'grid';
	}

	public static function ordering(): string
	{
		$ordering = Factory::getApplication()
			->getInput()
			->cookie
			->getString(self::ORDERING_COOKIE, 'ordering ASC');

		return isset(self::ORDERINGS[$ordering]) ? $ordering : 'ordering ASC';
	}

	public static function orderingOptions(): array
	{
		return self::ORDERINGS;
	}

	public static function matchesMode(string $mode): bool
	{
		$layout = match ($mode)
		{
			'radicalmart_grid' => 'grid',
			'radicalmart_list' => 'list',
			'radicalmart_table' => 'table',
			default => null,
		};

		return $layout === null || $layout === self::layout();
	}
}
