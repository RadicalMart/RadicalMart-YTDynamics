<?php

namespace YOOtheme;

$el = $this->el('div', ['class' => ['rm-product-card__main']]);
$content = trim($builder->render($children, isset($rmProduct) ? ['rmProduct' => $rmProduct] : []));
?>
<?= $el($props, $attrs) ?>
<?= $content ?>
<?= $el->end() ?>
