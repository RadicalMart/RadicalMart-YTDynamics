<?php

return [
	'components' => [
		'ytdynamics' => [
			'name' => 'YTDynamics',
			'groups' => [
				'All RM elements · Text colors' => '@ytdynamics(-*)?-color',
				'All RM elements · Backgrounds' => '@ytdynamics(-*)?-background',
				'All RM elements · Borders' => [
					'@ytdynamics-border*',
					'@ytdynamics-scroll-shadow-color',
				],
				'All RM elements · Shadows' => '@ytdynamics-*-box-shadow',
				'All RM elements · Spacing' => [
					'@ytdynamics(-*)?-margin',
					'@ytdynamics(-*)?-gutter',
				],
				'All RM elements · Controls' => '@ytdynamics-control-*',
				'All RM elements · Typography' => [
					'@ytdynamics-font-size',
					'@ytdynamics-small-font-size',
					'@ytdynamics-medium-font-size',
					'@ytdynamics-line-height',
					'@ytdynamics-primary-font-weight',
					'@ytdynamics-meta-*',
				],
				'RM Table · Header typography' => '@ytdynamics-table-header-*',
				'All RM elements · Motion' => '@ytdynamics-transition-*',
			],
			'hover' => '.rm-product-field, .rm-product-badges, .rm-product-rating, .rm-product-bonus, .rm-product-stock, .rm-product-unit, .rm-product-select, .rm-bulk-actions, .rm-product-action, .rm-product-specifications, .rm-buy, .rm-product-card, .rm-product-card__main, .rm-product-card__position, .rm-product-card__dropdown, .rmvariants, [data-rm-quick-view-root], .rmslideshow, .rm-product-gallery, .rm-table-frame, .rm-grid-item, [data-rm-toolbar], .rm-search__form, .rm-modal__trigger, .rm-offcanvas__trigger',
			'inspect' => '.rm-product-field, .rm-product-field > *, .rm-product-badges, .rm-product-badges > *, .rm-product-rating, .rm-product-rating > *, .rm-product-bonus, .rm-product-bonus > *, .rm-product-stock, .rm-product-stock > *, .rm-product-unit, .rm-product-unit > *, .rm-product-select, .rm-product-select > *, .rm-bulk-actions, .rm-bulk-actions > *, .rm-product-action, .rm-product-specifications, .rm-product-specifications > *, .rm-buy, .rm-buy > *, .rm-product-card, .rm-product-card > *, .rm-product-card__main, .rm-product-card__main > *, .rm-product-card__position, .rm-product-card__position > *, .rm-product-card__dropdown, .rm-product-card__dropdown > *, .rmvariants, .rmvariants > *, [data-rm-quick-view-root], [data-rm-quick-view-root] > *, .rmquickview, .rmquickview > *, .rmslideshow, .rmslideshow > *, .rmslideshow__main, .rmslideshow__viewport, .rmslideshow-thumbs, .rmslideshow-thumbs > *, .rm-product-gallery, .rm-product-gallery > *, .rm-product-gallery__item, .rm-product-gallery__media, .rm-table-frame, .rm-table-frame > *, .rm-grid-item, .rm-grid-item > *, [data-rm-toolbar], [data-rm-toolbar] > *, .rm-search__form, .rm-search__form > *, .rm-modal__trigger, .rm-modal, .rm-modal > *, .rm-offcanvas__trigger, .rm-offcanvas, .rm-offcanvas > *',
		],
	],
];
