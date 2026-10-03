<?php

namespace YOOtheme;

use Joomla\CMS\Factory;
use Joomla\Plugin\System\YTDynamics\Service\ProductPresentation;

$product = ProductPresentation::resolve(
	isset($rmProduct) && is_array($rmProduct) ? $rmProduct : null,
	(int) ($props['product_id'] ?? 0)
);
if (!$product) return;
$assets = Factory::getApplication()->getDocument()->getWebAssetManager(); $assets->getRegistry()->addExtensionRegistryFile('plg_system_ytdynamics'); $assets->useStyle('plg_system_ytdynamics.product-interactions');
$badges = (array) ($product['badges'] ?? []);
$limit = max(0, (int) ($props['limit'] ?? 0));
if ($limit) $badges = array_slice($badges, 0, $limit);
$direction = ($props['direction'] ?? 'horizontal') === 'vertical' ? 'vertical' : 'horizontal';
$size = max(16, min(96, (int) ($props['size'] ?? 40)));
$style = in_array(($props['label_style'] ?? ''), ['', 'success', 'warning', 'danger'], true) ? ($props['label_style'] ?? '') : '';
$root = $this->el('div', [
	'class' => ['rm-product-badges rm-product-badges--' . $direction],
	'style' => '--rm-product-badge-size: ' . $size . 'px',
	'data-rm-product-badges' => true,
	'data-limit' => $limit,
	'data-show-icons' => !empty($props['show_icons']) ? 'true' : 'false',
	'data-show-titles' => !empty($props['show_titles']) ? 'true' : 'false',
	'data-link-badges' => !empty($props['link_badges']) ? 'true' : 'false',
	'data-label-style' => $style,
	'hidden' => !$badges,
]);
?>
<?= $root($props, $attrs) ?><div class="rm-product-badges__list" data-rm-product-badges-list>
<?php foreach ($badges as $badge) :
	$title = htmlspecialchars((string) ($badge['title'] ?? ''), ENT_QUOTES, 'UTF-8');
	$icon = htmlspecialchars((string) ($badge['icon'] ?? ''), ENT_QUOTES, 'UTF-8');
	$link = htmlspecialchars((string) ($badge['link'] ?? ''), ENT_QUOTES, 'UTF-8');
	$tag = !empty($props['link_badges']) && $link !== '' ? 'a' : 'span'; ?>
	<<?= $tag ?> class="rm-product-badges__item"<?= $tag === 'a' ? ' href="' . $link . '"' : '' ?>>
		<?php if ($icon !== '' && !empty($props['show_icons'])) : ?><img class="rm-product-badges__icon" src="<?= $icon ?>" alt="<?= $title ?>" loading="lazy"><?php if (!empty($props['show_titles'])) : ?><span class="rm-product-badges__label"><?= $title ?></span><?php endif; ?>
		<?php else : ?><span class="rm-product-badges__label uk-label<?= $style ? ' uk-label-' . $style : '' ?>"><?= $title ?></span><?php endif; ?>
	</<?= $tag ?>>
<?php endforeach; ?>
</div><?= $root->end() ?>
