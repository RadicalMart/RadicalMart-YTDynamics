<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$productId = (int) ($props['product_id'] ?? 0);
if ($productId < 1)
{
	$input = Factory::getApplication()->getInput();
	if ($input->getCmd('option') === 'com_radicalmart' && $input->getCmd('view') === 'product')
	{
		$productId = $input->getInt('id');
	}
}

try
{
	$product = $productId > 0 ? ProductPresentation::get($productId) : null;
}
catch (\Throwable)
{
	$product = null;
}

if (empty($product['variants']['fields']))
{
	return;
}

$requestedFields = array_values(array_filter(array_map(
	static fn($alias): string => trim((string) $alias),
	(array) ($props['variant_fields'] ?? []),
)));
$variantFields = $product['variants']['fields'];
if ($requestedFields)
{
	$variantFields = array_values(array_filter(
		$variantFields,
		static fn(array $field): bool => in_array($field['alias'], $requestedFields, true),
	));
}
if (!$variantFields)
{
	return;
}
$variantData = $product['variants'];
$variantData['fields'] = $variantFields;

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$endpoint = rtrim(Uri::root(), '/') . '/index.php?option=com_ajax&plugin=ytdynamics&group=system&format=json';
$style = ($props['style'] ?? 'buttons') === 'select' ? 'select' : 'buttons';
$buttonStyle = in_array($props['button_style'] ?? '', ['default', 'primary', 'secondary', 'text'], true)
	? $props['button_style'] : 'default';
$displayMode = ($props['display_mode'] ?? 'default') === 'hover' ? 'hover' : 'default';
$hoverBreakpoint = in_array($props['hover_breakpoint'] ?? '', ['s', 'm', 'l'], true)
	? $props['hover_breakpoint'] : 'm';
$contentArea = ($props['content_area'] ?? 'panel') === 'card' ? 'card' : 'panel';
$content = trim($builder->render($children));
$selected = [];
foreach ($product['variants']['products'] as $variant)
{
	if ((int) $variant['id'] === (int) $product['id'])
	{
		$selected = $variant['fields'];
		break;
	}
}

$el = $this->el('div', [
	'class' => ['rmvariants-card'],
]);
$panel = $this->el('div', [
	'class' => [
		'rmvariants',
		'uk-form-stacked',
		'rmvariants--hover-panel' => $displayMode === 'hover',
	],
	'data-rm-variants' => true,
	'data-endpoint' => $endpoint,
	'data-action' => ($props['action'] ?? 'ajax') === 'navigate' ? 'navigate' : 'ajax',
	'data-display-mode' => $displayMode,
	'data-hover-breakpoint' => $hoverBreakpoint,
	'data-disable-unavailable' => !empty($props['disable_unavailable']) ? 'true' : 'false',
	'data-update-url' => !empty($props['update_url']) ? 'true' : 'false',
]);

$json = json_encode($variantData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
	| JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
?>
<?= $el($props, $attrs) ?>
<?php if ($content !== '' && $contentArea === 'card') : ?>
	<div class="rmvariants-card__content"><?= $content ?></div>
<?php endif; ?>
<?= $panel() ?>
<?php foreach ($variantFields as $field) : ?>
	<fieldset class="rmvariants__field uk-fieldset" data-rm-field="<?= htmlspecialchars($field['alias'], ENT_QUOTES, 'UTF-8') ?>">
		<?php if (!empty($props['show_labels'])) : ?>
			<legend class="rmvariants__label uk-form-label"><?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?></legend>
		<?php endif; ?>
		<?php if ($style === 'select') : ?>
			<select class="rmvariants__select uk-select" aria-label="<?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?>">
				<?php foreach ($field['options'] as $option) : ?>
					<option value="<?= htmlspecialchars($option['value'], ENT_QUOTES, 'UTF-8') ?>"
						<?= ($selected[$field['alias']] ?? '') === $option['value'] ? ' selected' : '' ?>>
						<?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?>
					</option>
				<?php endforeach; ?>
			</select>
		<?php else : ?>
			<div class="rmvariants__options uk-flex uk-flex-wrap uk-flex-middle" role="group" aria-label="<?= htmlspecialchars($field['title'], ENT_QUOTES, 'UTF-8') ?>">
				<?php foreach ($field['options'] as $option) :
					$isSelected = ($selected[$field['alias']] ?? '') === $option['value'];
					$hasSwatch = $option['image'] !== '' || $option['color'] !== '';
					?>
					<button type="button"
						class="rmvariants__option uk-button uk-button-<?= $buttonStyle ?><?= $hasSwatch ? ' rmvariants__option--swatch' : '' ?>"
						data-rm-value="<?= htmlspecialchars($option['value'], ENT_QUOTES, 'UTF-8') ?>"
						aria-pressed="<?= $isSelected ? 'true' : 'false' ?>"
						title="<?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?>">
						<?php if ($option['image'] !== '') : ?>
							<img src="<?= htmlspecialchars($option['image'], ENT_QUOTES, 'UTF-8') ?>" alt="" loading="lazy">
						<?php elseif ($option['color'] !== '') : ?>
							<span class="rmvariants__color" style="--rm-swatch: <?= htmlspecialchars($option['color'], ENT_QUOTES, 'UTF-8') ?>"></span>
						<?php else : ?>
							<?= htmlspecialchars($option['label'], ENT_QUOTES, 'UTF-8') ?>
						<?php endif; ?>
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
<?php if ($content !== '' && $contentArea === 'panel') : ?>
	<div class="rmvariants__actions uk-margin-top"><?= $content ?></div>
<?php endif; ?>
<?= $panel->end() ?>
<?= $el->end() ?>
