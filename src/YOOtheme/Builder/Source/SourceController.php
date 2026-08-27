<?php

namespace Joomla\Plugin\System\YTDynamics\YOOtheme\Builder\Source;

use Joomla\CMS\Factory;
use Joomla\CMS\User\User;
use Joomla\Database\ParameterType;
use Joomla\Utilities\ArrayHelper;
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
    public static function products(Request $request, Response $response, User $user): Response
    {
        $titles = [];
        $ids    = $request->getQueryParam('ids', []);
        if (!is_array($ids)) {
            $ids = [$ids];
        }
        $ids = array_values(array_filter(ArrayHelper::toInteger($ids)));

        if (!empty($ids)) {
            /** @var \Joomla\Database\DatabaseDriver $db */
            $db = Factory::getContainer()->get('DatabaseDriver');

            $products = $db->setQuery(
                $db
                    ->getQuery()
                    ->select($db->quoteName(['id', 'title', 'code']))
                    ->from($db->quoteName('#__radicalmart_products'))
                    ->whereIn($db->quoteName('id'), $ids, ParameterType::INTEGER)
                    ->where($db->quoteName('state') . ' = 1'),
            )->loadAssocList();

            foreach ($products as $product) {
                $titles[$product['id']] = $product['title'];

                if (!empty($product['code'])) {
                    $titles[$product['id']] .= ' [' . $product['code'] . ']';
                }
            }
        }

        return $response->withJson((object)$titles);
    }
}
