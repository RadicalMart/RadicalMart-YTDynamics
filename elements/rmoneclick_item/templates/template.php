<?php

namespace YOOtheme;

$product = isset($product) && is_array($product) ? $product : [];
$element = isset($element) && is_array($element) ? $element : [];
$index = max(0, (int) ($index ?? 0));
$formId = trim((string) ($formId ?? 'rm-oneclick'));
$allowedTypes = ['text', 'tel', 'email', 'number', 'textarea', 'select', 'checkbox', 'hidden'];
$type = in_array(($props['field_type'] ?? 'text'), $allowedTypes, true)
	? (string) ($props['field_type'] ?? 'text') : 'text';
$allowedSources = ['custom', 'product_id', 'product_title', 'product_code', 'product_url', 'product_price', 'product_quantity'];
$source = in_array(($props['value_source'] ?? 'custom'), $allowedSources, true)
	? (string) ($props['value_source'] ?? 'custom') : 'custom';
$reservedNames = ['option', 'plugin', 'group', 'format', 'module', 'template', 'method', 'rfjsaction', 'rfjschallenge', 'rfjsproof', 'rfjspermit'];
$name = preg_replace('/[^A-Za-z0-9_.\[\]-]+/', '_', trim((string) ($props['field_name'] ?? 'field'))) ?? 'field';
$name = trim($name, '_.-');
$name = $name !== '' ? $name : 'field_' . ($index + 1);
if (in_array(strtolower(str_replace('[]', '', $name)), $reservedNames, true))
{
	$name = 'field_' . $name;
}
$conditionField = preg_replace('/[^A-Za-z0-9_.\[\]-]+/', '_', trim((string) ($props['show_when_field'] ?? ''))) ?? '';
$conditionField = trim($conditionField, '_.-');
$conditionValue = trim((string) ($props['show_when_value'] ?? ''));
$conditional = $conditionField !== '' && $conditionValue !== '';

$productValue = static function (string $valueSource, array $item): string {
	return match ($valueSource)
	{
		'product_id' => (string) ($item['id'] ?? ''),
		'product_title' => (string) ($item['title'] ?? ''),
		'product_code' => (string) ($item['code'] ?? ''),
		'product_url' => (string) ($item['link'] ?? ''),
		'product_price' => (string) ($item['price']['final'] ?? ''),
		'product_quantity' => (string) ($item['quantity']['min'] ?? 1),
		default => '',
	};
};
$value = $source === 'custom'
	? (string) ($props['value'] ?? '')
	: $productValue($source, $product);
$label = trim((string) ($props['label'] ?? ''));
$labelLink = trim((string) ($props['label_link'] ?? ''));
if ($labelLink !== '' && preg_match('/^(?:javascript|data|vbscript):/i', $labelLink))
{
	$labelLink = '';
}
$labelLinkText = trim((string) ($props['label_link_text'] ?? ''));
$labelLinkTarget = !empty($props['label_link_target']);
$renderLabel = static function (string $text, string $link, string $linkedText, bool $newTab): string {
	if ($link === '' || $text === '')
	{
		return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
	}

	$linkedText = $linkedText !== '' ? $linkedText : $text;
	$position = function_exists('mb_strpos') ? mb_strpos($text, $linkedText) : strpos($text, $linkedText);
	if ($position === false)
	{
		$linkedText = $text;
		$position = 0;
	}
	$length = function_exists('mb_strlen') ? mb_strlen($linkedText) : strlen($linkedText);
	$before = function_exists('mb_substr') ? mb_substr($text, 0, $position) : substr($text, 0, $position);
	$after = function_exists('mb_substr') ? mb_substr($text, $position + $length) : substr($text, $position + $length);
	$target = $newTab ? ' target="_blank" rel="noopener noreferrer"' : '';

	return htmlspecialchars($before, ENT_QUOTES, 'UTF-8')
		. '<a href="' . htmlspecialchars($link, ENT_QUOTES, 'UTF-8') . '"' . $target . '>'
		. htmlspecialchars($linkedText, ENT_QUOTES, 'UTF-8') . '</a>'
		. htmlspecialchars($after, ENT_QUOTES, 'UTF-8');
};
$labelMarkup = $renderLabel($label, $labelLink, $labelLinkText, $labelLinkTarget);
$placeholder = (string) ($props['placeholder'] ?? '');
$required = !empty($props['required']) && $type !== 'hidden';
$activeRequired = $required && !$conditional;
$parentShowLabels = !array_key_exists('show_labels', $element) || !empty($element['show_labels']);
$itemShowLabel = !array_key_exists('show_label', $props) || !empty($props['show_label']);
$showLabel = $parentShowLabels && $itemShowLabel;
$showLabel = $showLabel && $type !== 'hidden' && $type !== 'checkbox';
$errorText = trim((string) ($props['error_text'] ?? ''));
$fieldId = preg_replace('/[^A-Za-z0-9_.:-]+/', '-', $formId . '-field-' . ($index + 1)) ?: 'rm-oneclick-field-' . ($index + 1);
$errorId = $fieldId . '-error';
$layout = ($element['form_layout'] ?? 'stacked') === 'horizontal' ? 'horizontal' : 'stacked';
$width = in_array(($props['width'] ?? 'full'), ['full', 'half', 'third', 'two-thirds', 'auto'], true)
	? (string) ($props['width'] ?? 'full') : 'full';
$widthClass = match ($width)
{
	'half' => 'uk-width-1-2@s',
	'third' => 'uk-width-1-3@s',
	'two-thirds' => 'uk-width-2-3@s',
	'auto' => 'uk-width-auto@s',
	default => 'uk-width-1-1',
};
$autocomplete = in_array(($props['autocomplete'] ?? ''), ['', 'name', 'given-name', 'family-name', 'tel', 'email', 'organization', 'street-address', 'postal-code', 'off'], true)
	? (string) ($props['autocomplete'] ?? '') : '';
$readonly = $source !== 'custom' && $source !== 'product_quantity' && $type !== 'hidden';
$quantity = (array) ($product['quantity'] ?? []);
$min = $source === 'product_quantity' ? (string) ($quantity['min'] ?? 1) : trim((string) ($props['min'] ?? ''));
$max = $source === 'product_quantity' ? (string) ($quantity['max'] ?? '') : trim((string) ($props['max'] ?? ''));
$step = $source === 'product_quantity' ? (string) ($quantity['step'] ?? 1) : trim((string) ($props['step'] ?? ''));
$rows = max(2, min(12, (int) ($props['rows'] ?? 3)));
$controlSize = in_array(($element['form_control_size'] ?? ''), ['', 'small', 'large'], true)
	? (string) ($element['form_control_size'] ?? '') : '';
$inputClass = $type === 'select' ? 'uk-select' : ($type === 'textarea' ? 'uk-textarea' : ($type === 'checkbox' ? 'uk-checkbox' : 'uk-input'));
$inputClass .= $controlSize !== '' && !in_array($type, ['checkbox', 'hidden'], true) ? ' uk-form-' . $controlSize : '';
$inputClass .= $activeRequired ? ' required' : '';
$description = $errorText !== '' ? ' aria-describedby="' . htmlspecialchars($errorId, ENT_QUOTES, 'UTF-8') . '"' : '';
$common = ' id="' . htmlspecialchars($fieldId, ENT_QUOTES, 'UTF-8') . '"'
	. ' name="' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '"'
	. ' class="' . htmlspecialchars($inputClass, ENT_QUOTES, 'UTF-8') . '"'
	. ($placeholder !== '' && $type !== 'checkbox' && $type !== 'hidden' ? ' placeholder="' . htmlspecialchars($placeholder, ENT_QUOTES, 'UTF-8') . '"' : '')
	. ($activeRequired ? ' required' : '')
	. ($required ? ' data-rm-oneclick-required="true"' : '')
	. ($conditional ? ' disabled' : '')
	. ($readonly ? ' readonly' : '')
	. ($autocomplete !== '' ? ' autocomplete="' . htmlspecialchars($autocomplete, ENT_QUOTES, 'UTF-8') . '"' : '')
	. ($source !== 'custom' ? ' data-rm-oneclick-source="' . htmlspecialchars($source, ENT_QUOTES, 'UTF-8') . '"' : '')
	. $description;

$root = $this->el('div', [
	'class' => [
		'el-item',
		'rm-oneclick-order__field',
		'rm-oneclick-order__field--' . $type,
		$widthClass => $type !== 'hidden',
	],
	'hidden' => $type === 'hidden' || $conditional,
	'data-rm-oneclick-condition-field' => $conditional ? $conditionField : null,
	'data-rm-oneclick-condition-value' => $conditional ? $conditionValue : null,
	'aria-hidden' => $conditional ? 'true' : null,
]);
?>
<?= $root($props, $attrs) ?>
	<?php if ($showLabel) : ?><label class="uk-form-label" for="<?= htmlspecialchars($fieldId, ENT_QUOTES, 'UTF-8') ?>"><?= $labelMarkup ?><?php if ($required) : ?> <span class="rm-oneclick-order__required" aria-hidden="true">*</span><?php endif; ?></label><?php endif; ?>
	<?php if ($layout === 'horizontal' && $type !== 'hidden') : ?><div class="uk-form-controls"><?php endif; ?>
	<?php if ($type === 'textarea') : ?>
		<textarea<?= $common ?> rows="<?= $rows ?>"><?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?></textarea>
	<?php elseif ($type === 'select') :
		$options = preg_split('/\R/u', (string) ($props['options'] ?? '')) ?: [];
		?>
		<select<?= $common ?>>
			<?php if ($placeholder !== '') : ?><option value=""<?= $value === '' ? ' selected' : '' ?> disabled><?= htmlspecialchars($placeholder, ENT_QUOTES, 'UTF-8') ?></option><?php endif; ?>
			<?php foreach ($options as $option) :
				$option = trim($option);
				if ($option === '') continue;
				[$optionValue, $optionLabel, $optionState] = array_pad(array_map('trim', explode('|', $option, 3)), 3, null);
				$optionLabel = $optionLabel !== null && $optionLabel !== '' ? $optionLabel : $optionValue;
				?>
				<option value="<?= htmlspecialchars($optionValue, ENT_QUOTES, 'UTF-8') ?>"<?= $value === $optionValue ? ' selected' : '' ?><?= strtolower((string) $optionState) === 'disabled' ? ' disabled' : '' ?>><?= htmlspecialchars($optionLabel, ENT_QUOTES, 'UTF-8') ?></option>
			<?php endforeach; ?>
		</select>
	<?php elseif ($type === 'checkbox') : ?>
		<input type="checkbox"<?= $common ?> value="<?= htmlspecialchars($value !== '' ? $value : '1', ENT_QUOTES, 'UTF-8') ?>"<?= !empty($props['checked']) ? ' checked' : '' ?>>
		<label for="<?= htmlspecialchars($fieldId, ENT_QUOTES, 'UTF-8') ?>" class="uk-margin-small-left"><?= $labelMarkup ?></label>
	<?php else : ?>
		<input type="<?= htmlspecialchars($type, ENT_QUOTES, 'UTF-8') ?>"<?= $common ?> value="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>"<?= $type === 'number' && $min !== '' ? ' min="' . htmlspecialchars($min, ENT_QUOTES, 'UTF-8') . '"' : '' ?><?= $type === 'number' && $max !== '' ? ' max="' . htmlspecialchars($max, ENT_QUOTES, 'UTF-8') . '"' : '' ?><?= $type === 'number' && $step !== '' ? ' step="' . htmlspecialchars($step, ENT_QUOTES, 'UTF-8') . '"' : '' ?><?= in_array($type, ['text', 'tel'], true) && trim((string) ($props['pattern'] ?? '')) !== '' ? ' pattern="' . htmlspecialchars(trim((string) $props['pattern']), ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
	<?php endif; ?>
	<?php if ($errorText !== '' && $type !== 'hidden') : ?><div id="<?= htmlspecialchars($errorId, ENT_QUOTES, 'UTF-8') ?>" class="rf-field-error uk-text-small uk-text-danger" aria-live="polite"><?= htmlspecialchars($errorText, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?>
	<?php if ($layout === 'horizontal' && $type !== 'hidden') : ?></div><?php endif; ?>
<?= $root->end() ?>
