/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelGesturesPlugin: () => (/* binding */ WheelGesturesPlugin)
/* harmony export */ });
/* harmony import */ var wheel_gestures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wheel-gestures */ "./node_modules/wheel-gestures/dist/wheel-gestures.esm.js");

var defaultOptions = {
  active: true,
  breakpoints: {},
  wheelDraggingClass: 'is-wheel-dragging',
  forceWheelAxis: undefined,
  target: undefined
};
WheelGesturesPlugin.globalOptions = undefined;
var __DEV__ = "development" !== 'production';
function WheelGesturesPlugin(userOptions) {
  if (userOptions === void 0) {
    userOptions = {};
  }
  var options;
  var cleanup = function cleanup() {};
  function init(embla, optionsHandler) {
    var _options$target, _options$forceWheelAx;
    var mergeOptions = optionsHandler.mergeOptions,
      optionsAtMedia = optionsHandler.optionsAtMedia;
    var optionsBase = mergeOptions(defaultOptions, WheelGesturesPlugin.globalOptions);
    var allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    var engine = embla.internalEngine();
    var targetNode = (_options$target = options.target) != null ? _options$target : embla.containerNode().parentNode;
    var wheelAxis = (_options$forceWheelAx = options.forceWheelAxis) != null ? _options$forceWheelAx : engine.options.axis;
    var wheelGestures = (0,wheel_gestures__WEBPACK_IMPORTED_MODULE_0__["default"])({
      preventWheelAction: wheelAxis,
      reverseSign: [true, true, false]
    });
    var unobserveTargetNode = wheelGestures.observe(targetNode);
    var offWheel = wheelGestures.on('wheel', handleWheel);
    var isStarted = false;
    var startEvent;
    function wheelGestureStarted(state) {
      try {
        startEvent = new MouseEvent('mousedown', state.event);
        dispatchEvent(startEvent);
      } catch (e) {
        // Legacy Browsers like IE 10 & 11 will throw when attempting to create the Event
        if (__DEV__) {
          console.warn('Legacy browser requires events-polyfill (https://github.com/xiel/embla-carousel-wheel-gestures#legacy-browsers)');
        }
        return cleanup();
      }
      isStarted = true;
      addNativeMouseEventListeners();
      if (options.wheelDraggingClass) {
        targetNode.classList.add(options.wheelDraggingClass);
      }
    }
    function wheelGestureEnded(state) {
      isStarted = false;
      dispatchEvent(createRelativeMouseEvent('mouseup', state));
      removeNativeMouseEventListeners();
      if (options.wheelDraggingClass) {
        targetNode.classList.remove(options.wheelDraggingClass);
      }
    }
    function addNativeMouseEventListeners() {
      document.documentElement.addEventListener('mousemove', preventNativeMouseHandler, true);
      document.documentElement.addEventListener('mouseup', preventNativeMouseHandler, true);
      document.documentElement.addEventListener('mousedown', preventNativeMouseHandler, true);
    }
    function removeNativeMouseEventListeners() {
      document.documentElement.removeEventListener('mousemove', preventNativeMouseHandler, true);
      document.documentElement.removeEventListener('mouseup', preventNativeMouseHandler, true);
      document.documentElement.removeEventListener('mousedown', preventNativeMouseHandler, true);
    }
    function preventNativeMouseHandler(e) {
      if (isStarted && e.isTrusted) {
        e.stopImmediatePropagation();
      }
    }
    function createRelativeMouseEvent(type, state) {
      var moveX, moveY;
      if (wheelAxis === engine.options.axis) {
        var _state$axisMovement = state.axisMovement;
        moveX = _state$axisMovement[0];
        moveY = _state$axisMovement[1];
      } else {
        var _state$axisMovement2 = state.axisMovement;
        moveY = _state$axisMovement2[0];
        moveX = _state$axisMovement2[1];
      } // prevent skipping slides

      if (!engine.options.skipSnaps && !engine.options.dragFree) {
        var maxX = engine.containerRect.width;
        var maxY = engine.containerRect.height;
        moveX = moveX < 0 ? Math.max(moveX, -maxX) : Math.min(moveX, maxX);
        moveY = moveY < 0 ? Math.max(moveY, -maxY) : Math.min(moveY, maxY);
      }
      return new MouseEvent(type, {
        clientX: startEvent.clientX + moveX,
        clientY: startEvent.clientY + moveY,
        screenX: startEvent.screenX + moveX,
        screenY: startEvent.screenY + moveY,
        movementX: moveX,
        movementY: moveY,
        button: 0,
        bubbles: true,
        cancelable: true,
        composed: true
      });
    }
    function dispatchEvent(event) {
      embla.containerNode().dispatchEvent(event);
    }
    function handleWheel(state) {
      var _state$axisDelta = state.axisDelta,
        deltaX = _state$axisDelta[0],
        deltaY = _state$axisDelta[1];
      var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
      var crossAxisDelta = wheelAxis === 'x' ? deltaY : deltaX;
      var isRelease = state.isMomentum && state.previous && !state.previous.isMomentum;
      var isEndingOrRelease = state.isEnding && !state.isMomentum || isRelease;
      var primaryAxisDeltaIsDominant = Math.abs(primaryAxisDelta) > Math.abs(crossAxisDelta);
      if (primaryAxisDeltaIsDominant && !isStarted && !state.isMomentum) {
        wheelGestureStarted(state);
      }
      if (!isStarted) return;
      if (isEndingOrRelease) {
        wheelGestureEnded(state);
      } else {
        dispatchEvent(createRelativeMouseEvent('mousemove', state));
      }
    }
    cleanup = function cleanup() {
      unobserveTargetNode();
      offWheel();
      removeNativeMouseEventListeners();
    };
  }
  var self = {
    name: 'wheelGestures',
    options: userOptions,
    init: init,
    destroy: function destroy() {
      return cleanup();
    }
  };
  return self;
}


/***/ }),

/***/ "./node_modules/wheel-gestures/dist/wheel-gestures.esm.js":
/*!****************************************************************!*\
  !*** ./node_modules/wheel-gestures/dist/wheel-gestures.esm.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelGestures: () => (/* binding */ WheelGestures),
/* harmony export */   absMax: () => (/* binding */ absMax),
/* harmony export */   addVectors: () => (/* binding */ addVectors),
/* harmony export */   average: () => (/* binding */ average),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   configDefaults: () => (/* binding */ configDefaults),
/* harmony export */   deepFreeze: () => (/* binding */ deepFreeze),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   lastOf: () => (/* binding */ lastOf),
/* harmony export */   projection: () => (/* binding */ projection)
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var DECAY = 0.996;
/**
 * movement projection based on velocity
 * @param velocityPxMs
 * @param decay
 */

var projection = function projection(velocityPxMs, decay) {
  if (decay === void 0) {
    decay = DECAY;
  }
  return velocityPxMs * decay / (1 - decay);
};
function lastOf(array) {
  return array[array.length - 1];
}
function average(numbers) {
  return numbers.reduce(function (a, b) {
    return a + b;
  }) / numbers.length;
}
var clamp = function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
};
function addVectors(v1, v2) {
  if (v1.length !== v2.length) {
    throw new Error('vectors must be same length');
  }
  return v1.map(function (val, i) {
    return val + v2[i];
  });
}
function absMax(numbers) {
  return Math.max.apply(Math, numbers.map(Math.abs));
} // eslint-disable-next-line @typescript-eslint/ban-types

function deepFreeze(o) {
  Object.freeze(o);
  Object.values(o).forEach(function (value) {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return o;
}
function EventBus() {
  var listeners = {};
  function on(type, listener) {
    listeners[type] = (listeners[type] || []).concat(listener);
    return function () {
      return off(type, listener);
    };
  }
  function off(type, listener) {
    listeners[type] = (listeners[type] || []).filter(function (l) {
      return l !== listener;
    });
  }
  function dispatch(type, data) {
    if (!(type in listeners)) return;
    listeners[type].forEach(function (l) {
      return l(data);
    });
  }
  return deepFreeze({
    on: on,
    off: off,
    dispatch: dispatch
  });
}
function WheelTargetObserver(eventListener) {
  var targets = []; // add event listener to target element

  var observe = function observe(target) {
    target.addEventListener('wheel', eventListener, {
      passive: false
    });
    targets.push(target);
    return function () {
      return unobserve(target);
    };
  }; /// remove event listener from target element

  var unobserve = function unobserve(target) {
    target.removeEventListener('wheel', eventListener);
    targets = targets.filter(function (t) {
      return t !== target;
    });
  }; // stops watching all of its target elements for visibility changes.

  var disconnect = function disconnect() {
    targets.forEach(unobserve);
  };
  return deepFreeze({
    observe: observe,
    unobserve: unobserve,
    disconnect: disconnect
  });
}
var LINE_HEIGHT = 16 * 1.125;
var PAGE_HEIGHT = typeof window !== 'undefined' && window.innerHeight || 800;
var DELTA_MODE_UNIT = [1, LINE_HEIGHT, PAGE_HEIGHT];
function normalizeWheel(e) {
  var deltaX = e.deltaX * DELTA_MODE_UNIT[e.deltaMode];
  var deltaY = e.deltaY * DELTA_MODE_UNIT[e.deltaMode];
  var deltaZ = (e.deltaZ || 0) * DELTA_MODE_UNIT[e.deltaMode];
  return {
    timeStamp: e.timeStamp,
    axisDelta: [deltaX, deltaY, deltaZ]
  };
}
var reverseAll = [-1, -1, -1];
function reverseAxisDeltaSign(wheel, reverseSign) {
  if (!reverseSign) {
    return wheel;
  }
  var multipliers = reverseSign === true ? reverseAll : reverseSign.map(function (shouldReverse) {
    return shouldReverse ? -1 : 1;
  });
  return _extends({}, wheel, {
    axisDelta: wheel.axisDelta.map(function (delta, i) {
      return delta * multipliers[i];
    })
  });
}
var DELTA_MAX_ABS = 700;
var clampAxisDelta = function clampAxisDelta(wheel) {
  return _extends({}, wheel, {
    axisDelta: wheel.axisDelta.map(function (delta) {
      return clamp(delta, -DELTA_MAX_ABS, DELTA_MAX_ABS);
    })
  });
};
var __DEV__ = "development" !== 'production';
var ACC_FACTOR_MIN = 0.6;
var ACC_FACTOR_MAX = 0.96;
var WHEELEVENTS_TO_MERGE = 2;
var WHEELEVENTS_TO_ANALAZE = 5;
var configDefaults = /*#__PURE__*/deepFreeze({
  preventWheelAction: true,
  reverseSign: [true, true, false]
});
var WILL_END_TIMEOUT_DEFAULT = 400;
function createWheelGesturesState() {
  return {
    isStarted: false,
    isStartPublished: false,
    isMomentum: false,
    startTime: 0,
    lastAbsDelta: Infinity,
    axisMovement: [0, 0, 0],
    axisVelocity: [0, 0, 0],
    accelerationFactors: [],
    scrollPoints: [],
    scrollPointsToMerge: [],
    willEndTimeout: WILL_END_TIMEOUT_DEFAULT
  };
}
function WheelGestures(optionsParam) {
  if (optionsParam === void 0) {
    optionsParam = {};
  }
  var _EventBus = EventBus(),
    on = _EventBus.on,
    off = _EventBus.off,
    dispatch = _EventBus.dispatch;
  var config = configDefaults;
  var state = createWheelGesturesState();
  var currentEvent;
  var negativeZeroFingerUpSpecialEvent = false;
  var prevWheelEventState;
  var feedWheel = function feedWheel(wheelEvents) {
    if (Array.isArray(wheelEvents)) {
      wheelEvents.forEach(function (wheelEvent) {
        return processWheelEventData(wheelEvent);
      });
    } else {
      processWheelEventData(wheelEvents);
    }
  };
  var updateOptions = function updateOptions(newOptions) {
    if (newOptions === void 0) {
      newOptions = {};
    }
    if (Object.values(newOptions).some(function (option) {
      return option === undefined || option === null;
    })) {
      __DEV__ && console.error('updateOptions ignored! undefined & null options not allowed');
      return config;
    }
    return config = deepFreeze(_extends({}, configDefaults, config, newOptions));
  };
  var publishWheel = function publishWheel(additionalData) {
    var wheelEventState = _extends({
      event: currentEvent,
      isStart: false,
      isEnding: false,
      isMomentumCancel: false,
      isMomentum: state.isMomentum,
      axisDelta: [0, 0, 0],
      axisVelocity: state.axisVelocity,
      axisMovement: state.axisMovement,
      get axisMovementProjection() {
        return addVectors(wheelEventState.axisMovement, wheelEventState.axisVelocity.map(function (velocity) {
          return projection(velocity);
        }));
      }
    }, additionalData);
    dispatch('wheel', _extends({}, wheelEventState, {
      previous: prevWheelEventState
    })); // keep reference without previous, otherwise we would create a long chain

    prevWheelEventState = wheelEventState;
  }; // should prevent when there is mainly movement on the desired axis

  var shouldPreventDefault = function shouldPreventDefault(deltaMaxAbs, axisDelta) {
    var _config = config,
      preventWheelAction = _config.preventWheelAction;
    var deltaX = axisDelta[0],
      deltaY = axisDelta[1],
      deltaZ = axisDelta[2];
    if (typeof preventWheelAction === 'boolean') return preventWheelAction;
    switch (preventWheelAction) {
      case 'x':
        return Math.abs(deltaX) >= deltaMaxAbs;
      case 'y':
        return Math.abs(deltaY) >= deltaMaxAbs;
      case 'z':
        return Math.abs(deltaZ) >= deltaMaxAbs;
      default:
        __DEV__ && console.warn('unsupported preventWheelAction value: ' + preventWheelAction, 'warn');
        return false;
    }
  };
  var processWheelEventData = function processWheelEventData(wheelEvent) {
    var _clampAxisDelta = clampAxisDelta(reverseAxisDeltaSign(normalizeWheel(wheelEvent), config.reverseSign)),
      axisDelta = _clampAxisDelta.axisDelta,
      timeStamp = _clampAxisDelta.timeStamp;
    var deltaMaxAbs = absMax(axisDelta);
    if (wheelEvent.preventDefault && shouldPreventDefault(deltaMaxAbs, axisDelta)) {
      wheelEvent.preventDefault();
    }
    if (!state.isStarted) {
      start();
    } // check if user started scrolling again -> cancel
    else if (state.isMomentum && deltaMaxAbs > Math.max(2, state.lastAbsDelta * 2)) {
      end(true);
      start();
    } // special finger up event on windows + blink

    if (deltaMaxAbs === 0 && Object.is && Object.is(wheelEvent.deltaX, -0)) {
      negativeZeroFingerUpSpecialEvent = true; // return -> zero delta event should not influence velocity

      return;
    }
    currentEvent = wheelEvent;
    state.axisMovement = addVectors(state.axisMovement, axisDelta);
    state.lastAbsDelta = deltaMaxAbs;
    state.scrollPointsToMerge.push({
      axisDelta: axisDelta,
      timeStamp: timeStamp
    });
    mergeScrollPointsCalcVelocity(); // only wheel event (move) and not start/end get the delta values

    publishWheel({
      axisDelta: axisDelta,
      isStart: !state.isStartPublished
    }); // state.isMomentum ? MOMENTUM_WHEEL : WHEEL, { axisDelta })
    // publish start after velocity etc. have been updated

    state.isStartPublished = true; // calc debounced end function, to recognize end of wheel event stream

    willEnd();
  };
  var mergeScrollPointsCalcVelocity = function mergeScrollPointsCalcVelocity() {
    if (state.scrollPointsToMerge.length === WHEELEVENTS_TO_MERGE) {
      state.scrollPoints.unshift({
        axisDeltaSum: state.scrollPointsToMerge.map(function (b) {
          return b.axisDelta;
        }).reduce(addVectors),
        timeStamp: average(state.scrollPointsToMerge.map(function (b) {
          return b.timeStamp;
        }))
      }); // only update velocity after a merged scrollpoint was generated

      updateVelocity(); // reset toMerge array

      state.scrollPointsToMerge.length = 0; // after calculation of velocity only keep the most recent merged scrollPoint

      state.scrollPoints.length = 1;
      if (!state.isMomentum) {
        detectMomentum();
      }
    } else if (!state.isStartPublished) {
      updateStartVelocity();
    }
  };
  var updateStartVelocity = function updateStartVelocity() {
    state.axisVelocity = lastOf(state.scrollPointsToMerge).axisDelta.map(function (d) {
      return d / state.willEndTimeout;
    });
  };
  var updateVelocity = function updateVelocity() {
    // need to have two recent points to calc velocity
    var _state$scrollPoints = state.scrollPoints,
      latestScrollPoint = _state$scrollPoints[0],
      prevScrollPoint = _state$scrollPoints[1];
    if (!prevScrollPoint || !latestScrollPoint) {
      return;
    } // time delta

    var deltaTime = latestScrollPoint.timeStamp - prevScrollPoint.timeStamp;
    if (deltaTime <= 0) {
      __DEV__ && console.warn('invalid deltaTime');
      return;
    } // calc the velocity per axes

    var velocity = latestScrollPoint.axisDeltaSum.map(function (d) {
      return d / deltaTime;
    }); // calc the acceleration factor per axis

    var accelerationFactor = velocity.map(function (v, i) {
      return v / (state.axisVelocity[i] || 1);
    });
    state.axisVelocity = velocity;
    state.accelerationFactors.push(accelerationFactor);
    updateWillEndTimeout(deltaTime);
  };
  var updateWillEndTimeout = function updateWillEndTimeout(deltaTime) {
    // use current time between events rounded up and increased by a bit as timeout
    var newTimeout = Math.ceil(deltaTime / 10) * 10 * 1.2; // double the timeout, when momentum was not detected yet

    if (!state.isMomentum) {
      newTimeout = Math.max(100, newTimeout * 2);
    }
    state.willEndTimeout = Math.min(1000, Math.round(newTimeout));
  };
  var accelerationFactorInMomentumRange = function accelerationFactorInMomentumRange(accFactor) {
    // when main axis is the the other one and there is no movement/change on the current one
    if (accFactor === 0) return true;
    return accFactor <= ACC_FACTOR_MAX && accFactor >= ACC_FACTOR_MIN;
  };
  var detectMomentum = function detectMomentum() {
    if (state.accelerationFactors.length >= WHEELEVENTS_TO_ANALAZE) {
      if (negativeZeroFingerUpSpecialEvent) {
        negativeZeroFingerUpSpecialEvent = false;
        if (absMax(state.axisVelocity) >= 0.2) {
          recognizedMomentum();
          return;
        }
      }
      var recentAccelerationFactors = state.accelerationFactors.slice(WHEELEVENTS_TO_ANALAZE * -1); // check recent acceleration / deceleration factors
      // all recent need to match, if any did not match

      var detectedMomentum = recentAccelerationFactors.every(function (accFac) {
        // when both axis decelerate exactly in the same rate it is very likely caused by momentum
        var sameAccFac = !!accFac.reduce(function (f1, f2) {
          return f1 && f1 < 1 && f1 === f2 ? 1 : 0;
        }); // check if acceleration factor is within momentum range

        var bothAreInRangeOrZero = accFac.filter(accelerationFactorInMomentumRange).length === accFac.length; // one the requirements must be fulfilled

        return sameAccFac || bothAreInRangeOrZero;
      });
      if (detectedMomentum) {
        recognizedMomentum();
      } // only keep the most recent events

      state.accelerationFactors = recentAccelerationFactors;
    }
  };
  var recognizedMomentum = function recognizedMomentum() {
    state.isMomentum = true;
  };
  var start = function start() {
    state = createWheelGesturesState();
    state.isStarted = true;
    state.startTime = Date.now();
    prevWheelEventState = undefined;
    negativeZeroFingerUpSpecialEvent = false;
  };
  var willEnd = function () {
    var willEndId;
    return function () {
      clearTimeout(willEndId);
      willEndId = setTimeout(end, state.willEndTimeout);
    };
  }();
  var end = function end(isMomentumCancel) {
    if (isMomentumCancel === void 0) {
      isMomentumCancel = false;
    }
    if (!state.isStarted) return;
    if (state.isMomentum && isMomentumCancel) {
      publishWheel({
        isEnding: true,
        isMomentumCancel: true
      });
    } else {
      publishWheel({
        isEnding: true
      });
    }
    state.isMomentum = false;
    state.isStarted = false;
  };
  var _WheelTargetObserver = WheelTargetObserver(feedWheel),
    observe = _WheelTargetObserver.observe,
    unobserve = _WheelTargetObserver.unobserve,
    disconnect = _WheelTargetObserver.disconnect;
  updateOptions(optionsParam);
  return deepFreeze({
    on: on,
    off: off,
    observe: observe,
    unobserve: unobserve,
    disconnect: disconnect,
    feedWheel: feedWheel,
    updateOptions: updateOptions
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WheelGestures);


/***/ }),

/***/ "./src/buttons.es6":
/*!*************************!*\
  !*** ./src/buttons.es6 ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPrevNextButtonsClickHandlers: () => (/* binding */ addPrevNextButtonsClickHandlers),
/* harmony export */   addThumbButtonsClickHandlers: () => (/* binding */ addThumbButtonsClickHandlers),
/* harmony export */   addToggleThumbButtonsActive: () => (/* binding */ addToggleThumbButtonsActive)
/* harmony export */ });
const addThumbButtonsClickHandlers = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes();
  const scrollToIndex = slidesThumbs.map((_, index) => () => emblaApiMain.scrollTo(index));
  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false);
  });
  return () => {
    slidesThumbs.forEach((slideNode, index) => {
      slideNode.removeEventListener('click', scrollToIndex[index], false);
    });
  };
};
const addToggleThumbButtonsActive = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes();
  const toggleThumbBtnsState = () => {
    emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap());
    const previous = emblaApiMain.previousScrollSnap();
    const selected = emblaApiMain.selectedScrollSnap();
    slidesThumbs[previous].classList.remove('rmslideshow-thumbs__slide--selected');
    slidesThumbs[selected].classList.add('rmslideshow-thumbs__slide--selected');
  };
  emblaApiMain.on('select', toggleThumbBtnsState);
  emblaApiThumb.on('init', toggleThumbBtnsState);
  return () => {
    const selected = emblaApiMain.selectedScrollSnap();
    slidesThumbs[selected].classList.remove('rmslideshow-thumbs__slide--selected');
  };
};
const addPrevNextButtonsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  const scrollPrev = () => {
    emblaApi.scrollPrev();
  };
  const scrollNext = () => {
    emblaApi.scrollNext();
  };
  prevBtn.addEventListener('click', scrollPrev, false);
  nextBtn.addEventListener('click', scrollNext, false);
  const removeTogglePrevNextButtonsActive = addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn);
  return () => {
    removeTogglePrevNextButtonsActive();
    prevBtn.removeEventListener('click', scrollPrev, false);
    nextBtn.removeEventListener('click', scrollNext, false);
  };
};
function addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn) {
  let togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) {
      prevBtn.removeAttribute('disabled');
    } else {
      prevBtn.setAttribute('disabled', 'disabled');
    }
    if (emblaApi.canScrollNext()) {
      nextBtn.removeAttribute('disabled');
    } else {
      nextBtn.setAttribute('disabled', 'disabled');
    }
  };
  emblaApi.on('select', togglePrevNextBtnsState).on('init', togglePrevNextBtnsState).on('reInit', togglePrevNextBtnsState);
  return () => {
    prevBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  };
}

/***/ }),

/***/ "./node_modules/embla-carousel-fade/esm/embla-carousel-fade.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/embla-carousel-fade/esm/embla-carousel-fade.esm.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fade)
/* harmony export */ });
function clampNumber(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
function Fade() {
  let userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const fullOpacity = 1;
  const noOpacity = 0;
  const fadeFriction = 0.68;
  const timeStep = 1000 / 60;
  let emblaApi;
  let opacities = [];
  let fadeToNextDistance;
  let distanceFromPointerDown = 0;
  let fadeVelocity = 0;
  let progress = 0;
  let shouldFadePair = false;
  let defaultSettledBehaviour;
  let defaultProgressBehaviour;
  function init(emblaApiInstance) {
    emblaApi = emblaApiInstance;
    const selectedSnap = emblaApi.selectedScrollSnap();
    const {
      scrollBody,
      containerRect,
      axis
    } = emblaApi.internalEngine();
    const containerSize = axis.measureSize(containerRect);
    fadeToNextDistance = clampNumber(containerSize * 0.75, 200, 500);
    shouldFadePair = false;
    opacities = emblaApi.scrollSnapList().map((_, index) => index === selectedSnap ? fullOpacity : noOpacity);
    defaultSettledBehaviour = scrollBody.settled;
    defaultProgressBehaviour = emblaApi.scrollProgress;
    scrollBody.settled = settled;
    emblaApi.scrollProgress = scrollProgress;
    emblaApi.on('select', select).on('slideFocus', fadeToSelectedSnapInstantly).on('pointerDown', pointerDown).on('pointerUp', pointerUp);
    disableScroll();
    fadeToSelectedSnapInstantly();
  }
  function destroy() {
    const {
      scrollBody
    } = emblaApi.internalEngine();
    scrollBody.settled = defaultSettledBehaviour;
    emblaApi.scrollProgress = defaultProgressBehaviour;
    emblaApi.off('select', select).off('slideFocus', fadeToSelectedSnapInstantly).off('pointerDown', pointerDown).off('pointerUp', pointerUp);
    emblaApi.slideNodes().forEach(slideNode => {
      const slideStyle = slideNode.style;
      slideStyle.opacity = '';
      slideStyle.transform = '';
      slideStyle.pointerEvents = '';
      if (!slideNode.getAttribute('style')) slideNode.removeAttribute('style');
    });
  }
  function fadeToSelectedSnapInstantly() {
    const selectedSnap = emblaApi.selectedScrollSnap();
    setOpacities(selectedSnap, fullOpacity);
  }
  function pointerUp() {
    shouldFadePair = false;
  }
  function pointerDown() {
    shouldFadePair = false;
    distanceFromPointerDown = 0;
    fadeVelocity = 0;
  }
  function select() {
    const duration = emblaApi.internalEngine().scrollBody.duration();
    fadeVelocity = duration ? 0 : fullOpacity;
    shouldFadePair = true;
    if (!duration) fadeToSelectedSnapInstantly();
  }
  function getSlideTransform(position) {
    const {
      axis
    } = emblaApi.internalEngine();
    const translateAxis = axis.scroll.toUpperCase();
    return `translate${translateAxis}(${axis.direction(position)}px)`;
  }
  function disableScroll() {
    const {
      translate,
      slideLooper
    } = emblaApi.internalEngine();
    translate.clear();
    translate.toggleActive(false);
    slideLooper.loopPoints.forEach(_ref => {
      let {
        translate
      } = _ref;
      translate.clear();
      translate.toggleActive(false);
    });
  }
  function lockExcessiveScroll(fadeIndex) {
    const {
      scrollSnaps,
      location,
      target
    } = emblaApi.internalEngine();
    if (!isNumber(fadeIndex) || opacities[fadeIndex] < 0.5) return;
    location.set(scrollSnaps[fadeIndex]);
    target.set(location);
  }
  function setOpacities(fadeIndex, velocity) {
    const scrollSnaps = emblaApi.scrollSnapList();
    scrollSnaps.forEach((_, indexA) => {
      const absVelocity = Math.abs(velocity);
      const currentOpacity = opacities[indexA];
      const isFadeIndex = indexA === fadeIndex;
      const nextOpacity = isFadeIndex ? currentOpacity + absVelocity : currentOpacity - absVelocity;
      const clampedOpacity = clampNumber(nextOpacity, noOpacity, fullOpacity);
      opacities[indexA] = clampedOpacity;
      const fadePair = isFadeIndex && shouldFadePair;
      const indexB = emblaApi.previousScrollSnap();
      if (fadePair) opacities[indexB] = 1 - clampedOpacity;
      if (isFadeIndex) setProgress(fadeIndex, clampedOpacity);
      setOpacity(indexA);
    });
  }
  function setOpacity(index) {
    const slidesInSnap = emblaApi.internalEngine().slideRegistry[index];
    const {
      scrollSnaps,
      containerRect
    } = emblaApi.internalEngine();
    const opacity = opacities[index];
    slidesInSnap.forEach(slideIndex => {
      const slideStyle = emblaApi.slideNodes()[slideIndex].style;
      const roundedOpacity = parseFloat(opacity.toFixed(2));
      const hasOpacity = roundedOpacity > noOpacity;
      const position = hasOpacity ? scrollSnaps[index] : containerRect.width + 2;
      const transform = getSlideTransform(position);
      if (hasOpacity) slideStyle.transform = transform;
      slideStyle.opacity = roundedOpacity.toString();
      slideStyle.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      if (!hasOpacity) slideStyle.transform = transform;
    });
  }
  function setProgress(fadeIndex, opacity) {
    const {
      index,
      dragHandler,
      scrollSnaps
    } = emblaApi.internalEngine();
    const pointerDown = dragHandler.pointerDown();
    const snapFraction = 1 / (scrollSnaps.length - 1);
    let indexA = fadeIndex;
    let indexB = pointerDown ? emblaApi.selectedScrollSnap() : emblaApi.previousScrollSnap();
    if (pointerDown && indexA === indexB) {
      const reverseSign = Math.sign(distanceFromPointerDown) * -1;
      indexA = indexB;
      indexB = index.clone().set(indexB).add(reverseSign).get();
    }
    const currentPosition = indexB * snapFraction;
    const diffPosition = (indexA - indexB) * snapFraction;
    progress = currentPosition + diffPosition * opacity;
  }
  function getFadeIndex() {
    const {
      dragHandler,
      index,
      scrollBody
    } = emblaApi.internalEngine();
    const selectedSnap = emblaApi.selectedScrollSnap();
    if (!dragHandler.pointerDown()) return selectedSnap;
    const directionSign = Math.sign(scrollBody.velocity());
    const distanceSign = Math.sign(distanceFromPointerDown);
    const nextSnap = index.clone().set(selectedSnap).add(directionSign * -1).get();
    if (!directionSign || !distanceSign) return null;
    return distanceSign === directionSign ? nextSnap : selectedSnap;
  }
  function fade(emblaApi) {
    const {
      dragHandler,
      scrollBody
    } = emblaApi.internalEngine();
    const fixedDeltaTimeSeconds = timeStep / 1000;
    const pointerDown = dragHandler.pointerDown();
    const velocity = scrollBody.velocity() * fixedDeltaTimeSeconds;
    const duration = scrollBody.duration();
    const fadeIndex = getFadeIndex();
    const noFadeIndex = !isNumber(fadeIndex);
    if (pointerDown) {
      if (!velocity) return;
      distanceFromPointerDown += velocity;
      fadeVelocity = Math.abs(velocity / fadeToNextDistance);
      lockExcessiveScroll(fadeIndex);
    }
    if (!pointerDown) {
      if (!duration || noFadeIndex) return;
      fadeVelocity += (fullOpacity - opacities[fadeIndex]) / duration;
      fadeVelocity *= fadeFriction;
    }
    if (noFadeIndex) return;
    setOpacities(fadeIndex, fadeVelocity);
  }
  function settled() {
    const {
      target,
      location
    } = emblaApi.internalEngine();
    const diffToTarget = target.get() - location.get();
    const notReachedTarget = Math.abs(diffToTarget) >= 1;
    const fadeIndex = getFadeIndex();
    const noFadeIndex = !isNumber(fadeIndex);
    fade(emblaApi);
    if (noFadeIndex || notReachedTarget) return false;
    return opacities[fadeIndex] > 0.999;
  }
  function scrollProgress() {
    return progress;
  }
  const self = {
    name: 'fade',
    options: userOptions,
    init,
    destroy
  };
  return self;
}
Fade.globalOptions = undefined;


/***/ }),

/***/ "./node_modules/embla-carousel/esm/embla-carousel.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/embla-carousel/esm/embla-carousel.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmblaCarousel)
/* harmony export */ });
function isNumber(subject) {
  return typeof subject === 'number';
}
function isString(subject) {
  return typeof subject === 'string';
}
function isBoolean(subject) {
  return typeof subject === 'boolean';
}
function isObject(subject) {
  return Object.prototype.toString.call(subject) === '[object Object]';
}
function mathAbs(n) {
  return Math.abs(n);
}
function mathSign(n) {
  return Math.sign(n);
}
function deltaAbs(valueB, valueA) {
  return mathAbs(valueB - valueA);
}
function factorAbs(valueB, valueA) {
  if (valueB === 0 || valueA === 0) return 0;
  if (mathAbs(valueB) <= mathAbs(valueA)) return 0;
  const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
  return mathAbs(diff / valueB);
}
function arrayKeys(array) {
  return objectKeys(array).map(Number);
}
function arrayLast(array) {
  return array[arrayLastIndex(array)];
}
function arrayLastIndex(array) {
  return Math.max(0, array.length - 1);
}
function arrayIsLastIndex(array, index) {
  return index === arrayLastIndex(array);
}
function arrayFromNumber(n) {
  let startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Array.from(Array(n), (_, i) => startAt + i);
}
function objectKeys(object) {
  return Object.keys(object);
}
function objectsMergeDeep(objectA, objectB) {
  return [objectA, objectB].reduce((mergedObjects, currentObject) => {
    objectKeys(currentObject).forEach(key => {
      const valueA = mergedObjects[key];
      const valueB = currentObject[key];
      const areObjects = isObject(valueA) && isObject(valueB);
      mergedObjects[key] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
    });
    return mergedObjects;
  }, {});
}
function isMouseEvent(evt, ownerWindow) {
  return typeof ownerWindow.MouseEvent !== 'undefined' && evt instanceof ownerWindow.MouseEvent;
}
function Alignment(align, viewSize) {
  const predefined = {
    start,
    center,
    end
  };
  function start() {
    return 0;
  }
  function center(n) {
    return end(n) / 2;
  }
  function end(n) {
    return viewSize - n;
  }
  function measure(n, index) {
    if (isString(align)) return predefined[align](n);
    return align(viewSize, n, index);
  }
  const self = {
    measure
  };
  return self;
}
function EventStore() {
  let listeners = [];
  function add(node, type, handler) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      passive: true
    };
    let removeListener;
    if ('addEventListener' in node) {
      node.addEventListener(type, handler, options);
      removeListener = () => node.removeEventListener(type, handler, options);
    } else {
      const legacyMediaQueryList = node;
      legacyMediaQueryList.addListener(handler);
      removeListener = () => legacyMediaQueryList.removeListener(handler);
    }
    listeners.push(removeListener);
    return self;
  }
  function clear() {
    listeners = listeners.filter(remove => remove());
  }
  const self = {
    add,
    clear
  };
  return self;
}
function Animations(ownerDocument, ownerWindow, update, render) {
  const documentVisibleHandler = EventStore();
  const timeStep = 1000 / 60;
  let lastTimeStamp = null;
  let lag = 0;
  let animationFrame = 0;
  function init() {
    documentVisibleHandler.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.hidden) reset();
    });
  }
  function destroy() {
    stop();
    documentVisibleHandler.clear();
  }
  function animate(timeStamp) {
    if (!animationFrame) return;
    if (!lastTimeStamp) lastTimeStamp = timeStamp;
    const elapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    lag += elapsed;
    while (lag >= timeStep) {
      update(timeStep);
      lag -= timeStep;
    }
    const lagOffset = lag / timeStep;
    render(lagOffset);
    if (animationFrame) ownerWindow.requestAnimationFrame(animate);
  }
  function start() {
    if (animationFrame) return;
    animationFrame = ownerWindow.requestAnimationFrame(animate);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationFrame);
    lastTimeStamp = null;
    lag = 0;
    animationFrame = 0;
  }
  function reset() {
    lastTimeStamp = null;
    lag = 0;
  }
  const self = {
    init,
    destroy,
    start,
    stop,
    update: () => update(timeStep),
    render
  };
  return self;
}
function Axis(axis, contentDirection) {
  const isRightToLeft = contentDirection === 'rtl';
  const isVertical = axis === 'y';
  const scroll = isVertical ? 'y' : 'x';
  const cross = isVertical ? 'x' : 'y';
  const sign = !isVertical && isRightToLeft ? -1 : 1;
  const startEdge = getStartEdge();
  const endEdge = getEndEdge();
  function measureSize(nodeRect) {
    const {
      height,
      width
    } = nodeRect;
    return isVertical ? height : width;
  }
  function getStartEdge() {
    if (isVertical) return 'top';
    return isRightToLeft ? 'right' : 'left';
  }
  function getEndEdge() {
    if (isVertical) return 'bottom';
    return isRightToLeft ? 'left' : 'right';
  }
  function direction(n) {
    return n * sign;
  }
  const self = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  };
  return self;
}
function Limit() {
  let min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const length = mathAbs(min - max);
  function reachedMin(n) {
    return n < min;
  }
  function reachedMax(n) {
    return n > max;
  }
  function reachedAny(n) {
    return reachedMin(n) || reachedMax(n);
  }
  function constrain(n) {
    if (!reachedAny(n)) return n;
    return reachedMin(n) ? min : max;
  }
  function removeOffset(n) {
    if (!length) return n;
    return n - length * Math.ceil((n - max) / length);
  }
  const self = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  };
  return self;
}
function Counter(max, start, loop) {
  const {
    constrain
  } = Limit(0, max);
  const loopEnd = max + 1;
  let counter = withinLimit(start);
  function withinLimit(n) {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
  }
  function get() {
    return counter;
  }
  function set(n) {
    counter = withinLimit(n);
    return self;
  }
  function add(n) {
    return clone().set(get() + n);
  }
  function clone() {
    return Counter(max, get(), loop);
  }
  const self = {
    get,
    set,
    add,
    clone
  };
  return self;
}
function DragHandler(axis, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
  const {
    cross: crossAxis,
    direction
  } = axis;
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA'];
  const nonPassiveEvent = {
    passive: false
  };
  const initEvents = EventStore();
  const dragEvents = EventStore();
  const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
  const snapForceBoost = {
    mouse: 300,
    touch: 400
  };
  const freeForceBoost = {
    mouse: 500,
    touch: 600
  };
  const baseSpeed = dragFree ? 43 : 25;
  let isMoving = false;
  let startScroll = 0;
  let startCross = 0;
  let pointerIsDown = false;
  let preventScroll = false;
  let preventClick = false;
  let isMouse = false;
  function init(emblaApi) {
    if (!watchDrag) return;
    function downIfAllowed(evt) {
      if (isBoolean(watchDrag) || watchDrag(emblaApi, evt)) down(evt);
    }
    const node = rootNode;
    initEvents.add(node, 'dragstart', evt => evt.preventDefault(), nonPassiveEvent).add(node, 'touchmove', () => undefined, nonPassiveEvent).add(node, 'touchend', () => undefined).add(node, 'touchstart', downIfAllowed).add(node, 'mousedown', downIfAllowed).add(node, 'touchcancel', up).add(node, 'contextmenu', up).add(node, 'click', click, true);
  }
  function destroy() {
    initEvents.clear();
    dragEvents.clear();
  }
  function addDragEvents() {
    const node = isMouse ? ownerDocument : rootNode;
    dragEvents.add(node, 'touchmove', move, nonPassiveEvent).add(node, 'touchend', up).add(node, 'mousemove', move, nonPassiveEvent).add(node, 'mouseup', up);
  }
  function isFocusNode(node) {
    const nodeName = node.nodeName || '';
    return focusNodes.includes(nodeName);
  }
  function forceBoost() {
    const boost = dragFree ? freeForceBoost : snapForceBoost;
    const type = isMouse ? 'mouse' : 'touch';
    return boost[type];
  }
  function allowedForce(force, targetChanged) {
    const next = index.add(mathSign(force) * -1);
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce;
    if (skipSnaps && targetChanged) return baseForce * 0.5;
    return scrollTarget.byIndex(next.get(), 0).distance;
  }
  function down(evt) {
    const isMouseEvt = isMouseEvent(evt, ownerWindow);
    isMouse = isMouseEvt;
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
    isMoving = deltaAbs(target.get(), location.get()) >= 2;
    if (isMouseEvt && evt.button !== 0) return;
    if (isFocusNode(evt.target)) return;
    pointerIsDown = true;
    dragTracker.pointerDown(evt);
    scrollBody.useFriction(0).useDuration(0);
    target.set(location);
    addDragEvents();
    startScroll = dragTracker.readPoint(evt);
    startCross = dragTracker.readPoint(evt, crossAxis);
    eventHandler.emit('pointerDown');
  }
  function move(evt) {
    const isTouchEvt = !isMouseEvent(evt, ownerWindow);
    if (isTouchEvt && evt.touches.length >= 2) return up(evt);
    const lastScroll = dragTracker.readPoint(evt);
    const lastCross = dragTracker.readPoint(evt, crossAxis);
    const diffScroll = deltaAbs(lastScroll, startScroll);
    const diffCross = deltaAbs(lastCross, startCross);
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt);
      preventScroll = diffScroll > diffCross;
      if (!preventScroll) return up(evt);
    }
    const diff = dragTracker.pointerMove(evt);
    if (diffScroll > dragThreshold) preventClick = true;
    scrollBody.useFriction(0.3).useDuration(0.75);
    animation.start();
    target.add(direction(diff));
    evt.preventDefault();
  }
  function up(evt) {
    const currentLocation = scrollTarget.byDistance(0, false);
    const targetChanged = currentLocation.index !== index.get();
    const rawForce = dragTracker.pointerUp(evt) * forceBoost();
    const force = allowedForce(direction(rawForce), targetChanged);
    const forceFactor = factorAbs(rawForce, force);
    const speed = baseSpeed - 10 * forceFactor;
    const friction = baseFriction + forceFactor / 50;
    preventScroll = false;
    pointerIsDown = false;
    dragEvents.clear();
    scrollBody.useDuration(speed).useFriction(friction);
    scrollTo.distance(force, !dragFree);
    isMouse = false;
    eventHandler.emit('pointerUp');
  }
  function click(evt) {
    if (preventClick) {
      evt.stopPropagation();
      evt.preventDefault();
      preventClick = false;
    }
  }
  function pointerDown() {
    return pointerIsDown;
  }
  const self = {
    init,
    destroy,
    pointerDown
  };
  return self;
}
function DragTracker(axis, ownerWindow) {
  const logInterval = 170;
  let startEvent;
  let lastEvent;
  function readTime(evt) {
    return evt.timeStamp;
  }
  function readPoint(evt, evtAxis) {
    const property = evtAxis || axis.scroll;
    const coord = `client${property === 'x' ? 'X' : 'Y'}`;
    return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
  }
  function pointerDown(evt) {
    startEvent = evt;
    lastEvent = evt;
    return readPoint(evt);
  }
  function pointerMove(evt) {
    const diff = readPoint(evt) - readPoint(lastEvent);
    const expired = readTime(evt) - readTime(startEvent) > logInterval;
    lastEvent = evt;
    if (expired) startEvent = evt;
    return diff;
  }
  function pointerUp(evt) {
    if (!startEvent || !lastEvent) return 0;
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
    const diffTime = readTime(evt) - readTime(startEvent);
    const expired = readTime(evt) - readTime(lastEvent) > logInterval;
    const force = diffDrag / diffTime;
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
    return isFlick ? force : 0;
  }
  const self = {
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint
  };
  return self;
}
function NodeRects() {
  function measure(node) {
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = node;
    const offset = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    };
    return offset;
  }
  const self = {
    measure
  };
  return self;
}
function PercentOfView(viewSize) {
  function measure(n) {
    return viewSize * (n / 100);
  }
  const self = {
    measure
  };
  return self;
}
function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects) {
  let resizeObserver;
  let containerSize;
  let slideSizes = [];
  let destroyed = false;
  function readSize(node) {
    return axis.measureSize(nodeRects.measure(node));
  }
  function init(emblaApi) {
    if (!watchResize) return;
    containerSize = readSize(container);
    slideSizes = slides.map(readSize);
    function defaultCallback(entries) {
      for (const entry of entries) {
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          ownerWindow.requestAnimationFrame(() => {
            emblaApi.reInit();
            eventHandler.emit('resize');
          });
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver(entries => {
      if (destroyed) return;
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    const observeNodes = [container].concat(slides);
    observeNodes.forEach(node => resizeObserver.observe(node));
  }
  function destroy() {
    if (resizeObserver) resizeObserver.disconnect();
    destroyed = true;
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let bodyVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek(timeStep) {
    const fixedDeltaTimeSeconds = timeStep / 1000;
    const duration = scrollDuration * fixedDeltaTimeSeconds;
    const diff = target.get() - location.get();
    const isInstant = !scrollDuration;
    let directionDiff = 0;
    if (isInstant) {
      bodyVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      directionDiff = diff;
    } else {
      previousLocation.set(location);
      bodyVelocity += diff / duration;
      bodyVelocity *= scrollFriction;
      rawLocation += bodyVelocity;
      location.add(bodyVelocity * fixedDeltaTimeSeconds);
      directionDiff = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(directionDiff);
    rawLocationPrevious = rawLocation;
    return self;
  }
  function settled() {
    const diff = target.get() - offsetLocation.get();
    return mathAbs(diff) < 0.001;
  }
  function duration() {
    return scrollDuration;
  }
  function direction() {
    return scrollDirection;
  }
  function velocity() {
    return bodyVelocity;
  }
  function useBaseDuration() {
    return useDuration(baseDuration);
  }
  function useBaseFriction() {
    return useFriction(baseFriction);
  }
  function useDuration(n) {
    scrollDuration = n;
    return self;
  }
  function useFriction(n) {
    scrollFriction = n;
    return self;
  }
  const self = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  };
  return self;
}
function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
  const pullBackThreshold = percentOfView.measure(10);
  const edgeOffsetTolerance = percentOfView.measure(50);
  const frictionLimit = Limit(0.1, 0.99);
  let disabled = false;
  function shouldConstrain() {
    if (disabled) return false;
    if (!limit.reachedAny(target.get())) return false;
    if (!limit.reachedAny(location.get())) return false;
    return true;
  }
  function constrain(pointerDown) {
    if (!shouldConstrain()) return;
    const edge = limit.reachedMin(location.get()) ? 'min' : 'max';
    const diffToEdge = mathAbs(limit[edge] - location.get());
    const diffToTarget = target.get() - location.get();
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
    target.subtract(diffToTarget * friction);
    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()));
      scrollBody.useDuration(25).useBaseFriction();
    }
  }
  function toggleActive(active) {
    disabled = !active;
  }
  const self = {
    shouldConstrain,
    constrain,
    toggleActive
  };
  return self;
}
function ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance) {
  const scrollBounds = Limit(-contentSize + viewSize, 0);
  const snapsBounded = measureBounded();
  const scrollContainLimit = findScrollContainLimit();
  const snapsContained = measureContained();
  function usePixelTolerance(bound, snap) {
    return deltaAbs(bound, snap) < 1;
  }
  function findScrollContainLimit() {
    const startSnap = snapsBounded[0];
    const endSnap = arrayLast(snapsBounded);
    const min = snapsBounded.lastIndexOf(startSnap);
    const max = snapsBounded.indexOf(endSnap) + 1;
    return Limit(min, max);
  }
  function measureBounded() {
    return snapsAligned.map((snapAligned, index) => {
      const {
        min,
        max
      } = scrollBounds;
      const snap = scrollBounds.constrain(snapAligned);
      const isFirst = !index;
      const isLast = arrayIsLastIndex(snapsAligned, index);
      if (isFirst) return max;
      if (isLast) return min;
      if (usePixelTolerance(min, snap)) return min;
      if (usePixelTolerance(max, snap)) return max;
      return snap;
    }).map(scrollBound => parseFloat(scrollBound.toFixed(3)));
  }
  function measureContained() {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max];
    if (containScroll === 'keepSnaps') return snapsBounded;
    const {
      min,
      max
    } = scrollContainLimit;
    return snapsBounded.slice(min, max);
  }
  const self = {
    snapsContained,
    scrollContainLimit
  };
  return self;
}
function ScrollLimit(contentSize, scrollSnaps, loop) {
  const max = scrollSnaps[0];
  const min = loop ? max - contentSize : arrayLast(scrollSnaps);
  const limit = Limit(min, max);
  const self = {
    limit
  };
  return self;
}
function ScrollLooper(contentSize, limit, location, vectors) {
  const jointSafety = 0.1;
  const min = limit.min + jointSafety;
  const max = limit.max + jointSafety;
  const {
    reachedMin,
    reachedMax
  } = Limit(min, max);
  function shouldLoop(direction) {
    if (direction === 1) return reachedMax(location.get());
    if (direction === -1) return reachedMin(location.get());
    return false;
  }
  function loop(direction) {
    if (!shouldLoop(direction)) return;
    const loopDistance = contentSize * (direction * -1);
    vectors.forEach(v => v.add(loopDistance));
  }
  const self = {
    loop
  };
  return self;
}
function ScrollProgress(limit) {
  const {
    max,
    length
  } = limit;
  function get(n) {
    const currentLocation = n - max;
    return length ? currentLocation / -length : 0;
  }
  const self = {
    get
  };
  return self;
}
function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
  const {
    startEdge,
    endEdge
  } = axis;
  const {
    groupSlides
  } = slidesToScroll;
  const alignments = measureSizes().map(alignment.measure);
  const snaps = measureUnaligned();
  const snapsAligned = measureAligned();
  function measureSizes() {
    return groupSlides(slideRects).map(rects => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
  }
  function measureUnaligned() {
    return slideRects.map(rect => containerRect[startEdge] - rect[startEdge]).map(snap => -mathAbs(snap));
  }
  function measureAligned() {
    return groupSlides(snaps).map(g => g[0]).map((snap, index) => snap + alignments[index]);
  }
  const self = {
    snaps,
    snapsAligned
  };
  return self;
}
function SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
  const {
    groupSlides
  } = slidesToScroll;
  const {
    min,
    max
  } = scrollContainLimit;
  const slideRegistry = createSlideRegistry();
  function createSlideRegistry() {
    const groupedSlideIndexes = groupSlides(slideIndexes);
    const doNotContain = !containSnaps || containScroll === 'keepSnaps';
    if (scrollSnaps.length === 1) return [slideIndexes];
    if (doNotContain) return groupedSlideIndexes;
    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(groups, index);
      if (isFirst) {
        const range = arrayLast(groups[0]) + 1;
        return arrayFromNumber(range);
      }
      if (isLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
        return arrayFromNumber(range, arrayLast(groups)[0]);
      }
      return group;
    });
  }
  const self = {
    slideRegistry
  };
  return self;
}
function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
  const {
    reachedAny,
    removeOffset,
    constrain
  } = limit;
  function minDistance(distances) {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0];
  }
  function findTargetSnap(target) {
    const distance = loop ? removeOffset(target) : constrain(target);
    const ascDiffsToSnaps = scrollSnaps.map((snap, index) => ({
      diff: shortcut(snap - distance, 0),
      index
    })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
    const {
      index
    } = ascDiffsToSnaps[0];
    return {
      index,
      distance
    };
  }
  function shortcut(target, direction) {
    const targets = [target, target + contentSize, target - contentSize];
    if (!loop) return target;
    if (!direction) return minDistance(targets);
    const matchingTargets = targets.filter(t => mathSign(t) === direction);
    if (matchingTargets.length) return minDistance(matchingTargets);
    return arrayLast(targets) - contentSize;
  }
  function byIndex(index, direction) {
    const diffToSnap = scrollSnaps[index] - targetVector.get();
    const distance = shortcut(diffToSnap, direction);
    return {
      index,
      distance
    };
  }
  function byDistance(distance, snap) {
    const target = targetVector.get() + distance;
    const {
      index,
      distance: targetSnapDistance
    } = findTargetSnap(target);
    const reachedBound = !loop && reachedAny(target);
    if (!snap || reachedBound) return {
      index,
      distance
    };
    const diffToSnap = scrollSnaps[index] - targetSnapDistance;
    const snapDistance = distance + shortcut(diffToSnap, 0);
    return {
      index,
      distance: snapDistance
    };
  }
  const self = {
    byDistance,
    byIndex,
    shortcut
  };
  return self;
}
function ScrollTo(animation, indexCurrent, indexPrevious, scrollBody, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start();
      } else {
        animation.update();
        animation.render(1);
        animation.update();
      }
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get());
      indexCurrent.set(target.index);
      eventHandler.emit('select');
    }
  }
  function distance(n, snap) {
    const target = scrollTarget.byDistance(n, snap);
    scrollTo(target);
  }
  function index(n, direction) {
    const targetIndex = indexCurrent.clone().set(n);
    const target = scrollTarget.byIndex(targetIndex.get(), direction);
    scrollTo(target);
  }
  const self = {
    distance,
    index
  };
  return self;
}
function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler) {
  let lastTabPressTime = 0;
  function init() {
    eventStore.add(document, 'keydown', registerTabPress, false);
    slides.forEach(addSlideFocusEvent);
  }
  function registerTabPress(event) {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime();
  }
  function addSlideFocusEvent(slide) {
    const focus = () => {
      const nowTime = new Date().getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      root.scrollLeft = 0;
      const index = slides.indexOf(slide);
      const group = slideRegistry.findIndex(group => group.includes(index));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit('slideFocus');
    };
    eventStore.add(slide, 'focus', focus, {
      passive: true,
      capture: true
    });
  }
  const self = {
    init
  };
  return self;
}
function Vector1D(initialValue) {
  let value = initialValue;
  function get() {
    return value;
  }
  function set(n) {
    value = normalizeInput(n);
  }
  function add(n) {
    value += normalizeInput(n);
  }
  function subtract(n) {
    value -= normalizeInput(n);
  }
  function normalizeInput(n) {
    return isNumber(n) ? n : n.get();
  }
  const self = {
    get,
    set,
    add,
    subtract
  };
  return self;
}
function Translate(axis, container) {
  const translate = axis.scroll === 'x' ? x : y;
  const containerStyle = container.style;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    containerStyle.transform = translate(axis.direction(target));
  }
  function toggleActive(active) {
    disabled = !active;
  }
  function clear() {
    if (disabled) return;
    containerStyle.transform = '';
    if (!container.getAttribute('style')) container.removeAttribute('style');
  }
  const self = {
    clear,
    to,
    toggleActive
  };
  return self;
}
function SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides) {
  const roundingSafety = 0.5;
  const ascItems = arrayKeys(slideSizesWithGaps);
  const descItems = arrayKeys(slideSizesWithGaps).reverse();
  const loopPoints = startPoints().concat(endPoints());
  function removeSlideSizes(indexes, from) {
    return indexes.reduce((a, i) => {
      return a - slideSizesWithGaps[i];
    }, from);
  }
  function slidesInGap(indexes, gap) {
    return indexes.reduce((a, i) => {
      const remainingGap = removeSlideSizes(a, gap);
      return remainingGap > 0 ? a.concat([i]) : a;
    }, []);
  }
  function findSlideBounds(offset) {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }));
  }
  function findLoopPoints(indexes, offset, isEndEdge) {
    const slideBounds = findSlideBounds(offset);
    return indexes.map(index => {
      const initial = isEndEdge ? 0 : -contentSize;
      const altered = isEndEdge ? contentSize : 0;
      const boundEdge = isEndEdge ? 'end' : 'start';
      const loopPoint = slideBounds[index][boundEdge];
      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index]),
        target: () => location.get() > loopPoint ? initial : altered
      };
    });
  }
  function startPoints() {
    const gap = scrollSnaps[0];
    const indexes = slidesInGap(descItems, gap);
    return findLoopPoints(indexes, contentSize, false);
  }
  function endPoints() {
    const gap = viewSize - scrollSnaps[0] - 1;
    const indexes = slidesInGap(ascItems, gap);
    return findLoopPoints(indexes, -contentSize, true);
  }
  function canLoop() {
    return loopPoints.every(_ref => {
      let {
        index
      } = _ref;
      const otherIndexes = ascItems.filter(i => i !== index);
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
    });
  }
  function loop() {
    loopPoints.forEach(loopPoint => {
      const {
        target,
        translate,
        slideLocation
      } = loopPoint;
      const shiftLocation = target();
      if (shiftLocation === slideLocation.get()) return;
      translate.to(shiftLocation);
      slideLocation.set(shiftLocation);
    });
  }
  function clear() {
    loopPoints.forEach(loopPoint => loopPoint.translate.clear());
  }
  const self = {
    canLoop,
    clear,
    loop,
    loopPoints
  };
  return self;
}
function SlidesHandler(container, eventHandler, watchSlides) {
  let mutationObserver;
  let destroyed = false;
  function init(emblaApi) {
    if (!watchSlides) return;
    function defaultCallback(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          emblaApi.reInit();
          eventHandler.emit('slidesChanged');
          break;
        }
      }
    }
    mutationObserver = new MutationObserver(mutations => {
      if (destroyed) return;
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations);
      }
    });
    mutationObserver.observe(container, {
      childList: true
    });
  }
  function destroy() {
    if (mutationObserver) mutationObserver.disconnect();
    destroyed = true;
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function SlidesInView(container, slides, eventHandler, threshold) {
  const intersectionEntryMap = {};
  let inViewCache = null;
  let notInViewCache = null;
  let intersectionObserver;
  let destroyed = false;
  function init() {
    intersectionObserver = new IntersectionObserver(entries => {
      if (destroyed) return;
      entries.forEach(entry => {
        const index = slides.indexOf(entry.target);
        intersectionEntryMap[index] = entry;
      });
      inViewCache = null;
      notInViewCache = null;
      eventHandler.emit('slidesInView');
    }, {
      root: container.parentElement,
      threshold
    });
    slides.forEach(slide => intersectionObserver.observe(slide));
  }
  function destroy() {
    if (intersectionObserver) intersectionObserver.disconnect();
    destroyed = true;
  }
  function createInViewList(inView) {
    return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index = parseInt(slideIndex);
      const {
        isIntersecting
      } = intersectionEntryMap[index];
      const inViewMatch = inView && isIntersecting;
      const notInViewMatch = !inView && !isIntersecting;
      if (inViewMatch || notInViewMatch) list.push(index);
      return list;
    }, []);
  }
  function get() {
    let inView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (inView && inViewCache) return inViewCache;
    if (!inView && notInViewCache) return notInViewCache;
    const slideIndexes = createInViewList(inView);
    if (inView) inViewCache = slideIndexes;
    if (!inView) notInViewCache = slideIndexes;
    return slideIndexes;
  }
  const self = {
    init,
    destroy,
    get
  };
  return self;
}
function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
  const {
    measureSize,
    startEdge,
    endEdge
  } = axis;
  const withEdgeGap = slideRects[0] && readEdgeGap;
  const startGap = measureStartGap();
  const endGap = measureEndGap();
  const slideSizes = slideRects.map(measureSize);
  const slideSizesWithGaps = measureWithGaps();
  function measureStartGap() {
    if (!withEdgeGap) return 0;
    const slideRect = slideRects[0];
    return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
  }
  function measureEndGap() {
    if (!withEdgeGap) return 0;
    const style = ownerWindow.getComputedStyle(arrayLast(slides));
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`));
  }
  function measureWithGaps() {
    return slideRects.map((rect, index, rects) => {
      const isFirst = !index;
      const isLast = arrayIsLastIndex(rects, index);
      if (isFirst) return slideSizes[index] + startGap;
      if (isLast) return slideSizes[index] + endGap;
      return rects[index + 1][startEdge] - rect[startEdge];
    }).map(mathAbs);
  }
  const self = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  };
  return self;
}
function SlidesToScroll(axis, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap, pixelTolerance) {
  const {
    startEdge,
    endEdge,
    direction
  } = axis;
  const groupByNumber = isNumber(slidesToScroll);
  function byNumber(array, groupSize) {
    return arrayKeys(array).filter(i => i % groupSize === 0).map(i => array.slice(i, i + groupSize));
  }
  function bySize(array) {
    if (!array.length) return [];
    return arrayKeys(array).reduce((groups, rectB, index) => {
      const rectA = arrayLast(groups) || 0;
      const isFirst = rectA === 0;
      const isLast = rectB === arrayLastIndex(array);
      const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
      const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
      const gapA = !loop && isFirst ? direction(startGap) : 0;
      const gapB = !loop && isLast ? direction(endGap) : 0;
      const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
      if (index && chunkSize > viewSize + pixelTolerance) groups.push(rectB);
      if (isLast) groups.push(array.length);
      return groups;
    }, []).map((currentSize, index, groups) => {
      const previousSize = Math.max(groups[index - 1] || 0);
      return array.slice(previousSize, currentSize);
    });
  }
  function groupSlides(array) {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
  }
  const self = {
    groupSlides
  };
  return self;
}
function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler) {
  // Options
  const {
    align,
    axis: scrollAxis,
    direction,
    startIndex,
    loop,
    duration,
    dragFree,
    dragThreshold,
    inViewThreshold,
    slidesToScroll: groupSlides,
    skipSnaps,
    containScroll,
    watchResize,
    watchSlides,
    watchDrag
  } = options;
  // Measurements
  const pixelTolerance = 2;
  const nodeRects = NodeRects();
  const containerRect = nodeRects.measure(container);
  const slideRects = slides.map(nodeRects.measure);
  const axis = Axis(scrollAxis, direction);
  const viewSize = axis.measureSize(containerRect);
  const percentOfView = PercentOfView(viewSize);
  const alignment = Alignment(align, viewSize);
  const containSnaps = !loop && !!containScroll;
  const readEdgeGap = loop || !!containScroll;
  const {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
  const slidesToScroll = SlidesToScroll(axis, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap, pixelTolerance);
  const {
    snaps,
    snapsAligned
  } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
  const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
  const {
    snapsContained,
    scrollContainLimit
  } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll, pixelTolerance);
  const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
  const {
    limit
  } = ScrollLimit(contentSize, scrollSnaps, loop);
  // Indexes
  const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
  const indexPrevious = index.clone();
  const slideIndexes = arrayKeys(slides);
  // Animation
  const update = (_ref2, timeStep) => {
    let {
      dragHandler,
      scrollBody,
      scrollBounds,
      options: {
        loop
      }
    } = _ref2;
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody.seek(timeStep);
  };
  const render = (_ref3, lagOffset) => {
    let {
      scrollBody,
      translate,
      location,
      offsetLocation,
      scrollLooper,
      slideLooper,
      dragHandler,
      animation,
      eventHandler,
      scrollBounds,
      options: {
        loop
      }
    } = _ref3;
    const shouldSettle = scrollBody.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop ? shouldSettle : shouldSettle && withinBounds;
    if (hasSettled && !dragHandler.pointerDown()) {
      animation.stop();
      eventHandler.emit('settle');
    }
    if (!hasSettled) eventHandler.emit('scroll');
    const interpolatedLocation = location.get() * lagOffset + previousLocation.get() * (1 - lagOffset);
    offsetLocation.set(interpolatedLocation);
    if (loop) {
      scrollLooper.loop(scrollBody.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation.get());
  };
  const animation = Animations(ownerDocument, ownerWindow, timeStep => update(engine, timeStep), lagOffset => render(engine, lagOffset));
  // Shared
  const friction = 0.68;
  const startLocation = scrollSnaps[index.get()];
  const location = Vector1D(startLocation);
  const previousLocation = Vector1D(startLocation);
  const offsetLocation = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, offsetLocation, previousLocation, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index, indexPrevious, scrollBody, scrollTarget, target, eventHandler);
  const scrollProgress = ScrollProgress(limit);
  const eventStore = EventStore();
  const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
  const {
    slideRegistry
  } = SlideRegistry(containSnaps, containScroll, scrollSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler);
  // Engine
  const engine = {
    ownerDocument,
    ownerWindow,
    eventHandler,
    containerRect,
    slideRects,
    animation,
    axis,
    dragHandler: DragHandler(axis, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
    eventStore,
    percentOfView,
    index,
    indexPrevious,
    limit,
    location,
    offsetLocation,
    previousLocation,
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, offsetLocation, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, previousLocation, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
    slideFocus,
    slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
    slidesInView,
    slideIndexes,
    slideRegistry,
    slidesToScroll,
    target,
    translate: Translate(axis, container)
  };
  return engine;
}
function EventHandler() {
  let listeners = {};
  let api;
  function init(emblaApi) {
    api = emblaApi;
  }
  function getListeners(evt) {
    return listeners[evt] || [];
  }
  function emit(evt) {
    getListeners(evt).forEach(e => e(api, evt));
    return self;
  }
  function on(evt, cb) {
    listeners[evt] = getListeners(evt).concat([cb]);
    return self;
  }
  function off(evt, cb) {
    listeners[evt] = getListeners(evt).filter(e => e !== cb);
    return self;
  }
  function clear() {
    listeners = {};
  }
  const self = {
    init,
    emit,
    off,
    on,
    clear
  };
  return self;
}
const defaultOptions = {
  align: 'center',
  axis: 'x',
  container: null,
  slides: null,
  containScroll: 'trimSnaps',
  direction: 'ltr',
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true
};
function OptionsHandler(ownerWindow) {
  function mergeOptions(optionsA, optionsB) {
    return objectsMergeDeep(optionsA, optionsB || {});
  }
  function optionsAtMedia(options) {
    const optionsAtMedia = options.breakpoints || {};
    const matchedMediaOptions = objectKeys(optionsAtMedia).filter(media => ownerWindow.matchMedia(media).matches).map(media => optionsAtMedia[media]).reduce((a, mediaOption) => mergeOptions(a, mediaOption), {});
    return mergeOptions(options, matchedMediaOptions);
  }
  function optionsMediaQueries(optionsList) {
    return optionsList.map(options => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
  }
  const self = {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  };
  return self;
}
function PluginsHandler(optionsHandler) {
  let activePlugins = [];
  function init(emblaApi, plugins) {
    activePlugins = plugins.filter(_ref4 => {
      let {
        options
      } = _ref4;
      return optionsHandler.optionsAtMedia(options).active !== false;
    });
    activePlugins.forEach(plugin => plugin.init(emblaApi, optionsHandler));
    return plugins.reduce((map, plugin) => Object.assign(map, {
      [plugin.name]: plugin
    }), {});
  }
  function destroy() {
    activePlugins = activePlugins.filter(plugin => plugin.destroy());
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function EmblaCarousel(root, userOptions, userPlugins) {
  const ownerDocument = root.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const optionsHandler = OptionsHandler(ownerWindow);
  const pluginsHandler = PluginsHandler(optionsHandler);
  const mediaHandlers = EventStore();
  const eventHandler = EventHandler();
  const {
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  } = optionsHandler;
  const {
    on,
    off,
    emit
  } = eventHandler;
  const reInit = reActivate;
  let destroyed = false;
  let engine;
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions);
  let options = mergeOptions(optionsBase);
  let pluginList = [];
  let pluginApis;
  let container;
  let slides;
  function storeElements() {
    const {
      container: userContainer,
      slides: userSlides
    } = options;
    const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
    container = customContainer || root.children[0];
    const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
    slides = [].slice.call(customSlides || container.children);
  }
  function createEngine(options) {
    const engine = Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler);
    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options, {
        loop: false
      });
      return createEngine(optionsWithoutLoop);
    }
    return engine;
  }
  function activate(withOptions, withPlugins) {
    if (destroyed) return;
    optionsBase = mergeOptions(optionsBase, withOptions);
    options = optionsAtMedia(optionsBase);
    pluginList = withPlugins || pluginList;
    storeElements();
    engine = createEngine(options);
    optionsMediaQueries([optionsBase, ...pluginList.map(_ref5 => {
      let {
        options
      } = _ref5;
      return options;
    })]).forEach(query => mediaHandlers.add(query, 'change', reActivate));
    if (!options.active) return;
    engine.translate.to(engine.location.get());
    engine.animation.init();
    engine.slidesInView.init();
    engine.slideFocus.init();
    engine.eventHandler.init(self);
    engine.resizeHandler.init(self);
    engine.slidesHandler.init(self);
    if (engine.options.loop) engine.slideLooper.loop();
    if (container.offsetParent && slides.length) engine.dragHandler.init(self);
    pluginApis = pluginsHandler.init(self, pluginList);
  }
  function reActivate(withOptions, withPlugins) {
    const startIndex = selectedScrollSnap();
    deActivate();
    activate(mergeOptions({
      startIndex
    }, withOptions), withPlugins);
    eventHandler.emit('reInit');
  }
  function deActivate() {
    engine.dragHandler.destroy();
    engine.eventStore.clear();
    engine.translate.clear();
    engine.slideLooper.clear();
    engine.resizeHandler.destroy();
    engine.slidesHandler.destroy();
    engine.slidesInView.destroy();
    engine.animation.destroy();
    pluginsHandler.destroy();
    mediaHandlers.clear();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    mediaHandlers.clear();
    deActivate();
    eventHandler.emit('destroy');
    eventHandler.clear();
  }
  function scrollTo(index, jump, direction) {
    if (!options.active || destroyed) return;
    engine.scrollBody.useBaseFriction().useDuration(jump === true ? 0 : options.duration);
    engine.scrollTo.index(index, direction || 0);
  }
  function scrollNext(jump) {
    const next = engine.index.add(1).get();
    scrollTo(next, jump, -1);
  }
  function scrollPrev(jump) {
    const prev = engine.index.add(-1).get();
    scrollTo(prev, jump, 1);
  }
  function canScrollNext() {
    const next = engine.index.add(1).get();
    return next !== selectedScrollSnap();
  }
  function canScrollPrev() {
    const prev = engine.index.add(-1).get();
    return prev !== selectedScrollSnap();
  }
  function scrollSnapList() {
    return engine.scrollSnapList;
  }
  function scrollProgress() {
    return engine.scrollProgress.get(engine.location.get());
  }
  function selectedScrollSnap() {
    return engine.index.get();
  }
  function previousScrollSnap() {
    return engine.indexPrevious.get();
  }
  function slidesInView() {
    return engine.slidesInView.get();
  }
  function slidesNotInView() {
    return engine.slidesInView.get(false);
  }
  function plugins() {
    return pluginApis;
  }
  function internalEngine() {
    return engine;
  }
  function rootNode() {
    return root;
  }
  function containerNode() {
    return container;
  }
  function slideNodes() {
    return slides;
  }
  const self = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  };
  activate(userOptions, userPlugins);
  setTimeout(() => eventHandler.emit('init'), 0);
  return self;
}
EmblaCarousel.globalOptions = undefined;


/***/ })

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/*!*************************!*\
  !*** ./src/gallery.es6 ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var embla_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! embla-carousel */ "./node_modules/embla-carousel/esm/embla-carousel.esm.js");
/* harmony import */ var embla_carousel_wheel_gestures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! embla-carousel-wheel-gestures */ "./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js");
/* harmony import */ var embla_carousel_fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! embla-carousel-fade */ "./node_modules/embla-carousel-fade/esm/embla-carousel-fade.esm.js");
/* harmony import */ var _buttons_es6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons.es6 */ "./src/buttons.es6");




class YTDynamicsGallery {
  init(container) {
    const OPTIONS = {
      loop: true,
      duration: 30
    };
    const OPTIONS_THUMBS = {
      align: 'start',
      axis: 'y',
      dragFree: true,
      loop: true
    };
    let viewportNodeMainCarousel = container.querySelector('.rmslideshow__viewport'),
      viewportNodeThumbCarousel = container.querySelector('.rmslideshow-thumbs__viewport'),
      prevThumbBtnNode = container.querySelector('.rmslideshow-thumbs__prev'),
      nextThumbBtnNode = container.querySelector('.rmslideshow-thumbs__next'),
      emblaMain = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_2__["default"])(viewportNodeMainCarousel, OPTIONS, [(0,embla_carousel_fade__WEBPACK_IMPORTED_MODULE_3__["default"])()]),
      emblaThumb = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_2__["default"])(viewportNodeThumbCarousel, OPTIONS_THUMBS, [(0,embla_carousel_wheel_gestures__WEBPACK_IMPORTED_MODULE_0__.WheelGesturesPlugin)()]);
    let removeThumbBtnsClickHandlers = (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_1__.addThumbButtonsClickHandlers)(emblaMain, emblaThumb),
      removeToggleThumbBtnsActive = (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_1__.addToggleThumbButtonsActive)(emblaMain, emblaThumb),
      removeThumbPrevNextBtnsClickHandlers = (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_1__.addPrevNextButtonsClickHandlers)(emblaThumb, prevThumbBtnNode, nextThumbBtnNode);
    emblaMain.on('destroy', removeThumbBtnsClickHandlers).on('destroy', removeToggleThumbBtnsActive).on('destroy', removeThumbPrevNextBtnsClickHandlers);
    emblaThumb.on('destroy', removeThumbBtnsClickHandlers).on('destroy', removeToggleThumbBtnsActive).on('destroy', removeThumbPrevNextBtnsClickHandlers);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  let rmslideshows = document.querySelectorAll('.rmslideshow');
  for (let i = 0; i < rmslideshows.length; i++) {
    new YTDynamicsGallery().init(rmslideshows[i]);
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUQsS0FBSyxJQUFJM3FCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR29zQixZQUFZLENBQUNsdEIsTUFBTSxFQUFFYyxDQUFDLEVBQUUsRUFBRTtJQUN6QyxJQUFJd3JCLGlCQUFpQixDQUFELENBQUMsQ0FBRXZ5QixJQUFJLENBQUNtekIsWUFBWSxDQUFDcHNCLENBQUMsQ0FBQyxDQUFDO0VBQ2pEO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL1doZWVsR2VzdHVyZXNQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy91dGlscy9wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvRXZlbnRCdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9zdGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL3doZWVsLWdlc3R1cmVzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9idXR0b25zLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0ZhZGUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2dhbGxlcnkuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5pbXBvcnQgeyBDcmVhdGVPcHRpb25zVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsL2NvbXBvbmVudHMvT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsL2NvbXBvbmVudHMvT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBDcmVhdGVQbHVnaW5UeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9QbHVnaW5zJ1xuaW1wb3J0IFdoZWVsR2VzdHVyZXMsIHsgV2hlZWxFdmVudFN0YXRlIH0gZnJvbSAnd2hlZWwtZ2VzdHVyZXMnXG5cbmV4cG9ydCB0eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICB3aGVlbERyYWdnaW5nQ2xhc3M6IHN0cmluZ1xuICBmb3JjZVdoZWVsQXhpcz86ICd4JyB8ICd5J1xuICB0YXJnZXQ/OiBFbGVtZW50XG59PlxuXG50eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnM+XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IHtcbiAgYWN0aXZlOiB0cnVlLFxuICBicmVha3BvaW50czoge30sXG4gIHdoZWVsRHJhZ2dpbmdDbGFzczogJ2lzLXdoZWVsLWRyYWdnaW5nJyxcbiAgZm9yY2VXaGVlbEF4aXM6IHVuZGVmaW5lZCxcbiAgdGFyZ2V0OiB1bmRlZmluZWQsXG59XG5cbldoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZCBhcyBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddIHwgdW5kZWZpbmVkXG5cbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzUGx1Z2luKHVzZXJPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddID0ge30pOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSB7XG4gIGxldCBvcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9uc1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHt9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYTogRW1ibGFDYXJvdXNlbFR5cGUsIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGUpIHtcbiAgICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEgfSA9IG9wdGlvbnNIYW5kbGVyXG4gICAgY29uc3Qgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIFdoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGNvbnN0IGVuZ2luZSA9IGVtYmxhLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0YXJnZXROb2RlID0gb3B0aW9ucy50YXJnZXQgPz8gKGVtYmxhLmNvbnRhaW5lck5vZGUoKS5wYXJlbnROb2RlIGFzIEVsZW1lbnQpXG4gICAgY29uc3Qgd2hlZWxBeGlzID0gb3B0aW9ucy5mb3JjZVdoZWVsQXhpcyA/PyBlbmdpbmUub3B0aW9ucy5heGlzXG4gICAgY29uc3Qgd2hlZWxHZXN0dXJlcyA9IFdoZWVsR2VzdHVyZXMoe1xuICAgICAgcHJldmVudFdoZWVsQWN0aW9uOiB3aGVlbEF4aXMsXG4gICAgICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbiAgICB9KVxuXG4gICAgY29uc3QgdW5vYnNlcnZlVGFyZ2V0Tm9kZSA9IHdoZWVsR2VzdHVyZXMub2JzZXJ2ZSh0YXJnZXROb2RlKVxuICAgIGNvbnN0IG9mZldoZWVsID0gd2hlZWxHZXN0dXJlcy5vbignd2hlZWwnLCBoYW5kbGVXaGVlbClcblxuICAgIGxldCBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgIGxldCBzdGFydEV2ZW50OiBNb3VzZUV2ZW50XG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJywgc3RhdGUuZXZlbnQpXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gTGVnYWN5IEJyb3dzZXJzIGxpa2UgSUUgMTAgJiAxMSB3aWxsIHRocm93IHdoZW4gYXR0ZW1wdGluZyB0byBjcmVhdGUgdGhlIEV2ZW50XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0xlZ2FjeSBicm93c2VyIHJlcXVpcmVzIGV2ZW50cy1wb2x5ZmlsbCAoaHR0cHM6Ly9naXRodWIuY29tL3hpZWwvZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMjbGVnYWN5LWJyb3dzZXJzKSdcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFudXAoKVxuICAgICAgfVxuXG4gICAgICBpc1N0YXJ0ZWQgPSB0cnVlXG4gICAgICBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LmFkZChvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgICAgZGlzcGF0Y2hFdmVudChjcmVhdGVSZWxhdGl2ZU1vdXNlRXZlbnQoJ21vdXNldXAnLCBzdGF0ZSkpXG4gICAgICByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgIGlmIChpc1N0YXJ0ZWQgJiYgZS5pc1RydXN0ZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCh0eXBlOiAnbW91c2Vkb3duJyB8ICdtb3VzZW1vdmUnIHwgJ21vdXNldXAnLCBzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBsZXQgbW92ZVgsIG1vdmVZXG5cbiAgICAgIGlmICh3aGVlbEF4aXMgPT09IGVuZ2luZS5vcHRpb25zLmF4aXMpIHtcbiAgICAgICAgO1ttb3ZlWCwgbW92ZVldID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBlbWJsYXMgYXhpcyBhbmQgdGhlIHdoZWVsQXhpcyBkb24ndCBtYXRjaCwgc3dhcCB0aGUgYXhlcyB0byBtYXRjaCB0aGUgcmlnaHQgZW1ibGEgZXZlbnRzXG4gICAgICAgIDtbbW92ZVksIG1vdmVYXSA9IHN0YXRlLmF4aXNNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IHNraXBwaW5nIHNsaWRlc1xuICAgICAgaWYgKCFlbmdpbmUub3B0aW9ucy5za2lwU25hcHMgJiYgIWVuZ2luZS5vcHRpb25zLmRyYWdGcmVlKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aFxuICAgICAgICBjb25zdCBtYXhZID0gZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0XG5cbiAgICAgICAgbW92ZVggPSBtb3ZlWCA8IDAgPyBNYXRoLm1heChtb3ZlWCwgLW1heFgpIDogTWF0aC5taW4obW92ZVgsIG1heFgpXG4gICAgICAgIG1vdmVZID0gbW92ZVkgPCAwID8gTWF0aC5tYXgobW92ZVksIC1tYXhZKSA6IE1hdGgubWluKG1vdmVZLCBtYXhZKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICBjbGllbnRYOiBzdGFydEV2ZW50LmNsaWVudFggKyBtb3ZlWCxcbiAgICAgICAgY2xpZW50WTogc3RhcnRFdmVudC5jbGllbnRZICsgbW92ZVksXG4gICAgICAgIHNjcmVlblg6IHN0YXJ0RXZlbnQuc2NyZWVuWCArIG1vdmVYLFxuICAgICAgICBzY3JlZW5ZOiBzdGFydEV2ZW50LnNjcmVlblkgKyBtb3ZlWSxcbiAgICAgICAgbW92ZW1lbnRYOiBtb3ZlWCxcbiAgICAgICAgbW92ZW1lbnRZOiBtb3ZlWSxcbiAgICAgICAgYnV0dG9uOiAwLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudDogVUlFdmVudCkge1xuICAgICAgZW1ibGEuY29udGFpbmVyTm9kZSgpLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlV2hlZWwoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBheGlzRGVsdGE6IFtkZWx0YVgsIGRlbHRhWV0sXG4gICAgICB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGEgPSB3aGVlbEF4aXMgPT09ICd4JyA/IGRlbHRhWCA6IGRlbHRhWVxuICAgICAgY29uc3QgY3Jvc3NBeGlzRGVsdGEgPSB3aGVlbEF4aXMgPT09ICd4JyA/IGRlbHRhWSA6IGRlbHRhWFxuICAgICAgY29uc3QgaXNSZWxlYXNlID0gc3RhdGUuaXNNb21lbnR1bSAmJiBzdGF0ZS5wcmV2aW91cyAmJiAhc3RhdGUucHJldmlvdXMuaXNNb21lbnR1bVxuICAgICAgY29uc3QgaXNFbmRpbmdPclJlbGVhc2UgPSAoc3RhdGUuaXNFbmRpbmcgJiYgIXN0YXRlLmlzTW9tZW50dW0pIHx8IGlzUmVsZWFzZVxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YUlzRG9taW5hbnQgPSBNYXRoLmFicyhwcmltYXJ5QXhpc0RlbHRhKSA+IE1hdGguYWJzKGNyb3NzQXhpc0RlbHRhKVxuXG4gICAgICBpZiAocHJpbWFyeUF4aXNEZWx0YUlzRG9taW5hbnQgJiYgIWlzU3RhcnRlZCAmJiAhc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgICB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzU3RhcnRlZCkgcmV0dXJuXG4gICAgICBpZiAoaXNFbmRpbmdPclJlbGVhc2UpIHtcbiAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2Vtb3ZlJywgc3RhdGUpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICB1bm9ic2VydmVUYXJnZXROb2RlKClcbiAgICAgIG9mZldoZWVsKClcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0ge1xuICAgIG5hbWU6ICd3aGVlbEdlc3R1cmVzJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3k6ICgpID0+IGNsZWFudXAoKSxcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG1vZHVsZSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9QbHVnaW5zJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICB3aGVlbEdlc3R1cmVzPzogV2hlZWxHZXN0dXJlc1BsdWdpblR5cGVcbiAgfVxufVxuIiwiY29uc3QgREVDQVkgPSAwLjk5NlxuXG4vKipcbiAqIG1vdmVtZW50IHByb2plY3Rpb24gYmFzZWQgb24gdmVsb2NpdHlcbiAqIEBwYXJhbSB2ZWxvY2l0eVB4TXNcbiAqIEBwYXJhbSBkZWNheVxuICovXG5leHBvcnQgY29uc3QgcHJvamVjdGlvbiA9ICh2ZWxvY2l0eVB4TXM6IG51bWJlciwgZGVjYXkgPSBERUNBWSkgPT4gKHZlbG9jaXR5UHhNcyAqIGRlY2F5KSAvICgxIC0gZGVjYXkpXG4iLCJleHBvcnQgKiBmcm9tICcuL3Byb2plY3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0T2Y8VD4oYXJyYXk6IFRbXSkge1xuICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF2ZXJhZ2UobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIG51bWJlcnMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBudW1iZXJzLmxlbmd0aFxufVxuXG5leHBvcnQgY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihNYXRoLm1heChtaW4sIHZhbHVlKSwgbWF4KVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVmVjdG9yczxUIGV4dGVuZHMgbnVtYmVyW10+KHYxOiBULCB2MjogVCk6IFQge1xuICBpZiAodjEubGVuZ3RoICE9PSB2Mi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlY3RvcnMgbXVzdCBiZSBzYW1lIGxlbmd0aCcpXG4gIH1cbiAgcmV0dXJuIHYxLm1hcCgodmFsLCBpKSA9PiB2YWwgKyB2MltpXSkgYXMgVFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KG51bWJlcnM6IG51bWJlcltdKSB7XG4gIHJldHVybiBNYXRoLm1heCguLi5udW1iZXJzLm1hcChNYXRoLmFicykpXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZGVlcEZyZWV6ZTxUIGV4dGVuZHMgb2JqZWN0PihvOiBUKTogUmVhZG9ubHk8VD4ge1xuICBPYmplY3QuZnJlZXplKG8pXG4gIE9iamVjdC52YWx1ZXMobykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhT2JqZWN0LmlzRnJvemVuKHZhbHVlKSkge1xuICAgICAgZGVlcEZyZWV6ZSh2YWx1ZSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBvXG59XG4iLCJpbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEV2ZW50TWFwRW1wdHkgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxEID0gdW5rbm93bj4gPSAoZGF0YTogRCkgPT4gdm9pZFxuZXhwb3J0IHR5cGUgT2ZmID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudEJ1czxFdmVudE1hcCA9IEV2ZW50TWFwRW1wdHk+KCkge1xuICBjb25zdCBsaXN0ZW5lcnMgPSB7fSBhcyBSZWNvcmQ8a2V5b2YgRXZlbnRNYXAsIEV2ZW50TGlzdGVuZXI8bmV2ZXI+W10+XG5cbiAgZnVuY3Rpb24gb248RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pOiBPZmYge1xuICAgIGxpc3RlbmVyc1t0eXBlXSA9IChsaXN0ZW5lcnNbdHlwZV0gfHwgW10pLmNvbmNhdChsaXN0ZW5lcilcbiAgICByZXR1cm4gKCkgPT4gb2ZmKHR5cGUsIGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+KSB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuZmlsdGVyKChsKSA9PiBsICE9PSBsaXN0ZW5lcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BhdGNoPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBkYXRhOiBFdmVudE1hcFtFS10pIHtcbiAgICBpZiAoISh0eXBlIGluIGxpc3RlbmVycykpIHJldHVyblxuICAgIDsobGlzdGVuZXJzW3R5cGVdIGFzIEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPltdKS5mb3JFYWNoKChsKSA9PiBsKGRhdGEpKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBkaXNwYXRjaCxcbiAgfSlcbn1cbiIsImltcG9ydCB7IFdoZWVsRXZlbnREYXRhIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbnR5cGUgVW5vYnNlcnZlVGFyZ2V0ID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZnVuY3Rpb24gV2hlZWxUYXJnZXRPYnNlcnZlcihldmVudExpc3RlbmVyOiAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHZvaWQpIHtcbiAgbGV0IHRhcmdldHM6IEV2ZW50VGFyZ2V0W10gPSBbXVxuXG4gIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byB0YXJnZXQgZWxlbWVudFxuICBjb25zdCBvYnNlcnZlID0gKHRhcmdldDogRXZlbnRUYXJnZXQpOiBVbm9ic2VydmVUYXJnZXQgPT4ge1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lciwgeyBwYXNzaXZlOiBmYWxzZSB9KVxuICAgIHRhcmdldHMucHVzaCh0YXJnZXQpXG5cbiAgICByZXR1cm4gKCkgPT4gdW5vYnNlcnZlKHRhcmdldClcbiAgfVxuXG4gIC8vLyByZW1vdmUgZXZlbnQgbGlzdGVuZXIgZnJvbSB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB1bm9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCkgPT4ge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcilcbiAgICB0YXJnZXRzID0gdGFyZ2V0cy5maWx0ZXIoKHQpID0+IHQgIT09IHRhcmdldClcbiAgfVxuXG4gIC8vIHN0b3BzIHdhdGNoaW5nIGFsbCBvZiBpdHMgdGFyZ2V0IGVsZW1lbnRzIGZvciB2aXNpYmlsaXR5IGNoYW5nZXMuXG4gIGNvbnN0IGRpc2Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgdGFyZ2V0cy5mb3JFYWNoKHVub2JzZXJ2ZSlcbiAgfVxuXG4gIHJldHVybiBkZWVwRnJlZXplKHtcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICB9KVxufVxuIiwiaW1wb3J0IHsgUmV2ZXJzZVNpZ24sIFZlY3RvclhZWiwgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZFdoZWVsIHtcbiAgYXhpc0RlbHRhOiBWZWN0b3JYWVpcbiAgdGltZVN0YW1wOiBudW1iZXJcbn1cblxuY29uc3QgTElORV9IRUlHSFQgPSAxNiAqIDEuMTI1XG5jb25zdCBQQUdFX0hFSUdIVCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuaW5uZXJIZWlnaHQpIHx8IDgwMFxuY29uc3QgREVMVEFfTU9ERV9VTklUID0gWzEsIExJTkVfSEVJR0hULCBQQUdFX0hFSUdIVF1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoZWVsKGU6IFdoZWVsRXZlbnREYXRhKTogTm9ybWFsaXplZFdoZWVsIHtcbiAgY29uc3QgZGVsdGFYID0gZS5kZWx0YVggKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWSA9IGUuZGVsdGFZICogREVMVEFfTU9ERV9VTklUW2UuZGVsdGFNb2RlXVxuICBjb25zdCBkZWx0YVogPSAoZS5kZWx0YVogfHwgMCkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG5cbiAgcmV0dXJuIHtcbiAgICB0aW1lU3RhbXA6IGUudGltZVN0YW1wLFxuICAgIGF4aXNEZWx0YTogW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdLFxuICB9XG59XG5cbmNvbnN0IHJldmVyc2VBbGwgPSBbLTEsIC0xLCAtMV1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VBeGlzRGVsdGFTaWduPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+PihcbiAgd2hlZWw6IFQsXG4gIHJldmVyc2VTaWduOiBSZXZlcnNlU2lnblxuKTogVCB7XG4gIGlmICghcmV2ZXJzZVNpZ24pIHtcbiAgICByZXR1cm4gd2hlZWxcbiAgfVxuXG4gIGNvbnN0IG11bHRpcGxpZXJzID0gcmV2ZXJzZVNpZ24gPT09IHRydWUgPyByZXZlcnNlQWxsIDogcmV2ZXJzZVNpZ24ubWFwKChzaG91bGRSZXZlcnNlKSA9PiAoc2hvdWxkUmV2ZXJzZSA/IC0xIDogMSkpXG5cbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhLCBpKSA9PiBkZWx0YSAqIG11bHRpcGxpZXJzW2ldKSxcbiAgfVxufVxuXG5jb25zdCBERUxUQV9NQVhfQUJTID0gNzAwXG5cbmV4cG9ydCBjb25zdCBjbGFtcEF4aXNEZWx0YSA9IDxUIGV4dGVuZHMgUGljazxOb3JtYWxpemVkV2hlZWwsICdheGlzRGVsdGEnPj4od2hlZWw6IFQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhKSA9PiBjbGFtcChkZWx0YSwgLURFTFRBX01BWF9BQlMsIERFTFRBX01BWF9BQlMpKSxcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5leHBvcnQgY29uc3QgQUNDX0ZBQ1RPUl9NSU4gPSAwLjZcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01BWCA9IDAuOTZcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19NRVJHRSA9IDJcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19BTkFMQVpFID0gNVxuIiwiaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0NvbmZpZyB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgZGVlcEZyZWV6ZSB9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY29uZmlnRGVmYXVsdHM6IFdoZWVsR2VzdHVyZXNDb25maWcgPSBkZWVwRnJlZXplKHtcbiAgcHJldmVudFdoZWVsQWN0aW9uOiB0cnVlLFxuICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbn0pXG4iLCIvKipcbiAqIHRoZSB0aW1lb3V0IGlzIGF1dG9tYXRpY2FsbHkgYWRqdXN0ZWQgZHVyaW5nIGEgZ2VzdHVyZVxuICogdGhlIGluaXRpYWwgdGltZW91dCBwZXJpb2QgaXMgcHJldHR5IGxvbmcsIHNvIGV2ZW4gb2xkIG1vdXNlcywgd2hpY2ggZW1pdCB3aGVlbCBldmVudHMgbGVzcyBvZnRlbiwgY2FuIHByb2R1Y2UgYSBjb250aW51b3VzIGdlc3R1cmVcbiAqL1xuaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0ludGVybmFsU3RhdGUgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJ1xuXG5jb25zdCBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQgPSA0MDBcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpOiBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgaXNTdGFydGVkOiBmYWxzZSxcbiAgICBpc1N0YXJ0UHVibGlzaGVkOiBmYWxzZSxcbiAgICBpc01vbWVudHVtOiBmYWxzZSxcbiAgICBzdGFydFRpbWU6IDAsXG4gICAgbGFzdEFic0RlbHRhOiBJbmZpbml0eSxcbiAgICBheGlzTW92ZW1lbnQ6IFswLCAwLCAwXSxcbiAgICBheGlzVmVsb2NpdHk6IFswLCAwLCAwXSxcbiAgICBhY2NlbGVyYXRpb25GYWN0b3JzOiBbXSxcbiAgICBzY3JvbGxQb2ludHM6IFtdLFxuICAgIHNjcm9sbFBvaW50c1RvTWVyZ2U6IFtdLFxuICAgIHdpbGxFbmRUaW1lb3V0OiBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQsXG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEJ1cyBmcm9tICcuLi9ldmVudHMvRXZlbnRCdXMnXG5pbXBvcnQgeyBXaGVlbFRhcmdldE9ic2VydmVyIH0gZnJvbSAnLi4vZXZlbnRzL1doZWVsVGFyZ2V0T2JzZXJ2ZXInXG5pbXBvcnQge1xuICBWZWN0b3JYWVosXG4gIFdoZWVsRXZlbnREYXRhLFxuICBXaGVlbEV2ZW50U3RhdGUsXG4gIFdoZWVsR2VzdHVyZXNDb25maWcsXG4gIFdoZWVsR2VzdHVyZXNFdmVudE1hcCxcbiAgV2hlZWxHZXN0dXJlc09wdGlvbnMsXG59IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgYWJzTWF4LCBhZGRWZWN0b3JzLCBhdmVyYWdlLCBkZWVwRnJlZXplLCBsYXN0T2YsIHByb2plY3Rpb24gfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGNsYW1wQXhpc0RlbHRhLCBub3JtYWxpemVXaGVlbCwgcmV2ZXJzZUF4aXNEZWx0YVNpZ24gfSBmcm9tICcuLi93aGVlbC1ub3JtYWxpemVyL3doZWVsLW5vcm1hbGl6ZXInXG5pbXBvcnQgeyBfX0RFVl9fLCBBQ0NfRkFDVE9SX01BWCwgQUNDX0ZBQ1RPUl9NSU4sIFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUsIFdIRUVMRVZFTlRTX1RPX01FUkdFIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0cyB9IGZyb20gJy4vb3B0aW9ucydcbmltcG9ydCB7IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSB9IGZyb20gJy4vc3RhdGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzKG9wdGlvbnNQYXJhbTogV2hlZWxHZXN0dXJlc09wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IG9uLCBvZmYsIGRpc3BhdGNoIH0gPSBFdmVudEJ1czxXaGVlbEdlc3R1cmVzRXZlbnRNYXA+KClcbiAgbGV0IGNvbmZpZyA9IGNvbmZpZ0RlZmF1bHRzXG4gIGxldCBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gIGxldCBjdXJyZW50RXZlbnQ6IFdoZWVsRXZlbnREYXRhXG4gIGxldCBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG4gIGxldCBwcmV2V2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgfCB1bmRlZmluZWRcblxuICBjb25zdCBmZWVkV2hlZWwgPSAod2hlZWxFdmVudHM6IFdoZWVsRXZlbnREYXRhIHwgV2hlZWxFdmVudERhdGFbXSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHdoZWVsRXZlbnRzKSkge1xuICAgICAgd2hlZWxFdmVudHMuZm9yRWFjaCgod2hlZWxFdmVudCkgPT4gcHJvY2Vzc1doZWVsRXZlbnREYXRhKHdoZWVsRXZlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlT3B0aW9ucyA9IChuZXdPcHRpb25zOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KTogV2hlZWxHZXN0dXJlc0NvbmZpZyA9PiB7XG4gICAgaWYgKE9iamVjdC52YWx1ZXMobmV3T3B0aW9ucykuc29tZSgob3B0aW9uKSA9PiBvcHRpb24gPT09IHVuZGVmaW5lZCB8fCBvcHRpb24gPT09IG51bGwpKSB7XG4gICAgICBfX0RFVl9fICYmIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZU9wdGlvbnMgaWdub3JlZCEgdW5kZWZpbmVkICYgbnVsbCBvcHRpb25zIG5vdCBhbGxvd2VkJylcbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG4gICAgcmV0dXJuIChjb25maWcgPSBkZWVwRnJlZXplKHsgLi4uY29uZmlnRGVmYXVsdHMsIC4uLmNvbmZpZywgLi4ubmV3T3B0aW9ucyB9KSlcbiAgfVxuXG4gIGNvbnN0IHB1Ymxpc2hXaGVlbCA9IChhZGRpdGlvbmFsRGF0YT86IFBhcnRpYWw8V2hlZWxFdmVudFN0YXRlPikgPT4ge1xuICAgIGNvbnN0IHdoZWVsRXZlbnRTdGF0ZTogV2hlZWxFdmVudFN0YXRlID0ge1xuICAgICAgZXZlbnQ6IGN1cnJlbnRFdmVudCxcbiAgICAgIGlzU3RhcnQ6IGZhbHNlLFxuICAgICAgaXNFbmRpbmc6IGZhbHNlLFxuICAgICAgaXNNb21lbnR1bUNhbmNlbDogZmFsc2UsXG4gICAgICBpc01vbWVudHVtOiBzdGF0ZS5pc01vbWVudHVtLFxuICAgICAgYXhpc0RlbHRhOiBbMCwgMCwgMF0sXG4gICAgICBheGlzVmVsb2NpdHk6IHN0YXRlLmF4aXNWZWxvY2l0eSxcbiAgICAgIGF4aXNNb3ZlbWVudDogc3RhdGUuYXhpc01vdmVtZW50LFxuICAgICAgZ2V0IGF4aXNNb3ZlbWVudFByb2plY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRWZWN0b3JzKFxuICAgICAgICAgIHdoZWVsRXZlbnRTdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNWZWxvY2l0eS5tYXAoKHZlbG9jaXR5KSA9PiBwcm9qZWN0aW9uKHZlbG9jaXR5KSkgYXMgVmVjdG9yWFlaXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICAuLi5hZGRpdGlvbmFsRGF0YSxcbiAgICB9XG5cbiAgICBkaXNwYXRjaCgnd2hlZWwnLCB7XG4gICAgICAuLi53aGVlbEV2ZW50U3RhdGUsXG4gICAgICBwcmV2aW91czogcHJldldoZWVsRXZlbnRTdGF0ZSxcbiAgICB9KVxuXG4gICAgLy8ga2VlcCByZWZlcmVuY2Ugd2l0aG91dCBwcmV2aW91cywgb3RoZXJ3aXNlIHdlIHdvdWxkIGNyZWF0ZSBhIGxvbmcgY2hhaW5cbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gd2hlZWxFdmVudFN0YXRlXG4gIH1cblxuICAvLyBzaG91bGQgcHJldmVudCB3aGVuIHRoZXJlIGlzIG1haW5seSBtb3ZlbWVudCBvbiB0aGUgZGVzaXJlZCBheGlzXG4gIGNvbnN0IHNob3VsZFByZXZlbnREZWZhdWx0ID0gKGRlbHRhTWF4QWJzOiBudW1iZXIsIGF4aXNEZWx0YTogVmVjdG9yWFlaKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBwcmV2ZW50V2hlZWxBY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IFtkZWx0YVgsIGRlbHRhWSwgZGVsdGFaXSA9IGF4aXNEZWx0YVxuXG4gICAgaWYgKHR5cGVvZiBwcmV2ZW50V2hlZWxBY3Rpb24gPT09ICdib29sZWFuJykgcmV0dXJuIHByZXZlbnRXaGVlbEFjdGlvblxuXG4gICAgc3dpdGNoIChwcmV2ZW50V2hlZWxBY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3gnOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFYKSA+PSBkZWx0YU1heEFic1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVkpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWikgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBwcmV2ZW50V2hlZWxBY3Rpb24gdmFsdWU6ICcgKyBwcmV2ZW50V2hlZWxBY3Rpb24sICd3YXJuJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvY2Vzc1doZWVsRXZlbnREYXRhID0gKHdoZWVsRXZlbnQ6IFdoZWVsRXZlbnREYXRhKSA9PiB7XG4gICAgY29uc3QgeyBheGlzRGVsdGEsIHRpbWVTdGFtcCB9ID0gY2xhbXBBeGlzRGVsdGEoXG4gICAgICByZXZlcnNlQXhpc0RlbHRhU2lnbihub3JtYWxpemVXaGVlbCh3aGVlbEV2ZW50KSwgY29uZmlnLnJldmVyc2VTaWduKVxuICAgIClcbiAgICBjb25zdCBkZWx0YU1heEFicyA9IGFic01heChheGlzRGVsdGEpXG5cbiAgICBpZiAod2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCAmJiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YU1heEFicywgYXhpc0RlbHRhKSkge1xuICAgICAgd2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZS5pc1N0YXJ0ZWQpIHtcbiAgICAgIHN0YXJ0KClcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdXNlciBzdGFydGVkIHNjcm9sbGluZyBhZ2FpbiAtPiBjYW5jZWxcbiAgICBlbHNlIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGRlbHRhTWF4QWJzID4gTWF0aC5tYXgoMiwgc3RhdGUubGFzdEFic0RlbHRhICogMikpIHtcbiAgICAgIGVuZCh0cnVlKVxuICAgICAgc3RhcnQoKVxuICAgIH1cblxuICAgIC8vIHNwZWNpYWwgZmluZ2VyIHVwIGV2ZW50IG9uIHdpbmRvd3MgKyBibGlua1xuICAgIGlmIChkZWx0YU1heEFicyA9PT0gMCAmJiBPYmplY3QuaXMgJiYgT2JqZWN0LmlzKHdoZWVsRXZlbnQuZGVsdGFYLCAtMCkpIHtcbiAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gdHJ1ZVxuICAgICAgLy8gcmV0dXJuIC0+IHplcm8gZGVsdGEgZXZlbnQgc2hvdWxkIG5vdCBpbmZsdWVuY2UgdmVsb2NpdHlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGN1cnJlbnRFdmVudCA9IHdoZWVsRXZlbnRcbiAgICBzdGF0ZS5heGlzTW92ZW1lbnQgPSBhZGRWZWN0b3JzKHN0YXRlLmF4aXNNb3ZlbWVudCwgYXhpc0RlbHRhKVxuICAgIHN0YXRlLmxhc3RBYnNEZWx0YSA9IGRlbHRhTWF4QWJzXG4gICAgc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5wdXNoKHtcbiAgICAgIGF4aXNEZWx0YSxcbiAgICAgIHRpbWVTdGFtcCxcbiAgICB9KVxuXG4gICAgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkoKVxuXG4gICAgLy8gb25seSB3aGVlbCBldmVudCAobW92ZSkgYW5kIG5vdCBzdGFydC9lbmQgZ2V0IHRoZSBkZWx0YSB2YWx1ZXNcbiAgICBwdWJsaXNoV2hlZWwoeyBheGlzRGVsdGEsIGlzU3RhcnQ6ICFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkIH0pIC8vIHN0YXRlLmlzTW9tZW50dW0gPyBNT01FTlRVTV9XSEVFTCA6IFdIRUVMLCB7IGF4aXNEZWx0YSB9KVxuXG4gICAgLy8gcHVibGlzaCBzdGFydCBhZnRlciB2ZWxvY2l0eSBldGMuIGhhdmUgYmVlbiB1cGRhdGVkXG4gICAgc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCA9IHRydWVcblxuICAgIC8vIGNhbGMgZGVib3VuY2VkIGVuZCBmdW5jdGlvbiwgdG8gcmVjb2duaXplIGVuZCBvZiB3aGVlbCBldmVudCBzdHJlYW1cbiAgICB3aWxsRW5kKClcbiAgfVxuXG4gIGNvbnN0IG1lcmdlU2Nyb2xsUG9pbnRzQ2FsY1ZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIGlmIChzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9PT0gV0hFRUxFVkVOVFNfVE9fTUVSR0UpIHtcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy51bnNoaWZ0KHtcbiAgICAgICAgYXhpc0RlbHRhU3VtOiBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLm1hcCgoYikgPT4gYi5heGlzRGVsdGEpLnJlZHVjZShhZGRWZWN0b3JzKSxcbiAgICAgICAgdGltZVN0YW1wOiBhdmVyYWdlKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLnRpbWVTdGFtcCkpLFxuICAgICAgfSlcblxuICAgICAgLy8gb25seSB1cGRhdGUgdmVsb2NpdHkgYWZ0ZXIgYSBtZXJnZWQgc2Nyb2xscG9pbnQgd2FzIGdlbmVyYXRlZFxuICAgICAgdXBkYXRlVmVsb2NpdHkoKVxuXG4gICAgICAvLyByZXNldCB0b01lcmdlIGFycmF5XG4gICAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9IDBcblxuICAgICAgLy8gYWZ0ZXIgY2FsY3VsYXRpb24gb2YgdmVsb2NpdHkgb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBtZXJnZWQgc2Nyb2xsUG9pbnRcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy5sZW5ndGggPSAxXG5cbiAgICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgICBkZXRlY3RNb21lbnR1bSgpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCkge1xuICAgICAgdXBkYXRlU3RhcnRWZWxvY2l0eSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlU3RhcnRWZWxvY2l0eSA9ICgpID0+IHtcbiAgICBzdGF0ZS5heGlzVmVsb2NpdHkgPSBsYXN0T2Yoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZSkuYXhpc0RlbHRhLm1hcCgoZCkgPT4gZCAvIHN0YXRlLndpbGxFbmRUaW1lb3V0KSBhcyBWZWN0b3JYWVpcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIC8vIG5lZWQgdG8gaGF2ZSB0d28gcmVjZW50IHBvaW50cyB0byBjYWxjIHZlbG9jaXR5XG4gICAgY29uc3QgW2xhdGVzdFNjcm9sbFBvaW50LCBwcmV2U2Nyb2xsUG9pbnRdID0gc3RhdGUuc2Nyb2xsUG9pbnRzXG5cbiAgICBpZiAoIXByZXZTY3JvbGxQb2ludCB8fCAhbGF0ZXN0U2Nyb2xsUG9pbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHRpbWUgZGVsdGFcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBsYXRlc3RTY3JvbGxQb2ludC50aW1lU3RhbXAgLSBwcmV2U2Nyb2xsUG9pbnQudGltZVN0YW1wXG5cbiAgICBpZiAoZGVsdGFUaW1lIDw9IDApIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCdpbnZhbGlkIGRlbHRhVGltZScpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjYWxjIHRoZSB2ZWxvY2l0eSBwZXIgYXhlc1xuICAgIGNvbnN0IHZlbG9jaXR5ID0gbGF0ZXN0U2Nyb2xsUG9pbnQuYXhpc0RlbHRhU3VtLm1hcCgoZCkgPT4gZCAvIGRlbHRhVGltZSkgYXMgVmVjdG9yWFlaXG5cbiAgICAvLyBjYWxjIHRoZSBhY2NlbGVyYXRpb24gZmFjdG9yIHBlciBheGlzXG4gICAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9yID0gdmVsb2NpdHkubWFwKCh2LCBpKSA9PiB2IC8gKHN0YXRlLmF4aXNWZWxvY2l0eVtpXSB8fCAxKSlcblxuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IHZlbG9jaXR5XG4gICAgc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5wdXNoKGFjY2VsZXJhdGlvbkZhY3RvcilcblxuICAgIHVwZGF0ZVdpbGxFbmRUaW1lb3V0KGRlbHRhVGltZSlcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVdpbGxFbmRUaW1lb3V0ID0gKGRlbHRhVGltZTogbnVtYmVyKSA9PiB7XG4gICAgLy8gdXNlIGN1cnJlbnQgdGltZSBiZXR3ZWVuIGV2ZW50cyByb3VuZGVkIHVwIGFuZCBpbmNyZWFzZWQgYnkgYSBiaXQgYXMgdGltZW91dFxuICAgIGxldCBuZXdUaW1lb3V0ID0gTWF0aC5jZWlsKGRlbHRhVGltZSAvIDEwKSAqIDEwICogMS4yXG5cbiAgICAvLyBkb3VibGUgdGhlIHRpbWVvdXQsIHdoZW4gbW9tZW50dW0gd2FzIG5vdCBkZXRlY3RlZCB5ZXRcbiAgICBpZiAoIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgIG5ld1RpbWVvdXQgPSBNYXRoLm1heCgxMDAsIG5ld1RpbWVvdXQgKiAyKVxuICAgIH1cblxuICAgIHN0YXRlLndpbGxFbmRUaW1lb3V0ID0gTWF0aC5taW4oMTAwMCwgTWF0aC5yb3VuZChuZXdUaW1lb3V0KSlcbiAgfVxuXG4gIGNvbnN0IGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSA9IChhY2NGYWN0b3I6IG51bWJlcikgPT4ge1xuICAgIC8vIHdoZW4gbWFpbiBheGlzIGlzIHRoZSB0aGUgb3RoZXIgb25lIGFuZCB0aGVyZSBpcyBubyBtb3ZlbWVudC9jaGFuZ2Ugb24gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKGFjY0ZhY3RvciA9PT0gMCkgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gYWNjRmFjdG9yIDw9IEFDQ19GQUNUT1JfTUFYICYmIGFjY0ZhY3RvciA+PSBBQ0NfRkFDVE9SX01JTlxuICB9XG5cbiAgY29uc3QgZGV0ZWN0TW9tZW50dW0gPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMubGVuZ3RoID49IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUpIHtcbiAgICAgIGlmIChuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCkge1xuICAgICAgICBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgaWYgKGFic01heChzdGF0ZS5heGlzVmVsb2NpdHkpID49IDAuMikge1xuICAgICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9ycyA9IHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMuc2xpY2UoV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSAqIC0xKVxuXG4gICAgICAvLyBjaGVjayByZWNlbnQgYWNjZWxlcmF0aW9uIC8gZGVjZWxlcmF0aW9uIGZhY3RvcnNcbiAgICAgIC8vIGFsbCByZWNlbnQgbmVlZCB0byBtYXRjaCwgaWYgYW55IGRpZCBub3QgbWF0Y2hcbiAgICAgIGNvbnN0IGRldGVjdGVkTW9tZW50dW0gPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzLmV2ZXJ5KChhY2NGYWMpID0+IHtcbiAgICAgICAgLy8gd2hlbiBib3RoIGF4aXMgZGVjZWxlcmF0ZSBleGFjdGx5IGluIHRoZSBzYW1lIHJhdGUgaXQgaXMgdmVyeSBsaWtlbHkgY2F1c2VkIGJ5IG1vbWVudHVtXG4gICAgICAgIGNvbnN0IHNhbWVBY2NGYWMgPSAhIWFjY0ZhYy5yZWR1Y2UoKGYxLCBmMikgPT4gKGYxICYmIGYxIDwgMSAmJiBmMSA9PT0gZjIgPyAxIDogMCkpXG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYWNjZWxlcmF0aW9uIGZhY3RvciBpcyB3aXRoaW4gbW9tZW50dW0gcmFuZ2VcbiAgICAgICAgY29uc3QgYm90aEFyZUluUmFuZ2VPclplcm8gPSBhY2NGYWMuZmlsdGVyKGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSkubGVuZ3RoID09PSBhY2NGYWMubGVuZ3RoXG5cbiAgICAgICAgLy8gb25lIHRoZSByZXF1aXJlbWVudHMgbXVzdCBiZSBmdWxmaWxsZWRcbiAgICAgICAgcmV0dXJuIHNhbWVBY2NGYWMgfHwgYm90aEFyZUluUmFuZ2VPclplcm9cbiAgICAgIH0pXG5cbiAgICAgIGlmIChkZXRlY3RlZE1vbWVudHVtKSB7XG4gICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZXZlbnRzXG4gICAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzID0gcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9yc1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY29nbml6ZWRNb21lbnR1bSA9ICgpID0+IHtcbiAgICBzdGF0ZS5pc01vbWVudHVtID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgc3RhdGUgPSBjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUoKVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IHRydWVcbiAgICBzdGF0ZS5zdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgcHJldldoZWVsRXZlbnRTdGF0ZSA9IHVuZGVmaW5lZFxuICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHdpbGxFbmQgPSAoKCkgPT4ge1xuICAgIGxldCB3aWxsRW5kSWQ6IG51bWJlclxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQod2lsbEVuZElkKVxuICAgICAgd2lsbEVuZElkID0gc2V0VGltZW91dChlbmQsIHN0YXRlLndpbGxFbmRUaW1lb3V0KVxuICAgIH1cbiAgfSkoKVxuXG4gIGNvbnN0IGVuZCA9IChpc01vbWVudHVtQ2FuY2VsID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkgcmV0dXJuXG5cbiAgICBpZiAoc3RhdGUuaXNNb21lbnR1bSAmJiBpc01vbWVudHVtQ2FuY2VsKSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSwgaXNNb21lbnR1bUNhbmNlbDogdHJ1ZSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSB9KVxuICAgIH1cblxuICAgIHN0YXRlLmlzTW9tZW50dW0gPSBmYWxzZVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IGZhbHNlXG4gIH1cblxuICBjb25zdCB7IG9ic2VydmUsIHVub2JzZXJ2ZSwgZGlzY29ubmVjdCB9ID0gV2hlZWxUYXJnZXRPYnNlcnZlcihmZWVkV2hlZWwpXG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zUGFyYW0pXG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICAgIGZlZWRXaGVlbCxcbiAgICB1cGRhdGVPcHRpb25zLFxuICB9KVxufVxuIiwiZXhwb3J0IGNvbnN0IGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMgPSAoZW1ibGFBcGlNYWluLCBlbWJsYUFwaVRodW1iKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzVGh1bWJzID0gZW1ibGFBcGlUaHVtYi5zbGlkZU5vZGVzKClcblxuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzbGlkZXNUaHVtYnMubWFwKFxuICAgICAgICAoXywgaW5kZXgpID0+ICgpID0+IGVtYmxhQXBpTWFpbi5zY3JvbGxUbyhpbmRleClcbiAgICApXG5cbiAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICBzbGlkZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzbGlkZU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlID0gKGVtYmxhQXBpTWFpbiwgZW1ibGFBcGlUaHVtYikgPT4ge1xuICAgIGNvbnN0IHNsaWRlc1RodW1icyA9IGVtYmxhQXBpVGh1bWIuc2xpZGVOb2RlcygpXG5cbiAgICBjb25zdCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgZW1ibGFBcGlUaHVtYi5zY3JvbGxUbyhlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKCkpXG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gZW1ibGFBcGlNYWluLnByZXZpb3VzU2Nyb2xsU25hcCgpXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZW1ibGFBcGlNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gICAgICAgIHNsaWRlc1RodW1ic1twcmV2aW91c10uY2xhc3NMaXN0LnJlbW92ZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnKVxuICAgICAgICBzbGlkZXNUaHVtYnNbc2VsZWN0ZWRdLmNsYXNzTGlzdC5hZGQoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJylcbiAgICB9XG5cbiAgICBlbWJsYUFwaU1haW4ub24oJ3NlbGVjdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKVxuICAgIGVtYmxhQXBpVGh1bWIub24oJ2luaXQnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZW1ibGFBcGlNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gICAgICAgIHNsaWRlc1RodW1ic1tzZWxlY3RlZF0uY2xhc3NMaXN0LnJlbW92ZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMgPSAoZW1ibGFBcGksIHByZXZCdG4sIG5leHRCdG4pID0+IHtcbiAgICBjb25zdCBzY3JvbGxQcmV2ID0gKCkgPT4ge1xuICAgICAgICBlbWJsYUFwaS5zY3JvbGxQcmV2KClcbiAgICB9XG4gICAgY29uc3Qgc2Nyb2xsTmV4dCA9ICgpID0+IHtcbiAgICAgICAgZW1ibGFBcGkuc2Nyb2xsTmV4dCgpXG4gICAgfVxuICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxQcmV2LCBmYWxzZSlcbiAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTmV4dCwgZmFsc2UpXG5cbiAgICBjb25zdCByZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUgPSBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoXG4gICAgICAgIGVtYmxhQXBpLFxuICAgICAgICBwcmV2QnRuLFxuICAgICAgICBuZXh0QnRuXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcmVtb3ZlVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlKClcbiAgICAgICAgcHJldkJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFByZXYsIGZhbHNlKVxuICAgICAgICBuZXh0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTmV4dCwgZmFsc2UpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoZW1ibGFBcGksIHByZXZCdG4sIG5leHRCdG4pIHtcbiAgICBsZXQgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChlbWJsYUFwaS5jYW5TY3JvbGxQcmV2KCkpIHtcbiAgICAgICAgICAgIHByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbE5leHQoKSkge1xuICAgICAgICAgICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbWJsYUFwaVxuICAgICAgICAub24oJ3NlbGVjdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKVxuICAgICAgICAub24oJ2luaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdyZUluaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgICAgIG5leHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBjbGFtcE51bWJlcihudW1iZXI6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bWJlciwgbWluKSwgbWF4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IG51bWJlciB8IG51bGwpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpXG59XG4iLCJpbXBvcnQgeyBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IGlzTnVtYmVyLCBjbGFtcE51bWJlciB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQge1xuICBDcmVhdGVQbHVnaW5UeXBlLFxuICBFbWJsYUNhcm91c2VsVHlwZSxcbiAgU2Nyb2xsQm9keVR5cGVcbn0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5cbmRlY2xhcmUgbW9kdWxlICdlbWJsYS1jYXJvdXNlbCcge1xuICBpbnRlcmZhY2UgRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgZmFkZTogRmFkZVR5cGVcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBGYWRlVHlwZSA9IENyZWF0ZVBsdWdpblR5cGU8e30sIE9wdGlvbnNUeXBlPlxuXG5leHBvcnQgdHlwZSBGYWRlT3B0aW9uc1R5cGUgPSBGYWRlVHlwZVsnb3B0aW9ucyddXG5cbmZ1bmN0aW9uIEZhZGUodXNlck9wdGlvbnM6IEZhZGVPcHRpb25zVHlwZSA9IHt9KTogRmFkZVR5cGUge1xuICBjb25zdCBmdWxsT3BhY2l0eSA9IDFcbiAgY29uc3Qgbm9PcGFjaXR5ID0gMFxuICBjb25zdCBmYWRlRnJpY3Rpb24gPSAwLjY4XG4gIGNvbnN0IHRpbWVTdGVwID0gMTAwMCAvIDYwXG5cbiAgbGV0IGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZVxuICBsZXQgb3BhY2l0aWVzOiBudW1iZXJbXSA9IFtdXG4gIGxldCBmYWRlVG9OZXh0RGlzdGFuY2U6IG51bWJlclxuICBsZXQgZGlzdGFuY2VGcm9tUG9pbnRlckRvd24gPSAwXG4gIGxldCBmYWRlVmVsb2NpdHkgPSAwXG4gIGxldCBwcm9ncmVzcyA9IDBcbiAgbGV0IHNob3VsZEZhZGVQYWlyID0gZmFsc2VcblxuICBsZXQgZGVmYXVsdFNldHRsZWRCZWhhdmlvdXI6IFNjcm9sbEJvZHlUeXBlWydzZXR0bGVkJ11cbiAgbGV0IGRlZmF1bHRQcm9ncmVzc0JlaGF2aW91cjogRW1ibGFDYXJvdXNlbFR5cGVbJ3Njcm9sbFByb2dyZXNzJ11cblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpSW5zdGFuY2U6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgZW1ibGFBcGkgPSBlbWJsYUFwaUluc3RhbmNlXG5cbiAgICBjb25zdCBzZWxlY3RlZFNuYXAgPSBlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgIGNvbnN0IHsgc2Nyb2xsQm9keSwgY29udGFpbmVyUmVjdCwgYXhpcyB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IGNvbnRhaW5lclNpemUgPSBheGlzLm1lYXN1cmVTaXplKGNvbnRhaW5lclJlY3QpXG5cbiAgICBmYWRlVG9OZXh0RGlzdGFuY2UgPSBjbGFtcE51bWJlcihjb250YWluZXJTaXplICogMC43NSwgMjAwLCA1MDApXG4gICAgc2hvdWxkRmFkZVBhaXIgPSBmYWxzZVxuXG4gICAgb3BhY2l0aWVzID0gZW1ibGFBcGlcbiAgICAgIC5zY3JvbGxTbmFwTGlzdCgpXG4gICAgICAubWFwKChfLCBpbmRleCkgPT4gKGluZGV4ID09PSBzZWxlY3RlZFNuYXAgPyBmdWxsT3BhY2l0eSA6IG5vT3BhY2l0eSkpXG5cbiAgICBkZWZhdWx0U2V0dGxlZEJlaGF2aW91ciA9IHNjcm9sbEJvZHkuc2V0dGxlZFxuICAgIGRlZmF1bHRQcm9ncmVzc0JlaGF2aW91ciA9IGVtYmxhQXBpLnNjcm9sbFByb2dyZXNzXG5cbiAgICBzY3JvbGxCb2R5LnNldHRsZWQgPSBzZXR0bGVkXG4gICAgZW1ibGFBcGkuc2Nyb2xsUHJvZ3Jlc3MgPSBzY3JvbGxQcm9ncmVzc1xuXG4gICAgZW1ibGFBcGlcbiAgICAgIC5vbignc2VsZWN0Jywgc2VsZWN0KVxuICAgICAgLm9uKCdzbGlkZUZvY3VzJywgZmFkZVRvU2VsZWN0ZWRTbmFwSW5zdGFudGx5KVxuICAgICAgLm9uKCdwb2ludGVyRG93bicsIHBvaW50ZXJEb3duKVxuICAgICAgLm9uKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG5cbiAgICBkaXNhYmxlU2Nyb2xsKClcbiAgICBmYWRlVG9TZWxlY3RlZFNuYXBJbnN0YW50bHkoKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNjcm9sbEJvZHkgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBzY3JvbGxCb2R5LnNldHRsZWQgPSBkZWZhdWx0U2V0dGxlZEJlaGF2aW91clxuICAgIGVtYmxhQXBpLnNjcm9sbFByb2dyZXNzID0gZGVmYXVsdFByb2dyZXNzQmVoYXZpb3VyXG5cbiAgICBlbWJsYUFwaVxuICAgICAgLm9mZignc2VsZWN0Jywgc2VsZWN0KVxuICAgICAgLm9mZignc2xpZGVGb2N1cycsIGZhZGVUb1NlbGVjdGVkU25hcEluc3RhbnRseSlcbiAgICAgIC5vZmYoJ3BvaW50ZXJEb3duJywgcG9pbnRlckRvd24pXG4gICAgICAub2ZmKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG5cbiAgICBlbWJsYUFwaS5zbGlkZU5vZGVzKCkuZm9yRWFjaCgoc2xpZGVOb2RlKSA9PiB7XG4gICAgICBjb25zdCBzbGlkZVN0eWxlID0gc2xpZGVOb2RlLnN0eWxlXG4gICAgICBzbGlkZVN0eWxlLm9wYWNpdHkgPSAnJ1xuICAgICAgc2xpZGVTdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgICAgc2xpZGVTdHlsZS5wb2ludGVyRXZlbnRzID0gJydcbiAgICAgIGlmICghc2xpZGVOb2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkgc2xpZGVOb2RlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBmYWRlVG9TZWxlY3RlZFNuYXBJbnN0YW50bHkoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0ZWRTbmFwID0gZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICBzZXRPcGFjaXRpZXMoc2VsZWN0ZWRTbmFwLCBmdWxsT3BhY2l0eSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJVcCgpOiB2b2lkIHtcbiAgICBzaG91bGRGYWRlUGFpciA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyRG93bigpOiB2b2lkIHtcbiAgICBzaG91bGRGYWRlUGFpciA9IGZhbHNlXG4gICAgZGlzdGFuY2VGcm9tUG9pbnRlckRvd24gPSAwXG4gICAgZmFkZVZlbG9jaXR5ID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0KCk6IHZvaWQge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKS5zY3JvbGxCb2R5LmR1cmF0aW9uKClcbiAgICBmYWRlVmVsb2NpdHkgPSBkdXJhdGlvbiA/IDAgOiBmdWxsT3BhY2l0eVxuICAgIHNob3VsZEZhZGVQYWlyID0gdHJ1ZVxuICAgIGlmICghZHVyYXRpb24pIGZhZGVUb1NlbGVjdGVkU25hcEluc3RhbnRseSgpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZVRyYW5zZm9ybShwb3NpdGlvbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IGF4aXMgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0cmFuc2xhdGVBeGlzID0gYXhpcy5zY3JvbGwudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGVBeGlzfSgke2F4aXMuZGlyZWN0aW9uKHBvc2l0aW9uKX1weClgXG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlLCBzbGlkZUxvb3BlciB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuXG4gICAgdHJhbnNsYXRlLmNsZWFyKClcbiAgICB0cmFuc2xhdGUudG9nZ2xlQWN0aXZlKGZhbHNlKVxuXG4gICAgc2xpZGVMb29wZXIubG9vcFBvaW50cy5mb3JFYWNoKCh7IHRyYW5zbGF0ZSB9KSA9PiB7XG4gICAgICB0cmFuc2xhdGUuY2xlYXIoKVxuICAgICAgdHJhbnNsYXRlLnRvZ2dsZUFjdGl2ZShmYWxzZSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gbG9ja0V4Y2Vzc2l2ZVNjcm9sbChmYWRlSW5kZXg6IG51bWJlciB8IG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNjcm9sbFNuYXBzLCBsb2NhdGlvbiwgdGFyZ2V0IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgaWYgKCFpc051bWJlcihmYWRlSW5kZXgpIHx8IG9wYWNpdGllc1tmYWRlSW5kZXhdIDwgMC41KSByZXR1cm5cblxuICAgIGxvY2F0aW9uLnNldChzY3JvbGxTbmFwc1tmYWRlSW5kZXhdKVxuICAgIHRhcmdldC5zZXQobG9jYXRpb24pXG4gIH1cblxuICBmdW5jdGlvbiBzZXRPcGFjaXRpZXMoZmFkZUluZGV4OiBudW1iZXIsIHZlbG9jaXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JvbGxTbmFwcyA9IGVtYmxhQXBpLnNjcm9sbFNuYXBMaXN0KClcblxuICAgIHNjcm9sbFNuYXBzLmZvckVhY2goKF8sIGluZGV4QSkgPT4ge1xuICAgICAgY29uc3QgYWJzVmVsb2NpdHkgPSBNYXRoLmFicyh2ZWxvY2l0eSlcbiAgICAgIGNvbnN0IGN1cnJlbnRPcGFjaXR5ID0gb3BhY2l0aWVzW2luZGV4QV1cbiAgICAgIGNvbnN0IGlzRmFkZUluZGV4ID0gaW5kZXhBID09PSBmYWRlSW5kZXhcblxuICAgICAgY29uc3QgbmV4dE9wYWNpdHkgPSBpc0ZhZGVJbmRleFxuICAgICAgICA/IGN1cnJlbnRPcGFjaXR5ICsgYWJzVmVsb2NpdHlcbiAgICAgICAgOiBjdXJyZW50T3BhY2l0eSAtIGFic1ZlbG9jaXR5XG5cbiAgICAgIGNvbnN0IGNsYW1wZWRPcGFjaXR5ID0gY2xhbXBOdW1iZXIobmV4dE9wYWNpdHksIG5vT3BhY2l0eSwgZnVsbE9wYWNpdHkpXG4gICAgICBvcGFjaXRpZXNbaW5kZXhBXSA9IGNsYW1wZWRPcGFjaXR5XG5cbiAgICAgIGNvbnN0IGZhZGVQYWlyID0gaXNGYWRlSW5kZXggJiYgc2hvdWxkRmFkZVBhaXJcbiAgICAgIGNvbnN0IGluZGV4QiA9IGVtYmxhQXBpLnByZXZpb3VzU2Nyb2xsU25hcCgpXG5cbiAgICAgIGlmIChmYWRlUGFpcikgb3BhY2l0aWVzW2luZGV4Ql0gPSAxIC0gY2xhbXBlZE9wYWNpdHlcbiAgICAgIGlmIChpc0ZhZGVJbmRleCkgc2V0UHJvZ3Jlc3MoZmFkZUluZGV4LCBjbGFtcGVkT3BhY2l0eSlcblxuICAgICAgc2V0T3BhY2l0eShpbmRleEEpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9wYWNpdHkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHNsaWRlc0luU25hcCA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKCkuc2xpZGVSZWdpc3RyeVtpbmRleF1cbiAgICBjb25zdCB7IHNjcm9sbFNuYXBzLCBjb250YWluZXJSZWN0IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3Qgb3BhY2l0eSA9IG9wYWNpdGllc1tpbmRleF1cblxuICAgIHNsaWRlc0luU25hcC5mb3JFYWNoKChzbGlkZUluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzbGlkZVN0eWxlID0gZW1ibGFBcGkuc2xpZGVOb2RlcygpW3NsaWRlSW5kZXhdLnN0eWxlXG4gICAgICBjb25zdCByb3VuZGVkT3BhY2l0eSA9IHBhcnNlRmxvYXQob3BhY2l0eS50b0ZpeGVkKDIpKVxuICAgICAgY29uc3QgaGFzT3BhY2l0eSA9IHJvdW5kZWRPcGFjaXR5ID4gbm9PcGFjaXR5XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGhhc09wYWNpdHkgPyBzY3JvbGxTbmFwc1tpbmRleF0gOiBjb250YWluZXJSZWN0LndpZHRoICsgMlxuICAgICAgY29uc3QgdHJhbnNmb3JtID0gZ2V0U2xpZGVUcmFuc2Zvcm0ocG9zaXRpb24pXG5cbiAgICAgIGlmIChoYXNPcGFjaXR5KSBzbGlkZVN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuXG4gICAgICBzbGlkZVN0eWxlLm9wYWNpdHkgPSByb3VuZGVkT3BhY2l0eS50b1N0cmluZygpXG4gICAgICBzbGlkZVN0eWxlLnBvaW50ZXJFdmVudHMgPSBvcGFjaXR5ID4gMC41ID8gJ2F1dG8nIDogJ25vbmUnXG5cbiAgICAgIGlmICghaGFzT3BhY2l0eSkgc2xpZGVTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UHJvZ3Jlc3MoZmFkZUluZGV4OiBudW1iZXIsIG9wYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5kZXgsIGRyYWdIYW5kbGVyLCBzY3JvbGxTbmFwcyB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IHBvaW50ZXJEb3duID0gZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKVxuICAgIGNvbnN0IHNuYXBGcmFjdGlvbiA9IDEgLyAoc2Nyb2xsU25hcHMubGVuZ3RoIC0gMSlcblxuICAgIGxldCBpbmRleEEgPSBmYWRlSW5kZXhcbiAgICBsZXQgaW5kZXhCID0gcG9pbnRlckRvd25cbiAgICAgID8gZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICAgIDogZW1ibGFBcGkucHJldmlvdXNTY3JvbGxTbmFwKClcblxuICAgIGlmIChwb2ludGVyRG93biAmJiBpbmRleEEgPT09IGluZGV4Qikge1xuICAgICAgY29uc3QgcmV2ZXJzZVNpZ24gPSBNYXRoLnNpZ24oZGlzdGFuY2VGcm9tUG9pbnRlckRvd24pICogLTFcbiAgICAgIGluZGV4QSA9IGluZGV4QlxuICAgICAgaW5kZXhCID0gaW5kZXguY2xvbmUoKS5zZXQoaW5kZXhCKS5hZGQocmV2ZXJzZVNpZ24pLmdldCgpXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gaW5kZXhCICogc25hcEZyYWN0aW9uXG4gICAgY29uc3QgZGlmZlBvc2l0aW9uID0gKGluZGV4QSAtIGluZGV4QikgKiBzbmFwRnJhY3Rpb25cbiAgICBwcm9ncmVzcyA9IGN1cnJlbnRQb3NpdGlvbiArIGRpZmZQb3NpdGlvbiAqIG9wYWNpdHlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZhZGVJbmRleCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCB7IGRyYWdIYW5kbGVyLCBpbmRleCwgc2Nyb2xsQm9keSB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IHNlbGVjdGVkU25hcCA9IGVtYmxhQXBpLnNlbGVjdGVkU2Nyb2xsU25hcCgpXG5cbiAgICBpZiAoIWRyYWdIYW5kbGVyLnBvaW50ZXJEb3duKCkpIHJldHVybiBzZWxlY3RlZFNuYXBcblxuICAgIGNvbnN0IGRpcmVjdGlvblNpZ24gPSBNYXRoLnNpZ24oc2Nyb2xsQm9keS52ZWxvY2l0eSgpKVxuICAgIGNvbnN0IGRpc3RhbmNlU2lnbiA9IE1hdGguc2lnbihkaXN0YW5jZUZyb21Qb2ludGVyRG93bilcbiAgICBjb25zdCBuZXh0U25hcCA9IGluZGV4XG4gICAgICAuY2xvbmUoKVxuICAgICAgLnNldChzZWxlY3RlZFNuYXApXG4gICAgICAuYWRkKGRpcmVjdGlvblNpZ24gKiAtMSlcbiAgICAgIC5nZXQoKVxuXG4gICAgaWYgKCFkaXJlY3Rpb25TaWduIHx8ICFkaXN0YW5jZVNpZ24pIHJldHVybiBudWxsXG4gICAgcmV0dXJuIGRpc3RhbmNlU2lnbiA9PT0gZGlyZWN0aW9uU2lnbiA/IG5leHRTbmFwIDogc2VsZWN0ZWRTbmFwXG4gIH1cblxuICBmdW5jdGlvbiBmYWRlKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IHsgZHJhZ0hhbmRsZXIsIHNjcm9sbEJvZHkgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBmaXhlZERlbHRhVGltZVNlY29uZHMgPSB0aW1lU3RlcCAvIDEwMDBcbiAgICBjb25zdCBwb2ludGVyRG93biA9IGRyYWdIYW5kbGVyLnBvaW50ZXJEb3duKClcbiAgICBjb25zdCB2ZWxvY2l0eSA9IHNjcm9sbEJvZHkudmVsb2NpdHkoKSAqIGZpeGVkRGVsdGFUaW1lU2Vjb25kc1xuICAgIGNvbnN0IGR1cmF0aW9uID0gc2Nyb2xsQm9keS5kdXJhdGlvbigpXG4gICAgY29uc3QgZmFkZUluZGV4ID0gZ2V0RmFkZUluZGV4KClcbiAgICBjb25zdCBub0ZhZGVJbmRleCA9ICFpc051bWJlcihmYWRlSW5kZXgpXG5cbiAgICBpZiAocG9pbnRlckRvd24pIHtcbiAgICAgIGlmICghdmVsb2NpdHkpIHJldHVyblxuXG4gICAgICBkaXN0YW5jZUZyb21Qb2ludGVyRG93biArPSB2ZWxvY2l0eVxuICAgICAgZmFkZVZlbG9jaXR5ID0gTWF0aC5hYnModmVsb2NpdHkgLyBmYWRlVG9OZXh0RGlzdGFuY2UpXG4gICAgICBsb2NrRXhjZXNzaXZlU2Nyb2xsKGZhZGVJbmRleClcbiAgICB9XG5cbiAgICBpZiAoIXBvaW50ZXJEb3duKSB7XG4gICAgICBpZiAoIWR1cmF0aW9uIHx8IG5vRmFkZUluZGV4KSByZXR1cm5cblxuICAgICAgZmFkZVZlbG9jaXR5ICs9IChmdWxsT3BhY2l0eSAtIG9wYWNpdGllc1tmYWRlSW5kZXhdKSAvIGR1cmF0aW9uXG4gICAgICBmYWRlVmVsb2NpdHkgKj0gZmFkZUZyaWN0aW9uXG4gICAgfVxuXG4gICAgaWYgKG5vRmFkZUluZGV4KSByZXR1cm5cbiAgICBzZXRPcGFjaXRpZXMoZmFkZUluZGV4LCBmYWRlVmVsb2NpdHkpXG4gIH1cblxuICBmdW5jdGlvbiBzZXR0bGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgdGFyZ2V0LCBsb2NhdGlvbiB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IGRpZmZUb1RhcmdldCA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgY29uc3Qgbm90UmVhY2hlZFRhcmdldCA9IE1hdGguYWJzKGRpZmZUb1RhcmdldCkgPj0gMVxuICAgIGNvbnN0IGZhZGVJbmRleCA9IGdldEZhZGVJbmRleCgpXG4gICAgY29uc3Qgbm9GYWRlSW5kZXggPSAhaXNOdW1iZXIoZmFkZUluZGV4KVxuXG4gICAgZmFkZShlbWJsYUFwaSlcblxuICAgIGlmIChub0ZhZGVJbmRleCB8fCBub3RSZWFjaGVkVGFyZ2V0KSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gb3BhY2l0aWVzW2ZhZGVJbmRleF0gPiAwLjk5OVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcHJvZ3Jlc3NcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEZhZGVUeXBlID0ge1xuICAgIG5hbWU6ICdmYWRlJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBGYWRlIHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEZhZGVPcHRpb25zVHlwZSB8IHVuZGVmaW5lZFxufVxuXG5GYWRlLmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWRcblxuZXhwb3J0IGRlZmF1bHQgRmFkZVxuIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRPcHRpb25UeXBlID1cbiAgfCAnc3RhcnQnXG4gIHwgJ2NlbnRlcidcbiAgfCAnZW5kJ1xuICB8ICgodmlld1NpemU6IG51bWJlciwgc25hcFNpemU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyKVxuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFsaWdubWVudChcbiAgYWxpZ246IEFsaWdubWVudE9wdGlvblR5cGUsXG4gIHZpZXdTaXplOiBudW1iZXJcbik6IEFsaWdubWVudFR5cGUge1xuICBjb25zdCBwcmVkZWZpbmVkID0geyBzdGFydCwgY2VudGVyLCBlbmQgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmQobikgLyAyXG4gIH1cblxuICBmdW5jdGlvbiBlbmQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmlld1NpemUgLSBuXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlciwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGlzU3RyaW5nKGFsaWduKSkgcmV0dXJuIHByZWRlZmluZWRbYWxpZ25dKG4pXG4gICAgcmV0dXJuIGFsaWduKHZpZXdTaXplLCBuLCBpbmRleClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFsaWdubWVudFR5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJ0eXBlIEV2ZW50TmFtZVR5cGUgPSBrZXlvZiBEb2N1bWVudEV2ZW50TWFwIHwga2V5b2YgV2luZG93RXZlbnRNYXBcbnR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IChldnQ6IGFueSkgPT4gdm9pZFxudHlwZSBFdmVudE9wdGlvbnNUeXBlID0gYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zIHwgdW5kZWZpbmVkXG50eXBlIEV2ZW50UmVtb3ZlclR5cGUgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIEV2ZW50U3RvcmVUeXBlID0ge1xuICBhZGQ6IChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9ucz86IEV2ZW50T3B0aW9uc1R5cGVcbiAgKSA9PiBFdmVudFN0b3JlVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRTdG9yZSgpOiBFdmVudFN0b3JlVHlwZSB7XG4gIGxldCBsaXN0ZW5lcnM6IEV2ZW50UmVtb3ZlclR5cGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkKFxuICAgIG5vZGU6IEV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IEV2ZW50TmFtZVR5cGUsXG4gICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgICBvcHRpb25zOiBFdmVudE9wdGlvbnNUeXBlID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgKTogRXZlbnRTdG9yZVR5cGUge1xuICAgIGxldCByZW1vdmVMaXN0ZW5lcjogRXZlbnRSZW1vdmVyVHlwZVxuXG4gICAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBub2RlKSB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucylcbiAgICAgIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlZ2FjeU1lZGlhUXVlcnlMaXN0ID0gPE1lZGlhUXVlcnlMaXN0Pm5vZGVcbiAgICAgIGxlZ2FjeU1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKGhhbmRsZXIpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IGxlZ2FjeU1lZGlhUXVlcnlMaXN0LnJlbW92ZUxpc3RlbmVyKGhhbmRsZXIpXG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnB1c2gocmVtb3ZlTGlzdGVuZXIpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoKHJlbW92ZSkgPT4gcmVtb3ZlKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudFN0b3JlVHlwZSA9IHtcbiAgICBhZGQsXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lVHlwZSB9IGZyb20gJy4vRW5naW5lJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVXBkYXRlVHlwZSA9IChcbiAgZW5naW5lOiBFbmdpbmVUeXBlLFxuICB0aW1lU3RlcDogbnVtYmVyXG4pID0+IHZvaWRcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKFxuICBlbmdpbmU6IEVuZ2luZVR5cGUsXG4gIGxhZ09mZnNldDogbnVtYmVyXG4pID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1R5cGUgPSB7XG4gIGluaXQ6ICgpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBzdGFydDogKCkgPT4gdm9pZFxuICBzdG9wOiAoKSA9PiB2b2lkXG4gIHVwZGF0ZTogKCkgPT4gdm9pZFxuICByZW5kZXI6IChsYWdPZmZzZXQ6IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQW5pbWF0aW9ucyhcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICB1cGRhdGU6ICh0aW1lU3RlcDogbnVtYmVyKSA9PiB2b2lkLFxuICByZW5kZXI6IChsYWdPZmZzZXQ6IG51bWJlcikgPT4gdm9pZFxuKTogQW5pbWF0aW9uc1R5cGUge1xuICBjb25zdCBkb2N1bWVudFZpc2libGVIYW5kbGVyID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IHRpbWVTdGVwID0gMTAwMCAvIDYwXG4gIGxldCBsYXN0VGltZVN0YW1wOiBudW1iZXIgfCBudWxsID0gbnVsbFxuICBsZXQgbGFnID0gMFxuICBsZXQgYW5pbWF0aW9uRnJhbWUgPSAwXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmFkZChvd25lckRvY3VtZW50LCAndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcbiAgICAgIGlmIChvd25lckRvY3VtZW50LmhpZGRlbikgcmVzZXQoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIHN0b3AoKVxuICAgIGRvY3VtZW50VmlzaWJsZUhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSh0aW1lU3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApOiB2b2lkIHtcbiAgICBpZiAoIWFuaW1hdGlvbkZyYW1lKSByZXR1cm5cbiAgICBpZiAoIWxhc3RUaW1lU3RhbXApIGxhc3RUaW1lU3RhbXAgPSB0aW1lU3RhbXBcblxuICAgIGNvbnN0IGVsYXBzZWQgPSB0aW1lU3RhbXAgLSBsYXN0VGltZVN0YW1wXG4gICAgbGFzdFRpbWVTdGFtcCA9IHRpbWVTdGFtcFxuICAgIGxhZyArPSBlbGFwc2VkXG5cbiAgICB3aGlsZSAobGFnID49IHRpbWVTdGVwKSB7XG4gICAgICB1cGRhdGUodGltZVN0ZXApXG4gICAgICBsYWcgLT0gdGltZVN0ZXBcbiAgICB9XG5cbiAgICBjb25zdCBsYWdPZmZzZXQgPSBsYWcgLyB0aW1lU3RlcFxuICAgIHJlbmRlcihsYWdPZmZzZXQpXG5cbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoKTogdm9pZCB7XG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSByZXR1cm5cblxuICAgIGFuaW1hdGlvbkZyYW1lID0gb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCk6IHZvaWQge1xuICAgIG93bmVyV2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKVxuICAgIGxhc3RUaW1lU3RhbXAgPSBudWxsXG4gICAgbGFnID0gMFxuICAgIGFuaW1hdGlvbkZyYW1lID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKTogdm9pZCB7XG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBsYWcgPSAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbmltYXRpb25zVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgc3RhcnQsXG4gICAgc3RvcCxcbiAgICB1cGRhdGU6ICgpID0+IHVwZGF0ZSh0aW1lU3RlcCksXG4gICAgcmVuZGVyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuXG5leHBvcnQgdHlwZSBBeGlzT3B0aW9uVHlwZSA9ICd4JyB8ICd5J1xuZXhwb3J0IHR5cGUgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUgPSAnbHRyJyB8ICdydGwnXG50eXBlIEF4aXNFZGdlVHlwZSA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnXG5cbmV4cG9ydCB0eXBlIEF4aXNUeXBlID0ge1xuICBzY3JvbGw6IEF4aXNPcHRpb25UeXBlXG4gIGNyb3NzOiBBeGlzT3B0aW9uVHlwZVxuICBzdGFydEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBlbmRFZGdlOiBBeGlzRWRnZVR5cGVcbiAgbWVhc3VyZVNpemU6IChub2RlUmVjdDogTm9kZVJlY3RUeXBlKSA9PiBudW1iZXJcbiAgZGlyZWN0aW9uOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF4aXMoXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlLFxuICBjb250ZW50RGlyZWN0aW9uOiBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZVxuKTogQXhpc1R5cGUge1xuICBjb25zdCBpc1JpZ2h0VG9MZWZ0ID0gY29udGVudERpcmVjdGlvbiA9PT0gJ3J0bCdcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGF4aXMgPT09ICd5J1xuICBjb25zdCBzY3JvbGwgPSBpc1ZlcnRpY2FsID8gJ3knIDogJ3gnXG4gIGNvbnN0IGNyb3NzID0gaXNWZXJ0aWNhbCA/ICd4JyA6ICd5J1xuICBjb25zdCBzaWduID0gIWlzVmVydGljYWwgJiYgaXNSaWdodFRvTGVmdCA/IC0xIDogMVxuICBjb25zdCBzdGFydEVkZ2UgPSBnZXRTdGFydEVkZ2UoKVxuICBjb25zdCBlbmRFZGdlID0gZ2V0RW5kRWRnZSgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemUobm9kZVJlY3Q6IE5vZGVSZWN0VHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBub2RlUmVjdFxuICAgIHJldHVybiBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXJ0RWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ3RvcCdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZEVkZ2UoKTogQXhpc0VkZ2VUeXBlIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkgcmV0dXJuICdib3R0b20nXG4gICAgcmV0dXJuIGlzUmlnaHRUb0xlZnQgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cblxuICBmdW5jdGlvbiBkaXJlY3Rpb24objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbiAqIHNpZ25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF4aXNUeXBlID0ge1xuICAgIHNjcm9sbCxcbiAgICBjcm9zcyxcbiAgICBzdGFydEVkZ2UsXG4gICAgZW5kRWRnZSxcbiAgICBtZWFzdXJlU2l6ZSxcbiAgICBkaXJlY3Rpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIExpbWl0VHlwZSA9IHtcbiAgbWluOiBudW1iZXJcbiAgbWF4OiBudW1iZXJcbiAgbGVuZ3RoOiBudW1iZXJcbiAgY29uc3RyYWluOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbiAgcmVhY2hlZEFueTogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZWFjaGVkTWF4OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNaW46IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVtb3ZlT2Zmc2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbWl0KG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAwKTogTGltaXRUeXBlIHtcbiAgY29uc3QgbGVuZ3RoID0gbWF0aEFicyhtaW4gLSBtYXgpXG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1pbihuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA8IG1pblxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1heChuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA+IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZEFueShuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSB8fCByZWFjaGVkTWF4KG4pXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIXJlYWNoZWRBbnkobikpIHJldHVybiBuXG4gICAgcmV0dXJuIHJlYWNoZWRNaW4obikgPyBtaW4gOiBtYXhcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9mZnNldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghbGVuZ3RoKSByZXR1cm4gblxuICAgIHJldHVybiBuIC0gbGVuZ3RoICogTWF0aC5jZWlsKChuIC0gbWF4KSAvIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IExpbWl0VHlwZSA9IHtcbiAgICBsZW5ndGgsXG4gICAgbWF4LFxuICAgIG1pbixcbiAgICBjb25zdHJhaW4sXG4gICAgcmVhY2hlZEFueSxcbiAgICByZWFjaGVkTWF4LFxuICAgIHJlYWNoZWRNaW4sXG4gICAgcmVtb3ZlT2Zmc2V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0IH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBDb3VudGVyVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogbnVtYmVyKSA9PiBDb3VudGVyVHlwZVxuICBhZGQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGNsb25lOiAoKSA9PiBDb3VudGVyVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ291bnRlcihcbiAgbWF4OiBudW1iZXIsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGxvb3A6IGJvb2xlYW5cbik6IENvdW50ZXJUeXBlIHtcbiAgY29uc3QgeyBjb25zdHJhaW4gfSA9IExpbWl0KDAsIG1heClcbiAgY29uc3QgbG9vcEVuZCA9IG1heCArIDFcbiAgbGV0IGNvdW50ZXIgPSB3aXRoaW5MaW1pdChzdGFydClcblxuICBmdW5jdGlvbiB3aXRoaW5MaW1pdChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAhbG9vcCA/IGNvbnN0cmFpbihuKSA6IG1hdGhBYnMoKGxvb3BFbmQgKyBuKSAlIGxvb3BFbmQpXG4gIH1cblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY291bnRlclxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICBjb3VudGVyID0gd2l0aGluTGltaXQobilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICByZXR1cm4gY2xvbmUoKS5zZXQoZ2V0KCkgKyBuKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmUoKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBDb3VudGVyKG1heCwgZ2V0KCksIGxvb3ApXG4gIH1cblxuICBjb25zdCBzZWxmOiBDb3VudGVyVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBjbG9uZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlclR5cGUsIFBvaW50ZXJFdmVudFR5cGUgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHtcbiAgZGVsdGFBYnMsXG4gIGZhY3RvckFicyxcbiAgaXNCb29sZWFuLFxuICBpc01vdXNlRXZlbnQsXG4gIG1hdGhBYnMsXG4gIG1hdGhTaWduLFxuICBXaW5kb3dUeXBlXG59IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRHJhZ0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBQb2ludGVyRXZlbnRUeXBlXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBEcmFnSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBwb2ludGVyRG93bjogKCkgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ0hhbmRsZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICByb290Tm9kZTogSFRNTEVsZW1lbnQsXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGRyYWdUcmFja2VyOiBEcmFnVHJhY2tlclR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIGluZGV4OiBDb3VudGVyVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZSxcbiAgZHJhZ0ZyZWU6IGJvb2xlYW4sXG4gIGRyYWdUaHJlc2hvbGQ6IG51bWJlcixcbiAgc2tpcFNuYXBzOiBib29sZWFuLFxuICBiYXNlRnJpY3Rpb246IG51bWJlcixcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbik6IERyYWdIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IHsgY3Jvc3M6IGNyb3NzQXhpcywgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGZvY3VzTm9kZXMgPSBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddXG4gIGNvbnN0IG5vblBhc3NpdmVFdmVudCA9IHsgcGFzc2l2ZTogZmFsc2UgfVxuICBjb25zdCBpbml0RXZlbnRzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGRyYWdFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZ29Ub05leHRUaHJlc2hvbGQgPSBMaW1pdCg1MCwgMjI1KS5jb25zdHJhaW4ocGVyY2VudE9mVmlldy5tZWFzdXJlKDIwKSlcbiAgY29uc3Qgc25hcEZvcmNlQm9vc3QgPSB7IG1vdXNlOiAzMDAsIHRvdWNoOiA0MDAgfVxuICBjb25zdCBmcmVlRm9yY2VCb29zdCA9IHsgbW91c2U6IDUwMCwgdG91Y2g6IDYwMCB9XG4gIGNvbnN0IGJhc2VTcGVlZCA9IGRyYWdGcmVlID8gNDMgOiAyNVxuXG4gIGxldCBpc01vdmluZyA9IGZhbHNlXG4gIGxldCBzdGFydFNjcm9sbCA9IDBcbiAgbGV0IHN0YXJ0Q3Jvc3MgPSAwXG4gIGxldCBwb2ludGVySXNEb3duID0gZmFsc2VcbiAgbGV0IHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICBsZXQgcHJldmVudENsaWNrID0gZmFsc2VcbiAgbGV0IGlzTW91c2UgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaERyYWcpIHJldHVyblxuXG4gICAgZnVuY3Rpb24gZG93bklmQWxsb3dlZChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hEcmFnKSB8fCB3YXRjaERyYWcoZW1ibGFBcGksIGV2dCkpIGRvd24oZXZ0KVxuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZVxuICAgIGluaXRFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ2RyYWdzdGFydCcsIChldnQpID0+IGV2dC5wcmV2ZW50RGVmYXVsdCgpLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCAoKSA9PiB1bmRlZmluZWQsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgKCkgPT4gdW5kZWZpbmVkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hzdGFydCcsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZWRvd24nLCBkb3duSWZBbGxvd2VkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hjYW5jZWwnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NvbnRleHRtZW51JywgdXApXG4gICAgICAuYWRkKG5vZGUsICdjbGljaycsIGNsaWNrLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpbml0RXZlbnRzLmNsZWFyKClcbiAgICBkcmFnRXZlbnRzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERyYWdFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IGlzTW91c2UgPyBvd25lckRvY3VtZW50IDogcm9vdE5vZGVcbiAgICBkcmFnRXZlbnRzXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGVuZCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnbW91c2Vtb3ZlJywgbW92ZSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAnbW91c2V1cCcsIHVwKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNGb2N1c05vZGUobm9kZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZSB8fCAnJ1xuICAgIHJldHVybiBmb2N1c05vZGVzLmluY2x1ZGVzKG5vZGVOYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gZm9yY2VCb29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGJvb3N0ID0gZHJhZ0ZyZWUgPyBmcmVlRm9yY2VCb29zdCA6IHNuYXBGb3JjZUJvb3N0XG4gICAgY29uc3QgdHlwZSA9IGlzTW91c2UgPyAnbW91c2UnIDogJ3RvdWNoJ1xuICAgIHJldHVybiBib29zdFt0eXBlXVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dlZEZvcmNlKGZvcmNlOiBudW1iZXIsIHRhcmdldENoYW5nZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IG5leHQgPSBpbmRleC5hZGQobWF0aFNpZ24oZm9yY2UpICogLTEpXG4gICAgY29uc3QgYmFzZUZvcmNlID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSkuZGlzdGFuY2VcblxuICAgIGlmIChkcmFnRnJlZSB8fCBtYXRoQWJzKGZvcmNlKSA8IGdvVG9OZXh0VGhyZXNob2xkKSByZXR1cm4gYmFzZUZvcmNlXG4gICAgaWYgKHNraXBTbmFwcyAmJiB0YXJnZXRDaGFuZ2VkKSByZXR1cm4gYmFzZUZvcmNlICogMC41XG5cbiAgICByZXR1cm4gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgobmV4dC5nZXQoKSwgMCkuZGlzdGFuY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNNb3VzZUV2dCA9IGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KVxuICAgIGlzTW91c2UgPSBpc01vdXNlRXZ0XG4gICAgcHJldmVudENsaWNrID0gZHJhZ0ZyZWUgJiYgaXNNb3VzZUV2dCAmJiAhZXZ0LmJ1dHRvbnMgJiYgaXNNb3ZpbmdcbiAgICBpc01vdmluZyA9IGRlbHRhQWJzKHRhcmdldC5nZXQoKSwgbG9jYXRpb24uZ2V0KCkpID49IDJcblxuICAgIGlmIChpc01vdXNlRXZ0ICYmIGV2dC5idXR0b24gIT09IDApIHJldHVyblxuICAgIGlmIChpc0ZvY3VzTm9kZShldnQudGFyZ2V0IGFzIEVsZW1lbnQpKSByZXR1cm5cblxuICAgIHBvaW50ZXJJc0Rvd24gPSB0cnVlXG4gICAgZHJhZ1RyYWNrZXIucG9pbnRlckRvd24oZXZ0KVxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMCkudXNlRHVyYXRpb24oMClcbiAgICB0YXJnZXQuc2V0KGxvY2F0aW9uKVxuICAgIGFkZERyYWdFdmVudHMoKVxuICAgIHN0YXJ0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBzdGFydENyb3NzID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dCwgY3Jvc3NBeGlzKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb2ludGVyRG93bicpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzVG91Y2hFdnQgPSAhaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaWYgKGlzVG91Y2hFdnQgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDIpIHJldHVybiB1cChldnQpXG5cbiAgICBjb25zdCBsYXN0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBjb25zdCBsYXN0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgY29uc3QgZGlmZlNjcm9sbCA9IGRlbHRhQWJzKGxhc3RTY3JvbGwsIHN0YXJ0U2Nyb2xsKVxuICAgIGNvbnN0IGRpZmZDcm9zcyA9IGRlbHRhQWJzKGxhc3RDcm9zcywgc3RhcnRDcm9zcylcblxuICAgIGlmICghcHJldmVudFNjcm9sbCAmJiAhaXNNb3VzZSkge1xuICAgICAgaWYgKCFldnQuY2FuY2VsYWJsZSkgcmV0dXJuIHVwKGV2dClcbiAgICAgIHByZXZlbnRTY3JvbGwgPSBkaWZmU2Nyb2xsID4gZGlmZkNyb3NzXG4gICAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHJldHVybiB1cChldnQpXG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBkcmFnVHJhY2tlci5wb2ludGVyTW92ZShldnQpXG4gICAgaWYgKGRpZmZTY3JvbGwgPiBkcmFnVGhyZXNob2xkKSBwcmV2ZW50Q2xpY2sgPSB0cnVlXG5cbiAgICBzY3JvbGxCb2R5LnVzZUZyaWN0aW9uKDAuMykudXNlRHVyYXRpb24oMC43NSlcbiAgICBhbmltYXRpb24uc3RhcnQoKVxuICAgIHRhcmdldC5hZGQoZGlyZWN0aW9uKGRpZmYpKVxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TG9jYXRpb24gPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZSgwLCBmYWxzZSlcbiAgICBjb25zdCB0YXJnZXRDaGFuZ2VkID0gY3VycmVudExvY2F0aW9uLmluZGV4ICE9PSBpbmRleC5nZXQoKVxuICAgIGNvbnN0IHJhd0ZvcmNlID0gZHJhZ1RyYWNrZXIucG9pbnRlclVwKGV2dCkgKiBmb3JjZUJvb3N0KClcbiAgICBjb25zdCBmb3JjZSA9IGFsbG93ZWRGb3JjZShkaXJlY3Rpb24ocmF3Rm9yY2UpLCB0YXJnZXRDaGFuZ2VkKVxuICAgIGNvbnN0IGZvcmNlRmFjdG9yID0gZmFjdG9yQWJzKHJhd0ZvcmNlLCBmb3JjZSlcbiAgICBjb25zdCBzcGVlZCA9IGJhc2VTcGVlZCAtIDEwICogZm9yY2VGYWN0b3JcbiAgICBjb25zdCBmcmljdGlvbiA9IGJhc2VGcmljdGlvbiArIGZvcmNlRmFjdG9yIC8gNTBcblxuICAgIHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICAgIHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oc3BlZWQpLnVzZUZyaWN0aW9uKGZyaWN0aW9uKVxuICAgIHNjcm9sbFRvLmRpc3RhbmNlKGZvcmNlLCAhZHJhZ0ZyZWUpXG4gICAgaXNNb3VzZSA9IGZhbHNlXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJVcCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGljayhldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAocHJldmVudENsaWNrKSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb2ludGVySXNEb3duXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBvaW50ZXJEb3duXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNPcHRpb25UeXBlLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGlzTW91c2VFdmVudCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgUG9pbnRlckNvb3JkVHlwZSA9IGtleW9mIFRvdWNoIHwga2V5b2YgTW91c2VFdmVudFxuZXhwb3J0IHR5cGUgUG9pbnRlckV2ZW50VHlwZSA9IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50XG5cbmV4cG9ydCB0eXBlIERyYWdUcmFja2VyVHlwZSA9IHtcbiAgcG9pbnRlckRvd246IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICBwb2ludGVyTW92ZTogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJVcDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHJlYWRQb2ludDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdUcmFja2VyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IERyYWdUcmFja2VyVHlwZSB7XG4gIGNvbnN0IGxvZ0ludGVydmFsID0gMTcwXG5cbiAgbGV0IHN0YXJ0RXZlbnQ6IFBvaW50ZXJFdmVudFR5cGVcbiAgbGV0IGxhc3RFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuXG4gIGZ1bmN0aW9uIHJlYWRUaW1lKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGV2dC50aW1lU3RhbXBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRQb2ludChldnQ6IFBvaW50ZXJFdmVudFR5cGUsIGV2dEF4aXM/OiBBeGlzT3B0aW9uVHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBldnRBeGlzIHx8IGF4aXMuc2Nyb2xsXG4gICAgY29uc3QgY29vcmQ6IFBvaW50ZXJDb29yZFR5cGUgPSBgY2xpZW50JHtwcm9wZXJ0eSA9PT0gJ3gnID8gJ1gnIDogJ1knfWBcbiAgICByZXR1cm4gKGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KSA/IGV2dCA6IGV2dC50b3VjaGVzWzBdKVtjb29yZF1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgc3RhcnRFdmVudCA9IGV2dFxuICAgIGxhc3RFdmVudCA9IGV2dFxuICAgIHJldHVybiByZWFkUG9pbnQoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlck1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gcmVhZFBvaW50KGV2dCkgLSByZWFkUG9pbnQobGFzdEV2ZW50KVxuICAgIGNvbnN0IGV4cGlyZWQgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudCkgPiBsb2dJbnRlcnZhbFxuXG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgaWYgKGV4cGlyZWQpIHN0YXJ0RXZlbnQgPSBldnRcbiAgICByZXR1cm4gZGlmZlxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlclVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgaWYgKCFzdGFydEV2ZW50IHx8ICFsYXN0RXZlbnQpIHJldHVybiAwXG4gICAgY29uc3QgZGlmZkRyYWcgPSByZWFkUG9pbnQobGFzdEV2ZW50KSAtIHJlYWRQb2ludChzdGFydEV2ZW50KVxuICAgIGNvbnN0IGRpZmZUaW1lID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShsYXN0RXZlbnQpID4gbG9nSW50ZXJ2YWxcbiAgICBjb25zdCBmb3JjZSA9IGRpZmZEcmFnIC8gZGlmZlRpbWVcbiAgICBjb25zdCBpc0ZsaWNrID0gZGlmZlRpbWUgJiYgIWV4cGlyZWQgJiYgbWF0aEFicyhmb3JjZSkgPiAwLjFcblxuICAgIHJldHVybiBpc0ZsaWNrID8gZm9yY2UgOiAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnVHJhY2tlclR5cGUgPSB7XG4gICAgcG9pbnRlckRvd24sXG4gICAgcG9pbnRlck1vdmUsXG4gICAgcG9pbnRlclVwLFxuICAgIHJlYWRQb2ludFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJleHBvcnQgdHlwZSBOb2RlUmVjdFR5cGUgPSB7XG4gIHRvcDogbnVtYmVyXG4gIHJpZ2h0OiBudW1iZXJcbiAgYm90dG9tOiBudW1iZXJcbiAgbGVmdDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTm9kZVJlY3RzVHlwZSA9IHtcbiAgbWVhc3VyZTogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBOb2RlUmVjdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGVSZWN0cygpOiBOb2RlUmVjdHNUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShub2RlOiBIVE1MRWxlbWVudCk6IE5vZGVSZWN0VHlwZSB7XG4gICAgY29uc3QgeyBvZmZzZXRUb3AsIG9mZnNldExlZnQsIG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IG5vZGVcbiAgICBjb25zdCBvZmZzZXQ6IE5vZGVSZWN0VHlwZSA9IHtcbiAgICAgIHRvcDogb2Zmc2V0VG9wLFxuICAgICAgcmlnaHQ6IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCxcbiAgICAgIGJvdHRvbTogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxuICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgY29uc3Qgc2VsZjogTm9kZVJlY3RzVHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIFBlcmNlbnRPZlZpZXdUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnRPZlZpZXcodmlld1NpemU6IG51bWJlcik6IFBlcmNlbnRPZlZpZXdUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAqIChuIC8gMTAwKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgTm9kZVJlY3RzVHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgaXNCb29sZWFuLCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlc2l6ZUhhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgYXhpczogQXhpc1R5cGUsXG4gIHdhdGNoUmVzaXplOiBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSxcbiAgbm9kZVJlY3RzOiBOb2RlUmVjdHNUeXBlXG4pOiBSZXNpemVIYW5kbGVyVHlwZSB7XG4gIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXJcbiAgbGV0IGNvbnRhaW5lclNpemU6IG51bWJlclxuICBsZXQgc2xpZGVTaXplczogbnVtYmVyW10gPSBbXVxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiByZWFkU2l6ZShub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGF4aXMubWVhc3VyZVNpemUobm9kZVJlY3RzLm1lYXN1cmUobm9kZSkpXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hSZXNpemUpIHJldHVyblxuXG4gICAgY29udGFpbmVyU2l6ZSA9IHJlYWRTaXplKGNvbnRhaW5lcilcbiAgICBzbGlkZVNpemVzID0gc2xpZGVzLm1hcChyZWFkU2l6ZSlcblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBjb25zdCBpc0NvbnRhaW5lciA9IGVudHJ5LnRhcmdldCA9PT0gY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICBjb25zdCBsYXN0U2l6ZSA9IGlzQ29udGFpbmVyID8gY29udGFpbmVyU2l6ZSA6IHNsaWRlU2l6ZXNbc2xpZGVJbmRleF1cbiAgICAgICAgY29uc3QgbmV3U2l6ZSA9IHJlYWRTaXplKGlzQ29udGFpbmVyID8gY29udGFpbmVyIDogc2xpZGVzW3NsaWRlSW5kZXhdKVxuICAgICAgICBjb25zdCBkaWZmU2l6ZSA9IG1hdGhBYnMobmV3U2l6ZSAtIGxhc3RTaXplKVxuXG4gICAgICAgIGlmIChkaWZmU2l6ZSA+PSAwLjUpIHtcbiAgICAgICAgICBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgZW1ibGFBcGkucmVJbml0KClcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hSZXNpemUpIHx8IHdhdGNoUmVzaXplKGVtYmxhQXBpLCBlbnRyaWVzKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2soZW50cmllcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgb2JzZXJ2ZU5vZGVzID0gW2NvbnRhaW5lcl0uY29uY2F0KHNsaWRlcylcbiAgICBvYnNlcnZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShub2RlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBzZWxmOiBSZXNpemVIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aFNpZ24sIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQm9keVR5cGUgPSB7XG4gIGRpcmVjdGlvbjogKCkgPT4gbnVtYmVyXG4gIGR1cmF0aW9uOiAoKSA9PiBudW1iZXJcbiAgdmVsb2NpdHk6ICgpID0+IG51bWJlclxuICBzZWVrOiAodGltZVN0ZXA6IG51bWJlcikgPT4gU2Nyb2xsQm9keVR5cGVcbiAgc2V0dGxlZDogKCkgPT4gYm9vbGVhblxuICB1c2VCYXNlRnJpY3Rpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUJhc2VEdXJhdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRnJpY3Rpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUR1cmF0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm9keShcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgb2Zmc2V0TG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgcHJldmlvdXNMb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgYmFzZUR1cmF0aW9uOiBudW1iZXIsXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyXG4pOiBTY3JvbGxCb2R5VHlwZSB7XG4gIGxldCBib2R5VmVsb2NpdHkgPSAwXG4gIGxldCBzY3JvbGxEaXJlY3Rpb24gPSAwXG4gIGxldCBzY3JvbGxEdXJhdGlvbiA9IGJhc2VEdXJhdGlvblxuICBsZXQgc2Nyb2xsRnJpY3Rpb24gPSBiYXNlRnJpY3Rpb25cbiAgbGV0IHJhd0xvY2F0aW9uID0gbG9jYXRpb24uZ2V0KClcbiAgbGV0IHJhd0xvY2F0aW9uUHJldmlvdXMgPSAwXG5cbiAgZnVuY3Rpb24gc2Vlayh0aW1lU3RlcDogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIGNvbnN0IGZpeGVkRGVsdGFUaW1lU2Vjb25kcyA9IHRpbWVTdGVwIC8gMTAwMFxuICAgIGNvbnN0IGR1cmF0aW9uID0gc2Nyb2xsRHVyYXRpb24gKiBmaXhlZERlbHRhVGltZVNlY29uZHNcbiAgICBjb25zdCBkaWZmID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBpc0luc3RhbnQgPSAhc2Nyb2xsRHVyYXRpb25cbiAgICBsZXQgZGlyZWN0aW9uRGlmZiA9IDBcblxuICAgIGlmIChpc0luc3RhbnQpIHtcbiAgICAgIGJvZHlWZWxvY2l0eSA9IDBcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KHRhcmdldClcbiAgICAgIGxvY2F0aW9uLnNldCh0YXJnZXQpXG5cbiAgICAgIGRpcmVjdGlvbkRpZmYgPSBkaWZmXG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KGxvY2F0aW9uKVxuXG4gICAgICBib2R5VmVsb2NpdHkgKz0gZGlmZiAvIGR1cmF0aW9uXG4gICAgICBib2R5VmVsb2NpdHkgKj0gc2Nyb2xsRnJpY3Rpb25cbiAgICAgIHJhd0xvY2F0aW9uICs9IGJvZHlWZWxvY2l0eVxuICAgICAgbG9jYXRpb24uYWRkKGJvZHlWZWxvY2l0eSAqIGZpeGVkRGVsdGFUaW1lU2Vjb25kcylcblxuICAgICAgZGlyZWN0aW9uRGlmZiA9IHJhd0xvY2F0aW9uIC0gcmF3TG9jYXRpb25QcmV2aW91c1xuICAgIH1cblxuICAgIHNjcm9sbERpcmVjdGlvbiA9IG1hdGhTaWduKGRpcmVjdGlvbkRpZmYpXG4gICAgcmF3TG9jYXRpb25QcmV2aW91cyA9IHJhd0xvY2F0aW9uXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHRsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZiA9IHRhcmdldC5nZXQoKSAtIG9mZnNldExvY2F0aW9uLmdldCgpXG4gICAgcmV0dXJuIG1hdGhBYnMoZGlmZikgPCAwLjAwMVxuICB9XG5cbiAgZnVuY3Rpb24gZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsRHVyYXRpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEaXJlY3Rpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGJvZHlWZWxvY2l0eVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlQmFzZUR1cmF0aW9uKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICByZXR1cm4gdXNlRHVyYXRpb24oYmFzZUR1cmF0aW9uKVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlQmFzZUZyaWN0aW9uKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICByZXR1cm4gdXNlRnJpY3Rpb24oYmFzZUZyaWN0aW9uKVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlRHVyYXRpb24objogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHNjcm9sbER1cmF0aW9uID0gblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiB1c2VGcmljdGlvbihuOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgc2Nyb2xsRnJpY3Rpb24gPSBuXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbEJvZHlUeXBlID0ge1xuICAgIGRpcmVjdGlvbixcbiAgICBkdXJhdGlvbixcbiAgICB2ZWxvY2l0eSxcbiAgICBzZWVrLFxuICAgIHNldHRsZWQsXG4gICAgdXNlQmFzZUZyaWN0aW9uLFxuICAgIHVzZUJhc2VEdXJhdGlvbixcbiAgICB1c2VGcmljdGlvbixcbiAgICB1c2VEdXJhdGlvblxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbEJvdW5kc1R5cGUgPSB7XG4gIHNob3VsZENvbnN0cmFpbjogKCkgPT4gYm9vbGVhblxuICBjb25zdHJhaW46IChwb2ludGVyRG93bjogYm9vbGVhbikgPT4gdm9pZFxuICB0b2dnbGVBY3RpdmU6IChhY3RpdmU6IGJvb2xlYW4pID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbEJvdW5kcyhcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuKTogU2Nyb2xsQm91bmRzVHlwZSB7XG4gIGNvbnN0IHB1bGxCYWNrVGhyZXNob2xkID0gcGVyY2VudE9mVmlldy5tZWFzdXJlKDEwKVxuICBjb25zdCBlZGdlT2Zmc2V0VG9sZXJhbmNlID0gcGVyY2VudE9mVmlldy5tZWFzdXJlKDUwKVxuICBjb25zdCBmcmljdGlvbkxpbWl0ID0gTGltaXQoMC4xLCAwLjk5KVxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHNob3VsZENvbnN0cmFpbigpOiBib29sZWFuIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybiBmYWxzZVxuICAgIGlmICghbGltaXQucmVhY2hlZEFueSh0YXJnZXQuZ2V0KCkpKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWxpbWl0LnJlYWNoZWRBbnkobG9jYXRpb24uZ2V0KCkpKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RyYWluKHBvaW50ZXJEb3duOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRDb25zdHJhaW4oKSkgcmV0dXJuXG4gICAgY29uc3QgZWRnZSA9IGxpbWl0LnJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpID8gJ21pbicgOiAnbWF4J1xuICAgIGNvbnN0IGRpZmZUb0VkZ2UgPSBtYXRoQWJzKGxpbWl0W2VkZ2VdIC0gbG9jYXRpb24uZ2V0KCkpXG4gICAgY29uc3QgZGlmZlRvVGFyZ2V0ID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBmcmljdGlvbiA9IGZyaWN0aW9uTGltaXQuY29uc3RyYWluKGRpZmZUb0VkZ2UgLyBlZGdlT2Zmc2V0VG9sZXJhbmNlKVxuXG4gICAgdGFyZ2V0LnN1YnRyYWN0KGRpZmZUb1RhcmdldCAqIGZyaWN0aW9uKVxuXG4gICAgaWYgKCFwb2ludGVyRG93biAmJiBtYXRoQWJzKGRpZmZUb1RhcmdldCkgPCBwdWxsQmFja1RocmVzaG9sZCkge1xuICAgICAgdGFyZ2V0LnNldChsaW1pdC5jb25zdHJhaW4odGFyZ2V0LmdldCgpKSlcbiAgICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oMjUpLnVzZUJhc2VGcmljdGlvbigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQm91bmRzVHlwZSA9IHtcbiAgICBzaG91bGRDb25zdHJhaW4sXG4gICAgY29uc3RyYWluLFxuICAgIHRvZ2dsZUFjdGl2ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IGFycmF5SXNMYXN0SW5kZXgsIGFycmF5TGFzdCwgZGVsdGFBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxDb250YWluT3B0aW9uVHlwZSA9IGZhbHNlIHwgJ3RyaW1TbmFwcycgfCAna2VlcFNuYXBzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgc25hcHNDb250YWluZWQ6IG51bWJlcltdXG4gIHNjcm9sbENvbnRhaW5MaW1pdDogTGltaXRUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxDb250YWluKFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdLFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZSxcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2Nyb2xsQ29udGFpblR5cGUge1xuICBjb25zdCBzY3JvbGxCb3VuZHMgPSBMaW1pdCgtY29udGVudFNpemUgKyB2aWV3U2l6ZSwgMClcbiAgY29uc3Qgc25hcHNCb3VuZGVkID0gbWVhc3VyZUJvdW5kZWQoKVxuICBjb25zdCBzY3JvbGxDb250YWluTGltaXQgPSBmaW5kU2Nyb2xsQ29udGFpbkxpbWl0KClcbiAgY29uc3Qgc25hcHNDb250YWluZWQgPSBtZWFzdXJlQ29udGFpbmVkKClcblxuICBmdW5jdGlvbiB1c2VQaXhlbFRvbGVyYW5jZShib3VuZDogbnVtYmVyLCBzbmFwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGVsdGFBYnMoYm91bmQsIHNuYXApIDwgMVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpOiBMaW1pdFR5cGUge1xuICAgIGNvbnN0IHN0YXJ0U25hcCA9IHNuYXBzQm91bmRlZFswXVxuICAgIGNvbnN0IGVuZFNuYXAgPSBhcnJheUxhc3Qoc25hcHNCb3VuZGVkKVxuICAgIGNvbnN0IG1pbiA9IHNuYXBzQm91bmRlZC5sYXN0SW5kZXhPZihzdGFydFNuYXApXG4gICAgY29uc3QgbWF4ID0gc25hcHNCb3VuZGVkLmluZGV4T2YoZW5kU25hcCkgKyAxXG4gICAgcmV0dXJuIExpbWl0KG1pbiwgbWF4KVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUJvdW5kZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbmFwc0FsaWduZWRcbiAgICAgIC5tYXAoKHNuYXBBbGlnbmVkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxCb3VuZHNcbiAgICAgICAgY29uc3Qgc25hcCA9IHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oc25hcEFsaWduZWQpXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChzbmFwc0FsaWduZWQsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIG1heFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtaW4sIHNuYXApKSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtYXgsIHNuYXApKSByZXR1cm4gbWF4XG4gICAgICAgIHJldHVybiBzbmFwXG4gICAgICB9KVxuICAgICAgLm1hcCgoc2Nyb2xsQm91bmQpID0+IHBhcnNlRmxvYXQoc2Nyb2xsQm91bmQudG9GaXhlZCgzKSkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQ29udGFpbmVkKCk6IG51bWJlcltdIHtcbiAgICBpZiAoY29udGVudFNpemUgPD0gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgcmV0dXJuIFtzY3JvbGxCb3VuZHMubWF4XVxuICAgIGlmIChjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJykgcmV0dXJuIHNuYXBzQm91bmRlZFxuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbENvbnRhaW5MaW1pdFxuICAgIHJldHVybiBzbmFwc0JvdW5kZWQuc2xpY2UobWluLCBtYXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgICBzbmFwc0NvbnRhaW5lZCxcbiAgICBzY3JvbGxDb250YWluTGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUxhc3QgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gIGxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExpbWl0KFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvb3A6IGJvb2xlYW5cbik6IFNjcm9sbExpbWl0VHlwZSB7XG4gIGNvbnN0IG1heCA9IHNjcm9sbFNuYXBzWzBdXG4gIGNvbnN0IG1pbiA9IGxvb3AgPyBtYXggLSBjb250ZW50U2l6ZSA6IGFycmF5TGFzdChzY3JvbGxTbmFwcylcbiAgY29uc3QgbGltaXQgPSBMaW1pdChtaW4sIG1heClcblxuICBjb25zdCBzZWxmOiBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gICAgbGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMb29wZXJUeXBlID0ge1xuICBsb29wOiAoZGlyZWN0aW9uOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExvb3BlcihcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdmVjdG9yczogVmVjdG9yMURUeXBlW11cbik6IFNjcm9sbExvb3BlclR5cGUge1xuICBjb25zdCBqb2ludFNhZmV0eSA9IDAuMVxuICBjb25zdCBtaW4gPSBsaW1pdC5taW4gKyBqb2ludFNhZmV0eVxuICBjb25zdCBtYXggPSBsaW1pdC5tYXggKyBqb2ludFNhZmV0eVxuICBjb25zdCB7IHJlYWNoZWRNaW4sIHJlYWNoZWRNYXggfSA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGZ1bmN0aW9uIHNob3VsZExvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAxKSByZXR1cm4gcmVhY2hlZE1heChsb2NhdGlvbi5nZXQoKSlcbiAgICBpZiAoZGlyZWN0aW9uID09PSAtMSkgcmV0dXJuIHJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRMb29wKGRpcmVjdGlvbikpIHJldHVyblxuXG4gICAgY29uc3QgbG9vcERpc3RhbmNlID0gY29udGVudFNpemUgKiAoZGlyZWN0aW9uICogLTEpXG4gICAgdmVjdG9ycy5mb3JFYWNoKCh2KSA9PiB2LmFkZChsb29wRGlzdGFuY2UpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsTG9vcGVyVHlwZSA9IHtcbiAgICBsb29wXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgZ2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKGxpbWl0OiBMaW1pdFR5cGUpOiBTY3JvbGxQcm9ncmVzc1R5cGUge1xuICBjb25zdCB7IG1heCwgbGVuZ3RoIH0gPSBsaW1pdFxuXG4gIGZ1bmN0aW9uIGdldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IG4gLSBtYXhcbiAgICByZXR1cm4gbGVuZ3RoID8gY3VycmVudExvY2F0aW9uIC8gLWxlbmd0aCA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgICBnZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50VHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gIHNuYXBzOiBudW1iZXJbXVxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxTbmFwcyhcbiAgYXhpczogQXhpc1R5cGUsXG4gIGFsaWdubWVudDogQWxpZ25tZW50VHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuKTogU2Nyb2xsU25hcHNUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgYWxpZ25tZW50cyA9IG1lYXN1cmVTaXplcygpLm1hcChhbGlnbm1lbnQubWVhc3VyZSlcbiAgY29uc3Qgc25hcHMgPSBtZWFzdXJlVW5hbGlnbmVkKClcbiAgY29uc3Qgc25hcHNBbGlnbmVkID0gbWVhc3VyZUFsaWduZWQoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTaXplcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNsaWRlUmVjdHMpXG4gICAgICAubWFwKChyZWN0cykgPT4gYXJyYXlMYXN0KHJlY3RzKVtlbmRFZGdlXSAtIHJlY3RzWzBdW3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlVW5hbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCkgPT4gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gcmVjdFtzdGFydEVkZ2VdKVxuICAgICAgLm1hcCgoc25hcCkgPT4gLW1hdGhBYnMoc25hcCkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQWxpZ25lZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNuYXBzKVxuICAgICAgLm1hcCgoZykgPT4gZ1swXSlcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiBzbmFwICsgYWxpZ25tZW50c1tpbmRleF0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gICAgc25hcHMsXG4gICAgc25hcHNBbGlnbmVkXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluT3B0aW9uVHlwZSB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQge1xuICBhcnJheUZyb21OdW1iZXIsXG4gIGFycmF5SXNMYXN0SW5kZXgsXG4gIGFycmF5TGFzdCxcbiAgYXJyYXlMYXN0SW5kZXhcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVSZWdpc3RyeVR5cGUgPSB7XG4gIHNsaWRlUmVnaXN0cnk6IG51bWJlcltdW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlUmVnaXN0cnkoXG4gIGNvbnRhaW5TbmFwczogYm9vbGVhbixcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGUsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGUsXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbik6IFNsaWRlUmVnaXN0cnlUeXBlIHtcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gIGNvbnN0IHNsaWRlUmVnaXN0cnkgPSBjcmVhdGVTbGlkZVJlZ2lzdHJ5KClcblxuICBmdW5jdGlvbiBjcmVhdGVTbGlkZVJlZ2lzdHJ5KCk6IG51bWJlcltdW10ge1xuICAgIGNvbnN0IGdyb3VwZWRTbGlkZUluZGV4ZXMgPSBncm91cFNsaWRlcyhzbGlkZUluZGV4ZXMpXG4gICAgY29uc3QgZG9Ob3RDb250YWluID0gIWNvbnRhaW5TbmFwcyB8fCBjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJ1xuXG4gICAgaWYgKHNjcm9sbFNuYXBzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIFtzbGlkZUluZGV4ZXNdXG4gICAgaWYgKGRvTm90Q29udGFpbikgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBncm91cGVkU2xpZGVJbmRleGVzLnNsaWNlKG1pbiwgbWF4KS5tYXAoKGdyb3VwLCBpbmRleCwgZ3JvdXBzKSA9PiB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KGdyb3VwcywgaW5kZXgpXG5cbiAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0KGdyb3Vwc1swXSkgKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UpXG4gICAgICB9XG4gICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0SW5kZXgoc2xpZGVJbmRleGVzKSAtIGFycmF5TGFzdChncm91cHMpWzBdICsgMVxuICAgICAgICByZXR1cm4gYXJyYXlGcm9tTnVtYmVyKHJhbmdlLCBhcnJheUxhc3QoZ3JvdXBzKVswXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBncm91cFxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgICBzbGlkZVJlZ2lzdHJ5XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgYXJyYXlMYXN0LCBtYXRoQWJzLCBtYXRoU2lnbiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRhcmdldFR5cGUgPSB7XG4gIGRpc3RhbmNlOiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICBieUluZGV4OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBUYXJnZXRUeXBlXG4gIGJ5RGlzdGFuY2U6IChmb3JjZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiBUYXJnZXRUeXBlXG4gIHNob3J0Y3V0OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFRhcmdldChcbiAgbG9vcDogYm9vbGVhbixcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZVxuKTogU2Nyb2xsVGFyZ2V0VHlwZSB7XG4gIGNvbnN0IHsgcmVhY2hlZEFueSwgcmVtb3ZlT2Zmc2V0LCBjb25zdHJhaW4gfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gbWluRGlzdGFuY2UoZGlzdGFuY2VzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRpc3RhbmNlcy5jb25jYXQoKS5zb3J0KChhLCBiKSA9PiBtYXRoQWJzKGEpIC0gbWF0aEFicyhiKSlbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRUYXJnZXRTbmFwKHRhcmdldDogbnVtYmVyKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsb29wID8gcmVtb3ZlT2Zmc2V0KHRhcmdldCkgOiBjb25zdHJhaW4odGFyZ2V0KVxuICAgIGNvbnN0IGFzY0RpZmZzVG9TbmFwcyA9IHNjcm9sbFNuYXBzXG4gICAgICAubWFwKChzbmFwLCBpbmRleCkgPT4gKHsgZGlmZjogc2hvcnRjdXQoc25hcCAtIGRpc3RhbmNlLCAwKSwgaW5kZXggfSkpXG4gICAgICAuc29ydCgoZDEsIGQyKSA9PiBtYXRoQWJzKGQxLmRpZmYpIC0gbWF0aEFicyhkMi5kaWZmKSlcblxuICAgIGNvbnN0IHsgaW5kZXggfSA9IGFzY0RpZmZzVG9TbmFwc1swXVxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG9ydGN1dCh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhcmdldHMgPSBbdGFyZ2V0LCB0YXJnZXQgKyBjb250ZW50U2l6ZSwgdGFyZ2V0IC0gY29udGVudFNpemVdXG5cbiAgICBpZiAoIWxvb3ApIHJldHVybiB0YXJnZXRcbiAgICBpZiAoIWRpcmVjdGlvbikgcmV0dXJuIG1pbkRpc3RhbmNlKHRhcmdldHMpXG5cbiAgICBjb25zdCBtYXRjaGluZ1RhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gbWF0aFNpZ24odCkgPT09IGRpcmVjdGlvbilcbiAgICBpZiAobWF0Y2hpbmdUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIG1pbkRpc3RhbmNlKG1hdGNoaW5nVGFyZ2V0cylcbiAgICByZXR1cm4gYXJyYXlMYXN0KHRhcmdldHMpIC0gY29udGVudFNpemVcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5SW5kZXgoaW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaWZmVG9TbmFwID0gc2Nyb2xsU25hcHNbaW5kZXhdIC0gdGFyZ2V0VmVjdG9yLmdldCgpXG4gICAgY29uc3QgZGlzdGFuY2UgPSBzaG9ydGN1dChkaWZmVG9TbmFwLCBkaXJlY3Rpb24pXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5RGlzdGFuY2UoZGlzdGFuY2U6IG51bWJlciwgc25hcDogYm9vbGVhbik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldFZlY3Rvci5nZXQoKSArIGRpc3RhbmNlXG4gICAgY29uc3QgeyBpbmRleCwgZGlzdGFuY2U6IHRhcmdldFNuYXBEaXN0YW5jZSB9ID0gZmluZFRhcmdldFNuYXAodGFyZ2V0KVxuICAgIGNvbnN0IHJlYWNoZWRCb3VuZCA9ICFsb29wICYmIHJlYWNoZWRBbnkodGFyZ2V0KVxuXG4gICAgaWYgKCFzbmFwIHx8IHJlYWNoZWRCb3VuZCkgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cblxuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRTbmFwRGlzdGFuY2VcbiAgICBjb25zdCBzbmFwRGlzdGFuY2UgPSBkaXN0YW5jZSArIHNob3J0Y3V0KGRpZmZUb1NuYXAsIDApXG5cbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2U6IHNuYXBEaXN0YW5jZSB9XG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICAgIGJ5RGlzdGFuY2UsXG4gICAgYnlJbmRleCxcbiAgICBzaG9ydGN1dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25zVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlLCBUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxUb1R5cGUgPSB7XG4gIGRpc3RhbmNlOiAobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiB2b2lkXG4gIGluZGV4OiAobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVG8oXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIGluZGV4Q3VycmVudDogQ291bnRlclR5cGUsXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBTY3JvbGxUb1R5cGUge1xuICBmdW5jdGlvbiBzY3JvbGxUbyh0YXJnZXQ6IFRhcmdldFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkaXN0YW5jZURpZmYgPSB0YXJnZXQuZGlzdGFuY2VcbiAgICBjb25zdCBpbmRleERpZmYgPSB0YXJnZXQuaW5kZXggIT09IGluZGV4Q3VycmVudC5nZXQoKVxuXG4gICAgdGFyZ2V0VmVjdG9yLmFkZChkaXN0YW5jZURpZmYpXG5cbiAgICBpZiAoZGlzdGFuY2VEaWZmKSB7XG4gICAgICBpZiAoc2Nyb2xsQm9keS5kdXJhdGlvbigpKSB7XG4gICAgICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgICAgYW5pbWF0aW9uLnJlbmRlcigxKVxuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kZXhEaWZmKSB7XG4gICAgICBpbmRleFByZXZpb3VzLnNldChpbmRleEN1cnJlbnQuZ2V0KCkpXG4gICAgICBpbmRleEN1cnJlbnQuc2V0KHRhcmdldC5pbmRleClcbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzZWxlY3QnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlKG46IG51bWJlciwgc25hcDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKG4sIHNuYXApXG4gICAgc2Nyb2xsVG8odGFyZ2V0KVxuICB9XG5cbiAgZnVuY3Rpb24gaW5kZXgobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gaW5kZXhDdXJyZW50LmNsb25lKCkuc2V0KG4pXG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgodGFyZ2V0SW5kZXguZ2V0KCksIGRpcmVjdGlvbilcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUb1R5cGUgPSB7XG4gICAgZGlzdGFuY2UsXG4gICAgaW5kZXhcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZVR5cGUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBTbGlkZVJlZ2lzdHJ5VHlwZSB9IGZyb20gJy4vU2xpZGVSZWdpc3RyeSdcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVGb2N1c1R5cGUgPSB7XG4gIGluaXQ6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlRm9jdXMoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIHNsaWRlUmVnaXN0cnk6IFNsaWRlUmVnaXN0cnlUeXBlWydzbGlkZVJlZ2lzdHJ5J10sXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBldmVudFN0b3JlOiBFdmVudFN0b3JlVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBTbGlkZUZvY3VzVHlwZSB7XG4gIGxldCBsYXN0VGFiUHJlc3NUaW1lID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgZXZlbnRTdG9yZS5hZGQoZG9jdW1lbnQsICdrZXlkb3duJywgcmVnaXN0ZXJUYWJQcmVzcywgZmFsc2UpXG4gICAgc2xpZGVzLmZvckVhY2goYWRkU2xpZGVGb2N1c0V2ZW50KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJUYWJQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5jb2RlID09PSAnVGFiJykgbGFzdFRhYlByZXNzVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH1cblxuICBmdW5jdGlvbiBhZGRTbGlkZUZvY3VzRXZlbnQoc2xpZGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgZm9jdXMgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIGNvbnN0IGRpZmZUaW1lID0gbm93VGltZSAtIGxhc3RUYWJQcmVzc1RpbWVcblxuICAgICAgaWYgKGRpZmZUaW1lID4gMTApIHJldHVyblxuXG4gICAgICByb290LnNjcm9sbExlZnQgPSAwXG4gICAgICBjb25zdCBpbmRleCA9IHNsaWRlcy5pbmRleE9mKHNsaWRlKVxuICAgICAgY29uc3QgZ3JvdXAgPSBzbGlkZVJlZ2lzdHJ5LmZpbmRJbmRleCgoZ3JvdXApID0+IGdyb3VwLmluY2x1ZGVzKGluZGV4KSlcblxuICAgICAgaWYgKCFpc051bWJlcihncm91cCkpIHJldHVyblxuXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDApXG4gICAgICBzY3JvbGxUby5pbmRleChncm91cCwgMClcbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZUZvY3VzJylcbiAgICB9XG5cbiAgICBldmVudFN0b3JlLmFkZChzbGlkZSwgJ2ZvY3VzJywgZm9jdXMsIHtcbiAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICBjYXB0dXJlOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlRm9jdXNUeXBlID0ge1xuICAgIGluaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBWZWN0b3IxRFR5cGUgPSB7XG4gIGdldDogKCkgPT4gbnVtYmVyXG4gIHNldDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxuICBhZGQ6IChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpID0+IHZvaWRcbiAgc3VidHJhY3Q6IChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFZlY3RvcjFEKGluaXRpYWxWYWx1ZTogbnVtYmVyKTogVmVjdG9yMURUeXBlIHtcbiAgbGV0IHZhbHVlID0gaW5pdGlhbFZhbHVlXG5cbiAgZnVuY3Rpb24gZ2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBzZXQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgPSBub3JtYWxpemVJbnB1dChuKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlICs9IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBzdWJ0cmFjdChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSAtPSBub3JtYWxpemVJbnB1dChuKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplSW5wdXQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobikgPyBuIDogbi5nZXQoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogVmVjdG9yMURUeXBlID0ge1xuICAgIGdldCxcbiAgICBzZXQsXG4gICAgYWRkLFxuICAgIHN1YnRyYWN0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVUeXBlID0ge1xuICBjbGVhcjogKCkgPT4gdm9pZFxuICB0bzogKHRhcmdldDogbnVtYmVyKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNsYXRlKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuKTogVHJhbnNsYXRlVHlwZSB7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGF4aXMuc2Nyb2xsID09PSAneCcgPyB4IDogeVxuICBjb25zdCBjb250YWluZXJTdHlsZSA9IGNvbnRhaW5lci5zdHlsZVxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHgobjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZTNkKCR7bn1weCwwcHgsMHB4KWBcbiAgfVxuXG4gIGZ1bmN0aW9uIHkobjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZTNkKDBweCwke259cHgsMHB4KWBcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvKHRhcmdldDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2xhdGUoYXhpcy5kaXJlY3Rpb24odGFyZ2V0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBkaXNhYmxlZCA9ICFhY3RpdmVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuXG4gICAgY29udGFpbmVyU3R5bGUudHJhbnNmb3JtID0gJydcbiAgICBpZiAoIWNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJylcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFRyYW5zbGF0ZVR5cGUgPSB7XG4gICAgY2xlYXIsXG4gICAgdG8sXG4gICAgdG9nZ2xlQWN0aXZlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgYXJyYXlLZXlzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFELCBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgVHJhbnNsYXRlLCBUcmFuc2xhdGVUeXBlIH0gZnJvbSAnLi9UcmFuc2xhdGUnXG5cbnR5cGUgU2xpZGVCb3VuZFR5cGUgPSB7XG4gIHN0YXJ0OiBudW1iZXJcbiAgZW5kOiBudW1iZXJcbn1cblxudHlwZSBMb29wUG9pbnRUeXBlID0ge1xuICBsb29wUG9pbnQ6IG51bWJlclxuICBpbmRleDogbnVtYmVyXG4gIHRyYW5zbGF0ZTogVHJhbnNsYXRlVHlwZVxuICBzbGlkZUxvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgdGFyZ2V0OiAoKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgU2xpZGVMb29wZXJUeXBlID0ge1xuICBjYW5Mb29wOiAoKSA9PiBib29sZWFuXG4gIGNsZWFyOiAoKSA9PiB2b2lkXG4gIGxvb3A6ICgpID0+IHZvaWRcbiAgbG9vcFBvaW50czogTG9vcFBvaW50VHlwZVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZUxvb3BlcihcbiAgYXhpczogQXhpc1R5cGUsXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNsaWRlU2l6ZXM6IG51bWJlcltdLFxuICBzbGlkZVNpemVzV2l0aEdhcHM6IG51bWJlcltdLFxuICBzbmFwczogbnVtYmVyW10sXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdXG4pOiBTbGlkZUxvb3BlclR5cGUge1xuICBjb25zdCByb3VuZGluZ1NhZmV0eSA9IDAuNVxuICBjb25zdCBhc2NJdGVtcyA9IGFycmF5S2V5cyhzbGlkZVNpemVzV2l0aEdhcHMpXG4gIGNvbnN0IGRlc2NJdGVtcyA9IGFycmF5S2V5cyhzbGlkZVNpemVzV2l0aEdhcHMpLnJldmVyc2UoKVxuICBjb25zdCBsb29wUG9pbnRzID0gc3RhcnRQb2ludHMoKS5jb25jYXQoZW5kUG9pbnRzKCkpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlU2xpZGVTaXplcyhpbmRleGVzOiBudW1iZXJbXSwgZnJvbTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaW5kZXhlcy5yZWR1Y2UoKGE6IG51bWJlciwgaSkgPT4ge1xuICAgICAgcmV0dXJuIGEgLSBzbGlkZVNpemVzV2l0aEdhcHNbaV1cbiAgICB9LCBmcm9tKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzSW5HYXAoaW5kZXhlczogbnVtYmVyW10sIGdhcDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBpbmRleGVzLnJlZHVjZSgoYTogbnVtYmVyW10sIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlbWFpbmluZ0dhcCA9IHJlbW92ZVNsaWRlU2l6ZXMoYSwgZ2FwKVxuICAgICAgcmV0dXJuIHJlbWFpbmluZ0dhcCA+IDAgPyBhLmNvbmNhdChbaV0pIDogYVxuICAgIH0sIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFNsaWRlQm91bmRzKG9mZnNldDogbnVtYmVyKTogU2xpZGVCb3VuZFR5cGVbXSB7XG4gICAgcmV0dXJuIHNuYXBzLm1hcCgoc25hcCwgaW5kZXgpID0+ICh7XG4gICAgICBzdGFydDogc25hcCAtIHNsaWRlU2l6ZXNbaW5kZXhdICsgcm91bmRpbmdTYWZldHkgKyBvZmZzZXQsXG4gICAgICBlbmQ6IHNuYXAgKyB2aWV3U2l6ZSAtIHJvdW5kaW5nU2FmZXR5ICsgb2Zmc2V0XG4gICAgfSkpXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kTG9vcFBvaW50cyhcbiAgICBpbmRleGVzOiBudW1iZXJbXSxcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBpc0VuZEVkZ2U6IGJvb2xlYW5cbiAgKTogTG9vcFBvaW50VHlwZVtdIHtcbiAgICBjb25zdCBzbGlkZUJvdW5kcyA9IGZpbmRTbGlkZUJvdW5kcyhvZmZzZXQpXG5cbiAgICByZXR1cm4gaW5kZXhlcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpbml0aWFsID0gaXNFbmRFZGdlID8gMCA6IC1jb250ZW50U2l6ZVxuICAgICAgY29uc3QgYWx0ZXJlZCA9IGlzRW5kRWRnZSA/IGNvbnRlbnRTaXplIDogMFxuICAgICAgY29uc3QgYm91bmRFZGdlID0gaXNFbmRFZGdlID8gJ2VuZCcgOiAnc3RhcnQnXG4gICAgICBjb25zdCBsb29wUG9pbnQgPSBzbGlkZUJvdW5kc1tpbmRleF1bYm91bmRFZGdlXVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleCxcbiAgICAgICAgbG9vcFBvaW50LFxuICAgICAgICBzbGlkZUxvY2F0aW9uOiBWZWN0b3IxRCgtMSksXG4gICAgICAgIHRyYW5zbGF0ZTogVHJhbnNsYXRlKGF4aXMsIHNsaWRlc1tpbmRleF0pLFxuICAgICAgICB0YXJnZXQ6ICgpID0+IChsb2NhdGlvbi5nZXQoKSA+IGxvb3BQb2ludCA/IGluaXRpYWwgOiBhbHRlcmVkKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFBvaW50cygpOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IGdhcCA9IHNjcm9sbFNuYXBzWzBdXG4gICAgY29uc3QgaW5kZXhlcyA9IHNsaWRlc0luR2FwKGRlc2NJdGVtcywgZ2FwKVxuICAgIHJldHVybiBmaW5kTG9vcFBvaW50cyhpbmRleGVzLCBjb250ZW50U2l6ZSwgZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBlbmRQb2ludHMoKTogTG9vcFBvaW50VHlwZVtdIHtcbiAgICBjb25zdCBnYXAgPSB2aWV3U2l6ZSAtIHNjcm9sbFNuYXBzWzBdIC0gMVxuICAgIGNvbnN0IGluZGV4ZXMgPSBzbGlkZXNJbkdhcChhc2NJdGVtcywgZ2FwKVxuICAgIHJldHVybiBmaW5kTG9vcFBvaW50cyhpbmRleGVzLCAtY29udGVudFNpemUsIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5Mb29wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsb29wUG9pbnRzLmV2ZXJ5KCh7IGluZGV4IH0pID0+IHtcbiAgICAgIGNvbnN0IG90aGVySW5kZXhlcyA9IGFzY0l0ZW1zLmZpbHRlcigoaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICByZXR1cm4gcmVtb3ZlU2xpZGVTaXplcyhvdGhlckluZGV4ZXMsIHZpZXdTaXplKSA8PSAwLjFcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcCgpOiB2b2lkIHtcbiAgICBsb29wUG9pbnRzLmZvckVhY2goKGxvb3BQb2ludCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQsIHRyYW5zbGF0ZSwgc2xpZGVMb2NhdGlvbiB9ID0gbG9vcFBvaW50XG4gICAgICBjb25zdCBzaGlmdExvY2F0aW9uID0gdGFyZ2V0KClcbiAgICAgIGlmIChzaGlmdExvY2F0aW9uID09PSBzbGlkZUxvY2F0aW9uLmdldCgpKSByZXR1cm5cbiAgICAgIHRyYW5zbGF0ZS50byhzaGlmdExvY2F0aW9uKVxuICAgICAgc2xpZGVMb2NhdGlvbi5zZXQoc2hpZnRMb2NhdGlvbilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgbG9vcFBvaW50cy5mb3JFYWNoKChsb29wUG9pbnQpID0+IGxvb3BQb2ludC50cmFuc2xhdGUuY2xlYXIoKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlTG9vcGVyVHlwZSA9IHtcbiAgICBjYW5Mb29wLFxuICAgIGNsZWFyLFxuICAgIGxvb3AsXG4gICAgbG9vcFBvaW50c1xuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgU2xpZGVzSGFuZGxlckNhbGxiYWNrVHlwZSA9IChcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW11cbikgPT4gYm9vbGVhbiB8IHZvaWRcblxuZXhwb3J0IHR5cGUgU2xpZGVzSGFuZGxlck9wdGlvblR5cGUgPSBib29sZWFuIHwgU2xpZGVzSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBTbGlkZXNIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNIYW5kbGVyKFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHdhdGNoU2xpZGVzOiBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZVxuKTogU2xpZGVzSGFuZGxlclR5cGUge1xuICBsZXQgbXV0YXRpb25PYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlclxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hTbGlkZXMpIHJldHVyblxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdENhbGxiYWNrKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSk6IHZvaWQge1xuICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgICAgZW1ibGFBcGkucmVJbml0KClcbiAgICAgICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVzQ2hhbmdlZCcpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hTbGlkZXMpIHx8IHdhdGNoU2xpZGVzKGVtYmxhQXBpLCBtdXRhdGlvbnMpKSB7XG4gICAgICAgIGRlZmF1bHRDYWxsYmFjayhtdXRhdGlvbnMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIsIHsgY2hpbGRMaXN0OiB0cnVlIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChtdXRhdGlvbk9ic2VydmVyKSBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBvYmplY3RLZXlzIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBJbnRlcnNlY3Rpb25FbnRyeU1hcFR5cGUgPSB7XG4gIFtrZXk6IG51bWJlcl06IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlcbn1cblxuZXhwb3J0IHR5cGUgU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGUgPSBJbnRlcnNlY3Rpb25PYnNlcnZlckluaXRbJ3RocmVzaG9sZCddXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0luVmlld1R5cGUgPSB7XG4gIGluaXQ6ICgpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBnZXQ6IChpblZpZXc/OiBib29sZWFuKSA9PiBudW1iZXJbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzSW5WaWV3KFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgdGhyZXNob2xkOiBTbGlkZXNJblZpZXdPcHRpb25zVHlwZVxuKTogU2xpZGVzSW5WaWV3VHlwZSB7XG4gIGNvbnN0IGludGVyc2VjdGlvbkVudHJ5TWFwOiBJbnRlcnNlY3Rpb25FbnRyeU1hcFR5cGUgPSB7fVxuICBsZXQgaW5WaWV3Q2FjaGU6IG51bWJlcltdIHwgbnVsbCA9IG51bGxcbiAgbGV0IG5vdEluVmlld0NhY2hlOiBudW1iZXJbXSB8IG51bGwgPSBudWxsXG4gIGxldCBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBpbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHNsaWRlcy5pbmRleE9mKDxIVE1MRWxlbWVudD5lbnRyeS50YXJnZXQpXG4gICAgICAgICAgaW50ZXJzZWN0aW9uRW50cnlNYXBbaW5kZXhdID0gZW50cnlcbiAgICAgICAgfSlcblxuICAgICAgICBpblZpZXdDYWNoZSA9IG51bGxcbiAgICAgICAgbm90SW5WaWV3Q2FjaGUgPSBudWxsXG4gICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZXNJblZpZXcnKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm9vdDogY29udGFpbmVyLnBhcmVudEVsZW1lbnQsXG4gICAgICAgIHRocmVzaG9sZFxuICAgICAgfVxuICAgIClcblxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSkgPT4gaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShzbGlkZSkpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChpbnRlcnNlY3Rpb25PYnNlcnZlcikgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5WaWV3TGlzdChpblZpZXc6IGJvb2xlYW4pOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIG9iamVjdEtleXMoaW50ZXJzZWN0aW9uRW50cnlNYXApLnJlZHVjZShcbiAgICAgIChsaXN0OiBudW1iZXJbXSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KHNsaWRlSW5kZXgpXG4gICAgICAgIGNvbnN0IHsgaXNJbnRlcnNlY3RpbmcgfSA9IGludGVyc2VjdGlvbkVudHJ5TWFwW2luZGV4XVxuICAgICAgICBjb25zdCBpblZpZXdNYXRjaCA9IGluVmlldyAmJiBpc0ludGVyc2VjdGluZ1xuICAgICAgICBjb25zdCBub3RJblZpZXdNYXRjaCA9ICFpblZpZXcgJiYgIWlzSW50ZXJzZWN0aW5nXG5cbiAgICAgICAgaWYgKGluVmlld01hdGNoIHx8IG5vdEluVmlld01hdGNoKSBsaXN0LnB1c2goaW5kZXgpXG4gICAgICAgIHJldHVybiBsaXN0XG4gICAgICB9LFxuICAgICAgW11cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBnZXQoaW5WaWV3OiBib29sZWFuID0gdHJ1ZSk6IG51bWJlcltdIHtcbiAgICBpZiAoaW5WaWV3ICYmIGluVmlld0NhY2hlKSByZXR1cm4gaW5WaWV3Q2FjaGVcbiAgICBpZiAoIWluVmlldyAmJiBub3RJblZpZXdDYWNoZSkgcmV0dXJuIG5vdEluVmlld0NhY2hlXG5cbiAgICBjb25zdCBzbGlkZUluZGV4ZXMgPSBjcmVhdGVJblZpZXdMaXN0KGluVmlldylcblxuICAgIGlmIChpblZpZXcpIGluVmlld0NhY2hlID0gc2xpZGVJbmRleGVzXG4gICAgaWYgKCFpblZpZXcpIG5vdEluVmlld0NhY2hlID0gc2xpZGVJbmRleGVzXG5cbiAgICByZXR1cm4gc2xpZGVJbmRleGVzXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNJblZpZXdUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBnZXRcbiAgfVxuXG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgYXJyYXlJc0xhc3RJbmRleCwgYXJyYXlMYXN0LCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVTaXplc1R5cGUgPSB7XG4gIHNsaWRlU2l6ZXM6IG51bWJlcltdXG4gIHNsaWRlU2l6ZXNXaXRoR2FwczogbnVtYmVyW11cbiAgc3RhcnRHYXA6IG51bWJlclxuICBlbmRHYXA6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVTaXplcyhcbiAgYXhpczogQXhpc1R5cGUsXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZSxcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW10sXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgcmVhZEVkZ2VHYXA6IGJvb2xlYW4sXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlXG4pOiBTbGlkZVNpemVzVHlwZSB7XG4gIGNvbnN0IHsgbWVhc3VyZVNpemUsIHN0YXJ0RWRnZSwgZW5kRWRnZSB9ID0gYXhpc1xuICBjb25zdCB3aXRoRWRnZUdhcCA9IHNsaWRlUmVjdHNbMF0gJiYgcmVhZEVkZ2VHYXBcbiAgY29uc3Qgc3RhcnRHYXAgPSBtZWFzdXJlU3RhcnRHYXAoKVxuICBjb25zdCBlbmRHYXAgPSBtZWFzdXJlRW5kR2FwKClcbiAgY29uc3Qgc2xpZGVTaXplcyA9IHNsaWRlUmVjdHMubWFwKG1lYXN1cmVTaXplKVxuICBjb25zdCBzbGlkZVNpemVzV2l0aEdhcHMgPSBtZWFzdXJlV2l0aEdhcHMoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTdGFydEdhcCgpOiBudW1iZXIge1xuICAgIGlmICghd2l0aEVkZ2VHYXApIHJldHVybiAwXG4gICAgY29uc3Qgc2xpZGVSZWN0ID0gc2xpZGVSZWN0c1swXVxuICAgIHJldHVybiBtYXRoQWJzKGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHNsaWRlUmVjdFtzdGFydEVkZ2VdKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUVuZEdhcCgpOiBudW1iZXIge1xuICAgIGlmICghd2l0aEVkZ2VHYXApIHJldHVybiAwXG4gICAgY29uc3Qgc3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFycmF5TGFzdChzbGlkZXMpKVxuICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoYG1hcmdpbi0ke2VuZEVkZ2V9YCkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlV2l0aEdhcHMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbGlkZVJlY3RzXG4gICAgICAubWFwKChyZWN0LCBpbmRleCwgcmVjdHMpID0+IHtcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9ICFpbmRleFxuICAgICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KHJlY3RzLCBpbmRleClcbiAgICAgICAgaWYgKGlzRmlyc3QpIHJldHVybiBzbGlkZVNpemVzW2luZGV4XSArIHN0YXJ0R2FwXG4gICAgICAgIGlmIChpc0xhc3QpIHJldHVybiBzbGlkZVNpemVzW2luZGV4XSArIGVuZEdhcFxuICAgICAgICByZXR1cm4gcmVjdHNbaW5kZXggKyAxXVtzdGFydEVkZ2VdIC0gcmVjdFtzdGFydEVkZ2VdXG4gICAgICB9KVxuICAgICAgLm1hcChtYXRoQWJzKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVTaXplc1R5cGUgPSB7XG4gICAgc2xpZGVTaXplcyxcbiAgICBzbGlkZVNpemVzV2l0aEdhcHMsXG4gICAgc3RhcnRHYXAsXG4gICAgZW5kR2FwXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQge1xuICBhcnJheUtleXMsXG4gIGFycmF5TGFzdCxcbiAgYXJyYXlMYXN0SW5kZXgsXG4gIGlzTnVtYmVyLFxuICBtYXRoQWJzXG59IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlc1RvU2Nyb2xsT3B0aW9uVHlwZSA9ICdhdXRvJyB8IG51bWJlclxuXG5leHBvcnQgdHlwZSBTbGlkZXNUb1Njcm9sbFR5cGUgPSB7XG4gIGdyb3VwU2xpZGVzOiA8VHlwZT4oYXJyYXk6IFR5cGVbXSkgPT4gVHlwZVtdW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc1RvU2Nyb2xsKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgdmlld1NpemU6IG51bWJlcixcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsT3B0aW9uVHlwZSxcbiAgbG9vcDogYm9vbGVhbixcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc3RhcnRHYXA6IG51bWJlcixcbiAgZW5kR2FwOiBudW1iZXIsXG4gIHBpeGVsVG9sZXJhbmNlOiBudW1iZXJcbik6IFNsaWRlc1RvU2Nyb2xsVHlwZSB7XG4gIGNvbnN0IHsgc3RhcnRFZGdlLCBlbmRFZGdlLCBkaXJlY3Rpb24gfSA9IGF4aXNcbiAgY29uc3QgZ3JvdXBCeU51bWJlciA9IGlzTnVtYmVyKHNsaWRlc1RvU2Nyb2xsKVxuXG4gIGZ1bmN0aW9uIGJ5TnVtYmVyPFR5cGU+KGFycmF5OiBUeXBlW10sIGdyb3VwU2l6ZTogbnVtYmVyKTogVHlwZVtdW10ge1xuICAgIHJldHVybiBhcnJheUtleXMoYXJyYXkpXG4gICAgICAuZmlsdGVyKChpKSA9PiBpICUgZ3JvdXBTaXplID09PSAwKVxuICAgICAgLm1hcCgoaSkgPT4gYXJyYXkuc2xpY2UoaSwgaSArIGdyb3VwU2l6ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBieVNpemU8VHlwZT4oYXJyYXk6IFR5cGVbXSk6IFR5cGVbXVtdIHtcbiAgICBpZiAoIWFycmF5Lmxlbmd0aCkgcmV0dXJuIFtdXG5cbiAgICByZXR1cm4gYXJyYXlLZXlzKGFycmF5KVxuICAgICAgLnJlZHVjZSgoZ3JvdXBzOiBudW1iZXJbXSwgcmVjdEIsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3RBID0gYXJyYXlMYXN0KGdyb3VwcykgfHwgMFxuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gcmVjdEEgPT09IDBcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gcmVjdEIgPT09IGFycmF5TGFzdEluZGV4KGFycmF5KVxuXG4gICAgICAgIGNvbnN0IGVkZ2VBID0gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0c1tyZWN0QV1bc3RhcnRFZGdlXVxuICAgICAgICBjb25zdCBlZGdlQiA9IGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHNsaWRlUmVjdHNbcmVjdEJdW2VuZEVkZ2VdXG4gICAgICAgIGNvbnN0IGdhcEEgPSAhbG9vcCAmJiBpc0ZpcnN0ID8gZGlyZWN0aW9uKHN0YXJ0R2FwKSA6IDBcbiAgICAgICAgY29uc3QgZ2FwQiA9ICFsb29wICYmIGlzTGFzdCA/IGRpcmVjdGlvbihlbmRHYXApIDogMFxuICAgICAgICBjb25zdCBjaHVua1NpemUgPSBtYXRoQWJzKGVkZ2VCIC0gZ2FwQiAtIChlZGdlQSArIGdhcEEpKVxuXG4gICAgICAgIGlmIChpbmRleCAmJiBjaHVua1NpemUgPiB2aWV3U2l6ZSArIHBpeGVsVG9sZXJhbmNlKSBncm91cHMucHVzaChyZWN0QilcbiAgICAgICAgaWYgKGlzTGFzdCkgZ3JvdXBzLnB1c2goYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZ3JvdXBzXG4gICAgICB9LCBbXSlcbiAgICAgIC5tYXAoKGN1cnJlbnRTaXplLCBpbmRleCwgZ3JvdXBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU2l6ZSA9IE1hdGgubWF4KGdyb3Vwc1tpbmRleCAtIDFdIHx8IDApXG4gICAgICAgIHJldHVybiBhcnJheS5zbGljZShwcmV2aW91c1NpemUsIGN1cnJlbnRTaXplKVxuICAgICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdyb3VwU2xpZGVzPFR5cGU+KGFycmF5OiBUeXBlW10pOiBUeXBlW11bXSB7XG4gICAgcmV0dXJuIGdyb3VwQnlOdW1iZXIgPyBieU51bWJlcihhcnJheSwgc2xpZGVzVG9TY3JvbGwpIDogYnlTaXplKGFycmF5KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzVG9TY3JvbGxUeXBlID0ge1xuICAgIGdyb3VwU2xpZGVzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFsaWdubWVudCB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHtcbiAgQW5pbWF0aW9ucyxcbiAgQW5pbWF0aW9uc1R5cGUsXG4gIEFuaW1hdGlvbnNVcGRhdGVUeXBlLFxuICBBbmltYXRpb25zUmVuZGVyVHlwZVxufSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBBeGlzLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IENvdW50ZXIsIENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRHJhZ0hhbmRsZXIsIERyYWdIYW5kbGVyVHlwZSB9IGZyb20gJy4vRHJhZ0hhbmRsZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlciB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlLCBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUsIE5vZGVSZWN0cyB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3LCBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcbmltcG9ydCB7IFJlc2l6ZUhhbmRsZXIsIFJlc2l6ZUhhbmRsZXJUeXBlIH0gZnJvbSAnLi9SZXNpemVIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keSwgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxCb3VuZHMsIFNjcm9sbEJvdW5kc1R5cGUgfSBmcm9tICcuL1Njcm9sbEJvdW5kcydcbmltcG9ydCB7IFNjcm9sbENvbnRhaW4gfSBmcm9tICcuL1Njcm9sbENvbnRhaW4nXG5pbXBvcnQgeyBTY3JvbGxMaW1pdCB9IGZyb20gJy4vU2Nyb2xsTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxMb29wZXIsIFNjcm9sbExvb3BlclR5cGUgfSBmcm9tICcuL1Njcm9sbExvb3BlcidcbmltcG9ydCB7IFNjcm9sbFByb2dyZXNzLCBTY3JvbGxQcm9ncmVzc1R5cGUgfSBmcm9tICcuL1Njcm9sbFByb2dyZXNzJ1xuaW1wb3J0IHsgU2Nyb2xsU25hcHMgfSBmcm9tICcuL1Njcm9sbFNuYXBzJ1xuaW1wb3J0IHsgU2xpZGVSZWdpc3RyeSwgU2xpZGVSZWdpc3RyeVR5cGUgfSBmcm9tICcuL1NsaWRlUmVnaXN0cnknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXQsIFNjcm9sbFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFNjcm9sbFRvLCBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgU2xpZGVGb2N1cywgU2xpZGVGb2N1c1R5cGUgfSBmcm9tICcuL1NsaWRlRm9jdXMnXG5pbXBvcnQgeyBTbGlkZUxvb3BlciwgU2xpZGVMb29wZXJUeXBlIH0gZnJvbSAnLi9TbGlkZUxvb3BlcidcbmltcG9ydCB7IFNsaWRlc0hhbmRsZXIsIFNsaWRlc0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9TbGlkZXNIYW5kbGVyJ1xuaW1wb3J0IHsgU2xpZGVzSW5WaWV3LCBTbGlkZXNJblZpZXdUeXBlIH0gZnJvbSAnLi9TbGlkZXNJblZpZXcnXG5pbXBvcnQgeyBTbGlkZVNpemVzIH0gZnJvbSAnLi9TbGlkZVNpemVzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGwsIFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcbmltcG9ydCB7IGFycmF5S2V5cywgYXJyYXlMYXN0LCBhcnJheUxhc3RJbmRleCwgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRCwgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgRW5naW5lVHlwZSA9IHtcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnRcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4gIGF4aXM6IEF4aXNUeXBlXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGVcbiAgc2Nyb2xsQm91bmRzOiBTY3JvbGxCb3VuZHNUeXBlXG4gIHNjcm9sbExvb3BlcjogU2Nyb2xsTG9vcGVyVHlwZVxuICBzY3JvbGxQcm9ncmVzczogU2Nyb2xsUHJvZ3Jlc3NUeXBlXG4gIGluZGV4OiBDb3VudGVyVHlwZVxuICBpbmRleFByZXZpb3VzOiBDb3VudGVyVHlwZVxuICBsaW1pdDogTGltaXRUeXBlXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgb2Zmc2V0TG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBwcmV2aW91c0xvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgb3B0aW9uczogT3B0aW9uc1R5cGVcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGVcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGVcbiAgZHJhZ0hhbmRsZXI6IERyYWdIYW5kbGVyVHlwZVxuICBldmVudFN0b3JlOiBFdmVudFN0b3JlVHlwZVxuICBzbGlkZUxvb3BlcjogU2xpZGVMb29wZXJUeXBlXG4gIHNsaWRlc0luVmlldzogU2xpZGVzSW5WaWV3VHlwZVxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlXG4gIHRhcmdldDogVmVjdG9yMURUeXBlXG4gIHRyYW5zbGF0ZTogVHJhbnNsYXRlVHlwZVxuICByZXNpemVIYW5kbGVyOiBSZXNpemVIYW5kbGVyVHlwZVxuICBzbGlkZXNIYW5kbGVyOiBTbGlkZXNIYW5kbGVyVHlwZVxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZVxuICBzY3JvbGxTbmFwTGlzdDogbnVtYmVyW11cbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbiAgc2xpZGVGb2N1czogU2xpZGVGb2N1c1R5cGVcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXVxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGVcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVuZ2luZShcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICBvcHRpb25zOiBPcHRpb25zVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBFbmdpbmVUeXBlIHtcbiAgLy8gT3B0aW9uc1xuICBjb25zdCB7XG4gICAgYWxpZ24sXG4gICAgYXhpczogc2Nyb2xsQXhpcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RhcnRJbmRleCxcbiAgICBsb29wLFxuICAgIGR1cmF0aW9uLFxuICAgIGRyYWdGcmVlLFxuICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgaW5WaWV3VGhyZXNob2xkLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiBncm91cFNsaWRlcyxcbiAgICBza2lwU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICB3YXRjaFJlc2l6ZSxcbiAgICB3YXRjaFNsaWRlcyxcbiAgICB3YXRjaERyYWdcbiAgfSA9IG9wdGlvbnNcblxuICAvLyBNZWFzdXJlbWVudHNcbiAgY29uc3QgcGl4ZWxUb2xlcmFuY2UgPSAyXG4gIGNvbnN0IG5vZGVSZWN0cyA9IE5vZGVSZWN0cygpXG4gIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBub2RlUmVjdHMubWVhc3VyZShjb250YWluZXIpXG4gIGNvbnN0IHNsaWRlUmVjdHMgPSBzbGlkZXMubWFwKG5vZGVSZWN0cy5tZWFzdXJlKVxuICBjb25zdCBheGlzID0gQXhpcyhzY3JvbGxBeGlzLCBkaXJlY3Rpb24pXG4gIGNvbnN0IHZpZXdTaXplID0gYXhpcy5tZWFzdXJlU2l6ZShjb250YWluZXJSZWN0KVxuICBjb25zdCBwZXJjZW50T2ZWaWV3ID0gUGVyY2VudE9mVmlldyh2aWV3U2l6ZSlcbiAgY29uc3QgYWxpZ25tZW50ID0gQWxpZ25tZW50KGFsaWduLCB2aWV3U2l6ZSlcbiAgY29uc3QgY29udGFpblNuYXBzID0gIWxvb3AgJiYgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHJlYWRFZGdlR2FwID0gbG9vcCB8fCAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgeyBzbGlkZVNpemVzLCBzbGlkZVNpemVzV2l0aEdhcHMsIHN0YXJ0R2FwLCBlbmRHYXAgfSA9IFNsaWRlU2l6ZXMoXG4gICAgYXhpcyxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzLFxuICAgIHJlYWRFZGdlR2FwLFxuICAgIG93bmVyV2luZG93XG4gIClcbiAgY29uc3Qgc2xpZGVzVG9TY3JvbGwgPSBTbGlkZXNUb1Njcm9sbChcbiAgICBheGlzLFxuICAgIHZpZXdTaXplLFxuICAgIGdyb3VwU2xpZGVzLFxuICAgIGxvb3AsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHsgc25hcHMsIHNuYXBzQWxpZ25lZCB9ID0gU2Nyb2xsU25hcHMoXG4gICAgYXhpcyxcbiAgICBhbGlnbm1lbnQsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlc1RvU2Nyb2xsXG4gIClcbiAgY29uc3QgY29udGVudFNpemUgPSAtYXJyYXlMYXN0KHNuYXBzKSArIGFycmF5TGFzdChzbGlkZVNpemVzV2l0aEdhcHMpXG4gIGNvbnN0IHsgc25hcHNDb250YWluZWQsIHNjcm9sbENvbnRhaW5MaW1pdCB9ID0gU2Nyb2xsQ29udGFpbihcbiAgICB2aWV3U2l6ZSxcbiAgICBjb250ZW50U2l6ZSxcbiAgICBzbmFwc0FsaWduZWQsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gY29udGFpblNuYXBzID8gc25hcHNDb250YWluZWQgOiBzbmFwc0FsaWduZWRcbiAgY29uc3QgeyBsaW1pdCB9ID0gU2Nyb2xsTGltaXQoY29udGVudFNpemUsIHNjcm9sbFNuYXBzLCBsb29wKVxuXG4gIC8vIEluZGV4ZXNcbiAgY29uc3QgaW5kZXggPSBDb3VudGVyKGFycmF5TGFzdEluZGV4KHNjcm9sbFNuYXBzKSwgc3RhcnRJbmRleCwgbG9vcClcbiAgY29uc3QgaW5kZXhQcmV2aW91cyA9IGluZGV4LmNsb25lKClcbiAgY29uc3Qgc2xpZGVJbmRleGVzID0gYXJyYXlLZXlzKHNsaWRlcylcblxuICAvLyBBbmltYXRpb25cbiAgY29uc3QgdXBkYXRlOiBBbmltYXRpb25zVXBkYXRlVHlwZSA9IChcbiAgICB7IGRyYWdIYW5kbGVyLCBzY3JvbGxCb2R5LCBzY3JvbGxCb3VuZHMsIG9wdGlvbnM6IHsgbG9vcCB9IH0sXG4gICAgdGltZVN0ZXBcbiAgKSA9PiB7XG4gICAgaWYgKCFsb29wKSBzY3JvbGxCb3VuZHMuY29uc3RyYWluKGRyYWdIYW5kbGVyLnBvaW50ZXJEb3duKCkpXG4gICAgc2Nyb2xsQm9keS5zZWVrKHRpbWVTdGVwKVxuICB9XG5cbiAgY29uc3QgcmVuZGVyOiBBbmltYXRpb25zUmVuZGVyVHlwZSA9IChcbiAgICB7XG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgdHJhbnNsYXRlLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHNjcm9sbExvb3BlcixcbiAgICAgIHNsaWRlTG9vcGVyLFxuICAgICAgZHJhZ0hhbmRsZXIsXG4gICAgICBhbmltYXRpb24sXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBzY3JvbGxCb3VuZHMsXG4gICAgICBvcHRpb25zOiB7IGxvb3AgfVxuICAgIH0sXG4gICAgbGFnT2Zmc2V0XG4gICkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFNldHRsZSA9IHNjcm9sbEJvZHkuc2V0dGxlZCgpXG4gICAgY29uc3Qgd2l0aGluQm91bmRzID0gIXNjcm9sbEJvdW5kcy5zaG91bGRDb25zdHJhaW4oKVxuICAgIGNvbnN0IGhhc1NldHRsZWQgPSBsb29wID8gc2hvdWxkU2V0dGxlIDogc2hvdWxkU2V0dGxlICYmIHdpdGhpbkJvdW5kc1xuXG4gICAgaWYgKGhhc1NldHRsZWQgJiYgIWRyYWdIYW5kbGVyLnBvaW50ZXJEb3duKCkpIHtcbiAgICAgIGFuaW1hdGlvbi5zdG9wKClcbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzZXR0bGUnKVxuICAgIH1cbiAgICBpZiAoIWhhc1NldHRsZWQpIGV2ZW50SGFuZGxlci5lbWl0KCdzY3JvbGwnKVxuXG4gICAgY29uc3QgaW50ZXJwb2xhdGVkTG9jYXRpb24gPVxuICAgICAgbG9jYXRpb24uZ2V0KCkgKiBsYWdPZmZzZXQgKyBwcmV2aW91c0xvY2F0aW9uLmdldCgpICogKDEgLSBsYWdPZmZzZXQpXG5cbiAgICBvZmZzZXRMb2NhdGlvbi5zZXQoaW50ZXJwb2xhdGVkTG9jYXRpb24pXG5cbiAgICBpZiAobG9vcCkge1xuICAgICAgc2Nyb2xsTG9vcGVyLmxvb3Aoc2Nyb2xsQm9keS5kaXJlY3Rpb24oKSlcbiAgICAgIHNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZS50byhvZmZzZXRMb2NhdGlvbi5nZXQoKSlcbiAgfVxuICBjb25zdCBhbmltYXRpb24gPSBBbmltYXRpb25zKFxuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgb3duZXJXaW5kb3csXG4gICAgKHRpbWVTdGVwKSA9PiB1cGRhdGUoZW5naW5lLCB0aW1lU3RlcCksXG4gICAgKGxhZ09mZnNldDogbnVtYmVyKSA9PiByZW5kZXIoZW5naW5lLCBsYWdPZmZzZXQpXG4gIClcblxuICAvLyBTaGFyZWRcbiAgY29uc3QgZnJpY3Rpb24gPSAwLjY4XG4gIGNvbnN0IHN0YXJ0TG9jYXRpb24gPSBzY3JvbGxTbmFwc1tpbmRleC5nZXQoKV1cbiAgY29uc3QgbG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBwcmV2aW91c0xvY2F0aW9uID0gVmVjdG9yMUQoc3RhcnRMb2NhdGlvbilcbiAgY29uc3Qgb2Zmc2V0TG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCB0YXJnZXQgPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBzY3JvbGxCb2R5ID0gU2Nyb2xsQm9keShcbiAgICBsb2NhdGlvbixcbiAgICBvZmZzZXRMb2NhdGlvbixcbiAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgIHRhcmdldCxcbiAgICBkdXJhdGlvbixcbiAgICBmcmljdGlvblxuICApXG4gIGNvbnN0IHNjcm9sbFRhcmdldCA9IFNjcm9sbFRhcmdldChcbiAgICBsb29wLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIGNvbnRlbnRTaXplLFxuICAgIGxpbWl0LFxuICAgIHRhcmdldFxuICApXG4gIGNvbnN0IHNjcm9sbFRvID0gU2Nyb2xsVG8oXG4gICAgYW5pbWF0aW9uLFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgdGFyZ2V0LFxuICAgIGV2ZW50SGFuZGxlclxuICApXG4gIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gU2Nyb2xsUHJvZ3Jlc3MobGltaXQpXG4gIGNvbnN0IGV2ZW50U3RvcmUgPSBFdmVudFN0b3JlKClcbiAgY29uc3Qgc2xpZGVzSW5WaWV3ID0gU2xpZGVzSW5WaWV3KFxuICAgIGNvbnRhaW5lcixcbiAgICBzbGlkZXMsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGluVmlld1RocmVzaG9sZFxuICApXG4gIGNvbnN0IHsgc2xpZGVSZWdpc3RyeSB9ID0gU2xpZGVSZWdpc3RyeShcbiAgICBjb250YWluU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxDb250YWluTGltaXQsXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgc2xpZGVJbmRleGVzXG4gIClcbiAgY29uc3Qgc2xpZGVGb2N1cyA9IFNsaWRlRm9jdXMoXG4gICAgcm9vdCxcbiAgICBzbGlkZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzY3JvbGxUbyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIGV2ZW50U3RvcmUsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcblxuICAvLyBFbmdpbmVcbiAgY29uc3QgZW5naW5lOiBFbmdpbmVUeXBlID0ge1xuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgb3duZXJXaW5kb3csXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBhbmltYXRpb24sXG4gICAgYXhpcyxcbiAgICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXIoXG4gICAgICBheGlzLFxuICAgICAgcm9vdCxcbiAgICAgIG93bmVyRG9jdW1lbnQsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIHRhcmdldCxcbiAgICAgIERyYWdUcmFja2VyKGF4aXMsIG93bmVyV2luZG93KSxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgYW5pbWF0aW9uLFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgc2Nyb2xsVGFyZ2V0LFxuICAgICAgaW5kZXgsXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBwZXJjZW50T2ZWaWV3LFxuICAgICAgZHJhZ0ZyZWUsXG4gICAgICBkcmFnVGhyZXNob2xkLFxuICAgICAgc2tpcFNuYXBzLFxuICAgICAgZnJpY3Rpb24sXG4gICAgICB3YXRjaERyYWdcbiAgICApLFxuICAgIGV2ZW50U3RvcmUsXG4gICAgcGVyY2VudE9mVmlldyxcbiAgICBpbmRleCxcbiAgICBpbmRleFByZXZpb3VzLFxuICAgIGxpbWl0LFxuICAgIGxvY2F0aW9uLFxuICAgIG9mZnNldExvY2F0aW9uLFxuICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgb3B0aW9ucyxcbiAgICByZXNpemVIYW5kbGVyOiBSZXNpemVIYW5kbGVyKFxuICAgICAgY29udGFpbmVyLFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBzbGlkZXMsXG4gICAgICBheGlzLFxuICAgICAgd2F0Y2hSZXNpemUsXG4gICAgICBub2RlUmVjdHNcbiAgICApLFxuICAgIHNjcm9sbEJvZHksXG4gICAgc2Nyb2xsQm91bmRzOiBTY3JvbGxCb3VuZHMoXG4gICAgICBsaW1pdCxcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgdGFyZ2V0LFxuICAgICAgc2Nyb2xsQm9keSxcbiAgICAgIHBlcmNlbnRPZlZpZXdcbiAgICApLFxuICAgIHNjcm9sbExvb3BlcjogU2Nyb2xsTG9vcGVyKGNvbnRlbnRTaXplLCBsaW1pdCwgb2Zmc2V0TG9jYXRpb24sIFtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgICAgdGFyZ2V0XG4gICAgXSksXG4gICAgc2Nyb2xsUHJvZ3Jlc3MsXG4gICAgc2Nyb2xsU25hcExpc3Q6IHNjcm9sbFNuYXBzLm1hcChzY3JvbGxQcm9ncmVzcy5nZXQpLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICBzY3JvbGxUbyxcbiAgICBzbGlkZUxvb3BlcjogU2xpZGVMb29wZXIoXG4gICAgICBheGlzLFxuICAgICAgdmlld1NpemUsXG4gICAgICBjb250ZW50U2l6ZSxcbiAgICAgIHNsaWRlU2l6ZXMsXG4gICAgICBzbGlkZVNpemVzV2l0aEdhcHMsXG4gICAgICBzbmFwcyxcbiAgICAgIHNjcm9sbFNuYXBzLFxuICAgICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgICBzbGlkZXNcbiAgICApLFxuICAgIHNsaWRlRm9jdXMsXG4gICAgc2xpZGVzSGFuZGxlcjogU2xpZGVzSGFuZGxlcihjb250YWluZXIsIGV2ZW50SGFuZGxlciwgd2F0Y2hTbGlkZXMpLFxuICAgIHNsaWRlc0luVmlldyxcbiAgICBzbGlkZUluZGV4ZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICB0YXJnZXQsXG4gICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgY29udGFpbmVyKVxuICB9XG5cbiAgcmV0dXJuIGVuZ2luZVxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5cbnR5cGUgQ2FsbGJhY2tUeXBlID0gKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSwgZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gdm9pZFxudHlwZSBMaXN0ZW5lcnNUeXBlID0gUGFydGlhbDx7IFtrZXkgaW4gRW1ibGFFdmVudFR5cGVdOiBDYWxsYmFja1R5cGVbXSB9PlxuXG5leHBvcnQgdHlwZSBFbWJsYUV2ZW50VHlwZSA9IEVtYmxhRXZlbnRMaXN0VHlwZVtrZXlvZiBFbWJsYUV2ZW50TGlzdFR5cGVdXG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1ibGFFdmVudExpc3RUeXBlIHtcbiAgaW5pdDogJ2luaXQnXG4gIHBvaW50ZXJEb3duOiAncG9pbnRlckRvd24nXG4gIHBvaW50ZXJVcDogJ3BvaW50ZXJVcCdcbiAgc2xpZGVzQ2hhbmdlZDogJ3NsaWRlc0NoYW5nZWQnXG4gIHNsaWRlc0luVmlldzogJ3NsaWRlc0luVmlldydcbiAgc2Nyb2xsOiAnc2Nyb2xsJ1xuICBzZWxlY3Q6ICdzZWxlY3QnXG4gIHNldHRsZTogJ3NldHRsZSdcbiAgZGVzdHJveTogJ2Rlc3Ryb3knXG4gIHJlSW5pdDogJ3JlSW5pdCdcbiAgcmVzaXplOiAncmVzaXplJ1xuICBzbGlkZUZvY3VzOiAnc2xpZGVGb2N1cydcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBlbWl0OiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBvbjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb2ZmOiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCk6IEV2ZW50SGFuZGxlclR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBMaXN0ZW5lcnNUeXBlID0ge31cbiAgbGV0IGFwaTogRW1ibGFDYXJvdXNlbFR5cGVcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGFwaSA9IGVtYmxhQXBpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IENhbGxiYWNrVHlwZVtdIHtcbiAgICByZXR1cm4gbGlzdGVuZXJzW2V2dF0gfHwgW11cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGdldExpc3RlbmVycyhldnQpLmZvckVhY2goKGUpID0+IGUoYXBpLCBldnQpKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBvbihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5jb25jYXQoW2NiXSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBsaXN0ZW5lcnNbZXZ0XSA9IGdldExpc3RlbmVycyhldnQpLmZpbHRlcigoZSkgPT4gZSAhPT0gY2IpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IHt9XG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudEhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZW1pdCxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50T3B0aW9uVHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUsIEF4aXNPcHRpb25UeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgRHJhZ0hhbmRsZXJPcHRpb25UeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlIH0gZnJvbSAnLi9SZXNpemVIYW5kbGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlck9wdGlvblR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4vU2xpZGVzSW5WaWV3J1xuXG5leHBvcnQgdHlwZSBMb29zZU9wdGlvbnNUeXBlID0ge1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duXG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZU9wdGlvbnNUeXBlPFR5cGUgZXh0ZW5kcyBMb29zZU9wdGlvbnNUeXBlPiA9IFR5cGUgJiB7XG4gIGFjdGl2ZTogYm9vbGVhblxuICBicmVha3BvaW50czoge1xuICAgIFtrZXk6IHN0cmluZ106IE9taXQ8UGFydGlhbDxDcmVhdGVPcHRpb25zVHlwZTxUeXBlPj4sICdicmVha3BvaW50cyc+XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgT3B0aW9uc1R5cGUgPSBDcmVhdGVPcHRpb25zVHlwZTx7XG4gIGFsaWduOiBBbGlnbm1lbnRPcHRpb25UeXBlXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlXG4gIGNvbnRhaW5lcjogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBudWxsXG4gIHNsaWRlczogc3RyaW5nIHwgSFRNTEVsZW1lbnRbXSB8IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+IHwgbnVsbFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZVxuICBkaXJlY3Rpb246IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGVcbiAgZHJhZ0ZyZWU6IGJvb2xlYW5cbiAgZHJhZ1RocmVzaG9sZDogbnVtYmVyXG4gIGluVmlld1RocmVzaG9sZDogU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGVcbiAgbG9vcDogYm9vbGVhblxuICBza2lwU25hcHM6IGJvb2xlYW5cbiAgZHVyYXRpb246IG51bWJlclxuICBzdGFydEluZGV4OiBudW1iZXJcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbiAgd2F0Y2hSZXNpemU6IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlXG4gIHdhdGNoU2xpZGVzOiBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZVxufT5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBPcHRpb25zVHlwZSA9IHtcbiAgYWxpZ246ICdjZW50ZXInLFxuICBheGlzOiAneCcsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgc2xpZGVzOiBudWxsLFxuICBjb250YWluU2Nyb2xsOiAndHJpbVNuYXBzJyxcbiAgZGlyZWN0aW9uOiAnbHRyJyxcbiAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gIGluVmlld1RocmVzaG9sZDogMCxcbiAgYnJlYWtwb2ludHM6IHt9LFxuICBkcmFnRnJlZTogZmFsc2UsXG4gIGRyYWdUaHJlc2hvbGQ6IDEwLFxuICBsb29wOiBmYWxzZSxcbiAgc2tpcFNuYXBzOiBmYWxzZSxcbiAgZHVyYXRpb246IDI1LFxuICBzdGFydEluZGV4OiAwLFxuICBhY3RpdmU6IHRydWUsXG4gIHdhdGNoRHJhZzogdHJ1ZSxcbiAgd2F0Y2hSZXNpemU6IHRydWUsXG4gIHdhdGNoU2xpZGVzOiB0cnVlXG59XG5cbmV4cG9ydCB0eXBlIEVtYmxhT3B0aW9uc1R5cGUgPSBQYXJ0aWFsPE9wdGlvbnNUeXBlPlxuIiwiaW1wb3J0IHsgTG9vc2VPcHRpb25zVHlwZSwgQ3JlYXRlT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBvYmplY3RLZXlzLCBvYmplY3RzTWVyZ2VEZWVwLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBPcHRpb25zVHlwZSA9IFBhcnRpYWw8Q3JlYXRlT3B0aW9uc1R5cGU8TG9vc2VPcHRpb25zVHlwZT4+XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNIYW5kbGVyVHlwZSA9IHtcbiAgbWVyZ2VPcHRpb25zOiA8VHlwZUEgZXh0ZW5kcyBPcHRpb25zVHlwZSwgVHlwZUIgZXh0ZW5kcyBPcHRpb25zVHlwZT4oXG4gICAgb3B0aW9uc0E6IFR5cGVBLFxuICAgIG9wdGlvbnNCPzogVHlwZUJcbiAgKSA9PiBUeXBlQVxuICBvcHRpb25zQXRNZWRpYTogPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSkgPT4gVHlwZVxuICBvcHRpb25zTWVkaWFRdWVyaWVzOiAob3B0aW9uc0xpc3Q6IE9wdGlvbnNUeXBlW10pID0+IE1lZGlhUXVlcnlMaXN0W11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbnNIYW5kbGVyKG93bmVyV2luZG93OiBXaW5kb3dUeXBlKTogT3B0aW9uc0hhbmRsZXJUeXBlIHtcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICk6IFR5cGVBIHtcbiAgICByZXR1cm4gPFR5cGVBPm9iamVjdHNNZXJnZURlZXAob3B0aW9uc0EsIG9wdGlvbnNCIHx8IHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc0F0TWVkaWE8VHlwZSBleHRlbmRzIE9wdGlvbnNUeXBlPihvcHRpb25zOiBUeXBlKTogVHlwZSB7XG4gICAgY29uc3Qgb3B0aW9uc0F0TWVkaWEgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9XG4gICAgY29uc3QgbWF0Y2hlZE1lZGlhT3B0aW9ucyA9IG9iamVjdEtleXMob3B0aW9uc0F0TWVkaWEpXG4gICAgICAuZmlsdGVyKChtZWRpYSkgPT4gb3duZXJXaW5kb3cubWF0Y2hNZWRpYShtZWRpYSkubWF0Y2hlcylcbiAgICAgIC5tYXAoKG1lZGlhKSA9PiBvcHRpb25zQXRNZWRpYVttZWRpYV0pXG4gICAgICAucmVkdWNlKChhLCBtZWRpYU9wdGlvbikgPT4gbWVyZ2VPcHRpb25zKGEsIG1lZGlhT3B0aW9uKSwge30pXG5cbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIG1hdGNoZWRNZWRpYU9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25zTWVkaWFRdWVyaWVzKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKTogTWVkaWFRdWVyeUxpc3RbXSB7XG4gICAgcmV0dXJuIG9wdGlvbnNMaXN0XG4gICAgICAubWFwKChvcHRpb25zKSA9PiBvYmplY3RLZXlzKG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge30pKVxuICAgICAgLnJlZHVjZSgoYWNjLCBtZWRpYVF1ZXJpZXMpID0+IGFjYy5jb25jYXQobWVkaWFRdWVyaWVzKSwgW10pXG4gICAgICAubWFwKG93bmVyV2luZG93Lm1hdGNoTWVkaWEpXG4gIH1cblxuICBjb25zdCBzZWxmOiBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gICAgbWVyZ2VPcHRpb25zLFxuICAgIG9wdGlvbnNBdE1lZGlhLFxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlclR5cGUgfSBmcm9tICcuL09wdGlvbnNIYW5kbGVyJ1xuaW1wb3J0IHsgRW1ibGFQbHVnaW5zVHlwZSwgRW1ibGFQbHVnaW5UeXBlIH0gZnJvbSAnLi9QbHVnaW5zJ1xuXG5leHBvcnQgdHlwZSBQbHVnaW5zSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChcbiAgICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgcGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW11cbiAgKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsdWdpbnNIYW5kbGVyKFxuICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4pOiBQbHVnaW5zSGFuZGxlclR5cGUge1xuICBsZXQgYWN0aXZlUGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBwbHVnaW5zLmZpbHRlcihcbiAgICAgICh7IG9wdGlvbnMgfSkgPT4gb3B0aW9uc0hhbmRsZXIub3B0aW9uc0F0TWVkaWEob3B0aW9ucykuYWN0aXZlICE9PSBmYWxzZVxuICAgIClcbiAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmluaXQoZW1ibGFBcGksIG9wdGlvbnNIYW5kbGVyKSlcblxuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZShcbiAgICAgIChtYXAsIHBsdWdpbikgPT4gT2JqZWN0LmFzc2lnbihtYXAsIHsgW3BsdWdpbi5uYW1lXTogcGx1Z2luIH0pLFxuICAgICAge31cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBhY3RpdmVQbHVnaW5zLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmUsIEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXIsIEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zLCBFbWJsYU9wdGlvbnNUeXBlLCBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IFBsdWdpbnNIYW5kbGVyIH0gZnJvbSAnLi9QbHVnaW5zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcbmltcG9ydCB7IGlzU3RyaW5nLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gIGNhblNjcm9sbE5leHQ6ICgpID0+IGJvb2xlYW5cbiAgY2FuU2Nyb2xsUHJldjogKCkgPT4gYm9vbGVhblxuICBjb250YWluZXJOb2RlOiAoKSA9PiBIVE1MRWxlbWVudFxuICBpbnRlcm5hbEVuZ2luZTogKCkgPT4gRW5naW5lVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIG9mZjogRXZlbnRIYW5kbGVyVHlwZVsnb2ZmJ11cbiAgb246IEV2ZW50SGFuZGxlclR5cGVbJ29uJ11cbiAgZW1pdDogRXZlbnRIYW5kbGVyVHlwZVsnZW1pdCddXG4gIHBsdWdpbnM6ICgpID0+IEVtYmxhUGx1Z2luc1R5cGVcbiAgcHJldmlvdXNTY3JvbGxTbmFwOiAoKSA9PiBudW1iZXJcbiAgcmVJbml0OiAob3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsIHBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXSkgPT4gdm9pZFxuICByb290Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgc2Nyb2xsTmV4dDogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNjcm9sbFByZXY6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcm9ncmVzczogKCkgPT4gbnVtYmVyXG4gIHNjcm9sbFNuYXBMaXN0OiAoKSA9PiBudW1iZXJbXVxuICBzY3JvbGxUbzogKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNlbGVjdGVkU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHNsaWRlTm9kZXM6ICgpID0+IEhUTUxFbGVtZW50W11cbiAgc2xpZGVzSW5WaWV3OiAoKSA9PiBudW1iZXJbXVxuICBzbGlkZXNOb3RJblZpZXc6ICgpID0+IG51bWJlcltdXG59XG5cbmZ1bmN0aW9uIEVtYmxhQ2Fyb3VzZWwoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICB1c2VyT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gIHVzZXJQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbik6IEVtYmxhQ2Fyb3VzZWxUeXBlIHtcbiAgY29uc3Qgb3duZXJEb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudFxuICBjb25zdCBvd25lcldpbmRvdyA9IDxXaW5kb3dUeXBlPm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgY29uc3Qgb3B0aW9uc0hhbmRsZXIgPSBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdylcbiAgY29uc3QgcGx1Z2luc0hhbmRsZXIgPSBQbHVnaW5zSGFuZGxlcihvcHRpb25zSGFuZGxlcilcbiAgY29uc3QgbWVkaWFIYW5kbGVycyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBldmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXIoKVxuICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEsIG9wdGlvbnNNZWRpYVF1ZXJpZXMgfSA9IG9wdGlvbnNIYW5kbGVyXG4gIGNvbnN0IHsgb24sIG9mZiwgZW1pdCB9ID0gZXZlbnRIYW5kbGVyXG4gIGNvbnN0IHJlSW5pdCA9IHJlQWN0aXZhdGVcblxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcbiAgbGV0IGVuZ2luZTogRW5naW5lVHlwZVxuICBsZXQgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIEVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucylcbiAgbGV0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UpXG4gIGxldCBwbHVnaW5MaXN0OiBFbWJsYVBsdWdpblR5cGVbXSA9IFtdXG4gIGxldCBwbHVnaW5BcGlzOiBFbWJsYVBsdWdpbnNUeXBlXG5cbiAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgbGV0IHNsaWRlczogSFRNTEVsZW1lbnRbXVxuXG4gIGZ1bmN0aW9uIHN0b3JlRWxlbWVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXI6IHVzZXJDb250YWluZXIsIHNsaWRlczogdXNlclNsaWRlcyB9ID0gb3B0aW9uc1xuXG4gICAgY29uc3QgY3VzdG9tQ29udGFpbmVyID0gaXNTdHJpbmcodXNlckNvbnRhaW5lcilcbiAgICAgID8gcm9vdC5xdWVyeVNlbGVjdG9yKHVzZXJDb250YWluZXIpXG4gICAgICA6IHVzZXJDb250YWluZXJcbiAgICBjb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+KGN1c3RvbUNvbnRhaW5lciB8fCByb290LmNoaWxkcmVuWzBdKVxuXG4gICAgY29uc3QgY3VzdG9tU2xpZGVzID0gaXNTdHJpbmcodXNlclNsaWRlcylcbiAgICAgID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodXNlclNsaWRlcylcbiAgICAgIDogdXNlclNsaWRlc1xuICAgIHNsaWRlcyA9IDxIVE1MRWxlbWVudFtdPltdLnNsaWNlLmNhbGwoY3VzdG9tU2xpZGVzIHx8IGNvbnRhaW5lci5jaGlsZHJlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVuZ2luZShvcHRpb25zOiBPcHRpb25zVHlwZSk6IEVuZ2luZVR5cGUge1xuICAgIGNvbnN0IGVuZ2luZSA9IEVuZ2luZShcbiAgICAgIHJvb3QsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzbGlkZXMsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBvcHRpb25zLFxuICAgICAgZXZlbnRIYW5kbGVyXG4gICAgKVxuXG4gICAgaWYgKG9wdGlvbnMubG9vcCAmJiAhZW5naW5lLnNsaWRlTG9vcGVyLmNhbkxvb3AoKSkge1xuICAgICAgY29uc3Qgb3B0aW9uc1dpdGhvdXRMb29wID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBsb29wOiBmYWxzZSB9KVxuICAgICAgcmV0dXJuIGNyZWF0ZUVuZ2luZShvcHRpb25zV2l0aG91dExvb3ApXG4gICAgfVxuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHdpdGhPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShvcHRpb25zQmFzZSlcbiAgICBwbHVnaW5MaXN0ID0gd2l0aFBsdWdpbnMgfHwgcGx1Z2luTGlzdFxuXG4gICAgc3RvcmVFbGVtZW50cygpXG5cbiAgICBlbmdpbmUgPSBjcmVhdGVFbmdpbmUob3B0aW9ucylcblxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXMoW1xuICAgICAgb3B0aW9uc0Jhc2UsXG4gICAgICAuLi5wbHVnaW5MaXN0Lm1hcCgoeyBvcHRpb25zIH0pID0+IG9wdGlvbnMpXG4gICAgXSkuZm9yRWFjaCgocXVlcnkpID0+IG1lZGlhSGFuZGxlcnMuYWRkKHF1ZXJ5LCAnY2hhbmdlJywgcmVBY3RpdmF0ZSkpXG5cbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlKSByZXR1cm5cblxuICAgIGVuZ2luZS50cmFuc2xhdGUudG8oZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICAgIGVuZ2luZS5hbmltYXRpb24uaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5pbml0KClcbiAgICBlbmdpbmUuc2xpZGVGb2N1cy5pbml0KClcbiAgICBlbmdpbmUuZXZlbnRIYW5kbGVyLmluaXQoc2VsZilcbiAgICBlbmdpbmUucmVzaXplSGFuZGxlci5pbml0KHNlbGYpXG4gICAgZW5naW5lLnNsaWRlc0hhbmRsZXIuaW5pdChzZWxmKVxuXG4gICAgaWYgKGVuZ2luZS5vcHRpb25zLmxvb3ApIGVuZ2luZS5zbGlkZUxvb3Blci5sb29wKClcbiAgICBpZiAoY29udGFpbmVyLm9mZnNldFBhcmVudCAmJiBzbGlkZXMubGVuZ3RoKSBlbmdpbmUuZHJhZ0hhbmRsZXIuaW5pdChzZWxmKVxuXG4gICAgcGx1Z2luQXBpcyA9IHBsdWdpbnNIYW5kbGVyLmluaXQoc2VsZiwgcGx1Z2luTGlzdClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlQWN0aXZhdGUoXG4gICAgd2l0aE9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICAgIHdpdGhQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gICAgZGVBY3RpdmF0ZSgpXG4gICAgYWN0aXZhdGUobWVyZ2VPcHRpb25zKHsgc3RhcnRJbmRleCB9LCB3aXRoT3B0aW9ucyksIHdpdGhQbHVnaW5zKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZUluaXQnKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVBY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICBlbmdpbmUuZHJhZ0hhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLmV2ZW50U3RvcmUuY2xlYXIoKVxuICAgIGVuZ2luZS50cmFuc2xhdGUuY2xlYXIoKVxuICAgIGVuZ2luZS5zbGlkZUxvb3Blci5jbGVhcigpXG4gICAgZW5naW5lLnJlc2l6ZUhhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLnNsaWRlc0hhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5kZXN0cm95KClcbiAgICBlbmdpbmUuYW5pbWF0aW9uLmRlc3Ryb3koKVxuICAgIHBsdWdpbnNIYW5kbGVyLmRlc3Ryb3koKVxuICAgIG1lZGlhSGFuZGxlcnMuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gICAgbWVkaWFIYW5kbGVycy5jbGVhcigpXG4gICAgZGVBY3RpdmF0ZSgpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ2Rlc3Ryb3knKVxuICAgIGV2ZW50SGFuZGxlci5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUbyhpbmRleDogbnVtYmVyLCBqdW1wPzogYm9vbGVhbiwgZGlyZWN0aW9uPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFvcHRpb25zLmFjdGl2ZSB8fCBkZXN0cm95ZWQpIHJldHVyblxuICAgIGVuZ2luZS5zY3JvbGxCb2R5XG4gICAgICAudXNlQmFzZUZyaWN0aW9uKClcbiAgICAgIC51c2VEdXJhdGlvbihqdW1wID09PSB0cnVlID8gMCA6IG9wdGlvbnMuZHVyYXRpb24pXG4gICAgZW5naW5lLnNjcm9sbFRvLmluZGV4KGluZGV4LCBkaXJlY3Rpb24gfHwgMClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbE5leHQoanVtcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0ID0gZW5naW5lLmluZGV4LmFkZCgxKS5nZXQoKVxuICAgIHNjcm9sbFRvKG5leHQsIGp1bXAsIC0xKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJldihqdW1wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSBlbmdpbmUuaW5kZXguYWRkKC0xKS5nZXQoKVxuICAgIHNjcm9sbFRvKHByZXYsIGp1bXAsIDEpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5TY3JvbGxOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5leHQgPSBlbmdpbmUuaW5kZXguYWRkKDEpLmdldCgpXG4gICAgcmV0dXJuIG5leHQgIT09IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5TY3JvbGxQcmV2KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByZXYgPSBlbmdpbmUuaW5kZXguYWRkKC0xKS5nZXQoKVxuICAgIHJldHVybiBwcmV2ICE9PSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsU25hcExpc3QoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2Nyb2xsU25hcExpc3RcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFByb2dyZXNzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5zY3JvbGxQcm9ncmVzcy5nZXQoZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0ZWRTY3JvbGxTbmFwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5pbmRleC5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTY3JvbGxTbmFwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5pbmRleFByZXZpb3VzLmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJblZpZXcoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2xpZGVzSW5WaWV3LmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNOb3RJblZpZXcoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2xpZGVzSW5WaWV3LmdldChmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsdWdpbnMoKTogRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgcmV0dXJuIHBsdWdpbkFwaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVybmFsRW5naW5lKCk6IEVuZ2luZVR5cGUge1xuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIHJvb3ROb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gcm9vdFxuICB9XG5cbiAgZnVuY3Rpb24gY29udGFpbmVyTm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVOb2RlcygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gc2xpZGVzXG4gIH1cblxuICBjb25zdCBzZWxmOiBFbWJsYUNhcm91c2VsVHlwZSA9IHtcbiAgICBjYW5TY3JvbGxOZXh0LFxuICAgIGNhblNjcm9sbFByZXYsXG4gICAgY29udGFpbmVyTm9kZSxcbiAgICBpbnRlcm5hbEVuZ2luZSxcbiAgICBkZXN0cm95LFxuICAgIG9mZixcbiAgICBvbixcbiAgICBlbWl0LFxuICAgIHBsdWdpbnMsXG4gICAgcHJldmlvdXNTY3JvbGxTbmFwLFxuICAgIHJlSW5pdCxcbiAgICByb290Tm9kZSxcbiAgICBzY3JvbGxOZXh0LFxuICAgIHNjcm9sbFByZXYsXG4gICAgc2Nyb2xsUHJvZ3Jlc3MsXG4gICAgc2Nyb2xsU25hcExpc3QsXG4gICAgc2Nyb2xsVG8sXG4gICAgc2VsZWN0ZWRTY3JvbGxTbmFwLFxuICAgIHNsaWRlTm9kZXMsXG4gICAgc2xpZGVzSW5WaWV3LFxuICAgIHNsaWRlc05vdEluVmlld1xuICB9XG5cbiAgYWN0aXZhdGUodXNlck9wdGlvbnMsIHVzZXJQbHVnaW5zKVxuICBzZXRUaW1lb3V0KCgpID0+IGV2ZW50SGFuZGxlci5lbWl0KCdpbml0JyksIDApXG4gIHJldHVybiBzZWxmXG59XG5cbmRlY2xhcmUgbmFtZXNwYWNlIEVtYmxhQ2Fyb3VzZWwge1xuICBsZXQgZ2xvYmFsT3B0aW9uczogRW1ibGFPcHRpb25zVHlwZSB8IHVuZGVmaW5lZFxufVxuXG5FbWJsYUNhcm91c2VsLmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWRcblxuZXhwb3J0IGRlZmF1bHQgRW1ibGFDYXJvdXNlbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1ibGFDYXJvdXNlbCBmcm9tICdlbWJsYS1jYXJvdXNlbCc7XG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzUGx1Z2luIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMnO1xuaW1wb3J0IEZhZGUgZnJvbSAnZW1ibGEtY2Fyb3VzZWwtZmFkZSc7XG5pbXBvcnQge1xuICAgIGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMsXG4gICAgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlLFxuICAgIGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnNcbn0gZnJvbSAnLi9idXR0b25zLmVzNic7XG5cbmNsYXNzIFlURHluYW1pY3NHYWxsZXJ5IHtcbiAgICBpbml0KGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBPUFRJT05TID0ge1xuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBPUFRJT05TX1RIVU1CUyA9IHtcbiAgICAgICAgICAgIGFsaWduOiAnc3RhcnQnLFxuICAgICAgICAgICAgYXhpczogJ3knLFxuICAgICAgICAgICAgZHJhZ0ZyZWU6IHRydWUsXG4gICAgICAgICAgICBsb29wOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICBwcmV2VGh1bWJCdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ByZXYnKSxcbiAgICAgICAgICAgIG5leHRUaHVtYkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fbmV4dCcpLFxuICAgICAgICAgICAgZW1ibGFNYWluID0gRW1ibGFDYXJvdXNlbCh2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwsIE9QVElPTlMsIFtGYWRlKCldKSxcbiAgICAgICAgICAgIGVtYmxhVGh1bWIgPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwsIE9QVElPTlNfVEhVTUJTLCBbV2hlZWxHZXN0dXJlc1BsdWdpbigpXSlcblxuICAgICAgICBsZXQgcmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyA9IGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMoZW1ibGFNYWluLCBlbWJsYVRodW1iKSxcbiAgICAgICAgICAgIHJlbW92ZVRvZ2dsZVRodW1iQnRuc0FjdGl2ZSA9IGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZShlbWJsYU1haW4sIGVtYmxhVGh1bWIpLFxuICAgICAgICAgICAgcmVtb3ZlVGh1bWJQcmV2TmV4dEJ0bnNDbGlja0hhbmRsZXJzID0gYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyhlbWJsYVRodW1iLCBwcmV2VGh1bWJCdG5Ob2RlLCBuZXh0VGh1bWJCdG5Ob2RlKTtcblxuICAgICAgICBlbWJsYU1haW5cbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUaHVtYlByZXZOZXh0QnRuc0NsaWNrSGFuZGxlcnMpO1xuXG4gICAgICAgIGVtYmxhVGh1bWJcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUaHVtYlByZXZOZXh0QnRuc0NsaWNrSGFuZGxlcnMpO1xuICAgIH1cbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBybXNsaWRlc2hvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm1zbGlkZXNob3cnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm1zbGlkZXNob3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIChuZXcgWVREeW5hbWljc0dhbGxlcnkpLmluaXQocm1zbGlkZXNob3dzW2ldKTtcbiAgICB9XG59KTsiXSwibmFtZXMiOlsiZGVmYXVsdE9wdGlvbnMiLCJhY3RpdmUiLCJicmVha3BvaW50cyIsIndoZWVsRHJhZ2dpbmdDbGFzcyIsImZvcmNlV2hlZWxBeGlzIiwidW5kZWZpbmVkIiwidGFyZ2V0IiwiV2hlZWxHZXN0dXJlc1BsdWdpbiIsImdsb2JhbE9wdGlvbnMiLCJfX0RFVl9fIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidXNlck9wdGlvbnMiLCJvcHRpb25zIiwiY2xlYW51cCIsImluaXQiLCJlbWJsYSIsIm9wdGlvbnNIYW5kbGVyIiwibWVyZ2VPcHRpb25zIiwib3B0aW9uc0F0TWVkaWEiLCJvcHRpb25zQmFzZSIsImFsbE9wdGlvbnMiLCJlbmdpbmUiLCJpbnRlcm5hbEVuZ2luZSIsInRhcmdldE5vZGUiLCJfb3B0aW9ucyR0YXJnZXQiLCJjb250YWluZXJOb2RlIiwicGFyZW50Tm9kZSIsIndoZWVsQXhpcyIsIl9vcHRpb25zJGZvcmNlV2hlZWxBeCIsImF4aXMiLCJ3aGVlbEdlc3R1cmVzIiwiV2hlZWxHZXN0dXJlcyIsInByZXZlbnRXaGVlbEFjdGlvbiIsInJldmVyc2VTaWduIiwidW5vYnNlcnZlVGFyZ2V0Tm9kZSIsIm9ic2VydmUiLCJvZmZXaGVlbCIsIm9uIiwiaGFuZGxlV2hlZWwiLCJpc1N0YXJ0ZWQiLCJzdGFydEV2ZW50Iiwid2hlZWxHZXN0dXJlU3RhcnRlZCIsInN0YXRlIiwiTW91c2VFdmVudCIsImV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImUiLCJjb25zb2xlIiwid2FybiIsImFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aGVlbEdlc3R1cmVFbmRlZCIsImNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCIsInJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzVHJ1c3RlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInR5cGUiLCJtb3ZlWCIsIm1vdmVZIiwiX3N0YXRlJGF4aXNNb3ZlbWVudCIsImF4aXNNb3ZlbWVudCIsIl9zdGF0ZSRheGlzTW92ZW1lbnQyIiwic2tpcFNuYXBzIiwiZHJhZ0ZyZWUiLCJtYXhYIiwiY29udGFpbmVyUmVjdCIsIndpZHRoIiwibWF4WSIsImhlaWdodCIsIk1hdGgiLCJtYXgiLCJtaW4iLCJjbGllbnRYIiwiY2xpZW50WSIsInNjcmVlblgiLCJzY3JlZW5ZIiwibW92ZW1lbnRYIiwibW92ZW1lbnRZIiwiYnV0dG9uIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJjb21wb3NlZCIsImF4aXNEZWx0YSIsImRlbHRhWCIsIl9zdGF0ZSRheGlzRGVsdGEiLCJkZWx0YVkiLCJwcmltYXJ5QXhpc0RlbHRhIiwiY3Jvc3NBeGlzRGVsdGEiLCJpc1JlbGVhc2UiLCJpc01vbWVudHVtIiwicHJldmlvdXMiLCJpc0VuZGluZ09yUmVsZWFzZSIsImlzRW5kaW5nIiwicHJpbWFyeUF4aXNEZWx0YUlzRG9taW5hbnQiLCJhYnMiLCJzZWxmIiwibmFtZSIsImRlc3Ryb3kiLCJERUNBWSIsInByb2plY3Rpb24iLCJ2ZWxvY2l0eVB4TXMiLCJkZWNheSIsImxhc3RPZiIsImFycmF5IiwibGVuZ3RoIiwiYXZlcmFnZSIsIm51bWJlcnMiLCJyZWR1Y2UiLCJhIiwiYiIsImNsYW1wIiwidmFsdWUiLCJhZGRWZWN0b3JzIiwidjEiLCJ2MiIsIkVycm9yIiwibWFwIiwidmFsIiwiaSIsImFic01heCIsImFwcGx5IiwiZGVlcEZyZWV6ZSIsIm8iLCJPYmplY3QiLCJmcmVlemUiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwiaXNGcm96ZW4iLCJFdmVudEJ1cyIsImxpc3RlbmVycyIsImxpc3RlbmVyIiwiY29uY2F0Iiwib2ZmIiwiZmlsdGVyIiwibCIsImRpc3BhdGNoIiwiZGF0YSIsIldoZWVsVGFyZ2V0T2JzZXJ2ZXIiLCJldmVudExpc3RlbmVyIiwidGFyZ2V0cyIsInBhc3NpdmUiLCJwdXNoIiwidW5vYnNlcnZlIiwidCIsImRpc2Nvbm5lY3QiLCJMSU5FX0hFSUdIVCIsIlBBR0VfSEVJR0hUIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJERUxUQV9NT0RFX1VOSVQiLCJub3JtYWxpemVXaGVlbCIsImRlbHRhTW9kZSIsImRlbHRhWiIsInRpbWVTdGFtcCIsInJldmVyc2VBbGwiLCJyZXZlcnNlQXhpc0RlbHRhU2lnbiIsIndoZWVsIiwibXVsdGlwbGllcnMiLCJzaG91bGRSZXZlcnNlIiwiX2V4dGVuZHMiLCJkZWx0YSIsIkRFTFRBX01BWF9BQlMiLCJjbGFtcEF4aXNEZWx0YSIsIkFDQ19GQUNUT1JfTUlOIiwiQUNDX0ZBQ1RPUl9NQVgiLCJXSEVFTEVWRU5UU19UT19NRVJHRSIsIldIRUVMRVZFTlRTX1RPX0FOQUxBWkUiLCJjb25maWdEZWZhdWx0cyIsIldJTExfRU5EX1RJTUVPVVRfREVGQVVMVCIsImNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSIsImlzU3RhcnRQdWJsaXNoZWQiLCJzdGFydFRpbWUiLCJsYXN0QWJzRGVsdGEiLCJJbmZpbml0eSIsImF4aXNWZWxvY2l0eSIsImFjY2VsZXJhdGlvbkZhY3RvcnMiLCJzY3JvbGxQb2ludHMiLCJzY3JvbGxQb2ludHNUb01lcmdlIiwid2lsbEVuZFRpbWVvdXQiLCJvcHRpb25zUGFyYW0iLCJfRXZlbnRCdXMiLCJjb25maWciLCJjdXJyZW50RXZlbnQiLCJuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCIsInByZXZXaGVlbEV2ZW50U3RhdGUiLCJmZWVkV2hlZWwiLCJ3aGVlbEV2ZW50cyIsIkFycmF5IiwiaXNBcnJheSIsIndoZWVsRXZlbnQiLCJwcm9jZXNzV2hlZWxFdmVudERhdGEiLCJ1cGRhdGVPcHRpb25zIiwibmV3T3B0aW9ucyIsInNvbWUiLCJvcHRpb24iLCJlcnJvciIsInB1Ymxpc2hXaGVlbCIsImFkZGl0aW9uYWxEYXRhIiwid2hlZWxFdmVudFN0YXRlIiwiaXNTdGFydCIsImlzTW9tZW50dW1DYW5jZWwiLCJheGlzTW92ZW1lbnRQcm9qZWN0aW9uIiwidmVsb2NpdHkiLCJzaG91bGRQcmV2ZW50RGVmYXVsdCIsImRlbHRhTWF4QWJzIiwiX2NvbmZpZyIsIl9jbGFtcEF4aXNEZWx0YSIsInByZXZlbnREZWZhdWx0Iiwic3RhcnQiLCJlbmQiLCJpcyIsIm1lcmdlU2Nyb2xsUG9pbnRzQ2FsY1ZlbG9jaXR5Iiwid2lsbEVuZCIsInVuc2hpZnQiLCJheGlzRGVsdGFTdW0iLCJ1cGRhdGVWZWxvY2l0eSIsImRldGVjdE1vbWVudHVtIiwidXBkYXRlU3RhcnRWZWxvY2l0eSIsImQiLCJsYXRlc3RTY3JvbGxQb2ludCIsIl9zdGF0ZSRzY3JvbGxQb2ludHMiLCJwcmV2U2Nyb2xsUG9pbnQiLCJkZWx0YVRpbWUiLCJhY2NlbGVyYXRpb25GYWN0b3IiLCJ2IiwidXBkYXRlV2lsbEVuZFRpbWVvdXQiLCJuZXdUaW1lb3V0IiwiY2VpbCIsInJvdW5kIiwiYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlIiwiYWNjRmFjdG9yIiwicmVjb2duaXplZE1vbWVudHVtIiwicmVjZW50QWNjZWxlcmF0aW9uRmFjdG9ycyIsInNsaWNlIiwiZGV0ZWN0ZWRNb21lbnR1bSIsImV2ZXJ5IiwiYWNjRmFjIiwic2FtZUFjY0ZhYyIsImYxIiwiZjIiLCJib3RoQXJlSW5SYW5nZU9yWmVybyIsIkRhdGUiLCJub3ciLCJ3aWxsRW5kSWQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiX1doZWVsVGFyZ2V0T2JzZXJ2ZXIiLCJhZGRUaHVtYkJ1dHRvbnNDbGlja0hhbmRsZXJzIiwiZW1ibGFBcGlNYWluIiwiZW1ibGFBcGlUaHVtYiIsInNsaWRlc1RodW1icyIsInNsaWRlTm9kZXMiLCJzY3JvbGxUb0luZGV4IiwiXyIsImluZGV4Iiwic2Nyb2xsVG8iLCJzbGlkZU5vZGUiLCJhZGRUb2dnbGVUaHVtYkJ1dHRvbnNBY3RpdmUiLCJ0b2dnbGVUaHVtYkJ0bnNTdGF0ZSIsInNlbGVjdGVkU2Nyb2xsU25hcCIsInByZXZpb3VzU2Nyb2xsU25hcCIsInNlbGVjdGVkIiwiYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpIiwicHJldkJ0biIsIm5leHRCdG4iLCJzY3JvbGxQcmV2Iiwic2Nyb2xsTmV4dCIsInJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsImFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsInRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlIiwiY2FuU2Nyb2xsUHJldiIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImNhblNjcm9sbE5leHQiLCJjbGFtcE51bWJlciIsIm51bWJlciIsImlzTnVtYmVyIiwiaXNOYU4iLCJGYWRlIiwiYXJndW1lbnRzIiwiZnVsbE9wYWNpdHkiLCJub09wYWNpdHkiLCJmYWRlRnJpY3Rpb24iLCJ0aW1lU3RlcCIsIm9wYWNpdGllcyIsImZhZGVUb05leHREaXN0YW5jZSIsImRpc3RhbmNlRnJvbVBvaW50ZXJEb3duIiwiZmFkZVZlbG9jaXR5IiwicHJvZ3Jlc3MiLCJzaG91bGRGYWRlUGFpciIsImRlZmF1bHRTZXR0bGVkQmVoYXZpb3VyIiwiZGVmYXVsdFByb2dyZXNzQmVoYXZpb3VyIiwiZW1ibGFBcGlJbnN0YW5jZSIsInNlbGVjdGVkU25hcCIsInNjcm9sbEJvZHkiLCJjb250YWluZXJTaXplIiwibWVhc3VyZVNpemUiLCJzY3JvbGxTbmFwTGlzdCIsInNldHRsZWQiLCJzY3JvbGxQcm9ncmVzcyIsInNlbGVjdCIsImZhZGVUb1NlbGVjdGVkU25hcEluc3RhbnRseSIsInBvaW50ZXJEb3duIiwicG9pbnRlclVwIiwiZGlzYWJsZVNjcm9sbCIsInNsaWRlU3R5bGUiLCJzdHlsZSIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJwb2ludGVyRXZlbnRzIiwiZ2V0QXR0cmlidXRlIiwic2V0T3BhY2l0aWVzIiwiZHVyYXRpb24iLCJnZXRTbGlkZVRyYW5zZm9ybSIsInBvc2l0aW9uIiwidHJhbnNsYXRlQXhpcyIsInNjcm9sbCIsInRvVXBwZXJDYXNlIiwiZGlyZWN0aW9uIiwidHJhbnNsYXRlIiwic2xpZGVMb29wZXIiLCJjbGVhciIsInRvZ2dsZUFjdGl2ZSIsImxvb3BQb2ludHMiLCJfcmVmIiwibG9ja0V4Y2Vzc2l2ZVNjcm9sbCIsImZhZGVJbmRleCIsInNjcm9sbFNuYXBzIiwibG9jYXRpb24iLCJzZXQiLCJpbmRleEEiLCJhYnNWZWxvY2l0eSIsImN1cnJlbnRPcGFjaXR5IiwiaXNGYWRlSW5kZXgiLCJuZXh0T3BhY2l0eSIsImNsYW1wZWRPcGFjaXR5IiwiZmFkZVBhaXIiLCJpbmRleEIiLCJzZXRQcm9ncmVzcyIsInNldE9wYWNpdHkiLCJzbGlkZXNJblNuYXAiLCJzbGlkZVJlZ2lzdHJ5Iiwic2xpZGVJbmRleCIsInJvdW5kZWRPcGFjaXR5IiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJoYXNPcGFjaXR5IiwidG9TdHJpbmciLCJkcmFnSGFuZGxlciIsInNuYXBGcmFjdGlvbiIsInNpZ24iLCJjbG9uZSIsImdldCIsImN1cnJlbnRQb3NpdGlvbiIsImRpZmZQb3NpdGlvbiIsImdldEZhZGVJbmRleCIsImRpcmVjdGlvblNpZ24iLCJkaXN0YW5jZVNpZ24iLCJuZXh0U25hcCIsImZhZGUiLCJmaXhlZERlbHRhVGltZVNlY29uZHMiLCJub0ZhZGVJbmRleCIsImRpZmZUb1RhcmdldCIsIm5vdFJlYWNoZWRUYXJnZXQiLCJzdWJqZWN0IiwiaXNTdHJpbmciLCJpc0Jvb2xlYW4iLCJpc09iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJtYXRoQWJzIiwibiIsIm1hdGhTaWduIiwiZGVsdGFBYnMiLCJ2YWx1ZUIiLCJ2YWx1ZUEiLCJmYWN0b3JBYnMiLCJkaWZmIiwiYXJyYXlLZXlzIiwib2JqZWN0S2V5cyIsIk51bWJlciIsImFycmF5TGFzdCIsImFycmF5TGFzdEluZGV4IiwiYXJyYXlJc0xhc3RJbmRleCIsImFycmF5RnJvbU51bWJlciIsInN0YXJ0QXQiLCJmcm9tIiwib2JqZWN0Iiwia2V5cyIsIm9iamVjdHNNZXJnZURlZXAiLCJvYmplY3RBIiwib2JqZWN0QiIsIm1lcmdlZE9iamVjdHMiLCJjdXJyZW50T2JqZWN0Iiwia2V5IiwiYXJlT2JqZWN0cyIsImlzTW91c2VFdmVudCIsImV2dCIsIm93bmVyV2luZG93IiwiQWxpZ25tZW50IiwiYWxpZ24iLCJ2aWV3U2l6ZSIsInByZWRlZmluZWQiLCJjZW50ZXIiLCJtZWFzdXJlIiwiRXZlbnRTdG9yZSIsIm5vZGUiLCJoYW5kbGVyIiwicmVtb3ZlTGlzdGVuZXIiLCJsZWdhY3lNZWRpYVF1ZXJ5TGlzdCIsImFkZExpc3RlbmVyIiwiQW5pbWF0aW9ucyIsIm93bmVyRG9jdW1lbnQiLCJ1cGRhdGUiLCJyZW5kZXIiLCJkb2N1bWVudFZpc2libGVIYW5kbGVyIiwibGFzdFRpbWVTdGFtcCIsImxhZyIsImFuaW1hdGlvbkZyYW1lIiwiaGlkZGVuIiwicmVzZXQiLCJzdG9wIiwiYW5pbWF0ZSIsImVsYXBzZWQiLCJsYWdPZmZzZXQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIkF4aXMiLCJjb250ZW50RGlyZWN0aW9uIiwiaXNSaWdodFRvTGVmdCIsImlzVmVydGljYWwiLCJjcm9zcyIsInN0YXJ0RWRnZSIsImdldFN0YXJ0RWRnZSIsImVuZEVkZ2UiLCJnZXRFbmRFZGdlIiwibm9kZVJlY3QiLCJMaW1pdCIsInJlYWNoZWRNaW4iLCJyZWFjaGVkTWF4IiwicmVhY2hlZEFueSIsImNvbnN0cmFpbiIsInJlbW92ZU9mZnNldCIsIkNvdW50ZXIiLCJsb29wIiwibG9vcEVuZCIsImNvdW50ZXIiLCJ3aXRoaW5MaW1pdCIsIkRyYWdIYW5kbGVyIiwicm9vdE5vZGUiLCJkcmFnVHJhY2tlciIsImFuaW1hdGlvbiIsInNjcm9sbFRhcmdldCIsImV2ZW50SGFuZGxlciIsInBlcmNlbnRPZlZpZXciLCJkcmFnVGhyZXNob2xkIiwiYmFzZUZyaWN0aW9uIiwid2F0Y2hEcmFnIiwiY3Jvc3NBeGlzIiwiZm9jdXNOb2RlcyIsIm5vblBhc3NpdmVFdmVudCIsImluaXRFdmVudHMiLCJkcmFnRXZlbnRzIiwiZ29Ub05leHRUaHJlc2hvbGQiLCJzbmFwRm9yY2VCb29zdCIsIm1vdXNlIiwidG91Y2giLCJmcmVlRm9yY2VCb29zdCIsImJhc2VTcGVlZCIsImlzTW92aW5nIiwic3RhcnRTY3JvbGwiLCJzdGFydENyb3NzIiwicG9pbnRlcklzRG93biIsInByZXZlbnRTY3JvbGwiLCJwcmV2ZW50Q2xpY2siLCJpc01vdXNlIiwiZG93bklmQWxsb3dlZCIsImRvd24iLCJ1cCIsImNsaWNrIiwiYWRkRHJhZ0V2ZW50cyIsIm1vdmUiLCJpc0ZvY3VzTm9kZSIsIm5vZGVOYW1lIiwiaW5jbHVkZXMiLCJmb3JjZUJvb3N0IiwiYm9vc3QiLCJhbGxvd2VkRm9yY2UiLCJmb3JjZSIsInRhcmdldENoYW5nZWQiLCJuZXh0IiwiYmFzZUZvcmNlIiwiYnlEaXN0YW5jZSIsImRpc3RhbmNlIiwiYnlJbmRleCIsImlzTW91c2VFdnQiLCJidXR0b25zIiwidXNlRnJpY3Rpb24iLCJ1c2VEdXJhdGlvbiIsInJlYWRQb2ludCIsImVtaXQiLCJpc1RvdWNoRXZ0IiwidG91Y2hlcyIsImxhc3RTY3JvbGwiLCJsYXN0Q3Jvc3MiLCJkaWZmU2Nyb2xsIiwiZGlmZkNyb3NzIiwicG9pbnRlck1vdmUiLCJjdXJyZW50TG9jYXRpb24iLCJyYXdGb3JjZSIsImZvcmNlRmFjdG9yIiwic3BlZWQiLCJmcmljdGlvbiIsInN0b3BQcm9wYWdhdGlvbiIsIkRyYWdUcmFja2VyIiwibG9nSW50ZXJ2YWwiLCJsYXN0RXZlbnQiLCJyZWFkVGltZSIsImV2dEF4aXMiLCJwcm9wZXJ0eSIsImNvb3JkIiwiZXhwaXJlZCIsImRpZmZEcmFnIiwiZGlmZlRpbWUiLCJpc0ZsaWNrIiwiTm9kZVJlY3RzIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiUGVyY2VudE9mVmlldyIsIlJlc2l6ZUhhbmRsZXIiLCJjb250YWluZXIiLCJzbGlkZXMiLCJ3YXRjaFJlc2l6ZSIsIm5vZGVSZWN0cyIsInJlc2l6ZU9ic2VydmVyIiwic2xpZGVTaXplcyIsImRlc3Ryb3llZCIsInJlYWRTaXplIiwiZGVmYXVsdENhbGxiYWNrIiwiZW50cmllcyIsImVudHJ5IiwiaXNDb250YWluZXIiLCJpbmRleE9mIiwibGFzdFNpemUiLCJuZXdTaXplIiwiZGlmZlNpemUiLCJyZUluaXQiLCJSZXNpemVPYnNlcnZlciIsIm9ic2VydmVOb2RlcyIsIlNjcm9sbEJvZHkiLCJvZmZzZXRMb2NhdGlvbiIsInByZXZpb3VzTG9jYXRpb24iLCJiYXNlRHVyYXRpb24iLCJib2R5VmVsb2NpdHkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxEdXJhdGlvbiIsInNjcm9sbEZyaWN0aW9uIiwicmF3TG9jYXRpb24iLCJyYXdMb2NhdGlvblByZXZpb3VzIiwic2VlayIsImlzSW5zdGFudCIsImRpcmVjdGlvbkRpZmYiLCJ1c2VCYXNlRHVyYXRpb24iLCJ1c2VCYXNlRnJpY3Rpb24iLCJTY3JvbGxCb3VuZHMiLCJsaW1pdCIsInB1bGxCYWNrVGhyZXNob2xkIiwiZWRnZU9mZnNldFRvbGVyYW5jZSIsImZyaWN0aW9uTGltaXQiLCJkaXNhYmxlZCIsInNob3VsZENvbnN0cmFpbiIsImVkZ2UiLCJkaWZmVG9FZGdlIiwic3VidHJhY3QiLCJTY3JvbGxDb250YWluIiwiY29udGVudFNpemUiLCJzbmFwc0FsaWduZWQiLCJjb250YWluU2Nyb2xsIiwicGl4ZWxUb2xlcmFuY2UiLCJzY3JvbGxCb3VuZHMiLCJzbmFwc0JvdW5kZWQiLCJtZWFzdXJlQm91bmRlZCIsInNjcm9sbENvbnRhaW5MaW1pdCIsImZpbmRTY3JvbGxDb250YWluTGltaXQiLCJzbmFwc0NvbnRhaW5lZCIsIm1lYXN1cmVDb250YWluZWQiLCJ1c2VQaXhlbFRvbGVyYW5jZSIsImJvdW5kIiwic25hcCIsInN0YXJ0U25hcCIsImVuZFNuYXAiLCJsYXN0SW5kZXhPZiIsInNuYXBBbGlnbmVkIiwiaXNGaXJzdCIsImlzTGFzdCIsInNjcm9sbEJvdW5kIiwiU2Nyb2xsTGltaXQiLCJTY3JvbGxMb29wZXIiLCJ2ZWN0b3JzIiwiam9pbnRTYWZldHkiLCJzaG91bGRMb29wIiwibG9vcERpc3RhbmNlIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJTY3JvbGxTbmFwcyIsImFsaWdubWVudCIsInNsaWRlUmVjdHMiLCJzbGlkZXNUb1Njcm9sbCIsImdyb3VwU2xpZGVzIiwiYWxpZ25tZW50cyIsIm1lYXN1cmVTaXplcyIsInNuYXBzIiwibWVhc3VyZVVuYWxpZ25lZCIsIm1lYXN1cmVBbGlnbmVkIiwicmVjdHMiLCJyZWN0IiwiZyIsIlNsaWRlUmVnaXN0cnkiLCJjb250YWluU25hcHMiLCJzbGlkZUluZGV4ZXMiLCJjcmVhdGVTbGlkZVJlZ2lzdHJ5IiwiZ3JvdXBlZFNsaWRlSW5kZXhlcyIsImRvTm90Q29udGFpbiIsImdyb3VwIiwiZ3JvdXBzIiwicmFuZ2UiLCJTY3JvbGxUYXJnZXQiLCJ0YXJnZXRWZWN0b3IiLCJtaW5EaXN0YW5jZSIsImRpc3RhbmNlcyIsInNvcnQiLCJmaW5kVGFyZ2V0U25hcCIsImFzY0RpZmZzVG9TbmFwcyIsInNob3J0Y3V0IiwiZDEiLCJkMiIsIm1hdGNoaW5nVGFyZ2V0cyIsImRpZmZUb1NuYXAiLCJ0YXJnZXRTbmFwRGlzdGFuY2UiLCJyZWFjaGVkQm91bmQiLCJzbmFwRGlzdGFuY2UiLCJTY3JvbGxUbyIsImluZGV4Q3VycmVudCIsImluZGV4UHJldmlvdXMiLCJkaXN0YW5jZURpZmYiLCJpbmRleERpZmYiLCJ0YXJnZXRJbmRleCIsIlNsaWRlRm9jdXMiLCJyb290IiwiZXZlbnRTdG9yZSIsImxhc3RUYWJQcmVzc1RpbWUiLCJyZWdpc3RlclRhYlByZXNzIiwiYWRkU2xpZGVGb2N1c0V2ZW50IiwiY29kZSIsImdldFRpbWUiLCJzbGlkZSIsImZvY3VzIiwibm93VGltZSIsInNjcm9sbExlZnQiLCJmaW5kSW5kZXgiLCJjYXB0dXJlIiwiVmVjdG9yMUQiLCJpbml0aWFsVmFsdWUiLCJub3JtYWxpemVJbnB1dCIsIlRyYW5zbGF0ZSIsIngiLCJ5IiwiY29udGFpbmVyU3R5bGUiLCJ0byIsIlNsaWRlTG9vcGVyIiwic2xpZGVTaXplc1dpdGhHYXBzIiwicm91bmRpbmdTYWZldHkiLCJhc2NJdGVtcyIsImRlc2NJdGVtcyIsInJldmVyc2UiLCJzdGFydFBvaW50cyIsImVuZFBvaW50cyIsInJlbW92ZVNsaWRlU2l6ZXMiLCJpbmRleGVzIiwic2xpZGVzSW5HYXAiLCJnYXAiLCJyZW1haW5pbmdHYXAiLCJmaW5kU2xpZGVCb3VuZHMiLCJmaW5kTG9vcFBvaW50cyIsImlzRW5kRWRnZSIsInNsaWRlQm91bmRzIiwiaW5pdGlhbCIsImFsdGVyZWQiLCJib3VuZEVkZ2UiLCJsb29wUG9pbnQiLCJzbGlkZUxvY2F0aW9uIiwiY2FuTG9vcCIsIm90aGVySW5kZXhlcyIsInNoaWZ0TG9jYXRpb24iLCJTbGlkZXNIYW5kbGVyIiwid2F0Y2hTbGlkZXMiLCJtdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwibXV0YXRpb24iLCJNdXRhdGlvbk9ic2VydmVyIiwiY2hpbGRMaXN0IiwiU2xpZGVzSW5WaWV3IiwidGhyZXNob2xkIiwiaW50ZXJzZWN0aW9uRW50cnlNYXAiLCJpblZpZXdDYWNoZSIsIm5vdEluVmlld0NhY2hlIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsInBhcmVudEVsZW1lbnQiLCJjcmVhdGVJblZpZXdMaXN0IiwiaW5WaWV3IiwibGlzdCIsInBhcnNlSW50IiwiaXNJbnRlcnNlY3RpbmciLCJpblZpZXdNYXRjaCIsIm5vdEluVmlld01hdGNoIiwiU2xpZGVTaXplcyIsInJlYWRFZGdlR2FwIiwid2l0aEVkZ2VHYXAiLCJzdGFydEdhcCIsIm1lYXN1cmVTdGFydEdhcCIsImVuZEdhcCIsIm1lYXN1cmVFbmRHYXAiLCJtZWFzdXJlV2l0aEdhcHMiLCJzbGlkZVJlY3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIlNsaWRlc1RvU2Nyb2xsIiwiZ3JvdXBCeU51bWJlciIsImJ5TnVtYmVyIiwiZ3JvdXBTaXplIiwiYnlTaXplIiwicmVjdEIiLCJyZWN0QSIsImVkZ2VBIiwiZWRnZUIiLCJnYXBBIiwiZ2FwQiIsImNodW5rU2l6ZSIsImN1cnJlbnRTaXplIiwicHJldmlvdXNTaXplIiwiRW5naW5lIiwic2Nyb2xsQXhpcyIsInN0YXJ0SW5kZXgiLCJpblZpZXdUaHJlc2hvbGQiLCJfcmVmMiIsIl9yZWYzIiwic2Nyb2xsTG9vcGVyIiwic2hvdWxkU2V0dGxlIiwid2l0aGluQm91bmRzIiwiaGFzU2V0dGxlZCIsImludGVycG9sYXRlZExvY2F0aW9uIiwic3RhcnRMb2NhdGlvbiIsInNsaWRlc0luVmlldyIsInNsaWRlRm9jdXMiLCJyZXNpemVIYW5kbGVyIiwic2xpZGVzSGFuZGxlciIsIkV2ZW50SGFuZGxlciIsImFwaSIsImdldExpc3RlbmVycyIsImNiIiwiT3B0aW9uc0hhbmRsZXIiLCJvcHRpb25zQSIsIm9wdGlvbnNCIiwibWF0Y2hlZE1lZGlhT3B0aW9ucyIsIm1lZGlhIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtZWRpYU9wdGlvbiIsIm9wdGlvbnNNZWRpYVF1ZXJpZXMiLCJvcHRpb25zTGlzdCIsImFjYyIsIm1lZGlhUXVlcmllcyIsIlBsdWdpbnNIYW5kbGVyIiwiYWN0aXZlUGx1Z2lucyIsInBsdWdpbnMiLCJfcmVmNCIsInBsdWdpbiIsImFzc2lnbiIsIkVtYmxhQ2Fyb3VzZWwiLCJ1c2VyUGx1Z2lucyIsImRlZmF1bHRWaWV3IiwicGx1Z2luc0hhbmRsZXIiLCJtZWRpYUhhbmRsZXJzIiwicmVBY3RpdmF0ZSIsInBsdWdpbkxpc3QiLCJwbHVnaW5BcGlzIiwic3RvcmVFbGVtZW50cyIsInVzZXJDb250YWluZXIiLCJ1c2VyU2xpZGVzIiwiY3VzdG9tQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiY3VzdG9tU2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZUVuZ2luZSIsIm9wdGlvbnNXaXRob3V0TG9vcCIsImFjdGl2YXRlIiwid2l0aE9wdGlvbnMiLCJ3aXRoUGx1Z2lucyIsIl9yZWY1IiwicXVlcnkiLCJvZmZzZXRQYXJlbnQiLCJkZUFjdGl2YXRlIiwianVtcCIsInByZXYiLCJzbGlkZXNOb3RJblZpZXciLCJZVER5bmFtaWNzR2FsbGVyeSIsIk9QVElPTlMiLCJPUFRJT05TX1RIVU1CUyIsInZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCIsInZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwiLCJwcmV2VGh1bWJCdG5Ob2RlIiwibmV4dFRodW1iQnRuTm9kZSIsImVtYmxhTWFpbiIsImVtYmxhVGh1bWIiLCJyZW1vdmVUaHVtYkJ0bnNDbGlja0hhbmRsZXJzIiwicmVtb3ZlVG9nZ2xlVGh1bWJCdG5zQWN0aXZlIiwicmVtb3ZlVGh1bWJQcmV2TmV4dEJ0bnNDbGlja0hhbmRsZXJzIiwicm1zbGlkZXNob3dzIl0sInNvdXJjZVJvb3QiOiIifQ==