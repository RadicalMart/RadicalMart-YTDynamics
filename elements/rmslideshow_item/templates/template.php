<?php

$template = $template ?? 'slide';
$index = $index ?? 0;
$total = $total ?? 1;

if ($template === 'thumb')
{
	echo $this->render("{$__dir}/template-thumb", compact('props', 'index'));
}

if ($template === 'slide')
{
	echo $this->render("{$__dir}/template-slide", compact('props', 'attrs', 'index', 'total'));
}
