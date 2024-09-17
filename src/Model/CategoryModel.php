<?php namespace Joomla\Plugin\System\YTDynamics\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\Form\Form;
use Joomla\CMS\User\CurrentUserInterface;
use Joomla\Component\RadicalMart\Administrator\Model\CategoryModel as BaseModel;
use Joomla\Utilities\ArrayHelper;

class CategoryModel extends BaseModel
{

	/**
	 * @var string
	 * @since version
	 */
	protected $option = 'com_radicalmart';

	/**
	 * Method to get a form object.
	 *
	 * @param   string   $name     The name of the form.
	 * @param   string   $source   The form source. Can be XML string if file flag is set to false.
	 * @param   array    $options  Optional array of options for the form creation.
	 * @param   boolean  $clear    Optional argument to force load a new form.
	 * @param   string   $xpath    An optional xpath to search for the fields.
	 *
	 * @return  Form
	 *
	 * @throws  \Exception
	 * @since   4.0.0
	 * @see     Form
	 */
	protected function loadForm($name, $source = null, $options = [], $clear = false, $xpath = null)
	{
		// Handle the optional arguments.
		$options['control'] = ArrayHelper::getValue((array) $options, 'control', false);

		// Create a signature hash. But make sure, that loading the data does not create a new instance
		$sigoptions = $options;

		if (isset($sigoptions['load_data']))
		{
			unset($sigoptions['load_data']);
		}

		$hash = md5($source . serialize($sigoptions));

		// Check if we can use a previously loaded form.
		if (!$clear && isset($this->_forms[$hash]))
		{
			return $this->_forms[$hash];
		}

		$file_xml = file_get_contents(JPATH_ADMINISTRATOR . '/components/com_radicalmart/forms/category.xml');
		$form     = new Form($name, $options);
		$form->load($file_xml);

		if ($form instanceof CurrentUserInterface && method_exists($this, 'getCurrentUser'))
		{
			$form->setCurrentUser($this->getCurrentUser());
		}

		if (isset($options['load_data']) && $options['load_data'])
		{
			// Get the data for the form.
			$data = $this->loadFormData();
		}
		else
		{
			$data = [];
		}

		// Allow for additional modification of the form, and events to be triggered.
		// We pass the data because plugins may require it.
		$this->preprocessForm($form, $data);

		// Load the data into the form after the plugins have operated.
		$form->bind($data);

		// Store the form for later.
		$this->_forms[$hash] = $form;

		return $form;
	}

}