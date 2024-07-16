/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/buttons.es6":
/*!*************************!*\
  !*** ./src/buttons.es6 ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addThumbBtnsClickHandlers: () => (/* binding */ addThumbBtnsClickHandlers),
/* harmony export */   addToggleThumbBtnsActive: () => (/* binding */ addToggleThumbBtnsActive)
/* harmony export */ });
const addThumbBtnsClickHandlers = (emblaApiMain, emblaApiThumb) => {
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
const addToggleThumbBtnsActive = (emblaApiMain, emblaApiThumb) => {
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
function Animations(ownerDocument, ownerWindow, update) {
  const documentVisibleHandler = EventStore();
  const timeStep = 1000 / 60;
  let lastTimeStamp = null;
  let animationFrame = 0;
  let lag = 0;
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
    const timeElapsed = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    lag += timeElapsed;
    while (lag >= timeStep) {
      update();
      lag -= timeStep;
    }
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
    update
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
function ScrollBody(location, target, baseDuration, baseFriction) {
  let bodyVelocity = 0;
  let scrollDirection = 0;
  let scrollDuration = baseDuration;
  let scrollFriction = baseFriction;
  let rawLocation = location.get();
  let rawLocationPrevious = 0;
  function seek() {
    const diff = target.get() - location.get();
    const isInstant = !scrollDuration;
    let directionDiff = 0;
    if (isInstant) {
      bodyVelocity = 0;
      location.set(target);
      directionDiff = diff;
    } else {
      bodyVelocity += diff / scrollDuration;
      bodyVelocity *= scrollFriction;
      rawLocation += bodyVelocity;
      location.add(bodyVelocity);
      directionDiff = rawLocation - rawLocationPrevious;
    }
    scrollDirection = mathSign(directionDiff);
    rawLocationPrevious = rawLocation;
    return self;
  }
  function settled() {
    const diff = target.get() - location.get();
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
function ScrollTo(animation, indexCurrent, indexPrevious, scrollTarget, targetVector, eventHandler) {
  function scrollTo(target) {
    const distanceDiff = target.distance;
    const indexDiff = target.index !== indexCurrent.get();
    targetVector.add(distanceDiff);
    if (distanceDiff) animation.start();
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
  const update = _ref2 => {
    let {
      dragHandler,
      eventHandler,
      scrollBody,
      scrollBounds,
      scrollLooper,
      slideLooper,
      translate,
      location,
      animation,
      options: {
        loop
      }
    } = _ref2;
    if (!loop) scrollBounds.constrain(dragHandler.pointerDown());
    scrollBody.seek();
    const shouldSettle = scrollBody.settled();
    const withinBounds = !scrollBounds.shouldConstrain();
    const hasSettled = loop ? shouldSettle : shouldSettle && withinBounds;
    if (hasSettled && !dragHandler.pointerDown()) {
      animation.stop();
      eventHandler.emit('settle');
    }
    if (!hasSettled) eventHandler.emit('scroll');
    if (loop) {
      scrollLooper.loop(scrollBody.direction());
      slideLooper.loop();
    }
    translate.to(location.get());
  };
  const animation = Animations(ownerDocument, ownerWindow, () => update(engine));
  // Shared
  const friction = 0.68;
  const startLocation = scrollSnaps[index.get()];
  const location = Vector1D(startLocation);
  const target = Vector1D(startLocation);
  const scrollBody = ScrollBody(location, target, duration, friction);
  const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
  const scrollTo = ScrollTo(animation, index, indexPrevious, scrollTarget, target, eventHandler);
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
    options,
    resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize, nodeRects),
    scrollBody,
    scrollBounds: ScrollBounds(limit, location, target, scrollBody, percentOfView),
    scrollLooper: ScrollLooper(contentSize, limit, location, [location, target]),
    scrollProgress,
    scrollSnapList: scrollSnaps.map(scrollProgress.get),
    scrollSnaps,
    scrollTarget,
    scrollTo,
    slideLooper: SlideLooper(axis, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, location, slides),
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
    activePlugins = plugins.filter(_ref3 => {
      let {
        options
      } = _ref3;
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
    optionsMediaQueries([optionsBase, ...pluginList.map(_ref4 => {
      let {
        options
      } = _ref4;
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
/* harmony import */ var embla_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! embla-carousel */ "./node_modules/embla-carousel/esm/embla-carousel.esm.js");
/* harmony import */ var _buttons_es6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons.es6 */ "./src/buttons.es6");


class YTDynamicsGallery {
  init() {
    const OPTIONS = {};
    const OPTIONS_THUMBS = {
      axis: 'y',
      dragFree: true,
      loop: true
    };
    const viewportNodeMainCarousel = document.querySelector('.rmslideshow__viewport');
    const viewportNodeThumbCarousel = document.querySelector('.rmslideshow-thumbs__viewport');
    const emblaApiMain = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_1__["default"])(viewportNodeMainCarousel, OPTIONS);
    const emblaApiThumb = (0,embla_carousel__WEBPACK_IMPORTED_MODULE_1__["default"])(viewportNodeThumbCarousel, OPTIONS_THUMBS);
    const removeThumbBtnsClickHandlers = (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_0__.addThumbBtnsClickHandlers)(emblaApiMain, emblaApiThumb);
    const removeToggleThumbBtnsActive = (0,_buttons_es6__WEBPACK_IMPORTED_MODULE_0__.addToggleThumbBtnsActive)(emblaApiMain, emblaApiThumb);
    emblaApiMain.on('destroy', removeThumbBtnsClickHandlers).on('destroy', removeToggleThumbBtnsActive);
    emblaApiThumb.on('destroy', removeThumbBtnsClickHandlers).on('destroy', removeToggleThumbBtnsActive);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  new YTDynamicsGallery().init();
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFFL0Nwa0IsYUFBYSxDQUNScUIsRUFBRSxDQUFDLFNBQVMsRUFBRThpQiw0QkFBNEIsQ0FBQyxDQUMzQzlpQixFQUFFLENBQUMsU0FBUyxFQUFFK2lCLDJCQUEyQixDQUFDO0VBQ25EO0FBQ0o7QUFHQW5NLFFBQVEsQ0FBQ3ZYLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVk7RUFDckQsSUFBSW9qQixpQkFBaUIsQ0FBRCxDQUFDLENBQUV4ZCxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9idXR0b25zLmVzNiIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FsaWdubWVudC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRTdG9yZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQW5pbWF0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvQXhpcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTGltaXQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0RyYWdIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnVHJhY2tlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvTm9kZVJlY3RzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9QZXJjZW50T2ZWaWV3LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9SZXNpemVIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb2R5LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxCb3VuZHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbENvbnRhaW4udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbExpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFByb2dyZXNzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxTbmFwcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVSZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVGFyZ2V0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxUby50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVGb2N1cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvVmVjdG9yMWQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zbGF0ZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVMb29wZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc0luVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVTaXplcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2xpZGVzVG9TY3JvbGwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VuZ2luZS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9PcHRpb25zSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGx1Z2luc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0VtYmxhQ2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4vc3JjL2dhbGxlcnkuZXM2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBhZGRUaHVtYkJ0bnNDbGlja0hhbmRsZXJzID0gKGVtYmxhQXBpTWFpbiwgZW1ibGFBcGlUaHVtYikgPT4ge1xuICAgIGNvbnN0IHNsaWRlc1RodW1icyA9IGVtYmxhQXBpVGh1bWIuc2xpZGVOb2RlcygpXG5cbiAgICBjb25zdCBzY3JvbGxUb0luZGV4ID0gc2xpZGVzVGh1bWJzLm1hcChcbiAgICAgICAgKF8sIGluZGV4KSA9PiAoKSA9PiBlbWJsYUFwaU1haW4uc2Nyb2xsVG8oaW5kZXgpXG4gICAgKVxuXG4gICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBzbGlkZXNUaHVtYnMuZm9yRWFjaCgoc2xpZGVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgc2xpZGVOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsVG9JbmRleFtpbmRleF0sIGZhbHNlKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZFRvZ2dsZVRodW1iQnRuc0FjdGl2ZSA9IChlbWJsYUFwaU1haW4sIGVtYmxhQXBpVGh1bWIpID0+IHtcbiAgICBjb25zdCBzbGlkZXNUaHVtYnMgPSBlbWJsYUFwaVRodW1iLnNsaWRlTm9kZXMoKVxuXG4gICAgY29uc3QgdG9nZ2xlVGh1bWJCdG5zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGVtYmxhQXBpVGh1bWIuc2Nyb2xsVG8oZW1ibGFBcGlNYWluLnNlbGVjdGVkU2Nyb2xsU25hcCgpKVxuICAgICAgICBjb25zdCBwcmV2aW91cyA9IGVtYmxhQXBpTWFpbi5wcmV2aW91c1Njcm9sbFNuYXAoKVxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGVtYmxhQXBpTWFpbi5zZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgICAgICBzbGlkZXNUaHVtYnNbcHJldmlvdXNdLmNsYXNzTGlzdC5yZW1vdmUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJylcbiAgICAgICAgc2xpZGVzVGh1bWJzW3NlbGVjdGVkXS5jbGFzc0xpc3QuYWRkKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpXG4gICAgfVxuXG4gICAgZW1ibGFBcGlNYWluLm9uKCdzZWxlY3QnLCB0b2dnbGVUaHVtYkJ0bnNTdGF0ZSlcbiAgICBlbWJsYUFwaVRodW1iLm9uKCdpbml0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGVtYmxhQXBpTWFpbi5zZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgICAgICBzbGlkZXNUaHVtYnNbc2VsZWN0ZWRdLmNsYXNzTGlzdC5yZW1vdmUoJ3Jtc2xpZGVzaG93LXRodW1ic19fc2xpZGUtLXNlbGVjdGVkJylcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBQb2ludGVyRXZlbnRUeXBlIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcblxuZXhwb3J0IHR5cGUgV2luZG93VHlwZSA9IFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzXG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcihzdWJqZWN0OiB1bmtub3duKTogc3ViamVjdCBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09ICdudW1iZXInXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhzdWJqZWN0OiB1bmtub3duKTogc3ViamVjdCBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09ICdzdHJpbmcnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4oc3ViamVjdDogdW5rbm93bik6IHN1YmplY3QgaXMgYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygc3ViamVjdCA9PT0gJ2Jvb2xlYW4nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChzdWJqZWN0OiB1bmtub3duKTogc3ViamVjdCBpcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRoQWJzKG46IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmFicyhuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0aFNpZ24objogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguc2lnbihuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsdGFBYnModmFsdWVCOiBudW1iZXIsIHZhbHVlQTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIG1hdGhBYnModmFsdWVCIC0gdmFsdWVBKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFjdG9yQWJzKHZhbHVlQjogbnVtYmVyLCB2YWx1ZUE6IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh2YWx1ZUIgPT09IDAgfHwgdmFsdWVBID09PSAwKSByZXR1cm4gMFxuICBpZiAobWF0aEFicyh2YWx1ZUIpIDw9IG1hdGhBYnModmFsdWVBKSkgcmV0dXJuIDBcbiAgY29uc3QgZGlmZiA9IGRlbHRhQWJzKG1hdGhBYnModmFsdWVCKSwgbWF0aEFicyh2YWx1ZUEpKVxuICByZXR1cm4gbWF0aEFicyhkaWZmIC8gdmFsdWVCKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlLZXlzPFR5cGU+KGFycmF5OiBUeXBlW10pOiBudW1iZXJbXSB7XG4gIHJldHVybiBvYmplY3RLZXlzKGFycmF5KS5tYXAoTnVtYmVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlMYXN0PFR5cGU+KGFycmF5OiBUeXBlW10pOiBUeXBlIHtcbiAgcmV0dXJuIGFycmF5W2FycmF5TGFzdEluZGV4KGFycmF5KV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5TGFzdEluZGV4PFR5cGU+KGFycmF5OiBUeXBlW10pOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5SXNMYXN0SW5kZXg8VHlwZT4oYXJyYXk6IFR5cGVbXSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5kZXggPT09IGFycmF5TGFzdEluZGV4KGFycmF5KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlGcm9tTnVtYmVyKG46IG51bWJlciwgc3RhcnRBdDogbnVtYmVyID0gMCk6IG51bWJlcltdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oQXJyYXkobiksIChfLCBpKSA9PiBzdGFydEF0ICsgaSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdEtleXM8VHlwZSBleHRlbmRzIG9iamVjdD4ob2JqZWN0OiBUeXBlKTogc3RyaW5nW10ge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0c01lcmdlRGVlcChcbiAgb2JqZWN0QTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIG9iamVjdEI6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB7XG4gIHJldHVybiBbb2JqZWN0QSwgb2JqZWN0Ql0ucmVkdWNlKChtZXJnZWRPYmplY3RzLCBjdXJyZW50T2JqZWN0KSA9PiB7XG4gICAgb2JqZWN0S2V5cyhjdXJyZW50T2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlQSA9IG1lcmdlZE9iamVjdHNba2V5XVxuICAgICAgY29uc3QgdmFsdWVCID0gY3VycmVudE9iamVjdFtrZXldXG4gICAgICBjb25zdCBhcmVPYmplY3RzID0gaXNPYmplY3QodmFsdWVBKSAmJiBpc09iamVjdCh2YWx1ZUIpXG5cbiAgICAgIG1lcmdlZE9iamVjdHNba2V5XSA9IGFyZU9iamVjdHNcbiAgICAgICAgPyBvYmplY3RzTWVyZ2VEZWVwKHZhbHVlQSwgdmFsdWVCKVxuICAgICAgICA6IHZhbHVlQlxuICAgIH0pXG4gICAgcmV0dXJuIG1lcmdlZE9iamVjdHNcbiAgfSwge30pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01vdXNlRXZlbnQoXG4gIGV2dDogUG9pbnRlckV2ZW50VHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IGV2dCBpcyBNb3VzZUV2ZW50IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygb3duZXJXaW5kb3cuTW91c2VFdmVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBldnQgaW5zdGFuY2VvZiBvd25lcldpbmRvdy5Nb3VzZUV2ZW50XG4gIClcbn1cbiIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50T3B0aW9uVHlwZSA9XG4gIHwgJ3N0YXJ0J1xuICB8ICdjZW50ZXInXG4gIHwgJ2VuZCdcbiAgfCAoKHZpZXdTaXplOiBudW1iZXIsIHNuYXBTaXplOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IG51bWJlcilcblxuZXhwb3J0IHR5cGUgQWxpZ25tZW50VHlwZSA9IHtcbiAgbWVhc3VyZTogKG46IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnbm1lbnQoXG4gIGFsaWduOiBBbGlnbm1lbnRPcHRpb25UeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyXG4pOiBBbGlnbm1lbnRUeXBlIHtcbiAgY29uc3QgcHJlZGVmaW5lZCA9IHsgc3RhcnQsIGNlbnRlciwgZW5kIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiAwXG4gIH1cblxuICBmdW5jdGlvbiBjZW50ZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZW5kKG4pIC8gMlxuICB9XG5cbiAgZnVuY3Rpb24gZW5kKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZpZXdTaXplIC0gblxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChpc1N0cmluZyhhbGlnbikpIHJldHVybiBwcmVkZWZpbmVkW2FsaWduXShuKVxuICAgIHJldHVybiBhbGlnbih2aWV3U2l6ZSwgbiwgaW5kZXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBBbGlnbm1lbnRUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwidHlwZSBFdmVudE5hbWVUeXBlID0ga2V5b2YgRG9jdW1lbnRFdmVudE1hcCB8IGtleW9mIFdpbmRvd0V2ZW50TWFwXG50eXBlIEV2ZW50SGFuZGxlclR5cGUgPSAoZXZ0OiBhbnkpID0+IHZvaWRcbnR5cGUgRXZlbnRPcHRpb25zVHlwZSA9IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyB8IHVuZGVmaW5lZFxudHlwZSBFdmVudFJlbW92ZXJUeXBlID0gKCkgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBFdmVudFN0b3JlVHlwZSA9IHtcbiAgYWRkOiAoXG4gICAgbm9kZTogRXZlbnRUYXJnZXQsXG4gICAgdHlwZTogRXZlbnROYW1lVHlwZSxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICAgIG9wdGlvbnM/OiBFdmVudE9wdGlvbnNUeXBlXG4gICkgPT4gRXZlbnRTdG9yZVR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50U3RvcmUoKTogRXZlbnRTdG9yZVR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBFdmVudFJlbW92ZXJUeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGFkZChcbiAgICBub2RlOiBFdmVudFRhcmdldCxcbiAgICB0eXBlOiBFdmVudE5hbWVUeXBlLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gICAgb3B0aW9uczogRXZlbnRPcHRpb25zVHlwZSA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICk6IEV2ZW50U3RvcmVUeXBlIHtcbiAgICBsZXQgcmVtb3ZlTGlzdGVuZXI6IEV2ZW50UmVtb3ZlclR5cGVcblxuICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gbm9kZSkge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpXG4gICAgICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWdhY3lNZWRpYVF1ZXJ5TGlzdCA9IDxNZWRpYVF1ZXJ5TGlzdD5ub2RlXG4gICAgICBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihoYW5kbGVyKVxuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiBsZWdhY3lNZWRpYVF1ZXJ5TGlzdC5yZW1vdmVMaXN0ZW5lcihoYW5kbGVyKVxuICAgIH1cblxuICAgIGxpc3RlbmVycy5wdXNoKHJlbW92ZUxpc3RlbmVyKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKChyZW1vdmUpID0+IHJlbW92ZSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRTdG9yZVR5cGUgPSB7XG4gICAgYWRkLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uc1VwZGF0ZVR5cGUgPSAoZW5naW5lOiBFbmdpbmVUeXBlKSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNUeXBlID0ge1xuICBpbml0OiAoKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgc3RhcnQ6ICgpID0+IHZvaWRcbiAgc3RvcDogKCkgPT4gdm9pZFxuICB1cGRhdGU6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFuaW1hdGlvbnMoXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdXBkYXRlOiBBbmltYXRpb25zVHlwZVsndXBkYXRlJ11cbik6IEFuaW1hdGlvbnNUeXBlIHtcbiAgY29uc3QgZG9jdW1lbnRWaXNpYmxlSGFuZGxlciA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCB0aW1lU3RlcCA9IDEwMDAgLyA2MFxuICBsZXQgbGFzdFRpbWVTdGFtcDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IGFuaW1hdGlvbkZyYW1lID0gMFxuICBsZXQgbGFnID0gMFxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgZG9jdW1lbnRWaXNpYmxlSGFuZGxlci5hZGQob3duZXJEb2N1bWVudCwgJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAob3duZXJEb2N1bWVudC5oaWRkZW4pIHJlc2V0KClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdG9wKClcbiAgICBkb2N1bWVudFZpc2libGVIYW5kbGVyLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUodGltZVN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKTogdm9pZCB7XG4gICAgaWYgKCFhbmltYXRpb25GcmFtZSkgcmV0dXJuXG4gICAgaWYgKCFsYXN0VGltZVN0YW1wKSBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG5cbiAgICBjb25zdCB0aW1lRWxhcHNlZCA9IHRpbWVTdGFtcCAtIGxhc3RUaW1lU3RhbXBcbiAgICBsYXN0VGltZVN0YW1wID0gdGltZVN0YW1wXG4gICAgbGFnICs9IHRpbWVFbGFwc2VkXG5cbiAgICB3aGlsZSAobGFnID49IHRpbWVTdGVwKSB7XG4gICAgICB1cGRhdGUoKVxuICAgICAgbGFnIC09IHRpbWVTdGVwXG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCk6IHZvaWQge1xuICAgIGlmIChhbmltYXRpb25GcmFtZSkgcmV0dXJuXG5cbiAgICBhbmltYXRpb25GcmFtZSA9IG93bmVyV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpOiB2b2lkIHtcbiAgICBvd25lcldpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSlcbiAgICBsYXN0VGltZVN0YW1wID0gbnVsbFxuICAgIGxhZyA9IDBcbiAgICBhbmltYXRpb25GcmFtZSA9IDBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCk6IHZvaWQge1xuICAgIGxhc3RUaW1lU3RhbXAgPSBudWxsXG4gICAgbGFnID0gMFxuICB9XG5cbiAgY29uc3Qgc2VsZjogQW5pbWF0aW9uc1R5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHN0YXJ0LFxuICAgIHN0b3AsXG4gICAgdXBkYXRlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuXG5leHBvcnQgdHlwZSBBeGlzT3B0aW9uVHlwZSA9ICd4JyB8ICd5J1xuZXhwb3J0IHR5cGUgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUgPSAnbHRyJyB8ICdydGwnXG50eXBlIEF4aXNFZGdlVHlwZSA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnXG5cbmV4cG9ydCB0eXBlIEF4aXNUeXBlID0ge1xuICBzY3JvbGw6IEF4aXNPcHRpb25UeXBlXG4gIGNyb3NzOiBBeGlzT3B0aW9uVHlwZVxuICBzdGFydEVkZ2U6IEF4aXNFZGdlVHlwZVxuICBlbmRFZGdlOiBBeGlzRWRnZVR5cGVcbiAgbWVhc3VyZVNpemU6IChub2RlUmVjdDogTm9kZVJlY3RUeXBlKSA9PiBudW1iZXJcbiAgZGlyZWN0aW9uOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF4aXMoXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlLFxuICBjb250ZW50RGlyZWN0aW9uOiBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZVxuKTogQXhpc1R5cGUge1xuICBjb25zdCBpc1JpZ2h0VG9MZWZ0ID0gY29udGVudERpcmVjdGlvbiA9PT0gJ3J0bCdcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IGF4aXMgPT09ICd5J1xuICBjb25zdCBzY3JvbGwgPSBpc1ZlcnRpY2FsID8gJ3knIDogJ3gnXG4gIGNvbnN0IGNyb3NzID0gaXNWZXJ0aWNhbCA/ICd4JyA6ICd5J1xuICBjb25zdCBzaWduID0gIWlzVmVydGljYWwgJiYgaXNSaWdodFRvTGVmdCA/IC0xIDogMVxuICBjb25zdCBzdGFydEVkZ2UgPSBnZXRTdGFydEVkZ2UoKVxuICBjb25zdCBlbmRFZGdlID0gZ2V0RW5kRWRnZSgpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVNpemUobm9kZVJlY3Q6IE5vZGVSZWN0VHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBub2RlUmVjdFxuICAgIHJldHVybiBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXJ0RWRnZSgpOiBBeGlzRWRnZVR5cGUge1xuICAgIGlmIChpc1ZlcnRpY2FsKSByZXR1cm4gJ3RvcCdcbiAgICByZXR1cm4gaXNSaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZEVkZ2UoKTogQXhpc0VkZ2VUeXBlIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkgcmV0dXJuICdib3R0b20nXG4gICAgcmV0dXJuIGlzUmlnaHRUb0xlZnQgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cblxuICBmdW5jdGlvbiBkaXJlY3Rpb24objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbiAqIHNpZ25cbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEF4aXNUeXBlID0ge1xuICAgIHNjcm9sbCxcbiAgICBjcm9zcyxcbiAgICBzdGFydEVkZ2UsXG4gICAgZW5kRWRnZSxcbiAgICBtZWFzdXJlU2l6ZSxcbiAgICBkaXJlY3Rpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aEFicyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIExpbWl0VHlwZSA9IHtcbiAgbWluOiBudW1iZXJcbiAgbWF4OiBudW1iZXJcbiAgbGVuZ3RoOiBudW1iZXJcbiAgY29uc3RyYWluOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbiAgcmVhY2hlZEFueTogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZWFjaGVkTWF4OiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlYWNoZWRNaW46IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVtb3ZlT2Zmc2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbWl0KG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAwKTogTGltaXRUeXBlIHtcbiAgY29uc3QgbGVuZ3RoID0gbWF0aEFicyhtaW4gLSBtYXgpXG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1pbihuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA8IG1pblxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZE1heChuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbiA+IG1heFxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY2hlZEFueShuOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVhY2hlZE1pbihuKSB8fCByZWFjaGVkTWF4KG4pXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJhaW4objogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIXJlYWNoZWRBbnkobikpIHJldHVybiBuXG4gICAgcmV0dXJuIHJlYWNoZWRNaW4obikgPyBtaW4gOiBtYXhcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU9mZnNldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICghbGVuZ3RoKSByZXR1cm4gblxuICAgIHJldHVybiBuIC0gbGVuZ3RoICogTWF0aC5jZWlsKChuIC0gbWF4KSAvIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IExpbWl0VHlwZSA9IHtcbiAgICBsZW5ndGgsXG4gICAgbWF4LFxuICAgIG1pbixcbiAgICBjb25zdHJhaW4sXG4gICAgcmVhY2hlZEFueSxcbiAgICByZWFjaGVkTWF4LFxuICAgIHJlYWNoZWRNaW4sXG4gICAgcmVtb3ZlT2Zmc2V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0IH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBDb3VudGVyVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogbnVtYmVyKSA9PiBDb3VudGVyVHlwZVxuICBhZGQ6IChuOiBudW1iZXIpID0+IENvdW50ZXJUeXBlXG4gIGNsb25lOiAoKSA9PiBDb3VudGVyVHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ291bnRlcihcbiAgbWF4OiBudW1iZXIsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGxvb3A6IGJvb2xlYW5cbik6IENvdW50ZXJUeXBlIHtcbiAgY29uc3QgeyBjb25zdHJhaW4gfSA9IExpbWl0KDAsIG1heClcbiAgY29uc3QgbG9vcEVuZCA9IG1heCArIDFcbiAgbGV0IGNvdW50ZXIgPSB3aXRoaW5MaW1pdChzdGFydClcblxuICBmdW5jdGlvbiB3aXRoaW5MaW1pdChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiAhbG9vcCA/IGNvbnN0cmFpbihuKSA6IG1hdGhBYnMoKGxvb3BFbmQgKyBuKSAlIGxvb3BFbmQpXG4gIH1cblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY291bnRlclxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICBjb3VudGVyID0gd2l0aGluTGltaXQobilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKG46IG51bWJlcik6IENvdW50ZXJUeXBlIHtcbiAgICByZXR1cm4gY2xvbmUoKS5zZXQoZ2V0KCkgKyBuKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmUoKTogQ291bnRlclR5cGUge1xuICAgIHJldHVybiBDb3VudGVyKG1heCwgZ2V0KCksIGxvb3ApXG4gIH1cblxuICBjb25zdCBzZWxmOiBDb3VudGVyVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBjbG9uZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEFuaW1hdGlvbnNUeXBlIH0gZnJvbSAnLi9BbmltYXRpb25zJ1xuaW1wb3J0IHsgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlclR5cGUsIFBvaW50ZXJFdmVudFR5cGUgfSBmcm9tICcuL0RyYWdUcmFja2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXRUeXBlIH0gZnJvbSAnLi9TY3JvbGxUYXJnZXQnXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgTGltaXQgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHtcbiAgZGVsdGFBYnMsXG4gIGZhY3RvckFicyxcbiAgaXNCb29sZWFuLFxuICBpc01vdXNlRXZlbnQsXG4gIG1hdGhBYnMsXG4gIG1hdGhTaWduLFxuICBXaW5kb3dUeXBlXG59IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgRHJhZ0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgZXZ0OiBQb2ludGVyRXZlbnRUeXBlXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIERyYWdIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBEcmFnSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBEcmFnSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBwb2ludGVyRG93bjogKCkgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhZ0hhbmRsZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICByb290Tm9kZTogSFRNTEVsZW1lbnQsXG4gIG93bmVyRG9jdW1lbnQ6IERvY3VtZW50LFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGRyYWdUcmFja2VyOiBEcmFnVHJhY2tlclR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGUsXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBzY3JvbGxUYXJnZXQ6IFNjcm9sbFRhcmdldFR5cGUsXG4gIGluZGV4OiBDb3VudGVyVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZSxcbiAgZHJhZ0ZyZWU6IGJvb2xlYW4sXG4gIGRyYWdUaHJlc2hvbGQ6IG51bWJlcixcbiAgc2tpcFNuYXBzOiBib29sZWFuLFxuICBiYXNlRnJpY3Rpb246IG51bWJlcixcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbik6IERyYWdIYW5kbGVyVHlwZSB7XG4gIGNvbnN0IHsgY3Jvc3M6IGNyb3NzQXhpcywgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGZvY3VzTm9kZXMgPSBbJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddXG4gIGNvbnN0IG5vblBhc3NpdmVFdmVudCA9IHsgcGFzc2l2ZTogZmFsc2UgfVxuICBjb25zdCBpbml0RXZlbnRzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGRyYWdFdmVudHMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZ29Ub05leHRUaHJlc2hvbGQgPSBMaW1pdCg1MCwgMjI1KS5jb25zdHJhaW4ocGVyY2VudE9mVmlldy5tZWFzdXJlKDIwKSlcbiAgY29uc3Qgc25hcEZvcmNlQm9vc3QgPSB7IG1vdXNlOiAzMDAsIHRvdWNoOiA0MDAgfVxuICBjb25zdCBmcmVlRm9yY2VCb29zdCA9IHsgbW91c2U6IDUwMCwgdG91Y2g6IDYwMCB9XG4gIGNvbnN0IGJhc2VTcGVlZCA9IGRyYWdGcmVlID8gNDMgOiAyNVxuXG4gIGxldCBpc01vdmluZyA9IGZhbHNlXG4gIGxldCBzdGFydFNjcm9sbCA9IDBcbiAgbGV0IHN0YXJ0Q3Jvc3MgPSAwXG4gIGxldCBwb2ludGVySXNEb3duID0gZmFsc2VcbiAgbGV0IHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICBsZXQgcHJldmVudENsaWNrID0gZmFsc2VcbiAgbGV0IGlzTW91c2UgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaERyYWcpIHJldHVyblxuXG4gICAgZnVuY3Rpb24gZG93bklmQWxsb3dlZChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hEcmFnKSB8fCB3YXRjaERyYWcoZW1ibGFBcGksIGV2dCkpIGRvd24oZXZ0KVxuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSByb290Tm9kZVxuICAgIGluaXRFdmVudHNcbiAgICAgIC5hZGQobm9kZSwgJ2RyYWdzdGFydCcsIChldnQpID0+IGV2dC5wcmV2ZW50RGVmYXVsdCgpLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCAoKSA9PiB1bmRlZmluZWQsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoZW5kJywgKCkgPT4gdW5kZWZpbmVkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hzdGFydCcsIGRvd25JZkFsbG93ZWQpXG4gICAgICAuYWRkKG5vZGUsICdtb3VzZWRvd24nLCBkb3duSWZBbGxvd2VkKVxuICAgICAgLmFkZChub2RlLCAndG91Y2hjYW5jZWwnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ2NvbnRleHRtZW51JywgdXApXG4gICAgICAuYWRkKG5vZGUsICdjbGljaycsIGNsaWNrLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpbml0RXZlbnRzLmNsZWFyKClcbiAgICBkcmFnRXZlbnRzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZERyYWdFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IGlzTW91c2UgPyBvd25lckRvY3VtZW50IDogcm9vdE5vZGVcbiAgICBkcmFnRXZlbnRzXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaG1vdmUnLCBtb3ZlLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGVuZCcsIHVwKVxuICAgICAgLmFkZChub2RlLCAnbW91c2Vtb3ZlJywgbW92ZSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAnbW91c2V1cCcsIHVwKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNGb2N1c05vZGUobm9kZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZSB8fCAnJ1xuICAgIHJldHVybiBmb2N1c05vZGVzLmluY2x1ZGVzKG5vZGVOYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gZm9yY2VCb29zdCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGJvb3N0ID0gZHJhZ0ZyZWUgPyBmcmVlRm9yY2VCb29zdCA6IHNuYXBGb3JjZUJvb3N0XG4gICAgY29uc3QgdHlwZSA9IGlzTW91c2UgPyAnbW91c2UnIDogJ3RvdWNoJ1xuICAgIHJldHVybiBib29zdFt0eXBlXVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsb3dlZEZvcmNlKGZvcmNlOiBudW1iZXIsIHRhcmdldENoYW5nZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuICAgIGNvbnN0IG5leHQgPSBpbmRleC5hZGQobWF0aFNpZ24oZm9yY2UpICogLTEpXG4gICAgY29uc3QgYmFzZUZvcmNlID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2UoZm9yY2UsICFkcmFnRnJlZSkuZGlzdGFuY2VcblxuICAgIGlmIChkcmFnRnJlZSB8fCBtYXRoQWJzKGZvcmNlKSA8IGdvVG9OZXh0VGhyZXNob2xkKSByZXR1cm4gYmFzZUZvcmNlXG4gICAgaWYgKHNraXBTbmFwcyAmJiB0YXJnZXRDaGFuZ2VkKSByZXR1cm4gYmFzZUZvcmNlICogMC41XG5cbiAgICByZXR1cm4gc2Nyb2xsVGFyZ2V0LmJ5SW5kZXgobmV4dC5nZXQoKSwgMCkuZGlzdGFuY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd24oZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNNb3VzZUV2dCA9IGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KVxuICAgIGlzTW91c2UgPSBpc01vdXNlRXZ0XG4gICAgcHJldmVudENsaWNrID0gZHJhZ0ZyZWUgJiYgaXNNb3VzZUV2dCAmJiAhZXZ0LmJ1dHRvbnMgJiYgaXNNb3ZpbmdcbiAgICBpc01vdmluZyA9IGRlbHRhQWJzKHRhcmdldC5nZXQoKSwgbG9jYXRpb24uZ2V0KCkpID49IDJcblxuICAgIGlmIChpc01vdXNlRXZ0ICYmIGV2dC5idXR0b24gIT09IDApIHJldHVyblxuICAgIGlmIChpc0ZvY3VzTm9kZShldnQudGFyZ2V0IGFzIEVsZW1lbnQpKSByZXR1cm5cblxuICAgIHBvaW50ZXJJc0Rvd24gPSB0cnVlXG4gICAgZHJhZ1RyYWNrZXIucG9pbnRlckRvd24oZXZ0KVxuICAgIHNjcm9sbEJvZHkudXNlRnJpY3Rpb24oMCkudXNlRHVyYXRpb24oMClcbiAgICB0YXJnZXQuc2V0KGxvY2F0aW9uKVxuICAgIGFkZERyYWdFdmVudHMoKVxuICAgIHN0YXJ0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBzdGFydENyb3NzID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dCwgY3Jvc3NBeGlzKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb2ludGVyRG93bicpXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzVG91Y2hFdnQgPSAhaXNNb3VzZUV2ZW50KGV2dCwgb3duZXJXaW5kb3cpXG4gICAgaWYgKGlzVG91Y2hFdnQgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDIpIHJldHVybiB1cChldnQpXG5cbiAgICBjb25zdCBsYXN0U2Nyb2xsID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dClcbiAgICBjb25zdCBsYXN0Q3Jvc3MgPSBkcmFnVHJhY2tlci5yZWFkUG9pbnQoZXZ0LCBjcm9zc0F4aXMpXG4gICAgY29uc3QgZGlmZlNjcm9sbCA9IGRlbHRhQWJzKGxhc3RTY3JvbGwsIHN0YXJ0U2Nyb2xsKVxuICAgIGNvbnN0IGRpZmZDcm9zcyA9IGRlbHRhQWJzKGxhc3RDcm9zcywgc3RhcnRDcm9zcylcblxuICAgIGlmICghcHJldmVudFNjcm9sbCAmJiAhaXNNb3VzZSkge1xuICAgICAgaWYgKCFldnQuY2FuY2VsYWJsZSkgcmV0dXJuIHVwKGV2dClcbiAgICAgIHByZXZlbnRTY3JvbGwgPSBkaWZmU2Nyb2xsID4gZGlmZkNyb3NzXG4gICAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHJldHVybiB1cChldnQpXG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBkcmFnVHJhY2tlci5wb2ludGVyTW92ZShldnQpXG4gICAgaWYgKGRpZmZTY3JvbGwgPiBkcmFnVGhyZXNob2xkKSBwcmV2ZW50Q2xpY2sgPSB0cnVlXG5cbiAgICBzY3JvbGxCb2R5LnVzZUZyaWN0aW9uKDAuMykudXNlRHVyYXRpb24oMC43NSlcbiAgICBhbmltYXRpb24uc3RhcnQoKVxuICAgIHRhcmdldC5hZGQoZGlyZWN0aW9uKGRpZmYpKVxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TG9jYXRpb24gPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZSgwLCBmYWxzZSlcbiAgICBjb25zdCB0YXJnZXRDaGFuZ2VkID0gY3VycmVudExvY2F0aW9uLmluZGV4ICE9PSBpbmRleC5nZXQoKVxuICAgIGNvbnN0IHJhd0ZvcmNlID0gZHJhZ1RyYWNrZXIucG9pbnRlclVwKGV2dCkgKiBmb3JjZUJvb3N0KClcbiAgICBjb25zdCBmb3JjZSA9IGFsbG93ZWRGb3JjZShkaXJlY3Rpb24ocmF3Rm9yY2UpLCB0YXJnZXRDaGFuZ2VkKVxuICAgIGNvbnN0IGZvcmNlRmFjdG9yID0gZmFjdG9yQWJzKHJhd0ZvcmNlLCBmb3JjZSlcbiAgICBjb25zdCBzcGVlZCA9IGJhc2VTcGVlZCAtIDEwICogZm9yY2VGYWN0b3JcbiAgICBjb25zdCBmcmljdGlvbiA9IGJhc2VGcmljdGlvbiArIGZvcmNlRmFjdG9yIC8gNTBcblxuICAgIHByZXZlbnRTY3JvbGwgPSBmYWxzZVxuICAgIHBvaW50ZXJJc0Rvd24gPSBmYWxzZVxuICAgIGRyYWdFdmVudHMuY2xlYXIoKVxuICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oc3BlZWQpLnVzZUZyaWN0aW9uKGZyaWN0aW9uKVxuICAgIHNjcm9sbFRvLmRpc3RhbmNlKGZvcmNlLCAhZHJhZ0ZyZWUpXG4gICAgaXNNb3VzZSA9IGZhbHNlXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3BvaW50ZXJVcCcpXG4gIH1cblxuICBmdW5jdGlvbiBjbGljayhldnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAocHJldmVudENsaWNrKSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBwcmV2ZW50Q2xpY2sgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb2ludGVySXNEb3duXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIHBvaW50ZXJEb3duXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNPcHRpb25UeXBlLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGlzTW91c2VFdmVudCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgUG9pbnRlckNvb3JkVHlwZSA9IGtleW9mIFRvdWNoIHwga2V5b2YgTW91c2VFdmVudFxuZXhwb3J0IHR5cGUgUG9pbnRlckV2ZW50VHlwZSA9IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50XG5cbmV4cG9ydCB0eXBlIERyYWdUcmFja2VyVHlwZSA9IHtcbiAgcG9pbnRlckRvd246IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICBwb2ludGVyTW92ZTogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHBvaW50ZXJVcDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSkgPT4gbnVtYmVyXG4gIHJlYWRQb2ludDogKGV2dDogUG9pbnRlckV2ZW50VHlwZSwgZXZ0QXhpcz86IEF4aXNPcHRpb25UeXBlKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdUcmFja2VyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IERyYWdUcmFja2VyVHlwZSB7XG4gIGNvbnN0IGxvZ0ludGVydmFsID0gMTcwXG5cbiAgbGV0IHN0YXJ0RXZlbnQ6IFBvaW50ZXJFdmVudFR5cGVcbiAgbGV0IGxhc3RFdmVudDogUG9pbnRlckV2ZW50VHlwZVxuXG4gIGZ1bmN0aW9uIHJlYWRUaW1lKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGV2dC50aW1lU3RhbXBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRQb2ludChldnQ6IFBvaW50ZXJFdmVudFR5cGUsIGV2dEF4aXM/OiBBeGlzT3B0aW9uVHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgcHJvcGVydHkgPSBldnRBeGlzIHx8IGF4aXMuc2Nyb2xsXG4gICAgY29uc3QgY29vcmQ6IFBvaW50ZXJDb29yZFR5cGUgPSBgY2xpZW50JHtwcm9wZXJ0eSA9PT0gJ3gnID8gJ1gnIDogJ1knfWBcbiAgICByZXR1cm4gKGlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KSA/IGV2dCA6IGV2dC50b3VjaGVzWzBdKVtjb29yZF1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJEb3duKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgc3RhcnRFdmVudCA9IGV2dFxuICAgIGxhc3RFdmVudCA9IGV2dFxuICAgIHJldHVybiByZWFkUG9pbnQoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlck1vdmUoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gcmVhZFBvaW50KGV2dCkgLSByZWFkUG9pbnQobGFzdEV2ZW50KVxuICAgIGNvbnN0IGV4cGlyZWQgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUoc3RhcnRFdmVudCkgPiBsb2dJbnRlcnZhbFxuXG4gICAgbGFzdEV2ZW50ID0gZXZ0XG4gICAgaWYgKGV4cGlyZWQpIHN0YXJ0RXZlbnQgPSBldnRcbiAgICByZXR1cm4gZGlmZlxuICB9XG5cbiAgZnVuY3Rpb24gcG9pbnRlclVwKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgaWYgKCFzdGFydEV2ZW50IHx8ICFsYXN0RXZlbnQpIHJldHVybiAwXG4gICAgY29uc3QgZGlmZkRyYWcgPSByZWFkUG9pbnQobGFzdEV2ZW50KSAtIHJlYWRQb2ludChzdGFydEV2ZW50KVxuICAgIGNvbnN0IGRpZmZUaW1lID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKHN0YXJ0RXZlbnQpXG4gICAgY29uc3QgZXhwaXJlZCA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShsYXN0RXZlbnQpID4gbG9nSW50ZXJ2YWxcbiAgICBjb25zdCBmb3JjZSA9IGRpZmZEcmFnIC8gZGlmZlRpbWVcbiAgICBjb25zdCBpc0ZsaWNrID0gZGlmZlRpbWUgJiYgIWV4cGlyZWQgJiYgbWF0aEFicyhmb3JjZSkgPiAwLjFcblxuICAgIHJldHVybiBpc0ZsaWNrID8gZm9yY2UgOiAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBEcmFnVHJhY2tlclR5cGUgPSB7XG4gICAgcG9pbnRlckRvd24sXG4gICAgcG9pbnRlck1vdmUsXG4gICAgcG9pbnRlclVwLFxuICAgIHJlYWRQb2ludFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJleHBvcnQgdHlwZSBOb2RlUmVjdFR5cGUgPSB7XG4gIHRvcDogbnVtYmVyXG4gIHJpZ2h0OiBudW1iZXJcbiAgYm90dG9tOiBudW1iZXJcbiAgbGVmdDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTm9kZVJlY3RzVHlwZSA9IHtcbiAgbWVhc3VyZTogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBOb2RlUmVjdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGVSZWN0cygpOiBOb2RlUmVjdHNUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShub2RlOiBIVE1MRWxlbWVudCk6IE5vZGVSZWN0VHlwZSB7XG4gICAgY29uc3QgeyBvZmZzZXRUb3AsIG9mZnNldExlZnQsIG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IG5vZGVcbiAgICBjb25zdCBvZmZzZXQ6IE5vZGVSZWN0VHlwZSA9IHtcbiAgICAgIHRvcDogb2Zmc2V0VG9wLFxuICAgICAgcmlnaHQ6IG9mZnNldExlZnQgKyBvZmZzZXRXaWR0aCxcbiAgICAgIGJvdHRvbTogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxuICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgIHdpZHRoOiBvZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogb2Zmc2V0SGVpZ2h0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgY29uc3Qgc2VsZjogTm9kZVJlY3RzVHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImV4cG9ydCB0eXBlIFBlcmNlbnRPZlZpZXdUeXBlID0ge1xuICBtZWFzdXJlOiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnRPZlZpZXcodmlld1NpemU6IG51bWJlcik6IFBlcmNlbnRPZlZpZXdUeXBlIHtcbiAgZnVuY3Rpb24gbWVhc3VyZShuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAqIChuIC8gMTAwKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGVyY2VudE9mVmlld1R5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgTm9kZVJlY3RzVHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgaXNCb29sZWFuLCBtYXRoQWJzLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBSZXNpemVIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFJlc2l6ZUhhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlc2l6ZUhhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgYXhpczogQXhpc1R5cGUsXG4gIHdhdGNoUmVzaXplOiBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSxcbiAgbm9kZVJlY3RzOiBOb2RlUmVjdHNUeXBlXG4pOiBSZXNpemVIYW5kbGVyVHlwZSB7XG4gIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXJcbiAgbGV0IGNvbnRhaW5lclNpemU6IG51bWJlclxuICBsZXQgc2xpZGVTaXplczogbnVtYmVyW10gPSBbXVxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiByZWFkU2l6ZShub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGF4aXMubWVhc3VyZVNpemUobm9kZVJlY3RzLm1lYXN1cmUobm9kZSkpXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hSZXNpemUpIHJldHVyblxuXG4gICAgY29udGFpbmVyU2l6ZSA9IHJlYWRTaXplKGNvbnRhaW5lcilcbiAgICBzbGlkZVNpemVzID0gc2xpZGVzLm1hcChyZWFkU2l6ZSlcblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICBjb25zdCBpc0NvbnRhaW5lciA9IGVudHJ5LnRhcmdldCA9PT0gY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICBjb25zdCBsYXN0U2l6ZSA9IGlzQ29udGFpbmVyID8gY29udGFpbmVyU2l6ZSA6IHNsaWRlU2l6ZXNbc2xpZGVJbmRleF1cbiAgICAgICAgY29uc3QgbmV3U2l6ZSA9IHJlYWRTaXplKGlzQ29udGFpbmVyID8gY29udGFpbmVyIDogc2xpZGVzW3NsaWRlSW5kZXhdKVxuICAgICAgICBjb25zdCBkaWZmU2l6ZSA9IG1hdGhBYnMobmV3U2l6ZSAtIGxhc3RTaXplKVxuXG4gICAgICAgIGlmIChkaWZmU2l6ZSA+PSAwLjUpIHtcbiAgICAgICAgICBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgZW1ibGFBcGkucmVJbml0KClcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZXNpemUnKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICAgIGlmIChpc0Jvb2xlYW4od2F0Y2hSZXNpemUpIHx8IHdhdGNoUmVzaXplKGVtYmxhQXBpLCBlbnRyaWVzKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2soZW50cmllcylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgb2JzZXJ2ZU5vZGVzID0gW2NvbnRhaW5lcl0uY29uY2F0KHNsaWRlcylcbiAgICBvYnNlcnZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShub2RlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBzZWxmOiBSZXNpemVIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgbWF0aFNpZ24sIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQm9keVR5cGUgPSB7XG4gIGRpcmVjdGlvbjogKCkgPT4gbnVtYmVyXG4gIGR1cmF0aW9uOiAoKSA9PiBudW1iZXJcbiAgdmVsb2NpdHk6ICgpID0+IG51bWJlclxuICBzZWVrOiAoKSA9PiBTY3JvbGxCb2R5VHlwZVxuICBzZXR0bGVkOiAoKSA9PiBib29sZWFuXG4gIHVzZUJhc2VGcmljdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlQmFzZUR1cmF0aW9uOiAoKSA9PiBTY3JvbGxCb2R5VHlwZVxuICB1c2VGcmljdGlvbjogKG46IG51bWJlcikgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRHVyYXRpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxCb2R5KFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICB0YXJnZXQ6IFZlY3RvcjFEVHlwZSxcbiAgYmFzZUR1cmF0aW9uOiBudW1iZXIsXG4gIGJhc2VGcmljdGlvbjogbnVtYmVyXG4pOiBTY3JvbGxCb2R5VHlwZSB7XG4gIGxldCBib2R5VmVsb2NpdHkgPSAwXG4gIGxldCBzY3JvbGxEaXJlY3Rpb24gPSAwXG4gIGxldCBzY3JvbGxEdXJhdGlvbiA9IGJhc2VEdXJhdGlvblxuICBsZXQgc2Nyb2xsRnJpY3Rpb24gPSBiYXNlRnJpY3Rpb25cbiAgbGV0IHJhd0xvY2F0aW9uID0gbG9jYXRpb24uZ2V0KClcbiAgbGV0IHJhd0xvY2F0aW9uUHJldmlvdXMgPSAwXG5cbiAgZnVuY3Rpb24gc2VlaygpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgY29uc3QgZGlmZiA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgY29uc3QgaXNJbnN0YW50ID0gIXNjcm9sbER1cmF0aW9uXG4gICAgbGV0IGRpcmVjdGlvbkRpZmYgPSAwXG5cbiAgICBpZiAoaXNJbnN0YW50KSB7XG4gICAgICBib2R5VmVsb2NpdHkgPSAwXG4gICAgICBsb2NhdGlvbi5zZXQodGFyZ2V0KVxuXG4gICAgICBkaXJlY3Rpb25EaWZmID0gZGlmZlxuICAgIH0gZWxzZSB7XG4gICAgICBib2R5VmVsb2NpdHkgKz0gZGlmZiAvIHNjcm9sbER1cmF0aW9uXG4gICAgICBib2R5VmVsb2NpdHkgKj0gc2Nyb2xsRnJpY3Rpb25cbiAgICAgIHJhd0xvY2F0aW9uICs9IGJvZHlWZWxvY2l0eVxuICAgICAgbG9jYXRpb24uYWRkKGJvZHlWZWxvY2l0eSlcblxuICAgICAgZGlyZWN0aW9uRGlmZiA9IHJhd0xvY2F0aW9uIC0gcmF3TG9jYXRpb25QcmV2aW91c1xuICAgIH1cblxuICAgIHNjcm9sbERpcmVjdGlvbiA9IG1hdGhTaWduKGRpcmVjdGlvbkRpZmYpXG4gICAgcmF3TG9jYXRpb25QcmV2aW91cyA9IHJhd0xvY2F0aW9uXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHRsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZiA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgcmV0dXJuIG1hdGhBYnMoZGlmZikgPCAwLjAwMVxuICB9XG5cbiAgZnVuY3Rpb24gZHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsRHVyYXRpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpcmVjdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBzY3JvbGxEaXJlY3Rpb25cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlbG9jaXR5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGJvZHlWZWxvY2l0eVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlQmFzZUR1cmF0aW9uKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICByZXR1cm4gdXNlRHVyYXRpb24oYmFzZUR1cmF0aW9uKVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlQmFzZUZyaWN0aW9uKCk6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICByZXR1cm4gdXNlRnJpY3Rpb24oYmFzZUZyaWN0aW9uKVxuICB9XG5cbiAgZnVuY3Rpb24gdXNlRHVyYXRpb24objogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHNjcm9sbER1cmF0aW9uID0gblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiB1c2VGcmljdGlvbihuOiBudW1iZXIpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgc2Nyb2xsRnJpY3Rpb24gPSBuXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbEJvZHlUeXBlID0ge1xuICAgIGRpcmVjdGlvbixcbiAgICBkdXJhdGlvbixcbiAgICB2ZWxvY2l0eSxcbiAgICBzZWVrLFxuICAgIHNldHRsZWQsXG4gICAgdXNlQmFzZUZyaWN0aW9uLFxuICAgIHVzZUJhc2VEdXJhdGlvbixcbiAgICB1c2VGcmljdGlvbixcbiAgICB1c2VEdXJhdGlvblxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgUGVyY2VudE9mVmlld1R5cGUgfSBmcm9tICcuL1BlcmNlbnRPZlZpZXcnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbEJvdW5kc1R5cGUgPSB7XG4gIHNob3VsZENvbnN0cmFpbjogKCkgPT4gYm9vbGVhblxuICBjb25zdHJhaW46IChwb2ludGVyRG93bjogYm9vbGVhbikgPT4gdm9pZFxuICB0b2dnbGVBY3RpdmU6IChhY3RpdmU6IGJvb2xlYW4pID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbEJvdW5kcyhcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIHNjcm9sbEJvZHk6IFNjcm9sbEJvZHlUeXBlLFxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuKTogU2Nyb2xsQm91bmRzVHlwZSB7XG4gIGNvbnN0IHB1bGxCYWNrVGhyZXNob2xkID0gcGVyY2VudE9mVmlldy5tZWFzdXJlKDEwKVxuICBjb25zdCBlZGdlT2Zmc2V0VG9sZXJhbmNlID0gcGVyY2VudE9mVmlldy5tZWFzdXJlKDUwKVxuICBjb25zdCBmcmljdGlvbkxpbWl0ID0gTGltaXQoMC4xLCAwLjk5KVxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIHNob3VsZENvbnN0cmFpbigpOiBib29sZWFuIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybiBmYWxzZVxuICAgIGlmICghbGltaXQucmVhY2hlZEFueSh0YXJnZXQuZ2V0KCkpKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWxpbWl0LnJlYWNoZWRBbnkobG9jYXRpb24uZ2V0KCkpKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RyYWluKHBvaW50ZXJEb3duOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRDb25zdHJhaW4oKSkgcmV0dXJuXG4gICAgY29uc3QgZWRnZSA9IGxpbWl0LnJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpID8gJ21pbicgOiAnbWF4J1xuICAgIGNvbnN0IGRpZmZUb0VkZ2UgPSBtYXRoQWJzKGxpbWl0W2VkZ2VdIC0gbG9jYXRpb24uZ2V0KCkpXG4gICAgY29uc3QgZGlmZlRvVGFyZ2V0ID0gdGFyZ2V0LmdldCgpIC0gbG9jYXRpb24uZ2V0KClcbiAgICBjb25zdCBmcmljdGlvbiA9IGZyaWN0aW9uTGltaXQuY29uc3RyYWluKGRpZmZUb0VkZ2UgLyBlZGdlT2Zmc2V0VG9sZXJhbmNlKVxuXG4gICAgdGFyZ2V0LnN1YnRyYWN0KGRpZmZUb1RhcmdldCAqIGZyaWN0aW9uKVxuXG4gICAgaWYgKCFwb2ludGVyRG93biAmJiBtYXRoQWJzKGRpZmZUb1RhcmdldCkgPCBwdWxsQmFja1RocmVzaG9sZCkge1xuICAgICAgdGFyZ2V0LnNldChsaW1pdC5jb25zdHJhaW4odGFyZ2V0LmdldCgpKSlcbiAgICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oMjUpLnVzZUJhc2VGcmljdGlvbigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQm91bmRzVHlwZSA9IHtcbiAgICBzaG91bGRDb25zdHJhaW4sXG4gICAgY29uc3RyYWluLFxuICAgIHRvZ2dsZUFjdGl2ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCwgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IGFycmF5SXNMYXN0SW5kZXgsIGFycmF5TGFzdCwgZGVsdGFBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxDb250YWluT3B0aW9uVHlwZSA9IGZhbHNlIHwgJ3RyaW1TbmFwcycgfCAna2VlcFNuYXBzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgc25hcHNDb250YWluZWQ6IG51bWJlcltdXG4gIHNjcm9sbENvbnRhaW5MaW1pdDogTGltaXRUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxDb250YWluKFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdLFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZSxcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2Nyb2xsQ29udGFpblR5cGUge1xuICBjb25zdCBzY3JvbGxCb3VuZHMgPSBMaW1pdCgtY29udGVudFNpemUgKyB2aWV3U2l6ZSwgMClcbiAgY29uc3Qgc25hcHNCb3VuZGVkID0gbWVhc3VyZUJvdW5kZWQoKVxuICBjb25zdCBzY3JvbGxDb250YWluTGltaXQgPSBmaW5kU2Nyb2xsQ29udGFpbkxpbWl0KClcbiAgY29uc3Qgc25hcHNDb250YWluZWQgPSBtZWFzdXJlQ29udGFpbmVkKClcblxuICBmdW5jdGlvbiB1c2VQaXhlbFRvbGVyYW5jZShib3VuZDogbnVtYmVyLCBzbmFwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGVsdGFBYnMoYm91bmQsIHNuYXApIDwgMVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpOiBMaW1pdFR5cGUge1xuICAgIGNvbnN0IHN0YXJ0U25hcCA9IHNuYXBzQm91bmRlZFswXVxuICAgIGNvbnN0IGVuZFNuYXAgPSBhcnJheUxhc3Qoc25hcHNCb3VuZGVkKVxuICAgIGNvbnN0IG1pbiA9IHNuYXBzQm91bmRlZC5sYXN0SW5kZXhPZihzdGFydFNuYXApXG4gICAgY29uc3QgbWF4ID0gc25hcHNCb3VuZGVkLmluZGV4T2YoZW5kU25hcCkgKyAxXG4gICAgcmV0dXJuIExpbWl0KG1pbiwgbWF4KVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUJvdW5kZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBzbmFwc0FsaWduZWRcbiAgICAgIC5tYXAoKHNuYXBBbGlnbmVkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxCb3VuZHNcbiAgICAgICAgY29uc3Qgc25hcCA9IHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oc25hcEFsaWduZWQpXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChzbmFwc0FsaWduZWQsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIG1heFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtaW4sIHNuYXApKSByZXR1cm4gbWluXG4gICAgICAgIGlmICh1c2VQaXhlbFRvbGVyYW5jZShtYXgsIHNuYXApKSByZXR1cm4gbWF4XG4gICAgICAgIHJldHVybiBzbmFwXG4gICAgICB9KVxuICAgICAgLm1hcCgoc2Nyb2xsQm91bmQpID0+IHBhcnNlRmxvYXQoc2Nyb2xsQm91bmQudG9GaXhlZCgzKSkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQ29udGFpbmVkKCk6IG51bWJlcltdIHtcbiAgICBpZiAoY29udGVudFNpemUgPD0gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgcmV0dXJuIFtzY3JvbGxCb3VuZHMubWF4XVxuICAgIGlmIChjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJykgcmV0dXJuIHNuYXBzQm91bmRlZFxuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbENvbnRhaW5MaW1pdFxuICAgIHJldHVybiBzbmFwc0JvdW5kZWQuc2xpY2UobWluLCBtYXgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxDb250YWluVHlwZSA9IHtcbiAgICBzbmFwc0NvbnRhaW5lZCxcbiAgICBzY3JvbGxDb250YWluTGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUxhc3QgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gIGxpbWl0OiBMaW1pdFR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExpbWl0KFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvb3A6IGJvb2xlYW5cbik6IFNjcm9sbExpbWl0VHlwZSB7XG4gIGNvbnN0IG1heCA9IHNjcm9sbFNuYXBzWzBdXG4gIGNvbnN0IG1pbiA9IGxvb3AgPyBtYXggLSBjb250ZW50U2l6ZSA6IGFycmF5TGFzdChzY3JvbGxTbmFwcylcbiAgY29uc3QgbGltaXQgPSBMaW1pdChtaW4sIG1heClcblxuICBjb25zdCBzZWxmOiBTY3JvbGxMaW1pdFR5cGUgPSB7XG4gICAgbGltaXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxMb29wZXJUeXBlID0ge1xuICBsb29wOiAoZGlyZWN0aW9uOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbExvb3BlcihcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdmVjdG9yczogVmVjdG9yMURUeXBlW11cbik6IFNjcm9sbExvb3BlclR5cGUge1xuICBjb25zdCBqb2ludFNhZmV0eSA9IDAuMVxuICBjb25zdCBtaW4gPSBsaW1pdC5taW4gKyBqb2ludFNhZmV0eVxuICBjb25zdCBtYXggPSBsaW1pdC5tYXggKyBqb2ludFNhZmV0eVxuICBjb25zdCB7IHJlYWNoZWRNaW4sIHJlYWNoZWRNYXggfSA9IExpbWl0KG1pbiwgbWF4KVxuXG4gIGZ1bmN0aW9uIHNob3VsZExvb3AoZGlyZWN0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAxKSByZXR1cm4gcmVhY2hlZE1heChsb2NhdGlvbi5nZXQoKSlcbiAgICBpZiAoZGlyZWN0aW9uID09PSAtMSkgcmV0dXJuIHJlYWNoZWRNaW4obG9jYXRpb24uZ2V0KCkpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFzaG91bGRMb29wKGRpcmVjdGlvbikpIHJldHVyblxuXG4gICAgY29uc3QgbG9vcERpc3RhbmNlID0gY29udGVudFNpemUgKiAoZGlyZWN0aW9uICogLTEpXG4gICAgdmVjdG9ycy5mb3JFYWNoKCh2KSA9PiB2LmFkZChsb29wRGlzdGFuY2UpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsTG9vcGVyVHlwZSA9IHtcbiAgICBsb29wXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgZ2V0OiAobjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFByb2dyZXNzKGxpbWl0OiBMaW1pdFR5cGUpOiBTY3JvbGxQcm9ncmVzc1R5cGUge1xuICBjb25zdCB7IG1heCwgbGVuZ3RoIH0gPSBsaW1pdFxuXG4gIGZ1bmN0aW9uIGdldChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IG4gLSBtYXhcbiAgICByZXR1cm4gbGVuZ3RoID8gY3VycmVudExvY2F0aW9uIC8gLWxlbmd0aCA6IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFByb2dyZXNzVHlwZSA9IHtcbiAgICBnZXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50VHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBhcnJheUxhc3QsIG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gIHNuYXBzOiBudW1iZXJbXVxuICBzbmFwc0FsaWduZWQ6IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxTbmFwcyhcbiAgYXhpczogQXhpc1R5cGUsXG4gIGFsaWdubWVudDogQWxpZ25tZW50VHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzVG9TY3JvbGw6IFNsaWRlc1RvU2Nyb2xsVHlwZVxuKTogU2Nyb2xsU25hcHNUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgYWxpZ25tZW50cyA9IG1lYXN1cmVTaXplcygpLm1hcChhbGlnbm1lbnQubWVhc3VyZSlcbiAgY29uc3Qgc25hcHMgPSBtZWFzdXJlVW5hbGlnbmVkKClcbiAgY29uc3Qgc25hcHNBbGlnbmVkID0gbWVhc3VyZUFsaWduZWQoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTaXplcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNsaWRlUmVjdHMpXG4gICAgICAubWFwKChyZWN0cykgPT4gYXJyYXlMYXN0KHJlY3RzKVtlbmRFZGdlXSAtIHJlY3RzWzBdW3N0YXJ0RWRnZV0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlVW5hbGlnbmVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCkgPT4gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gcmVjdFtzdGFydEVkZ2VdKVxuICAgICAgLm1hcCgoc25hcCkgPT4gLW1hdGhBYnMoc25hcCkpXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlQWxpZ25lZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGdyb3VwU2xpZGVzKHNuYXBzKVxuICAgICAgLm1hcCgoZykgPT4gZ1swXSlcbiAgICAgIC5tYXAoKHNuYXAsIGluZGV4KSA9PiBzbmFwICsgYWxpZ25tZW50c1tpbmRleF0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxTbmFwc1R5cGUgPSB7XG4gICAgc25hcHMsXG4gICAgc25hcHNBbGlnbmVkXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluT3B0aW9uVHlwZSB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQge1xuICBhcnJheUZyb21OdW1iZXIsXG4gIGFycmF5SXNMYXN0SW5kZXgsXG4gIGFycmF5TGFzdCxcbiAgYXJyYXlMYXN0SW5kZXhcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVSZWdpc3RyeVR5cGUgPSB7XG4gIHNsaWRlUmVnaXN0cnk6IG51bWJlcltdW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlUmVnaXN0cnkoXG4gIGNvbnRhaW5TbmFwczogYm9vbGVhbixcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsQ29udGFpbkxpbWl0OiBMaW1pdFR5cGUsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGUsXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbik6IFNsaWRlUmVnaXN0cnlUeXBlIHtcbiAgY29uc3QgeyBncm91cFNsaWRlcyB9ID0gc2xpZGVzVG9TY3JvbGxcbiAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQ29udGFpbkxpbWl0XG4gIGNvbnN0IHNsaWRlUmVnaXN0cnkgPSBjcmVhdGVTbGlkZVJlZ2lzdHJ5KClcblxuICBmdW5jdGlvbiBjcmVhdGVTbGlkZVJlZ2lzdHJ5KCk6IG51bWJlcltdW10ge1xuICAgIGNvbnN0IGdyb3VwZWRTbGlkZUluZGV4ZXMgPSBncm91cFNsaWRlcyhzbGlkZUluZGV4ZXMpXG4gICAgY29uc3QgZG9Ob3RDb250YWluID0gIWNvbnRhaW5TbmFwcyB8fCBjb250YWluU2Nyb2xsID09PSAna2VlcFNuYXBzJ1xuXG4gICAgaWYgKHNjcm9sbFNuYXBzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIFtzbGlkZUluZGV4ZXNdXG4gICAgaWYgKGRvTm90Q29udGFpbikgcmV0dXJuIGdyb3VwZWRTbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBncm91cGVkU2xpZGVJbmRleGVzLnNsaWNlKG1pbiwgbWF4KS5tYXAoKGdyb3VwLCBpbmRleCwgZ3JvdXBzKSA9PiB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICBjb25zdCBpc0xhc3QgPSBhcnJheUlzTGFzdEluZGV4KGdyb3VwcywgaW5kZXgpXG5cbiAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0KGdyb3Vwc1swXSkgKyAxXG4gICAgICAgIHJldHVybiBhcnJheUZyb21OdW1iZXIocmFuZ2UpXG4gICAgICB9XG4gICAgICBpZiAoaXNMYXN0KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gYXJyYXlMYXN0SW5kZXgoc2xpZGVJbmRleGVzKSAtIGFycmF5TGFzdChncm91cHMpWzBdICsgMVxuICAgICAgICByZXR1cm4gYXJyYXlGcm9tTnVtYmVyKHJhbmdlLCBhcnJheUxhc3QoZ3JvdXBzKVswXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBncm91cFxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVJlZ2lzdHJ5VHlwZSA9IHtcbiAgICBzbGlkZVJlZ2lzdHJ5XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuaW1wb3J0IHsgYXJyYXlMYXN0LCBtYXRoQWJzLCBtYXRoU2lnbiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFRhcmdldFR5cGUgPSB7XG4gIGRpc3RhbmNlOiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICBieUluZGV4OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBUYXJnZXRUeXBlXG4gIGJ5RGlzdGFuY2U6IChmb3JjZTogbnVtYmVyLCBzbmFwOiBib29sZWFuKSA9PiBUYXJnZXRUeXBlXG4gIHNob3J0Y3V0OiAodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFRhcmdldChcbiAgbG9vcDogYm9vbGVhbixcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBsaW1pdDogTGltaXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZVxuKTogU2Nyb2xsVGFyZ2V0VHlwZSB7XG4gIGNvbnN0IHsgcmVhY2hlZEFueSwgcmVtb3ZlT2Zmc2V0LCBjb25zdHJhaW4gfSA9IGxpbWl0XG5cbiAgZnVuY3Rpb24gbWluRGlzdGFuY2UoZGlzdGFuY2VzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRpc3RhbmNlcy5jb25jYXQoKS5zb3J0KChhLCBiKSA9PiBtYXRoQWJzKGEpIC0gbWF0aEFicyhiKSlbMF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRUYXJnZXRTbmFwKHRhcmdldDogbnVtYmVyKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBsb29wID8gcmVtb3ZlT2Zmc2V0KHRhcmdldCkgOiBjb25zdHJhaW4odGFyZ2V0KVxuICAgIGNvbnN0IGFzY0RpZmZzVG9TbmFwcyA9IHNjcm9sbFNuYXBzXG4gICAgICAubWFwKChzbmFwLCBpbmRleCkgPT4gKHsgZGlmZjogc2hvcnRjdXQoc25hcCAtIGRpc3RhbmNlLCAwKSwgaW5kZXggfSkpXG4gICAgICAuc29ydCgoZDEsIGQyKSA9PiBtYXRoQWJzKGQxLmRpZmYpIC0gbWF0aEFicyhkMi5kaWZmKSlcblxuICAgIGNvbnN0IHsgaW5kZXggfSA9IGFzY0RpZmZzVG9TbmFwc1swXVxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG9ydGN1dCh0YXJnZXQ6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHRhcmdldHMgPSBbdGFyZ2V0LCB0YXJnZXQgKyBjb250ZW50U2l6ZSwgdGFyZ2V0IC0gY29udGVudFNpemVdXG5cbiAgICBpZiAoIWxvb3ApIHJldHVybiB0YXJnZXRcbiAgICBpZiAoIWRpcmVjdGlvbikgcmV0dXJuIG1pbkRpc3RhbmNlKHRhcmdldHMpXG5cbiAgICBjb25zdCBtYXRjaGluZ1RhcmdldHMgPSB0YXJnZXRzLmZpbHRlcigodCkgPT4gbWF0aFNpZ24odCkgPT09IGRpcmVjdGlvbilcbiAgICBpZiAobWF0Y2hpbmdUYXJnZXRzLmxlbmd0aCkgcmV0dXJuIG1pbkRpc3RhbmNlKG1hdGNoaW5nVGFyZ2V0cylcbiAgICByZXR1cm4gYXJyYXlMYXN0KHRhcmdldHMpIC0gY29udGVudFNpemVcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5SW5kZXgoaW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCBkaWZmVG9TbmFwID0gc2Nyb2xsU25hcHNbaW5kZXhdIC0gdGFyZ2V0VmVjdG9yLmdldCgpXG4gICAgY29uc3QgZGlzdGFuY2UgPSBzaG9ydGN1dChkaWZmVG9TbmFwLCBkaXJlY3Rpb24pXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5RGlzdGFuY2UoZGlzdGFuY2U6IG51bWJlciwgc25hcDogYm9vbGVhbik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldFZlY3Rvci5nZXQoKSArIGRpc3RhbmNlXG4gICAgY29uc3QgeyBpbmRleCwgZGlzdGFuY2U6IHRhcmdldFNuYXBEaXN0YW5jZSB9ID0gZmluZFRhcmdldFNuYXAodGFyZ2V0KVxuICAgIGNvbnN0IHJlYWNoZWRCb3VuZCA9ICFsb29wICYmIHJlYWNoZWRBbnkodGFyZ2V0KVxuXG4gICAgaWYgKCFzbmFwIHx8IHJlYWNoZWRCb3VuZCkgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlIH1cblxuICAgIGNvbnN0IGRpZmZUb1NuYXAgPSBzY3JvbGxTbmFwc1tpbmRleF0gLSB0YXJnZXRTbmFwRGlzdGFuY2VcbiAgICBjb25zdCBzbmFwRGlzdGFuY2UgPSBkaXN0YW5jZSArIHNob3J0Y3V0KGRpZmZUb1NuYXAsIDApXG5cbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2U6IHNuYXBEaXN0YW5jZSB9XG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxUYXJnZXRUeXBlID0ge1xuICAgIGJ5RGlzdGFuY2UsXG4gICAgYnlJbmRleCxcbiAgICBzaG9ydGN1dFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbmltYXRpb25zVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsVGFyZ2V0VHlwZSwgVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsVG9UeXBlID0ge1xuICBkaXN0YW5jZTogKG46IG51bWJlciwgc25hcDogYm9vbGVhbikgPT4gdm9pZFxuICBpbmRleDogKG46IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjcm9sbFRvKFxuICBhbmltYXRpb246IEFuaW1hdGlvbnNUeXBlLFxuICBpbmRleEN1cnJlbnQ6IENvdW50ZXJUeXBlLFxuICBpbmRleFByZXZpb3VzOiBDb3VudGVyVHlwZSxcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlLFxuICB0YXJnZXRWZWN0b3I6IFZlY3RvcjFEVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBTY3JvbGxUb1R5cGUge1xuICBmdW5jdGlvbiBzY3JvbGxUbyh0YXJnZXQ6IFRhcmdldFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBkaXN0YW5jZURpZmYgPSB0YXJnZXQuZGlzdGFuY2VcbiAgICBjb25zdCBpbmRleERpZmYgPSB0YXJnZXQuaW5kZXggIT09IGluZGV4Q3VycmVudC5nZXQoKVxuXG4gICAgdGFyZ2V0VmVjdG9yLmFkZChkaXN0YW5jZURpZmYpXG5cbiAgICBpZiAoZGlzdGFuY2VEaWZmKSBhbmltYXRpb24uc3RhcnQoKVxuXG4gICAgaWYgKGluZGV4RGlmZikge1xuICAgICAgaW5kZXhQcmV2aW91cy5zZXQoaW5kZXhDdXJyZW50LmdldCgpKVxuICAgICAgaW5kZXhDdXJyZW50LnNldCh0YXJnZXQuaW5kZXgpXG4gICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2VsZWN0JylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkaXN0YW5jZShuOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxUYXJnZXQuYnlEaXN0YW5jZShuLCBzbmFwKVxuICAgIHNjcm9sbFRvKHRhcmdldClcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGV4KG46IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRJbmRleCA9IGluZGV4Q3VycmVudC5jbG9uZSgpLnNldChuKVxuICAgIGNvbnN0IHRhcmdldCA9IHNjcm9sbFRhcmdldC5ieUluZGV4KHRhcmdldEluZGV4LmdldCgpLCBkaXJlY3Rpb24pXG4gICAgc2Nyb2xsVG8odGFyZ2V0KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsVG9UeXBlID0ge1xuICAgIGRpc3RhbmNlLFxuICAgIGluZGV4XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgU2xpZGVSZWdpc3RyeVR5cGUgfSBmcm9tICcuL1NsaWRlUmVnaXN0cnknXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlRm9jdXNUeXBlID0ge1xuICBpbml0OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZUZvY3VzKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddLFxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgZXZlbnRTdG9yZTogRXZlbnRTdG9yZVR5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuKTogU2xpZGVGb2N1c1R5cGUge1xuICBsZXQgbGFzdFRhYlByZXNzVGltZSA9IDBcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGV2ZW50U3RvcmUuYWRkKGRvY3VtZW50LCAna2V5ZG93bicsIHJlZ2lzdGVyVGFiUHJlc3MsIGZhbHNlKVxuICAgIHNsaWRlcy5mb3JFYWNoKGFkZFNsaWRlRm9jdXNFdmVudClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVGFiUHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ1RhYicpIGxhc3RUYWJQcmVzc1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkU2xpZGVGb2N1c0V2ZW50KHNsaWRlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGZvY3VzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qgbm93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICBjb25zdCBkaWZmVGltZSA9IG5vd1RpbWUgLSBsYXN0VGFiUHJlc3NUaW1lXG5cbiAgICAgIGlmIChkaWZmVGltZSA+IDEwKSByZXR1cm5cblxuICAgICAgcm9vdC5zY3JvbGxMZWZ0ID0gMFxuICAgICAgY29uc3QgaW5kZXggPSBzbGlkZXMuaW5kZXhPZihzbGlkZSlcbiAgICAgIGNvbnN0IGdyb3VwID0gc2xpZGVSZWdpc3RyeS5maW5kSW5kZXgoKGdyb3VwKSA9PiBncm91cC5pbmNsdWRlcyhpbmRleCkpXG5cbiAgICAgIGlmICghaXNOdW1iZXIoZ3JvdXApKSByZXR1cm5cblxuICAgICAgc2Nyb2xsQm9keS51c2VEdXJhdGlvbigwKVxuICAgICAgc2Nyb2xsVG8uaW5kZXgoZ3JvdXAsIDApXG4gICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVGb2N1cycpXG4gICAgfVxuXG4gICAgZXZlbnRTdG9yZS5hZGQoc2xpZGUsICdmb2N1cycsIGZvY3VzLCB7XG4gICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgICBpbml0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgVmVjdG9yMURUeXBlID0ge1xuICBnZXQ6ICgpID0+IG51bWJlclxuICBzZXQ6IChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpID0+IHZvaWRcbiAgYWRkOiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIHN1YnRyYWN0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWZWN0b3IxRChpbml0aWFsVmFsdWU6IG51bWJlcik6IFZlY3RvcjFEVHlwZSB7XG4gIGxldCB2YWx1ZSA9IGluaXRpYWxWYWx1ZVxuXG4gIGZ1bmN0aW9uIGdldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlID0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSArPSBub3JtYWxpemVJbnB1dChuKVxuICB9XG5cbiAgZnVuY3Rpb24gc3VidHJhY3QobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgLT0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUlucHV0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG4pID8gbiA6IG4uZ2V0KClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFZlY3RvcjFEVHlwZSA9IHtcbiAgICBnZXQsXG4gICAgc2V0LFxuICAgIGFkZCxcbiAgICBzdWJ0cmFjdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcblxuZXhwb3J0IHR5cGUgVHJhbnNsYXRlVHlwZSA9IHtcbiAgY2xlYXI6ICgpID0+IHZvaWRcbiAgdG86ICh0YXJnZXQ6IG51bWJlcikgPT4gdm9pZFxuICB0b2dnbGVBY3RpdmU6IChhY3RpdmU6IGJvb2xlYW4pID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zbGF0ZShcbiAgYXhpczogQXhpc1R5cGUsXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbik6IFRyYW5zbGF0ZVR5cGUge1xuICBjb25zdCB0cmFuc2xhdGUgPSBheGlzLnNjcm9sbCA9PT0gJ3gnID8geCA6IHlcbiAgY29uc3QgY29udGFpbmVyU3R5bGUgPSBjb250YWluZXIuc3R5bGVcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiB4KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgke259cHgsMHB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB5KG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUzZCgwcHgsJHtufXB4LDBweClgXG4gIH1cblxuICBmdW5jdGlvbiB0byh0YXJnZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuXG4gICAgY29udGFpbmVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNsYXRlKGF4aXMuZGlyZWN0aW9uKHRhcmdldCkpXG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgZGlzYWJsZWQgPSAhYWN0aXZlXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuICAgIGNvbnRhaW5lclN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgaWYgKCFjb250YWluZXIuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gIH1cblxuICBjb25zdCBzZWxmOiBUcmFuc2xhdGVUeXBlID0ge1xuICAgIGNsZWFyLFxuICAgIHRvLFxuICAgIHRvZ2dsZUFjdGl2ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IGFycmF5S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRCwgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuXG50eXBlIFNsaWRlQm91bmRUeXBlID0ge1xuICBzdGFydDogbnVtYmVyXG4gIGVuZDogbnVtYmVyXG59XG5cbnR5cGUgTG9vcFBvaW50VHlwZSA9IHtcbiAgbG9vcFBvaW50OiBudW1iZXJcbiAgaW5kZXg6IG51bWJlclxuICB0cmFuc2xhdGU6IFRyYW5zbGF0ZVR5cGVcbiAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMURUeXBlXG4gIHRhcmdldDogKCkgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlTG9vcGVyVHlwZSA9IHtcbiAgY2FuTG9vcDogKCkgPT4gYm9vbGVhblxuICBjbGVhcjogKCkgPT4gdm9pZFxuICBsb29wOiAoKSA9PiB2b2lkXG4gIGxvb3BQb2ludHM6IExvb3BQb2ludFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVMb29wZXIoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBjb250ZW50U2l6ZTogbnVtYmVyLFxuICBzbGlkZVNpemVzOiBudW1iZXJbXSxcbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXSxcbiAgc25hcHM6IG51bWJlcltdLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXVxuKTogU2xpZGVMb29wZXJUeXBlIHtcbiAgY29uc3Qgcm91bmRpbmdTYWZldHkgPSAwLjVcbiAgY29uc3QgYXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKVxuICBjb25zdCBkZXNjSXRlbXMgPSBhcnJheUtleXMoc2xpZGVTaXplc1dpdGhHYXBzKS5yZXZlcnNlKClcbiAgY29uc3QgbG9vcFBvaW50cyA9IHN0YXJ0UG9pbnRzKCkuY29uY2F0KGVuZFBvaW50cygpKVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVNsaWRlU2l6ZXMoaW5kZXhlczogbnVtYmVyW10sIGZyb206IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXIsIGkpID0+IHtcbiAgICAgIHJldHVybiBhIC0gc2xpZGVTaXplc1dpdGhHYXBzW2ldXG4gICAgfSwgZnJvbSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlc0luR2FwKGluZGV4ZXM6IG51bWJlcltdLCBnYXA6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gaW5kZXhlcy5yZWR1Y2UoKGE6IG51bWJlcltdLCBpKSA9PiB7XG4gICAgICBjb25zdCByZW1haW5pbmdHYXAgPSByZW1vdmVTbGlkZVNpemVzKGEsIGdhcClcbiAgICAgIHJldHVybiByZW1haW5pbmdHYXAgPiAwID8gYS5jb25jYXQoW2ldKSA6IGFcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRTbGlkZUJvdW5kcyhvZmZzZXQ6IG51bWJlcik6IFNsaWRlQm91bmRUeXBlW10ge1xuICAgIHJldHVybiBzbmFwcy5tYXAoKHNuYXAsIGluZGV4KSA9PiAoe1xuICAgICAgc3RhcnQ6IHNuYXAgLSBzbGlkZVNpemVzW2luZGV4XSArIHJvdW5kaW5nU2FmZXR5ICsgb2Zmc2V0LFxuICAgICAgZW5kOiBzbmFwICsgdmlld1NpemUgLSByb3VuZGluZ1NhZmV0eSArIG9mZnNldFxuICAgIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gZmluZExvb3BQb2ludHMoXG4gICAgaW5kZXhlczogbnVtYmVyW10sXG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgaXNFbmRFZGdlOiBib29sZWFuXG4gICk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3Qgc2xpZGVCb3VuZHMgPSBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0KVxuXG4gICAgcmV0dXJuIGluZGV4ZXMubWFwKChpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW5pdGlhbCA9IGlzRW5kRWRnZSA/IDAgOiAtY29udGVudFNpemVcbiAgICAgIGNvbnN0IGFsdGVyZWQgPSBpc0VuZEVkZ2UgPyBjb250ZW50U2l6ZSA6IDBcbiAgICAgIGNvbnN0IGJvdW5kRWRnZSA9IGlzRW5kRWRnZSA/ICdlbmQnIDogJ3N0YXJ0J1xuICAgICAgY29uc3QgbG9vcFBvaW50ID0gc2xpZGVCb3VuZHNbaW5kZXhdW2JvdW5kRWRnZV1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGxvb3BQb2ludCxcbiAgICAgICAgc2xpZGVMb2NhdGlvbjogVmVjdG9yMUQoLTEpLFxuICAgICAgICB0cmFuc2xhdGU6IFRyYW5zbGF0ZShheGlzLCBzbGlkZXNbaW5kZXhdKSxcbiAgICAgICAgdGFyZ2V0OiAoKSA9PiAobG9jYXRpb24uZ2V0KCkgPiBsb29wUG9pbnQgPyBpbml0aWFsIDogYWx0ZXJlZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRQb2ludHMoKTogTG9vcFBvaW50VHlwZVtdIHtcbiAgICBjb25zdCBnYXAgPSBzY3JvbGxTbmFwc1swXVxuICAgIGNvbnN0IGluZGV4ZXMgPSBzbGlkZXNJbkdhcChkZXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgY29udGVudFNpemUsIGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gZW5kUG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gdmlld1NpemUgLSBzY3JvbGxTbmFwc1swXSAtIDFcbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoYXNjSXRlbXMsIGdhcClcbiAgICByZXR1cm4gZmluZExvb3BQb2ludHMoaW5kZXhlcywgLWNvbnRlbnRTaXplLCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuTG9vcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9vcFBvaW50cy5ldmVyeSgoeyBpbmRleCB9KSA9PiB7XG4gICAgICBjb25zdCBvdGhlckluZGV4ZXMgPSBhc2NJdGVtcy5maWx0ZXIoKGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgcmV0dXJuIHJlbW92ZVNsaWRlU2l6ZXMob3RoZXJJbmRleGVzLCB2aWV3U2l6ZSkgPD0gMC4xXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoKTogdm9pZCB7XG4gICAgbG9vcFBvaW50cy5mb3JFYWNoKChsb29wUG9pbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0LCB0cmFuc2xhdGUsIHNsaWRlTG9jYXRpb24gfSA9IGxvb3BQb2ludFxuICAgICAgY29uc3Qgc2hpZnRMb2NhdGlvbiA9IHRhcmdldCgpXG4gICAgICBpZiAoc2hpZnRMb2NhdGlvbiA9PT0gc2xpZGVMb2NhdGlvbi5nZXQoKSkgcmV0dXJuXG4gICAgICB0cmFuc2xhdGUudG8oc2hpZnRMb2NhdGlvbilcbiAgICAgIHNsaWRlTG9jYXRpb24uc2V0KHNoaWZ0TG9jYXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiBsb29wUG9pbnQudHJhbnNsYXRlLmNsZWFyKCkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZUxvb3BlclR5cGUgPSB7XG4gICAgY2FuTG9vcCxcbiAgICBjbGVhcixcbiAgICBsb29wLFxuICAgIGxvb3BQb2ludHNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGUgPSAoXG4gIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgbXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdXG4pID0+IGJvb2xlYW4gfCB2b2lkXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlID0gYm9vbGVhbiB8IFNsaWRlc0hhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzSGFuZGxlcihcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB3YXRjaFNsaWRlczogU2xpZGVzSGFuZGxlck9wdGlvblR5cGVcbik6IFNsaWRlc0hhbmRsZXJUeXBlIHtcbiAgbGV0IG11dGF0aW9uT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXJcbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoU2xpZGVzKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayhtdXRhdGlvbnM6IE11dGF0aW9uUmVjb3JkW10pOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0NoYW5nZWQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoU2xpZGVzKSB8fCB3YXRjaFNsaWRlcyhlbWJsYUFwaSwgbXV0YXRpb25zKSkge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAobXV0YXRpb25PYnNlcnZlcikgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cyB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge1xuICBba2V5OiBudW1iZXJdOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XG59XG5cbmV4cG9ydCB0eXBlIFNsaWRlc0luVmlld09wdGlvbnNUeXBlID0gSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0Wyd0aHJlc2hvbGQnXVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdUeXBlID0ge1xuICBpbml0OiAoKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgZ2V0OiAoaW5WaWV3PzogYm9vbGVhbikgPT4gbnVtYmVyW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0luVmlldyhcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIHRocmVzaG9sZDogU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGVcbik6IFNsaWRlc0luVmlld1R5cGUge1xuICBjb25zdCBpbnRlcnNlY3Rpb25FbnRyeU1hcDogSW50ZXJzZWN0aW9uRW50cnlNYXBUeXBlID0ge31cbiAgbGV0IGluVmlld0NhY2hlOiBudW1iZXJbXSB8IG51bGwgPSBudWxsXG4gIGxldCBub3RJblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI6IEludGVyc2VjdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzbGlkZXMuaW5kZXhPZig8SFRNTEVsZW1lbnQ+ZW50cnkudGFyZ2V0KVxuICAgICAgICAgIGludGVyc2VjdGlvbkVudHJ5TWFwW2luZGV4XSA9IGVudHJ5XG4gICAgICAgIH0pXG5cbiAgICAgICAgaW5WaWV3Q2FjaGUgPSBudWxsXG4gICAgICAgIG5vdEluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2xpZGVzSW5WaWV3JylcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50LFxuICAgICAgICB0aHJlc2hvbGRcbiAgICAgIH1cbiAgICApXG5cbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUpID0+IGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoc2xpZGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIGludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIGRlc3Ryb3llZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3OiBib29sZWFuKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBvYmplY3RLZXlzKGludGVyc2VjdGlvbkVudHJ5TWFwKS5yZWR1Y2UoXG4gICAgICAobGlzdDogbnVtYmVyW10sIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChzbGlkZUluZGV4KVxuICAgICAgICBjb25zdCB7IGlzSW50ZXJzZWN0aW5nIH0gPSBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF1cbiAgICAgICAgY29uc3QgaW5WaWV3TWF0Y2ggPSBpblZpZXcgJiYgaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgY29uc3Qgbm90SW5WaWV3TWF0Y2ggPSAhaW5WaWV3ICYmICFpc0ludGVyc2VjdGluZ1xuXG4gICAgICAgIGlmIChpblZpZXdNYXRjaCB8fCBub3RJblZpZXdNYXRjaCkgbGlzdC5wdXNoKGluZGV4KVxuICAgICAgICByZXR1cm4gbGlzdFxuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGluVmlldzogYm9vbGVhbiA9IHRydWUpOiBudW1iZXJbXSB7XG4gICAgaWYgKGluVmlldyAmJiBpblZpZXdDYWNoZSkgcmV0dXJuIGluVmlld0NhY2hlXG4gICAgaWYgKCFpblZpZXcgJiYgbm90SW5WaWV3Q2FjaGUpIHJldHVybiBub3RJblZpZXdDYWNoZVxuXG4gICAgY29uc3Qgc2xpZGVJbmRleGVzID0gY3JlYXRlSW5WaWV3TGlzdChpblZpZXcpXG5cbiAgICBpZiAoaW5WaWV3KSBpblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuICAgIGlmICghaW5WaWV3KSBub3RJblZpZXdDYWNoZSA9IHNsaWRlSW5kZXhlc1xuXG4gICAgcmV0dXJuIHNsaWRlSW5kZXhlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gICAgZ2V0XG4gIH1cblxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IGFycmF5SXNMYXN0SW5kZXgsIGFycmF5TGFzdCwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlU2l6ZXNUeXBlID0ge1xuICBzbGlkZVNpemVzOiBudW1iZXJbXVxuICBzbGlkZVNpemVzV2l0aEdhcHM6IG51bWJlcltdXG4gIHN0YXJ0R2FwOiBudW1iZXJcbiAgZW5kR2FwOiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlU2l6ZXMoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIHJlYWRFZGdlR2FwOiBib29sZWFuLFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuKTogU2xpZGVTaXplc1R5cGUge1xuICBjb25zdCB7IG1lYXN1cmVTaXplLCBzdGFydEVkZ2UsIGVuZEVkZ2UgfSA9IGF4aXNcbiAgY29uc3Qgd2l0aEVkZ2VHYXAgPSBzbGlkZVJlY3RzWzBdICYmIHJlYWRFZGdlR2FwXG4gIGNvbnN0IHN0YXJ0R2FwID0gbWVhc3VyZVN0YXJ0R2FwKClcbiAgY29uc3QgZW5kR2FwID0gbWVhc3VyZUVuZEdhcCgpXG4gIGNvbnN0IHNsaWRlU2l6ZXMgPSBzbGlkZVJlY3RzLm1hcChtZWFzdXJlU2l6ZSlcbiAgY29uc3Qgc2xpZGVTaXplc1dpdGhHYXBzID0gbWVhc3VyZVdpdGhHYXBzKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU3RhcnRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHNsaWRlUmVjdCA9IHNsaWRlUmVjdHNbMF1cbiAgICByZXR1cm4gbWF0aEFicyhjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3Rbc3RhcnRFZGdlXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVFbmRHYXAoKTogbnVtYmVyIHtcbiAgICBpZiAoIXdpdGhFZGdlR2FwKSByZXR1cm4gMFxuICAgIGNvbnN0IHN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhcnJheUxhc3Qoc2xpZGVzKSlcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGBtYXJnaW4tJHtlbmRFZGdlfWApKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZVdpdGhHYXBzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc2xpZGVSZWN0c1xuICAgICAgLm1hcCgocmVjdCwgaW5kZXgsIHJlY3RzKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSAhaW5kZXhcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChyZWN0cywgaW5kZXgpXG4gICAgICAgIGlmIChpc0ZpcnN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBzdGFydEdhcFxuICAgICAgICBpZiAoaXNMYXN0KSByZXR1cm4gc2xpZGVTaXplc1tpbmRleF0gKyBlbmRHYXBcbiAgICAgICAgcmV0dXJuIHJlY3RzW2luZGV4ICsgMV1bc3RhcnRFZGdlXSAtIHJlY3Rbc3RhcnRFZGdlXVxuICAgICAgfSlcbiAgICAgIC5tYXAobWF0aEFicylcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlU2l6ZXNUeXBlID0ge1xuICAgIHNsaWRlU2l6ZXMsXG4gICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHtcbiAgYXJyYXlLZXlzLFxuICBhcnJheUxhc3QsXG4gIGFycmF5TGFzdEluZGV4LFxuICBpc051bWJlcixcbiAgbWF0aEFic1xufSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUgPSAnYXV0bycgfCBudW1iZXJcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxUeXBlID0ge1xuICBncm91cFNsaWRlczogPFR5cGU+KGFycmF5OiBUeXBlW10pID0+IFR5cGVbXVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNUb1Njcm9sbChcbiAgYXhpczogQXhpc1R5cGUsXG4gIHZpZXdTaXplOiBudW1iZXIsXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGUsXG4gIGxvb3A6IGJvb2xlYW4sXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZSxcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW10sXG4gIHN0YXJ0R2FwOiBudW1iZXIsXG4gIGVuZEdhcDogbnVtYmVyLFxuICBwaXhlbFRvbGVyYW5jZTogbnVtYmVyXG4pOiBTbGlkZXNUb1Njcm9sbFR5cGUge1xuICBjb25zdCB7IHN0YXJ0RWRnZSwgZW5kRWRnZSwgZGlyZWN0aW9uIH0gPSBheGlzXG4gIGNvbnN0IGdyb3VwQnlOdW1iZXIgPSBpc051bWJlcihzbGlkZXNUb1Njcm9sbClcblxuICBmdW5jdGlvbiBieU51bWJlcjxUeXBlPihhcnJheTogVHlwZVtdLCBncm91cFNpemU6IG51bWJlcik6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gYXJyYXlLZXlzKGFycmF5KVxuICAgICAgLmZpbHRlcigoaSkgPT4gaSAlIGdyb3VwU2l6ZSA9PT0gMClcbiAgICAgIC5tYXAoKGkpID0+IGFycmF5LnNsaWNlKGksIGkgKyBncm91cFNpemUpKVxuICB9XG5cbiAgZnVuY3Rpb24gYnlTaXplPFR5cGU+KGFycmF5OiBUeXBlW10pOiBUeXBlW11bXSB7XG4gICAgaWYgKCFhcnJheS5sZW5ndGgpIHJldHVybiBbXVxuXG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5yZWR1Y2UoKGdyb3VwczogbnVtYmVyW10sIHJlY3RCLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZWN0QSA9IGFycmF5TGFzdChncm91cHMpIHx8IDBcbiAgICAgICAgY29uc3QgaXNGaXJzdCA9IHJlY3RBID09PSAwXG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IHJlY3RCID09PSBhcnJheUxhc3RJbmRleChhcnJheSlcblxuICAgICAgICBjb25zdCBlZGdlQSA9IGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHNsaWRlUmVjdHNbcmVjdEFdW3N0YXJ0RWRnZV1cbiAgICAgICAgY29uc3QgZWRnZUIgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RCXVtlbmRFZGdlXVxuICAgICAgICBjb25zdCBnYXBBID0gIWxvb3AgJiYgaXNGaXJzdCA/IGRpcmVjdGlvbihzdGFydEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGdhcEIgPSAhbG9vcCAmJiBpc0xhc3QgPyBkaXJlY3Rpb24oZW5kR2FwKSA6IDBcbiAgICAgICAgY29uc3QgY2h1bmtTaXplID0gbWF0aEFicyhlZGdlQiAtIGdhcEIgLSAoZWRnZUEgKyBnYXBBKSlcblxuICAgICAgICBpZiAoaW5kZXggJiYgY2h1bmtTaXplID4gdmlld1NpemUgKyBwaXhlbFRvbGVyYW5jZSkgZ3JvdXBzLnB1c2gocmVjdEIpXG4gICAgICAgIGlmIChpc0xhc3QpIGdyb3Vwcy5wdXNoKGFycmF5Lmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGdyb3Vwc1xuICAgICAgfSwgW10pXG4gICAgICAubWFwKChjdXJyZW50U2l6ZSwgaW5kZXgsIGdyb3VwcykgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91c1NpemUgPSBNYXRoLm1heChncm91cHNbaW5kZXggLSAxXSB8fCAwKVxuICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UocHJldmlvdXNTaXplLCBjdXJyZW50U2l6ZSlcbiAgICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBncm91cFNsaWRlczxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIHJldHVybiBncm91cEJ5TnVtYmVyID8gYnlOdW1iZXIoYXJyYXksIHNsaWRlc1RvU2Nyb2xsKSA6IGJ5U2l6ZShhcnJheSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgICBncm91cFNsaWRlc1xuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBbGlnbm1lbnQgfSBmcm9tICcuL0FsaWdubWVudCdcbmltcG9ydCB7IEFuaW1hdGlvbnMsIEFuaW1hdGlvbnNUeXBlLCBBbmltYXRpb25zVXBkYXRlVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IEF4aXMsIEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgQ291bnRlciwgQ291bnRlclR5cGUgfSBmcm9tICcuL0NvdW50ZXInXG5pbXBvcnQgeyBEcmFnSGFuZGxlciwgRHJhZ0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IERyYWdUcmFja2VyIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEV2ZW50U3RvcmUsIEV2ZW50U3RvcmVUeXBlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgTGltaXRUeXBlIH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7IE5vZGVSZWN0VHlwZSwgTm9kZVJlY3RzIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXcsIFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlciwgUmVzaXplSGFuZGxlclR5cGUgfSBmcm9tICcuL1Jlc2l6ZUhhbmRsZXInXG5pbXBvcnQgeyBTY3JvbGxCb2R5LCBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFNjcm9sbEJvdW5kcywgU2Nyb2xsQm91bmRzVHlwZSB9IGZyb20gJy4vU2Nyb2xsQm91bmRzJ1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbiB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IFNjcm9sbExpbWl0IH0gZnJvbSAnLi9TY3JvbGxMaW1pdCdcbmltcG9ydCB7IFNjcm9sbExvb3BlciwgU2Nyb2xsTG9vcGVyVHlwZSB9IGZyb20gJy4vU2Nyb2xsTG9vcGVyJ1xuaW1wb3J0IHsgU2Nyb2xsUHJvZ3Jlc3MsIFNjcm9sbFByb2dyZXNzVHlwZSB9IGZyb20gJy4vU2Nyb2xsUHJvZ3Jlc3MnXG5pbXBvcnQgeyBTY3JvbGxTbmFwcyB9IGZyb20gJy4vU2Nyb2xsU25hcHMnXG5pbXBvcnQgeyBTbGlkZVJlZ2lzdHJ5LCBTbGlkZVJlZ2lzdHJ5VHlwZSB9IGZyb20gJy4vU2xpZGVSZWdpc3RyeSdcbmltcG9ydCB7IFNjcm9sbFRhcmdldCwgU2Nyb2xsVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgU2Nyb2xsVG8sIFNjcm9sbFRvVHlwZSB9IGZyb20gJy4vU2Nyb2xsVG8nXG5pbXBvcnQgeyBTbGlkZUZvY3VzLCBTbGlkZUZvY3VzVHlwZSB9IGZyb20gJy4vU2xpZGVGb2N1cydcbmltcG9ydCB7IFNsaWRlTG9vcGVyLCBTbGlkZUxvb3BlclR5cGUgfSBmcm9tICcuL1NsaWRlTG9vcGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlciwgU2xpZGVzSGFuZGxlclR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXcsIFNsaWRlc0luVmlld1R5cGUgfSBmcm9tICcuL1NsaWRlc0luVmlldydcbmltcG9ydCB7IFNsaWRlU2l6ZXMgfSBmcm9tICcuL1NsaWRlU2l6ZXMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbCwgU2xpZGVzVG9TY3JvbGxUeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFRyYW5zbGF0ZSwgVHJhbnNsYXRlVHlwZSB9IGZyb20gJy4vVHJhbnNsYXRlJ1xuaW1wb3J0IHsgYXJyYXlLZXlzLCBhcnJheUxhc3QsIGFycmF5TGFzdEluZGV4LCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFELCBWZWN0b3IxRFR5cGUgfSBmcm9tICcuL1ZlY3RvcjFkJ1xuXG5leHBvcnQgdHlwZSBFbmdpbmVUeXBlID0ge1xuICBvd25lckRvY3VtZW50OiBEb2N1bWVudFxuICBvd25lcldpbmRvdzogV2luZG93VHlwZVxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbiAgYXhpczogQXhpc1R5cGVcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZVxuICBzY3JvbGxCb3VuZHM6IFNjcm9sbEJvdW5kc1R5cGVcbiAgc2Nyb2xsTG9vcGVyOiBTY3JvbGxMb29wZXJUeXBlXG4gIHNjcm9sbFByb2dyZXNzOiBTY3JvbGxQcm9ncmVzc1R5cGVcbiAgaW5kZXg6IENvdW50ZXJUeXBlXG4gIGluZGV4UHJldmlvdXM6IENvdW50ZXJUeXBlXG4gIGxpbWl0OiBMaW1pdFR5cGVcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICBvcHRpb25zOiBPcHRpb25zVHlwZVxuICBwZXJjZW50T2ZWaWV3OiBQZXJjZW50T2ZWaWV3VHlwZVxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZVxuICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXJUeXBlXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlXG4gIHNsaWRlTG9vcGVyOiBTbGlkZUxvb3BlclR5cGVcbiAgc2xpZGVzSW5WaWV3OiBTbGlkZXNJblZpZXdUeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGVcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGVcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHJlc2l6ZUhhbmRsZXI6IFJlc2l6ZUhhbmRsZXJUeXBlXG4gIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXJUeXBlXG4gIHNjcm9sbFRvOiBTY3JvbGxUb1R5cGVcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlXG4gIHNjcm9sbFNuYXBMaXN0OiBudW1iZXJbXVxuICBzY3JvbGxTbmFwczogbnVtYmVyW11cbiAgc2xpZGVJbmRleGVzOiBudW1iZXJbXVxuICBzbGlkZUZvY3VzOiBTbGlkZUZvY3VzVHlwZVxuICBzbGlkZVJlZ2lzdHJ5OiBTbGlkZVJlZ2lzdHJ5VHlwZVsnc2xpZGVSZWdpc3RyeSddXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZVxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRW5naW5lKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIG9wdGlvbnM6IE9wdGlvbnNUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IEVuZ2luZVR5cGUge1xuICAvLyBPcHRpb25zXG4gIGNvbnN0IHtcbiAgICBhbGlnbixcbiAgICBheGlzOiBzY3JvbGxBeGlzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGFydEluZGV4LFxuICAgIGxvb3AsXG4gICAgZHVyYXRpb24sXG4gICAgZHJhZ0ZyZWUsXG4gICAgZHJhZ1RocmVzaG9sZCxcbiAgICBpblZpZXdUaHJlc2hvbGQsXG4gICAgc2xpZGVzVG9TY3JvbGw6IGdyb3VwU2xpZGVzLFxuICAgIHNraXBTbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHdhdGNoUmVzaXplLFxuICAgIHdhdGNoU2xpZGVzLFxuICAgIHdhdGNoRHJhZ1xuICB9ID0gb3B0aW9uc1xuXG4gIC8vIE1lYXN1cmVtZW50c1xuICBjb25zdCBwaXhlbFRvbGVyYW5jZSA9IDJcbiAgY29uc3Qgbm9kZVJlY3RzID0gTm9kZVJlY3RzKClcbiAgY29uc3QgY29udGFpbmVyUmVjdCA9IG5vZGVSZWN0cy5tZWFzdXJlKGNvbnRhaW5lcilcbiAgY29uc3Qgc2xpZGVSZWN0cyA9IHNsaWRlcy5tYXAobm9kZVJlY3RzLm1lYXN1cmUpXG4gIGNvbnN0IGF4aXMgPSBBeGlzKHNjcm9sbEF4aXMsIGRpcmVjdGlvbilcbiAgY29uc3Qgdmlld1NpemUgPSBheGlzLm1lYXN1cmVTaXplKGNvbnRhaW5lclJlY3QpXG4gIGNvbnN0IHBlcmNlbnRPZlZpZXcgPSBQZXJjZW50T2ZWaWV3KHZpZXdTaXplKVxuICBjb25zdCBhbGlnbm1lbnQgPSBBbGlnbm1lbnQoYWxpZ24sIHZpZXdTaXplKVxuICBjb25zdCBjb250YWluU25hcHMgPSAhbG9vcCAmJiAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgcmVhZEVkZ2VHYXAgPSBsb29wIHx8ICEhY29udGFpblNjcm9sbFxuICBjb25zdCB7IHNsaWRlU2l6ZXMsIHNsaWRlU2l6ZXNXaXRoR2Fwcywgc3RhcnRHYXAsIGVuZEdhcCB9ID0gU2xpZGVTaXplcyhcbiAgICBheGlzLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBzbGlkZXMsXG4gICAgcmVhZEVkZ2VHYXAsXG4gICAgb3duZXJXaW5kb3dcbiAgKVxuICBjb25zdCBzbGlkZXNUb1Njcm9sbCA9IFNsaWRlc1RvU2Nyb2xsKFxuICAgIGF4aXMsXG4gICAgdmlld1NpemUsXG4gICAgZ3JvdXBTbGlkZXMsXG4gICAgbG9vcCxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc3RhcnRHYXAsXG4gICAgZW5kR2FwLFxuICAgIHBpeGVsVG9sZXJhbmNlXG4gIClcbiAgY29uc3QgeyBzbmFwcywgc25hcHNBbGlnbmVkIH0gPSBTY3JvbGxTbmFwcyhcbiAgICBheGlzLFxuICAgIGFsaWdubWVudCxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzVG9TY3JvbGxcbiAgKVxuICBjb25zdCBjb250ZW50U2l6ZSA9IC1hcnJheUxhc3Qoc25hcHMpICsgYXJyYXlMYXN0KHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgeyBzbmFwc0NvbnRhaW5lZCwgc2Nyb2xsQ29udGFpbkxpbWl0IH0gPSBTY3JvbGxDb250YWluKFxuICAgIHZpZXdTaXplLFxuICAgIGNvbnRlbnRTaXplLFxuICAgIHNuYXBzQWxpZ25lZCxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHBpeGVsVG9sZXJhbmNlXG4gIClcbiAgY29uc3Qgc2Nyb2xsU25hcHMgPSBjb250YWluU25hcHMgPyBzbmFwc0NvbnRhaW5lZCA6IHNuYXBzQWxpZ25lZFxuICBjb25zdCB7IGxpbWl0IH0gPSBTY3JvbGxMaW1pdChjb250ZW50U2l6ZSwgc2Nyb2xsU25hcHMsIGxvb3ApXG5cbiAgLy8gSW5kZXhlc1xuICBjb25zdCBpbmRleCA9IENvdW50ZXIoYXJyYXlMYXN0SW5kZXgoc2Nyb2xsU25hcHMpLCBzdGFydEluZGV4LCBsb29wKVxuICBjb25zdCBpbmRleFByZXZpb3VzID0gaW5kZXguY2xvbmUoKVxuICBjb25zdCBzbGlkZUluZGV4ZXMgPSBhcnJheUtleXMoc2xpZGVzKVxuXG4gIC8vIEFuaW1hdGlvblxuICBjb25zdCB1cGRhdGU6IEFuaW1hdGlvbnNVcGRhdGVUeXBlID0gKHtcbiAgICBkcmFnSGFuZGxlcixcbiAgICBldmVudEhhbmRsZXIsXG4gICAgc2Nyb2xsQm9keSxcbiAgICBzY3JvbGxCb3VuZHMsXG4gICAgc2Nyb2xsTG9vcGVyLFxuICAgIHNsaWRlTG9vcGVyLFxuICAgIHRyYW5zbGF0ZSxcbiAgICBsb2NhdGlvbixcbiAgICBhbmltYXRpb24sXG4gICAgb3B0aW9uczogeyBsb29wIH1cbiAgfSkgPT4ge1xuICAgIGlmICghbG9vcCkgc2Nyb2xsQm91bmRzLmNvbnN0cmFpbihkcmFnSGFuZGxlci5wb2ludGVyRG93bigpKVxuICAgIHNjcm9sbEJvZHkuc2VlaygpXG5cbiAgICBjb25zdCBzaG91bGRTZXR0bGUgPSBzY3JvbGxCb2R5LnNldHRsZWQoKVxuICAgIGNvbnN0IHdpdGhpbkJvdW5kcyA9ICFzY3JvbGxCb3VuZHMuc2hvdWxkQ29uc3RyYWluKClcbiAgICBjb25zdCBoYXNTZXR0bGVkID0gbG9vcCA/IHNob3VsZFNldHRsZSA6IHNob3VsZFNldHRsZSAmJiB3aXRoaW5Cb3VuZHNcblxuICAgIGlmIChoYXNTZXR0bGVkICYmICFkcmFnSGFuZGxlci5wb2ludGVyRG93bigpKSB7XG4gICAgICBhbmltYXRpb24uc3RvcCgpXG4gICAgICBldmVudEhhbmRsZXIuZW1pdCgnc2V0dGxlJylcbiAgICB9XG4gICAgaWYgKCFoYXNTZXR0bGVkKSBldmVudEhhbmRsZXIuZW1pdCgnc2Nyb2xsJylcblxuICAgIGlmIChsb29wKSB7XG4gICAgICBzY3JvbGxMb29wZXIubG9vcChzY3JvbGxCb2R5LmRpcmVjdGlvbigpKVxuICAgICAgc2xpZGVMb29wZXIubG9vcCgpXG4gICAgfVxuXG4gICAgdHJhbnNsYXRlLnRvKGxvY2F0aW9uLmdldCgpKVxuICB9XG5cbiAgY29uc3QgYW5pbWF0aW9uID0gQW5pbWF0aW9ucyhvd25lckRvY3VtZW50LCBvd25lcldpbmRvdywgKCkgPT4gdXBkYXRlKGVuZ2luZSkpXG5cbiAgLy8gU2hhcmVkXG4gIGNvbnN0IGZyaWN0aW9uID0gMC42OFxuICBjb25zdCBzdGFydExvY2F0aW9uID0gc2Nyb2xsU25hcHNbaW5kZXguZ2V0KCldXG4gIGNvbnN0IGxvY2F0aW9uID0gVmVjdG9yMUQoc3RhcnRMb2NhdGlvbilcbiAgY29uc3QgdGFyZ2V0ID0gVmVjdG9yMUQoc3RhcnRMb2NhdGlvbilcbiAgY29uc3Qgc2Nyb2xsQm9keSA9IFNjcm9sbEJvZHkobG9jYXRpb24sIHRhcmdldCwgZHVyYXRpb24sIGZyaWN0aW9uKVxuICBjb25zdCBzY3JvbGxUYXJnZXQgPSBTY3JvbGxUYXJnZXQoXG4gICAgbG9vcCxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBjb250ZW50U2l6ZSxcbiAgICBsaW1pdCxcbiAgICB0YXJnZXRcbiAgKVxuICBjb25zdCBzY3JvbGxUbyA9IFNjcm9sbFRvKFxuICAgIGFuaW1hdGlvbixcbiAgICBpbmRleCxcbiAgICBpbmRleFByZXZpb3VzLFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICB0YXJnZXQsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcbiAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBTY3JvbGxQcm9ncmVzcyhsaW1pdClcbiAgY29uc3QgZXZlbnRTdG9yZSA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBzbGlkZXNJblZpZXcgPSBTbGlkZXNJblZpZXcoXG4gICAgY29udGFpbmVyLFxuICAgIHNsaWRlcyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgaW5WaWV3VGhyZXNob2xkXG4gIClcbiAgY29uc3QgeyBzbGlkZVJlZ2lzdHJ5IH0gPSBTbGlkZVJlZ2lzdHJ5KFxuICAgIGNvbnRhaW5TbmFwcyxcbiAgICBjb250YWluU2Nyb2xsLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbENvbnRhaW5MaW1pdCxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICBzbGlkZUluZGV4ZXNcbiAgKVxuICBjb25zdCBzbGlkZUZvY3VzID0gU2xpZGVGb2N1cyhcbiAgICByb290LFxuICAgIHNsaWRlcyxcbiAgICBzbGlkZVJlZ2lzdHJ5LFxuICAgIHNjcm9sbFRvLFxuICAgIHNjcm9sbEJvZHksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBldmVudEhhbmRsZXJcbiAgKVxuXG4gIC8vIEVuZ2luZVxuICBjb25zdCBlbmdpbmU6IEVuZ2luZVR5cGUgPSB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lcldpbmRvdyxcbiAgICBldmVudEhhbmRsZXIsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIGFuaW1hdGlvbixcbiAgICBheGlzLFxuICAgIGRyYWdIYW5kbGVyOiBEcmFnSGFuZGxlcihcbiAgICAgIGF4aXMsXG4gICAgICByb290LFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgdGFyZ2V0LFxuICAgICAgRHJhZ1RyYWNrZXIoYXhpcywgb3duZXJXaW5kb3cpLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBhbmltYXRpb24sXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBzY3JvbGxUYXJnZXQsXG4gICAgICBpbmRleCxcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIHBlcmNlbnRPZlZpZXcsXG4gICAgICBkcmFnRnJlZSxcbiAgICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgICBza2lwU25hcHMsXG4gICAgICBmcmljdGlvbixcbiAgICAgIHdhdGNoRHJhZ1xuICAgICksXG4gICAgZXZlbnRTdG9yZSxcbiAgICBwZXJjZW50T2ZWaWV3LFxuICAgIGluZGV4LFxuICAgIGluZGV4UHJldmlvdXMsXG4gICAgbGltaXQsXG4gICAgbG9jYXRpb24sXG4gICAgb3B0aW9ucyxcbiAgICByZXNpemVIYW5kbGVyOiBSZXNpemVIYW5kbGVyKFxuICAgICAgY29udGFpbmVyLFxuICAgICAgZXZlbnRIYW5kbGVyLFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBzbGlkZXMsXG4gICAgICBheGlzLFxuICAgICAgd2F0Y2hSZXNpemUsXG4gICAgICBub2RlUmVjdHNcbiAgICApLFxuICAgIHNjcm9sbEJvZHksXG4gICAgc2Nyb2xsQm91bmRzOiBTY3JvbGxCb3VuZHMoXG4gICAgICBsaW1pdCxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgdGFyZ2V0LFxuICAgICAgc2Nyb2xsQm9keSxcbiAgICAgIHBlcmNlbnRPZlZpZXdcbiAgICApLFxuICAgIHNjcm9sbExvb3BlcjogU2Nyb2xsTG9vcGVyKGNvbnRlbnRTaXplLCBsaW1pdCwgbG9jYXRpb24sIFtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgdGFyZ2V0XG4gICAgXSksXG4gICAgc2Nyb2xsUHJvZ3Jlc3MsXG4gICAgc2Nyb2xsU25hcExpc3Q6IHNjcm9sbFNuYXBzLm1hcChzY3JvbGxQcm9ncmVzcy5nZXQpLFxuICAgIHNjcm9sbFNuYXBzLFxuICAgIHNjcm9sbFRhcmdldCxcbiAgICBzY3JvbGxUbyxcbiAgICBzbGlkZUxvb3BlcjogU2xpZGVMb29wZXIoXG4gICAgICBheGlzLFxuICAgICAgdmlld1NpemUsXG4gICAgICBjb250ZW50U2l6ZSxcbiAgICAgIHNsaWRlU2l6ZXMsXG4gICAgICBzbGlkZVNpemVzV2l0aEdhcHMsXG4gICAgICBzbmFwcyxcbiAgICAgIHNjcm9sbFNuYXBzLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBzbGlkZXNcbiAgICApLFxuICAgIHNsaWRlRm9jdXMsXG4gICAgc2xpZGVzSGFuZGxlcjogU2xpZGVzSGFuZGxlcihjb250YWluZXIsIGV2ZW50SGFuZGxlciwgd2F0Y2hTbGlkZXMpLFxuICAgIHNsaWRlc0luVmlldyxcbiAgICBzbGlkZUluZGV4ZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzbGlkZXNUb1Njcm9sbCxcbiAgICB0YXJnZXQsXG4gICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgY29udGFpbmVyKVxuICB9XG5cbiAgcmV0dXJuIGVuZ2luZVxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5cbnR5cGUgQ2FsbGJhY2tUeXBlID0gKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSwgZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gdm9pZFxudHlwZSBMaXN0ZW5lcnNUeXBlID0gUGFydGlhbDx7IFtrZXkgaW4gRW1ibGFFdmVudFR5cGVdOiBDYWxsYmFja1R5cGVbXSB9PlxuXG5leHBvcnQgdHlwZSBFbWJsYUV2ZW50VHlwZSA9IEVtYmxhRXZlbnRMaXN0VHlwZVtrZXlvZiBFbWJsYUV2ZW50TGlzdFR5cGVdXG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1ibGFFdmVudExpc3RUeXBlIHtcbiAgaW5pdDogJ2luaXQnXG4gIHBvaW50ZXJEb3duOiAncG9pbnRlckRvd24nXG4gIHBvaW50ZXJVcDogJ3BvaW50ZXJVcCdcbiAgc2xpZGVzQ2hhbmdlZDogJ3NsaWRlc0NoYW5nZWQnXG4gIHNsaWRlc0luVmlldzogJ3NsaWRlc0luVmlldydcbiAgc2Nyb2xsOiAnc2Nyb2xsJ1xuICBzZWxlY3Q6ICdzZWxlY3QnXG4gIHNldHRsZTogJ3NldHRsZSdcbiAgZGVzdHJveTogJ2Rlc3Ryb3knXG4gIHJlSW5pdDogJ3JlSW5pdCdcbiAgcmVzaXplOiAncmVzaXplJ1xuICBzbGlkZUZvY3VzOiAnc2xpZGVGb2N1cydcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBlbWl0OiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBvbjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb2ZmOiAoZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSkgPT4gRXZlbnRIYW5kbGVyVHlwZVxuICBjbGVhcjogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCk6IEV2ZW50SGFuZGxlclR5cGUge1xuICBsZXQgbGlzdGVuZXJzOiBMaXN0ZW5lcnNUeXBlID0ge31cbiAgbGV0IGFwaTogRW1ibGFDYXJvdXNlbFR5cGVcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGFwaSA9IGVtYmxhQXBpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IENhbGxiYWNrVHlwZVtdIHtcbiAgICByZXR1cm4gbGlzdGVuZXJzW2V2dF0gfHwgW11cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZ0OiBFbWJsYUV2ZW50VHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGdldExpc3RlbmVycyhldnQpLmZvckVhY2goKGUpID0+IGUoYXBpLCBldnQpKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBvbihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5jb25jYXQoW2NiXSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBsaXN0ZW5lcnNbZXZ0XSA9IGdldExpc3RlbmVycyhldnQpLmZpbHRlcigoZSkgPT4gZSAhPT0gY2IpXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCk6IHZvaWQge1xuICAgIGxpc3RlbmVycyA9IHt9XG4gIH1cblxuICBjb25zdCBzZWxmOiBFdmVudEhhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZW1pdCxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgY2xlYXJcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50T3B0aW9uVHlwZSB9IGZyb20gJy4vQWxpZ25tZW50J1xuaW1wb3J0IHsgQXhpc0RpcmVjdGlvbk9wdGlvblR5cGUsIEF4aXNPcHRpb25UeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlIH0gZnJvbSAnLi9TbGlkZXNUb1Njcm9sbCdcbmltcG9ydCB7IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlIH0gZnJvbSAnLi9TY3JvbGxDb250YWluJ1xuaW1wb3J0IHsgRHJhZ0hhbmRsZXJPcHRpb25UeXBlIH0gZnJvbSAnLi9EcmFnSGFuZGxlcidcbmltcG9ydCB7IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlIH0gZnJvbSAnLi9SZXNpemVIYW5kbGVyJ1xuaW1wb3J0IHsgU2xpZGVzSGFuZGxlck9wdGlvblR5cGUgfSBmcm9tICcuL1NsaWRlc0hhbmRsZXInXG5pbXBvcnQgeyBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSB9IGZyb20gJy4vU2xpZGVzSW5WaWV3J1xuXG5leHBvcnQgdHlwZSBMb29zZU9wdGlvbnNUeXBlID0ge1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duXG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZU9wdGlvbnNUeXBlPFR5cGUgZXh0ZW5kcyBMb29zZU9wdGlvbnNUeXBlPiA9IFR5cGUgJiB7XG4gIGFjdGl2ZTogYm9vbGVhblxuICBicmVha3BvaW50czoge1xuICAgIFtrZXk6IHN0cmluZ106IE9taXQ8UGFydGlhbDxDcmVhdGVPcHRpb25zVHlwZTxUeXBlPj4sICdicmVha3BvaW50cyc+XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgT3B0aW9uc1R5cGUgPSBDcmVhdGVPcHRpb25zVHlwZTx7XG4gIGFsaWduOiBBbGlnbm1lbnRPcHRpb25UeXBlXG4gIGF4aXM6IEF4aXNPcHRpb25UeXBlXG4gIGNvbnRhaW5lcjogc3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBudWxsXG4gIHNsaWRlczogc3RyaW5nIHwgSFRNTEVsZW1lbnRbXSB8IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+IHwgbnVsbFxuICBjb250YWluU2Nyb2xsOiBTY3JvbGxDb250YWluT3B0aW9uVHlwZVxuICBkaXJlY3Rpb246IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbE9wdGlvblR5cGVcbiAgZHJhZ0ZyZWU6IGJvb2xlYW5cbiAgZHJhZ1RocmVzaG9sZDogbnVtYmVyXG4gIGluVmlld1RocmVzaG9sZDogU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGVcbiAgbG9vcDogYm9vbGVhblxuICBza2lwU25hcHM6IGJvb2xlYW5cbiAgZHVyYXRpb246IG51bWJlclxuICBzdGFydEluZGV4OiBudW1iZXJcbiAgd2F0Y2hEcmFnOiBEcmFnSGFuZGxlck9wdGlvblR5cGVcbiAgd2F0Y2hSZXNpemU6IFJlc2l6ZUhhbmRsZXJPcHRpb25UeXBlXG4gIHdhdGNoU2xpZGVzOiBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZVxufT5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBPcHRpb25zVHlwZSA9IHtcbiAgYWxpZ246ICdjZW50ZXInLFxuICBheGlzOiAneCcsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgc2xpZGVzOiBudWxsLFxuICBjb250YWluU2Nyb2xsOiAndHJpbVNuYXBzJyxcbiAgZGlyZWN0aW9uOiAnbHRyJyxcbiAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gIGluVmlld1RocmVzaG9sZDogMCxcbiAgYnJlYWtwb2ludHM6IHt9LFxuICBkcmFnRnJlZTogZmFsc2UsXG4gIGRyYWdUaHJlc2hvbGQ6IDEwLFxuICBsb29wOiBmYWxzZSxcbiAgc2tpcFNuYXBzOiBmYWxzZSxcbiAgZHVyYXRpb246IDI1LFxuICBzdGFydEluZGV4OiAwLFxuICBhY3RpdmU6IHRydWUsXG4gIHdhdGNoRHJhZzogdHJ1ZSxcbiAgd2F0Y2hSZXNpemU6IHRydWUsXG4gIHdhdGNoU2xpZGVzOiB0cnVlXG59XG5cbmV4cG9ydCB0eXBlIEVtYmxhT3B0aW9uc1R5cGUgPSBQYXJ0aWFsPE9wdGlvbnNUeXBlPlxuIiwiaW1wb3J0IHsgTG9vc2VPcHRpb25zVHlwZSwgQ3JlYXRlT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBvYmplY3RLZXlzLCBvYmplY3RzTWVyZ2VEZWVwLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBPcHRpb25zVHlwZSA9IFBhcnRpYWw8Q3JlYXRlT3B0aW9uc1R5cGU8TG9vc2VPcHRpb25zVHlwZT4+XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNIYW5kbGVyVHlwZSA9IHtcbiAgbWVyZ2VPcHRpb25zOiA8VHlwZUEgZXh0ZW5kcyBPcHRpb25zVHlwZSwgVHlwZUIgZXh0ZW5kcyBPcHRpb25zVHlwZT4oXG4gICAgb3B0aW9uc0E6IFR5cGVBLFxuICAgIG9wdGlvbnNCPzogVHlwZUJcbiAgKSA9PiBUeXBlQVxuICBvcHRpb25zQXRNZWRpYTogPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSkgPT4gVHlwZVxuICBvcHRpb25zTWVkaWFRdWVyaWVzOiAob3B0aW9uc0xpc3Q6IE9wdGlvbnNUeXBlW10pID0+IE1lZGlhUXVlcnlMaXN0W11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbnNIYW5kbGVyKG93bmVyV2luZG93OiBXaW5kb3dUeXBlKTogT3B0aW9uc0hhbmRsZXJUeXBlIHtcbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICk6IFR5cGVBIHtcbiAgICByZXR1cm4gPFR5cGVBPm9iamVjdHNNZXJnZURlZXAob3B0aW9uc0EsIG9wdGlvbnNCIHx8IHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc0F0TWVkaWE8VHlwZSBleHRlbmRzIE9wdGlvbnNUeXBlPihvcHRpb25zOiBUeXBlKTogVHlwZSB7XG4gICAgY29uc3Qgb3B0aW9uc0F0TWVkaWEgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9XG4gICAgY29uc3QgbWF0Y2hlZE1lZGlhT3B0aW9ucyA9IG9iamVjdEtleXMob3B0aW9uc0F0TWVkaWEpXG4gICAgICAuZmlsdGVyKChtZWRpYSkgPT4gb3duZXJXaW5kb3cubWF0Y2hNZWRpYShtZWRpYSkubWF0Y2hlcylcbiAgICAgIC5tYXAoKG1lZGlhKSA9PiBvcHRpb25zQXRNZWRpYVttZWRpYV0pXG4gICAgICAucmVkdWNlKChhLCBtZWRpYU9wdGlvbikgPT4gbWVyZ2VPcHRpb25zKGEsIG1lZGlhT3B0aW9uKSwge30pXG5cbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIG1hdGNoZWRNZWRpYU9wdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBvcHRpb25zTWVkaWFRdWVyaWVzKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKTogTWVkaWFRdWVyeUxpc3RbXSB7XG4gICAgcmV0dXJuIG9wdGlvbnNMaXN0XG4gICAgICAubWFwKChvcHRpb25zKSA9PiBvYmplY3RLZXlzKG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge30pKVxuICAgICAgLnJlZHVjZSgoYWNjLCBtZWRpYVF1ZXJpZXMpID0+IGFjYy5jb25jYXQobWVkaWFRdWVyaWVzKSwgW10pXG4gICAgICAubWFwKG93bmVyV2luZG93Lm1hdGNoTWVkaWEpXG4gIH1cblxuICBjb25zdCBzZWxmOiBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gICAgbWVyZ2VPcHRpb25zLFxuICAgIG9wdGlvbnNBdE1lZGlhLFxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlclR5cGUgfSBmcm9tICcuL09wdGlvbnNIYW5kbGVyJ1xuaW1wb3J0IHsgRW1ibGFQbHVnaW5zVHlwZSwgRW1ibGFQbHVnaW5UeXBlIH0gZnJvbSAnLi9QbHVnaW5zJ1xuXG5leHBvcnQgdHlwZSBQbHVnaW5zSGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChcbiAgICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gICAgcGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW11cbiAgKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsdWdpbnNIYW5kbGVyKFxuICBvcHRpb25zSGFuZGxlcjogT3B0aW9uc0hhbmRsZXJUeXBlXG4pOiBQbHVnaW5zSGFuZGxlclR5cGUge1xuICBsZXQgYWN0aXZlUGx1Z2luczogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuXG4gIGZ1bmN0aW9uIGluaXQoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBwbHVnaW5zLmZpbHRlcihcbiAgICAgICh7IG9wdGlvbnMgfSkgPT4gb3B0aW9uc0hhbmRsZXIub3B0aW9uc0F0TWVkaWEob3B0aW9ucykuYWN0aXZlICE9PSBmYWxzZVxuICAgIClcbiAgICBhY3RpdmVQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4gcGx1Z2luLmluaXQoZW1ibGFBcGksIG9wdGlvbnNIYW5kbGVyKSlcblxuICAgIHJldHVybiBwbHVnaW5zLnJlZHVjZShcbiAgICAgIChtYXAsIHBsdWdpbikgPT4gT2JqZWN0LmFzc2lnbihtYXAsIHsgW3BsdWdpbi5uYW1lXTogcGx1Z2luIH0pLFxuICAgICAge31cbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGFjdGl2ZVBsdWdpbnMgPSBhY3RpdmVQbHVnaW5zLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW4uZGVzdHJveSgpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmUsIEVuZ2luZVR5cGUgfSBmcm9tICcuL0VuZ2luZSdcbmltcG9ydCB7IEV2ZW50U3RvcmUgfSBmcm9tICcuL0V2ZW50U3RvcmUnXG5pbXBvcnQgeyBFdmVudEhhbmRsZXIsIEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zLCBFbWJsYU9wdGlvbnNUeXBlLCBPcHRpb25zVHlwZSB9IGZyb20gJy4vT3B0aW9ucydcbmltcG9ydCB7IE9wdGlvbnNIYW5kbGVyIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IFBsdWdpbnNIYW5kbGVyIH0gZnJvbSAnLi9QbHVnaW5zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcbmltcG9ydCB7IGlzU3RyaW5nLCBXaW5kb3dUeXBlIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gIGNhblNjcm9sbE5leHQ6ICgpID0+IGJvb2xlYW5cbiAgY2FuU2Nyb2xsUHJldjogKCkgPT4gYm9vbGVhblxuICBjb250YWluZXJOb2RlOiAoKSA9PiBIVE1MRWxlbWVudFxuICBpbnRlcm5hbEVuZ2luZTogKCkgPT4gRW5naW5lVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIG9mZjogRXZlbnRIYW5kbGVyVHlwZVsnb2ZmJ11cbiAgb246IEV2ZW50SGFuZGxlclR5cGVbJ29uJ11cbiAgZW1pdDogRXZlbnRIYW5kbGVyVHlwZVsnZW1pdCddXG4gIHBsdWdpbnM6ICgpID0+IEVtYmxhUGx1Z2luc1R5cGVcbiAgcHJldmlvdXNTY3JvbGxTbmFwOiAoKSA9PiBudW1iZXJcbiAgcmVJbml0OiAob3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsIHBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXSkgPT4gdm9pZFxuICByb290Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgc2Nyb2xsTmV4dDogKGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNjcm9sbFByZXY6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcm9ncmVzczogKCkgPT4gbnVtYmVyXG4gIHNjcm9sbFNuYXBMaXN0OiAoKSA9PiBudW1iZXJbXVxuICBzY3JvbGxUbzogKGluZGV4OiBudW1iZXIsIGp1bXA/OiBib29sZWFuKSA9PiB2b2lkXG4gIHNlbGVjdGVkU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHNsaWRlTm9kZXM6ICgpID0+IEhUTUxFbGVtZW50W11cbiAgc2xpZGVzSW5WaWV3OiAoKSA9PiBudW1iZXJbXVxuICBzbGlkZXNOb3RJblZpZXc6ICgpID0+IG51bWJlcltdXG59XG5cbmZ1bmN0aW9uIEVtYmxhQ2Fyb3VzZWwoXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxuICB1c2VyT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gIHVzZXJQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbik6IEVtYmxhQ2Fyb3VzZWxUeXBlIHtcbiAgY29uc3Qgb3duZXJEb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudFxuICBjb25zdCBvd25lcldpbmRvdyA9IDxXaW5kb3dUeXBlPm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgY29uc3Qgb3B0aW9uc0hhbmRsZXIgPSBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdylcbiAgY29uc3QgcGx1Z2luc0hhbmRsZXIgPSBQbHVnaW5zSGFuZGxlcihvcHRpb25zSGFuZGxlcilcbiAgY29uc3QgbWVkaWFIYW5kbGVycyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBldmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXIoKVxuICBjb25zdCB7IG1lcmdlT3B0aW9ucywgb3B0aW9uc0F0TWVkaWEsIG9wdGlvbnNNZWRpYVF1ZXJpZXMgfSA9IG9wdGlvbnNIYW5kbGVyXG4gIGNvbnN0IHsgb24sIG9mZiwgZW1pdCB9ID0gZXZlbnRIYW5kbGVyXG4gIGNvbnN0IHJlSW5pdCA9IHJlQWN0aXZhdGVcblxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcbiAgbGV0IGVuZ2luZTogRW5naW5lVHlwZVxuICBsZXQgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIEVtYmxhQ2Fyb3VzZWwuZ2xvYmFsT3B0aW9ucylcbiAgbGV0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UpXG4gIGxldCBwbHVnaW5MaXN0OiBFbWJsYVBsdWdpblR5cGVbXSA9IFtdXG4gIGxldCBwbHVnaW5BcGlzOiBFbWJsYVBsdWdpbnNUeXBlXG5cbiAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgbGV0IHNsaWRlczogSFRNTEVsZW1lbnRbXVxuXG4gIGZ1bmN0aW9uIHN0b3JlRWxlbWVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXI6IHVzZXJDb250YWluZXIsIHNsaWRlczogdXNlclNsaWRlcyB9ID0gb3B0aW9uc1xuXG4gICAgY29uc3QgY3VzdG9tQ29udGFpbmVyID0gaXNTdHJpbmcodXNlckNvbnRhaW5lcilcbiAgICAgID8gcm9vdC5xdWVyeVNlbGVjdG9yKHVzZXJDb250YWluZXIpXG4gICAgICA6IHVzZXJDb250YWluZXJcbiAgICBjb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+KGN1c3RvbUNvbnRhaW5lciB8fCByb290LmNoaWxkcmVuWzBdKVxuXG4gICAgY29uc3QgY3VzdG9tU2xpZGVzID0gaXNTdHJpbmcodXNlclNsaWRlcylcbiAgICAgID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodXNlclNsaWRlcylcbiAgICAgIDogdXNlclNsaWRlc1xuICAgIHNsaWRlcyA9IDxIVE1MRWxlbWVudFtdPltdLnNsaWNlLmNhbGwoY3VzdG9tU2xpZGVzIHx8IGNvbnRhaW5lci5jaGlsZHJlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVuZ2luZShvcHRpb25zOiBPcHRpb25zVHlwZSk6IEVuZ2luZVR5cGUge1xuICAgIGNvbnN0IGVuZ2luZSA9IEVuZ2luZShcbiAgICAgIHJvb3QsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzbGlkZXMsXG4gICAgICBvd25lckRvY3VtZW50LFxuICAgICAgb3duZXJXaW5kb3csXG4gICAgICBvcHRpb25zLFxuICAgICAgZXZlbnRIYW5kbGVyXG4gICAgKVxuXG4gICAgaWYgKG9wdGlvbnMubG9vcCAmJiAhZW5naW5lLnNsaWRlTG9vcGVyLmNhbkxvb3AoKSkge1xuICAgICAgY29uc3Qgb3B0aW9uc1dpdGhvdXRMb29wID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBsb29wOiBmYWxzZSB9KVxuICAgICAgcmV0dXJuIGNyZWF0ZUVuZ2luZShvcHRpb25zV2l0aG91dExvb3ApXG4gICAgfVxuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuXG4gICAgb3B0aW9uc0Jhc2UgPSBtZXJnZU9wdGlvbnMob3B0aW9uc0Jhc2UsIHdpdGhPcHRpb25zKVxuICAgIG9wdGlvbnMgPSBvcHRpb25zQXRNZWRpYShvcHRpb25zQmFzZSlcbiAgICBwbHVnaW5MaXN0ID0gd2l0aFBsdWdpbnMgfHwgcGx1Z2luTGlzdFxuXG4gICAgc3RvcmVFbGVtZW50cygpXG5cbiAgICBlbmdpbmUgPSBjcmVhdGVFbmdpbmUob3B0aW9ucylcblxuICAgIG9wdGlvbnNNZWRpYVF1ZXJpZXMoW1xuICAgICAgb3B0aW9uc0Jhc2UsXG4gICAgICAuLi5wbHVnaW5MaXN0Lm1hcCgoeyBvcHRpb25zIH0pID0+IG9wdGlvbnMpXG4gICAgXSkuZm9yRWFjaCgocXVlcnkpID0+IG1lZGlhSGFuZGxlcnMuYWRkKHF1ZXJ5LCAnY2hhbmdlJywgcmVBY3RpdmF0ZSkpXG5cbiAgICBpZiAoIW9wdGlvbnMuYWN0aXZlKSByZXR1cm5cblxuICAgIGVuZ2luZS50cmFuc2xhdGUudG8oZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICAgIGVuZ2luZS5hbmltYXRpb24uaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5pbml0KClcbiAgICBlbmdpbmUuc2xpZGVGb2N1cy5pbml0KClcbiAgICBlbmdpbmUuZXZlbnRIYW5kbGVyLmluaXQoc2VsZilcbiAgICBlbmdpbmUucmVzaXplSGFuZGxlci5pbml0KHNlbGYpXG4gICAgZW5naW5lLnNsaWRlc0hhbmRsZXIuaW5pdChzZWxmKVxuXG4gICAgaWYgKGVuZ2luZS5vcHRpb25zLmxvb3ApIGVuZ2luZS5zbGlkZUxvb3Blci5sb29wKClcbiAgICBpZiAoY29udGFpbmVyLm9mZnNldFBhcmVudCAmJiBzbGlkZXMubGVuZ3RoKSBlbmdpbmUuZHJhZ0hhbmRsZXIuaW5pdChzZWxmKVxuXG4gICAgcGx1Z2luQXBpcyA9IHBsdWdpbnNIYW5kbGVyLmluaXQoc2VsZiwgcGx1Z2luTGlzdClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlQWN0aXZhdGUoXG4gICAgd2l0aE9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICAgIHdpdGhQbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW11cbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gICAgZGVBY3RpdmF0ZSgpXG4gICAgYWN0aXZhdGUobWVyZ2VPcHRpb25zKHsgc3RhcnRJbmRleCB9LCB3aXRoT3B0aW9ucyksIHdpdGhQbHVnaW5zKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdyZUluaXQnKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVBY3RpdmF0ZSgpOiB2b2lkIHtcbiAgICBlbmdpbmUuZHJhZ0hhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLmV2ZW50U3RvcmUuY2xlYXIoKVxuICAgIGVuZ2luZS50cmFuc2xhdGUuY2xlYXIoKVxuICAgIGVuZ2luZS5zbGlkZUxvb3Blci5jbGVhcigpXG4gICAgZW5naW5lLnJlc2l6ZUhhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLnNsaWRlc0hhbmRsZXIuZGVzdHJveSgpXG4gICAgZW5naW5lLnNsaWRlc0luVmlldy5kZXN0cm95KClcbiAgICBlbmdpbmUuYW5pbWF0aW9uLmRlc3Ryb3koKVxuICAgIHBsdWdpbnNIYW5kbGVyLmRlc3Ryb3koKVxuICAgIG1lZGlhSGFuZGxlcnMuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gICAgbWVkaWFIYW5kbGVycy5jbGVhcigpXG4gICAgZGVBY3RpdmF0ZSgpXG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ2Rlc3Ryb3knKVxuICAgIGV2ZW50SGFuZGxlci5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUbyhpbmRleDogbnVtYmVyLCBqdW1wPzogYm9vbGVhbiwgZGlyZWN0aW9uPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCFvcHRpb25zLmFjdGl2ZSB8fCBkZXN0cm95ZWQpIHJldHVyblxuICAgIGVuZ2luZS5zY3JvbGxCb2R5XG4gICAgICAudXNlQmFzZUZyaWN0aW9uKClcbiAgICAgIC51c2VEdXJhdGlvbihqdW1wID09PSB0cnVlID8gMCA6IG9wdGlvbnMuZHVyYXRpb24pXG4gICAgZW5naW5lLnNjcm9sbFRvLmluZGV4KGluZGV4LCBkaXJlY3Rpb24gfHwgMClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbE5leHQoanVtcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0ID0gZW5naW5lLmluZGV4LmFkZCgxKS5nZXQoKVxuICAgIHNjcm9sbFRvKG5leHQsIGp1bXAsIC0xKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUHJldihqdW1wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSBlbmdpbmUuaW5kZXguYWRkKC0xKS5nZXQoKVxuICAgIHNjcm9sbFRvKHByZXYsIGp1bXAsIDEpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5TY3JvbGxOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5leHQgPSBlbmdpbmUuaW5kZXguYWRkKDEpLmdldCgpXG4gICAgcmV0dXJuIG5leHQgIT09IHNlbGVjdGVkU2Nyb2xsU25hcCgpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5TY3JvbGxQcmV2KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByZXYgPSBlbmdpbmUuaW5kZXguYWRkKC0xKS5nZXQoKVxuICAgIHJldHVybiBwcmV2ICE9PSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsU25hcExpc3QoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2Nyb2xsU25hcExpc3RcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFByb2dyZXNzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5zY3JvbGxQcm9ncmVzcy5nZXQoZW5naW5lLmxvY2F0aW9uLmdldCgpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0ZWRTY3JvbGxTbmFwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5pbmRleC5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTY3JvbGxTbmFwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZ2luZS5pbmRleFByZXZpb3VzLmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJblZpZXcoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2xpZGVzSW5WaWV3LmdldCgpXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNOb3RJblZpZXcoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBlbmdpbmUuc2xpZGVzSW5WaWV3LmdldChmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsdWdpbnMoKTogRW1ibGFQbHVnaW5zVHlwZSB7XG4gICAgcmV0dXJuIHBsdWdpbkFwaXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVybmFsRW5naW5lKCk6IEVuZ2luZVR5cGUge1xuICAgIHJldHVybiBlbmdpbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIHJvb3ROb2RlKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gcm9vdFxuICB9XG5cbiAgZnVuY3Rpb24gY29udGFpbmVyTm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGNvbnRhaW5lclxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVOb2RlcygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gc2xpZGVzXG4gIH1cblxuICBjb25zdCBzZWxmOiBFbWJsYUNhcm91c2VsVHlwZSA9IHtcbiAgICBjYW5TY3JvbGxOZXh0LFxuICAgIGNhblNjcm9sbFByZXYsXG4gICAgY29udGFpbmVyTm9kZSxcbiAgICBpbnRlcm5hbEVuZ2luZSxcbiAgICBkZXN0cm95LFxuICAgIG9mZixcbiAgICBvbixcbiAgICBlbWl0LFxuICAgIHBsdWdpbnMsXG4gICAgcHJldmlvdXNTY3JvbGxTbmFwLFxuICAgIHJlSW5pdCxcbiAgICByb290Tm9kZSxcbiAgICBzY3JvbGxOZXh0LFxuICAgIHNjcm9sbFByZXYsXG4gICAgc2Nyb2xsUHJvZ3Jlc3MsXG4gICAgc2Nyb2xsU25hcExpc3QsXG4gICAgc2Nyb2xsVG8sXG4gICAgc2VsZWN0ZWRTY3JvbGxTbmFwLFxuICAgIHNsaWRlTm9kZXMsXG4gICAgc2xpZGVzSW5WaWV3LFxuICAgIHNsaWRlc05vdEluVmlld1xuICB9XG5cbiAgYWN0aXZhdGUodXNlck9wdGlvbnMsIHVzZXJQbHVnaW5zKVxuICBzZXRUaW1lb3V0KCgpID0+IGV2ZW50SGFuZGxlci5lbWl0KCdpbml0JyksIDApXG4gIHJldHVybiBzZWxmXG59XG5cbmRlY2xhcmUgbmFtZXNwYWNlIEVtYmxhQ2Fyb3VzZWwge1xuICBsZXQgZ2xvYmFsT3B0aW9uczogRW1ibGFPcHRpb25zVHlwZSB8IHVuZGVmaW5lZFxufVxuXG5FbWJsYUNhcm91c2VsLmdsb2JhbE9wdGlvbnMgPSB1bmRlZmluZWRcblxuZXhwb3J0IGRlZmF1bHQgRW1ibGFDYXJvdXNlbFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1ibGFDYXJvdXNlbCBmcm9tICdlbWJsYS1jYXJvdXNlbCdcbmltcG9ydCB7XG4gICAgYWRkVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyxcbiAgICBhZGRUb2dnbGVUaHVtYkJ0bnNBY3RpdmVcbn0gZnJvbSAnLi9idXR0b25zLmVzNidcblxuY2xhc3MgWVREeW5hbWljc0dhbGxlcnkge1xuICAgIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IE9QVElPTlMgPSB7XG5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBPUFRJT05TX1RIVU1CUyA9IHtcbiAgICAgICAgICAgIGF4aXM6ICd5JyxcbiAgICAgICAgICAgIGRyYWdGcmVlOiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgdmlld3BvcnROb2RlTWFpbkNhcm91c2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93X192aWV3cG9ydCcpXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0Tm9kZVRodW1iQ2Fyb3VzZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm1zbGlkZXNob3ctdGh1bWJzX192aWV3cG9ydCcpXG4gICAgICAgIGNvbnN0IGVtYmxhQXBpTWFpbiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlTWFpbkNhcm91c2VsLCBPUFRJT05TKVxuICAgICAgICBjb25zdCBlbWJsYUFwaVRodW1iID0gRW1ibGFDYXJvdXNlbCh2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsLCBPUFRJT05TX1RIVU1CUylcblxuICAgICAgICBjb25zdCByZW1vdmVUaHVtYkJ0bnNDbGlja0hhbmRsZXJzID0gYWRkVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyhcbiAgICAgICAgICAgIGVtYmxhQXBpTWFpbixcbiAgICAgICAgICAgIGVtYmxhQXBpVGh1bWJcbiAgICAgICAgKVxuICAgICAgICBjb25zdCByZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUgPSBhZGRUb2dnbGVUaHVtYkJ0bnNBY3RpdmUoXG4gICAgICAgICAgICBlbWJsYUFwaU1haW4sXG4gICAgICAgICAgICBlbWJsYUFwaVRodW1iXG4gICAgICAgIClcblxuICAgICAgICBlbWJsYUFwaU1haW5cbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUpXG5cbiAgICAgICAgZW1ibGFBcGlUaHVtYlxuICAgICAgICAgICAgLm9uKCdkZXN0cm95JywgcmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycylcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRvZ2dsZVRodW1iQnRuc0FjdGl2ZSlcbiAgICB9XG59XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAobmV3IFlURHluYW1pY3NHYWxsZXJ5KS5pbml0KCk7XG59KTsiXSwibmFtZXMiOlsiYWRkVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyIsImVtYmxhQXBpTWFpbiIsImVtYmxhQXBpVGh1bWIiLCJzbGlkZXNUaHVtYnMiLCJzbGlkZU5vZGVzIiwic2Nyb2xsVG9JbmRleCIsIm1hcCIsIl8iLCJpbmRleCIsInNjcm9sbFRvIiwiZm9yRWFjaCIsInNsaWRlTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkVG9nZ2xlVGh1bWJCdG5zQWN0aXZlIiwidG9nZ2xlVGh1bWJCdG5zU3RhdGUiLCJzZWxlY3RlZFNjcm9sbFNuYXAiLCJwcmV2aW91cyIsInByZXZpb3VzU2Nyb2xsU25hcCIsInNlbGVjdGVkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwib24iLCJpc051bWJlciIsInN1YmplY3QiLCJpc1N0cmluZyIsImlzQm9vbGVhbiIsImlzT2JqZWN0IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibWF0aEFicyIsIm4iLCJNYXRoIiwiYWJzIiwibWF0aFNpZ24iLCJzaWduIiwiZGVsdGFBYnMiLCJ2YWx1ZUIiLCJ2YWx1ZUEiLCJmYWN0b3JBYnMiLCJkaWZmIiwiYXJyYXlLZXlzIiwiYXJyYXkiLCJvYmplY3RLZXlzIiwiTnVtYmVyIiwiYXJyYXlMYXN0IiwiYXJyYXlMYXN0SW5kZXgiLCJtYXgiLCJsZW5ndGgiLCJhcnJheUlzTGFzdEluZGV4IiwiYXJyYXlGcm9tTnVtYmVyIiwic3RhcnRBdCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIkFycmF5IiwiZnJvbSIsImkiLCJvYmplY3QiLCJrZXlzIiwib2JqZWN0c01lcmdlRGVlcCIsIm9iamVjdEEiLCJvYmplY3RCIiwicmVkdWNlIiwibWVyZ2VkT2JqZWN0cyIsImN1cnJlbnRPYmplY3QiLCJrZXkiLCJhcmVPYmplY3RzIiwiaXNNb3VzZUV2ZW50IiwiZXZ0Iiwib3duZXJXaW5kb3ciLCJNb3VzZUV2ZW50IiwiQWxpZ25tZW50IiwiYWxpZ24iLCJ2aWV3U2l6ZSIsInByZWRlZmluZWQiLCJzdGFydCIsImNlbnRlciIsImVuZCIsIm1lYXN1cmUiLCJzZWxmIiwiRXZlbnRTdG9yZSIsImxpc3RlbmVycyIsIm5vZGUiLCJ0eXBlIiwiaGFuZGxlciIsIm9wdGlvbnMiLCJwYXNzaXZlIiwicmVtb3ZlTGlzdGVuZXIiLCJsZWdhY3lNZWRpYVF1ZXJ5TGlzdCIsImFkZExpc3RlbmVyIiwicHVzaCIsImNsZWFyIiwiZmlsdGVyIiwiQW5pbWF0aW9ucyIsIm93bmVyRG9jdW1lbnQiLCJ1cGRhdGUiLCJkb2N1bWVudFZpc2libGVIYW5kbGVyIiwidGltZVN0ZXAiLCJsYXN0VGltZVN0YW1wIiwiYW5pbWF0aW9uRnJhbWUiLCJsYWciLCJpbml0IiwiaGlkZGVuIiwicmVzZXQiLCJkZXN0cm95Iiwic3RvcCIsImFuaW1hdGUiLCJ0aW1lU3RhbXAiLCJ0aW1lRWxhcHNlZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiQXhpcyIsImF4aXMiLCJjb250ZW50RGlyZWN0aW9uIiwiaXNSaWdodFRvTGVmdCIsImlzVmVydGljYWwiLCJzY3JvbGwiLCJjcm9zcyIsInN0YXJ0RWRnZSIsImdldFN0YXJ0RWRnZSIsImVuZEVkZ2UiLCJnZXRFbmRFZGdlIiwibWVhc3VyZVNpemUiLCJub2RlUmVjdCIsImhlaWdodCIsIndpZHRoIiwiZGlyZWN0aW9uIiwiTGltaXQiLCJtaW4iLCJyZWFjaGVkTWluIiwicmVhY2hlZE1heCIsInJlYWNoZWRBbnkiLCJjb25zdHJhaW4iLCJyZW1vdmVPZmZzZXQiLCJjZWlsIiwiQ291bnRlciIsImxvb3AiLCJsb29wRW5kIiwiY291bnRlciIsIndpdGhpbkxpbWl0IiwiZ2V0Iiwic2V0IiwiY2xvbmUiLCJEcmFnSGFuZGxlciIsInJvb3ROb2RlIiwidGFyZ2V0IiwiZHJhZ1RyYWNrZXIiLCJsb2NhdGlvbiIsImFuaW1hdGlvbiIsInNjcm9sbEJvZHkiLCJzY3JvbGxUYXJnZXQiLCJldmVudEhhbmRsZXIiLCJwZXJjZW50T2ZWaWV3IiwiZHJhZ0ZyZWUiLCJkcmFnVGhyZXNob2xkIiwic2tpcFNuYXBzIiwiYmFzZUZyaWN0aW9uIiwid2F0Y2hEcmFnIiwiY3Jvc3NBeGlzIiwiZm9jdXNOb2RlcyIsIm5vblBhc3NpdmVFdmVudCIsImluaXRFdmVudHMiLCJkcmFnRXZlbnRzIiwiZ29Ub05leHRUaHJlc2hvbGQiLCJzbmFwRm9yY2VCb29zdCIsIm1vdXNlIiwidG91Y2giLCJmcmVlRm9yY2VCb29zdCIsImJhc2VTcGVlZCIsImlzTW92aW5nIiwic3RhcnRTY3JvbGwiLCJzdGFydENyb3NzIiwicG9pbnRlcklzRG93biIsInByZXZlbnRTY3JvbGwiLCJwcmV2ZW50Q2xpY2siLCJpc01vdXNlIiwiZW1ibGFBcGkiLCJkb3duSWZBbGxvd2VkIiwiZG93biIsInByZXZlbnREZWZhdWx0IiwidXAiLCJjbGljayIsImFkZERyYWdFdmVudHMiLCJtb3ZlIiwiaXNGb2N1c05vZGUiLCJub2RlTmFtZSIsImluY2x1ZGVzIiwiZm9yY2VCb29zdCIsImJvb3N0IiwiYWxsb3dlZEZvcmNlIiwiZm9yY2UiLCJ0YXJnZXRDaGFuZ2VkIiwibmV4dCIsImJhc2VGb3JjZSIsImJ5RGlzdGFuY2UiLCJkaXN0YW5jZSIsImJ5SW5kZXgiLCJpc01vdXNlRXZ0IiwiYnV0dG9ucyIsImJ1dHRvbiIsInBvaW50ZXJEb3duIiwidXNlRnJpY3Rpb24iLCJ1c2VEdXJhdGlvbiIsInJlYWRQb2ludCIsImVtaXQiLCJpc1RvdWNoRXZ0IiwidG91Y2hlcyIsImxhc3RTY3JvbGwiLCJsYXN0Q3Jvc3MiLCJkaWZmU2Nyb2xsIiwiZGlmZkNyb3NzIiwiY2FuY2VsYWJsZSIsInBvaW50ZXJNb3ZlIiwiY3VycmVudExvY2F0aW9uIiwicmF3Rm9yY2UiLCJwb2ludGVyVXAiLCJmb3JjZUZhY3RvciIsInNwZWVkIiwiZnJpY3Rpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJEcmFnVHJhY2tlciIsImxvZ0ludGVydmFsIiwic3RhcnRFdmVudCIsImxhc3RFdmVudCIsInJlYWRUaW1lIiwiZXZ0QXhpcyIsInByb3BlcnR5IiwiY29vcmQiLCJleHBpcmVkIiwiZGlmZkRyYWciLCJkaWZmVGltZSIsImlzRmxpY2siLCJOb2RlUmVjdHMiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJQZXJjZW50T2ZWaWV3IiwiUmVzaXplSGFuZGxlciIsImNvbnRhaW5lciIsInNsaWRlcyIsIndhdGNoUmVzaXplIiwibm9kZVJlY3RzIiwicmVzaXplT2JzZXJ2ZXIiLCJjb250YWluZXJTaXplIiwic2xpZGVTaXplcyIsImRlc3Ryb3llZCIsInJlYWRTaXplIiwiZGVmYXVsdENhbGxiYWNrIiwiZW50cmllcyIsImVudHJ5IiwiaXNDb250YWluZXIiLCJzbGlkZUluZGV4IiwiaW5kZXhPZiIsImxhc3RTaXplIiwibmV3U2l6ZSIsImRpZmZTaXplIiwicmVJbml0IiwiUmVzaXplT2JzZXJ2ZXIiLCJvYnNlcnZlTm9kZXMiLCJjb25jYXQiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIlNjcm9sbEJvZHkiLCJiYXNlRHVyYXRpb24iLCJib2R5VmVsb2NpdHkiLCJzY3JvbGxEaXJlY3Rpb24iLCJzY3JvbGxEdXJhdGlvbiIsInNjcm9sbEZyaWN0aW9uIiwicmF3TG9jYXRpb24iLCJyYXdMb2NhdGlvblByZXZpb3VzIiwic2VlayIsImlzSW5zdGFudCIsImRpcmVjdGlvbkRpZmYiLCJzZXR0bGVkIiwiZHVyYXRpb24iLCJ2ZWxvY2l0eSIsInVzZUJhc2VEdXJhdGlvbiIsInVzZUJhc2VGcmljdGlvbiIsIlNjcm9sbEJvdW5kcyIsImxpbWl0IiwicHVsbEJhY2tUaHJlc2hvbGQiLCJlZGdlT2Zmc2V0VG9sZXJhbmNlIiwiZnJpY3Rpb25MaW1pdCIsImRpc2FibGVkIiwic2hvdWxkQ29uc3RyYWluIiwiZWRnZSIsImRpZmZUb0VkZ2UiLCJkaWZmVG9UYXJnZXQiLCJzdWJ0cmFjdCIsInRvZ2dsZUFjdGl2ZSIsImFjdGl2ZSIsIlNjcm9sbENvbnRhaW4iLCJjb250ZW50U2l6ZSIsInNuYXBzQWxpZ25lZCIsImNvbnRhaW5TY3JvbGwiLCJwaXhlbFRvbGVyYW5jZSIsInNjcm9sbEJvdW5kcyIsInNuYXBzQm91bmRlZCIsIm1lYXN1cmVCb3VuZGVkIiwic2Nyb2xsQ29udGFpbkxpbWl0IiwiZmluZFNjcm9sbENvbnRhaW5MaW1pdCIsInNuYXBzQ29udGFpbmVkIiwibWVhc3VyZUNvbnRhaW5lZCIsInVzZVBpeGVsVG9sZXJhbmNlIiwiYm91bmQiLCJzbmFwIiwic3RhcnRTbmFwIiwiZW5kU25hcCIsImxhc3RJbmRleE9mIiwic25hcEFsaWduZWQiLCJpc0ZpcnN0IiwiaXNMYXN0Iiwic2Nyb2xsQm91bmQiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInNsaWNlIiwiU2Nyb2xsTGltaXQiLCJzY3JvbGxTbmFwcyIsIlNjcm9sbExvb3BlciIsInZlY3RvcnMiLCJqb2ludFNhZmV0eSIsInNob3VsZExvb3AiLCJsb29wRGlzdGFuY2UiLCJ2IiwiU2Nyb2xsUHJvZ3Jlc3MiLCJTY3JvbGxTbmFwcyIsImFsaWdubWVudCIsImNvbnRhaW5lclJlY3QiLCJzbGlkZVJlY3RzIiwic2xpZGVzVG9TY3JvbGwiLCJncm91cFNsaWRlcyIsImFsaWdubWVudHMiLCJtZWFzdXJlU2l6ZXMiLCJzbmFwcyIsIm1lYXN1cmVVbmFsaWduZWQiLCJtZWFzdXJlQWxpZ25lZCIsInJlY3RzIiwicmVjdCIsImciLCJTbGlkZVJlZ2lzdHJ5IiwiY29udGFpblNuYXBzIiwic2xpZGVJbmRleGVzIiwic2xpZGVSZWdpc3RyeSIsImNyZWF0ZVNsaWRlUmVnaXN0cnkiLCJncm91cGVkU2xpZGVJbmRleGVzIiwiZG9Ob3RDb250YWluIiwiZ3JvdXAiLCJncm91cHMiLCJyYW5nZSIsIlNjcm9sbFRhcmdldCIsInRhcmdldFZlY3RvciIsIm1pbkRpc3RhbmNlIiwiZGlzdGFuY2VzIiwic29ydCIsImEiLCJiIiwiZmluZFRhcmdldFNuYXAiLCJhc2NEaWZmc1RvU25hcHMiLCJzaG9ydGN1dCIsImQxIiwiZDIiLCJ0YXJnZXRzIiwibWF0Y2hpbmdUYXJnZXRzIiwidCIsImRpZmZUb1NuYXAiLCJ0YXJnZXRTbmFwRGlzdGFuY2UiLCJyZWFjaGVkQm91bmQiLCJzbmFwRGlzdGFuY2UiLCJTY3JvbGxUbyIsImluZGV4Q3VycmVudCIsImluZGV4UHJldmlvdXMiLCJkaXN0YW5jZURpZmYiLCJpbmRleERpZmYiLCJ0YXJnZXRJbmRleCIsIlNsaWRlRm9jdXMiLCJyb290IiwiZXZlbnRTdG9yZSIsImxhc3RUYWJQcmVzc1RpbWUiLCJkb2N1bWVudCIsInJlZ2lzdGVyVGFiUHJlc3MiLCJhZGRTbGlkZUZvY3VzRXZlbnQiLCJldmVudCIsImNvZGUiLCJEYXRlIiwiZ2V0VGltZSIsInNsaWRlIiwiZm9jdXMiLCJub3dUaW1lIiwic2Nyb2xsTGVmdCIsImZpbmRJbmRleCIsImNhcHR1cmUiLCJWZWN0b3IxRCIsImluaXRpYWxWYWx1ZSIsInZhbHVlIiwibm9ybWFsaXplSW5wdXQiLCJUcmFuc2xhdGUiLCJ0cmFuc2xhdGUiLCJ4IiwieSIsImNvbnRhaW5lclN0eWxlIiwic3R5bGUiLCJ0byIsInRyYW5zZm9ybSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsIlNsaWRlTG9vcGVyIiwic2xpZGVTaXplc1dpdGhHYXBzIiwicm91bmRpbmdTYWZldHkiLCJhc2NJdGVtcyIsImRlc2NJdGVtcyIsInJldmVyc2UiLCJsb29wUG9pbnRzIiwic3RhcnRQb2ludHMiLCJlbmRQb2ludHMiLCJyZW1vdmVTbGlkZVNpemVzIiwiaW5kZXhlcyIsInNsaWRlc0luR2FwIiwiZ2FwIiwicmVtYWluaW5nR2FwIiwiZmluZFNsaWRlQm91bmRzIiwiZmluZExvb3BQb2ludHMiLCJpc0VuZEVkZ2UiLCJzbGlkZUJvdW5kcyIsImluaXRpYWwiLCJhbHRlcmVkIiwiYm91bmRFZGdlIiwibG9vcFBvaW50Iiwic2xpZGVMb2NhdGlvbiIsImNhbkxvb3AiLCJldmVyeSIsIl9yZWYiLCJvdGhlckluZGV4ZXMiLCJzaGlmdExvY2F0aW9uIiwiU2xpZGVzSGFuZGxlciIsIndhdGNoU2xpZGVzIiwibXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm11dGF0aW9uIiwiTXV0YXRpb25PYnNlcnZlciIsImNoaWxkTGlzdCIsIlNsaWRlc0luVmlldyIsInRocmVzaG9sZCIsImludGVyc2VjdGlvbkVudHJ5TWFwIiwiaW5WaWV3Q2FjaGUiLCJub3RJblZpZXdDYWNoZSIsImludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJwYXJlbnRFbGVtZW50IiwiY3JlYXRlSW5WaWV3TGlzdCIsImluVmlldyIsImxpc3QiLCJwYXJzZUludCIsImlzSW50ZXJzZWN0aW5nIiwiaW5WaWV3TWF0Y2giLCJub3RJblZpZXdNYXRjaCIsIlNsaWRlU2l6ZXMiLCJyZWFkRWRnZUdhcCIsIndpdGhFZGdlR2FwIiwic3RhcnRHYXAiLCJtZWFzdXJlU3RhcnRHYXAiLCJlbmRHYXAiLCJtZWFzdXJlRW5kR2FwIiwibWVhc3VyZVdpdGhHYXBzIiwic2xpZGVSZWN0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImdldFByb3BlcnR5VmFsdWUiLCJTbGlkZXNUb1Njcm9sbCIsImdyb3VwQnlOdW1iZXIiLCJieU51bWJlciIsImdyb3VwU2l6ZSIsImJ5U2l6ZSIsInJlY3RCIiwicmVjdEEiLCJlZGdlQSIsImVkZ2VCIiwiZ2FwQSIsImdhcEIiLCJjaHVua1NpemUiLCJjdXJyZW50U2l6ZSIsInByZXZpb3VzU2l6ZSIsIkVuZ2luZSIsInNjcm9sbEF4aXMiLCJzdGFydEluZGV4IiwiaW5WaWV3VGhyZXNob2xkIiwiX3JlZjIiLCJkcmFnSGFuZGxlciIsInNjcm9sbExvb3BlciIsInNsaWRlTG9vcGVyIiwic2hvdWxkU2V0dGxlIiwid2l0aGluQm91bmRzIiwiaGFzU2V0dGxlZCIsImVuZ2luZSIsInN0YXJ0TG9jYXRpb24iLCJzY3JvbGxQcm9ncmVzcyIsInNsaWRlc0luVmlldyIsInNsaWRlRm9jdXMiLCJyZXNpemVIYW5kbGVyIiwic2Nyb2xsU25hcExpc3QiLCJzbGlkZXNIYW5kbGVyIiwiRXZlbnRIYW5kbGVyIiwiYXBpIiwiZ2V0TGlzdGVuZXJzIiwiZSIsImNiIiwib2ZmIiwiZGVmYXVsdE9wdGlvbnMiLCJicmVha3BvaW50cyIsIk9wdGlvbnNIYW5kbGVyIiwibWVyZ2VPcHRpb25zIiwib3B0aW9uc0EiLCJvcHRpb25zQiIsIm9wdGlvbnNBdE1lZGlhIiwibWF0Y2hlZE1lZGlhT3B0aW9ucyIsIm1lZGlhIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJtZWRpYU9wdGlvbiIsIm9wdGlvbnNNZWRpYVF1ZXJpZXMiLCJvcHRpb25zTGlzdCIsImFjYyIsIm1lZGlhUXVlcmllcyIsIlBsdWdpbnNIYW5kbGVyIiwib3B0aW9uc0hhbmRsZXIiLCJhY3RpdmVQbHVnaW5zIiwicGx1Z2lucyIsIl9yZWYzIiwicGx1Z2luIiwiYXNzaWduIiwibmFtZSIsIkVtYmxhQ2Fyb3VzZWwiLCJ1c2VyT3B0aW9ucyIsInVzZXJQbHVnaW5zIiwiZGVmYXVsdFZpZXciLCJwbHVnaW5zSGFuZGxlciIsIm1lZGlhSGFuZGxlcnMiLCJyZUFjdGl2YXRlIiwib3B0aW9uc0Jhc2UiLCJnbG9iYWxPcHRpb25zIiwicGx1Z2luTGlzdCIsInBsdWdpbkFwaXMiLCJzdG9yZUVsZW1lbnRzIiwidXNlckNvbnRhaW5lciIsInVzZXJTbGlkZXMiLCJjdXN0b21Db250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2hpbGRyZW4iLCJjdXN0b21TbGlkZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY3JlYXRlRW5naW5lIiwib3B0aW9uc1dpdGhvdXRMb29wIiwiYWN0aXZhdGUiLCJ3aXRoT3B0aW9ucyIsIndpdGhQbHVnaW5zIiwiX3JlZjQiLCJxdWVyeSIsIm9mZnNldFBhcmVudCIsImRlQWN0aXZhdGUiLCJqdW1wIiwic2Nyb2xsTmV4dCIsInNjcm9sbFByZXYiLCJwcmV2IiwiY2FuU2Nyb2xsTmV4dCIsImNhblNjcm9sbFByZXYiLCJzbGlkZXNOb3RJblZpZXciLCJpbnRlcm5hbEVuZ2luZSIsImNvbnRhaW5lck5vZGUiLCJzZXRUaW1lb3V0IiwiWVREeW5hbWljc0dhbGxlcnkiLCJPUFRJT05TIiwiT1BUSU9OU19USFVNQlMiLCJ2aWV3cG9ydE5vZGVNYWluQ2Fyb3VzZWwiLCJ2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsIiwicmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyIsInJlbW92ZVRvZ2dsZVRodW1iQnRuc0FjdGl2ZSJdLCJzb3VyY2VSb290IjoiIn0=