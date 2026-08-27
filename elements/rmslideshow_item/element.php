<?php

namespace YOOtheme;

return [
    'transforms' => [
        'render' => function ($node) {
            return !empty($node->props['image']);
        },
    ],
];
