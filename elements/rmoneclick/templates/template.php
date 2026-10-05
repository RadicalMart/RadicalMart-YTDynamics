<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null;
$productId = (int) ($props['product_id'] ?? 0);

try
{
	$product = ProductPresentation::resolve($product, $productId);
}
catch (\Throwable)
{
	$product = null;
}

if (!$product)
{
	return;
}

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useScript('plg_system_ytdynamics.product-interactions');
$assets->useStyle('plg_system_ytdynamics.product-interactions');

$toBoolean = static fn($value, bool $fallback = false): bool => $value === null
	? $fallback
	: filter_var($value, FILTER_VALIDATE_BOOLEAN);
$safeName = static function (string $value, string $fallback = ''): string {
	$value = preg_replace('/[^A-Za-z0-9_.-]+/', '_', trim($value)) ?? '';
	$value = trim($value, '_.-');

	return $value !== '' ? $value : $fallback;
};
$hidden = static function (string $name, string $value, string $source = ''): string {
	$attributes = $source !== ''
		? ' data-rm-oneclick-source="' . htmlspecialchars($source, ENT_QUOTES, 'UTF-8') . '"'
		: '';

	return sprintf(
		'<input type="hidden" name="%s" value="%s"%s>',
		htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
		htmlspecialchars($value, ENT_QUOTES, 'UTF-8'),
		$attributes,
	);
};

$counterKey = '__ytdynamics_rmoneclick_instance';
$instance = (int) ($GLOBALS[$counterKey] ?? 0) + 1;
$GLOBALS[$counterKey] = $instance;
$configuredFormId = $safeName((string) ($props['form_id'] ?? ''));
$seed = implode('-', [
	(string) ($attrs['data-id'] ?? $props['id'] ?? 'oneclick'),
	(string) ($product['id'] ?? 0),
	(string) $instance,
]);
$formId = $configuredFormId !== ''
	? $configuredFormId
	: 'rm-oneclick-' . substr(hash('sha256', $seed), 0, 12);

$target = trim((string) ($props['radicalform_target'] ?? 'oneclick'));
$subject = trim((string) ($props['subject'] ?? ''));
$rfCall = preg_replace('/[^0-9]/', '', (string) ($props['rf_call'] ?? '')) ?? '';
$prefix = $safeName((string) ($props['product_field_prefix'] ?? 'product_'), 'product_');
if (!str_ends_with($prefix, '_'))
{
	$prefix .= '_';
}

$formLayout = ($props['form_layout'] ?? 'stacked') === 'horizontal' ? 'horizontal' : 'stacked';
$gridGap = in_array(($props['grid_gap'] ?? 'small'), ['none', 'small', 'default', 'large'], true)
	? (string) ($props['grid_gap'] ?? 'small') : 'small';
$gapClass = match ($gridGap)
{
	'none' => 'uk-grid-collapse',
	'small' => 'uk-grid-small',
	'large' => 'uk-grid-large',
	default => '',
};
$buttonStyle = in_array(($props['button_style'] ?? 'primary'), ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? (string) ($props['button_style'] ?? 'primary') : 'primary';
$buttonSize = in_array(($props['button_size'] ?? ''), ['', 'small', 'large'], true)
	? (string) ($props['button_size'] ?? '') : '';
$buttonAlign = in_array(($props['button_align'] ?? 'left'), ['left', 'center', 'right'], true)
	? (string) ($props['button_align'] ?? 'left') : 'left';
$buttonIconAlign = ($props['button_icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$buttonLabel = trim((string) ($props['button_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_ONE_CLICK_SUBMIT');
$buttonIcon = trim((string) ($props['button_icon'] ?? ''));
$displayMode = ($props['display_mode'] ?? 'inline') === 'modal' ? 'modal' : 'inline';
$triggerDisplay = ($props['trigger_display'] ?? 'button') === 'icon' ? 'icon' : 'button';
$modalTitle = trim((string) ($props['modal_title'] ?? '')) ?: $buttonLabel;
$modalSize = in_array(($props['modal_size'] ?? 'xlarge'), ['small', 'default', 'large', 'xlarge'], true)
	? (string) ($props['modal_size'] ?? 'xlarge') : 'xlarge';
$modalLayout = ($props['modal_layout'] ?? 'split') === 'form' ? 'form' : 'split';
$submitLabel = trim((string) ($props['submit_label'] ?? '')) ?: Text::_('PLG_YTDYNAMICS_ONE_CLICK_SUBMIT');
$submitStyle = in_array(($props['submit_style'] ?? 'primary'), ['default', 'primary', 'secondary', 'danger', 'text', 'link'], true)
	? (string) ($props['submit_style'] ?? 'primary') : 'primary';
$submitSize = in_array(($props['submit_size'] ?? ''), ['', 'small', 'large'], true)
	? (string) ($props['submit_size'] ?? '') : '';
$submitIcon = trim((string) ($props['submit_icon'] ?? ''));
$submitIconAlign = ($props['submit_icon_align'] ?? 'left') === 'right' ? 'right' : 'left';
$disableOutOfStock = $toBoolean($props['disable_out_of_stock'] ?? null, true);
$buttonDisabled = $disableOutOfStock && empty($product['inStock']);
$modalId = $formId . '-modal';
$modalTitleId = $modalId . '-title';
$modalWidths = [
	'small' => 'width: min(480px, calc(100vw - 30px));',
	'large' => 'width: min(900px, calc(100vw - 30px));',
	'xlarge' => 'width: min(1280px, calc(100vw - 30px));',
];
$summaryMedia = (array) (($product['media'] ?? [])[0] ?? []);
$summaryImage = trim((string) ($summaryMedia['src'] ?? ''));
$summaryTitle = trim((string) ($product['title'] ?? ''));
$summaryPrice = trim((string) ($product['price']['final'] ?? ''));
$summaryUnit = trim((string) ($product['quantity']['unitShort'] ?? $product['quantity']['units'] ?? ''));
$summaryBonus = trim((string) ($product['bonus']['text'] ?? ''));
$summaryInStock = !empty($product['inStock']);
$summaryShowImage = !array_key_exists('summary_show_image', $props) || !empty($props['summary_show_image']);
$summaryShowPrice = !array_key_exists('summary_show_price', $props) || !empty($props['summary_show_price']);
$summaryShowBonus = !empty($props['summary_show_bonus']);
$summaryShowStock = !empty($props['summary_show_stock']);
$summaryHeightMode = ($props['summary_image_height_mode'] ?? 'fixed') === 'fill' ? 'fill' : 'fixed';
$summaryFit = ($props['summary_image_fit'] ?? 'contain') === 'cover' ? 'cover' : 'contain';
$summaryPositions = ['center', 'top', 'bottom', 'left', 'right'];
$summaryPosition = in_array(($props['summary_image_position'] ?? 'center'), $summaryPositions, true)
	? (string) ($props['summary_image_position'] ?? 'center') : 'center';
$summaryBlendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'difference', 'luminosity'];
$summaryBlend = in_array(($props['summary_mix_blend_mode'] ?? 'normal'), $summaryBlendModes, true)
	? (string) ($props['summary_mix_blend_mode'] ?? 'normal') : 'normal';
$summaryStyle = implode(';', [
	'--rm-oneclick-summary-width:' . max(25, min(60, (int) ($props['summary_column_width'] ?? 40))) . '%',
	'--rm-oneclick-image-height:' . max(160, min(720, (int) ($props['summary_image_height'] ?? 460))) . 'px',
	'--rm-oneclick-image-fit:' . $summaryFit,
	'--rm-oneclick-image-position:' . $summaryPosition,
	'--rm-oneclick-image-background:' . (($props['summary_image_background'] ?? '') ?: 'var(--ytdynamics-muted-background)'),
	'--rm-oneclick-image-blend:' . $summaryBlend,
]);
$buttonContent = static function (string $label, string $icon, string $align, bool $iconOnly = false): string {
	$labelMarkup = $iconOnly ? '' : htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
	if ($icon === '')
	{
		return $labelMarkup;
	}

	$margin = $iconOnly || $label === '' ? '' : ($align === 'right' ? ' class="uk-margin-small-left"' : ' class="uk-margin-small-right"');
	$iconMarkup = '<span uk-icon="icon: ' . htmlspecialchars($icon, ENT_QUOTES, 'UTF-8') . '"' . $margin . ' aria-hidden="true"></span>';

	return $align === 'right' ? $labelMarkup . $iconMarkup : $iconMarkup . $labelMarkup;
};

$root = $this->el('div', [
	'class' => ['rm-oneclick-order'],
	'data-rm-oneclick-order' => true,
	'data-disable-out-of-stock' => $disableOutOfStock ? 'true' : 'false',
	'data-rm-oneclick-product-id' => (int) ($product['id'] ?? 0),
	'data-rm-oneclick-product-name' => $summaryTitle,
]);
$form = $this->el('form', [
	'id' => $formId,
	'class' => [
		'rf-form',
		'rm-oneclick-order__form',
		'uk-form-' . $formLayout,
	],
	'autocomplete' => !array_key_exists('autocomplete', $props) || !empty($props['autocomplete']) ? 'on' : 'off',
]);
$submitButton = $this->el('button', [
	'type' => 'button',
	'class' => [
		'rf-button-send',
		'rm-oneclick-order__button',
		'uk-button uk-button-' . ($displayMode === 'modal' ? $submitStyle : $buttonStyle),
		'uk-button-' . ($displayMode === 'modal' ? $submitSize : $buttonSize) => ($displayMode === 'modal' ? $submitSize : $buttonSize) !== '',
		'uk-width-1-1' => $displayMode === 'modal' ? !empty($props['submit_fullwidth']) : !empty($props['button_fullwidth']),
	],
	'data-rf-call' => $rfCall !== '' ? $rfCall : null,
	'disabled' => $buttonDisabled,
	'aria-disabled' => $buttonDisabled ? 'true' : null,
]);
$trigger = $this->el('button', [
	'type' => 'button',
	'class' => [
		'rm-oneclick-order__trigger',
		'uk-icon-button' => $triggerDisplay === 'icon',
		'uk-button uk-button-' . $buttonStyle => $triggerDisplay === 'button',
		'uk-button-' . $buttonSize => $triggerDisplay === 'button' && $buttonSize !== '',
		'uk-width-1-1' => $triggerDisplay === 'button' && !empty($props['button_fullwidth']),
	],
	'uk-toggle' => 'target: #' . $modalId,
	'data-rm-oneclick-trigger' => true,
	'aria-controls' => $modalId,
	'aria-haspopup' => 'dialog',
	'aria-label' => $buttonLabel,
	'disabled' => $buttonDisabled,
	'aria-disabled' => $buttonDisabled ? 'true' : null,
]);
$modal = $this->el('div', [
	'id' => $modalId,
	'class' => ['rm-oneclick-order__modal', 'uk-flex-top' => !empty($props['modal_center'])],
	'uk-modal' => sprintf(
		'bg-close: %s; esc-close: %s; stack: false; container: false; role: dialog',
		!array_key_exists('modal_bg_close', $props) || !empty($props['modal_bg_close']) ? 'true' : 'false',
		!array_key_exists('modal_esc_close', $props) || !empty($props['modal_esc_close']) ? 'true' : 'false',
	),
	'aria-labelledby' => $modalTitleId,
]);
$dialog = $this->el('div', [
	'class' => [
		'rm-oneclick-order__dialog uk-modal-dialog',
		'rm-oneclick-order__dialog--split' => $modalLayout === 'split',
		'uk-margin-auto-vertical' => !empty($props['modal_center']),
	],
	'style' => trim(($modalWidths[$modalSize] ?? '') . $summaryStyle),
]);

$automaticFields = [];
if ($toBoolean($props['send_product_id'] ?? null, true))
{
	$automaticFields[] = $hidden($prefix . 'id', (string) ($product['id'] ?? ''), 'product_id');
}
if ($toBoolean($props['send_product_name'] ?? null, true))
{
	$automaticFields[] = $hidden($prefix . 'name', (string) ($product['title'] ?? ''), 'product_title');
}
if ($toBoolean($props['send_product_code'] ?? null, true))
{
	$automaticFields[] = $hidden($prefix . 'code', (string) ($product['code'] ?? ''), 'product_code');
}
if ($toBoolean($props['send_product_url'] ?? null, true))
{
	$automaticFields[] = $hidden($prefix . 'url', (string) ($product['link'] ?? ''), 'product_url');
}
if ($toBoolean($props['send_product_price'] ?? null, true))
{
	$automaticFields[] = $hidden($prefix . 'price', (string) ($product['price']['final'] ?? ''), 'product_price');
}
$resolvedSubject = strtr($subject, [
	'{product_id}' => (string) ($product['id'] ?? ''),
	'{product_name}' => $summaryTitle,
	'{product_code}' => (string) ($product['code'] ?? ''),
	'{product_url}' => (string) ($product['link'] ?? ''),
	'{product_price}' => $summaryPrice,
]);

ob_start();
?>
	<?= $form() ?>
		<?= $hidden('rfTarget', $target) ?>
		<?php if ($subject !== '') : ?><input type="hidden" name="rfSubject" value="<?= htmlspecialchars($resolvedSubject, ENT_QUOTES, 'UTF-8') ?>" data-rm-oneclick-subject-template="<?= htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') ?>"><?php endif; ?>
		<?= implode("\n\t\t", $automaticFields) ?>
		<?php if (!empty($children)) : ?>
		<div class="rm-oneclick-order__fields <?= $gapClass ?>" uk-grid>
			<?php foreach ($children as $index => $child) : ?>
				<?= $builder->render($child, [
					'element' => $props,
					'product' => $product,
					'formId' => $formId,
					'index' => $index,
				]) ?>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
		<div class="rm-oneclick-order__action uk-flex uk-flex-<?= $buttonAlign ?> uk-margin-small-top">
			<?= $submitButton() ?>
			<?= $buttonContent(
				$displayMode === 'modal' ? $submitLabel : $buttonLabel,
				$displayMode === 'modal' ? $submitIcon : $buttonIcon,
				$displayMode === 'modal' ? $submitIconAlign : $buttonIconAlign,
			) ?>
			<?= $submitButton->end() ?>
		</div>
	<?= $form->end() ?>
<?php
$formMarkup = (string) ob_get_clean();
?>
<?= $root($props, $attrs) ?>
	<?php if ($displayMode === 'modal') : ?>
		<div class="rm-oneclick-order__trigger-wrap uk-flex uk-flex-<?= $buttonAlign ?>">
			<?= $trigger() ?><?= $buttonContent($buttonLabel, $buttonIcon, $buttonIconAlign, $triggerDisplay === 'icon') ?><?= $trigger->end() ?>
		</div>
		<?= $modal() ?>
			<?= $dialog() ?>
				<button class="uk-modal-close-default" type="button" uk-close aria-label="<?= htmlspecialchars(Text::_('JLIB_HTML_BEHAVIOR_CLOSE'), ENT_QUOTES, 'UTF-8') ?>"></button>
				<?php if ($modalLayout === 'split') : ?>
				<div class="rm-oneclick-order__layout">
					<aside class="rm-oneclick-order__summary">
						<?php if ($summaryShowImage) : ?>
						<div class="rm-oneclick-order__summary-media rm-oneclick-order__summary-media--<?= $summaryHeightMode ?>" data-rm-oneclick-summary-media<?= $summaryImage === '' ? ' hidden' : '' ?>>
							<img class="rm-oneclick-order__summary-image" data-rm-oneclick-summary-image src="<?= htmlspecialchars($summaryImage, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($summaryTitle, ENT_QUOTES, 'UTF-8') ?>">
						</div>
						<?php endif; ?>
						<div class="rm-oneclick-order__summary-details">
							<h3 class="rm-oneclick-order__summary-title uk-h4" data-rm-oneclick-summary-title><?= htmlspecialchars($summaryTitle, ENT_QUOTES, 'UTF-8') ?></h3>
							<?php if ($summaryShowPrice) : ?><div class="rm-oneclick-order__summary-price"><strong data-rm-oneclick-summary-price><?= htmlspecialchars($summaryPrice, ENT_QUOTES, 'UTF-8') ?></strong><span data-rm-oneclick-summary-unit<?= $summaryUnit === '' ? ' hidden' : '' ?>>/<?= htmlspecialchars($summaryUnit, ENT_QUOTES, 'UTF-8') ?></span></div><?php endif; ?>
							<?php if ($summaryShowBonus) : ?><div class="rm-oneclick-order__summary-bonus uk-text-success" data-rm-oneclick-summary-bonus-wrap<?= $summaryBonus === '' ? ' hidden' : '' ?>><span uk-icon="icon: bolt" aria-hidden="true"></span><span data-rm-oneclick-summary-bonus><?= htmlspecialchars($summaryBonus, ENT_QUOTES, 'UTF-8') ?></span></div><?php endif; ?>
							<?php if ($summaryShowStock) : ?><div class="rm-oneclick-order__summary-stock <?= $summaryInStock ? 'uk-text-success' : 'uk-text-muted' ?>" data-rm-oneclick-summary-stock data-label-in="В наличии" data-label-out="Нет в наличии"><span data-rm-oneclick-summary-stock-in uk-icon="icon: check" aria-hidden="true"<?= $summaryInStock ? '' : ' hidden' ?>></span><span data-rm-oneclick-summary-stock-out uk-icon="icon: ban" aria-hidden="true"<?= $summaryInStock ? ' hidden' : '' ?>></span><span data-rm-oneclick-summary-stock-label><?= $summaryInStock ? 'В наличии' : 'Нет в наличии' ?></span></div><?php endif; ?>
						</div>
					</aside>
					<section class="rm-oneclick-order__content">
						<header class="rm-oneclick-order__header"><h2 id="<?= htmlspecialchars($modalTitleId, ENT_QUOTES, 'UTF-8') ?>" class="uk-modal-title"><?= htmlspecialchars($modalTitle, ENT_QUOTES, 'UTF-8') ?></h2></header>
						<div class="rm-oneclick-order__body"><?= $formMarkup ?></div>
					</section>
				</div>
				<?php else : ?>
				<div class="uk-modal-header"><h2 id="<?= htmlspecialchars($modalTitleId, ENT_QUOTES, 'UTF-8') ?>" class="uk-modal-title"><?= htmlspecialchars($modalTitle, ENT_QUOTES, 'UTF-8') ?></h2></div>
				<div class="uk-modal-body"><?= $formMarkup ?></div>
				<?php endif; ?>
			<?= $dialog->end() ?>
		<?= $modal->end() ?>
	<?php else : ?>
		<?= $formMarkup ?>
	<?php endif; ?>
<?= $root->end() ?>
