<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;

$el = $this->el('div');
$placeholder = trim((string) ($props['placeholder'] ?? ''));
$placeholder = $placeholder !== '' ? $placeholder : Text::_('TPL_YOOTHEME_SEARCH');
$ariaLabel = trim((string) ($props['aria_label'] ?? ''));
$ariaLabel = $ariaLabel !== '' ? $ariaLabel : $placeholder;

// Form
$form = $this->el('form', [

	'role'  => 'search',
	'class' => [
		'rm-search__form',
		'uk-search',
		'uk-search-default {@!search_style}',
		'uk-search-{search_style}',
		'uk-width-1-1',
	],

]);

// Search
$search = $this->el('input', [

	'type'        => 'search',
	'placeholder' => $placeholder,
	'class'       => [
		'rm-search__input',
		'uk-search-input',
		'uk-form-{search_size} {@!search_style}',
	],
	'required'    => true,
	'aria-label'  => $ariaLabel,
	'autocomplete' => !array_key_exists('autocomplete', $props) || !empty($props['autocomplete']) ? 'on' : 'off',

]);

// Icon
$icon = !empty($props['search_icon']) ? $this->el(($props['search_icon'] ?? '') == 'right' ? 'button' : 'span', [

	'uk-search-icon' => true,

	'class' => [
		'rm-search__icon',
		'uk-search-icon-flip {@search_icon: right}',
	],

]) : null;

if ($icon && $icon->name === 'button')
{
	$icon->attr('type', 'submit');
}

$input = Factory::getApplication()->getInput();
$hasRadicalMartSearch = ComponentHelper::isEnabled('com_radicalmart_search');
$searchOption = $hasRadicalMartSearch ? 'com_radicalmart_search' : 'com_finder';
$searchView = $hasRadicalMartSearch ? 'search' : 'search';
$queryName = $hasRadicalMartSearch ? 'keyword' : 'q';
$form->attr([
	'action' => Route::_('index.php?option=' . $searchOption . '&view=' . $searchView),
	'method' => 'get',
]);

$search->attr([
	'name'  => $queryName,
	'value' => $input->getCmd('option') === $searchOption
		? $input->getString($queryName, '')
		: '',
]);

$hidden = '<input type="hidden" name="option" value="' . $searchOption . '">'
	. '<input type="hidden" name="view" value="' . $searchView . '">';


?>

<?= $el($props, $attrs) ?>

<?= $form($props) ?>

<?php if (($props['search_icon'] ?? '') == 'left') : ?>
	<?= $icon($props, '') ?>
<?php endif ?>

<?= $search($props) ?>
<?= $hidden ?>

<?php if (($props['search_icon'] ?? '') == 'right') : ?>
	<?= $icon($props, '') ?>
<?php endif ?>

<?= $form->end() ?>

<?= $el->end() ?>
