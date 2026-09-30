<?php

namespace Joomla\Plugin\System\YTDynamics\Service;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\WebAsset\WebAssetAttachBehaviorInterface;
use Joomla\CMS\WebAsset\WebAssetItemInterface;
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

		$document = Factory::getApplication()->getDocument();
		$assets = $document->getWebAssetManager();
		$before = [
			'style' => array_keys($assets->getAssets('style')),
			'script' => array_keys($assets->getAssets('script')),
			'options' => $document->getScriptOptions(),
		];

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

		$scriptAssets = $assets->getAssets('script', true);
		$newScriptAssets = array_diff_key($scriptAssets, array_flip($before['script']));
		foreach ($newScriptAssets as $asset)
		{
			if ($asset instanceof WebAssetAttachBehaviorInterface)
			{
				$asset->onAttachCallback($document);
			}
		}

		return [
			'id'         => $productId,
			'templateId' => $templateId,
			'html'       => $html,
			'assets'     => [
				'style' => self::collectAssets($assets->getAssets('style', true), $before['style']),
				'script' => self::collectAssets($scriptAssets, $before['script']),
				'options' => self::collectScriptOptions($document->getScriptOptions(), $before['options']),
			],
		];
	}

	/**
	 * Return Joomla script options registered while the template was rendered.
	 * Existing page options are already available to the client and must not be
	 * repeated in every Quick View response.
	 */
	private static function collectScriptOptions(array $options, array $before): array
	{
		$result = [];
		foreach ($options as $key => $value)
		{
			if (!array_key_exists($key, $before) || $before[$key] !== $value)
			{
				$result[$key] = $value;
			}
		}

		return $result;
	}

	/**
	 * Return assets activated while the Builder template was rendered so the
	 * AJAX client can initialise arbitrary nested elements.
	 *
	 * @param array<string, WebAssetItemInterface> $assets
	 * @param string[] $before
	 */
	private static function collectAssets(array $assets, array $before): array
	{
		$result = [];
		foreach ($assets as $name => $asset)
		{
			if (in_array($name, $before, true))
			{
				continue;
			}

			$inline = (bool) $asset->getOption('inline');
			$uri = $inline ? '' : $asset->getUri(true);
			$content = $inline ? (string) $asset->getOption('content', '') : '';
			if ($uri === '' && $content === '')
			{
				continue;
			}

			$result[] = [
				'name' => (string) $name,
				'uri' => $uri,
				'content' => $content,
				'attributes' => $asset->getAttributes(),
			];
		}

		return $result;
	}
}
