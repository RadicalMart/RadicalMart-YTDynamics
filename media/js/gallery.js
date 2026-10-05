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
/* harmony import */ var _runtime_es6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.es6 */ "./src/runtime.es6");
/* harmony import */ var _buttons_es6__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buttons.es6 */ "./src/buttons.es6");






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
      cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_5__.addThumbButtonsClickHandlers)(emblaMain, navNodes), (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_5__.addToggleThumbButtonsActive)(emblaMain, navNodes, emblaThumb));
      if (emblaThumb && prevThumbBtnNode && nextThumbBtnNode) {
        cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_5__.addPrevNextButtonsClickHandlers)(emblaThumb, prevThumbBtnNode, nextThumbBtnNode));
      }
    }
    if (prevMainBtnNode && nextMainBtnNode) {
      cleanups.push((0,_buttons_es6__WEBPACK_IMPORTED_MODULE_5__.addPrevNextButtonsClickHandlers)(emblaMain, prevMainBtnNode, nextMainBtnNode));
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
  (0,_runtime_es6__WEBPACK_IMPORTED_MODULE_4__.observeDynamicContent)(initGalleries, destroyGalleries);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTztJQUNyQyxJQUFJLENBQUNELEtBQUssRUFBRWxILGdCQUFnQixJQUFJLENBQUNtSCxPQUFPLEVBQUU7SUFDMUNELEtBQUssQ0FBQ2xILGdCQUFnQixDQUFDLGtDQUFrQyxDQUFDLENBQUN2cUIsT0FBTyxDQUFFNHhCLE9BQU8sSUFBSztNQUM1RSxJQUFJQSxPQUFPLENBQUNDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLSixLQUFLLEVBQUU7UUFDdER0QyxvQkFBb0IsQ0FBQ3lDLE9BQU8sRUFBRUYsT0FBTyxDQUFDaEosS0FBSyxJQUFJLEVBQUUsQ0FBQztNQUN0RDtJQUNKLENBQUMsQ0FBQztJQUNGK0ksS0FBSyxDQUFDbEgsZ0JBQWdCLENBQUMsZ0VBQWdFLENBQUMsQ0FBQ3ZxQixPQUFPLENBQUU0eEIsT0FBTyxJQUFLO01BQzFHLElBQUlBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEtBQUtKLEtBQUssRUFBRTtRQUN0RFAsd0JBQXdCLENBQUNVLE9BQU8sRUFBRUYsT0FBTyxDQUFDSSxRQUFRLElBQUlKLE9BQU8sQ0FBQ2hKLEtBQUssSUFBSSxFQUFFLENBQUM7TUFDOUU7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRmxlLG1FQUFxQixDQUFDNm1CLGFBQWEsRUFBRUUsZ0JBQWdCLENBQUM7QUFDMUQsQ0FBQztBQUVELElBQUlsM0IsUUFBUSxDQUFDMDNCLFVBQVUsS0FBSyxTQUFTLEVBQUU7RUFDbkMxM0IsUUFBUSxDQUFDRSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRWkzQixnQkFBZ0IsRUFBRTtJQUFDUSxJQUFJLEVBQUU7RUFBSSxDQUFDLENBQUM7QUFDakYsQ0FBQyxNQUFNO0VBQ0hSLGdCQUFnQixDQUFDLENBQUM7QUFDdEIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvV2hlZWxHZXN0dXJlc1BsdWdpbi50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3V0aWxzL3Byb2plY3Rpb24udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2V2ZW50cy9FdmVudEJ1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2V2ZW50cy9XaGVlbFRhcmdldE9ic2VydmVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvd2hlZWwtbm9ybWFsaXplci93aGVlbC1ub3JtYWxpemVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvd2hlZWwtZ2VzdHVyZXMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvd2hlZWwtZ2VzdHVyZXMvb3B0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL3doZWVsLWdlc3R1cmVzL3N0YXRlLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvd2hlZWwtZ2VzdHVyZXMvd2hlZWwtZ2VzdHVyZXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2J1dHRvbnMuZXM2Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9ydW50aW1lLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvZ2FsbGVyeS5zY3NzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy91dGlscy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXV0b3BsYXkudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9nYWxsZXJ5LmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVhdGVPcHRpb25zVHlwZSwgQ3JlYXRlUGx1Z2luVHlwZSwgRW1ibGFDYXJvdXNlbFR5cGUsIE9wdGlvbnNIYW5kbGVyVHlwZSB9IGZyb20gJ2VtYmxhLWNhcm91c2VsJ1xuaW1wb3J0IFdoZWVsR2VzdHVyZXMsIHsgV2hlZWxFdmVudFN0YXRlIH0gZnJvbSAnd2hlZWwtZ2VzdHVyZXMnXG5cbmV4cG9ydCB0eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5PcHRpb25zID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICB3aGVlbERyYWdnaW5nQ2xhc3M6IHN0cmluZ1xuICBmb3JjZVdoZWVsQXhpcz86ICd4JyB8ICd5J1xuICB0YXJnZXQ/OiBFbGVtZW50XG59PlxuXG50eXBlIFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0gQ3JlYXRlUGx1Z2luVHlwZTx7fSwgV2hlZWxHZXN0dXJlc1BsdWdpbk9wdGlvbnM+XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9ucyA9IHtcbiAgYWN0aXZlOiB0cnVlLFxuICBicmVha3BvaW50czoge30sXG4gIHdoZWVsRHJhZ2dpbmdDbGFzczogJ2lzLXdoZWVsLWRyYWdnaW5nJyxcbiAgZm9yY2VXaGVlbEF4aXM6IHVuZGVmaW5lZCxcbiAgdGFyZ2V0OiB1bmRlZmluZWQsXG59XG5cbldoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZCBhcyBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddIHwgdW5kZWZpbmVkXG5cbmNvbnN0IF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbEdlc3R1cmVzUGx1Z2luKHVzZXJPcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVsnb3B0aW9ucyddID0ge30pOiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZSB7XG4gIGxldCBvcHRpb25zOiBXaGVlbEdlc3R1cmVzUGx1Z2luT3B0aW9uc1xuICBsZXQgY2xlYW51cCA9ICgpID0+IHt9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYTogRW1ibGFDYXJvdXNlbFR5cGUsIG9wdGlvbnNIYW5kbGVyOiBPcHRpb25zSGFuZGxlclR5cGUpIHtcbiAgICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEgfSA9IG9wdGlvbnNIYW5kbGVyXG4gICAgY29uc3Qgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIFdoZWVsR2VzdHVyZXNQbHVnaW4uZ2xvYmFsT3B0aW9ucylcbiAgICBjb25zdCBhbGxPcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB1c2VyT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEoYWxsT3B0aW9ucylcblxuICAgIGNvbnN0IGVuZ2luZSA9IGVtYmxhLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCB0YXJnZXROb2RlID0gb3B0aW9ucy50YXJnZXQgPz8gKGVtYmxhLmNvbnRhaW5lck5vZGUoKS5wYXJlbnROb2RlIGFzIEVsZW1lbnQpXG4gICAgY29uc3Qgd2hlZWxBeGlzID0gb3B0aW9ucy5mb3JjZVdoZWVsQXhpcyA/PyBlbmdpbmUub3B0aW9ucy5heGlzXG4gICAgY29uc3Qgd2hlZWxHZXN0dXJlcyA9IFdoZWVsR2VzdHVyZXMoe1xuICAgICAgcHJldmVudFdoZWVsQWN0aW9uOiB3aGVlbEF4aXMsXG4gICAgICByZXZlcnNlU2lnbjogW3RydWUsIHRydWUsIGZhbHNlXSxcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKSB7XG4gICAgICBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9ICh3aGVlbEF4aXMgPT09ICd4JyA/IGVuZ2luZS5jb250YWluZXJSZWN0LndpZHRoIDogZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0KSAvIDJcbiAgICB9XG5cbiAgICBjb25zdCB1bm9ic2VydmVUYXJnZXROb2RlID0gd2hlZWxHZXN0dXJlcy5vYnNlcnZlKHRhcmdldE5vZGUpXG4gICAgY29uc3Qgb2ZmV2hlZWwgPSB3aGVlbEdlc3R1cmVzLm9uKCd3aGVlbCcsIGhhbmRsZVdoZWVsKVxuXG4gICAgbGV0IGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgbGV0IHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnRcbiAgICBsZXQgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uID0gMFxuICAgIGxldCBzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCA9IDBcbiAgICBsZXQgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSBmYWxzZVxuXG4gICAgdXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMoKVxuICAgIGVtYmxhLm9uKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhcnRFdmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nLCBzdGF0ZS5ldmVudClcbiAgICAgICAgZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBMZWdhY3kgQnJvd3NlcnMgbGlrZSBJRSAxMCAmIDExIHdpbGwgdGhyb3cgd2hlbiBhdHRlbXB0aW5nIHRvIGNyZWF0ZSB0aGUgRXZlbnRcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnTGVnYWN5IGJyb3dzZXIgcmVxdWlyZXMgZXZlbnRzLXBvbHlmaWxsIChodHRwczovL2dpdGh1Yi5jb20veGllbC9lbWJsYS1jYXJvdXNlbC13aGVlbC1nZXN0dXJlcyNsZWdhY3ktYnJvd3NlcnMpJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xlYW51cCgpXG4gICAgICB9XG5cbiAgICAgIGlzU3RhcnRlZCA9IHRydWVcbiAgICAgIG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA9IDBcbiAgICAgIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QuYWRkKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdoZWVsR2VzdHVyZUVuZGVkKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGlzU3RhcnRlZCA9IGZhbHNlXG4gICAgICBkaXNwYXRjaEV2ZW50KGNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCgnbW91c2V1cCcsIHN0YXRlKSlcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICBpZiAob3B0aW9ucy53aGVlbERyYWdnaW5nQ2xhc3MpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKG9wdGlvbnMud2hlZWxEcmFnZ2luZ0NsYXNzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcHJldmVudE5hdGl2ZU1vdXNlSGFuZGxlciwgdHJ1ZSlcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZlbnROYXRpdmVNb3VzZUhhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgICAgaWYgKGlzU3RhcnRlZCAmJiBlLmlzVHJ1c3RlZCkge1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KHR5cGU6ICdtb3VzZWRvd24nIHwgJ21vdXNlbW92ZScgfCAnbW91c2V1cCcsIHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGxldCBtb3ZlWCwgbW92ZVlcblxuICAgICAgaWYgKHdoZWVsQXhpcyA9PT0gZW5naW5lLm9wdGlvbnMuYXhpcykge1xuICAgICAgICA7W21vdmVYLCBtb3ZlWV0gPSBzdGF0ZS5heGlzTW92ZW1lbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGVtYmxhcyBheGlzIGFuZCB0aGUgd2hlZWxBeGlzIGRvbid0IG1hdGNoLCBzd2FwIHRoZSBheGVzIHRvIG1hdGNoIHRoZSByaWdodCBlbWJsYSBldmVudHNcbiAgICAgICAgO1ttb3ZlWSwgbW92ZVhdID0gc3RhdGUuYXhpc01vdmVtZW50XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgaXNBdEJvdW5kYXJ5IH0gPSBjaGVja0lmQXRCb3VuZGFyeShzdGF0ZSlcblxuICAgICAgLy8gQXBwbHkgcHJvZ3Jlc3NpdmUgcnViYmVyIGJhbmQgZGFtcGluZyB3aGVuIGF0IGJvdW5kYXJpZXNcbiAgICAgIGlmIChpc0F0Qm91bmRhcnkpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2dyZXNzaXZlIGRhbXBpbmcgZmFjdG9yIGJhc2VkIG9uIGhvdyBmYXIgb3ZlciBib3VuZGFyeSB3ZSBhcmVcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NSYXRpbyA9IE1hdGgubWluKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAvIHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkLCAxKVxuICAgICAgICBjb25zdCBkYW1waW5nRmFjdG9yID0gMC4yNSArIHByb2dyZXNzUmF0aW8gKiAwLjVcbiAgICAgICAgY29uc3QgY291bnRlck1vdmVTaWduID0gbW92ZVggPiAwID8gLTEgOiAxXG4gICAgICAgIGNvbnN0IGNvdW50ZXJNb3ZlbWVudCA9IG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiAqIGNvdW50ZXJNb3ZlU2lnblxuICAgICAgICBjb25zdCBkYW1waW5nTW92ZW1lbnQgPSBjb3VudGVyTW92ZW1lbnQgKiBkYW1waW5nRmFjdG9yXG5cbiAgICAgICAgbW92ZVggKz0gZGFtcGluZ01vdmVtZW50XG4gICAgICAgIG1vdmVZICs9IGRhbXBpbmdNb3ZlbWVudFxuICAgICAgfVxuXG4gICAgICAvLyBwcmV2ZW50IHNraXBwaW5nIHNsaWRlc1xuICAgICAgaWYgKCFlbmdpbmUub3B0aW9ucy5za2lwU25hcHMgJiYgIWVuZ2luZS5vcHRpb25zLmRyYWdGcmVlKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBlbmdpbmUuY29udGFpbmVyUmVjdC53aWR0aFxuICAgICAgICBjb25zdCBtYXhZID0gZW5naW5lLmNvbnRhaW5lclJlY3QuaGVpZ2h0XG5cbiAgICAgICAgbW92ZVggPSBtb3ZlWCA8IDAgPyBNYXRoLm1heChtb3ZlWCwgLW1heFgpIDogTWF0aC5taW4obW92ZVgsIG1heFgpXG4gICAgICAgIG1vdmVZID0gbW92ZVkgPCAwID8gTWF0aC5tYXgobW92ZVksIC1tYXhZKSA6IE1hdGgubWluKG1vdmVZLCBtYXhZKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vdXNlRXZlbnQodHlwZSwge1xuICAgICAgICBjbGllbnRYOiBzdGFydEV2ZW50LmNsaWVudFggKyBtb3ZlWCxcbiAgICAgICAgY2xpZW50WTogc3RhcnRFdmVudC5jbGllbnRZICsgbW92ZVksXG4gICAgICAgIHNjcmVlblg6IHN0YXJ0RXZlbnQuc2NyZWVuWCArIG1vdmVYLFxuICAgICAgICBzY3JlZW5ZOiBzdGFydEV2ZW50LnNjcmVlblkgKyBtb3ZlWSxcbiAgICAgICAgbW92ZW1lbnRYOiBtb3ZlWCxcbiAgICAgICAgbW92ZW1lbnRZOiBtb3ZlWSxcbiAgICAgICAgYnV0dG9uOiAwLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudDogVUlFdmVudCkge1xuICAgICAgZW1ibGEuY29udGFpbmVyTm9kZSgpLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBheGlzRGVsdGE6IFtkZWx0YVgsIGRlbHRhWV0sXG4gICAgICB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gZW1ibGEuc2Nyb2xsUHJvZ3Jlc3MoKVxuICAgICAgY29uc3QgY2FuU2Nyb2xsTmV4dCA9IHNjcm9sbFByb2dyZXNzIDwgMVxuICAgICAgY29uc3QgY2FuU2Nyb2xsUHJldiA9IHNjcm9sbFByb2dyZXNzID4gMFxuICAgICAgY29uc3QgcHJpbWFyeUF4aXNEZWx0YSA9IHdoZWVsQXhpcyA9PT0gJ3gnID8gZGVsdGFYIDogZGVsdGFZXG4gICAgICBjb25zdCBpc1Njcm9sbGluZ05leHQgPSBwcmltYXJ5QXhpc0RlbHRhIDwgMFxuICAgICAgY29uc3QgaXNTY3JvbGxpbmdQcmV2ID0gcHJpbWFyeUF4aXNEZWx0YSA+IDBcbiAgICAgIGNvbnN0IGlzQXRCb3VuZGFyeSA9IChpc1Njcm9sbGluZ05leHQgJiYgIWNhblNjcm9sbE5leHQpIHx8IChpc1Njcm9sbGluZ1ByZXYgJiYgIWNhblNjcm9sbFByZXYpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzQXRCb3VuZGFyeSxcbiAgICAgICAgcHJpbWFyeUF4aXNEZWx0YSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZChzdGF0ZTogV2hlZWxFdmVudFN0YXRlKSB7XG4gICAgICBjb25zdCB7IGlzQXRCb3VuZGFyeSwgcHJpbWFyeUF4aXNEZWx0YSB9ID0gY2hlY2tJZkF0Qm91bmRhcnkoc3RhdGUpXG5cbiAgICAgIGlmIChpc0F0Qm91bmRhcnkgJiYgIXN0YXRlLmlzTW9tZW50dW0pIHtcbiAgICAgICAgb3ZlckJvdW5kYXJ5QWNjdW11bGF0aW9uICs9IE1hdGguYWJzKHByaW1hcnlBeGlzRGVsdGEpXG5cbiAgICAgICAgLy8gRW5kIGdlc3R1cmUgaWYgd2UgZXhjZWVkIHRoZSB0aHJlc2hvbGRcbiAgICAgICAgaWYgKG92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiA+IHNjcm9sbEJvdW5kYXJ5VGhyZXNob2xkKSB7XG4gICAgICAgICAgYmxvY2tlZFdhaXRVbnRpbEdlc3R1cmVFbmQgPSB0cnVlXG4gICAgICAgICAgd2hlZWxHZXN0dXJlRW5kZWQoc3RhdGUpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWNjdW11bGF0aW9uIHdoZW4gd2UgY2FuIHNjcm9sbCBvciB3aGVuIG5vdCBhdCBib3VuZGFyeVxuICAgICAgICBvdmVyQm91bmRhcnlBY2N1bXVsYXRpb24gPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdoZWVsKHN0YXRlOiBXaGVlbEV2ZW50U3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVldLFxuICAgICAgfSA9IHN0YXRlXG4gICAgICBjb25zdCBwcmltYXJ5QXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVggOiBkZWx0YVlcbiAgICAgIGNvbnN0IGNyb3NzQXhpc0RlbHRhID0gd2hlZWxBeGlzID09PSAneCcgPyBkZWx0YVkgOiBkZWx0YVhcbiAgICAgIGNvbnN0IGlzUmVsZWFzZSA9IHN0YXRlLmlzTW9tZW50dW0gJiYgc3RhdGUucHJldmlvdXMgJiYgIXN0YXRlLnByZXZpb3VzLmlzTW9tZW50dW1cbiAgICAgIGNvbnN0IGlzRW5kaW5nT3JSZWxlYXNlID0gKHN0YXRlLmlzRW5kaW5nICYmICFzdGF0ZS5pc01vbWVudHVtKSB8fCBpc1JlbGVhc2VcbiAgICAgIGNvbnN0IHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ID0gTWF0aC5hYnMocHJpbWFyeUF4aXNEZWx0YSkgPiBNYXRoLmFicyhjcm9zc0F4aXNEZWx0YSlcblxuICAgICAgaWYgKHByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50ICYmICFpc1N0YXJ0ZWQgJiYgIXN0YXRlLmlzTW9tZW50dW0gJiYgIWJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kKSB7XG4gICAgICAgIHdoZWVsR2VzdHVyZVN0YXJ0ZWQoc3RhdGUpXG4gICAgICB9XG5cbiAgICAgIGlmIChibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCAmJiBzdGF0ZS5pc0VuZGluZykge1xuICAgICAgICBibG9ja2VkV2FpdFVudGlsR2VzdHVyZUVuZCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdGFydGVkKSByZXR1cm5cblxuICAgICAgaWYgKGlzQm91bmRhcnlUaHJlc2hvbGRSZWFjaGVkKHN0YXRlKSkgcmV0dXJuXG5cbiAgICAgIGlmIChpc0VuZGluZ09yUmVsZWFzZSkge1xuICAgICAgICB3aGVlbEdlc3R1cmVFbmRlZChzdGF0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQoY3JlYXRlUmVsYXRpdmVNb3VzZUV2ZW50KCdtb3VzZW1vdmUnLCBzdGF0ZSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgIHVub2JzZXJ2ZVRhcmdldE5vZGUoKVxuICAgICAgb2ZmV2hlZWwoKVxuICAgICAgZW1ibGEub2ZmKCdyZXNpemUnLCB1cGRhdGVTaXplUmVsYXRlZFZhcmlhYmxlcylcbiAgICAgIHJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFdoZWVsR2VzdHVyZXNQbHVnaW5UeXBlID0ge1xuICAgIG5hbWU6ICd3aGVlbEdlc3R1cmVzJyxcbiAgICBvcHRpb25zOiB1c2VyT3B0aW9ucyxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3k6ICgpID0+IGNsZWFudXAoKSxcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG1vZHVsZSAnZW1ibGEtY2Fyb3VzZWwnIHtcbiAgaW50ZXJmYWNlIEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHdoZWVsR2VzdHVyZXM/OiBXaGVlbEdlc3R1cmVzUGx1Z2luVHlwZVxuICB9XG59XG4iLCJjb25zdCBERUNBWSA9IDAuOTk2XG5cbi8qKlxuICogbW92ZW1lbnQgcHJvamVjdGlvbiBiYXNlZCBvbiB2ZWxvY2l0eVxuICogQHBhcmFtIHZlbG9jaXR5UHhNc1xuICogQHBhcmFtIGRlY2F5XG4gKi9cbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uID0gKHZlbG9jaXR5UHhNczogbnVtYmVyLCBkZWNheSA9IERFQ0FZKSA9PiAodmVsb2NpdHlQeE1zICogZGVjYXkpIC8gKDEgLSBkZWNheSlcbiIsImV4cG9ydCAqIGZyb20gJy4vcHJvamVjdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RPZjxUPihhcnJheTogVFtdKSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXZlcmFnZShudW1iZXJzOiBudW1iZXJbXSkge1xuICByZXR1cm4gbnVtYmVycy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIG51bWJlcnMubGVuZ3RoXG59XG5cbmV4cG9ydCBjb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgubWluKE1hdGgubWF4KG1pbiwgdmFsdWUpLCBtYXgpXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRWZWN0b3JzPFQgZXh0ZW5kcyBudW1iZXJbXT4odjE6IFQsIHYyOiBUKTogVCB7XG4gIGlmICh2MS5sZW5ndGggIT09IHYyLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndmVjdG9ycyBtdXN0IGJlIHNhbWUgbGVuZ3RoJylcbiAgfVxuICByZXR1cm4gdjEubWFwKCh2YWwsIGkpID0+IHZhbCArIHYyW2ldKSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnNNYXgobnVtYmVyczogbnVtYmVyW10pIHtcbiAgcmV0dXJuIE1hdGgubWF4KC4uLm51bWJlcnMubWFwKE1hdGguYWJzKSlcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRnJlZXplPFQgZXh0ZW5kcyBvYmplY3Q+KG86IFQpOiBSZWFkb25seTxUPiB7XG4gIE9iamVjdC5mcmVlemUobylcbiAgT2JqZWN0LnZhbHVlcyhvKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4odmFsdWUpKSB7XG4gICAgICBkZWVwRnJlZXplKHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG9cbn1cbiIsImltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IHR5cGUgRXZlbnRNYXBFbXB0eSA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyPEQgPSB1bmtub3duPiA9IChkYXRhOiBEKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBPZmYgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50QnVzPEV2ZW50TWFwID0gRXZlbnRNYXBFbXB0eT4oKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IHt9IGFzIFJlY29yZDxrZXlvZiBFdmVudE1hcCwgRXZlbnRMaXN0ZW5lcjxuZXZlcj5bXT5cblxuICBmdW5jdGlvbiBvbjxFSyBleHRlbmRzIGtleW9mIEV2ZW50TWFwPih0eXBlOiBFSywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXI8RXZlbnRNYXBbRUtdPik6IE9mZiB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gKGxpc3RlbmVyc1t0eXBlXSB8fCBbXSkuY29uY2F0KGxpc3RlbmVyKVxuICAgIHJldHVybiAoKSA9PiBvZmYodHlwZSwgbGlzdGVuZXIpXG4gIH1cblxuICBmdW5jdGlvbiBvZmY8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyPEV2ZW50TWFwW0VLXT4pIHtcbiAgICBsaXN0ZW5lcnNbdHlwZV0gPSAobGlzdGVuZXJzW3R5cGVdIHx8IFtdKS5maWx0ZXIoKGwpID0+IGwgIT09IGxpc3RlbmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2g8RUsgZXh0ZW5kcyBrZXlvZiBFdmVudE1hcD4odHlwZTogRUssIGRhdGE6IEV2ZW50TWFwW0VLXSkge1xuICAgIGlmICghKHR5cGUgaW4gbGlzdGVuZXJzKSkgcmV0dXJuXG4gICAgOyhsaXN0ZW5lcnNbdHlwZV0gYXMgRXZlbnRMaXN0ZW5lcjxFdmVudE1hcFtFS10+W10pLmZvckVhY2goKGwpID0+IGwoZGF0YSkpXG4gIH1cblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGRpc3BhdGNoLFxuICB9KVxufVxuIiwiaW1wb3J0IHsgV2hlZWxFdmVudERhdGEgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IGRlZXBGcmVlemUgfSBmcm9tICcuLi91dGlscydcblxudHlwZSBVbm9ic2VydmVUYXJnZXQgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBmdW5jdGlvbiBXaGVlbFRhcmdldE9ic2VydmVyKGV2ZW50TGlzdGVuZXI6ICh3aGVlbEV2ZW50OiBXaGVlbEV2ZW50RGF0YSkgPT4gdm9pZCkge1xuICBsZXQgdGFyZ2V0czogRXZlbnRUYXJnZXRbXSA9IFtdXG5cbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IG9ic2VydmUgPSAodGFyZ2V0OiBFdmVudFRhcmdldCk6IFVub2JzZXJ2ZVRhcmdldCA9PiB7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyLCB7IHBhc3NpdmU6IGZhbHNlIH0pXG4gICAgdGFyZ2V0cy5wdXNoKHRhcmdldClcblxuICAgIHJldHVybiAoKSA9PiB1bm9ic2VydmUodGFyZ2V0KVxuICB9XG5cbiAgLy8vIHJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tIHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IHVub2JzZXJ2ZSA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZXZlbnRMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyKVxuICAgIHRhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gdCAhPT0gdGFyZ2V0KVxuICB9XG5cbiAgLy8gc3RvcHMgd2F0Y2hpbmcgYWxsIG9mIGl0cyB0YXJnZXQgZWxlbWVudHMgZm9yIHZpc2liaWxpdHkgY2hhbmdlcy5cbiAgY29uc3QgZGlzY29ubmVjdCA9ICgpID0+IHtcbiAgICB0YXJnZXRzLmZvckVhY2godW5vYnNlcnZlKVxuICB9XG5cbiAgcmV0dXJuIGRlZXBGcmVlemUoe1xuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBSZXZlcnNlU2lnbiwgVmVjdG9yWFlaLCBXaGVlbEV2ZW50RGF0YSB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVkV2hlZWwge1xuICBheGlzRGVsdGE6IFZlY3RvclhZWlxuICB0aW1lU3RhbXA6IG51bWJlclxufVxuXG5jb25zdCBMSU5FX0hFSUdIVCA9IDE2ICogMS4xMjVcbmNvbnN0IFBBR0VfSEVJR0hUID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5pbm5lckhlaWdodCkgfHwgODAwXG5jb25zdCBERUxUQV9NT0RFX1VOSVQgPSBbMSwgTElORV9IRUlHSFQsIFBBR0VfSEVJR0hUXVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplV2hlZWwoZTogV2hlZWxFdmVudERhdGEpOiBOb3JtYWxpemVkV2hlZWwge1xuICBjb25zdCBkZWx0YVggPSBlLmRlbHRhWCAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cbiAgY29uc3QgZGVsdGFZID0gZS5kZWx0YVkgKiBERUxUQV9NT0RFX1VOSVRbZS5kZWx0YU1vZGVdXG4gIGNvbnN0IGRlbHRhWiA9IChlLmRlbHRhWiB8fCAwKSAqIERFTFRBX01PREVfVU5JVFtlLmRlbHRhTW9kZV1cblxuICByZXR1cm4ge1xuICAgIHRpbWVTdGFtcDogZS50aW1lU3RhbXAsXG4gICAgYXhpc0RlbHRhOiBbZGVsdGFYLCBkZWx0YVksIGRlbHRhWl0sXG4gIH1cbn1cblxuY29uc3QgcmV2ZXJzZUFsbCA9IFstMSwgLTEsIC0xXVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUF4aXNEZWx0YVNpZ248VCBleHRlbmRzIFBpY2s8Tm9ybWFsaXplZFdoZWVsLCAnYXhpc0RlbHRhJz4+KFxuICB3aGVlbDogVCxcbiAgcmV2ZXJzZVNpZ246IFJldmVyc2VTaWduXG4pOiBUIHtcbiAgaWYgKCFyZXZlcnNlU2lnbikge1xuICAgIHJldHVybiB3aGVlbFxuICB9XG5cbiAgY29uc3QgbXVsdGlwbGllcnMgPSByZXZlcnNlU2lnbiA9PT0gdHJ1ZSA/IHJldmVyc2VBbGwgOiByZXZlcnNlU2lnbi5tYXAoKHNob3VsZFJldmVyc2UpID0+IChzaG91bGRSZXZlcnNlID8gLTEgOiAxKSlcblxuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEsIGkpID0+IGRlbHRhICogbXVsdGlwbGllcnNbaV0pLFxuICB9XG59XG5cbmNvbnN0IERFTFRBX01BWF9BQlMgPSA3MDBcblxuZXhwb3J0IGNvbnN0IGNsYW1wQXhpc0RlbHRhID0gPFQgZXh0ZW5kcyBQaWNrPE5vcm1hbGl6ZWRXaGVlbCwgJ2F4aXNEZWx0YSc+Pih3aGVlbDogVCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLndoZWVsLFxuICAgIGF4aXNEZWx0YTogd2hlZWwuYXhpc0RlbHRhLm1hcCgoZGVsdGEpID0+IGNsYW1wKGRlbHRhLCAtREVMVEFfTUFYX0FCUywgREVMVEFfTUFYX0FCUykpLFxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBjb25zdCBBQ0NfRkFDVE9SX01JTiA9IDAuNlxuZXhwb3J0IGNvbnN0IEFDQ19GQUNUT1JfTUFYID0gMC45NlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX01FUkdFID0gMlxuZXhwb3J0IGNvbnN0IFdIRUVMRVZFTlRTX1RPX0FOQUxBWkUgPSA1XG4iLCJpbXBvcnQgeyBXaGVlbEdlc3R1cmVzQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBkZWVwRnJlZXplIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjb25maWdEZWZhdWx0czogV2hlZWxHZXN0dXJlc0NvbmZpZyA9IGRlZXBGcmVlemUoe1xuICBwcmV2ZW50V2hlZWxBY3Rpb246IHRydWUsXG4gIHJldmVyc2VTaWduOiBbdHJ1ZSwgdHJ1ZSwgZmFsc2VdLFxufSlcbiIsIi8qKlxuICogdGhlIHRpbWVvdXQgaXMgYXV0b21hdGljYWxseSBhZGp1c3RlZCBkdXJpbmcgYSBnZXN0dXJlXG4gKiB0aGUgaW5pdGlhbCB0aW1lb3V0IHBlcmlvZCBpcyBwcmV0dHkgbG9uZywgc28gZXZlbiBvbGQgbW91c2VzLCB3aGljaCBlbWl0IHdoZWVsIGV2ZW50cyBsZXNzIG9mdGVuLCBjYW4gcHJvZHVjZSBhIGNvbnRpbnVvdXMgZ2VzdHVyZVxuICovXG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzSW50ZXJuYWxTdGF0ZSB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnXG5cbmNvbnN0IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCA9IDQwMFxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKCk6IFdoZWVsR2VzdHVyZXNJbnRlcm5hbFN0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICBpc1N0YXJ0ZWQ6IGZhbHNlLFxuICAgIGlzU3RhcnRQdWJsaXNoZWQ6IGZhbHNlLFxuICAgIGlzTW9tZW50dW06IGZhbHNlLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBsYXN0QWJzRGVsdGE6IEluZmluaXR5LFxuICAgIGF4aXNNb3ZlbWVudDogWzAsIDAsIDBdLFxuICAgIGF4aXNWZWxvY2l0eTogWzAsIDAsIDBdLFxuICAgIGFjY2VsZXJhdGlvbkZhY3RvcnM6IFtdLFxuICAgIHNjcm9sbFBvaW50czogW10sXG4gICAgc2Nyb2xsUG9pbnRzVG9NZXJnZTogW10sXG4gICAgd2lsbEVuZFRpbWVvdXQ6IFdJTExfRU5EX1RJTUVPVVRfREVGQVVMVCxcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9FdmVudEJ1cydcbmltcG9ydCB7IFdoZWVsVGFyZ2V0T2JzZXJ2ZXIgfSBmcm9tICcuLi9ldmVudHMvV2hlZWxUYXJnZXRPYnNlcnZlcidcbmltcG9ydCB7XG4gIFZlY3RvclhZWixcbiAgV2hlZWxFdmVudERhdGEsXG4gIFdoZWVsRXZlbnRTdGF0ZSxcbiAgV2hlZWxHZXN0dXJlc0NvbmZpZyxcbiAgV2hlZWxHZXN0dXJlc0V2ZW50TWFwLFxuICBXaGVlbEdlc3R1cmVzT3B0aW9ucyxcbn0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgeyBhYnNNYXgsIGFkZFZlY3RvcnMsIGF2ZXJhZ2UsIGRlZXBGcmVlemUsIGxhc3RPZiwgcHJvamVjdGlvbiB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgY2xhbXBBeGlzRGVsdGEsIG5vcm1hbGl6ZVdoZWVsLCByZXZlcnNlQXhpc0RlbHRhU2lnbiB9IGZyb20gJy4uL3doZWVsLW5vcm1hbGl6ZXIvd2hlZWwtbm9ybWFsaXplcidcbmltcG9ydCB7IF9fREVWX18sIEFDQ19GQUNUT1JfTUFYLCBBQ0NfRkFDVE9SX01JTiwgV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSwgV0hFRUxFVkVOVFNfVE9fTUVSR0UgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0IHsgY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIFdoZWVsR2VzdHVyZXMob3B0aW9uc1BhcmFtOiBXaGVlbEdlc3R1cmVzT3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHsgb24sIG9mZiwgZGlzcGF0Y2ggfSA9IEV2ZW50QnVzPFdoZWVsR2VzdHVyZXNFdmVudE1hcD4oKVxuICBsZXQgY29uZmlnID0gY29uZmlnRGVmYXVsdHNcbiAgbGV0IHN0YXRlID0gY3JlYXRlV2hlZWxHZXN0dXJlc1N0YXRlKClcbiAgbGV0IGN1cnJlbnRFdmVudDogV2hlZWxFdmVudERhdGFcbiAgbGV0IG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcbiAgbGV0IHByZXZXaGVlbEV2ZW50U3RhdGU6IFdoZWVsRXZlbnRTdGF0ZSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IGZlZWRXaGVlbCA9ICh3aGVlbEV2ZW50czogV2hlZWxFdmVudERhdGEgfCBXaGVlbEV2ZW50RGF0YVtdKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkod2hlZWxFdmVudHMpKSB7XG4gICAgICB3aGVlbEV2ZW50cy5mb3JFYWNoKCh3aGVlbEV2ZW50KSA9PiBwcm9jZXNzV2hlZWxFdmVudERhdGEod2hlZWxFdmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2Nlc3NXaGVlbEV2ZW50RGF0YSh3aGVlbEV2ZW50cylcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVPcHRpb25zID0gKG5ld09wdGlvbnM6IFdoZWVsR2VzdHVyZXNPcHRpb25zID0ge30pOiBXaGVlbEdlc3R1cmVzQ29uZmlnID0+IHtcbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhuZXdPcHRpb25zKS5zb21lKChvcHRpb24pID0+IG9wdGlvbiA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbiA9PT0gbnVsbCkpIHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS5lcnJvcigndXBkYXRlT3B0aW9ucyBpZ25vcmVkISB1bmRlZmluZWQgJiBudWxsIG9wdGlvbnMgbm90IGFsbG93ZWQnKVxuICAgICAgcmV0dXJuIGNvbmZpZ1xuICAgIH1cbiAgICByZXR1cm4gKGNvbmZpZyA9IGRlZXBGcmVlemUoeyAuLi5jb25maWdEZWZhdWx0cywgLi4uY29uZmlnLCAuLi5uZXdPcHRpb25zIH0pKVxuICB9XG5cbiAgY29uc3QgcHVibGlzaFdoZWVsID0gKGFkZGl0aW9uYWxEYXRhPzogUGFydGlhbDxXaGVlbEV2ZW50U3RhdGU+KSA9PiB7XG4gICAgY29uc3Qgd2hlZWxFdmVudFN0YXRlOiBXaGVlbEV2ZW50U3RhdGUgPSB7XG4gICAgICBldmVudDogY3VycmVudEV2ZW50LFxuICAgICAgaXNTdGFydDogZmFsc2UsXG4gICAgICBpc0VuZGluZzogZmFsc2UsXG4gICAgICBpc01vbWVudHVtQ2FuY2VsOiBmYWxzZSxcbiAgICAgIGlzTW9tZW50dW06IHN0YXRlLmlzTW9tZW50dW0sXG4gICAgICBheGlzRGVsdGE6IFswLCAwLCAwXSxcbiAgICAgIGF4aXNWZWxvY2l0eTogc3RhdGUuYXhpc1ZlbG9jaXR5LFxuICAgICAgYXhpc01vdmVtZW50OiBzdGF0ZS5heGlzTW92ZW1lbnQsXG4gICAgICBnZXQgYXhpc01vdmVtZW50UHJvamVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZFZlY3RvcnMoXG4gICAgICAgICAgd2hlZWxFdmVudFN0YXRlLmF4aXNNb3ZlbWVudCxcbiAgICAgICAgICB3aGVlbEV2ZW50U3RhdGUuYXhpc1ZlbG9jaXR5Lm1hcCgodmVsb2NpdHkpID0+IHByb2plY3Rpb24odmVsb2NpdHkpKSBhcyBWZWN0b3JYWVpcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIC4uLmFkZGl0aW9uYWxEYXRhLFxuICAgIH1cblxuICAgIGRpc3BhdGNoKCd3aGVlbCcsIHtcbiAgICAgIC4uLndoZWVsRXZlbnRTdGF0ZSxcbiAgICAgIHByZXZpb3VzOiBwcmV2V2hlZWxFdmVudFN0YXRlLFxuICAgIH0pXG5cbiAgICAvLyBrZWVwIHJlZmVyZW5jZSB3aXRob3V0IHByZXZpb3VzLCBvdGhlcndpc2Ugd2Ugd291bGQgY3JlYXRlIGEgbG9uZyBjaGFpblxuICAgIHByZXZXaGVlbEV2ZW50U3RhdGUgPSB3aGVlbEV2ZW50U3RhdGVcbiAgfVxuXG4gIC8vIHNob3VsZCBwcmV2ZW50IHdoZW4gdGhlcmUgaXMgbWFpbmx5IG1vdmVtZW50IG9uIHRoZSBkZXNpcmVkIGF4aXNcbiAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSAoZGVsdGFNYXhBYnM6IG51bWJlciwgYXhpc0RlbHRhOiBWZWN0b3JYWVopOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IHByZXZlbnRXaGVlbEFjdGlvbiB9ID0gY29uZmlnXG4gICAgY29uc3QgW2RlbHRhWCwgZGVsdGFZLCBkZWx0YVpdID0gYXhpc0RlbHRhXG5cbiAgICBpZiAodHlwZW9mIHByZXZlbnRXaGVlbEFjdGlvbiA9PT0gJ2Jvb2xlYW4nKSByZXR1cm4gcHJldmVudFdoZWVsQWN0aW9uXG5cbiAgICBzd2l0Y2ggKHByZXZlbnRXaGVlbEFjdGlvbikge1xuICAgICAgY2FzZSAneCc6XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhkZWx0YVgpID49IGRlbHRhTWF4QWJzXG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRlbHRhWSkgPj0gZGVsdGFNYXhBYnNcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZGVsdGFaKSA+PSBkZWx0YU1heEFic1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIHByZXZlbnRXaGVlbEFjdGlvbiB2YWx1ZTogJyArIHByZXZlbnRXaGVlbEFjdGlvbiwgJ3dhcm4nKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9jZXNzV2hlZWxFdmVudERhdGEgPSAod2hlZWxFdmVudDogV2hlZWxFdmVudERhdGEpID0+IHtcbiAgICBjb25zdCB7IGF4aXNEZWx0YSwgdGltZVN0YW1wIH0gPSBjbGFtcEF4aXNEZWx0YShcbiAgICAgIHJldmVyc2VBeGlzRGVsdGFTaWduKG5vcm1hbGl6ZVdoZWVsKHdoZWVsRXZlbnQpLCBjb25maWcucmV2ZXJzZVNpZ24pXG4gICAgKVxuICAgIGNvbnN0IGRlbHRhTWF4QWJzID0gYWJzTWF4KGF4aXNEZWx0YSlcblxuICAgIGlmICh3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0ICYmIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhTWF4QWJzLCBheGlzRGVsdGEpKSB7XG4gICAgICB3aGVlbEV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlLmlzU3RhcnRlZCkge1xuICAgICAgc3RhcnQoKVxuICAgIH1cbiAgICAvLyBjaGVjayBpZiB1c2VyIHN0YXJ0ZWQgc2Nyb2xsaW5nIGFnYWluIC0+IGNhbmNlbFxuICAgIGVsc2UgaWYgKHN0YXRlLmlzTW9tZW50dW0gJiYgZGVsdGFNYXhBYnMgPiBNYXRoLm1heCgyLCBzdGF0ZS5sYXN0QWJzRGVsdGEgKiAyKSkge1xuICAgICAgZW5kKHRydWUpXG4gICAgICBzdGFydCgpXG4gICAgfVxuXG4gICAgLy8gc3BlY2lhbCBmaW5nZXIgdXAgZXZlbnQgb24gd2luZG93cyArIGJsaW5rXG4gICAgaWYgKGRlbHRhTWF4QWJzID09PSAwICYmIE9iamVjdC5pcyAmJiBPYmplY3QuaXMod2hlZWxFdmVudC5kZWx0YVgsIC0wKSkge1xuICAgICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSB0cnVlXG4gICAgICAvLyByZXR1cm4gLT4gemVybyBkZWx0YSBldmVudCBzaG91bGQgbm90IGluZmx1ZW5jZSB2ZWxvY2l0eVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEV2ZW50ID0gd2hlZWxFdmVudFxuICAgIHN0YXRlLmF4aXNNb3ZlbWVudCA9IGFkZFZlY3RvcnMoc3RhdGUuYXhpc01vdmVtZW50LCBheGlzRGVsdGEpXG4gICAgc3RhdGUubGFzdEFic0RlbHRhID0gZGVsdGFNYXhBYnNcbiAgICBzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlLnB1c2goe1xuICAgICAgYXhpc0RlbHRhLFxuICAgICAgdGltZVN0YW1wLFxuICAgIH0pXG5cbiAgICBtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSgpXG5cbiAgICAvLyBvbmx5IHdoZWVsIGV2ZW50IChtb3ZlKSBhbmQgbm90IHN0YXJ0L2VuZCBnZXQgdGhlIGRlbHRhIHZhbHVlc1xuICAgIHB1Ymxpc2hXaGVlbCh7IGF4aXNEZWx0YSwgaXNTdGFydDogIXN0YXRlLmlzU3RhcnRQdWJsaXNoZWQgfSkgLy8gc3RhdGUuaXNNb21lbnR1bSA/IE1PTUVOVFVNX1dIRUVMIDogV0hFRUwsIHsgYXhpc0RlbHRhIH0pXG5cbiAgICAvLyBwdWJsaXNoIHN0YXJ0IGFmdGVyIHZlbG9jaXR5IGV0Yy4gaGF2ZSBiZWVuIHVwZGF0ZWRcbiAgICBzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkID0gdHJ1ZVxuXG4gICAgLy8gY2FsYyBkZWJvdW5jZWQgZW5kIGZ1bmN0aW9uLCB0byByZWNvZ25pemUgZW5kIG9mIHdoZWVsIGV2ZW50IHN0cmVhbVxuICAgIHdpbGxFbmQoKVxuICB9XG5cbiAgY29uc3QgbWVyZ2VTY3JvbGxQb2ludHNDYWxjVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgaWYgKHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID09PSBXSEVFTEVWRU5UU19UT19NRVJHRSkge1xuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLnVuc2hpZnQoe1xuICAgICAgICBheGlzRGVsdGFTdW06IHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubWFwKChiKSA9PiBiLmF4aXNEZWx0YSkucmVkdWNlKGFkZFZlY3RvcnMpLFxuICAgICAgICB0aW1lU3RhbXA6IGF2ZXJhZ2Uoc3RhdGUuc2Nyb2xsUG9pbnRzVG9NZXJnZS5tYXAoKGIpID0+IGIudGltZVN0YW1wKSksXG4gICAgICB9KVxuXG4gICAgICAvLyBvbmx5IHVwZGF0ZSB2ZWxvY2l0eSBhZnRlciBhIG1lcmdlZCBzY3JvbGxwb2ludCB3YXMgZ2VuZXJhdGVkXG4gICAgICB1cGRhdGVWZWxvY2l0eSgpXG5cbiAgICAgIC8vIHJlc2V0IHRvTWVyZ2UgYXJyYXlcbiAgICAgIHN0YXRlLnNjcm9sbFBvaW50c1RvTWVyZ2UubGVuZ3RoID0gMFxuXG4gICAgICAvLyBhZnRlciBjYWxjdWxhdGlvbiBvZiB2ZWxvY2l0eSBvbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IG1lcmdlZCBzY3JvbGxQb2ludFxuICAgICAgc3RhdGUuc2Nyb2xsUG9pbnRzLmxlbmd0aCA9IDFcblxuICAgICAgaWYgKCFzdGF0ZS5pc01vbWVudHVtKSB7XG4gICAgICAgIGRldGVjdE1vbWVudHVtKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFzdGF0ZS5pc1N0YXJ0UHVibGlzaGVkKSB7XG4gICAgICB1cGRhdGVTdGFydFZlbG9jaXR5KClcbiAgICB9XG4gIH1cblxuICBjb25zdCB1cGRhdGVTdGFydFZlbG9jaXR5ID0gKCkgPT4ge1xuICAgIHN0YXRlLmF4aXNWZWxvY2l0eSA9IGxhc3RPZihzdGF0ZS5zY3JvbGxQb2ludHNUb01lcmdlKS5heGlzRGVsdGEubWFwKChkKSA9PiBkIC8gc3RhdGUud2lsbEVuZFRpbWVvdXQpIGFzIFZlY3RvclhZWlxuICB9XG5cbiAgY29uc3QgdXBkYXRlVmVsb2NpdHkgPSAoKSA9PiB7XG4gICAgLy8gbmVlZCB0byBoYXZlIHR3byByZWNlbnQgcG9pbnRzIHRvIGNhbGMgdmVsb2NpdHlcbiAgICBjb25zdCBbbGF0ZXN0U2Nyb2xsUG9pbnQsIHByZXZTY3JvbGxQb2ludF0gPSBzdGF0ZS5zY3JvbGxQb2ludHNcblxuICAgIGlmICghcHJldlNjcm9sbFBvaW50IHx8ICFsYXRlc3RTY3JvbGxQb2ludCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdGltZSBkZWx0YVxuICAgIGNvbnN0IGRlbHRhVGltZSA9IGxhdGVzdFNjcm9sbFBvaW50LnRpbWVTdGFtcCAtIHByZXZTY3JvbGxQb2ludC50aW1lU3RhbXBcblxuICAgIGlmIChkZWx0YVRpbWUgPD0gMCkge1xuICAgICAgX19ERVZfXyAmJiBjb25zb2xlLndhcm4oJ2ludmFsaWQgZGVsdGFUaW1lJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNhbGMgdGhlIHZlbG9jaXR5IHBlciBheGVzXG4gICAgY29uc3QgdmVsb2NpdHkgPSBsYXRlc3RTY3JvbGxQb2ludC5heGlzRGVsdGFTdW0ubWFwKChkKSA9PiBkIC8gZGVsdGFUaW1lKSBhcyBWZWN0b3JYWVpcblxuICAgIC8vIGNhbGMgdGhlIGFjY2VsZXJhdGlvbiBmYWN0b3IgcGVyIGF4aXNcbiAgICBjb25zdCBhY2NlbGVyYXRpb25GYWN0b3IgPSB2ZWxvY2l0eS5tYXAoKHYsIGkpID0+IHYgLyAoc3RhdGUuYXhpc1ZlbG9jaXR5W2ldIHx8IDEpKVxuXG4gICAgc3RhdGUuYXhpc1ZlbG9jaXR5ID0gdmVsb2NpdHlcbiAgICBzdGF0ZS5hY2NlbGVyYXRpb25GYWN0b3JzLnB1c2goYWNjZWxlcmF0aW9uRmFjdG9yKVxuXG4gICAgdXBkYXRlV2lsbEVuZFRpbWVvdXQoZGVsdGFUaW1lKVxuICB9XG5cbiAgY29uc3QgdXBkYXRlV2lsbEVuZFRpbWVvdXQgPSAoZGVsdGFUaW1lOiBudW1iZXIpID0+IHtcbiAgICAvLyB1c2UgY3VycmVudCB0aW1lIGJldHdlZW4gZXZlbnRzIHJvdW5kZWQgdXAgYW5kIGluY3JlYXNlZCBieSBhIGJpdCBhcyB0aW1lb3V0XG4gICAgbGV0IG5ld1RpbWVvdXQgPSBNYXRoLmNlaWwoZGVsdGFUaW1lIC8gMTApICogMTAgKiAxLjJcblxuICAgIC8vIGRvdWJsZSB0aGUgdGltZW91dCwgd2hlbiBtb21lbnR1bSB3YXMgbm90IGRldGVjdGVkIHlldFxuICAgIGlmICghc3RhdGUuaXNNb21lbnR1bSkge1xuICAgICAgbmV3VGltZW91dCA9IE1hdGgubWF4KDEwMCwgbmV3VGltZW91dCAqIDIpXG4gICAgfVxuXG4gICAgc3RhdGUud2lsbEVuZFRpbWVvdXQgPSBNYXRoLm1pbigxMDAwLCBNYXRoLnJvdW5kKG5ld1RpbWVvdXQpKVxuICB9XG5cbiAgY29uc3QgYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlID0gKGFjY0ZhY3RvcjogbnVtYmVyKSA9PiB7XG4gICAgLy8gd2hlbiBtYWluIGF4aXMgaXMgdGhlIHRoZSBvdGhlciBvbmUgYW5kIHRoZXJlIGlzIG5vIG1vdmVtZW50L2NoYW5nZSBvbiB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAoYWNjRmFjdG9yID09PSAwKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBhY2NGYWN0b3IgPD0gQUNDX0ZBQ1RPUl9NQVggJiYgYWNjRmFjdG9yID49IEFDQ19GQUNUT1JfTUlOXG4gIH1cblxuICBjb25zdCBkZXRlY3RNb21lbnR1bSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5sZW5ndGggPj0gV0hFRUxFVkVOVFNfVE9fQU5BTEFaRSkge1xuICAgICAgaWYgKG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50KSB7XG4gICAgICAgIG5lZ2F0aXZlWmVyb0ZpbmdlclVwU3BlY2lhbEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBpZiAoYWJzTWF4KHN0YXRlLmF4aXNWZWxvY2l0eSkgPj0gMC4yKSB7XG4gICAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzID0gc3RhdGUuYWNjZWxlcmF0aW9uRmFjdG9ycy5zbGljZShXSEVFTEVWRU5UU19UT19BTkFMQVpFICogLTEpXG5cbiAgICAgIC8vIGNoZWNrIHJlY2VudCBhY2NlbGVyYXRpb24gLyBkZWNlbGVyYXRpb24gZmFjdG9yc1xuICAgICAgLy8gYWxsIHJlY2VudCBuZWVkIHRvIG1hdGNoLCBpZiBhbnkgZGlkIG5vdCBtYXRjaFxuICAgICAgY29uc3QgZGV0ZWN0ZWRNb21lbnR1bSA9IHJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMuZXZlcnkoKGFjY0ZhYykgPT4ge1xuICAgICAgICAvLyB3aGVuIGJvdGggYXhpcyBkZWNlbGVyYXRlIGV4YWN0bHkgaW4gdGhlIHNhbWUgcmF0ZSBpdCBpcyB2ZXJ5IGxpa2VseSBjYXVzZWQgYnkgbW9tZW50dW1cbiAgICAgICAgY29uc3Qgc2FtZUFjY0ZhYyA9ICEhYWNjRmFjLnJlZHVjZSgoZjEsIGYyKSA9PiAoZjEgJiYgZjEgPCAxICYmIGYxID09PSBmMiA/IDEgOiAwKSlcblxuICAgICAgICAvLyBjaGVjayBpZiBhY2NlbGVyYXRpb24gZmFjdG9yIGlzIHdpdGhpbiBtb21lbnR1bSByYW5nZVxuICAgICAgICBjb25zdCBib3RoQXJlSW5SYW5nZU9yWmVybyA9IGFjY0ZhYy5maWx0ZXIoYWNjZWxlcmF0aW9uRmFjdG9ySW5Nb21lbnR1bVJhbmdlKS5sZW5ndGggPT09IGFjY0ZhYy5sZW5ndGhcblxuICAgICAgICAvLyBvbmUgdGhlIHJlcXVpcmVtZW50cyBtdXN0IGJlIGZ1bGZpbGxlZFxuICAgICAgICByZXR1cm4gc2FtZUFjY0ZhYyB8fCBib3RoQXJlSW5SYW5nZU9yWmVyb1xuICAgICAgfSlcblxuICAgICAgaWYgKGRldGVjdGVkTW9tZW50dW0pIHtcbiAgICAgICAgcmVjb2duaXplZE1vbWVudHVtKClcbiAgICAgIH1cblxuICAgICAgLy8gb25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBldmVudHNcbiAgICAgIHN0YXRlLmFjY2VsZXJhdGlvbkZhY3RvcnMgPSByZWNlbnRBY2NlbGVyYXRpb25GYWN0b3JzXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjb2duaXplZE1vbWVudHVtID0gKCkgPT4ge1xuICAgIHN0YXRlLmlzTW9tZW50dW0gPSB0cnVlXG4gIH1cblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBzdGF0ZSA9IGNyZWF0ZVdoZWVsR2VzdHVyZXNTdGF0ZSgpXG4gICAgc3RhdGUuaXNTdGFydGVkID0gdHJ1ZVxuICAgIHN0YXRlLnN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICBwcmV2V2hlZWxFdmVudFN0YXRlID0gdW5kZWZpbmVkXG4gICAgbmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQgPSBmYWxzZVxuICB9XG5cbiAgY29uc3Qgd2lsbEVuZCA9ICgoKSA9PiB7XG4gICAgbGV0IHdpbGxFbmRJZDogbnVtYmVyXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh3aWxsRW5kSWQpXG4gICAgICB3aWxsRW5kSWQgPSBzZXRUaW1lb3V0KGVuZCwgc3RhdGUud2lsbEVuZFRpbWVvdXQpXG4gICAgfVxuICB9KSgpXG5cbiAgY29uc3QgZW5kID0gKGlzTW9tZW50dW1DYW5jZWwgPSBmYWxzZSkgPT4ge1xuICAgIGlmICghc3RhdGUuaXNTdGFydGVkKSByZXR1cm5cblxuICAgIGlmIChzdGF0ZS5pc01vbWVudHVtICYmIGlzTW9tZW50dW1DYW5jZWwpIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlLCBpc01vbWVudHVtQ2FuY2VsOiB0cnVlIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHB1Ymxpc2hXaGVlbCh7IGlzRW5kaW5nOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgc3RhdGUuaXNNb21lbnR1bSA9IGZhbHNlXG4gICAgc3RhdGUuaXNTdGFydGVkID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHsgb2JzZXJ2ZSwgdW5vYnNlcnZlLCBkaXNjb25uZWN0IH0gPSBXaGVlbFRhcmdldE9ic2VydmVyKGZlZWRXaGVlbClcblxuICB1cGRhdGVPcHRpb25zKG9wdGlvbnNQYXJhbSlcblxuICByZXR1cm4gZGVlcEZyZWV6ZSh7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIG9ic2VydmUsXG4gICAgdW5vYnNlcnZlLFxuICAgIGRpc2Nvbm5lY3QsXG4gICAgZmVlZFdoZWVsLFxuICAgIHVwZGF0ZU9wdGlvbnMsXG4gIH0pXG59XG4iLCJleHBvcnQgY29uc3QgYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icykgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzbGlkZXNUaHVtYnMubWFwKFxuICAgICAgICAoXywgaW5kZXgpID0+IChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGVtYmxhQXBpTWFpbi5zY3JvbGxUbyhpbmRleCk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzbGlkZU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxUb0luZGV4W2luZGV4XSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSA9IChlbWJsYUFwaU1haW4sIHNsaWRlc1RodW1icywgZW1ibGFBcGlUaHVtYiA9IG51bGwpID0+IHtcbiAgICBjb25zdCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKCk7XG5cbiAgICAgICAgZW1ibGFBcGlUaHVtYj8uc2Nyb2xsVG8oc2VsZWN0ZWQpO1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkO1xuICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnRvZ2dsZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnLCBpc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC50b2dnbGUoJ3VrLWFjdGl2ZScsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCBpc1NlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBlbWJsYUFwaU1haW5cbiAgICAgICAgLm9uKCdzZWxlY3QnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdyZUluaXQnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSk7XG4gICAgdG9nZ2xlVGh1bWJCdG5zU3RhdGUoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGVtYmxhQXBpTWFpbi5vZmYoJ3NlbGVjdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKTtcbiAgICAgICAgZW1ibGFBcGlNYWluLm9mZigncmVJbml0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpO1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGUpID0+IHtcbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCd1ay1hY3RpdmUnKTtcbiAgICAgICAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50Jyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaSwgcHJldkJ0biwgbmV4dEJ0bikgPT4ge1xuICAgIGNvbnN0IHNjcm9sbFByZXYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZW1ibGFBcGkuc2Nyb2xsUHJldigpO1xuICAgIH07XG4gICAgY29uc3Qgc2Nyb2xsTmV4dCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbWJsYUFwaS5zY3JvbGxOZXh0KCk7XG4gICAgfTtcbiAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUHJldiwgZmFsc2UpO1xuICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxOZXh0LCBmYWxzZSk7XG5cbiAgICBjb25zdCByZW1vdmVUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUgPSBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoXG4gICAgICAgIGVtYmxhQXBpLFxuICAgICAgICBwcmV2QnRuLFxuICAgICAgICBuZXh0QnRuXG4gICAgKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSgpO1xuICAgICAgICBwcmV2QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsUHJldiwgZmFsc2UpO1xuICAgICAgICBuZXh0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsTmV4dCwgZmFsc2UpO1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBhZGRUb2dnbGVQcmV2TmV4dEJ1dHRvbnNBY3RpdmUoZW1ibGFBcGksIHByZXZCdG4sIG5leHRCdG4pIHtcbiAgICBjb25zdCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGVtYmxhQXBpLmNhblNjcm9sbFByZXYoKSkge1xuICAgICAgICAgICAgcHJldkJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbWJsYUFwaS5jYW5TY3JvbGxOZXh0KCkpIHtcbiAgICAgICAgICAgIG5leHRCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1ibGFBcGlcbiAgICAgICAgLm9uKCdzZWxlY3QnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSlcbiAgICAgICAgLm9uKCdpbml0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpXG4gICAgICAgIC5vbigncmVJbml0JywgdG9nZ2xlUHJldk5leHRCdG5zU3RhdGUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZW1ibGFBcGkub2ZmKCdzZWxlY3QnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG4gICAgICAgIGVtYmxhQXBpLm9mZignaW5pdCcsIHRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlKTtcbiAgICAgICAgZW1ibGFBcGkub2ZmKCdyZUluaXQnLCB0b2dnbGVQcmV2TmV4dEJ0bnNTdGF0ZSk7XG4gICAgICAgIHByZXZCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICBuZXh0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9O1xufVxuIiwiY29uc3QgUlVOVElNRV9LRVkgPSAnX19ZVER5bmFtaWNzRG9tUnVudGltZSc7XG5cbmNvbnN0IHJ1bnRpbWUgPSB3aW5kb3dbUlVOVElNRV9LRVldIHx8IHtcbiAgICBhZGRlZDogbmV3IFNldCgpLFxuICAgIHJlbW92ZWQ6IG5ldyBTZXQoKSxcbiAgICBvYnNlcnZlcjogbnVsbCxcbn07XG5cbndpbmRvd1tSVU5USU1FX0tFWV0gPSBydW50aW1lO1xuXG5jb25zdCB2aXNpdCA9IChjYWxsYmFja3MsIG5vZGUpID0+IGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobm9kZSkpO1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBpZiAocnVudGltZS5vYnNlcnZlciB8fCAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm47XG5cbiAgICBydW50aW1lLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHJlY29yZHMpID0+IHtcbiAgICAgICAgcmVjb3Jkcy5mb3JFYWNoKCh7YWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzfSkgPT4ge1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB2aXNpdChydW50aW1lLmFkZGVkLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHZpc2l0KHJ1bnRpbWUucmVtb3ZlZCwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcnVudGltZS5vYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG9ic2VydmVEeW5hbWljQ29udGVudCA9IChvbkFkZGVkLCBvblJlbW92ZWQgPSBudWxsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkFkZGVkID09PSAnZnVuY3Rpb24nKSBydW50aW1lLmFkZGVkLmFkZChvbkFkZGVkKTtcbiAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmFkZChvblJlbW92ZWQpO1xuICAgIHN0YXJ0KCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIG9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHJ1bnRpbWUuYWRkZWQuZGVsZXRlKG9uQWRkZWQpO1xuICAgICAgICBpZiAodHlwZW9mIG9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykgcnVudGltZS5yZW1vdmVkLmRlbGV0ZShvblJlbW92ZWQpO1xuICAgIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IHsgQ3JlYXRlT3B0aW9uc1R5cGUsIEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5cbmV4cG9ydCB0eXBlIERlbGF5T3B0aW9uVHlwZSA9XG4gIHwgbnVtYmVyXG4gIHwgKChzY3JvbGxTbmFwczogbnVtYmVyW10sIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gbnVtYmVyW10pXG5cbmV4cG9ydCB0eXBlIFJvb3ROb2RlVHlwZSA9XG4gIHwgbnVsbFxuICB8ICgoZW1ibGFSb290OiBIVE1MRWxlbWVudCkgPT4gSFRNTEVsZW1lbnQgfCBudWxsKVxuXG5leHBvcnQgdHlwZSBPcHRpb25zVHlwZSA9IENyZWF0ZU9wdGlvbnNUeXBlPHtcbiAgZGVsYXk6IERlbGF5T3B0aW9uVHlwZVxuICBqdW1wOiBib29sZWFuXG4gIHBsYXlPbkluaXQ6IGJvb2xlYW5cbiAgc3RvcE9uRm9jdXNJbjogYm9vbGVhblxuICBzdG9wT25JbnRlcmFjdGlvbjogYm9vbGVhblxuICBzdG9wT25Nb3VzZUVudGVyOiBib29sZWFuXG4gIHN0b3BPbkxhc3RTbmFwOiBib29sZWFuXG4gIHJvb3ROb2RlOiBSb290Tm9kZVR5cGVcbn0+XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogT3B0aW9uc1R5cGUgPSB7XG4gIGFjdGl2ZTogdHJ1ZSxcbiAgYnJlYWtwb2ludHM6IHt9LFxuICBkZWxheTogNDAwMCxcbiAganVtcDogZmFsc2UsXG4gIHBsYXlPbkluaXQ6IHRydWUsXG4gIHN0b3BPbkZvY3VzSW46IHRydWUsXG4gIHN0b3BPbkludGVyYWN0aW9uOiB0cnVlLFxuICBzdG9wT25Nb3VzZUVudGVyOiBmYWxzZSxcbiAgc3RvcE9uTGFzdFNuYXA6IGZhbHNlLFxuICByb290Tm9kZTogbnVsbFxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICdlbWJsYS1jYXJvdXNlbC9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBEZWxheU9wdGlvblR5cGUsIFJvb3ROb2RlVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZURlbGF5KFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGRlbGF5OiBEZWxheU9wdGlvblR5cGVcbik6IG51bWJlcltdIHtcbiAgY29uc3Qgc2Nyb2xsU25hcHMgPSBlbWJsYUFwaS5zY3JvbGxTbmFwTGlzdCgpXG5cbiAgaWYgKHR5cGVvZiBkZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gc2Nyb2xsU25hcHMubWFwKCgpID0+IGRlbGF5KVxuICB9XG4gIHJldHVybiBkZWxheShzY3JvbGxTbmFwcywgZW1ibGFBcGkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRvcGxheVJvb3ROb2RlKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIHJvb3ROb2RlOiBSb290Tm9kZVR5cGVcbik6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgZW1ibGFSb290Tm9kZSA9IGVtYmxhQXBpLnJvb3ROb2RlKClcbiAgcmV0dXJuIChyb290Tm9kZSAmJiByb290Tm9kZShlbWJsYVJvb3ROb2RlKSkgfHwgZW1ibGFSb290Tm9kZVxufVxuIiwiaW1wb3J0IHsgT3B0aW9uc1R5cGUsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgZ2V0QXV0b3BsYXlSb290Tm9kZSwgbm9ybWFsaXplRGVsYXkgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHtcbiAgQ3JlYXRlUGx1Z2luVHlwZSxcbiAgT3B0aW9uc0hhbmRsZXJUeXBlLFxuICBFbWJsYUNhcm91c2VsVHlwZVxufSBmcm9tICdlbWJsYS1jYXJvdXNlbCdcblxuZGVjbGFyZSBtb2R1bGUgJ2VtYmxhLWNhcm91c2VsJyB7XG4gIGludGVyZmFjZSBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBhdXRvcGxheTogQXV0b3BsYXlUeXBlXG4gIH1cblxuICBpbnRlcmZhY2UgRW1ibGFFdmVudExpc3RUeXBlIHtcbiAgICBhdXRvcGxheVBsYXk6ICdhdXRvcGxheTpwbGF5J1xuICAgIGF1dG9wbGF5U3RvcDogJ2F1dG9wbGF5OnN0b3AnXG4gICAgYXV0b3BsYXlTZWxlY3Q6ICdhdXRvcGxheTpzZWxlY3QnXG4gICAgYXV0b3BsYXlUaW1lclNldDogJ2F1dG9wbGF5OnRpbWVyc2V0J1xuICAgIGF1dG9wbGF5VGltZXJTdG9wcGVkOiAnYXV0b3BsYXk6dGltZXJzdG9wcGVkJ1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIEF1dG9wbGF5VHlwZSA9IENyZWF0ZVBsdWdpblR5cGU8XG4gIHtcbiAgICBwbGF5OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgICBzdG9wOiAoKSA9PiB2b2lkXG4gICAgcmVzZXQ6ICgpID0+IHZvaWRcbiAgICBpc1BsYXlpbmc6ICgpID0+IGJvb2xlYW5cbiAgICB0aW1lVW50aWxOZXh0OiAoKSA9PiBudW1iZXIgfCBudWxsXG4gIH0sXG4gIE9wdGlvbnNUeXBlXG4+XG5cbmV4cG9ydCB0eXBlIEF1dG9wbGF5T3B0aW9uc1R5cGUgPSBBdXRvcGxheVR5cGVbJ29wdGlvbnMnXVxuXG5mdW5jdGlvbiBBdXRvcGxheSh1c2VyT3B0aW9uczogQXV0b3BsYXlPcHRpb25zVHlwZSA9IHt9KTogQXV0b3BsYXlUeXBlIHtcbiAgbGV0IG9wdGlvbnM6IE9wdGlvbnNUeXBlXG4gIGxldCBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGVcbiAgbGV0IGRlc3Ryb3llZDogYm9vbGVhblxuICBsZXQgZGVsYXk6IFJldHVyblR5cGU8RW1ibGFDYXJvdXNlbFR5cGVbJ3Njcm9sbFNuYXBMaXN0J10+XG4gIGxldCB0aW1lclN0YXJ0VGltZTogbnVsbCB8IG51bWJlciA9IG51bGxcbiAgbGV0IHRpbWVySWQgPSAwXG4gIGxldCBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIGxldCBtb3VzZUlzT3ZlciA9IGZhbHNlXG4gIGxldCBwbGF5T25Eb2N1bWVudFZpc2libGUgPSBmYWxzZVxuICBsZXQganVtcCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChcbiAgICBlbWJsYUFwaUluc3RhbmNlOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4gICk6IHZvaWQge1xuICAgIGVtYmxhQXBpID0gZW1ibGFBcGlJbnN0YW5jZVxuXG4gICAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhIH0gPSBvcHRpb25zSGFuZGxlclxuICAgIGNvbnN0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBBdXRvcGxheS5nbG9iYWxPcHRpb25zKVxuICAgIGNvbnN0IGFsbE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHVzZXJPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShhbGxPcHRpb25zKVxuXG4gICAgaWYgKGVtYmxhQXBpLnNjcm9sbFNuYXBMaXN0KCkubGVuZ3RoIDw9IDEpIHJldHVyblxuXG4gICAganVtcCA9IG9wdGlvbnMuanVtcFxuICAgIGRlc3Ryb3llZCA9IGZhbHNlXG4gICAgZGVsYXkgPSBub3JtYWxpemVEZWxheShlbWJsYUFwaSwgb3B0aW9ucy5kZWxheSlcblxuICAgIGNvbnN0IHsgZXZlbnRTdG9yZSwgb3duZXJEb2N1bWVudCB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIGNvbnN0IGlzRHJhZ2dhYmxlID0gISFlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpLm9wdGlvbnMud2F0Y2hEcmFnXG4gICAgY29uc3Qgcm9vdCA9IGdldEF1dG9wbGF5Um9vdE5vZGUoZW1ibGFBcGksIG9wdGlvbnMucm9vdE5vZGUpXG5cbiAgICBldmVudFN0b3JlLmFkZChvd25lckRvY3VtZW50LCAndmlzaWJpbGl0eWNoYW5nZScsIHZpc2liaWxpdHlDaGFuZ2UpXG5cbiAgICBpZiAoaXNEcmFnZ2FibGUpIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdwb2ludGVyRG93bicsIHBvaW50ZXJEb3duKVxuICAgIH1cblxuICAgIGlmIChpc0RyYWdnYWJsZSAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZW1ibGFBcGkub24oJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zdG9wT25Nb3VzZUVudGVyKSB7XG4gICAgICBldmVudFN0b3JlLmFkZChyb290LCAnbW91c2VlbnRlcicsIG1vdXNlRW50ZXIpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uTW91c2VFbnRlciAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQocm9vdCwgJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0b3BPbkZvY3VzSW4pIHtcbiAgICAgIGVtYmxhQXBpLm9uKCdzbGlkZUZvY3VzU3RhcnQnLCBzdG9wQXV0b3BsYXkpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uRm9jdXNJbiAmJiAhb3B0aW9ucy5zdG9wT25JbnRlcmFjdGlvbikge1xuICAgICAgZXZlbnRTdG9yZS5hZGQoZW1ibGFBcGkuY29udGFpbmVyTm9kZSgpLCAnZm9jdXNvdXQnLCBzdGFydEF1dG9wbGF5KVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBsYXlPbkluaXQpIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBlbWJsYUFwaVxuICAgICAgLm9mZigncG9pbnRlckRvd24nLCBwb2ludGVyRG93bilcbiAgICAgIC5vZmYoJ3BvaW50ZXJVcCcsIHBvaW50ZXJVcClcbiAgICAgIC5vZmYoJ3NsaWRlRm9jdXNTdGFydCcsIHN0b3BBdXRvcGxheSlcblxuICAgIHN0b3BBdXRvcGxheSgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICAgIGF1dG9wbGF5QWN0aXZlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRpbWVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgb3duZXJXaW5kb3cgfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZClcbiAgICB0aW1lcklkID0gb3duZXJXaW5kb3cuc2V0VGltZW91dChuZXh0LCBkZWxheVtlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKV0pXG4gICAgdGltZXJTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnRpbWVyc2V0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVGltZXIoKTogdm9pZCB7XG4gICAgY29uc3QgeyBvd25lcldpbmRvdyB9ID0gZW1ibGFBcGkuaW50ZXJuYWxFbmdpbmUoKVxuICAgIG93bmVyV2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKVxuICAgIHRpbWVySWQgPSAwXG4gICAgdGltZXJTdGFydFRpbWUgPSBudWxsXG4gICAgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6dGltZXJzdG9wcGVkJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0QXV0b3BsYXkoKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgaWYgKGRvY3VtZW50SXNIaWRkZW4oKSkge1xuICAgICAgcGxheU9uRG9jdW1lbnRWaXNpYmxlID0gdHJ1ZVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghYXV0b3BsYXlBY3RpdmUpIGVtYmxhQXBpLmVtaXQoJ2F1dG9wbGF5OnBsYXknKVxuXG4gICAgc2V0VGltZXIoKVxuICAgIGF1dG9wbGF5QWN0aXZlID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEF1dG9wbGF5KCk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6c3RvcCcpXG5cbiAgICBjbGVhclRpbWVyKClcbiAgICBhdXRvcGxheUFjdGl2ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiB2aXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudElzSGlkZGVuKCkpIHtcbiAgICAgIHBsYXlPbkRvY3VtZW50VmlzaWJsZSA9IGF1dG9wbGF5QWN0aXZlXG4gICAgICByZXR1cm4gc3RvcEF1dG9wbGF5KClcbiAgICB9XG5cbiAgICBpZiAocGxheU9uRG9jdW1lbnRWaXNpYmxlKSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvY3VtZW50SXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBvd25lckRvY3VtZW50IH0gPSBlbWJsYUFwaS5pbnRlcm5hbEVuZ2luZSgpXG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJ1xuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oKTogdm9pZCB7XG4gICAgaWYgKCFtb3VzZUlzT3Zlcikgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJVcCgpOiB2b2lkIHtcbiAgICBpZiAoIW1vdXNlSXNPdmVyKSBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgbW91c2VJc092ZXIgPSB0cnVlXG4gICAgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgbW91c2VJc092ZXIgPSBmYWxzZVxuICAgIHN0YXJ0QXV0b3BsYXkoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGxheShqdW1wT3ZlcnJpZGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBqdW1wT3ZlcnJpZGUgIT09ICd1bmRlZmluZWQnKSBqdW1wID0ganVtcE92ZXJyaWRlXG4gICAgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCk6IHZvaWQge1xuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgc3RvcEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCk6IHZvaWQge1xuICAgIGlmIChhdXRvcGxheUFjdGl2ZSkgc3RhcnRBdXRvcGxheSgpXG4gIH1cblxuICBmdW5jdGlvbiBpc1BsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGF1dG9wbGF5QWN0aXZlXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IGVtYmxhQXBpLmludGVybmFsRW5naW5lKClcbiAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleC5jbG9uZSgpLmFkZCgxKS5nZXQoKVxuICAgIGNvbnN0IGxhc3RJbmRleCA9IGVtYmxhQXBpLnNjcm9sbFNuYXBMaXN0KCkubGVuZ3RoIC0gMVxuICAgIGNvbnN0IGtpbGwgPSBvcHRpb25zLnN0b3BPbkxhc3RTbmFwICYmIG5leHRJbmRleCA9PT0gbGFzdEluZGV4XG5cbiAgICBpZiAoZW1ibGFBcGkuY2FuU2Nyb2xsTmV4dCgpKSB7XG4gICAgICBlbWJsYUFwaS5zY3JvbGxOZXh0KGp1bXApXG4gICAgfSBlbHNlIHtcbiAgICAgIGVtYmxhQXBpLnNjcm9sbFRvKDAsIGp1bXApXG4gICAgfVxuXG4gICAgZW1ibGFBcGkuZW1pdCgnYXV0b3BsYXk6c2VsZWN0JylcblxuICAgIGlmIChraWxsKSByZXR1cm4gc3RvcEF1dG9wbGF5KClcbiAgICBzdGFydEF1dG9wbGF5KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVVbnRpbE5leHQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCF0aW1lclN0YXJ0VGltZSkgcmV0dXJuIG51bGxcbiAgICBjb25zdCBjdXJyZW50RGVsYXkgPSBkZWxheVtlbWJsYUFwaS5zZWxlY3RlZFNjcm9sbFNuYXAoKV1cbiAgICBjb25zdCB0aW1lUGFzdFNpbmNlU3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRpbWVyU3RhcnRUaW1lXG4gICAgcmV0dXJuIGN1cnJlbnREZWxheSAtIHRpbWVQYXN0U2luY2VTdGFydFxuICB9XG5cbiAgY29uc3Qgc2VsZjogQXV0b3BsYXlUeXBlID0ge1xuICAgIG5hbWU6ICdhdXRvcGxheScsXG4gICAgb3B0aW9uczogdXNlck9wdGlvbnMsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBsYXksXG4gICAgc3RvcCxcbiAgICByZXNldCxcbiAgICBpc1BsYXlpbmcsXG4gICAgdGltZVVudGlsTmV4dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG5cbmRlY2xhcmUgbmFtZXNwYWNlIEF1dG9wbGF5IHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEF1dG9wbGF5T3B0aW9uc1R5cGUgfCB1bmRlZmluZWRcbn1cblxuQXV0b3BsYXkuZ2xvYmFsT3B0aW9ucyA9IHVuZGVmaW5lZFxuXG5leHBvcnQgZGVmYXVsdCBBdXRvcGxheVxuIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRPcHRpb25UeXBlID1cbiAgfCAnc3RhcnQnXG4gIHwgJ2NlbnRlcidcbiAgfCAnZW5kJ1xuICB8ICgodmlld1NpemU6IG51bWJlciwgc25hcFNpemU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyKVxuXG5leHBvcnQgdHlwZSBBbGlnbm1lbnRUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFsaWdubWVudChcbiAgYWxpZ246IEFsaWdubWVudE9wdGlvblR5cGUsXG4gIHZpZXdTaXplOiBudW1iZXJcbik6IEFsaWdubWVudFR5cGUge1xuICBjb25zdCBwcmVkZWZpbmVkID0geyBzdGFydCwgY2VudGVyLCBlbmQgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmQobikgLyAyXG4gIH1cblxuICBmdW5jdGlvbiBlbmQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmlld1NpemUgLSBuXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlciwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGlzU3RyaW5nKGFsaWduKSkgcmV0dXJuIHByZWRlZmluZWRbYWxpZ25dKG4pXG4gICAgcmV0dXJuIGFsaWduKHZpZXdTaXplLCBuLCBpbmRleClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFsaWdubWVudFR5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJ0eXBlIEV2ZW50TmFtZVR5cGUgPSBrZXlvZiBEb2N1bWVudEV2ZW50TWFwIHwga2V5b2YgV2luZG93RXZlbnRNYXBcbnR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IChldnQ6IGFueSkgPT4gdm9pZFxudHlwZSBFdmVudE9wdGlvbnNUeXBlID0gYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zIHwgdW5kZWZpbmVkXG50eXBlIEV2ZW50UmVtb3ZlclR5cGUgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIEV2ZW50U3RvcmVUeXBlID0ge1xuICBhZGQ6IChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9ucz86IEV2ZW50T3B0aW9uc1R5cGVcbiAgKSA9PiBFdmVudFN0b3JlVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRTdG9yZSgpOiBFdmVudFN0b3JlVHlwZSB7XG4gIGxldCBsaXN0ZW5lcnM6IEV2ZW50UmVtb3ZlclR5cGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkKFxuICAgIG5vZGU6IEV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IEV2ZW50TmFtZVR5cGUsXG4gICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgICBvcHRpb25zOiBFdmVudE9wdGlvbnNUeXBlID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgKTogRXZlbnRTdG9yZVR5cGUge1xuICAgIGxldCByZW1vdmVMaXN0ZW5lcjogRXZlbnRSZW1vdmVyVHlwZVxuXG4gICAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBub2RlKSB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucylcbiAgICAgIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlZ2FjeU1lZGlhUXVlcnlMaXN0ID0gPE1lZGlhUXVlcnlMaXN0Pm5vZGVcbiAgICAgIGxlZ2FjeU1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKGhhbmRsZXIpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IGxlZ2FjeU1lZGlhUXVlcnlMaXN0LnJlbW92ZUxpc3RlbmVyKGhhbmRsZXIpXG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLnB1c2gocmVtb3ZlTGlzdGVuZXIpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIoKHJlbW92ZSkgPT4gcmVtb3ZlKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudFN0b3JlVHlwZSA9IHtcbiAgICBhZGQsXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lVHlwZSB9IGZyb20gJy4vRW5naW5lJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVXBkYXRlVHlwZSA9IChlbmdpbmU6IEVuZ2luZVR5cGUpID0+IHZvaWRcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKGVuZ2luZTogRW5naW5lVHlwZSwgYWxwaGE6IG51bWJlcikgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHN0YXJ0OiAoKSA9PiB2b2lkXG4gIHN0b3A6ICgpID0+IHZvaWRcbiAgdXBkYXRlOiAoKSA9PiB2b2lkXG4gIHJlbmRlcjogKGFscGhhOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFuaW1hdGlvbnMoXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdXBkYXRlOiAoKSA9PiB2b2lkLFxuICByZW5kZXI6IChhbHBoYTogbnVtYmVyKSA9PiB2b2lkXG4pOiBBbmltYXRpb25zVHlwZSB7XG4gIGNvbnN0IGRvY3VtZW50VmlzaWJsZUhhbmRsZXIgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZml4ZWRUaW1lU3RlcCA9IDEwMDAgLyA2MFxuXG4gIGxldCBsYXN0VGltZVN0YW1wOiBudW1iZXIgfCBudWxsID0gbnVsbFxuICBsZXQgYWNjdW11bGF0ZWRUaW1lID0gMFxuICBsZXQgYW5pbWF0aW9uSWQgPSAwXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmFkZChvd25lckRvY3VtZW50LCAndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcbiAgICAgIGlmIChvd25lckRvY3VtZW50LmhpZGRlbikgcmVzZXQoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIHN0b3AoKVxuICAgIGRvY3VtZW50VmlzaWJsZUhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSh0aW1lU3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApOiB2b2lkIHtcbiAgICBpZiAoIWFuaW1hdGlvbklkKSByZXR1cm5cbiAgICBpZiAoIWxhc3RUaW1lU3RhbXApIHtcbiAgICAgIGxhc3RUaW1lU3RhbXAgPSB0aW1lU3RhbXBcbiAgICAgIHVwZGF0ZSgpXG4gICAgICB1cGRhdGUoKVxuICAgIH1cblxuICAgIGNvbnN0IHRpbWVFbGFwc2VkID0gdGltZVN0YW1wIC0gbGFzdFRpbWVTdGFtcFxuICAgIGxhc3RUaW1lU3RhbXAgPSB0aW1lU3RhbXBcbiAgICBhY2N1bXVsYXRlZFRpbWUgKz0gdGltZUVsYXBzZWRcblxuICAgIHdoaWxlIChhY2N1bXVsYXRlZFRpbWUgPj0gZml4ZWRUaW1lU3RlcCkge1xuICAgICAgdXBkYXRlKClcbiAgICAgIGFjY3VtdWxhdGVkVGltZSAtPSBmaXhlZFRpbWVTdGVwXG4gICAgfVxuXG4gICAgY29uc3QgYWxwaGEgPSBhY2N1bXVsYXRlZFRpbWUgLyBmaXhlZFRpbWVTdGVwXG4gICAgcmVuZGVyKGFscGhhKVxuXG4gICAgaWYgKGFuaW1hdGlvbklkKSB7XG4gICAgICBhbmltYXRpb25JZCA9IG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IHZvaWQge1xuICAgIGlmIChhbmltYXRpb25JZCkgcmV0dXJuXG4gICAgYW5pbWF0aW9uSWQgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKTogdm9pZCB7XG4gICAgb3duZXJXaW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uSWQpXG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBhY2N1bXVsYXRlZFRpbWUgPSAwXG4gICAgYW5pbWF0aW9uSWQgPSAwXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBsYXN0VGltZVN0YW1wID0gbnVsbFxuICAgIGFjY3VtdWxhdGVkVGltZSA9IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFuaW1hdGlvbnNUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBzdGFydCxcbiAgICBzdG9wLFxuICAgIHVwZGF0ZSxcbiAgICByZW5kZXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5cbmV4cG9ydCB0eXBlIEF4aXNPcHRpb25UeXBlID0gJ3gnIHwgJ3knXG5leHBvcnQgdHlwZSBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZSA9ICdsdHInIHwgJ3J0bCdcbnR5cGUgQXhpc0VkZ2VUeXBlID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCdcblxuZXhwb3J0IHR5cGUgQXhpc1R5cGUgPSB7XG4gIHNjcm9sbDogQXhpc09wdGlvblR5cGVcbiAgY3Jvc3M6IEF4aXNPcHRpb25UeXBlXG4gIHN0YXJ0RWRnZTogQXhpc0VkZ2VUeXBlXG4gIGVuZEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBtZWFzdXJlU2l6ZTogKG5vZGVSZWN0OiBOb2RlUmVjdFR5cGUpID0+IG51bWJlclxuICBkaXJlY3Rpb246IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXhpcyhcbiAgYXhpczogQXhpc09wdGlvblR5cGUsXG4gIGNvbnRlbnREaXJlY3Rpb246IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlXG4pOiBBeGlzVHlwZSB7XG4gIGNvbnN0IGlzUmlnaHRUb0xlZnQgPSBjb250ZW50RGlyZWN0aW9uID09PSAncnRsJ1xuICBjb25zdCBpc1ZlcnRpY2FsID0gYXhpcyA9PT0gJ3knXG4gIGNvbnN0IHNjcm9sbCA9IGlzVmVydGljYWwgPyAneScgOiAneCdcbiAgY29uc3QgY3Jvc3MgPSBpc1ZlcnRpY2FsID8gJ3gnIDogJ3knXG4gIGNvbnN0IHNpZ24gPSAhaXNWZXJ0aWNhbCAmJiBpc1JpZ2h0VG9MZWZ0ID8gLTEgOiAxXG4gIGNvbnN0IHN0YXJ0RWRnZSA9IGdldFN0YXJ0RWRnZSgpXG4gIGNvbnN0IGVuZEVkZ2UgPSBnZXRFbmRFZGdlKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU2l6ZShub2RlUmVjdDogTm9kZVJlY3RUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IG5vZGVSZWN0XG4gICAgcmV0dXJuIGlzVmVydGljYWwgPyBoZWlnaHQgOiB3aWR0aFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RhcnRFZGdlKCk6IEF4aXNFZGdlVHlwZSB7XG4gICAgaWYgKGlzVmVydGljYWwpIHJldHVybiAndG9wJ1xuICAgIHJldHVybiBpc1JpZ2h0VG9MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0J1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5kRWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ2JvdHRvbSdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBuICogc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZjogQXhpc1R5cGUgPSB7XG4gICAgc2Nyb2xsLFxuICAgIGNyb3NzLFxuICAgIHN0YXJ0RWRnZSxcbiAgICBlbmRFZGdlLFxuICAgIG1lYXN1cmVTaXplLFxuICAgIGRpcmVjdGlvblxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgTGltaXRUeXBlID0ge1xuICBtaW46IG51bWJlclxuICBtYXg6IG51bWJlclxuICBsZW5ndGg6IG51bWJlclxuICBjb25zdHJhaW46IChuOiBudW1iZXIpID0+IG51bWJlclxuICByZWFjaGVkQW55OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNYXg6IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVhY2hlZE1pbjogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZW1vdmVPZmZzZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGltaXQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDApOiBMaW1pdFR5cGUge1xuICBjb25zdCBsZW5ndGggPSBtYXRoQWJzKG1pbiAtIG1heClcblxuICBmdW5jdGlvbiByZWFjaGVkTWluKG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuIDwgbWluXG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkTWF4KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuID4gbWF4XG4gIH1cblxuICBmdW5jdGlvbiByZWFjaGVkQW55KG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWFjaGVkTWluKG4pIHx8IHJlYWNoZWRNYXgobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghcmVhY2hlZEFueShuKSkgcmV0dXJuIG5cbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSA/IG1pbiA6IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlT2Zmc2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFsZW5ndGgpIHJldHVybiBuXG4gICAgcmV0dXJuIG4gLSBsZW5ndGggKiBNYXRoLmNlaWwoKG4gLSBtYXgpIC8gbGVuZ3RoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogTGltaXRUeXBlID0ge1xuICAgIGxlbmd0aCxcbiAgICBtYXgsXG4gICAgbWluLFxuICAgIGNvbnN0cmFpbixcbiAgICByZWFjaGVkQW55LFxuICAgIHJlYWNoZWRNYXgsXG4gICAgcmVhY2hlZE1pbixcbiAgICByZW1vdmVPZmZzZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIENvdW50ZXJUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGFkZDogKG46IG51bWJlcikgPT4gQ291bnRlclR5cGVcbiAgY2xvbmU6ICgpID0+IENvdW50ZXJUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudGVyKFxuICBtYXg6IG51bWJlcixcbiAgc3RhcnQ6IG51bWJlcixcbiAgbG9vcDogYm9vbGVhblxuKTogQ291bnRlclR5cGUge1xuICBjb25zdCB7IGNvbnN0cmFpbiB9ID0gTGltaXQoMCwgbWF4KVxuICBjb25zdCBsb29wRW5kID0gbWF4ICsgMVxuICBsZXQgY291bnRlciA9IHdpdGhpbkxpbWl0KHN0YXJ0KVxuXG4gIGZ1bmN0aW9uIHdpdGhpbkxpbWl0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuICFsb29wID8gY29uc3RyYWluKG4pIDogbWF0aEFicygobG9vcEVuZCArIG4pICUgbG9vcEVuZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiBjb3VudGVyXG4gIH1cblxuICBmdW5jdGlvbiBzZXQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIGNvdW50ZXIgPSB3aXRoaW5MaW1pdChuKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogbnVtYmVyKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBjbG9uZSgpLnNldChnZXQoKSArIG4pXG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZSgpOiBDb3VudGVyVHlwZSB7XG4gICAgcmV0dXJuIENvdW50ZXIobWF4LCBnZXQoKSwgbG9vcClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IENvdW50ZXJUeXBlID0ge1xuICAgIGdldCxcbiAgICBzZXQsXG4gICAgYWRkLFxuICAgIGNsb25lXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgQW5pbWF0aW9uc1R5cGUgfSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IERyYWdUcmFja2VyVHlwZSwgUG9pbnRlckV2ZW50VHlwZSB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5pbXBvcnQgeyBMaW1pdCB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQge1xuICBkZWx0YUFicyxcbiAgZmFjdG9yQWJzLFxuICBpc0Jvb2xlYW4sXG4gIGlzTW91c2VFdmVudCxcbiAgbWF0aEFicyxcbiAgbWF0aFNpZ24sXG4gIFdpbmRvd1R5cGVcbn0gZnJvbSAnLi91dGlscydcblxudHlwZSBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZSA9IChcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBldnQ6IFBvaW50ZXJFdmVudFR5cGVcbikgPT4gYm9vbGVhbiB8IHZvaWRcblxuZXhwb3J0IHR5cGUgRHJhZ0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IERyYWdIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHBvaW50ZXJEb3duOiAoKSA9PiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmFnSGFuZGxlcihcbiAgYXhpczogQXhpc1R5cGUsXG4gIHJvb3ROb2RlOiBIVE1MRWxlbWVudCxcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgZHJhZ1RyYWNrZXI6IERyYWdUcmFja2VyVHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZSxcbiAgaW5kZXg6IENvdW50ZXJUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlLFxuICBkcmFnRnJlZTogYm9vbGVhbixcbiAgZHJhZ1RocmVzaG9sZDogbnVtYmVyLFxuICBza2lwU25hcHM6IGJvb2xlYW4sXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyLFxuICB3YXRjaERyYWc6IERyYWdIYW5kbGVyT3B0aW9uVHlwZVxuKTogRHJhZ0hhbmRsZXJUeXBlIHtcbiAgY29uc3QgeyBjcm9zczogY3Jvc3NBeGlzLCBkaXJlY3Rpb24gfSA9IGF4aXNcbiAgY29uc3QgZm9jdXNOb2RlcyA9IFsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ11cbiAgY29uc3Qgbm9uUGFzc2l2ZUV2ZW50ID0geyBwYXNzaXZlOiBmYWxzZSB9XG4gIGNvbnN0IGluaXRFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZHJhZ0V2ZW50cyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBnb1RvTmV4dFRocmVzaG9sZCA9IExpbWl0KDUwLCAyMjUpLmNvbnN0cmFpbihwZXJjZW50T2ZWaWV3Lm1lYXN1cmUoMjApKVxuICBjb25zdCBzbmFwRm9yY2VCb29zdCA9IHsgbW91c2U6IDMwMCwgdG91Y2g6IDQwMCB9XG4gIGNvbnN0IGZyZWVGb3JjZUJvb3N0ID0geyBtb3VzZTogNTAwLCB0b3VjaDogNjAwIH1cbiAgY29uc3QgYmFzZVNwZWVkID0gZHJhZ0ZyZWUgPyA0MyA6IDI1XG5cbiAgbGV0IGlzTW92aW5nID0gZmFsc2VcbiAgbGV0IHN0YXJ0U2Nyb2xsID0gMFxuICBsZXQgc3RhcnRDcm9zcyA9IDBcbiAgbGV0IHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICBsZXQgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gIGxldCBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICBsZXQgaXNNb3VzZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoRHJhZykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkb3duSWZBbGxvd2VkKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaERyYWcpIHx8IHdhdGNoRHJhZyhlbWJsYUFwaSwgZXZ0KSkgZG93bihldnQpXG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IHJvb3ROb2RlXG4gICAgaW5pdEV2ZW50c1xuICAgICAgLmFkZChub2RlLCAnZHJhZ3N0YXJ0JywgKGV2dCkgPT4gZXZ0LnByZXZlbnREZWZhdWx0KCksIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsICgpID0+IHVuZGVmaW5lZCwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAndG91Y2hlbmQnLCAoKSA9PiB1bmRlZmluZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaHN0YXJ0JywgZG93bklmQWxsb3dlZClcbiAgICAgIC5hZGQobm9kZSwgJ21vdXNlZG93bicsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGNhbmNlbCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnY29udGV4dG1lbnUnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NsaWNrJywgY2xpY2ssIHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGluaXRFdmVudHMuY2xlYXIoKVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRHJhZ0V2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gaXNNb3VzZSA/IG93bmVyRG9jdW1lbnQgOiByb290Tm9kZVxuICAgIGRyYWdFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNobW92ZScsIG1vdmUsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgdXApXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZW1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZXVwJywgdXApXG4gIH1cblxuICBmdW5jdGlvbiBpc0ZvY3VzTm9kZShub2RlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lIHx8ICcnXG4gICAgcmV0dXJuIGZvY3VzTm9kZXMuaW5jbHVkZXMobm9kZU5hbWUpXG4gIH1cblxuICBmdW5jdGlvbiBmb3JjZUJvb3N0KCk6IG51bWJlciB7XG4gICAgY29uc3QgYm9vc3QgPSBkcmFnRnJlZSA/IGZyZWVGb3JjZUJvb3N0IDogc25hcEZvcmNlQm9vc3RcbiAgICBjb25zdCB0eXBlID0gaXNNb3VzZSA/ICdtb3VzZScgOiAndG91Y2gnXG4gICAgcmV0dXJuIGJvb3N0W3R5cGVdXG4gIH1cblxuICBmdW5jdGlvbiBhbGxvd2VkRm9yY2UoZm9yY2U6IG51bWJlciwgdGFyZ2V0Q2hhbmdlZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3QgbmV4dCA9IGluZGV4LmFkZChtYXRoU2lnbihmb3JjZSkgKiAtMSlcbiAgICBjb25zdCBiYXNlRm9yY2UgPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZShmb3JjZSwgIWRyYWdGcmVlKS5kaXN0YW5jZVxuXG4gICAgaWYgKGRyYWdGcmVlIHx8IG1hdGhBYnMoZm9yY2UpIDwgZ29Ub05leHRUaHJlc2hvbGQpIHJldHVybiBiYXNlRm9yY2VcbiAgICBpZiAoc2tpcFNuYXBzICYmIHRhcmdldENoYW5nZWQpIHJldHVybiBiYXNlRm9yY2UgKiAwLjVcblxuICAgIHJldHVybiBzY3JvbGxUYXJnZXQuYnlJbmRleChuZXh0LmdldCgpLCAwKS5kaXN0YW5jZVxuICB9XG5cbiAgZnVuY3Rpb24gZG93bihldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc01vdXNlRXZ0ID0gaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaXNNb3VzZSA9IGlzTW91c2VFdnRcbiAgICBwcmV2ZW50Q2xpY2sgPSBkcmFnRnJlZSAmJiBpc01vdXNlRXZ0ICYmICFldnQuYnV0dG9ucyAmJiBpc01vdmluZ1xuICAgIGlzTW92aW5nID0gZGVsdGFBYnModGFyZ2V0LmdldCgpLCBsb2NhdGlvbi5nZXQoKSkgPj0gMlxuXG4gICAgaWYgKGlzTW91c2VFdnQgJiYgZXZ0LmJ1dHRvbiAhPT0gMCkgcmV0dXJuXG4gICAgaWYgKGlzRm9jdXNOb2RlKGV2dC50YXJnZXQgYXMgRWxlbWVudCkpIHJldHVyblxuXG4gICAgcG9pbnRlcklzRG93biA9IHRydWVcbiAgICBkcmFnVHJhY2tlci5wb2ludGVyRG93bihldnQpXG4gICAgc2Nyb2xsQm9keS51c2VGcmljdGlvbigwKS51c2VEdXJhdGlvbigwKVxuICAgIHRhcmdldC5zZXQobG9jYXRpb24pXG4gICAgYWRkRHJhZ0V2ZW50cygpXG4gICAgc3RhcnRTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIHN0YXJ0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJEb3duJylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNUb3VjaEV2dCA9ICFpc01vdXNlRXZlbnQoZXZ0LCBvd25lcldpbmRvdylcbiAgICBpZiAoaXNUb3VjaEV2dCAmJiBldnQudG91Y2hlcy5sZW5ndGggPj0gMikgcmV0dXJuIHVwKGV2dClcblxuICAgIGNvbnN0IGxhc3RTY3JvbGwgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0KVxuICAgIGNvbnN0IGxhc3RDcm9zcyA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQsIGNyb3NzQXhpcylcbiAgICBjb25zdCBkaWZmU2Nyb2xsID0gZGVsdGFBYnMobGFzdFNjcm9sbCwgc3RhcnRTY3JvbGwpXG4gICAgY29uc3QgZGlmZkNyb3NzID0gZGVsdGFBYnMobGFzdENyb3NzLCBzdGFydENyb3NzKVxuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsICYmICFpc01vdXNlKSB7XG4gICAgICBpZiAoIWV2dC5jYW5jZWxhYmxlKSByZXR1cm4gdXAoZXZ0KVxuICAgICAgcHJldmVudFNjcm9sbCA9IGRpZmZTY3JvbGwgPiBkaWZmQ3Jvc3NcbiAgICAgIGlmICghcHJldmVudFNjcm9sbCkgcmV0dXJuIHVwKGV2dClcbiAgICB9XG4gICAgY29uc3QgZGlmZiA9IGRyYWdUcmFja2VyLnBvaW50ZXJNb3ZlKGV2dClcbiAgICBpZiAoZGlmZlNjcm9sbCA+IGRyYWdUaHJlc2hvbGQpIHByZXZlbnRDbGljayA9IHRydWVcblxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMC4zKS51c2VEdXJhdGlvbigwLjc1KVxuICAgIGFuaW1hdGlvbi5zdGFydCgpXG4gICAgdGFyZ2V0LmFkZChkaXJlY3Rpb24oZGlmZikpXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKDAsIGZhbHNlKVxuICAgIGNvbnN0IHRhcmdldENoYW5nZWQgPSBjdXJyZW50TG9jYXRpb24uaW5kZXggIT09IGluZGV4LmdldCgpXG4gICAgY29uc3QgcmF3Rm9yY2UgPSBkcmFnVHJhY2tlci5wb2ludGVyVXAoZXZ0KSAqIGZvcmNlQm9vc3QoKVxuICAgIGNvbnN0IGZvcmNlID0gYWxsb3dlZEZvcmNlKGRpcmVjdGlvbihyYXdGb3JjZSksIHRhcmdldENoYW5nZWQpXG4gICAgY29uc3QgZm9yY2VGYWN0b3IgPSBmYWN0b3JBYnMocmF3Rm9yY2UsIGZvcmNlKVxuICAgIGNvbnN0IHNwZWVkID0gYmFzZVNwZWVkIC0gMTAgKiBmb3JjZUZhY3RvclxuICAgIGNvbnN0IGZyaWN0aW9uID0gYmFzZUZyaWN0aW9uICsgZm9yY2VGYWN0b3IgLyA1MFxuXG4gICAgcHJldmVudFNjcm9sbCA9IGZhbHNlXG4gICAgcG9pbnRlcklzRG93biA9IGZhbHNlXG4gICAgZHJhZ0V2ZW50cy5jbGVhcigpXG4gICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbihzcGVlZCkudXNlRnJpY3Rpb24oZnJpY3Rpb24pXG4gICAgc2Nyb2xsVG8uZGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSlcbiAgICBpc01vdXNlID0gZmFsc2VcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9pbnRlclVwJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrKGV2dDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChwcmV2ZW50Q2xpY2spIHtcbiAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHByZXZlbnRDbGljayA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBvaW50ZXJJc0Rvd25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgcG9pbnRlckRvd25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc09wdGlvblR5cGUsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgaXNNb3VzZUV2ZW50LCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBQb2ludGVyQ29vcmRUeXBlID0ga2V5b2YgVG91Y2ggfCBrZXlvZiBNb3VzZUV2ZW50XG5leHBvcnQgdHlwZSBQb2ludGVyRXZlbnRUeXBlID0gVG91Y2hFdmVudCB8IE1vdXNlRXZlbnRcblxuZXhwb3J0IHR5cGUgRHJhZ1RyYWNrZXJUeXBlID0ge1xuICBwb2ludGVyRG93bjogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJNb3ZlOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcG9pbnRlclVwOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcmVhZFBvaW50OiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlLCBldnRBeGlzPzogQXhpc09wdGlvblR5cGUpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ1RyYWNrZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogRHJhZ1RyYWNrZXJUeXBlIHtcbiAgY29uc3QgbG9nSW50ZXJ2YWwgPSAxNzBcblxuICBsZXQgc3RhcnRFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuICBsZXQgbGFzdEV2ZW50OiBQb2ludGVyRXZlbnRUeXBlXG5cbiAgZnVuY3Rpb24gcmVhZFRpbWUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZXZ0LnRpbWVTdGFtcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFBvaW50KGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IGV2dEF4aXMgfHwgYXhpcy5zY3JvbGxcbiAgICBjb25zdCBjb29yZDogUG9pbnRlckNvb3JkVHlwZSA9IGBjbGllbnQke3Byb3BlcnR5ID09PSAneCcgPyAnWCcgOiAnWSd9YFxuICAgIHJldHVybiAoaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpID8gZXZ0IDogZXZ0LnRvdWNoZXNbMF0pW2Nvb3JkXVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlckRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBzdGFydEV2ZW50ID0gZXZ0XG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgcmV0dXJuIHJlYWRQb2ludChldnQpXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyTW92ZShldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpZmYgPSByZWFkUG9pbnQoZXZ0KSAtIHJlYWRQb2ludChsYXN0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShzdGFydEV2ZW50KSA+IGxvZ0ludGVydmFsXG5cbiAgICBsYXN0RXZlbnQgPSBldnRcbiAgICBpZiAoZXhwaXJlZCkgc3RhcnRFdmVudCA9IGV2dFxuICAgIHJldHVybiBkaWZmXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyVXAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBpZiAoIXN0YXJ0RXZlbnQgfHwgIWxhc3RFdmVudCkgcmV0dXJuIDBcbiAgICBjb25zdCBkaWZmRHJhZyA9IHJlYWRQb2ludChsYXN0RXZlbnQpIC0gcmVhZFBvaW50KHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZGlmZlRpbWUgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudClcbiAgICBjb25zdCBleHBpcmVkID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKGxhc3RFdmVudCkgPiBsb2dJbnRlcnZhbFxuICAgIGNvbnN0IGZvcmNlID0gZGlmZkRyYWcgLyBkaWZmVGltZVxuICAgIGNvbnN0IGlzRmxpY2sgPSBkaWZmVGltZSAmJiAhZXhwaXJlZCAmJiBtYXRoQWJzKGZvcmNlKSA+IDAuMVxuXG4gICAgcmV0dXJuIGlzRmxpY2sgPyBmb3JjZSA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IERyYWdUcmFja2VyVHlwZSA9IHtcbiAgICBwb2ludGVyRG93bixcbiAgICBwb2ludGVyTW92ZSxcbiAgICBwb2ludGVyVXAsXG4gICAgcmVhZFBvaW50XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIE5vZGVSZWN0VHlwZSA9IHtcbiAgdG9wOiBudW1iZXJcbiAgcmlnaHQ6IG51bWJlclxuICBib3R0b206IG51bWJlclxuICBsZWZ0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBOb2RlUmVjdHNUeXBlID0ge1xuICBtZWFzdXJlOiAobm9kZTogSFRNTEVsZW1lbnQpID0+IE5vZGVSZWN0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTm9kZVJlY3RzKCk6IE5vZGVSZWN0c1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG5vZGU6IEhUTUxFbGVtZW50KTogTm9kZVJlY3RUeXBlIHtcbiAgICBjb25zdCB7IG9mZnNldFRvcCwgb2Zmc2V0TGVmdCwgb2Zmc2V0V2lkdGgsIG9mZnNldEhlaWdodCB9ID0gbm9kZVxuICAgIGNvbnN0IG9mZnNldDogTm9kZVJlY3RUeXBlID0ge1xuICAgICAgdG9wOiBvZmZzZXRUb3AsXG4gICAgICByaWdodDogb2Zmc2V0TGVmdCArIG9mZnNldFdpZHRoLFxuICAgICAgYm90dG9tOiBvZmZzZXRUb3AgKyBvZmZzZXRIZWlnaHQsXG4gICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgd2lkdGg6IG9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBvZmZzZXRIZWlnaHRcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBjb25zdCBzZWxmOiBOb2RlUmVjdHNUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiZXhwb3J0IHR5cGUgUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gIG1lYXN1cmU6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGVyY2VudE9mVmlldyh2aWV3U2l6ZTogbnVtYmVyKTogUGVyY2VudE9mVmlld1R5cGUge1xuICBmdW5jdGlvbiBtZWFzdXJlKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplICogKG4gLyAxMDApXG4gIH1cblxuICBjb25zdCBzZWxmOiBQZXJjZW50T2ZWaWV3VHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBOb2RlUmVjdHNUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFJlc2l6ZUhhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzaXplSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBheGlzOiBBeGlzVHlwZSxcbiAgd2F0Y2hSZXNpemU6IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlLFxuICBub2RlUmVjdHM6IE5vZGVSZWN0c1R5cGVcbik6IFJlc2l6ZUhhbmRsZXJUeXBlIHtcbiAgY29uc3Qgb2JzZXJ2ZU5vZGVzID0gW2NvbnRhaW5lcl0uY29uY2F0KHNsaWRlcylcbiAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlclxuICBsZXQgY29udGFpbmVyU2l6ZTogbnVtYmVyXG4gIGxldCBzbGlkZVNpemVzOiBudW1iZXJbXSA9IFtdXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHJlYWRTaXplKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gYXhpcy5tZWFzdXJlU2l6ZShub2RlUmVjdHMubWVhc3VyZShub2RlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFJlc2l6ZSkgcmV0dXJuXG5cbiAgICBjb250YWluZXJTaXplID0gcmVhZFNpemUoY29udGFpbmVyKVxuICAgIHNsaWRlU2l6ZXMgPSBzbGlkZXMubWFwKHJlYWRTaXplKVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdENhbGxiYWNrKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGlzQ29udGFpbmVyID0gZW50cnkudGFyZ2V0ID09PSBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHNsaWRlcy5pbmRleE9mKDxIVE1MRWxlbWVudD5lbnRyeS50YXJnZXQpXG4gICAgICAgIGNvbnN0IGxhc3RTaXplID0gaXNDb250YWluZXIgPyBjb250YWluZXJTaXplIDogc2xpZGVTaXplc1tzbGlkZUluZGV4XVxuICAgICAgICBjb25zdCBuZXdTaXplID0gcmVhZFNpemUoaXNDb250YWluZXIgPyBjb250YWluZXIgOiBzbGlkZXNbc2xpZGVJbmRleF0pXG4gICAgICAgIGNvbnN0IGRpZmZTaXplID0gbWF0aEFicyhuZXdTaXplIC0gbGFzdFNpemUpXG5cbiAgICAgICAgaWYgKGRpZmZTaXplID49IDAuNSkge1xuICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpXG5cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hSZXNpemUpIHx8IHdhdGNoUmVzaXplKGVtYmxhQXBpLCBlbnRyaWVzKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2soZW50cmllcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIG9ic2VydmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiByZXNpemVPYnNlcnZlci5vYnNlcnZlKG5vZGUpKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IG1hdGhTaWduLCBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbEJvZHlUeXBlID0ge1xuICBkaXJlY3Rpb246ICgpID0+IG51bWJlclxuICBkdXJhdGlvbjogKCkgPT4gbnVtYmVyXG4gIHZlbG9jaXR5OiAoKSA9PiBudW1iZXJcbiAgc2VlazogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgc2V0dGxlZDogKCkgPT4gYm9vbGVhblxuICB1c2VCYXNlRnJpY3Rpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUJhc2VEdXJhdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRnJpY3Rpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUR1cmF0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm9keShcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgb2Zmc2V0TG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgcHJldmlvdXNMb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgYmFzZUR1cmF0aW9uOiBudW1iZXIsXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyXG4pOiBTY3JvbGxCb2R5VHlwZSB7XG4gIGxldCBzY3JvbGxWZWxvY2l0eSA9IDBcbiAgbGV0IHNjcm9sbERpcmVjdGlvbiA9IDBcbiAgbGV0IHNjcm9sbER1cmF0aW9uID0gYmFzZUR1cmF0aW9uXG4gIGxldCBzY3JvbGxGcmljdGlvbiA9IGJhc2VGcmljdGlvblxuICBsZXQgcmF3TG9jYXRpb24gPSBsb2NhdGlvbi5nZXQoKVxuICBsZXQgcmF3TG9jYXRpb25QcmV2aW91cyA9IDBcblxuICBmdW5jdGlvbiBzZWVrKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBjb25zdCBkaXNwbGFjZW1lbnQgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGlzSW5zdGFudCA9ICFzY3JvbGxEdXJhdGlvblxuICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IDBcblxuICAgIGlmIChpc0luc3RhbnQpIHtcbiAgICAgIHNjcm9sbFZlbG9jaXR5ID0gMFxuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQodGFyZ2V0KVxuICAgICAgbG9jYXRpb24uc2V0KHRhcmdldClcblxuICAgICAgc2Nyb2xsRGlzdGFuY2UgPSBkaXNwbGFjZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNMb2NhdGlvbi5zZXQobG9jYXRpb24pXG5cbiAgICAgIHNjcm9sbFZlbG9jaXR5ICs9IGRpc3BsYWNlbWVudCAvIHNjcm9sbER1cmF0aW9uXG4gICAgICBzY3JvbGxWZWxvY2l0eSAqPSBzY3JvbGxGcmljdGlvblxuICAgICAgcmF3TG9jYXRpb24gKz0gc2Nyb2xsVmVsb2NpdHlcbiAgICAgIGxvY2F0aW9uLmFkZChzY3JvbGxWZWxvY2l0eSlcblxuICAgICAgc2Nyb2xsRGlzdGFuY2UgPSByYXdMb2NhdGlvbiAtIHJhd0xvY2F0aW9uUHJldmlvdXNcbiAgICB9XG5cbiAgICBzY3JvbGxEaXJlY3Rpb24gPSBtYXRoU2lnbihzY3JvbGxEaXN0YW5jZSlcbiAgICByYXdMb2NhdGlvblByZXZpb3VzID0gcmF3TG9jYXRpb25cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gc2V0dGxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaWZmID0gdGFyZ2V0LmdldCgpIC0gb2Zmc2V0TG9jYXRpb24uZ2V0KClcbiAgICByZXR1cm4gbWF0aEFicyhkaWZmKSA8IDAuMDAxXG4gIH1cblxuICBmdW5jdGlvbiBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEdXJhdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gZGlyZWN0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbERpcmVjdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gdmVsb2NpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsVmVsb2NpdHlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VEdXJhdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUR1cmF0aW9uKGJhc2VEdXJhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VGcmljdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUZyaWN0aW9uKGJhc2VGcmljdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUR1cmF0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxEdXJhdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gdXNlRnJpY3Rpb24objogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHNjcm9sbEZyaWN0aW9uID0gblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgICBkaXJlY3Rpb24sXG4gICAgZHVyYXRpb24sXG4gICAgdmVsb2NpdHksXG4gICAgc2VlayxcbiAgICBzZXR0bGVkLFxuICAgIHVzZUJhc2VGcmljdGlvbixcbiAgICB1c2VCYXNlRHVyYXRpb24sXG4gICAgdXNlRnJpY3Rpb24sXG4gICAgdXNlRHVyYXRpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICBzaG91bGRDb25zdHJhaW46ICgpID0+IGJvb2xlYW5cbiAgY29uc3RyYWluOiAocG9pbnRlckRvd246IGJvb2xlYW4pID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxCb3VuZHMoXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHRhcmdldDogVmVjdG9yMURUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGVcbik6IFNjcm9sbEJvdW5kc1R5cGUge1xuICBjb25zdCBwdWxsQmFja1RocmVzaG9sZCA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSgxMClcbiAgY29uc3QgZWRnZU9mZnNldFRvbGVyYW5jZSA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSg1MClcbiAgY29uc3QgZnJpY3Rpb25MaW1pdCA9IExpbWl0KDAuMSwgMC45OSlcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBzaG91bGRDb25zdHJhaW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWxpbWl0LnJlYWNoZWRBbnkodGFyZ2V0LmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KGxvY2F0aW9uLmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihwb2ludGVyRG93bjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghc2hvdWxkQ29uc3RyYWluKCkpIHJldHVyblxuICAgIGNvbnN0IGVkZ2UgPSBsaW1pdC5yZWFjaGVkTWluKGxvY2F0aW9uLmdldCgpKSA/ICdtaW4nIDogJ21heCdcbiAgICBjb25zdCBkaWZmVG9FZGdlID0gbWF0aEFicyhsaW1pdFtlZGdlXSAtIGxvY2F0aW9uLmdldCgpKVxuICAgIGNvbnN0IGRpZmZUb1RhcmdldCA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgY29uc3QgZnJpY3Rpb24gPSBmcmljdGlvbkxpbWl0LmNvbnN0cmFpbihkaWZmVG9FZGdlIC8gZWRnZU9mZnNldFRvbGVyYW5jZSlcblxuICAgIHRhcmdldC5zdWJ0cmFjdChkaWZmVG9UYXJnZXQgKiBmcmljdGlvbilcblxuICAgIGlmICghcG9pbnRlckRvd24gJiYgbWF0aEFicyhkaWZmVG9UYXJnZXQpIDwgcHVsbEJhY2tUaHJlc2hvbGQpIHtcbiAgICAgIHRhcmdldC5zZXQobGltaXQuY29uc3RyYWluKHRhcmdldC5nZXQoKSkpXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDI1KS51c2VCYXNlRnJpY3Rpb24oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBkaXNhYmxlZCA9ICFhY3RpdmVcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbEJvdW5kc1R5cGUgPSB7XG4gICAgc2hvdWxkQ29uc3RyYWluLFxuICAgIGNvbnN0cmFpbixcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIGRlbHRhQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUgPSBmYWxzZSB8ICd0cmltU25hcHMnIHwgJ2tlZXBTbmFwcydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpblR5cGUgPSB7XG4gIHNuYXBzQ29udGFpbmVkOiBudW1iZXJbXVxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQ29udGFpbihcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc25hcHNBbGlnbmVkOiBudW1iZXJbXSxcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHBpeGVsVG9sZXJhbmNlOiBudW1iZXJcbik6IFNjcm9sbENvbnRhaW5UeXBlIHtcbiAgY29uc3Qgc2Nyb2xsQm91bmRzID0gTGltaXQoLWNvbnRlbnRTaXplICsgdmlld1NpemUsIDApXG4gIGNvbnN0IHNuYXBzQm91bmRlZCA9IG1lYXN1cmVCb3VuZGVkKClcbiAgY29uc3Qgc2Nyb2xsQ29udGFpbkxpbWl0ID0gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpXG4gIGNvbnN0IHNuYXBzQ29udGFpbmVkID0gbWVhc3VyZUNvbnRhaW5lZCgpXG5cbiAgZnVuY3Rpb24gdXNlUGl4ZWxUb2xlcmFuY2UoYm91bmQ6IG51bWJlciwgc25hcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRlbHRhQWJzKGJvdW5kLCBzbmFwKSA8PSAxXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2Nyb2xsQ29udGFpbkxpbWl0KCk6IExpbWl0VHlwZSB7XG4gICAgY29uc3Qgc3RhcnRTbmFwID0gc25hcHNCb3VuZGVkWzBdXG4gICAgY29uc3QgZW5kU25hcCA9IGFycmF5TGFzdChzbmFwc0JvdW5kZWQpXG4gICAgY29uc3QgbWluID0gc25hcHNCb3VuZGVkLmxhc3RJbmRleE9mKHN0YXJ0U25hcClcbiAgICBjb25zdCBtYXggPSBzbmFwc0JvdW5kZWQuaW5kZXhPZihlbmRTbmFwKSArIDFcbiAgICByZXR1cm4gTGltaXQobWluLCBtYXgpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQm91bmRlZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNuYXBzQWxpZ25lZFxuICAgICAgLm1hcCgoc25hcEFsaWduZWQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbEJvdW5kc1xuICAgICAgICBjb25zdCBzbmFwID0gc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihzbmFwQWxpZ25lZClcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9ICFpbmRleFxuICAgICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KHNuYXBzQWxpZ25lZCwgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gbWF4XG4gICAgICAgIGlmIChpc0xhc3QpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1pbiwgc25hcCkpIHJldHVybiBtaW5cbiAgICAgICAgaWYgKHVzZVBpeGVsVG9sZXJhbmNlKG1heCwgc25hcCkpIHJldHVybiBtYXhcbiAgICAgICAgcmV0dXJuIHNuYXBcbiAgICAgIH0pXG4gICAgICAubWFwKChzY3JvbGxCb3VuZCkgPT4gcGFyc2VGbG9hdChzY3JvbGxCb3VuZC50b0ZpeGVkKDMpKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVDb250YWluZWQoKTogbnVtYmVyW10ge1xuICAgIGlmIChjb250ZW50U2l6ZSA8PSB2aWV3U2l6ZSArIHBpeGVsVG9sZXJhbmNlKSByZXR1cm4gW3Njcm9sbEJvdW5kcy5tYXhdXG4gICAgaWYgKGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnKSByZXR1cm4gc25hcHNCb3VuZGVkXG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gICAgcmV0dXJuIHNuYXBzQm91bmRlZC5zbGljZShtaW4sIG1heClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbENvbnRhaW5UeXBlID0ge1xuICAgIHNuYXBzQ29udGFpbmVkLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IGFycmF5TGFzdCB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgbGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTGltaXQoXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgbG9vcDogYm9vbGVhblxuKTogU2Nyb2xsTGltaXRUeXBlIHtcbiAgY29uc3QgbWF4ID0gc2Nyb2xsU25hcHNbMF1cbiAgY29uc3QgbWluID0gbG9vcCA/IG1heCAtIGNvbnRlbnRTaXplIDogYXJyYXlMYXN0KHNjcm9sbFNuYXBzKVxuICBjb25zdCBsaW1pdCA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbExpbWl0VHlwZSA9IHtcbiAgICBsaW1pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbExvb3BlclR5cGUgPSB7XG4gIGxvb3A6IChkaXJlY3Rpb246IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsTG9vcGVyKFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB2ZWN0b3JzOiBWZWN0b3IxRFR5cGVbXVxuKTogU2Nyb2xsTG9vcGVyVHlwZSB7XG4gIGNvbnN0IGpvaW50U2FmZXR5ID0gMC4xXG4gIGNvbnN0IG1pbiA9IGxpbWl0Lm1pbiArIGpvaW50U2FmZXR5XG4gIGNvbnN0IG1heCA9IGxpbWl0Lm1heCArIGpvaW50U2FmZXR5XG4gIGNvbnN0IHsgcmVhY2hlZE1pbiwgcmVhY2hlZE1heCB9ID0gTGltaXQobWluLCBtYXgpXG5cbiAgZnVuY3Rpb24gc2hvdWxkTG9vcChkaXJlY3Rpb246IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHJldHVybiByZWFjaGVkTWF4KGxvY2F0aW9uLmdldCgpKVxuICAgIGlmIChkaXJlY3Rpb24gPT09IC0xKSByZXR1cm4gcmVhY2hlZE1pbihsb2NhdGlvbi5nZXQoKSlcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXNob3VsZExvb3AoZGlyZWN0aW9uKSkgcmV0dXJuXG5cbiAgICBjb25zdCBsb29wRGlzdGFuY2UgPSBjb250ZW50U2l6ZSAqIChkaXJlY3Rpb24gKiAtMSlcbiAgICB2ZWN0b3JzLmZvckVhY2goKHYpID0+IHYuYWRkKGxvb3BEaXN0YW5jZSkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxMb29wZXJUeXBlID0ge1xuICAgIGxvb3BcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICBnZXQ6IChuOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsUHJvZ3Jlc3MobGltaXQ6IExpbWl0VHlwZSk6IFNjcm9sbFByb2dyZXNzVHlwZSB7XG4gIGNvbnN0IHsgbWF4LCBsZW5ndGggfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gZ2V0KG46IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uID0gbiAtIG1heFxuICAgIHJldHVybiBsZW5ndGggPyBjdXJyZW50TG9jYXRpb24gLyAtbGVuZ3RoIDogMFxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsUHJvZ3Jlc3NUeXBlID0ge1xuICAgIGdldFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnRUeXBlIH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IGFycmF5TGFzdCwgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgc25hcHM6IG51bWJlcltdXG4gIHNuYXBzQWxpZ25lZDogbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFNuYXBzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgYWxpZ25tZW50OiBBbGlnbm1lbnRUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlXG4pOiBTY3JvbGxTbmFwc1R5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSB9ID0gYXhpc1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCBhbGlnbm1lbnRzID0gbWVhc3VyZVNpemVzKCkubWFwKGFsaWdubWVudC5tZWFzdXJlKVxuICBjb25zdCBzbmFwcyA9IG1lYXN1cmVVbmFsaWduZWQoKVxuICBjb25zdCBzbmFwc0FsaWduZWQgPSBtZWFzdXJlQWxpZ25lZCgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemVzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc2xpZGVSZWN0cylcbiAgICAgIC5tYXAoKHJlY3RzKSA9PiBhcnJheUxhc3QocmVjdHMpW2VuZEVkZ2VdIC0gcmVjdHNbMF1bc3RhcnRFZGdlXSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVVbmFsaWduZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbGlkZVJlY3RzXG4gICAgICAubWFwKChyZWN0KSA9PiBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKChzbmFwKSA9PiAtbWF0aEFicyhzbmFwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVBbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZ3JvdXBTbGlkZXMoc25hcHMpXG4gICAgICAubWFwKChnKSA9PiBnWzBdKVxuICAgICAgLm1hcCgoc25hcCwgaW5kZXgpID0+IHNuYXAgKyBhbGlnbm1lbnRzW2luZGV4XSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFNuYXBzVHlwZSA9IHtcbiAgICBzbmFwcyxcbiAgICBzbmFwc0FsaWduZWRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7XG4gIGFycmF5RnJvbU51bWJlcixcbiAgYXJyYXlJc0xhc3RJbmRleCxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleFxufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgc2xpZGVSZWdpc3RyeTogbnVtYmVyW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVSZWdpc3RyeShcbiAgY29udGFpblNuYXBzOiBib29sZWFuLFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZSxcbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuKTogU2xpZGVSZWdpc3RyeVR5cGUge1xuICBjb25zdCB7IGdyb3VwU2xpZGVzIH0gPSBzbGlkZXNUb1Njcm9sbFxuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxDb250YWluTGltaXRcbiAgY29uc3Qgc2xpZGVSZWdpc3RyeSA9IGNyZWF0ZVNsaWRlUmVnaXN0cnkoKVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlUmVnaXN0cnkoKTogbnVtYmVyW11bXSB7XG4gICAgY29uc3QgZ3JvdXBlZFNsaWRlSW5kZXhlcyA9IGdyb3VwU2xpZGVzKHNsaWRlSW5kZXhlcylcbiAgICBjb25zdCBkb05vdENvbnRhaW4gPSAhY29udGFpblNuYXBzIHx8IGNvbnRhaW5TY3JvbGwgPT09ICdrZWVwU25hcHMnXG5cbiAgICBpZiAoc2Nyb2xsU25hcHMubGVuZ3RoID09PSAxKSByZXR1cm4gW3NsaWRlSW5kZXhlc11cbiAgICBpZiAoZG9Ob3RDb250YWluKSByZXR1cm4gZ3JvdXBlZFNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXMuc2xpY2UobWluLCBtYXgpLm1hcCgoZ3JvdXAsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgoZ3JvdXBzLCBpbmRleClcblxuICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3QoZ3JvdXBzWzBdKSArIDFcbiAgICAgICAgcmV0dXJuIGFycmF5RnJvbU51bWJlcihyYW5nZSlcbiAgICAgIH1cbiAgICAgIGlmIChpc0xhc3QpIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBhcnJheUxhc3RJbmRleChzbGlkZUluZGV4ZXMpIC0gYXJyYXlMYXN0KGdyb3VwcylbMF0gKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UsIGFycmF5TGFzdChncm91cHMpWzBdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdyb3VwXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlUmVnaXN0cnlUeXBlID0ge1xuICAgIHNsaWRlUmVnaXN0cnlcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMsIG1hdGhTaWduIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVGFyZ2V0VHlwZSA9IHtcbiAgZGlzdGFuY2U6IG51bWJlclxuICBpbmRleDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gIGJ5SW5kZXg6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IFRhcmdldFR5cGVcbiAgYnlEaXN0YW5jZTogKGZvcmNlOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IFRhcmdldFR5cGVcbiAgc2hvcnRjdXQ6ICh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsVGFyZ2V0KFxuICBsb29wOiBib29sZWFuLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlXG4pOiBTY3JvbGxUYXJnZXRUeXBlIHtcbiAgY29uc3QgeyByZWFjaGVkQW55LCByZW1vdmVPZmZzZXQsIGNvbnN0cmFpbiB9ID0gbGltaXRcblxuICBmdW5jdGlvbiBtaW5EaXN0YW5jZShkaXN0YW5jZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGlzdGFuY2VzLmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IG1hdGhBYnMoYSkgLSBtYXRoQWJzKGIpKVswXVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFRhcmdldFNuYXAodGFyZ2V0OiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IGxvb3AgPyByZW1vdmVPZmZzZXQodGFyZ2V0KSA6IGNvbnN0cmFpbih0YXJnZXQpXG4gICAgY29uc3QgYXNjRGlmZnNUb1NuYXBzID0gc2Nyb2xsU25hcHNcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiAoeyBkaWZmOiBzaG9ydGN1dChzbmFwIC0gZGlzdGFuY2UsIDApLCBpbmRleCB9KSlcbiAgICAgIC5zb3J0KChkMSwgZDIpID0+IG1hdGhBYnMoZDEuZGlmZikgLSBtYXRoQWJzKGQyLmRpZmYpKVxuXG4gICAgY29uc3QgeyBpbmRleCB9ID0gYXNjRGlmZnNUb1NuYXBzWzBdXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3J0Y3V0KHRhcmdldDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFt0YXJnZXQsIHRhcmdldCArIGNvbnRlbnRTaXplLCB0YXJnZXQgLSBjb250ZW50U2l6ZV1cblxuICAgIGlmICghbG9vcCkgcmV0dXJuIHRhcmdldFxuICAgIGlmICghZGlyZWN0aW9uKSByZXR1cm4gbWluRGlzdGFuY2UodGFyZ2V0cylcblxuICAgIGNvbnN0IG1hdGNoaW5nVGFyZ2V0cyA9IHRhcmdldHMuZmlsdGVyKCh0KSA9PiBtYXRoU2lnbih0KSA9PT0gZGlyZWN0aW9uKVxuICAgIGlmIChtYXRjaGluZ1RhcmdldHMubGVuZ3RoKSByZXR1cm4gbWluRGlzdGFuY2UobWF0Y2hpbmdUYXJnZXRzKVxuICAgIHJldHVybiBhcnJheUxhc3QodGFyZ2V0cykgLSBjb250ZW50U2l6ZVxuICB9XG5cbiAgZnVuY3Rpb24gYnlJbmRleChpbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRWZWN0b3IuZ2V0KClcbiAgICBjb25zdCBkaXN0YW5jZSA9IHNob3J0Y3V0KGRpZmZUb1NuYXAsIGRpcmVjdGlvbilcbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuICB9XG5cbiAgZnVuY3Rpb24gYnlEaXN0YW5jZShkaXN0YW5jZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0VmVjdG9yLmdldCgpICsgZGlzdGFuY2VcbiAgICBjb25zdCB7IGluZGV4LCBkaXN0YW5jZTogdGFyZ2V0U25hcERpc3RhbmNlIH0gPSBmaW5kVGFyZ2V0U25hcCh0YXJnZXQpXG4gICAgY29uc3QgcmVhY2hlZEJvdW5kID0gIWxvb3AgJiYgcmVhY2hlZEFueSh0YXJnZXQpXG5cbiAgICBpZiAoIXNuYXAgfHwgcmVhY2hlZEJvdW5kKSByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuXG4gICAgY29uc3QgZGlmZlRvU25hcCA9IHNjcm9sbFNuYXBzW2luZGV4XSAtIHRhcmdldFNuYXBEaXN0YW5jZVxuICAgIGNvbnN0IHNuYXBEaXN0YW5jZSA9IGRpc3RhbmNlICsgc2hvcnRjdXQoZGlmZlRvU25hcCwgMClcblxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZTogc25hcERpc3RhbmNlIH1cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRhcmdldFR5cGUgPSB7XG4gICAgYnlEaXN0YW5jZSxcbiAgICBieUluZGV4LFxuICAgIHNob3J0Y3V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUsIFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRvVHlwZSA9IHtcbiAgZGlzdGFuY2U6IChuOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IHZvaWRcbiAgaW5kZXg6IChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxUbyhcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgaW5kZXhDdXJyZW50OiBDb3VudGVyVHlwZSxcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIHRhcmdldFZlY3RvcjogVmVjdG9yMURUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IFNjcm9sbFRvVHlwZSB7XG4gIGZ1bmN0aW9uIHNjcm9sbFRvKHRhcmdldDogVGFyZ2V0VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGRpc3RhbmNlRGlmZiA9IHRhcmdldC5kaXN0YW5jZVxuICAgIGNvbnN0IGluZGV4RGlmZiA9IHRhcmdldC5pbmRleCAhPT0gaW5kZXhDdXJyZW50LmdldCgpXG5cbiAgICB0YXJnZXRWZWN0b3IuYWRkKGRpc3RhbmNlRGlmZilcblxuICAgIGlmIChkaXN0YW5jZURpZmYpIHtcbiAgICAgIGlmIChzY3JvbGxCb2R5LmR1cmF0aW9uKCkpIHtcbiAgICAgICAgYW5pbWF0aW9uLnN0YXJ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgICBhbmltYXRpb24ucmVuZGVyKDEpXG4gICAgICAgIGFuaW1hdGlvbi51cGRhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmRleERpZmYpIHtcbiAgICAgIGluZGV4UHJldmlvdXMuc2V0KGluZGV4Q3VycmVudC5nZXQoKSlcbiAgICAgIGluZGV4Q3VycmVudC5zZXQodGFyZ2V0LmluZGV4KVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NlbGVjdCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzdGFuY2UobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2Uobiwgc25hcClcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBmdW5jdGlvbiBpbmRleChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleEN1cnJlbnQuY2xvbmUoKS5zZXQobilcbiAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxUYXJnZXQuYnlJbmRleCh0YXJnZXRJbmRleC5nZXQoKSwgZGlyZWN0aW9uKVxuICAgIHNjcm9sbFRvKHRhcmdldClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRvVHlwZSA9IHtcbiAgICBkaXN0YW5jZSxcbiAgICBpbmRleFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgU2xpZGVSZWdpc3RyeVR5cGUgfSBmcm9tICcuL1NsaWRlUmVnaXN0cnknXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBGb2N1c0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBGb2N1c0V2ZW50XG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIEZvY3VzSGFuZGxlck9wdGlvblR5cGUgPSBib29sZWFuIHwgRm9jdXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlRm9jdXNUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZUZvY3VzKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddLFxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgZXZlbnRTdG9yZTogRXZlbnRTdG9yZVR5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hGb2N1czogRm9jdXNIYW5kbGVyT3B0aW9uVHlwZVxuKTogU2xpZGVGb2N1c1R5cGUge1xuICBjb25zdCBmb2N1c0xpc3RlbmVyT3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZSB9XG4gIGxldCBsYXN0VGFiUHJlc3NUaW1lID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaEZvY3VzKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjb25zdCBub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIGNvbnN0IGRpZmZUaW1lID0gbm93VGltZSAtIGxhc3RUYWJQcmVzc1RpbWVcblxuICAgICAgaWYgKGRpZmZUaW1lID4gMTApIHJldHVyblxuXG4gICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVGb2N1c1N0YXJ0JylcbiAgICAgIHJvb3Quc2Nyb2xsTGVmdCA9IDBcblxuICAgICAgY29uc3QgZ3JvdXAgPSBzbGlkZVJlZ2lzdHJ5LmZpbmRJbmRleCgoZ3JvdXApID0+IGdyb3VwLmluY2x1ZGVzKGluZGV4KSlcblxuICAgICAgaWYgKCFpc051bWJlcihncm91cCkpIHJldHVyblxuXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDApXG4gICAgICBzY3JvbGxUby5pbmRleChncm91cCwgMClcblxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXMnKVxuICAgIH1cblxuICAgIGV2ZW50U3RvcmUuYWRkKGRvY3VtZW50LCAna2V5ZG93bicsIHJlZ2lzdGVyVGFiUHJlc3MsIGZhbHNlKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBldmVudFN0b3JlLmFkZChcbiAgICAgICAgc2xpZGUsXG4gICAgICAgICdmb2N1cycsXG4gICAgICAgIChldnQ6IEZvY3VzRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoaXNCb29sZWFuKHdhdGNoRm9jdXMpIHx8IHdhdGNoRm9jdXMoZW1ibGFBcGksIGV2dCkpIHtcbiAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjayhzbGlkZUluZGV4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNMaXN0ZW5lck9wdGlvbnNcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJUYWJQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5jb2RlID09PSAnVGFiJykgbGFzdFRhYlByZXNzVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgICBpbml0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVmVjdG9yMURUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpID0+IHZvaWRcbiAgYWRkOiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIHN1YnRyYWN0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWZWN0b3IxRChpbml0aWFsVmFsdWU6IG51bWJlcik6IFZlY3RvcjFEVHlwZSB7XG4gIGxldCB2YWx1ZSA9IGluaXRpYWxWYWx1ZVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlID0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSArPSBub3JtYWxpemVJbnB1dChuKVxuICB9XG5cbiAgZnVuY3Rpb24gc3VidHJhY3QobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgLT0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUlucHV0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG4pID8gbiA6IG4uZ2V0KClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFZlY3RvcjFEVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBzdWJ0cmFjdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IHJvdW5kVG9Ud29EZWNpbWFscyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRyYW5zbGF0ZVR5cGUgPSB7XG4gIGNsZWFyOiAoKSA9PiB2b2lkXG4gIHRvOiAodGFyZ2V0OiBudW1iZXIpID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGUoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50XG4pOiBUcmFuc2xhdGVUeXBlIHtcbiAgY29uc3QgdHJhbnNsYXRlID0gYXhpcy5zY3JvbGwgPT09ICd4JyA/IHggOiB5XG4gIGNvbnN0IGNvbnRhaW5lclN0eWxlID0gY29udGFpbmVyLnN0eWxlXG4gIGxldCBwcmV2aW91c1RhcmdldDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiB4KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgke259cHgsMHB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB5KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgwcHgsJHtufXB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB0byh0YXJnZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuXG5cbiAgICBjb25zdCBuZXdUYXJnZXQgPSByb3VuZFRvVHdvRGVjaW1hbHMoYXhpcy5kaXJlY3Rpb24odGFyZ2V0KSlcbiAgICBpZiAobmV3VGFyZ2V0ID09PSBwcmV2aW91c1RhcmdldCkgcmV0dXJuXG5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2xhdGUobmV3VGFyZ2V0KVxuICAgIHByZXZpb3VzVGFyZ2V0ID0gbmV3VGFyZ2V0XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuICAgIGNvbnRhaW5lclN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgaWYgKCFjb250YWluZXIuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gIH1cblxuICBjb25zdCBzZWxmOiBUcmFuc2xhdGVUeXBlID0ge1xuICAgIGNsZWFyLFxuICAgIHRvLFxuICAgIHRvZ2dsZUFjdGl2ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGFycmF5S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRCwgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuXG50eXBlIFNsaWRlQm91bmRUeXBlID0ge1xuICBzdGFydDogbnVtYmVyXG4gIGVuZDogbnVtYmVyXG59XG5cbnR5cGUgTG9vcFBvaW50VHlwZSA9IHtcbiAgbG9vcFBvaW50OiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZVR5cGVcbiAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHRhcmdldDogKCkgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlTG9vcGVyVHlwZSA9IHtcbiAgY2FuTG9vcDogKCkgPT4gYm9vbGVhblxuICBjbGVhcjogKCkgPT4gdm9pZFxuICBsb29wOiAoKSA9PiB2b2lkXG4gIGxvb3BQb2ludHM6IExvb3BQb2ludFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVMb29wZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzbGlkZVNpemVzOiBudW1iZXJbXSxcbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXSxcbiAgc25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXVxuKTogU2xpZGVMb29wZXJUeXBlIHtcbiAgY29uc3Qgcm91bmRpbmdTYWZldHkgPSAwLjVcbiAgY29uc3QgYXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKVxuICBjb25zdCBkZXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKS5yZXZlcnNlKClcbiAgY29uc3QgbG9vcFBvaW50cyA9IHN0YXJ0UG9pbnRzKCkuY29uY2F0KGVuZFBvaW50cygpKVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVNsaWRlU2l6ZXMoaW5kZXhlczogbnVtYmVyW10sIGZyb206IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXIsIGkpID0+IHtcbiAgICAgIHJldHVybiBhIC0gc2xpZGVTaXplc1dpdGhHYXBzW2ldXG4gICAgfSwgZnJvbSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luR2FwKGluZGV4ZXM6IG51bWJlcltdLCBnYXA6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gaW5kZXhlcy5yZWR1Y2UoKGE6IG51bWJlcltdLCBpKSA9PiB7XG4gICAgICBjb25zdCByZW1haW5pbmdHYXAgPSByZW1vdmVTbGlkZVNpemVzKGEsIGdhcClcbiAgICAgIHJldHVybiByZW1haW5pbmdHYXAgPiAwID8gYS5jb25jYXQoW2ldKSA6IGFcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRTbGlkZUJvdW5kcyhvZmZzZXQ6IG51bWJlcik6IFNsaWRlQm91bmRUeXBlW10ge1xuICAgIHJldHVybiBzbmFwcy5tYXAoKHNuYXAsIGluZGV4KSA9PiAoe1xuICAgICAgc3RhcnQ6IHNuYXAgLSBzbGlkZVNpemVzW2luZGV4XSArIHJvdW5kaW5nU2FmZXR5ICsgb2Zmc2V0LFxuICAgICAgZW5kOiBzbmFwICsgdmlld1NpemUgLSByb3VuZGluZ1NhZmV0eSArIG9mZnNldFxuICAgIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZExvb3BQb2ludHMoXG4gICAgaW5kZXhlczogbnVtYmVyW10sXG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgaXNFbmRFZGdlOiBib29sZWFuXG4gICk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3Qgc2xpZGVCb3VuZHMgPSBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0KVxuXG4gICAgcmV0dXJuIGluZGV4ZXMubWFwKChpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW5pdGlhbCA9IGlzRW5kRWRnZSA/IDAgOiAtY29udGVudFNpemVcbiAgICAgIGNvbnN0IGFsdGVyZWQgPSBpc0VuZEVkZ2UgPyBjb250ZW50U2l6ZSA6IDBcbiAgICAgIGNvbnN0IGJvdW5kRWRnZSA9IGlzRW5kRWRnZSA/ICdlbmQnIDogJ3N0YXJ0J1xuICAgICAgY29uc3QgbG9vcFBvaW50ID0gc2xpZGVCb3VuZHNbaW5kZXhdW2JvdW5kRWRnZV1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGxvb3BQb2ludCxcbiAgICAgICAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMUQoLTEpLFxuICAgICAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBzbGlkZXNbaW5kZXhdKSxcbiAgICAgICAgdGFyZ2V0OiAoKSA9PiAobG9jYXRpb24uZ2V0KCkgPiBsb29wUG9pbnQgPyBpbml0aWFsIDogYWx0ZXJlZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRQb2ludHMoKTogTG9vcFBvaW50VHlwZVtdIHtcbiAgICBjb25zdCBnYXAgPSBzY3JvbGxTbmFwc1swXVxuICAgIGNvbnN0IGluZGV4ZXMgPSBzbGlkZXNJbkdhcChkZXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgY29udGVudFNpemUsIGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kUG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gdmlld1NpemUgLSBzY3JvbGxTbmFwc1swXSAtIDFcbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoYXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgLWNvbnRlbnRTaXplLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuTG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9vcFBvaW50cy5ldmVyeSgoeyBpbmRleCB9KSA9PiB7XG4gICAgICBjb25zdCBvdGhlckluZGV4ZXMgPSBhc2NJdGVtcy5maWx0ZXIoKGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgcmV0dXJuIHJlbW92ZVNsaWRlU2l6ZXMob3RoZXJJbmRleGVzLCB2aWV3U2l6ZSkgPD0gMC4xXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoKTogdm9pZCB7XG4gICAgbG9vcFBvaW50cy5mb3JFYWNoKChsb29wUG9pbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0LCB0cmFuc2xhdGUsIHNsaWRlTG9jYXRpb24gfSA9IGxvb3BQb2ludFxuICAgICAgY29uc3Qgc2hpZnRMb2NhdGlvbiA9IHRhcmdldCgpXG4gICAgICBpZiAoc2hpZnRMb2NhdGlvbiA9PT0gc2xpZGVMb2NhdGlvbi5nZXQoKSkgcmV0dXJuXG4gICAgICB0cmFuc2xhdGUudG8oc2hpZnRMb2NhdGlvbilcbiAgICAgIHNsaWRlTG9jYXRpb24uc2V0KHNoaWZ0TG9jYXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiBsb29wUG9pbnQudHJhbnNsYXRlLmNsZWFyKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUxvb3BlclR5cGUgPSB7XG4gICAgY2FuTG9vcCxcbiAgICBjbGVhcixcbiAgICBsb29wLFxuICAgIGxvb3BQb2ludHNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgbXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB3YXRjaFNsaWRlczogU2xpZGVzSGFuZGxlck9wdGlvblR5cGVcbik6IFNsaWRlc0hhbmRsZXJUeXBlIHtcbiAgbGV0IG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoU2xpZGVzKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0NoYW5nZWQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoU2xpZGVzKSB8fCB3YXRjaFNsaWRlcyhlbWJsYUFwaSwgbXV0YXRpb25zKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAobXV0YXRpb25PYnNlcnZlcikgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge1xuICBba2V5OiBudW1iZXJdOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlc0luVmlld09wdGlvbnNUeXBlID0gSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0Wyd0aHJlc2hvbGQnXVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdUeXBlID0ge1xuICBpbml0OiAoKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgZ2V0OiAoaW5WaWV3PzogYm9vbGVhbikgPT4gbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0luVmlldyhcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHRocmVzaG9sZDogU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGVcbik6IFNsaWRlc0luVmlld1R5cGUge1xuICBjb25zdCBpbnRlcnNlY3Rpb25FbnRyeU1hcDogSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge31cbiAgbGV0IGluVmlld0NhY2hlOiBudW1iZXJbXSB8IG51bGwgPSBudWxsXG4gIGxldCBub3RJblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICAgIGludGVyc2VjdGlvbkVudHJ5TWFwW2luZGV4XSA9IGVudHJ5XG4gICAgICAgIH0pXG5cbiAgICAgICAgaW5WaWV3Q2FjaGUgPSBudWxsXG4gICAgICAgIG5vdEluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVzSW5WaWV3JylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50LFxuICAgICAgICB0aHJlc2hvbGRcbiAgICAgIH1cbiAgICApXG5cbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoc2xpZGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIGludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3OiBib29sZWFuKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBvYmplY3RLZXlzKGludGVyc2VjdGlvbkVudHJ5TWFwKS5yZWR1Y2UoXG4gICAgICAobGlzdDogbnVtYmVyW10sIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChzbGlkZUluZGV4KVxuICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nIH0gPSBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF1cbiAgICAgICAgY29uc3QgaW5WaWV3TWF0Y2ggPSBpblZpZXcgJiYgaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgY29uc3Qgbm90SW5WaWV3TWF0Y2ggPSAhaW5WaWV3ICYmICFpc0ludGVyc2VjdGluZ1xuXG4gICAgICAgIGlmIChpblZpZXdNYXRjaCB8fCBub3RJblZpZXdNYXRjaCkgbGlzdC5wdXNoKGluZGV4KVxuICAgICAgICByZXR1cm4gbGlzdFxuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGluVmlldzogYm9vbGVhbiA9IHRydWUpOiBudW1iZXJbXSB7XG4gICAgaWYgKGluVmlldyAmJiBpblZpZXdDYWNoZSkgcmV0dXJuIGluVmlld0NhY2hlXG4gICAgaWYgKCFpblZpZXcgJiYgbm90SW5WaWV3Q2FjaGUpIHJldHVybiBub3RJblZpZXdDYWNoZVxuXG4gICAgY29uc3Qgc2xpZGVJbmRleGVzID0gY3JlYXRlSW5WaWV3TGlzdChpblZpZXcpXG5cbiAgICBpZiAoaW5WaWV3KSBpblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuICAgIGlmICghaW5WaWV3KSBub3RJblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIHNsaWRlSW5kZXhlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgZ2V0XG4gIH1cblxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IGFycmF5SXNMYXN0SW5kZXgsIGFycmF5TGFzdCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlU2l6ZXNUeXBlID0ge1xuICBzbGlkZVNpemVzOiBudW1iZXJbXVxuICBzbGlkZVNpemVzV2l0aEdhcHM6IG51bWJlcltdXG4gIHN0YXJ0R2FwOiBudW1iZXJcbiAgZW5kR2FwOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlU2l6ZXMoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIHJlYWRFZGdlR2FwOiBib29sZWFuLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogU2xpZGVTaXplc1R5cGUge1xuICBjb25zdCB7IG1lYXN1cmVTaXplLCBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3Qgd2l0aEVkZ2VHYXAgPSBzbGlkZVJlY3RzWzBdICYmIHJlYWRFZGdlR2FwXG4gIGNvbnN0IHN0YXJ0R2FwID0gbWVhc3VyZVN0YXJ0R2FwKClcbiAgY29uc3QgZW5kR2FwID0gbWVhc3VyZUVuZEdhcCgpXG4gIGNvbnN0IHNsaWRlU2l6ZXMgPSBzbGlkZVJlY3RzLm1hcChtZWFzdXJlU2l6ZSlcbiAgY29uc3Qgc2xpZGVTaXplc1dpdGhHYXBzID0gbWVhc3VyZVdpdGhHYXBzKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU3RhcnRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHNsaWRlUmVjdCA9IHNsaWRlUmVjdHNbMF1cbiAgICByZXR1cm4gbWF0aEFicyhjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3Rbc3RhcnRFZGdlXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVFbmRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhcnJheUxhc3Qoc2xpZGVzKSlcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGBtYXJnaW4tJHtlbmRFZGdlfWApKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZVdpdGhHYXBzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCwgaW5kZXgsIHJlY3RzKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChyZWN0cywgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBzdGFydEdhcFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBlbmRHYXBcbiAgICAgICAgcmV0dXJuIHJlY3RzW2luZGV4ICsgMV1bc3RhcnRFZGdlXSAtIHJlY3Rbc3RhcnRFZGdlXVxuICAgICAgfSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlU2l6ZXNUeXBlID0ge1xuICAgIHNsaWRlU2l6ZXMsXG4gICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHtcbiAgYXJyYXlLZXlzLFxuICBhcnJheUxhc3QsXG4gIGFycmF5TGFzdEluZGV4LFxuICBpc051bWJlcixcbiAgbWF0aEFic1xufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUgPSAnYXV0bycgfCBudW1iZXJcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxUeXBlID0ge1xuICBncm91cFNsaWRlczogPFR5cGU+KGFycmF5OiBUeXBlW10pID0+IFR5cGVbXVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNUb1Njcm9sbChcbiAgYXhpczogQXhpc1R5cGUsXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUsXG4gIGxvb3A6IGJvb2xlYW4sXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZSxcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW10sXG4gIHN0YXJ0R2FwOiBudW1iZXIsXG4gIGVuZEdhcDogbnVtYmVyLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTbGlkZXNUb1Njcm9sbFR5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSwgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGdyb3VwQnlOdW1iZXIgPSBpc051bWJlcihzbGlkZXNUb1Njcm9sbClcblxuICBmdW5jdGlvbiBieU51bWJlcjxUeXBlPihhcnJheTogVHlwZVtdLCBncm91cFNpemU6IG51bWJlcik6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gYXJyYXlLZXlzKGFycmF5KVxuICAgICAgLmZpbHRlcigoaSkgPT4gaSAlIGdyb3VwU2l6ZSA9PT0gMClcbiAgICAgIC5tYXAoKGkpID0+IGFycmF5LnNsaWNlKGksIGkgKyBncm91cFNpemUpKVxuICB9XG5cbiAgZnVuY3Rpb24gYnlTaXplPFR5cGU+KGFycmF5OiBUeXBlW10pOiBUeXBlW11bXSB7XG4gICAgaWYgKCFhcnJheS5sZW5ndGgpIHJldHVybiBbXVxuXG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5yZWR1Y2UoKGdyb3VwczogbnVtYmVyW10sIHJlY3RCLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0QSA9IGFycmF5TGFzdChncm91cHMpIHx8IDBcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9IHJlY3RBID09PSAwXG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IHJlY3RCID09PSBhcnJheUxhc3RJbmRleChhcnJheSlcblxuICAgICAgICBjb25zdCBlZGdlQSA9IGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHNsaWRlUmVjdHNbcmVjdEFdW3N0YXJ0RWRnZV1cbiAgICAgICAgY29uc3QgZWRnZUIgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RCXVtlbmRFZGdlXVxuICAgICAgICBjb25zdCBnYXBBID0gIWxvb3AgJiYgaXNGaXJzdCA/IGRpcmVjdGlvbihzdGFydEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGdhcEIgPSAhbG9vcCAmJiBpc0xhc3QgPyBkaXJlY3Rpb24oZW5kR2FwKSA6IDBcbiAgICAgICAgY29uc3QgY2h1bmtTaXplID0gbWF0aEFicyhlZGdlQiAtIGdhcEIgLSAoZWRnZUEgKyBnYXBBKSlcblxuICAgICAgICBpZiAoaW5kZXggJiYgY2h1bmtTaXplID4gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgZ3JvdXBzLnB1c2gocmVjdEIpXG4gICAgICAgIGlmIChpc0xhc3QpIGdyb3Vwcy5wdXNoKGFycmF5Lmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3Vwc1xuICAgICAgfSwgW10pXG4gICAgICAubWFwKChjdXJyZW50U2l6ZSwgaW5kZXgsIGdyb3VwcykgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NpemUgPSBNYXRoLm1heChncm91cHNbaW5kZXggLSAxXSB8fCAwKVxuICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UocHJldmlvdXNTaXplLCBjdXJyZW50U2l6ZSlcbiAgICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBncm91cFNsaWRlczxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIHJldHVybiBncm91cEJ5TnVtYmVyID8gYnlOdW1iZXIoYXJyYXksIHNsaWRlc1RvU2Nyb2xsKSA6IGJ5U2l6ZShhcnJheSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgICBncm91cFNsaWRlc1xuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnQgfSBmcm9tICcuL0FsaWdubWVudCdcbmltcG9ydCB7XG4gIEFuaW1hdGlvbnMsXG4gIEFuaW1hdGlvbnNUeXBlLFxuICBBbmltYXRpb25zVXBkYXRlVHlwZSxcbiAgQW5pbWF0aW9uc1JlbmRlclR5cGVcbn0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQXhpcywgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBDb3VudGVyLCBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IERyYWdIYW5kbGVyLCBEcmFnSGFuZGxlclR5cGUgfSBmcm9tICcuL0RyYWdIYW5kbGVyJ1xuaW1wb3J0IHsgRHJhZ1RyYWNrZXIgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSwgRXZlbnRTdG9yZVR5cGUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlLCBOb2RlUmVjdHMgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IE9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlldywgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5pbXBvcnQgeyBSZXNpemVIYW5kbGVyLCBSZXNpemVIYW5kbGVyVHlwZSB9IGZyb20gJy4vUmVzaXplSGFuZGxlcidcbmltcG9ydCB7IFNjcm9sbEJvZHksIFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsQm91bmRzLCBTY3JvbGxCb3VuZHNUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb3VuZHMnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgU2Nyb2xsTGltaXQgfSBmcm9tICcuL1Njcm9sbExpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsTG9vcGVyLCBTY3JvbGxMb29wZXJUeXBlIH0gZnJvbSAnLi9TY3JvbGxMb29wZXInXG5pbXBvcnQgeyBTY3JvbGxQcm9ncmVzcywgU2Nyb2xsUHJvZ3Jlc3NUeXBlIH0gZnJvbSAnLi9TY3JvbGxQcm9ncmVzcydcbmltcG9ydCB7IFNjcm9sbFNuYXBzIH0gZnJvbSAnLi9TY3JvbGxTbmFwcydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnksIFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgU2Nyb2xsVGFyZ2V0LCBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUbywgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlRm9jdXMsIFNsaWRlRm9jdXNUeXBlIH0gZnJvbSAnLi9TbGlkZUZvY3VzJ1xuaW1wb3J0IHsgU2xpZGVMb29wZXIsIFNsaWRlTG9vcGVyVHlwZSB9IGZyb20gJy4vU2xpZGVMb29wZXInXG5pbXBvcnQgeyBTbGlkZXNIYW5kbGVyLCBTbGlkZXNIYW5kbGVyVHlwZSB9IGZyb20gJy4vU2xpZGVzSGFuZGxlcidcbmltcG9ydCB7IFNsaWRlc0luVmlldywgU2xpZGVzSW5WaWV3VHlwZSB9IGZyb20gJy4vU2xpZGVzSW5WaWV3J1xuaW1wb3J0IHsgU2xpZGVTaXplcyB9IGZyb20gJy4vU2xpZGVTaXplcydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsLCBTbGlkZXNUb1Njcm9sbFR5cGUgfSBmcm9tICcuL1NsaWRlc1RvU2Nyb2xsJ1xuaW1wb3J0IHsgVHJhbnNsYXRlLCBUcmFuc2xhdGVUeXBlIH0gZnJvbSAnLi9UcmFuc2xhdGUnXG5pbXBvcnQgeyBhcnJheUtleXMsIGFycmF5TGFzdCwgYXJyYXlMYXN0SW5kZXgsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIEVuZ2luZVR5cGUgPSB7XG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50XG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuICBheGlzOiBBeGlzVHlwZVxuICBhbmltYXRpb246IEFuaW1hdGlvbnNUeXBlXG4gIHNjcm9sbEJvdW5kczogU2Nyb2xsQm91bmRzVHlwZVxuICBzY3JvbGxMb29wZXI6IFNjcm9sbExvb3BlclR5cGVcbiAgc2Nyb2xsUHJvZ3Jlc3M6IFNjcm9sbFByb2dyZXNzVHlwZVxuICBpbmRleDogQ291bnRlclR5cGVcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGVcbiAgbGltaXQ6IExpbWl0VHlwZVxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIG9mZnNldExvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgcHJldmlvdXNMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlXG4gIHBlcmNlbnRPZlZpZXc6IFBlcmNlbnRPZlZpZXdUeXBlXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlXG4gIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlclR5cGVcbiAgZXZlbnRTdG9yZTogRXZlbnRTdG9yZVR5cGVcbiAgc2xpZGVMb29wZXI6IFNsaWRlTG9vcGVyVHlwZVxuICBzbGlkZXNJblZpZXc6IFNsaWRlc0luVmlld1R5cGVcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZVxuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZVR5cGVcbiAgcmVzaXplSGFuZGxlcjogUmVzaXplSGFuZGxlclR5cGVcbiAgc2xpZGVzSGFuZGxlcjogU2xpZGVzSGFuZGxlclR5cGVcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZVxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGVcbiAgc2Nyb2xsU25hcExpc3Q6IG51bWJlcltdXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXVxuICBzbGlkZUluZGV4ZXM6IG51bWJlcltdXG4gIHNsaWRlRm9jdXM6IFNsaWRlRm9jdXNUeXBlXG4gIHNsaWRlUmVnaXN0cnk6IFNsaWRlUmVnaXN0cnlUeXBlWydzbGlkZVJlZ2lzdHJ5J11cbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbmdpbmUoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgb3B0aW9uczogT3B0aW9uc1R5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuKTogRW5naW5lVHlwZSB7XG4gIC8vIE9wdGlvbnNcbiAgY29uc3Qge1xuICAgIGFsaWduLFxuICAgIGF4aXM6IHNjcm9sbEF4aXMsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0YXJ0SW5kZXgsXG4gICAgbG9vcCxcbiAgICBkdXJhdGlvbixcbiAgICBkcmFnRnJlZSxcbiAgICBkcmFnVGhyZXNob2xkLFxuICAgIGluVmlld1RocmVzaG9sZCxcbiAgICBzbGlkZXNUb1Njcm9sbDogZ3JvdXBTbGlkZXMsXG4gICAgc2tpcFNuYXBzLFxuICAgIGNvbnRhaW5TY3JvbGwsXG4gICAgd2F0Y2hSZXNpemUsXG4gICAgd2F0Y2hTbGlkZXMsXG4gICAgd2F0Y2hEcmFnLFxuICAgIHdhdGNoRm9jdXNcbiAgfSA9IG9wdGlvbnNcblxuICAvLyBNZWFzdXJlbWVudHNcbiAgY29uc3QgcGl4ZWxUb2xlcmFuY2UgPSAyXG4gIGNvbnN0IG5vZGVSZWN0cyA9IE5vZGVSZWN0cygpXG4gIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBub2RlUmVjdHMubWVhc3VyZShjb250YWluZXIpXG4gIGNvbnN0IHNsaWRlUmVjdHMgPSBzbGlkZXMubWFwKG5vZGVSZWN0cy5tZWFzdXJlKVxuICBjb25zdCBheGlzID0gQXhpcyhzY3JvbGxBeGlzLCBkaXJlY3Rpb24pXG4gIGNvbnN0IHZpZXdTaXplID0gYXhpcy5tZWFzdXJlU2l6ZShjb250YWluZXJSZWN0KVxuICBjb25zdCBwZXJjZW50T2ZWaWV3ID0gUGVyY2VudE9mVmlldyh2aWV3U2l6ZSlcbiAgY29uc3QgYWxpZ25tZW50ID0gQWxpZ25tZW50KGFsaWduLCB2aWV3U2l6ZSlcbiAgY29uc3QgY29udGFpblNuYXBzID0gIWxvb3AgJiYgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHJlYWRFZGdlR2FwID0gbG9vcCB8fCAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgeyBzbGlkZVNpemVzLCBzbGlkZVNpemVzV2l0aEdhcHMsIHN0YXJ0R2FwLCBlbmRHYXAgfSA9IFNsaWRlU2l6ZXMoXG4gICAgYXhpcyxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzLFxuICAgIHJlYWRFZGdlR2FwLFxuICAgIG93bmVyV2luZG93XG4gIClcbiAgY29uc3Qgc2xpZGVzVG9TY3JvbGwgPSBTbGlkZXNUb1Njcm9sbChcbiAgICBheGlzLFxuICAgIHZpZXdTaXplLFxuICAgIGdyb3VwU2xpZGVzLFxuICAgIGxvb3AsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHsgc25hcHMsIHNuYXBzQWxpZ25lZCB9ID0gU2Nyb2xsU25hcHMoXG4gICAgYXhpcyxcbiAgICBhbGlnbm1lbnQsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlc1RvU2Nyb2xsXG4gIClcbiAgY29uc3QgY29udGVudFNpemUgPSAtYXJyYXlMYXN0KHNuYXBzKSArIGFycmF5TGFzdChzbGlkZVNpemVzV2l0aEdhcHMpXG4gIGNvbnN0IHsgc25hcHNDb250YWluZWQsIHNjcm9sbENvbnRhaW5MaW1pdCB9ID0gU2Nyb2xsQ29udGFpbihcbiAgICB2aWV3U2l6ZSxcbiAgICBjb250ZW50U2l6ZSxcbiAgICBzbmFwc0FsaWduZWQsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gY29udGFpblNuYXBzID8gc25hcHNDb250YWluZWQgOiBzbmFwc0FsaWduZWRcbiAgY29uc3QgeyBsaW1pdCB9ID0gU2Nyb2xsTGltaXQoY29udGVudFNpemUsIHNjcm9sbFNuYXBzLCBsb29wKVxuXG4gIC8vIEluZGV4ZXNcbiAgY29uc3QgaW5kZXggPSBDb3VudGVyKGFycmF5TGFzdEluZGV4KHNjcm9sbFNuYXBzKSwgc3RhcnRJbmRleCwgbG9vcClcbiAgY29uc3QgaW5kZXhQcmV2aW91cyA9IGluZGV4LmNsb25lKClcbiAgY29uc3Qgc2xpZGVJbmRleGVzID0gYXJyYXlLZXlzKHNsaWRlcylcblxuICAvLyBBbmltYXRpb25cbiAgY29uc3QgdXBkYXRlOiBBbmltYXRpb25zVXBkYXRlVHlwZSA9ICh7XG4gICAgZHJhZ0hhbmRsZXIsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHMsXG4gICAgb3B0aW9uczogeyBsb29wIH1cbiAgfSkgPT4ge1xuICAgIGlmICghbG9vcCkgc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihkcmFnSGFuZGxlci5wb2ludGVyRG93bigpKVxuICAgIHNjcm9sbEJvZHkuc2VlaygpXG4gIH1cblxuICBjb25zdCByZW5kZXI6IEFuaW1hdGlvbnNSZW5kZXJUeXBlID0gKFxuICAgIHtcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICB0cmFuc2xhdGUsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICAgIHNjcm9sbExvb3BlcixcbiAgICAgIHNsaWRlTG9vcGVyLFxuICAgICAgZHJhZ0hhbmRsZXIsXG4gICAgICBhbmltYXRpb24sXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBzY3JvbGxCb3VuZHMsXG4gICAgICBvcHRpb25zOiB7IGxvb3AgfVxuICAgIH0sXG4gICAgYWxwaGFcbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkU2V0dGxlID0gc2Nyb2xsQm9keS5zZXR0bGVkKClcbiAgICBjb25zdCB3aXRoaW5Cb3VuZHMgPSAhc2Nyb2xsQm91bmRzLnNob3VsZENvbnN0cmFpbigpXG4gICAgY29uc3QgaGFzU2V0dGxlZCA9IGxvb3AgPyBzaG91bGRTZXR0bGUgOiBzaG91bGRTZXR0bGUgJiYgd2l0aGluQm91bmRzXG4gICAgY29uc3QgaGFzU2V0dGxlZEFuZElkbGUgPSBoYXNTZXR0bGVkICYmICFkcmFnSGFuZGxlci5wb2ludGVyRG93bigpXG5cbiAgICBpZiAoaGFzU2V0dGxlZEFuZElkbGUpIGFuaW1hdGlvbi5zdG9wKClcblxuICAgIGNvbnN0IGludGVycG9sYXRlZExvY2F0aW9uID1cbiAgICAgIGxvY2F0aW9uLmdldCgpICogYWxwaGEgKyBwcmV2aW91c0xvY2F0aW9uLmdldCgpICogKDEgLSBhbHBoYSlcblxuICAgIG9mZnNldExvY2F0aW9uLnNldChpbnRlcnBvbGF0ZWRMb2NhdGlvbilcblxuICAgIGlmIChsb29wKSB7XG4gICAgICBzY3JvbGxMb29wZXIubG9vcChzY3JvbGxCb2R5LmRpcmVjdGlvbigpKVxuICAgICAgc2xpZGVMb29wZXIubG9vcCgpXG4gICAgfVxuXG4gICAgdHJhbnNsYXRlLnRvKG9mZnNldExvY2F0aW9uLmdldCgpKVxuXG4gICAgaWYgKGhhc1NldHRsZWRBbmRJZGxlKSBldmVudEhhbmRsZXIuZW1pdCgnc2V0dGxlJylcbiAgICBpZiAoIWhhc1NldHRsZWQpIGV2ZW50SGFuZGxlci5lbWl0KCdzY3JvbGwnKVxuICB9XG5cbiAgY29uc3QgYW5pbWF0aW9uID0gQW5pbWF0aW9ucyhcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyV2luZG93LFxuICAgICgpID0+IHVwZGF0ZShlbmdpbmUpLFxuICAgIChhbHBoYTogbnVtYmVyKSA9PiByZW5kZXIoZW5naW5lLCBhbHBoYSlcbiAgKVxuXG4gIC8vIFNoYXJlZFxuICBjb25zdCBmcmljdGlvbiA9IDAuNjhcbiAgY29uc3Qgc3RhcnRMb2NhdGlvbiA9IHNjcm9sbFNuYXBzW2luZGV4LmdldCgpXVxuICBjb25zdCBsb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHByZXZpb3VzTG9jYXRpb24gPSBWZWN0b3IxRChzdGFydExvY2F0aW9uKVxuICBjb25zdCBvZmZzZXRMb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHRhcmdldCA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHNjcm9sbEJvZHkgPSBTY3JvbGxCb2R5KFxuICAgIGxvY2F0aW9uLFxuICAgIG9mZnNldExvY2F0aW9uLFxuICAgIHByZXZpb3VzTG9jYXRpb24sXG4gICAgdGFyZ2V0LFxuICAgIGR1cmF0aW9uLFxuICAgIGZyaWN0aW9uXG4gIClcbiAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gU2Nyb2xsVGFyZ2V0KFxuICAgIGxvb3AsXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgY29udGVudFNpemUsXG4gICAgbGltaXQsXG4gICAgdGFyZ2V0XG4gIClcbiAgY29uc3Qgc2Nyb2xsVG8gPSBTY3JvbGxUbyhcbiAgICBhbmltYXRpb24sXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICB0YXJnZXQsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcbiAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBTY3JvbGxQcm9ncmVzcyhsaW1pdClcbiAgY29uc3QgZXZlbnRTdG9yZSA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBzbGlkZXNJblZpZXcgPSBTbGlkZXNJblZpZXcoXG4gICAgY29udGFpbmVyLFxuICAgIHNsaWRlcyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgaW5WaWV3VGhyZXNob2xkXG4gIClcbiAgY29uc3QgeyBzbGlkZVJlZ2lzdHJ5IH0gPSBTbGlkZVJlZ2lzdHJ5KFxuICAgIGNvbnRhaW5TbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdCxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICBzbGlkZUluZGV4ZXNcbiAgKVxuICBjb25zdCBzbGlkZUZvY3VzID0gU2xpZGVGb2N1cyhcbiAgICByb290LFxuICAgIHNsaWRlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNjcm9sbFRvLFxuICAgIHNjcm9sbEJvZHksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgd2F0Y2hGb2N1c1xuICApXG5cbiAgLy8gRW5naW5lXG4gIGNvbnN0IGVuZ2luZTogRW5naW5lVHlwZSA9IHtcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyV2luZG93LFxuICAgIGV2ZW50SGFuZGxlcixcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgYW5pbWF0aW9uLFxuICAgIGF4aXMsXG4gICAgZHJhZ0hhbmRsZXI6IERyYWdIYW5kbGVyKFxuICAgICAgYXhpcyxcbiAgICAgIHJvb3QsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICB0YXJnZXQsXG4gICAgICBEcmFnVHJhY2tlcihheGlzLCBvd25lcldpbmRvdyksXG4gICAgICBsb2NhdGlvbixcbiAgICAgIGFuaW1hdGlvbixcbiAgICAgIHNjcm9sbFRvLFxuICAgICAgc2Nyb2xsQm9keSxcbiAgICAgIHNjcm9sbFRhcmdldCxcbiAgICAgIGluZGV4LFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgcGVyY2VudE9mVmlldyxcbiAgICAgIGRyYWdGcmVlLFxuICAgICAgZHJhZ1RocmVzaG9sZCxcbiAgICAgIHNraXBTbmFwcyxcbiAgICAgIGZyaWN0aW9uLFxuICAgICAgd2F0Y2hEcmFnXG4gICAgKSxcbiAgICBldmVudFN0b3JlLFxuICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBsaW1pdCxcbiAgICBsb2NhdGlvbixcbiAgICBvZmZzZXRMb2NhdGlvbixcbiAgICBwcmV2aW91c0xvY2F0aW9uLFxuICAgIG9wdGlvbnMsXG4gICAgcmVzaXplSGFuZGxlcjogUmVzaXplSGFuZGxlcihcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgc2xpZGVzLFxuICAgICAgYXhpcyxcbiAgICAgIHdhdGNoUmVzaXplLFxuICAgICAgbm9kZVJlY3RzXG4gICAgKSxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbEJvdW5kczogU2Nyb2xsQm91bmRzKFxuICAgICAgbGltaXQsXG4gICAgICBvZmZzZXRMb2NhdGlvbixcbiAgICAgIHRhcmdldCxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBwZXJjZW50T2ZWaWV3XG4gICAgKSxcbiAgICBzY3JvbGxMb29wZXI6IFNjcm9sbExvb3Blcihjb250ZW50U2l6ZSwgbGltaXQsIG9mZnNldExvY2F0aW9uLCBbXG4gICAgICBsb2NhdGlvbixcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgcHJldmlvdXNMb2NhdGlvbixcbiAgICAgIHRhcmdldFxuICAgIF0pLFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0OiBzY3JvbGxTbmFwcy5tYXAoc2Nyb2xsUHJvZ3Jlc3MuZ2V0KSxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgc2Nyb2xsVG8sXG4gICAgc2xpZGVMb29wZXI6IFNsaWRlTG9vcGVyKFxuICAgICAgYXhpcyxcbiAgICAgIHZpZXdTaXplLFxuICAgICAgY29udGVudFNpemUsXG4gICAgICBzbGlkZVNpemVzLFxuICAgICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgICAgc25hcHMsXG4gICAgICBzY3JvbGxTbmFwcyxcbiAgICAgIG9mZnNldExvY2F0aW9uLFxuICAgICAgc2xpZGVzXG4gICAgKSxcbiAgICBzbGlkZUZvY3VzLFxuICAgIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXIoY29udGFpbmVyLCBldmVudEhhbmRsZXIsIHdhdGNoU2xpZGVzKSxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVJbmRleGVzLFxuICAgIHNsaWRlUmVnaXN0cnksXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgdGFyZ2V0LFxuICAgIHRyYW5zbGF0ZTogVHJhbnNsYXRlKGF4aXMsIGNvbnRhaW5lcilcbiAgfVxuXG4gIHJldHVybiBlbmdpbmVcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuXG50eXBlIENhbGxiYWNrVHlwZSA9IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsIGV2dDogRW1ibGFFdmVudFR5cGUpID0+IHZvaWRcbnR5cGUgTGlzdGVuZXJzVHlwZSA9IFBhcnRpYWw8eyBba2V5IGluIEVtYmxhRXZlbnRUeXBlXTogQ2FsbGJhY2tUeXBlW10gfT5cblxuZXhwb3J0IHR5cGUgRW1ibGFFdmVudFR5cGUgPSBFbWJsYUV2ZW50TGlzdFR5cGVba2V5b2YgRW1ibGFFdmVudExpc3RUeXBlXVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYmxhRXZlbnRMaXN0VHlwZSB7XG4gIGluaXQ6ICdpbml0J1xuICBwb2ludGVyRG93bjogJ3BvaW50ZXJEb3duJ1xuICBwb2ludGVyVXA6ICdwb2ludGVyVXAnXG4gIHNsaWRlc0NoYW5nZWQ6ICdzbGlkZXNDaGFuZ2VkJ1xuICBzbGlkZXNJblZpZXc6ICdzbGlkZXNJblZpZXcnXG4gIHNjcm9sbDogJ3Njcm9sbCdcbiAgc2VsZWN0OiAnc2VsZWN0J1xuICBzZXR0bGU6ICdzZXR0bGUnXG4gIGRlc3Ryb3k6ICdkZXN0cm95J1xuICByZUluaXQ6ICdyZUluaXQnXG4gIHJlc2l6ZTogJ3Jlc2l6ZSdcbiAgc2xpZGVGb2N1c1N0YXJ0OiAnc2xpZGVGb2N1c1N0YXJ0J1xuICBzbGlkZUZvY3VzOiAnc2xpZGVGb2N1cydcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBlbWl0OiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBvbjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb2ZmOiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCk6IEV2ZW50SGFuZGxlclR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBMaXN0ZW5lcnNUeXBlID0ge31cbiAgbGV0IGFwaTogRW1ibGFDYXJvdXNlbFR5cGVcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGFwaSA9IGVtYmxhQXBpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IENhbGxiYWNrVHlwZVtdIHtcbiAgICByZXR1cm4gbGlzdGVuZXJzW2V2dF0gfHwgW11cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGdldExpc3RlbmVycyhldnQpLmZvckVhY2goKGUpID0+IGUoYXBpLCBldnQpKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBvbihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5jb25jYXQoW2NiXSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBsaXN0ZW5lcnNbZXZ0XSA9IGdldExpc3RlbmVycyhldnQpLmZpbHRlcigoZSkgPT4gZSAhPT0gY2IpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IHt9XG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudEhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZW1pdCxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTG9vc2VPcHRpb25zVHlwZSwgQ3JlYXRlT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBvYmplY3RLZXlzLCBvYmplY3RzTWVyZ2VEZWVwLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBPcHRpb25zVHlwZSA9IFBhcnRpYWw8Q3JlYXRlT3B0aW9uc1R5cGU8TG9vc2VPcHRpb25zVHlwZT4+XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNIYW5kbGVyVHlwZSA9IHtcbiAgbWVyZ2VPcHRpb25zOiA8VHlwZUEgZXh0ZW5kcyBPcHRpb25zVHlwZSwgVHlwZUIgZXh0ZW5kcyBPcHRpb25zVHlwZT4oXG4gICAgb3B0aW9uc0E6IFR5cGVBLFxuICAgIG9wdGlvbnNCPzogVHlwZUJcbiAgKSA9PiBUeXBlQVxuICBvcHRpb25zQXRNZWRpYTogPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSkgPT4gVHlwZVxuICBvcHRpb25zTWVkaWFRdWVyaWVzOiAob3B0aW9uc0xpc3Q6IE9wdGlvbnNUeXBlW10pID0+IE1lZGlhUXVlcnlMaXN0W11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbnNIYW5kbGVyKG93bmVyV2luZG93OiBXaW5kb3dUeXBlKTogT3B0aW9uc0hhbmRsZXJUeXBlIHtcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICk6IFR5cGVBIHtcbiAgICByZXR1cm4gPFR5cGVBPm9iamVjdHNNZXJnZURlZXAob3B0aW9uc0EsIG9wdGlvbnNCIHx8IHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc0F0TWVkaWE8VHlwZSBleHRlbmRzIE9wdGlvbnNUeXBlPihvcHRpb25zOiBUeXBlKTogVHlwZSB7XG4gICAgY29uc3Qgb3B0aW9uc0F0TWVkaWEgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9XG4gICAgY29uc3QgbWF0Y2hlZE1lZGlhT3B0aW9ucyA9IG9iamVjdEtleXMob3B0aW9uc0F0TWVkaWEpXG4gICAgICAuZmlsdGVyKChtZWRpYSkgPT4gb3duZXJXaW5kb3cubWF0Y2hNZWRpYShtZWRpYSkubWF0Y2hlcylcbiAgICAgIC5tYXAoKG1lZGlhKSA9PiBvcHRpb25zQXRNZWRpYVttZWRpYV0pXG4gICAgICAucmVkdWNlKChhLCBtZWRpYU9wdGlvbikgPT4gbWVyZ2VPcHRpb25zKGEsIG1lZGlhT3B0aW9uKSwge30pXG5cbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIG1hdGNoZWRNZWRpYU9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25zTWVkaWFRdWVyaWVzKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKTogTWVkaWFRdWVyeUxpc3RbXSB7XG4gICAgcmV0dXJuIG9wdGlvbnNMaXN0XG4gICAgICAubWFwKChvcHRpb25zKSA9PiBvYmplY3RLZXlzKG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge30pKVxuICAgICAgLnJlZHVjZSgoYWNjLCBtZWRpYVF1ZXJpZXMpID0+IGFjYy5jb25jYXQobWVkaWFRdWVyaWVzKSwgW10pXG4gICAgICAubWFwKG93bmVyV2luZG93Lm1hdGNoTWVkaWEpXG4gIH1cblxuICBjb25zdCBzZWxmOiBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gICAgbWVyZ2VPcHRpb25zLFxuICAgIG9wdGlvbnNBdE1lZGlhLFxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlclR5cGUgfSBmcm9tICcuL09wdGlvbnNIYW5kbGVyJ1xuaW1wb3J0IHsgRW1ibGFQbHVnaW5zVHlwZSwgRW1ibGFQbHVnaW5UeXBlIH0gZnJvbSAnLi9QbHVnaW5zJ1xuXG5leHBvcnQgdHlwZSBQbHVnaW5zSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChcbiAgICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgcGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW11cbiAgKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsdWdpbnNIYW5kbGVyKFxuICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4pOiBQbHVnaW5zSGFuZGxlclR5cGUge1xuICBsZXQgYWN0aXZlUGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBwbHVnaW5zLmZpbHRlcihcbiAgICAgICh7IG9wdGlvbnMgfSkgPT4gb3B0aW9uc0hhbmRsZXIub3B0aW9uc0F0TWVkaWEob3B0aW9ucykuYWN0aXZlICE9PSBmYWxzZVxuICAgIClcbiAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmluaXQoZW1ibGFBcGksIG9wdGlvbnNIYW5kbGVyKSlcblxuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZShcbiAgICAgIChtYXAsIHBsdWdpbikgPT4gT2JqZWN0LmFzc2lnbihtYXAsIHsgW3BsdWdpbi5uYW1lXTogcGx1Z2luIH0pLFxuICAgICAge31cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBhY3RpdmVQbHVnaW5zLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmUsIEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXIsIEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zLCBFbWJsYU9wdGlvbnNUeXBlLCBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IFBsdWdpbnNIYW5kbGVyIH0gZnJvbSAnLi9QbHVnaW5zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcbmltcG9ydCB7IGlzU3RyaW5nLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gIGNhblNjcm9sbE5leHQ6ICgpID0+IGJvb2xlYW5cbiAgY2FuU2Nyb2xsUHJldjogKCkgPT4gYm9vbGVhblxuICBjb250YWluZXJOb2RlOiAoKSA9PiBIVE1MRWxlbWVudFxuICBpbnRlcm5hbEVuZ2luZTogKCkgPT4gRW5naW5lVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIG9mZjogRXZlbnRIYW5kbGVyVHlwZVsnb2ZmJ11cbiAgb246IEV2ZW50SGFuZGxlclR5cGVbJ29uJ11cbiAgZW1pdDogRXZlbnRIYW5kbGVyVHlwZVsnZW1pdCddXG4gIHBsdWdpbnM6ICgpID0+IEVtYmxhUGx1Z2luc1R5cGVcbiAgcHJldmlvdXNTY3JvbGxTbmFwOiAoKSA9PiBudW1iZXJcbiAgcmVJbml0OiAob3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsIHBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXSkgPT4gdm9pZFxuICByb290Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgc2Nyb2xsTmV4dDogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNjcm9sbFByZXY6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcm9ncmVzczogKCkgPT4gbnVtYmVyXG4gIHNjcm9sbFNuYXBMaXN0OiAoKSA9PiBudW1iZXJbXVxuICBzY3JvbGxUbzogKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNlbGVjdGVkU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHNsaWRlTm9kZXM6ICgpID0+IEhUTUxFbGVtZW50W11cbiAgc2xpZGVzSW5WaWV3OiAoKSA9PiBudW1iZXJbXVxuICBzbGlkZXNOb3RJblZpZXc6ICgpID0+IG51bWJlcltdXG59XG5cbmZ1bmN0aW9uIEVtYmxhQ2Fyb3VzZWwoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICB1c2VyT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gIHVzZXJQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbik6IEVtYmxhQ2Fyb3VzZWxUeXBlIHtcbiAgY29uc3Qgb3duZXJEb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudFxuICBjb25zdCBvd25lcldpbmRvdyA9IDxXaW5kb3dUeXBlPm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgY29uc3Qgb3B0aW9uc0hhbmRsZXIgPSBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdylcbiAgY29uc3QgcGx1Z2luc0hhbmRsZXIgPSBQbHVnaW5zSGFuZGxlcihvcHRpb25zSGFuZGxlcilcbiAgY29uc3QgbWVkaWFIYW5kbGVycyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBldmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXIoKVxuICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEsIG9wdGlvbnNNZWRpYVF1ZXJpZXMgfSA9IG9wdGlvbnNIYW5kbGVyXG4gIGNvbnN0IHsgb24sIG9mZiwgZW1pdCB9ID0gZXZlbnRIYW5kbGVyXG4gIGNvbnN0IHJlSW5pdCA9IHJlQWN0aXZhdGVcblxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcbiAgbGV0IGVuZ2luZTogRW5naW5lVHlwZVxuICBsZXQgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIEVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucylcbiAgbGV0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UpXG4gIGxldCBwbHVnaW5MaXN0OiBFbWJsYVBsdWdpblR5cGVbXSA9IFtdXG4gIGxldCBwbHVnaW5BcGlzOiBFbWJsYVBsdWdpbnNUeXBlXG5cbiAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgbGV0IHNsaWRlczogSFRNTEVsZW1lbnRbXVxuXG4gIGZ1bmN0aW9uIHN0b3JlRWxlbWVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXI6IHVzZXJDb250YWluZXIsIHNsaWRlczogdXNlclNsaWRlcyB9ID0gb3B0aW9uc1xuXG4gICAgY29uc3QgY3VzdG9tQ29udGFpbmVyID0gaXNTdHJpbmcodXNlckNvbnRhaW5lcilcbiAgICAgID8gcm9vdC5xdWVyeVNlbGVjdG9yKHVzZXJDb250YWluZXIpXG4gICAgICA6IHVzZXJDb250YWluZXJcbiAgICBjb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+KGN1c3RvbUNvbnRhaW5lciB8fCByb290LmNoaWxkcmVuWzBdKVxuXG4gICAgY29uc3QgY3VzdG9tU2xpZGVzID0gaXNTdHJpbmcodXNlclNsaWRlcylcbiAgICAgID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodXNlclNsaWRlcylcbiAgICAgIDogdXNlclNsaWRlc1xuICAgIHNsaWRlcyA9IDxIVE1MRWxlbWVudFtdPltdLnNsaWNlLmNhbGwoY3VzdG9tU2xpZGVzIHx8IGNvbnRhaW5lci5jaGlsZHJlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVuZ2luZShvcHRpb25zOiBPcHRpb25zVHlwZSk6IEVuZ2luZVR5cGUge1xuICAgIGNvbnN0IGVuZ2luZSA9IEVuZ2luZShcbiAgICAgIHJvb3QsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzbGlkZXMsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBvcHRpb25zLFxuICAgICAgZXZlbnRIYW5kbGVyXG4gICAgKVxuXG4gICAgaWYgKG9wdGlvbnMubG9vcCAmJiAhZW5naW5lLnNsaWRlTG9vcGVyLmNhbkxvb3AoKSkge1xuICAgICAgY29uc3Qgb3B0aW9uc1dpdGhvdXRMb29wID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBsb29wOiBmYWxzZSB9KVxuICAgICAgcmV0dXJuIGNyZWF0ZUVuZ2luZShvcHRpb25zV2l0aG91dExvb3ApXG4gICAgfVxuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHdpdGhPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShvcHRpb25zQmFzZSlcbiAgICBwbHVnaW5MaXN0ID0gd2l0aFBsdWdpbnMgfHwgcGx1Z2luTGlzdFxuXG4gICAgc3RvcmVFbGVtZW50cygpXG5cbiAgICBlbmdpbmUgPSBjcmVhdGVFbmdpbmUob3B0aW9ucylcblxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXMoW1xuICAgICAgb3B0aW9uc0Jhc2UsXG4gICAgICAuLi5wbHVnaW5MaXN0Lm1hcCgoeyBvcHRpb25zIH0pID0+IG9wdGlvbnMpXG4gICAgXSkuZm9yRWFjaCgocXVlcnkpID0+IG1lZGlhSGFuZGxlcnMuYWRkKHF1ZXJ5LCAnY2hhbmdlJywgcmVBY3RpdmF0ZSkpXG5cbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlKSByZXR1cm5cblxuICAgIGVuZ2luZS50cmFuc2xhdGUudG8oZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICAgIGVuZ2luZS5hbmltYXRpb24uaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5pbml0KClcbiAgICBlbmdpbmUuc2xpZGVGb2N1cy5pbml0KHNlbGYpXG4gICAgZW5naW5lLmV2ZW50SGFuZGxlci5pbml0KHNlbGYpXG4gICAgZW5naW5lLnJlc2l6ZUhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIGlmIChlbmdpbmUub3B0aW9ucy5sb29wKSBlbmdpbmUuc2xpZGVMb29wZXIubG9vcCgpXG4gICAgaWYgKGNvbnRhaW5lci5vZmZzZXRQYXJlbnQgJiYgc2xpZGVzLmxlbmd0aCkgZW5naW5lLmRyYWdIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIHBsdWdpbkFwaXMgPSBwbHVnaW5zSGFuZGxlci5pbml0KHNlbGYsIHBsdWdpbkxpc3QpXG4gIH1cblxuICBmdW5jdGlvbiByZUFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGFjdGl2YXRlKG1lcmdlT3B0aW9ucyh7IHN0YXJ0SW5kZXggfSwgd2l0aE9wdGlvbnMpLCB3aXRoUGx1Z2lucylcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncmVJbml0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlQWN0aXZhdGUoKTogdm9pZCB7XG4gICAgZW5naW5lLmRyYWdIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5ldmVudFN0b3JlLmNsZWFyKClcbiAgICBlbmdpbmUudHJhbnNsYXRlLmNsZWFyKClcbiAgICBlbmdpbmUuc2xpZGVMb29wZXIuY2xlYXIoKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuZGVzdHJveSgpXG4gICAgZW5naW5lLmFuaW1hdGlvbi5kZXN0cm95KClcbiAgICBwbHVnaW5zSGFuZGxlci5kZXN0cm95KClcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICAgIG1lZGlhSGFuZGxlcnMuY2xlYXIoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdkZXN0cm95JylcbiAgICBldmVudEhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8oaW5kZXg6IG51bWJlciwganVtcD86IGJvb2xlYW4sIGRpcmVjdGlvbj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghb3B0aW9ucy5hY3RpdmUgfHwgZGVzdHJveWVkKSByZXR1cm5cbiAgICBlbmdpbmUuc2Nyb2xsQm9keVxuICAgICAgLnVzZUJhc2VGcmljdGlvbigpXG4gICAgICAudXNlRHVyYXRpb24oanVtcCA9PT0gdHJ1ZSA/IDAgOiBvcHRpb25zLmR1cmF0aW9uKVxuICAgIGVuZ2luZS5zY3JvbGxUby5pbmRleChpbmRleCwgZGlyZWN0aW9uIHx8IDApXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxOZXh0KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhuZXh0LCBqdW1wLCAtMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFByZXYoanVtcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhwcmV2LCBqdW1wLCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsTmV4dCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBuZXh0ID0gZW5naW5lLmluZGV4LmFkZCgxKS5nZXQoKVxuICAgIHJldHVybiBuZXh0ICE9PSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsUHJldigpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICByZXR1cm4gcHJldiAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFNuYXBMaXN0KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFNuYXBMaXN0XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcm9ncmVzcygpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuc2Nyb2xsUHJvZ3Jlc3MuZ2V0KGVuZ2luZS5vZmZzZXRMb2NhdGlvbi5nZXQoKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdGVkU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXguZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXhQcmV2aW91cy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzSW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzTm90SW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBwbHVnaW5zKCk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHJldHVybiBwbHVnaW5BcGlzXG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcm5hbEVuZ2luZSgpOiBFbmdpbmVUeXBlIHtcbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiByb290Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHJvb3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRhaW5lck5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlTm9kZXMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHNsaWRlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gICAgY2FuU2Nyb2xsTmV4dCxcbiAgICBjYW5TY3JvbGxQcmV2LFxuICAgIGNvbnRhaW5lck5vZGUsXG4gICAgaW50ZXJuYWxFbmdpbmUsXG4gICAgZGVzdHJveSxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgZW1pdCxcbiAgICBwbHVnaW5zLFxuICAgIHByZXZpb3VzU2Nyb2xsU25hcCxcbiAgICByZUluaXQsXG4gICAgcm9vdE5vZGUsXG4gICAgc2Nyb2xsTmV4dCxcbiAgICBzY3JvbGxQcmV2LFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNlbGVjdGVkU2Nyb2xsU25hcCxcbiAgICBzbGlkZU5vZGVzLFxuICAgIHNsaWRlc0luVmlldyxcbiAgICBzbGlkZXNOb3RJblZpZXdcbiAgfVxuXG4gIGFjdGl2YXRlKHVzZXJPcHRpb25zLCB1c2VyUGx1Z2lucylcbiAgc2V0VGltZW91dCgoKSA9PiBldmVudEhhbmRsZXIuZW1pdCgnaW5pdCcpLCAwKVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBFbWJsYUNhcm91c2VsIHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEVtYmxhT3B0aW9uc1R5cGUgfCB1bmRlZmluZWRcbn1cblxuRW1ibGFDYXJvdXNlbC5nbG9iYWxPcHRpb25zID0gdW5kZWZpbmVkXG5cbmV4cG9ydCBkZWZhdWx0IEVtYmxhQ2Fyb3VzZWxcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWJsYUNhcm91c2VsIGZyb20gJ2VtYmxhLWNhcm91c2VsJztcbmltcG9ydCBBdXRvcGxheSBmcm9tICdlbWJsYS1jYXJvdXNlbC1hdXRvcGxheSc7XG5pbXBvcnQgeyBXaGVlbEdlc3R1cmVzUGx1Z2luIH0gZnJvbSAnZW1ibGEtY2Fyb3VzZWwtd2hlZWwtZ2VzdHVyZXMnO1xuaW1wb3J0ICcuL2dhbGxlcnkuc2Nzcyc7XG5pbXBvcnQge29ic2VydmVEeW5hbWljQ29udGVudH0gZnJvbSAnLi9ydW50aW1lLmVzNic7XG5pbXBvcnQge1xuICAgIGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMsXG4gICAgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlLFxuICAgIGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnNcbn0gZnJvbSAnLi9idXR0b25zLmVzNic7XG5cbmNsYXNzIFlURHluYW1pY3NHYWxsZXJ5IHtcbiAgICBpbml0KGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHkgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBjb250YWluZXIuZGF0YXNldC5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbiAgICAgICAgY29uc3QgYXhpcyA9IG9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ3knIDogJ3gnO1xuICAgICAgICBjb25zdCBtb2JpbGVPcmllbnRhdGlvbiA9IGNvbnRhaW5lci5kYXRhc2V0Lm1vYmlsZU9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xuICAgICAgICBjb25zdCBtb2JpbGVBeGlzID0gbW9iaWxlT3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAneScgOiAneCc7XG4gICAgICAgIGNvbnN0IHRodW1iQXhpcyA9IGNvbnRhaW5lci5kYXRhc2V0LnRodW1iQXhpcyA9PT0gJ3knID8gJ3knIDogJ3gnO1xuICAgICAgICBjb25zdCBtb2JpbGVUaHVtYkF4aXMgPSBjb250YWluZXIuZGF0YXNldC50aHVtYk1vYmlsZUF4aXMgPT09ICd5JyA/ICd5JyA6ICd4JztcbiAgICAgICAgY29uc3QgbmF2TW9kZSA9IFsndGh1bWJuYXYnLCAnZG90bmF2J10uaW5jbHVkZXMoY29udGFpbmVyLmRhdGFzZXQubmF2KVxuICAgICAgICAgICAgPyBjb250YWluZXIuZGF0YXNldC5uYXZcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGxvb3AgPSBjb250YWluZXIuZGF0YXNldC5sb29wICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCB3YXRjaERyYWcgPSBjb250YWluZXIuZGF0YXNldC5kcmFnICE9PSAnZmFsc2UnO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgubWF4KDEwLCBNYXRoLm1pbig2MCwgTnVtYmVyKGNvbnRhaW5lci5kYXRhc2V0LmR1cmF0aW9uKSB8fCAzMCkpO1xuICAgICAgICBjb25zdCBhdXRvcGxheSA9IGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5ID09PSAndHJ1ZSc7XG4gICAgICAgIGNvbnN0IGF1dG9wbGF5RGVsYXkgPSBNYXRoLm1heCgzMDAwLCBNYXRoLm1pbigyMDAwMCwgTnVtYmVyKGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5RGVsYXkpIHx8IDcwMDApKTtcbiAgICAgICAgY29uc3QgYXV0b3BsYXlQYXVzZSA9IGNvbnRhaW5lci5kYXRhc2V0LmF1dG9wbGF5UGF1c2UgIT09ICdmYWxzZSc7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBheGlzLFxuICAgICAgICAgICAgbG9vcCxcbiAgICAgICAgICAgIHdhdGNoRHJhZyxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAnKG1heC13aWR0aDogNjM5cHgpJzoge2F4aXM6IG1vYmlsZUF4aXN9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbnNUaHVtYnMgPSB7XG4gICAgICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgICAgIGF4aXM6IHRodW1iQXhpcyxcbiAgICAgICAgICAgIGRyYWdGcmVlOiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgICcobWF4LXdpZHRoOiA2MzlweCknOiB7YXhpczogbW9iaWxlVGh1bWJBeGlzfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ZpZXdwb3J0JyksXG4gICAgICAgICAgICBwcmV2VGh1bWJCdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvdy10aHVtYnNfX3ByZXYnKSxcbiAgICAgICAgICAgIG5leHRUaHVtYkJ0bk5vZGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fbmV4dCcpLFxuICAgICAgICAgICAgcHJldk1haW5CdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fcHJldicpLFxuICAgICAgICAgICAgbmV4dE1haW5CdG5Ob2RlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fbmV4dCcpO1xuXG4gICAgICAgIGlmICghdmlld3BvcnROb2RlTWFpbkNhcm91c2VsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuZGF0YXNldC5ybUdhbGxlcnlSZWFkeSA9ICd0cnVlJztcblxuICAgICAgICBjb25zdCBwbHVnaW5zID0gYXV0b3BsYXkgPyBbQXV0b3BsYXkoe1xuICAgICAgICAgICAgZGVsYXk6IGF1dG9wbGF5RGVsYXksXG4gICAgICAgICAgICBzdG9wT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzdG9wT25Nb3VzZUVudGVyOiBhdXRvcGxheVBhdXNlLFxuICAgICAgICAgICAgc3RvcE9uRm9jdXNJbjogYXV0b3BsYXlQYXVzZVxuICAgICAgICB9KV0gOiBbXTtcbiAgICAgICAgY29uc3QgZW1ibGFNYWluID0gRW1ibGFDYXJvdXNlbCh2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwsIG9wdGlvbnMsIHBsdWdpbnMpO1xuICAgICAgICBjb25zdCBjbGVhbnVwcyA9IFtdO1xuICAgICAgICBsZXQgZW1ibGFUaHVtYiA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc3luY1NsaWRlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZW1ibGFNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpO1xuICAgICAgICAgICAgZW1ibGFNYWluLnNsaWRlTm9kZXMoKS5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBpbmRleCA9PT0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGFjdGl2ZSA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF0nKS5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzID0gY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID09PSAnJyA/IGNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpIDogY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuZGF0YXNldC5ybUdhbGxlcnlUYWJpbmRleCA9IGNvbnRyb2wuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID8/ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBlbWJsYU1haW4ub24oJ3NlbGVjdCcsIHN5bmNTbGlkZXMpLm9uKCdyZUluaXQnLCBzeW5jU2xpZGVzKTtcbiAgICAgICAgc3luY1NsaWRlcygpO1xuXG4gICAgICAgIGlmIChuYXZNb2RlICYmIHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hdk5vZGVzID0gQXJyYXkuZnJvbShjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnJtc2xpZGVzaG93LXRodW1ic19fc2xpZGUnKSk7XG5cbiAgICAgICAgICAgIGlmIChuYXZNb2RlID09PSAndGh1bWJuYXYnKSB7XG4gICAgICAgICAgICAgICAgZW1ibGFUaHVtYiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCwgb3B0aW9uc1RodW1icywgW1doZWVsR2VzdHVyZXNQbHVnaW4oKV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbnVwcy5wdXNoKFxuICAgICAgICAgICAgICAgIGFkZFRodW1iQnV0dG9uc0NsaWNrSGFuZGxlcnMoZW1ibGFNYWluLCBuYXZOb2RlcyksXG4gICAgICAgICAgICAgICAgYWRkVG9nZ2xlVGh1bWJCdXR0b25zQWN0aXZlKGVtYmxhTWFpbiwgbmF2Tm9kZXMsIGVtYmxhVGh1bWIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoZW1ibGFUaHVtYiAmJiBwcmV2VGh1bWJCdG5Ob2RlICYmIG5leHRUaHVtYkJ0bk5vZGUpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwcy5wdXNoKGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMoXG4gICAgICAgICAgICAgICAgICAgIGVtYmxhVGh1bWIsXG4gICAgICAgICAgICAgICAgICAgIHByZXZUaHVtYkJ0bk5vZGUsXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaHVtYkJ0bk5vZGVcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2TWFpbkJ0bk5vZGUgJiYgbmV4dE1haW5CdG5Ob2RlKSB7XG4gICAgICAgICAgICBjbGVhbnVwcy5wdXNoKGFkZFByZXZOZXh0QnV0dG9uc0NsaWNrSGFuZGxlcnMoXG4gICAgICAgICAgICAgICAgZW1ibGFNYWluLFxuICAgICAgICAgICAgICAgIHByZXZNYWluQnRuTm9kZSxcbiAgICAgICAgICAgICAgICBuZXh0TWFpbkJ0bk5vZGVcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIGVtYmxhTWFpbi5vZmYoJ3NlbGVjdCcsIHN5bmNTbGlkZXMpO1xuICAgICAgICAgICAgZW1ibGFNYWluLm9mZigncmVJbml0Jywgc3luY1NsaWRlcyk7XG4gICAgICAgICAgICBjbGVhbnVwcy5mb3JFYWNoKChjbGVhbnVwKSA9PiBjbGVhbnVwKCkpO1xuICAgICAgICAgICAgZW1ibGFUaHVtYj8uZGVzdHJveSgpO1xuICAgICAgICAgICAgZW1ibGFNYWluLnNsaWRlTm9kZXMoKS5mb3JFYWNoKChzbGlkZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1nYWxsZXJ5LXRhYmluZGV4XScpLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXMgPSBjb250cm9sLmRhdGFzZXQucm1HYWxsZXJ5VGFiaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID09PSAnJyA/IGNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpIDogY29udHJvbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29udHJvbC5kYXRhc2V0LnJtR2FsbGVyeVRhYmluZGV4O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyLmRhdGFzZXQucm1HYWxsZXJ5UmVhZHk7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyLnJtR2FsbGVyeURlc3Ryb3k7XG4gICAgICAgIH07XG4gICAgICAgIGVtYmxhTWFpbi5vbignZGVzdHJveScsIGNsZWFudXApO1xuICAgICAgICBjb250YWluZXIucm1HYWxsZXJ5RGVzdHJveSA9ICgpID0+IGVtYmxhTWFpbi5kZXN0cm95KCk7XG4gICAgfVxufVxuXG5jb25zdCBnYWxsZXJ5VGV4dCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgncnUnKVxuICAgID8ge2ltYWdlOiAn0JjQt9C+0LHRgNCw0LbQtdC90LjQtScsIG9wZW46ICfQntGC0LrRgNGL0YLRjCDQuNC30L7QsdGA0LDQttC10L3QuNC1J31cbiAgICA6IHtpbWFnZTogJ0ltYWdlJywgb3BlbjogJ09wZW4gaW1hZ2UnfTtcblxuY29uc3QgcHJvZHVjdFNsaWRlID0gKGNvbnRhaW5lciwgbWVkaWEsIGluZGV4LCB0b3RhbCwgdGVtcGxhdGUgPSBudWxsKSA9PiB7XG4gICAgY29uc3Qgc2xpZGUgPSB0ZW1wbGF0ZT8uY2xvbmVOb2RlKHRydWUpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlmICghdGVtcGxhdGUpIHNsaWRlLmNsYXNzTmFtZSA9ICdlbC1pdGVtIHJtc2xpZGVzaG93X19zbGlkZSc7XG4gICAgc2xpZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyb3VwJyk7XG4gICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLXJvbGVkZXNjcmlwdGlvbicsICdzbGlkZScpO1xuICAgIHNsaWRlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2luZGV4ICsgMX0gLyAke3RvdGFsfWApO1xuICAgIHNsaWRlLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ybS1nYWxsZXJ5LXRhYmluZGV4XScpLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgY29udHJvbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcm0tZ2FsbGVyeS10YWJpbmRleCcpO1xuICAgICAgICBjb250cm9sLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB9KTtcbiAgICBjb25zdCBpbWFnZVdyYXAgPSBzbGlkZS5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX3NsaWRlX19pbWFnZScpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlmICghaW1hZ2VXcmFwLmNsYXNzTmFtZSkgaW1hZ2VXcmFwLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvd19fc2xpZGVfX2ltYWdlIHVrLWZsZXggdWstZmxleC1jZW50ZXIgdWstZmxleC1taWRkbGUnO1xuICAgIGNvbnN0IGltYWdlID0gaW1hZ2VXcmFwLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlLnNyYyA9IG1lZGlhLnNyYyB8fCAnJztcbiAgICBpbWFnZS5hbHQgPSBtZWRpYS5hbHQgfHwgJyc7XG4gICAgaW1hZ2UubG9hZGluZyA9IGNvbnRhaW5lci5kYXRhc2V0LmltYWdlTG9hZGluZyA9PT0gJ2VhZ2VyJyA/ICdlYWdlcicgOiAnbGF6eSc7XG4gICAgaWYgKCFpbWFnZVdyYXAuY29udGFpbnMoaW1hZ2UpKSBpbWFnZVdyYXAucmVwbGFjZUNoaWxkcmVuKGltYWdlKTtcblxuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5saWdodGJveCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBzbGlkZS5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX2xpZ2h0Ym94JykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBpZiAoIWxpbmsuY2xhc3NOYW1lKSBsaW5rLmNsYXNzTmFtZSA9ICdybXNsaWRlc2hvd19fbGlnaHRib3ggdWstZGlzcGxheS1ibG9jayB1ay1wb3NpdGlvbi1yZWxhdGl2ZSB1ay10cmFuc2l0aW9uLXRvZ2dsZSc7XG4gICAgICAgIGxpbmsuaHJlZiA9IG1lZGlhLnNyYyB8fCAnJztcbiAgICAgICAgbGluay5kYXRhc2V0LnJtTGlnaHRib3ggPSAnJztcbiAgICAgICAgbGluay5kYXRhc2V0LnR5cGUgPSAnaW1hZ2UnO1xuICAgICAgICBsaW5rLmRhdGFzZXQuYWx0ID0gbWVkaWEuYWx0IHx8ICcnO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGAke2dhbGxlcnlUZXh0Lm9wZW59OiAke21lZGlhLmFsdCB8fCBgJHtnYWxsZXJ5VGV4dC5pbWFnZX0gJHtpbmRleCArIDF9YH1gKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LmxpZ2h0Ym94Q2FwdGlvbiAhPT0gJ2ZhbHNlJyAmJiBtZWRpYS5hbHQpIHtcbiAgICAgICAgICAgIGxpbmsuZGF0YXNldC5jYXB0aW9uID0gbWVkaWEuYWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGxpbmsuZGF0YXNldC5jYXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGljb24gPSBsaW5rLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fbGlnaHRib3gtaWNvbicpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgaWYgKCFpY29uLmNsYXNzTmFtZSkgaWNvbi5jbGFzc05hbWUgPSAncm1zbGlkZXNob3dfX2xpZ2h0Ym94LWljb24gdWstcG9zaXRpb24tY2VudGVyIHVrLXRyYW5zaXRpb24tZmFkZSc7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd1ay1vdmVybGF5LWljb24nLCAnJyk7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIGlmICghbGluay5jb250YWlucyhpbWFnZVdyYXApKSBsaW5rLnByZXBlbmQoaW1hZ2VXcmFwKTtcbiAgICAgICAgaWYgKCFsaW5rLmNvbnRhaW5zKGljb24pKSBsaW5rLmFwcGVuZChpY29uKTtcbiAgICAgICAgaWYgKCFzbGlkZS5jb250YWlucyhsaW5rKSkgc2xpZGUucmVwbGFjZUNoaWxkcmVuKGxpbmspO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlLnJlcGxhY2VDaGlsZHJlbihpbWFnZVdyYXApO1xuICAgIH1cbiAgICByZXR1cm4gc2xpZGU7XG59O1xuXG5jb25zdCBwcm9kdWN0VGh1bWIgPSAoY29udGFpbmVyLCBtZWRpYSwgaW5kZXgsIGFuY2hvckNsYXNzLCB0ZW1wbGF0ZSA9IG51bGwpID0+IHtcbiAgICBjb25zdCBpdGVtID0gdGVtcGxhdGU/LmNsb25lTm9kZSh0cnVlKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGlmICghdGVtcGxhdGUpIGl0ZW0uY2xhc3NOYW1lID0gJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUnO1xuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnLCAndWstYWN0aXZlJyk7XG4gICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcpO1xuICAgIGNvbnN0IGxpbmsgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gJyMnO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCR7Z2FsbGVyeVRleHQuaW1hZ2V9ICR7aW5kZXggKyAxfWApO1xuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5uYXYgIT09ICdkb3RuYXYnKSB7XG4gICAgICAgIGxpbmsuY2xhc3NOYW1lID0gYW5jaG9yQ2xhc3MgfHwgJ3VrLWRpc3BsYXktYmxvY2sgdWstb3ZlcmZsb3ctaGlkZGVuIHVrLWJhY2tncm91bmQtbXV0ZWQnO1xuICAgICAgICBjb25zdCB3cmFwID0gbGluay5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZV9faW1hZ2UnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGlmICghd3JhcC5jbGFzc05hbWUpIHdyYXAuY2xhc3NOYW1lID0gJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGVfX2ltYWdlIHVrLWZsZXggdWstZmxleC1jZW50ZXIgdWstZmxleC1taWRkbGUnO1xuICAgICAgICBjb25zdCBpbWFnZSA9IHdyYXAucXVlcnlTZWxlY3RvcignaW1nJykgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltYWdlLnNyYyA9IG1lZGlhLnNyYyB8fCAnJztcbiAgICAgICAgaW1hZ2UuYWx0ID0gbWVkaWEuYWx0IHx8ICcnO1xuICAgICAgICBpbWFnZS5sb2FkaW5nID0gY29udGFpbmVyLmRhdGFzZXQuaW1hZ2VMb2FkaW5nID09PSAnZWFnZXInID8gJ2VhZ2VyJyA6ICdsYXp5JztcbiAgICAgICAgaWYgKCF3cmFwLmNvbnRhaW5zKGltYWdlKSkgd3JhcC5yZXBsYWNlQ2hpbGRyZW4oaW1hZ2UpO1xuICAgICAgICBpZiAoIWxpbmsuY29udGFpbnMod3JhcCkpIGxpbmsucmVwbGFjZUNoaWxkcmVuKHdyYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICBsaW5rLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIH1cbiAgICBpZiAoIWl0ZW0uY29udGFpbnMobGluaykpIGl0ZW0ucmVwbGFjZUNoaWxkcmVuKGxpbmspO1xuICAgIHJldHVybiBpdGVtO1xufTtcblxuY29uc3QgdXBkYXRlUHJvZHVjdEdhbGxlcnkgPSAoY29udGFpbmVyLCBtZWRpYSA9IFtdKSA9PiB7XG4gICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LnJtUHJvZHVjdEdhbGxlcnkgIT09ICd0cnVlJykgcmV0dXJuO1xuICAgIGNvbnN0IHNsaWRlcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3dfX2NvbnRhaW5lcicpO1xuICAgIGNvbnN0IHRodW1icyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19jb250YWluZXInKTtcbiAgICBpZiAoIXNsaWRlcykgcmV0dXJuO1xuXG4gICAgY29uc3QgdGh1bWJBbmNob3JDbGFzcyA9IHRodW1icz8ucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fc2xpZGUgPiBhJyk/LmNsYXNzTmFtZSB8fCAnJztcbiAgICBjb25zdCBzbGlkZVRlbXBsYXRlID0gc2xpZGVzLnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fc2xpZGUnKTtcbiAgICBjb25zdCB0aHVtYlRlbXBsYXRlID0gdGh1bWJzPy5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZScpIHx8IG51bGw7XG4gICAgY29udGFpbmVyLnJtR2FsbGVyeURlc3Ryb3k/LigpO1xuICAgIHNsaWRlcy5yZXBsYWNlQ2hpbGRyZW4oLi4ubWVkaWEubWFwKChpdGVtLCBpbmRleCkgPT4gcHJvZHVjdFNsaWRlKGNvbnRhaW5lciwgaXRlbSwgaW5kZXgsIG1lZGlhLmxlbmd0aCwgc2xpZGVUZW1wbGF0ZSkpKTtcbiAgICBpZiAodGh1bWJzKSB7XG4gICAgICAgIHRodW1icy5yZXBsYWNlQ2hpbGRyZW4oLi4ubWVkaWEubWFwKChpdGVtLCBpbmRleCkgPT4gcHJvZHVjdFRodW1iKGNvbnRhaW5lciwgaXRlbSwgaW5kZXgsIHRodW1iQW5jaG9yQ2xhc3MsIHRodW1iVGVtcGxhdGUpKSk7XG4gICAgfVxuICAgIGNvbnRhaW5lci5oaWRkZW4gPSBtZWRpYS5sZW5ndGggPT09IDA7XG4gICAgd2luZG93LlVJa2l0Py51cGRhdGU/Lihjb250YWluZXIpO1xuICAgIC8vIEtlZXAgdGhlIGV4aXN0aW5nIFVJa2l0IExpZ2h0Ym94IGluc3RhbmNlIGF0dGFjaGVkIHRvIHRoZSBzbGlkZSBsaXN0O1xuICAgIC8vIGl0cyBkZWxlZ2F0ZWQgdG9nZ2xlIHdhdGNoZXIgZm9sbG93cyBhbmNob3JzIHJlcGxhY2VkIGJ5IGEgdmFyaWFudCB1cGRhdGUuXG4gICAgaWYgKG1lZGlhLmxlbmd0aCkgbmV3IFlURHluYW1pY3NHYWxsZXJ5KCkuaW5pdChjb250YWluZXIpO1xufTtcblxuY29uc3QgcHJvZHVjdEdhbGxlcnlUZXh0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdydScpXG4gICAgPyB7aW1hZ2U6ICfQntGC0LrRgNGL0YLRjCDQuNC30L7QsdGA0LDQttC10L3QuNC1JywgdmlkZW86ICfQntGC0LrRgNGL0YLRjCDQstC40LTQtdC+J31cbiAgICA6IHtpbWFnZTogJ09wZW4gaW1hZ2UnLCB2aWRlbzogJ09wZW4gdmlkZW8nfTtcblxuY29uc3QgcHJvZHVjdEdhbGxlcnlJdGVtID0gKGNvbnRhaW5lciwgbWVkaWEsIGluZGV4LCB0ZW1wbGF0ZSA9IG51bGwpID0+IHtcbiAgICBjb25zdCB0eXBlID0gbWVkaWEudHlwZSA9PT0gJ3ZpZGVvJyA/ICd2aWRlbycgOiAnaW1hZ2UnO1xuICAgIGNvbnN0IGl0ZW0gPSB0ZW1wbGF0ZT8uY2xvbmVOb2RlKHRydWUpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FydGljbGUnKTtcbiAgICBpZiAoIXRlbXBsYXRlKSBpdGVtLmNsYXNzTmFtZSA9ICdlbC1pdGVtIHJtLXByb2R1Y3QtZ2FsbGVyeV9faXRlbSB1ay1vdmVyZmxvdy1oaWRkZW4nO1xuICAgIGl0ZW0uZGF0YXNldC5ybVByb2R1Y3RHYWxsZXJ5SXRlbSA9ICcnO1xuICAgIGl0ZW0uZGF0YXNldC5tZWRpYUluZGV4ID0gU3RyaW5nKGluZGV4KTtcbiAgICBpdGVtLmRhdGFzZXQubWVkaWFUeXBlID0gdHlwZTtcbiAgICBpdGVtLmhpZGRlbiA9IGZhbHNlO1xuICAgIGNvbnN0IG1lZGlhV3JhcCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnJtLXByb2R1Y3QtZ2FsbGVyeV9fbWVkaWEnKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgaWYgKCFtZWRpYVdyYXAuY2xhc3NOYW1lKSBtZWRpYVdyYXAuY2xhc3NOYW1lID0gJ3JtLXByb2R1Y3QtZ2FsbGVyeV9fbWVkaWEgdWstZmxleCB1ay1mbGV4LWNlbnRlciB1ay1mbGV4LW1pZGRsZSc7XG4gICAgY29uc3QgaW1hZ2VTcmMgPSB0eXBlID09PSAndmlkZW8nID8gbWVkaWEucG9zdGVyIDogbWVkaWEuc3JjO1xuXG4gICAgaWYgKGltYWdlU3JjKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbWVkaWFXcmFwLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWFnZS5zcmMgPSBpbWFnZVNyYztcbiAgICAgICAgaW1hZ2UuYWx0ID0gbWVkaWEuYWx0IHx8ICcnO1xuICAgICAgICBpbWFnZS5sb2FkaW5nID0gY29udGFpbmVyLmRhdGFzZXQuaW1hZ2VMb2FkaW5nID09PSAnZWFnZXInID8gJ2VhZ2VyJyA6ICdsYXp5JztcbiAgICAgICAgaWYgKCFtZWRpYVdyYXAuY29udGFpbnMoaW1hZ2UpKSBtZWRpYVdyYXAucHJlcGVuZChpbWFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFXcmFwLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpPy5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBjb25zdCBwbGF5ID0gbWVkaWFXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX3BsYXknKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGlmICghcGxheS5jbGFzc05hbWUpIHBsYXkuY2xhc3NOYW1lID0gJ3JtLXByb2R1Y3QtZ2FsbGVyeV9fcGxheSB1ay1pY29uLWJ1dHRvbic7XG4gICAgICAgIHBsYXkuc2V0QXR0cmlidXRlKCd1ay1pY29uJywgJ2ljb246IHBsYXknKTtcbiAgICAgICAgcGxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgaWYgKCFtZWRpYVdyYXAuY29udGFpbnMocGxheSkpIG1lZGlhV3JhcC5hcHBlbmQocGxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFXcmFwLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX3BsYXknKT8ucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5lci5kYXRhc2V0LmxpZ2h0Ym94ID09PSAndHJ1ZScpIHtcbiAgICAgICAgY29uc3QgbGluayA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnJtLXByb2R1Y3QtZ2FsbGVyeV9fbGluaycpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgaWYgKCFsaW5rLmNsYXNzTmFtZSkgbGluay5jbGFzc05hbWUgPSAncm0tcHJvZHVjdC1nYWxsZXJ5X19saW5rIHVrLWRpc3BsYXktYmxvY2sgdWstcG9zaXRpb24tcmVsYXRpdmUgdWstdHJhbnNpdGlvbi10b2dnbGUnO1xuICAgICAgICBsaW5rLmhyZWYgPSBtZWRpYS5zcmMgfHwgJyc7XG4gICAgICAgIGxpbmsuZGF0YXNldC5ybVByb2R1Y3RHYWxsZXJ5TGlnaHRib3ggPSAnJztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdpbWFnZScpIGxpbmsuZGF0YXNldC50eXBlID0gJ2ltYWdlJzsgZWxzZSBkZWxldGUgbGluay5kYXRhc2V0LnR5cGU7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHlwZSA9PT0gJ3ZpZGVvJyA/IHByb2R1Y3RHYWxsZXJ5VGV4dC52aWRlbyA6IHByb2R1Y3RHYWxsZXJ5VGV4dC5pbWFnZSk7XG4gICAgICAgIGlmIChjb250YWluZXIuZGF0YXNldC5saWdodGJveENhcHRpb24gIT09ICdmYWxzZScgJiYgbWVkaWEuYWx0KSB7XG4gICAgICAgICAgICBsaW5rLmRhdGFzZXQuY2FwdGlvbiA9IG1lZGlhLmFsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsaW5rLmRhdGFzZXQuY2FwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxpbmsuY29udGFpbnMobWVkaWFXcmFwKSkgbGluay5yZXBsYWNlQ2hpbGRyZW4obWVkaWFXcmFwKTtcbiAgICAgICAgaWYgKCFpdGVtLmNvbnRhaW5zKGxpbmspKSBpdGVtLnJlcGxhY2VDaGlsZHJlbihsaW5rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnJlcGxhY2VDaGlsZHJlbihtZWRpYVdyYXApO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xufTtcblxuY29uc3QgdXBkYXRlUHJvZHVjdEdhbGxlcnlHcmlkVmlzaWJpbGl0eSA9IChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgubWF4KDAsIE51bWJlcihjb250YWluZXIuZGF0YXNldC52aXNpYmxlTGltaXQpIHx8IDApO1xuICAgIGNvbnN0IGV4cGFuZGVkID0gY29udGFpbmVyLmRhdGFzZXQuZXhwYW5kZWQgPT09ICd0cnVlJztcbiAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20oY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS1pdGVtXScpKTtcbiAgICBjb25zdCBtb3JlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5ybS1wcm9kdWN0LWdhbGxlcnlfX21vcmUnKTtcbiAgICBjb25zdCB0b2dnbGUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcm0tcHJvZHVjdC1nYWxsZXJ5LXRvZ2dsZV0nKTtcbiAgICBjb25zdCBoYXNIaWRkZW5JdGVtcyA9IGxpbWl0ID4gMCAmJiBpdGVtcy5sZW5ndGggPiBsaW1pdDtcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uaGlkZGVuID0gaGFzSGlkZGVuSXRlbXMgJiYgIWV4cGFuZGVkICYmIGluZGV4ID49IGxpbWl0O1xuICAgIH0pO1xuICAgIGlmICghdG9nZ2xlKSByZXR1cm47XG5cbiAgICBjb25zdCBoaWRlVG9nZ2xlID0gIWhhc0hpZGRlbkl0ZW1zIHx8IChleHBhbmRlZCAmJiBjb250YWluZXIuZGF0YXNldC5jb2xsYXBzZSAhPT0gJ3RydWUnKTtcbiAgICBpZiAobW9yZSkgbW9yZS5oaWRkZW4gPSBoaWRlVG9nZ2xlO1xuICAgIHRvZ2dsZS5oaWRkZW4gPSBoaWRlVG9nZ2xlO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBleHBhbmRlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgIHRvZ2dsZS50ZXh0Q29udGVudCA9IGV4cGFuZGVkXG4gICAgICAgID8gY29udGFpbmVyLmRhdGFzZXQuc2hvd0xlc3NMYWJlbCB8fCAnU2hvdyBsZXNzJ1xuICAgICAgICA6IGNvbnRhaW5lci5kYXRhc2V0LnNob3dNb3JlTGFiZWwgfHwgJ1Nob3cgbW9yZSc7XG59O1xuXG5jb25zdCBpbml0UHJvZHVjdEdhbGxlcnlHcmlkID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGlmIChjb250YWluZXIuZGF0YXNldC5ybVByb2R1Y3RHYWxsZXJ5R3JpZFJlYWR5ID09PSAndHJ1ZScpIHJldHVybjtcbiAgICBjb250YWluZXIuZGF0YXNldC5ybVByb2R1Y3RHYWxsZXJ5R3JpZFJlYWR5ID0gJ3RydWUnO1xuXG4gICAgY29uc3QgdG9nZ2xlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS10b2dnbGVdJyk7XG4gICAgdG9nZ2xlPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBjb250YWluZXIuZGF0YXNldC5leHBhbmRlZCA9PT0gJ3RydWUnO1xuICAgICAgICBjb250YWluZXIuZGF0YXNldC5leHBhbmRlZCA9IGV4cGFuZGVkID8gJ2ZhbHNlJyA6ICd0cnVlJztcbiAgICAgICAgdXBkYXRlUHJvZHVjdEdhbGxlcnlHcmlkVmlzaWJpbGl0eShjb250YWluZXIpO1xuICAgIH0pO1xuICAgIHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZFZpc2liaWxpdHkoY29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZCA9IChjb250YWluZXIsIG1lZGlhID0gW10pID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucm0tcHJvZHVjdC1nYWxsZXJ5X19pdGVtcycpO1xuICAgIGlmICghaXRlbXMpIHJldHVybjtcbiAgICBjb25zdCBtb3JlID0gaXRlbXMucXVlcnlTZWxlY3RvcignLnJtLXByb2R1Y3QtZ2FsbGVyeV9fbW9yZScpO1xuICAgIGNvbnN0IGl0ZW1UZW1wbGF0ZSA9IGl0ZW1zLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS1pdGVtXScpO1xuICAgIGl0ZW1zLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeS1pdGVtXScpLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucmVtb3ZlKCkpO1xuICAgIG1lZGlhLmZvckVhY2goKGVudHJ5LCBpbmRleCkgPT4gaXRlbXMuaW5zZXJ0QmVmb3JlKHByb2R1Y3RHYWxsZXJ5SXRlbShjb250YWluZXIsIGVudHJ5LCBpbmRleCwgaXRlbVRlbXBsYXRlKSwgbW9yZSkpO1xuICAgIGNvbnRhaW5lci5kYXRhc2V0LmV4cGFuZGVkID0gJ2ZhbHNlJztcbiAgICBjb250YWluZXIuaGlkZGVuID0gbWVkaWEubGVuZ3RoID09PSAwO1xuICAgIHVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZFZpc2liaWxpdHkoY29udGFpbmVyKTtcbiAgICB3aW5kb3cuVUlraXQ/LnVwZGF0ZT8uKGNvbnRhaW5lcik7XG59O1xuXG5jb25zdCBpbml0R2FsbGVyaWVzID0gKHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignLnJtc2xpZGVzaG93JykpIHtcbiAgICAgICAgbmV3IFlURHluYW1pY3NHYWxsZXJ5KCkuaW5pdChyb290KTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignLnJtc2xpZGVzaG93JykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBuZXcgWVREeW5hbWljc0dhbGxlcnkoKS5pbml0KGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHJvb3QubWF0Y2hlcz8uKCdbZGF0YS1ybS1wcm9kdWN0LWdhbGxlcnktZ3JpZF0nKSkgaW5pdFByb2R1Y3RHYWxsZXJ5R3JpZChyb290KTtcbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignW2RhdGEtcm0tcHJvZHVjdC1nYWxsZXJ5LWdyaWRdJykuZm9yRWFjaChpbml0UHJvZHVjdEdhbGxlcnlHcmlkKTtcbn07XG5cbmNvbnN0IGRlc3Ryb3lHYWxsZXJpZXMgPSAocm9vdCkgPT4ge1xuICAgIGlmIChyb290Lm1hdGNoZXM/LignLnJtc2xpZGVzaG93JykpIHtcbiAgICAgICAgcm9vdC5ybUdhbGxlcnlEZXN0cm95Py4oKTtcbiAgICB9XG5cbiAgICByb290LnF1ZXJ5U2VsZWN0b3JBbGw/LignLnJtc2xpZGVzaG93JykuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5ybUdhbGxlcnlEZXN0cm95Py4oKSk7XG59O1xuXG5jb25zdCBvYnNlcnZlR2FsbGVyaWVzID0gKCkgPT4ge1xuICAgIGluaXRHYWxsZXJpZXMoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JhZGljYWxtYXJ0OnByb2R1Y3QtY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZXZlbnQuZGV0YWlsPy5wcm9kdWN0O1xuICAgICAgICBpZiAoIXNjb3BlPy5xdWVyeVNlbGVjdG9yQWxsIHx8ICFwcm9kdWN0KSByZXR1cm47XG4gICAgICAgIHNjb3BlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJtLXByb2R1Y3QtZ2FsbGVyeT1cInRydWVcIl0nKS5mb3JFYWNoKChnYWxsZXJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZ2FsbGVyeS5jbG9zZXN0KCdbZGF0YS1ybS1wcm9kdWN0LXNjb3BlXScpID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RHYWxsZXJ5KGdhbGxlcnksIHByb2R1Y3QubWVkaWEgfHwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcm0tcHJvZHVjdC1nYWxsZXJ5LWdyaWRdW2RhdGEtc3luYy1wcm9kdWN0LW1lZGlhPVwidHJ1ZVwiXScpLmZvckVhY2goKGdhbGxlcnkpID0+IHtcbiAgICAgICAgICAgIGlmIChnYWxsZXJ5LmNsb3Nlc3QoJ1tkYXRhLXJtLXByb2R1Y3Qtc2NvcGVdJykgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvZHVjdEdhbGxlcnlHcmlkKGdhbGxlcnksIHByb2R1Y3QubWVkaWFBbGwgfHwgcHJvZHVjdC5tZWRpYSB8fCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZUR5bmFtaWNDb250ZW50KGluaXRHYWxsZXJpZXMsIGRlc3Ryb3lHYWxsZXJpZXMpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBvYnNlcnZlR2FsbGVyaWVzLCB7b25jZTogdHJ1ZX0pO1xufSBlbHNlIHtcbiAgICBvYnNlcnZlR2FsbGVyaWVzKCk7XG59XG4iXSwibmFtZXMiOlsiZGVmYXVsdE9wdGlvbnMiLCJhY3RpdmUiLCJicmVha3BvaW50cyIsIndoZWVsRHJhZ2dpbmdDbGFzcyIsImZvcmNlV2hlZWxBeGlzIiwidW5kZWZpbmVkIiwidGFyZ2V0IiwiV2hlZWxHZXN0dXJlc1BsdWdpbiIsImdsb2JhbE9wdGlvbnMiLCJfX0RFVl9fIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidXNlck9wdGlvbnMiLCJvcHRpb25zIiwiY2xlYW51cCIsImluaXQiLCJlbWJsYSIsIm9wdGlvbnNIYW5kbGVyIiwibWVyZ2VPcHRpb25zIiwib3B0aW9uc0F0TWVkaWEiLCJvcHRpb25zQmFzZSIsImFsbE9wdGlvbnMiLCJlbmdpbmUiLCJpbnRlcm5hbEVuZ2luZSIsInRhcmdldE5vZGUiLCJfb3B0aW9ucyR0YXJnZXQiLCJjb250YWluZXJOb2RlIiwicGFyZW50Tm9kZSIsIndoZWVsQXhpcyIsIl9vcHRpb25zJGZvcmNlV2hlZWxBeCIsImF4aXMiLCJ3aGVlbEdlc3R1cmVzIiwiV2hlZWxHZXN0dXJlcyIsInByZXZlbnRXaGVlbEFjdGlvbiIsInJldmVyc2VTaWduIiwidXBkYXRlU2l6ZVJlbGF0ZWRWYXJpYWJsZXMiLCJzY3JvbGxCb3VuZGFyeVRocmVzaG9sZCIsImNvbnRhaW5lclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInVub2JzZXJ2ZVRhcmdldE5vZGUiLCJvYnNlcnZlIiwib2ZmV2hlZWwiLCJvbiIsImhhbmRsZVdoZWVsIiwiaXNTdGFydGVkIiwic3RhcnRFdmVudCIsIm92ZXJCb3VuZGFyeUFjY3VtdWxhdGlvbiIsImJsb2NrZWRXYWl0VW50aWxHZXN0dXJlRW5kIiwid2hlZWxHZXN0dXJlU3RhcnRlZCIsInN0YXRlIiwiTW91c2VFdmVudCIsImV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImUiLCJjb25zb2xlIiwid2FybiIsImFkZE5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ3aGVlbEdlc3R1cmVFbmRlZCIsImNyZWF0ZVJlbGF0aXZlTW91c2VFdmVudCIsInJlbW92ZU5hdGl2ZU1vdXNlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50TmF0aXZlTW91c2VIYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzVHJ1c3RlZCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInR5cGUiLCJtb3ZlWCIsIm1vdmVZIiwiX3N0YXRlJGF4aXNNb3ZlbWVudCIsImF4aXNNb3ZlbWVudCIsIl9zdGF0ZSRheGlzTW92ZW1lbnQyIiwiY2hlY2tJZkF0Qm91bmRhcnkiLCJpc0F0Qm91bmRhcnkiLCJfY2hlY2tJZkF0Qm91bmRhcnkiLCJwcm9ncmVzc1JhdGlvIiwiTWF0aCIsIm1pbiIsImRhbXBpbmdGYWN0b3IiLCJjb3VudGVyTW92ZVNpZ24iLCJjb3VudGVyTW92ZW1lbnQiLCJkYW1waW5nTW92ZW1lbnQiLCJza2lwU25hcHMiLCJkcmFnRnJlZSIsIm1heFgiLCJtYXhZIiwibWF4IiwiY2xpZW50WCIsImNsaWVudFkiLCJzY3JlZW5YIiwic2NyZWVuWSIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsImJ1dHRvbiIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY29tcG9zZWQiLCJheGlzRGVsdGEiLCJkZWx0YVgiLCJfc3RhdGUkYXhpc0RlbHRhIiwiZGVsdGFZIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYW5TY3JvbGxOZXh0IiwiY2FuU2Nyb2xsUHJldiIsInByaW1hcnlBeGlzRGVsdGEiLCJpc1Njcm9sbGluZ05leHQiLCJpc1Njcm9sbGluZ1ByZXYiLCJpc0JvdW5kYXJ5VGhyZXNob2xkUmVhY2hlZCIsIl9jaGVja0lmQXRCb3VuZGFyeTIiLCJpc01vbWVudHVtIiwiYWJzIiwiX3N0YXRlJGF4aXNEZWx0YTIiLCJjcm9zc0F4aXNEZWx0YSIsImlzUmVsZWFzZSIsInByZXZpb3VzIiwiaXNFbmRpbmdPclJlbGVhc2UiLCJpc0VuZGluZyIsInByaW1hcnlBeGlzRGVsdGFJc0RvbWluYW50Iiwib2ZmIiwic2VsZiIsIm5hbWUiLCJkZXN0cm95IiwiREVDQVkiLCJwcm9qZWN0aW9uIiwidmVsb2NpdHlQeE1zIiwiZGVjYXkiLCJsYXN0T2YiLCJhcnJheSIsImxlbmd0aCIsImF2ZXJhZ2UiLCJudW1iZXJzIiwicmVkdWNlIiwiYSIsImIiLCJjbGFtcCIsInZhbHVlIiwiYWRkVmVjdG9ycyIsInYxIiwidjIiLCJFcnJvciIsIm1hcCIsInZhbCIsImkiLCJhYnNNYXgiLCJhcHBseSIsImRlZXBGcmVlemUiLCJvIiwiT2JqZWN0IiwiZnJlZXplIiwidmFsdWVzIiwiZm9yRWFjaCIsImlzRnJvemVuIiwiRXZlbnRCdXMiLCJsaXN0ZW5lcnMiLCJsaXN0ZW5lciIsImNvbmNhdCIsImZpbHRlciIsImwiLCJkaXNwYXRjaCIsImRhdGEiLCJXaGVlbFRhcmdldE9ic2VydmVyIiwiZXZlbnRMaXN0ZW5lciIsInRhcmdldHMiLCJwYXNzaXZlIiwicHVzaCIsInVub2JzZXJ2ZSIsInQiLCJkaXNjb25uZWN0IiwiTElORV9IRUlHSFQiLCJQQUdFX0hFSUdIVCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiREVMVEFfTU9ERV9VTklUIiwibm9ybWFsaXplV2hlZWwiLCJkZWx0YU1vZGUiLCJkZWx0YVoiLCJ0aW1lU3RhbXAiLCJyZXZlcnNlQWxsIiwicmV2ZXJzZUF4aXNEZWx0YVNpZ24iLCJ3aGVlbCIsIm11bHRpcGxpZXJzIiwic2hvdWxkUmV2ZXJzZSIsIl9leHRlbmRzIiwiZGVsdGEiLCJERUxUQV9NQVhfQUJTIiwiY2xhbXBBeGlzRGVsdGEiLCJBQ0NfRkFDVE9SX01JTiIsIkFDQ19GQUNUT1JfTUFYIiwiV0hFRUxFVkVOVFNfVE9fTUVSR0UiLCJXSEVFTEVWRU5UU19UT19BTkFMQVpFIiwiY29uZmlnRGVmYXVsdHMiLCJXSUxMX0VORF9USU1FT1VUX0RFRkFVTFQiLCJjcmVhdGVXaGVlbEdlc3R1cmVzU3RhdGUiLCJpc1N0YXJ0UHVibGlzaGVkIiwic3RhcnRUaW1lIiwibGFzdEFic0RlbHRhIiwiSW5maW5pdHkiLCJheGlzVmVsb2NpdHkiLCJhY2NlbGVyYXRpb25GYWN0b3JzIiwic2Nyb2xsUG9pbnRzIiwic2Nyb2xsUG9pbnRzVG9NZXJnZSIsIndpbGxFbmRUaW1lb3V0Iiwib3B0aW9uc1BhcmFtIiwiX0V2ZW50QnVzIiwiY29uZmlnIiwiY3VycmVudEV2ZW50IiwibmVnYXRpdmVaZXJvRmluZ2VyVXBTcGVjaWFsRXZlbnQiLCJwcmV2V2hlZWxFdmVudFN0YXRlIiwiZmVlZFdoZWVsIiwid2hlZWxFdmVudHMiLCJBcnJheSIsImlzQXJyYXkiLCJ3aGVlbEV2ZW50IiwicHJvY2Vzc1doZWVsRXZlbnREYXRhIiwidXBkYXRlT3B0aW9ucyIsIm5ld09wdGlvbnMiLCJzb21lIiwib3B0aW9uIiwiZXJyb3IiLCJwdWJsaXNoV2hlZWwiLCJhZGRpdGlvbmFsRGF0YSIsIndoZWVsRXZlbnRTdGF0ZSIsImlzU3RhcnQiLCJpc01vbWVudHVtQ2FuY2VsIiwiYXhpc01vdmVtZW50UHJvamVjdGlvbiIsInZlbG9jaXR5Iiwic2hvdWxkUHJldmVudERlZmF1bHQiLCJkZWx0YU1heEFicyIsIl9jb25maWciLCJfY2xhbXBBeGlzRGVsdGEiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXJ0IiwiZW5kIiwiaXMiLCJtZXJnZVNjcm9sbFBvaW50c0NhbGNWZWxvY2l0eSIsIndpbGxFbmQiLCJ1bnNoaWZ0IiwiYXhpc0RlbHRhU3VtIiwidXBkYXRlVmVsb2NpdHkiLCJkZXRlY3RNb21lbnR1bSIsInVwZGF0ZVN0YXJ0VmVsb2NpdHkiLCJkIiwibGF0ZXN0U2Nyb2xsUG9pbnQiLCJfc3RhdGUkc2Nyb2xsUG9pbnRzIiwicHJldlNjcm9sbFBvaW50IiwiZGVsdGFUaW1lIiwiYWNjZWxlcmF0aW9uRmFjdG9yIiwidiIsInVwZGF0ZVdpbGxFbmRUaW1lb3V0IiwibmV3VGltZW91dCIsImNlaWwiLCJyb3VuZCIsImFjY2VsZXJhdGlvbkZhY3RvckluTW9tZW50dW1SYW5nZSIsImFjY0ZhY3RvciIsInJlY29nbml6ZWRNb21lbnR1bSIsInJlY2VudEFjY2VsZXJhdGlvbkZhY3RvcnMiLCJzbGljZSIsImRldGVjdGVkTW9tZW50dW0iLCJldmVyeSIsImFjY0ZhYyIsInNhbWVBY2NGYWMiLCJmMSIsImYyIiwiYm90aEFyZUluUmFuZ2VPclplcm8iLCJEYXRlIiwibm93Iiwid2lsbEVuZElkIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIl9XaGVlbFRhcmdldE9ic2VydmVyIiwiYWRkVGh1bWJCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpTWFpbiIsInNsaWRlc1RodW1icyIsInNjcm9sbFRvSW5kZXgiLCJfIiwiaW5kZXgiLCJzY3JvbGxUbyIsInNsaWRlTm9kZSIsImFkZFRvZ2dsZVRodW1iQnV0dG9uc0FjdGl2ZSIsImVtYmxhQXBpVGh1bWIiLCJhcmd1bWVudHMiLCJ0b2dnbGVUaHVtYkJ0bnNTdGF0ZSIsInNlbGVjdGVkIiwic2VsZWN0ZWRTY3JvbGxTbmFwIiwic2xpZGUiLCJpc1NlbGVjdGVkIiwidG9nZ2xlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYWRkUHJldk5leHRCdXR0b25zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpIiwicHJldkJ0biIsIm5leHRCdG4iLCJzY3JvbGxQcmV2Iiwic2Nyb2xsTmV4dCIsInJlbW92ZVRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsImFkZFRvZ2dsZVByZXZOZXh0QnV0dG9uc0FjdGl2ZSIsInRvZ2dsZVByZXZOZXh0QnRuc1N0YXRlIiwiUlVOVElNRV9LRVkiLCJydW50aW1lIiwiYWRkZWQiLCJTZXQiLCJyZW1vdmVkIiwib2JzZXJ2ZXIiLCJ2aXNpdCIsImNhbGxiYWNrcyIsIm5vZGUiLCJjYWxsYmFjayIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJyZWNvcmRzIiwiX3JlZiIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJub2RlVHlwZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwib2JzZXJ2ZUR5bmFtaWNDb250ZW50Iiwib25BZGRlZCIsIm9uUmVtb3ZlZCIsImRlbGV0ZSIsImRlbGF5IiwianVtcCIsInBsYXlPbkluaXQiLCJzdG9wT25Gb2N1c0luIiwic3RvcE9uSW50ZXJhY3Rpb24iLCJzdG9wT25Nb3VzZUVudGVyIiwic3RvcE9uTGFzdFNuYXAiLCJyb290Tm9kZSIsIm5vcm1hbGl6ZURlbGF5Iiwic2Nyb2xsU25hcHMiLCJzY3JvbGxTbmFwTGlzdCIsImdldEF1dG9wbGF5Um9vdE5vZGUiLCJlbWJsYVJvb3ROb2RlIiwiQXV0b3BsYXkiLCJkZXN0cm95ZWQiLCJ0aW1lclN0YXJ0VGltZSIsInRpbWVySWQiLCJhdXRvcGxheUFjdGl2ZSIsIm1vdXNlSXNPdmVyIiwicGxheU9uRG9jdW1lbnRWaXNpYmxlIiwiZW1ibGFBcGlJbnN0YW5jZSIsImV2ZW50U3RvcmUiLCJvd25lckRvY3VtZW50IiwiaXNEcmFnZ2FibGUiLCJ3YXRjaERyYWciLCJyb290IiwidmlzaWJpbGl0eUNoYW5nZSIsInBvaW50ZXJEb3duIiwicG9pbnRlclVwIiwibW91c2VFbnRlciIsIm1vdXNlTGVhdmUiLCJzdG9wQXV0b3BsYXkiLCJzdGFydEF1dG9wbGF5Iiwic2V0VGltZXIiLCJvd25lcldpbmRvdyIsIm5leHQiLCJnZXRUaW1lIiwiZW1pdCIsImNsZWFyVGltZXIiLCJkb2N1bWVudElzSGlkZGVuIiwidmlzaWJpbGl0eVN0YXRlIiwicGxheSIsImp1bXBPdmVycmlkZSIsInN0b3AiLCJyZXNldCIsImlzUGxheWluZyIsIm5leHRJbmRleCIsImNsb25lIiwiZ2V0IiwibGFzdEluZGV4Iiwia2lsbCIsInRpbWVVbnRpbE5leHQiLCJjdXJyZW50RGVsYXkiLCJ0aW1lUGFzdFNpbmNlU3RhcnQiLCJpc051bWJlciIsInN1YmplY3QiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImlzT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibWF0aEFicyIsIm4iLCJtYXRoU2lnbiIsInNpZ24iLCJkZWx0YUFicyIsInZhbHVlQiIsInZhbHVlQSIsImZhY3RvckFicyIsImRpZmYiLCJyb3VuZFRvVHdvRGVjaW1hbHMiLCJudW0iLCJhcnJheUtleXMiLCJvYmplY3RLZXlzIiwiTnVtYmVyIiwiYXJyYXlMYXN0IiwiYXJyYXlMYXN0SW5kZXgiLCJhcnJheUlzTGFzdEluZGV4IiwiYXJyYXlGcm9tTnVtYmVyIiwic3RhcnRBdCIsImZyb20iLCJvYmplY3QiLCJrZXlzIiwib2JqZWN0c01lcmdlRGVlcCIsIm9iamVjdEEiLCJvYmplY3RCIiwibWVyZ2VkT2JqZWN0cyIsImN1cnJlbnRPYmplY3QiLCJrZXkiLCJhcmVPYmplY3RzIiwiaXNNb3VzZUV2ZW50IiwiZXZ0IiwiQWxpZ25tZW50IiwiYWxpZ24iLCJ2aWV3U2l6ZSIsInByZWRlZmluZWQiLCJjZW50ZXIiLCJtZWFzdXJlIiwiRXZlbnRTdG9yZSIsImhhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImxlZ2FjeU1lZGlhUXVlcnlMaXN0IiwiYWRkTGlzdGVuZXIiLCJjbGVhciIsIkFuaW1hdGlvbnMiLCJ1cGRhdGUiLCJyZW5kZXIiLCJkb2N1bWVudFZpc2libGVIYW5kbGVyIiwiZml4ZWRUaW1lU3RlcCIsImxhc3RUaW1lU3RhbXAiLCJhY2N1bXVsYXRlZFRpbWUiLCJhbmltYXRpb25JZCIsImhpZGRlbiIsImFuaW1hdGUiLCJ0aW1lRWxhcHNlZCIsImFscGhhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJBeGlzIiwiY29udGVudERpcmVjdGlvbiIsImlzUmlnaHRUb0xlZnQiLCJpc1ZlcnRpY2FsIiwic2Nyb2xsIiwiY3Jvc3MiLCJzdGFydEVkZ2UiLCJnZXRTdGFydEVkZ2UiLCJlbmRFZGdlIiwiZ2V0RW5kRWRnZSIsIm1lYXN1cmVTaXplIiwibm9kZVJlY3QiLCJkaXJlY3Rpb24iLCJMaW1pdCIsInJlYWNoZWRNaW4iLCJyZWFjaGVkTWF4IiwicmVhY2hlZEFueSIsImNvbnN0cmFpbiIsInJlbW92ZU9mZnNldCIsIkNvdW50ZXIiLCJsb29wIiwibG9vcEVuZCIsImNvdW50ZXIiLCJ3aXRoaW5MaW1pdCIsInNldCIsIkRyYWdIYW5kbGVyIiwiZHJhZ1RyYWNrZXIiLCJsb2NhdGlvbiIsImFuaW1hdGlvbiIsInNjcm9sbEJvZHkiLCJzY3JvbGxUYXJnZXQiLCJldmVudEhhbmRsZXIiLCJwZXJjZW50T2ZWaWV3IiwiZHJhZ1RocmVzaG9sZCIsImJhc2VGcmljdGlvbiIsImNyb3NzQXhpcyIsImZvY3VzTm9kZXMiLCJub25QYXNzaXZlRXZlbnQiLCJpbml0RXZlbnRzIiwiZHJhZ0V2ZW50cyIsImdvVG9OZXh0VGhyZXNob2xkIiwic25hcEZvcmNlQm9vc3QiLCJtb3VzZSIsInRvdWNoIiwiZnJlZUZvcmNlQm9vc3QiLCJiYXNlU3BlZWQiLCJpc01vdmluZyIsInN0YXJ0U2Nyb2xsIiwic3RhcnRDcm9zcyIsInBvaW50ZXJJc0Rvd24iLCJwcmV2ZW50U2Nyb2xsIiwicHJldmVudENsaWNrIiwiaXNNb3VzZSIsImRvd25JZkFsbG93ZWQiLCJkb3duIiwidXAiLCJjbGljayIsImFkZERyYWdFdmVudHMiLCJtb3ZlIiwiaXNGb2N1c05vZGUiLCJub2RlTmFtZSIsImluY2x1ZGVzIiwiZm9yY2VCb29zdCIsImJvb3N0IiwiYWxsb3dlZEZvcmNlIiwiZm9yY2UiLCJ0YXJnZXRDaGFuZ2VkIiwiYmFzZUZvcmNlIiwiYnlEaXN0YW5jZSIsImRpc3RhbmNlIiwiYnlJbmRleCIsImlzTW91c2VFdnQiLCJidXR0b25zIiwidXNlRnJpY3Rpb24iLCJ1c2VEdXJhdGlvbiIsInJlYWRQb2ludCIsImlzVG91Y2hFdnQiLCJ0b3VjaGVzIiwibGFzdFNjcm9sbCIsImxhc3RDcm9zcyIsImRpZmZTY3JvbGwiLCJkaWZmQ3Jvc3MiLCJwb2ludGVyTW92ZSIsImN1cnJlbnRMb2NhdGlvbiIsInJhd0ZvcmNlIiwiZm9yY2VGYWN0b3IiLCJzcGVlZCIsImZyaWN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRHJhZ1RyYWNrZXIiLCJsb2dJbnRlcnZhbCIsImxhc3RFdmVudCIsInJlYWRUaW1lIiwiZXZ0QXhpcyIsInByb3BlcnR5IiwiY29vcmQiLCJleHBpcmVkIiwiZGlmZkRyYWciLCJkaWZmVGltZSIsImlzRmxpY2siLCJOb2RlUmVjdHMiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJQZXJjZW50T2ZWaWV3IiwiUmVzaXplSGFuZGxlciIsImNvbnRhaW5lciIsInNsaWRlcyIsIndhdGNoUmVzaXplIiwibm9kZVJlY3RzIiwib2JzZXJ2ZU5vZGVzIiwicmVzaXplT2JzZXJ2ZXIiLCJjb250YWluZXJTaXplIiwic2xpZGVTaXplcyIsInJlYWRTaXplIiwiZGVmYXVsdENhbGxiYWNrIiwiZW50cmllcyIsImVudHJ5IiwiaXNDb250YWluZXIiLCJzbGlkZUluZGV4IiwiaW5kZXhPZiIsImxhc3RTaXplIiwibmV3U2l6ZSIsImRpZmZTaXplIiwicmVJbml0IiwiUmVzaXplT2JzZXJ2ZXIiLCJTY3JvbGxCb2R5Iiwib2Zmc2V0TG9jYXRpb24iLCJwcmV2aW91c0xvY2F0aW9uIiwiYmFzZUR1cmF0aW9uIiwic2Nyb2xsVmVsb2NpdHkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxEdXJhdGlvbiIsInNjcm9sbEZyaWN0aW9uIiwicmF3TG9jYXRpb24iLCJyYXdMb2NhdGlvblByZXZpb3VzIiwic2VlayIsImRpc3BsYWNlbWVudCIsImlzSW5zdGFudCIsInNjcm9sbERpc3RhbmNlIiwic2V0dGxlZCIsImR1cmF0aW9uIiwidXNlQmFzZUR1cmF0aW9uIiwidXNlQmFzZUZyaWN0aW9uIiwiU2Nyb2xsQm91bmRzIiwibGltaXQiLCJwdWxsQmFja1RocmVzaG9sZCIsImVkZ2VPZmZzZXRUb2xlcmFuY2UiLCJmcmljdGlvbkxpbWl0IiwiZGlzYWJsZWQiLCJzaG91bGRDb25zdHJhaW4iLCJlZGdlIiwiZGlmZlRvRWRnZSIsImRpZmZUb1RhcmdldCIsInN1YnRyYWN0IiwidG9nZ2xlQWN0aXZlIiwiU2Nyb2xsQ29udGFpbiIsImNvbnRlbnRTaXplIiwic25hcHNBbGlnbmVkIiwiY29udGFpblNjcm9sbCIsInBpeGVsVG9sZXJhbmNlIiwic2Nyb2xsQm91bmRzIiwic25hcHNCb3VuZGVkIiwibWVhc3VyZUJvdW5kZWQiLCJzY3JvbGxDb250YWluTGltaXQiLCJmaW5kU2Nyb2xsQ29udGFpbkxpbWl0Iiwic25hcHNDb250YWluZWQiLCJtZWFzdXJlQ29udGFpbmVkIiwidXNlUGl4ZWxUb2xlcmFuY2UiLCJib3VuZCIsInNuYXAiLCJzdGFydFNuYXAiLCJlbmRTbmFwIiwibGFzdEluZGV4T2YiLCJzbmFwQWxpZ25lZCIsImlzRmlyc3QiLCJpc0xhc3QiLCJzY3JvbGxCb3VuZCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiU2Nyb2xsTGltaXQiLCJTY3JvbGxMb29wZXIiLCJ2ZWN0b3JzIiwiam9pbnRTYWZldHkiLCJzaG91bGRMb29wIiwibG9vcERpc3RhbmNlIiwiU2Nyb2xsUHJvZ3Jlc3MiLCJTY3JvbGxTbmFwcyIsImFsaWdubWVudCIsInNsaWRlUmVjdHMiLCJzbGlkZXNUb1Njcm9sbCIsImdyb3VwU2xpZGVzIiwiYWxpZ25tZW50cyIsIm1lYXN1cmVTaXplcyIsInNuYXBzIiwibWVhc3VyZVVuYWxpZ25lZCIsIm1lYXN1cmVBbGlnbmVkIiwicmVjdHMiLCJyZWN0IiwiZyIsIlNsaWRlUmVnaXN0cnkiLCJjb250YWluU25hcHMiLCJzbGlkZUluZGV4ZXMiLCJzbGlkZVJlZ2lzdHJ5IiwiY3JlYXRlU2xpZGVSZWdpc3RyeSIsImdyb3VwZWRTbGlkZUluZGV4ZXMiLCJkb05vdENvbnRhaW4iLCJncm91cCIsImdyb3VwcyIsInJhbmdlIiwiU2Nyb2xsVGFyZ2V0IiwidGFyZ2V0VmVjdG9yIiwibWluRGlzdGFuY2UiLCJkaXN0YW5jZXMiLCJzb3J0IiwiZmluZFRhcmdldFNuYXAiLCJhc2NEaWZmc1RvU25hcHMiLCJzaG9ydGN1dCIsImQxIiwiZDIiLCJtYXRjaGluZ1RhcmdldHMiLCJkaWZmVG9TbmFwIiwidGFyZ2V0U25hcERpc3RhbmNlIiwicmVhY2hlZEJvdW5kIiwic25hcERpc3RhbmNlIiwiU2Nyb2xsVG8iLCJpbmRleEN1cnJlbnQiLCJpbmRleFByZXZpb3VzIiwiZGlzdGFuY2VEaWZmIiwiaW5kZXhEaWZmIiwidGFyZ2V0SW5kZXgiLCJTbGlkZUZvY3VzIiwid2F0Y2hGb2N1cyIsImZvY3VzTGlzdGVuZXJPcHRpb25zIiwiY2FwdHVyZSIsImxhc3RUYWJQcmVzc1RpbWUiLCJub3dUaW1lIiwic2Nyb2xsTGVmdCIsImZpbmRJbmRleCIsInJlZ2lzdGVyVGFiUHJlc3MiLCJjb2RlIiwiVmVjdG9yMUQiLCJpbml0aWFsVmFsdWUiLCJub3JtYWxpemVJbnB1dCIsIlRyYW5zbGF0ZSIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiY29udGFpbmVyU3R5bGUiLCJzdHlsZSIsInByZXZpb3VzVGFyZ2V0IiwidG8iLCJuZXdUYXJnZXQiLCJ0cmFuc2Zvcm0iLCJnZXRBdHRyaWJ1dGUiLCJTbGlkZUxvb3BlciIsInNsaWRlU2l6ZXNXaXRoR2FwcyIsInJvdW5kaW5nU2FmZXR5IiwiYXNjSXRlbXMiLCJkZXNjSXRlbXMiLCJyZXZlcnNlIiwibG9vcFBvaW50cyIsInN0YXJ0UG9pbnRzIiwiZW5kUG9pbnRzIiwicmVtb3ZlU2xpZGVTaXplcyIsImluZGV4ZXMiLCJzbGlkZXNJbkdhcCIsImdhcCIsInJlbWFpbmluZ0dhcCIsImZpbmRTbGlkZUJvdW5kcyIsImZpbmRMb29wUG9pbnRzIiwiaXNFbmRFZGdlIiwic2xpZGVCb3VuZHMiLCJpbml0aWFsIiwiYWx0ZXJlZCIsImJvdW5kRWRnZSIsImxvb3BQb2ludCIsInNsaWRlTG9jYXRpb24iLCJjYW5Mb29wIiwib3RoZXJJbmRleGVzIiwic2hpZnRMb2NhdGlvbiIsIlNsaWRlc0hhbmRsZXIiLCJ3YXRjaFNsaWRlcyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJtdXRhdGlvbiIsIlNsaWRlc0luVmlldyIsInRocmVzaG9sZCIsImludGVyc2VjdGlvbkVudHJ5TWFwIiwiaW5WaWV3Q2FjaGUiLCJub3RJblZpZXdDYWNoZSIsImludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJwYXJlbnRFbGVtZW50IiwiY3JlYXRlSW5WaWV3TGlzdCIsImluVmlldyIsImxpc3QiLCJwYXJzZUludCIsImlzSW50ZXJzZWN0aW5nIiwiaW5WaWV3TWF0Y2giLCJub3RJblZpZXdNYXRjaCIsIlNsaWRlU2l6ZXMiLCJyZWFkRWRnZUdhcCIsIndpdGhFZGdlR2FwIiwic3RhcnRHYXAiLCJtZWFzdXJlU3RhcnRHYXAiLCJlbmRHYXAiLCJtZWFzdXJlRW5kR2FwIiwibWVhc3VyZVdpdGhHYXBzIiwic2xpZGVSZWN0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJTbGlkZXNUb1Njcm9sbCIsImdyb3VwQnlOdW1iZXIiLCJieU51bWJlciIsImdyb3VwU2l6ZSIsImJ5U2l6ZSIsInJlY3RCIiwicmVjdEEiLCJlZGdlQSIsImVkZ2VCIiwiZ2FwQSIsImdhcEIiLCJjaHVua1NpemUiLCJjdXJyZW50U2l6ZSIsInByZXZpb3VzU2l6ZSIsIkVuZ2luZSIsInNjcm9sbEF4aXMiLCJzdGFydEluZGV4IiwiaW5WaWV3VGhyZXNob2xkIiwiX3JlZjIiLCJkcmFnSGFuZGxlciIsIl9yZWYzIiwic2Nyb2xsTG9vcGVyIiwic2xpZGVMb29wZXIiLCJzaG91bGRTZXR0bGUiLCJ3aXRoaW5Cb3VuZHMiLCJoYXNTZXR0bGVkIiwiaGFzU2V0dGxlZEFuZElkbGUiLCJpbnRlcnBvbGF0ZWRMb2NhdGlvbiIsInN0YXJ0TG9jYXRpb24iLCJzbGlkZXNJblZpZXciLCJzbGlkZUZvY3VzIiwicmVzaXplSGFuZGxlciIsInNsaWRlc0hhbmRsZXIiLCJFdmVudEhhbmRsZXIiLCJhcGkiLCJnZXRMaXN0ZW5lcnMiLCJjYiIsIk9wdGlvbnNIYW5kbGVyIiwib3B0aW9uc0EiLCJvcHRpb25zQiIsIm1hdGNoZWRNZWRpYU9wdGlvbnMiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWVkaWFPcHRpb24iLCJvcHRpb25zTWVkaWFRdWVyaWVzIiwib3B0aW9uc0xpc3QiLCJhY2MiLCJtZWRpYVF1ZXJpZXMiLCJQbHVnaW5zSGFuZGxlciIsImFjdGl2ZVBsdWdpbnMiLCJwbHVnaW5zIiwiX3JlZjQiLCJwbHVnaW4iLCJhc3NpZ24iLCJFbWJsYUNhcm91c2VsIiwidXNlclBsdWdpbnMiLCJkZWZhdWx0VmlldyIsInBsdWdpbnNIYW5kbGVyIiwibWVkaWFIYW5kbGVycyIsInJlQWN0aXZhdGUiLCJwbHVnaW5MaXN0IiwicGx1Z2luQXBpcyIsInN0b3JlRWxlbWVudHMiLCJ1c2VyQ29udGFpbmVyIiwidXNlclNsaWRlcyIsImN1c3RvbUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJjaGlsZHJlbiIsImN1c3RvbVNsaWRlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjcmVhdGVFbmdpbmUiLCJvcHRpb25zV2l0aG91dExvb3AiLCJhY3RpdmF0ZSIsIndpdGhPcHRpb25zIiwid2l0aFBsdWdpbnMiLCJfcmVmNSIsInF1ZXJ5Iiwib2Zmc2V0UGFyZW50IiwiZGVBY3RpdmF0ZSIsInByZXYiLCJwcmV2aW91c1Njcm9sbFNuYXAiLCJzbGlkZXNOb3RJblZpZXciLCJzbGlkZU5vZGVzIiwiWVREeW5hbWljc0dhbGxlcnkiLCJkYXRhc2V0Iiwicm1HYWxsZXJ5UmVhZHkiLCJvcmllbnRhdGlvbiIsIm1vYmlsZU9yaWVudGF0aW9uIiwibW9iaWxlQXhpcyIsInRodW1iQXhpcyIsIm1vYmlsZVRodW1iQXhpcyIsInRodW1iTW9iaWxlQXhpcyIsIm5hdk1vZGUiLCJuYXYiLCJkcmFnIiwiYXV0b3BsYXkiLCJhdXRvcGxheURlbGF5IiwiYXV0b3BsYXlQYXVzZSIsIm9wdGlvbnNUaHVtYnMiLCJ2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwiLCJ2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsIiwicHJldlRodW1iQnRuTm9kZSIsIm5leHRUaHVtYkJ0bk5vZGUiLCJwcmV2TWFpbkJ0bk5vZGUiLCJuZXh0TWFpbkJ0bk5vZGUiLCJlbWJsYU1haW4iLCJjbGVhbnVwcyIsImVtYmxhVGh1bWIiLCJzeW5jU2xpZGVzIiwiY29udHJvbCIsInJtR2FsbGVyeVRhYmluZGV4IiwibmF2Tm9kZXMiLCJybUdhbGxlcnlEZXN0cm95IiwiZ2FsbGVyeVRleHQiLCJsYW5nIiwidG9Mb3dlckNhc2UiLCJzdGFydHNXaXRoIiwiaW1hZ2UiLCJvcGVuIiwicHJvZHVjdFNsaWRlIiwidG90YWwiLCJ0ZW1wbGF0ZSIsImNsb25lTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbWFnZVdyYXAiLCJzcmMiLCJhbHQiLCJsb2FkaW5nIiwiaW1hZ2VMb2FkaW5nIiwiY29udGFpbnMiLCJyZXBsYWNlQ2hpbGRyZW4iLCJsaWdodGJveCIsImxpbmsiLCJocmVmIiwicm1MaWdodGJveCIsImxpZ2h0Ym94Q2FwdGlvbiIsImNhcHRpb24iLCJpY29uIiwicHJlcGVuZCIsImFwcGVuZCIsInByb2R1Y3RUaHVtYiIsImFuY2hvckNsYXNzIiwiaXRlbSIsIndyYXAiLCJ1cGRhdGVQcm9kdWN0R2FsbGVyeSIsInJtUHJvZHVjdEdhbGxlcnkiLCJ0aHVtYnMiLCJ0aHVtYkFuY2hvckNsYXNzIiwic2xpZGVUZW1wbGF0ZSIsInRodW1iVGVtcGxhdGUiLCJVSWtpdCIsInByb2R1Y3RHYWxsZXJ5VGV4dCIsInZpZGVvIiwicHJvZHVjdEdhbGxlcnlJdGVtIiwicm1Qcm9kdWN0R2FsbGVyeUl0ZW0iLCJtZWRpYUluZGV4IiwiU3RyaW5nIiwibWVkaWFUeXBlIiwibWVkaWFXcmFwIiwiaW1hZ2VTcmMiLCJwb3N0ZXIiLCJybVByb2R1Y3RHYWxsZXJ5TGlnaHRib3giLCJ1cGRhdGVQcm9kdWN0R2FsbGVyeUdyaWRWaXNpYmlsaXR5IiwidmlzaWJsZUxpbWl0IiwiZXhwYW5kZWQiLCJpdGVtcyIsIm1vcmUiLCJoYXNIaWRkZW5JdGVtcyIsImhpZGVUb2dnbGUiLCJjb2xsYXBzZSIsInRleHRDb250ZW50Iiwic2hvd0xlc3NMYWJlbCIsInNob3dNb3JlTGFiZWwiLCJpbml0UHJvZHVjdEdhbGxlcnlHcmlkIiwicm1Qcm9kdWN0R2FsbGVyeUdyaWRSZWFkeSIsInVwZGF0ZVByb2R1Y3RHYWxsZXJ5R3JpZCIsIml0ZW1UZW1wbGF0ZSIsImluc2VydEJlZm9yZSIsImluaXRHYWxsZXJpZXMiLCJlbGVtZW50IiwiZGVzdHJveUdhbGxlcmllcyIsIm9ic2VydmVHYWxsZXJpZXMiLCJzY29wZSIsInByb2R1Y3QiLCJkZXRhaWwiLCJnYWxsZXJ5IiwiY2xvc2VzdCIsIm1lZGlhQWxsIiwicmVhZHlTdGF0ZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9