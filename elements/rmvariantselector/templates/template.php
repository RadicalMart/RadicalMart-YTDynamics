<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null;
$productId = (int) ($props['product_id'] ?? 0);
if (!$product && $productId < 1)
{
	$input = Factory::getApplication()->getInput();
	if ($input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product')
	{
		$productId = $input->getInt('id');
	}
}
if (!$product && $productId > 0)
{
	try
	{
		$product = ProductPresentation::get($productId);
	}
	catch (\Throwable)
	{
		$product = null;
	}
}
if (!$product)
{
	return;
}

$requestedFields = array_values(array_filter(array_map(
	static fn($alias): string => trim((string) $alias),
	(array) ($props['variant_fields'] ?? []),
)));
$variantFields = (array) ($product['variants']['fields'] ?? []);
if ($requestedFields)
{
	$variantFields = array_values(array_filter(
		$variantFields,
		static fn(array $field): bool => in_array($field['alias'], $requestedFields, true),
	));
}

if (!$variantFields || empty($product['variants']['products']))
{
	return;
}

$variantData = (array) $product['variants'];
$variantData['fields'] = $variantFields;
$selected = [];
foreach ($variantData['products'] as $variant)
{
	if ((int) $variant['id'] === (int) $product['id'])
	{
		$selected = $variant['fields'];
		break;
	}
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$endpoint = rtrim(Uri::root(), '/') . '/index.php?option=com_ajax&plugin=ytdynamics&group=system&format=json';
$controlStyle = ($props['style'] ?? 'buttons') === 'select' ? 'select' : 'buttons';
$buttonStyle = in_array(($props['button_style'] ?? 'default'), ['default', 'primary', 'secondary', 'text'], true)
	? ($props['button_style'] ?? 'default') : 'default';
$buttonSize = in_array(($props['button_size'] ?? 'custom'), ['default', 'small', 'large', 'custom'], true)
	? ($props['button_size'] ?? 'custom') : 'custom';
$imageFit = in_array(($props['image_fit'] ?? 'cover'), ['cover', 'contain'], true)
	? ($props['image_fit'] ?? 'cover') : 'cover';
$optionLayout = in_array(($props['option_layout'] ?? 'wrap'), ['wrap', 'equal', 'stack'], true)
	? ($props['option_layout'] ?? 'wrap') : 'wrap';
$optionGap = in_array(($props['option_gap'] ?? 'small'), ['small', 'medium', 'large'], true)
	? ($props['option_gap'] ?? 'small') : 'small';
$optionShape = in_array(($props['option_shape'] ?? 'default'), ['default', 'rounded', 'pill', 'circle'], true)
	? ($props['option_shape'] ?? 'default') : 'default';
$selectWidth = in_array(($props['select_width'] ?? 'medium'), ['small', 'medium', 'large', 'full'], true)
	? ($props['select_width'] ?? 'medium') : 'medium';
$optionMinWidth = max(32, min(240, (int) ($props['option_min_width'] ?? 48)));
$controlHeight = max(32, min(80, (int) ($props['control_height'] ?? 40)));
$swatchSize = max(16, min(72, (int) ($props['swatch_size'] ?? 34)));
$buttonSizeClass = '';
if ($buttonSize !== 'custom')
{
	[$optionMinWidth, $controlHeight, $swatchSize] = match ($buttonSize)
	{
		'small' => [40, 32, 24],
		'large' => [64, 54, 44],
		default => [48, 40, 34],
	};
	$buttonSizeClass = $buttonSize === 'default' ? '' : ' uk-button-' . $buttonSize;
}
$selectWidthClass = $selectWidth === 'full' ? 'uk-width-1-1' : 'uk-width-' . $selectWidth;
$urlMode = $props['update_url'] ?? 'none';
if ($urlMode === true || $urlMode === 1 || $urlMode === '1' || $urlMode === 'true')
{
	$input = Factory::getApplication()->getInput();
	$urlMode = $input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product'
		? 'replace'
		: 'none';
}
$urlMode = in_array($urlMode, ['none', 'replace', 'push'], true) ? $urlMode : 'none';

$el = $this->el('div', [
	'class' => ['rmvariants', 'uk-form-stacked', 'rmvariants--image-fit-' . $imageFit, 'rmvariants--layout-' . $optionLayout, 'rmvariants--gap-' . $optionGap, 'rmvariants--shape-' . $optionShape, 'rmvariants--size-' . $buttonSize],
	'style' => "--rm-variant-option-min-width: {$optionMinWidth}px; --rm-variant-control-height: {$controlHeight}px; --rm-variant-swatch-size: {$swatchSize}px;",
	'data-rm-variants' => true,
	'data-rm-variant-selector' => true,
	'data-endpoint' => $endpoint,
	'data-action' => ($props['action'] ?? 'ajax') === 'navigate' ? 'navigate' : 'ajax',
	'data-disable-unavailable' => !empty($props['disable_unavailable']) ? 'true' : 'false',
	'data-update-url' => $urlMode,
]);
$json = json_encode($variantData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
	| JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
?>
<?= $el($props, $attrs) ?>
<?php foreach ($variantFields as $field) :
	$selectedValue = (string) ($selected[$field['alias']] ?? '');
	$selectedLabel = $selectedValue;
	foreach ($field['options'] as $option)
	{
		if ((string) $option['value'] === $selectedValue)
		{
			$selectedLabel = (string) $option['label'];
			break;
		}
	}
	?>
	<fieldset class="rmvariants__field uk-fieldset" data-rm-field="<?= htmlspecialchars($field['alias'], ENT_QUOTES, 'UTF-8') ?>">
		<?php if (!empty($props['show_labels'])) : ?>
			<legend class="rmvariants__label uk-form-label">
				<span><?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?></span>
				<?php if (!empty($props['show_selected_value'])) : ?><span class="rmvariants__selected" data-rm-selected-label> · <?= htmlspecialchars($selectedLabel, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
			</legend>
		<?php endif; ?>
		<?php if ($controlStyle === 'select') : ?>
			<select class="rmvariants__select uk-select <?= $selectWidthClass ?>" aria-label="<?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?>">
				<?php foreach ($field['options'] as $option) : ?>
					<option value="<?= htmlspecialchars($option['value'], ENT_QUOTES, 'UTF-8') ?>"<?= $selectedValue === (string) $option['value'] ? ' selected' : '' ?>><?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?></option>
				<?php endforeach; ?>
			</select>
		<?php else : ?>
			<div class="rmvariants__options<?= $optionLayout === 'wrap' ? ' uk-flex uk-flex-wrap uk-flex-middle' : '' ?>" role="group" aria-label="<?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?>">
				<?php foreach ($field['options'] as $option) :
					$isSelected = $selectedValue === (string) $option['value'];
					$hasSwatch = $option['image'] !== '' || $option['color'] !== '';
					?>
					<button type="button" class="rmvariants__option uk-button uk-button-<?= $buttonStyle ?><?= $buttonSizeClass ?><?= $hasSwatch ? ' rmvariants__option--swatch' : '' ?>"
						data-rm-value="<?= htmlspecialchars($option['value'], ENT_QUOTES, 'UTF-8') ?>"
						aria-label="<?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?>"
						aria-pressed="<?= $isSelected ? 'true' : 'false' ?>" title="<?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?>">
						<?php if ($option['image'] !== '') : ?>
							<img src="<?= htmlspecialchars($option['image'], ENT_QUOTES, 'UTF-8') ?>" alt="" loading="lazy">
						<?php elseif ($option['color'] !== '') : ?>
							<span class="rmvariants__color" style="--rm-swatch: <?= htmlspecialchars($option['color'], ENT_QUOTES, 'UTF-8') ?>"></span>
						<?php else : ?><?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?><?php endif; ?>
					</button>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</fieldset>
<?php endforeach; ?>
<div class="rmvariants__status uk-text-small" aria-live="polite"></div>
<script type="application/json" class="rmvariants__data"><?= $json ?></script>
<span class="uk-hidden" data-rm-label-loading><?= Text::_('PLG_YTDYNAMICS_LOADING') ?></span>
<span class="uk-hidden" data-rm-label-unavailable><?= Text::_('PLG_YTDYNAMICS_VARIANT_UNAVAILABLE') ?></span>
<?= $el->end() ?>
