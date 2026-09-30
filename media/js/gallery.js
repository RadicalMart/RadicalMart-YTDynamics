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
const productSlide = (container, media, index, total) => {
  const slide = document.createElement('div');
  slide.className = 'el-item rmslideshow__slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} / ${total}`);
  const imageWrap = document.createElement('div');
  imageWrap.className = 'rmslideshow__slide__image uk-flex uk-flex-center uk-flex-middle';
  const image = document.createElement('img');
  image.src = media.src || '';
  image.alt = media.alt || '';
  image.loading = container.dataset.imageLoading === 'eager' ? 'eager' : 'lazy';
  imageWrap.append(image);
  if (container.dataset.lightbox === 'true') {
    const link = document.createElement('a');
    link.className = 'rmslideshow__lightbox uk-display-block uk-position-relative uk-transition-toggle';
    link.href = media.src || '';
    link.dataset.rmLightbox = '';
    link.dataset.type = 'image';
    link.dataset.alt = media.alt || '';
    link.setAttribute('aria-label', `${galleryText.open}: ${media.alt || `${galleryText.image} ${index + 1}`}`);
    if (container.dataset.lightboxCaption !== 'false' && media.alt) link.dataset.caption = media.alt;
    const icon = document.createElement('span');
    icon.className = 'rmslideshow__lightbox-icon uk-position-center uk-transition-fade';
    icon.setAttribute('uk-overlay-icon', '');
    icon.setAttribute('aria-hidden', 'true');
    link.append(imageWrap, icon);
    slide.append(link);
  } else {
    slide.append(imageWrap);
  }
  return slide;
};
const productThumb = (container, media, index, anchorClass) => {
  const item = document.createElement('li');
  item.className = 'rmslideshow-thumbs__slide';
  const link = document.createElement('a');
  link.href = '#';
  link.setAttribute('aria-label', `${galleryText.image} ${index + 1}`);
  if (container.dataset.nav !== 'dotnav') {
    link.className = anchorClass || 'uk-display-block uk-overflow-hidden uk-background-muted';
    const wrap = document.createElement('span');
    wrap.className = 'rmslideshow-thumbs__slide__image uk-flex uk-flex-center uk-flex-middle';
    const image = document.createElement('img');
    image.src = media.src || '';
    image.alt = media.alt || '';
    image.loading = container.dataset.imageLoading === 'eager' ? 'eager' : 'lazy';
    wrap.append(image);
    link.append(wrap);
  }
  item.append(link);
  return item;
};
const updateProductGallery = function (container) {
  let media = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (container.dataset.rmProductGallery !== 'true') return;
  const slides = container.querySelector('.rmslideshow__container');
  const thumbs = container.querySelector('.rmslideshow-thumbs__container');
  if (!slides) return;
  const thumbAnchorClass = thumbs?.querySelector('.rmslideshow-thumbs__slide > a')?.className || '';
  container.rmGalleryDestroy?.();
  window.UIkit?.getComponent?.(slides, 'lightbox')?.$destroy?.();
  slides.replaceChildren(...media.map((item, index) => productSlide(container, item, index, media.length)));
  if (thumbs) {
    thumbs.replaceChildren(...media.map((item, index) => productThumb(container, item, index, thumbAnchorClass)));
  }
  container.hidden = media.length === 0;
  window.UIkit?.update?.(container);
  if (media.length) new YTDynamicsGallery().init(container);
};
const initGalleries = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('.rmslideshow')) {
    new YTDynamicsGallery().init(root);
  }
  root.querySelectorAll?.('.rmslideshow').forEach(element => {
    new YTDynamicsGallery().init(element);
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0VBQUksQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxJQUFJNTBCLFFBQVEsQ0FBQzYwQixVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DNzBCLFFBQVEsQ0FBQ0UsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU4ekIsZ0JBQWdCLEVBQUU7SUFBQ2MsSUFBSSxFQUFFO0VBQUksQ0FBQyxDQUFDO0FBQ2pGLENBQUMsTUFBTTtFQUNIZCxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL1doZWVsR2VzdHVyZXNQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy91dGlscy9wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvRXZlbnRCdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9zdGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL3doZWVsLWdlc3R1cmVzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9idXR0b25zLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvZ2FsbGVyeS5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy91dGlscy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXV0b3BsYXkudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9nYWxsZXJ5LmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVhdGVPcHRpb25zVHlwZSwgQ3JlYXRlUGx1Z2luVHlwZSwgRW1ibGFDYXJvdXNlbFR5cGUsIE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsJ1xuaW1wb3J0IFdoZWVsR2VzdHVyZXMsIHsgV2hlZWxFdmVudFN0YXRlIH0gZnJvbSAnd2hlZWwtZ2VzdHVyZXMnXG5cbmV4cG9ydCB0eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICB3aGVlbERyYWdnaW5nQ2xhc3M6IHN0cmluZ1xuICBmb3JjZVdoZWVsQXhpcz86ICd4JyB8ICd5J1xuICB0YXJnZXQ/OiBFbGVtZW50XG59PlxuXG50eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnM+XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IHtcbiAgYWN0aXZlOiB0cnVlLFxuICBicmVha3BvaW50czoge30sXG4gIHdoZWVsRHJhZ2dpbmdDbGFzczogJ2lzLXdoZWVsLWRyYWdnaW5nJyxcbiAgZm9yY2VXaGVlbEF4aXM6IHVuZGVmaW5lZCxcbiAgdGFyZ2V0OiB1bmRlZmluZWQsXG59XG5cbldoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZCBhcyBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddIHwgdW5kZWZpbmVkXG5cbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzUGx1Z2luKHVzZXJPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddID0ge30pOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSB7XG4gIGxldCBvcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9uc1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHt9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYTogRW1ibGFDYXJvdXNlbFR5cGUsIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGUpIHtcbiAgICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEgfSA9IG9wdGlvbnNIYW5kbGVyXG4gICAgY29uc3Qgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIFdoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGNvbnN0IGVuZ2luZSA9IGVtYmxhLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0YXJnZXROb2RlID0gb3B0aW9ucy50YXJnZXQgPz8gKGVtYmxhLmNvbnRhaW5lck5vZGUoKS5wYXJlbnROb2RlIGFzIEVsZW1lbnQpXG4gICAgY29uc3Qgd2hlZWxBeGlzID0gb3B0aW9ucy5mb3JjZVdoZWVsQXhpcyA/PyBlbmdpbmUub3B0aW9ucy5heGlzXG4gICAgY29uc3Qgd2hlZWxHZXN0dXJlcyA9IFdoZWVsR2VzdHVyZXMoe1xuICAgICAgcHJldmVudFdoZWVsQWN0aW9uOiB3aGVlbEF4aXMsXG4gICAgICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKSB7XG4gICAgICBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9ICh3aGVlbEF4aXMgPT09ICd4JyA/IGVuZ2luZS5jb250YWluZXJSZWN0LndpZHRoIDogZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0KSAvIDJcbiAgICB9XG5cbiAgICBjb25zdCB1bm9ic2VydmVUYXJnZXROb2RlID0gd2hlZWxHZXN0dXJlcy5vYnNlcnZlKHRhcmdldE5vZGUpXG4gICAgY29uc3Qgb2ZmV2hlZWwgPSB3aGVlbEdlc3R1cmVzLm9uKCd3aGVlbCcsIGhhbmRsZVdoZWVsKVxuXG4gICAgbGV0IGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgbGV0IHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnRcbiAgICBsZXQgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uID0gMFxuICAgIGxldCBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9IDBcbiAgICBsZXQgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSBmYWxzZVxuXG4gICAgdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKVxuICAgIGVtYmxhLm9uKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhcnRFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nLCBzdGF0ZS5ldmVudClcbiAgICAgICAgZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBMZWdhY3kgQnJvd3NlcnMgbGlrZSBJRSAxMCAmIDExIHdpbGwgdGhyb3cgd2hlbiBhdHRlbXB0aW5nIHRvIGNyZWF0ZSB0aGUgRXZlbnRcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnTGVnYWN5IGJyb3dzZXIgcmVxdWlyZXMgZXZlbnRzLXBvbHlmaWxsIChodHRwczovL2dpdGh1Yi5jb20veGllbC9lbWJsYS1jYXJvdXNlbC13aGVlbC1nZXN0dXJlcyNsZWdhY3ktYnJvd3NlcnMpJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xlYW51cCgpXG4gICAgICB9XG5cbiAgICAgIGlzU3RhcnRlZCA9IHRydWVcbiAgICAgIG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA9IDBcbiAgICAgIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QuYWRkKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZUVuZGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2V1cCcsIHN0YXRlKSlcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgICAgaWYgKGlzU3RhcnRlZCAmJiBlLmlzVHJ1c3RlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KHR5cGU6ICdtb3VzZWRvd24nIHwgJ21vdXNlbW92ZScgfCAnbW91c2V1cCcsIHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGxldCBtb3ZlWCwgbW92ZVlcblxuICAgICAgaWYgKHdoZWVsQXhpcyA9PT0gZW5naW5lLm9wdGlvbnMuYXhpcykge1xuICAgICAgICA7W21vdmVYLCBtb3ZlWV0gPSBzdGF0ZS5heGlzTW92ZW1lbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGVtYmxhcyBheGlzIGFuZCB0aGUgd2hlZWxBeGlzIGRvbid0IG1hdGNoLCBzd2FwIHRoZSBheGVzIHRvIG1hdGNoIHRoZSByaWdodCBlbWJsYSBldmVudHNcbiAgICAgICAgO1ttb3ZlWSwgbW92ZVhdID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgaXNBdEJvdW5kYXJ5IH0gPSBjaGVja0lmQXRCb3VuZGFyeShzdGF0ZSlcblxuICAgICAgLy8gQXBwbHkgcHJvZ3Jlc3NpdmUgcnViYmVyIGJhbmQgZGFtcGluZyB3aGVuIGF0IGJvdW5kYXJpZXNcbiAgICAgIGlmIChpc0F0Qm91bmRhcnkpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2dyZXNzaXZlIGRhbXBpbmcgZmFjdG9yIGJhc2VkIG9uIGhvdyBmYXIgb3ZlciBib3VuZGFyeSB3ZSBhcmVcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NSYXRpbyA9IE1hdGgubWluKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAvIHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkLCAxKVxuICAgICAgICBjb25zdCBkYW1waW5nRmFjdG9yID0gMC4yNSArIHByb2dyZXNzUmF0aW8gKiAwLjVcbiAgICAgICAgY29uc3QgY291bnRlck1vdmVTaWduID0gbW92ZVggPiAwID8gLTEgOiAxXG4gICAgICAgIGNvbnN0IGNvdW50ZXJNb3ZlbWVudCA9IG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAqIGNvdW50ZXJNb3ZlU2lnblxuICAgICAgICBjb25zdCBkYW1waW5nTW92ZW1lbnQgPSBjb3VudGVyTW92ZW1lbnQgKiBkYW1waW5nRmFjdG9yXG5cbiAgICAgICAgbW92ZVggKz0gZGFtcGluZ01vdmVtZW50XG4gICAgICAgIG1vdmVZICs9IGRhbXBpbmdNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IHNraXBwaW5nIHNsaWRlc1xuICAgICAgaWYgKCFlbmdpbmUub3B0aW9ucy5za2lwU25hcHMgJiYgIWVuZ2luZS5vcHRpb25zLmRyYWdGcmVlKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aFxuICAgICAgICBjb25zdCBtYXhZID0gZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0XG5cbiAgICAgICAgbW92ZVggPSBtb3ZlWCA8IDAgPyBNYXRoLm1heChtb3ZlWCwgLW1heFgpIDogTWF0aC5taW4obW92ZVgsIG1heFgpXG4gICAgICAgIG1vdmVZID0gbW92ZVkgPCAwID8gTWF0aC5tYXgobW92ZVksIC1tYXhZKSA6IE1hdGgubWluKG1vdmVZLCBtYXhZKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICBjbGllbnRYOiBzdGFydEV2ZW50LmNsaWVudFggKyBtb3ZlWCxcbiAgICAgICAgY2xpZW50WTogc3RhcnRFdmVudC5jbGllbnRZICsgbW92ZVksXG4gICAgICAgIHNjcmVlblg6IHN0YXJ0RXZlbnQuc2NyZWVuWCArIG1vdmVYLFxuICAgICAgICBzY3JlZW5ZOiBzdGFydEV2ZW50LnNjcmVlblkgKyBtb3ZlWSxcbiAgICAgICAgbW92ZW1lbnRYOiBtb3ZlWCxcbiAgICAgICAgbW92ZW1lbnRZOiBtb3ZlWSxcbiAgICAgICAgYnV0dG9uOiAwLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudDogVUlFdmVudCkge1xuICAgICAgZW1ibGEuY29udGFpbmVyTm9kZSgpLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBheGlzRGVsdGE6IFtkZWx0YVgsIGRlbHRhWV0sXG4gICAgICB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gZW1ibGEuc2Nyb2xsUHJvZ3Jlc3MoKVxuICAgICAgY29uc3QgY2FuU2Nyb2xsTmV4dCA9IHNjcm9sbFByb2dyZXNzIDwgMVxuICAgICAgY29uc3QgY2FuU2Nyb2xsUHJldiA9IHNjcm9sbFByb2dyZXNzID4gMFxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YSA9IHdoZWVsQXhpcyA9PT0gJ3gnID8gZGVsdGFYIDogZGVsdGFZXG4gICAgICBjb25zdCBpc1Njcm9sbGluZ05leHQgPSBwcmltYXJ5QXhpc0RlbHRhIDwgMFxuICAgICAgY29uc3QgaXNTY3JvbGxpbmdQcmV2ID0gcHJpbWFyeUF4aXNEZWx0YSA+IDBcbiAgICAgIGNvbnN0IGlzQXRCb3VuZGFyeSA9IChpc1Njcm9sbGluZ05leHQgJiYgIWNhblNjcm9sbE5leHQpIHx8IChpc1Njcm9sbGluZ1ByZXYgJiYgIWNhblNjcm9sbFByZXYpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzQXRCb3VuZGFyeSxcbiAgICAgICAgcHJpbWFyeUF4aXNEZWx0YSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBjb25zdCB7IGlzQXRCb3VuZGFyeSwgcHJpbWFyeUF4aXNEZWx0YSB9ID0gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGUpXG5cbiAgICAgIGlmIChpc0F0Qm91bmRhcnkgJiYgIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgICAgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uICs9IE1hdGguYWJzKHByaW1hcnlBeGlzRGVsdGEpXG5cbiAgICAgICAgLy8gRW5kIGdlc3R1cmUgaWYgd2UgZXhjZWVkIHRoZSB0aHJlc2hvbGRcbiAgICAgICAgaWYgKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA+IHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkKSB7XG4gICAgICAgICAgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSB0cnVlXG4gICAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWNjdW11bGF0aW9uIHdoZW4gd2UgY2FuIHNjcm9sbCBvciB3aGVuIG5vdCBhdCBib3VuZGFyeVxuICAgICAgICBvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVldLFxuICAgICAgfSA9IHN0YXRlXG4gICAgICBjb25zdCBwcmltYXJ5QXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVggOiBkZWx0YVlcbiAgICAgIGNvbnN0IGNyb3NzQXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVkgOiBkZWx0YVhcbiAgICAgIGNvbnN0IGlzUmVsZWFzZSA9IHN0YXRlLmlzTW9tZW50dW0gJiYgc3RhdGUucHJldmlvdXMgJiYgIXN0YXRlLnByZXZpb3VzLmlzTW9tZW50dW1cbiAgICAgIGNvbnN0IGlzRW5kaW5nT3JSZWxlYXNlID0gKHN0YXRlLmlzRW5kaW5nICYmICFzdGF0ZS5pc01vbWVudHVtKSB8fCBpc1JlbGVhc2VcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ID0gTWF0aC5hYnMocHJpbWFyeUF4aXNEZWx0YSkgPiBNYXRoLmFicyhjcm9zc0F4aXNEZWx0YSlcblxuICAgICAgaWYgKHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ICYmICFpc1N0YXJ0ZWQgJiYgIXN0YXRlLmlzTW9tZW50dW0gJiYgIWJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kKSB7XG4gICAgICAgIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGUpXG4gICAgICB9XG5cbiAgICAgIGlmIChibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCAmJiBzdGF0ZS5pc0VuZGluZykge1xuICAgICAgICBibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdGFydGVkKSByZXR1cm5cblxuICAgICAgaWYgKGlzQm91bmRhcnlUaHJlc2hvbGRSZWFjaGVkKHN0YXRlKSkgcmV0dXJuXG5cbiAgICAgIGlmIChpc0VuZGluZ09yUmVsZWFzZSkge1xuICAgICAgICB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQoY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KCdtb3VzZW1vdmUnLCBzdGF0ZSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgIHVub2JzZXJ2ZVRhcmdldE5vZGUoKVxuICAgICAgb2ZmV2hlZWwoKVxuICAgICAgZW1ibGEub2ZmKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0ge1xuICAgIG5hbWU6ICd3aGVlbEdlc3R1cmVzJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3k6ICgpID0+IGNsZWFudXAoKSxcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG1vZHVsZSAnZW1ibGEtY2Fyb3VzZWwnIHtcbiAgaW50ZXJmYWNlIEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHdoZWVsR2VzdHVyZXM/OiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVxuICB9XG59XG4iLCJjb25zdCBERUNBWSA9IDAuOTk2XG5cbi8qKlxuICogbW92ZW1lbnQgcHJvamVjdGlvbiBiYXNlZCBvbiB2ZWxvY2l0eVxuICogQHBhcmFtIHZlbG9jaXR5UHhNc1xuICogQHBhcmFtIGRlY2F5XG4gKi9cbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uID0gKHZlbG9jaXR5UHhNczogbnVtYmVyLCBkZWNheSA9IERFQ0FZKSA9PiAodmVsb2NpdHlQeE1zICogZGVjYXkpIC8gKDEgLSBkZWNheSlcbiIsImV4cG9ydCAqIGZyb20gJy4vcHJvamVjdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RPZjxUPihhcnJheTogVFtdKSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXZlcmFnZShudW1iZXJzOiBudW1iZXJbXSkge1xuICByZXR1cm4gbnVtYmVycy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIG51bWJlcnMubGVuZ3RoXG59XG5cbmV4cG9ydCBjb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgubWluKE1hdGgubWF4KG1pbiwgdmFsdWUpLCBtYXgpXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRWZWN0b3JzPFQgZXh0ZW5kcyBudW1iZXJbXT4odjE6IFQsIHYyOiBUKTogVCB7XG4gIGlmICh2MS5sZW5ndGggIT09IHYyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndmVjdG9ycyBtdXN0IGJlIHNhbWUgbGVuZ3RoJylcbiAgfVxuICByZXR1cm4gdjEubWFwKCh2YWwsIGkpID0+IHZhbCArIHYyW2ldKSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXgobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIE1hdGgubWF4KC4uLm51bWJlcnMubWFwKE1hdGguYWJzKSlcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRnJlZXplPFQgZXh0ZW5kcyBvYmplY3Q+KG86IFQpOiBSZWFkb25seTxUPiB7XG4gIE9iamVjdC5mcmVlemUobylcbiAgT2JqZWN0LnZhbHVlcyhvKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4odmFsdWUpKSB7XG4gICAgICBkZWVwRnJlZXplKHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG9cbn1cbiIsImltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IHR5cGUgRXZlbnRNYXBFbXB0eSA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyPEQgPSB1bmtub3duPiA9IChkYXRhOiBEKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBPZmYgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50QnVzPEV2ZW50TWFwID0gRXZlbnRNYXBFbXB0eT4oKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IHt9IGFzIFJlY29yZDxrZXlvZiBFdmVudE1hcCwgRXZlbnRMaXN0ZW5lcjxuZXZlcj5bXT5cblxuICBmdW5jdGlvbiBvbjxFSyBleHRlbmRzIGtleW9mIEV2ZW50TWFwPih0eXBlOiBFSywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPik6IE9mZiB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuY29uY2F0KGxpc3RlbmVyKVxuICAgIHJldHVybiAoKSA9PiBvZmYodHlwZSwgbGlzdGVuZXIpXG4gIH1cblxuICBmdW5jdGlvbiBvZmY8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pIHtcbiAgICBsaXN0ZW5lcnNbdHlwZV0gPSAobGlzdGVuZXJzW3R5cGVdIHx8IFtdKS5maWx0ZXIoKGwpID0+IGwgIT09IGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2g8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGRhdGE6IEV2ZW50TWFwW0VLXSkge1xuICAgIGlmICghKHR5cGUgaW4gbGlzdGVuZXJzKSkgcmV0dXJuXG4gICAgOyhsaXN0ZW5lcnNbdHlwZV0gYXMgRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+W10pLmZvckVhY2goKGwpID0+IGwoZGF0YSkpXG4gIH1cblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGRpc3BhdGNoLFxuICB9KVxufVxuIiwiaW1wb3J0IHsgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxudHlwZSBVbm9ic2VydmVUYXJnZXQgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbFRhcmdldE9ic2VydmVyKGV2ZW50TGlzdGVuZXI6ICh3aGVlbEV2ZW50OiBXaGVlbEV2ZW50RGF0YSkgPT4gdm9pZCkge1xuICBsZXQgdGFyZ2V0czogRXZlbnRUYXJnZXRbXSA9IFtdXG5cbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IG9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCk6IFVub2JzZXJ2ZVRhcmdldCA9PiB7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyLCB7IHBhc3NpdmU6IGZhbHNlIH0pXG4gICAgdGFyZ2V0cy5wdXNoKHRhcmdldClcblxuICAgIHJldHVybiAoKSA9PiB1bm9ic2VydmUodGFyZ2V0KVxuICB9XG5cbiAgLy8vIHJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IHVub2JzZXJ2ZSA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyKVxuICAgIHRhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gdCAhPT0gdGFyZ2V0KVxuICB9XG5cbiAgLy8gc3RvcHMgd2F0Y2hpbmcgYWxsIG9mIGl0cyB0YXJnZXQgZWxlbWVudHMgZm9yIHZpc2liaWxpdHkgY2hhbmdlcy5cbiAgY29uc3QgZGlzY29ubmVjdCA9ICgpID0+IHtcbiAgICB0YXJnZXRzLmZvckVhY2godW5vYnNlcnZlKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBSZXZlcnNlU2lnbiwgVmVjdG9yWFlaLCBXaGVlbEV2ZW50RGF0YSB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVkV2hlZWwge1xuICBheGlzRGVsdGE6IFZlY3RvclhZWlxuICB0aW1lU3RhbXA6IG51bWJlclxufVxuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDE2ICogMS4xMjVcbmNvbnN0IFBBR0VfSEVJR0hUID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5pbm5lckhlaWdodCkgfHwgODAwXG5jb25zdCBERUxUQV9NT0RFX1VOSVQgPSBbMSwgTElORV9IRUlHSFQsIFBBR0VfSEVJR0hUXVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplV2hlZWwoZTogV2hlZWxFdmVudERhdGEpOiBOb3JtYWxpemVkV2hlZWwge1xuICBjb25zdCBkZWx0YVggPSBlLmRlbHRhWCAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cbiAgY29uc3QgZGVsdGFZID0gZS5kZWx0YVkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWiA9IChlLmRlbHRhWiB8fCAwKSAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cblxuICByZXR1cm4ge1xuICAgIHRpbWVTdGFtcDogZS50aW1lU3RhbXAsXG4gICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVksIGRlbHRhWl0sXG4gIH1cbn1cblxuY29uc3QgcmV2ZXJzZUFsbCA9IFstMSwgLTEsIC0xXVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUF4aXNEZWx0YVNpZ248VCBleHRlbmRzIFBpY2s8Tm9ybWFsaXplZFdoZWVsLCAnYXhpc0RlbHRhJz4+KFxuICB3aGVlbDogVCxcbiAgcmV2ZXJzZVNpZ246IFJldmVyc2VTaWduXG4pOiBUIHtcbiAgaWYgKCFyZXZlcnNlU2lnbikge1xuICAgIHJldHVybiB3aGVlbFxuICB9XG5cbiAgY29uc3QgbXVsdGlwbGllcnMgPSByZXZlcnNlU2lnbiA9PT0gdHJ1ZSA/IHJldmVyc2VBbGwgOiByZXZlcnNlU2lnbi5tYXAoKHNob3VsZFJldmVyc2UpID0+IChzaG91bGRSZXZlcnNlID8gLTEgOiAxKSlcblxuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEsIGkpID0+IGRlbHRhICogbXVsdGlwbGllcnNbaV0pLFxuICB9XG59XG5cbmNvbnN0IERFTFRBX01BWF9BQlMgPSA3MDBcblxuZXhwb3J0IGNvbnN0IGNsYW1wQXhpc0RlbHRhID0gPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+Pih3aGVlbDogVCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEpID0+IGNsYW1wKGRlbHRhLCAtREVMVEFfTUFYX0FCUywgREVMVEFfTUFYX0FCUykpLFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01JTiA9IDAuNlxuZXhwb3J0IGNvbnN0IEFDQ19GQUNUT1JfTUFYID0gMC45NlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX01FUkdFID0gMlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUgPSA1XG4iLCJpbXBvcnQgeyBXaGVlbEdlc3R1cmVzQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjb25maWdEZWZhdWx0czogV2hlZWxHZXN0dXJlc0NvbmZpZyA9IGRlZXBGcmVlemUoe1xuICBwcmV2ZW50V2hlZWxBY3Rpb246IHRydWUsXG4gIHJldmVyc2VTaWduOiBbdHJ1ZSwgdHJ1ZSwgZmFsc2VdLFxufSlcbiIsIi8qKlxuICogdGhlIHRpbWVvdXQgaXMgYXV0b21hdGljYWxseSBhZGp1c3RlZCBkdXJpbmcgYSBnZXN0dXJlXG4gKiB0aGUgaW5pdGlhbCB0aW1lb3V0IHBlcmlvZCBpcyBwcmV0dHkgbG9uZywgc28gZXZlbiBvbGQgbW91c2VzLCB3aGljaCBlbWl0IHdoZWVsIGV2ZW50cyBsZXNzIG9mdGVuLCBjYW4gcHJvZHVjZSBhIGNvbnRpbnVvdXMgZ2VzdHVyZVxuICovXG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnXG5cbmNvbnN0IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCA9IDQwMFxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKCk6IFdoZWVsR2VzdHVyZXNJbnRlcm5hbFN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBpc1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGlzU3RhcnRQdWJsaXNoZWQ6IGZhbHNlLFxuICAgIGlzTW9tZW50dW06IGZhbHNlLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBsYXN0QWJzRGVsdGE6IEluZmluaXR5LFxuICAgIGF4aXNNb3ZlbWVudDogWzAsIDAsIDBdLFxuICAgIGF4aXNWZWxvY2l0eTogWzAsIDAsIDBdLFxuICAgIGFjY2VsZXJhdGlvbkZhY3RvcnM6IFtdLFxuICAgIHNjcm9sbFBvaW50czogW10sXG4gICAgc2Nyb2xsUG9pbnRzVG9NZXJnZTogW10sXG4gICAgd2lsbEVuZFRpbWVvdXQ6IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCxcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9FdmVudEJ1cydcbmltcG9ydCB7IFdoZWVsVGFyZ2V0T2JzZXJ2ZXIgfSBmcm9tICcuLi9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlcidcbmltcG9ydCB7XG4gIFZlY3RvclhZWixcbiAgV2hlZWxFdmVudERhdGEsXG4gIFdoZWVsRXZlbnRTdGF0ZSxcbiAgV2hlZWxHZXN0dXJlc0NvbmZpZyxcbiAgV2hlZWxHZXN0dXJlc0V2ZW50TWFwLFxuICBXaGVlbEdlc3R1cmVzT3B0aW9ucyxcbn0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBhYnNNYXgsIGFkZFZlY3RvcnMsIGF2ZXJhZ2UsIGRlZXBGcmVlemUsIGxhc3RPZiwgcHJvamVjdGlvbiB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgY2xhbXBBeGlzRGVsdGEsIG5vcm1hbGl6ZVdoZWVsLCByZXZlcnNlQXhpc0RlbHRhU2lnbiB9IGZyb20gJy4uL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplcidcbmltcG9ydCB7IF9fREVWX18sIEFDQ19GQUNUT1JfTUFYLCBBQ0NfRkFDVE9SX01JTiwgV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSwgV0hFRUxFVkVOVFNfVE9fTUVSR0UgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0IHsgY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIFdoZWVsR2VzdHVyZXMob3B0aW9uc1BhcmFtOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgb24sIG9mZiwgZGlzcGF0Y2ggfSA9IEV2ZW50QnVzPFdoZWVsR2VzdHVyZXNFdmVudE1hcD4oKVxuICBsZXQgY29uZmlnID0gY29uZmlnRGVmYXVsdHNcbiAgbGV0IHN0YXRlID0gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKClcbiAgbGV0IGN1cnJlbnRFdmVudDogV2hlZWxFdmVudERhdGFcbiAgbGV0IG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgbGV0IHByZXZXaGVlbEV2ZW50U3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IGZlZWRXaGVlbCA9ICh3aGVlbEV2ZW50czogV2hlZWxFdmVudERhdGEgfCBXaGVlbEV2ZW50RGF0YVtdKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkod2hlZWxFdmVudHMpKSB7XG4gICAgICB3aGVlbEV2ZW50cy5mb3JFYWNoKCh3aGVlbEV2ZW50KSA9PiBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2Nlc3NXaGVlbEV2ZW50RGF0YSh3aGVlbEV2ZW50cylcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVPcHRpb25zID0gKG5ld09wdGlvbnM6IFdoZWVsR2VzdHVyZXNPcHRpb25zID0ge30pOiBXaGVlbEdlc3R1cmVzQ29uZmlnID0+IHtcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhuZXdPcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbiA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbiA9PT0gbnVsbCkpIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS5lcnJvcigndXBkYXRlT3B0aW9ucyBpZ25vcmVkISB1bmRlZmluZWQgJiBudWxsIG9wdGlvbnMgbm90IGFsbG93ZWQnKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cbiAgICByZXR1cm4gKGNvbmZpZyA9IGRlZXBGcmVlemUoeyAuLi5jb25maWdEZWZhdWx0cywgLi4uY29uZmlnLCAuLi5uZXdPcHRpb25zIH0pKVxuICB9XG5cbiAgY29uc3QgcHVibGlzaFdoZWVsID0gKGFkZGl0aW9uYWxEYXRhPzogUGFydGlhbDxXaGVlbEV2ZW50U3RhdGU+KSA9PiB7XG4gICAgY29uc3Qgd2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgPSB7XG4gICAgICBldmVudDogY3VycmVudEV2ZW50LFxuICAgICAgaXNTdGFydDogZmFsc2UsXG4gICAgICBpc0VuZGluZzogZmFsc2UsXG4gICAgICBpc01vbWVudHVtQ2FuY2VsOiBmYWxzZSxcbiAgICAgIGlzTW9tZW50dW06IHN0YXRlLmlzTW9tZW50dW0sXG4gICAgICBheGlzRGVsdGE6IFswLCAwLCAwXSxcbiAgICAgIGF4aXNWZWxvY2l0eTogc3RhdGUuYXhpc1ZlbG9jaXR5LFxuICAgICAgYXhpc01vdmVtZW50OiBzdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICBnZXQgYXhpc01vdmVtZW50UHJvamVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZFZlY3RvcnMoXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNNb3ZlbWVudCxcbiAgICAgICAgICB3aGVlbEV2ZW50U3RhdGUuYXhpc1ZlbG9jaXR5Lm1hcCgodmVsb2NpdHkpID0+IHByb2plY3Rpb24odmVsb2NpdHkpKSBhcyBWZWN0b3JYWVpcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIC4uLmFkZGl0aW9uYWxEYXRhLFxuICAgIH1cblxuICAgIGRpc3BhdGNoKCd3aGVlbCcsIHtcbiAgICAgIC4uLndoZWVsRXZlbnRTdGF0ZSxcbiAgICAgIHByZXZpb3VzOiBwcmV2V2hlZWxFdmVudFN0YXRlLFxuICAgIH0pXG5cbiAgICAvLyBrZWVwIHJlZmVyZW5jZSB3aXRob3V0IHByZXZpb3VzLCBvdGhlcndpc2Ugd2Ugd291bGQgY3JlYXRlIGEgbG9uZyBjaGFpblxuICAgIHByZXZXaGVlbEV2ZW50U3RhdGUgPSB3aGVlbEV2ZW50U3RhdGVcbiAgfVxuXG4gIC8vIHNob3VsZCBwcmV2ZW50IHdoZW4gdGhlcmUgaXMgbWFpbmx5IG1vdmVtZW50IG9uIHRoZSBkZXNpcmVkIGF4aXNcbiAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSAoZGVsdGFNYXhBYnM6IG51bWJlciwgYXhpc0RlbHRhOiBWZWN0b3JYWVopOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IHByZXZlbnRXaGVlbEFjdGlvbiB9ID0gY29uZmlnXG4gICAgY29uc3QgW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdID0gYXhpc0RlbHRhXG5cbiAgICBpZiAodHlwZW9mIHByZXZlbnRXaGVlbEFjdGlvbiA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gcHJldmVudFdoZWVsQWN0aW9uXG5cbiAgICBzd2l0Y2ggKHByZXZlbnRXaGVlbEFjdGlvbikge1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVgpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWSkgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFaKSA+PSBkZWx0YU1heEFic1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIHByZXZlbnRXaGVlbEFjdGlvbiB2YWx1ZTogJyArIHByZXZlbnRXaGVlbEFjdGlvbiwgJ3dhcm4nKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9jZXNzV2hlZWxFdmVudERhdGEgPSAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHtcbiAgICBjb25zdCB7IGF4aXNEZWx0YSwgdGltZVN0YW1wIH0gPSBjbGFtcEF4aXNEZWx0YShcbiAgICAgIHJldmVyc2VBeGlzRGVsdGFTaWduKG5vcm1hbGl6ZVdoZWVsKHdoZWVsRXZlbnQpLCBjb25maWcucmV2ZXJzZVNpZ24pXG4gICAgKVxuICAgIGNvbnN0IGRlbHRhTWF4QWJzID0gYWJzTWF4KGF4aXNEZWx0YSlcblxuICAgIGlmICh3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0ICYmIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhTWF4QWJzLCBheGlzRGVsdGEpKSB7XG4gICAgICB3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkge1xuICAgICAgc3RhcnQoKVxuICAgIH1cbiAgICAvLyBjaGVjayBpZiB1c2VyIHN0YXJ0ZWQgc2Nyb2xsaW5nIGFnYWluIC0+IGNhbmNlbFxuICAgIGVsc2UgaWYgKHN0YXRlLmlzTW9tZW50dW0gJiYgZGVsdGFNYXhBYnMgPiBNYXRoLm1heCgyLCBzdGF0ZS5sYXN0QWJzRGVsdGEgKiAyKSkge1xuICAgICAgZW5kKHRydWUpXG4gICAgICBzdGFydCgpXG4gICAgfVxuXG4gICAgLy8gc3BlY2lhbCBmaW5nZXIgdXAgZXZlbnQgb24gd2luZG93cyArIGJsaW5rXG4gICAgaWYgKGRlbHRhTWF4QWJzID09PSAwICYmIE9iamVjdC5pcyAmJiBPYmplY3QuaXMod2hlZWxFdmVudC5kZWx0YVgsIC0wKSkge1xuICAgICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSB0cnVlXG4gICAgICAvLyByZXR1cm4gLT4gemVybyBkZWx0YSBldmVudCBzaG91bGQgbm90IGluZmx1ZW5jZSB2ZWxvY2l0eVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEV2ZW50ID0gd2hlZWxFdmVudFxuICAgIHN0YXRlLmF4aXNNb3ZlbWVudCA9IGFkZFZlY3RvcnMoc3RhdGUuYXhpc01vdmVtZW50LCBheGlzRGVsdGEpXG4gICAgc3RhdGUubGFzdEFic0RlbHRhID0gZGVsdGFNYXhBYnNcbiAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLnB1c2goe1xuICAgICAgYXhpc0RlbHRhLFxuICAgICAgdGltZVN0YW1wLFxuICAgIH0pXG5cbiAgICBtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSgpXG5cbiAgICAvLyBvbmx5IHdoZWVsIGV2ZW50IChtb3ZlKSBhbmQgbm90IHN0YXJ0L2VuZCBnZXQgdGhlIGRlbHRhIHZhbHVlc1xuICAgIHB1Ymxpc2hXaGVlbCh7IGF4aXNEZWx0YSwgaXNTdGFydDogIXN0YXRlLmlzU3RhcnRQdWJsaXNoZWQgfSkgLy8gc3RhdGUuaXNNb21lbnR1bSA/IE1PTUVOVFVNX1dIRUVMIDogV0hFRUwsIHsgYXhpc0RlbHRhIH0pXG5cbiAgICAvLyBwdWJsaXNoIHN0YXJ0IGFmdGVyIHZlbG9jaXR5IGV0Yy4gaGF2ZSBiZWVuIHVwZGF0ZWRcbiAgICBzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkID0gdHJ1ZVxuXG4gICAgLy8gY2FsYyBkZWJvdW5jZWQgZW5kIGZ1bmN0aW9uLCB0byByZWNvZ25pemUgZW5kIG9mIHdoZWVsIGV2ZW50IHN0cmVhbVxuICAgIHdpbGxFbmQoKVxuICB9XG5cbiAgY29uc3QgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID09PSBXSEVFTEVWRU5UU19UT19NRVJHRSkge1xuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLnVuc2hpZnQoe1xuICAgICAgICBheGlzRGVsdGFTdW06IHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLmF4aXNEZWx0YSkucmVkdWNlKGFkZFZlY3RvcnMpLFxuICAgICAgICB0aW1lU3RhbXA6IGF2ZXJhZ2Uoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5tYXAoKGIpID0+IGIudGltZVN0YW1wKSksXG4gICAgICB9KVxuXG4gICAgICAvLyBvbmx5IHVwZGF0ZSB2ZWxvY2l0eSBhZnRlciBhIG1lcmdlZCBzY3JvbGxwb2ludCB3YXMgZ2VuZXJhdGVkXG4gICAgICB1cGRhdGVWZWxvY2l0eSgpXG5cbiAgICAgIC8vIHJlc2V0IHRvTWVyZ2UgYXJyYXlcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID0gMFxuXG4gICAgICAvLyBhZnRlciBjYWxjdWxhdGlvbiBvZiB2ZWxvY2l0eSBvbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IG1lcmdlZCBzY3JvbGxQb2ludFxuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLmxlbmd0aCA9IDFcblxuICAgICAgaWYgKCFzdGF0ZS5pc01vbWVudHVtKSB7XG4gICAgICAgIGRldGVjdE1vbWVudHVtKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkKSB7XG4gICAgICB1cGRhdGVTdGFydFZlbG9jaXR5KClcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVTdGFydFZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IGxhc3RPZihzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlKS5heGlzRGVsdGEubWFwKChkKSA9PiBkIC8gc3RhdGUud2lsbEVuZFRpbWVvdXQpIGFzIFZlY3RvclhZWlxuICB9XG5cbiAgY29uc3QgdXBkYXRlVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgLy8gbmVlZCB0byBoYXZlIHR3byByZWNlbnQgcG9pbnRzIHRvIGNhbGMgdmVsb2NpdHlcbiAgICBjb25zdCBbbGF0ZXN0U2Nyb2xsUG9pbnQsIHByZXZTY3JvbGxQb2ludF0gPSBzdGF0ZS5zY3JvbGxQb2ludHNcblxuICAgIGlmICghcHJldlNjcm9sbFBvaW50IHx8ICFsYXRlc3RTY3JvbGxQb2ludCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdGltZSBkZWx0YVxuICAgIGNvbnN0IGRlbHRhVGltZSA9IGxhdGVzdFNjcm9sbFBvaW50LnRpbWVTdGFtcCAtIHByZXZTY3JvbGxQb2ludC50aW1lU3RhbXBcblxuICAgIGlmIChkZWx0YVRpbWUgPD0gMCkge1xuICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ2ludmFsaWQgZGVsdGFUaW1lJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNhbGMgdGhlIHZlbG9jaXR5IHBlciBheGVzXG4gICAgY29uc3QgdmVsb2NpdHkgPSBsYXRlc3RTY3JvbGxQb2ludC5heGlzRGVsdGFTdW0ubWFwKChkKSA9PiBkIC8gZGVsdGFUaW1lKSBhcyBWZWN0b3JYWVpcblxuICAgIC8vIGNhbGMgdGhlIGFjY2VsZXJhdGlvbiBmYWN0b3IgcGVyIGF4aXNcbiAgICBjb25zdCBhY2NlbGVyYXRpb25GYWN0b3IgPSB2ZWxvY2l0eS5tYXAoKHYsIGkpID0+IHYgLyAoc3RhdGUuYXhpc1ZlbG9jaXR5W2ldIHx8IDEpKVxuXG4gICAgc3RhdGUuYXhpc1ZlbG9jaXR5ID0gdmVsb2NpdHlcbiAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzLnB1c2goYWNjZWxlcmF0aW9uRmFjdG9yKVxuXG4gICAgdXBkYXRlV2lsbEVuZFRpbWVvdXQoZGVsdGFUaW1lKVxuICB9XG5cbiAgY29uc3QgdXBkYXRlV2lsbEVuZFRpbWVvdXQgPSAoZGVsdGFUaW1lOiBudW1iZXIpID0+IHtcbiAgICAvLyB1c2UgY3VycmVudCB0aW1lIGJldHdlZW4gZXZlbnRzIHJvdW5kZWQgdXAgYW5kIGluY3JlYXNlZCBieSBhIGJpdCBhcyB0aW1lb3V0XG4gICAgbGV0IG5ld1RpbWVvdXQgPSBNYXRoLmNlaWwoZGVsdGFUaW1lIC8gMTApICogMTAgKiAxLjJcblxuICAgIC8vIGRvdWJsZSB0aGUgdGltZW91dCwgd2hlbiBtb21lbnR1bSB3YXMgbm90IGRldGVjdGVkIHlldFxuICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgbmV3VGltZW91dCA9IE1hdGgubWF4KDEwMCwgbmV3VGltZW91dCAqIDIpXG4gICAgfVxuXG4gICAgc3RhdGUud2lsbEVuZFRpbWVvdXQgPSBNYXRoLm1pbigxMDAwLCBNYXRoLnJvdW5kKG5ld1RpbWVvdXQpKVxuICB9XG5cbiAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlID0gKGFjY0ZhY3RvcjogbnVtYmVyKSA9PiB7XG4gICAgLy8gd2hlbiBtYWluIGF4aXMgaXMgdGhlIHRoZSBvdGhlciBvbmUgYW5kIHRoZXJlIGlzIG5vIG1vdmVtZW50L2NoYW5nZSBvbiB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAoYWNjRmFjdG9yID09PSAwKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBhY2NGYWN0b3IgPD0gQUNDX0ZBQ1RPUl9NQVggJiYgYWNjRmFjdG9yID49IEFDQ19GQUNUT1JfTUlOXG4gIH1cblxuICBjb25zdCBkZXRlY3RNb21lbnR1bSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5sZW5ndGggPj0gV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSkge1xuICAgICAgaWYgKG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50KSB7XG4gICAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBpZiAoYWJzTWF4KHN0YXRlLmF4aXNWZWxvY2l0eSkgPj0gMC4yKSB7XG4gICAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzID0gc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5zbGljZShXSEVFTEVWRU5UU19UT19BTkFMQVpFICogLTEpXG5cbiAgICAgIC8vIGNoZWNrIHJlY2VudCBhY2NlbGVyYXRpb24gLyBkZWNlbGVyYXRpb24gZmFjdG9yc1xuICAgICAgLy8gYWxsIHJlY2VudCBuZWVkIHRvIG1hdGNoLCBpZiBhbnkgZGlkIG5vdCBtYXRjaFxuICAgICAgY29uc3QgZGV0ZWN0ZWRNb21lbnR1bSA9IHJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMuZXZlcnkoKGFjY0ZhYykgPT4ge1xuICAgICAgICAvLyB3aGVuIGJvdGggYXhpcyBkZWNlbGVyYXRlIGV4YWN0bHkgaW4gdGhlIHNhbWUgcmF0ZSBpdCBpcyB2ZXJ5IGxpa2VseSBjYXVzZWQgYnkgbW9tZW50dW1cbiAgICAgICAgY29uc3Qgc2FtZUFjY0ZhYyA9ICEhYWNjRmFjLnJlZHVjZSgoZjEsIGYyKSA9PiAoZjEgJiYgZjEgPCAxICYmIGYxID09PSBmMiA/IDEgOiAwKSlcblxuICAgICAgICAvLyBjaGVjayBpZiBhY2NlbGVyYXRpb24gZmFjdG9yIGlzIHdpdGhpbiBtb21lbnR1bSByYW5nZVxuICAgICAgICBjb25zdCBib3RoQXJlSW5SYW5nZU9yWmVybyA9IGFjY0ZhYy5maWx0ZXIoYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlKS5sZW5ndGggPT09IGFjY0ZhYy5sZW5ndGhcblxuICAgICAgICAvLyBvbmUgdGhlIHJlcXVpcmVtZW50cyBtdXN0IGJlIGZ1bGZpbGxlZFxuICAgICAgICByZXR1cm4gc2FtZUFjY0ZhYyB8fCBib3RoQXJlSW5SYW5nZU9yWmVyb1xuICAgICAgfSlcblxuICAgICAgaWYgKGRldGVjdGVkTW9tZW50dW0pIHtcbiAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgIH1cblxuICAgICAgLy8gb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBldmVudHNcbiAgICAgIHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMgPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjb2duaXplZE1vbWVudHVtID0gKCkgPT4ge1xuICAgIHN0YXRlLmlzTW9tZW50dW0gPSB0cnVlXG4gIH1cblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gICAgc3RhdGUuaXNTdGFydGVkID0gdHJ1ZVxuICAgIHN0YXRlLnN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gdW5kZWZpbmVkXG4gICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSBmYWxzZVxuICB9XG5cbiAgY29uc3Qgd2lsbEVuZCA9ICgoKSA9PiB7XG4gICAgbGV0IHdpbGxFbmRJZDogbnVtYmVyXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh3aWxsRW5kSWQpXG4gICAgICB3aWxsRW5kSWQgPSBzZXRUaW1lb3V0KGVuZCwgc3RhdGUud2lsbEVuZFRpbWVvdXQpXG4gICAgfVxuICB9KSgpXG5cbiAgY29uc3QgZW5kID0gKGlzTW9tZW50dW1DYW5jZWwgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghc3RhdGUuaXNTdGFydGVkKSByZXR1cm5cblxuICAgIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGlzTW9tZW50dW1DYW5jZWwpIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlLCBpc01vbWVudHVtQ2FuY2VsOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgc3RhdGUuaXNNb21lbnR1bSA9IGZhbHNlXG4gICAgc3RhdGUuaXNTdGFydGVkID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHsgb2JzZXJ2ZSwgdW5vYnNlcnZlLCBkaXNjb25uZWN0IH0gPSBXaGVlbFRhcmdldE9ic2VydmVyKGZlZWRXaGVlbClcblxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnNQYXJhbSlcblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gICAgZmVlZFdoZWVsLFxuICAgIHVwZGF0ZU9wdGlvbnMsXG4gIH0pXG59XG4iLCJleHBvcnQgY29uc3QgYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icykgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzbGlkZXNUaHVtYnMubWFwKFxuICAgICAgICAoXywgaW5kZXgpID0+IChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGVtYmxhQXBpTWFpbi5zY3JvbGxUbyhpbmRleCk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzbGlkZU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icywgZW1ibGFBcGlUaHVtYiA9IG51bGwpID0+IHtcbiAgICBjb25zdCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKCk7XG5cbiAgICAgICAgZW1ibGFBcGlUaHVtYj8uc2Nyb2xsVG8oc2VsZWN0ZWQpO1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkO1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLWFjdGl2ZScsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCBpc1NlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBlbWJsYUFwaU1haW5cbiAgICAgICAgLm9uKCdzZWxlY3QnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdyZUluaXQnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSk7XG4gICAgdG9nZ2xlVGh1bWJCdG5zU3RhdGUoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGVtYmxhQXBpTWFpbi5vZmYoJ3NlbGVjdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKTtcbiAgICAgICAgZW1ibGFBcGlNYWluLm9mZigncmVJbml0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpO1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd1ay1hY3RpdmUnKTtcbiAgICAgICAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50Jyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaSwgcHJldkJ0biwgbmV4dEJ0bikgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFByZXYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZW1ibGFBcGkuc2Nyb2xsUHJldigpO1xuICAgIH07XG4gICAgY29uc3Qgc2Nyb2xsTmV4dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbWJsYUFwaS5zY3JvbGxOZXh0KCk7XG4gICAgfTtcbiAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUHJldiwgZmFsc2UpO1xuICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxOZXh0LCBmYWxzZSk7XG5cbiAgICBjb25zdCByZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUgPSBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoXG4gICAgICAgIGVtYmxhQXBpLFxuICAgICAgICBwcmV2QnRuLFxuICAgICAgICBuZXh0QnRuXG4gICAgKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSgpO1xuICAgICAgICBwcmV2QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUHJldiwgZmFsc2UpO1xuICAgICAgICBuZXh0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTmV4dCwgZmFsc2UpO1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoZW1ibGFBcGksIHByZXZCdG4sIG5leHRCdG4pIHtcbiAgICBjb25zdCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbFByZXYoKSkge1xuICAgICAgICAgICAgcHJldkJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbWJsYUFwaS5jYW5TY3JvbGxOZXh0KCkpIHtcbiAgICAgICAgICAgIG5leHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1ibGFBcGlcbiAgICAgICAgLm9uKCdzZWxlY3QnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdpbml0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpXG4gICAgICAgIC5vbigncmVJbml0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZW1ibGFBcGkub2ZmKCdzZWxlY3QnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG4gICAgICAgIGVtYmxhQXBpLm9mZignaW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKTtcbiAgICAgICAgZW1ibGFBcGkub2ZmKCdyZUluaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG4gICAgICAgIHByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICBuZXh0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9O1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IHsgQ3JlYXRlT3B0aW9uc1R5cGUsIEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5cbmV4cG9ydCB0eXBlIERlbGF5T3B0aW9uVHlwZSA9XG4gIHwgbnVtYmVyXG4gIHwgKChzY3JvbGxTbmFwczogbnVtYmVyW10sIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gbnVtYmVyW10pXG5cbmV4cG9ydCB0eXBlIFJvb3ROb2RlVHlwZSA9XG4gIHwgbnVsbFxuICB8ICgoZW1ibGFSb290OiBIVE1MRWxlbWVudCkgPT4gSFRNTEVsZW1lbnQgfCBudWxsKVxuXG5leHBvcnQgdHlwZSBPcHRpb25zVHlwZSA9IENyZWF0ZU9wdGlvbnNUeXBlPHtcbiAgZGVsYXk6IERlbGF5T3B0aW9uVHlwZVxuICBqdW1wOiBib29sZWFuXG4gIHBsYXlPbkluaXQ6IGJvb2xlYW5cbiAgc3RvcE9uRm9jdXNJbjogYm9vbGVhblxuICBzdG9wT25JbnRlcmFjdGlvbjogYm9vbGVhblxuICBzdG9wT25Nb3VzZUVudGVyOiBib29sZWFuXG4gIHN0b3BPbkxhc3RTbmFwOiBib29sZWFuXG4gIHJvb3ROb2RlOiBSb290Tm9kZVR5cGVcbn0+XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogT3B0aW9uc1R5cGUgPSB7XG4gIGFjdGl2ZTogdHJ1ZSxcbiAgYnJlYWtwb2ludHM6IHt9LFxuICBkZWxheTogNDAwMCxcbiAganVtcDogZmFsc2UsXG4gIHBsYXlPbkluaXQ6IHRydWUsXG4gIHN0b3BPbkZvY3VzSW46IHRydWUsXG4gIHN0b3BPbkludGVyYWN0aW9uOiB0cnVlLFxuICBzdG9wT25Nb3VzZUVudGVyOiBmYWxzZSxcbiAgc3RvcE9uTGFzdFNuYXA6IGZhbHNlLFxuICByb290Tm9kZTogbnVsbFxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICdlbWJsYS1jYXJvdXNlbC9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBEZWxheU9wdGlvblR5cGUsIFJvb3ROb2RlVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlbGF5KFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGRlbGF5OiBEZWxheU9wdGlvblR5cGVcbik6IG51bWJlcltdIHtcbiAgY29uc3Qgc2Nyb2xsU25hcHMgPSBlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpXG5cbiAgaWYgKHR5cGVvZiBkZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gc2Nyb2xsU25hcHMubWFwKCgpID0+IGRlbGF5KVxuICB9XG4gIHJldHVybiBkZWxheShzY3JvbGxTbmFwcywgZW1ibGFBcGkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRvcGxheVJvb3ROb2RlKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIHJvb3ROb2RlOiBSb290Tm9kZVR5cGVcbik6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgZW1ibGFSb290Tm9kZSA9IGVtYmxhQXBpLnJvb3ROb2RlKClcbiAgcmV0dXJuIChyb290Tm9kZSAmJiByb290Tm9kZShlbWJsYVJvb3ROb2RlKSkgfHwgZW1ibGFSb290Tm9kZVxufVxuIiwiaW1wb3J0IHsgT3B0aW9uc1R5cGUsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgZ2V0QXV0b3BsYXlSb290Tm9kZSwgbm9ybWFsaXplRGVsYXkgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHtcbiAgQ3JlYXRlUGx1Z2luVHlwZSxcbiAgT3B0aW9uc0hhbmRsZXJUeXBlLFxuICBFbWJsYUNhcm91c2VsVHlwZVxufSBmcm9tICdlbWJsYS1jYXJvdXNlbCdcblxuZGVjbGFyZSBtb2R1bGUgJ2VtYmxhLWNhcm91c2VsJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBhdXRvcGxheTogQXV0b3BsYXlUeXBlXG4gIH1cblxuICBpbnRlcmZhY2UgRW1ibGFFdmVudExpc3RUeXBlIHtcbiAgICBhdXRvcGxheVBsYXk6ICdhdXRvcGxheTpwbGF5J1xuICAgIGF1dG9wbGF5U3RvcDogJ2F1dG9wbGF5OnN0b3AnXG4gICAgYXV0b3BsYXlTZWxlY3Q6ICdhdXRvcGxheTpzZWxlY3QnXG4gICAgYXV0b3BsYXlUaW1lclNldDogJ2F1dG9wbGF5OnRpbWVyc2V0J1xuICAgIGF1dG9wbGF5VGltZXJTdG9wcGVkOiAnYXV0b3BsYXk6dGltZXJzdG9wcGVkJ1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIEF1dG9wbGF5VHlwZSA9IENyZWF0ZVBsdWdpblR5cGU8XG4gIHtcbiAgICBwbGF5OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgICBzdG9wOiAoKSA9PiB2b2lkXG4gICAgcmVzZXQ6ICgpID0+IHZvaWRcbiAgICBpc1BsYXlpbmc6ICgpID0+IGJvb2xlYW5cbiAgICB0aW1lVW50aWxOZXh0OiAoKSA9PiBudW1iZXIgfCBudWxsXG4gIH0sXG4gIE9wdGlvbnNUeXBlXG4+XG5cbmV4cG9ydCB0eXBlIEF1dG9wbGF5T3B0aW9uc1R5cGUgPSBBdXRvcGxheVR5cGVbJ29wdGlvbnMnXVxuXG5mdW5jdGlvbiBBdXRvcGxheSh1c2VyT3B0aW9uczogQXV0b3BsYXlPcHRpb25zVHlwZSA9IHt9KTogQXV0b3BsYXlUeXBlIHtcbiAgbGV0IG9wdGlvbnM6IE9wdGlvbnNUeXBlXG4gIGxldCBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGVcbiAgbGV0IGRlc3Ryb3llZDogYm9vbGVhblxuICBsZXQgZGVsYXk6IFJldHVyblR5cGU8RW1ibGFDYXJvdXNlbFR5cGVbJ3Njcm9sbFNuYXBMaXN0J10+XG4gIGxldCB0aW1lclN0YXJ0VGltZTogbnVsbCB8IG51bWJlciA9IG51bGxcbiAgbGV0IHRpbWVySWQgPSAwXG4gIGxldCBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIGxldCBtb3VzZUlzT3ZlciA9IGZhbHNlXG4gIGxldCBwbGF5T25Eb2N1bWVudFZpc2libGUgPSBmYWxzZVxuICBsZXQganVtcCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChcbiAgICBlbWJsYUFwaUluc3RhbmNlOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4gICk6IHZvaWQge1xuICAgIGVtYmxhQXBpID0gZW1ibGFBcGlJbnN0YW5jZVxuXG4gICAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhIH0gPSBvcHRpb25zSGFuZGxlclxuICAgIGNvbnN0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBBdXRvcGxheS5nbG9iYWxPcHRpb25zKVxuICAgIGNvbnN0IGFsbE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHVzZXJPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShhbGxPcHRpb25zKVxuXG4gICAgaWYgKGVtYmxhQXBpLnNjcm9sbFNuYXBMaXN0KCkubGVuZ3RoIDw9IDEpIHJldHVyblxuXG4gICAganVtcCA9IG9wdGlvbnMuanVtcFxuICAgIGRlc3Ryb3llZCA9IGZhbHNlXG4gICAgZGVsYXkgPSBub3JtYWxpemVEZWxheShlbWJsYUFwaSwgb3B0aW9ucy5kZWxheSlcblxuICAgIGNvbnN0IHsgZXZlbnRTdG9yZSwgb3duZXJEb2N1bWVudCB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gISFlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpLm9wdGlvbnMud2F0Y2hEcmFnXG4gICAgY29uc3Qgcm9vdCA9IGdldEF1dG9wbGF5Um9vdE5vZGUoZW1ibGFBcGksIG9wdGlvbnMucm9vdE5vZGUpXG5cbiAgICBldmVudFN0b3JlLmFkZChvd25lckRvY3VtZW50LCAndmlzaWJpbGl0eWNoYW5nZScsIHZpc2liaWxpdHlDaGFuZ2UpXG5cbiAgICBpZiAoaXNEcmFnZ2FibGUpIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdwb2ludGVyRG93bicsIHBvaW50ZXJEb3duKVxuICAgIH1cblxuICAgIGlmIChpc0RyYWdnYWJsZSAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZW1ibGFBcGkub24oJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zdG9wT25Nb3VzZUVudGVyKSB7XG4gICAgICBldmVudFN0b3JlLmFkZChyb290LCAnbW91c2VlbnRlcicsIG1vdXNlRW50ZXIpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uTW91c2VFbnRlciAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQocm9vdCwgJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbkZvY3VzSW4pIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdzbGlkZUZvY3VzU3RhcnQnLCBzdG9wQXV0b3BsYXkpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uRm9jdXNJbiAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQoZW1ibGFBcGkuY29udGFpbmVyTm9kZSgpLCAnZm9jdXNvdXQnLCBzdGFydEF1dG9wbGF5KVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBsYXlPbkluaXQpIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBlbWJsYUFwaVxuICAgICAgLm9mZigncG9pbnRlckRvd24nLCBwb2ludGVyRG93bilcbiAgICAgIC5vZmYoJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcbiAgICAgIC5vZmYoJ3NsaWRlRm9jdXNTdGFydCcsIHN0b3BBdXRvcGxheSlcblxuICAgIHN0b3BBdXRvcGxheSgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICAgIGF1dG9wbGF5QWN0aXZlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRpbWVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgb3duZXJXaW5kb3cgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZClcbiAgICB0aW1lcklkID0gb3duZXJXaW5kb3cuc2V0VGltZW91dChuZXh0LCBkZWxheVtlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKV0pXG4gICAgdGltZXJTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnRpbWVyc2V0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVGltZXIoKTogdm9pZCB7XG4gICAgY29uc3QgeyBvd25lcldpbmRvdyB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIG93bmVyV2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKVxuICAgIHRpbWVySWQgPSAwXG4gICAgdGltZXJTdGFydFRpbWUgPSBudWxsXG4gICAgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6dGltZXJzdG9wcGVkJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0QXV0b3BsYXkoKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgaWYgKGRvY3VtZW50SXNIaWRkZW4oKSkge1xuICAgICAgcGxheU9uRG9jdW1lbnRWaXNpYmxlID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghYXV0b3BsYXlBY3RpdmUpIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnBsYXknKVxuXG4gICAgc2V0VGltZXIoKVxuICAgIGF1dG9wbGF5QWN0aXZlID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEF1dG9wbGF5KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6c3RvcCcpXG5cbiAgICBjbGVhclRpbWVyKClcbiAgICBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiB2aXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudElzSGlkZGVuKCkpIHtcbiAgICAgIHBsYXlPbkRvY3VtZW50VmlzaWJsZSA9IGF1dG9wbGF5QWN0aXZlXG4gICAgICByZXR1cm4gc3RvcEF1dG9wbGF5KClcbiAgICB9XG5cbiAgICBpZiAocGxheU9uRG9jdW1lbnRWaXNpYmxlKSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvY3VtZW50SXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBvd25lckRvY3VtZW50IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJ1xuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oKTogdm9pZCB7XG4gICAgaWYgKCFtb3VzZUlzT3Zlcikgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJVcCgpOiB2b2lkIHtcbiAgICBpZiAoIW1vdXNlSXNPdmVyKSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgbW91c2VJc092ZXIgPSB0cnVlXG4gICAgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgbW91c2VJc092ZXIgPSBmYWxzZVxuICAgIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGxheShqdW1wT3ZlcnJpZGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBqdW1wT3ZlcnJpZGUgIT09ICd1bmRlZmluZWQnKSBqdW1wID0ganVtcE92ZXJyaWRlXG4gICAgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCk6IHZvaWQge1xuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCk6IHZvaWQge1xuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBpc1BsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGF1dG9wbGF5QWN0aXZlXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleC5jbG9uZSgpLmFkZCgxKS5nZXQoKVxuICAgIGNvbnN0IGxhc3RJbmRleCA9IGVtYmxhQXBpLnNjcm9sbFNuYXBMaXN0KCkubGVuZ3RoIC0gMVxuICAgIGNvbnN0IGtpbGwgPSBvcHRpb25zLnN0b3BPbkxhc3RTbmFwICYmIG5leHRJbmRleCA9PT0gbGFzdEluZGV4XG5cbiAgICBpZiAoZW1ibGFBcGkuY2FuU2Nyb2xsTmV4dCgpKSB7XG4gICAgICBlbWJsYUFwaS5zY3JvbGxOZXh0KGp1bXApXG4gICAgfSBlbHNlIHtcbiAgICAgIGVtYmxhQXBpLnNjcm9sbFRvKDAsIGp1bXApXG4gICAgfVxuXG4gICAgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6c2VsZWN0JylcblxuICAgIGlmIChraWxsKSByZXR1cm4gc3RvcEF1dG9wbGF5KClcbiAgICBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVVbnRpbE5leHQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCF0aW1lclN0YXJ0VGltZSkgcmV0dXJuIG51bGxcbiAgICBjb25zdCBjdXJyZW50RGVsYXkgPSBkZWxheVtlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKV1cbiAgICBjb25zdCB0aW1lUGFzdFNpbmNlU3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRpbWVyU3RhcnRUaW1lXG4gICAgcmV0dXJuIGN1cnJlbnREZWxheSAtIHRpbWVQYXN0U2luY2VTdGFydFxuICB9XG5cbiAgY29uc3Qgc2VsZjogQXV0b3BsYXlUeXBlID0ge1xuICAgIG5hbWU6ICdhdXRvcGxheScsXG4gICAgb3B0aW9uczogdXNlck9wdGlvbnMsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBsYXksXG4gICAgc3RvcCxcbiAgICByZXNldCxcbiAgICBpc1BsYXlpbmcsXG4gICAgdGltZVVudGlsTmV4dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG5cbmRlY2xhcmUgbmFtZXNwYWNlIEF1dG9wbGF5IHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEF1dG9wbGF5T3B0aW9uc1R5cGUgfCB1bmRlZmluZWRcbn1cblxuQXV0b3BsYXkuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBBdXRvcGxheVxuIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRPcHRpb25UeXBlID1cbiAgfCAnc3RhcnQnXG4gIHwgJ2NlbnRlcidcbiAgfCAnZW5kJ1xuICB8ICgodmlld1NpemU6IG51bWJlciwgc25hcFNpemU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyKVxuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFsaWdubWVudChcbiAgYWxpZ246IEFsaWdubWVudE9wdGlvblR5cGUsXG4gIHZpZXdTaXplOiBudW1iZXJcbik6IEFsaWdubWVudFR5cGUge1xuICBjb25zdCBwcmVkZWZpbmVkID0geyBzdGFydCwgY2VudGVyLCBlbmQgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmQobikgLyAyXG4gIH1cblxuICBmdW5jdGlvbiBlbmQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmlld1NpemUgLSBuXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlciwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGlzU3RyaW5nKGFsaWduKSkgcmV0dXJuIHByZWRlZmluZWRbYWxpZ25dKG4pXG4gICAgcmV0dXJuIGFsaWduKHZpZXdTaXplLCBuLCBpbmRleClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFsaWdubWVudFR5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJ0eXBlIEV2ZW50TmFtZVR5cGUgPSBrZXlvZiBEb2N1bWVudEV2ZW50TWFwIHwga2V5b2YgV2luZG93RXZlbnRNYXBcbnR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IChldnQ6IGFueSkgPT4gdm9pZFxudHlwZSBFdmVudE9wdGlvbnNUeXBlID0gYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zIHwgdW5kZWZpbmVkXG50eXBlIEV2ZW50UmVtb3ZlclR5cGUgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIEV2ZW50U3RvcmVUeXBlID0ge1xuICBhZGQ6IChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9ucz86IEV2ZW50T3B0aW9uc1R5cGVcbiAgKSA9PiBFdmVudFN0b3JlVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRTdG9yZSgpOiBFdmVudFN0b3JlVHlwZSB7XG4gIGxldCBsaXN0ZW5lcnM6IEV2ZW50UmVtb3ZlclR5cGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkKFxuICAgIG5vZGU6IEV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IEV2ZW50TmFtZVR5cGUsXG4gICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgICBvcHRpb25zOiBFdmVudE9wdGlvbnNUeXBlID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgKTogRXZlbnRTdG9yZVR5cGUge1xuICAgIGxldCByZW1vdmVMaXN0ZW5lcjogRXZlbnRSZW1vdmVyVHlwZVxuXG4gICAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBub2RlKSB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucylcbiAgICAgIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlZ2FjeU1lZGlhUXVlcnlMaXN0ID0gPE1lZGlhUXVlcnlMaXN0Pm5vZGVcbiAgICAgIGxlZ2FjeU1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKGhhbmRsZXIpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IGxlZ2FjeU1lZGlhUXVlcnlMaXN0LnJlbW92ZUxpc3RlbmVyKGhhbmRsZXIpXG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnB1c2gocmVtb3ZlTGlzdGVuZXIpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoKHJlbW92ZSkgPT4gcmVtb3ZlKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudFN0b3JlVHlwZSA9IHtcbiAgICBhZGQsXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lVHlwZSB9IGZyb20gJy4vRW5naW5lJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVXBkYXRlVHlwZSA9IChlbmdpbmU6IEVuZ2luZVR5cGUpID0+IHZvaWRcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKGVuZ2luZTogRW5naW5lVHlwZSwgYWxwaGE6IG51bWJlcikgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHN0YXJ0OiAoKSA9PiB2b2lkXG4gIHN0b3A6ICgpID0+IHZvaWRcbiAgdXBkYXRlOiAoKSA9PiB2b2lkXG4gIHJlbmRlcjogKGFscGhhOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFuaW1hdGlvbnMoXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdXBkYXRlOiAoKSA9PiB2b2lkLFxuICByZW5kZXI6IChhbHBoYTogbnVtYmVyKSA9PiB2b2lkXG4pOiBBbmltYXRpb25zVHlwZSB7XG4gIGNvbnN0IGRvY3VtZW50VmlzaWJsZUhhbmRsZXIgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZml4ZWRUaW1lU3RlcCA9IDEwMDAgLyA2MFxuXG4gIGxldCBsYXN0VGltZVN0YW1wOiBudW1iZXIgfCBudWxsID0gbnVsbFxuICBsZXQgYWNjdW11bGF0ZWRUaW1lID0gMFxuICBsZXQgYW5pbWF0aW9uSWQgPSAwXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmFkZChvd25lckRvY3VtZW50LCAndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcbiAgICAgIGlmIChvd25lckRvY3VtZW50LmhpZGRlbikgcmVzZXQoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIHN0b3AoKVxuICAgIGRvY3VtZW50VmlzaWJsZUhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSh0aW1lU3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApOiB2b2lkIHtcbiAgICBpZiAoIWFuaW1hdGlvbklkKSByZXR1cm5cbiAgICBpZiAoIWxhc3RUaW1lU3RhbXApIHtcbiAgICAgIGxhc3RUaW1lU3RhbXAgPSB0aW1lU3RhbXBcbiAgICAgIHVwZGF0ZSgpXG4gICAgICB1cGRhdGUoKVxuICAgIH1cblxuICAgIGNvbnN0IHRpbWVFbGFwc2VkID0gdGltZVN0YW1wIC0gbGFzdFRpbWVTdGFtcFxuICAgIGxhc3RUaW1lU3RhbXAgPSB0aW1lU3RhbXBcbiAgICBhY2N1bXVsYXRlZFRpbWUgKz0gdGltZUVsYXBzZWRcblxuICAgIHdoaWxlIChhY2N1bXVsYXRlZFRpbWUgPj0gZml4ZWRUaW1lU3RlcCkge1xuICAgICAgdXBkYXRlKClcbiAgICAgIGFjY3VtdWxhdGVkVGltZSAtPSBmaXhlZFRpbWVTdGVwXG4gICAgfVxuXG4gICAgY29uc3QgYWxwaGEgPSBhY2N1bXVsYXRlZFRpbWUgLyBmaXhlZFRpbWVTdGVwXG4gICAgcmVuZGVyKGFscGhhKVxuXG4gICAgaWYgKGFuaW1hdGlvbklkKSB7XG4gICAgICBhbmltYXRpb25JZCA9IG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IHZvaWQge1xuICAgIGlmIChhbmltYXRpb25JZCkgcmV0dXJuXG4gICAgYW5pbWF0aW9uSWQgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKTogdm9pZCB7XG4gICAgb3duZXJXaW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uSWQpXG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBhY2N1bXVsYXRlZFRpbWUgPSAwXG4gICAgYW5pbWF0aW9uSWQgPSAwXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBsYXN0VGltZVN0YW1wID0gbnVsbFxuICAgIGFjY3VtdWxhdGVkVGltZSA9IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFuaW1hdGlvbnNUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBzdGFydCxcbiAgICBzdG9wLFxuICAgIHVwZGF0ZSxcbiAgICByZW5kZXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5cbmV4cG9ydCB0eXBlIEF4aXNPcHRpb25UeXBlID0gJ3gnIHwgJ3knXG5leHBvcnQgdHlwZSBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZSA9ICdsdHInIHwgJ3J0bCdcbnR5cGUgQXhpc0VkZ2VUeXBlID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCdcblxuZXhwb3J0IHR5cGUgQXhpc1R5cGUgPSB7XG4gIHNjcm9sbDogQXhpc09wdGlvblR5cGVcbiAgY3Jvc3M6IEF4aXNPcHRpb25UeXBlXG4gIHN0YXJ0RWRnZTogQXhpc0VkZ2VUeXBlXG4gIGVuZEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBtZWFzdXJlU2l6ZTogKG5vZGVSZWN0OiBOb2RlUmVjdFR5cGUpID0+IG51bWJlclxuICBkaXJlY3Rpb246IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXhpcyhcbiAgYXhpczogQXhpc09wdGlvblR5cGUsXG4gIGNvbnRlbnREaXJlY3Rpb246IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlXG4pOiBBeGlzVHlwZSB7XG4gIGNvbnN0IGlzUmlnaHRUb0xlZnQgPSBjb250ZW50RGlyZWN0aW9uID09PSAncnRsJ1xuICBjb25zdCBpc1ZlcnRpY2FsID0gYXhpcyA9PT0gJ3knXG4gIGNvbnN0IHNjcm9sbCA9IGlzVmVydGljYWwgPyAneScgOiAneCdcbiAgY29uc3QgY3Jvc3MgPSBpc1ZlcnRpY2FsID8gJ3gnIDogJ3knXG4gIGNvbnN0IHNpZ24gPSAhaXNWZXJ0aWNhbCAmJiBpc1JpZ2h0VG9MZWZ0ID8gLTEgOiAxXG4gIGNvbnN0IHN0YXJ0RWRnZSA9IGdldFN0YXJ0RWRnZSgpXG4gIGNvbnN0IGVuZEVkZ2UgPSBnZXRFbmRFZGdlKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU2l6ZShub2RlUmVjdDogTm9kZVJlY3RUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IG5vZGVSZWN0XG4gICAgcmV0dXJuIGlzVmVydGljYWwgPyBoZWlnaHQgOiB3aWR0aFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RhcnRFZGdlKCk6IEF4aXNFZGdlVHlwZSB7XG4gICAgaWYgKGlzVmVydGljYWwpIHJldHVybiAndG9wJ1xuICAgIHJldHVybiBpc1JpZ2h0VG9MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5kRWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ2JvdHRvbSdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBuICogc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZjogQXhpc1R5cGUgPSB7XG4gICAgc2Nyb2xsLFxuICAgIGNyb3NzLFxuICAgIHN0YXJ0RWRnZSxcbiAgICBlbmRFZGdlLFxuICAgIG1lYXN1cmVTaXplLFxuICAgIGRpcmVjdGlvblxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgTGltaXRUeXBlID0ge1xuICBtaW46IG51bWJlclxuICBtYXg6IG51bWJlclxuICBsZW5ndGg6IG51bWJlclxuICBjb25zdHJhaW46IChuOiBudW1iZXIpID0+IG51bWJlclxuICByZWFjaGVkQW55OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNYXg6IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVhY2hlZE1pbjogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZW1vdmVPZmZzZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGltaXQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDApOiBMaW1pdFR5cGUge1xuICBjb25zdCBsZW5ndGggPSBtYXRoQWJzKG1pbiAtIG1heClcblxuICBmdW5jdGlvbiByZWFjaGVkTWluKG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuIDwgbWluXG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkTWF4KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuID4gbWF4XG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkQW55KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWFjaGVkTWluKG4pIHx8IHJlYWNoZWRNYXgobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghcmVhY2hlZEFueShuKSkgcmV0dXJuIG5cbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSA/IG1pbiA6IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlT2Zmc2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFsZW5ndGgpIHJldHVybiBuXG4gICAgcmV0dXJuIG4gLSBsZW5ndGggKiBNYXRoLmNlaWwoKG4gLSBtYXgpIC8gbGVuZ3RoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogTGltaXRUeXBlID0ge1xuICAgIGxlbmd0aCxcbiAgICBtYXgsXG4gICAgbWluLFxuICAgIGNvbnN0cmFpbixcbiAgICByZWFjaGVkQW55LFxuICAgIHJlYWNoZWRNYXgsXG4gICAgcmVhY2hlZE1pbixcbiAgICByZW1vdmVPZmZzZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIENvdW50ZXJUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGFkZDogKG46IG51bWJlcikgPT4gQ291bnRlclR5cGVcbiAgY2xvbmU6ICgpID0+IENvdW50ZXJUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudGVyKFxuICBtYXg6IG51bWJlcixcbiAgc3RhcnQ6IG51bWJlcixcbiAgbG9vcDogYm9vbGVhblxuKTogQ291bnRlclR5cGUge1xuICBjb25zdCB7IGNvbnN0cmFpbiB9ID0gTGltaXQoMCwgbWF4KVxuICBjb25zdCBsb29wRW5kID0gbWF4ICsgMVxuICBsZXQgY291bnRlciA9IHdpdGhpbkxpbWl0KHN0YXJ0KVxuXG4gIGZ1bmN0aW9uIHdpdGhpbkxpbWl0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICFsb29wID8gY29uc3RyYWluKG4pIDogbWF0aEFicygobG9vcEVuZCArIG4pICUgbG9vcEVuZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjb3VudGVyXG4gIH1cblxuICBmdW5jdGlvbiBzZXQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIGNvdW50ZXIgPSB3aXRoaW5MaW1pdChuKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBjbG9uZSgpLnNldChnZXQoKSArIG4pXG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZSgpOiBDb3VudGVyVHlwZSB7XG4gICAgcmV0dXJuIENvdW50ZXIobWF4LCBnZXQoKSwgbG9vcClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IENvdW50ZXJUeXBlID0ge1xuICAgIGdldCxcbiAgICBzZXQsXG4gICAgYWRkLFxuICAgIGNsb25lXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgQW5pbWF0aW9uc1R5cGUgfSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IERyYWdUcmFja2VyVHlwZSwgUG9pbnRlckV2ZW50VHlwZSB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5pbXBvcnQgeyBMaW1pdCB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQge1xuICBkZWx0YUFicyxcbiAgZmFjdG9yQWJzLFxuICBpc0Jvb2xlYW4sXG4gIGlzTW91c2VFdmVudCxcbiAgbWF0aEFicyxcbiAgbWF0aFNpZ24sXG4gIFdpbmRvd1R5cGVcbn0gZnJvbSAnLi91dGlscydcblxudHlwZSBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZSA9IChcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBldnQ6IFBvaW50ZXJFdmVudFR5cGVcbikgPT4gYm9vbGVhbiB8IHZvaWRcblxuZXhwb3J0IHR5cGUgRHJhZ0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IERyYWdIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHBvaW50ZXJEb3duOiAoKSA9PiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmFnSGFuZGxlcihcbiAgYXhpczogQXhpc1R5cGUsXG4gIHJvb3ROb2RlOiBIVE1MRWxlbWVudCxcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgZHJhZ1RyYWNrZXI6IERyYWdUcmFja2VyVHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZSxcbiAgaW5kZXg6IENvdW50ZXJUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlLFxuICBkcmFnRnJlZTogYm9vbGVhbixcbiAgZHJhZ1RocmVzaG9sZDogbnVtYmVyLFxuICBza2lwU25hcHM6IGJvb2xlYW4sXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyLFxuICB3YXRjaERyYWc6IERyYWdIYW5kbGVyT3B0aW9uVHlwZVxuKTogRHJhZ0hhbmRsZXJUeXBlIHtcbiAgY29uc3QgeyBjcm9zczogY3Jvc3NBeGlzLCBkaXJlY3Rpb24gfSA9IGF4aXNcbiAgY29uc3QgZm9jdXNOb2RlcyA9IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ11cbiAgY29uc3Qgbm9uUGFzc2l2ZUV2ZW50ID0geyBwYXNzaXZlOiBmYWxzZSB9XG4gIGNvbnN0IGluaXRFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZHJhZ0V2ZW50cyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBnb1RvTmV4dFRocmVzaG9sZCA9IExpbWl0KDUwLCAyMjUpLmNvbnN0cmFpbihwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMjApKVxuICBjb25zdCBzbmFwRm9yY2VCb29zdCA9IHsgbW91c2U6IDMwMCwgdG91Y2g6IDQwMCB9XG4gIGNvbnN0IGZyZWVGb3JjZUJvb3N0ID0geyBtb3VzZTogNTAwLCB0b3VjaDogNjAwIH1cbiAgY29uc3QgYmFzZVNwZWVkID0gZHJhZ0ZyZWUgPyA0MyA6IDI1XG5cbiAgbGV0IGlzTW92aW5nID0gZmFsc2VcbiAgbGV0IHN0YXJ0U2Nyb2xsID0gMFxuICBsZXQgc3RhcnRDcm9zcyA9IDBcbiAgbGV0IHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICBsZXQgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gIGxldCBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICBsZXQgaXNNb3VzZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoRHJhZykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkb3duSWZBbGxvd2VkKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaERyYWcpIHx8IHdhdGNoRHJhZyhlbWJsYUFwaSwgZXZ0KSkgZG93bihldnQpXG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlXG4gICAgaW5pdEV2ZW50c1xuICAgICAgLmFkZChub2RlLCAnZHJhZ3N0YXJ0JywgKGV2dCkgPT4gZXZ0LnByZXZlbnREZWZhdWx0KCksIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsICgpID0+IHVuZGVmaW5lZCwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAndG91Y2hlbmQnLCAoKSA9PiB1bmRlZmluZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaHN0YXJ0JywgZG93bklmQWxsb3dlZClcbiAgICAgIC5hZGQobm9kZSwgJ21vdXNlZG93bicsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGNhbmNlbCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnY29udGV4dG1lbnUnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NsaWNrJywgY2xpY2ssIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGluaXRFdmVudHMuY2xlYXIoKVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRHJhZ0V2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gaXNNb3VzZSA/IG93bmVyRG9jdW1lbnQgOiByb290Tm9kZVxuICAgIGRyYWdFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsIG1vdmUsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgdXApXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZW1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZXVwJywgdXApXG4gIH1cblxuICBmdW5jdGlvbiBpc0ZvY3VzTm9kZShub2RlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lIHx8ICcnXG4gICAgcmV0dXJuIGZvY3VzTm9kZXMuaW5jbHVkZXMobm9kZU5hbWUpXG4gIH1cblxuICBmdW5jdGlvbiBmb3JjZUJvb3N0KCk6IG51bWJlciB7XG4gICAgY29uc3QgYm9vc3QgPSBkcmFnRnJlZSA/IGZyZWVGb3JjZUJvb3N0IDogc25hcEZvcmNlQm9vc3RcbiAgICBjb25zdCB0eXBlID0gaXNNb3VzZSA/ICdtb3VzZScgOiAndG91Y2gnXG4gICAgcmV0dXJuIGJvb3N0W3R5cGVdXG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd2VkRm9yY2UoZm9yY2U6IG51bWJlciwgdGFyZ2V0Q2hhbmdlZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgbmV4dCA9IGluZGV4LmFkZChtYXRoU2lnbihmb3JjZSkgKiAtMSlcbiAgICBjb25zdCBiYXNlRm9yY2UgPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZShmb3JjZSwgIWRyYWdGcmVlKS5kaXN0YW5jZVxuXG4gICAgaWYgKGRyYWdGcmVlIHx8IG1hdGhBYnMoZm9yY2UpIDwgZ29Ub05leHRUaHJlc2hvbGQpIHJldHVybiBiYXNlRm9yY2VcbiAgICBpZiAoc2tpcFNuYXBzICYmIHRhcmdldENoYW5nZWQpIHJldHVybiBiYXNlRm9yY2UgKiAwLjVcblxuICAgIHJldHVybiBzY3JvbGxUYXJnZXQuYnlJbmRleChuZXh0LmdldCgpLCAwKS5kaXN0YW5jZVxuICB9XG5cbiAgZnVuY3Rpb24gZG93bihldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc01vdXNlRXZ0ID0gaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaXNNb3VzZSA9IGlzTW91c2VFdnRcbiAgICBwcmV2ZW50Q2xpY2sgPSBkcmFnRnJlZSAmJiBpc01vdXNlRXZ0ICYmICFldnQuYnV0dG9ucyAmJiBpc01vdmluZ1xuICAgIGlzTW92aW5nID0gZGVsdGFBYnModGFyZ2V0LmdldCgpLCBsb2NhdGlvbi5nZXQoKSkgPj0gMlxuXG4gICAgaWYgKGlzTW91c2VFdnQgJiYgZXZ0LmJ1dHRvbiAhPT0gMCkgcmV0dXJuXG4gICAgaWYgKGlzRm9jdXNOb2RlKGV2dC50YXJnZXQgYXMgRWxlbWVudCkpIHJldHVyblxuXG4gICAgcG9pbnRlcklzRG93biA9IHRydWVcbiAgICBkcmFnVHJhY2tlci5wb2ludGVyRG93bihldnQpXG4gICAgc2Nyb2xsQm9keS51c2VGcmljdGlvbigwKS51c2VEdXJhdGlvbigwKVxuICAgIHRhcmdldC5zZXQobG9jYXRpb24pXG4gICAgYWRkRHJhZ0V2ZW50cygpXG4gICAgc3RhcnRTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIHN0YXJ0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJEb3duJylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNUb3VjaEV2dCA9ICFpc01vdXNlRXZlbnQoZXZ0LCBvd25lcldpbmRvdylcbiAgICBpZiAoaXNUb3VjaEV2dCAmJiBldnQudG91Y2hlcy5sZW5ndGggPj0gMikgcmV0dXJuIHVwKGV2dClcblxuICAgIGNvbnN0IGxhc3RTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIGNvbnN0IGxhc3RDcm9zcyA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQsIGNyb3NzQXhpcylcbiAgICBjb25zdCBkaWZmU2Nyb2xsID0gZGVsdGFBYnMobGFzdFNjcm9sbCwgc3RhcnRTY3JvbGwpXG4gICAgY29uc3QgZGlmZkNyb3NzID0gZGVsdGFBYnMobGFzdENyb3NzLCBzdGFydENyb3NzKVxuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsICYmICFpc01vdXNlKSB7XG4gICAgICBpZiAoIWV2dC5jYW5jZWxhYmxlKSByZXR1cm4gdXAoZXZ0KVxuICAgICAgcHJldmVudFNjcm9sbCA9IGRpZmZTY3JvbGwgPiBkaWZmQ3Jvc3NcbiAgICAgIGlmICghcHJldmVudFNjcm9sbCkgcmV0dXJuIHVwKGV2dClcbiAgICB9XG4gICAgY29uc3QgZGlmZiA9IGRyYWdUcmFja2VyLnBvaW50ZXJNb3ZlKGV2dClcbiAgICBpZiAoZGlmZlNjcm9sbCA+IGRyYWdUaHJlc2hvbGQpIHByZXZlbnRDbGljayA9IHRydWVcblxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMC4zKS51c2VEdXJhdGlvbigwLjc1KVxuICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgdGFyZ2V0LmFkZChkaXJlY3Rpb24oZGlmZikpXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKDAsIGZhbHNlKVxuICAgIGNvbnN0IHRhcmdldENoYW5nZWQgPSBjdXJyZW50TG9jYXRpb24uaW5kZXggIT09IGluZGV4LmdldCgpXG4gICAgY29uc3QgcmF3Rm9yY2UgPSBkcmFnVHJhY2tlci5wb2ludGVyVXAoZXZ0KSAqIGZvcmNlQm9vc3QoKVxuICAgIGNvbnN0IGZvcmNlID0gYWxsb3dlZEZvcmNlKGRpcmVjdGlvbihyYXdGb3JjZSksIHRhcmdldENoYW5nZWQpXG4gICAgY29uc3QgZm9yY2VGYWN0b3IgPSBmYWN0b3JBYnMocmF3Rm9yY2UsIGZvcmNlKVxuICAgIGNvbnN0IHNwZWVkID0gYmFzZVNwZWVkIC0gMTAgKiBmb3JjZUZhY3RvclxuICAgIGNvbnN0IGZyaWN0aW9uID0gYmFzZUZyaWN0aW9uICsgZm9yY2VGYWN0b3IgLyA1MFxuXG4gICAgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gICAgcG9pbnRlcklzRG93biA9IGZhbHNlXG4gICAgZHJhZ0V2ZW50cy5jbGVhcigpXG4gICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbihzcGVlZCkudXNlRnJpY3Rpb24oZnJpY3Rpb24pXG4gICAgc2Nyb2xsVG8uZGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSlcbiAgICBpc01vdXNlID0gZmFsc2VcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9pbnRlclVwJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChwcmV2ZW50Q2xpY2spIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHByZXZlbnRDbGljayA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBvaW50ZXJJc0Rvd25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgcG9pbnRlckRvd25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc09wdGlvblR5cGUsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgaXNNb3VzZUV2ZW50LCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBQb2ludGVyQ29vcmRUeXBlID0ga2V5b2YgVG91Y2ggfCBrZXlvZiBNb3VzZUV2ZW50XG5leHBvcnQgdHlwZSBQb2ludGVyRXZlbnRUeXBlID0gVG91Y2hFdmVudCB8IE1vdXNlRXZlbnRcblxuZXhwb3J0IHR5cGUgRHJhZ1RyYWNrZXJUeXBlID0ge1xuICBwb2ludGVyRG93bjogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJNb3ZlOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcG9pbnRlclVwOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcmVhZFBvaW50OiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlLCBldnRBeGlzPzogQXhpc09wdGlvblR5cGUpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ1RyYWNrZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogRHJhZ1RyYWNrZXJUeXBlIHtcbiAgY29uc3QgbG9nSW50ZXJ2YWwgPSAxNzBcblxuICBsZXQgc3RhcnRFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuICBsZXQgbGFzdEV2ZW50OiBQb2ludGVyRXZlbnRUeXBlXG5cbiAgZnVuY3Rpb24gcmVhZFRpbWUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZXZ0LnRpbWVTdGFtcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFBvaW50KGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IGV2dEF4aXMgfHwgYXhpcy5zY3JvbGxcbiAgICBjb25zdCBjb29yZDogUG9pbnRlckNvb3JkVHlwZSA9IGBjbGllbnQke3Byb3BlcnR5ID09PSAneCcgPyAnWCcgOiAnWSd9YFxuICAgIHJldHVybiAoaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpID8gZXZ0IDogZXZ0LnRvdWNoZXNbMF0pW2Nvb3JkXVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBzdGFydEV2ZW50ID0gZXZ0XG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgcmV0dXJuIHJlYWRQb2ludChldnQpXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyTW92ZShldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmYgPSByZWFkUG9pbnQoZXZ0KSAtIHJlYWRQb2ludChsYXN0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShzdGFydEV2ZW50KSA+IGxvZ0ludGVydmFsXG5cbiAgICBsYXN0RXZlbnQgPSBldnRcbiAgICBpZiAoZXhwaXJlZCkgc3RhcnRFdmVudCA9IGV2dFxuICAgIHJldHVybiBkaWZmXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVXAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBpZiAoIXN0YXJ0RXZlbnQgfHwgIWxhc3RFdmVudCkgcmV0dXJuIDBcbiAgICBjb25zdCBkaWZmRHJhZyA9IHJlYWRQb2ludChsYXN0RXZlbnQpIC0gcmVhZFBvaW50KHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZGlmZlRpbWUgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudClcbiAgICBjb25zdCBleHBpcmVkID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKGxhc3RFdmVudCkgPiBsb2dJbnRlcnZhbFxuICAgIGNvbnN0IGZvcmNlID0gZGlmZkRyYWcgLyBkaWZmVGltZVxuICAgIGNvbnN0IGlzRmxpY2sgPSBkaWZmVGltZSAmJiAhZXhwaXJlZCAmJiBtYXRoQWJzKGZvcmNlKSA+IDAuMVxuXG4gICAgcmV0dXJuIGlzRmxpY2sgPyBmb3JjZSA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdUcmFja2VyVHlwZSA9IHtcbiAgICBwb2ludGVyRG93bixcbiAgICBwb2ludGVyTW92ZSxcbiAgICBwb2ludGVyVXAsXG4gICAgcmVhZFBvaW50XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIE5vZGVSZWN0VHlwZSA9IHtcbiAgdG9wOiBudW1iZXJcbiAgcmlnaHQ6IG51bWJlclxuICBib3R0b206IG51bWJlclxuICBsZWZ0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBOb2RlUmVjdHNUeXBlID0ge1xuICBtZWFzdXJlOiAobm9kZTogSFRNTEVsZW1lbnQpID0+IE5vZGVSZWN0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTm9kZVJlY3RzKCk6IE5vZGVSZWN0c1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG5vZGU6IEhUTUxFbGVtZW50KTogTm9kZVJlY3RUeXBlIHtcbiAgICBjb25zdCB7IG9mZnNldFRvcCwgb2Zmc2V0TGVmdCwgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gbm9kZVxuICAgIGNvbnN0IG9mZnNldDogTm9kZVJlY3RUeXBlID0ge1xuICAgICAgdG9wOiBvZmZzZXRUb3AsXG4gICAgICByaWdodDogb2Zmc2V0TGVmdCArIG9mZnNldFdpZHRoLFxuICAgICAgYm90dG9tOiBvZmZzZXRUb3AgKyBvZmZzZXRIZWlnaHQsXG4gICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHRcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBjb25zdCBzZWxmOiBOb2RlUmVjdHNUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiZXhwb3J0IHR5cGUgUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gIG1lYXN1cmU6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGVyY2VudE9mVmlldyh2aWV3U2l6ZTogbnVtYmVyKTogUGVyY2VudE9mVmlld1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplICogKG4gLyAxMDApXG4gIH1cblxuICBjb25zdCBzZWxmOiBQZXJjZW50T2ZWaWV3VHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBOb2RlUmVjdHNUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzaXplSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBheGlzOiBBeGlzVHlwZSxcbiAgd2F0Y2hSZXNpemU6IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlLFxuICBub2RlUmVjdHM6IE5vZGVSZWN0c1R5cGVcbik6IFJlc2l6ZUhhbmRsZXJUeXBlIHtcbiAgY29uc3Qgb2JzZXJ2ZU5vZGVzID0gW2NvbnRhaW5lcl0uY29uY2F0KHNsaWRlcylcbiAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlclxuICBsZXQgY29udGFpbmVyU2l6ZTogbnVtYmVyXG4gIGxldCBzbGlkZVNpemVzOiBudW1iZXJbXSA9IFtdXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHJlYWRTaXplKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gYXhpcy5tZWFzdXJlU2l6ZShub2RlUmVjdHMubWVhc3VyZShub2RlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFJlc2l6ZSkgcmV0dXJuXG5cbiAgICBjb250YWluZXJTaXplID0gcmVhZFNpemUoY29udGFpbmVyKVxuICAgIHNsaWRlU2l6ZXMgPSBzbGlkZXMubWFwKHJlYWRTaXplKVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdENhbGxiYWNrKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGlzQ29udGFpbmVyID0gZW50cnkudGFyZ2V0ID09PSBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHNsaWRlcy5pbmRleE9mKDxIVE1MRWxlbWVudD5lbnRyeS50YXJnZXQpXG4gICAgICAgIGNvbnN0IGxhc3RTaXplID0gaXNDb250YWluZXIgPyBjb250YWluZXJTaXplIDogc2xpZGVTaXplc1tzbGlkZUluZGV4XVxuICAgICAgICBjb25zdCBuZXdTaXplID0gcmVhZFNpemUoaXNDb250YWluZXIgPyBjb250YWluZXIgOiBzbGlkZXNbc2xpZGVJbmRleF0pXG4gICAgICAgIGNvbnN0IGRpZmZTaXplID0gbWF0aEFicyhuZXdTaXplIC0gbGFzdFNpemUpXG5cbiAgICAgICAgaWYgKGRpZmZTaXplID49IDAuNSkge1xuICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpXG5cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hSZXNpemUpIHx8IHdhdGNoUmVzaXplKGVtYmxhQXBpLCBlbnRyaWVzKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2soZW50cmllcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIG9ic2VydmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiByZXNpemVPYnNlcnZlci5vYnNlcnZlKG5vZGUpKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IG1hdGhTaWduLCBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbEJvZHlUeXBlID0ge1xuICBkaXJlY3Rpb246ICgpID0+IG51bWJlclxuICBkdXJhdGlvbjogKCkgPT4gbnVtYmVyXG4gIHZlbG9jaXR5OiAoKSA9PiBudW1iZXJcbiAgc2VlazogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgc2V0dGxlZDogKCkgPT4gYm9vbGVhblxuICB1c2VCYXNlRnJpY3Rpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUJhc2VEdXJhdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRnJpY3Rpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUR1cmF0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm9keShcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgb2Zmc2V0TG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgcHJldmlvdXNMb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgYmFzZUR1cmF0aW9uOiBudW1iZXIsXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyXG4pOiBTY3JvbGxCb2R5VHlwZSB7XG4gIGxldCBzY3JvbGxWZWxvY2l0eSA9IDBcbiAgbGV0IHNjcm9sbERpcmVjdGlvbiA9IDBcbiAgbGV0IHNjcm9sbER1cmF0aW9uID0gYmFzZUR1cmF0aW9uXG4gIGxldCBzY3JvbGxGcmljdGlvbiA9IGJhc2VGcmljdGlvblxuICBsZXQgcmF3TG9jYXRpb24gPSBsb2NhdGlvbi5nZXQoKVxuICBsZXQgcmF3TG9jYXRpb25QcmV2aW91cyA9IDBcblxuICBmdW5jdGlvbiBzZWVrKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBjb25zdCBkaXNwbGFjZW1lbnQgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGlzSW5zdGFudCA9ICFzY3JvbGxEdXJhdGlvblxuICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IDBcblxuICAgIGlmIChpc0luc3RhbnQpIHtcbiAgICAgIHNjcm9sbFZlbG9jaXR5ID0gMFxuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQodGFyZ2V0KVxuICAgICAgbG9jYXRpb24uc2V0KHRhcmdldClcblxuICAgICAgc2Nyb2xsRGlzdGFuY2UgPSBkaXNwbGFjZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQobG9jYXRpb24pXG5cbiAgICAgIHNjcm9sbFZlbG9jaXR5ICs9IGRpc3BsYWNlbWVudCAvIHNjcm9sbER1cmF0aW9uXG4gICAgICBzY3JvbGxWZWxvY2l0eSAqPSBzY3JvbGxGcmljdGlvblxuICAgICAgcmF3TG9jYXRpb24gKz0gc2Nyb2xsVmVsb2NpdHlcbiAgICAgIGxvY2F0aW9uLmFkZChzY3JvbGxWZWxvY2l0eSlcblxuICAgICAgc2Nyb2xsRGlzdGFuY2UgPSByYXdMb2NhdGlvbiAtIHJhd0xvY2F0aW9uUHJldmlvdXNcbiAgICB9XG5cbiAgICBzY3JvbGxEaXJlY3Rpb24gPSBtYXRoU2lnbihzY3JvbGxEaXN0YW5jZSlcbiAgICByYXdMb2NhdGlvblByZXZpb3VzID0gcmF3TG9jYXRpb25cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gc2V0dGxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaWZmID0gdGFyZ2V0LmdldCgpIC0gb2Zmc2V0TG9jYXRpb24uZ2V0KClcbiAgICByZXR1cm4gbWF0aEFicyhkaWZmKSA8IDAuMDAxXG4gIH1cblxuICBmdW5jdGlvbiBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEdXJhdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gZGlyZWN0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbERpcmVjdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gdmVsb2NpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsVmVsb2NpdHlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VEdXJhdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUR1cmF0aW9uKGJhc2VEdXJhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VGcmljdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUZyaWN0aW9uKGJhc2VGcmljdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUR1cmF0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxEdXJhdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gdXNlRnJpY3Rpb24objogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHNjcm9sbEZyaWN0aW9uID0gblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgICBkaXJlY3Rpb24sXG4gICAgZHVyYXRpb24sXG4gICAgdmVsb2NpdHksXG4gICAgc2VlayxcbiAgICBzZXR0bGVkLFxuICAgIHVzZUJhc2VGcmljdGlvbixcbiAgICB1c2VCYXNlRHVyYXRpb24sXG4gICAgdXNlRnJpY3Rpb24sXG4gICAgdXNlRHVyYXRpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICBzaG91bGRDb25zdHJhaW46ICgpID0+IGJvb2xlYW5cbiAgY29uc3RyYWluOiAocG9pbnRlckRvd246IGJvb2xlYW4pID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxCb3VuZHMoXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHRhcmdldDogVmVjdG9yMURUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGVcbik6IFNjcm9sbEJvdW5kc1R5cGUge1xuICBjb25zdCBwdWxsQmFja1RocmVzaG9sZCA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSgxMClcbiAgY29uc3QgZWRnZU9mZnNldFRvbGVyYW5jZSA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSg1MClcbiAgY29uc3QgZnJpY3Rpb25MaW1pdCA9IExpbWl0KDAuMSwgMC45OSlcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBzaG91bGRDb25zdHJhaW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWxpbWl0LnJlYWNoZWRBbnkodGFyZ2V0LmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KGxvY2F0aW9uLmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihwb2ludGVyRG93bjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghc2hvdWxkQ29uc3RyYWluKCkpIHJldHVyblxuICAgIGNvbnN0IGVkZ2UgPSBsaW1pdC5yZWFjaGVkTWluKGxvY2F0aW9uLmdldCgpKSA/ICdtaW4nIDogJ21heCdcbiAgICBjb25zdCBkaWZmVG9FZGdlID0gbWF0aEFicyhsaW1pdFtlZGdlXSAtIGxvY2F0aW9uLmdldCgpKVxuICAgIGNvbnN0IGRpZmZUb1RhcmdldCA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgY29uc3QgZnJpY3Rpb24gPSBmcmljdGlvbkxpbWl0LmNvbnN0cmFpbihkaWZmVG9FZGdlIC8gZWRnZU9mZnNldFRvbGVyYW5jZSlcblxuICAgIHRhcmdldC5zdWJ0cmFjdChkaWZmVG9UYXJnZXQgKiBmcmljdGlvbilcblxuICAgIGlmICghcG9pbnRlckRvd24gJiYgbWF0aEFicyhkaWZmVG9UYXJnZXQpIDwgcHVsbEJhY2tUaHJlc2hvbGQpIHtcbiAgICAgIHRhcmdldC5zZXQobGltaXQuY29uc3RyYWluKHRhcmdldC5nZXQoKSkpXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDI1KS51c2VCYXNlRnJpY3Rpb24oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBkaXNhYmxlZCA9ICFhY3RpdmVcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbEJvdW5kc1R5cGUgPSB7XG4gICAgc2hvdWxkQ29uc3RyYWluLFxuICAgIGNvbnN0cmFpbixcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIGRlbHRhQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUgPSBmYWxzZSB8ICd0cmltU25hcHMnIHwgJ2tlZXBTbmFwcydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpblR5cGUgPSB7XG4gIHNuYXBzQ29udGFpbmVkOiBudW1iZXJbXVxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQ29udGFpbihcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc25hcHNBbGlnbmVkOiBudW1iZXJbXSxcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHBpeGVsVG9sZXJhbmNlOiBudW1iZXJcbik6IFNjcm9sbENvbnRhaW5UeXBlIHtcbiAgY29uc3Qgc2Nyb2xsQm91bmRzID0gTGltaXQoLWNvbnRlbnRTaXplICsgdmlld1NpemUsIDApXG4gIGNvbnN0IHNuYXBzQm91bmRlZCA9IG1lYXN1cmVCb3VuZGVkKClcbiAgY29uc3Qgc2Nyb2xsQ29udGFpbkxpbWl0ID0gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpXG4gIGNvbnN0IHNuYXBzQ29udGFpbmVkID0gbWVhc3VyZUNvbnRhaW5lZCgpXG5cbiAgZnVuY3Rpb24gdXNlUGl4ZWxUb2xlcmFuY2UoYm91bmQ6IG51bWJlciwgc25hcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRlbHRhQWJzKGJvdW5kLCBzbmFwKSA8PSAxXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2Nyb2xsQ29udGFpbkxpbWl0KCk6IExpbWl0VHlwZSB7XG4gICAgY29uc3Qgc3RhcnRTbmFwID0gc25hcHNCb3VuZGVkWzBdXG4gICAgY29uc3QgZW5kU25hcCA9IGFycmF5TGFzdChzbmFwc0JvdW5kZWQpXG4gICAgY29uc3QgbWluID0gc25hcHNCb3VuZGVkLmxhc3RJbmRleE9mKHN0YXJ0U25hcClcbiAgICBjb25zdCBtYXggPSBzbmFwc0JvdW5kZWQuaW5kZXhPZihlbmRTbmFwKSArIDFcbiAgICByZXR1cm4gTGltaXQobWluLCBtYXgpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQm91bmRlZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNuYXBzQWxpZ25lZFxuICAgICAgLm1hcCgoc25hcEFsaWduZWQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbEJvdW5kc1xuICAgICAgICBjb25zdCBzbmFwID0gc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihzbmFwQWxpZ25lZClcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9ICFpbmRleFxuICAgICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KHNuYXBzQWxpZ25lZCwgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gbWF4XG4gICAgICAgIGlmIChpc0xhc3QpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1pbiwgc25hcCkpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1heCwgc25hcCkpIHJldHVybiBtYXhcbiAgICAgICAgcmV0dXJuIHNuYXBcbiAgICAgIH0pXG4gICAgICAubWFwKChzY3JvbGxCb3VuZCkgPT4gcGFyc2VGbG9hdChzY3JvbGxCb3VuZC50b0ZpeGVkKDMpKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVDb250YWluZWQoKTogbnVtYmVyW10ge1xuICAgIGlmIChjb250ZW50U2l6ZSA8PSB2aWV3U2l6ZSArIHBpeGVsVG9sZXJhbmNlKSByZXR1cm4gW3Njcm9sbEJvdW5kcy5tYXhdXG4gICAgaWYgKGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnKSByZXR1cm4gc25hcHNCb3VuZGVkXG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gICAgcmV0dXJuIHNuYXBzQm91bmRlZC5zbGljZShtaW4sIG1heClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICAgIHNuYXBzQ29udGFpbmVkLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IGFycmF5TGFzdCB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgbGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTGltaXQoXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgbG9vcDogYm9vbGVhblxuKTogU2Nyb2xsTGltaXRUeXBlIHtcbiAgY29uc3QgbWF4ID0gc2Nyb2xsU25hcHNbMF1cbiAgY29uc3QgbWluID0gbG9vcCA/IG1heCAtIGNvbnRlbnRTaXplIDogYXJyYXlMYXN0KHNjcm9sbFNuYXBzKVxuICBjb25zdCBsaW1pdCA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgICBsaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExvb3BlclR5cGUgPSB7XG4gIGxvb3A6IChkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTG9vcGVyKFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB2ZWN0b3JzOiBWZWN0b3IxRFR5cGVbXVxuKTogU2Nyb2xsTG9vcGVyVHlwZSB7XG4gIGNvbnN0IGpvaW50U2FmZXR5ID0gMC4xXG4gIGNvbnN0IG1pbiA9IGxpbWl0Lm1pbiArIGpvaW50U2FmZXR5XG4gIGNvbnN0IG1heCA9IGxpbWl0Lm1heCArIGpvaW50U2FmZXR5XG4gIGNvbnN0IHsgcmVhY2hlZE1pbiwgcmVhY2hlZE1heCB9ID0gTGltaXQobWluLCBtYXgpXG5cbiAgZnVuY3Rpb24gc2hvdWxkTG9vcChkaXJlY3Rpb246IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHJldHVybiByZWFjaGVkTWF4KGxvY2F0aW9uLmdldCgpKVxuICAgIGlmIChkaXJlY3Rpb24gPT09IC0xKSByZXR1cm4gcmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSlcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZExvb3AoZGlyZWN0aW9uKSkgcmV0dXJuXG5cbiAgICBjb25zdCBsb29wRGlzdGFuY2UgPSBjb250ZW50U2l6ZSAqIChkaXJlY3Rpb24gKiAtMSlcbiAgICB2ZWN0b3JzLmZvckVhY2goKHYpID0+IHYuYWRkKGxvb3BEaXN0YW5jZSkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxMb29wZXJUeXBlID0ge1xuICAgIGxvb3BcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICBnZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsUHJvZ3Jlc3MobGltaXQ6IExpbWl0VHlwZSk6IFNjcm9sbFByb2dyZXNzVHlwZSB7XG4gIGNvbnN0IHsgbWF4LCBsZW5ndGggfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gZ2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uID0gbiAtIG1heFxuICAgIHJldHVybiBsZW5ndGggPyBjdXJyZW50TG9jYXRpb24gLyAtbGVuZ3RoIDogMFxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICAgIGdldFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnRUeXBlIH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IGFycmF5TGFzdCwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgc25hcHM6IG51bWJlcltdXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFNuYXBzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgYWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlXG4pOiBTY3JvbGxTbmFwc1R5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSB9ID0gYXhpc1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCBhbGlnbm1lbnRzID0gbWVhc3VyZVNpemVzKCkubWFwKGFsaWdubWVudC5tZWFzdXJlKVxuICBjb25zdCBzbmFwcyA9IG1lYXN1cmVVbmFsaWduZWQoKVxuICBjb25zdCBzbmFwc0FsaWduZWQgPSBtZWFzdXJlQWxpZ25lZCgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemVzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc2xpZGVSZWN0cylcbiAgICAgIC5tYXAoKHJlY3RzKSA9PiBhcnJheUxhc3QocmVjdHMpW2VuZEVkZ2VdIC0gcmVjdHNbMF1bc3RhcnRFZGdlXSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVVbmFsaWduZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbGlkZVJlY3RzXG4gICAgICAubWFwKChyZWN0KSA9PiBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKChzbmFwKSA9PiAtbWF0aEFicyhzbmFwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVBbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc25hcHMpXG4gICAgICAubWFwKChnKSA9PiBnWzBdKVxuICAgICAgLm1hcCgoc25hcCwgaW5kZXgpID0+IHNuYXAgKyBhbGlnbm1lbnRzW2luZGV4XSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgICBzbmFwcyxcbiAgICBzbmFwc0FsaWduZWRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7XG4gIGFycmF5RnJvbU51bWJlcixcbiAgYXJyYXlJc0xhc3RJbmRleCxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleFxufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgc2xpZGVSZWdpc3RyeTogbnVtYmVyW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVSZWdpc3RyeShcbiAgY29udGFpblNuYXBzOiBib29sZWFuLFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZSxcbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuKTogU2xpZGVSZWdpc3RyeVR5cGUge1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxDb250YWluTGltaXRcbiAgY29uc3Qgc2xpZGVSZWdpc3RyeSA9IGNyZWF0ZVNsaWRlUmVnaXN0cnkoKVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlUmVnaXN0cnkoKTogbnVtYmVyW11bXSB7XG4gICAgY29uc3QgZ3JvdXBlZFNsaWRlSW5kZXhlcyA9IGdyb3VwU2xpZGVzKHNsaWRlSW5kZXhlcylcbiAgICBjb25zdCBkb05vdENvbnRhaW4gPSAhY29udGFpblNuYXBzIHx8IGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnXG5cbiAgICBpZiAoc2Nyb2xsU25hcHMubGVuZ3RoID09PSAxKSByZXR1cm4gW3NsaWRlSW5kZXhlc11cbiAgICBpZiAoZG9Ob3RDb250YWluKSByZXR1cm4gZ3JvdXBlZFNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXMuc2xpY2UobWluLCBtYXgpLm1hcCgoZ3JvdXAsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgoZ3JvdXBzLCBpbmRleClcblxuICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3QoZ3JvdXBzWzBdKSArIDFcbiAgICAgICAgcmV0dXJuIGFycmF5RnJvbU51bWJlcihyYW5nZSlcbiAgICAgIH1cbiAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3RJbmRleChzbGlkZUluZGV4ZXMpIC0gYXJyYXlMYXN0KGdyb3VwcylbMF0gKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UsIGFycmF5TGFzdChncm91cHMpWzBdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdyb3VwXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlUmVnaXN0cnlUeXBlID0ge1xuICAgIHNsaWRlUmVnaXN0cnlcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMsIG1hdGhTaWduIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVGFyZ2V0VHlwZSA9IHtcbiAgZGlzdGFuY2U6IG51bWJlclxuICBpbmRleDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gIGJ5SW5kZXg6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IFRhcmdldFR5cGVcbiAgYnlEaXN0YW5jZTogKGZvcmNlOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IFRhcmdldFR5cGVcbiAgc2hvcnRjdXQ6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVGFyZ2V0KFxuICBsb29wOiBib29sZWFuLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlXG4pOiBTY3JvbGxUYXJnZXRUeXBlIHtcbiAgY29uc3QgeyByZWFjaGVkQW55LCByZW1vdmVPZmZzZXQsIGNvbnN0cmFpbiB9ID0gbGltaXRcblxuICBmdW5jdGlvbiBtaW5EaXN0YW5jZShkaXN0YW5jZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGlzdGFuY2VzLmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IG1hdGhBYnMoYSkgLSBtYXRoQWJzKGIpKVswXVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFRhcmdldFNuYXAodGFyZ2V0OiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IGxvb3AgPyByZW1vdmVPZmZzZXQodGFyZ2V0KSA6IGNvbnN0cmFpbih0YXJnZXQpXG4gICAgY29uc3QgYXNjRGlmZnNUb1NuYXBzID0gc2Nyb2xsU25hcHNcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiAoeyBkaWZmOiBzaG9ydGN1dChzbmFwIC0gZGlzdGFuY2UsIDApLCBpbmRleCB9KSlcbiAgICAgIC5zb3J0KChkMSwgZDIpID0+IG1hdGhBYnMoZDEuZGlmZikgLSBtYXRoQWJzKGQyLmRpZmYpKVxuXG4gICAgY29uc3QgeyBpbmRleCB9ID0gYXNjRGlmZnNUb1NuYXBzWzBdXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3J0Y3V0KHRhcmdldDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFt0YXJnZXQsIHRhcmdldCArIGNvbnRlbnRTaXplLCB0YXJnZXQgLSBjb250ZW50U2l6ZV1cblxuICAgIGlmICghbG9vcCkgcmV0dXJuIHRhcmdldFxuICAgIGlmICghZGlyZWN0aW9uKSByZXR1cm4gbWluRGlzdGFuY2UodGFyZ2V0cylcblxuICAgIGNvbnN0IG1hdGNoaW5nVGFyZ2V0cyA9IHRhcmdldHMuZmlsdGVyKCh0KSA9PiBtYXRoU2lnbih0KSA9PT0gZGlyZWN0aW9uKVxuICAgIGlmIChtYXRjaGluZ1RhcmdldHMubGVuZ3RoKSByZXR1cm4gbWluRGlzdGFuY2UobWF0Y2hpbmdUYXJnZXRzKVxuICAgIHJldHVybiBhcnJheUxhc3QodGFyZ2V0cykgLSBjb250ZW50U2l6ZVxuICB9XG5cbiAgZnVuY3Rpb24gYnlJbmRleChpbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRWZWN0b3IuZ2V0KClcbiAgICBjb25zdCBkaXN0YW5jZSA9IHNob3J0Y3V0KGRpZmZUb1NuYXAsIGRpcmVjdGlvbilcbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnlEaXN0YW5jZShkaXN0YW5jZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0VmVjdG9yLmdldCgpICsgZGlzdGFuY2VcbiAgICBjb25zdCB7IGluZGV4LCBkaXN0YW5jZTogdGFyZ2V0U25hcERpc3RhbmNlIH0gPSBmaW5kVGFyZ2V0U25hcCh0YXJnZXQpXG4gICAgY29uc3QgcmVhY2hlZEJvdW5kID0gIWxvb3AgJiYgcmVhY2hlZEFueSh0YXJnZXQpXG5cbiAgICBpZiAoIXNuYXAgfHwgcmVhY2hlZEJvdW5kKSByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuXG4gICAgY29uc3QgZGlmZlRvU25hcCA9IHNjcm9sbFNuYXBzW2luZGV4XSAtIHRhcmdldFNuYXBEaXN0YW5jZVxuICAgIGNvbnN0IHNuYXBEaXN0YW5jZSA9IGRpc3RhbmNlICsgc2hvcnRjdXQoZGlmZlRvU25hcCwgMClcblxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZTogc25hcERpc3RhbmNlIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gICAgYnlEaXN0YW5jZSxcbiAgICBieUluZGV4LFxuICAgIHNob3J0Y3V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUsIFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRvVHlwZSA9IHtcbiAgZGlzdGFuY2U6IChuOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IHZvaWRcbiAgaW5kZXg6IChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxUbyhcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgaW5kZXhDdXJyZW50OiBDb3VudGVyVHlwZSxcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IFNjcm9sbFRvVHlwZSB7XG4gIGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldDogVGFyZ2V0VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGRpc3RhbmNlRGlmZiA9IHRhcmdldC5kaXN0YW5jZVxuICAgIGNvbnN0IGluZGV4RGlmZiA9IHRhcmdldC5pbmRleCAhPT0gaW5kZXhDdXJyZW50LmdldCgpXG5cbiAgICB0YXJnZXRWZWN0b3IuYWRkKGRpc3RhbmNlRGlmZilcblxuICAgIGlmIChkaXN0YW5jZURpZmYpIHtcbiAgICAgIGlmIChzY3JvbGxCb2R5LmR1cmF0aW9uKCkpIHtcbiAgICAgICAgYW5pbWF0aW9uLnN0YXJ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgICBhbmltYXRpb24ucmVuZGVyKDEpXG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmRleERpZmYpIHtcbiAgICAgIGluZGV4UHJldmlvdXMuc2V0KGluZGV4Q3VycmVudC5nZXQoKSlcbiAgICAgIGluZGV4Q3VycmVudC5zZXQodGFyZ2V0LmluZGV4KVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NlbGVjdCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzdGFuY2UobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2Uobiwgc25hcClcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBmdW5jdGlvbiBpbmRleChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleEN1cnJlbnQuY2xvbmUoKS5zZXQobilcbiAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxUYXJnZXQuYnlJbmRleCh0YXJnZXRJbmRleC5nZXQoKSwgZGlyZWN0aW9uKVxuICAgIHNjcm9sbFRvKHRhcmdldClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRvVHlwZSA9IHtcbiAgICBkaXN0YW5jZSxcbiAgICBpbmRleFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgU2xpZGVSZWdpc3RyeVR5cGUgfSBmcm9tICcuL1NsaWRlUmVnaXN0cnknXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBGb2N1c0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBGb2N1c0V2ZW50XG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIEZvY3VzSGFuZGxlck9wdGlvblR5cGUgPSBib29sZWFuIHwgRm9jdXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlRm9jdXNUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZUZvY3VzKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddLFxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgZXZlbnRTdG9yZTogRXZlbnRTdG9yZVR5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hGb2N1czogRm9jdXNIYW5kbGVyT3B0aW9uVHlwZVxuKTogU2xpZGVGb2N1c1R5cGUge1xuICBjb25zdCBmb2N1c0xpc3RlbmVyT3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZSB9XG4gIGxldCBsYXN0VGFiUHJlc3NUaW1lID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaEZvY3VzKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjb25zdCBub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIGNvbnN0IGRpZmZUaW1lID0gbm93VGltZSAtIGxhc3RUYWJQcmVzc1RpbWVcblxuICAgICAgaWYgKGRpZmZUaW1lID4gMTApIHJldHVyblxuXG4gICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVGb2N1c1N0YXJ0JylcbiAgICAgIHJvb3Quc2Nyb2xsTGVmdCA9IDBcblxuICAgICAgY29uc3QgZ3JvdXAgPSBzbGlkZVJlZ2lzdHJ5LmZpbmRJbmRleCgoZ3JvdXApID0+IGdyb3VwLmluY2x1ZGVzKGluZGV4KSlcblxuICAgICAgaWYgKCFpc051bWJlcihncm91cCkpIHJldHVyblxuXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDApXG4gICAgICBzY3JvbGxUby5pbmRleChncm91cCwgMClcblxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXMnKVxuICAgIH1cblxuICAgIGV2ZW50U3RvcmUuYWRkKGRvY3VtZW50LCAna2V5ZG93bicsIHJlZ2lzdGVyVGFiUHJlc3MsIGZhbHNlKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBldmVudFN0b3JlLmFkZChcbiAgICAgICAgc2xpZGUsXG4gICAgICAgICdmb2N1cycsXG4gICAgICAgIChldnQ6IEZvY3VzRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoaXNCb29sZWFuKHdhdGNoRm9jdXMpIHx8IHdhdGNoRm9jdXMoZW1ibGFBcGksIGV2dCkpIHtcbiAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjayhzbGlkZUluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNMaXN0ZW5lck9wdGlvbnNcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJUYWJQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5jb2RlID09PSAnVGFiJykgbGFzdFRhYlByZXNzVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgICBpbml0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVmVjdG9yMURUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpID0+IHZvaWRcbiAgYWRkOiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIHN1YnRyYWN0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWZWN0b3IxRChpbml0aWFsVmFsdWU6IG51bWJlcik6IFZlY3RvcjFEVHlwZSB7XG4gIGxldCB2YWx1ZSA9IGluaXRpYWxWYWx1ZVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlID0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSArPSBub3JtYWxpemVJbnB1dChuKVxuICB9XG5cbiAgZnVuY3Rpb24gc3VidHJhY3QobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgLT0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUlucHV0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG4pID8gbiA6IG4uZ2V0KClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFZlY3RvcjFEVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBzdWJ0cmFjdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IHJvdW5kVG9Ud29EZWNpbWFscyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRyYW5zbGF0ZVR5cGUgPSB7XG4gIGNsZWFyOiAoKSA9PiB2b2lkXG4gIHRvOiAodGFyZ2V0OiBudW1iZXIpID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGUoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50XG4pOiBUcmFuc2xhdGVUeXBlIHtcbiAgY29uc3QgdHJhbnNsYXRlID0gYXhpcy5zY3JvbGwgPT09ICd4JyA/IHggOiB5XG4gIGNvbnN0IGNvbnRhaW5lclN0eWxlID0gY29udGFpbmVyLnN0eWxlXG4gIGxldCBwcmV2aW91c1RhcmdldDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiB4KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgke259cHgsMHB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB5KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgwcHgsJHtufXB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB0byh0YXJnZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuXG5cbiAgICBjb25zdCBuZXdUYXJnZXQgPSByb3VuZFRvVHdvRGVjaW1hbHMoYXhpcy5kaXJlY3Rpb24odGFyZ2V0KSlcbiAgICBpZiAobmV3VGFyZ2V0ID09PSBwcmV2aW91c1RhcmdldCkgcmV0dXJuXG5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2xhdGUobmV3VGFyZ2V0KVxuICAgIHByZXZpb3VzVGFyZ2V0ID0gbmV3VGFyZ2V0XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuICAgIGNvbnRhaW5lclN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgaWYgKCFjb250YWluZXIuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gIH1cblxuICBjb25zdCBzZWxmOiBUcmFuc2xhdGVUeXBlID0ge1xuICAgIGNsZWFyLFxuICAgIHRvLFxuICAgIHRvZ2dsZUFjdGl2ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGFycmF5S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRCwgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuXG50eXBlIFNsaWRlQm91bmRUeXBlID0ge1xuICBzdGFydDogbnVtYmVyXG4gIGVuZDogbnVtYmVyXG59XG5cbnR5cGUgTG9vcFBvaW50VHlwZSA9IHtcbiAgbG9vcFBvaW50OiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZVR5cGVcbiAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHRhcmdldDogKCkgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlTG9vcGVyVHlwZSA9IHtcbiAgY2FuTG9vcDogKCkgPT4gYm9vbGVhblxuICBjbGVhcjogKCkgPT4gdm9pZFxuICBsb29wOiAoKSA9PiB2b2lkXG4gIGxvb3BQb2ludHM6IExvb3BQb2ludFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVMb29wZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzbGlkZVNpemVzOiBudW1iZXJbXSxcbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXSxcbiAgc25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXVxuKTogU2xpZGVMb29wZXJUeXBlIHtcbiAgY29uc3Qgcm91bmRpbmdTYWZldHkgPSAwLjVcbiAgY29uc3QgYXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKVxuICBjb25zdCBkZXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKS5yZXZlcnNlKClcbiAgY29uc3QgbG9vcFBvaW50cyA9IHN0YXJ0UG9pbnRzKCkuY29uY2F0KGVuZFBvaW50cygpKVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVNsaWRlU2l6ZXMoaW5kZXhlczogbnVtYmVyW10sIGZyb206IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXIsIGkpID0+IHtcbiAgICAgIHJldHVybiBhIC0gc2xpZGVTaXplc1dpdGhHYXBzW2ldXG4gICAgfSwgZnJvbSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luR2FwKGluZGV4ZXM6IG51bWJlcltdLCBnYXA6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gaW5kZXhlcy5yZWR1Y2UoKGE6IG51bWJlcltdLCBpKSA9PiB7XG4gICAgICBjb25zdCByZW1haW5pbmdHYXAgPSByZW1vdmVTbGlkZVNpemVzKGEsIGdhcClcbiAgICAgIHJldHVybiByZW1haW5pbmdHYXAgPiAwID8gYS5jb25jYXQoW2ldKSA6IGFcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRTbGlkZUJvdW5kcyhvZmZzZXQ6IG51bWJlcik6IFNsaWRlQm91bmRUeXBlW10ge1xuICAgIHJldHVybiBzbmFwcy5tYXAoKHNuYXAsIGluZGV4KSA9PiAoe1xuICAgICAgc3RhcnQ6IHNuYXAgLSBzbGlkZVNpemVzW2luZGV4XSArIHJvdW5kaW5nU2FmZXR5ICsgb2Zmc2V0LFxuICAgICAgZW5kOiBzbmFwICsgdmlld1NpemUgLSByb3VuZGluZ1NhZmV0eSArIG9mZnNldFxuICAgIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZExvb3BQb2ludHMoXG4gICAgaW5kZXhlczogbnVtYmVyW10sXG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgaXNFbmRFZGdlOiBib29sZWFuXG4gICk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3Qgc2xpZGVCb3VuZHMgPSBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0KVxuXG4gICAgcmV0dXJuIGluZGV4ZXMubWFwKChpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW5pdGlhbCA9IGlzRW5kRWRnZSA/IDAgOiAtY29udGVudFNpemVcbiAgICAgIGNvbnN0IGFsdGVyZWQgPSBpc0VuZEVkZ2UgPyBjb250ZW50U2l6ZSA6IDBcbiAgICAgIGNvbnN0IGJvdW5kRWRnZSA9IGlzRW5kRWRnZSA/ICdlbmQnIDogJ3N0YXJ0J1xuICAgICAgY29uc3QgbG9vcFBvaW50ID0gc2xpZGVCb3VuZHNbaW5kZXhdW2JvdW5kRWRnZV1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGxvb3BQb2ludCxcbiAgICAgICAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMUQoLTEpLFxuICAgICAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBzbGlkZXNbaW5kZXhdKSxcbiAgICAgICAgdGFyZ2V0OiAoKSA9PiAobG9jYXRpb24uZ2V0KCkgPiBsb29wUG9pbnQgPyBpbml0aWFsIDogYWx0ZXJlZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRQb2ludHMoKTogTG9vcFBvaW50VHlwZVtdIHtcbiAgICBjb25zdCBnYXAgPSBzY3JvbGxTbmFwc1swXVxuICAgIGNvbnN0IGluZGV4ZXMgPSBzbGlkZXNJbkdhcChkZXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgY29udGVudFNpemUsIGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kUG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gdmlld1NpemUgLSBzY3JvbGxTbmFwc1swXSAtIDFcbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoYXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgLWNvbnRlbnRTaXplLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuTG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9vcFBvaW50cy5ldmVyeSgoeyBpbmRleCB9KSA9PiB7XG4gICAgICBjb25zdCBvdGhlckluZGV4ZXMgPSBhc2NJdGVtcy5maWx0ZXIoKGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgcmV0dXJuIHJlbW92ZVNsaWRlU2l6ZXMob3RoZXJJbmRleGVzLCB2aWV3U2l6ZSkgPD0gMC4xXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoKTogdm9pZCB7XG4gICAgbG9vcFBvaW50cy5mb3JFYWNoKChsb29wUG9pbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0LCB0cmFuc2xhdGUsIHNsaWRlTG9jYXRpb24gfSA9IGxvb3BQb2ludFxuICAgICAgY29uc3Qgc2hpZnRMb2NhdGlvbiA9IHRhcmdldCgpXG4gICAgICBpZiAoc2hpZnRMb2NhdGlvbiA9PT0gc2xpZGVMb2NhdGlvbi5nZXQoKSkgcmV0dXJuXG4gICAgICB0cmFuc2xhdGUudG8oc2hpZnRMb2NhdGlvbilcbiAgICAgIHNsaWRlTG9jYXRpb24uc2V0KHNoaWZ0TG9jYXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiBsb29wUG9pbnQudHJhbnNsYXRlLmNsZWFyKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUxvb3BlclR5cGUgPSB7XG4gICAgY2FuTG9vcCxcbiAgICBjbGVhcixcbiAgICBsb29wLFxuICAgIGxvb3BQb2ludHNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgbXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB3YXRjaFNsaWRlczogU2xpZGVzSGFuZGxlck9wdGlvblR5cGVcbik6IFNsaWRlc0hhbmRsZXJUeXBlIHtcbiAgbGV0IG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoU2xpZGVzKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0NoYW5nZWQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoU2xpZGVzKSB8fCB3YXRjaFNsaWRlcyhlbWJsYUFwaSwgbXV0YXRpb25zKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAobXV0YXRpb25PYnNlcnZlcikgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge1xuICBba2V5OiBudW1iZXJdOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlc0luVmlld09wdGlvbnNUeXBlID0gSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0Wyd0aHJlc2hvbGQnXVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdUeXBlID0ge1xuICBpbml0OiAoKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgZ2V0OiAoaW5WaWV3PzogYm9vbGVhbikgPT4gbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0luVmlldyhcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHRocmVzaG9sZDogU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGVcbik6IFNsaWRlc0luVmlld1R5cGUge1xuICBjb25zdCBpbnRlcnNlY3Rpb25FbnRyeU1hcDogSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge31cbiAgbGV0IGluVmlld0NhY2hlOiBudW1iZXJbXSB8IG51bGwgPSBudWxsXG4gIGxldCBub3RJblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICAgIGludGVyc2VjdGlvbkVudHJ5TWFwW2luZGV4XSA9IGVudHJ5XG4gICAgICAgIH0pXG5cbiAgICAgICAgaW5WaWV3Q2FjaGUgPSBudWxsXG4gICAgICAgIG5vdEluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVzSW5WaWV3JylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50LFxuICAgICAgICB0aHJlc2hvbGRcbiAgICAgIH1cbiAgICApXG5cbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoc2xpZGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIGludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3OiBib29sZWFuKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBvYmplY3RLZXlzKGludGVyc2VjdGlvbkVudHJ5TWFwKS5yZWR1Y2UoXG4gICAgICAobGlzdDogbnVtYmVyW10sIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChzbGlkZUluZGV4KVxuICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nIH0gPSBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF1cbiAgICAgICAgY29uc3QgaW5WaWV3TWF0Y2ggPSBpblZpZXcgJiYgaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgY29uc3Qgbm90SW5WaWV3TWF0Y2ggPSAhaW5WaWV3ICYmICFpc0ludGVyc2VjdGluZ1xuXG4gICAgICAgIGlmIChpblZpZXdNYXRjaCB8fCBub3RJblZpZXdNYXRjaCkgbGlzdC5wdXNoKGluZGV4KVxuICAgICAgICByZXR1cm4gbGlzdFxuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGluVmlldzogYm9vbGVhbiA9IHRydWUpOiBudW1iZXJbXSB7XG4gICAgaWYgKGluVmlldyAmJiBpblZpZXdDYWNoZSkgcmV0dXJuIGluVmlld0NhY2hlXG4gICAgaWYgKCFpblZpZXcgJiYgbm90SW5WaWV3Q2FjaGUpIHJldHVybiBub3RJblZpZXdDYWNoZVxuXG4gICAgY29uc3Qgc2xpZGVJbmRleGVzID0gY3JlYXRlSW5WaWV3TGlzdChpblZpZXcpXG5cbiAgICBpZiAoaW5WaWV3KSBpblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuICAgIGlmICghaW5WaWV3KSBub3RJblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIHNsaWRlSW5kZXhlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgZ2V0XG4gIH1cblxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IGFycmF5SXNMYXN0SW5kZXgsIGFycmF5TGFzdCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlU2l6ZXNUeXBlID0ge1xuICBzbGlkZVNpemVzOiBudW1iZXJbXVxuICBzbGlkZVNpemVzV2l0aEdhcHM6IG51bWJlcltdXG4gIHN0YXJ0R2FwOiBudW1iZXJcbiAgZW5kR2FwOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlU2l6ZXMoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIHJlYWRFZGdlR2FwOiBib29sZWFuLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogU2xpZGVTaXplc1R5cGUge1xuICBjb25zdCB7IG1lYXN1cmVTaXplLCBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3Qgd2l0aEVkZ2VHYXAgPSBzbGlkZVJlY3RzWzBdICYmIHJlYWRFZGdlR2FwXG4gIGNvbnN0IHN0YXJ0R2FwID0gbWVhc3VyZVN0YXJ0R2FwKClcbiAgY29uc3QgZW5kR2FwID0gbWVhc3VyZUVuZEdhcCgpXG4gIGNvbnN0IHNsaWRlU2l6ZXMgPSBzbGlkZVJlY3RzLm1hcChtZWFzdXJlU2l6ZSlcbiAgY29uc3Qgc2xpZGVTaXplc1dpdGhHYXBzID0gbWVhc3VyZVdpdGhHYXBzKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU3RhcnRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHNsaWRlUmVjdCA9IHNsaWRlUmVjdHNbMF1cbiAgICByZXR1cm4gbWF0aEFicyhjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3Rbc3RhcnRFZGdlXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVFbmRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhcnJheUxhc3Qoc2xpZGVzKSlcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGBtYXJnaW4tJHtlbmRFZGdlfWApKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZVdpdGhHYXBzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCwgaW5kZXgsIHJlY3RzKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChyZWN0cywgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBzdGFydEdhcFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBlbmRHYXBcbiAgICAgICAgcmV0dXJuIHJlY3RzW2luZGV4ICsgMV1bc3RhcnRFZGdlXSAtIHJlY3Rbc3RhcnRFZGdlXVxuICAgICAgfSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlU2l6ZXNUeXBlID0ge1xuICAgIHNsaWRlU2l6ZXMsXG4gICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHtcbiAgYXJyYXlLZXlzLFxuICBhcnJheUxhc3QsXG4gIGFycmF5TGFzdEluZGV4LFxuICBpc051bWJlcixcbiAgbWF0aEFic1xufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUgPSAnYXV0bycgfCBudW1iZXJcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxUeXBlID0ge1xuICBncm91cFNsaWRlczogPFR5cGU+KGFycmF5OiBUeXBlW10pID0+IFR5cGVbXVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNUb1Njcm9sbChcbiAgYXhpczogQXhpc1R5cGUsXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUsXG4gIGxvb3A6IGJvb2xlYW4sXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZSxcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW10sXG4gIHN0YXJ0R2FwOiBudW1iZXIsXG4gIGVuZEdhcDogbnVtYmVyLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTbGlkZXNUb1Njcm9sbFR5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSwgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGdyb3VwQnlOdW1iZXIgPSBpc051bWJlcihzbGlkZXNUb1Njcm9sbClcblxuICBmdW5jdGlvbiBieU51bWJlcjxUeXBlPihhcnJheTogVHlwZVtdLCBncm91cFNpemU6IG51bWJlcik6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gYXJyYXlLZXlzKGFycmF5KVxuICAgICAgLmZpbHRlcigoaSkgPT4gaSAlIGdyb3VwU2l6ZSA9PT0gMClcbiAgICAgIC5tYXAoKGkpID0+IGFycmF5LnNsaWNlKGksIGkgKyBncm91cFNpemUpKVxuICB9XG5cbiAgZnVuY3Rpb24gYnlTaXplPFR5cGU+KGFycmF5OiBUeXBlW10pOiBUeXBlW11bXSB7XG4gICAgaWYgKCFhcnJheS5sZW5ndGgpIHJldHVybiBbXVxuXG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5yZWR1Y2UoKGdyb3VwczogbnVtYmVyW10sIHJlY3RCLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0QSA9IGFycmF5TGFzdChncm91cHMpIHx8IDBcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9IHJlY3RBID09PSAwXG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IHJlY3RCID09PSBhcnJheUxhc3RJbmRleChhcnJheSlcblxuICAgICAgICBjb25zdCBlZGdlQSA9IGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHNsaWRlUmVjdHNbcmVjdEFdW3N0YXJ0RWRnZV1cbiAgICAgICAgY29uc3QgZWRnZUIgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RCXVtlbmRFZGdlXVxuICAgICAgICBjb25zdCBnYXBBID0gIWxvb3AgJiYgaXNGaXJzdCA/IGRpcmVjdGlvbihzdGFydEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGdhcEIgPSAhbG9vcCAmJiBpc0xhc3QgPyBkaXJlY3Rpb24oZW5kR2FwKSA6IDBcbiAgICAgICAgY29uc3QgY2h1bmtTaXplID0gbWF0aEFicyhlZGdlQiAtIGdhcEIgLSAoZWRnZUEgKyBnYXBBKSlcblxuICAgICAgICBpZiAoaW5kZXggJiYgY2h1bmtTaXplID4gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgZ3JvdXBzLnB1c2gocmVjdEIpXG4gICAgICAgIGlmIChpc0xhc3QpIGdyb3Vwcy5wdXNoKGFycmF5Lmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3Vwc1xuICAgICAgfSwgW10pXG4gICAgICAubWFwKChjdXJyZW50U2l6ZSwgaW5kZXgsIGdyb3VwcykgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NpemUgPSBNYXRoLm1heChncm91cHNbaW5kZXggLSAxXSB8fCAwKVxuICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UocHJldmlvdXNTaXplLCBjdXJyZW50U2l6ZSlcbiAgICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBncm91cFNsaWRlczxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIHJldHVybiBncm91cEJ5TnVtYmVyID8gYnlOdW1iZXIoYXJyYXksIHNsaWRlc1RvU2Nyb2xsKSA6IGJ5U2l6ZShhcnJheSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgICBncm91cFNsaWRlc1xuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnQgfSBmcm9tICcuL0FsaWdubWVudCdcbmltcG9ydCB7XG4gIEFuaW1hdGlvbnMsXG4gIEFuaW1hdGlvbnNUeXBlLFxuICBBbmltYXRpb25zVXBkYXRlVHlwZSxcbiAgQW5pbWF0aW9uc1JlbmRlclR5cGVcbn0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQXhpcywgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBDb3VudGVyLCBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IERyYWdIYW5kbGVyLCBEcmFnSGFuZGxlclR5cGUgfSBmcm9tICcuL0RyYWdIYW5kbGVyJ1xuaW1wb3J0IHsgRHJhZ1RyYWNrZXIgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSwgRXZlbnRTdG9yZVR5cGUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlLCBOb2RlUmVjdHMgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IE9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlldywgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5pbXBvcnQgeyBSZXNpemVIYW5kbGVyLCBSZXNpemVIYW5kbGVyVHlwZSB9IGZyb20gJy4vUmVzaXplSGFuZGxlcidcbmltcG9ydCB7IFNjcm9sbEJvZHksIFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsQm91bmRzLCBTY3JvbGxCb3VuZHNUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb3VuZHMnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgU2Nyb2xsTGltaXQgfSBmcm9tICcuL1Njcm9sbExpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsTG9vcGVyLCBTY3JvbGxMb29wZXJUeXBlIH0gZnJvbSAnLi9TY3JvbGxMb29wZXInXG5pbXBvcnQgeyBTY3JvbGxQcm9ncmVzcywgU2Nyb2xsUHJvZ3Jlc3NUeXBlIH0gZnJvbSAnLi9TY3JvbGxQcm9ncmVzcydcbmltcG9ydCB7IFNjcm9sbFNuYXBzIH0gZnJvbSAnLi9TY3JvbGxTbmFwcydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnksIFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgU2Nyb2xsVGFyZ2V0LCBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUbywgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlRm9jdXMsIFNsaWRlRm9jdXNUeXBlIH0gZnJvbSAnLi9TbGlkZUZvY3VzJ1xuaW1wb3J0IHsgU2xpZGVMb29wZXIsIFNsaWRlTG9vcGVyVHlwZSB9IGZyb20gJy4vU2xpZGVMb29wZXInXG5pbXBvcnQgeyBTbGlkZXNIYW5kbGVyLCBTbGlkZXNIYW5kbGVyVHlwZSB9IGZyb20gJy4vU2xpZGVzSGFuZGxlcidcbmltcG9ydCB7IFNsaWRlc0luVmlldywgU2xpZGVzSW5WaWV3VHlwZSB9IGZyb20gJy4vU2xpZGVzSW5WaWV3J1xuaW1wb3J0IHsgU2xpZGVTaXplcyB9IGZyb20gJy4vU2xpZGVTaXplcydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsLCBTbGlkZXNUb1Njcm9sbFR5cGUgfSBmcm9tICcuL1NsaWRlc1RvU2Nyb2xsJ1xuaW1wb3J0IHsgVHJhbnNsYXRlLCBUcmFuc2xhdGVUeXBlIH0gZnJvbSAnLi9UcmFuc2xhdGUnXG5pbXBvcnQgeyBhcnJheUtleXMsIGFycmF5TGFzdCwgYXJyYXlMYXN0SW5kZXgsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIEVuZ2luZVR5cGUgPSB7XG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50XG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuICBheGlzOiBBeGlzVHlwZVxuICBhbmltYXRpb246IEFuaW1hdGlvbnNUeXBlXG4gIHNjcm9sbEJvdW5kczogU2Nyb2xsQm91bmRzVHlwZVxuICBzY3JvbGxMb29wZXI6IFNjcm9sbExvb3BlclR5cGVcbiAgc2Nyb2xsUHJvZ3Jlc3M6IFNjcm9sbFByb2dyZXNzVHlwZVxuICBpbmRleDogQ291bnRlclR5cGVcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGVcbiAgbGltaXQ6IExpbWl0VHlwZVxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIG9mZnNldExvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgcHJldmlvdXNMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlXG4gIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlclR5cGVcbiAgZXZlbnRTdG9yZTogRXZlbnRTdG9yZVR5cGVcbiAgc2xpZGVMb29wZXI6IFNsaWRlTG9vcGVyVHlwZVxuICBzbGlkZXNJblZpZXc6IFNsaWRlc0luVmlld1R5cGVcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZVxuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZVR5cGVcbiAgcmVzaXplSGFuZGxlcjogUmVzaXplSGFuZGxlclR5cGVcbiAgc2xpZGVzSGFuZGxlcjogU2xpZGVzSGFuZGxlclR5cGVcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZVxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGVcbiAgc2Nyb2xsU25hcExpc3Q6IG51bWJlcltdXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXVxuICBzbGlkZUluZGV4ZXM6IG51bWJlcltdXG4gIHNsaWRlRm9jdXM6IFNsaWRlRm9jdXNUeXBlXG4gIHNsaWRlUmVnaXN0cnk6IFNsaWRlUmVnaXN0cnlUeXBlWydzbGlkZVJlZ2lzdHJ5J11cbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbmdpbmUoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgb3B0aW9uczogT3B0aW9uc1R5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuKTogRW5naW5lVHlwZSB7XG4gIC8vIE9wdGlvbnNcbiAgY29uc3Qge1xuICAgIGFsaWduLFxuICAgIGF4aXM6IHNjcm9sbEF4aXMsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0YXJ0SW5kZXgsXG4gICAgbG9vcCxcbiAgICBkdXJhdGlvbixcbiAgICBkcmFnRnJlZSxcbiAgICBkcmFnVGhyZXNob2xkLFxuICAgIGluVmlld1RocmVzaG9sZCxcbiAgICBzbGlkZXNUb1Njcm9sbDogZ3JvdXBTbGlkZXMsXG4gICAgc2tpcFNuYXBzLFxuICAgIGNvbnRhaW5TY3JvbGwsXG4gICAgd2F0Y2hSZXNpemUsXG4gICAgd2F0Y2hTbGlkZXMsXG4gICAgd2F0Y2hEcmFnLFxuICAgIHdhdGNoRm9jdXNcbiAgfSA9IG9wdGlvbnNcblxuICAvLyBNZWFzdXJlbWVudHNcbiAgY29uc3QgcGl4ZWxUb2xlcmFuY2UgPSAyXG4gIGNvbnN0IG5vZGVSZWN0cyA9IE5vZGVSZWN0cygpXG4gIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBub2RlUmVjdHMubWVhc3VyZShjb250YWluZXIpXG4gIGNvbnN0IHNsaWRlUmVjdHMgPSBzbGlkZXMubWFwKG5vZGVSZWN0cy5tZWFzdXJlKVxuICBjb25zdCBheGlzID0gQXhpcyhzY3JvbGxBeGlzLCBkaXJlY3Rpb24pXG4gIGNvbnN0IHZpZXdTaXplID0gYXhpcy5tZWFzdXJlU2l6ZShjb250YWluZXJSZWN0KVxuICBjb25zdCBwZXJjZW50T2ZWaWV3ID0gUGVyY2VudE9mVmlldyh2aWV3U2l6ZSlcbiAgY29uc3QgYWxpZ25tZW50ID0gQWxpZ25tZW50KGFsaWduLCB2aWV3U2l6ZSlcbiAgY29uc3QgY29udGFpblNuYXBzID0gIWxvb3AgJiYgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHJlYWRFZGdlR2FwID0gbG9vcCB8fCAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgeyBzbGlkZVNpemVzLCBzbGlkZVNpemVzV2l0aEdhcHMsIHN0YXJ0R2FwLCBlbmRHYXAgfSA9IFNsaWRlU2l6ZXMoXG4gICAgYXhpcyxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzLFxuICAgIHJlYWRFZGdlR2FwLFxuICAgIG93bmVyV2luZG93XG4gIClcbiAgY29uc3Qgc2xpZGVzVG9TY3JvbGwgPSBTbGlkZXNUb1Njcm9sbChcbiAgICBheGlzLFxuICAgIHZpZXdTaXplLFxuICAgIGdyb3VwU2xpZGVzLFxuICAgIGxvb3AsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHsgc25hcHMsIHNuYXBzQWxpZ25lZCB9ID0gU2Nyb2xsU25hcHMoXG4gICAgYXhpcyxcbiAgICBhbGlnbm1lbnQsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlc1RvU2Nyb2xsXG4gIClcbiAgY29uc3QgY29udGVudFNpemUgPSAtYXJyYXlMYXN0KHNuYXBzKSArIGFycmF5TGFzdChzbGlkZVNpemVzV2l0aEdhcHMpXG4gIGNvbnN0IHsgc25hcHNDb250YWluZWQsIHNjcm9sbENvbnRhaW5MaW1pdCB9ID0gU2Nyb2xsQ29udGFpbihcbiAgICB2aWV3U2l6ZSxcbiAgICBjb250ZW50U2l6ZSxcbiAgICBzbmFwc0FsaWduZWQsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gY29udGFpblNuYXBzID8gc25hcHNDb250YWluZWQgOiBzbmFwc0FsaWduZWRcbiAgY29uc3QgeyBsaW1pdCB9ID0gU2Nyb2xsTGltaXQoY29udGVudFNpemUsIHNjcm9sbFNuYXBzLCBsb29wKVxuXG4gIC8vIEluZGV4ZXNcbiAgY29uc3QgaW5kZXggPSBDb3VudGVyKGFycmF5TGFzdEluZGV4KHNjcm9sbFNuYXBzKSwgc3RhcnRJbmRleCwgbG9vcClcbiAgY29uc3QgaW5kZXhQcmV2aW91cyA9IGluZGV4LmNsb25lKClcbiAgY29uc3Qgc2xpZGVJbmRleGVzID0gYXJyYXlLZXlzKHNsaWRlcylcblxuICAvLyBBbmltYXRpb25cbiAgY29uc3QgdXBkYXRlOiBBbmltYXRpb25zVXBkYXRlVHlwZSA9ICh7XG4gICAgZHJhZ0hhbmRsZXIsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHMsXG4gICAgb3B0aW9uczogeyBsb29wIH1cbiAgfSkgPT4ge1xuICAgIGlmICghbG9vcCkgc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihkcmFnSGFuZGxlci5wb2ludGVyRG93bigpKVxuICAgIHNjcm9sbEJvZHkuc2VlaygpXG4gIH1cblxuICBjb25zdCByZW5kZXI6IEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKFxuICAgIHtcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICB0cmFuc2xhdGUsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICAgIHNjcm9sbExvb3BlcixcbiAgICAgIHNsaWRlTG9vcGVyLFxuICAgICAgZHJhZ0hhbmRsZXIsXG4gICAgICBhbmltYXRpb24sXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBzY3JvbGxCb3VuZHMsXG4gICAgICBvcHRpb25zOiB7IGxvb3AgfVxuICAgIH0sXG4gICAgYWxwaGFcbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkU2V0dGxlID0gc2Nyb2xsQm9keS5zZXR0bGVkKClcbiAgICBjb25zdCB3aXRoaW5Cb3VuZHMgPSAhc2Nyb2xsQm91bmRzLnNob3VsZENvbnN0cmFpbigpXG4gICAgY29uc3QgaGFzU2V0dGxlZCA9IGxvb3AgPyBzaG91bGRTZXR0bGUgOiBzaG91bGRTZXR0bGUgJiYgd2l0aGluQm91bmRzXG4gICAgY29uc3QgaGFzU2V0dGxlZEFuZElkbGUgPSBoYXNTZXR0bGVkICYmICFkcmFnSGFuZGxlci5wb2ludGVyRG93bigpXG5cbiAgICBpZiAoaGFzU2V0dGxlZEFuZElkbGUpIGFuaW1hdGlvbi5zdG9wKClcblxuICAgIGNvbnN0IGludGVycG9sYXRlZExvY2F0aW9uID1cbiAgICAgIGxvY2F0aW9uLmdldCgpICogYWxwaGEgKyBwcmV2aW91c0xvY2F0aW9uLmdldCgpICogKDEgLSBhbHBoYSlcblxuICAgIG9mZnNldExvY2F0aW9uLnNldChpbnRlcnBvbGF0ZWRMb2NhdGlvbilcblxuICAgIGlmIChsb29wKSB7XG4gICAgICBzY3JvbGxMb29wZXIubG9vcChzY3JvbGxCb2R5LmRpcmVjdGlvbigpKVxuICAgICAgc2xpZGVMb29wZXIubG9vcCgpXG4gICAgfVxuXG4gICAgdHJhbnNsYXRlLnRvKG9mZnNldExvY2F0aW9uLmdldCgpKVxuXG4gICAgaWYgKGhhc1NldHRsZWRBbmRJZGxlKSBldmVudEhhbmRsZXIuZW1pdCgnc2V0dGxlJylcbiAgICBpZiAoIWhhc1NldHRsZWQpIGV2ZW50SGFuZGxlci5lbWl0KCdzY3JvbGwnKVxuICB9XG5cbiAgY29uc3QgYW5pbWF0aW9uID0gQW5pbWF0aW9ucyhcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyV2luZG93LFxuICAgICgpID0+IHVwZGF0ZShlbmdpbmUpLFxuICAgIChhbHBoYTogbnVtYmVyKSA9PiByZW5kZXIoZW5naW5lLCBhbHBoYSlcbiAgKVxuXG4gIC8vIFNoYXJlZFxuICBjb25zdCBmcmljdGlvbiA9IDAuNjhcbiAgY29uc3Qgc3RhcnRMb2NhdGlvbiA9IHNjcm9sbFNuYXBzW2luZGV4LmdldCgpXVxuICBjb25zdCBsb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHByZXZpb3VzTG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBvZmZzZXRMb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHRhcmdldCA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHNjcm9sbEJvZHkgPSBTY3JvbGxCb2R5KFxuICAgIGxvY2F0aW9uLFxuICAgIG9mZnNldExvY2F0aW9uLFxuICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgdGFyZ2V0LFxuICAgIGR1cmF0aW9uLFxuICAgIGZyaWN0aW9uXG4gIClcbiAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gU2Nyb2xsVGFyZ2V0KFxuICAgIGxvb3AsXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgY29udGVudFNpemUsXG4gICAgbGltaXQsXG4gICAgdGFyZ2V0XG4gIClcbiAgY29uc3Qgc2Nyb2xsVG8gPSBTY3JvbGxUbyhcbiAgICBhbmltYXRpb24sXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICB0YXJnZXQsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcbiAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBTY3JvbGxQcm9ncmVzcyhsaW1pdClcbiAgY29uc3QgZXZlbnRTdG9yZSA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBzbGlkZXNJblZpZXcgPSBTbGlkZXNJblZpZXcoXG4gICAgY29udGFpbmVyLFxuICAgIHNsaWRlcyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgaW5WaWV3VGhyZXNob2xkXG4gIClcbiAgY29uc3QgeyBzbGlkZVJlZ2lzdHJ5IH0gPSBTbGlkZVJlZ2lzdHJ5KFxuICAgIGNvbnRhaW5TbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdCxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICBzbGlkZUluZGV4ZXNcbiAgKVxuICBjb25zdCBzbGlkZUZvY3VzID0gU2xpZGVGb2N1cyhcbiAgICByb290LFxuICAgIHNsaWRlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNjcm9sbFRvLFxuICAgIHNjcm9sbEJvZHksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgd2F0Y2hGb2N1c1xuICApXG5cbiAgLy8gRW5naW5lXG4gIGNvbnN0IGVuZ2luZTogRW5naW5lVHlwZSA9IHtcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyV2luZG93LFxuICAgIGV2ZW50SGFuZGxlcixcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgYW5pbWF0aW9uLFxuICAgIGF4aXMsXG4gICAgZHJhZ0hhbmRsZXI6IERyYWdIYW5kbGVyKFxuICAgICAgYXhpcyxcbiAgICAgIHJvb3QsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICB0YXJnZXQsXG4gICAgICBEcmFnVHJhY2tlcihheGlzLCBvd25lcldpbmRvdyksXG4gICAgICBsb2NhdGlvbixcbiAgICAgIGFuaW1hdGlvbixcbiAgICAgIHNjcm9sbFRvLFxuICAgICAgc2Nyb2xsQm9keSxcbiAgICAgIHNjcm9sbFRhcmdldCxcbiAgICAgIGluZGV4LFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgcGVyY2VudE9mVmlldyxcbiAgICAgIGRyYWdGcmVlLFxuICAgICAgZHJhZ1RocmVzaG9sZCxcbiAgICAgIHNraXBTbmFwcyxcbiAgICAgIGZyaWN0aW9uLFxuICAgICAgd2F0Y2hEcmFnXG4gICAgKSxcbiAgICBldmVudFN0b3JlLFxuICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBsaW1pdCxcbiAgICBsb2NhdGlvbixcbiAgICBvZmZzZXRMb2NhdGlvbixcbiAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgIG9wdGlvbnMsXG4gICAgcmVzaXplSGFuZGxlcjogUmVzaXplSGFuZGxlcihcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgc2xpZGVzLFxuICAgICAgYXhpcyxcbiAgICAgIHdhdGNoUmVzaXplLFxuICAgICAgbm9kZVJlY3RzXG4gICAgKSxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbEJvdW5kczogU2Nyb2xsQm91bmRzKFxuICAgICAgbGltaXQsXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHRhcmdldCxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBwZXJjZW50T2ZWaWV3XG4gICAgKSxcbiAgICBzY3JvbGxMb29wZXI6IFNjcm9sbExvb3Blcihjb250ZW50U2l6ZSwgbGltaXQsIG9mZnNldExvY2F0aW9uLCBbXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICAgIHRhcmdldFxuICAgIF0pLFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0OiBzY3JvbGxTbmFwcy5tYXAoc2Nyb2xsUHJvZ3Jlc3MuZ2V0KSxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgc2Nyb2xsVG8sXG4gICAgc2xpZGVMb29wZXI6IFNsaWRlTG9vcGVyKFxuICAgICAgYXhpcyxcbiAgICAgIHZpZXdTaXplLFxuICAgICAgY29udGVudFNpemUsXG4gICAgICBzbGlkZVNpemVzLFxuICAgICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgICAgc25hcHMsXG4gICAgICBzY3JvbGxTbmFwcyxcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgc2xpZGVzXG4gICAgKSxcbiAgICBzbGlkZUZvY3VzLFxuICAgIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXIoY29udGFpbmVyLCBldmVudEhhbmRsZXIsIHdhdGNoU2xpZGVzKSxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVJbmRleGVzLFxuICAgIHNsaWRlUmVnaXN0cnksXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgdGFyZ2V0LFxuICAgIHRyYW5zbGF0ZTogVHJhbnNsYXRlKGF4aXMsIGNvbnRhaW5lcilcbiAgfVxuXG4gIHJldHVybiBlbmdpbmVcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuXG50eXBlIENhbGxiYWNrVHlwZSA9IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsIGV2dDogRW1ibGFFdmVudFR5cGUpID0+IHZvaWRcbnR5cGUgTGlzdGVuZXJzVHlwZSA9IFBhcnRpYWw8eyBba2V5IGluIEVtYmxhRXZlbnRUeXBlXTogQ2FsbGJhY2tUeXBlW10gfT5cblxuZXhwb3J0IHR5cGUgRW1ibGFFdmVudFR5cGUgPSBFbWJsYUV2ZW50TGlzdFR5cGVba2V5b2YgRW1ibGFFdmVudExpc3RUeXBlXVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYmxhRXZlbnRMaXN0VHlwZSB7XG4gIGluaXQ6ICdpbml0J1xuICBwb2ludGVyRG93bjogJ3BvaW50ZXJEb3duJ1xuICBwb2ludGVyVXA6ICdwb2ludGVyVXAnXG4gIHNsaWRlc0NoYW5nZWQ6ICdzbGlkZXNDaGFuZ2VkJ1xuICBzbGlkZXNJblZpZXc6ICdzbGlkZXNJblZpZXcnXG4gIHNjcm9sbDogJ3Njcm9sbCdcbiAgc2VsZWN0OiAnc2VsZWN0J1xuICBzZXR0bGU6ICdzZXR0bGUnXG4gIGRlc3Ryb3k6ICdkZXN0cm95J1xuICByZUluaXQ6ICdyZUluaXQnXG4gIHJlc2l6ZTogJ3Jlc2l6ZSdcbiAgc2xpZGVGb2N1c1N0YXJ0OiAnc2xpZGVGb2N1c1N0YXJ0J1xuICBzbGlkZUZvY3VzOiAnc2xpZGVGb2N1cydcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBlbWl0OiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBvbjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb2ZmOiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCk6IEV2ZW50SGFuZGxlclR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBMaXN0ZW5lcnNUeXBlID0ge31cbiAgbGV0IGFwaTogRW1ibGFDYXJvdXNlbFR5cGVcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGFwaSA9IGVtYmxhQXBpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IENhbGxiYWNrVHlwZVtdIHtcbiAgICByZXR1cm4gbGlzdGVuZXJzW2V2dF0gfHwgW11cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGdldExpc3RlbmVycyhldnQpLmZvckVhY2goKGUpID0+IGUoYXBpLCBldnQpKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBvbihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5jb25jYXQoW2NiXSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBsaXN0ZW5lcnNbZXZ0XSA9IGdldExpc3RlbmVycyhldnQpLmZpbHRlcigoZSkgPT4gZSAhPT0gY2IpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IHt9XG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudEhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZW1pdCxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTG9vc2VPcHRpb25zVHlwZSwgQ3JlYXRlT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBvYmplY3RLZXlzLCBvYmplY3RzTWVyZ2VEZWVwLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBPcHRpb25zVHlwZSA9IFBhcnRpYWw8Q3JlYXRlT3B0aW9uc1R5cGU8TG9vc2VPcHRpb25zVHlwZT4+XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNIYW5kbGVyVHlwZSA9IHtcbiAgbWVyZ2VPcHRpb25zOiA8VHlwZUEgZXh0ZW5kcyBPcHRpb25zVHlwZSwgVHlwZUIgZXh0ZW5kcyBPcHRpb25zVHlwZT4oXG4gICAgb3B0aW9uc0E6IFR5cGVBLFxuICAgIG9wdGlvbnNCPzogVHlwZUJcbiAgKSA9PiBUeXBlQVxuICBvcHRpb25zQXRNZWRpYTogPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSkgPT4gVHlwZVxuICBvcHRpb25zTWVkaWFRdWVyaWVzOiAob3B0aW9uc0xpc3Q6IE9wdGlvbnNUeXBlW10pID0+IE1lZGlhUXVlcnlMaXN0W11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbnNIYW5kbGVyKG93bmVyV2luZG93OiBXaW5kb3dUeXBlKTogT3B0aW9uc0hhbmRsZXJUeXBlIHtcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICk6IFR5cGVBIHtcbiAgICByZXR1cm4gPFR5cGVBPm9iamVjdHNNZXJnZURlZXAob3B0aW9uc0EsIG9wdGlvbnNCIHx8IHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc0F0TWVkaWE8VHlwZSBleHRlbmRzIE9wdGlvbnNUeXBlPihvcHRpb25zOiBUeXBlKTogVHlwZSB7XG4gICAgY29uc3Qgb3B0aW9uc0F0TWVkaWEgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9XG4gICAgY29uc3QgbWF0Y2hlZE1lZGlhT3B0aW9ucyA9IG9iamVjdEtleXMob3B0aW9uc0F0TWVkaWEpXG4gICAgICAuZmlsdGVyKChtZWRpYSkgPT4gb3duZXJXaW5kb3cubWF0Y2hNZWRpYShtZWRpYSkubWF0Y2hlcylcbiAgICAgIC5tYXAoKG1lZGlhKSA9PiBvcHRpb25zQXRNZWRpYVttZWRpYV0pXG4gICAgICAucmVkdWNlKChhLCBtZWRpYU9wdGlvbikgPT4gbWVyZ2VPcHRpb25zKGEsIG1lZGlhT3B0aW9uKSwge30pXG5cbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIG1hdGNoZWRNZWRpYU9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25zTWVkaWFRdWVyaWVzKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKTogTWVkaWFRdWVyeUxpc3RbXSB7XG4gICAgcmV0dXJuIG9wdGlvbnNMaXN0XG4gICAgICAubWFwKChvcHRpb25zKSA9PiBvYmplY3RLZXlzKG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge30pKVxuICAgICAgLnJlZHVjZSgoYWNjLCBtZWRpYVF1ZXJpZXMpID0+IGFjYy5jb25jYXQobWVkaWFRdWVyaWVzKSwgW10pXG4gICAgICAubWFwKG93bmVyV2luZG93Lm1hdGNoTWVkaWEpXG4gIH1cblxuICBjb25zdCBzZWxmOiBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gICAgbWVyZ2VPcHRpb25zLFxuICAgIG9wdGlvbnNBdE1lZGlhLFxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlclR5cGUgfSBmcm9tICcuL09wdGlvbnNIYW5kbGVyJ1xuaW1wb3J0IHsgRW1ibGFQbHVnaW5zVHlwZSwgRW1ibGFQbHVnaW5UeXBlIH0gZnJvbSAnLi9QbHVnaW5zJ1xuXG5leHBvcnQgdHlwZSBQbHVnaW5zSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChcbiAgICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgcGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW11cbiAgKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsdWdpbnNIYW5kbGVyKFxuICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4pOiBQbHVnaW5zSGFuZGxlclR5cGUge1xuICBsZXQgYWN0aXZlUGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBwbHVnaW5zLmZpbHRlcihcbiAgICAgICh7IG9wdGlvbnMgfSkgPT4gb3B0aW9uc0hhbmRsZXIub3B0aW9uc0F0TWVkaWEob3B0aW9ucykuYWN0aXZlICE9PSBmYWxzZVxuICAgIClcbiAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmluaXQoZW1ibGFBcGksIG9wdGlvbnNIYW5kbGVyKSlcblxuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZShcbiAgICAgIChtYXAsIHBsdWdpbikgPT4gT2JqZWN0LmFzc2lnbihtYXAsIHsgW3BsdWdpbi5uYW1lXTogcGx1Z2luIH0pLFxuICAgICAge31cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBhY3RpdmVQbHVnaW5zLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmUsIEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXIsIEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zLCBFbWJsYU9wdGlvbnNUeXBlLCBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IFBsdWdpbnNIYW5kbGVyIH0gZnJvbSAnLi9QbHVnaW5zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcbmltcG9ydCB7IGlzU3RyaW5nLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gIGNhblNjcm9sbE5leHQ6ICgpID0+IGJvb2xlYW5cbiAgY2FuU2Nyb2xsUHJldjogKCkgPT4gYm9vbGVhblxuICBjb250YWluZXJOb2RlOiAoKSA9PiBIVE1MRWxlbWVudFxuICBpbnRlcm5hbEVuZ2luZTogKCkgPT4gRW5naW5lVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIG9mZjogRXZlbnRIYW5kbGVyVHlwZVsnb2ZmJ11cbiAgb246IEV2ZW50SGFuZGxlclR5cGVbJ29uJ11cbiAgZW1pdDogRXZlbnRIYW5kbGVyVHlwZVsnZW1pdCddXG4gIHBsdWdpbnM6ICgpID0+IEVtYmxhUGx1Z2luc1R5cGVcbiAgcHJldmlvdXNTY3JvbGxTbmFwOiAoKSA9PiBudW1iZXJcbiAgcmVJbml0OiAob3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsIHBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXSkgPT4gdm9pZFxuICByb290Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgc2Nyb2xsTmV4dDogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNjcm9sbFByZXY6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcm9ncmVzczogKCkgPT4gbnVtYmVyXG4gIHNjcm9sbFNuYXBMaXN0OiAoKSA9PiBudW1iZXJbXVxuICBzY3JvbGxUbzogKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNlbGVjdGVkU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHNsaWRlTm9kZXM6ICgpID0+IEhUTUxFbGVtZW50W11cbiAgc2xpZGVzSW5WaWV3OiAoKSA9PiBudW1iZXJbXVxuICBzbGlkZXNOb3RJblZpZXc6ICgpID0+IG51bWJlcltdXG59XG5cbmZ1bmN0aW9uIEVtYmxhQ2Fyb3VzZWwoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICB1c2VyT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gIHVzZXJQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbik6IEVtYmxhQ2Fyb3VzZWxUeXBlIHtcbiAgY29uc3Qgb3duZXJEb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudFxuICBjb25zdCBvd25lcldpbmRvdyA9IDxXaW5kb3dUeXBlPm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgY29uc3Qgb3B0aW9uc0hhbmRsZXIgPSBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdylcbiAgY29uc3QgcGx1Z2luc0hhbmRsZXIgPSBQbHVnaW5zSGFuZGxlcihvcHRpb25zSGFuZGxlcilcbiAgY29uc3QgbWVkaWFIYW5kbGVycyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBldmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXIoKVxuICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEsIG9wdGlvbnNNZWRpYVF1ZXJpZXMgfSA9IG9wdGlvbnNIYW5kbGVyXG4gIGNvbnN0IHsgb24sIG9mZiwgZW1pdCB9ID0gZXZlbnRIYW5kbGVyXG4gIGNvbnN0IHJlSW5pdCA9IHJlQWN0aXZhdGVcblxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcbiAgbGV0IGVuZ2luZTogRW5naW5lVHlwZVxuICBsZXQgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIEVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucylcbiAgbGV0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UpXG4gIGxldCBwbHVnaW5MaXN0OiBFbWJsYVBsdWdpblR5cGVbXSA9IFtdXG4gIGxldCBwbHVnaW5BcGlzOiBFbWJsYVBsdWdpbnNUeXBlXG5cbiAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgbGV0IHNsaWRlczogSFRNTEVsZW1lbnRbXVxuXG4gIGZ1bmN0aW9uIHN0b3JlRWxlbWVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXI6IHVzZXJDb250YWluZXIsIHNsaWRlczogdXNlclNsaWRlcyB9ID0gb3B0aW9uc1xuXG4gICAgY29uc3QgY3VzdG9tQ29udGFpbmVyID0gaXNTdHJpbmcodXNlckNvbnRhaW5lcilcbiAgICAgID8gcm9vdC5xdWVyeVNlbGVjdG9yKHVzZXJDb250YWluZXIpXG4gICAgICA6IHVzZXJDb250YWluZXJcbiAgICBjb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+KGN1c3RvbUNvbnRhaW5lciB8fCByb290LmNoaWxkcmVuWzBdKVxuXG4gICAgY29uc3QgY3VzdG9tU2xpZGVzID0gaXNTdHJpbmcodXNlclNsaWRlcylcbiAgICAgID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodXNlclNsaWRlcylcbiAgICAgIDogdXNlclNsaWRlc1xuICAgIHNsaWRlcyA9IDxIVE1MRWxlbWVudFtdPltdLnNsaWNlLmNhbGwoY3VzdG9tU2xpZGVzIHx8IGNvbnRhaW5lci5jaGlsZHJlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVuZ2luZShvcHRpb25zOiBPcHRpb25zVHlwZSk6IEVuZ2luZVR5cGUge1xuICAgIGNvbnN0IGVuZ2luZSA9IEVuZ2luZShcbiAgICAgIHJvb3QsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzbGlkZXMsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBvcHRpb25zLFxuICAgICAgZXZlbnRIYW5kbGVyXG4gICAgKVxuXG4gICAgaWYgKG9wdGlvbnMubG9vcCAmJiAhZW5naW5lLnNsaWRlTG9vcGVyLmNhbkxvb3AoKSkge1xuICAgICAgY29uc3Qgb3B0aW9uc1dpdGhvdXRMb29wID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBsb29wOiBmYWxzZSB9KVxuICAgICAgcmV0dXJuIGNyZWF0ZUVuZ2luZShvcHRpb25zV2l0aG91dExvb3ApXG4gICAgfVxuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHdpdGhPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShvcHRpb25zQmFzZSlcbiAgICBwbHVnaW5MaXN0ID0gd2l0aFBsdWdpbnMgfHwgcGx1Z2luTGlzdFxuXG4gICAgc3RvcmVFbGVtZW50cygpXG5cbiAgICBlbmdpbmUgPSBjcmVhdGVFbmdpbmUob3B0aW9ucylcblxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXMoW1xuICAgICAgb3B0aW9uc0Jhc2UsXG4gICAgICAuLi5wbHVnaW5MaXN0Lm1hcCgoeyBvcHRpb25zIH0pID0+IG9wdGlvbnMpXG4gICAgXSkuZm9yRWFjaCgocXVlcnkpID0+IG1lZGlhSGFuZGxlcnMuYWRkKHF1ZXJ5LCAnY2hhbmdlJywgcmVBY3RpdmF0ZSkpXG5cbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlKSByZXR1cm5cblxuICAgIGVuZ2luZS50cmFuc2xhdGUudG8oZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICAgIGVuZ2luZS5hbmltYXRpb24uaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5pbml0KClcbiAgICBlbmdpbmUuc2xpZGVGb2N1cy5pbml0KHNlbGYpXG4gICAgZW5naW5lLmV2ZW50SGFuZGxlci5pbml0KHNlbGYpXG4gICAgZW5naW5lLnJlc2l6ZUhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIGlmIChlbmdpbmUub3B0aW9ucy5sb29wKSBlbmdpbmUuc2xpZGVMb29wZXIubG9vcCgpXG4gICAgaWYgKGNvbnRhaW5lci5vZmZzZXRQYXJlbnQgJiYgc2xpZGVzLmxlbmd0aCkgZW5naW5lLmRyYWdIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIHBsdWdpbkFwaXMgPSBwbHVnaW5zSGFuZGxlci5pbml0KHNlbGYsIHBsdWdpbkxpc3QpXG4gIH1cblxuICBmdW5jdGlvbiByZUFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGFjdGl2YXRlKG1lcmdlT3B0aW9ucyh7IHN0YXJ0SW5kZXggfSwgd2l0aE9wdGlvbnMpLCB3aXRoUGx1Z2lucylcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncmVJbml0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlQWN0aXZhdGUoKTogdm9pZCB7XG4gICAgZW5naW5lLmRyYWdIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5ldmVudFN0b3JlLmNsZWFyKClcbiAgICBlbmdpbmUudHJhbnNsYXRlLmNsZWFyKClcbiAgICBlbmdpbmUuc2xpZGVMb29wZXIuY2xlYXIoKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuZGVzdHJveSgpXG4gICAgZW5naW5lLmFuaW1hdGlvbi5kZXN0cm95KClcbiAgICBwbHVnaW5zSGFuZGxlci5kZXN0cm95KClcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICAgIG1lZGlhSGFuZGxlcnMuY2xlYXIoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdkZXN0cm95JylcbiAgICBldmVudEhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8oaW5kZXg6IG51bWJlciwganVtcD86IGJvb2xlYW4sIGRpcmVjdGlvbj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghb3B0aW9ucy5hY3RpdmUgfHwgZGVzdHJveWVkKSByZXR1cm5cbiAgICBlbmdpbmUuc2Nyb2xsQm9keVxuICAgICAgLnVzZUJhc2VGcmljdGlvbigpXG4gICAgICAudXNlRHVyYXRpb24oanVtcCA9PT0gdHJ1ZSA/IDAgOiBvcHRpb25zLmR1cmF0aW9uKVxuICAgIGVuZ2luZS5zY3JvbGxUby5pbmRleChpbmRleCwgZGlyZWN0aW9uIHx8IDApXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxOZXh0KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhuZXh0LCBqdW1wLCAtMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFByZXYoanVtcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhwcmV2LCBqdW1wLCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsTmV4dCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBuZXh0ID0gZW5naW5lLmluZGV4LmFkZCgxKS5nZXQoKVxuICAgIHJldHVybiBuZXh0ICE9PSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsUHJldigpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICByZXR1cm4gcHJldiAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFNuYXBMaXN0KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFNuYXBMaXN0XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcm9ncmVzcygpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuc2Nyb2xsUHJvZ3Jlc3MuZ2V0KGVuZ2luZS5vZmZzZXRMb2NhdGlvbi5nZXQoKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdGVkU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXguZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXhQcmV2aW91cy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzSW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzTm90SW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBwbHVnaW5zKCk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHJldHVybiBwbHVnaW5BcGlzXG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcm5hbEVuZ2luZSgpOiBFbmdpbmVUeXBlIHtcbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiByb290Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHJvb3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRhaW5lck5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlTm9kZXMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHNsaWRlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gICAgY2FuU2Nyb2xsTmV4dCxcbiAgICBjYW5TY3JvbGxQcmV2LFxuICAgIGNvbnRhaW5lck5vZGUsXG4gICAgaW50ZXJuYWxFbmdpbmUsXG4gICAgZGVzdHJveSxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgZW1pdCxcbiAgICBwbHVnaW5zLFxuICAgIHByZXZpb3VzU2Nyb2xsU25hcCxcbiAgICByZUluaXQsXG4gICAgcm9vdE5vZGUsXG4gICAgc2Nyb2xsTmV4dCxcbiAgICBzY3JvbGxQcmV2LFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNlbGVjdGVkU2Nyb2xsU25hcCxcbiAgICBzbGlkZU5vZGVzLFxuICAgIHNsaWRlc0luVmlldyxcbiAgICBzbGlkZXNOb3RJblZpZXdcbiAgfVxuXG4gIGFjdGl2YXRlKHVzZXJPcHRpb25zLCB1c2VyUGx1Z2lucylcbiAgc2V0VGltZW91dCgoKSA9PiBldmVudEhhbmRsZXIuZW1pdCgnaW5pdCcpLCAwKVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBFbWJsYUNhcm91c2VsIHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEVtYmxhT3B0aW9uc1R5cGUgfCB1bmRlZmluZWRcbn1cblxuRW1ibGFDYXJvdXNlbC5nbG9iYWxPcHRpb25zID0gdW5kZWZpbmVkXG5cbmV4cG9ydCBkZWZhdWx0IEVtYmxhQ2Fyb3VzZWxcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWJsYUNhcm91c2VsIGZyb20gJ2VtYmxhLWNhcm91c2VsJztcbmltcG9ydCBBdXRvcGxheSBmcm9tICdlbWJsYS1jYXJvdXNlbC1hdXRvcGxheSc7XG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzUGx1Z2luIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMnO1xuaW1wb3J0ICcuL2dhbGxlcnkuc2Nzcyc7XG5pbXBvcnQge1xuICAgIGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMsXG4gICAgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlLFxuICAgIGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnNcbn0gZnJvbSAnLi9idXR0b25zLmVzNic7XG5cbmNsYXNzIFlURHluYW1pY3NHYWxsZXJ5IHtcbiAgICBpbml0KGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHkgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBjb250YWluZXIuZGF0YXNldC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbiAgICAgICAgY29uc3QgYXhpcyA9IG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3knIDogJ3gnO1xuICAgICAgICBjb25zdCBtb2JpbGVPcmllbnRhdGlvbiA9IGNvbnRhaW5lci5kYXRhc2V0Lm1vYmlsZU9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xuICAgICAgICBjb25zdCBtb2JpbGVBeGlzID0gbW9iaWxlT3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAneScgOiAneCc7XG4gICAgICAgIGNvbnN0IHRodW1iQXhpcyA9IGNvbnRhaW5lci5kYXRhc2V0LnRodW1iQXhpcyA9PT0gJ3knID8gJ3knIDogJ3gnO1xuICAgICAgICBjb25zdCBtb2JpbGVUaHVtYkF4aXMgPSBjb250YWluZXIuZGF0YXNldC50aHVtYk1vYmlsZUF4aXMgPT09ICd5JyA/ICd5JyA6ICd4JztcbiAgICAgICAgY29uc3QgbmF2TW9kZSA9IFsndGh1bWJuYXYnLCAnZG90bmF2J10uaW5jbHVkZXMoY29udGFpbmVyLmRhdGFzZXQubmF2KVxuICAgICAgICAgICAgPyBjb250YWluZXIuZGF0YXNldC5uYXZcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGxvb3AgPSBjb250YWluZXIuZGF0YXNldC5sb29wICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCB3YXRjaERyYWcgPSBjb250YWluZXIuZGF0YXNldC5kcmFnICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgubWF4KDEwLCBNYXRoLm1pbig2MCwgTnVtYmVyKGNvbnRhaW5lci5kYXRhc2V0LmR1cmF0aW9uKSB8fCAzMCkpO1xuICAgICAgICBjb25zdCBhdXRvcGxheSA9IGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5ID09PSAndHJ1ZSc7XG4gICAgICAgIGNvbnN0IGF1dG9wbGF5RGVsYXkgPSBNYXRoLm1heCgzMDAwLCBNYXRoLm1pbigyMDAwMCwgTnVtYmVyKGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5RGVsYXkpIHx8IDcwMDApKTtcbiAgICAgICAgY29uc3QgYXV0b3BsYXlQYXVzZSA9IGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5UGF1c2UgIT09ICdmYWxzZSc7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBheGlzLFxuICAgICAgICAgICAgbG9vcCxcbiAgICAgICAgICAgIHdhdGNoRHJhZyxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAnKG1heC13aWR0aDogNjM5cHgpJzoge2F4aXM6IG1vYmlsZUF4aXN9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUaHVtYnMgPSB7XG4gICAgICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgICAgIGF4aXM6IHRodW1iQXhpcyxcbiAgICAgICAgICAgIGRyYWdGcmVlOiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgICcobWF4LXdpZHRoOiA2MzlweCknOiB7YXhpczogbW9iaWxlVGh1bWJBeGlzfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICBwcmV2VGh1bWJCdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ByZXYnKSxcbiAgICAgICAgICAgIG5leHRUaHVtYkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fbmV4dCcpLFxuICAgICAgICAgICAgcHJldk1haW5CdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fcHJldicpLFxuICAgICAgICAgICAgbmV4dE1haW5CdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fbmV4dCcpO1xuXG4gICAgICAgIGlmICghdmlld3BvcnROb2RlTWFpbkNhcm91c2VsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuZGF0YXNldC5ybUdhbGxlcnlSZWFkeSA9ICd0cnVlJztcblxuICAgICAgICBjb25zdCBwbHVnaW5zID0gYXV0b3BsYXkgPyBbQXV0b3BsYXkoe1xuICAgICAgICAgICAgZGVsYXk6IGF1dG9wbGF5RGVsYXksXG4gICAgICAgICAgICBzdG9wT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzdG9wT25Nb3VzZUVudGVyOiBhdXRvcGxheVBhdXNlLFxuICAgICAgICAgICAgc3RvcE9uRm9jdXNJbjogYXV0b3BsYXlQYXVzZVxuICAgICAgICB9KV0gOiBbXTtcbiAgICAgICAgY29uc3QgZW1ibGFNYWluID0gRW1ibGFDYXJvdXNlbCh2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwsIG9wdGlvbnMsIHBsdWdpbnMpO1xuICAgICAgICBjb25zdCBjbGVhbnVwcyA9IFtdO1xuICAgICAgICBsZXQgZW1ibGFUaHVtYiA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc3luY1NsaWRlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZW1ibGFNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpO1xuICAgICAgICAgICAgZW1ibGFNYWluLnNsaWRlTm9kZXMoKS5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBpbmRleCA9PT0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGFjdGl2ZSA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF0nKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID09PSAnJyA/IGNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpIDogY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuZGF0YXNldC5ybUdhbGxlcnlUYWJpbmRleCA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID8/ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBlbWJsYU1haW4ub24oJ3NlbGVjdCcsIHN5bmNTbGlkZXMpLm9uKCdyZUluaXQnLCBzeW5jU2xpZGVzKTtcbiAgICAgICAgc3luY1NsaWRlcygpO1xuXG4gICAgICAgIGlmIChuYXZNb2RlICYmIHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hdk5vZGVzID0gQXJyYXkuZnJvbShjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJtc2xpZGVzaG93LXRodW1ic19fc2xpZGUnKSk7XG5cbiAgICAgICAgICAgIGlmIChuYXZNb2RlID09PSAndGh1bWJuYXYnKSB7XG4gICAgICAgICAgICAgICAgZW1ibGFUaHVtYiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCwgb3B0aW9uc1RodW1icywgW1doZWVsR2VzdHVyZXNQbHVnaW4oKV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbnVwcy5wdXNoKFxuICAgICAgICAgICAgICAgIGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMoZW1ibGFNYWluLCBuYXZOb2RlcyksXG4gICAgICAgICAgICAgICAgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlKGVtYmxhTWFpbiwgbmF2Tm9kZXMsIGVtYmxhVGh1bWIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoZW1ibGFUaHVtYiAmJiBwcmV2VGh1bWJCdG5Ob2RlICYmIG5leHRUaHVtYkJ0bk5vZGUpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwcy5wdXNoKGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMoXG4gICAgICAgICAgICAgICAgICAgIGVtYmxhVGh1bWIsXG4gICAgICAgICAgICAgICAgICAgIHByZXZUaHVtYkJ0bk5vZGUsXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaHVtYkJ0bk5vZGVcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2TWFpbkJ0bk5vZGUgJiYgbmV4dE1haW5CdG5Ob2RlKSB7XG4gICAgICAgICAgICBjbGVhbnVwcy5wdXNoKGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMoXG4gICAgICAgICAgICAgICAgZW1ibGFNYWluLFxuICAgICAgICAgICAgICAgIHByZXZNYWluQnRuTm9kZSxcbiAgICAgICAgICAgICAgICBuZXh0TWFpbkJ0bk5vZGVcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGVtYmxhTWFpbi5vZmYoJ3NlbGVjdCcsIHN5bmNTbGlkZXMpO1xuICAgICAgICAgICAgZW1ibGFNYWluLm9mZigncmVJbml0Jywgc3luY1NsaWRlcyk7XG4gICAgICAgICAgICBjbGVhbnVwcy5mb3JFYWNoKChjbGVhbnVwKSA9PiBjbGVhbnVwKCkpO1xuICAgICAgICAgICAgZW1ibGFUaHVtYj8uZGVzdHJveSgpO1xuICAgICAgICAgICAgZW1ibGFNYWluLnNsaWRlTm9kZXMoKS5mb3JFYWNoKChzbGlkZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1nYWxsZXJ5LXRhYmluZGV4XScpLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID09PSAnJyA/IGNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpIDogY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHk7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyLnJtR2FsbGVyeURlc3Ryb3k7XG4gICAgICAgIH07XG4gICAgICAgIGVtYmxhTWFpbi5vbignZGVzdHJveScsIGNsZWFudXApO1xuICAgICAgICBjb250YWluZXIucm1HYWxsZXJ5RGVzdHJveSA9ICgpID0+IGVtYmxhTWFpbi5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5jb25zdCBnYWxsZXJ5VGV4dCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncnUnKVxuICAgID8ge2ltYWdlOiAn0JjQt9C+0LHRgNCw0LbQtdC90LjQtScsIG9wZW46ICfQntGC0LrRgNGL0YLRjCDQuNC30L7QsdGA0LDQttC10L3QuNC1J31cbiAgICA6IHtpbWFnZTogJ0ltYWdlJywgb3BlbjogJ09wZW4gaW1hZ2UnfTtcblxuY29uc3QgcHJvZHVjdFNsaWRlID0gKGNvbnRhaW5lciwgbWVkaWEsIGluZGV4LCB0b3RhbCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2xpZGUuY2xhc3NOYW1lID0gJ2VsLWl0ZW0gcm1zbGlkZXNob3dfX3NsaWRlJztcbiAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZ3JvdXAnKTtcbiAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtcm9sZWRlc2NyaXB0aW9uJywgJ3NsaWRlJyk7XG4gICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7aW5kZXggKyAxfSAvICR7dG90YWx9YCk7XG4gICAgY29uc3QgaW1hZ2VXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW1hZ2VXcmFwLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvd19fc2xpZGVfX2ltYWdlIHVrLWZsZXggdWstZmxleC1jZW50ZXIgdWstZmxleC1taWRkbGUnO1xuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2Uuc3JjID0gbWVkaWEuc3JjIHx8ICcnO1xuICAgIGltYWdlLmFsdCA9IG1lZGlhLmFsdCB8fCAnJztcbiAgICBpbWFnZS5sb2FkaW5nID0gY29udGFpbmVyLmRhdGFzZXQuaW1hZ2VMb2FkaW5nID09PSAnZWFnZXInID8gJ2VhZ2VyJyA6ICdsYXp5JztcbiAgICBpbWFnZVdyYXAuYXBwZW5kKGltYWdlKTtcblxuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5saWdodGJveCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuY2xhc3NOYW1lID0gJ3Jtc2xpZGVzaG93X19saWdodGJveCB1ay1kaXNwbGF5LWJsb2NrIHVrLXBvc2l0aW9uLXJlbGF0aXZlIHVrLXRyYW5zaXRpb24tdG9nZ2xlJztcbiAgICAgICAgbGluay5ocmVmID0gbWVkaWEuc3JjIHx8ICcnO1xuICAgICAgICBsaW5rLmRhdGFzZXQucm1MaWdodGJveCA9ICcnO1xuICAgICAgICBsaW5rLmRhdGFzZXQudHlwZSA9ICdpbWFnZSc7XG4gICAgICAgIGxpbmsuZGF0YXNldC5hbHQgPSBtZWRpYS5hbHQgfHwgJyc7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7Z2FsbGVyeVRleHQub3Blbn06ICR7bWVkaWEuYWx0IHx8IGAke2dhbGxlcnlUZXh0LmltYWdlfSAke2luZGV4ICsgMX1gfWApO1xuICAgICAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQubGlnaHRib3hDYXB0aW9uICE9PSAnZmFsc2UnICYmIG1lZGlhLmFsdCkgbGluay5kYXRhc2V0LmNhcHRpb24gPSBtZWRpYS5hbHQ7XG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGljb24uY2xhc3NOYW1lID0gJ3Jtc2xpZGVzaG93X19saWdodGJveC1pY29uIHVrLXBvc2l0aW9uLWNlbnRlciB1ay10cmFuc2l0aW9uLWZhZGUnO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgndWstb3ZlcmxheS1pY29uJywgJycpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBsaW5rLmFwcGVuZChpbWFnZVdyYXAsIGljb24pO1xuICAgICAgICBzbGlkZS5hcHBlbmQobGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGUuYXBwZW5kKGltYWdlV3JhcCk7XG4gICAgfVxuICAgIHJldHVybiBzbGlkZTtcbn07XG5cbmNvbnN0IHByb2R1Y3RUaHVtYiA9IChjb250YWluZXIsIG1lZGlhLCBpbmRleCwgYW5jaG9yQ2xhc3MpID0+IHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlJztcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2dhbGxlcnlUZXh0LmltYWdlfSAke2luZGV4ICsgMX1gKTtcbiAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQubmF2ICE9PSAnZG90bmF2Jykge1xuICAgICAgICBsaW5rLmNsYXNzTmFtZSA9IGFuY2hvckNsYXNzIHx8ICd1ay1kaXNwbGF5LWJsb2NrIHVrLW92ZXJmbG93LWhpZGRlbiB1ay1iYWNrZ3JvdW5kLW11dGVkJztcbiAgICAgICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgd3JhcC5jbGFzc05hbWUgPSAncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZV9faW1hZ2UgdWstZmxleCB1ay1mbGV4LWNlbnRlciB1ay1mbGV4LW1pZGRsZSc7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlLnNyYyA9IG1lZGlhLnNyYyB8fCAnJztcbiAgICAgICAgaW1hZ2UuYWx0ID0gbWVkaWEuYWx0IHx8ICcnO1xuICAgICAgICBpbWFnZS5sb2FkaW5nID0gY29udGFpbmVyLmRhdGFzZXQuaW1hZ2VMb2FkaW5nID09PSAnZWFnZXInID8gJ2VhZ2VyJyA6ICdsYXp5JztcbiAgICAgICAgd3JhcC5hcHBlbmQoaW1hZ2UpO1xuICAgICAgICBsaW5rLmFwcGVuZCh3cmFwKTtcbiAgICB9XG4gICAgaXRlbS5hcHBlbmQobGluayk7XG4gICAgcmV0dXJuIGl0ZW07XG59O1xuXG5jb25zdCB1cGRhdGVQcm9kdWN0R2FsbGVyeSA9IChjb250YWluZXIsIG1lZGlhID0gW10pID0+IHtcbiAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQucm1Qcm9kdWN0R2FsbGVyeSAhPT0gJ3RydWUnKSByZXR1cm47XG4gICAgY29uc3Qgc2xpZGVzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fY29udGFpbmVyJyk7XG4gICAgY29uc3QgdGh1bWJzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX2NvbnRhaW5lcicpO1xuICAgIGlmICghc2xpZGVzKSByZXR1cm47XG5cbiAgICBjb25zdCB0aHVtYkFuY2hvckNsYXNzID0gdGh1bWJzPy5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZSA+IGEnKT8uY2xhc3NOYW1lIHx8ICcnO1xuICAgIGNvbnRhaW5lci5ybUdhbGxlcnlEZXN0cm95Py4oKTtcbiAgICB3aW5kb3cuVUlraXQ/LmdldENvbXBvbmVudD8uKHNsaWRlcywgJ2xpZ2h0Ym94Jyk/LiRkZXN0cm95Py4oKTtcbiAgICBzbGlkZXMucmVwbGFjZUNoaWxkcmVuKC4uLm1lZGlhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHByb2R1Y3RTbGlkZShjb250YWluZXIsIGl0ZW0sIGluZGV4LCBtZWRpYS5sZW5ndGgpKSk7XG4gICAgaWYgKHRodW1icykge1xuICAgICAgICB0aHVtYnMucmVwbGFjZUNoaWxkcmVuKC4uLm1lZGlhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHByb2R1Y3RUaHVtYihjb250YWluZXIsIGl0ZW0sIGluZGV4LCB0aHVtYkFuY2hvckNsYXNzKSkpO1xuICAgIH1cbiAgICBjb250YWluZXIuaGlkZGVuID0gbWVkaWEubGVuZ3RoID09PSAwO1xuICAgIHdpbmRvdy5VSWtpdD8udXBkYXRlPy4oY29udGFpbmVyKTtcbiAgICBpZiAobWVkaWEubGVuZ3RoKSBuZXcgWVREeW5hbWljc0dhbGxlcnkoKS5pbml0KGNvbnRhaW5lcik7XG59O1xuXG5jb25zdCBpbml0R2FsbGVyaWVzID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignLnJtc2xpZGVzaG93JykpIHtcbiAgICAgICAgbmV3IFlURHluYW1pY3NHYWxsZXJ5KCkuaW5pdChyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignLnJtc2xpZGVzaG93JykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBuZXcgWVREeW5hbWljc0dhbGxlcnkoKS5pbml0KGVsZW1lbnQpO1xuICAgIH0pO1xufTtcblxuY29uc3QgZGVzdHJveUdhbGxlcmllcyA9IChyb290KSA9PiB7XG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCcucm1zbGlkZXNob3cnKSkge1xuICAgICAgICByb290LnJtR2FsbGVyeURlc3Ryb3k/LigpO1xuICAgIH1cblxuICAgIHJvb3QucXVlcnlTZWxlY3RvckFsbD8uKCcucm1zbGlkZXNob3cnKS5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LnJtR2FsbGVyeURlc3Ryb3k/LigpKTtcbn07XG5cbmNvbnN0IG9ic2VydmVHYWxsZXJpZXMgPSAoKSA9PiB7XG4gICAgaW5pdEdhbGxlcmllcygpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmFkaWNhbG1hcnQ6cHJvZHVjdC1jaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBldmVudC5kZXRhaWw/LnByb2R1Y3Q7XG4gICAgICAgIGlmICghc2NvcGU/LnF1ZXJ5U2VsZWN0b3JBbGwgfHwgIXByb2R1Y3QpIHJldHVybjtcbiAgICAgICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tcHJvZHVjdC1nYWxsZXJ5PVwidHJ1ZVwiXScpLmZvckVhY2goKGdhbGxlcnkpID0+IHtcbiAgICAgICAgICAgIGlmIChnYWxsZXJ5LmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJykgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvZHVjdEdhbGxlcnkoZ2FsbGVyeSwgcHJvZHVjdC5tZWRpYSB8fCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRHYWxsZXJpZXMobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZW1vdmVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBkZXN0cm95R2FsbGVyaWVzKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBvYnNlcnZlR2FsbGVyaWVzLCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBvYnNlcnZlR2FsbGVyaWVzKCk7XG59XG4iXSwibmFtZXMiOlsiZGVmYXVsdE9wdGlvbnMiLCJhY3RpdmUiLCJicmVha3BvaW50cyIsIndoZWVsRHJhZ2dpbmdDbGFzcyIsImZvcmNlV2hlZWxBeGlzIiwidW5kZWZpbmVkIiwidGFyZ2V0IiwiV2hlZWxHZXN0dXJlc1BsdWdpbiIsImdsb2JhbE9wdGlvbnMiLCJfX0RFVl9fIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidXNlck9wdGlvbnMiLCJvcHRpb25zIiwiY2xlYW51cCIsImluaXQiLCJlbWJsYSIsIm9wdGlvbnNIYW5kbGVyIiwibWVyZ2VPcHRpb25zIiwib3B0aW9uc0F0TWVkaWEiLCJvcHRpb25zQmFzZSIsImFsbE9wdGlvbnMiLCJlbmdpbmUiLCJpbnRlcm5hbEVuZ2luZSIsInRhcmdldE5vZGUiLCJfb3B0aW9ucyR0YXJnZXQiLCJjb250YWluZXJOb2RlIiwicGFyZW50Tm9kZSIsIndoZWVsQXhpcyIsIl9vcHRpb25zJGZvcmNlV2hlZWxBeCIsImF4aXMiLCJ3aGVlbEdlc3R1cmVzIiwiV2hlZWxHZXN0dXJlcyIsInByZXZlbnRXaGVlbEFjdGlvbiIsInJldmVyc2VTaWduIiwidXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMiLCJzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCIsImNvbnRhaW5lclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInVub2JzZXJ2ZVRhcmdldE5vZGUiLCJvYnNlcnZlIiwib2ZmV2hlZWwiLCJvbiIsImhhbmRsZVdoZWVsIiwiaXNTdGFydGVkIiwic3RhcnRFdmVudCIsIm92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiIsImJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kIiwid2hlZWxHZXN0dXJlU3RhcnRlZCIsInN0YXRlIiwiTW91c2VFdmVudCIsImV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImUiLCJjb25zb2xlIiwid2FybiIsImFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aGVlbEdlc3R1cmVFbmRlZCIsImNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCIsInJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzVHJ1c3RlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInR5cGUiLCJtb3ZlWCIsIm1vdmVZIiwiX3N0YXRlJGF4aXNNb3ZlbWVudCIsImF4aXNNb3ZlbWVudCIsIl9zdGF0ZSRheGlzTW92ZW1lbnQyIiwiY2hlY2tJZkF0Qm91bmRhcnkiLCJpc0F0Qm91bmRhcnkiLCJfY2hlY2tJZkF0Qm91bmRhcnkiLCJwcm9ncmVzc1JhdGlvIiwiTWF0aCIsIm1pbiIsImRhbXBpbmdGYWN0b3IiLCJjb3VudGVyTW92ZVNpZ24iLCJjb3VudGVyTW92ZW1lbnQiLCJkYW1waW5nTW92ZW1lbnQiLCJza2lwU25hcHMiLCJkcmFnRnJlZSIsIm1heFgiLCJtYXhZIiwibWF4IiwiY2xpZW50WCIsImNsaWVudFkiLCJzY3JlZW5YIiwic2NyZWVuWSIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsImJ1dHRvbiIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJheGlzRGVsdGEiLCJkZWx0YVgiLCJfc3RhdGUkYXhpc0RlbHRhIiwiZGVsdGFZIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYW5TY3JvbGxOZXh0IiwiY2FuU2Nyb2xsUHJldiIsInByaW1hcnlBeGlzRGVsdGEiLCJpc1Njcm9sbGluZ05leHQiLCJpc1Njcm9sbGluZ1ByZXYiLCJpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZCIsIl9jaGVja0lmQXRCb3VuZGFyeTIiLCJpc01vbWVudHVtIiwiYWJzIiwiX3N0YXRlJGF4aXNEZWx0YTIiLCJjcm9zc0F4aXNEZWx0YSIsImlzUmVsZWFzZSIsInByZXZpb3VzIiwiaXNFbmRpbmdPclJlbGVhc2UiLCJpc0VuZGluZyIsInByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50Iiwib2ZmIiwic2VsZiIsIm5hbWUiLCJkZXN0cm95IiwiREVDQVkiLCJwcm9qZWN0aW9uIiwidmVsb2NpdHlQeE1zIiwiZGVjYXkiLCJsYXN0T2YiLCJhcnJheSIsImxlbmd0aCIsImF2ZXJhZ2UiLCJudW1iZXJzIiwicmVkdWNlIiwiYSIsImIiLCJjbGFtcCIsInZhbHVlIiwiYWRkVmVjdG9ycyIsInYxIiwidjIiLCJFcnJvciIsIm1hcCIsInZhbCIsImkiLCJhYnNNYXgiLCJhcHBseSIsImRlZXBGcmVlemUiLCJvIiwiT2JqZWN0IiwiZnJlZXplIiwidmFsdWVzIiwiZm9yRWFjaCIsImlzRnJvemVuIiwiRXZlbnRCdXMiLCJsaXN0ZW5lcnMiLCJsaXN0ZW5lciIsImNvbmNhdCIsImZpbHRlciIsImwiLCJkaXNwYXRjaCIsImRhdGEiLCJXaGVlbFRhcmdldE9ic2VydmVyIiwiZXZlbnRMaXN0ZW5lciIsInRhcmdldHMiLCJwYXNzaXZlIiwicHVzaCIsInVub2JzZXJ2ZSIsInQiLCJkaXNjb25uZWN0IiwiTElORV9IRUlHSFQiLCJQQUdFX0hFSUdIVCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiREVMVEFfTU9ERV9VTklUIiwibm9ybWFsaXplV2hlZWwiLCJkZWx0YU1vZGUiLCJkZWx0YVoiLCJ0aW1lU3RhbXAiLCJyZXZlcnNlQWxsIiwicmV2ZXJzZUF4aXNEZWx0YVNpZ24iLCJ3aGVlbCIsIm11bHRpcGxpZXJzIiwic2hvdWxkUmV2ZXJzZSIsIl9leHRlbmRzIiwiZGVsdGEiLCJERUxUQV9NQVhfQUJTIiwiY2xhbXBBeGlzRGVsdGEiLCJBQ0NfRkFDVE9SX01JTiIsIkFDQ19GQUNUT1JfTUFYIiwiV0hFRUxFVkVOVFNfVE9fTUVSR0UiLCJXSEVFTEVWRU5UU19UT19BTkFMQVpFIiwiY29uZmlnRGVmYXVsdHMiLCJXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQiLCJjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUiLCJpc1N0YXJ0UHVibGlzaGVkIiwic3RhcnRUaW1lIiwibGFzdEFic0RlbHRhIiwiSW5maW5pdHkiLCJheGlzVmVsb2NpdHkiLCJhY2NlbGVyYXRpb25GYWN0b3JzIiwic2Nyb2xsUG9pbnRzIiwic2Nyb2xsUG9pbnRzVG9NZXJnZSIsIndpbGxFbmRUaW1lb3V0Iiwib3B0aW9uc1BhcmFtIiwiX0V2ZW50QnVzIiwiY29uZmlnIiwiY3VycmVudEV2ZW50IiwibmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQiLCJwcmV2V2hlZWxFdmVudFN0YXRlIiwiZmVlZFdoZWVsIiwid2hlZWxFdmVudHMiLCJBcnJheSIsImlzQXJyYXkiLCJ3aGVlbEV2ZW50IiwicHJvY2Vzc1doZWVsRXZlbnREYXRhIiwidXBkYXRlT3B0aW9ucyIsIm5ld09wdGlvbnMiLCJzb21lIiwib3B0aW9uIiwiZXJyb3IiLCJwdWJsaXNoV2hlZWwiLCJhZGRpdGlvbmFsRGF0YSIsIndoZWVsRXZlbnRTdGF0ZSIsImlzU3RhcnQiLCJpc01vbWVudHVtQ2FuY2VsIiwiYXhpc01vdmVtZW50UHJvamVjdGlvbiIsInZlbG9jaXR5Iiwic2hvdWxkUHJldmVudERlZmF1bHQiLCJkZWx0YU1heEFicyIsIl9jb25maWciLCJfY2xhbXBBeGlzRGVsdGEiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0IiwiZW5kIiwiaXMiLCJtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSIsIndpbGxFbmQiLCJ1bnNoaWZ0IiwiYXhpc0RlbHRhU3VtIiwidXBkYXRlVmVsb2NpdHkiLCJkZXRlY3RNb21lbnR1bSIsInVwZGF0ZVN0YXJ0VmVsb2NpdHkiLCJkIiwibGF0ZXN0U2Nyb2xsUG9pbnQiLCJfc3RhdGUkc2Nyb2xsUG9pbnRzIiwicHJldlNjcm9sbFBvaW50IiwiZGVsdGFUaW1lIiwiYWNjZWxlcmF0aW9uRmFjdG9yIiwidiIsInVwZGF0ZVdpbGxFbmRUaW1lb3V0IiwibmV3VGltZW91dCIsImNlaWwiLCJyb3VuZCIsImFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSIsImFjY0ZhY3RvciIsInJlY29nbml6ZWRNb21lbnR1bSIsInJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMiLCJzbGljZSIsImRldGVjdGVkTW9tZW50dW0iLCJldmVyeSIsImFjY0ZhYyIsInNhbWVBY2NGYWMiLCJmMSIsImYyIiwiYm90aEFyZUluUmFuZ2VPclplcm8iLCJEYXRlIiwibm93Iiwid2lsbEVuZElkIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIl9XaGVlbFRhcmdldE9ic2VydmVyIiwiYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpTWFpbiIsInNsaWRlc1RodW1icyIsInNjcm9sbFRvSW5kZXgiLCJfIiwiaW5kZXgiLCJzY3JvbGxUbyIsInNsaWRlTm9kZSIsImFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSIsImVtYmxhQXBpVGh1bWIiLCJhcmd1bWVudHMiLCJ0b2dnbGVUaHVtYkJ0bnNTdGF0ZSIsInNlbGVjdGVkIiwic2VsZWN0ZWRTY3JvbGxTbmFwIiwic2xpZGUiLCJpc1NlbGVjdGVkIiwidG9nZ2xlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpIiwicHJldkJ0biIsIm5leHRCdG4iLCJzY3JvbGxQcmV2Iiwic2Nyb2xsTmV4dCIsInJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsImFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsInRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlIiwiZGVsYXkiLCJqdW1wIiwicGxheU9uSW5pdCIsInN0b3BPbkZvY3VzSW4iLCJzdG9wT25JbnRlcmFjdGlvbiIsInN0b3BPbk1vdXNlRW50ZXIiLCJzdG9wT25MYXN0U25hcCIsInJvb3ROb2RlIiwibm9ybWFsaXplRGVsYXkiLCJzY3JvbGxTbmFwcyIsInNjcm9sbFNuYXBMaXN0IiwiZ2V0QXV0b3BsYXlSb290Tm9kZSIsImVtYmxhUm9vdE5vZGUiLCJBdXRvcGxheSIsImRlc3Ryb3llZCIsInRpbWVyU3RhcnRUaW1lIiwidGltZXJJZCIsImF1dG9wbGF5QWN0aXZlIiwibW91c2VJc092ZXIiLCJwbGF5T25Eb2N1bWVudFZpc2libGUiLCJlbWJsYUFwaUluc3RhbmNlIiwiZXZlbnRTdG9yZSIsIm93bmVyRG9jdW1lbnQiLCJpc0RyYWdnYWJsZSIsIndhdGNoRHJhZyIsInJvb3QiLCJ2aXNpYmlsaXR5Q2hhbmdlIiwicG9pbnRlckRvd24iLCJwb2ludGVyVXAiLCJtb3VzZUVudGVyIiwibW91c2VMZWF2ZSIsInN0b3BBdXRvcGxheSIsInN0YXJ0QXV0b3BsYXkiLCJzZXRUaW1lciIsIm93bmVyV2luZG93IiwibmV4dCIsImdldFRpbWUiLCJlbWl0IiwiY2xlYXJUaW1lciIsImRvY3VtZW50SXNIaWRkZW4iLCJ2aXNpYmlsaXR5U3RhdGUiLCJwbGF5IiwianVtcE92ZXJyaWRlIiwic3RvcCIsInJlc2V0IiwiaXNQbGF5aW5nIiwibmV4dEluZGV4IiwiY2xvbmUiLCJnZXQiLCJsYXN0SW5kZXgiLCJraWxsIiwidGltZVVudGlsTmV4dCIsImN1cnJlbnREZWxheSIsInRpbWVQYXN0U2luY2VTdGFydCIsImlzTnVtYmVyIiwic3ViamVjdCIsImlzU3RyaW5nIiwiaXNCb29sZWFuIiwiaXNPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRoQWJzIiwibiIsIm1hdGhTaWduIiwic2lnbiIsImRlbHRhQWJzIiwidmFsdWVCIiwidmFsdWVBIiwiZmFjdG9yQWJzIiwiZGlmZiIsInJvdW5kVG9Ud29EZWNpbWFscyIsIm51bSIsImFycmF5S2V5cyIsIm9iamVjdEtleXMiLCJOdW1iZXIiLCJhcnJheUxhc3QiLCJhcnJheUxhc3RJbmRleCIsImFycmF5SXNMYXN0SW5kZXgiLCJhcnJheUZyb21OdW1iZXIiLCJzdGFydEF0IiwiZnJvbSIsIm9iamVjdCIsImtleXMiLCJvYmplY3RzTWVyZ2VEZWVwIiwib2JqZWN0QSIsIm9iamVjdEIiLCJtZXJnZWRPYmplY3RzIiwiY3VycmVudE9iamVjdCIsImtleSIsImFyZU9iamVjdHMiLCJpc01vdXNlRXZlbnQiLCJldnQiLCJBbGlnbm1lbnQiLCJhbGlnbiIsInZpZXdTaXplIiwicHJlZGVmaW5lZCIsImNlbnRlciIsIm1lYXN1cmUiLCJFdmVudFN0b3JlIiwibm9kZSIsImhhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImxlZ2FjeU1lZGlhUXVlcnlMaXN0IiwiYWRkTGlzdGVuZXIiLCJjbGVhciIsIkFuaW1hdGlvbnMiLCJ1cGRhdGUiLCJyZW5kZXIiLCJkb2N1bWVudFZpc2libGVIYW5kbGVyIiwiZml4ZWRUaW1lU3RlcCIsImxhc3RUaW1lU3RhbXAiLCJhY2N1bXVsYXRlZFRpbWUiLCJhbmltYXRpb25JZCIsImhpZGRlbiIsImFuaW1hdGUiLCJ0aW1lRWxhcHNlZCIsImFscGhhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJBeGlzIiwiY29udGVudERpcmVjdGlvbiIsImlzUmlnaHRUb0xlZnQiLCJpc1ZlcnRpY2FsIiwic2Nyb2xsIiwiY3Jvc3MiLCJzdGFydEVkZ2UiLCJnZXRTdGFydEVkZ2UiLCJlbmRFZGdlIiwiZ2V0RW5kRWRnZSIsIm1lYXN1cmVTaXplIiwibm9kZVJlY3QiLCJkaXJlY3Rpb24iLCJMaW1pdCIsInJlYWNoZWRNaW4iLCJyZWFjaGVkTWF4IiwicmVhY2hlZEFueSIsImNvbnN0cmFpbiIsInJlbW92ZU9mZnNldCIsIkNvdW50ZXIiLCJsb29wIiwibG9vcEVuZCIsImNvdW50ZXIiLCJ3aXRoaW5MaW1pdCIsInNldCIsIkRyYWdIYW5kbGVyIiwiZHJhZ1RyYWNrZXIiLCJsb2NhdGlvbiIsImFuaW1hdGlvbiIsInNjcm9sbEJvZHkiLCJzY3JvbGxUYXJnZXQiLCJldmVudEhhbmRsZXIiLCJwZXJjZW50T2ZWaWV3IiwiZHJhZ1RocmVzaG9sZCIsImJhc2VGcmljdGlvbiIsImNyb3NzQXhpcyIsImZvY3VzTm9kZXMiLCJub25QYXNzaXZlRXZlbnQiLCJpbml0RXZlbnRzIiwiZHJhZ0V2ZW50cyIsImdvVG9OZXh0VGhyZXNob2xkIiwic25hcEZvcmNlQm9vc3QiLCJtb3VzZSIsInRvdWNoIiwiZnJlZUZvcmNlQm9vc3QiLCJiYXNlU3BlZWQiLCJpc01vdmluZyIsInN0YXJ0U2Nyb2xsIiwic3RhcnRDcm9zcyIsInBvaW50ZXJJc0Rvd24iLCJwcmV2ZW50U2Nyb2xsIiwicHJldmVudENsaWNrIiwiaXNNb3VzZSIsImRvd25JZkFsbG93ZWQiLCJkb3duIiwidXAiLCJjbGljayIsImFkZERyYWdFdmVudHMiLCJtb3ZlIiwiaXNGb2N1c05vZGUiLCJub2RlTmFtZSIsImluY2x1ZGVzIiwiZm9yY2VCb29zdCIsImJvb3N0IiwiYWxsb3dlZEZvcmNlIiwiZm9yY2UiLCJ0YXJnZXRDaGFuZ2VkIiwiYmFzZUZvcmNlIiwiYnlEaXN0YW5jZSIsImRpc3RhbmNlIiwiYnlJbmRleCIsImlzTW91c2VFdnQiLCJidXR0b25zIiwidXNlRnJpY3Rpb24iLCJ1c2VEdXJhdGlvbiIsInJlYWRQb2ludCIsImlzVG91Y2hFdnQiLCJ0b3VjaGVzIiwibGFzdFNjcm9sbCIsImxhc3RDcm9zcyIsImRpZmZTY3JvbGwiLCJkaWZmQ3Jvc3MiLCJwb2ludGVyTW92ZSIsImN1cnJlbnRMb2NhdGlvbiIsInJhd0ZvcmNlIiwiZm9yY2VGYWN0b3IiLCJzcGVlZCIsImZyaWN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRHJhZ1RyYWNrZXIiLCJsb2dJbnRlcnZhbCIsImxhc3RFdmVudCIsInJlYWRUaW1lIiwiZXZ0QXhpcyIsInByb3BlcnR5IiwiY29vcmQiLCJleHBpcmVkIiwiZGlmZkRyYWciLCJkaWZmVGltZSIsImlzRmxpY2siLCJOb2RlUmVjdHMiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJQZXJjZW50T2ZWaWV3IiwiUmVzaXplSGFuZGxlciIsImNvbnRhaW5lciIsInNsaWRlcyIsIndhdGNoUmVzaXplIiwibm9kZVJlY3RzIiwib2JzZXJ2ZU5vZGVzIiwicmVzaXplT2JzZXJ2ZXIiLCJjb250YWluZXJTaXplIiwic2xpZGVTaXplcyIsInJlYWRTaXplIiwiZGVmYXVsdENhbGxiYWNrIiwiZW50cmllcyIsImVudHJ5IiwiaXNDb250YWluZXIiLCJzbGlkZUluZGV4IiwiaW5kZXhPZiIsImxhc3RTaXplIiwibmV3U2l6ZSIsImRpZmZTaXplIiwicmVJbml0IiwiUmVzaXplT2JzZXJ2ZXIiLCJTY3JvbGxCb2R5Iiwib2Zmc2V0TG9jYXRpb24iLCJwcmV2aW91c0xvY2F0aW9uIiwiYmFzZUR1cmF0aW9uIiwic2Nyb2xsVmVsb2NpdHkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxEdXJhdGlvbiIsInNjcm9sbEZyaWN0aW9uIiwicmF3TG9jYXRpb24iLCJyYXdMb2NhdGlvblByZXZpb3VzIiwic2VlayIsImRpc3BsYWNlbWVudCIsImlzSW5zdGFudCIsInNjcm9sbERpc3RhbmNlIiwic2V0dGxlZCIsImR1cmF0aW9uIiwidXNlQmFzZUR1cmF0aW9uIiwidXNlQmFzZUZyaWN0aW9uIiwiU2Nyb2xsQm91bmRzIiwibGltaXQiLCJwdWxsQmFja1RocmVzaG9sZCIsImVkZ2VPZmZzZXRUb2xlcmFuY2UiLCJmcmljdGlvbkxpbWl0IiwiZGlzYWJsZWQiLCJzaG91bGRDb25zdHJhaW4iLCJlZGdlIiwiZGlmZlRvRWRnZSIsImRpZmZUb1RhcmdldCIsInN1YnRyYWN0IiwidG9nZ2xlQWN0aXZlIiwiU2Nyb2xsQ29udGFpbiIsImNvbnRlbnRTaXplIiwic25hcHNBbGlnbmVkIiwiY29udGFpblNjcm9sbCIsInBpeGVsVG9sZXJhbmNlIiwic2Nyb2xsQm91bmRzIiwic25hcHNCb3VuZGVkIiwibWVhc3VyZUJvdW5kZWQiLCJzY3JvbGxDb250YWluTGltaXQiLCJmaW5kU2Nyb2xsQ29udGFpbkxpbWl0Iiwic25hcHNDb250YWluZWQiLCJtZWFzdXJlQ29udGFpbmVkIiwidXNlUGl4ZWxUb2xlcmFuY2UiLCJib3VuZCIsInNuYXAiLCJzdGFydFNuYXAiLCJlbmRTbmFwIiwibGFzdEluZGV4T2YiLCJzbmFwQWxpZ25lZCIsImlzRmlyc3QiLCJpc0xhc3QiLCJzY3JvbGxCb3VuZCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiU2Nyb2xsTGltaXQiLCJTY3JvbGxMb29wZXIiLCJ2ZWN0b3JzIiwiam9pbnRTYWZldHkiLCJzaG91bGRMb29wIiwibG9vcERpc3RhbmNlIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJTY3JvbGxTbmFwcyIsImFsaWdubWVudCIsInNsaWRlUmVjdHMiLCJzbGlkZXNUb1Njcm9sbCIsImdyb3VwU2xpZGVzIiwiYWxpZ25tZW50cyIsIm1lYXN1cmVTaXplcyIsInNuYXBzIiwibWVhc3VyZVVuYWxpZ25lZCIsIm1lYXN1cmVBbGlnbmVkIiwicmVjdHMiLCJyZWN0IiwiZyIsIlNsaWRlUmVnaXN0cnkiLCJjb250YWluU25hcHMiLCJzbGlkZUluZGV4ZXMiLCJzbGlkZVJlZ2lzdHJ5IiwiY3JlYXRlU2xpZGVSZWdpc3RyeSIsImdyb3VwZWRTbGlkZUluZGV4ZXMiLCJkb05vdENvbnRhaW4iLCJncm91cCIsImdyb3VwcyIsInJhbmdlIiwiU2Nyb2xsVGFyZ2V0IiwidGFyZ2V0VmVjdG9yIiwibWluRGlzdGFuY2UiLCJkaXN0YW5jZXMiLCJzb3J0IiwiZmluZFRhcmdldFNuYXAiLCJhc2NEaWZmc1RvU25hcHMiLCJzaG9ydGN1dCIsImQxIiwiZDIiLCJtYXRjaGluZ1RhcmdldHMiLCJkaWZmVG9TbmFwIiwidGFyZ2V0U25hcERpc3RhbmNlIiwicmVhY2hlZEJvdW5kIiwic25hcERpc3RhbmNlIiwiU2Nyb2xsVG8iLCJpbmRleEN1cnJlbnQiLCJpbmRleFByZXZpb3VzIiwiZGlzdGFuY2VEaWZmIiwiaW5kZXhEaWZmIiwidGFyZ2V0SW5kZXgiLCJTbGlkZUZvY3VzIiwid2F0Y2hGb2N1cyIsImZvY3VzTGlzdGVuZXJPcHRpb25zIiwiY2FwdHVyZSIsImxhc3RUYWJQcmVzc1RpbWUiLCJub3dUaW1lIiwic2Nyb2xsTGVmdCIsImZpbmRJbmRleCIsInJlZ2lzdGVyVGFiUHJlc3MiLCJjb2RlIiwiVmVjdG9yMUQiLCJpbml0aWFsVmFsdWUiLCJub3JtYWxpemVJbnB1dCIsIlRyYW5zbGF0ZSIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiY29udGFpbmVyU3R5bGUiLCJzdHlsZSIsInByZXZpb3VzVGFyZ2V0IiwidG8iLCJuZXdUYXJnZXQiLCJ0cmFuc2Zvcm0iLCJnZXRBdHRyaWJ1dGUiLCJTbGlkZUxvb3BlciIsInNsaWRlU2l6ZXNXaXRoR2FwcyIsInJvdW5kaW5nU2FmZXR5IiwiYXNjSXRlbXMiLCJkZXNjSXRlbXMiLCJyZXZlcnNlIiwibG9vcFBvaW50cyIsInN0YXJ0UG9pbnRzIiwiZW5kUG9pbnRzIiwicmVtb3ZlU2xpZGVTaXplcyIsImluZGV4ZXMiLCJzbGlkZXNJbkdhcCIsImdhcCIsInJlbWFpbmluZ0dhcCIsImZpbmRTbGlkZUJvdW5kcyIsImZpbmRMb29wUG9pbnRzIiwiaXNFbmRFZGdlIiwic2xpZGVCb3VuZHMiLCJpbml0aWFsIiwiYWx0ZXJlZCIsImJvdW5kRWRnZSIsImxvb3BQb2ludCIsInNsaWRlTG9jYXRpb24iLCJjYW5Mb29wIiwiX3JlZiIsIm90aGVySW5kZXhlcyIsInNoaWZ0TG9jYXRpb24iLCJTbGlkZXNIYW5kbGVyIiwid2F0Y2hTbGlkZXMiLCJtdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwibXV0YXRpb24iLCJNdXRhdGlvbk9ic2VydmVyIiwiY2hpbGRMaXN0IiwiU2xpZGVzSW5WaWV3IiwidGhyZXNob2xkIiwiaW50ZXJzZWN0aW9uRW50cnlNYXAiLCJpblZpZXdDYWNoZSIsIm5vdEluVmlld0NhY2hlIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsInBhcmVudEVsZW1lbnQiLCJjcmVhdGVJblZpZXdMaXN0IiwiaW5WaWV3IiwibGlzdCIsInBhcnNlSW50IiwiaXNJbnRlcnNlY3RpbmciLCJpblZpZXdNYXRjaCIsIm5vdEluVmlld01hdGNoIiwiU2xpZGVTaXplcyIsInJlYWRFZGdlR2FwIiwid2l0aEVkZ2VHYXAiLCJzdGFydEdhcCIsIm1lYXN1cmVTdGFydEdhcCIsImVuZEdhcCIsIm1lYXN1cmVFbmRHYXAiLCJtZWFzdXJlV2l0aEdhcHMiLCJzbGlkZVJlY3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIlNsaWRlc1RvU2Nyb2xsIiwiZ3JvdXBCeU51bWJlciIsImJ5TnVtYmVyIiwiZ3JvdXBTaXplIiwiYnlTaXplIiwicmVjdEIiLCJyZWN0QSIsImVkZ2VBIiwiZWRnZUIiLCJnYXBBIiwiZ2FwQiIsImNodW5rU2l6ZSIsImN1cnJlbnRTaXplIiwicHJldmlvdXNTaXplIiwiRW5naW5lIiwic2Nyb2xsQXhpcyIsInN0YXJ0SW5kZXgiLCJpblZpZXdUaHJlc2hvbGQiLCJfcmVmMiIsImRyYWdIYW5kbGVyIiwiX3JlZjMiLCJzY3JvbGxMb29wZXIiLCJzbGlkZUxvb3BlciIsInNob3VsZFNldHRsZSIsIndpdGhpbkJvdW5kcyIsImhhc1NldHRsZWQiLCJoYXNTZXR0bGVkQW5kSWRsZSIsImludGVycG9sYXRlZExvY2F0aW9uIiwic3RhcnRMb2NhdGlvbiIsInNsaWRlc0luVmlldyIsInNsaWRlRm9jdXMiLCJyZXNpemVIYW5kbGVyIiwic2xpZGVzSGFuZGxlciIsIkV2ZW50SGFuZGxlciIsImFwaSIsImdldExpc3RlbmVycyIsImNiIiwiT3B0aW9uc0hhbmRsZXIiLCJvcHRpb25zQSIsIm9wdGlvbnNCIiwibWF0Y2hlZE1lZGlhT3B0aW9ucyIsIm1lZGlhIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtZWRpYU9wdGlvbiIsIm9wdGlvbnNNZWRpYVF1ZXJpZXMiLCJvcHRpb25zTGlzdCIsImFjYyIsIm1lZGlhUXVlcmllcyIsIlBsdWdpbnNIYW5kbGVyIiwiYWN0aXZlUGx1Z2lucyIsInBsdWdpbnMiLCJfcmVmNCIsInBsdWdpbiIsImFzc2lnbiIsIkVtYmxhQ2Fyb3VzZWwiLCJ1c2VyUGx1Z2lucyIsImRlZmF1bHRWaWV3IiwicGx1Z2luc0hhbmRsZXIiLCJtZWRpYUhhbmRsZXJzIiwicmVBY3RpdmF0ZSIsInBsdWdpbkxpc3QiLCJwbHVnaW5BcGlzIiwic3RvcmVFbGVtZW50cyIsInVzZXJDb250YWluZXIiLCJ1c2VyU2xpZGVzIiwiY3VzdG9tQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiY3VzdG9tU2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZUVuZ2luZSIsIm9wdGlvbnNXaXRob3V0TG9vcCIsImFjdGl2YXRlIiwid2l0aE9wdGlvbnMiLCJ3aXRoUGx1Z2lucyIsIl9yZWY1IiwicXVlcnkiLCJvZmZzZXRQYXJlbnQiLCJkZUFjdGl2YXRlIiwicHJldiIsInByZXZpb3VzU2Nyb2xsU25hcCIsInNsaWRlc05vdEluVmlldyIsInNsaWRlTm9kZXMiLCJZVER5bmFtaWNzR2FsbGVyeSIsImRhdGFzZXQiLCJybUdhbGxlcnlSZWFkeSIsIm9yaWVudGF0aW9uIiwibW9iaWxlT3JpZW50YXRpb24iLCJtb2JpbGVBeGlzIiwidGh1bWJBeGlzIiwibW9iaWxlVGh1bWJBeGlzIiwidGh1bWJNb2JpbGVBeGlzIiwibmF2TW9kZSIsIm5hdiIsImRyYWciLCJhdXRvcGxheSIsImF1dG9wbGF5RGVsYXkiLCJhdXRvcGxheVBhdXNlIiwib3B0aW9uc1RodW1icyIsInZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCIsInZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwiLCJwcmV2VGh1bWJCdG5Ob2RlIiwibmV4dFRodW1iQnRuTm9kZSIsInByZXZNYWluQnRuTm9kZSIsIm5leHRNYWluQnRuTm9kZSIsImVtYmxhTWFpbiIsImNsZWFudXBzIiwiZW1ibGFUaHVtYiIsInN5bmNTbGlkZXMiLCJjb250cm9sIiwicm1HYWxsZXJ5VGFiaW5kZXgiLCJuYXZOb2RlcyIsInJtR2FsbGVyeURlc3Ryb3kiLCJnYWxsZXJ5VGV4dCIsImxhbmciLCJ0b0xvd2VyQ2FzZSIsInN0YXJ0c1dpdGgiLCJpbWFnZSIsIm9wZW4iLCJwcm9kdWN0U2xpZGUiLCJ0b3RhbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbWFnZVdyYXAiLCJzcmMiLCJhbHQiLCJsb2FkaW5nIiwiaW1hZ2VMb2FkaW5nIiwiYXBwZW5kIiwibGlnaHRib3giLCJsaW5rIiwiaHJlZiIsInJtTGlnaHRib3giLCJsaWdodGJveENhcHRpb24iLCJjYXB0aW9uIiwiaWNvbiIsInByb2R1Y3RUaHVtYiIsImFuY2hvckNsYXNzIiwiaXRlbSIsIndyYXAiLCJ1cGRhdGVQcm9kdWN0R2FsbGVyeSIsInJtUHJvZHVjdEdhbGxlcnkiLCJ0aHVtYnMiLCJ0aHVtYkFuY2hvckNsYXNzIiwiVUlraXQiLCJnZXRDb21wb25lbnQiLCIkZGVzdHJveSIsInJlcGxhY2VDaGlsZHJlbiIsImluaXRHYWxsZXJpZXMiLCJlbGVtZW50IiwiZGVzdHJveUdhbGxlcmllcyIsIm9ic2VydmVHYWxsZXJpZXMiLCJzY29wZSIsInByb2R1Y3QiLCJkZXRhaWwiLCJnYWxsZXJ5IiwiY2xvc2VzdCIsInJlY29yZHMiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwic3VidHJlZSIsInJlYWR5U3RhdGUiLCJvbmNlIl0sInNvdXJjZVJvb3QiOiIifQ==