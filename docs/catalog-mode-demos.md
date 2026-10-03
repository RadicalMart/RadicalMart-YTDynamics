# Catalog composition demos

The catalogue demos prove that YTDynamics elements can reproduce several
storefront presentations without adding a fixed layout to `RM Product Card`.
All product data is taken from the repeatable large demo catalogue.

## Rebuild

Start the local Joomla stack and generate the product fixture first if it is
not present:

```sh
docker compose up -d
docker compose exec -T app php /dev/stdin < tools/seed-large-demo-catalog.php
```

Generate or update the composition pages:

```sh
php -l tools/seed-catalog-mode-demos.php
docker compose exec -T app php /dev/stdin < tools/seed-catalog-mode-demos.php
```

The second command is idempotent. It updates only articles and menu items whose
aliases start with `ytdynamics-catalog-`; it does not delete products or user
content.

## Pages

| Page | Purpose |
| --- | --- |
| `/index.php/ytdynamics-catalog-layouts` | One real switchable catalogue plus links to all isolated stands |
| `/index.php/ytdynamics-catalog-tile` | Large tile with an always-visible area and hover dropdown |
| `/index.php/ytdynamics-catalog-compact` | Dense 2/3/4/5-column tile grid |
| `/index.php/ytdynamics-catalog-list` | One-column product rows built with ordinary Builder columns |
| `/index.php/ytdynamics-catalog-price` | Semantic price table which becomes labelled cards below `m` |

The overview uses `RM Toolbar` together with four sibling layouts. Only the
active tree is rendered:

- `RM Grid / radicalmart_tile`;
- `RM Grid / radicalmart_compact`;
- `RM Grid / radicalmart_list`;
- `RM Table / radicalmart_price`.

The isolated pages deliberately use `mode: default`, so they remain accessible
regardless of the current layout cookie and can be used for visual regression
checks.

## Composition contract

The large tile demonstrates the intended card boundary:

```text
RM Grid Item (surface, padding and grid sizing)
└── RM Product Card (product/AJAX context only)
    ├── RM Product Card Main (always visible)
    │   ├── RM Product Field: image
    │   ├── category text
    │   ├── RM Product Field: title
    │   ├── RM Product Field: price
    │   └── RM Product Field: availability
    └── RM Product Card Dropdown (reveal policy and floating surface)
        ├── RM Variants
        ├── RM Add to Cart
        └── RM Quick View
```

The compact mode omits the dropdown entirely. The list mode uses a standard
YOOtheme row with three columns inside `RM Product Card Main`. The price mode
puts `RM Product Field`, `RM Add to Cart`, and `RM Quick View` inside `RM Table
Cell` fragments. These differences are Builder data, not PHP layout branches.

## Visual acceptance checklist

Desktop checks at 1280 px:

- tile: three equal columns and hover content above adjacent rows;
- compact: five equal columns with no cropped action buttons;
- list: exactly one card per row and a 1/4 + 1/2 + 1/4 inner layout;
- price: five semantic columns, aligned values, sticky header, no accidental
  first-column stickiness.

Mobile checks at 390 px:

- no page-level horizontal scrolling;
- tile dropdown is in normal flow on touch widths;
- compact remains two columns and buttons fit their cards;
- list columns stack in image/content/actions order;
- price rows become labelled cards and full-width actions render last.

## Settings audit against the Premier catalogue reference

### Covered

- Four persisted catalogue modes: tile, compact, list, and price.
- Separate Builder trees instead of one card controlled by many layout flags.
- Independent permanent and reveal areas in product cards.
- Multi-field AJAX variants with URL policy and unavailable-state handling.
- Builder-driven Quick View and responsive Add to Cart controls.
- Selectable/limited product specifications in list and grid/table layouts.
- Semantic and responsive table cells with nested Builder content.
- UIkit card, tile, padding, gap, breakpoint and button choices.

### Product atoms covered by the current worktree

`RM Product Field` exposes category, manufacturer, base price, discount,
savings, stock quantity and unit in addition to the original title, image,
price, availability, code and descriptions. More structured storefront pieces
are intentionally separate elements:

- `RM Product Badges`;
- `RM Product Rating`;
- `RM Product Stock`;
- `RM Product Unit Price`;
- `RM Product Bonus`;
- `RM Product Action` for favourite and compare;
- `RM Product Bulk Select` and `RM Bulk Actions`.

Every stateful atom must keep subscribing to `radicalmart:product-change` so an
AJAX variant switch cannot retain the old product ID. Remaining useful
extensions are a dedicated one-click purchase flow and an explicit arbitrary
field-alias mode when `RM Product Specifications` is too broad for a single
value.

### Remaining reveal/mobile gaps

`RM Product Card Dropdown` now has explicit inline/hidden behavior below its
hover breakpoint. Modal and offcanvas content can be composed with the existing
standalone elements. Remaining optional enhancements are:

- click and dedicated-button reveal triggers on the card itself;
- overlay and side placement in addition to the below-card panel;
- an optional close control and focus-return behavior for click-triggered use.

Hover must remain a desktop enhancement. All content and actions need a
keyboard/touch path, and the revealed panel must not alter the grid track size.

### Settings logic to preserve

- Card elements own context and behavior, not their visual composition.
- `RM Grid Item` owns the outer surface and padding; avoid nesting a second
  UIkit card unless the author explicitly chooses it.
- Hidden mode trees must be suppressed on the server, not rendered and hidden
  with CSS.
- Browser URL replacement is disabled in listing cards and enabled only on a
  product detail page when the author chooses it.
- Mobile defaults must prevent overflow; more decorative desktop settings can
  remain opt-in.
