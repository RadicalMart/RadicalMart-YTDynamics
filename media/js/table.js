/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

const readThemeTokens = frame => {
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
  frame.append(probe);
  const divider = document.createElement('table');
  divider.className = 'uk-table uk-table-divider';
  divider.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none';
  divider.innerHTML = '<tbody><tr><td></td></tr><tr><td></td></tr></tbody>';
  frame.append(divider);
  const background = getComputedStyle(frame).backgroundColor;
  const themeBackground = getComputedStyle(document.documentElement).getPropertyValue('--ytdynamics-background').trim();
  const border = getComputedStyle(divider.rows[1].cells[0]).borderTopColor;
  const readBackground = className => {
    probe.className = className;
    return getComputedStyle(probe).backgroundColor;
  };
  const tokens = {
    '--rm-table-background': background === 'rgba(0, 0, 0, 0)' ? themeBackground || '#fff' : background,
    '--rm-table-muted-background': readBackground('uk-background-muted'),
    '--rm-table-primary-background': readBackground('uk-background-primary'),
    '--rm-table-secondary-background': readBackground('uk-background-secondary'),
    '--rm-table-border': border
  };
  probe.remove();
  divider.remove();
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
    delete wrapper.dataset.rmTableReady;
    delete wrapper.rmTableCleanup;
  };
  scheduleUpdate();
};
const destroyTables = root => {
  const wrappers = root.matches?.('[data-rm-table-scroll]') ? [root] : [];
  root.querySelectorAll?.('[data-rm-table-scroll]').forEach(wrapper => wrappers.push(wrapper));
  wrappers.forEach(wrapper => wrapper.rmTableCleanup?.());
};
const initTables = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('[data-rm-table-scroll]')) {
    initTable(root);
  }
  root.querySelectorAll?.('[data-rm-table-scroll]').forEach(initTable);
};
const observeTables = () => {
  initTables();
  new MutationObserver(records => {
    records.forEach(_ref2 => {
      let {
        addedNodes,
        removedNodes
      } = _ref2;
      addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          initTables(node);
        }
      });
      removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) destroyTables(node);
      });
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxJQUFnQztNQUFBLElBQS9CO1FBQUNDLFVBQVU7UUFBRUM7TUFBWSxDQUFDLEdBQUFGLEtBQUE7TUFDMUNDLFVBQVUsQ0FBQ3RFLE9BQU8sQ0FBRXdFLElBQUksSUFBSztRQUNoQixJQUFJQSxJQUFJLENBQUNDLFFBQVEsS0FBS0MsSUFBSSxDQUFDQyxZQUFZLEVBQUU7VUFDckNiLFVBQVUsQ0FBQ1UsSUFBSSxDQUFDO1FBQ3BCO01BQ2IsQ0FBQyxDQUFDO01BQ0ZELFlBQVksQ0FBQ3ZFLE9BQU8sQ0FBRXdFLElBQUksSUFBSztRQUM5QixJQUFJQSxJQUFJLENBQUNDLFFBQVEsS0FBS0MsSUFBSSxDQUFDQyxZQUFZLEVBQUVuQixhQUFhLENBQUNnQixJQUFJLENBQUM7TUFDN0QsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0EsQ0FBQyxDQUFDLENBQUNyQixPQUFPLENBQUMzRSxRQUFRLENBQUNZLGVBQWUsRUFBRTtJQUFDd0YsU0FBUyxFQUFFLElBQUk7SUFBRUMsT0FBTyxFQUFFO0VBQUksQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxJQUFJckcsUUFBUSxDQUFDc0csVUFBVSxLQUFLLFNBQVMsRUFBRTtFQUNuQ3RHLFFBQVEsQ0FBQ3VFLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFbUIsYUFBYSxFQUFFO0lBQUNhLElBQUksRUFBRTtFQUFJLENBQUMsQ0FBQztBQUM5RSxDQUFDLE1BQU07RUFDSGIsYUFBYSxDQUFDLENBQUM7QUFDbkIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy90YWJsZS5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdGFibGUuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi90YWJsZS5zY3NzJztcblxuY29uc3QgcmVhZFRoZW1lVG9rZW5zID0gKGZyYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvYmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcHJvYmUuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowO2hlaWdodDowO292ZXJmbG93OmhpZGRlbjt2aXNpYmlsaXR5OmhpZGRlbjtwb2ludGVyLWV2ZW50czpub25lJztcbiAgICBmcmFtZS5hcHBlbmQocHJvYmUpO1xuXHRjb25zdCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcblx0ZGl2aWRlci5jbGFzc05hbWUgPSAndWstdGFibGUgdWstdGFibGUtZGl2aWRlcic7XG5cdGRpdmlkZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7aGVpZ2h0OjFweDtvdmVyZmxvdzpoaWRkZW47dmlzaWJpbGl0eTpoaWRkZW47cG9pbnRlci1ldmVudHM6bm9uZSc7XG5cdGRpdmlkZXIuaW5uZXJIVE1MID0gJzx0Ym9keT48dHI+PHRkPjwvdGQ+PC90cj48dHI+PHRkPjwvdGQ+PC90cj48L3Rib2R5Pic7XG5cdGZyYW1lLmFwcGVuZChkaXZpZGVyKTtcblxuICAgIGNvbnN0IGJhY2tncm91bmQgPSBnZXRDb21wdXRlZFN0eWxlKGZyYW1lKS5iYWNrZ3JvdW5kQ29sb3I7XG5cdGNvbnN0IHRoZW1lQmFja2dyb3VuZCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuXHRcdC5nZXRQcm9wZXJ0eVZhbHVlKCctLXl0ZHluYW1pY3MtYmFja2dyb3VuZCcpXG5cdFx0LnRyaW0oKTtcblx0Y29uc3QgYm9yZGVyID0gZ2V0Q29tcHV0ZWRTdHlsZShkaXZpZGVyLnJvd3NbMV0uY2VsbHNbMF0pLmJvcmRlclRvcENvbG9yO1xuICAgIGNvbnN0IHJlYWRCYWNrZ3JvdW5kID0gKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICBwcm9iZS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKHByb2JlKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgfTtcbiAgICBjb25zdCB0b2tlbnMgPSB7XG4gICAgICAgICctLXJtLXRhYmxlLWJhY2tncm91bmQnOiBiYWNrZ3JvdW5kID09PSAncmdiYSgwLCAwLCAwLCAwKSdcblx0XHRcdD8gKHRoZW1lQmFja2dyb3VuZCB8fCAnI2ZmZicpXG5cdFx0XHQ6IGJhY2tncm91bmQsXG4gICAgICAgICctLXJtLXRhYmxlLW11dGVkLWJhY2tncm91bmQnOiByZWFkQmFja2dyb3VuZCgndWstYmFja2dyb3VuZC1tdXRlZCcpLFxuICAgICAgICAnLS1ybS10YWJsZS1wcmltYXJ5LWJhY2tncm91bmQnOiByZWFkQmFja2dyb3VuZCgndWstYmFja2dyb3VuZC1wcmltYXJ5JyksXG4gICAgICAgICctLXJtLXRhYmxlLXNlY29uZGFyeS1iYWNrZ3JvdW5kJzogcmVhZEJhY2tncm91bmQoJ3VrLWJhY2tncm91bmQtc2Vjb25kYXJ5JyksXG5cdFx0Jy0tcm0tdGFibGUtYm9yZGVyJzogYm9yZGVyXG4gICAgfTtcbiAgICBwcm9iZS5yZW1vdmUoKTtcblx0ZGl2aWRlci5yZW1vdmUoKTtcblxuICAgIE9iamVjdC5lbnRyaWVzKHRva2VucykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICdyZ2JhKDAsIDAsIDAsIDApJykgZnJhbWUuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgIH0pO1xufTtcblxuY29uc3QgaW5pdFRhYmxlID0gKHdyYXBwZXIpID0+IHtcbiAgICBpZiAoISh3cmFwcGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8IHdyYXBwZXIuZGF0YXNldC5ybVRhYmxlUmVhZHkgPT09ICd0cnVlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZnJhbWUgPSB3cmFwcGVyLmNsb3Nlc3QoJy5ybS10YWJsZS1mcmFtZScpO1xuICAgIGlmICghZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcucm0tdGFibGUnKTtcbiAgICB3cmFwcGVyLmRhdGFzZXQucm1UYWJsZVJlYWR5ID0gJ3RydWUnO1xuICAgIGxldCBmcmFtZVJlcXVlc3QgPSAwO1xuXHRsZXQgcmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuXHRyZWFkVGhlbWVUb2tlbnMoZnJhbWUpO1xuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBmcmFtZVJlcXVlc3QgPSAwO1xuICAgICAgICBjb25zdCBtYXhpbXVtU2Nyb2xsID0gTWF0aC5tYXgoMCwgd3JhcHBlci5zY3JvbGxXaWR0aCAtIHdyYXBwZXIuY2xpZW50V2lkdGgpO1xuICAgICAgICBjb25zdCBjYW5TY3JvbGxYID0gbWF4aW11bVNjcm9sbCA+IDE7XG4gICAgICAgIGNvbnN0IGNhblNjcm9sbFkgPSB3cmFwcGVyLnNjcm9sbEhlaWdodCAtIHdyYXBwZXIuY2xpZW50SGVpZ2h0ID4gMTtcbiAgICAgICAgY29uc3QgaXNSdGwgPSBnZXRDb21wdXRlZFN0eWxlKHdyYXBwZXIpLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgIGNvbnN0IHJhd1Njcm9sbCA9IE1hdGguYWJzKHdyYXBwZXIuc2Nyb2xsTGVmdCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbEZyb21MZWZ0ID0gaXNSdGwgPyBtYXhpbXVtU2Nyb2xsIC0gcmF3U2Nyb2xsIDogcmF3U2Nyb2xsO1xuICAgICAgICBjb25zdCBmaXJzdENlbGwgPSB0YWJsZT8ucXVlcnlTZWxlY3RvcigndGJvZHkgdHIgPiA6Zmlyc3QtY2hpbGQsIHRoZWFkIHRyID4gOmZpcnN0LWNoaWxkJyk7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsID0gdGFibGU/LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5IHRyID4gOmxhc3QtY2hpbGQsIHRoZWFkIHRyID4gOmxhc3QtY2hpbGQnKTtcbiAgICAgICAgY29uc3QgZmlyc3RXaWR0aCA9IGZpcnN0Q2VsbD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgMDtcbiAgICAgICAgY29uc3QgbGFzdFdpZHRoID0gbGFzdENlbGw/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHx8IDA7XG4gICAgICAgIGNvbnN0IHN0aWNreUZpcnN0ID0gd3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ3JtLXRhYmxlLXdyYXBwZXItLXN0aWNreS1maXJzdCcpO1xuICAgICAgICBjb25zdCBzdGlja3lMYXN0ID0gd3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ3JtLXRhYmxlLXdyYXBwZXItLXN0aWNreS1sYXN0Jyk7XG4gICAgICAgIGNvbnN0IHN0aWNreUNvbmZsaWN0ID0gd3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ3JtLXRhYmxlLXdyYXBwZXItLXN0aWNreS1zYWZlJykgJiYgY2FuU2Nyb2xsWCAmJiAoXG4gICAgICAgICAgICAoc3RpY2t5Rmlyc3QgJiYgZmlyc3RXaWR0aCA+IHdyYXBwZXIuY2xpZW50V2lkdGggKiAwLjcyKVxuICAgICAgICAgICAgfHwgKHN0aWNreUxhc3QgJiYgbGFzdFdpZHRoID4gd3JhcHBlci5jbGllbnRXaWR0aCAqIDAuNzIpXG4gICAgICAgICAgICB8fCAoc3RpY2t5Rmlyc3QgJiYgc3RpY2t5TGFzdCAmJiBmaXJzdFdpZHRoICsgbGFzdFdpZHRoID4gd3JhcHBlci5jbGllbnRXaWR0aCAqIDAuOSlcbiAgICAgICAgKTtcblxuICAgICAgICBmcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdybS10YWJsZS1mcmFtZS0tY2FuLXNjcm9sbC14JywgY2FuU2Nyb2xsWCk7XG4gICAgICAgIGZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ3JtLXRhYmxlLWZyYW1lLS1jYW4tc2Nyb2xsLXknLCBjYW5TY3JvbGxZKTtcbiAgICAgICAgZnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgncm0tdGFibGUtZnJhbWUtLWF0LXN0YXJ0JywgIWNhblNjcm9sbFggfHwgc2Nyb2xsRnJvbUxlZnQgPD0gMSk7XG4gICAgICAgIGZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ3JtLXRhYmxlLWZyYW1lLS1hdC1lbmQnLCAhY2FuU2Nyb2xsWCB8fCBzY3JvbGxGcm9tTGVmdCA+PSBtYXhpbXVtU2Nyb2xsIC0gMSk7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZSgncm0tdGFibGUtd3JhcHBlci0tc3RpY2t5LWNvbmZsaWN0Jywgc3RpY2t5Q29uZmxpY3QpO1xuXHRcdGlmIChjYW5TY3JvbGxYIHx8IGNhblNjcm9sbFkpIHdyYXBwZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0ZWxzZSB3cmFwcGVyLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2NoZWR1bGVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICghZnJhbWVSZXF1ZXN0KSB7XG4gICAgICAgICAgICBmcmFtZVJlcXVlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjaGVkdWxlVXBkYXRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4gICAgaWYgKCdSZXNpemVPYnNlcnZlcicgaW4gd2luZG93KSB7XG5cdFx0cmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoc2NoZWR1bGVVcGRhdGUpO1xuXHRcdHJlc2l6ZU9ic2VydmVyLm9ic2VydmUod3JhcHBlcik7XG4gICAgICAgIGlmICh0YWJsZSkge1xuXHRcdFx0cmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0YWJsZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2NoZWR1bGVVcGRhdGUsIHtwYXNzaXZlOiB0cnVlfSk7XG4gICAgfVxuXG5cdHdyYXBwZXIucm1UYWJsZUNsZWFudXAgPSAoKSA9PiB7XG5cdFx0aWYgKGZyYW1lUmVxdWVzdCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVSZXF1ZXN0KTtcblx0XHR3cmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjaGVkdWxlVXBkYXRlKTtcblx0XHRyZXNpemVPYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuXHRcdGlmICghcmVzaXplT2JzZXJ2ZXIpIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzY2hlZHVsZVVwZGF0ZSk7XG5cdFx0ZGVsZXRlIHdyYXBwZXIuZGF0YXNldC5ybVRhYmxlUmVhZHk7XG5cdFx0ZGVsZXRlIHdyYXBwZXIucm1UYWJsZUNsZWFudXA7XG5cdH07XG5cbiAgICBzY2hlZHVsZVVwZGF0ZSgpO1xufTtcblxuY29uc3QgZGVzdHJveVRhYmxlcyA9IChyb290KSA9PiB7XG5cdGNvbnN0IHdyYXBwZXJzID0gcm9vdC5tYXRjaGVzPy4oJ1tkYXRhLXJtLXRhYmxlLXNjcm9sbF0nKSA/IFtyb290XSA6IFtdO1xuXHRyb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tdGFibGUtc2Nyb2xsXScpLmZvckVhY2goKHdyYXBwZXIpID0+IHdyYXBwZXJzLnB1c2god3JhcHBlcikpO1xuXHR3cmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB3cmFwcGVyLnJtVGFibGVDbGVhbnVwPy4oKSk7XG59O1xuXG5jb25zdCBpbml0VGFibGVzID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tdGFibGUtc2Nyb2xsXScpKSB7XG4gICAgICAgIGluaXRUYWJsZShyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tdGFibGUtc2Nyb2xsXScpLmZvckVhY2goaW5pdFRhYmxlKTtcbn07XG5cbmNvbnN0IG9ic2VydmVUYWJsZXMgPSAoKSA9PiB7XG4gICAgaW5pdFRhYmxlcygpO1xuXG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcblx0XHRyZWNvcmRzLmZvckVhY2goKHthZGRlZE5vZGVzLCByZW1vdmVkTm9kZXN9KSA9PiB7XG5cdFx0XHRhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFRhYmxlcyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9KTtcblx0XHRcdHJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkgZGVzdHJveVRhYmxlcyhub2RlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuICAgIH0pLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG9ic2VydmVUYWJsZXMsIHtvbmNlOiB0cnVlfSk7XG59IGVsc2Uge1xuICAgIG9ic2VydmVUYWJsZXMoKTtcbn1cbiJdLCJuYW1lcyI6WyJyZWFkVGhlbWVUb2tlbnMiLCJmcmFtZSIsInByb2JlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiYXBwZW5kIiwiZGl2aWRlciIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImJhY2tncm91bmQiLCJnZXRDb21wdXRlZFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidGhlbWVCYWNrZ3JvdW5kIiwiZG9jdW1lbnRFbGVtZW50IiwiZ2V0UHJvcGVydHlWYWx1ZSIsInRyaW0iLCJib3JkZXIiLCJyb3dzIiwiY2VsbHMiLCJib3JkZXJUb3BDb2xvciIsInJlYWRCYWNrZ3JvdW5kIiwidG9rZW5zIiwicmVtb3ZlIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJfcmVmIiwibmFtZSIsInZhbHVlIiwic2V0UHJvcGVydHkiLCJpbml0VGFibGUiLCJ3cmFwcGVyIiwiSFRNTEVsZW1lbnQiLCJkYXRhc2V0Iiwicm1UYWJsZVJlYWR5IiwiY2xvc2VzdCIsInRhYmxlIiwicXVlcnlTZWxlY3RvciIsImZyYW1lUmVxdWVzdCIsInJlc2l6ZU9ic2VydmVyIiwidXBkYXRlIiwibWF4aW11bVNjcm9sbCIsIk1hdGgiLCJtYXgiLCJzY3JvbGxXaWR0aCIsImNsaWVudFdpZHRoIiwiY2FuU2Nyb2xsWCIsImNhblNjcm9sbFkiLCJzY3JvbGxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpc1J0bCIsImRpcmVjdGlvbiIsInJhd1Njcm9sbCIsImFicyIsInNjcm9sbExlZnQiLCJzY3JvbGxGcm9tTGVmdCIsImZpcnN0Q2VsbCIsImxhc3RDZWxsIiwiZmlyc3RXaWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwibGFzdFdpZHRoIiwic3RpY2t5Rmlyc3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInN0aWNreUxhc3QiLCJzdGlja3lDb25mbGljdCIsInRvZ2dsZSIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNjaGVkdWxlVXBkYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ3aW5kb3ciLCJSZXNpemVPYnNlcnZlciIsIm9ic2VydmUiLCJybVRhYmxlQ2xlYW51cCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc2Nvbm5lY3QiLCJkZXN0cm95VGFibGVzIiwicm9vdCIsIndyYXBwZXJzIiwibWF0Y2hlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwdXNoIiwiaW5pdFRhYmxlcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm9ic2VydmVUYWJsZXMiLCJNdXRhdGlvbk9ic2VydmVyIiwicmVjb3JkcyIsIl9yZWYyIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5vZGUiLCJub2RlVHlwZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9