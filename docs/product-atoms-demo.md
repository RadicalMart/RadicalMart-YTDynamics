# Product atom demo

This standalone page exercises the reusable RadicalMart product atoms in one
responsive YOOtheme Builder composition. `RM Product Card` only provides the
product/AJAX context; `RM Grid Item` provides the surface, and every visible
piece remains an independently configurable Builder element.

## Rebuild

Start the local Joomla stack and create the repeatable large catalogue if it is
not already present:

```sh
docker compose up -d
docker compose exec -T app php /dev/stdin < tools/seed-large-demo-catalog.php
```

Create or update the atom page:

```sh
php -l tools/seed-product-atoms-demo.php
docker compose exec -T app php /dev/stdin < tools/seed-product-atoms-demo.php
```

The product-atoms seeder is idempotent. It updates only the article and menu
item with the exact alias `ytdynamics-product-atoms`; it does not change the
catalogue-mode stands, products, fields, or other user content.

Open:

```text
http://localhost:8080/index.php/ytdynamics-product-atoms
```

## Builder composition

```text
RM Bulk Actions
RM Grid
└── RM Grid Item (card surface and padding)
    └── RM Product Card (product/AJAX context only)
        └── RM Product Card Main
            ├── RM Product Badges
            ├── RM Product Action: favourite
            ├── RM Product Action: compare
            ├── RM Product Field: image, or RM Product Card Slideshow
            ├── RM Product Field: category
            ├── RM Product Field: manufacturer
            ├── RM Product Field: title
            ├── RM Product Field: code
            ├── RM Product Rating
            ├── RM Product Field: price/base price/discount/savings
            ├── RM Product Stock
            ├── RM Product Unit Price
            ├── RM Product Bonus
            ├── RM Product Field: description
            ├── RM Product Specifications
            ├── RM Variant Selector
            ├── RM Add to Cart
            ├── RM Quick View
            └── RM Product Bulk Select
```

The grid uses one column by default, two from `s`, and three from `l`; buttons
and modal settings use their native UIkit/YOOtheme options rather than demo
CSS. The same composition can therefore be rearranged in Builder without
changing PHP templates.

## Optional providers and empty data

- Favourite and compare actions hide on the site when RadicalMart does not
  expose the corresponding provider. Builder keeps an inert preview visible
  so the controls can still be positioned.
- Hover Gallery uses the product media gallery as horizontal pointer zones,
  resets to the first image on pointer leave, and keeps the first image as the
  touch-device fallback.
- Badges hide when a product has no badges.
- Rating and bonus are configured with `show_empty`, allowing their empty
  states to be reviewed when those providers are installed.
- Stock quantity/progress is emitted only for products using stock accounting.
- Unit price hides when a product has no unit metadata.

These are intentional graceful-degradation states, not missing Builder nodes.

## Acceptance checks

Desktop (at least 1280 px):

- three equal grid columns with no nested card surface;
- title, price and action rows remain aligned inside each item;
- favourite/compare controls do not reserve space when unavailable;
- selecting products updates the shared bulk-action count;
- variant changes update all visible product atoms in the same card.

Mobile (390 px):

- a single column and no page-level horizontal overflow;
- variant buttons wrap within the card;
- cart and quick-view controls remain full width;
- specifications remain readable and do not force a table overflow;
- bulk actions stay before the grid and work with touch/keyboard input.

## Premier reference catalogue

The isolated Premier demo imports 16 products and 21 locally stored reference
images, then adds two Builder templates without replacing existing templates:

```sh
php -l tools/seed-premier-demo-products.php
php -l tools/seed-premier-demo-templates.php
docker compose exec -T app php /dev/stdin < tools/seed-premier-demo-products.php
docker compose exec -T app php /dev/stdin < tools/seed-premier-demo-templates.php
```

The product seeder owns only `premier-demo-*` products and `food-premier-*`
categories. The template seeder owns only `PREMIERCATALOG`, `PREMIERPRODUCT`,
and the two modules named `Фильтр Premier*`.

Open a category at:

```text
http://localhost:8080/food-market/food-premier-healthy-food
```

The listing template contains the local product images, hover image switching,
three-column cards, quick view on hover, sorting, bulk actions and category-
specific filters. The product template contains the full media gallery, price,
unit, bonus, stock, cart, description and imported specifications.
