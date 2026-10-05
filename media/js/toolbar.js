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
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


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
const selectOrdering = (toolbar, value) => {
  const select = toolbar.querySelector('.rm-toolbar__select');
  if (!select || !Array.from(select.options).some(option => option.value === value)) return;
  select.value = value;
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
  (0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(node => {
    initControls(node);
    syncNativeSwitcher();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBLElBQUksQ0FBQzFELGdCQUFnQixHQUFHckQsZ0JBQWdCLENBQUMsQ0FBQzFCLE9BQU8sQ0FBQ2dJLFdBQVcsQ0FBQztBQUNsRSxDQUFDO0FBRUQsTUFBTTlILEtBQUssR0FBR0EsQ0FBQSxLQUFNO0VBQ2hCc0ksWUFBWSxDQUFDLENBQUM7RUFDZDFCLGtCQUFrQixDQUFDLENBQUM7RUFDcEI5RixtRUFBcUIsQ0FBRWpCLElBQUksSUFBSztJQUM1QnlJLFlBQVksQ0FBQ3pJLElBQUksQ0FBQztJQUNsQitHLGtCQUFrQixDQUFDLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELElBQUkzRyxRQUFRLENBQUN3SSxVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DeEksUUFBUSxDQUFDZ0ksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVqSSxLQUFLLEVBQUU7SUFBQzBJLElBQUksRUFBRTtFQUFJLENBQUMsQ0FBQztBQUN0RSxDQUFDLE1BQU07RUFDSDFJLEtBQUssQ0FBQyxDQUFDO0FBQ1gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9ydW50aW1lLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdG9vbGJhci5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdG9vbGJhci5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUlVOVElNRV9LRVkgPSAnX19ZVER5bmFtaWNzRG9tUnVudGltZSc7XG5cbmNvbnN0IHJ1bnRpbWUgPSB3aW5kb3dbUlVOVElNRV9LRVldIHx8IHtcbiAgICBhZGRlZDogbmV3IFNldCgpLFxuICAgIHJlbW92ZWQ6IG5ldyBTZXQoKSxcbiAgICBvYnNlcnZlcjogbnVsbCxcbn07XG5cbndpbmRvd1tSVU5USU1FX0tFWV0gPSBydW50aW1lO1xuXG5jb25zdCB2aXNpdCA9IChjYWxsYmFja3MsIG5vZGUpID0+IGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobm9kZSkpO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpZiAocnVudGltZS5vYnNlcnZlciB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XG5cbiAgICBydW50aW1lLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLmFkZGVkLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHZpc2l0KHJ1bnRpbWUucmVtb3ZlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcnVudGltZS5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9ic2VydmVEeW5hbWljQ29udGVudCA9IChvbkFkZGVkLCBvblJlbW92ZWQgPSBudWxsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmFkZChvbkFkZGVkKTtcbiAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmFkZChvblJlbW92ZWQpO1xuICAgIHN0YXJ0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUuYWRkZWQuZGVsZXRlKG9uQWRkZWQpO1xuICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmRlbGV0ZShvblJlbW92ZWQpO1xuICAgIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3Rvb2xiYXIuc2Nzcyc7XG5pbXBvcnQge29ic2VydmVEeW5hbWljQ29udGVudH0gZnJvbSAnLi9ydW50aW1lLmVzNic7XG5cbmNvbnN0IENPT0tJRV9UVEwgPSA3ICogMjQgKiA2MCAqIDYwICogMTAwMDtcbmNvbnN0IExBWU9VVFMgPSBuZXcgU2V0KFsndGlsZScsICdjb21wYWN0JywgJ2xpc3QnLCAncHJpY2UnXSk7XG5jb25zdCBDT05UUk9MX1NFTEVDVE9SID0gJ1tkYXRhLXJtLW9yZGVyaW5nLWVsZW1lbnRdLCBbZGF0YS1ybS1sYXlvdXQtc3dpdGNoZXJdJztcbi8vIFJhZGljYWxNYXJ0IGl0c2VsZiBzdGlsbCBjb25zdW1lcyBncmlkL2xpc3QvdGFibGUgZnJvbSB0aGUgc2hhcmVkIGNvb2tpZS5cbi8vIEl0cyBmYWxsYmFjayByZW1haW5zIGEgdmFsaWQgZ3JpZCBldmVuIHdoZW4gWVREeW5hbWljcyBzZWxlY3RzIGNvbXBhY3QuXG5jb25zdCBSQURJQ0FMTUFSVF9MQVlPVVRTID0ge3RpbGU6ICdncmlkJywgY29tcGFjdDogJ2dyaWQnLCBsaXN0OiAnbGlzdCcsIHByaWNlOiAndGFibGUnfTtcblxuY29uc3Qgc2V0Q29va2llID0gKG5hbWUsIHZhbHVlLCBwYXRoKSA9PiB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb29raWVQYXRoID0gcGF0aD8uc3RhcnRzV2l0aCgnLycpID8gcGF0aC5yZXBsYWNlKC9bO1xcclxcbl0vZywgJycpIDogJy8nO1xuICAgIGNvbnN0IHNlY3VyZSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnOyBTZWN1cmUnIDogJyc7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9OyBleHBpcmVzPSR7bmV3IERhdGUoRGF0ZS5ub3coKSArIENPT0tJRV9UVEwpLnRvVVRDU3RyaW5nKCl9OyBwYXRoPSR7Y29va2llUGF0aH07IFNhbWVTaXRlPUxheCR7c2VjdXJlfWA7XG59O1xuXG5jb25zdCBjbGVhckNvb2tpZSA9IChuYW1lLCBwYXRoKSA9PiB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm47XG4gICAgY29uc3QgY29va2llUGF0aCA9IHBhdGg/LnN0YXJ0c1dpdGgoJy8nKSA/IHBhdGgucmVwbGFjZSgvWztcXHJcXG5dL2csICcnKSA6ICcvJztcbiAgICBjb25zdCBzZWN1cmUgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonID8gJzsgU2VjdXJlJyA6ICcnO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UOyBwYXRoPSR7Y29va2llUGF0aH07IFNhbWVTaXRlPUxheCR7c2VjdXJlfWA7XG59O1xuXG5jb25zdCB2aXNpYmxlTGF5b3V0cyA9ICh0b29sYmFyKSA9PiBuZXcgU2V0KCh0b29sYmFyLmRhdGFzZXQucm1MYXlvdXRzIHx8ICcnKS5zcGxpdCgnLCcpLmZpbHRlcihCb29sZWFuKSk7XG5cbmNvbnN0IHByb2R1Y3REYXRhID0gKGl0ZW0pID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWNhcmRfX2RhdGEnKT8udGV4dENvbnRlbnQgfHwgJ3t9Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn07XG5cbmNvbnN0IGNvbXBhcmVQcm9kdWN0cyA9IChvcmRlcmluZywgbGVmdCwgcmlnaHQpID0+IHtcbiAgICBjb25zdCBhID0gcHJvZHVjdERhdGEobGVmdCk7XG4gICAgY29uc3QgYiA9IHByb2R1Y3REYXRhKHJpZ2h0KTtcblxuICAgIHN3aXRjaCAob3JkZXJpbmcpIHtcbiAgICAgICAgY2FzZSAnb3JkZXJpbmdfcHJpY2UgQVNDJzpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYS5wcmljZT8uZmluYWxWYWx1ZSB8fCAwKSAtIE51bWJlcihiLnByaWNlPy5maW5hbFZhbHVlIHx8IDApO1xuICAgICAgICBjYXNlICdvcmRlcmluZ19wcmljZSBERVNDJzpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYi5wcmljZT8uZmluYWxWYWx1ZSB8fCAwKSAtIE51bWJlcihhLnByaWNlPy5maW5hbFZhbHVlIHx8IDApO1xuICAgICAgICBjYXNlICdvcmRlcmluZ190aXRsZSBBU0MnOlxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhhLnRpdGxlIHx8ICcnKS5sb2NhbGVDb21wYXJlKFN0cmluZyhiLnRpdGxlIHx8ICcnKSwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgY2FzZSAnb3JkZXJpbmdfZGF0ZSBERVNDJzpcbiAgICAgICAgICAgIC8vIFByb2R1Y3QgSURzIGFyZSBtb25vdG9uaWNhbGx5IGFzc2lnbmVkIGFuZCBhcmUgdGhlIG9ubHkgc3RhYmxlXG4gICAgICAgICAgICAvLyBkYXRlIHByb3h5IGF2YWlsYWJsZSB0byBhcmJpdHJhcnkgc3RhdGljIEJ1aWxkZXIgY29sbGVjdGlvbnMuXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGIuaWQgfHwgMCkgLSBOdW1iZXIoYS5pZCB8fCAwKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIobGVmdC5kYXRhc2V0LnJtT3JpZ2luYWxPcmRlciB8fCAwKSAtIE51bWJlcihyaWdodC5kYXRhc2V0LnJtT3JpZ2luYWxPcmRlciB8fCAwKTtcbiAgICB9XG59O1xuXG5jb25zdCBzb3J0QnVpbGRlckNvbGxlY3Rpb25zID0gKG9yZGVyaW5nKSA9PiB7XG4gICAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcCgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJykuZm9yRWFjaCgoc2NvcGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHNjb3BlLmNsb3Nlc3QoJy5lbC1pdGVtJyk7XG4gICAgICAgIC8vIFlPT3RoZW1lIEdyaWQgd3JhcHMgZXZlcnkgLmVsLWl0ZW0gaW4gYSBnZW5lcmF0ZWQgZ3JpZCBjZWxsLiBSZW9yZGVyXG4gICAgICAgIC8vIHRob3NlIGNlbGxzLCBub3QgdGhlIGlubmVyIGNhcmRzLCBzbyBVSWtpdCBjYW4gcmVjYWxjdWxhdGUgY29sdW1ucy5cbiAgICAgICAgY29uc3QgY2VsbCA9IGl0ZW0/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGNlbGw/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmICghaXRlbSB8fCAhY2VsbCB8fCAhcGFyZW50IHx8IGNlbGwucGFyZW50RWxlbWVudCAhPT0gcGFyZW50KSByZXR1cm47XG4gICAgICAgIGlmICghZ3JvdXBzLmhhcyhwYXJlbnQpKSBncm91cHMuc2V0KHBhcmVudCwgW10pO1xuICAgICAgICBncm91cHMuZ2V0KHBhcmVudCkucHVzaChjZWxsKTtcbiAgICB9KTtcblxuICAgIGdyb3Vwcy5mb3JFYWNoKChpdGVtcywgcGFyZW50KSA9PiB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGF0YXNldC5ybU9yaWdpbmFsT3JkZXIpIGl0ZW0uZGF0YXNldC5ybU9yaWdpbmFsT3JkZXIgPSBTdHJpbmcoaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgWy4uLm5ldyBTZXQoaXRlbXMpXS5zb3J0KChhLCBiKSA9PiBjb21wYXJlUHJvZHVjdHMob3JkZXJpbmcsIGEsIGIpKS5mb3JFYWNoKChpdGVtKSA9PiBwYXJlbnQuYXBwZW5kKGl0ZW0pKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHNlbGVjdExheW91dCA9ICh0b29sYmFyLCBsYXlvdXQpID0+IHtcbiAgICBpZiAoIUxBWU9VVFMuaGFzKGxheW91dCkgfHwgIXZpc2libGVMYXlvdXRzKHRvb2xiYXIpLmhhcyhsYXlvdXQpKSByZXR1cm47XG5cbiAgICB0b29sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLWxheW91dF0nKS5mb3JFYWNoKChsYXlvdXRCdXR0b24pID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gbGF5b3V0QnV0dG9uLmRhdGFzZXQucm1MYXlvdXQgPT09IGxheW91dDtcbiAgICAgICAgbGF5b3V0QnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgYWN0aXZlID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIGxheW91dEJ1dHRvbi5jbG9zZXN0KCdsaScpPy5jbGFzc0xpc3QudG9nZ2xlKCd1ay1hY3RpdmUnLCBhY3RpdmUpO1xuICAgIH0pO1xuICAgIGNvbnN0IG1vYmlsZVNlbGVjdCA9IHRvb2xiYXIucXVlcnlTZWxlY3RvcignLnJtLXRvb2xiYXJfX2xheW91dC1zZWxlY3QnKTtcbiAgICBpZiAobW9iaWxlU2VsZWN0KSBtb2JpbGVTZWxlY3QudmFsdWUgPSBsYXlvdXQ7XG5cbiAgICBzZXRDb29raWUodG9vbGJhci5kYXRhc2V0Lm1vZGVDb29raWUsIGxheW91dCwgdG9vbGJhci5kYXRhc2V0LmNvb2tpZVBhdGgpO1xuICAgIHNldENvb2tpZSh0b29sYmFyLmRhdGFzZXQubGF5b3V0Q29va2llLCBSQURJQ0FMTUFSVF9MQVlPVVRTW2xheW91dF0sIHRvb2xiYXIuZGF0YXNldC5jb29raWVQYXRoKTtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnc3RhcnQnKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSh0b29sYmFyLmRhdGFzZXQubW9kZUNvb2tpZSk7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUodG9vbGJhci5kYXRhc2V0LmxheW91dENvb2tpZSk7XG4gICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih1cmwudG9TdHJpbmcoKSk7XG59O1xuXG5jb25zdCBzeW5jTmF0aXZlU3dpdGNoZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmF0aXZlU3dpdGNoZXIgPSB3aW5kb3cuc2V0UHJvZHVjdHNMaXN0VGVtcGxhdGU7XG4gICAgaWYgKHR5cGVvZiBuYXRpdmVTd2l0Y2hlciAhPT0gJ2Z1bmN0aW9uJyB8fCBuYXRpdmVTd2l0Y2hlci5ybVlURHluYW1pY3NTeW5jZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHN5bmNlZFN3aXRjaGVyID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDT05UUk9MX1NFTEVDVE9SKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICBjbGVhckNvb2tpZShjb250cm9sLmRhdGFzZXQubW9kZUNvb2tpZSwgY29udHJvbC5kYXRhc2V0LmNvb2tpZVBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVN3aXRjaGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gICAgc3luY2VkU3dpdGNoZXIucm1ZVER5bmFtaWNzU3luY2VkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0UHJvZHVjdHNMaXN0VGVtcGxhdGUgPSBzeW5jZWRTd2l0Y2hlcjtcbn07XG5cbmNvbnN0IHNlbGVjdE9yZGVyaW5nID0gKHRvb2xiYXIsIHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gdG9vbGJhci5xdWVyeVNlbGVjdG9yKCcucm0tdG9vbGJhcl9fc2VsZWN0Jyk7XG4gICAgaWYgKCFzZWxlY3QgfHwgIUFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpLnNvbWUoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZSkpIHJldHVybjtcblxuICAgIHNlbGVjdC52YWx1ZSA9IHZhbHVlO1xuICAgIHNldENvb2tpZSh0b29sYmFyLmRhdGFzZXQub3JkZXJpbmdDb29raWUsIHZhbHVlLCB0b29sYmFyLmRhdGFzZXQuY29va2llUGF0aCk7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ3N0YXJ0Jyk7XG4gICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih1cmwudG9TdHJpbmcoKSk7XG59O1xuXG5jb25zdCBpbml0Q29udHJvbCA9IChjb250cm9sKSA9PiB7XG4gICAgaWYgKGNvbnRyb2wuZGF0YXNldC5ybVRvb2xiYXJSZWFkeSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb250cm9sLmRhdGFzZXQucm1Ub29sYmFyUmVhZHkgPSAndHJ1ZSc7XG4gICAgY29uc3Qgb3JkZXJpbmdTZWxlY3QgPSBjb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ybS10b29sYmFyX19zZWxlY3QnKTtcbiAgICBpZiAob3JkZXJpbmdTZWxlY3QpIHNvcnRCdWlsZGVyQ29sbGVjdGlvbnMob3JkZXJpbmdTZWxlY3QudmFsdWUgfHwgJ29yZGVyaW5nIEFTQycpO1xuXG4gICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcm0tbGF5b3V0XScpO1xuICAgICAgICBpZiAoIWJ1dHRvbiB8fCAhY29udHJvbC5jb250YWlucyhidXR0b24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXHRcdHNlbGVjdExheW91dChjb250cm9sLCBidXR0b24uZGF0YXNldC5ybUxheW91dCk7XG4gICAgfSk7XG5cbiAgICBjb250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5ybS10b29sYmFyX19sYXlvdXQtc2VsZWN0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICBzZWxlY3RMYXlvdXQoY29udHJvbCwgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIG9yZGVyaW5nU2VsZWN0Py5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgc2VsZWN0T3JkZXJpbmcoY29udHJvbCwgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGluaXRDb250cm9scyA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oQ09OVFJPTF9TRUxFQ1RPUikpIHtcbiAgICAgICAgaW5pdENvbnRyb2wocm9vdCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oQ09OVFJPTF9TRUxFQ1RPUikuZm9yRWFjaChpbml0Q29udHJvbCk7XG59O1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpbml0Q29udHJvbHMoKTtcbiAgICBzeW5jTmF0aXZlU3dpdGNoZXIoKTtcbiAgICBvYnNlcnZlRHluYW1pY0NvbnRlbnQoKG5vZGUpID0+IHtcbiAgICAgICAgaW5pdENvbnRyb2xzKG5vZGUpO1xuICAgICAgICBzeW5jTmF0aXZlU3dpdGNoZXIoKTtcbiAgICB9KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnQsIHtvbmNlOiB0cnVlfSk7XG59IGVsc2Uge1xuICAgIHN0YXJ0KCk7XG59XG4iXSwibmFtZXMiOlsiUlVOVElNRV9LRVkiLCJydW50aW1lIiwid2luZG93IiwiYWRkZWQiLCJTZXQiLCJyZW1vdmVkIiwib2JzZXJ2ZXIiLCJ2aXNpdCIsImNhbGxiYWNrcyIsIm5vZGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJzdGFydCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiTXV0YXRpb25PYnNlcnZlciIsInJlY29yZHMiLCJfcmVmIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwib2JzZXJ2ZUR5bmFtaWNDb250ZW50Iiwib25BZGRlZCIsIm9uUmVtb3ZlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImFkZCIsImRlbGV0ZSIsIkNPT0tJRV9UVEwiLCJMQVlPVVRTIiwiQ09OVFJPTF9TRUxFQ1RPUiIsIlJBRElDQUxNQVJUX0xBWU9VVFMiLCJ0aWxlIiwiY29tcGFjdCIsImxpc3QiLCJwcmljZSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsInBhdGgiLCJjb29raWVQYXRoIiwic3RhcnRzV2l0aCIsInJlcGxhY2UiLCJzZWN1cmUiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiY29va2llIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiRGF0ZSIsIm5vdyIsInRvVVRDU3RyaW5nIiwiY2xlYXJDb29raWUiLCJ2aXNpYmxlTGF5b3V0cyIsInRvb2xiYXIiLCJkYXRhc2V0Iiwicm1MYXlvdXRzIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwicHJvZHVjdERhdGEiLCJpdGVtIiwiSlNPTiIsInBhcnNlIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiZXJyb3IiLCJjb21wYXJlUHJvZHVjdHMiLCJvcmRlcmluZyIsImxlZnQiLCJyaWdodCIsImEiLCJiIiwiTnVtYmVyIiwiZmluYWxWYWx1ZSIsIlN0cmluZyIsInRpdGxlIiwibG9jYWxlQ29tcGFyZSIsImxhbmciLCJpZCIsInJtT3JpZ2luYWxPcmRlciIsInNvcnRCdWlsZGVyQ29sbGVjdGlvbnMiLCJncm91cHMiLCJNYXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2NvcGUiLCJjbG9zZXN0IiwiY2VsbCIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnQiLCJoYXMiLCJzZXQiLCJnZXQiLCJwdXNoIiwiaXRlbXMiLCJpbmRleCIsInNvcnQiLCJhcHBlbmQiLCJzZWxlY3RMYXlvdXQiLCJsYXlvdXQiLCJsYXlvdXRCdXR0b24iLCJhY3RpdmUiLCJybUxheW91dCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1vYmlsZVNlbGVjdCIsIm1vZGVDb29raWUiLCJsYXlvdXRDb29raWUiLCJ1cmwiLCJVUkwiLCJocmVmIiwic2VhcmNoUGFyYW1zIiwiYXNzaWduIiwidG9TdHJpbmciLCJzeW5jTmF0aXZlU3dpdGNoZXIiLCJuYXRpdmVTd2l0Y2hlciIsInNldFByb2R1Y3RzTGlzdFRlbXBsYXRlIiwicm1ZVER5bmFtaWNzU3luY2VkIiwic3luY2VkU3dpdGNoZXIiLCJjb250cm9sIiwiX2xlbiIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJhcHBseSIsInNlbGVjdE9yZGVyaW5nIiwic2VsZWN0IiwiZnJvbSIsIm9wdGlvbnMiLCJzb21lIiwib3B0aW9uIiwib3JkZXJpbmdDb29raWUiLCJpbml0Q29udHJvbCIsInJtVG9vbGJhclJlYWR5Iiwib3JkZXJpbmdTZWxlY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJidXR0b24iLCJ0YXJnZXQiLCJjb250YWlucyIsImluaXRDb250cm9scyIsInJvb3QiLCJtYXRjaGVzIiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9