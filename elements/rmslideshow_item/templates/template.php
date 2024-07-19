<?php

$root_dir = $__dir;

if($template === 'thumb')
{
	echo $this->render("{$__dir}/template-thumb", compact('props'));
}

if($template === 'slide')
{
	echo $this->render("{$__dir}/template-slide", compact('props'));
}
