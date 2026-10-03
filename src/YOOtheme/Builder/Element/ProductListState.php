<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element;

use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

final class ProductListState
{
	public const LAYOUT_COOKIE = 'com_radicalmart_category_list_item_template';
	public const MODE_COOKIE = 'plg_system_ytdynamics_catalog_layout';
	public const ORDERING_COOKIE = 'com_radicalmart_category_list_ordering';

	/**
	 * Public layout values used by the toolbar and new Builder layouts.
	 */
	private const LAYOUTS = ['tile', 'compact', 'list', 'price'];

	/**
	 * Values used by catalog layouts created before the four-mode switcher.
	 */
	private const LAYOUT_ALIASES = [
		'grid' => 'tile',
		'table' => 'price',
	];

	private const MODE_LAYOUTS = [
		'radicalmart_tile' => 'tile',
		'radicalmart_compact' => 'compact',
		'radicalmart_list' => 'list',
		'radicalmart_price' => 'price',
		// Builder content saved before the explicit tile/price names.
		'radicalmart_grid' => 'tile',
		'radicalmart_table' => 'price',
	];

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
		$modeCookie = self::modeCookie();
		$candidates = [
			$input->get->getCmd($modeCookie),
			$input->get->getCmd(self::LAYOUT_COOKIE),
			$input->cookie->getCmd($modeCookie),
			$input->cookie->getCmd(self::LAYOUT_COOKIE, 'grid'),
		];

		foreach ($candidates as $layout)
		{
			$layout = self::LAYOUT_ALIASES[$layout] ?? $layout;

			if (in_array($layout, self::LAYOUTS, true))
			{
				return $layout;
			}
		}

		return 'tile';
	}

	/**
	 * Keep the extended layout state local to the current menu item. RadicalMart's
	 * native cookie remains global and only contains layouts understood by core.
	 */
	public static function modeCookie(): string
	{
		$app = Factory::getApplication();
		$input = $app->getInput();
		$itemId = $input->getInt('Itemid', 0);

		if ($itemId < 1 && method_exists($app, 'getMenu'))
		{
			$active = $app->getMenu()->getActive();
			$itemId = (int) ($active->id ?? 0);
		}

		$scope = $itemId > 0
			? (string) $itemId
			: 'route_' . substr(hash('sha256', Uri::getInstance()->getPath()), 0, 12);

		return self::MODE_COOKIE . '_' . $scope;
	}

	public static function layouts(): array
	{
		return self::LAYOUTS;
	}

	public static function normaliseLayout(string $layout): string
	{
		$layout = self::LAYOUT_ALIASES[$layout] ?? $layout;

		return in_array($layout, self::LAYOUTS, true) ? $layout : 'tile';
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
		$current = self::layout();

		// Before the explicit Tile/Compact split, radicalmart_grid was the only
		// grid mode. Treat it as the safe compact fallback so a persisted compact
		// choice cannot make an older Builder catalogue render no product tree.
		if ($mode === 'radicalmart_grid')
		{
			return in_array($current, ['tile', 'compact'], true);
		}

		$layout = self::MODE_LAYOUTS[$mode] ?? null;

		return $layout === null || $layout === $current;
	}
}
