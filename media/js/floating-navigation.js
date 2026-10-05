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

/***/ "./src/floating-navigation.scss"
/*!**************************************!*\
  !*** ./src/floating-navigation.scss ***!
  \**************************************/
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
/*!*************************************!*\
  !*** ./src/floating-navigation.es6 ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _floating_navigation_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./floating-navigation.scss */ "./src/floating-navigation.scss");
/* harmony import */ var _floating_navigation_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_floating_navigation_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


const bool = value => value === true || value === 'true' || value === '1';
const updateReservedSpace = () => {
  const heights = [...document.querySelectorAll('[data-rm-bottom-navigation][data-fixed="true"][data-reserve-space="true"]')].filter(element => element.getClientRects().length).map(element => element.getBoundingClientRect().height + Number(element.dataset.bottomOffset || 0));
  document.documentElement.style.setProperty('--rm-bottom-navigation-space', `${Math.max(0, ...heights)}px`);
  document.body.classList.toggle('rm-has-bottom-navigation', heights.length > 0);
};
const initBottomNavigation = root => {
  if (root.dataset.rmBottomNavigationReady) return;
  root.dataset.rmBottomNavigationReady = 'true';
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(updateReservedSpace);
    observer.observe(root);
  }
  updateReservedSpace();
};
const initHelpMenu = root => {
  if (root.dataset.rmHelpMenuReady) return;
  root.dataset.rmHelpMenuReady = 'true';
  const trigger = root.querySelector('[data-rm-help-trigger]');
  const panel = root.querySelector('[data-rm-help-panel]');
  const backdrop = root.querySelector('[data-rm-help-backdrop]');
  if (!trigger || !panel) return;
  const setOpen = open => {
    root.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (backdrop) backdrop.hidden = !open;
  };
  trigger.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  backdrop?.addEventListener('click', () => setOpen(false));
  root.addEventListener('click', event => {
    if (bool(root.dataset.closeOnLink) && event.target.closest('[data-rm-help-link]')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && root.classList.contains('is-open')) {
      setOpen(false);
      trigger.focus();
    }
  });
  setOpen(bool(root.dataset.open));
};
const init = function () {
  let scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  scope.querySelectorAll?.('[data-rm-bottom-navigation]').forEach(initBottomNavigation);
  scope.querySelectorAll?.('[data-rm-help-menu]').forEach(initHelpMenu);
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());else init();
(0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(node => {
  init(node.matches?.('[data-rm-bottom-navigation], [data-rm-help-menu]') ? node.parentElement : node);
  updateReservedSpace();
});
window.addEventListener('resize', updateReservedSpace, {
  passive: true
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUM1QixPQUFPLENBQUNpRCxZQUFZLENBQUM7QUFDekUsQ0FBQztBQUVELElBQUk5QyxRQUFRLENBQUNrRSxVQUFVLEtBQUssU0FBUyxFQUFFbEUsUUFBUSxDQUFDd0QsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQzlGQSxJQUFJLENBQUMsQ0FBQztBQUVYbkQsbUVBQXFCLENBQUVqQixJQUFJLElBQUs7RUFDNUJvRSxJQUFJLENBQUNwRSxJQUFJLENBQUN1RSxPQUFPLEdBQUcsa0RBQWtELENBQUMsR0FBR3ZFLElBQUksQ0FBQ3dFLGFBQWEsR0FBR3hFLElBQUksQ0FBQztFQUNwRzJCLG1CQUFtQixDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUZsQyxNQUFNLENBQUNtRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVqQyxtQkFBbUIsRUFBRTtFQUFDOEMsT0FBTyxFQUFFO0FBQUksQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvcnVudGltZS5lczYiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2Zsb2F0aW5nLW5hdmlnYXRpb24uc2NzcyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2Zsb2F0aW5nLW5hdmlnYXRpb24uZXM2Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJVTlRJTUVfS0VZID0gJ19fWVREeW5hbWljc0RvbVJ1bnRpbWUnO1xuXG5jb25zdCBydW50aW1lID0gd2luZG93W1JVTlRJTUVfS0VZXSB8fCB7XG4gICAgYWRkZWQ6IG5ldyBTZXQoKSxcbiAgICByZW1vdmVkOiBuZXcgU2V0KCksXG4gICAgb2JzZXJ2ZXI6IG51bGwsXG59O1xuXG53aW5kb3dbUlVOVElNRV9LRVldID0gcnVudGltZTtcblxuY29uc3QgdmlzaXQgPSAoY2FsbGJhY2tzLCBub2RlKSA9PiBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKG5vZGUpKTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKHJ1bnRpbWUub2JzZXJ2ZXIgfHwgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgcnVudGltZS5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChyZWNvcmRzKSA9PiB7XG4gICAgICAgIHJlY29yZHMuZm9yRWFjaCgoe2FkZGVkTm9kZXMsIHJlbW92ZWROb2Rlc30pID0+IHtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkgdmlzaXQocnVudGltZS5hZGRlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLnJlbW92ZWQsIG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJ1bnRpbWUub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBvYnNlcnZlRHluYW1pY0NvbnRlbnQgPSAob25BZGRlZCwgb25SZW1vdmVkID0gbnVsbCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25BZGRlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5hZGRlZC5hZGQob25BZGRlZCk7XG4gICAgaWYgKHR5cGVvZiBvblJlbW92ZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUucmVtb3ZlZC5hZGQob25SZW1vdmVkKTtcbiAgICBzdGFydCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmRlbGV0ZShvbkFkZGVkKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvblJlbW92ZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUucmVtb3ZlZC5kZWxldGUob25SZW1vdmVkKTtcbiAgICB9O1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9mbG9hdGluZy1uYXZpZ2F0aW9uLnNjc3MnO1xuaW1wb3J0IHtvYnNlcnZlRHluYW1pY0NvbnRlbnR9IGZyb20gJy4vcnVudGltZS5lczYnO1xuXG5jb25zdCBib29sID0gKHZhbHVlKSA9PiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMSc7XG5cbmNvbnN0IHVwZGF0ZVJlc2VydmVkU3BhY2UgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVpZ2h0cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1ib3R0b20tbmF2aWdhdGlvbl1bZGF0YS1maXhlZD1cInRydWVcIl1bZGF0YS1yZXNlcnZlLXNwYWNlPVwidHJ1ZVwiXScpXVxuICAgICAgICAuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50LmdldENsaWVudFJlY3RzKCkubGVuZ3RoKVxuICAgICAgICAubWFwKChlbGVtZW50KSA9PiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArIE51bWJlcihlbGVtZW50LmRhdGFzZXQuYm90dG9tT2Zmc2V0IHx8IDApKTtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1ybS1ib3R0b20tbmF2aWdhdGlvbi1zcGFjZScsIGAke01hdGgubWF4KDAsIC4uLmhlaWdodHMpfXB4YCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdybS1oYXMtYm90dG9tLW5hdmlnYXRpb24nLCBoZWlnaHRzLmxlbmd0aCA+IDApO1xufTtcblxuY29uc3QgaW5pdEJvdHRvbU5hdmlnYXRpb24gPSAocm9vdCkgPT4ge1xuICAgIGlmIChyb290LmRhdGFzZXQucm1Cb3R0b21OYXZpZ2F0aW9uUmVhZHkpIHJldHVybjtcbiAgICByb290LmRhdGFzZXQucm1Cb3R0b21OYXZpZ2F0aW9uUmVhZHkgPSAndHJ1ZSc7XG5cbiAgICBpZiAoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlUmVzZXJ2ZWRTcGFjZSk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocm9vdCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUmVzZXJ2ZWRTcGFjZSgpO1xufTtcblxuY29uc3QgaW5pdEhlbHBNZW51ID0gKHJvb3QpID0+IHtcbiAgICBpZiAocm9vdC5kYXRhc2V0LnJtSGVscE1lbnVSZWFkeSkgcmV0dXJuO1xuICAgIHJvb3QuZGF0YXNldC5ybUhlbHBNZW51UmVhZHkgPSAndHJ1ZSc7XG5cbiAgICBjb25zdCB0cmlnZ2VyID0gcm9vdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1oZWxwLXRyaWdnZXJdJyk7XG4gICAgY29uc3QgcGFuZWwgPSByb290LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWhlbHAtcGFuZWxdJyk7XG4gICAgY29uc3QgYmFja2Ryb3AgPSByb290LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLWhlbHAtYmFja2Ryb3BdJyk7XG4gICAgaWYgKCF0cmlnZ2VyIHx8ICFwYW5lbCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2V0T3BlbiA9IChvcGVuKSA9PiB7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtb3BlbicsIG9wZW4pO1xuICAgICAgICB0cmlnZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4gPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIG9wZW4gPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICAgICAgaWYgKGJhY2tkcm9wKSBiYWNrZHJvcC5oaWRkZW4gPSAhb3BlbjtcbiAgICB9O1xuXG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNldE9wZW4oIXJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpKTtcbiAgICBiYWNrZHJvcD8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG4gICAgcm9vdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoYm9vbChyb290LmRhdGFzZXQuY2xvc2VPbkxpbmspICYmIGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1ybS1oZWxwLWxpbmtdJykpIHNldE9wZW4oZmFsc2UpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgcm9vdC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICB0cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNldE9wZW4oYm9vbChyb290LmRhdGFzZXQub3BlbikpO1xufTtcblxuY29uc3QgaW5pdCA9IChzY29wZSA9IGRvY3VtZW50KSA9PiB7XG4gICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS1ib3R0b20tbmF2aWdhdGlvbl0nKS5mb3JFYWNoKGluaXRCb3R0b21OYXZpZ2F0aW9uKTtcbiAgICBzY29wZS5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLWhlbHAtbWVudV0nKS5mb3JFYWNoKGluaXRIZWxwTWVudSk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4gaW5pdCgpKTtcbmVsc2UgaW5pdCgpO1xuXG5vYnNlcnZlRHluYW1pY0NvbnRlbnQoKG5vZGUpID0+IHtcbiAgICBpbml0KG5vZGUubWF0Y2hlcz8uKCdbZGF0YS1ybS1ib3R0b20tbmF2aWdhdGlvbl0sIFtkYXRhLXJtLWhlbHAtbWVudV0nKSA/IG5vZGUucGFyZW50RWxlbWVudCA6IG5vZGUpO1xuICAgIHVwZGF0ZVJlc2VydmVkU3BhY2UoKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUmVzZXJ2ZWRTcGFjZSwge3Bhc3NpdmU6IHRydWV9KTtcbiJdLCJuYW1lcyI6WyJSVU5USU1FX0tFWSIsInJ1bnRpbWUiLCJ3aW5kb3ciLCJhZGRlZCIsIlNldCIsInJlbW92ZWQiLCJvYnNlcnZlciIsInZpc2l0IiwiY2FsbGJhY2tzIiwibm9kZSIsImZvckVhY2giLCJjYWxsYmFjayIsInN0YXJ0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJNdXRhdGlvbk9ic2VydmVyIiwicmVjb3JkcyIsIl9yZWYiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJvYnNlcnZlRHluYW1pY0NvbnRlbnQiLCJvbkFkZGVkIiwib25SZW1vdmVkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiYWRkIiwiZGVsZXRlIiwiYm9vbCIsInZhbHVlIiwidXBkYXRlUmVzZXJ2ZWRTcGFjZSIsImhlaWdodHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmlsdGVyIiwiZWxlbWVudCIsImdldENsaWVudFJlY3RzIiwibWFwIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0IiwiTnVtYmVyIiwiZGF0YXNldCIsImJvdHRvbU9mZnNldCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJNYXRoIiwibWF4IiwiYm9keSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImluaXRCb3R0b21OYXZpZ2F0aW9uIiwicm9vdCIsInJtQm90dG9tTmF2aWdhdGlvblJlYWR5IiwiUmVzaXplT2JzZXJ2ZXIiLCJpbml0SGVscE1lbnUiLCJybUhlbHBNZW51UmVhZHkiLCJ0cmlnZ2VyIiwicXVlcnlTZWxlY3RvciIsInBhbmVsIiwiYmFja2Ryb3AiLCJzZXRPcGVuIiwib3BlbiIsInNldEF0dHJpYnV0ZSIsImhpZGRlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250YWlucyIsImV2ZW50IiwiY2xvc2VPbkxpbmsiLCJ0YXJnZXQiLCJjbG9zZXN0Iiwia2V5IiwiZm9jdXMiLCJpbml0Iiwic2NvcGUiLCJyZWFkeVN0YXRlIiwibWF0Y2hlcyIsInBhcmVudEVsZW1lbnQiLCJwYXNzaXZlIl0sInNvdXJjZVJvb3QiOiIifQ==