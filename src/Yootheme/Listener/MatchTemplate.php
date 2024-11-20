<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Document\Document;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\Plugin\System\YTDynamics\Event\YTDynamicsMatchTemplateEvent;

class MatchTemplate
{
	public string $language;

	public function __construct(?Document $document)
	{
		$this->language = $document->language ?? 'en-gb';
	}

	public function handle($view, $tpl): ?array
	{
		if ($tpl)
		{
			return null;
		}

		$context = $view->get('context');
		$layout  = Factory::getApplication()->input->get('layout');

		if (!empty($layout))
		{
			$context .= '.' . $layout;
		}

		if ($context === 'com_radicalmart.product')
		{
			$item        = $view->get('item');
			$variability = $view->get('variability');

			return [
				'type'    => $context,
				'query'   => [
					'catid' => $item->category,
					'lang' => $this->language,
				],
				'params'  => [
					'item'        => $item,
					'variability' => $variability
				],
				'editUrl' => $item->params->get('access-edit')
					? Route::_(
						RouteHelper::getFormRoute($item->id) .
						'&return=' .
						base64_encode(Uri::getInstance()),
					)
					: null,
			];
		}

		if (
			$context === 'com_radicalmart.categories' ||
			$context === 'com_radicalmart.categories.alphabetical'
		)
		{
			$pagination = $view->get('pagination');

			return [
				'type'   => $context,
				'query'  => [
					'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
					'lang'  => $this->language,
				],
				'params' => [
					'items'      => $view->get('items'),
					'pagination' => $pagination,
				],
			];
		}

		if ($context === 'com_radicalmart.category')
		{
			$category   = $view->get('category');
			$pagination = $view->get('pagination');

			return [
				'type'   => $context,
				'query'  => [
					'catid' => $category->id,
					'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
					'lang'  => $this->language,
				],
				'params' => [
					'category'   => $category,
					'items'      => $view->get('items'),
					'pagination' => $pagination,
				],
			];
		}

		if ($context === 'com_radicalmart_search.search')
		{
			$pagination = $view->get('pagination');

			return [
				'type'   => $context,
				'query'  => [
					'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
					'lang'  => $this->language,
				],
				'params' => [
					'items'      => $view->get('items'),
					'pagination' => $pagination,
				],
			];
		}

		if ($context === 'com_users.profile')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				]
			];
		}

		if ($context === 'com_radicalmart.orders')
		{
			$pagination = $view->get('pagination');

			return [
				'type'   => $context,
				'query'  => [
					'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
					'lang'  => $this->language,
				],
				'params' => [
					'items'      => $view->get('items'),
					'pagination' => $pagination,
				],
			];
		}

		if ($context === 'com_radicalmart.order')
		{

			return [
				'type'   => $context,
				'query'  => [
					'lang' => $this->language,
				],
				'params' => [
					'item' => $view->get('order'),
				],
			];
		}

		if ($context === 'com_radicalmart.settings')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				],
			];
		}

		if ($context === 'com_radicalmart.personal')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				],
			];
		}

		if ($context === 'com_radicalmart_favorites.favorites')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				],
			];
		}


		if ($context === 'com_radicalmart_bonuses.points')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				],
			];
		}

		if ($context === 'com_radicalmart_bonuses.codes')
		{
			return [
				'type'  => $context,
				'query' => [
					'lang' => $this->language,
				],
			];
		}

		if ($context === 'com_radicalmart_landings.page')
		{
			$category   = $view->get('category');
			$page       = $view->get('page');
			$items      = $view->get('items');
			$pagination = $view->get('pagination');

			return [
				'type'   => $context,
				'query'  => [
					'catid' => $category->id,
					'pages' => $pagination->pagesCurrent === 1 ? 'first' : 'except_first',
					'lang'  => $this->language,
				],
				'params' => [
					'category'   => $category,
					'page'       => $page,
					'items'      => $items,
					'pagination' => $pagination,
				],
			];
		}

		$event = new YTDynamicsMatchTemplateEvent(
			'onRadicalMartYTDynamicsMatchTemplate',
			['match' => &$this, 'context' => $context, 'view' => &$view, 'tpl' => $tpl]
		);

		Factory::getApplication()->getDispatcher()->dispatch(
			'onRadicalMartYTDynamicsMatchTemplate',
			$event
		);

		$template = $event->getResult();

		if (is_array($template) && count($template) > 0)
		{
			return $template;
		}

		return null;
	}

}
