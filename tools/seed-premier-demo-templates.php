<?php

declare(strict_types=1);

/**
 * Installs one shared RadicalMart catalogue template and one shared product
 * template for the local Premier reference catalogue. Legacy category-specific
 * RadicalMart templates are replaced so every category uses the same layout.
 */
final class PremierDemoTemplateSeeder
{
	private PDO $db;
	private int $filterModuleId;
	private int $filterMobileModuleId;

	public function __construct()
	{
		$this->db = new PDO(
			'mysql:host=' . (getenv('JOOMLA_DB_HOST') ?: 'db') . ';dbname=' . (getenv('JOOMLA_DB_NAME') ?: 'database') . ';charset=utf8mb4',
			getenv('JOOMLA_DB_USER') ?: 'joomla',
			getenv('JOOMLA_DB_PASSWORD') ?: '',
			[
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES => false,
			]
		);

		$this->filterModuleId = $this->ensureFilterModule('Фильтр Premier', true);
		$this->filterMobileModuleId = $this->ensureFilterModule('Фильтр Premier — мобильный', false);
	}

	public function run(): void
	{
		$catalogueCategoryId = 5;
		if (!(int) $this->value('SELECT id FROM joom_radicalmart_categories WHERE id = ?', [$catalogueCategoryId]))
		{
			throw new RuntimeException('RadicalMart catalogue category #5 is missing.');
		}

		$categoryIds = array_map('intval', $this->column(
			"SELECT id FROM joom_radicalmart_categories WHERE alias LIKE 'food-premier-%' ORDER BY id"
		));
		if (!$categoryIds)
		{
			throw new RuntimeException('Premier demo categories are missing. Run seed-premier-demo-products.php first.');
		}
		$backupPath = $this->backupCurrentState();

		$this->db->beginTransaction();
		try
		{
			$catalogueMenuId = $this->consolidateSiteMenu($catalogueCategoryId);
			$customData = json_decode((string) $this->value(
				"SELECT custom_data FROM joom_extensions WHERE element = 'yootheme' AND folder = 'system'"
			), true, 512, JSON_THROW_ON_ERROR);
			$templates = (array) ($customData['templates'] ?? []);
			$templates = array_filter(
				$templates,
				static fn($template): bool => !is_array($template) || !in_array(
					(string) ($template['type'] ?? ''),
					['com_radicalmart.category', 'com_radicalmart.product'],
					true
				)
			);

			$premierTemplates = [
				'PREMIERCATALOG' => [
					'type' => 'com_radicalmart.category',
					'name' => 'Каталог — единый динамический шаблон',
					'query' => [
						// An empty assignment is YOOtheme's wildcard: the same
						// dynamic layout is used for every current and future category.
						'catid' => [],
						'include_child_categories' => '',
						'pages' => '',
						'product_list_view' => '',
					],
					'layout' => $this->catalogueLayout(),
				],
				'PREMIERPRODUCT' => [
					'type' => 'com_radicalmart.product',
					'name' => 'Товар — единый динамический шаблон',
					'query' => ['catid' => []],
					'layout' => $this->productLayout(),
				],
			];

			$customData['templates'] = $premierTemplates + $templates;
			$this->query(
				"UPDATE joom_extensions SET custom_data = ? WHERE element = 'yootheme' AND folder = 'system'",
				[$this->json($customData)]
			);
			$this->db->commit();
		}
		catch (Throwable $error)
		{
			$this->db->rollBack();
			throw $error;
		}

		echo $this->json([
			'status' => 'ok',
			'templates' => ['PREMIERCATALOG', 'PREMIERPRODUCT'],
			'catalogue_menu_id' => $catalogueMenuId,
			'catalogue_category_id' => $catalogueCategoryId,
			'child_categories' => $categoryIds,
			'backup' => $backupPath,
		]) . PHP_EOL;
	}

	private function backupCurrentState(): string
	{
		$customData = json_decode((string) $this->value(
			"SELECT custom_data FROM joom_extensions WHERE element = 'yootheme' AND folder = 'system'"
		), true, 512, JSON_THROW_ON_ERROR);
		$backup = [
			'created_at' => gmdate(DATE_ATOM),
			'menu' => $this->query(
				'SELECT * FROM joom_menu WHERE client_id = 0 ORDER BY lft, id'
			)->fetchAll(),
			'templates' => (array) ($customData['templates'] ?? []),
		];
		$directory = (getenv('JOOMLA_ROOT') ?: '/var/www/html') . '/tmp';
		if (!is_dir($directory) && !mkdir($directory, 0775, true) && !is_dir($directory))
		{
			throw new RuntimeException('Unable to create the backup directory: ' . $directory);
		}
		$path = $directory . '/menu-template-backup-' . gmdate('Ymd-His') . '.json';
		if (file_put_contents($path, $this->json($backup)) === false)
		{
			throw new RuntimeException('Unable to write the menu/template backup: ' . $path);
		}

		return $path;
	}

	private function consolidateSiteMenu(int $catalogueCategoryId): int
	{
		$catalogueMenuId = (int) ($this->value(
			"SELECT id FROM joom_menu
			 WHERE client_id = 0
			   AND (alias = 'food-market' OR link = ?)
			 ORDER BY alias = 'food-market' DESC, id ASC
			 LIMIT 1",
			['index.php?option=com_radicalmart&view=category&id=' . $catalogueCategoryId]
		) ?: 0);
		if ($catalogueMenuId < 1)
		{
			throw new RuntimeException('The public RadicalMart catalogue menu item is missing.');
		}

		$removeIds = array_map('intval', $this->column(
			'SELECT id FROM joom_menu WHERE client_id = 0 AND id NOT IN (1, ?)',
			[$catalogueMenuId]
		));
		if ($removeIds)
		{
			$marks = implode(',', array_fill(0, count($removeIds), '?'));
			$this->query("DELETE FROM joom_modules_menu WHERE menuid IN ({$marks})", $removeIds);
			$this->query("DELETE FROM joom_menu WHERE id IN ({$marks})", $removeIds);
		}

		$this->query(
			"UPDATE joom_menu
			 SET title = 'Каталог', published = 1, home = 1, parent_id = 1, level = 1,
			     menutype = 'mainmenu', language = '*'
			 WHERE id = ?",
			[$catalogueMenuId]
		);

		return $catalogueMenuId;
	}

	private function catalogueLayout(): array
	{
		$card = [
			'type' => 'rmgrid_item',
			'props' => [
				'name' => 'Товар Premier',
				'panel_style' => '',
				'source' => ['query' => ['name' => 'radicalMartProducts']],
			],
			'children' => [[
				'type' => 'rmproductcard',
				'props' => [
					'panel_style' => 'card-default',
					'panel_padding' => 'small',
					'panel_hover' => true,
					'height_mode' => 'fill',
				],
				'children' => [
					[
						'type' => 'rmproductcard_main',
						'props' => [
							'layout' => 'column',
							'height_mode' => 'fill',
							'vertical_align' => 'top',
							'items_gap' => 'none',
						],
						'children' => [
						[
							'type' => 'rmproducthovergallery',
							'props' => [
								'link_product' => true,
								'max_images' => 0,
								'image_loading' => 'lazy',
								'image_fit' => 'contain',
								'image_ratio' => '1/1',
								'image_resize_width' => 800,
								'image_padding' => 'small',
								'image_border' => 'rounded',
								'image_box_shadow' => '',
								'background_color' => '#f7f7fb',
								'mix_blend_mode' => 'normal',
								'transition' => 'fade',
								'indicator_style' => 'bars',
								'reset_on_leave' => true,
							],
						],
						[
							'type' => 'rmproductcard_position',
							'props' => [
								'position' => 'top-left',
								'span' => 'cell',
								'direction' => 'column',
								'gap' => 'small',
								'inset' => 'default',
								'z_index' => 12,
								'visibility_mode' => 'always',
								'position_breakpoint' => 'm',
								'fallback_display' => 'hidden',
							],
							'children' => [[
								'type' => 'rmproductbadges',
								'props' => ['show_icons' => false, 'show_titles' => true, 'limit' => 3, 'direction' => 'vertical'],
								]],
						],
						[
							'type' => 'rmproductcard_position',
							'props' => [
								'position' => 'top-right',
								'span' => 'cell',
								'direction' => 'column',
								'gap' => 'small',
								'inset' => 'default',
								'z_index' => 13,
								'visibility_mode' => 'always',
								'position_breakpoint' => 'm',
								'fallback_display' => 'hidden',
							],
							'children' => [
								['type' => 'rmproductaction', 'props' => ['action' => 'favorite', 'favorite_label' => 'В избранное', 'favorite_icon' => 'heart', 'button_style' => 'default', 'icon_only' => true]],
								['type' => 'rmproductaction', 'props' => ['action' => 'compare', 'compare_label' => 'Сравнить', 'compare_icon' => 'copy', 'button_style' => 'default', 'icon_only' => true]],
							],
						],
						[
							'type' => 'rmproductcard_position',
							'props' => [
								'position' => 'center',
								'span' => 'row',
								'direction' => 'row',
								'gap' => 'small',
								'inset' => 'default',
								'z_index' => 14,
								'visibility_mode' => 'interaction',
								'animation' => 'slide-up',
								'position_breakpoint' => 'm',
								'fallback_display' => 'hidden',
							],
							'children' => [[
								'type' => 'rmquickview',
								'props' => [
									'label' => 'Быстрый просмотр',
									'button_style' => 'secondary',
									'button_size' => 'large',
									'modal_size' => 'container',
									'fullwidth' => false,
								],
							]],
						],
						['type' => 'rmproductprice', 'props' => ['name' => 'Цена', 'show_unit' => true, 'unit_style' => 'short', 'unit_separator' => '/', 'show_base_price' => true, 'show_discount' => true, 'discount_mode' => 'percent', 'discount_style' => 'danger', 'show_savings' => false, 'layout' => 'wrap', 'gap' => 'small', 'final_style' => 'large', 'final_weight' => 'bold', 'final_color' => 'emphasis', 'base_color' => 'muted', 'margin_top' => 'small']],
						['type' => 'rmproductbonus', 'props' => ['name' => 'Бонус', 'label' => '', 'icon' => 'bolt', 'show_empty' => true, 'text_style' => 'small', 'text_weight' => 'bold', 'text_color' => 'success', 'margin_top' => 'small']],
						['type' => 'rmproductfield', 'props' => ['name' => 'Название', 'field' => 'title', 'title_element' => 'h2', 'title_style' => 'h4', 'max_lines' => 2, 'min_lines' => 2, 'min_lines_breakpoint' => 's', 'link_product' => true, 'margin_top' => 'small']],
						['type' => 'rmproductrating', 'props' => ['show_value' => false, 'show_count' => true, 'show_empty' => true, 'size' => 16, 'margin_top' => 'small']],
						['type' => 'rmproductstock', 'props' => ['show_quantity' => false, 'show_progress' => false, 'in_stock_label' => 'В наличии', 'out_of_stock_label' => 'Нет в наличии', 'text_style' => 'small', 'margin_top' => 'small']],
						['type' => 'rmbuy', 'props' => ['label' => 'В корзину', 'icon' => 'cart', 'button_style' => 'primary', 'button_size' => '', 'show_count' => false, 'fullwidth' => true, 'margin_top' => 'auto']],
						],
					],
					[
						'type' => 'rmproductcard_dropdown',
						'props' => [
							'display_mode' => 'hover',
							'hover_breakpoint' => 'm',
							'fallback_display' => 'hidden',
							'panel_style' => 'default',
							'panel_padding' => 'small',
							'show_divider' => true,
							'max_height' => 520,
						],
						'children' => [
							[
								'type' => 'rmvariantselector',
								'props' => [
									'variant_fields' => [],
									'action' => 'ajax',
									'style' => 'buttons',
									'show_labels' => true,
									'show_selected_value' => true,
									'disable_unavailable' => true,
									'update_url' => 'none',
									'button_style' => 'default',
									'button_size' => 'custom',
									'image_fit' => 'contain',
									'option_layout' => 'wrap',
									'option_gap' => 'small',
									'option_min_width' => 48,
									'control_height' => 38,
									'swatch_size' => 30,
									'option_shape' => 'rounded',
								],
							],
							[
								'type' => 'rmproductspecifications',
								'props' => [
									'layout' => 'description-list',
									'show_fieldset_titles' => false,
									'show_variant_fields' => false,
									'selected_fields' => [],
									'field_limit' => 5,
									'divider' => true,
									'margin_top' => 'default',
								],
							],
						],
					],
				],
			],
		]];

		$headerRow = [
			'type' => 'row',
			'props' => [],
			'children' => [[
				'type' => 'column',
				'props' => ['width_medium' => '1-1'],
				'children' => [
					['type' => 'text', 'props' => ['content' => 'АСПРО: ПРЕМЬЕР · ДЕМО-КАТАЛОГ', 'text_style' => 'meta']],
					['type' => 'headline', 'props' => ['content' => 'Еда и напитки', 'title_element' => 'h1', 'title_style' => 'heading-small', 'margin_top' => 'small']],
				],
			]],
		];

		$catalogMenu = [
			'type' => 'rmcatalogmenu',
			'props' => [
				'source_mode' => 'categories',
				'root_category' => 5,
				'title' => 'Каталог',
				'show_root_link' => true,
				'show_item_count' => false,
				'max_depth' => 0,
				'panel_min_height' => 560,
				'highlight_current' => true,
				'open_current_branch' => false,
			],
		];

		$desktopControlColumns = [[
			'type' => 'column',
			'props' => ['width' => 'auto'],
			'children' => [[
				'type' => 'rmoffcanvas',
				'props' => ['label' => 'Каталог', 'icon' => 'grid', 'button_style' => 'default', 'mode' => 'slide', 'side' => 'left', 'panel_width' => 'large', 'panel_padding' => 'small', 'overlay' => true, 'show_close' => true],
				'children' => [$catalogMenu],
			]],
		]];
		if ($this->filterModuleId > 0)
		{
			$desktopControlColumns[] = [
				'type' => 'column',
				'props' => ['width' => 'expand'],
				'children' => [[
					'type' => 'rmfilter',
					'props' => [
						'module' => (string) $this->filterModuleId,
						'presentation' => 'dropdown',
						'dropdown_width' => 320,
						'dropdown_max_height' => 420,
						'auto_submit' => true,
						'auto_submit_delay' => 450,
						'close_on_change' => false,
						'show_submit' => false,
						'show_active_count' => true,
					],
				]],
			];
		}

		$mobileControls = [[
			'type' => 'rmoffcanvas',
			'props' => ['label' => 'Каталог', 'icon' => 'grid', 'button_style' => 'default', 'fullwidth' => true, 'mode' => 'slide', 'side' => 'left', 'panel_width' => 'large', 'panel_padding' => 'small', 'overlay' => true, 'show_close' => true],
			'children' => [$catalogMenu],
		]];
		if ($this->filterMobileModuleId > 0)
		{
			$mobileControls[] = [
				'type' => 'rmoffcanvas',
				'props' => ['label' => 'Фильтры', 'icon' => 'settings', 'button_style' => 'secondary', 'fullwidth' => true, 'mode' => 'slide', 'side' => 'left', 'panel_width' => 'large', 'panel_padding' => 'small', 'overlay' => true, 'show_close' => true],
				'children' => [
					['type' => 'headline', 'props' => ['content' => 'Фильтр', 'title_element' => 'h2', 'title_style' => 'h3']],
					['type' => 'rmfilter', 'props' => [
						'module' => (string) $this->filterMobileModuleId,
						'presentation' => 'accordion',
						'auto_submit' => false,
						'show_submit' => true,
						'show_active_count' => true,
						'mobile_initial_open' => 'first',
					]],
				],
			];
		}

		$controlsRow = [
			'type' => 'row',
			'props' => ['column_gap' => 'small', 'row_gap' => 'small', 'margin_top' => 'large'],
			'children' => [
				['type' => 'column', 'props' => ['width_medium' => '2-3', 'class' => 'uk-visible@m'], 'children' => [[
					'type' => 'row',
					'props' => ['column_gap' => 'small', 'row_gap' => 'small', 'vertical_align' => 'top'],
					'children' => $desktopControlColumns,
				]]],
				['type' => 'column', 'props' => ['width_medium' => '1-3', 'class' => 'uk-visible@m'], 'children' => [[
					'type' => 'row',
					'props' => ['column_gap' => 'small', 'row_gap' => 'small', 'vertical_align' => 'middle'],
					'children' => [
						['type' => 'column', 'props' => ['width' => 'expand'], 'children' => [[
							'type' => 'rmordering',
							'props' => ['ordering_width' => 'full'],
						]]],
						['type' => 'column', 'props' => ['width' => 'auto'], 'children' => [[
							'type' => 'rmlayoutswitcher',
							'props' => ['show_grid_button' => true, 'show_compact_button' => true, 'show_list_button' => true, 'show_table_button' => false, 'switcher_style' => 'icon', 'switcher_breakpoint' => ''],
						]]],
					],
				]]],
				['type' => 'column', 'props' => ['width_medium' => '1-1', 'class' => 'uk-hidden@m'], 'children' => [[
					'type' => 'row',
					'props' => ['column_gap' => 'small', 'row_gap' => 'small'],
					'children' => array_map(static fn(array $control): array => [
						'type' => 'column',
						'props' => ['width' => '1-2'],
						'children' => [$control],
					], $mobileControls),
				]]],
			],
		];
		$catalogueRow = [
			'type' => 'row',
			'props' => ['column_gap' => 'medium', 'row_gap' => 'medium', 'margin_top' => 'medium'],
			'children' => [[
				'type' => 'column', 'props' => ['width_medium' => '1-1'], 'children' => [
					['type' => 'rmgrid', 'props' => [
						'mode' => 'default',
						'dynamic_height_mode' => 'row',
						'grid_column_gap' => 'medium',
						'grid_row_gap' => 'medium',
						'grid_default' => '2',
						'grid_small' => '2',
						'grid_medium' => '2',
						'grid_large' => '3',
						'grid_xlarge' => '3',
						'margin_top' => 'medium',
					], 'children' => [$card]],
					['type' => 'rmlazypagination', 'props' => ['button_label' => 'Загрузить ещё', 'loading_label' => 'Загрузка…', 'complete_label' => 'Все товары загружены', 'auto_after_click' => true, 'show_pages' => true, 'update_url' => false, 'preload_distance' => 500, 'button_style' => 'default', 'button_size' => 'large', 'margin_top' => 'large']],
					...$this->floatingNavigationExamples(),
				]],
			],
		];

		return [
			'type' => 'layout',
			'children' => [[
				'type' => 'section',
				'props' => ['style' => 'default', 'padding' => 'default', 'width' => 'default'],
				'children' => [$headerRow, $controlsRow, $catalogueRow],
			]],
			'version' => '5.0.44',
		];
	}

	private function productLayout(): array
	{
		return [
			'type' => 'layout',
			'children' => [[
				'type' => 'section',
				'props' => ['style' => 'default', 'padding' => 'default', 'width' => 'default'],
				'children' => [[
					'type' => 'rmproduct',
					'props' => ['update_document_title' => true],
					'source' => ['query' => ['name' => 'radicalMartProduct']],
					'children' => [
						['type' => 'row', 'props' => ['column_gap' => 'large', 'row_gap' => 'large', 'vertical_align' => 'top'], 'children' => [
							['type' => 'column', 'props' => ['width_medium' => '3-5'], 'children' => [[
								'type' => 'rmproductgallery',
								'props' => [
									'columns_s' => 2,
									'columns_m' => 2,
									'columns_l' => 2,
									'columns_xl' => 2,
									'column_gap' => 4,
									'row_gap' => 4,
									'initial_items' => 4,
									'show_more' => true,
									'show_more_label' => 'Показать ещё фото',
									'collapse_after_expand' => false,
									'button_style' => 'default',
									'button_size' => 'large',
									'image_ratio' => '3/4',
									'image_fit' => 'cover',
									'image_loading' => 'eager',
									'background_color' => '#f7f7fb',
									'mix_blend_mode' => 'normal',
									'border' => 'rounded',
									'mobile_layout' => 'scroll',
									'mobile_item_width' => 78,
									'mobile_column_gap' => 4,
									'mobile_row_gap' => 4,
									'mobile_scrollbar' => false,
									'lightbox' => true,
									'lightbox_controls' => true,
									'lightbox_counter' => true,
									'lightbox_caption' => true,
									'sync_product_media' => true,
								],
								'children' => [[
									'type' => 'rmproductgallery_item',
									'props' => [
										'name' => 'Медиа товара',
									],
									'source' => [
										'query' => ['name' => '#parent', 'field' => ['name' => 'media']],
										'props' => [
											'image' => ['name' => 'src'],
											'image_alt' => ['name' => 'alt'],
										],
									],
								]],
							]]],
							['type' => 'column', 'props' => ['width_medium' => '2-5'], 'children' => [
								['type' => 'rmproductbadges', 'props' => ['show_icons' => false, 'show_titles' => true, 'direction' => 'horizontal']],
								['type' => 'rmproductfield', 'props' => ['name' => 'Название', 'field' => 'title', 'title_element' => 'h1', 'title_style' => 'h1', 'link_product' => false, 'margin_top' => 'small']],
								['type' => 'rmproductrating', 'props' => ['show_value' => true, 'show_count' => true, 'show_empty' => true, 'size' => 18, 'margin_top' => 'small']],
								['type' => 'rmproductfield', 'props' => ['name' => 'Код товара', 'field' => 'code', 'text_style' => 'meta', 'margin_top' => 'small']],
								['type' => 'rmproductprice', 'props' => ['name' => 'Цена', 'show_unit' => true, 'unit_style' => 'long', 'unit_separator' => '/', 'show_base_price' => true, 'show_discount' => true, 'discount_mode' => 'percent', 'discount_style' => 'danger', 'show_savings' => false, 'layout' => 'wrap', 'gap' => 'small', 'final_style' => 'large', 'final_weight' => 'bold', 'final_color' => 'emphasis', 'base_color' => 'muted', 'margin_top' => 'default']],
								['type' => 'rmproductbonus', 'props' => ['label' => '', 'icon' => 'bolt', 'show_empty' => true, 'text_style' => 'lead', 'text_weight' => 'bold', 'text_color' => 'success', 'margin_top' => 'small']],
								['type' => 'rmproductstock', 'props' => ['show_quantity' => true, 'show_progress' => true, 'progress_threshold' => 30, 'in_stock_label' => 'В наличии', 'out_of_stock_label' => 'Нет в наличии', 'margin_top' => 'default']],
								['type' => 'rmproductfield', 'props' => ['field' => 'description', 'text_style' => 'lead', 'margin_top' => 'default']],
								['type' => 'rmbuy', 'props' => ['show_count' => true, 'label' => 'В корзину', 'icon' => 'cart', 'button_style' => 'primary', 'button_size' => 'large', 'mobile_stack' => true, 'fullwidth' => true, 'margin_top' => 'default']],
								[
									'type' => 'rmoneclick',
									'props' => [
										'radicalform_target' => 'oneclick',
										'subject' => 'Заказ в 1 клик: {product_name}',
										'display_mode' => 'modal',
										'trigger_display' => 'button',
										'button_label' => 'Купить в 1 клик',
										'button_style' => 'default',
										'button_size' => 'large',
										'button_icon' => 'bolt',
										'button_fullwidth' => true,
										'modal_title' => 'Купить в 1 клик',
										'modal_size' => 'xlarge',
										'modal_layout' => 'split',
										'modal_center' => true,
										'send_product_id' => true,
										'send_product_name' => true,
										'send_product_code' => true,
										'send_product_url' => true,
										'send_product_price' => true,
										'summary_show_image' => true,
										'summary_show_price' => true,
										'summary_show_bonus' => false,
										'summary_show_stock' => false,
										'summary_column_width' => 40,
										'summary_image_height' => 460,
										'summary_image_height_mode' => 'fixed',
										'summary_image_fit' => 'contain',
										'summary_image_position' => 'center',
										'summary_image_background' => '#f7f7fb',
										'summary_mix_blend_mode' => 'normal',
										'submit_label' => 'Отправить заказ',
										'submit_style' => 'primary',
										'submit_size' => 'large',
										'submit_icon' => 'check',
										'submit_fullwidth' => true,
										'margin_top' => 'small',
									],
									'children' => [
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Ф.И.О.', 'field_name' => 'name', 'field_type' => 'text', 'autocomplete' => 'name', 'required' => true, 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Телефон', 'field_name' => 'phone', 'field_type' => 'tel', 'placeholder' => '+7 912 345-67-89', 'autocomplete' => 'tel', 'required' => true, 'width' => 'full', 'error_text' => 'Укажите номер телефона']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'E-Mail', 'field_name' => 'email', 'field_type' => 'email', 'autocomplete' => 'email', 'required' => true, 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Комментарий к заказу', 'field_name' => 'comment', 'field_type' => 'textarea', 'rows' => 4, 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Стоимость доставки', 'field_name' => 'delivery', 'field_type' => 'select', 'options' => "manager|Уточнить у менеджера\npickup|Самовывоз\ncourier|Доставка курьером", 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Адрес доставки', 'field_name' => 'delivery_address', 'field_type' => 'text', 'placeholder' => 'Город, улица, дом, квартира', 'autocomplete' => 'street-address', 'required' => true, 'show_when_field' => 'delivery', 'show_when_value' => 'courier', 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями обработки персональных данных', 'label_link_text' => 'обработки персональных данных', 'field_name' => 'privacy', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями публичной оферты', 'label_link_text' => 'публичной оферты', 'field_name' => 'offer', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
										['type' => 'rmoneclick_item', 'props' => ['label' => 'Я согласен(а) с условиями передачи данных третьим лицам', 'label_link_text' => 'передачи данных третьим лицам', 'field_name' => 'third_party', 'field_type' => 'checkbox', 'required' => true, 'width' => 'full']],
									],
								],
								['type' => 'rmproductaction', 'props' => ['action' => 'favorite', 'favorite_label' => 'В избранное', 'button_style' => 'default', 'icon_only' => false, 'margin_top' => 'small']],
								['type' => 'rmproductaction', 'props' => ['action' => 'compare', 'compare_label' => 'Сравнить', 'button_style' => 'default', 'icon_only' => false, 'margin_top' => 'small']],
								...$this->floatingNavigationExamples(),
							]],
						]],
						['type' => 'row', 'props' => ['column_gap' => 'large', 'row_gap' => 'large', 'margin_top' => 'large'], 'children' => [
							['type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
								['type' => 'headline', 'props' => ['content' => 'Описание', 'title_element' => 'h2', 'title_style' => 'h3']],
								['type' => 'rmproductfield', 'props' => ['field' => 'full_description', 'text_style' => 'lead', 'margin_top' => 'small']],
							]],
							['type' => 'column', 'props' => ['width_medium' => '1-2'], 'children' => [
								['type' => 'headline', 'props' => ['content' => 'Характеристики', 'title_element' => 'h2', 'title_style' => 'h3']],
								['type' => 'rmproductspecifications', 'props' => ['layout' => 'description-list', 'show_fieldset_titles' => false, 'show_variant_fields' => false, 'divider' => true, 'table_responsive' => 'stack', 'table_stack_breakpoint' => 'm', 'margin_top' => 'small']],
							]],
						]],
					],
				]],
			]],
			'version' => '5.0.42',
		];
	}

	private function floatingNavigationExamples(): array
	{
		return [
			[
				'type' => 'rmbottomnav',
				'props' => [
					'fixed' => true,
					'reserve_space' => true,
					'visibility_mode' => 'mobile',
					'hide_scrollbar' => true,
					'show_labels' => true,
					'auto_active' => true,
					'max_width' => 780,
					'item_min_width' => 82,
				],
				'children' => [
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Главная', 'icon' => 'home', 'link' => '/']],
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Каталог', 'icon' => 'grid', 'link' => '/index.php']],
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Корзина', 'icon' => 'cart', 'link' => '/index.php?option=com_radicalmart&view=cart']],
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Избранное', 'icon' => 'heart', 'link' => '/index.php?option=com_radicalmart&view=favorites']],
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Сравнение', 'icon' => 'copy', 'link' => '/index.php?option=com_radicalmart&view=compare']],
					['type' => 'rmbottomnav_item', 'props' => ['title' => 'Кабинет', 'icon' => 'user', 'link' => '/index.php?option=com_users&view=profile']],
				],
			],
			[
				'type' => 'rmhelpmenu',
				'props' => [
					'button_label' => 'Помощь и контакты',
					'button_icon' => 'receiver',
					'close_icon' => 'close',
					'side' => 'right',
					'direction' => 'up',
					'visibility_mode' => 'all',
					'show_labels' => false,
					'show_backdrop' => true,
					'close_on_link' => true,
					'bottom_offset' => 96,
				],
				'children' => [
					['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Позвонить', 'icon' => 'receiver', 'link' => 'tel:+79990000000', 'background_color' => '#315efb', 'icon_color' => '#ffffff']],
					['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать в Telegram', 'icon' => 'comments', 'link' => 'https://t.me/example', 'link_target' => true, 'background_color' => '#2aabee', 'icon_color' => '#ffffff']],
					['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать в WhatsApp', 'icon' => 'commenting', 'link' => 'https://wa.me/79990000000', 'link_target' => true, 'background_color' => '#25d366', 'icon_color' => '#ffffff']],
					['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Написать на почту', 'icon' => 'mail', 'link' => 'mailto:mail@example.com', 'background_color' => '#1e87f0', 'icon_color' => '#ffffff']],
					['type' => 'rmhelpmenu_item', 'props' => ['title' => 'Раздел помощи', 'icon' => 'question', 'link' => '/help', 'background_color' => '#6f42c1', 'icon_color' => '#ffffff']],
				],
			],
		];
	}

	private function json(mixed $value): string
	{
		return json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
	}

	private function ensureFilterModule(string $title, bool $showTitle): int
	{
		$id = (int) ($this->value(
			"SELECT id FROM joom_modules WHERE module = 'mod_radicalmart_filter' AND title = ? ORDER BY id DESC LIMIT 1",
			[$title]
		) ?: 0);
		$params = $this->json([
			// Zero makes the module follow the current RadicalMart category.
			'category' => 0,
			// Keep AJAX submissions inside the active child category so template
			// assignment and the category-specific product set stay intact.
			'menu_item' => 0,
			// Full navigation keeps YOOtheme's assigned category template and its
			// dynamic source in sync. RadicalMart's stock AJAX replacement only
			// replaces the component list markup and bypasses this Builder layout.
			'ajax' => 0,
			'ajax_auto_submit' => 0,
			'layout' => '_:default',
			'moduleclass_sfx' => '',
			'cache' => 0,
		]);
		$data = [
			'title' => $title,
			'note' => 'Generated Premier catalogue filter',
			'content' => '',
			'ordering' => 0,
			'position' => '',
			'checked_out' => null,
			'checked_out_time' => null,
			'publish_up' => null,
			'publish_down' => null,
			'published' => 1,
			'module' => 'mod_radicalmart_filter',
			'access' => 1,
			'showtitle' => $showTitle ? 1 : 0,
			'params' => $params,
			'client_id' => 0,
			'language' => '*',
		];
		if ($id > 0)
		{
			$sets = implode(',', array_map(static fn(string $column): string => "`{$column}` = ?", array_keys($data)));
			$this->query("UPDATE joom_modules SET {$sets} WHERE id = ?", [...array_values($data), $id]);
			$this->ensureModuleAssignment($id);
			return $id;
		}

		$columns = array_keys($data);
		$marks = implode(',', array_fill(0, count($columns), '?'));
		$this->query(
			'INSERT INTO joom_modules (`' . implode('`,`', $columns) . '`) VALUES (' . $marks . ')',
			array_values($data)
		);
		$id = (int) $this->db->lastInsertId();
		$this->ensureModuleAssignment($id);
		return $id;
	}

	private function ensureModuleAssignment(int $moduleId): void
	{
		$this->query('DELETE FROM joom_modules_menu WHERE moduleid = ?', [$moduleId]);
		$this->query('INSERT INTO joom_modules_menu (moduleid, menuid) VALUES (?, 0)', [$moduleId]);
	}

	private function query(string $sql, array $params = []): PDOStatement
	{
		$statement = $this->db->prepare($sql);
		$statement->execute(array_values($params));
		return $statement;
	}

	private function value(string $sql, array $params = []): mixed
	{
		return $this->query($sql, $params)->fetchColumn();
	}

	private function column(string $sql, array $params = []): array
	{
		return $this->query($sql, $params)->fetchAll(PDO::FETCH_COLUMN);
	}
}

(new PremierDemoTemplateSeeder())->run();
