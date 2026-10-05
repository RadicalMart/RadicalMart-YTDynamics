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

/***/ "./src/catalog-navigation.scss"
/*!*************************************!*\
  !*** ./src/catalog-navigation.scss ***!
  \*************************************/
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
/*!************************************!*\
  !*** ./src/catalog-navigation.es6 ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _catalog_navigation_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog-navigation.scss */ "./src/catalog-navigation.scss");
/* harmony import */ var _catalog_navigation_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_catalog_navigation_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


const filterItems = filter => filter.querySelectorAll('.accordion-item, .uk-accordion-default > li');
const itemButton = item => item.querySelector('.accordion-button, .uk-accordion-title');
const itemContent = item => item.querySelector('.accordion-collapse, .uk-accordion-content');
const itemInputs = item => Array.from(itemContent(item)?.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([data-rm-price-range-control]), select, textarea') || []);
const desktopDrops = new WeakMap();
const mobileAccordions = new WeakMap();
const destroyComponent = component => {
  try {
    component?.$destroy?.(false);
  } catch (error) {
    // The source filter may have been replaced by RadicalMart already.
  }
};
const destroyDesktopDrops = filter => {
  filterItems(filter).forEach(item => {
    destroyComponent(desktopDrops.get(item));
    desktopDrops.delete(item);
    item.classList.remove('is-open');
  });
};
const alignDesktopDrop = (item, content) => {
  const itemRect = item.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const viewportInset = 20;
  const overflowRight = itemRect.left + contentRect.width - (window.innerWidth - viewportInset);
  const minimumShift = viewportInset - itemRect.left;
  const shift = Math.max(minimumShift, Math.min(0, -overflowRight));
  content.style.setProperty('--rm-filter-drop-shift', `${Math.round(shift)}px`);
};
const setupDesktopDrops = filter => {
  if (!window.UIkit?.drop) return;
  filterItems(filter).forEach(item => {
    const button = itemButton(item);
    const content = itemContent(item);
    if (!button || !content || desktopDrops.has(item)) return;
    const drop = window.UIkit.drop(content, {
      toggle: button,
      mode: 'click',
      pos: 'bottom-left',
      offset: 8,
      flip: true,
      shift: true,
      container: false
    });
    content.addEventListener('show', () => {
      item.classList.add('is-open');
      window.requestAnimationFrame(() => alignDesktopDrop(item, content));
    });
    content.addEventListener('shown', () => alignDesktopDrop(item, content));
    content.addEventListener('hide', () => item.classList.remove('is-open'));
    desktopDrops.set(item, drop);
  });
};
const setupMobileAccordion = filter => {
  if (!window.UIkit?.accordion) return;
  filter.querySelectorAll('.uk-accordion-default').forEach(accordion => {
    if (mobileAccordions.has(accordion)) return;
    accordion.setAttribute('uk-accordion', 'multiple: true; collapsible: true');
    mobileAccordions.set(accordion, window.UIkit.accordion(accordion, {
      multiple: true,
      collapsible: true
    }));
  });
};
const destroyMobileAccordions = filter => {
  filter.querySelectorAll('.uk-accordion-default').forEach(accordion => {
    destroyComponent(mobileAccordions.get(accordion));
    mobileAccordions.delete(accordion);
    accordion.removeAttribute('uk-accordion');
  });
};
const parseNumber = value => {
  const normalized = String(value || '').replace(/[^0-9,.-]/g, '').replace(',', '.');
  const number = Number.parseFloat(normalized);
  return Number.isFinite(number) ? number : null;
};
const enhancePriceRange = filter => {
  filter.querySelectorAll('.radicalmart-input-filter-price').forEach(price => {
    if (price.dataset.rmPriceRangeReady === 'true') return;
    const fields = Array.from(price.querySelectorAll('input[type="text"], input:not([type])')).slice(0, 2);
    if (fields.length !== 2) return;
    const hintedMin = parseNumber(fields[0].placeholder);
    const hintedMax = parseNumber(fields[1].placeholder);
    const currentMin = parseNumber(fields[0].value);
    const currentMax = parseNumber(fields[1].value);
    const minimum = hintedMin ?? currentMin ?? 0;
    const maximum = Math.max(minimum + 1, hintedMax ?? currentMax ?? minimum + 1000);
    const step = maximum - minimum > 100000 ? 100 : maximum - minimum > 10000 ? 10 : 1;
    const range = document.createElement('div');
    range.className = 'rm-filter__price-range';
    range.innerHTML = `
            <div class="rm-filter__price-track" aria-hidden="true"><span></span></div>
            <input type="range" min="${minimum}" max="${maximum}" step="${step}" data-rm-price-range-control="from" aria-label="${fields[0].closest('.input-group')?.querySelector('label')?.textContent.trim() || 'От'}">
            <input type="range" min="${minimum}" max="${maximum}" step="${step}" data-rm-price-range-control="to" aria-label="${fields[1].closest('.input-group')?.querySelector('label')?.textContent.trim() || 'До'}">
        `;
    const clearControl = price.querySelector('.text-end, .uk-text-right');
    if (clearControl) clearControl.before(range);else price.append(range);
    const fromRange = range.querySelector('[data-rm-price-range-control="from"]');
    const toRange = range.querySelector('[data-rm-price-range-control="to"]');
    const fill = range.querySelector('.rm-filter__price-track span');
    const draw = () => {
      const from = Number(fromRange.value);
      const to = Number(toRange.value);
      const span = maximum - minimum;
      fill.style.left = `${(from - minimum) / span * 100}%`;
      fill.style.right = `${100 - (to - minimum) / span * 100}%`;
    };
    const syncRangesFromFields = () => {
      const from = parseNumber(fields[0].value) ?? minimum;
      const to = parseNumber(fields[1].value) ?? maximum;
      fromRange.value = String(Math.min(Math.max(from, minimum), Number(toRange.value || maximum)));
      toRange.value = String(Math.max(Math.min(to, maximum), Number(fromRange.value || minimum)));
      draw();
    };
    const syncFieldsFromRanges = changed => {
      if (changed === fromRange && Number(fromRange.value) > Number(toRange.value) - step) {
        fromRange.value = String(Math.max(minimum, Number(toRange.value) - step));
      }
      if (changed === toRange && Number(toRange.value) < Number(fromRange.value) + step) {
        toRange.value = String(Math.min(maximum, Number(fromRange.value) + step));
      }
      fields[0].value = fromRange.value;
      fields[1].value = toRange.value;
      draw();
    };
    fields.forEach(field => field.addEventListener('input', syncRangesFromFields));
    [fromRange, toRange].forEach(control => control.addEventListener('input', () => syncFieldsFromRanges(control)));
    fromRange.value = String(currentMin ?? minimum);
    toRange.value = String(currentMax ?? maximum);
    draw();
    price.dataset.rmPriceRangeReady = 'true';
  });
};
const inputIsActive = input => {
  if (input.type === 'checkbox' || input.type === 'radio') return input.checked;
  if (!input.name) return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has(input.name)) return params.getAll(input.name).some(value => value !== '');
  if (input instanceof HTMLSelectElement) {
    return Array.from(input.selectedOptions).some(option => option.value !== '');
  }
  return input.value !== '' && input.value !== input.defaultValue;
};
const updateFilterCounts = filter => {
  filterItems(filter).forEach(item => {
    const button = itemButton(item);
    if (!button) return;
    const count = itemInputs(item).filter(inputIsActive).length;
    item.classList.toggle('is-filtered', count > 0);
    let badge = button.querySelector('.rm-filter__count');
    if (filter.dataset.showActiveCount !== 'true') {
      badge?.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'rm-filter__count';
      button.append(badge);
    }
    badge.textContent = count ? String(count) : '';
    badge.hidden = count === 0;
  });
};
const omitEmptyFormControls = form => {
  const controls = Array.from(form.querySelectorAll('input[name], select[name], textarea[name]')).filter(control => {
    if (control.disabled || control.type === 'submit' || control.type === 'button') return false;
    if (control.type === 'checkbox' || control.type === 'radio') return !control.checked;
    return String(control.value || '').trim() === '';
  });
  controls.forEach(control => {
    control.disabled = true;
  });
  window.setTimeout(() => controls.forEach(control => {
    control.disabled = false;
  }), 0);
};
const closeFilterItems = function (filter) {
  let except = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  filter.querySelectorAll('.accordion-item.is-open, .uk-accordion-default > li.is-open').forEach(item => {
    if (item === except) return;
    const drop = desktopDrops.get(item);
    if (drop) {
      drop.hide?.(false);
      return;
    }
    item.classList.remove('is-open');
    itemButton(item)?.setAttribute('aria-expanded', 'false');
    itemContent(item)?.setAttribute('aria-hidden', 'true');
  });
};
const setFilterMode = (filter, desktop) => {
  filter.classList.toggle('rm-filter--desktop', desktop);
  filter.classList.toggle('rm-filter--mobile', !desktop);
  closeFilterItems(filter);
  if (desktop) {
    destroyMobileAccordions(filter);
    setupDesktopDrops(filter);
  } else {
    destroyDesktopDrops(filter);
  }
  filter.querySelectorAll('.accordion-collapse, .uk-accordion-content').forEach(collapse => {
    collapse.style.removeProperty('height');
    collapse.style.removeProperty('display');
    collapse.classList.remove('collapsing');
    const expanded = collapse.classList.contains('show') || collapse.closest('li')?.classList.contains('uk-open');
    collapse.setAttribute('aria-hidden', desktop ? 'true' : expanded ? 'false' : 'true');
  });
  if (!desktop && filter.dataset.rmMobilePrepared !== 'true') {
    filter.dataset.rmMobilePrepared = 'true';
    const initial = filter.dataset.mobileInitialOpen || 'first';
    if (initial !== 'module') {
      const items = Array.from(filterItems(filter));
      const activeItems = items.filter(item => itemInputs(item).some(inputIsActive));
      const openItems = initial === 'active' && activeItems.length ? activeItems : initial === 'first' && items.length ? [items[0]] : [];
      items.forEach(item => {
        const open = openItems.includes(item);
        item.classList.toggle('uk-open', open);
        item.classList.toggle('show', open);
        itemButton(item)?.setAttribute('aria-expanded', open ? 'true' : 'false');
        const content = itemContent(item);
        if (content) {
          content.hidden = !open;
          content.setAttribute('aria-hidden', open ? 'false' : 'true');
        }
      });
    }
  }
  if (!desktop) setupMobileAccordion(filter);
};
const initFilter = filter => {
  if (filter.dataset.rmFilterReady === 'true') return;
  filter.dataset.rmFilterReady = 'true';
  enhancePriceRange(filter);
  filter.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => omitEmptyFormControls(form));
  });
  const presentation = filter.dataset.presentation || 'responsive';
  const breakpoint = Math.max(640, Number(filter.dataset.breakpoint) || 960);
  const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
  const desktopMode = () => presentation === 'dropdown' || presentation === 'responsive' && media.matches;
  const applyMode = () => setFilterMode(filter, desktopMode());
  applyMode();
  media.addEventListener?.('change', applyMode);
  filter.addEventListener('click', event => {
    const button = event.target.closest('.accordion-button, .uk-accordion-title');
    if (!button || !filter.contains(button) || !desktopMode()) return;
    const item = button.closest('.accordion-item, .uk-accordion-default > li');
    if (desktopDrops.has(item)) return;
    event.preventDefault();
    event.stopPropagation();
    const willOpen = !item.classList.contains('is-open');
    closeFilterItems(filter, willOpen ? item : null);
    item.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    itemContent(item)?.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
  }, true);
  let submitTimer = null;
  filter.addEventListener('change', event => {
    if (!event.target.closest('form')) return;
    updateFilterCounts(filter);
    if (desktopMode() && filter.dataset.closeOnChange === 'true') closeFilterItems(filter);
    if (filter.dataset.autoSubmit !== 'true') return;
    window.clearTimeout(submitTimer);
    submitTimer = window.setTimeout(() => event.target.closest('form')?.requestSubmit(), Math.max(0, Number(filter.dataset.autoSubmitDelay) || 0));
  });
  updateFilterCounts(filter);
};
const showCatalogPanel = (menu, panelId) => {
  const target = menu.querySelector(`[data-rm-catalog-panel="${CSS.escape(String(panelId))}"]`);
  if (!target) return;
  menu.querySelectorAll('[data-rm-catalog-panel]').forEach(panel => {
    const active = panel === target;
    panel.classList.toggle('is-active', active);
    panel.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
  target.querySelector('.rm-catalog-menu__back, .rm-catalog-menu__link, .rm-catalog-menu__forward')?.focus({
    preventScroll: true
  });
  menu.dispatchEvent(new CustomEvent('rm:catalog-panel-change', {
    detail: {
      panelId
    }
  }));
};
const initCatalogMenu = menu => {
  if (menu.dataset.rmCatalogMenuReady === 'true') return;
  menu.dataset.rmCatalogMenuReady = 'true';
  menu.addEventListener('click', event => {
    const forward = event.target.closest('[data-rm-catalog-forward]');
    const back = event.target.closest('[data-rm-catalog-back]');
    if (!forward && !back) return;
    event.preventDefault();
    showCatalogPanel(menu, (forward || back).dataset[forward ? 'rmCatalogForward' : 'rmCatalogBack']);
  });
  showCatalogPanel(menu, menu.dataset.initialPanel || 1);
};
const initAll = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('[data-rm-filter]')) initFilter(root);
  root.querySelectorAll?.('[data-rm-filter]').forEach(initFilter);
  if (root.matches?.('[data-rm-catalog-menu]')) initCatalogMenu(root);
  root.querySelectorAll?.('[data-rm-catalog-menu]').forEach(initCatalogMenu);
};
const start = () => {
  initAll();
  document.addEventListener('click', event => {
    document.querySelectorAll('[data-rm-filter].rm-filter--desktop').forEach(filter => {
      if (!filter.contains(event.target)) closeFilterItems(filter);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('[data-rm-filter].rm-filter--desktop').forEach(filter => closeFilterItems(filter));
  });
  document.addEventListener('onRadicalMartFilterAfterAjax', () => {
    document.querySelectorAll('[data-rm-filter]').forEach(filter => {
      filter.dataset.rmFilterReady = 'false';
      initFilter(filter);
    });
  });
  (0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(initAll);
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, {
    once: true
  });
} else {
  start();
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aWNzLy4vc3JjL3J1bnRpbWUuZXM2Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9jYXRhbG9nLW5hdmlnYXRpb24uc2NzcyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2NhdGFsb2ctbmF2aWdhdGlvbi5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUlVOVElNRV9LRVkgPSAnX19ZVER5bmFtaWNzRG9tUnVudGltZSc7XG5cbmNvbnN0IHJ1bnRpbWUgPSB3aW5kb3dbUlVOVElNRV9LRVldIHx8IHtcbiAgICBhZGRlZDogbmV3IFNldCgpLFxuICAgIHJlbW92ZWQ6IG5ldyBTZXQoKSxcbiAgICBvYnNlcnZlcjogbnVsbCxcbn07XG5cbndpbmRvd1tSVU5USU1FX0tFWV0gPSBydW50aW1lO1xuXG5jb25zdCB2aXNpdCA9IChjYWxsYmFja3MsIG5vZGUpID0+IGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobm9kZSkpO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpZiAocnVudGltZS5vYnNlcnZlciB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XG5cbiAgICBydW50aW1lLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLmFkZGVkLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHZpc2l0KHJ1bnRpbWUucmVtb3ZlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcnVudGltZS5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9ic2VydmVEeW5hbWljQ29udGVudCA9IChvbkFkZGVkLCBvblJlbW92ZWQgPSBudWxsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmFkZChvbkFkZGVkKTtcbiAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmFkZChvblJlbW92ZWQpO1xuICAgIHN0YXJ0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUuYWRkZWQuZGVsZXRlKG9uQWRkZWQpO1xuICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmRlbGV0ZShvblJlbW92ZWQpO1xuICAgIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2NhdGFsb2ctbmF2aWdhdGlvbi5zY3NzJztcbmltcG9ydCB7b2JzZXJ2ZUR5bmFtaWNDb250ZW50fSBmcm9tICcuL3J1bnRpbWUuZXM2JztcblxuY29uc3QgZmlsdGVySXRlbXMgPSAoZmlsdGVyKSA9PiBmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbi1pdGVtLCAudWstYWNjb3JkaW9uLWRlZmF1bHQgPiBsaScpO1xuY29uc3QgaXRlbUJ1dHRvbiA9IChpdGVtKSA9PiBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb24tYnV0dG9uLCAudWstYWNjb3JkaW9uLXRpdGxlJyk7XG5jb25zdCBpdGVtQ29udGVudCA9IChpdGVtKSA9PiBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb24tY29sbGFwc2UsIC51ay1hY2NvcmRpb24tY29udGVudCcpO1xuY29uc3QgaXRlbUlucHV0cyA9IChpdGVtKSA9PiBBcnJheS5mcm9tKGl0ZW1Db250ZW50KGl0ZW0pPy5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdpbnB1dDpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbdHlwZT1cInN1Ym1pdFwiXSk6bm90KFtkYXRhLXJtLXByaWNlLXJhbmdlLWNvbnRyb2xdKSwgc2VsZWN0LCB0ZXh0YXJlYSdcbikgfHwgW10pO1xuY29uc3QgZGVza3RvcERyb3BzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IG1vYmlsZUFjY29yZGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBkZXN0cm95Q29tcG9uZW50ID0gKGNvbXBvbmVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbXBvbmVudD8uJGRlc3Ryb3k/LihmYWxzZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gVGhlIHNvdXJjZSBmaWx0ZXIgbWF5IGhhdmUgYmVlbiByZXBsYWNlZCBieSBSYWRpY2FsTWFydCBhbHJlYWR5LlxuICAgIH1cbn07XG5cbmNvbnN0IGRlc3Ryb3lEZXNrdG9wRHJvcHMgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVySXRlbXMoZmlsdGVyKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGRlc3Ryb3lDb21wb25lbnQoZGVza3RvcERyb3BzLmdldChpdGVtKSk7XG4gICAgICAgIGRlc2t0b3BEcm9wcy5kZWxldGUoaXRlbSk7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgIH0pO1xufTtcblxuY29uc3QgYWxpZ25EZXNrdG9wRHJvcCA9IChpdGVtLCBjb250ZW50KSA9PiB7XG4gICAgY29uc3QgaXRlbVJlY3QgPSBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWN0ID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydEluc2V0ID0gMjA7XG4gICAgY29uc3Qgb3ZlcmZsb3dSaWdodCA9IGl0ZW1SZWN0LmxlZnQgKyBjb250ZW50UmVjdC53aWR0aCAtICh3aW5kb3cuaW5uZXJXaWR0aCAtIHZpZXdwb3J0SW5zZXQpO1xuICAgIGNvbnN0IG1pbmltdW1TaGlmdCA9IHZpZXdwb3J0SW5zZXQgLSBpdGVtUmVjdC5sZWZ0O1xuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5tYXgobWluaW11bVNoaWZ0LCBNYXRoLm1pbigwLCAtb3ZlcmZsb3dSaWdodCkpO1xuICAgIGNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tcm0tZmlsdGVyLWRyb3Atc2hpZnQnLCBgJHtNYXRoLnJvdW5kKHNoaWZ0KX1weGApO1xufTtcblxuY29uc3Qgc2V0dXBEZXNrdG9wRHJvcHMgPSAoZmlsdGVyKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuVUlraXQ/LmRyb3ApIHJldHVybjtcblxuICAgIGZpbHRlckl0ZW1zKGZpbHRlcikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBpdGVtQnV0dG9uKGl0ZW0pO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbUNvbnRlbnQoaXRlbSk7XG4gICAgICAgIGlmICghYnV0dG9uIHx8ICFjb250ZW50IHx8IGRlc2t0b3BEcm9wcy5oYXMoaXRlbSkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBkcm9wID0gd2luZG93LlVJa2l0LmRyb3AoY29udGVudCwge1xuICAgICAgICAgICAgdG9nZ2xlOiBidXR0b24sXG4gICAgICAgICAgICBtb2RlOiAnY2xpY2snLFxuICAgICAgICAgICAgcG9zOiAnYm90dG9tLWxlZnQnLFxuICAgICAgICAgICAgb2Zmc2V0OiA4LFxuICAgICAgICAgICAgZmxpcDogdHJ1ZSxcbiAgICAgICAgICAgIHNoaWZ0OiB0cnVlLFxuICAgICAgICAgICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2hvdycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbGlnbkRlc2t0b3BEcm9wKGl0ZW0sIGNvbnRlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2hvd24nLCAoKSA9PiBhbGlnbkRlc2t0b3BEcm9wKGl0ZW0sIGNvbnRlbnQpKTtcbiAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdoaWRlJywgKCkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJykpO1xuICAgICAgICBkZXNrdG9wRHJvcHMuc2V0KGl0ZW0sIGRyb3ApO1xuICAgIH0pO1xufTtcblxuY29uc3Qgc2V0dXBNb2JpbGVBY2NvcmRpb24gPSAoZmlsdGVyKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuVUlraXQ/LmFjY29yZGlvbikgcmV0dXJuO1xuICAgIGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCcudWstYWNjb3JkaW9uLWRlZmF1bHQnKS5mb3JFYWNoKChhY2NvcmRpb24pID0+IHtcbiAgICAgICAgaWYgKG1vYmlsZUFjY29yZGlvbnMuaGFzKGFjY29yZGlvbikpIHJldHVybjtcbiAgICAgICAgYWNjb3JkaW9uLnNldEF0dHJpYnV0ZSgndWstYWNjb3JkaW9uJywgJ211bHRpcGxlOiB0cnVlOyBjb2xsYXBzaWJsZTogdHJ1ZScpO1xuICAgICAgICBtb2JpbGVBY2NvcmRpb25zLnNldChhY2NvcmRpb24sIHdpbmRvdy5VSWtpdC5hY2NvcmRpb24oYWNjb3JkaW9uLCB7bXVsdGlwbGU6IHRydWUsIGNvbGxhcHNpYmxlOiB0cnVlfSkpO1xuICAgIH0pO1xufTtcblxuY29uc3QgZGVzdHJveU1vYmlsZUFjY29yZGlvbnMgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy51ay1hY2NvcmRpb24tZGVmYXVsdCcpLmZvckVhY2goKGFjY29yZGlvbikgPT4ge1xuICAgICAgICBkZXN0cm95Q29tcG9uZW50KG1vYmlsZUFjY29yZGlvbnMuZ2V0KGFjY29yZGlvbikpO1xuICAgICAgICBtb2JpbGVBY2NvcmRpb25zLmRlbGV0ZShhY2NvcmRpb24pO1xuICAgICAgICBhY2NvcmRpb24ucmVtb3ZlQXR0cmlidXRlKCd1ay1hY2NvcmRpb24nKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHBhcnNlTnVtYmVyID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCAnJykucmVwbGFjZSgvW14wLTksLi1dL2csICcnKS5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIucGFyc2VGbG9hdChub3JtYWxpemVkKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKG51bWJlcikgPyBudW1iZXIgOiBudWxsO1xufTtcblxuY29uc3QgZW5oYW5jZVByaWNlUmFuZ2UgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYWRpY2FsbWFydC1pbnB1dC1maWx0ZXItcHJpY2UnKS5mb3JFYWNoKChwcmljZSkgPT4ge1xuICAgICAgICBpZiAocHJpY2UuZGF0YXNldC5ybVByaWNlUmFuZ2VSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmllbGRzID0gQXJyYXkuZnJvbShwcmljZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXQ6bm90KFt0eXBlXSknKSkuc2xpY2UoMCwgMik7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoICE9PSAyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaGludGVkTWluID0gcGFyc2VOdW1iZXIoZmllbGRzWzBdLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgY29uc3QgaGludGVkTWF4ID0gcGFyc2VOdW1iZXIoZmllbGRzWzFdLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgY29uc3QgY3VycmVudE1pbiA9IHBhcnNlTnVtYmVyKGZpZWxkc1swXS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNYXggPSBwYXJzZU51bWJlcihmaWVsZHNbMV0udmFsdWUpO1xuICAgICAgICBjb25zdCBtaW5pbXVtID0gaGludGVkTWluID8/IGN1cnJlbnRNaW4gPz8gMDtcbiAgICAgICAgY29uc3QgbWF4aW11bSA9IE1hdGgubWF4KG1pbmltdW0gKyAxLCBoaW50ZWRNYXggPz8gY3VycmVudE1heCA/PyBtaW5pbXVtICsgMTAwMCk7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtYXhpbXVtIC0gbWluaW11bSA+IDEwMDAwMCA/IDEwMCA6IG1heGltdW0gLSBtaW5pbXVtID4gMTAwMDAgPyAxMCA6IDE7XG5cbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmFuZ2UuY2xhc3NOYW1lID0gJ3JtLWZpbHRlcl9fcHJpY2UtcmFuZ2UnO1xuICAgICAgICByYW5nZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm0tZmlsdGVyX19wcmljZS10cmFja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzcGFuPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIke21pbmltdW19XCIgbWF4PVwiJHttYXhpbXVtfVwiIHN0ZXA9XCIke3N0ZXB9XCIgZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwiZnJvbVwiIGFyaWEtbGFiZWw9XCIke2ZpZWxkc1swXS5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKT8ucXVlcnlTZWxlY3RvcignbGFiZWwnKT8udGV4dENvbnRlbnQudHJpbSgpIHx8ICfQntGCJ31cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIke21pbmltdW19XCIgbWF4PVwiJHttYXhpbXVtfVwiIHN0ZXA9XCIke3N0ZXB9XCIgZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwidG9cIiBhcmlhLWxhYmVsPVwiJHtmaWVsZHNbMV0uY2xvc2VzdCgnLmlucHV0LWdyb3VwJyk/LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk/LnRleHRDb250ZW50LnRyaW0oKSB8fCAn0JTQvid9XCI+XG4gICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGNsZWFyQ29udHJvbCA9IHByaWNlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWVuZCwgLnVrLXRleHQtcmlnaHQnKTtcbiAgICAgICAgaWYgKGNsZWFyQ29udHJvbCkgY2xlYXJDb250cm9sLmJlZm9yZShyYW5nZSk7XG4gICAgICAgIGVsc2UgcHJpY2UuYXBwZW5kKHJhbmdlKTtcblxuICAgICAgICBjb25zdCBmcm9tUmFuZ2UgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwiZnJvbVwiXScpO1xuICAgICAgICBjb25zdCB0b1JhbmdlID0gcmFuZ2UucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJpY2UtcmFuZ2UtY29udHJvbD1cInRvXCJdJyk7XG4gICAgICAgIGNvbnN0IGZpbGwgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCcucm0tZmlsdGVyX19wcmljZS10cmFjayBzcGFuJyk7XG5cbiAgICAgICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBOdW1iZXIoZnJvbVJhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gTnVtYmVyKHRvUmFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IG1heGltdW0gLSBtaW5pbXVtO1xuICAgICAgICAgICAgZmlsbC5zdHlsZS5sZWZ0ID0gYCR7KChmcm9tIC0gbWluaW11bSkgLyBzcGFuKSAqIDEwMH0lYDtcbiAgICAgICAgICAgIGZpbGwuc3R5bGUucmlnaHQgPSBgJHsxMDAgLSAoKHRvIC0gbWluaW11bSkgLyBzcGFuKSAqIDEwMH0lYDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3luY1Jhbmdlc0Zyb21GaWVsZHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gcGFyc2VOdW1iZXIoZmllbGRzWzBdLnZhbHVlKSA/PyBtaW5pbXVtO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBwYXJzZU51bWJlcihmaWVsZHNbMV0udmFsdWUpID8/IG1heGltdW07XG4gICAgICAgICAgICBmcm9tUmFuZ2UudmFsdWUgPSBTdHJpbmcoTWF0aC5taW4oTWF0aC5tYXgoZnJvbSwgbWluaW11bSksIE51bWJlcih0b1JhbmdlLnZhbHVlIHx8IG1heGltdW0pKSk7XG4gICAgICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKE1hdGgubWF4KE1hdGgubWluKHRvLCBtYXhpbXVtKSwgTnVtYmVyKGZyb21SYW5nZS52YWx1ZSB8fCBtaW5pbXVtKSkpO1xuICAgICAgICAgICAgZHJhdygpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzeW5jRmllbGRzRnJvbVJhbmdlcyA9IChjaGFuZ2VkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCA9PT0gZnJvbVJhbmdlICYmIE51bWJlcihmcm9tUmFuZ2UudmFsdWUpID4gTnVtYmVyKHRvUmFuZ2UudmFsdWUpIC0gc3RlcCkge1xuICAgICAgICAgICAgICAgIGZyb21SYW5nZS52YWx1ZSA9IFN0cmluZyhNYXRoLm1heChtaW5pbXVtLCBOdW1iZXIodG9SYW5nZS52YWx1ZSkgLSBzdGVwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdG9SYW5nZSAmJiBOdW1iZXIodG9SYW5nZS52YWx1ZSkgPCBOdW1iZXIoZnJvbVJhbmdlLnZhbHVlKSArIHN0ZXApIHtcbiAgICAgICAgICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKE1hdGgubWluKG1heGltdW0sIE51bWJlcihmcm9tUmFuZ2UudmFsdWUpICsgc3RlcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmllbGRzWzBdLnZhbHVlID0gZnJvbVJhbmdlLnZhbHVlO1xuICAgICAgICAgICAgZmllbGRzWzFdLnZhbHVlID0gdG9SYW5nZS52YWx1ZTtcbiAgICAgICAgICAgIGRyYXcoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc3luY1Jhbmdlc0Zyb21GaWVsZHMpKTtcbiAgICAgICAgW2Zyb21SYW5nZSwgdG9SYW5nZV0uZm9yRWFjaCgoY29udHJvbCkgPT4gY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHN5bmNGaWVsZHNGcm9tUmFuZ2VzKGNvbnRyb2wpKSk7XG4gICAgICAgIGZyb21SYW5nZS52YWx1ZSA9IFN0cmluZyhjdXJyZW50TWluID8/IG1pbmltdW0pO1xuICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKGN1cnJlbnRNYXggPz8gbWF4aW11bSk7XG4gICAgICAgIGRyYXcoKTtcbiAgICAgICAgcHJpY2UuZGF0YXNldC5ybVByaWNlUmFuZ2VSZWFkeSA9ICd0cnVlJztcbiAgICB9KTtcbn07XG5cbmNvbnN0IGlucHV0SXNBY3RpdmUgPSAoaW5wdXQpID0+IHtcbiAgICBpZiAoKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykpIHJldHVybiBpbnB1dC5jaGVja2VkO1xuICAgIGlmICghaW5wdXQubmFtZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBpZiAocGFyYW1zLmhhcyhpbnB1dC5uYW1lKSkgcmV0dXJuIHBhcmFtcy5nZXRBbGwoaW5wdXQubmFtZSkuc29tZSgodmFsdWUpID0+IHZhbHVlICE9PSAnJyk7XG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaW5wdXQuc2VsZWN0ZWRPcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSAhPT0gJycpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWUgIT09ICcnICYmIGlucHV0LnZhbHVlICE9PSBpbnB1dC5kZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCB1cGRhdGVGaWx0ZXJDb3VudHMgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVySXRlbXMoZmlsdGVyKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGl0ZW1CdXR0b24oaXRlbSk7XG4gICAgICAgIGlmICghYnV0dG9uKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBpdGVtSW5wdXRzKGl0ZW0pLmZpbHRlcihpbnB1dElzQWN0aXZlKS5sZW5ndGg7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtZmlsdGVyZWQnLCBjb3VudCA+IDApO1xuICAgICAgICBsZXQgYmFkZ2UgPSBidXR0b24ucXVlcnlTZWxlY3RvcignLnJtLWZpbHRlcl9fY291bnQnKTtcbiAgICAgICAgaWYgKGZpbHRlci5kYXRhc2V0LnNob3dBY3RpdmVDb3VudCAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBiYWRnZT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiYWRnZSkge1xuICAgICAgICAgICAgYmFkZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAncm0tZmlsdGVyX19jb3VudCc7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kKGJhZGdlKTtcbiAgICAgICAgfVxuICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGNvdW50ID8gU3RyaW5nKGNvdW50KSA6ICcnO1xuICAgICAgICBiYWRnZS5oaWRkZW4gPSBjb3VudCA9PT0gMDtcbiAgICB9KTtcbn07XG5cbmNvbnN0IG9taXRFbXB0eUZvcm1Db250cm9scyA9IChmb3JtKSA9PiB7XG4gICAgY29uc3QgY29udHJvbHMgPSBBcnJheS5mcm9tKGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZV0sIHNlbGVjdFtuYW1lXSwgdGV4dGFyZWFbbmFtZV0nKSkuZmlsdGVyKChjb250cm9sKSA9PiB7XG4gICAgICAgIGlmIChjb250cm9sLmRpc2FibGVkIHx8IGNvbnRyb2wudHlwZSA9PT0gJ3N1Ym1pdCcgfHwgY29udHJvbC50eXBlID09PSAnYnV0dG9uJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoY29udHJvbC50eXBlID09PSAnY2hlY2tib3gnIHx8IGNvbnRyb2wudHlwZSA9PT0gJ3JhZGlvJykgcmV0dXJuICFjb250cm9sLmNoZWNrZWQ7XG4gICAgICAgIHJldHVybiBTdHJpbmcoY29udHJvbC52YWx1ZSB8fCAnJykudHJpbSgpID09PSAnJztcbiAgICB9KTtcbiAgICBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7IGNvbnRyb2wuZGlzYWJsZWQgPSB0cnVlOyB9KTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7IGNvbnRyb2wuZGlzYWJsZWQgPSBmYWxzZTsgfSksIDApO1xufTtcblxuY29uc3QgY2xvc2VGaWx0ZXJJdGVtcyA9IChmaWx0ZXIsIGV4Y2VwdCA9IG51bGwpID0+IHtcbiAgICBmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbi1pdGVtLmlzLW9wZW4sIC51ay1hY2NvcmRpb24tZGVmYXVsdCA+IGxpLmlzLW9wZW4nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtID09PSBleGNlcHQpIHJldHVybjtcbiAgICAgICAgY29uc3QgZHJvcCA9IGRlc2t0b3BEcm9wcy5nZXQoaXRlbSk7XG4gICAgICAgIGlmIChkcm9wKSB7XG4gICAgICAgICAgICBkcm9wLmhpZGU/LihmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgIGl0ZW1CdXR0b24oaXRlbSk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpdGVtQ29udGVudChpdGVtKT8uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBzZXRGaWx0ZXJNb2RlID0gKGZpbHRlciwgZGVza3RvcCkgPT4ge1xuICAgIGZpbHRlci5jbGFzc0xpc3QudG9nZ2xlKCdybS1maWx0ZXItLWRlc2t0b3AnLCBkZXNrdG9wKTtcbiAgICBmaWx0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgncm0tZmlsdGVyLS1tb2JpbGUnLCAhZGVza3RvcCk7XG4gICAgY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpO1xuXG4gICAgaWYgKGRlc2t0b3ApIHtcbiAgICAgICAgZGVzdHJveU1vYmlsZUFjY29yZGlvbnMoZmlsdGVyKTtcbiAgICAgICAgc2V0dXBEZXNrdG9wRHJvcHMoZmlsdGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkZXN0cm95RGVza3RvcERyb3BzKGZpbHRlcik7XG4gICAgfVxuXG4gICAgZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24tY29sbGFwc2UsIC51ay1hY2NvcmRpb24tY29udGVudCcpLmZvckVhY2goKGNvbGxhcHNlKSA9PiB7XG4gICAgICAgIGNvbGxhcHNlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcbiAgICAgICAgY29sbGFwc2Uuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcbiAgICAgICAgY29sbGFwc2UuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2luZycpO1xuICAgICAgICBjb25zdCBleHBhbmRlZCA9IGNvbGxhcHNlLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpIHx8IGNvbGxhcHNlLmNsb3Nlc3QoJ2xpJyk/LmNsYXNzTGlzdC5jb250YWlucygndWstb3BlbicpO1xuICAgICAgICBjb2xsYXBzZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZGVza3RvcCA/ICd0cnVlJyA6IChleHBhbmRlZCA/ICdmYWxzZScgOiAndHJ1ZScpKTtcbiAgICB9KTtcblxuICAgIGlmICghZGVza3RvcCAmJiBmaWx0ZXIuZGF0YXNldC5ybU1vYmlsZVByZXBhcmVkICE9PSAndHJ1ZScpIHtcbiAgICAgICAgZmlsdGVyLmRhdGFzZXQucm1Nb2JpbGVQcmVwYXJlZCA9ICd0cnVlJztcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IGZpbHRlci5kYXRhc2V0Lm1vYmlsZUluaXRpYWxPcGVuIHx8ICdmaXJzdCc7XG4gICAgICAgIGlmIChpbml0aWFsICE9PSAnbW9kdWxlJykge1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGZpbHRlckl0ZW1zKGZpbHRlcikpO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1JbnB1dHMoaXRlbSkuc29tZShpbnB1dElzQWN0aXZlKSk7XG4gICAgICAgICAgICBjb25zdCBvcGVuSXRlbXMgPSBpbml0aWFsID09PSAnYWN0aXZlJyAmJiBhY3RpdmVJdGVtcy5sZW5ndGggPyBhY3RpdmVJdGVtc1xuICAgICAgICAgICAgICAgIDogaW5pdGlhbCA9PT0gJ2ZpcnN0JyAmJiBpdGVtcy5sZW5ndGggPyBbaXRlbXNbMF1dIDogW107XG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcGVuID0gb3Blbkl0ZW1zLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgndWstb3BlbicsIG9wZW4pO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycsIG9wZW4pO1xuICAgICAgICAgICAgICAgIGl0ZW1CdXR0b24oaXRlbSk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4gPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbUNvbnRlbnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5oaWRkZW4gPSAhb3BlbjtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgb3BlbiA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkZXNrdG9wKSBzZXR1cE1vYmlsZUFjY29yZGlvbihmaWx0ZXIpO1xufTtcblxuY29uc3QgaW5pdEZpbHRlciA9IChmaWx0ZXIpID0+IHtcbiAgICBpZiAoZmlsdGVyLmRhdGFzZXQucm1GaWx0ZXJSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgZmlsdGVyLmRhdGFzZXQucm1GaWx0ZXJSZWFkeSA9ICd0cnVlJztcbiAgICBlbmhhbmNlUHJpY2VSYW5nZShmaWx0ZXIpO1xuICAgIGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJykuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IG9taXRFbXB0eUZvcm1Db250cm9scyhmb3JtKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcmVzZW50YXRpb24gPSBmaWx0ZXIuZGF0YXNldC5wcmVzZW50YXRpb24gfHwgJ3Jlc3BvbnNpdmUnO1xuICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBNYXRoLm1heCg2NDAsIE51bWJlcihmaWx0ZXIuZGF0YXNldC5icmVha3BvaW50KSB8fCA5NjApO1xuICAgIGNvbnN0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoYChtaW4td2lkdGg6ICR7YnJlYWtwb2ludH1weClgKTtcbiAgICBjb25zdCBkZXNrdG9wTW9kZSA9ICgpID0+IHByZXNlbnRhdGlvbiA9PT0gJ2Ryb3Bkb3duJyB8fCAocHJlc2VudGF0aW9uID09PSAncmVzcG9uc2l2ZScgJiYgbWVkaWEubWF0Y2hlcyk7XG4gICAgY29uc3QgYXBwbHlNb2RlID0gKCkgPT4gc2V0RmlsdGVyTW9kZShmaWx0ZXIsIGRlc2t0b3BNb2RlKCkpO1xuICAgIGFwcGx5TW9kZSgpO1xuICAgIG1lZGlhLmFkZEV2ZW50TGlzdGVuZXI/LignY2hhbmdlJywgYXBwbHlNb2RlKTtcblxuICAgIGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmFjY29yZGlvbi1idXR0b24sIC51ay1hY2NvcmRpb24tdGl0bGUnKTtcbiAgICAgICAgaWYgKCFidXR0b24gfHwgIWZpbHRlci5jb250YWlucyhidXR0b24pIHx8ICFkZXNrdG9wTW9kZSgpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXRlbSA9IGJ1dHRvbi5jbG9zZXN0KCcuYWNjb3JkaW9uLWl0ZW0sIC51ay1hY2NvcmRpb24tZGVmYXVsdCA+IGxpJyk7XG4gICAgICAgIGlmIChkZXNrdG9wRHJvcHMuaGFzKGl0ZW0pKSByZXR1cm47XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB3aWxsT3BlbiA9ICFpdGVtLmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpO1xuICAgICAgICBjbG9zZUZpbHRlckl0ZW1zKGZpbHRlciwgd2lsbE9wZW4gPyBpdGVtIDogbnVsbCk7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIHdpbGxPcGVuKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHdpbGxPcGVuID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIGl0ZW1Db250ZW50KGl0ZW0pPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgd2lsbE9wZW4gPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICB9LCB0cnVlKTtcblxuICAgIGxldCBzdWJtaXRUaW1lciA9IG51bGw7XG4gICAgZmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCdmb3JtJykpIHJldHVybjtcbiAgICAgICAgdXBkYXRlRmlsdGVyQ291bnRzKGZpbHRlcik7XG4gICAgICAgIGlmIChkZXNrdG9wTW9kZSgpICYmIGZpbHRlci5kYXRhc2V0LmNsb3NlT25DaGFuZ2UgPT09ICd0cnVlJykgY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpO1xuICAgICAgICBpZiAoZmlsdGVyLmRhdGFzZXQuYXV0b1N1Ym1pdCAhPT0gJ3RydWUnKSByZXR1cm47XG5cbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzdWJtaXRUaW1lcik7XG4gICAgICAgIHN1Ym1pdFRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2Zvcm0nKT8ucmVxdWVzdFN1Ym1pdCgpLFxuICAgICAgICAgICAgTWF0aC5tYXgoMCwgTnVtYmVyKGZpbHRlci5kYXRhc2V0LmF1dG9TdWJtaXREZWxheSkgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgdXBkYXRlRmlsdGVyQ291bnRzKGZpbHRlcik7XG59O1xuXG5jb25zdCBzaG93Q2F0YWxvZ1BhbmVsID0gKG1lbnUsIHBhbmVsSWQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJtLWNhdGFsb2ctcGFuZWw9XCIke0NTUy5lc2NhcGUoU3RyaW5nKHBhbmVsSWQpKX1cIl1gKTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgbWVudS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1jYXRhbG9nLXBhbmVsXScpLmZvckVhY2goKHBhbmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmVsID09PSB0YXJnZXQ7XG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScsIGFjdGl2ZSk7XG4gICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhY3RpdmUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICB9KTtcbiAgICB0YXJnZXQucXVlcnlTZWxlY3RvcignLnJtLWNhdGFsb2ctbWVudV9fYmFjaywgLnJtLWNhdGFsb2ctbWVudV9fbGluaywgLnJtLWNhdGFsb2ctbWVudV9fZm9yd2FyZCcpPy5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuICAgIG1lbnUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JtOmNhdGFsb2ctcGFuZWwtY2hhbmdlJywge2RldGFpbDoge3BhbmVsSWR9fSkpO1xufTtcblxuY29uc3QgaW5pdENhdGFsb2dNZW51ID0gKG1lbnUpID0+IHtcbiAgICBpZiAobWVudS5kYXRhc2V0LnJtQ2F0YWxvZ01lbnVSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgbWVudS5kYXRhc2V0LnJtQ2F0YWxvZ01lbnVSZWFkeSA9ICd0cnVlJztcblxuICAgIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZm9yd2FyZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1jYXRhbG9nLWZvcndhcmRdJyk7XG4gICAgICAgIGNvbnN0IGJhY2sgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tY2F0YWxvZy1iYWNrXScpO1xuICAgICAgICBpZiAoIWZvcndhcmQgJiYgIWJhY2spIHJldHVybjtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2hvd0NhdGFsb2dQYW5lbChtZW51LCAoZm9yd2FyZCB8fCBiYWNrKS5kYXRhc2V0W2ZvcndhcmQgPyAncm1DYXRhbG9nRm9yd2FyZCcgOiAncm1DYXRhbG9nQmFjayddKTtcbiAgICB9KTtcbiAgICBzaG93Q2F0YWxvZ1BhbmVsKG1lbnUsIG1lbnUuZGF0YXNldC5pbml0aWFsUGFuZWwgfHwgMSk7XG59O1xuXG5jb25zdCBpbml0QWxsID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tZmlsdGVyXScpKSBpbml0RmlsdGVyKHJvb3QpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1maWx0ZXJdJykuZm9yRWFjaChpbml0RmlsdGVyKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLWNhdGFsb2ctbWVudV0nKSkgaW5pdENhdGFsb2dNZW51KHJvb3QpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1jYXRhbG9nLW1lbnVdJykuZm9yRWFjaChpbml0Q2F0YWxvZ01lbnUpO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgaW5pdEFsbCgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tZmlsdGVyXS5ybS1maWx0ZXItLWRlc2t0b3AnKS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIGNsb3NlRmlsdGVySXRlbXMoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1maWx0ZXJdLnJtLWZpbHRlci0tZGVza3RvcCcpLmZvckVhY2goKGZpbHRlcikgPT4gY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvblJhZGljYWxNYXJ0RmlsdGVyQWZ0ZXJBamF4JywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1maWx0ZXJdJykuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBmaWx0ZXIuZGF0YXNldC5ybUZpbHRlclJlYWR5ID0gJ2ZhbHNlJztcbiAgICAgICAgICAgIGluaXRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlRHluYW1pY0NvbnRlbnQoaW5pdEFsbCk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHN0YXJ0LCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBzdGFydCgpO1xufVxuIl0sIm5hbWVzIjpbIlJVTlRJTUVfS0VZIiwicnVudGltZSIsIndpbmRvdyIsImFkZGVkIiwiU2V0IiwicmVtb3ZlZCIsIm9ic2VydmVyIiwidmlzaXQiLCJjYWxsYmFja3MiLCJub2RlIiwiZm9yRWFjaCIsImNhbGxiYWNrIiwic3RhcnQiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJyZWNvcmRzIiwiX3JlZiIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJub2RlVHlwZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJvYnNlcnZlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsIm9ic2VydmVEeW5hbWljQ29udGVudCIsIm9uQWRkZWQiLCJvblJlbW92ZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJhZGQiLCJkZWxldGUiLCJmaWx0ZXJJdGVtcyIsImZpbHRlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtQnV0dG9uIiwiaXRlbSIsInF1ZXJ5U2VsZWN0b3IiLCJpdGVtQ29udGVudCIsIml0ZW1JbnB1dHMiLCJBcnJheSIsImZyb20iLCJkZXNrdG9wRHJvcHMiLCJXZWFrTWFwIiwibW9iaWxlQWNjb3JkaW9ucyIsImRlc3Ryb3lDb21wb25lbnQiLCJjb21wb25lbnQiLCIkZGVzdHJveSIsImVycm9yIiwiZGVzdHJveURlc2t0b3BEcm9wcyIsImdldCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFsaWduRGVza3RvcERyb3AiLCJjb250ZW50IiwiaXRlbVJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250ZW50UmVjdCIsInZpZXdwb3J0SW5zZXQiLCJvdmVyZmxvd1JpZ2h0IiwibGVmdCIsIndpZHRoIiwiaW5uZXJXaWR0aCIsIm1pbmltdW1TaGlmdCIsInNoaWZ0IiwiTWF0aCIsIm1heCIsIm1pbiIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJyb3VuZCIsInNldHVwRGVza3RvcERyb3BzIiwiVUlraXQiLCJkcm9wIiwiYnV0dG9uIiwiaGFzIiwidG9nZ2xlIiwibW9kZSIsInBvcyIsIm9mZnNldCIsImZsaXAiLCJjb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0Iiwic2V0dXBNb2JpbGVBY2NvcmRpb24iLCJhY2NvcmRpb24iLCJzZXRBdHRyaWJ1dGUiLCJtdWx0aXBsZSIsImNvbGxhcHNpYmxlIiwiZGVzdHJveU1vYmlsZUFjY29yZGlvbnMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJwYXJzZU51bWJlciIsInZhbHVlIiwibm9ybWFsaXplZCIsIlN0cmluZyIsInJlcGxhY2UiLCJudW1iZXIiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJlbmhhbmNlUHJpY2VSYW5nZSIsInByaWNlIiwiZGF0YXNldCIsInJtUHJpY2VSYW5nZVJlYWR5IiwiZmllbGRzIiwic2xpY2UiLCJoaW50ZWRNaW4iLCJwbGFjZWhvbGRlciIsImhpbnRlZE1heCIsImN1cnJlbnRNaW4iLCJjdXJyZW50TWF4IiwibWluaW11bSIsIm1heGltdW0iLCJzdGVwIiwicmFuZ2UiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwiY2xvc2VzdCIsInRleHRDb250ZW50IiwidHJpbSIsImNsZWFyQ29udHJvbCIsImJlZm9yZSIsImFwcGVuZCIsImZyb21SYW5nZSIsInRvUmFuZ2UiLCJmaWxsIiwiZHJhdyIsInRvIiwic3BhbiIsInJpZ2h0Iiwic3luY1Jhbmdlc0Zyb21GaWVsZHMiLCJzeW5jRmllbGRzRnJvbVJhbmdlcyIsImNoYW5nZWQiLCJmaWVsZCIsImNvbnRyb2wiLCJpbnB1dElzQWN0aXZlIiwiaW5wdXQiLCJ0eXBlIiwiY2hlY2tlZCIsIm5hbWUiLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImdldEFsbCIsInNvbWUiLCJIVE1MU2VsZWN0RWxlbWVudCIsInNlbGVjdGVkT3B0aW9ucyIsIm9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsInVwZGF0ZUZpbHRlckNvdW50cyIsImNvdW50IiwiYmFkZ2UiLCJzaG93QWN0aXZlQ291bnQiLCJoaWRkZW4iLCJvbWl0RW1wdHlGb3JtQ29udHJvbHMiLCJmb3JtIiwiY29udHJvbHMiLCJkaXNhYmxlZCIsInNldFRpbWVvdXQiLCJjbG9zZUZpbHRlckl0ZW1zIiwiZXhjZXB0IiwiaGlkZSIsInNldEZpbHRlck1vZGUiLCJkZXNrdG9wIiwiY29sbGFwc2UiLCJyZW1vdmVQcm9wZXJ0eSIsImV4cGFuZGVkIiwiY29udGFpbnMiLCJybU1vYmlsZVByZXBhcmVkIiwiaW5pdGlhbCIsIm1vYmlsZUluaXRpYWxPcGVuIiwiaXRlbXMiLCJhY3RpdmVJdGVtcyIsIm9wZW5JdGVtcyIsIm9wZW4iLCJpbmNsdWRlcyIsImluaXRGaWx0ZXIiLCJybUZpbHRlclJlYWR5IiwicHJlc2VudGF0aW9uIiwiYnJlYWtwb2ludCIsIm1lZGlhIiwibWF0Y2hNZWRpYSIsImRlc2t0b3BNb2RlIiwibWF0Y2hlcyIsImFwcGx5TW9kZSIsImV2ZW50IiwidGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3aWxsT3BlbiIsInN1Ym1pdFRpbWVyIiwiY2xvc2VPbkNoYW5nZSIsImF1dG9TdWJtaXQiLCJjbGVhclRpbWVvdXQiLCJyZXF1ZXN0U3VibWl0IiwiYXV0b1N1Ym1pdERlbGF5Iiwic2hvd0NhdGFsb2dQYW5lbCIsIm1lbnUiLCJwYW5lbElkIiwiQ1NTIiwiZXNjYXBlIiwicGFuZWwiLCJhY3RpdmUiLCJmb2N1cyIsInByZXZlbnRTY3JvbGwiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJpbml0Q2F0YWxvZ01lbnUiLCJybUNhdGFsb2dNZW51UmVhZHkiLCJmb3J3YXJkIiwiYmFjayIsImluaXRpYWxQYW5lbCIsImluaXRBbGwiLCJyb290Iiwia2V5IiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9