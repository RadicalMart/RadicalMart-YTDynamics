/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/toolbar.scss"
/*!**************************!*\
  !*** ./src/toolbar.scss ***!
  \**************************/
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
/*!*************************!*\
  !*** ./src/toolbar.es6 ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toolbar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbar.scss */ "./src/toolbar.scss");
/* harmony import */ var _toolbar_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_toolbar_scss__WEBPACK_IMPORTED_MODULE_0__);

const COOKIE_TTL = 7 * 24 * 60 * 60 * 1000;
const LAYOUTS = new Set(['tile', 'compact', 'list', 'price']);
const CONTROL_SELECTOR = '[data-rm-ordering-element], [data-rm-layout-switcher]';
// RadicalMart itself still consumes grid/list/table from the shared cookie.
// Its fallback remains a valid grid even when YTDynamics selects compact.
const RADICALMART_LAYOUTS = {
  tile: 'grid',
  compact: 'grid',
  list: 'list',
  price: 'table'
};
const setCookie = (name, value, path) => {
  if (!name) {
    return;
  }
  const cookiePath = path?.startsWith('/') ? path.replace(/[;\r\n]/g, '') : '/';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${new Date(Date.now() + COOKIE_TTL).toUTCString()}; path=${cookiePath}; SameSite=Lax${secure}`;
};
const clearCookie = (name, path) => {
  if (!name) return;
  const cookiePath = path?.startsWith('/') ? path.replace(/[;\r\n]/g, '') : '/';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${cookiePath}; SameSite=Lax${secure}`;
};
const visibleLayouts = toolbar => new Set((toolbar.dataset.rmLayouts || '').split(',').filter(Boolean));
const productData = item => {
  try {
    return JSON.parse(item.querySelector('.rm-product-card__data')?.textContent || '{}');
  } catch (error) {
    return {};
  }
};
const compareProducts = (ordering, left, right) => {
  const a = productData(left);
  const b = productData(right);
  switch (ordering) {
    case 'ordering_price ASC':
      return Number(a.price?.finalValue || 0) - Number(b.price?.finalValue || 0);
    case 'ordering_price DESC':
      return Number(b.price?.finalValue || 0) - Number(a.price?.finalValue || 0);
    case 'ordering_title ASC':
      return String(a.title || '').localeCompare(String(b.title || ''), document.documentElement.lang || undefined);
    case 'ordering_date DESC':
      // Product IDs are monotonically assigned and are the only stable
      // date proxy available to arbitrary static Builder collections.
      return Number(b.id || 0) - Number(a.id || 0);
    default:
      return Number(left.dataset.rmOriginalOrder || 0) - Number(right.dataset.rmOriginalOrder || 0);
  }
};
const sortBuilderCollections = ordering => {
  const groups = new Map();
  document.querySelectorAll('[data-rm-product-scope]').forEach(scope => {
    const item = scope.closest('.el-item');
    // YOOtheme Grid wraps every .el-item in a generated grid cell. Reorder
    // those cells, not the inner cards, so UIkit can recalculate columns.
    const cell = item?.parentElement;
    const parent = cell?.parentElement;
    if (!item || !cell || !parent || cell.parentElement !== parent) return;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(cell);
  });
  groups.forEach((items, parent) => {
    items.forEach((item, index) => {
      if (!item.dataset.rmOriginalOrder) item.dataset.rmOriginalOrder = String(index);
    });
    [...new Set(items)].sort((a, b) => compareProducts(ordering, a, b)).forEach(item => parent.append(item));
  });
};
const selectLayout = (toolbar, layout) => {
  if (!LAYOUTS.has(layout) || !visibleLayouts(toolbar).has(layout)) return;
  toolbar.querySelectorAll('[data-rm-layout]').forEach(layoutButton => {
    const active = layoutButton.dataset.rmLayout === layout;
    layoutButton.setAttribute('aria-pressed', active ? 'true' : 'false');
    layoutButton.closest('li')?.classList.toggle('uk-active', active);
  });
  const mobileSelect = toolbar.querySelector('.rm-toolbar__layout-select');
  if (mobileSelect) mobileSelect.value = layout;
  setCookie(toolbar.dataset.modeCookie, layout, toolbar.dataset.cookiePath);
  setCookie(toolbar.dataset.layoutCookie, RADICALMART_LAYOUTS[layout], toolbar.dataset.cookiePath);
  const url = new URL(window.location.href);
  url.searchParams.delete('start');
  url.searchParams.delete(toolbar.dataset.modeCookie);
  url.searchParams.delete(toolbar.dataset.layoutCookie);
  window.location.assign(url.toString());
};
const syncNativeSwitcher = () => {
  const nativeSwitcher = window.setProductsListTemplate;
  if (typeof nativeSwitcher !== 'function' || nativeSwitcher.rmYTDynamicsSynced) return;
  const syncedSwitcher = function () {
    document.querySelectorAll(CONTROL_SELECTOR).forEach(control => {
      clearCookie(control.dataset.modeCookie, control.dataset.cookiePath);
    });
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return nativeSwitcher.apply(this, args);
  };
  syncedSwitcher.rmYTDynamicsSynced = true;
  window.setProductsListTemplate = syncedSwitcher;
};
const closeOrdering = toolbar => {
  const control = toolbar.querySelector('.rm-toolbar__ordering-control');
  control?.classList.remove('is-open');
  control?.querySelector('.rm-toolbar__ordering-toggle')?.setAttribute('aria-expanded', 'false');
};
const selectOrdering = (toolbar, value) => {
  const select = toolbar.querySelector('.rm-toolbar__select');
  if (!select || !Array.from(select.options).some(option => option.value === value)) return;
  select.value = value;
  toolbar.querySelector('.rm-toolbar__ordering-value').textContent = select.selectedOptions[0]?.textContent.trim() || '';
  toolbar.querySelectorAll('[data-rm-ordering]').forEach(option => {
    const active = option.dataset.rmOrdering === value;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  closeOrdering(toolbar);
  setCookie(toolbar.dataset.orderingCookie, value, toolbar.dataset.cookiePath);
  const url = new URL(window.location.href);
  url.searchParams.delete('start');
  window.location.assign(url.toString());
};
const initControl = control => {
  if (control.dataset.rmToolbarReady === 'true') {
    return;
  }
  control.dataset.rmToolbarReady = 'true';
  const orderingSelect = control.querySelector('.rm-toolbar__select');
  if (orderingSelect) sortBuilderCollections(orderingSelect.value || 'ordering ASC');
  control.addEventListener('click', event => {
    const orderingToggle = event.target.closest('.rm-toolbar__ordering-toggle');
    if (orderingToggle && control.contains(orderingToggle)) {
      const orderingControl = orderingToggle.closest('.rm-toolbar__ordering-control');
      const open = !orderingControl.classList.contains('is-open');
      document.querySelectorAll(CONTROL_SELECTOR).forEach(closeOrdering);
      orderingControl.classList.toggle('is-open', open);
      orderingToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    const orderingOption = event.target.closest('[data-rm-ordering]');
    if (orderingOption && control.contains(orderingOption)) {
      selectOrdering(control, orderingOption.dataset.rmOrdering);
      return;
    }
    const button = event.target.closest('[data-rm-layout]');
    if (!button || !control.contains(button)) {
      return;
    }
    selectLayout(control, button.dataset.rmLayout);
  });
  control.querySelector('.rm-toolbar__layout-select')?.addEventListener('change', event => {
    selectLayout(control, event.target.value);
  });
  orderingSelect?.addEventListener('change', event => {
    selectOrdering(control, event.target.value);
  });
};
const initControls = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.(CONTROL_SELECTOR)) {
    initControl(root);
  }
  root.querySelectorAll?.(CONTROL_SELECTOR).forEach(initControl);
};
const start = () => {
  initControls();
  syncNativeSwitcher();
  document.addEventListener('click', event => {
    document.querySelectorAll(CONTROL_SELECTOR).forEach(control => {
      if (!control.contains(event.target)) closeOrdering(control);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll(CONTROL_SELECTOR).forEach(closeOrdering);
  });
  new MutationObserver(records => records.forEach(_ref => {
    let {
      addedNodes
    } = _ref;
    return addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        initControls(node);
        syncNativeSwitcher();
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3RFLENBQUMsTUFBTTtFQUNIZCxLQUFLLENBQUMsQ0FBQztBQUNYLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdG9vbGJhci5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdG9vbGJhci5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3Rvb2xiYXIuc2Nzcyc7XG5cbmNvbnN0IENPT0tJRV9UVEwgPSA3ICogMjQgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IExBWU9VVFMgPSBuZXcgU2V0KFsndGlsZScsICdjb21wYWN0JywgJ2xpc3QnLCAncHJpY2UnXSk7XG5jb25zdCBDT05UUk9MX1NFTEVDVE9SID0gJ1tkYXRhLXJtLW9yZGVyaW5nLWVsZW1lbnRdLCBbZGF0YS1ybS1sYXlvdXQtc3dpdGNoZXJdJztcbi8vIFJhZGljYWxNYXJ0IGl0c2VsZiBzdGlsbCBjb25zdW1lcyBncmlkL2xpc3QvdGFibGUgZnJvbSB0aGUgc2hhcmVkIGNvb2tpZS5cbi8vIEl0cyBmYWxsYmFjayByZW1haW5zIGEgdmFsaWQgZ3JpZCBldmVuIHdoZW4gWVREeW5hbWljcyBzZWxlY3RzIGNvbXBhY3QuXG5jb25zdCBSQURJQ0FMTUFSVF9MQVlPVVRTID0ge3RpbGU6ICdncmlkJywgY29tcGFjdDogJ2dyaWQnLCBsaXN0OiAnbGlzdCcsIHByaWNlOiAndGFibGUnfTtcblxuY29uc3Qgc2V0Q29va2llID0gKG5hbWUsIHZhbHVlLCBwYXRoKSA9PiB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb29raWVQYXRoID0gcGF0aD8uc3RhcnRzV2l0aCgnLycpID8gcGF0aC5yZXBsYWNlKC9bO1xcclxcbl0vZywgJycpIDogJy8nO1xuICAgIGNvbnN0IHNlY3VyZSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnOyBTZWN1cmUnIDogJyc7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9OyBleHBpcmVzPSR7bmV3IERhdGUoRGF0ZS5ub3coKSArIENPT0tJRV9UVEwpLnRvVVRDU3RyaW5nKCl9OyBwYXRoPSR7Y29va2llUGF0aH07IFNhbWVTaXRlPUxheCR7c2VjdXJlfWA7XG59O1xuXG5jb25zdCBjbGVhckNvb2tpZSA9IChuYW1lLCBwYXRoKSA9PiB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm47XG4gICAgY29uc3QgY29va2llUGF0aCA9IHBhdGg/LnN0YXJ0c1dpdGgoJy8nKSA/IHBhdGgucmVwbGFjZSgvWztcXHJcXG5dL2csICcnKSA6ICcvJztcbiAgICBjb25zdCBzZWN1cmUgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonID8gJzsgU2VjdXJlJyA6ICcnO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UOyBwYXRoPSR7Y29va2llUGF0aH07IFNhbWVTaXRlPUxheCR7c2VjdXJlfWA7XG59O1xuXG5jb25zdCB2aXNpYmxlTGF5b3V0cyA9ICh0b29sYmFyKSA9PiBuZXcgU2V0KCh0b29sYmFyLmRhdGFzZXQucm1MYXlvdXRzIHx8ICcnKS5zcGxpdCgnLCcpLmZpbHRlcihCb29sZWFuKSk7XG5cbmNvbnN0IHByb2R1Y3REYXRhID0gKGl0ZW0pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWNhcmRfX2RhdGEnKT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn07XG5cbmNvbnN0IGNvbXBhcmVQcm9kdWN0cyA9IChvcmRlcmluZywgbGVmdCwgcmlnaHQpID0+IHtcbiAgICBjb25zdCBhID0gcHJvZHVjdERhdGEobGVmdCk7XG4gICAgY29uc3QgYiA9IHByb2R1Y3REYXRhKHJpZ2h0KTtcblxuICAgIHN3aXRjaCAob3JkZXJpbmcpIHtcbiAgICAgICAgY2FzZSAnb3JkZXJpbmdfcHJpY2UgQVNDJzpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYS5wcmljZT8uZmluYWxWYWx1ZSB8fCAwKSAtIE51bWJlcihiLnByaWNlPy5maW5hbFZhbHVlIHx8IDApO1xuICAgICAgICBjYXNlICdvcmRlcmluZ19wcmljZSBERVNDJzpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYi5wcmljZT8uZmluYWxWYWx1ZSB8fCAwKSAtIE51bWJlcihhLnByaWNlPy5maW5hbFZhbHVlIHx8IDApO1xuICAgICAgICBjYXNlICdvcmRlcmluZ190aXRsZSBBU0MnOlxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhhLnRpdGxlIHx8ICcnKS5sb2NhbGVDb21wYXJlKFN0cmluZyhiLnRpdGxlIHx8ICcnKSwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgY2FzZSAnb3JkZXJpbmdfZGF0ZSBERVNDJzpcbiAgICAgICAgICAgIC8vIFByb2R1Y3QgSURzIGFyZSBtb25vdG9uaWNhbGx5IGFzc2lnbmVkIGFuZCBhcmUgdGhlIG9ubHkgc3RhYmxlXG4gICAgICAgICAgICAvLyBkYXRlIHByb3h5IGF2YWlsYWJsZSB0byBhcmJpdHJhcnkgc3RhdGljIEJ1aWxkZXIgY29sbGVjdGlvbnMuXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGIuaWQgfHwgMCkgLSBOdW1iZXIoYS5pZCB8fCAwKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIobGVmdC5kYXRhc2V0LnJtT3JpZ2luYWxPcmRlciB8fCAwKSAtIE51bWJlcihyaWdodC5kYXRhc2V0LnJtT3JpZ2luYWxPcmRlciB8fCAwKTtcbiAgICB9XG59O1xuXG5jb25zdCBzb3J0QnVpbGRlckNvbGxlY3Rpb25zID0gKG9yZGVyaW5nKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJykuZm9yRWFjaCgoc2NvcGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHNjb3BlLmNsb3Nlc3QoJy5lbC1pdGVtJyk7XG4gICAgICAgIC8vIFlPT3RoZW1lIEdyaWQgd3JhcHMgZXZlcnkgLmVsLWl0ZW0gaW4gYSBnZW5lcmF0ZWQgZ3JpZCBjZWxsLiBSZW9yZGVyXG4gICAgICAgIC8vIHRob3NlIGNlbGxzLCBub3QgdGhlIGlubmVyIGNhcmRzLCBzbyBVSWtpdCBjYW4gcmVjYWxjdWxhdGUgY29sdW1ucy5cbiAgICAgICAgY29uc3QgY2VsbCA9IGl0ZW0/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGNlbGw/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmICghaXRlbSB8fCAhY2VsbCB8fCAhcGFyZW50IHx8IGNlbGwucGFyZW50RWxlbWVudCAhPT0gcGFyZW50KSByZXR1cm47XG4gICAgICAgIGlmICghZ3JvdXBzLmhhcyhwYXJlbnQpKSBncm91cHMuc2V0KHBhcmVudCwgW10pO1xuICAgICAgICBncm91cHMuZ2V0KHBhcmVudCkucHVzaChjZWxsKTtcbiAgICB9KTtcblxuICAgIGdyb3Vwcy5mb3JFYWNoKChpdGVtcywgcGFyZW50KSA9PiB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5ybU9yaWdpbmFsT3JkZXIpIGl0ZW0uZGF0YXNldC5ybU9yaWdpbmFsT3JkZXIgPSBTdHJpbmcoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgWy4uLm5ldyBTZXQoaXRlbXMpXS5zb3J0KChhLCBiKSA9PiBjb21wYXJlUHJvZHVjdHMob3JkZXJpbmcsIGEsIGIpKS5mb3JFYWNoKChpdGVtKSA9PiBwYXJlbnQuYXBwZW5kKGl0ZW0pKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHNlbGVjdExheW91dCA9ICh0b29sYmFyLCBsYXlvdXQpID0+IHtcbiAgICBpZiAoIUxBWU9VVFMuaGFzKGxheW91dCkgfHwgIXZpc2libGVMYXlvdXRzKHRvb2xiYXIpLmhhcyhsYXlvdXQpKSByZXR1cm47XG5cbiAgICB0b29sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLWxheW91dF0nKS5mb3JFYWNoKChsYXlvdXRCdXR0b24pID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gbGF5b3V0QnV0dG9uLmRhdGFzZXQucm1MYXlvdXQgPT09IGxheW91dDtcbiAgICAgICAgbGF5b3V0QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgYWN0aXZlID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIGxheW91dEJ1dHRvbi5jbG9zZXN0KCdsaScpPy5jbGFzc0xpc3QudG9nZ2xlKCd1ay1hY3RpdmUnLCBhY3RpdmUpO1xuICAgIH0pO1xuICAgIGNvbnN0IG1vYmlsZVNlbGVjdCA9IHRvb2xiYXIucXVlcnlTZWxlY3RvcignLnJtLXRvb2xiYXJfX2xheW91dC1zZWxlY3QnKTtcbiAgICBpZiAobW9iaWxlU2VsZWN0KSBtb2JpbGVTZWxlY3QudmFsdWUgPSBsYXlvdXQ7XG5cbiAgICBzZXRDb29raWUodG9vbGJhci5kYXRhc2V0Lm1vZGVDb29raWUsIGxheW91dCwgdG9vbGJhci5kYXRhc2V0LmNvb2tpZVBhdGgpO1xuICAgIHNldENvb2tpZSh0b29sYmFyLmRhdGFzZXQubGF5b3V0Q29va2llLCBSQURJQ0FMTUFSVF9MQVlPVVRTW2xheW91dF0sIHRvb2xiYXIuZGF0YXNldC5jb29raWVQYXRoKTtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnc3RhcnQnKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSh0b29sYmFyLmRhdGFzZXQubW9kZUNvb2tpZSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUodG9vbGJhci5kYXRhc2V0LmxheW91dENvb2tpZSk7XG4gICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih1cmwudG9TdHJpbmcoKSk7XG59O1xuXG5jb25zdCBzeW5jTmF0aXZlU3dpdGNoZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmF0aXZlU3dpdGNoZXIgPSB3aW5kb3cuc2V0UHJvZHVjdHNMaXN0VGVtcGxhdGU7XG4gICAgaWYgKHR5cGVvZiBuYXRpdmVTd2l0Y2hlciAhPT0gJ2Z1bmN0aW9uJyB8fCBuYXRpdmVTd2l0Y2hlci5ybVlURHluYW1pY3NTeW5jZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHN5bmNlZFN3aXRjaGVyID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDT05UUk9MX1NFTEVDVE9SKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICBjbGVhckNvb2tpZShjb250cm9sLmRhdGFzZXQubW9kZUNvb2tpZSwgY29udHJvbC5kYXRhc2V0LmNvb2tpZVBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVN3aXRjaGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gICAgc3luY2VkU3dpdGNoZXIucm1ZVER5bmFtaWNzU3luY2VkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0UHJvZHVjdHNMaXN0VGVtcGxhdGUgPSBzeW5jZWRTd2l0Y2hlcjtcbn07XG5cbmNvbnN0IGNsb3NlT3JkZXJpbmcgPSAodG9vbGJhcikgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0b29sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5ybS10b29sYmFyX19vcmRlcmluZy1jb250cm9sJyk7XG4gICAgY29udHJvbD8uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgIGNvbnRyb2w/LnF1ZXJ5U2VsZWN0b3IoJy5ybS10b29sYmFyX19vcmRlcmluZy10b2dnbGUnKT8uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG59O1xuXG5jb25zdCBzZWxlY3RPcmRlcmluZyA9ICh0b29sYmFyLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IHRvb2xiYXIucXVlcnlTZWxlY3RvcignLnJtLXRvb2xiYXJfX3NlbGVjdCcpO1xuICAgIGlmICghc2VsZWN0IHx8ICFBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpKSByZXR1cm47XG5cbiAgICBzZWxlY3QudmFsdWUgPSB2YWx1ZTtcbiAgICB0b29sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5ybS10b29sYmFyX19vcmRlcmluZy12YWx1ZScpLnRleHRDb250ZW50ID0gc2VsZWN0LnNlbGVjdGVkT3B0aW9uc1swXT8udGV4dENvbnRlbnQudHJpbSgpIHx8ICcnO1xuICAgIHRvb2xiYXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tb3JkZXJpbmddJykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IG9wdGlvbi5kYXRhc2V0LnJtT3JkZXJpbmcgPT09IHZhbHVlO1xuICAgICAgICBvcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJywgYWN0aXZlKTtcbiAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGFjdGl2ZSA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgIH0pO1xuICAgIGNsb3NlT3JkZXJpbmcodG9vbGJhcik7XG4gICAgc2V0Q29va2llKHRvb2xiYXIuZGF0YXNldC5vcmRlcmluZ0Nvb2tpZSwgdmFsdWUsIHRvb2xiYXIuZGF0YXNldC5jb29raWVQYXRoKTtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnc3RhcnQnKTtcbiAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHVybC50b1N0cmluZygpKTtcbn07XG5cbmNvbnN0IGluaXRDb250cm9sID0gKGNvbnRyb2wpID0+IHtcbiAgICBpZiAoY29udHJvbC5kYXRhc2V0LnJtVG9vbGJhclJlYWR5ID09PSAndHJ1ZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnRyb2wuZGF0YXNldC5ybVRvb2xiYXJSZWFkeSA9ICd0cnVlJztcbiAgICBjb25zdCBvcmRlcmluZ1NlbGVjdCA9IGNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJtLXRvb2xiYXJfX3NlbGVjdCcpO1xuICAgIGlmIChvcmRlcmluZ1NlbGVjdCkgc29ydEJ1aWxkZXJDb2xsZWN0aW9ucyhvcmRlcmluZ1NlbGVjdC52YWx1ZSB8fCAnb3JkZXJpbmcgQVNDJyk7XG5cbiAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cdFx0Y29uc3Qgb3JkZXJpbmdUb2dnbGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnJtLXRvb2xiYXJfX29yZGVyaW5nLXRvZ2dsZScpO1xuXHRcdGlmIChvcmRlcmluZ1RvZ2dsZSAmJiBjb250cm9sLmNvbnRhaW5zKG9yZGVyaW5nVG9nZ2xlKSkge1xuXHRcdFx0Y29uc3Qgb3JkZXJpbmdDb250cm9sID0gb3JkZXJpbmdUb2dnbGUuY2xvc2VzdCgnLnJtLXRvb2xiYXJfX29yZGVyaW5nLWNvbnRyb2wnKTtcblx0XHRcdGNvbnN0IG9wZW4gPSAhb3JkZXJpbmdDb250cm9sLmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpO1xuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDT05UUk9MX1NFTEVDVE9SKS5mb3JFYWNoKGNsb3NlT3JkZXJpbmcpO1xuXHRcdFx0b3JkZXJpbmdDb250cm9sLmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW4nLCBvcGVuKTtcblx0XHRcdG9yZGVyaW5nVG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4gPyAndHJ1ZScgOiAnZmFsc2UnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBvcmRlcmluZ09wdGlvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1vcmRlcmluZ10nKTtcblx0XHRpZiAob3JkZXJpbmdPcHRpb24gJiYgY29udHJvbC5jb250YWlucyhvcmRlcmluZ09wdGlvbikpIHtcblx0XHRcdHNlbGVjdE9yZGVyaW5nKGNvbnRyb2wsIG9yZGVyaW5nT3B0aW9uLmRhdGFzZXQucm1PcmRlcmluZyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1sYXlvdXRdJyk7XG4gICAgICAgIGlmICghYnV0dG9uIHx8ICFjb250cm9sLmNvbnRhaW5zKGJ1dHRvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cdFx0c2VsZWN0TGF5b3V0KGNvbnRyb2wsIGJ1dHRvbi5kYXRhc2V0LnJtTGF5b3V0KTtcbiAgICB9KTtcblxuICAgIGNvbnRyb2wucXVlcnlTZWxlY3RvcignLnJtLXRvb2xiYXJfX2xheW91dC1zZWxlY3QnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHNlbGVjdExheW91dChjb250cm9sLCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgb3JkZXJpbmdTZWxlY3Q/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICBzZWxlY3RPcmRlcmluZyhjb250cm9sLCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH0pO1xufTtcblxuY29uc3QgaW5pdENvbnRyb2xzID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LihDT05UUk9MX1NFTEVDVE9SKSkge1xuICAgICAgICBpbml0Q29udHJvbChyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LihDT05UUk9MX1NFTEVDVE9SKS5mb3JFYWNoKGluaXRDb250cm9sKTtcbn07XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIGluaXRDb250cm9scygpO1xuICAgIHN5bmNOYXRpdmVTd2l0Y2hlcigpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoQ09OVFJPTF9TRUxFQ1RPUikuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIGNsb3NlT3JkZXJpbmcoY29udHJvbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VzY2FwZScpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDT05UUk9MX1NFTEVDVE9SKS5mb3JFYWNoKGNsb3NlT3JkZXJpbmcpO1xuICAgIH0pO1xuICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKChyZWNvcmRzKSA9PiByZWNvcmRzLmZvckVhY2goKHthZGRlZE5vZGVzfSkgPT4gYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgaW5pdENvbnRyb2xzKG5vZGUpO1xuICAgICAgICAgICAgc3luY05hdGl2ZVN3aXRjaGVyKCk7XG4gICAgICAgIH1cbiAgICB9KSkpLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHN0YXJ0LCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBzdGFydCgpO1xufVxuIl0sIm5hbWVzIjpbIkNPT0tJRV9UVEwiLCJMQVlPVVRTIiwiU2V0IiwiQ09OVFJPTF9TRUxFQ1RPUiIsIlJBRElDQUxNQVJUX0xBWU9VVFMiLCJ0aWxlIiwiY29tcGFjdCIsImxpc3QiLCJwcmljZSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsInBhdGgiLCJjb29raWVQYXRoIiwic3RhcnRzV2l0aCIsInJlcGxhY2UiLCJzZWN1cmUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiZG9jdW1lbnQiLCJjb29raWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJEYXRlIiwibm93IiwidG9VVENTdHJpbmciLCJjbGVhckNvb2tpZSIsInZpc2libGVMYXlvdXRzIiwidG9vbGJhciIsImRhdGFzZXQiLCJybUxheW91dHMiLCJzcGxpdCIsImZpbHRlciIsIkJvb2xlYW4iLCJwcm9kdWN0RGF0YSIsIml0ZW0iLCJKU09OIiwicGFyc2UiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJlcnJvciIsImNvbXBhcmVQcm9kdWN0cyIsIm9yZGVyaW5nIiwibGVmdCIsInJpZ2h0IiwiYSIsImIiLCJOdW1iZXIiLCJmaW5hbFZhbHVlIiwiU3RyaW5nIiwidGl0bGUiLCJsb2NhbGVDb21wYXJlIiwiZG9jdW1lbnRFbGVtZW50IiwibGFuZyIsInVuZGVmaW5lZCIsImlkIiwicm1PcmlnaW5hbE9yZGVyIiwic29ydEJ1aWxkZXJDb2xsZWN0aW9ucyIsImdyb3VwcyIsIk1hcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2NvcGUiLCJjbG9zZXN0IiwiY2VsbCIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnQiLCJoYXMiLCJzZXQiLCJnZXQiLCJwdXNoIiwiaXRlbXMiLCJpbmRleCIsInNvcnQiLCJhcHBlbmQiLCJzZWxlY3RMYXlvdXQiLCJsYXlvdXQiLCJsYXlvdXRCdXR0b24iLCJhY3RpdmUiLCJybUxheW91dCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1vYmlsZVNlbGVjdCIsIm1vZGVDb29raWUiLCJsYXlvdXRDb29raWUiLCJ1cmwiLCJVUkwiLCJocmVmIiwic2VhcmNoUGFyYW1zIiwiZGVsZXRlIiwiYXNzaWduIiwidG9TdHJpbmciLCJzeW5jTmF0aXZlU3dpdGNoZXIiLCJuYXRpdmVTd2l0Y2hlciIsInNldFByb2R1Y3RzTGlzdFRlbXBsYXRlIiwicm1ZVER5bmFtaWNzU3luY2VkIiwic3luY2VkU3dpdGNoZXIiLCJjb250cm9sIiwiX2xlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJhcHBseSIsImNsb3NlT3JkZXJpbmciLCJyZW1vdmUiLCJzZWxlY3RPcmRlcmluZyIsInNlbGVjdCIsImZyb20iLCJvcHRpb25zIiwic29tZSIsIm9wdGlvbiIsInNlbGVjdGVkT3B0aW9ucyIsInRyaW0iLCJybU9yZGVyaW5nIiwib3JkZXJpbmdDb29raWUiLCJpbml0Q29udHJvbCIsInJtVG9vbGJhclJlYWR5Iiwib3JkZXJpbmdTZWxlY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvcmRlcmluZ1RvZ2dsZSIsInRhcmdldCIsImNvbnRhaW5zIiwib3JkZXJpbmdDb250cm9sIiwib3BlbiIsIm9yZGVyaW5nT3B0aW9uIiwiYnV0dG9uIiwiaW5pdENvbnRyb2xzIiwicm9vdCIsIm1hdGNoZXMiLCJzdGFydCIsImtleSIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJyZWNvcmRzIiwiX3JlZiIsImFkZGVkTm9kZXMiLCJub2RlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJyZWFkeVN0YXRlIiwib25jZSJdLCJzb3VyY2VSb290IjoiIn0=
