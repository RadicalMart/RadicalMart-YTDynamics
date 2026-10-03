<?php \defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;
use Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Element\ProductListState;

$ordering = ProductListState::ordering();
$options = ProductListState::orderingOptions();
$width = in_array(($props['ordering_width'] ?? 'medium'), ['', 'small', 'medium', 'large', 'full'], true)
	? ($props['ordering_width'] ?? 'medium')
	: 'medium';

$assets = Factory::getApplication()->getDocument()->getWebAssetManager();
$assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics');
$assets->useStyle('plg_system_ytdynamics.toolbar');
$assets->useScript('plg_system_ytdynamics.toolbar');

$el = $this->el('div', [
	'class' => ['uk-panel rm-ordering'],
	'data-rm-ordering-element' => true,
	'data-ordering-cookie' => ProductListState::ORDERING_COOKIE,
	'data-cookie-path' => Uri::root(true) . '/',
]);

$label = Text::_('COM_RADICALMART_CATEGORY_ITEMS_ORDERING_ORDERING');
?>

<?= $el($props, $attrs) ?>
	<div class="rm-toolbar__ordering-control<?= $width === 'full' ? ' uk-width-1-1' : ($width ? ' uk-form-width-' . $width : '') ?>">
		<select class="rm-toolbar__select uk-select" aria-label="<?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>">
			<?php foreach ($options as $value => $text): ?>
			<option value="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>"<?= $value === $ordering ? ' selected' : '' ?>>
				<?= htmlspecialchars(Text::_($text), ENT_QUOTES, 'UTF-8') ?>
			</option>
			<?php endforeach; ?>
		</select>
		<button class="rm-toolbar__ordering-toggle" type="button" aria-expanded="false" aria-haspopup="listbox">
			<span class="rm-toolbar__ordering-value"><?= htmlspecialchars(Text::_($options[$ordering] ?? reset($options)), ENT_QUOTES, 'UTF-8') ?></span>
		</button>
		<div class="rm-toolbar__ordering-menu" role="listbox" aria-label="<?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>">
			<?php foreach ($options as $value => $text):
				$active = $value === $ordering;
			?>
			<button type="button" role="option" class="rm-toolbar__ordering-option<?= $active ? ' is-active' : '' ?>"
			        data-rm-ordering="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>"
			        aria-selected="<?= $active ? 'true' : 'false' ?>">
				<?= htmlspecialchars(Text::_($text), ENT_QUOTES, 'UTF-8') ?>
			</button>
			<?php endforeach; ?>
		</div>
	</div>
<?= $el->end() ?>
