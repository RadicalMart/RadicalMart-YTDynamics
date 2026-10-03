/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
  new MutationObserver(records => records.forEach(_ref => {
    let {
      addedNodes
    } = _ref;
    return addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) init(node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDekYsS0FBSyxDQUFDO0VBQzdEQSxLQUFLLENBQUNHLGdCQUFnQixHQUFHTCxhQUFhLENBQUMsQ0FBQ3VFLE9BQU8sQ0FBQ29CLGtCQUFrQixDQUFDO0FBQ3ZFLENBQUM7QUFFRCxNQUFNcUIsS0FBSyxHQUFHQSxDQUFBLEtBQU07RUFDaEJKLElBQUksQ0FBQyxDQUFDO0VBQ04sSUFBSUssZ0JBQWdCLENBQUVDLE9BQU8sSUFBS0EsT0FBTyxDQUFDM0MsT0FBTyxDQUFDNEMsSUFBQTtJQUFBLElBQUM7TUFBQ0M7SUFBVSxDQUFDLEdBQUFELElBQUE7SUFBQSxPQUFLQyxVQUFVLENBQUM3QyxPQUFPLENBQUU4QyxJQUFJLElBQUs7TUFDN0YsSUFBSUEsSUFBSSxDQUFDQyxRQUFRLEtBQUtDLElBQUksQ0FBQ0MsWUFBWSxFQUFFWixJQUFJLENBQUNTLElBQUksQ0FBQztJQUN2RCxDQUFDLENBQUM7RUFBQSxFQUFDLENBQUMsQ0FBQ2IsT0FBTyxDQUFDM0MsUUFBUSxDQUFDNEQsZUFBZSxFQUFFO0lBQUNDLFNBQVMsRUFBRSxJQUFJO0lBQUVDLE9BQU8sRUFBRTtFQUFJLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsSUFBSTlELFFBQVEsQ0FBQytELFVBQVUsS0FBSyxTQUFTLEVBQUU7RUFDbkMvRCxRQUFRLENBQUM0QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRU8sS0FBSyxFQUFFO0lBQUNhLElBQUksRUFBRTtFQUFJLENBQUMsQ0FBQztBQUN0RSxDQUFDLE1BQU07RUFDSGIsS0FBSyxDQUFDLENBQUM7QUFDWCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2xhenktcGFnaW5hdGlvbi5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvbGF6eS1wYWdpbmF0aW9uLmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vbGF6eS1wYWdpbmF0aW9uLnNjc3MnO1xuXG5jb25zdCBST09UX1NFTEVDVE9SID0gJ1tkYXRhLXJtLWxhenktcGFnaW5hdGlvbl0nO1xuXG5jb25zdCBwcm9kdWN0Q2VsbHMgPSAoc2NvcGUsIHNlbGVjdG9yKSA9PiB7XG4gICAgbGV0IG1hcmtlcnM7XG4gICAgdHJ5IHtcbiAgICAgICAgbWFya2VycyA9IHNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG1hcmtlcnMgPSBzY29wZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpO1xuICAgIH1cblxuICAgIHJldHVybiBbLi4ubmV3IFNldChBcnJheS5mcm9tKG1hcmtlcnMsIChtYXJrZXIpID0+IG1hcmtlci5jbG9zZXN0KCcuZWwtaXRlbScpPy5wYXJlbnRFbGVtZW50KS5maWx0ZXIoQm9vbGVhbikpXTtcbn07XG5cbmNvbnN0IHNldExvYWRpbmcgPSAocm9vdCwgbG9hZGluZykgPT4ge1xuICAgIHJvb3QuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycsIGxvYWRpbmcpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IHJvb3QucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fYnV0dG9uJyk7XG4gICAgaWYgKCFidXR0b24pIHJldHVybjtcbiAgICBidXR0b24uZGlzYWJsZWQgPSBsb2FkaW5nO1xuICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX2xhYmVsJyk7XG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICAgIGlmICghYnV0dG9uLmRhdGFzZXQuaWRsZUxhYmVsKSBidXR0b24uZGF0YXNldC5pZGxlTGFiZWwgPSBsYWJlbC50ZXh0Q29udGVudDtcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBsb2FkaW5nXG4gICAgICAgICAgICA/IHJvb3QuZGF0YXNldC5sb2FkaW5nTGFiZWxcbiAgICAgICAgICAgIDogKHJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1jb21wbGV0ZScpID8gcm9vdC5kYXRhc2V0LmNvbXBsZXRlTGFiZWwgOiBidXR0b24uZGF0YXNldC5pZGxlTGFiZWwpO1xuICAgIH1cbn07XG5cbmNvbnN0IGNvbXBsZXRlID0gKHJvb3QpID0+IHtcbiAgICByb290LmRhdGFzZXQubmV4dFVybCA9ICcnO1xuICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnaXMtY29tcGxldGUnKTtcbiAgICBjb25zdCBidXR0b24gPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX2J1dHRvbicpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBidXR0b24ucXVlcnlTZWxlY3RvcignLnJtLWxhenktcGFnaW5hdGlvbl9fbGFiZWwnKTtcbiAgICAgICAgaWYgKGxhYmVsKSBsYWJlbC50ZXh0Q29udGVudCA9IHJvb3QuZGF0YXNldC5jb21wbGV0ZUxhYmVsO1xuICAgIH1cbn07XG5cbmNvbnN0IGFwcGVuZE5leHRQYWdlID0gYXN5bmMgKHJvb3QpID0+IHtcbiAgICBjb25zdCBuZXh0VXJsID0gcm9vdC5kYXRhc2V0Lm5leHRVcmw7XG4gICAgaWYgKCFuZXh0VXJsIHx8IHJvb3QuZGF0YXNldC5sb2FkaW5nID09PSAndHJ1ZScpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHJlcXVlc3RlZFVybCA9IG5ldyBVUkwobmV4dFVybCwgd2luZG93LmxvY2F0aW9uLmhyZWYpLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoKHJvb3QuZGF0YXNldC5sb2FkZWRVcmxzIHx8ICcnKS5zcGxpdCgnfCcpLmZpbHRlcihCb29sZWFuKSk7XG4gICAgaWYgKHNlZW4uaGFzKHJlcXVlc3RlZFVybCkpIHtcbiAgICAgICAgY29tcGxldGUocm9vdCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByb290LmRhdGFzZXQubG9hZGluZyA9ICd0cnVlJztcbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1lcnJvcicpO1xuICAgIGNvbnN0IHByZXZpb3VzU3RhdHVzID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucm0tbGF6eS1wYWdpbmF0aW9uX19zdGF0dXMnKTtcbiAgICBpZiAocHJldmlvdXNTdGF0dXMpIHtcbiAgICAgICAgcHJldmlvdXNTdGF0dXMuY2xhc3NMaXN0LmFkZCgndWstaGlkZGVuJyk7XG4gICAgICAgIHByZXZpb3VzU3RhdHVzLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHNlZW4uYWRkKHJlcXVlc3RlZFVybCk7XG4gICAgcm9vdC5kYXRhc2V0LmxvYWRlZFVybHMgPSBbLi4uc2Vlbl0uam9pbignfCcpO1xuICAgIHNldExvYWRpbmcocm9vdCwgdHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3RlZFVybCwge1xuICAgICAgICAgICAgaGVhZGVyczogeydYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JywgQWNjZXB0OiAndGV4dC9odG1sJ30sXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcblxuICAgICAgICBjb25zdCBkb2N1bWVudE5leHQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGF3YWl0IHJlc3BvbnNlLnRleHQoKSwgJ3RleHQvaHRtbCcpO1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHJvb3QuZGF0YXNldC50YXJnZXRTZWxlY3RvciB8fCAnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nO1xuICAgICAgICBjb25zdCBjdXJyZW50Q2VsbHMgPSBwcm9kdWN0Q2VsbHMoZG9jdW1lbnQsIHNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgbmV4dENlbGxzID0gcHJvZHVjdENlbGxzKGRvY3VtZW50TmV4dCwgc2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBjdXJyZW50Q2VsbHNbMF0/LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmICghY29udGFpbmVyIHx8ICFuZXh0Q2VsbHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb2R1Y3QgZ3JpZCB3YXMgbm90IGZvdW5kIGluIHRoZSBuZXh0IHBhZ2UnKTtcblxuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgYXBwZW5kZWQgPSBuZXh0Q2VsbHMubWFwKChjZWxsKSA9PiBkb2N1bWVudC5pbXBvcnROb2RlKGNlbGwsIHRydWUpKTtcbiAgICAgICAgYXBwZW5kZWQuZm9yRWFjaCgoY2VsbCkgPT4gZnJhZ21lbnQuYXBwZW5kKGNlbGwpKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChmcmFnbWVudCk7XG5cbiAgICAgICAgY29uc3QgbmV4dFBhZ2VyID0gZG9jdW1lbnROZXh0LnF1ZXJ5U2VsZWN0b3IoUk9PVF9TRUxFQ1RPUik7XG4gICAgICAgIGNvbnN0IHBhZ2VzID0gcm9vdC5xdWVyeVNlbGVjdG9yKCcucm0tbGF6eS1wYWdpbmF0aW9uX19wYWdlcycpO1xuICAgICAgICBjb25zdCBuZXh0UGFnZXMgPSBuZXh0UGFnZXI/LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX3BhZ2VzJyk7XG4gICAgICAgIGlmIChwYWdlcyAmJiBuZXh0UGFnZXMpIHBhZ2VzLnJlcGxhY2VXaXRoKGRvY3VtZW50LmltcG9ydE5vZGUobmV4dFBhZ2VzLCB0cnVlKSk7XG4gICAgICAgIHJvb3QuZGF0YXNldC5uZXh0VXJsID0gbmV4dFBhZ2VyPy5kYXRhc2V0Lm5leHRVcmxcbiAgICAgICAgICAgID8gbmV3IFVSTChuZXh0UGFnZXIuZGF0YXNldC5uZXh0VXJsLCByZXNwb25zZS51cmwgfHwgcmVxdWVzdGVkVXJsKS50b1N0cmluZygpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICByb290LmRhdGFzZXQucGFnZUN1cnJlbnQgPSBuZXh0UGFnZXI/LmRhdGFzZXQucGFnZUN1cnJlbnQgfHwgcm9vdC5kYXRhc2V0LnBhZ2VzVG90YWw7XG5cbiAgICAgICAgaWYgKHJvb3QuZGF0YXNldC51cGRhdGVVcmwgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCAnJywgcmVxdWVzdGVkVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5VSWtpdD8udXBkYXRlPy4oY29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3JtOmNhdGFsb2c6YXBwZW5kJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7cm9vdCwgY29udGFpbmVyLCBpdGVtczogYXBwZW5kZWQsIHVybDogcmVxdWVzdGVkVXJsfSxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICghcm9vdC5kYXRhc2V0Lm5leHRVcmwpIGNvbXBsZXRlKHJvb3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByb290LmNsYXNzTGlzdC5hZGQoJ2hhcy1lcnJvcicpO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSByb290LnF1ZXJ5U2VsZWN0b3IoJy5ybS1sYXp5LXBhZ2luYXRpb25fX3N0YXR1cycpO1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICBzdGF0dXMuY2xhc3NMaXN0LnJlbW92ZSgndWstaGlkZGVuJyk7XG4gICAgICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBlcnJvci5tZXNzYWdlIHx8ICdMb2FkaW5nIGZhaWxlZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHJvb3QuZGF0YXNldC5sb2FkaW5nID0gJ2ZhbHNlJztcbiAgICAgICAgc2V0TG9hZGluZyhyb290LCBmYWxzZSk7XG4gICAgfVxufTtcblxuY29uc3QgaW5pdExhenlQYWdpbmF0aW9uID0gKHJvb3QpID0+IHtcbiAgICBpZiAocm9vdC5kYXRhc2V0LnJtTGF6eVBhZ2luYXRpb25SZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgcm9vdC5kYXRhc2V0LnJtTGF6eVBhZ2luYXRpb25SZWFkeSA9ICd0cnVlJztcblxuICAgIGNvbnN0IGF1dG9BZnRlckNsaWNrID0gcm9vdC5kYXRhc2V0LmF1dG9BZnRlckNsaWNrID09PSAndHJ1ZSc7XG4gICAgbGV0IGF1dG9tYXRpYyA9IGZhbHNlO1xuICAgIGxldCBvYnNlcnZlcjtcblxuICAgIGlmIChhdXRvQWZ0ZXJDbGljayAmJiAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgaWYgKGF1dG9tYXRpYyAmJiBlbnRyaWVzLnNvbWUoKGVudHJ5KSA9PiBlbnRyeS5pc0ludGVyc2VjdGluZykpIGFwcGVuZE5leHRQYWdlKHJvb3QpO1xuICAgICAgICB9LCB7cm9vdE1hcmdpbjogYDBweCAwcHggJHtOdW1iZXIocm9vdC5kYXRhc2V0LnByZWxvYWREaXN0YW5jZSkgfHwgMH1weCAwcHhgfSk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocm9vdCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yKCcucm0tbGF6eS1wYWdpbmF0aW9uX19idXR0b24nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYWRlZCA9IGF3YWl0IGFwcGVuZE5leHRQYWdlKHJvb3QpO1xuICAgICAgICBpZiAobG9hZGVkICYmIGF1dG9BZnRlckNsaWNrKSB7XG4gICAgICAgICAgICBhdXRvbWF0aWMgPSB0cnVlO1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdpcy1hdXRvbWF0aWMnKTtcbiAgICAgICAgICAgIGlmICghcm9vdC5kYXRhc2V0Lm5leHRVcmwpIG9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmNvbnN0IGluaXQgPSAoc2NvcGUgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChzY29wZS5tYXRjaGVzPy4oUk9PVF9TRUxFQ1RPUikpIGluaXRMYXp5UGFnaW5hdGlvbihzY29wZSk7XG4gICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbD8uKFJPT1RfU0VMRUNUT1IpLmZvckVhY2goaW5pdExhenlQYWdpbmF0aW9uKTtcbn07XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIGluaXQoKTtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcigocmVjb3JkcykgPT4gcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2Rlc30pID0+IGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIGluaXQobm9kZSk7XG4gICAgfSkpKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydCwge29uY2U6IHRydWV9KTtcbn0gZWxzZSB7XG4gICAgc3RhcnQoKTtcbn1cbiJdLCJuYW1lcyI6WyJST09UX1NFTEVDVE9SIiwicHJvZHVjdENlbGxzIiwic2NvcGUiLCJzZWxlY3RvciIsIm1hcmtlcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXJyb3IiLCJTZXQiLCJBcnJheSIsImZyb20iLCJtYXJrZXIiLCJjbG9zZXN0IiwicGFyZW50RWxlbWVudCIsImZpbHRlciIsIkJvb2xlYW4iLCJzZXRMb2FkaW5nIiwicm9vdCIsImxvYWRpbmciLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJidXR0b24iLCJxdWVyeVNlbGVjdG9yIiwiZGlzYWJsZWQiLCJsYWJlbCIsImRhdGFzZXQiLCJpZGxlTGFiZWwiLCJ0ZXh0Q29udGVudCIsImxvYWRpbmdMYWJlbCIsImNvbnRhaW5zIiwiY29tcGxldGVMYWJlbCIsImNvbXBsZXRlIiwibmV4dFVybCIsImFkZCIsImFwcGVuZE5leHRQYWdlIiwicmVxdWVzdGVkVXJsIiwiVVJMIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidG9TdHJpbmciLCJzZWVuIiwibG9hZGVkVXJscyIsInNwbGl0IiwiaGFzIiwicmVtb3ZlIiwicHJldmlvdXNTdGF0dXMiLCJqb2luIiwicmVzcG9uc2UiLCJmZXRjaCIsImhlYWRlcnMiLCJBY2NlcHQiLCJjcmVkZW50aWFscyIsIm9rIiwiRXJyb3IiLCJzdGF0dXMiLCJkb2N1bWVudE5leHQiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJ0ZXh0IiwidGFyZ2V0U2VsZWN0b3IiLCJjdXJyZW50Q2VsbHMiLCJkb2N1bWVudCIsIm5leHRDZWxscyIsImNvbnRhaW5lciIsImxlbmd0aCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZGVkIiwibWFwIiwiY2VsbCIsImltcG9ydE5vZGUiLCJmb3JFYWNoIiwiYXBwZW5kIiwibmV4dFBhZ2VyIiwicGFnZXMiLCJuZXh0UGFnZXMiLCJyZXBsYWNlV2l0aCIsInVybCIsInBhZ2VDdXJyZW50IiwicGFnZXNUb3RhbCIsInVwZGF0ZVVybCIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJzdGF0ZSIsIlVJa2l0IiwidXBkYXRlIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiaXRlbXMiLCJtZXNzYWdlIiwiaW5pdExhenlQYWdpbmF0aW9uIiwicm1MYXp5UGFnaW5hdGlvblJlYWR5IiwiYXV0b0FmdGVyQ2xpY2siLCJhdXRvbWF0aWMiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsInNvbWUiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwicm9vdE1hcmdpbiIsIk51bWJlciIsInByZWxvYWREaXN0YW5jZSIsIm9ic2VydmUiLCJhZGRFdmVudExpc3RlbmVyIiwibG9hZGVkIiwiZGlzY29ubmVjdCIsImluaXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJtYXRjaGVzIiwic3RhcnQiLCJNdXRhdGlvbk9ic2VydmVyIiwicmVjb3JkcyIsIl9yZWYiLCJhZGRlZE5vZGVzIiwibm9kZSIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsImRvY3VtZW50RWxlbWVudCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJyZWFkeVN0YXRlIiwib25jZSJdLCJzb3VyY2VSb290IjoiIn0=
