<?php

// Add elements inline css above the content to ensure css is present when rendered
if (!empty($props['css']))
{
	$css = preg_replace('/[\r\n\t\h]+/u', ' ', $props['css']);
	echo "<style class=\"uk-margin-remove-adjacent\">{$css}</style>";
}
$content = $builder->render($children);

$classes = [
	'el-item',
	'uk-panel [uk-{panel_style: tile-.*}] {@panel_style: |tile-.*}',
	'uk-card uk-{panel_style: card-.*} [uk-card-{!panel_padding: |default}]',
	'uk-tile-hover {@panel_style: tile-.*} {@panel_link}',
	'uk-card-hover {@!panel_style: |card-hover|tile-.*} {@panel_link}',
	'uk-padding[-{!panel_padding: default}] {@panel_style: |tile-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
	'uk-card-body {@panel_style: card-.*} {@panel_padding} {@!has_panel_image_no_padding} {@!has_no_padding}',
	'uk-flex {@panel_style} {@has_panel_image_no_padding} {@image_align: left|right}', // Let images cover the card/tile height if they have different heights,
];

if(!empty($props['class'])) {
	$classes[] = $props['class'];
}

$el = $this->el($props['html_element'] ?: 'div', [

	'class' => $classes,
]);

?>

<?php echo $el($props, $attrs); ?>
<?php echo $content; ?>
<?php echo $el->end(); ?>
