<?php

$template = $template ?? 'slide';
$index = $index ?? 0;

if ($template === 'thumb')
{
	echo $this->render("{$__dir}/template-thumb", compact('props', 'index'));
}

if ($template === 'slide')
{
	if (!empty($props['css']))
	{
		$css = preg_replace('/[\r\n\t\h]+/u', ' ', $props['css']);
		echo "<style class=\"uk-margin-remove-adjacent\">{$css}</style>";
	}

	echo $this->render("{$__dir}/template-slide", compact('props', 'attrs'));
}
