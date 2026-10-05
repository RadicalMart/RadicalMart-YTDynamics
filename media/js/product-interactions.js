/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/runtime.es6"
/*!*************************!*\
  !*** ./src/runtime.es6 ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeDynamicContent: () => (/* binding */ observeDynamicContent)
/* harmony export */ });
const RUNTIME_KEY = '__YTDynamicsDomRuntime';
const runtime = window[RUNTIME_KEY] || {
  added: new Set(),
  removed: new Set(),
  observer: null
};
window[RUNTIME_KEY] = runtime;
const visit = (callbacks, node) => callbacks.forEach(callback => callback(node));
const start = () => {
  if (runtime.observer || !document.documentElement) return;
  runtime.observer = new MutationObserver(records => {
    records.forEach(_ref => {
      let {
        addedNodes,
        removedNodes
      } = _ref;
      addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) visit(runtime.added, node);
      });
      removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) visit(runtime.removed, node);
      });
    });
  });
  runtime.observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};
const observeDynamicContent = function (onAdded) {
  let onRemoved = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (typeof onAdded === 'function') runtime.added.add(onAdded);
  if (typeof onRemoved === 'function') runtime.removed.add(onRemoved);
  start();
  return () => {
    if (typeof onAdded === 'function') runtime.added.delete(onAdded);
    if (typeof onRemoved === 'function') runtime.removed.delete(onRemoved);
  };
};

/***/ },

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
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


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
const oneClickProductValue = function (source) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (source === 'product_id') return String(product.id || '');
  if (source === 'product_title') return String(product.title || '');
  if (source === 'product_code') return String(product.code || '');
  if (source === 'product_url') return String(product.link || '');
  if (source === 'product_price') return String(product.price?.final || '');
  if (source === 'product_quantity') return String(product.quantity?.min ?? 1);
  return '';
};
const renderOneClickOrder = function (container) {
  let product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  container.dataset.rmOneclickProductId = String(product.id || '');
  container.dataset.rmOneclickProductName = String(product.title || '');
  container.querySelectorAll('[data-rm-oneclick-source]').forEach(field => {
    const source = field.dataset.rmOneclickSource || '';
    const nextValue = oneClickProductValue(source, product);
    if ('value' in field) field.value = nextValue;
    if (source !== 'product_quantity' || !field.matches('input[type="number"]')) return;
    const min = Number(product.quantity?.min) || 1;
    const step = Number(product.quantity?.step) || 1;
    const max = Number(product.quantity?.max) || 0;
    field.min = String(min);
    field.step = String(step);
    if (max > 0) field.max = String(max);else field.removeAttribute('max');
    field.value = String(min);
  });
  container.querySelectorAll('[data-rm-oneclick-subject-template]').forEach(field => {
    const replacements = {
      product_id: String(product.id || ''),
      product_name: String(product.title || ''),
      product_code: String(product.code || ''),
      product_url: String(product.link || ''),
      product_price: String(product.price?.final || '')
    };
    let value = field.dataset.rmOneclickSubjectTemplate || '';
    Object.entries(replacements).forEach(_ref3 => {
      let [key, replacement] = _ref3;
      value = value.split(`{${key}}`).join(replacement);
    });
    field.value = value;
  });
  const title = container.querySelector('[data-rm-oneclick-summary-title]');
  if (title) title.textContent = product.title || '';
  const image = container.querySelector('[data-rm-oneclick-summary-image]');
  const media = container.querySelector('[data-rm-oneclick-summary-media]');
  const imageSource = product.media?.[0]?.src || '';
  if (image) {
    if (imageSource) image.src = imageSource;else image.removeAttribute('src');
    image.alt = product.title || '';
  }
  if (media) media.hidden = !imageSource;
  const price = container.querySelector('[data-rm-oneclick-summary-price]');
  if (price) price.textContent = product.price?.final || '';
  const unit = container.querySelector('[data-rm-oneclick-summary-unit]');
  const unitText = product.quantity?.unitShort || product.quantity?.units || '';
  if (unit) {
    unit.textContent = unitText ? `/${unitText}` : '';
    unit.hidden = !unitText;
  }
  const bonus = container.querySelector('[data-rm-oneclick-summary-bonus]');
  const bonusWrap = container.querySelector('[data-rm-oneclick-summary-bonus-wrap]');
  const bonusText = String(product.bonus?.text || '');
  if (bonus) bonus.textContent = bonusText;
  if (bonusWrap) bonusWrap.hidden = !bonusText;
  const stock = container.querySelector('[data-rm-oneclick-summary-stock]');
  if (stock) {
    const inStock = Boolean(product.inStock);
    const stockLabel = stock.querySelector('[data-rm-oneclick-summary-stock-label]');
    const stockInIcon = stock.querySelector('[data-rm-oneclick-summary-stock-in]');
    const stockOutIcon = stock.querySelector('[data-rm-oneclick-summary-stock-out]');
    stock.classList.toggle('uk-text-success', inStock);
    stock.classList.toggle('uk-text-muted', !inStock);
    if (stockLabel) stockLabel.textContent = inStock ? stock.dataset.labelIn : stock.dataset.labelOut;
    if (stockInIcon) stockInIcon.hidden = !inStock;
    if (stockOutIcon) stockOutIcon.hidden = inStock;
  }
  const disabled = container.dataset.disableOutOfStock === 'true' && !product.inStock;
  container.querySelectorAll('.rf-button-send, [data-rm-oneclick-trigger]').forEach(button => {
    button.disabled = disabled;
    if (disabled) button.setAttribute('aria-disabled', 'true');else button.removeAttribute('aria-disabled');
  });
};
const oneClickFieldValues = (form, name) => Array.from(form.elements).filter(control => control.name === name && !control.disabled).flatMap(control => {
  if ((control.type === 'checkbox' || control.type === 'radio') && !control.checked) return [];
  if (control instanceof HTMLSelectElement && control.multiple) {
    return Array.from(control.selectedOptions).map(option => option.value);
  }
  return [String(control.value || '')];
});
const syncOneClickConditionalFields = order => {
  const form = order.querySelector('form');
  if (!form) return;
  order.querySelectorAll('[data-rm-oneclick-condition-field]').forEach(field => {
    const sourceName = field.dataset.rmOneclickConditionField || '';
    const expectedValue = field.dataset.rmOneclickConditionValue || '';
    const visible = oneClickFieldValues(form, sourceName).includes(expectedValue);
    field.hidden = !visible;
    field.setAttribute('aria-hidden', visible ? 'false' : 'true');
    field.querySelectorAll('input, select, textarea').forEach(control => {
      control.disabled = !visible;
      const required = control.dataset.rmOneclickRequired === 'true';
      control.required = visible && required;
      control.classList.toggle('required', visible && required);
      if (!visible) {
        control.removeAttribute('aria-invalid');
        control.classList.remove('is-invalid', 'uk-form-danger');
      }
    });
  });
};
const initOneClickConditionalFields = order => {
  if (order.dataset.rmOneclickConditionsReady === 'true') return;
  order.dataset.rmOneclickConditionsReady = 'true';
  const form = order.querySelector('form');
  if (!form) return;
  const sync = () => syncOneClickConditionalFields(order);
  form.addEventListener('change', sync);
  form.addEventListener('input', sync);
  sync();
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
    this.nodes('[data-rm-oneclick-order]').forEach(node => {
      renderOneClickOrder(node, product);
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
    Array.from(inputsByProduct.entries()).forEach((_ref4, index) => {
      let [productId, input] = _ref4;
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
    return Object.fromEntries(Object.entries(fields).filter(_ref5 => {
      let [alias] = _ref5;
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
    return Object.entries(selection).every(_ref6 => {
      let [alias, value] = _ref6;
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
    const otherFields = Object.entries(this.selected).filter(_ref7 => {
      let [key] = _ref7;
      return key !== alias;
    });
    return this.data.products.some(product => String(product.fields[alias]) === String(value) && otherFields.every(_ref8 => {
      let [key, selected] = _ref8;
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
    if (body.querySelector('[data-rm-oneclick-order]') && typeof window.RadicalForm?.RadicalFormClass?.init === 'function') {
      window.RadicalForm.RadicalFormClass.init(body);
    }
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
  if (root.matches?.('[data-rm-oneclick-order]')) initOneClickConditionalFields(root);
  root.querySelectorAll?.('[data-rm-oneclick-order]').forEach(order => initOneClickConditionalFields(order));
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
(0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(init);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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czYiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL3Byb2R1Y3QtaW50ZXJhY3Rpb25zLnNjc3MiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9wcm9kdWN0LWludGVyYWN0aW9ucy5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUlVOVElNRV9LRVkgPSAnX19ZVER5bmFtaWNzRG9tUnVudGltZSc7XG5cbmNvbnN0IHJ1bnRpbWUgPSB3aW5kb3dbUlVOVElNRV9LRVldIHx8IHtcbiAgICBhZGRlZDogbmV3IFNldCgpLFxuICAgIHJlbW92ZWQ6IG5ldyBTZXQoKSxcbiAgICBvYnNlcnZlcjogbnVsbCxcbn07XG5cbndpbmRvd1tSVU5USU1FX0tFWV0gPSBydW50aW1lO1xuXG5jb25zdCB2aXNpdCA9IChjYWxsYmFja3MsIG5vZGUpID0+IGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobm9kZSkpO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpZiAocnVudGltZS5vYnNlcnZlciB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XG5cbiAgICBydW50aW1lLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLmFkZGVkLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHZpc2l0KHJ1bnRpbWUucmVtb3ZlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcnVudGltZS5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9ic2VydmVEeW5hbWljQ29udGVudCA9IChvbkFkZGVkLCBvblJlbW92ZWQgPSBudWxsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmFkZChvbkFkZGVkKTtcbiAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmFkZChvblJlbW92ZWQpO1xuICAgIHN0YXJ0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUuYWRkZWQuZGVsZXRlKG9uQWRkZWQpO1xuICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmRlbGV0ZShvblJlbW92ZWQpO1xuICAgIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3Byb2R1Y3QtaW50ZXJhY3Rpb25zLnNjc3MnO1xuaW1wb3J0IHtvYnNlcnZlRHluYW1pY0NvbnRlbnR9IGZyb20gJy4vcnVudGltZS5lczYnO1xuXG5jb25zdCB0ZXh0ID0gKHZhbHVlKSA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSB8fCAnJyk7XG5jb25zdCBjbG9uZSA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdmFsdWU7XG4gICAgcmV0dXJuIHR5cGVvZiBzdHJ1Y3R1cmVkQ2xvbmUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBzdHJ1Y3R1cmVkQ2xvbmUodmFsdWUpXG4gICAgICAgIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xufTtcblxuY29uc3QgcHJvZHVjdERpc2NvdW50VGV4dCA9IChwcmljZSA9IHt9LCBtb2RlID0gJ2Ftb3VudCcpID0+IHtcbiAgICBpZiAobW9kZSA9PT0gJ2xlZ2FjeScpIHJldHVybiBTdHJpbmcocHJpY2UuZGlzY291bnQgfHwgJycpO1xuXG4gICAgY29uc3QgYmFzZSA9IE51bWJlcihwcmljZS5iYXNlVmFsdWUpIHx8IDA7XG4gICAgY29uc3QgZmluYWwgPSBOdW1iZXIocHJpY2UuZmluYWxWYWx1ZSkgfHwgMDtcbiAgICBjb25zdCBwZXJjZW50ID0gYmFzZSA+IDAgJiYgZmluYWwgPCBiYXNlXG4gICAgICAgID8gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCgoKGJhc2UgLSBmaW5hbCkgLyBiYXNlKSAqIDEwMCkpXG4gICAgICAgIDogMDtcbiAgICBjb25zdCBhbW91bnQgPSBTdHJpbmcocHJpY2UuZGlzY291bnQgfHwgJycpLnJlcGxhY2UoL15bLeKIklxcc10rLywgJycpO1xuICAgIGNvbnN0IHBlcmNlbnRUZXh0ID0gcGVyY2VudCA+IDAgPyBgLSR7cGVyY2VudH0lYCA6ICcnO1xuICAgIGNvbnN0IGFtb3VudFRleHQgPSBhbW91bnQgPyBgLSR7YW1vdW50fWAgOiAnJztcblxuICAgIGlmIChtb2RlID09PSAncGVyY2VudCcpIHJldHVybiBwZXJjZW50VGV4dDtcbiAgICBpZiAobW9kZSA9PT0gJ2JvdGgnKSByZXR1cm4gW3BlcmNlbnRUZXh0LCBhbW91bnRUZXh0XS5maWx0ZXIoQm9vbGVhbikuam9pbignIMK3ICcpO1xuICAgIHJldHVybiBhbW91bnRUZXh0O1xufTtcblxuY29uc3QgbG9hZGVkQXNzZXRzID0gbmV3IE1hcCgpO1xuXG5jb25zdCBhc3NldEtleSA9IChhc3NldCwgdHlwZSkgPT4gYCR7dHlwZX06JHthc3NldC5uYW1lIHx8IGFzc2V0LnVyaSB8fCBhc3NldC5jb250ZW50IHx8ICcnfWA7XG5cbmNvbnN0IGxvYWRBc3NldCA9IChhc3NldCwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGFzc2V0S2V5KGFzc2V0LCB0eXBlKTtcbiAgICBpZiAoIWtleSB8fCBsb2FkZWRBc3NldHMuaGFzKGtleSkpIHJldHVybiBsb2FkZWRBc3NldHMuZ2V0KGtleSkgfHwgUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBhc3NldC51cmkgPyBuZXcgVVJMKGFzc2V0LnVyaSwgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZiA6ICcnO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gdGFyZ2V0VXJsXG4gICAgICAgID8gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHR5cGUgPT09ICdzdHlsZScgPyAnbGlua1tocmVmXScgOiAnc2NyaXB0W3NyY10nKSlcbiAgICAgICAgICAgIC5maW5kKChub2RlKSA9PiAodHlwZSA9PT0gJ3N0eWxlJyA/IG5vZGUuaHJlZiA6IG5vZGUuc3JjKSA9PT0gdGFyZ2V0VXJsKVxuICAgICAgICA6IG51bGw7XG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIGNvbnN0IHJlYWR5ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGxvYWRlZEFzc2V0cy5zZXQoa2V5LCByZWFkeSk7XG4gICAgICAgIHJldHVybiByZWFkeTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZSA9IG51bGw7XG4gICAgY29uc3QgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUgPT09ICdzdHlsZScgJiYgIWFzc2V0LnVyaSA/ICdzdHlsZSdcbiAgICAgICAgICAgIDogdHlwZSA9PT0gJ3N0eWxlJyA/ICdsaW5rJyA6ICdzY3JpcHQnKTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGFzc2V0LmF0dHJpYnV0ZXMgfHwge307XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHlsZScgJiYgYXNzZXQudXJpKSB7XG4gICAgICAgICAgICBub2RlLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIG5vZGUuaHJlZiA9IGFzc2V0LnVyaTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc2NyaXB0JyAmJiBhc3NldC51cmkpIHtcbiAgICAgICAgICAgIG5vZGUuc3JjID0gYXNzZXQudXJpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGFzc2V0LmNvbnRlbnQgfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGZhbHNlICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBub25jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtub25jZV0sc3R5bGVbbm9uY2VdJyk/Lm5vbmNlO1xuICAgICAgICBpZiAobm9uY2UpIG5vZGUubm9uY2UgPSBub25jZTtcblxuICAgICAgICBpZiAoYXNzZXQudXJpKSB7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlLCB7b25jZTogdHJ1ZX0pO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdChuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2FkIGFzc2V0OiAke2Fzc2V0LnVyaX1gKSksIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQobm9kZSk7XG4gICAgICAgIGlmICghYXNzZXQudXJpKSByZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvYWRlZEFzc2V0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgbm9kZT8ucmVtb3ZlKCk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuICAgIGxvYWRlZEFzc2V0cy5zZXQoa2V5LCByZWFkeSk7XG4gICAgcmV0dXJuIHJlYWR5O1xufTtcblxuY29uc3QgbG9hZEFzc2V0cyA9IGFzeW5jIChhc3NldHMgPSB7fSwgdHlwZSkgPT4ge1xuICAgIGZvciAoY29uc3QgYXNzZXQgb2YgYXNzZXRzW3R5cGVdIHx8IFtdKSB7XG4gICAgICAgIGF3YWl0IGxvYWRBc3NldChhc3NldCwgdHlwZSk7XG4gICAgfVxufTtcblxuY29uc3QgZW5zdXJlUmFkaWNhbE1hcnREaXNwbGF5ID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuUmFkaWNhbE1hcnREaXNwbGF5KSByZXR1cm47XG5cbiAgICAvLyBjb21fcmFkaWNhbG1hcnQuc2l0ZSBub3JtYWxseSBjcmVhdGVzIHRoaXMgb2JqZWN0IG9uIERPTUNvbnRlbnRMb2FkZWQuXG4gICAgLy8gQnVpbGRlciBhc3NldHMgY2FuIGJlIGxvYWRlZCBsYXRlciBieSBRdWljayBWaWV3LCBzbyBpbml0aWFsaXNlIHRoZSBzYW1lXG4gICAgLy8gcHVibGljIGRlZmF1bHRzIHdpdGhvdXQgZGlzcGF0Y2hpbmcgRE9NQ29udGVudExvYWRlZCBhIHNlY29uZCB0aW1lLlxuICAgIHdpbmRvdy5SYWRpY2FsTWFydERpc3BsYXkgPSB7XG4gICAgICAgIGNhcnQ6IHtcbiAgICAgICAgICAgIGFkZEJ1dHRvbnNMb2NrOiB0cnVlLFxuICAgICAgICAgICAgZGlzcGxheU1vZHVsZUJ1dHRvbnNMb2NrOiB0cnVlLFxuICAgICAgICAgICAgZGlzY291bnRIaWRlOiB0cnVlLFxuICAgICAgICAgICAgcHJvZHVjdHNEaXNjb3VudEhpZGU6IHRydWUsXG4gICAgICAgICAgICBiYWRnZUhpZGU6IHRydWUsXG4gICAgICAgICAgICBtb2R1bGVIaWRlOiB0cnVlLFxuICAgICAgICAgICAgbW9kdWxlU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2VFcnJvcnM6IHRydWUsXG4gICAgICAgICAgICBwYWdlUmVsb2FkOiB0cnVlLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uX2FkZFNob3c6IHRydWUsXG4gICAgICAgICAgICBlcnJvcnNTaG93OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrb3V0OiB7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b25zTG9jazogdHJ1ZSxcbiAgICAgICAgICAgIGRpc2NvdW50SGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoZWNrRXJyb3JzU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGNoZWNrRXJyb3JzUHJvZHVjdHNTaG93OiB0cnVlLFxuICAgICAgICAgICAgZ2xvYmFsTG9hZGluZ1Nob3c6IHRydWUsXG4gICAgICAgICAgICBzaGlwcGluZ0xvYWRpbmdTaG93OiB0cnVlLFxuICAgICAgICAgICAgcGF5bWVudExvYWRpbmdTaG93OiB0cnVlLFxuICAgICAgICAgICAgbG9naW5TaG93OiB0cnVlLFxuICAgICAgICAgICAgZXJyb3JzU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGNyZWF0ZU9yZGVyUHJvZ3Jlc3M6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbG9naW46IHtcbiAgICAgICAgICAgIGJ1dHRvbnNMb2NrOiB0cnVlLFxuICAgICAgICAgICAgZnJvbVNob3c6IHRydWUsXG4gICAgICAgICAgICBlcnJvcnNTaG93OiB0cnVlXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvblJhZGljYWxNYXJ0RGlzcGxheUFmdGVyU2V0Q29uZmlnJywge1xuICAgICAgICBkZXRhaWw6IHdpbmRvdy5SYWRpY2FsTWFydERpc3BsYXlcbiAgICB9KSk7XG59O1xuXG5jb25zdCB0cmFuc2xhdGUgPSAoa2V5LCBmYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB3aW5kb3cuSm9vbWxhPy5UZXh0Py5fPy4oa2V5KTtcbiAgICByZXR1cm4gdHJhbnNsYXRlZCAmJiB0cmFuc2xhdGVkICE9PSBrZXkgPyB0cmFuc2xhdGVkIDogZmFsbGJhY2s7XG59O1xuXG5jb25zdCBsYWJlbHMgPSB7XG4gICAgbG9hZGluZzogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19MT0FESU5HJywgJ0xvYWRpbmfigKYnKSxcbiAgICBlcnJvcjogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19FUlJPUl9MT0FEX1BST0RVQ1QnLCAnVW5hYmxlIHRvIGxvYWQgcHJvZHVjdC4nKSxcbiAgICBlbXB0eVByb2R1Y3Q6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfRVJST1JfRU1QVFlfUFJPRFVDVCcsICdQcm9kdWN0IGRhdGEgaXMgZW1wdHkuJyksXG4gICAgZW1wdHlRdWlja1ZpZXc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfRVJST1JfRU1QVFlfUVVJQ0tfVklFVycsICdRdWljayBWaWV3IGxheW91dCBpcyBlbXB0eS4nKSxcbiAgICBpblN0b2NrOiB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9JTl9TVE9DSycsICdJbiBzdG9jaycpLFxuICAgIG91dE9mU3RvY2s6IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX05PVF9JTl9TVE9DSycsICdOb3QgYXZhaWxhYmxlJyksXG4gICAgcXVhbnRpdHk6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVBTlRJVFknLCAnUXVhbnRpdHknKSxcbiAgICBhZGRUb0NhcnQ6IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX0NBUlRfQUREJywgJ0FkZCB0byBjYXJ0JyksXG4gICAgY2FydEFkZGVkOiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0NBUlRfQURERUQnLCAnUHJvZHVjdCBhZGRlZCB0byBjYXJ0JyksXG4gICAgZGV0YWlsczogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19ERVRBSUxTJywgJ0RldGFpbHMnKSxcbiAgICBxdWlja1ZpZXc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVJQ0tfVklFVycsICdRdWljayB2aWV3JyksXG4gICAgbm9JbWFnZTogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19OT19JTUFHRScsICdObyBpbWFnZScpXG59O1xuXG5jb25zdCBlbGVtZW50ID0gKHRhZywgY2xhc3NOYW1lID0gJycsIGF0dHJpYnV0ZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNsYXNzTmFtZSkgbm9kZS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2RlO1xufTtcblxuY29uc3QgcmVxdWVzdFByb2R1Y3QgPSBhc3luYyAoZW5kcG9pbnQsIHRhc2ssIHByb2R1Y3RJZCwgc2lnbmFsID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndGFzaycsIHRhc2spO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcm9kdWN0X2lkJywgcHJvZHVjdElkKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgaGVhZGVyczogeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J30sXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBzaWduYWxcbiAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcGF5bG9hZC5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5tZXNzYWdlIHx8IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gcGF5bG9hZC5kYXRhO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAxICYmIHR5cGVvZiBkYXRhWzBdID09PSAnb2JqZWN0JykgZGF0YSA9IGRhdGFbMF07XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmlkKSB0aHJvdyBuZXcgRXJyb3IobGFiZWxzLmVtcHR5UHJvZHVjdCk7XG4gICAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb25zdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0ID0gYXN5bmMgKGVuZHBvaW50LCBwcm9kdWN0SWQsIHRlbXBsYXRlSWQsIHNpZ25hbCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGVuZHBvaW50LCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3Rhc2snLCAncXVpY2tWaWV3TGF5b3V0Jyk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3Byb2R1Y3RfaWQnLCBwcm9kdWN0SWQpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0ZW1wbGF0ZV9pZCcsIHRlbXBsYXRlSWQpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSwge1xuICAgICAgICBoZWFkZXJzOiB7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnfSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIHNpZ25hbFxuICAgIH0pO1xuICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgaWYgKCFyZXNwb25zZS5vayB8fCBwYXlsb2FkLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgfHwgYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBwYXlsb2FkLmRhdGE7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGRhdGFbMF0gPT09ICdvYmplY3QnKSBkYXRhID0gZGF0YVswXTtcbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEuaHRtbCkgdGhyb3cgbmV3IEVycm9yKGxhYmVscy5lbXB0eVF1aWNrVmlldyk7XG4gICAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb25zdCByZXNvbHZlUHJvZHVjdFNjb3BlID0gKHNvdXJjZSkgPT4ge1xuICAgIGlmICghc291cmNlKSByZXR1cm4gZG9jdW1lbnQ7XG5cbiAgICAvLyBJbnNpZGUgUk0gR3JpZCwgdGhlIGdyaWQgaXRlbSBpcyB0aGUgdmlzdWFsIGNhcmQuIFVzZSBpdCBhcyB0aGUgaG92ZXIgYW5kXG4gICAgLy8gdXBkYXRlIHNjb3BlIHNvIFJNIFByb2R1Y3QgQ2FyZCBkb2VzIG5vdCBjcmVhdGUgYSBzZWNvbmQgY2FyZCBzdXJmYWNlIGFuZFxuICAgIC8vIHRoZSByZXZlYWwgcGFuZWwgY2FuIGFsaWduIHdpdGggdGhlIGNvbXBsZXRlIGdyaWQgaXRlbS5cbiAgICByZXR1cm4gc291cmNlLnBhcmVudEVsZW1lbnQ/LmNsb3Nlc3QoJy5ybS1ncmlkLWl0ZW0sIC5lbC1pdGVtJykgfHwgc291cmNlO1xufTtcblxuY29uc3QgYXBwZW5kU3BlY2lmaWNhdGlvblZhbHVlID0gKG5vZGUsIGZpZWxkKSA9PiB7XG4gICAgbm9kZS5pbm5lckhUTUwgPSBmaWVsZC52YWx1ZSB8fCAnJztcbiAgICBpZiAoIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGggJiYgZmllbGQudGV4dCkgbm9kZS5hcHBlbmQodGV4dChmaWVsZC50ZXh0KSk7XG59O1xuXG5jb25zdCB1cGRhdGVPcHRpb25hbEVsZW1lbnQgPSAobm9kZSwgYXZhaWxhYmxlKSA9PiB7XG4gICAgbm9kZS5oaWRkZW4gPSAhYXZhaWxhYmxlO1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGF2YWlsYWJsZSA/ICdmYWxzZScgOiAndHJ1ZScpO1xufTtcblxuY29uc3QgZmluZFByb2R1Y3RGaWVsZCA9IChwcm9kdWN0ID0ge30sIGFsaWFzID0gJycpID0+IHtcbiAgICBpZiAoIWFsaWFzKSByZXR1cm4gbnVsbDtcbiAgICBmb3IgKGNvbnN0IGZpZWxkc2V0IG9mIHByb2R1Y3QuZmllbGRzZXRzIHx8IFtdKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gKGZpZWxkc2V0LmZpZWxkcyB8fCBbXSkuZmluZCgoaXRlbSkgPT4gU3RyaW5nKGl0ZW0uYWxpYXMgfHwgJycpID09PSBhbGlhcyk7XG4gICAgICAgIGlmIChmaWVsZCkgcmV0dXJuIGZpZWxkO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHJlbmRlclByb2R1Y3RDdXN0b21GaWVsZCA9IChjb250YWluZXIsIHByb2R1Y3QgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGZpZWxkID0gZmluZFByb2R1Y3RGaWVsZChwcm9kdWN0LCBjb250YWluZXIuZGF0YXNldC5maWVsZEFsaWFzIHx8ICcnKTtcbiAgICBjb25zdCBmYWxsYmFjayA9IGNvbnRhaW5lci5kYXRhc2V0LmVtcHR5VGV4dCB8fCAnJztcbiAgICBjb25zdCBsYWJlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWN1c3RvbS1sYWJlbF0nKTtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWN1c3RvbS12YWx1ZV0nKTtcbiAgICBjb25zdCBhdmFpbGFibGUgPSBCb29sZWFuKGZpZWxkKSB8fCBmYWxsYmFjayAhPT0gJyc7XG5cbiAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHtmaWVsZD8udGl0bGUgfHwgY29udGFpbmVyLmRhdGFzZXQuZmllbGRBbGlhcyB8fCAnJ30ke2NvbnRhaW5lci5kYXRhc2V0LmxhYmVsU2VwYXJhdG9yIHx8ICcnfWA7XG4gICAgICAgIGxhYmVsLmhpZGRlbiA9IGNvbnRhaW5lci5kYXRhc2V0LnNob3dMYWJlbCAhPT0gJ3RydWUnO1xuICAgIH1cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKGZpZWxkICYmIGNvbnRhaW5lci5kYXRhc2V0LnZhbHVlTW9kZSA9PT0gJ2Zvcm1hdHRlZCcpIHtcbiAgICAgICAgICAgIHZhbHVlLmlubmVySFRNTCA9IGZpZWxkLnZhbHVlIHx8ICcnO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZS5jaGlsZE5vZGVzLmxlbmd0aCAmJiBmaWVsZC50ZXh0KSB2YWx1ZS5hcHBlbmQodGV4dChmaWVsZC50ZXh0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZS50ZXh0Q29udGVudCA9IGZpZWxkPy50ZXh0IHx8IGZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChjb250YWluZXIsIGF2YWlsYWJsZSk7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0QmFkZ2VzID0gKGNvbnRhaW5lciwgYmFkZ2VzID0gW10pID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KDAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC5saW1pdCkgfHwgMCk7XG4gICAgY29uc3QgaXRlbXMgPSBsaW1pdCA/IGJhZGdlcy5zbGljZSgwLCBsaW1pdCkgOiBiYWRnZXM7XG4gICAgY29uc3QgbGlzdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWJhZGdlcy1saXN0XScpO1xuICAgIGlmICghbGlzdCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgaXRlbXMuZm9yRWFjaCgoYmFkZ2UpID0+IHtcbiAgICAgICAgY29uc3QgdGFnID0gY29udGFpbmVyLmRhdGFzZXQubGlua0JhZGdlcyAhPT0gJ2ZhbHNlJyAmJiBiYWRnZS5saW5rID8gJ2EnIDogJ3NwYW4nO1xuICAgICAgICBjb25zdCBpdGVtID0gZWxlbWVudCh0YWcsICdybS1wcm9kdWN0LWJhZGdlc19faXRlbScpO1xuICAgICAgICBpZiAodGFnID09PSAnYScpIGl0ZW0uaHJlZiA9IGJhZGdlLmxpbms7XG4gICAgICAgIGlmIChiYWRnZS5pY29uICYmIGNvbnRhaW5lci5kYXRhc2V0LnNob3dJY29ucyAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgaXRlbS5hcHBlbmQoZWxlbWVudCgnaW1nJywgJ3JtLXByb2R1Y3QtYmFkZ2VzX19pY29uJywge1xuICAgICAgICAgICAgICAgIHNyYzogYmFkZ2UuaWNvbixcbiAgICAgICAgICAgICAgICBhbHQ6IGJhZGdlLnRpdGxlIHx8ICcnLFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ICdsYXp5J1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LnNob3dUaXRsZXMgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgnc3BhbicsICdybS1wcm9kdWN0LWJhZGdlc19fbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChiYWRnZS50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGxhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gY29udGFpbmVyLmRhdGFzZXQubGFiZWxTdHlsZSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgnc3BhbicsIGBybS1wcm9kdWN0LWJhZGdlc19fbGFiZWwgdWstbGFiZWwke3N0eWxlID8gYCB1ay1sYWJlbC0ke3N0eWxlfWAgOiAnJ31gKTtcbiAgICAgICAgICAgIGxhYmVsLmFwcGVuZCh0ZXh0KGJhZGdlLnRpdGxlKSk7XG4gICAgICAgICAgICBpdGVtLmFwcGVuZChsYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGl0ZW0pO1xuICAgIH0pO1xuICAgIGxpc3QucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcbiAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQoY29udGFpbmVyLCBpdGVtcy5sZW5ndGggPiAwKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2R1Y3RSYXRpbmcgPSAoY29udGFpbmVyLCByYXRpbmcgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGF2YWlsYWJsZSA9IEJvb2xlYW4ocmF0aW5nLmF2YWlsYWJsZSk7XG4gICAgY29uc3QgdmFsdWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihOdW1iZXIocmF0aW5nLm1heCkgfHwgNSwgTnVtYmVyKHJhdGluZy52YWx1ZSkgfHwgMCkpO1xuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KDEsIE51bWJlcihyYXRpbmcubWF4KSB8fCA1KTtcbiAgICBjb25zdCBwZXJjZW50ID0gYCR7KHZhbHVlIC8gbWF4KSAqIDEwMH0lYDtcbiAgICBjb25zdCBzdGFycyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXJhdGluZy1zdGFyc10nKTtcbiAgICBjb25zdCB2YWx1ZU5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1yYXRpbmctdmFsdWVdJyk7XG4gICAgY29uc3QgY291bnROb2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcmF0aW5nLWNvdW50XScpO1xuICAgIGlmIChzdGFycykgc3RhcnMuc3R5bGUuc2V0UHJvcGVydHkoJy0tcm0tcHJvZHVjdC1yYXRpbmctcGVyY2VudCcsIHBlcmNlbnQpO1xuICAgIGlmICh2YWx1ZU5vZGUpIHZhbHVlTm9kZS50ZXh0Q29udGVudCA9IHZhbHVlLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwge21heGltdW1GcmFjdGlvbkRpZ2l0czogMX0pO1xuICAgIGlmIChjb3VudE5vZGUpIHtcbiAgICAgICAgY291bnROb2RlLnRleHRDb250ZW50ID0gU3RyaW5nKE1hdGgubWF4KDAsIE51bWJlcihyYXRpbmcuY291bnQpIHx8IDApKTtcbiAgICAgICAgY291bnROb2RlLmhpZGRlbiA9IGNvbnRhaW5lci5kYXRhc2V0LnNob3dDb3VudCAhPT0gJ3RydWUnO1xuICAgIH1cbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7dmFsdWV9IC8gJHttYXh9YCk7XG4gICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KGNvbnRhaW5lciwgYXZhaWxhYmxlIHx8IGNvbnRhaW5lci5kYXRhc2V0LnNob3dFbXB0eSA9PT0gJ3RydWUnKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2R1Y3RCb251cyA9IChjb250YWluZXIsIGJvbnVzID0ge30pID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWJvbnVzLXZhbHVlXScpO1xuICAgIGlmICh2YWx1ZSkgdmFsdWUudGV4dENvbnRlbnQgPSBib251cy50ZXh0IHx8ICcnO1xuICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChjb250YWluZXIsIEJvb2xlYW4oYm9udXMuYXZhaWxhYmxlKSB8fCBjb250YWluZXIuZGF0YXNldC5zaG93RW1wdHkgPT09ICd0cnVlJyk7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0U3RvY2sgPSAoY29udGFpbmVyLCBwcm9kdWN0ID0ge30pID0+IHtcbiAgICBjb25zdCBxdWFudGl0eSA9IHByb2R1Y3QucXVhbnRpdHkgfHwge307XG4gICAgY29uc3QgYW1vdW50ID0gTnVtYmVyKHF1YW50aXR5LmFsbCkgfHwgMDtcbiAgICBjb25zdCBzdGF0dXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1zdG9jay1zdGF0dXNdJyk7XG4gICAgY29uc3QgYW1vdW50Tm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXN0b2NrLWFtb3VudF0nKTtcbiAgICBjb25zdCBwcm9ncmVzcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXN0b2NrLXByb2dyZXNzXScpO1xuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gcHJvZHVjdC5pblN0b2NrID8gY29udGFpbmVyLmRhdGFzZXQubGFiZWxJbiA6IGNvbnRhaW5lci5kYXRhc2V0LmxhYmVsT3V0O1xuICAgICAgICBzdGF0dXMuY2xhc3NMaXN0LnRvZ2dsZSgndWstdGV4dC1zdWNjZXNzJywgQm9vbGVhbihwcm9kdWN0LmluU3RvY2spKTtcbiAgICAgICAgc3RhdHVzLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtbXV0ZWQnLCAhcHJvZHVjdC5pblN0b2NrKTtcbiAgICB9XG4gICAgaWYgKGFtb3VudE5vZGUpIHtcbiAgICAgICAgYW1vdW50Tm9kZS50ZXh0Q29udGVudCA9IHF1YW50aXR5LnN0b2NrQWNjb3VudGluZ1xuICAgICAgICAgICAgPyBgJHthbW91bnR9ICR7cXVhbnRpdHkudW5pdFNob3J0IHx8IHF1YW50aXR5LnVuaXRzIHx8ICcnfWAudHJpbSgpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICBhbW91bnROb2RlLmhpZGRlbiA9IGNvbnRhaW5lci5kYXRhc2V0LnNob3dRdWFudGl0eSAhPT0gJ3RydWUnIHx8ICFxdWFudGl0eS5zdG9ja0FjY291bnRpbmc7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzcykge1xuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBNYXRoLm1heCgxLCBOdW1iZXIoY29udGFpbmVyLmRhdGFzZXQucHJvZ3Jlc3NUaHJlc2hvbGQpIHx8IDEwKTtcbiAgICAgICAgcHJvZ3Jlc3MubWF4ID0gdGhyZXNob2xkO1xuICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IE1hdGgubWluKGFtb3VudCwgdGhyZXNob2xkKTtcbiAgICAgICAgcHJvZ3Jlc3MuaGlkZGVuID0gY29udGFpbmVyLmRhdGFzZXQuc2hvd1Byb2dyZXNzICE9PSAndHJ1ZScgfHwgIXF1YW50aXR5LnN0b2NrQWNjb3VudGluZztcbiAgICB9XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0VW5pdCA9IChjb250YWluZXIsIHByb2R1Y3QgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSB8fCB7fTtcbiAgICBjb25zdCB1bml0ID0gY29udGFpbmVyLmRhdGFzZXQudW5pdFN0eWxlID09PSAnbG9uZydcbiAgICAgICAgPyBxdWFudGl0eS51bml0IHx8IHF1YW50aXR5LnVuaXRzXG4gICAgICAgIDogcXVhbnRpdHkudW5pdFNob3J0IHx8IHF1YW50aXR5LnVuaXRzO1xuICAgIGNvbnN0IHVuaXROb2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtdW5pdC1sYWJlbF0nKTtcbiAgICBjb25zdCBwcmljZU5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC11bml0LXByaWNlXScpO1xuICAgIGlmICh1bml0Tm9kZSkgdW5pdE5vZGUudGV4dENvbnRlbnQgPSB1bml0IHx8ICcnO1xuICAgIGlmIChwcmljZU5vZGUpIHByaWNlTm9kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmZpbmFsIHx8ICcnO1xuICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChjb250YWluZXIsIEJvb2xlYW4odW5pdCkpO1xufTtcblxuY29uc3Qgb25lQ2xpY2tQcm9kdWN0VmFsdWUgPSAoc291cmNlLCBwcm9kdWN0ID0ge30pID0+IHtcbiAgICBpZiAoc291cmNlID09PSAncHJvZHVjdF9pZCcpIHJldHVybiBTdHJpbmcocHJvZHVjdC5pZCB8fCAnJyk7XG4gICAgaWYgKHNvdXJjZSA9PT0gJ3Byb2R1Y3RfdGl0bGUnKSByZXR1cm4gU3RyaW5nKHByb2R1Y3QudGl0bGUgfHwgJycpO1xuICAgIGlmIChzb3VyY2UgPT09ICdwcm9kdWN0X2NvZGUnKSByZXR1cm4gU3RyaW5nKHByb2R1Y3QuY29kZSB8fCAnJyk7XG4gICAgaWYgKHNvdXJjZSA9PT0gJ3Byb2R1Y3RfdXJsJykgcmV0dXJuIFN0cmluZyhwcm9kdWN0LmxpbmsgfHwgJycpO1xuICAgIGlmIChzb3VyY2UgPT09ICdwcm9kdWN0X3ByaWNlJykgcmV0dXJuIFN0cmluZyhwcm9kdWN0LnByaWNlPy5maW5hbCB8fCAnJyk7XG4gICAgaWYgKHNvdXJjZSA9PT0gJ3Byb2R1Y3RfcXVhbnRpdHknKSByZXR1cm4gU3RyaW5nKHByb2R1Y3QucXVhbnRpdHk/Lm1pbiA/PyAxKTtcbiAgICByZXR1cm4gJyc7XG59O1xuXG5jb25zdCByZW5kZXJPbmVDbGlja09yZGVyID0gKGNvbnRhaW5lciwgcHJvZHVjdCA9IHt9KSA9PiB7XG4gICAgY29udGFpbmVyLmRhdGFzZXQucm1PbmVjbGlja1Byb2R1Y3RJZCA9IFN0cmluZyhwcm9kdWN0LmlkIHx8ICcnKTtcbiAgICBjb250YWluZXIuZGF0YXNldC5ybU9uZWNsaWNrUHJvZHVjdE5hbWUgPSBTdHJpbmcocHJvZHVjdC50aXRsZSB8fCAnJyk7XG5cbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tb25lY2xpY2stc291cmNlXScpLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGZpZWxkLmRhdGFzZXQucm1PbmVjbGlja1NvdXJjZSB8fCAnJztcbiAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gb25lQ2xpY2tQcm9kdWN0VmFsdWUoc291cmNlLCBwcm9kdWN0KTtcblxuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBmaWVsZCkgZmllbGQudmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgICAgIGlmIChzb3VyY2UgIT09ICdwcm9kdWN0X3F1YW50aXR5JyB8fCAhZmllbGQubWF0Y2hlcygnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbWluID0gTnVtYmVyKHByb2R1Y3QucXVhbnRpdHk/Lm1pbikgfHwgMTtcbiAgICAgICAgY29uc3Qgc3RlcCA9IE51bWJlcihwcm9kdWN0LnF1YW50aXR5Py5zdGVwKSB8fCAxO1xuICAgICAgICBjb25zdCBtYXggPSBOdW1iZXIocHJvZHVjdC5xdWFudGl0eT8ubWF4KSB8fCAwO1xuICAgICAgICBmaWVsZC5taW4gPSBTdHJpbmcobWluKTtcbiAgICAgICAgZmllbGQuc3RlcCA9IFN0cmluZyhzdGVwKTtcbiAgICAgICAgaWYgKG1heCA+IDApIGZpZWxkLm1heCA9IFN0cmluZyhtYXgpO1xuICAgICAgICBlbHNlIGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnbWF4Jyk7XG4gICAgICAgIGZpZWxkLnZhbHVlID0gU3RyaW5nKG1pbik7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tb25lY2xpY2stc3ViamVjdC10ZW1wbGF0ZV0nKS5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCByZXBsYWNlbWVudHMgPSB7XG4gICAgICAgICAgICBwcm9kdWN0X2lkOiBTdHJpbmcocHJvZHVjdC5pZCB8fCAnJyksXG4gICAgICAgICAgICBwcm9kdWN0X25hbWU6IFN0cmluZyhwcm9kdWN0LnRpdGxlIHx8ICcnKSxcbiAgICAgICAgICAgIHByb2R1Y3RfY29kZTogU3RyaW5nKHByb2R1Y3QuY29kZSB8fCAnJyksXG4gICAgICAgICAgICBwcm9kdWN0X3VybDogU3RyaW5nKHByb2R1Y3QubGluayB8fCAnJyksXG4gICAgICAgICAgICBwcm9kdWN0X3ByaWNlOiBTdHJpbmcocHJvZHVjdC5wcmljZT8uZmluYWwgfHwgJycpXG4gICAgICAgIH07XG4gICAgICAgIGxldCB2YWx1ZSA9IGZpZWxkLmRhdGFzZXQucm1PbmVjbGlja1N1YmplY3RUZW1wbGF0ZSB8fCAnJztcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocmVwbGFjZW1lbnRzKS5mb3JFYWNoKChba2V5LCByZXBsYWNlbWVudF0pID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoYHske2tleX19YCkuam9pbihyZXBsYWNlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS10aXRsZV0nKTtcbiAgICBpZiAodGl0bGUpIHRpdGxlLnRleHRDb250ZW50ID0gcHJvZHVjdC50aXRsZSB8fCAnJztcblxuICAgIGNvbnN0IGltYWdlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLW9uZWNsaWNrLXN1bW1hcnktaW1hZ2VdJyk7XG4gICAgY29uc3QgbWVkaWEgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1tZWRpYV0nKTtcbiAgICBjb25zdCBpbWFnZVNvdXJjZSA9IHByb2R1Y3QubWVkaWE/LlswXT8uc3JjIHx8ICcnO1xuICAgIGlmIChpbWFnZSkge1xuICAgICAgICBpZiAoaW1hZ2VTb3VyY2UpIGltYWdlLnNyYyA9IGltYWdlU291cmNlO1xuICAgICAgICBlbHNlIGltYWdlLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIGltYWdlLmFsdCA9IHByb2R1Y3QudGl0bGUgfHwgJyc7XG4gICAgfVxuICAgIGlmIChtZWRpYSkgbWVkaWEuaGlkZGVuID0gIWltYWdlU291cmNlO1xuXG4gICAgY29uc3QgcHJpY2UgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1wcmljZV0nKTtcbiAgICBpZiAocHJpY2UpIHByaWNlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uZmluYWwgfHwgJyc7XG4gICAgY29uc3QgdW5pdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1vbmVjbGljay1zdW1tYXJ5LXVuaXRdJyk7XG4gICAgY29uc3QgdW5pdFRleHQgPSBwcm9kdWN0LnF1YW50aXR5Py51bml0U2hvcnQgfHwgcHJvZHVjdC5xdWFudGl0eT8udW5pdHMgfHwgJyc7XG4gICAgaWYgKHVuaXQpIHtcbiAgICAgICAgdW5pdC50ZXh0Q29udGVudCA9IHVuaXRUZXh0ID8gYC8ke3VuaXRUZXh0fWAgOiAnJztcbiAgICAgICAgdW5pdC5oaWRkZW4gPSAhdW5pdFRleHQ7XG4gICAgfVxuXG4gICAgY29uc3QgYm9udXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1ib251c10nKTtcbiAgICBjb25zdCBib251c1dyYXAgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1ib251cy13cmFwXScpO1xuICAgIGNvbnN0IGJvbnVzVGV4dCA9IFN0cmluZyhwcm9kdWN0LmJvbnVzPy50ZXh0IHx8ICcnKTtcbiAgICBpZiAoYm9udXMpIGJvbnVzLnRleHRDb250ZW50ID0gYm9udXNUZXh0O1xuICAgIGlmIChib251c1dyYXApIGJvbnVzV3JhcC5oaWRkZW4gPSAhYm9udXNUZXh0O1xuXG4gICAgY29uc3Qgc3RvY2sgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1zdG9ja10nKTtcbiAgICBpZiAoc3RvY2spIHtcbiAgICAgICAgY29uc3QgaW5TdG9jayA9IEJvb2xlYW4ocHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgY29uc3Qgc3RvY2tMYWJlbCA9IHN0b2NrLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLW9uZWNsaWNrLXN1bW1hcnktc3RvY2stbGFiZWxdJyk7XG4gICAgICAgIGNvbnN0IHN0b2NrSW5JY29uID0gc3RvY2sucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1zdG9jay1pbl0nKTtcbiAgICAgICAgY29uc3Qgc3RvY2tPdXRJY29uID0gc3RvY2sucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stc3VtbWFyeS1zdG9jay1vdXRdJyk7XG4gICAgICAgIHN0b2NrLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtc3VjY2VzcycsIGluU3RvY2spO1xuICAgICAgICBzdG9jay5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LW11dGVkJywgIWluU3RvY2spO1xuICAgICAgICBpZiAoc3RvY2tMYWJlbCkgc3RvY2tMYWJlbC50ZXh0Q29udGVudCA9IGluU3RvY2sgPyBzdG9jay5kYXRhc2V0LmxhYmVsSW4gOiBzdG9jay5kYXRhc2V0LmxhYmVsT3V0O1xuICAgICAgICBpZiAoc3RvY2tJbkljb24pIHN0b2NrSW5JY29uLmhpZGRlbiA9ICFpblN0b2NrO1xuICAgICAgICBpZiAoc3RvY2tPdXRJY29uKSBzdG9ja091dEljb24uaGlkZGVuID0gaW5TdG9jaztcbiAgICB9XG5cbiAgICBjb25zdCBkaXNhYmxlZCA9IGNvbnRhaW5lci5kYXRhc2V0LmRpc2FibGVPdXRPZlN0b2NrID09PSAndHJ1ZScgJiYgIXByb2R1Y3QuaW5TdG9jaztcbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJmLWJ1dHRvbi1zZW5kLCBbZGF0YS1ybS1vbmVjbGljay10cmlnZ2VyXScpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgaWYgKGRpc2FibGVkKSBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgZWxzZSBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJyk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBvbmVDbGlja0ZpZWxkVmFsdWVzID0gKGZvcm0sIG5hbWUpID0+IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cylcbiAgICAuZmlsdGVyKChjb250cm9sKSA9PiBjb250cm9sLm5hbWUgPT09IG5hbWUgJiYgIWNvbnRyb2wuZGlzYWJsZWQpXG4gICAgLmZsYXRNYXAoKGNvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKChjb250cm9sLnR5cGUgPT09ICdjaGVja2JveCcgfHwgY29udHJvbC50eXBlID09PSAncmFkaW8nKSAmJiAhY29udHJvbC5jaGVja2VkKSByZXR1cm4gW107XG4gICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiYgY29udHJvbC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oY29udHJvbC5zZWxlY3RlZE9wdGlvbnMpLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbU3RyaW5nKGNvbnRyb2wudmFsdWUgfHwgJycpXTtcbiAgICB9KTtcblxuY29uc3Qgc3luY09uZUNsaWNrQ29uZGl0aW9uYWxGaWVsZHMgPSAob3JkZXIpID0+IHtcbiAgICBjb25zdCBmb3JtID0gb3JkZXIucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgIGlmICghZm9ybSkgcmV0dXJuO1xuXG4gICAgb3JkZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tb25lY2xpY2stY29uZGl0aW9uLWZpZWxkXScpLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0IHNvdXJjZU5hbWUgPSBmaWVsZC5kYXRhc2V0LnJtT25lY2xpY2tDb25kaXRpb25GaWVsZCB8fCAnJztcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRWYWx1ZSA9IGZpZWxkLmRhdGFzZXQucm1PbmVjbGlja0NvbmRpdGlvblZhbHVlIHx8ICcnO1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gb25lQ2xpY2tGaWVsZFZhbHVlcyhmb3JtLCBzb3VyY2VOYW1lKS5pbmNsdWRlcyhleHBlY3RlZFZhbHVlKTtcblxuICAgICAgICBmaWVsZC5oaWRkZW4gPSAhdmlzaWJsZTtcbiAgICAgICAgZmllbGQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHZpc2libGUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICAgICAgZmllbGQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGVkID0gIXZpc2libGU7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IGNvbnRyb2wuZGF0YXNldC5ybU9uZWNsaWNrUmVxdWlyZWQgPT09ICd0cnVlJztcbiAgICAgICAgICAgIGNvbnRyb2wucmVxdWlyZWQgPSB2aXNpYmxlICYmIHJlcXVpcmVkO1xuICAgICAgICAgICAgY29udHJvbC5jbGFzc0xpc3QudG9nZ2xlKCdyZXF1aXJlZCcsIHZpc2libGUgJiYgcmVxdWlyZWQpO1xuICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcsICd1ay1mb3JtLWRhbmdlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGluaXRPbmVDbGlja0NvbmRpdGlvbmFsRmllbGRzID0gKG9yZGVyKSA9PiB7XG4gICAgaWYgKG9yZGVyLmRhdGFzZXQucm1PbmVjbGlja0NvbmRpdGlvbnNSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgb3JkZXIuZGF0YXNldC5ybU9uZWNsaWNrQ29uZGl0aW9uc1JlYWR5ID0gJ3RydWUnO1xuICAgIGNvbnN0IGZvcm0gPSBvcmRlci5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgaWYgKCFmb3JtKSByZXR1cm47XG5cbiAgICBjb25zdCBzeW5jID0gKCkgPT4gc3luY09uZUNsaWNrQ29uZGl0aW9uYWxGaWVsZHMob3JkZXIpO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc3luYyk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHN5bmMpO1xuICAgIHN5bmMoKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2R1Y3RTcGVjaWZpY2F0aW9ucyA9IChjb250YWluZXIsIHNvdXJjZUZpZWxkc2V0cyA9IFtdKSA9PiB7XG4gICAgY29uc3Qgc2hvd1ZhcmlhbnRzID0gY29udGFpbmVyLmRhdGFzZXQuc2hvd1ZhcmlhbnRGaWVsZHMgIT09ICdmYWxzZSc7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWVsZHMgPSBuZXcgU2V0KFN0cmluZyhjb250YWluZXIuZGF0YXNldC5zZWxlY3RlZEZpZWxkcyB8fCAnJylcbiAgICAgICAgLnNwbGl0KCcsJykubWFwKChhbGlhcykgPT4gYWxpYXMudHJpbSgpKS5maWx0ZXIoQm9vbGVhbikpO1xuICAgIGNvbnN0IGZpZWxkTGltaXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNCwgTnVtYmVyLnBhcnNlSW50KGNvbnRhaW5lci5kYXRhc2V0LmZpZWxkTGltaXQgfHwgJzAnLCAxMCkgfHwgMCkpO1xuICAgIGNvbnN0IHNob3dUaXRsZXMgPSBjb250YWluZXIuZGF0YXNldC5zaG93RmllbGRzZXRUaXRsZXMgIT09ICdmYWxzZSc7XG4gICAgY29uc3QgZGl2aWRlciA9IGNvbnRhaW5lci5kYXRhc2V0LmRpdmlkZXIgIT09ICdmYWxzZSc7XG4gICAgY29uc3Qgc3RyaXBlZCA9IGNvbnRhaW5lci5kYXRhc2V0LnN0cmlwZWQgPT09ICd0cnVlJztcbiAgICBjb25zdCBsYXlvdXQgPSBbJ2Rlc2NyaXB0aW9uLWxpc3QnLCAndGFibGUnLCAnZ3JpZCddLmluY2x1ZGVzKGNvbnRhaW5lci5kYXRhc2V0LmxheW91dClcbiAgICAgICAgPyBjb250YWluZXIuZGF0YXNldC5sYXlvdXQgOiAnZGVzY3JpcHRpb24tbGlzdCc7XG4gICAgY29uc3QgcmVzcG9uc2l2ZUNvbHVtbiA9ICh2YWx1ZSwgZmFsbGJhY2spID0+IFsnMScsICcyJywgJzMnLCAnNCddLmluY2x1ZGVzKHZhbHVlKSA/IHZhbHVlIDogZmFsbGJhY2s7XG4gICAgY29uc3QgbGVnYWN5Q29sdW1ucyA9IHJlc3BvbnNpdmVDb2x1bW4oY29udGFpbmVyLmRhdGFzZXQuY29sdW1ucywgJzInKTtcbiAgICBjb25zdCBjb2x1bW5zU21hbGwgPSByZXNwb25zaXZlQ29sdW1uKGNvbnRhaW5lci5kYXRhc2V0LmNvbHVtbnNTbWFsbCwgJzEnKTtcbiAgICBjb25zdCBjb2x1bW5zTWVkaXVtID0gcmVzcG9uc2l2ZUNvbHVtbihjb250YWluZXIuZGF0YXNldC5jb2x1bW5zTWVkaXVtLCBsZWdhY3lDb2x1bW5zKTtcbiAgICBjb25zdCBjb2x1bW5zTGFyZ2UgPSByZXNwb25zaXZlQ29sdW1uKGNvbnRhaW5lci5kYXRhc2V0LmNvbHVtbnNMYXJnZSwgbGVnYWN5Q29sdW1ucyk7XG4gICAgY29uc3QgdGFibGVSZXNwb25zaXZlID0gWydzY3JvbGwnLCAnc3RhY2snXS5pbmNsdWRlcyhjb250YWluZXIuZGF0YXNldC50YWJsZVJlc3BvbnNpdmUpXG4gICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQudGFibGVSZXNwb25zaXZlIDogJ3Njcm9sbCc7XG4gICAgbGV0IGZpZWxkc1JlbWFpbmluZyA9IGZpZWxkTGltaXQgfHwgTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGNvbnN0IGZpZWxkc2V0cyA9IFtdO1xuICAgIHNvdXJjZUZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgICBpZiAoZmllbGRzUmVtYWluaW5nIDw9IDApIHJldHVybjtcbiAgICAgICAgY29uc3QgZmllbGRzID0gKGZpZWxkc2V0LmZpZWxkcyB8fCBbXSkuZmlsdGVyKChmaWVsZCkgPT4gKFxuICAgICAgICAgICAgKHNob3dWYXJpYW50cyB8fCAhZmllbGQudmFyaWFudClcbiAgICAgICAgICAgICYmICghc2VsZWN0ZWRGaWVsZHMuc2l6ZSB8fCBzZWxlY3RlZEZpZWxkcy5oYXMoU3RyaW5nKGZpZWxkLmFsaWFzIHx8ICcnKSkpXG4gICAgICAgICkpLnNsaWNlKDAsIGZpZWxkc1JlbWFpbmluZyk7XG4gICAgICAgIGlmICghZmllbGRzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBmaWVsZHNldHMucHVzaCh7Li4uZmllbGRzZXQsIGZpZWxkc30pO1xuICAgICAgICBmaWVsZHNSZW1haW5pbmcgLT0gZmllbGRzLmxlbmd0aDtcbiAgICB9KTtcbiAgICBjb25zdCBjb250ZW50ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19jb250ZW50Jyk7XG4gICAgaWYgKCFjb250ZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmaWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGVsZW1lbnQoJ3NlY3Rpb24nLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fZmllbGRzZXQnKTtcbiAgICAgICAgaWYgKHNob3dUaXRsZXMgJiYgZmllbGRzZXQudGl0bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlTm9kZSA9IGVsZW1lbnQoJ2gzJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3RpdGxlIHVrLWg0Jyk7XG4gICAgICAgICAgICB0aXRsZU5vZGUuYXBwZW5kKHRleHQoZmllbGRzZXQudGl0bGUpKTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKHRpdGxlTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGF5b3V0ID09PSAndGFibGUnKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZSA9IGVsZW1lbnQoJ3RhYmxlJywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3RhYmxlIHVrLXRhYmxlIHVrLXRhYmxlLXNtYWxsJHtkaXZpZGVyID8gJyB1ay10YWJsZS1kaXZpZGVyJyA6ICcnfSR7c3RyaXBlZCA/ICcgdWstdGFibGUtc3RyaXBlZCcgOiAnJ31gKTtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICAgICAgZmllbGRzZXQuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZWxlbWVudCgndHInLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19faXRlbScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgndGgnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fbGFiZWwnLCB7c2NvcGU6ICdyb3cnfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlbGVtZW50KCd0ZCcsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX192YWx1ZScpO1xuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZCh0ZXh0KGZpZWxkLnRpdGxlKSk7XG4gICAgICAgICAgICAgICAgYXBwZW5kU3BlY2lmaWNhdGlvblZhbHVlKHZhbHVlLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZChsYWJlbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZChib2R5KTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBlbGVtZW50KCdkaXYnLCBgcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fdGFibGUtd3JhcCR7dGFibGVSZXNwb25zaXZlID09PSAnc2Nyb2xsJyA/ICcgdWstb3ZlcmZsb3ctYXV0bycgOiAnJ31gKTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKHRhYmxlKTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2dyaWQnKSB7XG4gICAgICAgICAgICBjb25zdCBncmlkID0gZWxlbWVudCgnZGl2JywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2dyaWQgdWstY2hpbGQtd2lkdGgtMS0xIHVrLWNoaWxkLXdpZHRoLTEtJHtjb2x1bW5zU21hbGx9QHMgdWstY2hpbGQtd2lkdGgtMS0ke2NvbHVtbnNNZWRpdW19QG0gdWstY2hpbGQtd2lkdGgtMS0ke2NvbHVtbnNMYXJnZX1AbCR7ZGl2aWRlciA/ICcgdWstZ3JpZC1kaXZpZGVyJyA6ICcnfWAsIHsndWstZ3JpZCc6IHRydWV9KTtcbiAgICAgICAgICAgIGZpZWxkc2V0LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50KCdkaXYnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19faXRlbScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgnZGl2JywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2xhYmVsIHVrLXRleHQtbWV0YScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudCgnZGl2JywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3ZhbHVlIHVrLW1hcmdpbi1zbWFsbC10b3AnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZ3JpZC5hcHBlbmQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKGdyaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGVsZW1lbnQoJ2RsJywgYHJtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2xpc3QgdWstZGVzY3JpcHRpb24tbGlzdCR7ZGl2aWRlciA/ICcgdWstZGVzY3JpcHRpb24tbGlzdC1kaXZpZGVyJyA6ICcnfWApO1xuICAgICAgICAgICAgZmllbGRzZXQuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnQoJ2RpdicsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19pdGVtJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBlbGVtZW50KCdkdCcsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19sYWJlbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudCgnZGQnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kKGxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChzZWN0aW9uKTtcbiAgICB9KTtcblxuICAgIGNvbnRlbnQucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcbiAgICBjb250YWluZXIuaGlkZGVuID0gZmllbGRzZXRzLmxlbmd0aCA9PT0gMDtcbiAgICB3aW5kb3cuVUlraXQ/LnVwZGF0ZT8uKGNvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJQcm9kdWN0SG92ZXJHYWxsZXJ5ID0gKGNvbnRhaW5lciwgcHJvZHVjdCA9IHt9KSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyMCwgTnVtYmVyLnBhcnNlSW50KGNvbnRhaW5lci5kYXRhc2V0Lm1heEltYWdlcyB8fCAnMCcsIDEwKSB8fCAwKSk7XG4gICAgY29uc3QgaXRlbXMgPSAocHJvZHVjdC5tZWRpYSB8fCBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtPy5zcmMpO1xuICAgIGNvbnN0IG1lZGlhID0gbGltaXQgPyBpdGVtcy5zbGljZSgwLCBsaW1pdCkgOiBpdGVtcztcbiAgICBjb25zdCB2aWV3cG9ydCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X192aWV3cG9ydCcpO1xuICAgIGlmICghdmlld3BvcnQpIHJldHVybjtcblxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIG1lZGlhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZWxlbWVudCgnaW1nJywgYHJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV9faW1hZ2Uke2luZGV4ID09PSAwID8gJyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2ltYWdlLS1hY3RpdmUnIDogJyd9YCwge1xuICAgICAgICAgICAgJ2RhdGEtcm0tcHJvZHVjdC1ob3Zlci1pbWFnZSc6IHRydWUsXG4gICAgICAgICAgICAnZGF0YS1pbmRleCc6IGluZGV4LFxuICAgICAgICAgICAgc3JjOiBpdGVtLnNyYyxcbiAgICAgICAgICAgIGFsdDogaXRlbS5hbHQgfHwgcHJvZHVjdC50aXRsZSB8fCAnJyxcbiAgICAgICAgICAgIGxvYWRpbmc6IGluZGV4ID09PSAwID8gKGNvbnRhaW5lci5kYXRhc2V0LmxvYWRpbmcgfHwgJ2xhenknKSA6ICdsYXp5JyxcbiAgICAgICAgICAgIGRlY29kaW5nOiAnYXN5bmMnLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogaW5kZXggPT09IDAgPyAnZmFsc2UnIDogJ3RydWUnXG4gICAgICAgIH0pO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQoaW1hZ2UpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5kaWNhdG9yU3R5bGUgPSBjb250YWluZXIuZGF0YXNldC5pbmRpY2F0b3JzIHx8ICdiYXJzJztcbiAgICBpZiAobWVkaWEubGVuZ3RoID4gMSAmJiBpbmRpY2F0b3JTdHlsZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBlbGVtZW50KCdzcGFuJywgYHJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV9faW5kaWNhdG9ycyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvcnMtLSR7aW5kaWNhdG9yU3R5bGV9YCwge1xuICAgICAgICAgICAgJ2RhdGEtcm0tcHJvZHVjdC1ob3Zlci1pbmRpY2F0b3JzJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KTtcbiAgICAgICAgbWVkaWEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGluZGljYXRvcnMuYXBwZW5kKGVsZW1lbnQoJ3NwYW4nLCBgcm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X19pbmRpY2F0b3Ike2luZGV4ID09PSAwID8gJyBybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvci0tYWN0aXZlJyA6ICcnfWAsIHtcbiAgICAgICAgICAgICAgICAnZGF0YS1pbmRleCc6IGluZGV4XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQoaW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgdmlld3BvcnQucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcbiAgICBjb250YWluZXIuaGlkZGVuID0gbWVkaWEubGVuZ3RoID09PSAwO1xuICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmFkaWNhbG1hcnQ6aG92ZXItZ2FsbGVyeS1yZWZyZXNoJykpO1xufTtcblxuY29uc3Qgc2V0TWV0YUNvbnRlbnQgPSAoYXR0cmlidXRlLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKGBtZXRhWyR7YXR0cmlidXRlfT1cIiR7bmFtZX1cIl1gKTtcbiAgICBpZiAoIW5vZGUgJiYgIXZhbHVlKSByZXR1cm47XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgbmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKG5vZGUpO1xuICAgIH1cbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIFN0cmluZyh2YWx1ZSB8fCAnJykpO1xufTtcblxuY29uc3QgdXBkYXRlUHJvZHVjdE1ldGFkYXRhID0gKHByb2R1Y3QpID0+IHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IFN0cmluZyhwcm9kdWN0LmludHJvdGV4dCB8fCAnJykudHJpbSgpO1xuICAgIGNvbnN0IGltYWdlID0gcHJvZHVjdC5tZWRpYT8uWzBdPy5zcmMgfHwgJyc7XG4gICAgY29uc3QgbGluayA9IHByb2R1Y3QubGluayA/IG5ldyBVUkwocHJvZHVjdC5saW5rLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJyc7XG4gICAgbGV0IGNhbm9uaWNhbCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nKTtcblxuICAgIGlmICghY2Fub25pY2FsICYmIGxpbmspIHtcbiAgICAgICAgY2Fub25pY2FsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBjYW5vbmljYWwucmVsID0gJ2Nhbm9uaWNhbCc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKGNhbm9uaWNhbCk7XG4gICAgfVxuICAgIGlmIChjYW5vbmljYWwgJiYgbGluaykgY2Fub25pY2FsLmhyZWYgPSBsaW5rO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ2Rlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgIHNldE1ldGFDb250ZW50KCdwcm9wZXJ0eScsICdvZzp0aXRsZScsIHByb2R1Y3QudGl0bGUgfHwgJycpO1xuICAgIHNldE1ldGFDb250ZW50KCdwcm9wZXJ0eScsICdvZzpkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICBzZXRNZXRhQ29udGVudCgncHJvcGVydHknLCAnb2c6dXJsJywgbGluayk7XG4gICAgc2V0TWV0YUNvbnRlbnQoJ3Byb3BlcnR5JywgJ29nOmltYWdlJywgaW1hZ2UgPyBuZXcgVVJMKGltYWdlLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJycpO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ3R3aXR0ZXI6dGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICcnKTtcbiAgICBzZXRNZXRhQ29udGVudCgnbmFtZScsICd0d2l0dGVyOmRlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgIHNldE1ldGFDb250ZW50KCduYW1lJywgJ3R3aXR0ZXI6aW1hZ2UnLCBpbWFnZSA/IG5ldyBVUkwoaW1hZ2UsIGRvY3VtZW50LmJhc2VVUkkpLmhyZWYgOiAnJyk7XG59O1xuXG5jbGFzcyBQcm9kdWN0U2NvcGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZSkge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHJlc29sdmVQcm9kdWN0U2NvcGUoc291cmNlKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gdGhpcy5yZWFkRGF0YSgpO1xuICAgIH1cblxuICAgIHJlYWREYXRhKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gQXJyYXkuZnJvbSh0aGlzLnNvdXJjZS5jaGlsZHJlbiB8fCBbXSlcbiAgICAgICAgICAgIC5maW5kKChub2RlKSA9PiBub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ3JtLXByb2R1Y3RfX2RhdGEnKVxuICAgICAgICAgICAgICAgIHx8IG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygncm0tcHJvZHVjdC1jYXJkX19kYXRhJykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vZGVzKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2NvcGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gICAgICAgICAgICAuZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSBub2RlLmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bmVyID09PSB0aGlzLnNvdXJjZSB8fCAoIW93bmVyICYmIHRoaXMuc2NvcGUgIT09IHRoaXMuc291cmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFNjb3BlUmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RTY29wZVJlYWR5ID0gJ3RydWUnO1xuICAgICAgICB0aGlzLnNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpICE9PSB0aGlzLnNvdXJjZSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8ucHJvZHVjdD8uaWQpIHRoaXMuYXBwbHlQcm9kdWN0KGV2ZW50LmRldGFpbC5wcm9kdWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlQcm9kdWN0KHByb2R1Y3QpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gey4uLnRoaXMucHJvZHVjdCwgLi4ucHJvZHVjdH07XG4gICAgICAgIHRoaXMuc291cmNlLmRhdGFzZXQucm1Qcm9kdWN0SWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC10aXRsZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC50aXRsZSB8fCAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtY29kZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5jb2RlIHx8ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1kZXNjcmlwdGlvbl0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHByb2R1Y3QuaW50cm90ZXh0SHRtbCB8fCBwcm9kdWN0LmludHJvdGV4dCB8fCAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtZnVsbC1kZXNjcmlwdGlvbl0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHByb2R1Y3QuZnVsbHRleHRIdG1sIHx8IHByb2R1Y3QuZnVsbHRleHQgfHwgJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWxpbmtdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QubGluaykgbm9kZS5ocmVmID0gcHJvZHVjdC5saW5rO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtZWRpYSA9IHByb2R1Y3QubWVkaWE/LlswXSB8fCB7fTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1pbWFnZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAvLyBJbml0aWFsIG1hcmt1cCBjYW4gdXNlIFlPT3RoZW1lLWdlbmVyYXRlZCBzcmNzZXRzLiBBIHZhcmlhbnQgY2FuXG4gICAgICAgICAgICAvLyBwb2ludCB0byBhbm90aGVyIGZpbGUsIHNvIHN0YWxlIGNhbmRpZGF0ZXMgbXVzdCBub3Qgb3ZlcnJpZGUgaXQuXG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc3Jjc2V0Jyk7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc2l6ZXMnKTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICBpZiAobWVkaWEuc3JjKSBub2RlLnNyYyA9IG1lZGlhLnNyYztcbiAgICAgICAgICAgIGVsc2Ugbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgbm9kZS5hbHQgPSBtZWRpYS5hbHQgfHwgcHJvZHVjdC50aXRsZSB8fCAnJztcbiAgICAgICAgICAgIG5vZGUuaGlkZGVuID0gIW1lZGlhLnNyYztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtaG92ZXItZ2FsbGVyeV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJQcm9kdWN0SG92ZXJHYWxsZXJ5KG5vZGUsIHByb2R1Y3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2UtYmFzZV0nKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlLWZpbmFsXScpO1xuICAgICAgICAgICAgY29uc3QgZGlzY291bnQgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtZGlzY291bnRdJyk7XG4gICAgICAgICAgICBjb25zdCBzYXZpbmdzID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LXByaWNlLXNhdmluZ3NdJyk7XG4gICAgICAgICAgICBjb25zdCBzYXZpbmdzVmFsdWUgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2Utc2F2aW5ncy12YWx1ZV0nKTtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBCb29sZWFuKHByb2R1Y3QucHJpY2U/LmRpc2NvdW50RW5hYmxlZCk7XG4gICAgICAgICAgICBjb25zdCB1bml0V3JhcCA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1wcmljZS11bml0LXdyYXBdJyk7XG4gICAgICAgICAgICBjb25zdCB1bml0Tm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1wcmljZS11bml0XScpO1xuICAgICAgICAgICAgY29uc3QgdW5pdCA9IG5vZGUuZGF0YXNldC51bml0U3R5bGUgPT09ICdsb25nJ1xuICAgICAgICAgICAgICAgID8gcHJvZHVjdC5xdWFudGl0eT8udW5pdCB8fCBwcm9kdWN0LnF1YW50aXR5Py51bml0cyB8fCAnJ1xuICAgICAgICAgICAgICAgIDogcHJvZHVjdC5xdWFudGl0eT8udW5pdFNob3J0IHx8IHByb2R1Y3QucXVhbnRpdHk/LnVuaXRzIHx8ICcnO1xuICAgICAgICAgICAgaWYgKGJhc2UpIHtcbiAgICAgICAgICAgICAgICBiYXNlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uYmFzZSB8fCAnJztcbiAgICAgICAgICAgICAgICBiYXNlLmhpZGRlbiA9ICFlbmFibGVkIHx8IG5vZGUuZGF0YXNldC5zaG93QmFzZSAhPT0gJ3RydWUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbmFsKSBmaW5hbC50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmZpbmFsIHx8ICcnO1xuICAgICAgICAgICAgaWYgKGRpc2NvdW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzY291bnRUZXh0ID0gcHJvZHVjdERpc2NvdW50VGV4dChwcm9kdWN0LnByaWNlLCBub2RlLmRhdGFzZXQuZGlzY291bnRNb2RlIHx8ICdsZWdhY3knKTtcbiAgICAgICAgICAgICAgICBkaXNjb3VudC50ZXh0Q29udGVudCA9IGRpc2NvdW50VGV4dDtcbiAgICAgICAgICAgICAgICBkaXNjb3VudC5oaWRkZW4gPSAhZW5hYmxlZCB8fCBub2RlLmRhdGFzZXQuc2hvd0Rpc2NvdW50ICE9PSAndHJ1ZScgfHwgIWRpc2NvdW50VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzYXZpbmdzVmFsdWUpIHNhdmluZ3NWYWx1ZS50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmJlbmVmaXQgfHwgJyc7XG4gICAgICAgICAgICBpZiAoc2F2aW5ncykgc2F2aW5ncy5oaWRkZW4gPSAhZW5hYmxlZFxuICAgICAgICAgICAgICAgIHx8IG5vZGUuZGF0YXNldC5zaG93U2F2aW5ncyAhPT0gJ3RydWUnXG4gICAgICAgICAgICAgICAgfHwgIShOdW1iZXIocHJvZHVjdC5wcmljZT8uYmVuZWZpdFZhbHVlKSA+IDApO1xuICAgICAgICAgICAgaWYgKHVuaXROb2RlKSB1bml0Tm9kZS50ZXh0Q29udGVudCA9IHVuaXQ7XG4gICAgICAgICAgICBpZiAodW5pdFdyYXApIHVuaXRXcmFwLmhpZGRlbiA9IG5vZGUuZGF0YXNldC5zaG93VW5pdCAhPT0gJ3RydWUnIHx8ICF1bml0O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1iYXNlLXByaWNlXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBwcm9kdWN0LnByaWNlPy5iYXNlIHx8ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1kaXNjb3VudC12YWx1ZV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uZGlzY291bnQgfHwgJyc7XG4gICAgICAgICAgICB1cGRhdGVPcHRpb25hbEVsZW1lbnQobm9kZSwgQm9vbGVhbihwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtYmVuZWZpdF0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uYmVuZWZpdCB8fCAnJztcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChub2RlLCBOdW1iZXIocHJvZHVjdC5wcmljZT8uYmVuZWZpdFZhbHVlKSA+IDApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWF2YWlsYWJpbGl0eV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5pblN0b2NrID8gbm9kZS5kYXRhc2V0LmxhYmVsSW4gOiBub2RlLmRhdGFzZXQubGFiZWxPdXQ7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtc3VjY2VzcycsIEJvb2xlYW4ocHJvZHVjdC5pblN0b2NrKSk7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtbXV0ZWQnLCAhcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1jYXRlZ29yeV0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5jYXRlZ29yeT8udGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCdhJykgJiYgcHJvZHVjdC5jYXRlZ29yeT8ubGluaykgbm9kZS5ocmVmID0gcHJvZHVjdC5jYXRlZ29yeS5saW5rO1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIEJvb2xlYW4ocHJvZHVjdC5jYXRlZ29yeT8udGl0bGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtbWFudWZhY3R1cmVyXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hbnVmYWN0dXJlciA9IHByb2R1Y3QubWFudWZhY3R1cmVycz8uWzBdO1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG1hbnVmYWN0dXJlcj8udGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCdhJykgJiYgbWFudWZhY3R1cmVyPy5saW5rKSBub2RlLmhyZWYgPSBtYW51ZmFjdHVyZXIubGluaztcbiAgICAgICAgICAgIHVwZGF0ZU9wdGlvbmFsRWxlbWVudChub2RlLCBCb29sZWFuKG1hbnVmYWN0dXJlcj8udGl0bGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3Qtc3RvY2stcXVhbnRpdHldJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gTnVtYmVyKHByb2R1Y3QucXVhbnRpdHk/LmFsbCkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IEJvb2xlYW4ocHJvZHVjdC5xdWFudGl0eT8uc3RvY2tBY2NvdW50aW5nKTtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICA/IGAke2Ftb3VudH0gJHtwcm9kdWN0LnF1YW50aXR5Py51bml0U2hvcnQgfHwgcHJvZHVjdC5xdWFudGl0eT8udW5pdHMgfHwgJyd9YC50cmltKClcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIGF2YWlsYWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXVuaXQtdmFsdWVdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5pdCA9IHByb2R1Y3QucXVhbnRpdHk/LnVuaXRTaG9ydCB8fCBwcm9kdWN0LnF1YW50aXR5Py51bml0cyB8fCAnJztcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSB1bml0O1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9uYWxFbGVtZW50KG5vZGUsIEJvb2xlYW4odW5pdCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC11bml0XScpLmZvckVhY2goKG5vZGUpID0+IHJlbmRlclByb2R1Y3RVbml0KG5vZGUsIHByb2R1Y3QpKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1jdXN0b20tZmllbGRdJykuZm9yRWFjaCgobm9kZSkgPT4gcmVuZGVyUHJvZHVjdEN1c3RvbUZpZWxkKG5vZGUsIHByb2R1Y3QpKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1zdG9ja10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0U3RvY2sobm9kZSwgcHJvZHVjdCkpO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWJhZGdlc10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0QmFkZ2VzKG5vZGUsIHByb2R1Y3QuYmFkZ2VzIHx8IFtdKSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtcmF0aW5nXScpLmZvckVhY2goKG5vZGUpID0+IHJlbmRlclByb2R1Y3RSYXRpbmcobm9kZSwgcHJvZHVjdC5yYXRpbmcgfHwge30pKTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1ib251c10nKS5mb3JFYWNoKChub2RlKSA9PiByZW5kZXJQcm9kdWN0Qm9udXMobm9kZSwgcHJvZHVjdC5ib251cyB8fCB7fSkpO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IG5vZGUubWF0Y2hlcygnaW5wdXQnKSA/IG5vZGUgOiBub2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgICAgICAgICAgaWYgKCFpbnB1dCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbm9kZS5tYXRjaGVzKCdpbnB1dCcpID8gbm9kZS5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0nKSB8fCBub2RlIDogbm9kZTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gU3RyaW5nKHByb2R1Y3QuaWQpO1xuICAgICAgICAgICAgaW5wdXQuZGF0YXNldC5wcm9kdWN0SWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICBpbnB1dC5kYXRhc2V0LnByb2R1Y3RUaXRsZSA9IHByb2R1Y3QudGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBpbnB1dC5kYXRhc2V0LnF1YW50aXR5ID0gU3RyaW5nKHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxKTtcbiAgICAgICAgICAgIGlucHV0LmRpc2FibGVkID0gIXByb2R1Y3QuaW5TdG9jayAmJiBjb250YWluZXIuZGF0YXNldC5kaXNhYmxlT3V0T2ZTdG9jayAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I/LignW2RhdGEtcm0tcHJvZHVjdC1zZWxlY3QtbGFiZWxdLCAucm0tcHJvZHVjdC1zZWxlY3RfX2xhYmVsJyk7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGFiZWwgPSBjb250YWluZXIuZGF0YXNldC5iYXNlTGFiZWwgfHwgJyc7XG4gICAgICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBjb250YWluZXIuZGF0YXNldC5zaG93VGl0bGUgPT09ICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICA/IGAke2Jhc2VMYWJlbH0gJHtwcm9kdWN0LnRpdGxlIHx8ICcnfWAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgIDogYmFzZUxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0LmRpc2FibGVkICYmIGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1hY3Rpb25dJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5kYXRhc2V0LnByb2R1Y3RJZCA9IFN0cmluZyhwcm9kdWN0LmlkKTtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7bm9kZS5kYXRhc2V0LmxhYmVsIHx8ICcnfSAke3Byb2R1Y3QudGl0bGUgfHwgJyd9YC50cmltKCkpO1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdybS1wcm9kdWN0LWFjdGlvbi0tYWN0aXZlJyk7XG4gICAgICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpwcm9kdWN0LWFjdGlvbi1yZWZyZXNoJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcXVpY2stdmlld10nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBub2RlLmRhdGFzZXQucm1RdWlja1ZpZXcgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZXMoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKS5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQuaWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQucm1EeW5hbWljUHJvZHVjdCA9ICd0cnVlJztcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicXVhbnRpdHlcIl0nKTtcbiAgICAgICAgICAgIGlmIChxdWFudGl0eSkge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5Lm1pbiA9IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiA/PyAxO1xuICAgICAgICAgICAgICAgIHF1YW50aXR5LnN0ZXAgPSBwcm9kdWN0LnF1YW50aXR5Py5zdGVwID8/IDE7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3QucXVhbnRpdHk/Lm1heCkgcXVhbnRpdHkubWF4ID0gcHJvZHVjdC5xdWFudGl0eS5tYXg7XG4gICAgICAgICAgICAgICAgZWxzZSBxdWFudGl0eS5yZW1vdmVBdHRyaWJ1dGUoJ21heCcpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocXVhbnRpdHkudmFsdWUpIDwgTnVtYmVyKHF1YW50aXR5Lm1pbikpIHF1YW50aXR5LnZhbHVlID0gcXVhbnRpdHkubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FydC5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGJ1dHRvbikgPT4geyBidXR0b24uZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrOyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tb25lY2xpY2stb3JkZXJdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyT25lQ2xpY2tPcmRlcihub2RlLCBwcm9kdWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc10nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJQcm9kdWN0U3BlY2lmaWNhdGlvbnMobm9kZSwgcHJvZHVjdC5maWVsZHNldHMgfHwgW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RQYWdlID09PSAndHJ1ZSdcbiAgICAgICAgICAgICYmIHRoaXMuc291cmNlLmRhdGFzZXQudXBkYXRlRG9jdW1lbnRUaXRsZSAhPT0gJ2ZhbHNlJ1xuICAgICAgICAgICAgJiYgcHJvZHVjdC50aXRsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBwcm9kdWN0LnRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFBhZ2UgPT09ICd0cnVlJ1xuICAgICAgICAgICAgJiYgdGhpcy5zb3VyY2UuZGF0YXNldC51cGRhdGVEb2N1bWVudE1ldGFkYXRhICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0TWV0YWRhdGEodGhpcy5wcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc291cmNlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpwcm9kdWN0LWNoYW5nZScsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0OiB0aGlzLnByb2R1Y3R9XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2R1Y3RCdWxrQWN0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnJvb3RTZWxlY3RvciA9IGNvbnRhaW5lci5kYXRhc2V0LnNlbGVjdGlvblJvb3QgfHwgJyc7XG4gICAgICAgIHRoaXMucmVzb2x2ZWRSb290ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzb2x2ZWRSb290KSByZXR1cm4gdGhpcy5yZXNvbHZlZFJvb3Q7XG4gICAgICAgIGlmICh0aGlzLnJvb3RTZWxlY3Rvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVkUm9vdCA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QodGhpcy5yb290U2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5yb290U2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVkUm9vdDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290U2VsZWN0b3IgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc29sdmVkUm9vdCA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLXJtLXNlbGVjdGlvbi1zY29wZV0sIC5ybS1ncmlkLCAudWstc2VjdGlvbicpIHx8IGRvY3VtZW50O1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlZFJvb3Q7XG4gICAgfVxuXG4gICAgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQnKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1CdWxrQWN0aW9uc1JlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1CdWxrQWN0aW9uc1JlYWR5ID0gJ3RydWUnO1xuICAgICAgICB0aGlzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVTZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXJtLWJ1bGstYWN0aW9uXScpPy5kYXRhc2V0LnJtQnVsa0FjdGlvbjtcbiAgICAgICAgICAgIGlmICghYWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NsZWFyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQoKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnY2FydCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvQ2FydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTZWxlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5tYXRjaGVzKCdbZGF0YS1ybS1wcm9kdWN0LXNlbGVjdF0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykpIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tc2VsZWN0aW9uLWNvdW50XScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBTdHJpbmcoc2VsZWN0ZWQubGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLWJ1bGstYWN0aW9uPVwiY2FydFwiXSwgW2RhdGEtcm0tYnVsay1hY3Rpb249XCJjbGVhclwiXScpXG4gICAgICAgICAgICAuZm9yRWFjaCgoYnV0dG9uKSA9PiB7IGJ1dHRvbi5kaXNhYmxlZCA9IHRoaXMucGVuZGluZyB8fCBzZWxlY3RlZC5sZW5ndGggPT09IDA7IH0pO1xuICAgIH1cblxuICAgIHNldFN0YXR1cyhtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWJ1bGstc3RhdHVzXScpO1xuICAgICAgICBpZiAoc3RhdHVzKSBzdGF0dXMudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIH1cblxuICAgIGFkZFRvQ2FydCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkKCk7XG4gICAgICAgIGNvbnN0IGNhcnQgPSB0eXBlb2Ygd2luZG93LlJhZGljYWxNYXJ0Q2FydCA9PT0gJ2Z1bmN0aW9uJyA/IHdpbmRvdy5SYWRpY2FsTWFydENhcnQoKSA6IG51bGw7XG4gICAgICAgIGlmICghc2VsZWN0ZWQubGVuZ3RoIHx8IHRoaXMucGVuZGluZykgcmV0dXJuO1xuICAgICAgICBpZiAoIWNhcnQ/LmFkZFByb2R1Y3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfQlVMS19DQVJUX1VOQVZBSUxBQkxFJywgJ0NhcnQgaXMgdW5hdmFpbGFibGUuJykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQSBmcmVlIEJ1aWxkZXIgY29tcG9zaXRpb24gY2FuIHJlbmRlciB0aGUgc2FtZSBwcm9kdWN0IG1vcmUgdGhhblxuICAgICAgICAvLyBvbmNlLiBSYWRpY2FsTWFydCBkZS1kdXBsaWNhdGVzIGNvbmN1cnJlbnQgYWRkcyBieSBpdHMgY2FydCBoYXNoLCBzb1xuICAgICAgICAvLyBtYWtlIHRoZSBidWxrIGFjdGlvbiBleHBsaWNpdGx5IG9uZSBhZGQgcGVyIHByb2R1Y3QgaW5zdGVhZCBvZlxuICAgICAgICAvLyByZXBvcnRpbmcgc3VjY2VzcyBmb3Igc2tpcHBlZCBkdXBsaWNhdGUgY29udHJvbHMuXG4gICAgICAgIGNvbnN0IGlucHV0c0J5UHJvZHVjdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgc2VsZWN0ZWQuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IE51bWJlcihpbnB1dC5kYXRhc2V0LnByb2R1Y3RJZCB8fCBpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAocHJvZHVjdElkICYmICFpbnB1dHNCeVByb2R1Y3QuaGFzKHByb2R1Y3RJZCkpIGlucHV0c0J5UHJvZHVjdC5zZXQocHJvZHVjdElkLCBpbnB1dCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9kdWN0SWRzID0gQXJyYXkuZnJvbShpbnB1dHNCeVByb2R1Y3Qua2V5cygpKTtcbiAgICAgICAgY29uc3Qgd2FpdGluZyA9IG5ldyBTZXQocHJvZHVjdElkcyk7XG4gICAgICAgIGNvbnN0IGZhaWx1cmVzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0JVTEtfQURESU5HJywgJ0FkZGluZyBzZWxlY3RlZCBwcm9kdWN0c+KApicpKTtcblxuICAgICAgICBsZXQgdGltZW91dDtcbiAgICAgICAgY29uc3QgZmluaXNoID0gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb25SYWRpY2FsTWFydENhcnRBZnRlckFkZFByb2R1Y3QnLCBoYW5kbGVSZXN1bHQpO1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXModHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19CVUxLX0FERF9GQUlMRUQnLCAnU29tZSBwcm9kdWN0cyBjb3VsZCBub3QgYmUgYWRkZWQgdG8gdGhlIGNhcnQuJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpidWxrLWFkZC1lcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7cHJvZHVjdElkcywgZmFpbGVkUHJvZHVjdElkczogQXJyYXkuZnJvbShmYWlsdXJlcyl9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfQlVMS19BRERFRCcsICdTZWxlY3RlZCBwcm9kdWN0cyB3ZXJlIGFkZGVkIHRvIHRoZSBjYXJ0LicpKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDpidWxrLWFkZCcsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge3Byb2R1Y3RJZHN9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGhhbmRsZVJlc3VsdCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8uZW50cnk/LnByb2R1Y3RfaWQpO1xuICAgICAgICAgICAgaWYgKCF3YWl0aW5nLmhhcyhwcm9kdWN0SWQpKSByZXR1cm47XG4gICAgICAgICAgICB3YWl0aW5nLmRlbGV0ZShwcm9kdWN0SWQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbD8uZXJyb3IpIGZhaWx1cmVzLmFkZChwcm9kdWN0SWQpO1xuICAgICAgICAgICAgaWYgKCF3YWl0aW5nLnNpemUpIGZpbmlzaCgpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvblJhZGljYWxNYXJ0Q2FydEFmdGVyQWRkUHJvZHVjdCcsIGhhbmRsZVJlc3VsdCk7XG4gICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3YWl0aW5nLmZvckVhY2goKHByb2R1Y3RJZCkgPT4gZmFpbHVyZXMuYWRkKHByb2R1Y3RJZCkpO1xuICAgICAgICAgICAgd2FpdGluZy5jbGVhcigpO1xuICAgICAgICAgICAgZmluaXNoKCk7XG4gICAgICAgIH0sIDMwMDAwKTtcblxuICAgICAgICBBcnJheS5mcm9tKGlucHV0c0J5UHJvZHVjdC5lbnRyaWVzKCkpLmZvckVhY2goKFtwcm9kdWN0SWQsIGlucHV0XSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gTWF0aC5tYXgoMC4wMDAxLCBOdW1iZXIoaW5wdXQuZGF0YXNldC5xdWFudGl0eSkgfHwgMSk7XG4gICAgICAgICAgICBjYXJ0LmFkZFByb2R1Y3QocHJvZHVjdElkLCBxdWFudGl0eSwge30sIGluZGV4ID09PSBwcm9kdWN0SWRzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2R1Y3RIb3ZlckdhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLnN1cHByZXNzQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaW1hZ2VzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LWhvdmVyLWltYWdlXScpKTtcbiAgICB9XG5cbiAgICBzaG93KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuaW1hZ2VzKCk7XG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBuZXh0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oaW1hZ2VzLmxlbmd0aCAtIDEsIE51bWJlcihpbmRleCkgfHwgMCkpO1xuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gbmV4dDtcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlLCBpbWFnZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBpbWFnZUluZGV4ID09PSBuZXh0O1xuICAgICAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnRvZ2dsZSgncm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5X19pbWFnZS0tYWN0aXZlJywgYWN0aXZlKTtcbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhY3RpdmUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvcicpLmZvckVhY2goKGluZGljYXRvciwgaW5kaWNhdG9ySW5kZXgpID0+IHtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc0xpc3QudG9nZ2xlKCdybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX2luZGljYXRvci0tYWN0aXZlJywgaW5kaWNhdG9ySW5kZXggPT09IG5leHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIuZGF0YXNldC5ybVByb2R1Y3RIb3ZlckdhbGxlcnlSZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJtUHJvZHVjdEhvdmVyR2FsbGVyeVJlYWR5ID0gJ3RydWUnO1xuICAgICAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnlfX3ZpZXdwb3J0Jyk7XG4gICAgICAgIGlmICghdmlld3BvcnQpIHJldHVybjtcbiAgICAgICAgY29uc3QgcG9pbnRlclN1cmZhY2UgPSB2aWV3cG9ydC5jbG9zZXN0KCcucm0tcHJvZHVjdC1jYXJkX19tYWluJykgfHwgdmlld3BvcnQ7XG5cbiAgICAgICAgcG9pbnRlclN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJykgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5pbWFnZXMoKTtcbiAgICAgICAgICAgIGlmIChpbWFnZXMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoIWJvdW5kcy53aWR0aCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW5zaWRlID0gZXZlbnQuY2xpZW50WCA+PSBib3VuZHMubGVmdCAmJiBldmVudC5jbGllbnRYIDw9IGJvdW5kcy5yaWdodFxuICAgICAgICAgICAgICAgICYmIGV2ZW50LmNsaWVudFkgPj0gYm91bmRzLnRvcCAmJiBldmVudC5jbGllbnRZIDw9IGJvdW5kcy5ib3R0b207XG4gICAgICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJlc2V0T25MZWF2ZSAhPT0gJ2ZhbHNlJyAmJiB0aGlzLmFjdGl2ZUluZGV4ICE9PSAwKSB0aGlzLnNob3coMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbiguOTk5OTk5LCAoZXZlbnQuY2xpZW50WCAtIGJvdW5kcy5sZWZ0KSAvIGJvdW5kcy53aWR0aCkpO1xuICAgICAgICAgICAgdGhpcy5zaG93KE1hdGguZmxvb3IocHJvZ3Jlc3MgKiBpbWFnZXMubGVuZ3RoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwb2ludGVyU3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQucmVzZXRPbkxlYXZlICE9PSAnZmFsc2UnKSB0aGlzLnNob3coMCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnRvdWNoID0ge1xuICAgICAgICAgICAgICAgIGlkOiBldmVudC5wb2ludGVySWQsXG4gICAgICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgIHRpbWU6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudG91Y2ggfHwgZXZlbnQucG9pbnRlcklkICE9PSB0aGlzLnRvdWNoLmlkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBkZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy50b3VjaC54O1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gZXZlbnQuY2xpZW50WSAtIHRoaXMudG91Y2gueTtcbiAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMudG91Y2gudGltZTtcbiAgICAgICAgICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPiA3NTAgfHwgTWF0aC5hYnMoZGVsdGFYKSA8IDM2IHx8IE1hdGguYWJzKGRlbHRhWCkgPD0gTWF0aC5hYnMoZGVsdGFZKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSB0aGlzLmltYWdlcygpO1xuICAgICAgICAgICAgaWYgKGltYWdlcy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnN1cHByZXNzQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93KGRlbHRhWCA8IDBcbiAgICAgICAgICAgICAgICA/ICh0aGlzLmFjdGl2ZUluZGV4ICsgMSkgJSBpbWFnZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgOiAodGhpcy5hY3RpdmVJbmRleCAtIDEgKyBpbWFnZXMubGVuZ3RoKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnN1cHByZXNzQ2xpY2sgPSBmYWxzZTsgfSwgMzUwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcHJlc3NDbGljaykgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFbJ0Fycm93TGVmdCcsICdBcnJvd1JpZ2h0JywgJ0hvbWUnLCAnRW5kJ10uaW5jbHVkZXMoZXZlbnQua2V5KSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5pbWFnZXMoKTtcbiAgICAgICAgICAgIGlmIChpbWFnZXMubGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdIb21lJykgdGhpcy5zaG93KDApO1xuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnRW5kJykgdGhpcy5zaG93KGltYWdlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHRoaXMuc2hvdygodGhpcy5hY3RpdmVJbmRleCAtIDEgKyBpbWFnZXMubGVuZ3RoKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnNob3coKHRoaXMuYWN0aXZlSW5kZXggKyAxKSAlIGltYWdlcy5sZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6aG92ZXItZ2FsbGVyeS1yZWZyZXNoJywgKCkgPT4gdGhpcy5zaG93KDApKTtcbiAgICAgICAgdGhpcy5zaG93KDApO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvZHVjdE9wdGlvbmFsQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihidXR0b24pIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMudHlwZSA9IGJ1dHRvbi5kYXRhc2V0LnJtUHJvZHVjdEFjdGlvbjtcbiAgICAgICAgdGhpcy5yZXRyeUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5yZXRyeVRpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdmlkZXIoKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMudHlwZSA9PT0gJ2Zhdm9yaXRlJyA/IHdpbmRvdy5SYWRpY2FsTWFydEZhdm9yaXRlcyA6IHdpbmRvdy5SYWRpY2FsTWFydENvbXBhcmU7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cnkgeyByZXR1cm4gc291cmNlKCk7IH0gY2F0Y2ggKGVycm9yKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvdXJjZSB8fCBudWxsO1xuICAgIH1cblxuICAgIHN1cHBvcnRlZChwcm92aWRlcikge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwcm92aWRlciAmJiAodHlwZW9mIHByb3ZpZGVyLnRvZ2dsZVByb2R1Y3QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHByb3ZpZGVyLnRvZ2dsZSA9PT0gJ2Z1bmN0aW9uJykpO1xuICAgIH1cblxuICAgIGlzQnVpbGRlclByZXZpZXcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZU5hbWUgPSB3aW5kb3cuZnJhbWVFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCAnJztcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cgJiYgL15wcmV2aWV3KD86LXwkKS8udGVzdChmcmFtZU5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QXZhaWxhYmlsaXR5KHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBwcmV2aWV3RmFsbGJhY2sgPSAhc3VwcG9ydGVkICYmIHRoaXMuaXNCdWlsZGVyUHJldmlldygpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5oaWRkZW4gPSAhc3VwcG9ydGVkICYmICFwcmV2aWV3RmFsbGJhY2s7XG4gICAgICAgIHRoaXMuYnV0dG9uLmRpc2FibGVkID0gcHJldmlld0ZhbGxiYWNrO1xuICAgICAgICB0aGlzLmJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdybS1wcm9kdWN0LWFjdGlvbi0tdW5hdmFpbGFibGUnLCBwcmV2aWV3RmFsbGJhY2spO1xuICAgICAgICBpZiAocHJldmlld0ZhbGxiYWNrKSB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICBlbHNlIHRoaXMuYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGFjdGl2ZShwcm92aWRlciwgcHJvZHVjdElkKSB7XG4gICAgICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIFsnaGFzUHJvZHVjdCcsICdjb250YWlucycsICdpc0FjdGl2ZScsICdoYXMnXSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlcj8uW21ldGhvZF0gIT09ICdmdW5jdGlvbicpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3ZpZGVyW21ldGhvZF0ocHJvZHVjdElkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgPyBudWxsIDogQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3ZpZGVyPy5wcm9kdWN0cykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5wcm9kdWN0cy5zb21lKChpdGVtKSA9PiBOdW1iZXIoaXRlbT8uaWQgPz8gaXRlbSkgPT09IHByb2R1Y3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlKGFjdGl2ZSkge1xuICAgICAgICBjb25zdCBlbmFibGVkID0gQm9vbGVhbihhY3RpdmUpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGVuYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgncm0tcHJvZHVjdC1hY3Rpb24tLWFjdGl2ZScsIGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5wcm92aWRlcigpO1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGlzLnN1cHBvcnRlZChwcm92aWRlcik7XG4gICAgICAgIHRoaXMuc2V0QXZhaWxhYmlsaXR5KHN1cHBvcnRlZCk7XG4gICAgICAgIGlmICghc3VwcG9ydGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuYWN0aXZlKHByb3ZpZGVyLCBOdW1iZXIodGhpcy5idXR0b24uZGF0YXNldC5wcm9kdWN0SWQpKTtcbiAgICAgICAgaWYgKGFjdGl2ZSAhPT0gbnVsbCkgdGhpcy5zZXRBY3RpdmUoYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0cnlQcm92aWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaCgpIHx8IHRoaXMucmV0cnlDb3VudCA+PSAyMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJldHJ5Q291bnQgKz0gMTtcbiAgICAgICAgdGhpcy5yZXRyeVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXRyeVByb3ZpZGVyKCksIDI1MCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uLmRhdGFzZXQucm1Qcm9kdWN0QWN0aW9uUmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5idXR0b24uZGF0YXNldC5ybVByb2R1Y3RBY3Rpb25SZWFkeSA9ICd0cnVlJztcbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDpwcm9kdWN0LWFjdGlvbi1yZWZyZXNoJywgdGhpcy5yZWZyZXNoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6cHJvdmlkZXItcmVhZHknLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGByYWRpY2FsbWFydDoke3RoaXMudHlwZX0tcmVhZHlgLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnZmF2b3JpdGUnKSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDpmYXZvcml0ZXMtcmVhZHknLCB0aGlzLnJlZnJlc2gpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMucmVmcmVzaCwge29uY2U6IHRydWV9KTtcbiAgICAgICAgdGhpcy5yZXRyeVByb3ZpZGVyKCk7XG5cbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IE51bWJlcih0aGlzLmJ1dHRvbi5kYXRhc2V0LnByb2R1Y3RJZCk7XG4gICAgICAgICAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnByb3ZpZGVyKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydGVkKGFwaSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJykgPT09ICd0cnVlJztcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlKCFwcmV2aW91cyk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0eXBlb2YgYXBpLnRvZ2dsZVByb2R1Y3QgPT09ICdmdW5jdGlvbicgPyBhcGkudG9nZ2xlUHJvZHVjdChpZCkgOiBhcGkudG9nZ2xlKGlkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUocHJldmlvdXMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuYWN0aXZlKGFwaSwgaWQpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUgIT09IG51bGwpIHRoaXMuc2V0QWN0aXZlKGFjdGl2ZSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB0aGlzLnNldEFjdGl2ZShwcmV2aW91cykpO1xuICAgICAgICAgICAgdGhpcy5idXR0b24uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoYHJhZGljYWxtYXJ0OiR7dGhpcy50eXBlfS10b2dnbGVgLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0SWQ6IGlkLCBhY3RpdmU6ICFwcmV2aW91c31cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBQcm9kdWN0Q2FyZERyb3Bkb3duIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmREcm9wZG93blJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmREcm9wZG93blJlYWR5ID0gJ3RydWUnO1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50LmRhdGFzZXQuZGlzcGxheU1vZGUgIT09ICdob3ZlcicpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKTtcbiAgICAgICAgY29uc3Qgb3duZXIgPSBzb3VyY2VcbiAgICAgICAgICAgID8gcmVzb2x2ZVByb2R1Y3RTY29wZShzb3VyY2UpXG4gICAgICAgICAgICA6IHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50Py5jbG9zZXN0KCcuZWwtaXRlbSwgLnVrLWNhcmQsIC5ybS1wcm9kdWN0LWNhcmQnKTtcbiAgICAgICAgaWYgKCFvd25lciB8fCBvd25lciA9PT0gdGhpcy5lbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgb3duZXIuY2xhc3NMaXN0LmFkZCgncm0tcHJvZHVjdC1jYXJkLS1ob3ZlcicpO1xuICAgICAgICBvd25lci5kYXRhc2V0LnJtSG92ZXJCcmVha3BvaW50ID0gdGhpcy5lbGVtZW50LmRhdGFzZXQuaG92ZXJCcmVha3BvaW50IHx8ICdtJztcbiAgICAgICAgY29uc3QgdmlzaWJsZUZvY3VzYWJsZSA9IEFycmF5LmZyb20ob3duZXIucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKVxuICAgICAgICAgICAgLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50LmNvbnRhaW5zKG5vZGUpIHx8IG5vZGUuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnLTEnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2xvc2VzdCgnW2hpZGRlbl0sIFtpbmVydF0sIFthcmlhLWhpZGRlbj1cInRydWVcIl0nKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlLmRpc3BsYXkgIT09ICdub25lJyAmJiBzdHlsZS52aXNpYmlsaXR5ICE9PSAnaGlkZGVuJyAmJiBub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIXZpc2libGVGb2N1c2FibGUgJiYgIW93bmVyLm1hdGNoZXMoJ2FbaHJlZl0sIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF0nKSkge1xuICAgICAgICAgICAgb3duZXIudGFiSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBQcm9kdWN0Q2FyZFBvc2l0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmRQb3NpdGlvblJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuZWxlbWVudC5kYXRhc2V0LnJtUHJvZHVjdENhcmRQb3NpdGlvblJlYWR5ID0gJ3RydWUnO1xuXG4gICAgICAgIGNvbnN0IG93bmVyID0gdGhpcy5lbGVtZW50LmNsb3Nlc3QoJy5ybS1wcm9kdWN0LWNhcmQsIFtkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgIGlmICghb3duZXIgfHwgb3duZXIgPT09IHRoaXMuZWxlbWVudCkgcmV0dXJuO1xuICAgICAgICBvd25lci5jbGFzc0xpc3QuYWRkKCdybS1wcm9kdWN0LWNhcmQtLXBvc2l0aW9uZWQnKTtcblxuICAgICAgICBpZiAoIVsnaW50ZXJhY3Rpb24nLCAnZm9jdXMnXS5pbmNsdWRlcyh0aGlzLmVsZW1lbnQuZGF0YXNldC52aXNpYmlsaXR5TW9kZSkpIHJldHVybjtcbiAgICAgICAgY29uc3QgdmlzaWJsZUZvY3VzYWJsZSA9IEFycmF5LmZyb20ob3duZXIucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKVxuICAgICAgICAgICAgLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG5vZGUuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1jYXJkLXBvc2l0aW9uXScpO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiAmJiBwb3NpdGlvbi5kYXRhc2V0LnZpc2liaWxpdHlNb2RlICE9PSAnYWx3YXlzJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fCBub2RlLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gJy0xJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmNsb3Nlc3QoJ1toaWRkZW5dLCBbaW5lcnRdLCBbYXJpYS1oaWRkZW49XCJ0cnVlXCJdJykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgc3R5bGUudmlzaWJpbGl0eSAhPT0gJ2hpZGRlbicgJiYgbm9kZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF2aXNpYmxlRm9jdXNhYmxlICYmICFvd25lci5tYXRjaGVzKCdhW2hyZWZdLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdJykpIHtcbiAgICAgICAgICAgIG93bmVyLnRhYkluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVmFyaWFudFBpY2tlciB7XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyLCBkYXRhID0gbnVsbCwgb25Qcm9kdWN0ID0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YSB8fCB0aGlzLnJlYWREYXRhKCk7XG4gICAgICAgIHRoaXMub25Qcm9kdWN0ID0gb25Qcm9kdWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0ge307XG4gICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG5cdFx0dGhpcy5oYW5kbGVQb3BTdGF0ZSA9IHRoaXMuaGFuZGxlUG9wU3RhdGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnZpc2libGVGaWVsZHMgPSBuZXcgU2V0KCh0aGlzLmRhdGE/LmZpZWxkcyB8fCBbXSkubWFwKChmaWVsZCkgPT4gU3RyaW5nKGZpZWxkLmFsaWFzKSkpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmRhdGE/LnByb2R1Y3RzPy5maW5kKChwcm9kdWN0KSA9PiBOdW1iZXIocHJvZHVjdC5pZCkgPT09IE51bWJlcih0aGlzLmRhdGEuY3VycmVudFByb2R1Y3QpKTtcblx0XHRpZiAoY3VycmVudCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMudmlzaWJsZVNlbGVjdGlvbihjdXJyZW50LmZpZWxkcyk7XG5cdFx0fVxuICAgIH1cblxuXHR2aXNpYmxlU2VsZWN0aW9uKGZpZWxkcyA9IHt9KSB7XG5cdFx0cmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRcdE9iamVjdC5lbnRyaWVzKGZpZWxkcykuZmlsdGVyKChbYWxpYXNdKSA9PiB0aGlzLnZpc2libGVGaWVsZHMuaGFzKFN0cmluZyhhbGlhcykpKVxuXHRcdCk7XG5cdH1cblxuICAgIHJlYWREYXRhKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtdmFyaWFudHNfX2RhdGEnKT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhPy5maWVsZHM/Lmxlbmd0aCB8fCAhdGhpcy5kYXRhPy5wcm9kdWN0cz8ubGVuZ3RoIHx8IHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1WYXJpYW50c1JlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRhdGFzZXQucm1WYXJpYW50c1JlYWR5ID0gJ3RydWUnO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tdmFsdWVdJyk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbiB8fCBvcHRpb24uZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gb3B0aW9uLmNsb3Nlc3QoJ1tkYXRhLXJtLWZpZWxkXScpO1xuICAgICAgICAgICAgaWYgKGZpZWxkKSB0aGlzLnNlbGVjdChmaWVsZC5kYXRhc2V0LnJtRmllbGQsIG9wdGlvbi5kYXRhc2V0LnJtVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJtdmFyaWFudHNfX3NlbGVjdCcpO1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBzZWxlY3Q/LmNsb3Nlc3QoJ1tkYXRhLXJtLWZpZWxkXScpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiBmaWVsZCkgdGhpcy5zZWxlY3QoZmllbGQuZGF0YXNldC5ybUZpZWxkLCBzZWxlY3QudmFsdWUpO1xuICAgICAgICB9KTtcblxuXHRcdHRoaXMucmVuZGVyU3RhdGUoKTtcblx0XHR0aGlzLmluaXRIaXN0b3J5KCk7XG4gICAgfVxuXG5cdGluaXRIaXN0b3J5KCkge1xuXHRcdGlmICghWydyZXBsYWNlJywgJ3B1c2gnXS5pbmNsdWRlcyh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybClcblx0XHRcdHx8IHR5cGVvZiB3aW5kb3cuaGlzdG9yeT8ucmVwbGFjZVN0YXRlICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XG5cblx0XHRjb25zdCBjdXJyZW50SWQgPSBOdW1iZXIodGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0KTtcblx0XHRpZiAoY3VycmVudElkICYmICFOdW1iZXIod2luZG93Lmhpc3Rvcnkuc3RhdGU/LnJtUHJvZHVjdElkKSkge1xuXHRcdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsuLi53aW5kb3cuaGlzdG9yeS5zdGF0ZSwgcm1Qcm9kdWN0SWQ6IGN1cnJlbnRJZH0sICcnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybCA9PT0gJ3B1c2gnKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhhbmRsZVBvcFN0YXRlKTtcblx0XHR9XG5cdH1cblxuXHRoYW5kbGVQb3BTdGF0ZShldmVudCkge1xuXHRcdGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybCAhPT0gJ3B1c2gnKSByZXR1cm47XG5cdFx0bGV0IGlkID0gTnVtYmVyKGV2ZW50LnN0YXRlPy5ybVByb2R1Y3RJZCk7XG5cdFx0aWYgKCFpZCkge1xuXHRcdFx0Y29uc3QgY3VycmVudFVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuZGF0YS5wcm9kdWN0cy5maW5kKChwcm9kdWN0KSA9PiB7XG5cdFx0XHRcdGlmICghcHJvZHVjdC5saW5rKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGNvbnN0IGxpbmsgPSBuZXcgVVJMKHByb2R1Y3QubGluaywgZG9jdW1lbnQuYmFzZVVSSSk7XG5cdFx0XHRcdHJldHVybiBsaW5rLnBhdGhuYW1lID09PSBjdXJyZW50VXJsLnBhdGhuYW1lICYmIGxpbmsuc2VhcmNoID09PSBjdXJyZW50VXJsLnNlYXJjaDtcblx0XHRcdH0pO1xuXHRcdFx0aWQgPSBOdW1iZXIoaXRlbT8uaWQpO1xuXHRcdH1cblx0XHRjb25zdCBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IE51bWJlcihpdGVtLmlkKSA9PT0gaWQpO1xuXHRcdGlmICghcHJvZHVjdCB8fCBOdW1iZXIodGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0KSA9PT0gaWQpIHJldHVybjtcblxuXHRcdHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZpc2libGVTZWxlY3Rpb24ocHJvZHVjdC5maWVsZHMpO1xuXHRcdHRoaXMuZGF0YS5jdXJyZW50UHJvZHVjdCA9IGlkO1xuXHRcdHRoaXMucmVuZGVyU3RhdGUoKTtcblx0XHR0aGlzLmxvYWRQcm9kdWN0KHByb2R1Y3QsIGZhbHNlKTtcblx0fVxuXG4gICAgc2VsZWN0KGFsaWFzLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB3YW50ZWQgPSB7Li4udGhpcy5zZWxlY3RlZCwgW2FsaWFzXTogU3RyaW5nKHZhbHVlKX07XG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IHRoaXMubWF0Y2hlcyhpdGVtLCB3YW50ZWQpKTtcblxuICAgICAgICAvLyBTcGFyc2UgdmFyaWF0aW9uIG1hdHJpY2VzIGFyZSBjb21tb24uIElmIHRoZSBleGFjdCBjb21iaW5hdGlvbiBkb2VzXG4gICAgICAgIC8vIG5vdCBleGlzdCwgbW92ZSB0byB0aGUgZmlyc3QgcmVhbCBwcm9kdWN0IGNvbnRhaW5pbmcgdGhlIGNoYW5nZWQgdmFsdWUuXG4gICAgICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgICAgICAgcHJvZHVjdCA9IHRoaXMuZGF0YS5wcm9kdWN0cy5maW5kKChpdGVtKSA9PiBTdHJpbmcoaXRlbS5maWVsZHNbYWxpYXNdKSA9PT0gU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9kdWN0KSByZXR1cm47XG5cblx0XHR0aGlzLnNlbGVjdGVkID0gdGhpcy52aXNpYmxlU2VsZWN0aW9uKHByb2R1Y3QuZmllbGRzKTtcbiAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0ID0gTnVtYmVyKHByb2R1Y3QuaWQpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQuYWN0aW9uID09PSAnbmF2aWdhdGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHByb2R1Y3QubGluayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0KHByb2R1Y3QpO1xuICAgIH1cblxuICAgIG1hdGNoZXMocHJvZHVjdCwgc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzZWxlY3Rpb24pLmV2ZXJ5KChbYWxpYXMsIHZhbHVlXSkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2FsaWFzXSkgPT09IFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCBkaXNhYmxlVW5hdmFpbGFibGUgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmRpc2FibGVVbmF2YWlsYWJsZSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgdGhpcy5kYXRhLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJtLWZpZWxkPVwiJHtDU1MuZXNjYXBlKGZpZWxkLmFsaWFzKX1cIl1gKTtcbiAgICAgICAgICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXZhbHVlXScpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IFN0cmluZyhvcHRpb24uZGF0YXNldC5ybVZhbHVlKSA9PT0gU3RyaW5nKHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhdmFpbGFibGUgPSB0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24uZGF0YXNldC5ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBhY3RpdmUgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgncm12YXJpYW50c19fb3B0aW9uLS1hY3RpdmUnLCBhY3RpdmUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kaXNhYmxlZCA9IGRpc2FibGVVbmF2YWlsYWJsZSAmJiAhYXZhaWxhYmxlO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBvcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19zZWxlY3QnKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSB0aGlzLnNlbGVjdGVkW2ZpZWxkLmFsaWFzXSA/PyAnJztcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gZGlzYWJsZVVuYXZhaWxhYmxlICYmICF0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHRjb25zdCBzZWxlY3RlZExhYmVsID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1zZWxlY3RlZC1sYWJlbF0nKTtcblx0XHRcdGlmIChzZWxlY3RlZExhYmVsKSB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gU3RyaW5nKHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdID8/ICcnKTtcblx0XHRcdFx0Y29uc3Qgb3B0aW9uID0gZmllbGQub3B0aW9ucy5maW5kKChpdGVtKSA9PiBTdHJpbmcoaXRlbS52YWx1ZSkgPT09IHZhbHVlKTtcblx0XHRcdFx0c2VsZWN0ZWRMYWJlbC50ZXh0Q29udGVudCA9IG9wdGlvbj8ubGFiZWwgPyBgIMK3ICR7b3B0aW9uLmxhYmVsfWAgOiAnJztcblx0XHRcdH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNBdmFpbGFibGUoYWxpYXMsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG90aGVyRmllbGRzID0gT2JqZWN0LmVudHJpZXModGhpcy5zZWxlY3RlZCkuZmlsdGVyKChba2V5XSkgPT4ga2V5ICE9PSBhbGlhcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucHJvZHVjdHMuc29tZSgocHJvZHVjdCkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2FsaWFzXSkgPT09IFN0cmluZyh2YWx1ZSlcbiAgICAgICAgICAgICYmIG90aGVyRmllbGRzLmV2ZXJ5KChba2V5LCBzZWxlY3RlZF0pID0+IFN0cmluZyhwcm9kdWN0LmZpZWxkc1trZXldKSA9PT0gU3RyaW5nKHNlbGVjdGVkKSkpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRQcm9kdWN0KHByb2R1Y3QsIHVwZGF0ZUhpc3RvcnkgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19zdGF0dXMnKTtcbiAgICAgICAgY29uc3QgbG9hZGluZyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWxhYmVsLWxvYWRpbmddJyk/LnRleHRDb250ZW50IHx8ICdMb2FkaW5n4oCmJztcbiAgICAgICAgY29uc3QgcHJvZHVjdFNjb3BlID0gdGhpcy5jb250YWluZXIuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKTtcbiAgICAgICAgaWYgKHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gbG9hZGluZztcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgncm12YXJpYW50cy0tbG9hZGluZycpO1xuXHRcdHByb2R1Y3RTY29wZT8uY2xhc3NMaXN0LmFkZCgncm0tcHJvZHVjdC0tbG9hZGluZycpO1xuXHRcdHByb2R1Y3RTY29wZT8uc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCAndHJ1ZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmcpIHRoaXMucGVuZGluZy5hYm9ydCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBlbmRpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGwgPSBhd2FpdCByZXF1ZXN0UHJvZHVjdCh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmVuZHBvaW50LCAndmFyaWFudCcsIHByb2R1Y3QuaWQsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQcm9kdWN0KGZ1bGwsIHVwZGF0ZUhpc3RvcnkpO1xuICAgICAgICAgICAgaWYgKHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InICYmIHN0YXR1cykgc3RhdHVzLnRleHRDb250ZW50ID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdybXZhcmlhbnRzLS1sb2FkaW5nJyk7XG5cdFx0XHRcdHByb2R1Y3RTY29wZT8uY2xhc3NMaXN0LnJlbW92ZSgncm0tcHJvZHVjdC0tbG9hZGluZycpO1xuXHRcdFx0XHRwcm9kdWN0U2NvcGU/LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1idXN5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UHJvZHVjdChwcm9kdWN0LCB1cGRhdGVIaXN0b3J5ID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25Qcm9kdWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uUHJvZHVjdChwcm9kdWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgICAgICBjb25zdCBzY29wZSA9IHNvdXJjZVxuXHRcdFx0XHQ/IHJlc29sdmVQcm9kdWN0U2NvcGUoc291cmNlKVxuXHRcdFx0XHQ6IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ/LmNsb3Nlc3QoJy5lbC1pdGVtLCAudWstY2FyZCwgLnJtLXByb2R1Y3QtY2FyZCcpIHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbCgnW3JhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNhcnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FydC5kYXRhc2V0LmlkID0gcHJvZHVjdC5pZDtcbiAgICAgICAgICAgICAgICAgICAgY2FydC5kYXRhc2V0LnJtRHluYW1pY1Byb2R1Y3QgPSAndHJ1ZSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmxNb2RlID0gdGhpcy5jb250YWluZXIuZGF0YXNldC51cGRhdGVVcmw7XG4gICAgICAgIGNvbnN0IGhpc3RvcnlNZXRob2QgPSB1cmxNb2RlID09PSAncHVzaCcgPyAncHVzaFN0YXRlJyA6IHVybE1vZGUgPT09ICdyZXBsYWNlJyA/ICdyZXBsYWNlU3RhdGUnIDogbnVsbDtcbiAgICAgICAgaWYgKHVwZGF0ZUhpc3RvcnkgJiYgaGlzdG9yeU1ldGhvZCAmJiBwcm9kdWN0LmxpbmsgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5Py5baGlzdG9yeU1ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5W2hpc3RvcnlNZXRob2RdKHsuLi53aW5kb3cuaGlzdG9yeS5zdGF0ZSwgcm1Qcm9kdWN0SWQ6IHByb2R1Y3QuaWR9LCAnJywgcHJvZHVjdC5saW5rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IHtwcm9kdWN0fVxuICAgICAgICB9KSk7XG4gICAgfVxufVxuXG5jbGFzcyBRdWlja1ZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBudWxsO1xuXHRcdHRoaXMuYnVpbGRlckNvbnRleHQgPSBudWxsO1xuXHRcdHRoaXMubW9kYWxDbGFzc2VzID0gW107XG4gICAgfVxuXG4gICAgYXN5bmMgb3Blbih0cmlnZ2VyKSB7XG4gICAgICAgIGNvbnN0IGlkID0gTnVtYmVyKHRyaWdnZXIuZGF0YXNldC5ybVF1aWNrVmlldyk7XG4gICAgICAgIGlmICghaWQpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBKU09OLnBhcnNlKHRyaWdnZXIuZGF0YXNldC5zZXR0aW5ncyB8fCAne30nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlTW9kYWwoKTtcblx0XHRjb25zdCByb290ID0gdHJpZ2dlci5jbG9zZXN0KCdbZGF0YS1ybS1xdWljay12aWV3LXJvb3RdJyk7XG5cdFx0Y29uc3QgZGlhbG9nID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2RpYWxvZycpO1xuXHRcdGNvbnN0IGxhYmVsID0gcm9vdD8uZGF0YXNldC5ybVF1aWNrVmlld0xhYmVsIHx8IHRyaWdnZXIudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0XHR8fCB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVSUNLX1ZJRVcnLCBsYWJlbHMucXVpY2tWaWV3KTtcblx0XHR0aGlzLm1vZGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsKTtcblx0XHRpZiAoZGlhbG9nKSBkaWFsb2cuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuXHRcdGlmIChyb290Py5kYXRhc2V0LmlkKSB0aGlzLm1vZGFsLmRhdGFzZXQuaWQgPSByb290LmRhdGFzZXQuaWQ7XG5cdFx0ZWxzZSBkZWxldGUgdGhpcy5tb2RhbC5kYXRhc2V0LmlkO1xuICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICB0aGlzLnNldExvYWRpbmcoKTtcblx0XHR0aGlzLmJ1aWxkZXJDb250ZXh0ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wZW5kaW5nO1xuXG4gICAgICAgIHRyeSB7XG5cdFx0XHRpZiAodHJpZ2dlci5kYXRhc2V0LmNvbnRlbnRNb2RlID09PSAnYnVpbGRlcicgJiYgdHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQpIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0gYCR7dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50fTpsYXlvdXQ6JHt0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZH06JHtpZH1gO1xuXHRcdFx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG5cdFx0XHRcdFx0PyBjbG9uZSh0aGlzLmNhY2hlLmdldChrZXkpKVxuXHRcdFx0XHRcdDogYXdhaXQgcmVxdWVzdFF1aWNrVmlld0xheW91dChcblx0XHRcdFx0XHRcdHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCxcblx0XHRcdFx0XHRcdGlkLFxuXHRcdFx0XHRcdFx0dHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQsXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyLnNpZ25hbFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuY2FjaGUuc2V0KGtleSwgY2xvbmUobGF5b3V0KSk7XG5cdFx0XHRcdHRoaXMucHJvZHVjdCA9IG51bGw7XG5cdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyQnVpbGRlckNvbnRlbnQobGF5b3V0Lmh0bWwsIHtcblx0XHRcdFx0XHRlbmRwb2ludDogdHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50LFxuXHRcdFx0XHRcdHRlbXBsYXRlSWQ6IHRyaWdnZXIuZGF0YXNldC50ZW1wbGF0ZUlkLFxuXHRcdFx0XHRcdHByb2R1Y3RJZDogaWRcblx0XHRcdFx0fSwgbGF5b3V0LmFzc2V0cyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50fToke2lkfWA7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5jYWNoZS5oYXMoa2V5KVxuICAgICAgICAgICAgICAgID8gY2xvbmUodGhpcy5jYWNoZS5nZXQoa2V5KSlcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHJlcXVlc3RQcm9kdWN0KHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCwgJ3F1aWNrVmlldycsIGlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChrZXksIGNsb25lKHByb2R1Y3QpKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdCA9IHByb2R1Y3Q7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcihwcm9kdWN0LCB0cmlnZ2VyLmRhdGFzZXQuZW5kcG9pbnQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09ICdBYm9ydEVycm9yJykgdGhpcy5yZW5kZXJFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IGNvbnRyb2xsZXIpIHRoaXMucGVuZGluZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbnN1cmVNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHJldHVybjtcbiAgICAgICAgdGhpcy5tb2RhbCA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlldyB1ay1tb2RhbCcsIHtcbiAgICAgICAgICAgICd1ay1tb2RhbCc6IHRydWUsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVJQ0tfVklFVycsIGxhYmVscy5xdWlja1ZpZXcpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1vZGFsLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwicm1xdWlja3ZpZXdfX2RpYWxvZyB1ay1tb2RhbC1kaWFsb2dcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsPVwiJHt0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVSUNLX1ZJRVcnLCBsYWJlbHMucXVpY2tWaWV3KX1cIj48YnV0dG9uIGNsYXNzPVwicm1xdWlja3ZpZXdfX2Nsb3NlIHVrLW1vZGFsLWNsb3NlLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgdWstY2xvc2UgYXJpYS1sYWJlbD1cIiR7dHJhbnNsYXRlKCdKTElCX0hUTUxfQkVIQVZJT1JfQ0xPU0UnLCAnQ2xvc2UnKX1cIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwicm1xdWlja3ZpZXdfX2JvZHkgdWstbW9kYWwtYm9keVwiPjwvZGl2PjwvZGl2PmA7XG5cdFx0dGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8ucHJvZHVjdD8uaWQpO1xuXHRcdFx0aWYgKHRoaXMuYnVpbGRlckNvbnRleHQgJiYgcHJvZHVjdElkKSB0aGlzLmxvYWRCdWlsZGVyUHJvZHVjdChwcm9kdWN0SWQpO1xuXHRcdH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLm1vZGFsQ2xhc3Nlcyk7XG5cdFx0dGhpcy5tb2RhbENsYXNzZXMgPSBTdHJpbmcodGhpcy5zZXR0aW5ncy5tb2RhbENsYXNzIHx8ICcnKS5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKTtcblx0XHR0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5tb2RhbENsYXNzZXMpO1xuICAgICAgICBjb25zdCBtb2RhbFNpemUgPSBbJycsICdzbWFsbCcsICdsYXJnZScsICd4bGFyZ2UnLCAnY29udGFpbmVyJywgJ2Z1bGwnXS5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLm1vZGFsU2l6ZSlcbiAgICAgICAgICAgID8gdGhpcy5zZXR0aW5ncy5tb2RhbFNpemUgOiAnY29udGFpbmVyJztcbiAgICAgICAgY29uc3QgY2VudGVyID0gdGhpcy5zZXR0aW5ncy5tb2RhbENlbnRlciAhPT0gZmFsc2UgJiYgbW9kYWxTaXplICE9PSAnZnVsbCc7XG4gICAgICAgIGNvbnN0IGJnQ2xvc2UgPSB0aGlzLnNldHRpbmdzLmJnQ2xvc2UgIT09IGZhbHNlO1xuICAgICAgICBjb25zdCBlc2NDbG9zZSA9IHRoaXMuc2V0dGluZ3MuZXNjQ2xvc2UgIT09IGZhbHNlO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBjb25zdCBjbG9zZSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19jbG9zZScpO1xuICAgICAgICBjb25zdCBjb250ZW50UGFkZGluZyA9IFsnbm9uZScsICdzbWFsbCcsICdkZWZhdWx0JywgJ2xhcmdlJ10uaW5jbHVkZXModGhpcy5zZXR0aW5ncy5jb250ZW50UGFkZGluZylcbiAgICAgICAgICAgID8gdGhpcy5zZXR0aW5ncy5jb250ZW50UGFkZGluZyA6ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWNvbnRhaW5lcicsIG1vZGFsU2l6ZSA9PT0gJ2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWZ1bGwnLCBtb2RhbFNpemUgPT09ICdmdWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgndWstZmxleC10b3AnLCBjZW50ZXIpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3LS1zbWFsbCcsIG1vZGFsU2l6ZSA9PT0gJ3NtYWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXctLWxhcmdlJywgbW9kYWxTaXplID09PSAnbGFyZ2UnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlldy0teGxhcmdlJywgbW9kYWxTaXplID09PSAneGxhcmdlJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXctLW1vYmlsZS1mdWxsJywgdGhpcy5zZXR0aW5ncy5tb2JpbGVGdWxsc2NyZWVuICE9PSBmYWxzZSB8fCBtb2RhbFNpemUgPT09ICdmdWxsJyk7XG4gICAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCd1ay1tb2RhbCcsIGBiZy1jbG9zZTogJHtiZ0Nsb3NlfTsgZXNjLWNsb3NlOiAke2VzY0Nsb3NlfWApO1xuXG4gICAgICAgIGRpYWxvZz8uY2xhc3NMaXN0LnRvZ2dsZSgndWstbWFyZ2luLWF1dG8tdmVydGljYWwnLCBjZW50ZXIpO1xuICAgICAgICBib2R5Py5jbGFzc0xpc3QudG9nZ2xlKCd1ay1vdmVyZmxvdy1hdXRvJywgdGhpcy5zZXR0aW5ncy5vdmVyZmxvd0F1dG8gPT09IHRydWUpO1xuICAgICAgICBbJ25vbmUnLCAnc21hbGwnLCAnZGVmYXVsdCcsICdsYXJnZSddLmZvckVhY2goKHBhZGRpbmcpID0+IHtcbiAgICAgICAgICAgIGJvZHk/LmNsYXNzTGlzdC50b2dnbGUoYHJtcXVpY2t2aWV3X19ib2R5LS1wYWRkaW5nLSR7cGFkZGluZ31gLCBwYWRkaW5nID09PSBjb250ZW50UGFkZGluZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2xvc2UpIHtcbiAgICAgICAgICAgIGNsb3NlLmhpZGRlbiA9IHRoaXMuc2V0dGluZ3Muc2hvd0Nsb3NlID09PSBmYWxzZTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLWNsb3NlLWxhcmdlJywgdGhpcy5zZXR0aW5ncy5jbG9zZUxhcmdlID09PSB0cnVlIHx8IG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnKTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWNsb3NlLWRlZmF1bHQnLCBtb2RhbFNpemUgIT09ICdmdWxsJyk7XG4gICAgICAgICAgICBjbG9zZS5jbGFzc0xpc3QudG9nZ2xlKCd1ay1tb2RhbC1jbG9zZS1mdWxsJywgbW9kYWxTaXplID09PSAnZnVsbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5VSWtpdD8ubW9kYWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHdpbmRvdy5VSWtpdC5tb2RhbCh0aGlzLm1vZGFsKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQ/LiRwcm9wcykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC4kcHJvcHMuYmdDbG9zZSA9IGJnQ2xvc2U7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LiRwcm9wcy5lc2NDbG9zZSA9IGVzY0Nsb3NlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50LnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgndWstb3BlbicpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExvYWRpbmcoKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBib2R5LnJlcGxhY2VDaGlsZHJlbihlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2xvYWRlcicsIHsndWstc3Bpbm5lcic6ICdyYXRpbzogMS41J30pKTtcbiAgICB9XG5cbiAgICByZW5kZXJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGFsZXJ0ID0gZWxlbWVudCgnZGl2JywgJ3VrLWFsZXJ0LWRhbmdlcicsIHsndWstYWxlcnQnOiB0cnVlfSk7XG4gICAgICAgIGFsZXJ0LmFwcGVuZCh0ZXh0KG1lc3NhZ2UgfHwgdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19FUlJPUl9MT0FEX1BST0RVQ1QnLCBsYWJlbHMuZXJyb3IpKSk7XG4gICAgICAgIHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5JykucmVwbGFjZUNoaWxkcmVuKGFsZXJ0KTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXJCdWlsZGVyQ29udGVudChodG1sLCBjb250ZXh0ID0gdGhpcy5idWlsZGVyQ29udGV4dCwgYXNzZXRzID0ge30pIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG5cdFx0aWYgKGFzc2V0cy5vcHRpb25zICYmIHdpbmRvdy5Kb29tbGE/LmxvYWRPcHRpb25zKSB7XG5cdFx0XHR3aW5kb3cuSm9vbWxhLmxvYWRPcHRpb25zKGFzc2V0cy5vcHRpb25zKTtcblx0XHR9XG5cdFx0YXdhaXQgbG9hZEFzc2V0cyhhc3NldHMsICdzdHlsZScpO1xuXHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCk7XG5cdFx0Ly8gQSBRdWljayBWaWV3IGlzIGFuIGlzb2xhdGVkIHByb2R1Y3Qgc3VyZmFjZS4gSXRzIHZhcmlhbnQgY29udHJvbHMgbWF5XG5cdFx0Ly8gcmUtcmVuZGVyIHRoZSBtb2RhbCwgYnV0IG11c3QgbmV2ZXIgcmVwbGFjZSB0aGUgbGlzdGluZyBVUkwgb3IgdGhlXG5cdFx0Ly8gbGlzdGluZyBkb2N1bWVudCdzIFNFTyBtZXRhZGF0YS5cblx0XHRmcmFnbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS12YXJpYW50c10nKS5mb3JFYWNoKChzZWxlY3RvcikgPT4ge1xuXHRcdFx0c2VsZWN0b3IuZGF0YXNldC51cGRhdGVVcmwgPSAnbm9uZSc7XG5cdFx0fSk7XG5cdFx0ZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tcHJvZHVjdC1wYWdlXScpLmZvckVhY2goKHNjb3BlKSA9PiB7XG5cdFx0XHRzY29wZS5kYXRhc2V0LnVwZGF0ZURvY3VtZW50VGl0bGUgPSAnZmFsc2UnO1xuXHRcdFx0c2NvcGUuZGF0YXNldC51cGRhdGVEb2N1bWVudE1ldGFkYXRhID0gJ2ZhbHNlJztcblx0XHR9KTtcblx0XHRib2R5LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG5cdFx0dGhpcy5idWlsZGVyQ29udGV4dCA9IGNvbnRleHQ7XG5cdFx0YXdhaXQgbG9hZEFzc2V0cyhhc3NldHMsICdzY3JpcHQnKTtcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5SYWRpY2FsTWFydENhcnQgPT09ICdmdW5jdGlvbicpIGVuc3VyZVJhZGljYWxNYXJ0RGlzcGxheSgpO1xuICAgICAgICBpZiAod2luZG93LlVJa2l0Py51cGRhdGUpIHdpbmRvdy5VSWtpdC51cGRhdGUoYm9keSk7XG5cdFx0aWYgKGJvZHkucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tb25lY2xpY2stb3JkZXJdJylcblx0XHRcdCYmIHR5cGVvZiB3aW5kb3cuUmFkaWNhbEZvcm0/LlJhZGljYWxGb3JtQ2xhc3M/LmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHdpbmRvdy5SYWRpY2FsRm9ybS5SYWRpY2FsRm9ybUNsYXNzLmluaXQoYm9keSk7XG5cdFx0fVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5SYWRpY2FsTWFydENhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcnQgPSB3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhcnQ/LmxvYWRBY3Rpb25zID09PSAnZnVuY3Rpb24nKSBjYXJ0LmxvYWRBY3Rpb25zKGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3l0ZHluYW1pY3M6cXVpY2t2aWV3LW9wZW4nLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICB9XG5cblx0YXN5bmMgbG9hZEJ1aWxkZXJQcm9kdWN0KHByb2R1Y3RJZCkge1xuXHRcdGNvbnN0IGNvbnRleHQgPSB0aGlzLmJ1aWxkZXJDb250ZXh0O1xuXHRcdGlmICghY29udGV4dCB8fCBOdW1iZXIoY29udGV4dC5wcm9kdWN0SWQpID09PSBOdW1iZXIocHJvZHVjdElkKSkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zZXRMb2FkaW5nKCk7XG5cdFx0aWYgKHRoaXMucGVuZGluZykgdGhpcy5wZW5kaW5nLmFib3J0KCk7XG5cdFx0dGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRcdGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBlbmRpbmc7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qga2V5ID0gYCR7Y29udGV4dC5lbmRwb2ludH06bGF5b3V0OiR7Y29udGV4dC50ZW1wbGF0ZUlkfToke3Byb2R1Y3RJZH1gO1xuXHRcdFx0Y29uc3QgbGF5b3V0ID0gdGhpcy5jYWNoZS5oYXMoa2V5KVxuXHRcdFx0XHQ/IGNsb25lKHRoaXMuY2FjaGUuZ2V0KGtleSkpXG5cdFx0XHRcdDogYXdhaXQgcmVxdWVzdFF1aWNrVmlld0xheW91dChjb250ZXh0LmVuZHBvaW50LCBwcm9kdWN0SWQsIGNvbnRleHQudGVtcGxhdGVJZCwgY29udHJvbGxlci5zaWduYWwpO1xuXHRcdFx0dGhpcy5jYWNoZS5zZXQoa2V5LCBjbG9uZShsYXlvdXQpKTtcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyQnVpbGRlckNvbnRlbnQobGF5b3V0Lmh0bWwsIHsuLi5jb250ZXh0LCBwcm9kdWN0SWR9LCBsYXlvdXQuYXNzZXRzKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0aWYgKGVycm9yLm5hbWUgIT09ICdBYm9ydEVycm9yJykgdGhpcy5yZW5kZXJFcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0aWYgKHRoaXMucGVuZGluZyA9PT0gY29udHJvbGxlcikgdGhpcy5wZW5kaW5nID0gbnVsbDtcblx0XHR9XG5cdH1cblxuICAgIHJlbmRlcihwcm9kdWN0LCBlbmRwb2ludCkge1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2JvZHknKTtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19sYXlvdXQgdWstZ3JpZC1sYXJnZSB1ay1mbGV4LW1pZGRsZScsIHsndWstZ3JpZCc6IHRydWUsICdkYXRhLXJtLXByb2R1Y3Qtc2NvcGUnOiB0cnVlfSk7XG4gICAgICAgIGNvbnN0IG1lZGlhQ29sdW1uID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19tZWRpYS1jb2x1bW4gdWstd2lkdGgtMS0yQG0nKTtcbiAgICAgICAgY29uc3QgY29udGVudENvbHVtbiA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fY29udGVudCB1ay13aWR0aC1leHBhbmRAbScpO1xuXG4gICAgICAgIG1lZGlhQ29sdW1uLmFwcGVuZCh0aGlzLnJlbmRlck1lZGlhKHByb2R1Y3QubWVkaWEgfHwgW10pKTtcbiAgICAgICAgY29udGVudENvbHVtbi5hcHBlbmQodGhpcy5yZW5kZXJDb250ZW50KHByb2R1Y3QsIGVuZHBvaW50KSk7XG4gICAgICAgIGxheW91dC5hcHBlbmQobWVkaWFDb2x1bW4sIGNvbnRlbnRDb2x1bW4pO1xuICAgICAgICBib2R5LnJlcGxhY2VDaGlsZHJlbihsYXlvdXQpO1xuICAgICAgICBpZiAod2luZG93LlVJa2l0Py51cGRhdGUpIHdpbmRvdy5VSWtpdC51cGRhdGUoYm9keSk7XG4gICAgfVxuXG4gICAgcmVuZGVyTWVkaWEobWVkaWEpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fbWVkaWEnKTtcbiAgICAgICAgY29uc3QgbWFpbiA9IGVsZW1lbnQoJ2J1dHRvbicsICdybXF1aWNrdmlld19fbWFpbi1pbWFnZScsIHt0eXBlOiAnYnV0dG9uJ30pO1xuICAgICAgICBjb25zdCBpbWFnZSA9IGVsZW1lbnQoJ2ltZycsICcnLCB7bG9hZGluZzogJ2VhZ2VyJ30pO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGVsZW1lbnQoJ3NwYW4nLCAncm1xdWlja3ZpZXdfX3BsYWNlaG9sZGVyIHVrLXRleHQtbXV0ZWQnKTtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJJY29uID0gZWxlbWVudCgnc3BhbicsICcnLCB7J3VrLWljb24nOiAnaWNvbjogaW1hZ2U7IHJhdGlvOiAyLjUnfSk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyVGV4dCA9IGVsZW1lbnQoJ3NwYW4nLCAndWstZGlzcGxheS1ibG9jayB1ay10ZXh0LXNtYWxsIHVrLW1hcmdpbi1zbWFsbC10b3AnKTtcbiAgICAgICAgcGxhY2Vob2xkZXJUZXh0LmFwcGVuZCh0ZXh0KHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfTk9fSU1BR0UnLCBsYWJlbHMubm9JbWFnZSkpKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuYXBwZW5kKHBsYWNlaG9sZGVySWNvbiwgcGxhY2Vob2xkZXJUZXh0KTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBtZWRpYS5sZW5ndGggPyBtZWRpYSA6IFt7c3JjOiAnJywgYWx0OiB0aGlzLnByb2R1Y3Q/LnRpdGxlIHx8ICcnfV07XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3JjKSBpbWFnZS5zcmMgPSBpdGVtLnNyYztcbiAgICAgICAgICAgIGVsc2UgaW1hZ2UucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgICAgIGltYWdlLmFsdCA9IGl0ZW0uYWx0IHx8IHRoaXMucHJvZHVjdD8udGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBtYWluLmRpc2FibGVkID0gIWl0ZW0uc3JjO1xuICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlld19fbWFpbi1pbWFnZS0tZW1wdHknLCAhaXRlbS5zcmMpO1xuICAgICAgICAgICAgaW1hZ2UuaGlkZGVuID0gIWl0ZW0uc3JjO1xuICAgICAgICAgICAgcGxhY2Vob2xkZXIuaGlkZGVuID0gQm9vbGVhbihpdGVtLnNyYyk7XG4gICAgICAgICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybXF1aWNrdmlld19fdGh1bWInKS5mb3JFYWNoKCh0aHVtYiwgdGh1bWJJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRodW1iLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3X190aHVtYi0tYWN0aXZlJywgdGh1bWJJbmRleCA9PT0gaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRodW1iLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgdGh1bWJJbmRleCA9PT0gaW5kZXggPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBtYWluLmFwcGVuZChpbWFnZSwgcGxhY2Vob2xkZXIpO1xuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGltYWdlLnNyYyAmJiB3aW5kb3cuVUlraXQ/LmxpZ2h0Ym94UGFuZWwpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuVUlraXQubGlnaHRib3hQYW5lbCh7aXRlbXM6IGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5zcmMpLm1hcCgoaXRlbSkgPT4gKHtzb3VyY2U6IGl0ZW0uc3JjLCBjYXB0aW9uOiBpdGVtLmFsdH0pKX0pLnNob3coMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3cmFwcGVyLmFwcGVuZChtYWluKTtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgdGh1bWJzID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X190aHVtYnMgdWstZmxleCB1ay1mbGV4LWNlbnRlciB1ay1mbGV4LXdyYXAnKTtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbWVudCgnYnV0dG9uJywgJ3JtcXVpY2t2aWV3X190aHVtYicsIHt0eXBlOiAnYnV0dG9uJywgJ2FyaWEtbGFiZWwnOiBpdGVtLmFsdCB8fCBgJHtpbmRleCArIDF9YH0pO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmQoZWxlbWVudCgnaW1nJywgJycsIHtzcmM6IGl0ZW0uc3JjLCBhbHQ6ICcnLCBsb2FkaW5nOiAnbGF6eSd9KSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2VsZWN0KGluZGV4KSk7XG4gICAgICAgICAgICAgICAgdGh1bWJzLmFwcGVuZChidXR0b24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZCh0aHVtYnMpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdCgwKTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudChwcm9kdWN0LCBlbmRwb2ludCkge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlbGVtZW50KCdoMicsICdybXF1aWNrdmlld19fdGl0bGUgdWstaDIgdWstbWFyZ2luLXJlbW92ZS10b3AnKTtcbiAgICAgICAgY29uc3QgbGluayA9IGVsZW1lbnQoJ2EnLCAndWstbGluay1oZWFkaW5nJywge2hyZWY6IHByb2R1Y3QubGlua30pO1xuICAgICAgICBsaW5rLmFwcGVuZCh0ZXh0KHByb2R1Y3QudGl0bGUpKTtcbiAgICAgICAgdGl0bGUuYXBwZW5kKGxpbmspO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQodGl0bGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dDb2RlICYmIHByb2R1Y3QuY29kZSkge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fY29kZSB1ay10ZXh0LW1ldGEgdWstbWFyZ2luLXNtYWxsLWJvdHRvbScpO1xuICAgICAgICAgICAgY29kZS5hcHBlbmQodGV4dChwcm9kdWN0LmNvZGUpKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChjb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByaWNlID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19wcmljZSB1ay10ZXh0LWxhcmdlIHVrLXRleHQtYm9sZCcpO1xuICAgICAgICBpZiAocHJvZHVjdC5wcmljZT8uZGlzY291bnRFbmFibGVkICYmIHByb2R1Y3QucHJpY2UuYmFzZSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkUHJpY2UgPSBlbGVtZW50KCdzJywgJ3VrLXRleHQtbXV0ZWQgdWstbWFyZ2luLXNtYWxsLXJpZ2h0Jyk7XG4gICAgICAgICAgICBvbGRQcmljZS5hcHBlbmQodGV4dChwcm9kdWN0LnByaWNlLmJhc2UpKTtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZChvbGRQcmljZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmluYWxQcmljZSA9IGVsZW1lbnQoJ3NwYW4nLCAnJywgeydkYXRhLXJtLXByaWNlJzogdHJ1ZX0pO1xuICAgICAgICBmaW5hbFByaWNlLmFwcGVuZCh0ZXh0KHByb2R1Y3QucHJpY2U/LmZpbmFsKSk7XG4gICAgICAgIHByaWNlLmFwcGVuZChmaW5hbFByaWNlKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKHByaWNlKTtcblxuICAgICAgICBjb25zdCBzdG9jayA9IGVsZW1lbnQoJ2RpdicsIGBybXF1aWNrdmlld19fc3RvY2sgdWstbWFyZ2luLXNtYWxsLXRvcCAke3Byb2R1Y3QuaW5TdG9jayA/ICd1ay10ZXh0LXN1Y2Nlc3MnIDogJ3VrLXRleHQtbXV0ZWQnfWAsIHsnZGF0YS1ybS1zdG9jayc6IHRydWV9KTtcbiAgICAgICAgc3RvY2suYXBwZW5kKHRleHQocHJvZHVjdC5pblN0b2NrXG4gICAgICAgICAgICA/IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX0lOX1NUT0NLJywgbGFiZWxzLmluU3RvY2spXG4gICAgICAgICAgICA6IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX05PVF9JTl9TVE9DSycsIGxhYmVscy5vdXRPZlN0b2NrKSkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQoc3RvY2spO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dEZXNjcmlwdGlvbiAmJiBwcm9kdWN0LmludHJvdGV4dCkge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBlbGVtZW50KCdwJywgJ3JtcXVpY2t2aWV3X19kZXNjcmlwdGlvbiB1ay1tYXJnaW4nKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmFwcGVuZCh0ZXh0KHByb2R1Y3QuaW50cm90ZXh0KSk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQoZGVzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1ZhcmlhbnRzICYmIHByb2R1Y3QudmFyaWFudHM/LmZpZWxkcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB2YXJpYW50cyA9IHRoaXMucmVuZGVyVmFyaWFudHMocHJvZHVjdC52YXJpYW50cywgZW5kcG9pbnQpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKHZhcmlhbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dDYXJ0KSBmcmFnbWVudC5hcHBlbmQodGhpcy5yZW5kZXJDYXJ0KHByb2R1Y3QpKTtcblxuICAgICAgICBjb25zdCBtb3JlID0gZWxlbWVudCgnYScsICdybXF1aWNrdmlld19fbW9yZSB1ay1idXR0b24gdWstYnV0dG9uLXRleHQgdWstbWFyZ2luLXRvcCcsIHtocmVmOiBwcm9kdWN0Lmxpbmt9KTtcbiAgICAgICAgbW9yZS5hcHBlbmQodGV4dCh0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0RFVEFJTFMnLCBsYWJlbHMuZGV0YWlscykpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKG1vcmUpO1xuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyVmFyaWFudHMoZGF0YSwgZW5kcG9pbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZWxlbWVudCgnZGl2JywgJ3JtdmFyaWFudHMgcm1xdWlja3ZpZXdfX3ZhcmlhbnRzIHVrLWZvcm0tc3RhY2tlZCcsIHtcbiAgICAgICAgICAgICdkYXRhLXJtLXZhcmlhbnRzJzogdHJ1ZSxcbiAgICAgICAgICAgICdkYXRhLWVuZHBvaW50JzogZW5kcG9pbnQsXG4gICAgICAgICAgICAnZGF0YS1hY3Rpb24nOiAnYWpheCcsXG4gICAgICAgICAgICAnZGF0YS1kaXNhYmxlLXVuYXZhaWxhYmxlJzogJ3RydWUnLFxuICAgICAgICAgICAgJ2RhdGEtdXBkYXRlLXVybCc6ICdmYWxzZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudCA9IGRhdGEucHJvZHVjdHMuZmluZCgoaXRlbSkgPT4gTnVtYmVyKGl0ZW0uaWQpID09PSBOdW1iZXIoZGF0YS5jdXJyZW50UHJvZHVjdCkpO1xuICAgICAgICBkYXRhLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmllbGRzZXQgPSBlbGVtZW50KCdmaWVsZHNldCcsICdybXZhcmlhbnRzX19maWVsZCB1ay1maWVsZHNldCcsIHsnZGF0YS1ybS1maWVsZCc6IGZpZWxkLmFsaWFzfSk7XG4gICAgICAgICAgICBjb25zdCBsZWdlbmQgPSBlbGVtZW50KCdsZWdlbmQnLCAncm12YXJpYW50c19fbGFiZWwgdWstZm9ybS1sYWJlbCcpO1xuICAgICAgICAgICAgbGVnZW5kLmFwcGVuZCh0ZXh0KGZpZWxkLnRpdGxlKSk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gZWxlbWVudCgnZGl2JywgJ3JtdmFyaWFudHNfX29wdGlvbnMgdWstZmxleCB1ay1mbGV4LXdyYXAgdWstZmxleC1taWRkbGUnLCB7cm9sZTogJ2dyb3VwJywgJ2FyaWEtbGFiZWwnOiBmaWVsZC50aXRsZX0pO1xuXG4gICAgICAgICAgICBmaWVsZC5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IFN0cmluZyhjdXJyZW50Py5maWVsZHNbZmllbGQuYWxpYXNdKSA9PT0gU3RyaW5nKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3dhdGNoID0gb3B0aW9uLmltYWdlIHx8IG9wdGlvbi5jb2xvcjtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtZW50KCdidXR0b24nLCBgcm12YXJpYW50c19fb3B0aW9uIHVrLWJ1dHRvbiB1ay1idXR0b24tZGVmYXVsdCR7c3dhdGNoID8gJyBybXZhcmlhbnRzX19vcHRpb24tLXN3YXRjaCcgOiAnJ31gLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLCAnZGF0YS1ybS12YWx1ZSc6IG9wdGlvbi52YWx1ZSwgJ2FyaWEtcHJlc3NlZCc6IGFjdGl2ZSA/ICd0cnVlJyA6ICdmYWxzZScsIHRpdGxlOiBvcHRpb24ubGFiZWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmltYWdlKSBidXR0b24uYXBwZW5kKGVsZW1lbnQoJ2ltZycsICcnLCB7c3JjOiBvcHRpb24uaW1hZ2UsIGFsdDogJycsIGxvYWRpbmc6ICdsYXp5J30pKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvcHRpb24uY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBlbGVtZW50KCdzcGFuJywgJ3JtdmFyaWFudHNfX2NvbG9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLnN0eWxlLnNldFByb3BlcnR5KCctLXJtLXN3YXRjaCcsIG9wdGlvbi5jb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmQoY29sb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBidXR0b24uYXBwZW5kKHRleHQob3B0aW9uLmxhYmVsKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmllbGRzZXQuYXBwZW5kKGxlZ2VuZCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGZpZWxkc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWxlbWVudCgnZGl2JywgJ3JtdmFyaWFudHNfX3N0YXR1cyB1ay10ZXh0LXNtYWxsJywgeydhcmlhLWxpdmUnOiAncG9saXRlJ30pKTtcblxuICAgICAgICBuZXcgVmFyaWFudFBpY2tlcihjb250YWluZXIsIGRhdGEsIChzZWxlY3RlZCkgPT4gdGhpcy51cGRhdGVQcm9kdWN0KHNlbGVjdGVkKSkuaW5pdCgpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHJlbmRlckNhcnQocHJvZHVjdCkge1xuICAgICAgICBjb25zdCByb3cgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2NhcnQgdWstZmxleCB1ay1mbGV4LW1pZGRsZSB1ay1mbGV4LXdyYXAgdWstbWFyZ2luLXRvcCcpO1xuICAgICAgICBjb25zdCBxdWFudGl0eSA9IGVsZW1lbnQoJ2lucHV0JywgJ3VrLWlucHV0IHVrLWZvcm0td2lkdGgteHNtYWxsJywge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsIHZhbHVlOiBwcm9kdWN0LnF1YW50aXR5Py5taW4gfHwgMSwgbWluOiBwcm9kdWN0LnF1YW50aXR5Py5taW4gfHwgMSwgc3RlcDogcHJvZHVjdC5xdWFudGl0eT8uc3RlcCB8fCAxLFxuICAgICAgICAgICAgbWF4OiBwcm9kdWN0LnF1YW50aXR5Py5tYXgsICdhcmlhLWxhYmVsJzogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19RVUFOVElUWScsIGxhYmVscy5xdWFudGl0eSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW1lbnQoJ2J1dHRvbicsICd1ay1idXR0b24gdWstYnV0dG9uLXByaW1hcnknLCB7dHlwZTogJ2J1dHRvbid9KTtcbiAgICAgICAgYnV0dG9uLmFwcGVuZCh0ZXh0KHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX0NBUlRfQUREJywgbGFiZWxzLmFkZFRvQ2FydCkpKTtcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gIXByb2R1Y3QuaW5TdG9jaztcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5SYWRpY2FsTWFydENhcnQgJiYgdGhpcy5wcm9kdWN0Py5pZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SYWRpY2FsTWFydENhcnQoKS5hZGRQcm9kdWN0KE51bWJlcih0aGlzLnByb2R1Y3QuaWQpLCBOdW1iZXIocXVhbnRpdHkudmFsdWUpIHx8IDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcm93LmFwcGVuZChxdWFudGl0eSwgYnV0dG9uKTtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9kdWN0KHByb2R1Y3QpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gey4uLnRoaXMucHJvZHVjdCwgLi4ucHJvZHVjdH07XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X190aXRsZSBhJyk7XG4gICAgICAgIGNvbnN0IHByaWNlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX3ByaWNlJyk7XG4gICAgICAgIGNvbnN0IHN0b2NrID0gYm9keS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1zdG9ja10nKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19jb2RlJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGNhcnQgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fY2FydCAudWstYnV0dG9uLXByaW1hcnknKTtcbiAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2R1Y3QudGl0bGU7XG4gICAgICAgICAgICB0aXRsZS5ocmVmID0gcHJvZHVjdC5saW5rO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmljZSkge1xuICAgICAgICAgICAgcHJpY2UucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBpZiAocHJvZHVjdC5wcmljZT8uZGlzY291bnRFbmFibGVkICYmIHByb2R1Y3QucHJpY2UuYmFzZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFByaWNlID0gZWxlbWVudCgncycsICd1ay10ZXh0LW11dGVkIHVrLW1hcmdpbi1zbWFsbC1yaWdodCcpO1xuICAgICAgICAgICAgICAgIG9sZFByaWNlLmFwcGVuZCh0ZXh0KHByb2R1Y3QucHJpY2UuYmFzZSkpO1xuICAgICAgICAgICAgICAgIHByaWNlLmFwcGVuZChvbGRQcmljZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaW5hbFByaWNlID0gZWxlbWVudCgnc3BhbicsICcnLCB7J2RhdGEtcm0tcHJpY2UnOiB0cnVlfSk7XG4gICAgICAgICAgICBmaW5hbFByaWNlLmFwcGVuZCh0ZXh0KHByb2R1Y3QucHJpY2U/LmZpbmFsKSk7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmQoZmluYWxQcmljZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUpIGNvZGUudGV4dENvbnRlbnQgPSBwcm9kdWN0LmNvZGUgfHwgJyc7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbikgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9kdWN0LmludHJvdGV4dCB8fCAnJztcbiAgICAgICAgaWYgKHN0b2NrKSB7XG4gICAgICAgICAgICBzdG9jay50ZXh0Q29udGVudCA9IHByb2R1Y3QuaW5TdG9ja1xuICAgICAgICAgICAgICAgID8gdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfSU5fU1RPQ0snLCBsYWJlbHMuaW5TdG9jaylcbiAgICAgICAgICAgICAgICA6IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX05PVF9JTl9TVE9DSycsIGxhYmVscy5vdXRPZlN0b2NrKTtcbiAgICAgICAgICAgIHN0b2NrLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtc3VjY2VzcycsIHByb2R1Y3QuaW5TdG9jayk7XG4gICAgICAgICAgICBzdG9jay5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LW11dGVkJywgIXByb2R1Y3QuaW5TdG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhcnQpIGNhcnQuZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrO1xuXG4gICAgICAgIGNvbnN0IG1lZGlhID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX21lZGlhJyk7XG4gICAgICAgIGlmIChtZWRpYSkgbWVkaWEucmVwbGFjZVdpdGgodGhpcy5yZW5kZXJNZWRpYShwcm9kdWN0Lm1lZGlhIHx8IFtdKSk7XG4gICAgICAgIGNvbnN0IG1vcmUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fbW9yZScpO1xuICAgICAgICBpZiAobW9yZSkgbW9yZS5ocmVmID0gcHJvZHVjdC5saW5rO1xuICAgIH1cbn1cblxuY29uc3QgcXVpY2tWaWV3ID0gbmV3IFF1aWNrVmlldygpO1xuY29uc3QgY2FydEZlZWRiYWNrVGltZXJzID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgcHJlcGFyZUNhcnRCdXR0b24gPSAoYnV0dG9uKSA9PiB7XG4gICAgaWYgKCFidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbCkgYnV0dG9uLmRhdGFzZXQucm1DYXJ0T3JpZ2luYWwgPSBidXR0b24uaW5uZXJIVE1MO1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoY2FydEZlZWRiYWNrVGltZXJzLmdldChidXR0b24pKTtcbn07XG5cbmNvbnN0IHNob3dDYXJ0UGVuZGluZyA9IChjYXJ0LCBidXR0b24pID0+IHtcbiAgICBwcmVwYXJlQ2FydEJ1dHRvbihidXR0b24pO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGNhcnQuZGF0YXNldC5ybUNhcnRMb2FkaW5nIHx8IGxhYmVscy5sb2FkaW5nO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtYnVzeScsICd0cnVlJyk7XG59O1xuXG5jb25zdCBzaG93Q2FydEZlZWRiYWNrID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LmRldGFpbD8uZXJyb3IpIHJldHVybjtcblxuICAgIGNvbnN0IHByb2R1Y3RJZCA9IE51bWJlcihldmVudC5kZXRhaWw/LmVudHJ5Py5wcm9kdWN0X2lkIHx8IDApO1xuICAgIGlmICghcHJvZHVjdElkKSByZXR1cm47XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICBgW3JhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdW2RhdGEtaWQ9XCIke3Byb2R1Y3RJZH1cIl0sIGBcbiAgICAgICAgKyBgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl1bZGF0YS1pZD1cIiR7cHJvZHVjdElkfVwiXWBcbiAgICApLmZvckVhY2goKGNhcnQpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpO1xuICAgICAgICBpZiAoIWJ1dHRvbikgcmV0dXJuO1xuXG4gICAgICAgIHByZXBhcmVDYXJ0QnV0dG9uKGJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGNhcnQuZGF0YXNldC5ybUNhcnRTdWNjZXNzIHx8IGxhYmVscy5jYXJ0QWRkZWQ7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdybS1idXlfX2J1dHRvbi0tc3VjY2VzcycpO1xuICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWJ1c3knKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuXG4gICAgICAgIGNvbnN0IHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvbi5kYXRhc2V0LnJtQ2FydE9yaWdpbmFsO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JtLWJ1eV9fYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWxpdmUnKTtcbiAgICAgICAgICAgIGNhcnRGZWVkYmFja1RpbWVycy5kZWxldGUoYnV0dG9uKTtcbiAgICAgICAgfSwgMjIwMCk7XG4gICAgICAgIGNhcnRGZWVkYmFja1RpbWVycy5zZXQoYnV0dG9uLCB0aW1lcik7XG4gICAgfSk7XG59O1xuXG5jb25zdCByZXNldFBlbmRpbmdDYXJ0QnV0dG9ucyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXVthcmlhLWJ1c3k9XCJ0cnVlXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdW2FyaWEtYnVzeT1cInRydWVcIl0nKVxuICAgICAgICAuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQucm1DYXJ0T3JpZ2luYWwpIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbDtcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpO1xuICAgICAgICB9KTtcbn07XG5cbmNvbnN0IGluaXQgPSAocm9vdCA9IGRvY3VtZW50KSA9PiB7XG5cdGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tb25lY2xpY2stb3JkZXJdJykpIGluaXRPbmVDbGlja0NvbmRpdGlvbmFsRmllbGRzKHJvb3QpO1xuXHRyb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tb25lY2xpY2stb3JkZXJdJykuZm9yRWFjaCgob3JkZXIpID0+IGluaXRPbmVDbGlja0NvbmRpdGlvbmFsRmllbGRzKG9yZGVyKSk7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpKSBuZXcgUHJvZHVjdFNjb3BlKHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKS5mb3JFYWNoKChzY29wZSkgPT4gbmV3IFByb2R1Y3RTY29wZShzY29wZSkuaW5pdCgpKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXByb2R1Y3QtY2FyZC1kcm9wZG93bl0nKSkgbmV3IFByb2R1Y3RDYXJkRHJvcGRvd24ocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1wcm9kdWN0LWNhcmQtZHJvcGRvd25dJykuZm9yRWFjaCgoZHJvcGRvd24pID0+IG5ldyBQcm9kdWN0Q2FyZERyb3Bkb3duKGRyb3Bkb3duKS5pbml0KCkpO1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tcHJvZHVjdC1jYXJkLXBvc2l0aW9uXScpKSBuZXcgUHJvZHVjdENhcmRQb3NpdGlvbihyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXByb2R1Y3QtY2FyZC1wb3NpdGlvbl0nKS5mb3JFYWNoKChwb3NpdGlvbikgPT4gbmV3IFByb2R1Y3RDYXJkUG9zaXRpb24ocG9zaXRpb24pLmluaXQoKSk7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LWhvdmVyLWdhbGxlcnldJykpIG5ldyBQcm9kdWN0SG92ZXJHYWxsZXJ5KHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tcHJvZHVjdC1ob3Zlci1nYWxsZXJ5XScpLmZvckVhY2goKGdhbGxlcnkpID0+IG5ldyBQcm9kdWN0SG92ZXJHYWxsZXJ5KGdhbGxlcnkpLmluaXQoKSk7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS12YXJpYW50c10nKSkgbmV3IFZhcmlhbnRQaWNrZXIocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS12YXJpYW50c10nKS5mb3JFYWNoKChjb250YWluZXIpID0+IG5ldyBWYXJpYW50UGlja2VyKGNvbnRhaW5lcikuaW5pdCgpKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLWJ1bGstYWN0aW9uc10nKSkgbmV3IFByb2R1Y3RCdWxrQWN0aW9ucyhyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLWJ1bGstYWN0aW9uc10nKS5mb3JFYWNoKChjb250YWluZXIpID0+IG5ldyBQcm9kdWN0QnVsa0FjdGlvbnMoY29udGFpbmVyKS5pbml0KCkpO1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tcHJvZHVjdC1hY3Rpb25dJykpIG5ldyBQcm9kdWN0T3B0aW9uYWxBY3Rpb24ocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1wcm9kdWN0LWFjdGlvbl0nKS5mb3JFYWNoKChidXR0b24pID0+IG5ldyBQcm9kdWN0T3B0aW9uYWxBY3Rpb24oYnV0dG9uKS5pbml0KCkpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXJtLXF1aWNrLXZpZXddJyk7XG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHF1aWNrVmlldy5vcGVuKHRyaWdnZXIpO1xuICAgIH1cbn0sIHRydWUpO1xuXG4vLyBSYWRpY2FsTWFydCBiaW5kcyB0aGUgcHJvZHVjdCBpZCBpbnRvIGl0cyBvcmlnaW5hbCBjbGljayBjbG9zdXJlLiBJbnRlcmNlcHRcbi8vIG9ubHkgY2FydHMgZXhwbGljaXRseSB1cGRhdGVkIGJ5IFJNIFZhcmlhbnRzLCBzbyB0aGUgY3VycmVudCBpZCBpcyByZXNwZWN0ZWQuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGFkZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpO1xuICAgIGNvbnN0IGNhcnQgPSBhZGQ/LmNsb3Nlc3QoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKTtcbiAgICBpZiAoIWFkZCB8fCAhY2FydD8uZGF0YXNldC5ybUR5bmFtaWNQcm9kdWN0IHx8ICF3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBzaG93Q2FydFBlbmRpbmcoY2FydCwgYWRkKTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGNhcnQucXVlcnlTZWxlY3RvcignW3JhZGljYWxtYXJ0LWNhcnQ9XCJxdWFudGl0eVwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdJyk7XG4gICAgd2luZG93LlJhZGljYWxNYXJ0Q2FydCgpLmFkZFByb2R1Y3QoTnVtYmVyKGNhcnQuZGF0YXNldC5pZCksIE51bWJlcihxdWFudGl0eT8udmFsdWUpIHx8IDEpO1xufSwgdHJ1ZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29uUmFkaWNhbE1hcnRDYXJ0QWZ0ZXJBZGRQcm9kdWN0Jywgc2hvd0NhcnRGZWVkYmFjayk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvblJhZGljYWxNYXJ0Q2FydEVycm9yJywgcmVzZXRQZW5kaW5nQ2FydEJ1dHRvbnMpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4gaW5pdCgpKTtcbm9ic2VydmVEeW5hbWljQ29udGVudChpbml0KTtcbiJdLCJuYW1lcyI6WyJSVU5USU1FX0tFWSIsInJ1bnRpbWUiLCJ3aW5kb3ciLCJhZGRlZCIsIlNldCIsInJlbW92ZWQiLCJvYnNlcnZlciIsInZpc2l0IiwiY2FsbGJhY2tzIiwibm9kZSIsImZvckVhY2giLCJjYWxsYmFjayIsInN0YXJ0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJNdXRhdGlvbk9ic2VydmVyIiwicmVjb3JkcyIsIl9yZWYiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJvYnNlcnZlRHluYW1pY0NvbnRlbnQiLCJvbkFkZGVkIiwib25SZW1vdmVkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiYWRkIiwiZGVsZXRlIiwidGV4dCIsInZhbHVlIiwiY3JlYXRlVGV4dE5vZGUiLCJjbG9uZSIsInN0cnVjdHVyZWRDbG9uZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInByb2R1Y3REaXNjb3VudFRleHQiLCJwcmljZSIsIm1vZGUiLCJTdHJpbmciLCJkaXNjb3VudCIsImJhc2UiLCJOdW1iZXIiLCJiYXNlVmFsdWUiLCJmaW5hbCIsImZpbmFsVmFsdWUiLCJwZXJjZW50IiwiTWF0aCIsIm1heCIsInJvdW5kIiwiYW1vdW50IiwicmVwbGFjZSIsInBlcmNlbnRUZXh0IiwiYW1vdW50VGV4dCIsImZpbHRlciIsIkJvb2xlYW4iLCJqb2luIiwibG9hZGVkQXNzZXRzIiwiTWFwIiwiYXNzZXRLZXkiLCJhc3NldCIsInR5cGUiLCJuYW1lIiwidXJpIiwiY29udGVudCIsImxvYWRBc3NldCIsImtleSIsImhhcyIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGFyZ2V0VXJsIiwiVVJMIiwiYmFzZVVSSSIsImhyZWYiLCJleGlzdGluZyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaW5kIiwic3JjIiwicmVhZHkiLCJzZXQiLCJyZWplY3QiLCJjcmVhdGVFbGVtZW50IiwiYXR0cmlidXRlcyIsInJlbCIsInRleHRDb250ZW50IiwiT2JqZWN0IiwiZW50cmllcyIsInNldEF0dHJpYnV0ZSIsIm5vbmNlIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiRXJyb3IiLCJoZWFkIiwiYXBwZW5kIiwiY2F0Y2giLCJlcnJvciIsInJlbW92ZSIsImxvYWRBc3NldHMiLCJhc3NldHMiLCJlbnN1cmVSYWRpY2FsTWFydERpc3BsYXkiLCJSYWRpY2FsTWFydERpc3BsYXkiLCJjYXJ0IiwiYWRkQnV0dG9uc0xvY2siLCJkaXNwbGF5TW9kdWxlQnV0dG9uc0xvY2siLCJkaXNjb3VudEhpZGUiLCJwcm9kdWN0c0Rpc2NvdW50SGlkZSIsImJhZGdlSGlkZSIsIm1vZHVsZUhpZGUiLCJtb2R1bGVTaG93IiwicGFnZUVycm9ycyIsInBhZ2VSZWxvYWQiLCJub3RpZmljYXRpb25fYWRkU2hvdyIsImVycm9yc1Nob3ciLCJjaGVja291dCIsInN1Ym1pdEJ1dHRvbnNMb2NrIiwiY2hlY2tFcnJvcnNTaG93IiwiY2hlY2tFcnJvcnNQcm9kdWN0c1Nob3ciLCJnbG9iYWxMb2FkaW5nU2hvdyIsInNoaXBwaW5nTG9hZGluZ1Nob3ciLCJwYXltZW50TG9hZGluZ1Nob3ciLCJsb2dpblNob3ciLCJjcmVhdGVPcmRlclByb2dyZXNzIiwibG9naW4iLCJidXR0b25zTG9jayIsImZyb21TaG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwidHJhbnNsYXRlIiwiZmFsbGJhY2siLCJ0cmFuc2xhdGVkIiwiSm9vbWxhIiwiVGV4dCIsIl8iLCJsYWJlbHMiLCJsb2FkaW5nIiwiZW1wdHlQcm9kdWN0IiwiZW1wdHlRdWlja1ZpZXciLCJpblN0b2NrIiwib3V0T2ZTdG9jayIsInF1YW50aXR5IiwiYWRkVG9DYXJ0IiwiY2FydEFkZGVkIiwiZGV0YWlscyIsInF1aWNrVmlldyIsIm5vSW1hZ2UiLCJlbGVtZW50IiwidGFnIiwiY2xhc3NOYW1lIiwiX3JlZjIiLCJyZXF1ZXN0UHJvZHVjdCIsImVuZHBvaW50IiwidGFzayIsInByb2R1Y3RJZCIsInNpZ25hbCIsInVybCIsImxvY2F0aW9uIiwic2VhcmNoUGFyYW1zIiwicmVzcG9uc2UiLCJmZXRjaCIsInRvU3RyaW5nIiwiaGVhZGVycyIsImNyZWRlbnRpYWxzIiwicGF5bG9hZCIsImpzb24iLCJvayIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3RhdHVzIiwiZGF0YSIsImlzQXJyYXkiLCJpZCIsInJlcXVlc3RRdWlja1ZpZXdMYXlvdXQiLCJ0ZW1wbGF0ZUlkIiwiaHRtbCIsInJlc29sdmVQcm9kdWN0U2NvcGUiLCJzb3VyY2UiLCJwYXJlbnRFbGVtZW50IiwiY2xvc2VzdCIsImFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSIsImZpZWxkIiwiaW5uZXJIVE1MIiwiY2hpbGROb2RlcyIsInVwZGF0ZU9wdGlvbmFsRWxlbWVudCIsImF2YWlsYWJsZSIsImhpZGRlbiIsImZpbmRQcm9kdWN0RmllbGQiLCJwcm9kdWN0IiwiYWxpYXMiLCJmaWVsZHNldCIsImZpZWxkc2V0cyIsImZpZWxkcyIsIml0ZW0iLCJyZW5kZXJQcm9kdWN0Q3VzdG9tRmllbGQiLCJjb250YWluZXIiLCJkYXRhc2V0IiwiZmllbGRBbGlhcyIsImVtcHR5VGV4dCIsImxhYmVsIiwidGl0bGUiLCJsYWJlbFNlcGFyYXRvciIsInNob3dMYWJlbCIsInZhbHVlTW9kZSIsInJlbmRlclByb2R1Y3RCYWRnZXMiLCJiYWRnZXMiLCJsaW1pdCIsIml0ZW1zIiwic2xpY2UiLCJsaXN0IiwiZnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYmFkZ2UiLCJsaW5rQmFkZ2VzIiwibGluayIsImljb24iLCJzaG93SWNvbnMiLCJhbHQiLCJzaG93VGl0bGVzIiwic3R5bGUiLCJsYWJlbFN0eWxlIiwicmVwbGFjZUNoaWxkcmVuIiwicmVuZGVyUHJvZHVjdFJhdGluZyIsInJhdGluZyIsIm1pbiIsInN0YXJzIiwidmFsdWVOb2RlIiwiY291bnROb2RlIiwic2V0UHJvcGVydHkiLCJ0b0xvY2FsZVN0cmluZyIsIm1heGltdW1GcmFjdGlvbkRpZ2l0cyIsImNvdW50Iiwic2hvd0NvdW50Iiwic2hvd0VtcHR5IiwicmVuZGVyUHJvZHVjdEJvbnVzIiwiYm9udXMiLCJyZW5kZXJQcm9kdWN0U3RvY2siLCJhbGwiLCJhbW91bnROb2RlIiwicHJvZ3Jlc3MiLCJsYWJlbEluIiwibGFiZWxPdXQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJzdG9ja0FjY291bnRpbmciLCJ1bml0U2hvcnQiLCJ1bml0cyIsInRyaW0iLCJzaG93UXVhbnRpdHkiLCJ0aHJlc2hvbGQiLCJwcm9ncmVzc1RocmVzaG9sZCIsInNob3dQcm9ncmVzcyIsInJlbmRlclByb2R1Y3RVbml0IiwidW5pdCIsInVuaXRTdHlsZSIsInVuaXROb2RlIiwicHJpY2VOb2RlIiwib25lQ2xpY2tQcm9kdWN0VmFsdWUiLCJjb2RlIiwicmVuZGVyT25lQ2xpY2tPcmRlciIsInJtT25lY2xpY2tQcm9kdWN0SWQiLCJybU9uZWNsaWNrUHJvZHVjdE5hbWUiLCJybU9uZWNsaWNrU291cmNlIiwibmV4dFZhbHVlIiwibWF0Y2hlcyIsInN0ZXAiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZXBsYWNlbWVudHMiLCJwcm9kdWN0X2lkIiwicHJvZHVjdF9uYW1lIiwicHJvZHVjdF9jb2RlIiwicHJvZHVjdF91cmwiLCJwcm9kdWN0X3ByaWNlIiwicm1PbmVjbGlja1N1YmplY3RUZW1wbGF0ZSIsIl9yZWYzIiwicmVwbGFjZW1lbnQiLCJzcGxpdCIsImltYWdlIiwibWVkaWEiLCJpbWFnZVNvdXJjZSIsInVuaXRUZXh0IiwiYm9udXNXcmFwIiwiYm9udXNUZXh0Iiwic3RvY2siLCJzdG9ja0xhYmVsIiwic3RvY2tJbkljb24iLCJzdG9ja091dEljb24iLCJkaXNhYmxlZCIsImRpc2FibGVPdXRPZlN0b2NrIiwiYnV0dG9uIiwib25lQ2xpY2tGaWVsZFZhbHVlcyIsImZvcm0iLCJlbGVtZW50cyIsImNvbnRyb2wiLCJmbGF0TWFwIiwiY2hlY2tlZCIsIkhUTUxTZWxlY3RFbGVtZW50IiwibXVsdGlwbGUiLCJzZWxlY3RlZE9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJzeW5jT25lQ2xpY2tDb25kaXRpb25hbEZpZWxkcyIsIm9yZGVyIiwic291cmNlTmFtZSIsInJtT25lY2xpY2tDb25kaXRpb25GaWVsZCIsImV4cGVjdGVkVmFsdWUiLCJybU9uZWNsaWNrQ29uZGl0aW9uVmFsdWUiLCJ2aXNpYmxlIiwiaW5jbHVkZXMiLCJyZXF1aXJlZCIsInJtT25lY2xpY2tSZXF1aXJlZCIsImluaXRPbmVDbGlja0NvbmRpdGlvbmFsRmllbGRzIiwicm1PbmVjbGlja0NvbmRpdGlvbnNSZWFkeSIsInN5bmMiLCJyZW5kZXJQcm9kdWN0U3BlY2lmaWNhdGlvbnMiLCJzb3VyY2VGaWVsZHNldHMiLCJzaG93VmFyaWFudHMiLCJzaG93VmFyaWFudEZpZWxkcyIsInNlbGVjdGVkRmllbGRzIiwiZmllbGRMaW1pdCIsInBhcnNlSW50Iiwic2hvd0ZpZWxkc2V0VGl0bGVzIiwiZGl2aWRlciIsInN0cmlwZWQiLCJsYXlvdXQiLCJyZXNwb25zaXZlQ29sdW1uIiwibGVnYWN5Q29sdW1ucyIsImNvbHVtbnMiLCJjb2x1bW5zU21hbGwiLCJjb2x1bW5zTWVkaXVtIiwiY29sdW1uc0xhcmdlIiwidGFibGVSZXNwb25zaXZlIiwiZmllbGRzUmVtYWluaW5nIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJ2YXJpYW50Iiwic2l6ZSIsInB1c2giLCJzZWN0aW9uIiwidGl0bGVOb2RlIiwidGFibGUiLCJib2R5Iiwicm93Iiwic2NvcGUiLCJ3cmFwcGVyIiwiZ3JpZCIsIlVJa2l0IiwidXBkYXRlIiwicmVuZGVyUHJvZHVjdEhvdmVyR2FsbGVyeSIsIm1heEltYWdlcyIsInZpZXdwb3J0IiwiaW5kZXgiLCJkZWNvZGluZyIsImluZGljYXRvclN0eWxlIiwiaW5kaWNhdG9ycyIsInNldE1ldGFDb250ZW50IiwiYXR0cmlidXRlIiwidXBkYXRlUHJvZHVjdE1ldGFkYXRhIiwiZGVzY3JpcHRpb24iLCJpbnRyb3RleHQiLCJjYW5vbmljYWwiLCJQcm9kdWN0U2NvcGUiLCJjb25zdHJ1Y3RvciIsInJlYWREYXRhIiwiY2hpbGRyZW4iLCJjb250YWlucyIsIm5vZGVzIiwic2VsZWN0b3IiLCJvd25lciIsImluaXQiLCJybVByb2R1Y3RTY29wZVJlYWR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJhcHBseVByb2R1Y3QiLCJybVByb2R1Y3RJZCIsImludHJvdGV4dEh0bWwiLCJmdWxsdGV4dEh0bWwiLCJmdWxsdGV4dCIsInNhdmluZ3MiLCJzYXZpbmdzVmFsdWUiLCJlbmFibGVkIiwiZGlzY291bnRFbmFibGVkIiwidW5pdFdyYXAiLCJzaG93QmFzZSIsImRpc2NvdW50VGV4dCIsImRpc2NvdW50TW9kZSIsInNob3dEaXNjb3VudCIsImJlbmVmaXQiLCJzaG93U2F2aW5ncyIsImJlbmVmaXRWYWx1ZSIsInNob3dVbml0IiwiY2F0ZWdvcnkiLCJtYW51ZmFjdHVyZXIiLCJtYW51ZmFjdHVyZXJzIiwiaW5wdXQiLCJwcm9kdWN0VGl0bGUiLCJiYXNlTGFiZWwiLCJzaG93VGl0bGUiLCJFdmVudCIsImJ1YmJsZXMiLCJybVF1aWNrVmlldyIsInJtRHluYW1pY1Byb2R1Y3QiLCJybVByb2R1Y3RQYWdlIiwidXBkYXRlRG9jdW1lbnRUaXRsZSIsInVwZGF0ZURvY3VtZW50TWV0YWRhdGEiLCJQcm9kdWN0QnVsa0FjdGlvbnMiLCJyb290U2VsZWN0b3IiLCJzZWxlY3Rpb25Sb290IiwicmVzb2x2ZWRSb290IiwicGVuZGluZyIsImhhbmRsZVNlbGVjdGlvbiIsImJpbmQiLCJyb290Iiwic2VsZWN0ZWQiLCJybUJ1bGtBY3Rpb25zUmVhZHkiLCJhY3Rpb24iLCJybUJ1bGtBY3Rpb24iLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXR1cyIsIlJhZGljYWxNYXJ0Q2FydCIsImFkZFByb2R1Y3QiLCJpbnB1dHNCeVByb2R1Y3QiLCJwcm9kdWN0SWRzIiwia2V5cyIsIndhaXRpbmciLCJmYWlsdXJlcyIsInRpbWVvdXQiLCJmaW5pc2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlUmVzdWx0IiwiY2xlYXJUaW1lb3V0IiwiZmFpbGVkUHJvZHVjdElkcyIsImVudHJ5Iiwic2V0VGltZW91dCIsImNsZWFyIiwiX3JlZjQiLCJQcm9kdWN0SG92ZXJHYWxsZXJ5IiwiYWN0aXZlSW5kZXgiLCJ0b3VjaCIsInN1cHByZXNzQ2xpY2siLCJzaG93IiwiaW1hZ2VzIiwibmV4dCIsImltYWdlSW5kZXgiLCJhY3RpdmUiLCJpbmRpY2F0b3IiLCJpbmRpY2F0b3JJbmRleCIsInJtUHJvZHVjdEhvdmVyR2FsbGVyeVJlYWR5IiwicG9pbnRlclN1cmZhY2UiLCJwb2ludGVyVHlwZSIsImJvdW5kcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiaW5zaWRlIiwiY2xpZW50WCIsImxlZnQiLCJyaWdodCIsImNsaWVudFkiLCJ0b3AiLCJib3R0b20iLCJyZXNldE9uTGVhdmUiLCJmbG9vciIsInBvaW50ZXJJZCIsIngiLCJ5IiwidGltZSIsInBlcmZvcm1hbmNlIiwibm93IiwiZGVsdGFYIiwiZGVsdGFZIiwiZWxhcHNlZCIsImFicyIsInN0b3BQcm9wYWdhdGlvbiIsIlByb2R1Y3RPcHRpb25hbEFjdGlvbiIsInJtUHJvZHVjdEFjdGlvbiIsInJldHJ5Q291bnQiLCJyZXRyeVRpbWVyIiwicmVmcmVzaCIsInByb3ZpZGVyIiwiUmFkaWNhbE1hcnRGYXZvcml0ZXMiLCJSYWRpY2FsTWFydENvbXBhcmUiLCJzdXBwb3J0ZWQiLCJ0b2dnbGVQcm9kdWN0IiwiaXNCdWlsZGVyUHJldmlldyIsImZyYW1lTmFtZSIsImZyYW1lRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInBhcmVudCIsInRlc3QiLCJzZXRBdmFpbGFiaWxpdHkiLCJwcmV2aWV3RmFsbGJhY2siLCJtZXRob2QiLCJ0aGVuIiwicHJvZHVjdHMiLCJzb21lIiwic2V0QWN0aXZlIiwicmV0cnlQcm92aWRlciIsInJtUHJvZHVjdEFjdGlvblJlYWR5IiwiYXBpIiwicHJldmlvdXMiLCJyZXN1bHQiLCJQcm9kdWN0Q2FyZERyb3Bkb3duIiwicm1Qcm9kdWN0Q2FyZERyb3Bkb3duUmVhZHkiLCJkaXNwbGF5TW9kZSIsInJtSG92ZXJCcmVha3BvaW50IiwiaG92ZXJCcmVha3BvaW50IiwidmlzaWJsZUZvY3VzYWJsZSIsImhhc0F0dHJpYnV0ZSIsImdldENvbXB1dGVkU3R5bGUiLCJkaXNwbGF5IiwidmlzaWJpbGl0eSIsImdldENsaWVudFJlY3RzIiwidGFiSW5kZXgiLCJQcm9kdWN0Q2FyZFBvc2l0aW9uIiwicm1Qcm9kdWN0Q2FyZFBvc2l0aW9uUmVhZHkiLCJ2aXNpYmlsaXR5TW9kZSIsInBvc2l0aW9uIiwiVmFyaWFudFBpY2tlciIsIm9uUHJvZHVjdCIsImhhbmRsZVBvcFN0YXRlIiwidmlzaWJsZUZpZWxkcyIsImN1cnJlbnQiLCJjdXJyZW50UHJvZHVjdCIsInZpc2libGVTZWxlY3Rpb24iLCJmcm9tRW50cmllcyIsIl9yZWY1Iiwicm1WYXJpYW50c1JlYWR5Iiwic2VsZWN0Iiwicm1GaWVsZCIsInJtVmFsdWUiLCJyZW5kZXJTdGF0ZSIsImluaXRIaXN0b3J5IiwidXBkYXRlVXJsIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImN1cnJlbnRJZCIsInN0YXRlIiwiY3VycmVudFVybCIsInBhdGhuYW1lIiwic2VhcmNoIiwibG9hZFByb2R1Y3QiLCJ3YW50ZWQiLCJhc3NpZ24iLCJzZWxlY3Rpb24iLCJldmVyeSIsIl9yZWY2IiwiZGlzYWJsZVVuYXZhaWxhYmxlIiwiQ1NTIiwiZXNjYXBlIiwiaXNBdmFpbGFibGUiLCJvcHRpb25zIiwic2VsZWN0ZWRMYWJlbCIsIm90aGVyRmllbGRzIiwiX3JlZjciLCJfcmVmOCIsInVwZGF0ZUhpc3RvcnkiLCJwcm9kdWN0U2NvcGUiLCJhYm9ydCIsIkFib3J0Q29udHJvbGxlciIsImNvbnRyb2xsZXIiLCJmdWxsIiwidXJsTW9kZSIsImhpc3RvcnlNZXRob2QiLCJRdWlja1ZpZXciLCJjYWNoZSIsIm1vZGFsIiwic2V0dGluZ3MiLCJidWlsZGVyQ29udGV4dCIsIm1vZGFsQ2xhc3NlcyIsIm9wZW4iLCJ0cmlnZ2VyIiwiZW5zdXJlTW9kYWwiLCJkaWFsb2ciLCJybVF1aWNrVmlld0xhYmVsIiwic2V0TG9hZGluZyIsImNvbnRlbnRNb2RlIiwicmVuZGVyQnVpbGRlckNvbnRlbnQiLCJyZW5kZXIiLCJyZW5kZXJFcnJvciIsImxvYWRCdWlsZGVyUHJvZHVjdCIsImFwcGVuZENoaWxkIiwibW9kYWxDbGFzcyIsIm1vZGFsU2l6ZSIsImNlbnRlciIsIm1vZGFsQ2VudGVyIiwiYmdDbG9zZSIsImVzY0Nsb3NlIiwiY2xvc2UiLCJjb250ZW50UGFkZGluZyIsIm1vYmlsZUZ1bGxzY3JlZW4iLCJvdmVyZmxvd0F1dG8iLCJwYWRkaW5nIiwic2hvd0Nsb3NlIiwiY2xvc2VMYXJnZSIsImNvbXBvbmVudCIsIiRwcm9wcyIsImFsZXJ0IiwiY29udGV4dCIsImxvYWRPcHRpb25zIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJSYWRpY2FsRm9ybSIsIlJhZGljYWxGb3JtQ2xhc3MiLCJsb2FkQWN0aW9ucyIsIm1lZGlhQ29sdW1uIiwiY29udGVudENvbHVtbiIsInJlbmRlck1lZGlhIiwicmVuZGVyQ29udGVudCIsIm1haW4iLCJwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVySWNvbiIsInBsYWNlaG9sZGVyVGV4dCIsInRodW1iIiwidGh1bWJJbmRleCIsImxpZ2h0Ym94UGFuZWwiLCJjYXB0aW9uIiwidGh1bWJzIiwic2hvd0NvZGUiLCJvbGRQcmljZSIsImZpbmFsUHJpY2UiLCJzaG93RGVzY3JpcHRpb24iLCJ2YXJpYW50cyIsInJlbmRlclZhcmlhbnRzIiwic2hvd0NhcnQiLCJyZW5kZXJDYXJ0IiwibW9yZSIsImxlZ2VuZCIsInJvbGUiLCJzd2F0Y2giLCJjb2xvciIsInVwZGF0ZVByb2R1Y3QiLCJyZXBsYWNlV2l0aCIsImNhcnRGZWVkYmFja1RpbWVycyIsIldlYWtNYXAiLCJwcmVwYXJlQ2FydEJ1dHRvbiIsInJtQ2FydE9yaWdpbmFsIiwic2hvd0NhcnRQZW5kaW5nIiwicm1DYXJ0TG9hZGluZyIsInNob3dDYXJ0RmVlZGJhY2siLCJybUNhcnRTdWNjZXNzIiwidGltZXIiLCJyZXNldFBlbmRpbmdDYXJ0QnV0dG9ucyIsImRyb3Bkb3duIiwiZ2FsbGVyeSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=