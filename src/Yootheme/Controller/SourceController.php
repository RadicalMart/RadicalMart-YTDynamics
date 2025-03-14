<?php

namespace Joomla\Plugin\System\YTDynamics\Yootheme\Controller;

use Joomla\CMS\Factory;
use Joomla\CMS\User\User;
use Joomla\Registry\Registry;
use YOOtheme\Database;
use YOOtheme\Http\Request;
use YOOtheme\Http\Response;

class SourceController
{
	/**
	 * @param   Request   $request
	 * @param   Response  $response
	 * @param   User      $user
	 *
	 * @return Response
	 * @throws \Exception
	 *
	 */
	public static function products(Request $request, Response $response, User $user)
	{
		$titles = [];
		$ids    = implode(',', array_map('intval', (array) $request->getQueryParam('ids')));

		if (!empty($ids))
		{
			$db    = Factory::getContainer()->get('DatabaseDriver');
			$query = "SELECT id, title, code
                FROM #__radicalmart_products
                WHERE id IN ({$ids})";
			$db->setQuery($query);

			foreach ($db->loadAssocList() as $product)
			{
				$title               = $product['title'] . ($product['code'] ?? ' [' . $product['code'] . ']');
				$titles[$product['id']] = $title;
			}
		}

		return $response->withJson((object) $titles);
	}
}
