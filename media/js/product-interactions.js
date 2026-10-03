/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/product-interactions.scss"
/*!***************************************!*\
  !*** ./src/product-interactions.scss ***!
  \***************************************/
() {

// extracted by mini-css-extract-plugin

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/product-interactions.es6 ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _product_interactions_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-interactions.scss */ "./src/product-interactions.scss");
/* harmony import */ var _product_interactions_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_product_interactions_scss__WEBPACK_IMPORTED_MODULE_0__);

const text = value => document.createTextNode(value || '');
const clone = value => {
  if (value === null || value === undefined) return value;
  return typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
};
const productDiscountText = function () {
  let price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'amount';
  if (mode === 'legacy') return String(price.discount || '');
  const base = Number(price.baseValue) || 0;
  const final = Number(price.finalValue) || 0;
  const percent = base > 0 && final < base ? Math.max(0, Math.round((base - final) / base * 100)) : 0;
  const amount = String(price.discount || '').replace(/^[-−\s]+/, '');
  const percentText = percent > 0 ? `-${percent}%` : '';
  const amountText = amount ? `-${amount}` : '';
  if (mode === 'percent') return percentText;
  if (mode === 'both') return [percentText, amountText].filter(Boolean).join(' · ');
  return amountText;
};
const loadedAssets = new Map();
const assetKey = (asset, type) => `${type}:${asset.name || asset.uri || asset.content || ''}`;
const loadAsset = (asset, type) => {
  const key = assetKey(asset, type);
  if (!key || loadedAssets.has(key)) return loadedAssets.get(key) || Promise.resolve();
  const targetUrl = asset.uri ? new URL(asset.uri, document.baseURI).href : '';
  const existing = targetUrl ? Array.from(document.querySelectorAll(type === 'style' ? 'link[href]' : 'script[src]')).find(node => (type === 'style' ? node.href : node.src) === targetUrl) : null;
  if (existing) {
    const ready = Promise.resolve();
    loadedAssets.set(key, ready);
    return ready;
  }
  let node = null;
  const ready = new Promise((resolve, reject) => {
    node = document.createElement(type === 'style' && !asset.uri ? 'style' : type === 'style' ? 'link' : 'script');
    const attributes = asset.attributes || {};
    if (type === 'style' && asset.uri) {
      node.rel = 'stylesheet';
      node.href = asset.uri;
    } else if (type === 'script' && asset.uri) {
      node.src = asset.uri;
    } else {
      node.textContent = asset.content || '';
    }
    Object.entries(attributes).forEach(_ref => {
      let [name, value] = _ref;
      if (value !== false && value !== null && value !== undefined) {
        node.setAttribute(name, value === true ? '' : String(value));
      }
    });
    const nonce = document.querySelector('script[nonce],style[nonce]')?.nonce;
    if (nonce) node.nonce = nonce;
    if (asset.uri) {
      node.addEventListener('load', resolve, {
        once: true
      });
      node.addEventListener('error', () => reject(new Error(`Unable to load asset: ${asset.uri}`)), {
        once: true
      });
    }
    document.head.append(node);
    if (!asset.uri) resolve();
  }).catch(error => {
    loadedAssets.delete(key);
    node?.remove();
    throw error;
  });
  loadedAssets.set(key, ready);
  return ready;
};
const loadAssets = async function () {
  let assets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let type = arguments.length > 1 ? arguments[1] : undefined;
  for (const asset of assets[type] || []) {
    await loadAsset(asset, type);
  }
};
const ensureRadicalMartDisplay = () => {
  if (window.RadicalMartDisplay) return;

  // com_radicalmart.site normally creates this object on DOMContentLoaded.
  // Builder assets can be loaded later by Quick View, so initialise the same
  // public defaults without dispatching DOMContentLoaded a second time.
  window.RadicalMartDisplay = {
    cart: {
      addButtonsLock: true,
      displayModuleButtonsLock: true,
      discountHide: true,
      productsDiscountHide: true,
      badgeHide: true,
      moduleHide: true,
      moduleShow: true,
      pageErrors: true,
      pageReload: true,
      notification_addShow: true,
      errorsShow: true
    },
    checkout: {
      submitButtonsLock: true,
      discountHide: true,
      checkErrorsShow: true,
      checkErrorsProductsShow: true,
      globalLoadingShow: true,
      shippingLoadingShow: true,
      paymentLoadingShow: true,
      loginShow: true,
      errorsShow: true,
      createOrderProgress: true
    },
    login: {
      buttonsLock: true,
      fromShow: true,
      errorsShow: true
    }
  };
  document.dispatchEvent(new CustomEvent('onRadicalMartDisplayAfterSetConfig', {
    detail: window.RadicalMartDisplay
  }));
};
const translate = (key, fallback) => {
  const translated = window.Joomla?.Text?._?.(key);
  return translated && translated !== key ? translated : fallback;
};
const labels = {
  loading: translate('PLG_YTDYNAMICS_LOADING', 'Loading…'),
  error: translate('PLG_YTDYNAMICS_ERROR_LOAD_PRODUCT', 'Unable to load product.'),
  emptyProduct: translate('PLG_YTDYNAMICS_ERROR_EMPTY_PRODUCT', 'Product data is empty.'),
  emptyQuickView: translate('PLG_YTDYNAMICS_ERROR_EMPTY_QUICK_VIEW', 'Quick View layout is empty.'),
  inStock: translate('COM_RADICALMART_IN_STOCK', 'In stock'),
  outOfStock: translate('COM_RADICALMART_NOT_IN_STOCK', 'Not available'),
  quantity: translate('PLG_YTDYNAMICS_QUANTITY', 'Quantity'),
  addToCart: translate('COM_RADICALMART_CART_ADD', 'Add to cart'),
  cartAdded: translate('PLG_YTDYNAMICS_CART_ADDED', 'Product added to cart'),
  details: translate('PLG_YTDYNAMICS_DETAILS', 'Details'),
  quickView: translate('PLG_YTDYNAMICS_QUICK_VIEW', 'Quick view'),
  noImage: translate('PLG_YTDYNAMICS_NO_IMAGE', 'No image')
};
const element = function (tag) {
  let className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const node = document.createElement(tag);
  if (className) node.className = className;
  Object.entries(attributes).forEach(_ref2 => {
    let [name, value] = _ref2;
    if (value !== null && value !== undefined && value !== false) {
      node.setAttribute(name, value === true ? '' : String(value));
    }
  });
  return node;
};
const requestProduct = async function (endpoint, task, productId) {
  let signal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  const url = new URL(endpoint, window.location.href);
  url.searchParams.set('task', task);
  url.searchParams.set('product_id', productId);
  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin',
    signal
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || `HTTP ${response.status}`);
  }
  let data = payload.data;
  if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') data = data[0];
  if (!data || !data.id) throw new Error(labels.emptyProduct);
  return data;
};
const requestQuickViewLayout = async function (endpoint, productId, templateId) {
  let signal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  const url = new URL(endpoint, window.location.href);
  url.searchParams.set('task', 'quickViewLayout');
  url.searchParams.set('product_id', productId);
  url.searchParams.set('template_id', templateId);
  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin',
    signal
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || `HTTP ${response.status}`);
  }
  let data = payload.data;
  if (Array.isArray(data) && data.length === 1 && typeof data[0] === 'object') data = data[0];
  if (!data || !data.html) throw new Error(labels.emptyQuickView);
  return data;
};
const resolveProductScope = source => {
  if (!source) return document;

  // Inside RM Grid, the grid item is the visual card. Use it as the hover and
  // update scope so RM Product Card does not create a second card surface and
  // the reveal panel can align with the complete grid item.
  return source.parentElement?.closest('.rm-grid-item, .el-item') || source;
};
const appendSpecificationValue = (node, field) => {
  node.innerHTML = field.value || '';
  if (!node.childNodes.length && field.text) node.append(text(field.text));
};
const updateOptionalElement = (node, available) => {
  node.hidden = !available;
  node.setAttribute('aria-hidden', available ? 'false' : 'true');
};
const findProductField = function () {
  let product = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let alias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (!alias) return null;
  for (const fieldset of product.fieldsets || []) {
    const field = (fieldset.fields || []).find(item => String(item.alias || '') === alias);
    if (field) return field;
  }
  return null;
};
const renderProductCustomField = function (container) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const field = findProductField(product, container.dataset.fieldAlias || '');
  const fallback = container.dataset.emptyText || '';
  const label = container.querySelector('[data-rm-product-custom-label]');
  const value = container.querySelector('[data-rm-product-custom-value]');
  const available = Boolean(field) || fallback !== '';
  if (label) {
    label.textContent = `${field?.title || container.dataset.fieldAlias || ''}${container.dataset.labelSeparator || ''}`;
    label.hidden = container.dataset.showLabel !== 'true';
  }
  if (value) {
    if (field && container.dataset.valueMode === 'formatted') {
      value.innerHTML = field.value || '';
      if (!value.childNodes.length && field.text) value.append(text(field.text));
    } else {
      value.textContent = field?.text || fallback;
    }
  }
  updateOptionalElement(container, available);
};
const renderProductBadges = function (container) {
  let badges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const limit = Math.max(0, Number(container.dataset.limit) || 0);
  const items = limit ? badges.slice(0, limit) : badges;
  const list = container.querySelector('[data-rm-product-badges-list]');
  if (!list) return;
  const fragment = document.createDocumentFragment();
  items.forEach(badge => {
    const tag = container.dataset.linkBadges !== 'false' && badge.link ? 'a' : 'span';
    const item = element(tag, 'rm-product-badges__item');
    if (tag === 'a') item.href = badge.link;
    if (badge.icon && container.dataset.showIcons !== 'false') {
      item.append(element('img', 'rm-product-badges__icon', {
        src: badge.icon,
        alt: badge.title || '',
        loading: 'lazy'
      }));
      if (container.dataset.showTitles === 'true') {
        const label = element('span', 'rm-product-badges__label');
        label.append(text(badge.title));
        item.append(label);
      }
    } else {
      const style = container.dataset.labelStyle || '';
      const label = element('span', `rm-product-badges__label uk-label${style ? ` uk-label-${style}` : ''}`);
      label.append(text(badge.title));
      item.append(label);
    }
    fragment.append(item);
  });
  list.replaceChildren(fragment);
  updateOptionalElement(container, items.length > 0);
};
const renderProductRating = function (container) {
  let rating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const available = Boolean(rating.available);
  const value = Math.max(0, Math.min(Number(rating.max) || 5, Number(rating.value) || 0));
  const max = Math.max(1, Number(rating.max) || 5);
  const percent = `${value / max * 100}%`;
  const stars = container.querySelector('[data-rm-product-rating-stars]');
  const valueNode = container.querySelector('[data-rm-product-rating-value]');
  const countNode = container.querySelector('[data-rm-product-rating-count]');
  if (stars) stars.style.setProperty('--rm-product-rating-percent', percent);
  if (valueNode) valueNode.textContent = value.toLocaleString(undefined, {
    maximumFractionDigits: 1
  });
  if (countNode) {
    countNode.textContent = String(Math.max(0, Number(rating.count) || 0));
    countNode.hidden = container.dataset.showCount !== 'true';
  }
  container.setAttribute('aria-label', `${value} / ${max}`);
  updateOptionalElement(container, available || container.dataset.showEmpty === 'true');
};
const renderProductBonus = function (container) {
  let bonus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const value = container.querySelector('[data-rm-product-bonus-value]');
  if (value) value.textContent = bonus.text || '';
  updateOptionalElement(container, Boolean(bonus.available) || container.dataset.showEmpty === 'true');
};
const renderProductStock = function (container) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const quantity = product.quantity || {};
  const amount = Number(quantity.all) || 0;
  const status = container.querySelector('[data-rm-product-stock-status]');
  const amountNode = container.querySelector('[data-rm-product-stock-amount]');
  const progress = container.querySelector('[data-rm-product-stock-progress]');
  if (status) {
    status.textContent = product.inStock ? container.dataset.labelIn : container.dataset.labelOut;
    status.classList.toggle('uk-text-success', Boolean(product.inStock));
    status.classList.toggle('uk-text-muted', !product.inStock);
  }
  if (amountNode) {
    amountNode.textContent = quantity.stockAccounting ? `${amount} ${quantity.unitShort || quantity.units || ''}`.trim() : '';
    amountNode.hidden = container.dataset.showQuantity !== 'true' || !quantity.stockAccounting;
  }
  if (progress) {
    const threshold = Math.max(1, Number(container.dataset.progressThreshold) || 10);
    progress.max = threshold;
    progress.value = Math.min(amount, threshold);
    progress.hidden = container.dataset.showProgress !== 'true' || !quantity.stockAccounting;
  }
};
const renderProductUnit = function (container) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const quantity = product.quantity || {};
  const unit = container.dataset.unitStyle === 'long' ? quantity.unit || quantity.units : quantity.unitShort || quantity.units;
  const unitNode = container.querySelector('[data-rm-product-unit-label]');
  const priceNode = container.querySelector('[data-rm-product-unit-price]');
  if (unitNode) unitNode.textContent = unit || '';
  if (priceNode) priceNode.textContent = product.price?.final || '';
  updateOptionalElement(container, Boolean(unit));
};
const renderProductSpecifications = function (container) {
  let sourceFieldsets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const showVariants = container.dataset.showVariantFields !== 'false';
  const selectedFields = new Set(String(container.dataset.selectedFields || '').split(',').map(alias => alias.trim()).filter(Boolean));
  const fieldLimit = Math.max(0, Math.min(24, Number.parseInt(container.dataset.fieldLimit || '0', 10) || 0));
  const showTitles = container.dataset.showFieldsetTitles !== 'false';
  const divider = container.dataset.divider !== 'false';
  const striped = container.dataset.striped === 'true';
  const layout = ['description-list', 'table', 'grid'].includes(container.dataset.layout) ? container.dataset.layout : 'description-list';
  const responsiveColumn = (value, fallback) => ['1', '2', '3', '4'].includes(value) ? value : fallback;
  const legacyColumns = responsiveColumn(container.dataset.columns, '2');
  const columnsSmall = responsiveColumn(container.dataset.columnsSmall, '1');
  const columnsMedium = responsiveColumn(container.dataset.columnsMedium, legacyColumns);
  const columnsLarge = responsiveColumn(container.dataset.columnsLarge, legacyColumns);
  const tableResponsive = ['scroll', 'stack'].includes(container.dataset.tableResponsive) ? container.dataset.tableResponsive : 'scroll';
  let fieldsRemaining = fieldLimit || Number.POSITIVE_INFINITY;
  const fieldsets = [];
  sourceFieldsets.forEach(fieldset => {
    if (fieldsRemaining <= 0) return;
    const fields = (fieldset.fields || []).filter(field => (showVariants || !field.variant) && (!selectedFields.size || selectedFields.has(String(field.alias || '')))).slice(0, fieldsRemaining);
    if (!fields.length) return;
    fieldsets.push({
      ...fieldset,
      fields
    });
    fieldsRemaining -= fields.length;
  });
  const content = container.querySelector('.rm-product-specifications__content');
  if (!content) return;
  const fragment = document.createDocumentFragment();
  fieldsets.forEach(fieldset => {
    const section = element('section', 'rm-product-specifications__fieldset');
    if (showTitles && fieldset.title) {
      const titleNode = element('h3', 'rm-product-specifications__title uk-h4');
      titleNode.append(text(fieldset.title));
      section.append(titleNode);
    }
    if (layout === 'table') {
      const table = element('table', `rm-product-specifications__table uk-table uk-table-small${divider ? ' uk-table-divider' : ''}${striped ? ' uk-table-striped' : ''}`);
      const body = document.createElement('tbody');
      fieldset.fields.forEach(field => {
        const row = element('tr', 'rm-product-specifications__item');
        const label = element('th', 'rm-product-specifications__label', {
          scope: 'row'
        });
        const value = element('td', 'rm-product-specifications__value');
        label.append(text(field.title));
        appendSpecificationValue(value, field);
        row.append(label, value);
        body.append(row);
      });
      table.append(body);
      const wrapper = element('div', `rm-product-specifications__table-wrap${tableResponsive === 'scroll' ? ' uk-overflow-auto' : ''}`);
      wrapper.append(table);
      section.append(wrapper);
    } else if (layout === 'grid') {
      const grid = element('div', `rm-product-specifications__grid uk-child-width-1-1 uk-child-width-1-${columnsSmall}@s uk-child-width-1-${columnsMedium}@m uk-child-width-1-${columnsLarge}@l${divider ? ' uk-grid-divider' : ''}`, {
        'uk-grid': true
      });
      fieldset.fields.forEach(field => {
        const item = element('div', 'rm-product-specifications__item');
        const label = element('div', 'rm-product-specifications__label uk-text-meta');
        const value = element('div', 'rm-product-specifications__value uk-margin-small-top');
        label.append(text(field.title));
        appendSpecificationValue(value, field);
        item.append(label, value);
        grid.append(item);
      });
      section.append(grid);
    } else {
      const list = element('dl', `rm-product-specifications__list uk-description-list${divider ? ' uk-description-list-divider' : ''}`);
      fieldset.fields.forEach(field => {
        const item = element('div', 'rm-product-specifications__item');
        const label = element('dt', 'rm-product-specifications__label');
        const value = element('dd', 'rm-product-specifications__value');
        label.append(text(field.title));
        appendSpecificationValue(value, field);
        item.append(label, value);
        list.append(item);
      });
      section.append(list);
    }
    fragment.append(section);
  });
  content.replaceChildren(fragment);
  container.hidden = fieldsets.length === 0;
  window.UIkit?.update?.(container);
};
const renderProductHoverGallery = function (container) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const limit = Math.max(0, Math.min(20, Number.parseInt(container.dataset.maxImages || '0', 10) || 0));
  const items = (product.media || []).filter(item => item?.src);
  const media = limit ? items.slice(0, limit) : items;
  const viewport = container.querySelector('.rm-product-hover-gallery__viewport');
  if (!viewport) return;
  const fragment = document.createDocumentFragment();
  media.forEach((item, index) => {
    const image = element('img', `rm-product-hover-gallery__image${index === 0 ? ' rm-product-hover-gallery__image--active' : ''}`, {
      'data-rm-product-hover-image': true,
      'data-index': index,
      src: item.src,
      alt: item.alt || product.title || '',
      loading: index === 0 ? container.dataset.loading || 'lazy' : 'lazy',
      decoding: 'async',
      'aria-hidden': index === 0 ? 'false' : 'true'
    });
    fragment.append(image);
  });
  const indicatorStyle = container.dataset.indicators || 'bars';
  if (media.length > 1 && indicatorStyle !== 'none') {
    const indicators = element('span', `rm-product-hover-gallery__indicators rm-product-hover-gallery__indicators--${indicatorStyle}`, {
      'data-rm-product-hover-indicators': true,
      'aria-hidden': 'true'
    });
    media.forEach((item, index) => {
      indicators.append(element('span', `rm-product-hover-gallery__indicator${index === 0 ? ' rm-product-hover-gallery__indicator--active' : ''}`, {
        'data-index': index
      }));
    });
    fragment.append(indicators);
  }
  viewport.replaceChildren(fragment);
  container.hidden = media.length === 0;
  container.dispatchEvent(new CustomEvent('radicalmart:hover-gallery-refresh'));
};
const setMetaContent = (attribute, name, value) => {
  let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!node && !value) return;
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, name);
    document.head.append(node);
  }
  node.setAttribute('content', String(value || ''));
};
const updateProductMetadata = product => {
  const description = String(product.introtext || '').trim();
  const image = product.media?.[0]?.src || '';
  const link = product.link ? new URL(product.link, document.baseURI).href : '';
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical && link) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  if (canonical && link) canonical.href = link;
  setMetaContent('name', 'description', description);
  setMetaContent('property', 'og:title', product.title || '');
  setMetaContent('property', 'og:description', description);
  setMetaContent('property', 'og:url', link);
  setMetaContent('property', 'og:image', image ? new URL(image, document.baseURI).href : '');
  setMetaContent('name', 'twitter:title', product.title || '');
  setMetaContent('name', 'twitter:description', description);
  setMetaContent('name', 'twitter:image', image ? new URL(image, document.baseURI).href : '');
};
class ProductScope {
  constructor(source) {
    this.source = source;
    this.scope = resolveProductScope(source);
    this.product = this.readData();
  }
  readData() {
    const data = Array.from(this.source.children || []).find(node => node.classList?.contains('rm-product__data') || node.classList?.contains('rm-product-card__data'));
    try {
      return JSON.parse(data?.textContent || '{}');
    } catch (error) {
      return null;
    }
  }
  nodes(selector) {
    return Array.from(this.scope.querySelectorAll(selector)).filter(node => {
      const owner = node.closest('[data-rm-product-scope]');
      return owner === this.source || !owner && this.scope !== this.source;
    });
  }
  init() {
    if (this.source.dataset.rmProductScopeReady) return;
    this.source.dataset.rmProductScopeReady = 'true';
    this.source.addEventListener('radicalmart:variant-change', event => {
      if (event.target.closest('[data-rm-product-scope]') !== this.source) return;
      if (event.detail?.product?.id) this.applyProduct(event.detail.product);
    });
  }
  applyProduct(product) {
    this.product = {
      ...this.product,
      ...product
    };
    this.source.dataset.rmProductId = String(product.id);
    this.nodes('[data-rm-product-title]').forEach(node => {
      node.textContent = product.title || '';
    });
    this.nodes('[data-rm-product-code]').forEach(node => {
      node.textContent = product.code || '';
    });
    this.nodes('[data-rm-product-description]').forEach(node => {
      node.innerHTML = product.introtextHtml || product.introtext || '';
    });
    this.nodes('[data-rm-product-full-description]').forEach(node => {
      node.innerHTML = product.fulltextHtml || product.fulltext || '';
    });
    this.nodes('[data-rm-product-link]').forEach(node => {
      if (product.link) node.href = product.link;
    });
    const media = product.media?.[0] || {};
    this.nodes('[data-rm-product-image]').forEach(node => {
      // Initial markup can use YOOtheme-generated srcsets. A variant can
      // point to another file, so stale candidates must not override it.
      node.removeAttribute('srcset');
      node.removeAttribute('sizes');
      node.removeAttribute('data-src');
      node.removeAttribute('data-srcset');
      if (media.src) node.src = media.src;else node.removeAttribute('src');
      node.alt = media.alt || product.title || '';
      node.hidden = !media.src;
    });
    this.nodes('[data-rm-product-hover-gallery]').forEach(node => {
      renderProductHoverGallery(node, product);
    });
    this.nodes('[data-rm-product-price]').forEach(node => {
      const base = node.querySelector('[data-rm-product-price-base]');
      const final = node.querySelector('[data-rm-product-price-final]');
      const discount = node.querySelector('[data-rm-product-discount]');
      const savings = node.querySelector('[data-rm-product-price-savings]');
      const savingsValue = node.querySelector('[data-rm-product-price-savings-value]');
      const enabled = Boolean(product.price?.discountEnabled);
      const unitWrap = node.querySelector('[data-rm-product-price-unit-wrap]');
      const unitNode = node.querySelector('[data-rm-product-price-unit]');
      const unit = node.dataset.unitStyle === 'long' ? product.quantity?.unit || product.quantity?.units || '' : product.quantity?.unitShort || product.quantity?.units || '';
      if (base) {
        base.textContent = product.price?.base || '';
        base.hidden = !enabled || node.dataset.showBase !== 'true';
      }
      if (final) final.textContent = product.price?.final || '';
      if (discount) {
        const discountText = productDiscountText(product.price, node.dataset.discountMode || 'legacy');
        discount.textContent = discountText;
        discount.hidden = !enabled || node.dataset.showDiscount !== 'true' || !discountText;
      }
      if (savingsValue) savingsValue.textContent = product.price?.benefit || '';
      if (savings) savings.hidden = !enabled || node.dataset.showSavings !== 'true' || !(Number(product.price?.benefitValue) > 0);
      if (unitNode) unitNode.textContent = unit;
      if (unitWrap) unitWrap.hidden = node.dataset.showUnit !== 'true' || !unit;
    });
    this.nodes('[data-rm-product-base-price]').forEach(node => {
      node.textContent = product.price?.base || '';
    });
    this.nodes('[data-rm-product-discount-value]').forEach(node => {
      node.textContent = product.price?.discount || '';
      updateOptionalElement(node, Boolean(product.price?.discountEnabled));
    });
    this.nodes('[data-rm-product-benefit]').forEach(node => {
      node.textContent = product.price?.benefit || '';
      updateOptionalElement(node, Number(product.price?.benefitValue) > 0);
    });
    this.nodes('[data-rm-product-availability]').forEach(node => {
      node.textContent = product.inStock ? node.dataset.labelIn : node.dataset.labelOut;
      node.classList.toggle('uk-text-success', Boolean(product.inStock));
      node.classList.toggle('uk-text-muted', !product.inStock);
    });
    this.nodes('[data-rm-product-category]').forEach(node => {
      node.textContent = product.category?.title || '';
      if (node.matches('a') && product.category?.link) node.href = product.category.link;
      updateOptionalElement(node, Boolean(product.category?.title));
    });
    this.nodes('[data-rm-product-manufacturer]').forEach(node => {
      const manufacturer = product.manufacturers?.[0];
      node.textContent = manufacturer?.title || '';
      if (node.matches('a') && manufacturer?.link) node.href = manufacturer.link;
      updateOptionalElement(node, Boolean(manufacturer?.title));
    });
    this.nodes('[data-rm-product-stock-quantity]').forEach(node => {
      const amount = Number(product.quantity?.all) || 0;
      const available = Boolean(product.quantity?.stockAccounting);
      node.textContent = available ? `${amount} ${product.quantity?.unitShort || product.quantity?.units || ''}`.trim() : '';
      updateOptionalElement(node, available);
    });
    this.nodes('[data-rm-product-unit-value]').forEach(node => {
      const unit = product.quantity?.unitShort || product.quantity?.units || '';
      node.textContent = unit;
      updateOptionalElement(node, Boolean(unit));
    });
    this.nodes('[data-rm-product-unit]').forEach(node => renderProductUnit(node, product));
    this.nodes('[data-rm-product-custom-field]').forEach(node => renderProductCustomField(node, product));
    this.nodes('[data-rm-product-stock]').forEach(node => renderProductStock(node, product));
    this.nodes('[data-rm-product-badges]').forEach(node => renderProductBadges(node, product.badges || []));
    this.nodes('[data-rm-product-rating]').forEach(node => renderProductRating(node, product.rating || {}));
    this.nodes('[data-rm-product-bonus]').forEach(node => renderProductBonus(node, product.bonus || {}));
    this.nodes('[data-rm-product-select]').forEach(node => {
      const input = node.matches('input') ? node : node.querySelector('input[type="checkbox"]');
      if (!input) return;
      const container = node.matches('input') ? node.closest('[data-rm-product-select]') || node : node;
      input.value = String(product.id);
      input.dataset.productId = String(product.id);
      input.dataset.productTitle = product.title || '';
      input.dataset.quantity = String(product.quantity?.min || 1);
      input.disabled = !product.inStock && container.dataset.disableOutOfStock !== 'false';
      const label = container.querySelector?.('[data-rm-product-select-label], .rm-product-select__label');
      if (label) {
        const baseLabel = container.dataset.baseLabel || '';
        label.textContent = container.dataset.showTitle === 'true' ? `${baseLabel} ${product.title || ''}`.trim() : baseLabel;
      }
      if (input.disabled && input.checked) {
        input.checked = false;
        input.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      }
    });
    this.nodes('[data-rm-product-action]').forEach(node => {
      node.dataset.productId = String(product.id);
      node.setAttribute('aria-label', `${node.dataset.label || ''} ${product.title || ''}`.trim());
      node.setAttribute('aria-pressed', 'false');
      node.classList.remove('rm-product-action--active');
      node.dispatchEvent(new CustomEvent('radicalmart:product-action-refresh'));
    });
    this.nodes('[data-rm-quick-view]').forEach(node => {
      node.dataset.rmQuickView = String(product.id);
    });
    this.nodes('[radicalmart-cart="product"], [data-radicalmart-cart="product"]').forEach(cart => {
      cart.dataset.id = String(product.id);
      cart.dataset.rmDynamicProduct = 'true';
      const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
      if (quantity) {
        quantity.min = product.quantity?.min ?? 1;
        quantity.step = product.quantity?.step ?? 1;
        if (product.quantity?.max) quantity.max = product.quantity.max;else quantity.removeAttribute('max');
        if (Number(quantity.value) < Number(quantity.min)) quantity.value = quantity.min;
      }
      cart.querySelectorAll('[radicalmart-cart="add"], [data-radicalmart-cart="add"]').forEach(button => {
        button.disabled = !product.inStock;
      });
    });
    this.nodes('[data-rm-product-specifications]').forEach(node => {
      renderProductSpecifications(node, product.fieldsets || []);
    });
    if (this.source.dataset.rmProductPage === 'true' && this.source.dataset.updateDocumentTitle !== 'false' && product.title) {
      document.title = product.title;
    }
    if (this.source.dataset.rmProductPage === 'true' && this.source.dataset.updateDocumentMetadata !== 'false') {
      updateProductMetadata(this.product);
    }
    this.source.dispatchEvent(new CustomEvent('radicalmart:product-change', {
      bubbles: true,
      detail: {
        product: this.product
      }
    }));
  }
}
class ProductBulkActions {
  constructor(container) {
    this.container = container;
    this.rootSelector = container.dataset.selectionRoot || '';
    this.resolvedRoot = null;
    this.pending = false;
    this.handleSelection = this.handleSelection.bind(this);
  }
  get root() {
    if (this.resolvedRoot) return this.resolvedRoot;
    if (this.rootSelector) {
      try {
        this.resolvedRoot = this.container.closest(this.rootSelector) || document.querySelector(this.rootSelector) || document;
        return this.resolvedRoot;
      } catch (error) {
        this.rootSelector = '';
      }
    }
    this.resolvedRoot = this.container.closest('[data-rm-selection-scope], .rm-grid, .uk-section') || document;
    return this.resolvedRoot;
  }
  selected() {
    return Array.from(this.root.querySelectorAll('[data-rm-product-select] input[type="checkbox"]:checked'));
  }
  init() {
    if (this.container.dataset.rmBulkActionsReady) return;
    this.container.dataset.rmBulkActionsReady = 'true';
    this.root.addEventListener('change', this.handleSelection);
    this.container.addEventListener('click', event => {
      const action = event.target.closest('[data-rm-bulk-action]')?.dataset.rmBulkAction;
      if (!action) return;
      event.preventDefault();
      if (action === 'clear') {
        this.selected().forEach(input => {
          input.checked = false;
          input.dispatchEvent(new Event('change', {
            bubbles: true
          }));
        });
      } else if (action === 'cart') {
        this.addToCart();
      }
    });
    this.update();
  }
  handleSelection(event) {
    if (event.target.matches('[data-rm-product-select] input[type="checkbox"]')) this.update();
  }
  update() {
    const selected = this.selected();
    this.container.querySelectorAll('[data-rm-selection-count]').forEach(node => {
      node.textContent = String(selected.length);
    });
    this.container.querySelectorAll('[data-rm-bulk-action="cart"], [data-rm-bulk-action="clear"]').forEach(button => {
      button.disabled = this.pending || selected.length === 0;
    });
  }
  setStatus(message) {
    const status = this.container.querySelector('[data-rm-bulk-status]');
    if (status) status.textContent = message;
  }
  addToCart() {
    const selected = this.selected();
    const cart = typeof window.RadicalMartCart === 'function' ? window.RadicalMartCart() : null;
    if (!selected.length || this.pending) return;
    if (!cart?.addProduct) {
      this.setStatus(translate('PLG_YTDYNAMICS_BULK_CART_UNAVAILABLE', 'Cart is unavailable.'));
      return;
    }

    // A free Builder composition can render the same product more than
    // once. RadicalMart de-duplicates concurrent adds by its cart hash, so
    // make the bulk action explicitly one add per product instead of
    // reporting success for skipped duplicate controls.
    const inputsByProduct = new Map();
    selected.forEach(input => {
      const productId = Number(input.dataset.productId || input.value);
      if (productId && !inputsByProduct.has(productId)) inputsByProduct.set(productId, input);
    });
    const productIds = Array.from(inputsByProduct.keys());
    const waiting = new Set(productIds);
    const failures = new Set();
    this.pending = true;
    this.update();
    this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADDING', 'Adding selected products…'));
    let timeout;
    const finish = () => {
      document.removeEventListener('onRadicalMartCartAfterAddProduct', handleResult);
      window.clearTimeout(timeout);
      this.pending = false;
      this.update();
      if (failures.size) {
        this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADD_FAILED', 'Some products could not be added to the cart.'));
        this.container.dispatchEvent(new CustomEvent('radicalmart:bulk-add-error', {
          bubbles: true,
          detail: {
            productIds,
            failedProductIds: Array.from(failures)
          }
        }));
        return;
      }
      this.setStatus(translate('PLG_YTDYNAMICS_BULK_ADDED', 'Selected products were added to the cart.'));
      this.container.dispatchEvent(new CustomEvent('radicalmart:bulk-add', {
        bubbles: true,
        detail: {
          productIds
        }
      }));
    };
    const handleResult = event => {
      const productId = Number(event.detail?.entry?.product_id);
      if (!waiting.has(productId)) return;
      waiting.delete(productId);
      if (event.detail?.error) failures.add(productId);
      if (!waiting.size) finish();
    };
    document.addEventListener('onRadicalMartCartAfterAddProduct', handleResult);
    timeout = window.setTimeout(() => {
      waiting.forEach(productId => failures.add(productId));
      waiting.clear();
      finish();
    }, 30000);
    Array.from(inputsByProduct.entries()).forEach((_ref3, index) => {
      let [productId, input] = _ref3;
      const quantity = Math.max(0.0001, Number(input.dataset.quantity) || 1);
      cart.addProduct(productId, quantity, {}, index === productIds.length - 1);
    });
  }
}
class ProductHoverGallery {
  constructor(container) {
    this.container = container;
    this.activeIndex = 0;
    this.touch = null;
    this.suppressClick = false;
    this.show = this.show.bind(this);
  }
  images() {
    return Array.from(this.container.querySelectorAll('[data-rm-product-hover-image]'));
  }
  show(index) {
    const images = this.images();
    if (!images.length) return;
    const next = Math.max(0, Math.min(images.length - 1, Number(index) || 0));
    this.activeIndex = next;
    images.forEach((image, imageIndex) => {
      const active = imageIndex === next;
      image.classList.toggle('rm-product-hover-gallery__image--active', active);
      image.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    this.container.querySelectorAll('.rm-product-hover-gallery__indicator').forEach((indicator, indicatorIndex) => {
      indicator.classList.toggle('rm-product-hover-gallery__indicator--active', indicatorIndex === next);
    });
  }
  init() {
    if (this.container.dataset.rmProductHoverGalleryReady) return;
    this.container.dataset.rmProductHoverGalleryReady = 'true';
    const viewport = this.container.querySelector('.rm-product-hover-gallery__viewport');
    if (!viewport) return;
    const pointerSurface = viewport.closest('.rm-product-card__main') || viewport;
    pointerSurface.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const images = this.images();
      if (images.length < 2) return;
      const bounds = viewport.getBoundingClientRect();
      if (!bounds.width) return;
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (!inside) {
        if (this.container.dataset.resetOnLeave !== 'false' && this.activeIndex !== 0) this.show(0);
        return;
      }
      const progress = Math.max(0, Math.min(.999999, (event.clientX - bounds.left) / bounds.width));
      this.show(Math.floor(progress * images.length));
    });
    pointerSurface.addEventListener('pointerleave', event => {
      if (event.pointerType === 'touch') return;
      if (this.container.dataset.resetOnLeave !== 'false') this.show(0);
    });
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      this.touch = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        time: performance.now()
      };
    });
    viewport.addEventListener('pointerup', event => {
      if (!this.touch || event.pointerId !== this.touch.id) return;
      const deltaX = event.clientX - this.touch.x;
      const deltaY = event.clientY - this.touch.y;
      const elapsed = performance.now() - this.touch.time;
      this.touch = null;
      if (elapsed > 750 || Math.abs(deltaX) < 36 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      const images = this.images();
      if (images.length < 2) return;
      this.suppressClick = true;
      this.show(deltaX < 0 ? (this.activeIndex + 1) % images.length : (this.activeIndex - 1 + images.length) % images.length);
      window.setTimeout(() => {
        this.suppressClick = false;
      }, 350);
    });
    viewport.addEventListener('pointercancel', () => {
      this.touch = null;
    });
    viewport.addEventListener('click', event => {
      if (!this.suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);
    viewport.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const images = this.images();
      if (images.length < 2) return;
      event.preventDefault();
      if (event.key === 'Home') this.show(0);else if (event.key === 'End') this.show(images.length - 1);else if (event.key === 'ArrowLeft') this.show((this.activeIndex - 1 + images.length) % images.length);else this.show((this.activeIndex + 1) % images.length);
    });
    this.container.addEventListener('radicalmart:hover-gallery-refresh', () => this.show(0));
    this.show(0);
  }
}
class ProductOptionalAction {
  constructor(button) {
    this.button = button;
    this.type = button.dataset.rmProductAction;
    this.retryCount = 0;
    this.retryTimer = null;
    this.refresh = this.refresh.bind(this);
  }
  provider() {
    const source = this.type === 'favorite' ? window.RadicalMartFavorites : window.RadicalMartCompare;
    if (typeof source === 'function') {
      try {
        return source();
      } catch (error) {
        return null;
      }
    }
    return source || null;
  }
  supported(provider) {
    return Boolean(provider && (typeof provider.toggleProduct === 'function' || typeof provider.toggle === 'function'));
  }
  isBuilderPreview() {
    try {
      const frameName = window.frameElement?.getAttribute('name') || '';
      return window.parent !== window && /^preview(?:-|$)/.test(frameName);
    } catch (error) {
      return false;
    }
  }
  setAvailability(supported) {
    const previewFallback = !supported && this.isBuilderPreview();
    this.button.hidden = !supported && !previewFallback;
    this.button.disabled = previewFallback;
    this.button.classList.toggle('rm-product-action--unavailable', previewFallback);
    if (previewFallback) this.button.setAttribute('aria-disabled', 'true');else this.button.removeAttribute('aria-disabled');
  }
  active(provider, productId) {
    for (const method of ['hasProduct', 'contains', 'isActive', 'has']) {
      if (typeof provider?.[method] !== 'function') continue;
      try {
        const value = provider[method](productId);
        return value && typeof value.then === 'function' ? null : Boolean(value);
      } catch (error) {
        return null;
      }
    }
    if (Array.isArray(provider?.products)) {
      return provider.products.some(item => Number(item?.id ?? item) === productId);
    }
    return null;
  }
  setActive(active) {
    const enabled = Boolean(active);
    this.button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    this.button.classList.toggle('rm-product-action--active', enabled);
  }
  refresh() {
    const provider = this.provider();
    const supported = this.supported(provider);
    this.setAvailability(supported);
    if (!supported) return false;
    const active = this.active(provider, Number(this.button.dataset.productId));
    if (active !== null) this.setActive(active);
    return true;
  }
  retryProvider() {
    if (this.refresh() || this.retryCount >= 20) return;
    this.retryCount += 1;
    this.retryTimer = window.setTimeout(() => this.retryProvider(), 250);
  }
  init() {
    if (this.button.dataset.rmProductActionReady) return;
    this.button.dataset.rmProductActionReady = 'true';
    this.setActive(false);
    this.button.addEventListener('radicalmart:product-action-refresh', this.refresh);
    document.addEventListener('radicalmart:provider-ready', this.refresh);
    document.addEventListener(`radicalmart:${this.type}-ready`, this.refresh);
    if (this.type === 'favorite') document.addEventListener('radicalmart:favorites-ready', this.refresh);
    window.addEventListener('load', this.refresh, {
      once: true
    });
    this.retryProvider();
    this.button.addEventListener('click', event => {
      event.preventDefault();
      const id = Number(this.button.dataset.productId);
      if (!id) return;
      const api = this.provider();
      if (!this.supported(api)) {
        this.refresh();
        return;
      }
      const previous = this.button.getAttribute('aria-pressed') === 'true';
      this.setActive(!previous);
      let result;
      try {
        result = typeof api.toggleProduct === 'function' ? api.toggleProduct(id) : api.toggle(id);
      } catch (error) {
        this.setActive(previous);
        return;
      }
      Promise.resolve(result).then(() => {
        const active = this.active(api, id);
        if (active !== null) this.setActive(active);
      }).catch(() => this.setActive(previous));
      this.button.dispatchEvent(new CustomEvent(`radicalmart:${this.type}-toggle`, {
        bubbles: true,
        detail: {
          productId: id,
          active: !previous
        }
      }));
    });
  }
}
class ProductCardDropdown {
  constructor(element) {
    this.element = element;
  }
  init() {
    if (this.element.dataset.rmProductCardDropdownReady) return;
    this.element.dataset.rmProductCardDropdownReady = 'true';
    if (this.element.dataset.displayMode !== 'hover') return;
    const source = this.element.closest('[data-rm-product-scope]');
    const owner = source ? resolveProductScope(source) : this.element.parentElement?.closest('.el-item, .uk-card, .rm-product-card');
    if (!owner || owner === this.element) return;
    owner.classList.add('rm-product-card--hover');
    owner.dataset.rmHoverBreakpoint = this.element.dataset.hoverBreakpoint || 'm';
    const visibleFocusable = Array.from(owner.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')).some(node => {
      if (this.element.contains(node) || node.hasAttribute('disabled') || node.getAttribute('tabindex') === '-1') return false;
      if (node.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
      const style = window.getComputedStyle(node);
      return style.display !== 'none' && style.visibility !== 'hidden' && node.getClientRects().length > 0;
    });
    if (!visibleFocusable && !owner.matches('a[href], button, input, select, textarea, [tabindex]')) {
      owner.tabIndex = 0;
    }
  }
}
class ProductCardPosition {
  constructor(element) {
    this.element = element;
  }
  init() {
    if (this.element.dataset.rmProductCardPositionReady) return;
    this.element.dataset.rmProductCardPositionReady = 'true';
    const owner = this.element.closest('.rm-product-card, [data-rm-product-scope]');
    if (!owner || owner === this.element) return;
    owner.classList.add('rm-product-card--positioned');
    if (!['interaction', 'focus'].includes(this.element.dataset.visibilityMode)) return;
    const visibleFocusable = Array.from(owner.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')).some(node => {
      const position = node.closest('[data-rm-product-card-position]');
      if (position && position.dataset.visibilityMode !== 'always') return false;
      if (node.hasAttribute('disabled') || node.getAttribute('tabindex') === '-1') return false;
      if (node.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
      const style = window.getComputedStyle(node);
      return style.display !== 'none' && style.visibility !== 'hidden' && node.getClientRects().length > 0;
    });
    if (!visibleFocusable && !owner.matches('a[href], button, input, select, textarea, [tabindex]')) {
      owner.tabIndex = 0;
    }
  }
}
class VariantPicker {
  constructor(container) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let onProduct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.container = container;
    this.data = data || this.readData();
    this.onProduct = onProduct;
    this.selected = {};
    this.pending = null;
    this.handlePopState = this.handlePopState.bind(this);
    this.visibleFields = new Set((this.data?.fields || []).map(field => String(field.alias)));
    const current = this.data?.products?.find(product => Number(product.id) === Number(this.data.currentProduct));
    if (current) {
      this.selected = this.visibleSelection(current.fields);
    }
  }
  visibleSelection() {
    let fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.fromEntries(Object.entries(fields).filter(_ref4 => {
      let [alias] = _ref4;
      return this.visibleFields.has(String(alias));
    }));
  }
  readData() {
    try {
      return JSON.parse(this.container.querySelector('.rmvariants__data')?.textContent || '{}');
    } catch (error) {
      return null;
    }
  }
  init() {
    if (!this.data?.fields?.length || !this.data?.products?.length || this.container.dataset.rmVariantsReady) return;
    this.container.dataset.rmVariantsReady = 'true';
    this.container.addEventListener('click', event => {
      const option = event.target.closest('[data-rm-value]');
      if (!option || option.disabled) return;
      const field = option.closest('[data-rm-field]');
      if (field) this.select(field.dataset.rmField, option.dataset.rmValue);
    });
    this.container.addEventListener('change', event => {
      const select = event.target.closest('.rmvariants__select');
      const field = select?.closest('[data-rm-field]');
      if (select && field) this.select(field.dataset.rmField, select.value);
    });
    this.renderState();
    this.initHistory();
  }
  initHistory() {
    if (!['replace', 'push'].includes(this.container.dataset.updateUrl) || typeof window.history?.replaceState !== 'function') return;
    const currentId = Number(this.data.currentProduct);
    if (currentId && !Number(window.history.state?.rmProductId)) {
      window.history.replaceState({
        ...window.history.state,
        rmProductId: currentId
      }, '', window.location.href);
    }
    if (this.container.dataset.updateUrl === 'push') {
      window.addEventListener('popstate', this.handlePopState);
    }
  }
  handlePopState(event) {
    if (this.container.dataset.updateUrl !== 'push') return;
    let id = Number(event.state?.rmProductId);
    if (!id) {
      const currentUrl = new URL(window.location.href);
      const item = this.data.products.find(product => {
        if (!product.link) return false;
        const link = new URL(product.link, document.baseURI);
        return link.pathname === currentUrl.pathname && link.search === currentUrl.search;
      });
      id = Number(item?.id);
    }
    const product = this.data.products.find(item => Number(item.id) === id);
    if (!product || Number(this.data.currentProduct) === id) return;
    this.selected = this.visibleSelection(product.fields);
    this.data.currentProduct = id;
    this.renderState();
    this.loadProduct(product, false);
  }
  select(alias, value) {
    const wanted = {
      ...this.selected,
      [alias]: String(value)
    };
    let product = this.data.products.find(item => this.matches(item, wanted));

    // Sparse variation matrices are common. If the exact combination does
    // not exist, move to the first real product containing the changed value.
    if (!product) {
      product = this.data.products.find(item => String(item.fields[alias]) === String(value));
    }
    if (!product) return;
    this.selected = this.visibleSelection(product.fields);
    this.data.currentProduct = Number(product.id);
    this.renderState();
    if (this.container.dataset.action === 'navigate') {
      window.location.assign(product.link);
      return;
    }
    this.loadProduct(product);
  }
  matches(product, selection) {
    return Object.entries(selection).every(_ref5 => {
      let [alias, value] = _ref5;
      return String(product.fields[alias]) === String(value);
    });
  }
  renderState() {
    const disableUnavailable = this.container.dataset.disableUnavailable !== 'false';
    this.data.fields.forEach(field => {
      const wrapper = this.container.querySelector(`[data-rm-field="${CSS.escape(field.alias)}"]`);
      if (!wrapper) return;
      wrapper.querySelectorAll('[data-rm-value]').forEach(option => {
        const active = String(option.dataset.rmValue) === String(this.selected[field.alias]);
        const available = this.isAvailable(field.alias, option.dataset.rmValue);
        option.setAttribute('aria-pressed', active ? 'true' : 'false');
        option.classList.toggle('rmvariants__option--active', active);
        option.disabled = disableUnavailable && !available;
        option.setAttribute('aria-disabled', option.disabled ? 'true' : 'false');
      });
      const select = wrapper.querySelector('.rmvariants__select');
      if (select) {
        select.value = this.selected[field.alias] ?? '';
        Array.from(select.options).forEach(option => {
          option.disabled = disableUnavailable && !this.isAvailable(field.alias, option.value);
        });
      }
      const selectedLabel = wrapper.querySelector('[data-rm-selected-label]');
      if (selectedLabel) {
        const value = String(this.selected[field.alias] ?? '');
        const option = field.options.find(item => String(item.value) === value);
        selectedLabel.textContent = option?.label ? ` · ${option.label}` : '';
      }
    });
  }
  isAvailable(alias, value) {
    const otherFields = Object.entries(this.selected).filter(_ref6 => {
      let [key] = _ref6;
      return key !== alias;
    });
    return this.data.products.some(product => String(product.fields[alias]) === String(value) && otherFields.every(_ref7 => {
      let [key, selected] = _ref7;
      return String(product.fields[key]) === String(selected);
    }));
  }
  async loadProduct(product) {
    let updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const status = this.container.querySelector('.rmvariants__status');
    const loading = this.container.querySelector('[data-rm-label-loading]')?.textContent || 'Loading…';
    const productScope = this.container.closest('[data-rm-product-scope]');
    if (status) status.textContent = loading;
    this.container.classList.add('rmvariants--loading');
    productScope?.classList.add('rm-product--loading');
    productScope?.setAttribute('aria-busy', 'true');
    if (this.pending) this.pending.abort();
    this.pending = new AbortController();
    const controller = this.pending;
    try {
      const full = await requestProduct(this.container.dataset.endpoint, 'variant', product.id, controller.signal);
      this.applyProduct(full, updateHistory);
      if (status) status.textContent = '';
    } catch (error) {
      if (error.name !== 'AbortError' && status) status.textContent = error.message;
    } finally {
      if (this.pending === controller) {
        this.container.classList.remove('rmvariants--loading');
        productScope?.classList.remove('rm-product--loading');
        productScope?.removeAttribute('aria-busy');
        this.pending = null;
      }
    }
  }
  applyProduct(product) {
    let updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (typeof this.onProduct === 'function') {
      this.onProduct(product);
    } else {
      const source = this.container.closest('[data-rm-product-scope]');
      const scope = source ? resolveProductScope(source) : this.container.parentElement?.closest('.el-item, .uk-card, .rm-product-card') || document;
      scope.querySelectorAll('[radicalmart-cart="product"], [data-radicalmart-cart="product"]').forEach(cart => {
        cart.dataset.id = product.id;
        cart.dataset.rmDynamicProduct = 'true';
      });
    }
    const urlMode = this.container.dataset.updateUrl;
    const historyMethod = urlMode === 'push' ? 'pushState' : urlMode === 'replace' ? 'replaceState' : null;
    if (updateHistory && historyMethod && product.link && typeof window.history?.[historyMethod] === 'function') {
      window.history[historyMethod]({
        ...window.history.state,
        rmProductId: product.id
      }, '', product.link);
    }
    this.container.dispatchEvent(new CustomEvent('radicalmart:variant-change', {
      bubbles: true,
      detail: {
        product
      }
    }));
  }
}
class QuickView {
  constructor() {
    this.cache = new Map();
    this.modal = null;
    this.product = null;
    this.settings = {};
    this.pending = null;
    this.builderContext = null;
    this.modalClasses = [];
  }
  async open(trigger) {
    const id = Number(trigger.dataset.rmQuickView);
    if (!id) return;
    try {
      this.settings = JSON.parse(trigger.dataset.settings || '{}');
    } catch (error) {
      this.settings = {};
    }
    this.ensureModal();
    const root = trigger.closest('[data-rm-quick-view-root]');
    const dialog = this.modal.querySelector('.rmquickview__dialog');
    const label = root?.dataset.rmQuickViewLabel || trigger.textContent.trim() || translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView);
    this.modal.setAttribute('aria-label', label);
    if (dialog) dialog.setAttribute('aria-label', label);
    if (root?.dataset.id) this.modal.dataset.id = root.dataset.id;else delete this.modal.dataset.id;
    this.show();
    this.setLoading();
    this.builderContext = null;
    if (this.pending) this.pending.abort();
    this.pending = new AbortController();
    const controller = this.pending;
    try {
      if (trigger.dataset.contentMode === 'builder' && trigger.dataset.templateId) {
        const key = `${trigger.dataset.endpoint}:layout:${trigger.dataset.templateId}:${id}`;
        const layout = this.cache.has(key) ? clone(this.cache.get(key)) : await requestQuickViewLayout(trigger.dataset.endpoint, id, trigger.dataset.templateId, controller.signal);
        this.cache.set(key, clone(layout));
        this.product = null;
        await this.renderBuilderContent(layout.html, {
          endpoint: trigger.dataset.endpoint,
          templateId: trigger.dataset.templateId,
          productId: id
        }, layout.assets);
        return;
      }
      const key = `${trigger.dataset.endpoint}:${id}`;
      const product = this.cache.has(key) ? clone(this.cache.get(key)) : await requestProduct(trigger.dataset.endpoint, 'quickView', id, controller.signal);
      this.cache.set(key, clone(product));
      this.product = product;
      this.render(product, trigger.dataset.endpoint);
    } catch (error) {
      if (error.name !== 'AbortError') this.renderError(error.message);
    } finally {
      if (this.pending === controller) this.pending = null;
    }
  }
  ensureModal() {
    if (this.modal) return;
    this.modal = element('div', 'rmquickview uk-modal', {
      'uk-modal': true,
      'aria-label': translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView)
    });
    this.modal.innerHTML = `<div class="rmquickview__dialog uk-modal-dialog" role="dialog" aria-modal="true" aria-label="${translate('PLG_YTDYNAMICS_QUICK_VIEW', labels.quickView)}"><button class="rmquickview__close uk-modal-close-default" type="button" uk-close aria-label="${translate('JLIB_HTML_BEHAVIOR_CLOSE', 'Close')}"></button><div class="rmquickview__body uk-modal-body"></div></div>`;
    this.modal.addEventListener('radicalmart:variant-change', event => {
      const productId = Number(event.detail?.product?.id);
      if (this.builderContext && productId) this.loadBuilderProduct(productId);
    });
    document.body.appendChild(this.modal);
  }
  show() {
    this.modal.classList.remove(...this.modalClasses);
    this.modalClasses = String(this.settings.modalClass || '').split(/\s+/).filter(Boolean);
    this.modal.classList.add(...this.modalClasses);
    const modalSize = ['', 'small', 'large', 'xlarge', 'container', 'full'].includes(this.settings.modalSize) ? this.settings.modalSize : 'container';
    const center = this.settings.modalCenter !== false && modalSize !== 'full';
    const bgClose = this.settings.bgClose !== false;
    const escClose = this.settings.escClose !== false;
    const dialog = this.modal.querySelector('.rmquickview__dialog');
    const body = this.modal.querySelector('.rmquickview__body');
    const close = this.modal.querySelector('.rmquickview__close');
    const contentPadding = ['none', 'small', 'default', 'large'].includes(this.settings.contentPadding) ? this.settings.contentPadding : 'default';
    this.modal.classList.toggle('uk-modal-container', modalSize === 'container');
    this.modal.classList.toggle('uk-modal-full', modalSize === 'full');
    this.modal.classList.toggle('uk-flex-top', center);
    this.modal.classList.toggle('rmquickview--small', modalSize === 'small');
    this.modal.classList.toggle('rmquickview--large', modalSize === 'large');
    this.modal.classList.toggle('rmquickview--xlarge', modalSize === 'xlarge');
    this.modal.classList.toggle('rmquickview--mobile-full', this.settings.mobileFullscreen !== false || modalSize === 'full');
    this.modal.setAttribute('uk-modal', `bg-close: ${bgClose}; esc-close: ${escClose}`);
    dialog?.classList.toggle('uk-margin-auto-vertical', center);
    body?.classList.toggle('uk-overflow-auto', this.settings.overflowAuto === true);
    ['none', 'small', 'default', 'large'].forEach(padding => {
      body?.classList.toggle(`rmquickview__body--padding-${padding}`, padding === contentPadding);
    });
    if (close) {
      close.hidden = this.settings.showClose === false;
      close.classList.toggle('uk-close-large', this.settings.closeLarge === true || modalSize === 'full');
      close.classList.toggle('uk-modal-close-default', modalSize !== 'full');
      close.classList.toggle('uk-modal-close-full', modalSize === 'full');
    }
    if (window.UIkit?.modal) {
      const component = window.UIkit.modal(this.modal);
      if (component?.$props) {
        component.$props.bgClose = bgClose;
        component.$props.escClose = escClose;
      }
      component.show();
    } else {
      this.modal.classList.add('uk-open');
      this.modal.style.display = 'block';
    }
  }
  setLoading() {
    const body = this.modal.querySelector('.rmquickview__body');
    body.replaceChildren(element('div', 'rmquickview__loader', {
      'uk-spinner': 'ratio: 1.5'
    }));
  }
  renderError(message) {
    const alert = element('div', 'uk-alert-danger', {
      'uk-alert': true
    });
    alert.append(text(message || translate('PLG_YTDYNAMICS_ERROR_LOAD_PRODUCT', labels.error)));
    this.modal.querySelector('.rmquickview__body').replaceChildren(alert);
  }
  async renderBuilderContent(html) {
    let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.builderContext;
    let assets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const body = this.modal.querySelector('.rmquickview__body');
    if (assets.options && window.Joomla?.loadOptions) {
      window.Joomla.loadOptions(assets.options);
    }
    await loadAssets(assets, 'style');
    const fragment = document.createRange().createContextualFragment(html);
    // A Quick View is an isolated product surface. Its variant controls may
    // re-render the modal, but must never replace the listing URL or the
    // listing document's SEO metadata.
    fragment.querySelectorAll('[data-rm-variants]').forEach(selector => {
      selector.dataset.updateUrl = 'none';
    });
    fragment.querySelectorAll('[data-rm-product-page]').forEach(scope => {
      scope.dataset.updateDocumentTitle = 'false';
      scope.dataset.updateDocumentMetadata = 'false';
    });
    body.replaceChildren(fragment);
    this.builderContext = context;
    await loadAssets(assets, 'script');
    if (typeof window.RadicalMartCart === 'function') ensureRadicalMartDisplay();
    if (window.UIkit?.update) window.UIkit.update(body);
    if (typeof window.RadicalMartCart === 'function') {
      const cart = window.RadicalMartCart();
      if (typeof cart?.loadActions === 'function') cart.loadActions(body);
    }
    body.dispatchEvent(new CustomEvent('ytdynamics:quickview-open', {
      bubbles: true
    }));
  }
  async loadBuilderProduct(productId) {
    const context = this.builderContext;
    if (!context || Number(context.productId) === Number(productId)) return;
    this.setLoading();
    if (this.pending) this.pending.abort();
    this.pending = new AbortController();
    const controller = this.pending;
    try {
      const key = `${context.endpoint}:layout:${context.templateId}:${productId}`;
      const layout = this.cache.has(key) ? clone(this.cache.get(key)) : await requestQuickViewLayout(context.endpoint, productId, context.templateId, controller.signal);
      this.cache.set(key, clone(layout));
      await this.renderBuilderContent(layout.html, {
        ...context,
        productId
      }, layout.assets);
    } catch (error) {
      if (error.name !== 'AbortError') this.renderError(error.message);
    } finally {
      if (this.pending === controller) this.pending = null;
    }
  }
  render(product, endpoint) {
    const body = this.modal.querySelector('.rmquickview__body');
    const layout = element('div', 'rmquickview__layout uk-grid-large uk-flex-middle', {
      'uk-grid': true,
      'data-rm-product-scope': true
    });
    const mediaColumn = element('div', 'rmquickview__media-column uk-width-1-2@m');
    const contentColumn = element('div', 'rmquickview__content uk-width-expand@m');
    mediaColumn.append(this.renderMedia(product.media || []));
    contentColumn.append(this.renderContent(product, endpoint));
    layout.append(mediaColumn, contentColumn);
    body.replaceChildren(layout);
    if (window.UIkit?.update) window.UIkit.update(body);
  }
  renderMedia(media) {
    const wrapper = element('div', 'rmquickview__media');
    const main = element('button', 'rmquickview__main-image', {
      type: 'button'
    });
    const image = element('img', '', {
      loading: 'eager'
    });
    const placeholder = element('span', 'rmquickview__placeholder uk-text-muted');
    const placeholderIcon = element('span', '', {
      'uk-icon': 'icon: image; ratio: 2.5'
    });
    const placeholderText = element('span', 'uk-display-block uk-text-small uk-margin-small-top');
    placeholderText.append(text(translate('PLG_YTDYNAMICS_NO_IMAGE', labels.noImage)));
    placeholder.append(placeholderIcon, placeholderText);
    const items = media.length ? media : [{
      src: '',
      alt: this.product?.title || ''
    }];
    const select = index => {
      const item = items[index];
      if (item.src) image.src = item.src;else image.removeAttribute('src');
      image.alt = item.alt || this.product?.title || '';
      main.disabled = !item.src;
      main.classList.toggle('rmquickview__main-image--empty', !item.src);
      image.hidden = !item.src;
      placeholder.hidden = Boolean(item.src);
      wrapper.querySelectorAll('.rmquickview__thumb').forEach((thumb, thumbIndex) => {
        thumb.classList.toggle('rmquickview__thumb--active', thumbIndex === index);
        thumb.setAttribute('aria-pressed', thumbIndex === index ? 'true' : 'false');
      });
    };
    main.append(image, placeholder);
    main.addEventListener('click', () => {
      if (image.src && window.UIkit?.lightboxPanel) {
        window.UIkit.lightboxPanel({
          items: items.filter(item => item.src).map(item => ({
            source: item.src,
            caption: item.alt
          }))
        }).show(0);
      }
    });
    wrapper.append(main);
    if (items.length > 1) {
      const thumbs = element('div', 'rmquickview__thumbs uk-flex uk-flex-center uk-flex-wrap');
      items.forEach((item, index) => {
        const button = element('button', 'rmquickview__thumb', {
          type: 'button',
          'aria-label': item.alt || `${index + 1}`
        });
        button.append(element('img', '', {
          src: item.src,
          alt: '',
          loading: 'lazy'
        }));
        button.addEventListener('click', () => select(index));
        thumbs.append(button);
      });
      wrapper.append(thumbs);
    }
    select(0);
    return wrapper;
  }
  renderContent(product, endpoint) {
    const fragment = document.createDocumentFragment();
    const title = element('h2', 'rmquickview__title uk-h2 uk-margin-remove-top');
    const link = element('a', 'uk-link-heading', {
      href: product.link
    });
    link.append(text(product.title));
    title.append(link);
    fragment.append(title);
    if (this.settings.showCode && product.code) {
      const code = element('div', 'rmquickview__code uk-text-meta uk-margin-small-bottom');
      code.append(text(product.code));
      fragment.append(code);
    }
    const price = element('div', 'rmquickview__price uk-text-large uk-text-bold');
    if (product.price?.discountEnabled && product.price.base) {
      const oldPrice = element('s', 'uk-text-muted uk-margin-small-right');
      oldPrice.append(text(product.price.base));
      price.append(oldPrice);
    }
    const finalPrice = element('span', '', {
      'data-rm-price': true
    });
    finalPrice.append(text(product.price?.final));
    price.append(finalPrice);
    fragment.append(price);
    const stock = element('div', `rmquickview__stock uk-margin-small-top ${product.inStock ? 'uk-text-success' : 'uk-text-muted'}`, {
      'data-rm-stock': true
    });
    stock.append(text(product.inStock ? translate('COM_RADICALMART_IN_STOCK', labels.inStock) : translate('COM_RADICALMART_NOT_IN_STOCK', labels.outOfStock)));
    fragment.append(stock);
    if (this.settings.showDescription && product.introtext) {
      const description = element('p', 'rmquickview__description uk-margin');
      description.append(text(product.introtext));
      fragment.append(description);
    }
    if (this.settings.showVariants && product.variants?.fields?.length) {
      const variants = this.renderVariants(product.variants, endpoint);
      fragment.append(variants);
    }
    if (this.settings.showCart) fragment.append(this.renderCart(product));
    const more = element('a', 'rmquickview__more uk-button uk-button-text uk-margin-top', {
      href: product.link
    });
    more.append(text(translate('PLG_YTDYNAMICS_DETAILS', labels.details)));
    fragment.append(more);
    return fragment;
  }
  renderVariants(data, endpoint) {
    const container = element('div', 'rmvariants rmquickview__variants uk-form-stacked', {
      'data-rm-variants': true,
      'data-endpoint': endpoint,
      'data-action': 'ajax',
      'data-disable-unavailable': 'true',
      'data-update-url': 'false'
    });
    const current = data.products.find(item => Number(item.id) === Number(data.currentProduct));
    data.fields.forEach(field => {
      const fieldset = element('fieldset', 'rmvariants__field uk-fieldset', {
        'data-rm-field': field.alias
      });
      const legend = element('legend', 'rmvariants__label uk-form-label');
      legend.append(text(field.title));
      const options = element('div', 'rmvariants__options uk-flex uk-flex-wrap uk-flex-middle', {
        role: 'group',
        'aria-label': field.title
      });
      field.options.forEach(option => {
        const active = String(current?.fields[field.alias]) === String(option.value);
        const swatch = option.image || option.color;
        const button = element('button', `rmvariants__option uk-button uk-button-default${swatch ? ' rmvariants__option--swatch' : ''}`, {
          type: 'button',
          'data-rm-value': option.value,
          'aria-pressed': active ? 'true' : 'false',
          title: option.label
        });
        if (option.image) button.append(element('img', '', {
          src: option.image,
          alt: '',
          loading: 'lazy'
        }));else if (option.color) {
          const color = element('span', 'rmvariants__color');
          color.style.setProperty('--rm-swatch', option.color);
          button.append(color);
        } else button.append(text(option.label));
        options.append(button);
      });
      fieldset.append(legend, options);
      container.append(fieldset);
    });
    container.append(element('div', 'rmvariants__status uk-text-small', {
      'aria-live': 'polite'
    }));
    new VariantPicker(container, data, selected => this.updateProduct(selected)).init();
    return container;
  }
  renderCart(product) {
    const row = element('div', 'rmquickview__cart uk-flex uk-flex-middle uk-flex-wrap uk-margin-top');
    const quantity = element('input', 'uk-input uk-form-width-xsmall', {
      type: 'number',
      value: product.quantity?.min || 1,
      min: product.quantity?.min || 1,
      step: product.quantity?.step || 1,
      max: product.quantity?.max,
      'aria-label': translate('PLG_YTDYNAMICS_QUANTITY', labels.quantity)
    });
    const button = element('button', 'uk-button uk-button-primary', {
      type: 'button'
    });
    button.append(text(translate('COM_RADICALMART_CART_ADD', labels.addToCart)));
    button.disabled = !product.inStock;
    button.addEventListener('click', () => {
      if (window.RadicalMartCart && this.product?.id) {
        window.RadicalMartCart().addProduct(Number(this.product.id), Number(quantity.value) || 1);
      }
    });
    row.append(quantity, button);
    return row;
  }
  updateProduct(product) {
    this.product = {
      ...this.product,
      ...product
    };
    const body = this.modal.querySelector('.rmquickview__body');
    const title = body.querySelector('.rmquickview__title a');
    const price = body.querySelector('.rmquickview__price');
    const stock = body.querySelector('[data-rm-stock]');
    const code = body.querySelector('.rmquickview__code');
    const description = body.querySelector('.rmquickview__description');
    const cart = body.querySelector('.rmquickview__cart .uk-button-primary');
    if (title) {
      title.textContent = product.title;
      title.href = product.link;
    }
    if (price) {
      price.replaceChildren();
      if (product.price?.discountEnabled && product.price.base) {
        const oldPrice = element('s', 'uk-text-muted uk-margin-small-right');
        oldPrice.append(text(product.price.base));
        price.append(oldPrice);
      }
      const finalPrice = element('span', '', {
        'data-rm-price': true
      });
      finalPrice.append(text(product.price?.final));
      price.append(finalPrice);
    }
    if (code) code.textContent = product.code || '';
    if (description) description.textContent = product.introtext || '';
    if (stock) {
      stock.textContent = product.inStock ? translate('COM_RADICALMART_IN_STOCK', labels.inStock) : translate('COM_RADICALMART_NOT_IN_STOCK', labels.outOfStock);
      stock.classList.toggle('uk-text-success', product.inStock);
      stock.classList.toggle('uk-text-muted', !product.inStock);
    }
    if (cart) cart.disabled = !product.inStock;
    const media = body.querySelector('.rmquickview__media');
    if (media) media.replaceWith(this.renderMedia(product.media || []));
    const more = body.querySelector('.rmquickview__more');
    if (more) more.href = product.link;
  }
}
const quickView = new QuickView();
const cartFeedbackTimers = new WeakMap();
const prepareCartButton = button => {
  if (!button.dataset.rmCartOriginal) button.dataset.rmCartOriginal = button.innerHTML;
  window.clearTimeout(cartFeedbackTimers.get(button));
};
const showCartPending = (cart, button) => {
  prepareCartButton(button);
  button.textContent = cart.dataset.rmCartLoading || labels.loading;
  button.setAttribute('aria-busy', 'true');
};
const showCartFeedback = event => {
  if (event.detail?.error) return;
  const productId = Number(event.detail?.entry?.product_id || 0);
  if (!productId) return;
  document.querySelectorAll(`[radicalmart-cart="product"][data-id="${productId}"], ` + `[data-radicalmart-cart="product"][data-id="${productId}"]`).forEach(cart => {
    const button = cart.querySelector('[radicalmart-cart="add"], [data-radicalmart-cart="add"]');
    if (!button) return;
    prepareCartButton(button);
    button.textContent = cart.dataset.rmCartSuccess || labels.cartAdded;
    button.classList.add('rm-buy__button--success');
    button.removeAttribute('aria-busy');
    button.setAttribute('aria-live', 'polite');
    const timer = window.setTimeout(() => {
      button.innerHTML = button.dataset.rmCartOriginal;
      button.classList.remove('rm-buy__button--success');
      button.removeAttribute('aria-live');
      cartFeedbackTimers.delete(button);
    }, 2200);
    cartFeedbackTimers.set(button, timer);
  });
};
const resetPendingCartButtons = () => {
  document.querySelectorAll('[radicalmart-cart="add"][aria-busy="true"], [data-radicalmart-cart="add"][aria-busy="true"]').forEach(button => {
    if (button.dataset.rmCartOriginal) button.innerHTML = button.dataset.rmCartOriginal;
    button.removeAttribute('aria-busy');
  });
};
const init = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('[data-rm-product-scope]')) new ProductScope(root).init();
  root.querySelectorAll?.('[data-rm-product-scope]').forEach(scope => new ProductScope(scope).init());
  if (root.matches?.('[data-rm-product-card-dropdown]')) new ProductCardDropdown(root).init();
  root.querySelectorAll?.('[data-rm-product-card-dropdown]').forEach(dropdown => new ProductCardDropdown(dropdown).init());
  if (root.matches?.('[data-rm-product-card-position]')) new ProductCardPosition(root).init();
  root.querySelectorAll?.('[data-rm-product-card-position]').forEach(position => new ProductCardPosition(position).init());
  if (root.matches?.('[data-rm-product-hover-gallery]')) new ProductHoverGallery(root).init();
  root.querySelectorAll?.('[data-rm-product-hover-gallery]').forEach(gallery => new ProductHoverGallery(gallery).init());
  if (root.matches?.('[data-rm-variants]')) new VariantPicker(root).init();
  root.querySelectorAll?.('[data-rm-variants]').forEach(container => new VariantPicker(container).init());
  if (root.matches?.('[data-rm-bulk-actions]')) new ProductBulkActions(root).init();
  root.querySelectorAll?.('[data-rm-bulk-actions]').forEach(container => new ProductBulkActions(container).init());
  if (root.matches?.('[data-rm-product-action]')) new ProductOptionalAction(root).init();
  root.querySelectorAll?.('[data-rm-product-action]').forEach(button => new ProductOptionalAction(button).init());
};
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-rm-quick-view]');
  if (trigger) {
    event.preventDefault();
    event.stopPropagation();
    quickView.open(trigger);
  }
}, true);

// RadicalMart binds the product id into its original click closure. Intercept
// only carts explicitly updated by RM Variants, so the current id is respected.
document.addEventListener('click', event => {
  const add = event.target.closest('[radicalmart-cart="add"], [data-radicalmart-cart="add"]');
  const cart = add?.closest('[radicalmart-cart="product"], [data-radicalmart-cart="product"]');
  if (!add || !cart?.dataset.rmDynamicProduct || !window.RadicalMartCart) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  showCartPending(cart, add);
  const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
  window.RadicalMartCart().addProduct(Number(cart.dataset.id), Number(quantity?.value) || 1);
}, true);
document.addEventListener('onRadicalMartCartAfterAddProduct', showCartFeedback);
document.addEventListener('onRadicalMartCartError', resetPendingCartButtons);
document.addEventListener('DOMContentLoaded', () => init());
new MutationObserver(mutations => mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
  if (node.nodeType === Node.ELEMENT_NODE) init(node);
}))).observe(document.documentElement, {
  childList: true,
  subtree: true
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9wcm9kdWN0LWludGVyYWN0aW9ucy5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvcHJvZHVjdC1pbnRlcmFjdGlvbnMuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9wcm9kdWN0LWludGVyYWN0aW9ucy5zY3NzJztcblxuY29uc3QgdGV4dCA9ICh2YWx1ZSkgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUgfHwgJycpO1xuY29uc3QgY2xvbmUgPSAodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHZhbHVlO1xuICAgIHJldHVybiB0eXBlb2Ygc3RydWN0dXJlZENsb25lID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gc3RydWN0dXJlZENsb25lKHZhbHVlKVxuICAgICAgICA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn07XG5cbmNvbnN0IHByb2R1Y3REaXNjb3VudFRleHQgPSAocHJpY2UgPSB7fSwgbW9kZSA9ICdhbW91bnQnKSA9PiB7XG4gICAgaWYgKG1vZGUgPT09ICdsZWdhY3knKSByZXR1cm4gU3RyaW5nKHByaWNlLmRpc2NvdW50IHx8ICcnKTtcblxuICAgIGNvbnN0IGJhc2UgPSBOdW1iZXIocHJpY2UuYmFzZVZhbHVlKSB8fCAwO1xuICAgIGNvbnN0IGZpbmFsID0gTnVtYmVyKHByaWNlLmZpbmFsVmFsdWUpIHx8IDA7XG4gICAgY29uc3QgcGVyY2VudCA9IGJhc2UgPiAwICYmIGZpbmFsIDwgYmFzZVxuICAgICAgICA/IE1hdGgubWF4KDAsIE1hdGgucm91bmQoKChiYXNlIC0gZmluYWwpIC8gYmFzZSkgKiAxMDApKVxuICAgICAgICA6IDA7XG4gICAgY29uc3QgYW1vdW50ID0gU3RyaW5nKHByaWNlLmRpc2NvdW50IHx8ICcnKS5yZXBsYWNlKC9eWy3iiJJcXHNdKy8sICcnKTtcbiAgICBjb25zdCBwZXJjZW50VGV4dCA9IHBlcmNlbnQgPiAwID8gYC0ke3BlcmNlbnR9JWAgOiAnJztcbiAgICBjb25zdCBhbW91bnRUZXh0ID0gYW1vdW50ID8gYC0ke2Ftb3VudH1gIDogJyc7XG5cbiAgICBpZiAobW9kZSA9PT0gJ3BlcmNlbnQnKSByZXR1cm4gcGVyY2VudFRleHQ7XG4gICAgaWYgKG1vZGUgPT09ICdib3RoJykgcmV0dXJuIFtwZXJjZW50VGV4dCwgYW1vdW50VGV4dF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyDCtyAnKTtcbiAgICByZXR1cm4gYW1vdW50VGV4dDtcbn07XG5cbmNvbnN0IGxvYWRlZEFzc2V0cyA9IG5ldyBNYXAoKTtcblxuY29uc3QgYXNzZXRLZXkgPSAoYXNzZXQsIHR5cGUpID0+IGAke3R5cGV9OiR7YXNzZXQubmFtZSB8fCBhc3NldC51cmkgfHwgYXNzZXQuY29udGVudCB8fCAnJ31gO1xuXG5jb25zdCBsb2FkQXNzZXQgPSAoYXNzZXQsIHR5cGUpID0+IHtcbiAgICBjb25zdCBrZXkgPSBhc3NldEtleShhc3NldCwgdHlwZSk7XG4gICAgaWYgKCFrZXkgfHwgbG9hZGVkQXNzZXRzLmhhcyhrZXkpKSByZXR1cm4gbG9hZGVkQXNzZXRzLmdldChrZXkpIHx8IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYXNzZXQudXJpID8gbmV3IFVSTChhc3NldC51cmksIGRvY3VtZW50LmJhc2VVUkkpLmhyZWYgOiAnJztcbiAgICBjb25zdCBleGlzdGluZyA9IHRhcmdldFVybFxuICAgICAgICA/IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0eXBlID09PSAnc3R5bGUnID8gJ2xpbmtbaHJlZl0nIDogJ3NjcmlwdFtzcmNdJykpXG4gICAgICAgICAgICAuZmluZCgobm9kZSkgPT4gKHR5cGUgPT09ICdzdHlsZScgPyBub2RlLmhyZWYgOiBub2RlLnNyYykgPT09IHRhcmdldFVybClcbiAgICAgICAgOiBudWxsO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgICBjb25zdCByZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBsb2FkZWRBc3NldHMuc2V0KGtleSwgcmVhZHkpO1xuICAgICAgICByZXR1cm4gcmVhZHk7XG4gICAgfVxuXG4gICAgbGV0IG5vZGUgPSBudWxsO1xuICAgIGNvbnN0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlID09PSAnc3R5bGUnICYmICFhc3NldC51cmkgPyAnc3R5bGUnXG4gICAgICAgICAgICA6IHR5cGUgPT09ICdzdHlsZScgPyAnbGluaycgOiAnc2NyaXB0Jyk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBhc3NldC5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3R5bGUnICYmIGFzc2V0LnVyaSkge1xuICAgICAgICAgICAgbm9kZS5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBub2RlLmhyZWYgPSBhc3NldC51cmk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NjcmlwdCcgJiYgYXNzZXQudXJpKSB7XG4gICAgICAgICAgICBub2RlLnNyYyA9IGFzc2V0LnVyaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBhc3NldC5jb250ZW50IHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBmYWxzZSAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgbm9uY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbbm9uY2VdLHN0eWxlW25vbmNlXScpPy5ub25jZTtcbiAgICAgICAgaWYgKG5vbmNlKSBub2RlLm5vbmNlID0gbm9uY2U7XG5cbiAgICAgICAgaWYgKGFzc2V0LnVyaSkge1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSwge29uY2U6IHRydWV9KTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QobmV3IEVycm9yKGBVbmFibGUgdG8gbG9hZCBhc3NldDogJHthc3NldC51cml9YCkpLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKG5vZGUpO1xuICAgICAgICBpZiAoIWFzc2V0LnVyaSkgcmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsb2FkZWRBc3NldHMuZGVsZXRlKGtleSk7XG4gICAgICAgIG5vZGU/LnJlbW92ZSgpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbiAgICBsb2FkZWRBc3NldHMuc2V0KGtleSwgcmVhZHkpO1xuICAgIHJldHVybiByZWFkeTtcbn07XG5cbmNvbnN0IGxvYWRBc3NldHMgPSBhc3luYyAoYXNzZXRzID0ge30sIHR5cGUpID0+IHtcbiAgICBmb3IgKGNvbnN0IGFzc2V0IG9mIGFzc2V0c1t0eXBlXSB8fCBbXSkge1xuICAgICAgICBhd2FpdCBsb2FkQXNzZXQoYXNzZXQsIHR5cGUpO1xuICAgIH1cbn07XG5cbmNvbnN0IGVuc3VyZVJhZGljYWxNYXJ0RGlzcGxheSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LlJhZGljYWxNYXJ0RGlzcGxheSkgcmV0dXJuO1xuXG4gICAgLy8gY29tX3JhZGljYWxtYXJ0LnNpdGUgbm9ybWFsbHkgY3JlYXRlcyB0aGlzIG9iamVjdCBvbiBET01Db250ZW50TG9hZGVkLlxuICAgIC8vIEJ1aWxkZXIgYXNzZXRzIGNhbiBiZSBsb2FkZWQgbGF0ZXIgYnkgUXVpY2sgVmlldywgc28gaW5pdGlhbGlzZSB0aGUgc2FtZVxuICAgIC8vIHB1YmxpYyBkZWZhdWx0cyB3aXRob3V0IGRpc3BhdGNoaW5nIERPTUNvbnRlbnRMb2FkZWQgYSBzZWNvbmQgdGltZS5cbiAgICB3aW5kb3cuUmFkaWNhbE1hcnREaXNwbGF5ID0ge1xuICAgICAgICBjYXJ0OiB7XG4gICAgICAgICAgICBhZGRCdXR0b25zTG9jazogdHJ1ZSxcbiAgICAgICAgICAgIGRpc3BsYXlNb2R1bGVCdXR0b25zTG9jazogdHJ1ZSxcbiAgICAgICAgICAgIGRpc2NvdW50SGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIHByb2R1Y3RzRGlzY291bnRIaWRlOiB0cnVlLFxuICAgICAgICAgICAgYmFkZ2VIaWRlOiB0cnVlLFxuICAgICAgICAgICAgbW9kdWxlSGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIG1vZHVsZVNob3c6IHRydWUsXG4gICAgICAgICAgICBwYWdlRXJyb3JzOiB0cnVlLFxuICAgICAgICAgICAgcGFnZVJlbG9hZDogdHJ1ZSxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbl9hZGRTaG93OiB0cnVlLFxuICAgICAgICAgICAgZXJyb3JzU2hvdzogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjaGVja291dDoge1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uc0xvY2s6IHRydWUsXG4gICAgICAgICAgICBkaXNjb3VudEhpZGU6IHRydWUsXG4gICAgICAgICAgICBjaGVja0Vycm9yc1Nob3c6IHRydWUsXG4gICAgICAgICAgICBjaGVja0Vycm9yc1Byb2R1Y3RzU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGdsb2JhbExvYWRpbmdTaG93OiB0cnVlLFxuICAgICAgICAgICAgc2hpcHBpbmdMb2FkaW5nU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHBheW1lbnRMb2FkaW5nU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGxvZ2luU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yc1Nob3c6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVPcmRlclByb2dyZXNzOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2luOiB7XG4gICAgICAgICAgICBidXR0b25zTG9jazogdHJ1ZSxcbiAgICAgICAgICAgIGZyb21TaG93OiB0cnVlLFxuICAgICAgICAgICAgZXJyb3JzU2hvdzogdHJ1ZVxuICAgICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb25SYWRpY2FsTWFydERpc3BsYXlBZnRlclNldENvbmZpZycsIHtcbiAgICAgICAgZGV0YWlsOiB3aW5kb3cuUmFkaWNhbE1hcnREaXNwbGF5XG4gICAgfSkpO1xufTtcblxuY29uc3QgdHJhbnNsYXRlID0gKGtleSwgZmFsbGJhY2spID0+IHtcbiAgICBjb25zdCB0cmFuc2xhdGVkID0gd2luZG93Lkpvb21sYT8uVGV4dD8uXz8uKGtleSk7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZWQgJiYgdHJhbnNsYXRlZCAhPT0ga2V5ID8gdHJhbnNsYXRlZCA6IGZhbGxiYWNrO1xufTtcblxuY29uc3QgbGFiZWxzID0ge1xuICAgIGxvYWRpbmc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfTE9BRElORycsICdMb2FkaW5n4oCmJyksXG4gICAgZXJyb3I6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfRVJST1JfTE9BRF9QUk9EVUNUJywgJ1VuYWJsZSB0byBsb2FkIHByb2R1Y3QuJyksXG4gICAgZW1wdHlQcm9kdWN0OiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0VSUk9SX0VNUFRZX1BST0RVQ1QnLCAnUHJvZHVjdCBkYXRhIGlzIGVtcHR5LicpLFxuICAgIGVtcHR5UXVpY2tWaWV3OiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0VSUk9SX0VNUFRZX1FVSUNLX1ZJRVcnLCAnUXVpY2sgVmlldyBsYXlvdXQgaXMgZW1wdHkuJyksXG4gICAgaW5TdG9jazogdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfSU5fU1RPQ0snLCAnSW4gc3RvY2snKSxcbiAgICBvdXRPZlN0b2NrOiB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9OT1RfSU5fU1RPQ0snLCAnTm90IGF2YWlsYWJsZScpLFxuICAgIHF1YW50aXR5OiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVQU5USVRZJywgJ1F1YW50aXR5JyksXG4gICAgYWRkVG9DYXJ0OiB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9DQVJUX0FERCcsICdBZGQgdG8gY2FydCcpLFxuICAgIGNhcnRBZGRlZDogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19DQVJUX0FEREVEJywgJ1Byb2R1Y3QgYWRkZWQgdG8gY2FydCcpLFxuICAgIGRldGFpbHM6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfREVUQUlMUycsICdEZXRhaWxzJyksXG4gICAgcXVpY2tWaWV3OiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVSUNLX1ZJRVcnLCAnUXVpY2sgdmlldycpLFxuICAgIG5vSW1hZ2U6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfTk9fSU1BR0UnLCAnTm8gaW1hZ2UnKVxufTtcblxuY29uc3QgZWxlbWVudCA9ICh0YWcsIGNsYXNzTmFtZSA9ICcnLCBhdHRyaWJ1dGVzID0ge30pID0+IHtcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGlmIChjbGFzc05hbWUpIG5vZGUuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmNvbnN0IHJlcXVlc3RQcm9kdWN0ID0gYXN5bmMgKGVuZHBvaW50LCB0YXNrLCBwcm9kdWN0SWQsIHNpZ25hbCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3Rhc2snLCB0YXNrKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncHJvZHVjdF9pZCcsIHByb2R1Y3RJZCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybC50b1N0cmluZygpLCB7XG4gICAgICAgIGhlYWRlcnM6IHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCd9LFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgc2lnbmFsXG4gICAgfSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rIHx8IHBheWxvYWQuc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSB8fCBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IHBheWxvYWQuZGF0YTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgZGF0YVswXSA9PT0gJ29iamVjdCcpIGRhdGEgPSBkYXRhWzBdO1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS5pZCkgdGhyb3cgbmV3IEVycm9yKGxhYmVscy5lbXB0eVByb2R1Y3QpO1xuICAgIHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgcmVxdWVzdFF1aWNrVmlld0xheW91dCA9IGFzeW5jIChlbmRwb2ludCwgcHJvZHVjdElkLCB0ZW1wbGF0ZUlkLCBzaWduYWwgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0YXNrJywgJ3F1aWNrVmlld0xheW91dCcpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcm9kdWN0X2lkJywgcHJvZHVjdElkKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndGVtcGxhdGVfaWQnLCB0ZW1wbGF0ZUlkKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgaGVhZGVyczogeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J30sXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBzaWduYWxcbiAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcGF5bG9hZC5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5tZXNzYWdlIHx8IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gcGF5bG9hZC5kYXRhO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAxICYmIHR5cGVvZiBkYXRhWzBdID09PSAnb2JqZWN0JykgZGF0YSA9IGRhdGFbMF07XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmh0bWwpIHRocm93IG5ldyBFcnJvcihsYWJlbHMuZW1wdHlRdWlja1ZpZXcpO1xuICAgIHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2R1Y3RTY29wZSA9IChzb3VyY2UpID0+IHtcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuIGRvY3VtZW50O1xuXG4gICAgLy8gSW5zaWRlIFJNIEdyaWQsIHRoZSBncmlkIGl0ZW0gaXMgdGhlIHZpc3VhbCBjYXJkLiBVc2UgaXQgYXMgdGhlIGhvdmVyIGFuZFxuICAgIC8vIHVwZGF0ZSBzY29wZSBzbyBSTSBQcm9kdWN0IENhcmQgZG9lcyBub3QgY3JlYXRlIGEgc2Vjb25kIGNhcmQgc3VyZmFjZSBhbmRcbiAgICAvLyB0aGUgcmV2ZWFsIHBhbmVsIGNhbiBhbGlnbiB3aXRoIHRoZSBjb21wbGV0ZSBncmlkIGl0ZW0uXG4gICAgcmV0dXJuIHNvdXJjZS5wYXJlbnRFbGVtZW50Py5jbG9zZXN0KCcucm0tZ3JpZC1pdGVtLCAuZWwtaXRlbScpIHx8IHNvdXJjZTtcbn07XG5cbmNvbnN0IGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSA9IChub2RlLCBmaWVsZCkgPT4ge1xuICAgIG5vZGUuaW5uZXJIVE1MID0gZmllbGQudmFsdWUgfHwgJyc7XG4gICAgaWYgKCFub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIGZpZWxkLnRleHQpIG5vZGUuYXBwZW5kKHRleHQoZmllbGQudGV4dCkpO1xufTtcblxuY29uc3QgdXBkYXRlT3B0aW9uYWxFbGVtZW50ID0gKG5vZGUsIGF2YWlsYWJsZSkgPT4ge1xuICAgIG5vZGUuaGlkZGVuID0gIWF2YWlsYWJsZTtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhdmFpbGFibGUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbn07XG5cbmNvbnN0IGZpbmRQcm9kdWN0RmllbGQgPSAocHJvZHVjdCA9IHt9LCBhbGlhcyA9ICcnKSA9PiB7XG4gICAgaWYgKCFhbGlhcykgcmV0dXJuIG51bGw7XG4gICAgZm9yIChjb25zdCBmaWVsZHNldCBvZiBwcm9kdWN0LmZpZWxkc2V0cyB8fCBbXSkge1xuICAgICAgICBjb25zdCBmaWVsZCA9IChmaWVsZHNldC5maWVsZHMgfHwgW10pLmZpbmQoKGl0ZW0pID0+IFN0cmluZyhpdGVtLmFsaWFzIHx8ICcnKSA9PT0gYWxpYXMpO1xuICAgICAgICBpZiAoZmllbGQpIHJldHVybiBmaWVsZDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0Q3VzdG9tRmllbGQgPSAoY29udGFpbmVyLCBwcm9kdWN0ID0ge30pID0+IHtcbiAgICBjb25zdCBmaWVsZCA9IGZpbmRQcm9kdWN0RmllbGQocHJvZHVjdCwgY29udGFpbmVyLmRhdGFzZXQuZmllbGRBbGlhcyB8fCAnJyk7XG4gICAgY29uc3QgZmFsbGJhY2sgPSBjb250YWluZXIuZGF0YXNldC5lbXB0eVRleHQgfHwgJyc7XG4gICAgY29uc3QgbGFiZWwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1jdXN0b20tbGFiZWxdJyk7XG4gICAgY29uc3QgdmFsdWUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1jdXN0b20tdmFsdWVdJyk7XG4gICAgY29uc3QgYXZhaWxhYmxlID0gQm9vbGVhbihmaWVsZCkgfHwgZmFsbGJhY2sgIT09ICcnO1xuXG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gYCR7ZmllbGQ/LnRpdGxlIHx8IGNvbnRhaW5lci5kYXRhc2V0LmZpZWxkQWxpYXMgfHwgJyd9JHtjb250YWluZXIuZGF0YXNldC5sYWJlbFNlcGFyYXRvciB8fCAnJ31gO1xuICAgICAgICBsYWJlbC5oaWRkZW4gPSBjb250YWluZXIuZGF0YXNldC5zaG93TGFiZWwgIT09ICd0cnVlJztcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChmaWVsZCAmJiBjb250YWluZXIuZGF0YXNldC52YWx1ZU1vZGUgPT09ICdmb3JtYXR0ZWQnKSB7XG4gICAgICAgICAgICB2YWx1ZS5pbm5lckhUTUwgPSBmaWVsZC52YWx1ZSB8fCAnJztcbiAgICAgICAgICAgIGlmICghdmFsdWUuY2hpbGROb2Rlcy5sZW5ndGggJiYgZmllbGQudGV4dCkgdmFsdWUuYXBwZW5kKHRleHQoZmllbGQudGV4dCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUudGV4dENvbnRlbnQgPSBmaWVsZD8udGV4dCB8fCBmYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQoY29udGFpbmVyLCBhdmFpbGFibGUpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvZHVjdEJhZGdlcyA9IChjb250YWluZXIsIGJhZGdlcyA9IFtdKSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLm1heCgwLCBOdW1iZXIoY29udGFpbmVyLmRhdGFzZXQubGltaXQpIHx8IDApO1xuICAgIGNvbnN0IGl0ZW1zID0gbGltaXQgPyBiYWRnZXMuc2xpY2UoMCwgbGltaXQpIDogYmFkZ2VzO1xuICAgIGNvbnN0IGxpc3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1iYWRnZXMtbGlzdF0nKTtcbiAgICBpZiAoIWxpc3QpIHJldHVybjtcblxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGl0ZW1zLmZvckVhY2goKGJhZGdlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhZyA9IGNvbnRhaW5lci5kYXRhc2V0LmxpbmtCYWRnZXMgIT09ICdmYWxzZScgJiYgYmFkZ2UubGluayA/ICdhJyA6ICdzcGFuJztcbiAgICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnQodGFnLCAncm0tcHJvZHVjdC1iYWRnZXNfX2l0ZW0nKTtcbiAgICAgICAgaWYgKHRhZyA9PT0gJ2EnKSBpdGVtLmhyZWYgPSBiYWRnZS5saW5rO1xuICAgICAgICBpZiAoYmFkZ2UuaWNvbiAmJiBjb250YWluZXIuZGF0YXNldC5zaG93SWNvbnMgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGVsZW1lbnQoJ2ltZycsICdybS1wcm9kdWN0LWJhZGdlc19faWNvbicsIHtcbiAgICAgICAgICAgICAgICBzcmM6IGJhZGdlLmljb24sXG4gICAgICAgICAgICAgICAgYWx0OiBiYWRnZS50aXRsZSB8fCAnJyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiAnbGF6eSdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuZGF0YXNldC5zaG93VGl0bGVzID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGVsZW1lbnQoJ3NwYW4nLCAncm0tcHJvZHVjdC1iYWRnZXNfX2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXBwZW5kKHRleHQoYmFkZ2UudGl0bGUpKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZChsYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGNvbnRhaW5lci5kYXRhc2V0LmxhYmVsU3R5bGUgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGVsZW1lbnQoJ3NwYW4nLCBgcm0tcHJvZHVjdC1iYWRnZXNfX2xhYmVsIHVrLWxhYmVsJHtzdHlsZSA/IGAgdWstbGFiZWwtJHtzdHlsZX1gIDogJyd9YCk7XG4gICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChiYWRnZS50aXRsZSkpO1xuICAgICAgICAgICAgaXRlbS5hcHBlbmQobGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChpdGVtKTtcbiAgICB9KTtcbiAgICBsaXN0LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG4gICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KGNvbnRhaW5lciwgaXRlbXMubGVuZ3RoID4gMCk7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0UmF0aW5nID0gKGNvbnRhaW5lciwgcmF0aW5nID0ge30pID0+IHtcbiAgICBjb25zdCBhdmFpbGFibGUgPSBCb29sZWFuKHJhdGluZy5hdmFpbGFibGUpO1xuICAgIGNvbnN0IHZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oTnVtYmVyKHJhdGluZy5tYXgpIHx8IDUsIE51bWJlcihyYXRpbmcudmFsdWUpIHx8IDApKTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCgxLCBOdW1iZXIocmF0aW5nLm1heCkgfHwgNSk7XG4gICAgY29uc3QgcGVyY2VudCA9IGAkeyh2YWx1ZSAvIG1heCkgKiAxMDB9JWA7XG4gICAgY29uc3Qgc3RhcnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1yYXRpbmctc3RhcnNdJyk7XG4gICAgY29uc3QgdmFsdWVOb2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcmF0aW5nLXZhbHVlXScpO1xuICAgIGNvbnN0IGNvdW50Tm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXJhdGluZy1jb3VudF0nKTtcbiAgICBpZiAoc3RhcnMpIHN0YXJzLnN0eWxlLnNldFByb3BlcnR5KCctLXJtLXByb2R1Y3QtcmF0aW5nLXBlcmNlbnQnLCBwZXJjZW50KTtcbiAgICBpZiAodmFsdWVOb2RlKSB2YWx1ZU5vZGUudGV4dENvbnRlbnQgPSB2YWx1ZS50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHttYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDF9KTtcbiAgICBpZiAoY291bnROb2RlKSB7XG4gICAgICAgIGNvdW50Tm9kZS50ZXh0Q29udGVudCA9IFN0cmluZyhNYXRoLm1heCgwLCBOdW1iZXIocmF0aW5nLmNvdW50KSB8fCAwKSk7XG4gICAgICAgIGNvdW50Tm9kZS5oaWRkZW4gPSBjb250YWluZXIuZGF0YXNldC5zaG93Q291bnQgIT09ICd0cnVlJztcbiAgICB9XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke3ZhbHVlfSAvICR7bWF4fWApO1xuICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChjb250YWluZXIsIGF2YWlsYWJsZSB8fCBjb250YWluZXIuZGF0YXNldC5zaG93RW1wdHkgPT09ICd0cnVlJyk7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0Qm9udXMgPSAoY29udGFpbmVyLCBib251cyA9IHt9KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1ib251cy12YWx1ZV0nKTtcbiAgICBpZiAodmFsdWUpIHZhbHVlLnRleHRDb250ZW50ID0gYm9udXMudGV4dCB8fCAnJztcbiAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQoY29udGFpbmVyLCBCb29sZWFuKGJvbnVzLmF2YWlsYWJsZSkgfHwgY29udGFpbmVyLmRhdGFzZXQuc2hvd0VtcHR5ID09PSAndHJ1ZScpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvZHVjdFN0b2NrID0gKGNvbnRhaW5lciwgcHJvZHVjdCA9IHt9KSA9PiB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSBwcm9kdWN0LnF1YW50aXR5IHx8IHt9O1xuICAgIGNvbnN0IGFtb3VudCA9IE51bWJlcihxdWFudGl0eS5hbGwpIHx8IDA7XG4gICAgY29uc3Qgc3RhdHVzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3Qtc3RvY2stc3RhdHVzXScpO1xuICAgIGNvbnN0IGFtb3VudE5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1zdG9jay1hbW91bnRdJyk7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1zdG9jay1wcm9ncmVzc10nKTtcbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IHByb2R1Y3QuaW5TdG9jayA/IGNvbnRhaW5lci5kYXRhc2V0LmxhYmVsSW4gOiBjb250YWluZXIuZGF0YXNldC5sYWJlbE91dDtcbiAgICAgICAgc3RhdHVzLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtc3VjY2VzcycsIEJvb2xlYW4ocHJvZHVjdC5pblN0b2NrKSk7XG4gICAgICAgIHN0YXR1cy5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LW11dGVkJywgIXByb2R1Y3QuaW5TdG9jayk7XG4gICAgfVxuICAgIGlmIChhbW91bnROb2RlKSB7XG4gICAgICAgIGFtb3VudE5vZGUudGV4dENvbnRlbnQgPSBxdWFudGl0eS5zdG9ja0FjY291bnRpbmdcbiAgICAgICAgICAgID8gYCR7YW1vdW50fSAke3F1YW50aXR5LnVuaXRTaG9ydCB8fCBxdWFudGl0eS51bml0cyB8fCAnJ31gLnRyaW0oKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgYW1vdW50Tm9kZS5oaWRkZW4gPSBjb250YWluZXIuZGF0YXNldC5zaG93UXVhbnRpdHkgIT09ICd0cnVlJyB8fCAhcXVhbnRpdHkuc3RvY2tBY2NvdW50aW5nO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gTWF0aC5tYXgoMSwgTnVtYmVyKGNvbnRhaW5lci5kYXRhc2V0LnByb2dyZXNzVGhyZXNob2xkKSB8fCAxMCk7XG4gICAgICAgIHByb2dyZXNzLm1heCA9IHRocmVzaG9sZDtcbiAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBNYXRoLm1pbihhbW91bnQsIHRocmVzaG9sZCk7XG4gICAgICAgIHByb2dyZXNzLmhpZGRlbiA9IGNvbnRhaW5lci5kYXRhc2V0LnNob3dQcm9ncmVzcyAhPT0gJ3RydWUnIHx8ICFxdWFudGl0eS5zdG9ja0FjY291bnRpbmc7XG4gICAgfVxufTtcblxuY29uc3QgcmVuZGVyUHJvZHVjdFVuaXQgPSAoY29udGFpbmVyLCBwcm9kdWN0ID0ge30pID0+IHtcbiAgICBjb25zdCBxdWFudGl0eSA9IHByb2R1Y3QucXVhbnRpdHkgfHwge307XG4gICAgY29uc3QgdW5pdCA9IGNvbnRhaW5lci5kYXRhc2V0LnVuaXRTdHlsZSA9PT0gJ2xvbmcnXG4gICAgICAgID8gcXVhbnRpdHkudW5pdCB8fCBxdWFudGl0eS51bml0c1xuICAgICAgICA6IHF1YW50aXR5LnVuaXRTaG9ydCB8fCBxdWFudGl0eS51bml0cztcbiAgICBjb25zdCB1bml0Tm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXVuaXQtbGFiZWxdJyk7XG4gICAgY29uc3QgcHJpY2VOb2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtdW5pdC1wcmljZV0nKTtcbiAgICBpZiAodW5pdE5vZGUpIHVuaXROb2RlLnRleHRDb250ZW50ID0gdW5pdCB8fCAnJztcbiAgICBpZiAocHJpY2VOb2RlKSBwcmljZU5vZGUudGV4dENvbnRlbnQgPSBwcm9kdWN0LnByaWNlPy5maW5hbCB8fCAnJztcbiAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQoY29udGFpbmVyLCBCb29sZWFuKHVuaXQpKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2R1Y3RTcGVjaWZpY2F0aW9ucyA9IChjb250YWluZXIsIHNvdXJjZUZpZWxkc2V0cyA9IFtdKSA9PiB7XG4gICAgY29uc3Qgc2hvd1ZhcmlhbnRzID0gY29udGFpbmVyLmRhdGFzZXQuc2hvd1ZhcmlhbnRGaWVsZHMgIT09ICdmYWxzZSc7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWVsZHMgPSBuZXcgU2V0KFN0cmluZyhjb250YWluZXIuZGF0YXNldC5zZWxlY3RlZEZpZWxkcyB8fCAnJylcbiAgICAgICAgLnNwbGl0KCcsJykubWFwKChhbGlhcykgPT4gYWxpYXMudHJpbSgpKS5maWx0ZXIoQm9vbGVhbikpO1xuICAgIGNvbnN0IGZpZWxkTGltaXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNCwgTnVtYmVyLnBhcnNlSW50KGNvbnRhaW5lci5kYXRhc2V0LmZpZWxkTGltaXQgfHwgJzAnLCAxMCkgfHwgMCkpO1xuICAgIGNvbnN0IHNob3dUaXRsZXMgPSBjb250YWluZXIuZGF0YXNldC5zaG93RmllbGRzZXRUaXRsZXMgIT09ICdmYWxzZSc7XG4gICAgY29uc3QgZGl2aWRlciA9IGNvbnRhaW5lci5kYXRhc2V0LmRpdmlkZXIgIT09ICdmYWxzZSc7XG4gICAgY29uc3Qgc3RyaXBlZCA9IGNvbnRhaW5lci5kYXRhc2V0LnN0cmlwZWQgPT09ICd0cnVlJztcbiAgICBjb25zdCBsYXlvdXQgPSBbJ2Rlc2NyaXB0aW9uLWxpc3QnLCAndGFibGUnLCAnZ3JpZCddLmluY2x1ZGVzKGNvbnRhaW5lci5kYXRhc2V0LmxheW91dClcbiAgICAgICAgPyBjb250YWluZXIuZGF0YXNldC5sYXlvdXQgOiAnZGVzY3JpcHRpb24tbGlzdCc7XG4gICAgY29uc3QgcmVzcG9uc2l2ZUNvbHVtbiA9ICh2YWx1ZSwgZmFsbGJhY2spID0+IFsnMScsICcyJywgJzMnLCAnNCddLmluY2x1ZGVzKHZhbHVlKSA/IHZhbHVlIDogZmFsbGJhY2s7XG4gICAgY29uc3QgbGVnYWN5Q29sdW1ucyA9IHJlc3BvbnNpdmVDb2x1bW4oY29udGFpbmVyLmRhdGFzZXQuY29sdW1ucywgJzInKTtcbiAgICBjb25zdCBjb2x1bW5zU21hbGwgPSByZXNwb25zaXZlQ29sdW1uKGNvbnRhaW5lci5kYXRhc2V0LmNvbHVtbnNTbWFsbCwgJzEnKTtcbiAgICBjb25zdCBjb2x1bW5zTWVkaXVtID0gcmVzcG9uc2l2ZUNvbHVtbihjb250YWluZXIuZGF0YXNldC5jb2x1bW5zTWVkaXVtLCBsZWdhY3lDb2x1bW5zKTtcbiAgICBjb25zdCBjb2x1bW5zTGFyZ2UgPSByZXNwb25zaXZlQ29sdW1uKGNvbnRhaW5lci5kYXRhc2V0LmNvbHVtbnNMYXJnZSwgbGVnYWN5Q29sdW1ucyk7XG4gICAgY29uc3QgdGFibGVSZXNwb25zaXZlID0gWydzY3JvbGwnLCAnc3RhY2snXS5pbmNsdWRlcyhjb250YWluZXIuZGF0YXNldC50YWJsZVJlc3BvbnNpdmUpXG4gICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQudGFibGVSZXNwb25zaXZlIDogJ3Njcm9sbCc7XG4gICAgbGV0IGZpZWxkc1JlbWFpbmluZyA9IGZpZWxkTGltaXQgfHwgTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGNvbnN0IGZpZWxkc2V0cyA9IFtdO1xuICAgIHNvdXJjZUZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgICBpZiAoZmllbGRzUmVtYWluaW5nIDw9IDApIHJldHVybjtcbiAgICAgICAgY29uc3QgZmllbGRzID0gKGZpZWxkc2V0LmZpZWxkcyB8fCBbXSkuZmlsdGVyKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgKHNob3dWYXJpYW50cyB8fCAhZmllbGQudmFyaWFudClcbiAgICAgICAgICAgICYmICghc2VsZWN0ZWRGaWVsZHMuc2l6ZSB8fCBzZWxlY3RlZEZpZWxkcy5oYXMoU3RyaW5nKGZpZWxkLmFsaWFzIHx8ICcnKSkpXG4gICAgICAgICkpLnNsaWNlKDAsIGZpZWxkc1JlbWFpbmluZyk7XG4gICAgICAgIGlmICghZmllbGRzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBmaWVsZHNldHMucHVzaCh7Li4uZmllbGRzZXQsIGZpZWxkc30pO1xuICAgICAgICBmaWVsZHNSZW1haW5pbmcgLT0gZmllbGRzLmxlbmd0aDtcbiAgICB9KTtcbiAgICBjb25zdCBjb250ZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19jb250ZW50Jyk7XG4gICAgaWYgKCFjb250ZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGVsZW1lbnQoJ3NlY3Rpb24nLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fZmllbGRzZXQnKTtcbiAgICAgICAgaWYgKHNob3dUaXRsZXMgJiYgZmllbGRzZXQudGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlTm9kZSA9IGVsZW1lbnQoJ2gzJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3RpdGxlIHVrLWg0Jyk7XG4gICAgICAgICAgICB0aXRsZU5vZGUuYXBwZW5kKHRleHQoZmllbGRzZXQudGl0bGUpKTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKHRpdGxlTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGF5b3V0ID09PSAndGFibGUnKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZSA9IGVsZW1lbnQoJ3RhYmxlJywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3RhYmxlIHVrLXRhYmxlIHVrLXRhYmxlLXNtYWxsJHtkaXZpZGVyID8gJyB1ay10YWJsZS1kaXZpZGVyJyA6ICcnfSR7c3RyaXBlZCA/ICcgdWstdGFibGUtc3RyaXBlZCcgOiAnJ31gKTtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICAgICAgZmllbGRzZXQuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZWxlbWVudCgndHInLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19faXRlbScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgndGgnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fbGFiZWwnLCB7c2NvcGU6ICdyb3cnfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlbGVtZW50KCd0ZCcsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZCh0ZXh0KGZpZWxkLnRpdGxlKSk7XG4gICAgICAgICAgICAgICAgYXBwZW5kU3BlY2lmaWNhdGlvblZhbHVlKHZhbHVlLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZChsYWJlbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZChib2R5KTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBlbGVtZW50KCdkaXYnLCBgcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fdGFibGUtd3JhcCR7dGFibGVSZXNwb25zaXZlID09PSAnc2Nyb2xsJyA/ICcgdWstb3ZlcmZsb3ctYXV0bycgOiAnJ31gKTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKHRhYmxlKTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2dyaWQnKSB7XG4gICAgICAgICAgICBjb25zdCBncmlkID0gZWxlbWVudCgnZGl2JywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2dyaWQgdWstY2hpbGQtd2lkdGgtMS0xIHVrLWNoaWxkLXdpZHRoLTEtJHtjb2x1bW5zU21hbGx9QHMgdWstY2hpbGQtd2lkdGgtMS0ke2NvbHVtbnNNZWRpdW19QG0gdWstY2hpbGQtd2lkdGgtMS0ke2NvbHVtbnNMYXJnZX1AbCR7ZGl2aWRlciA/ICcgdWstZ3JpZC1kaXZpZGVyJyA6ICcnfWAsIHsndWstZ3JpZCc6IHRydWV9KTtcbiAgICAgICAgICAgIGZpZWxkc2V0LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50KCdkaXYnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19faXRlbScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgnZGl2JywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2xhYmVsIHVrLXRleHQtbWV0YScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudCgnZGl2JywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3ZhbHVlIHVrLW1hcmdpbi1zbWFsbC10b3AnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZ3JpZC5hcHBlbmQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKGdyaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGVsZW1lbnQoJ2RsJywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2xpc3QgdWstZGVzY3JpcHRpb24tbGlzdCR7ZGl2aWRlciA/ICcgdWstZGVzY3JpcHRpb24tbGlzdC1kaXZpZGVyJyA6ICcnfWApO1xuICAgICAgICAgICAgZmllbGRzZXQuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnQoJ2RpdicsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19pdGVtJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBlbGVtZW50KCdkdCcsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19sYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudCgnZGQnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKGxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChzZWN0aW9uKTtcbiAgICB9KTtcblxuICAgIGNvbnRlbnQucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcbiAgICBjb250YWluZXIuaGlkZGVuID0gZmllbGRzZXRzLmxlbmd0aCA9PT0gMDtcbiAgICB3aW5kb3cuVUlraXQ/LnVwZGF0ZT8uKGNvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0SG92ZXJHYWxsZXJ5ID0gKGNvbnRhaW5lciwgcHJvZHVjdCA9IHt9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyMCwgTnVtYmVyLnBhcnNlSW50KGNvbnRhaW5lci5kYXRhc2V0Lm1heEltYWdlcyB8fCAnMCcsIDEwKSB8fCAwKSk7XG4gICAgY29uc3QgaXRlbXMgPSAocHJvZHVjdC5tZWRpYSB8fCBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtPy5zcmMpO1xuICAgIGNvbnN0IG1lZGlhID0gbGltaXQgPyBpdGVtcy5zbGljZSgwLCBsaW1pdCkgOiBpdGVtcztcbiAgICBjb25zdCB2aWV3cG9ydCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X192aWV3cG9ydCcpO1xuICAgIGlmICghdmlld3BvcnQpIHJldHVybjtcblxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIG1lZGlhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZWxlbWVudCgnaW1nJywgYHJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV9faW1hZ2Uke2luZGV4ID09PSAwID8gJyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2ltYWdlLS1hY3RpdmUnIDogJyd9YCwge1xuICAgICAgICAgICAgJ2RhdGEtcm0tcHJvZHVjdC1ob3Zlci1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IGluZGV4LFxuICAgICAgICAgICAgc3JjOiBpdGVtLnNyYyxcbiAgICAgICAgICAgIGFsdDogaXRlbS5hbHQgfHwgcHJvZHVjdC50aXRsZSB8fCAnJyxcbiAgICAgICAgICAgIGxvYWRpbmc6IGluZGV4ID09PSAwID8gKGNvbnRhaW5lci5kYXRhc2V0LmxvYWRpbmcgfHwgJ2xhenknKSA6ICdsYXp5JyxcbiAgICAgICAgICAgIGRlY29kaW5nOiAnYXN5bmMnLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogaW5kZXggPT09IDAgPyAnZmFsc2UnIDogJ3RydWUnXG4gICAgICAgIH0pO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQoaW1hZ2UpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5kaWNhdG9yU3R5bGUgPSBjb250YWluZXIuZGF0YXNldC5pbmRpY2F0b3JzIHx8ICdiYXJzJztcbiAgICBpZiAobWVkaWEubGVuZ3RoID4gMSAmJiBpbmRpY2F0b3JTdHlsZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBlbGVtZW50KCdzcGFuJywgYHJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV9faW5kaWNhdG9ycyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvcnMtLSR7aW5kaWNhdG9yU3R5bGV9YCwge1xuICAgICAgICAgICAgJ2RhdGEtcm0tcHJvZHVjdC1ob3Zlci1pbmRpY2F0b3JzJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KTtcbiAgICAgICAgbWVkaWEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGluZGljYXRvcnMuYXBwZW5kKGVsZW1lbnQoJ3NwYW4nLCBgcm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X19pbmRpY2F0b3Ike2luZGV4ID09PSAwID8gJyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvci0tYWN0aXZlJyA6ICcnfWAsIHtcbiAgICAgICAgICAgICAgICAnZGF0YS1pbmRleCc6IGluZGV4XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQoaW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgdmlld3BvcnQucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcbiAgICBjb250YWluZXIuaGlkZGVuID0gbWVkaWEubGVuZ3RoID09PSAwO1xuICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmFkaWNhbG1hcnQ6aG92ZXItZ2FsbGVyeS1yZWZyZXNoJykpO1xufTtcblxuY29uc3Qgc2V0TWV0YUNvbnRlbnQgPSAoYXR0cmlidXRlLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKGBtZXRhWyR7YXR0cmlidXRlfT1cIiR7bmFtZX1cIl1gKTtcbiAgICBpZiAoIW5vZGUgJiYgIXZhbHVlKSByZXR1cm47XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgbmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKG5vZGUpO1xuICAgIH1cbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIFN0cmluZyh2YWx1ZSB8fCAnJykpO1xufTtcblxuY29uc3QgdXBkYXRlUHJvZHVjdE1ldGFkYXRhID0gKHByb2R1Y3QpID0+IHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhwcm9kdWN0LmludHJvdGV4dCB8fCAnJykudHJpbSgpO1xuICAgIGNvbnN0IGltYWdlID0gcHJvZHVjdC5tZWRpYT8uWzBdPy5zcmMgfHwgJyc7XG4gICAgY29uc3QgbGluayA9IHByb2R1Y3QubGluayA/IG5ldyBVUkwocHJvZHVjdC5saW5rLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJyc7XG4gICAgbGV0IGNhbm9uaWNhbCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKTtcblxuICAgIGlmICghY2Fub25pY2FsICYmIGxpbmspIHtcbiAgICAgICAgY2Fub25pY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBjYW5vbmljYWwucmVsID0gJ2Nhbm9uaWNhbCc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKGNhbm9uaWNhbCk7XG4gICAgfVxuICAgIGlmIChjYW5vbmljYWwgJiYgbGluaykgY2Fub25pY2FsLmhyZWYgPSBsaW5rO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ2Rlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgIHNldE1ldGFDb250ZW50KCdwcm9wZXJ0eScsICdvZzp0aXRsZScsIHByb2R1Y3QudGl0bGUgfHwgJycpO1xuICAgIHNldE1ldGFDb250ZW50KCdwcm9wZXJ0eScsICdvZzpkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICBzZXRNZXRhQ29udGVudCgncHJvcGVydHknLCAnb2c6dXJsJywgbGluayk7XG4gICAgc2V0TWV0YUNvbnRlbnQoJ3Byb3BlcnR5JywgJ29nOmltYWdlJywgaW1hZ2UgPyBuZXcgVVJMKGltYWdlLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJycpO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ3R3aXR0ZXI6dGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICcnKTtcbiAgICBzZXRNZXRhQ29udGVudCgnbmFtZScsICd0d2l0dGVyOmRlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ3R3aXR0ZXI6aW1hZ2UnLCBpbWFnZSA/IG5ldyBVUkwoaW1hZ2UsIGRvY3VtZW50LmJhc2VVUkkpLmhyZWYgOiAnJyk7XG59O1xuXG5jbGFzcyBQcm9kdWN0U2NvcGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHJlc29sdmVQcm9kdWN0U2NvcGUoc291cmNlKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gdGhpcy5yZWFkRGF0YSgpO1xuICAgIH1cblxuICAgIHJlYWREYXRhKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gQXJyYXkuZnJvbSh0aGlzLnNvdXJjZS5jaGlsZHJlbiB8fCBbXSlcbiAgICAgICAgICAgIC5maW5kKChub2RlKSA9PiBub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ3JtLXByb2R1Y3RfX2RhdGEnKVxuICAgICAgICAgICAgICAgIHx8IG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygncm0tcHJvZHVjdC1jYXJkX19kYXRhJykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vZGVzKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2NvcGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSBub2RlLmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bmVyID09PSB0aGlzLnNvdXJjZSB8fCAoIW93bmVyICYmIHRoaXMuc2NvcGUgIT09IHRoaXMuc291cmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFNjb3BlUmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RTY29wZVJlYWR5ID0gJ3RydWUnO1xuICAgICAgICB0aGlzLnNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpICE9PSB0aGlzLnNvdXJjZSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8ucHJvZHVjdD8uaWQpIHRoaXMuYXBwbHlQcm9kdWN0KGV2ZW50LmRldGFpbC5wcm9kdWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlQcm9kdWN0KHByb2R1Y3QpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gey4uLnRoaXMucHJvZHVjdCwgLi4ucHJvZHVjdH07XG4gICAgICAgIHRoaXMuc291cmNlLmRhdGFzZXQucm1Qcm9kdWN0SWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC10aXRsZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC50aXRsZSB8fCAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtY29kZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5jb2RlIHx8ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1kZXNjcmlwdGlvbl0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHByb2R1Y3QuaW50cm90ZXh0SHRtbCB8fCBwcm9kdWN0LmludHJvdGV4dCB8fCAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtZnVsbC1kZXNjcmlwdGlvbl0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHByb2R1Y3QuZnVsbHRleHRIdG1sIHx8IHByb2R1Y3QuZnVsbHRleHQgfHwgJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWxpbmtdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QubGluaykgbm9kZS5ocmVmID0gcHJvZHVjdC5saW5rO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtZWRpYSA9IHByb2R1Y3QubWVkaWE/LlswXSB8fCB7fTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1pbWFnZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsIG1hcmt1cCBjYW4gdXNlIFlPT3RoZW1lLWdlbmVyYXRlZCBzcmNzZXRzLiBBIHZhcmlhbnQgY2FuXG4gICAgICAgICAgICAvLyBwb2ludCB0byBhbm90aGVyIGZpbGUsIHNvIHN0YWxlIGNhbmRpZGF0ZXMgbXVzdCBub3Qgb3ZlcnJpZGUgaXQuXG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc2l6ZXMnKTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICBpZiAobWVkaWEuc3JjKSBub2RlLnNyYyA9IG1lZGlhLnNyYztcbiAgICAgICAgICAgIGVsc2Ugbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgbm9kZS5hbHQgPSBtZWRpYS5hbHQgfHwgcHJvZHVjdC50aXRsZSB8fCAnJztcbiAgICAgICAgICAgIG5vZGUuaGlkZGVuID0gIW1lZGlhLnNyYztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJQcm9kdWN0SG92ZXJHYWxsZXJ5KG5vZGUsIHByb2R1Y3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2UtYmFzZV0nKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlLWZpbmFsXScpO1xuICAgICAgICAgICAgY29uc3QgZGlzY291bnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtZGlzY291bnRdJyk7XG4gICAgICAgICAgICBjb25zdCBzYXZpbmdzID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlLXNhdmluZ3NdJyk7XG4gICAgICAgICAgICBjb25zdCBzYXZpbmdzVmFsdWUgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2Utc2F2aW5ncy12YWx1ZV0nKTtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBCb29sZWFuKHByb2R1Y3QucHJpY2U/LmRpc2NvdW50RW5hYmxlZCk7XG4gICAgICAgICAgICBjb25zdCB1bml0V3JhcCA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1wcmljZS11bml0LXdyYXBdJyk7XG4gICAgICAgICAgICBjb25zdCB1bml0Tm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1wcmljZS11bml0XScpO1xuICAgICAgICAgICAgY29uc3QgdW5pdCA9IG5vZGUuZGF0YXNldC51bml0U3R5bGUgPT09ICdsb25nJ1xuICAgICAgICAgICAgICAgID8gcHJvZHVjdC5xdWFudGl0eT8udW5pdCB8fCBwcm9kdWN0LnF1YW50aXR5Py51bml0cyB8fCAnJ1xuICAgICAgICAgICAgICAgIDogcHJvZHVjdC5xdWFudGl0eT8udW5pdFNob3J0IHx8IHByb2R1Y3QucXVhbnRpdHk/LnVuaXRzIHx8ICcnO1xuICAgICAgICAgICAgaWYgKGJhc2UpIHtcbiAgICAgICAgICAgICAgICBiYXNlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uYmFzZSB8fCAnJztcbiAgICAgICAgICAgICAgICBiYXNlLmhpZGRlbiA9ICFlbmFibGVkIHx8IG5vZGUuZGF0YXNldC5zaG93QmFzZSAhPT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbmFsKSBmaW5hbC50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmZpbmFsIHx8ICcnO1xuICAgICAgICAgICAgaWYgKGRpc2NvdW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY291bnRUZXh0ID0gcHJvZHVjdERpc2NvdW50VGV4dChwcm9kdWN0LnByaWNlLCBub2RlLmRhdGFzZXQuZGlzY291bnRNb2RlIHx8ICdsZWdhY3knKTtcbiAgICAgICAgICAgICAgICBkaXNjb3VudC50ZXh0Q29udGVudCA9IGRpc2NvdW50VGV4dDtcbiAgICAgICAgICAgICAgICBkaXNjb3VudC5oaWRkZW4gPSAhZW5hYmxlZCB8fCBub2RlLmRhdGFzZXQuc2hvd0Rpc2NvdW50ICE9PSAndHJ1ZScgfHwgIWRpc2NvdW50VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzYXZpbmdzVmFsdWUpIHNhdmluZ3NWYWx1ZS50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmJlbmVmaXQgfHwgJyc7XG4gICAgICAgICAgICBpZiAoc2F2aW5ncykgc2F2aW5ncy5oaWRkZW4gPSAhZW5hYmxlZFxuICAgICAgICAgICAgICAgIHx8IG5vZGUuZGF0YXNldC5zaG93U2F2aW5ncyAhPT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgfHwgIShOdW1iZXIocHJvZHVjdC5wcmljZT8uYmVuZWZpdFZhbHVlKSA+IDApO1xuICAgICAgICAgICAgaWYgKHVuaXROb2RlKSB1bml0Tm9kZS50ZXh0Q29udGVudCA9IHVuaXQ7XG4gICAgICAgICAgICBpZiAodW5pdFdyYXApIHVuaXRXcmFwLmhpZGRlbiA9IG5vZGUuZGF0YXNldC5zaG93VW5pdCAhPT0gJ3RydWUnIHx8ICF1bml0O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1iYXNlLXByaWNlXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBwcm9kdWN0LnByaWNlPy5iYXNlIHx8ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1kaXNjb3VudC12YWx1ZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uZGlzY291bnQgfHwgJyc7XG4gICAgICAgICAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQobm9kZSwgQm9vbGVhbihwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtYmVuZWZpdF0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uYmVuZWZpdCB8fCAnJztcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChub2RlLCBOdW1iZXIocHJvZHVjdC5wcmljZT8uYmVuZWZpdFZhbHVlKSA+IDApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWF2YWlsYWJpbGl0eV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5pblN0b2NrID8gbm9kZS5kYXRhc2V0LmxhYmVsSW4gOiBub2RlLmRhdGFzZXQubGFiZWxPdXQ7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtc3VjY2VzcycsIEJvb2xlYW4ocHJvZHVjdC5pblN0b2NrKSk7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtbXV0ZWQnLCAhcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1jYXRlZ29yeV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5jYXRlZ29yeT8udGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCdhJykgJiYgcHJvZHVjdC5jYXRlZ29yeT8ubGluaykgbm9kZS5ocmVmID0gcHJvZHVjdC5jYXRlZ29yeS5saW5rO1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIEJvb2xlYW4ocHJvZHVjdC5jYXRlZ29yeT8udGl0bGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtbWFudWZhY3R1cmVyXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hbnVmYWN0dXJlciA9IHByb2R1Y3QubWFudWZhY3R1cmVycz8uWzBdO1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG1hbnVmYWN0dXJlcj8udGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCdhJykgJiYgbWFudWZhY3R1cmVyPy5saW5rKSBub2RlLmhyZWYgPSBtYW51ZmFjdHVyZXIubGluaztcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChub2RlLCBCb29sZWFuKG1hbnVmYWN0dXJlcj8udGl0bGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3Qtc3RvY2stcXVhbnRpdHldJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gTnVtYmVyKHByb2R1Y3QucXVhbnRpdHk/LmFsbCkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IEJvb2xlYW4ocHJvZHVjdC5xdWFudGl0eT8uc3RvY2tBY2NvdW50aW5nKTtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICA/IGAke2Ftb3VudH0gJHtwcm9kdWN0LnF1YW50aXR5Py51bml0U2hvcnQgfHwgcHJvZHVjdC5xdWFudGl0eT8udW5pdHMgfHwgJyd9YC50cmltKClcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIGF2YWlsYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXVuaXQtdmFsdWVdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5pdCA9IHByb2R1Y3QucXVhbnRpdHk/LnVuaXRTaG9ydCB8fCBwcm9kdWN0LnF1YW50aXR5Py51bml0cyB8fCAnJztcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSB1bml0O1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIEJvb2xlYW4odW5pdCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC11bml0XScpLmZvckVhY2goKG5vZGUpID0+IHJlbmRlclByb2R1Y3RVbml0KG5vZGUsIHByb2R1Y3QpKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1jdXN0b20tZmllbGRdJykuZm9yRWFjaCgobm9kZSkgPT4gcmVuZGVyUHJvZHVjdEN1c3RvbUZpZWxkKG5vZGUsIHByb2R1Y3QpKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1zdG9ja10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0U3RvY2sobm9kZSwgcHJvZHVjdCkpO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWJhZGdlc10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0QmFkZ2VzKG5vZGUsIHByb2R1Y3QuYmFkZ2VzIHx8IFtdKSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtcmF0aW5nXScpLmZvckVhY2goKG5vZGUpID0+IHJlbmRlclByb2R1Y3RSYXRpbmcobm9kZSwgcHJvZHVjdC5yYXRpbmcgfHwge30pKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1ib251c10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0Qm9udXMobm9kZSwgcHJvZHVjdC5ib251cyB8fCB7fSkpO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IG5vZGUubWF0Y2hlcygnaW5wdXQnKSA/IG5vZGUgOiBub2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgICAgICAgICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5tYXRjaGVzKCdpbnB1dCcpID8gbm9kZS5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0nKSB8fCBub2RlIDogbm9kZTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gU3RyaW5nKHByb2R1Y3QuaWQpO1xuICAgICAgICAgICAgaW5wdXQuZGF0YXNldC5wcm9kdWN0SWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICBpbnB1dC5kYXRhc2V0LnByb2R1Y3RUaXRsZSA9IHByb2R1Y3QudGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpbnB1dC5kYXRhc2V0LnF1YW50aXR5ID0gU3RyaW5nKHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxKTtcbiAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIXByb2R1Y3QuaW5TdG9jayAmJiBjb250YWluZXIuZGF0YXNldC5kaXNhYmxlT3V0T2ZTdG9jayAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I/LignW2RhdGEtcm0tcHJvZHVjdC1zZWxlY3QtbGFiZWxdLCAucm0tcHJvZHVjdC1zZWxlY3RfX2xhYmVsJyk7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGFiZWwgPSBjb250YWluZXIuZGF0YXNldC5iYXNlTGFiZWwgfHwgJyc7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBjb250YWluZXIuZGF0YXNldC5zaG93VGl0bGUgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICA/IGAke2Jhc2VMYWJlbH0gJHtwcm9kdWN0LnRpdGxlIHx8ICcnfWAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgIDogYmFzZUxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0LmRpc2FibGVkICYmIGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1hY3Rpb25dJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5kYXRhc2V0LnByb2R1Y3RJZCA9IFN0cmluZyhwcm9kdWN0LmlkKTtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7bm9kZS5kYXRhc2V0LmxhYmVsIHx8ICcnfSAke3Byb2R1Y3QudGl0bGUgfHwgJyd9YC50cmltKCkpO1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdybS1wcm9kdWN0LWFjdGlvbi0tYWN0aXZlJyk7XG4gICAgICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpwcm9kdWN0LWFjdGlvbi1yZWZyZXNoJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcXVpY2stdmlld10nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRhdGFzZXQucm1RdWlja1ZpZXcgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZXMoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKS5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQuaWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQucm1EeW5hbWljUHJvZHVjdCA9ICd0cnVlJztcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicXVhbnRpdHlcIl0nKTtcbiAgICAgICAgICAgIGlmIChxdWFudGl0eSkge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5Lm1pbiA9IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiA/PyAxO1xuICAgICAgICAgICAgICAgIHF1YW50aXR5LnN0ZXAgPSBwcm9kdWN0LnF1YW50aXR5Py5zdGVwID8/IDE7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3QucXVhbnRpdHk/Lm1heCkgcXVhbnRpdHkubWF4ID0gcHJvZHVjdC5xdWFudGl0eS5tYXg7XG4gICAgICAgICAgICAgICAgZWxzZSBxdWFudGl0eS5yZW1vdmVBdHRyaWJ1dGUoJ21heCcpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocXVhbnRpdHkudmFsdWUpIDwgTnVtYmVyKHF1YW50aXR5Lm1pbikpIHF1YW50aXR5LnZhbHVlID0gcXVhbnRpdHkubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FydC5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGJ1dHRvbikgPT4geyBidXR0b24uZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrOyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc10nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJQcm9kdWN0U3BlY2lmaWNhdGlvbnMobm9kZSwgcHJvZHVjdC5maWVsZHNldHMgfHwgW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RQYWdlID09PSAndHJ1ZSdcbiAgICAgICAgICAgICYmIHRoaXMuc291cmNlLmRhdGFzZXQudXBkYXRlRG9jdW1lbnRUaXRsZSAhPT0gJ2ZhbHNlJ1xuICAgICAgICAgICAgJiYgcHJvZHVjdC50aXRsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBwcm9kdWN0LnRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFBhZ2UgPT09ICd0cnVlJ1xuICAgICAgICAgICAgJiYgdGhpcy5zb3VyY2UuZGF0YXNldC51cGRhdGVEb2N1bWVudE1ldGFkYXRhICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0TWV0YWRhdGEodGhpcy5wcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc291cmNlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpwcm9kdWN0LWNoYW5nZScsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0OiB0aGlzLnByb2R1Y3R9XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2R1Y3RCdWxrQWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnJvb3RTZWxlY3RvciA9IGNvbnRhaW5lci5kYXRhc2V0LnNlbGVjdGlvblJvb3QgfHwgJyc7XG4gICAgICAgIHRoaXMucmVzb2x2ZWRSb290ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzb2x2ZWRSb290KSByZXR1cm4gdGhpcy5yZXNvbHZlZFJvb3Q7XG4gICAgICAgIGlmICh0aGlzLnJvb3RTZWxlY3Rvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVkUm9vdCA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QodGhpcy5yb290U2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5yb290U2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVkUm9vdDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290U2VsZWN0b3IgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc29sdmVkUm9vdCA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLXJtLXNlbGVjdGlvbi1zY29wZV0sIC5ybS1ncmlkLCAudWstc2VjdGlvbicpIHx8IGRvY3VtZW50O1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlZFJvb3Q7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQnKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1CdWxrQWN0aW9uc1JlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1CdWxrQWN0aW9uc1JlYWR5ID0gJ3RydWUnO1xuICAgICAgICB0aGlzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVTZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXJtLWJ1bGstYWN0aW9uXScpPy5kYXRhc2V0LnJtQnVsa0FjdGlvbjtcbiAgICAgICAgICAgIGlmICghYWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsZWFyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQoKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnY2FydCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvQ2FydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTZWxlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5tYXRjaGVzKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykpIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tc2VsZWN0aW9uLWNvdW50XScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBTdHJpbmcoc2VsZWN0ZWQubGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLWJ1bGstYWN0aW9uPVwiY2FydFwiXSwgW2RhdGEtcm0tYnVsay1hY3Rpb249XCJjbGVhclwiXScpXG4gICAgICAgICAgICAuZm9yRWFjaCgoYnV0dG9uKSA9PiB7IGJ1dHRvbi5kaXNhYmxlZCA9IHRoaXMucGVuZGluZyB8fCBzZWxlY3RlZC5sZW5ndGggPT09IDA7IH0pO1xuICAgIH1cblxuICAgIHNldFN0YXR1cyhtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWJ1bGstc3RhdHVzXScpO1xuICAgICAgICBpZiAoc3RhdHVzKSBzdGF0dXMudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIH1cblxuICAgIGFkZFRvQ2FydCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnN0IGNhcnQgPSB0eXBlb2Ygd2luZG93LlJhZGljYWxNYXJ0Q2FydCA9PT0gJ2Z1bmN0aW9uJyA/IHdpbmRvdy5SYWRpY2FsTWFydENhcnQoKSA6IG51bGw7XG4gICAgICAgIGlmICghc2VsZWN0ZWQubGVuZ3RoIHx8IHRoaXMucGVuZGluZykgcmV0dXJuO1xuICAgICAgICBpZiAoIWNhcnQ/LmFkZFByb2R1Y3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfQlVMS19DQVJUX1VOQVZBSUxBQkxFJywgJ0NhcnQgaXMgdW5hdmFpbGFibGUuJykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQSBmcmVlIEJ1aWxkZXIgY29tcG9zaXRpb24gY2FuIHJlbmRlciB0aGUgc2FtZSBwcm9kdWN0IG1vcmUgdGhhblxuICAgICAgICAvLyBvbmNlLiBSYWRpY2FsTWFydCBkZS1kdXBsaWNhdGVzIGNvbmN1cnJlbnQgYWRkcyBieSBpdHMgY2FydCBoYXNoLCBzb1xuICAgICAgICAvLyBtYWtlIHRoZSBidWxrIGFjdGlvbiBleHBsaWNpdGx5IG9uZSBhZGQgcGVyIHByb2R1Y3QgaW5zdGVhZCBvZlxuICAgICAgICAvLyByZXBvcnRpbmcgc3VjY2VzcyBmb3Igc2tpcHBlZCBkdXBsaWNhdGUgY29udHJvbHMuXG4gICAgICAgIGNvbnN0IGlucHV0c0J5UHJvZHVjdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgc2VsZWN0ZWQuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IE51bWJlcihpbnB1dC5kYXRhc2V0LnByb2R1Y3RJZCB8fCBpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAocHJvZHVjdElkICYmICFpbnB1dHNCeVByb2R1Y3QuaGFzKHByb2R1Y3RJZCkpIGlucHV0c0J5UHJvZHVjdC5zZXQocHJvZHVjdElkLCBpbnB1dCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9kdWN0SWRzID0gQXJyYXkuZnJvbShpbnB1dHNCeVByb2R1Y3Qua2V5cygpKTtcbiAgICAgICAgY29uc3Qgd2FpdGluZyA9IG5ldyBTZXQocHJvZHVjdElkcyk7XG4gICAgICAgIGNvbnN0IGZhaWx1cmVzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0JVTEtfQURESU5HJywgJ0FkZGluZyBzZWxlY3RlZCBwcm9kdWN0c+KApicpKTtcblxuICAgICAgICBsZXQgdGltZW91dDtcbiAgICAgICAgY29uc3QgZmluaXNoID0gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25SYWRpY2FsTWFydENhcnRBZnRlckFkZFByb2R1Y3QnLCBoYW5kbGVSZXN1bHQpO1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXModHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19CVUxLX0FERF9GQUlMRUQnLCAnU29tZSBwcm9kdWN0cyBjb3VsZCBub3QgYmUgYWRkZWQgdG8gdGhlIGNhcnQuJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpidWxrLWFkZC1lcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cHJvZHVjdElkcywgZmFpbGVkUHJvZHVjdElkczogQXJyYXkuZnJvbShmYWlsdXJlcyl9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfQlVMS19BRERFRCcsICdTZWxlY3RlZCBwcm9kdWN0cyB3ZXJlIGFkZGVkIHRvIHRoZSBjYXJ0LicpKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpidWxrLWFkZCcsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge3Byb2R1Y3RJZHN9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGhhbmRsZVJlc3VsdCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8uZW50cnk/LnByb2R1Y3RfaWQpO1xuICAgICAgICAgICAgaWYgKCF3YWl0aW5nLmhhcyhwcm9kdWN0SWQpKSByZXR1cm47XG4gICAgICAgICAgICB3YWl0aW5nLmRlbGV0ZShwcm9kdWN0SWQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8uZXJyb3IpIGZhaWx1cmVzLmFkZChwcm9kdWN0SWQpO1xuICAgICAgICAgICAgaWYgKCF3YWl0aW5nLnNpemUpIGZpbmlzaCgpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvblJhZGljYWxNYXJ0Q2FydEFmdGVyQWRkUHJvZHVjdCcsIGhhbmRsZVJlc3VsdCk7XG4gICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3YWl0aW5nLmZvckVhY2goKHByb2R1Y3RJZCkgPT4gZmFpbHVyZXMuYWRkKHByb2R1Y3RJZCkpO1xuICAgICAgICAgICAgd2FpdGluZy5jbGVhcigpO1xuICAgICAgICAgICAgZmluaXNoKCk7XG4gICAgICAgIH0sIDMwMDAwKTtcblxuICAgICAgICBBcnJheS5mcm9tKGlucHV0c0J5UHJvZHVjdC5lbnRyaWVzKCkpLmZvckVhY2goKFtwcm9kdWN0SWQsIGlucHV0XSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gTWF0aC5tYXgoMC4wMDAxLCBOdW1iZXIoaW5wdXQuZGF0YXNldC5xdWFudGl0eSkgfHwgMSk7XG4gICAgICAgICAgICBjYXJ0LmFkZFByb2R1Y3QocHJvZHVjdElkLCBxdWFudGl0eSwge30sIGluZGV4ID09PSBwcm9kdWN0SWRzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2R1Y3RIb3ZlckdhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLnN1cHByZXNzQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW1hZ2VzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LWhvdmVyLWltYWdlXScpKTtcbiAgICB9XG5cbiAgICBzaG93KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuaW1hZ2VzKCk7XG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBuZXh0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oaW1hZ2VzLmxlbmd0aCAtIDEsIE51bWJlcihpbmRleCkgfHwgMCkpO1xuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gbmV4dDtcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWFnZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBpbWFnZUluZGV4ID09PSBuZXh0O1xuICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnRvZ2dsZSgncm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X19pbWFnZS0tYWN0aXZlJywgYWN0aXZlKTtcbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhY3RpdmUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvcicpLmZvckVhY2goKGluZGljYXRvciwgaW5kaWNhdG9ySW5kZXgpID0+IHtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc0xpc3QudG9nZ2xlKCdybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvci0tYWN0aXZlJywgaW5kaWNhdG9ySW5kZXggPT09IG5leHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIuZGF0YXNldC5ybVByb2R1Y3RIb3ZlckdhbGxlcnlSZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJtUHJvZHVjdEhvdmVyR2FsbGVyeVJlYWR5ID0gJ3RydWUnO1xuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX3ZpZXdwb3J0Jyk7XG4gICAgICAgIGlmICghdmlld3BvcnQpIHJldHVybjtcbiAgICAgICAgY29uc3QgcG9pbnRlclN1cmZhY2UgPSB2aWV3cG9ydC5jbG9zZXN0KCcucm0tcHJvZHVjdC1jYXJkX19tYWluJykgfHwgdmlld3BvcnQ7XG5cbiAgICAgICAgcG9pbnRlclN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJykgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5pbWFnZXMoKTtcbiAgICAgICAgICAgIGlmIChpbWFnZXMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoIWJvdW5kcy53aWR0aCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW5zaWRlID0gZXZlbnQuY2xpZW50WCA+PSBib3VuZHMubGVmdCAmJiBldmVudC5jbGllbnRYIDw9IGJvdW5kcy5yaWdodFxuICAgICAgICAgICAgICAgICYmIGV2ZW50LmNsaWVudFkgPj0gYm91bmRzLnRvcCAmJiBldmVudC5jbGllbnRZIDw9IGJvdW5kcy5ib3R0b207XG4gICAgICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJlc2V0T25MZWF2ZSAhPT0gJ2ZhbHNlJyAmJiB0aGlzLmFjdGl2ZUluZGV4ICE9PSAwKSB0aGlzLnNob3coMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbiguOTk5OTk5LCAoZXZlbnQuY2xpZW50WCAtIGJvdW5kcy5sZWZ0KSAvIGJvdW5kcy53aWR0aCkpO1xuICAgICAgICAgICAgdGhpcy5zaG93KE1hdGguZmxvb3IocHJvZ3Jlc3MgKiBpbWFnZXMubGVuZ3RoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwb2ludGVyU3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQucmVzZXRPbkxlYXZlICE9PSAnZmFsc2UnKSB0aGlzLnNob3coMCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnRvdWNoID0ge1xuICAgICAgICAgICAgICAgIGlkOiBldmVudC5wb2ludGVySWQsXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgIHRpbWU6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudG91Y2ggfHwgZXZlbnQucG9pbnRlcklkICE9PSB0aGlzLnRvdWNoLmlkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBkZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy50b3VjaC54O1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gZXZlbnQuY2xpZW50WSAtIHRoaXMudG91Y2gueTtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMudG91Y2gudGltZTtcbiAgICAgICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPiA3NTAgfHwgTWF0aC5hYnMoZGVsdGFYKSA8IDM2IHx8IE1hdGguYWJzKGRlbHRhWCkgPD0gTWF0aC5hYnMoZGVsdGFZKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSB0aGlzLmltYWdlcygpO1xuICAgICAgICAgICAgaWYgKGltYWdlcy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnN1cHByZXNzQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93KGRlbHRhWCA8IDBcbiAgICAgICAgICAgICAgICA/ICh0aGlzLmFjdGl2ZUluZGV4ICsgMSkgJSBpbWFnZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgOiAodGhpcy5hY3RpdmVJbmRleCAtIDEgKyBpbWFnZXMubGVuZ3RoKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnN1cHByZXNzQ2xpY2sgPSBmYWxzZTsgfSwgMzUwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcHJlc3NDbGljaykgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFbJ0Fycm93TGVmdCcsICdBcnJvd1JpZ2h0JywgJ0hvbWUnLCAnRW5kJ10uaW5jbHVkZXMoZXZlbnQua2V5KSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5pbWFnZXMoKTtcbiAgICAgICAgICAgIGlmIChpbWFnZXMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdIb21lJykgdGhpcy5zaG93KDApO1xuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnRW5kJykgdGhpcy5zaG93KGltYWdlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHRoaXMuc2hvdygodGhpcy5hY3RpdmVJbmRleCAtIDEgKyBpbWFnZXMubGVuZ3RoKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnNob3coKHRoaXMuYWN0aXZlSW5kZXggKyAxKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6aG92ZXItZ2FsbGVyeS1yZWZyZXNoJywgKCkgPT4gdGhpcy5zaG93KDApKTtcbiAgICAgICAgdGhpcy5zaG93KDApO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvZHVjdE9wdGlvbmFsQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihidXR0b24pIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMudHlwZSA9IGJ1dHRvbi5kYXRhc2V0LnJtUHJvZHVjdEFjdGlvbjtcbiAgICAgICAgdGhpcy5yZXRyeUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5yZXRyeVRpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdmlkZXIoKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMudHlwZSA9PT0gJ2Zhdm9yaXRlJyA/IHdpbmRvdy5SYWRpY2FsTWFydEZhdm9yaXRlcyA6IHdpbmRvdy5SYWRpY2FsTWFydENvbXBhcmU7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cnkgeyByZXR1cm4gc291cmNlKCk7IH0gY2F0Y2ggKGVycm9yKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvdXJjZSB8fCBudWxsO1xuICAgIH1cblxuICAgIHN1cHBvcnRlZChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwcm92aWRlciAmJiAodHlwZW9mIHByb3ZpZGVyLnRvZ2dsZVByb2R1Y3QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHByb3ZpZGVyLnRvZ2dsZSA9PT0gJ2Z1bmN0aW9uJykpO1xuICAgIH1cblxuICAgIGlzQnVpbGRlclByZXZpZXcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZU5hbWUgPSB3aW5kb3cuZnJhbWVFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnJztcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cgJiYgL15wcmV2aWV3KD86LXwkKS8udGVzdChmcmFtZU5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QXZhaWxhYmlsaXR5KHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBwcmV2aWV3RmFsbGJhY2sgPSAhc3VwcG9ydGVkICYmIHRoaXMuaXNCdWlsZGVyUHJldmlldygpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5oaWRkZW4gPSAhc3VwcG9ydGVkICYmICFwcmV2aWV3RmFsbGJhY2s7XG4gICAgICAgIHRoaXMuYnV0dG9uLmRpc2FibGVkID0gcHJldmlld0ZhbGxiYWNrO1xuICAgICAgICB0aGlzLmJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdybS1wcm9kdWN0LWFjdGlvbi0tdW5hdmFpbGFibGUnLCBwcmV2aWV3RmFsbGJhY2spO1xuICAgICAgICBpZiAocHJldmlld0ZhbGxiYWNrKSB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICBlbHNlIHRoaXMuYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGFjdGl2ZShwcm92aWRlciwgcHJvZHVjdElkKSB7XG4gICAgICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIFsnaGFzUHJvZHVjdCcsICdjb250YWlucycsICdpc0FjdGl2ZScsICdoYXMnXSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlcj8uW21ldGhvZF0gIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3ZpZGVyW21ldGhvZF0ocHJvZHVjdElkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgPyBudWxsIDogQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3ZpZGVyPy5wcm9kdWN0cykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5wcm9kdWN0cy5zb21lKChpdGVtKSA9PiBOdW1iZXIoaXRlbT8uaWQgPz8gaXRlbSkgPT09IHByb2R1Y3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlKGFjdGl2ZSkge1xuICAgICAgICBjb25zdCBlbmFibGVkID0gQm9vbGVhbihhY3RpdmUpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGVuYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgncm0tcHJvZHVjdC1hY3Rpb24tLWFjdGl2ZScsIGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5wcm92aWRlcigpO1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGlzLnN1cHBvcnRlZChwcm92aWRlcik7XG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmlsaXR5KHN1cHBvcnRlZCk7XG4gICAgICAgIGlmICghc3VwcG9ydGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuYWN0aXZlKHByb3ZpZGVyLCBOdW1iZXIodGhpcy5idXR0b24uZGF0YXNldC5wcm9kdWN0SWQpKTtcbiAgICAgICAgaWYgKGFjdGl2ZSAhPT0gbnVsbCkgdGhpcy5zZXRBY3RpdmUoYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0cnlQcm92aWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaCgpIHx8IHRoaXMucmV0cnlDb3VudCA+PSAyMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgdGhpcy5yZXRyeVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXRyeVByb3ZpZGVyKCksIDI1MCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uLmRhdGFzZXQucm1Qcm9kdWN0QWN0aW9uUmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5idXR0b24uZGF0YXNldC5ybVByb2R1Y3RBY3Rpb25SZWFkeSA9ICd0cnVlJztcbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDpwcm9kdWN0LWFjdGlvbi1yZWZyZXNoJywgdGhpcy5yZWZyZXNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6cHJvdmlkZXItcmVhZHknLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGByYWRpY2FsbWFydDoke3RoaXMudHlwZX0tcmVhZHlgLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnZmF2b3JpdGUnKSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDpmYXZvcml0ZXMtcmVhZHknLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMucmVmcmVzaCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgdGhpcy5yZXRyeVByb3ZpZGVyKCk7XG5cbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IE51bWJlcih0aGlzLmJ1dHRvbi5kYXRhc2V0LnByb2R1Y3RJZCk7XG4gICAgICAgICAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnByb3ZpZGVyKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydGVkKGFwaSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJykgPT09ICd0cnVlJztcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlKCFwcmV2aW91cyk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0eXBlb2YgYXBpLnRvZ2dsZVByb2R1Y3QgPT09ICdmdW5jdGlvbicgPyBhcGkudG9nZ2xlUHJvZHVjdChpZCkgOiBhcGkudG9nZ2xlKGlkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUocHJldmlvdXMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuYWN0aXZlKGFwaSwgaWQpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUgIT09IG51bGwpIHRoaXMuc2V0QWN0aXZlKGFjdGl2ZSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB0aGlzLnNldEFjdGl2ZShwcmV2aW91cykpO1xuICAgICAgICAgICAgdGhpcy5idXR0b24uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoYHJhZGljYWxtYXJ0OiR7dGhpcy50eXBlfS10b2dnbGVgLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0SWQ6IGlkLCBhY3RpdmU6ICFwcmV2aW91c31cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9kdWN0Q2FyZERyb3Bkb3duIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmREcm9wZG93blJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmREcm9wZG93blJlYWR5ID0gJ3RydWUnO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmRhdGFzZXQuZGlzcGxheU1vZGUgIT09ICdob3ZlcicpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKTtcbiAgICAgICAgY29uc3Qgb3duZXIgPSBzb3VyY2VcbiAgICAgICAgICAgID8gcmVzb2x2ZVByb2R1Y3RTY29wZShzb3VyY2UpXG4gICAgICAgICAgICA6IHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50Py5jbG9zZXN0KCcuZWwtaXRlbSwgLnVrLWNhcmQsIC5ybS1wcm9kdWN0LWNhcmQnKTtcbiAgICAgICAgaWYgKCFvd25lciB8fCBvd25lciA9PT0gdGhpcy5lbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgb3duZXIuY2xhc3NMaXN0LmFkZCgncm0tcHJvZHVjdC1jYXJkLS1ob3ZlcicpO1xuICAgICAgICBvd25lci5kYXRhc2V0LnJtSG92ZXJCcmVha3BvaW50ID0gdGhpcy5lbGVtZW50LmRhdGFzZXQuaG92ZXJCcmVha3BvaW50IHx8ICdtJztcbiAgICAgICAgY29uc3QgdmlzaWJsZUZvY3VzYWJsZSA9IEFycmF5LmZyb20ob3duZXIucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKVxuICAgICAgICAgICAgLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50LmNvbnRhaW5zKG5vZGUpIHx8IG5vZGUuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnLTEnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2xvc2VzdCgnW2hpZGRlbl0sIFtpbmVydF0sIFthcmlhLWhpZGRlbj1cInRydWVcIl0nKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBzdHlsZS52aXNpYmlsaXR5ICE9PSAnaGlkZGVuJyAmJiBub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIXZpc2libGVGb2N1c2FibGUgJiYgIW93bmVyLm1hdGNoZXMoJ2FbaHJlZl0sIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF0nKSkge1xuICAgICAgICAgICAgb3duZXIudGFiSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9kdWN0Q2FyZFBvc2l0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmRQb3NpdGlvblJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmRQb3NpdGlvblJlYWR5ID0gJ3RydWUnO1xuXG4gICAgICAgIGNvbnN0IG93bmVyID0gdGhpcy5lbGVtZW50LmNsb3Nlc3QoJy5ybS1wcm9kdWN0LWNhcmQsIFtkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgIGlmICghb3duZXIgfHwgb3duZXIgPT09IHRoaXMuZWxlbWVudCkgcmV0dXJuO1xuICAgICAgICBvd25lci5jbGFzc0xpc3QuYWRkKCdybS1wcm9kdWN0LWNhcmQtLXBvc2l0aW9uZWQnKTtcblxuICAgICAgICBpZiAoIVsnaW50ZXJhY3Rpb24nLCAnZm9jdXMnXS5pbmNsdWRlcyh0aGlzLmVsZW1lbnQuZGF0YXNldC52aXNpYmlsaXR5TW9kZSkpIHJldHVybjtcbiAgICAgICAgY29uc3QgdmlzaWJsZUZvY3VzYWJsZSA9IEFycmF5LmZyb20ob3duZXIucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKVxuICAgICAgICAgICAgLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG5vZGUuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1jYXJkLXBvc2l0aW9uXScpO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiAmJiBwb3NpdGlvbi5kYXRhc2V0LnZpc2liaWxpdHlNb2RlICE9PSAnYWx3YXlzJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCBub2RlLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gJy0xJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNsb3Nlc3QoJ1toaWRkZW5dLCBbaW5lcnRdLCBbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgc3R5bGUudmlzaWJpbGl0eSAhPT0gJ2hpZGRlbicgJiYgbm9kZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF2aXNpYmxlRm9jdXNhYmxlICYmICFvd25lci5tYXRjaGVzKCdhW2hyZWZdLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdJykpIHtcbiAgICAgICAgICAgIG93bmVyLnRhYkluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVmFyaWFudFBpY2tlciB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhID0gbnVsbCwgb25Qcm9kdWN0ID0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YSB8fCB0aGlzLnJlYWREYXRhKCk7XG4gICAgICAgIHRoaXMub25Qcm9kdWN0ID0gb25Qcm9kdWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG5cdFx0dGhpcy5oYW5kbGVQb3BTdGF0ZSA9IHRoaXMuaGFuZGxlUG9wU3RhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnZpc2libGVGaWVsZHMgPSBuZXcgU2V0KCh0aGlzLmRhdGE/LmZpZWxkcyB8fCBbXSkubWFwKChmaWVsZCkgPT4gU3RyaW5nKGZpZWxkLmFsaWFzKSkpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmRhdGE/LnByb2R1Y3RzPy5maW5kKChwcm9kdWN0KSA9PiBOdW1iZXIocHJvZHVjdC5pZCkgPT09IE51bWJlcih0aGlzLmRhdGEuY3VycmVudFByb2R1Y3QpKTtcblx0XHRpZiAoY3VycmVudCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMudmlzaWJsZVNlbGVjdGlvbihjdXJyZW50LmZpZWxkcyk7XG5cdFx0fVxuICAgIH1cblxuXHR2aXNpYmxlU2VsZWN0aW9uKGZpZWxkcyA9IHt9KSB7XG5cdFx0cmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRcdE9iamVjdC5lbnRyaWVzKGZpZWxkcykuZmlsdGVyKChbYWxpYXNdKSA9PiB0aGlzLnZpc2libGVGaWVsZHMuaGFzKFN0cmluZyhhbGlhcykpKVxuXHRcdCk7XG5cdH1cblxuICAgIHJlYWREYXRhKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtdmFyaWFudHNfX2RhdGEnKT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhPy5maWVsZHM/Lmxlbmd0aCB8fCAhdGhpcy5kYXRhPy5wcm9kdWN0cz8ubGVuZ3RoIHx8IHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1WYXJpYW50c1JlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1WYXJpYW50c1JlYWR5ID0gJ3RydWUnO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tdmFsdWVdJyk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbiB8fCBvcHRpb24uZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gb3B0aW9uLmNsb3Nlc3QoJ1tkYXRhLXJtLWZpZWxkXScpO1xuICAgICAgICAgICAgaWYgKGZpZWxkKSB0aGlzLnNlbGVjdChmaWVsZC5kYXRhc2V0LnJtRmllbGQsIG9wdGlvbi5kYXRhc2V0LnJtVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJtdmFyaWFudHNfX3NlbGVjdCcpO1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBzZWxlY3Q/LmNsb3Nlc3QoJ1tkYXRhLXJtLWZpZWxkXScpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiBmaWVsZCkgdGhpcy5zZWxlY3QoZmllbGQuZGF0YXNldC5ybUZpZWxkLCBzZWxlY3QudmFsdWUpO1xuICAgICAgICB9KTtcblxuXHRcdHRoaXMucmVuZGVyU3RhdGUoKTtcblx0XHR0aGlzLmluaXRIaXN0b3J5KCk7XG4gICAgfVxuXG5cdGluaXRIaXN0b3J5KCkge1xuXHRcdGlmICghWydyZXBsYWNlJywgJ3B1c2gnXS5pbmNsdWRlcyh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybClcblx0XHRcdHx8IHR5cGVvZiB3aW5kb3cuaGlzdG9yeT8ucmVwbGFjZVN0YXRlICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG5cblx0XHRjb25zdCBjdXJyZW50SWQgPSBOdW1iZXIodGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0KTtcblx0XHRpZiAoY3VycmVudElkICYmICFOdW1iZXIod2luZG93Lmhpc3Rvcnkuc3RhdGU/LnJtUHJvZHVjdElkKSkge1xuXHRcdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsuLi53aW5kb3cuaGlzdG9yeS5zdGF0ZSwgcm1Qcm9kdWN0SWQ6IGN1cnJlbnRJZH0sICcnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybCA9PT0gJ3B1c2gnKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcblx0XHR9XG5cdH1cblxuXHRoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuXHRcdGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybCAhPT0gJ3B1c2gnKSByZXR1cm47XG5cdFx0bGV0IGlkID0gTnVtYmVyKGV2ZW50LnN0YXRlPy5ybVByb2R1Y3RJZCk7XG5cdFx0aWYgKCFpZCkge1xuXHRcdFx0Y29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuZGF0YS5wcm9kdWN0cy5maW5kKChwcm9kdWN0KSA9PiB7XG5cdFx0XHRcdGlmICghcHJvZHVjdC5saW5rKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGNvbnN0IGxpbmsgPSBuZXcgVVJMKHByb2R1Y3QubGluaywgZG9jdW1lbnQuYmFzZVVSSSk7XG5cdFx0XHRcdHJldHVybiBsaW5rLnBhdGhuYW1lID09PSBjdXJyZW50VXJsLnBhdGhuYW1lICYmIGxpbmsuc2VhcmNoID09PSBjdXJyZW50VXJsLnNlYXJjaDtcblx0XHRcdH0pO1xuXHRcdFx0aWQgPSBOdW1iZXIoaXRlbT8uaWQpO1xuXHRcdH1cblx0XHRjb25zdCBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IE51bWJlcihpdGVtLmlkKSA9PT0gaWQpO1xuXHRcdGlmICghcHJvZHVjdCB8fCBOdW1iZXIodGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0KSA9PT0gaWQpIHJldHVybjtcblxuXHRcdHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZpc2libGVTZWxlY3Rpb24ocHJvZHVjdC5maWVsZHMpO1xuXHRcdHRoaXMuZGF0YS5jdXJyZW50UHJvZHVjdCA9IGlkO1xuXHRcdHRoaXMucmVuZGVyU3RhdGUoKTtcblx0XHR0aGlzLmxvYWRQcm9kdWN0KHByb2R1Y3QsIGZhbHNlKTtcblx0fVxuXG4gICAgc2VsZWN0KGFsaWFzLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB3YW50ZWQgPSB7Li4udGhpcy5zZWxlY3RlZCwgW2FsaWFzXTogU3RyaW5nKHZhbHVlKX07XG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IHRoaXMubWF0Y2hlcyhpdGVtLCB3YW50ZWQpKTtcblxuICAgICAgICAvLyBTcGFyc2UgdmFyaWF0aW9uIG1hdHJpY2VzIGFyZSBjb21tb24uIElmIHRoZSBleGFjdCBjb21iaW5hdGlvbiBkb2VzXG4gICAgICAgIC8vIG5vdCBleGlzdCwgbW92ZSB0byB0aGUgZmlyc3QgcmVhbCBwcm9kdWN0IGNvbnRhaW5pbmcgdGhlIGNoYW5nZWQgdmFsdWUuXG4gICAgICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgICAgICAgcHJvZHVjdCA9IHRoaXMuZGF0YS5wcm9kdWN0cy5maW5kKChpdGVtKSA9PiBTdHJpbmcoaXRlbS5maWVsZHNbYWxpYXNdKSA9PT0gU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9kdWN0KSByZXR1cm47XG5cblx0XHR0aGlzLnNlbGVjdGVkID0gdGhpcy52aXNpYmxlU2VsZWN0aW9uKHByb2R1Y3QuZmllbGRzKTtcbiAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0ID0gTnVtYmVyKHByb2R1Y3QuaWQpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQuYWN0aW9uID09PSAnbmF2aWdhdGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHByb2R1Y3QubGluayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0KHByb2R1Y3QpO1xuICAgIH1cblxuICAgIG1hdGNoZXMocHJvZHVjdCwgc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzZWxlY3Rpb24pLmV2ZXJ5KChbYWxpYXMsIHZhbHVlXSkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2FsaWFzXSkgPT09IFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCBkaXNhYmxlVW5hdmFpbGFibGUgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmRpc2FibGVVbmF2YWlsYWJsZSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgdGhpcy5kYXRhLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJtLWZpZWxkPVwiJHtDU1MuZXNjYXBlKGZpZWxkLmFsaWFzKX1cIl1gKTtcbiAgICAgICAgICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXZhbHVlXScpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IFN0cmluZyhvcHRpb24uZGF0YXNldC5ybVZhbHVlKSA9PT0gU3RyaW5nKHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhdmFpbGFibGUgPSB0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24uZGF0YXNldC5ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBhY3RpdmUgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgncm12YXJpYW50c19fb3B0aW9uLS1hY3RpdmUnLCBhY3RpdmUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kaXNhYmxlZCA9IGRpc2FibGVVbmF2YWlsYWJsZSAmJiAhYXZhaWxhYmxlO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBvcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19zZWxlY3QnKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSB0aGlzLnNlbGVjdGVkW2ZpZWxkLmFsaWFzXSA/PyAnJztcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gZGlzYWJsZVVuYXZhaWxhYmxlICYmICF0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHRjb25zdCBzZWxlY3RlZExhYmVsID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1zZWxlY3RlZC1sYWJlbF0nKTtcblx0XHRcdGlmIChzZWxlY3RlZExhYmVsKSB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gU3RyaW5nKHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdID8/ICcnKTtcblx0XHRcdFx0Y29uc3Qgb3B0aW9uID0gZmllbGQub3B0aW9ucy5maW5kKChpdGVtKSA9PiBTdHJpbmcoaXRlbS52YWx1ZSkgPT09IHZhbHVlKTtcblx0XHRcdFx0c2VsZWN0ZWRMYWJlbC50ZXh0Q29udGVudCA9IG9wdGlvbj8ubGFiZWwgPyBgIMK3ICR7b3B0aW9uLmxhYmVsfWAgOiAnJztcblx0XHRcdH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNBdmFpbGFibGUoYWxpYXMsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG90aGVyRmllbGRzID0gT2JqZWN0LmVudHJpZXModGhpcy5zZWxlY3RlZCkuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSBhbGlhcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucHJvZHVjdHMuc29tZSgocHJvZHVjdCkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2FsaWFzXSkgPT09IFN0cmluZyh2YWx1ZSlcbiAgICAgICAgICAgICYmIG90aGVyRmllbGRzLmV2ZXJ5KChba2V5LCBzZWxlY3RlZF0pID0+IFN0cmluZyhwcm9kdWN0LmZpZWxkc1trZXldKSA9PT0gU3RyaW5nKHNlbGVjdGVkKSkpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRQcm9kdWN0KHByb2R1Y3QsIHVwZGF0ZUhpc3RvcnkgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19zdGF0dXMnKTtcbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWxhYmVsLWxvYWRpbmddJyk/LnRleHRDb250ZW50IHx8ICdMb2FkaW5n4oCmJztcbiAgICAgICAgY29uc3QgcHJvZHVjdFNjb3BlID0gdGhpcy5jb250YWluZXIuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKTtcbiAgICAgICAgaWYgKHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gbG9hZGluZztcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgncm12YXJpYW50cy0tbG9hZGluZycpO1xuXHRcdHByb2R1Y3RTY29wZT8uY2xhc3NMaXN0LmFkZCgncm0tcHJvZHVjdC0tbG9hZGluZycpO1xuXHRcdHByb2R1Y3RTY29wZT8uc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCAndHJ1ZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmcpIHRoaXMucGVuZGluZy5hYm9ydCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBlbmRpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGwgPSBhd2FpdCByZXF1ZXN0UHJvZHVjdCh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmVuZHBvaW50LCAndmFyaWFudCcsIHByb2R1Y3QuaWQsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcm9kdWN0KGZ1bGwsIHVwZGF0ZUhpc3RvcnkpO1xuICAgICAgICAgICAgaWYgKHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InICYmIHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdybXZhcmlhbnRzLS1sb2FkaW5nJyk7XG5cdFx0XHRcdHByb2R1Y3RTY29wZT8uY2xhc3NMaXN0LnJlbW92ZSgncm0tcHJvZHVjdC0tbG9hZGluZycpO1xuXHRcdFx0XHRwcm9kdWN0U2NvcGU/LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1idXN5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UHJvZHVjdChwcm9kdWN0LCB1cGRhdGVIaXN0b3J5ID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25Qcm9kdWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uUHJvZHVjdChwcm9kdWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgICAgICBjb25zdCBzY29wZSA9IHNvdXJjZVxuXHRcdFx0XHQ/IHJlc29sdmVQcm9kdWN0U2NvcGUoc291cmNlKVxuXHRcdFx0XHQ6IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ/LmNsb3Nlc3QoJy5lbC1pdGVtLCAudWstY2FyZCwgLnJtLXByb2R1Y3QtY2FyZCcpIHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbCgnW3JhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNhcnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FydC5kYXRhc2V0LmlkID0gcHJvZHVjdC5pZDtcbiAgICAgICAgICAgICAgICAgICAgY2FydC5kYXRhc2V0LnJtRHluYW1pY1Byb2R1Y3QgPSAndHJ1ZSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmxNb2RlID0gdGhpcy5jb250YWluZXIuZGF0YXNldC51cGRhdGVVcmw7XG4gICAgICAgIGNvbnN0IGhpc3RvcnlNZXRob2QgPSB1cmxNb2RlID09PSAncHVzaCcgPyAncHVzaFN0YXRlJyA6IHVybE1vZGUgPT09ICdyZXBsYWNlJyA/ICdyZXBsYWNlU3RhdGUnIDogbnVsbDtcbiAgICAgICAgaWYgKHVwZGF0ZUhpc3RvcnkgJiYgaGlzdG9yeU1ldGhvZCAmJiBwcm9kdWN0LmxpbmsgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5Py5baGlzdG9yeU1ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5W2hpc3RvcnlNZXRob2RdKHsuLi53aW5kb3cuaGlzdG9yeS5zdGF0ZSwgcm1Qcm9kdWN0SWQ6IHByb2R1Y3QuaWR9LCAnJywgcHJvZHVjdC5saW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0fVxuICAgICAgICB9KSk7XG4gICAgfVxufVxuXG5jbGFzcyBRdWlja1ZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBudWxsO1xuXHRcdHRoaXMuYnVpbGRlckNvbnRleHQgPSBudWxsO1xuXHRcdHRoaXMubW9kYWxDbGFzc2VzID0gW107XG4gICAgfVxuXG4gICAgYXN5bmMgb3Blbih0cmlnZ2VyKSB7XG4gICAgICAgIGNvbnN0IGlkID0gTnVtYmVyKHRyaWdnZXIuZGF0YXNldC5ybVF1aWNrVmlldyk7XG4gICAgICAgIGlmICghaWQpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBKU09OLnBhcnNlKHRyaWdnZXIuZGF0YXNldC5zZXR0aW5ncyB8fCAne30nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlTW9kYWwoKTtcblx0XHRjb25zdCByb290ID0gdHJpZ2dlci5jbG9zZXN0KCdbZGF0YS1ybS1xdWljay12aWV3LXJvb3RdJyk7XG5cdFx0Y29uc3QgZGlhbG9nID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2RpYWxvZycpO1xuXHRcdGNvbnN0IGxhYmVsID0gcm9vdD8uZGF0YXNldC5ybVF1aWNrVmlld0xhYmVsIHx8IHRyaWdnZXIudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0XHR8fCB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVSUNLX1ZJRVcnLCBsYWJlbHMucXVpY2tWaWV3KTtcblx0XHR0aGlzLm1vZGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsKTtcblx0XHRpZiAoZGlhbG9nKSBkaWFsb2cuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuXHRcdGlmIChyb290Py5kYXRhc2V0LmlkKSB0aGlzLm1vZGFsLmRhdGFzZXQuaWQgPSByb290LmRhdGFzZXQuaWQ7XG5cdFx0ZWxzZSBkZWxldGUgdGhpcy5tb2RhbC5kYXRhc2V0LmlkO1xuICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICB0aGlzLnNldExvYWRpbmcoKTtcblx0XHR0aGlzLmJ1aWxkZXJDb250ZXh0ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wZW5kaW5nO1xuXG4gICAgICAgIHRyeSB7XG5cdFx0XHRpZiAodHJpZ2dlci5kYXRhc2V0LmNvbnRlbnRNb2RlID09PSAnYnVpbGRlcicgJiYgdHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQpIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0gYCR7dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50fTpsYXlvdXQ6JHt0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZH06JHtpZH1gO1xuXHRcdFx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG5cdFx0XHRcdFx0PyBjbG9uZSh0aGlzLmNhY2hlLmdldChrZXkpKVxuXHRcdFx0XHRcdDogYXdhaXQgcmVxdWVzdFF1aWNrVmlld0xheW91dChcblx0XHRcdFx0XHRcdHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCxcblx0XHRcdFx0XHRcdGlkLFxuXHRcdFx0XHRcdFx0dHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyLnNpZ25hbFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY2FjaGUuc2V0KGtleSwgY2xvbmUobGF5b3V0KSk7XG5cdFx0XHRcdHRoaXMucHJvZHVjdCA9IG51bGw7XG5cdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyQnVpbGRlckNvbnRlbnQobGF5b3V0Lmh0bWwsIHtcblx0XHRcdFx0XHRlbmRwb2ludDogdHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50LFxuXHRcdFx0XHRcdHRlbXBsYXRlSWQ6IHRyaWdnZXIuZGF0YXNldC50ZW1wbGF0ZUlkLFxuXHRcdFx0XHRcdHByb2R1Y3RJZDogaWRcblx0XHRcdFx0fSwgbGF5b3V0LmFzc2V0cyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50fToke2lkfWA7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5jYWNoZS5oYXMoa2V5KVxuICAgICAgICAgICAgICAgID8gY2xvbmUodGhpcy5jYWNoZS5nZXQoa2V5KSlcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHJlcXVlc3RQcm9kdWN0KHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCwgJ3F1aWNrVmlldycsIGlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChrZXksIGNsb25lKHByb2R1Y3QpKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcihwcm9kdWN0LCB0cmlnZ2VyLmRhdGFzZXQuZW5kcG9pbnQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09ICdBYm9ydEVycm9yJykgdGhpcy5yZW5kZXJFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IGNvbnRyb2xsZXIpIHRoaXMucGVuZGluZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbnN1cmVNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHJldHVybjtcbiAgICAgICAgdGhpcy5tb2RhbCA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlldyB1ay1tb2RhbCcsIHtcbiAgICAgICAgICAgICd1ay1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVJQ0tfVklFVycsIGxhYmVscy5xdWlja1ZpZXcpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwicm1xdWlja3ZpZXdfX2RpYWxvZyB1ay1tb2RhbC1kaWFsb2dcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsPVwiJHt0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVSUNLX1ZJRVcnLCBsYWJlbHMucXVpY2tWaWV3KX1cIj48YnV0dG9uIGNsYXNzPVwicm1xdWlja3ZpZXdfX2Nsb3NlIHVrLW1vZGFsLWNsb3NlLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgdWstY2xvc2UgYXJpYS1sYWJlbD1cIiR7dHJhbnNsYXRlKCdKTElCX0hUTUxfQkVIQVZJT1JfQ0xPU0UnLCAnQ2xvc2UnKX1cIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwicm1xdWlja3ZpZXdfX2JvZHkgdWstbW9kYWwtYm9keVwiPjwvZGl2PjwvZGl2PmA7XG5cdFx0dGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8ucHJvZHVjdD8uaWQpO1xuXHRcdFx0aWYgKHRoaXMuYnVpbGRlckNvbnRleHQgJiYgcHJvZHVjdElkKSB0aGlzLmxvYWRCdWlsZGVyUHJvZHVjdChwcm9kdWN0SWQpO1xuXHRcdH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLm1vZGFsQ2xhc3Nlcyk7XG5cdFx0dGhpcy5tb2RhbENsYXNzZXMgPSBTdHJpbmcodGhpcy5zZXR0aW5ncy5tb2RhbENsYXNzIHx8ICcnKS5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKTtcblx0XHR0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5tb2RhbENsYXNzZXMpO1xuICAgICAgICBjb25zdCBtb2RhbFNpemUgPSBbJycsICdzbWFsbCcsICdsYXJnZScsICd4bGFyZ2UnLCAnY29udGFpbmVyJywgJ2Z1bGwnXS5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLm1vZGFsU2l6ZSlcbiAgICAgICAgICAgID8gdGhpcy5zZXR0aW5ncy5tb2RhbFNpemUgOiAnY29udGFpbmVyJztcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy5zZXR0aW5ncy5tb2RhbENlbnRlciAhPT0gZmFsc2UgJiYgbW9kYWxTaXplICE9PSAnZnVsbCc7XG4gICAgICAgIGNvbnN0IGJnQ2xvc2UgPSB0aGlzLnNldHRpbmdzLmJnQ2xvc2UgIT09IGZhbHNlO1xuICAgICAgICBjb25zdCBlc2NDbG9zZSA9IHRoaXMuc2V0dGluZ3MuZXNjQ2xvc2UgIT09IGZhbHNlO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBjb25zdCBjbG9zZSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19jbG9zZScpO1xuICAgICAgICBjb25zdCBjb250ZW50UGFkZGluZyA9IFsnbm9uZScsICdzbWFsbCcsICdkZWZhdWx0JywgJ2xhcmdlJ10uaW5jbHVkZXModGhpcy5zZXR0aW5ncy5jb250ZW50UGFkZGluZylcbiAgICAgICAgICAgID8gdGhpcy5zZXR0aW5ncy5jb250ZW50UGFkZGluZyA6ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWNvbnRhaW5lcicsIG1vZGFsU2l6ZSA9PT0gJ2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWZ1bGwnLCBtb2RhbFNpemUgPT09ICdmdWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgndWstZmxleC10b3AnLCBjZW50ZXIpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3LS1zbWFsbCcsIG1vZGFsU2l6ZSA9PT0gJ3NtYWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXctLWxhcmdlJywgbW9kYWxTaXplID09PSAnbGFyZ2UnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlldy0teGxhcmdlJywgbW9kYWxTaXplID09PSAneGxhcmdlJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXctLW1vYmlsZS1mdWxsJywgdGhpcy5zZXR0aW5ncy5tb2JpbGVGdWxsc2NyZWVuICE9PSBmYWxzZSB8fCBtb2RhbFNpemUgPT09ICdmdWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCd1ay1tb2RhbCcsIGBiZy1jbG9zZTogJHtiZ0Nsb3NlfTsgZXNjLWNsb3NlOiAke2VzY0Nsb3NlfWApO1xuXG4gICAgICAgIGRpYWxvZz8uY2xhc3NMaXN0LnRvZ2dsZSgndWstbWFyZ2luLWF1dG8tdmVydGljYWwnLCBjZW50ZXIpO1xuICAgICAgICBib2R5Py5jbGFzc0xpc3QudG9nZ2xlKCd1ay1vdmVyZmxvdy1hdXRvJywgdGhpcy5zZXR0aW5ncy5vdmVyZmxvd0F1dG8gPT09IHRydWUpO1xuICAgICAgICBbJ25vbmUnLCAnc21hbGwnLCAnZGVmYXVsdCcsICdsYXJnZSddLmZvckVhY2goKHBhZGRpbmcpID0+IHtcbiAgICAgICAgICAgIGJvZHk/LmNsYXNzTGlzdC50b2dnbGUoYHJtcXVpY2t2aWV3X19ib2R5LS1wYWRkaW5nLSR7cGFkZGluZ31gLCBwYWRkaW5nID09PSBjb250ZW50UGFkZGluZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2xvc2UpIHtcbiAgICAgICAgICAgIGNsb3NlLmhpZGRlbiA9IHRoaXMuc2V0dGluZ3Muc2hvd0Nsb3NlID09PSBmYWxzZTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLWNsb3NlLWxhcmdlJywgdGhpcy5zZXR0aW5ncy5jbG9zZUxhcmdlID09PSB0cnVlIHx8IG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnKTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWNsb3NlLWRlZmF1bHQnLCBtb2RhbFNpemUgIT09ICdmdWxsJyk7XG4gICAgICAgICAgICBjbG9zZS5jbGFzc0xpc3QudG9nZ2xlKCd1ay1tb2RhbC1jbG9zZS1mdWxsJywgbW9kYWxTaXplID09PSAnZnVsbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5VSWtpdD8ubW9kYWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHdpbmRvdy5VSWtpdC5tb2RhbCh0aGlzLm1vZGFsKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQ/LiRwcm9wcykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC4kcHJvcHMuYmdDbG9zZSA9IGJnQ2xvc2U7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LiRwcm9wcy5lc2NDbG9zZSA9IGVzY0Nsb3NlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50LnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgndWstb3BlbicpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExvYWRpbmcoKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBib2R5LnJlcGxhY2VDaGlsZHJlbihlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2xvYWRlcicsIHsndWstc3Bpbm5lcic6ICdyYXRpbzogMS41J30pKTtcbiAgICB9XG5cbiAgICByZW5kZXJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGFsZXJ0ID0gZWxlbWVudCgnZGl2JywgJ3VrLWFsZXJ0LWRhbmdlcicsIHsndWstYWxlcnQnOiB0cnVlfSk7XG4gICAgICAgIGFsZXJ0LmFwcGVuZCh0ZXh0KG1lc3NhZ2UgfHwgdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19FUlJPUl9MT0FEX1BST0RVQ1QnLCBsYWJlbHMuZXJyb3IpKSk7XG4gICAgICAgIHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5JykucmVwbGFjZUNoaWxkcmVuKGFsZXJ0KTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJCdWlsZGVyQ29udGVudChodG1sLCBjb250ZXh0ID0gdGhpcy5idWlsZGVyQ29udGV4dCwgYXNzZXRzID0ge30pIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG5cdFx0aWYgKGFzc2V0cy5vcHRpb25zICYmIHdpbmRvdy5Kb29tbGE/LmxvYWRPcHRpb25zKSB7XG5cdFx0XHR3aW5kb3cuSm9vbWxhLmxvYWRPcHRpb25zKGFzc2V0cy5vcHRpb25zKTtcblx0XHR9XG5cdFx0YXdhaXQgbG9hZEFzc2V0cyhhc3NldHMsICdzdHlsZScpO1xuXHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCk7XG5cdFx0Ly8gQSBRdWljayBWaWV3IGlzIGFuIGlzb2xhdGVkIHByb2R1Y3Qgc3VyZmFjZS4gSXRzIHZhcmlhbnQgY29udHJvbHMgbWF5XG5cdFx0Ly8gcmUtcmVuZGVyIHRoZSBtb2RhbCwgYnV0IG11c3QgbmV2ZXIgcmVwbGFjZSB0aGUgbGlzdGluZyBVUkwgb3IgdGhlXG5cdFx0Ly8gbGlzdGluZyBkb2N1bWVudCdzIFNFTyBtZXRhZGF0YS5cblx0XHRmcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS12YXJpYW50c10nKS5mb3JFYWNoKChzZWxlY3RvcikgPT4ge1xuXHRcdFx0c2VsZWN0b3IuZGF0YXNldC51cGRhdGVVcmwgPSAnbm9uZSc7XG5cdFx0fSk7XG5cdFx0ZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tcHJvZHVjdC1wYWdlXScpLmZvckVhY2goKHNjb3BlKSA9PiB7XG5cdFx0XHRzY29wZS5kYXRhc2V0LnVwZGF0ZURvY3VtZW50VGl0bGUgPSAnZmFsc2UnO1xuXHRcdFx0c2NvcGUuZGF0YXNldC51cGRhdGVEb2N1bWVudE1ldGFkYXRhID0gJ2ZhbHNlJztcblx0XHR9KTtcblx0XHRib2R5LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG5cdFx0dGhpcy5idWlsZGVyQ29udGV4dCA9IGNvbnRleHQ7XG5cdFx0YXdhaXQgbG9hZEFzc2V0cyhhc3NldHMsICdzY3JpcHQnKTtcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5SYWRpY2FsTWFydENhcnQgPT09ICdmdW5jdGlvbicpIGVuc3VyZVJhZGljYWxNYXJ0RGlzcGxheSgpO1xuICAgICAgICBpZiAod2luZG93LlVJa2l0Py51cGRhdGUpIHdpbmRvdy5VSWtpdC51cGRhdGUoYm9keSk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LlJhZGljYWxNYXJ0Q2FydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2FydCA9IHdpbmRvdy5SYWRpY2FsTWFydENhcnQoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FydD8ubG9hZEFjdGlvbnMgPT09ICdmdW5jdGlvbicpIGNhcnQubG9hZEFjdGlvbnMoYm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgneXRkeW5hbWljczpxdWlja3ZpZXctb3BlbicsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgIH1cblxuXHRhc3luYyBsb2FkQnVpbGRlclByb2R1Y3QocHJvZHVjdElkKSB7XG5cdFx0Y29uc3QgY29udGV4dCA9IHRoaXMuYnVpbGRlckNvbnRleHQ7XG5cdFx0aWYgKCFjb250ZXh0IHx8IE51bWJlcihjb250ZXh0LnByb2R1Y3RJZCkgPT09IE51bWJlcihwcm9kdWN0SWQpKSByZXR1cm47XG5cblx0XHR0aGlzLnNldExvYWRpbmcoKTtcblx0XHRpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcblx0XHR0aGlzLnBlbmRpbmcgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdFx0Y29uc3QgY29udHJvbGxlciA9IHRoaXMucGVuZGluZztcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBrZXkgPSBgJHtjb250ZXh0LmVuZHBvaW50fTpsYXlvdXQ6JHtjb250ZXh0LnRlbXBsYXRlSWR9OiR7cHJvZHVjdElkfWA7XG5cdFx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG5cdFx0XHRcdD8gY2xvbmUodGhpcy5jYWNoZS5nZXQoa2V5KSlcblx0XHRcdFx0OiBhd2FpdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0KGNvbnRleHQuZW5kcG9pbnQsIHByb2R1Y3RJZCwgY29udGV4dC50ZW1wbGF0ZUlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG5cdFx0XHR0aGlzLmNhY2hlLnNldChrZXksIGNsb25lKGxheW91dCkpO1xuXHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJCdWlsZGVyQ29udGVudChsYXlvdXQuaHRtbCwgey4uLmNvbnRleHQsIHByb2R1Y3RJZH0sIGxheW91dC5hc3NldHMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InKSB0aGlzLnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRpZiAodGhpcy5wZW5kaW5nID09PSBjb250cm9sbGVyKSB0aGlzLnBlbmRpbmcgPSBudWxsO1xuXHRcdH1cblx0fVxuXG4gICAgcmVuZGVyKHByb2R1Y3QsIGVuZHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2xheW91dCB1ay1ncmlkLWxhcmdlIHVrLWZsZXgtbWlkZGxlJywgeyd1ay1ncmlkJzogdHJ1ZSwgJ2RhdGEtcm0tcHJvZHVjdC1zY29wZSc6IHRydWV9KTtcbiAgICAgICAgY29uc3QgbWVkaWFDb2x1bW4gPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX21lZGlhLWNvbHVtbiB1ay13aWR0aC0xLTJAbScpO1xuICAgICAgICBjb25zdCBjb250ZW50Q29sdW1uID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19jb250ZW50IHVrLXdpZHRoLWV4cGFuZEBtJyk7XG5cbiAgICAgICAgbWVkaWFDb2x1bW4uYXBwZW5kKHRoaXMucmVuZGVyTWVkaWEocHJvZHVjdC5tZWRpYSB8fCBbXSkpO1xuICAgICAgICBjb250ZW50Q29sdW1uLmFwcGVuZCh0aGlzLnJlbmRlckNvbnRlbnQocHJvZHVjdCwgZW5kcG9pbnQpKTtcbiAgICAgICAgbGF5b3V0LmFwcGVuZChtZWRpYUNvbHVtbiwgY29udGVudENvbHVtbik7XG4gICAgICAgIGJvZHkucmVwbGFjZUNoaWxkcmVuKGxheW91dCk7XG4gICAgICAgIGlmICh3aW5kb3cuVUlraXQ/LnVwZGF0ZSkgd2luZG93LlVJa2l0LnVwZGF0ZShib2R5KTtcbiAgICB9XG5cbiAgICByZW5kZXJNZWRpYShtZWRpYSkge1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19tZWRpYScpO1xuICAgICAgICBjb25zdCBtYWluID0gZWxlbWVudCgnYnV0dG9uJywgJ3JtcXVpY2t2aWV3X19tYWluLWltYWdlJywge3R5cGU6ICdidXR0b24nfSk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZWxlbWVudCgnaW1nJywgJycsIHtsb2FkaW5nOiAnZWFnZXInfSk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZWxlbWVudCgnc3BhbicsICdybXF1aWNrdmlld19fcGxhY2Vob2xkZXIgdWstdGV4dC1tdXRlZCcpO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlckljb24gPSBlbGVtZW50KCdzcGFuJywgJycsIHsndWstaWNvbic6ICdpY29uOiBpbWFnZTsgcmF0aW86IDIuNSd9KTtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUZXh0ID0gZWxlbWVudCgnc3BhbicsICd1ay1kaXNwbGF5LWJsb2NrIHVrLXRleHQtc21hbGwgdWstbWFyZ2luLXNtYWxsLXRvcCcpO1xuICAgICAgICBwbGFjZWhvbGRlclRleHQuYXBwZW5kKHRleHQodHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19OT19JTUFHRScsIGxhYmVscy5ub0ltYWdlKSkpO1xuICAgICAgICBwbGFjZWhvbGRlci5hcHBlbmQocGxhY2Vob2xkZXJJY29uLCBwbGFjZWhvbGRlclRleHQpO1xuICAgICAgICBjb25zdCBpdGVtcyA9IG1lZGlhLmxlbmd0aCA/IG1lZGlhIDogW3tzcmM6ICcnLCBhbHQ6IHRoaXMucHJvZHVjdD8udGl0bGUgfHwgJyd9XTtcblxuICAgICAgICBjb25zdCBzZWxlY3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoaXRlbS5zcmMpIGltYWdlLnNyYyA9IGl0ZW0uc3JjO1xuICAgICAgICAgICAgZWxzZSBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gaXRlbS5hbHQgfHwgdGhpcy5wcm9kdWN0Py50aXRsZSB8fCAnJztcbiAgICAgICAgICAgIG1haW4uZGlzYWJsZWQgPSAhaXRlbS5zcmM7XG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3X19tYWluLWltYWdlLS1lbXB0eScsICFpdGVtLnNyYyk7XG4gICAgICAgICAgICBpbWFnZS5oaWRkZW4gPSAhaXRlbS5zcmM7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5oaWRkZW4gPSBCb29sZWFuKGl0ZW0uc3JjKTtcbiAgICAgICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLnJtcXVpY2t2aWV3X190aHVtYicpLmZvckVhY2goKHRodW1iLCB0aHVtYkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGh1bWIuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXdfX3RodW1iLS1hY3RpdmUnLCB0aHVtYkluZGV4ID09PSBpbmRleCk7XG4gICAgICAgICAgICAgICAgdGh1bWIuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCB0aHVtYkluZGV4ID09PSBpbmRleCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG1haW4uYXBwZW5kKGltYWdlLCBwbGFjZWhvbGRlcik7XG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW1hZ2Uuc3JjICYmIHdpbmRvdy5VSWtpdD8ubGlnaHRib3hQYW5lbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5VSWtpdC5saWdodGJveFBhbmVsKHtpdGVtczogaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnNyYykubWFwKChpdGVtKSA9PiAoe3NvdXJjZTogaXRlbS5zcmMsIGNhcHRpb246IGl0ZW0uYWx0fSkpfSkuc2hvdygwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kKG1haW4pO1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCB0aHVtYnMgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX3RodW1icyB1ay1mbGV4IHVrLWZsZXgtY2VudGVyIHVrLWZsZXgtd3JhcCcpO1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtZW50KCdidXR0b24nLCAncm1xdWlja3ZpZXdfX3RodW1iJywge3R5cGU6ICdidXR0b24nLCAnYXJpYS1sYWJlbCc6IGl0ZW0uYWx0IHx8IGAke2luZGV4ICsgMX1gfSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZChlbGVtZW50KCdpbWcnLCAnJywge3NyYzogaXRlbS5zcmMsIGFsdDogJycsIGxvYWRpbmc6ICdsYXp5J30pKTtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3QoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICB0aHVtYnMuYXBwZW5kKGJ1dHRvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKHRodW1icyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0KDApO1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHByb2R1Y3QsIGVuZHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQoJ2gyJywgJ3JtcXVpY2t2aWV3X190aXRsZSB1ay1oMiB1ay1tYXJnaW4tcmVtb3ZlLXRvcCcpO1xuICAgICAgICBjb25zdCBsaW5rID0gZWxlbWVudCgnYScsICd1ay1saW5rLWhlYWRpbmcnLCB7aHJlZjogcHJvZHVjdC5saW5rfSk7XG4gICAgICAgIGxpbmsuYXBwZW5kKHRleHQocHJvZHVjdC50aXRsZSkpO1xuICAgICAgICB0aXRsZS5hcHBlbmQobGluayk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZCh0aXRsZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0NvZGUgJiYgcHJvZHVjdC5jb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19jb2RlIHVrLXRleHQtbWV0YSB1ay1tYXJnaW4tc21hbGwtYm90dG9tJyk7XG4gICAgICAgICAgICBjb2RlLmFwcGVuZCh0ZXh0KHByb2R1Y3QuY29kZSkpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJpY2UgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX3ByaWNlIHVrLXRleHQtbGFyZ2UgdWstdGV4dC1ib2xkJyk7XG4gICAgICAgIGlmIChwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQgJiYgcHJvZHVjdC5wcmljZS5iYXNlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRQcmljZSA9IGVsZW1lbnQoJ3MnLCAndWstdGV4dC1tdXRlZCB1ay1tYXJnaW4tc21hbGwtcmlnaHQnKTtcbiAgICAgICAgICAgIG9sZFByaWNlLmFwcGVuZCh0ZXh0KHByb2R1Y3QucHJpY2UuYmFzZSkpO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kKG9sZFByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaW5hbFByaWNlID0gZWxlbWVudCgnc3BhbicsICcnLCB7J2RhdGEtcm0tcHJpY2UnOiB0cnVlfSk7XG4gICAgICAgIGZpbmFsUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZT8uZmluYWwpKTtcbiAgICAgICAgcHJpY2UuYXBwZW5kKGZpbmFsUHJpY2UpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQocHJpY2UpO1xuXG4gICAgICAgIGNvbnN0IHN0b2NrID0gZWxlbWVudCgnZGl2JywgYHJtcXVpY2t2aWV3X19zdG9jayB1ay1tYXJnaW4tc21hbGwtdG9wICR7cHJvZHVjdC5pblN0b2NrID8gJ3VrLXRleHQtc3VjY2VzcycgOiAndWstdGV4dC1tdXRlZCd9YCwgeydkYXRhLXJtLXN0b2NrJzogdHJ1ZX0pO1xuICAgICAgICBzdG9jay5hcHBlbmQodGV4dChwcm9kdWN0LmluU3RvY2tcbiAgICAgICAgICAgID8gdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfSU5fU1RPQ0snLCBsYWJlbHMuaW5TdG9jaylcbiAgICAgICAgICAgIDogdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfTk9UX0lOX1NUT0NLJywgbGFiZWxzLm91dE9mU3RvY2spKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChzdG9jayk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0Rlc2NyaXB0aW9uICYmIHByb2R1Y3QuaW50cm90ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVsZW1lbnQoJ3AnLCAncm1xdWlja3ZpZXdfX2Rlc2NyaXB0aW9uIHVrLW1hcmdpbicpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uYXBwZW5kKHRleHQocHJvZHVjdC5pbnRyb3RleHQpKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93VmFyaWFudHMgJiYgcHJvZHVjdC52YXJpYW50cz8uZmllbGRzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRzID0gdGhpcy5yZW5kZXJWYXJpYW50cyhwcm9kdWN0LnZhcmlhbnRzLCBlbmRwb2ludCk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQodmFyaWFudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0NhcnQpIGZyYWdtZW50LmFwcGVuZCh0aGlzLnJlbmRlckNhcnQocHJvZHVjdCkpO1xuXG4gICAgICAgIGNvbnN0IG1vcmUgPSBlbGVtZW50KCdhJywgJ3JtcXVpY2t2aWV3X19tb3JlIHVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dCB1ay1tYXJnaW4tdG9wJywge2hyZWY6IHByb2R1Y3QubGlua30pO1xuICAgICAgICBtb3JlLmFwcGVuZCh0ZXh0KHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfREVUQUlMUycsIGxhYmVscy5kZXRhaWxzKSkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQobW9yZSk7XG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9XG5cbiAgICByZW5kZXJWYXJpYW50cyhkYXRhLCBlbmRwb2ludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBlbGVtZW50KCdkaXYnLCAncm12YXJpYW50cyBybXF1aWNrdmlld19fdmFyaWFudHMgdWstZm9ybS1zdGFja2VkJywge1xuICAgICAgICAgICAgJ2RhdGEtcm0tdmFyaWFudHMnOiB0cnVlLFxuICAgICAgICAgICAgJ2RhdGEtZW5kcG9pbnQnOiBlbmRwb2ludCxcbiAgICAgICAgICAgICdkYXRhLWFjdGlvbic6ICdhamF4JyxcbiAgICAgICAgICAgICdkYXRhLWRpc2FibGUtdW5hdmFpbGFibGUnOiAndHJ1ZScsXG4gICAgICAgICAgICAnZGF0YS11cGRhdGUtdXJsJzogJ2ZhbHNlJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjdXJyZW50ID0gZGF0YS5wcm9kdWN0cy5maW5kKChpdGVtKSA9PiBOdW1iZXIoaXRlbS5pZCkgPT09IE51bWJlcihkYXRhLmN1cnJlbnRQcm9kdWN0KSk7XG4gICAgICAgIGRhdGEuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZHNldCA9IGVsZW1lbnQoJ2ZpZWxkc2V0JywgJ3JtdmFyaWFudHNfX2ZpZWxkIHVrLWZpZWxkc2V0JywgeydkYXRhLXJtLWZpZWxkJzogZmllbGQuYWxpYXN9KTtcbiAgICAgICAgICAgIGNvbnN0IGxlZ2VuZCA9IGVsZW1lbnQoJ2xlZ2VuZCcsICdybXZhcmlhbnRzX19sYWJlbCB1ay1mb3JtLWxhYmVsJyk7XG4gICAgICAgICAgICBsZWdlbmQuYXBwZW5kKHRleHQoZmllbGQudGl0bGUpKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBlbGVtZW50KCdkaXYnLCAncm12YXJpYW50c19fb3B0aW9ucyB1ay1mbGV4IHVrLWZsZXgtd3JhcCB1ay1mbGV4LW1pZGRsZScsIHtyb2xlOiAnZ3JvdXAnLCAnYXJpYS1sYWJlbCc6IGZpZWxkLnRpdGxlfSk7XG5cbiAgICAgICAgICAgIGZpZWxkLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gU3RyaW5nKGN1cnJlbnQ/LmZpZWxkc1tmaWVsZC5hbGlhc10pID09PSBTdHJpbmcob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzd2F0Y2ggPSBvcHRpb24uaW1hZ2UgfHwgb3B0aW9uLmNvbG9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW1lbnQoJ2J1dHRvbicsIGBybXZhcmlhbnRzX19vcHRpb24gdWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0JHtzd2F0Y2ggPyAnIHJtdmFyaWFudHNfX29wdGlvbi0tc3dhdGNoJyA6ICcnfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsICdkYXRhLXJtLXZhbHVlJzogb3B0aW9uLnZhbHVlLCAnYXJpYS1wcmVzc2VkJzogYWN0aXZlID8gJ3RydWUnIDogJ2ZhbHNlJywgdGl0bGU6IG9wdGlvbi5sYWJlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaW1hZ2UpIGJ1dHRvbi5hcHBlbmQoZWxlbWVudCgnaW1nJywgJycsIHtzcmM6IG9wdGlvbi5pbWFnZSwgYWx0OiAnJywgbG9hZGluZzogJ2xhenknfSkpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbi5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IGVsZW1lbnQoJ3NwYW4nLCAncm12YXJpYW50c19fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3Iuc3R5bGUuc2V0UHJvcGVydHkoJy0tcm0tc3dhdGNoJywgb3B0aW9uLmNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZChjb2xvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGJ1dHRvbi5hcHBlbmQodGV4dChvcHRpb24ubGFiZWwpKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmFwcGVuZChidXR0b24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWVsZHNldC5hcHBlbmQobGVnZW5kLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZmllbGRzZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChlbGVtZW50KCdkaXYnLCAncm12YXJpYW50c19fc3RhdHVzIHVrLXRleHQtc21hbGwnLCB7J2FyaWEtbGl2ZSc6ICdwb2xpdGUnfSkpO1xuXG4gICAgICAgIG5ldyBWYXJpYW50UGlja2VyKGNvbnRhaW5lciwgZGF0YSwgKHNlbGVjdGVkKSA9PiB0aGlzLnVwZGF0ZVByb2R1Y3Qoc2VsZWN0ZWQpKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FydChwcm9kdWN0KSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fY2FydCB1ay1mbGV4IHVrLWZsZXgtbWlkZGxlIHVrLWZsZXgtd3JhcCB1ay1tYXJnaW4tdG9wJyk7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gZWxlbWVudCgnaW5wdXQnLCAndWstaW5wdXQgdWstZm9ybS13aWR0aC14c21hbGwnLCB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJywgdmFsdWU6IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxLCBtaW46IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxLCBzdGVwOiBwcm9kdWN0LnF1YW50aXR5Py5zdGVwIHx8IDEsXG4gICAgICAgICAgICBtYXg6IHByb2R1Y3QucXVhbnRpdHk/Lm1heCwgJ2FyaWEtbGFiZWwnOiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVQU5USVRZJywgbGFiZWxzLnF1YW50aXR5KVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbWVudCgnYnV0dG9uJywgJ3VrLWJ1dHRvbiB1ay1idXR0b24tcHJpbWFyeScsIHt0eXBlOiAnYnV0dG9uJ30pO1xuICAgICAgICBidXR0b24uYXBwZW5kKHRleHQodHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfQ0FSVF9BREQnLCBsYWJlbHMuYWRkVG9DYXJ0KSkpO1xuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LlJhZGljYWxNYXJ0Q2FydCAmJiB0aGlzLnByb2R1Y3Q/LmlkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlJhZGljYWxNYXJ0Q2FydCgpLmFkZFByb2R1Y3QoTnVtYmVyKHRoaXMucHJvZHVjdC5pZCksIE51bWJlcihxdWFudGl0eS52YWx1ZSkgfHwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByb3cuYXBwZW5kKHF1YW50aXR5LCBidXR0b24pO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAgIHVwZGF0ZVByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgICB0aGlzLnByb2R1Y3QgPSB7Li4udGhpcy5wcm9kdWN0LCAuLi5wcm9kdWN0fTtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX3RpdGxlIGEnKTtcbiAgICAgICAgY29uc3QgcHJpY2UgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fcHJpY2UnKTtcbiAgICAgICAgY29uc3Qgc3RvY2sgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXN0b2NrXScpO1xuICAgICAgICBjb25zdCBjb2RlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2NvZGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fZGVzY3JpcHRpb24nKTtcbiAgICAgICAgY29uc3QgY2FydCA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19jYXJ0IC51ay1idXR0b24tcHJpbWFyeScpO1xuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvZHVjdC50aXRsZTtcbiAgICAgICAgICAgIHRpdGxlLmhyZWYgPSBwcm9kdWN0Lmxpbms7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgICBwcmljZS5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQgJiYgcHJvZHVjdC5wcmljZS5iYXNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkUHJpY2UgPSBlbGVtZW50KCdzJywgJ3VrLXRleHQtbXV0ZWQgdWstbWFyZ2luLXNtYWxsLXJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgb2xkUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZS5iYXNlKSk7XG4gICAgICAgICAgICAgICAgcHJpY2UuYXBwZW5kKG9sZFByaWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbmFsUHJpY2UgPSBlbGVtZW50KCdzcGFuJywgJycsIHsnZGF0YS1ybS1wcmljZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGZpbmFsUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZT8uZmluYWwpKTtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZChmaW5hbFByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZSkgY29kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QuY29kZSB8fCAnJztcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2R1Y3QuaW50cm90ZXh0IHx8ICcnO1xuICAgICAgICBpZiAoc3RvY2spIHtcbiAgICAgICAgICAgIHN0b2NrLnRleHRDb250ZW50ID0gcHJvZHVjdC5pblN0b2NrXG4gICAgICAgICAgICAgICAgPyB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9JTl9TVE9DSycsIGxhYmVscy5pblN0b2NrKVxuICAgICAgICAgICAgICAgIDogdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfTk9UX0lOX1NUT0NLJywgbGFiZWxzLm91dE9mU3RvY2spO1xuICAgICAgICAgICAgc3RvY2suY2xhc3NMaXN0LnRvZ2dsZSgndWstdGV4dC1zdWNjZXNzJywgcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgICAgIHN0b2NrLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtbXV0ZWQnLCAhcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FydCkgY2FydC5kaXNhYmxlZCA9ICFwcm9kdWN0LmluU3RvY2s7XG5cbiAgICAgICAgY29uc3QgbWVkaWEgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fbWVkaWEnKTtcbiAgICAgICAgaWYgKG1lZGlhKSBtZWRpYS5yZXBsYWNlV2l0aCh0aGlzLnJlbmRlck1lZGlhKHByb2R1Y3QubWVkaWEgfHwgW10pKTtcbiAgICAgICAgY29uc3QgbW9yZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19tb3JlJyk7XG4gICAgICAgIGlmIChtb3JlKSBtb3JlLmhyZWYgPSBwcm9kdWN0Lmxpbms7XG4gICAgfVxufVxuXG5jb25zdCBxdWlja1ZpZXcgPSBuZXcgUXVpY2tWaWV3KCk7XG5jb25zdCBjYXJ0RmVlZGJhY2tUaW1lcnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBwcmVwYXJlQ2FydEJ1dHRvbiA9IChidXR0b24pID0+IHtcbiAgICBpZiAoIWJ1dHRvbi5kYXRhc2V0LnJtQ2FydE9yaWdpbmFsKSBidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbCA9IGJ1dHRvbi5pbm5lckhUTUw7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChjYXJ0RmVlZGJhY2tUaW1lcnMuZ2V0KGJ1dHRvbikpO1xufTtcblxuY29uc3Qgc2hvd0NhcnRQZW5kaW5nID0gKGNhcnQsIGJ1dHRvbikgPT4ge1xuICAgIHByZXBhcmVDYXJ0QnV0dG9uKGJ1dHRvbik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2FydC5kYXRhc2V0LnJtQ2FydExvYWRpbmcgfHwgbGFiZWxzLmxvYWRpbmc7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1idXN5JywgJ3RydWUnKTtcbn07XG5cbmNvbnN0IHNob3dDYXJ0RmVlZGJhY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQuZGV0YWlsPy5lcnJvcikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8uZW50cnk/LnByb2R1Y3RfaWQgfHwgMCk7XG4gICAgaWYgKCFwcm9kdWN0SWQpIHJldHVybjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIGBbcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl1bZGF0YS1pZD1cIiR7cHJvZHVjdElkfVwiXSwgYFxuICAgICAgICArIGBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXVtkYXRhLWlkPVwiJHtwcm9kdWN0SWR9XCJdYFxuICAgICkuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBjYXJ0LnF1ZXJ5U2VsZWN0b3IoJ1tyYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdJyk7XG4gICAgICAgIGlmICghYnV0dG9uKSByZXR1cm47XG5cbiAgICAgICAgcHJlcGFyZUNhcnRCdXR0b24oYnV0dG9uKTtcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2FydC5kYXRhc2V0LnJtQ2FydFN1Y2Nlc3MgfHwgbGFiZWxzLmNhcnRBZGRlZDtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JtLWJ1eV9fYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG5cbiAgICAgICAgY29uc3QgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYnV0dG9uLmRhdGFzZXQucm1DYXJ0T3JpZ2luYWw7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgncm0tYnV5X19idXR0b24tLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpO1xuICAgICAgICAgICAgY2FydEZlZWRiYWNrVGltZXJzLmRlbGV0ZShidXR0b24pO1xuICAgICAgICB9LCAyMjAwKTtcbiAgICAgICAgY2FydEZlZWRiYWNrVGltZXJzLnNldChidXR0b24sIHRpbWVyKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0UGVuZGluZ0NhcnRCdXR0b25zID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdW2FyaWEtYnVzeT1cInRydWVcIl0sIFtkYXRhLXJhZGljYWxtYXJ0LWNhcnQ9XCJhZGRcIl1bYXJpYS1idXN5PVwidHJ1ZVwiXScpXG4gICAgICAgIC5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGlmIChidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbCkgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvbi5kYXRhc2V0LnJtQ2FydE9yaWdpbmFsO1xuICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1idXN5Jyk7XG4gICAgICAgIH0pO1xufTtcblxuY29uc3QgaW5pdCA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJykpIG5ldyBQcm9kdWN0U2NvcGUocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpLmZvckVhY2goKHNjb3BlKSA9PiBuZXcgUHJvZHVjdFNjb3BlKHNjb3BlKS5pbml0KCkpO1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tcHJvZHVjdC1jYXJkLWRyb3Bkb3duXScpKSBuZXcgUHJvZHVjdENhcmREcm9wZG93bihyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXByb2R1Y3QtY2FyZC1kcm9wZG93bl0nKS5mb3JFYWNoKChkcm9wZG93bikgPT4gbmV3IFByb2R1Y3RDYXJkRHJvcGRvd24oZHJvcGRvd24pLmluaXQoKSk7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LWNhcmQtcG9zaXRpb25dJykpIG5ldyBQcm9kdWN0Q2FyZFBvc2l0aW9uKHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tcHJvZHVjdC1jYXJkLXBvc2l0aW9uXScpLmZvckVhY2goKHBvc2l0aW9uKSA9PiBuZXcgUHJvZHVjdENhcmRQb3NpdGlvbihwb3NpdGlvbikuaW5pdCgpKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV0nKSkgbmV3IFByb2R1Y3RIb3ZlckdhbGxlcnkocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnldJykuZm9yRWFjaCgoZ2FsbGVyeSkgPT4gbmV3IFByb2R1Y3RIb3ZlckdhbGxlcnkoZ2FsbGVyeSkuaW5pdCgpKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXZhcmlhbnRzXScpKSBuZXcgVmFyaWFudFBpY2tlcihyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXZhcmlhbnRzXScpLmZvckVhY2goKGNvbnRhaW5lcikgPT4gbmV3IFZhcmlhbnRQaWNrZXIoY29udGFpbmVyKS5pbml0KCkpO1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tYnVsay1hY3Rpb25zXScpKSBuZXcgUHJvZHVjdEJ1bGtBY3Rpb25zKHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tYnVsay1hY3Rpb25zXScpLmZvckVhY2goKGNvbnRhaW5lcikgPT4gbmV3IFByb2R1Y3RCdWxrQWN0aW9ucyhjb250YWluZXIpLmluaXQoKSk7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LWFjdGlvbl0nKSkgbmV3IFByb2R1Y3RPcHRpb25hbEFjdGlvbihyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXByb2R1Y3QtYWN0aW9uXScpLmZvckVhY2goKGJ1dHRvbikgPT4gbmV3IFByb2R1Y3RPcHRpb25hbEFjdGlvbihidXR0b24pLmluaXQoKSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tcXVpY2stdmlld10nKTtcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcXVpY2tWaWV3Lm9wZW4odHJpZ2dlcik7XG4gICAgfVxufSwgdHJ1ZSk7XG5cbi8vIFJhZGljYWxNYXJ0IGJpbmRzIHRoZSBwcm9kdWN0IGlkIGludG8gaXRzIG9yaWdpbmFsIGNsaWNrIGNsb3N1cmUuIEludGVyY2VwdFxuLy8gb25seSBjYXJ0cyBleHBsaWNpdGx5IHVwZGF0ZWQgYnkgUk0gVmFyaWFudHMsIHNvIHRoZSBjdXJyZW50IGlkIGlzIHJlc3BlY3RlZC5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYWRkID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tyYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdJyk7XG4gICAgY29uc3QgY2FydCA9IGFkZD8uY2xvc2VzdCgnW3JhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXScpO1xuICAgIGlmICghYWRkIHx8ICFjYXJ0Py5kYXRhc2V0LnJtRHluYW1pY1Byb2R1Y3QgfHwgIXdpbmRvdy5SYWRpY2FsTWFydENhcnQpIHJldHVybjtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIHNob3dDYXJ0UGVuZGluZyhjYXJ0LCBhZGQpO1xuICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicXVhbnRpdHlcIl0nKTtcbiAgICB3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KCkuYWRkUHJvZHVjdChOdW1iZXIoY2FydC5kYXRhc2V0LmlkKSwgTnVtYmVyKHF1YW50aXR5Py52YWx1ZSkgfHwgMSk7XG59LCB0cnVlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb25SYWRpY2FsTWFydENhcnRBZnRlckFkZFByb2R1Y3QnLCBzaG93Q2FydEZlZWRiYWNrKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29uUmFkaWNhbE1hcnRDYXJ0RXJyb3InLCByZXNldFBlbmRpbmdDYXJ0QnV0dG9ucyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBpbml0KCkpO1xubmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4gbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIGluaXQobm9kZSk7XG59KSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4iXSwibmFtZXMiOlsidGV4dCIsInZhbHVlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImNsb25lIiwidW5kZWZpbmVkIiwic3RydWN0dXJlZENsb25lIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicHJvZHVjdERpc2NvdW50VGV4dCIsInByaWNlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwibW9kZSIsIlN0cmluZyIsImRpc2NvdW50IiwiYmFzZSIsIk51bWJlciIsImJhc2VWYWx1ZSIsImZpbmFsIiwiZmluYWxWYWx1ZSIsInBlcmNlbnQiLCJNYXRoIiwibWF4Iiwicm91bmQiLCJhbW91bnQiLCJyZXBsYWNlIiwicGVyY2VudFRleHQiLCJhbW91bnRUZXh0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImpvaW4iLCJsb2FkZWRBc3NldHMiLCJNYXAiLCJhc3NldEtleSIsImFzc2V0IiwidHlwZSIsIm5hbWUiLCJ1cmkiLCJjb250ZW50IiwibG9hZEFzc2V0Iiwia2V5IiwiaGFzIiwiZ2V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0YXJnZXRVcmwiLCJVUkwiLCJiYXNlVVJJIiwiaHJlZiIsImV4aXN0aW5nIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImZpbmQiLCJub2RlIiwic3JjIiwicmVhZHkiLCJzZXQiLCJyZWplY3QiLCJjcmVhdGVFbGVtZW50IiwiYXR0cmlidXRlcyIsInJlbCIsInRleHRDb250ZW50IiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJfcmVmIiwic2V0QXR0cmlidXRlIiwibm9uY2UiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJFcnJvciIsImhlYWQiLCJhcHBlbmQiLCJjYXRjaCIsImVycm9yIiwiZGVsZXRlIiwicmVtb3ZlIiwibG9hZEFzc2V0cyIsImFzc2V0cyIsImVuc3VyZVJhZGljYWxNYXJ0RGlzcGxheSIsIndpbmRvdyIsIlJhZGljYWxNYXJ0RGlzcGxheSIsImNhcnQiLCJhZGRCdXR0b25zTG9jayIsImRpc3BsYXlNb2R1bGVCdXR0b25zTG9jayIsImRpc2NvdW50SGlkZSIsInByb2R1Y3RzRGlzY291bnRIaWRlIiwiYmFkZ2VIaWRlIiwibW9kdWxlSGlkZSIsIm1vZHVsZVNob3ciLCJwYWdlRXJyb3JzIiwicGFnZVJlbG9hZCIsIm5vdGlmaWNhdGlvbl9hZGRTaG93IiwiZXJyb3JzU2hvdyIsImNoZWNrb3V0Iiwic3VibWl0QnV0dG9uc0xvY2siLCJjaGVja0Vycm9yc1Nob3ciLCJjaGVja0Vycm9yc1Byb2R1Y3RzU2hvdyIsImdsb2JhbExvYWRpbmdTaG93Iiwic2hpcHBpbmdMb2FkaW5nU2hvdyIsInBheW1lbnRMb2FkaW5nU2hvdyIsImxvZ2luU2hvdyIsImNyZWF0ZU9yZGVyUHJvZ3Jlc3MiLCJsb2dpbiIsImJ1dHRvbnNMb2NrIiwiZnJvbVNob3ciLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJ0cmFuc2xhdGUiLCJmYWxsYmFjayIsInRyYW5zbGF0ZWQiLCJKb29tbGEiLCJUZXh0IiwiXyIsImxhYmVscyIsImxvYWRpbmciLCJlbXB0eVByb2R1Y3QiLCJlbXB0eVF1aWNrVmlldyIsImluU3RvY2siLCJvdXRPZlN0b2NrIiwicXVhbnRpdHkiLCJhZGRUb0NhcnQiLCJjYXJ0QWRkZWQiLCJkZXRhaWxzIiwicXVpY2tWaWV3Iiwibm9JbWFnZSIsImVsZW1lbnQiLCJ0YWciLCJjbGFzc05hbWUiLCJfcmVmMiIsInJlcXVlc3RQcm9kdWN0IiwiZW5kcG9pbnQiLCJ0YXNrIiwicHJvZHVjdElkIiwic2lnbmFsIiwidXJsIiwibG9jYXRpb24iLCJzZWFyY2hQYXJhbXMiLCJyZXNwb25zZSIsImZldGNoIiwidG9TdHJpbmciLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJwYXlsb2FkIiwianNvbiIsIm9rIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJkYXRhIiwiaXNBcnJheSIsImlkIiwicmVxdWVzdFF1aWNrVmlld0xheW91dCIsInRlbXBsYXRlSWQiLCJodG1sIiwicmVzb2x2ZVByb2R1Y3RTY29wZSIsInNvdXJjZSIsInBhcmVudEVsZW1lbnQiLCJjbG9zZXN0IiwiYXBwZW5kU3BlY2lmaWNhdGlvblZhbHVlIiwiZmllbGQiLCJpbm5lckhUTUwiLCJjaGlsZE5vZGVzIiwidXBkYXRlT3B0aW9uYWxFbGVtZW50IiwiYXZhaWxhYmxlIiwiaGlkZGVuIiwiZmluZFByb2R1Y3RGaWVsZCIsInByb2R1Y3QiLCJhbGlhcyIsImZpZWxkc2V0IiwiZmllbGRzZXRzIiwiZmllbGRzIiwiaXRlbSIsInJlbmRlclByb2R1Y3RDdXN0b21GaWVsZCIsImNvbnRhaW5lciIsImRhdGFzZXQiLCJmaWVsZEFsaWFzIiwiZW1wdHlUZXh0IiwibGFiZWwiLCJ0aXRsZSIsImxhYmVsU2VwYXJhdG9yIiwic2hvd0xhYmVsIiwidmFsdWVNb2RlIiwicmVuZGVyUHJvZHVjdEJhZGdlcyIsImJhZGdlcyIsImxpbWl0IiwiaXRlbXMiLCJzbGljZSIsImxpc3QiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJiYWRnZSIsImxpbmtCYWRnZXMiLCJsaW5rIiwiaWNvbiIsInNob3dJY29ucyIsImFsdCIsInNob3dUaXRsZXMiLCJzdHlsZSIsImxhYmVsU3R5bGUiLCJyZXBsYWNlQ2hpbGRyZW4iLCJyZW5kZXJQcm9kdWN0UmF0aW5nIiwicmF0aW5nIiwibWluIiwic3RhcnMiLCJ2YWx1ZU5vZGUiLCJjb3VudE5vZGUiLCJzZXRQcm9wZXJ0eSIsInRvTG9jYWxlU3RyaW5nIiwibWF4aW11bUZyYWN0aW9uRGlnaXRzIiwiY291bnQiLCJzaG93Q291bnQiLCJzaG93RW1wdHkiLCJyZW5kZXJQcm9kdWN0Qm9udXMiLCJib251cyIsInJlbmRlclByb2R1Y3RTdG9jayIsImFsbCIsImFtb3VudE5vZGUiLCJwcm9ncmVzcyIsImxhYmVsSW4iLCJsYWJlbE91dCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInN0b2NrQWNjb3VudGluZyIsInVuaXRTaG9ydCIsInVuaXRzIiwidHJpbSIsInNob3dRdWFudGl0eSIsInRocmVzaG9sZCIsInByb2dyZXNzVGhyZXNob2xkIiwic2hvd1Byb2dyZXNzIiwicmVuZGVyUHJvZHVjdFVuaXQiLCJ1bml0IiwidW5pdFN0eWxlIiwidW5pdE5vZGUiLCJwcmljZU5vZGUiLCJyZW5kZXJQcm9kdWN0U3BlY2lmaWNhdGlvbnMiLCJzb3VyY2VGaWVsZHNldHMiLCJzaG93VmFyaWFudHMiLCJzaG93VmFyaWFudEZpZWxkcyIsInNlbGVjdGVkRmllbGRzIiwiU2V0Iiwic3BsaXQiLCJtYXAiLCJmaWVsZExpbWl0IiwicGFyc2VJbnQiLCJzaG93RmllbGRzZXRUaXRsZXMiLCJkaXZpZGVyIiwic3RyaXBlZCIsImxheW91dCIsImluY2x1ZGVzIiwicmVzcG9uc2l2ZUNvbHVtbiIsImxlZ2FjeUNvbHVtbnMiLCJjb2x1bW5zIiwiY29sdW1uc1NtYWxsIiwiY29sdW1uc01lZGl1bSIsImNvbHVtbnNMYXJnZSIsInRhYmxlUmVzcG9uc2l2ZSIsImZpZWxkc1JlbWFpbmluZyIsIlBPU0lUSVZFX0lORklOSVRZIiwidmFyaWFudCIsInNpemUiLCJwdXNoIiwic2VjdGlvbiIsInRpdGxlTm9kZSIsInRhYmxlIiwiYm9keSIsInJvdyIsInNjb3BlIiwid3JhcHBlciIsImdyaWQiLCJVSWtpdCIsInVwZGF0ZSIsInJlbmRlclByb2R1Y3RIb3ZlckdhbGxlcnkiLCJtYXhJbWFnZXMiLCJtZWRpYSIsInZpZXdwb3J0IiwiaW5kZXgiLCJpbWFnZSIsImRlY29kaW5nIiwiaW5kaWNhdG9yU3R5bGUiLCJpbmRpY2F0b3JzIiwic2V0TWV0YUNvbnRlbnQiLCJhdHRyaWJ1dGUiLCJ1cGRhdGVQcm9kdWN0TWV0YWRhdGEiLCJkZXNjcmlwdGlvbiIsImludHJvdGV4dCIsImNhbm9uaWNhbCIsIlByb2R1Y3RTY29wZSIsImNvbnN0cnVjdG9yIiwicmVhZERhdGEiLCJjaGlsZHJlbiIsImNvbnRhaW5zIiwibm9kZXMiLCJzZWxlY3RvciIsIm93bmVyIiwiaW5pdCIsInJtUHJvZHVjdFNjb3BlUmVhZHkiLCJldmVudCIsInRhcmdldCIsImFwcGx5UHJvZHVjdCIsInJtUHJvZHVjdElkIiwiY29kZSIsImludHJvdGV4dEh0bWwiLCJmdWxsdGV4dEh0bWwiLCJmdWxsdGV4dCIsInJlbW92ZUF0dHJpYnV0ZSIsInNhdmluZ3MiLCJzYXZpbmdzVmFsdWUiLCJlbmFibGVkIiwiZGlzY291bnRFbmFibGVkIiwidW5pdFdyYXAiLCJzaG93QmFzZSIsImRpc2NvdW50VGV4dCIsImRpc2NvdW50TW9kZSIsInNob3dEaXNjb3VudCIsImJlbmVmaXQiLCJzaG93U2F2aW5ncyIsImJlbmVmaXRWYWx1ZSIsInNob3dVbml0IiwiY2F0ZWdvcnkiLCJtYXRjaGVzIiwibWFudWZhY3R1cmVyIiwibWFudWZhY3R1cmVycyIsImlucHV0IiwicHJvZHVjdFRpdGxlIiwiZGlzYWJsZWQiLCJkaXNhYmxlT3V0T2ZTdG9jayIsImJhc2VMYWJlbCIsInNob3dUaXRsZSIsImNoZWNrZWQiLCJFdmVudCIsImJ1YmJsZXMiLCJybVF1aWNrVmlldyIsInJtRHluYW1pY1Byb2R1Y3QiLCJzdGVwIiwiYnV0dG9uIiwicm1Qcm9kdWN0UGFnZSIsInVwZGF0ZURvY3VtZW50VGl0bGUiLCJ1cGRhdGVEb2N1bWVudE1ldGFkYXRhIiwiUHJvZHVjdEJ1bGtBY3Rpb25zIiwicm9vdFNlbGVjdG9yIiwic2VsZWN0aW9uUm9vdCIsInJlc29sdmVkUm9vdCIsInBlbmRpbmciLCJoYW5kbGVTZWxlY3Rpb24iLCJiaW5kIiwicm9vdCIsInNlbGVjdGVkIiwicm1CdWxrQWN0aW9uc1JlYWR5IiwiYWN0aW9uIiwicm1CdWxrQWN0aW9uIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0dXMiLCJSYWRpY2FsTWFydENhcnQiLCJhZGRQcm9kdWN0IiwiaW5wdXRzQnlQcm9kdWN0IiwicHJvZHVjdElkcyIsImtleXMiLCJ3YWl0aW5nIiwiZmFpbHVyZXMiLCJ0aW1lb3V0IiwiZmluaXNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZVJlc3VsdCIsImNsZWFyVGltZW91dCIsImZhaWxlZFByb2R1Y3RJZHMiLCJlbnRyeSIsInByb2R1Y3RfaWQiLCJhZGQiLCJzZXRUaW1lb3V0IiwiY2xlYXIiLCJfcmVmMyIsIlByb2R1Y3RIb3ZlckdhbGxlcnkiLCJhY3RpdmVJbmRleCIsInRvdWNoIiwic3VwcHJlc3NDbGljayIsInNob3ciLCJpbWFnZXMiLCJuZXh0IiwiaW1hZ2VJbmRleCIsImFjdGl2ZSIsImluZGljYXRvciIsImluZGljYXRvckluZGV4Iiwicm1Qcm9kdWN0SG92ZXJHYWxsZXJ5UmVhZHkiLCJwb2ludGVyU3VyZmFjZSIsInBvaW50ZXJUeXBlIiwiYm91bmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJpbnNpZGUiLCJjbGllbnRYIiwibGVmdCIsInJpZ2h0IiwiY2xpZW50WSIsInRvcCIsImJvdHRvbSIsInJlc2V0T25MZWF2ZSIsImZsb29yIiwicG9pbnRlcklkIiwieCIsInkiLCJ0aW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJkZWx0YVgiLCJkZWx0YVkiLCJlbGFwc2VkIiwiYWJzIiwic3RvcFByb3BhZ2F0aW9uIiwiUHJvZHVjdE9wdGlvbmFsQWN0aW9uIiwicm1Qcm9kdWN0QWN0aW9uIiwicmV0cnlDb3VudCIsInJldHJ5VGltZXIiLCJyZWZyZXNoIiwicHJvdmlkZXIiLCJSYWRpY2FsTWFydEZhdm9yaXRlcyIsIlJhZGljYWxNYXJ0Q29tcGFyZSIsInN1cHBvcnRlZCIsInRvZ2dsZVByb2R1Y3QiLCJpc0J1aWxkZXJQcmV2aWV3IiwiZnJhbWVOYW1lIiwiZnJhbWVFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwicGFyZW50IiwidGVzdCIsInNldEF2YWlsYWJpbGl0eSIsInByZXZpZXdGYWxsYmFjayIsIm1ldGhvZCIsInRoZW4iLCJwcm9kdWN0cyIsInNvbWUiLCJzZXRBY3RpdmUiLCJyZXRyeVByb3ZpZGVyIiwicm1Qcm9kdWN0QWN0aW9uUmVhZHkiLCJhcGkiLCJwcmV2aW91cyIsInJlc3VsdCIsIlByb2R1Y3RDYXJkRHJvcGRvd24iLCJybVByb2R1Y3RDYXJkRHJvcGRvd25SZWFkeSIsImRpc3BsYXlNb2RlIiwicm1Ib3ZlckJyZWFrcG9pbnQiLCJob3ZlckJyZWFrcG9pbnQiLCJ2aXNpYmxlRm9jdXNhYmxlIiwiaGFzQXR0cmlidXRlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImRpc3BsYXkiLCJ2aXNpYmlsaXR5IiwiZ2V0Q2xpZW50UmVjdHMiLCJ0YWJJbmRleCIsIlByb2R1Y3RDYXJkUG9zaXRpb24iLCJybVByb2R1Y3RDYXJkUG9zaXRpb25SZWFkeSIsInZpc2liaWxpdHlNb2RlIiwicG9zaXRpb24iLCJWYXJpYW50UGlja2VyIiwib25Qcm9kdWN0IiwiaGFuZGxlUG9wU3RhdGUiLCJ2aXNpYmxlRmllbGRzIiwiY3VycmVudCIsImN1cnJlbnRQcm9kdWN0IiwidmlzaWJsZVNlbGVjdGlvbiIsImZyb21FbnRyaWVzIiwiX3JlZjQiLCJybVZhcmlhbnRzUmVhZHkiLCJvcHRpb24iLCJzZWxlY3QiLCJybUZpZWxkIiwicm1WYWx1ZSIsInJlbmRlclN0YXRlIiwiaW5pdEhpc3RvcnkiLCJ1cGRhdGVVcmwiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwiY3VycmVudElkIiwic3RhdGUiLCJjdXJyZW50VXJsIiwicGF0aG5hbWUiLCJzZWFyY2giLCJsb2FkUHJvZHVjdCIsIndhbnRlZCIsImFzc2lnbiIsInNlbGVjdGlvbiIsImV2ZXJ5IiwiX3JlZjUiLCJkaXNhYmxlVW5hdmFpbGFibGUiLCJDU1MiLCJlc2NhcGUiLCJpc0F2YWlsYWJsZSIsIm9wdGlvbnMiLCJzZWxlY3RlZExhYmVsIiwib3RoZXJGaWVsZHMiLCJfcmVmNiIsIl9yZWY3IiwidXBkYXRlSGlzdG9yeSIsInByb2R1Y3RTY29wZSIsImFib3J0IiwiQWJvcnRDb250cm9sbGVyIiwiY29udHJvbGxlciIsImZ1bGwiLCJ1cmxNb2RlIiwiaGlzdG9yeU1ldGhvZCIsIlF1aWNrVmlldyIsImNhY2hlIiwibW9kYWwiLCJzZXR0aW5ncyIsImJ1aWxkZXJDb250ZXh0IiwibW9kYWxDbGFzc2VzIiwib3BlbiIsInRyaWdnZXIiLCJlbnN1cmVNb2RhbCIsImRpYWxvZyIsInJtUXVpY2tWaWV3TGFiZWwiLCJzZXRMb2FkaW5nIiwiY29udGVudE1vZGUiLCJyZW5kZXJCdWlsZGVyQ29udGVudCIsInJlbmRlciIsInJlbmRlckVycm9yIiwibG9hZEJ1aWxkZXJQcm9kdWN0IiwiYXBwZW5kQ2hpbGQiLCJtb2RhbENsYXNzIiwibW9kYWxTaXplIiwiY2VudGVyIiwibW9kYWxDZW50ZXIiLCJiZ0Nsb3NlIiwiZXNjQ2xvc2UiLCJjbG9zZSIsImNvbnRlbnRQYWRkaW5nIiwibW9iaWxlRnVsbHNjcmVlbiIsIm92ZXJmbG93QXV0byIsInBhZGRpbmciLCJzaG93Q2xvc2UiLCJjbG9zZUxhcmdlIiwiY29tcG9uZW50IiwiJHByb3BzIiwiYWxlcnQiLCJjb250ZXh0IiwibG9hZE9wdGlvbnMiLCJjcmVhdGVSYW5nZSIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImxvYWRBY3Rpb25zIiwibWVkaWFDb2x1bW4iLCJjb250ZW50Q29sdW1uIiwicmVuZGVyTWVkaWEiLCJyZW5kZXJDb250ZW50IiwibWFpbiIsInBsYWNlaG9sZGVyIiwicGxhY2Vob2xkZXJJY29uIiwicGxhY2Vob2xkZXJUZXh0IiwidGh1bWIiLCJ0aHVtYkluZGV4IiwibGlnaHRib3hQYW5lbCIsImNhcHRpb24iLCJ0aHVtYnMiLCJzaG93Q29kZSIsIm9sZFByaWNlIiwiZmluYWxQcmljZSIsInN0b2NrIiwic2hvd0Rlc2NyaXB0aW9uIiwidmFyaWFudHMiLCJyZW5kZXJWYXJpYW50cyIsInNob3dDYXJ0IiwicmVuZGVyQ2FydCIsIm1vcmUiLCJsZWdlbmQiLCJyb2xlIiwic3dhdGNoIiwiY29sb3IiLCJ1cGRhdGVQcm9kdWN0IiwicmVwbGFjZVdpdGgiLCJjYXJ0RmVlZGJhY2tUaW1lcnMiLCJXZWFrTWFwIiwicHJlcGFyZUNhcnRCdXR0b24iLCJybUNhcnRPcmlnaW5hbCIsInNob3dDYXJ0UGVuZGluZyIsInJtQ2FydExvYWRpbmciLCJzaG93Q2FydEZlZWRiYWNrIiwicm1DYXJ0U3VjY2VzcyIsInRpbWVyIiwicmVzZXRQZW5kaW5nQ2FydEJ1dHRvbnMiLCJkcm9wZG93biIsImdhbGxlcnkiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwibXV0YXRpb24iLCJhZGRlZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwib2JzZXJ2ZSIsImRvY3VtZW50RWxlbWVudCIsImNoaWxkTGlzdCIsInN1YnRyZWUiXSwic291cmNlUm9vdCI6IiJ9