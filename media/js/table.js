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

/***/ "./src/table.scss"
/*!************************!*\
  !*** ./src/table.scss ***!
  \************************/
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
/*!***********************!*\
  !*** ./src/table.es6 ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table.scss */ "./src/table.scss");
/* harmony import */ var _table_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_table_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");


const readThemeTokens = frame => {
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
  frame.append(probe);
  const background = getComputedStyle(frame).backgroundColor;
  const themeBackground = getComputedStyle(document.documentElement).getPropertyValue('--ytdynamics-background').trim();
  const theme = getComputedStyle(document.documentElement);
  const surfaceColor = theme.getPropertyValue('--ytdynamics-surface-color').trim() || theme.color;
  const mutedSurfaceColor = theme.getPropertyValue('--ytdynamics-surface-muted-color').trim() || surfaceColor;
  const surfaceBorder = theme.getPropertyValue('--ytdynamics-surface-border').trim();
  const borderWidth = theme.getPropertyValue('--ytdynamics-border-width').trim();
  const readBackground = className => {
    probe.className = className;
    return getComputedStyle(probe).backgroundColor;
  };
  const tokens = {
    '--rm-table-background': background === 'rgba(0, 0, 0, 0)' ? themeBackground || '#fff' : background,
    '--rm-table-muted-background': readBackground('uk-background-muted'),
    '--rm-table-color': surfaceColor,
    '--rm-table-muted-color': mutedSurfaceColor,
    '--rm-table-primary-background': readBackground('uk-background-primary'),
    '--rm-table-secondary-background': readBackground('uk-background-secondary'),
    '--rm-table-border': surfaceBorder,
    '--rm-table-border-width': borderWidth
  };
  probe.remove();
  Object.entries(tokens).forEach(_ref => {
    let [name, value] = _ref;
    if (value && value !== 'rgba(0, 0, 0, 0)') frame.style.setProperty(name, value);
  });
};
const initTable = wrapper => {
  if (!(wrapper instanceof HTMLElement) || wrapper.dataset.rmTableReady === 'true') {
    return;
  }
  const frame = wrapper.closest('.rm-table-frame');
  if (!frame) {
    return;
  }
  const table = wrapper.querySelector('.rm-table');
  wrapper.dataset.rmTableReady = 'true';
  let frameRequest = 0;
  let resizeObserver = null;
  readThemeTokens(frame);
  const updateInverseSurfaces = function () {
    let forceCardsActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (!table) return;
    const cardsActive = forceCardsActive ?? (table.classList.contains('rm-table--cards') && getComputedStyle(table).display === 'block');
    const defaultCardInverse = table.classList.contains('rm-table--card-primary') || table.classList.contains('rm-table--card-secondary');
    table.querySelectorAll('tbody > .rm-table__row').forEach(row => {
      const staticInverse = row.dataset.rmTableStaticInverse === 'true';
      const mobileStyle = row.dataset.rmTableMobileStyle || 'inherit';
      const mobileInverse = ['primary', 'secondary'].includes(mobileStyle);
      const mobileNormal = ['default', 'muted'].includes(mobileStyle);
      const inverse = cardsActive ? mobileNormal ? false : mobileInverse || defaultCardInverse : staticInverse;
      row.classList.toggle('uk-light', inverse);
    });
  };
  const update = () => {
    frameRequest = 0;
    const maximumScroll = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
    const canScrollX = maximumScroll > 1;
    const canScrollY = wrapper.scrollHeight - wrapper.clientHeight > 1;
    const isRtl = getComputedStyle(wrapper).direction === 'rtl';
    const rawScroll = Math.abs(wrapper.scrollLeft);
    const scrollFromLeft = isRtl ? maximumScroll - rawScroll : rawScroll;
    const firstCell = table?.querySelector('tbody tr > :first-child, thead tr > :first-child');
    const lastCell = table?.querySelector('tbody tr > :last-child, thead tr > :last-child');
    const firstWidth = firstCell?.getBoundingClientRect().width || 0;
    const lastWidth = lastCell?.getBoundingClientRect().width || 0;
    const stickyFirst = wrapper.classList.contains('rm-table-wrapper--sticky-first');
    const stickyLast = wrapper.classList.contains('rm-table-wrapper--sticky-last');
    const stickyConflict = wrapper.classList.contains('rm-table-wrapper--sticky-safe') && canScrollX && (stickyFirst && firstWidth > wrapper.clientWidth * 0.72 || stickyLast && lastWidth > wrapper.clientWidth * 0.72 || stickyFirst && stickyLast && firstWidth + lastWidth > wrapper.clientWidth * 0.9);
    frame.classList.toggle('rm-table-frame--can-scroll-x', canScrollX);
    frame.classList.toggle('rm-table-frame--can-scroll-y', canScrollY);
    frame.classList.toggle('rm-table-frame--at-start', !canScrollX || scrollFromLeft <= 1);
    frame.classList.toggle('rm-table-frame--at-end', !canScrollX || scrollFromLeft >= maximumScroll - 1);
    wrapper.classList.toggle('rm-table-wrapper--sticky-conflict', stickyConflict);
    if (canScrollX || canScrollY) wrapper.setAttribute('tabindex', '0');else wrapper.removeAttribute('tabindex');
    updateInverseSurfaces();
  };
  const scheduleUpdate = () => {
    if (!frameRequest) {
      frameRequest = requestAnimationFrame(update);
    }
  };
  wrapper.addEventListener('scroll', scheduleUpdate, {
    passive: true
  });
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(wrapper);
    if (table) {
      resizeObserver.observe(table);
    }
  } else {
    window.addEventListener('resize', scheduleUpdate, {
      passive: true
    });
  }
  wrapper.rmTableCleanup = () => {
    if (frameRequest) cancelAnimationFrame(frameRequest);
    wrapper.removeEventListener('scroll', scheduleUpdate);
    resizeObserver?.disconnect();
    if (!resizeObserver) window.removeEventListener('resize', scheduleUpdate);
    updateInverseSurfaces(false);
    delete wrapper.dataset.rmTableReady;
    delete wrapper.rmTableCleanup;
  };
  scheduleUpdate();
};
const destroyTables = root => {
  const wrappers = root.matches?.('[data-rm-table]') ? [root] : [];
  root.querySelectorAll?.('[data-rm-table]').forEach(wrapper => wrappers.push(wrapper));
  wrappers.forEach(wrapper => wrapper.rmTableCleanup?.());
};
const initTables = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('[data-rm-table]')) {
    initTable(root);
  }
  root.querySelectorAll?.('[data-rm-table]').forEach(initTable);
};
const observeTables = () => {
  initTables();
  (0,_runtime_es6__WEBPACK_IMPORTED_MODULE_1__.observeDynamicContent)(initTables, destroyTables);
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeTables, {
    once: true
  });
} else {
  observeTables();
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUlqSCxRQUFRLENBQUN3SCxVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DeEgsUUFBUSxDQUFDMEcsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVhLGFBQWEsRUFBRTtJQUFDRSxJQUFJLEVBQUU7RUFBSSxDQUFDLENBQUM7QUFDOUUsQ0FBQyxNQUFNO0VBQ0hGLGFBQWEsQ0FBQyxDQUFDO0FBQ25CLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvcnVudGltZS5lczYiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL3RhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy90YWJsZS5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUlVOVElNRV9LRVkgPSAnX19ZVER5bmFtaWNzRG9tUnVudGltZSc7XG5cbmNvbnN0IHJ1bnRpbWUgPSB3aW5kb3dbUlVOVElNRV9LRVldIHx8IHtcbiAgICBhZGRlZDogbmV3IFNldCgpLFxuICAgIHJlbW92ZWQ6IG5ldyBTZXQoKSxcbiAgICBvYnNlcnZlcjogbnVsbCxcbn07XG5cbndpbmRvd1tSVU5USU1FX0tFWV0gPSBydW50aW1lO1xuXG5jb25zdCB2aXNpdCA9IChjYWxsYmFja3MsIG5vZGUpID0+IGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobm9kZSkpO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpZiAocnVudGltZS5vYnNlcnZlciB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XG5cbiAgICBydW50aW1lLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLmFkZGVkLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHZpc2l0KHJ1bnRpbWUucmVtb3ZlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcnVudGltZS5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9ic2VydmVEeW5hbWljQ29udGVudCA9IChvbkFkZGVkLCBvblJlbW92ZWQgPSBudWxsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmFkZChvbkFkZGVkKTtcbiAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmFkZChvblJlbW92ZWQpO1xuICAgIHN0YXJ0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUuYWRkZWQuZGVsZXRlKG9uQWRkZWQpO1xuICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmRlbGV0ZShvblJlbW92ZWQpO1xuICAgIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3RhYmxlLnNjc3MnO1xuaW1wb3J0IHtvYnNlcnZlRHluYW1pY0NvbnRlbnR9IGZyb20gJy4vcnVudGltZS5lczYnO1xuXG5jb25zdCByZWFkVGhlbWVUb2tlbnMgPSAoZnJhbWUpID0+IHtcbiAgICBjb25zdCBwcm9iZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBwcm9iZS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjA7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO3Zpc2liaWxpdHk6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmUnO1xuICAgIGZyYW1lLmFwcGVuZChwcm9iZSk7XG5cbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gZ2V0Q29tcHV0ZWRTdHlsZShmcmFtZSkuYmFja2dyb3VuZENvbG9yO1xuXHRjb25zdCB0aGVtZUJhY2tncm91bmQgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcblx0XHQuZ2V0UHJvcGVydHlWYWx1ZSgnLS15dGR5bmFtaWNzLWJhY2tncm91bmQnKVxuXHRcdC50cmltKCk7XG5cdGNvbnN0IHRoZW1lID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXHRjb25zdCBzdXJmYWNlQ29sb3IgPSB0aGVtZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXl0ZHluYW1pY3Mtc3VyZmFjZS1jb2xvcicpLnRyaW0oKSB8fCB0aGVtZS5jb2xvcjtcblx0Y29uc3QgbXV0ZWRTdXJmYWNlQ29sb3IgPSB0aGVtZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXl0ZHluYW1pY3Mtc3VyZmFjZS1tdXRlZC1jb2xvcicpLnRyaW0oKSB8fCBzdXJmYWNlQ29sb3I7XG5cdGNvbnN0IHN1cmZhY2VCb3JkZXIgPSB0aGVtZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXl0ZHluYW1pY3Mtc3VyZmFjZS1ib3JkZXInKS50cmltKCk7XG5cdGNvbnN0IGJvcmRlcldpZHRoID0gdGhlbWUuZ2V0UHJvcGVydHlWYWx1ZSgnLS15dGR5bmFtaWNzLWJvcmRlci13aWR0aCcpLnRyaW0oKTtcbiAgICBjb25zdCByZWFkQmFja2dyb3VuZCA9IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgcHJvYmUuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShwcm9iZSkuYmFja2dyb3VuZENvbG9yO1xuICAgIH07XG4gICAgY29uc3QgdG9rZW5zID0ge1xuICAgICAgICAnLS1ybS10YWJsZS1iYWNrZ3JvdW5kJzogYmFja2dyb3VuZCA9PT0gJ3JnYmEoMCwgMCwgMCwgMCknXG5cdFx0XHQ/ICh0aGVtZUJhY2tncm91bmQgfHwgJyNmZmYnKVxuXHRcdFx0OiBiYWNrZ3JvdW5kLFxuICAgICAgICAnLS1ybS10YWJsZS1tdXRlZC1iYWNrZ3JvdW5kJzogcmVhZEJhY2tncm91bmQoJ3VrLWJhY2tncm91bmQtbXV0ZWQnKSxcbiAgICAgICAgJy0tcm0tdGFibGUtY29sb3InOiBzdXJmYWNlQ29sb3IsXG4gICAgICAgICctLXJtLXRhYmxlLW11dGVkLWNvbG9yJzogbXV0ZWRTdXJmYWNlQ29sb3IsXG4gICAgICAgICctLXJtLXRhYmxlLXByaW1hcnktYmFja2dyb3VuZCc6IHJlYWRCYWNrZ3JvdW5kKCd1ay1iYWNrZ3JvdW5kLXByaW1hcnknKSxcbiAgICAgICAgJy0tcm0tdGFibGUtc2Vjb25kYXJ5LWJhY2tncm91bmQnOiByZWFkQmFja2dyb3VuZCgndWstYmFja2dyb3VuZC1zZWNvbmRhcnknKSxcblx0XHQnLS1ybS10YWJsZS1ib3JkZXInOiBzdXJmYWNlQm9yZGVyLFxuXHRcdCctLXJtLXRhYmxlLWJvcmRlci13aWR0aCc6IGJvcmRlcldpZHRoXG4gICAgfTtcbiAgICBwcm9iZS5yZW1vdmUoKTtcblxuICAgIE9iamVjdC5lbnRyaWVzKHRva2VucykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICdyZ2JhKDAsIDAsIDAsIDApJykgZnJhbWUuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgIH0pO1xufTtcblxuY29uc3QgaW5pdFRhYmxlID0gKHdyYXBwZXIpID0+IHtcbiAgICBpZiAoISh3cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8IHdyYXBwZXIuZGF0YXNldC5ybVRhYmxlUmVhZHkgPT09ICd0cnVlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZnJhbWUgPSB3cmFwcGVyLmNsb3Nlc3QoJy5ybS10YWJsZS1mcmFtZScpO1xuICAgIGlmICghZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucm0tdGFibGUnKTtcbiAgICB3cmFwcGVyLmRhdGFzZXQucm1UYWJsZVJlYWR5ID0gJ3RydWUnO1xuICAgIGxldCBmcmFtZVJlcXVlc3QgPSAwO1xuXHRsZXQgcmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuXHRyZWFkVGhlbWVUb2tlbnMoZnJhbWUpO1xuXG5cdGNvbnN0IHVwZGF0ZUludmVyc2VTdXJmYWNlcyA9IChmb3JjZUNhcmRzQWN0aXZlID0gbnVsbCkgPT4ge1xuXHRcdGlmICghdGFibGUpIHJldHVybjtcblxuXHRcdGNvbnN0IGNhcmRzQWN0aXZlID0gZm9yY2VDYXJkc0FjdGl2ZSA/PyAodGFibGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdybS10YWJsZS0tY2FyZHMnKVxuXHRcdFx0JiYgZ2V0Q29tcHV0ZWRTdHlsZSh0YWJsZSkuZGlzcGxheSA9PT0gJ2Jsb2NrJyk7XG5cdFx0Y29uc3QgZGVmYXVsdENhcmRJbnZlcnNlID0gdGFibGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdybS10YWJsZS0tY2FyZC1wcmltYXJ5Jylcblx0XHRcdHx8IHRhYmxlLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtLWNhcmQtc2Vjb25kYXJ5Jyk7XG5cblx0XHR0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSA+IC5ybS10YWJsZV9fcm93JykuZm9yRWFjaCgocm93KSA9PiB7XG5cdFx0XHRjb25zdCBzdGF0aWNJbnZlcnNlID0gcm93LmRhdGFzZXQucm1UYWJsZVN0YXRpY0ludmVyc2UgPT09ICd0cnVlJztcblx0XHRcdGNvbnN0IG1vYmlsZVN0eWxlID0gcm93LmRhdGFzZXQucm1UYWJsZU1vYmlsZVN0eWxlIHx8ICdpbmhlcml0Jztcblx0XHRcdGNvbnN0IG1vYmlsZUludmVyc2UgPSBbJ3ByaW1hcnknLCAnc2Vjb25kYXJ5J10uaW5jbHVkZXMobW9iaWxlU3R5bGUpO1xuXHRcdFx0Y29uc3QgbW9iaWxlTm9ybWFsID0gWydkZWZhdWx0JywgJ211dGVkJ10uaW5jbHVkZXMobW9iaWxlU3R5bGUpO1xuXHRcdFx0Y29uc3QgaW52ZXJzZSA9IGNhcmRzQWN0aXZlXG5cdFx0XHRcdD8gKG1vYmlsZU5vcm1hbCA/IGZhbHNlIDogKG1vYmlsZUludmVyc2UgfHwgZGVmYXVsdENhcmRJbnZlcnNlKSlcblx0XHRcdFx0OiBzdGF0aWNJbnZlcnNlO1xuXG5cdFx0XHRyb3cuY2xhc3NMaXN0LnRvZ2dsZSgndWstbGlnaHQnLCBpbnZlcnNlKTtcblx0XHR9KTtcblx0fTtcblxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgZnJhbWVSZXF1ZXN0ID0gMDtcbiAgICAgICAgY29uc3QgbWF4aW11bVNjcm9sbCA9IE1hdGgubWF4KDAsIHdyYXBwZXIuc2Nyb2xsV2lkdGggLSB3cmFwcGVyLmNsaWVudFdpZHRoKTtcbiAgICAgICAgY29uc3QgY2FuU2Nyb2xsWCA9IG1heGltdW1TY3JvbGwgPiAxO1xuICAgICAgICBjb25zdCBjYW5TY3JvbGxZID0gd3JhcHBlci5zY3JvbGxIZWlnaHQgLSB3cmFwcGVyLmNsaWVudEhlaWdodCA+IDE7XG4gICAgICAgIGNvbnN0IGlzUnRsID0gZ2V0Q29tcHV0ZWRTdHlsZSh3cmFwcGVyKS5kaXJlY3Rpb24gPT09ICdydGwnO1xuICAgICAgICBjb25zdCByYXdTY3JvbGwgPSBNYXRoLmFicyh3cmFwcGVyLnNjcm9sbExlZnQpO1xuICAgICAgICBjb25zdCBzY3JvbGxGcm9tTGVmdCA9IGlzUnRsID8gbWF4aW11bVNjcm9sbCAtIHJhd1Njcm9sbCA6IHJhd1Njcm9sbDtcbiAgICAgICAgY29uc3QgZmlyc3RDZWxsID0gdGFibGU/LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5IHRyID4gOmZpcnN0LWNoaWxkLCB0aGVhZCB0ciA+IDpmaXJzdC1jaGlsZCcpO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbCA9IHRhYmxlPy5xdWVyeVNlbGVjdG9yKCd0Ym9keSB0ciA+IDpsYXN0LWNoaWxkLCB0aGVhZCB0ciA+IDpsYXN0LWNoaWxkJyk7XG4gICAgICAgIGNvbnN0IGZpcnN0V2lkdGggPSBmaXJzdENlbGw/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHx8IDA7XG4gICAgICAgIGNvbnN0IGxhc3RXaWR0aCA9IGxhc3RDZWxsPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCAwO1xuICAgICAgICBjb25zdCBzdGlja3lGaXJzdCA9IHdyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdybS10YWJsZS13cmFwcGVyLS1zdGlja3ktZmlyc3QnKTtcbiAgICAgICAgY29uc3Qgc3RpY2t5TGFzdCA9IHdyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdybS10YWJsZS13cmFwcGVyLS1zdGlja3ktbGFzdCcpO1xuICAgICAgICBjb25zdCBzdGlja3lDb25mbGljdCA9IHdyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdybS10YWJsZS13cmFwcGVyLS1zdGlja3ktc2FmZScpICYmIGNhblNjcm9sbFggJiYgKFxuICAgICAgICAgICAgKHN0aWNreUZpcnN0ICYmIGZpcnN0V2lkdGggPiB3cmFwcGVyLmNsaWVudFdpZHRoICogMC43MilcbiAgICAgICAgICAgIHx8IChzdGlja3lMYXN0ICYmIGxhc3RXaWR0aCA+IHdyYXBwZXIuY2xpZW50V2lkdGggKiAwLjcyKVxuICAgICAgICAgICAgfHwgKHN0aWNreUZpcnN0ICYmIHN0aWNreUxhc3QgJiYgZmlyc3RXaWR0aCArIGxhc3RXaWR0aCA+IHdyYXBwZXIuY2xpZW50V2lkdGggKiAwLjkpXG4gICAgICAgICk7XG5cbiAgICAgICAgZnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgncm0tdGFibGUtZnJhbWUtLWNhbi1zY3JvbGwteCcsIGNhblNjcm9sbFgpO1xuICAgICAgICBmcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdybS10YWJsZS1mcmFtZS0tY2FuLXNjcm9sbC15JywgY2FuU2Nyb2xsWSk7XG4gICAgICAgIGZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ3JtLXRhYmxlLWZyYW1lLS1hdC1zdGFydCcsICFjYW5TY3JvbGxYIHx8IHNjcm9sbEZyb21MZWZ0IDw9IDEpO1xuICAgICAgICBmcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdybS10YWJsZS1mcmFtZS0tYXQtZW5kJywgIWNhblNjcm9sbFggfHwgc2Nyb2xsRnJvbUxlZnQgPj0gbWF4aW11bVNjcm9sbCAtIDEpO1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ3JtLXRhYmxlLXdyYXBwZXItLXN0aWNreS1jb25mbGljdCcsIHN0aWNreUNvbmZsaWN0KTtcblx0XHRpZiAoY2FuU2Nyb2xsWCB8fCBjYW5TY3JvbGxZKSB3cmFwcGVyLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdGVsc2Ugd3JhcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cdFx0dXBkYXRlSW52ZXJzZVN1cmZhY2VzKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNjaGVkdWxlVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWZyYW1lUmVxdWVzdCkge1xuICAgICAgICAgICAgZnJhbWVSZXF1ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY2hlZHVsZVVwZGF0ZSwge3Bhc3NpdmU6IHRydWV9KTtcblxuICAgIGlmICgnUmVzaXplT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuXHRcdHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHNjaGVkdWxlVXBkYXRlKTtcblx0XHRyZXNpemVPYnNlcnZlci5vYnNlcnZlKHdyYXBwZXIpO1xuICAgICAgICBpZiAodGFibGUpIHtcblx0XHRcdHJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGFibGUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNjaGVkdWxlVXBkYXRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuICAgIH1cblxuXHR3cmFwcGVyLnJtVGFibGVDbGVhbnVwID0gKCkgPT4ge1xuXHRcdGlmIChmcmFtZVJlcXVlc3QpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lUmVxdWVzdCk7XG5cdFx0d3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY2hlZHVsZVVwZGF0ZSk7XG5cdFx0cmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblx0XHRpZiAoIXJlc2l6ZU9ic2VydmVyKSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2NoZWR1bGVVcGRhdGUpO1xuXHRcdHVwZGF0ZUludmVyc2VTdXJmYWNlcyhmYWxzZSk7XG5cdFx0ZGVsZXRlIHdyYXBwZXIuZGF0YXNldC5ybVRhYmxlUmVhZHk7XG5cdFx0ZGVsZXRlIHdyYXBwZXIucm1UYWJsZUNsZWFudXA7XG5cdH07XG5cbiAgICBzY2hlZHVsZVVwZGF0ZSgpO1xufTtcblxuY29uc3QgZGVzdHJveVRhYmxlcyA9IChyb290KSA9PiB7XG5cdGNvbnN0IHdyYXBwZXJzID0gcm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXRhYmxlXScpID8gW3Jvb3RdIDogW107XG5cdHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCdbZGF0YS1ybS10YWJsZV0nKS5mb3JFYWNoKCh3cmFwcGVyKSA9PiB3cmFwcGVycy5wdXNoKHdyYXBwZXIpKTtcblx0d3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4gd3JhcHBlci5ybVRhYmxlQ2xlYW51cD8uKCkpO1xufTtcblxuY29uc3QgaW5pdFRhYmxlcyA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXRhYmxlXScpKSB7XG4gICAgICAgIGluaXRUYWJsZShyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tdGFibGVdJykuZm9yRWFjaChpbml0VGFibGUpO1xufTtcblxuY29uc3Qgb2JzZXJ2ZVRhYmxlcyA9ICgpID0+IHtcbiAgICBpbml0VGFibGVzKCk7XG5cblx0b2JzZXJ2ZUR5bmFtaWNDb250ZW50KGluaXRUYWJsZXMsIGRlc3Ryb3lUYWJsZXMpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBvYnNlcnZlVGFibGVzLCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBvYnNlcnZlVGFibGVzKCk7XG59XG4iXSwibmFtZXMiOlsiUlVOVElNRV9LRVkiLCJydW50aW1lIiwid2luZG93IiwiYWRkZWQiLCJTZXQiLCJyZW1vdmVkIiwib2JzZXJ2ZXIiLCJ2aXNpdCIsImNhbGxiYWNrcyIsIm5vZGUiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJzdGFydCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiTXV0YXRpb25PYnNlcnZlciIsInJlY29yZHMiLCJfcmVmIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIkVMRU1FTlRfTk9ERSIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwib2JzZXJ2ZUR5bmFtaWNDb250ZW50Iiwib25BZGRlZCIsIm9uUmVtb3ZlZCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImFkZCIsImRlbGV0ZSIsInJlYWRUaGVtZVRva2VucyIsImZyYW1lIiwicHJvYmUiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiYXBwZW5kIiwiYmFja2dyb3VuZCIsImdldENvbXB1dGVkU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aGVtZUJhY2tncm91bmQiLCJnZXRQcm9wZXJ0eVZhbHVlIiwidHJpbSIsInRoZW1lIiwic3VyZmFjZUNvbG9yIiwiY29sb3IiLCJtdXRlZFN1cmZhY2VDb2xvciIsInN1cmZhY2VCb3JkZXIiLCJib3JkZXJXaWR0aCIsInJlYWRCYWNrZ3JvdW5kIiwiY2xhc3NOYW1lIiwidG9rZW5zIiwicmVtb3ZlIiwiT2JqZWN0IiwiZW50cmllcyIsIm5hbWUiLCJ2YWx1ZSIsInNldFByb3BlcnR5IiwiaW5pdFRhYmxlIiwid3JhcHBlciIsIkhUTUxFbGVtZW50IiwiZGF0YXNldCIsInJtVGFibGVSZWFkeSIsImNsb3Nlc3QiLCJ0YWJsZSIsInF1ZXJ5U2VsZWN0b3IiLCJmcmFtZVJlcXVlc3QiLCJyZXNpemVPYnNlcnZlciIsInVwZGF0ZUludmVyc2VTdXJmYWNlcyIsImZvcmNlQ2FyZHNBY3RpdmUiLCJjYXJkc0FjdGl2ZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZGlzcGxheSIsImRlZmF1bHRDYXJkSW52ZXJzZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyb3ciLCJzdGF0aWNJbnZlcnNlIiwicm1UYWJsZVN0YXRpY0ludmVyc2UiLCJtb2JpbGVTdHlsZSIsInJtVGFibGVNb2JpbGVTdHlsZSIsIm1vYmlsZUludmVyc2UiLCJpbmNsdWRlcyIsIm1vYmlsZU5vcm1hbCIsImludmVyc2UiLCJ0b2dnbGUiLCJ1cGRhdGUiLCJtYXhpbXVtU2Nyb2xsIiwiTWF0aCIsIm1heCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJjYW5TY3JvbGxYIiwiY2FuU2Nyb2xsWSIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImlzUnRsIiwiZGlyZWN0aW9uIiwicmF3U2Nyb2xsIiwiYWJzIiwic2Nyb2xsTGVmdCIsInNjcm9sbEZyb21MZWZ0IiwiZmlyc3RDZWxsIiwibGFzdENlbGwiLCJmaXJzdFdpZHRoIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJsYXN0V2lkdGgiLCJzdGlja3lGaXJzdCIsInN0aWNreUxhc3QiLCJzdGlja3lDb25mbGljdCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNjaGVkdWxlVXBkYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJSZXNpemVPYnNlcnZlciIsInJtVGFibGVDbGVhbnVwIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzY29ubmVjdCIsImRlc3Ryb3lUYWJsZXMiLCJyb290Iiwid3JhcHBlcnMiLCJtYXRjaGVzIiwicHVzaCIsImluaXRUYWJsZXMiLCJvYnNlcnZlVGFibGVzIiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9