<?php namespace Joomla\Plugin\System\YTDynamics\Yootheme\Listener;

use Joomla\CMS\Document\Document;

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

		$layout  = $view->getLayout();
		$context = $view->get('context');

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
					'items'      => array_merge($view->get('items')),
					'pagination' => $pagination,
				],
			];
		}

		return null;
	}
}
