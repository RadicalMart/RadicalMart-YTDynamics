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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eXRkeW5hbWljcy8uL3NyYy90YWJsZS5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvdGFibGUuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi90YWJsZS5zY3NzJztcblxuY29uc3QgcmVhZFRoZW1lVG9rZW5zID0gKGZyYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvYmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcHJvYmUuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowO2hlaWdodDowO292ZXJmbG93OmhpZGRlbjt2aXNpYmlsaXR5OmhpZGRlbjtwb2ludGVyLWV2ZW50czpub25lJztcbiAgICBmcmFtZS5hcHBlbmQocHJvYmUpO1xuXG4gICAgY29uc3QgYmFja2dyb3VuZCA9IGdldENvbXB1dGVkU3R5bGUoZnJhbWUpLmJhY2tncm91bmRDb2xvcjtcblx0Y29uc3QgdGhlbWVCYWNrZ3JvdW5kID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG5cdFx0LmdldFByb3BlcnR5VmFsdWUoJy0teXRkeW5hbWljcy1iYWNrZ3JvdW5kJylcblx0XHQudHJpbSgpO1xuXHRjb25zdCB0aGVtZSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblx0Y29uc3Qgc3VyZmFjZUNvbG9yID0gdGhlbWUuZ2V0UHJvcGVydHlWYWx1ZSgnLS15dGR5bmFtaWNzLXN1cmZhY2UtY29sb3InKS50cmltKCkgfHwgdGhlbWUuY29sb3I7XG5cdGNvbnN0IG11dGVkU3VyZmFjZUNvbG9yID0gdGhlbWUuZ2V0UHJvcGVydHlWYWx1ZSgnLS15dGR5bmFtaWNzLXN1cmZhY2UtbXV0ZWQtY29sb3InKS50cmltKCkgfHwgc3VyZmFjZUNvbG9yO1xuXHRjb25zdCBzdXJmYWNlQm9yZGVyID0gdGhlbWUuZ2V0UHJvcGVydHlWYWx1ZSgnLS15dGR5bmFtaWNzLXN1cmZhY2UtYm9yZGVyJykudHJpbSgpO1xuXHRjb25zdCBib3JkZXJXaWR0aCA9IHRoZW1lLmdldFByb3BlcnR5VmFsdWUoJy0teXRkeW5hbWljcy1ib3JkZXItd2lkdGgnKS50cmltKCk7XG4gICAgY29uc3QgcmVhZEJhY2tncm91bmQgPSAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHByb2JlLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUocHJvYmUpLmJhY2tncm91bmRDb2xvcjtcbiAgICB9O1xuICAgIGNvbnN0IHRva2VucyA9IHtcbiAgICAgICAgJy0tcm0tdGFibGUtYmFja2dyb3VuZCc6IGJhY2tncm91bmQgPT09ICdyZ2JhKDAsIDAsIDAsIDApJ1xuXHRcdFx0PyAodGhlbWVCYWNrZ3JvdW5kIHx8ICcjZmZmJylcblx0XHRcdDogYmFja2dyb3VuZCxcbiAgICAgICAgJy0tcm0tdGFibGUtbXV0ZWQtYmFja2dyb3VuZCc6IHJlYWRCYWNrZ3JvdW5kKCd1ay1iYWNrZ3JvdW5kLW11dGVkJyksXG4gICAgICAgICctLXJtLXRhYmxlLWNvbG9yJzogc3VyZmFjZUNvbG9yLFxuICAgICAgICAnLS1ybS10YWJsZS1tdXRlZC1jb2xvcic6IG11dGVkU3VyZmFjZUNvbG9yLFxuICAgICAgICAnLS1ybS10YWJsZS1wcmltYXJ5LWJhY2tncm91bmQnOiByZWFkQmFja2dyb3VuZCgndWstYmFja2dyb3VuZC1wcmltYXJ5JyksXG4gICAgICAgICctLXJtLXRhYmxlLXNlY29uZGFyeS1iYWNrZ3JvdW5kJzogcmVhZEJhY2tncm91bmQoJ3VrLWJhY2tncm91bmQtc2Vjb25kYXJ5JyksXG5cdFx0Jy0tcm0tdGFibGUtYm9yZGVyJzogc3VyZmFjZUJvcmRlcixcblx0XHQnLS1ybS10YWJsZS1ib3JkZXItd2lkdGgnOiBib3JkZXJXaWR0aFxuICAgIH07XG4gICAgcHJvYmUucmVtb3ZlKCk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0b2tlbnMpLmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSAncmdiYSgwLCAwLCAwLCAwKScpIGZyYW1lLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGluaXRUYWJsZSA9ICh3cmFwcGVyKSA9PiB7XG4gICAgaWYgKCEod3JhcHBlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCB3cmFwcGVyLmRhdGFzZXQucm1UYWJsZVJlYWR5ID09PSAndHJ1ZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZyYW1lID0gd3JhcHBlci5jbG9zZXN0KCcucm0tdGFibGUtZnJhbWUnKTtcbiAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZSA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcignLnJtLXRhYmxlJyk7XG4gICAgd3JhcHBlci5kYXRhc2V0LnJtVGFibGVSZWFkeSA9ICd0cnVlJztcbiAgICBsZXQgZnJhbWVSZXF1ZXN0ID0gMDtcblx0bGV0IHJlc2l6ZU9ic2VydmVyID0gbnVsbDtcblx0cmVhZFRoZW1lVG9rZW5zKGZyYW1lKTtcblxuXHRjb25zdCB1cGRhdGVJbnZlcnNlU3VyZmFjZXMgPSAoZm9yY2VDYXJkc0FjdGl2ZSA9IG51bGwpID0+IHtcblx0XHRpZiAoIXRhYmxlKSByZXR1cm47XG5cblx0XHRjb25zdCBjYXJkc0FjdGl2ZSA9IGZvcmNlQ2FyZHNBY3RpdmUgPz8gKHRhYmxlLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtLWNhcmRzJylcblx0XHRcdCYmIGdldENvbXB1dGVkU3R5bGUodGFibGUpLmRpc3BsYXkgPT09ICdibG9jaycpO1xuXHRcdGNvbnN0IGRlZmF1bHRDYXJkSW52ZXJzZSA9IHRhYmxlLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtLWNhcmQtcHJpbWFyeScpXG5cdFx0XHR8fCB0YWJsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JtLXRhYmxlLS1jYXJkLXNlY29uZGFyeScpO1xuXG5cdFx0dGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgPiAucm0tdGFibGVfX3JvdycpLmZvckVhY2goKHJvdykgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhdGljSW52ZXJzZSA9IHJvdy5kYXRhc2V0LnJtVGFibGVTdGF0aWNJbnZlcnNlID09PSAndHJ1ZSc7XG5cdFx0XHRjb25zdCBtb2JpbGVTdHlsZSA9IHJvdy5kYXRhc2V0LnJtVGFibGVNb2JpbGVTdHlsZSB8fCAnaW5oZXJpdCc7XG5cdFx0XHRjb25zdCBtb2JpbGVJbnZlcnNlID0gWydwcmltYXJ5JywgJ3NlY29uZGFyeSddLmluY2x1ZGVzKG1vYmlsZVN0eWxlKTtcblx0XHRcdGNvbnN0IG1vYmlsZU5vcm1hbCA9IFsnZGVmYXVsdCcsICdtdXRlZCddLmluY2x1ZGVzKG1vYmlsZVN0eWxlKTtcblx0XHRcdGNvbnN0IGludmVyc2UgPSBjYXJkc0FjdGl2ZVxuXHRcdFx0XHQ/IChtb2JpbGVOb3JtYWwgPyBmYWxzZSA6IChtb2JpbGVJbnZlcnNlIHx8IGRlZmF1bHRDYXJkSW52ZXJzZSkpXG5cdFx0XHRcdDogc3RhdGljSW52ZXJzZTtcblxuXHRcdFx0cm93LmNsYXNzTGlzdC50b2dnbGUoJ3VrLWxpZ2h0JywgaW52ZXJzZSk7XG5cdFx0fSk7XG5cdH07XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIGZyYW1lUmVxdWVzdCA9IDA7XG4gICAgICAgIGNvbnN0IG1heGltdW1TY3JvbGwgPSBNYXRoLm1heCgwLCB3cmFwcGVyLnNjcm9sbFdpZHRoIC0gd3JhcHBlci5jbGllbnRXaWR0aCk7XG4gICAgICAgIGNvbnN0IGNhblNjcm9sbFggPSBtYXhpbXVtU2Nyb2xsID4gMTtcbiAgICAgICAgY29uc3QgY2FuU2Nyb2xsWSA9IHdyYXBwZXIuc2Nyb2xsSGVpZ2h0IC0gd3JhcHBlci5jbGllbnRIZWlnaHQgPiAxO1xuICAgICAgICBjb25zdCBpc1J0bCA9IGdldENvbXB1dGVkU3R5bGUod3JhcHBlcikuZGlyZWN0aW9uID09PSAncnRsJztcbiAgICAgICAgY29uc3QgcmF3U2Nyb2xsID0gTWF0aC5hYnMod3JhcHBlci5zY3JvbGxMZWZ0KTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsRnJvbUxlZnQgPSBpc1J0bCA/IG1heGltdW1TY3JvbGwgLSByYXdTY3JvbGwgOiByYXdTY3JvbGw7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2VsbCA9IHRhYmxlPy5xdWVyeVNlbGVjdG9yKCd0Ym9keSB0ciA+IDpmaXJzdC1jaGlsZCwgdGhlYWQgdHIgPiA6Zmlyc3QtY2hpbGQnKTtcbiAgICAgICAgY29uc3QgbGFzdENlbGwgPSB0YWJsZT8ucXVlcnlTZWxlY3RvcigndGJvZHkgdHIgPiA6bGFzdC1jaGlsZCwgdGhlYWQgdHIgPiA6bGFzdC1jaGlsZCcpO1xuICAgICAgICBjb25zdCBmaXJzdFdpZHRoID0gZmlyc3RDZWxsPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB8fCAwO1xuICAgICAgICBjb25zdCBsYXN0V2lkdGggPSBsYXN0Q2VsbD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggfHwgMDtcbiAgICAgICAgY29uc3Qgc3RpY2t5Rmlyc3QgPSB3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtd3JhcHBlci0tc3RpY2t5LWZpcnN0Jyk7XG4gICAgICAgIGNvbnN0IHN0aWNreUxhc3QgPSB3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtd3JhcHBlci0tc3RpY2t5LWxhc3QnKTtcbiAgICAgICAgY29uc3Qgc3RpY2t5Q29uZmxpY3QgPSB3cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygncm0tdGFibGUtd3JhcHBlci0tc3RpY2t5LXNhZmUnKSAmJiBjYW5TY3JvbGxYICYmIChcbiAgICAgICAgICAgIChzdGlja3lGaXJzdCAmJiBmaXJzdFdpZHRoID4gd3JhcHBlci5jbGllbnRXaWR0aCAqIDAuNzIpXG4gICAgICAgICAgICB8fCAoc3RpY2t5TGFzdCAmJiBsYXN0V2lkdGggPiB3cmFwcGVyLmNsaWVudFdpZHRoICogMC43MilcbiAgICAgICAgICAgIHx8IChzdGlja3lGaXJzdCAmJiBzdGlja3lMYXN0ICYmIGZpcnN0V2lkdGggKyBsYXN0V2lkdGggPiB3cmFwcGVyLmNsaWVudFdpZHRoICogMC45KVxuICAgICAgICApO1xuXG4gICAgICAgIGZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ3JtLXRhYmxlLWZyYW1lLS1jYW4tc2Nyb2xsLXgnLCBjYW5TY3JvbGxYKTtcbiAgICAgICAgZnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgncm0tdGFibGUtZnJhbWUtLWNhbi1zY3JvbGwteScsIGNhblNjcm9sbFkpO1xuICAgICAgICBmcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdybS10YWJsZS1mcmFtZS0tYXQtc3RhcnQnLCAhY2FuU2Nyb2xsWCB8fCBzY3JvbGxGcm9tTGVmdCA8PSAxKTtcbiAgICAgICAgZnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgncm0tdGFibGUtZnJhbWUtLWF0LWVuZCcsICFjYW5TY3JvbGxYIHx8IHNjcm9sbEZyb21MZWZ0ID49IG1heGltdW1TY3JvbGwgLSAxKTtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKCdybS10YWJsZS13cmFwcGVyLS1zdGlja3ktY29uZmxpY3QnLCBzdGlja3lDb25mbGljdCk7XG5cdFx0aWYgKGNhblNjcm9sbFggfHwgY2FuU2Nyb2xsWSkgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRlbHNlIHdyYXBwZXIucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXHRcdHVwZGF0ZUludmVyc2VTdXJmYWNlcygpO1xuICAgIH07XG5cbiAgICBjb25zdCBzY2hlZHVsZVVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFmcmFtZVJlcXVlc3QpIHtcbiAgICAgICAgICAgIGZyYW1lUmVxdWVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2NoZWR1bGVVcGRhdGUsIHtwYXNzaXZlOiB0cnVlfSk7XG5cbiAgICBpZiAoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpIHtcblx0XHRyZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihzY2hlZHVsZVVwZGF0ZSk7XG5cdFx0cmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh3cmFwcGVyKTtcbiAgICAgICAgaWYgKHRhYmxlKSB7XG5cdFx0XHRyZXNpemVPYnNlcnZlci5vYnNlcnZlKHRhYmxlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzY2hlZHVsZVVwZGF0ZSwge3Bhc3NpdmU6IHRydWV9KTtcbiAgICB9XG5cblx0d3JhcHBlci5ybVRhYmxlQ2xlYW51cCA9ICgpID0+IHtcblx0XHRpZiAoZnJhbWVSZXF1ZXN0KSBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZVJlcXVlc3QpO1xuXHRcdHdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2NoZWR1bGVVcGRhdGUpO1xuXHRcdHJlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG5cdFx0aWYgKCFyZXNpemVPYnNlcnZlcikgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNjaGVkdWxlVXBkYXRlKTtcblx0XHR1cGRhdGVJbnZlcnNlU3VyZmFjZXMoZmFsc2UpO1xuXHRcdGRlbGV0ZSB3cmFwcGVyLmRhdGFzZXQucm1UYWJsZVJlYWR5O1xuXHRcdGRlbGV0ZSB3cmFwcGVyLnJtVGFibGVDbGVhbnVwO1xuXHR9O1xuXG4gICAgc2NoZWR1bGVVcGRhdGUoKTtcbn07XG5cbmNvbnN0IGRlc3Ryb3lUYWJsZXMgPSAocm9vdCkgPT4ge1xuXHRjb25zdCB3cmFwcGVycyA9IHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS10YWJsZV0nKSA/IFtyb290XSA6IFtdO1xuXHRyb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tdGFibGVdJykuZm9yRWFjaCgod3JhcHBlcikgPT4gd3JhcHBlcnMucHVzaCh3cmFwcGVyKSk7XG5cdHdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHdyYXBwZXIucm1UYWJsZUNsZWFudXA/LigpKTtcbn07XG5cbmNvbnN0IGluaXRUYWJsZXMgPSAocm9vdCA9IGRvY3VtZW50KSA9PiB7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS10YWJsZV0nKSkge1xuICAgICAgICBpbml0VGFibGUocm9vdCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXRhYmxlXScpLmZvckVhY2goaW5pdFRhYmxlKTtcbn07XG5cbmNvbnN0IG9ic2VydmVUYWJsZXMgPSAoKSA9PiB7XG4gICAgaW5pdFRhYmxlcygpO1xuXG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcblx0XHRyZWNvcmRzLmZvckVhY2goKHthZGRlZE5vZGVzLCByZW1vdmVkTm9kZXN9KSA9PiB7XG5cdFx0XHRhZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFRhYmxlcyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9KTtcblx0XHRcdHJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkgZGVzdHJveVRhYmxlcyhub2RlKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuICAgIH0pLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG9ic2VydmVUYWJsZXMsIHtvbmNlOiB0cnVlfSk7XG59IGVsc2Uge1xuICAgIG9ic2VydmVUYWJsZXMoKTtcbn1cbiJdLCJuYW1lcyI6WyJyZWFkVGhlbWVUb2tlbnMiLCJmcmFtZSIsInByb2JlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiYXBwZW5kIiwiYmFja2dyb3VuZCIsImdldENvbXB1dGVkU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aGVtZUJhY2tncm91bmQiLCJkb2N1bWVudEVsZW1lbnQiLCJnZXRQcm9wZXJ0eVZhbHVlIiwidHJpbSIsInRoZW1lIiwic3VyZmFjZUNvbG9yIiwiY29sb3IiLCJtdXRlZFN1cmZhY2VDb2xvciIsInN1cmZhY2VCb3JkZXIiLCJib3JkZXJXaWR0aCIsInJlYWRCYWNrZ3JvdW5kIiwiY2xhc3NOYW1lIiwidG9rZW5zIiwicmVtb3ZlIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJfcmVmIiwibmFtZSIsInZhbHVlIiwic2V0UHJvcGVydHkiLCJpbml0VGFibGUiLCJ3cmFwcGVyIiwiSFRNTEVsZW1lbnQiLCJkYXRhc2V0Iiwicm1UYWJsZVJlYWR5IiwiY2xvc2VzdCIsInRhYmxlIiwicXVlcnlTZWxlY3RvciIsImZyYW1lUmVxdWVzdCIsInJlc2l6ZU9ic2VydmVyIiwidXBkYXRlSW52ZXJzZVN1cmZhY2VzIiwiZm9yY2VDYXJkc0FjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNhcmRzQWN0aXZlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJkaXNwbGF5IiwiZGVmYXVsdENhcmRJbnZlcnNlIiwicXVlcnlTZWxlY3RvckFsbCIsInJvdyIsInN0YXRpY0ludmVyc2UiLCJybVRhYmxlU3RhdGljSW52ZXJzZSIsIm1vYmlsZVN0eWxlIiwicm1UYWJsZU1vYmlsZVN0eWxlIiwibW9iaWxlSW52ZXJzZSIsImluY2x1ZGVzIiwibW9iaWxlTm9ybWFsIiwiaW52ZXJzZSIsInRvZ2dsZSIsInVwZGF0ZSIsIm1heGltdW1TY3JvbGwiLCJNYXRoIiwibWF4Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsImNhblNjcm9sbFgiLCJjYW5TY3JvbGxZIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaXNSdGwiLCJkaXJlY3Rpb24iLCJyYXdTY3JvbGwiLCJhYnMiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsRnJvbUxlZnQiLCJmaXJzdENlbGwiLCJsYXN0Q2VsbCIsImZpcnN0V2lkdGgiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImxhc3RXaWR0aCIsInN0aWNreUZpcnN0Iiwic3RpY2t5TGFzdCIsInN0aWNreUNvbmZsaWN0Iiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwic2NoZWR1bGVVcGRhdGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsIndpbmRvdyIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZSIsInJtVGFibGVDbGVhbnVwIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzY29ubmVjdCIsImRlc3Ryb3lUYWJsZXMiLCJyb290Iiwid3JhcHBlcnMiLCJtYXRjaGVzIiwicHVzaCIsImluaXRUYWJsZXMiLCJvYnNlcnZlVGFibGVzIiwiTXV0YXRpb25PYnNlcnZlciIsInJlY29yZHMiLCJfcmVmMiIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJub2RlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsInJlYWR5U3RhdGUiLCJvbmNlIl0sInNvdXJjZVJvb3QiOiIifQ==