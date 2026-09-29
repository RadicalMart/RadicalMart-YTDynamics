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
    const thumbAxis = container.dataset.thumbAxis === 'y' ? 'y' : 'x';
    const navMode = ['thumbnav', 'dotnav'].includes(container.dataset.nav) ? container.dataset.nav : '';
    const loop = container.dataset.loop !== 'false';
    const watchDrag = container.dataset.drag !== 'false';
    const duration = Math.max(10, Math.min(60, Number(container.dataset.duration) || 30));
    const autoplay = container.dataset.autoplay === 'true';
    const autoplayDelay = Math.max(3000, Math.min(20000, Number(container.dataset.autoplayDelay) || 7000));
    const autoplayPause = container.dataset.autoplayPause !== 'false';
    const mobileAxis = orientation === 'vertical' ? {
      '(max-width: 639px)': {
        axis: 'x'
      }
    } : {};
    const mobileThumbAxis = thumbAxis === 'y' ? {
      '(max-width: 639px)': {
        axis: 'x'
      }
    } : {};
    const options = {
      axis,
      loop,
      watchDrag,
      duration,
      breakpoints: mobileAxis
    };
    const optionsThumbs = {
      align: 'start',
      axis: thumbAxis,
      dragFree: true,
      loop: false,
      breakpoints: mobileThumbAxis
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
    emblaMain.on('destroy', () => {
      cleanups.forEach(cleanup => cleanup());
      emblaThumb?.destroy();
      delete container.dataset.rmGalleryReady;
    });
  }
}
const initGalleries = function () {
  let root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (root.matches?.('.rmslideshow')) {
    new YTDynamicsGallery().init(root);
  }
  root.querySelectorAll?.('.rmslideshow').forEach(element => {
    new YTDynamicsGallery().init(element);
  });
};
const observeGalleries = () => {
  initGalleries();
  new MutationObserver(records => {
    records.forEach(_ref => {
      let {
        addedNodes
      } = _ref;
      addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          initGalleries(node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLEVBQUU7VUFDckNQLGFBQWEsQ0FBQ2pjLElBQUksQ0FBQztRQUN2QjtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQyxDQUFDMVcsT0FBTyxDQUFDdUIsUUFBUSxDQUFDQyxlQUFlLEVBQUU7SUFBQzRvQixTQUFTLEVBQUUsSUFBSTtJQUFFK0ksT0FBTyxFQUFFO0VBQUksQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxJQUFJNXhCLFFBQVEsQ0FBQzZ4QixVQUFVLEtBQUssU0FBUyxFQUFFO0VBQ25DN3hCLFFBQVEsQ0FBQ0UsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVveEIsZ0JBQWdCLEVBQUU7SUFBQ1EsSUFBSSxFQUFFO0VBQUksQ0FBQyxDQUFDO0FBQ2pGLENBQUMsTUFBTTtFQUNIUixnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL1doZWVsR2VzdHVyZXNQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy91dGlscy9wcm9qZWN0aW9uLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvRXZlbnRCdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL29wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy93aGVlbC1nZXN0dXJlcy9zdGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL3doZWVsLWdlc3R1cmVzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9idXR0b25zLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvZ2FsbGVyeS5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy91dGlscy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXV0b3BsYXkudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9nYWxsZXJ5LmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVhdGVPcHRpb25zVHlwZSwgQ3JlYXRlUGx1Z2luVHlwZSwgRW1ibGFDYXJvdXNlbFR5cGUsIE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsJ1xuaW1wb3J0IFdoZWVsR2VzdHVyZXMsIHsgV2hlZWxFdmVudFN0YXRlIH0gZnJvbSAnd2hlZWwtZ2VzdHVyZXMnXG5cbmV4cG9ydCB0eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICB3aGVlbERyYWdnaW5nQ2xhc3M6IHN0cmluZ1xuICBmb3JjZVdoZWVsQXhpcz86ICd4JyB8ICd5J1xuICB0YXJnZXQ/OiBFbGVtZW50XG59PlxuXG50eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnM+XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IHtcbiAgYWN0aXZlOiB0cnVlLFxuICBicmVha3BvaW50czoge30sXG4gIHdoZWVsRHJhZ2dpbmdDbGFzczogJ2lzLXdoZWVsLWRyYWdnaW5nJyxcbiAgZm9yY2VXaGVlbEF4aXM6IHVuZGVmaW5lZCxcbiAgdGFyZ2V0OiB1bmRlZmluZWQsXG59XG5cbldoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZCBhcyBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddIHwgdW5kZWZpbmVkXG5cbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzUGx1Z2luKHVzZXJPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddID0ge30pOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSB7XG4gIGxldCBvcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9uc1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHt9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYTogRW1ibGFDYXJvdXNlbFR5cGUsIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGUpIHtcbiAgICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEgfSA9IG9wdGlvbnNIYW5kbGVyXG4gICAgY29uc3Qgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIFdoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGNvbnN0IGVuZ2luZSA9IGVtYmxhLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0YXJnZXROb2RlID0gb3B0aW9ucy50YXJnZXQgPz8gKGVtYmxhLmNvbnRhaW5lck5vZGUoKS5wYXJlbnROb2RlIGFzIEVsZW1lbnQpXG4gICAgY29uc3Qgd2hlZWxBeGlzID0gb3B0aW9ucy5mb3JjZVdoZWVsQXhpcyA/PyBlbmdpbmUub3B0aW9ucy5heGlzXG4gICAgY29uc3Qgd2hlZWxHZXN0dXJlcyA9IFdoZWVsR2VzdHVyZXMoe1xuICAgICAgcHJldmVudFdoZWVsQWN0aW9uOiB3aGVlbEF4aXMsXG4gICAgICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKSB7XG4gICAgICBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9ICh3aGVlbEF4aXMgPT09ICd4JyA/IGVuZ2luZS5jb250YWluZXJSZWN0LndpZHRoIDogZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0KSAvIDJcbiAgICB9XG5cbiAgICBjb25zdCB1bm9ic2VydmVUYXJnZXROb2RlID0gd2hlZWxHZXN0dXJlcy5vYnNlcnZlKHRhcmdldE5vZGUpXG4gICAgY29uc3Qgb2ZmV2hlZWwgPSB3aGVlbEdlc3R1cmVzLm9uKCd3aGVlbCcsIGhhbmRsZVdoZWVsKVxuXG4gICAgbGV0IGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgbGV0IHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnRcbiAgICBsZXQgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uID0gMFxuICAgIGxldCBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9IDBcbiAgICBsZXQgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSBmYWxzZVxuXG4gICAgdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKVxuICAgIGVtYmxhLm9uKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhcnRFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nLCBzdGF0ZS5ldmVudClcbiAgICAgICAgZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBMZWdhY3kgQnJvd3NlcnMgbGlrZSBJRSAxMCAmIDExIHdpbGwgdGhyb3cgd2hlbiBhdHRlbXB0aW5nIHRvIGNyZWF0ZSB0aGUgRXZlbnRcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnTGVnYWN5IGJyb3dzZXIgcmVxdWlyZXMgZXZlbnRzLXBvbHlmaWxsIChodHRwczovL2dpdGh1Yi5jb20veGllbC9lbWJsYS1jYXJvdXNlbC13aGVlbC1nZXN0dXJlcyNsZWdhY3ktYnJvd3NlcnMpJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xlYW51cCgpXG4gICAgICB9XG5cbiAgICAgIGlzU3RhcnRlZCA9IHRydWVcbiAgICAgIG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA9IDBcbiAgICAgIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QuYWRkKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZUVuZGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2V1cCcsIHN0YXRlKSlcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgICAgaWYgKGlzU3RhcnRlZCAmJiBlLmlzVHJ1c3RlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KHR5cGU6ICdtb3VzZWRvd24nIHwgJ21vdXNlbW92ZScgfCAnbW91c2V1cCcsIHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGxldCBtb3ZlWCwgbW92ZVlcblxuICAgICAgaWYgKHdoZWVsQXhpcyA9PT0gZW5naW5lLm9wdGlvbnMuYXhpcykge1xuICAgICAgICA7W21vdmVYLCBtb3ZlWV0gPSBzdGF0ZS5heGlzTW92ZW1lbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGVtYmxhcyBheGlzIGFuZCB0aGUgd2hlZWxBeGlzIGRvbid0IG1hdGNoLCBzd2FwIHRoZSBheGVzIHRvIG1hdGNoIHRoZSByaWdodCBlbWJsYSBldmVudHNcbiAgICAgICAgO1ttb3ZlWSwgbW92ZVhdID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgaXNBdEJvdW5kYXJ5IH0gPSBjaGVja0lmQXRCb3VuZGFyeShzdGF0ZSlcblxuICAgICAgLy8gQXBwbHkgcHJvZ3Jlc3NpdmUgcnViYmVyIGJhbmQgZGFtcGluZyB3aGVuIGF0IGJvdW5kYXJpZXNcbiAgICAgIGlmIChpc0F0Qm91bmRhcnkpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2dyZXNzaXZlIGRhbXBpbmcgZmFjdG9yIGJhc2VkIG9uIGhvdyBmYXIgb3ZlciBib3VuZGFyeSB3ZSBhcmVcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NSYXRpbyA9IE1hdGgubWluKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAvIHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkLCAxKVxuICAgICAgICBjb25zdCBkYW1waW5nRmFjdG9yID0gMC4yNSArIHByb2dyZXNzUmF0aW8gKiAwLjVcbiAgICAgICAgY29uc3QgY291bnRlck1vdmVTaWduID0gbW92ZVggPiAwID8gLTEgOiAxXG4gICAgICAgIGNvbnN0IGNvdW50ZXJNb3ZlbWVudCA9IG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAqIGNvdW50ZXJNb3ZlU2lnblxuICAgICAgICBjb25zdCBkYW1waW5nTW92ZW1lbnQgPSBjb3VudGVyTW92ZW1lbnQgKiBkYW1waW5nRmFjdG9yXG5cbiAgICAgICAgbW92ZVggKz0gZGFtcGluZ01vdmVtZW50XG4gICAgICAgIG1vdmVZICs9IGRhbXBpbmdNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IHNraXBwaW5nIHNsaWRlc1xuICAgICAgaWYgKCFlbmdpbmUub3B0aW9ucy5za2lwU25hcHMgJiYgIWVuZ2luZS5vcHRpb25zLmRyYWdGcmVlKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aFxuICAgICAgICBjb25zdCBtYXhZID0gZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0XG5cbiAgICAgICAgbW92ZVggPSBtb3ZlWCA8IDAgPyBNYXRoLm1heChtb3ZlWCwgLW1heFgpIDogTWF0aC5taW4obW92ZVgsIG1heFgpXG4gICAgICAgIG1vdmVZID0gbW92ZVkgPCAwID8gTWF0aC5tYXgobW92ZVksIC1tYXhZKSA6IE1hdGgubWluKG1vdmVZLCBtYXhZKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICBjbGllbnRYOiBzdGFydEV2ZW50LmNsaWVudFggKyBtb3ZlWCxcbiAgICAgICAgY2xpZW50WTogc3RhcnRFdmVudC5jbGllbnRZICsgbW92ZVksXG4gICAgICAgIHNjcmVlblg6IHN0YXJ0RXZlbnQuc2NyZWVuWCArIG1vdmVYLFxuICAgICAgICBzY3JlZW5ZOiBzdGFydEV2ZW50LnNjcmVlblkgKyBtb3ZlWSxcbiAgICAgICAgbW92ZW1lbnRYOiBtb3ZlWCxcbiAgICAgICAgbW92ZW1lbnRZOiBtb3ZlWSxcbiAgICAgICAgYnV0dG9uOiAwLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudDogVUlFdmVudCkge1xuICAgICAgZW1ibGEuY29udGFpbmVyTm9kZSgpLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBheGlzRGVsdGE6IFtkZWx0YVgsIGRlbHRhWV0sXG4gICAgICB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gZW1ibGEuc2Nyb2xsUHJvZ3Jlc3MoKVxuICAgICAgY29uc3QgY2FuU2Nyb2xsTmV4dCA9IHNjcm9sbFByb2dyZXNzIDwgMVxuICAgICAgY29uc3QgY2FuU2Nyb2xsUHJldiA9IHNjcm9sbFByb2dyZXNzID4gMFxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YSA9IHdoZWVsQXhpcyA9PT0gJ3gnID8gZGVsdGFYIDogZGVsdGFZXG4gICAgICBjb25zdCBpc1Njcm9sbGluZ05leHQgPSBwcmltYXJ5QXhpc0RlbHRhIDwgMFxuICAgICAgY29uc3QgaXNTY3JvbGxpbmdQcmV2ID0gcHJpbWFyeUF4aXNEZWx0YSA+IDBcbiAgICAgIGNvbnN0IGlzQXRCb3VuZGFyeSA9IChpc1Njcm9sbGluZ05leHQgJiYgIWNhblNjcm9sbE5leHQpIHx8IChpc1Njcm9sbGluZ1ByZXYgJiYgIWNhblNjcm9sbFByZXYpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzQXRCb3VuZGFyeSxcbiAgICAgICAgcHJpbWFyeUF4aXNEZWx0YSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBjb25zdCB7IGlzQXRCb3VuZGFyeSwgcHJpbWFyeUF4aXNEZWx0YSB9ID0gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGUpXG5cbiAgICAgIGlmIChpc0F0Qm91bmRhcnkgJiYgIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgICAgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uICs9IE1hdGguYWJzKHByaW1hcnlBeGlzRGVsdGEpXG5cbiAgICAgICAgLy8gRW5kIGdlc3R1cmUgaWYgd2UgZXhjZWVkIHRoZSB0aHJlc2hvbGRcbiAgICAgICAgaWYgKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA+IHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkKSB7XG4gICAgICAgICAgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSB0cnVlXG4gICAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWNjdW11bGF0aW9uIHdoZW4gd2UgY2FuIHNjcm9sbCBvciB3aGVuIG5vdCBhdCBib3VuZGFyeVxuICAgICAgICBvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVldLFxuICAgICAgfSA9IHN0YXRlXG4gICAgICBjb25zdCBwcmltYXJ5QXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVggOiBkZWx0YVlcbiAgICAgIGNvbnN0IGNyb3NzQXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVkgOiBkZWx0YVhcbiAgICAgIGNvbnN0IGlzUmVsZWFzZSA9IHN0YXRlLmlzTW9tZW50dW0gJiYgc3RhdGUucHJldmlvdXMgJiYgIXN0YXRlLnByZXZpb3VzLmlzTW9tZW50dW1cbiAgICAgIGNvbnN0IGlzRW5kaW5nT3JSZWxlYXNlID0gKHN0YXRlLmlzRW5kaW5nICYmICFzdGF0ZS5pc01vbWVudHVtKSB8fCBpc1JlbGVhc2VcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ID0gTWF0aC5hYnMocHJpbWFyeUF4aXNEZWx0YSkgPiBNYXRoLmFicyhjcm9zc0F4aXNEZWx0YSlcblxuICAgICAgaWYgKHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ICYmICFpc1N0YXJ0ZWQgJiYgIXN0YXRlLmlzTW9tZW50dW0gJiYgIWJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kKSB7XG4gICAgICAgIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGUpXG4gICAgICB9XG5cbiAgICAgIGlmIChibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCAmJiBzdGF0ZS5pc0VuZGluZykge1xuICAgICAgICBibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdGFydGVkKSByZXR1cm5cblxuICAgICAgaWYgKGlzQm91bmRhcnlUaHJlc2hvbGRSZWFjaGVkKHN0YXRlKSkgcmV0dXJuXG5cbiAgICAgIGlmIChpc0VuZGluZ09yUmVsZWFzZSkge1xuICAgICAgICB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQoY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KCdtb3VzZW1vdmUnLCBzdGF0ZSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgIHVub2JzZXJ2ZVRhcmdldE5vZGUoKVxuICAgICAgb2ZmV2hlZWwoKVxuICAgICAgZW1ibGEub2ZmKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0ge1xuICAgIG5hbWU6ICd3aGVlbEdlc3R1cmVzJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3k6ICgpID0+IGNsZWFudXAoKSxcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG1vZHVsZSAnZW1ibGEtY2Fyb3VzZWwnIHtcbiAgaW50ZXJmYWNlIEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHdoZWVsR2VzdHVyZXM/OiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVxuICB9XG59XG4iLCJjb25zdCBERUNBWSA9IDAuOTk2XG5cbi8qKlxuICogbW92ZW1lbnQgcHJvamVjdGlvbiBiYXNlZCBvbiB2ZWxvY2l0eVxuICogQHBhcmFtIHZlbG9jaXR5UHhNc1xuICogQHBhcmFtIGRlY2F5XG4gKi9cbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uID0gKHZlbG9jaXR5UHhNczogbnVtYmVyLCBkZWNheSA9IERFQ0FZKSA9PiAodmVsb2NpdHlQeE1zICogZGVjYXkpIC8gKDEgLSBkZWNheSlcbiIsImV4cG9ydCAqIGZyb20gJy4vcHJvamVjdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RPZjxUPihhcnJheTogVFtdKSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXZlcmFnZShudW1iZXJzOiBudW1iZXJbXSkge1xuICByZXR1cm4gbnVtYmVycy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIG51bWJlcnMubGVuZ3RoXG59XG5cbmV4cG9ydCBjb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgubWluKE1hdGgubWF4KG1pbiwgdmFsdWUpLCBtYXgpXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRWZWN0b3JzPFQgZXh0ZW5kcyBudW1iZXJbXT4odjE6IFQsIHYyOiBUKTogVCB7XG4gIGlmICh2MS5sZW5ndGggIT09IHYyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndmVjdG9ycyBtdXN0IGJlIHNhbWUgbGVuZ3RoJylcbiAgfVxuICByZXR1cm4gdjEubWFwKCh2YWwsIGkpID0+IHZhbCArIHYyW2ldKSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXgobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIE1hdGgubWF4KC4uLm51bWJlcnMubWFwKE1hdGguYWJzKSlcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRnJlZXplPFQgZXh0ZW5kcyBvYmplY3Q+KG86IFQpOiBSZWFkb25seTxUPiB7XG4gIE9iamVjdC5mcmVlemUobylcbiAgT2JqZWN0LnZhbHVlcyhvKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4odmFsdWUpKSB7XG4gICAgICBkZWVwRnJlZXplKHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG9cbn1cbiIsImltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IHR5cGUgRXZlbnRNYXBFbXB0eSA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyPEQgPSB1bmtub3duPiA9IChkYXRhOiBEKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBPZmYgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50QnVzPEV2ZW50TWFwID0gRXZlbnRNYXBFbXB0eT4oKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IHt9IGFzIFJlY29yZDxrZXlvZiBFdmVudE1hcCwgRXZlbnRMaXN0ZW5lcjxuZXZlcj5bXT5cblxuICBmdW5jdGlvbiBvbjxFSyBleHRlbmRzIGtleW9mIEV2ZW50TWFwPih0eXBlOiBFSywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPik6IE9mZiB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuY29uY2F0KGxpc3RlbmVyKVxuICAgIHJldHVybiAoKSA9PiBvZmYodHlwZSwgbGlzdGVuZXIpXG4gIH1cblxuICBmdW5jdGlvbiBvZmY8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pIHtcbiAgICBsaXN0ZW5lcnNbdHlwZV0gPSAobGlzdGVuZXJzW3R5cGVdIHx8IFtdKS5maWx0ZXIoKGwpID0+IGwgIT09IGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2g8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGRhdGE6IEV2ZW50TWFwW0VLXSkge1xuICAgIGlmICghKHR5cGUgaW4gbGlzdGVuZXJzKSkgcmV0dXJuXG4gICAgOyhsaXN0ZW5lcnNbdHlwZV0gYXMgRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+W10pLmZvckVhY2goKGwpID0+IGwoZGF0YSkpXG4gIH1cblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGRpc3BhdGNoLFxuICB9KVxufVxuIiwiaW1wb3J0IHsgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxudHlwZSBVbm9ic2VydmVUYXJnZXQgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbFRhcmdldE9ic2VydmVyKGV2ZW50TGlzdGVuZXI6ICh3aGVlbEV2ZW50OiBXaGVlbEV2ZW50RGF0YSkgPT4gdm9pZCkge1xuICBsZXQgdGFyZ2V0czogRXZlbnRUYXJnZXRbXSA9IFtdXG5cbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IG9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCk6IFVub2JzZXJ2ZVRhcmdldCA9PiB7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyLCB7IHBhc3NpdmU6IGZhbHNlIH0pXG4gICAgdGFyZ2V0cy5wdXNoKHRhcmdldClcblxuICAgIHJldHVybiAoKSA9PiB1bm9ic2VydmUodGFyZ2V0KVxuICB9XG5cbiAgLy8vIHJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IHVub2JzZXJ2ZSA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyKVxuICAgIHRhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gdCAhPT0gdGFyZ2V0KVxuICB9XG5cbiAgLy8gc3RvcHMgd2F0Y2hpbmcgYWxsIG9mIGl0cyB0YXJnZXQgZWxlbWVudHMgZm9yIHZpc2liaWxpdHkgY2hhbmdlcy5cbiAgY29uc3QgZGlzY29ubmVjdCA9ICgpID0+IHtcbiAgICB0YXJnZXRzLmZvckVhY2godW5vYnNlcnZlKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBSZXZlcnNlU2lnbiwgVmVjdG9yWFlaLCBXaGVlbEV2ZW50RGF0YSB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVkV2hlZWwge1xuICBheGlzRGVsdGE6IFZlY3RvclhZWlxuICB0aW1lU3RhbXA6IG51bWJlclxufVxuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDE2ICogMS4xMjVcbmNvbnN0IFBBR0VfSEVJR0hUID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5pbm5lckhlaWdodCkgfHwgODAwXG5jb25zdCBERUxUQV9NT0RFX1VOSVQgPSBbMSwgTElORV9IRUlHSFQsIFBBR0VfSEVJR0hUXVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplV2hlZWwoZTogV2hlZWxFdmVudERhdGEpOiBOb3JtYWxpemVkV2hlZWwge1xuICBjb25zdCBkZWx0YVggPSBlLmRlbHRhWCAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cbiAgY29uc3QgZGVsdGFZID0gZS5kZWx0YVkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWiA9IChlLmRlbHRhWiB8fCAwKSAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cblxuICByZXR1cm4ge1xuICAgIHRpbWVTdGFtcDogZS50aW1lU3RhbXAsXG4gICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVksIGRlbHRhWl0sXG4gIH1cbn1cblxuY29uc3QgcmV2ZXJzZUFsbCA9IFstMSwgLTEsIC0xXVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUF4aXNEZWx0YVNpZ248VCBleHRlbmRzIFBpY2s8Tm9ybWFsaXplZFdoZWVsLCAnYXhpc0RlbHRhJz4+KFxuICB3aGVlbDogVCxcbiAgcmV2ZXJzZVNpZ246IFJldmVyc2VTaWduXG4pOiBUIHtcbiAgaWYgKCFyZXZlcnNlU2lnbikge1xuICAgIHJldHVybiB3aGVlbFxuICB9XG5cbiAgY29uc3QgbXVsdGlwbGllcnMgPSByZXZlcnNlU2lnbiA9PT0gdHJ1ZSA/IHJldmVyc2VBbGwgOiByZXZlcnNlU2lnbi5tYXAoKHNob3VsZFJldmVyc2UpID0+IChzaG91bGRSZXZlcnNlID8gLTEgOiAxKSlcblxuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEsIGkpID0+IGRlbHRhICogbXVsdGlwbGllcnNbaV0pLFxuICB9XG59XG5cbmNvbnN0IERFTFRBX01BWF9BQlMgPSA3MDBcblxuZXhwb3J0IGNvbnN0IGNsYW1wQXhpc0RlbHRhID0gPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+Pih3aGVlbDogVCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEpID0+IGNsYW1wKGRlbHRhLCAtREVMVEFfTUFYX0FCUywgREVMVEFfTUFYX0FCUykpLFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01JTiA9IDAuNlxuZXhwb3J0IGNvbnN0IEFDQ19GQUNUT1JfTUFYID0gMC45NlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX01FUkdFID0gMlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUgPSA1XG4iLCJpbXBvcnQgeyBXaGVlbEdlc3R1cmVzQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjb25maWdEZWZhdWx0czogV2hlZWxHZXN0dXJlc0NvbmZpZyA9IGRlZXBGcmVlemUoe1xuICBwcmV2ZW50V2hlZWxBY3Rpb246IHRydWUsXG4gIHJldmVyc2VTaWduOiBbdHJ1ZSwgdHJ1ZSwgZmFsc2VdLFxufSlcbiIsIi8qKlxuICogdGhlIHRpbWVvdXQgaXMgYXV0b21hdGljYWxseSBhZGp1c3RlZCBkdXJpbmcgYSBnZXN0dXJlXG4gKiB0aGUgaW5pdGlhbCB0aW1lb3V0IHBlcmlvZCBpcyBwcmV0dHkgbG9uZywgc28gZXZlbiBvbGQgbW91c2VzLCB3aGljaCBlbWl0IHdoZWVsIGV2ZW50cyBsZXNzIG9mdGVuLCBjYW4gcHJvZHVjZSBhIGNvbnRpbnVvdXMgZ2VzdHVyZVxuICovXG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnXG5cbmNvbnN0IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCA9IDQwMFxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKCk6IFdoZWVsR2VzdHVyZXNJbnRlcm5hbFN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBpc1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGlzU3RhcnRQdWJsaXNoZWQ6IGZhbHNlLFxuICAgIGlzTW9tZW50dW06IGZhbHNlLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBsYXN0QWJzRGVsdGE6IEluZmluaXR5LFxuICAgIGF4aXNNb3ZlbWVudDogWzAsIDAsIDBdLFxuICAgIGF4aXNWZWxvY2l0eTogWzAsIDAsIDBdLFxuICAgIGFjY2VsZXJhdGlvbkZhY3RvcnM6IFtdLFxuICAgIHNjcm9sbFBvaW50czogW10sXG4gICAgc2Nyb2xsUG9pbnRzVG9NZXJnZTogW10sXG4gICAgd2lsbEVuZFRpbWVvdXQ6IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCxcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9FdmVudEJ1cydcbmltcG9ydCB7IFdoZWVsVGFyZ2V0T2JzZXJ2ZXIgfSBmcm9tICcuLi9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlcidcbmltcG9ydCB7XG4gIFZlY3RvclhZWixcbiAgV2hlZWxFdmVudERhdGEsXG4gIFdoZWVsRXZlbnRTdGF0ZSxcbiAgV2hlZWxHZXN0dXJlc0NvbmZpZyxcbiAgV2hlZWxHZXN0dXJlc0V2ZW50TWFwLFxuICBXaGVlbEdlc3R1cmVzT3B0aW9ucyxcbn0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBhYnNNYXgsIGFkZFZlY3RvcnMsIGF2ZXJhZ2UsIGRlZXBGcmVlemUsIGxhc3RPZiwgcHJvamVjdGlvbiB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgY2xhbXBBeGlzRGVsdGEsIG5vcm1hbGl6ZVdoZWVsLCByZXZlcnNlQXhpc0RlbHRhU2lnbiB9IGZyb20gJy4uL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplcidcbmltcG9ydCB7IF9fREVWX18sIEFDQ19GQUNUT1JfTUFYLCBBQ0NfRkFDVE9SX01JTiwgV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSwgV0hFRUxFVkVOVFNfVE9fTUVSR0UgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0IHsgY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIFdoZWVsR2VzdHVyZXMob3B0aW9uc1BhcmFtOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgb24sIG9mZiwgZGlzcGF0Y2ggfSA9IEV2ZW50QnVzPFdoZWVsR2VzdHVyZXNFdmVudE1hcD4oKVxuICBsZXQgY29uZmlnID0gY29uZmlnRGVmYXVsdHNcbiAgbGV0IHN0YXRlID0gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKClcbiAgbGV0IGN1cnJlbnRFdmVudDogV2hlZWxFdmVudERhdGFcbiAgbGV0IG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgbGV0IHByZXZXaGVlbEV2ZW50U3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IGZlZWRXaGVlbCA9ICh3aGVlbEV2ZW50czogV2hlZWxFdmVudERhdGEgfCBXaGVlbEV2ZW50RGF0YVtdKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkod2hlZWxFdmVudHMpKSB7XG4gICAgICB3aGVlbEV2ZW50cy5mb3JFYWNoKCh3aGVlbEV2ZW50KSA9PiBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2Nlc3NXaGVlbEV2ZW50RGF0YSh3aGVlbEV2ZW50cylcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVPcHRpb25zID0gKG5ld09wdGlvbnM6IFdoZWVsR2VzdHVyZXNPcHRpb25zID0ge30pOiBXaGVlbEdlc3R1cmVzQ29uZmlnID0+IHtcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhuZXdPcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbiA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbiA9PT0gbnVsbCkpIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS5lcnJvcigndXBkYXRlT3B0aW9ucyBpZ25vcmVkISB1bmRlZmluZWQgJiBudWxsIG9wdGlvbnMgbm90IGFsbG93ZWQnKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cbiAgICByZXR1cm4gKGNvbmZpZyA9IGRlZXBGcmVlemUoeyAuLi5jb25maWdEZWZhdWx0cywgLi4uY29uZmlnLCAuLi5uZXdPcHRpb25zIH0pKVxuICB9XG5cbiAgY29uc3QgcHVibGlzaFdoZWVsID0gKGFkZGl0aW9uYWxEYXRhPzogUGFydGlhbDxXaGVlbEV2ZW50U3RhdGU+KSA9PiB7XG4gICAgY29uc3Qgd2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgPSB7XG4gICAgICBldmVudDogY3VycmVudEV2ZW50LFxuICAgICAgaXNTdGFydDogZmFsc2UsXG4gICAgICBpc0VuZGluZzogZmFsc2UsXG4gICAgICBpc01vbWVudHVtQ2FuY2VsOiBmYWxzZSxcbiAgICAgIGlzTW9tZW50dW06IHN0YXRlLmlzTW9tZW50dW0sXG4gICAgICBheGlzRGVsdGE6IFswLCAwLCAwXSxcbiAgICAgIGF4aXNWZWxvY2l0eTogc3RhdGUuYXhpc1ZlbG9jaXR5LFxuICAgICAgYXhpc01vdmVtZW50OiBzdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICBnZXQgYXhpc01vdmVtZW50UHJvamVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZFZlY3RvcnMoXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNNb3ZlbWVudCxcbiAgICAgICAgICB3aGVlbEV2ZW50U3RhdGUuYXhpc1ZlbG9jaXR5Lm1hcCgodmVsb2NpdHkpID0+IHByb2plY3Rpb24odmVsb2NpdHkpKSBhcyBWZWN0b3JYWVpcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIC4uLmFkZGl0aW9uYWxEYXRhLFxuICAgIH1cblxuICAgIGRpc3BhdGNoKCd3aGVlbCcsIHtcbiAgICAgIC4uLndoZWVsRXZlbnRTdGF0ZSxcbiAgICAgIHByZXZpb3VzOiBwcmV2V2hlZWxFdmVudFN0YXRlLFxuICAgIH0pXG5cbiAgICAvLyBrZWVwIHJlZmVyZW5jZSB3aXRob3V0IHByZXZpb3VzLCBvdGhlcndpc2Ugd2Ugd291bGQgY3JlYXRlIGEgbG9uZyBjaGFpblxuICAgIHByZXZXaGVlbEV2ZW50U3RhdGUgPSB3aGVlbEV2ZW50U3RhdGVcbiAgfVxuXG4gIC8vIHNob3VsZCBwcmV2ZW50IHdoZW4gdGhlcmUgaXMgbWFpbmx5IG1vdmVtZW50IG9uIHRoZSBkZXNpcmVkIGF4aXNcbiAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSAoZGVsdGFNYXhBYnM6IG51bWJlciwgYXhpc0RlbHRhOiBWZWN0b3JYWVopOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IHByZXZlbnRXaGVlbEFjdGlvbiB9ID0gY29uZmlnXG4gICAgY29uc3QgW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdID0gYXhpc0RlbHRhXG5cbiAgICBpZiAodHlwZW9mIHByZXZlbnRXaGVlbEFjdGlvbiA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gcHJldmVudFdoZWVsQWN0aW9uXG5cbiAgICBzd2l0Y2ggKHByZXZlbnRXaGVlbEFjdGlvbikge1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVgpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWSkgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFaKSA+PSBkZWx0YU1heEFic1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIHByZXZlbnRXaGVlbEFjdGlvbiB2YWx1ZTogJyArIHByZXZlbnRXaGVlbEFjdGlvbiwgJ3dhcm4nKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9jZXNzV2hlZWxFdmVudERhdGEgPSAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHtcbiAgICBjb25zdCB7IGF4aXNEZWx0YSwgdGltZVN0YW1wIH0gPSBjbGFtcEF4aXNEZWx0YShcbiAgICAgIHJldmVyc2VBeGlzRGVsdGFTaWduKG5vcm1hbGl6ZVdoZWVsKHdoZWVsRXZlbnQpLCBjb25maWcucmV2ZXJzZVNpZ24pXG4gICAgKVxuICAgIGNvbnN0IGRlbHRhTWF4QWJzID0gYWJzTWF4KGF4aXNEZWx0YSlcblxuICAgIGlmICh3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0ICYmIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhTWF4QWJzLCBheGlzRGVsdGEpKSB7XG4gICAgICB3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkge1xuICAgICAgc3RhcnQoKVxuICAgIH1cbiAgICAvLyBjaGVjayBpZiB1c2VyIHN0YXJ0ZWQgc2Nyb2xsaW5nIGFnYWluIC0+IGNhbmNlbFxuICAgIGVsc2UgaWYgKHN0YXRlLmlzTW9tZW50dW0gJiYgZGVsdGFNYXhBYnMgPiBNYXRoLm1heCgyLCBzdGF0ZS5sYXN0QWJzRGVsdGEgKiAyKSkge1xuICAgICAgZW5kKHRydWUpXG4gICAgICBzdGFydCgpXG4gICAgfVxuXG4gICAgLy8gc3BlY2lhbCBmaW5nZXIgdXAgZXZlbnQgb24gd2luZG93cyArIGJsaW5rXG4gICAgaWYgKGRlbHRhTWF4QWJzID09PSAwICYmIE9iamVjdC5pcyAmJiBPYmplY3QuaXMod2hlZWxFdmVudC5kZWx0YVgsIC0wKSkge1xuICAgICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSB0cnVlXG4gICAgICAvLyByZXR1cm4gLT4gemVybyBkZWx0YSBldmVudCBzaG91bGQgbm90IGluZmx1ZW5jZSB2ZWxvY2l0eVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEV2ZW50ID0gd2hlZWxFdmVudFxuICAgIHN0YXRlLmF4aXNNb3ZlbWVudCA9IGFkZFZlY3RvcnMoc3RhdGUuYXhpc01vdmVtZW50LCBheGlzRGVsdGEpXG4gICAgc3RhdGUubGFzdEFic0RlbHRhID0gZGVsdGFNYXhBYnNcbiAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLnB1c2goe1xuICAgICAgYXhpc0RlbHRhLFxuICAgICAgdGltZVN0YW1wLFxuICAgIH0pXG5cbiAgICBtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSgpXG5cbiAgICAvLyBvbmx5IHdoZWVsIGV2ZW50IChtb3ZlKSBhbmQgbm90IHN0YXJ0L2VuZCBnZXQgdGhlIGRlbHRhIHZhbHVlc1xuICAgIHB1Ymxpc2hXaGVlbCh7IGF4aXNEZWx0YSwgaXNTdGFydDogIXN0YXRlLmlzU3RhcnRQdWJsaXNoZWQgfSkgLy8gc3RhdGUuaXNNb21lbnR1bSA/IE1PTUVOVFVNX1dIRUVMIDogV0hFRUwsIHsgYXhpc0RlbHRhIH0pXG5cbiAgICAvLyBwdWJsaXNoIHN0YXJ0IGFmdGVyIHZlbG9jaXR5IGV0Yy4gaGF2ZSBiZWVuIHVwZGF0ZWRcbiAgICBzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkID0gdHJ1ZVxuXG4gICAgLy8gY2FsYyBkZWJvdW5jZWQgZW5kIGZ1bmN0aW9uLCB0byByZWNvZ25pemUgZW5kIG9mIHdoZWVsIGV2ZW50IHN0cmVhbVxuICAgIHdpbGxFbmQoKVxuICB9XG5cbiAgY29uc3QgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID09PSBXSEVFTEVWRU5UU19UT19NRVJHRSkge1xuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLnVuc2hpZnQoe1xuICAgICAgICBheGlzRGVsdGFTdW06IHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLmF4aXNEZWx0YSkucmVkdWNlKGFkZFZlY3RvcnMpLFxuICAgICAgICB0aW1lU3RhbXA6IGF2ZXJhZ2Uoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5tYXAoKGIpID0+IGIudGltZVN0YW1wKSksXG4gICAgICB9KVxuXG4gICAgICAvLyBvbmx5IHVwZGF0ZSB2ZWxvY2l0eSBhZnRlciBhIG1lcmdlZCBzY3JvbGxwb2ludCB3YXMgZ2VuZXJhdGVkXG4gICAgICB1cGRhdGVWZWxvY2l0eSgpXG5cbiAgICAgIC8vIHJlc2V0IHRvTWVyZ2UgYXJyYXlcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID0gMFxuXG4gICAgICAvLyBhZnRlciBjYWxjdWxhdGlvbiBvZiB2ZWxvY2l0eSBvbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IG1lcmdlZCBzY3JvbGxQb2ludFxuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLmxlbmd0aCA9IDFcblxuICAgICAgaWYgKCFzdGF0ZS5pc01vbWVudHVtKSB7XG4gICAgICAgIGRldGVjdE1vbWVudHVtKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkKSB7XG4gICAgICB1cGRhdGVTdGFydFZlbG9jaXR5KClcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVTdGFydFZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IGxhc3RPZihzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlKS5heGlzRGVsdGEubWFwKChkKSA9PiBkIC8gc3RhdGUud2lsbEVuZFRpbWVvdXQpIGFzIFZlY3RvclhZWlxuICB9XG5cbiAgY29uc3QgdXBkYXRlVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgLy8gbmVlZCB0byBoYXZlIHR3byByZWNlbnQgcG9pbnRzIHRvIGNhbGMgdmVsb2NpdHlcbiAgICBjb25zdCBbbGF0ZXN0U2Nyb2xsUG9pbnQsIHByZXZTY3JvbGxQb2ludF0gPSBzdGF0ZS5zY3JvbGxQb2ludHNcblxuICAgIGlmICghcHJldlNjcm9sbFBvaW50IHx8ICFsYXRlc3RTY3JvbGxQb2ludCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdGltZSBkZWx0YVxuICAgIGNvbnN0IGRlbHRhVGltZSA9IGxhdGVzdFNjcm9sbFBvaW50LnRpbWVTdGFtcCAtIHByZXZTY3JvbGxQb2ludC50aW1lU3RhbXBcblxuICAgIGlmIChkZWx0YVRpbWUgPD0gMCkge1xuICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ2ludmFsaWQgZGVsdGFUaW1lJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNhbGMgdGhlIHZlbG9jaXR5IHBlciBheGVzXG4gICAgY29uc3QgdmVsb2NpdHkgPSBsYXRlc3RTY3JvbGxQb2ludC5heGlzRGVsdGFTdW0ubWFwKChkKSA9PiBkIC8gZGVsdGFUaW1lKSBhcyBWZWN0b3JYWVpcblxuICAgIC8vIGNhbGMgdGhlIGFjY2VsZXJhdGlvbiBmYWN0b3IgcGVyIGF4aXNcbiAgICBjb25zdCBhY2NlbGVyYXRpb25GYWN0b3IgPSB2ZWxvY2l0eS5tYXAoKHYsIGkpID0+IHYgLyAoc3RhdGUuYXhpc1ZlbG9jaXR5W2ldIHx8IDEpKVxuXG4gICAgc3RhdGUuYXhpc1ZlbG9jaXR5ID0gdmVsb2NpdHlcbiAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzLnB1c2goYWNjZWxlcmF0aW9uRmFjdG9yKVxuXG4gICAgdXBkYXRlV2lsbEVuZFRpbWVvdXQoZGVsdGFUaW1lKVxuICB9XG5cbiAgY29uc3QgdXBkYXRlV2lsbEVuZFRpbWVvdXQgPSAoZGVsdGFUaW1lOiBudW1iZXIpID0+IHtcbiAgICAvLyB1c2UgY3VycmVudCB0aW1lIGJldHdlZW4gZXZlbnRzIHJvdW5kZWQgdXAgYW5kIGluY3JlYXNlZCBieSBhIGJpdCBhcyB0aW1lb3V0XG4gICAgbGV0IG5ld1RpbWVvdXQgPSBNYXRoLmNlaWwoZGVsdGFUaW1lIC8gMTApICogMTAgKiAxLjJcblxuICAgIC8vIGRvdWJsZSB0aGUgdGltZW91dCwgd2hlbiBtb21lbnR1bSB3YXMgbm90IGRldGVjdGVkIHlldFxuICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgbmV3VGltZW91dCA9IE1hdGgubWF4KDEwMCwgbmV3VGltZW91dCAqIDIpXG4gICAgfVxuXG4gICAgc3RhdGUud2lsbEVuZFRpbWVvdXQgPSBNYXRoLm1pbigxMDAwLCBNYXRoLnJvdW5kKG5ld1RpbWVvdXQpKVxuICB9XG5cbiAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlID0gKGFjY0ZhY3RvcjogbnVtYmVyKSA9PiB7XG4gICAgLy8gd2hlbiBtYWluIGF4aXMgaXMgdGhlIHRoZSBvdGhlciBvbmUgYW5kIHRoZXJlIGlzIG5vIG1vdmVtZW50L2NoYW5nZSBvbiB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAoYWNjRmFjdG9yID09PSAwKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBhY2NGYWN0b3IgPD0gQUNDX0ZBQ1RPUl9NQVggJiYgYWNjRmFjdG9yID49IEFDQ19GQUNUT1JfTUlOXG4gIH1cblxuICBjb25zdCBkZXRlY3RNb21lbnR1bSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5sZW5ndGggPj0gV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSkge1xuICAgICAgaWYgKG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50KSB7XG4gICAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBpZiAoYWJzTWF4KHN0YXRlLmF4aXNWZWxvY2l0eSkgPj0gMC4yKSB7XG4gICAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzID0gc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5zbGljZShXSEVFTEVWRU5UU19UT19BTkFMQVpFICogLTEpXG5cbiAgICAgIC8vIGNoZWNrIHJlY2VudCBhY2NlbGVyYXRpb24gLyBkZWNlbGVyYXRpb24gZmFjdG9yc1xuICAgICAgLy8gYWxsIHJlY2VudCBuZWVkIHRvIG1hdGNoLCBpZiBhbnkgZGlkIG5vdCBtYXRjaFxuICAgICAgY29uc3QgZGV0ZWN0ZWRNb21lbnR1bSA9IHJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMuZXZlcnkoKGFjY0ZhYykgPT4ge1xuICAgICAgICAvLyB3aGVuIGJvdGggYXhpcyBkZWNlbGVyYXRlIGV4YWN0bHkgaW4gdGhlIHNhbWUgcmF0ZSBpdCBpcyB2ZXJ5IGxpa2VseSBjYXVzZWQgYnkgbW9tZW50dW1cbiAgICAgICAgY29uc3Qgc2FtZUFjY0ZhYyA9ICEhYWNjRmFjLnJlZHVjZSgoZjEsIGYyKSA9PiAoZjEgJiYgZjEgPCAxICYmIGYxID09PSBmMiA/IDEgOiAwKSlcblxuICAgICAgICAvLyBjaGVjayBpZiBhY2NlbGVyYXRpb24gZmFjdG9yIGlzIHdpdGhpbiBtb21lbnR1bSByYW5nZVxuICAgICAgICBjb25zdCBib3RoQXJlSW5SYW5nZU9yWmVybyA9IGFjY0ZhYy5maWx0ZXIoYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlKS5sZW5ndGggPT09IGFjY0ZhYy5sZW5ndGhcblxuICAgICAgICAvLyBvbmUgdGhlIHJlcXVpcmVtZW50cyBtdXN0IGJlIGZ1bGZpbGxlZFxuICAgICAgICByZXR1cm4gc2FtZUFjY0ZhYyB8fCBib3RoQXJlSW5SYW5nZU9yWmVyb1xuICAgICAgfSlcblxuICAgICAgaWYgKGRldGVjdGVkTW9tZW50dW0pIHtcbiAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgIH1cblxuICAgICAgLy8gb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBldmVudHNcbiAgICAgIHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMgPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjb2duaXplZE1vbWVudHVtID0gKCkgPT4ge1xuICAgIHN0YXRlLmlzTW9tZW50dW0gPSB0cnVlXG4gIH1cblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gICAgc3RhdGUuaXNTdGFydGVkID0gdHJ1ZVxuICAgIHN0YXRlLnN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gdW5kZWZpbmVkXG4gICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSBmYWxzZVxuICB9XG5cbiAgY29uc3Qgd2lsbEVuZCA9ICgoKSA9PiB7XG4gICAgbGV0IHdpbGxFbmRJZDogbnVtYmVyXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh3aWxsRW5kSWQpXG4gICAgICB3aWxsRW5kSWQgPSBzZXRUaW1lb3V0KGVuZCwgc3RhdGUud2lsbEVuZFRpbWVvdXQpXG4gICAgfVxuICB9KSgpXG5cbiAgY29uc3QgZW5kID0gKGlzTW9tZW50dW1DYW5jZWwgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghc3RhdGUuaXNTdGFydGVkKSByZXR1cm5cblxuICAgIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGlzTW9tZW50dW1DYW5jZWwpIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlLCBpc01vbWVudHVtQ2FuY2VsOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgc3RhdGUuaXNNb21lbnR1bSA9IGZhbHNlXG4gICAgc3RhdGUuaXNTdGFydGVkID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHsgb2JzZXJ2ZSwgdW5vYnNlcnZlLCBkaXNjb25uZWN0IH0gPSBXaGVlbFRhcmdldE9ic2VydmVyKGZlZWRXaGVlbClcblxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnNQYXJhbSlcblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gICAgZmVlZFdoZWVsLFxuICAgIHVwZGF0ZU9wdGlvbnMsXG4gIH0pXG59XG4iLCJleHBvcnQgY29uc3QgYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icykgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzbGlkZXNUaHVtYnMubWFwKFxuICAgICAgICAoXywgaW5kZXgpID0+IChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGVtYmxhQXBpTWFpbi5zY3JvbGxUbyhpbmRleCk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzbGlkZU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icywgZW1ibGFBcGlUaHVtYiA9IG51bGwpID0+IHtcbiAgICBjb25zdCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKCk7XG5cbiAgICAgICAgZW1ibGFBcGlUaHVtYj8uc2Nyb2xsVG8oc2VsZWN0ZWQpO1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkO1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLWFjdGl2ZScsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCBpc1NlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBlbWJsYUFwaU1haW5cbiAgICAgICAgLm9uKCdzZWxlY3QnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdyZUluaXQnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSk7XG4gICAgdG9nZ2xlVGh1bWJCdG5zU3RhdGUoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZSkgPT4ge1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3VrLWFjdGl2ZScpO1xuICAgICAgICAgICAgc2xpZGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzID0gKGVtYmxhQXBpLCBwcmV2QnRuLCBuZXh0QnRuKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsUHJldiA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbWJsYUFwaS5zY3JvbGxQcmV2KCk7XG4gICAgfTtcbiAgICBjb25zdCBzY3JvbGxOZXh0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVtYmxhQXBpLnNjcm9sbE5leHQoKTtcbiAgICB9O1xuICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxQcmV2LCBmYWxzZSk7XG4gICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbE5leHQsIGZhbHNlKTtcblxuICAgIGNvbnN0IHJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSA9IGFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZShcbiAgICAgICAgZW1ibGFBcGksXG4gICAgICAgIHByZXZCdG4sXG4gICAgICAgIG5leHRCdG5cbiAgICApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcmVtb3ZlVG9nZ2xlUHJldk5leHRCdXR0b25zQWN0aXZlKCk7XG4gICAgICAgIHByZXZCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxQcmV2LCBmYWxzZSk7XG4gICAgICAgIG5leHRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxOZXh0LCBmYWxzZSk7XG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZShlbWJsYUFwaSwgcHJldkJ0biwgbmV4dEJ0bikge1xuICAgIGNvbnN0IHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoZW1ibGFBcGkuY2FuU2Nyb2xsUHJldigpKSB7XG4gICAgICAgICAgICBwcmV2QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbE5leHQoKSkge1xuICAgICAgICAgICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBlbWJsYUFwaVxuICAgICAgICAub24oJ3NlbGVjdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKVxuICAgICAgICAub24oJ2luaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdyZUluaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBwcmV2QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgbmV4dEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfTtcbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCB7IENyZWF0ZU9wdGlvbnNUeXBlLCBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsJ1xuXG5leHBvcnQgdHlwZSBEZWxheU9wdGlvblR5cGUgPVxuICB8IG51bWJlclxuICB8ICgoc2Nyb2xsU25hcHM6IG51bWJlcltdLCBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IG51bWJlcltdKVxuXG5leHBvcnQgdHlwZSBSb290Tm9kZVR5cGUgPVxuICB8IG51bGxcbiAgfCAoKGVtYmxhUm9vdDogSFRNTEVsZW1lbnQpID0+IEhUTUxFbGVtZW50IHwgbnVsbClcblxuZXhwb3J0IHR5cGUgT3B0aW9uc1R5cGUgPSBDcmVhdGVPcHRpb25zVHlwZTx7XG4gIGRlbGF5OiBEZWxheU9wdGlvblR5cGVcbiAganVtcDogYm9vbGVhblxuICBwbGF5T25Jbml0OiBib29sZWFuXG4gIHN0b3BPbkZvY3VzSW46IGJvb2xlYW5cbiAgc3RvcE9uSW50ZXJhY3Rpb246IGJvb2xlYW5cbiAgc3RvcE9uTW91c2VFbnRlcjogYm9vbGVhblxuICBzdG9wT25MYXN0U25hcDogYm9vbGVhblxuICByb290Tm9kZTogUm9vdE5vZGVUeXBlXG59PlxuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnNUeXBlID0ge1xuICBhY3RpdmU6IHRydWUsXG4gIGJyZWFrcG9pbnRzOiB7fSxcbiAgZGVsYXk6IDQwMDAsXG4gIGp1bXA6IGZhbHNlLFxuICBwbGF5T25Jbml0OiB0cnVlLFxuICBzdG9wT25Gb2N1c0luOiB0cnVlLFxuICBzdG9wT25JbnRlcmFjdGlvbjogdHJ1ZSxcbiAgc3RvcE9uTW91c2VFbnRlcjogZmFsc2UsXG4gIHN0b3BPbkxhc3RTbmFwOiBmYWxzZSxcbiAgcm9vdE5vZGU6IG51bGxcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwvY29tcG9uZW50cy9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRGVsYXlPcHRpb25UeXBlLCBSb290Tm9kZVR5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVEZWxheShcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBkZWxheTogRGVsYXlPcHRpb25UeXBlXG4pOiBudW1iZXJbXSB7XG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gZW1ibGFBcGkuc2Nyb2xsU25hcExpc3QoKVxuXG4gIGlmICh0eXBlb2YgZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHNjcm9sbFNuYXBzLm1hcCgoKSA9PiBkZWxheSlcbiAgfVxuICByZXR1cm4gZGVsYXkoc2Nyb2xsU25hcHMsIGVtYmxhQXBpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0b3BsYXlSb290Tm9kZShcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICByb290Tm9kZTogUm9vdE5vZGVUeXBlXG4pOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IGVtYmxhUm9vdE5vZGUgPSBlbWJsYUFwaS5yb290Tm9kZSgpXG4gIHJldHVybiAocm9vdE5vZGUgJiYgcm9vdE5vZGUoZW1ibGFSb290Tm9kZSkpIHx8IGVtYmxhUm9vdE5vZGVcbn1cbiIsImltcG9ydCB7IE9wdGlvbnNUeXBlLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IGdldEF1dG9wbGF5Um9vdE5vZGUsIG5vcm1hbGl6ZURlbGF5IH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7XG4gIENyZWF0ZVBsdWdpblR5cGUsXG4gIE9wdGlvbnNIYW5kbGVyVHlwZSxcbiAgRW1ibGFDYXJvdXNlbFR5cGVcbn0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5cbmRlY2xhcmUgbW9kdWxlICdlbWJsYS1jYXJvdXNlbCcge1xuICBpbnRlcmZhY2UgRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgYXV0b3BsYXk6IEF1dG9wbGF5VHlwZVxuICB9XG5cbiAgaW50ZXJmYWNlIEVtYmxhRXZlbnRMaXN0VHlwZSB7XG4gICAgYXV0b3BsYXlQbGF5OiAnYXV0b3BsYXk6cGxheSdcbiAgICBhdXRvcGxheVN0b3A6ICdhdXRvcGxheTpzdG9wJ1xuICAgIGF1dG9wbGF5U2VsZWN0OiAnYXV0b3BsYXk6c2VsZWN0J1xuICAgIGF1dG9wbGF5VGltZXJTZXQ6ICdhdXRvcGxheTp0aW1lcnNldCdcbiAgICBhdXRvcGxheVRpbWVyU3RvcHBlZDogJ2F1dG9wbGF5OnRpbWVyc3RvcHBlZCdcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBBdXRvcGxheVR5cGUgPSBDcmVhdGVQbHVnaW5UeXBlPFxuICB7XG4gICAgcGxheTogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gICAgc3RvcDogKCkgPT4gdm9pZFxuICAgIHJlc2V0OiAoKSA9PiB2b2lkXG4gICAgaXNQbGF5aW5nOiAoKSA9PiBib29sZWFuXG4gICAgdGltZVVudGlsTmV4dDogKCkgPT4gbnVtYmVyIHwgbnVsbFxuICB9LFxuICBPcHRpb25zVHlwZVxuPlxuXG5leHBvcnQgdHlwZSBBdXRvcGxheU9wdGlvbnNUeXBlID0gQXV0b3BsYXlUeXBlWydvcHRpb25zJ11cblxuZnVuY3Rpb24gQXV0b3BsYXkodXNlck9wdGlvbnM6IEF1dG9wbGF5T3B0aW9uc1R5cGUgPSB7fSk6IEF1dG9wbGF5VHlwZSB7XG4gIGxldCBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBsZXQgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG4gIGxldCBkZXN0cm95ZWQ6IGJvb2xlYW5cbiAgbGV0IGRlbGF5OiBSZXR1cm5UeXBlPEVtYmxhQ2Fyb3VzZWxUeXBlWydzY3JvbGxTbmFwTGlzdCddPlxuICBsZXQgdGltZXJTdGFydFRpbWU6IG51bGwgfCBudW1iZXIgPSBudWxsXG4gIGxldCB0aW1lcklkID0gMFxuICBsZXQgYXV0b3BsYXlBY3RpdmUgPSBmYWxzZVxuICBsZXQgbW91c2VJc092ZXIgPSBmYWxzZVxuICBsZXQgcGxheU9uRG9jdW1lbnRWaXNpYmxlID0gZmFsc2VcbiAgbGV0IGp1bXAgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGlJbnN0YW5jZTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgb3B0aW9uc0hhbmRsZXI6IE9wdGlvbnNIYW5kbGVyVHlwZVxuICApOiB2b2lkIHtcbiAgICBlbWJsYUFwaSA9IGVtYmxhQXBpSW5zdGFuY2VcblxuICAgIGNvbnN0IHsgbWVyZ2VPcHRpb25zLCBvcHRpb25zQXRNZWRpYSB9ID0gb3B0aW9uc0hhbmRsZXJcbiAgICBjb25zdCBvcHRpb25zQmFzZSA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgQXV0b3BsYXkuZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGlmIChlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpLmxlbmd0aCA8PSAxKSByZXR1cm5cblxuICAgIGp1bXAgPSBvcHRpb25zLmp1bXBcbiAgICBkZXN0cm95ZWQgPSBmYWxzZVxuICAgIGRlbGF5ID0gbm9ybWFsaXplRGVsYXkoZW1ibGFBcGksIG9wdGlvbnMuZGVsYXkpXG5cbiAgICBjb25zdCB7IGV2ZW50U3RvcmUsIG93bmVyRG9jdW1lbnQgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBpc0RyYWdnYWJsZSA9ICEhZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKS5vcHRpb25zLndhdGNoRHJhZ1xuICAgIGNvbnN0IHJvb3QgPSBnZXRBdXRvcGxheVJvb3ROb2RlKGVtYmxhQXBpLCBvcHRpb25zLnJvb3ROb2RlKVxuXG4gICAgZXZlbnRTdG9yZS5hZGQob3duZXJEb2N1bWVudCwgJ3Zpc2liaWxpdHljaGFuZ2UnLCB2aXNpYmlsaXR5Q2hhbmdlKVxuXG4gICAgaWYgKGlzRHJhZ2dhYmxlKSB7XG4gICAgICBlbWJsYUFwaS5vbigncG9pbnRlckRvd24nLCBwb2ludGVyRG93bilcbiAgICB9XG5cbiAgICBpZiAoaXNEcmFnZ2FibGUgJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uTW91c2VFbnRlcikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQocm9vdCwgJ21vdXNlZW50ZXInLCBtb3VzZUVudGVyKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbk1vdXNlRW50ZXIgJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGV2ZW50U3RvcmUuYWRkKHJvb3QsICdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZSlcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zdG9wT25Gb2N1c0luKSB7XG4gICAgICBlbWJsYUFwaS5vbignc2xpZGVGb2N1c1N0YXJ0Jywgc3RvcEF1dG9wbGF5KVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbkZvY3VzSW4gJiYgIW9wdGlvbnMuc3RvcE9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIGV2ZW50U3RvcmUuYWRkKGVtYmxhQXBpLmNvbnRhaW5lck5vZGUoKSwgJ2ZvY3Vzb3V0Jywgc3RhcnRBdXRvcGxheSlcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wbGF5T25Jbml0KSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZW1ibGFBcGlcbiAgICAgIC5vZmYoJ3BvaW50ZXJEb3duJywgcG9pbnRlckRvd24pXG4gICAgICAub2ZmKCdwb2ludGVyVXAnLCBwb2ludGVyVXApXG4gICAgICAub2ZmKCdzbGlkZUZvY3VzU3RhcnQnLCBzdG9wQXV0b3BsYXkpXG5cbiAgICBzdG9wQXV0b3BsYXkoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBzZXRUaW1lcigpOiB2b2lkIHtcbiAgICBjb25zdCB7IG93bmVyV2luZG93IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgb3duZXJXaW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpXG4gICAgdGltZXJJZCA9IG93bmVyV2luZG93LnNldFRpbWVvdXQobmV4dCwgZGVsYXlbZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKCldKVxuICAgIHRpbWVyU3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICBlbWJsYUFwaS5lbWl0KCdhdXRvcGxheTp0aW1lcnNldCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRpbWVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgb3duZXJXaW5kb3cgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZClcbiAgICB0aW1lcklkID0gMFxuICAgIHRpbWVyU3RhcnRUaW1lID0gbnVsbFxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnRpbWVyc3RvcHBlZCcpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEF1dG9wbGF5KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGlmIChkb2N1bWVudElzSGlkZGVuKCkpIHtcbiAgICAgIHBsYXlPbkRvY3VtZW50VmlzaWJsZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWF1dG9wbGF5QWN0aXZlKSBlbWJsYUFwaS5lbWl0KCdhdXRvcGxheTpwbGF5JylcblxuICAgIHNldFRpbWVyKClcbiAgICBhdXRvcGxheUFjdGl2ZSA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BBdXRvcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnN0b3AnKVxuXG4gICAgY2xlYXJUaW1lcigpXG4gICAgYXV0b3BsYXlBY3RpdmUgPSBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gdmlzaWJpbGl0eUNoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAoZG9jdW1lbnRJc0hpZGRlbigpKSB7XG4gICAgICBwbGF5T25Eb2N1bWVudFZpc2libGUgPSBhdXRvcGxheUFjdGl2ZVxuICAgICAgcmV0dXJuIHN0b3BBdXRvcGxheSgpXG4gICAgfVxuXG4gICAgaWYgKHBsYXlPbkRvY3VtZW50VmlzaWJsZSkgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBkb2N1bWVudElzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgb3duZXJEb2N1bWVudCB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIHJldHVybiBvd25lckRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ2hpZGRlbidcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IHZvaWQge1xuICAgIGlmICghbW91c2VJc092ZXIpIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVXAoKTogdm9pZCB7XG4gICAgaWYgKCFtb3VzZUlzT3Zlcikgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIG1vdXNlSXNPdmVyID0gdHJ1ZVxuICAgIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIG1vdXNlSXNPdmVyID0gZmFsc2VcbiAgICBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXkoanVtcE92ZXJyaWRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YganVtcE92ZXJyaWRlICE9PSAndW5kZWZpbmVkJykganVtcCA9IGp1bXBPdmVycmlkZVxuICAgIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIHN0b3BBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBpZiAoYXV0b3BsYXlBY3RpdmUpIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdXRvcGxheUFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgY29uc3QgbmV4dEluZGV4ID0gaW5kZXguY2xvbmUoKS5hZGQoMSkuZ2V0KClcbiAgICBjb25zdCBsYXN0SW5kZXggPSBlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpLmxlbmd0aCAtIDFcbiAgICBjb25zdCBraWxsID0gb3B0aW9ucy5zdG9wT25MYXN0U25hcCAmJiBuZXh0SW5kZXggPT09IGxhc3RJbmRleFxuXG4gICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbE5leHQoKSkge1xuICAgICAgZW1ibGFBcGkuc2Nyb2xsTmV4dChqdW1wKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbWJsYUFwaS5zY3JvbGxUbygwLCBqdW1wKVxuICAgIH1cblxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnNlbGVjdCcpXG5cbiAgICBpZiAoa2lsbCkgcmV0dXJuIHN0b3BBdXRvcGxheSgpXG4gICAgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiB0aW1lVW50aWxOZXh0KCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghdGltZXJTdGFydFRpbWUpIHJldHVybiBudWxsXG4gICAgY29uc3QgY3VycmVudERlbGF5ID0gZGVsYXlbZW1ibGFBcGkuc2VsZWN0ZWRTY3JvbGxTbmFwKCldXG4gICAgY29uc3QgdGltZVBhc3RTaW5jZVN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aW1lclN0YXJ0VGltZVxuICAgIHJldHVybiBjdXJyZW50RGVsYXkgLSB0aW1lUGFzdFNpbmNlU3RhcnRcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF1dG9wbGF5VHlwZSA9IHtcbiAgICBuYW1lOiAnYXV0b3BsYXknLFxuICAgIG9wdGlvbnM6IHVzZXJPcHRpb25zLFxuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBwbGF5LFxuICAgIHN0b3AsXG4gICAgcmVzZXQsXG4gICAgaXNQbGF5aW5nLFxuICAgIHRpbWVVbnRpbE5leHRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBBdXRvcGxheSB7XG4gIGxldCBnbG9iYWxPcHRpb25zOiBBdXRvcGxheU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkF1dG9wbGF5Lmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWRcblxuZXhwb3J0IGRlZmF1bHQgQXV0b3BsYXlcbiIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50T3B0aW9uVHlwZSA9XG4gIHwgJ3N0YXJ0J1xuICB8ICdjZW50ZXInXG4gIHwgJ2VuZCdcbiAgfCAoKHZpZXdTaXplOiBudW1iZXIsIHNuYXBTaXplOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IG51bWJlcilcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50VHlwZSA9IHtcbiAgbWVhc3VyZTogKG46IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnbm1lbnQoXG4gIGFsaWduOiBBbGlnbm1lbnRPcHRpb25UeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyXG4pOiBBbGlnbm1lbnRUeXBlIHtcbiAgY29uc3QgcHJlZGVmaW5lZCA9IHsgc3RhcnQsIGNlbnRlciwgZW5kIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiAwXG4gIH1cblxuICBmdW5jdGlvbiBjZW50ZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5kKG4pIC8gMlxuICB9XG5cbiAgZnVuY3Rpb24gZW5kKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplIC0gblxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChpc1N0cmluZyhhbGlnbikpIHJldHVybiBwcmVkZWZpbmVkW2FsaWduXShuKVxuICAgIHJldHVybiBhbGlnbih2aWV3U2l6ZSwgbiwgaW5kZXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbGlnbm1lbnRUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwidHlwZSBFdmVudE5hbWVUeXBlID0ga2V5b2YgRG9jdW1lbnRFdmVudE1hcCB8IGtleW9mIFdpbmRvd0V2ZW50TWFwXG50eXBlIEV2ZW50SGFuZGxlclR5cGUgPSAoZXZ0OiBhbnkpID0+IHZvaWRcbnR5cGUgRXZlbnRPcHRpb25zVHlwZSA9IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IHVuZGVmaW5lZFxudHlwZSBFdmVudFJlbW92ZXJUeXBlID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBFdmVudFN0b3JlVHlwZSA9IHtcbiAgYWRkOiAoXG4gICAgbm9kZTogRXZlbnRUYXJnZXQsXG4gICAgdHlwZTogRXZlbnROYW1lVHlwZSxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICAgIG9wdGlvbnM/OiBFdmVudE9wdGlvbnNUeXBlXG4gICkgPT4gRXZlbnRTdG9yZVR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50U3RvcmUoKTogRXZlbnRTdG9yZVR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBFdmVudFJlbW92ZXJUeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGFkZChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9uczogRXZlbnRPcHRpb25zVHlwZSA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICk6IEV2ZW50U3RvcmVUeXBlIHtcbiAgICBsZXQgcmVtb3ZlTGlzdGVuZXI6IEV2ZW50UmVtb3ZlclR5cGVcblxuICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gbm9kZSkge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWdhY3lNZWRpYVF1ZXJ5TGlzdCA9IDxNZWRpYVF1ZXJ5TGlzdD5ub2RlXG4gICAgICBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihoYW5kbGVyKVxuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5yZW1vdmVMaXN0ZW5lcihoYW5kbGVyKVxuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKHJlbW92ZUxpc3RlbmVyKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKChyZW1vdmUpID0+IHJlbW92ZSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRTdG9yZVR5cGUgPSB7XG4gICAgYWRkLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1VwZGF0ZVR5cGUgPSAoZW5naW5lOiBFbmdpbmVUeXBlKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBBbmltYXRpb25zUmVuZGVyVHlwZSA9IChlbmdpbmU6IEVuZ2luZVR5cGUsIGFscGhhOiBudW1iZXIpID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1R5cGUgPSB7XG4gIGluaXQ6ICgpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBzdGFydDogKCkgPT4gdm9pZFxuICBzdG9wOiAoKSA9PiB2b2lkXG4gIHVwZGF0ZTogKCkgPT4gdm9pZFxuICByZW5kZXI6IChhbHBoYTogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbmltYXRpb25zKFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHVwZGF0ZTogKCkgPT4gdm9pZCxcbiAgcmVuZGVyOiAoYWxwaGE6IG51bWJlcikgPT4gdm9pZFxuKTogQW5pbWF0aW9uc1R5cGUge1xuICBjb25zdCBkb2N1bWVudFZpc2libGVIYW5kbGVyID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGZpeGVkVGltZVN0ZXAgPSAxMDAwIC8gNjBcblxuICBsZXQgbGFzdFRpbWVTdGFtcDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IGFjY3VtdWxhdGVkVGltZSA9IDBcbiAgbGV0IGFuaW1hdGlvbklkID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgZG9jdW1lbnRWaXNpYmxlSGFuZGxlci5hZGQob3duZXJEb2N1bWVudCwgJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAob3duZXJEb2N1bWVudC5oaWRkZW4pIHJlc2V0KClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdG9wKClcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUodGltZVN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKTogdm9pZCB7XG4gICAgaWYgKCFhbmltYXRpb25JZCkgcmV0dXJuXG4gICAgaWYgKCFsYXN0VGltZVN0YW1wKSB7XG4gICAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgICB1cGRhdGUoKVxuICAgICAgdXBkYXRlKClcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lRWxhcHNlZCA9IHRpbWVTdGFtcCAtIGxhc3RUaW1lU3RhbXBcbiAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgYWNjdW11bGF0ZWRUaW1lICs9IHRpbWVFbGFwc2VkXG5cbiAgICB3aGlsZSAoYWNjdW11bGF0ZWRUaW1lID49IGZpeGVkVGltZVN0ZXApIHtcbiAgICAgIHVwZGF0ZSgpXG4gICAgICBhY2N1bXVsYXRlZFRpbWUgLT0gZml4ZWRUaW1lU3RlcFxuICAgIH1cblxuICAgIGNvbnN0IGFscGhhID0gYWNjdW11bGF0ZWRUaW1lIC8gZml4ZWRUaW1lU3RlcFxuICAgIHJlbmRlcihhbHBoYSlcblxuICAgIGlmIChhbmltYXRpb25JZCkge1xuICAgICAgYW5pbWF0aW9uSWQgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoYW5pbWF0aW9uSWQpIHJldHVyblxuICAgIGFuaW1hdGlvbklkID0gb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCk6IHZvaWQge1xuICAgIG93bmVyV2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklkKVxuICAgIGxhc3RUaW1lU3RhbXAgPSBudWxsXG4gICAgYWNjdW11bGF0ZWRUaW1lID0gMFxuICAgIGFuaW1hdGlvbklkID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKTogdm9pZCB7XG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBhY2N1bXVsYXRlZFRpbWUgPSAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbmltYXRpb25zVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgc3RhcnQsXG4gICAgc3RvcCxcbiAgICB1cGRhdGUsXG4gICAgcmVuZGVyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuXG5leHBvcnQgdHlwZSBBeGlzT3B0aW9uVHlwZSA9ICd4JyB8ICd5J1xuZXhwb3J0IHR5cGUgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUgPSAnbHRyJyB8ICdydGwnXG50eXBlIEF4aXNFZGdlVHlwZSA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnXG5cbmV4cG9ydCB0eXBlIEF4aXNUeXBlID0ge1xuICBzY3JvbGw6IEF4aXNPcHRpb25UeXBlXG4gIGNyb3NzOiBBeGlzT3B0aW9uVHlwZVxuICBzdGFydEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBlbmRFZGdlOiBBeGlzRWRnZVR5cGVcbiAgbWVhc3VyZVNpemU6IChub2RlUmVjdDogTm9kZVJlY3RUeXBlKSA9PiBudW1iZXJcbiAgZGlyZWN0aW9uOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF4aXMoXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlLFxuICBjb250ZW50RGlyZWN0aW9uOiBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZVxuKTogQXhpc1R5cGUge1xuICBjb25zdCBpc1JpZ2h0VG9MZWZ0ID0gY29udGVudERpcmVjdGlvbiA9PT0gJ3J0bCdcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGF4aXMgPT09ICd5J1xuICBjb25zdCBzY3JvbGwgPSBpc1ZlcnRpY2FsID8gJ3knIDogJ3gnXG4gIGNvbnN0IGNyb3NzID0gaXNWZXJ0aWNhbCA/ICd4JyA6ICd5J1xuICBjb25zdCBzaWduID0gIWlzVmVydGljYWwgJiYgaXNSaWdodFRvTGVmdCA/IC0xIDogMVxuICBjb25zdCBzdGFydEVkZ2UgPSBnZXRTdGFydEVkZ2UoKVxuICBjb25zdCBlbmRFZGdlID0gZ2V0RW5kRWRnZSgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemUobm9kZVJlY3Q6IE5vZGVSZWN0VHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBub2RlUmVjdFxuICAgIHJldHVybiBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXJ0RWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ3RvcCdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZEVkZ2UoKTogQXhpc0VkZ2VUeXBlIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkgcmV0dXJuICdib3R0b20nXG4gICAgcmV0dXJuIGlzUmlnaHRUb0xlZnQgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cblxuICBmdW5jdGlvbiBkaXJlY3Rpb24objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbiAqIHNpZ25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF4aXNUeXBlID0ge1xuICAgIHNjcm9sbCxcbiAgICBjcm9zcyxcbiAgICBzdGFydEVkZ2UsXG4gICAgZW5kRWRnZSxcbiAgICBtZWFzdXJlU2l6ZSxcbiAgICBkaXJlY3Rpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIExpbWl0VHlwZSA9IHtcbiAgbWluOiBudW1iZXJcbiAgbWF4OiBudW1iZXJcbiAgbGVuZ3RoOiBudW1iZXJcbiAgY29uc3RyYWluOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbiAgcmVhY2hlZEFueTogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZWFjaGVkTWF4OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNaW46IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVtb3ZlT2Zmc2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbWl0KG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAwKTogTGltaXRUeXBlIHtcbiAgY29uc3QgbGVuZ3RoID0gbWF0aEFicyhtaW4gLSBtYXgpXG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1pbihuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA8IG1pblxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1heChuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA+IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZEFueShuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSB8fCByZWFjaGVkTWF4KG4pXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIXJlYWNoZWRBbnkobikpIHJldHVybiBuXG4gICAgcmV0dXJuIHJlYWNoZWRNaW4obikgPyBtaW4gOiBtYXhcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9mZnNldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghbGVuZ3RoKSByZXR1cm4gblxuICAgIHJldHVybiBuIC0gbGVuZ3RoICogTWF0aC5jZWlsKChuIC0gbWF4KSAvIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IExpbWl0VHlwZSA9IHtcbiAgICBsZW5ndGgsXG4gICAgbWF4LFxuICAgIG1pbixcbiAgICBjb25zdHJhaW4sXG4gICAgcmVhY2hlZEFueSxcbiAgICByZWFjaGVkTWF4LFxuICAgIHJlYWNoZWRNaW4sXG4gICAgcmVtb3ZlT2Zmc2V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0IH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBDb3VudGVyVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogbnVtYmVyKSA9PiBDb3VudGVyVHlwZVxuICBhZGQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGNsb25lOiAoKSA9PiBDb3VudGVyVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ291bnRlcihcbiAgbWF4OiBudW1iZXIsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGxvb3A6IGJvb2xlYW5cbik6IENvdW50ZXJUeXBlIHtcbiAgY29uc3QgeyBjb25zdHJhaW4gfSA9IExpbWl0KDAsIG1heClcbiAgY29uc3QgbG9vcEVuZCA9IG1heCArIDFcbiAgbGV0IGNvdW50ZXIgPSB3aXRoaW5MaW1pdChzdGFydClcblxuICBmdW5jdGlvbiB3aXRoaW5MaW1pdChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAhbG9vcCA/IGNvbnN0cmFpbihuKSA6IG1hdGhBYnMoKGxvb3BFbmQgKyBuKSAlIGxvb3BFbmQpXG4gIH1cblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY291bnRlclxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICBjb3VudGVyID0gd2l0aGluTGltaXQobilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICByZXR1cm4gY2xvbmUoKS5zZXQoZ2V0KCkgKyBuKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmUoKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBDb3VudGVyKG1heCwgZ2V0KCksIGxvb3ApXG4gIH1cblxuICBjb25zdCBzZWxmOiBDb3VudGVyVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBjbG9uZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlclR5cGUsIFBvaW50ZXJFdmVudFR5cGUgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHtcbiAgZGVsdGFBYnMsXG4gIGZhY3RvckFicyxcbiAgaXNCb29sZWFuLFxuICBpc01vdXNlRXZlbnQsXG4gIG1hdGhBYnMsXG4gIG1hdGhTaWduLFxuICBXaW5kb3dUeXBlXG59IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRHJhZ0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBQb2ludGVyRXZlbnRUeXBlXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBEcmFnSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBwb2ludGVyRG93bjogKCkgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ0hhbmRsZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICByb290Tm9kZTogSFRNTEVsZW1lbnQsXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGRyYWdUcmFja2VyOiBEcmFnVHJhY2tlclR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIGluZGV4OiBDb3VudGVyVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZSxcbiAgZHJhZ0ZyZWU6IGJvb2xlYW4sXG4gIGRyYWdUaHJlc2hvbGQ6IG51bWJlcixcbiAgc2tpcFNuYXBzOiBib29sZWFuLFxuICBiYXNlRnJpY3Rpb246IG51bWJlcixcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbik6IERyYWdIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IHsgY3Jvc3M6IGNyb3NzQXhpcywgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGZvY3VzTm9kZXMgPSBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddXG4gIGNvbnN0IG5vblBhc3NpdmVFdmVudCA9IHsgcGFzc2l2ZTogZmFsc2UgfVxuICBjb25zdCBpbml0RXZlbnRzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGRyYWdFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZ29Ub05leHRUaHJlc2hvbGQgPSBMaW1pdCg1MCwgMjI1KS5jb25zdHJhaW4ocGVyY2VudE9mVmlldy5tZWFzdXJlKDIwKSlcbiAgY29uc3Qgc25hcEZvcmNlQm9vc3QgPSB7IG1vdXNlOiAzMDAsIHRvdWNoOiA0MDAgfVxuICBjb25zdCBmcmVlRm9yY2VCb29zdCA9IHsgbW91c2U6IDUwMCwgdG91Y2g6IDYwMCB9XG4gIGNvbnN0IGJhc2VTcGVlZCA9IGRyYWdGcmVlID8gNDMgOiAyNVxuXG4gIGxldCBpc01vdmluZyA9IGZhbHNlXG4gIGxldCBzdGFydFNjcm9sbCA9IDBcbiAgbGV0IHN0YXJ0Q3Jvc3MgPSAwXG4gIGxldCBwb2ludGVySXNEb3duID0gZmFsc2VcbiAgbGV0IHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICBsZXQgcHJldmVudENsaWNrID0gZmFsc2VcbiAgbGV0IGlzTW91c2UgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaERyYWcpIHJldHVyblxuXG4gICAgZnVuY3Rpb24gZG93bklmQWxsb3dlZChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hEcmFnKSB8fCB3YXRjaERyYWcoZW1ibGFBcGksIGV2dCkpIGRvd24oZXZ0KVxuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZVxuICAgIGluaXRFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ2RyYWdzdGFydCcsIChldnQpID0+IGV2dC5wcmV2ZW50RGVmYXVsdCgpLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCAoKSA9PiB1bmRlZmluZWQsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgKCkgPT4gdW5kZWZpbmVkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hzdGFydCcsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZWRvd24nLCBkb3duSWZBbGxvd2VkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hjYW5jZWwnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NvbnRleHRtZW51JywgdXApXG4gICAgICAuYWRkKG5vZGUsICdjbGljaycsIGNsaWNrLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpbml0RXZlbnRzLmNsZWFyKClcbiAgICBkcmFnRXZlbnRzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERyYWdFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IGlzTW91c2UgPyBvd25lckRvY3VtZW50IDogcm9vdE5vZGVcbiAgICBkcmFnRXZlbnRzXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGVuZCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnbW91c2Vtb3ZlJywgbW92ZSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAnbW91c2V1cCcsIHVwKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNGb2N1c05vZGUobm9kZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZSB8fCAnJ1xuICAgIHJldHVybiBmb2N1c05vZGVzLmluY2x1ZGVzKG5vZGVOYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gZm9yY2VCb29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGJvb3N0ID0gZHJhZ0ZyZWUgPyBmcmVlRm9yY2VCb29zdCA6IHNuYXBGb3JjZUJvb3N0XG4gICAgY29uc3QgdHlwZSA9IGlzTW91c2UgPyAnbW91c2UnIDogJ3RvdWNoJ1xuICAgIHJldHVybiBib29zdFt0eXBlXVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dlZEZvcmNlKGZvcmNlOiBudW1iZXIsIHRhcmdldENoYW5nZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IG5leHQgPSBpbmRleC5hZGQobWF0aFNpZ24oZm9yY2UpICogLTEpXG4gICAgY29uc3QgYmFzZUZvcmNlID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSkuZGlzdGFuY2VcblxuICAgIGlmIChkcmFnRnJlZSB8fCBtYXRoQWJzKGZvcmNlKSA8IGdvVG9OZXh0VGhyZXNob2xkKSByZXR1cm4gYmFzZUZvcmNlXG4gICAgaWYgKHNraXBTbmFwcyAmJiB0YXJnZXRDaGFuZ2VkKSByZXR1cm4gYmFzZUZvcmNlICogMC41XG5cbiAgICByZXR1cm4gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgobmV4dC5nZXQoKSwgMCkuZGlzdGFuY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNNb3VzZUV2dCA9IGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KVxuICAgIGlzTW91c2UgPSBpc01vdXNlRXZ0XG4gICAgcHJldmVudENsaWNrID0gZHJhZ0ZyZWUgJiYgaXNNb3VzZUV2dCAmJiAhZXZ0LmJ1dHRvbnMgJiYgaXNNb3ZpbmdcbiAgICBpc01vdmluZyA9IGRlbHRhQWJzKHRhcmdldC5nZXQoKSwgbG9jYXRpb24uZ2V0KCkpID49IDJcblxuICAgIGlmIChpc01vdXNlRXZ0ICYmIGV2dC5idXR0b24gIT09IDApIHJldHVyblxuICAgIGlmIChpc0ZvY3VzTm9kZShldnQudGFyZ2V0IGFzIEVsZW1lbnQpKSByZXR1cm5cblxuICAgIHBvaW50ZXJJc0Rvd24gPSB0cnVlXG4gICAgZHJhZ1RyYWNrZXIucG9pbnRlckRvd24oZXZ0KVxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMCkudXNlRHVyYXRpb24oMClcbiAgICB0YXJnZXQuc2V0KGxvY2F0aW9uKVxuICAgIGFkZERyYWdFdmVudHMoKVxuICAgIHN0YXJ0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBzdGFydENyb3NzID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dCwgY3Jvc3NBeGlzKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb2ludGVyRG93bicpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzVG91Y2hFdnQgPSAhaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaWYgKGlzVG91Y2hFdnQgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDIpIHJldHVybiB1cChldnQpXG5cbiAgICBjb25zdCBsYXN0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBjb25zdCBsYXN0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgY29uc3QgZGlmZlNjcm9sbCA9IGRlbHRhQWJzKGxhc3RTY3JvbGwsIHN0YXJ0U2Nyb2xsKVxuICAgIGNvbnN0IGRpZmZDcm9zcyA9IGRlbHRhQWJzKGxhc3RDcm9zcywgc3RhcnRDcm9zcylcblxuICAgIGlmICghcHJldmVudFNjcm9sbCAmJiAhaXNNb3VzZSkge1xuICAgICAgaWYgKCFldnQuY2FuY2VsYWJsZSkgcmV0dXJuIHVwKGV2dClcbiAgICAgIHByZXZlbnRTY3JvbGwgPSBkaWZmU2Nyb2xsID4gZGlmZkNyb3NzXG4gICAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHJldHVybiB1cChldnQpXG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBkcmFnVHJhY2tlci5wb2ludGVyTW92ZShldnQpXG4gICAgaWYgKGRpZmZTY3JvbGwgPiBkcmFnVGhyZXNob2xkKSBwcmV2ZW50Q2xpY2sgPSB0cnVlXG5cbiAgICBzY3JvbGxCb2R5LnVzZUZyaWN0aW9uKDAuMykudXNlRHVyYXRpb24oMC43NSlcbiAgICBhbmltYXRpb24uc3RhcnQoKVxuICAgIHRhcmdldC5hZGQoZGlyZWN0aW9uKGRpZmYpKVxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TG9jYXRpb24gPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZSgwLCBmYWxzZSlcbiAgICBjb25zdCB0YXJnZXRDaGFuZ2VkID0gY3VycmVudExvY2F0aW9uLmluZGV4ICE9PSBpbmRleC5nZXQoKVxuICAgIGNvbnN0IHJhd0ZvcmNlID0gZHJhZ1RyYWNrZXIucG9pbnRlclVwKGV2dCkgKiBmb3JjZUJvb3N0KClcbiAgICBjb25zdCBmb3JjZSA9IGFsbG93ZWRGb3JjZShkaXJlY3Rpb24ocmF3Rm9yY2UpLCB0YXJnZXRDaGFuZ2VkKVxuICAgIGNvbnN0IGZvcmNlRmFjdG9yID0gZmFjdG9yQWJzKHJhd0ZvcmNlLCBmb3JjZSlcbiAgICBjb25zdCBzcGVlZCA9IGJhc2VTcGVlZCAtIDEwICogZm9yY2VGYWN0b3JcbiAgICBjb25zdCBmcmljdGlvbiA9IGJhc2VGcmljdGlvbiArIGZvcmNlRmFjdG9yIC8gNTBcblxuICAgIHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICAgIHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oc3BlZWQpLnVzZUZyaWN0aW9uKGZyaWN0aW9uKVxuICAgIHNjcm9sbFRvLmRpc3RhbmNlKGZvcmNlLCAhZHJhZ0ZyZWUpXG4gICAgaXNNb3VzZSA9IGZhbHNlXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJVcCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGljayhldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAocHJldmVudENsaWNrKSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb2ludGVySXNEb3duXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBvaW50ZXJEb3duXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNPcHRpb25UeXBlLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGlzTW91c2VFdmVudCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgUG9pbnRlckNvb3JkVHlwZSA9IGtleW9mIFRvdWNoIHwga2V5b2YgTW91c2VFdmVudFxuZXhwb3J0IHR5cGUgUG9pbnRlckV2ZW50VHlwZSA9IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50XG5cbmV4cG9ydCB0eXBlIERyYWdUcmFja2VyVHlwZSA9IHtcbiAgcG9pbnRlckRvd246IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICBwb2ludGVyTW92ZTogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJVcDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHJlYWRQb2ludDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdUcmFja2VyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IERyYWdUcmFja2VyVHlwZSB7XG4gIGNvbnN0IGxvZ0ludGVydmFsID0gMTcwXG5cbiAgbGV0IHN0YXJ0RXZlbnQ6IFBvaW50ZXJFdmVudFR5cGVcbiAgbGV0IGxhc3RFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuXG4gIGZ1bmN0aW9uIHJlYWRUaW1lKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGV2dC50aW1lU3RhbXBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRQb2ludChldnQ6IFBvaW50ZXJFdmVudFR5cGUsIGV2dEF4aXM/OiBBeGlzT3B0aW9uVHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBldnRBeGlzIHx8IGF4aXMuc2Nyb2xsXG4gICAgY29uc3QgY29vcmQ6IFBvaW50ZXJDb29yZFR5cGUgPSBgY2xpZW50JHtwcm9wZXJ0eSA9PT0gJ3gnID8gJ1gnIDogJ1knfWBcbiAgICByZXR1cm4gKGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KSA/IGV2dCA6IGV2dC50b3VjaGVzWzBdKVtjb29yZF1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgc3RhcnRFdmVudCA9IGV2dFxuICAgIGxhc3RFdmVudCA9IGV2dFxuICAgIHJldHVybiByZWFkUG9pbnQoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlck1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gcmVhZFBvaW50KGV2dCkgLSByZWFkUG9pbnQobGFzdEV2ZW50KVxuICAgIGNvbnN0IGV4cGlyZWQgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudCkgPiBsb2dJbnRlcnZhbFxuXG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgaWYgKGV4cGlyZWQpIHN0YXJ0RXZlbnQgPSBldnRcbiAgICByZXR1cm4gZGlmZlxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlclVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgaWYgKCFzdGFydEV2ZW50IHx8ICFsYXN0RXZlbnQpIHJldHVybiAwXG4gICAgY29uc3QgZGlmZkRyYWcgPSByZWFkUG9pbnQobGFzdEV2ZW50KSAtIHJlYWRQb2ludChzdGFydEV2ZW50KVxuICAgIGNvbnN0IGRpZmZUaW1lID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShsYXN0RXZlbnQpID4gbG9nSW50ZXJ2YWxcbiAgICBjb25zdCBmb3JjZSA9IGRpZmZEcmFnIC8gZGlmZlRpbWVcbiAgICBjb25zdCBpc0ZsaWNrID0gZGlmZlRpbWUgJiYgIWV4cGlyZWQgJiYgbWF0aEFicyhmb3JjZSkgPiAwLjFcblxuICAgIHJldHVybiBpc0ZsaWNrID8gZm9yY2UgOiAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnVHJhY2tlclR5cGUgPSB7XG4gICAgcG9pbnRlckRvd24sXG4gICAgcG9pbnRlck1vdmUsXG4gICAgcG9pbnRlclVwLFxuICAgIHJlYWRQb2ludFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJleHBvcnQgdHlwZSBOb2RlUmVjdFR5cGUgPSB7XG4gIHRvcDogbnVtYmVyXG4gIHJpZ2h0OiBudW1iZXJcbiAgYm90dG9tOiBudW1iZXJcbiAgbGVmdDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTm9kZVJlY3RzVHlwZSA9IHtcbiAgbWVhc3VyZTogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBOb2RlUmVjdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGVSZWN0cygpOiBOb2RlUmVjdHNUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShub2RlOiBIVE1MRWxlbWVudCk6IE5vZGVSZWN0VHlwZSB7XG4gICAgY29uc3QgeyBvZmZzZXRUb3AsIG9mZnNldExlZnQsIG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IG5vZGVcbiAgICBjb25zdCBvZmZzZXQ6IE5vZGVSZWN0VHlwZSA9IHtcbiAgICAgIHRvcDogb2Zmc2V0VG9wLFxuICAgICAgcmlnaHQ6IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCxcbiAgICAgIGJvdHRvbTogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxuICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgY29uc3Qgc2VsZjogTm9kZVJlY3RzVHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIFBlcmNlbnRPZlZpZXdUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnRPZlZpZXcodmlld1NpemU6IG51bWJlcik6IFBlcmNlbnRPZlZpZXdUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAqIChuIC8gMTAwKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgTm9kZVJlY3RzVHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgaXNCb29sZWFuLCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlc2l6ZUhhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgYXhpczogQXhpc1R5cGUsXG4gIHdhdGNoUmVzaXplOiBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSxcbiAgbm9kZVJlY3RzOiBOb2RlUmVjdHNUeXBlXG4pOiBSZXNpemVIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IG9ic2VydmVOb2RlcyA9IFtjb250YWluZXJdLmNvbmNhdChzbGlkZXMpXG4gIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXJcbiAgbGV0IGNvbnRhaW5lclNpemU6IG51bWJlclxuICBsZXQgc2xpZGVTaXplczogbnVtYmVyW10gPSBbXVxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiByZWFkU2l6ZShub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGF4aXMubWVhc3VyZVNpemUobm9kZVJlY3RzLm1lYXN1cmUobm9kZSkpXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hSZXNpemUpIHJldHVyblxuXG4gICAgY29udGFpbmVyU2l6ZSA9IHJlYWRTaXplKGNvbnRhaW5lcilcbiAgICBzbGlkZVNpemVzID0gc2xpZGVzLm1hcChyZWFkU2l6ZSlcblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgICBjb25zdCBpc0NvbnRhaW5lciA9IGVudHJ5LnRhcmdldCA9PT0gY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICBjb25zdCBsYXN0U2l6ZSA9IGlzQ29udGFpbmVyID8gY29udGFpbmVyU2l6ZSA6IHNsaWRlU2l6ZXNbc2xpZGVJbmRleF1cbiAgICAgICAgY29uc3QgbmV3U2l6ZSA9IHJlYWRTaXplKGlzQ29udGFpbmVyID8gY29udGFpbmVyIDogc2xpZGVzW3NsaWRlSW5kZXhdKVxuICAgICAgICBjb25zdCBkaWZmU2l6ZSA9IG1hdGhBYnMobmV3U2l6ZSAtIGxhc3RTaXplKVxuXG4gICAgICAgIGlmIChkaWZmU2l6ZSA+PSAwLjUpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKVxuXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoUmVzaXplKSB8fCB3YXRjaFJlc2l6ZShlbWJsYUFwaSwgZW50cmllcykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKGVudHJpZXMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBvYnNlcnZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShub2RlKSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoU2lnbiwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgZGlyZWN0aW9uOiAoKSA9PiBudW1iZXJcbiAgZHVyYXRpb246ICgpID0+IG51bWJlclxuICB2ZWxvY2l0eTogKCkgPT4gbnVtYmVyXG4gIHNlZWs6ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHNldHRsZWQ6ICgpID0+IGJvb2xlYW5cbiAgdXNlQmFzZUZyaWN0aW9uOiAoKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VCYXNlRHVyYXRpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUZyaWN0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VEdXJhdGlvbjogKG46IG51bWJlcikgPT4gU2Nyb2xsQm9keVR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbEJvZHkoXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIG9mZnNldExvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHByZXZpb3VzTG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGJhc2VEdXJhdGlvbjogbnVtYmVyLFxuICBiYXNlRnJpY3Rpb246IG51bWJlclxuKTogU2Nyb2xsQm9keVR5cGUge1xuICBsZXQgc2Nyb2xsVmVsb2NpdHkgPSAwXG4gIGxldCBzY3JvbGxEaXJlY3Rpb24gPSAwXG4gIGxldCBzY3JvbGxEdXJhdGlvbiA9IGJhc2VEdXJhdGlvblxuICBsZXQgc2Nyb2xsRnJpY3Rpb24gPSBiYXNlRnJpY3Rpb25cbiAgbGV0IHJhd0xvY2F0aW9uID0gbG9jYXRpb24uZ2V0KClcbiAgbGV0IHJhd0xvY2F0aW9uUHJldmlvdXMgPSAwXG5cbiAgZnVuY3Rpb24gc2VlaygpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgY29uc3QgZGlzcGxhY2VtZW50ID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBpc0luc3RhbnQgPSAhc2Nyb2xsRHVyYXRpb25cbiAgICBsZXQgc2Nyb2xsRGlzdGFuY2UgPSAwXG5cbiAgICBpZiAoaXNJbnN0YW50KSB7XG4gICAgICBzY3JvbGxWZWxvY2l0eSA9IDBcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KHRhcmdldClcbiAgICAgIGxvY2F0aW9uLnNldCh0YXJnZXQpXG5cbiAgICAgIHNjcm9sbERpc3RhbmNlID0gZGlzcGxhY2VtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzTG9jYXRpb24uc2V0KGxvY2F0aW9uKVxuXG4gICAgICBzY3JvbGxWZWxvY2l0eSArPSBkaXNwbGFjZW1lbnQgLyBzY3JvbGxEdXJhdGlvblxuICAgICAgc2Nyb2xsVmVsb2NpdHkgKj0gc2Nyb2xsRnJpY3Rpb25cbiAgICAgIHJhd0xvY2F0aW9uICs9IHNjcm9sbFZlbG9jaXR5XG4gICAgICBsb2NhdGlvbi5hZGQoc2Nyb2xsVmVsb2NpdHkpXG5cbiAgICAgIHNjcm9sbERpc3RhbmNlID0gcmF3TG9jYXRpb24gLSByYXdMb2NhdGlvblByZXZpb3VzXG4gICAgfVxuXG4gICAgc2Nyb2xsRGlyZWN0aW9uID0gbWF0aFNpZ24oc2Nyb2xsRGlzdGFuY2UpXG4gICAgcmF3TG9jYXRpb25QcmV2aW91cyA9IHJhd0xvY2F0aW9uXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHRsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZiA9IHRhcmdldC5nZXQoKSAtIG9mZnNldExvY2F0aW9uLmdldCgpXG4gICAgcmV0dXJuIG1hdGhBYnMoZGlmZikgPCAwLjAwMVxuICB9XG5cbiAgZnVuY3Rpb24gZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsRHVyYXRpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEaXJlY3Rpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbFZlbG9jaXR5XG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRHVyYXRpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VEdXJhdGlvbihiYXNlRHVyYXRpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VCYXNlRnJpY3Rpb24oKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHJldHVybiB1c2VGcmljdGlvbihiYXNlRnJpY3Rpb24pXG4gIH1cblxuICBmdW5jdGlvbiB1c2VEdXJhdGlvbihuOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgc2Nyb2xsRHVyYXRpb24gPSBuXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUZyaWN0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxGcmljdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQm9keVR5cGUgPSB7XG4gICAgZGlyZWN0aW9uLFxuICAgIGR1cmF0aW9uLFxuICAgIHZlbG9jaXR5LFxuICAgIHNlZWssXG4gICAgc2V0dGxlZCxcbiAgICB1c2VCYXNlRnJpY3Rpb24sXG4gICAgdXNlQmFzZUR1cmF0aW9uLFxuICAgIHVzZUZyaWN0aW9uLFxuICAgIHVzZUR1cmF0aW9uXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQm91bmRzVHlwZSA9IHtcbiAgc2hvdWxkQ29uc3RyYWluOiAoKSA9PiBib29sZWFuXG4gIGNvbnN0cmFpbjogKHBvaW50ZXJEb3duOiBib29sZWFuKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm91bmRzKFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlXG4pOiBTY3JvbGxCb3VuZHNUeXBlIHtcbiAgY29uc3QgcHVsbEJhY2tUaHJlc2hvbGQgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMTApXG4gIGNvbnN0IGVkZ2VPZmZzZXRUb2xlcmFuY2UgPSBwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoNTApXG4gIGNvbnN0IGZyaWN0aW9uTGltaXQgPSBMaW1pdCgwLjEsIDAuOTkpXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gc2hvdWxkQ29uc3RyYWluKCk6IGJvb2xlYW4ge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KHRhcmdldC5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIGlmICghbGltaXQucmVhY2hlZEFueShsb2NhdGlvbi5nZXQoKSkpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4ocG9pbnRlckRvd246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZENvbnN0cmFpbigpKSByZXR1cm5cbiAgICBjb25zdCBlZGdlID0gbGltaXQucmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSkgPyAnbWluJyA6ICdtYXgnXG4gICAgY29uc3QgZGlmZlRvRWRnZSA9IG1hdGhBYnMobGltaXRbZWRnZV0gLSBsb2NhdGlvbi5nZXQoKSlcbiAgICBjb25zdCBkaWZmVG9UYXJnZXQgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGZyaWN0aW9uID0gZnJpY3Rpb25MaW1pdC5jb25zdHJhaW4oZGlmZlRvRWRnZSAvIGVkZ2VPZmZzZXRUb2xlcmFuY2UpXG5cbiAgICB0YXJnZXQuc3VidHJhY3QoZGlmZlRvVGFyZ2V0ICogZnJpY3Rpb24pXG5cbiAgICBpZiAoIXBvaW50ZXJEb3duICYmIG1hdGhBYnMoZGlmZlRvVGFyZ2V0KSA8IHB1bGxCYWNrVGhyZXNob2xkKSB7XG4gICAgICB0YXJnZXQuc2V0KGxpbWl0LmNvbnN0cmFpbih0YXJnZXQuZ2V0KCkpKVxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigyNSkudXNlQmFzZUZyaWN0aW9uKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICAgIHNob3VsZENvbnN0cmFpbixcbiAgICBjb25zdHJhaW4sXG4gICAgdG9nZ2xlQWN0aXZlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgYXJyYXlJc0xhc3RJbmRleCwgYXJyYXlMYXN0LCBkZWx0YUFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5PcHRpb25UeXBlID0gZmFsc2UgfCAndHJpbVNuYXBzJyB8ICdrZWVwU25hcHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICBzbmFwc0NvbnRhaW5lZDogbnVtYmVyW11cbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbENvbnRhaW4oXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW10sXG4gIGNvbnRhaW5TY3JvbGw6IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTY3JvbGxDb250YWluVHlwZSB7XG4gIGNvbnN0IHNjcm9sbEJvdW5kcyA9IExpbWl0KC1jb250ZW50U2l6ZSArIHZpZXdTaXplLCAwKVxuICBjb25zdCBzbmFwc0JvdW5kZWQgPSBtZWFzdXJlQm91bmRlZCgpXG4gIGNvbnN0IHNjcm9sbENvbnRhaW5MaW1pdCA9IGZpbmRTY3JvbGxDb250YWluTGltaXQoKVxuICBjb25zdCBzbmFwc0NvbnRhaW5lZCA9IG1lYXN1cmVDb250YWluZWQoKVxuXG4gIGZ1bmN0aW9uIHVzZVBpeGVsVG9sZXJhbmNlKGJvdW5kOiBudW1iZXIsIHNuYXA6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkZWx0YUFicyhib3VuZCwgc25hcCkgPD0gMVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpOiBMaW1pdFR5cGUge1xuICAgIGNvbnN0IHN0YXJ0U25hcCA9IHNuYXBzQm91bmRlZFswXVxuICAgIGNvbnN0IGVuZFNuYXAgPSBhcnJheUxhc3Qoc25hcHNCb3VuZGVkKVxuICAgIGNvbnN0IG1pbiA9IHNuYXBzQm91bmRlZC5sYXN0SW5kZXhPZihzdGFydFNuYXApXG4gICAgY29uc3QgbWF4ID0gc25hcHNCb3VuZGVkLmluZGV4T2YoZW5kU25hcCkgKyAxXG4gICAgcmV0dXJuIExpbWl0KG1pbiwgbWF4KVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUJvdW5kZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbmFwc0FsaWduZWRcbiAgICAgIC5tYXAoKHNuYXBBbGlnbmVkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxCb3VuZHNcbiAgICAgICAgY29uc3Qgc25hcCA9IHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oc25hcEFsaWduZWQpXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChzbmFwc0FsaWduZWQsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIG1heFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtaW4sIHNuYXApKSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtYXgsIHNuYXApKSByZXR1cm4gbWF4XG4gICAgICAgIHJldHVybiBzbmFwXG4gICAgICB9KVxuICAgICAgLm1hcCgoc2Nyb2xsQm91bmQpID0+IHBhcnNlRmxvYXQoc2Nyb2xsQm91bmQudG9GaXhlZCgzKSkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQ29udGFpbmVkKCk6IG51bWJlcltdIHtcbiAgICBpZiAoY29udGVudFNpemUgPD0gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgcmV0dXJuIFtzY3JvbGxCb3VuZHMubWF4XVxuICAgIGlmIChjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJykgcmV0dXJuIHNuYXBzQm91bmRlZFxuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbENvbnRhaW5MaW1pdFxuICAgIHJldHVybiBzbmFwc0JvdW5kZWQuc2xpY2UobWluLCBtYXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgICBzbmFwc0NvbnRhaW5lZCxcbiAgICBzY3JvbGxDb250YWluTGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUxhc3QgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gIGxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExpbWl0KFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvb3A6IGJvb2xlYW5cbik6IFNjcm9sbExpbWl0VHlwZSB7XG4gIGNvbnN0IG1heCA9IHNjcm9sbFNuYXBzWzBdXG4gIGNvbnN0IG1pbiA9IGxvb3AgPyBtYXggLSBjb250ZW50U2l6ZSA6IGFycmF5TGFzdChzY3JvbGxTbmFwcylcbiAgY29uc3QgbGltaXQgPSBMaW1pdChtaW4sIG1heClcblxuICBjb25zdCBzZWxmOiBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gICAgbGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMb29wZXJUeXBlID0ge1xuICBsb29wOiAoZGlyZWN0aW9uOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExvb3BlcihcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdmVjdG9yczogVmVjdG9yMURUeXBlW11cbik6IFNjcm9sbExvb3BlclR5cGUge1xuICBjb25zdCBqb2ludFNhZmV0eSA9IDAuMVxuICBjb25zdCBtaW4gPSBsaW1pdC5taW4gKyBqb2ludFNhZmV0eVxuICBjb25zdCBtYXggPSBsaW1pdC5tYXggKyBqb2ludFNhZmV0eVxuICBjb25zdCB7IHJlYWNoZWRNaW4sIHJlYWNoZWRNYXggfSA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGZ1bmN0aW9uIHNob3VsZExvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAxKSByZXR1cm4gcmVhY2hlZE1heChsb2NhdGlvbi5nZXQoKSlcbiAgICBpZiAoZGlyZWN0aW9uID09PSAtMSkgcmV0dXJuIHJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRMb29wKGRpcmVjdGlvbikpIHJldHVyblxuXG4gICAgY29uc3QgbG9vcERpc3RhbmNlID0gY29udGVudFNpemUgKiAoZGlyZWN0aW9uICogLTEpXG4gICAgdmVjdG9ycy5mb3JFYWNoKCh2KSA9PiB2LmFkZChsb29wRGlzdGFuY2UpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsTG9vcGVyVHlwZSA9IHtcbiAgICBsb29wXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgZ2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKGxpbWl0OiBMaW1pdFR5cGUpOiBTY3JvbGxQcm9ncmVzc1R5cGUge1xuICBjb25zdCB7IG1heCwgbGVuZ3RoIH0gPSBsaW1pdFxuXG4gIGZ1bmN0aW9uIGdldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IG4gLSBtYXhcbiAgICByZXR1cm4gbGVuZ3RoID8gY3VycmVudExvY2F0aW9uIC8gLWxlbmd0aCA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgICBnZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50VHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gIHNuYXBzOiBudW1iZXJbXVxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxTbmFwcyhcbiAgYXhpczogQXhpc1R5cGUsXG4gIGFsaWdubWVudDogQWxpZ25tZW50VHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuKTogU2Nyb2xsU25hcHNUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgYWxpZ25tZW50cyA9IG1lYXN1cmVTaXplcygpLm1hcChhbGlnbm1lbnQubWVhc3VyZSlcbiAgY29uc3Qgc25hcHMgPSBtZWFzdXJlVW5hbGlnbmVkKClcbiAgY29uc3Qgc25hcHNBbGlnbmVkID0gbWVhc3VyZUFsaWduZWQoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTaXplcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNsaWRlUmVjdHMpXG4gICAgICAubWFwKChyZWN0cykgPT4gYXJyYXlMYXN0KHJlY3RzKVtlbmRFZGdlXSAtIHJlY3RzWzBdW3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlVW5hbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCkgPT4gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gcmVjdFtzdGFydEVkZ2VdKVxuICAgICAgLm1hcCgoc25hcCkgPT4gLW1hdGhBYnMoc25hcCkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQWxpZ25lZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNuYXBzKVxuICAgICAgLm1hcCgoZykgPT4gZ1swXSlcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiBzbmFwICsgYWxpZ25tZW50c1tpbmRleF0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gICAgc25hcHMsXG4gICAgc25hcHNBbGlnbmVkXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluT3B0aW9uVHlwZSB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQge1xuICBhcnJheUZyb21OdW1iZXIsXG4gIGFycmF5SXNMYXN0SW5kZXgsXG4gIGFycmF5TGFzdCxcbiAgYXJyYXlMYXN0SW5kZXhcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVSZWdpc3RyeVR5cGUgPSB7XG4gIHNsaWRlUmVnaXN0cnk6IG51bWJlcltdW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlUmVnaXN0cnkoXG4gIGNvbnRhaW5TbmFwczogYm9vbGVhbixcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGUsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGUsXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbik6IFNsaWRlUmVnaXN0cnlUeXBlIHtcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gIGNvbnN0IHNsaWRlUmVnaXN0cnkgPSBjcmVhdGVTbGlkZVJlZ2lzdHJ5KClcblxuICBmdW5jdGlvbiBjcmVhdGVTbGlkZVJlZ2lzdHJ5KCk6IG51bWJlcltdW10ge1xuICAgIGNvbnN0IGdyb3VwZWRTbGlkZUluZGV4ZXMgPSBncm91cFNsaWRlcyhzbGlkZUluZGV4ZXMpXG4gICAgY29uc3QgZG9Ob3RDb250YWluID0gIWNvbnRhaW5TbmFwcyB8fCBjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJ1xuXG4gICAgaWYgKHNjcm9sbFNuYXBzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIFtzbGlkZUluZGV4ZXNdXG4gICAgaWYgKGRvTm90Q29udGFpbikgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBncm91cGVkU2xpZGVJbmRleGVzLnNsaWNlKG1pbiwgbWF4KS5tYXAoKGdyb3VwLCBpbmRleCwgZ3JvdXBzKSA9PiB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KGdyb3VwcywgaW5kZXgpXG5cbiAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0KGdyb3Vwc1swXSkgKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UpXG4gICAgICB9XG4gICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0SW5kZXgoc2xpZGVJbmRleGVzKSAtIGFycmF5TGFzdChncm91cHMpWzBdICsgMVxuICAgICAgICByZXR1cm4gYXJyYXlGcm9tTnVtYmVyKHJhbmdlLCBhcnJheUxhc3QoZ3JvdXBzKVswXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBncm91cFxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgICBzbGlkZVJlZ2lzdHJ5XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgYXJyYXlMYXN0LCBtYXRoQWJzLCBtYXRoU2lnbiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRhcmdldFR5cGUgPSB7XG4gIGRpc3RhbmNlOiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICBieUluZGV4OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBUYXJnZXRUeXBlXG4gIGJ5RGlzdGFuY2U6IChmb3JjZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiBUYXJnZXRUeXBlXG4gIHNob3J0Y3V0OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFRhcmdldChcbiAgbG9vcDogYm9vbGVhbixcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZVxuKTogU2Nyb2xsVGFyZ2V0VHlwZSB7XG4gIGNvbnN0IHsgcmVhY2hlZEFueSwgcmVtb3ZlT2Zmc2V0LCBjb25zdHJhaW4gfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gbWluRGlzdGFuY2UoZGlzdGFuY2VzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRpc3RhbmNlcy5jb25jYXQoKS5zb3J0KChhLCBiKSA9PiBtYXRoQWJzKGEpIC0gbWF0aEFicyhiKSlbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRUYXJnZXRTbmFwKHRhcmdldDogbnVtYmVyKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsb29wID8gcmVtb3ZlT2Zmc2V0KHRhcmdldCkgOiBjb25zdHJhaW4odGFyZ2V0KVxuICAgIGNvbnN0IGFzY0RpZmZzVG9TbmFwcyA9IHNjcm9sbFNuYXBzXG4gICAgICAubWFwKChzbmFwLCBpbmRleCkgPT4gKHsgZGlmZjogc2hvcnRjdXQoc25hcCAtIGRpc3RhbmNlLCAwKSwgaW5kZXggfSkpXG4gICAgICAuc29ydCgoZDEsIGQyKSA9PiBtYXRoQWJzKGQxLmRpZmYpIC0gbWF0aEFicyhkMi5kaWZmKSlcblxuICAgIGNvbnN0IHsgaW5kZXggfSA9IGFzY0RpZmZzVG9TbmFwc1swXVxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG9ydGN1dCh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhcmdldHMgPSBbdGFyZ2V0LCB0YXJnZXQgKyBjb250ZW50U2l6ZSwgdGFyZ2V0IC0gY29udGVudFNpemVdXG5cbiAgICBpZiAoIWxvb3ApIHJldHVybiB0YXJnZXRcbiAgICBpZiAoIWRpcmVjdGlvbikgcmV0dXJuIG1pbkRpc3RhbmNlKHRhcmdldHMpXG5cbiAgICBjb25zdCBtYXRjaGluZ1RhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gbWF0aFNpZ24odCkgPT09IGRpcmVjdGlvbilcbiAgICBpZiAobWF0Y2hpbmdUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIG1pbkRpc3RhbmNlKG1hdGNoaW5nVGFyZ2V0cylcbiAgICByZXR1cm4gYXJyYXlMYXN0KHRhcmdldHMpIC0gY29udGVudFNpemVcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5SW5kZXgoaW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaWZmVG9TbmFwID0gc2Nyb2xsU25hcHNbaW5kZXhdIC0gdGFyZ2V0VmVjdG9yLmdldCgpXG4gICAgY29uc3QgZGlzdGFuY2UgPSBzaG9ydGN1dChkaWZmVG9TbmFwLCBkaXJlY3Rpb24pXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5RGlzdGFuY2UoZGlzdGFuY2U6IG51bWJlciwgc25hcDogYm9vbGVhbik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldFZlY3Rvci5nZXQoKSArIGRpc3RhbmNlXG4gICAgY29uc3QgeyBpbmRleCwgZGlzdGFuY2U6IHRhcmdldFNuYXBEaXN0YW5jZSB9ID0gZmluZFRhcmdldFNuYXAodGFyZ2V0KVxuICAgIGNvbnN0IHJlYWNoZWRCb3VuZCA9ICFsb29wICYmIHJlYWNoZWRBbnkodGFyZ2V0KVxuXG4gICAgaWYgKCFzbmFwIHx8IHJlYWNoZWRCb3VuZCkgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cblxuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRTbmFwRGlzdGFuY2VcbiAgICBjb25zdCBzbmFwRGlzdGFuY2UgPSBkaXN0YW5jZSArIHNob3J0Y3V0KGRpZmZUb1NuYXAsIDApXG5cbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2U6IHNuYXBEaXN0YW5jZSB9XG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICAgIGJ5RGlzdGFuY2UsXG4gICAgYnlJbmRleCxcbiAgICBzaG9ydGN1dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25zVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlLCBUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxUb1R5cGUgPSB7XG4gIGRpc3RhbmNlOiAobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiB2b2lkXG4gIGluZGV4OiAobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVG8oXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIGluZGV4Q3VycmVudDogQ291bnRlclR5cGUsXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBTY3JvbGxUb1R5cGUge1xuICBmdW5jdGlvbiBzY3JvbGxUbyh0YXJnZXQ6IFRhcmdldFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkaXN0YW5jZURpZmYgPSB0YXJnZXQuZGlzdGFuY2VcbiAgICBjb25zdCBpbmRleERpZmYgPSB0YXJnZXQuaW5kZXggIT09IGluZGV4Q3VycmVudC5nZXQoKVxuXG4gICAgdGFyZ2V0VmVjdG9yLmFkZChkaXN0YW5jZURpZmYpXG5cbiAgICBpZiAoZGlzdGFuY2VEaWZmKSB7XG4gICAgICBpZiAoc2Nyb2xsQm9keS5kdXJhdGlvbigpKSB7XG4gICAgICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgICAgYW5pbWF0aW9uLnJlbmRlcigxKVxuICAgICAgICBhbmltYXRpb24udXBkYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kZXhEaWZmKSB7XG4gICAgICBpbmRleFByZXZpb3VzLnNldChpbmRleEN1cnJlbnQuZ2V0KCkpXG4gICAgICBpbmRleEN1cnJlbnQuc2V0KHRhcmdldC5pbmRleClcbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzZWxlY3QnKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlKG46IG51bWJlciwgc25hcDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKG4sIHNuYXApXG4gICAgc2Nyb2xsVG8odGFyZ2V0KVxuICB9XG5cbiAgZnVuY3Rpb24gaW5kZXgobjogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gaW5kZXhDdXJyZW50LmNsb25lKCkuc2V0KG4pXG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgodGFyZ2V0SW5kZXguZ2V0KCksIGRpcmVjdGlvbilcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUb1R5cGUgPSB7XG4gICAgZGlzdGFuY2UsXG4gICAgaW5kZXhcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgaXNCb29sZWFuLCBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRm9jdXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGV2dDogRm9jdXNFdmVudFxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBGb2N1c0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IEZvY3VzSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVGb2N1cyhcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHdhdGNoRm9jdXM6IEZvY3VzSGFuZGxlck9wdGlvblR5cGVcbik6IFNsaWRlRm9jdXNUeXBlIHtcbiAgY29uc3QgZm9jdXNMaXN0ZW5lck9wdGlvbnMgPSB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IHRydWUgfVxuICBsZXQgbGFzdFRhYlByZXNzVGltZSA9IDBcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hGb2N1cykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2soaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgY29uc3Qgbm93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICBjb25zdCBkaWZmVGltZSA9IG5vd1RpbWUgLSBsYXN0VGFiUHJlc3NUaW1lXG5cbiAgICAgIGlmIChkaWZmVGltZSA+IDEwKSByZXR1cm5cblxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXNTdGFydCcpXG4gICAgICByb290LnNjcm9sbExlZnQgPSAwXG5cbiAgICAgIGNvbnN0IGdyb3VwID0gc2xpZGVSZWdpc3RyeS5maW5kSW5kZXgoKGdyb3VwKSA9PiBncm91cC5pbmNsdWRlcyhpbmRleCkpXG5cbiAgICAgIGlmICghaXNOdW1iZXIoZ3JvdXApKSByZXR1cm5cblxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigwKVxuICAgICAgc2Nyb2xsVG8uaW5kZXgoZ3JvdXAsIDApXG5cbiAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZUZvY3VzJylcbiAgICB9XG5cbiAgICBldmVudFN0b3JlLmFkZChkb2N1bWVudCwgJ2tleWRvd24nLCByZWdpc3RlclRhYlByZXNzLCBmYWxzZSlcblxuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgZXZlbnRTdG9yZS5hZGQoXG4gICAgICAgIHNsaWRlLFxuICAgICAgICAnZm9jdXMnLFxuICAgICAgICAoZXZ0OiBGb2N1c0V2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaEZvY3VzKSB8fCB3YXRjaEZvY3VzKGVtYmxhQXBpLCBldnQpKSB7XG4gICAgICAgICAgICBkZWZhdWx0Q2FsbGJhY2soc2xpZGVJbmRleClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzTGlzdGVuZXJPcHRpb25zXG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVGFiUHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ1RhYicpIGxhc3RUYWJQcmVzc1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVGb2N1c1R5cGUgPSB7XG4gICAgaW5pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFZlY3RvcjFEVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIGFkZDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxuICBzdWJ0cmFjdDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVmVjdG9yMUQoaW5pdGlhbFZhbHVlOiBudW1iZXIpOiBWZWN0b3IxRFR5cGUge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWVcblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgKz0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlIC09IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVJbnB1dChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpc051bWJlcihuKSA/IG4gOiBuLmdldCgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBWZWN0b3IxRFR5cGUgPSB7XG4gICAgZ2V0LFxuICAgIHNldCxcbiAgICBhZGQsXG4gICAgc3VidHJhY3RcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyByb3VuZFRvVHdvRGVjaW1hbHMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBUcmFuc2xhdGVUeXBlID0ge1xuICBjbGVhcjogKCkgPT4gdm9pZFxuICB0bzogKHRhcmdldDogbnVtYmVyKSA9PiB2b2lkXG4gIHRvZ2dsZUFjdGl2ZTogKGFjdGl2ZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNsYXRlKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuKTogVHJhbnNsYXRlVHlwZSB7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IGF4aXMuc2Nyb2xsID09PSAneCcgPyB4IDogeVxuICBjb25zdCBjb250YWluZXJTdHlsZSA9IGNvbnRhaW5lci5zdHlsZVxuICBsZXQgcHJldmlvdXNUYXJnZXQ6IG51bWJlciB8IG51bGwgPSBudWxsXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24geChuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoJHtufXB4LDBweCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24geShuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoMHB4LCR7bn1weCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24gdG8odGFyZ2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuXG4gICAgY29uc3QgbmV3VGFyZ2V0ID0gcm91bmRUb1R3b0RlY2ltYWxzKGF4aXMuZGlyZWN0aW9uKHRhcmdldCkpXG4gICAgaWYgKG5ld1RhcmdldCA9PT0gcHJldmlvdXNUYXJnZXQpIHJldHVyblxuXG4gICAgY29udGFpbmVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNsYXRlKG5ld1RhcmdldClcbiAgICBwcmV2aW91c1RhcmdldCA9IG5ld1RhcmdldFxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIGlmICghY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogVHJhbnNsYXRlVHlwZSA9IHtcbiAgICBjbGVhcixcbiAgICB0byxcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBhcnJheUtleXMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcblxudHlwZSBTbGlkZUJvdW5kVHlwZSA9IHtcbiAgc3RhcnQ6IG51bWJlclxuICBlbmQ6IG51bWJlclxufVxuXG50eXBlIExvb3BQb2ludFR5cGUgPSB7XG4gIGxvb3BQb2ludDogbnVtYmVyXG4gIGluZGV4OiBudW1iZXJcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICB0YXJnZXQ6ICgpID0+IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTbGlkZUxvb3BlclR5cGUgPSB7XG4gIGNhbkxvb3A6ICgpID0+IGJvb2xlYW5cbiAgY2xlYXI6ICgpID0+IHZvaWRcbiAgbG9vcDogKCkgPT4gdm9pZFxuICBsb29wUG9pbnRzOiBMb29wUG9pbnRUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlTG9vcGVyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc2xpZGVTaXplczogbnVtYmVyW10sXG4gIHNsaWRlU2l6ZXNXaXRoR2FwczogbnVtYmVyW10sXG4gIHNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W11cbik6IFNsaWRlTG9vcGVyVHlwZSB7XG4gIGNvbnN0IHJvdW5kaW5nU2FmZXR5ID0gMC41XG4gIGNvbnN0IGFzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgZGVzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcykucmV2ZXJzZSgpXG4gIGNvbnN0IGxvb3BQb2ludHMgPSBzdGFydFBvaW50cygpLmNvbmNhdChlbmRQb2ludHMoKSlcblxuICBmdW5jdGlvbiByZW1vdmVTbGlkZVNpemVzKGluZGV4ZXM6IG51bWJlcltdLCBmcm9tOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleGVzLnJlZHVjZSgoYTogbnVtYmVyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYSAtIHNsaWRlU2l6ZXNXaXRoR2Fwc1tpXVxuICAgIH0sIGZyb20pXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJbkdhcChpbmRleGVzOiBudW1iZXJbXSwgZ2FwOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXJbXSwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVtYWluaW5nR2FwID0gcmVtb3ZlU2xpZGVTaXplcyhhLCBnYXApXG4gICAgICByZXR1cm4gcmVtYWluaW5nR2FwID4gMCA/IGEuY29uY2F0KFtpXSkgOiBhXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0OiBudW1iZXIpOiBTbGlkZUJvdW5kVHlwZVtdIHtcbiAgICByZXR1cm4gc25hcHMubWFwKChzbmFwLCBpbmRleCkgPT4gKHtcbiAgICAgIHN0YXJ0OiBzbmFwIC0gc2xpZGVTaXplc1tpbmRleF0gKyByb3VuZGluZ1NhZmV0eSArIG9mZnNldCxcbiAgICAgIGVuZDogc25hcCArIHZpZXdTaXplIC0gcm91bmRpbmdTYWZldHkgKyBvZmZzZXRcbiAgICB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRMb29wUG9pbnRzKFxuICAgIGluZGV4ZXM6IG51bWJlcltdLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGlzRW5kRWRnZTogYm9vbGVhblxuICApOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IHNsaWRlQm91bmRzID0gZmluZFNsaWRlQm91bmRzKG9mZnNldClcblxuICAgIHJldHVybiBpbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBpc0VuZEVkZ2UgPyAwIDogLWNvbnRlbnRTaXplXG4gICAgICBjb25zdCBhbHRlcmVkID0gaXNFbmRFZGdlID8gY29udGVudFNpemUgOiAwXG4gICAgICBjb25zdCBib3VuZEVkZ2UgPSBpc0VuZEVkZ2UgPyAnZW5kJyA6ICdzdGFydCdcbiAgICAgIGNvbnN0IGxvb3BQb2ludCA9IHNsaWRlQm91bmRzW2luZGV4XVtib3VuZEVkZ2VdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBsb29wUG9pbnQsXG4gICAgICAgIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEKC0xKSxcbiAgICAgICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgc2xpZGVzW2luZGV4XSksXG4gICAgICAgIHRhcmdldDogKCkgPT4gKGxvY2F0aW9uLmdldCgpID4gbG9vcFBvaW50ID8gaW5pdGlhbCA6IGFsdGVyZWQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gc2Nyb2xsU25hcHNbMF1cbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoZGVzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIGNvbnRlbnRTaXplLCBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFBvaW50cygpOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IGdhcCA9IHZpZXdTaXplIC0gc2Nyb2xsU25hcHNbMF0gLSAxXG4gICAgY29uc3QgaW5kZXhlcyA9IHNsaWRlc0luR2FwKGFzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIC1jb250ZW50U2l6ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvb3BQb2ludHMuZXZlcnkoKHsgaW5kZXggfSkgPT4ge1xuICAgICAgY29uc3Qgb3RoZXJJbmRleGVzID0gYXNjSXRlbXMuZmlsdGVyKChpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIHJldHVybiByZW1vdmVTbGlkZVNpemVzKG90aGVySW5kZXhlcywgdmlld1NpemUpIDw9IDAuMVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCwgdHJhbnNsYXRlLCBzbGlkZUxvY2F0aW9uIH0gPSBsb29wUG9pbnRcbiAgICAgIGNvbnN0IHNoaWZ0TG9jYXRpb24gPSB0YXJnZXQoKVxuICAgICAgaWYgKHNoaWZ0TG9jYXRpb24gPT09IHNsaWRlTG9jYXRpb24uZ2V0KCkpIHJldHVyblxuICAgICAgdHJhbnNsYXRlLnRvKHNoaWZ0TG9jYXRpb24pXG4gICAgICBzbGlkZUxvY2F0aW9uLnNldChzaGlmdExvY2F0aW9uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsb29wUG9pbnRzLmZvckVhY2goKGxvb3BQb2ludCkgPT4gbG9vcFBvaW50LnRyYW5zbGF0ZS5jbGVhcigpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVMb29wZXJUeXBlID0ge1xuICAgIGNhbkxvb3AsXG4gICAgY2xlYXIsXG4gICAgbG9vcCxcbiAgICBsb29wUG9pbnRzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0hhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hTbGlkZXM6IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlXG4pOiBTbGlkZXNIYW5kbGVyVHlwZSB7XG4gIGxldCBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFNsaWRlcykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZXNDaGFuZ2VkJylcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaFNsaWRlcykgfHwgd2F0Y2hTbGlkZXMoZW1ibGFBcGksIG11dGF0aW9ucykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKG11dGF0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXIpIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IG9iamVjdEtleXMgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHtcbiAgW2tleTogbnVtYmVyXTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVxufVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSA9IEludGVyc2VjdGlvbk9ic2VydmVySW5pdFsndGhyZXNob2xkJ11cblxuZXhwb3J0IHR5cGUgU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIGdldDogKGluVmlldz86IGJvb2xlYW4pID0+IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNJblZpZXcoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB0aHJlc2hvbGQ6IFNsaWRlc0luVmlld09wdGlvbnNUeXBlXG4pOiBTbGlkZXNJblZpZXdUeXBlIHtcbiAgY29uc3QgaW50ZXJzZWN0aW9uRW50cnlNYXA6IEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHt9XG4gIGxldCBpblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgbm90SW5WaWV3Q2FjaGU6IG51bWJlcltdIHwgbnVsbCA9IG51bGxcbiAgbGV0IGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgKGVudHJpZXMpID0+IHtcbiAgICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG5cbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2YoPEhUTUxFbGVtZW50PmVudHJ5LnRhcmdldClcbiAgICAgICAgICBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF0gPSBlbnRyeVxuICAgICAgICB9KVxuXG4gICAgICAgIGluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBub3RJblZpZXdDYWNoZSA9IG51bGxcbiAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0luVmlldycpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBjb250YWluZXIucGFyZW50RWxlbWVudCxcbiAgICAgICAgdGhyZXNob2xkXG4gICAgICB9XG4gICAgKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiBpbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHNsaWRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGludGVyc2VjdGlvbk9ic2VydmVyKSBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJblZpZXdMaXN0KGluVmlldzogYm9vbGVhbik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gb2JqZWN0S2V5cyhpbnRlcnNlY3Rpb25FbnRyeU1hcCkucmVkdWNlKFxuICAgICAgKGxpc3Q6IG51bWJlcltdLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleClcbiAgICAgICAgY29uc3QgeyBpc0ludGVyc2VjdGluZyB9ID0gaW50ZXJzZWN0aW9uRW50cnlNYXBbaW5kZXhdXG4gICAgICAgIGNvbnN0IGluVmlld01hdGNoID0gaW5WaWV3ICYmIGlzSW50ZXJzZWN0aW5nXG4gICAgICAgIGNvbnN0IG5vdEluVmlld01hdGNoID0gIWluVmlldyAmJiAhaXNJbnRlcnNlY3RpbmdcblxuICAgICAgICBpZiAoaW5WaWV3TWF0Y2ggfHwgbm90SW5WaWV3TWF0Y2gpIGxpc3QucHVzaChpbmRleClcbiAgICAgICAgcmV0dXJuIGxpc3RcbiAgICAgIH0sXG4gICAgICBbXVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldChpblZpZXc6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICAgIGlmIChpblZpZXcgJiYgaW5WaWV3Q2FjaGUpIHJldHVybiBpblZpZXdDYWNoZVxuICAgIGlmICghaW5WaWV3ICYmIG5vdEluVmlld0NhY2hlKSByZXR1cm4gbm90SW5WaWV3Q2FjaGVcblxuICAgIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3KVxuXG4gICAgaWYgKGluVmlldykgaW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcbiAgICBpZiAoIWluVmlldykgbm90SW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBzbGlkZUluZGV4ZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc0luVmlld1R5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIGdldFxuICB9XG5cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVNpemVzVHlwZSA9IHtcbiAgc2xpZGVTaXplczogbnVtYmVyW11cbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXVxuICBzdGFydEdhcDogbnVtYmVyXG4gIGVuZEdhcDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZVNpemVzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICByZWFkRWRnZUdhcDogYm9vbGVhbixcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IFNsaWRlU2l6ZXNUeXBlIHtcbiAgY29uc3QgeyBtZWFzdXJlU2l6ZSwgc3RhcnRFZGdlLCBlbmRFZGdlIH0gPSBheGlzXG4gIGNvbnN0IHdpdGhFZGdlR2FwID0gc2xpZGVSZWN0c1swXSAmJiByZWFkRWRnZUdhcFxuICBjb25zdCBzdGFydEdhcCA9IG1lYXN1cmVTdGFydEdhcCgpXG4gIGNvbnN0IGVuZEdhcCA9IG1lYXN1cmVFbmRHYXAoKVxuICBjb25zdCBzbGlkZVNpemVzID0gc2xpZGVSZWN0cy5tYXAobWVhc3VyZVNpemUpXG4gIGNvbnN0IHNsaWRlU2l6ZXNXaXRoR2FwcyA9IG1lYXN1cmVXaXRoR2FwcygpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVN0YXJ0R2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzbGlkZVJlY3QgPSBzbGlkZVJlY3RzWzBdXG4gICAgcmV0dXJuIG1hdGhBYnMoY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0W3N0YXJ0RWRnZV0pXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlRW5kR2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJyYXlMYXN0KHNsaWRlcykpXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShgbWFyZ2luLSR7ZW5kRWRnZX1gKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVXaXRoR2FwcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNsaWRlUmVjdHNcbiAgICAgIC5tYXAoKHJlY3QsIGluZGV4LCByZWN0cykgPT4ge1xuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgocmVjdHMsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgc3RhcnRHYXBcbiAgICAgICAgaWYgKGlzTGFzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgZW5kR2FwXG4gICAgICAgIHJldHVybiByZWN0c1tpbmRleCArIDFdW3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV1cbiAgICAgIH0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVNpemVzVHlwZSA9IHtcbiAgICBzbGlkZVNpemVzLFxuICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXBcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7XG4gIGFycmF5S2V5cyxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleCxcbiAgaXNOdW1iZXIsXG4gIG1hdGhBYnNcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlID0gJ2F1dG8nIHwgbnVtYmVyXG5cbmV4cG9ydCB0eXBlIFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgZ3JvdXBTbGlkZXM6IDxUeXBlPihhcnJheTogVHlwZVtdKSA9PiBUeXBlW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzVG9TY3JvbGwoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlLFxuICBsb29wOiBib29sZWFuLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzdGFydEdhcDogbnVtYmVyLFxuICBlbmRHYXA6IG51bWJlcixcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2xpZGVzVG9TY3JvbGxUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UsIGRpcmVjdGlvbiB9ID0gYXhpc1xuICBjb25zdCBncm91cEJ5TnVtYmVyID0gaXNOdW1iZXIoc2xpZGVzVG9TY3JvbGwpXG5cbiAgZnVuY3Rpb24gYnlOdW1iZXI8VHlwZT4oYXJyYXk6IFR5cGVbXSwgZ3JvdXBTaXplOiBudW1iZXIpOiBUeXBlW11bXSB7XG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgJSBncm91cFNpemUgPT09IDApXG4gICAgICAubWFwKChpKSA9PiBhcnJheS5zbGljZShpLCBpICsgZ3JvdXBTaXplKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5U2l6ZTxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gW11cblxuICAgIHJldHVybiBhcnJheUtleXMoYXJyYXkpXG4gICAgICAucmVkdWNlKChncm91cHM6IG51bWJlcltdLCByZWN0QiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdEEgPSBhcnJheUxhc3QoZ3JvdXBzKSB8fCAwXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSByZWN0QSA9PT0gMFxuICAgICAgICBjb25zdCBpc0xhc3QgPSByZWN0QiA9PT0gYXJyYXlMYXN0SW5kZXgoYXJyYXkpXG5cbiAgICAgICAgY29uc3QgZWRnZUEgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RBXVtzdGFydEVkZ2VdXG4gICAgICAgIGNvbnN0IGVkZ2VCID0gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0c1tyZWN0Ql1bZW5kRWRnZV1cbiAgICAgICAgY29uc3QgZ2FwQSA9ICFsb29wICYmIGlzRmlyc3QgPyBkaXJlY3Rpb24oc3RhcnRHYXApIDogMFxuICAgICAgICBjb25zdCBnYXBCID0gIWxvb3AgJiYgaXNMYXN0ID8gZGlyZWN0aW9uKGVuZEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IG1hdGhBYnMoZWRnZUIgLSBnYXBCIC0gKGVkZ2VBICsgZ2FwQSkpXG5cbiAgICAgICAgaWYgKGluZGV4ICYmIGNodW5rU2l6ZSA+IHZpZXdTaXplICsgcGl4ZWxUb2xlcmFuY2UpIGdyb3Vwcy5wdXNoKHJlY3RCKVxuICAgICAgICBpZiAoaXNMYXN0KSBncm91cHMucHVzaChhcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBncm91cHNcbiAgICAgIH0sIFtdKVxuICAgICAgLm1hcCgoY3VycmVudFNpemUsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTaXplID0gTWF0aC5tYXgoZ3JvdXBzW2luZGV4IC0gMV0gfHwgMClcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKHByZXZpb3VzU2l6ZSwgY3VycmVudFNpemUpXG4gICAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ3JvdXBTbGlkZXM8VHlwZT4oYXJyYXk6IFR5cGVbXSk6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gZ3JvdXBCeU51bWJlciA/IGJ5TnVtYmVyKGFycmF5LCBzbGlkZXNUb1Njcm9sbCkgOiBieVNpemUoYXJyYXkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNUb1Njcm9sbFR5cGUgPSB7XG4gICAgZ3JvdXBTbGlkZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50IH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQge1xuICBBbmltYXRpb25zLFxuICBBbmltYXRpb25zVHlwZSxcbiAgQW5pbWF0aW9uc1VwZGF0ZVR5cGUsXG4gIEFuaW1hdGlvbnNSZW5kZXJUeXBlXG59IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IEF4aXMsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgQ291bnRlciwgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnSGFuZGxlciwgRHJhZ0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IERyYWdUcmFja2VyIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmUsIEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSwgTm9kZVJlY3RzIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXcsIFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlciwgUmVzaXplSGFuZGxlclR5cGUgfSBmcm9tICcuL1Jlc2l6ZUhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5LCBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbEJvdW5kcywgU2Nyb2xsQm91bmRzVHlwZSB9IGZyb20gJy4vU2Nyb2xsQm91bmRzJ1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbiB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNjcm9sbExpbWl0IH0gZnJvbSAnLi9TY3JvbGxMaW1pdCdcbmltcG9ydCB7IFNjcm9sbExvb3BlciwgU2Nyb2xsTG9vcGVyVHlwZSB9IGZyb20gJy4vU2Nyb2xsTG9vcGVyJ1xuaW1wb3J0IHsgU2Nyb2xsUHJvZ3Jlc3MsIFNjcm9sbFByb2dyZXNzVHlwZSB9IGZyb20gJy4vU2Nyb2xsUHJvZ3Jlc3MnXG5pbXBvcnQgeyBTY3JvbGxTbmFwcyB9IGZyb20gJy4vU2Nyb2xsU25hcHMnXG5pbXBvcnQgeyBTbGlkZVJlZ2lzdHJ5LCBTbGlkZVJlZ2lzdHJ5VHlwZSB9IGZyb20gJy4vU2xpZGVSZWdpc3RyeSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldCwgU2Nyb2xsVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgU2Nyb2xsVG8sIFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBTbGlkZUZvY3VzLCBTbGlkZUZvY3VzVHlwZSB9IGZyb20gJy4vU2xpZGVGb2N1cydcbmltcG9ydCB7IFNsaWRlTG9vcGVyLCBTbGlkZUxvb3BlclR5cGUgfSBmcm9tICcuL1NsaWRlTG9vcGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlciwgU2xpZGVzSGFuZGxlclR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXcsIFNsaWRlc0luVmlld1R5cGUgfSBmcm9tICcuL1NsaWRlc0luVmlldydcbmltcG9ydCB7IFNsaWRlU2l6ZXMgfSBmcm9tICcuL1NsaWRlU2l6ZXMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbCwgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuaW1wb3J0IHsgYXJyYXlLZXlzLCBhcnJheUxhc3QsIGFycmF5TGFzdEluZGV4LCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFELCBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBFbmdpbmVUeXBlID0ge1xuICBvd25lckRvY3VtZW50OiBEb2N1bWVudFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbiAgYXhpczogQXhpc1R5cGVcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZVxuICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kc1R5cGVcbiAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXJUeXBlXG4gIHNjcm9sbFByb2dyZXNzOiBTY3JvbGxQcm9ncmVzc1R5cGVcbiAgaW5kZXg6IENvdW50ZXJUeXBlXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlXG4gIGxpbWl0OiBMaW1pdFR5cGVcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvZmZzZXRMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHByZXZpb3VzTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZVxuICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXJUeXBlXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlXG4gIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlclR5cGVcbiAgc2xpZGVzSW5WaWV3OiBTbGlkZXNJblZpZXdUeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGVcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGVcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXJUeXBlXG4gIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXJUeXBlXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGVcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlXG4gIHNjcm9sbFNuYXBMaXN0OiBudW1iZXJbXVxuICBzY3JvbGxTbmFwczogbnVtYmVyW11cbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuICBzbGlkZUZvY3VzOiBTbGlkZUZvY3VzVHlwZVxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZVxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRW5naW5lKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IEVuZ2luZVR5cGUge1xuICAvLyBPcHRpb25zXG4gIGNvbnN0IHtcbiAgICBhbGlnbixcbiAgICBheGlzOiBzY3JvbGxBeGlzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGFydEluZGV4LFxuICAgIGxvb3AsXG4gICAgZHVyYXRpb24sXG4gICAgZHJhZ0ZyZWUsXG4gICAgZHJhZ1RocmVzaG9sZCxcbiAgICBpblZpZXdUaHJlc2hvbGQsXG4gICAgc2xpZGVzVG9TY3JvbGw6IGdyb3VwU2xpZGVzLFxuICAgIHNraXBTbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHdhdGNoUmVzaXplLFxuICAgIHdhdGNoU2xpZGVzLFxuICAgIHdhdGNoRHJhZyxcbiAgICB3YXRjaEZvY3VzXG4gIH0gPSBvcHRpb25zXG5cbiAgLy8gTWVhc3VyZW1lbnRzXG4gIGNvbnN0IHBpeGVsVG9sZXJhbmNlID0gMlxuICBjb25zdCBub2RlUmVjdHMgPSBOb2RlUmVjdHMoKVxuICBjb25zdCBjb250YWluZXJSZWN0ID0gbm9kZVJlY3RzLm1lYXN1cmUoY29udGFpbmVyKVxuICBjb25zdCBzbGlkZVJlY3RzID0gc2xpZGVzLm1hcChub2RlUmVjdHMubWVhc3VyZSlcbiAgY29uc3QgYXhpcyA9IEF4aXMoc2Nyb2xsQXhpcywgZGlyZWN0aW9uKVxuICBjb25zdCB2aWV3U2l6ZSA9IGF4aXMubWVhc3VyZVNpemUoY29udGFpbmVyUmVjdClcbiAgY29uc3QgcGVyY2VudE9mVmlldyA9IFBlcmNlbnRPZlZpZXcodmlld1NpemUpXG4gIGNvbnN0IGFsaWdubWVudCA9IEFsaWdubWVudChhbGlnbiwgdmlld1NpemUpXG4gIGNvbnN0IGNvbnRhaW5TbmFwcyA9ICFsb29wICYmICEhY29udGFpblNjcm9sbFxuICBjb25zdCByZWFkRWRnZUdhcCA9IGxvb3AgfHwgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHsgc2xpZGVTaXplcywgc2xpZGVTaXplc1dpdGhHYXBzLCBzdGFydEdhcCwgZW5kR2FwIH0gPSBTbGlkZVNpemVzKFxuICAgIGF4aXMsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlcyxcbiAgICByZWFkRWRnZUdhcCxcbiAgICBvd25lcldpbmRvd1xuICApXG4gIGNvbnN0IHNsaWRlc1RvU2Nyb2xsID0gU2xpZGVzVG9TY3JvbGwoXG4gICAgYXhpcyxcbiAgICB2aWV3U2l6ZSxcbiAgICBncm91cFNsaWRlcyxcbiAgICBsb29wLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXAsXG4gICAgcGl4ZWxUb2xlcmFuY2VcbiAgKVxuICBjb25zdCB7IHNuYXBzLCBzbmFwc0FsaWduZWQgfSA9IFNjcm9sbFNuYXBzKFxuICAgIGF4aXMsXG4gICAgYWxpZ25tZW50LFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzbGlkZXNUb1Njcm9sbFxuICApXG4gIGNvbnN0IGNvbnRlbnRTaXplID0gLWFycmF5TGFzdChzbmFwcykgKyBhcnJheUxhc3Qoc2xpZGVTaXplc1dpdGhHYXBzKVxuICBjb25zdCB7IHNuYXBzQ29udGFpbmVkLCBzY3JvbGxDb250YWluTGltaXQgfSA9IFNjcm9sbENvbnRhaW4oXG4gICAgdmlld1NpemUsXG4gICAgY29udGVudFNpemUsXG4gICAgc25hcHNBbGlnbmVkLFxuICAgIGNvbnRhaW5TY3JvbGwsXG4gICAgcGl4ZWxUb2xlcmFuY2VcbiAgKVxuICBjb25zdCBzY3JvbGxTbmFwcyA9IGNvbnRhaW5TbmFwcyA/IHNuYXBzQ29udGFpbmVkIDogc25hcHNBbGlnbmVkXG4gIGNvbnN0IHsgbGltaXQgfSA9IFNjcm9sbExpbWl0KGNvbnRlbnRTaXplLCBzY3JvbGxTbmFwcywgbG9vcClcblxuICAvLyBJbmRleGVzXG4gIGNvbnN0IGluZGV4ID0gQ291bnRlcihhcnJheUxhc3RJbmRleChzY3JvbGxTbmFwcyksIHN0YXJ0SW5kZXgsIGxvb3ApXG4gIGNvbnN0IGluZGV4UHJldmlvdXMgPSBpbmRleC5jbG9uZSgpXG4gIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGFycmF5S2V5cyhzbGlkZXMpXG5cbiAgLy8gQW5pbWF0aW9uXG4gIGNvbnN0IHVwZGF0ZTogQW5pbWF0aW9uc1VwZGF0ZVR5cGUgPSAoe1xuICAgIGRyYWdIYW5kbGVyLFxuICAgIHNjcm9sbEJvZHksXG4gICAgc2Nyb2xsQm91bmRzLFxuICAgIG9wdGlvbnM6IHsgbG9vcCB9XG4gIH0pID0+IHtcbiAgICBpZiAoIWxvb3ApIHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSlcbiAgICBzY3JvbGxCb2R5LnNlZWsoKVxuICB9XG5cbiAgY29uc3QgcmVuZGVyOiBBbmltYXRpb25zUmVuZGVyVHlwZSA9IChcbiAgICB7XG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgdHJhbnNsYXRlLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgICBzY3JvbGxMb29wZXIsXG4gICAgICBzbGlkZUxvb3BlcixcbiAgICAgIGRyYWdIYW5kbGVyLFxuICAgICAgYW5pbWF0aW9uLFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgc2Nyb2xsQm91bmRzLFxuICAgICAgb3B0aW9uczogeyBsb29wIH1cbiAgICB9LFxuICAgIGFscGhhXG4gICkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFNldHRsZSA9IHNjcm9sbEJvZHkuc2V0dGxlZCgpXG4gICAgY29uc3Qgd2l0aGluQm91bmRzID0gIXNjcm9sbEJvdW5kcy5zaG91bGRDb25zdHJhaW4oKVxuICAgIGNvbnN0IGhhc1NldHRsZWQgPSBsb29wID8gc2hvdWxkU2V0dGxlIDogc2hvdWxkU2V0dGxlICYmIHdpdGhpbkJvdW5kc1xuICAgIGNvbnN0IGhhc1NldHRsZWRBbmRJZGxlID0gaGFzU2V0dGxlZCAmJiAhZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKVxuXG4gICAgaWYgKGhhc1NldHRsZWRBbmRJZGxlKSBhbmltYXRpb24uc3RvcCgpXG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRMb2NhdGlvbiA9XG4gICAgICBsb2NhdGlvbi5nZXQoKSAqIGFscGhhICsgcHJldmlvdXNMb2NhdGlvbi5nZXQoKSAqICgxIC0gYWxwaGEpXG5cbiAgICBvZmZzZXRMb2NhdGlvbi5zZXQoaW50ZXJwb2xhdGVkTG9jYXRpb24pXG5cbiAgICBpZiAobG9vcCkge1xuICAgICAgc2Nyb2xsTG9vcGVyLmxvb3Aoc2Nyb2xsQm9keS5kaXJlY3Rpb24oKSlcbiAgICAgIHNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZS50byhvZmZzZXRMb2NhdGlvbi5nZXQoKSlcblxuICAgIGlmIChoYXNTZXR0bGVkQW5kSWRsZSkgZXZlbnRIYW5kbGVyLmVtaXQoJ3NldHRsZScpXG4gICAgaWYgKCFoYXNTZXR0bGVkKSBldmVudEhhbmRsZXIuZW1pdCgnc2Nyb2xsJylcbiAgfVxuXG4gIGNvbnN0IGFuaW1hdGlvbiA9IEFuaW1hdGlvbnMoXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICAoKSA9PiB1cGRhdGUoZW5naW5lKSxcbiAgICAoYWxwaGE6IG51bWJlcikgPT4gcmVuZGVyKGVuZ2luZSwgYWxwaGEpXG4gIClcblxuICAvLyBTaGFyZWRcbiAgY29uc3QgZnJpY3Rpb24gPSAwLjY4XG4gIGNvbnN0IHN0YXJ0TG9jYXRpb24gPSBzY3JvbGxTbmFwc1tpbmRleC5nZXQoKV1cbiAgY29uc3QgbG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBwcmV2aW91c0xvY2F0aW9uID0gVmVjdG9yMUQoc3RhcnRMb2NhdGlvbilcbiAgY29uc3Qgb2Zmc2V0TG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCB0YXJnZXQgPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBzY3JvbGxCb2R5ID0gU2Nyb2xsQm9keShcbiAgICBsb2NhdGlvbixcbiAgICBvZmZzZXRMb2NhdGlvbixcbiAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgIHRhcmdldCxcbiAgICBkdXJhdGlvbixcbiAgICBmcmljdGlvblxuICApXG4gIGNvbnN0IHNjcm9sbFRhcmdldCA9IFNjcm9sbFRhcmdldChcbiAgICBsb29wLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIGNvbnRlbnRTaXplLFxuICAgIGxpbWl0LFxuICAgIHRhcmdldFxuICApXG4gIGNvbnN0IHNjcm9sbFRvID0gU2Nyb2xsVG8oXG4gICAgYW5pbWF0aW9uLFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgdGFyZ2V0LFxuICAgIGV2ZW50SGFuZGxlclxuICApXG4gIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gU2Nyb2xsUHJvZ3Jlc3MobGltaXQpXG4gIGNvbnN0IGV2ZW50U3RvcmUgPSBFdmVudFN0b3JlKClcbiAgY29uc3Qgc2xpZGVzSW5WaWV3ID0gU2xpZGVzSW5WaWV3KFxuICAgIGNvbnRhaW5lcixcbiAgICBzbGlkZXMsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGluVmlld1RocmVzaG9sZFxuICApXG4gIGNvbnN0IHsgc2xpZGVSZWdpc3RyeSB9ID0gU2xpZGVSZWdpc3RyeShcbiAgICBjb250YWluU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxDb250YWluTGltaXQsXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgc2xpZGVJbmRleGVzXG4gIClcbiAgY29uc3Qgc2xpZGVGb2N1cyA9IFNsaWRlRm9jdXMoXG4gICAgcm9vdCxcbiAgICBzbGlkZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzY3JvbGxUbyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIGV2ZW50U3RvcmUsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIHdhdGNoRm9jdXNcbiAgKVxuXG4gIC8vIEVuZ2luZVxuICBjb25zdCBlbmdpbmU6IEVuZ2luZVR5cGUgPSB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIGFuaW1hdGlvbixcbiAgICBheGlzLFxuICAgIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlcihcbiAgICAgIGF4aXMsXG4gICAgICByb290LFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgdGFyZ2V0LFxuICAgICAgRHJhZ1RyYWNrZXIoYXhpcywgb3duZXJXaW5kb3cpLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBhbmltYXRpb24sXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBzY3JvbGxUYXJnZXQsXG4gICAgICBpbmRleCxcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgICBkcmFnRnJlZSxcbiAgICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgICBza2lwU25hcHMsXG4gICAgICBmcmljdGlvbixcbiAgICAgIHdhdGNoRHJhZ1xuICAgICksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBwZXJjZW50T2ZWaWV3LFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgbGltaXQsXG4gICAgbG9jYXRpb24sXG4gICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICBvcHRpb25zLFxuICAgIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXIoXG4gICAgICBjb250YWluZXIsXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIHNsaWRlcyxcbiAgICAgIGF4aXMsXG4gICAgICB3YXRjaFJlc2l6ZSxcbiAgICAgIG5vZGVSZWN0c1xuICAgICksXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kcyhcbiAgICAgIGxpbWl0LFxuICAgICAgb2Zmc2V0TG9jYXRpb24sXG4gICAgICB0YXJnZXQsXG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgcGVyY2VudE9mVmlld1xuICAgICksXG4gICAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXIoY29udGVudFNpemUsIGxpbWl0LCBvZmZzZXRMb2NhdGlvbiwgW1xuICAgICAgbG9jYXRpb24sXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgICB0YXJnZXRcbiAgICBdKSxcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdDogc2Nyb2xsU25hcHMubWFwKHNjcm9sbFByb2dyZXNzLmdldCksXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgc2Nyb2xsVGFyZ2V0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlcihcbiAgICAgIGF4aXMsXG4gICAgICB2aWV3U2l6ZSxcbiAgICAgIGNvbnRlbnRTaXplLFxuICAgICAgc2xpZGVTaXplcyxcbiAgICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICAgIHNuYXBzLFxuICAgICAgc2Nyb2xsU25hcHMsXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHNsaWRlc1xuICAgICksXG4gICAgc2xpZGVGb2N1cyxcbiAgICBzbGlkZXNIYW5kbGVyOiBTbGlkZXNIYW5kbGVyKGNvbnRhaW5lciwgZXZlbnRIYW5kbGVyLCB3YXRjaFNsaWRlcyksXG4gICAgc2xpZGVzSW5WaWV3LFxuICAgIHNsaWRlSW5kZXhlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNsaWRlc1RvU2Nyb2xsLFxuICAgIHRhcmdldCxcbiAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBjb250YWluZXIpXG4gIH1cblxuICByZXR1cm4gZW5naW5lXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcblxudHlwZSBDYWxsYmFja1R5cGUgPSAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLCBldnQ6IEVtYmxhRXZlbnRUeXBlKSA9PiB2b2lkXG50eXBlIExpc3RlbmVyc1R5cGUgPSBQYXJ0aWFsPHsgW2tleSBpbiBFbWJsYUV2ZW50VHlwZV06IENhbGxiYWNrVHlwZVtdIH0+XG5cbmV4cG9ydCB0eXBlIEVtYmxhRXZlbnRUeXBlID0gRW1ibGFFdmVudExpc3RUeXBlW2tleW9mIEVtYmxhRXZlbnRMaXN0VHlwZV1cblxuZXhwb3J0IGludGVyZmFjZSBFbWJsYUV2ZW50TGlzdFR5cGUge1xuICBpbml0OiAnaW5pdCdcbiAgcG9pbnRlckRvd246ICdwb2ludGVyRG93bidcbiAgcG9pbnRlclVwOiAncG9pbnRlclVwJ1xuICBzbGlkZXNDaGFuZ2VkOiAnc2xpZGVzQ2hhbmdlZCdcbiAgc2xpZGVzSW5WaWV3OiAnc2xpZGVzSW5WaWV3J1xuICBzY3JvbGw6ICdzY3JvbGwnXG4gIHNlbGVjdDogJ3NlbGVjdCdcbiAgc2V0dGxlOiAnc2V0dGxlJ1xuICBkZXN0cm95OiAnZGVzdHJveSdcbiAgcmVJbml0OiAncmVJbml0J1xuICByZXNpemU6ICdyZXNpemUnXG4gIHNsaWRlRm9jdXNTdGFydDogJ3NsaWRlRm9jdXNTdGFydCdcbiAgc2xpZGVGb2N1czogJ3NsaWRlRm9jdXMnXG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50SGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZW1pdDogKGV2dDogRW1ibGFFdmVudFR5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb246IChldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKSA9PiBFdmVudEhhbmRsZXJUeXBlXG4gIG9mZjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgbGV0IGxpc3RlbmVyczogTGlzdGVuZXJzVHlwZSA9IHt9XG4gIGxldCBhcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBhcGkgPSBlbWJsYUFwaVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dDogRW1ibGFFdmVudFR5cGUpOiBDYWxsYmFja1R5cGVbXSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1tldnRdIHx8IFtdXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2dDogRW1ibGFFdmVudFR5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBnZXRMaXN0ZW5lcnMoZXZ0KS5mb3JFYWNoKChlKSA9PiBlKGFwaSwgZXZ0KSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb24oZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGxpc3RlbmVyc1tldnRdID0gZ2V0TGlzdGVuZXJzKGV2dCkuY29uY2F0KFtjYl0pXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5maWx0ZXIoKGUpID0+IGUgIT09IGNiKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSB7fVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGVtaXQsXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExvb3NlT3B0aW9uc1R5cGUsIENyZWF0ZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cywgb2JqZWN0c01lcmdlRGVlcCwgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgT3B0aW9uc1R5cGUgPSBQYXJ0aWFsPENyZWF0ZU9wdGlvbnNUeXBlPExvb3NlT3B0aW9uc1R5cGU+PlxuXG5leHBvcnQgdHlwZSBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gIG1lcmdlT3B0aW9uczogPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICkgPT4gVHlwZUFcbiAgb3B0aW9uc0F0TWVkaWE6IDxUeXBlIGV4dGVuZHMgT3B0aW9uc1R5cGU+KG9wdGlvbnM6IFR5cGUpID0+IFR5cGVcbiAgb3B0aW9uc01lZGlhUXVlcmllczogKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKSA9PiBNZWRpYVF1ZXJ5TGlzdFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdzogV2luZG93VHlwZSk6IE9wdGlvbnNIYW5kbGVyVHlwZSB7XG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9uczxUeXBlQSBleHRlbmRzIE9wdGlvbnNUeXBlLCBUeXBlQiBleHRlbmRzIE9wdGlvbnNUeXBlPihcbiAgICBvcHRpb25zQTogVHlwZUEsXG4gICAgb3B0aW9uc0I/OiBUeXBlQlxuICApOiBUeXBlQSB7XG4gICAgcmV0dXJuIDxUeXBlQT5vYmplY3RzTWVyZ2VEZWVwKG9wdGlvbnNBLCBvcHRpb25zQiB8fCB7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wdGlvbnNBdE1lZGlhPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSk6IFR5cGUge1xuICAgIGNvbnN0IG9wdGlvbnNBdE1lZGlhID0gb3B0aW9ucy5icmVha3BvaW50cyB8fCB7fVxuICAgIGNvbnN0IG1hdGNoZWRNZWRpYU9wdGlvbnMgPSBvYmplY3RLZXlzKG9wdGlvbnNBdE1lZGlhKVxuICAgICAgLmZpbHRlcigobWVkaWEpID0+IG93bmVyV2luZG93Lm1hdGNoTWVkaWEobWVkaWEpLm1hdGNoZXMpXG4gICAgICAubWFwKChtZWRpYSkgPT4gb3B0aW9uc0F0TWVkaWFbbWVkaWFdKVxuICAgICAgLnJlZHVjZSgoYSwgbWVkaWFPcHRpb24pID0+IG1lcmdlT3B0aW9ucyhhLCBtZWRpYU9wdGlvbiksIHt9KVxuXG4gICAgcmV0dXJuIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBtYXRjaGVkTWVkaWFPcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc01lZGlhUXVlcmllcyhvcHRpb25zTGlzdDogT3B0aW9uc1R5cGVbXSk6IE1lZGlhUXVlcnlMaXN0W10ge1xuICAgIHJldHVybiBvcHRpb25zTGlzdFxuICAgICAgLm1hcCgob3B0aW9ucykgPT4gb2JqZWN0S2V5cyhvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9KSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgbWVkaWFRdWVyaWVzKSA9PiBhY2MuY29uY2F0KG1lZGlhUXVlcmllcyksIFtdKVxuICAgICAgLm1hcChvd25lcldpbmRvdy5tYXRjaE1lZGlhKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogT3B0aW9uc0hhbmRsZXJUeXBlID0ge1xuICAgIG1lcmdlT3B0aW9ucyxcbiAgICBvcHRpb25zQXRNZWRpYSxcbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgT3B0aW9uc0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcblxuZXhwb3J0IHR5cGUgUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICkgPT4gRW1ibGFQbHVnaW5zVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQbHVnaW5zSGFuZGxlcihcbiAgb3B0aW9uc0hhbmRsZXI6IE9wdGlvbnNIYW5kbGVyVHlwZVxuKTogUGx1Z2luc0hhbmRsZXJUeXBlIHtcbiAgbGV0IGFjdGl2ZVBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdID0gW11cblxuICBmdW5jdGlvbiBpbml0KFxuICAgIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBwbHVnaW5zOiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gcGx1Z2lucy5maWx0ZXIoXG4gICAgICAoeyBvcHRpb25zIH0pID0+IG9wdGlvbnNIYW5kbGVyLm9wdGlvbnNBdE1lZGlhKG9wdGlvbnMpLmFjdGl2ZSAhPT0gZmFsc2VcbiAgICApXG4gICAgYWN0aXZlUGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5pbml0KGVtYmxhQXBpLCBvcHRpb25zSGFuZGxlcikpXG5cbiAgICByZXR1cm4gcGx1Z2lucy5yZWR1Y2UoXG4gICAgICAobWFwLCBwbHVnaW4pID0+IE9iamVjdC5hc3NpZ24obWFwLCB7IFtwbHVnaW4ubmFtZV06IHBsdWdpbiB9KSxcbiAgICAgIHt9XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gYWN0aXZlUGx1Z2lucy5maWx0ZXIoKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFBsdWdpbnNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVUeXBlIH0gZnJvbSAnLi9FbmdpbmUnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyLCBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucywgRW1ibGFPcHRpb25zVHlwZSwgT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlciB9IGZyb20gJy4vT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBQbHVnaW5zSGFuZGxlciB9IGZyb20gJy4vUGx1Z2luc0hhbmRsZXInXG5pbXBvcnQgeyBFbWJsYVBsdWdpbnNUeXBlLCBFbWJsYVBsdWdpblR5cGUgfSBmcm9tICcuL1BsdWdpbnMnXG5pbXBvcnQgeyBpc1N0cmluZywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICBjYW5TY3JvbGxOZXh0OiAoKSA9PiBib29sZWFuXG4gIGNhblNjcm9sbFByZXY6ICgpID0+IGJvb2xlYW5cbiAgY29udGFpbmVyTm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgaW50ZXJuYWxFbmdpbmU6ICgpID0+IEVuZ2luZVR5cGVcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBvZmY6IEV2ZW50SGFuZGxlclR5cGVbJ29mZiddXG4gIG9uOiBFdmVudEhhbmRsZXJUeXBlWydvbiddXG4gIGVtaXQ6IEV2ZW50SGFuZGxlclR5cGVbJ2VtaXQnXVxuICBwbHVnaW5zOiAoKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIHByZXZpb3VzU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHJlSW5pdDogKG9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLCBwbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW10pID0+IHZvaWRcbiAgcm9vdE5vZGU6ICgpID0+IEhUTUxFbGVtZW50XG4gIHNjcm9sbE5leHQ6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcmV2OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgc2Nyb2xsUHJvZ3Jlc3M6ICgpID0+IG51bWJlclxuICBzY3JvbGxTbmFwTGlzdDogKCkgPT4gbnVtYmVyW11cbiAgc2Nyb2xsVG86IChpbmRleDogbnVtYmVyLCBqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzZWxlY3RlZFNjcm9sbFNuYXA6ICgpID0+IG51bWJlclxuICBzbGlkZU5vZGVzOiAoKSA9PiBIVE1MRWxlbWVudFtdXG4gIHNsaWRlc0luVmlldzogKCkgPT4gbnVtYmVyW11cbiAgc2xpZGVzTm90SW5WaWV3OiAoKSA9PiBudW1iZXJbXVxufVxuXG5mdW5jdGlvbiBFbWJsYUNhcm91c2VsKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgdXNlck9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICB1c2VyUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4pOiBFbWJsYUNhcm91c2VsVHlwZSB7XG4gIGNvbnN0IG93bmVyRG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnRcbiAgY29uc3Qgb3duZXJXaW5kb3cgPSA8V2luZG93VHlwZT5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3XG4gIGNvbnN0IG9wdGlvbnNIYW5kbGVyID0gT3B0aW9uc0hhbmRsZXIob3duZXJXaW5kb3cpXG4gIGNvbnN0IHBsdWdpbnNIYW5kbGVyID0gUGx1Z2luc0hhbmRsZXIob3B0aW9uc0hhbmRsZXIpXG4gIGNvbnN0IG1lZGlhSGFuZGxlcnMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyKClcbiAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhLCBvcHRpb25zTWVkaWFRdWVyaWVzIH0gPSBvcHRpb25zSGFuZGxlclxuICBjb25zdCB7IG9uLCBvZmYsIGVtaXQgfSA9IGV2ZW50SGFuZGxlclxuICBjb25zdCByZUluaXQgPSByZUFjdGl2YXRlXG5cbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG4gIGxldCBlbmdpbmU6IEVuZ2luZVR5cGVcbiAgbGV0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBFbWJsYUNhcm91c2VsLmdsb2JhbE9wdGlvbnMpXG4gIGxldCBvcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlKVxuICBsZXQgcGx1Z2luTGlzdDogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuICBsZXQgcGx1Z2luQXBpczogRW1ibGFQbHVnaW5zVHlwZVxuXG4gIGxldCBjb250YWluZXI6IEhUTUxFbGVtZW50XG4gIGxldCBzbGlkZXM6IEhUTUxFbGVtZW50W11cblxuICBmdW5jdGlvbiBzdG9yZUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyOiB1c2VyQ29udGFpbmVyLCBzbGlkZXM6IHVzZXJTbGlkZXMgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IGN1c3RvbUNvbnRhaW5lciA9IGlzU3RyaW5nKHVzZXJDb250YWluZXIpXG4gICAgICA/IHJvb3QucXVlcnlTZWxlY3Rvcih1c2VyQ29udGFpbmVyKVxuICAgICAgOiB1c2VyQ29udGFpbmVyXG4gICAgY29udGFpbmVyID0gPEhUTUxFbGVtZW50PihjdXN0b21Db250YWluZXIgfHwgcm9vdC5jaGlsZHJlblswXSlcblxuICAgIGNvbnN0IGN1c3RvbVNsaWRlcyA9IGlzU3RyaW5nKHVzZXJTbGlkZXMpXG4gICAgICA/IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHVzZXJTbGlkZXMpXG4gICAgICA6IHVzZXJTbGlkZXNcbiAgICBzbGlkZXMgPSA8SFRNTEVsZW1lbnRbXT5bXS5zbGljZS5jYWxsKGN1c3RvbVNsaWRlcyB8fCBjb250YWluZXIuY2hpbGRyZW4pXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbmdpbmUob3B0aW9uczogT3B0aW9uc1R5cGUpOiBFbmdpbmVUeXBlIHtcbiAgICBjb25zdCBlbmdpbmUgPSBFbmdpbmUoXG4gICAgICByb290LFxuICAgICAgY29udGFpbmVyLFxuICAgICAgc2xpZGVzLFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgb3B0aW9ucyxcbiAgICAgIGV2ZW50SGFuZGxlclxuICAgIClcblxuICAgIGlmIChvcHRpb25zLmxvb3AgJiYgIWVuZ2luZS5zbGlkZUxvb3Blci5jYW5Mb29wKCkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnNXaXRob3V0TG9vcCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgbG9vcDogZmFsc2UgfSlcbiAgICAgIHJldHVybiBjcmVhdGVFbmdpbmUob3B0aW9uc1dpdGhvdXRMb29wKVxuICAgIH1cbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgIG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB3aXRoT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEob3B0aW9uc0Jhc2UpXG4gICAgcGx1Z2luTGlzdCA9IHdpdGhQbHVnaW5zIHx8IHBsdWdpbkxpc3RcblxuICAgIHN0b3JlRWxlbWVudHMoKVxuXG4gICAgZW5naW5lID0gY3JlYXRlRW5naW5lKG9wdGlvbnMpXG5cbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzKFtcbiAgICAgIG9wdGlvbnNCYXNlLFxuICAgICAgLi4ucGx1Z2luTGlzdC5tYXAoKHsgb3B0aW9ucyB9KSA9PiBvcHRpb25zKVxuICAgIF0pLmZvckVhY2goKHF1ZXJ5KSA9PiBtZWRpYUhhbmRsZXJzLmFkZChxdWVyeSwgJ2NoYW5nZScsIHJlQWN0aXZhdGUpKVxuXG4gICAgaWYgKCFvcHRpb25zLmFjdGl2ZSkgcmV0dXJuXG5cbiAgICBlbmdpbmUudHJhbnNsYXRlLnRvKGVuZ2luZS5sb2NhdGlvbi5nZXQoKSlcbiAgICBlbmdpbmUuYW5pbWF0aW9uLmluaXQoKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlRm9jdXMuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5ldmVudEhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmluaXQoc2VsZilcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBpZiAoZW5naW5lLm9wdGlvbnMubG9vcCkgZW5naW5lLnNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIGlmIChjb250YWluZXIub2Zmc2V0UGFyZW50ICYmIHNsaWRlcy5sZW5ndGgpIGVuZ2luZS5kcmFnSGFuZGxlci5pbml0KHNlbGYpXG5cbiAgICBwbHVnaW5BcGlzID0gcGx1Z2luc0hhbmRsZXIuaW5pdChzZWxmLCBwbHVnaW5MaXN0KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVBY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBhY3RpdmF0ZShtZXJnZU9wdGlvbnMoeyBzdGFydEluZGV4IH0sIHdpdGhPcHRpb25zKSwgd2l0aFBsdWdpbnMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3JlSW5pdCcpXG4gIH1cblxuICBmdW5jdGlvbiBkZUFjdGl2YXRlKCk6IHZvaWQge1xuICAgIGVuZ2luZS5kcmFnSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuZXZlbnRTdG9yZS5jbGVhcigpXG4gICAgZW5naW5lLnRyYW5zbGF0ZS5jbGVhcigpXG4gICAgZW5naW5lLnNsaWRlTG9vcGVyLmNsZWFyKClcbiAgICBlbmdpbmUucmVzaXplSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSGFuZGxlci5kZXN0cm95KClcbiAgICBlbmdpbmUuc2xpZGVzSW5WaWV3LmRlc3Ryb3koKVxuICAgIGVuZ2luZS5hbmltYXRpb24uZGVzdHJveSgpXG4gICAgcGx1Z2luc0hhbmRsZXIuZGVzdHJveSgpXG4gICAgbWVkaWFIYW5kbGVycy5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgICBkZUFjdGl2YXRlKClcbiAgICBldmVudEhhbmRsZXIuZW1pdCgnZGVzdHJveScpXG4gICAgZXZlbnRIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuLCBkaXJlY3Rpb24/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlIHx8IGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZW5naW5lLnNjcm9sbEJvZHlcbiAgICAgIC51c2VCYXNlRnJpY3Rpb24oKVxuICAgICAgLnVzZUR1cmF0aW9uKGp1bXAgPT09IHRydWUgPyAwIDogb3B0aW9ucy5kdXJhdGlvbilcbiAgICBlbmdpbmUuc2Nyb2xsVG8uaW5kZXgoaW5kZXgsIGRpcmVjdGlvbiB8fCAwKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsTmV4dChqdW1wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IG5leHQgPSBlbmdpbmUuaW5kZXguYWRkKDEpLmdldCgpXG4gICAgc2Nyb2xsVG8obmV4dCwganVtcCwgLTEpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcmV2KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgc2Nyb2xsVG8ocHJldiwganVtcCwgMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbE5leHQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICByZXR1cm4gbmV4dCAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNjcm9sbFByZXYoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJldiA9IGVuZ2luZS5pbmRleC5hZGQoLTEpLmdldCgpXG4gICAgcmV0dXJuIHByZXYgIT09IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxTbmFwTGlzdCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zY3JvbGxTbmFwTGlzdFxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFByb2dyZXNzLmdldChlbmdpbmUub2Zmc2V0TG9jYXRpb24uZ2V0KCkpXG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RlZFNjcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4LmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1Njcm9sbFNuYXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5naW5lLmluZGV4UHJldmlvdXMuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc05vdEluVmlldygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGVuZ2luZS5zbGlkZXNJblZpZXcuZ2V0KGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gcGx1Z2lucygpOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICByZXR1cm4gcGx1Z2luQXBpc1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJuYWxFbmdpbmUoKTogRW5naW5lVHlwZSB7XG4gICAgcmV0dXJuIGVuZ2luZVxuICB9XG5cbiAgZnVuY3Rpb24gcm9vdE5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiByb290XG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluZXJOb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gY29udGFpbmVyXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZU5vZGVzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBzbGlkZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICAgIGNhblNjcm9sbE5leHQsXG4gICAgY2FuU2Nyb2xsUHJldixcbiAgICBjb250YWluZXJOb2RlLFxuICAgIGludGVybmFsRW5naW5lLFxuICAgIGRlc3Ryb3ksXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGVtaXQsXG4gICAgcGx1Z2lucyxcbiAgICBwcmV2aW91c1Njcm9sbFNuYXAsXG4gICAgcmVJbml0LFxuICAgIHJvb3ROb2RlLFxuICAgIHNjcm9sbE5leHQsXG4gICAgc2Nyb2xsUHJldixcbiAgICBzY3JvbGxQcm9ncmVzcyxcbiAgICBzY3JvbGxTbmFwTGlzdCxcbiAgICBzY3JvbGxUbyxcbiAgICBzZWxlY3RlZFNjcm9sbFNuYXAsXG4gICAgc2xpZGVOb2RlcyxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVzTm90SW5WaWV3XG4gIH1cblxuICBhY3RpdmF0ZSh1c2VyT3B0aW9ucywgdXNlclBsdWdpbnMpXG4gIHNldFRpbWVvdXQoKCkgPT4gZXZlbnRIYW5kbGVyLmVtaXQoJ2luaXQnKSwgMClcbiAgcmV0dXJuIHNlbGZcbn1cblxuZGVjbGFyZSBuYW1lc3BhY2UgRW1ibGFDYXJvdXNlbCB7XG4gIGxldCBnbG9iYWxPcHRpb25zOiBFbWJsYU9wdGlvbnNUeXBlIHwgdW5kZWZpbmVkXG59XG5cbkVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBFbWJsYUNhcm91c2VsXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1ibGFDYXJvdXNlbCBmcm9tICdlbWJsYS1jYXJvdXNlbCc7XG5pbXBvcnQgQXV0b3BsYXkgZnJvbSAnZW1ibGEtY2Fyb3VzZWwtYXV0b3BsYXknO1xuaW1wb3J0IHsgV2hlZWxHZXN0dXJlc1BsdWdpbiB9IGZyb20gJ2VtYmxhLWNhcm91c2VsLXdoZWVsLWdlc3R1cmVzJztcbmltcG9ydCAnLi9nYWxsZXJ5LnNjc3MnO1xuaW1wb3J0IHtcbiAgICBhZGRUaHVtYkJ1dHRvbnNDbGlja0hhbmRsZXJzLFxuICAgIGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSxcbiAgICBhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzXG59IGZyb20gJy4vYnV0dG9ucy5lczYnO1xuXG5jbGFzcyBZVER5bmFtaWNzR2FsbGVyeSB7XG4gICAgaW5pdChjb250YWluZXIpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LnJtR2FsbGVyeVJlYWR5ID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gY29udGFpbmVyLmRhdGFzZXQub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgICAgIGNvbnN0IGF4aXMgPSBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICd5JyA6ICd4JztcbiAgICAgICAgY29uc3QgdGh1bWJBeGlzID0gY29udGFpbmVyLmRhdGFzZXQudGh1bWJBeGlzID09PSAneScgPyAneScgOiAneCc7XG4gICAgICAgIGNvbnN0IG5hdk1vZGUgPSBbJ3RodW1ibmF2JywgJ2RvdG5hdiddLmluY2x1ZGVzKGNvbnRhaW5lci5kYXRhc2V0Lm5hdilcbiAgICAgICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQubmF2XG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBsb29wID0gY29udGFpbmVyLmRhdGFzZXQubG9vcCAhPT0gJ2ZhbHNlJztcbiAgICAgICAgY29uc3Qgd2F0Y2hEcmFnID0gY29udGFpbmVyLmRhdGFzZXQuZHJhZyAhPT0gJ2ZhbHNlJztcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLm1heCgxMCwgTWF0aC5taW4oNjAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC5kdXJhdGlvbikgfHwgMzApKTtcbiAgICAgICAgY29uc3QgYXV0b3BsYXkgPSBjb250YWluZXIuZGF0YXNldC5hdXRvcGxheSA9PT0gJ3RydWUnO1xuICAgICAgICBjb25zdCBhdXRvcGxheURlbGF5ID0gTWF0aC5tYXgoMzAwMCwgTWF0aC5taW4oMjAwMDAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC5hdXRvcGxheURlbGF5KSB8fCA3MDAwKSk7XG4gICAgICAgIGNvbnN0IGF1dG9wbGF5UGF1c2UgPSBjb250YWluZXIuZGF0YXNldC5hdXRvcGxheVBhdXNlICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCBtb2JpbGVBeGlzID0gb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCdcbiAgICAgICAgICAgID8geycobWF4LXdpZHRoOiA2MzlweCknOiB7YXhpczogJ3gnfX1cbiAgICAgICAgICAgIDoge307XG4gICAgICAgIGNvbnN0IG1vYmlsZVRodW1iQXhpcyA9IHRodW1iQXhpcyA9PT0gJ3knXG4gICAgICAgICAgICA/IHsnKG1heC13aWR0aDogNjM5cHgpJzoge2F4aXM6ICd4J319XG4gICAgICAgICAgICA6IHt9O1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGxvb3AsXG4gICAgICAgICAgICB3YXRjaERyYWcsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiBtb2JpbGVBeGlzXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUaHVtYnMgPSB7XG4gICAgICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgICAgIGF4aXM6IHRodW1iQXhpcyxcbiAgICAgICAgICAgIGRyYWdGcmVlOiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBicmVha3BvaW50czogbW9iaWxlVGh1bWJBeGlzXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgdmlld3BvcnROb2RlTWFpbkNhcm91c2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fdmlld3BvcnQnKSxcbiAgICAgICAgICAgIHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fdmlld3BvcnQnKSxcbiAgICAgICAgICAgIHByZXZUaHVtYkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fcHJldicpLFxuICAgICAgICAgICAgbmV4dFRodW1iQnRuTm9kZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19uZXh0JyksXG4gICAgICAgICAgICBwcmV2TWFpbkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X19wcmV2JyksXG4gICAgICAgICAgICBuZXh0TWFpbkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X19uZXh0Jyk7XG5cbiAgICAgICAgaWYgKCF2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5kYXRhc2V0LnJtR2FsbGVyeVJlYWR5ID0gJ3RydWUnO1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbnMgPSBhdXRvcGxheSA/IFtBdXRvcGxheSh7XG4gICAgICAgICAgICBkZWxheTogYXV0b3BsYXlEZWxheSxcbiAgICAgICAgICAgIHN0b3BPbkludGVyYWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHN0b3BPbk1vdXNlRW50ZXI6IGF1dG9wbGF5UGF1c2UsXG4gICAgICAgICAgICBzdG9wT25Gb2N1c0luOiBhdXRvcGxheVBhdXNlXG4gICAgICAgIH0pXSA6IFtdO1xuICAgICAgICBjb25zdCBlbWJsYU1haW4gPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCwgb3B0aW9ucywgcGx1Z2lucyk7XG4gICAgICAgIGNvbnN0IGNsZWFudXBzID0gW107XG4gICAgICAgIGxldCBlbWJsYVRodW1iID0gbnVsbDtcblxuICAgICAgICBpZiAobmF2TW9kZSAmJiB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsKSB7XG4gICAgICAgICAgICBjb25zdCBuYXZOb2RlcyA9IEFycmF5LmZyb20oY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlJykpO1xuXG4gICAgICAgICAgICBpZiAobmF2TW9kZSA9PT0gJ3RodW1ibmF2Jykge1xuICAgICAgICAgICAgICAgIGVtYmxhVGh1bWIgPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwsIG9wdGlvbnNUaHVtYnMsIFtXaGVlbEdlc3R1cmVzUGx1Z2luKCldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW51cHMucHVzaChcbiAgICAgICAgICAgICAgICBhZGRUaHVtYkJ1dHRvbnNDbGlja0hhbmRsZXJzKGVtYmxhTWFpbiwgbmF2Tm9kZXMpLFxuICAgICAgICAgICAgICAgIGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZShlbWJsYU1haW4sIG5hdk5vZGVzLCBlbWJsYVRodW1iKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGVtYmxhVGh1bWIgJiYgcHJldlRodW1iQnRuTm9kZSAmJiBuZXh0VGh1bWJCdG5Ob2RlKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cHMucHVzaChhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzKFxuICAgICAgICAgICAgICAgICAgICBlbWJsYVRodW1iLFxuICAgICAgICAgICAgICAgICAgICBwcmV2VGh1bWJCdG5Ob2RlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0VGh1bWJCdG5Ob2RlXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldk1haW5CdG5Ob2RlICYmIG5leHRNYWluQnRuTm9kZSkge1xuICAgICAgICAgICAgY2xlYW51cHMucHVzaChhZGRQcmV2TmV4dEJ1dHRvbnNDbGlja0hhbmRsZXJzKFxuICAgICAgICAgICAgICAgIGVtYmxhTWFpbixcbiAgICAgICAgICAgICAgICBwcmV2TWFpbkJ0bk5vZGUsXG4gICAgICAgICAgICAgICAgbmV4dE1haW5CdG5Ob2RlXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtYmxhTWFpbi5vbignZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFudXBzLmZvckVhY2goKGNsZWFudXApID0+IGNsZWFudXAoKSk7XG4gICAgICAgICAgICBlbWJsYVRodW1iPy5kZXN0cm95KCk7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgaW5pdEdhbGxlcmllcyA9IChyb290ID0gZG9jdW1lbnQpID0+IHtcbiAgICBpZiAocm9vdC5tYXRjaGVzPy4oJy5ybXNsaWRlc2hvdycpKSB7XG4gICAgICAgIG5ldyBZVER5bmFtaWNzR2FsbGVyeSgpLmluaXQocm9vdCk7XG4gICAgfVxuXG4gICAgcm9vdC5xdWVyeVNlbGVjdG9yQWxsPy4oJy5ybXNsaWRlc2hvdycpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgbmV3IFlURHluYW1pY3NHYWxsZXJ5KCkuaW5pdChlbGVtZW50KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IG9ic2VydmVHYWxsZXJpZXMgPSAoKSA9PiB7XG4gICAgaW5pdEdhbGxlcmllcygpO1xuXG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2Rlc30pID0+IHtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBpbml0R2FsbGVyaWVzKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBvYnNlcnZlR2FsbGVyaWVzLCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBvYnNlcnZlR2FsbGVyaWVzKCk7XG59XG4iXSwibmFtZXMiOlsiZGVmYXVsdE9wdGlvbnMiLCJhY3RpdmUiLCJicmVha3BvaW50cyIsIndoZWVsRHJhZ2dpbmdDbGFzcyIsImZvcmNlV2hlZWxBeGlzIiwidW5kZWZpbmVkIiwidGFyZ2V0IiwiV2hlZWxHZXN0dXJlc1BsdWdpbiIsImdsb2JhbE9wdGlvbnMiLCJfX0RFVl9fIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidXNlck9wdGlvbnMiLCJvcHRpb25zIiwiY2xlYW51cCIsImluaXQiLCJlbWJsYSIsIm9wdGlvbnNIYW5kbGVyIiwibWVyZ2VPcHRpb25zIiwib3B0aW9uc0F0TWVkaWEiLCJvcHRpb25zQmFzZSIsImFsbE9wdGlvbnMiLCJlbmdpbmUiLCJpbnRlcm5hbEVuZ2luZSIsInRhcmdldE5vZGUiLCJfb3B0aW9ucyR0YXJnZXQiLCJjb250YWluZXJOb2RlIiwicGFyZW50Tm9kZSIsIndoZWVsQXhpcyIsIl9vcHRpb25zJGZvcmNlV2hlZWxBeCIsImF4aXMiLCJ3aGVlbEdlc3R1cmVzIiwiV2hlZWxHZXN0dXJlcyIsInByZXZlbnRXaGVlbEFjdGlvbiIsInJldmVyc2VTaWduIiwidXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMiLCJzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCIsImNvbnRhaW5lclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInVub2JzZXJ2ZVRhcmdldE5vZGUiLCJvYnNlcnZlIiwib2ZmV2hlZWwiLCJvbiIsImhhbmRsZVdoZWVsIiwiaXNTdGFydGVkIiwic3RhcnRFdmVudCIsIm92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiIsImJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kIiwid2hlZWxHZXN0dXJlU3RhcnRlZCIsInN0YXRlIiwiTW91c2VFdmVudCIsImV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImUiLCJjb25zb2xlIiwid2FybiIsImFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aGVlbEdlc3R1cmVFbmRlZCIsImNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCIsInJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzVHJ1c3RlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInR5cGUiLCJtb3ZlWCIsIm1vdmVZIiwiX3N0YXRlJGF4aXNNb3ZlbWVudCIsImF4aXNNb3ZlbWVudCIsIl9zdGF0ZSRheGlzTW92ZW1lbnQyIiwiY2hlY2tJZkF0Qm91bmRhcnkiLCJpc0F0Qm91bmRhcnkiLCJfY2hlY2tJZkF0Qm91bmRhcnkiLCJwcm9ncmVzc1JhdGlvIiwiTWF0aCIsIm1pbiIsImRhbXBpbmdGYWN0b3IiLCJjb3VudGVyTW92ZVNpZ24iLCJjb3VudGVyTW92ZW1lbnQiLCJkYW1waW5nTW92ZW1lbnQiLCJza2lwU25hcHMiLCJkcmFnRnJlZSIsIm1heFgiLCJtYXhZIiwibWF4IiwiY2xpZW50WCIsImNsaWVudFkiLCJzY3JlZW5YIiwic2NyZWVuWSIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsImJ1dHRvbiIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJheGlzRGVsdGEiLCJkZWx0YVgiLCJfc3RhdGUkYXhpc0RlbHRhIiwiZGVsdGFZIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYW5TY3JvbGxOZXh0IiwiY2FuU2Nyb2xsUHJldiIsInByaW1hcnlBeGlzRGVsdGEiLCJpc1Njcm9sbGluZ05leHQiLCJpc1Njcm9sbGluZ1ByZXYiLCJpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZCIsIl9jaGVja0lmQXRCb3VuZGFyeTIiLCJpc01vbWVudHVtIiwiYWJzIiwiX3N0YXRlJGF4aXNEZWx0YTIiLCJjcm9zc0F4aXNEZWx0YSIsImlzUmVsZWFzZSIsInByZXZpb3VzIiwiaXNFbmRpbmdPclJlbGVhc2UiLCJpc0VuZGluZyIsInByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50Iiwib2ZmIiwic2VsZiIsIm5hbWUiLCJkZXN0cm95IiwiREVDQVkiLCJwcm9qZWN0aW9uIiwidmVsb2NpdHlQeE1zIiwiZGVjYXkiLCJsYXN0T2YiLCJhcnJheSIsImxlbmd0aCIsImF2ZXJhZ2UiLCJudW1iZXJzIiwicmVkdWNlIiwiYSIsImIiLCJjbGFtcCIsInZhbHVlIiwiYWRkVmVjdG9ycyIsInYxIiwidjIiLCJFcnJvciIsIm1hcCIsInZhbCIsImkiLCJhYnNNYXgiLCJhcHBseSIsImRlZXBGcmVlemUiLCJvIiwiT2JqZWN0IiwiZnJlZXplIiwidmFsdWVzIiwiZm9yRWFjaCIsImlzRnJvemVuIiwiRXZlbnRCdXMiLCJsaXN0ZW5lcnMiLCJsaXN0ZW5lciIsImNvbmNhdCIsImZpbHRlciIsImwiLCJkaXNwYXRjaCIsImRhdGEiLCJXaGVlbFRhcmdldE9ic2VydmVyIiwiZXZlbnRMaXN0ZW5lciIsInRhcmdldHMiLCJwYXNzaXZlIiwicHVzaCIsInVub2JzZXJ2ZSIsInQiLCJkaXNjb25uZWN0IiwiTElORV9IRUlHSFQiLCJQQUdFX0hFSUdIVCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiREVMVEFfTU9ERV9VTklUIiwibm9ybWFsaXplV2hlZWwiLCJkZWx0YU1vZGUiLCJkZWx0YVoiLCJ0aW1lU3RhbXAiLCJyZXZlcnNlQWxsIiwicmV2ZXJzZUF4aXNEZWx0YVNpZ24iLCJ3aGVlbCIsIm11bHRpcGxpZXJzIiwic2hvdWxkUmV2ZXJzZSIsIl9leHRlbmRzIiwiZGVsdGEiLCJERUxUQV9NQVhfQUJTIiwiY2xhbXBBeGlzRGVsdGEiLCJBQ0NfRkFDVE9SX01JTiIsIkFDQ19GQUNUT1JfTUFYIiwiV0hFRUxFVkVOVFNfVE9fTUVSR0UiLCJXSEVFTEVWRU5UU19UT19BTkFMQVpFIiwiY29uZmlnRGVmYXVsdHMiLCJXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQiLCJjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUiLCJpc1N0YXJ0UHVibGlzaGVkIiwic3RhcnRUaW1lIiwibGFzdEFic0RlbHRhIiwiSW5maW5pdHkiLCJheGlzVmVsb2NpdHkiLCJhY2NlbGVyYXRpb25GYWN0b3JzIiwic2Nyb2xsUG9pbnRzIiwic2Nyb2xsUG9pbnRzVG9NZXJnZSIsIndpbGxFbmRUaW1lb3V0Iiwib3B0aW9uc1BhcmFtIiwiX0V2ZW50QnVzIiwiY29uZmlnIiwiY3VycmVudEV2ZW50IiwibmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQiLCJwcmV2V2hlZWxFdmVudFN0YXRlIiwiZmVlZFdoZWVsIiwid2hlZWxFdmVudHMiLCJBcnJheSIsImlzQXJyYXkiLCJ3aGVlbEV2ZW50IiwicHJvY2Vzc1doZWVsRXZlbnREYXRhIiwidXBkYXRlT3B0aW9ucyIsIm5ld09wdGlvbnMiLCJzb21lIiwib3B0aW9uIiwiZXJyb3IiLCJwdWJsaXNoV2hlZWwiLCJhZGRpdGlvbmFsRGF0YSIsIndoZWVsRXZlbnRTdGF0ZSIsImlzU3RhcnQiLCJpc01vbWVudHVtQ2FuY2VsIiwiYXhpc01vdmVtZW50UHJvamVjdGlvbiIsInZlbG9jaXR5Iiwic2hvdWxkUHJldmVudERlZmF1bHQiLCJkZWx0YU1heEFicyIsIl9jb25maWciLCJfY2xhbXBBeGlzRGVsdGEiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0IiwiZW5kIiwiaXMiLCJtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSIsIndpbGxFbmQiLCJ1bnNoaWZ0IiwiYXhpc0RlbHRhU3VtIiwidXBkYXRlVmVsb2NpdHkiLCJkZXRlY3RNb21lbnR1bSIsInVwZGF0ZVN0YXJ0VmVsb2NpdHkiLCJkIiwibGF0ZXN0U2Nyb2xsUG9pbnQiLCJfc3RhdGUkc2Nyb2xsUG9pbnRzIiwicHJldlNjcm9sbFBvaW50IiwiZGVsdGFUaW1lIiwiYWNjZWxlcmF0aW9uRmFjdG9yIiwidiIsInVwZGF0ZVdpbGxFbmRUaW1lb3V0IiwibmV3VGltZW91dCIsImNlaWwiLCJyb3VuZCIsImFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSIsImFjY0ZhY3RvciIsInJlY29nbml6ZWRNb21lbnR1bSIsInJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMiLCJzbGljZSIsImRldGVjdGVkTW9tZW50dW0iLCJldmVyeSIsImFjY0ZhYyIsInNhbWVBY2NGYWMiLCJmMSIsImYyIiwiYm90aEFyZUluUmFuZ2VPclplcm8iLCJEYXRlIiwibm93Iiwid2lsbEVuZElkIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIl9XaGVlbFRhcmdldE9ic2VydmVyIiwiYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpTWFpbiIsInNsaWRlc1RodW1icyIsInNjcm9sbFRvSW5kZXgiLCJfIiwiaW5kZXgiLCJzY3JvbGxUbyIsInNsaWRlTm9kZSIsImFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSIsImVtYmxhQXBpVGh1bWIiLCJhcmd1bWVudHMiLCJ0b2dnbGVUaHVtYkJ0bnNTdGF0ZSIsInNlbGVjdGVkIiwic2VsZWN0ZWRTY3JvbGxTbmFwIiwic2xpZGUiLCJpc1NlbGVjdGVkIiwidG9nZ2xlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpIiwicHJldkJ0biIsIm5leHRCdG4iLCJzY3JvbGxQcmV2Iiwic2Nyb2xsTmV4dCIsInJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsImFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsInRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlIiwiZGVsYXkiLCJqdW1wIiwicGxheU9uSW5pdCIsInN0b3BPbkZvY3VzSW4iLCJzdG9wT25JbnRlcmFjdGlvbiIsInN0b3BPbk1vdXNlRW50ZXIiLCJzdG9wT25MYXN0U25hcCIsInJvb3ROb2RlIiwibm9ybWFsaXplRGVsYXkiLCJzY3JvbGxTbmFwcyIsInNjcm9sbFNuYXBMaXN0IiwiZ2V0QXV0b3BsYXlSb290Tm9kZSIsImVtYmxhUm9vdE5vZGUiLCJBdXRvcGxheSIsImRlc3Ryb3llZCIsInRpbWVyU3RhcnRUaW1lIiwidGltZXJJZCIsImF1dG9wbGF5QWN0aXZlIiwibW91c2VJc092ZXIiLCJwbGF5T25Eb2N1bWVudFZpc2libGUiLCJlbWJsYUFwaUluc3RhbmNlIiwiZXZlbnRTdG9yZSIsIm93bmVyRG9jdW1lbnQiLCJpc0RyYWdnYWJsZSIsIndhdGNoRHJhZyIsInJvb3QiLCJ2aXNpYmlsaXR5Q2hhbmdlIiwicG9pbnRlckRvd24iLCJwb2ludGVyVXAiLCJtb3VzZUVudGVyIiwibW91c2VMZWF2ZSIsInN0b3BBdXRvcGxheSIsInN0YXJ0QXV0b3BsYXkiLCJzZXRUaW1lciIsIm93bmVyV2luZG93IiwibmV4dCIsImdldFRpbWUiLCJlbWl0IiwiY2xlYXJUaW1lciIsImRvY3VtZW50SXNIaWRkZW4iLCJ2aXNpYmlsaXR5U3RhdGUiLCJwbGF5IiwianVtcE92ZXJyaWRlIiwic3RvcCIsInJlc2V0IiwiaXNQbGF5aW5nIiwibmV4dEluZGV4IiwiY2xvbmUiLCJnZXQiLCJsYXN0SW5kZXgiLCJraWxsIiwidGltZVVudGlsTmV4dCIsImN1cnJlbnREZWxheSIsInRpbWVQYXN0U2luY2VTdGFydCIsImlzTnVtYmVyIiwic3ViamVjdCIsImlzU3RyaW5nIiwiaXNCb29sZWFuIiwiaXNPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRoQWJzIiwibiIsIm1hdGhTaWduIiwic2lnbiIsImRlbHRhQWJzIiwidmFsdWVCIiwidmFsdWVBIiwiZmFjdG9yQWJzIiwiZGlmZiIsInJvdW5kVG9Ud29EZWNpbWFscyIsIm51bSIsImFycmF5S2V5cyIsIm9iamVjdEtleXMiLCJOdW1iZXIiLCJhcnJheUxhc3QiLCJhcnJheUxhc3RJbmRleCIsImFycmF5SXNMYXN0SW5kZXgiLCJhcnJheUZyb21OdW1iZXIiLCJzdGFydEF0IiwiZnJvbSIsIm9iamVjdCIsImtleXMiLCJvYmplY3RzTWVyZ2VEZWVwIiwib2JqZWN0QSIsIm9iamVjdEIiLCJtZXJnZWRPYmplY3RzIiwiY3VycmVudE9iamVjdCIsImtleSIsImFyZU9iamVjdHMiLCJpc01vdXNlRXZlbnQiLCJldnQiLCJBbGlnbm1lbnQiLCJhbGlnbiIsInZpZXdTaXplIiwicHJlZGVmaW5lZCIsImNlbnRlciIsIm1lYXN1cmUiLCJFdmVudFN0b3JlIiwibm9kZSIsImhhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImxlZ2FjeU1lZGlhUXVlcnlMaXN0IiwiYWRkTGlzdGVuZXIiLCJjbGVhciIsIkFuaW1hdGlvbnMiLCJ1cGRhdGUiLCJyZW5kZXIiLCJkb2N1bWVudFZpc2libGVIYW5kbGVyIiwiZml4ZWRUaW1lU3RlcCIsImxhc3RUaW1lU3RhbXAiLCJhY2N1bXVsYXRlZFRpbWUiLCJhbmltYXRpb25JZCIsImhpZGRlbiIsImFuaW1hdGUiLCJ0aW1lRWxhcHNlZCIsImFscGhhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJBeGlzIiwiY29udGVudERpcmVjdGlvbiIsImlzUmlnaHRUb0xlZnQiLCJpc1ZlcnRpY2FsIiwic2Nyb2xsIiwiY3Jvc3MiLCJzdGFydEVkZ2UiLCJnZXRTdGFydEVkZ2UiLCJlbmRFZGdlIiwiZ2V0RW5kRWRnZSIsIm1lYXN1cmVTaXplIiwibm9kZVJlY3QiLCJkaXJlY3Rpb24iLCJMaW1pdCIsInJlYWNoZWRNaW4iLCJyZWFjaGVkTWF4IiwicmVhY2hlZEFueSIsImNvbnN0cmFpbiIsInJlbW92ZU9mZnNldCIsIkNvdW50ZXIiLCJsb29wIiwibG9vcEVuZCIsImNvdW50ZXIiLCJ3aXRoaW5MaW1pdCIsInNldCIsIkRyYWdIYW5kbGVyIiwiZHJhZ1RyYWNrZXIiLCJsb2NhdGlvbiIsImFuaW1hdGlvbiIsInNjcm9sbEJvZHkiLCJzY3JvbGxUYXJnZXQiLCJldmVudEhhbmRsZXIiLCJwZXJjZW50T2ZWaWV3IiwiZHJhZ1RocmVzaG9sZCIsImJhc2VGcmljdGlvbiIsImNyb3NzQXhpcyIsImZvY3VzTm9kZXMiLCJub25QYXNzaXZlRXZlbnQiLCJpbml0RXZlbnRzIiwiZHJhZ0V2ZW50cyIsImdvVG9OZXh0VGhyZXNob2xkIiwic25hcEZvcmNlQm9vc3QiLCJtb3VzZSIsInRvdWNoIiwiZnJlZUZvcmNlQm9vc3QiLCJiYXNlU3BlZWQiLCJpc01vdmluZyIsInN0YXJ0U2Nyb2xsIiwic3RhcnRDcm9zcyIsInBvaW50ZXJJc0Rvd24iLCJwcmV2ZW50U2Nyb2xsIiwicHJldmVudENsaWNrIiwiaXNNb3VzZSIsImRvd25JZkFsbG93ZWQiLCJkb3duIiwidXAiLCJjbGljayIsImFkZERyYWdFdmVudHMiLCJtb3ZlIiwiaXNGb2N1c05vZGUiLCJub2RlTmFtZSIsImluY2x1ZGVzIiwiZm9yY2VCb29zdCIsImJvb3N0IiwiYWxsb3dlZEZvcmNlIiwiZm9yY2UiLCJ0YXJnZXRDaGFuZ2VkIiwiYmFzZUZvcmNlIiwiYnlEaXN0YW5jZSIsImRpc3RhbmNlIiwiYnlJbmRleCIsImlzTW91c2VFdnQiLCJidXR0b25zIiwidXNlRnJpY3Rpb24iLCJ1c2VEdXJhdGlvbiIsInJlYWRQb2ludCIsImlzVG91Y2hFdnQiLCJ0b3VjaGVzIiwibGFzdFNjcm9sbCIsImxhc3RDcm9zcyIsImRpZmZTY3JvbGwiLCJkaWZmQ3Jvc3MiLCJwb2ludGVyTW92ZSIsImN1cnJlbnRMb2NhdGlvbiIsInJhd0ZvcmNlIiwiZm9yY2VGYWN0b3IiLCJzcGVlZCIsImZyaWN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRHJhZ1RyYWNrZXIiLCJsb2dJbnRlcnZhbCIsImxhc3RFdmVudCIsInJlYWRUaW1lIiwiZXZ0QXhpcyIsInByb3BlcnR5IiwiY29vcmQiLCJleHBpcmVkIiwiZGlmZkRyYWciLCJkaWZmVGltZSIsImlzRmxpY2siLCJOb2RlUmVjdHMiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJQZXJjZW50T2ZWaWV3IiwiUmVzaXplSGFuZGxlciIsImNvbnRhaW5lciIsInNsaWRlcyIsIndhdGNoUmVzaXplIiwibm9kZVJlY3RzIiwib2JzZXJ2ZU5vZGVzIiwicmVzaXplT2JzZXJ2ZXIiLCJjb250YWluZXJTaXplIiwic2xpZGVTaXplcyIsInJlYWRTaXplIiwiZGVmYXVsdENhbGxiYWNrIiwiZW50cmllcyIsImVudHJ5IiwiaXNDb250YWluZXIiLCJzbGlkZUluZGV4IiwiaW5kZXhPZiIsImxhc3RTaXplIiwibmV3U2l6ZSIsImRpZmZTaXplIiwicmVJbml0IiwiUmVzaXplT2JzZXJ2ZXIiLCJTY3JvbGxCb2R5Iiwib2Zmc2V0TG9jYXRpb24iLCJwcmV2aW91c0xvY2F0aW9uIiwiYmFzZUR1cmF0aW9uIiwic2Nyb2xsVmVsb2NpdHkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxEdXJhdGlvbiIsInNjcm9sbEZyaWN0aW9uIiwicmF3TG9jYXRpb24iLCJyYXdMb2NhdGlvblByZXZpb3VzIiwic2VlayIsImRpc3BsYWNlbWVudCIsImlzSW5zdGFudCIsInNjcm9sbERpc3RhbmNlIiwic2V0dGxlZCIsImR1cmF0aW9uIiwidXNlQmFzZUR1cmF0aW9uIiwidXNlQmFzZUZyaWN0aW9uIiwiU2Nyb2xsQm91bmRzIiwibGltaXQiLCJwdWxsQmFja1RocmVzaG9sZCIsImVkZ2VPZmZzZXRUb2xlcmFuY2UiLCJmcmljdGlvbkxpbWl0IiwiZGlzYWJsZWQiLCJzaG91bGRDb25zdHJhaW4iLCJlZGdlIiwiZGlmZlRvRWRnZSIsImRpZmZUb1RhcmdldCIsInN1YnRyYWN0IiwidG9nZ2xlQWN0aXZlIiwiU2Nyb2xsQ29udGFpbiIsImNvbnRlbnRTaXplIiwic25hcHNBbGlnbmVkIiwiY29udGFpblNjcm9sbCIsInBpeGVsVG9sZXJhbmNlIiwic2Nyb2xsQm91bmRzIiwic25hcHNCb3VuZGVkIiwibWVhc3VyZUJvdW5kZWQiLCJzY3JvbGxDb250YWluTGltaXQiLCJmaW5kU2Nyb2xsQ29udGFpbkxpbWl0Iiwic25hcHNDb250YWluZWQiLCJtZWFzdXJlQ29udGFpbmVkIiwidXNlUGl4ZWxUb2xlcmFuY2UiLCJib3VuZCIsInNuYXAiLCJzdGFydFNuYXAiLCJlbmRTbmFwIiwibGFzdEluZGV4T2YiLCJzbmFwQWxpZ25lZCIsImlzRmlyc3QiLCJpc0xhc3QiLCJzY3JvbGxCb3VuZCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiU2Nyb2xsTGltaXQiLCJTY3JvbGxMb29wZXIiLCJ2ZWN0b3JzIiwiam9pbnRTYWZldHkiLCJzaG91bGRMb29wIiwibG9vcERpc3RhbmNlIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJTY3JvbGxTbmFwcyIsImFsaWdubWVudCIsInNsaWRlUmVjdHMiLCJzbGlkZXNUb1Njcm9sbCIsImdyb3VwU2xpZGVzIiwiYWxpZ25tZW50cyIsIm1lYXN1cmVTaXplcyIsInNuYXBzIiwibWVhc3VyZVVuYWxpZ25lZCIsIm1lYXN1cmVBbGlnbmVkIiwicmVjdHMiLCJyZWN0IiwiZyIsIlNsaWRlUmVnaXN0cnkiLCJjb250YWluU25hcHMiLCJzbGlkZUluZGV4ZXMiLCJzbGlkZVJlZ2lzdHJ5IiwiY3JlYXRlU2xpZGVSZWdpc3RyeSIsImdyb3VwZWRTbGlkZUluZGV4ZXMiLCJkb05vdENvbnRhaW4iLCJncm91cCIsImdyb3VwcyIsInJhbmdlIiwiU2Nyb2xsVGFyZ2V0IiwidGFyZ2V0VmVjdG9yIiwibWluRGlzdGFuY2UiLCJkaXN0YW5jZXMiLCJzb3J0IiwiZmluZFRhcmdldFNuYXAiLCJhc2NEaWZmc1RvU25hcHMiLCJzaG9ydGN1dCIsImQxIiwiZDIiLCJtYXRjaGluZ1RhcmdldHMiLCJkaWZmVG9TbmFwIiwidGFyZ2V0U25hcERpc3RhbmNlIiwicmVhY2hlZEJvdW5kIiwic25hcERpc3RhbmNlIiwiU2Nyb2xsVG8iLCJpbmRleEN1cnJlbnQiLCJpbmRleFByZXZpb3VzIiwiZGlzdGFuY2VEaWZmIiwiaW5kZXhEaWZmIiwidGFyZ2V0SW5kZXgiLCJTbGlkZUZvY3VzIiwid2F0Y2hGb2N1cyIsImZvY3VzTGlzdGVuZXJPcHRpb25zIiwiY2FwdHVyZSIsImxhc3RUYWJQcmVzc1RpbWUiLCJub3dUaW1lIiwic2Nyb2xsTGVmdCIsImZpbmRJbmRleCIsInJlZ2lzdGVyVGFiUHJlc3MiLCJjb2RlIiwiVmVjdG9yMUQiLCJpbml0aWFsVmFsdWUiLCJub3JtYWxpemVJbnB1dCIsIlRyYW5zbGF0ZSIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiY29udGFpbmVyU3R5bGUiLCJzdHlsZSIsInByZXZpb3VzVGFyZ2V0IiwidG8iLCJuZXdUYXJnZXQiLCJ0cmFuc2Zvcm0iLCJnZXRBdHRyaWJ1dGUiLCJTbGlkZUxvb3BlciIsInNsaWRlU2l6ZXNXaXRoR2FwcyIsInJvdW5kaW5nU2FmZXR5IiwiYXNjSXRlbXMiLCJkZXNjSXRlbXMiLCJyZXZlcnNlIiwibG9vcFBvaW50cyIsInN0YXJ0UG9pbnRzIiwiZW5kUG9pbnRzIiwicmVtb3ZlU2xpZGVTaXplcyIsImluZGV4ZXMiLCJzbGlkZXNJbkdhcCIsImdhcCIsInJlbWFpbmluZ0dhcCIsImZpbmRTbGlkZUJvdW5kcyIsImZpbmRMb29wUG9pbnRzIiwiaXNFbmRFZGdlIiwic2xpZGVCb3VuZHMiLCJpbml0aWFsIiwiYWx0ZXJlZCIsImJvdW5kRWRnZSIsImxvb3BQb2ludCIsInNsaWRlTG9jYXRpb24iLCJjYW5Mb29wIiwiX3JlZiIsIm90aGVySW5kZXhlcyIsInNoaWZ0TG9jYXRpb24iLCJTbGlkZXNIYW5kbGVyIiwid2F0Y2hTbGlkZXMiLCJtdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwibXV0YXRpb24iLCJNdXRhdGlvbk9ic2VydmVyIiwiY2hpbGRMaXN0IiwiU2xpZGVzSW5WaWV3IiwidGhyZXNob2xkIiwiaW50ZXJzZWN0aW9uRW50cnlNYXAiLCJpblZpZXdDYWNoZSIsIm5vdEluVmlld0NhY2hlIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsInBhcmVudEVsZW1lbnQiLCJjcmVhdGVJblZpZXdMaXN0IiwiaW5WaWV3IiwibGlzdCIsInBhcnNlSW50IiwiaXNJbnRlcnNlY3RpbmciLCJpblZpZXdNYXRjaCIsIm5vdEluVmlld01hdGNoIiwiU2xpZGVTaXplcyIsInJlYWRFZGdlR2FwIiwid2l0aEVkZ2VHYXAiLCJzdGFydEdhcCIsIm1lYXN1cmVTdGFydEdhcCIsImVuZEdhcCIsIm1lYXN1cmVFbmRHYXAiLCJtZWFzdXJlV2l0aEdhcHMiLCJzbGlkZVJlY3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIlNsaWRlc1RvU2Nyb2xsIiwiZ3JvdXBCeU51bWJlciIsImJ5TnVtYmVyIiwiZ3JvdXBTaXplIiwiYnlTaXplIiwicmVjdEIiLCJyZWN0QSIsImVkZ2VBIiwiZWRnZUIiLCJnYXBBIiwiZ2FwQiIsImNodW5rU2l6ZSIsImN1cnJlbnRTaXplIiwicHJldmlvdXNTaXplIiwiRW5naW5lIiwic2Nyb2xsQXhpcyIsInN0YXJ0SW5kZXgiLCJpblZpZXdUaHJlc2hvbGQiLCJfcmVmMiIsImRyYWdIYW5kbGVyIiwiX3JlZjMiLCJzY3JvbGxMb29wZXIiLCJzbGlkZUxvb3BlciIsInNob3VsZFNldHRsZSIsIndpdGhpbkJvdW5kcyIsImhhc1NldHRsZWQiLCJoYXNTZXR0bGVkQW5kSWRsZSIsImludGVycG9sYXRlZExvY2F0aW9uIiwic3RhcnRMb2NhdGlvbiIsInNsaWRlc0luVmlldyIsInNsaWRlRm9jdXMiLCJyZXNpemVIYW5kbGVyIiwic2xpZGVzSGFuZGxlciIsIkV2ZW50SGFuZGxlciIsImFwaSIsImdldExpc3RlbmVycyIsImNiIiwiT3B0aW9uc0hhbmRsZXIiLCJvcHRpb25zQSIsIm9wdGlvbnNCIiwibWF0Y2hlZE1lZGlhT3B0aW9ucyIsIm1lZGlhIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtZWRpYU9wdGlvbiIsIm9wdGlvbnNNZWRpYVF1ZXJpZXMiLCJvcHRpb25zTGlzdCIsImFjYyIsIm1lZGlhUXVlcmllcyIsIlBsdWdpbnNIYW5kbGVyIiwiYWN0aXZlUGx1Z2lucyIsInBsdWdpbnMiLCJfcmVmNCIsInBsdWdpbiIsImFzc2lnbiIsIkVtYmxhQ2Fyb3VzZWwiLCJ1c2VyUGx1Z2lucyIsImRlZmF1bHRWaWV3IiwicGx1Z2luc0hhbmRsZXIiLCJtZWRpYUhhbmRsZXJzIiwicmVBY3RpdmF0ZSIsInBsdWdpbkxpc3QiLCJwbHVnaW5BcGlzIiwic3RvcmVFbGVtZW50cyIsInVzZXJDb250YWluZXIiLCJ1c2VyU2xpZGVzIiwiY3VzdG9tQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiY3VzdG9tU2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZUVuZ2luZSIsIm9wdGlvbnNXaXRob3V0TG9vcCIsImFjdGl2YXRlIiwid2l0aE9wdGlvbnMiLCJ3aXRoUGx1Z2lucyIsIl9yZWY1IiwicXVlcnkiLCJvZmZzZXRQYXJlbnQiLCJkZUFjdGl2YXRlIiwicHJldiIsInByZXZpb3VzU2Nyb2xsU25hcCIsInNsaWRlc05vdEluVmlldyIsInNsaWRlTm9kZXMiLCJZVER5bmFtaWNzR2FsbGVyeSIsImRhdGFzZXQiLCJybUdhbGxlcnlSZWFkeSIsIm9yaWVudGF0aW9uIiwidGh1bWJBeGlzIiwibmF2TW9kZSIsIm5hdiIsImRyYWciLCJhdXRvcGxheSIsImF1dG9wbGF5RGVsYXkiLCJhdXRvcGxheVBhdXNlIiwibW9iaWxlQXhpcyIsIm1vYmlsZVRodW1iQXhpcyIsIm9wdGlvbnNUaHVtYnMiLCJ2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwiLCJ2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsIiwicHJldlRodW1iQnRuTm9kZSIsIm5leHRUaHVtYkJ0bk5vZGUiLCJwcmV2TWFpbkJ0bk5vZGUiLCJuZXh0TWFpbkJ0bk5vZGUiLCJlbWJsYU1haW4iLCJjbGVhbnVwcyIsImVtYmxhVGh1bWIiLCJuYXZOb2RlcyIsImluaXRHYWxsZXJpZXMiLCJlbGVtZW50Iiwib2JzZXJ2ZUdhbGxlcmllcyIsInJlY29yZHMiLCJhZGRlZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwic3VidHJlZSIsInJlYWR5U3RhdGUiLCJvbmNlIl0sInNvdXJjZVJvb3QiOiIifQ==
