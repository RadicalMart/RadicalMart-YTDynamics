/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js ***!
  \**********************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WheelGesturesPlugin: () => (/* binding */ WheelGesturesPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
    function updateSizeRelatedVariables() {
      scrollBoundaryThreshold = (wheelAxis === 'x' ? engine.containerRect.width : engine.containerRect.height) / 2;
    }
    var unobserveTargetNode = wheelGestures.observe(targetNode);
    var offWheel = wheelGestures.on('wheel', handleWheel);
    var isStarted = false;
    var startEvent;
    var overBoundaryAccumulation = 0;
    var scrollBoundaryThreshold = 0;
    var blockedWaitUntilGestureEnd = false;
    updateSizeRelatedVariables();
    embla.on('resize', updateSizeRelatedVariables);
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
      overBoundaryAccumulation = 0;
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
      }
      var _checkIfAtBoundary = checkIfAtBoundary(state),
        isAtBoundary = _checkIfAtBoundary.isAtBoundary; // Apply progressive rubber band damping when at boundaries

      if (isAtBoundary) {
        // Calculate progressive damping factor based on how far over boundary we are
        var progressRatio = Math.min(overBoundaryAccumulation / scrollBoundaryThreshold, 1);
        var dampingFactor = 0.25 + progressRatio * 0.5;
        var counterMoveSign = moveX > 0 ? -1 : 1;
        var counterMovement = overBoundaryAccumulation * counterMoveSign;
        var dampingMovement = counterMovement * dampingFactor;
        moveX += dampingMovement;
        moveY += dampingMovement;
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
    function checkIfAtBoundary(state) {
      var _state$axisDelta = state.axisDelta,
        deltaX = _state$axisDelta[0],
        deltaY = _state$axisDelta[1];
      var scrollProgress = embla.scrollProgress();
      var canScrollNext = scrollProgress < 1;
      var canScrollPrev = scrollProgress > 0;
      var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
      var isScrollingNext = primaryAxisDelta < 0;
      var isScrollingPrev = primaryAxisDelta > 0;
      var isAtBoundary = isScrollingNext && !canScrollNext || isScrollingPrev && !canScrollPrev;
      return {
        isAtBoundary: isAtBoundary,
        primaryAxisDelta: primaryAxisDelta
      };
    }
    function isBoundaryThresholdReached(state) {
      var _checkIfAtBoundary2 = checkIfAtBoundary(state),
        isAtBoundary = _checkIfAtBoundary2.isAtBoundary,
        primaryAxisDelta = _checkIfAtBoundary2.primaryAxisDelta;
      if (isAtBoundary && !state.isMomentum) {
        overBoundaryAccumulation += Math.abs(primaryAxisDelta); // End gesture if we exceed the threshold

        if (overBoundaryAccumulation > scrollBoundaryThreshold) {
          blockedWaitUntilGestureEnd = true;
          wheelGestureEnded(state);
          return true;
        }
      } else {
        // Reset accumulation when we can scroll or when not at boundary
        overBoundaryAccumulation = 0;
      }
      return false;
    }
    function handleWheel(state) {
      var _state$axisDelta2 = state.axisDelta,
        deltaX = _state$axisDelta2[0],
        deltaY = _state$axisDelta2[1];
      var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
      var crossAxisDelta = wheelAxis === 'x' ? deltaY : deltaX;
      var isRelease = state.isMomentum && state.previous && !state.previous.isMomentum;
      var isEndingOrRelease = state.isEnding && !state.isMomentum || isRelease;
      var primaryAxisDeltaIsDominant = Math.abs(primaryAxisDelta) > Math.abs(crossAxisDelta);
      if (primaryAxisDeltaIsDominant && !isStarted && !state.isMomentum && !blockedWaitUntilGestureEnd) {
        wheelGestureStarted(state);
      }
      if (blockedWaitUntilGestureEnd && state.isEnding) {
        blockedWaitUntilGestureEnd = false;
      }
      if (!isStarted) return;
      if (isBoundaryThresholdReached(state)) return;
      if (isEndingOrRelease) {
        wheelGestureEnded(state);
      } else {
        dispatchEvent(createRelativeMouseEvent('mousemove', state));
      }
    }
    cleanup = function cleanup() {
      unobserveTargetNode();
      offWheel();
      embla.off('resize', updateSizeRelatedVariables);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WheelGesturesPlugin);


/***/ },

/***/ "./node_modules/wheel-gestures/dist/wheel-gestures.esm.js"
/*!****************************************************************!*\
  !*** ./node_modules/wheel-gestures/dist/wheel-gestures.esm.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/buttons.es6"
/*!*************************!*\
  !*** ./src/buttons.es6 ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPrevNextButtonsClickHandlers: () => (/* binding */ addPrevNextButtonsClickHandlers),
/* harmony export */   addThumbButtonsClickHandlers: () => (/* binding */ addThumbButtonsClickHandlers),
/* harmony export */   addToggleThumbButtonsActive: () => (/* binding */ addToggleThumbButtonsActive)
/* harmony export */ });
const addThumbButtonsClickHandlers = (emblaApiMain, slidesThumbs) => {
  const scrollToIndex = slidesThumbs.map((_, index) => event => {
    event.preventDefault();
    emblaApiMain.scrollTo(index);
  });
  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false);
  });
  return () => {
    slidesThumbs.forEach((slideNode, index) => {
      slideNode.removeEventListener('click', scrollToIndex[index], false);
    });
  };
};
const addToggleThumbButtonsActive = function (emblaApiMain, slidesThumbs) {
  let emblaApiThumb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const toggleThumbBtnsState = () => {
    const selected = emblaApiMain.selectedScrollSnap();
    emblaApiThumb?.scrollTo(selected);
    slidesThumbs.forEach((slide, index) => {
      const isSelected = index === selected;
      slide.classList.toggle('rmslideshow-thumbs__slide--selected', isSelected);
      slide.classList.toggle('uk-active', isSelected);
      slide.setAttribute('aria-current', isSelected ? 'true' : 'false');
    });
  };
  emblaApiMain.on('select', toggleThumbBtnsState).on('reInit', toggleThumbBtnsState);
  toggleThumbBtnsState();
  return () => {
    emblaApiMain.off('select', toggleThumbBtnsState);
    emblaApiMain.off('reInit', toggleThumbBtnsState);
    slidesThumbs.forEach(slide => {
      slide.classList.remove('rmslideshow-thumbs__slide--selected');
      slide.classList.remove('uk-active');
      slide.removeAttribute('aria-current');
    });
  };
};
const addPrevNextButtonsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  const scrollPrev = event => {
    event.preventDefault();
    emblaApi.scrollPrev();
  };
  const scrollNext = event => {
    event.preventDefault();
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
  const togglePrevNextBtnsState = () => {
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
    emblaApi.off('select', togglePrevNextBtnsState);
    emblaApi.off('init', togglePrevNextBtnsState);
    emblaApi.off('reInit', togglePrevNextBtnsState);
    prevBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  };
}

/***/ },

/***/ "./src/gallery.scss"
/*!**************************!*\
  !*** ./src/gallery.scss ***!
  \**************************/
() {

// extracted by mini-css-extract-plugin

/***/ },

/***/ "./node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autoplay)
/* harmony export */ });
const defaultOptions = {
  active: true,
  breakpoints: {},
  delay: 4000,
  jump: false,
  playOnInit: true,
  stopOnFocusIn: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  stopOnLastSnap: false,
  rootNode: null
};
function normalizeDelay(emblaApi, delay) {
  const scrollSnaps = emblaApi.scrollSnapList();
  if (typeof delay === 'number') {
    return scrollSnaps.map(() => delay);
  }
  return delay(scrollSnaps, emblaApi);
}
function getAutoplayRootNode(emblaApi, rootNode) {
  const emblaRootNode = emblaApi.rootNode();
  return rootNode && rootNode(emblaRootNode) || emblaRootNode;
}
function Autoplay() {
  let userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options;
  let emblaApi;
  let destroyed;
  let delay;
  let timerStartTime = null;
  let timerId = 0;
  let autoplayActive = false;
  let mouseIsOver = false;
  let playOnDocumentVisible = false;
  let jump = false;
  function init(emblaApiInstance, optionsHandler) {
    emblaApi = emblaApiInstance;
    const {
      mergeOptions,
      optionsAtMedia
    } = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);
    if (emblaApi.scrollSnapList().length <= 1) return;
    jump = options.jump;
    destroyed = false;
    delay = normalizeDelay(emblaApi, options.delay);
    const {
      eventStore,
      ownerDocument
    } = emblaApi.internalEngine();
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag;
    const root = getAutoplayRootNode(emblaApi, options.rootNode);
    eventStore.add(ownerDocument, 'visibilitychange', visibilityChange);
    if (isDraggable) {
      emblaApi.on('pointerDown', pointerDown);
    }
    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on('pointerUp', pointerUp);
    }
    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', mouseEnter);
    }
    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, 'mouseleave', mouseLeave);
    }
    if (options.stopOnFocusIn) {
      emblaApi.on('slideFocusStart', stopAutoplay);
    }
    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), 'focusout', startAutoplay);
    }
    if (options.playOnInit) startAutoplay();
  }
  function destroy() {
    emblaApi.off('pointerDown', pointerDown).off('pointerUp', pointerUp).off('slideFocusStart', stopAutoplay);
    stopAutoplay();
    destroyed = true;
    autoplayActive = false;
  }
  function setTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId);
    timerId = ownerWindow.setTimeout(next, delay[emblaApi.selectedScrollSnap()]);
    timerStartTime = new Date().getTime();
    emblaApi.emit('autoplay:timerset');
  }
  function clearTimer() {
    const {
      ownerWindow
    } = emblaApi.internalEngine();
    ownerWindow.clearTimeout(timerId);
    timerId = 0;
    timerStartTime = null;
    emblaApi.emit('autoplay:timerstopped');
  }
  function startAutoplay() {
    if (destroyed) return;
    if (documentIsHidden()) {
      playOnDocumentVisible = true;
      return;
    }
    if (!autoplayActive) emblaApi.emit('autoplay:play');
    setTimer();
    autoplayActive = true;
  }
  function stopAutoplay() {
    if (destroyed) return;
    if (autoplayActive) emblaApi.emit('autoplay:stop');
    clearTimer();
    autoplayActive = false;
  }
  function visibilityChange() {
    if (documentIsHidden()) {
      playOnDocumentVisible = autoplayActive;
      return stopAutoplay();
    }
    if (playOnDocumentVisible) startAutoplay();
  }
  function documentIsHidden() {
    const {
      ownerDocument
    } = emblaApi.internalEngine();
    return ownerDocument.visibilityState === 'hidden';
  }
  function pointerDown() {
    if (!mouseIsOver) stopAutoplay();
  }
  function pointerUp() {
    if (!mouseIsOver) startAutoplay();
  }
  function mouseEnter() {
    mouseIsOver = true;
    stopAutoplay();
  }
  function mouseLeave() {
    mouseIsOver = false;
    startAutoplay();
  }
  function play(jumpOverride) {
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride;
    startAutoplay();
  }
  function stop() {
    if (autoplayActive) stopAutoplay();
  }
  function reset() {
    if (autoplayActive) startAutoplay();
  }
  function isPlaying() {
    return autoplayActive;
  }
  function next() {
    const {
      index
    } = emblaApi.internalEngine();
    const nextIndex = index.clone().add(1).get();
    const lastIndex = emblaApi.scrollSnapList().length - 1;
    const kill = options.stopOnLastSnap && nextIndex === lastIndex;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump);
    } else {
      emblaApi.scrollTo(0, jump);
    }
    emblaApi.emit('autoplay:select');
    if (kill) return stopAutoplay();
    startAutoplay();
  }
  function timeUntilNext() {
    if (!timerStartTime) return null;
    const currentDelay = delay[emblaApi.selectedScrollSnap()];
    const timePastSinceStart = new Date().getTime() - timerStartTime;
    return currentDelay - timePastSinceStart;
  }
  const self = {
    name: 'autoplay',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying,
    timeUntilNext
  };
  return self;
}
Autoplay.globalOptions = undefined;


/***/ },

/***/ "./node_modules/embla-carousel/esm/embla-carousel.esm.js"
/*!***************************************************************!*\
  !*** ./node_modules/embla-carousel/esm/embla-carousel.esm.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
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
  const fixedTimeStep = 1000 / 60;
  let lastTimeStamp = null;
  let accumulatedTime = 0;
  let animationId = 0;
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
    if (!animationId) return;
    if (!lastTimeStamp) {
      lastTimeStamp = timeStamp;
      update();
      update();
    }
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    accumulatedTime += timeElapsed;
    while (accumulatedTime >= fixedTimeStep) {
      update();
      accumulatedTime -= fixedTimeStep;
    }
    const alpha = accumulatedTime / fixedTimeStep;
    render(alpha);
    if (animationId) {
      animationId = ownerWindow.requestAnimationFrame(animate);
    }
  }
  function start() {
    if (animationId) return;
    animationId = ownerWindow.requestAnimationFrame(animate);
  }
  function stop() {
    ownerWindow.cancelAnimationFrame(animationId);
    lastTimeStamp = null;
    accumulatedTime = 0;
    animationId = 0;
  }
  function reset() {
    lastTimeStamp = null;
    accumulatedTime = 0;
  }
  const self = {
    init,
    destroy,
    start,
    stop,
    update,
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
  const observeNodes = [container].concat(slides);
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
        if (destroyed) return;
        const isContainer = entry.target === container;
        const slideIndex = slides.indexOf(entry.target);
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
        const newSize = readSize(isContainer ? container : slides[slideIndex]);
        const diffSize = mathAbs(newSize - lastSize);
        if (diffSize >= 0.5) {
          emblaApi.reInit();
          eventHandler.emit('resize');
          break;
        }
      }
    }
    resizeObserver = new ResizeObserver(entries => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries);
      }
    });
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach(node => resizeObserver.observe(node));
    });
  }
  function destroy() {
    destroyed = true;
    if (resizeObserver) resizeObserver.disconnect();
  }
  const self = {
    init,
    destroy
  };
  return self;
}
function ScrollBody(location, offsetLocation, previousLocation, target, baseDuration, baseFriction) {
  let scrollVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const displacement = target.get() - location.get();
    const isInstant = !scrollDuration;
    let scrollDistance = 0;
    if (isInstant) {
      scrollVelocity = 0;
      previousLocation.set(target);
      location.set(target);
      scrollDistance = displacement;
    } else {
      previousLocation.set(location);
      scrollVelocity += displacement / scrollDuration;
      scrollVelocity *= scrollFriction;
      rawLocation += scrollVelocity;
      location.add(scrollVelocity);
      scrollDistance = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(scrollDistance);
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
    return scrollVelocity;
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
    return deltaAbs(bound, snap) <= 1;
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
function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus) {
  const focusListenerOptions = {
    passive: true,
    capture: true
  };
  let lastTabPressTime = 0;
  function init(emblaApi) {
    if (!watchFocus) return;
    function defaultCallback(index) {
      const nowTime = new Date().getTime();
      const diffTime = nowTime - lastTabPressTime;
      if (diffTime > 10) return;
      eventHandler.emit('slideFocusStart');
      root.scrollLeft = 0;
      const group = slideRegistry.findIndex(group => group.includes(index));
      if (!isNumber(group)) return;
      scrollBody.useDuration(0);
      scrollTo.index(group, 0);
      eventHandler.emit('slideFocus');
    }
    eventStore.add(document, 'keydown', registerTabPress, false);
    slides.forEach((slide, slideIndex) => {
      eventStore.add(slide, 'focus', evt => {
        if (isBoolean(watchFocus) || watchFocus(emblaApi, evt)) {
          defaultCallback(slideIndex);
        }
      }, focusListenerOptions);
    });
  }
  function registerTabPress(event) {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime();
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
  let previousTarget = null;
  let disabled = false;
  function x(n) {
    return `translate3d(${n}px,0px,0px)`;
  }
  function y(n) {
    return `translate3d(0px,${n}px,0px)`;
  }
  function to(target) {
    if (disabled) return;
    const newTarget = roundToTwoDecimals(axis.direction(target));
    if (newTarget === previousTarget) return;
    containerStyle.transform = translate(newTarget);
    previousTarget = newTarget;
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
    watchDrag,
    watchFocus
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
  const update = _ref2 => {
    let {
      dragHandler,
      scrollBody,
      scrollBounds,
      options: {
        loop
      }
    } = _ref2;
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody.seek();
  };
  const render = (_ref3, alpha) => {
    let {
      scrollBody,
      translate,
      location,
      offsetLocation,
      previousLocation,
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
    const hasSettledAndIdle = hasSettled && !dragHandler.pointerDown();
    if (hasSettledAndIdle) animation.stop();
    const interpolatedLocation = location.get() * alpha + previousLocation.get() * (1 - alpha);
    offsetLocation.set(interpolatedLocation);
    if (loop) {
      scrollLooper.loop(scrollBody.direction());
      slideLooper.loop();
    }
    translate.to(offsetLocation.get());
    if (hasSettledAndIdle) eventHandler.emit('settle');
    if (!hasSettled) eventHandler.emit('scroll');
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine), alpha => render(engine, alpha));
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
  const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore, eventHandler, watchFocus);
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
  watchSlides: true,
  watchFocus: true
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
    engine.slideFocus.init(self);
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
    return engine.scrollProgress.get(engine.offsetLocation.get());
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
  !*** ./src/gallery.es6 ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var embla_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! embla-carousel */ "./node_modules/embla-carousel/esm/embla-carousel.esm.js");
/* harmony import */ var embla_carousel_autoplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! embla-carousel-autoplay */ "./node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js");
/* harmony import */ var embla_carousel_wheel_gestures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! embla-carousel-wheel-gestures */ "./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js");
/* harmony import */ var _gallery_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gallery.scss */ "./src/gallery.scss");
/* harmony import */ var _gallery_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gallery_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _buttons_es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buttons.es6 */ "./src/buttons.es6");





class YTDynamicsGallery {
  init(container) {
    if (container.dataset.rmGalleryReady === 'true') {
      return;
    }
    const orientation = container.dataset.orientation === 'horizontal' ? 'horizontal' : 'vertical';
    const axis = orientation === 'vertical' ? 'y' : 'x';
    const mobileOrientation = container.dataset.mobileOrientation === 'horizontal' ? 'horizontal' : 'vertical';
    const mobileAxis = mobileOrientation === 'vertical' ? 'y' : 'x';
    const thumbAxis = container.dataset.thumbAxis === 'y' ? 'y' : 'x';
    const mobileThumbAxis = container.dataset.thumbMobileAxis === 'y' ? 'y' : 'x';
    const navMode = ['thumbnav', 'dotnav'].includes(container.dataset.nav) ? container.dataset.nav : '';
    const loop = container.dataset.loop !== 'false';
    const watchDrag = container.dataset.drag !== 'false';
    const duration = Math.max(10, Math.min(60, Number(container.dataset.duration) || 30));
    const autoplay = container.dataset.autoplay === 'true';
    const autoplayDelay = Math.max(3000, Math.min(20000, Number(container.dataset.autoplayDelay) || 7000));
    const autoplayPause = container.dataset.autoplayPause !== 'false';
    const options = {
      axis,
      loop,
      watchDrag,
      duration,
      breakpoints: {
        '(max-width: 639px)': {
          axis: mobileAxis
        }
      }
    };
    const optionsThumbs = {
      align: 'start',
      axis: thumbAxis,
      dragFree: true,
      loop: false,
      breakpoints: {
        '(max-width: 639px)': {
          axis: mobileThumbAxis
        }
      }
    };
    const viewportNodeMainCarousel = container.querySelector('.rmslideshow__viewport'),
      viewportNodeThumbCarousel = container.querySelector('.rmslideshow-thumbs__viewport'),
      prevThumbBtnNode = container.querySelector('.rmslideshow-thumbs__prev'),
      nextThumbBtnNode = container.querySelector('.rmslideshow-thumbs__next'),
      prevMainBtnNode = container.querySelector('.rmslideshow__prev'),
      nextMainBtnNode = container.querySelector('.rmslideshow__next');
    if (!viewportNodeMainCarousel) {
      return;
    }
    container.dataset.rmGalleryReady = 'true';
    const plugins = autoplay ? [(0,embla_carousel_autoplay__WEBPACK_IMPORTED_MODULE_1__["default"])({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: autoplayPause,
      stopOnFocusIn: autoplayPause
    })] : [];
    const emblaMain = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_0__["default"])(viewportNodeMainCarousel, options, plugins);
    const cleanups = [];
    let emblaThumb = null;
    const syncSlides = () => {
      const selected = emblaMain.selectedScrollSnap();
      emblaMain.slideNodes().forEach((slide, index) => {
        const active = index === selected;
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        slide.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(control => {
          if (active) {
            if (control.dataset.rmGalleryTabindex !== undefined) {
              const previous = control.dataset.rmGalleryTabindex;
              previous === '' ? control.removeAttribute('tabindex') : control.setAttribute('tabindex', previous);
              delete control.dataset.rmGalleryTabindex;
            }
          } else if (control.dataset.rmGalleryTabindex === undefined) {
            control.dataset.rmGalleryTabindex = control.getAttribute('tabindex') ?? '';
            control.setAttribute('tabindex', '-1');
          }
        });
      });
    };
    emblaMain.on('select', syncSlides).on('reInit', syncSlides);
    syncSlides();
    if (navMode && viewportNodeThumbCarousel) {
      const navNodes = Array.from(container.querySelectorAll('.rmslideshow-thumbs__slide'));
      if (navMode === 'thumbnav') {
        emblaThumb = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_0__["default"])(viewportNodeThumbCarousel, optionsThumbs, [(0,embla_carousel_wheel_gestures__WEBPACK_IMPORTED_MODULE_2__.WheelGesturesPlugin)()]);
      }
      cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_4__.addThumbButtonsClickHandlers)(emblaMain, navNodes), (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_4__.addToggleThumbButtonsActive)(emblaMain, navNodes, emblaThumb));
      if (emblaThumb && prevThumbBtnNode && nextThumbBtnNode) {
        cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_4__.addPrevNextButtonsClickHandlers)(emblaThumb, prevThumbBtnNode, nextThumbBtnNode));
      }
    }
    if (prevMainBtnNode && nextMainBtnNode) {
      cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_4__.addPrevNextButtonsClickHandlers)(emblaMain, prevMainBtnNode, nextMainBtnNode));
    }
    const cleanup = () => {
      emblaMain.off('select', syncSlides);
      emblaMain.off('reInit', syncSlides);
      cleanups.forEach(cleanup => cleanup());
      emblaThumb?.destroy();
      emblaMain.slideNodes().forEach(slide => {
        slide.removeAttribute('aria-hidden');
        slide.querySelectorAll('[data-rm-gallery-tabindex]').forEach(control => {
          const previous = control.dataset.rmGalleryTabindex;
          previous === '' ? control.removeAttribute('tabindex') : control.setAttribute('tabindex', previous);
          delete control.dataset.rmGalleryTabindex;
        });
      });
      delete container.dataset.rmGalleryReady;
      delete container.rmGalleryDestroy;
    };
    emblaMain.on('destroy', cleanup);
    container.rmGalleryDestroy = () => emblaMain.destroy();
  }
}
const galleryText = document.documentElement.lang.toLowerCase().startsWith('ru') ? {
  image: 'Изображение',
  open: 'Открыть изображение'
} : {
  image: 'Image',
  open: 'Open image'
};
const productSlide = function (container, media, index, total) {
  let template = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  const slide = template?.cloneNode(true) || document.createElement('div');
  if (!template) slide.className = 'el-item rmslideshow__slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} / ${total}`);
  slide.removeAttribute('aria-hidden');
  slide.querySelectorAll('[data-rm-gallery-tabindex]').forEach(control => {
    control.removeAttribute('data-rm-gallery-tabindex');
    control.removeAttribute('tabindex');
  });
  const imageWrap = slide.querySelector('.rmslideshow__slide__image') || document.createElement('div');
  if (!imageWrap.className) imageWrap.className = 'rmslideshow__slide__image uk-flex uk-flex-center uk-flex-middle';
  const image = imageWrap.querySelector('img') || document.createElement('img');
  image.src = media.src || '';
  image.alt = media.alt || '';
  image.loading = container.dataset.imageLoading === 'eager' ? 'eager' : 'lazy';
  if (!imageWrap.contains(image)) imageWrap.replaceChildren(image);
  if (container.dataset.lightbox === 'true') {
    const link = slide.querySelector('.rmslideshow__lightbox') || document.createElement('a');
    if (!link.className) link.className = 'rmslideshow__lightbox uk-display-block uk-position-relative uk-transition-toggle';
    link.href = media.src || '';
    link.dataset.rmLightbox = '';
    link.dataset.type = 'image';
    link.dataset.alt = media.alt || '';
    link.setAttribute('aria-label', `${galleryText.open}: ${media.alt || `${galleryText.image} ${index + 1}`}`);
    if (container.dataset.lightboxCaption !== 'false' && media.alt) {
      link.dataset.caption = media.alt;
    } else {
      delete link.dataset.caption;
    }
    const icon = link.querySelector('.rmslideshow__lightbox-icon') || document.createElement('span');
    if (!icon.className) icon.className = 'rmslideshow__lightbox-icon uk-position-center uk-transition-fade';
    icon.setAttribute('uk-overlay-icon', '');
    icon.setAttribute('aria-hidden', 'true');
    if (!link.contains(imageWrap)) link.prepend(imageWrap);
    if (!link.contains(icon)) link.append(icon);
    if (!slide.contains(link)) slide.replaceChildren(link);
  } else {
    slide.replaceChildren(imageWrap);
  }
  return slide;
};
const productThumb = function (container, media, index, anchorClass) {
  let template = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  const item = template?.cloneNode(true) || document.createElement('li');
  if (!template) item.className = 'rmslideshow-thumbs__slide';
  item.classList.remove('rmslideshow-thumbs__slide--selected', 'uk-active');
  item.removeAttribute('aria-current');
  const link = item.querySelector('a') || document.createElement('a');
  link.href = '#';
  link.setAttribute('aria-label', `${galleryText.image} ${index + 1}`);
  if (container.dataset.nav !== 'dotnav') {
    link.className = anchorClass || 'uk-display-block uk-overflow-hidden uk-background-muted';
    const wrap = link.querySelector('.rmslideshow-thumbs__slide__image') || document.createElement('span');
    if (!wrap.className) wrap.className = 'rmslideshow-thumbs__slide__image uk-flex uk-flex-center uk-flex-middle';
    const image = wrap.querySelector('img') || document.createElement('img');
    image.src = media.src || '';
    image.alt = media.alt || '';
    image.loading = container.dataset.imageLoading === 'eager' ? 'eager' : 'lazy';
    if (!wrap.contains(image)) wrap.replaceChildren(image);
    if (!link.contains(wrap)) link.replaceChildren(wrap);
  } else {
    link.removeAttribute('class');
    link.replaceChildren();
  }
  if (!item.contains(link)) item.replaceChildren(link);
  return item;
};
const updateProductGallery = function (container) {
  let media = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (container.dataset.rmProductGallery !== 'true') return;
  const slides = container.querySelector('.rmslideshow__container');
  const thumbs = container.querySelector('.rmslideshow-thumbs__container');
  if (!slides) return;
  const thumbAnchorClass = thumbs?.querySelector('.rmslideshow-thumbs__slide > a')?.className || '';
  const slideTemplate = slides.querySelector('.rmslideshow__slide');
  const thumbTemplate = thumbs?.querySelector('.rmslideshow-thumbs__slide') || null;
  container.rmGalleryDestroy?.();
  slides.replaceChildren(...media.map((item, index) => productSlide(container, item, index, media.length, slideTemplate)));
  if (thumbs) {
    thumbs.replaceChildren(...media.map((item, index) => productThumb(container, item, index, thumbAnchorClass, thumbTemplate)));
  }
  container.hidden = media.length === 0;
  window.UIkit?.update?.(container);
  // Keep the existing UIkit Lightbox instance attached to the slide list;
  // its delegated toggle watcher follows anchors replaced by a variant update.
  if (media.length) new YTDynamicsGallery().init(container);
};
const productGalleryText = document.documentElement.lang.toLowerCase().startsWith('ru') ? {
  image: 'Открыть изображение',
  video: 'Открыть видео'
} : {
  image: 'Open image',
  video: 'Open video'
};
const productGalleryItem = function (container, media, index) {
  let template = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  const type = media.type === 'video' ? 'video' : 'image';
  const item = template?.cloneNode(true) || document.createElement('article');
  if (!template) item.className = 'el-item rm-product-gallery__item uk-overflow-hidden';
  item.dataset.rmProductGalleryItem = '';
  item.dataset.mediaIndex = String(index);
  item.dataset.mediaType = type;
  item.hidden = false;
  const mediaWrap = item.querySelector('.rm-product-gallery__media') || document.createElement('span');
  if (!mediaWrap.className) mediaWrap.className = 'rm-product-gallery__media uk-flex uk-flex-center uk-flex-middle';
  const imageSrc = type === 'video' ? media.poster : media.src;
  if (imageSrc) {
    const image = mediaWrap.querySelector('img') || document.createElement('img');
    image.src = imageSrc;
    image.alt = media.alt || '';
    image.loading = container.dataset.imageLoading === 'eager' ? 'eager' : 'lazy';
    if (!mediaWrap.contains(image)) mediaWrap.prepend(image);
  } else {
    mediaWrap.querySelector('img')?.remove();
  }
  if (type === 'video') {
    const play = mediaWrap.querySelector('.rm-product-gallery__play') || document.createElement('span');
    if (!play.className) play.className = 'rm-product-gallery__play uk-icon-button';
    play.setAttribute('uk-icon', 'icon: play');
    play.setAttribute('aria-hidden', 'true');
    if (!mediaWrap.contains(play)) mediaWrap.append(play);
  } else {
    mediaWrap.querySelector('.rm-product-gallery__play')?.remove();
  }
  if (container.dataset.lightbox === 'true') {
    const link = item.querySelector('.rm-product-gallery__link') || document.createElement('a');
    if (!link.className) link.className = 'rm-product-gallery__link uk-display-block uk-position-relative uk-transition-toggle';
    link.href = media.src || '';
    link.dataset.rmProductGalleryLightbox = '';
    if (type === 'image') link.dataset.type = 'image';else delete link.dataset.type;
    link.setAttribute('aria-label', type === 'video' ? productGalleryText.video : productGalleryText.image);
    if (container.dataset.lightboxCaption !== 'false' && media.alt) {
      link.dataset.caption = media.alt;
    } else {
      delete link.dataset.caption;
    }
    if (!link.contains(mediaWrap)) link.replaceChildren(mediaWrap);
    if (!item.contains(link)) item.replaceChildren(link);
  } else {
    item.replaceChildren(mediaWrap);
  }
  return item;
};
const updateProductGalleryGridVisibility = container => {
  const limit = Math.max(0, Number(container.dataset.visibleLimit) || 0);
  const expanded = container.dataset.expanded === 'true';
  const items = Array.from(container.querySelectorAll('[data-rm-product-gallery-item]'));
  const more = container.querySelector('.rm-product-gallery__more');
  const toggle = container.querySelector('[data-rm-product-gallery-toggle]');
  const hasHiddenItems = limit > 0 && items.length > limit;
  items.forEach((item, index) => {
    item.hidden = hasHiddenItems && !expanded && index >= limit;
  });
  if (!toggle) return;
  const hideToggle = !hasHiddenItems || expanded && container.dataset.collapse !== 'true';
  if (more) more.hidden = hideToggle;
  toggle.hidden = hideToggle;
  toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  toggle.textContent = expanded ? container.dataset.showLessLabel || 'Show less' : container.dataset.showMoreLabel || 'Show more';
};
const initProductGalleryGrid = container => {
  if (container.dataset.rmProductGalleryGridReady === 'true') return;
  container.dataset.rmProductGalleryGridReady = 'true';
  const toggle = container.querySelector('[data-rm-product-gallery-toggle]');
  toggle?.addEventListener('click', () => {
    const expanded = container.dataset.expanded === 'true';
    container.dataset.expanded = expanded ? 'false' : 'true';
    updateProductGalleryGridVisibility(container);
  });
  updateProductGalleryGridVisibility(container);
};
const updateProductGalleryGrid = function (container) {
  let media = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const items = container.querySelector('.rm-product-gallery__items');
  if (!items) return;
  const more = items.querySelector('.rm-product-gallery__more');
  const itemTemplate = items.querySelector('[data-rm-product-gallery-item]');
  items.querySelectorAll('[data-rm-product-gallery-item]').forEach(item => item.remove());
  media.forEach((entry, index) => items.insertBefore(productGalleryItem(container, entry, index, itemTemplate), more));
  container.dataset.expanded = 'false';
  container.hidden = media.length === 0;
  updateProductGalleryGridVisibility(container);
  window.UIkit?.update?.(container);
};
const initGalleries = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('.rmslideshow')) {
    new YTDynamicsGallery().init(root);
  }
  root.querySelectorAll?.('.rmslideshow').forEach(element => {
    new YTDynamicsGallery().init(element);
  });
  if (root.matches?.('[data-rm-product-gallery-grid]')) initProductGalleryGrid(root);
  root.querySelectorAll?.('[data-rm-product-gallery-grid]').forEach(initProductGalleryGrid);
};
const destroyGalleries = root => {
  if (root.matches?.('.rmslideshow')) {
    root.rmGalleryDestroy?.();
  }
  root.querySelectorAll?.('.rmslideshow').forEach(element => element.rmGalleryDestroy?.());
};
const observeGalleries = () => {
  initGalleries();
  document.addEventListener('radicalmart:product-change', event => {
    const scope = event.target;
    const product = event.detail?.product;
    if (!scope?.querySelectorAll || !product) return;
    scope.querySelectorAll('[data-rm-product-gallery="true"]').forEach(gallery => {
      if (gallery.closest('[data-rm-product-scope]') === scope) {
        updateProductGallery(gallery, product.media || []);
      }
    });
    scope.querySelectorAll('[data-rm-product-gallery-grid][data-sync-product-media="true"]').forEach(gallery => {
      if (gallery.closest('[data-rm-product-scope]') === scope) {
        updateProductGalleryGrid(gallery, product.mediaAll || product.media || []);
      }
    });
  });
  new MutationObserver(records => {
    records.forEach(_ref => {
      let {
        addedNodes,
        removedNodes
      } = _ref;
      addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          initGalleries(node);
        }
      });
      removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          destroyGalleries(node);
        }
      });
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeGalleries, {
    once: true
  });
} else {
  observeGalleries();
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3pnQixJQUFJLENBQUM7UUFDdkI7TUFDSixDQUFDLENBQUM7TUFDRnFoQixZQUFZLENBQUM3d0IsT0FBTyxDQUFFd1AsSUFBSSxJQUFLO1FBQzNCLElBQUlBLElBQUksQ0FBQ3NoQixRQUFRLEtBQUtDLElBQUksQ0FBQ0MsWUFBWSxFQUFFO1VBQ3JDYixnQkFBZ0IsQ0FBQzNnQixJQUFJLENBQUM7UUFDMUI7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUMsQ0FBQzFXLE9BQU8sQ0FBQ3VCLFFBQVEsQ0FBQ0MsZUFBZSxFQUFFO0lBQUM0b0IsU0FBUyxFQUFFLElBQUk7SUFBRStOLE9BQU8sRUFBRTtFQUFJLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsSUFBSTUyQixRQUFRLENBQUM2MkIsVUFBVSxLQUFLLFNBQVMsRUFBRTtFQUNuQzcyQixRQUFRLENBQUNFLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFNjFCLGdCQUFnQixFQUFFO0lBQUNlLElBQUksRUFBRTtFQUFJLENBQUMsQ0FBQztBQUNqRixDQUFDLE1BQU07RUFDSGYsZ0JBQWdCLENBQUMsQ0FBQztBQUN0QixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9XaGVlbEdlc3R1cmVzUGx1Z2luLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvdXRpbHMvcHJvamVjdGlvbi50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvZXZlbnRzL0V2ZW50QnVzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvZXZlbnRzL1doZWVsVGFyZ2V0T2JzZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1ub3JtYWxpemVyL3doZWVsLW5vcm1hbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9vcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvd2hlZWwtZ2VzdHVyZXMvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy93aGVlbC1nZXN0dXJlcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvYnV0dG9ucy5lczYiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2dhbGxlcnkuc2NzcyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0F1dG9wbGF5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9BbGlnbm1lbnQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0V2ZW50U3RvcmUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FuaW1hdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0F4aXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0xpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9Db3VudGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRHJhZ1RyYWNrZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL05vZGVSZWN0cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGVyY2VudE9mVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUmVzaXplSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsQm9keS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsQm91bmRzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxDb250YWluLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMaW1pdC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsTG9vcGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxQcm9ncmVzcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsU25hcHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFRhcmdldC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVG8udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlRm9jdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1ZlY3RvcjFkLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9UcmFuc2xhdGUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlTG9vcGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TbGlkZXNIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TbGlkZXNJblZpZXcudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlU2l6ZXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc1RvU2Nyb2xsLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9FbmdpbmUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0V2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvT3B0aW9uc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1BsdWdpbnNIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9FbWJsYUNhcm91c2VsLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvZ2FsbGVyeS5lczYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JlYXRlT3B0aW9uc1R5cGUsIENyZWF0ZVBsdWdpblR5cGUsIEVtYmxhQ2Fyb3VzZWxUeXBlLCBPcHRpb25zSGFuZGxlclR5cGUgfSBmcm9tICdlbWJsYS1jYXJvdXNlbCdcbmltcG9ydCBXaGVlbEdlc3R1cmVzLCB7IFdoZWVsRXZlbnRTdGF0ZSB9IGZyb20gJ3doZWVsLWdlc3R1cmVzJ1xuXG5leHBvcnQgdHlwZSBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IENyZWF0ZU9wdGlvbnNUeXBlPHtcbiAgd2hlZWxEcmFnZ2luZ0NsYXNzOiBzdHJpbmdcbiAgZm9yY2VXaGVlbEF4aXM/OiAneCcgfCAneSdcbiAgdGFyZ2V0PzogRWxlbWVudFxufT5cblxudHlwZSBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSA9IENyZWF0ZVBsdWdpblR5cGU8e30sIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zPlxuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnMgPSB7XG4gIGFjdGl2ZTogdHJ1ZSxcbiAgYnJlYWtwb2ludHM6IHt9LFxuICB3aGVlbERyYWdnaW5nQ2xhc3M6ICdpcy13aGVlbC1kcmFnZ2luZycsXG4gIGZvcmNlV2hlZWxBeGlzOiB1bmRlZmluZWQsXG4gIHRhcmdldDogdW5kZWZpbmVkLFxufVxuXG5XaGVlbEdlc3R1cmVzUGx1Z2luLmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWQgYXMgV2hlZWxHZXN0dXJlc1BsdWdpblR5cGVbJ29wdGlvbnMnXSB8IHVuZGVmaW5lZFxuXG5jb25zdCBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuXG5leHBvcnQgZnVuY3Rpb24gV2hlZWxHZXN0dXJlc1BsdWdpbih1c2VyT3B0aW9uczogV2hlZWxHZXN0dXJlc1BsdWdpblR5cGVbJ29wdGlvbnMnXSA9IHt9KTogV2hlZWxHZXN0dXJlc1BsdWdpblR5cGUge1xuICBsZXQgb3B0aW9uczogV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnNcbiAgbGV0IGNsZWFudXAgPSAoKSA9PiB7fVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGE6IEVtYmxhQ2Fyb3VzZWxUeXBlLCBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlKSB7XG4gICAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhIH0gPSBvcHRpb25zSGFuZGxlclxuICAgIGNvbnN0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBXaGVlbEdlc3R1cmVzUGx1Z2luLmdsb2JhbE9wdGlvbnMpXG4gICAgY29uc3QgYWxsT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhvcHRpb25zQmFzZSwgdXNlck9wdGlvbnMpXG4gICAgb3B0aW9ucyA9IG9wdGlvbnNBdE1lZGlhKGFsbE9wdGlvbnMpXG5cbiAgICBjb25zdCBlbmdpbmUgPSBlbWJsYS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IG9wdGlvbnMudGFyZ2V0ID8/IChlbWJsYS5jb250YWluZXJOb2RlKCkucGFyZW50Tm9kZSBhcyBFbGVtZW50KVxuICAgIGNvbnN0IHdoZWVsQXhpcyA9IG9wdGlvbnMuZm9yY2VXaGVlbEF4aXMgPz8gZW5naW5lLm9wdGlvbnMuYXhpc1xuICAgIGNvbnN0IHdoZWVsR2VzdHVyZXMgPSBXaGVlbEdlc3R1cmVzKHtcbiAgICAgIHByZXZlbnRXaGVlbEFjdGlvbjogd2hlZWxBeGlzLFxuICAgICAgcmV2ZXJzZVNpZ246IFt0cnVlLCB0cnVlLCBmYWxzZV0sXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemVSZWxhdGVkVmFyaWFibGVzKCkge1xuICAgICAgc2Nyb2xsQm91bmRhcnlUaHJlc2hvbGQgPSAod2hlZWxBeGlzID09PSAneCcgPyBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aCA6IGVuZ2luZS5jb250YWluZXJSZWN0LmhlaWdodCkgLyAyXG4gICAgfVxuXG4gICAgY29uc3QgdW5vYnNlcnZlVGFyZ2V0Tm9kZSA9IHdoZWVsR2VzdHVyZXMub2JzZXJ2ZSh0YXJnZXROb2RlKVxuICAgIGNvbnN0IG9mZldoZWVsID0gd2hlZWxHZXN0dXJlcy5vbignd2hlZWwnLCBoYW5kbGVXaGVlbClcblxuICAgIGxldCBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgIGxldCBzdGFydEV2ZW50OiBNb3VzZUV2ZW50XG4gICAgbGV0IG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA9IDBcbiAgICBsZXQgc2Nyb2xsQm91bmRhcnlUaHJlc2hvbGQgPSAwXG4gICAgbGV0IGJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kID0gZmFsc2VcblxuICAgIHVwZGF0ZVNpemVSZWxhdGVkVmFyaWFibGVzKClcbiAgICBlbWJsYS5vbigncmVzaXplJywgdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMpXG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJywgc3RhdGUuZXZlbnQpXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gTGVnYWN5IEJyb3dzZXJzIGxpa2UgSUUgMTAgJiAxMSB3aWxsIHRocm93IHdoZW4gYXR0ZW1wdGluZyB0byBjcmVhdGUgdGhlIEV2ZW50XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0xlZ2FjeSBicm93c2VyIHJlcXVpcmVzIGV2ZW50cy1wb2x5ZmlsbCAoaHR0cHM6Ly9naXRodWIuY29tL3hpZWwvZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMjbGVnYWN5LWJyb3dzZXJzKSdcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFudXAoKVxuICAgICAgfVxuXG4gICAgICBpc1N0YXJ0ZWQgPSB0cnVlXG4gICAgICBvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gPSAwXG4gICAgICBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LmFkZChvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBpc1N0YXJ0ZWQgPSBmYWxzZVxuICAgICAgZGlzcGF0Y2hFdmVudChjcmVhdGVSZWxhdGl2ZU1vdXNlRXZlbnQoJ21vdXNldXAnLCBzdGF0ZSkpXG4gICAgICByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcblxuICAgICAgaWYgKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKSB7XG4gICAgICAgIHRhcmdldE5vZGUuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLndoZWVsRHJhZ2dpbmdDbGFzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIsIHRydWUpXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgIGlmIChpc1N0YXJ0ZWQgJiYgZS5pc1RydXN0ZWQpIHtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCh0eXBlOiAnbW91c2Vkb3duJyB8ICdtb3VzZW1vdmUnIHwgJ21vdXNldXAnLCBzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBsZXQgbW92ZVgsIG1vdmVZXG5cbiAgICAgIGlmICh3aGVlbEF4aXMgPT09IGVuZ2luZS5vcHRpb25zLmF4aXMpIHtcbiAgICAgICAgO1ttb3ZlWCwgbW92ZVldID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBlbWJsYXMgYXhpcyBhbmQgdGhlIHdoZWVsQXhpcyBkb24ndCBtYXRjaCwgc3dhcCB0aGUgYXhlcyB0byBtYXRjaCB0aGUgcmlnaHQgZW1ibGEgZXZlbnRzXG4gICAgICAgIDtbbW92ZVksIG1vdmVYXSA9IHN0YXRlLmF4aXNNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGlzQXRCb3VuZGFyeSB9ID0gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGUpXG5cbiAgICAgIC8vIEFwcGx5IHByb2dyZXNzaXZlIHJ1YmJlciBiYW5kIGRhbXBpbmcgd2hlbiBhdCBib3VuZGFyaWVzXG4gICAgICBpZiAoaXNBdEJvdW5kYXJ5KSB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBwcm9ncmVzc2l2ZSBkYW1waW5nIGZhY3RvciBiYXNlZCBvbiBob3cgZmFyIG92ZXIgYm91bmRhcnkgd2UgYXJlXG4gICAgICAgIGNvbnN0IHByb2dyZXNzUmF0aW8gPSBNYXRoLm1pbihvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gLyBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCwgMSlcbiAgICAgICAgY29uc3QgZGFtcGluZ0ZhY3RvciA9IDAuMjUgKyBwcm9ncmVzc1JhdGlvICogMC41XG4gICAgICAgIGNvbnN0IGNvdW50ZXJNb3ZlU2lnbiA9IG1vdmVYID4gMCA/IC0xIDogMVxuICAgICAgICBjb25zdCBjb3VudGVyTW92ZW1lbnQgPSBvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gKiBjb3VudGVyTW92ZVNpZ25cbiAgICAgICAgY29uc3QgZGFtcGluZ01vdmVtZW50ID0gY291bnRlck1vdmVtZW50ICogZGFtcGluZ0ZhY3RvclxuXG4gICAgICAgIG1vdmVYICs9IGRhbXBpbmdNb3ZlbWVudFxuICAgICAgICBtb3ZlWSArPSBkYW1waW5nTW92ZW1lbnRcbiAgICAgIH1cblxuICAgICAgLy8gcHJldmVudCBza2lwcGluZyBzbGlkZXNcbiAgICAgIGlmICghZW5naW5lLm9wdGlvbnMuc2tpcFNuYXBzICYmICFlbmdpbmUub3B0aW9ucy5kcmFnRnJlZSkge1xuICAgICAgICBjb25zdCBtYXhYID0gZW5naW5lLmNvbnRhaW5lclJlY3Qud2lkdGhcbiAgICAgICAgY29uc3QgbWF4WSA9IGVuZ2luZS5jb250YWluZXJSZWN0LmhlaWdodFxuXG4gICAgICAgIG1vdmVYID0gbW92ZVggPCAwID8gTWF0aC5tYXgobW92ZVgsIC1tYXhYKSA6IE1hdGgubWluKG1vdmVYLCBtYXhYKVxuICAgICAgICBtb3ZlWSA9IG1vdmVZIDwgMCA/IE1hdGgubWF4KG1vdmVZLCAtbWF4WSkgOiBNYXRoLm1pbihtb3ZlWSwgbWF4WSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNb3VzZUV2ZW50KHR5cGUsIHtcbiAgICAgICAgY2xpZW50WDogc3RhcnRFdmVudC5jbGllbnRYICsgbW92ZVgsXG4gICAgICAgIGNsaWVudFk6IHN0YXJ0RXZlbnQuY2xpZW50WSArIG1vdmVZLFxuICAgICAgICBzY3JlZW5YOiBzdGFydEV2ZW50LnNjcmVlblggKyBtb3ZlWCxcbiAgICAgICAgc2NyZWVuWTogc3RhcnRFdmVudC5zY3JlZW5ZICsgbW92ZVksXG4gICAgICAgIG1vdmVtZW50WDogbW92ZVgsXG4gICAgICAgIG1vdmVtZW50WTogbW92ZVksXG4gICAgICAgIGJ1dHRvbjogMCxcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgY29tcG9zZWQ6IHRydWUsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IFVJRXZlbnQpIHtcbiAgICAgIGVtYmxhLmNvbnRhaW5lck5vZGUoKS5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrSWZBdEJvdW5kYXJ5KHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVldLFxuICAgICAgfSA9IHN0YXRlXG4gICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IGVtYmxhLnNjcm9sbFByb2dyZXNzKClcbiAgICAgIGNvbnN0IGNhblNjcm9sbE5leHQgPSBzY3JvbGxQcm9ncmVzcyA8IDFcbiAgICAgIGNvbnN0IGNhblNjcm9sbFByZXYgPSBzY3JvbGxQcm9ncmVzcyA+IDBcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGEgPSB3aGVlbEF4aXMgPT09ICd4JyA/IGRlbHRhWCA6IGRlbHRhWVxuICAgICAgY29uc3QgaXNTY3JvbGxpbmdOZXh0ID0gcHJpbWFyeUF4aXNEZWx0YSA8IDBcbiAgICAgIGNvbnN0IGlzU2Nyb2xsaW5nUHJldiA9IHByaW1hcnlBeGlzRGVsdGEgPiAwXG4gICAgICBjb25zdCBpc0F0Qm91bmRhcnkgPSAoaXNTY3JvbGxpbmdOZXh0ICYmICFjYW5TY3JvbGxOZXh0KSB8fCAoaXNTY3JvbGxpbmdQcmV2ICYmICFjYW5TY3JvbGxQcmV2KVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc0F0Qm91bmRhcnksXG4gICAgICAgIHByaW1hcnlBeGlzRGVsdGEsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCb3VuZGFyeVRocmVzaG9sZFJlYWNoZWQoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3QgeyBpc0F0Qm91bmRhcnksIHByaW1hcnlBeGlzRGVsdGEgfSA9IGNoZWNrSWZBdEJvdW5kYXJ5KHN0YXRlKVxuXG4gICAgICBpZiAoaXNBdEJvdW5kYXJ5ICYmICFzdGF0ZS5pc01vbWVudHVtKSB7XG4gICAgICAgIG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiArPSBNYXRoLmFicyhwcmltYXJ5QXhpc0RlbHRhKVxuXG4gICAgICAgIC8vIEVuZCBnZXN0dXJlIGlmIHdlIGV4Y2VlZCB0aGUgdGhyZXNob2xkXG4gICAgICAgIGlmIChvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gPiBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCkge1xuICAgICAgICAgIGJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kID0gdHJ1ZVxuICAgICAgICAgIHdoZWVsR2VzdHVyZUVuZGVkKHN0YXRlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlc2V0IGFjY3VtdWxhdGlvbiB3aGVuIHdlIGNhbiBzY3JvbGwgb3Igd2hlbiBub3QgYXQgYm91bmRhcnlcbiAgICAgICAgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uID0gMFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVXaGVlbChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGF4aXNEZWx0YTogW2RlbHRhWCwgZGVsdGFZXSxcbiAgICAgIH0gPSBzdGF0ZVxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YSA9IHdoZWVsQXhpcyA9PT0gJ3gnID8gZGVsdGFYIDogZGVsdGFZXG4gICAgICBjb25zdCBjcm9zc0F4aXNEZWx0YSA9IHdoZWVsQXhpcyA9PT0gJ3gnID8gZGVsdGFZIDogZGVsdGFYXG4gICAgICBjb25zdCBpc1JlbGVhc2UgPSBzdGF0ZS5pc01vbWVudHVtICYmIHN0YXRlLnByZXZpb3VzICYmICFzdGF0ZS5wcmV2aW91cy5pc01vbWVudHVtXG4gICAgICBjb25zdCBpc0VuZGluZ09yUmVsZWFzZSA9IChzdGF0ZS5pc0VuZGluZyAmJiAhc3RhdGUuaXNNb21lbnR1bSkgfHwgaXNSZWxlYXNlXG4gICAgICBjb25zdCBwcmltYXJ5QXhpc0RlbHRhSXNEb21pbmFudCA9IE1hdGguYWJzKHByaW1hcnlBeGlzRGVsdGEpID4gTWF0aC5hYnMoY3Jvc3NBeGlzRGVsdGEpXG5cbiAgICAgIGlmIChwcmltYXJ5QXhpc0RlbHRhSXNEb21pbmFudCAmJiAhaXNTdGFydGVkICYmICFzdGF0ZS5pc01vbWVudHVtICYmICFibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCkge1xuICAgICAgICB3aGVlbEdlc3R1cmVTdGFydGVkKHN0YXRlKVxuICAgICAgfVxuXG4gICAgICBpZiAoYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgJiYgc3RhdGUuaXNFbmRpbmcpIHtcbiAgICAgICAgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzU3RhcnRlZCkgcmV0dXJuXG5cbiAgICAgIGlmIChpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZChzdGF0ZSkpIHJldHVyblxuXG4gICAgICBpZiAoaXNFbmRpbmdPclJlbGVhc2UpIHtcbiAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2Vtb3ZlJywgc3RhdGUpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICB1bm9ic2VydmVUYXJnZXROb2RlKClcbiAgICAgIG9mZldoZWVsKClcbiAgICAgIGVtYmxhLm9mZigncmVzaXplJywgdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMpXG4gICAgICByZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZWxmOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSA9IHtcbiAgICBuYW1lOiAnd2hlZWxHZXN0dXJlcycsXG4gICAgb3B0aW9uczogdXNlck9wdGlvbnMsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95OiAoKSA9PiBjbGVhbnVwKCksXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ2VtYmxhLWNhcm91c2VsJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICB3aGVlbEdlc3R1cmVzPzogV2hlZWxHZXN0dXJlc1BsdWdpblR5cGVcbiAgfVxufVxuIiwiY29uc3QgREVDQVkgPSAwLjk5NlxuXG4vKipcbiAqIG1vdmVtZW50IHByb2plY3Rpb24gYmFzZWQgb24gdmVsb2NpdHlcbiAqIEBwYXJhbSB2ZWxvY2l0eVB4TXNcbiAqIEBwYXJhbSBkZWNheVxuICovXG5leHBvcnQgY29uc3QgcHJvamVjdGlvbiA9ICh2ZWxvY2l0eVB4TXM6IG51bWJlciwgZGVjYXkgPSBERUNBWSkgPT4gKHZlbG9jaXR5UHhNcyAqIGRlY2F5KSAvICgxIC0gZGVjYXkpXG4iLCJleHBvcnQgKiBmcm9tICcuL3Byb2plY3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0T2Y8VD4oYXJyYXk6IFRbXSkge1xuICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF2ZXJhZ2UobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIG51bWJlcnMucmVkdWNlKChhLCBiKSA9PiBhICsgYikgLyBudW1iZXJzLmxlbmd0aFxufVxuXG5leHBvcnQgY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihNYXRoLm1heChtaW4sIHZhbHVlKSwgbWF4KVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVmVjdG9yczxUIGV4dGVuZHMgbnVtYmVyW10+KHYxOiBULCB2MjogVCk6IFQge1xuICBpZiAodjEubGVuZ3RoICE9PSB2Mi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlY3RvcnMgbXVzdCBiZSBzYW1lIGxlbmd0aCcpXG4gIH1cbiAgcmV0dXJuIHYxLm1hcCgodmFsLCBpKSA9PiB2YWwgKyB2MltpXSkgYXMgVFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWJzTWF4KG51bWJlcnM6IG51bWJlcltdKSB7XG4gIHJldHVybiBNYXRoLm1heCguLi5udW1iZXJzLm1hcChNYXRoLmFicykpXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZGVlcEZyZWV6ZTxUIGV4dGVuZHMgb2JqZWN0PihvOiBUKTogUmVhZG9ubHk8VD4ge1xuICBPYmplY3QuZnJlZXplKG8pXG4gIE9iamVjdC52YWx1ZXMobykuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhT2JqZWN0LmlzRnJvemVuKHZhbHVlKSkge1xuICAgICAgZGVlcEZyZWV6ZSh2YWx1ZSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBvXG59XG4iLCJpbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEV2ZW50TWFwRW1wdHkgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lcjxEID0gdW5rbm93bj4gPSAoZGF0YTogRCkgPT4gdm9pZFxuZXhwb3J0IHR5cGUgT2ZmID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudEJ1czxFdmVudE1hcCA9IEV2ZW50TWFwRW1wdHk+KCkge1xuICBjb25zdCBsaXN0ZW5lcnMgPSB7fSBhcyBSZWNvcmQ8a2V5b2YgRXZlbnRNYXAsIEV2ZW50TGlzdGVuZXI8bmV2ZXI+W10+XG5cbiAgZnVuY3Rpb24gb248RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pOiBPZmYge1xuICAgIGxpc3RlbmVyc1t0eXBlXSA9IChsaXN0ZW5lcnNbdHlwZV0gfHwgW10pLmNvbmNhdChsaXN0ZW5lcilcbiAgICByZXR1cm4gKCkgPT4gb2ZmKHR5cGUsIGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+KSB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuZmlsdGVyKChsKSA9PiBsICE9PSBsaXN0ZW5lcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BhdGNoPEVLIGV4dGVuZHMga2V5b2YgRXZlbnRNYXA+KHR5cGU6IEVLLCBkYXRhOiBFdmVudE1hcFtFS10pIHtcbiAgICBpZiAoISh0eXBlIGluIGxpc3RlbmVycykpIHJldHVyblxuICAgIDsobGlzdGVuZXJzW3R5cGVdIGFzIEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPltdKS5mb3JFYWNoKChsKSA9PiBsKGRhdGEpKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBkaXNwYXRjaCxcbiAgfSlcbn1cbiIsImltcG9ydCB7IFdoZWVsRXZlbnREYXRhIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbnR5cGUgVW5vYnNlcnZlVGFyZ2V0ID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgZnVuY3Rpb24gV2hlZWxUYXJnZXRPYnNlcnZlcihldmVudExpc3RlbmVyOiAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHZvaWQpIHtcbiAgbGV0IHRhcmdldHM6IEV2ZW50VGFyZ2V0W10gPSBbXVxuXG4gIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byB0YXJnZXQgZWxlbWVudFxuICBjb25zdCBvYnNlcnZlID0gKHRhcmdldDogRXZlbnRUYXJnZXQpOiBVbm9ic2VydmVUYXJnZXQgPT4ge1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lciwgeyBwYXNzaXZlOiBmYWxzZSB9KVxuICAgIHRhcmdldHMucHVzaCh0YXJnZXQpXG5cbiAgICByZXR1cm4gKCkgPT4gdW5vYnNlcnZlKHRhcmdldClcbiAgfVxuXG4gIC8vLyByZW1vdmUgZXZlbnQgbGlzdGVuZXIgZnJvbSB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB1bm9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCkgPT4ge1xuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGV2ZW50TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcilcbiAgICB0YXJnZXRzID0gdGFyZ2V0cy5maWx0ZXIoKHQpID0+IHQgIT09IHRhcmdldClcbiAgfVxuXG4gIC8vIHN0b3BzIHdhdGNoaW5nIGFsbCBvZiBpdHMgdGFyZ2V0IGVsZW1lbnRzIGZvciB2aXNpYmlsaXR5IGNoYW5nZXMuXG4gIGNvbnN0IGRpc2Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgdGFyZ2V0cy5mb3JFYWNoKHVub2JzZXJ2ZSlcbiAgfVxuXG4gIHJldHVybiBkZWVwRnJlZXplKHtcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICB9KVxufVxuIiwiaW1wb3J0IHsgUmV2ZXJzZVNpZ24sIFZlY3RvclhZWiwgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplZFdoZWVsIHtcbiAgYXhpc0RlbHRhOiBWZWN0b3JYWVpcbiAgdGltZVN0YW1wOiBudW1iZXJcbn1cblxuY29uc3QgTElORV9IRUlHSFQgPSAxNiAqIDEuMTI1XG5jb25zdCBQQUdFX0hFSUdIVCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuaW5uZXJIZWlnaHQpIHx8IDgwMFxuY29uc3QgREVMVEFfTU9ERV9VTklUID0gWzEsIExJTkVfSEVJR0hULCBQQUdFX0hFSUdIVF1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoZWVsKGU6IFdoZWVsRXZlbnREYXRhKTogTm9ybWFsaXplZFdoZWVsIHtcbiAgY29uc3QgZGVsdGFYID0gZS5kZWx0YVggKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWSA9IGUuZGVsdGFZICogREVMVEFfTU9ERV9VTklUW2UuZGVsdGFNb2RlXVxuICBjb25zdCBkZWx0YVogPSAoZS5kZWx0YVogfHwgMCkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG5cbiAgcmV0dXJuIHtcbiAgICB0aW1lU3RhbXA6IGUudGltZVN0YW1wLFxuICAgIGF4aXNEZWx0YTogW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdLFxuICB9XG59XG5cbmNvbnN0IHJldmVyc2VBbGwgPSBbLTEsIC0xLCAtMV1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VBeGlzRGVsdGFTaWduPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+PihcbiAgd2hlZWw6IFQsXG4gIHJldmVyc2VTaWduOiBSZXZlcnNlU2lnblxuKTogVCB7XG4gIGlmICghcmV2ZXJzZVNpZ24pIHtcbiAgICByZXR1cm4gd2hlZWxcbiAgfVxuXG4gIGNvbnN0IG11bHRpcGxpZXJzID0gcmV2ZXJzZVNpZ24gPT09IHRydWUgPyByZXZlcnNlQWxsIDogcmV2ZXJzZVNpZ24ubWFwKChzaG91bGRSZXZlcnNlKSA9PiAoc2hvdWxkUmV2ZXJzZSA/IC0xIDogMSkpXG5cbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhLCBpKSA9PiBkZWx0YSAqIG11bHRpcGxpZXJzW2ldKSxcbiAgfVxufVxuXG5jb25zdCBERUxUQV9NQVhfQUJTID0gNzAwXG5cbmV4cG9ydCBjb25zdCBjbGFtcEF4aXNEZWx0YSA9IDxUIGV4dGVuZHMgUGljazxOb3JtYWxpemVkV2hlZWwsICdheGlzRGVsdGEnPj4od2hlZWw6IFQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi53aGVlbCxcbiAgICBheGlzRGVsdGE6IHdoZWVsLmF4aXNEZWx0YS5tYXAoKGRlbHRhKSA9PiBjbGFtcChkZWx0YSwgLURFTFRBX01BWF9BQlMsIERFTFRBX01BWF9BQlMpKSxcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5leHBvcnQgY29uc3QgQUNDX0ZBQ1RPUl9NSU4gPSAwLjZcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01BWCA9IDAuOTZcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19NRVJHRSA9IDJcbmV4cG9ydCBjb25zdCBXSEVFTEVWRU5UU19UT19BTkFMQVpFID0gNVxuIiwiaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0NvbmZpZyB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgZGVlcEZyZWV6ZSB9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY29uZmlnRGVmYXVsdHM6IFdoZWVsR2VzdHVyZXNDb25maWcgPSBkZWVwRnJlZXplKHtcbiAgcHJldmVudFdoZWVsQWN0aW9uOiB0cnVlLFxuICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbn0pXG4iLCIvKipcbiAqIHRoZSB0aW1lb3V0IGlzIGF1dG9tYXRpY2FsbHkgYWRqdXN0ZWQgZHVyaW5nIGEgZ2VzdHVyZVxuICogdGhlIGluaXRpYWwgdGltZW91dCBwZXJpb2QgaXMgcHJldHR5IGxvbmcsIHNvIGV2ZW4gb2xkIG1vdXNlcywgd2hpY2ggZW1pdCB3aGVlbCBldmVudHMgbGVzcyBvZnRlbiwgY2FuIHByb2R1Y2UgYSBjb250aW51b3VzIGdlc3R1cmVcbiAqL1xuaW1wb3J0IHsgV2hlZWxHZXN0dXJlc0ludGVybmFsU3RhdGUgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJ1xuXG5jb25zdCBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQgPSA0MDBcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpOiBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB7XG4gIHJldHVybiB7XG4gICAgaXNTdGFydGVkOiBmYWxzZSxcbiAgICBpc1N0YXJ0UHVibGlzaGVkOiBmYWxzZSxcbiAgICBpc01vbWVudHVtOiBmYWxzZSxcbiAgICBzdGFydFRpbWU6IDAsXG4gICAgbGFzdEFic0RlbHRhOiBJbmZpbml0eSxcbiAgICBheGlzTW92ZW1lbnQ6IFswLCAwLCAwXSxcbiAgICBheGlzVmVsb2NpdHk6IFswLCAwLCAwXSxcbiAgICBhY2NlbGVyYXRpb25GYWN0b3JzOiBbXSxcbiAgICBzY3JvbGxQb2ludHM6IFtdLFxuICAgIHNjcm9sbFBvaW50c1RvTWVyZ2U6IFtdLFxuICAgIHdpbGxFbmRUaW1lb3V0OiBXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQsXG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEJ1cyBmcm9tICcuLi9ldmVudHMvRXZlbnRCdXMnXG5pbXBvcnQgeyBXaGVlbFRhcmdldE9ic2VydmVyIH0gZnJvbSAnLi4vZXZlbnRzL1doZWVsVGFyZ2V0T2JzZXJ2ZXInXG5pbXBvcnQge1xuICBWZWN0b3JYWVosXG4gIFdoZWVsRXZlbnREYXRhLFxuICBXaGVlbEV2ZW50U3RhdGUsXG4gIFdoZWVsR2VzdHVyZXNDb25maWcsXG4gIFdoZWVsR2VzdHVyZXNFdmVudE1hcCxcbiAgV2hlZWxHZXN0dXJlc09wdGlvbnMsXG59IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgYWJzTWF4LCBhZGRWZWN0b3JzLCBhdmVyYWdlLCBkZWVwRnJlZXplLCBsYXN0T2YsIHByb2plY3Rpb24gfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGNsYW1wQXhpc0RlbHRhLCBub3JtYWxpemVXaGVlbCwgcmV2ZXJzZUF4aXNEZWx0YVNpZ24gfSBmcm9tICcuLi93aGVlbC1ub3JtYWxpemVyL3doZWVsLW5vcm1hbGl6ZXInXG5pbXBvcnQgeyBfX0RFVl9fLCBBQ0NfRkFDVE9SX01BWCwgQUNDX0ZBQ1RPUl9NSU4sIFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUsIFdIRUVMRVZFTlRTX1RPX01FUkdFIH0gZnJvbSAnLi9jb25zdGFudHMnXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0cyB9IGZyb20gJy4vb3B0aW9ucydcbmltcG9ydCB7IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSB9IGZyb20gJy4vc3RhdGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzKG9wdGlvbnNQYXJhbTogV2hlZWxHZXN0dXJlc09wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IG9uLCBvZmYsIGRpc3BhdGNoIH0gPSBFdmVudEJ1czxXaGVlbEdlc3R1cmVzRXZlbnRNYXA+KClcbiAgbGV0IGNvbmZpZyA9IGNvbmZpZ0RlZmF1bHRzXG4gIGxldCBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gIGxldCBjdXJyZW50RXZlbnQ6IFdoZWVsRXZlbnREYXRhXG4gIGxldCBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG4gIGxldCBwcmV2V2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgfCB1bmRlZmluZWRcblxuICBjb25zdCBmZWVkV2hlZWwgPSAod2hlZWxFdmVudHM6IFdoZWVsRXZlbnREYXRhIHwgV2hlZWxFdmVudERhdGFbXSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHdoZWVsRXZlbnRzKSkge1xuICAgICAgd2hlZWxFdmVudHMuZm9yRWFjaCgod2hlZWxFdmVudCkgPT4gcHJvY2Vzc1doZWVsRXZlbnREYXRhKHdoZWVsRXZlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlT3B0aW9ucyA9IChuZXdPcHRpb25zOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KTogV2hlZWxHZXN0dXJlc0NvbmZpZyA9PiB7XG4gICAgaWYgKE9iamVjdC52YWx1ZXMobmV3T3B0aW9ucykuc29tZSgob3B0aW9uKSA9PiBvcHRpb24gPT09IHVuZGVmaW5lZCB8fCBvcHRpb24gPT09IG51bGwpKSB7XG4gICAgICBfX0RFVl9fICYmIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZU9wdGlvbnMgaWdub3JlZCEgdW5kZWZpbmVkICYgbnVsbCBvcHRpb25zIG5vdCBhbGxvd2VkJylcbiAgICAgIHJldHVybiBjb25maWdcbiAgICB9XG4gICAgcmV0dXJuIChjb25maWcgPSBkZWVwRnJlZXplKHsgLi4uY29uZmlnRGVmYXVsdHMsIC4uLmNvbmZpZywgLi4ubmV3T3B0aW9ucyB9KSlcbiAgfVxuXG4gIGNvbnN0IHB1Ymxpc2hXaGVlbCA9IChhZGRpdGlvbmFsRGF0YT86IFBhcnRpYWw8V2hlZWxFdmVudFN0YXRlPikgPT4ge1xuICAgIGNvbnN0IHdoZWVsRXZlbnRTdGF0ZTogV2hlZWxFdmVudFN0YXRlID0ge1xuICAgICAgZXZlbnQ6IGN1cnJlbnRFdmVudCxcbiAgICAgIGlzU3RhcnQ6IGZhbHNlLFxuICAgICAgaXNFbmRpbmc6IGZhbHNlLFxuICAgICAgaXNNb21lbnR1bUNhbmNlbDogZmFsc2UsXG4gICAgICBpc01vbWVudHVtOiBzdGF0ZS5pc01vbWVudHVtLFxuICAgICAgYXhpc0RlbHRhOiBbMCwgMCwgMF0sXG4gICAgICBheGlzVmVsb2NpdHk6IHN0YXRlLmF4aXNWZWxvY2l0eSxcbiAgICAgIGF4aXNNb3ZlbWVudDogc3RhdGUuYXhpc01vdmVtZW50LFxuICAgICAgZ2V0IGF4aXNNb3ZlbWVudFByb2plY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRWZWN0b3JzKFxuICAgICAgICAgIHdoZWVsRXZlbnRTdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNWZWxvY2l0eS5tYXAoKHZlbG9jaXR5KSA9PiBwcm9qZWN0aW9uKHZlbG9jaXR5KSkgYXMgVmVjdG9yWFlaXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICAuLi5hZGRpdGlvbmFsRGF0YSxcbiAgICB9XG5cbiAgICBkaXNwYXRjaCgnd2hlZWwnLCB7XG4gICAgICAuLi53aGVlbEV2ZW50U3RhdGUsXG4gICAgICBwcmV2aW91czogcHJldldoZWVsRXZlbnRTdGF0ZSxcbiAgICB9KVxuXG4gICAgLy8ga2VlcCByZWZlcmVuY2Ugd2l0aG91dCBwcmV2aW91cywgb3RoZXJ3aXNlIHdlIHdvdWxkIGNyZWF0ZSBhIGxvbmcgY2hhaW5cbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gd2hlZWxFdmVudFN0YXRlXG4gIH1cblxuICAvLyBzaG91bGQgcHJldmVudCB3aGVuIHRoZXJlIGlzIG1haW5seSBtb3ZlbWVudCBvbiB0aGUgZGVzaXJlZCBheGlzXG4gIGNvbnN0IHNob3VsZFByZXZlbnREZWZhdWx0ID0gKGRlbHRhTWF4QWJzOiBudW1iZXIsIGF4aXNEZWx0YTogVmVjdG9yWFlaKTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgeyBwcmV2ZW50V2hlZWxBY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IFtkZWx0YVgsIGRlbHRhWSwgZGVsdGFaXSA9IGF4aXNEZWx0YVxuXG4gICAgaWYgKHR5cGVvZiBwcmV2ZW50V2hlZWxBY3Rpb24gPT09ICdib29sZWFuJykgcmV0dXJuIHByZXZlbnRXaGVlbEFjdGlvblxuXG4gICAgc3dpdGNoIChwcmV2ZW50V2hlZWxBY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3gnOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFYKSA+PSBkZWx0YU1heEFic1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVkpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWikgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBwcmV2ZW50V2hlZWxBY3Rpb24gdmFsdWU6ICcgKyBwcmV2ZW50V2hlZWxBY3Rpb24sICd3YXJuJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvY2Vzc1doZWVsRXZlbnREYXRhID0gKHdoZWVsRXZlbnQ6IFdoZWVsRXZlbnREYXRhKSA9PiB7XG4gICAgY29uc3QgeyBheGlzRGVsdGEsIHRpbWVTdGFtcCB9ID0gY2xhbXBBeGlzRGVsdGEoXG4gICAgICByZXZlcnNlQXhpc0RlbHRhU2lnbihub3JtYWxpemVXaGVlbCh3aGVlbEV2ZW50KSwgY29uZmlnLnJldmVyc2VTaWduKVxuICAgIClcbiAgICBjb25zdCBkZWx0YU1heEFicyA9IGFic01heChheGlzRGVsdGEpXG5cbiAgICBpZiAod2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCAmJiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YU1heEFicywgYXhpc0RlbHRhKSkge1xuICAgICAgd2hlZWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZS5pc1N0YXJ0ZWQpIHtcbiAgICAgIHN0YXJ0KClcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdXNlciBzdGFydGVkIHNjcm9sbGluZyBhZ2FpbiAtPiBjYW5jZWxcbiAgICBlbHNlIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGRlbHRhTWF4QWJzID4gTWF0aC5tYXgoMiwgc3RhdGUubGFzdEFic0RlbHRhICogMikpIHtcbiAgICAgIGVuZCh0cnVlKVxuICAgICAgc3RhcnQoKVxuICAgIH1cblxuICAgIC8vIHNwZWNpYWwgZmluZ2VyIHVwIGV2ZW50IG9uIHdpbmRvd3MgKyBibGlua1xuICAgIGlmIChkZWx0YU1heEFicyA9PT0gMCAmJiBPYmplY3QuaXMgJiYgT2JqZWN0LmlzKHdoZWVsRXZlbnQuZGVsdGFYLCAtMCkpIHtcbiAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gdHJ1ZVxuICAgICAgLy8gcmV0dXJuIC0+IHplcm8gZGVsdGEgZXZlbnQgc2hvdWxkIG5vdCBpbmZsdWVuY2UgdmVsb2NpdHlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGN1cnJlbnRFdmVudCA9IHdoZWVsRXZlbnRcbiAgICBzdGF0ZS5heGlzTW92ZW1lbnQgPSBhZGRWZWN0b3JzKHN0YXRlLmF4aXNNb3ZlbWVudCwgYXhpc0RlbHRhKVxuICAgIHN0YXRlLmxhc3RBYnNEZWx0YSA9IGRlbHRhTWF4QWJzXG4gICAgc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5wdXNoKHtcbiAgICAgIGF4aXNEZWx0YSxcbiAgICAgIHRpbWVTdGFtcCxcbiAgICB9KVxuXG4gICAgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkoKVxuXG4gICAgLy8gb25seSB3aGVlbCBldmVudCAobW92ZSkgYW5kIG5vdCBzdGFydC9lbmQgZ2V0IHRoZSBkZWx0YSB2YWx1ZXNcbiAgICBwdWJsaXNoV2hlZWwoeyBheGlzRGVsdGEsIGlzU3RhcnQ6ICFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkIH0pIC8vIHN0YXRlLmlzTW9tZW50dW0gPyBNT01FTlRVTV9XSEVFTCA6IFdIRUVMLCB7IGF4aXNEZWx0YSB9KVxuXG4gICAgLy8gcHVibGlzaCBzdGFydCBhZnRlciB2ZWxvY2l0eSBldGMuIGhhdmUgYmVlbiB1cGRhdGVkXG4gICAgc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCA9IHRydWVcblxuICAgIC8vIGNhbGMgZGVib3VuY2VkIGVuZCBmdW5jdGlvbiwgdG8gcmVjb2duaXplIGVuZCBvZiB3aGVlbCBldmVudCBzdHJlYW1cbiAgICB3aWxsRW5kKClcbiAgfVxuXG4gIGNvbnN0IG1lcmdlU2Nyb2xsUG9pbnRzQ2FsY1ZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIGlmIChzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9PT0gV0hFRUxFVkVOVFNfVE9fTUVSR0UpIHtcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy51bnNoaWZ0KHtcbiAgICAgICAgYXhpc0RlbHRhU3VtOiBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLm1hcCgoYikgPT4gYi5heGlzRGVsdGEpLnJlZHVjZShhZGRWZWN0b3JzKSxcbiAgICAgICAgdGltZVN0YW1wOiBhdmVyYWdlKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLnRpbWVTdGFtcCkpLFxuICAgICAgfSlcblxuICAgICAgLy8gb25seSB1cGRhdGUgdmVsb2NpdHkgYWZ0ZXIgYSBtZXJnZWQgc2Nyb2xscG9pbnQgd2FzIGdlbmVyYXRlZFxuICAgICAgdXBkYXRlVmVsb2NpdHkoKVxuXG4gICAgICAvLyByZXNldCB0b01lcmdlIGFycmF5XG4gICAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLmxlbmd0aCA9IDBcblxuICAgICAgLy8gYWZ0ZXIgY2FsY3VsYXRpb24gb2YgdmVsb2NpdHkgb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBtZXJnZWQgc2Nyb2xsUG9pbnRcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50cy5sZW5ndGggPSAxXG5cbiAgICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgICBkZXRlY3RNb21lbnR1bSgpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghc3RhdGUuaXNTdGFydFB1Ymxpc2hlZCkge1xuICAgICAgdXBkYXRlU3RhcnRWZWxvY2l0eSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgdXBkYXRlU3RhcnRWZWxvY2l0eSA9ICgpID0+IHtcbiAgICBzdGF0ZS5heGlzVmVsb2NpdHkgPSBsYXN0T2Yoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZSkuYXhpc0RlbHRhLm1hcCgoZCkgPT4gZCAvIHN0YXRlLndpbGxFbmRUaW1lb3V0KSBhcyBWZWN0b3JYWVpcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIC8vIG5lZWQgdG8gaGF2ZSB0d28gcmVjZW50IHBvaW50cyB0byBjYWxjIHZlbG9jaXR5XG4gICAgY29uc3QgW2xhdGVzdFNjcm9sbFBvaW50LCBwcmV2U2Nyb2xsUG9pbnRdID0gc3RhdGUuc2Nyb2xsUG9pbnRzXG5cbiAgICBpZiAoIXByZXZTY3JvbGxQb2ludCB8fCAhbGF0ZXN0U2Nyb2xsUG9pbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHRpbWUgZGVsdGFcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBsYXRlc3RTY3JvbGxQb2ludC50aW1lU3RhbXAgLSBwcmV2U2Nyb2xsUG9pbnQudGltZVN0YW1wXG5cbiAgICBpZiAoZGVsdGFUaW1lIDw9IDApIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS53YXJuKCdpbnZhbGlkIGRlbHRhVGltZScpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjYWxjIHRoZSB2ZWxvY2l0eSBwZXIgYXhlc1xuICAgIGNvbnN0IHZlbG9jaXR5ID0gbGF0ZXN0U2Nyb2xsUG9pbnQuYXhpc0RlbHRhU3VtLm1hcCgoZCkgPT4gZCAvIGRlbHRhVGltZSkgYXMgVmVjdG9yWFlaXG5cbiAgICAvLyBjYWxjIHRoZSBhY2NlbGVyYXRpb24gZmFjdG9yIHBlciBheGlzXG4gICAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9yID0gdmVsb2NpdHkubWFwKCh2LCBpKSA9PiB2IC8gKHN0YXRlLmF4aXNWZWxvY2l0eVtpXSB8fCAxKSlcblxuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IHZlbG9jaXR5XG4gICAgc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5wdXNoKGFjY2VsZXJhdGlvbkZhY3RvcilcblxuICAgIHVwZGF0ZVdpbGxFbmRUaW1lb3V0KGRlbHRhVGltZSlcbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVdpbGxFbmRUaW1lb3V0ID0gKGRlbHRhVGltZTogbnVtYmVyKSA9PiB7XG4gICAgLy8gdXNlIGN1cnJlbnQgdGltZSBiZXR3ZWVuIGV2ZW50cyByb3VuZGVkIHVwIGFuZCBpbmNyZWFzZWQgYnkgYSBiaXQgYXMgdGltZW91dFxuICAgIGxldCBuZXdUaW1lb3V0ID0gTWF0aC5jZWlsKGRlbHRhVGltZSAvIDEwKSAqIDEwICogMS4yXG5cbiAgICAvLyBkb3VibGUgdGhlIHRpbWVvdXQsIHdoZW4gbW9tZW50dW0gd2FzIG5vdCBkZXRlY3RlZCB5ZXRcbiAgICBpZiAoIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgIG5ld1RpbWVvdXQgPSBNYXRoLm1heCgxMDAsIG5ld1RpbWVvdXQgKiAyKVxuICAgIH1cblxuICAgIHN0YXRlLndpbGxFbmRUaW1lb3V0ID0gTWF0aC5taW4oMTAwMCwgTWF0aC5yb3VuZChuZXdUaW1lb3V0KSlcbiAgfVxuXG4gIGNvbnN0IGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSA9IChhY2NGYWN0b3I6IG51bWJlcikgPT4ge1xuICAgIC8vIHdoZW4gbWFpbiBheGlzIGlzIHRoZSB0aGUgb3RoZXIgb25lIGFuZCB0aGVyZSBpcyBubyBtb3ZlbWVudC9jaGFuZ2Ugb24gdGhlIGN1cnJlbnQgb25lXG4gICAgaWYgKGFjY0ZhY3RvciA9PT0gMCkgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gYWNjRmFjdG9yIDw9IEFDQ19GQUNUT1JfTUFYICYmIGFjY0ZhY3RvciA+PSBBQ0NfRkFDVE9SX01JTlxuICB9XG5cbiAgY29uc3QgZGV0ZWN0TW9tZW50dW0gPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMubGVuZ3RoID49IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUpIHtcbiAgICAgIGlmIChuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCkge1xuICAgICAgICBuZWdhdGl2ZVplcm9GaW5nZXJVcFNwZWNpYWxFdmVudCA9IGZhbHNlXG5cbiAgICAgICAgaWYgKGFic01heChzdGF0ZS5heGlzVmVsb2NpdHkpID49IDAuMikge1xuICAgICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9ycyA9IHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMuc2xpY2UoV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSAqIC0xKVxuXG4gICAgICAvLyBjaGVjayByZWNlbnQgYWNjZWxlcmF0aW9uIC8gZGVjZWxlcmF0aW9uIGZhY3RvcnNcbiAgICAgIC8vIGFsbCByZWNlbnQgbmVlZCB0byBtYXRjaCwgaWYgYW55IGRpZCBub3QgbWF0Y2hcbiAgICAgIGNvbnN0IGRldGVjdGVkTW9tZW50dW0gPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzLmV2ZXJ5KChhY2NGYWMpID0+IHtcbiAgICAgICAgLy8gd2hlbiBib3RoIGF4aXMgZGVjZWxlcmF0ZSBleGFjdGx5IGluIHRoZSBzYW1lIHJhdGUgaXQgaXMgdmVyeSBsaWtlbHkgY2F1c2VkIGJ5IG1vbWVudHVtXG4gICAgICAgIGNvbnN0IHNhbWVBY2NGYWMgPSAhIWFjY0ZhYy5yZWR1Y2UoKGYxLCBmMikgPT4gKGYxICYmIGYxIDwgMSAmJiBmMSA9PT0gZjIgPyAxIDogMCkpXG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYWNjZWxlcmF0aW9uIGZhY3RvciBpcyB3aXRoaW4gbW9tZW50dW0gcmFuZ2VcbiAgICAgICAgY29uc3QgYm90aEFyZUluUmFuZ2VPclplcm8gPSBhY2NGYWMuZmlsdGVyKGFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSkubGVuZ3RoID09PSBhY2NGYWMubGVuZ3RoXG5cbiAgICAgICAgLy8gb25lIHRoZSByZXF1aXJlbWVudHMgbXVzdCBiZSBmdWxmaWxsZWRcbiAgICAgICAgcmV0dXJuIHNhbWVBY2NGYWMgfHwgYm90aEFyZUluUmFuZ2VPclplcm9cbiAgICAgIH0pXG5cbiAgICAgIGlmIChkZXRlY3RlZE1vbWVudHVtKSB7XG4gICAgICAgIHJlY29nbml6ZWRNb21lbnR1bSgpXG4gICAgICB9XG5cbiAgICAgIC8vIG9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZXZlbnRzXG4gICAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzID0gcmVjZW50QWNjZWxlcmF0aW9uRmFjdG9yc1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY29nbml6ZWRNb21lbnR1bSA9ICgpID0+IHtcbiAgICBzdGF0ZS5pc01vbWVudHVtID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgc3RhdGUgPSBjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUoKVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IHRydWVcbiAgICBzdGF0ZS5zdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgcHJldldoZWVsRXZlbnRTdGF0ZSA9IHVuZGVmaW5lZFxuICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHdpbGxFbmQgPSAoKCkgPT4ge1xuICAgIGxldCB3aWxsRW5kSWQ6IG51bWJlclxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQod2lsbEVuZElkKVxuICAgICAgd2lsbEVuZElkID0gc2V0VGltZW91dChlbmQsIHN0YXRlLndpbGxFbmRUaW1lb3V0KVxuICAgIH1cbiAgfSkoKVxuXG4gIGNvbnN0IGVuZCA9IChpc01vbWVudHVtQ2FuY2VsID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkgcmV0dXJuXG5cbiAgICBpZiAoc3RhdGUuaXNNb21lbnR1bSAmJiBpc01vbWVudHVtQ2FuY2VsKSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSwgaXNNb21lbnR1bUNhbmNlbDogdHJ1ZSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwdWJsaXNoV2hlZWwoeyBpc0VuZGluZzogdHJ1ZSB9KVxuICAgIH1cblxuICAgIHN0YXRlLmlzTW9tZW50dW0gPSBmYWxzZVxuICAgIHN0YXRlLmlzU3RhcnRlZCA9IGZhbHNlXG4gIH1cblxuICBjb25zdCB7IG9ic2VydmUsIHVub2JzZXJ2ZSwgZGlzY29ubmVjdCB9ID0gV2hlZWxUYXJnZXRPYnNlcnZlcihmZWVkV2hlZWwpXG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zUGFyYW0pXG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBvYnNlcnZlLFxuICAgIHVub2JzZXJ2ZSxcbiAgICBkaXNjb25uZWN0LFxuICAgIGZlZWRXaGVlbCxcbiAgICB1cGRhdGVPcHRpb25zLFxuICB9KVxufVxuIiwiZXhwb3J0IGNvbnN0IGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMgPSAoZW1ibGFBcGlNYWluLCBzbGlkZXNUaHVtYnMpID0+IHtcbiAgICBjb25zdCBzY3JvbGxUb0luZGV4ID0gc2xpZGVzVGh1bWJzLm1hcChcbiAgICAgICAgKF8sIGluZGV4KSA9PiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlbWJsYUFwaU1haW4uc2Nyb2xsVG8oaW5kZXgpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHNsaWRlTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFRvSW5kZXhbaW5kZXhdLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgc2xpZGVOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRUb2dnbGVUaHVtYkJ1dHRvbnNBY3RpdmUgPSAoZW1ibGFBcGlNYWluLCBzbGlkZXNUaHVtYnMsIGVtYmxhQXBpVGh1bWIgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlVGh1bWJCdG5zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZW1ibGFBcGlNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpO1xuXG4gICAgICAgIGVtYmxhQXBpVGh1bWI/LnNjcm9sbFRvKHNlbGVjdGVkKTtcbiAgICAgICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZDtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJywgaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QudG9nZ2xlKCd1ay1hY3RpdmUnLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgaXNTZWxlY3RlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW1ibGFBcGlNYWluXG4gICAgICAgIC5vbignc2VsZWN0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpXG4gICAgICAgIC5vbigncmVJbml0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpO1xuICAgIHRvZ2dsZVRodW1iQnRuc1N0YXRlKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBlbWJsYUFwaU1haW4ub2ZmKCdzZWxlY3QnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSk7XG4gICAgICAgIGVtYmxhQXBpTWFpbi5vZmYoJ3JlSW5pdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKTtcbiAgICAgICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlKSA9PiB7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgndWstYWN0aXZlJyk7XG4gICAgICAgICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMgPSAoZW1ibGFBcGksIHByZXZCdG4sIG5leHRCdG4pID0+IHtcbiAgICBjb25zdCBzY3JvbGxQcmV2ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVtYmxhQXBpLnNjcm9sbFByZXYoKTtcbiAgICB9O1xuICAgIGNvbnN0IHNjcm9sbE5leHQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZW1ibGFBcGkuc2Nyb2xsTmV4dCgpO1xuICAgIH07XG4gICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFByZXYsIGZhbHNlKTtcbiAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTmV4dCwgZmFsc2UpO1xuXG4gICAgY29uc3QgcmVtb3ZlVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlID0gYWRkVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlKFxuICAgICAgICBlbWJsYUFwaSxcbiAgICAgICAgcHJldkJ0bixcbiAgICAgICAgbmV4dEJ0blxuICAgICk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoKTtcbiAgICAgICAgcHJldkJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFByZXYsIGZhbHNlKTtcbiAgICAgICAgbmV4dEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbE5leHQsIGZhbHNlKTtcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYWRkVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlKGVtYmxhQXBpLCBwcmV2QnRuLCBuZXh0QnRuKSB7XG4gICAgY29uc3QgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChlbWJsYUFwaS5jYW5TY3JvbGxQcmV2KCkpIHtcbiAgICAgICAgICAgIHByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJldkJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW1ibGFBcGkuY2FuU2Nyb2xsTmV4dCgpKSB7XG4gICAgICAgICAgICBuZXh0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGVtYmxhQXBpXG4gICAgICAgIC5vbignc2VsZWN0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpXG4gICAgICAgIC5vbignaW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKVxuICAgICAgICAub24oJ3JlSW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGVtYmxhQXBpLm9mZignc2VsZWN0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpO1xuICAgICAgICBlbWJsYUFwaS5vZmYoJ2luaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG4gICAgICAgIGVtYmxhQXBpLm9mZigncmVJbml0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpO1xuICAgICAgICBwcmV2QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCB7IENyZWF0ZU9wdGlvbnNUeXBlLCBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsJ1xuXG5leHBvcnQgdHlwZSBEZWxheU9wdGlvblR5cGUgPVxuICB8IG51bWJlclxuICB8ICgoc2Nyb2xsU25hcHM6IG51bWJlcltdLCBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IG51bWJlcltdKVxuXG5leHBvcnQgdHlwZSBSb290Tm9kZVR5cGUgPVxuICB8IG51bGxcbiAgfCAoKGVtYmxhUm9vdDogSFRNTEVsZW1lbnQpID0+IEhUTUxFbGVtZW50IHwgbnVsbClcblxuZXhwb3J0IHR5cGUgT3B0aW9uc1R5cGUgPSBDcmVhdGVPcHRpb25zVHlwZTx7XG4gIGRlbGF5OiBEZWxheU9wdGlvblR5cGVcbiAganVtcDogYm9vbGVhblxuICBwbGF5T25Jbml0OiBib29sZWFuXG4gIHN0b3BPbkZvY3VzSW46IGJvb2xlYW5cbiAgc3RvcE9uSW50ZXJhY3Rpb246IGJvb2xlYW5cbiAgc3RvcE9uTW91c2VFbnRlcjogYm9vbGVhblxuICBzdG9wT25MYXN0U25hcDogYm9vbGVhblxuICByb290Tm9kZTogUm9vdE5vZGVUeXBlXG59PlxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnNUeXBlID0ge1xuICBhY3RpdmU6IHRydWUsXG4gIGJyZWFrcG9pbnRzOiB7fSxcbiAgZGVsYXk6IDQwMDAsXG4gIGp1bXA6IGZhbHNlLFxuICBwbGF5T25Jbml0OiB0cnVlLFxuICBzdG9wT25Gb2N1c0luOiB0cnVlLFxuICBzdG9wT25JbnRlcmFjdGlvbjogdHJ1ZSxcbiAgc3RvcE9uTW91c2VFbnRlcjogZmFsc2UsXG4gIHN0b3BPbkxhc3RTbmFwOiBmYWxzZSxcbiAgcm9vdE5vZGU6IG51bGxcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRGVsYXlPcHRpb25UeXBlLCBSb290Tm9kZVR5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWxheShcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBkZWxheTogRGVsYXlPcHRpb25UeXBlXG4pOiBudW1iZXJbXSB7XG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gZW1ibGFBcGkuc2Nyb2xsU25hcExpc3QoKVxuXG4gIGlmICh0eXBlb2YgZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHNjcm9sbFNuYXBzLm1hcCgoKSA9PiBkZWxheSlcbiAgfVxuICByZXR1cm4gZGVsYXkoc2Nyb2xsU25hcHMsIGVtYmxhQXBpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0b3BsYXlSb290Tm9kZShcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICByb290Tm9kZTogUm9vdE5vZGVUeXBlXG4pOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IGVtYmxhUm9vdE5vZGUgPSBlbWJsYUFwaS5yb290Tm9kZSgpXG4gIHJldHVybiAocm9vdE5vZGUgJiYgcm9vdE5vZGUoZW1ibGFSb290Tm9kZSkpIHx8IGVtYmxhUm9vdE5vZGVcbn1cbiIsImltcG9ydCB7IE9wdGlvbnNUeXBlLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IGdldEF1dG9wbGF5Um9vdE5vZGUsIG5vcm1hbGl6ZURlbGF5IH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7XG4gIENyZWF0ZVBsdWdpblR5cGUsXG4gIE9wdGlvbnNIYW5kbGVyVHlwZSxcbiAgRW1ibGFDYXJvdXNlbFR5cGVcbn0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5cbmRlY2xhcmUgbW9kdWxlICdlbWJsYS1jYXJvdXNlbCcge1xuICBpbnRlcmZhY2UgRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgYXV0b3BsYXk6IEF1dG9wbGF5VHlwZVxuICB9XG5cbiAgaW50ZXJmYWNlIEVtYmxhRXZlbnRMaXN0VHlwZSB7XG4gICAgYXV0b3BsYXlQbGF5OiAnYXV0b3BsYXk6cGxheSdcbiAgICBhdXRvcGxheVN0b3A6ICdhdXRvcGxheTpzdG9wJ1xuICAgIGF1dG9wbGF5U2VsZWN0OiAnYXV0b3BsYXk6c2VsZWN0J1xuICAgIGF1dG9wbGF5VGltZXJTZXQ6ICdhdXRvcGxheTp0aW1lcnNldCdcbiAgICBhdXRvcGxheVRpbWVyU3RvcHBlZDogJ2F1dG9wbGF5OnRpbWVyc3RvcHBlZCdcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBBdXRvcGxheVR5cGUgPSBDcmVhdGVQbHVnaW5UeXBlPFxuICB7XG4gICAgcGxheTogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gICAgc3RvcDogKCkgPT4gdm9pZFxuICAgIHJlc2V0OiAoKSA9PiB2b2lkXG4gICAgaXNQbGF5aW5nOiAoKSA9PiBib29sZWFuXG4gICAgdGltZVVudGlsTmV4dDogKCkgPT4gbnVtYmVyIHwgbnVsbFxuICB9LFxuICBPcHRpb25zVHlwZVxuPlxuXG5leHBvcnQgdHlwZSBBdXRvcGxheU9wdGlvbnNUeXBlID0gQXV0b3BsYXlUeXBlWydvcHRpb25zJ11cblxuZnVuY3Rpb24gQXV0b3BsYXkodXNlck9wdGlvbnM6IEF1dG9wbGF5T3B0aW9uc1R5cGUgPSB7fSk6IEF1dG9wbGF5VHlwZSB7XG4gIGxldCBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBsZXQgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG4gIGxldCBkZXN0cm95ZWQ6IGJvb2xlYW5cbiAgbGV0IGRlbGF5OiBSZXR1cm5UeXBlPEVtYmxhQ2Fyb3VzZWxUeXBlWydzY3JvbGxTbmFwTGlzdCddPlxuICBsZXQgdGltZXJTdGFydFRpbWU6IG51bGwgfCBudW1iZXIgPSBudWxsXG4gIGxldCB0aW1lcklkID0gMFxuICBsZXQgYXV0b3BsYXlBY3RpdmUgPSBmYWxzZVxuICBsZXQgbW91c2VJc092ZXIgPSBmYWxzZVxuICBsZXQgcGxheU9uRG9jdW1lbnRWaXNpYmxlID0gZmFsc2VcbiAgbGV0IGp1bXAgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGlJbnN0YW5jZTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgb3B0aW9uc0hhbmRsZXI6IE9wdGlvbnNIYW5kbGVyVHlwZVxuICApOiB2b2lkIHtcbiAgICBlbWJsYUFwaSA9IGVtYmxhQXBpSW5zdGFuY2VcblxuICAgIGNvbnN0IHsgbWVyZ2VPcHRpb25zLCBvcHRpb25zQXRNZWRpYSB9ID0gb3B0aW9uc0hhbmRsZXJcbiAgICBjb25zdCBvcHRpb25zQmFzZSA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgQXV0b3BsYXkuZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGlmIChlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpLmxlbmd0aCA8PSAxKSByZXR1cm5cblxuICAgIGp1bXAgPSBvcHRpb25zLmp1bXBcbiAgICBkZXN0cm95ZWQgPSBmYWxzZVxuICAgIGRlbGF5ID0gbm9ybWFsaXplRGVsYXkoZW1ibGFBcGksIG9wdGlvbnMuZGVsYXkpXG5cbiAgICBjb25zdCB7IGV2ZW50U3RvcmUsIG93bmVyRG9jdW1lbnQgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBpc0RyYWdnYWJsZSA9ICEhZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKS5vcHRpb25zLndhdGNoRHJhZ1xuICAgIGNvbnN0IHJvb3QgPSBnZXRBdXRvcGxheVJvb3ROb2RlKGVtYmxhQXBpLCBvcHRpb25zLnJvb3ROb2RlKVxuXG4gICAgZXZlbnRTdG9yZS5hZGQob3duZXJEb2N1bWVudCwgJ3Zpc2liaWxpdHljaGFuZ2UnLCB2aXNpYmlsaXR5Q2hhbmdlKVxuXG4gICAgaWYgKGlzRHJhZ2dhYmxlKSB7XG4gICAgICBlbWJsYUFwaS5vbigncG9pbnRlckRvd24nLCBwb2ludGVyRG93bilcbiAgICB9XG5cbiAgICBpZiAoaXNEcmFnZ2FibGUgJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uTW91c2VFbnRlcikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQocm9vdCwgJ21vdXNlZW50ZXInLCBtb3VzZUVudGVyKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbk1vdXNlRW50ZXIgJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGV2ZW50U3RvcmUuYWRkKHJvb3QsICdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZSlcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zdG9wT25Gb2N1c0luKSB7XG4gICAgICBlbWJsYUFwaS5vbignc2xpZGVGb2N1c1N0YXJ0Jywgc3RvcEF1dG9wbGF5KVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbkZvY3VzSW4gJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGV2ZW50U3RvcmUuYWRkKGVtYmxhQXBpLmNvbnRhaW5lck5vZGUoKSwgJ2ZvY3Vzb3V0Jywgc3RhcnRBdXRvcGxheSlcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wbGF5T25Jbml0KSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZW1ibGFBcGlcbiAgICAgIC5vZmYoJ3BvaW50ZXJEb3duJywgcG9pbnRlckRvd24pXG4gICAgICAub2ZmKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG4gICAgICAub2ZmKCdzbGlkZUZvY3VzU3RhcnQnLCBzdG9wQXV0b3BsYXkpXG5cbiAgICBzdG9wQXV0b3BsYXkoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBzZXRUaW1lcigpOiB2b2lkIHtcbiAgICBjb25zdCB7IG93bmVyV2luZG93IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgb3duZXJXaW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpXG4gICAgdGltZXJJZCA9IG93bmVyV2luZG93LnNldFRpbWVvdXQobmV4dCwgZGVsYXlbZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKCldKVxuICAgIHRpbWVyU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICBlbWJsYUFwaS5lbWl0KCdhdXRvcGxheTp0aW1lcnNldCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRpbWVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgb3duZXJXaW5kb3cgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZClcbiAgICB0aW1lcklkID0gMFxuICAgIHRpbWVyU3RhcnRUaW1lID0gbnVsbFxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnRpbWVyc3RvcHBlZCcpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEF1dG9wbGF5KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGlmIChkb2N1bWVudElzSGlkZGVuKCkpIHtcbiAgICAgIHBsYXlPbkRvY3VtZW50VmlzaWJsZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWF1dG9wbGF5QWN0aXZlKSBlbWJsYUFwaS5lbWl0KCdhdXRvcGxheTpwbGF5JylcblxuICAgIHNldFRpbWVyKClcbiAgICBhdXRvcGxheUFjdGl2ZSA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BBdXRvcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnN0b3AnKVxuXG4gICAgY2xlYXJUaW1lcigpXG4gICAgYXV0b3BsYXlBY3RpdmUgPSBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gdmlzaWJpbGl0eUNoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnRJc0hpZGRlbigpKSB7XG4gICAgICBwbGF5T25Eb2N1bWVudFZpc2libGUgPSBhdXRvcGxheUFjdGl2ZVxuICAgICAgcmV0dXJuIHN0b3BBdXRvcGxheSgpXG4gICAgfVxuXG4gICAgaWYgKHBsYXlPbkRvY3VtZW50VmlzaWJsZSkgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBkb2N1bWVudElzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgb3duZXJEb2N1bWVudCB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIHJldHVybiBvd25lckRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ2hpZGRlbidcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IHZvaWQge1xuICAgIGlmICghbW91c2VJc092ZXIpIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVXAoKTogdm9pZCB7XG4gICAgaWYgKCFtb3VzZUlzT3Zlcikgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIG1vdXNlSXNPdmVyID0gdHJ1ZVxuICAgIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIG1vdXNlSXNPdmVyID0gZmFsc2VcbiAgICBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXkoanVtcE92ZXJyaWRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YganVtcE92ZXJyaWRlICE9PSAndW5kZWZpbmVkJykganVtcCA9IGp1bXBPdmVycmlkZVxuICAgIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdXRvcGxheUFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXguY2xvbmUoKS5hZGQoMSkuZ2V0KClcbiAgICBjb25zdCBsYXN0SW5kZXggPSBlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpLmxlbmd0aCAtIDFcbiAgICBjb25zdCBraWxsID0gb3B0aW9ucy5zdG9wT25MYXN0U25hcCAmJiBuZXh0SW5kZXggPT09IGxhc3RJbmRleFxuXG4gICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbE5leHQoKSkge1xuICAgICAgZW1ibGFBcGkuc2Nyb2xsTmV4dChqdW1wKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbWJsYUFwaS5zY3JvbGxUbygwLCBqdW1wKVxuICAgIH1cblxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnNlbGVjdCcpXG5cbiAgICBpZiAoa2lsbCkgcmV0dXJuIHN0b3BBdXRvcGxheSgpXG4gICAgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiB0aW1lVW50aWxOZXh0KCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghdGltZXJTdGFydFRpbWUpIHJldHVybiBudWxsXG4gICAgY29uc3QgY3VycmVudERlbGF5ID0gZGVsYXlbZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKCldXG4gICAgY29uc3QgdGltZVBhc3RTaW5jZVN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aW1lclN0YXJ0VGltZVxuICAgIHJldHVybiBjdXJyZW50RGVsYXkgLSB0aW1lUGFzdFNpbmNlU3RhcnRcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF1dG9wbGF5VHlwZSA9IHtcbiAgICBuYW1lOiAnYXV0b3BsYXknLFxuICAgIG9wdGlvbnM6IHVzZXJPcHRpb25zLFxuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBwbGF5LFxuICAgIHN0b3AsXG4gICAgcmVzZXQsXG4gICAgaXNQbGF5aW5nLFxuICAgIHRpbWVVbnRpbE5leHRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBBdXRvcGxheSB7XG4gIGxldCBnbG9iYWxPcHRpb25zOiBBdXRvcGxheU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkF1dG9wbGF5Lmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWRcblxuZXhwb3J0IGRlZmF1bHQgQXV0b3BsYXlcbiIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50T3B0aW9uVHlwZSA9XG4gIHwgJ3N0YXJ0J1xuICB8ICdjZW50ZXInXG4gIHwgJ2VuZCdcbiAgfCAoKHZpZXdTaXplOiBudW1iZXIsIHNuYXBTaXplOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IG51bWJlcilcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50VHlwZSA9IHtcbiAgbWVhc3VyZTogKG46IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnbm1lbnQoXG4gIGFsaWduOiBBbGlnbm1lbnRPcHRpb25UeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyXG4pOiBBbGlnbm1lbnRUeXBlIHtcbiAgY29uc3QgcHJlZGVmaW5lZCA9IHsgc3RhcnQsIGNlbnRlciwgZW5kIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiAwXG4gIH1cblxuICBmdW5jdGlvbiBjZW50ZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5kKG4pIC8gMlxuICB9XG5cbiAgZnVuY3Rpb24gZW5kKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplIC0gblxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChpc1N0cmluZyhhbGlnbikpIHJldHVybiBwcmVkZWZpbmVkW2FsaWduXShuKVxuICAgIHJldHVybiBhbGlnbih2aWV3U2l6ZSwgbiwgaW5kZXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbGlnbm1lbnRUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwidHlwZSBFdmVudE5hbWVUeXBlID0ga2V5b2YgRG9jdW1lbnRFdmVudE1hcCB8IGtleW9mIFdpbmRvd0V2ZW50TWFwXG50eXBlIEV2ZW50SGFuZGxlclR5cGUgPSAoZXZ0OiBhbnkpID0+IHZvaWRcbnR5cGUgRXZlbnRPcHRpb25zVHlwZSA9IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IHVuZGVmaW5lZFxudHlwZSBFdmVudFJlbW92ZXJUeXBlID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBFdmVudFN0b3JlVHlwZSA9IHtcbiAgYWRkOiAoXG4gICAgbm9kZTogRXZlbnRUYXJnZXQsXG4gICAgdHlwZTogRXZlbnROYW1lVHlwZSxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICAgIG9wdGlvbnM/OiBFdmVudE9wdGlvbnNUeXBlXG4gICkgPT4gRXZlbnRTdG9yZVR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50U3RvcmUoKTogRXZlbnRTdG9yZVR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBFdmVudFJlbW92ZXJUeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGFkZChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9uczogRXZlbnRPcHRpb25zVHlwZSA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICk6IEV2ZW50U3RvcmVUeXBlIHtcbiAgICBsZXQgcmVtb3ZlTGlzdGVuZXI6IEV2ZW50UmVtb3ZlclR5cGVcblxuICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gbm9kZSkge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWdhY3lNZWRpYVF1ZXJ5TGlzdCA9IDxNZWRpYVF1ZXJ5TGlzdD5ub2RlXG4gICAgICBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihoYW5kbGVyKVxuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5yZW1vdmVMaXN0ZW5lcihoYW5kbGVyKVxuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKHJlbW92ZUxpc3RlbmVyKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKChyZW1vdmUpID0+IHJlbW92ZSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRTdG9yZVR5cGUgPSB7XG4gICAgYWRkLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1VwZGF0ZVR5cGUgPSAoZW5naW5lOiBFbmdpbmVUeXBlKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBBbmltYXRpb25zUmVuZGVyVHlwZSA9IChlbmdpbmU6IEVuZ2luZVR5cGUsIGFscGhhOiBudW1iZXIpID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1R5cGUgPSB7XG4gIGluaXQ6ICgpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBzdGFydDogKCkgPT4gdm9pZFxuICBzdG9wOiAoKSA9PiB2b2lkXG4gIHVwZGF0ZTogKCkgPT4gdm9pZFxuICByZW5kZXI6IChhbHBoYTogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbmltYXRpb25zKFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHVwZGF0ZTogKCkgPT4gdm9pZCxcbiAgcmVuZGVyOiAoYWxwaGE6IG51bWJlcikgPT4gdm9pZFxuKTogQW5pbWF0aW9uc1R5cGUge1xuICBjb25zdCBkb2N1bWVudFZpc2libGVIYW5kbGVyID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGZpeGVkVGltZVN0ZXAgPSAxMDAwIC8gNjBcblxuICBsZXQgbGFzdFRpbWVTdGFtcDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IGFjY3VtdWxhdGVkVGltZSA9IDBcbiAgbGV0IGFuaW1hdGlvbklkID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgZG9jdW1lbnRWaXNpYmxlSGFuZGxlci5hZGQob3duZXJEb2N1bWVudCwgJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAob3duZXJEb2N1bWVudC5oaWRkZW4pIHJlc2V0KClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdG9wKClcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUodGltZVN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKTogdm9pZCB7XG4gICAgaWYgKCFhbmltYXRpb25JZCkgcmV0dXJuXG4gICAgaWYgKCFsYXN0VGltZVN0YW1wKSB7XG4gICAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgICB1cGRhdGUoKVxuICAgICAgdXBkYXRlKClcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lRWxhcHNlZCA9IHRpbWVTdGFtcCAtIGxhc3RUaW1lU3RhbXBcbiAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgYWNjdW11bGF0ZWRUaW1lICs9IHRpbWVFbGFwc2VkXG5cbiAgICB3aGlsZSAoYWNjdW11bGF0ZWRUaW1lID49IGZpeGVkVGltZVN0ZXApIHtcbiAgICAgIHVwZGF0ZSgpXG4gICAgICBhY2N1bXVsYXRlZFRpbWUgLT0gZml4ZWRUaW1lU3RlcFxuICAgIH1cblxuICAgIGNvbnN0IGFscGhhID0gYWNjdW11bGF0ZWRUaW1lIC8gZml4ZWRUaW1lU3RlcFxuICAgIHJlbmRlcihhbHBoYSlcblxuICAgIGlmIChhbmltYXRpb25JZCkge1xuICAgICAgYW5pbWF0aW9uSWQgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoYW5pbWF0aW9uSWQpIHJldHVyblxuICAgIGFuaW1hdGlvbklkID0gb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCk6IHZvaWQge1xuICAgIG93bmVyV2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklkKVxuICAgIGxhc3RUaW1lU3RhbXAgPSBudWxsXG4gICAgYWNjdW11bGF0ZWRUaW1lID0gMFxuICAgIGFuaW1hdGlvbklkID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKTogdm9pZCB7XG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBhY2N1bXVsYXRlZFRpbWUgPSAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbmltYXRpb25zVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgc3RhcnQsXG4gICAgc3RvcCxcbiAgICB1cGRhdGUsXG4gICAgcmVuZGVyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuXG5leHBvcnQgdHlwZSBBeGlzT3B0aW9uVHlwZSA9ICd4JyB8ICd5J1xuZXhwb3J0IHR5cGUgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUgPSAnbHRyJyB8ICdydGwnXG50eXBlIEF4aXNFZGdlVHlwZSA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnXG5cbmV4cG9ydCB0eXBlIEF4aXNUeXBlID0ge1xuICBzY3JvbGw6IEF4aXNPcHRpb25UeXBlXG4gIGNyb3NzOiBBeGlzT3B0aW9uVHlwZVxuICBzdGFydEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBlbmRFZGdlOiBBeGlzRWRnZVR5cGVcbiAgbWVhc3VyZVNpemU6IChub2RlUmVjdDogTm9kZVJlY3RUeXBlKSA9PiBudW1iZXJcbiAgZGlyZWN0aW9uOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF4aXMoXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlLFxuICBjb250ZW50RGlyZWN0aW9uOiBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZVxuKTogQXhpc1R5cGUge1xuICBjb25zdCBpc1JpZ2h0VG9MZWZ0ID0gY29udGVudERpcmVjdGlvbiA9PT0gJ3J0bCdcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGF4aXMgPT09ICd5J1xuICBjb25zdCBzY3JvbGwgPSBpc1ZlcnRpY2FsID8gJ3knIDogJ3gnXG4gIGNvbnN0IGNyb3NzID0gaXNWZXJ0aWNhbCA/ICd4JyA6ICd5J1xuICBjb25zdCBzaWduID0gIWlzVmVydGljYWwgJiYgaXNSaWdodFRvTGVmdCA/IC0xIDogMVxuICBjb25zdCBzdGFydEVkZ2UgPSBnZXRTdGFydEVkZ2UoKVxuICBjb25zdCBlbmRFZGdlID0gZ2V0RW5kRWRnZSgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemUobm9kZVJlY3Q6IE5vZGVSZWN0VHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBub2RlUmVjdFxuICAgIHJldHVybiBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXJ0RWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ3RvcCdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZEVkZ2UoKTogQXhpc0VkZ2VUeXBlIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkgcmV0dXJuICdib3R0b20nXG4gICAgcmV0dXJuIGlzUmlnaHRUb0xlZnQgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cblxuICBmdW5jdGlvbiBkaXJlY3Rpb24objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbiAqIHNpZ25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF4aXNUeXBlID0ge1xuICAgIHNjcm9sbCxcbiAgICBjcm9zcyxcbiAgICBzdGFydEVkZ2UsXG4gICAgZW5kRWRnZSxcbiAgICBtZWFzdXJlU2l6ZSxcbiAgICBkaXJlY3Rpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIExpbWl0VHlwZSA9IHtcbiAgbWluOiBudW1iZXJcbiAgbWF4OiBudW1iZXJcbiAgbGVuZ3RoOiBudW1iZXJcbiAgY29uc3RyYWluOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbiAgcmVhY2hlZEFueTogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZWFjaGVkTWF4OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNaW46IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVtb3ZlT2Zmc2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbWl0KG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAwKTogTGltaXRUeXBlIHtcbiAgY29uc3QgbGVuZ3RoID0gbWF0aEFicyhtaW4gLSBtYXgpXG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1pbihuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA8IG1pblxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1heChuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA+IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZEFueShuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSB8fCByZWFjaGVkTWF4KG4pXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIXJlYWNoZWRBbnkobikpIHJldHVybiBuXG4gICAgcmV0dXJuIHJlYWNoZWRNaW4obikgPyBtaW4gOiBtYXhcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9mZnNldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghbGVuZ3RoKSByZXR1cm4gblxuICAgIHJldHVybiBuIC0gbGVuZ3RoICogTWF0aC5jZWlsKChuIC0gbWF4KSAvIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IExpbWl0VHlwZSA9IHtcbiAgICBsZW5ndGgsXG4gICAgbWF4LFxuICAgIG1pbixcbiAgICBjb25zdHJhaW4sXG4gICAgcmVhY2hlZEFueSxcbiAgICByZWFjaGVkTWF4LFxuICAgIHJlYWNoZWRNaW4sXG4gICAgcmVtb3ZlT2Zmc2V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0IH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBDb3VudGVyVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogbnVtYmVyKSA9PiBDb3VudGVyVHlwZVxuICBhZGQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGNsb25lOiAoKSA9PiBDb3VudGVyVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ291bnRlcihcbiAgbWF4OiBudW1iZXIsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGxvb3A6IGJvb2xlYW5cbik6IENvdW50ZXJUeXBlIHtcbiAgY29uc3QgeyBjb25zdHJhaW4gfSA9IExpbWl0KDAsIG1heClcbiAgY29uc3QgbG9vcEVuZCA9IG1heCArIDFcbiAgbGV0IGNvdW50ZXIgPSB3aXRoaW5MaW1pdChzdGFydClcblxuICBmdW5jdGlvbiB3aXRoaW5MaW1pdChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAhbG9vcCA/IGNvbnN0cmFpbihuKSA6IG1hdGhBYnMoKGxvb3BFbmQgKyBuKSAlIGxvb3BFbmQpXG4gIH1cblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY291bnRlclxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICBjb3VudGVyID0gd2l0aGluTGltaXQobilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICByZXR1cm4gY2xvbmUoKS5zZXQoZ2V0KCkgKyBuKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmUoKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBDb3VudGVyKG1heCwgZ2V0KCksIGxvb3ApXG4gIH1cblxuICBjb25zdCBzZWxmOiBDb3VudGVyVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBjbG9uZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlclR5cGUsIFBvaW50ZXJFdmVudFR5cGUgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHtcbiAgZGVsdGFBYnMsXG4gIGZhY3RvckFicyxcbiAgaXNCb29sZWFuLFxuICBpc01vdXNlRXZlbnQsXG4gIG1hdGhBYnMsXG4gIG1hdGhTaWduLFxuICBXaW5kb3dUeXBlXG59IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRHJhZ0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBQb2ludGVyRXZlbnRUeXBlXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBEcmFnSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBwb2ludGVyRG93bjogKCkgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ0hhbmRsZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICByb290Tm9kZTogSFRNTEVsZW1lbnQsXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGRyYWdUcmFja2VyOiBEcmFnVHJhY2tlclR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIGluZGV4OiBDb3VudGVyVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZSxcbiAgZHJhZ0ZyZWU6IGJvb2xlYW4sXG4gIGRyYWdUaHJlc2hvbGQ6IG51bWJlcixcbiAgc2tpcFNuYXBzOiBib29sZWFuLFxuICBiYXNlRnJpY3Rpb246IG51bWJlcixcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbik6IERyYWdIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IHsgY3Jvc3M6IGNyb3NzQXhpcywgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGZvY3VzTm9kZXMgPSBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddXG4gIGNvbnN0IG5vblBhc3NpdmVFdmVudCA9IHsgcGFzc2l2ZTogZmFsc2UgfVxuICBjb25zdCBpbml0RXZlbnRzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGRyYWdFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZ29Ub05leHRUaHJlc2hvbGQgPSBMaW1pdCg1MCwgMjI1KS5jb25zdHJhaW4ocGVyY2VudE9mVmlldy5tZWFzdXJlKDIwKSlcbiAgY29uc3Qgc25hcEZvcmNlQm9vc3QgPSB7IG1vdXNlOiAzMDAsIHRvdWNoOiA0MDAgfVxuICBjb25zdCBmcmVlRm9yY2VCb29zdCA9IHsgbW91c2U6IDUwMCwgdG91Y2g6IDYwMCB9XG4gIGNvbnN0IGJhc2VTcGVlZCA9IGRyYWdGcmVlID8gNDMgOiAyNVxuXG4gIGxldCBpc01vdmluZyA9IGZhbHNlXG4gIGxldCBzdGFydFNjcm9sbCA9IDBcbiAgbGV0IHN0YXJ0Q3Jvc3MgPSAwXG4gIGxldCBwb2ludGVySXNEb3duID0gZmFsc2VcbiAgbGV0IHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICBsZXQgcHJldmVudENsaWNrID0gZmFsc2VcbiAgbGV0IGlzTW91c2UgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaERyYWcpIHJldHVyblxuXG4gICAgZnVuY3Rpb24gZG93bklmQWxsb3dlZChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hEcmFnKSB8fCB3YXRjaERyYWcoZW1ibGFBcGksIGV2dCkpIGRvd24oZXZ0KVxuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZVxuICAgIGluaXRFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ2RyYWdzdGFydCcsIChldnQpID0+IGV2dC5wcmV2ZW50RGVmYXVsdCgpLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCAoKSA9PiB1bmRlZmluZWQsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgKCkgPT4gdW5kZWZpbmVkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hzdGFydCcsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZWRvd24nLCBkb3duSWZBbGxvd2VkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hjYW5jZWwnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NvbnRleHRtZW51JywgdXApXG4gICAgICAuYWRkKG5vZGUsICdjbGljaycsIGNsaWNrLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpbml0RXZlbnRzLmNsZWFyKClcbiAgICBkcmFnRXZlbnRzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERyYWdFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IGlzTW91c2UgPyBvd25lckRvY3VtZW50IDogcm9vdE5vZGVcbiAgICBkcmFnRXZlbnRzXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGVuZCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnbW91c2Vtb3ZlJywgbW92ZSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAnbW91c2V1cCcsIHVwKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNGb2N1c05vZGUobm9kZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZSB8fCAnJ1xuICAgIHJldHVybiBmb2N1c05vZGVzLmluY2x1ZGVzKG5vZGVOYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gZm9yY2VCb29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGJvb3N0ID0gZHJhZ0ZyZWUgPyBmcmVlRm9yY2VCb29zdCA6IHNuYXBGb3JjZUJvb3N0XG4gICAgY29uc3QgdHlwZSA9IGlzTW91c2UgPyAnbW91c2UnIDogJ3RvdWNoJ1xuICAgIHJldHVybiBib29zdFt0eXBlXVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dlZEZvcmNlKGZvcmNlOiBudW1iZXIsIHRhcmdldENoYW5nZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IG5leHQgPSBpbmRleC5hZGQobWF0aFNpZ24oZm9yY2UpICogLTEpXG4gICAgY29uc3QgYmFzZUZvcmNlID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSkuZGlzdGFuY2VcblxuICAgIGlmIChkcmFnRnJlZSB8fCBtYXRoQWJzKGZvcmNlKSA8IGdvVG9OZXh0VGhyZXNob2xkKSByZXR1cm4gYmFzZUZvcmNlXG4gICAgaWYgKHNraXBTbmFwcyAmJiB0YXJnZXRDaGFuZ2VkKSByZXR1cm4gYmFzZUZvcmNlICogMC41XG5cbiAgICByZXR1cm4gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgobmV4dC5nZXQoKSwgMCkuZGlzdGFuY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNNb3VzZUV2dCA9IGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KVxuICAgIGlzTW91c2UgPSBpc01vdXNlRXZ0XG4gICAgcHJldmVudENsaWNrID0gZHJhZ0ZyZWUgJiYgaXNNb3VzZUV2dCAmJiAhZXZ0LmJ1dHRvbnMgJiYgaXNNb3ZpbmdcbiAgICBpc01vdmluZyA9IGRlbHRhQWJzKHRhcmdldC5nZXQoKSwgbG9jYXRpb24uZ2V0KCkpID49IDJcblxuICAgIGlmIChpc01vdXNlRXZ0ICYmIGV2dC5idXR0b24gIT09IDApIHJldHVyblxuICAgIGlmIChpc0ZvY3VzTm9kZShldnQudGFyZ2V0IGFzIEVsZW1lbnQpKSByZXR1cm5cblxuICAgIHBvaW50ZXJJc0Rvd24gPSB0cnVlXG4gICAgZHJhZ1RyYWNrZXIucG9pbnRlckRvd24oZXZ0KVxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMCkudXNlRHVyYXRpb24oMClcbiAgICB0YXJnZXQuc2V0KGxvY2F0aW9uKVxuICAgIGFkZERyYWdFdmVudHMoKVxuICAgIHN0YXJ0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBzdGFydENyb3NzID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dCwgY3Jvc3NBeGlzKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb2ludGVyRG93bicpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzVG91Y2hFdnQgPSAhaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaWYgKGlzVG91Y2hFdnQgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDIpIHJldHVybiB1cChldnQpXG5cbiAgICBjb25zdCBsYXN0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBjb25zdCBsYXN0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgY29uc3QgZGlmZlNjcm9sbCA9IGRlbHRhQWJzKGxhc3RTY3JvbGwsIHN0YXJ0U2Nyb2xsKVxuICAgIGNvbnN0IGRpZmZDcm9zcyA9IGRlbHRhQWJzKGxhc3RDcm9zcywgc3RhcnRDcm9zcylcblxuICAgIGlmICghcHJldmVudFNjcm9sbCAmJiAhaXNNb3VzZSkge1xuICAgICAgaWYgKCFldnQuY2FuY2VsYWJsZSkgcmV0dXJuIHVwKGV2dClcbiAgICAgIHByZXZlbnRTY3JvbGwgPSBkaWZmU2Nyb2xsID4gZGlmZkNyb3NzXG4gICAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHJldHVybiB1cChldnQpXG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBkcmFnVHJhY2tlci5wb2ludGVyTW92ZShldnQpXG4gICAgaWYgKGRpZmZTY3JvbGwgPiBkcmFnVGhyZXNob2xkKSBwcmV2ZW50Q2xpY2sgPSB0cnVlXG5cbiAgICBzY3JvbGxCb2R5LnVzZUZyaWN0aW9uKDAuMykudXNlRHVyYXRpb24oMC43NSlcbiAgICBhbmltYXRpb24uc3RhcnQoKVxuICAgIHRhcmdldC5hZGQoZGlyZWN0aW9uKGRpZmYpKVxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TG9jYXRpb24gPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZSgwLCBmYWxzZSlcbiAgICBjb25zdCB0YXJnZXRDaGFuZ2VkID0gY3VycmVudExvY2F0aW9uLmluZGV4ICE9PSBpbmRleC5nZXQoKVxuICAgIGNvbnN0IHJhd0ZvcmNlID0gZHJhZ1RyYWNrZXIucG9pbnRlclVwKGV2dCkgKiBmb3JjZUJvb3N0KClcbiAgICBjb25zdCBmb3JjZSA9IGFsbG93ZWRGb3JjZShkaXJlY3Rpb24ocmF3Rm9yY2UpLCB0YXJnZXRDaGFuZ2VkKVxuICAgIGNvbnN0IGZvcmNlRmFjdG9yID0gZmFjdG9yQWJzKHJhd0ZvcmNlLCBmb3JjZSlcbiAgICBjb25zdCBzcGVlZCA9IGJhc2VTcGVlZCAtIDEwICogZm9yY2VGYWN0b3JcbiAgICBjb25zdCBmcmljdGlvbiA9IGJhc2VGcmljdGlvbiArIGZvcmNlRmFjdG9yIC8gNTBcblxuICAgIHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICAgIHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oc3BlZWQpLnVzZUZyaWN0aW9uKGZyaWN0aW9uKVxuICAgIHNjcm9sbFRvLmRpc3RhbmNlKGZvcmNlLCAhZHJhZ0ZyZWUpXG4gICAgaXNNb3VzZSA9IGZhbHNlXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJVcCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGljayhldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAocHJldmVudENsaWNrKSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb2ludGVySXNEb3duXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBvaW50ZXJEb3duXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNPcHRpb25UeXBlLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGlzTW91c2VFdmVudCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgUG9pbnRlckNvb3JkVHlwZSA9IGtleW9mIFRvdWNoIHwga2V5b2YgTW91c2VFdmVudFxuZXhwb3J0IHR5cGUgUG9pbnRlckV2ZW50VHlwZSA9IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50XG5cbmV4cG9ydCB0eXBlIERyYWdUcmFja2VyVHlwZSA9IHtcbiAgcG9pbnRlckRvd246IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICBwb2ludGVyTW92ZTogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJVcDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHJlYWRQb2ludDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdUcmFja2VyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IERyYWdUcmFja2VyVHlwZSB7XG4gIGNvbnN0IGxvZ0ludGVydmFsID0gMTcwXG5cbiAgbGV0IHN0YXJ0RXZlbnQ6IFBvaW50ZXJFdmVudFR5cGVcbiAgbGV0IGxhc3RFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuXG4gIGZ1bmN0aW9uIHJlYWRUaW1lKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGV2dC50aW1lU3RhbXBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRQb2ludChldnQ6IFBvaW50ZXJFdmVudFR5cGUsIGV2dEF4aXM/OiBBeGlzT3B0aW9uVHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBldnRBeGlzIHx8IGF4aXMuc2Nyb2xsXG4gICAgY29uc3QgY29vcmQ6IFBvaW50ZXJDb29yZFR5cGUgPSBgY2xpZW50JHtwcm9wZXJ0eSA9PT0gJ3gnID8gJ1gnIDogJ1knfWBcbiAgICByZXR1cm4gKGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KSA/IGV2dCA6IGV2dC50b3VjaGVzWzBdKVtjb29yZF1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgc3RhcnRFdmVudCA9IGV2dFxuICAgIGxhc3RFdmVudCA9IGV2dFxuICAgIHJldHVybiByZWFkUG9pbnQoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlck1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gcmVhZFBvaW50KGV2dCkgLSByZWFkUG9pbnQobGFzdEV2ZW50KVxuICAgIGNvbnN0IGV4cGlyZWQgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudCkgPiBsb2dJbnRlcnZhbFxuXG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgaWYgKGV4cGlyZWQpIHN0YXJ0RXZlbnQgPSBldnRcbiAgICByZXR1cm4gZGlmZlxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlclVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgaWYgKCFzdGFydEV2ZW50IHx8ICFsYXN0RXZlbnQpIHJldHVybiAwXG4gICAgY29uc3QgZGlmZkRyYWcgPSByZWFkUG9pbnQobGFzdEV2ZW50KSAtIHJlYWRQb2ludChzdGFydEV2ZW50KVxuICAgIGNvbnN0IGRpZmZUaW1lID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShsYXN0RXZlbnQpID4gbG9nSW50ZXJ2YWxcbiAgICBjb25zdCBmb3JjZSA9IGRpZmZEcmFnIC8gZGlmZlRpbWVcbiAgICBjb25zdCBpc0ZsaWNrID0gZGlmZlRpbWUgJiYgIWV4cGlyZWQgJiYgbWF0aEFicyhmb3JjZSkgPiAwLjFcblxuICAgIHJldHVybiBpc0ZsaWNrID8gZm9yY2UgOiAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnVHJhY2tlclR5cGUgPSB7XG4gICAgcG9pbnRlckRvd24sXG4gICAgcG9pbnRlck1vdmUsXG4gICAgcG9pbnRlclVwLFxuICAgIHJlYWRQb2ludFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJleHBvcnQgdHlwZSBOb2RlUmVjdFR5cGUgPSB7XG4gIHRvcDogbnVtYmVyXG4gIHJpZ2h0OiBudW1iZXJcbiAgYm90dG9tOiBudW1iZXJcbiAgbGVmdDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTm9kZVJlY3RzVHlwZSA9IHtcbiAgbWVhc3VyZTogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBOb2RlUmVjdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGVSZWN0cygpOiBOb2RlUmVjdHNUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShub2RlOiBIVE1MRWxlbWVudCk6IE5vZGVSZWN0VHlwZSB7XG4gICAgY29uc3QgeyBvZmZzZXRUb3AsIG9mZnNldExlZnQsIG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IG5vZGVcbiAgICBjb25zdCBvZmZzZXQ6IE5vZGVSZWN0VHlwZSA9IHtcbiAgICAgIHRvcDogb2Zmc2V0VG9wLFxuICAgICAgcmlnaHQ6IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCxcbiAgICAgIGJvdHRvbTogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxuICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgY29uc3Qgc2VsZjogTm9kZVJlY3RzVHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIFBlcmNlbnRPZlZpZXdUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnRPZlZpZXcodmlld1NpemU6IG51bWJlcik6IFBlcmNlbnRPZlZpZXdUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAqIChuIC8gMTAwKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgTm9kZVJlY3RzVHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgaXNCb29sZWFuLCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlc2l6ZUhhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgYXhpczogQXhpc1R5cGUsXG4gIHdhdGNoUmVzaXplOiBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSxcbiAgbm9kZVJlY3RzOiBOb2RlUmVjdHNUeXBlXG4pOiBSZXNpemVIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IG9ic2VydmVOb2RlcyA9IFtjb250YWluZXJdLmNvbmNhdChzbGlkZXMpXG4gIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXJcbiAgbGV0IGNvbnRhaW5lclNpemU6IG51bWJlclxuICBsZXQgc2xpZGVTaXplczogbnVtYmVyW10gPSBbXVxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiByZWFkU2l6ZShub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGF4aXMubWVhc3VyZVNpemUobm9kZVJlY3RzLm1lYXN1cmUobm9kZSkpXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hSZXNpemUpIHJldHVyblxuXG4gICAgY29udGFpbmVyU2l6ZSA9IHJlYWRTaXplKGNvbnRhaW5lcilcbiAgICBzbGlkZVNpemVzID0gc2xpZGVzLm1hcChyZWFkU2l6ZSlcblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgICBjb25zdCBpc0NvbnRhaW5lciA9IGVudHJ5LnRhcmdldCA9PT0gY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICBjb25zdCBsYXN0U2l6ZSA9IGlzQ29udGFpbmVyID8gY29udGFpbmVyU2l6ZSA6IHNsaWRlU2l6ZXNbc2xpZGVJbmRleF1cbiAgICAgICAgY29uc3QgbmV3U2l6ZSA9IHJlYWRTaXplKGlzQ29udGFpbmVyID8gY29udGFpbmVyIDogc2xpZGVzW3NsaWRlSW5kZXhdKVxuICAgICAgICBjb25zdCBkaWZmU2l6ZSA9IG1hdGhBYnMobmV3U2l6ZSAtIGxhc3RTaXplKVxuXG4gICAgICAgIGlmIChkaWZmU2l6ZSA+PSAwLjUpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKVxuXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoUmVzaXplKSB8fCB3YXRjaFJlc2l6ZShlbWJsYUFwaSwgZW50cmllcykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKGVudHJpZXMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBvYnNlcnZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShub2RlKSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoU2lnbiwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgZGlyZWN0aW9uOiAoKSA9PiBudW1iZXJcbiAgZHVyYXRpb246ICgpID0+IG51bWJlclxuICB2ZWxvY2l0eTogKCkgPT4gbnVtYmVyXG4gIHNlZWs6ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHNldHRsZWQ6ICgpID0+IGJvb2xlYW5cbiAgdXNlQmFzZUZyaWN0aW9uOiAoKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VCYXNlRHVyYXRpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUZyaWN0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VEdXJhdGlvbjogKG46IG51bWJlcikgPT4gU2Nyb2xsQm9keVR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbEJvZHkoXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIG9mZnNldExvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHByZXZpb3VzTG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGJhc2VEdXJhdGlvbjogbnVtYmVyLFxuICBiYXNlRnJpY3Rpb246IG51bWJlclxuKTogU2Nyb2xsQm9keVR5cGUge1xuICBsZXQgc2Nyb2xsVmVsb2NpdHkgPSAwXG4gIGxldCBzY3JvbGxEaXJlY3Rpb24gPSAwXG4gIGxldCBzY3JvbGxEdXJhdGlvbiA9IGJhc2VEdXJhdGlvblxuICBsZXQgc2Nyb2xsRnJpY3Rpb24gPSBiYXNlRnJpY3Rpb25cbiAgbGV0IHJhd0xvY2F0aW9uID0gbG9jYXRpb24uZ2V0KClcbiAgbGV0IHJhd0xvY2F0aW9uUHJldmlvdXMgPSAwXG5cbiAgZnVuY3Rpb24gc2VlaygpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgY29uc3QgZGlzcGxhY2VtZW50ID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBpc0luc3RhbnQgPSAhc2Nyb2xsRHVyYXRpb25cbiAgICBsZXQgc2Nyb2xsRGlzdGFuY2UgPSAwXG5cbiAgICBpZiAoaXNJbnN0YW50KSB7XG4gICAgICBzY3JvbGxWZWxvY2l0eSA9IDBcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KHRhcmdldClcbiAgICAgIGxvY2F0aW9uLnNldCh0YXJnZXQpXG5cbiAgICAgIHNjcm9sbERpc3RhbmNlID0gZGlzcGxhY2VtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KGxvY2F0aW9uKVxuXG4gICAgICBzY3JvbGxWZWxvY2l0eSArPSBkaXNwbGFjZW1lbnQgLyBzY3JvbGxEdXJhdGlvblxuICAgICAgc2Nyb2xsVmVsb2NpdHkgKj0gc2Nyb2xsRnJpY3Rpb25cbiAgICAgIHJhd0xvY2F0aW9uICs9IHNjcm9sbFZlbG9jaXR5XG4gICAgICBsb2NhdGlvbi5hZGQoc2Nyb2xsVmVsb2NpdHkpXG5cbiAgICAgIHNjcm9sbERpc3RhbmNlID0gcmF3TG9jYXRpb24gLSByYXdMb2NhdGlvblByZXZpb3VzXG4gICAgfVxuXG4gICAgc2Nyb2xsRGlyZWN0aW9uID0gbWF0aFNpZ24oc2Nyb2xsRGlzdGFuY2UpXG4gICAgcmF3TG9jYXRpb25QcmV2aW91cyA9IHJhd0xvY2F0aW9uXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHRsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZiA9IHRhcmdldC5nZXQoKSAtIG9mZnNldExvY2F0aW9uLmdldCgpXG4gICAgcmV0dXJuIG1hdGhBYnMoZGlmZikgPCAwLjAwMVxuICB9XG5cbiAgZnVuY3Rpb24gZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsRHVyYXRpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEaXJlY3Rpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbFZlbG9jaXR5XG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRHVyYXRpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VEdXJhdGlvbihiYXNlRHVyYXRpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRnJpY3Rpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VGcmljdGlvbihiYXNlRnJpY3Rpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VEdXJhdGlvbihuOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgc2Nyb2xsRHVyYXRpb24gPSBuXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUZyaWN0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxGcmljdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQm9keVR5cGUgPSB7XG4gICAgZGlyZWN0aW9uLFxuICAgIGR1cmF0aW9uLFxuICAgIHZlbG9jaXR5LFxuICAgIHNlZWssXG4gICAgc2V0dGxlZCxcbiAgICB1c2VCYXNlRnJpY3Rpb24sXG4gICAgdXNlQmFzZUR1cmF0aW9uLFxuICAgIHVzZUZyaWN0aW9uLFxuICAgIHVzZUR1cmF0aW9uXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQm91bmRzVHlwZSA9IHtcbiAgc2hvdWxkQ29uc3RyYWluOiAoKSA9PiBib29sZWFuXG4gIGNvbnN0cmFpbjogKHBvaW50ZXJEb3duOiBib29sZWFuKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm91bmRzKFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlXG4pOiBTY3JvbGxCb3VuZHNUeXBlIHtcbiAgY29uc3QgcHVsbEJhY2tUaHJlc2hvbGQgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMTApXG4gIGNvbnN0IGVkZ2VPZmZzZXRUb2xlcmFuY2UgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoNTApXG4gIGNvbnN0IGZyaWN0aW9uTGltaXQgPSBMaW1pdCgwLjEsIDAuOTkpXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gc2hvdWxkQ29uc3RyYWluKCk6IGJvb2xlYW4ge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KHRhcmdldC5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIGlmICghbGltaXQucmVhY2hlZEFueShsb2NhdGlvbi5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4ocG9pbnRlckRvd246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZENvbnN0cmFpbigpKSByZXR1cm5cbiAgICBjb25zdCBlZGdlID0gbGltaXQucmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSkgPyAnbWluJyA6ICdtYXgnXG4gICAgY29uc3QgZGlmZlRvRWRnZSA9IG1hdGhBYnMobGltaXRbZWRnZV0gLSBsb2NhdGlvbi5nZXQoKSlcbiAgICBjb25zdCBkaWZmVG9UYXJnZXQgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGZyaWN0aW9uID0gZnJpY3Rpb25MaW1pdC5jb25zdHJhaW4oZGlmZlRvRWRnZSAvIGVkZ2VPZmZzZXRUb2xlcmFuY2UpXG5cbiAgICB0YXJnZXQuc3VidHJhY3QoZGlmZlRvVGFyZ2V0ICogZnJpY3Rpb24pXG5cbiAgICBpZiAoIXBvaW50ZXJEb3duICYmIG1hdGhBYnMoZGlmZlRvVGFyZ2V0KSA8IHB1bGxCYWNrVGhyZXNob2xkKSB7XG4gICAgICB0YXJnZXQuc2V0KGxpbWl0LmNvbnN0cmFpbih0YXJnZXQuZ2V0KCkpKVxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigyNSkudXNlQmFzZUZyaWN0aW9uKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICAgIHNob3VsZENvbnN0cmFpbixcbiAgICBjb25zdHJhaW4sXG4gICAgdG9nZ2xlQWN0aXZlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgYXJyYXlJc0xhc3RJbmRleCwgYXJyYXlMYXN0LCBkZWx0YUFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5PcHRpb25UeXBlID0gZmFsc2UgfCAndHJpbVNuYXBzJyB8ICdrZWVwU25hcHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICBzbmFwc0NvbnRhaW5lZDogbnVtYmVyW11cbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbENvbnRhaW4oXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW10sXG4gIGNvbnRhaW5TY3JvbGw6IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTY3JvbGxDb250YWluVHlwZSB7XG4gIGNvbnN0IHNjcm9sbEJvdW5kcyA9IExpbWl0KC1jb250ZW50U2l6ZSArIHZpZXdTaXplLCAwKVxuICBjb25zdCBzbmFwc0JvdW5kZWQgPSBtZWFzdXJlQm91bmRlZCgpXG4gIGNvbnN0IHNjcm9sbENvbnRhaW5MaW1pdCA9IGZpbmRTY3JvbGxDb250YWluTGltaXQoKVxuICBjb25zdCBzbmFwc0NvbnRhaW5lZCA9IG1lYXN1cmVDb250YWluZWQoKVxuXG4gIGZ1bmN0aW9uIHVzZVBpeGVsVG9sZXJhbmNlKGJvdW5kOiBudW1iZXIsIHNuYXA6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWx0YUFicyhib3VuZCwgc25hcCkgPD0gMVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpOiBMaW1pdFR5cGUge1xuICAgIGNvbnN0IHN0YXJ0U25hcCA9IHNuYXBzQm91bmRlZFswXVxuICAgIGNvbnN0IGVuZFNuYXAgPSBhcnJheUxhc3Qoc25hcHNCb3VuZGVkKVxuICAgIGNvbnN0IG1pbiA9IHNuYXBzQm91bmRlZC5sYXN0SW5kZXhPZihzdGFydFNuYXApXG4gICAgY29uc3QgbWF4ID0gc25hcHNCb3VuZGVkLmluZGV4T2YoZW5kU25hcCkgKyAxXG4gICAgcmV0dXJuIExpbWl0KG1pbiwgbWF4KVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUJvdW5kZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbmFwc0FsaWduZWRcbiAgICAgIC5tYXAoKHNuYXBBbGlnbmVkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxCb3VuZHNcbiAgICAgICAgY29uc3Qgc25hcCA9IHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oc25hcEFsaWduZWQpXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChzbmFwc0FsaWduZWQsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIG1heFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtaW4sIHNuYXApKSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtYXgsIHNuYXApKSByZXR1cm4gbWF4XG4gICAgICAgIHJldHVybiBzbmFwXG4gICAgICB9KVxuICAgICAgLm1hcCgoc2Nyb2xsQm91bmQpID0+IHBhcnNlRmxvYXQoc2Nyb2xsQm91bmQudG9GaXhlZCgzKSkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQ29udGFpbmVkKCk6IG51bWJlcltdIHtcbiAgICBpZiAoY29udGVudFNpemUgPD0gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgcmV0dXJuIFtzY3JvbGxCb3VuZHMubWF4XVxuICAgIGlmIChjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJykgcmV0dXJuIHNuYXBzQm91bmRlZFxuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbENvbnRhaW5MaW1pdFxuICAgIHJldHVybiBzbmFwc0JvdW5kZWQuc2xpY2UobWluLCBtYXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgICBzbmFwc0NvbnRhaW5lZCxcbiAgICBzY3JvbGxDb250YWluTGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUxhc3QgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gIGxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExpbWl0KFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvb3A6IGJvb2xlYW5cbik6IFNjcm9sbExpbWl0VHlwZSB7XG4gIGNvbnN0IG1heCA9IHNjcm9sbFNuYXBzWzBdXG4gIGNvbnN0IG1pbiA9IGxvb3AgPyBtYXggLSBjb250ZW50U2l6ZSA6IGFycmF5TGFzdChzY3JvbGxTbmFwcylcbiAgY29uc3QgbGltaXQgPSBMaW1pdChtaW4sIG1heClcblxuICBjb25zdCBzZWxmOiBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gICAgbGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMb29wZXJUeXBlID0ge1xuICBsb29wOiAoZGlyZWN0aW9uOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExvb3BlcihcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdmVjdG9yczogVmVjdG9yMURUeXBlW11cbik6IFNjcm9sbExvb3BlclR5cGUge1xuICBjb25zdCBqb2ludFNhZmV0eSA9IDAuMVxuICBjb25zdCBtaW4gPSBsaW1pdC5taW4gKyBqb2ludFNhZmV0eVxuICBjb25zdCBtYXggPSBsaW1pdC5tYXggKyBqb2ludFNhZmV0eVxuICBjb25zdCB7IHJlYWNoZWRNaW4sIHJlYWNoZWRNYXggfSA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGZ1bmN0aW9uIHNob3VsZExvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAxKSByZXR1cm4gcmVhY2hlZE1heChsb2NhdGlvbi5nZXQoKSlcbiAgICBpZiAoZGlyZWN0aW9uID09PSAtMSkgcmV0dXJuIHJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRMb29wKGRpcmVjdGlvbikpIHJldHVyblxuXG4gICAgY29uc3QgbG9vcERpc3RhbmNlID0gY29udGVudFNpemUgKiAoZGlyZWN0aW9uICogLTEpXG4gICAgdmVjdG9ycy5mb3JFYWNoKCh2KSA9PiB2LmFkZChsb29wRGlzdGFuY2UpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsTG9vcGVyVHlwZSA9IHtcbiAgICBsb29wXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgZ2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKGxpbWl0OiBMaW1pdFR5cGUpOiBTY3JvbGxQcm9ncmVzc1R5cGUge1xuICBjb25zdCB7IG1heCwgbGVuZ3RoIH0gPSBsaW1pdFxuXG4gIGZ1bmN0aW9uIGdldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IG4gLSBtYXhcbiAgICByZXR1cm4gbGVuZ3RoID8gY3VycmVudExvY2F0aW9uIC8gLWxlbmd0aCA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgICBnZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50VHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gIHNuYXBzOiBudW1iZXJbXVxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxTbmFwcyhcbiAgYXhpczogQXhpc1R5cGUsXG4gIGFsaWdubWVudDogQWxpZ25tZW50VHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuKTogU2Nyb2xsU25hcHNUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgYWxpZ25tZW50cyA9IG1lYXN1cmVTaXplcygpLm1hcChhbGlnbm1lbnQubWVhc3VyZSlcbiAgY29uc3Qgc25hcHMgPSBtZWFzdXJlVW5hbGlnbmVkKClcbiAgY29uc3Qgc25hcHNBbGlnbmVkID0gbWVhc3VyZUFsaWduZWQoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTaXplcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNsaWRlUmVjdHMpXG4gICAgICAubWFwKChyZWN0cykgPT4gYXJyYXlMYXN0KHJlY3RzKVtlbmRFZGdlXSAtIHJlY3RzWzBdW3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlVW5hbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCkgPT4gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gcmVjdFtzdGFydEVkZ2VdKVxuICAgICAgLm1hcCgoc25hcCkgPT4gLW1hdGhBYnMoc25hcCkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQWxpZ25lZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNuYXBzKVxuICAgICAgLm1hcCgoZykgPT4gZ1swXSlcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiBzbmFwICsgYWxpZ25tZW50c1tpbmRleF0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gICAgc25hcHMsXG4gICAgc25hcHNBbGlnbmVkXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluT3B0aW9uVHlwZSB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQge1xuICBhcnJheUZyb21OdW1iZXIsXG4gIGFycmF5SXNMYXN0SW5kZXgsXG4gIGFycmF5TGFzdCxcbiAgYXJyYXlMYXN0SW5kZXhcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVSZWdpc3RyeVR5cGUgPSB7XG4gIHNsaWRlUmVnaXN0cnk6IG51bWJlcltdW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlUmVnaXN0cnkoXG4gIGNvbnRhaW5TbmFwczogYm9vbGVhbixcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGUsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGUsXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbik6IFNsaWRlUmVnaXN0cnlUeXBlIHtcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gIGNvbnN0IHNsaWRlUmVnaXN0cnkgPSBjcmVhdGVTbGlkZVJlZ2lzdHJ5KClcblxuICBmdW5jdGlvbiBjcmVhdGVTbGlkZVJlZ2lzdHJ5KCk6IG51bWJlcltdW10ge1xuICAgIGNvbnN0IGdyb3VwZWRTbGlkZUluZGV4ZXMgPSBncm91cFNsaWRlcyhzbGlkZUluZGV4ZXMpXG4gICAgY29uc3QgZG9Ob3RDb250YWluID0gIWNvbnRhaW5TbmFwcyB8fCBjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJ1xuXG4gICAgaWYgKHNjcm9sbFNuYXBzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIFtzbGlkZUluZGV4ZXNdXG4gICAgaWYgKGRvTm90Q29udGFpbikgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBncm91cGVkU2xpZGVJbmRleGVzLnNsaWNlKG1pbiwgbWF4KS5tYXAoKGdyb3VwLCBpbmRleCwgZ3JvdXBzKSA9PiB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KGdyb3VwcywgaW5kZXgpXG5cbiAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0KGdyb3Vwc1swXSkgKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UpXG4gICAgICB9XG4gICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0SW5kZXgoc2xpZGVJbmRleGVzKSAtIGFycmF5TGFzdChncm91cHMpWzBdICsgMVxuICAgICAgICByZXR1cm4gYXJyYXlGcm9tTnVtYmVyKHJhbmdlLCBhcnJheUxhc3QoZ3JvdXBzKVswXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBncm91cFxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgICBzbGlkZVJlZ2lzdHJ5XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgYXJyYXlMYXN0LCBtYXRoQWJzLCBtYXRoU2lnbiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRhcmdldFR5cGUgPSB7XG4gIGRpc3RhbmNlOiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICBieUluZGV4OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBUYXJnZXRUeXBlXG4gIGJ5RGlzdGFuY2U6IChmb3JjZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiBUYXJnZXRUeXBlXG4gIHNob3J0Y3V0OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFRhcmdldChcbiAgbG9vcDogYm9vbGVhbixcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZVxuKTogU2Nyb2xsVGFyZ2V0VHlwZSB7XG4gIGNvbnN0IHsgcmVhY2hlZEFueSwgcmVtb3ZlT2Zmc2V0LCBjb25zdHJhaW4gfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gbWluRGlzdGFuY2UoZGlzdGFuY2VzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRpc3RhbmNlcy5jb25jYXQoKS5zb3J0KChhLCBiKSA9PiBtYXRoQWJzKGEpIC0gbWF0aEFicyhiKSlbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRUYXJnZXRTbmFwKHRhcmdldDogbnVtYmVyKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsb29wID8gcmVtb3ZlT2Zmc2V0KHRhcmdldCkgOiBjb25zdHJhaW4odGFyZ2V0KVxuICAgIGNvbnN0IGFzY0RpZmZzVG9TbmFwcyA9IHNjcm9sbFNuYXBzXG4gICAgICAubWFwKChzbmFwLCBpbmRleCkgPT4gKHsgZGlmZjogc2hvcnRjdXQoc25hcCAtIGRpc3RhbmNlLCAwKSwgaW5kZXggfSkpXG4gICAgICAuc29ydCgoZDEsIGQyKSA9PiBtYXRoQWJzKGQxLmRpZmYpIC0gbWF0aEFicyhkMi5kaWZmKSlcblxuICAgIGNvbnN0IHsgaW5kZXggfSA9IGFzY0RpZmZzVG9TbmFwc1swXVxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG9ydGN1dCh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhcmdldHMgPSBbdGFyZ2V0LCB0YXJnZXQgKyBjb250ZW50U2l6ZSwgdGFyZ2V0IC0gY29udGVudFNpemVdXG5cbiAgICBpZiAoIWxvb3ApIHJldHVybiB0YXJnZXRcbiAgICBpZiAoIWRpcmVjdGlvbikgcmV0dXJuIG1pbkRpc3RhbmNlKHRhcmdldHMpXG5cbiAgICBjb25zdCBtYXRjaGluZ1RhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gbWF0aFNpZ24odCkgPT09IGRpcmVjdGlvbilcbiAgICBpZiAobWF0Y2hpbmdUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIG1pbkRpc3RhbmNlKG1hdGNoaW5nVGFyZ2V0cylcbiAgICByZXR1cm4gYXJyYXlMYXN0KHRhcmdldHMpIC0gY29udGVudFNpemVcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5SW5kZXgoaW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaWZmVG9TbmFwID0gc2Nyb2xsU25hcHNbaW5kZXhdIC0gdGFyZ2V0VmVjdG9yLmdldCgpXG4gICAgY29uc3QgZGlzdGFuY2UgPSBzaG9ydGN1dChkaWZmVG9TbmFwLCBkaXJlY3Rpb24pXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5RGlzdGFuY2UoZGlzdGFuY2U6IG51bWJlciwgc25hcDogYm9vbGVhbik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldFZlY3Rvci5nZXQoKSArIGRpc3RhbmNlXG4gICAgY29uc3QgeyBpbmRleCwgZGlzdGFuY2U6IHRhcmdldFNuYXBEaXN0YW5jZSB9ID0gZmluZFRhcmdldFNuYXAodGFyZ2V0KVxuICAgIGNvbnN0IHJlYWNoZWRCb3VuZCA9ICFsb29wICYmIHJlYWNoZWRBbnkodGFyZ2V0KVxuXG4gICAgaWYgKCFzbmFwIHx8IHJlYWNoZWRCb3VuZCkgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cblxuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRTbmFwRGlzdGFuY2VcbiAgICBjb25zdCBzbmFwRGlzdGFuY2UgPSBkaXN0YW5jZSArIHNob3J0Y3V0KGRpZmZUb1NuYXAsIDApXG5cbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2U6IHNuYXBEaXN0YW5jZSB9XG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICAgIGJ5RGlzdGFuY2UsXG4gICAgYnlJbmRleCxcbiAgICBzaG9ydGN1dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25zVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlLCBUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxUb1R5cGUgPSB7XG4gIGRpc3RhbmNlOiAobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiB2b2lkXG4gIGluZGV4OiAobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVG8oXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIGluZGV4Q3VycmVudDogQ291bnRlclR5cGUsXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBTY3JvbGxUb1R5cGUge1xuICBmdW5jdGlvbiBzY3JvbGxUbyh0YXJnZXQ6IFRhcmdldFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkaXN0YW5jZURpZmYgPSB0YXJnZXQuZGlzdGFuY2VcbiAgICBjb25zdCBpbmRleERpZmYgPSB0YXJnZXQuaW5kZXggIT09IGluZGV4Q3VycmVudC5nZXQoKVxuXG4gICAgdGFyZ2V0VmVjdG9yLmFkZChkaXN0YW5jZURpZmYpXG5cbiAgICBpZiAoZGlzdGFuY2VEaWZmKSB7XG4gICAgICBpZiAoc2Nyb2xsQm9keS5kdXJhdGlvbigpKSB7XG4gICAgICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgICAgYW5pbWF0aW9uLnJlbmRlcigxKVxuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kZXhEaWZmKSB7XG4gICAgICBpbmRleFByZXZpb3VzLnNldChpbmRleEN1cnJlbnQuZ2V0KCkpXG4gICAgICBpbmRleEN1cnJlbnQuc2V0KHRhcmdldC5pbmRleClcbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzZWxlY3QnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlKG46IG51bWJlciwgc25hcDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKG4sIHNuYXApXG4gICAgc2Nyb2xsVG8odGFyZ2V0KVxuICB9XG5cbiAgZnVuY3Rpb24gaW5kZXgobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gaW5kZXhDdXJyZW50LmNsb25lKCkuc2V0KG4pXG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgodGFyZ2V0SW5kZXguZ2V0KCksIGRpcmVjdGlvbilcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUb1R5cGUgPSB7XG4gICAgZGlzdGFuY2UsXG4gICAgaW5kZXhcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgaXNCb29sZWFuLCBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRm9jdXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGV2dDogRm9jdXNFdmVudFxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBGb2N1c0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IEZvY3VzSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVGb2N1cyhcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHdhdGNoRm9jdXM6IEZvY3VzSGFuZGxlck9wdGlvblR5cGVcbik6IFNsaWRlRm9jdXNUeXBlIHtcbiAgY29uc3QgZm9jdXNMaXN0ZW5lck9wdGlvbnMgPSB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWUgfVxuICBsZXQgbGFzdFRhYlByZXNzVGltZSA9IDBcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hGb2N1cykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2soaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgY29uc3Qgbm93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICBjb25zdCBkaWZmVGltZSA9IG5vd1RpbWUgLSBsYXN0VGFiUHJlc3NUaW1lXG5cbiAgICAgIGlmIChkaWZmVGltZSA+IDEwKSByZXR1cm5cblxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXNTdGFydCcpXG4gICAgICByb290LnNjcm9sbExlZnQgPSAwXG5cbiAgICAgIGNvbnN0IGdyb3VwID0gc2xpZGVSZWdpc3RyeS5maW5kSW5kZXgoKGdyb3VwKSA9PiBncm91cC5pbmNsdWRlcyhpbmRleCkpXG5cbiAgICAgIGlmICghaXNOdW1iZXIoZ3JvdXApKSByZXR1cm5cblxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigwKVxuICAgICAgc2Nyb2xsVG8uaW5kZXgoZ3JvdXAsIDApXG5cbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZUZvY3VzJylcbiAgICB9XG5cbiAgICBldmVudFN0b3JlLmFkZChkb2N1bWVudCwgJ2tleWRvd24nLCByZWdpc3RlclRhYlByZXNzLCBmYWxzZSlcblxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgZXZlbnRTdG9yZS5hZGQoXG4gICAgICAgIHNsaWRlLFxuICAgICAgICAnZm9jdXMnLFxuICAgICAgICAoZXZ0OiBGb2N1c0V2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaEZvY3VzKSB8fCB3YXRjaEZvY3VzKGVtYmxhQXBpLCBldnQpKSB7XG4gICAgICAgICAgICBkZWZhdWx0Q2FsbGJhY2soc2xpZGVJbmRleClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTGlzdGVuZXJPcHRpb25zXG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVGFiUHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ1RhYicpIGxhc3RUYWJQcmVzc1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVGb2N1c1R5cGUgPSB7XG4gICAgaW5pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFZlY3RvcjFEVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIGFkZDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxuICBzdWJ0cmFjdDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVmVjdG9yMUQoaW5pdGlhbFZhbHVlOiBudW1iZXIpOiBWZWN0b3IxRFR5cGUge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWVcblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgKz0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlIC09IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVJbnB1dChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpc051bWJlcihuKSA/IG4gOiBuLmdldCgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBWZWN0b3IxRFR5cGUgPSB7XG4gICAgZ2V0LFxuICAgIHNldCxcbiAgICBhZGQsXG4gICAgc3VidHJhY3RcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyByb3VuZFRvVHdvRGVjaW1hbHMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVUeXBlID0ge1xuICBjbGVhcjogKCkgPT4gdm9pZFxuICB0bzogKHRhcmdldDogbnVtYmVyKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNsYXRlKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuKTogVHJhbnNsYXRlVHlwZSB7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGF4aXMuc2Nyb2xsID09PSAneCcgPyB4IDogeVxuICBjb25zdCBjb250YWluZXJTdHlsZSA9IGNvbnRhaW5lci5zdHlsZVxuICBsZXQgcHJldmlvdXNUYXJnZXQ6IG51bWJlciB8IG51bGwgPSBudWxsXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24geChuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoJHtufXB4LDBweCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24geShuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoMHB4LCR7bn1weCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24gdG8odGFyZ2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuXG4gICAgY29uc3QgbmV3VGFyZ2V0ID0gcm91bmRUb1R3b0RlY2ltYWxzKGF4aXMuZGlyZWN0aW9uKHRhcmdldCkpXG4gICAgaWYgKG5ld1RhcmdldCA9PT0gcHJldmlvdXNUYXJnZXQpIHJldHVyblxuXG4gICAgY29udGFpbmVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNsYXRlKG5ld1RhcmdldClcbiAgICBwcmV2aW91c1RhcmdldCA9IG5ld1RhcmdldFxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIGlmICghY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogVHJhbnNsYXRlVHlwZSA9IHtcbiAgICBjbGVhcixcbiAgICB0byxcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBhcnJheUtleXMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcblxudHlwZSBTbGlkZUJvdW5kVHlwZSA9IHtcbiAgc3RhcnQ6IG51bWJlclxuICBlbmQ6IG51bWJlclxufVxuXG50eXBlIExvb3BQb2ludFR5cGUgPSB7XG4gIGxvb3BQb2ludDogbnVtYmVyXG4gIGluZGV4OiBudW1iZXJcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICB0YXJnZXQ6ICgpID0+IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTbGlkZUxvb3BlclR5cGUgPSB7XG4gIGNhbkxvb3A6ICgpID0+IGJvb2xlYW5cbiAgY2xlYXI6ICgpID0+IHZvaWRcbiAgbG9vcDogKCkgPT4gdm9pZFxuICBsb29wUG9pbnRzOiBMb29wUG9pbnRUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlTG9vcGVyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc2xpZGVTaXplczogbnVtYmVyW10sXG4gIHNsaWRlU2l6ZXNXaXRoR2FwczogbnVtYmVyW10sXG4gIHNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W11cbik6IFNsaWRlTG9vcGVyVHlwZSB7XG4gIGNvbnN0IHJvdW5kaW5nU2FmZXR5ID0gMC41XG4gIGNvbnN0IGFzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgZGVzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcykucmV2ZXJzZSgpXG4gIGNvbnN0IGxvb3BQb2ludHMgPSBzdGFydFBvaW50cygpLmNvbmNhdChlbmRQb2ludHMoKSlcblxuICBmdW5jdGlvbiByZW1vdmVTbGlkZVNpemVzKGluZGV4ZXM6IG51bWJlcltdLCBmcm9tOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleGVzLnJlZHVjZSgoYTogbnVtYmVyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYSAtIHNsaWRlU2l6ZXNXaXRoR2Fwc1tpXVxuICAgIH0sIGZyb20pXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJbkdhcChpbmRleGVzOiBudW1iZXJbXSwgZ2FwOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXJbXSwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVtYWluaW5nR2FwID0gcmVtb3ZlU2xpZGVTaXplcyhhLCBnYXApXG4gICAgICByZXR1cm4gcmVtYWluaW5nR2FwID4gMCA/IGEuY29uY2F0KFtpXSkgOiBhXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0OiBudW1iZXIpOiBTbGlkZUJvdW5kVHlwZVtdIHtcbiAgICByZXR1cm4gc25hcHMubWFwKChzbmFwLCBpbmRleCkgPT4gKHtcbiAgICAgIHN0YXJ0OiBzbmFwIC0gc2xpZGVTaXplc1tpbmRleF0gKyByb3VuZGluZ1NhZmV0eSArIG9mZnNldCxcbiAgICAgIGVuZDogc25hcCArIHZpZXdTaXplIC0gcm91bmRpbmdTYWZldHkgKyBvZmZzZXRcbiAgICB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRMb29wUG9pbnRzKFxuICAgIGluZGV4ZXM6IG51bWJlcltdLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGlzRW5kRWRnZTogYm9vbGVhblxuICApOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IHNsaWRlQm91bmRzID0gZmluZFNsaWRlQm91bmRzKG9mZnNldClcblxuICAgIHJldHVybiBpbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBpc0VuZEVkZ2UgPyAwIDogLWNvbnRlbnRTaXplXG4gICAgICBjb25zdCBhbHRlcmVkID0gaXNFbmRFZGdlID8gY29udGVudFNpemUgOiAwXG4gICAgICBjb25zdCBib3VuZEVkZ2UgPSBpc0VuZEVkZ2UgPyAnZW5kJyA6ICdzdGFydCdcbiAgICAgIGNvbnN0IGxvb3BQb2ludCA9IHNsaWRlQm91bmRzW2luZGV4XVtib3VuZEVkZ2VdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBsb29wUG9pbnQsXG4gICAgICAgIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEKC0xKSxcbiAgICAgICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgc2xpZGVzW2luZGV4XSksXG4gICAgICAgIHRhcmdldDogKCkgPT4gKGxvY2F0aW9uLmdldCgpID4gbG9vcFBvaW50ID8gaW5pdGlhbCA6IGFsdGVyZWQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gc2Nyb2xsU25hcHNbMF1cbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoZGVzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIGNvbnRlbnRTaXplLCBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFBvaW50cygpOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IGdhcCA9IHZpZXdTaXplIC0gc2Nyb2xsU25hcHNbMF0gLSAxXG4gICAgY29uc3QgaW5kZXhlcyA9IHNsaWRlc0luR2FwKGFzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIC1jb250ZW50U2l6ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvb3BQb2ludHMuZXZlcnkoKHsgaW5kZXggfSkgPT4ge1xuICAgICAgY29uc3Qgb3RoZXJJbmRleGVzID0gYXNjSXRlbXMuZmlsdGVyKChpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIHJldHVybiByZW1vdmVTbGlkZVNpemVzKG90aGVySW5kZXhlcywgdmlld1NpemUpIDw9IDAuMVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCwgdHJhbnNsYXRlLCBzbGlkZUxvY2F0aW9uIH0gPSBsb29wUG9pbnRcbiAgICAgIGNvbnN0IHNoaWZ0TG9jYXRpb24gPSB0YXJnZXQoKVxuICAgICAgaWYgKHNoaWZ0TG9jYXRpb24gPT09IHNsaWRlTG9jYXRpb24uZ2V0KCkpIHJldHVyblxuICAgICAgdHJhbnNsYXRlLnRvKHNoaWZ0TG9jYXRpb24pXG4gICAgICBzbGlkZUxvY2F0aW9uLnNldChzaGlmdExvY2F0aW9uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsb29wUG9pbnRzLmZvckVhY2goKGxvb3BQb2ludCkgPT4gbG9vcFBvaW50LnRyYW5zbGF0ZS5jbGVhcigpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVMb29wZXJUeXBlID0ge1xuICAgIGNhbkxvb3AsXG4gICAgY2xlYXIsXG4gICAgbG9vcCxcbiAgICBsb29wUG9pbnRzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0hhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hTbGlkZXM6IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlXG4pOiBTbGlkZXNIYW5kbGVyVHlwZSB7XG4gIGxldCBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFNsaWRlcykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZXNDaGFuZ2VkJylcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaFNsaWRlcykgfHwgd2F0Y2hTbGlkZXMoZW1ibGFBcGksIG11dGF0aW9ucykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKG11dGF0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXIpIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IG9iamVjdEtleXMgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHtcbiAgW2tleTogbnVtYmVyXTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVxufVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSA9IEludGVyc2VjdGlvbk9ic2VydmVySW5pdFsndGhyZXNob2xkJ11cblxuZXhwb3J0IHR5cGUgU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIGdldDogKGluVmlldz86IGJvb2xlYW4pID0+IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNJblZpZXcoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB0aHJlc2hvbGQ6IFNsaWRlc0luVmlld09wdGlvbnNUeXBlXG4pOiBTbGlkZXNJblZpZXdUeXBlIHtcbiAgY29uc3QgaW50ZXJzZWN0aW9uRW50cnlNYXA6IEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHt9XG4gIGxldCBpblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgbm90SW5WaWV3Q2FjaGU6IG51bWJlcltdIHwgbnVsbCA9IG51bGxcbiAgbGV0IGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgKGVudHJpZXMpID0+IHtcbiAgICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG5cbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2YoPEhUTUxFbGVtZW50PmVudHJ5LnRhcmdldClcbiAgICAgICAgICBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF0gPSBlbnRyeVxuICAgICAgICB9KVxuXG4gICAgICAgIGluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBub3RJblZpZXdDYWNoZSA9IG51bGxcbiAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0luVmlldycpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBjb250YWluZXIucGFyZW50RWxlbWVudCxcbiAgICAgICAgdGhyZXNob2xkXG4gICAgICB9XG4gICAgKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiBpbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHNsaWRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGludGVyc2VjdGlvbk9ic2VydmVyKSBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJblZpZXdMaXN0KGluVmlldzogYm9vbGVhbik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gb2JqZWN0S2V5cyhpbnRlcnNlY3Rpb25FbnRyeU1hcCkucmVkdWNlKFxuICAgICAgKGxpc3Q6IG51bWJlcltdLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleClcbiAgICAgICAgY29uc3QgeyBpc0ludGVyc2VjdGluZyB9ID0gaW50ZXJzZWN0aW9uRW50cnlNYXBbaW5kZXhdXG4gICAgICAgIGNvbnN0IGluVmlld01hdGNoID0gaW5WaWV3ICYmIGlzSW50ZXJzZWN0aW5nXG4gICAgICAgIGNvbnN0IG5vdEluVmlld01hdGNoID0gIWluVmlldyAmJiAhaXNJbnRlcnNlY3RpbmdcblxuICAgICAgICBpZiAoaW5WaWV3TWF0Y2ggfHwgbm90SW5WaWV3TWF0Y2gpIGxpc3QucHVzaChpbmRleClcbiAgICAgICAgcmV0dXJuIGxpc3RcbiAgICAgIH0sXG4gICAgICBbXVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldChpblZpZXc6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICAgIGlmIChpblZpZXcgJiYgaW5WaWV3Q2FjaGUpIHJldHVybiBpblZpZXdDYWNoZVxuICAgIGlmICghaW5WaWV3ICYmIG5vdEluVmlld0NhY2hlKSByZXR1cm4gbm90SW5WaWV3Q2FjaGVcblxuICAgIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3KVxuXG4gICAgaWYgKGluVmlldykgaW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcbiAgICBpZiAoIWluVmlldykgbm90SW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBzbGlkZUluZGV4ZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc0luVmlld1R5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIGdldFxuICB9XG5cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVNpemVzVHlwZSA9IHtcbiAgc2xpZGVTaXplczogbnVtYmVyW11cbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXVxuICBzdGFydEdhcDogbnVtYmVyXG4gIGVuZEdhcDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZVNpemVzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICByZWFkRWRnZUdhcDogYm9vbGVhbixcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IFNsaWRlU2l6ZXNUeXBlIHtcbiAgY29uc3QgeyBtZWFzdXJlU2l6ZSwgc3RhcnRFZGdlLCBlbmRFZGdlIH0gPSBheGlzXG4gIGNvbnN0IHdpdGhFZGdlR2FwID0gc2xpZGVSZWN0c1swXSAmJiByZWFkRWRnZUdhcFxuICBjb25zdCBzdGFydEdhcCA9IG1lYXN1cmVTdGFydEdhcCgpXG4gIGNvbnN0IGVuZEdhcCA9IG1lYXN1cmVFbmRHYXAoKVxuICBjb25zdCBzbGlkZVNpemVzID0gc2xpZGVSZWN0cy5tYXAobWVhc3VyZVNpemUpXG4gIGNvbnN0IHNsaWRlU2l6ZXNXaXRoR2FwcyA9IG1lYXN1cmVXaXRoR2FwcygpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVN0YXJ0R2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzbGlkZVJlY3QgPSBzbGlkZVJlY3RzWzBdXG4gICAgcmV0dXJuIG1hdGhBYnMoY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0W3N0YXJ0RWRnZV0pXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlRW5kR2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJyYXlMYXN0KHNsaWRlcykpXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShgbWFyZ2luLSR7ZW5kRWRnZX1gKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVXaXRoR2FwcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNsaWRlUmVjdHNcbiAgICAgIC5tYXAoKHJlY3QsIGluZGV4LCByZWN0cykgPT4ge1xuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgocmVjdHMsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgc3RhcnRHYXBcbiAgICAgICAgaWYgKGlzTGFzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgZW5kR2FwXG4gICAgICAgIHJldHVybiByZWN0c1tpbmRleCArIDFdW3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV1cbiAgICAgIH0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVNpemVzVHlwZSA9IHtcbiAgICBzbGlkZVNpemVzLFxuICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXBcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7XG4gIGFycmF5S2V5cyxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleCxcbiAgaXNOdW1iZXIsXG4gIG1hdGhBYnNcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlID0gJ2F1dG8nIHwgbnVtYmVyXG5cbmV4cG9ydCB0eXBlIFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgZ3JvdXBTbGlkZXM6IDxUeXBlPihhcnJheTogVHlwZVtdKSA9PiBUeXBlW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzVG9TY3JvbGwoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlLFxuICBsb29wOiBib29sZWFuLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzdGFydEdhcDogbnVtYmVyLFxuICBlbmRHYXA6IG51bWJlcixcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2xpZGVzVG9TY3JvbGxUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UsIGRpcmVjdGlvbiB9ID0gYXhpc1xuICBjb25zdCBncm91cEJ5TnVtYmVyID0gaXNOdW1iZXIoc2xpZGVzVG9TY3JvbGwpXG5cbiAgZnVuY3Rpb24gYnlOdW1iZXI8VHlwZT4oYXJyYXk6IFR5cGVbXSwgZ3JvdXBTaXplOiBudW1iZXIpOiBUeXBlW11bXSB7XG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgJSBncm91cFNpemUgPT09IDApXG4gICAgICAubWFwKChpKSA9PiBhcnJheS5zbGljZShpLCBpICsgZ3JvdXBTaXplKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5U2l6ZTxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gW11cblxuICAgIHJldHVybiBhcnJheUtleXMoYXJyYXkpXG4gICAgICAucmVkdWNlKChncm91cHM6IG51bWJlcltdLCByZWN0QiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdEEgPSBhcnJheUxhc3QoZ3JvdXBzKSB8fCAwXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSByZWN0QSA9PT0gMFxuICAgICAgICBjb25zdCBpc0xhc3QgPSByZWN0QiA9PT0gYXJyYXlMYXN0SW5kZXgoYXJyYXkpXG5cbiAgICAgICAgY29uc3QgZWRnZUEgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RBXVtzdGFydEVkZ2VdXG4gICAgICAgIGNvbnN0IGVkZ2VCID0gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0c1tyZWN0Ql1bZW5kRWRnZV1cbiAgICAgICAgY29uc3QgZ2FwQSA9ICFsb29wICYmIGlzRmlyc3QgPyBkaXJlY3Rpb24oc3RhcnRHYXApIDogMFxuICAgICAgICBjb25zdCBnYXBCID0gIWxvb3AgJiYgaXNMYXN0ID8gZGlyZWN0aW9uKGVuZEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IG1hdGhBYnMoZWRnZUIgLSBnYXBCIC0gKGVkZ2VBICsgZ2FwQSkpXG5cbiAgICAgICAgaWYgKGluZGV4ICYmIGNodW5rU2l6ZSA+IHZpZXdTaXplICsgcGl4ZWxUb2xlcmFuY2UpIGdyb3Vwcy5wdXNoKHJlY3RCKVxuICAgICAgICBpZiAoaXNMYXN0KSBncm91cHMucHVzaChhcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBncm91cHNcbiAgICAgIH0sIFtdKVxuICAgICAgLm1hcCgoY3VycmVudFNpemUsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTaXplID0gTWF0aC5tYXgoZ3JvdXBzW2luZGV4IC0gMV0gfHwgMClcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKHByZXZpb3VzU2l6ZSwgY3VycmVudFNpemUpXG4gICAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ3JvdXBTbGlkZXM8VHlwZT4oYXJyYXk6IFR5cGVbXSk6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gZ3JvdXBCeU51bWJlciA/IGJ5TnVtYmVyKGFycmF5LCBzbGlkZXNUb1Njcm9sbCkgOiBieVNpemUoYXJyYXkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNUb1Njcm9sbFR5cGUgPSB7XG4gICAgZ3JvdXBTbGlkZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50IH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQge1xuICBBbmltYXRpb25zLFxuICBBbmltYXRpb25zVHlwZSxcbiAgQW5pbWF0aW9uc1VwZGF0ZVR5cGUsXG4gIEFuaW1hdGlvbnNSZW5kZXJUeXBlXG59IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IEF4aXMsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgQ291bnRlciwgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnSGFuZGxlciwgRHJhZ0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IERyYWdUcmFja2VyIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmUsIEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSwgTm9kZVJlY3RzIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXcsIFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlciwgUmVzaXplSGFuZGxlclR5cGUgfSBmcm9tICcuL1Jlc2l6ZUhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5LCBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbEJvdW5kcywgU2Nyb2xsQm91bmRzVHlwZSB9IGZyb20gJy4vU2Nyb2xsQm91bmRzJ1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbiB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNjcm9sbExpbWl0IH0gZnJvbSAnLi9TY3JvbGxMaW1pdCdcbmltcG9ydCB7IFNjcm9sbExvb3BlciwgU2Nyb2xsTG9vcGVyVHlwZSB9IGZyb20gJy4vU2Nyb2xsTG9vcGVyJ1xuaW1wb3J0IHsgU2Nyb2xsUHJvZ3Jlc3MsIFNjcm9sbFByb2dyZXNzVHlwZSB9IGZyb20gJy4vU2Nyb2xsUHJvZ3Jlc3MnXG5pbXBvcnQgeyBTY3JvbGxTbmFwcyB9IGZyb20gJy4vU2Nyb2xsU25hcHMnXG5pbXBvcnQgeyBTbGlkZVJlZ2lzdHJ5LCBTbGlkZVJlZ2lzdHJ5VHlwZSB9IGZyb20gJy4vU2xpZGVSZWdpc3RyeSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldCwgU2Nyb2xsVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgU2Nyb2xsVG8sIFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBTbGlkZUZvY3VzLCBTbGlkZUZvY3VzVHlwZSB9IGZyb20gJy4vU2xpZGVGb2N1cydcbmltcG9ydCB7IFNsaWRlTG9vcGVyLCBTbGlkZUxvb3BlclR5cGUgfSBmcm9tICcuL1NsaWRlTG9vcGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlciwgU2xpZGVzSGFuZGxlclR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXcsIFNsaWRlc0luVmlld1R5cGUgfSBmcm9tICcuL1NsaWRlc0luVmlldydcbmltcG9ydCB7IFNsaWRlU2l6ZXMgfSBmcm9tICcuL1NsaWRlU2l6ZXMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbCwgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuaW1wb3J0IHsgYXJyYXlLZXlzLCBhcnJheUxhc3QsIGFycmF5TGFzdEluZGV4LCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFELCBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBFbmdpbmVUeXBlID0ge1xuICBvd25lckRvY3VtZW50OiBEb2N1bWVudFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbiAgYXhpczogQXhpc1R5cGVcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZVxuICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kc1R5cGVcbiAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXJUeXBlXG4gIHNjcm9sbFByb2dyZXNzOiBTY3JvbGxQcm9ncmVzc1R5cGVcbiAgaW5kZXg6IENvdW50ZXJUeXBlXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlXG4gIGxpbWl0OiBMaW1pdFR5cGVcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvZmZzZXRMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHByZXZpb3VzTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZVxuICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXJUeXBlXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlXG4gIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlclR5cGVcbiAgc2xpZGVzSW5WaWV3OiBTbGlkZXNJblZpZXdUeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGVcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGVcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXJUeXBlXG4gIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXJUeXBlXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGVcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlXG4gIHNjcm9sbFNuYXBMaXN0OiBudW1iZXJbXVxuICBzY3JvbGxTbmFwczogbnVtYmVyW11cbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuICBzbGlkZUZvY3VzOiBTbGlkZUZvY3VzVHlwZVxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZVxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRW5naW5lKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IEVuZ2luZVR5cGUge1xuICAvLyBPcHRpb25zXG4gIGNvbnN0IHtcbiAgICBhbGlnbixcbiAgICBheGlzOiBzY3JvbGxBeGlzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGFydEluZGV4LFxuICAgIGxvb3AsXG4gICAgZHVyYXRpb24sXG4gICAgZHJhZ0ZyZWUsXG4gICAgZHJhZ1RocmVzaG9sZCxcbiAgICBpblZpZXdUaHJlc2hvbGQsXG4gICAgc2xpZGVzVG9TY3JvbGw6IGdyb3VwU2xpZGVzLFxuICAgIHNraXBTbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHdhdGNoUmVzaXplLFxuICAgIHdhdGNoU2xpZGVzLFxuICAgIHdhdGNoRHJhZyxcbiAgICB3YXRjaEZvY3VzXG4gIH0gPSBvcHRpb25zXG5cbiAgLy8gTWVhc3VyZW1lbnRzXG4gIGNvbnN0IHBpeGVsVG9sZXJhbmNlID0gMlxuICBjb25zdCBub2RlUmVjdHMgPSBOb2RlUmVjdHMoKVxuICBjb25zdCBjb250YWluZXJSZWN0ID0gbm9kZVJlY3RzLm1lYXN1cmUoY29udGFpbmVyKVxuICBjb25zdCBzbGlkZVJlY3RzID0gc2xpZGVzLm1hcChub2RlUmVjdHMubWVhc3VyZSlcbiAgY29uc3QgYXhpcyA9IEF4aXMoc2Nyb2xsQXhpcywgZGlyZWN0aW9uKVxuICBjb25zdCB2aWV3U2l6ZSA9IGF4aXMubWVhc3VyZVNpemUoY29udGFpbmVyUmVjdClcbiAgY29uc3QgcGVyY2VudE9mVmlldyA9IFBlcmNlbnRPZlZpZXcodmlld1NpemUpXG4gIGNvbnN0IGFsaWdubWVudCA9IEFsaWdubWVudChhbGlnbiwgdmlld1NpemUpXG4gIGNvbnN0IGNvbnRhaW5TbmFwcyA9ICFsb29wICYmICEhY29udGFpblNjcm9sbFxuICBjb25zdCByZWFkRWRnZUdhcCA9IGxvb3AgfHwgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHsgc2xpZGVTaXplcywgc2xpZGVTaXplc1dpdGhHYXBzLCBzdGFydEdhcCwgZW5kR2FwIH0gPSBTbGlkZVNpemVzKFxuICAgIGF4aXMsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlcyxcbiAgICByZWFkRWRnZUdhcCxcbiAgICBvd25lcldpbmRvd1xuICApXG4gIGNvbnN0IHNsaWRlc1RvU2Nyb2xsID0gU2xpZGVzVG9TY3JvbGwoXG4gICAgYXhpcyxcbiAgICB2aWV3U2l6ZSxcbiAgICBncm91cFNsaWRlcyxcbiAgICBsb29wLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXAsXG4gICAgcGl4ZWxUb2xlcmFuY2VcbiAgKVxuICBjb25zdCB7IHNuYXBzLCBzbmFwc0FsaWduZWQgfSA9IFNjcm9sbFNuYXBzKFxuICAgIGF4aXMsXG4gICAgYWxpZ25tZW50LFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzbGlkZXNUb1Njcm9sbFxuICApXG4gIGNvbnN0IGNvbnRlbnRTaXplID0gLWFycmF5TGFzdChzbmFwcykgKyBhcnJheUxhc3Qoc2xpZGVTaXplc1dpdGhHYXBzKVxuICBjb25zdCB7IHNuYXBzQ29udGFpbmVkLCBzY3JvbGxDb250YWluTGltaXQgfSA9IFNjcm9sbENvbnRhaW4oXG4gICAgdmlld1NpemUsXG4gICAgY29udGVudFNpemUsXG4gICAgc25hcHNBbGlnbmVkLFxuICAgIGNvbnRhaW5TY3JvbGwsXG4gICAgcGl4ZWxUb2xlcmFuY2VcbiAgKVxuICBjb25zdCBzY3JvbGxTbmFwcyA9IGNvbnRhaW5TbmFwcyA/IHNuYXBzQ29udGFpbmVkIDogc25hcHNBbGlnbmVkXG4gIGNvbnN0IHsgbGltaXQgfSA9IFNjcm9sbExpbWl0KGNvbnRlbnRTaXplLCBzY3JvbGxTbmFwcywgbG9vcClcblxuICAvLyBJbmRleGVzXG4gIGNvbnN0IGluZGV4ID0gQ291bnRlcihhcnJheUxhc3RJbmRleChzY3JvbGxTbmFwcyksIHN0YXJ0SW5kZXgsIGxvb3ApXG4gIGNvbnN0IGluZGV4UHJldmlvdXMgPSBpbmRleC5jbG9uZSgpXG4gIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGFycmF5S2V5cyhzbGlkZXMpXG5cbiAgLy8gQW5pbWF0aW9uXG4gIGNvbnN0IHVwZGF0ZTogQW5pbWF0aW9uc1VwZGF0ZVR5cGUgPSAoe1xuICAgIGRyYWdIYW5kbGVyLFxuICAgIHNjcm9sbEJvZHksXG4gICAgc2Nyb2xsQm91bmRzLFxuICAgIG9wdGlvbnM6IHsgbG9vcCB9XG4gIH0pID0+IHtcbiAgICBpZiAoIWxvb3ApIHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSlcbiAgICBzY3JvbGxCb2R5LnNlZWsoKVxuICB9XG5cbiAgY29uc3QgcmVuZGVyOiBBbmltYXRpb25zUmVuZGVyVHlwZSA9IChcbiAgICB7XG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgdHJhbnNsYXRlLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgICBzY3JvbGxMb29wZXIsXG4gICAgICBzbGlkZUxvb3BlcixcbiAgICAgIGRyYWdIYW5kbGVyLFxuICAgICAgYW5pbWF0aW9uLFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgc2Nyb2xsQm91bmRzLFxuICAgICAgb3B0aW9uczogeyBsb29wIH1cbiAgICB9LFxuICAgIGFscGhhXG4gICkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFNldHRsZSA9IHNjcm9sbEJvZHkuc2V0dGxlZCgpXG4gICAgY29uc3Qgd2l0aGluQm91bmRzID0gIXNjcm9sbEJvdW5kcy5zaG91bGRDb25zdHJhaW4oKVxuICAgIGNvbnN0IGhhc1NldHRsZWQgPSBsb29wID8gc2hvdWxkU2V0dGxlIDogc2hvdWxkU2V0dGxlICYmIHdpdGhpbkJvdW5kc1xuICAgIGNvbnN0IGhhc1NldHRsZWRBbmRJZGxlID0gaGFzU2V0dGxlZCAmJiAhZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKVxuXG4gICAgaWYgKGhhc1NldHRsZWRBbmRJZGxlKSBhbmltYXRpb24uc3RvcCgpXG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRMb2NhdGlvbiA9XG4gICAgICBsb2NhdGlvbi5nZXQoKSAqIGFscGhhICsgcHJldmlvdXNMb2NhdGlvbi5nZXQoKSAqICgxIC0gYWxwaGEpXG5cbiAgICBvZmZzZXRMb2NhdGlvbi5zZXQoaW50ZXJwb2xhdGVkTG9jYXRpb24pXG5cbiAgICBpZiAobG9vcCkge1xuICAgICAgc2Nyb2xsTG9vcGVyLmxvb3Aoc2Nyb2xsQm9keS5kaXJlY3Rpb24oKSlcbiAgICAgIHNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZS50byhvZmZzZXRMb2NhdGlvbi5nZXQoKSlcblxuICAgIGlmIChoYXNTZXR0bGVkQW5kSWRsZSkgZXZlbnRIYW5kbGVyLmVtaXQoJ3NldHRsZScpXG4gICAgaWYgKCFoYXNTZXR0bGVkKSBldmVudEhhbmRsZXIuZW1pdCgnc2Nyb2xsJylcbiAgfVxuXG4gIGNvbnN0IGFuaW1hdGlvbiA9IEFuaW1hdGlvbnMoXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICAoKSA9PiB1cGRhdGUoZW5naW5lKSxcbiAgICAoYWxwaGE6IG51bWJlcikgPT4gcmVuZGVyKGVuZ2luZSwgYWxwaGEpXG4gIClcblxuICAvLyBTaGFyZWRcbiAgY29uc3QgZnJpY3Rpb24gPSAwLjY4XG4gIGNvbnN0IHN0YXJ0TG9jYXRpb24gPSBzY3JvbGxTbmFwc1tpbmRleC5nZXQoKV1cbiAgY29uc3QgbG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBwcmV2aW91c0xvY2F0aW9uID0gVmVjdG9yMUQoc3RhcnRMb2NhdGlvbilcbiAgY29uc3Qgb2Zmc2V0TG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCB0YXJnZXQgPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBzY3JvbGxCb2R5ID0gU2Nyb2xsQm9keShcbiAgICBsb2NhdGlvbixcbiAgICBvZmZzZXRMb2NhdGlvbixcbiAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgIHRhcmdldCxcbiAgICBkdXJhdGlvbixcbiAgICBmcmljdGlvblxuICApXG4gIGNvbnN0IHNjcm9sbFRhcmdldCA9IFNjcm9sbFRhcmdldChcbiAgICBsb29wLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIGNvbnRlbnRTaXplLFxuICAgIGxpbWl0LFxuICAgIHRhcmdldFxuICApXG4gIGNvbnN0IHNjcm9sbFRvID0gU2Nyb2xsVG8oXG4gICAgYW5pbWF0aW9uLFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgdGFyZ2V0LFxuICAgIGV2ZW50SGFuZGxlclxuICApXG4gIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gU2Nyb2xsUHJvZ3Jlc3MobGltaXQpXG4gIGNvbnN0IGV2ZW50U3RvcmUgPSBFdmVudFN0b3JlKClcbiAgY29uc3Qgc2xpZGVzSW5WaWV3ID0gU2xpZGVzSW5WaWV3KFxuICAgIGNvbnRhaW5lcixcbiAgICBzbGlkZXMsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGluVmlld1RocmVzaG9sZFxuICApXG4gIGNvbnN0IHsgc2xpZGVSZWdpc3RyeSB9ID0gU2xpZGVSZWdpc3RyeShcbiAgICBjb250YWluU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxDb250YWluTGltaXQsXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgc2xpZGVJbmRleGVzXG4gIClcbiAgY29uc3Qgc2xpZGVGb2N1cyA9IFNsaWRlRm9jdXMoXG4gICAgcm9vdCxcbiAgICBzbGlkZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzY3JvbGxUbyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIGV2ZW50U3RvcmUsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIHdhdGNoRm9jdXNcbiAgKVxuXG4gIC8vIEVuZ2luZVxuICBjb25zdCBlbmdpbmU6IEVuZ2luZVR5cGUgPSB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIGFuaW1hdGlvbixcbiAgICBheGlzLFxuICAgIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlcihcbiAgICAgIGF4aXMsXG4gICAgICByb290LFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgdGFyZ2V0LFxuICAgICAgRHJhZ1RyYWNrZXIoYXhpcywgb3duZXJXaW5kb3cpLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBhbmltYXRpb24sXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBzY3JvbGxUYXJnZXQsXG4gICAgICBpbmRleCxcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgICBkcmFnRnJlZSxcbiAgICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgICBza2lwU25hcHMsXG4gICAgICBmcmljdGlvbixcbiAgICAgIHdhdGNoRHJhZ1xuICAgICksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBwZXJjZW50T2ZWaWV3LFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgbGltaXQsXG4gICAgbG9jYXRpb24sXG4gICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICBvcHRpb25zLFxuICAgIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXIoXG4gICAgICBjb250YWluZXIsXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIHNsaWRlcyxcbiAgICAgIGF4aXMsXG4gICAgICB3YXRjaFJlc2l6ZSxcbiAgICAgIG5vZGVSZWN0c1xuICAgICksXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kcyhcbiAgICAgIGxpbWl0LFxuICAgICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgICB0YXJnZXQsXG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgcGVyY2VudE9mVmlld1xuICAgICksXG4gICAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXIoY29udGVudFNpemUsIGxpbWl0LCBvZmZzZXRMb2NhdGlvbiwgW1xuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgICB0YXJnZXRcbiAgICBdKSxcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdDogc2Nyb2xsU25hcHMubWFwKHNjcm9sbFByb2dyZXNzLmdldCksXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgc2Nyb2xsVGFyZ2V0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlcihcbiAgICAgIGF4aXMsXG4gICAgICB2aWV3U2l6ZSxcbiAgICAgIGNvbnRlbnRTaXplLFxuICAgICAgc2xpZGVTaXplcyxcbiAgICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICAgIHNuYXBzLFxuICAgICAgc2Nyb2xsU25hcHMsXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHNsaWRlc1xuICAgICksXG4gICAgc2xpZGVGb2N1cyxcbiAgICBzbGlkZXNIYW5kbGVyOiBTbGlkZXNIYW5kbGVyKGNvbnRhaW5lciwgZXZlbnRIYW5kbGVyLCB3YXRjaFNsaWRlcyksXG4gICAgc2xpZGVzSW5WaWV3LFxuICAgIHNsaWRlSW5kZXhlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNsaWRlc1RvU2Nyb2xsLFxuICAgIHRhcmdldCxcbiAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBjb250YWluZXIpXG4gIH1cblxuICByZXR1cm4gZW5naW5lXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcblxudHlwZSBDYWxsYmFja1R5cGUgPSAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLCBldnQ6IEVtYmxhRXZlbnRUeXBlKSA9PiB2b2lkXG50eXBlIExpc3RlbmVyc1R5cGUgPSBQYXJ0aWFsPHsgW2tleSBpbiBFbWJsYUV2ZW50VHlwZV06IENhbGxiYWNrVHlwZVtdIH0+XG5cbmV4cG9ydCB0eXBlIEVtYmxhRXZlbnRUeXBlID0gRW1ibGFFdmVudExpc3RUeXBlW2tleW9mIEVtYmxhRXZlbnRMaXN0VHlwZV1cblxuZXhwb3J0IGludGVyZmFjZSBFbWJsYUV2ZW50TGlzdFR5cGUge1xuICBpbml0OiAnaW5pdCdcbiAgcG9pbnRlckRvd246ICdwb2ludGVyRG93bidcbiAgcG9pbnRlclVwOiAncG9pbnRlclVwJ1xuICBzbGlkZXNDaGFuZ2VkOiAnc2xpZGVzQ2hhbmdlZCdcbiAgc2xpZGVzSW5WaWV3OiAnc2xpZGVzSW5WaWV3J1xuICBzY3JvbGw6ICdzY3JvbGwnXG4gIHNlbGVjdDogJ3NlbGVjdCdcbiAgc2V0dGxlOiAnc2V0dGxlJ1xuICBkZXN0cm95OiAnZGVzdHJveSdcbiAgcmVJbml0OiAncmVJbml0J1xuICByZXNpemU6ICdyZXNpemUnXG4gIHNsaWRlRm9jdXNTdGFydDogJ3NsaWRlRm9jdXNTdGFydCdcbiAgc2xpZGVGb2N1czogJ3NsaWRlRm9jdXMnXG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50SGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZW1pdDogKGV2dDogRW1ibGFFdmVudFR5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb246IChldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKSA9PiBFdmVudEhhbmRsZXJUeXBlXG4gIG9mZjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgbGV0IGxpc3RlbmVyczogTGlzdGVuZXJzVHlwZSA9IHt9XG4gIGxldCBhcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBhcGkgPSBlbWJsYUFwaVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dDogRW1ibGFFdmVudFR5cGUpOiBDYWxsYmFja1R5cGVbXSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1tldnRdIHx8IFtdXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2dDogRW1ibGFFdmVudFR5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBnZXRMaXN0ZW5lcnMoZXZ0KS5mb3JFYWNoKChlKSA9PiBlKGFwaSwgZXZ0KSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb24oZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGxpc3RlbmVyc1tldnRdID0gZ2V0TGlzdGVuZXJzKGV2dCkuY29uY2F0KFtjYl0pXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5maWx0ZXIoKGUpID0+IGUgIT09IGNiKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSB7fVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGVtaXQsXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExvb3NlT3B0aW9uc1R5cGUsIENyZWF0ZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cywgb2JqZWN0c01lcmdlRGVlcCwgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgT3B0aW9uc1R5cGUgPSBQYXJ0aWFsPENyZWF0ZU9wdGlvbnNUeXBlPExvb3NlT3B0aW9uc1R5cGU+PlxuXG5leHBvcnQgdHlwZSBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gIG1lcmdlT3B0aW9uczogPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICkgPT4gVHlwZUFcbiAgb3B0aW9uc0F0TWVkaWE6IDxUeXBlIGV4dGVuZHMgT3B0aW9uc1R5cGU+KG9wdGlvbnM6IFR5cGUpID0+IFR5cGVcbiAgb3B0aW9uc01lZGlhUXVlcmllczogKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKSA9PiBNZWRpYVF1ZXJ5TGlzdFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdzogV2luZG93VHlwZSk6IE9wdGlvbnNIYW5kbGVyVHlwZSB7XG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9uczxUeXBlQSBleHRlbmRzIE9wdGlvbnNUeXBlLCBUeXBlQiBleHRlbmRzIE9wdGlvbnNUeXBlPihcbiAgICBvcHRpb25zQTogVHlwZUEsXG4gICAgb3B0aW9uc0I/OiBUeXBlQlxuICApOiBUeXBlQSB7XG4gICAgcmV0dXJuIDxUeXBlQT5vYmplY3RzTWVyZ2VEZWVwKG9wdGlvbnNBLCBvcHRpb25zQiB8fCB7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wdGlvbnNBdE1lZGlhPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSk6IFR5cGUge1xuICAgIGNvbnN0IG9wdGlvbnNBdE1lZGlhID0gb3B0aW9ucy5icmVha3BvaW50cyB8fCB7fVxuICAgIGNvbnN0IG1hdGNoZWRNZWRpYU9wdGlvbnMgPSBvYmplY3RLZXlzKG9wdGlvbnNBdE1lZGlhKVxuICAgICAgLmZpbHRlcigobWVkaWEpID0+IG93bmVyV2luZG93Lm1hdGNoTWVkaWEobWVkaWEpLm1hdGNoZXMpXG4gICAgICAubWFwKChtZWRpYSkgPT4gb3B0aW9uc0F0TWVkaWFbbWVkaWFdKVxuICAgICAgLnJlZHVjZSgoYSwgbWVkaWFPcHRpb24pID0+IG1lcmdlT3B0aW9ucyhhLCBtZWRpYU9wdGlvbiksIHt9KVxuXG4gICAgcmV0dXJuIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBtYXRjaGVkTWVkaWFPcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc01lZGlhUXVlcmllcyhvcHRpb25zTGlzdDogT3B0aW9uc1R5cGVbXSk6IE1lZGlhUXVlcnlMaXN0W10ge1xuICAgIHJldHVybiBvcHRpb25zTGlzdFxuICAgICAgLm1hcCgob3B0aW9ucykgPT4gb2JqZWN0S2V5cyhvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9KSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgbWVkaWFRdWVyaWVzKSA9PiBhY2MuY29uY2F0KG1lZGlhUXVlcmllcyksIFtdKVxuICAgICAgLm1hcChvd25lcldpbmRvdy5tYXRjaE1lZGlhKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogT3B0aW9uc0hhbmRsZXJUeXBlID0ge1xuICAgIG1lcmdlT3B0aW9ucyxcbiAgICBvcHRpb25zQXRNZWRpYSxcbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgT3B0aW9uc0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcblxuZXhwb3J0IHR5cGUgUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICkgPT4gRW1ibGFQbHVnaW5zVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQbHVnaW5zSGFuZGxlcihcbiAgb3B0aW9uc0hhbmRsZXI6IE9wdGlvbnNIYW5kbGVyVHlwZVxuKTogUGx1Z2luc0hhbmRsZXJUeXBlIHtcbiAgbGV0IGFjdGl2ZVBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdID0gW11cblxuICBmdW5jdGlvbiBpbml0KFxuICAgIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBwbHVnaW5zOiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gcGx1Z2lucy5maWx0ZXIoXG4gICAgICAoeyBvcHRpb25zIH0pID0+IG9wdGlvbnNIYW5kbGVyLm9wdGlvbnNBdE1lZGlhKG9wdGlvbnMpLmFjdGl2ZSAhPT0gZmFsc2VcbiAgICApXG4gICAgYWN0aXZlUGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5pbml0KGVtYmxhQXBpLCBvcHRpb25zSGFuZGxlcikpXG5cbiAgICByZXR1cm4gcGx1Z2lucy5yZWR1Y2UoXG4gICAgICAobWFwLCBwbHVnaW4pID0+IE9iamVjdC5hc3NpZ24obWFwLCB7IFtwbHVnaW4ubmFtZV06IHBsdWdpbiB9KSxcbiAgICAgIHt9XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gYWN0aXZlUGx1Z2lucy5maWx0ZXIoKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFBsdWdpbnNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVUeXBlIH0gZnJvbSAnLi9FbmdpbmUnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyLCBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucywgRW1ibGFPcHRpb25zVHlwZSwgT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlciB9IGZyb20gJy4vT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBQbHVnaW5zSGFuZGxlciB9IGZyb20gJy4vUGx1Z2luc0hhbmRsZXInXG5pbXBvcnQgeyBFbWJsYVBsdWdpbnNUeXBlLCBFbWJsYVBsdWdpblR5cGUgfSBmcm9tICcuL1BsdWdpbnMnXG5pbXBvcnQgeyBpc1N0cmluZywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICBjYW5TY3JvbGxOZXh0OiAoKSA9PiBib29sZWFuXG4gIGNhblNjcm9sbFByZXY6ICgpID0+IGJvb2xlYW5cbiAgY29udGFpbmVyTm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgaW50ZXJuYWxFbmdpbmU6ICgpID0+IEVuZ2luZVR5cGVcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBvZmY6IEV2ZW50SGFuZGxlclR5cGVbJ29mZiddXG4gIG9uOiBFdmVudEhhbmRsZXJUeXBlWydvbiddXG4gIGVtaXQ6IEV2ZW50SGFuZGxlclR5cGVbJ2VtaXQnXVxuICBwbHVnaW5zOiAoKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIHByZXZpb3VzU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHJlSW5pdDogKG9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLCBwbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW10pID0+IHZvaWRcbiAgcm9vdE5vZGU6ICgpID0+IEhUTUxFbGVtZW50XG4gIHNjcm9sbE5leHQ6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcmV2OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgc2Nyb2xsUHJvZ3Jlc3M6ICgpID0+IG51bWJlclxuICBzY3JvbGxTbmFwTGlzdDogKCkgPT4gbnVtYmVyW11cbiAgc2Nyb2xsVG86IChpbmRleDogbnVtYmVyLCBqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzZWxlY3RlZFNjcm9sbFNuYXA6ICgpID0+IG51bWJlclxuICBzbGlkZU5vZGVzOiAoKSA9PiBIVE1MRWxlbWVudFtdXG4gIHNsaWRlc0luVmlldzogKCkgPT4gbnVtYmVyW11cbiAgc2xpZGVzTm90SW5WaWV3OiAoKSA9PiBudW1iZXJbXVxufVxuXG5mdW5jdGlvbiBFbWJsYUNhcm91c2VsKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgdXNlck9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICB1c2VyUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4pOiBFbWJsYUNhcm91c2VsVHlwZSB7XG4gIGNvbnN0IG93bmVyRG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnRcbiAgY29uc3Qgb3duZXJXaW5kb3cgPSA8V2luZG93VHlwZT5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3XG4gIGNvbnN0IG9wdGlvbnNIYW5kbGVyID0gT3B0aW9uc0hhbmRsZXIob3duZXJXaW5kb3cpXG4gIGNvbnN0IHBsdWdpbnNIYW5kbGVyID0gUGx1Z2luc0hhbmRsZXIob3B0aW9uc0hhbmRsZXIpXG4gIGNvbnN0IG1lZGlhSGFuZGxlcnMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyKClcbiAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhLCBvcHRpb25zTWVkaWFRdWVyaWVzIH0gPSBvcHRpb25zSGFuZGxlclxuICBjb25zdCB7IG9uLCBvZmYsIGVtaXQgfSA9IGV2ZW50SGFuZGxlclxuICBjb25zdCByZUluaXQgPSByZUFjdGl2YXRlXG5cbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG4gIGxldCBlbmdpbmU6IEVuZ2luZVR5cGVcbiAgbGV0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBFbWJsYUNhcm91c2VsLmdsb2JhbE9wdGlvbnMpXG4gIGxldCBvcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlKVxuICBsZXQgcGx1Z2luTGlzdDogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuICBsZXQgcGx1Z2luQXBpczogRW1ibGFQbHVnaW5zVHlwZVxuXG4gIGxldCBjb250YWluZXI6IEhUTUxFbGVtZW50XG4gIGxldCBzbGlkZXM6IEhUTUxFbGVtZW50W11cblxuICBmdW5jdGlvbiBzdG9yZUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyOiB1c2VyQ29udGFpbmVyLCBzbGlkZXM6IHVzZXJTbGlkZXMgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IGN1c3RvbUNvbnRhaW5lciA9IGlzU3RyaW5nKHVzZXJDb250YWluZXIpXG4gICAgICA/IHJvb3QucXVlcnlTZWxlY3Rvcih1c2VyQ29udGFpbmVyKVxuICAgICAgOiB1c2VyQ29udGFpbmVyXG4gICAgY29udGFpbmVyID0gPEhUTUxFbGVtZW50PihjdXN0b21Db250YWluZXIgfHwgcm9vdC5jaGlsZHJlblswXSlcblxuICAgIGNvbnN0IGN1c3RvbVNsaWRlcyA9IGlzU3RyaW5nKHVzZXJTbGlkZXMpXG4gICAgICA/IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHVzZXJTbGlkZXMpXG4gICAgICA6IHVzZXJTbGlkZXNcbiAgICBzbGlkZXMgPSA8SFRNTEVsZW1lbnRbXT5bXS5zbGljZS5jYWxsKGN1c3RvbVNsaWRlcyB8fCBjb250YWluZXIuY2hpbGRyZW4pXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbmdpbmUob3B0aW9uczogT3B0aW9uc1R5cGUpOiBFbmdpbmVUeXBlIHtcbiAgICBjb25zdCBlbmdpbmUgPSBFbmdpbmUoXG4gICAgICByb290LFxuICAgICAgY29udGFpbmVyLFxuICAgICAgc2xpZGVzLFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgb3B0aW9ucyxcbiAgICAgIGV2ZW50SGFuZGxlclxuICAgIClcblxuICAgIGlmIChvcHRpb25zLmxvb3AgJiYgIWVuZ2luZS5zbGlkZUxvb3Blci5jYW5Mb29wKCkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnNXaXRob3V0TG9vcCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgbG9vcDogZmFsc2UgfSlcbiAgICAgIHJldHVybiBjcmVhdGVFbmdpbmUob3B0aW9uc1dpdGhvdXRMb29wKVxuICAgIH1cbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgIG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB3aXRoT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEob3B0aW9uc0Jhc2UpXG4gICAgcGx1Z2luTGlzdCA9IHdpdGhQbHVnaW5zIHx8IHBsdWdpbkxpc3RcblxuICAgIHN0b3JlRWxlbWVudHMoKVxuXG4gICAgZW5naW5lID0gY3JlYXRlRW5naW5lKG9wdGlvbnMpXG5cbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzKFtcbiAgICAgIG9wdGlvbnNCYXNlLFxuICAgICAgLi4ucGx1Z2luTGlzdC5tYXAoKHsgb3B0aW9ucyB9KSA9PiBvcHRpb25zKVxuICAgIF0pLmZvckVhY2goKHF1ZXJ5KSA9PiBtZWRpYUhhbmRsZXJzLmFkZChxdWVyeSwgJ2NoYW5nZScsIHJlQWN0aXZhdGUpKVxuXG4gICAgaWYgKCFvcHRpb25zLmFjdGl2ZSkgcmV0dXJuXG5cbiAgICBlbmdpbmUudHJhbnNsYXRlLnRvKGVuZ2luZS5sb2NhdGlvbi5nZXQoKSlcbiAgICBlbmdpbmUuYW5pbWF0aW9uLmluaXQoKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlRm9jdXMuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5ldmVudEhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmluaXQoc2VsZilcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBpZiAoZW5naW5lLm9wdGlvbnMubG9vcCkgZW5naW5lLnNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIGlmIChjb250YWluZXIub2Zmc2V0UGFyZW50ICYmIHNsaWRlcy5sZW5ndGgpIGVuZ2luZS5kcmFnSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBwbHVnaW5BcGlzID0gcGx1Z2luc0hhbmRsZXIuaW5pdChzZWxmLCBwbHVnaW5MaXN0KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVBY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBhY3RpdmF0ZShtZXJnZU9wdGlvbnMoeyBzdGFydEluZGV4IH0sIHdpdGhPcHRpb25zKSwgd2l0aFBsdWdpbnMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3JlSW5pdCcpXG4gIH1cblxuICBmdW5jdGlvbiBkZUFjdGl2YXRlKCk6IHZvaWQge1xuICAgIGVuZ2luZS5kcmFnSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuZXZlbnRTdG9yZS5jbGVhcigpXG4gICAgZW5naW5lLnRyYW5zbGF0ZS5jbGVhcigpXG4gICAgZW5naW5lLnNsaWRlTG9vcGVyLmNsZWFyKClcbiAgICBlbmdpbmUucmVzaXplSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSW5WaWV3LmRlc3Ryb3koKVxuICAgIGVuZ2luZS5hbmltYXRpb24uZGVzdHJveSgpXG4gICAgcGx1Z2luc0hhbmRsZXIuZGVzdHJveSgpXG4gICAgbWVkaWFIYW5kbGVycy5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBldmVudEhhbmRsZXIuZW1pdCgnZGVzdHJveScpXG4gICAgZXZlbnRIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuLCBkaXJlY3Rpb24/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlIHx8IGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZW5naW5lLnNjcm9sbEJvZHlcbiAgICAgIC51c2VCYXNlRnJpY3Rpb24oKVxuICAgICAgLnVzZUR1cmF0aW9uKGp1bXAgPT09IHRydWUgPyAwIDogb3B0aW9ucy5kdXJhdGlvbilcbiAgICBlbmdpbmUuc2Nyb2xsVG8uaW5kZXgoaW5kZXgsIGRpcmVjdGlvbiB8fCAwKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsTmV4dChqdW1wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IG5leHQgPSBlbmdpbmUuaW5kZXguYWRkKDEpLmdldCgpXG4gICAgc2Nyb2xsVG8obmV4dCwganVtcCwgLTEpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcmV2KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgc2Nyb2xsVG8ocHJldiwganVtcCwgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbE5leHQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICByZXR1cm4gbmV4dCAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbFByZXYoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgcmV0dXJuIHByZXYgIT09IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxTbmFwTGlzdCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zY3JvbGxTbmFwTGlzdFxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFByb2dyZXNzLmdldChlbmdpbmUub2Zmc2V0TG9jYXRpb24uZ2V0KCkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RlZFNjcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4LmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1Njcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4UHJldmlvdXMuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc05vdEluVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gcGx1Z2lucygpOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICByZXR1cm4gcGx1Z2luQXBpc1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJuYWxFbmdpbmUoKTogRW5naW5lVHlwZSB7XG4gICAgcmV0dXJuIGVuZ2luZVxuICB9XG5cbiAgZnVuY3Rpb24gcm9vdE5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiByb290XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZU5vZGVzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBzbGlkZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICAgIGNhblNjcm9sbE5leHQsXG4gICAgY2FuU2Nyb2xsUHJldixcbiAgICBjb250YWluZXJOb2RlLFxuICAgIGludGVybmFsRW5naW5lLFxuICAgIGRlc3Ryb3ksXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGVtaXQsXG4gICAgcGx1Z2lucyxcbiAgICBwcmV2aW91c1Njcm9sbFNuYXAsXG4gICAgcmVJbml0LFxuICAgIHJvb3ROb2RlLFxuICAgIHNjcm9sbE5leHQsXG4gICAgc2Nyb2xsUHJldixcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdCxcbiAgICBzY3JvbGxUbyxcbiAgICBzZWxlY3RlZFNjcm9sbFNuYXAsXG4gICAgc2xpZGVOb2RlcyxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVzTm90SW5WaWV3XG4gIH1cblxuICBhY3RpdmF0ZSh1c2VyT3B0aW9ucywgdXNlclBsdWdpbnMpXG4gIHNldFRpbWVvdXQoKCkgPT4gZXZlbnRIYW5kbGVyLmVtaXQoJ2luaXQnKSwgMClcbiAgcmV0dXJuIHNlbGZcbn1cblxuZGVjbGFyZSBuYW1lc3BhY2UgRW1ibGFDYXJvdXNlbCB7XG4gIGxldCBnbG9iYWxPcHRpb25zOiBFbWJsYU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBFbWJsYUNhcm91c2VsXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1ibGFDYXJvdXNlbCBmcm9tICdlbWJsYS1jYXJvdXNlbCc7XG5pbXBvcnQgQXV0b3BsYXkgZnJvbSAnZW1ibGEtY2Fyb3VzZWwtYXV0b3BsYXknO1xuaW1wb3J0IHsgV2hlZWxHZXN0dXJlc1BsdWdpbiB9IGZyb20gJ2VtYmxhLWNhcm91c2VsLXdoZWVsLWdlc3R1cmVzJztcbmltcG9ydCAnLi9nYWxsZXJ5LnNjc3MnO1xuaW1wb3J0IHtcbiAgICBhZGRUaHVtYkJ1dHRvbnNDbGlja0hhbmRsZXJzLFxuICAgIGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSxcbiAgICBhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzXG59IGZyb20gJy4vYnV0dG9ucy5lczYnO1xuXG5jbGFzcyBZVER5bmFtaWNzR2FsbGVyeSB7XG4gICAgaW5pdChjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LnJtR2FsbGVyeVJlYWR5ID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gY29udGFpbmVyLmRhdGFzZXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICd5JyA6ICd4JztcbiAgICAgICAgY29uc3QgbW9iaWxlT3JpZW50YXRpb24gPSBjb250YWluZXIuZGF0YXNldC5tb2JpbGVPcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbiAgICAgICAgY29uc3QgbW9iaWxlQXhpcyA9IG1vYmlsZU9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3knIDogJ3gnO1xuICAgICAgICBjb25zdCB0aHVtYkF4aXMgPSBjb250YWluZXIuZGF0YXNldC50aHVtYkF4aXMgPT09ICd5JyA/ICd5JyA6ICd4JztcbiAgICAgICAgY29uc3QgbW9iaWxlVGh1bWJBeGlzID0gY29udGFpbmVyLmRhdGFzZXQudGh1bWJNb2JpbGVBeGlzID09PSAneScgPyAneScgOiAneCc7XG4gICAgICAgIGNvbnN0IG5hdk1vZGUgPSBbJ3RodW1ibmF2JywgJ2RvdG5hdiddLmluY2x1ZGVzKGNvbnRhaW5lci5kYXRhc2V0Lm5hdilcbiAgICAgICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQubmF2XG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBsb29wID0gY29udGFpbmVyLmRhdGFzZXQubG9vcCAhPT0gJ2ZhbHNlJztcbiAgICAgICAgY29uc3Qgd2F0Y2hEcmFnID0gY29udGFpbmVyLmRhdGFzZXQuZHJhZyAhPT0gJ2ZhbHNlJztcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLm1heCgxMCwgTWF0aC5taW4oNjAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC5kdXJhdGlvbikgfHwgMzApKTtcbiAgICAgICAgY29uc3QgYXV0b3BsYXkgPSBjb250YWluZXIuZGF0YXNldC5hdXRvcGxheSA9PT0gJ3RydWUnO1xuICAgICAgICBjb25zdCBhdXRvcGxheURlbGF5ID0gTWF0aC5tYXgoMzAwMCwgTWF0aC5taW4oMjAwMDAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC5hdXRvcGxheURlbGF5KSB8fCA3MDAwKSk7XG4gICAgICAgIGNvbnN0IGF1dG9wbGF5UGF1c2UgPSBjb250YWluZXIuZGF0YXNldC5hdXRvcGxheVBhdXNlICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGxvb3AsXG4gICAgICAgICAgICB3YXRjaERyYWcsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgJyhtYXgtd2lkdGg6IDYzOXB4KSc6IHtheGlzOiBtb2JpbGVBeGlzfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvcHRpb25zVGh1bWJzID0ge1xuICAgICAgICAgICAgYWxpZ246ICdzdGFydCcsXG4gICAgICAgICAgICBheGlzOiB0aHVtYkF4aXMsXG4gICAgICAgICAgICBkcmFnRnJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAnKG1heC13aWR0aDogNjM5cHgpJzoge2F4aXM6IG1vYmlsZVRodW1iQXhpc31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X192aWV3cG9ydCcpLFxuICAgICAgICAgICAgdmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX192aWV3cG9ydCcpLFxuICAgICAgICAgICAgcHJldlRodW1iQnRuTm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19wcmV2JyksXG4gICAgICAgICAgICBuZXh0VGh1bWJCdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX25leHQnKSxcbiAgICAgICAgICAgIHByZXZNYWluQnRuTm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3ByZXYnKSxcbiAgICAgICAgICAgIG5leHRNYWluQnRuTm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX25leHQnKTtcblxuICAgICAgICBpZiAoIXZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHkgPSAndHJ1ZSc7XG5cbiAgICAgICAgY29uc3QgcGx1Z2lucyA9IGF1dG9wbGF5ID8gW0F1dG9wbGF5KHtcbiAgICAgICAgICAgIGRlbGF5OiBhdXRvcGxheURlbGF5LFxuICAgICAgICAgICAgc3RvcE9uSW50ZXJhY3Rpb246IGZhbHNlLFxuICAgICAgICAgICAgc3RvcE9uTW91c2VFbnRlcjogYXV0b3BsYXlQYXVzZSxcbiAgICAgICAgICAgIHN0b3BPbkZvY3VzSW46IGF1dG9wbGF5UGF1c2VcbiAgICAgICAgfSldIDogW107XG4gICAgICAgIGNvbnN0IGVtYmxhTWFpbiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlTWFpbkNhcm91c2VsLCBvcHRpb25zLCBwbHVnaW5zKTtcbiAgICAgICAgY29uc3QgY2xlYW51cHMgPSBbXTtcbiAgICAgICAgbGV0IGVtYmxhVGh1bWIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHN5bmNTbGlkZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGVtYmxhTWFpbi5zZWxlY3RlZFNjcm9sbFNuYXAoKTtcbiAgICAgICAgICAgIGVtYmxhTWFpbi5zbGlkZU5vZGVzKCkuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gaW5kZXggPT09IHNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhY3RpdmUgPyAnZmFsc2UnIDogJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCdhLCBidXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdJykuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91cyA9IGNvbnRyb2wuZGF0YXNldC5ybUdhbGxlcnlUYWJpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9PT0gJycgPyBjb250cm9sLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKSA6IGNvbnRyb2wuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2wuZGF0YXNldC5ybUdhbGxlcnlUYWJpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXggPSBjb250cm9sLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSA/PyAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZW1ibGFNYWluLm9uKCdzZWxlY3QnLCBzeW5jU2xpZGVzKS5vbigncmVJbml0Jywgc3luY1NsaWRlcyk7XG4gICAgICAgIHN5bmNTbGlkZXMoKTtcblxuICAgICAgICBpZiAobmF2TW9kZSAmJiB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsKSB7XG4gICAgICAgICAgICBjb25zdCBuYXZOb2RlcyA9IEFycmF5LmZyb20oY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlJykpO1xuXG4gICAgICAgICAgICBpZiAobmF2TW9kZSA9PT0gJ3RodW1ibmF2Jykge1xuICAgICAgICAgICAgICAgIGVtYmxhVGh1bWIgPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwsIG9wdGlvbnNUaHVtYnMsIFtXaGVlbEdlc3R1cmVzUGx1Z2luKCldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW51cHMucHVzaChcbiAgICAgICAgICAgICAgICBhZGRUaHVtYkJ1dHRvbnNDbGlja0hhbmRsZXJzKGVtYmxhTWFpbiwgbmF2Tm9kZXMpLFxuICAgICAgICAgICAgICAgIGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZShlbWJsYU1haW4sIG5hdk5vZGVzLCBlbWJsYVRodW1iKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGVtYmxhVGh1bWIgJiYgcHJldlRodW1iQnRuTm9kZSAmJiBuZXh0VGh1bWJCdG5Ob2RlKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cHMucHVzaChhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzKFxuICAgICAgICAgICAgICAgICAgICBlbWJsYVRodW1iLFxuICAgICAgICAgICAgICAgICAgICBwcmV2VGh1bWJCdG5Ob2RlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0VGh1bWJCdG5Ob2RlXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldk1haW5CdG5Ob2RlICYmIG5leHRNYWluQnRuTm9kZSkge1xuICAgICAgICAgICAgY2xlYW51cHMucHVzaChhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzKFxuICAgICAgICAgICAgICAgIGVtYmxhTWFpbixcbiAgICAgICAgICAgICAgICBwcmV2TWFpbkJ0bk5vZGUsXG4gICAgICAgICAgICAgICAgbmV4dE1haW5CdG5Ob2RlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBlbWJsYU1haW4ub2ZmKCdzZWxlY3QnLCBzeW5jU2xpZGVzKTtcbiAgICAgICAgICAgIGVtYmxhTWFpbi5vZmYoJ3JlSW5pdCcsIHN5bmNTbGlkZXMpO1xuICAgICAgICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcbiAgICAgICAgICAgIGVtYmxhVGh1bWI/LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGVtYmxhTWFpbi5zbGlkZU5vZGVzKCkuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgc2xpZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tZ2FsbGVyeS10YWJpbmRleF0nKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9PT0gJycgPyBjb250cm9sLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKSA6IGNvbnRyb2wuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbnRyb2wuZGF0YXNldC5ybUdhbGxlcnlUYWJpbmRleDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRhaW5lci5kYXRhc2V0LnJtR2FsbGVyeVJlYWR5O1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRhaW5lci5ybUdhbGxlcnlEZXN0cm95O1xuICAgICAgICB9O1xuICAgICAgICBlbWJsYU1haW4ub24oJ2Rlc3Ryb3knLCBjbGVhbnVwKTtcbiAgICAgICAgY29udGFpbmVyLnJtR2FsbGVyeURlc3Ryb3kgPSAoKSA9PiBlbWJsYU1haW4uZGVzdHJveSgpO1xuICAgIH1cbn1cblxuY29uc3QgZ2FsbGVyeVRleHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZy50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ3J1JylcbiAgICA/IHtpbWFnZTogJ9CY0LfQvtCx0YDQsNC20LXQvdC40LUnLCBvcGVuOiAn0J7RgtC60YDRi9GC0Ywg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSd9XG4gICAgOiB7aW1hZ2U6ICdJbWFnZScsIG9wZW46ICdPcGVuIGltYWdlJ307XG5cbmNvbnN0IHByb2R1Y3RTbGlkZSA9IChjb250YWluZXIsIG1lZGlhLCBpbmRleCwgdG90YWwsIHRlbXBsYXRlID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlID0gdGVtcGxhdGU/LmNsb25lTm9kZSh0cnVlKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpZiAoIXRlbXBsYXRlKSBzbGlkZS5jbGFzc05hbWUgPSAnZWwtaXRlbSBybXNsaWRlc2hvd19fc2xpZGUnO1xuICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgncm9sZScsICdncm91cCcpO1xuICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1yb2xlZGVzY3JpcHRpb24nLCAnc2xpZGUnKTtcbiAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgJHtpbmRleCArIDF9IC8gJHt0b3RhbH1gKTtcbiAgICBzbGlkZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgc2xpZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tZ2FsbGVyeS10YWJpbmRleF0nKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgIGNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXJtLWdhbGxlcnktdGFiaW5kZXgnKTtcbiAgICAgICAgY29udHJvbC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgfSk7XG4gICAgY29uc3QgaW1hZ2VXcmFwID0gc2xpZGUucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X19zbGlkZV9faW1hZ2UnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpZiAoIWltYWdlV3JhcC5jbGFzc05hbWUpIGltYWdlV3JhcC5jbGFzc05hbWUgPSAncm1zbGlkZXNob3dfX3NsaWRlX19pbWFnZSB1ay1mbGV4IHVrLWZsZXgtY2VudGVyIHVrLWZsZXgtbWlkZGxlJztcbiAgICBjb25zdCBpbWFnZSA9IGltYWdlV3JhcC5xdWVyeVNlbGVjdG9yKCdpbWcnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWFnZS5zcmMgPSBtZWRpYS5zcmMgfHwgJyc7XG4gICAgaW1hZ2UuYWx0ID0gbWVkaWEuYWx0IHx8ICcnO1xuICAgIGltYWdlLmxvYWRpbmcgPSBjb250YWluZXIuZGF0YXNldC5pbWFnZUxvYWRpbmcgPT09ICdlYWdlcicgPyAnZWFnZXInIDogJ2xhenknO1xuICAgIGlmICghaW1hZ2VXcmFwLmNvbnRhaW5zKGltYWdlKSkgaW1hZ2VXcmFwLnJlcGxhY2VDaGlsZHJlbihpbWFnZSk7XG5cbiAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQubGlnaHRib3ggPT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBsaW5rID0gc2xpZGUucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X19saWdodGJveCcpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgaWYgKCFsaW5rLmNsYXNzTmFtZSkgbGluay5jbGFzc05hbWUgPSAncm1zbGlkZXNob3dfX2xpZ2h0Ym94IHVrLWRpc3BsYXktYmxvY2sgdWstcG9zaXRpb24tcmVsYXRpdmUgdWstdHJhbnNpdGlvbi10b2dnbGUnO1xuICAgICAgICBsaW5rLmhyZWYgPSBtZWRpYS5zcmMgfHwgJyc7XG4gICAgICAgIGxpbmsuZGF0YXNldC5ybUxpZ2h0Ym94ID0gJyc7XG4gICAgICAgIGxpbmsuZGF0YXNldC50eXBlID0gJ2ltYWdlJztcbiAgICAgICAgbGluay5kYXRhc2V0LmFsdCA9IG1lZGlhLmFsdCB8fCAnJztcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgJHtnYWxsZXJ5VGV4dC5vcGVufTogJHttZWRpYS5hbHQgfHwgYCR7Z2FsbGVyeVRleHQuaW1hZ2V9ICR7aW5kZXggKyAxfWB9YCk7XG4gICAgICAgIGlmIChjb250YWluZXIuZGF0YXNldC5saWdodGJveENhcHRpb24gIT09ICdmYWxzZScgJiYgbWVkaWEuYWx0KSB7XG4gICAgICAgICAgICBsaW5rLmRhdGFzZXQuY2FwdGlvbiA9IG1lZGlhLmFsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsaW5rLmRhdGFzZXQuY2FwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpY29uID0gbGluay5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX2xpZ2h0Ym94LWljb24nKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGlmICghaWNvbi5jbGFzc05hbWUpIGljb24uY2xhc3NOYW1lID0gJ3Jtc2xpZGVzaG93X19saWdodGJveC1pY29uIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10cmFuc2l0aW9uLWZhZGUnO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgndWstb3ZlcmxheS1pY29uJywgJycpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBpZiAoIWxpbmsuY29udGFpbnMoaW1hZ2VXcmFwKSkgbGluay5wcmVwZW5kKGltYWdlV3JhcCk7XG4gICAgICAgIGlmICghbGluay5jb250YWlucyhpY29uKSkgbGluay5hcHBlbmQoaWNvbik7XG4gICAgICAgIGlmICghc2xpZGUuY29udGFpbnMobGluaykpIHNsaWRlLnJlcGxhY2VDaGlsZHJlbihsaW5rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZS5yZXBsYWNlQ2hpbGRyZW4oaW1hZ2VXcmFwKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsaWRlO1xufTtcblxuY29uc3QgcHJvZHVjdFRodW1iID0gKGNvbnRhaW5lciwgbWVkaWEsIGluZGV4LCBhbmNob3JDbGFzcywgdGVtcGxhdGUgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IHRlbXBsYXRlPy5jbG9uZU5vZGUodHJ1ZSkgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpZiAoIXRlbXBsYXRlKSBpdGVtLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlJztcbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJywgJ3VrLWFjdGl2ZScpO1xuICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgICBjb25zdCBsaW5rID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdhJykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2dhbGxlcnlUZXh0LmltYWdlfSAke2luZGV4ICsgMX1gKTtcbiAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQubmF2ICE9PSAnZG90bmF2Jykge1xuICAgICAgICBsaW5rLmNsYXNzTmFtZSA9IGFuY2hvckNsYXNzIHx8ICd1ay1kaXNwbGF5LWJsb2NrIHVrLW92ZXJmbG93LWhpZGRlbiB1ay1iYWNrZ3JvdW5kLW11dGVkJztcbiAgICAgICAgY29uc3Qgd3JhcCA9IGxpbmsucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fc2xpZGVfX2ltYWdlJykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBpZiAoIXdyYXAuY2xhc3NOYW1lKSB3cmFwLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlX19pbWFnZSB1ay1mbGV4IHVrLWZsZXgtY2VudGVyIHVrLWZsZXgtbWlkZGxlJztcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB3cmFwLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWFnZS5zcmMgPSBtZWRpYS5zcmMgfHwgJyc7XG4gICAgICAgIGltYWdlLmFsdCA9IG1lZGlhLmFsdCB8fCAnJztcbiAgICAgICAgaW1hZ2UubG9hZGluZyA9IGNvbnRhaW5lci5kYXRhc2V0LmltYWdlTG9hZGluZyA9PT0gJ2VhZ2VyJyA/ICdlYWdlcicgOiAnbGF6eSc7XG4gICAgICAgIGlmICghd3JhcC5jb250YWlucyhpbWFnZSkpIHdyYXAucmVwbGFjZUNoaWxkcmVuKGltYWdlKTtcbiAgICAgICAgaWYgKCFsaW5rLmNvbnRhaW5zKHdyYXApKSBsaW5rLnJlcGxhY2VDaGlsZHJlbih3cmFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgbGluay5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICB9XG4gICAgaWYgKCFpdGVtLmNvbnRhaW5zKGxpbmspKSBpdGVtLnJlcGxhY2VDaGlsZHJlbihsaW5rKTtcbiAgICByZXR1cm4gaXRlbTtcbn07XG5cbmNvbnN0IHVwZGF0ZVByb2R1Y3RHYWxsZXJ5ID0gKGNvbnRhaW5lciwgbWVkaWEgPSBbXSkgPT4ge1xuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5ybVByb2R1Y3RHYWxsZXJ5ICE9PSAndHJ1ZScpIHJldHVybjtcbiAgICBjb25zdCBzbGlkZXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X19jb250YWluZXInKTtcbiAgICBjb25zdCB0aHVtYnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fY29udGFpbmVyJyk7XG4gICAgaWYgKCFzbGlkZXMpIHJldHVybjtcblxuICAgIGNvbnN0IHRodW1iQW5jaG9yQ2xhc3MgPSB0aHVtYnM/LnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlID4gYScpPy5jbGFzc05hbWUgfHwgJyc7XG4gICAgY29uc3Qgc2xpZGVUZW1wbGF0ZSA9IHNsaWRlcy5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3NsaWRlJyk7XG4gICAgY29uc3QgdGh1bWJUZW1wbGF0ZSA9IHRodW1icz8ucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fc2xpZGUnKSB8fCBudWxsO1xuICAgIGNvbnRhaW5lci5ybUdhbGxlcnlEZXN0cm95Py4oKTtcbiAgICBzbGlkZXMucmVwbGFjZUNoaWxkcmVuKC4uLm1lZGlhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHByb2R1Y3RTbGlkZShjb250YWluZXIsIGl0ZW0sIGluZGV4LCBtZWRpYS5sZW5ndGgsIHNsaWRlVGVtcGxhdGUpKSk7XG4gICAgaWYgKHRodW1icykge1xuICAgICAgICB0aHVtYnMucmVwbGFjZUNoaWxkcmVuKC4uLm1lZGlhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHByb2R1Y3RUaHVtYihjb250YWluZXIsIGl0ZW0sIGluZGV4LCB0aHVtYkFuY2hvckNsYXNzLCB0aHVtYlRlbXBsYXRlKSkpO1xuICAgIH1cbiAgICBjb250YWluZXIuaGlkZGVuID0gbWVkaWEubGVuZ3RoID09PSAwO1xuICAgIHdpbmRvdy5VSWtpdD8udXBkYXRlPy4oY29udGFpbmVyKTtcbiAgICAvLyBLZWVwIHRoZSBleGlzdGluZyBVSWtpdCBMaWdodGJveCBpbnN0YW5jZSBhdHRhY2hlZCB0byB0aGUgc2xpZGUgbGlzdDtcbiAgICAvLyBpdHMgZGVsZWdhdGVkIHRvZ2dsZSB3YXRjaGVyIGZvbGxvd3MgYW5jaG9ycyByZXBsYWNlZCBieSBhIHZhcmlhbnQgdXBkYXRlLlxuICAgIGlmIChtZWRpYS5sZW5ndGgpIG5ldyBZVER5bmFtaWNzR2FsbGVyeSgpLmluaXQoY29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHByb2R1Y3RHYWxsZXJ5VGV4dCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncnUnKVxuICAgID8ge2ltYWdlOiAn0J7RgtC60YDRi9GC0Ywg0LjQt9C+0LHRgNCw0LbQtdC90LjQtScsIHZpZGVvOiAn0J7RgtC60YDRi9GC0Ywg0LLQuNC00LXQvid9XG4gICAgOiB7aW1hZ2U6ICdPcGVuIGltYWdlJywgdmlkZW86ICdPcGVuIHZpZGVvJ307XG5cbmNvbnN0IHByb2R1Y3RHYWxsZXJ5SXRlbSA9IChjb250YWluZXIsIG1lZGlhLCBpbmRleCwgdGVtcGxhdGUgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IG1lZGlhLnR5cGUgPT09ICd2aWRlbycgPyAndmlkZW8nIDogJ2ltYWdlJztcbiAgICBjb25zdCBpdGVtID0gdGVtcGxhdGU/LmNsb25lTm9kZSh0cnVlKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhcnRpY2xlJyk7XG4gICAgaWYgKCF0ZW1wbGF0ZSkgaXRlbS5jbGFzc05hbWUgPSAnZWwtaXRlbSBybS1wcm9kdWN0LWdhbGxlcnlfX2l0ZW0gdWstb3ZlcmZsb3ctaGlkZGVuJztcbiAgICBpdGVtLmRhdGFzZXQucm1Qcm9kdWN0R2FsbGVyeUl0ZW0gPSAnJztcbiAgICBpdGVtLmRhdGFzZXQubWVkaWFJbmRleCA9IFN0cmluZyhpbmRleCk7XG4gICAgaXRlbS5kYXRhc2V0Lm1lZGlhVHlwZSA9IHR5cGU7XG4gICAgaXRlbS5oaWRkZW4gPSBmYWxzZTtcbiAgICBjb25zdCBtZWRpYVdyYXAgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX21lZGlhJykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGlmICghbWVkaWFXcmFwLmNsYXNzTmFtZSkgbWVkaWFXcmFwLmNsYXNzTmFtZSA9ICdybS1wcm9kdWN0LWdhbGxlcnlfX21lZGlhIHVrLWZsZXggdWstZmxleC1jZW50ZXIgdWstZmxleC1taWRkbGUnO1xuICAgIGNvbnN0IGltYWdlU3JjID0gdHlwZSA9PT0gJ3ZpZGVvJyA/IG1lZGlhLnBvc3RlciA6IG1lZGlhLnNyYztcblxuICAgIGlmIChpbWFnZVNyYykge1xuICAgICAgICBjb25zdCBpbWFnZSA9IG1lZGlhV3JhcC5xdWVyeVNlbGVjdG9yKCdpbWcnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gICAgICAgIGltYWdlLmFsdCA9IG1lZGlhLmFsdCB8fCAnJztcbiAgICAgICAgaW1hZ2UubG9hZGluZyA9IGNvbnRhaW5lci5kYXRhc2V0LmltYWdlTG9hZGluZyA9PT0gJ2VhZ2VyJyA/ICdlYWdlcicgOiAnbGF6eSc7XG4gICAgICAgIGlmICghbWVkaWFXcmFwLmNvbnRhaW5zKGltYWdlKSkgbWVkaWFXcmFwLnByZXBlbmQoaW1hZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1lZGlhV3JhcC5xdWVyeVNlbGVjdG9yKCdpbWcnKT8ucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgY29uc3QgcGxheSA9IG1lZGlhV3JhcC5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1nYWxsZXJ5X19wbGF5JykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBpZiAoIXBsYXkuY2xhc3NOYW1lKSBwbGF5LmNsYXNzTmFtZSA9ICdybS1wcm9kdWN0LWdhbGxlcnlfX3BsYXkgdWstaWNvbi1idXR0b24nO1xuICAgICAgICBwbGF5LnNldEF0dHJpYnV0ZSgndWstaWNvbicsICdpY29uOiBwbGF5Jyk7XG4gICAgICAgIHBsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIGlmICghbWVkaWFXcmFwLmNvbnRhaW5zKHBsYXkpKSBtZWRpYVdyYXAuYXBwZW5kKHBsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1lZGlhV3JhcC5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1nYWxsZXJ5X19wbGF5Jyk/LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5saWdodGJveCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX2xpbmsnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGlmICghbGluay5jbGFzc05hbWUpIGxpbmsuY2xhc3NOYW1lID0gJ3JtLXByb2R1Y3QtZ2FsbGVyeV9fbGluayB1ay1kaXNwbGF5LWJsb2NrIHVrLXBvc2l0aW9uLXJlbGF0aXZlIHVrLXRyYW5zaXRpb24tdG9nZ2xlJztcbiAgICAgICAgbGluay5ocmVmID0gbWVkaWEuc3JjIHx8ICcnO1xuICAgICAgICBsaW5rLmRhdGFzZXQucm1Qcm9kdWN0R2FsbGVyeUxpZ2h0Ym94ID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSAnaW1hZ2UnKSBsaW5rLmRhdGFzZXQudHlwZSA9ICdpbWFnZSc7IGVsc2UgZGVsZXRlIGxpbmsuZGF0YXNldC50eXBlO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHR5cGUgPT09ICd2aWRlbycgPyBwcm9kdWN0R2FsbGVyeVRleHQudmlkZW8gOiBwcm9kdWN0R2FsbGVyeVRleHQuaW1hZ2UpO1xuICAgICAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQubGlnaHRib3hDYXB0aW9uICE9PSAnZmFsc2UnICYmIG1lZGlhLmFsdCkge1xuICAgICAgICAgICAgbGluay5kYXRhc2V0LmNhcHRpb24gPSBtZWRpYS5hbHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgbGluay5kYXRhc2V0LmNhcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFsaW5rLmNvbnRhaW5zKG1lZGlhV3JhcCkpIGxpbmsucmVwbGFjZUNoaWxkcmVuKG1lZGlhV3JhcCk7XG4gICAgICAgIGlmICghaXRlbS5jb250YWlucyhsaW5rKSkgaXRlbS5yZXBsYWNlQ2hpbGRyZW4obGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5yZXBsYWNlQ2hpbGRyZW4obWVkaWFXcmFwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbTtcbn07XG5cbmNvbnN0IHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZFZpc2liaWxpdHkgPSAoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLm1heCgwLCBOdW1iZXIoY29udGFpbmVyLmRhdGFzZXQudmlzaWJsZUxpbWl0KSB8fCAwKTtcbiAgICBjb25zdCBleHBhbmRlZCA9IGNvbnRhaW5lci5kYXRhc2V0LmV4cGFuZGVkID09PSAndHJ1ZSc7XG4gICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnktaXRlbV0nKSk7XG4gICAgY29uc3QgbW9yZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1nYWxsZXJ5X19tb3JlJyk7XG4gICAgY29uc3QgdG9nZ2xlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS10b2dnbGVdJyk7XG4gICAgY29uc3QgaGFzSGlkZGVuSXRlbXMgPSBsaW1pdCA+IDAgJiYgaXRlbXMubGVuZ3RoID4gbGltaXQ7XG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpdGVtLmhpZGRlbiA9IGhhc0hpZGRlbkl0ZW1zICYmICFleHBhbmRlZCAmJiBpbmRleCA+PSBsaW1pdDtcbiAgICB9KTtcbiAgICBpZiAoIXRvZ2dsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaGlkZVRvZ2dsZSA9ICFoYXNIaWRkZW5JdGVtcyB8fCAoZXhwYW5kZWQgJiYgY29udGFpbmVyLmRhdGFzZXQuY29sbGFwc2UgIT09ICd0cnVlJyk7XG4gICAgaWYgKG1vcmUpIG1vcmUuaGlkZGVuID0gaGlkZVRvZ2dsZTtcbiAgICB0b2dnbGUuaGlkZGVuID0gaGlkZVRvZ2dsZTtcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZXhwYW5kZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICB0b2dnbGUudGV4dENvbnRlbnQgPSBleHBhbmRlZFxuICAgICAgICA/IGNvbnRhaW5lci5kYXRhc2V0LnNob3dMZXNzTGFiZWwgfHwgJ1Nob3cgbGVzcydcbiAgICAgICAgOiBjb250YWluZXIuZGF0YXNldC5zaG93TW9yZUxhYmVsIHx8ICdTaG93IG1vcmUnO1xufTtcblxuY29uc3QgaW5pdFByb2R1Y3RHYWxsZXJ5R3JpZCA9IChjb250YWluZXIpID0+IHtcbiAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQucm1Qcm9kdWN0R2FsbGVyeUdyaWRSZWFkeSA9PT0gJ3RydWUnKSByZXR1cm47XG4gICAgY29udGFpbmVyLmRhdGFzZXQucm1Qcm9kdWN0R2FsbGVyeUdyaWRSZWFkeSA9ICd0cnVlJztcblxuICAgIGNvbnN0IHRvZ2dsZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnktdG9nZ2xlXScpO1xuICAgIHRvZ2dsZT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cGFuZGVkID0gY29udGFpbmVyLmRhdGFzZXQuZXhwYW5kZWQgPT09ICd0cnVlJztcbiAgICAgICAgY29udGFpbmVyLmRhdGFzZXQuZXhwYW5kZWQgPSBleHBhbmRlZCA/ICdmYWxzZScgOiAndHJ1ZSc7XG4gICAgICAgIHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZFZpc2liaWxpdHkoY29udGFpbmVyKTtcbiAgICB9KTtcbiAgICB1cGRhdGVQcm9kdWN0R2FsbGVyeUdyaWRWaXNpYmlsaXR5KGNvbnRhaW5lcik7XG59O1xuXG5jb25zdCB1cGRhdGVQcm9kdWN0R2FsbGVyeUdyaWQgPSAoY29udGFpbmVyLCBtZWRpYSA9IFtdKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtLXByb2R1Y3QtZ2FsbGVyeV9faXRlbXMnKTtcbiAgICBpZiAoIWl0ZW1zKSByZXR1cm47XG4gICAgY29uc3QgbW9yZSA9IGl0ZW1zLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX21vcmUnKTtcbiAgICBjb25zdCBpdGVtVGVtcGxhdGUgPSBpdGVtcy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnktaXRlbV0nKTtcbiAgICBpdGVtcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnktaXRlbV0nKS5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnJlbW92ZSgpKTtcbiAgICBtZWRpYS5mb3JFYWNoKChlbnRyeSwgaW5kZXgpID0+IGl0ZW1zLmluc2VydEJlZm9yZShwcm9kdWN0R2FsbGVyeUl0ZW0oY29udGFpbmVyLCBlbnRyeSwgaW5kZXgsIGl0ZW1UZW1wbGF0ZSksIG1vcmUpKTtcbiAgICBjb250YWluZXIuZGF0YXNldC5leHBhbmRlZCA9ICdmYWxzZSc7XG4gICAgY29udGFpbmVyLmhpZGRlbiA9IG1lZGlhLmxlbmd0aCA9PT0gMDtcbiAgICB1cGRhdGVQcm9kdWN0R2FsbGVyeUdyaWRWaXNpYmlsaXR5KGNvbnRhaW5lcik7XG4gICAgd2luZG93LlVJa2l0Py51cGRhdGU/Lihjb250YWluZXIpO1xufTtcblxuY29uc3QgaW5pdEdhbGxlcmllcyA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJy5ybXNsaWRlc2hvdycpKSB7XG4gICAgICAgIG5ldyBZVER5bmFtaWNzR2FsbGVyeSgpLmluaXQocm9vdCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJy5ybXNsaWRlc2hvdycpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgbmV3IFlURHluYW1pY3NHYWxsZXJ5KCkuaW5pdChlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGlmIChyb290Lm1hdGNoZXM/LignW2RhdGEtcm0tcHJvZHVjdC1nYWxsZXJ5LWdyaWRdJykpIGluaXRQcm9kdWN0R2FsbGVyeUdyaWQocm9vdCk7XG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS1ncmlkXScpLmZvckVhY2goaW5pdFByb2R1Y3RHYWxsZXJ5R3JpZCk7XG59O1xuXG5jb25zdCBkZXN0cm95R2FsbGVyaWVzID0gKHJvb3QpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJy5ybXNsaWRlc2hvdycpKSB7XG4gICAgICAgIHJvb3Qucm1HYWxsZXJ5RGVzdHJveT8uKCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJy5ybXNsaWRlc2hvdycpLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQucm1HYWxsZXJ5RGVzdHJveT8uKCkpO1xufTtcblxuY29uc3Qgb2JzZXJ2ZUdhbGxlcmllcyA9ICgpID0+IHtcbiAgICBpbml0R2FsbGVyaWVzKCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyYWRpY2FsbWFydDpwcm9kdWN0LWNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzY29wZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmRldGFpbD8ucHJvZHVjdDtcbiAgICAgICAgaWYgKCFzY29wZT8ucXVlcnlTZWxlY3RvckFsbCB8fCAhcHJvZHVjdCkgcmV0dXJuO1xuICAgICAgICBzY29wZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnk9XCJ0cnVlXCJdJykuZm9yRWFjaCgoZ2FsbGVyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGdhbGxlcnkuY2xvc2VzdCgnW2RhdGEtcm0tcHJvZHVjdC1zY29wZV0nKSA9PT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0R2FsbGVyeShnYWxsZXJ5LCBwcm9kdWN0Lm1lZGlhIHx8IFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS1ncmlkXVtkYXRhLXN5bmMtcHJvZHVjdC1tZWRpYT1cInRydWVcIl0nKS5mb3JFYWNoKChnYWxsZXJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZ2FsbGVyeS5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZChnYWxsZXJ5LCBwcm9kdWN0Lm1lZGlhQWxsIHx8IHByb2R1Y3QubWVkaWEgfHwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKChyZWNvcmRzKSA9PiB7XG4gICAgICAgIHJlY29yZHMuZm9yRWFjaCgoe2FkZGVkTm9kZXMsIHJlbW92ZWROb2Rlc30pID0+IHtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBpbml0R2FsbGVyaWVzKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveUdhbGxlcmllcyhub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSkub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWV9KTtcbn07XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb2JzZXJ2ZUdhbGxlcmllcywge29uY2U6IHRydWV9KTtcbn0gZWxzZSB7XG4gICAgb2JzZXJ2ZUdhbGxlcmllcygpO1xufVxuIl0sIm5hbWVzIjpbImRlZmF1bHRPcHRpb25zIiwiYWN0aXZlIiwiYnJlYWtwb2ludHMiLCJ3aGVlbERyYWdnaW5nQ2xhc3MiLCJmb3JjZVdoZWVsQXhpcyIsInVuZGVmaW5lZCIsInRhcmdldCIsIldoZWVsR2VzdHVyZXNQbHVnaW4iLCJnbG9iYWxPcHRpb25zIiwiX19ERVZfXyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInVzZXJPcHRpb25zIiwib3B0aW9ucyIsImNsZWFudXAiLCJpbml0IiwiZW1ibGEiLCJvcHRpb25zSGFuZGxlciIsIm1lcmdlT3B0aW9ucyIsIm9wdGlvbnNBdE1lZGlhIiwib3B0aW9uc0Jhc2UiLCJhbGxPcHRpb25zIiwiZW5naW5lIiwiaW50ZXJuYWxFbmdpbmUiLCJ0YXJnZXROb2RlIiwiX29wdGlvbnMkdGFyZ2V0IiwiY29udGFpbmVyTm9kZSIsInBhcmVudE5vZGUiLCJ3aGVlbEF4aXMiLCJfb3B0aW9ucyRmb3JjZVdoZWVsQXgiLCJheGlzIiwid2hlZWxHZXN0dXJlcyIsIldoZWVsR2VzdHVyZXMiLCJwcmV2ZW50V2hlZWxBY3Rpb24iLCJyZXZlcnNlU2lnbiIsInVwZGF0ZVNpemVSZWxhdGVkVmFyaWFibGVzIiwic2Nyb2xsQm91bmRhcnlUaHJlc2hvbGQiLCJjb250YWluZXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJ1bm9ic2VydmVUYXJnZXROb2RlIiwib2JzZXJ2ZSIsIm9mZldoZWVsIiwib24iLCJoYW5kbGVXaGVlbCIsImlzU3RhcnRlZCIsInN0YXJ0RXZlbnQiLCJvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24iLCJibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCIsIndoZWVsR2VzdHVyZVN0YXJ0ZWQiLCJzdGF0ZSIsIk1vdXNlRXZlbnQiLCJldmVudCIsImRpc3BhdGNoRXZlbnQiLCJlIiwiY29uc29sZSIsIndhcm4iLCJhZGROYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzIiwiY2xhc3NMaXN0IiwiYWRkIiwid2hlZWxHZXN0dXJlRW5kZWQiLCJjcmVhdGVSZWxhdGl2ZU1vdXNlRXZlbnQiLCJyZW1vdmVOYXRpdmVNb3VzZUV2ZW50TGlzdGVuZXJzIiwicmVtb3ZlIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpc1RydXN0ZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJ0eXBlIiwibW92ZVgiLCJtb3ZlWSIsIl9zdGF0ZSRheGlzTW92ZW1lbnQiLCJheGlzTW92ZW1lbnQiLCJfc3RhdGUkYXhpc01vdmVtZW50MiIsImNoZWNrSWZBdEJvdW5kYXJ5IiwiaXNBdEJvdW5kYXJ5IiwiX2NoZWNrSWZBdEJvdW5kYXJ5IiwicHJvZ3Jlc3NSYXRpbyIsIk1hdGgiLCJtaW4iLCJkYW1waW5nRmFjdG9yIiwiY291bnRlck1vdmVTaWduIiwiY291bnRlck1vdmVtZW50IiwiZGFtcGluZ01vdmVtZW50Iiwic2tpcFNuYXBzIiwiZHJhZ0ZyZWUiLCJtYXhYIiwibWF4WSIsIm1heCIsImNsaWVudFgiLCJjbGllbnRZIiwic2NyZWVuWCIsInNjcmVlblkiLCJtb3ZlbWVudFgiLCJtb3ZlbWVudFkiLCJidXR0b24iLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNvbXBvc2VkIiwiYXhpc0RlbHRhIiwiZGVsdGFYIiwiX3N0YXRlJGF4aXNEZWx0YSIsImRlbHRhWSIsInNjcm9sbFByb2dyZXNzIiwiY2FuU2Nyb2xsTmV4dCIsImNhblNjcm9sbFByZXYiLCJwcmltYXJ5QXhpc0RlbHRhIiwiaXNTY3JvbGxpbmdOZXh0IiwiaXNTY3JvbGxpbmdQcmV2IiwiaXNCb3VuZGFyeVRocmVzaG9sZFJlYWNoZWQiLCJfY2hlY2tJZkF0Qm91bmRhcnkyIiwiaXNNb21lbnR1bSIsImFicyIsIl9zdGF0ZSRheGlzRGVsdGEyIiwiY3Jvc3NBeGlzRGVsdGEiLCJpc1JlbGVhc2UiLCJwcmV2aW91cyIsImlzRW5kaW5nT3JSZWxlYXNlIiwiaXNFbmRpbmciLCJwcmltYXJ5QXhpc0RlbHRhSXNEb21pbmFudCIsIm9mZiIsInNlbGYiLCJuYW1lIiwiZGVzdHJveSIsIkRFQ0FZIiwicHJvamVjdGlvbiIsInZlbG9jaXR5UHhNcyIsImRlY2F5IiwibGFzdE9mIiwiYXJyYXkiLCJsZW5ndGgiLCJhdmVyYWdlIiwibnVtYmVycyIsInJlZHVjZSIsImEiLCJiIiwiY2xhbXAiLCJ2YWx1ZSIsImFkZFZlY3RvcnMiLCJ2MSIsInYyIiwiRXJyb3IiLCJtYXAiLCJ2YWwiLCJpIiwiYWJzTWF4IiwiYXBwbHkiLCJkZWVwRnJlZXplIiwibyIsIk9iamVjdCIsImZyZWV6ZSIsInZhbHVlcyIsImZvckVhY2giLCJpc0Zyb3plbiIsIkV2ZW50QnVzIiwibGlzdGVuZXJzIiwibGlzdGVuZXIiLCJjb25jYXQiLCJmaWx0ZXIiLCJsIiwiZGlzcGF0Y2giLCJkYXRhIiwiV2hlZWxUYXJnZXRPYnNlcnZlciIsImV2ZW50TGlzdGVuZXIiLCJ0YXJnZXRzIiwicGFzc2l2ZSIsInB1c2giLCJ1bm9ic2VydmUiLCJ0IiwiZGlzY29ubmVjdCIsIkxJTkVfSEVJR0hUIiwiUEFHRV9IRUlHSFQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsIkRFTFRBX01PREVfVU5JVCIsIm5vcm1hbGl6ZVdoZWVsIiwiZGVsdGFNb2RlIiwiZGVsdGFaIiwidGltZVN0YW1wIiwicmV2ZXJzZUFsbCIsInJldmVyc2VBeGlzRGVsdGFTaWduIiwid2hlZWwiLCJtdWx0aXBsaWVycyIsInNob3VsZFJldmVyc2UiLCJfZXh0ZW5kcyIsImRlbHRhIiwiREVMVEFfTUFYX0FCUyIsImNsYW1wQXhpc0RlbHRhIiwiQUNDX0ZBQ1RPUl9NSU4iLCJBQ0NfRkFDVE9SX01BWCIsIldIRUVMRVZFTlRTX1RPX01FUkdFIiwiV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSIsImNvbmZpZ0RlZmF1bHRzIiwiV0lMTF9FTkRfVElNRU9VVF9ERUZBVUxUIiwiY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlIiwiaXNTdGFydFB1Ymxpc2hlZCIsInN0YXJ0VGltZSIsImxhc3RBYnNEZWx0YSIsIkluZmluaXR5IiwiYXhpc1ZlbG9jaXR5IiwiYWNjZWxlcmF0aW9uRmFjdG9ycyIsInNjcm9sbFBvaW50cyIsInNjcm9sbFBvaW50c1RvTWVyZ2UiLCJ3aWxsRW5kVGltZW91dCIsIm9wdGlvbnNQYXJhbSIsIl9FdmVudEJ1cyIsImNvbmZpZyIsImN1cnJlbnRFdmVudCIsIm5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50IiwicHJldldoZWVsRXZlbnRTdGF0ZSIsImZlZWRXaGVlbCIsIndoZWVsRXZlbnRzIiwiQXJyYXkiLCJpc0FycmF5Iiwid2hlZWxFdmVudCIsInByb2Nlc3NXaGVlbEV2ZW50RGF0YSIsInVwZGF0ZU9wdGlvbnMiLCJuZXdPcHRpb25zIiwic29tZSIsIm9wdGlvbiIsImVycm9yIiwicHVibGlzaFdoZWVsIiwiYWRkaXRpb25hbERhdGEiLCJ3aGVlbEV2ZW50U3RhdGUiLCJpc1N0YXJ0IiwiaXNNb21lbnR1bUNhbmNlbCIsImF4aXNNb3ZlbWVudFByb2plY3Rpb24iLCJ2ZWxvY2l0eSIsInNob3VsZFByZXZlbnREZWZhdWx0IiwiZGVsdGFNYXhBYnMiLCJfY29uZmlnIiwiX2NsYW1wQXhpc0RlbHRhIiwicHJldmVudERlZmF1bHQiLCJzdGFydCIsImVuZCIsImlzIiwibWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkiLCJ3aWxsRW5kIiwidW5zaGlmdCIsImF4aXNEZWx0YVN1bSIsInVwZGF0ZVZlbG9jaXR5IiwiZGV0ZWN0TW9tZW50dW0iLCJ1cGRhdGVTdGFydFZlbG9jaXR5IiwiZCIsImxhdGVzdFNjcm9sbFBvaW50IiwiX3N0YXRlJHNjcm9sbFBvaW50cyIsInByZXZTY3JvbGxQb2ludCIsImRlbHRhVGltZSIsImFjY2VsZXJhdGlvbkZhY3RvciIsInYiLCJ1cGRhdGVXaWxsRW5kVGltZW91dCIsIm5ld1RpbWVvdXQiLCJjZWlsIiwicm91bmQiLCJhY2NlbGVyYXRpb25GYWN0b3JJbk1vbWVudHVtUmFuZ2UiLCJhY2NGYWN0b3IiLCJyZWNvZ25pemVkTW9tZW50dW0iLCJyZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzIiwic2xpY2UiLCJkZXRlY3RlZE1vbWVudHVtIiwiZXZlcnkiLCJhY2NGYWMiLCJzYW1lQWNjRmFjIiwiZjEiLCJmMiIsImJvdGhBcmVJblJhbmdlT3JaZXJvIiwiRGF0ZSIsIm5vdyIsIndpbGxFbmRJZCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJfV2hlZWxUYXJnZXRPYnNlcnZlciIsImFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMiLCJlbWJsYUFwaU1haW4iLCJzbGlkZXNUaHVtYnMiLCJzY3JvbGxUb0luZGV4IiwiXyIsImluZGV4Iiwic2Nyb2xsVG8iLCJzbGlkZU5vZGUiLCJhZGRUb2dnbGVUaHVtYkJ1dHRvbnNBY3RpdmUiLCJlbWJsYUFwaVRodW1iIiwiYXJndW1lbnRzIiwidG9nZ2xlVGh1bWJCdG5zU3RhdGUiLCJzZWxlY3RlZCIsInNlbGVjdGVkU2Nyb2xsU25hcCIsInNsaWRlIiwiaXNTZWxlY3RlZCIsInRvZ2dsZSIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMiLCJlbWJsYUFwaSIsInByZXZCdG4iLCJuZXh0QnRuIiwic2Nyb2xsUHJldiIsInNjcm9sbE5leHQiLCJyZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUiLCJhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUiLCJ0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSIsImRlbGF5IiwianVtcCIsInBsYXlPbkluaXQiLCJzdG9wT25Gb2N1c0luIiwic3RvcE9uSW50ZXJhY3Rpb24iLCJzdG9wT25Nb3VzZUVudGVyIiwic3RvcE9uTGFzdFNuYXAiLCJyb290Tm9kZSIsIm5vcm1hbGl6ZURlbGF5Iiwic2Nyb2xsU25hcHMiLCJzY3JvbGxTbmFwTGlzdCIsImdldEF1dG9wbGF5Um9vdE5vZGUiLCJlbWJsYVJvb3ROb2RlIiwiQXV0b3BsYXkiLCJkZXN0cm95ZWQiLCJ0aW1lclN0YXJ0VGltZSIsInRpbWVySWQiLCJhdXRvcGxheUFjdGl2ZSIsIm1vdXNlSXNPdmVyIiwicGxheU9uRG9jdW1lbnRWaXNpYmxlIiwiZW1ibGFBcGlJbnN0YW5jZSIsImV2ZW50U3RvcmUiLCJvd25lckRvY3VtZW50IiwiaXNEcmFnZ2FibGUiLCJ3YXRjaERyYWciLCJyb290IiwidmlzaWJpbGl0eUNoYW5nZSIsInBvaW50ZXJEb3duIiwicG9pbnRlclVwIiwibW91c2VFbnRlciIsIm1vdXNlTGVhdmUiLCJzdG9wQXV0b3BsYXkiLCJzdGFydEF1dG9wbGF5Iiwic2V0VGltZXIiLCJvd25lcldpbmRvdyIsIm5leHQiLCJnZXRUaW1lIiwiZW1pdCIsImNsZWFyVGltZXIiLCJkb2N1bWVudElzSGlkZGVuIiwidmlzaWJpbGl0eVN0YXRlIiwicGxheSIsImp1bXBPdmVycmlkZSIsInN0b3AiLCJyZXNldCIsImlzUGxheWluZyIsIm5leHRJbmRleCIsImNsb25lIiwiZ2V0IiwibGFzdEluZGV4Iiwia2lsbCIsInRpbWVVbnRpbE5leHQiLCJjdXJyZW50RGVsYXkiLCJ0aW1lUGFzdFNpbmNlU3RhcnQiLCJpc051bWJlciIsInN1YmplY3QiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImlzT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibWF0aEFicyIsIm4iLCJtYXRoU2lnbiIsInNpZ24iLCJkZWx0YUFicyIsInZhbHVlQiIsInZhbHVlQSIsImZhY3RvckFicyIsImRpZmYiLCJyb3VuZFRvVHdvRGVjaW1hbHMiLCJudW0iLCJhcnJheUtleXMiLCJvYmplY3RLZXlzIiwiTnVtYmVyIiwiYXJyYXlMYXN0IiwiYXJyYXlMYXN0SW5kZXgiLCJhcnJheUlzTGFzdEluZGV4IiwiYXJyYXlGcm9tTnVtYmVyIiwic3RhcnRBdCIsImZyb20iLCJvYmplY3QiLCJrZXlzIiwib2JqZWN0c01lcmdlRGVlcCIsIm9iamVjdEEiLCJvYmplY3RCIiwibWVyZ2VkT2JqZWN0cyIsImN1cnJlbnRPYmplY3QiLCJrZXkiLCJhcmVPYmplY3RzIiwiaXNNb3VzZUV2ZW50IiwiZXZ0IiwiQWxpZ25tZW50IiwiYWxpZ24iLCJ2aWV3U2l6ZSIsInByZWRlZmluZWQiLCJjZW50ZXIiLCJtZWFzdXJlIiwiRXZlbnRTdG9yZSIsIm5vZGUiLCJoYW5kbGVyIiwicmVtb3ZlTGlzdGVuZXIiLCJsZWdhY3lNZWRpYVF1ZXJ5TGlzdCIsImFkZExpc3RlbmVyIiwiY2xlYXIiLCJBbmltYXRpb25zIiwidXBkYXRlIiwicmVuZGVyIiwiZG9jdW1lbnRWaXNpYmxlSGFuZGxlciIsImZpeGVkVGltZVN0ZXAiLCJsYXN0VGltZVN0YW1wIiwiYWNjdW11bGF0ZWRUaW1lIiwiYW5pbWF0aW9uSWQiLCJoaWRkZW4iLCJhbmltYXRlIiwidGltZUVsYXBzZWQiLCJhbHBoYSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiQXhpcyIsImNvbnRlbnREaXJlY3Rpb24iLCJpc1JpZ2h0VG9MZWZ0IiwiaXNWZXJ0aWNhbCIsInNjcm9sbCIsImNyb3NzIiwic3RhcnRFZGdlIiwiZ2V0U3RhcnRFZGdlIiwiZW5kRWRnZSIsImdldEVuZEVkZ2UiLCJtZWFzdXJlU2l6ZSIsIm5vZGVSZWN0IiwiZGlyZWN0aW9uIiwiTGltaXQiLCJyZWFjaGVkTWluIiwicmVhY2hlZE1heCIsInJlYWNoZWRBbnkiLCJjb25zdHJhaW4iLCJyZW1vdmVPZmZzZXQiLCJDb3VudGVyIiwibG9vcCIsImxvb3BFbmQiLCJjb3VudGVyIiwid2l0aGluTGltaXQiLCJzZXQiLCJEcmFnSGFuZGxlciIsImRyYWdUcmFja2VyIiwibG9jYXRpb24iLCJhbmltYXRpb24iLCJzY3JvbGxCb2R5Iiwic2Nyb2xsVGFyZ2V0IiwiZXZlbnRIYW5kbGVyIiwicGVyY2VudE9mVmlldyIsImRyYWdUaHJlc2hvbGQiLCJiYXNlRnJpY3Rpb24iLCJjcm9zc0F4aXMiLCJmb2N1c05vZGVzIiwibm9uUGFzc2l2ZUV2ZW50IiwiaW5pdEV2ZW50cyIsImRyYWdFdmVudHMiLCJnb1RvTmV4dFRocmVzaG9sZCIsInNuYXBGb3JjZUJvb3N0IiwibW91c2UiLCJ0b3VjaCIsImZyZWVGb3JjZUJvb3N0IiwiYmFzZVNwZWVkIiwiaXNNb3ZpbmciLCJzdGFydFNjcm9sbCIsInN0YXJ0Q3Jvc3MiLCJwb2ludGVySXNEb3duIiwicHJldmVudFNjcm9sbCIsInByZXZlbnRDbGljayIsImlzTW91c2UiLCJkb3duSWZBbGxvd2VkIiwiZG93biIsInVwIiwiY2xpY2siLCJhZGREcmFnRXZlbnRzIiwibW92ZSIsImlzRm9jdXNOb2RlIiwibm9kZU5hbWUiLCJpbmNsdWRlcyIsImZvcmNlQm9vc3QiLCJib29zdCIsImFsbG93ZWRGb3JjZSIsImZvcmNlIiwidGFyZ2V0Q2hhbmdlZCIsImJhc2VGb3JjZSIsImJ5RGlzdGFuY2UiLCJkaXN0YW5jZSIsImJ5SW5kZXgiLCJpc01vdXNlRXZ0IiwiYnV0dG9ucyIsInVzZUZyaWN0aW9uIiwidXNlRHVyYXRpb24iLCJyZWFkUG9pbnQiLCJpc1RvdWNoRXZ0IiwidG91Y2hlcyIsImxhc3RTY3JvbGwiLCJsYXN0Q3Jvc3MiLCJkaWZmU2Nyb2xsIiwiZGlmZkNyb3NzIiwicG9pbnRlck1vdmUiLCJjdXJyZW50TG9jYXRpb24iLCJyYXdGb3JjZSIsImZvcmNlRmFjdG9yIiwic3BlZWQiLCJmcmljdGlvbiIsInN0b3BQcm9wYWdhdGlvbiIsIkRyYWdUcmFja2VyIiwibG9nSW50ZXJ2YWwiLCJsYXN0RXZlbnQiLCJyZWFkVGltZSIsImV2dEF4aXMiLCJwcm9wZXJ0eSIsImNvb3JkIiwiZXhwaXJlZCIsImRpZmZEcmFnIiwiZGlmZlRpbWUiLCJpc0ZsaWNrIiwiTm9kZVJlY3RzIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiUGVyY2VudE9mVmlldyIsIlJlc2l6ZUhhbmRsZXIiLCJjb250YWluZXIiLCJzbGlkZXMiLCJ3YXRjaFJlc2l6ZSIsIm5vZGVSZWN0cyIsIm9ic2VydmVOb2RlcyIsInJlc2l6ZU9ic2VydmVyIiwiY29udGFpbmVyU2l6ZSIsInNsaWRlU2l6ZXMiLCJyZWFkU2l6ZSIsImRlZmF1bHRDYWxsYmFjayIsImVudHJpZXMiLCJlbnRyeSIsImlzQ29udGFpbmVyIiwic2xpZGVJbmRleCIsImluZGV4T2YiLCJsYXN0U2l6ZSIsIm5ld1NpemUiLCJkaWZmU2l6ZSIsInJlSW5pdCIsIlJlc2l6ZU9ic2VydmVyIiwiU2Nyb2xsQm9keSIsIm9mZnNldExvY2F0aW9uIiwicHJldmlvdXNMb2NhdGlvbiIsImJhc2VEdXJhdGlvbiIsInNjcm9sbFZlbG9jaXR5Iiwic2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsRHVyYXRpb24iLCJzY3JvbGxGcmljdGlvbiIsInJhd0xvY2F0aW9uIiwicmF3TG9jYXRpb25QcmV2aW91cyIsInNlZWsiLCJkaXNwbGFjZW1lbnQiLCJpc0luc3RhbnQiLCJzY3JvbGxEaXN0YW5jZSIsInNldHRsZWQiLCJkdXJhdGlvbiIsInVzZUJhc2VEdXJhdGlvbiIsInVzZUJhc2VGcmljdGlvbiIsIlNjcm9sbEJvdW5kcyIsImxpbWl0IiwicHVsbEJhY2tUaHJlc2hvbGQiLCJlZGdlT2Zmc2V0VG9sZXJhbmNlIiwiZnJpY3Rpb25MaW1pdCIsImRpc2FibGVkIiwic2hvdWxkQ29uc3RyYWluIiwiZWRnZSIsImRpZmZUb0VkZ2UiLCJkaWZmVG9UYXJnZXQiLCJzdWJ0cmFjdCIsInRvZ2dsZUFjdGl2ZSIsIlNjcm9sbENvbnRhaW4iLCJjb250ZW50U2l6ZSIsInNuYXBzQWxpZ25lZCIsImNvbnRhaW5TY3JvbGwiLCJwaXhlbFRvbGVyYW5jZSIsInNjcm9sbEJvdW5kcyIsInNuYXBzQm91bmRlZCIsIm1lYXN1cmVCb3VuZGVkIiwic2Nyb2xsQ29udGFpbkxpbWl0IiwiZmluZFNjcm9sbENvbnRhaW5MaW1pdCIsInNuYXBzQ29udGFpbmVkIiwibWVhc3VyZUNvbnRhaW5lZCIsInVzZVBpeGVsVG9sZXJhbmNlIiwiYm91bmQiLCJzbmFwIiwic3RhcnRTbmFwIiwiZW5kU25hcCIsImxhc3RJbmRleE9mIiwic25hcEFsaWduZWQiLCJpc0ZpcnN0IiwiaXNMYXN0Iiwic2Nyb2xsQm91bmQiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIlNjcm9sbExpbWl0IiwiU2Nyb2xsTG9vcGVyIiwidmVjdG9ycyIsImpvaW50U2FmZXR5Iiwic2hvdWxkTG9vcCIsImxvb3BEaXN0YW5jZSIsIlNjcm9sbFByb2dyZXNzIiwiU2Nyb2xsU25hcHMiLCJhbGlnbm1lbnQiLCJzbGlkZVJlY3RzIiwic2xpZGVzVG9TY3JvbGwiLCJncm91cFNsaWRlcyIsImFsaWdubWVudHMiLCJtZWFzdXJlU2l6ZXMiLCJzbmFwcyIsIm1lYXN1cmVVbmFsaWduZWQiLCJtZWFzdXJlQWxpZ25lZCIsInJlY3RzIiwicmVjdCIsImciLCJTbGlkZVJlZ2lzdHJ5IiwiY29udGFpblNuYXBzIiwic2xpZGVJbmRleGVzIiwic2xpZGVSZWdpc3RyeSIsImNyZWF0ZVNsaWRlUmVnaXN0cnkiLCJncm91cGVkU2xpZGVJbmRleGVzIiwiZG9Ob3RDb250YWluIiwiZ3JvdXAiLCJncm91cHMiLCJyYW5nZSIsIlNjcm9sbFRhcmdldCIsInRhcmdldFZlY3RvciIsIm1pbkRpc3RhbmNlIiwiZGlzdGFuY2VzIiwic29ydCIsImZpbmRUYXJnZXRTbmFwIiwiYXNjRGlmZnNUb1NuYXBzIiwic2hvcnRjdXQiLCJkMSIsImQyIiwibWF0Y2hpbmdUYXJnZXRzIiwiZGlmZlRvU25hcCIsInRhcmdldFNuYXBEaXN0YW5jZSIsInJlYWNoZWRCb3VuZCIsInNuYXBEaXN0YW5jZSIsIlNjcm9sbFRvIiwiaW5kZXhDdXJyZW50IiwiaW5kZXhQcmV2aW91cyIsImRpc3RhbmNlRGlmZiIsImluZGV4RGlmZiIsInRhcmdldEluZGV4IiwiU2xpZGVGb2N1cyIsIndhdGNoRm9jdXMiLCJmb2N1c0xpc3RlbmVyT3B0aW9ucyIsImNhcHR1cmUiLCJsYXN0VGFiUHJlc3NUaW1lIiwibm93VGltZSIsInNjcm9sbExlZnQiLCJmaW5kSW5kZXgiLCJyZWdpc3RlclRhYlByZXNzIiwiY29kZSIsIlZlY3RvcjFEIiwiaW5pdGlhbFZhbHVlIiwibm9ybWFsaXplSW5wdXQiLCJUcmFuc2xhdGUiLCJ0cmFuc2xhdGUiLCJ4IiwieSIsImNvbnRhaW5lclN0eWxlIiwic3R5bGUiLCJwcmV2aW91c1RhcmdldCIsInRvIiwibmV3VGFyZ2V0IiwidHJhbnNmb3JtIiwiZ2V0QXR0cmlidXRlIiwiU2xpZGVMb29wZXIiLCJzbGlkZVNpemVzV2l0aEdhcHMiLCJyb3VuZGluZ1NhZmV0eSIsImFzY0l0ZW1zIiwiZGVzY0l0ZW1zIiwicmV2ZXJzZSIsImxvb3BQb2ludHMiLCJzdGFydFBvaW50cyIsImVuZFBvaW50cyIsInJlbW92ZVNsaWRlU2l6ZXMiLCJpbmRleGVzIiwic2xpZGVzSW5HYXAiLCJnYXAiLCJyZW1haW5pbmdHYXAiLCJmaW5kU2xpZGVCb3VuZHMiLCJmaW5kTG9vcFBvaW50cyIsImlzRW5kRWRnZSIsInNsaWRlQm91bmRzIiwiaW5pdGlhbCIsImFsdGVyZWQiLCJib3VuZEVkZ2UiLCJsb29wUG9pbnQiLCJzbGlkZUxvY2F0aW9uIiwiY2FuTG9vcCIsIl9yZWYiLCJvdGhlckluZGV4ZXMiLCJzaGlmdExvY2F0aW9uIiwiU2xpZGVzSGFuZGxlciIsIndhdGNoU2xpZGVzIiwibXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm11dGF0aW9uIiwiTXV0YXRpb25PYnNlcnZlciIsImNoaWxkTGlzdCIsIlNsaWRlc0luVmlldyIsInRocmVzaG9sZCIsImludGVyc2VjdGlvbkVudHJ5TWFwIiwiaW5WaWV3Q2FjaGUiLCJub3RJblZpZXdDYWNoZSIsImludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJwYXJlbnRFbGVtZW50IiwiY3JlYXRlSW5WaWV3TGlzdCIsImluVmlldyIsImxpc3QiLCJwYXJzZUludCIsImlzSW50ZXJzZWN0aW5nIiwiaW5WaWV3TWF0Y2giLCJub3RJblZpZXdNYXRjaCIsIlNsaWRlU2l6ZXMiLCJyZWFkRWRnZUdhcCIsIndpdGhFZGdlR2FwIiwic3RhcnRHYXAiLCJtZWFzdXJlU3RhcnRHYXAiLCJlbmRHYXAiLCJtZWFzdXJlRW5kR2FwIiwibWVhc3VyZVdpdGhHYXBzIiwic2xpZGVSZWN0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJTbGlkZXNUb1Njcm9sbCIsImdyb3VwQnlOdW1iZXIiLCJieU51bWJlciIsImdyb3VwU2l6ZSIsImJ5U2l6ZSIsInJlY3RCIiwicmVjdEEiLCJlZGdlQSIsImVkZ2VCIiwiZ2FwQSIsImdhcEIiLCJjaHVua1NpemUiLCJjdXJyZW50U2l6ZSIsInByZXZpb3VzU2l6ZSIsIkVuZ2luZSIsInNjcm9sbEF4aXMiLCJzdGFydEluZGV4IiwiaW5WaWV3VGhyZXNob2xkIiwiX3JlZjIiLCJkcmFnSGFuZGxlciIsIl9yZWYzIiwic2Nyb2xsTG9vcGVyIiwic2xpZGVMb29wZXIiLCJzaG91bGRTZXR0bGUiLCJ3aXRoaW5Cb3VuZHMiLCJoYXNTZXR0bGVkIiwiaGFzU2V0dGxlZEFuZElkbGUiLCJpbnRlcnBvbGF0ZWRMb2NhdGlvbiIsInN0YXJ0TG9jYXRpb24iLCJzbGlkZXNJblZpZXciLCJzbGlkZUZvY3VzIiwicmVzaXplSGFuZGxlciIsInNsaWRlc0hhbmRsZXIiLCJFdmVudEhhbmRsZXIiLCJhcGkiLCJnZXRMaXN0ZW5lcnMiLCJjYiIsIk9wdGlvbnNIYW5kbGVyIiwib3B0aW9uc0EiLCJvcHRpb25zQiIsIm1hdGNoZWRNZWRpYU9wdGlvbnMiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWVkaWFPcHRpb24iLCJvcHRpb25zTWVkaWFRdWVyaWVzIiwib3B0aW9uc0xpc3QiLCJhY2MiLCJtZWRpYVF1ZXJpZXMiLCJQbHVnaW5zSGFuZGxlciIsImFjdGl2ZVBsdWdpbnMiLCJwbHVnaW5zIiwiX3JlZjQiLCJwbHVnaW4iLCJhc3NpZ24iLCJFbWJsYUNhcm91c2VsIiwidXNlclBsdWdpbnMiLCJkZWZhdWx0VmlldyIsInBsdWdpbnNIYW5kbGVyIiwibWVkaWFIYW5kbGVycyIsInJlQWN0aXZhdGUiLCJwbHVnaW5MaXN0IiwicGx1Z2luQXBpcyIsInN0b3JlRWxlbWVudHMiLCJ1c2VyQ29udGFpbmVyIiwidXNlclNsaWRlcyIsImN1c3RvbUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJjaGlsZHJlbiIsImN1c3RvbVNsaWRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjcmVhdGVFbmdpbmUiLCJvcHRpb25zV2l0aG91dExvb3AiLCJhY3RpdmF0ZSIsIndpdGhPcHRpb25zIiwid2l0aFBsdWdpbnMiLCJfcmVmNSIsInF1ZXJ5Iiwib2Zmc2V0UGFyZW50IiwiZGVBY3RpdmF0ZSIsInByZXYiLCJwcmV2aW91c1Njcm9sbFNuYXAiLCJzbGlkZXNOb3RJblZpZXciLCJzbGlkZU5vZGVzIiwiWVREeW5hbWljc0dhbGxlcnkiLCJkYXRhc2V0Iiwicm1HYWxsZXJ5UmVhZHkiLCJvcmllbnRhdGlvbiIsIm1vYmlsZU9yaWVudGF0aW9uIiwibW9iaWxlQXhpcyIsInRodW1iQXhpcyIsIm1vYmlsZVRodW1iQXhpcyIsInRodW1iTW9iaWxlQXhpcyIsIm5hdk1vZGUiLCJuYXYiLCJkcmFnIiwiYXV0b3BsYXkiLCJhdXRvcGxheURlbGF5IiwiYXV0b3BsYXlQYXVzZSIsIm9wdGlvbnNUaHVtYnMiLCJ2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwiLCJ2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsIiwicHJldlRodW1iQnRuTm9kZSIsIm5leHRUaHVtYkJ0bk5vZGUiLCJwcmV2TWFpbkJ0bk5vZGUiLCJuZXh0TWFpbkJ0bk5vZGUiLCJlbWJsYU1haW4iLCJjbGVhbnVwcyIsImVtYmxhVGh1bWIiLCJzeW5jU2xpZGVzIiwiY29udHJvbCIsInJtR2FsbGVyeVRhYmluZGV4IiwibmF2Tm9kZXMiLCJybUdhbGxlcnlEZXN0cm95IiwiZ2FsbGVyeVRleHQiLCJsYW5nIiwidG9Mb3dlckNhc2UiLCJzdGFydHNXaXRoIiwiaW1hZ2UiLCJvcGVuIiwicHJvZHVjdFNsaWRlIiwidG90YWwiLCJ0ZW1wbGF0ZSIsImNsb25lTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbWFnZVdyYXAiLCJzcmMiLCJhbHQiLCJsb2FkaW5nIiwiaW1hZ2VMb2FkaW5nIiwiY29udGFpbnMiLCJyZXBsYWNlQ2hpbGRyZW4iLCJsaWdodGJveCIsImxpbmsiLCJocmVmIiwicm1MaWdodGJveCIsImxpZ2h0Ym94Q2FwdGlvbiIsImNhcHRpb24iLCJpY29uIiwicHJlcGVuZCIsImFwcGVuZCIsInByb2R1Y3RUaHVtYiIsImFuY2hvckNsYXNzIiwiaXRlbSIsIndyYXAiLCJ1cGRhdGVQcm9kdWN0R2FsbGVyeSIsInJtUHJvZHVjdEdhbGxlcnkiLCJ0aHVtYnMiLCJ0aHVtYkFuY2hvckNsYXNzIiwic2xpZGVUZW1wbGF0ZSIsInRodW1iVGVtcGxhdGUiLCJVSWtpdCIsInByb2R1Y3RHYWxsZXJ5VGV4dCIsInZpZGVvIiwicHJvZHVjdEdhbGxlcnlJdGVtIiwicm1Qcm9kdWN0R2FsbGVyeUl0ZW0iLCJtZWRpYUluZGV4IiwiU3RyaW5nIiwibWVkaWFUeXBlIiwibWVkaWFXcmFwIiwiaW1hZ2VTcmMiLCJwb3N0ZXIiLCJybVByb2R1Y3RHYWxsZXJ5TGlnaHRib3giLCJ1cGRhdGVQcm9kdWN0R2FsbGVyeUdyaWRWaXNpYmlsaXR5IiwidmlzaWJsZUxpbWl0IiwiZXhwYW5kZWQiLCJpdGVtcyIsIm1vcmUiLCJoYXNIaWRkZW5JdGVtcyIsImhpZGVUb2dnbGUiLCJjb2xsYXBzZSIsInRleHRDb250ZW50Iiwic2hvd0xlc3NMYWJlbCIsInNob3dNb3JlTGFiZWwiLCJpbml0UHJvZHVjdEdhbGxlcnlHcmlkIiwicm1Qcm9kdWN0R2FsbGVyeUdyaWRSZWFkeSIsInVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZCIsIml0ZW1UZW1wbGF0ZSIsImluc2VydEJlZm9yZSIsImluaXRHYWxsZXJpZXMiLCJlbGVtZW50IiwiZGVzdHJveUdhbGxlcmllcyIsIm9ic2VydmVHYWxsZXJpZXMiLCJzY29wZSIsInByb2R1Y3QiLCJkZXRhaWwiLCJnYWxsZXJ5IiwiY2xvc2VzdCIsIm1lZGlhQWxsIiwicmVjb3JkcyIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJub2RlVHlwZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJzdWJ0cmVlIiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9