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
      index--;
      if (index - 1 < 0) {
        index = 0;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxrQkFBa0IsRUFBRSxZQUFZO0VBQ3RELElBQUl1d0IsWUFBWSxHQUFHendCLFFBQVEsQ0FBQ2d2QixnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFFNUQsS0FBSyxJQUFJM3FCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR29zQixZQUFZLENBQUNsdEIsTUFBTSxFQUFFYyxDQUFDLEVBQUUsRUFBRTtJQUN6QyxJQUFJd3JCLGlCQUFpQixDQUFELENBQUMsQ0FBRXZ5QixJQUFJLENBQUNtekIsWUFBWSxDQUFDcHNCLENBQUMsQ0FBQyxDQUFDO0VBQ2pEO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL1doZWVsR2VzdHVyZXNQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy91dGlscy9wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvRXZlbnRCdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9zdGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL3doZWVsLWdlc3R1cmVzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9idXR0b25zLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0ZhZGUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2dhbGxlcnkuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5pbXBvcnQgeyBDcmVhdGVPcHRpb25zVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsL2NvbXBvbmVudHMvT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsL2NvbXBvbmVudHMvT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBDcmVhdGVQbHVnaW5UeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9QbHVnaW5zJ1xuaW1wb3J0IFdoZWVsR2VzdHVyZXMsIHsgV2hlZWxFdmVudFN0YXRlIH0gZnJvbSAnd2hlZWwtZ2VzdHVyZXMnXG5cbmV4cG9ydCB0eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICB3aGVlbERyYWdnaW5nQ2xhc3M6IHN0cmluZ1xuICBmb3JjZVdoZWVsQXhpcz86ICd4JyB8ICd5J1xuICB0YXJnZXQ/OiBFbGVtZW50XG59PlxuXG50eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnM+XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IHtcbiAgYWN0aXZlOiB0cnVlLFxuICBicmVha3BvaW50czoge30sXG4gIHdoZWVsRHJhZ2dpbmdDbGFzczogJ2lzLXdoZWVsLWRyYWdnaW5nJyxcbiAgZm9yY2VXaGVlbEF4aXM6IHVuZGVmaW5lZCxcbiAgdGFyZ2V0OiB1bmRlZmluZWQsXG59XG5cbldoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZCBhcyBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddIHwgdW5kZWZpbmVkXG5cbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzUGx1Z2luKHVzZXJPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddID0ge30pOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSB7XG4gIGxldCBvcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9uc1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHt9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYTogRW1ibGFDYXJvdXNlbFR5cGUsIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGUpIHtcbiAgICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEgfSA9IG9wdGlvbnNIYW5kbGVyXG4gICAgY29uc3Qgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIFdoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGNvbnN0IGVuZ2luZSA9IGVtYmxhLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0YXJnZXROb2RlID0gb3B0aW9ucy50YXJnZXQgPz8gKGVtYmxhLmNvbnRhaW5lck5vZGUoKS5wYXJlbnROb2RlIGFzIEVsZW1lbnQpXG4gICAgY29uc3Qgd2hlZWxBeGlzID0gb3B0aW9ucy5mb3JjZVdoZWVsQXhpcyA/PyBlbmdpbmUub3B0aW9ucy5heGlzXG4gICAgY29uc3Qgd2hlZWxHZXN0dXJlcyA9IFdoZWVsR2VzdHVyZXMoe1xuICAgICAgcHJldmVudFdoZWVsQWN0aW9uOiB3aGVlbEF4aXMsXG4gICAgICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbiAgICB9KVxuXG4gICAgY29uc3QgdW5vYnNlcnZlVGFyZ2V0Tm9kZSA9IHdoZWVsR2VzdHVyZXMub2JzZXJ2ZSh0YXJnZXROb2RlKVxuICAgIGNvbnN0IG9mZldoZWVsID0gd2hlZWxHZXN0dXJlcy5vbignd2hlZWwnLCBoYW5kbGVXaGVlbClcblxuICAgIGxldCBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgIGxldCBzdGFydEV2ZW50OiBNb3VzZUV2ZW50XG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJywgc3RhdGUuZXZlbnQpXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gTGVnYWN5IEJyb3dzZXJzIGxpa2UgSUUgMTAgJiAxMSB3aWxsIHRocm93IHdoZW4gYXR0ZW1wdGluZyB0byBjcmVhdGUgdGhlIEV2ZW50XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0xlZ2FjeSBicm93c2VyIHJlcXVpcmVzIGV2ZW50cy1wb2x5ZmlsbCAoaHR0cHM6Ly9naXRodWIuY29tL3hpZWwvZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMjbGVnYWN5LWJyb3dzZXJzKSdcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFudXAoKVxuICAgICAgfVxuXG4gICAgICBpc1N0YXJ0ZWQgPSB0cnVlXG4gICAgICBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LmFkZChvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgICAgZGlzcGF0Y2hFdmVudChjcmVhdGVSZWxhdGl2ZU1vdXNlRXZlbnQoJ21vdXNldXAnLCBzdGF0ZSkpXG4gICAgICByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgIGlmIChpc1N0YXJ0ZWQgJiYgZS5pc1RydXN0ZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCh0eXBlOiAnbW91c2Vkb3duJyB8ICdtb3VzZW1vdmUnIHwgJ21vdXNldXAnLCBzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBsZXQgbW92ZVgsIG1vdmVZXG5cbiAgICAgIGlmICh3aGVlbEF4aXMgPT09IGVuZ2luZS5vcHRpb25zLmF4aXMpIHtcbiAgICAgICAgO1ttb3ZlWCwgbW92ZVldID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBlbWJsYXMgYXhpcyBhbmQgdGhlIHdoZWVsQXhpcyBkb24ndCBtYXRjaCwgc3dhcCB0aGUgYXhlcyB0byBtYXRjaCB0aGUgcmlnaHQgZW1ibGEgZXZlbnRzXG4gICAgICAgIDtbbW92ZVksIG1vdmVYXSA9IHN0YXRlLmF4aXNNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IHNraXBwaW5nIHNsaWRlc1xuICAgICAgaWYgKCFlbmdpbmUub3B0aW9ucy5za2lwU25hcHMgJiYgIWVuZ2luZS5vcHRpb25zLmRyYWdGcmVlKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aFxuICAgICAgICBjb25zdCBtYXhZID0gZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0XG5cbiAgICAgICAgbW92ZVggPSBtb3ZlWCA8IDAgPyBNYXRoLm1heChtb3ZlWCwgLW1heFgpIDogTWF0aC5taW4obW92ZVgsIG1heFgpXG4gICAgICAgIG1vdmVZID0gbW92ZVkgPCAwID8gTWF0aC5tYXgobW92ZVksIC1tYXhZKSA6IE1hdGgubWluKG1vdmVZLCBtYXhZKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICBjbGllbnRYOiBzdGFydEV2ZW50LmNsaWVudFggKyBtb3ZlWCxcbiAgICAgICAgY2xpZW50WTogc3RhcnRFdmVudC5jbGllbnRZICsgbW92ZVksXG4gICAgICAgIHNjcmVlblg6IHN0YXJ0RXZlbnQuc2NyZWVuWCArIG1vdmVYLFxuICAgICAgICBzY3JlZW5ZOiBzdGFydEV2ZW50LnNjcmVlblkgKyBtb3ZlWSxcbiAgICAgICAgbW92ZW1lbnRYOiBtb3ZlWCxcbiAgICAgICAgbW92ZW1lbnRZOiBtb3ZlWSxcbiAgICAgICAgYnV0dG9uOiAwLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudDogVUlFdmVudCkge1xuICAgICAgZW1ibGEuY29udGFpbmVyTm9kZSgpLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlV2hlZWwoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBheGlzRGVsdGE6IFtkZWx0YVgsIGRlbHRhWV0sXG4gICAgICB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGEgPSB3aGVlbEF4aXMgPT09ICd4JyA/IGRlbHRhWCA6IGRlbHRhWVxuICAgICAgY29uc3QgY3Jvc3NBeGlzRGVsdGEgPSB3aGVlbEF4aXMgPT09ICd4JyA/IGRlbHRhWSA6IGRlbHRhWFxuICAgICAgY29uc3QgaXNSZWxlYXNlID0gc3RhdGUuaXNNb21lbnR1bSAmJiBzdGF0ZS5wcmV2aW91cyAmJiAhc3RhdGUucHJldmlvdXMuaXNNb21lbnR1bVxuICAgICAgY29uc3QgaXNFbmRpbmdPclJlbGVhc2UgPSAoc3RhdGUuaXNFbmRpbmcgJiYgIXN0YXRlLmlzTW9tZW50dW0pIHx8IGlzUmVsZWFzZVxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YUlzRG9taW5hbnQgPSBNYXRoLmFicyhwcmltYXJ5QXhpc0RlbHRhKSA+IE1hdGguYWJzKGNyb3NzQXhpc0RlbHRhKVxuXG4gICAgICBpZiAocHJpbWFyeUF4aXNEZWx0YUlzRG9taW5hbnQgJiYgIWlzU3RhcnRlZCAmJiAhc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgICB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlKVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzU3RhcnRlZCkgcmV0dXJuXG4gICAgICBpZiAoaXNFbmRpbmdPclJlbGVhc2UpIHtcbiAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2Vtb3ZlJywgc3RhdGUpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICB1bm9ic2VydmVUYXJnZXROb2RlKClcbiAgICAgIG9mZldoZWVsKClcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0ge1xuICAgIG5hbWU6ICd3aGVlbEdlc3R1cmVzJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3k6ICgpID0+IGNsZWFudXAoKSxcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG1vZHVsZSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9QbHVnaW5zJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICB3aGVlbEdlc3R1cmVzPzogV2hlZWxHZXN0dXJlc1BsdWdpblR5cGVcbiAgfVxufVxuIiwiY29uc3QgREVDQVkgPSAwLjk5NlxuXG4vKipcbiAqIG1vdmVtZW50IHByb2plY3Rpb24gYmFzZWQgb24gdmVsb2NpdHlcbiAqIEBwYXJhbSB2ZWxvY2l0eVB4TXNcbiAqIEBwYXJhbSBkZWNheVxuICovXG5leHBvcnQgY29uc3QgcHJvamVjdGlvbiA9ICh2ZWxvY2l0eVB4TXM6IG51bWJlciwgZGVjYXkgPSBERUNBWSkgPT4gKHZlbG9jaXR5UHhNcyAqIGRlY2F5KSAvICgxIC0gZGVjYXkpXG4iLCJleHBvcnQgKiBmcm9tICcuL3Byb2plY3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0T2Y8VD4oYXJyYXk6IFRbXSkge1xuICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF2ZXJhZ2UobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIG51bWJlcnMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBudW1iZXJzLmxlbmd0aFxufVxuXG5leHBvcnQgY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihNYXRoLm1heChtaW4sIHZhbHVlKSwgbWF4KVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVmVjdG9yczxUIGV4dGVuZHMgbnVtYmVyW10+KHYxOiBULCB2MjogVCk6IFQge1xuICBpZiAodjEubGVuZ3RoICE9PSB2Mi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlY3RvcnMgbXVzdCBiZSBzYW1lIGxlbmd0aCcpXG4gIH1cbiAgcmV0dXJuIHYxLm1hcCgodmFsLCBpKSA9PiB2YWwgKyB2MltpXSkgYXMgVFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KG51bWJlcnM6IG51bWJlcltdKSB7XG4gIHJldHVybiBNYXRoLm1heCguLi5udW1iZXJzLm1hcChNYXRoLmFicykpXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZGVlcEZyZWV6ZTxUIGV4dGVuZHMgb2JqZWN0PihvOiBUKTogUmVhZG9ubHk8VD4ge1xuICBPYmplY3QuZnJlZXplKG8pXG4gIE9iamVjdC52YWx1ZXMobykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhT2JqZWN0LmlzRnJvemVuKHZhbHVlKSkge1xuICAgICAgZGVlcEZyZWV6ZSh2YWx1ZSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBvXG59XG4iLCJpbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEV2ZW50TWFwRW1wdHkgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxEID0gdW5rbm93bj4gPSAoZGF0YTogRCkgPT4gdm9pZFxuZXhwb3J0IHR5cGUgT2ZmID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudEJ1czxFdmVudE1hcCA9IEV2ZW50TWFwRW1wdHk+KCkge1xuICBjb25zdCBsaXN0ZW5lcnMgPSB7fSBhcyBSZWNvcmQ8a2V5b2YgRXZlbnRNYXAsIEV2ZW50TGlzdGVuZXI8bmV2ZXI+W10+XG5cbiAgZnVuY3Rpb24gb248RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pOiBPZmYge1xuICAgIGxpc3RlbmVyc1t0eXBlXSA9IChsaXN0ZW5lcnNbdHlwZV0gfHwgW10pLmNvbmNhdChsaXN0ZW5lcilcbiAgICByZXR1cm4gKCkgPT4gb2ZmKHR5cGUsIGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+KSB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuZmlsdGVyKChsKSA9PiBsICE9PSBsaXN0ZW5lcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BhdGNoPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBkYXRhOiBFdmVudE1hcFtFS10pIHtcbiAgICBpZiAoISh0eXBlIGluIGxpc3RlbmVycykpIHJldHVyblxuICAgIDsobGlzdGVuZXJzW3R5cGVdIGFzIEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPltdKS5mb3JFYWNoKChsKSA9PiBsKGRhdGEpKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBkaXNwYXRjaCxcbiAgfSlcbn1cbiIsImltcG9ydCB7IFdoZWVsRXZlbnREYXRhIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbnR5cGUgVW5vYnNlcnZlVGFyZ2V0ID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZnVuY3Rpb24gV2hlZWxUYXJnZXRPYnNlcnZlcihldmVudExpc3RlbmVyOiAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHZvaWQpIHtcbiAgbGV0IHRhcmdldHM6IEV2ZW50VGFyZ2V0W10gPSBbXVxuXG4gIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byB0YXJnZXQgZWxlbWVudFxuICBjb25zdCBvYnNlcnZlID0gKHRhcmdldDogRXZlbnRUYXJnZXQpOiBVbm9ic2VydmVUYXJnZXQgPT4ge1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lciwgeyBwYXNzaXZlOiBmYWxzZSB9KVxuICAgIHRhcmdldHMucHVzaCh0YXJnZXQpXG5cbiAgICByZXR1cm4gKCkgPT4gdW5vYnNlcnZlKHRhcmdldClcbiAgfVxuXG4gIC8vLyByZW1vdmUgZXZlbnQgbGlzdGVuZXIgZnJvbSB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB1bm9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCkgPT4ge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcilcbiAgICB0YXJnZXRzID0gdGFyZ2V0cy5maWx0ZXIoKHQpID0+IHQgIT09IHRhcmdldClcbiAgfVxuXG4gIC8vIHN0b3BzIHdhdGNoaW5nIGFsbCBvZiBpdHMgdGFyZ2V0IGVsZW1lbnRzIGZvciB2aXNpYmlsaXR5IGNoYW5nZXMuXG4gIGNvbnN0IGRpc2Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgdGFyZ2V0cy5mb3JFYWNoKHVub2JzZXJ2ZSlcbiAgfVxuXG4gIHJldHVybiBkZWVwRnJlZXplKHtcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICB9KVxufVxuIiwiaW1wb3J0IHsgUmV2ZXJzZVNpZ24sIFZlY3RvclhZWiwgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZFdoZWVsIHtcbiAgYXhpc0RlbHRhOiBWZWN0b3JYWVpcbiAgdGltZVN0YW1wOiBudW1iZXJcbn1cblxuY29uc3QgTElORV9IRUlHSFQgPSAxNiAqIDEuMTI1XG5jb25zdCBQQUdFX0hFSUdIVCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuaW5uZXJIZWlnaHQpIHx8IDgwMFxuY29uc3QgREVMVEFfTU9ERV9VTklUID0gWzEsIExJTkVfSEVJR0hULCBQQUdFX0hFSUdIVF1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoZWVsKGU6IFdoZWVsRXZlbnREYXRhKTogTm9ybWFsaXplZFdoZWVsIHtcbiAgY29uc3QgZGVsdGFYID0gZS5kZWx0YVggKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWSA9IGUuZGVsdGFZICogREVMVEFfTU9ERV9VTklUW2UuZGVsdGFNb2RlXVxuICBjb25zdCBkZWx0YVogPSAoZS5kZWx0YVogfHwgMCkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG5cbiAgcmV0dXJuIHtcbiAgICB0aW1lU3RhbXA6IGUudGltZVN0YW1wLFxuICAgIGF4aXNEZWx0YTogW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdLFxuICB9XG59XG5cbmNvbnN0IHJldmVyc2VBbGwgPSBbLTEsIC0xLCAtMV1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VBeGlzRGVsdGFTaWduPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+PihcbiAgd2hlZWw6IFQsXG4gIHJldmVyc2VTaWduOiBSZXZlcnNlU2lnblxuKTogVCB7XG4gIGlmICghcmV2ZXJzZVNpZ24pIHtcbiAgICByZXR1cm4gd2hlZWxcbiAgfVxuXG4gIGNvbnN0IG11bHRpcGxpZXJzID0gcmV2ZXJzZVNpZ24gPT09IHRydWUgPyByZXZlcnNlQWxsIDogcmV2ZXJzZVNpZ24ubWFwKChzaG91bGRSZXZlcnNlKSA9PiAoc2hvdWxkUmV2ZXJzZSA/IC0xIDogMSkpXG5cbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhLCBpKSA9PiBkZWx0YSAqIG11bHRpcGxpZXJzW2ldKSxcbiAgfVxufVxuXG5jb25zdCBERUxUQV9NQVhfQUJTID0gNzAwXG5cbmV4cG9ydCBjb25zdCBjbGFtcEF4aXNEZWx0YSA9IDxUIGV4dGVuZHMgUGljazxOb3JtYWxpemVkV2hlZWwsICdheGlzRGVsdGEnPj4od2hlZWw6IFQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhKSA9PiBjbGFtcChkZWx0YSwgLURFTFRBX01BWF9BQlMsIERFTFRBX01BWF9BQlMpKSxcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5leHBvcnQgY29uc3QgQUNDX0ZBQ1RPUl9NSU4gPSAwLjZcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01BWCA9IDAuOTZcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19NRVJHRSA9IDJcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19BTkFMQVpFID0gNVxuIiwiaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0NvbmZpZyB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgZGVlcEZyZWV6ZSB9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY29uZmlnRGVmYXVsdHM6IFdoZWVsR2VzdHVyZXNDb25maWcgPSBkZWVwRnJlZXplKHtcbiAgcHJldmVudFdoZWVsQWN0aW9uOiB0cnVlLFxuICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbn0pXG4iLCIvKipcbiAqIHRoZSB0aW1lb3V0IGlzIGF1dG9tYXRpY2FsbHkgYWRqdXN0ZWQgZHVyaW5nIGEgZ2VzdHVyZVxuICogdGhlIGluaXRpYWwgdGltZW91dCBwZXJpb2QgaXMgcHJldHR5IGxvbmcsIHNvIGV2ZW4gb2xkIG1vdXNlcywgd2hpY2ggZW1pdCB3aGVlbCBldmVudHMgbGVzcyBvZnRlbiwgY2FuIHByb2R1Y2UgYSBjb250aW51b3VzIGdlc3R1cmVcbiAqL1xuaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0ludGVybmFsU3RhdGUgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJ1xuXG5jb25zdCBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQgPSA0MDBcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpOiBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgaXNTdGFydGVkOiBmYWxzZSxcbiAgICBpc1N0YXJ0UHVibGlzaGVkOiBmYWxzZSxcbiAgICBpc01vbWVudHVtOiBmYWxzZSxcbiAgICBzdGFydFRpbWU6IDAsXG4gICAgbGFzdEFic0RlbHRhOiBJbmZpbml0eSxcbiAgICBheGlzTW92ZW1lbnQ6IFswLCAwLCAwXSxcbiAgICBheGlzVmVsb2NpdHk6IFswLCAwLCAwXSxcbiAgICBhY2NlbGVyYXRpb25GYWN0b3JzOiBbXSxcbiAgICBzY3JvbGxQb2ludHM6IFtdLFxuICAgIHNjcm9sbFBvaW50c1RvTWVyZ2U6IFtdLFxuICAgIHdpbGxFbmRUaW1lb3V0OiBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQsXG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEJ1cyBmcm9tICcuLi9ldmVudHMvRXZlbnRCdXMnXG5pbXBvcnQgeyBXaGVlbFRhcmdldE9ic2VydmVyIH0gZnJvbSAnLi4vZXZlbnRzL1doZWVsVGFyZ2V0T2JzZXJ2ZXInXG5pbXBvcnQge1xuICBWZWN0b3JYWVosXG4gIFdoZWVsRXZlbnREYXRhLFxuICBXaGVlbEV2ZW50U3RhdGUsXG4gIFdoZWVsR2VzdHVyZXNDb25maWcsXG4gIFdoZWVsR2VzdHVyZXNFdmVudE1hcCxcbiAgV2hlZWxHZXN0dXJlc09wdGlvbnMsXG59IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgYWJzTWF4LCBhZGRWZWN0b3JzLCBhdmVyYWdlLCBkZWVwRnJlZXplLCBsYXN0T2YsIHByb2plY3Rpb24gfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGNsYW1wQXhpc0RlbHRhLCBub3JtYWxpemVXaGVlbCwgcmV2ZXJzZUF4aXNEZWx0YVNpZ24gfSBmcm9tICcuLi93aGVlbC1ub3JtYWxpemVyL3doZWVsLW5vcm1hbGl6ZXInXG5pbXBvcnQgeyBfX0RFVl9fLCBBQ0NfRkFDVE9SX01BWCwgQUNDX0ZBQ1RPUl9NSU4sIFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUsIFdIRUVMRVZFTlRTX1RPX01FUkdFIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0cyB9IGZyb20gJy4vb3B0aW9ucydcbmltcG9ydCB7IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSB9IGZyb20gJy4vc3RhdGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzKG9wdGlvbnNQYXJhbTogV2hlZWxHZXN0dXJlc09wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IG9uLCBvZmYsIGRpc3BhdGNoIH0gPSBFdmVudEJ1czxXaGVlbEdlc3R1cmVzRXZlbnRNYXA+KClcbiAgbGV0IGNvbmZpZyA9IGNvbmZpZ0RlZmF1bHRzXG4gIGxldCBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gIGxldCBjdXJyZW50RXZlbnQ6IFdoZWVsRXZlbnREYXRhXG4gIGxldCBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG4gIGxldCBwcmV2V2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgfCB1bmRlZmluZWRcblxuICBjb25zdCBmZWVkV2hlZWwgPSAod2hlZWxFdmVudHM6IFdoZWVsRXZlbnREYXRhIHwgV2hlZWxFdmVudERhdGFbXSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHdoZWVsRXZlbnRzKSkge1xuICAgICAgd2hlZWxFdmVudHMuZm9yRWFjaCgod2hlZWxFdmVudCkgPT4gcHJvY2Vzc1doZWVsRXZlbnREYXRhKHdoZWVsRXZlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlT3B0aW9ucyA9IChuZXdPcHRpb25zOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KTogV2hlZWxHZXN0dXJlc0NvbmZpZyA9PiB7XG4gICAgaWYgKE9iamVjdC52YWx1ZXMobmV3T3B0aW9ucykuc29tZSgob3B0aW9uKSA9PiBvcHRpb24gPT09IHVuZGVmaW5lZCB8fCBvcHRpb24gPT09IG51bGwpKSB7XG4gICAgICBfX0RFVl9fICYmIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZU9wdGlvbnMgaWdub3JlZCEgdW5kZWZpbmVkICYgbnVsbCBvcHRpb25zIG5vdCBhbGxvd2VkJylcbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG4gICAgcmV0dXJuIChjb25maWcgPSBkZWVwRnJlZXplKHsgLi4uY29uZmlnRGVmYXVsdHMsIC4uLmNvbmZpZywgLi4ubmV3T3B0aW9ucyB9KSlcbiAgfVxuXG4gIGNvbnN0IHB1Ymxpc2hXaGVlbCA9IChhZGRpdGlvbmFsRGF0YT86IFBhcnRpYWw8V2hlZWxFdmVudFN0YXRlPikgPT4ge1xuICAgIGNvbnN0IHdoZWVsRXZlbnRTdGF0ZTogV2hlZWxFdmVudFN0YXRlID0ge1xuICAgICAgZXZlbnQ6IGN1cnJlbnRFdmVudCxcbiAgICAgIGlzU3RhcnQ6IGZhbHNlLFxuICAgICAgaXNFbmRpbmc6IGZhbHNlLFxuICAgICAgaXNNb21lbnR1bUNhbmNlbDogZmFsc2UsXG4gICAgICBpc01vbWVudHVtOiBzdGF0ZS5pc01vbWVudHVtLFxuICAgICAgYXhpc0RlbHRhOiBbMCwgMCwgMF0sXG4gICAgICBheGlzVmVsb2NpdHk6IHN0YXRlLmF4aXNWZWxvY2l0eSxcbiAgICAgIGF4aXNNb3ZlbWVudDogc3RhdGUuYXhpc01vdmVtZW50LFxuICAgICAgZ2V0IGF4aXNNb3ZlbWVudFByb2plY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRWZWN0b3JzKFxuICAgICAgICAgIHdoZWVsRXZlbnRTdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNWZWxvY2l0eS5tYXAoKHZlbG9jaXR5KSA9PiBwcm9qZWN0aW9uKHZlbG9jaXR5KSkgYXMgVmVjdG9yWFlaXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICAuLi5hZGRpdGlvbmFsRGF0YSxcbiAgICB9XG5cbiAgICBkaXNwYXRjaCgnd2hlZWwnLCB7XG4gICAgICAuLi53aGVlbEV2ZW50U3RhdGUsXG4gICAgICBwcmV2aW91czogcHJldldoZWVsRXZlbnRTdGF0ZSxcbiAgICB9KVxuXG4gICAgLy8ga2VlcCByZWZlcmVuY2Ugd2l0aG91dCBwcmV2aW91cywgb3RoZXJ3aXNlIHdlIHdvdWxkIGNyZWF0ZSBhIGxvbmcgY2hhaW5cbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gd2hlZWxFdmVudFN0YXRlXG4gIH1cblxuICAvLyBzaG91bGQgcHJldmVudCB3aGVuIHRoZXJlIGlzIG1haW5seSBtb3ZlbWVudCBvbiB0aGUgZGVzaXJlZCBheGlzXG4gIGNvbnN0IHNob3VsZFByZXZlbnREZWZhdWx0ID0gKGRlbHRhTWF4QWJzOiBudW1iZXIsIGF4aXNEZWx0YTogVmVjdG9yWFlaKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBwcmV2ZW50V2hlZWxBY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IFtkZWx0YVgsIGRlbHRhWSwgZGVsdGFaXSA9IGF4aXNEZWx0YVxuXG4gICAgaWYgKHR5cGVvZiBwcmV2ZW50V2hlZWxBY3Rpb24gPT09ICdib29sZWFuJykgcmV0dXJuIHByZXZlbnRXaGVlbEFjdGlvblxuXG4gICAgc3dpdGNoIChwcmV2ZW50V2hlZWxBY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3gnOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFYKSA+PSBkZWx0YU1heEFic1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVkpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWikgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBwcmV2ZW50V2hlZWxBY3Rpb24gdmFsdWU6ICcgKyBwcmV2ZW50V2hlZWxBY3Rpb24sICd3YXJuJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvY2Vzc1doZWVsRXZlbnREYXRhID0gKHdoZWVsRXZlbnQ6IFdoZWVsRXZlbnREYXRhKSA9PiB7XG4gICAgY29uc3QgeyBheGlzRGVsdGEsIHRpbWVTdGFtcCB9ID0gY2xhbXBBeGlzRGVsdGEoXG4gICAgICByZXZlcnNlQXhpc0RlbHRhU2lnbihub3JtYWxpemVXaGVlbCh3aGVlbEV2ZW50KSwgY29uZmlnLnJldmVyc2VTaWduKVxuICAgIClcbiAgICBjb25zdCBkZWx0YU1heEFicyA9IGFic01heChheGlzRGVsdGEpXG5cbiAgICBpZiAod2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCAmJiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YU1heEFicywgYXhpc0RlbHRhKSkge1xuICAgICAgd2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZS5pc1N0YXJ0ZWQpIHtcbiAgICAgIHN0YXJ0KClcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdXNlciBzdGFydGVkIHNjcm9sbGluZyBhZ2FpbiAtPiBjYW5jZWxcbiAgICBlbHNlIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGRlbHRhTWF4QWJzID4gTWF0aC5tYXgoMiwgc3RhdGUubGFzdEFic0RlbHRhICogMikpIHtcbiAgICAgIGVuZCh0cnVlKVxuICAgICAgc3RhcnQoKVxuICAgIH1cblxuICAgIC8vIHNwZWNpYWwgZmluZ2VyIHVwIGV2ZW50IG9uIHdpbmRvd3MgKyBibGlua1xuICAgIGlmIChkZWx0YU1heEFicyA9PT0gMCAmJiBPYmplY3QuaXMgJiYgT2JqZWN0LmlzKHdoZWVsRXZlbnQuZGVsdGFYLCAtMCkpIHtcbiAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gdHJ1ZVxuICAgICAgLy8gcmV0dXJuIC0+IHplcm8gZGVsdGEgZXZlbnQgc2hvdWxkIG5vdCBpbmZsdWVuY2UgdmVsb2NpdHlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGN1cnJlbnRFdmVudCA9IHdoZWVsRXZlbnRcbiAgICBzdGF0ZS5heGlzTW92ZW1lbnQgPSBhZGRWZWN0b3JzKHN0YXRlLmF4aXNNb3ZlbWVudCwgYXhpc0RlbHRhKVxuICAgIHN0YXRlLmxhc3RBYnNEZWx0YSA9IGRlbHRhTWF4QWJzXG4gICAgc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5wdXNoKHtcbiAgICAgIGF4aXNEZWx0YSxcbiAgICAgIHRpbWVTdGFtcCxcbiAgICB9KVxuXG4gICAgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkoKVxuXG4gICAgLy8gb25seSB3aGVlbCBldmVudCAobW92ZSkgYW5kIG5vdCBzdGFydC9lbmQgZ2V0IHRoZSBkZWx0YSB2YWx1ZXNcbiAgICBwdWJsaXNoV2hlZWwoeyBheGlzRGVsdGEsIGlzU3RhcnQ6ICFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkIH0pIC8vIHN0YXRlLmlzTW9tZW50dW0gPyBNT01FTlRVTV9XSEVFTCA6IFdIRUVMLCB7IGF4aXNEZWx0YSB9KVxuXG4gICAgLy8gcHVibGlzaCBzdGFydCBhZnRlciB2ZWxvY2l0eSBldGMuIGhhdmUgYmVlbiB1cGRhdGVkXG4gICAgc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCA9IHRydWVcblxuICAgIC8vIGNhbGMgZGVib3VuY2VkIGVuZCBmdW5jdGlvbiwgdG8gcmVjb2duaXplIGVuZCBvZiB3aGVlbCBldmVudCBzdHJlYW1cbiAgICB3aWxsRW5kKClcbiAgfVxuXG4gIGNvbnN0IG1lcmdlU2Nyb2xsUG9pbnRzQ2FsY1ZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIGlmIChzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9PT0gV0hFRUxFVkVOVFNfVE9fTUVSR0UpIHtcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy51bnNoaWZ0KHtcbiAgICAgICAgYXhpc0RlbHRhU3VtOiBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLm1hcCgoYikgPT4gYi5heGlzRGVsdGEpLnJlZHVjZShhZGRWZWN0b3JzKSxcbiAgICAgICAgdGltZVN0YW1wOiBhdmVyYWdlKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLnRpbWVTdGFtcCkpLFxuICAgICAgfSlcblxuICAgICAgLy8gb25seSB1cGRhdGUgdmVsb2NpdHkgYWZ0ZXIgYSBtZXJnZWQgc2Nyb2xscG9pbnQgd2FzIGdlbmVyYXRlZFxuICAgICAgdXBkYXRlVmVsb2NpdHkoKVxuXG4gICAgICAvLyByZXNldCB0b01lcmdlIGFycmF5XG4gICAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9IDBcblxuICAgICAgLy8gYWZ0ZXIgY2FsY3VsYXRpb24gb2YgdmVsb2NpdHkgb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBtZXJnZWQgc2Nyb2xsUG9pbnRcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy5sZW5ndGggPSAxXG5cbiAgICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgICBkZXRlY3RNb21lbnR1bSgpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCkge1xuICAgICAgdXBkYXRlU3RhcnRWZWxvY2l0eSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlU3RhcnRWZWxvY2l0eSA9ICgpID0+IHtcbiAgICBzdGF0ZS5heGlzVmVsb2NpdHkgPSBsYXN0T2Yoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZSkuYXhpc0RlbHRhLm1hcCgoZCkgPT4gZCAvIHN0YXRlLndpbGxFbmRUaW1lb3V0KSBhcyBWZWN0b3JYWVpcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIC8vIG5lZWQgdG8gaGF2ZSB0d28gcmVjZW50IHBvaW50cyB0byBjYWxjIHZlbG9jaXR5XG4gICAgY29uc3QgW2xhdGVzdFNjcm9sbFBvaW50LCBwcmV2U2Nyb2xsUG9pbnRdID0gc3RhdGUuc2Nyb2xsUG9pbnRzXG5cbiAgICBpZiAoIXByZXZTY3JvbGxQb2ludCB8fCAhbGF0ZXN0U2Nyb2xsUG9pbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHRpbWUgZGVsdGFcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBsYXRlc3RTY3JvbGxQb2ludC50aW1lU3RhbXAgLSBwcmV2U2Nyb2xsUG9pbnQudGltZVN0YW1wXG5cbiAgICBpZiAoZGVsdGFUaW1lIDw9IDApIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCdpbnZhbGlkIGRlbHRhVGltZScpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjYWxjIHRoZSB2ZWxvY2l0eSBwZXIgYXhlc1xuICAgIGNvbnN0IHZlbG9jaXR5ID0gbGF0ZXN0U2Nyb2xsUG9pbnQuYXhpc0RlbHRhU3VtLm1hcCgoZCkgPT4gZCAvIGRlbHRhVGltZSkgYXMgVmVjdG9yWFlaXG5cbiAgICAvLyBjYWxjIHRoZSBhY2NlbGVyYXRpb24gZmFjdG9yIHBlciBheGlzXG4gICAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9yID0gdmVsb2NpdHkubWFwKCh2LCBpKSA9PiB2IC8gKHN0YXRlLmF4aXNWZWxvY2l0eVtpXSB8fCAxKSlcblxuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IHZlbG9jaXR5XG4gICAgc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5wdXNoKGFjY2VsZXJhdGlvbkZhY3RvcilcblxuICAgIHVwZGF0ZVdpbGxFbmRUaW1lb3V0KGRlbHRhVGltZSlcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVdpbGxFbmRUaW1lb3V0ID0gKGRlbHRhVGltZTogbnVtYmVyKSA9PiB7XG4gICAgLy8gdXNlIGN1cnJlbnQgdGltZSBiZXR3ZWVuIGV2ZW50cyByb3VuZGVkIHVwIGFuZCBpbmNyZWFzZWQgYnkgYSBiaXQgYXMgdGltZW91dFxuICAgIGxldCBuZXdUaW1lb3V0ID0gTWF0aC5jZWlsKGRlbHRhVGltZSAvIDEwKSAqIDEwICogMS4yXG5cbiAgICAvLyBkb3VibGUgdGhlIHRpbWVvdXQsIHdoZW4gbW9tZW50dW0gd2FzIG5vdCBkZXRlY3RlZCB5ZXRcbiAgICBpZiAoIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgIG5ld1RpbWVvdXQgPSBNYXRoLm1heCgxMDAsIG5ld1RpbWVvdXQgKiAyKVxuICAgIH1cblxuICAgIHN0YXRlLndpbGxFbmRUaW1lb3V0ID0gTWF0aC5taW4oMTAwMCwgTWF0aC5yb3VuZChuZXdUaW1lb3V0KSlcbiAgfVxuXG4gIGNvbnN0IGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSA9IChhY2NGYWN0b3I6IG51bWJlcikgPT4ge1xuICAgIC8vIHdoZW4gbWFpbiBheGlzIGlzIHRoZSB0aGUgb3RoZXIgb25lIGFuZCB0aGVyZSBpcyBubyBtb3ZlbWVudC9jaGFuZ2Ugb24gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKGFjY0ZhY3RvciA9PT0gMCkgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gYWNjRmFjdG9yIDw9IEFDQ19GQUNUT1JfTUFYICYmIGFjY0ZhY3RvciA+PSBBQ0NfRkFDVE9SX01JTlxuICB9XG5cbiAgY29uc3QgZGV0ZWN0TW9tZW50dW0gPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMubGVuZ3RoID49IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUpIHtcbiAgICAgIGlmIChuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCkge1xuICAgICAgICBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgaWYgKGFic01heChzdGF0ZS5heGlzVmVsb2NpdHkpID49IDAuMikge1xuICAgICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9ycyA9IHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMuc2xpY2UoV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSAqIC0xKVxuXG4gICAgICAvLyBjaGVjayByZWNlbnQgYWNjZWxlcmF0aW9uIC8gZGVjZWxlcmF0aW9uIGZhY3RvcnNcbiAgICAgIC8vIGFsbCByZWNlbnQgbmVlZCB0byBtYXRjaCwgaWYgYW55IGRpZCBub3QgbWF0Y2hcbiAgICAgIGNvbnN0IGRldGVjdGVkTW9tZW50dW0gPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzLmV2ZXJ5KChhY2NGYWMpID0+IHtcbiAgICAgICAgLy8gd2hlbiBib3RoIGF4aXMgZGVjZWxlcmF0ZSBleGFjdGx5IGluIHRoZSBzYW1lIHJhdGUgaXQgaXMgdmVyeSBsaWtlbHkgY2F1c2VkIGJ5IG1vbWVudHVtXG4gICAgICAgIGNvbnN0IHNhbWVBY2NGYWMgPSAhIWFjY0ZhYy5yZWR1Y2UoKGYxLCBmMikgPT4gKGYxICYmIGYxIDwgMSAmJiBmMSA9PT0gZjIgPyAxIDogMCkpXG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYWNjZWxlcmF0aW9uIGZhY3RvciBpcyB3aXRoaW4gbW9tZW50dW0gcmFuZ2VcbiAgICAgICAgY29uc3QgYm90aEFyZUluUmFuZ2VPclplcm8gPSBhY2NGYWMuZmlsdGVyKGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSkubGVuZ3RoID09PSBhY2NGYWMubGVuZ3RoXG5cbiAgICAgICAgLy8gb25lIHRoZSByZXF1aXJlbWVudHMgbXVzdCBiZSBmdWxmaWxsZWRcbiAgICAgICAgcmV0dXJuIHNhbWVBY2NGYWMgfHwgYm90aEFyZUluUmFuZ2VPclplcm9cbiAgICAgIH0pXG5cbiAgICAgIGlmIChkZXRlY3RlZE1vbWVudHVtKSB7XG4gICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZXZlbnRzXG4gICAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzID0gcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9yc1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY29nbml6ZWRNb21lbnR1bSA9ICgpID0+IHtcbiAgICBzdGF0ZS5pc01vbWVudHVtID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgc3RhdGUgPSBjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUoKVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IHRydWVcbiAgICBzdGF0ZS5zdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgcHJldldoZWVsRXZlbnRTdGF0ZSA9IHVuZGVmaW5lZFxuICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHdpbGxFbmQgPSAoKCkgPT4ge1xuICAgIGxldCB3aWxsRW5kSWQ6IG51bWJlclxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQod2lsbEVuZElkKVxuICAgICAgd2lsbEVuZElkID0gc2V0VGltZW91dChlbmQsIHN0YXRlLndpbGxFbmRUaW1lb3V0KVxuICAgIH1cbiAgfSkoKVxuXG4gIGNvbnN0IGVuZCA9IChpc01vbWVudHVtQ2FuY2VsID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkgcmV0dXJuXG5cbiAgICBpZiAoc3RhdGUuaXNNb21lbnR1bSAmJiBpc01vbWVudHVtQ2FuY2VsKSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSwgaXNNb21lbnR1bUNhbmNlbDogdHJ1ZSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSB9KVxuICAgIH1cblxuICAgIHN0YXRlLmlzTW9tZW50dW0gPSBmYWxzZVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IGZhbHNlXG4gIH1cblxuICBjb25zdCB7IG9ic2VydmUsIHVub2JzZXJ2ZSwgZGlzY29ubmVjdCB9ID0gV2hlZWxUYXJnZXRPYnNlcnZlcihmZWVkV2hlZWwpXG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zUGFyYW0pXG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICAgIGZlZWRXaGVlbCxcbiAgICB1cGRhdGVPcHRpb25zLFxuICB9KVxufVxuIiwiZXhwb3J0IGNvbnN0IGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMgPSAoZW1ibGFBcGlNYWluLCBlbWJsYUFwaVRodW1iKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzVGh1bWJzID0gZW1ibGFBcGlUaHVtYi5zbGlkZU5vZGVzKClcblxuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzbGlkZXNUaHVtYnMubWFwKFxuICAgICAgICAoXywgaW5kZXgpID0+ICgpID0+IGVtYmxhQXBpTWFpbi5zY3JvbGxUbyhpbmRleClcbiAgICApXG5cbiAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICBzbGlkZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpbmRleC0tO1xuXG4gICAgICAgICAgICBpZigoaW5kZXggLSAxKSA8IDApIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNsaWRlTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFRvSW5kZXhbaW5kZXhdLCBmYWxzZSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRUb2dnbGVUaHVtYkJ1dHRvbnNBY3RpdmUgPSAoZW1ibGFBcGlNYWluLCBlbWJsYUFwaVRodW1iKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzVGh1bWJzID0gZW1ibGFBcGlUaHVtYi5zbGlkZU5vZGVzKClcblxuICAgIGNvbnN0IHRvZ2dsZVRodW1iQnRuc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBlbWJsYUFwaVRodW1iLnNjcm9sbFRvKGVtYmxhQXBpTWFpbi5zZWxlY3RlZFNjcm9sbFNuYXAoKSlcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBlbWJsYUFwaU1haW4ucHJldmlvdXNTY3JvbGxTbmFwKClcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICAgICAgc2xpZGVzVGh1bWJzW3ByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpXG4gICAgICAgIHNsaWRlc1RodW1ic1tzZWxlY3RlZF0uY2xhc3NMaXN0LmFkZCgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIGVtYmxhQXBpTWFpbi5vbignc2VsZWN0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpXG4gICAgZW1ibGFBcGlUaHVtYi5vbignaW5pdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICAgICAgc2xpZGVzVGh1bWJzW3NlbGVjdGVkXS5jbGFzc0xpc3QucmVtb3ZlKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaSwgcHJldkJ0biwgbmV4dEJ0bikgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFByZXYgPSAoKSA9PiB7XG4gICAgICAgIGVtYmxhQXBpLnNjcm9sbFByZXYoKVxuICAgIH1cbiAgICBjb25zdCBzY3JvbGxOZXh0ID0gKCkgPT4ge1xuICAgICAgICBlbWJsYUFwaS5zY3JvbGxOZXh0KClcbiAgICB9XG4gICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFByZXYsIGZhbHNlKVxuICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxOZXh0LCBmYWxzZSlcblxuICAgIGNvbnN0IHJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSA9IGFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZShcbiAgICAgICAgZW1ibGFBcGksXG4gICAgICAgIHByZXZCdG4sXG4gICAgICAgIG5leHRCdG5cbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoKVxuICAgICAgICBwcmV2QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUHJldiwgZmFsc2UpXG4gICAgICAgIG5leHRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxOZXh0LCBmYWxzZSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZShlbWJsYUFwaSwgcHJldkJ0biwgbmV4dEJ0bikge1xuICAgIGxldCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbFByZXYoKSkge1xuICAgICAgICAgICAgcHJldkJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW1ibGFBcGkuY2FuU2Nyb2xsTmV4dCgpKSB7XG4gICAgICAgICAgICBuZXh0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVtYmxhQXBpXG4gICAgICAgIC5vbignc2VsZWN0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpXG4gICAgICAgIC5vbignaW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKVxuICAgICAgICAub24oJ3JlSW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcHJldkJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNsYW1wTnVtYmVyKG51bWJlcjogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtYmVyLCBtaW4pLCBtYXgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHZhbHVlIGlzIG51bWJlciB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSlcbn1cbiIsImltcG9ydCB7IE9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgaXNOdW1iZXIsIGNsYW1wTnVtYmVyIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7XG4gIENyZWF0ZVBsdWdpblR5cGUsXG4gIEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBTY3JvbGxCb2R5VHlwZVxufSBmcm9tICdlbWJsYS1jYXJvdXNlbCdcblxuZGVjbGFyZSBtb2R1bGUgJ2VtYmxhLWNhcm91c2VsJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBmYWRlOiBGYWRlVHlwZVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIEZhZGVUeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgT3B0aW9uc1R5cGU+XG5cbmV4cG9ydCB0eXBlIEZhZGVPcHRpb25zVHlwZSA9IEZhZGVUeXBlWydvcHRpb25zJ11cblxuZnVuY3Rpb24gRmFkZSh1c2VyT3B0aW9uczogRmFkZU9wdGlvbnNUeXBlID0ge30pOiBGYWRlVHlwZSB7XG4gIGNvbnN0IGZ1bGxPcGFjaXR5ID0gMVxuICBjb25zdCBub09wYWNpdHkgPSAwXG4gIGNvbnN0IGZhZGVGcmljdGlvbiA9IDAuNjhcbiAgY29uc3QgdGltZVN0ZXAgPSAxMDAwIC8gNjBcblxuICBsZXQgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG4gIGxldCBvcGFjaXRpZXM6IG51bWJlcltdID0gW11cbiAgbGV0IGZhZGVUb05leHREaXN0YW5jZTogbnVtYmVyXG4gIGxldCBkaXN0YW5jZUZyb21Qb2ludGVyRG93biA9IDBcbiAgbGV0IGZhZGVWZWxvY2l0eSA9IDBcbiAgbGV0IHByb2dyZXNzID0gMFxuICBsZXQgc2hvdWxkRmFkZVBhaXIgPSBmYWxzZVxuXG4gIGxldCBkZWZhdWx0U2V0dGxlZEJlaGF2aW91cjogU2Nyb2xsQm9keVR5cGVbJ3NldHRsZWQnXVxuICBsZXQgZGVmYXVsdFByb2dyZXNzQmVoYXZpb3VyOiBFbWJsYUNhcm91c2VsVHlwZVsnc2Nyb2xsUHJvZ3Jlc3MnXVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGlJbnN0YW5jZTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBlbWJsYUFwaSA9IGVtYmxhQXBpSW5zdGFuY2VcblxuICAgIGNvbnN0IHNlbGVjdGVkU25hcCA9IGVtYmxhQXBpLnNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gICAgY29uc3QgeyBzY3JvbGxCb2R5LCBjb250YWluZXJSZWN0LCBheGlzIH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgY29udGFpbmVyU2l6ZSA9IGF4aXMubWVhc3VyZVNpemUoY29udGFpbmVyUmVjdClcblxuICAgIGZhZGVUb05leHREaXN0YW5jZSA9IGNsYW1wTnVtYmVyKGNvbnRhaW5lclNpemUgKiAwLjc1LCAyMDAsIDUwMClcbiAgICBzaG91bGRGYWRlUGFpciA9IGZhbHNlXG5cbiAgICBvcGFjaXRpZXMgPSBlbWJsYUFwaVxuICAgICAgLnNjcm9sbFNuYXBMaXN0KClcbiAgICAgIC5tYXAoKF8sIGluZGV4KSA9PiAoaW5kZXggPT09IHNlbGVjdGVkU25hcCA/IGZ1bGxPcGFjaXR5IDogbm9PcGFjaXR5KSlcblxuICAgIGRlZmF1bHRTZXR0bGVkQmVoYXZpb3VyID0gc2Nyb2xsQm9keS5zZXR0bGVkXG4gICAgZGVmYXVsdFByb2dyZXNzQmVoYXZpb3VyID0gZW1ibGFBcGkuc2Nyb2xsUHJvZ3Jlc3NcblxuICAgIHNjcm9sbEJvZHkuc2V0dGxlZCA9IHNldHRsZWRcbiAgICBlbWJsYUFwaS5zY3JvbGxQcm9ncmVzcyA9IHNjcm9sbFByb2dyZXNzXG5cbiAgICBlbWJsYUFwaVxuICAgICAgLm9uKCdzZWxlY3QnLCBzZWxlY3QpXG4gICAgICAub24oJ3NsaWRlRm9jdXMnLCBmYWRlVG9TZWxlY3RlZFNuYXBJbnN0YW50bHkpXG4gICAgICAub24oJ3BvaW50ZXJEb3duJywgcG9pbnRlckRvd24pXG4gICAgICAub24oJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcblxuICAgIGRpc2FibGVTY3JvbGwoKVxuICAgIGZhZGVUb1NlbGVjdGVkU25hcEluc3RhbnRseSgpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgc2Nyb2xsQm9keSB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIHNjcm9sbEJvZHkuc2V0dGxlZCA9IGRlZmF1bHRTZXR0bGVkQmVoYXZpb3VyXG4gICAgZW1ibGFBcGkuc2Nyb2xsUHJvZ3Jlc3MgPSBkZWZhdWx0UHJvZ3Jlc3NCZWhhdmlvdXJcblxuICAgIGVtYmxhQXBpXG4gICAgICAub2ZmKCdzZWxlY3QnLCBzZWxlY3QpXG4gICAgICAub2ZmKCdzbGlkZUZvY3VzJywgZmFkZVRvU2VsZWN0ZWRTbmFwSW5zdGFudGx5KVxuICAgICAgLm9mZigncG9pbnRlckRvd24nLCBwb2ludGVyRG93bilcbiAgICAgIC5vZmYoJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcblxuICAgIGVtYmxhQXBpLnNsaWRlTm9kZXMoKS5mb3JFYWNoKChzbGlkZU5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHNsaWRlU3R5bGUgPSBzbGlkZU5vZGUuc3R5bGVcbiAgICAgIHNsaWRlU3R5bGUub3BhY2l0eSA9ICcnXG4gICAgICBzbGlkZVN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgICBzbGlkZVN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJ1xuICAgICAgaWYgKCFzbGlkZU5vZGUuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSBzbGlkZU5vZGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhZGVUb1NlbGVjdGVkU25hcEluc3RhbnRseSgpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZFNuYXAgPSBlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgIHNldE9wYWNpdGllcyhzZWxlY3RlZFNuYXAsIGZ1bGxPcGFjaXR5KVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlclVwKCk6IHZvaWQge1xuICAgIHNob3VsZEZhZGVQYWlyID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IHZvaWQge1xuICAgIHNob3VsZEZhZGVQYWlyID0gZmFsc2VcbiAgICBkaXN0YW5jZUZyb21Qb2ludGVyRG93biA9IDBcbiAgICBmYWRlVmVsb2NpdHkgPSAwXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3QoKTogdm9pZCB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpLnNjcm9sbEJvZHkuZHVyYXRpb24oKVxuICAgIGZhZGVWZWxvY2l0eSA9IGR1cmF0aW9uID8gMCA6IGZ1bGxPcGFjaXR5XG4gICAgc2hvdWxkRmFkZVBhaXIgPSB0cnVlXG4gICAgaWYgKCFkdXJhdGlvbikgZmFkZVRvU2VsZWN0ZWRTbmFwSW5zdGFudGx5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlVHJhbnNmb3JtKHBvc2l0aW9uOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgYXhpcyB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IHRyYW5zbGF0ZUF4aXMgPSBheGlzLnNjcm9sbC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIGB0cmFuc2xhdGUke3RyYW5zbGF0ZUF4aXN9KCR7YXhpcy5kaXJlY3Rpb24ocG9zaXRpb24pfXB4KWBcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKTogdm9pZCB7XG4gICAgY29uc3QgeyB0cmFuc2xhdGUsIHNsaWRlTG9vcGVyIH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG5cbiAgICB0cmFuc2xhdGUuY2xlYXIoKVxuICAgIHRyYW5zbGF0ZS50b2dnbGVBY3RpdmUoZmFsc2UpXG5cbiAgICBzbGlkZUxvb3Blci5sb29wUG9pbnRzLmZvckVhY2goKHsgdHJhbnNsYXRlIH0pID0+IHtcbiAgICAgIHRyYW5zbGF0ZS5jbGVhcigpXG4gICAgICB0cmFuc2xhdGUudG9nZ2xlQWN0aXZlKGZhbHNlKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBsb2NrRXhjZXNzaXZlU2Nyb2xsKGZhZGVJbmRleDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IHsgc2Nyb2xsU25hcHMsIGxvY2F0aW9uLCB0YXJnZXQgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBpZiAoIWlzTnVtYmVyKGZhZGVJbmRleCkgfHwgb3BhY2l0aWVzW2ZhZGVJbmRleF0gPCAwLjUpIHJldHVyblxuXG4gICAgbG9jYXRpb24uc2V0KHNjcm9sbFNuYXBzW2ZhZGVJbmRleF0pXG4gICAgdGFyZ2V0LnNldChsb2NhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9wYWNpdGllcyhmYWRlSW5kZXg6IG51bWJlciwgdmVsb2NpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFNuYXBzID0gZW1ibGFBcGkuc2Nyb2xsU25hcExpc3QoKVxuXG4gICAgc2Nyb2xsU25hcHMuZm9yRWFjaCgoXywgaW5kZXhBKSA9PiB7XG4gICAgICBjb25zdCBhYnNWZWxvY2l0eSA9IE1hdGguYWJzKHZlbG9jaXR5KVxuICAgICAgY29uc3QgY3VycmVudE9wYWNpdHkgPSBvcGFjaXRpZXNbaW5kZXhBXVxuICAgICAgY29uc3QgaXNGYWRlSW5kZXggPSBpbmRleEEgPT09IGZhZGVJbmRleFxuXG4gICAgICBjb25zdCBuZXh0T3BhY2l0eSA9IGlzRmFkZUluZGV4XG4gICAgICAgID8gY3VycmVudE9wYWNpdHkgKyBhYnNWZWxvY2l0eVxuICAgICAgICA6IGN1cnJlbnRPcGFjaXR5IC0gYWJzVmVsb2NpdHlcblxuICAgICAgY29uc3QgY2xhbXBlZE9wYWNpdHkgPSBjbGFtcE51bWJlcihuZXh0T3BhY2l0eSwgbm9PcGFjaXR5LCBmdWxsT3BhY2l0eSlcbiAgICAgIG9wYWNpdGllc1tpbmRleEFdID0gY2xhbXBlZE9wYWNpdHlcblxuICAgICAgY29uc3QgZmFkZVBhaXIgPSBpc0ZhZGVJbmRleCAmJiBzaG91bGRGYWRlUGFpclxuICAgICAgY29uc3QgaW5kZXhCID0gZW1ibGFBcGkucHJldmlvdXNTY3JvbGxTbmFwKClcblxuICAgICAgaWYgKGZhZGVQYWlyKSBvcGFjaXRpZXNbaW5kZXhCXSA9IDEgLSBjbGFtcGVkT3BhY2l0eVxuICAgICAgaWYgKGlzRmFkZUluZGV4KSBzZXRQcm9ncmVzcyhmYWRlSW5kZXgsIGNsYW1wZWRPcGFjaXR5KVxuXG4gICAgICBzZXRPcGFjaXR5KGluZGV4QSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0T3BhY2l0eShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc2xpZGVzSW5TbmFwID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKS5zbGlkZVJlZ2lzdHJ5W2luZGV4XVxuICAgIGNvbnN0IHsgc2Nyb2xsU25hcHMsIGNvbnRhaW5lclJlY3QgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBvcGFjaXR5ID0gb3BhY2l0aWVzW2luZGV4XVxuXG4gICAgc2xpZGVzSW5TbmFwLmZvckVhY2goKHNsaWRlSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNsaWRlU3R5bGUgPSBlbWJsYUFwaS5zbGlkZU5vZGVzKClbc2xpZGVJbmRleF0uc3R5bGVcbiAgICAgIGNvbnN0IHJvdW5kZWRPcGFjaXR5ID0gcGFyc2VGbG9hdChvcGFjaXR5LnRvRml4ZWQoMikpXG4gICAgICBjb25zdCBoYXNPcGFjaXR5ID0gcm91bmRlZE9wYWNpdHkgPiBub09wYWNpdHlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gaGFzT3BhY2l0eSA/IHNjcm9sbFNuYXBzW2luZGV4XSA6IGNvbnRhaW5lclJlY3Qud2lkdGggKyAyXG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSBnZXRTbGlkZVRyYW5zZm9ybShwb3NpdGlvbilcblxuICAgICAgaWYgKGhhc09wYWNpdHkpIHNsaWRlU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5cbiAgICAgIHNsaWRlU3R5bGUub3BhY2l0eSA9IHJvdW5kZWRPcGFjaXR5LnRvU3RyaW5nKClcbiAgICAgIHNsaWRlU3R5bGUucG9pbnRlckV2ZW50cyA9IG9wYWNpdHkgPiAwLjUgPyAnYXV0bycgOiAnbm9uZSdcblxuICAgICAgaWYgKCFoYXNPcGFjaXR5KSBzbGlkZVN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBzZXRQcm9ncmVzcyhmYWRlSW5kZXg6IG51bWJlciwgb3BhY2l0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbmRleCwgZHJhZ0hhbmRsZXIsIHNjcm9sbFNuYXBzIH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgcG9pbnRlckRvd24gPSBkcmFnSGFuZGxlci5wb2ludGVyRG93bigpXG4gICAgY29uc3Qgc25hcEZyYWN0aW9uID0gMSAvIChzY3JvbGxTbmFwcy5sZW5ndGggLSAxKVxuXG4gICAgbGV0IGluZGV4QSA9IGZhZGVJbmRleFxuICAgIGxldCBpbmRleEIgPSBwb2ludGVyRG93blxuICAgICAgPyBlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgICAgOiBlbWJsYUFwaS5wcmV2aW91c1Njcm9sbFNuYXAoKVxuXG4gICAgaWYgKHBvaW50ZXJEb3duICYmIGluZGV4QSA9PT0gaW5kZXhCKSB7XG4gICAgICBjb25zdCByZXZlcnNlU2lnbiA9IE1hdGguc2lnbihkaXN0YW5jZUZyb21Qb2ludGVyRG93bikgKiAtMVxuICAgICAgaW5kZXhBID0gaW5kZXhCXG4gICAgICBpbmRleEIgPSBpbmRleC5jbG9uZSgpLnNldChpbmRleEIpLmFkZChyZXZlcnNlU2lnbikuZ2V0KClcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBpbmRleEIgKiBzbmFwRnJhY3Rpb25cbiAgICBjb25zdCBkaWZmUG9zaXRpb24gPSAoaW5kZXhBIC0gaW5kZXhCKSAqIHNuYXBGcmFjdGlvblxuICAgIHByb2dyZXNzID0gY3VycmVudFBvc2l0aW9uICsgZGlmZlBvc2l0aW9uICogb3BhY2l0eVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmFkZUluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHsgZHJhZ0hhbmRsZXIsIGluZGV4LCBzY3JvbGxCb2R5IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3Qgc2VsZWN0ZWRTbmFwID0gZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKClcblxuICAgIGlmICghZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSkgcmV0dXJuIHNlbGVjdGVkU25hcFxuXG4gICAgY29uc3QgZGlyZWN0aW9uU2lnbiA9IE1hdGguc2lnbihzY3JvbGxCb2R5LnZlbG9jaXR5KCkpXG4gICAgY29uc3QgZGlzdGFuY2VTaWduID0gTWF0aC5zaWduKGRpc3RhbmNlRnJvbVBvaW50ZXJEb3duKVxuICAgIGNvbnN0IG5leHRTbmFwID0gaW5kZXhcbiAgICAgIC5jbG9uZSgpXG4gICAgICAuc2V0KHNlbGVjdGVkU25hcClcbiAgICAgIC5hZGQoZGlyZWN0aW9uU2lnbiAqIC0xKVxuICAgICAgLmdldCgpXG5cbiAgICBpZiAoIWRpcmVjdGlvblNpZ24gfHwgIWRpc3RhbmNlU2lnbikgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gZGlzdGFuY2VTaWduID09PSBkaXJlY3Rpb25TaWduID8gbmV4dFNuYXAgOiBzZWxlY3RlZFNuYXBcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhZGUoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgeyBkcmFnSGFuZGxlciwgc2Nyb2xsQm9keSB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IGZpeGVkRGVsdGFUaW1lU2Vjb25kcyA9IHRpbWVTdGVwIC8gMTAwMFxuICAgIGNvbnN0IHBvaW50ZXJEb3duID0gZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKVxuICAgIGNvbnN0IHZlbG9jaXR5ID0gc2Nyb2xsQm9keS52ZWxvY2l0eSgpICogZml4ZWREZWx0YVRpbWVTZWNvbmRzXG4gICAgY29uc3QgZHVyYXRpb24gPSBzY3JvbGxCb2R5LmR1cmF0aW9uKClcbiAgICBjb25zdCBmYWRlSW5kZXggPSBnZXRGYWRlSW5kZXgoKVxuICAgIGNvbnN0IG5vRmFkZUluZGV4ID0gIWlzTnVtYmVyKGZhZGVJbmRleClcblxuICAgIGlmIChwb2ludGVyRG93bikge1xuICAgICAgaWYgKCF2ZWxvY2l0eSkgcmV0dXJuXG5cbiAgICAgIGRpc3RhbmNlRnJvbVBvaW50ZXJEb3duICs9IHZlbG9jaXR5XG4gICAgICBmYWRlVmVsb2NpdHkgPSBNYXRoLmFicyh2ZWxvY2l0eSAvIGZhZGVUb05leHREaXN0YW5jZSlcbiAgICAgIGxvY2tFeGNlc3NpdmVTY3JvbGwoZmFkZUluZGV4KVxuICAgIH1cblxuICAgIGlmICghcG9pbnRlckRvd24pIHtcbiAgICAgIGlmICghZHVyYXRpb24gfHwgbm9GYWRlSW5kZXgpIHJldHVyblxuXG4gICAgICBmYWRlVmVsb2NpdHkgKz0gKGZ1bGxPcGFjaXR5IC0gb3BhY2l0aWVzW2ZhZGVJbmRleF0pIC8gZHVyYXRpb25cbiAgICAgIGZhZGVWZWxvY2l0eSAqPSBmYWRlRnJpY3Rpb25cbiAgICB9XG5cbiAgICBpZiAobm9GYWRlSW5kZXgpIHJldHVyblxuICAgIHNldE9wYWNpdGllcyhmYWRlSW5kZXgsIGZhZGVWZWxvY2l0eSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHRsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyB0YXJnZXQsIGxvY2F0aW9uIH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgZGlmZlRvVGFyZ2V0ID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBub3RSZWFjaGVkVGFyZ2V0ID0gTWF0aC5hYnMoZGlmZlRvVGFyZ2V0KSA+PSAxXG4gICAgY29uc3QgZmFkZUluZGV4ID0gZ2V0RmFkZUluZGV4KClcbiAgICBjb25zdCBub0ZhZGVJbmRleCA9ICFpc051bWJlcihmYWRlSW5kZXgpXG5cbiAgICBmYWRlKGVtYmxhQXBpKVxuXG4gICAgaWYgKG5vRmFkZUluZGV4IHx8IG5vdFJlYWNoZWRUYXJnZXQpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBvcGFjaXRpZXNbZmFkZUluZGV4XSA+IDAuOTk5XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcm9ncmVzcygpOiBudW1iZXIge1xuICAgIHJldHVybiBwcm9ncmVzc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogRmFkZVR5cGUgPSB7XG4gICAgbmFtZTogJ2ZhZGUnLFxuICAgIG9wdGlvbnM6IHVzZXJPcHRpb25zLFxuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG5cbmRlY2xhcmUgbmFtZXNwYWNlIEZhZGUge1xuICBsZXQgZ2xvYmFsT3B0aW9uczogRmFkZU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkZhZGUuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBGYWRlXG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEFsaWdubWVudE9wdGlvblR5cGUgPVxuICB8ICdzdGFydCdcbiAgfCAnY2VudGVyJ1xuICB8ICdlbmQnXG4gIHwgKCh2aWV3U2l6ZTogbnVtYmVyLCBzbmFwU2l6ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXIpXG5cbmV4cG9ydCB0eXBlIEFsaWdubWVudFR5cGUgPSB7XG4gIG1lYXN1cmU6IChuOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25tZW50KFxuICBhbGlnbjogQWxpZ25tZW50T3B0aW9uVHlwZSxcbiAgdmlld1NpemU6IG51bWJlclxuKTogQWxpZ25tZW50VHlwZSB7XG4gIGNvbnN0IHByZWRlZmluZWQgPSB7IHN0YXJ0LCBjZW50ZXIsIGVuZCB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZnVuY3Rpb24gY2VudGVyKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZChuKSAvIDJcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAtIG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmUobjogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoaXNTdHJpbmcoYWxpZ24pKSByZXR1cm4gcHJlZGVmaW5lZFthbGlnbl0obilcbiAgICByZXR1cm4gYWxpZ24odmlld1NpemUsIG4sIGluZGV4KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogQWxpZ25tZW50VHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsInR5cGUgRXZlbnROYW1lVHlwZSA9IGtleW9mIERvY3VtZW50RXZlbnRNYXAgfCBrZXlvZiBXaW5kb3dFdmVudE1hcFxudHlwZSBFdmVudEhhbmRsZXJUeXBlID0gKGV2dDogYW55KSA9PiB2b2lkXG50eXBlIEV2ZW50T3B0aW9uc1R5cGUgPSBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCB1bmRlZmluZWRcbnR5cGUgRXZlbnRSZW1vdmVyVHlwZSA9ICgpID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgRXZlbnRTdG9yZVR5cGUgPSB7XG4gIGFkZDogKFxuICAgIG5vZGU6IEV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IEV2ZW50TmFtZVR5cGUsXG4gICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgICBvcHRpb25zPzogRXZlbnRPcHRpb25zVHlwZVxuICApID0+IEV2ZW50U3RvcmVUeXBlXG4gIGNsZWFyOiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudFN0b3JlKCk6IEV2ZW50U3RvcmVUeXBlIHtcbiAgbGV0IGxpc3RlbmVyczogRXZlbnRSZW1vdmVyVHlwZVtdID0gW11cblxuICBmdW5jdGlvbiBhZGQoXG4gICAgbm9kZTogRXZlbnRUYXJnZXQsXG4gICAgdHlwZTogRXZlbnROYW1lVHlwZSxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICAgIG9wdGlvbnM6IEV2ZW50T3B0aW9uc1R5cGUgPSB7IHBhc3NpdmU6IHRydWUgfVxuICApOiBFdmVudFN0b3JlVHlwZSB7XG4gICAgbGV0IHJlbW92ZUxpc3RlbmVyOiBFdmVudFJlbW92ZXJUeXBlXG5cbiAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIG5vZGUpIHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKVxuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVnYWN5TWVkaWFRdWVyeUxpc3QgPSA8TWVkaWFRdWVyeUxpc3Q+bm9kZVxuICAgICAgbGVnYWN5TWVkaWFRdWVyeUxpc3QuYWRkTGlzdGVuZXIoaGFuZGxlcilcbiAgICAgIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4gbGVnYWN5TWVkaWFRdWVyeUxpc3QucmVtb3ZlTGlzdGVuZXIoaGFuZGxlcilcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChyZW1vdmVMaXN0ZW5lcilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcigocmVtb3ZlKSA9PiByZW1vdmUoKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEV2ZW50U3RvcmVUeXBlID0ge1xuICAgIGFkZCxcbiAgICBjbGVhclxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmVUeXBlIH0gZnJvbSAnLi9FbmdpbmUnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNVcGRhdGVUeXBlID0gKFxuICBlbmdpbmU6IEVuZ2luZVR5cGUsXG4gIHRpbWVTdGVwOiBudW1iZXJcbikgPT4gdm9pZFxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1JlbmRlclR5cGUgPSAoXG4gIGVuZ2luZTogRW5naW5lVHlwZSxcbiAgbGFnT2Zmc2V0OiBudW1iZXJcbikgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHN0YXJ0OiAoKSA9PiB2b2lkXG4gIHN0b3A6ICgpID0+IHZvaWRcbiAgdXBkYXRlOiAoKSA9PiB2b2lkXG4gIHJlbmRlcjogKGxhZ09mZnNldDogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbmltYXRpb25zKFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHVwZGF0ZTogKHRpbWVTdGVwOiBudW1iZXIpID0+IHZvaWQsXG4gIHJlbmRlcjogKGxhZ09mZnNldDogbnVtYmVyKSA9PiB2b2lkXG4pOiBBbmltYXRpb25zVHlwZSB7XG4gIGNvbnN0IGRvY3VtZW50VmlzaWJsZUhhbmRsZXIgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgdGltZVN0ZXAgPSAxMDAwIC8gNjBcbiAgbGV0IGxhc3RUaW1lU3RhbXA6IG51bWJlciB8IG51bGwgPSBudWxsXG4gIGxldCBsYWcgPSAwXG4gIGxldCBhbmltYXRpb25GcmFtZSA9IDBcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGRvY3VtZW50VmlzaWJsZUhhbmRsZXIuYWRkKG93bmVyRG9jdW1lbnQsICd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xuICAgICAgaWYgKG93bmVyRG9jdW1lbnQuaGlkZGVuKSByZXNldCgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3RvcCgpXG4gICAgZG9jdW1lbnRWaXNpYmxlSGFuZGxlci5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlKHRpbWVTdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCk6IHZvaWQge1xuICAgIGlmICghYW5pbWF0aW9uRnJhbWUpIHJldHVyblxuICAgIGlmICghbGFzdFRpbWVTdGFtcCkgbGFzdFRpbWVTdGFtcCA9IHRpbWVTdGFtcFxuXG4gICAgY29uc3QgZWxhcHNlZCA9IHRpbWVTdGFtcCAtIGxhc3RUaW1lU3RhbXBcbiAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgbGFnICs9IGVsYXBzZWRcblxuICAgIHdoaWxlIChsYWcgPj0gdGltZVN0ZXApIHtcbiAgICAgIHVwZGF0ZSh0aW1lU3RlcClcbiAgICAgIGxhZyAtPSB0aW1lU3RlcFxuICAgIH1cblxuICAgIGNvbnN0IGxhZ09mZnNldCA9IGxhZyAvIHRpbWVTdGVwXG4gICAgcmVuZGVyKGxhZ09mZnNldClcblxuICAgIGlmIChhbmltYXRpb25GcmFtZSkgb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIHJldHVyblxuXG4gICAgYW5pbWF0aW9uRnJhbWUgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKTogdm9pZCB7XG4gICAgb3duZXJXaW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpXG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBsYWcgPSAwXG4gICAgYW5pbWF0aW9uRnJhbWUgPSAwXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBsYXN0VGltZVN0YW1wID0gbnVsbFxuICAgIGxhZyA9IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFuaW1hdGlvbnNUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBzdGFydCxcbiAgICBzdG9wLFxuICAgIHVwZGF0ZTogKCkgPT4gdXBkYXRlKHRpbWVTdGVwKSxcbiAgICByZW5kZXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5cbmV4cG9ydCB0eXBlIEF4aXNPcHRpb25UeXBlID0gJ3gnIHwgJ3knXG5leHBvcnQgdHlwZSBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZSA9ICdsdHInIHwgJ3J0bCdcbnR5cGUgQXhpc0VkZ2VUeXBlID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCdcblxuZXhwb3J0IHR5cGUgQXhpc1R5cGUgPSB7XG4gIHNjcm9sbDogQXhpc09wdGlvblR5cGVcbiAgY3Jvc3M6IEF4aXNPcHRpb25UeXBlXG4gIHN0YXJ0RWRnZTogQXhpc0VkZ2VUeXBlXG4gIGVuZEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBtZWFzdXJlU2l6ZTogKG5vZGVSZWN0OiBOb2RlUmVjdFR5cGUpID0+IG51bWJlclxuICBkaXJlY3Rpb246IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXhpcyhcbiAgYXhpczogQXhpc09wdGlvblR5cGUsXG4gIGNvbnRlbnREaXJlY3Rpb246IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlXG4pOiBBeGlzVHlwZSB7XG4gIGNvbnN0IGlzUmlnaHRUb0xlZnQgPSBjb250ZW50RGlyZWN0aW9uID09PSAncnRsJ1xuICBjb25zdCBpc1ZlcnRpY2FsID0gYXhpcyA9PT0gJ3knXG4gIGNvbnN0IHNjcm9sbCA9IGlzVmVydGljYWwgPyAneScgOiAneCdcbiAgY29uc3QgY3Jvc3MgPSBpc1ZlcnRpY2FsID8gJ3gnIDogJ3knXG4gIGNvbnN0IHNpZ24gPSAhaXNWZXJ0aWNhbCAmJiBpc1JpZ2h0VG9MZWZ0ID8gLTEgOiAxXG4gIGNvbnN0IHN0YXJ0RWRnZSA9IGdldFN0YXJ0RWRnZSgpXG4gIGNvbnN0IGVuZEVkZ2UgPSBnZXRFbmRFZGdlKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU2l6ZShub2RlUmVjdDogTm9kZVJlY3RUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IG5vZGVSZWN0XG4gICAgcmV0dXJuIGlzVmVydGljYWwgPyBoZWlnaHQgOiB3aWR0aFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RhcnRFZGdlKCk6IEF4aXNFZGdlVHlwZSB7XG4gICAgaWYgKGlzVmVydGljYWwpIHJldHVybiAndG9wJ1xuICAgIHJldHVybiBpc1JpZ2h0VG9MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5kRWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ2JvdHRvbSdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBuICogc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZjogQXhpc1R5cGUgPSB7XG4gICAgc2Nyb2xsLFxuICAgIGNyb3NzLFxuICAgIHN0YXJ0RWRnZSxcbiAgICBlbmRFZGdlLFxuICAgIG1lYXN1cmVTaXplLFxuICAgIGRpcmVjdGlvblxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgTGltaXRUeXBlID0ge1xuICBtaW46IG51bWJlclxuICBtYXg6IG51bWJlclxuICBsZW5ndGg6IG51bWJlclxuICBjb25zdHJhaW46IChuOiBudW1iZXIpID0+IG51bWJlclxuICByZWFjaGVkQW55OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNYXg6IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVhY2hlZE1pbjogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZW1vdmVPZmZzZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGltaXQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDApOiBMaW1pdFR5cGUge1xuICBjb25zdCBsZW5ndGggPSBtYXRoQWJzKG1pbiAtIG1heClcblxuICBmdW5jdGlvbiByZWFjaGVkTWluKG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuIDwgbWluXG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkTWF4KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuID4gbWF4XG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkQW55KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWFjaGVkTWluKG4pIHx8IHJlYWNoZWRNYXgobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghcmVhY2hlZEFueShuKSkgcmV0dXJuIG5cbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSA/IG1pbiA6IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlT2Zmc2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFsZW5ndGgpIHJldHVybiBuXG4gICAgcmV0dXJuIG4gLSBsZW5ndGggKiBNYXRoLmNlaWwoKG4gLSBtYXgpIC8gbGVuZ3RoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogTGltaXRUeXBlID0ge1xuICAgIGxlbmd0aCxcbiAgICBtYXgsXG4gICAgbWluLFxuICAgIGNvbnN0cmFpbixcbiAgICByZWFjaGVkQW55LFxuICAgIHJlYWNoZWRNYXgsXG4gICAgcmVhY2hlZE1pbixcbiAgICByZW1vdmVPZmZzZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIENvdW50ZXJUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGFkZDogKG46IG51bWJlcikgPT4gQ291bnRlclR5cGVcbiAgY2xvbmU6ICgpID0+IENvdW50ZXJUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudGVyKFxuICBtYXg6IG51bWJlcixcbiAgc3RhcnQ6IG51bWJlcixcbiAgbG9vcDogYm9vbGVhblxuKTogQ291bnRlclR5cGUge1xuICBjb25zdCB7IGNvbnN0cmFpbiB9ID0gTGltaXQoMCwgbWF4KVxuICBjb25zdCBsb29wRW5kID0gbWF4ICsgMVxuICBsZXQgY291bnRlciA9IHdpdGhpbkxpbWl0KHN0YXJ0KVxuXG4gIGZ1bmN0aW9uIHdpdGhpbkxpbWl0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICFsb29wID8gY29uc3RyYWluKG4pIDogbWF0aEFicygobG9vcEVuZCArIG4pICUgbG9vcEVuZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjb3VudGVyXG4gIH1cblxuICBmdW5jdGlvbiBzZXQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIGNvdW50ZXIgPSB3aXRoaW5MaW1pdChuKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBjbG9uZSgpLnNldChnZXQoKSArIG4pXG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZSgpOiBDb3VudGVyVHlwZSB7XG4gICAgcmV0dXJuIENvdW50ZXIobWF4LCBnZXQoKSwgbG9vcClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IENvdW50ZXJUeXBlID0ge1xuICAgIGdldCxcbiAgICBzZXQsXG4gICAgYWRkLFxuICAgIGNsb25lXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgQW5pbWF0aW9uc1R5cGUgfSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IERyYWdUcmFja2VyVHlwZSwgUG9pbnRlckV2ZW50VHlwZSB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5pbXBvcnQgeyBMaW1pdCB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQge1xuICBkZWx0YUFicyxcbiAgZmFjdG9yQWJzLFxuICBpc0Jvb2xlYW4sXG4gIGlzTW91c2VFdmVudCxcbiAgbWF0aEFicyxcbiAgbWF0aFNpZ24sXG4gIFdpbmRvd1R5cGVcbn0gZnJvbSAnLi91dGlscydcblxudHlwZSBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZSA9IChcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBldnQ6IFBvaW50ZXJFdmVudFR5cGVcbikgPT4gYm9vbGVhbiB8IHZvaWRcblxuZXhwb3J0IHR5cGUgRHJhZ0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IERyYWdIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHBvaW50ZXJEb3duOiAoKSA9PiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmFnSGFuZGxlcihcbiAgYXhpczogQXhpc1R5cGUsXG4gIHJvb3ROb2RlOiBIVE1MRWxlbWVudCxcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgZHJhZ1RyYWNrZXI6IERyYWdUcmFja2VyVHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZSxcbiAgaW5kZXg6IENvdW50ZXJUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlLFxuICBkcmFnRnJlZTogYm9vbGVhbixcbiAgZHJhZ1RocmVzaG9sZDogbnVtYmVyLFxuICBza2lwU25hcHM6IGJvb2xlYW4sXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyLFxuICB3YXRjaERyYWc6IERyYWdIYW5kbGVyT3B0aW9uVHlwZVxuKTogRHJhZ0hhbmRsZXJUeXBlIHtcbiAgY29uc3QgeyBjcm9zczogY3Jvc3NBeGlzLCBkaXJlY3Rpb24gfSA9IGF4aXNcbiAgY29uc3QgZm9jdXNOb2RlcyA9IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ11cbiAgY29uc3Qgbm9uUGFzc2l2ZUV2ZW50ID0geyBwYXNzaXZlOiBmYWxzZSB9XG4gIGNvbnN0IGluaXRFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZHJhZ0V2ZW50cyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBnb1RvTmV4dFRocmVzaG9sZCA9IExpbWl0KDUwLCAyMjUpLmNvbnN0cmFpbihwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMjApKVxuICBjb25zdCBzbmFwRm9yY2VCb29zdCA9IHsgbW91c2U6IDMwMCwgdG91Y2g6IDQwMCB9XG4gIGNvbnN0IGZyZWVGb3JjZUJvb3N0ID0geyBtb3VzZTogNTAwLCB0b3VjaDogNjAwIH1cbiAgY29uc3QgYmFzZVNwZWVkID0gZHJhZ0ZyZWUgPyA0MyA6IDI1XG5cbiAgbGV0IGlzTW92aW5nID0gZmFsc2VcbiAgbGV0IHN0YXJ0U2Nyb2xsID0gMFxuICBsZXQgc3RhcnRDcm9zcyA9IDBcbiAgbGV0IHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICBsZXQgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gIGxldCBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICBsZXQgaXNNb3VzZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoRHJhZykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkb3duSWZBbGxvd2VkKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaERyYWcpIHx8IHdhdGNoRHJhZyhlbWJsYUFwaSwgZXZ0KSkgZG93bihldnQpXG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlXG4gICAgaW5pdEV2ZW50c1xuICAgICAgLmFkZChub2RlLCAnZHJhZ3N0YXJ0JywgKGV2dCkgPT4gZXZ0LnByZXZlbnREZWZhdWx0KCksIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsICgpID0+IHVuZGVmaW5lZCwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAndG91Y2hlbmQnLCAoKSA9PiB1bmRlZmluZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaHN0YXJ0JywgZG93bklmQWxsb3dlZClcbiAgICAgIC5hZGQobm9kZSwgJ21vdXNlZG93bicsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGNhbmNlbCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnY29udGV4dG1lbnUnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NsaWNrJywgY2xpY2ssIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGluaXRFdmVudHMuY2xlYXIoKVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRHJhZ0V2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gaXNNb3VzZSA/IG93bmVyRG9jdW1lbnQgOiByb290Tm9kZVxuICAgIGRyYWdFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsIG1vdmUsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgdXApXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZW1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZXVwJywgdXApXG4gIH1cblxuICBmdW5jdGlvbiBpc0ZvY3VzTm9kZShub2RlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lIHx8ICcnXG4gICAgcmV0dXJuIGZvY3VzTm9kZXMuaW5jbHVkZXMobm9kZU5hbWUpXG4gIH1cblxuICBmdW5jdGlvbiBmb3JjZUJvb3N0KCk6IG51bWJlciB7XG4gICAgY29uc3QgYm9vc3QgPSBkcmFnRnJlZSA/IGZyZWVGb3JjZUJvb3N0IDogc25hcEZvcmNlQm9vc3RcbiAgICBjb25zdCB0eXBlID0gaXNNb3VzZSA/ICdtb3VzZScgOiAndG91Y2gnXG4gICAgcmV0dXJuIGJvb3N0W3R5cGVdXG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd2VkRm9yY2UoZm9yY2U6IG51bWJlciwgdGFyZ2V0Q2hhbmdlZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgbmV4dCA9IGluZGV4LmFkZChtYXRoU2lnbihmb3JjZSkgKiAtMSlcbiAgICBjb25zdCBiYXNlRm9yY2UgPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZShmb3JjZSwgIWRyYWdGcmVlKS5kaXN0YW5jZVxuXG4gICAgaWYgKGRyYWdGcmVlIHx8IG1hdGhBYnMoZm9yY2UpIDwgZ29Ub05leHRUaHJlc2hvbGQpIHJldHVybiBiYXNlRm9yY2VcbiAgICBpZiAoc2tpcFNuYXBzICYmIHRhcmdldENoYW5nZWQpIHJldHVybiBiYXNlRm9yY2UgKiAwLjVcblxuICAgIHJldHVybiBzY3JvbGxUYXJnZXQuYnlJbmRleChuZXh0LmdldCgpLCAwKS5kaXN0YW5jZVxuICB9XG5cbiAgZnVuY3Rpb24gZG93bihldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc01vdXNlRXZ0ID0gaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaXNNb3VzZSA9IGlzTW91c2VFdnRcbiAgICBwcmV2ZW50Q2xpY2sgPSBkcmFnRnJlZSAmJiBpc01vdXNlRXZ0ICYmICFldnQuYnV0dG9ucyAmJiBpc01vdmluZ1xuICAgIGlzTW92aW5nID0gZGVsdGFBYnModGFyZ2V0LmdldCgpLCBsb2NhdGlvbi5nZXQoKSkgPj0gMlxuXG4gICAgaWYgKGlzTW91c2VFdnQgJiYgZXZ0LmJ1dHRvbiAhPT0gMCkgcmV0dXJuXG4gICAgaWYgKGlzRm9jdXNOb2RlKGV2dC50YXJnZXQgYXMgRWxlbWVudCkpIHJldHVyblxuXG4gICAgcG9pbnRlcklzRG93biA9IHRydWVcbiAgICBkcmFnVHJhY2tlci5wb2ludGVyRG93bihldnQpXG4gICAgc2Nyb2xsQm9keS51c2VGcmljdGlvbigwKS51c2VEdXJhdGlvbigwKVxuICAgIHRhcmdldC5zZXQobG9jYXRpb24pXG4gICAgYWRkRHJhZ0V2ZW50cygpXG4gICAgc3RhcnRTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIHN0YXJ0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJEb3duJylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNUb3VjaEV2dCA9ICFpc01vdXNlRXZlbnQoZXZ0LCBvd25lcldpbmRvdylcbiAgICBpZiAoaXNUb3VjaEV2dCAmJiBldnQudG91Y2hlcy5sZW5ndGggPj0gMikgcmV0dXJuIHVwKGV2dClcblxuICAgIGNvbnN0IGxhc3RTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIGNvbnN0IGxhc3RDcm9zcyA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQsIGNyb3NzQXhpcylcbiAgICBjb25zdCBkaWZmU2Nyb2xsID0gZGVsdGFBYnMobGFzdFNjcm9sbCwgc3RhcnRTY3JvbGwpXG4gICAgY29uc3QgZGlmZkNyb3NzID0gZGVsdGFBYnMobGFzdENyb3NzLCBzdGFydENyb3NzKVxuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsICYmICFpc01vdXNlKSB7XG4gICAgICBpZiAoIWV2dC5jYW5jZWxhYmxlKSByZXR1cm4gdXAoZXZ0KVxuICAgICAgcHJldmVudFNjcm9sbCA9IGRpZmZTY3JvbGwgPiBkaWZmQ3Jvc3NcbiAgICAgIGlmICghcHJldmVudFNjcm9sbCkgcmV0dXJuIHVwKGV2dClcbiAgICB9XG4gICAgY29uc3QgZGlmZiA9IGRyYWdUcmFja2VyLnBvaW50ZXJNb3ZlKGV2dClcbiAgICBpZiAoZGlmZlNjcm9sbCA+IGRyYWdUaHJlc2hvbGQpIHByZXZlbnRDbGljayA9IHRydWVcblxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMC4zKS51c2VEdXJhdGlvbigwLjc1KVxuICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgdGFyZ2V0LmFkZChkaXJlY3Rpb24oZGlmZikpXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKDAsIGZhbHNlKVxuICAgIGNvbnN0IHRhcmdldENoYW5nZWQgPSBjdXJyZW50TG9jYXRpb24uaW5kZXggIT09IGluZGV4LmdldCgpXG4gICAgY29uc3QgcmF3Rm9yY2UgPSBkcmFnVHJhY2tlci5wb2ludGVyVXAoZXZ0KSAqIGZvcmNlQm9vc3QoKVxuICAgIGNvbnN0IGZvcmNlID0gYWxsb3dlZEZvcmNlKGRpcmVjdGlvbihyYXdGb3JjZSksIHRhcmdldENoYW5nZWQpXG4gICAgY29uc3QgZm9yY2VGYWN0b3IgPSBmYWN0b3JBYnMocmF3Rm9yY2UsIGZvcmNlKVxuICAgIGNvbnN0IHNwZWVkID0gYmFzZVNwZWVkIC0gMTAgKiBmb3JjZUZhY3RvclxuICAgIGNvbnN0IGZyaWN0aW9uID0gYmFzZUZyaWN0aW9uICsgZm9yY2VGYWN0b3IgLyA1MFxuXG4gICAgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gICAgcG9pbnRlcklzRG93biA9IGZhbHNlXG4gICAgZHJhZ0V2ZW50cy5jbGVhcigpXG4gICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbihzcGVlZCkudXNlRnJpY3Rpb24oZnJpY3Rpb24pXG4gICAgc2Nyb2xsVG8uZGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSlcbiAgICBpc01vdXNlID0gZmFsc2VcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9pbnRlclVwJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChwcmV2ZW50Q2xpY2spIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHByZXZlbnRDbGljayA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBvaW50ZXJJc0Rvd25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgcG9pbnRlckRvd25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc09wdGlvblR5cGUsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgaXNNb3VzZUV2ZW50LCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBQb2ludGVyQ29vcmRUeXBlID0ga2V5b2YgVG91Y2ggfCBrZXlvZiBNb3VzZUV2ZW50XG5leHBvcnQgdHlwZSBQb2ludGVyRXZlbnRUeXBlID0gVG91Y2hFdmVudCB8IE1vdXNlRXZlbnRcblxuZXhwb3J0IHR5cGUgRHJhZ1RyYWNrZXJUeXBlID0ge1xuICBwb2ludGVyRG93bjogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJNb3ZlOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcG9pbnRlclVwOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcmVhZFBvaW50OiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlLCBldnRBeGlzPzogQXhpc09wdGlvblR5cGUpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ1RyYWNrZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogRHJhZ1RyYWNrZXJUeXBlIHtcbiAgY29uc3QgbG9nSW50ZXJ2YWwgPSAxNzBcblxuICBsZXQgc3RhcnRFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuICBsZXQgbGFzdEV2ZW50OiBQb2ludGVyRXZlbnRUeXBlXG5cbiAgZnVuY3Rpb24gcmVhZFRpbWUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZXZ0LnRpbWVTdGFtcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFBvaW50KGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IGV2dEF4aXMgfHwgYXhpcy5zY3JvbGxcbiAgICBjb25zdCBjb29yZDogUG9pbnRlckNvb3JkVHlwZSA9IGBjbGllbnQke3Byb3BlcnR5ID09PSAneCcgPyAnWCcgOiAnWSd9YFxuICAgIHJldHVybiAoaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpID8gZXZ0IDogZXZ0LnRvdWNoZXNbMF0pW2Nvb3JkXVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBzdGFydEV2ZW50ID0gZXZ0XG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgcmV0dXJuIHJlYWRQb2ludChldnQpXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyTW92ZShldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmYgPSByZWFkUG9pbnQoZXZ0KSAtIHJlYWRQb2ludChsYXN0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShzdGFydEV2ZW50KSA+IGxvZ0ludGVydmFsXG5cbiAgICBsYXN0RXZlbnQgPSBldnRcbiAgICBpZiAoZXhwaXJlZCkgc3RhcnRFdmVudCA9IGV2dFxuICAgIHJldHVybiBkaWZmXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVXAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBpZiAoIXN0YXJ0RXZlbnQgfHwgIWxhc3RFdmVudCkgcmV0dXJuIDBcbiAgICBjb25zdCBkaWZmRHJhZyA9IHJlYWRQb2ludChsYXN0RXZlbnQpIC0gcmVhZFBvaW50KHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZGlmZlRpbWUgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudClcbiAgICBjb25zdCBleHBpcmVkID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKGxhc3RFdmVudCkgPiBsb2dJbnRlcnZhbFxuICAgIGNvbnN0IGZvcmNlID0gZGlmZkRyYWcgLyBkaWZmVGltZVxuICAgIGNvbnN0IGlzRmxpY2sgPSBkaWZmVGltZSAmJiAhZXhwaXJlZCAmJiBtYXRoQWJzKGZvcmNlKSA+IDAuMVxuXG4gICAgcmV0dXJuIGlzRmxpY2sgPyBmb3JjZSA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdUcmFja2VyVHlwZSA9IHtcbiAgICBwb2ludGVyRG93bixcbiAgICBwb2ludGVyTW92ZSxcbiAgICBwb2ludGVyVXAsXG4gICAgcmVhZFBvaW50XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIE5vZGVSZWN0VHlwZSA9IHtcbiAgdG9wOiBudW1iZXJcbiAgcmlnaHQ6IG51bWJlclxuICBib3R0b206IG51bWJlclxuICBsZWZ0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBOb2RlUmVjdHNUeXBlID0ge1xuICBtZWFzdXJlOiAobm9kZTogSFRNTEVsZW1lbnQpID0+IE5vZGVSZWN0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTm9kZVJlY3RzKCk6IE5vZGVSZWN0c1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG5vZGU6IEhUTUxFbGVtZW50KTogTm9kZVJlY3RUeXBlIHtcbiAgICBjb25zdCB7IG9mZnNldFRvcCwgb2Zmc2V0TGVmdCwgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gbm9kZVxuICAgIGNvbnN0IG9mZnNldDogTm9kZVJlY3RUeXBlID0ge1xuICAgICAgdG9wOiBvZmZzZXRUb3AsXG4gICAgICByaWdodDogb2Zmc2V0TGVmdCArIG9mZnNldFdpZHRoLFxuICAgICAgYm90dG9tOiBvZmZzZXRUb3AgKyBvZmZzZXRIZWlnaHQsXG4gICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHRcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBjb25zdCBzZWxmOiBOb2RlUmVjdHNUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiZXhwb3J0IHR5cGUgUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gIG1lYXN1cmU6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGVyY2VudE9mVmlldyh2aWV3U2l6ZTogbnVtYmVyKTogUGVyY2VudE9mVmlld1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplICogKG4gLyAxMDApXG4gIH1cblxuICBjb25zdCBzZWxmOiBQZXJjZW50T2ZWaWV3VHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBOb2RlUmVjdHNUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzaXplSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBheGlzOiBBeGlzVHlwZSxcbiAgd2F0Y2hSZXNpemU6IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlLFxuICBub2RlUmVjdHM6IE5vZGVSZWN0c1R5cGVcbik6IFJlc2l6ZUhhbmRsZXJUeXBlIHtcbiAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlclxuICBsZXQgY29udGFpbmVyU2l6ZTogbnVtYmVyXG4gIGxldCBzbGlkZVNpemVzOiBudW1iZXJbXSA9IFtdXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHJlYWRTaXplKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gYXhpcy5tZWFzdXJlU2l6ZShub2RlUmVjdHMubWVhc3VyZShub2RlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFJlc2l6ZSkgcmV0dXJuXG5cbiAgICBjb250YWluZXJTaXplID0gcmVhZFNpemUoY29udGFpbmVyKVxuICAgIHNsaWRlU2l6ZXMgPSBzbGlkZXMubWFwKHJlYWRTaXplKVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdENhbGxiYWNrKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIGNvbnN0IGlzQ29udGFpbmVyID0gZW50cnkudGFyZ2V0ID09PSBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHNsaWRlcy5pbmRleE9mKDxIVE1MRWxlbWVudD5lbnRyeS50YXJnZXQpXG4gICAgICAgIGNvbnN0IGxhc3RTaXplID0gaXNDb250YWluZXIgPyBjb250YWluZXJTaXplIDogc2xpZGVTaXplc1tzbGlkZUluZGV4XVxuICAgICAgICBjb25zdCBuZXdTaXplID0gcmVhZFNpemUoaXNDb250YWluZXIgPyBjb250YWluZXIgOiBzbGlkZXNbc2xpZGVJbmRleF0pXG4gICAgICAgIGNvbnN0IGRpZmZTaXplID0gbWF0aEFicyhuZXdTaXplIC0gbGFzdFNpemUpXG5cbiAgICAgICAgaWYgKGRpZmZTaXplID49IDAuNSkge1xuICAgICAgICAgIG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaFJlc2l6ZSkgfHwgd2F0Y2hSZXNpemUoZW1ibGFBcGksIGVudHJpZXMpKSB7XG4gICAgICAgIGRlZmF1bHRDYWxsYmFjayhlbnRyaWVzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBvYnNlcnZlTm9kZXMgPSBbY29udGFpbmVyXS5jb25jYXQoc2xpZGVzKVxuICAgIG9ic2VydmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiByZXNpemVPYnNlcnZlci5vYnNlcnZlKG5vZGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoU2lnbiwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgZGlyZWN0aW9uOiAoKSA9PiBudW1iZXJcbiAgZHVyYXRpb246ICgpID0+IG51bWJlclxuICB2ZWxvY2l0eTogKCkgPT4gbnVtYmVyXG4gIHNlZWs6ICh0aW1lU3RlcDogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxuICBzZXR0bGVkOiAoKSA9PiBib29sZWFuXG4gIHVzZUJhc2VGcmljdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlQmFzZUR1cmF0aW9uOiAoKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VGcmljdGlvbjogKG46IG51bWJlcikgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRHVyYXRpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxCb2R5KFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBvZmZzZXRMb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBwcmV2aW91c0xvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHRhcmdldDogVmVjdG9yMURUeXBlLFxuICBiYXNlRHVyYXRpb246IG51bWJlcixcbiAgYmFzZUZyaWN0aW9uOiBudW1iZXJcbik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgbGV0IGJvZHlWZWxvY2l0eSA9IDBcbiAgbGV0IHNjcm9sbERpcmVjdGlvbiA9IDBcbiAgbGV0IHNjcm9sbER1cmF0aW9uID0gYmFzZUR1cmF0aW9uXG4gIGxldCBzY3JvbGxGcmljdGlvbiA9IGJhc2VGcmljdGlvblxuICBsZXQgcmF3TG9jYXRpb24gPSBsb2NhdGlvbi5nZXQoKVxuICBsZXQgcmF3TG9jYXRpb25QcmV2aW91cyA9IDBcblxuICBmdW5jdGlvbiBzZWVrKHRpbWVTdGVwOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgY29uc3QgZml4ZWREZWx0YVRpbWVTZWNvbmRzID0gdGltZVN0ZXAgLyAxMDAwXG4gICAgY29uc3QgZHVyYXRpb24gPSBzY3JvbGxEdXJhdGlvbiAqIGZpeGVkRGVsdGFUaW1lU2Vjb25kc1xuICAgIGNvbnN0IGRpZmYgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGlzSW5zdGFudCA9ICFzY3JvbGxEdXJhdGlvblxuICAgIGxldCBkaXJlY3Rpb25EaWZmID0gMFxuXG4gICAgaWYgKGlzSW5zdGFudCkge1xuICAgICAgYm9keVZlbG9jaXR5ID0gMFxuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQodGFyZ2V0KVxuICAgICAgbG9jYXRpb24uc2V0KHRhcmdldClcblxuICAgICAgZGlyZWN0aW9uRGlmZiA9IGRpZmZcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQobG9jYXRpb24pXG5cbiAgICAgIGJvZHlWZWxvY2l0eSArPSBkaWZmIC8gZHVyYXRpb25cbiAgICAgIGJvZHlWZWxvY2l0eSAqPSBzY3JvbGxGcmljdGlvblxuICAgICAgcmF3TG9jYXRpb24gKz0gYm9keVZlbG9jaXR5XG4gICAgICBsb2NhdGlvbi5hZGQoYm9keVZlbG9jaXR5ICogZml4ZWREZWx0YVRpbWVTZWNvbmRzKVxuXG4gICAgICBkaXJlY3Rpb25EaWZmID0gcmF3TG9jYXRpb24gLSByYXdMb2NhdGlvblByZXZpb3VzXG4gICAgfVxuXG4gICAgc2Nyb2xsRGlyZWN0aW9uID0gbWF0aFNpZ24oZGlyZWN0aW9uRGlmZilcbiAgICByYXdMb2NhdGlvblByZXZpb3VzID0gcmF3TG9jYXRpb25cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gc2V0dGxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaWZmID0gdGFyZ2V0LmdldCgpIC0gb2Zmc2V0TG9jYXRpb24uZ2V0KClcbiAgICByZXR1cm4gbWF0aEFicyhkaWZmKSA8IDAuMDAxXG4gIH1cblxuICBmdW5jdGlvbiBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEdXJhdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gZGlyZWN0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbERpcmVjdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gdmVsb2NpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYm9keVZlbG9jaXR5XG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRHVyYXRpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VEdXJhdGlvbihiYXNlRHVyYXRpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRnJpY3Rpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VGcmljdGlvbihiYXNlRnJpY3Rpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VEdXJhdGlvbihuOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgc2Nyb2xsRHVyYXRpb24gPSBuXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUZyaWN0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxGcmljdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQm9keVR5cGUgPSB7XG4gICAgZGlyZWN0aW9uLFxuICAgIGR1cmF0aW9uLFxuICAgIHZlbG9jaXR5LFxuICAgIHNlZWssXG4gICAgc2V0dGxlZCxcbiAgICB1c2VCYXNlRnJpY3Rpb24sXG4gICAgdXNlQmFzZUR1cmF0aW9uLFxuICAgIHVzZUZyaWN0aW9uLFxuICAgIHVzZUR1cmF0aW9uXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQm91bmRzVHlwZSA9IHtcbiAgc2hvdWxkQ29uc3RyYWluOiAoKSA9PiBib29sZWFuXG4gIGNvbnN0cmFpbjogKHBvaW50ZXJEb3duOiBib29sZWFuKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm91bmRzKFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlXG4pOiBTY3JvbGxCb3VuZHNUeXBlIHtcbiAgY29uc3QgcHVsbEJhY2tUaHJlc2hvbGQgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMTApXG4gIGNvbnN0IGVkZ2VPZmZzZXRUb2xlcmFuY2UgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoNTApXG4gIGNvbnN0IGZyaWN0aW9uTGltaXQgPSBMaW1pdCgwLjEsIDAuOTkpXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gc2hvdWxkQ29uc3RyYWluKCk6IGJvb2xlYW4ge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KHRhcmdldC5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIGlmICghbGltaXQucmVhY2hlZEFueShsb2NhdGlvbi5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4ocG9pbnRlckRvd246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZENvbnN0cmFpbigpKSByZXR1cm5cbiAgICBjb25zdCBlZGdlID0gbGltaXQucmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSkgPyAnbWluJyA6ICdtYXgnXG4gICAgY29uc3QgZGlmZlRvRWRnZSA9IG1hdGhBYnMobGltaXRbZWRnZV0gLSBsb2NhdGlvbi5nZXQoKSlcbiAgICBjb25zdCBkaWZmVG9UYXJnZXQgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGZyaWN0aW9uID0gZnJpY3Rpb25MaW1pdC5jb25zdHJhaW4oZGlmZlRvRWRnZSAvIGVkZ2VPZmZzZXRUb2xlcmFuY2UpXG5cbiAgICB0YXJnZXQuc3VidHJhY3QoZGlmZlRvVGFyZ2V0ICogZnJpY3Rpb24pXG5cbiAgICBpZiAoIXBvaW50ZXJEb3duICYmIG1hdGhBYnMoZGlmZlRvVGFyZ2V0KSA8IHB1bGxCYWNrVGhyZXNob2xkKSB7XG4gICAgICB0YXJnZXQuc2V0KGxpbWl0LmNvbnN0cmFpbih0YXJnZXQuZ2V0KCkpKVxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigyNSkudXNlQmFzZUZyaWN0aW9uKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICAgIHNob3VsZENvbnN0cmFpbixcbiAgICBjb25zdHJhaW4sXG4gICAgdG9nZ2xlQWN0aXZlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgYXJyYXlJc0xhc3RJbmRleCwgYXJyYXlMYXN0LCBkZWx0YUFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5PcHRpb25UeXBlID0gZmFsc2UgfCAndHJpbVNuYXBzJyB8ICdrZWVwU25hcHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICBzbmFwc0NvbnRhaW5lZDogbnVtYmVyW11cbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbENvbnRhaW4oXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW10sXG4gIGNvbnRhaW5TY3JvbGw6IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTY3JvbGxDb250YWluVHlwZSB7XG4gIGNvbnN0IHNjcm9sbEJvdW5kcyA9IExpbWl0KC1jb250ZW50U2l6ZSArIHZpZXdTaXplLCAwKVxuICBjb25zdCBzbmFwc0JvdW5kZWQgPSBtZWFzdXJlQm91bmRlZCgpXG4gIGNvbnN0IHNjcm9sbENvbnRhaW5MaW1pdCA9IGZpbmRTY3JvbGxDb250YWluTGltaXQoKVxuICBjb25zdCBzbmFwc0NvbnRhaW5lZCA9IG1lYXN1cmVDb250YWluZWQoKVxuXG4gIGZ1bmN0aW9uIHVzZVBpeGVsVG9sZXJhbmNlKGJvdW5kOiBudW1iZXIsIHNuYXA6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWx0YUFicyhib3VuZCwgc25hcCkgPCAxXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2Nyb2xsQ29udGFpbkxpbWl0KCk6IExpbWl0VHlwZSB7XG4gICAgY29uc3Qgc3RhcnRTbmFwID0gc25hcHNCb3VuZGVkWzBdXG4gICAgY29uc3QgZW5kU25hcCA9IGFycmF5TGFzdChzbmFwc0JvdW5kZWQpXG4gICAgY29uc3QgbWluID0gc25hcHNCb3VuZGVkLmxhc3RJbmRleE9mKHN0YXJ0U25hcClcbiAgICBjb25zdCBtYXggPSBzbmFwc0JvdW5kZWQuaW5kZXhPZihlbmRTbmFwKSArIDFcbiAgICByZXR1cm4gTGltaXQobWluLCBtYXgpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQm91bmRlZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNuYXBzQWxpZ25lZFxuICAgICAgLm1hcCgoc25hcEFsaWduZWQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbEJvdW5kc1xuICAgICAgICBjb25zdCBzbmFwID0gc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihzbmFwQWxpZ25lZClcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9ICFpbmRleFxuICAgICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KHNuYXBzQWxpZ25lZCwgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gbWF4XG4gICAgICAgIGlmIChpc0xhc3QpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1pbiwgc25hcCkpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1heCwgc25hcCkpIHJldHVybiBtYXhcbiAgICAgICAgcmV0dXJuIHNuYXBcbiAgICAgIH0pXG4gICAgICAubWFwKChzY3JvbGxCb3VuZCkgPT4gcGFyc2VGbG9hdChzY3JvbGxCb3VuZC50b0ZpeGVkKDMpKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVDb250YWluZWQoKTogbnVtYmVyW10ge1xuICAgIGlmIChjb250ZW50U2l6ZSA8PSB2aWV3U2l6ZSArIHBpeGVsVG9sZXJhbmNlKSByZXR1cm4gW3Njcm9sbEJvdW5kcy5tYXhdXG4gICAgaWYgKGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnKSByZXR1cm4gc25hcHNCb3VuZGVkXG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gICAgcmV0dXJuIHNuYXBzQm91bmRlZC5zbGljZShtaW4sIG1heClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICAgIHNuYXBzQ29udGFpbmVkLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IGFycmF5TGFzdCB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgbGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTGltaXQoXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgbG9vcDogYm9vbGVhblxuKTogU2Nyb2xsTGltaXRUeXBlIHtcbiAgY29uc3QgbWF4ID0gc2Nyb2xsU25hcHNbMF1cbiAgY29uc3QgbWluID0gbG9vcCA/IG1heCAtIGNvbnRlbnRTaXplIDogYXJyYXlMYXN0KHNjcm9sbFNuYXBzKVxuICBjb25zdCBsaW1pdCA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgICBsaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExvb3BlclR5cGUgPSB7XG4gIGxvb3A6IChkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTG9vcGVyKFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB2ZWN0b3JzOiBWZWN0b3IxRFR5cGVbXVxuKTogU2Nyb2xsTG9vcGVyVHlwZSB7XG4gIGNvbnN0IGpvaW50U2FmZXR5ID0gMC4xXG4gIGNvbnN0IG1pbiA9IGxpbWl0Lm1pbiArIGpvaW50U2FmZXR5XG4gIGNvbnN0IG1heCA9IGxpbWl0Lm1heCArIGpvaW50U2FmZXR5XG4gIGNvbnN0IHsgcmVhY2hlZE1pbiwgcmVhY2hlZE1heCB9ID0gTGltaXQobWluLCBtYXgpXG5cbiAgZnVuY3Rpb24gc2hvdWxkTG9vcChkaXJlY3Rpb246IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHJldHVybiByZWFjaGVkTWF4KGxvY2F0aW9uLmdldCgpKVxuICAgIGlmIChkaXJlY3Rpb24gPT09IC0xKSByZXR1cm4gcmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSlcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZExvb3AoZGlyZWN0aW9uKSkgcmV0dXJuXG5cbiAgICBjb25zdCBsb29wRGlzdGFuY2UgPSBjb250ZW50U2l6ZSAqIChkaXJlY3Rpb24gKiAtMSlcbiAgICB2ZWN0b3JzLmZvckVhY2goKHYpID0+IHYuYWRkKGxvb3BEaXN0YW5jZSkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxMb29wZXJUeXBlID0ge1xuICAgIGxvb3BcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICBnZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsUHJvZ3Jlc3MobGltaXQ6IExpbWl0VHlwZSk6IFNjcm9sbFByb2dyZXNzVHlwZSB7XG4gIGNvbnN0IHsgbWF4LCBsZW5ndGggfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gZ2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uID0gbiAtIG1heFxuICAgIHJldHVybiBsZW5ndGggPyBjdXJyZW50TG9jYXRpb24gLyAtbGVuZ3RoIDogMFxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICAgIGdldFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnRUeXBlIH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IGFycmF5TGFzdCwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgc25hcHM6IG51bWJlcltdXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFNuYXBzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgYWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlXG4pOiBTY3JvbGxTbmFwc1R5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSB9ID0gYXhpc1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCBhbGlnbm1lbnRzID0gbWVhc3VyZVNpemVzKCkubWFwKGFsaWdubWVudC5tZWFzdXJlKVxuICBjb25zdCBzbmFwcyA9IG1lYXN1cmVVbmFsaWduZWQoKVxuICBjb25zdCBzbmFwc0FsaWduZWQgPSBtZWFzdXJlQWxpZ25lZCgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemVzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc2xpZGVSZWN0cylcbiAgICAgIC5tYXAoKHJlY3RzKSA9PiBhcnJheUxhc3QocmVjdHMpW2VuZEVkZ2VdIC0gcmVjdHNbMF1bc3RhcnRFZGdlXSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVVbmFsaWduZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbGlkZVJlY3RzXG4gICAgICAubWFwKChyZWN0KSA9PiBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKChzbmFwKSA9PiAtbWF0aEFicyhzbmFwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVBbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc25hcHMpXG4gICAgICAubWFwKChnKSA9PiBnWzBdKVxuICAgICAgLm1hcCgoc25hcCwgaW5kZXgpID0+IHNuYXAgKyBhbGlnbm1lbnRzW2luZGV4XSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgICBzbmFwcyxcbiAgICBzbmFwc0FsaWduZWRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7XG4gIGFycmF5RnJvbU51bWJlcixcbiAgYXJyYXlJc0xhc3RJbmRleCxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleFxufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgc2xpZGVSZWdpc3RyeTogbnVtYmVyW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVSZWdpc3RyeShcbiAgY29udGFpblNuYXBzOiBib29sZWFuLFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZSxcbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuKTogU2xpZGVSZWdpc3RyeVR5cGUge1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxDb250YWluTGltaXRcbiAgY29uc3Qgc2xpZGVSZWdpc3RyeSA9IGNyZWF0ZVNsaWRlUmVnaXN0cnkoKVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlUmVnaXN0cnkoKTogbnVtYmVyW11bXSB7XG4gICAgY29uc3QgZ3JvdXBlZFNsaWRlSW5kZXhlcyA9IGdyb3VwU2xpZGVzKHNsaWRlSW5kZXhlcylcbiAgICBjb25zdCBkb05vdENvbnRhaW4gPSAhY29udGFpblNuYXBzIHx8IGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnXG5cbiAgICBpZiAoc2Nyb2xsU25hcHMubGVuZ3RoID09PSAxKSByZXR1cm4gW3NsaWRlSW5kZXhlc11cbiAgICBpZiAoZG9Ob3RDb250YWluKSByZXR1cm4gZ3JvdXBlZFNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXMuc2xpY2UobWluLCBtYXgpLm1hcCgoZ3JvdXAsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgoZ3JvdXBzLCBpbmRleClcblxuICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3QoZ3JvdXBzWzBdKSArIDFcbiAgICAgICAgcmV0dXJuIGFycmF5RnJvbU51bWJlcihyYW5nZSlcbiAgICAgIH1cbiAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3RJbmRleChzbGlkZUluZGV4ZXMpIC0gYXJyYXlMYXN0KGdyb3VwcylbMF0gKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UsIGFycmF5TGFzdChncm91cHMpWzBdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdyb3VwXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlUmVnaXN0cnlUeXBlID0ge1xuICAgIHNsaWRlUmVnaXN0cnlcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMsIG1hdGhTaWduIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVGFyZ2V0VHlwZSA9IHtcbiAgZGlzdGFuY2U6IG51bWJlclxuICBpbmRleDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gIGJ5SW5kZXg6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IFRhcmdldFR5cGVcbiAgYnlEaXN0YW5jZTogKGZvcmNlOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IFRhcmdldFR5cGVcbiAgc2hvcnRjdXQ6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVGFyZ2V0KFxuICBsb29wOiBib29sZWFuLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlXG4pOiBTY3JvbGxUYXJnZXRUeXBlIHtcbiAgY29uc3QgeyByZWFjaGVkQW55LCByZW1vdmVPZmZzZXQsIGNvbnN0cmFpbiB9ID0gbGltaXRcblxuICBmdW5jdGlvbiBtaW5EaXN0YW5jZShkaXN0YW5jZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGlzdGFuY2VzLmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IG1hdGhBYnMoYSkgLSBtYXRoQWJzKGIpKVswXVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFRhcmdldFNuYXAodGFyZ2V0OiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IGxvb3AgPyByZW1vdmVPZmZzZXQodGFyZ2V0KSA6IGNvbnN0cmFpbih0YXJnZXQpXG4gICAgY29uc3QgYXNjRGlmZnNUb1NuYXBzID0gc2Nyb2xsU25hcHNcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiAoeyBkaWZmOiBzaG9ydGN1dChzbmFwIC0gZGlzdGFuY2UsIDApLCBpbmRleCB9KSlcbiAgICAgIC5zb3J0KChkMSwgZDIpID0+IG1hdGhBYnMoZDEuZGlmZikgLSBtYXRoQWJzKGQyLmRpZmYpKVxuXG4gICAgY29uc3QgeyBpbmRleCB9ID0gYXNjRGlmZnNUb1NuYXBzWzBdXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3J0Y3V0KHRhcmdldDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFt0YXJnZXQsIHRhcmdldCArIGNvbnRlbnRTaXplLCB0YXJnZXQgLSBjb250ZW50U2l6ZV1cblxuICAgIGlmICghbG9vcCkgcmV0dXJuIHRhcmdldFxuICAgIGlmICghZGlyZWN0aW9uKSByZXR1cm4gbWluRGlzdGFuY2UodGFyZ2V0cylcblxuICAgIGNvbnN0IG1hdGNoaW5nVGFyZ2V0cyA9IHRhcmdldHMuZmlsdGVyKCh0KSA9PiBtYXRoU2lnbih0KSA9PT0gZGlyZWN0aW9uKVxuICAgIGlmIChtYXRjaGluZ1RhcmdldHMubGVuZ3RoKSByZXR1cm4gbWluRGlzdGFuY2UobWF0Y2hpbmdUYXJnZXRzKVxuICAgIHJldHVybiBhcnJheUxhc3QodGFyZ2V0cykgLSBjb250ZW50U2l6ZVxuICB9XG5cbiAgZnVuY3Rpb24gYnlJbmRleChpbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRWZWN0b3IuZ2V0KClcbiAgICBjb25zdCBkaXN0YW5jZSA9IHNob3J0Y3V0KGRpZmZUb1NuYXAsIGRpcmVjdGlvbilcbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnlEaXN0YW5jZShkaXN0YW5jZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0VmVjdG9yLmdldCgpICsgZGlzdGFuY2VcbiAgICBjb25zdCB7IGluZGV4LCBkaXN0YW5jZTogdGFyZ2V0U25hcERpc3RhbmNlIH0gPSBmaW5kVGFyZ2V0U25hcCh0YXJnZXQpXG4gICAgY29uc3QgcmVhY2hlZEJvdW5kID0gIWxvb3AgJiYgcmVhY2hlZEFueSh0YXJnZXQpXG5cbiAgICBpZiAoIXNuYXAgfHwgcmVhY2hlZEJvdW5kKSByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuXG4gICAgY29uc3QgZGlmZlRvU25hcCA9IHNjcm9sbFNuYXBzW2luZGV4XSAtIHRhcmdldFNuYXBEaXN0YW5jZVxuICAgIGNvbnN0IHNuYXBEaXN0YW5jZSA9IGRpc3RhbmNlICsgc2hvcnRjdXQoZGlmZlRvU25hcCwgMClcblxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZTogc25hcERpc3RhbmNlIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gICAgYnlEaXN0YW5jZSxcbiAgICBieUluZGV4LFxuICAgIHNob3J0Y3V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUsIFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRvVHlwZSA9IHtcbiAgZGlzdGFuY2U6IChuOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IHZvaWRcbiAgaW5kZXg6IChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxUbyhcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgaW5kZXhDdXJyZW50OiBDb3VudGVyVHlwZSxcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IFNjcm9sbFRvVHlwZSB7XG4gIGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldDogVGFyZ2V0VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGRpc3RhbmNlRGlmZiA9IHRhcmdldC5kaXN0YW5jZVxuICAgIGNvbnN0IGluZGV4RGlmZiA9IHRhcmdldC5pbmRleCAhPT0gaW5kZXhDdXJyZW50LmdldCgpXG5cbiAgICB0YXJnZXRWZWN0b3IuYWRkKGRpc3RhbmNlRGlmZilcblxuICAgIGlmIChkaXN0YW5jZURpZmYpIHtcbiAgICAgIGlmIChzY3JvbGxCb2R5LmR1cmF0aW9uKCkpIHtcbiAgICAgICAgYW5pbWF0aW9uLnN0YXJ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgICBhbmltYXRpb24ucmVuZGVyKDEpXG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmRleERpZmYpIHtcbiAgICAgIGluZGV4UHJldmlvdXMuc2V0KGluZGV4Q3VycmVudC5nZXQoKSlcbiAgICAgIGluZGV4Q3VycmVudC5zZXQodGFyZ2V0LmluZGV4KVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NlbGVjdCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzdGFuY2UobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2Uobiwgc25hcClcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBmdW5jdGlvbiBpbmRleChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleEN1cnJlbnQuY2xvbmUoKS5zZXQobilcbiAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxUYXJnZXQuYnlJbmRleCh0YXJnZXRJbmRleC5nZXQoKSwgZGlyZWN0aW9uKVxuICAgIHNjcm9sbFRvKHRhcmdldClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRvVHlwZSA9IHtcbiAgICBkaXN0YW5jZSxcbiAgICBpbmRleFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVGb2N1cyhcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IFNsaWRlRm9jdXNUeXBlIHtcbiAgbGV0IGxhc3RUYWJQcmVzc1RpbWUgPSAwXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBldmVudFN0b3JlLmFkZChkb2N1bWVudCwgJ2tleWRvd24nLCByZWdpc3RlclRhYlByZXNzLCBmYWxzZSlcbiAgICBzbGlkZXMuZm9yRWFjaChhZGRTbGlkZUZvY3VzRXZlbnQpXG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlclRhYlByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdUYWInKSBsYXN0VGFiUHJlc3NUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNsaWRlRm9jdXNFdmVudChzbGlkZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBmb2N1cyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgY29uc3QgZGlmZlRpbWUgPSBub3dUaW1lIC0gbGFzdFRhYlByZXNzVGltZVxuXG4gICAgICBpZiAoZGlmZlRpbWUgPiAxMCkgcmV0dXJuXG5cbiAgICAgIHJvb3Quc2Nyb2xsTGVmdCA9IDBcbiAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2Yoc2xpZGUpXG4gICAgICBjb25zdCBncm91cCA9IHNsaWRlUmVnaXN0cnkuZmluZEluZGV4KChncm91cCkgPT4gZ3JvdXAuaW5jbHVkZXMoaW5kZXgpKVxuXG4gICAgICBpZiAoIWlzTnVtYmVyKGdyb3VwKSkgcmV0dXJuXG5cbiAgICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oMClcbiAgICAgIHNjcm9sbFRvLmluZGV4KGdyb3VwLCAwKVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXMnKVxuICAgIH1cblxuICAgIGV2ZW50U3RvcmUuYWRkKHNsaWRlLCAnZm9jdXMnLCBmb2N1cywge1xuICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVGb2N1c1R5cGUgPSB7XG4gICAgaW5pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFZlY3RvcjFEVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIGFkZDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxuICBzdWJ0cmFjdDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVmVjdG9yMUQoaW5pdGlhbFZhbHVlOiBudW1iZXIpOiBWZWN0b3IxRFR5cGUge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWVcblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgKz0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlIC09IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVJbnB1dChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpc051bWJlcihuKSA/IG4gOiBuLmdldCgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBWZWN0b3IxRFR5cGUgPSB7XG4gICAgZ2V0LFxuICAgIHNldCxcbiAgICBhZGQsXG4gICAgc3VidHJhY3RcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5cbmV4cG9ydCB0eXBlIFRyYW5zbGF0ZVR5cGUgPSB7XG4gIGNsZWFyOiAoKSA9PiB2b2lkXG4gIHRvOiAodGFyZ2V0OiBudW1iZXIpID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGUoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50XG4pOiBUcmFuc2xhdGVUeXBlIHtcbiAgY29uc3QgdHJhbnNsYXRlID0gYXhpcy5zY3JvbGwgPT09ICd4JyA/IHggOiB5XG4gIGNvbnN0IGNvbnRhaW5lclN0eWxlID0gY29udGFpbmVyLnN0eWxlXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24geChuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoJHtufXB4LDBweCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24geShuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoMHB4LCR7bn1weCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24gdG8odGFyZ2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuICAgIGNvbnRhaW5lclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zbGF0ZShheGlzLmRpcmVjdGlvbih0YXJnZXQpKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIGlmICghY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogVHJhbnNsYXRlVHlwZSA9IHtcbiAgICBjbGVhcixcbiAgICB0byxcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBhcnJheUtleXMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcblxudHlwZSBTbGlkZUJvdW5kVHlwZSA9IHtcbiAgc3RhcnQ6IG51bWJlclxuICBlbmQ6IG51bWJlclxufVxuXG50eXBlIExvb3BQb2ludFR5cGUgPSB7XG4gIGxvb3BQb2ludDogbnVtYmVyXG4gIGluZGV4OiBudW1iZXJcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICB0YXJnZXQ6ICgpID0+IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTbGlkZUxvb3BlclR5cGUgPSB7XG4gIGNhbkxvb3A6ICgpID0+IGJvb2xlYW5cbiAgY2xlYXI6ICgpID0+IHZvaWRcbiAgbG9vcDogKCkgPT4gdm9pZFxuICBsb29wUG9pbnRzOiBMb29wUG9pbnRUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlTG9vcGVyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc2xpZGVTaXplczogbnVtYmVyW10sXG4gIHNsaWRlU2l6ZXNXaXRoR2FwczogbnVtYmVyW10sXG4gIHNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W11cbik6IFNsaWRlTG9vcGVyVHlwZSB7XG4gIGNvbnN0IHJvdW5kaW5nU2FmZXR5ID0gMC41XG4gIGNvbnN0IGFzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgZGVzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcykucmV2ZXJzZSgpXG4gIGNvbnN0IGxvb3BQb2ludHMgPSBzdGFydFBvaW50cygpLmNvbmNhdChlbmRQb2ludHMoKSlcblxuICBmdW5jdGlvbiByZW1vdmVTbGlkZVNpemVzKGluZGV4ZXM6IG51bWJlcltdLCBmcm9tOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleGVzLnJlZHVjZSgoYTogbnVtYmVyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYSAtIHNsaWRlU2l6ZXNXaXRoR2Fwc1tpXVxuICAgIH0sIGZyb20pXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJbkdhcChpbmRleGVzOiBudW1iZXJbXSwgZ2FwOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXJbXSwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVtYWluaW5nR2FwID0gcmVtb3ZlU2xpZGVTaXplcyhhLCBnYXApXG4gICAgICByZXR1cm4gcmVtYWluaW5nR2FwID4gMCA/IGEuY29uY2F0KFtpXSkgOiBhXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0OiBudW1iZXIpOiBTbGlkZUJvdW5kVHlwZVtdIHtcbiAgICByZXR1cm4gc25hcHMubWFwKChzbmFwLCBpbmRleCkgPT4gKHtcbiAgICAgIHN0YXJ0OiBzbmFwIC0gc2xpZGVTaXplc1tpbmRleF0gKyByb3VuZGluZ1NhZmV0eSArIG9mZnNldCxcbiAgICAgIGVuZDogc25hcCArIHZpZXdTaXplIC0gcm91bmRpbmdTYWZldHkgKyBvZmZzZXRcbiAgICB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRMb29wUG9pbnRzKFxuICAgIGluZGV4ZXM6IG51bWJlcltdLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGlzRW5kRWRnZTogYm9vbGVhblxuICApOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IHNsaWRlQm91bmRzID0gZmluZFNsaWRlQm91bmRzKG9mZnNldClcblxuICAgIHJldHVybiBpbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBpc0VuZEVkZ2UgPyAwIDogLWNvbnRlbnRTaXplXG4gICAgICBjb25zdCBhbHRlcmVkID0gaXNFbmRFZGdlID8gY29udGVudFNpemUgOiAwXG4gICAgICBjb25zdCBib3VuZEVkZ2UgPSBpc0VuZEVkZ2UgPyAnZW5kJyA6ICdzdGFydCdcbiAgICAgIGNvbnN0IGxvb3BQb2ludCA9IHNsaWRlQm91bmRzW2luZGV4XVtib3VuZEVkZ2VdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBsb29wUG9pbnQsXG4gICAgICAgIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEKC0xKSxcbiAgICAgICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgc2xpZGVzW2luZGV4XSksXG4gICAgICAgIHRhcmdldDogKCkgPT4gKGxvY2F0aW9uLmdldCgpID4gbG9vcFBvaW50ID8gaW5pdGlhbCA6IGFsdGVyZWQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gc2Nyb2xsU25hcHNbMF1cbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoZGVzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIGNvbnRlbnRTaXplLCBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFBvaW50cygpOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IGdhcCA9IHZpZXdTaXplIC0gc2Nyb2xsU25hcHNbMF0gLSAxXG4gICAgY29uc3QgaW5kZXhlcyA9IHNsaWRlc0luR2FwKGFzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIC1jb250ZW50U2l6ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvb3BQb2ludHMuZXZlcnkoKHsgaW5kZXggfSkgPT4ge1xuICAgICAgY29uc3Qgb3RoZXJJbmRleGVzID0gYXNjSXRlbXMuZmlsdGVyKChpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIHJldHVybiByZW1vdmVTbGlkZVNpemVzKG90aGVySW5kZXhlcywgdmlld1NpemUpIDw9IDAuMVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCwgdHJhbnNsYXRlLCBzbGlkZUxvY2F0aW9uIH0gPSBsb29wUG9pbnRcbiAgICAgIGNvbnN0IHNoaWZ0TG9jYXRpb24gPSB0YXJnZXQoKVxuICAgICAgaWYgKHNoaWZ0TG9jYXRpb24gPT09IHNsaWRlTG9jYXRpb24uZ2V0KCkpIHJldHVyblxuICAgICAgdHJhbnNsYXRlLnRvKHNoaWZ0TG9jYXRpb24pXG4gICAgICBzbGlkZUxvY2F0aW9uLnNldChzaGlmdExvY2F0aW9uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsb29wUG9pbnRzLmZvckVhY2goKGxvb3BQb2ludCkgPT4gbG9vcFBvaW50LnRyYW5zbGF0ZS5jbGVhcigpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVMb29wZXJUeXBlID0ge1xuICAgIGNhbkxvb3AsXG4gICAgY2xlYXIsXG4gICAgbG9vcCxcbiAgICBsb29wUG9pbnRzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0hhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hTbGlkZXM6IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlXG4pOiBTbGlkZXNIYW5kbGVyVHlwZSB7XG4gIGxldCBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFNsaWRlcykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZXNDaGFuZ2VkJylcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaFNsaWRlcykgfHwgd2F0Y2hTbGlkZXMoZW1ibGFBcGksIG11dGF0aW9ucykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKG11dGF0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXIpIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IG9iamVjdEtleXMgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHtcbiAgW2tleTogbnVtYmVyXTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVxufVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSA9IEludGVyc2VjdGlvbk9ic2VydmVySW5pdFsndGhyZXNob2xkJ11cblxuZXhwb3J0IHR5cGUgU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIGdldDogKGluVmlldz86IGJvb2xlYW4pID0+IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNJblZpZXcoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB0aHJlc2hvbGQ6IFNsaWRlc0luVmlld09wdGlvbnNUeXBlXG4pOiBTbGlkZXNJblZpZXdUeXBlIHtcbiAgY29uc3QgaW50ZXJzZWN0aW9uRW50cnlNYXA6IEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHt9XG4gIGxldCBpblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgbm90SW5WaWV3Q2FjaGU6IG51bWJlcltdIHwgbnVsbCA9IG51bGxcbiAgbGV0IGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgKGVudHJpZXMpID0+IHtcbiAgICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG5cbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2YoPEhUTUxFbGVtZW50PmVudHJ5LnRhcmdldClcbiAgICAgICAgICBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF0gPSBlbnRyeVxuICAgICAgICB9KVxuXG4gICAgICAgIGluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBub3RJblZpZXdDYWNoZSA9IG51bGxcbiAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0luVmlldycpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBjb250YWluZXIucGFyZW50RWxlbWVudCxcbiAgICAgICAgdGhyZXNob2xkXG4gICAgICB9XG4gICAgKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiBpbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHNsaWRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGludGVyc2VjdGlvbk9ic2VydmVyKSBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJblZpZXdMaXN0KGluVmlldzogYm9vbGVhbik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gb2JqZWN0S2V5cyhpbnRlcnNlY3Rpb25FbnRyeU1hcCkucmVkdWNlKFxuICAgICAgKGxpc3Q6IG51bWJlcltdLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleClcbiAgICAgICAgY29uc3QgeyBpc0ludGVyc2VjdGluZyB9ID0gaW50ZXJzZWN0aW9uRW50cnlNYXBbaW5kZXhdXG4gICAgICAgIGNvbnN0IGluVmlld01hdGNoID0gaW5WaWV3ICYmIGlzSW50ZXJzZWN0aW5nXG4gICAgICAgIGNvbnN0IG5vdEluVmlld01hdGNoID0gIWluVmlldyAmJiAhaXNJbnRlcnNlY3RpbmdcblxuICAgICAgICBpZiAoaW5WaWV3TWF0Y2ggfHwgbm90SW5WaWV3TWF0Y2gpIGxpc3QucHVzaChpbmRleClcbiAgICAgICAgcmV0dXJuIGxpc3RcbiAgICAgIH0sXG4gICAgICBbXVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldChpblZpZXc6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICAgIGlmIChpblZpZXcgJiYgaW5WaWV3Q2FjaGUpIHJldHVybiBpblZpZXdDYWNoZVxuICAgIGlmICghaW5WaWV3ICYmIG5vdEluVmlld0NhY2hlKSByZXR1cm4gbm90SW5WaWV3Q2FjaGVcblxuICAgIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3KVxuXG4gICAgaWYgKGluVmlldykgaW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcbiAgICBpZiAoIWluVmlldykgbm90SW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBzbGlkZUluZGV4ZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc0luVmlld1R5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIGdldFxuICB9XG5cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVNpemVzVHlwZSA9IHtcbiAgc2xpZGVTaXplczogbnVtYmVyW11cbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXVxuICBzdGFydEdhcDogbnVtYmVyXG4gIGVuZEdhcDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZVNpemVzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICByZWFkRWRnZUdhcDogYm9vbGVhbixcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IFNsaWRlU2l6ZXNUeXBlIHtcbiAgY29uc3QgeyBtZWFzdXJlU2l6ZSwgc3RhcnRFZGdlLCBlbmRFZGdlIH0gPSBheGlzXG4gIGNvbnN0IHdpdGhFZGdlR2FwID0gc2xpZGVSZWN0c1swXSAmJiByZWFkRWRnZUdhcFxuICBjb25zdCBzdGFydEdhcCA9IG1lYXN1cmVTdGFydEdhcCgpXG4gIGNvbnN0IGVuZEdhcCA9IG1lYXN1cmVFbmRHYXAoKVxuICBjb25zdCBzbGlkZVNpemVzID0gc2xpZGVSZWN0cy5tYXAobWVhc3VyZVNpemUpXG4gIGNvbnN0IHNsaWRlU2l6ZXNXaXRoR2FwcyA9IG1lYXN1cmVXaXRoR2FwcygpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVN0YXJ0R2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzbGlkZVJlY3QgPSBzbGlkZVJlY3RzWzBdXG4gICAgcmV0dXJuIG1hdGhBYnMoY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0W3N0YXJ0RWRnZV0pXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlRW5kR2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJyYXlMYXN0KHNsaWRlcykpXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShgbWFyZ2luLSR7ZW5kRWRnZX1gKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVXaXRoR2FwcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNsaWRlUmVjdHNcbiAgICAgIC5tYXAoKHJlY3QsIGluZGV4LCByZWN0cykgPT4ge1xuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgocmVjdHMsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgc3RhcnRHYXBcbiAgICAgICAgaWYgKGlzTGFzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgZW5kR2FwXG4gICAgICAgIHJldHVybiByZWN0c1tpbmRleCArIDFdW3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV1cbiAgICAgIH0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVNpemVzVHlwZSA9IHtcbiAgICBzbGlkZVNpemVzLFxuICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXBcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7XG4gIGFycmF5S2V5cyxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleCxcbiAgaXNOdW1iZXIsXG4gIG1hdGhBYnNcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlID0gJ2F1dG8nIHwgbnVtYmVyXG5cbmV4cG9ydCB0eXBlIFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgZ3JvdXBTbGlkZXM6IDxUeXBlPihhcnJheTogVHlwZVtdKSA9PiBUeXBlW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzVG9TY3JvbGwoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlLFxuICBsb29wOiBib29sZWFuLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzdGFydEdhcDogbnVtYmVyLFxuICBlbmRHYXA6IG51bWJlcixcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2xpZGVzVG9TY3JvbGxUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UsIGRpcmVjdGlvbiB9ID0gYXhpc1xuICBjb25zdCBncm91cEJ5TnVtYmVyID0gaXNOdW1iZXIoc2xpZGVzVG9TY3JvbGwpXG5cbiAgZnVuY3Rpb24gYnlOdW1iZXI8VHlwZT4oYXJyYXk6IFR5cGVbXSwgZ3JvdXBTaXplOiBudW1iZXIpOiBUeXBlW11bXSB7XG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgJSBncm91cFNpemUgPT09IDApXG4gICAgICAubWFwKChpKSA9PiBhcnJheS5zbGljZShpLCBpICsgZ3JvdXBTaXplKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5U2l6ZTxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gW11cblxuICAgIHJldHVybiBhcnJheUtleXMoYXJyYXkpXG4gICAgICAucmVkdWNlKChncm91cHM6IG51bWJlcltdLCByZWN0QiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdEEgPSBhcnJheUxhc3QoZ3JvdXBzKSB8fCAwXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSByZWN0QSA9PT0gMFxuICAgICAgICBjb25zdCBpc0xhc3QgPSByZWN0QiA9PT0gYXJyYXlMYXN0SW5kZXgoYXJyYXkpXG5cbiAgICAgICAgY29uc3QgZWRnZUEgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RBXVtzdGFydEVkZ2VdXG4gICAgICAgIGNvbnN0IGVkZ2VCID0gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0c1tyZWN0Ql1bZW5kRWRnZV1cbiAgICAgICAgY29uc3QgZ2FwQSA9ICFsb29wICYmIGlzRmlyc3QgPyBkaXJlY3Rpb24oc3RhcnRHYXApIDogMFxuICAgICAgICBjb25zdCBnYXBCID0gIWxvb3AgJiYgaXNMYXN0ID8gZGlyZWN0aW9uKGVuZEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IG1hdGhBYnMoZWRnZUIgLSBnYXBCIC0gKGVkZ2VBICsgZ2FwQSkpXG5cbiAgICAgICAgaWYgKGluZGV4ICYmIGNodW5rU2l6ZSA+IHZpZXdTaXplICsgcGl4ZWxUb2xlcmFuY2UpIGdyb3Vwcy5wdXNoKHJlY3RCKVxuICAgICAgICBpZiAoaXNMYXN0KSBncm91cHMucHVzaChhcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBncm91cHNcbiAgICAgIH0sIFtdKVxuICAgICAgLm1hcCgoY3VycmVudFNpemUsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTaXplID0gTWF0aC5tYXgoZ3JvdXBzW2luZGV4IC0gMV0gfHwgMClcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKHByZXZpb3VzU2l6ZSwgY3VycmVudFNpemUpXG4gICAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ3JvdXBTbGlkZXM8VHlwZT4oYXJyYXk6IFR5cGVbXSk6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gZ3JvdXBCeU51bWJlciA/IGJ5TnVtYmVyKGFycmF5LCBzbGlkZXNUb1Njcm9sbCkgOiBieVNpemUoYXJyYXkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNUb1Njcm9sbFR5cGUgPSB7XG4gICAgZ3JvdXBTbGlkZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50IH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQge1xuICBBbmltYXRpb25zLFxuICBBbmltYXRpb25zVHlwZSxcbiAgQW5pbWF0aW9uc1VwZGF0ZVR5cGUsXG4gIEFuaW1hdGlvbnNSZW5kZXJUeXBlXG59IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IEF4aXMsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgQ291bnRlciwgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnSGFuZGxlciwgRHJhZ0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IERyYWdUcmFja2VyIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmUsIEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSwgTm9kZVJlY3RzIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXcsIFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlciwgUmVzaXplSGFuZGxlclR5cGUgfSBmcm9tICcuL1Jlc2l6ZUhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5LCBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbEJvdW5kcywgU2Nyb2xsQm91bmRzVHlwZSB9IGZyb20gJy4vU2Nyb2xsQm91bmRzJ1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbiB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNjcm9sbExpbWl0IH0gZnJvbSAnLi9TY3JvbGxMaW1pdCdcbmltcG9ydCB7IFNjcm9sbExvb3BlciwgU2Nyb2xsTG9vcGVyVHlwZSB9IGZyb20gJy4vU2Nyb2xsTG9vcGVyJ1xuaW1wb3J0IHsgU2Nyb2xsUHJvZ3Jlc3MsIFNjcm9sbFByb2dyZXNzVHlwZSB9IGZyb20gJy4vU2Nyb2xsUHJvZ3Jlc3MnXG5pbXBvcnQgeyBTY3JvbGxTbmFwcyB9IGZyb20gJy4vU2Nyb2xsU25hcHMnXG5pbXBvcnQgeyBTbGlkZVJlZ2lzdHJ5LCBTbGlkZVJlZ2lzdHJ5VHlwZSB9IGZyb20gJy4vU2xpZGVSZWdpc3RyeSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldCwgU2Nyb2xsVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgU2Nyb2xsVG8sIFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBTbGlkZUZvY3VzLCBTbGlkZUZvY3VzVHlwZSB9IGZyb20gJy4vU2xpZGVGb2N1cydcbmltcG9ydCB7IFNsaWRlTG9vcGVyLCBTbGlkZUxvb3BlclR5cGUgfSBmcm9tICcuL1NsaWRlTG9vcGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlciwgU2xpZGVzSGFuZGxlclR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXcsIFNsaWRlc0luVmlld1R5cGUgfSBmcm9tICcuL1NsaWRlc0luVmlldydcbmltcG9ydCB7IFNsaWRlU2l6ZXMgfSBmcm9tICcuL1NsaWRlU2l6ZXMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbCwgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuaW1wb3J0IHsgYXJyYXlLZXlzLCBhcnJheUxhc3QsIGFycmF5TGFzdEluZGV4LCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFELCBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBFbmdpbmVUeXBlID0ge1xuICBvd25lckRvY3VtZW50OiBEb2N1bWVudFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbiAgYXhpczogQXhpc1R5cGVcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZVxuICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kc1R5cGVcbiAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXJUeXBlXG4gIHNjcm9sbFByb2dyZXNzOiBTY3JvbGxQcm9ncmVzc1R5cGVcbiAgaW5kZXg6IENvdW50ZXJUeXBlXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlXG4gIGxpbWl0OiBMaW1pdFR5cGVcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvZmZzZXRMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHByZXZpb3VzTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZVxuICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXJUeXBlXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlXG4gIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlclR5cGVcbiAgc2xpZGVzSW5WaWV3OiBTbGlkZXNJblZpZXdUeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGVcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGVcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXJUeXBlXG4gIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXJUeXBlXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGVcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlXG4gIHNjcm9sbFNuYXBMaXN0OiBudW1iZXJbXVxuICBzY3JvbGxTbmFwczogbnVtYmVyW11cbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuICBzbGlkZUZvY3VzOiBTbGlkZUZvY3VzVHlwZVxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZVxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRW5naW5lKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IEVuZ2luZVR5cGUge1xuICAvLyBPcHRpb25zXG4gIGNvbnN0IHtcbiAgICBhbGlnbixcbiAgICBheGlzOiBzY3JvbGxBeGlzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGFydEluZGV4LFxuICAgIGxvb3AsXG4gICAgZHVyYXRpb24sXG4gICAgZHJhZ0ZyZWUsXG4gICAgZHJhZ1RocmVzaG9sZCxcbiAgICBpblZpZXdUaHJlc2hvbGQsXG4gICAgc2xpZGVzVG9TY3JvbGw6IGdyb3VwU2xpZGVzLFxuICAgIHNraXBTbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHdhdGNoUmVzaXplLFxuICAgIHdhdGNoU2xpZGVzLFxuICAgIHdhdGNoRHJhZ1xuICB9ID0gb3B0aW9uc1xuXG4gIC8vIE1lYXN1cmVtZW50c1xuICBjb25zdCBwaXhlbFRvbGVyYW5jZSA9IDJcbiAgY29uc3Qgbm9kZVJlY3RzID0gTm9kZVJlY3RzKClcbiAgY29uc3QgY29udGFpbmVyUmVjdCA9IG5vZGVSZWN0cy5tZWFzdXJlKGNvbnRhaW5lcilcbiAgY29uc3Qgc2xpZGVSZWN0cyA9IHNsaWRlcy5tYXAobm9kZVJlY3RzLm1lYXN1cmUpXG4gIGNvbnN0IGF4aXMgPSBBeGlzKHNjcm9sbEF4aXMsIGRpcmVjdGlvbilcbiAgY29uc3Qgdmlld1NpemUgPSBheGlzLm1lYXN1cmVTaXplKGNvbnRhaW5lclJlY3QpXG4gIGNvbnN0IHBlcmNlbnRPZlZpZXcgPSBQZXJjZW50T2ZWaWV3KHZpZXdTaXplKVxuICBjb25zdCBhbGlnbm1lbnQgPSBBbGlnbm1lbnQoYWxpZ24sIHZpZXdTaXplKVxuICBjb25zdCBjb250YWluU25hcHMgPSAhbG9vcCAmJiAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgcmVhZEVkZ2VHYXAgPSBsb29wIHx8ICEhY29udGFpblNjcm9sbFxuICBjb25zdCB7IHNsaWRlU2l6ZXMsIHNsaWRlU2l6ZXNXaXRoR2Fwcywgc3RhcnRHYXAsIGVuZEdhcCB9ID0gU2xpZGVTaXplcyhcbiAgICBheGlzLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzbGlkZXMsXG4gICAgcmVhZEVkZ2VHYXAsXG4gICAgb3duZXJXaW5kb3dcbiAgKVxuICBjb25zdCBzbGlkZXNUb1Njcm9sbCA9IFNsaWRlc1RvU2Nyb2xsKFxuICAgIGF4aXMsXG4gICAgdmlld1NpemUsXG4gICAgZ3JvdXBTbGlkZXMsXG4gICAgbG9vcCxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc3RhcnRHYXAsXG4gICAgZW5kR2FwLFxuICAgIHBpeGVsVG9sZXJhbmNlXG4gIClcbiAgY29uc3QgeyBzbmFwcywgc25hcHNBbGlnbmVkIH0gPSBTY3JvbGxTbmFwcyhcbiAgICBheGlzLFxuICAgIGFsaWdubWVudCxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzVG9TY3JvbGxcbiAgKVxuICBjb25zdCBjb250ZW50U2l6ZSA9IC1hcnJheUxhc3Qoc25hcHMpICsgYXJyYXlMYXN0KHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgeyBzbmFwc0NvbnRhaW5lZCwgc2Nyb2xsQ29udGFpbkxpbWl0IH0gPSBTY3JvbGxDb250YWluKFxuICAgIHZpZXdTaXplLFxuICAgIGNvbnRlbnRTaXplLFxuICAgIHNuYXBzQWxpZ25lZCxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHBpeGVsVG9sZXJhbmNlXG4gIClcbiAgY29uc3Qgc2Nyb2xsU25hcHMgPSBjb250YWluU25hcHMgPyBzbmFwc0NvbnRhaW5lZCA6IHNuYXBzQWxpZ25lZFxuICBjb25zdCB7IGxpbWl0IH0gPSBTY3JvbGxMaW1pdChjb250ZW50U2l6ZSwgc2Nyb2xsU25hcHMsIGxvb3ApXG5cbiAgLy8gSW5kZXhlc1xuICBjb25zdCBpbmRleCA9IENvdW50ZXIoYXJyYXlMYXN0SW5kZXgoc2Nyb2xsU25hcHMpLCBzdGFydEluZGV4LCBsb29wKVxuICBjb25zdCBpbmRleFByZXZpb3VzID0gaW5kZXguY2xvbmUoKVxuICBjb25zdCBzbGlkZUluZGV4ZXMgPSBhcnJheUtleXMoc2xpZGVzKVxuXG4gIC8vIEFuaW1hdGlvblxuICBjb25zdCB1cGRhdGU6IEFuaW1hdGlvbnNVcGRhdGVUeXBlID0gKFxuICAgIHsgZHJhZ0hhbmRsZXIsIHNjcm9sbEJvZHksIHNjcm9sbEJvdW5kcywgb3B0aW9uczogeyBsb29wIH0gfSxcbiAgICB0aW1lU3RlcFxuICApID0+IHtcbiAgICBpZiAoIWxvb3ApIHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSlcbiAgICBzY3JvbGxCb2R5LnNlZWsodGltZVN0ZXApXG4gIH1cblxuICBjb25zdCByZW5kZXI6IEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKFxuICAgIHtcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICB0cmFuc2xhdGUsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgc2Nyb2xsTG9vcGVyLFxuICAgICAgc2xpZGVMb29wZXIsXG4gICAgICBkcmFnSGFuZGxlcixcbiAgICAgIGFuaW1hdGlvbixcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIHNjcm9sbEJvdW5kcyxcbiAgICAgIG9wdGlvbnM6IHsgbG9vcCB9XG4gICAgfSxcbiAgICBsYWdPZmZzZXRcbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkU2V0dGxlID0gc2Nyb2xsQm9keS5zZXR0bGVkKClcbiAgICBjb25zdCB3aXRoaW5Cb3VuZHMgPSAhc2Nyb2xsQm91bmRzLnNob3VsZENvbnN0cmFpbigpXG4gICAgY29uc3QgaGFzU2V0dGxlZCA9IGxvb3AgPyBzaG91bGRTZXR0bGUgOiBzaG91bGRTZXR0bGUgJiYgd2l0aGluQm91bmRzXG5cbiAgICBpZiAoaGFzU2V0dGxlZCAmJiAhZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSkge1xuICAgICAgYW5pbWF0aW9uLnN0b3AoKVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NldHRsZScpXG4gICAgfVxuICAgIGlmICghaGFzU2V0dGxlZCkgZXZlbnRIYW5kbGVyLmVtaXQoJ3Njcm9sbCcpXG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRMb2NhdGlvbiA9XG4gICAgICBsb2NhdGlvbi5nZXQoKSAqIGxhZ09mZnNldCArIHByZXZpb3VzTG9jYXRpb24uZ2V0KCkgKiAoMSAtIGxhZ09mZnNldClcblxuICAgIG9mZnNldExvY2F0aW9uLnNldChpbnRlcnBvbGF0ZWRMb2NhdGlvbilcblxuICAgIGlmIChsb29wKSB7XG4gICAgICBzY3JvbGxMb29wZXIubG9vcChzY3JvbGxCb2R5LmRpcmVjdGlvbigpKVxuICAgICAgc2xpZGVMb29wZXIubG9vcCgpXG4gICAgfVxuXG4gICAgdHJhbnNsYXRlLnRvKG9mZnNldExvY2F0aW9uLmdldCgpKVxuICB9XG4gIGNvbnN0IGFuaW1hdGlvbiA9IEFuaW1hdGlvbnMoXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICAodGltZVN0ZXApID0+IHVwZGF0ZShlbmdpbmUsIHRpbWVTdGVwKSxcbiAgICAobGFnT2Zmc2V0OiBudW1iZXIpID0+IHJlbmRlcihlbmdpbmUsIGxhZ09mZnNldClcbiAgKVxuXG4gIC8vIFNoYXJlZFxuICBjb25zdCBmcmljdGlvbiA9IDAuNjhcbiAgY29uc3Qgc3RhcnRMb2NhdGlvbiA9IHNjcm9sbFNuYXBzW2luZGV4LmdldCgpXVxuICBjb25zdCBsb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHByZXZpb3VzTG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBvZmZzZXRMb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHRhcmdldCA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHNjcm9sbEJvZHkgPSBTY3JvbGxCb2R5KFxuICAgIGxvY2F0aW9uLFxuICAgIG9mZnNldExvY2F0aW9uLFxuICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgdGFyZ2V0LFxuICAgIGR1cmF0aW9uLFxuICAgIGZyaWN0aW9uXG4gIClcbiAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gU2Nyb2xsVGFyZ2V0KFxuICAgIGxvb3AsXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgY29udGVudFNpemUsXG4gICAgbGltaXQsXG4gICAgdGFyZ2V0XG4gIClcbiAgY29uc3Qgc2Nyb2xsVG8gPSBTY3JvbGxUbyhcbiAgICBhbmltYXRpb24sXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICB0YXJnZXQsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcbiAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBTY3JvbGxQcm9ncmVzcyhsaW1pdClcbiAgY29uc3QgZXZlbnRTdG9yZSA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBzbGlkZXNJblZpZXcgPSBTbGlkZXNJblZpZXcoXG4gICAgY29udGFpbmVyLFxuICAgIHNsaWRlcyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgaW5WaWV3VGhyZXNob2xkXG4gIClcbiAgY29uc3QgeyBzbGlkZVJlZ2lzdHJ5IH0gPSBTbGlkZVJlZ2lzdHJ5KFxuICAgIGNvbnRhaW5TbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdCxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICBzbGlkZUluZGV4ZXNcbiAgKVxuICBjb25zdCBzbGlkZUZvY3VzID0gU2xpZGVGb2N1cyhcbiAgICByb290LFxuICAgIHNsaWRlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNjcm9sbFRvLFxuICAgIHNjcm9sbEJvZHksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBldmVudEhhbmRsZXJcbiAgKVxuXG4gIC8vIEVuZ2luZVxuICBjb25zdCBlbmdpbmU6IEVuZ2luZVR5cGUgPSB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIGFuaW1hdGlvbixcbiAgICBheGlzLFxuICAgIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlcihcbiAgICAgIGF4aXMsXG4gICAgICByb290LFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgdGFyZ2V0LFxuICAgICAgRHJhZ1RyYWNrZXIoYXhpcywgb3duZXJXaW5kb3cpLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBhbmltYXRpb24sXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBzY3JvbGxUYXJnZXQsXG4gICAgICBpbmRleCxcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgICBkcmFnRnJlZSxcbiAgICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgICBza2lwU25hcHMsXG4gICAgICBmcmljdGlvbixcbiAgICAgIHdhdGNoRHJhZ1xuICAgICksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBwZXJjZW50T2ZWaWV3LFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgbGltaXQsXG4gICAgbG9jYXRpb24sXG4gICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICBvcHRpb25zLFxuICAgIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXIoXG4gICAgICBjb250YWluZXIsXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIHNsaWRlcyxcbiAgICAgIGF4aXMsXG4gICAgICB3YXRjaFJlc2l6ZSxcbiAgICAgIG5vZGVSZWN0c1xuICAgICksXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kcyhcbiAgICAgIGxpbWl0LFxuICAgICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgICB0YXJnZXQsXG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgcGVyY2VudE9mVmlld1xuICAgICksXG4gICAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXIoY29udGVudFNpemUsIGxpbWl0LCBvZmZzZXRMb2NhdGlvbiwgW1xuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgICB0YXJnZXRcbiAgICBdKSxcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdDogc2Nyb2xsU25hcHMubWFwKHNjcm9sbFByb2dyZXNzLmdldCksXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgc2Nyb2xsVGFyZ2V0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlcihcbiAgICAgIGF4aXMsXG4gICAgICB2aWV3U2l6ZSxcbiAgICAgIGNvbnRlbnRTaXplLFxuICAgICAgc2xpZGVTaXplcyxcbiAgICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICAgIHNuYXBzLFxuICAgICAgc2Nyb2xsU25hcHMsXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHNsaWRlc1xuICAgICksXG4gICAgc2xpZGVGb2N1cyxcbiAgICBzbGlkZXNIYW5kbGVyOiBTbGlkZXNIYW5kbGVyKGNvbnRhaW5lciwgZXZlbnRIYW5kbGVyLCB3YXRjaFNsaWRlcyksXG4gICAgc2xpZGVzSW5WaWV3LFxuICAgIHNsaWRlSW5kZXhlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNsaWRlc1RvU2Nyb2xsLFxuICAgIHRhcmdldCxcbiAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBjb250YWluZXIpXG4gIH1cblxuICByZXR1cm4gZW5naW5lXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcblxudHlwZSBDYWxsYmFja1R5cGUgPSAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLCBldnQ6IEVtYmxhRXZlbnRUeXBlKSA9PiB2b2lkXG50eXBlIExpc3RlbmVyc1R5cGUgPSBQYXJ0aWFsPHsgW2tleSBpbiBFbWJsYUV2ZW50VHlwZV06IENhbGxiYWNrVHlwZVtdIH0+XG5cbmV4cG9ydCB0eXBlIEVtYmxhRXZlbnRUeXBlID0gRW1ibGFFdmVudExpc3RUeXBlW2tleW9mIEVtYmxhRXZlbnRMaXN0VHlwZV1cblxuZXhwb3J0IGludGVyZmFjZSBFbWJsYUV2ZW50TGlzdFR5cGUge1xuICBpbml0OiAnaW5pdCdcbiAgcG9pbnRlckRvd246ICdwb2ludGVyRG93bidcbiAgcG9pbnRlclVwOiAncG9pbnRlclVwJ1xuICBzbGlkZXNDaGFuZ2VkOiAnc2xpZGVzQ2hhbmdlZCdcbiAgc2xpZGVzSW5WaWV3OiAnc2xpZGVzSW5WaWV3J1xuICBzY3JvbGw6ICdzY3JvbGwnXG4gIHNlbGVjdDogJ3NlbGVjdCdcbiAgc2V0dGxlOiAnc2V0dGxlJ1xuICBkZXN0cm95OiAnZGVzdHJveSdcbiAgcmVJbml0OiAncmVJbml0J1xuICByZXNpemU6ICdyZXNpemUnXG4gIHNsaWRlRm9jdXM6ICdzbGlkZUZvY3VzJ1xufVxuXG5leHBvcnQgdHlwZSBFdmVudEhhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGVtaXQ6IChldnQ6IEVtYmxhRXZlbnRUeXBlKSA9PiBFdmVudEhhbmRsZXJUeXBlXG4gIG9uOiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBvZmY6IChldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKSA9PiBFdmVudEhhbmRsZXJUeXBlXG4gIGNsZWFyOiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudEhhbmRsZXIoKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gIGxldCBsaXN0ZW5lcnM6IExpc3RlbmVyc1R5cGUgPSB7fVxuICBsZXQgYXBpOiBFbWJsYUNhcm91c2VsVHlwZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgYXBpID0gZW1ibGFBcGlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpc3RlbmVycyhldnQ6IEVtYmxhRXZlbnRUeXBlKTogQ2FsbGJhY2tUeXBlW10ge1xuICAgIHJldHVybiBsaXN0ZW5lcnNbZXZ0XSB8fCBbXVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChldnQ6IEVtYmxhRXZlbnRUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgZ2V0TGlzdGVuZXJzKGV2dCkuZm9yRWFjaCgoZSkgPT4gZShhcGksIGV2dCkpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBsaXN0ZW5lcnNbZXZ0XSA9IGdldExpc3RlbmVycyhldnQpLmNvbmNhdChbY2JdKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGxpc3RlbmVyc1tldnRdID0gZ2V0TGlzdGVuZXJzKGV2dCkuZmlsdGVyKChlKSA9PiBlICE9PSBjYilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgbGlzdGVuZXJzID0ge31cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEV2ZW50SGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBlbWl0LFxuICAgIG9mZixcbiAgICBvbixcbiAgICBjbGVhclxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnRPcHRpb25UeXBlIH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQgeyBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZSwgQXhpc09wdGlvblR5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUgfSBmcm9tICcuL1NsaWRlc1RvU2Nyb2xsJ1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUgfSBmcm9tICcuL1Njcm9sbENvbnRhaW4nXG5pbXBvcnQgeyBEcmFnSGFuZGxlck9wdGlvblR5cGUgfSBmcm9tICcuL0RyYWdIYW5kbGVyJ1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlck9wdGlvblR5cGUgfSBmcm9tICcuL1Jlc2l6ZUhhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZSB9IGZyb20gJy4vU2xpZGVzSGFuZGxlcidcbmltcG9ydCB7IFNsaWRlc0luVmlld09wdGlvbnNUeXBlIH0gZnJvbSAnLi9TbGlkZXNJblZpZXcnXG5cbmV4cG9ydCB0eXBlIExvb3NlT3B0aW9uc1R5cGUgPSB7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd25cbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlT3B0aW9uc1R5cGU8VHlwZSBleHRlbmRzIExvb3NlT3B0aW9uc1R5cGU+ID0gVHlwZSAmIHtcbiAgYWN0aXZlOiBib29sZWFuXG4gIGJyZWFrcG9pbnRzOiB7XG4gICAgW2tleTogc3RyaW5nXTogT21pdDxQYXJ0aWFsPENyZWF0ZU9wdGlvbnNUeXBlPFR5cGU+PiwgJ2JyZWFrcG9pbnRzJz5cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBPcHRpb25zVHlwZSA9IENyZWF0ZU9wdGlvbnNUeXBlPHtcbiAgYWxpZ246IEFsaWdubWVudE9wdGlvblR5cGVcbiAgYXhpczogQXhpc09wdGlvblR5cGVcbiAgY29udGFpbmVyOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IG51bGxcbiAgc2xpZGVzOiBzdHJpbmcgfCBIVE1MRWxlbWVudFtdIHwgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gfCBudWxsXG4gIGNvbnRhaW5TY3JvbGw6IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlXG4gIGRpcmVjdGlvbjogQXhpc0RpcmVjdGlvbk9wdGlvblR5cGVcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsT3B0aW9uVHlwZVxuICBkcmFnRnJlZTogYm9vbGVhblxuICBkcmFnVGhyZXNob2xkOiBudW1iZXJcbiAgaW5WaWV3VGhyZXNob2xkOiBTbGlkZXNJblZpZXdPcHRpb25zVHlwZVxuICBsb29wOiBib29sZWFuXG4gIHNraXBTbmFwczogYm9vbGVhblxuICBkdXJhdGlvbjogbnVtYmVyXG4gIHN0YXJ0SW5kZXg6IG51bWJlclxuICB3YXRjaERyYWc6IERyYWdIYW5kbGVyT3B0aW9uVHlwZVxuICB3YXRjaFJlc2l6ZTogUmVzaXplSGFuZGxlck9wdGlvblR5cGVcbiAgd2F0Y2hTbGlkZXM6IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlXG59PlxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnNUeXBlID0ge1xuICBhbGlnbjogJ2NlbnRlcicsXG4gIGF4aXM6ICd4JyxcbiAgY29udGFpbmVyOiBudWxsLFxuICBzbGlkZXM6IG51bGwsXG4gIGNvbnRhaW5TY3JvbGw6ICd0cmltU25hcHMnLFxuICBkaXJlY3Rpb246ICdsdHInLFxuICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgaW5WaWV3VGhyZXNob2xkOiAwLFxuICBicmVha3BvaW50czoge30sXG4gIGRyYWdGcmVlOiBmYWxzZSxcbiAgZHJhZ1RocmVzaG9sZDogMTAsXG4gIGxvb3A6IGZhbHNlLFxuICBza2lwU25hcHM6IGZhbHNlLFxuICBkdXJhdGlvbjogMjUsXG4gIHN0YXJ0SW5kZXg6IDAsXG4gIGFjdGl2ZTogdHJ1ZSxcbiAgd2F0Y2hEcmFnOiB0cnVlLFxuICB3YXRjaFJlc2l6ZTogdHJ1ZSxcbiAgd2F0Y2hTbGlkZXM6IHRydWVcbn1cblxuZXhwb3J0IHR5cGUgRW1ibGFPcHRpb25zVHlwZSA9IFBhcnRpYWw8T3B0aW9uc1R5cGU+XG4iLCJpbXBvcnQgeyBMb29zZU9wdGlvbnNUeXBlLCBDcmVhdGVPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IG9iamVjdEtleXMsIG9iamVjdHNNZXJnZURlZXAsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIE9wdGlvbnNUeXBlID0gUGFydGlhbDxDcmVhdGVPcHRpb25zVHlwZTxMb29zZU9wdGlvbnNUeXBlPj5cblxuZXhwb3J0IHR5cGUgT3B0aW9uc0hhbmRsZXJUeXBlID0ge1xuICBtZXJnZU9wdGlvbnM6IDxUeXBlQSBleHRlbmRzIE9wdGlvbnNUeXBlLCBUeXBlQiBleHRlbmRzIE9wdGlvbnNUeXBlPihcbiAgICBvcHRpb25zQTogVHlwZUEsXG4gICAgb3B0aW9uc0I/OiBUeXBlQlxuICApID0+IFR5cGVBXG4gIG9wdGlvbnNBdE1lZGlhOiA8VHlwZSBleHRlbmRzIE9wdGlvbnNUeXBlPihvcHRpb25zOiBUeXBlKSA9PiBUeXBlXG4gIG9wdGlvbnNNZWRpYVF1ZXJpZXM6IChvcHRpb25zTGlzdDogT3B0aW9uc1R5cGVbXSkgPT4gTWVkaWFRdWVyeUxpc3RbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gT3B0aW9uc0hhbmRsZXIob3duZXJXaW5kb3c6IFdpbmRvd1R5cGUpOiBPcHRpb25zSGFuZGxlclR5cGUge1xuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnM8VHlwZUEgZXh0ZW5kcyBPcHRpb25zVHlwZSwgVHlwZUIgZXh0ZW5kcyBPcHRpb25zVHlwZT4oXG4gICAgb3B0aW9uc0E6IFR5cGVBLFxuICAgIG9wdGlvbnNCPzogVHlwZUJcbiAgKTogVHlwZUEge1xuICAgIHJldHVybiA8VHlwZUE+b2JqZWN0c01lcmdlRGVlcChvcHRpb25zQSwgb3B0aW9uc0IgfHwge30pXG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25zQXRNZWRpYTxUeXBlIGV4dGVuZHMgT3B0aW9uc1R5cGU+KG9wdGlvbnM6IFR5cGUpOiBUeXBlIHtcbiAgICBjb25zdCBvcHRpb25zQXRNZWRpYSA9IG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge31cbiAgICBjb25zdCBtYXRjaGVkTWVkaWFPcHRpb25zID0gb2JqZWN0S2V5cyhvcHRpb25zQXRNZWRpYSlcbiAgICAgIC5maWx0ZXIoKG1lZGlhKSA9PiBvd25lcldpbmRvdy5tYXRjaE1lZGlhKG1lZGlhKS5tYXRjaGVzKVxuICAgICAgLm1hcCgobWVkaWEpID0+IG9wdGlvbnNBdE1lZGlhW21lZGlhXSlcbiAgICAgIC5yZWR1Y2UoKGEsIG1lZGlhT3B0aW9uKSA9PiBtZXJnZU9wdGlvbnMoYSwgbWVkaWFPcHRpb24pLCB7fSlcblxuICAgIHJldHVybiBtZXJnZU9wdGlvbnMob3B0aW9ucywgbWF0Y2hlZE1lZGlhT3B0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wdGlvbnNNZWRpYVF1ZXJpZXMob3B0aW9uc0xpc3Q6IE9wdGlvbnNUeXBlW10pOiBNZWRpYVF1ZXJ5TGlzdFtdIHtcbiAgICByZXR1cm4gb3B0aW9uc0xpc3RcbiAgICAgIC5tYXAoKG9wdGlvbnMpID0+IG9iamVjdEtleXMob3B0aW9ucy5icmVha3BvaW50cyB8fCB7fSkpXG4gICAgICAucmVkdWNlKChhY2MsIG1lZGlhUXVlcmllcykgPT4gYWNjLmNvbmNhdChtZWRpYVF1ZXJpZXMpLCBbXSlcbiAgICAgIC5tYXAob3duZXJXaW5kb3cubWF0Y2hNZWRpYSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IE9wdGlvbnNIYW5kbGVyVHlwZSA9IHtcbiAgICBtZXJnZU9wdGlvbnMsXG4gICAgb3B0aW9uc0F0TWVkaWEsXG4gICAgb3B0aW9uc01lZGlhUXVlcmllc1xuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJy4vT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBFbWJsYVBsdWdpbnNUeXBlLCBFbWJsYVBsdWdpblR5cGUgfSBmcm9tICcuL1BsdWdpbnMnXG5cbmV4cG9ydCB0eXBlIFBsdWdpbnNIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKFxuICAgIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBwbHVnaW5zOiBFbWJsYVBsdWdpblR5cGVbXVxuICApID0+IEVtYmxhUGx1Z2luc1R5cGVcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGx1Z2luc0hhbmRsZXIoXG4gIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGVcbik6IFBsdWdpbnNIYW5kbGVyVHlwZSB7XG4gIGxldCBhY3RpdmVQbHVnaW5zOiBFbWJsYVBsdWdpblR5cGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gaW5pdChcbiAgICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgcGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW11cbiAgKTogRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgYWN0aXZlUGx1Z2lucyA9IHBsdWdpbnMuZmlsdGVyKFxuICAgICAgKHsgb3B0aW9ucyB9KSA9PiBvcHRpb25zSGFuZGxlci5vcHRpb25zQXRNZWRpYShvcHRpb25zKS5hY3RpdmUgIT09IGZhbHNlXG4gICAgKVxuICAgIGFjdGl2ZVBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiBwbHVnaW4uaW5pdChlbWJsYUFwaSwgb3B0aW9uc0hhbmRsZXIpKVxuXG4gICAgcmV0dXJuIHBsdWdpbnMucmVkdWNlKFxuICAgICAgKG1hcCwgcGx1Z2luKSA9PiBPYmplY3QuYXNzaWduKG1hcCwgeyBbcGx1Z2luLm5hbWVdOiBwbHVnaW4gfSksXG4gICAgICB7fVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgYWN0aXZlUGx1Z2lucyA9IGFjdGl2ZVBsdWdpbnMuZmlsdGVyKChwbHVnaW4pID0+IHBsdWdpbi5kZXN0cm95KCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBQbHVnaW5zSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVuZ2luZSwgRW5naW5lVHlwZSB9IGZyb20gJy4vRW5naW5lJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IEV2ZW50SGFuZGxlciwgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgZGVmYXVsdE9wdGlvbnMsIEVtYmxhT3B0aW9uc1R5cGUsIE9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgT3B0aW9uc0hhbmRsZXIgfSBmcm9tICcuL09wdGlvbnNIYW5kbGVyJ1xuaW1wb3J0IHsgUGx1Z2luc0hhbmRsZXIgfSBmcm9tICcuL1BsdWdpbnNIYW5kbGVyJ1xuaW1wb3J0IHsgRW1ibGFQbHVnaW5zVHlwZSwgRW1ibGFQbHVnaW5UeXBlIH0gZnJvbSAnLi9QbHVnaW5zJ1xuaW1wb3J0IHsgaXNTdHJpbmcsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBFbWJsYUNhcm91c2VsVHlwZSA9IHtcbiAgY2FuU2Nyb2xsTmV4dDogKCkgPT4gYm9vbGVhblxuICBjYW5TY3JvbGxQcmV2OiAoKSA9PiBib29sZWFuXG4gIGNvbnRhaW5lck5vZGU6ICgpID0+IEhUTUxFbGVtZW50XG4gIGludGVybmFsRW5naW5lOiAoKSA9PiBFbmdpbmVUeXBlXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgb2ZmOiBFdmVudEhhbmRsZXJUeXBlWydvZmYnXVxuICBvbjogRXZlbnRIYW5kbGVyVHlwZVsnb24nXVxuICBlbWl0OiBFdmVudEhhbmRsZXJUeXBlWydlbWl0J11cbiAgcGx1Z2luczogKCkgPT4gRW1ibGFQbHVnaW5zVHlwZVxuICBwcmV2aW91c1Njcm9sbFNuYXA6ICgpID0+IG51bWJlclxuICByZUluaXQ6IChvcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSwgcGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdKSA9PiB2b2lkXG4gIHJvb3ROb2RlOiAoKSA9PiBIVE1MRWxlbWVudFxuICBzY3JvbGxOZXh0OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgc2Nyb2xsUHJldjogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNjcm9sbFByb2dyZXNzOiAoKSA9PiBudW1iZXJcbiAgc2Nyb2xsU25hcExpc3Q6ICgpID0+IG51bWJlcltdXG4gIHNjcm9sbFRvOiAoaW5kZXg6IG51bWJlciwganVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgc2VsZWN0ZWRTY3JvbGxTbmFwOiAoKSA9PiBudW1iZXJcbiAgc2xpZGVOb2RlczogKCkgPT4gSFRNTEVsZW1lbnRbXVxuICBzbGlkZXNJblZpZXc6ICgpID0+IG51bWJlcltdXG4gIHNsaWRlc05vdEluVmlldzogKCkgPT4gbnVtYmVyW11cbn1cblxuZnVuY3Rpb24gRW1ibGFDYXJvdXNlbChcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIHVzZXJPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgdXNlclBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuKTogRW1ibGFDYXJvdXNlbFR5cGUge1xuICBjb25zdCBvd25lckRvY3VtZW50ID0gcm9vdC5vd25lckRvY3VtZW50XG4gIGNvbnN0IG93bmVyV2luZG93ID0gPFdpbmRvd1R5cGU+b3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld1xuICBjb25zdCBvcHRpb25zSGFuZGxlciA9IE9wdGlvbnNIYW5kbGVyKG93bmVyV2luZG93KVxuICBjb25zdCBwbHVnaW5zSGFuZGxlciA9IFBsdWdpbnNIYW5kbGVyKG9wdGlvbnNIYW5kbGVyKVxuICBjb25zdCBtZWRpYUhhbmRsZXJzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGV2ZW50SGFuZGxlciA9IEV2ZW50SGFuZGxlcigpXG4gIGNvbnN0IHsgbWVyZ2VPcHRpb25zLCBvcHRpb25zQXRNZWRpYSwgb3B0aW9uc01lZGlhUXVlcmllcyB9ID0gb3B0aW9uc0hhbmRsZXJcbiAgY29uc3QgeyBvbiwgb2ZmLCBlbWl0IH0gPSBldmVudEhhbmRsZXJcbiAgY29uc3QgcmVJbml0ID0gcmVBY3RpdmF0ZVxuXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuICBsZXQgZW5naW5lOiBFbmdpbmVUeXBlXG4gIGxldCBvcHRpb25zQmFzZSA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgRW1ibGFDYXJvdXNlbC5nbG9iYWxPcHRpb25zKVxuICBsZXQgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zQmFzZSlcbiAgbGV0IHBsdWdpbkxpc3Q6IEVtYmxhUGx1Z2luVHlwZVtdID0gW11cbiAgbGV0IHBsdWdpbkFwaXM6IEVtYmxhUGx1Z2luc1R5cGVcblxuICBsZXQgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuICBsZXQgc2xpZGVzOiBIVE1MRWxlbWVudFtdXG5cbiAgZnVuY3Rpb24gc3RvcmVFbGVtZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lcjogdXNlckNvbnRhaW5lciwgc2xpZGVzOiB1c2VyU2xpZGVzIH0gPSBvcHRpb25zXG5cbiAgICBjb25zdCBjdXN0b21Db250YWluZXIgPSBpc1N0cmluZyh1c2VyQ29udGFpbmVyKVxuICAgICAgPyByb290LnF1ZXJ5U2VsZWN0b3IodXNlckNvbnRhaW5lcilcbiAgICAgIDogdXNlckNvbnRhaW5lclxuICAgIGNvbnRhaW5lciA9IDxIVE1MRWxlbWVudD4oY3VzdG9tQ29udGFpbmVyIHx8IHJvb3QuY2hpbGRyZW5bMF0pXG5cbiAgICBjb25zdCBjdXN0b21TbGlkZXMgPSBpc1N0cmluZyh1c2VyU2xpZGVzKVxuICAgICAgPyBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCh1c2VyU2xpZGVzKVxuICAgICAgOiB1c2VyU2xpZGVzXG4gICAgc2xpZGVzID0gPEhUTUxFbGVtZW50W10+W10uc2xpY2UuY2FsbChjdXN0b21TbGlkZXMgfHwgY29udGFpbmVyLmNoaWxkcmVuKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW5naW5lKG9wdGlvbnM6IE9wdGlvbnNUeXBlKTogRW5naW5lVHlwZSB7XG4gICAgY29uc3QgZW5naW5lID0gRW5naW5lKFxuICAgICAgcm9vdCxcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIHNsaWRlcyxcbiAgICAgIG93bmVyRG9jdW1lbnQsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBldmVudEhhbmRsZXJcbiAgICApXG5cbiAgICBpZiAob3B0aW9ucy5sb29wICYmICFlbmdpbmUuc2xpZGVMb29wZXIuY2FuTG9vcCgpKSB7XG4gICAgICBjb25zdCBvcHRpb25zV2l0aG91dExvb3AgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IGxvb3A6IGZhbHNlIH0pXG4gICAgICByZXR1cm4gY3JlYXRlRW5naW5lKG9wdGlvbnNXaXRob3V0TG9vcClcbiAgICB9XG4gICAgcmV0dXJuIGVuZ2luZVxuICB9XG5cbiAgZnVuY3Rpb24gYWN0aXZhdGUoXG4gICAgd2l0aE9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICAgIHdpdGhQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbiAgKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG5cbiAgICBvcHRpb25zQmFzZSA9IG1lcmdlT3B0aW9ucyhvcHRpb25zQmFzZSwgd2l0aE9wdGlvbnMpXG4gICAgb3B0aW9ucyA9IG9wdGlvbnNBdE1lZGlhKG9wdGlvbnNCYXNlKVxuICAgIHBsdWdpbkxpc3QgPSB3aXRoUGx1Z2lucyB8fCBwbHVnaW5MaXN0XG5cbiAgICBzdG9yZUVsZW1lbnRzKClcblxuICAgIGVuZ2luZSA9IGNyZWF0ZUVuZ2luZShvcHRpb25zKVxuXG4gICAgb3B0aW9uc01lZGlhUXVlcmllcyhbXG4gICAgICBvcHRpb25zQmFzZSxcbiAgICAgIC4uLnBsdWdpbkxpc3QubWFwKCh7IG9wdGlvbnMgfSkgPT4gb3B0aW9ucylcbiAgICBdKS5mb3JFYWNoKChxdWVyeSkgPT4gbWVkaWFIYW5kbGVycy5hZGQocXVlcnksICdjaGFuZ2UnLCByZUFjdGl2YXRlKSlcblxuICAgIGlmICghb3B0aW9ucy5hY3RpdmUpIHJldHVyblxuXG4gICAgZW5naW5lLnRyYW5zbGF0ZS50byhlbmdpbmUubG9jYXRpb24uZ2V0KCkpXG4gICAgZW5naW5lLmFuaW1hdGlvbi5pbml0KClcbiAgICBlbmdpbmUuc2xpZGVzSW5WaWV3LmluaXQoKVxuICAgIGVuZ2luZS5zbGlkZUZvY3VzLmluaXQoKVxuICAgIGVuZ2luZS5ldmVudEhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmluaXQoc2VsZilcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBpZiAoZW5naW5lLm9wdGlvbnMubG9vcCkgZW5naW5lLnNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIGlmIChjb250YWluZXIub2Zmc2V0UGFyZW50ICYmIHNsaWRlcy5sZW5ndGgpIGVuZ2luZS5kcmFnSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBwbHVnaW5BcGlzID0gcGx1Z2luc0hhbmRsZXIuaW5pdChzZWxmLCBwbHVnaW5MaXN0KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVBY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBhY3RpdmF0ZShtZXJnZU9wdGlvbnMoeyBzdGFydEluZGV4IH0sIHdpdGhPcHRpb25zKSwgd2l0aFBsdWdpbnMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3JlSW5pdCcpXG4gIH1cblxuICBmdW5jdGlvbiBkZUFjdGl2YXRlKCk6IHZvaWQge1xuICAgIGVuZ2luZS5kcmFnSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuZXZlbnRTdG9yZS5jbGVhcigpXG4gICAgZW5naW5lLnRyYW5zbGF0ZS5jbGVhcigpXG4gICAgZW5naW5lLnNsaWRlTG9vcGVyLmNsZWFyKClcbiAgICBlbmdpbmUucmVzaXplSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSW5WaWV3LmRlc3Ryb3koKVxuICAgIGVuZ2luZS5hbmltYXRpb24uZGVzdHJveSgpXG4gICAgcGx1Z2luc0hhbmRsZXIuZGVzdHJveSgpXG4gICAgbWVkaWFIYW5kbGVycy5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBldmVudEhhbmRsZXIuZW1pdCgnZGVzdHJveScpXG4gICAgZXZlbnRIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuLCBkaXJlY3Rpb24/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlIHx8IGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZW5naW5lLnNjcm9sbEJvZHlcbiAgICAgIC51c2VCYXNlRnJpY3Rpb24oKVxuICAgICAgLnVzZUR1cmF0aW9uKGp1bXAgPT09IHRydWUgPyAwIDogb3B0aW9ucy5kdXJhdGlvbilcbiAgICBlbmdpbmUuc2Nyb2xsVG8uaW5kZXgoaW5kZXgsIGRpcmVjdGlvbiB8fCAwKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsTmV4dChqdW1wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IG5leHQgPSBlbmdpbmUuaW5kZXguYWRkKDEpLmdldCgpXG4gICAgc2Nyb2xsVG8obmV4dCwganVtcCwgLTEpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcmV2KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgc2Nyb2xsVG8ocHJldiwganVtcCwgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbE5leHQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICByZXR1cm4gbmV4dCAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbFByZXYoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgcmV0dXJuIHByZXYgIT09IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxTbmFwTGlzdCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zY3JvbGxTbmFwTGlzdFxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFByb2dyZXNzLmdldChlbmdpbmUubG9jYXRpb24uZ2V0KCkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RlZFNjcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4LmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1Njcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4UHJldmlvdXMuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc05vdEluVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gcGx1Z2lucygpOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICByZXR1cm4gcGx1Z2luQXBpc1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJuYWxFbmdpbmUoKTogRW5naW5lVHlwZSB7XG4gICAgcmV0dXJuIGVuZ2luZVxuICB9XG5cbiAgZnVuY3Rpb24gcm9vdE5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiByb290XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZU5vZGVzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBzbGlkZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICAgIGNhblNjcm9sbE5leHQsXG4gICAgY2FuU2Nyb2xsUHJldixcbiAgICBjb250YWluZXJOb2RlLFxuICAgIGludGVybmFsRW5naW5lLFxuICAgIGRlc3Ryb3ksXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGVtaXQsXG4gICAgcGx1Z2lucyxcbiAgICBwcmV2aW91c1Njcm9sbFNuYXAsXG4gICAgcmVJbml0LFxuICAgIHJvb3ROb2RlLFxuICAgIHNjcm9sbE5leHQsXG4gICAgc2Nyb2xsUHJldixcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdCxcbiAgICBzY3JvbGxUbyxcbiAgICBzZWxlY3RlZFNjcm9sbFNuYXAsXG4gICAgc2xpZGVOb2RlcyxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVzTm90SW5WaWV3XG4gIH1cblxuICBhY3RpdmF0ZSh1c2VyT3B0aW9ucywgdXNlclBsdWdpbnMpXG4gIHNldFRpbWVvdXQoKCkgPT4gZXZlbnRIYW5kbGVyLmVtaXQoJ2luaXQnKSwgMClcbiAgcmV0dXJuIHNlbGZcbn1cblxuZGVjbGFyZSBuYW1lc3BhY2UgRW1ibGFDYXJvdXNlbCB7XG4gIGxldCBnbG9iYWxPcHRpb25zOiBFbWJsYU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBFbWJsYUNhcm91c2VsXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWJsYUNhcm91c2VsIGZyb20gJ2VtYmxhLWNhcm91c2VsJztcbmltcG9ydCB7IFdoZWVsR2VzdHVyZXNQbHVnaW4gfSBmcm9tICdlbWJsYS1jYXJvdXNlbC13aGVlbC1nZXN0dXJlcyc7XG5pbXBvcnQgRmFkZSBmcm9tICdlbWJsYS1jYXJvdXNlbC1mYWRlJztcbmltcG9ydCB7XG4gICAgYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyxcbiAgICBhZGRUb2dnbGVUaHVtYkJ1dHRvbnNBY3RpdmUsXG4gICAgYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVyc1xufSBmcm9tICcuL2J1dHRvbnMuZXM2JztcblxuY2xhc3MgWVREeW5hbWljc0dhbGxlcnkge1xuICAgIGluaXQoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IE9QVElPTlMgPSB7XG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IE9QVElPTlNfVEhVTUJTID0ge1xuICAgICAgICAgICAgYWxpZ246ICdzdGFydCcsXG4gICAgICAgICAgICBheGlzOiAneScsXG4gICAgICAgICAgICBkcmFnRnJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdmlld3BvcnROb2RlTWFpbkNhcm91c2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fdmlld3BvcnQnKSxcbiAgICAgICAgICAgIHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fdmlld3BvcnQnKSxcbiAgICAgICAgICAgIHByZXZUaHVtYkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fcHJldicpLFxuICAgICAgICAgICAgbmV4dFRodW1iQnRuTm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19uZXh0JyksXG4gICAgICAgICAgICBlbWJsYU1haW4gPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCwgT1BUSU9OUywgW0ZhZGUoKV0pLFxuICAgICAgICAgICAgZW1ibGFUaHVtYiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCwgT1BUSU9OU19USFVNQlMsIFtXaGVlbEdlc3R1cmVzUGx1Z2luKCldKVxuXG4gICAgICAgIGxldCByZW1vdmVUaHVtYkJ0bnNDbGlja0hhbmRsZXJzID0gYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyhlbWJsYU1haW4sIGVtYmxhVGh1bWIpLFxuICAgICAgICAgICAgcmVtb3ZlVG9nZ2xlVGh1bWJCdG5zQWN0aXZlID0gYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlKGVtYmxhTWFpbiwgZW1ibGFUaHVtYiksXG4gICAgICAgICAgICByZW1vdmVUaHVtYlByZXZOZXh0QnRuc0NsaWNrSGFuZGxlcnMgPSBhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzKGVtYmxhVGh1bWIsIHByZXZUaHVtYkJ0bk5vZGUsIG5leHRUaHVtYkJ0bk5vZGUpO1xuXG4gICAgICAgIGVtYmxhTWFpblxuICAgICAgICAgICAgLm9uKCdkZXN0cm95JywgcmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycylcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRvZ2dsZVRodW1iQnRuc0FjdGl2ZSlcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iUHJldk5leHRCdG5zQ2xpY2tIYW5kbGVycyk7XG5cbiAgICAgICAgZW1ibGFUaHVtYlxuICAgICAgICAgICAgLm9uKCdkZXN0cm95JywgcmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycylcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRvZ2dsZVRodW1iQnRuc0FjdGl2ZSlcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iUHJldk5leHRCdG5zQ2xpY2tIYW5kbGVycyk7XG4gICAgfVxufVxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHJtc2xpZGVzaG93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybXNsaWRlc2hvdycpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBybXNsaWRlc2hvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgKG5ldyBZVER5bmFtaWNzR2FsbGVyeSkuaW5pdChybXNsaWRlc2hvd3NbaV0pO1xuICAgIH1cbn0pOyJdLCJuYW1lcyI6WyJkZWZhdWx0T3B0aW9ucyIsImFjdGl2ZSIsImJyZWFrcG9pbnRzIiwid2hlZWxEcmFnZ2luZ0NsYXNzIiwiZm9yY2VXaGVlbEF4aXMiLCJ1bmRlZmluZWQiLCJ0YXJnZXQiLCJXaGVlbEdlc3R1cmVzUGx1Z2luIiwiZ2xvYmFsT3B0aW9ucyIsIl9fREVWX18iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJ1c2VyT3B0aW9ucyIsIm9wdGlvbnMiLCJjbGVhbnVwIiwiaW5pdCIsImVtYmxhIiwib3B0aW9uc0hhbmRsZXIiLCJtZXJnZU9wdGlvbnMiLCJvcHRpb25zQXRNZWRpYSIsIm9wdGlvbnNCYXNlIiwiYWxsT3B0aW9ucyIsImVuZ2luZSIsImludGVybmFsRW5naW5lIiwidGFyZ2V0Tm9kZSIsIl9vcHRpb25zJHRhcmdldCIsImNvbnRhaW5lck5vZGUiLCJwYXJlbnROb2RlIiwid2hlZWxBeGlzIiwiX29wdGlvbnMkZm9yY2VXaGVlbEF4IiwiYXhpcyIsIndoZWVsR2VzdHVyZXMiLCJXaGVlbEdlc3R1cmVzIiwicHJldmVudFdoZWVsQWN0aW9uIiwicmV2ZXJzZVNpZ24iLCJ1bm9ic2VydmVUYXJnZXROb2RlIiwib2JzZXJ2ZSIsIm9mZldoZWVsIiwib24iLCJoYW5kbGVXaGVlbCIsImlzU3RhcnRlZCIsInN0YXJ0RXZlbnQiLCJ3aGVlbEdlc3R1cmVTdGFydGVkIiwic3RhdGUiLCJNb3VzZUV2ZW50IiwiZXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZSIsImNvbnNvbGUiLCJ3YXJuIiwiYWRkTmF0aXZlTW91c2VFdmVudExpc3RlbmVycyIsImNsYXNzTGlzdCIsImFkZCIsIndoZWVsR2VzdHVyZUVuZGVkIiwiY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50IiwicmVtb3ZlTmF0aXZlTW91c2VFdmVudExpc3RlbmVycyIsInJlbW92ZSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaXNUcnVzdGVkIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwidHlwZSIsIm1vdmVYIiwibW92ZVkiLCJfc3RhdGUkYXhpc01vdmVtZW50IiwiYXhpc01vdmVtZW50IiwiX3N0YXRlJGF4aXNNb3ZlbWVudDIiLCJza2lwU25hcHMiLCJkcmFnRnJlZSIsIm1heFgiLCJjb250YWluZXJSZWN0Iiwid2lkdGgiLCJtYXhZIiwiaGVpZ2h0IiwiTWF0aCIsIm1heCIsIm1pbiIsImNsaWVudFgiLCJjbGllbnRZIiwic2NyZWVuWCIsInNjcmVlblkiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJidXR0b24iLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNvbXBvc2VkIiwiYXhpc0RlbHRhIiwiZGVsdGFYIiwiX3N0YXRlJGF4aXNEZWx0YSIsImRlbHRhWSIsInByaW1hcnlBeGlzRGVsdGEiLCJjcm9zc0F4aXNEZWx0YSIsImlzUmVsZWFzZSIsImlzTW9tZW50dW0iLCJwcmV2aW91cyIsImlzRW5kaW5nT3JSZWxlYXNlIiwiaXNFbmRpbmciLCJwcmltYXJ5QXhpc0RlbHRhSXNEb21pbmFudCIsImFicyIsInNlbGYiLCJuYW1lIiwiZGVzdHJveSIsIkRFQ0FZIiwicHJvamVjdGlvbiIsInZlbG9jaXR5UHhNcyIsImRlY2F5IiwibGFzdE9mIiwiYXJyYXkiLCJsZW5ndGgiLCJhdmVyYWdlIiwibnVtYmVycyIsInJlZHVjZSIsImEiLCJiIiwiY2xhbXAiLCJ2YWx1ZSIsImFkZFZlY3RvcnMiLCJ2MSIsInYyIiwiRXJyb3IiLCJtYXAiLCJ2YWwiLCJpIiwiYWJzTWF4IiwiYXBwbHkiLCJkZWVwRnJlZXplIiwibyIsIk9iamVjdCIsImZyZWV6ZSIsInZhbHVlcyIsImZvckVhY2giLCJpc0Zyb3plbiIsIkV2ZW50QnVzIiwibGlzdGVuZXJzIiwibGlzdGVuZXIiLCJjb25jYXQiLCJvZmYiLCJmaWx0ZXIiLCJsIiwiZGlzcGF0Y2giLCJkYXRhIiwiV2hlZWxUYXJnZXRPYnNlcnZlciIsImV2ZW50TGlzdGVuZXIiLCJ0YXJnZXRzIiwicGFzc2l2ZSIsInB1c2giLCJ1bm9ic2VydmUiLCJ0IiwiZGlzY29ubmVjdCIsIkxJTkVfSEVJR0hUIiwiUEFHRV9IRUlHSFQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsIkRFTFRBX01PREVfVU5JVCIsIm5vcm1hbGl6ZVdoZWVsIiwiZGVsdGFNb2RlIiwiZGVsdGFaIiwidGltZVN0YW1wIiwicmV2ZXJzZUFsbCIsInJldmVyc2VBeGlzRGVsdGFTaWduIiwid2hlZWwiLCJtdWx0aXBsaWVycyIsInNob3VsZFJldmVyc2UiLCJfZXh0ZW5kcyIsImRlbHRhIiwiREVMVEFfTUFYX0FCUyIsImNsYW1wQXhpc0RlbHRhIiwiQUNDX0ZBQ1RPUl9NSU4iLCJBQ0NfRkFDVE9SX01BWCIsIldIRUVMRVZFTlRTX1RPX01FUkdFIiwiV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSIsImNvbmZpZ0RlZmF1bHRzIiwiV0lMTF9FTkRfVElNRU9VVF9ERUZBVUxUIiwiY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlIiwiaXNTdGFydFB1Ymxpc2hlZCIsInN0YXJ0VGltZSIsImxhc3RBYnNEZWx0YSIsIkluZmluaXR5IiwiYXhpc1ZlbG9jaXR5IiwiYWNjZWxlcmF0aW9uRmFjdG9ycyIsInNjcm9sbFBvaW50cyIsInNjcm9sbFBvaW50c1RvTWVyZ2UiLCJ3aWxsRW5kVGltZW91dCIsIm9wdGlvbnNQYXJhbSIsIl9FdmVudEJ1cyIsImNvbmZpZyIsImN1cnJlbnRFdmVudCIsIm5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50IiwicHJldldoZWVsRXZlbnRTdGF0ZSIsImZlZWRXaGVlbCIsIndoZWVsRXZlbnRzIiwiQXJyYXkiLCJpc0FycmF5Iiwid2hlZWxFdmVudCIsInByb2Nlc3NXaGVlbEV2ZW50RGF0YSIsInVwZGF0ZU9wdGlvbnMiLCJuZXdPcHRpb25zIiwic29tZSIsIm9wdGlvbiIsImVycm9yIiwicHVibGlzaFdoZWVsIiwiYWRkaXRpb25hbERhdGEiLCJ3aGVlbEV2ZW50U3RhdGUiLCJpc1N0YXJ0IiwiaXNNb21lbnR1bUNhbmNlbCIsImF4aXNNb3ZlbWVudFByb2plY3Rpb24iLCJ2ZWxvY2l0eSIsInNob3VsZFByZXZlbnREZWZhdWx0IiwiZGVsdGFNYXhBYnMiLCJfY29uZmlnIiwiX2NsYW1wQXhpc0RlbHRhIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsImVuZCIsImlzIiwibWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkiLCJ3aWxsRW5kIiwidW5zaGlmdCIsImF4aXNEZWx0YVN1bSIsInVwZGF0ZVZlbG9jaXR5IiwiZGV0ZWN0TW9tZW50dW0iLCJ1cGRhdGVTdGFydFZlbG9jaXR5IiwiZCIsImxhdGVzdFNjcm9sbFBvaW50IiwiX3N0YXRlJHNjcm9sbFBvaW50cyIsInByZXZTY3JvbGxQb2ludCIsImRlbHRhVGltZSIsImFjY2VsZXJhdGlvbkZhY3RvciIsInYiLCJ1cGRhdGVXaWxsRW5kVGltZW91dCIsIm5ld1RpbWVvdXQiLCJjZWlsIiwicm91bmQiLCJhY2NlbGVyYXRpb25GYWN0b3JJbk1vbWVudHVtUmFuZ2UiLCJhY2NGYWN0b3IiLCJyZWNvZ25pemVkTW9tZW50dW0iLCJyZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzIiwic2xpY2UiLCJkZXRlY3RlZE1vbWVudHVtIiwiZXZlcnkiLCJhY2NGYWMiLCJzYW1lQWNjRmFjIiwiZjEiLCJmMiIsImJvdGhBcmVJblJhbmdlT3JaZXJvIiwiRGF0ZSIsIm5vdyIsIndpbGxFbmRJZCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJfV2hlZWxUYXJnZXRPYnNlcnZlciIsImFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMiLCJlbWJsYUFwaU1haW4iLCJlbWJsYUFwaVRodW1iIiwic2xpZGVzVGh1bWJzIiwic2xpZGVOb2RlcyIsInNjcm9sbFRvSW5kZXgiLCJfIiwiaW5kZXgiLCJzY3JvbGxUbyIsInNsaWRlTm9kZSIsImFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSIsInRvZ2dsZVRodW1iQnRuc1N0YXRlIiwic2VsZWN0ZWRTY3JvbGxTbmFwIiwicHJldmlvdXNTY3JvbGxTbmFwIiwic2VsZWN0ZWQiLCJhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzIiwiZW1ibGFBcGkiLCJwcmV2QnRuIiwibmV4dEJ0biIsInNjcm9sbFByZXYiLCJzY3JvbGxOZXh0IiwicmVtb3ZlVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlIiwiYWRkVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlIiwidG9nZ2xlUHJldk5leHRCdG5zU3RhdGUiLCJjYW5TY3JvbGxQcmV2IiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiY2FuU2Nyb2xsTmV4dCIsImNsYW1wTnVtYmVyIiwibnVtYmVyIiwiaXNOdW1iZXIiLCJpc05hTiIsIkZhZGUiLCJhcmd1bWVudHMiLCJmdWxsT3BhY2l0eSIsIm5vT3BhY2l0eSIsImZhZGVGcmljdGlvbiIsInRpbWVTdGVwIiwib3BhY2l0aWVzIiwiZmFkZVRvTmV4dERpc3RhbmNlIiwiZGlzdGFuY2VGcm9tUG9pbnRlckRvd24iLCJmYWRlVmVsb2NpdHkiLCJwcm9ncmVzcyIsInNob3VsZEZhZGVQYWlyIiwiZGVmYXVsdFNldHRsZWRCZWhhdmlvdXIiLCJkZWZhdWx0UHJvZ3Jlc3NCZWhhdmlvdXIiLCJlbWJsYUFwaUluc3RhbmNlIiwic2VsZWN0ZWRTbmFwIiwic2Nyb2xsQm9keSIsImNvbnRhaW5lclNpemUiLCJtZWFzdXJlU2l6ZSIsInNjcm9sbFNuYXBMaXN0Iiwic2V0dGxlZCIsInNjcm9sbFByb2dyZXNzIiwic2VsZWN0IiwiZmFkZVRvU2VsZWN0ZWRTbmFwSW5zdGFudGx5IiwicG9pbnRlckRvd24iLCJwb2ludGVyVXAiLCJkaXNhYmxlU2Nyb2xsIiwic2xpZGVTdHlsZSIsInN0eWxlIiwib3BhY2l0eSIsInRyYW5zZm9ybSIsInBvaW50ZXJFdmVudHMiLCJnZXRBdHRyaWJ1dGUiLCJzZXRPcGFjaXRpZXMiLCJkdXJhdGlvbiIsImdldFNsaWRlVHJhbnNmb3JtIiwicG9zaXRpb24iLCJ0cmFuc2xhdGVBeGlzIiwic2Nyb2xsIiwidG9VcHBlckNhc2UiLCJkaXJlY3Rpb24iLCJ0cmFuc2xhdGUiLCJzbGlkZUxvb3BlciIsImNsZWFyIiwidG9nZ2xlQWN0aXZlIiwibG9vcFBvaW50cyIsIl9yZWYiLCJsb2NrRXhjZXNzaXZlU2Nyb2xsIiwiZmFkZUluZGV4Iiwic2Nyb2xsU25hcHMiLCJsb2NhdGlvbiIsInNldCIsImluZGV4QSIsImFic1ZlbG9jaXR5IiwiY3VycmVudE9wYWNpdHkiLCJpc0ZhZGVJbmRleCIsIm5leHRPcGFjaXR5IiwiY2xhbXBlZE9wYWNpdHkiLCJmYWRlUGFpciIsImluZGV4QiIsInNldFByb2dyZXNzIiwic2V0T3BhY2l0eSIsInNsaWRlc0luU25hcCIsInNsaWRlUmVnaXN0cnkiLCJzbGlkZUluZGV4Iiwicm91bmRlZE9wYWNpdHkiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImhhc09wYWNpdHkiLCJ0b1N0cmluZyIsImRyYWdIYW5kbGVyIiwic25hcEZyYWN0aW9uIiwic2lnbiIsImNsb25lIiwiZ2V0IiwiY3VycmVudFBvc2l0aW9uIiwiZGlmZlBvc2l0aW9uIiwiZ2V0RmFkZUluZGV4IiwiZGlyZWN0aW9uU2lnbiIsImRpc3RhbmNlU2lnbiIsIm5leHRTbmFwIiwiZmFkZSIsImZpeGVkRGVsdGFUaW1lU2Vjb25kcyIsIm5vRmFkZUluZGV4IiwiZGlmZlRvVGFyZ2V0Iiwibm90UmVhY2hlZFRhcmdldCIsInN1YmplY3QiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImlzT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsIm1hdGhBYnMiLCJuIiwibWF0aFNpZ24iLCJkZWx0YUFicyIsInZhbHVlQiIsInZhbHVlQSIsImZhY3RvckFicyIsImRpZmYiLCJhcnJheUtleXMiLCJvYmplY3RLZXlzIiwiTnVtYmVyIiwiYXJyYXlMYXN0IiwiYXJyYXlMYXN0SW5kZXgiLCJhcnJheUlzTGFzdEluZGV4IiwiYXJyYXlGcm9tTnVtYmVyIiwic3RhcnRBdCIsImZyb20iLCJvYmplY3QiLCJrZXlzIiwib2JqZWN0c01lcmdlRGVlcCIsIm9iamVjdEEiLCJvYmplY3RCIiwibWVyZ2VkT2JqZWN0cyIsImN1cnJlbnRPYmplY3QiLCJrZXkiLCJhcmVPYmplY3RzIiwiaXNNb3VzZUV2ZW50IiwiZXZ0Iiwib3duZXJXaW5kb3ciLCJBbGlnbm1lbnQiLCJhbGlnbiIsInZpZXdTaXplIiwicHJlZGVmaW5lZCIsImNlbnRlciIsIm1lYXN1cmUiLCJFdmVudFN0b3JlIiwibm9kZSIsImhhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImxlZ2FjeU1lZGlhUXVlcnlMaXN0IiwiYWRkTGlzdGVuZXIiLCJBbmltYXRpb25zIiwib3duZXJEb2N1bWVudCIsInVwZGF0ZSIsInJlbmRlciIsImRvY3VtZW50VmlzaWJsZUhhbmRsZXIiLCJsYXN0VGltZVN0YW1wIiwibGFnIiwiYW5pbWF0aW9uRnJhbWUiLCJoaWRkZW4iLCJyZXNldCIsInN0b3AiLCJhbmltYXRlIiwiZWxhcHNlZCIsImxhZ09mZnNldCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiQXhpcyIsImNvbnRlbnREaXJlY3Rpb24iLCJpc1JpZ2h0VG9MZWZ0IiwiaXNWZXJ0aWNhbCIsImNyb3NzIiwic3RhcnRFZGdlIiwiZ2V0U3RhcnRFZGdlIiwiZW5kRWRnZSIsImdldEVuZEVkZ2UiLCJub2RlUmVjdCIsIkxpbWl0IiwicmVhY2hlZE1pbiIsInJlYWNoZWRNYXgiLCJyZWFjaGVkQW55IiwiY29uc3RyYWluIiwicmVtb3ZlT2Zmc2V0IiwiQ291bnRlciIsImxvb3AiLCJsb29wRW5kIiwiY291bnRlciIsIndpdGhpbkxpbWl0IiwiRHJhZ0hhbmRsZXIiLCJyb290Tm9kZSIsImRyYWdUcmFja2VyIiwiYW5pbWF0aW9uIiwic2Nyb2xsVGFyZ2V0IiwiZXZlbnRIYW5kbGVyIiwicGVyY2VudE9mVmlldyIsImRyYWdUaHJlc2hvbGQiLCJiYXNlRnJpY3Rpb24iLCJ3YXRjaERyYWciLCJjcm9zc0F4aXMiLCJmb2N1c05vZGVzIiwibm9uUGFzc2l2ZUV2ZW50IiwiaW5pdEV2ZW50cyIsImRyYWdFdmVudHMiLCJnb1RvTmV4dFRocmVzaG9sZCIsInNuYXBGb3JjZUJvb3N0IiwibW91c2UiLCJ0b3VjaCIsImZyZWVGb3JjZUJvb3N0IiwiYmFzZVNwZWVkIiwiaXNNb3ZpbmciLCJzdGFydFNjcm9sbCIsInN0YXJ0Q3Jvc3MiLCJwb2ludGVySXNEb3duIiwicHJldmVudFNjcm9sbCIsInByZXZlbnRDbGljayIsImlzTW91c2UiLCJkb3duSWZBbGxvd2VkIiwiZG93biIsInVwIiwiY2xpY2siLCJhZGREcmFnRXZlbnRzIiwibW92ZSIsImlzRm9jdXNOb2RlIiwibm9kZU5hbWUiLCJpbmNsdWRlcyIsImZvcmNlQm9vc3QiLCJib29zdCIsImFsbG93ZWRGb3JjZSIsImZvcmNlIiwidGFyZ2V0Q2hhbmdlZCIsIm5leHQiLCJiYXNlRm9yY2UiLCJieURpc3RhbmNlIiwiZGlzdGFuY2UiLCJieUluZGV4IiwiaXNNb3VzZUV2dCIsImJ1dHRvbnMiLCJ1c2VGcmljdGlvbiIsInVzZUR1cmF0aW9uIiwicmVhZFBvaW50IiwiZW1pdCIsImlzVG91Y2hFdnQiLCJ0b3VjaGVzIiwibGFzdFNjcm9sbCIsImxhc3RDcm9zcyIsImRpZmZTY3JvbGwiLCJkaWZmQ3Jvc3MiLCJwb2ludGVyTW92ZSIsImN1cnJlbnRMb2NhdGlvbiIsInJhd0ZvcmNlIiwiZm9yY2VGYWN0b3IiLCJzcGVlZCIsImZyaWN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRHJhZ1RyYWNrZXIiLCJsb2dJbnRlcnZhbCIsImxhc3RFdmVudCIsInJlYWRUaW1lIiwiZXZ0QXhpcyIsInByb3BlcnR5IiwiY29vcmQiLCJleHBpcmVkIiwiZGlmZkRyYWciLCJkaWZmVGltZSIsImlzRmxpY2siLCJOb2RlUmVjdHMiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJQZXJjZW50T2ZWaWV3IiwiUmVzaXplSGFuZGxlciIsImNvbnRhaW5lciIsInNsaWRlcyIsIndhdGNoUmVzaXplIiwibm9kZVJlY3RzIiwicmVzaXplT2JzZXJ2ZXIiLCJzbGlkZVNpemVzIiwiZGVzdHJveWVkIiwicmVhZFNpemUiLCJkZWZhdWx0Q2FsbGJhY2siLCJlbnRyaWVzIiwiZW50cnkiLCJpc0NvbnRhaW5lciIsImluZGV4T2YiLCJsYXN0U2l6ZSIsIm5ld1NpemUiLCJkaWZmU2l6ZSIsInJlSW5pdCIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZU5vZGVzIiwiU2Nyb2xsQm9keSIsIm9mZnNldExvY2F0aW9uIiwicHJldmlvdXNMb2NhdGlvbiIsImJhc2VEdXJhdGlvbiIsImJvZHlWZWxvY2l0eSIsInNjcm9sbERpcmVjdGlvbiIsInNjcm9sbER1cmF0aW9uIiwic2Nyb2xsRnJpY3Rpb24iLCJyYXdMb2NhdGlvbiIsInJhd0xvY2F0aW9uUHJldmlvdXMiLCJzZWVrIiwiaXNJbnN0YW50IiwiZGlyZWN0aW9uRGlmZiIsInVzZUJhc2VEdXJhdGlvbiIsInVzZUJhc2VGcmljdGlvbiIsIlNjcm9sbEJvdW5kcyIsImxpbWl0IiwicHVsbEJhY2tUaHJlc2hvbGQiLCJlZGdlT2Zmc2V0VG9sZXJhbmNlIiwiZnJpY3Rpb25MaW1pdCIsImRpc2FibGVkIiwic2hvdWxkQ29uc3RyYWluIiwiZWRnZSIsImRpZmZUb0VkZ2UiLCJzdWJ0cmFjdCIsIlNjcm9sbENvbnRhaW4iLCJjb250ZW50U2l6ZSIsInNuYXBzQWxpZ25lZCIsImNvbnRhaW5TY3JvbGwiLCJwaXhlbFRvbGVyYW5jZSIsInNjcm9sbEJvdW5kcyIsInNuYXBzQm91bmRlZCIsIm1lYXN1cmVCb3VuZGVkIiwic2Nyb2xsQ29udGFpbkxpbWl0IiwiZmluZFNjcm9sbENvbnRhaW5MaW1pdCIsInNuYXBzQ29udGFpbmVkIiwibWVhc3VyZUNvbnRhaW5lZCIsInVzZVBpeGVsVG9sZXJhbmNlIiwiYm91bmQiLCJzbmFwIiwic3RhcnRTbmFwIiwiZW5kU25hcCIsImxhc3RJbmRleE9mIiwic25hcEFsaWduZWQiLCJpc0ZpcnN0IiwiaXNMYXN0Iiwic2Nyb2xsQm91bmQiLCJTY3JvbGxMaW1pdCIsIlNjcm9sbExvb3BlciIsInZlY3RvcnMiLCJqb2ludFNhZmV0eSIsInNob3VsZExvb3AiLCJsb29wRGlzdGFuY2UiLCJTY3JvbGxQcm9ncmVzcyIsIlNjcm9sbFNuYXBzIiwiYWxpZ25tZW50Iiwic2xpZGVSZWN0cyIsInNsaWRlc1RvU2Nyb2xsIiwiZ3JvdXBTbGlkZXMiLCJhbGlnbm1lbnRzIiwibWVhc3VyZVNpemVzIiwic25hcHMiLCJtZWFzdXJlVW5hbGlnbmVkIiwibWVhc3VyZUFsaWduZWQiLCJyZWN0cyIsInJlY3QiLCJnIiwiU2xpZGVSZWdpc3RyeSIsImNvbnRhaW5TbmFwcyIsInNsaWRlSW5kZXhlcyIsImNyZWF0ZVNsaWRlUmVnaXN0cnkiLCJncm91cGVkU2xpZGVJbmRleGVzIiwiZG9Ob3RDb250YWluIiwiZ3JvdXAiLCJncm91cHMiLCJyYW5nZSIsIlNjcm9sbFRhcmdldCIsInRhcmdldFZlY3RvciIsIm1pbkRpc3RhbmNlIiwiZGlzdGFuY2VzIiwic29ydCIsImZpbmRUYXJnZXRTbmFwIiwiYXNjRGlmZnNUb1NuYXBzIiwic2hvcnRjdXQiLCJkMSIsImQyIiwibWF0Y2hpbmdUYXJnZXRzIiwiZGlmZlRvU25hcCIsInRhcmdldFNuYXBEaXN0YW5jZSIsInJlYWNoZWRCb3VuZCIsInNuYXBEaXN0YW5jZSIsIlNjcm9sbFRvIiwiaW5kZXhDdXJyZW50IiwiaW5kZXhQcmV2aW91cyIsImRpc3RhbmNlRGlmZiIsImluZGV4RGlmZiIsInRhcmdldEluZGV4IiwiU2xpZGVGb2N1cyIsInJvb3QiLCJldmVudFN0b3JlIiwibGFzdFRhYlByZXNzVGltZSIsInJlZ2lzdGVyVGFiUHJlc3MiLCJhZGRTbGlkZUZvY3VzRXZlbnQiLCJjb2RlIiwiZ2V0VGltZSIsInNsaWRlIiwiZm9jdXMiLCJub3dUaW1lIiwic2Nyb2xsTGVmdCIsImZpbmRJbmRleCIsImNhcHR1cmUiLCJWZWN0b3IxRCIsImluaXRpYWxWYWx1ZSIsIm5vcm1hbGl6ZUlucHV0IiwiVHJhbnNsYXRlIiwieCIsInkiLCJjb250YWluZXJTdHlsZSIsInRvIiwiU2xpZGVMb29wZXIiLCJzbGlkZVNpemVzV2l0aEdhcHMiLCJyb3VuZGluZ1NhZmV0eSIsImFzY0l0ZW1zIiwiZGVzY0l0ZW1zIiwicmV2ZXJzZSIsInN0YXJ0UG9pbnRzIiwiZW5kUG9pbnRzIiwicmVtb3ZlU2xpZGVTaXplcyIsImluZGV4ZXMiLCJzbGlkZXNJbkdhcCIsImdhcCIsInJlbWFpbmluZ0dhcCIsImZpbmRTbGlkZUJvdW5kcyIsImZpbmRMb29wUG9pbnRzIiwiaXNFbmRFZGdlIiwic2xpZGVCb3VuZHMiLCJpbml0aWFsIiwiYWx0ZXJlZCIsImJvdW5kRWRnZSIsImxvb3BQb2ludCIsInNsaWRlTG9jYXRpb24iLCJjYW5Mb29wIiwib3RoZXJJbmRleGVzIiwic2hpZnRMb2NhdGlvbiIsIlNsaWRlc0hhbmRsZXIiLCJ3YXRjaFNsaWRlcyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJtdXRhdGlvbiIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJjaGlsZExpc3QiLCJTbGlkZXNJblZpZXciLCJ0aHJlc2hvbGQiLCJpbnRlcnNlY3Rpb25FbnRyeU1hcCIsImluVmlld0NhY2hlIiwibm90SW5WaWV3Q2FjaGUiLCJpbnRlcnNlY3Rpb25PYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwicGFyZW50RWxlbWVudCIsImNyZWF0ZUluVmlld0xpc3QiLCJpblZpZXciLCJsaXN0IiwicGFyc2VJbnQiLCJpc0ludGVyc2VjdGluZyIsImluVmlld01hdGNoIiwibm90SW5WaWV3TWF0Y2giLCJTbGlkZVNpemVzIiwicmVhZEVkZ2VHYXAiLCJ3aXRoRWRnZUdhcCIsInN0YXJ0R2FwIiwibWVhc3VyZVN0YXJ0R2FwIiwiZW5kR2FwIiwibWVhc3VyZUVuZEdhcCIsIm1lYXN1cmVXaXRoR2FwcyIsInNsaWRlUmVjdCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiU2xpZGVzVG9TY3JvbGwiLCJncm91cEJ5TnVtYmVyIiwiYnlOdW1iZXIiLCJncm91cFNpemUiLCJieVNpemUiLCJyZWN0QiIsInJlY3RBIiwiZWRnZUEiLCJlZGdlQiIsImdhcEEiLCJnYXBCIiwiY2h1bmtTaXplIiwiY3VycmVudFNpemUiLCJwcmV2aW91c1NpemUiLCJFbmdpbmUiLCJzY3JvbGxBeGlzIiwic3RhcnRJbmRleCIsImluVmlld1RocmVzaG9sZCIsIl9yZWYyIiwiX3JlZjMiLCJzY3JvbGxMb29wZXIiLCJzaG91bGRTZXR0bGUiLCJ3aXRoaW5Cb3VuZHMiLCJoYXNTZXR0bGVkIiwiaW50ZXJwb2xhdGVkTG9jYXRpb24iLCJzdGFydExvY2F0aW9uIiwic2xpZGVzSW5WaWV3Iiwic2xpZGVGb2N1cyIsInJlc2l6ZUhhbmRsZXIiLCJzbGlkZXNIYW5kbGVyIiwiRXZlbnRIYW5kbGVyIiwiYXBpIiwiZ2V0TGlzdGVuZXJzIiwiY2IiLCJPcHRpb25zSGFuZGxlciIsIm9wdGlvbnNBIiwib3B0aW9uc0IiLCJtYXRjaGVkTWVkaWFPcHRpb25zIiwibWVkaWEiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsIm1lZGlhT3B0aW9uIiwib3B0aW9uc01lZGlhUXVlcmllcyIsIm9wdGlvbnNMaXN0IiwiYWNjIiwibWVkaWFRdWVyaWVzIiwiUGx1Z2luc0hhbmRsZXIiLCJhY3RpdmVQbHVnaW5zIiwicGx1Z2lucyIsIl9yZWY0IiwicGx1Z2luIiwiYXNzaWduIiwiRW1ibGFDYXJvdXNlbCIsInVzZXJQbHVnaW5zIiwiZGVmYXVsdFZpZXciLCJwbHVnaW5zSGFuZGxlciIsIm1lZGlhSGFuZGxlcnMiLCJyZUFjdGl2YXRlIiwicGx1Z2luTGlzdCIsInBsdWdpbkFwaXMiLCJzdG9yZUVsZW1lbnRzIiwidXNlckNvbnRhaW5lciIsInVzZXJTbGlkZXMiLCJjdXN0b21Db250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2hpbGRyZW4iLCJjdXN0b21TbGlkZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY3JlYXRlRW5naW5lIiwib3B0aW9uc1dpdGhvdXRMb29wIiwiYWN0aXZhdGUiLCJ3aXRoT3B0aW9ucyIsIndpdGhQbHVnaW5zIiwiX3JlZjUiLCJxdWVyeSIsIm9mZnNldFBhcmVudCIsImRlQWN0aXZhdGUiLCJqdW1wIiwicHJldiIsInNsaWRlc05vdEluVmlldyIsIllURHluYW1pY3NHYWxsZXJ5IiwiT1BUSU9OUyIsIk9QVElPTlNfVEhVTUJTIiwidmlld3BvcnROb2RlTWFpbkNhcm91c2VsIiwidmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCIsInByZXZUaHVtYkJ0bk5vZGUiLCJuZXh0VGh1bWJCdG5Ob2RlIiwiZW1ibGFNYWluIiwiZW1ibGFUaHVtYiIsInJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMiLCJyZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUiLCJyZW1vdmVUaHVtYlByZXZOZXh0QnRuc0NsaWNrSGFuZGxlcnMiLCJybXNsaWRlc2hvd3MiXSwic291cmNlUm9vdCI6IiJ9