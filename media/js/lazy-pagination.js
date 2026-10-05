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

/***/ "./src/lazy-pagination.scss"
/*!**********************************!*\
  !*** ./src/lazy-pagination.scss ***!
  \**********************************/
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
/*!*********************************!*\
  !*** ./src/lazy-pagination.es6 ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lazy_pagination_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-pagination.scss */ "./src/lazy-pagination.scss");
/* harmony import */ var _lazy_pagination_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lazy_pagination_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


const ROOT_SELECTOR = '[data-rm-lazy-pagination]';
const productCells = (scope, selector) => {
  let markers;
  try {
    markers = scope.querySelectorAll(selector);
  } catch (error) {
    markers = scope.querySelectorAll('[data-rm-product-scope]');
  }
  return [...new Set(Array.from(markers, marker => marker.closest('.el-item')?.parentElement).filter(Boolean))];
};
const setLoading = (root, loading) => {
  root.classList.toggle('is-loading', loading);
  const button = root.querySelector('.rm-lazy-pagination__button');
  if (!button) return;
  button.disabled = loading;
  const label = button.querySelector('.rm-lazy-pagination__label');
  if (label) {
    if (!button.dataset.idleLabel) button.dataset.idleLabel = label.textContent;
    label.textContent = loading ? root.dataset.loadingLabel : root.classList.contains('is-complete') ? root.dataset.completeLabel : button.dataset.idleLabel;
  }
};
const complete = root => {
  root.dataset.nextUrl = '';
  root.classList.add('is-complete');
  const button = root.querySelector('.rm-lazy-pagination__button');
  if (button) {
    button.disabled = true;
    const label = button.querySelector('.rm-lazy-pagination__label');
    if (label) label.textContent = root.dataset.completeLabel;
  }
};
const appendNextPage = async root => {
  const nextUrl = root.dataset.nextUrl;
  if (!nextUrl || root.dataset.loading === 'true') return false;
  const requestedUrl = new URL(nextUrl, window.location.href).toString();
  const seen = new Set((root.dataset.loadedUrls || '').split('|').filter(Boolean));
  if (seen.has(requestedUrl)) {
    complete(root);
    return false;
  }
  root.dataset.loading = 'true';
  root.classList.remove('has-error');
  const previousStatus = root.querySelector('.rm-lazy-pagination__status');
  if (previousStatus) {
    previousStatus.classList.add('uk-hidden');
    previousStatus.textContent = '';
  }
  seen.add(requestedUrl);
  root.dataset.loadedUrls = [...seen].join('|');
  setLoading(root, true);
  try {
    const response = await fetch(requestedUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'text/html'
      },
      credentials: 'same-origin'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const documentNext = new DOMParser().parseFromString(await response.text(), 'text/html');
    const selector = root.dataset.targetSelector || '[data-rm-product-scope]';
    const currentCells = productCells(document, selector);
    const nextCells = productCells(documentNext, selector);
    const container = currentCells[0]?.parentElement;
    if (!container || !nextCells.length) throw new Error('Product grid was not found in the next page');
    const fragment = document.createDocumentFragment();
    const appended = nextCells.map(cell => document.importNode(cell, true));
    appended.forEach(cell => fragment.append(cell));
    container.append(fragment);
    const nextPager = documentNext.querySelector(ROOT_SELECTOR);
    const pages = root.querySelector('.rm-lazy-pagination__pages');
    const nextPages = nextPager?.querySelector('.rm-lazy-pagination__pages');
    if (pages && nextPages) pages.replaceWith(document.importNode(nextPages, true));
    root.dataset.nextUrl = nextPager?.dataset.nextUrl ? new URL(nextPager.dataset.nextUrl, response.url || requestedUrl).toString() : '';
    root.dataset.pageCurrent = nextPager?.dataset.pageCurrent || root.dataset.pagesTotal;
    if (root.dataset.updateUrl === 'true') {
      window.history.replaceState(window.history.state, '', requestedUrl);
    }
    window.UIkit?.update?.(container);
    document.dispatchEvent(new CustomEvent('rm:catalog:append', {
      detail: {
        root,
        container,
        items: appended,
        url: requestedUrl
      }
    }));
    if (!root.dataset.nextUrl) complete(root);
    return true;
  } catch (error) {
    root.classList.add('has-error');
    const status = root.querySelector('.rm-lazy-pagination__status');
    if (status) {
      status.classList.remove('uk-hidden');
      status.textContent = error.message || 'Loading failed';
    }
    return false;
  } finally {
    root.dataset.loading = 'false';
    setLoading(root, false);
  }
};
const initLazyPagination = root => {
  if (root.dataset.rmLazyPaginationReady === 'true') return;
  root.dataset.rmLazyPaginationReady = 'true';
  const autoAfterClick = root.dataset.autoAfterClick === 'true';
  let automatic = false;
  let observer;
  if (autoAfterClick && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (automatic && entries.some(entry => entry.isIntersecting)) appendNextPage(root);
    }, {
      rootMargin: `0px 0px ${Number(root.dataset.preloadDistance) || 0}px 0px`
    });
    observer.observe(root);
  }
  root.querySelector('.rm-lazy-pagination__button')?.addEventListener('click', async () => {
    const loaded = await appendNextPage(root);
    if (loaded && autoAfterClick) {
      automatic = true;
      root.classList.add('is-automatic');
      if (!root.dataset.nextUrl) observer?.disconnect();
    }
  });
};
const init = function () {
  let scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (scope.matches?.(ROOT_SELECTOR)) initLazyPagination(scope);
  scope.querySelectorAll?.(ROOT_SELECTOR).forEach(initLazyPagination);
};
const start = () => {
  init();
  (0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(init);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SCxRQUFRLENBQUMySCxVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DM0gsUUFBUSxDQUFDc0gsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUV2SCxLQUFLLEVBQUU7SUFBQzZILElBQUksRUFBRTtFQUFJLENBQUMsQ0FBQztBQUN0RSxDQUFDLE1BQU07RUFDSDdILEtBQUssQ0FBQyxDQUFDO0FBQ1gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9ydW50aW1lLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvbGF6eS1wYWdpbmF0aW9uLnNjc3MiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9sYXp5LXBhZ2luYXRpb24uZXM2Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJVTlRJTUVfS0VZID0gJ19fWVREeW5hbWljc0RvbVJ1bnRpbWUnO1xuXG5jb25zdCBydW50aW1lID0gd2luZG93W1JVTlRJTUVfS0VZXSB8fCB7XG4gICAgYWRkZWQ6IG5ldyBTZXQoKSxcbiAgICByZW1vdmVkOiBuZXcgU2V0KCksXG4gICAgb2JzZXJ2ZXI6IG51bGwsXG59O1xuXG53aW5kb3dbUlVOVElNRV9LRVldID0gcnVudGltZTtcblxuY29uc3QgdmlzaXQgPSAoY2FsbGJhY2tzLCBub2RlKSA9PiBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKG5vZGUpKTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKHJ1bnRpbWUub2JzZXJ2ZXIgfHwgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgcnVudGltZS5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChyZWNvcmRzKSA9PiB7XG4gICAgICAgIHJlY29yZHMuZm9yRWFjaCgoe2FkZGVkTm9kZXMsIHJlbW92ZWROb2Rlc30pID0+IHtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkgdmlzaXQocnVudGltZS5hZGRlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLnJlbW92ZWQsIG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJ1bnRpbWUub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvYnNlcnZlRHluYW1pY0NvbnRlbnQgPSAob25BZGRlZCwgb25SZW1vdmVkID0gbnVsbCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25BZGRlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5hZGRlZC5hZGQob25BZGRlZCk7XG4gICAgaWYgKHR5cGVvZiBvblJlbW92ZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUucmVtb3ZlZC5hZGQob25SZW1vdmVkKTtcbiAgICBzdGFydCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmRlbGV0ZShvbkFkZGVkKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvblJlbW92ZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUucmVtb3ZlZC5kZWxldGUob25SZW1vdmVkKTtcbiAgICB9O1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9sYXp5LXBhZ2luYXRpb24uc2Nzcyc7XG5pbXBvcnQge29ic2VydmVEeW5hbWljQ29udGVudH0gZnJvbSAnLi9ydW50aW1lLmVzNic7XG5cbmNvbnN0IFJPT1RfU0VMRUNUT1IgPSAnW2RhdGEtcm0tbGF6eS1wYWdpbmF0aW9uXSc7XG5cbmNvbnN0IHByb2R1Y3RDZWxscyA9IChzY29wZSwgc2VsZWN0b3IpID0+IHtcbiAgICBsZXQgbWFya2VycztcbiAgICB0cnkge1xuICAgICAgICBtYXJrZXJzID0gc2NvcGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbWFya2VycyA9IHNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KEFycmF5LmZyb20obWFya2VycywgKG1hcmtlcikgPT4gbWFya2VyLmNsb3Nlc3QoJy5lbC1pdGVtJyk/LnBhcmVudEVsZW1lbnQpLmZpbHRlcihCb29sZWFuKSldO1xufTtcblxuY29uc3Qgc2V0TG9hZGluZyA9IChyb290LCBsb2FkaW5nKSA9PiB7XG4gICAgcm9vdC5jbGFzc0xpc3QudG9nZ2xlKCdpcy1sb2FkaW5nJywgbG9hZGluZyk7XG4gICAgY29uc3QgYnV0dG9uID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucm0tbGF6eS1wYWdpbmF0aW9uX19idXR0b24nKTtcbiAgICBpZiAoIWJ1dHRvbikgcmV0dXJuO1xuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGxvYWRpbmc7XG4gICAgY29uc3QgbGFiZWwgPSBidXR0b24ucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fbGFiZWwnKTtcbiAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgaWYgKCFidXR0b24uZGF0YXNldC5pZGxlTGFiZWwpIGJ1dHRvbi5kYXRhc2V0LmlkbGVMYWJlbCA9IGxhYmVsLnRleHRDb250ZW50O1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxvYWRpbmdcbiAgICAgICAgICAgID8gcm9vdC5kYXRhc2V0LmxvYWRpbmdMYWJlbFxuICAgICAgICAgICAgOiAocm9vdC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWNvbXBsZXRlJykgPyByb290LmRhdGFzZXQuY29tcGxldGVMYWJlbCA6IGJ1dHRvbi5kYXRhc2V0LmlkbGVMYWJlbCk7XG4gICAgfVxufTtcblxuY29uc3QgY29tcGxldGUgPSAocm9vdCkgPT4ge1xuICAgIHJvb3QuZGF0YXNldC5uZXh0VXJsID0gJyc7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdpcy1jb21wbGV0ZScpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IHJvb3QucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fYnV0dG9uJyk7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBsYWJlbCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcucm0tbGF6eS1wYWdpbmF0aW9uX19sYWJlbCcpO1xuICAgICAgICBpZiAobGFiZWwpIGxhYmVsLnRleHRDb250ZW50ID0gcm9vdC5kYXRhc2V0LmNvbXBsZXRlTGFiZWw7XG4gICAgfVxufTtcblxuY29uc3QgYXBwZW5kTmV4dFBhZ2UgPSBhc3luYyAocm9vdCkgPT4ge1xuICAgIGNvbnN0IG5leHRVcmwgPSByb290LmRhdGFzZXQubmV4dFVybDtcbiAgICBpZiAoIW5leHRVcmwgfHwgcm9vdC5kYXRhc2V0LmxvYWRpbmcgPT09ICd0cnVlJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgcmVxdWVzdGVkVXJsID0gbmV3IFVSTChuZXh0VXJsLCB3aW5kb3cubG9jYXRpb24uaHJlZikudG9TdHJpbmcoKTtcbiAgICBjb25zdCBzZWVuID0gbmV3IFNldCgocm9vdC5kYXRhc2V0LmxvYWRlZFVybHMgfHwgJycpLnNwbGl0KCd8JykuZmlsdGVyKEJvb2xlYW4pKTtcbiAgICBpZiAoc2Vlbi5oYXMocmVxdWVzdGVkVXJsKSkge1xuICAgICAgICBjb21wbGV0ZShyb290KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJvb3QuZGF0YXNldC5sb2FkaW5nID0gJ3RydWUnO1xuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWVycm9yJyk7XG4gICAgY29uc3QgcHJldmlvdXNTdGF0dXMgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX3N0YXR1cycpO1xuICAgIGlmIChwcmV2aW91c1N0YXR1cykge1xuICAgICAgICBwcmV2aW91c1N0YXR1cy5jbGFzc0xpc3QuYWRkKCd1ay1oaWRkZW4nKTtcbiAgICAgICAgcHJldmlvdXNTdGF0dXMudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG4gICAgc2Vlbi5hZGQocmVxdWVzdGVkVXJsKTtcbiAgICByb290LmRhdGFzZXQubG9hZGVkVXJscyA9IFsuLi5zZWVuXS5qb2luKCd8Jyk7XG4gICAgc2V0TG9hZGluZyhyb290LCB0cnVlKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdGVkVXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7J1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLCBBY2NlcHQ6ICd0ZXh0L2h0bWwnfSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuXG4gICAgICAgIGNvbnN0IGRvY3VtZW50TmV4dCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYXdhaXQgcmVzcG9uc2UudGV4dCgpLCAndGV4dC9odG1sJyk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gcm9vdC5kYXRhc2V0LnRhcmdldFNlbGVjdG9yIHx8ICdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXSc7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDZWxscyA9IHByb2R1Y3RDZWxscyhkb2N1bWVudCwgc2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBuZXh0Q2VsbHMgPSBwcm9kdWN0Q2VsbHMoZG9jdW1lbnROZXh0LCBzZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGN1cnJlbnRDZWxsc1swXT8ucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKCFjb250YWluZXIgfHwgIW5leHRDZWxscy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignUHJvZHVjdCBncmlkIHdhcyBub3QgZm91bmQgaW4gdGhlIG5leHQgcGFnZScpO1xuXG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCBhcHBlbmRlZCA9IG5leHRDZWxscy5tYXAoKGNlbGwpID0+IGRvY3VtZW50LmltcG9ydE5vZGUoY2VsbCwgdHJ1ZSkpO1xuICAgICAgICBhcHBlbmRlZC5mb3JFYWNoKChjZWxsKSA9PiBmcmFnbWVudC5hcHBlbmQoY2VsbCkpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICAgICAgICBjb25zdCBuZXh0UGFnZXIgPSBkb2N1bWVudE5leHQucXVlcnlTZWxlY3RvcihST09UX1NFTEVDVE9SKTtcbiAgICAgICAgY29uc3QgcGFnZXMgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX3BhZ2VzJyk7XG4gICAgICAgIGNvbnN0IG5leHRQYWdlcyA9IG5leHRQYWdlcj8ucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fcGFnZXMnKTtcbiAgICAgICAgaWYgKHBhZ2VzICYmIG5leHRQYWdlcykgcGFnZXMucmVwbGFjZVdpdGgoZG9jdW1lbnQuaW1wb3J0Tm9kZShuZXh0UGFnZXMsIHRydWUpKTtcbiAgICAgICAgcm9vdC5kYXRhc2V0Lm5leHRVcmwgPSBuZXh0UGFnZXI/LmRhdGFzZXQubmV4dFVybFxuICAgICAgICAgICAgPyBuZXcgVVJMKG5leHRQYWdlci5kYXRhc2V0Lm5leHRVcmwsIHJlc3BvbnNlLnVybCB8fCByZXF1ZXN0ZWRVcmwpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHJvb3QuZGF0YXNldC5wYWdlQ3VycmVudCA9IG5leHRQYWdlcj8uZGF0YXNldC5wYWdlQ3VycmVudCB8fCByb290LmRhdGFzZXQucGFnZXNUb3RhbDtcblxuICAgICAgICBpZiAocm9vdC5kYXRhc2V0LnVwZGF0ZVVybCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsICcnLCByZXF1ZXN0ZWRVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LlVJa2l0Py51cGRhdGU/Lihjb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgncm06Y2F0YWxvZzphcHBlbmQnLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtyb290LCBjb250YWluZXIsIGl0ZW1zOiBhcHBlbmRlZCwgdXJsOiByZXF1ZXN0ZWRVcmx9LFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgaWYgKCFyb290LmRhdGFzZXQubmV4dFVybCkgY29tcGxldGUocm9vdCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnaGFzLWVycm9yJyk7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHJvb3QucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fc3RhdHVzJyk7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIHN0YXR1cy5jbGFzc0xpc3QucmVtb3ZlKCd1ay1oaWRkZW4nKTtcbiAgICAgICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGVycm9yLm1lc3NhZ2UgfHwgJ0xvYWRpbmcgZmFpbGVkJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgcm9vdC5kYXRhc2V0LmxvYWRpbmcgPSAnZmFsc2UnO1xuICAgICAgICBzZXRMb2FkaW5nKHJvb3QsIGZhbHNlKTtcbiAgICB9XG59O1xuXG5jb25zdCBpbml0TGF6eVBhZ2luYXRpb24gPSAocm9vdCkgPT4ge1xuICAgIGlmIChyb290LmRhdGFzZXQucm1MYXp5UGFnaW5hdGlvblJlYWR5ID09PSAndHJ1ZScpIHJldHVybjtcbiAgICByb290LmRhdGFzZXQucm1MYXp5UGFnaW5hdGlvblJlYWR5ID0gJ3RydWUnO1xuXG4gICAgY29uc3QgYXV0b0FmdGVyQ2xpY2sgPSByb290LmRhdGFzZXQuYXV0b0FmdGVyQ2xpY2sgPT09ICd0cnVlJztcbiAgICBsZXQgYXV0b21hdGljID0gZmFsc2U7XG4gICAgbGV0IG9ic2VydmVyO1xuXG4gICAgaWYgKGF1dG9BZnRlckNsaWNrICYmICdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXV0b21hdGljICYmIGVudHJpZXMuc29tZSgoZW50cnkpID0+IGVudHJ5LmlzSW50ZXJzZWN0aW5nKSkgYXBwZW5kTmV4dFBhZ2Uocm9vdCk7XG4gICAgICAgIH0sIHtyb290TWFyZ2luOiBgMHB4IDBweCAke051bWJlcihyb290LmRhdGFzZXQucHJlbG9hZERpc3RhbmNlKSB8fCAwfXB4IDBweGB9KTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX2J1dHRvbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZGVkID0gYXdhaXQgYXBwZW5kTmV4dFBhZ2Uocm9vdCk7XG4gICAgICAgIGlmIChsb2FkZWQgJiYgYXV0b0FmdGVyQ2xpY2spIHtcbiAgICAgICAgICAgIGF1dG9tYXRpYyA9IHRydWU7XG4gICAgICAgICAgICByb290LmNsYXNzTGlzdC5hZGQoJ2lzLWF1dG9tYXRpYycpO1xuICAgICAgICAgICAgaWYgKCFyb290LmRhdGFzZXQubmV4dFVybCkgb2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgaW5pdCA9IChzY29wZSA9IGRvY3VtZW50KSA9PiB7XG4gICAgaWYgKHNjb3BlLm1hdGNoZXM/LihST09UX1NFTEVDVE9SKSkgaW5pdExhenlQYWdpbmF0aW9uKHNjb3BlKTtcbiAgICBzY29wZS5xdWVyeVNlbGVjdG9yQWxsPy4oUk9PVF9TRUxFQ1RPUikuZm9yRWFjaChpbml0TGF6eVBhZ2luYXRpb24pO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgaW5pdCgpO1xuICAgIG9ic2VydmVEeW5hbWljQ29udGVudChpbml0KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnQsIHtvbmNlOiB0cnVlfSk7XG59IGVsc2Uge1xuICAgIHN0YXJ0KCk7XG59XG4iXSwibmFtZXMiOlsiUlVOVElNRV9LRVkiLCJydW50aW1lIiwid2luZG93IiwiYWRkZWQiLCJTZXQiLCJyZW1vdmVkIiwib2JzZXJ2ZXIiLCJ2aXNpdCIsImNhbGxiYWNrcyIsIm5vZGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJzdGFydCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiTXV0YXRpb25PYnNlcnZlciIsInJlY29yZHMiLCJfcmVmIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwib2JzZXJ2ZUR5bmFtaWNDb250ZW50Iiwib25BZGRlZCIsIm9uUmVtb3ZlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImFkZCIsImRlbGV0ZSIsIlJPT1RfU0VMRUNUT1IiLCJwcm9kdWN0Q2VsbHMiLCJzY29wZSIsInNlbGVjdG9yIiwibWFya2VycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlcnJvciIsIkFycmF5IiwiZnJvbSIsIm1hcmtlciIsImNsb3Nlc3QiLCJwYXJlbnRFbGVtZW50IiwiZmlsdGVyIiwiQm9vbGVhbiIsInNldExvYWRpbmciLCJyb290IiwibG9hZGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImJ1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJkaXNhYmxlZCIsImxhYmVsIiwiZGF0YXNldCIsImlkbGVMYWJlbCIsInRleHRDb250ZW50IiwibG9hZGluZ0xhYmVsIiwiY29udGFpbnMiLCJjb21wbGV0ZUxhYmVsIiwiY29tcGxldGUiLCJuZXh0VXJsIiwiYXBwZW5kTmV4dFBhZ2UiLCJyZXF1ZXN0ZWRVcmwiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJ0b1N0cmluZyIsInNlZW4iLCJsb2FkZWRVcmxzIiwic3BsaXQiLCJoYXMiLCJyZW1vdmUiLCJwcmV2aW91c1N0YXR1cyIsImpvaW4iLCJyZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIkFjY2VwdCIsImNyZWRlbnRpYWxzIiwib2siLCJFcnJvciIsInN0YXR1cyIsImRvY3VtZW50TmV4dCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsInRleHQiLCJ0YXJnZXRTZWxlY3RvciIsImN1cnJlbnRDZWxscyIsIm5leHRDZWxscyIsImNvbnRhaW5lciIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZGVkIiwibWFwIiwiY2VsbCIsImltcG9ydE5vZGUiLCJhcHBlbmQiLCJuZXh0UGFnZXIiLCJwYWdlcyIsIm5leHRQYWdlcyIsInJlcGxhY2VXaXRoIiwidXJsIiwicGFnZUN1cnJlbnQiLCJwYWdlc1RvdGFsIiwidXBkYXRlVXJsIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInN0YXRlIiwiVUlraXQiLCJ1cGRhdGUiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJpdGVtcyIsIm1lc3NhZ2UiLCJpbml0TGF6eVBhZ2luYXRpb24iLCJybUxhenlQYWdpbmF0aW9uUmVhZHkiLCJhdXRvQWZ0ZXJDbGljayIsImF1dG9tYXRpYyIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsInNvbWUiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwicm9vdE1hcmdpbiIsIk51bWJlciIsInByZWxvYWREaXN0YW5jZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2FkZWQiLCJkaXNjb25uZWN0IiwiaW5pdCIsIm1hdGNoZXMiLCJyZWFkeVN0YXRlIiwib25jZSJdLCJzb3VyY2VSb290IjoiIn0=