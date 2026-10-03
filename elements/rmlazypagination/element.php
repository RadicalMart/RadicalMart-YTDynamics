<?php

namespace YOOtheme;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Pagination\PaginationObject;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ElementConfig;

$config = ElementConfig::fromJson(__DIR__);
$config['transforms']['render'] = static function ($node, $params): bool {
	if (!isset($params['pagination']))
	{
		return false;
	}

	$pagination = is_callable($params['pagination']) ? $params['pagination']() : $params['pagination'];
	if (!is_object($pagination) || (int) ($pagination->pagesTotal ?? 0) < 2)
	{
		return false;
	}

	$list = $pagination->getPaginationPages();
	if (empty($list['next']['active']) || empty($list['next']['data']->link))
	{
		return false;
	}

	$node->props['next_url'] = (string) $list['next']['data']->link;
	$node->props['page_current'] = (int) ($pagination->pagesCurrent ?? 1);
	$node->props['pages_total'] = (int) ($pagination->pagesTotal ?? 1);

	if (!empty($node->props['show_pages']))
	{
		$total = (int) $pagination->pagesTotal;
		$current = (int) $pagination->pagesCurrent;
		$endSize = 1;
		$midSize = 3;
		$dots = false;
		$pages = [];

		if ($list['previous']['active'])
		{
			$pages['previous'] = $list['previous']['data'];
		}

		$list['start']['data']->text = 1;
		$list['end']['data']->text = $total;

		for ($number = 1; $number <= $total; $number++)
		{
			$active = $number <= $endSize
				|| ($number >= $current - $midSize && $number <= $current + $midSize)
				|| $number > $total - $endSize;

			if (!$active && !$dots)
			{
				continue;
			}

			if ($active)
			{
				$page = $number === 1
					? $list['start']['data']
					: ($number === $total ? $list['end']['data'] : $list['pages'][$number]['data']);
				$page->active = $number === $current;
				$pages[$number] = $page;
			}
			else
			{
				$pages[$number] = new PaginationObject(Text::_('&hellip;'));
			}

			$dots = $active;
		}

		if ($list['next']['active'])
		{
			$pages['next'] = $list['next']['data'];
		}

		$node->props['pagination_pages'] = $pages;
	}

	return true;
};

return $config;
