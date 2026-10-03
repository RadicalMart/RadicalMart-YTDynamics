<?php

echo htmlspecialchars(trim((string) ($props['title'] ?? '')) ?: 'Menu item', ENT_QUOTES, 'UTF-8');
