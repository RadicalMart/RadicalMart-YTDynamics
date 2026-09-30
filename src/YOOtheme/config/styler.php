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
			'hover' => '.rm-product-field, .rm-buy, .rm-product-card, .rm-product-card__main, .rm-product-card__dropdown, .rmvariants, [data-rm-quick-view-root], .rmslideshow, .rm-table-frame, .rm-grid-item, [data-rm-toolbar], .rm-search__form, .rm-modal__trigger, .rm-offcanvas__trigger',
			'inspect' => '.rm-product-field, .rm-product-field > *, .rm-buy, .rm-buy > *, .rm-product-card, .rm-product-card > *, .rm-product-card__main, .rm-product-card__main > *, .rm-product-card__dropdown, .rm-product-card__dropdown > *, .rmvariants, .rmvariants > *, [data-rm-quick-view-root], [data-rm-quick-view-root] > *, .rmquickview, .rmquickview > *, .rmslideshow, .rmslideshow > *, .rmslideshow__main, .rmslideshow__viewport, .rmslideshow-thumbs, .rmslideshow-thumbs > *, .rm-table-frame, .rm-table-frame > *, .rm-grid-item, .rm-grid-item > *, [data-rm-toolbar], [data-rm-toolbar] > *, .rm-search__form, .rm-search__form > *, .rm-modal__trigger, .rm-modal, .rm-modal > *, .rm-offcanvas__trigger, .rm-offcanvas, .rm-offcanvas > *',
		],
	],
];
