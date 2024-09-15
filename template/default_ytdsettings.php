<?php \defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

// Load assets
/** @var \Joomla\CMS\WebAsset\WebAssetManager $assets */
$assets = $this->document->getWebAssetManager();
$assets->useScript('com_radicalmart.site.settings')
	->useScript('keepalive');

if ($this->params->get('radicalmart_js', 1))
{
	$assets->useScript('com_radicalmart.site');
}

if ($this->params->get('trigger_js', 1))
{
	$assets->useScript('com_radicalmart.site.trigger');
}

foreach ($this->form->getFieldsets() as $key => $fieldset)
{
	foreach ($this->form->getFieldset($key) as $field)
	{
		$name  = $field->fieldname;
		$group = $field->group;
		$type  = strtolower($field->type);
		$class = $this->form->getFieldAttribute($name, 'class', '', $group);
		$input = $field->input;
		if ($type === 'text' || $type === 'email')
		{
			$class .= ' uk-input';
		}
        elseif ($type === 'list' || preg_match('#<select#', $input))
		{
			$class .= ' uk-select';
		}
        elseif ($type === 'textarea' || preg_match('#<textarea#', $input))
		{
			$class .= ' uk-textarea';
		}
        elseif ($type === 'range')
		{
			$class .= ' uk-range';
		}

		$this->form->setFieldAttribute($name, 'class', $class, $group);
	}
}
?>
<div id="RadicalMart" class="settings">

	<?php foreach ($this->form->getFieldsets() as $key => $fieldset):
		if (empty($this->form->getFieldset($key)))
		{
			continue;
		}
		?>
        <form id="settings_<?php echo $key; ?>" radicalmart-settings="container"
              class="uk-fieldset uk-margin-medium" onsubmit="return;">
            <legend class="uk-h4 uk-margin-small"><?php echo Text::_($fieldset->label); ?></legend>
            <div radicalmart-settings="error" class="uk-alert uk-alert-danger uk-margin-small-top"
                 style="display: none"></div>
            <div radicalmart-settings="success" class="uk-alert uk-alert-success uk-margin-small-top"
                 style="display: none"></div>
            <div>
				<?php echo str_replace('readonly', 'disabled readonly',
					$this->form->renderFieldset($key)); ?>
            </div>
            <div>
                <a onclick="RadicalMartSettingsUpdate_<?php echo $key; ?>(this)"
                   class="uk-button uk-button-primary">
					<?php echo Text::_('COM_RADICALMART_UPDATE'); ?>
                </a>
            </div>
        </form>
	<?php endforeach; ?>

</div>