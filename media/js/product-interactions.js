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
  Object.entries(attributes).forEach(_ref => {
    let [name, value] = _ref;
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
class VariantPicker {
  constructor(container) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let onProduct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.container = container;
    this.data = data || this.readData();
    this.onProduct = onProduct;
    this.selected = {};
    this.pending = null;
    const current = this.data?.products?.find(product => Number(product.id) === Number(this.data.currentProduct));
    if (current) {
      const visibleFields = new Set((this.data?.fields || []).map(field => String(field.alias)));
      this.selected = Object.fromEntries(Object.entries(current.fields || {}).filter(_ref2 => {
        let [alias] = _ref2;
        return visibleFields.has(String(alias));
      }));
    }
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
    if (this.container.dataset.displayMode === 'hover') {
      const scope = this.container.closest('[data-rm-product-scope], .el-item, .uk-card') || this.container.closest('.rmvariants-card');
      if (scope && scope !== this.container) {
        scope.classList.add('rmvariants-card--hover');
        scope.dataset.rmHoverBreakpoint = this.container.dataset.hoverBreakpoint || 'm';
        scope.append(this.container);
      }
    }
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
    this.selected = {
      ...product.fields
    };
    this.data.currentProduct = Number(product.id);
    this.renderState();
    if (this.container.dataset.action === 'navigate') {
      window.location.assign(product.link);
      return;
    }
    this.loadProduct(product);
  }
  matches(product, selection) {
    return Object.entries(selection).every(_ref3 => {
      let [alias, value] = _ref3;
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
    });
  }
  isAvailable(alias, value) {
    const otherFields = Object.entries(this.selected).filter(_ref4 => {
      let [key] = _ref4;
      return key !== alias;
    });
    return this.data.products.some(product => String(product.fields[alias]) === String(value) && otherFields.every(_ref5 => {
      let [key, selected] = _ref5;
      return String(product.fields[key]) === String(selected);
    }));
  }
  async loadProduct(product) {
    const status = this.container.querySelector('.rmvariants__status');
    const loading = this.container.querySelector('[data-rm-label-loading]')?.textContent || 'Loading…';
    if (status) status.textContent = loading;
    this.container.classList.add('rmvariants--loading');
    if (this.pending) this.pending.abort();
    this.pending = new AbortController();
    const controller = this.pending;
    try {
      const full = await requestProduct(this.container.dataset.endpoint, 'variant', product.id, controller.signal);
      this.applyProduct(full);
      if (status) status.textContent = '';
    } catch (error) {
      if (error.name !== 'AbortError' && status) status.textContent = error.message;
    } finally {
      if (this.pending === controller) {
        this.container.classList.remove('rmvariants--loading');
        this.pending = null;
      }
    }
  }
  applyProduct(product) {
    if (typeof this.onProduct === 'function') {
      this.onProduct(product);
    } else {
      const scope = this.container.closest('[data-rm-product-scope], .el-item, .uk-card') || this.container.closest('.rmvariants-card') || document;
      scope.querySelectorAll('[radicalmart-cart="product"], [data-radicalmart-cart="product"]').forEach(cart => {
        cart.dataset.id = product.id;
        cart.dataset.rmDynamicProduct = 'true';
      });
    }
    if (this.container.dataset.updateUrl === 'true' && product.link && window.history?.replaceState) {
      window.history.replaceState({
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
    this.show();
    this.setLoading();
    this.builderContext = null;
    if (this.pending) this.pending.abort();
    this.pending = new AbortController();
    const controller = this.pending;
    try {
      if (trigger.dataset.contentMode === 'builder' && trigger.dataset.templateId) {
        const key = `${trigger.dataset.endpoint}:layout:${trigger.dataset.templateId}:${id}`;
        const layout = this.cache.has(key) ? this.cache.get(key) : await requestQuickViewLayout(trigger.dataset.endpoint, id, trigger.dataset.templateId, controller.signal);
        this.cache.set(key, layout);
        this.product = null;
        this.renderBuilderContent(layout.html, {
          endpoint: trigger.dataset.endpoint,
          templateId: trigger.dataset.templateId,
          productId: id
        });
        return;
      }
      const key = `${trigger.dataset.endpoint}:${id}`;
      const product = this.cache.has(key) ? this.cache.get(key) : await requestProduct(trigger.dataset.endpoint, 'quickView', id, controller.signal);
      this.cache.set(key, product);
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
    this.modal.innerHTML = '<div class="rmquickview__dialog uk-modal-dialog"><button class="rmquickview__close uk-modal-close-default" type="button" uk-close aria-label="Close"></button><div class="rmquickview__body uk-modal-body"></div></div>';
    this.modal.addEventListener('radicalmart:variant-change', event => {
      const productId = Number(event.detail?.product?.id);
      if (this.builderContext && productId) this.loadBuilderProduct(productId);
    });
    document.body.appendChild(this.modal);
  }
  show() {
    this.modal.classList.toggle('uk-modal-container', this.settings.modalSize === 'container');
    this.modal.classList.toggle('rmquickview--large', this.settings.modalSize === 'large');
    if (window.UIkit?.modal) window.UIkit.modal(this.modal).show();else {
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
  renderBuilderContent(html) {
    let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.builderContext;
    const body = this.modal.querySelector('.rmquickview__body');
    const fragment = document.createRange().createContextualFragment(html);
    body.replaceChildren(fragment);
    this.builderContext = context;
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
      const layout = this.cache.has(key) ? this.cache.get(key) : await requestQuickViewLayout(context.endpoint, productId, context.templateId, controller.signal);
      this.cache.set(key, layout);
      this.renderBuilderContent(layout.html, {
        ...context,
        productId
      });
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
const init = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
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
  const quantity = cart.querySelector('[radicalmart-cart="quantity"], [data-radicalmart-cart="quantity"]');
  window.RadicalMartCart().addProduct(Number(cart.dataset.id), Number(quantity?.value) || 1);
}, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxDQUFDO0FBQzNELElBQUlnSyxnQkFBZ0IsQ0FBRUMsU0FBUyxJQUFLQSxTQUFTLENBQUMvTixPQUFPLENBQUVnTyxRQUFRLElBQUtBLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDak8sT0FBTyxDQUFFSixJQUFJLElBQUs7RUFDdEcsSUFBSUEsSUFBSSxDQUFDc08sUUFBUSxLQUFLQyxJQUFJLENBQUNDLFlBQVksRUFBRXRLLElBQUksQ0FBQ2xFLElBQUksQ0FBQztBQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUN5TyxPQUFPLENBQUN4USxRQUFRLENBQUNHLGVBQWUsRUFBRTtFQUFDc1EsU0FBUyxFQUFFLElBQUk7RUFBRUMsT0FBTyxFQUFFO0FBQUksQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvcHJvZHVjdC1pbnRlcmFjdGlvbnMuc2NzcyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL3Byb2R1Y3QtaW50ZXJhY3Rpb25zLmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vcHJvZHVjdC1pbnRlcmFjdGlvbnMuc2Nzcyc7XG5cbmNvbnN0IHRleHQgPSAodmFsdWUpID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlIHx8ICcnKTtcblxuY29uc3QgbGFiZWxzID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdydScpID8ge1xuICAgIGxvYWRpbmc6ICfQl9Cw0LPRgNGD0LfQutCw4oCmJywgZXJyb3I6ICfQndC1INGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjCDRgtC+0LLQsNGALicsIGluU3RvY2s6ICfQkiDQvdCw0LvQuNGH0LjQuCcsXG4gICAgb3V0T2ZTdG9jazogJ9Cd0LXRgiDQsiDQvdCw0LvQuNGH0LjQuCcsIHF1YW50aXR5OiAn0JrQvtC70LjRh9C10YHRgtCy0L4nLCBhZGRUb0NhcnQ6ICfQkiDQutC+0YDQt9C40L3RgycsXG4gICAgZGV0YWlsczogJ9Cf0L7QtNGA0L7QsdC90LXQtScsIHF1aWNrVmlldzogJ9CR0YvRgdGC0YDRi9C5INC/0YDQvtGB0LzQvtGC0YAnLCBub0ltYWdlOiAn0J3QtdGCINC40LfQvtCx0YDQsNC20LXQvdC40Y8nXG59IDoge1xuICAgIGxvYWRpbmc6ICdMb2FkaW5n4oCmJywgZXJyb3I6ICdVbmFibGUgdG8gbG9hZCBwcm9kdWN0LicsIGluU3RvY2s6ICdJbiBzdG9jaycsXG4gICAgb3V0T2ZTdG9jazogJ05vdCBhdmFpbGFibGUnLCBxdWFudGl0eTogJ1F1YW50aXR5JywgYWRkVG9DYXJ0OiAnQWRkIHRvIGNhcnQnLFxuICAgIGRldGFpbHM6ICdEZXRhaWxzJywgcXVpY2tWaWV3OiAnUXVpY2sgdmlldycsIG5vSW1hZ2U6ICdObyBpbWFnZSdcbn07XG5cbmNvbnN0IHRyYW5zbGF0ZSA9IChrZXksIGZhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgdHJhbnNsYXRlZCA9IHdpbmRvdy5Kb29tbGE/LlRleHQ/Ll8/LihrZXkpO1xuICAgIHJldHVybiB0cmFuc2xhdGVkICYmIHRyYW5zbGF0ZWQgIT09IGtleSA/IHRyYW5zbGF0ZWQgOiBmYWxsYmFjaztcbn07XG5cbmNvbnN0IGVsZW1lbnQgPSAodGFnLCBjbGFzc05hbWUgPSAnJywgYXR0cmlidXRlcyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAoY2xhc3NOYW1lKSBub2RlLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5jb25zdCByZXF1ZXN0UHJvZHVjdCA9IGFzeW5jIChlbmRwb2ludCwgdGFzaywgcHJvZHVjdElkLCBzaWduYWwgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0YXNrJywgdGFzayk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3Byb2R1Y3RfaWQnLCBwcm9kdWN0SWQpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSwge1xuICAgICAgICBoZWFkZXJzOiB7J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnfSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIHNpZ25hbFxuICAgIH0pO1xuICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgaWYgKCFyZXNwb25zZS5vayB8fCBwYXlsb2FkLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkLm1lc3NhZ2UgfHwgYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBwYXlsb2FkLmRhdGE7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGRhdGFbMF0gPT09ICdvYmplY3QnKSBkYXRhID0gZGF0YVswXTtcbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEuaWQpIHRocm93IG5ldyBFcnJvcignUHJvZHVjdCBkYXRhIGlzIGVtcHR5LicpO1xuICAgIHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgcmVxdWVzdFF1aWNrVmlld0xheW91dCA9IGFzeW5jIChlbmRwb2ludCwgcHJvZHVjdElkLCB0ZW1wbGF0ZUlkLCBzaWduYWwgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChlbmRwb2ludCwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0YXNrJywgJ3F1aWNrVmlld0xheW91dCcpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcm9kdWN0X2lkJywgcHJvZHVjdElkKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndGVtcGxhdGVfaWQnLCB0ZW1wbGF0ZUlkKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgaGVhZGVyczogeydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J30sXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICBzaWduYWxcbiAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcGF5bG9hZC5zdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZC5tZXNzYWdlIHx8IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gcGF5bG9hZC5kYXRhO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAxICYmIHR5cGVvZiBkYXRhWzBdID09PSAnb2JqZWN0JykgZGF0YSA9IGRhdGFbMF07XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmh0bWwpIHRocm93IG5ldyBFcnJvcignUXVpY2sgVmlldyBsYXlvdXQgaXMgZW1wdHkuJyk7XG4gICAgcmV0dXJuIGRhdGE7XG59O1xuXG5jbGFzcyBWYXJpYW50UGlja2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGRhdGEgPSBudWxsLCBvblByb2R1Y3QgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHRoaXMucmVhZERhdGEoKTtcbiAgICAgICAgdGhpcy5vblByb2R1Y3QgPSBvblByb2R1Y3Q7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbnVsbDtcblxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5kYXRhPy5wcm9kdWN0cz8uZmluZCgocHJvZHVjdCkgPT4gTnVtYmVyKHByb2R1Y3QuaWQpID09PSBOdW1iZXIodGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0KSk7XG5cdFx0aWYgKGN1cnJlbnQpIHtcblx0XHRcdGNvbnN0IHZpc2libGVGaWVsZHMgPSBuZXcgU2V0KCh0aGlzLmRhdGE/LmZpZWxkcyB8fCBbXSkubWFwKChmaWVsZCkgPT4gU3RyaW5nKGZpZWxkLmFsaWFzKSkpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRcdFx0T2JqZWN0LmVudHJpZXMoY3VycmVudC5maWVsZHMgfHwge30pLmZpbHRlcigoW2FsaWFzXSkgPT4gdmlzaWJsZUZpZWxkcy5oYXMoU3RyaW5nKGFsaWFzKSkpXG5cdFx0XHQpO1xuXHRcdH1cbiAgICB9XG5cbiAgICByZWFkRGF0YSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19kYXRhJyk/LnRleHRDb250ZW50IHx8ICd7fScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0YT8uZmllbGRzPy5sZW5ndGggfHwgIXRoaXMuZGF0YT8ucHJvZHVjdHM/Lmxlbmd0aCB8fCB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJtVmFyaWFudHNSZWFkeSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnJtVmFyaWFudHNSZWFkeSA9ICd0cnVlJztcblxuXHRcdGlmICh0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmRpc3BsYXlNb2RlID09PSAnaG92ZXInKSB7XG5cdFx0XHRjb25zdCBzY29wZSA9IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdLCAuZWwtaXRlbSwgLnVrLWNhcmQnKVxuXHRcdFx0XHR8fCB0aGlzLmNvbnRhaW5lci5jbG9zZXN0KCcucm12YXJpYW50cy1jYXJkJyk7XG5cdFx0XHRpZiAoc2NvcGUgJiYgc2NvcGUgIT09IHRoaXMuY29udGFpbmVyKSB7XG5cdFx0XHRcdHNjb3BlLmNsYXNzTGlzdC5hZGQoJ3JtdmFyaWFudHMtY2FyZC0taG92ZXInKTtcblx0XHRcdFx0c2NvcGUuZGF0YXNldC5ybUhvdmVyQnJlYWtwb2ludCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuaG92ZXJCcmVha3BvaW50IHx8ICdtJztcblx0XHRcdFx0c2NvcGUuYXBwZW5kKHRoaXMuY29udGFpbmVyKTtcblx0XHRcdH1cblx0XHR9XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS12YWx1ZV0nKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9uIHx8IG9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBvcHRpb24uY2xvc2VzdCgnW2RhdGEtcm0tZmllbGRdJyk7XG4gICAgICAgICAgICBpZiAoZmllbGQpIHRoaXMuc2VsZWN0KGZpZWxkLmRhdGFzZXQucm1GaWVsZCwgb3B0aW9uLmRhdGFzZXQucm1WYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucm12YXJpYW50c19fc2VsZWN0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IHNlbGVjdD8uY2xvc2VzdCgnW2RhdGEtcm0tZmllbGRdJyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ICYmIGZpZWxkKSB0aGlzLnNlbGVjdChmaWVsZC5kYXRhc2V0LnJtRmllbGQsIHNlbGVjdC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVuZGVyU3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3QoYWxpYXMsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHdhbnRlZCA9IHsuLi50aGlzLnNlbGVjdGVkLCBbYWxpYXNdOiBTdHJpbmcodmFsdWUpfTtcbiAgICAgICAgbGV0IHByb2R1Y3QgPSB0aGlzLmRhdGEucHJvZHVjdHMuZmluZCgoaXRlbSkgPT4gdGhpcy5tYXRjaGVzKGl0ZW0sIHdhbnRlZCkpO1xuXG4gICAgICAgIC8vIFNwYXJzZSB2YXJpYXRpb24gbWF0cmljZXMgYXJlIGNvbW1vbi4gSWYgdGhlIGV4YWN0IGNvbWJpbmF0aW9uIGRvZXNcbiAgICAgICAgLy8gbm90IGV4aXN0LCBtb3ZlIHRvIHRoZSBmaXJzdCByZWFsIHByb2R1Y3QgY29udGFpbmluZyB0aGUgY2hhbmdlZCB2YWx1ZS5cbiAgICAgICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICAgICAgICBwcm9kdWN0ID0gdGhpcy5kYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IFN0cmluZyhpdGVtLmZpZWxkc1thbGlhc10pID09PSBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb2R1Y3QpIHJldHVybjtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gey4uLnByb2R1Y3QuZmllbGRzfTtcbiAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnRQcm9kdWN0ID0gTnVtYmVyKHByb2R1Y3QuaWQpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQuYWN0aW9uID09PSAnbmF2aWdhdGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHByb2R1Y3QubGluayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0KHByb2R1Y3QpO1xuICAgIH1cblxuICAgIG1hdGNoZXMocHJvZHVjdCwgc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzZWxlY3Rpb24pLmV2ZXJ5KChbYWxpYXMsIHZhbHVlXSkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2FsaWFzXSkgPT09IFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCBkaXNhYmxlVW5hdmFpbGFibGUgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmRpc2FibGVVbmF2YWlsYWJsZSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgdGhpcy5kYXRhLmZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJtLWZpZWxkPVwiJHtDU1MuZXNjYXBlKGZpZWxkLmFsaWFzKX1cIl1gKTtcbiAgICAgICAgICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xuXG4gICAgICAgICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXZhbHVlXScpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IFN0cmluZyhvcHRpb24uZGF0YXNldC5ybVZhbHVlKSA9PT0gU3RyaW5nKHRoaXMuc2VsZWN0ZWRbZmllbGQuYWxpYXNdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhdmFpbGFibGUgPSB0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24uZGF0YXNldC5ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBhY3RpdmUgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgncm12YXJpYW50c19fb3B0aW9uLS1hY3RpdmUnLCBhY3RpdmUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5kaXNhYmxlZCA9IGRpc2FibGVVbmF2YWlsYWJsZSAmJiAhYXZhaWxhYmxlO1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBvcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXZhcmlhbnRzX19zZWxlY3QnKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSB0aGlzLnNlbGVjdGVkW2ZpZWxkLmFsaWFzXSA/PyAnJztcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gZGlzYWJsZVVuYXZhaWxhYmxlICYmICF0aGlzLmlzQXZhaWxhYmxlKGZpZWxkLmFsaWFzLCBvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0F2YWlsYWJsZShhbGlhcywgdmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJGaWVsZHMgPSBPYmplY3QuZW50cmllcyh0aGlzLnNlbGVjdGVkKS5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IGFsaWFzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wcm9kdWN0cy5zb21lKChwcm9kdWN0KSA9PiBTdHJpbmcocHJvZHVjdC5maWVsZHNbYWxpYXNdKSA9PT0gU3RyaW5nKHZhbHVlKVxuICAgICAgICAgICAgJiYgb3RoZXJGaWVsZHMuZXZlcnkoKFtrZXksIHNlbGVjdGVkXSkgPT4gU3RyaW5nKHByb2R1Y3QuZmllbGRzW2tleV0pID09PSBTdHJpbmcoc2VsZWN0ZWQpKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm12YXJpYW50c19fc3RhdHVzJyk7XG4gICAgICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1sYWJlbC1sb2FkaW5nXScpPy50ZXh0Q29udGVudCB8fCAnTG9hZGluZ+KApic7XG4gICAgICAgIGlmIChzdGF0dXMpIHN0YXR1cy50ZXh0Q29udGVudCA9IGxvYWRpbmc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3JtdmFyaWFudHMtLWxvYWRpbmcnKTtcblxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wZW5kaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsID0gYXdhaXQgcmVxdWVzdFByb2R1Y3QodGhpcy5jb250YWluZXIuZGF0YXNldC5lbmRwb2ludCwgJ3ZhcmlhbnQnLCBwcm9kdWN0LmlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UHJvZHVjdChmdWxsKTtcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHN0YXR1cy50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09ICdBYm9ydEVycm9yJyAmJiBzdGF0dXMpIHN0YXR1cy50ZXh0Q29udGVudCA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nID09PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgncm12YXJpYW50cy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseVByb2R1Y3QocHJvZHVjdCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25Qcm9kdWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uUHJvZHVjdChwcm9kdWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5jb250YWluZXIuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0sIC5lbC1pdGVtLCAudWstY2FyZCcpXG5cdFx0XHRcdHx8IHRoaXMuY29udGFpbmVyLmNsb3Nlc3QoJy5ybXZhcmlhbnRzLWNhcmQnKSB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIHNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcnQuZGF0YXNldC5pZCA9IHByb2R1Y3QuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGNhcnQuZGF0YXNldC5ybUR5bmFtaWNQcm9kdWN0ID0gJ3RydWUnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmRhdGFzZXQudXBkYXRlVXJsID09PSAndHJ1ZScgJiYgcHJvZHVjdC5saW5rICYmIHdpbmRvdy5oaXN0b3J5Py5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7Li4ud2luZG93Lmhpc3Rvcnkuc3RhdGUsIHJtUHJvZHVjdElkOiBwcm9kdWN0LmlkfSwgJycsIHByb2R1Y3QubGluayk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncmFkaWNhbG1hcnQ6dmFyaWFudC1jaGFuZ2UnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgZGV0YWlsOiB7cHJvZHVjdH1cbiAgICAgICAgfSkpO1xuICAgIH1cbn1cblxuY2xhc3MgUXVpY2tWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZHVjdCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbnVsbDtcblx0XHR0aGlzLmJ1aWxkZXJDb250ZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuKHRyaWdnZXIpIHtcbiAgICAgICAgY29uc3QgaWQgPSBOdW1iZXIodHJpZ2dlci5kYXRhc2V0LnJtUXVpY2tWaWV3KTtcbiAgICAgICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IEpTT04ucGFyc2UodHJpZ2dlci5kYXRhc2V0LnNldHRpbmdzIHx8ICd7fScpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVNb2RhbCgpO1xuICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICB0aGlzLnNldExvYWRpbmcoKTtcblx0XHR0aGlzLmJ1aWxkZXJDb250ZXh0ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nKSB0aGlzLnBlbmRpbmcuYWJvcnQoKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wZW5kaW5nO1xuXG4gICAgICAgIHRyeSB7XG5cdFx0XHRpZiAodHJpZ2dlci5kYXRhc2V0LmNvbnRlbnRNb2RlID09PSAnYnVpbGRlcicgJiYgdHJpZ2dlci5kYXRhc2V0LnRlbXBsYXRlSWQpIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0gYCR7dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50fTpsYXlvdXQ6JHt0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZH06JHtpZH1gO1xuXHRcdFx0XHRjb25zdCBsYXlvdXQgPSB0aGlzLmNhY2hlLmhhcyhrZXkpXG5cdFx0XHRcdFx0PyB0aGlzLmNhY2hlLmdldChrZXkpXG5cdFx0XHRcdFx0OiBhd2FpdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0KFxuXHRcdFx0XHRcdFx0dHJpZ2dlci5kYXRhc2V0LmVuZHBvaW50LFxuXHRcdFx0XHRcdFx0aWQsXG5cdFx0XHRcdFx0XHR0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZCxcblx0XHRcdFx0XHRcdGNvbnRyb2xsZXIuc2lnbmFsXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0dGhpcy5jYWNoZS5zZXQoa2V5LCBsYXlvdXQpO1xuXHRcdFx0XHR0aGlzLnByb2R1Y3QgPSBudWxsO1xuXHRcdFx0XHR0aGlzLnJlbmRlckJ1aWxkZXJDb250ZW50KGxheW91dC5odG1sLCB7XG5cdFx0XHRcdFx0ZW5kcG9pbnQ6IHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCxcblx0XHRcdFx0XHR0ZW1wbGF0ZUlkOiB0cmlnZ2VyLmRhdGFzZXQudGVtcGxhdGVJZCxcblx0XHRcdFx0XHRwcm9kdWN0SWQ6IGlkXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RyaWdnZXIuZGF0YXNldC5lbmRwb2ludH06JHtpZH1gO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdCA9IHRoaXMuY2FjaGUuaGFzKGtleSlcbiAgICAgICAgICAgICAgICA/IHRoaXMuY2FjaGUuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHJlcXVlc3RQcm9kdWN0KHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCwgJ3F1aWNrVmlldycsIGlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChrZXksIHByb2R1Y3QpO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gcHJvZHVjdDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHByb2R1Y3QsIHRyaWdnZXIuZGF0YXNldC5lbmRwb2ludCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IubmFtZSAhPT0gJ0Fib3J0RXJyb3InKSB0aGlzLnJlbmRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGVuZGluZyA9PT0gY29udHJvbGxlcikgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuc3VyZU1vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RhbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1vZGFsID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3IHVrLW1vZGFsJywge1xuICAgICAgICAgICAgJ3VrLW1vZGFsJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19RVUlDS19WSUVXJywgbGFiZWxzLnF1aWNrVmlldylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kYWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJybXF1aWNrdmlld19fZGlhbG9nIHVrLW1vZGFsLWRpYWxvZ1wiPjxidXR0b24gY2xhc3M9XCJybXF1aWNrdmlld19fY2xvc2UgdWstbW9kYWwtY2xvc2UtZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiB1ay1jbG9zZSBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwicm1xdWlja3ZpZXdfX2JvZHkgdWstbW9kYWwtYm9keVwiPjwvZGl2PjwvZGl2Pic7XG5cdFx0dGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDp2YXJpYW50LWNoYW5nZScsIChldmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgcHJvZHVjdElkID0gTnVtYmVyKGV2ZW50LmRldGFpbD8ucHJvZHVjdD8uaWQpO1xuXHRcdFx0aWYgKHRoaXMuYnVpbGRlckNvbnRleHQgJiYgcHJvZHVjdElkKSB0aGlzLmxvYWRCdWlsZGVyUHJvZHVjdChwcm9kdWN0SWQpO1xuXHRcdH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgndWstbW9kYWwtY29udGFpbmVyJywgdGhpcy5zZXR0aW5ncy5tb2RhbFNpemUgPT09ICdjb250YWluZXInKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlldy0tbGFyZ2UnLCB0aGlzLnNldHRpbmdzLm1vZGFsU2l6ZSA9PT0gJ2xhcmdlJyk7XG4gICAgICAgIGlmICh3aW5kb3cuVUlraXQ/Lm1vZGFsKSB3aW5kb3cuVUlraXQubW9kYWwodGhpcy5tb2RhbCkuc2hvdygpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgndWstb3BlbicpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExvYWRpbmcoKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fYm9keScpO1xuICAgICAgICBib2R5LnJlcGxhY2VDaGlsZHJlbihlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2xvYWRlcicsIHsndWstc3Bpbm5lcic6ICdyYXRpbzogMS41J30pKTtcbiAgICB9XG5cbiAgICByZW5kZXJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IGFsZXJ0ID0gZWxlbWVudCgnZGl2JywgJ3VrLWFsZXJ0LWRhbmdlcicsIHsndWstYWxlcnQnOiB0cnVlfSk7XG4gICAgICAgIGFsZXJ0LmFwcGVuZCh0ZXh0KG1lc3NhZ2UgfHwgdHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19FUlJPUl9MT0FEX1BST0RVQ1QnLCBsYWJlbHMuZXJyb3IpKSk7XG4gICAgICAgIHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5JykucmVwbGFjZUNoaWxkcmVuKGFsZXJ0KTtcbiAgICB9XG5cbiAgICByZW5kZXJCdWlsZGVyQ29udGVudChodG1sLCBjb250ZXh0ID0gdGhpcy5idWlsZGVyQ29udGV4dCkge1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2JvZHknKTtcblx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpO1xuXHRcdGJvZHkucmVwbGFjZUNoaWxkcmVuKGZyYWdtZW50KTtcblx0XHR0aGlzLmJ1aWxkZXJDb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgaWYgKHdpbmRvdy5VSWtpdD8udXBkYXRlKSB3aW5kb3cuVUlraXQudXBkYXRlKGJvZHkpO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5SYWRpY2FsTWFydENhcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcnQgPSB3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhcnQ/LmxvYWRBY3Rpb25zID09PSAnZnVuY3Rpb24nKSBjYXJ0LmxvYWRBY3Rpb25zKGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3l0ZHluYW1pY3M6cXVpY2t2aWV3LW9wZW4nLCB7YnViYmxlczogdHJ1ZX0pKTtcbiAgICB9XG5cblx0YXN5bmMgbG9hZEJ1aWxkZXJQcm9kdWN0KHByb2R1Y3RJZCkge1xuXHRcdGNvbnN0IGNvbnRleHQgPSB0aGlzLmJ1aWxkZXJDb250ZXh0O1xuXHRcdGlmICghY29udGV4dCB8fCBOdW1iZXIoY29udGV4dC5wcm9kdWN0SWQpID09PSBOdW1iZXIocHJvZHVjdElkKSkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zZXRMb2FkaW5nKCk7XG5cdFx0aWYgKHRoaXMucGVuZGluZykgdGhpcy5wZW5kaW5nLmFib3J0KCk7XG5cdFx0dGhpcy5wZW5kaW5nID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXHRcdGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBlbmRpbmc7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qga2V5ID0gYCR7Y29udGV4dC5lbmRwb2ludH06bGF5b3V0OiR7Y29udGV4dC50ZW1wbGF0ZUlkfToke3Byb2R1Y3RJZH1gO1xuXHRcdFx0Y29uc3QgbGF5b3V0ID0gdGhpcy5jYWNoZS5oYXMoa2V5KVxuXHRcdFx0XHQ/IHRoaXMuY2FjaGUuZ2V0KGtleSlcblx0XHRcdFx0OiBhd2FpdCByZXF1ZXN0UXVpY2tWaWV3TGF5b3V0KGNvbnRleHQuZW5kcG9pbnQsIHByb2R1Y3RJZCwgY29udGV4dC50ZW1wbGF0ZUlkLCBjb250cm9sbGVyLnNpZ25hbCk7XG5cdFx0XHR0aGlzLmNhY2hlLnNldChrZXksIGxheW91dCk7XG5cdFx0XHR0aGlzLnJlbmRlckJ1aWxkZXJDb250ZW50KGxheW91dC5odG1sLCB7Li4uY29udGV4dCwgcHJvZHVjdElkfSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGlmIChlcnJvci5uYW1lICE9PSAnQWJvcnRFcnJvcicpIHRoaXMucmVuZGVyRXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGlmICh0aGlzLnBlbmRpbmcgPT09IGNvbnRyb2xsZXIpIHRoaXMucGVuZGluZyA9IG51bGw7XG5cdFx0fVxuXHR9XG5cbiAgICByZW5kZXIocHJvZHVjdCwgZW5kcG9pbnQpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19ib2R5Jyk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fbGF5b3V0IHVrLWdyaWQtbGFyZ2UgdWstZmxleC1taWRkbGUnLCB7J3VrLWdyaWQnOiB0cnVlLCAnZGF0YS1ybS1wcm9kdWN0LXNjb3BlJzogdHJ1ZX0pO1xuICAgICAgICBjb25zdCBtZWRpYUNvbHVtbiA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fbWVkaWEtY29sdW1uIHVrLXdpZHRoLTEtMkBtJyk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRDb2x1bW4gPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2NvbnRlbnQgdWstd2lkdGgtZXhwYW5kQG0nKTtcblxuICAgICAgICBtZWRpYUNvbHVtbi5hcHBlbmQodGhpcy5yZW5kZXJNZWRpYShwcm9kdWN0Lm1lZGlhIHx8IFtdKSk7XG4gICAgICAgIGNvbnRlbnRDb2x1bW4uYXBwZW5kKHRoaXMucmVuZGVyQ29udGVudChwcm9kdWN0LCBlbmRwb2ludCkpO1xuICAgICAgICBsYXlvdXQuYXBwZW5kKG1lZGlhQ29sdW1uLCBjb250ZW50Q29sdW1uKTtcbiAgICAgICAgYm9keS5yZXBsYWNlQ2hpbGRyZW4obGF5b3V0KTtcbiAgICAgICAgaWYgKHdpbmRvdy5VSWtpdD8udXBkYXRlKSB3aW5kb3cuVUlraXQudXBkYXRlKGJvZHkpO1xuICAgIH1cblxuICAgIHJlbmRlck1lZGlhKG1lZGlhKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX21lZGlhJyk7XG4gICAgICAgIGNvbnN0IG1haW4gPSBlbGVtZW50KCdidXR0b24nLCAncm1xdWlja3ZpZXdfX21haW4taW1hZ2UnLCB7dHlwZTogJ2J1dHRvbid9KTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBlbGVtZW50KCdpbWcnLCAnJywge2xvYWRpbmc6ICdlYWdlcid9KTtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBlbGVtZW50KCdzcGFuJywgJ3JtcXVpY2t2aWV3X19wbGFjZWhvbGRlciB1ay10ZXh0LW11dGVkJyk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVySWNvbiA9IGVsZW1lbnQoJ3NwYW4nLCAnJywgeyd1ay1pY29uJzogJ2ljb246IGltYWdlOyByYXRpbzogMi41J30pO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclRleHQgPSBlbGVtZW50KCdzcGFuJywgJ3VrLWRpc3BsYXktYmxvY2sgdWstdGV4dC1zbWFsbCB1ay1tYXJnaW4tc21hbGwtdG9wJyk7XG4gICAgICAgIHBsYWNlaG9sZGVyVGV4dC5hcHBlbmQodGV4dCh0cmFuc2xhdGUoJ1BMR19ZVERZTkFNSUNTX05PX0lNQUdFJywgbGFiZWxzLm5vSW1hZ2UpKSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLmFwcGVuZChwbGFjZWhvbGRlckljb24sIHBsYWNlaG9sZGVyVGV4dCk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gbWVkaWEubGVuZ3RoID8gbWVkaWEgOiBbe3NyYzogJycsIGFsdDogdGhpcy5wcm9kdWN0Py50aXRsZSB8fCAnJ31dO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChpdGVtLnNyYykgaW1hZ2Uuc3JjID0gaXRlbS5zcmM7XG4gICAgICAgICAgICBlbHNlIGltYWdlLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgICAgICBpbWFnZS5hbHQgPSBpdGVtLmFsdCB8fCB0aGlzLnByb2R1Y3Q/LnRpdGxlIHx8ICcnO1xuICAgICAgICAgICAgbWFpbi5kaXNhYmxlZCA9ICFpdGVtLnNyYztcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnRvZ2dsZSgncm1xdWlja3ZpZXdfX21haW4taW1hZ2UtLWVtcHR5JywgIWl0ZW0uc3JjKTtcbiAgICAgICAgICAgIGltYWdlLmhpZGRlbiA9ICFpdGVtLnNyYztcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLmhpZGRlbiA9IEJvb2xlYW4oaXRlbS5zcmMpO1xuICAgICAgICAgICAgd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcucm1xdWlja3ZpZXdfX3RodW1iJykuZm9yRWFjaCgodGh1bWIsIHRodW1iSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHVtYi5jbGFzc0xpc3QudG9nZ2xlKCdybXF1aWNrdmlld19fdGh1bWItLWFjdGl2ZScsIHRodW1iSW5kZXggPT09IGluZGV4KTtcbiAgICAgICAgICAgICAgICB0aHVtYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIHRodW1iSW5kZXggPT09IGluZGV4ID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgbWFpbi5hcHBlbmQoaW1hZ2UsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgbWFpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbWFnZS5zcmMgJiYgd2luZG93LlVJa2l0Py5saWdodGJveFBhbmVsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LlVJa2l0LmxpZ2h0Ym94UGFuZWwoe2l0ZW1zOiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uc3JjKS5tYXAoKGl0ZW0pID0+ICh7c291cmNlOiBpdGVtLnNyYywgY2FwdGlvbjogaXRlbS5hbHR9KSl9KS5zaG93KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd3JhcHBlci5hcHBlbmQobWFpbik7XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1icyA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fdGh1bWJzIHVrLWZsZXggdWstZmxleC1jZW50ZXIgdWstZmxleC13cmFwJyk7XG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW1lbnQoJ2J1dHRvbicsICdybXF1aWNrdmlld19fdGh1bWInLCB7dHlwZTogJ2J1dHRvbicsICdhcmlhLWxhYmVsJzogaXRlbS5hbHQgfHwgYCR7aW5kZXggKyAxfWB9KTtcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kKGVsZW1lbnQoJ2ltZycsICcnLCB7c3JjOiBpdGVtLnNyYywgYWx0OiAnJywgbG9hZGluZzogJ2xhenknfSkpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlbGVjdChpbmRleCkpO1xuICAgICAgICAgICAgICAgIHRodW1icy5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmQodGh1bWJzKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3QoMCk7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQocHJvZHVjdCwgZW5kcG9pbnQpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudCgnaDInLCAncm1xdWlja3ZpZXdfX3RpdGxlIHVrLWgyIHVrLW1hcmdpbi1yZW1vdmUtdG9wJyk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBlbGVtZW50KCdhJywgJ3VrLWxpbmstaGVhZGluZycsIHtocmVmOiBwcm9kdWN0Lmxpbmt9KTtcbiAgICAgICAgbGluay5hcHBlbmQodGV4dChwcm9kdWN0LnRpdGxlKSk7XG4gICAgICAgIHRpdGxlLmFwcGVuZChsaW5rKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKHRpdGxlKTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93Q29kZSAmJiBwcm9kdWN0LmNvZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBlbGVtZW50KCdkaXYnLCAncm1xdWlja3ZpZXdfX2NvZGUgdWstdGV4dC1tZXRhIHVrLW1hcmdpbi1zbWFsbC1ib3R0b20nKTtcbiAgICAgICAgICAgIGNvZGUuYXBwZW5kKHRleHQocHJvZHVjdC5jb2RlKSk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmQoY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcmljZSA9IGVsZW1lbnQoJ2RpdicsICdybXF1aWNrdmlld19fcHJpY2UgdWstdGV4dC1sYXJnZSB1ay10ZXh0LWJvbGQnKTtcbiAgICAgICAgaWYgKHByb2R1Y3QucHJpY2U/LmRpc2NvdW50RW5hYmxlZCAmJiBwcm9kdWN0LnByaWNlLmJhc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFByaWNlID0gZWxlbWVudCgncycsICd1ay10ZXh0LW11dGVkIHVrLW1hcmdpbi1zbWFsbC1yaWdodCcpO1xuICAgICAgICAgICAgb2xkUHJpY2UuYXBwZW5kKHRleHQocHJvZHVjdC5wcmljZS5iYXNlKSk7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmQob2xkUHJpY2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbmFsUHJpY2UgPSBlbGVtZW50KCdzcGFuJywgJycsIHsnZGF0YS1ybS1wcmljZSc6IHRydWV9KTtcbiAgICAgICAgZmluYWxQcmljZS5hcHBlbmQodGV4dChwcm9kdWN0LnByaWNlPy5maW5hbCkpO1xuICAgICAgICBwcmljZS5hcHBlbmQoZmluYWxQcmljZSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChwcmljZSk7XG5cbiAgICAgICAgY29uc3Qgc3RvY2sgPSBlbGVtZW50KCdkaXYnLCBgcm1xdWlja3ZpZXdfX3N0b2NrIHVrLW1hcmdpbi1zbWFsbC10b3AgJHtwcm9kdWN0LmluU3RvY2sgPyAndWstdGV4dC1zdWNjZXNzJyA6ICd1ay10ZXh0LW11dGVkJ31gLCB7J2RhdGEtcm0tc3RvY2snOiB0cnVlfSk7XG4gICAgICAgIHN0b2NrLmFwcGVuZCh0ZXh0KHByb2R1Y3QuaW5TdG9ja1xuICAgICAgICAgICAgPyB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9JTl9TVE9DSycsIGxhYmVscy5pblN0b2NrKVxuICAgICAgICAgICAgOiB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9OT1RfSU5fU1RPQ0snLCBsYWJlbHMub3V0T2ZTdG9jaykpKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKHN0b2NrKTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93RGVzY3JpcHRpb24gJiYgcHJvZHVjdC5pbnRyb3RleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZWxlbWVudCgncCcsICdybXF1aWNrdmlld19fZGVzY3JpcHRpb24gdWstbWFyZ2luJyk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5hcHBlbmQodGV4dChwcm9kdWN0LmludHJvdGV4dCkpO1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dWYXJpYW50cyAmJiBwcm9kdWN0LnZhcmlhbnRzPy5maWVsZHM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgdmFyaWFudHMgPSB0aGlzLnJlbmRlclZhcmlhbnRzKHByb2R1Y3QudmFyaWFudHMsIGVuZHBvaW50KTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZCh2YXJpYW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93Q2FydCkgZnJhZ21lbnQuYXBwZW5kKHRoaXMucmVuZGVyQ2FydChwcm9kdWN0KSk7XG5cbiAgICAgICAgY29uc3QgbW9yZSA9IGVsZW1lbnQoJ2EnLCAncm1xdWlja3ZpZXdfX21vcmUgdWstYnV0dG9uIHVrLWJ1dHRvbi10ZXh0IHVrLW1hcmdpbi10b3AnLCB7aHJlZjogcHJvZHVjdC5saW5rfSk7XG4gICAgICAgIG1vcmUuYXBwZW5kKHRleHQodHJhbnNsYXRlKCdQTEdfWVREWU5BTUlDU19ERVRBSUxTJywgbGFiZWxzLmRldGFpbHMpKSk7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChtb3JlKTtcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cblxuICAgIHJlbmRlclZhcmlhbnRzKGRhdGEsIGVuZHBvaW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsZW1lbnQoJ2RpdicsICdybXZhcmlhbnRzIHJtcXVpY2t2aWV3X192YXJpYW50cyB1ay1mb3JtLXN0YWNrZWQnLCB7XG4gICAgICAgICAgICAnZGF0YS1ybS12YXJpYW50cyc6IHRydWUsXG4gICAgICAgICAgICAnZGF0YS1lbmRwb2ludCc6IGVuZHBvaW50LFxuICAgICAgICAgICAgJ2RhdGEtYWN0aW9uJzogJ2FqYXgnLFxuICAgICAgICAgICAgJ2RhdGEtZGlzYWJsZS11bmF2YWlsYWJsZSc6ICd0cnVlJyxcbiAgICAgICAgICAgICdkYXRhLXVwZGF0ZS11cmwnOiAnZmFsc2UnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBkYXRhLnByb2R1Y3RzLmZpbmQoKGl0ZW0pID0+IE51bWJlcihpdGVtLmlkKSA9PT0gTnVtYmVyKGRhdGEuY3VycmVudFByb2R1Y3QpKTtcbiAgICAgICAgZGF0YS5maWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkc2V0ID0gZWxlbWVudCgnZmllbGRzZXQnLCAncm12YXJpYW50c19fZmllbGQgdWstZmllbGRzZXQnLCB7J2RhdGEtcm0tZmllbGQnOiBmaWVsZC5hbGlhc30pO1xuICAgICAgICAgICAgY29uc3QgbGVnZW5kID0gZWxlbWVudCgnbGVnZW5kJywgJ3JtdmFyaWFudHNfX2xhYmVsIHVrLWZvcm0tbGFiZWwnKTtcbiAgICAgICAgICAgIGxlZ2VuZC5hcHBlbmQodGV4dChmaWVsZC50aXRsZSkpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGVsZW1lbnQoJ2RpdicsICdybXZhcmlhbnRzX19vcHRpb25zIHVrLWZsZXggdWstZmxleC13cmFwIHVrLWZsZXgtbWlkZGxlJywge3JvbGU6ICdncm91cCcsICdhcmlhLWxhYmVsJzogZmllbGQudGl0bGV9KTtcblxuICAgICAgICAgICAgZmllbGQub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBTdHJpbmcoY3VycmVudD8uZmllbGRzW2ZpZWxkLmFsaWFzXSkgPT09IFN0cmluZyhvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN3YXRjaCA9IG9wdGlvbi5pbWFnZSB8fCBvcHRpb24uY29sb3I7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbWVudCgnYnV0dG9uJywgYHJtdmFyaWFudHNfX29wdGlvbiB1ay1idXR0b24gdWstYnV0dG9uLWRlZmF1bHQke3N3YXRjaCA/ICcgcm12YXJpYW50c19fb3B0aW9uLS1zd2F0Y2gnIDogJyd9YCwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJywgJ2RhdGEtcm0tdmFsdWUnOiBvcHRpb24udmFsdWUsICdhcmlhLXByZXNzZWQnOiBhY3RpdmUgPyAndHJ1ZScgOiAnZmFsc2UnLCB0aXRsZTogb3B0aW9uLmxhYmVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5pbWFnZSkgYnV0dG9uLmFwcGVuZChlbGVtZW50KCdpbWcnLCAnJywge3NyYzogb3B0aW9uLmltYWdlLCBhbHQ6ICcnLCBsb2FkaW5nOiAnbGF6eSd9KSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9uLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gZWxlbWVudCgnc3BhbicsICdybXZhcmlhbnRzX19jb2xvcicpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvci5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1ybS1zd2F0Y2gnLCBvcHRpb24uY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kKGNvbG9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgYnV0dG9uLmFwcGVuZCh0ZXh0KG9wdGlvbi5sYWJlbCkpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXBwZW5kKGJ1dHRvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZWxkc2V0LmFwcGVuZChsZWdlbmQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChmaWVsZHNldCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKGVsZW1lbnQoJ2RpdicsICdybXZhcmlhbnRzX19zdGF0dXMgdWstdGV4dC1zbWFsbCcsIHsnYXJpYS1saXZlJzogJ3BvbGl0ZSd9KSk7XG5cbiAgICAgICAgbmV3IFZhcmlhbnRQaWNrZXIoY29udGFpbmVyLCBkYXRhLCAoc2VsZWN0ZWQpID0+IHRoaXMudXBkYXRlUHJvZHVjdChzZWxlY3RlZCkpLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICByZW5kZXJDYXJ0KHByb2R1Y3QpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZWxlbWVudCgnZGl2JywgJ3JtcXVpY2t2aWV3X19jYXJ0IHVrLWZsZXggdWstZmxleC1taWRkbGUgdWstZmxleC13cmFwIHVrLW1hcmdpbi10b3AnKTtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBlbGVtZW50KCdpbnB1dCcsICd1ay1pbnB1dCB1ay1mb3JtLXdpZHRoLXhzbWFsbCcsIHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLCB2YWx1ZTogcHJvZHVjdC5xdWFudGl0eT8ubWluIHx8IDEsIG1pbjogcHJvZHVjdC5xdWFudGl0eT8ubWluIHx8IDEsIHN0ZXA6IHByb2R1Y3QucXVhbnRpdHk/LnN0ZXAgfHwgMSxcbiAgICAgICAgICAgIG1heDogcHJvZHVjdC5xdWFudGl0eT8ubWF4LCAnYXJpYS1sYWJlbCc6IHRyYW5zbGF0ZSgnUExHX1lURFlOQU1JQ1NfUVVBTlRJVFknLCBsYWJlbHMucXVhbnRpdHkpXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtZW50KCdidXR0b24nLCAndWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5Jywge3R5cGU6ICdidXR0b24nfSk7XG4gICAgICAgIGJ1dHRvbi5hcHBlbmQodGV4dCh0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9DQVJUX0FERCcsIGxhYmVscy5hZGRUb0NhcnQpKSk7XG4gICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICFwcm9kdWN0LmluU3RvY2s7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0ICYmIHRoaXMucHJvZHVjdD8uaWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KCkuYWRkUHJvZHVjdChOdW1iZXIodGhpcy5wcm9kdWN0LmlkKSwgTnVtYmVyKHF1YW50aXR5LnZhbHVlKSB8fCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJvdy5hcHBlbmQocXVhbnRpdHksIGJ1dHRvbik7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvZHVjdChwcm9kdWN0KSB7XG4gICAgICAgIHRoaXMucHJvZHVjdCA9IHsuLi50aGlzLnByb2R1Y3QsIC4uLnByb2R1Y3R9O1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2JvZHknKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fdGl0bGUgYScpO1xuICAgICAgICBjb25zdCBwcmljZSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19wcmljZScpO1xuICAgICAgICBjb25zdCBzdG9jayA9IGJvZHkucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tc3RvY2tdJyk7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5ybXF1aWNrdmlld19fY29kZScpO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19kZXNjcmlwdGlvbicpO1xuICAgICAgICBjb25zdCBjYXJ0ID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX2NhcnQgLnVrLWJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9kdWN0LnRpdGxlO1xuICAgICAgICAgICAgdGl0bGUuaHJlZiA9IHByb2R1Y3QubGluaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpY2UpIHtcbiAgICAgICAgICAgIHByaWNlLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QucHJpY2U/LmRpc2NvdW50RW5hYmxlZCAmJiBwcm9kdWN0LnByaWNlLmJhc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRQcmljZSA9IGVsZW1lbnQoJ3MnLCAndWstdGV4dC1tdXRlZCB1ay1tYXJnaW4tc21hbGwtcmlnaHQnKTtcbiAgICAgICAgICAgICAgICBvbGRQcmljZS5hcHBlbmQodGV4dChwcm9kdWN0LnByaWNlLmJhc2UpKTtcbiAgICAgICAgICAgICAgICBwcmljZS5hcHBlbmQob2xkUHJpY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmluYWxQcmljZSA9IGVsZW1lbnQoJ3NwYW4nLCAnJywgeydkYXRhLXJtLXByaWNlJzogdHJ1ZX0pO1xuICAgICAgICAgICAgZmluYWxQcmljZS5hcHBlbmQodGV4dChwcm9kdWN0LnByaWNlPy5maW5hbCkpO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kKGZpbmFsUHJpY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlKSBjb2RlLnRleHRDb250ZW50ID0gcHJvZHVjdC5jb2RlIHx8ICcnO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb24pIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvZHVjdC5pbnRyb3RleHQgfHwgJyc7XG4gICAgICAgIGlmIChzdG9jaykge1xuICAgICAgICAgICAgc3RvY2sudGV4dENvbnRlbnQgPSBwcm9kdWN0LmluU3RvY2tcbiAgICAgICAgICAgICAgICA/IHRyYW5zbGF0ZSgnQ09NX1JBRElDQUxNQVJUX0lOX1NUT0NLJywgbGFiZWxzLmluU3RvY2spXG4gICAgICAgICAgICAgICAgOiB0cmFuc2xhdGUoJ0NPTV9SQURJQ0FMTUFSVF9OT1RfSU5fU1RPQ0snLCBsYWJlbHMub3V0T2ZTdG9jayk7XG4gICAgICAgICAgICBzdG9jay5jbGFzc0xpc3QudG9nZ2xlKCd1ay10ZXh0LXN1Y2Nlc3MnLCBwcm9kdWN0LmluU3RvY2spO1xuICAgICAgICAgICAgc3RvY2suY2xhc3NMaXN0LnRvZ2dsZSgndWstdGV4dC1tdXRlZCcsICFwcm9kdWN0LmluU3RvY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJ0KSBjYXJ0LmRpc2FibGVkID0gIXByb2R1Y3QuaW5TdG9jaztcblxuICAgICAgICBjb25zdCBtZWRpYSA9IGJvZHkucXVlcnlTZWxlY3RvcignLnJtcXVpY2t2aWV3X19tZWRpYScpO1xuICAgICAgICBpZiAobWVkaWEpIG1lZGlhLnJlcGxhY2VXaXRoKHRoaXMucmVuZGVyTWVkaWEocHJvZHVjdC5tZWRpYSB8fCBbXSkpO1xuICAgICAgICBjb25zdCBtb3JlID0gYm9keS5xdWVyeVNlbGVjdG9yKCcucm1xdWlja3ZpZXdfX21vcmUnKTtcbiAgICAgICAgaWYgKG1vcmUpIG1vcmUuaHJlZiA9IHByb2R1Y3QubGluaztcbiAgICB9XG59XG5cbmNvbnN0IHF1aWNrVmlldyA9IG5ldyBRdWlja1ZpZXcoKTtcblxuY29uc3QgaW5pdCA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXZhcmlhbnRzXScpKSBuZXcgVmFyaWFudFBpY2tlcihyb290KS5pbml0KCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXZhcmlhbnRzXScpLmZvckVhY2goKGNvbnRhaW5lcikgPT4gbmV3IFZhcmlhbnRQaWNrZXIoY29udGFpbmVyKS5pbml0KCkpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXJtLXF1aWNrLXZpZXddJyk7XG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHF1aWNrVmlldy5vcGVuKHRyaWdnZXIpO1xuICAgIH1cbn0sIHRydWUpO1xuXG4vLyBSYWRpY2FsTWFydCBiaW5kcyB0aGUgcHJvZHVjdCBpZCBpbnRvIGl0cyBvcmlnaW5hbCBjbGljayBjbG9zdXJlLiBJbnRlcmNlcHRcbi8vIG9ubHkgY2FydHMgZXhwbGljaXRseSB1cGRhdGVkIGJ5IFJNIFZhcmlhbnRzLCBzbyB0aGUgY3VycmVudCBpZCBpcyByZXNwZWN0ZWQuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGFkZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cImFkZFwiXScpO1xuICAgIGNvbnN0IGNhcnQgPSBhZGQ/LmNsb3Nlc3QoJ1tyYWRpY2FsbWFydC1jYXJ0PVwicHJvZHVjdFwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInByb2R1Y3RcIl0nKTtcbiAgICBpZiAoIWFkZCB8fCAhY2FydD8uZGF0YXNldC5ybUR5bmFtaWNQcm9kdWN0IHx8ICF3aW5kb3cuUmFkaWNhbE1hcnRDYXJ0KSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGNhcnQucXVlcnlTZWxlY3RvcignW3JhZGljYWxtYXJ0LWNhcnQ9XCJxdWFudGl0eVwiXSwgW2RhdGEtcmFkaWNhbG1hcnQtY2FydD1cInF1YW50aXR5XCJdJyk7XG4gICAgd2luZG93LlJhZGljYWxNYXJ0Q2FydCgpLmFkZFByb2R1Y3QoTnVtYmVyKGNhcnQuZGF0YXNldC5pZCksIE51bWJlcihxdWFudGl0eT8udmFsdWUpIHx8IDEpO1xufSwgdHJ1ZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiBpbml0KCkpO1xubmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4gbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIGluaXQobm9kZSk7XG59KSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4iXSwibmFtZXMiOlsidGV4dCIsInZhbHVlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImxhYmVscyIsImRvY3VtZW50RWxlbWVudCIsImxhbmciLCJ0b0xvd2VyQ2FzZSIsInN0YXJ0c1dpdGgiLCJsb2FkaW5nIiwiZXJyb3IiLCJpblN0b2NrIiwib3V0T2ZTdG9jayIsInF1YW50aXR5IiwiYWRkVG9DYXJ0IiwiZGV0YWlscyIsInF1aWNrVmlldyIsIm5vSW1hZ2UiLCJ0cmFuc2xhdGUiLCJrZXkiLCJmYWxsYmFjayIsInRyYW5zbGF0ZWQiLCJ3aW5kb3ciLCJKb29tbGEiLCJUZXh0IiwiXyIsImVsZW1lbnQiLCJ0YWciLCJjbGFzc05hbWUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJhdHRyaWJ1dGVzIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsIl9yZWYiLCJuYW1lIiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwicmVxdWVzdFByb2R1Y3QiLCJlbmRwb2ludCIsInRhc2siLCJwcm9kdWN0SWQiLCJzaWduYWwiLCJ1cmwiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJzZWFyY2hQYXJhbXMiLCJzZXQiLCJyZXNwb25zZSIsImZldGNoIiwidG9TdHJpbmciLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJwYXlsb2FkIiwianNvbiIsIm9rIiwic3VjY2VzcyIsIkVycm9yIiwibWVzc2FnZSIsInN0YXR1cyIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJpZCIsInJlcXVlc3RRdWlja1ZpZXdMYXlvdXQiLCJ0ZW1wbGF0ZUlkIiwiaHRtbCIsIlZhcmlhbnRQaWNrZXIiLCJjb25zdHJ1Y3RvciIsImNvbnRhaW5lciIsIm9uUHJvZHVjdCIsInJlYWREYXRhIiwic2VsZWN0ZWQiLCJwZW5kaW5nIiwiY3VycmVudCIsInByb2R1Y3RzIiwiZmluZCIsInByb2R1Y3QiLCJOdW1iZXIiLCJjdXJyZW50UHJvZHVjdCIsInZpc2libGVGaWVsZHMiLCJTZXQiLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsImFsaWFzIiwiZnJvbUVudHJpZXMiLCJmaWx0ZXIiLCJfcmVmMiIsImhhcyIsIkpTT04iLCJwYXJzZSIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImluaXQiLCJkYXRhc2V0Iiwicm1WYXJpYW50c1JlYWR5IiwiZGlzcGxheU1vZGUiLCJzY29wZSIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJybUhvdmVyQnJlYWtwb2ludCIsImhvdmVyQnJlYWtwb2ludCIsImFwcGVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9wdGlvbiIsInRhcmdldCIsImRpc2FibGVkIiwic2VsZWN0Iiwicm1GaWVsZCIsInJtVmFsdWUiLCJyZW5kZXJTdGF0ZSIsIndhbnRlZCIsIml0ZW0iLCJtYXRjaGVzIiwiYWN0aW9uIiwiYXNzaWduIiwibGluayIsImxvYWRQcm9kdWN0Iiwic2VsZWN0aW9uIiwiZXZlcnkiLCJfcmVmMyIsImRpc2FibGVVbmF2YWlsYWJsZSIsIndyYXBwZXIiLCJDU1MiLCJlc2NhcGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWN0aXZlIiwiYXZhaWxhYmxlIiwiaXNBdmFpbGFibGUiLCJ0b2dnbGUiLCJmcm9tIiwib3B0aW9ucyIsIm90aGVyRmllbGRzIiwiX3JlZjQiLCJzb21lIiwiX3JlZjUiLCJhYm9ydCIsIkFib3J0Q29udHJvbGxlciIsImNvbnRyb2xsZXIiLCJmdWxsIiwiYXBwbHlQcm9kdWN0IiwicmVtb3ZlIiwiY2FydCIsInJtRHluYW1pY1Byb2R1Y3QiLCJ1cGRhdGVVcmwiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwic3RhdGUiLCJybVByb2R1Y3RJZCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1YmJsZXMiLCJkZXRhaWwiLCJRdWlja1ZpZXciLCJjYWNoZSIsIk1hcCIsIm1vZGFsIiwic2V0dGluZ3MiLCJidWlsZGVyQ29udGV4dCIsIm9wZW4iLCJ0cmlnZ2VyIiwicm1RdWlja1ZpZXciLCJlbnN1cmVNb2RhbCIsInNob3ciLCJzZXRMb2FkaW5nIiwiY29udGVudE1vZGUiLCJsYXlvdXQiLCJnZXQiLCJyZW5kZXJCdWlsZGVyQ29udGVudCIsInJlbmRlciIsInJlbmRlckVycm9yIiwiaW5uZXJIVE1MIiwibG9hZEJ1aWxkZXJQcm9kdWN0IiwiYm9keSIsImFwcGVuZENoaWxkIiwibW9kYWxTaXplIiwiVUlraXQiLCJzdHlsZSIsImRpc3BsYXkiLCJyZXBsYWNlQ2hpbGRyZW4iLCJhbGVydCIsImNvbnRleHQiLCJmcmFnbWVudCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwidXBkYXRlIiwiUmFkaWNhbE1hcnRDYXJ0IiwibG9hZEFjdGlvbnMiLCJtZWRpYUNvbHVtbiIsImNvbnRlbnRDb2x1bW4iLCJyZW5kZXJNZWRpYSIsIm1lZGlhIiwicmVuZGVyQ29udGVudCIsIm1haW4iLCJ0eXBlIiwiaW1hZ2UiLCJwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVySWNvbiIsInBsYWNlaG9sZGVyVGV4dCIsIml0ZW1zIiwic3JjIiwiYWx0IiwidGl0bGUiLCJpbmRleCIsInJlbW92ZUF0dHJpYnV0ZSIsImhpZGRlbiIsIkJvb2xlYW4iLCJ0aHVtYiIsInRodW1iSW5kZXgiLCJsaWdodGJveFBhbmVsIiwic291cmNlIiwiY2FwdGlvbiIsInRodW1icyIsImJ1dHRvbiIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJzaG93Q29kZSIsImNvZGUiLCJwcmljZSIsImRpc2NvdW50RW5hYmxlZCIsImJhc2UiLCJvbGRQcmljZSIsImZpbmFsUHJpY2UiLCJmaW5hbCIsInN0b2NrIiwic2hvd0Rlc2NyaXB0aW9uIiwiaW50cm90ZXh0IiwiZGVzY3JpcHRpb24iLCJzaG93VmFyaWFudHMiLCJ2YXJpYW50cyIsInJlbmRlclZhcmlhbnRzIiwic2hvd0NhcnQiLCJyZW5kZXJDYXJ0IiwibW9yZSIsImZpZWxkc2V0IiwibGVnZW5kIiwicm9sZSIsInN3YXRjaCIsImNvbG9yIiwibGFiZWwiLCJzZXRQcm9wZXJ0eSIsInVwZGF0ZVByb2R1Y3QiLCJyb3ciLCJtaW4iLCJzdGVwIiwibWF4IiwiYWRkUHJvZHVjdCIsInJlcGxhY2VXaXRoIiwicm9vdCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm11dGF0aW9uIiwiYWRkZWROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIl0sInNvdXJjZVJvb3QiOiIifQ==