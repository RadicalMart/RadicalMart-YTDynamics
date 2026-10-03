/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

const filterItems = filter => filter.querySelectorAll('.accordion-item, .uk-accordion-default > li');
const itemButton = item => item.querySelector('.accordion-button, .uk-accordion-title');
const itemContent = item => item.querySelector('.accordion-collapse, .uk-accordion-content');
const itemInputs = item => Array.from(itemContent(item)?.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([data-rm-price-range-control]), select, textarea') || []);
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
    item.classList.remove('is-open');
    itemButton(item)?.setAttribute('aria-expanded', 'false');
    itemContent(item)?.setAttribute('aria-hidden', 'true');
  });
};
const setFilterMode = (filter, desktop) => {
  filter.classList.toggle('rm-filter--desktop', desktop);
  filter.classList.toggle('rm-filter--mobile', !desktop);
  closeFilterItems(filter);
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
    event.preventDefault();
    event.stopPropagation();
    const item = button.closest('.accordion-item, .uk-accordion-default > li');
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
  new MutationObserver(records => records.forEach(_ref => {
    let {
      addedNodes
    } = _ref;
    return addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) initAll(node);
    });
  })).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUMsQ0FBQztBQUN0RSxDQUFDLE1BQU07RUFDSGYsS0FBSyxDQUFDLENBQUM7QUFDWCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2NhdGFsb2ctbmF2aWdhdGlvbi5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvY2F0YWxvZy1uYXZpZ2F0aW9uLmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vY2F0YWxvZy1uYXZpZ2F0aW9uLnNjc3MnO1xuXG5jb25zdCBmaWx0ZXJJdGVtcyA9IChmaWx0ZXIpID0+IGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uLWl0ZW0sIC51ay1hY2NvcmRpb24tZGVmYXVsdCA+IGxpJyk7XG5jb25zdCBpdGVtQnV0dG9uID0gKGl0ZW0pID0+IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbi1idXR0b24sIC51ay1hY2NvcmRpb24tdGl0bGUnKTtcbmNvbnN0IGl0ZW1Db250ZW50ID0gKGl0ZW0pID0+IGl0ZW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbi1jb2xsYXBzZSwgLnVrLWFjY29yZGlvbi1jb250ZW50Jyk7XG5jb25zdCBpdGVtSW5wdXRzID0gKGl0ZW0pID0+IEFycmF5LmZyb20oaXRlbUNvbnRlbnQoaXRlbSk/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ2lucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFt0eXBlPVwic3VibWl0XCJdKTpub3QoW2RhdGEtcm0tcHJpY2UtcmFuZ2UtY29udHJvbF0pLCBzZWxlY3QsIHRleHRhcmVhJ1xuKSB8fCBbXSk7XG5cbmNvbnN0IHBhcnNlTnVtYmVyID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCAnJykucmVwbGFjZSgvW14wLTksLi1dL2csICcnKS5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIucGFyc2VGbG9hdChub3JtYWxpemVkKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKG51bWJlcikgPyBudW1iZXIgOiBudWxsO1xufTtcblxuY29uc3QgZW5oYW5jZVByaWNlUmFuZ2UgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYWRpY2FsbWFydC1pbnB1dC1maWx0ZXItcHJpY2UnKS5mb3JFYWNoKChwcmljZSkgPT4ge1xuICAgICAgICBpZiAocHJpY2UuZGF0YXNldC5ybVByaWNlUmFuZ2VSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmllbGRzID0gQXJyYXkuZnJvbShwcmljZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXQ6bm90KFt0eXBlXSknKSkuc2xpY2UoMCwgMik7XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoICE9PSAyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaGludGVkTWluID0gcGFyc2VOdW1iZXIoZmllbGRzWzBdLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgY29uc3QgaGludGVkTWF4ID0gcGFyc2VOdW1iZXIoZmllbGRzWzFdLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgY29uc3QgY3VycmVudE1pbiA9IHBhcnNlTnVtYmVyKGZpZWxkc1swXS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNYXggPSBwYXJzZU51bWJlcihmaWVsZHNbMV0udmFsdWUpO1xuICAgICAgICBjb25zdCBtaW5pbXVtID0gaGludGVkTWluID8/IGN1cnJlbnRNaW4gPz8gMDtcbiAgICAgICAgY29uc3QgbWF4aW11bSA9IE1hdGgubWF4KG1pbmltdW0gKyAxLCBoaW50ZWRNYXggPz8gY3VycmVudE1heCA/PyBtaW5pbXVtICsgMTAwMCk7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtYXhpbXVtIC0gbWluaW11bSA+IDEwMDAwMCA/IDEwMCA6IG1heGltdW0gLSBtaW5pbXVtID4gMTAwMDAgPyAxMCA6IDE7XG5cbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmFuZ2UuY2xhc3NOYW1lID0gJ3JtLWZpbHRlcl9fcHJpY2UtcmFuZ2UnO1xuICAgICAgICByYW5nZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm0tZmlsdGVyX19wcmljZS10cmFja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzcGFuPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIke21pbmltdW19XCIgbWF4PVwiJHttYXhpbXVtfVwiIHN0ZXA9XCIke3N0ZXB9XCIgZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwiZnJvbVwiIGFyaWEtbGFiZWw9XCIke2ZpZWxkc1swXS5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKT8ucXVlcnlTZWxlY3RvcignbGFiZWwnKT8udGV4dENvbnRlbnQudHJpbSgpIHx8ICfQntGCJ31cIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIke21pbmltdW19XCIgbWF4PVwiJHttYXhpbXVtfVwiIHN0ZXA9XCIke3N0ZXB9XCIgZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwidG9cIiBhcmlhLWxhYmVsPVwiJHtmaWVsZHNbMV0uY2xvc2VzdCgnLmlucHV0LWdyb3VwJyk/LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk/LnRleHRDb250ZW50LnRyaW0oKSB8fCAn0JTQvid9XCI+XG4gICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGNsZWFyQ29udHJvbCA9IHByaWNlLnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWVuZCwgLnVrLXRleHQtcmlnaHQnKTtcbiAgICAgICAgaWYgKGNsZWFyQ29udHJvbCkgY2xlYXJDb250cm9sLmJlZm9yZShyYW5nZSk7XG4gICAgICAgIGVsc2UgcHJpY2UuYXBwZW5kKHJhbmdlKTtcblxuICAgICAgICBjb25zdCBmcm9tUmFuZ2UgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcmljZS1yYW5nZS1jb250cm9sPVwiZnJvbVwiXScpO1xuICAgICAgICBjb25zdCB0b1JhbmdlID0gcmFuZ2UucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJpY2UtcmFuZ2UtY29udHJvbD1cInRvXCJdJyk7XG4gICAgICAgIGNvbnN0IGZpbGwgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCcucm0tZmlsdGVyX19wcmljZS10cmFjayBzcGFuJyk7XG5cbiAgICAgICAgY29uc3QgZHJhdyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBOdW1iZXIoZnJvbVJhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHRvID0gTnVtYmVyKHRvUmFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IG1heGltdW0gLSBtaW5pbXVtO1xuICAgICAgICAgICAgZmlsbC5zdHlsZS5sZWZ0ID0gYCR7KChmcm9tIC0gbWluaW11bSkgLyBzcGFuKSAqIDEwMH0lYDtcbiAgICAgICAgICAgIGZpbGwuc3R5bGUucmlnaHQgPSBgJHsxMDAgLSAoKHRvIC0gbWluaW11bSkgLyBzcGFuKSAqIDEwMH0lYDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3luY1Jhbmdlc0Zyb21GaWVsZHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcm9tID0gcGFyc2VOdW1iZXIoZmllbGRzWzBdLnZhbHVlKSA/PyBtaW5pbXVtO1xuICAgICAgICAgICAgY29uc3QgdG8gPSBwYXJzZU51bWJlcihmaWVsZHNbMV0udmFsdWUpID8/IG1heGltdW07XG4gICAgICAgICAgICBmcm9tUmFuZ2UudmFsdWUgPSBTdHJpbmcoTWF0aC5taW4oTWF0aC5tYXgoZnJvbSwgbWluaW11bSksIE51bWJlcih0b1JhbmdlLnZhbHVlIHx8IG1heGltdW0pKSk7XG4gICAgICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKE1hdGgubWF4KE1hdGgubWluKHRvLCBtYXhpbXVtKSwgTnVtYmVyKGZyb21SYW5nZS52YWx1ZSB8fCBtaW5pbXVtKSkpO1xuICAgICAgICAgICAgZHJhdygpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzeW5jRmllbGRzRnJvbVJhbmdlcyA9IChjaGFuZ2VkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCA9PT0gZnJvbVJhbmdlICYmIE51bWJlcihmcm9tUmFuZ2UudmFsdWUpID4gTnVtYmVyKHRvUmFuZ2UudmFsdWUpIC0gc3RlcCkge1xuICAgICAgICAgICAgICAgIGZyb21SYW5nZS52YWx1ZSA9IFN0cmluZyhNYXRoLm1heChtaW5pbXVtLCBOdW1iZXIodG9SYW5nZS52YWx1ZSkgLSBzdGVwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdG9SYW5nZSAmJiBOdW1iZXIodG9SYW5nZS52YWx1ZSkgPCBOdW1iZXIoZnJvbVJhbmdlLnZhbHVlKSArIHN0ZXApIHtcbiAgICAgICAgICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKE1hdGgubWluKG1heGltdW0sIE51bWJlcihmcm9tUmFuZ2UudmFsdWUpICsgc3RlcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmllbGRzWzBdLnZhbHVlID0gZnJvbVJhbmdlLnZhbHVlO1xuICAgICAgICAgICAgZmllbGRzWzFdLnZhbHVlID0gdG9SYW5nZS52YWx1ZTtcbiAgICAgICAgICAgIGRyYXcoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc3luY1Jhbmdlc0Zyb21GaWVsZHMpKTtcbiAgICAgICAgW2Zyb21SYW5nZSwgdG9SYW5nZV0uZm9yRWFjaCgoY29udHJvbCkgPT4gY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHN5bmNGaWVsZHNGcm9tUmFuZ2VzKGNvbnRyb2wpKSk7XG4gICAgICAgIGZyb21SYW5nZS52YWx1ZSA9IFN0cmluZyhjdXJyZW50TWluID8/IG1pbmltdW0pO1xuICAgICAgICB0b1JhbmdlLnZhbHVlID0gU3RyaW5nKGN1cnJlbnRNYXggPz8gbWF4aW11bSk7XG4gICAgICAgIGRyYXcoKTtcbiAgICAgICAgcHJpY2UuZGF0YXNldC5ybVByaWNlUmFuZ2VSZWFkeSA9ICd0cnVlJztcbiAgICB9KTtcbn07XG5cbmNvbnN0IGlucHV0SXNBY3RpdmUgPSAoaW5wdXQpID0+IHtcbiAgICBpZiAoKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykpIHJldHVybiBpbnB1dC5jaGVja2VkO1xuICAgIGlmICghaW5wdXQubmFtZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBpZiAocGFyYW1zLmhhcyhpbnB1dC5uYW1lKSkgcmV0dXJuIHBhcmFtcy5nZXRBbGwoaW5wdXQubmFtZSkuc29tZSgodmFsdWUpID0+IHZhbHVlICE9PSAnJyk7XG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaW5wdXQuc2VsZWN0ZWRPcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSAhPT0gJycpO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWUgIT09ICcnICYmIGlucHV0LnZhbHVlICE9PSBpbnB1dC5kZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCB1cGRhdGVGaWx0ZXJDb3VudHMgPSAoZmlsdGVyKSA9PiB7XG4gICAgZmlsdGVySXRlbXMoZmlsdGVyKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGl0ZW1CdXR0b24oaXRlbSk7XG4gICAgICAgIGlmICghYnV0dG9uKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBpdGVtSW5wdXRzKGl0ZW0pLmZpbHRlcihpbnB1dElzQWN0aXZlKS5sZW5ndGg7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtZmlsdGVyZWQnLCBjb3VudCA+IDApO1xuICAgICAgICBsZXQgYmFkZ2UgPSBidXR0b24ucXVlcnlTZWxlY3RvcignLnJtLWZpbHRlcl9fY291bnQnKTtcbiAgICAgICAgaWYgKGZpbHRlci5kYXRhc2V0LnNob3dBY3RpdmVDb3VudCAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBiYWRnZT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiYWRnZSkge1xuICAgICAgICAgICAgYmFkZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAncm0tZmlsdGVyX19jb3VudCc7XG4gICAgICAgICAgICBidXR0b24uYXBwZW5kKGJhZGdlKTtcbiAgICAgICAgfVxuICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGNvdW50ID8gU3RyaW5nKGNvdW50KSA6ICcnO1xuICAgICAgICBiYWRnZS5oaWRkZW4gPSBjb3VudCA9PT0gMDtcbiAgICB9KTtcbn07XG5cbmNvbnN0IG9taXRFbXB0eUZvcm1Db250cm9scyA9IChmb3JtKSA9PiB7XG4gICAgY29uc3QgY29udHJvbHMgPSBBcnJheS5mcm9tKGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZV0sIHNlbGVjdFtuYW1lXSwgdGV4dGFyZWFbbmFtZV0nKSkuZmlsdGVyKChjb250cm9sKSA9PiB7XG4gICAgICAgIGlmIChjb250cm9sLmRpc2FibGVkIHx8IGNvbnRyb2wudHlwZSA9PT0gJ3N1Ym1pdCcgfHwgY29udHJvbC50eXBlID09PSAnYnV0dG9uJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoY29udHJvbC50eXBlID09PSAnY2hlY2tib3gnIHx8IGNvbnRyb2wudHlwZSA9PT0gJ3JhZGlvJykgcmV0dXJuICFjb250cm9sLmNoZWNrZWQ7XG4gICAgICAgIHJldHVybiBTdHJpbmcoY29udHJvbC52YWx1ZSB8fCAnJykudHJpbSgpID09PSAnJztcbiAgICB9KTtcbiAgICBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7IGNvbnRyb2wuZGlzYWJsZWQgPSB0cnVlOyB9KTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7IGNvbnRyb2wuZGlzYWJsZWQgPSBmYWxzZTsgfSksIDApO1xufTtcblxuY29uc3QgY2xvc2VGaWx0ZXJJdGVtcyA9IChmaWx0ZXIsIGV4Y2VwdCA9IG51bGwpID0+IHtcbiAgICBmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbi1pdGVtLmlzLW9wZW4sIC51ay1hY2NvcmRpb24tZGVmYXVsdCA+IGxpLmlzLW9wZW4nKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtID09PSBleGNlcHQpIHJldHVybjtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgIGl0ZW1CdXR0b24oaXRlbSk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpdGVtQ29udGVudChpdGVtKT8uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBzZXRGaWx0ZXJNb2RlID0gKGZpbHRlciwgZGVza3RvcCkgPT4ge1xuICAgIGZpbHRlci5jbGFzc0xpc3QudG9nZ2xlKCdybS1maWx0ZXItLWRlc2t0b3AnLCBkZXNrdG9wKTtcbiAgICBmaWx0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgncm0tZmlsdGVyLS1tb2JpbGUnLCAhZGVza3RvcCk7XG4gICAgY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpO1xuXG4gICAgZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb24tY29sbGFwc2UsIC51ay1hY2NvcmRpb24tY29udGVudCcpLmZvckVhY2goKGNvbGxhcHNlKSA9PiB7XG4gICAgICAgIGNvbGxhcHNlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdoZWlnaHQnKTtcbiAgICAgICAgY29sbGFwc2Uuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcbiAgICAgICAgY29sbGFwc2UuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2luZycpO1xuICAgICAgICBjb25zdCBleHBhbmRlZCA9IGNvbGxhcHNlLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpIHx8IGNvbGxhcHNlLmNsb3Nlc3QoJ2xpJyk/LmNsYXNzTGlzdC5jb250YWlucygndWstb3BlbicpO1xuICAgICAgICBjb2xsYXBzZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZGVza3RvcCA/ICd0cnVlJyA6IChleHBhbmRlZCA/ICdmYWxzZScgOiAndHJ1ZScpKTtcbiAgICB9KTtcblxuICAgIGlmICghZGVza3RvcCAmJiBmaWx0ZXIuZGF0YXNldC5ybU1vYmlsZVByZXBhcmVkICE9PSAndHJ1ZScpIHtcbiAgICAgICAgZmlsdGVyLmRhdGFzZXQucm1Nb2JpbGVQcmVwYXJlZCA9ICd0cnVlJztcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IGZpbHRlci5kYXRhc2V0Lm1vYmlsZUluaXRpYWxPcGVuIHx8ICdmaXJzdCc7XG4gICAgICAgIGlmIChpbml0aWFsICE9PSAnbW9kdWxlJykge1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGZpbHRlckl0ZW1zKGZpbHRlcikpO1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1JbnB1dHMoaXRlbSkuc29tZShpbnB1dElzQWN0aXZlKSk7XG4gICAgICAgICAgICBjb25zdCBvcGVuSXRlbXMgPSBpbml0aWFsID09PSAnYWN0aXZlJyAmJiBhY3RpdmVJdGVtcy5sZW5ndGggPyBhY3RpdmVJdGVtc1xuICAgICAgICAgICAgICAgIDogaW5pdGlhbCA9PT0gJ2ZpcnN0JyAmJiBpdGVtcy5sZW5ndGggPyBbaXRlbXNbMF1dIDogW107XG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcGVuID0gb3Blbkl0ZW1zLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgndWstb3BlbicsIG9wZW4pO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycsIG9wZW4pO1xuICAgICAgICAgICAgICAgIGl0ZW1CdXR0b24oaXRlbSk/LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4gPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbUNvbnRlbnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5oaWRkZW4gPSAhb3BlbjtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgb3BlbiA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3QgaW5pdEZpbHRlciA9IChmaWx0ZXIpID0+IHtcbiAgICBpZiAoZmlsdGVyLmRhdGFzZXQucm1GaWx0ZXJSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgZmlsdGVyLmRhdGFzZXQucm1GaWx0ZXJSZWFkeSA9ICd0cnVlJztcbiAgICBlbmhhbmNlUHJpY2VSYW5nZShmaWx0ZXIpO1xuICAgIGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJykuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsICgpID0+IG9taXRFbXB0eUZvcm1Db250cm9scyhmb3JtKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwcmVzZW50YXRpb24gPSBmaWx0ZXIuZGF0YXNldC5wcmVzZW50YXRpb24gfHwgJ3Jlc3BvbnNpdmUnO1xuICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBNYXRoLm1heCg2NDAsIE51bWJlcihmaWx0ZXIuZGF0YXNldC5icmVha3BvaW50KSB8fCA5NjApO1xuICAgIGNvbnN0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoYChtaW4td2lkdGg6ICR7YnJlYWtwb2ludH1weClgKTtcbiAgICBjb25zdCBkZXNrdG9wTW9kZSA9ICgpID0+IHByZXNlbnRhdGlvbiA9PT0gJ2Ryb3Bkb3duJyB8fCAocHJlc2VudGF0aW9uID09PSAncmVzcG9uc2l2ZScgJiYgbWVkaWEubWF0Y2hlcyk7XG4gICAgY29uc3QgYXBwbHlNb2RlID0gKCkgPT4gc2V0RmlsdGVyTW9kZShmaWx0ZXIsIGRlc2t0b3BNb2RlKCkpO1xuICAgIGFwcGx5TW9kZSgpO1xuICAgIG1lZGlhLmFkZEV2ZW50TGlzdGVuZXI/LignY2hhbmdlJywgYXBwbHlNb2RlKTtcblxuICAgIGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmFjY29yZGlvbi1idXR0b24sIC51ay1hY2NvcmRpb24tdGl0bGUnKTtcbiAgICAgICAgaWYgKCFidXR0b24gfHwgIWZpbHRlci5jb250YWlucyhidXR0b24pIHx8ICFkZXNrdG9wTW9kZSgpKSByZXR1cm47XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBidXR0b24uY2xvc2VzdCgnLmFjY29yZGlvbi1pdGVtLCAudWstYWNjb3JkaW9uLWRlZmF1bHQgPiBsaScpO1xuICAgICAgICBjb25zdCB3aWxsT3BlbiA9ICFpdGVtLmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpO1xuICAgICAgICBjbG9zZUZpbHRlckl0ZW1zKGZpbHRlciwgd2lsbE9wZW4gPyBpdGVtIDogbnVsbCk7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIHdpbGxPcGVuKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHdpbGxPcGVuID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIGl0ZW1Db250ZW50KGl0ZW0pPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgd2lsbE9wZW4gPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICB9LCB0cnVlKTtcblxuICAgIGxldCBzdWJtaXRUaW1lciA9IG51bGw7XG4gICAgZmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCdmb3JtJykpIHJldHVybjtcbiAgICAgICAgdXBkYXRlRmlsdGVyQ291bnRzKGZpbHRlcik7XG4gICAgICAgIGlmIChkZXNrdG9wTW9kZSgpICYmIGZpbHRlci5kYXRhc2V0LmNsb3NlT25DaGFuZ2UgPT09ICd0cnVlJykgY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpO1xuICAgICAgICBpZiAoZmlsdGVyLmRhdGFzZXQuYXV0b1N1Ym1pdCAhPT0gJ3RydWUnKSByZXR1cm47XG5cbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzdWJtaXRUaW1lcik7XG4gICAgICAgIHN1Ym1pdFRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2Zvcm0nKT8ucmVxdWVzdFN1Ym1pdCgpLFxuICAgICAgICAgICAgTWF0aC5tYXgoMCwgTnVtYmVyKGZpbHRlci5kYXRhc2V0LmF1dG9TdWJtaXREZWxheSkgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgdXBkYXRlRmlsdGVyQ291bnRzKGZpbHRlcik7XG59O1xuXG5jb25zdCBzaG93Q2F0YWxvZ1BhbmVsID0gKG1lbnUsIHBhbmVsSWQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBtZW51LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJtLWNhdGFsb2ctcGFuZWw9XCIke0NTUy5lc2NhcGUoU3RyaW5nKHBhbmVsSWQpKX1cIl1gKTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgbWVudS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1jYXRhbG9nLXBhbmVsXScpLmZvckVhY2goKHBhbmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmVsID09PSB0YXJnZXQ7XG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScsIGFjdGl2ZSk7XG4gICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhY3RpdmUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICB9KTtcbiAgICB0YXJnZXQucXVlcnlTZWxlY3RvcignLnJtLWNhdGFsb2ctbWVudV9fYmFjaywgLnJtLWNhdGFsb2ctbWVudV9fbGluaywgLnJtLWNhdGFsb2ctbWVudV9fZm9yd2FyZCcpPy5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuICAgIG1lbnUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JtOmNhdGFsb2ctcGFuZWwtY2hhbmdlJywge2RldGFpbDoge3BhbmVsSWR9fSkpO1xufTtcblxuY29uc3QgaW5pdENhdGFsb2dNZW51ID0gKG1lbnUpID0+IHtcbiAgICBpZiAobWVudS5kYXRhc2V0LnJtQ2F0YWxvZ01lbnVSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgbWVudS5kYXRhc2V0LnJtQ2F0YWxvZ01lbnVSZWFkeSA9ICd0cnVlJztcblxuICAgIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZm9yd2FyZCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1jYXRhbG9nLWZvcndhcmRdJyk7XG4gICAgICAgIGNvbnN0IGJhY2sgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tY2F0YWxvZy1iYWNrXScpO1xuICAgICAgICBpZiAoIWZvcndhcmQgJiYgIWJhY2spIHJldHVybjtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2hvd0NhdGFsb2dQYW5lbChtZW51LCAoZm9yd2FyZCB8fCBiYWNrKS5kYXRhc2V0W2ZvcndhcmQgPyAncm1DYXRhbG9nRm9yd2FyZCcgOiAncm1DYXRhbG9nQmFjayddKTtcbiAgICB9KTtcbiAgICBzaG93Q2F0YWxvZ1BhbmVsKG1lbnUsIG1lbnUuZGF0YXNldC5pbml0aWFsUGFuZWwgfHwgMSk7XG59O1xuXG5jb25zdCBpbml0QWxsID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tZmlsdGVyXScpKSBpbml0RmlsdGVyKHJvb3QpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1maWx0ZXJdJykuZm9yRWFjaChpbml0RmlsdGVyKTtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLWNhdGFsb2ctbWVudV0nKSkgaW5pdENhdGFsb2dNZW51KHJvb3QpO1xuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1jYXRhbG9nLW1lbnVdJykuZm9yRWFjaChpbml0Q2F0YWxvZ01lbnUpO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgaW5pdEFsbCgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tZmlsdGVyXS5ybS1maWx0ZXItLWRlc2t0b3AnKS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIGNsb3NlRmlsdGVySXRlbXMoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1maWx0ZXJdLnJtLWZpbHRlci0tZGVza3RvcCcpLmZvckVhY2goKGZpbHRlcikgPT4gY2xvc2VGaWx0ZXJJdGVtcyhmaWx0ZXIpKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvblJhZGljYWxNYXJ0RmlsdGVyQWZ0ZXJBamF4JywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1maWx0ZXJdJykuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBmaWx0ZXIuZGF0YXNldC5ybUZpbHRlclJlYWR5ID0gJ2ZhbHNlJztcbiAgICAgICAgICAgIGluaXRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcigocmVjb3JkcykgPT4gcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2Rlc30pID0+IGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIGluaXRBbGwobm9kZSk7XG4gICAgfSkpKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydCwge29uY2U6IHRydWV9KTtcbn0gZWxzZSB7XG4gICAgc3RhcnQoKTtcbn1cbiJdLCJuYW1lcyI6WyJmaWx0ZXJJdGVtcyIsImZpbHRlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtQnV0dG9uIiwiaXRlbSIsInF1ZXJ5U2VsZWN0b3IiLCJpdGVtQ29udGVudCIsIml0ZW1JbnB1dHMiLCJBcnJheSIsImZyb20iLCJwYXJzZU51bWJlciIsInZhbHVlIiwibm9ybWFsaXplZCIsIlN0cmluZyIsInJlcGxhY2UiLCJudW1iZXIiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJlbmhhbmNlUHJpY2VSYW5nZSIsImZvckVhY2giLCJwcmljZSIsImRhdGFzZXQiLCJybVByaWNlUmFuZ2VSZWFkeSIsImZpZWxkcyIsInNsaWNlIiwibGVuZ3RoIiwiaGludGVkTWluIiwicGxhY2Vob2xkZXIiLCJoaW50ZWRNYXgiLCJjdXJyZW50TWluIiwiY3VycmVudE1heCIsIm1pbmltdW0iLCJtYXhpbXVtIiwiTWF0aCIsIm1heCIsInN0ZXAiLCJyYW5nZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImNsb3Nlc3QiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJjbGVhckNvbnRyb2wiLCJiZWZvcmUiLCJhcHBlbmQiLCJmcm9tUmFuZ2UiLCJ0b1JhbmdlIiwiZmlsbCIsImRyYXciLCJ0byIsInNwYW4iLCJzdHlsZSIsImxlZnQiLCJyaWdodCIsInN5bmNSYW5nZXNGcm9tRmllbGRzIiwibWluIiwic3luY0ZpZWxkc0Zyb21SYW5nZXMiLCJjaGFuZ2VkIiwiZmllbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiY29udHJvbCIsImlucHV0SXNBY3RpdmUiLCJpbnB1dCIsInR5cGUiLCJjaGVja2VkIiwibmFtZSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwiaGFzIiwiZ2V0QWxsIiwic29tZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwic2VsZWN0ZWRPcHRpb25zIiwib3B0aW9uIiwiZGVmYXVsdFZhbHVlIiwidXBkYXRlRmlsdGVyQ291bnRzIiwiYnV0dG9uIiwiY291bnQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJiYWRnZSIsInNob3dBY3RpdmVDb3VudCIsInJlbW92ZSIsImhpZGRlbiIsIm9taXRFbXB0eUZvcm1Db250cm9scyIsImZvcm0iLCJjb250cm9scyIsImRpc2FibGVkIiwic2V0VGltZW91dCIsImNsb3NlRmlsdGVySXRlbXMiLCJleGNlcHQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJzZXRBdHRyaWJ1dGUiLCJzZXRGaWx0ZXJNb2RlIiwiZGVza3RvcCIsImNvbGxhcHNlIiwicmVtb3ZlUHJvcGVydHkiLCJleHBhbmRlZCIsImNvbnRhaW5zIiwicm1Nb2JpbGVQcmVwYXJlZCIsImluaXRpYWwiLCJtb2JpbGVJbml0aWFsT3BlbiIsIml0ZW1zIiwiYWN0aXZlSXRlbXMiLCJvcGVuSXRlbXMiLCJvcGVuIiwiaW5jbHVkZXMiLCJjb250ZW50IiwiaW5pdEZpbHRlciIsInJtRmlsdGVyUmVhZHkiLCJwcmVzZW50YXRpb24iLCJicmVha3BvaW50IiwibWVkaWEiLCJtYXRjaE1lZGlhIiwiZGVza3RvcE1vZGUiLCJtYXRjaGVzIiwiYXBwbHlNb2RlIiwiZXZlbnQiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIndpbGxPcGVuIiwic3VibWl0VGltZXIiLCJjbG9zZU9uQ2hhbmdlIiwiYXV0b1N1Ym1pdCIsImNsZWFyVGltZW91dCIsInJlcXVlc3RTdWJtaXQiLCJhdXRvU3VibWl0RGVsYXkiLCJzaG93Q2F0YWxvZ1BhbmVsIiwibWVudSIsInBhbmVsSWQiLCJDU1MiLCJlc2NhcGUiLCJwYW5lbCIsImFjdGl2ZSIsImZvY3VzIiwicHJldmVudFNjcm9sbCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImluaXRDYXRhbG9nTWVudSIsInJtQ2F0YWxvZ01lbnVSZWFkeSIsImZvcndhcmQiLCJiYWNrIiwiaW5pdGlhbFBhbmVsIiwiaW5pdEFsbCIsInJvb3QiLCJzdGFydCIsImtleSIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJyZWNvcmRzIiwiX3JlZiIsImFkZGVkTm9kZXMiLCJub2RlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwib2JzZXJ2ZSIsImRvY3VtZW50RWxlbWVudCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJyZWFkeVN0YXRlIiwib25jZSJdLCJzb3VyY2VSb290IjoiIn0=
