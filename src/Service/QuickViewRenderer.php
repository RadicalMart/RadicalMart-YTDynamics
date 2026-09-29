<?php

namespace Joomla\Plugin\System\YTDynamics\Service;

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use YOOtheme\Application;
use YOOtheme\Builder;
use YOOtheme\Builder\Templates\TemplateHelper;

final class QuickViewRenderer
{
	public static function render(int $productId, string $templateId): array
	{
		$templateId = trim($templateId);
		if ($templateId === '')
		{
			throw new \InvalidArgumentException(Text::_('PLG_YTDYNAMICS_ERROR_QUICK_VIEW_TEMPLATE'), 400);
		}

		$application = Application::getInstance();
		/** @var TemplateHelper $templateHelper */
		$templateHelper = $application(TemplateHelper::class);
		$template = $templateHelper->templates[$templateId] ?? null;

		if (
			!is_array($template)
			|| ($template['type'] ?? '') !== 'com_radicalmart.product'
			|| ($template['status'] ?? '') === 'disabled'
		)
		{
			throw new \RuntimeException(Text::_('PLG_YTDYNAMICS_ERROR_QUICK_VIEW_TEMPLATE'), 404);
		}

		$product = ProductPresentation::load($productId);
		/** @var Builder $builder */
		$builder = $application(Builder::class);
		$html = $builder->render(
			json_encode($template['layout'] ?? [], JSON_THROW_ON_ERROR),
			[
				'item'        => $product,
				'variability' => $product->variability ?? false,
				'prefix'      => "quickview-{$templateId}-{$productId}",
				'template'    => 'com_radicalmart.product',
			],
		);

		if (trim((string) $html) === '')
		{
			throw new \RuntimeException(Text::_('PLG_YTDYNAMICS_ERROR_QUICK_VIEW_TEMPLATE'), 500);
		}

		return [
			'id'         => $productId,
			'templateId' => $templateId,
			'html'       => $html,
		];
	}
}
