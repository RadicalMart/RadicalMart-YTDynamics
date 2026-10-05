<?php

$label = trim((string) ($props['label'] ?? ''));
$name = trim((string) ($props['field_name'] ?? ''));

echo htmlspecialchars($label !== '' ? $label : ($name !== '' ? $name : 'Form field'), ENT_QUOTES, 'UTF-8');
