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
const labels = document.documentElement.lang.toLowerCase().startsWith('ru') ? {
  loading: 'Загрузка…',
  error: 'Не удалось загрузить товар.',
  inStock: 'В наличии',
  outOfStock: 'Нет в наличии',
  quantity: 'Количество',
  addToCart: 'В корзину',
  details: 'Подробнее',
  quickView: 'Быстрый просмотр',
  noImage: 'Нет изображения'
} : {
  loading: 'Loading…',
  error: 'Unable to load product.',
  inStock: 'In stock',
  outOfStock: 'Not available',
  quantity: 'Quantity',
  addToCart: 'Add to cart',
  details: 'Details',
  quickView: 'Quick view',
  noImage: 'No image'
};
const translate = (key, fallback) => {
  const translated = window.Joomla?.Text?._?.(key);
  return translated && translated !== key ? translated : fallback;
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
  if (!data || !data.id) throw new Error('Product data is empty.');
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
  if (!data || !data.html) throw new Error('Quick View layout is empty.');
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
const renderProductSpecifications = function (container) {
  let sourceFieldsets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const showVariants = container.dataset.showVariantFields !== 'false';
  const showTitles = container.dataset.showFieldsetTitles !== 'false';
  const divider = container.dataset.divider !== 'false';
  const striped = container.dataset.striped === 'true';
  const layout = ['description-list', 'table', 'grid'].includes(container.dataset.layout) ? container.dataset.layout : 'description-list';
  const columns = ['1', '2', '3', '4'].includes(container.dataset.columns) ? container.dataset.columns : '2';
  const fieldsets = sourceFieldsets.map(fieldset => ({
    ...fieldset,
    fields: (fieldset.fields || []).filter(field => showVariants || !field.variant)
  })).filter(fieldset => fieldset.fields.length);
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
      section.append(table);
    } else if (layout === 'grid') {
      const grid = element('div', `rm-product-specifications__grid uk-child-width-1-1 uk-child-width-1-${columns}@m${divider ? ' uk-grid-divider' : ''}`, {
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
const setMetaContent = (attribute, name, value) => {
  if (!value) return;
  let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, name);
    document.head.append(node);
  }
  node.setAttribute('content', value);
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
    if (this.product?.id && this.source.dataset.rmProductPage === 'true') {
      if (this.source.dataset.updateDocumentTitle !== 'false' && this.product.title) {
        document.title = this.product.title;
      }
      if (this.source.dataset.updateDocumentMetadata !== 'false') {
        updateProductMetadata(this.product);
      }
    }
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
      if (media.src) node.src = media.src;else node.removeAttribute('src');
      node.alt = media.alt || product.title || '';
      node.hidden = !media.src;
    });
    this.nodes('[data-rm-product-price]').forEach(node => {
      const base = node.querySelector('[data-rm-product-price-base]');
      const final = node.querySelector('[data-rm-product-price-final]');
      const discount = node.querySelector('[data-rm-product-discount]');
      const enabled = Boolean(product.price?.discountEnabled);
      if (base) {
        base.textContent = product.price?.base || '';
        base.hidden = !enabled || node.dataset.showBase !== 'true';
      }
      if (final) final.textContent = product.price?.final || '';
      if (discount) {
        discount.textContent = product.price?.discount || '';
        discount.hidden = !enabled || node.dataset.showDiscount !== 'true';
      }
    });
    this.nodes('[data-rm-product-availability]').forEach(node => {
      node.textContent = product.inStock ? node.dataset.labelIn : node.dataset.labelOut;
      node.classList.toggle('uk-text-success', Boolean(product.inStock));
      node.classList.toggle('uk-text-muted', !product.inStock);
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
    this.scope.dispatchEvent(new CustomEvent('radicalmart:product-change', {
      bubbles: true,
      detail: {
        product: this.product
      }
    }));
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
    return Object.fromEntries(Object.entries(fields).filter(_ref3 => {
      let [alias] = _ref3;
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
    return Object.entries(selection).every(_ref4 => {
      let [alias, value] = _ref4;
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
    const otherFields = Object.entries(this.selected).filter(_ref5 => {
      let [key] = _ref5;
      return key !== alias;
    });
    return this.data.products.some(product => String(product.fields[alias]) === String(value) && otherFields.every(_ref6 => {
      let [key, selected] = _ref6;
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
    button.textContent = cart.dataset.rmCartSuccess || 'Product added to cart';
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
  if (root.matches?.('[data-rm-variants]')) new VariantPicker(root).init();
  root.querySelectorAll?.('[data-rm-variants]').forEach(container => new VariantPicker(container).init());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcHJvZHVjdC1pbnRlcmFjdGlvbnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUM7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05xQztBQUVyQyxNQUFNQSxJQUFJLEdBQUlDLEtBQUssSUFBS0MsUUFBUSxDQUFDQyxjQUFjLENBQUNGLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDNUQsTUFBTUcsS0FBSyxHQUFJSCxLQUFLLElBQUs7RUFDckIsSUFBSUEsS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLSSxTQUFTLEVBQUUsT0FBT0osS0FBSztFQUN2RCxPQUFPLE9BQU9LLGVBQWUsS0FBSyxVQUFVLEdBQ3RDQSxlQUFlLENBQUNMLEtBQUssQ0FBQyxHQUN0Qk0sSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsU0FBUyxDQUFDUixLQUFLLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQsTUFBTVMsWUFBWSxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDO0FBRTlCLE1BQU1DLFFBQVEsR0FBR0EsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUssR0FBR0EsSUFBSSxJQUFJRCxLQUFLLENBQUNFLElBQUksSUFBSUYsS0FBSyxDQUFDRyxHQUFHLElBQUlILEtBQUssQ0FBQ0ksT0FBTyxJQUFJLEVBQUUsRUFBRTtBQUU3RixNQUFNQyxTQUFTLEdBQUdBLENBQUNMLEtBQUssRUFBRUMsSUFBSSxLQUFLO0VBQy9CLE1BQU1LLEdBQUcsR0FBR1AsUUFBUSxDQUFDQyxLQUFLLEVBQUVDLElBQUksQ0FBQztFQUNqQyxJQUFJLENBQUNLLEdBQUcsSUFBSVQsWUFBWSxDQUFDVSxHQUFHLENBQUNELEdBQUcsQ0FBQyxFQUFFLE9BQU9ULFlBQVksQ0FBQ1csR0FBRyxDQUFDRixHQUFHLENBQUMsSUFBSUcsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUVwRixNQUFNQyxTQUFTLEdBQUdYLEtBQUssQ0FBQ0csR0FBRyxHQUFHLElBQUlTLEdBQUcsQ0FBQ1osS0FBSyxDQUFDRyxHQUFHLEVBQUVkLFFBQVEsQ0FBQ3dCLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLEdBQUcsRUFBRTtFQUM1RSxNQUFNQyxRQUFRLEdBQUdKLFNBQVMsR0FDcEJLLEtBQUssQ0FBQ0MsSUFBSSxDQUFDNUIsUUFBUSxDQUFDNkIsZ0JBQWdCLENBQUNqQixJQUFJLEtBQUssT0FBTyxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUNuRmtCLElBQUksQ0FBRUMsSUFBSSxJQUFLLENBQUNuQixJQUFJLEtBQUssT0FBTyxHQUFHbUIsSUFBSSxDQUFDTixJQUFJLEdBQUdNLElBQUksQ0FBQ0MsR0FBRyxNQUFNVixTQUFTLENBQUMsR0FDMUUsSUFBSTtFQUNWLElBQUlJLFFBQVEsRUFBRTtJQUNWLE1BQU1PLEtBQUssR0FBR2IsT0FBTyxDQUFDQyxPQUFPLENBQUMsQ0FBQztJQUMvQmIsWUFBWSxDQUFDMEIsR0FBRyxDQUFDakIsR0FBRyxFQUFFZ0IsS0FBSyxDQUFDO0lBQzVCLE9BQU9BLEtBQUs7RUFDaEI7RUFFQSxJQUFJRixJQUFJLEdBQUcsSUFBSTtFQUNmLE1BQU1FLEtBQUssR0FBRyxJQUFJYixPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFYyxNQUFNLEtBQUs7SUFDM0NKLElBQUksR0FBRy9CLFFBQVEsQ0FBQ29DLGFBQWEsQ0FBQ3hCLElBQUksS0FBSyxPQUFPLElBQUksQ0FBQ0QsS0FBSyxDQUFDRyxHQUFHLEdBQUcsT0FBTyxHQUNoRUYsSUFBSSxLQUFLLE9BQU8sR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQzNDLE1BQU15QixVQUFVLEdBQUcxQixLQUFLLENBQUMwQixVQUFVLElBQUksQ0FBQyxDQUFDO0lBRXpDLElBQUl6QixJQUFJLEtBQUssT0FBTyxJQUFJRCxLQUFLLENBQUNHLEdBQUcsRUFBRTtNQUMvQmlCLElBQUksQ0FBQ08sR0FBRyxHQUFHLFlBQVk7TUFDdkJQLElBQUksQ0FBQ04sSUFBSSxHQUFHZCxLQUFLLENBQUNHLEdBQUc7SUFDekIsQ0FBQyxNQUFNLElBQUlGLElBQUksS0FBSyxRQUFRLElBQUlELEtBQUssQ0FBQ0csR0FBRyxFQUFFO01BQ3ZDaUIsSUFBSSxDQUFDQyxHQUFHLEdBQUdyQixLQUFLLENBQUNHLEdBQUc7SUFDeEIsQ0FBQyxNQUFNO01BQ0hpQixJQUFJLENBQUNRLFdBQVcsR0FBRzVCLEtBQUssQ0FBQ0ksT0FBTyxJQUFJLEVBQUU7SUFDMUM7SUFFQXlCLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDSixVQUFVLENBQUMsQ0FBQ0ssT0FBTyxDQUFDQyxJQUFBLElBQW1CO01BQUEsSUFBbEIsQ0FBQzlCLElBQUksRUFBRWQsS0FBSyxDQUFDLEdBQUE0QyxJQUFBO01BQzdDLElBQUk1QyxLQUFLLEtBQUssS0FBSyxJQUFJQSxLQUFLLEtBQUssSUFBSSxJQUFJQSxLQUFLLEtBQUtJLFNBQVMsRUFBRTtRQUMxRDRCLElBQUksQ0FBQ2EsWUFBWSxDQUFDL0IsSUFBSSxFQUFFZCxLQUFLLEtBQUssSUFBSSxHQUFHLEVBQUUsR0FBRzhDLE1BQU0sQ0FBQzlDLEtBQUssQ0FBQyxDQUFDO01BQ2hFO0lBQ0osQ0FBQyxDQUFDO0lBQ0YsTUFBTStDLEtBQUssR0FBRzlDLFFBQVEsQ0FBQytDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFRCxLQUFLO0lBQ3pFLElBQUlBLEtBQUssRUFBRWYsSUFBSSxDQUFDZSxLQUFLLEdBQUdBLEtBQUs7SUFFN0IsSUFBSW5DLEtBQUssQ0FBQ0csR0FBRyxFQUFFO01BQ1hpQixJQUFJLENBQUNpQixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUzQixPQUFPLEVBQUU7UUFBQzRCLElBQUksRUFBRTtNQUFJLENBQUMsQ0FBQztNQUNwRGxCLElBQUksQ0FBQ2lCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNYixNQUFNLENBQUMsSUFBSWUsS0FBSyxDQUFDLHlCQUF5QnZDLEtBQUssQ0FBQ0csR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQUNtQyxJQUFJLEVBQUU7TUFBSSxDQUFDLENBQUM7SUFDL0c7SUFDQWpELFFBQVEsQ0FBQ21ELElBQUksQ0FBQ0MsTUFBTSxDQUFDckIsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQ3BCLEtBQUssQ0FBQ0csR0FBRyxFQUFFTyxPQUFPLENBQUMsQ0FBQztFQUM3QixDQUFDLENBQUMsQ0FBQ2dDLEtBQUssQ0FBRUMsS0FBSyxJQUFLO0lBQ2hCOUMsWUFBWSxDQUFDK0MsTUFBTSxDQUFDdEMsR0FBRyxDQUFDO0lBQ3hCYyxJQUFJLEVBQUV5QixNQUFNLENBQUMsQ0FBQztJQUNkLE1BQU1GLEtBQUs7RUFDZixDQUFDLENBQUM7RUFDRjlDLFlBQVksQ0FBQzBCLEdBQUcsQ0FBQ2pCLEdBQUcsRUFBRWdCLEtBQUssQ0FBQztFQUM1QixPQUFPQSxLQUFLO0FBQ2hCLENBQUM7QUFFRCxNQUFNd0IsVUFBVSxHQUFHLGVBQUFBLENBQUEsRUFBNkI7RUFBQSxJQUF0QkMsTUFBTSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBeEQsU0FBQSxHQUFBd0QsU0FBQSxNQUFHLENBQUMsQ0FBQztFQUFBLElBQUUvQyxJQUFJLEdBQUErQyxTQUFBLENBQUFDLE1BQUEsT0FBQUQsU0FBQSxNQUFBeEQsU0FBQTtFQUN2QyxLQUFLLE1BQU1RLEtBQUssSUFBSStDLE1BQU0sQ0FBQzlDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNwQyxNQUFNSSxTQUFTLENBQUNMLEtBQUssRUFBRUMsSUFBSSxDQUFDO0VBQ2hDO0FBQ0osQ0FBQztBQUVELE1BQU1pRCx3QkFBd0IsR0FBR0EsQ0FBQSxLQUFNO0VBQ25DLElBQUlDLE1BQU0sQ0FBQ0Msa0JBQWtCLEVBQUU7O0VBRS9CO0VBQ0E7RUFDQTtFQUNBRCxNQUFNLENBQUNDLGtCQUFrQixHQUFHO0lBQ3hCQyxJQUFJLEVBQUU7TUFDRkMsY0FBYyxFQUFFLElBQUk7TUFDcEJDLHdCQUF3QixFQUFFLElBQUk7TUFDOUJDLFlBQVksRUFBRSxJQUFJO01BQ2xCQyxvQkFBb0IsRUFBRSxJQUFJO01BQzFCQyxTQUFTLEVBQUUsSUFBSTtNQUNmQyxVQUFVLEVBQUUsSUFBSTtNQUNoQkMsVUFBVSxFQUFFLElBQUk7TUFDaEJDLFVBQVUsRUFBRSxJQUFJO01BQ2hCQyxVQUFVLEVBQUUsSUFBSTtNQUNoQkMsb0JBQW9CLEVBQUUsSUFBSTtNQUMxQkMsVUFBVSxFQUFFO0lBQ2hCLENBQUM7SUFDREMsUUFBUSxFQUFFO01BQ05DLGlCQUFpQixFQUFFLElBQUk7TUFDdkJWLFlBQVksRUFBRSxJQUFJO01BQ2xCVyxlQUFlLEVBQUUsSUFBSTtNQUNyQkMsdUJBQXVCLEVBQUUsSUFBSTtNQUM3QkMsaUJBQWlCLEVBQUUsSUFBSTtNQUN2QkMsbUJBQW1CLEVBQUUsSUFBSTtNQUN6QkMsa0JBQWtCLEVBQUUsSUFBSTtNQUN4QkMsU0FBUyxFQUFFLElBQUk7TUFDZlIsVUFBVSxFQUFFLElBQUk7TUFDaEJTLG1CQUFtQixFQUFFO0lBQ3pCLENBQUM7SUFDREMsS0FBSyxFQUFFO01BQ0hDLFdBQVcsRUFBRSxJQUFJO01BQ2pCQyxRQUFRLEVBQUUsSUFBSTtNQUNkWixVQUFVLEVBQUU7SUFDaEI7RUFDSixDQUFDO0VBQ0QzRSxRQUFRLENBQUN3RixhQUFhLENBQUMsSUFBSUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFO0lBQ3pFQyxNQUFNLEVBQUU1QixNQUFNLENBQUNDO0VBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELE1BQU00QixNQUFNLEdBQUczRixRQUFRLENBQUM0RixlQUFlLENBQUNDLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQ0MsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHO0VBQzFFQyxPQUFPLEVBQUUsV0FBVztFQUFFMUMsS0FBSyxFQUFFLDZCQUE2QjtFQUFFMkMsT0FBTyxFQUFFLFdBQVc7RUFDaEZDLFVBQVUsRUFBRSxlQUFlO0VBQUVDLFFBQVEsRUFBRSxZQUFZO0VBQUVDLFNBQVMsRUFBRSxXQUFXO0VBQzNFQyxPQUFPLEVBQUUsV0FBVztFQUFFQyxTQUFTLEVBQUUsa0JBQWtCO0VBQUVDLE9BQU8sRUFBRTtBQUNsRSxDQUFDLEdBQUc7RUFDQVAsT0FBTyxFQUFFLFVBQVU7RUFBRTFDLEtBQUssRUFBRSx5QkFBeUI7RUFBRTJDLE9BQU8sRUFBRSxVQUFVO0VBQzFFQyxVQUFVLEVBQUUsZUFBZTtFQUFFQyxRQUFRLEVBQUUsVUFBVTtFQUFFQyxTQUFTLEVBQUUsYUFBYTtFQUMzRUMsT0FBTyxFQUFFLFNBQVM7RUFBRUMsU0FBUyxFQUFFLFlBQVk7RUFBRUMsT0FBTyxFQUFFO0FBQzFELENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUdBLENBQUN2RixHQUFHLEVBQUV3RixRQUFRLEtBQUs7RUFDakMsTUFBTUMsVUFBVSxHQUFHNUMsTUFBTSxDQUFDNkMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLENBQUMsR0FBRzVGLEdBQUcsQ0FBQztFQUNoRCxPQUFPeUYsVUFBVSxJQUFJQSxVQUFVLEtBQUt6RixHQUFHLEdBQUd5RixVQUFVLEdBQUdELFFBQVE7QUFDbkUsQ0FBQztBQUVELE1BQU1LLE9BQU8sR0FBRyxTQUFBQSxDQUFDQyxHQUFHLEVBQXNDO0VBQUEsSUFBcENDLFNBQVMsR0FBQXJELFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUcsRUFBRTtFQUFBLElBQUV0QixVQUFVLEdBQUFzQixTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBeEQsU0FBQSxHQUFBd0QsU0FBQSxNQUFHLENBQUMsQ0FBQztFQUNqRCxNQUFNNUIsSUFBSSxHQUFHL0IsUUFBUSxDQUFDb0MsYUFBYSxDQUFDMkUsR0FBRyxDQUFDO0VBQ3hDLElBQUlDLFNBQVMsRUFBRWpGLElBQUksQ0FBQ2lGLFNBQVMsR0FBR0EsU0FBUztFQUN6Q3hFLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDSixVQUFVLENBQUMsQ0FBQ0ssT0FBTyxDQUFDdUUsS0FBQSxJQUFtQjtJQUFBLElBQWxCLENBQUNwRyxJQUFJLEVBQUVkLEtBQUssQ0FBQyxHQUFBa0gsS0FBQTtJQUM3QyxJQUFJbEgsS0FBSyxLQUFLLElBQUksSUFBSUEsS0FBSyxLQUFLSSxTQUFTLElBQUlKLEtBQUssS0FBSyxLQUFLLEVBQUU7TUFDMURnQyxJQUFJLENBQUNhLFlBQVksQ0FBQy9CLElBQUksRUFBRWQsS0FBSyxLQUFLLElBQUksR0FBRyxFQUFFLEdBQUc4QyxNQUFNLENBQUM5QyxLQUFLLENBQUMsQ0FBQztJQUNoRTtFQUNKLENBQUMsQ0FBQztFQUNGLE9BQU9nQyxJQUFJO0FBQ2YsQ0FBQztBQUVELE1BQU1tRixjQUFjLEdBQUcsZUFBQUEsQ0FBT0MsUUFBUSxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBb0I7RUFBQSxJQUFsQkMsTUFBTSxHQUFBM0QsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXhELFNBQUEsR0FBQXdELFNBQUEsTUFBRyxJQUFJO0VBQ2xFLE1BQU00RCxHQUFHLEdBQUcsSUFBSWhHLEdBQUcsQ0FBQzRGLFFBQVEsRUFBRXJELE1BQU0sQ0FBQzBELFFBQVEsQ0FBQy9GLElBQUksQ0FBQztFQUNuRDhGLEdBQUcsQ0FBQ0UsWUFBWSxDQUFDdkYsR0FBRyxDQUFDLE1BQU0sRUFBRWtGLElBQUksQ0FBQztFQUNsQ0csR0FBRyxDQUFDRSxZQUFZLENBQUN2RixHQUFHLENBQUMsWUFBWSxFQUFFbUYsU0FBUyxDQUFDO0VBRTdDLE1BQU1LLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUNKLEdBQUcsQ0FBQ0ssUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN6Q0MsT0FBTyxFQUFFO01BQUMsUUFBUSxFQUFFLGtCQUFrQjtNQUFFLGtCQUFrQixFQUFFO0lBQWdCLENBQUM7SUFDN0VDLFdBQVcsRUFBRSxhQUFhO0lBQzFCUjtFQUNKLENBQUMsQ0FBQztFQUNGLE1BQU1TLE9BQU8sR0FBRyxNQUFNTCxRQUFRLENBQUNNLElBQUksQ0FBQyxDQUFDO0VBQ3JDLElBQUksQ0FBQ04sUUFBUSxDQUFDTyxFQUFFLElBQUlGLE9BQU8sQ0FBQ0csT0FBTyxLQUFLLEtBQUssRUFBRTtJQUMzQyxNQUFNLElBQUloRixLQUFLLENBQUM2RSxPQUFPLENBQUNJLE9BQU8sSUFBSSxRQUFRVCxRQUFRLENBQUNVLE1BQU0sRUFBRSxDQUFDO0VBQ2pFO0VBRUEsSUFBSUMsSUFBSSxHQUFHTixPQUFPLENBQUNNLElBQUk7RUFDdkIsSUFBSTFHLEtBQUssQ0FBQzJHLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDLElBQUlBLElBQUksQ0FBQ3pFLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBT3lFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUVBLElBQUksR0FBR0EsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUMzRixJQUFJLENBQUNBLElBQUksSUFBSSxDQUFDQSxJQUFJLENBQUNFLEVBQUUsRUFBRSxNQUFNLElBQUlyRixLQUFLLENBQUMsd0JBQXdCLENBQUM7RUFDaEUsT0FBT21GLElBQUk7QUFDZixDQUFDO0FBRUQsTUFBTUcsc0JBQXNCLEdBQUcsZUFBQUEsQ0FBT3JCLFFBQVEsRUFBRUUsU0FBUyxFQUFFb0IsVUFBVSxFQUFvQjtFQUFBLElBQWxCbkIsTUFBTSxHQUFBM0QsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXhELFNBQUEsR0FBQXdELFNBQUEsTUFBRyxJQUFJO0VBQ2hGLE1BQU00RCxHQUFHLEdBQUcsSUFBSWhHLEdBQUcsQ0FBQzRGLFFBQVEsRUFBRXJELE1BQU0sQ0FBQzBELFFBQVEsQ0FBQy9GLElBQUksQ0FBQztFQUNuRDhGLEdBQUcsQ0FBQ0UsWUFBWSxDQUFDdkYsR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQztFQUMvQ3FGLEdBQUcsQ0FBQ0UsWUFBWSxDQUFDdkYsR0FBRyxDQUFDLFlBQVksRUFBRW1GLFNBQVMsQ0FBQztFQUM3Q0UsR0FBRyxDQUFDRSxZQUFZLENBQUN2RixHQUFHLENBQUMsYUFBYSxFQUFFdUcsVUFBVSxDQUFDO0VBRS9DLE1BQU1mLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUNKLEdBQUcsQ0FBQ0ssUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN6Q0MsT0FBTyxFQUFFO01BQUMsUUFBUSxFQUFFLGtCQUFrQjtNQUFFLGtCQUFrQixFQUFFO0lBQWdCLENBQUM7SUFDN0VDLFdBQVcsRUFBRSxhQUFhO0lBQzFCUjtFQUNKLENBQUMsQ0FBQztFQUNGLE1BQU1TLE9BQU8sR0FBRyxNQUFNTCxRQUFRLENBQUNNLElBQUksQ0FBQyxDQUFDO0VBQ3JDLElBQUksQ0FBQ04sUUFBUSxDQUFDTyxFQUFFLElBQUlGLE9BQU8sQ0FBQ0csT0FBTyxLQUFLLEtBQUssRUFBRTtJQUMzQyxNQUFNLElBQUloRixLQUFLLENBQUM2RSxPQUFPLENBQUNJLE9BQU8sSUFBSSxRQUFRVCxRQUFRLENBQUNVLE1BQU0sRUFBRSxDQUFDO0VBQ2pFO0VBRUEsSUFBSUMsSUFBSSxHQUFHTixPQUFPLENBQUNNLElBQUk7RUFDdkIsSUFBSTFHLEtBQUssQ0FBQzJHLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDLElBQUlBLElBQUksQ0FBQ3pFLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBT3lFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUVBLElBQUksR0FBR0EsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUMzRixJQUFJLENBQUNBLElBQUksSUFBSSxDQUFDQSxJQUFJLENBQUNLLElBQUksRUFBRSxNQUFNLElBQUl4RixLQUFLLENBQUMsNkJBQTZCLENBQUM7RUFDdkUsT0FBT21GLElBQUk7QUFDZixDQUFDO0FBRUQsTUFBTU0sbUJBQW1CLEdBQUlDLE1BQU0sSUFBSztFQUNwQyxJQUFJLENBQUNBLE1BQU0sRUFBRSxPQUFPNUksUUFBUTs7RUFFNUI7RUFDQTtFQUNBO0VBQ0EsT0FBTzRJLE1BQU0sQ0FBQ0MsYUFBYSxFQUFFQyxPQUFPLENBQUMseUJBQXlCLENBQUMsSUFBSUYsTUFBTTtBQUM3RSxDQUFDO0FBRUQsTUFBTUcsd0JBQXdCLEdBQUdBLENBQUNoSCxJQUFJLEVBQUVpSCxLQUFLLEtBQUs7RUFDOUNqSCxJQUFJLENBQUNrSCxTQUFTLEdBQUdELEtBQUssQ0FBQ2pKLEtBQUssSUFBSSxFQUFFO0VBQ2xDLElBQUksQ0FBQ2dDLElBQUksQ0FBQ21ILFVBQVUsQ0FBQ3RGLE1BQU0sSUFBSW9GLEtBQUssQ0FBQ2xKLElBQUksRUFBRWlDLElBQUksQ0FBQ3FCLE1BQU0sQ0FBQ3RELElBQUksQ0FBQ2tKLEtBQUssQ0FBQ2xKLElBQUksQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRCxNQUFNcUosMkJBQTJCLEdBQUcsU0FBQUEsQ0FBQ0MsU0FBUyxFQUEyQjtFQUFBLElBQXpCQyxlQUFlLEdBQUExRixTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBeEQsU0FBQSxHQUFBd0QsU0FBQSxNQUFHLEVBQUU7RUFDaEUsTUFBTTJGLFlBQVksR0FBR0YsU0FBUyxDQUFDRyxPQUFPLENBQUNDLGlCQUFpQixLQUFLLE9BQU87RUFDcEUsTUFBTUMsVUFBVSxHQUFHTCxTQUFTLENBQUNHLE9BQU8sQ0FBQ0csa0JBQWtCLEtBQUssT0FBTztFQUNuRSxNQUFNQyxPQUFPLEdBQUdQLFNBQVMsQ0FBQ0csT0FBTyxDQUFDSSxPQUFPLEtBQUssT0FBTztFQUNyRCxNQUFNQyxPQUFPLEdBQUdSLFNBQVMsQ0FBQ0csT0FBTyxDQUFDSyxPQUFPLEtBQUssTUFBTTtFQUNwRCxNQUFNQyxNQUFNLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUNDLFFBQVEsQ0FBQ1YsU0FBUyxDQUFDRyxPQUFPLENBQUNNLE1BQU0sQ0FBQyxHQUNqRlQsU0FBUyxDQUFDRyxPQUFPLENBQUNNLE1BQU0sR0FBRyxrQkFBa0I7RUFDbkQsTUFBTUUsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUNELFFBQVEsQ0FBQ1YsU0FBUyxDQUFDRyxPQUFPLENBQUNRLE9BQU8sQ0FBQyxHQUNsRVgsU0FBUyxDQUFDRyxPQUFPLENBQUNRLE9BQU8sR0FBRyxHQUFHO0VBQ3JDLE1BQU1DLFNBQVMsR0FBR1gsZUFBZSxDQUFDWSxHQUFHLENBQUVDLFFBQVEsS0FBTTtJQUNqRCxHQUFHQSxRQUFRO0lBQ1hDLE1BQU0sRUFBRSxDQUFDRCxRQUFRLENBQUNDLE1BQU0sSUFBSSxFQUFFLEVBQUVDLE1BQU0sQ0FBRXBCLEtBQUssSUFBS00sWUFBWSxJQUFJLENBQUNOLEtBQUssQ0FBQ3FCLE9BQU87RUFDcEYsQ0FBQyxDQUFDLENBQUMsQ0FBQ0QsTUFBTSxDQUFFRixRQUFRLElBQUtBLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDdkcsTUFBTSxDQUFDO0VBQ2hELE1BQU03QyxPQUFPLEdBQUdxSSxTQUFTLENBQUNyRyxhQUFhLENBQUMscUNBQXFDLENBQUM7RUFDOUUsSUFBSSxDQUFDaEMsT0FBTyxFQUFFO0VBRWQsTUFBTXVKLFFBQVEsR0FBR3RLLFFBQVEsQ0FBQ3VLLHNCQUFzQixDQUFDLENBQUM7RUFDbERQLFNBQVMsQ0FBQ3RILE9BQU8sQ0FBRXdILFFBQVEsSUFBSztJQUM1QixNQUFNTSxPQUFPLEdBQUcxRCxPQUFPLENBQUMsU0FBUyxFQUFFLHFDQUFxQyxDQUFDO0lBQ3pFLElBQUkyQyxVQUFVLElBQUlTLFFBQVEsQ0FBQ08sS0FBSyxFQUFFO01BQzlCLE1BQU1DLFNBQVMsR0FBRzVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsd0NBQXdDLENBQUM7TUFDekU0RCxTQUFTLENBQUN0SCxNQUFNLENBQUN0RCxJQUFJLENBQUNvSyxRQUFRLENBQUNPLEtBQUssQ0FBQyxDQUFDO01BQ3RDRCxPQUFPLENBQUNwSCxNQUFNLENBQUNzSCxTQUFTLENBQUM7SUFDN0I7SUFFQSxJQUFJYixNQUFNLEtBQUssT0FBTyxFQUFFO01BQ3BCLE1BQU1jLEtBQUssR0FBRzdELE9BQU8sQ0FBQyxPQUFPLEVBQUUsMkRBQTJENkMsT0FBTyxHQUFHLG1CQUFtQixHQUFHLEVBQUUsR0FBR0MsT0FBTyxHQUFHLG1CQUFtQixHQUFHLEVBQUUsRUFBRSxDQUFDO01BQ3BLLE1BQU1nQixJQUFJLEdBQUc1SyxRQUFRLENBQUNvQyxhQUFhLENBQUMsT0FBTyxDQUFDO01BQzVDOEgsUUFBUSxDQUFDQyxNQUFNLENBQUN6SCxPQUFPLENBQUVzRyxLQUFLLElBQUs7UUFDL0IsTUFBTTZCLEdBQUcsR0FBRy9ELE9BQU8sQ0FBQyxJQUFJLEVBQUUsaUNBQWlDLENBQUM7UUFDNUQsTUFBTWdFLEtBQUssR0FBR2hFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0NBQWtDLEVBQUU7VUFBQ2lFLEtBQUssRUFBRTtRQUFLLENBQUMsQ0FBQztRQUMvRSxNQUFNaEwsS0FBSyxHQUFHK0csT0FBTyxDQUFDLElBQUksRUFBRSxrQ0FBa0MsQ0FBQztRQUMvRGdFLEtBQUssQ0FBQzFILE1BQU0sQ0FBQ3RELElBQUksQ0FBQ2tKLEtBQUssQ0FBQ3lCLEtBQUssQ0FBQyxDQUFDO1FBQy9CMUIsd0JBQXdCLENBQUNoSixLQUFLLEVBQUVpSixLQUFLLENBQUM7UUFDdEM2QixHQUFHLENBQUN6SCxNQUFNLENBQUMwSCxLQUFLLEVBQUUvSyxLQUFLLENBQUM7UUFDeEI2SyxJQUFJLENBQUN4SCxNQUFNLENBQUN5SCxHQUFHLENBQUM7TUFDcEIsQ0FBQyxDQUFDO01BQ0ZGLEtBQUssQ0FBQ3ZILE1BQU0sQ0FBQ3dILElBQUksQ0FBQztNQUNsQkosT0FBTyxDQUFDcEgsTUFBTSxDQUFDdUgsS0FBSyxDQUFDO0lBQ3pCLENBQUMsTUFBTSxJQUFJZCxNQUFNLEtBQUssTUFBTSxFQUFFO01BQzFCLE1BQU1tQixJQUFJLEdBQUdsRSxPQUFPLENBQUMsS0FBSyxFQUFFLHVFQUF1RWlELE9BQU8sS0FBS0osT0FBTyxHQUFHLGtCQUFrQixHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQUMsU0FBUyxFQUFFO01BQUksQ0FBQyxDQUFDO01BQ3RLTyxRQUFRLENBQUNDLE1BQU0sQ0FBQ3pILE9BQU8sQ0FBRXNHLEtBQUssSUFBSztRQUMvQixNQUFNaUMsSUFBSSxHQUFHbkUsT0FBTyxDQUFDLEtBQUssRUFBRSxpQ0FBaUMsQ0FBQztRQUM5RCxNQUFNZ0UsS0FBSyxHQUFHaEUsT0FBTyxDQUFDLEtBQUssRUFBRSwrQ0FBK0MsQ0FBQztRQUM3RSxNQUFNL0csS0FBSyxHQUFHK0csT0FBTyxDQUFDLEtBQUssRUFBRSxzREFBc0QsQ0FBQztRQUNwRmdFLEtBQUssQ0FBQzFILE1BQU0sQ0FBQ3RELElBQUksQ0FBQ2tKLEtBQUssQ0FBQ3lCLEtBQUssQ0FBQyxDQUFDO1FBQy9CMUIsd0JBQXdCLENBQUNoSixLQUFLLEVBQUVpSixLQUFLLENBQUM7UUFDdENpQyxJQUFJLENBQUM3SCxNQUFNLENBQUMwSCxLQUFLLEVBQUUvSyxLQUFLLENBQUM7UUFDekJpTCxJQUFJLENBQUM1SCxNQUFNLENBQUM2SCxJQUFJLENBQUM7TUFDckIsQ0FBQyxDQUFDO01BQ0ZULE9BQU8sQ0FBQ3BILE1BQU0sQ0FBQzRILElBQUksQ0FBQztJQUN4QixDQUFDLE1BQU07TUFDSCxNQUFNRSxJQUFJLEdBQUdwRSxPQUFPLENBQUMsSUFBSSxFQUFFLHNEQUFzRDZDLE9BQU8sR0FBRyw4QkFBOEIsR0FBRyxFQUFFLEVBQUUsQ0FBQztNQUNqSU8sUUFBUSxDQUFDQyxNQUFNLENBQUN6SCxPQUFPLENBQUVzRyxLQUFLLElBQUs7UUFDL0IsTUFBTWlDLElBQUksR0FBR25FLE9BQU8sQ0FBQyxLQUFLLEVBQUUsaUNBQWlDLENBQUM7UUFDOUQsTUFBTWdFLEtBQUssR0FBR2hFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0NBQWtDLENBQUM7UUFDL0QsTUFBTS9HLEtBQUssR0FBRytHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0NBQWtDLENBQUM7UUFDL0RnRSxLQUFLLENBQUMxSCxNQUFNLENBQUN0RCxJQUFJLENBQUNrSixLQUFLLENBQUN5QixLQUFLLENBQUMsQ0FBQztRQUMvQjFCLHdCQUF3QixDQUFDaEosS0FBSyxFQUFFaUosS0FBSyxDQUFDO1FBQ3RDaUMsSUFBSSxDQUFDN0gsTUFBTSxDQUFDMEgsS0FBSyxFQUFFL0ssS0FBSyxDQUFDO1FBQ3pCbUwsSUFBSSxDQUFDOUgsTUFBTSxDQUFDNkgsSUFBSSxDQUFDO01BQ3JCLENBQUMsQ0FBQztNQUNGVCxPQUFPLENBQUNwSCxNQUFNLENBQUM4SCxJQUFJLENBQUM7SUFDeEI7SUFDQVosUUFBUSxDQUFDbEgsTUFBTSxDQUFDb0gsT0FBTyxDQUFDO0VBQzVCLENBQUMsQ0FBQztFQUVGekosT0FBTyxDQUFDb0ssZUFBZSxDQUFDYixRQUFRLENBQUM7RUFDakNsQixTQUFTLENBQUNnQyxNQUFNLEdBQUdwQixTQUFTLENBQUNwRyxNQUFNLEtBQUssQ0FBQztFQUN6Q0UsTUFBTSxDQUFDdUgsS0FBSyxFQUFFQyxNQUFNLEdBQUdsQyxTQUFTLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU1tQyxjQUFjLEdBQUdBLENBQUNDLFNBQVMsRUFBRTNLLElBQUksRUFBRWQsS0FBSyxLQUFLO0VBQy9DLElBQUksQ0FBQ0EsS0FBSyxFQUFFO0VBQ1osSUFBSWdDLElBQUksR0FBRy9CLFFBQVEsQ0FBQ21ELElBQUksQ0FBQ0osYUFBYSxDQUFDLFFBQVF5SSxTQUFTLEtBQUszSyxJQUFJLElBQUksQ0FBQztFQUN0RSxJQUFJLENBQUNrQixJQUFJLEVBQUU7SUFDUEEsSUFBSSxHQUFHL0IsUUFBUSxDQUFDb0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNyQ0wsSUFBSSxDQUFDYSxZQUFZLENBQUM0SSxTQUFTLEVBQUUzSyxJQUFJLENBQUM7SUFDbENiLFFBQVEsQ0FBQ21ELElBQUksQ0FBQ0MsTUFBTSxDQUFDckIsSUFBSSxDQUFDO0VBQzlCO0VBQ0FBLElBQUksQ0FBQ2EsWUFBWSxDQUFDLFNBQVMsRUFBRTdDLEtBQUssQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTTBMLHFCQUFxQixHQUFJQyxPQUFPLElBQUs7RUFDdkMsTUFBTUMsV0FBVyxHQUFHOUksTUFBTSxDQUFDNkksT0FBTyxDQUFDRSxTQUFTLElBQUksRUFBRSxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQzFELE1BQU1DLEtBQUssR0FBR0osT0FBTyxDQUFDSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUvSixHQUFHLElBQUksRUFBRTtFQUMzQyxNQUFNZ0ssSUFBSSxHQUFHTixPQUFPLENBQUNNLElBQUksR0FBRyxJQUFJekssR0FBRyxDQUFDbUssT0FBTyxDQUFDTSxJQUFJLEVBQUVoTSxRQUFRLENBQUN3QixPQUFPLENBQUMsQ0FBQ0MsSUFBSSxHQUFHLEVBQUU7RUFDN0UsSUFBSXdLLFNBQVMsR0FBR2pNLFFBQVEsQ0FBQ21ELElBQUksQ0FBQ0osYUFBYSxDQUFDLHVCQUF1QixDQUFDO0VBRXBFLElBQUksQ0FBQ2tKLFNBQVMsSUFBSUQsSUFBSSxFQUFFO0lBQ3BCQyxTQUFTLEdBQUdqTSxRQUFRLENBQUNvQyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQzFDNkosU0FBUyxDQUFDM0osR0FBRyxHQUFHLFdBQVc7SUFDM0J0QyxRQUFRLENBQUNtRCxJQUFJLENBQUNDLE1BQU0sQ0FBQzZJLFNBQVMsQ0FBQztFQUNuQztFQUNBLElBQUlBLFNBQVMsSUFBSUQsSUFBSSxFQUFFQyxTQUFTLENBQUN4SyxJQUFJLEdBQUd1SyxJQUFJO0VBQzVDVCxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRUksV0FBVyxDQUFDO0VBQ2xESixjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRUcsT0FBTyxDQUFDakIsS0FBSyxJQUFJLEVBQUUsQ0FBQztFQUMzRGMsY0FBYyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRUksV0FBVyxDQUFDO0VBQ3pESixjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRVMsSUFBSSxDQUFDO0VBQzFDVCxjQUFjLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRU8sS0FBSyxHQUFHLElBQUl2SyxHQUFHLENBQUN1SyxLQUFLLEVBQUU5TCxRQUFRLENBQUN3QixPQUFPLENBQUMsQ0FBQ0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztFQUMxRjhKLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFRyxPQUFPLENBQUNqQixLQUFLLElBQUksRUFBRSxDQUFDO0VBQzVEYyxjQUFjLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFSSxXQUFXLENBQUM7RUFDMURKLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFTyxLQUFLLEdBQUcsSUFBSXZLLEdBQUcsQ0FBQ3VLLEtBQUssRUFBRTlMLFFBQVEsQ0FBQ3dCLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9GLENBQUM7QUFFRCxNQUFNeUssWUFBWSxDQUFDO0VBQ2ZDLFdBQVdBLENBQUN2RCxNQUFNLEVBQUU7SUFDaEIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDbUMsS0FBSyxHQUFHcEMsbUJBQW1CLENBQUNDLE1BQU0sQ0FBQztJQUN4QyxJQUFJLENBQUM4QyxPQUFPLEdBQUcsSUFBSSxDQUFDVSxRQUFRLENBQUMsQ0FBQztFQUNsQztFQUVBQSxRQUFRQSxDQUFBLEVBQUc7SUFDUCxNQUFNL0QsSUFBSSxHQUFHMUcsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDZ0gsTUFBTSxDQUFDeUQsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUM5Q3ZLLElBQUksQ0FBRUMsSUFBSSxJQUFLQSxJQUFJLENBQUN1SyxTQUFTLEVBQUVDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUNyRHhLLElBQUksQ0FBQ3VLLFNBQVMsRUFBRUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDN0QsSUFBSTtNQUNBLE9BQU9sTSxJQUFJLENBQUNDLEtBQUssQ0FBQytILElBQUksRUFBRTlGLFdBQVcsSUFBSSxJQUFJLENBQUM7SUFDaEQsQ0FBQyxDQUFDLE9BQU9lLEtBQUssRUFBRTtNQUNaLE9BQU8sSUFBSTtJQUNmO0VBQ0o7RUFFQWtKLEtBQUtBLENBQUNDLFFBQVEsRUFBRTtJQUNaLE9BQU85SyxLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNtSixLQUFLLENBQUNsSixnQkFBZ0IsQ0FBQzRLLFFBQVEsQ0FBQyxDQUFDLENBQ25EckMsTUFBTSxDQUFFckksSUFBSSxJQUFLO01BQ2QsTUFBTTJLLEtBQUssR0FBRzNLLElBQUksQ0FBQytHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztNQUNyRCxPQUFPNEQsS0FBSyxLQUFLLElBQUksQ0FBQzlELE1BQU0sSUFBSyxDQUFDOEQsS0FBSyxJQUFJLElBQUksQ0FBQzNCLEtBQUssS0FBSyxJQUFJLENBQUNuQyxNQUFPO0lBQzFFLENBQUMsQ0FBQztFQUNWO0VBRUErRCxJQUFJQSxDQUFBLEVBQUc7SUFDSCxJQUFJLElBQUksQ0FBQy9ELE1BQU0sQ0FBQ1csT0FBTyxDQUFDcUQsbUJBQW1CLEVBQUU7SUFDN0MsSUFBSSxDQUFDaEUsTUFBTSxDQUFDVyxPQUFPLENBQUNxRCxtQkFBbUIsR0FBRyxNQUFNO0lBQ2hELElBQUksQ0FBQ2hFLE1BQU0sQ0FBQzVGLGdCQUFnQixDQUFDLDRCQUE0QixFQUFHNkosS0FBSyxJQUFLO01BQ2xFLElBQUlBLEtBQUssQ0FBQ0MsTUFBTSxDQUFDaEUsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEtBQUssSUFBSSxDQUFDRixNQUFNLEVBQUU7TUFDckUsSUFBSWlFLEtBQUssQ0FBQ25ILE1BQU0sRUFBRWdHLE9BQU8sRUFBRW5ELEVBQUUsRUFBRSxJQUFJLENBQUN3RSxZQUFZLENBQUNGLEtBQUssQ0FBQ25ILE1BQU0sQ0FBQ2dHLE9BQU8sQ0FBQztJQUMxRSxDQUFDLENBQUM7SUFDRixJQUFJLElBQUksQ0FBQ0EsT0FBTyxFQUFFbkQsRUFBRSxJQUFJLElBQUksQ0FBQ0ssTUFBTSxDQUFDVyxPQUFPLENBQUN5RCxhQUFhLEtBQUssTUFBTSxFQUFFO01BQ2xFLElBQUksSUFBSSxDQUFDcEUsTUFBTSxDQUFDVyxPQUFPLENBQUMwRCxtQkFBbUIsS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDdkIsT0FBTyxDQUFDakIsS0FBSyxFQUFFO1FBQzNFekssUUFBUSxDQUFDeUssS0FBSyxHQUFHLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2pCLEtBQUs7TUFDdkM7TUFDQSxJQUFJLElBQUksQ0FBQzdCLE1BQU0sQ0FBQ1csT0FBTyxDQUFDMkQsc0JBQXNCLEtBQUssT0FBTyxFQUFFO1FBQ3hEekIscUJBQXFCLENBQUMsSUFBSSxDQUFDQyxPQUFPLENBQUM7TUFDdkM7SUFDSjtFQUNKO0VBRUFxQixZQUFZQSxDQUFDckIsT0FBTyxFQUFFO0lBQ2xCLElBQUksQ0FBQ0EsT0FBTyxHQUFHO01BQUMsR0FBRyxJQUFJLENBQUNBLE9BQU87TUFBRSxHQUFHQTtJQUFPLENBQUM7SUFDNUMsSUFBSSxDQUFDOUMsTUFBTSxDQUFDVyxPQUFPLENBQUM0RCxXQUFXLEdBQUd0SyxNQUFNLENBQUM2SSxPQUFPLENBQUNuRCxFQUFFLENBQUM7SUFFcEQsSUFBSSxDQUFDaUUsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM5SixPQUFPLENBQUVYLElBQUksSUFBSztNQUNwREEsSUFBSSxDQUFDUSxXQUFXLEdBQUdtSixPQUFPLENBQUNqQixLQUFLLElBQUksRUFBRTtJQUMxQyxDQUFDLENBQUM7SUFDRixJQUFJLENBQUMrQixLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQzlKLE9BQU8sQ0FBRVgsSUFBSSxJQUFLO01BQ25EQSxJQUFJLENBQUNRLFdBQVcsR0FBR21KLE9BQU8sQ0FBQzBCLElBQUksSUFBSSxFQUFFO0lBQ3pDLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQ1osS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM5SixPQUFPLENBQUVYLElBQUksSUFBSztNQUMxREEsSUFBSSxDQUFDa0gsU0FBUyxHQUFHeUMsT0FBTyxDQUFDMkIsYUFBYSxJQUFJM0IsT0FBTyxDQUFDRSxTQUFTLElBQUksRUFBRTtJQUNyRSxDQUFDLENBQUM7SUFDRixJQUFJLENBQUNZLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDOUosT0FBTyxDQUFFWCxJQUFJLElBQUs7TUFDL0RBLElBQUksQ0FBQ2tILFNBQVMsR0FBR3lDLE9BQU8sQ0FBQzRCLFlBQVksSUFBSTVCLE9BQU8sQ0FBQzZCLFFBQVEsSUFBSSxFQUFFO0lBQ25FLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQ2YsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM5SixPQUFPLENBQUVYLElBQUksSUFBSztNQUNuRCxJQUFJMkosT0FBTyxDQUFDTSxJQUFJLEVBQUVqSyxJQUFJLENBQUNOLElBQUksR0FBR2lLLE9BQU8sQ0FBQ00sSUFBSTtJQUM5QyxDQUFDLENBQUM7SUFFRixNQUFNRCxLQUFLLEdBQUdMLE9BQU8sQ0FBQ0ssS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUNTLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOUosT0FBTyxDQUFFWCxJQUFJLElBQUs7TUFDcEQsSUFBSWdLLEtBQUssQ0FBQy9KLEdBQUcsRUFBRUQsSUFBSSxDQUFDQyxHQUFHLEdBQUcrSixLQUFLLENBQUMvSixHQUFHLENBQUMsS0FDL0JELElBQUksQ0FBQ3lMLGVBQWUsQ0FBQyxLQUFLLENBQUM7TUFDaEN6TCxJQUFJLENBQUMwTCxHQUFHLEdBQUcxQixLQUFLLENBQUMwQixHQUFHLElBQUkvQixPQUFPLENBQUNqQixLQUFLLElBQUksRUFBRTtNQUMzQzFJLElBQUksQ0FBQ3FKLE1BQU0sR0FBRyxDQUFDVyxLQUFLLENBQUMvSixHQUFHO0lBQzVCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ3dLLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOUosT0FBTyxDQUFFWCxJQUFJLElBQUs7TUFDcEQsTUFBTTJMLElBQUksR0FBRzNMLElBQUksQ0FBQ2dCLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztNQUMvRCxNQUFNNEssS0FBSyxHQUFHNUwsSUFBSSxDQUFDZ0IsYUFBYSxDQUFDLCtCQUErQixDQUFDO01BQ2pFLE1BQU02SyxRQUFRLEdBQUc3TCxJQUFJLENBQUNnQixhQUFhLENBQUMsNEJBQTRCLENBQUM7TUFDakUsTUFBTThLLE9BQU8sR0FBR0MsT0FBTyxDQUFDcEMsT0FBTyxDQUFDcUMsS0FBSyxFQUFFQyxlQUFlLENBQUM7TUFDdkQsSUFBSU4sSUFBSSxFQUFFO1FBQ05BLElBQUksQ0FBQ25MLFdBQVcsR0FBR21KLE9BQU8sQ0FBQ3FDLEtBQUssRUFBRUwsSUFBSSxJQUFJLEVBQUU7UUFDNUNBLElBQUksQ0FBQ3RDLE1BQU0sR0FBRyxDQUFDeUMsT0FBTyxJQUFJOUwsSUFBSSxDQUFDd0gsT0FBTyxDQUFDMEUsUUFBUSxLQUFLLE1BQU07TUFDOUQ7TUFDQSxJQUFJTixLQUFLLEVBQUVBLEtBQUssQ0FBQ3BMLFdBQVcsR0FBR21KLE9BQU8sQ0FBQ3FDLEtBQUssRUFBRUosS0FBSyxJQUFJLEVBQUU7TUFDekQsSUFBSUMsUUFBUSxFQUFFO1FBQ1ZBLFFBQVEsQ0FBQ3JMLFdBQVcsR0FBR21KLE9BQU8sQ0FBQ3FDLEtBQUssRUFBRUgsUUFBUSxJQUFJLEVBQUU7UUFDcERBLFFBQVEsQ0FBQ3hDLE1BQU0sR0FBRyxDQUFDeUMsT0FBTyxJQUFJOUwsSUFBSSxDQUFDd0gsT0FBTyxDQUFDMkUsWUFBWSxLQUFLLE1BQU07TUFDdEU7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJLENBQUMxQixLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzlKLE9BQU8sQ0FBRVgsSUFBSSxJQUFLO01BQzNEQSxJQUFJLENBQUNRLFdBQVcsR0FBR21KLE9BQU8sQ0FBQ3pGLE9BQU8sR0FBR2xFLElBQUksQ0FBQ3dILE9BQU8sQ0FBQzRFLE9BQU8sR0FBR3BNLElBQUksQ0FBQ3dILE9BQU8sQ0FBQzZFLFFBQVE7TUFDakZyTSxJQUFJLENBQUN1SyxTQUFTLENBQUMrQixNQUFNLENBQUMsaUJBQWlCLEVBQUVQLE9BQU8sQ0FBQ3BDLE9BQU8sQ0FBQ3pGLE9BQU8sQ0FBQyxDQUFDO01BQ2xFbEUsSUFBSSxDQUFDdUssU0FBUyxDQUFDK0IsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDM0MsT0FBTyxDQUFDekYsT0FBTyxDQUFDO0lBQzVELENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ3VHLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDOUosT0FBTyxDQUFFc0IsSUFBSSxJQUFLO01BQzVGQSxJQUFJLENBQUN1RixPQUFPLENBQUNoQixFQUFFLEdBQUcxRixNQUFNLENBQUM2SSxPQUFPLENBQUNuRCxFQUFFLENBQUM7TUFDcEN2RSxJQUFJLENBQUN1RixPQUFPLENBQUMrRSxnQkFBZ0IsR0FBRyxNQUFNO01BQ3RDLE1BQU1uSSxRQUFRLEdBQUduQyxJQUFJLENBQUNqQixhQUFhLENBQUMsbUVBQW1FLENBQUM7TUFDeEcsSUFBSW9ELFFBQVEsRUFBRTtRQUNWQSxRQUFRLENBQUNvSSxHQUFHLEdBQUc3QyxPQUFPLENBQUN2RixRQUFRLEVBQUVvSSxHQUFHLElBQUksQ0FBQztRQUN6Q3BJLFFBQVEsQ0FBQ3FJLElBQUksR0FBRzlDLE9BQU8sQ0FBQ3ZGLFFBQVEsRUFBRXFJLElBQUksSUFBSSxDQUFDO1FBQzNDLElBQUk5QyxPQUFPLENBQUN2RixRQUFRLEVBQUVzSSxHQUFHLEVBQUV0SSxRQUFRLENBQUNzSSxHQUFHLEdBQUcvQyxPQUFPLENBQUN2RixRQUFRLENBQUNzSSxHQUFHLENBQUMsS0FDMUR0SSxRQUFRLENBQUNxSCxlQUFlLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUlrQixNQUFNLENBQUN2SSxRQUFRLENBQUNwRyxLQUFLLENBQUMsR0FBRzJPLE1BQU0sQ0FBQ3ZJLFFBQVEsQ0FBQ29JLEdBQUcsQ0FBQyxFQUFFcEksUUFBUSxDQUFDcEcsS0FBSyxHQUFHb0csUUFBUSxDQUFDb0ksR0FBRztNQUNwRjtNQUNBdkssSUFBSSxDQUFDbkMsZ0JBQWdCLENBQUMseURBQXlELENBQUMsQ0FDM0VhLE9BQU8sQ0FBRWlNLE1BQU0sSUFBSztRQUFFQSxNQUFNLENBQUNDLFFBQVEsR0FBRyxDQUFDbEQsT0FBTyxDQUFDekYsT0FBTztNQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUM7SUFFRixJQUFJLENBQUN1RyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQzlKLE9BQU8sQ0FBRVgsSUFBSSxJQUFLO01BQzdEb0gsMkJBQTJCLENBQUNwSCxJQUFJLEVBQUUySixPQUFPLENBQUMxQixTQUFTLElBQUksRUFBRSxDQUFDO0lBQzlELENBQUMsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDcEIsTUFBTSxDQUFDVyxPQUFPLENBQUN5RCxhQUFhLEtBQUssTUFBTSxJQUN6QyxJQUFJLENBQUNwRSxNQUFNLENBQUNXLE9BQU8sQ0FBQzBELG1CQUFtQixLQUFLLE9BQU8sSUFDbkR2QixPQUFPLENBQUNqQixLQUFLLEVBQUU7TUFDbEJ6SyxRQUFRLENBQUN5SyxLQUFLLEdBQUdpQixPQUFPLENBQUNqQixLQUFLO0lBQ2xDO0lBQ0EsSUFBSSxJQUFJLENBQUM3QixNQUFNLENBQUNXLE9BQU8sQ0FBQ3lELGFBQWEsS0FBSyxNQUFNLElBQ3pDLElBQUksQ0FBQ3BFLE1BQU0sQ0FBQ1csT0FBTyxDQUFDMkQsc0JBQXNCLEtBQUssT0FBTyxFQUFFO01BQzNEekIscUJBQXFCLENBQUMsSUFBSSxDQUFDQyxPQUFPLENBQUM7SUFDdkM7SUFFQSxJQUFJLENBQUNYLEtBQUssQ0FBQ3ZGLGFBQWEsQ0FBQyxJQUFJQyxXQUFXLENBQUMsNEJBQTRCLEVBQUU7TUFDbkVvSixPQUFPLEVBQUUsSUFBSTtNQUNibkosTUFBTSxFQUFFO1FBQUNnRyxPQUFPLEVBQUUsSUFBSSxDQUFDQTtNQUFPO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0VBQ1A7QUFDSjtBQUVBLE1BQU1vRCxtQkFBbUIsQ0FBQztFQUN0QjNDLFdBQVdBLENBQUNyRixPQUFPLEVBQUU7SUFDakIsSUFBSSxDQUFDQSxPQUFPLEdBQUdBLE9BQU87RUFDMUI7RUFFQTZGLElBQUlBLENBQUEsRUFBRztJQUNILElBQUksSUFBSSxDQUFDN0YsT0FBTyxDQUFDeUMsT0FBTyxDQUFDd0YsMEJBQTBCLEVBQUU7SUFDckQsSUFBSSxDQUFDakksT0FBTyxDQUFDeUMsT0FBTyxDQUFDd0YsMEJBQTBCLEdBQUcsTUFBTTtJQUN4RCxJQUFJLElBQUksQ0FBQ2pJLE9BQU8sQ0FBQ3lDLE9BQU8sQ0FBQ3lGLFdBQVcsS0FBSyxPQUFPLEVBQUU7SUFFbEQsTUFBTXBHLE1BQU0sR0FBRyxJQUFJLENBQUM5QixPQUFPLENBQUNnQyxPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDOUQsTUFBTTRELEtBQUssR0FBRzlELE1BQU0sR0FDZEQsbUJBQW1CLENBQUNDLE1BQU0sQ0FBQyxHQUMzQixJQUFJLENBQUM5QixPQUFPLENBQUMrQixhQUFhLEVBQUVDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQztJQUNqRixJQUFJLENBQUM0RCxLQUFLLElBQUlBLEtBQUssS0FBSyxJQUFJLENBQUM1RixPQUFPLEVBQUU7SUFFdEM0RixLQUFLLENBQUNKLFNBQVMsQ0FBQzJDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztJQUM3Q3ZDLEtBQUssQ0FBQ25ELE9BQU8sQ0FBQzJGLGlCQUFpQixHQUFHLElBQUksQ0FBQ3BJLE9BQU8sQ0FBQ3lDLE9BQU8sQ0FBQzRGLGVBQWUsSUFBSSxHQUFHO0VBQ2pGO0FBQ0o7QUFFQSxNQUFNQyxhQUFhLENBQUM7RUFDaEJqRCxXQUFXQSxDQUFDL0MsU0FBUyxFQUFpQztJQUFBLElBQS9CZixJQUFJLEdBQUExRSxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBeEQsU0FBQSxHQUFBd0QsU0FBQSxNQUFHLElBQUk7SUFBQSxJQUFFMEwsU0FBUyxHQUFBMUwsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXhELFNBQUEsR0FBQXdELFNBQUEsTUFBRyxJQUFJO0lBQ2hELElBQUksQ0FBQ3lGLFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNmLElBQUksR0FBR0EsSUFBSSxJQUFJLElBQUksQ0FBQytELFFBQVEsQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQ2lELFNBQVMsR0FBR0EsU0FBUztJQUMxQixJQUFJLENBQUNDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDQyxPQUFPLEdBQUcsSUFBSTtJQUN6QixJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNwRCxJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUN0SCxJQUFJLEVBQUU4QixNQUFNLElBQUksRUFBRSxFQUFFRixHQUFHLENBQUVqQixLQUFLLElBQUtuRyxNQUFNLENBQUNtRyxLQUFLLENBQUM0RyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXJGLE1BQU1DLE9BQU8sR0FBRyxJQUFJLENBQUN4SCxJQUFJLEVBQUV5SCxRQUFRLEVBQUVoTyxJQUFJLENBQUU0SixPQUFPLElBQUtnRCxNQUFNLENBQUNoRCxPQUFPLENBQUNuRCxFQUFFLENBQUMsS0FBS21HLE1BQU0sQ0FBQyxJQUFJLENBQUNyRyxJQUFJLENBQUMwSCxjQUFjLENBQUMsQ0FBQztJQUNySCxJQUFJRixPQUFPLEVBQUU7TUFDWixJQUFJLENBQUNQLFFBQVEsR0FBRyxJQUFJLENBQUNVLGdCQUFnQixDQUFDSCxPQUFPLENBQUMxRixNQUFNLENBQUM7SUFDdEQ7RUFDRTtFQUVINkYsZ0JBQWdCQSxDQUFBLEVBQWM7SUFBQSxJQUFiN0YsTUFBTSxHQUFBeEcsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXhELFNBQUEsR0FBQXdELFNBQUEsTUFBRyxDQUFDLENBQUM7SUFDM0IsT0FBT25CLE1BQU0sQ0FBQ3lOLFdBQVcsQ0FDeEJ6TixNQUFNLENBQUNDLE9BQU8sQ0FBQzBILE1BQU0sQ0FBQyxDQUFDQyxNQUFNLENBQUM4RixLQUFBO01BQUEsSUFBQyxDQUFDTixLQUFLLENBQUMsR0FBQU0sS0FBQTtNQUFBLE9BQUssSUFBSSxDQUFDUixhQUFhLENBQUN4TyxHQUFHLENBQUMyQixNQUFNLENBQUMrTSxLQUFLLENBQUMsQ0FBQztJQUFBLEVBQ2pGLENBQUM7RUFDRjtFQUVHeEQsUUFBUUEsQ0FBQSxFQUFHO0lBQ1AsSUFBSTtNQUNBLE9BQU8vTCxJQUFJLENBQUNDLEtBQUssQ0FBQyxJQUFJLENBQUM4SSxTQUFTLENBQUNyRyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRVIsV0FBVyxJQUFJLElBQUksQ0FBQztJQUM3RixDQUFDLENBQUMsT0FBT2UsS0FBSyxFQUFFO01BQ1osT0FBTyxJQUFJO0lBQ2Y7RUFDSjtFQUVBcUosSUFBSUEsQ0FBQSxFQUFHO0lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ3RFLElBQUksRUFBRThCLE1BQU0sRUFBRXZHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQ3lFLElBQUksRUFBRXlILFFBQVEsRUFBRWxNLE1BQU0sSUFBSSxJQUFJLENBQUN3RixTQUFTLENBQUNHLE9BQU8sQ0FBQzRHLGVBQWUsRUFBRTtJQUMxRyxJQUFJLENBQUMvRyxTQUFTLENBQUNHLE9BQU8sQ0FBQzRHLGVBQWUsR0FBRyxNQUFNO0lBRS9DLElBQUksQ0FBQy9HLFNBQVMsQ0FBQ3BHLGdCQUFnQixDQUFDLE9BQU8sRUFBRzZKLEtBQUssSUFBSztNQUNoRCxNQUFNdUQsTUFBTSxHQUFHdkQsS0FBSyxDQUFDQyxNQUFNLENBQUNoRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7TUFDdEQsSUFBSSxDQUFDc0gsTUFBTSxJQUFJQSxNQUFNLENBQUN4QixRQUFRLEVBQUU7TUFDaEMsTUFBTTVGLEtBQUssR0FBR29ILE1BQU0sQ0FBQ3RILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztNQUMvQyxJQUFJRSxLQUFLLEVBQUUsSUFBSSxDQUFDcUgsTUFBTSxDQUFDckgsS0FBSyxDQUFDTyxPQUFPLENBQUMrRyxPQUFPLEVBQUVGLE1BQU0sQ0FBQzdHLE9BQU8sQ0FBQ2dILE9BQU8sQ0FBQztJQUN6RSxDQUFDLENBQUM7SUFDRixJQUFJLENBQUNuSCxTQUFTLENBQUNwRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUc2SixLQUFLLElBQUs7TUFDakQsTUFBTXdELE1BQU0sR0FBR3hELEtBQUssQ0FBQ0MsTUFBTSxDQUFDaEUsT0FBTyxDQUFDLHFCQUFxQixDQUFDO01BQzFELE1BQU1FLEtBQUssR0FBR3FILE1BQU0sRUFBRXZILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztNQUNoRCxJQUFJdUgsTUFBTSxJQUFJckgsS0FBSyxFQUFFLElBQUksQ0FBQ3FILE1BQU0sQ0FBQ3JILEtBQUssQ0FBQ08sT0FBTyxDQUFDK0csT0FBTyxFQUFFRCxNQUFNLENBQUN0USxLQUFLLENBQUM7SUFDekUsQ0FBQyxDQUFDO0lBRVIsSUFBSSxDQUFDeVEsV0FBVyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztFQUNoQjtFQUVIQSxXQUFXQSxDQUFBLEVBQUc7SUFDYixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMzRyxRQUFRLENBQUMsSUFBSSxDQUFDVixTQUFTLENBQUNHLE9BQU8sQ0FBQ21ILFNBQVMsQ0FBQyxJQUMvRCxPQUFPNU0sTUFBTSxDQUFDNk0sT0FBTyxFQUFFQyxZQUFZLEtBQUssVUFBVSxFQUFFO0lBRXhELE1BQU1DLFNBQVMsR0FBR25DLE1BQU0sQ0FBQyxJQUFJLENBQUNyRyxJQUFJLENBQUMwSCxjQUFjLENBQUM7SUFDbEQsSUFBSWMsU0FBUyxJQUFJLENBQUNuQyxNQUFNLENBQUM1SyxNQUFNLENBQUM2TSxPQUFPLENBQUNHLEtBQUssRUFBRTNELFdBQVcsQ0FBQyxFQUFFO01BQzVEckosTUFBTSxDQUFDNk0sT0FBTyxDQUFDQyxZQUFZLENBQUM7UUFBQyxHQUFHOU0sTUFBTSxDQUFDNk0sT0FBTyxDQUFDRyxLQUFLO1FBQUUzRCxXQUFXLEVBQUUwRDtNQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUvTSxNQUFNLENBQUMwRCxRQUFRLENBQUMvRixJQUFJLENBQUM7SUFDekc7SUFDQSxJQUFJLElBQUksQ0FBQzJILFNBQVMsQ0FBQ0csT0FBTyxDQUFDbUgsU0FBUyxLQUFLLE1BQU0sRUFBRTtNQUNoRDVNLE1BQU0sQ0FBQ2QsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQ3dNLGNBQWMsQ0FBQztJQUN6RDtFQUNEO0VBRUFBLGNBQWNBLENBQUMzQyxLQUFLLEVBQUU7SUFDckIsSUFBSSxJQUFJLENBQUN6RCxTQUFTLENBQUNHLE9BQU8sQ0FBQ21ILFNBQVMsS0FBSyxNQUFNLEVBQUU7SUFDakQsSUFBSW5JLEVBQUUsR0FBR21HLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ2lFLEtBQUssRUFBRTNELFdBQVcsQ0FBQztJQUN6QyxJQUFJLENBQUM1RSxFQUFFLEVBQUU7TUFDUixNQUFNd0ksVUFBVSxHQUFHLElBQUl4UCxHQUFHLENBQUN1QyxNQUFNLENBQUMwRCxRQUFRLENBQUMvRixJQUFJLENBQUM7TUFDaEQsTUFBTXdKLElBQUksR0FBRyxJQUFJLENBQUM1QyxJQUFJLENBQUN5SCxRQUFRLENBQUNoTyxJQUFJLENBQUU0SixPQUFPLElBQUs7UUFDakQsSUFBSSxDQUFDQSxPQUFPLENBQUNNLElBQUksRUFBRSxPQUFPLEtBQUs7UUFDL0IsTUFBTUEsSUFBSSxHQUFHLElBQUl6SyxHQUFHLENBQUNtSyxPQUFPLENBQUNNLElBQUksRUFBRWhNLFFBQVEsQ0FBQ3dCLE9BQU8sQ0FBQztRQUNwRCxPQUFPd0ssSUFBSSxDQUFDZ0YsUUFBUSxLQUFLRCxVQUFVLENBQUNDLFFBQVEsSUFBSWhGLElBQUksQ0FBQ2lGLE1BQU0sS0FBS0YsVUFBVSxDQUFDRSxNQUFNO01BQ2xGLENBQUMsQ0FBQztNQUNGMUksRUFBRSxHQUFHbUcsTUFBTSxDQUFDekQsSUFBSSxFQUFFMUMsRUFBRSxDQUFDO0lBQ3RCO0lBQ0EsTUFBTW1ELE9BQU8sR0FBRyxJQUFJLENBQUNyRCxJQUFJLENBQUN5SCxRQUFRLENBQUNoTyxJQUFJLENBQUVtSixJQUFJLElBQUt5RCxNQUFNLENBQUN6RCxJQUFJLENBQUMxQyxFQUFFLENBQUMsS0FBS0EsRUFBRSxDQUFDO0lBQ3pFLElBQUksQ0FBQ21ELE9BQU8sSUFBSWdELE1BQU0sQ0FBQyxJQUFJLENBQUNyRyxJQUFJLENBQUMwSCxjQUFjLENBQUMsS0FBS3hILEVBQUUsRUFBRTtJQUV6RCxJQUFJLENBQUMrRyxRQUFRLEdBQUcsSUFBSSxDQUFDVSxnQkFBZ0IsQ0FBQ3RFLE9BQU8sQ0FBQ3ZCLE1BQU0sQ0FBQztJQUNyRCxJQUFJLENBQUM5QixJQUFJLENBQUMwSCxjQUFjLEdBQUd4SCxFQUFFO0lBQzdCLElBQUksQ0FBQ2lJLFdBQVcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQ1UsV0FBVyxDQUFDeEYsT0FBTyxFQUFFLEtBQUssQ0FBQztFQUNqQztFQUVHMkUsTUFBTUEsQ0FBQ1QsS0FBSyxFQUFFN1AsS0FBSyxFQUFFO0lBQ2pCLE1BQU1vUixNQUFNLEdBQUc7TUFBQyxHQUFHLElBQUksQ0FBQzdCLFFBQVE7TUFBRSxDQUFDTSxLQUFLLEdBQUcvTSxNQUFNLENBQUM5QyxLQUFLO0lBQUMsQ0FBQztJQUN6RCxJQUFJMkwsT0FBTyxHQUFHLElBQUksQ0FBQ3JELElBQUksQ0FBQ3lILFFBQVEsQ0FBQ2hPLElBQUksQ0FBRW1KLElBQUksSUFBSyxJQUFJLENBQUNtRyxPQUFPLENBQUNuRyxJQUFJLEVBQUVrRyxNQUFNLENBQUMsQ0FBQzs7SUFFM0U7SUFDQTtJQUNBLElBQUksQ0FBQ3pGLE9BQU8sRUFBRTtNQUNWQSxPQUFPLEdBQUcsSUFBSSxDQUFDckQsSUFBSSxDQUFDeUgsUUFBUSxDQUFDaE8sSUFBSSxDQUFFbUosSUFBSSxJQUFLcEksTUFBTSxDQUFDb0ksSUFBSSxDQUFDZCxNQUFNLENBQUN5RixLQUFLLENBQUMsQ0FBQyxLQUFLL00sTUFBTSxDQUFDOUMsS0FBSyxDQUFDLENBQUM7SUFDN0Y7SUFDQSxJQUFJLENBQUMyTCxPQUFPLEVBQUU7SUFFcEIsSUFBSSxDQUFDNEQsUUFBUSxHQUFHLElBQUksQ0FBQ1UsZ0JBQWdCLENBQUN0RSxPQUFPLENBQUN2QixNQUFNLENBQUM7SUFDL0MsSUFBSSxDQUFDOUIsSUFBSSxDQUFDMEgsY0FBYyxHQUFHckIsTUFBTSxDQUFDaEQsT0FBTyxDQUFDbkQsRUFBRSxDQUFDO0lBQzdDLElBQUksQ0FBQ2lJLFdBQVcsQ0FBQyxDQUFDO0lBRWxCLElBQUksSUFBSSxDQUFDcEgsU0FBUyxDQUFDRyxPQUFPLENBQUM4SCxNQUFNLEtBQUssVUFBVSxFQUFFO01BQzlDdk4sTUFBTSxDQUFDMEQsUUFBUSxDQUFDOEosTUFBTSxDQUFDNUYsT0FBTyxDQUFDTSxJQUFJLENBQUM7TUFDcEM7SUFDSjtJQUVBLElBQUksQ0FBQ2tGLFdBQVcsQ0FBQ3hGLE9BQU8sQ0FBQztFQUM3QjtFQUVBMEYsT0FBT0EsQ0FBQzFGLE9BQU8sRUFBRTZGLFNBQVMsRUFBRTtJQUN4QixPQUFPL08sTUFBTSxDQUFDQyxPQUFPLENBQUM4TyxTQUFTLENBQUMsQ0FBQ0MsS0FBSyxDQUFDQyxLQUFBO01BQUEsSUFBQyxDQUFDN0IsS0FBSyxFQUFFN1AsS0FBSyxDQUFDLEdBQUEwUixLQUFBO01BQUEsT0FBSzVPLE1BQU0sQ0FBQzZJLE9BQU8sQ0FBQ3ZCLE1BQU0sQ0FBQ3lGLEtBQUssQ0FBQyxDQUFDLEtBQUsvTSxNQUFNLENBQUM5QyxLQUFLLENBQUM7SUFBQSxFQUFDO0VBQy9HO0VBRUF5USxXQUFXQSxDQUFBLEVBQUc7SUFDVixNQUFNa0Isa0JBQWtCLEdBQUcsSUFBSSxDQUFDdEksU0FBUyxDQUFDRyxPQUFPLENBQUNtSSxrQkFBa0IsS0FBSyxPQUFPO0lBQ2hGLElBQUksQ0FBQ3JKLElBQUksQ0FBQzhCLE1BQU0sQ0FBQ3pILE9BQU8sQ0FBRXNHLEtBQUssSUFBSztNQUNoQyxNQUFNMkksT0FBTyxHQUFHLElBQUksQ0FBQ3ZJLFNBQVMsQ0FBQ3JHLGFBQWEsQ0FBQyxtQkFBbUI2TyxHQUFHLENBQUNDLE1BQU0sQ0FBQzdJLEtBQUssQ0FBQzRHLEtBQUssQ0FBQyxJQUFJLENBQUM7TUFDNUYsSUFBSSxDQUFDK0IsT0FBTyxFQUFFO01BRWRBLE9BQU8sQ0FBQzlQLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUNhLE9BQU8sQ0FBRTBOLE1BQU0sSUFBSztRQUM1RCxNQUFNMEIsTUFBTSxHQUFHalAsTUFBTSxDQUFDdU4sTUFBTSxDQUFDN0csT0FBTyxDQUFDZ0gsT0FBTyxDQUFDLEtBQUsxTixNQUFNLENBQUMsSUFBSSxDQUFDeU0sUUFBUSxDQUFDdEcsS0FBSyxDQUFDNEcsS0FBSyxDQUFDLENBQUM7UUFDcEYsTUFBTW1DLFNBQVMsR0FBRyxJQUFJLENBQUNDLFdBQVcsQ0FBQ2hKLEtBQUssQ0FBQzRHLEtBQUssRUFBRVEsTUFBTSxDQUFDN0csT0FBTyxDQUFDZ0gsT0FBTyxDQUFDO1FBQ3ZFSCxNQUFNLENBQUN4TixZQUFZLENBQUMsY0FBYyxFQUFFa1AsTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDOUQxQixNQUFNLENBQUM5RCxTQUFTLENBQUMrQixNQUFNLENBQUMsNEJBQTRCLEVBQUV5RCxNQUFNLENBQUM7UUFDN0QxQixNQUFNLENBQUN4QixRQUFRLEdBQUc4QyxrQkFBa0IsSUFBSSxDQUFDSyxTQUFTO1FBQ2xEM0IsTUFBTSxDQUFDeE4sWUFBWSxDQUFDLGVBQWUsRUFBRXdOLE1BQU0sQ0FBQ3hCLFFBQVEsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO01BQzVFLENBQUMsQ0FBQztNQUVGLE1BQU15QixNQUFNLEdBQUdzQixPQUFPLENBQUM1TyxhQUFhLENBQUMscUJBQXFCLENBQUM7TUFDM0QsSUFBSXNOLE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUN0USxLQUFLLEdBQUcsSUFBSSxDQUFDdVAsUUFBUSxDQUFDdEcsS0FBSyxDQUFDNEcsS0FBSyxDQUFDLElBQUksRUFBRTtRQUMvQ2pPLEtBQUssQ0FBQ0MsSUFBSSxDQUFDeU8sTUFBTSxDQUFDNEIsT0FBTyxDQUFDLENBQUN2UCxPQUFPLENBQUUwTixNQUFNLElBQUs7VUFDM0NBLE1BQU0sQ0FBQ3hCLFFBQVEsR0FBRzhDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDTSxXQUFXLENBQUNoSixLQUFLLENBQUM0RyxLQUFLLEVBQUVRLE1BQU0sQ0FBQ3JRLEtBQUssQ0FBQztRQUN4RixDQUFDLENBQUM7TUFDTjtNQUVULE1BQU1tUyxhQUFhLEdBQUdQLE9BQU8sQ0FBQzVPLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztNQUN2RSxJQUFJbVAsYUFBYSxFQUFFO1FBQ2xCLE1BQU1uUyxLQUFLLEdBQUc4QyxNQUFNLENBQUMsSUFBSSxDQUFDeU0sUUFBUSxDQUFDdEcsS0FBSyxDQUFDNEcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RELE1BQU1RLE1BQU0sR0FBR3BILEtBQUssQ0FBQ2lKLE9BQU8sQ0FBQ25RLElBQUksQ0FBRW1KLElBQUksSUFBS3BJLE1BQU0sQ0FBQ29JLElBQUksQ0FBQ2xMLEtBQUssQ0FBQyxLQUFLQSxLQUFLLENBQUM7UUFDekVtUyxhQUFhLENBQUMzUCxXQUFXLEdBQUc2TixNQUFNLEVBQUV0RixLQUFLLEdBQUcsTUFBTXNGLE1BQU0sQ0FBQ3RGLEtBQUssRUFBRSxHQUFHLEVBQUU7TUFDdEU7SUFDSyxDQUFDLENBQUM7RUFDTjtFQUVBa0gsV0FBV0EsQ0FBQ3BDLEtBQUssRUFBRTdQLEtBQUssRUFBRTtJQUN0QixNQUFNb1MsV0FBVyxHQUFHM1AsTUFBTSxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDNk0sUUFBUSxDQUFDLENBQUNsRixNQUFNLENBQUNnSSxLQUFBO01BQUEsSUFBQyxDQUFDblIsR0FBRyxDQUFDLEdBQUFtUixLQUFBO01BQUEsT0FBS25SLEdBQUcsS0FBSzJPLEtBQUs7SUFBQSxFQUFDO0lBQ2xGLE9BQU8sSUFBSSxDQUFDdkgsSUFBSSxDQUFDeUgsUUFBUSxDQUFDdUMsSUFBSSxDQUFFM0csT0FBTyxJQUFLN0ksTUFBTSxDQUFDNkksT0FBTyxDQUFDdkIsTUFBTSxDQUFDeUYsS0FBSyxDQUFDLENBQUMsS0FBSy9NLE1BQU0sQ0FBQzlDLEtBQUssQ0FBQyxJQUNwRm9TLFdBQVcsQ0FBQ1gsS0FBSyxDQUFDYyxLQUFBO01BQUEsSUFBQyxDQUFDclIsR0FBRyxFQUFFcU8sUUFBUSxDQUFDLEdBQUFnRCxLQUFBO01BQUEsT0FBS3pQLE1BQU0sQ0FBQzZJLE9BQU8sQ0FBQ3ZCLE1BQU0sQ0FBQ2xKLEdBQUcsQ0FBQyxDQUFDLEtBQUs0QixNQUFNLENBQUN5TSxRQUFRLENBQUM7SUFBQSxFQUFDLENBQUM7RUFDcEc7RUFFQSxNQUFNNEIsV0FBV0EsQ0FBQ3hGLE9BQU8sRUFBd0I7SUFBQSxJQUF0QjZHLGFBQWEsR0FBQTVPLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUcsSUFBSTtJQUMzQyxNQUFNeUUsTUFBTSxHQUFHLElBQUksQ0FBQ2dCLFNBQVMsQ0FBQ3JHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUNsRSxNQUFNaUQsT0FBTyxHQUFHLElBQUksQ0FBQ29ELFNBQVMsQ0FBQ3JHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFUixXQUFXLElBQUksVUFBVTtJQUNsRyxNQUFNaVEsWUFBWSxHQUFHLElBQUksQ0FBQ3BKLFNBQVMsQ0FBQ04sT0FBTyxDQUFDLHlCQUF5QixDQUFDO0lBQ3RFLElBQUlWLE1BQU0sRUFBRUEsTUFBTSxDQUFDN0YsV0FBVyxHQUFHeUQsT0FBTztJQUN4QyxJQUFJLENBQUNvRCxTQUFTLENBQUNrRCxTQUFTLENBQUMyQyxHQUFHLENBQUMscUJBQXFCLENBQUM7SUFDekR1RCxZQUFZLEVBQUVsRyxTQUFTLENBQUMyQyxHQUFHLENBQUMscUJBQXFCLENBQUM7SUFDbER1RCxZQUFZLEVBQUU1UCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztJQUV6QyxJQUFJLElBQUksQ0FBQzJNLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU8sQ0FBQ2tELEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQ2xELE9BQU8sR0FBRyxJQUFJbUQsZUFBZSxDQUFDLENBQUM7SUFDcEMsTUFBTUMsVUFBVSxHQUFHLElBQUksQ0FBQ3BELE9BQU87SUFFL0IsSUFBSTtNQUNBLE1BQU1xRCxJQUFJLEdBQUcsTUFBTTFMLGNBQWMsQ0FBQyxJQUFJLENBQUNrQyxTQUFTLENBQUNHLE9BQU8sQ0FBQ3BDLFFBQVEsRUFBRSxTQUFTLEVBQUV1RSxPQUFPLENBQUNuRCxFQUFFLEVBQUVvSyxVQUFVLENBQUNyTCxNQUFNLENBQUM7TUFDNUcsSUFBSSxDQUFDeUYsWUFBWSxDQUFDNkYsSUFBSSxFQUFFTCxhQUFhLENBQUM7TUFDdEMsSUFBSW5LLE1BQU0sRUFBRUEsTUFBTSxDQUFDN0YsV0FBVyxHQUFHLEVBQUU7SUFDdkMsQ0FBQyxDQUFDLE9BQU9lLEtBQUssRUFBRTtNQUNaLElBQUlBLEtBQUssQ0FBQ3pDLElBQUksS0FBSyxZQUFZLElBQUl1SCxNQUFNLEVBQUVBLE1BQU0sQ0FBQzdGLFdBQVcsR0FBR2UsS0FBSyxDQUFDNkUsT0FBTztJQUNqRixDQUFDLFNBQVM7TUFDTixJQUFJLElBQUksQ0FBQ29ILE9BQU8sS0FBS29ELFVBQVUsRUFBRTtRQUM3QixJQUFJLENBQUN2SixTQUFTLENBQUNrRCxTQUFTLENBQUM5SSxNQUFNLENBQUMscUJBQXFCLENBQUM7UUFDbEVnUCxZQUFZLEVBQUVsRyxTQUFTLENBQUM5SSxNQUFNLENBQUMscUJBQXFCLENBQUM7UUFDckRnUCxZQUFZLEVBQUVoRixlQUFlLENBQUMsV0FBVyxDQUFDO1FBQzlCLElBQUksQ0FBQytCLE9BQU8sR0FBRyxJQUFJO01BQ3ZCO0lBQ0o7RUFDSjtFQUVBeEMsWUFBWUEsQ0FBQ3JCLE9BQU8sRUFBd0I7SUFBQSxJQUF0QjZHLGFBQWEsR0FBQTVPLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUcsSUFBSTtJQUN0QyxJQUFJLE9BQU8sSUFBSSxDQUFDMEwsU0FBUyxLQUFLLFVBQVUsRUFBRTtNQUN0QyxJQUFJLENBQUNBLFNBQVMsQ0FBQzNELE9BQU8sQ0FBQztJQUMzQixDQUFDLE1BQU07TUFDSCxNQUFNOUMsTUFBTSxHQUFHLElBQUksQ0FBQ1EsU0FBUyxDQUFDTixPQUFPLENBQUMseUJBQXlCLENBQUM7TUFDaEUsTUFBTWlDLEtBQUssR0FBR25DLE1BQU0sR0FDMUJELG1CQUFtQixDQUFDQyxNQUFNLENBQUMsR0FDM0IsSUFBSSxDQUFDUSxTQUFTLENBQUNQLGFBQWEsRUFBRUMsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLElBQUk5SSxRQUFRO01BQ25GK0ssS0FBSyxDQUFDbEosZ0JBQWdCLENBQUMsaUVBQWlFLENBQUMsQ0FDcEZhLE9BQU8sQ0FBRXNCLElBQUksSUFBSztRQUNmQSxJQUFJLENBQUN1RixPQUFPLENBQUNoQixFQUFFLEdBQUdtRCxPQUFPLENBQUNuRCxFQUFFO1FBQzVCdkUsSUFBSSxDQUFDdUYsT0FBTyxDQUFDK0UsZ0JBQWdCLEdBQUcsTUFBTTtNQUMxQyxDQUFDLENBQUM7SUFDVjtJQUVBLE1BQU11RSxPQUFPLEdBQUcsSUFBSSxDQUFDekosU0FBUyxDQUFDRyxPQUFPLENBQUNtSCxTQUFTO0lBQ2hELE1BQU1vQyxhQUFhLEdBQUdELE9BQU8sS0FBSyxNQUFNLEdBQUcsV0FBVyxHQUFHQSxPQUFPLEtBQUssU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJO0lBQ3RHLElBQUlOLGFBQWEsSUFBSU8sYUFBYSxJQUFJcEgsT0FBTyxDQUFDTSxJQUFJLElBQUksT0FBT2xJLE1BQU0sQ0FBQzZNLE9BQU8sR0FBR21DLGFBQWEsQ0FBQyxLQUFLLFVBQVUsRUFBRTtNQUN6R2hQLE1BQU0sQ0FBQzZNLE9BQU8sQ0FBQ21DLGFBQWEsQ0FBQyxDQUFDO1FBQUMsR0FBR2hQLE1BQU0sQ0FBQzZNLE9BQU8sQ0FBQ0csS0FBSztRQUFFM0QsV0FBVyxFQUFFekIsT0FBTyxDQUFDbkQ7TUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFbUQsT0FBTyxDQUFDTSxJQUFJLENBQUM7SUFDdkc7SUFFQSxJQUFJLENBQUM1QyxTQUFTLENBQUM1RCxhQUFhLENBQUMsSUFBSUMsV0FBVyxDQUFDLDRCQUE0QixFQUFFO01BQ3ZFb0osT0FBTyxFQUFFLElBQUk7TUFDYm5KLE1BQU0sRUFBRTtRQUFDZ0c7TUFBTztJQUNwQixDQUFDLENBQUMsQ0FBQztFQUNQO0FBQ0o7QUFFQSxNQUFNcUgsU0FBUyxDQUFDO0VBQ1o1RyxXQUFXQSxDQUFBLEVBQUc7SUFDVixJQUFJLENBQUM2RyxLQUFLLEdBQUcsSUFBSXZTLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ3dTLEtBQUssR0FBRyxJQUFJO0lBQ2pCLElBQUksQ0FBQ3ZILE9BQU8sR0FBRyxJQUFJO0lBQ25CLElBQUksQ0FBQ3dILFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDM0QsT0FBTyxHQUFHLElBQUk7SUFDekIsSUFBSSxDQUFDNEQsY0FBYyxHQUFHLElBQUk7SUFDMUIsSUFBSSxDQUFDQyxZQUFZLEdBQUcsRUFBRTtFQUNwQjtFQUVBLE1BQU1DLElBQUlBLENBQUNDLE9BQU8sRUFBRTtJQUNoQixNQUFNL0ssRUFBRSxHQUFHbUcsTUFBTSxDQUFDNEUsT0FBTyxDQUFDL0osT0FBTyxDQUFDZ0ssV0FBVyxDQUFDO0lBQzlDLElBQUksQ0FBQ2hMLEVBQUUsRUFBRTtJQUNULElBQUk7TUFDQSxJQUFJLENBQUMySyxRQUFRLEdBQUc3UyxJQUFJLENBQUNDLEtBQUssQ0FBQ2dULE9BQU8sQ0FBQy9KLE9BQU8sQ0FBQzJKLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDaEUsQ0FBQyxDQUFDLE9BQU81UCxLQUFLLEVBQUU7TUFDWixJQUFJLENBQUM0UCxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCO0lBRUEsSUFBSSxDQUFDTSxXQUFXLENBQUMsQ0FBQztJQUN4QixNQUFNQyxJQUFJLEdBQUdILE9BQU8sQ0FBQ3hLLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztJQUN6RCxNQUFNNEssTUFBTSxHQUFHLElBQUksQ0FBQ1QsS0FBSyxDQUFDbFEsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0lBQy9ELE1BQU0rSCxLQUFLLEdBQUcySSxJQUFJLEVBQUVsSyxPQUFPLENBQUNvSyxnQkFBZ0IsSUFBSUwsT0FBTyxDQUFDL1EsV0FBVyxDQUFDc0osSUFBSSxDQUFDLENBQUMsSUFDdEVyRixTQUFTLENBQUMsMkJBQTJCLEVBQUViLE1BQU0sQ0FBQ1csU0FBUyxDQUFDO0lBQzVELElBQUksQ0FBQzJNLEtBQUssQ0FBQ3JRLFlBQVksQ0FBQyxZQUFZLEVBQUVrSSxLQUFLLENBQUM7SUFDNUMsSUFBSTRJLE1BQU0sRUFBRUEsTUFBTSxDQUFDOVEsWUFBWSxDQUFDLFlBQVksRUFBRWtJLEtBQUssQ0FBQztJQUNwRCxJQUFJMkksSUFBSSxFQUFFbEssT0FBTyxDQUFDaEIsRUFBRSxFQUFFLElBQUksQ0FBQzBLLEtBQUssQ0FBQzFKLE9BQU8sQ0FBQ2hCLEVBQUUsR0FBR2tMLElBQUksQ0FBQ2xLLE9BQU8sQ0FBQ2hCLEVBQUUsQ0FBQyxLQUN6RCxPQUFPLElBQUksQ0FBQzBLLEtBQUssQ0FBQzFKLE9BQU8sQ0FBQ2hCLEVBQUU7SUFDM0IsSUFBSSxDQUFDcUwsSUFBSSxDQUFDLENBQUM7SUFFWCxJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksQ0FBQ1YsY0FBYyxHQUFHLElBQUk7SUFFcEIsSUFBSSxJQUFJLENBQUM1RCxPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPLENBQUNrRCxLQUFLLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUNsRCxPQUFPLEdBQUcsSUFBSW1ELGVBQWUsQ0FBQyxDQUFDO0lBQ3BDLE1BQU1DLFVBQVUsR0FBRyxJQUFJLENBQUNwRCxPQUFPO0lBRS9CLElBQUk7TUFDVCxJQUFJK0QsT0FBTyxDQUFDL0osT0FBTyxDQUFDdUssV0FBVyxLQUFLLFNBQVMsSUFBSVIsT0FBTyxDQUFDL0osT0FBTyxDQUFDZCxVQUFVLEVBQUU7UUFDNUUsTUFBTXhILEdBQUcsR0FBRyxHQUFHcVMsT0FBTyxDQUFDL0osT0FBTyxDQUFDcEMsUUFBUSxXQUFXbU0sT0FBTyxDQUFDL0osT0FBTyxDQUFDZCxVQUFVLElBQUlGLEVBQUUsRUFBRTtRQUNwRixNQUFNc0IsTUFBTSxHQUFHLElBQUksQ0FBQ21KLEtBQUssQ0FBQzlSLEdBQUcsQ0FBQ0QsR0FBRyxDQUFDLEdBQy9CZixLQUFLLENBQUMsSUFBSSxDQUFDOFMsS0FBSyxDQUFDN1IsR0FBRyxDQUFDRixHQUFHLENBQUMsQ0FBQyxHQUMxQixNQUFNdUgsc0JBQXNCLENBQzdCOEssT0FBTyxDQUFDL0osT0FBTyxDQUFDcEMsUUFBUSxFQUN4Qm9CLEVBQUUsRUFDRitLLE9BQU8sQ0FBQy9KLE9BQU8sQ0FBQ2QsVUFBVSxFQUMxQmtLLFVBQVUsQ0FBQ3JMLE1BQ1osQ0FBQztRQUNGLElBQUksQ0FBQzBMLEtBQUssQ0FBQzlRLEdBQUcsQ0FBQ2pCLEdBQUcsRUFBRWYsS0FBSyxDQUFDMkosTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDNkIsT0FBTyxHQUFHLElBQUk7UUFDbkIsTUFBTSxJQUFJLENBQUNxSSxvQkFBb0IsQ0FBQ2xLLE1BQU0sQ0FBQ25CLElBQUksRUFBRTtVQUM1Q3ZCLFFBQVEsRUFBRW1NLE9BQU8sQ0FBQy9KLE9BQU8sQ0FBQ3BDLFFBQVE7VUFDbENzQixVQUFVLEVBQUU2SyxPQUFPLENBQUMvSixPQUFPLENBQUNkLFVBQVU7VUFDdENwQixTQUFTLEVBQUVrQjtRQUNaLENBQUMsRUFBRXNCLE1BQU0sQ0FBQ25HLE1BQU0sQ0FBQztRQUNqQjtNQUNEO01BRVMsTUFBTXpDLEdBQUcsR0FBRyxHQUFHcVMsT0FBTyxDQUFDL0osT0FBTyxDQUFDcEMsUUFBUSxJQUFJb0IsRUFBRSxFQUFFO01BQy9DLE1BQU1tRCxPQUFPLEdBQUcsSUFBSSxDQUFDc0gsS0FBSyxDQUFDOVIsR0FBRyxDQUFDRCxHQUFHLENBQUMsR0FDN0JmLEtBQUssQ0FBQyxJQUFJLENBQUM4UyxLQUFLLENBQUM3UixHQUFHLENBQUNGLEdBQUcsQ0FBQyxDQUFDLEdBQzFCLE1BQU1pRyxjQUFjLENBQUNvTSxPQUFPLENBQUMvSixPQUFPLENBQUNwQyxRQUFRLEVBQUUsV0FBVyxFQUFFb0IsRUFBRSxFQUFFb0ssVUFBVSxDQUFDckwsTUFBTSxDQUFDO01BQ3hGLElBQUksQ0FBQzBMLEtBQUssQ0FBQzlRLEdBQUcsQ0FBQ2pCLEdBQUcsRUFBRWYsS0FBSyxDQUFDd0wsT0FBTyxDQUFDLENBQUM7TUFDbkMsSUFBSSxDQUFDQSxPQUFPLEdBQUdBLE9BQU87TUFDdEIsSUFBSSxDQUFDc0ksTUFBTSxDQUFDdEksT0FBTyxFQUFFNEgsT0FBTyxDQUFDL0osT0FBTyxDQUFDcEMsUUFBUSxDQUFDO0lBQ2xELENBQUMsQ0FBQyxPQUFPN0QsS0FBSyxFQUFFO01BQ1osSUFBSUEsS0FBSyxDQUFDekMsSUFBSSxLQUFLLFlBQVksRUFBRSxJQUFJLENBQUNvVCxXQUFXLENBQUMzUSxLQUFLLENBQUM2RSxPQUFPLENBQUM7SUFDcEUsQ0FBQyxTQUFTO01BQ04sSUFBSSxJQUFJLENBQUNvSCxPQUFPLEtBQUtvRCxVQUFVLEVBQUUsSUFBSSxDQUFDcEQsT0FBTyxHQUFHLElBQUk7SUFDeEQ7RUFDSjtFQUVBaUUsV0FBV0EsQ0FBQSxFQUFHO0lBQ1YsSUFBSSxJQUFJLENBQUNQLEtBQUssRUFBRTtJQUNoQixJQUFJLENBQUNBLEtBQUssR0FBR25NLE9BQU8sQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUU7TUFDaEQsVUFBVSxFQUFFLElBQUk7TUFDaEIsWUFBWSxFQUFFTixTQUFTLENBQUMsMkJBQTJCLEVBQUViLE1BQU0sQ0FBQ1csU0FBUztJQUN6RSxDQUFDLENBQUM7SUFDRixJQUFJLENBQUMyTSxLQUFLLENBQUNoSyxTQUFTLEdBQUcsZ0dBQWdHekMsU0FBUyxDQUFDLDJCQUEyQixFQUFFYixNQUFNLENBQUNXLFNBQVMsQ0FBQyxrR0FBa0dFLFNBQVMsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUMsc0VBQXNFO0lBQzNZLElBQUksQ0FBQ3lNLEtBQUssQ0FBQ2pRLGdCQUFnQixDQUFDLDRCQUE0QixFQUFHNkosS0FBSyxJQUFLO01BQ3BFLE1BQU14RixTQUFTLEdBQUdxSCxNQUFNLENBQUM3QixLQUFLLENBQUNuSCxNQUFNLEVBQUVnRyxPQUFPLEVBQUVuRCxFQUFFLENBQUM7TUFDbkQsSUFBSSxJQUFJLENBQUM0SyxjQUFjLElBQUk5TCxTQUFTLEVBQUUsSUFBSSxDQUFDNk0sa0JBQWtCLENBQUM3TSxTQUFTLENBQUM7SUFDekUsQ0FBQyxDQUFDO0lBQ0lySCxRQUFRLENBQUM0SyxJQUFJLENBQUN1SixXQUFXLENBQUMsSUFBSSxDQUFDbEIsS0FBSyxDQUFDO0VBQ3pDO0VBRUFXLElBQUlBLENBQUEsRUFBRztJQUNILElBQUksQ0FBQ1gsS0FBSyxDQUFDM0csU0FBUyxDQUFDOUksTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDNFAsWUFBWSxDQUFDO0lBQ3ZELElBQUksQ0FBQ0EsWUFBWSxHQUFHdlEsTUFBTSxDQUFDLElBQUksQ0FBQ3FRLFFBQVEsQ0FBQ2tCLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDakssTUFBTSxDQUFDMEQsT0FBTyxDQUFDO0lBQ3ZGLElBQUksQ0FBQ21GLEtBQUssQ0FBQzNHLFNBQVMsQ0FBQzJDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQ21FLFlBQVksQ0FBQztJQUN4QyxNQUFNa0IsU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQ3hLLFFBQVEsQ0FBQyxJQUFJLENBQUNvSixRQUFRLENBQUNvQixTQUFTLENBQUMsR0FDbkcsSUFBSSxDQUFDcEIsUUFBUSxDQUFDb0IsU0FBUyxHQUFHLFdBQVc7SUFDM0MsTUFBTUMsTUFBTSxHQUFHLElBQUksQ0FBQ3JCLFFBQVEsQ0FBQ3NCLFdBQVcsS0FBSyxLQUFLLElBQUlGLFNBQVMsS0FBSyxNQUFNO0lBQzFFLE1BQU1HLE9BQU8sR0FBRyxJQUFJLENBQUN2QixRQUFRLENBQUN1QixPQUFPLEtBQUssS0FBSztJQUMvQyxNQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDeEIsUUFBUSxDQUFDd0IsUUFBUSxLQUFLLEtBQUs7SUFDakQsTUFBTWhCLE1BQU0sR0FBRyxJQUFJLENBQUNULEtBQUssQ0FBQ2xRLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztJQUMvRCxNQUFNNkgsSUFBSSxHQUFHLElBQUksQ0FBQ3FJLEtBQUssQ0FBQ2xRLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztJQUMzRCxNQUFNNFIsS0FBSyxHQUFHLElBQUksQ0FBQzFCLEtBQUssQ0FBQ2xRLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RCxNQUFNNlIsY0FBYyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM5SyxRQUFRLENBQUMsSUFBSSxDQUFDb0osUUFBUSxDQUFDMEIsY0FBYyxDQUFDLEdBQzdGLElBQUksQ0FBQzFCLFFBQVEsQ0FBQzBCLGNBQWMsR0FBRyxTQUFTO0lBRTlDLElBQUksQ0FBQzNCLEtBQUssQ0FBQzNHLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRWlHLFNBQVMsS0FBSyxXQUFXLENBQUM7SUFDNUUsSUFBSSxDQUFDckIsS0FBSyxDQUFDM0csU0FBUyxDQUFDK0IsTUFBTSxDQUFDLGVBQWUsRUFBRWlHLFNBQVMsS0FBSyxNQUFNLENBQUM7SUFDbEUsSUFBSSxDQUFDckIsS0FBSyxDQUFDM0csU0FBUyxDQUFDK0IsTUFBTSxDQUFDLGFBQWEsRUFBRWtHLE1BQU0sQ0FBQztJQUNsRCxJQUFJLENBQUN0QixLQUFLLENBQUMzRyxTQUFTLENBQUMrQixNQUFNLENBQUMsb0JBQW9CLEVBQUVpRyxTQUFTLEtBQUssT0FBTyxDQUFDO0lBQ3hFLElBQUksQ0FBQ3JCLEtBQUssQ0FBQzNHLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRWlHLFNBQVMsS0FBSyxPQUFPLENBQUM7SUFDeEUsSUFBSSxDQUFDckIsS0FBSyxDQUFDM0csU0FBUyxDQUFDK0IsTUFBTSxDQUFDLHFCQUFxQixFQUFFaUcsU0FBUyxLQUFLLFFBQVEsQ0FBQztJQUMxRSxJQUFJLENBQUNyQixLQUFLLENBQUMzRyxTQUFTLENBQUMrQixNQUFNLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDNkUsUUFBUSxDQUFDMkIsZ0JBQWdCLEtBQUssS0FBSyxJQUFJUCxTQUFTLEtBQUssTUFBTSxDQUFDO0lBQ3pILElBQUksQ0FBQ3JCLEtBQUssQ0FBQ3JRLFlBQVksQ0FBQyxVQUFVLEVBQUUsYUFBYTZSLE9BQU8sZ0JBQWdCQyxRQUFRLEVBQUUsQ0FBQztJQUVuRmhCLE1BQU0sRUFBRXBILFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRWtHLE1BQU0sQ0FBQztJQUMzRDNKLElBQUksRUFBRTBCLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUM2RSxRQUFRLENBQUM0QixZQUFZLEtBQUssSUFBSSxDQUFDO0lBQy9FLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUNwUyxPQUFPLENBQUVxUyxPQUFPLElBQUs7TUFDdkRuSyxJQUFJLEVBQUUwQixTQUFTLENBQUMrQixNQUFNLENBQUMsOEJBQThCMEcsT0FBTyxFQUFFLEVBQUVBLE9BQU8sS0FBS0gsY0FBYyxDQUFDO0lBQy9GLENBQUMsQ0FBQztJQUNGLElBQUlELEtBQUssRUFBRTtNQUNQQSxLQUFLLENBQUN2SixNQUFNLEdBQUcsSUFBSSxDQUFDOEgsUUFBUSxDQUFDOEIsU0FBUyxLQUFLLEtBQUs7TUFDaERMLEtBQUssQ0FBQ3JJLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUM2RSxRQUFRLENBQUMrQixVQUFVLEtBQUssSUFBSSxJQUFJWCxTQUFTLEtBQUssTUFBTSxDQUFDO01BQ25HSyxLQUFLLENBQUNySSxTQUFTLENBQUMrQixNQUFNLENBQUMsd0JBQXdCLEVBQUVpRyxTQUFTLEtBQUssTUFBTSxDQUFDO01BQ3RFSyxLQUFLLENBQUNySSxTQUFTLENBQUMrQixNQUFNLENBQUMscUJBQXFCLEVBQUVpRyxTQUFTLEtBQUssTUFBTSxDQUFDO0lBQ3ZFO0lBRUEsSUFBSXhRLE1BQU0sQ0FBQ3VILEtBQUssRUFBRTRILEtBQUssRUFBRTtNQUNyQixNQUFNaUMsU0FBUyxHQUFHcFIsTUFBTSxDQUFDdUgsS0FBSyxDQUFDNEgsS0FBSyxDQUFDLElBQUksQ0FBQ0EsS0FBSyxDQUFDO01BQ2hELElBQUlpQyxTQUFTLEVBQUVDLE1BQU0sRUFBRTtRQUNuQkQsU0FBUyxDQUFDQyxNQUFNLENBQUNWLE9BQU8sR0FBR0EsT0FBTztRQUNsQ1MsU0FBUyxDQUFDQyxNQUFNLENBQUNULFFBQVEsR0FBR0EsUUFBUTtNQUN4QztNQUNBUSxTQUFTLENBQUN0QixJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDLE1BQ0k7TUFDRCxJQUFJLENBQUNYLEtBQUssQ0FBQzNHLFNBQVMsQ0FBQzJDLEdBQUcsQ0FBQyxTQUFTLENBQUM7TUFDbkMsSUFBSSxDQUFDZ0UsS0FBSyxDQUFDbUMsS0FBSyxDQUFDQyxPQUFPLEdBQUcsT0FBTztJQUN0QztFQUNKO0VBRUF4QixVQUFVQSxDQUFBLEVBQUc7SUFDVCxNQUFNakosSUFBSSxHQUFHLElBQUksQ0FBQ3FJLEtBQUssQ0FBQ2xRLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztJQUMzRDZILElBQUksQ0FBQ08sZUFBZSxDQUFDckUsT0FBTyxDQUFDLEtBQUssRUFBRSxxQkFBcUIsRUFBRTtNQUFDLFlBQVksRUFBRTtJQUFZLENBQUMsQ0FBQyxDQUFDO0VBQzdGO0VBRUFtTixXQUFXQSxDQUFDOUwsT0FBTyxFQUFFO0lBQ2pCLE1BQU1tTixLQUFLLEdBQUd4TyxPQUFPLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFO01BQUMsVUFBVSxFQUFFO0lBQUksQ0FBQyxDQUFDO0lBQ25Fd08sS0FBSyxDQUFDbFMsTUFBTSxDQUFDdEQsSUFBSSxDQUFDcUksT0FBTyxJQUFJM0IsU0FBUyxDQUFDLG1DQUFtQyxFQUFFYixNQUFNLENBQUNyQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNGLElBQUksQ0FBQzJQLEtBQUssQ0FBQ2xRLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDb0ksZUFBZSxDQUFDbUssS0FBSyxDQUFDO0VBQ3pFO0VBRUEsTUFBTXZCLG9CQUFvQkEsQ0FBQ3JMLElBQUksRUFBOEM7SUFBQSxJQUE1QzZNLE9BQU8sR0FBQTVSLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUcsSUFBSSxDQUFDd1AsY0FBYztJQUFBLElBQUV6UCxNQUFNLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU1pSCxJQUFJLEdBQUcsSUFBSSxDQUFDcUksS0FBSyxDQUFDbFEsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQ2pFLElBQUlXLE1BQU0sQ0FBQ3VPLE9BQU8sSUFBSW5PLE1BQU0sQ0FBQzZDLE1BQU0sRUFBRTZPLFdBQVcsRUFBRTtNQUNqRDFSLE1BQU0sQ0FBQzZDLE1BQU0sQ0FBQzZPLFdBQVcsQ0FBQzlSLE1BQU0sQ0FBQ3VPLE9BQU8sQ0FBQztJQUMxQztJQUNBLE1BQU14TyxVQUFVLENBQUNDLE1BQU0sRUFBRSxPQUFPLENBQUM7SUFDakMsTUFBTTRHLFFBQVEsR0FBR3RLLFFBQVEsQ0FBQ3lWLFdBQVcsQ0FBQyxDQUFDLENBQUNDLHdCQUF3QixDQUFDaE4sSUFBSSxDQUFDO0lBQ3RFa0MsSUFBSSxDQUFDTyxlQUFlLENBQUNiLFFBQVEsQ0FBQztJQUM5QixJQUFJLENBQUM2SSxjQUFjLEdBQUdvQyxPQUFPO0lBQzdCLE1BQU05UixVQUFVLENBQUNDLE1BQU0sRUFBRSxRQUFRLENBQUM7SUFDbEMsSUFBSSxPQUFPSSxNQUFNLENBQUM2UixlQUFlLEtBQUssVUFBVSxFQUFFOVIsd0JBQXdCLENBQUMsQ0FBQztJQUN0RSxJQUFJQyxNQUFNLENBQUN1SCxLQUFLLEVBQUVDLE1BQU0sRUFBRXhILE1BQU0sQ0FBQ3VILEtBQUssQ0FBQ0MsTUFBTSxDQUFDVixJQUFJLENBQUM7SUFDbkQsSUFBSSxPQUFPOUcsTUFBTSxDQUFDNlIsZUFBZSxLQUFLLFVBQVUsRUFBRTtNQUM5QyxNQUFNM1IsSUFBSSxHQUFHRixNQUFNLENBQUM2UixlQUFlLENBQUMsQ0FBQztNQUNyQyxJQUFJLE9BQU8zUixJQUFJLEVBQUU0UixXQUFXLEtBQUssVUFBVSxFQUFFNVIsSUFBSSxDQUFDNFIsV0FBVyxDQUFDaEwsSUFBSSxDQUFDO0lBQ3ZFO0lBQ0FBLElBQUksQ0FBQ3BGLGFBQWEsQ0FBQyxJQUFJQyxXQUFXLENBQUMsMkJBQTJCLEVBQUU7TUFBQ29KLE9BQU8sRUFBRTtJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3JGO0VBRUgsTUFBTXFGLGtCQUFrQkEsQ0FBQzdNLFNBQVMsRUFBRTtJQUNuQyxNQUFNa08sT0FBTyxHQUFHLElBQUksQ0FBQ3BDLGNBQWM7SUFDbkMsSUFBSSxDQUFDb0MsT0FBTyxJQUFJN0csTUFBTSxDQUFDNkcsT0FBTyxDQUFDbE8sU0FBUyxDQUFDLEtBQUtxSCxNQUFNLENBQUNySCxTQUFTLENBQUMsRUFBRTtJQUVqRSxJQUFJLENBQUN3TSxVQUFVLENBQUMsQ0FBQztJQUNqQixJQUFJLElBQUksQ0FBQ3RFLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU8sQ0FBQ2tELEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQ2xELE9BQU8sR0FBRyxJQUFJbUQsZUFBZSxDQUFDLENBQUM7SUFDcEMsTUFBTUMsVUFBVSxHQUFHLElBQUksQ0FBQ3BELE9BQU87SUFFL0IsSUFBSTtNQUNILE1BQU10TyxHQUFHLEdBQUcsR0FBR3NVLE9BQU8sQ0FBQ3BPLFFBQVEsV0FBV29PLE9BQU8sQ0FBQzlNLFVBQVUsSUFBSXBCLFNBQVMsRUFBRTtNQUMzRSxNQUFNd0MsTUFBTSxHQUFHLElBQUksQ0FBQ21KLEtBQUssQ0FBQzlSLEdBQUcsQ0FBQ0QsR0FBRyxDQUFDLEdBQy9CZixLQUFLLENBQUMsSUFBSSxDQUFDOFMsS0FBSyxDQUFDN1IsR0FBRyxDQUFDRixHQUFHLENBQUMsQ0FBQyxHQUMxQixNQUFNdUgsc0JBQXNCLENBQUMrTSxPQUFPLENBQUNwTyxRQUFRLEVBQUVFLFNBQVMsRUFBRWtPLE9BQU8sQ0FBQzlNLFVBQVUsRUFBRWtLLFVBQVUsQ0FBQ3JMLE1BQU0sQ0FBQztNQUNuRyxJQUFJLENBQUMwTCxLQUFLLENBQUM5USxHQUFHLENBQUNqQixHQUFHLEVBQUVmLEtBQUssQ0FBQzJKLE1BQU0sQ0FBQyxDQUFDO01BQ2xDLE1BQU0sSUFBSSxDQUFDa0ssb0JBQW9CLENBQUNsSyxNQUFNLENBQUNuQixJQUFJLEVBQUU7UUFBQyxHQUFHNk0sT0FBTztRQUFFbE87TUFBUyxDQUFDLEVBQUV3QyxNQUFNLENBQUNuRyxNQUFNLENBQUM7SUFDckYsQ0FBQyxDQUFDLE9BQU9KLEtBQUssRUFBRTtNQUNmLElBQUlBLEtBQUssQ0FBQ3pDLElBQUksS0FBSyxZQUFZLEVBQUUsSUFBSSxDQUFDb1QsV0FBVyxDQUFDM1EsS0FBSyxDQUFDNkUsT0FBTyxDQUFDO0lBQ2pFLENBQUMsU0FBUztNQUNULElBQUksSUFBSSxDQUFDb0gsT0FBTyxLQUFLb0QsVUFBVSxFQUFFLElBQUksQ0FBQ3BELE9BQU8sR0FBRyxJQUFJO0lBQ3JEO0VBQ0Q7RUFFR3lFLE1BQU1BLENBQUN0SSxPQUFPLEVBQUV2RSxRQUFRLEVBQUU7SUFDdEIsTUFBTXlELElBQUksR0FBRyxJQUFJLENBQUNxSSxLQUFLLENBQUNsUSxhQUFhLENBQUMsb0JBQW9CLENBQUM7SUFDM0QsTUFBTThHLE1BQU0sR0FBRy9DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsa0RBQWtELEVBQUU7TUFBQyxTQUFTLEVBQUUsSUFBSTtNQUFFLHVCQUF1QixFQUFFO0lBQUksQ0FBQyxDQUFDO0lBQ25JLE1BQU0rTyxXQUFXLEdBQUcvTyxPQUFPLENBQUMsS0FBSyxFQUFFLDBDQUEwQyxDQUFDO0lBQzlFLE1BQU1nUCxhQUFhLEdBQUdoUCxPQUFPLENBQUMsS0FBSyxFQUFFLHdDQUF3QyxDQUFDO0lBRTlFK08sV0FBVyxDQUFDelMsTUFBTSxDQUFDLElBQUksQ0FBQzJTLFdBQVcsQ0FBQ3JLLE9BQU8sQ0FBQ0ssS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pEK0osYUFBYSxDQUFDMVMsTUFBTSxDQUFDLElBQUksQ0FBQzRTLGFBQWEsQ0FBQ3RLLE9BQU8sRUFBRXZFLFFBQVEsQ0FBQyxDQUFDO0lBQzNEMEMsTUFBTSxDQUFDekcsTUFBTSxDQUFDeVMsV0FBVyxFQUFFQyxhQUFhLENBQUM7SUFDekNsTCxJQUFJLENBQUNPLGVBQWUsQ0FBQ3RCLE1BQU0sQ0FBQztJQUM1QixJQUFJL0YsTUFBTSxDQUFDdUgsS0FBSyxFQUFFQyxNQUFNLEVBQUV4SCxNQUFNLENBQUN1SCxLQUFLLENBQUNDLE1BQU0sQ0FBQ1YsSUFBSSxDQUFDO0VBQ3ZEO0VBRUFtTCxXQUFXQSxDQUFDaEssS0FBSyxFQUFFO0lBQ2YsTUFBTTRGLE9BQU8sR0FBRzdLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUM7SUFDcEQsTUFBTW1QLElBQUksR0FBR25QLE9BQU8sQ0FBQyxRQUFRLEVBQUUseUJBQXlCLEVBQUU7TUFBQ2xHLElBQUksRUFBRTtJQUFRLENBQUMsQ0FBQztJQUMzRSxNQUFNa0wsS0FBSyxHQUFHaEYsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7TUFBQ2QsT0FBTyxFQUFFO0lBQU8sQ0FBQyxDQUFDO0lBQ3BELE1BQU1rUSxXQUFXLEdBQUdwUCxPQUFPLENBQUMsTUFBTSxFQUFFLHdDQUF3QyxDQUFDO0lBQzdFLE1BQU1xUCxlQUFlLEdBQUdyUCxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtNQUFDLFNBQVMsRUFBRTtJQUF5QixDQUFDLENBQUM7SUFDbkYsTUFBTXNQLGVBQWUsR0FBR3RQLE9BQU8sQ0FBQyxNQUFNLEVBQUUsb0RBQW9ELENBQUM7SUFDN0ZzUCxlQUFlLENBQUNoVCxNQUFNLENBQUN0RCxJQUFJLENBQUMwRyxTQUFTLENBQUMseUJBQXlCLEVBQUViLE1BQU0sQ0FBQ1ksT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRjJQLFdBQVcsQ0FBQzlTLE1BQU0sQ0FBQytTLGVBQWUsRUFBRUMsZUFBZSxDQUFDO0lBQ3BELE1BQU1DLEtBQUssR0FBR3RLLEtBQUssQ0FBQ25JLE1BQU0sR0FBR21JLEtBQUssR0FBRyxDQUFDO01BQUMvSixHQUFHLEVBQUUsRUFBRTtNQUFFeUwsR0FBRyxFQUFFLElBQUksQ0FBQy9CLE9BQU8sRUFBRWpCLEtBQUssSUFBSTtJQUFFLENBQUMsQ0FBQztJQUVoRixNQUFNNEYsTUFBTSxHQUFJaUcsS0FBSyxJQUFLO01BQ3RCLE1BQU1yTCxJQUFJLEdBQUdvTCxLQUFLLENBQUNDLEtBQUssQ0FBQztNQUN6QixJQUFJckwsSUFBSSxDQUFDakosR0FBRyxFQUFFOEosS0FBSyxDQUFDOUosR0FBRyxHQUFHaUosSUFBSSxDQUFDakosR0FBRyxDQUFDLEtBQzlCOEosS0FBSyxDQUFDMEIsZUFBZSxDQUFDLEtBQUssQ0FBQztNQUNqQzFCLEtBQUssQ0FBQzJCLEdBQUcsR0FBR3hDLElBQUksQ0FBQ3dDLEdBQUcsSUFBSSxJQUFJLENBQUMvQixPQUFPLEVBQUVqQixLQUFLLElBQUksRUFBRTtNQUNqRHdMLElBQUksQ0FBQ3JILFFBQVEsR0FBRyxDQUFDM0QsSUFBSSxDQUFDakosR0FBRztNQUN6QmlVLElBQUksQ0FBQzNKLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDcEQsSUFBSSxDQUFDakosR0FBRyxDQUFDO01BQ2xFOEosS0FBSyxDQUFDVixNQUFNLEdBQUcsQ0FBQ0gsSUFBSSxDQUFDakosR0FBRztNQUN4QmtVLFdBQVcsQ0FBQzlLLE1BQU0sR0FBRzBDLE9BQU8sQ0FBQzdDLElBQUksQ0FBQ2pKLEdBQUcsQ0FBQztNQUN0QzJQLE9BQU8sQ0FBQzlQLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUNhLE9BQU8sQ0FBQyxDQUFDNlQsS0FBSyxFQUFFQyxVQUFVLEtBQUs7UUFDM0VELEtBQUssQ0FBQ2pLLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRW1JLFVBQVUsS0FBS0YsS0FBSyxDQUFDO1FBQzFFQyxLQUFLLENBQUMzVCxZQUFZLENBQUMsY0FBYyxFQUFFNFQsVUFBVSxLQUFLRixLQUFLLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztNQUMvRSxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0RMLElBQUksQ0FBQzdTLE1BQU0sQ0FBQzBJLEtBQUssRUFBRW9LLFdBQVcsQ0FBQztJQUMvQkQsSUFBSSxDQUFDalQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07TUFDakMsSUFBSThJLEtBQUssQ0FBQzlKLEdBQUcsSUFBSThCLE1BQU0sQ0FBQ3VILEtBQUssRUFBRW9MLGFBQWEsRUFBRTtRQUMxQzNTLE1BQU0sQ0FBQ3VILEtBQUssQ0FBQ29MLGFBQWEsQ0FBQztVQUFDSixLQUFLLEVBQUVBLEtBQUssQ0FBQ2pNLE1BQU0sQ0FBRWEsSUFBSSxJQUFLQSxJQUFJLENBQUNqSixHQUFHLENBQUMsQ0FBQ2lJLEdBQUcsQ0FBRWdCLElBQUksS0FBTTtZQUFDckMsTUFBTSxFQUFFcUMsSUFBSSxDQUFDakosR0FBRztZQUFFMFUsT0FBTyxFQUFFekwsSUFBSSxDQUFDd0M7VUFBRyxDQUFDLENBQUM7UUFBQyxDQUFDLENBQUMsQ0FBQ21HLElBQUksQ0FBQyxDQUFDLENBQUM7TUFDeEk7SUFDSixDQUFDLENBQUM7SUFDRmpDLE9BQU8sQ0FBQ3ZPLE1BQU0sQ0FBQzZTLElBQUksQ0FBQztJQUVwQixJQUFJSSxLQUFLLENBQUN6UyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2xCLE1BQU0rUyxNQUFNLEdBQUc3UCxPQUFPLENBQUMsS0FBSyxFQUFFLHlEQUF5RCxDQUFDO01BQ3hGdVAsS0FBSyxDQUFDM1QsT0FBTyxDQUFDLENBQUN1SSxJQUFJLEVBQUVxTCxLQUFLLEtBQUs7UUFDM0IsTUFBTTNILE1BQU0sR0FBRzdILE9BQU8sQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUU7VUFBQ2xHLElBQUksRUFBRSxRQUFRO1VBQUUsWUFBWSxFQUFFcUssSUFBSSxDQUFDd0MsR0FBRyxJQUFJLEdBQUc2SSxLQUFLLEdBQUcsQ0FBQztRQUFFLENBQUMsQ0FBQztRQUNsSDNILE1BQU0sQ0FBQ3ZMLE1BQU0sQ0FBQzBELE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1VBQUM5RSxHQUFHLEVBQUVpSixJQUFJLENBQUNqSixHQUFHO1VBQUV5TCxHQUFHLEVBQUUsRUFBRTtVQUFFekgsT0FBTyxFQUFFO1FBQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUUySSxNQUFNLENBQUMzTCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTXFOLE1BQU0sQ0FBQ2lHLEtBQUssQ0FBQyxDQUFDO1FBQ3JESyxNQUFNLENBQUN2VCxNQUFNLENBQUN1TCxNQUFNLENBQUM7TUFDekIsQ0FBQyxDQUFDO01BQ0ZnRCxPQUFPLENBQUN2TyxNQUFNLENBQUN1VCxNQUFNLENBQUM7SUFDMUI7SUFDQXRHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDVCxPQUFPc0IsT0FBTztFQUNsQjtFQUVBcUUsYUFBYUEsQ0FBQ3RLLE9BQU8sRUFBRXZFLFFBQVEsRUFBRTtJQUM3QixNQUFNbUQsUUFBUSxHQUFHdEssUUFBUSxDQUFDdUssc0JBQXNCLENBQUMsQ0FBQztJQUNsRCxNQUFNRSxLQUFLLEdBQUczRCxPQUFPLENBQUMsSUFBSSxFQUFFLCtDQUErQyxDQUFDO0lBQzVFLE1BQU1rRixJQUFJLEdBQUdsRixPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFO01BQUNyRixJQUFJLEVBQUVpSyxPQUFPLENBQUNNO0lBQUksQ0FBQyxDQUFDO0lBQ2xFQSxJQUFJLENBQUM1SSxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUNqQixLQUFLLENBQUMsQ0FBQztJQUNoQ0EsS0FBSyxDQUFDckgsTUFBTSxDQUFDNEksSUFBSSxDQUFDO0lBQ2xCMUIsUUFBUSxDQUFDbEgsTUFBTSxDQUFDcUgsS0FBSyxDQUFDO0lBRXRCLElBQUksSUFBSSxDQUFDeUksUUFBUSxDQUFDMEQsUUFBUSxJQUFJbEwsT0FBTyxDQUFDMEIsSUFBSSxFQUFFO01BQ3hDLE1BQU1BLElBQUksR0FBR3RHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsdURBQXVELENBQUM7TUFDcEZzRyxJQUFJLENBQUNoSyxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUMwQixJQUFJLENBQUMsQ0FBQztNQUMvQjlDLFFBQVEsQ0FBQ2xILE1BQU0sQ0FBQ2dLLElBQUksQ0FBQztJQUN6QjtJQUVBLE1BQU1XLEtBQUssR0FBR2pILE9BQU8sQ0FBQyxLQUFLLEVBQUUsK0NBQStDLENBQUM7SUFDN0UsSUFBSTRFLE9BQU8sQ0FBQ3FDLEtBQUssRUFBRUMsZUFBZSxJQUFJdEMsT0FBTyxDQUFDcUMsS0FBSyxDQUFDTCxJQUFJLEVBQUU7TUFDdEQsTUFBTW1KLFFBQVEsR0FBRy9QLE9BQU8sQ0FBQyxHQUFHLEVBQUUscUNBQXFDLENBQUM7TUFDcEUrUCxRQUFRLENBQUN6VCxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUNxQyxLQUFLLENBQUNMLElBQUksQ0FBQyxDQUFDO01BQ3pDSyxLQUFLLENBQUMzSyxNQUFNLENBQUN5VCxRQUFRLENBQUM7SUFDMUI7SUFDQSxNQUFNQyxVQUFVLEdBQUdoUSxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtNQUFDLGVBQWUsRUFBRTtJQUFJLENBQUMsQ0FBQztJQUMvRGdRLFVBQVUsQ0FBQzFULE1BQU0sQ0FBQ3RELElBQUksQ0FBQzRMLE9BQU8sQ0FBQ3FDLEtBQUssRUFBRUosS0FBSyxDQUFDLENBQUM7SUFDN0NJLEtBQUssQ0FBQzNLLE1BQU0sQ0FBQzBULFVBQVUsQ0FBQztJQUN4QnhNLFFBQVEsQ0FBQ2xILE1BQU0sQ0FBQzJLLEtBQUssQ0FBQztJQUV0QixNQUFNZ0osS0FBSyxHQUFHalEsT0FBTyxDQUFDLEtBQUssRUFBRSwwQ0FBMEM0RSxPQUFPLENBQUN6RixPQUFPLEdBQUcsaUJBQWlCLEdBQUcsZUFBZSxFQUFFLEVBQUU7TUFBQyxlQUFlLEVBQUU7SUFBSSxDQUFDLENBQUM7SUFDeEo4USxLQUFLLENBQUMzVCxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUN6RixPQUFPLEdBQzNCTyxTQUFTLENBQUMsMEJBQTBCLEVBQUViLE1BQU0sQ0FBQ00sT0FBTyxDQUFDLEdBQ3JETyxTQUFTLENBQUMsOEJBQThCLEVBQUViLE1BQU0sQ0FBQ08sVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNwRW9FLFFBQVEsQ0FBQ2xILE1BQU0sQ0FBQzJULEtBQUssQ0FBQztJQUV0QixJQUFJLElBQUksQ0FBQzdELFFBQVEsQ0FBQzhELGVBQWUsSUFBSXRMLE9BQU8sQ0FBQ0UsU0FBUyxFQUFFO01BQ3BELE1BQU1ELFdBQVcsR0FBRzdFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsb0NBQW9DLENBQUM7TUFDdEU2RSxXQUFXLENBQUN2SSxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUNFLFNBQVMsQ0FBQyxDQUFDO01BQzNDdEIsUUFBUSxDQUFDbEgsTUFBTSxDQUFDdUksV0FBVyxDQUFDO0lBQ2hDO0lBRUEsSUFBSSxJQUFJLENBQUN1SCxRQUFRLENBQUM1SixZQUFZLElBQUlvQyxPQUFPLENBQUN1TCxRQUFRLEVBQUU5TSxNQUFNLEVBQUV2RyxNQUFNLEVBQUU7TUFDaEUsTUFBTXFULFFBQVEsR0FBRyxJQUFJLENBQUNDLGNBQWMsQ0FBQ3hMLE9BQU8sQ0FBQ3VMLFFBQVEsRUFBRTlQLFFBQVEsQ0FBQztNQUNoRW1ELFFBQVEsQ0FBQ2xILE1BQU0sQ0FBQzZULFFBQVEsQ0FBQztJQUM3QjtJQUVBLElBQUksSUFBSSxDQUFDL0QsUUFBUSxDQUFDaUUsUUFBUSxFQUFFN00sUUFBUSxDQUFDbEgsTUFBTSxDQUFDLElBQUksQ0FBQ2dVLFVBQVUsQ0FBQzFMLE9BQU8sQ0FBQyxDQUFDO0lBRXJFLE1BQU0yTCxJQUFJLEdBQUd2USxPQUFPLENBQUMsR0FBRyxFQUFFLDBEQUEwRCxFQUFFO01BQUNyRixJQUFJLEVBQUVpSyxPQUFPLENBQUNNO0lBQUksQ0FBQyxDQUFDO0lBQzNHcUwsSUFBSSxDQUFDalUsTUFBTSxDQUFDdEQsSUFBSSxDQUFDMEcsU0FBUyxDQUFDLHdCQUF3QixFQUFFYixNQUFNLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEVpRSxRQUFRLENBQUNsSCxNQUFNLENBQUNpVSxJQUFJLENBQUM7SUFDckIsT0FBTy9NLFFBQVE7RUFDbkI7RUFFQTRNLGNBQWNBLENBQUM3TyxJQUFJLEVBQUVsQixRQUFRLEVBQUU7SUFDM0IsTUFBTWlDLFNBQVMsR0FBR3RDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsa0RBQWtELEVBQUU7TUFDakYsa0JBQWtCLEVBQUUsSUFBSTtNQUN4QixlQUFlLEVBQUVLLFFBQVE7TUFDekIsYUFBYSxFQUFFLE1BQU07TUFDckIsMEJBQTBCLEVBQUUsTUFBTTtNQUNsQyxpQkFBaUIsRUFBRTtJQUN2QixDQUFDLENBQUM7SUFFRixNQUFNMEksT0FBTyxHQUFHeEgsSUFBSSxDQUFDeUgsUUFBUSxDQUFDaE8sSUFBSSxDQUFFbUosSUFBSSxJQUFLeUQsTUFBTSxDQUFDekQsSUFBSSxDQUFDMUMsRUFBRSxDQUFDLEtBQUttRyxNQUFNLENBQUNyRyxJQUFJLENBQUMwSCxjQUFjLENBQUMsQ0FBQztJQUM3RjFILElBQUksQ0FBQzhCLE1BQU0sQ0FBQ3pILE9BQU8sQ0FBRXNHLEtBQUssSUFBSztNQUMzQixNQUFNa0IsUUFBUSxHQUFHcEQsT0FBTyxDQUFDLFVBQVUsRUFBRSwrQkFBK0IsRUFBRTtRQUFDLGVBQWUsRUFBRWtDLEtBQUssQ0FBQzRHO01BQUssQ0FBQyxDQUFDO01BQ3JHLE1BQU0wSCxNQUFNLEdBQUd4USxPQUFPLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxDQUFDO01BQ25Fd1EsTUFBTSxDQUFDbFUsTUFBTSxDQUFDdEQsSUFBSSxDQUFDa0osS0FBSyxDQUFDeUIsS0FBSyxDQUFDLENBQUM7TUFDaEMsTUFBTXdILE9BQU8sR0FBR25MLE9BQU8sQ0FBQyxLQUFLLEVBQUUseURBQXlELEVBQUU7UUFBQ3lRLElBQUksRUFBRSxPQUFPO1FBQUUsWUFBWSxFQUFFdk8sS0FBSyxDQUFDeUI7TUFBSyxDQUFDLENBQUM7TUFFckl6QixLQUFLLENBQUNpSixPQUFPLENBQUN2UCxPQUFPLENBQUUwTixNQUFNLElBQUs7UUFDOUIsTUFBTTBCLE1BQU0sR0FBR2pQLE1BQU0sQ0FBQ2dOLE9BQU8sRUFBRTFGLE1BQU0sQ0FBQ25CLEtBQUssQ0FBQzRHLEtBQUssQ0FBQyxDQUFDLEtBQUsvTSxNQUFNLENBQUN1TixNQUFNLENBQUNyUSxLQUFLLENBQUM7UUFDNUUsTUFBTXlYLE1BQU0sR0FBR3BILE1BQU0sQ0FBQ3RFLEtBQUssSUFBSXNFLE1BQU0sQ0FBQ3FILEtBQUs7UUFDM0MsTUFBTTlJLE1BQU0sR0FBRzdILE9BQU8sQ0FBQyxRQUFRLEVBQUUsaURBQWlEMFEsTUFBTSxHQUFHLDZCQUE2QixHQUFHLEVBQUUsRUFBRSxFQUFFO1VBQzdINVcsSUFBSSxFQUFFLFFBQVE7VUFBRSxlQUFlLEVBQUV3UCxNQUFNLENBQUNyUSxLQUFLO1VBQUUsY0FBYyxFQUFFK1IsTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPO1VBQUVySCxLQUFLLEVBQUUyRixNQUFNLENBQUN0RjtRQUM1RyxDQUFDLENBQUM7UUFDRixJQUFJc0YsTUFBTSxDQUFDdEUsS0FBSyxFQUFFNkMsTUFBTSxDQUFDdkwsTUFBTSxDQUFDMEQsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7VUFBQzlFLEdBQUcsRUFBRW9PLE1BQU0sQ0FBQ3RFLEtBQUs7VUFBRTJCLEdBQUcsRUFBRSxFQUFFO1VBQUV6SCxPQUFPLEVBQUU7UUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQzlGLElBQUlvSyxNQUFNLENBQUNxSCxLQUFLLEVBQUU7VUFDbkIsTUFBTUEsS0FBSyxHQUFHM1EsT0FBTyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQztVQUNsRDJRLEtBQUssQ0FBQ3JDLEtBQUssQ0FBQ3NDLFdBQVcsQ0FBQyxhQUFhLEVBQUV0SCxNQUFNLENBQUNxSCxLQUFLLENBQUM7VUFDcEQ5SSxNQUFNLENBQUN2TCxNQUFNLENBQUNxVSxLQUFLLENBQUM7UUFDeEIsQ0FBQyxNQUFNOUksTUFBTSxDQUFDdkwsTUFBTSxDQUFDdEQsSUFBSSxDQUFDc1EsTUFBTSxDQUFDdEYsS0FBSyxDQUFDLENBQUM7UUFDeENtSCxPQUFPLENBQUM3TyxNQUFNLENBQUN1TCxNQUFNLENBQUM7TUFDMUIsQ0FBQyxDQUFDO01BQ0Z6RSxRQUFRLENBQUM5RyxNQUFNLENBQUNrVSxNQUFNLEVBQUVyRixPQUFPLENBQUM7TUFDaEM3SSxTQUFTLENBQUNoRyxNQUFNLENBQUM4RyxRQUFRLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0lBQ0ZkLFNBQVMsQ0FBQ2hHLE1BQU0sQ0FBQzBELE9BQU8sQ0FBQyxLQUFLLEVBQUUsa0NBQWtDLEVBQUU7TUFBQyxXQUFXLEVBQUU7SUFBUSxDQUFDLENBQUMsQ0FBQztJQUU3RixJQUFJc0ksYUFBYSxDQUFDaEcsU0FBUyxFQUFFZixJQUFJLEVBQUdpSCxRQUFRLElBQUssSUFBSSxDQUFDcUksYUFBYSxDQUFDckksUUFBUSxDQUFDLENBQUMsQ0FBQzNDLElBQUksQ0FBQyxDQUFDO0lBQ3JGLE9BQU92RCxTQUFTO0VBQ3BCO0VBRUFnTyxVQUFVQSxDQUFDMUwsT0FBTyxFQUFFO0lBQ2hCLE1BQU1iLEdBQUcsR0FBRy9ELE9BQU8sQ0FBQyxLQUFLLEVBQUUscUVBQXFFLENBQUM7SUFDakcsTUFBTVgsUUFBUSxHQUFHVyxPQUFPLENBQUMsT0FBTyxFQUFFLCtCQUErQixFQUFFO01BQy9EbEcsSUFBSSxFQUFFLFFBQVE7TUFBRWIsS0FBSyxFQUFFMkwsT0FBTyxDQUFDdkYsUUFBUSxFQUFFb0ksR0FBRyxJQUFJLENBQUM7TUFBRUEsR0FBRyxFQUFFN0MsT0FBTyxDQUFDdkYsUUFBUSxFQUFFb0ksR0FBRyxJQUFJLENBQUM7TUFBRUMsSUFBSSxFQUFFOUMsT0FBTyxDQUFDdkYsUUFBUSxFQUFFcUksSUFBSSxJQUFJLENBQUM7TUFDckhDLEdBQUcsRUFBRS9DLE9BQU8sQ0FBQ3ZGLFFBQVEsRUFBRXNJLEdBQUc7TUFBRSxZQUFZLEVBQUVqSSxTQUFTLENBQUMseUJBQXlCLEVBQUViLE1BQU0sQ0FBQ1EsUUFBUTtJQUNsRyxDQUFDLENBQUM7SUFDRixNQUFNd0ksTUFBTSxHQUFHN0gsT0FBTyxDQUFDLFFBQVEsRUFBRSw2QkFBNkIsRUFBRTtNQUFDbEcsSUFBSSxFQUFFO0lBQVEsQ0FBQyxDQUFDO0lBQ2pGK04sTUFBTSxDQUFDdkwsTUFBTSxDQUFDdEQsSUFBSSxDQUFDMEcsU0FBUyxDQUFDLDBCQUEwQixFQUFFYixNQUFNLENBQUNTLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUV1SSxNQUFNLENBQUNDLFFBQVEsR0FBRyxDQUFDbEQsT0FBTyxDQUFDekYsT0FBTztJQUNsQzBJLE1BQU0sQ0FBQzNMLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO01BQ25DLElBQUljLE1BQU0sQ0FBQzZSLGVBQWUsSUFBSSxJQUFJLENBQUNqSyxPQUFPLEVBQUVuRCxFQUFFLEVBQUU7UUFDNUN6RSxNQUFNLENBQUM2UixlQUFlLENBQUMsQ0FBQyxDQUFDaUMsVUFBVSxDQUFDbEosTUFBTSxDQUFDLElBQUksQ0FBQ2hELE9BQU8sQ0FBQ25ELEVBQUUsQ0FBQyxFQUFFbUcsTUFBTSxDQUFDdkksUUFBUSxDQUFDcEcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzdGO0lBQ0osQ0FBQyxDQUFDO0lBQ0Y4SyxHQUFHLENBQUN6SCxNQUFNLENBQUMrQyxRQUFRLEVBQUV3SSxNQUFNLENBQUM7SUFDNUIsT0FBTzlELEdBQUc7RUFDZDtFQUVBOE0sYUFBYUEsQ0FBQ2pNLE9BQU8sRUFBRTtJQUNuQixJQUFJLENBQUNBLE9BQU8sR0FBRztNQUFDLEdBQUcsSUFBSSxDQUFDQSxPQUFPO01BQUUsR0FBR0E7SUFBTyxDQUFDO0lBQzVDLE1BQU1kLElBQUksR0FBRyxJQUFJLENBQUNxSSxLQUFLLENBQUNsUSxhQUFhLENBQUMsb0JBQW9CLENBQUM7SUFDM0QsTUFBTTBILEtBQUssR0FBR0csSUFBSSxDQUFDN0gsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0lBQ3pELE1BQU1nTCxLQUFLLEdBQUduRCxJQUFJLENBQUM3SCxhQUFhLENBQUMscUJBQXFCLENBQUM7SUFDdkQsTUFBTWdVLEtBQUssR0FBR25NLElBQUksQ0FBQzdILGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUNuRCxNQUFNcUssSUFBSSxHQUFHeEMsSUFBSSxDQUFDN0gsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JELE1BQU00SSxXQUFXLEdBQUdmLElBQUksQ0FBQzdILGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztJQUNuRSxNQUFNaUIsSUFBSSxHQUFHNEcsSUFBSSxDQUFDN0gsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO0lBQ3hFLElBQUkwSCxLQUFLLEVBQUU7TUFDUEEsS0FBSyxDQUFDbEksV0FBVyxHQUFHbUosT0FBTyxDQUFDakIsS0FBSztNQUNqQ0EsS0FBSyxDQUFDaEosSUFBSSxHQUFHaUssT0FBTyxDQUFDTSxJQUFJO0lBQzdCO0lBQ0EsSUFBSStCLEtBQUssRUFBRTtNQUNQQSxLQUFLLENBQUM1QyxlQUFlLENBQUMsQ0FBQztNQUN2QixJQUFJTyxPQUFPLENBQUNxQyxLQUFLLEVBQUVDLGVBQWUsSUFBSXRDLE9BQU8sQ0FBQ3FDLEtBQUssQ0FBQ0wsSUFBSSxFQUFFO1FBQ3RELE1BQU1tSixRQUFRLEdBQUcvUCxPQUFPLENBQUMsR0FBRyxFQUFFLHFDQUFxQyxDQUFDO1FBQ3BFK1AsUUFBUSxDQUFDelQsTUFBTSxDQUFDdEQsSUFBSSxDQUFDNEwsT0FBTyxDQUFDcUMsS0FBSyxDQUFDTCxJQUFJLENBQUMsQ0FBQztRQUN6Q0ssS0FBSyxDQUFDM0ssTUFBTSxDQUFDeVQsUUFBUSxDQUFDO01BQzFCO01BQ0EsTUFBTUMsVUFBVSxHQUFHaFEsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFBQyxlQUFlLEVBQUU7TUFBSSxDQUFDLENBQUM7TUFDL0RnUSxVQUFVLENBQUMxVCxNQUFNLENBQUN0RCxJQUFJLENBQUM0TCxPQUFPLENBQUNxQyxLQUFLLEVBQUVKLEtBQUssQ0FBQyxDQUFDO01BQzdDSSxLQUFLLENBQUMzSyxNQUFNLENBQUMwVCxVQUFVLENBQUM7SUFDNUI7SUFDQSxJQUFJMUosSUFBSSxFQUFFQSxJQUFJLENBQUM3SyxXQUFXLEdBQUdtSixPQUFPLENBQUMwQixJQUFJLElBQUksRUFBRTtJQUMvQyxJQUFJekIsV0FBVyxFQUFFQSxXQUFXLENBQUNwSixXQUFXLEdBQUdtSixPQUFPLENBQUNFLFNBQVMsSUFBSSxFQUFFO0lBQ2xFLElBQUltTCxLQUFLLEVBQUU7TUFDUEEsS0FBSyxDQUFDeFUsV0FBVyxHQUFHbUosT0FBTyxDQUFDekYsT0FBTyxHQUM3Qk8sU0FBUyxDQUFDLDBCQUEwQixFQUFFYixNQUFNLENBQUNNLE9BQU8sQ0FBQyxHQUNyRE8sU0FBUyxDQUFDLDhCQUE4QixFQUFFYixNQUFNLENBQUNPLFVBQVUsQ0FBQztNQUNsRTZRLEtBQUssQ0FBQ3pLLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTNDLE9BQU8sQ0FBQ3pGLE9BQU8sQ0FBQztNQUMxRDhRLEtBQUssQ0FBQ3pLLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQzNDLE9BQU8sQ0FBQ3pGLE9BQU8sQ0FBQztJQUM3RDtJQUNBLElBQUlqQyxJQUFJLEVBQUVBLElBQUksQ0FBQzRLLFFBQVEsR0FBRyxDQUFDbEQsT0FBTyxDQUFDekYsT0FBTztJQUUxQyxNQUFNOEYsS0FBSyxHQUFHbkIsSUFBSSxDQUFDN0gsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3ZELElBQUlnSixLQUFLLEVBQUVBLEtBQUssQ0FBQzhMLFdBQVcsQ0FBQyxJQUFJLENBQUM5QixXQUFXLENBQUNySyxPQUFPLENBQUNLLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxNQUFNc0wsSUFBSSxHQUFHek0sSUFBSSxDQUFDN0gsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JELElBQUlzVSxJQUFJLEVBQUVBLElBQUksQ0FBQzVWLElBQUksR0FBR2lLLE9BQU8sQ0FBQ00sSUFBSTtFQUN0QztBQUNKO0FBRUEsTUFBTTFGLFNBQVMsR0FBRyxJQUFJeU0sU0FBUyxDQUFDLENBQUM7QUFDakMsTUFBTStFLGtCQUFrQixHQUFHLElBQUlDLE9BQU8sQ0FBQyxDQUFDO0FBRXhDLE1BQU1DLGlCQUFpQixHQUFJckosTUFBTSxJQUFLO0VBQ2xDLElBQUksQ0FBQ0EsTUFBTSxDQUFDcEYsT0FBTyxDQUFDME8sY0FBYyxFQUFFdEosTUFBTSxDQUFDcEYsT0FBTyxDQUFDME8sY0FBYyxHQUFHdEosTUFBTSxDQUFDMUYsU0FBUztFQUNwRm5GLE1BQU0sQ0FBQ29VLFlBQVksQ0FBQ0osa0JBQWtCLENBQUMzVyxHQUFHLENBQUN3TixNQUFNLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTXdKLGVBQWUsR0FBR0EsQ0FBQ25VLElBQUksRUFBRTJLLE1BQU0sS0FBSztFQUN0Q3FKLGlCQUFpQixDQUFDckosTUFBTSxDQUFDO0VBQ3pCQSxNQUFNLENBQUNwTSxXQUFXLEdBQUd5QixJQUFJLENBQUN1RixPQUFPLENBQUM2TyxhQUFhLElBQUl6UyxNQUFNLENBQUNLLE9BQU87RUFDakUySSxNQUFNLENBQUMvTCxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTXlWLGdCQUFnQixHQUFJeEwsS0FBSyxJQUFLO0VBQ2hDLElBQUlBLEtBQUssQ0FBQ25ILE1BQU0sRUFBRXBDLEtBQUssRUFBRTtFQUV6QixNQUFNK0QsU0FBUyxHQUFHcUgsTUFBTSxDQUFDN0IsS0FBSyxDQUFDbkgsTUFBTSxFQUFFNFMsS0FBSyxFQUFFQyxVQUFVLElBQUksQ0FBQyxDQUFDO0VBQzlELElBQUksQ0FBQ2xSLFNBQVMsRUFBRTtFQUVoQnJILFFBQVEsQ0FBQzZCLGdCQUFnQixDQUNyQix5Q0FBeUN3RixTQUFTLE1BQU0sR0FDdEQsOENBQThDQSxTQUFTLElBQzdELENBQUMsQ0FBQzNFLE9BQU8sQ0FBRXNCLElBQUksSUFBSztJQUNoQixNQUFNMkssTUFBTSxHQUFHM0ssSUFBSSxDQUFDakIsYUFBYSxDQUFDLHlEQUF5RCxDQUFDO0lBQzVGLElBQUksQ0FBQzRMLE1BQU0sRUFBRTtJQUVicUosaUJBQWlCLENBQUNySixNQUFNLENBQUM7SUFDekJBLE1BQU0sQ0FBQ3BNLFdBQVcsR0FBR3lCLElBQUksQ0FBQ3VGLE9BQU8sQ0FBQ2lQLGFBQWEsSUFBSSx1QkFBdUI7SUFDMUU3SixNQUFNLENBQUNyQyxTQUFTLENBQUMyQyxHQUFHLENBQUMseUJBQXlCLENBQUM7SUFDL0NOLE1BQU0sQ0FBQ25CLGVBQWUsQ0FBQyxXQUFXLENBQUM7SUFDbkNtQixNQUFNLENBQUMvTCxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztJQUUxQyxNQUFNNlYsS0FBSyxHQUFHM1UsTUFBTSxDQUFDNFUsVUFBVSxDQUFDLE1BQU07TUFDbEMvSixNQUFNLENBQUMxRixTQUFTLEdBQUcwRixNQUFNLENBQUNwRixPQUFPLENBQUMwTyxjQUFjO01BQ2hEdEosTUFBTSxDQUFDckMsU0FBUyxDQUFDOUksTUFBTSxDQUFDLHlCQUF5QixDQUFDO01BQ2xEbUwsTUFBTSxDQUFDbkIsZUFBZSxDQUFDLFdBQVcsQ0FBQztNQUNuQ3NLLGtCQUFrQixDQUFDdlUsTUFBTSxDQUFDb0wsTUFBTSxDQUFDO0lBQ3JDLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDUm1KLGtCQUFrQixDQUFDNVYsR0FBRyxDQUFDeU0sTUFBTSxFQUFFOEosS0FBSyxDQUFDO0VBQ3pDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNRSx1QkFBdUIsR0FBR0EsQ0FBQSxLQUFNO0VBQ2xDM1ksUUFBUSxDQUFDNkIsZ0JBQWdCLENBQUMsNkZBQTZGLENBQUMsQ0FDbkhhLE9BQU8sQ0FBRWlNLE1BQU0sSUFBSztJQUNqQixJQUFJQSxNQUFNLENBQUNwRixPQUFPLENBQUMwTyxjQUFjLEVBQUV0SixNQUFNLENBQUMxRixTQUFTLEdBQUcwRixNQUFNLENBQUNwRixPQUFPLENBQUMwTyxjQUFjO0lBQ25GdEosTUFBTSxDQUFDbkIsZUFBZSxDQUFDLFdBQVcsQ0FBQztFQUN2QyxDQUFDLENBQUM7QUFDVixDQUFDO0FBRUQsTUFBTWIsSUFBSSxHQUFHLFNBQUFBLENBQUEsRUFBcUI7RUFBQSxJQUFwQjhHLElBQUksR0FBQTlQLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUF4RCxTQUFBLEdBQUF3RCxTQUFBLE1BQUczRCxRQUFRO0VBQ3pCLElBQUl5VCxJQUFJLENBQUNyQyxPQUFPLEdBQUcseUJBQXlCLENBQUMsRUFBRSxJQUFJbEYsWUFBWSxDQUFDdUgsSUFBSSxDQUFDLENBQUM5RyxJQUFJLENBQUMsQ0FBQztFQUM1RThHLElBQUksQ0FBQzVSLGdCQUFnQixHQUFHLHlCQUF5QixDQUFDLENBQUNhLE9BQU8sQ0FBRXFJLEtBQUssSUFBSyxJQUFJbUIsWUFBWSxDQUFDbkIsS0FBSyxDQUFDLENBQUM0QixJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLElBQUk4RyxJQUFJLENBQUNyQyxPQUFPLEdBQUcsaUNBQWlDLENBQUMsRUFBRSxJQUFJdEMsbUJBQW1CLENBQUMyRSxJQUFJLENBQUMsQ0FBQzlHLElBQUksQ0FBQyxDQUFDO0VBQzNGOEcsSUFBSSxDQUFDNVIsZ0JBQWdCLEdBQUcsaUNBQWlDLENBQUMsQ0FBQ2EsT0FBTyxDQUFFa1csUUFBUSxJQUFLLElBQUk5SixtQkFBbUIsQ0FBQzhKLFFBQVEsQ0FBQyxDQUFDak0sSUFBSSxDQUFDLENBQUMsQ0FBQztFQUMxSCxJQUFJOEcsSUFBSSxDQUFDckMsT0FBTyxHQUFHLG9CQUFvQixDQUFDLEVBQUUsSUFBSWhDLGFBQWEsQ0FBQ3FFLElBQUksQ0FBQyxDQUFDOUcsSUFBSSxDQUFDLENBQUM7RUFDeEU4RyxJQUFJLENBQUM1UixnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDYSxPQUFPLENBQUUwRyxTQUFTLElBQUssSUFBSWdHLGFBQWEsQ0FBQ2hHLFNBQVMsQ0FBQyxDQUFDdUQsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM3RyxDQUFDO0FBRUQzTSxRQUFRLENBQUNnRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUc2SixLQUFLLElBQUs7RUFDMUMsTUFBTXlHLE9BQU8sR0FBR3pHLEtBQUssQ0FBQ0MsTUFBTSxDQUFDaEUsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0VBQzVELElBQUl3SyxPQUFPLEVBQUU7SUFDVHpHLEtBQUssQ0FBQ2dNLGNBQWMsQ0FBQyxDQUFDO0lBQ3RCaE0sS0FBSyxDQUFDaU0sZUFBZSxDQUFDLENBQUM7SUFDdkJ4UyxTQUFTLENBQUMrTSxJQUFJLENBQUNDLE9BQU8sQ0FBQztFQUMzQjtBQUNKLENBQUMsRUFBRSxJQUFJLENBQUM7O0FBRVI7QUFDQTtBQUNBdFQsUUFBUSxDQUFDZ0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFHNkosS0FBSyxJQUFLO0VBQzFDLE1BQU1vQyxHQUFHLEdBQUdwQyxLQUFLLENBQUNDLE1BQU0sQ0FBQ2hFLE9BQU8sQ0FBQyx5REFBeUQsQ0FBQztFQUMzRixNQUFNOUUsSUFBSSxHQUFHaUwsR0FBRyxFQUFFbkcsT0FBTyxDQUFDLGlFQUFpRSxDQUFDO0VBQzVGLElBQUksQ0FBQ21HLEdBQUcsSUFBSSxDQUFDakwsSUFBSSxFQUFFdUYsT0FBTyxDQUFDK0UsZ0JBQWdCLElBQUksQ0FBQ3hLLE1BQU0sQ0FBQzZSLGVBQWUsRUFBRTtFQUN4RTlJLEtBQUssQ0FBQ2dNLGNBQWMsQ0FBQyxDQUFDO0VBQ3RCaE0sS0FBSyxDQUFDa00sd0JBQXdCLENBQUMsQ0FBQztFQUNoQ1osZUFBZSxDQUFDblUsSUFBSSxFQUFFaUwsR0FBRyxDQUFDO0VBQzFCLE1BQU05SSxRQUFRLEdBQUduQyxJQUFJLENBQUNqQixhQUFhLENBQUMsbUVBQW1FLENBQUM7RUFDeEdlLE1BQU0sQ0FBQzZSLGVBQWUsQ0FBQyxDQUFDLENBQUNpQyxVQUFVLENBQUNsSixNQUFNLENBQUMxSyxJQUFJLENBQUN1RixPQUFPLENBQUNoQixFQUFFLENBQUMsRUFBRW1HLE1BQU0sQ0FBQ3ZJLFFBQVEsRUFBRXBHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RixDQUFDLEVBQUUsSUFBSSxDQUFDO0FBRVJDLFFBQVEsQ0FBQ2dELGdCQUFnQixDQUFDLGtDQUFrQyxFQUFFcVYsZ0JBQWdCLENBQUM7QUFDL0VyWSxRQUFRLENBQUNnRCxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRTJWLHVCQUF1QixDQUFDO0FBRTVFM1ksUUFBUSxDQUFDZ0QsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTTJKLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDM0QsSUFBSXFNLGdCQUFnQixDQUFFQyxTQUFTLElBQUtBLFNBQVMsQ0FBQ3ZXLE9BQU8sQ0FBRXdXLFFBQVEsSUFBS0EsUUFBUSxDQUFDQyxVQUFVLENBQUN6VyxPQUFPLENBQUVYLElBQUksSUFBSztFQUN0RyxJQUFJQSxJQUFJLENBQUNxWCxRQUFRLEtBQUtDLElBQUksQ0FBQ0MsWUFBWSxFQUFFM00sSUFBSSxDQUFDNUssSUFBSSxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ3dYLE9BQU8sQ0FBQ3ZaLFFBQVEsQ0FBQzRGLGVBQWUsRUFBRTtFQUFDNFQsU0FBUyxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQUksQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvcHJvZHVjdC1pbnRlcmFjdGlvbnMuc2NzcyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL3Byb2R1Y3QtaW50ZXJhY3Rpb25zLmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vcHJvZHVjdC1pbnRlcmFjdGlvbnMuc2Nzcyc7XG5cbmNvbnN0IHRleHQgPSAodmFsdWUpID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcbmNvbnN0IGNsb25lID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB2YWx1ZTtcbiAgICByZXR1cm4gdHlwZW9mIHN0cnVjdHVyZWRDbG9uZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHN0cnVjdHVyZWRDbG9uZSh2YWx1ZSlcbiAgICAgICAgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG59O1xuXG5jb25zdCBsb2FkZWRBc3NldHMgPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGFzc2V0S2V5ID0gKGFzc2V0LCB0eXBlKSA9PiBgJHt0eXBlfToke2Fzc2V0Lm5hbWUgfHwgYXNzZXQudXJpIHx8IGFzc2V0LmNvbnRlbnQgfHwgJyd9YDtcblxuY29uc3QgbG9hZEFzc2V0ID0gKGFzc2V0LCB0eXBlKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gYXNzZXRLZXkoYXNzZXQsIHR5cGUpO1xuICAgIGlmICgha2V5IHx8IGxvYWRlZEFzc2V0cy5oYXMoa2V5KSkgcmV0dXJuIGxvYWRlZEFzc2V0cy5nZXQoa2V5KSB8fCBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGFzc2V0LnVyaSA/IG5ldyBVUkwoYXNzZXQudXJpLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJyc7XG4gICAgY29uc3QgZXhpc3RpbmcgPSB0YXJnZXRVcmxcbiAgICAgICAgPyBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHlwZSA9PT0gJ3N0eWxlJyA/ICdsaW5rW2hyZWZdJyA6ICdzY3JpcHRbc3JjXScpKVxuICAgICAgICAgICAgLmZpbmQoKG5vZGUpID0+ICh0eXBlID09PSAnc3R5bGUnID8gbm9kZS5ocmVmIDogbm9kZS5zcmMpID09PSB0YXJnZXRVcmwpXG4gICAgICAgIDogbnVsbDtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgY29uc3QgcmVhZHkgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgbG9hZGVkQXNzZXRzLnNldChrZXksIHJlYWR5KTtcbiAgICAgICAgcmV0dXJuIHJlYWR5O1xuICAgIH1cblxuICAgIGxldCBub2RlID0gbnVsbDtcbiAgICBjb25zdCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSA9PT0gJ3N0eWxlJyAmJiAhYXNzZXQudXJpID8gJ3N0eWxlJ1xuICAgICAgICAgICAgOiB0eXBlID09PSAnc3R5bGUnID8gJ2xpbmsnIDogJ3NjcmlwdCcpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gYXNzZXQuYXR0cmlidXRlcyB8fCB7fTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0eWxlJyAmJiBhc3NldC51cmkpIHtcbiAgICAgICAgICAgIG5vZGUucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbm9kZS5ocmVmID0gYXNzZXQudXJpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzY3JpcHQnICYmIGFzc2V0LnVyaSkge1xuICAgICAgICAgICAgbm9kZS5zcmMgPSBhc3NldC51cmk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gYXNzZXQuY29udGVudCB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5vbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W25vbmNlXSxzdHlsZVtub25jZV0nKT8ubm9uY2U7XG4gICAgICAgIGlmIChub25jZSkgbm9kZS5ub25jZSA9IG5vbmNlO1xuXG4gICAgICAgIGlmIChhc3NldC51cmkpIHtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUsIHtvbmNlOiB0cnVlfSk7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgYXNzZXQ6ICR7YXNzZXQudXJpfWApKSwge29uY2U6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChub2RlKTtcbiAgICAgICAgaWYgKCFhc3NldC51cmkpIHJlc29sdmUoKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9hZGVkQXNzZXRzLmRlbGV0ZShrZXkpO1xuICAgICAgICBub2RlPy5yZW1vdmUoKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG4gICAgbG9hZGVkQXNzZXRzLnNldChrZXksIHJlYWR5KTtcbiAgICByZXR1cm4gcmVhZHk7XG59O1xuXG5jb25zdCBsb2FkQXNzZXRzID0gYXN5bmMgKGFzc2V0cyA9IHt9LCB0eXBlKSA9PiB7XG4gICAgZm9yIChjb25zdCBhc3NldCBvZiBhc3NldHNbdHlwZV0gfHwgW10pIHtcbiAgICAgICAgYXdhaXQgbG9hZEFzc2V0KGFzc2V0LCB0eXBlKTtcbiAgICB9XG59O1xuXG5jb25zdCBlbnN1cmVSYWRpY2FsTWFydERpc3BsYXkgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5SYWRpY2FsTWFydERpc3BsYXkpIHJldHVybjtcblxuICAgIC8vIGNvbV9yYWRpY2FsbWFydC5zaXRlIG5vcm1hbGx5IGNyZWF0ZXMgdGhpcyBvYmplY3Qgb24gRE9NQ29udGVudExvYWRlZC5cbiAgICAvLyBCdWlsZGVyIGFzc2V0cyBjYW4gYmUgbG9hZGVkIGxhdGVyIGJ5IFF1aWNrIFZpZXcsIHNvIGluaXRpYWxpc2UgdGhlIHNhbWVcbiAgICAvLyBwdWJsaWMgZGVmYXVsdHMgd2l0aG91dCBkaXNwYXRjaGluZyBET01Db250ZW50TG9hZGVkIGEgc2Vjb25kIHRpbWUuXG4gICAgd2luZG93LlJhZGljYWxNYXJ0RGlzcGxheSA9IHtcbiAgICAgICAgY2FydDoge1xuICAgICAgICAgICAgYWRkQnV0dG9uc0xvY2s6IHRydWUsXG4gICAgICAgICAgICBkaXNwbGF5TW9kdWxlQnV0dG9uc0xvY2s6IHRydWUsXG4gICAgICAgICAgICBkaXNjb3VudEhpZGU6IHRydWUsXG4gICAgICAgICAgICBwcm9kdWN0c0Rpc2NvdW50SGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIGJhZGdlSGlkZTogdHJ1ZSxcbiAgICAgICAgICAgIG1vZHVsZUhpZGU6IHRydWUsXG4gICAgICAgICAgICBtb2R1bGVTaG93OiB0cnVlLFxuICAgICAgICAgICAgcGFnZUVycm9yczogdHJ1ZSxcbiAgICAgICAgICAgIHBhZ2VSZWxvYWQ6IHRydWUsXG4gICAgICAgICAgICBub3RpZmljYXRpb25fYWRkU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yc1Nob3c6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tvdXQ6IHtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbnNMb2NrOiB0cnVlLFxuICAgICAgICAgICAgZGlzY291bnRIaWRlOiB0cnVlLFxuICAgICAgICAgICAgY2hlY2tFcnJvcnNTaG93OiB0cnVlLFxuICAgICAgICAgICAgY2hlY2tFcnJvcnNQcm9kdWN0c1Nob3c6IHRydWUsXG4gICAgICAgICAgICBnbG9iYWxMb2FkaW5nU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHNoaXBwaW5nTG9hZGluZ1Nob3c6IHRydWUsXG4gICAgICAgICAgICBwYXltZW50TG9hZGluZ1Nob3c6IHRydWUsXG4gICAgICAgICAgICBsb2dpblNob3c6IHRydWUsXG4gICAgICAgICAgICBlcnJvcnNTaG93OiB0cnVlLFxuICAgICAgICAgICAgY3JlYXRlT3JkZXJQcm9ncmVzczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBsb2dpbjoge1xuICAgICAgICAgICAgYnV0dG9uc0xvY2s6IHRydWUsXG4gICAgICAgICAgICBmcm9tU2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yc1Nob3c6IHRydWVcbiAgICAgICAgfVxuICAgIH07XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29uUmFkaWNhbE1hcnREaXNwbGF5QWZ0ZXJTZXRDb25maWcnLCB7XG4gICAgICAgIGRldGFpbDogd2luZG93LlJhZGljYWxNYXJ0RGlzcGxheVxuICAgIH0pKTtcbn07XG5cbmNvbnN0IGxhYmVscyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncnUnKSA/IHtcbiAgICBsb2FkaW5nOiAn0JfQsNCz0YDRg9C30LrQsOKApicsIGVycm9yOiAn0J3QtSDRg9C00LDQu9C+0YHRjCDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLQvtCy0LDRgC4nLCBpblN0b2NrOiAn0JIg0L3QsNC70LjRh9C40LgnLFxuICAgIG91dE9mU3RvY2s6ICfQndC10YIg0LIg0L3QsNC70LjRh9C40LgnLCBxdWFudGl0eTogJ9Ca0L7Qu9C40YfQtdGB0YLQstC+JywgYWRkVG9DYXJ0OiAn0JIg0LrQvtGA0LfQuNC90YMnLFxuICAgIGRldGFpbHM6ICfQn9C+0LTRgNC+0LHQvdC10LUnLCBxdWlja1ZpZXc6ICfQkdGL0YHRgtGA0YvQuSDQv9GA0L7RgdC80L7RgtGAJywgbm9JbWFnZTogJ9Cd0LXRgiDQuNC30L7QsdGA0LDQttC10L3QuNGPJ1xufSA6IHtcbiAgICBsb2FkaW5nOiAnTG9hZGluZ+KApicsIGVycm9yOiAnVW5hYmxlIHRvIGxvYWQgcHJvZHVjdC4nLCBpblN0b2NrOiAnSW4gc3RvY2snLFxuICAgIG91dE9mU3RvY2s6ICdOb3QgYXZhaWxhYmxlJywgcXVhbnRpdHk6ICdRdWFudGl0eScsIGFkZFRvQ2FydDogJ0FkZCB0byBjYXJ0JyxcbiAgICBkZXRhaWxzOiAnRGV0YWlscycsIHF1aWNrVmlldzogJ1F1aWNrIHZpZXcnLCBub0ltYWdlOiAnTm8gaW1hZ2UnXG59O1xuXG5jb25zdCB0cmFuc2xhdGUgPSAoa2V5LCBmYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB3aW5kb3cuSm9vbWxhPy5UZXh0Py5fPy4oa2V5KTtcbiAgICByZXR1cm4gdHJhbnNsYXRlZCAmJiB0cmFuc2xhdGVkICE9PSBrZXkgPyB0cmFuc2xhdGVkIDogZmFsbGJhY2s7XG59O1xuXG5jb25zdCBlbGVtZW50ID0gKHRhZywgY2xhc3NOYW1lID0gJycsIGF0dHJpYnV0ZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKGNsYXNzTmFtZSkgbm9kZS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2RlO1xufTtcblxuY29uc3QgcmVxdWVzdFByb2R1Y3QgPSBhc3luYyAoZW5kcG9pbnQsIHRhc2ssIHByb2R1Y3RJZCwgc2lnbmFsID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndGFzaycsIHRhc2spO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcm9kdWN0X2lkJywgcHJvZHVjdElkKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgaGVhZGVyczogeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J30sXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBzaWduYWxcbiAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcGF5bG9hZC5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5tZXNzYWdlIHx8IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gcGF5bG9hZC5kYXRhO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAxICYmIHR5cGVvZiBkYXRhWzBdID09PSAnb2JqZWN0JykgZGF0YSA9IGRhdGFbMF07XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmlkKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb2R1Y3QgZGF0YSBpcyBlbXB0eS4nKTtcbiAgICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IHJlcXVlc3RRdWlja1ZpZXdMYXlvdXQgPSBhc3luYyAoZW5kcG9pbnQsIHByb2R1Y3RJZCwgdGVtcGxhdGVJZCwgc2lnbmFsID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZW5kcG9pbnQsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndGFzaycsICdxdWlja1ZpZXdMYXlvdXQnKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgncHJvZHVjdF9pZCcsIHByb2R1Y3RJZCk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3RlbXBsYXRlX2lkJywgdGVtcGxhdGVJZCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybC50b1N0cmluZygpLCB7XG4gICAgICAgIGhlYWRlcnM6IHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCd9LFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgc2lnbmFsXG4gICAgfSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rIHx8IHBheWxvYWQuc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQubWVzc2FnZSB8fCBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IHBheWxvYWQuZGF0YTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgZGF0YVswXSA9PT0gJ29iamVjdCcpIGRhdGEgPSBkYXRhWzBdO1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS5odG1sKSB0aHJvdyBuZXcgRXJyb3IoJ1F1aWNrIFZpZXcgbGF5b3V0IGlzIGVtcHR5LicpO1xuICAgIHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2R1Y3RTY29wZSA9IChzb3VyY2UpID0+IHtcbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuIGRvY3VtZW50O1xuXG4gICAgLy8gSW5zaWRlIFJNIEdyaWQsIHRoZSBncmlkIGl0ZW0gaXMgdGhlIHZpc3VhbCBjYXJkLiBVc2UgaXQgYXMgdGhlIGhvdmVyIGFuZFxuICAgIC8vIHVwZGF0ZSBzY29wZSBzbyBSTSBQcm9kdWN0IENhcmQgZG9lcyBub3QgY3JlYXRlIGEgc2Vjb25kIGNhcmQgc3VyZmFjZSBhbmRcbiAgICAvLyB0aGUgcmV2ZWFsIHBhbmVsIGNhbiBhbGlnbiB3aXRoIHRoZSBjb21wbGV0ZSBncmlkIGl0ZW0uXG4gICAgcmV0dXJuIHNvdXJjZS5wYXJlbnRFbGVtZW50Py5jbG9zZXN0KCcucm0tZ3JpZC1pdGVtLCAuZWwtaXRlbScpIHx8IHNvdXJjZTtcbn07XG5cbmNvbnN0IGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSA9IChub2RlLCBmaWVsZCkgPT4ge1xuICAgIG5vZGUuaW5uZXJIVE1MID0gZmllbGQudmFsdWUgfHwgJyc7XG4gICAgaWYgKCFub2RlLmNoaWxkTm9kZXMubGVuZ3RoICYmIGZpZWxkLnRleHQpIG5vZGUuYXBwZW5kKHRleHQoZmllbGQudGV4dCkpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvZHVjdFNwZWNpZmljYXRpb25zID0gKGNvbnRhaW5lciwgc291cmNlRmllbGRzZXRzID0gW10pID0+IHtcbiAgICBjb25zdCBzaG93VmFyaWFudHMgPSBjb250YWluZXIuZGF0YXNldC5zaG93VmFyaWFudEZpZWxkcyAhPT0gJ2ZhbHNlJztcbiAgICBjb25zdCBzaG93VGl0bGVzID0gY29udGFpbmVyLmRhdGFzZXQuc2hvd0ZpZWxkc2V0VGl0bGVzICE9PSAnZmFsc2UnO1xuICAgIGNvbnN0IGRpdmlkZXIgPSBjb250YWluZXIuZGF0YXNldC5kaXZpZGVyICE9PSAnZmFsc2UnO1xuICAgIGNvbnN0IHN0cmlwZWQgPSBjb250YWluZXIuZGF0YXNldC5zdHJpcGVkID09PSAndHJ1ZSc7XG4gICAgY29uc3QgbGF5b3V0ID0gWydkZXNjcmlwdGlvbi1saXN0JywgJ3RhYmxlJywgJ2dyaWQnXS5pbmNsdWRlcyhjb250YWluZXIuZGF0YXNldC5sYXlvdXQpXG4gICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQubGF5b3V0IDogJ2Rlc2NyaXB0aW9uLWxpc3QnO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbJzEnLCAnMicsICczJywgJzQnXS5pbmNsdWRlcyhjb250YWluZXIuZGF0YXNldC5jb2x1bW5zKVxuICAgICAgICA/IGNvbnRhaW5lci5kYXRhc2V0LmNvbHVtbnMgOiAnMic7XG4gICAgY29uc3QgZmllbGRzZXRzID0gc291cmNlRmllbGRzZXRzLm1hcCgoZmllbGRzZXQpID0+ICh7XG4gICAgICAgIC4uLmZpZWxkc2V0LFxuICAgICAgICBmaWVsZHM6IChmaWVsZHNldC5maWVsZHMgfHwgW10pLmZpbHRlcigoZmllbGQpID0+IHNob3dWYXJpYW50cyB8fCAhZmllbGQudmFyaWFudClcbiAgICB9KSkuZmlsdGVyKChmaWVsZHNldCkgPT4gZmllbGRzZXQuZmllbGRzLmxlbmd0aCk7XG4gICAgY29uc3QgY29udGVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fY29udGVudCcpO1xuICAgIGlmICghY29udGVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZmllbGRzZXRzLmZvckVhY2goKGZpZWxkc2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBlbGVtZW50KCdzZWN0aW9uJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2ZpZWxkc2V0Jyk7XG4gICAgICAgIGlmIChzaG93VGl0bGVzICYmIGZpZWxkc2V0LnRpdGxlKSB7XG4gICAgICAgICAgICBjb25zdCB0aXRsZU5vZGUgPSBlbGVtZW50KCdoMycsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX190aXRsZSB1ay1oNCcpO1xuICAgICAgICAgICAgdGl0bGVOb2RlLmFwcGVuZCh0ZXh0KGZpZWxkc2V0LnRpdGxlKSk7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZCh0aXRsZU5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxheW91dCA9PT0gJ3RhYmxlJykge1xuICAgICAgICAgICAgY29uc3QgdGFibGUgPSBlbGVtZW50KCd0YWJsZScsIGBybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX190YWJsZSB1ay10YWJsZSB1ay10YWJsZS1zbWFsbCR7ZGl2aWRlciA/ICcgdWstdGFibGUtZGl2aWRlcicgOiAnJ30ke3N0cmlwZWQgPyAnIHVrLXRhYmxlLXN0cmlwZWQnIDogJyd9YCk7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgICAgICAgIGZpZWxkc2V0LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGVsZW1lbnQoJ3RyJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGVsZW1lbnQoJ3RoJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2xhYmVsJywge3Njb3BlOiAncm93J30pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudCgndGQnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fdmFsdWUnKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgICAgIGFwcGVuZFNwZWNpZmljYXRpb25WYWx1ZSh2YWx1ZSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmQobGFiZWwsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBib2R5LmFwcGVuZChyb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YWJsZS5hcHBlbmQoYm9keSk7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZCh0YWJsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnZ3JpZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBlbGVtZW50KCdkaXYnLCBgcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fZ3JpZCB1ay1jaGlsZC13aWR0aC0xLTEgdWstY2hpbGQtd2lkdGgtMS0ke2NvbHVtbnN9QG0ke2RpdmlkZXIgPyAnIHVrLWdyaWQtZGl2aWRlcicgOiAnJ31gLCB7J3VrLWdyaWQnOiB0cnVlfSk7XG4gICAgICAgICAgICBmaWVsZHNldC5maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZWxlbWVudCgnZGl2JywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGVsZW1lbnQoJ2RpdicsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19sYWJlbCB1ay10ZXh0LW1ldGEnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQoJ2RpdicsICdybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX192YWx1ZSB1ay1tYXJnaW4tc21hbGwtdG9wJyk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXBwZW5kKHRleHQoZmllbGQudGl0bGUpKTtcbiAgICAgICAgICAgICAgICBhcHBlbmRTcGVjaWZpY2F0aW9uVmFsdWUodmFsdWUsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZChsYWJlbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGdyaWQuYXBwZW5kKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZChncmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBlbGVtZW50KCdkbCcsIGBybS1wcm9kdWN0LXNwZWNpZmljYXRpb25zX19saXN0IHVrLWRlc2NyaXB0aW9uLWxpc3Qke2RpdmlkZXIgPyAnIHVrLWRlc2NyaXB0aW9uLWxpc3QtZGl2aWRlcicgOiAnJ31gKTtcbiAgICAgICAgICAgIGZpZWxkc2V0LmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50KCdkaXYnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19faXRlbScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gZWxlbWVudCgnZHQnLCAncm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc19fbGFiZWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQoJ2RkJywgJ3JtLXByb2R1Y3Qtc3BlY2lmaWNhdGlvbnNfX3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXBwZW5kKHRleHQoZmllbGQudGl0bGUpKTtcbiAgICAgICAgICAgICAgICBhcHBlbmRTcGVjaWZpY2F0aW9uVmFsdWUodmFsdWUsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZChsYWJlbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZChsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICBmcmFnbWVudC5hcHBlbmQoc2VjdGlvbik7XG4gICAgfSk7XG5cbiAgICBjb250ZW50LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG4gICAgY29udGFpbmVyLmhpZGRlbiA9IGZpZWxkc2V0cy5sZW5ndGggPT09IDA7XG4gICAgd2luZG93LlVJa2l0Py51cGRhdGU/Lihjb250YWluZXIpO1xufTtcblxuY29uc3Qgc2V0TWV0YUNvbnRlbnQgPSAoYXR0cmlidXRlLCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihgbWV0YVske2F0dHJpYnV0ZX09XCIke25hbWV9XCJdYCk7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgbmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKG5vZGUpO1xuICAgIH1cbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIHZhbHVlKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVByb2R1Y3RNZXRhZGF0YSA9IChwcm9kdWN0KSA9PiB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBTdHJpbmcocHJvZHVjdC5pbnRyb3RleHQgfHwgJycpLnRyaW0oKTtcbiAgICBjb25zdCBpbWFnZSA9IHByb2R1Y3QubWVkaWE/LlswXT8uc3JjIHx8ICcnO1xuICAgIGNvbnN0IGxpbmsgPSBwcm9kdWN0LmxpbmsgPyBuZXcgVVJMKHByb2R1Y3QubGluaywgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZiA6ICcnO1xuICAgIGxldCBjYW5vbmljYWwgPSBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwiY2Fub25pY2FsXCJdJyk7XG5cbiAgICBpZiAoIWNhbm9uaWNhbCAmJiBsaW5rKSB7XG4gICAgICAgIGNhbm9uaWNhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgY2Fub25pY2FsLnJlbCA9ICdjYW5vbmljYWwnO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChjYW5vbmljYWwpO1xuICAgIH1cbiAgICBpZiAoY2Fub25pY2FsICYmIGxpbmspIGNhbm9uaWNhbC5ocmVmID0gbGluaztcbiAgICBzZXRNZXRhQ29udGVudCgnbmFtZScsICdkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICBzZXRNZXRhQ29udGVudCgncHJvcGVydHknLCAnb2c6dGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICcnKTtcbiAgICBzZXRNZXRhQ29udGVudCgncHJvcGVydHknLCAnb2c6ZGVzY3JpcHRpb24nLCBkZXNjcmlwdGlvbik7XG4gICAgc2V0TWV0YUNvbnRlbnQoJ3Byb3BlcnR5JywgJ29nOnVybCcsIGxpbmspO1xuICAgIHNldE1ldGFDb250ZW50KCdwcm9wZXJ0eScsICdvZzppbWFnZScsIGltYWdlID8gbmV3IFVSTChpbWFnZSwgZG9jdW1lbnQuYmFzZVVSSSkuaHJlZiA6ICcnKTtcbiAgICBzZXRNZXRhQ29udGVudCgnbmFtZScsICd0d2l0dGVyOnRpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnJyk7XG4gICAgc2V0TWV0YUNvbnRlbnQoJ25hbWUnLCAndHdpdHRlcjpkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICBzZXRNZXRhQ29udGVudCgnbmFtZScsICd0d2l0dGVyOmltYWdlJywgaW1hZ2UgPyBuZXcgVVJMKGltYWdlLCBkb2N1bWVudC5iYXNlVVJJKS5ocmVmIDogJycpO1xufTtcblxuY2xhc3MgUHJvZHVjdFNjb3BlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIHRoaXMuc2NvcGUgPSByZXNvbHZlUHJvZHVjdFNjb3BlKHNvdXJjZSk7XG4gICAgICAgIHRoaXMucHJvZHVjdCA9IHRoaXMucmVhZERhdGEoKTtcbiAgICB9XG5cbiAgICByZWFkRGF0YSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEFycmF5LmZyb20odGhpcy5zb3VyY2UuY2hpbGRyZW4gfHwgW10pXG4gICAgICAgICAgICAuZmluZCgobm9kZSkgPT4gbm9kZS5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdybS1wcm9kdWN0X19kYXRhJylcbiAgICAgICAgICAgICAgICB8fCBub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ3JtLXByb2R1Y3QtY2FyZF9fZGF0YScpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGE/LnRleHRDb250ZW50IHx8ICd7fScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlcyhzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICAgICAgICAgLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gbm9kZS5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvd25lciA9PT0gdGhpcy5zb3VyY2UgfHwgKCFvd25lciAmJiB0aGlzLnNjb3BlICE9PSB0aGlzLnNvdXJjZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RTY29wZVJlYWR5KSByZXR1cm47XG4gICAgICAgIHRoaXMuc291cmNlLmRhdGFzZXQucm1Qcm9kdWN0U2NvcGVSZWFkeSA9ICd0cnVlJztcbiAgICAgICAgdGhpcy5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6dmFyaWFudC1jaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKSAhPT0gdGhpcy5zb3VyY2UpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChldmVudC5kZXRhaWw/LnByb2R1Y3Q/LmlkKSB0aGlzLmFwcGx5UHJvZHVjdChldmVudC5kZXRhaWwucHJvZHVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Py5pZCAmJiB0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFBhZ2UgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlLmRhdGFzZXQudXBkYXRlRG9jdW1lbnRUaXRsZSAhPT0gJ2ZhbHNlJyAmJiB0aGlzLnByb2R1Y3QudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRoaXMucHJvZHVjdC50aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnVwZGF0ZURvY3VtZW50TWV0YWRhdGEgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0TWV0YWRhdGEodGhpcy5wcm9kdWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UHJvZHVjdChwcm9kdWN0KSB7XG4gICAgICAgIHRoaXMucHJvZHVjdCA9IHsuLi50aGlzLnByb2R1Y3QsIC4uLnByb2R1Y3R9O1xuICAgICAgICB0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdElkID0gU3RyaW5nKHByb2R1Y3QuaWQpO1xuXG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtdGl0bGVdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QudGl0bGUgfHwgJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWNvZGVdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QuY29kZSB8fCAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtZGVzY3JpcHRpb25dJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBwcm9kdWN0LmludHJvdGV4dEh0bWwgfHwgcHJvZHVjdC5pbnRyb3RleHQgfHwgJyc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGVzKCdbZGF0YS1ybS1wcm9kdWN0LWZ1bGwtZGVzY3JpcHRpb25dJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBwcm9kdWN0LmZ1bGx0ZXh0SHRtbCB8fCBwcm9kdWN0LmZ1bGx0ZXh0IHx8ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1saW5rXScpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LmxpbmspIG5vZGUuaHJlZiA9IHByb2R1Y3QubGluaztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbWVkaWEgPSBwcm9kdWN0Lm1lZGlhPy5bMF0gfHwge307XG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtaW1hZ2VdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lZGlhLnNyYykgbm9kZS5zcmMgPSBtZWRpYS5zcmM7XG4gICAgICAgICAgICBlbHNlIG5vZGUucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgICAgIG5vZGUuYWx0ID0gbWVkaWEuYWx0IHx8IHByb2R1Y3QudGl0bGUgfHwgJyc7XG4gICAgICAgICAgICBub2RlLmhpZGRlbiA9ICFtZWRpYS5zcmM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZXMoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2VdJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFzZSA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1wcmljZS1iYXNlXScpO1xuICAgICAgICAgICAgY29uc3QgZmluYWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtcHJpY2UtZmluYWxdJyk7XG4gICAgICAgICAgICBjb25zdCBkaXNjb3VudCA9IG5vZGUucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1kaXNjb3VudF0nKTtcbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBCb29sZWFuKHByb2R1Y3QucHJpY2U/LmRpc2NvdW50RW5hYmxlZCk7XG4gICAgICAgICAgICBpZiAoYmFzZSkge1xuICAgICAgICAgICAgICAgIGJhc2UudGV4dENvbnRlbnQgPSBwcm9kdWN0LnByaWNlPy5iYXNlIHx8ICcnO1xuICAgICAgICAgICAgICAgIGJhc2UuaGlkZGVuID0gIWVuYWJsZWQgfHwgbm9kZS5kYXRhc2V0LnNob3dCYXNlICE9PSAndHJ1ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmluYWwpIGZpbmFsLnRleHRDb250ZW50ID0gcHJvZHVjdC5wcmljZT8uZmluYWwgfHwgJyc7XG4gICAgICAgICAgICBpZiAoZGlzY291bnQpIHtcbiAgICAgICAgICAgICAgICBkaXNjb3VudC50ZXh0Q29udGVudCA9IHByb2R1Y3QucHJpY2U/LmRpc2NvdW50IHx8ICcnO1xuICAgICAgICAgICAgICAgIGRpc2NvdW50LmhpZGRlbiA9ICFlbmFibGVkIHx8IG5vZGUuZGF0YXNldC5zaG93RGlzY291bnQgIT09ICd0cnVlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1hdmFpbGFiaWxpdHldJykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QuaW5TdG9jayA/IG5vZGUuZGF0YXNldC5sYWJlbEluIDogbm9kZS5kYXRhc2V0LmxhYmVsT3V0O1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LXN1Y2Nlc3MnLCBCb29sZWFuKHByb2R1Y3QuaW5TdG9jaykpO1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LW11dGVkJywgIXByb2R1Y3QuaW5TdG9jayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubm9kZXMoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKS5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQuaWQgPSBTdHJpbmcocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICBjYXJ0LmRhdGFzZXQucm1EeW5hbWljUHJvZHVjdCA9ICd0cnVlJztcbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicXVhbnRpdHlcIl0nKTtcbiAgICAgICAgICAgIGlmIChxdWFudGl0eSkge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5Lm1pbiA9IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiA/PyAxO1xuICAgICAgICAgICAgICAgIHF1YW50aXR5LnN0ZXAgPSBwcm9kdWN0LnF1YW50aXR5Py5zdGVwID8/IDE7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3QucXVhbnRpdHk/Lm1heCkgcXVhbnRpdHkubWF4ID0gcHJvZHVjdC5xdWFudGl0eS5tYXg7XG4gICAgICAgICAgICAgICAgZWxzZSBxdWFudGl0eS5yZW1vdmVBdHRyaWJ1dGUoJ21heCcpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocXVhbnRpdHkudmFsdWUpIDwgTnVtYmVyKHF1YW50aXR5Lm1pbikpIHF1YW50aXR5LnZhbHVlID0gcXVhbnRpdHkubWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FydC5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGJ1dHRvbikgPT4geyBidXR0b24uZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrOyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ub2RlcygnW2RhdGEtcm0tcHJvZHVjdC1zcGVjaWZpY2F0aW9uc10nKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJQcm9kdWN0U3BlY2lmaWNhdGlvbnMobm9kZSwgcHJvZHVjdC5maWVsZHNldHMgfHwgW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5zb3VyY2UuZGF0YXNldC5ybVByb2R1Y3RQYWdlID09PSAndHJ1ZSdcbiAgICAgICAgICAgICYmIHRoaXMuc291cmNlLmRhdGFzZXQudXBkYXRlRG9jdW1lbnRUaXRsZSAhPT0gJ2ZhbHNlJ1xuICAgICAgICAgICAgJiYgcHJvZHVjdC50aXRsZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBwcm9kdWN0LnRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZS5kYXRhc2V0LnJtUHJvZHVjdFBhZ2UgPT09ICd0cnVlJ1xuICAgICAgICAgICAgJiYgdGhpcy5zb3VyY2UuZGF0YXNldC51cGRhdGVEb2N1bWVudE1ldGFkYXRhICE9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICB1cGRhdGVQcm9kdWN0TWV0YWRhdGEodGhpcy5wcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NvcGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JhZGljYWxtYXJ0OnByb2R1Y3QtY2hhbmdlJywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGRldGFpbDoge3Byb2R1Y3Q6IHRoaXMucHJvZHVjdH1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvZHVjdENhcmREcm9wZG93biB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZGF0YXNldC5ybVByb2R1Y3RDYXJkRHJvcGRvd25SZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZGF0YXNldC5ybVByb2R1Y3RDYXJkRHJvcGRvd25SZWFkeSA9ICd0cnVlJztcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhc2V0LmRpc3BsYXlNb2RlICE9PSAnaG92ZXInKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5lbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgICAgIGNvbnN0IG93bmVyID0gc291cmNlXG4gICAgICAgICAgICA/IHJlc29sdmVQcm9kdWN0U2NvcGUoc291cmNlKVxuICAgICAgICAgICAgOiB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudD8uY2xvc2VzdCgnLmVsLWl0ZW0sIC51ay1jYXJkLCAucm0tcHJvZHVjdC1jYXJkJyk7XG4gICAgICAgIGlmICghb3duZXIgfHwgb3duZXIgPT09IHRoaXMuZWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIG93bmVyLmNsYXNzTGlzdC5hZGQoJ3JtLXByb2R1Y3QtY2FyZC0taG92ZXInKTtcbiAgICAgICAgb3duZXIuZGF0YXNldC5ybUhvdmVyQnJlYWtwb2ludCA9IHRoaXMuZWxlbWVudC5kYXRhc2V0LmhvdmVyQnJlYWtwb2ludCB8fCAnbSc7XG4gICAgfVxufVxuXG5jbGFzcyBWYXJpYW50UGlja2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGEgPSBudWxsLCBvblByb2R1Y3QgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHRoaXMucmVhZERhdGEoKTtcbiAgICAgICAgdGhpcy5vblByb2R1Y3QgPSBvblByb2R1Y3Q7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbnVsbDtcblx0XHR0aGlzLmhhbmRsZVBvcFN0YXRlID0gdGhpcy5oYW5kbGVQb3BTdGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudmlzaWJsZUZpZWxkcyA9IG5ldyBTZXQoKHRoaXMuZGF0YT8uZmllbGRzIHx8IFtdKS5tYXAoKGZpZWxkKSA9PiBTdHJpbmcoZmllbGQuYWxpYXMpKSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuZGF0YT8ucHJvZHVjdHM/LmZpbmQoKHByb2R1Y3QpID0+IE51bWJlcihwcm9kdWN0LmlkKSA9PT0gTnVtYmVyKHRoaXMuZGF0YS5jdXJyZW50UHJvZHVjdCkpO1xuXHRcdGlmIChjdXJyZW50KSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkID0gdGhpcy52aXNpYmxlU2VsZWN0aW9uKGN1cnJlbnQuZmllbGRzKTtcblx0XHR9XG4gICAgfVxuXG5cdHZpc2libGVTZWxlY3Rpb24oZmllbGRzID0ge30pIHtcblx0XHRyZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuXHRcdFx0T2JqZWN0LmVudHJpZXMoZmllbGRzKS5maWx0ZXIoKFthbGlhc10pID0+IHRoaXMudmlzaWJsZUZpZWxkcy5oYXMoU3RyaW5nKGFsaWFzKSkpXG5cdFx0KTtcblx0fVxuXG4gICAgcmVhZERhdGEoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm12YXJpYW50c19fZGF0YScpPy50ZXh0Q29udGVudCB8fCAne30nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGE/LmZpZWxkcz8ubGVuZ3RoIHx8ICF0aGlzLmRhdGE/LnByb2R1Y3RzPy5sZW5ndGggfHwgdGhpcy5jb250YWluZXIuZGF0YXNldC5ybVZhcmlhbnRzUmVhZHkpIHJldHVybjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuZGF0YXNldC5ybVZhcmlhbnRzUmVhZHkgPSAndHJ1ZSc7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS12YWx1ZV0nKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9uIHx8IG9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBvcHRpb24uY2xvc2VzdCgnW2RhdGEtcm0tZmllbGRdJyk7XG4gICAgICAgICAgICBpZiAoZmllbGQpIHRoaXMuc2VsZWN0KGZpZWxkLmRhdGFzZXQucm1GaWVsZCwgb3B0aW9uLmRhdGFzZXQucm1WYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm12YXJpYW50c19fc2VsZWN0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IHNlbGVjdD8uY2xvc2VzdCgnW2RhdGEtcm0tZmllbGRdJyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ICYmIGZpZWxkKSB0aGlzLnNlbGVjdChmaWVsZC5kYXRhc2V0LnJtRmllbGQsIHNlbGVjdC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG5cdFx0dGhpcy5yZW5kZXJTdGF0ZSgpO1xuXHRcdHRoaXMuaW5pdEhpc3RvcnkoKTtcbiAgICB9XG5cblx0aW5pdEhpc3RvcnkoKSB7XG5cdFx0aWYgKCFbJ3JlcGxhY2UnLCAncHVzaCddLmluY2x1ZGVzKHRoaXMuY29udGFpbmVyLmRhdGFzZXQudXBkYXRlVXJsKVxuXHRcdFx0fHwgdHlwZW9mIHdpbmRvdy5oaXN0b3J5Py5yZXBsYWNlU3RhdGUgIT09ICdmdW5jdGlvbicpIHJldHVybjtcblxuXHRcdGNvbnN0IGN1cnJlbnRJZCA9IE51bWJlcih0aGlzLmRhdGEuY3VycmVudFByb2R1Y3QpO1xuXHRcdGlmIChjdXJyZW50SWQgJiYgIU51bWJlcih3aW5kb3cuaGlzdG9yeS5zdGF0ZT8ucm1Qcm9kdWN0SWQpKSB7XG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoey4uLndpbmRvdy5oaXN0b3J5LnN0YXRlLCBybVByb2R1Y3RJZDogY3VycmVudElkfSwgJycsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQudXBkYXRlVXJsID09PSAncHVzaCcpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlUG9wU3RhdGUpO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZVBvcFN0YXRlKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQudXBkYXRlVXJsICE9PSAncHVzaCcpIHJldHVybjtcblx0XHRsZXQgaWQgPSBOdW1iZXIoZXZlbnQuc3RhdGU/LnJtUHJvZHVjdElkKTtcblx0XHRpZiAoIWlkKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKHByb2R1Y3QpID0+IHtcblx0XHRcdFx0aWYgKCFwcm9kdWN0LmxpbmspIHJldHVybiBmYWxzZTtcblx0XHRcdFx0Y29uc3QgbGluayA9IG5ldyBVUkwocHJvZHVjdC5saW5rLCBkb2N1bWVudC5iYXNlVVJJKTtcblx0XHRcdFx0cmV0dXJuIGxpbmsucGF0aG5hbWUgPT09IGN1cnJlbnRVcmwucGF0aG5hbWUgJiYgbGluay5zZWFyY2ggPT09IGN1cnJlbnRVcmwuc2VhcmNoO1xuXHRcdFx0fSk7XG5cdFx0XHRpZCA9IE51bWJlcihpdGVtPy5pZCk7XG5cdFx0fVxuXHRcdGNvbnN0IHByb2R1Y3QgPSB0aGlzLmRhdGEucHJvZHVjdHMuZmluZCgoaXRlbSkgPT4gTnVtYmVyKGl0ZW0uaWQpID09PSBpZCk7XG5cdFx0aWYgKCFwcm9kdWN0IHx8IE51bWJlcih0aGlzLmRhdGEuY3VycmVudFByb2R1Y3QpID09PSBpZCkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zZWxlY3RlZCA9IHRoaXMudmlzaWJsZVNlbGVjdGlvbihwcm9kdWN0LmZpZWxkcyk7XG5cdFx0dGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0ID0gaWQ7XG5cdFx0dGhpcy5yZW5kZXJTdGF0ZSgpO1xuXHRcdHRoaXMubG9hZFByb2R1Y3QocHJvZHVjdCwgZmFsc2UpO1xuXHR9XG5cbiAgICBzZWxlY3QoYWxpYXMsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHdhbnRlZCA9IHsuLi50aGlzLnNlbGVjdGVkLCBbYWxpYXNdOiBTdHJpbmcodmFsdWUpfTtcbiAgICAgICAgbGV0IHByb2R1Y3QgPSB0aGlzLmRhdGEucHJvZHVjdHMuZmluZCgoaXRlbSkgPT4gdGhpcy5tYXRjaGVzKGl0ZW0sIHdhbnRlZCkpO1xuXG4gICAgICAgIC8vIFNwYXJzZSB2YXJpYXRpb24gbWF0cmljZXMgYXJlIGNvbW1vbi4gSWYgdGhlIGV4YWN0IGNvbWJpbmF0aW9uIGRvZXNcbiAgICAgICAgLy8gbm90IGV4aXN0LCBtb3ZlIHRvIHRoZSBmaXJzdCByZWFsIHByb2R1Y3QgY29udGFpbmluZyB0aGUgY2hhbmdlZCB2YWx1ZS5cbiAgICAgICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICAgICAgICBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IFN0cmluZyhpdGVtLmZpZWxkc1thbGlhc10pID09PSBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb2R1Y3QpIHJldHVybjtcblxuXHRcdHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZpc2libGVTZWxlY3Rpb24ocHJvZHVjdC5maWVsZHMpO1xuICAgICAgICB0aGlzLmRhdGEuY3VycmVudFByb2R1Y3QgPSBOdW1iZXIocHJvZHVjdC5pZCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3RhdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIuZGF0YXNldC5hY3Rpb24gPT09ICduYXZpZ2F0ZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24ocHJvZHVjdC5saW5rKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZFByb2R1Y3QocHJvZHVjdCk7XG4gICAgfVxuXG4gICAgbWF0Y2hlcyhwcm9kdWN0LCBzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHNlbGVjdGlvbikuZXZlcnkoKFthbGlhcywgdmFsdWVdKSA9PiBTdHJpbmcocHJvZHVjdC5maWVsZHNbYWxpYXNdKSA9PT0gU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGRpc2FibGVVbmF2YWlsYWJsZSA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZGlzYWJsZVVuYXZhaWxhYmxlICE9PSAnZmFsc2UnO1xuICAgICAgICB0aGlzLmRhdGEuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtcm0tZmllbGQ9XCIke0NTUy5lc2NhcGUoZmllbGQuYWxpYXMpfVwiXWApO1xuICAgICAgICAgICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tdmFsdWVdJykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gU3RyaW5nKG9wdGlvbi5kYXRhc2V0LnJtVmFsdWUpID09PSBTdHJpbmcodGhpcy5zZWxlY3RlZFtmaWVsZC5hbGlhc10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IHRoaXMuaXNBdmFpbGFibGUoZmllbGQuYWxpYXMsIG9wdGlvbi5kYXRhc2V0LnJtVmFsdWUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGFjdGl2ZSA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdybXZhcmlhbnRzX19vcHRpb24tLWFjdGl2ZScsIGFjdGl2ZSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gZGlzYWJsZVVuYXZhaWxhYmxlICYmICFhdmFpbGFibGU7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIG9wdGlvbi5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLnJtdmFyaWFudHNfX3NlbGVjdCcpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdID8/ICcnO1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZGlzYWJsZWQgPSBkaXNhYmxlVW5hdmFpbGFibGUgJiYgIXRoaXMuaXNBdmFpbGFibGUoZmllbGQuYWxpYXMsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblx0XHRcdGNvbnN0IHNlbGVjdGVkTGFiZWwgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXNlbGVjdGVkLWxhYmVsXScpO1xuXHRcdFx0aWYgKHNlbGVjdGVkTGFiZWwpIHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBTdHJpbmcodGhpcy5zZWxlY3RlZFtmaWVsZC5hbGlhc10gPz8gJycpO1xuXHRcdFx0XHRjb25zdCBvcHRpb24gPSBmaWVsZC5vcHRpb25zLmZpbmQoKGl0ZW0pID0+IFN0cmluZyhpdGVtLnZhbHVlKSA9PT0gdmFsdWUpO1xuXHRcdFx0XHRzZWxlY3RlZExhYmVsLnRleHRDb250ZW50ID0gb3B0aW9uPy5sYWJlbCA/IGAgwrcgJHtvcHRpb24ubGFiZWx9YCA6ICcnO1xuXHRcdFx0fVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0F2YWlsYWJsZShhbGlhcywgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJGaWVsZHMgPSBPYmplY3QuZW50cmllcyh0aGlzLnNlbGVjdGVkKS5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IGFsaWFzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcm9kdWN0cy5zb21lKChwcm9kdWN0KSA9PiBTdHJpbmcocHJvZHVjdC5maWVsZHNbYWxpYXNdKSA9PT0gU3RyaW5nKHZhbHVlKVxuICAgICAgICAgICAgJiYgb3RoZXJGaWVsZHMuZXZlcnkoKFtrZXksIHNlbGVjdGVkXSkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2tleV0pID09PSBTdHJpbmcoc2VsZWN0ZWQpKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFByb2R1Y3QocHJvZHVjdCwgdXBkYXRlSGlzdG9yeSA9IHRydWUpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtdmFyaWFudHNfX3N0YXR1cycpO1xuICAgICAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tbGFiZWwtbG9hZGluZ10nKT8udGV4dENvbnRlbnQgfHwgJ0xvYWRpbmfigKYnO1xuICAgICAgICBjb25zdCBwcm9kdWN0U2NvcGUgPSB0aGlzLmNvbnRhaW5lci5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpO1xuICAgICAgICBpZiAoc3RhdHVzKSBzdGF0dXMudGV4dENvbnRlbnQgPSBsb2FkaW5nO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdybXZhcmlhbnRzLS1sb2FkaW5nJyk7XG5cdFx0cHJvZHVjdFNjb3BlPy5jbGFzc0xpc3QuYWRkKCdybS1wcm9kdWN0LS1sb2FkaW5nJyk7XG5cdFx0cHJvZHVjdFNjb3BlPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtYnVzeScsICd0cnVlJyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGVuZGluZykgdGhpcy5wZW5kaW5nLmFib3J0KCk7XG4gICAgICAgIHRoaXMucGVuZGluZyA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGVuZGluZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZnVsbCA9IGF3YWl0IHJlcXVlc3RQcm9kdWN0KHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZW5kcG9pbnQsICd2YXJpYW50JywgcHJvZHVjdC5pZCwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgICAgdGhpcy5hcHBseVByb2R1Y3QoZnVsbCwgdXBkYXRlSGlzdG9yeSk7XG4gICAgICAgICAgICBpZiAoc3RhdHVzKSBzdGF0dXMudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvci5uYW1lICE9PSAnQWJvcnRFcnJvcicgJiYgc3RhdHVzKSBzdGF0dXMudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGVuZGluZyA9PT0gY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3JtdmFyaWFudHMtLWxvYWRpbmcnKTtcblx0XHRcdFx0cHJvZHVjdFNjb3BlPy5jbGFzc0xpc3QucmVtb3ZlKCdybS1wcm9kdWN0LS1sb2FkaW5nJyk7XG5cdFx0XHRcdHByb2R1Y3RTY29wZT8ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWJ1c3knKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlQcm9kdWN0KHByb2R1Y3QsIHVwZGF0ZUhpc3RvcnkgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblByb2R1Y3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub25Qcm9kdWN0KHByb2R1Y3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5jb250YWluZXIuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKTtcbiAgICAgICAgICAgIGNvbnN0IHNjb3BlID0gc291cmNlXG5cdFx0XHRcdD8gcmVzb2x2ZVByb2R1Y3RTY29wZShzb3VyY2UpXG5cdFx0XHRcdDogdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudD8uY2xvc2VzdCgnLmVsLWl0ZW0sIC51ay1jYXJkLCAucm0tcHJvZHVjdC1jYXJkJykgfHwgZG9jdW1lbnQ7XG4gICAgICAgICAgICBzY29wZS5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0sIFtkYXRhLXJhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdJylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJ0LmRhdGFzZXQuaWQgPSBwcm9kdWN0LmlkO1xuICAgICAgICAgICAgICAgICAgICBjYXJ0LmRhdGFzZXQucm1EeW5hbWljUHJvZHVjdCA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVybE1vZGUgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnVwZGF0ZVVybDtcbiAgICAgICAgY29uc3QgaGlzdG9yeU1ldGhvZCA9IHVybE1vZGUgPT09ICdwdXNoJyA/ICdwdXNoU3RhdGUnIDogdXJsTW9kZSA9PT0gJ3JlcGxhY2UnID8gJ3JlcGxhY2VTdGF0ZScgOiBudWxsO1xuICAgICAgICBpZiAodXBkYXRlSGlzdG9yeSAmJiBoaXN0b3J5TWV0aG9kICYmIHByb2R1Y3QubGluayAmJiB0eXBlb2Ygd2luZG93Lmhpc3Rvcnk/LltoaXN0b3J5TWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnlbaGlzdG9yeU1ldGhvZF0oey4uLndpbmRvdy5oaXN0b3J5LnN0YXRlLCBybVByb2R1Y3RJZDogcHJvZHVjdC5pZH0sICcnLCBwcm9kdWN0LmxpbmspO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JhZGljYWxtYXJ0OnZhcmlhbnQtY2hhbmdlJywge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGRldGFpbDoge3Byb2R1Y3R9XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5cbmNsYXNzIFF1aWNrVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLnByb2R1Y3QgPSBudWxsO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0ge307XG4gICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG5cdFx0dGhpcy5idWlsZGVyQ29udGV4dCA9IG51bGw7XG5cdFx0dGhpcy5tb2RhbENsYXNzZXMgPSBbXTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuKHRyaWdnZXIpIHtcbiAgICAgICAgY29uc3QgaWQgPSBOdW1iZXIodHJpZ2dlci5kYXRhc2V0LnJtUXVpY2tWaWV3KTtcbiAgICAgICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IEpTT04ucGFyc2UodHJpZ2dlci5kYXRhc2V0LnNldHRpbmdzIHx8ICd7fScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVNb2RhbCgpO1xuXHRcdGNvbnN0IHJvb3QgPSB0cmlnZ2VyLmNsb3Nlc3QoJ1tkYXRhLXJtLXF1aWNrLXZpZXctcm9vdF0nKTtcblx0XHRjb25zdCBkaWFsb2cgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fZGlhbG9nJyk7XG5cdFx0Y29uc3QgbGFiZWwgPSByb290Py5kYXRhc2V0LnJtUXVpY2tWaWV3TGFiZWwgfHwgdHJpZ2dlci50ZXh0Q29udGVudC50cmltKClcblx0XHRcdHx8IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVJQ0tfVklFVycsIGxhYmVscy5xdWlja1ZpZXcpO1xuXHRcdHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuXHRcdGlmIChkaWFsb2cpIGRpYWxvZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XG5cdFx0aWYgKHJvb3Q/LmRhdGFzZXQuaWQpIHRoaXMubW9kYWwuZGF0YXNldC5pZCA9IHJvb3QuZGF0YXNldC5pZDtcblx0XHRlbHNlIGRlbGV0ZSB0aGlzLm1vZGFsLmRhdGFzZXQuaWQ7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIHRoaXMuc2V0TG9hZGluZygpO1xuXHRcdHRoaXMuYnVpbGRlckNvbnRleHQgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmcpIHRoaXMucGVuZGluZy5hYm9ydCgpO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBlbmRpbmc7XG5cbiAgICAgICAgdHJ5IHtcblx0XHRcdGlmICh0cmlnZ2VyLmRhdGFzZXQuY29udGVudE1vZGUgPT09ICdidWlsZGVyJyAmJiB0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZCkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBgJHt0cmlnZ2VyLmRhdGFzZXQuZW5kcG9pbnR9OmxheW91dDoke3RyaWdnZXIuZGF0YXNldC50ZW1wbGF0ZUlkfToke2lkfWA7XG5cdFx0XHRcdGNvbnN0IGxheW91dCA9IHRoaXMuY2FjaGUuaGFzKGtleSlcblx0XHRcdFx0XHQ/IGNsb25lKHRoaXMuY2FjaGUuZ2V0KGtleSkpXG5cdFx0XHRcdFx0OiBhd2FpdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0KFxuXHRcdFx0XHRcdFx0dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50LFxuXHRcdFx0XHRcdFx0aWQsXG5cdFx0XHRcdFx0XHR0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZCxcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXIuc2lnbmFsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jYWNoZS5zZXQoa2V5LCBjbG9uZShsYXlvdXQpKTtcblx0XHRcdFx0dGhpcy5wcm9kdWN0ID0gbnVsbDtcblx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJCdWlsZGVyQ29udGVudChsYXlvdXQuaHRtbCwge1xuXHRcdFx0XHRcdGVuZHBvaW50OiB0cmlnZ2VyLmRhdGFzZXQuZW5kcG9pbnQsXG5cdFx0XHRcdFx0dGVtcGxhdGVJZDogdHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQsXG5cdFx0XHRcdFx0cHJvZHVjdElkOiBpZFxuXHRcdFx0XHR9LCBsYXlvdXQuYXNzZXRzKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0cmlnZ2VyLmRhdGFzZXQuZW5kcG9pbnR9OiR7aWR9YDtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG4gICAgICAgICAgICAgICAgPyBjbG9uZSh0aGlzLmNhY2hlLmdldChrZXkpKVxuICAgICAgICAgICAgICAgIDogYXdhaXQgcmVxdWVzdFByb2R1Y3QodHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50LCAncXVpY2tWaWV3JywgaWQsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGtleSwgY2xvbmUocHJvZHVjdCkpO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gcHJvZHVjdDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHByb2R1Y3QsIHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InKSB0aGlzLnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGVuZGluZyA9PT0gY29udHJvbGxlcikgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuc3VyZU1vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RhbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1vZGFsID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3IHVrLW1vZGFsJywge1xuICAgICAgICAgICAgJ3VrLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19RVUlDS19WSUVXJywgbGFiZWxzLnF1aWNrVmlldylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJybXF1aWNrdmlld19fZGlhbG9nIHVrLW1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGFyaWEtbGFiZWw9XCIke3RyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVJQ0tfVklFVycsIGxhYmVscy5xdWlja1ZpZXcpfVwiPjxidXR0b24gY2xhc3M9XCJybXF1aWNrdmlld19fY2xvc2UgdWstbW9kYWwtY2xvc2UtZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiB1ay1jbG9zZSBhcmlhLWxhYmVsPVwiJHt0cmFuc2xhdGUoJ0pMSUJfSFRNTF9CRUhBVklPUl9DTE9TRScsICdDbG9zZScpfVwiPjwvYnV0dG9uPjxkaXYgY2xhc3M9XCJybXF1aWNrdmlld19fYm9keSB1ay1tb2RhbC1ib2R5XCI+PC9kaXY+PC9kaXY+YDtcblx0XHR0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3JhZGljYWxtYXJ0OnZhcmlhbnQtY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBwcm9kdWN0SWQgPSBOdW1iZXIoZXZlbnQuZGV0YWlsPy5wcm9kdWN0Py5pZCk7XG5cdFx0XHRpZiAodGhpcy5idWlsZGVyQ29udGV4dCAmJiBwcm9kdWN0SWQpIHRoaXMubG9hZEJ1aWxkZXJQcm9kdWN0KHByb2R1Y3RJZCk7XG5cdFx0fSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMubW9kYWxDbGFzc2VzKTtcblx0XHR0aGlzLm1vZGFsQ2xhc3NlcyA9IFN0cmluZyh0aGlzLnNldHRpbmdzLm1vZGFsQ2xhc3MgfHwgJycpLnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pO1xuXHRcdHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLm1vZGFsQ2xhc3Nlcyk7XG4gICAgICAgIGNvbnN0IG1vZGFsU2l6ZSA9IFsnJywgJ3NtYWxsJywgJ2xhcmdlJywgJ3hsYXJnZScsICdjb250YWluZXInLCAnZnVsbCddLmluY2x1ZGVzKHRoaXMuc2V0dGluZ3MubW9kYWxTaXplKVxuICAgICAgICAgICAgPyB0aGlzLnNldHRpbmdzLm1vZGFsU2l6ZSA6ICdjb250YWluZXInO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLnNldHRpbmdzLm1vZGFsQ2VudGVyICE9PSBmYWxzZSAmJiBtb2RhbFNpemUgIT09ICdmdWxsJztcbiAgICAgICAgY29uc3QgYmdDbG9zZSA9IHRoaXMuc2V0dGluZ3MuYmdDbG9zZSAhPT0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGVzY0Nsb3NlID0gdGhpcy5zZXR0aW5ncy5lc2NDbG9zZSAhPT0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2Nsb3NlJyk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRQYWRkaW5nID0gWydub25lJywgJ3NtYWxsJywgJ2RlZmF1bHQnLCAnbGFyZ2UnXS5pbmNsdWRlcyh0aGlzLnNldHRpbmdzLmNvbnRlbnRQYWRkaW5nKVxuICAgICAgICAgICAgPyB0aGlzLnNldHRpbmdzLmNvbnRlbnRQYWRkaW5nIDogJ2RlZmF1bHQnO1xuXG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgndWstbW9kYWwtY29udGFpbmVyJywgbW9kYWxTaXplID09PSAnY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgndWstbW9kYWwtZnVsbCcsIG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCd1ay1mbGV4LXRvcCcsIGNlbnRlcik7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXctLXNtYWxsJywgbW9kYWxTaXplID09PSAnc21hbGwnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlldy0tbGFyZ2UnLCBtb2RhbFNpemUgPT09ICdsYXJnZScpO1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3LS14bGFyZ2UnLCBtb2RhbFNpemUgPT09ICd4bGFyZ2UnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlldy0tbW9iaWxlLWZ1bGwnLCB0aGlzLnNldHRpbmdzLm1vYmlsZUZ1bGxzY3JlZW4gIT09IGZhbHNlIHx8IG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnKTtcbiAgICAgICAgdGhpcy5tb2RhbC5zZXRBdHRyaWJ1dGUoJ3VrLW1vZGFsJywgYGJnLWNsb3NlOiAke2JnQ2xvc2V9OyBlc2MtY2xvc2U6ICR7ZXNjQ2xvc2V9YCk7XG5cbiAgICAgICAgZGlhbG9nPy5jbGFzc0xpc3QudG9nZ2xlKCd1ay1tYXJnaW4tYXV0by12ZXJ0aWNhbCcsIGNlbnRlcik7XG4gICAgICAgIGJvZHk/LmNsYXNzTGlzdC50b2dnbGUoJ3VrLW92ZXJmbG93LWF1dG8nLCB0aGlzLnNldHRpbmdzLm92ZXJmbG93QXV0byA9PT0gdHJ1ZSk7XG4gICAgICAgIFsnbm9uZScsICdzbWFsbCcsICdkZWZhdWx0JywgJ2xhcmdlJ10uZm9yRWFjaCgocGFkZGluZykgPT4ge1xuICAgICAgICAgICAgYm9keT8uY2xhc3NMaXN0LnRvZ2dsZShgcm1xdWlja3ZpZXdfX2JvZHktLXBhZGRpbmctJHtwYWRkaW5nfWAsIHBhZGRpbmcgPT09IGNvbnRlbnRQYWRkaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjbG9zZSkge1xuICAgICAgICAgICAgY2xvc2UuaGlkZGVuID0gdGhpcy5zZXR0aW5ncy5zaG93Q2xvc2UgPT09IGZhbHNlO1xuICAgICAgICAgICAgY2xvc2UuY2xhc3NMaXN0LnRvZ2dsZSgndWstY2xvc2UtbGFyZ2UnLCB0aGlzLnNldHRpbmdzLmNsb3NlTGFyZ2UgPT09IHRydWUgfHwgbW9kYWxTaXplID09PSAnZnVsbCcpO1xuICAgICAgICAgICAgY2xvc2UuY2xhc3NMaXN0LnRvZ2dsZSgndWstbW9kYWwtY2xvc2UtZGVmYXVsdCcsIG1vZGFsU2l6ZSAhPT0gJ2Z1bGwnKTtcbiAgICAgICAgICAgIGNsb3NlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLW1vZGFsLWNsb3NlLWZ1bGwnLCBtb2RhbFNpemUgPT09ICdmdWxsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2luZG93LlVJa2l0Py5tb2RhbCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gd2luZG93LlVJa2l0Lm1vZGFsKHRoaXMubW9kYWwpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudD8uJHByb3BzKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LiRwcm9wcy5iZ0Nsb3NlID0gYmdDbG9zZTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuJHByb3BzLmVzY0Nsb3NlID0gZXNjQ2xvc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QuYWRkKCd1ay1vcGVuJyk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZygpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG4gICAgICAgIGJvZHkucmVwbGFjZUNoaWxkcmVuKGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fbG9hZGVyJywgeyd1ay1zcGlubmVyJzogJ3JhdGlvOiAxLjUnfSkpO1xuICAgIH1cblxuICAgIHJlbmRlckVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgYWxlcnQgPSBlbGVtZW50KCdkaXYnLCAndWstYWxlcnQtZGFuZ2VyJywgeyd1ay1hbGVydCc6IHRydWV9KTtcbiAgICAgICAgYWxlcnQuYXBwZW5kKHRleHQobWVzc2FnZSB8fCB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX0VSUk9SX0xPQURfUFJPRFVDVCcsIGxhYmVscy5lcnJvcikpKTtcbiAgICAgICAgdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2JvZHknKS5yZXBsYWNlQ2hpbGRyZW4oYWxlcnQpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlckJ1aWxkZXJDb250ZW50KGh0bWwsIGNvbnRleHQgPSB0aGlzLmJ1aWxkZXJDb250ZXh0LCBhc3NldHMgPSB7fSkge1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2JvZHknKTtcblx0XHRpZiAoYXNzZXRzLm9wdGlvbnMgJiYgd2luZG93Lkpvb21sYT8ubG9hZE9wdGlvbnMpIHtcblx0XHRcdHdpbmRvdy5Kb29tbGEubG9hZE9wdGlvbnMoYXNzZXRzLm9wdGlvbnMpO1xuXHRcdH1cblx0XHRhd2FpdCBsb2FkQXNzZXRzKGFzc2V0cywgJ3N0eWxlJyk7XG5cdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKTtcblx0XHRib2R5LnJlcGxhY2VDaGlsZHJlbihmcmFnbWVudCk7XG5cdFx0dGhpcy5idWlsZGVyQ29udGV4dCA9IGNvbnRleHQ7XG5cdFx0YXdhaXQgbG9hZEFzc2V0cyhhc3NldHMsICdzY3JpcHQnKTtcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5SYWRpY2FsTWFydENhcnQgPT09ICdmdW5jdGlvbicpIGVuc3VyZVJhZGljYWxNYXJ0RGlzcGxheSgpO1xuICAgICAgICBpZiAod2luZG93LlVJa2l0Py51cGRhdGUpIHdpbmRvdy5VSWtpdC51cGRhdGUoYm9keSk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LlJhZGljYWxNYXJ0Q2FydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgY2FydCA9IHdpbmRvdy5SYWRpY2FsTWFydENhcnQoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FydD8ubG9hZEFjdGlvbnMgPT09ICdmdW5jdGlvbicpIGNhcnQubG9hZEFjdGlvbnMoYm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgneXRkeW5hbWljczpxdWlja3ZpZXctb3BlbicsIHtidWJibGVzOiB0cnVlfSkpO1xuICAgIH1cblxuXHRhc3luYyBsb2FkQnVpbGRlclByb2R1Y3QocHJvZHVjdElkKSB7XG5cdFx0Y29uc3QgY29udGV4dCA9IHRoaXMuYnVpbGRlckNvbnRleHQ7XG5cdFx0aWYgKCFjb250ZXh0IHx8IE51bWJlcihjb250ZXh0LnByb2R1Y3RJZCkgPT09IE51bWJlcihwcm9kdWN0SWQpKSByZXR1cm47XG5cblx0XHR0aGlzLnNldExvYWRpbmcoKTtcblx0XHRpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcblx0XHR0aGlzLnBlbmRpbmcgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdFx0Y29uc3QgY29udHJvbGxlciA9IHRoaXMucGVuZGluZztcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBrZXkgPSBgJHtjb250ZXh0LmVuZHBvaW50fTpsYXlvdXQ6JHtjb250ZXh0LnRlbXBsYXRlSWR9OiR7cHJvZHVjdElkfWA7XG5cdFx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG5cdFx0XHRcdD8gY2xvbmUodGhpcy5jYWNoZS5nZXQoa2V5KSlcblx0XHRcdFx0OiBhd2FpdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0KGNvbnRleHQuZW5kcG9pbnQsIHByb2R1Y3RJZCwgY29udGV4dC50ZW1wbGF0ZUlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG5cdFx0XHR0aGlzLmNhY2hlLnNldChrZXksIGNsb25lKGxheW91dCkpO1xuXHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJCdWlsZGVyQ29udGVudChsYXlvdXQuaHRtbCwgey4uLmNvbnRleHQsIHByb2R1Y3RJZH0sIGxheW91dC5hc3NldHMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InKSB0aGlzLnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRpZiAodGhpcy5wZW5kaW5nID09PSBjb250cm9sbGVyKSB0aGlzLnBlbmRpbmcgPSBudWxsO1xuXHRcdH1cblx0fVxuXG4gICAgcmVuZGVyKHByb2R1Y3QsIGVuZHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2xheW91dCB1ay1ncmlkLWxhcmdlIHVrLWZsZXgtbWlkZGxlJywgeyd1ay1ncmlkJzogdHJ1ZSwgJ2RhdGEtcm0tcHJvZHVjdC1zY29wZSc6IHRydWV9KTtcbiAgICAgICAgY29uc3QgbWVkaWFDb2x1bW4gPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX21lZGlhLWNvbHVtbiB1ay13aWR0aC0xLTJAbScpO1xuICAgICAgICBjb25zdCBjb250ZW50Q29sdW1uID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19jb250ZW50IHVrLXdpZHRoLWV4cGFuZEBtJyk7XG5cbiAgICAgICAgbWVkaWFDb2x1bW4uYXBwZW5kKHRoaXMucmVuZGVyTWVkaWEocHJvZHVjdC5tZWRpYSB8fCBbXSkpO1xuICAgICAgICBjb250ZW50Q29sdW1uLmFwcGVuZCh0aGlzLnJlbmRlckNvbnRlbnQocHJvZHVjdCwgZW5kcG9pbnQpKTtcbiAgICAgICAgbGF5b3V0LmFwcGVuZChtZWRpYUNvbHVtbiwgY29udGVudENvbHVtbik7XG4gICAgICAgIGJvZHkucmVwbGFjZUNoaWxkcmVuKGxheW91dCk7XG4gICAgICAgIGlmICh3aW5kb3cuVUlraXQ/LnVwZGF0ZSkgd2luZG93LlVJa2l0LnVwZGF0ZShib2R5KTtcbiAgICB9XG5cbiAgICByZW5kZXJNZWRpYShtZWRpYSkge1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19tZWRpYScpO1xuICAgICAgICBjb25zdCBtYWluID0gZWxlbWVudCgnYnV0dG9uJywgJ3JtcXVpY2t2aWV3X19tYWluLWltYWdlJywge3R5cGU6ICdidXR0b24nfSk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZWxlbWVudCgnaW1nJywgJycsIHtsb2FkaW5nOiAnZWFnZXInfSk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZWxlbWVudCgnc3BhbicsICdybXF1aWNrdmlld19fcGxhY2Vob2xkZXIgdWstdGV4dC1tdXRlZCcpO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlckljb24gPSBlbGVtZW50KCdzcGFuJywgJycsIHsndWstaWNvbic6ICdpY29uOiBpbWFnZTsgcmF0aW86IDIuNSd9KTtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUZXh0ID0gZWxlbWVudCgnc3BhbicsICd1ay1kaXNwbGF5LWJsb2NrIHVrLXRleHQtc21hbGwgdWstbWFyZ2luLXNtYWxsLXRvcCcpO1xuICAgICAgICBwbGFjZWhvbGRlclRleHQuYXBwZW5kKHRleHQodHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19OT19JTUFHRScsIGxhYmVscy5ub0ltYWdlKSkpO1xuICAgICAgICBwbGFjZWhvbGRlci5hcHBlbmQocGxhY2Vob2xkZXJJY29uLCBwbGFjZWhvbGRlclRleHQpO1xuICAgICAgICBjb25zdCBpdGVtcyA9IG1lZGlhLmxlbmd0aCA/IG1lZGlhIDogW3tzcmM6ICcnLCBhbHQ6IHRoaXMucHJvZHVjdD8udGl0bGUgfHwgJyd9XTtcblxuICAgICAgICBjb25zdCBzZWxlY3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoaXRlbS5zcmMpIGltYWdlLnNyYyA9IGl0ZW0uc3JjO1xuICAgICAgICAgICAgZWxzZSBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gaXRlbS5hbHQgfHwgdGhpcy5wcm9kdWN0Py50aXRsZSB8fCAnJztcbiAgICAgICAgICAgIG1haW4uZGlzYWJsZWQgPSAhaXRlbS5zcmM7XG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC50b2dnbGUoJ3JtcXVpY2t2aWV3X19tYWluLWltYWdlLS1lbXB0eScsICFpdGVtLnNyYyk7XG4gICAgICAgICAgICBpbWFnZS5oaWRkZW4gPSAhaXRlbS5zcmM7XG4gICAgICAgICAgICBwbGFjZWhvbGRlci5oaWRkZW4gPSBCb29sZWFuKGl0ZW0uc3JjKTtcbiAgICAgICAgICAgIHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLnJtcXVpY2t2aWV3X190aHVtYicpLmZvckVhY2goKHRodW1iLCB0aHVtYkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGh1bWIuY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXdfX3RodW1iLS1hY3RpdmUnLCB0aHVtYkluZGV4ID09PSBpbmRleCk7XG4gICAgICAgICAgICAgICAgdGh1bWIuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCB0aHVtYkluZGV4ID09PSBpbmRleCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG1haW4uYXBwZW5kKGltYWdlLCBwbGFjZWhvbGRlcik7XG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW1hZ2Uuc3JjICYmIHdpbmRvdy5VSWtpdD8ubGlnaHRib3hQYW5lbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5VSWtpdC5saWdodGJveFBhbmVsKHtpdGVtczogaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnNyYykubWFwKChpdGVtKSA9PiAoe3NvdXJjZTogaXRlbS5zcmMsIGNhcHRpb246IGl0ZW0uYWx0fSkpfSkuc2hvdygwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kKG1haW4pO1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCB0aHVtYnMgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX3RodW1icyB1ay1mbGV4IHVrLWZsZXgtY2VudGVyIHVrLWZsZXgtd3JhcCcpO1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtZW50KCdidXR0b24nLCAncm1xdWlja3ZpZXdfX3RodW1iJywge3R5cGU6ICdidXR0b24nLCAnYXJpYS1sYWJlbCc6IGl0ZW0uYWx0IHx8IGAke2luZGV4ICsgMX1gfSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZChlbGVtZW50KCdpbWcnLCAnJywge3NyYzogaXRlbS5zcmMsIGFsdDogJycsIGxvYWRpbmc6ICdsYXp5J30pKTtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZWxlY3QoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICB0aHVtYnMuYXBwZW5kKGJ1dHRvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKHRodW1icyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0KDApO1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHByb2R1Y3QsIGVuZHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQoJ2gyJywgJ3JtcXVpY2t2aWV3X190aXRsZSB1ay1oMiB1ay1tYXJnaW4tcmVtb3ZlLXRvcCcpO1xuICAgICAgICBjb25zdCBsaW5rID0gZWxlbWVudCgnYScsICd1ay1saW5rLWhlYWRpbmcnLCB7aHJlZjogcHJvZHVjdC5saW5rfSk7XG4gICAgICAgIGxpbmsuYXBwZW5kKHRleHQocHJvZHVjdC50aXRsZSkpO1xuICAgICAgICB0aXRsZS5hcHBlbmQobGluayk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZCh0aXRsZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0NvZGUgJiYgcHJvZHVjdC5jb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19jb2RlIHVrLXRleHQtbWV0YSB1ay1tYXJnaW4tc21hbGwtYm90dG9tJyk7XG4gICAgICAgICAgICBjb2RlLmFwcGVuZCh0ZXh0KHByb2R1Y3QuY29kZSkpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJpY2UgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX3ByaWNlIHVrLXRleHQtbGFyZ2UgdWstdGV4dC1ib2xkJyk7XG4gICAgICAgIGlmIChwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQgJiYgcHJvZHVjdC5wcmljZS5iYXNlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRQcmljZSA9IGVsZW1lbnQoJ3MnLCAndWstdGV4dC1tdXRlZCB1ay1tYXJnaW4tc21hbGwtcmlnaHQnKTtcbiAgICAgICAgICAgIG9sZFByaWNlLmFwcGVuZCh0ZXh0KHByb2R1Y3QucHJpY2UuYmFzZSkpO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kKG9sZFByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaW5hbFByaWNlID0gZWxlbWVudCgnc3BhbicsICcnLCB7J2RhdGEtcm0tcHJpY2UnOiB0cnVlfSk7XG4gICAgICAgIGZpbmFsUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZT8uZmluYWwpKTtcbiAgICAgICAgcHJpY2UuYXBwZW5kKGZpbmFsUHJpY2UpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQocHJpY2UpO1xuXG4gICAgICAgIGNvbnN0IHN0b2NrID0gZWxlbWVudCgnZGl2JywgYHJtcXVpY2t2aWV3X19zdG9jayB1ay1tYXJnaW4tc21hbGwtdG9wICR7cHJvZHVjdC5pblN0b2NrID8gJ3VrLXRleHQtc3VjY2VzcycgOiAndWstdGV4dC1tdXRlZCd9YCwgeydkYXRhLXJtLXN0b2NrJzogdHJ1ZX0pO1xuICAgICAgICBzdG9jay5hcHBlbmQodGV4dChwcm9kdWN0LmluU3RvY2tcbiAgICAgICAgICAgID8gdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfSU5fU1RPQ0snLCBsYWJlbHMuaW5TdG9jaylcbiAgICAgICAgICAgIDogdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfTk9UX0lOX1NUT0NLJywgbGFiZWxzLm91dE9mU3RvY2spKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChzdG9jayk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0Rlc2NyaXB0aW9uICYmIHByb2R1Y3QuaW50cm90ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGVsZW1lbnQoJ3AnLCAncm1xdWlja3ZpZXdfX2Rlc2NyaXB0aW9uIHVrLW1hcmdpbicpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uYXBwZW5kKHRleHQocHJvZHVjdC5pbnRyb3RleHQpKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZChkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93VmFyaWFudHMgJiYgcHJvZHVjdC52YXJpYW50cz8uZmllbGRzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhcmlhbnRzID0gdGhpcy5yZW5kZXJWYXJpYW50cyhwcm9kdWN0LnZhcmlhbnRzLCBlbmRwb2ludCk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQodmFyaWFudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd0NhcnQpIGZyYWdtZW50LmFwcGVuZCh0aGlzLnJlbmRlckNhcnQocHJvZHVjdCkpO1xuXG4gICAgICAgIGNvbnN0IG1vcmUgPSBlbGVtZW50KCdhJywgJ3JtcXVpY2t2aWV3X19tb3JlIHVrLWJ1dHRvbiB1ay1idXR0b24tdGV4dCB1ay1tYXJnaW4tdG9wJywge2hyZWY6IHByb2R1Y3QubGlua30pO1xuICAgICAgICBtb3JlLmFwcGVuZCh0ZXh0KHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfREVUQUlMUycsIGxhYmVscy5kZXRhaWxzKSkpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmQobW9yZSk7XG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9XG5cbiAgICByZW5kZXJWYXJpYW50cyhkYXRhLCBlbmRwb2ludCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBlbGVtZW50KCdkaXYnLCAncm12YXJpYW50cyBybXF1aWNrdmlld19fdmFyaWFudHMgdWstZm9ybS1zdGFja2VkJywge1xuICAgICAgICAgICAgJ2RhdGEtcm0tdmFyaWFudHMnOiB0cnVlLFxuICAgICAgICAgICAgJ2RhdGEtZW5kcG9pbnQnOiBlbmRwb2ludCxcbiAgICAgICAgICAgICdkYXRhLWFjdGlvbic6ICdhamF4JyxcbiAgICAgICAgICAgICdkYXRhLWRpc2FibGUtdW5hdmFpbGFibGUnOiAndHJ1ZScsXG4gICAgICAgICAgICAnZGF0YS11cGRhdGUtdXJsJzogJ2ZhbHNlJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjdXJyZW50ID0gZGF0YS5wcm9kdWN0cy5maW5kKChpdGVtKSA9PiBOdW1iZXIoaXRlbS5pZCkgPT09IE51bWJlcihkYXRhLmN1cnJlbnRQcm9kdWN0KSk7XG4gICAgICAgIGRhdGEuZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZHNldCA9IGVsZW1lbnQoJ2ZpZWxkc2V0JywgJ3JtdmFyaWFudHNfX2ZpZWxkIHVrLWZpZWxkc2V0JywgeydkYXRhLXJtLWZpZWxkJzogZmllbGQuYWxpYXN9KTtcbiAgICAgICAgICAgIGNvbnN0IGxlZ2VuZCA9IGVsZW1lbnQoJ2xlZ2VuZCcsICdybXZhcmlhbnRzX19sYWJlbCB1ay1mb3JtLWxhYmVsJyk7XG4gICAgICAgICAgICBsZWdlbmQuYXBwZW5kKHRleHQoZmllbGQudGl0bGUpKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBlbGVtZW50KCdkaXYnLCAncm12YXJpYW50c19fb3B0aW9ucyB1ay1mbGV4IHVrLWZsZXgtd3JhcCB1ay1mbGV4LW1pZGRsZScsIHtyb2xlOiAnZ3JvdXAnLCAnYXJpYS1sYWJlbCc6IGZpZWxkLnRpdGxlfSk7XG5cbiAgICAgICAgICAgIGZpZWxkLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gU3RyaW5nKGN1cnJlbnQ/LmZpZWxkc1tmaWVsZC5hbGlhc10pID09PSBTdHJpbmcob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzd2F0Y2ggPSBvcHRpb24uaW1hZ2UgfHwgb3B0aW9uLmNvbG9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW1lbnQoJ2J1dHRvbicsIGBybXZhcmlhbnRzX19vcHRpb24gdWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0JHtzd2F0Y2ggPyAnIHJtdmFyaWFudHNfX29wdGlvbi0tc3dhdGNoJyA6ICcnfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsICdkYXRhLXJtLXZhbHVlJzogb3B0aW9uLnZhbHVlLCAnYXJpYS1wcmVzc2VkJzogYWN0aXZlID8gJ3RydWUnIDogJ2ZhbHNlJywgdGl0bGU6IG9wdGlvbi5sYWJlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaW1hZ2UpIGJ1dHRvbi5hcHBlbmQoZWxlbWVudCgnaW1nJywgJycsIHtzcmM6IG9wdGlvbi5pbWFnZSwgYWx0OiAnJywgbG9hZGluZzogJ2xhenknfSkpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbi5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IGVsZW1lbnQoJ3NwYW4nLCAncm12YXJpYW50c19fY29sb3InKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3Iuc3R5bGUuc2V0UHJvcGVydHkoJy0tcm0tc3dhdGNoJywgb3B0aW9uLmNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZChjb2xvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGJ1dHRvbi5hcHBlbmQodGV4dChvcHRpb24ubGFiZWwpKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmFwcGVuZChidXR0b24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWVsZHNldC5hcHBlbmQobGVnZW5kLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZmllbGRzZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChlbGVtZW50KCdkaXYnLCAncm12YXJpYW50c19fc3RhdHVzIHVrLXRleHQtc21hbGwnLCB7J2FyaWEtbGl2ZSc6ICdwb2xpdGUnfSkpO1xuXG4gICAgICAgIG5ldyBWYXJpYW50UGlja2VyKGNvbnRhaW5lciwgZGF0YSwgKHNlbGVjdGVkKSA9PiB0aGlzLnVwZGF0ZVByb2R1Y3Qoc2VsZWN0ZWQpKS5pbml0KCk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgcmVuZGVyQ2FydChwcm9kdWN0KSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fY2FydCB1ay1mbGV4IHVrLWZsZXgtbWlkZGxlIHVrLWZsZXgtd3JhcCB1ay1tYXJnaW4tdG9wJyk7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gZWxlbWVudCgnaW5wdXQnLCAndWstaW5wdXQgdWstZm9ybS13aWR0aC14c21hbGwnLCB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJywgdmFsdWU6IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxLCBtaW46IHByb2R1Y3QucXVhbnRpdHk/Lm1pbiB8fCAxLCBzdGVwOiBwcm9kdWN0LnF1YW50aXR5Py5zdGVwIHx8IDEsXG4gICAgICAgICAgICBtYXg6IHByb2R1Y3QucXVhbnRpdHk/Lm1heCwgJ2FyaWEtbGFiZWwnOiB0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX1FVQU5USVRZJywgbGFiZWxzLnF1YW50aXR5KVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbWVudCgnYnV0dG9uJywgJ3VrLWJ1dHRvbiB1ay1idXR0b24tcHJpbWFyeScsIHt0eXBlOiAnYnV0dG9uJ30pO1xuICAgICAgICBidXR0b24uYXBwZW5kKHRleHQodHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfQ0FSVF9BREQnLCBsYWJlbHMuYWRkVG9DYXJ0KSkpO1xuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhcHJvZHVjdC5pblN0b2NrO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LlJhZGljYWxNYXJ0Q2FydCAmJiB0aGlzLnByb2R1Y3Q/LmlkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlJhZGljYWxNYXJ0Q2FydCgpLmFkZFByb2R1Y3QoTnVtYmVyKHRoaXMucHJvZHVjdC5pZCksIE51bWJlcihxdWFudGl0eS52YWx1ZSkgfHwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByb3cuYXBwZW5kKHF1YW50aXR5LCBidXR0b24pO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAgIHVwZGF0ZVByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgICB0aGlzLnByb2R1Y3QgPSB7Li4udGhpcy5wcm9kdWN0LCAuLi5wcm9kdWN0fTtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX3RpdGxlIGEnKTtcbiAgICAgICAgY29uc3QgcHJpY2UgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fcHJpY2UnKTtcbiAgICAgICAgY29uc3Qgc3RvY2sgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXN0b2NrXScpO1xuICAgICAgICBjb25zdCBjb2RlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2NvZGUnKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fZGVzY3JpcHRpb24nKTtcbiAgICAgICAgY29uc3QgY2FydCA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19jYXJ0IC51ay1idXR0b24tcHJpbWFyeScpO1xuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvZHVjdC50aXRsZTtcbiAgICAgICAgICAgIHRpdGxlLmhyZWYgPSBwcm9kdWN0Lmxpbms7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgICBwcmljZS5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0LnByaWNlPy5kaXNjb3VudEVuYWJsZWQgJiYgcHJvZHVjdC5wcmljZS5iYXNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkUHJpY2UgPSBlbGVtZW50KCdzJywgJ3VrLXRleHQtbXV0ZWQgdWstbWFyZ2luLXNtYWxsLXJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgb2xkUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZS5iYXNlKSk7XG4gICAgICAgICAgICAgICAgcHJpY2UuYXBwZW5kKG9sZFByaWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbmFsUHJpY2UgPSBlbGVtZW50KCdzcGFuJywgJycsIHsnZGF0YS1ybS1wcmljZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGZpbmFsUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZT8uZmluYWwpKTtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZChmaW5hbFByaWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZSkgY29kZS50ZXh0Q29udGVudCA9IHByb2R1Y3QuY29kZSB8fCAnJztcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2R1Y3QuaW50cm90ZXh0IHx8ICcnO1xuICAgICAgICBpZiAoc3RvY2spIHtcbiAgICAgICAgICAgIHN0b2NrLnRleHRDb250ZW50ID0gcHJvZHVjdC5pblN0b2NrXG4gICAgICAgICAgICAgICAgPyB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9JTl9TVE9DSycsIGxhYmVscy5pblN0b2NrKVxuICAgICAgICAgICAgICAgIDogdHJhbnNsYXRlKCdDT01fUkFESUNBTE1BUlRfTk9UX0lOX1NUT0NLJywgbGFiZWxzLm91dE9mU3RvY2spO1xuICAgICAgICAgICAgc3RvY2suY2xhc3NMaXN0LnRvZ2dsZSgndWstdGV4dC1zdWNjZXNzJywgcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgICAgIHN0b2NrLmNsYXNzTGlzdC50b2dnbGUoJ3VrLXRleHQtbXV0ZWQnLCAhcHJvZHVjdC5pblN0b2NrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FydCkgY2FydC5kaXNhYmxlZCA9ICFwcm9kdWN0LmluU3RvY2s7XG5cbiAgICAgICAgY29uc3QgbWVkaWEgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fbWVkaWEnKTtcbiAgICAgICAgaWYgKG1lZGlhKSBtZWRpYS5yZXBsYWNlV2l0aCh0aGlzLnJlbmRlck1lZGlhKHByb2R1Y3QubWVkaWEgfHwgW10pKTtcbiAgICAgICAgY29uc3QgbW9yZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19tb3JlJyk7XG4gICAgICAgIGlmIChtb3JlKSBtb3JlLmhyZWYgPSBwcm9kdWN0Lmxpbms7XG4gICAgfVxufVxuXG5jb25zdCBxdWlja1ZpZXcgPSBuZXcgUXVpY2tWaWV3KCk7XG5jb25zdCBjYXJ0RmVlZGJhY2tUaW1lcnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBwcmVwYXJlQ2FydEJ1dHRvbiA9IChidXR0b24pID0+IHtcbiAgICBpZiAoIWJ1dHRvbi5kYXRhc2V0LnJtQ2FydE9yaWdpbmFsKSBidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbCA9IGJ1dHRvbi5pbm5lckhUTUw7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChjYXJ0RmVlZGJhY2tUaW1lcnMuZ2V0KGJ1dHRvbikpO1xufTtcblxuY29uc3Qgc2hvd0NhcnRQZW5kaW5nID0gKGNhcnQsIGJ1dHRvbikgPT4ge1xuICAgIHByZXBhcmVDYXJ0QnV0dG9uKGJ1dHRvbik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2FydC5kYXRhc2V0LnJtQ2FydExvYWRpbmcgfHwgbGFiZWxzLmxvYWRpbmc7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1idXN5JywgJ3RydWUnKTtcbn07XG5cbmNvbnN0IHNob3dDYXJ0RmVlZGJhY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQuZGV0YWlsPy5lcnJvcikgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8uZW50cnk/LnByb2R1Y3RfaWQgfHwgMCk7XG4gICAgaWYgKCFwcm9kdWN0SWQpIHJldHVybjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIGBbcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl1bZGF0YS1pZD1cIiR7cHJvZHVjdElkfVwiXSwgYFxuICAgICAgICArIGBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXVtkYXRhLWlkPVwiJHtwcm9kdWN0SWR9XCJdYFxuICAgICkuZm9yRWFjaCgoY2FydCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBjYXJ0LnF1ZXJ5U2VsZWN0b3IoJ1tyYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdJyk7XG4gICAgICAgIGlmICghYnV0dG9uKSByZXR1cm47XG5cbiAgICAgICAgcHJlcGFyZUNhcnRCdXR0b24oYnV0dG9uKTtcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gY2FydC5kYXRhc2V0LnJtQ2FydFN1Y2Nlc3MgfHwgJ1Byb2R1Y3QgYWRkZWQgdG8gY2FydCc7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdybS1idXlfX2J1dHRvbi0tc3VjY2VzcycpO1xuICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWJ1c3knKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuXG4gICAgICAgIGNvbnN0IHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGJ1dHRvbi5kYXRhc2V0LnJtQ2FydE9yaWdpbmFsO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JtLWJ1eV9fYnV0dG9uLS1zdWNjZXNzJyk7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWxpdmUnKTtcbiAgICAgICAgICAgIGNhcnRGZWVkYmFja1RpbWVycy5kZWxldGUoYnV0dG9uKTtcbiAgICAgICAgfSwgMjIwMCk7XG4gICAgICAgIGNhcnRGZWVkYmFja1RpbWVycy5zZXQoYnV0dG9uLCB0aW1lcik7XG4gICAgfSk7XG59O1xuXG5jb25zdCByZXNldFBlbmRpbmdDYXJ0QnV0dG9ucyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXVthcmlhLWJ1c3k9XCJ0cnVlXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdW2FyaWEtYnVzeT1cInRydWVcIl0nKVxuICAgICAgICAuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQucm1DYXJ0T3JpZ2luYWwpIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b24uZGF0YXNldC5ybUNhcnRPcmlnaW5hbDtcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpO1xuICAgICAgICB9KTtcbn07XG5cbmNvbnN0IGluaXQgPSAocm9vdCA9IGRvY3VtZW50KSA9PiB7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpKSBuZXcgUHJvZHVjdFNjb3BlKHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKS5mb3JFYWNoKChzY29wZSkgPT4gbmV3IFByb2R1Y3RTY29wZShzY29wZSkuaW5pdCgpKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXByb2R1Y3QtY2FyZC1kcm9wZG93bl0nKSkgbmV3IFByb2R1Y3RDYXJkRHJvcGRvd24ocm9vdCkuaW5pdCgpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1wcm9kdWN0LWNhcmQtZHJvcGRvd25dJykuZm9yRWFjaCgoZHJvcGRvd24pID0+IG5ldyBQcm9kdWN0Q2FyZERyb3Bkb3duKGRyb3Bkb3duKS5pbml0KCkpO1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tdmFyaWFudHNdJykpIG5ldyBWYXJpYW50UGlja2VyKHJvb3QpLmluaXQoKTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tdmFyaWFudHNdJykuZm9yRWFjaCgoY29udGFpbmVyKSA9PiBuZXcgVmFyaWFudFBpY2tlcihjb250YWluZXIpLmluaXQoKSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tcXVpY2stdmlld10nKTtcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcXVpY2tWaWV3Lm9wZW4odHJpZ2dlcik7XG4gICAgfVxufSwgdHJ1ZSk7XG5cbi8vIFJhZGljYWxNYXJ0IGJpbmRzIHRoZSBwcm9kdWN0IGlkIGludG8gaXRzIG9yaWdpbmFsIGNsaWNrIGNsb3N1cmUuIEludGVyY2VwdFxuLy8gb25seSBjYXJ0cyBleHBsaWNpdGx5IHVwZGF0ZWQgYnkgUk0gVmFyaWFudHMsIHNvIHRoZSBjdXJyZW50IGlkIGlzIHJlc3BlY3RlZC5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYWRkID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tyYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwiYWRkXCJdJyk7XG4gICAgY29uc3QgY2FydCA9IGFkZD8uY2xvc2VzdCgnW3JhZGljYWxtYXJ0LWNhcnQ9XCJwcm9kdWN0XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXScpO1xuICAgIGlmICghYWRkIHx8ICFjYXJ0Py5kYXRhc2V0LnJtRHluYW1pY1Byb2R1Y3QgfHwgIXdpbmRvdy5SYWRpY2FsTWFydENhcnQpIHJldHVybjtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIHNob3dDYXJ0UGVuZGluZyhjYXJ0LCBhZGQpO1xuICAgIGNvbnN0IHF1YW50aXR5ID0gY2FydC5xdWVyeVNlbGVjdG9yKCdbcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdLCBbZGF0YS1yYWRpY2FsbWFydC1jYXJ0PVwicXVhbnRpdHlcIl0nKTtcbiAgICB3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KCkuYWRkUHJvZHVjdChOdW1iZXIoY2FydC5kYXRhc2V0LmlkKSwgTnVtYmVyKHF1YW50aXR5Py52YWx1ZSkgfHwgMSk7XG59LCB0cnVlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignb25SYWRpY2FsTWFydENhcnRBZnRlckFkZFByb2R1Y3QnLCBzaG93Q2FydEZlZWRiYWNrKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29uUmFkaWNhbE1hcnRDYXJ0RXJyb3InLCByZXNldFBlbmRpbmdDYXJ0QnV0dG9ucyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBpbml0KCkpO1xubmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4gbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIGluaXQobm9kZSk7XG59KSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4iXSwibmFtZXMiOlsidGV4dCIsInZhbHVlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImNsb25lIiwidW5kZWZpbmVkIiwic3RydWN0dXJlZENsb25lIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibG9hZGVkQXNzZXRzIiwiTWFwIiwiYXNzZXRLZXkiLCJhc3NldCIsInR5cGUiLCJuYW1lIiwidXJpIiwiY29udGVudCIsImxvYWRBc3NldCIsImtleSIsImhhcyIsImdldCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGFyZ2V0VXJsIiwiVVJMIiwiYmFzZVVSSSIsImhyZWYiLCJleGlzdGluZyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaW5kIiwibm9kZSIsInNyYyIsInJlYWR5Iiwic2V0IiwicmVqZWN0IiwiY3JlYXRlRWxlbWVudCIsImF0dHJpYnV0ZXMiLCJyZWwiLCJ0ZXh0Q29udGVudCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiX3JlZiIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsIm5vbmNlIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiRXJyb3IiLCJoZWFkIiwiYXBwZW5kIiwiY2F0Y2giLCJlcnJvciIsImRlbGV0ZSIsInJlbW92ZSIsImxvYWRBc3NldHMiLCJhc3NldHMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJlbnN1cmVSYWRpY2FsTWFydERpc3BsYXkiLCJ3aW5kb3ciLCJSYWRpY2FsTWFydERpc3BsYXkiLCJjYXJ0IiwiYWRkQnV0dG9uc0xvY2siLCJkaXNwbGF5TW9kdWxlQnV0dG9uc0xvY2siLCJkaXNjb3VudEhpZGUiLCJwcm9kdWN0c0Rpc2NvdW50SGlkZSIsImJhZGdlSGlkZSIsIm1vZHVsZUhpZGUiLCJtb2R1bGVTaG93IiwicGFnZUVycm9ycyIsInBhZ2VSZWxvYWQiLCJub3RpZmljYXRpb25fYWRkU2hvdyIsImVycm9yc1Nob3ciLCJjaGVja291dCIsInN1Ym1pdEJ1dHRvbnNMb2NrIiwiY2hlY2tFcnJvcnNTaG93IiwiY2hlY2tFcnJvcnNQcm9kdWN0c1Nob3ciLCJnbG9iYWxMb2FkaW5nU2hvdyIsInNoaXBwaW5nTG9hZGluZ1Nob3ciLCJwYXltZW50TG9hZGluZ1Nob3ciLCJsb2dpblNob3ciLCJjcmVhdGVPcmRlclByb2dyZXNzIiwibG9naW4iLCJidXR0b25zTG9jayIsImZyb21TaG93IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwibGFiZWxzIiwiZG9jdW1lbnRFbGVtZW50IiwibGFuZyIsInRvTG93ZXJDYXNlIiwic3RhcnRzV2l0aCIsImxvYWRpbmciLCJpblN0b2NrIiwib3V0T2ZTdG9jayIsInF1YW50aXR5IiwiYWRkVG9DYXJ0IiwiZGV0YWlscyIsInF1aWNrVmlldyIsIm5vSW1hZ2UiLCJ0cmFuc2xhdGUiLCJmYWxsYmFjayIsInRyYW5zbGF0ZWQiLCJKb29tbGEiLCJUZXh0IiwiXyIsImVsZW1lbnQiLCJ0YWciLCJjbGFzc05hbWUiLCJfcmVmMiIsInJlcXVlc3RQcm9kdWN0IiwiZW5kcG9pbnQiLCJ0YXNrIiwicHJvZHVjdElkIiwic2lnbmFsIiwidXJsIiwibG9jYXRpb24iLCJzZWFyY2hQYXJhbXMiLCJyZXNwb25zZSIsImZldGNoIiwidG9TdHJpbmciLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJwYXlsb2FkIiwianNvbiIsIm9rIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJkYXRhIiwiaXNBcnJheSIsImlkIiwicmVxdWVzdFF1aWNrVmlld0xheW91dCIsInRlbXBsYXRlSWQiLCJodG1sIiwicmVzb2x2ZVByb2R1Y3RTY29wZSIsInNvdXJjZSIsInBhcmVudEVsZW1lbnQiLCJjbG9zZXN0IiwiYXBwZW5kU3BlY2lmaWNhdGlvblZhbHVlIiwiZmllbGQiLCJpbm5lckhUTUwiLCJjaGlsZE5vZGVzIiwicmVuZGVyUHJvZHVjdFNwZWNpZmljYXRpb25zIiwiY29udGFpbmVyIiwic291cmNlRmllbGRzZXRzIiwic2hvd1ZhcmlhbnRzIiwiZGF0YXNldCIsInNob3dWYXJpYW50RmllbGRzIiwic2hvd1RpdGxlcyIsInNob3dGaWVsZHNldFRpdGxlcyIsImRpdmlkZXIiLCJzdHJpcGVkIiwibGF5b3V0IiwiaW5jbHVkZXMiLCJjb2x1bW5zIiwiZmllbGRzZXRzIiwibWFwIiwiZmllbGRzZXQiLCJmaWVsZHMiLCJmaWx0ZXIiLCJ2YXJpYW50IiwiZnJhZ21lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwic2VjdGlvbiIsInRpdGxlIiwidGl0bGVOb2RlIiwidGFibGUiLCJib2R5Iiwicm93IiwibGFiZWwiLCJzY29wZSIsImdyaWQiLCJpdGVtIiwibGlzdCIsInJlcGxhY2VDaGlsZHJlbiIsImhpZGRlbiIsIlVJa2l0IiwidXBkYXRlIiwic2V0TWV0YUNvbnRlbnQiLCJhdHRyaWJ1dGUiLCJ1cGRhdGVQcm9kdWN0TWV0YWRhdGEiLCJwcm9kdWN0IiwiZGVzY3JpcHRpb24iLCJpbnRyb3RleHQiLCJ0cmltIiwiaW1hZ2UiLCJtZWRpYSIsImxpbmsiLCJjYW5vbmljYWwiLCJQcm9kdWN0U2NvcGUiLCJjb25zdHJ1Y3RvciIsInJlYWREYXRhIiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIm5vZGVzIiwic2VsZWN0b3IiLCJvd25lciIsImluaXQiLCJybVByb2R1Y3RTY29wZVJlYWR5IiwiZXZlbnQiLCJ0YXJnZXQiLCJhcHBseVByb2R1Y3QiLCJybVByb2R1Y3RQYWdlIiwidXBkYXRlRG9jdW1lbnRUaXRsZSIsInVwZGF0ZURvY3VtZW50TWV0YWRhdGEiLCJybVByb2R1Y3RJZCIsImNvZGUiLCJpbnRyb3RleHRIdG1sIiwiZnVsbHRleHRIdG1sIiwiZnVsbHRleHQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhbHQiLCJiYXNlIiwiZmluYWwiLCJkaXNjb3VudCIsImVuYWJsZWQiLCJCb29sZWFuIiwicHJpY2UiLCJkaXNjb3VudEVuYWJsZWQiLCJzaG93QmFzZSIsInNob3dEaXNjb3VudCIsImxhYmVsSW4iLCJsYWJlbE91dCIsInRvZ2dsZSIsInJtRHluYW1pY1Byb2R1Y3QiLCJtaW4iLCJzdGVwIiwibWF4IiwiTnVtYmVyIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJidWJibGVzIiwiUHJvZHVjdENhcmREcm9wZG93biIsInJtUHJvZHVjdENhcmREcm9wZG93blJlYWR5IiwiZGlzcGxheU1vZGUiLCJhZGQiLCJybUhvdmVyQnJlYWtwb2ludCIsImhvdmVyQnJlYWtwb2ludCIsIlZhcmlhbnRQaWNrZXIiLCJvblByb2R1Y3QiLCJzZWxlY3RlZCIsInBlbmRpbmciLCJoYW5kbGVQb3BTdGF0ZSIsImJpbmQiLCJ2aXNpYmxlRmllbGRzIiwiU2V0IiwiYWxpYXMiLCJjdXJyZW50IiwicHJvZHVjdHMiLCJjdXJyZW50UHJvZHVjdCIsInZpc2libGVTZWxlY3Rpb24iLCJmcm9tRW50cmllcyIsIl9yZWYzIiwicm1WYXJpYW50c1JlYWR5Iiwib3B0aW9uIiwic2VsZWN0Iiwicm1GaWVsZCIsInJtVmFsdWUiLCJyZW5kZXJTdGF0ZSIsImluaXRIaXN0b3J5IiwidXBkYXRlVXJsIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImN1cnJlbnRJZCIsInN0YXRlIiwiY3VycmVudFVybCIsInBhdGhuYW1lIiwic2VhcmNoIiwibG9hZFByb2R1Y3QiLCJ3YW50ZWQiLCJtYXRjaGVzIiwiYWN0aW9uIiwiYXNzaWduIiwic2VsZWN0aW9uIiwiZXZlcnkiLCJfcmVmNCIsImRpc2FibGVVbmF2YWlsYWJsZSIsIndyYXBwZXIiLCJDU1MiLCJlc2NhcGUiLCJhY3RpdmUiLCJhdmFpbGFibGUiLCJpc0F2YWlsYWJsZSIsIm9wdGlvbnMiLCJzZWxlY3RlZExhYmVsIiwib3RoZXJGaWVsZHMiLCJfcmVmNSIsInNvbWUiLCJfcmVmNiIsInVwZGF0ZUhpc3RvcnkiLCJwcm9kdWN0U2NvcGUiLCJhYm9ydCIsIkFib3J0Q29udHJvbGxlciIsImNvbnRyb2xsZXIiLCJmdWxsIiwidXJsTW9kZSIsImhpc3RvcnlNZXRob2QiLCJRdWlja1ZpZXciLCJjYWNoZSIsIm1vZGFsIiwic2V0dGluZ3MiLCJidWlsZGVyQ29udGV4dCIsIm1vZGFsQ2xhc3NlcyIsIm9wZW4iLCJ0cmlnZ2VyIiwicm1RdWlja1ZpZXciLCJlbnN1cmVNb2RhbCIsInJvb3QiLCJkaWFsb2ciLCJybVF1aWNrVmlld0xhYmVsIiwic2hvdyIsInNldExvYWRpbmciLCJjb250ZW50TW9kZSIsInJlbmRlckJ1aWxkZXJDb250ZW50IiwicmVuZGVyIiwicmVuZGVyRXJyb3IiLCJsb2FkQnVpbGRlclByb2R1Y3QiLCJhcHBlbmRDaGlsZCIsIm1vZGFsQ2xhc3MiLCJzcGxpdCIsIm1vZGFsU2l6ZSIsImNlbnRlciIsIm1vZGFsQ2VudGVyIiwiYmdDbG9zZSIsImVzY0Nsb3NlIiwiY2xvc2UiLCJjb250ZW50UGFkZGluZyIsIm1vYmlsZUZ1bGxzY3JlZW4iLCJvdmVyZmxvd0F1dG8iLCJwYWRkaW5nIiwic2hvd0Nsb3NlIiwiY2xvc2VMYXJnZSIsImNvbXBvbmVudCIsIiRwcm9wcyIsInN0eWxlIiwiZGlzcGxheSIsImFsZXJ0IiwiY29udGV4dCIsImxvYWRPcHRpb25zIiwiY3JlYXRlUmFuZ2UiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJSYWRpY2FsTWFydENhcnQiLCJsb2FkQWN0aW9ucyIsIm1lZGlhQ29sdW1uIiwiY29udGVudENvbHVtbiIsInJlbmRlck1lZGlhIiwicmVuZGVyQ29udGVudCIsIm1haW4iLCJwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVySWNvbiIsInBsYWNlaG9sZGVyVGV4dCIsIml0ZW1zIiwiaW5kZXgiLCJ0aHVtYiIsInRodW1iSW5kZXgiLCJsaWdodGJveFBhbmVsIiwiY2FwdGlvbiIsInRodW1icyIsInNob3dDb2RlIiwib2xkUHJpY2UiLCJmaW5hbFByaWNlIiwic3RvY2siLCJzaG93RGVzY3JpcHRpb24iLCJ2YXJpYW50cyIsInJlbmRlclZhcmlhbnRzIiwic2hvd0NhcnQiLCJyZW5kZXJDYXJ0IiwibW9yZSIsImxlZ2VuZCIsInJvbGUiLCJzd2F0Y2giLCJjb2xvciIsInNldFByb3BlcnR5IiwidXBkYXRlUHJvZHVjdCIsImFkZFByb2R1Y3QiLCJyZXBsYWNlV2l0aCIsImNhcnRGZWVkYmFja1RpbWVycyIsIldlYWtNYXAiLCJwcmVwYXJlQ2FydEJ1dHRvbiIsInJtQ2FydE9yaWdpbmFsIiwiY2xlYXJUaW1lb3V0Iiwic2hvd0NhcnRQZW5kaW5nIiwicm1DYXJ0TG9hZGluZyIsInNob3dDYXJ0RmVlZGJhY2siLCJlbnRyeSIsInByb2R1Y3RfaWQiLCJybUNhcnRTdWNjZXNzIiwidGltZXIiLCJzZXRUaW1lb3V0IiwicmVzZXRQZW5kaW5nQ2FydEJ1dHRvbnMiLCJkcm9wZG93biIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIl0sInNvdXJjZVJvb3QiOiIifQ==