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
      align: 'center',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UyxFQUFFK2lCLDJCQUEyQixDQUFDO0lBRS9DcGtCLGFBQWEsQ0FDUnFCLEVBQUUsQ0FBQyxTQUFTLEVBQUU4aUIsNEJBQTRCLENBQUMsQ0FDM0M5aUIsRUFBRSxDQUFDLFNBQVMsRUFBRStpQiwyQkFBMkIsQ0FBQztFQUNuRDtBQUNKO0FBR0FuTSxRQUFRLENBQUN2WCxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0VBQ3JELElBQUlvakIsaUJBQWlCLENBQUQsQ0FBQyxDQUFFeGQsSUFBSSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi9zcmMvYnV0dG9ucy5lczYiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL3V0aWxzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9BbGlnbm1lbnQudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0V2ZW50U3RvcmUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0FuaW1hdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0F4aXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0xpbWl0LnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9Db3VudGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9EcmFnSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvRHJhZ1RyYWNrZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL05vZGVSZWN0cy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUGVyY2VudE9mVmlldy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvUmVzaXplSGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsQm9keS50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsQm91bmRzLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxDb250YWluLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxMaW1pdC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsTG9vcGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TY3JvbGxQcm9ncmVzcy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsU25hcHMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1Njcm9sbFRhcmdldC50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvU2Nyb2xsVG8udHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlRm9jdXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1ZlY3RvcjFkLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9UcmFuc2xhdGUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlTG9vcGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TbGlkZXNIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9TbGlkZXNJblZpZXcudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlU2l6ZXMudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1NsaWRlc1RvU2Nyb2xsLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9FbmdpbmUudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL0V2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3MvLi4vc3JjL2NvbXBvbmVudHMvT3B0aW9uc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vcGxnX3N5c3RlbV95dGR5bmFtaWNzLy4uL3NyYy9jb21wb25lbnRzL1BsdWdpbnNIYW5kbGVyLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uLi9zcmMvY29tcG9uZW50cy9FbWJsYUNhcm91c2VsLnRzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wbGdfc3lzdGVtX3l0ZHluYW1pY3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3BsZ19zeXN0ZW1feXRkeW5hbWljcy8uL3NyYy9nYWxsZXJ5LmVzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYWRkVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyA9IChlbWJsYUFwaU1haW4sIGVtYmxhQXBpVGh1bWIpID0+IHtcbiAgICBjb25zdCBzbGlkZXNUaHVtYnMgPSBlbWJsYUFwaVRodW1iLnNsaWRlTm9kZXMoKVxuXG4gICAgY29uc3Qgc2Nyb2xsVG9JbmRleCA9IHNsaWRlc1RodW1icy5tYXAoXG4gICAgICAgIChfLCBpbmRleCkgPT4gKCkgPT4gZW1ibGFBcGlNYWluLnNjcm9sbFRvKGluZGV4KVxuICAgIClcblxuICAgIHNsaWRlc1RodW1icy5mb3JFYWNoKChzbGlkZU5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHNsaWRlTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFRvSW5kZXhbaW5kZXhdLCBmYWxzZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgc2xpZGVzVGh1bWJzLmZvckVhY2goKHNsaWRlTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNsaWRlTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbFRvSW5kZXhbaW5kZXhdLCBmYWxzZSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRUb2dnbGVUaHVtYkJ0bnNBY3RpdmUgPSAoZW1ibGFBcGlNYWluLCBlbWJsYUFwaVRodW1iKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzVGh1bWJzID0gZW1ibGFBcGlUaHVtYi5zbGlkZU5vZGVzKClcblxuICAgIGNvbnN0IHRvZ2dsZVRodW1iQnRuc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBlbWJsYUFwaVRodW1iLnNjcm9sbFRvKGVtYmxhQXBpTWFpbi5zZWxlY3RlZFNjcm9sbFNuYXAoKSlcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBlbWJsYUFwaU1haW4ucHJldmlvdXNTY3JvbGxTbmFwKClcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICAgICAgc2xpZGVzVGh1bWJzW3ByZXZpb3VzXS5jbGFzc0xpc3QucmVtb3ZlKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpXG4gICAgICAgIHNsaWRlc1RodW1ic1tzZWxlY3RlZF0uY2xhc3NMaXN0LmFkZCgncm1zbGlkZXNob3ctdGh1bWJzX19zbGlkZS0tc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIGVtYmxhQXBpTWFpbi5vbignc2VsZWN0JywgdG9nZ2xlVGh1bWJCdG5zU3RhdGUpXG4gICAgZW1ibGFBcGlUaHVtYi5vbignaW5pdCcsIHRvZ2dsZVRodW1iQnRuc1N0YXRlKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBlbWJsYUFwaU1haW4uc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgICAgICAgc2xpZGVzVGh1bWJzW3NlbGVjdGVkXS5jbGFzc0xpc3QucmVtb3ZlKCdybXNsaWRlc2hvdy10aHVtYnNfX3NsaWRlLS1zZWxlY3RlZCcpXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUG9pbnRlckV2ZW50VHlwZSB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5cbmV4cG9ydCB0eXBlIFdpbmRvd1R5cGUgPSBXaW5kb3cgJiB0eXBlb2YgZ2xvYmFsVGhpc1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIoc3ViamVjdDogdW5rbm93bik6IHN1YmplY3QgaXMgbnVtYmVyIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWJqZWN0ID09PSAnbnVtYmVyJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcoc3ViamVjdDogdW5rbm93bik6IHN1YmplY3QgaXMgc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWJqZWN0ID09PSAnc3RyaW5nJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHN1YmplY3Q6IHVua25vd24pOiBzdWJqZWN0IGlzIGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09ICdib29sZWFuJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qoc3ViamVjdDogdW5rbm93bik6IHN1YmplY3QgaXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBPYmplY3RdJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0aEFicyhuOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5hYnMobilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGhTaWduKG46IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLnNpZ24obilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbHRhQWJzKHZhbHVlQjogbnVtYmVyLCB2YWx1ZUE6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBtYXRoQWJzKHZhbHVlQiAtIHZhbHVlQSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhY3RvckFicyh2YWx1ZUI6IG51bWJlciwgdmFsdWVBOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAodmFsdWVCID09PSAwIHx8IHZhbHVlQSA9PT0gMCkgcmV0dXJuIDBcbiAgaWYgKG1hdGhBYnModmFsdWVCKSA8PSBtYXRoQWJzKHZhbHVlQSkpIHJldHVybiAwXG4gIGNvbnN0IGRpZmYgPSBkZWx0YUFicyhtYXRoQWJzKHZhbHVlQiksIG1hdGhBYnModmFsdWVBKSlcbiAgcmV0dXJuIG1hdGhBYnMoZGlmZiAvIHZhbHVlQilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5S2V5czxUeXBlPihhcnJheTogVHlwZVtdKTogbnVtYmVyW10ge1xuICByZXR1cm4gb2JqZWN0S2V5cyhhcnJheSkubWFwKE51bWJlcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5TGFzdDxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZSB7XG4gIHJldHVybiBhcnJheVthcnJheUxhc3RJbmRleChhcnJheSldXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUxhc3RJbmRleDxUeXBlPihhcnJheTogVHlwZVtdKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUlzTGFzdEluZGV4PFR5cGU+KGFycmF5OiBUeXBlW10sIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIGluZGV4ID09PSBhcnJheUxhc3RJbmRleChhcnJheSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5RnJvbU51bWJlcihuOiBudW1iZXIsIHN0YXJ0QXQ6IG51bWJlciA9IDApOiBudW1iZXJbXSB7XG4gIHJldHVybiBBcnJheS5mcm9tKEFycmF5KG4pLCAoXywgaSkgPT4gc3RhcnRBdCArIGkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RLZXlzPFR5cGUgZXh0ZW5kcyBvYmplY3Q+KG9iamVjdDogVHlwZSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdHNNZXJnZURlZXAoXG4gIG9iamVjdEE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICBvYmplY3RCOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4ge1xuICByZXR1cm4gW29iamVjdEEsIG9iamVjdEJdLnJlZHVjZSgobWVyZ2VkT2JqZWN0cywgY3VycmVudE9iamVjdCkgPT4ge1xuICAgIG9iamVjdEtleXMoY3VycmVudE9iamVjdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZUEgPSBtZXJnZWRPYmplY3RzW2tleV1cbiAgICAgIGNvbnN0IHZhbHVlQiA9IGN1cnJlbnRPYmplY3Rba2V5XVxuICAgICAgY29uc3QgYXJlT2JqZWN0cyA9IGlzT2JqZWN0KHZhbHVlQSkgJiYgaXNPYmplY3QodmFsdWVCKVxuXG4gICAgICBtZXJnZWRPYmplY3RzW2tleV0gPSBhcmVPYmplY3RzXG4gICAgICAgID8gb2JqZWN0c01lcmdlRGVlcCh2YWx1ZUEsIHZhbHVlQilcbiAgICAgICAgOiB2YWx1ZUJcbiAgICB9KVxuICAgIHJldHVybiBtZXJnZWRPYmplY3RzXG4gIH0sIHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNb3VzZUV2ZW50KFxuICBldnQ6IFBvaW50ZXJFdmVudFR5cGUsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlXG4pOiBldnQgaXMgTW91c2VFdmVudCB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG93bmVyV2luZG93Lk1vdXNlRXZlbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgZXZ0IGluc3RhbmNlb2Ygb3duZXJXaW5kb3cuTW91c2VFdmVudFxuICApXG59XG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEFsaWdubWVudE9wdGlvblR5cGUgPVxuICB8ICdzdGFydCdcbiAgfCAnY2VudGVyJ1xuICB8ICdlbmQnXG4gIHwgKCh2aWV3U2l6ZTogbnVtYmVyLCBzbmFwU2l6ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiBudW1iZXIpXG5cbmV4cG9ydCB0eXBlIEFsaWdubWVudFR5cGUgPSB7XG4gIG1lYXN1cmU6IChuOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25tZW50KFxuICBhbGlnbjogQWxpZ25tZW50T3B0aW9uVHlwZSxcbiAgdmlld1NpemU6IG51bWJlclxuKTogQWxpZ25tZW50VHlwZSB7XG4gIGNvbnN0IHByZWRlZmluZWQgPSB7IHN0YXJ0LCBjZW50ZXIsIGVuZCB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZnVuY3Rpb24gY2VudGVyKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGVuZChuKSAvIDJcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZChuOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2aWV3U2l6ZSAtIG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmUobjogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoaXNTdHJpbmcoYWxpZ24pKSByZXR1cm4gcHJlZGVmaW5lZFthbGlnbl0obilcbiAgICByZXR1cm4gYWxpZ24odmlld1NpemUsIG4sIGluZGV4KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogQWxpZ25tZW50VHlwZSA9IHtcbiAgICBtZWFzdXJlXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsInR5cGUgRXZlbnROYW1lVHlwZSA9IGtleW9mIERvY3VtZW50RXZlbnRNYXAgfCBrZXlvZiBXaW5kb3dFdmVudE1hcFxudHlwZSBFdmVudEhhbmRsZXJUeXBlID0gKGV2dDogYW55KSA9PiB2b2lkXG50eXBlIEV2ZW50T3B0aW9uc1R5cGUgPSBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCB1bmRlZmluZWRcbnR5cGUgRXZlbnRSZW1vdmVyVHlwZSA9ICgpID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgRXZlbnRTdG9yZVR5cGUgPSB7XG4gIGFkZDogKFxuICAgIG5vZGU6IEV2ZW50VGFyZ2V0LFxuICAgIHR5cGU6IEV2ZW50TmFtZVR5cGUsXG4gICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgICBvcHRpb25zPzogRXZlbnRPcHRpb25zVHlwZVxuICApID0+IEV2ZW50U3RvcmVUeXBlXG4gIGNsZWFyOiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudFN0b3JlKCk6IEV2ZW50U3RvcmVUeXBlIHtcbiAgbGV0IGxpc3RlbmVyczogRXZlbnRSZW1vdmVyVHlwZVtdID0gW11cblxuICBmdW5jdGlvbiBhZGQoXG4gICAgbm9kZTogRXZlbnRUYXJnZXQsXG4gICAgdHlwZTogRXZlbnROYW1lVHlwZSxcbiAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICAgIG9wdGlvbnM6IEV2ZW50T3B0aW9uc1R5cGUgPSB7IHBhc3NpdmU6IHRydWUgfVxuICApOiBFdmVudFN0b3JlVHlwZSB7XG4gICAgbGV0IHJlbW92ZUxpc3RlbmVyOiBFdmVudFJlbW92ZXJUeXBlXG5cbiAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIG5vZGUpIHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKVxuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVnYWN5TWVkaWFRdWVyeUxpc3QgPSA8TWVkaWFRdWVyeUxpc3Q+bm9kZVxuICAgICAgbGVnYWN5TWVkaWFRdWVyeUxpc3QuYWRkTGlzdGVuZXIoaGFuZGxlcilcbiAgICAgIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4gbGVnYWN5TWVkaWFRdWVyeUxpc3QucmVtb3ZlTGlzdGVuZXIoaGFuZGxlcilcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMucHVzaChyZW1vdmVMaXN0ZW5lcilcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcigocmVtb3ZlKSA9PiByZW1vdmUoKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEV2ZW50U3RvcmVUeXBlID0ge1xuICAgIGFkZCxcbiAgICBjbGVhclxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFbmdpbmVUeXBlIH0gZnJvbSAnLi9FbmdpbmUnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEFuaW1hdGlvbnNVcGRhdGVUeXBlID0gKGVuZ2luZTogRW5naW5lVHlwZSkgPT4gdm9pZFxuXG5leHBvcnQgdHlwZSBBbmltYXRpb25zVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIHN0YXJ0OiAoKSA9PiB2b2lkXG4gIHN0b3A6ICgpID0+IHZvaWRcbiAgdXBkYXRlOiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbmltYXRpb25zKFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHVwZGF0ZTogQW5pbWF0aW9uc1R5cGVbJ3VwZGF0ZSddXG4pOiBBbmltYXRpb25zVHlwZSB7XG4gIGNvbnN0IGRvY3VtZW50VmlzaWJsZUhhbmRsZXIgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgdGltZVN0ZXAgPSAxMDAwIC8gNjBcbiAgbGV0IGxhc3RUaW1lU3RhbXA6IG51bWJlciB8IG51bGwgPSBudWxsXG4gIGxldCBhbmltYXRpb25GcmFtZSA9IDBcbiAgbGV0IGxhZyA9IDBcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGRvY3VtZW50VmlzaWJsZUhhbmRsZXIuYWRkKG93bmVyRG9jdW1lbnQsICd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xuICAgICAgaWYgKG93bmVyRG9jdW1lbnQuaGlkZGVuKSByZXNldCgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3RvcCgpXG4gICAgZG9jdW1lbnRWaXNpYmxlSGFuZGxlci5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlKHRpbWVTdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCk6IHZvaWQge1xuICAgIGlmICghYW5pbWF0aW9uRnJhbWUpIHJldHVyblxuICAgIGlmICghbGFzdFRpbWVTdGFtcCkgbGFzdFRpbWVTdGFtcCA9IHRpbWVTdGFtcFxuXG4gICAgY29uc3QgdGltZUVsYXBzZWQgPSB0aW1lU3RhbXAgLSBsYXN0VGltZVN0YW1wXG4gICAgbGFzdFRpbWVTdGFtcCA9IHRpbWVTdGFtcFxuICAgIGxhZyArPSB0aW1lRWxhcHNlZFxuXG4gICAgd2hpbGUgKGxhZyA+PSB0aW1lU3RlcCkge1xuICAgICAgdXBkYXRlKClcbiAgICAgIGxhZyAtPSB0aW1lU3RlcFxuICAgIH1cblxuICAgIGlmIChhbmltYXRpb25GcmFtZSkgb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpOiB2b2lkIHtcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIHJldHVyblxuXG4gICAgYW5pbWF0aW9uRnJhbWUgPSBvd25lcldpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKTogdm9pZCB7XG4gICAgb3duZXJXaW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpXG4gICAgbGFzdFRpbWVTdGFtcCA9IG51bGxcbiAgICBsYWcgPSAwXG4gICAgYW5pbWF0aW9uRnJhbWUgPSAwXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpOiB2b2lkIHtcbiAgICBsYXN0VGltZVN0YW1wID0gbnVsbFxuICAgIGxhZyA9IDBcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IEFuaW1hdGlvbnNUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBzdGFydCxcbiAgICBzdG9wLFxuICAgIHVwZGF0ZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcblxuZXhwb3J0IHR5cGUgQXhpc09wdGlvblR5cGUgPSAneCcgfCAneSdcbmV4cG9ydCB0eXBlIEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlID0gJ2x0cicgfCAncnRsJ1xudHlwZSBBeGlzRWRnZVR5cGUgPSAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0J1xuXG5leHBvcnQgdHlwZSBBeGlzVHlwZSA9IHtcbiAgc2Nyb2xsOiBBeGlzT3B0aW9uVHlwZVxuICBjcm9zczogQXhpc09wdGlvblR5cGVcbiAgc3RhcnRFZGdlOiBBeGlzRWRnZVR5cGVcbiAgZW5kRWRnZTogQXhpc0VkZ2VUeXBlXG4gIG1lYXN1cmVTaXplOiAobm9kZVJlY3Q6IE5vZGVSZWN0VHlwZSkgPT4gbnVtYmVyXG4gIGRpcmVjdGlvbjogKG46IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBeGlzKFxuICBheGlzOiBBeGlzT3B0aW9uVHlwZSxcbiAgY29udGVudERpcmVjdGlvbjogQXhpc0RpcmVjdGlvbk9wdGlvblR5cGVcbik6IEF4aXNUeXBlIHtcbiAgY29uc3QgaXNSaWdodFRvTGVmdCA9IGNvbnRlbnREaXJlY3Rpb24gPT09ICdydGwnXG4gIGNvbnN0IGlzVmVydGljYWwgPSBheGlzID09PSAneSdcbiAgY29uc3Qgc2Nyb2xsID0gaXNWZXJ0aWNhbCA/ICd5JyA6ICd4J1xuICBjb25zdCBjcm9zcyA9IGlzVmVydGljYWwgPyAneCcgOiAneSdcbiAgY29uc3Qgc2lnbiA9ICFpc1ZlcnRpY2FsICYmIGlzUmlnaHRUb0xlZnQgPyAtMSA6IDFcbiAgY29uc3Qgc3RhcnRFZGdlID0gZ2V0U3RhcnRFZGdlKClcbiAgY29uc3QgZW5kRWRnZSA9IGdldEVuZEVkZ2UoKVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVTaXplKG5vZGVSZWN0OiBOb2RlUmVjdFR5cGUpOiBudW1iZXIge1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gbm9kZVJlY3RcbiAgICByZXR1cm4gaXNWZXJ0aWNhbCA/IGhlaWdodCA6IHdpZHRoXG4gIH1cblxuICBmdW5jdGlvbiBnZXRTdGFydEVkZ2UoKTogQXhpc0VkZ2VUeXBlIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkgcmV0dXJuICd0b3AnXG4gICAgcmV0dXJuIGlzUmlnaHRUb0xlZnQgPyAncmlnaHQnIDogJ2xlZnQnXG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbmRFZGdlKCk6IEF4aXNFZGdlVHlwZSB7XG4gICAgaWYgKGlzVmVydGljYWwpIHJldHVybiAnYm90dG9tJ1xuICAgIHJldHVybiBpc1JpZ2h0VG9MZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICB9XG5cbiAgZnVuY3Rpb24gZGlyZWN0aW9uKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIG4gKiBzaWduXG4gIH1cblxuICBjb25zdCBzZWxmOiBBeGlzVHlwZSA9IHtcbiAgICBzY3JvbGwsXG4gICAgY3Jvc3MsXG4gICAgc3RhcnRFZGdlLFxuICAgIGVuZEVkZ2UsXG4gICAgbWVhc3VyZVNpemUsXG4gICAgZGlyZWN0aW9uXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IG1hdGhBYnMgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBMaW1pdFR5cGUgPSB7XG4gIG1pbjogbnVtYmVyXG4gIG1heDogbnVtYmVyXG4gIGxlbmd0aDogbnVtYmVyXG4gIGNvbnN0cmFpbjogKG46IG51bWJlcikgPT4gbnVtYmVyXG4gIHJlYWNoZWRBbnk6IChuOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgcmVhY2hlZE1heDogKG46IG51bWJlcikgPT4gYm9vbGVhblxuICByZWFjaGVkTWluOiAobjogbnVtYmVyKSA9PiBib29sZWFuXG4gIHJlbW92ZU9mZnNldDogKG46IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW1pdChtaW46IG51bWJlciA9IDAsIG1heDogbnVtYmVyID0gMCk6IExpbWl0VHlwZSB7XG4gIGNvbnN0IGxlbmd0aCA9IG1hdGhBYnMobWluIC0gbWF4KVxuXG4gIGZ1bmN0aW9uIHJlYWNoZWRNaW4objogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG4gPCBtaW5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWNoZWRNYXgobjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG4gPiBtYXhcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWNoZWRBbnkobjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlYWNoZWRNaW4obikgfHwgcmVhY2hlZE1heChuKVxuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RyYWluKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKCFyZWFjaGVkQW55KG4pKSByZXR1cm4gblxuICAgIHJldHVybiByZWFjaGVkTWluKG4pID8gbWluIDogbWF4XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVPZmZzZXQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoIWxlbmd0aCkgcmV0dXJuIG5cbiAgICByZXR1cm4gbiAtIGxlbmd0aCAqIE1hdGguY2VpbCgobiAtIG1heCkgLyBsZW5ndGgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBMaW1pdFR5cGUgPSB7XG4gICAgbGVuZ3RoLFxuICAgIG1heCxcbiAgICBtaW4sXG4gICAgY29uc3RyYWluLFxuICAgIHJlYWNoZWRBbnksXG4gICAgcmVhY2hlZE1heCxcbiAgICByZWFjaGVkTWluLFxuICAgIHJlbW92ZU9mZnNldFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdCB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgQ291bnRlclR5cGUgPSB7XG4gIGdldDogKCkgPT4gbnVtYmVyXG4gIHNldDogKG46IG51bWJlcikgPT4gQ291bnRlclR5cGVcbiAgYWRkOiAobjogbnVtYmVyKSA9PiBDb3VudGVyVHlwZVxuICBjbG9uZTogKCkgPT4gQ291bnRlclR5cGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvdW50ZXIoXG4gIG1heDogbnVtYmVyLFxuICBzdGFydDogbnVtYmVyLFxuICBsb29wOiBib29sZWFuXG4pOiBDb3VudGVyVHlwZSB7XG4gIGNvbnN0IHsgY29uc3RyYWluIH0gPSBMaW1pdCgwLCBtYXgpXG4gIGNvbnN0IGxvb3BFbmQgPSBtYXggKyAxXG4gIGxldCBjb3VudGVyID0gd2l0aGluTGltaXQoc3RhcnQpXG5cbiAgZnVuY3Rpb24gd2l0aGluTGltaXQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gIWxvb3AgPyBjb25zdHJhaW4obikgOiBtYXRoQWJzKChsb29wRW5kICsgbikgJSBsb29wRW5kKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGNvdW50ZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChuOiBudW1iZXIpOiBDb3VudGVyVHlwZSB7XG4gICAgY291bnRlciA9IHdpdGhpbkxpbWl0KG4pXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChuOiBudW1iZXIpOiBDb3VudGVyVHlwZSB7XG4gICAgcmV0dXJuIGNsb25lKCkuc2V0KGdldCgpICsgbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb25lKCk6IENvdW50ZXJUeXBlIHtcbiAgICByZXR1cm4gQ291bnRlcihtYXgsIGdldCgpLCBsb29wKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogQ291bnRlclR5cGUgPSB7XG4gICAgZ2V0LFxuICAgIHNldCxcbiAgICBhZGQsXG4gICAgY2xvbmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW1ibGFDYXJvdXNlbFR5cGUgfSBmcm9tICcuL0VtYmxhQ2Fyb3VzZWwnXG5pbXBvcnQgeyBBbmltYXRpb25zVHlwZSB9IGZyb20gJy4vQW5pbWF0aW9ucydcbmltcG9ydCB7IENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRHJhZ1RyYWNrZXJUeXBlLCBQb2ludGVyRXZlbnRUeXBlIH0gZnJvbSAnLi9EcmFnVHJhY2tlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgRXZlbnRTdG9yZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsVGFyZ2V0VHlwZSB9IGZyb20gJy4vU2Nyb2xsVGFyZ2V0J1xuaW1wb3J0IHsgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcbmltcG9ydCB7IExpbWl0IH0gZnJvbSAnLi9MaW1pdCdcbmltcG9ydCB7XG4gIGRlbHRhQWJzLFxuICBmYWN0b3JBYnMsXG4gIGlzQm9vbGVhbixcbiAgaXNNb3VzZUV2ZW50LFxuICBtYXRoQWJzLFxuICBtYXRoU2lnbixcbiAgV2luZG93VHlwZVxufSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIERyYWdIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIGV2dDogUG9pbnRlckV2ZW50VHlwZVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBEcmFnSGFuZGxlck9wdGlvblR5cGUgPSBib29sZWFuIHwgRHJhZ0hhbmRsZXJDYWxsYmFja1R5cGVcblxuZXhwb3J0IHR5cGUgRHJhZ0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbiAgcG9pbnRlckRvd246ICgpID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdIYW5kbGVyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgcm9vdE5vZGU6IEhUTUxFbGVtZW50LFxuICBvd25lckRvY3VtZW50OiBEb2N1bWVudCxcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGUsXG4gIHRhcmdldDogVmVjdG9yMURUeXBlLFxuICBkcmFnVHJhY2tlcjogRHJhZ1RyYWNrZXJUeXBlLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBhbmltYXRpb246IEFuaW1hdGlvbnNUeXBlLFxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgc2Nyb2xsVGFyZ2V0OiBTY3JvbGxUYXJnZXRUeXBlLFxuICBpbmRleDogQ291bnRlclR5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGUsXG4gIGRyYWdGcmVlOiBib29sZWFuLFxuICBkcmFnVGhyZXNob2xkOiBudW1iZXIsXG4gIHNraXBTbmFwczogYm9vbGVhbixcbiAgYmFzZUZyaWN0aW9uOiBudW1iZXIsXG4gIHdhdGNoRHJhZzogRHJhZ0hhbmRsZXJPcHRpb25UeXBlXG4pOiBEcmFnSGFuZGxlclR5cGUge1xuICBjb25zdCB7IGNyb3NzOiBjcm9zc0F4aXMsIGRpcmVjdGlvbiB9ID0gYXhpc1xuICBjb25zdCBmb2N1c05vZGVzID0gWydJTlBVVCcsICdTRUxFQ1QnLCAnVEVYVEFSRUEnXVxuICBjb25zdCBub25QYXNzaXZlRXZlbnQgPSB7IHBhc3NpdmU6IGZhbHNlIH1cbiAgY29uc3QgaW5pdEV2ZW50cyA9IEV2ZW50U3RvcmUoKVxuICBjb25zdCBkcmFnRXZlbnRzID0gRXZlbnRTdG9yZSgpXG4gIGNvbnN0IGdvVG9OZXh0VGhyZXNob2xkID0gTGltaXQoNTAsIDIyNSkuY29uc3RyYWluKHBlcmNlbnRPZlZpZXcubWVhc3VyZSgyMCkpXG4gIGNvbnN0IHNuYXBGb3JjZUJvb3N0ID0geyBtb3VzZTogMzAwLCB0b3VjaDogNDAwIH1cbiAgY29uc3QgZnJlZUZvcmNlQm9vc3QgPSB7IG1vdXNlOiA1MDAsIHRvdWNoOiA2MDAgfVxuICBjb25zdCBiYXNlU3BlZWQgPSBkcmFnRnJlZSA/IDQzIDogMjVcblxuICBsZXQgaXNNb3ZpbmcgPSBmYWxzZVxuICBsZXQgc3RhcnRTY3JvbGwgPSAwXG4gIGxldCBzdGFydENyb3NzID0gMFxuICBsZXQgcG9pbnRlcklzRG93biA9IGZhbHNlXG4gIGxldCBwcmV2ZW50U2Nyb2xsID0gZmFsc2VcbiAgbGV0IHByZXZlbnRDbGljayA9IGZhbHNlXG4gIGxldCBpc01vdXNlID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSk6IHZvaWQge1xuICAgIGlmICghd2F0Y2hEcmFnKSByZXR1cm5cblxuICAgIGZ1bmN0aW9uIGRvd25JZkFsbG93ZWQoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoRHJhZykgfHwgd2F0Y2hEcmFnKGVtYmxhQXBpLCBldnQpKSBkb3duKGV2dClcbiAgICB9XG5cbiAgICBjb25zdCBub2RlID0gcm9vdE5vZGVcbiAgICBpbml0RXZlbnRzXG4gICAgICAuYWRkKG5vZGUsICdkcmFnc3RhcnQnLCAoZXZ0KSA9PiBldnQucHJldmVudERlZmF1bHQoKSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAndG91Y2htb3ZlJywgKCkgPT4gdW5kZWZpbmVkLCBub25QYXNzaXZlRXZlbnQpXG4gICAgICAuYWRkKG5vZGUsICd0b3VjaGVuZCcsICgpID0+IHVuZGVmaW5lZClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoc3RhcnQnLCBkb3duSWZBbGxvd2VkKVxuICAgICAgLmFkZChub2RlLCAnbW91c2Vkb3duJywgZG93bklmQWxsb3dlZClcbiAgICAgIC5hZGQobm9kZSwgJ3RvdWNoY2FuY2VsJywgdXApXG4gICAgICAuYWRkKG5vZGUsICdjb250ZXh0bWVudScsIHVwKVxuICAgICAgLmFkZChub2RlLCAnY2xpY2snLCBjbGljaywgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaW5pdEV2ZW50cy5jbGVhcigpXG4gICAgZHJhZ0V2ZW50cy5jbGVhcigpXG4gIH1cblxuICBmdW5jdGlvbiBhZGREcmFnRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGUgPSBpc01vdXNlID8gb3duZXJEb2N1bWVudCA6IHJvb3ROb2RlXG4gICAgZHJhZ0V2ZW50c1xuICAgICAgLmFkZChub2RlLCAndG91Y2htb3ZlJywgbW92ZSwgbm9uUGFzc2l2ZUV2ZW50KVxuICAgICAgLmFkZChub2RlLCAndG91Y2hlbmQnLCB1cClcbiAgICAgIC5hZGQobm9kZSwgJ21vdXNlbW92ZScsIG1vdmUsIG5vblBhc3NpdmVFdmVudClcbiAgICAgIC5hZGQobm9kZSwgJ21vdXNldXAnLCB1cClcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRm9jdXNOb2RlKG5vZGU6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGUubm9kZU5hbWUgfHwgJydcbiAgICByZXR1cm4gZm9jdXNOb2Rlcy5pbmNsdWRlcyhub2RlTmFtZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcmNlQm9vc3QoKTogbnVtYmVyIHtcbiAgICBjb25zdCBib29zdCA9IGRyYWdGcmVlID8gZnJlZUZvcmNlQm9vc3QgOiBzbmFwRm9yY2VCb29zdFxuICAgIGNvbnN0IHR5cGUgPSBpc01vdXNlID8gJ21vdXNlJyA6ICd0b3VjaCdcbiAgICByZXR1cm4gYm9vc3RbdHlwZV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFsbG93ZWRGb3JjZShmb3JjZTogbnVtYmVyLCB0YXJnZXRDaGFuZ2VkOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBjb25zdCBuZXh0ID0gaW5kZXguYWRkKG1hdGhTaWduKGZvcmNlKSAqIC0xKVxuICAgIGNvbnN0IGJhc2VGb3JjZSA9IHNjcm9sbFRhcmdldC5ieURpc3RhbmNlKGZvcmNlLCAhZHJhZ0ZyZWUpLmRpc3RhbmNlXG5cbiAgICBpZiAoZHJhZ0ZyZWUgfHwgbWF0aEFicyhmb3JjZSkgPCBnb1RvTmV4dFRocmVzaG9sZCkgcmV0dXJuIGJhc2VGb3JjZVxuICAgIGlmIChza2lwU25hcHMgJiYgdGFyZ2V0Q2hhbmdlZCkgcmV0dXJuIGJhc2VGb3JjZSAqIDAuNVxuXG4gICAgcmV0dXJuIHNjcm9sbFRhcmdldC5ieUluZGV4KG5leHQuZ2V0KCksIDApLmRpc3RhbmNlXG4gIH1cblxuICBmdW5jdGlvbiBkb3duKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzTW91c2VFdnQgPSBpc01vdXNlRXZlbnQoZXZ0LCBvd25lcldpbmRvdylcbiAgICBpc01vdXNlID0gaXNNb3VzZUV2dFxuICAgIHByZXZlbnRDbGljayA9IGRyYWdGcmVlICYmIGlzTW91c2VFdnQgJiYgIWV2dC5idXR0b25zICYmIGlzTW92aW5nXG4gICAgaXNNb3ZpbmcgPSBkZWx0YUFicyh0YXJnZXQuZ2V0KCksIGxvY2F0aW9uLmdldCgpKSA+PSAyXG5cbiAgICBpZiAoaXNNb3VzZUV2dCAmJiBldnQuYnV0dG9uICE9PSAwKSByZXR1cm5cbiAgICBpZiAoaXNGb2N1c05vZGUoZXZ0LnRhcmdldCBhcyBFbGVtZW50KSkgcmV0dXJuXG5cbiAgICBwb2ludGVySXNEb3duID0gdHJ1ZVxuICAgIGRyYWdUcmFja2VyLnBvaW50ZXJEb3duKGV2dClcbiAgICBzY3JvbGxCb2R5LnVzZUZyaWN0aW9uKDApLnVzZUR1cmF0aW9uKDApXG4gICAgdGFyZ2V0LnNldChsb2NhdGlvbilcbiAgICBhZGREcmFnRXZlbnRzKClcbiAgICBzdGFydFNjcm9sbCA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQpXG4gICAgc3RhcnRDcm9zcyA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQsIGNyb3NzQXhpcylcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncG9pbnRlckRvd24nKVxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZShldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc1RvdWNoRXZ0ID0gIWlzTW91c2VFdmVudChldnQsIG93bmVyV2luZG93KVxuICAgIGlmIChpc1RvdWNoRXZ0ICYmIGV2dC50b3VjaGVzLmxlbmd0aCA+PSAyKSByZXR1cm4gdXAoZXZ0KVxuXG4gICAgY29uc3QgbGFzdFNjcm9sbCA9IGRyYWdUcmFja2VyLnJlYWRQb2ludChldnQpXG4gICAgY29uc3QgbGFzdENyb3NzID0gZHJhZ1RyYWNrZXIucmVhZFBvaW50KGV2dCwgY3Jvc3NBeGlzKVxuICAgIGNvbnN0IGRpZmZTY3JvbGwgPSBkZWx0YUFicyhsYXN0U2Nyb2xsLCBzdGFydFNjcm9sbClcbiAgICBjb25zdCBkaWZmQ3Jvc3MgPSBkZWx0YUFicyhsYXN0Q3Jvc3MsIHN0YXJ0Q3Jvc3MpXG5cbiAgICBpZiAoIXByZXZlbnRTY3JvbGwgJiYgIWlzTW91c2UpIHtcbiAgICAgIGlmICghZXZ0LmNhbmNlbGFibGUpIHJldHVybiB1cChldnQpXG4gICAgICBwcmV2ZW50U2Nyb2xsID0gZGlmZlNjcm9sbCA+IGRpZmZDcm9zc1xuICAgICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSByZXR1cm4gdXAoZXZ0KVxuICAgIH1cbiAgICBjb25zdCBkaWZmID0gZHJhZ1RyYWNrZXIucG9pbnRlck1vdmUoZXZ0KVxuICAgIGlmIChkaWZmU2Nyb2xsID4gZHJhZ1RocmVzaG9sZCkgcHJldmVudENsaWNrID0gdHJ1ZVxuXG4gICAgc2Nyb2xsQm9keS51c2VGcmljdGlvbigwLjMpLnVzZUR1cmF0aW9uKDAuNzUpXG4gICAgYW5pbWF0aW9uLnN0YXJ0KClcbiAgICB0YXJnZXQuYWRkKGRpcmVjdGlvbihkaWZmKSlcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdXAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudExvY2F0aW9uID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2UoMCwgZmFsc2UpXG4gICAgY29uc3QgdGFyZ2V0Q2hhbmdlZCA9IGN1cnJlbnRMb2NhdGlvbi5pbmRleCAhPT0gaW5kZXguZ2V0KClcbiAgICBjb25zdCByYXdGb3JjZSA9IGRyYWdUcmFja2VyLnBvaW50ZXJVcChldnQpICogZm9yY2VCb29zdCgpXG4gICAgY29uc3QgZm9yY2UgPSBhbGxvd2VkRm9yY2UoZGlyZWN0aW9uKHJhd0ZvcmNlKSwgdGFyZ2V0Q2hhbmdlZClcbiAgICBjb25zdCBmb3JjZUZhY3RvciA9IGZhY3RvckFicyhyYXdGb3JjZSwgZm9yY2UpXG4gICAgY29uc3Qgc3BlZWQgPSBiYXNlU3BlZWQgLSAxMCAqIGZvcmNlRmFjdG9yXG4gICAgY29uc3QgZnJpY3Rpb24gPSBiYXNlRnJpY3Rpb24gKyBmb3JjZUZhY3RvciAvIDUwXG5cbiAgICBwcmV2ZW50U2Nyb2xsID0gZmFsc2VcbiAgICBwb2ludGVySXNEb3duID0gZmFsc2VcbiAgICBkcmFnRXZlbnRzLmNsZWFyKClcbiAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKHNwZWVkKS51c2VGcmljdGlvbihmcmljdGlvbilcbiAgICBzY3JvbGxUby5kaXN0YW5jZShmb3JjZSwgIWRyYWdGcmVlKVxuICAgIGlzTW91c2UgPSBmYWxzZVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb2ludGVyVXAnKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2soZXZ0OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHByZXZlbnRDbGljaykge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgICAgcHJldmVudENsaWNrID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyRG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcG9pbnRlcklzRG93blxuICB9XG5cbiAgY29uc3Qgc2VsZjogRHJhZ0hhbmRsZXJUeXBlID0ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgICBwb2ludGVyRG93blxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBBeGlzT3B0aW9uVHlwZSwgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBpc01vdXNlRXZlbnQsIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFBvaW50ZXJDb29yZFR5cGUgPSBrZXlvZiBUb3VjaCB8IGtleW9mIE1vdXNlRXZlbnRcbmV4cG9ydCB0eXBlIFBvaW50ZXJFdmVudFR5cGUgPSBUb3VjaEV2ZW50IHwgTW91c2VFdmVudFxuXG5leHBvcnQgdHlwZSBEcmFnVHJhY2tlclR5cGUgPSB7XG4gIHBvaW50ZXJEb3duOiAoZXZ0OiBQb2ludGVyRXZlbnRUeXBlKSA9PiBudW1iZXJcbiAgcG9pbnRlck1vdmU6IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICBwb2ludGVyVXA6IChldnQ6IFBvaW50ZXJFdmVudFR5cGUpID0+IG51bWJlclxuICByZWFkUG9pbnQ6IChldnQ6IFBvaW50ZXJFdmVudFR5cGUsIGV2dEF4aXM/OiBBeGlzT3B0aW9uVHlwZSkgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmFnVHJhY2tlcihcbiAgYXhpczogQXhpc1R5cGUsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlXG4pOiBEcmFnVHJhY2tlclR5cGUge1xuICBjb25zdCBsb2dJbnRlcnZhbCA9IDE3MFxuXG4gIGxldCBzdGFydEV2ZW50OiBQb2ludGVyRXZlbnRUeXBlXG4gIGxldCBsYXN0RXZlbnQ6IFBvaW50ZXJFdmVudFR5cGVcblxuICBmdW5jdGlvbiByZWFkVGltZShldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIHJldHVybiBldnQudGltZVN0YW1wXG4gIH1cblxuICBmdW5jdGlvbiByZWFkUG9pbnQoZXZ0OiBQb2ludGVyRXZlbnRUeXBlLCBldnRBeGlzPzogQXhpc09wdGlvblR5cGUpOiBudW1iZXIge1xuICAgIGNvbnN0IHByb3BlcnR5ID0gZXZ0QXhpcyB8fCBheGlzLnNjcm9sbFxuICAgIGNvbnN0IGNvb3JkOiBQb2ludGVyQ29vcmRUeXBlID0gYGNsaWVudCR7cHJvcGVydHkgPT09ICd4JyA/ICdYJyA6ICdZJ31gXG4gICAgcmV0dXJuIChpc01vdXNlRXZlbnQoZXZ0LCBvd25lcldpbmRvdykgPyBldnQgOiBldnQudG91Y2hlc1swXSlbY29vcmRdXG4gIH1cblxuICBmdW5jdGlvbiBwb2ludGVyRG93bihldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIHN0YXJ0RXZlbnQgPSBldnRcbiAgICBsYXN0RXZlbnQgPSBldnRcbiAgICByZXR1cm4gcmVhZFBvaW50KGV2dClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJNb3ZlKGV2dDogUG9pbnRlckV2ZW50VHlwZSk6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZiA9IHJlYWRQb2ludChldnQpIC0gcmVhZFBvaW50KGxhc3RFdmVudClcbiAgICBjb25zdCBleHBpcmVkID0gcmVhZFRpbWUoZXZ0KSAtIHJlYWRUaW1lKHN0YXJ0RXZlbnQpID4gbG9nSW50ZXJ2YWxcblxuICAgIGxhc3RFdmVudCA9IGV2dFxuICAgIGlmIChleHBpcmVkKSBzdGFydEV2ZW50ID0gZXZ0XG4gICAgcmV0dXJuIGRpZmZcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50ZXJVcChldnQ6IFBvaW50ZXJFdmVudFR5cGUpOiBudW1iZXIge1xuICAgIGlmICghc3RhcnRFdmVudCB8fCAhbGFzdEV2ZW50KSByZXR1cm4gMFxuICAgIGNvbnN0IGRpZmZEcmFnID0gcmVhZFBvaW50KGxhc3RFdmVudCkgLSByZWFkUG9pbnQoc3RhcnRFdmVudClcbiAgICBjb25zdCBkaWZmVGltZSA9IHJlYWRUaW1lKGV2dCkgLSByZWFkVGltZShzdGFydEV2ZW50KVxuICAgIGNvbnN0IGV4cGlyZWQgPSByZWFkVGltZShldnQpIC0gcmVhZFRpbWUobGFzdEV2ZW50KSA+IGxvZ0ludGVydmFsXG4gICAgY29uc3QgZm9yY2UgPSBkaWZmRHJhZyAvIGRpZmZUaW1lXG4gICAgY29uc3QgaXNGbGljayA9IGRpZmZUaW1lICYmICFleHBpcmVkICYmIG1hdGhBYnMoZm9yY2UpID4gMC4xXG5cbiAgICByZXR1cm4gaXNGbGljayA/IGZvcmNlIDogMFxuICB9XG5cbiAgY29uc3Qgc2VsZjogRHJhZ1RyYWNrZXJUeXBlID0ge1xuICAgIHBvaW50ZXJEb3duLFxuICAgIHBvaW50ZXJNb3ZlLFxuICAgIHBvaW50ZXJVcCxcbiAgICByZWFkUG9pbnRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiZXhwb3J0IHR5cGUgTm9kZVJlY3RUeXBlID0ge1xuICB0b3A6IG51bWJlclxuICByaWdodDogbnVtYmVyXG4gIGJvdHRvbTogbnVtYmVyXG4gIGxlZnQ6IG51bWJlclxuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIE5vZGVSZWN0c1R5cGUgPSB7XG4gIG1lYXN1cmU6IChub2RlOiBIVE1MRWxlbWVudCkgPT4gTm9kZVJlY3RUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlUmVjdHMoKTogTm9kZVJlY3RzVHlwZSB7XG4gIGZ1bmN0aW9uIG1lYXN1cmUobm9kZTogSFRNTEVsZW1lbnQpOiBOb2RlUmVjdFR5cGUge1xuICAgIGNvbnN0IHsgb2Zmc2V0VG9wLCBvZmZzZXRMZWZ0LCBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSBub2RlXG4gICAgY29uc3Qgb2Zmc2V0OiBOb2RlUmVjdFR5cGUgPSB7XG4gICAgICB0b3A6IG9mZnNldFRvcCxcbiAgICAgIHJpZ2h0OiBvZmZzZXRMZWZ0ICsgb2Zmc2V0V2lkdGgsXG4gICAgICBib3R0b206IG9mZnNldFRvcCArIG9mZnNldEhlaWdodCxcbiAgICAgIGxlZnQ6IG9mZnNldExlZnQsXG4gICAgICB3aWR0aDogb2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IG9mZnNldEhlaWdodFxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IE5vZGVSZWN0c1R5cGUgPSB7XG4gICAgbWVhc3VyZVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJleHBvcnQgdHlwZSBQZXJjZW50T2ZWaWV3VHlwZSA9IHtcbiAgbWVhc3VyZTogKG46IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQZXJjZW50T2ZWaWV3KHZpZXdTaXplOiBudW1iZXIpOiBQZXJjZW50T2ZWaWV3VHlwZSB7XG4gIGZ1bmN0aW9uIG1lYXN1cmUobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmlld1NpemUgKiAobiAvIDEwMClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFBlcmNlbnRPZlZpZXdUeXBlID0ge1xuICAgIG1lYXN1cmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBFbWJsYUNhcm91c2VsVHlwZSB9IGZyb20gJy4vRW1ibGFDYXJvdXNlbCdcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IE5vZGVSZWN0c1R5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7IGlzQm9vbGVhbiwgbWF0aEFicywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgUmVzaXplSGFuZGxlckNhbGxiYWNrVHlwZSA9IChcbiAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICBlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W11cbikgPT4gYm9vbGVhbiB8IHZvaWRcblxuZXhwb3J0IHR5cGUgUmVzaXplSGFuZGxlck9wdGlvblR5cGUgPSBib29sZWFuIHwgUmVzaXplSGFuZGxlckNhbGxiYWNrVHlwZVxuXG5leHBvcnQgdHlwZSBSZXNpemVIYW5kbGVyVHlwZSA9IHtcbiAgaW5pdDogKGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNpemVIYW5kbGVyKFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGUsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W10sXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB3YXRjaFJlc2l6ZTogUmVzaXplSGFuZGxlck9wdGlvblR5cGUsXG4gIG5vZGVSZWN0czogTm9kZVJlY3RzVHlwZVxuKTogUmVzaXplSGFuZGxlclR5cGUge1xuICBsZXQgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyXG4gIGxldCBjb250YWluZXJTaXplOiBudW1iZXJcbiAgbGV0IHNsaWRlU2l6ZXM6IG51bWJlcltdID0gW11cbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gcmVhZFNpemUobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBheGlzLm1lYXN1cmVTaXplKG5vZGVSZWN0cy5tZWFzdXJlKG5vZGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIXdhdGNoUmVzaXplKSByZXR1cm5cblxuICAgIGNvbnRhaW5lclNpemUgPSByZWFkU2l6ZShjb250YWluZXIpXG4gICAgc2xpZGVTaXplcyA9IHNsaWRlcy5tYXAocmVhZFNpemUpXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2soZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgICAgY29uc3QgaXNDb250YWluZXIgPSBlbnRyeS50YXJnZXQgPT09IGNvbnRhaW5lclxuICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gc2xpZGVzLmluZGV4T2YoPEhUTUxFbGVtZW50PmVudHJ5LnRhcmdldClcbiAgICAgICAgY29uc3QgbGFzdFNpemUgPSBpc0NvbnRhaW5lciA/IGNvbnRhaW5lclNpemUgOiBzbGlkZVNpemVzW3NsaWRlSW5kZXhdXG4gICAgICAgIGNvbnN0IG5ld1NpemUgPSByZWFkU2l6ZShpc0NvbnRhaW5lciA/IGNvbnRhaW5lciA6IHNsaWRlc1tzbGlkZUluZGV4XSlcbiAgICAgICAgY29uc3QgZGlmZlNpemUgPSBtYXRoQWJzKG5ld1NpemUgLSBsYXN0U2l6ZSlcblxuICAgICAgICBpZiAoZGlmZlNpemUgPj0gMC41KSB7XG4gICAgICAgICAgb3duZXJXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGVtYmxhQXBpLnJlSW5pdCgpXG4gICAgICAgICAgICBldmVudEhhbmRsZXIuZW1pdCgncmVzaXplJylcbiAgICAgICAgICB9KVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgICBpZiAoaXNCb29sZWFuKHdhdGNoUmVzaXplKSB8fCB3YXRjaFJlc2l6ZShlbWJsYUFwaSwgZW50cmllcykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKGVudHJpZXMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IG9ic2VydmVOb2RlcyA9IFtjb250YWluZXJdLmNvbmNhdChzbGlkZXMpXG4gICAgb2JzZXJ2ZU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHJlc2l6ZU9ic2VydmVyLm9ic2VydmUobm9kZSkpXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmIChyZXNpemVPYnNlcnZlcikgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogUmVzaXplSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IG1hdGhTaWduLCBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbEJvZHlUeXBlID0ge1xuICBkaXJlY3Rpb246ICgpID0+IG51bWJlclxuICBkdXJhdGlvbjogKCkgPT4gbnVtYmVyXG4gIHZlbG9jaXR5OiAoKSA9PiBudW1iZXJcbiAgc2VlazogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgc2V0dGxlZDogKCkgPT4gYm9vbGVhblxuICB1c2VCYXNlRnJpY3Rpb246ICgpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUJhc2VEdXJhdGlvbjogKCkgPT4gU2Nyb2xsQm9keVR5cGVcbiAgdXNlRnJpY3Rpb246IChuOiBudW1iZXIpID0+IFNjcm9sbEJvZHlUeXBlXG4gIHVzZUR1cmF0aW9uOiAobjogbnVtYmVyKSA9PiBTY3JvbGxCb2R5VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQm9keShcbiAgbG9jYXRpb246IFZlY3RvcjFEVHlwZSxcbiAgdGFyZ2V0OiBWZWN0b3IxRFR5cGUsXG4gIGJhc2VEdXJhdGlvbjogbnVtYmVyLFxuICBiYXNlRnJpY3Rpb246IG51bWJlclxuKTogU2Nyb2xsQm9keVR5cGUge1xuICBsZXQgYm9keVZlbG9jaXR5ID0gMFxuICBsZXQgc2Nyb2xsRGlyZWN0aW9uID0gMFxuICBsZXQgc2Nyb2xsRHVyYXRpb24gPSBiYXNlRHVyYXRpb25cbiAgbGV0IHNjcm9sbEZyaWN0aW9uID0gYmFzZUZyaWN0aW9uXG4gIGxldCByYXdMb2NhdGlvbiA9IGxvY2F0aW9uLmdldCgpXG4gIGxldCByYXdMb2NhdGlvblByZXZpb3VzID0gMFxuXG4gIGZ1bmN0aW9uIHNlZWsoKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIGNvbnN0IGRpZmYgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIGNvbnN0IGlzSW5zdGFudCA9ICFzY3JvbGxEdXJhdGlvblxuICAgIGxldCBkaXJlY3Rpb25EaWZmID0gMFxuXG4gICAgaWYgKGlzSW5zdGFudCkge1xuICAgICAgYm9keVZlbG9jaXR5ID0gMFxuICAgICAgbG9jYXRpb24uc2V0KHRhcmdldClcblxuICAgICAgZGlyZWN0aW9uRGlmZiA9IGRpZmZcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVZlbG9jaXR5ICs9IGRpZmYgLyBzY3JvbGxEdXJhdGlvblxuICAgICAgYm9keVZlbG9jaXR5ICo9IHNjcm9sbEZyaWN0aW9uXG4gICAgICByYXdMb2NhdGlvbiArPSBib2R5VmVsb2NpdHlcbiAgICAgIGxvY2F0aW9uLmFkZChib2R5VmVsb2NpdHkpXG5cbiAgICAgIGRpcmVjdGlvbkRpZmYgPSByYXdMb2NhdGlvbiAtIHJhd0xvY2F0aW9uUHJldmlvdXNcbiAgICB9XG5cbiAgICBzY3JvbGxEaXJlY3Rpb24gPSBtYXRoU2lnbihkaXJlY3Rpb25EaWZmKVxuICAgIHJhd0xvY2F0aW9uUHJldmlvdXMgPSByYXdMb2NhdGlvblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBzZXR0bGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRpZmYgPSB0YXJnZXQuZ2V0KCkgLSBsb2NhdGlvbi5nZXQoKVxuICAgIHJldHVybiBtYXRoQWJzKGRpZmYpIDwgMC4wMDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGR1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHNjcm9sbER1cmF0aW9uXG4gIH1cblxuICBmdW5jdGlvbiBkaXJlY3Rpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2Nyb2xsRGlyZWN0aW9uXG4gIH1cblxuICBmdW5jdGlvbiB2ZWxvY2l0eSgpOiBudW1iZXIge1xuICAgIHJldHVybiBib2R5VmVsb2NpdHlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VEdXJhdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUR1cmF0aW9uKGJhc2VEdXJhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUJhc2VGcmljdGlvbigpOiBTY3JvbGxCb2R5VHlwZSB7XG4gICAgcmV0dXJuIHVzZUZyaWN0aW9uKGJhc2VGcmljdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHVzZUR1cmF0aW9uKG46IG51bWJlcik6IFNjcm9sbEJvZHlUeXBlIHtcbiAgICBzY3JvbGxEdXJhdGlvbiA9IG5cbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gdXNlRnJpY3Rpb24objogbnVtYmVyKTogU2Nyb2xsQm9keVR5cGUge1xuICAgIHNjcm9sbEZyaWN0aW9uID0gblxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxCb2R5VHlwZSA9IHtcbiAgICBkaXJlY3Rpb24sXG4gICAgZHVyYXRpb24sXG4gICAgdmVsb2NpdHksXG4gICAgc2VlayxcbiAgICBzZXR0bGVkLFxuICAgIHVzZUJhc2VGcmljdGlvbixcbiAgICB1c2VCYXNlRHVyYXRpb24sXG4gICAgdXNlRnJpY3Rpb24sXG4gICAgdXNlRHVyYXRpb25cbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxCb2R5VHlwZSB9IGZyb20gJy4vU2Nyb2xsQm9keSdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFBlcmNlbnRPZlZpZXdUeXBlIH0gZnJvbSAnLi9QZXJjZW50T2ZWaWV3J1xuXG5leHBvcnQgdHlwZSBTY3JvbGxCb3VuZHNUeXBlID0ge1xuICBzaG91bGRDb25zdHJhaW46ICgpID0+IGJvb2xlYW5cbiAgY29uc3RyYWluOiAocG9pbnRlckRvd246IGJvb2xlYW4pID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxCb3VuZHMoXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHRhcmdldDogVmVjdG9yMURUeXBlLFxuICBzY3JvbGxCb2R5OiBTY3JvbGxCb2R5VHlwZSxcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGVcbik6IFNjcm9sbEJvdW5kc1R5cGUge1xuICBjb25zdCBwdWxsQmFja1RocmVzaG9sZCA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSgxMClcbiAgY29uc3QgZWRnZU9mZnNldFRvbGVyYW5jZSA9IHBlcmNlbnRPZlZpZXcubWVhc3VyZSg1MClcbiAgY29uc3QgZnJpY3Rpb25MaW1pdCA9IExpbWl0KDAuMSwgMC45OSlcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBzaG91bGRDb25zdHJhaW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm4gZmFsc2VcbiAgICBpZiAoIWxpbWl0LnJlYWNoZWRBbnkodGFyZ2V0LmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgaWYgKCFsaW1pdC5yZWFjaGVkQW55KGxvY2F0aW9uLmdldCgpKSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihwb2ludGVyRG93bjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghc2hvdWxkQ29uc3RyYWluKCkpIHJldHVyblxuICAgIGNvbnN0IGVkZ2UgPSBsaW1pdC5yZWFjaGVkTWluKGxvY2F0aW9uLmdldCgpKSA/ICdtaW4nIDogJ21heCdcbiAgICBjb25zdCBkaWZmVG9FZGdlID0gbWF0aEFicyhsaW1pdFtlZGdlXSAtIGxvY2F0aW9uLmdldCgpKVxuICAgIGNvbnN0IGRpZmZUb1RhcmdldCA9IHRhcmdldC5nZXQoKSAtIGxvY2F0aW9uLmdldCgpXG4gICAgY29uc3QgZnJpY3Rpb24gPSBmcmljdGlvbkxpbWl0LmNvbnN0cmFpbihkaWZmVG9FZGdlIC8gZWRnZU9mZnNldFRvbGVyYW5jZSlcblxuICAgIHRhcmdldC5zdWJ0cmFjdChkaWZmVG9UYXJnZXQgKiBmcmljdGlvbilcblxuICAgIGlmICghcG9pbnRlckRvd24gJiYgbWF0aEFicyhkaWZmVG9UYXJnZXQpIDwgcHVsbEJhY2tUaHJlc2hvbGQpIHtcbiAgICAgIHRhcmdldC5zZXQobGltaXQuY29uc3RyYWluKHRhcmdldC5nZXQoKSkpXG4gICAgICBzY3JvbGxCb2R5LnVzZUR1cmF0aW9uKDI1KS51c2VCYXNlRnJpY3Rpb24oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBkaXNhYmxlZCA9ICFhY3RpdmVcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbEJvdW5kc1R5cGUgPSB7XG4gICAgc2hvdWxkQ29uc3RyYWluLFxuICAgIGNvbnN0cmFpbixcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgTGltaXQsIExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIGRlbHRhQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUgPSBmYWxzZSB8ICd0cmltU25hcHMnIHwgJ2tlZXBTbmFwcydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsQ29udGFpblR5cGUgPSB7XG4gIHNuYXBzQ29udGFpbmVkOiBudW1iZXJbXVxuICBzY3JvbGxDb250YWluTGltaXQ6IExpbWl0VHlwZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsQ29udGFpbihcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc25hcHNBbGlnbmVkOiBudW1iZXJbXSxcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUsXG4gIHBpeGVsVG9sZXJhbmNlOiBudW1iZXJcbik6IFNjcm9sbENvbnRhaW5UeXBlIHtcbiAgY29uc3Qgc2Nyb2xsQm91bmRzID0gTGltaXQoLWNvbnRlbnRTaXplICsgdmlld1NpemUsIDApXG4gIGNvbnN0IHNuYXBzQm91bmRlZCA9IG1lYXN1cmVCb3VuZGVkKClcbiAgY29uc3Qgc2Nyb2xsQ29udGFpbkxpbWl0ID0gZmluZFNjcm9sbENvbnRhaW5MaW1pdCgpXG4gIGNvbnN0IHNuYXBzQ29udGFpbmVkID0gbWVhc3VyZUNvbnRhaW5lZCgpXG5cbiAgZnVuY3Rpb24gdXNlUGl4ZWxUb2xlcmFuY2UoYm91bmQ6IG51bWJlciwgc25hcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRlbHRhQWJzKGJvdW5kLCBzbmFwKSA8IDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRTY3JvbGxDb250YWluTGltaXQoKTogTGltaXRUeXBlIHtcbiAgICBjb25zdCBzdGFydFNuYXAgPSBzbmFwc0JvdW5kZWRbMF1cbiAgICBjb25zdCBlbmRTbmFwID0gYXJyYXlMYXN0KHNuYXBzQm91bmRlZClcbiAgICBjb25zdCBtaW4gPSBzbmFwc0JvdW5kZWQubGFzdEluZGV4T2Yoc3RhcnRTbmFwKVxuICAgIGNvbnN0IG1heCA9IHNuYXBzQm91bmRlZC5pbmRleE9mKGVuZFNuYXApICsgMVxuICAgIHJldHVybiBMaW1pdChtaW4sIG1heClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVCb3VuZGVkKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gc25hcHNBbGlnbmVkXG4gICAgICAubWFwKChzbmFwQWxpZ25lZCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gc2Nyb2xsQm91bmRzXG4gICAgICAgIGNvbnN0IHNuYXAgPSBzY3JvbGxCb3VuZHMuY29uc3RyYWluKHNuYXBBbGlnbmVkKVxuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgoc25hcHNBbGlnbmVkLCBpbmRleClcbiAgICAgICAgaWYgKGlzRmlyc3QpIHJldHVybiBtYXhcbiAgICAgICAgaWYgKGlzTGFzdCkgcmV0dXJuIG1pblxuICAgICAgICBpZiAodXNlUGl4ZWxUb2xlcmFuY2UobWluLCBzbmFwKSkgcmV0dXJuIG1pblxuICAgICAgICBpZiAodXNlUGl4ZWxUb2xlcmFuY2UobWF4LCBzbmFwKSkgcmV0dXJuIG1heFxuICAgICAgICByZXR1cm4gc25hcFxuICAgICAgfSlcbiAgICAgIC5tYXAoKHNjcm9sbEJvdW5kKSA9PiBwYXJzZUZsb2F0KHNjcm9sbEJvdW5kLnRvRml4ZWQoMykpKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUNvbnRhaW5lZCgpOiBudW1iZXJbXSB7XG4gICAgaWYgKGNvbnRlbnRTaXplIDw9IHZpZXdTaXplICsgcGl4ZWxUb2xlcmFuY2UpIHJldHVybiBbc2Nyb2xsQm91bmRzLm1heF1cbiAgICBpZiAoY29udGFpblNjcm9sbCA9PT0gJ2tlZXBTbmFwcycpIHJldHVybiBzbmFwc0JvdW5kZWRcbiAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBzY3JvbGxDb250YWluTGltaXRcbiAgICByZXR1cm4gc25hcHNCb3VuZGVkLnNsaWNlKG1pbiwgbWF4KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsQ29udGFpblR5cGUgPSB7XG4gICAgc25hcHNDb250YWluZWQsXG4gICAgc2Nyb2xsQ29udGFpbkxpbWl0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgYXJyYXlMYXN0IH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsTGltaXRUeXBlID0ge1xuICBsaW1pdDogTGltaXRUeXBlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxMaW1pdChcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBsb29wOiBib29sZWFuXG4pOiBTY3JvbGxMaW1pdFR5cGUge1xuICBjb25zdCBtYXggPSBzY3JvbGxTbmFwc1swXVxuICBjb25zdCBtaW4gPSBsb29wID8gbWF4IC0gY29udGVudFNpemUgOiBhcnJheUxhc3Qoc2Nyb2xsU25hcHMpXG4gIGNvbnN0IGxpbWl0ID0gTGltaXQobWluLCBtYXgpXG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsTGltaXRUeXBlID0ge1xuICAgIGxpbWl0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IExpbWl0LCBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgU2Nyb2xsTG9vcGVyVHlwZSA9IHtcbiAgbG9vcDogKGRpcmVjdGlvbjogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxMb29wZXIoXG4gIGNvbnRlbnRTaXplOiBudW1iZXIsXG4gIGxpbWl0OiBMaW1pdFR5cGUsXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGUsXG4gIHZlY3RvcnM6IFZlY3RvcjFEVHlwZVtdXG4pOiBTY3JvbGxMb29wZXJUeXBlIHtcbiAgY29uc3Qgam9pbnRTYWZldHkgPSAwLjFcbiAgY29uc3QgbWluID0gbGltaXQubWluICsgam9pbnRTYWZldHlcbiAgY29uc3QgbWF4ID0gbGltaXQubWF4ICsgam9pbnRTYWZldHlcbiAgY29uc3QgeyByZWFjaGVkTWluLCByZWFjaGVkTWF4IH0gPSBMaW1pdChtaW4sIG1heClcblxuICBmdW5jdGlvbiBzaG91bGRMb29wKGRpcmVjdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkgcmV0dXJuIHJlYWNoZWRNYXgobG9jYXRpb24uZ2V0KCkpXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gLTEpIHJldHVybiByZWFjaGVkTWluKGxvY2F0aW9uLmdldCgpKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChkaXJlY3Rpb246IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghc2hvdWxkTG9vcChkaXJlY3Rpb24pKSByZXR1cm5cblxuICAgIGNvbnN0IGxvb3BEaXN0YW5jZSA9IGNvbnRlbnRTaXplICogKGRpcmVjdGlvbiAqIC0xKVxuICAgIHZlY3RvcnMuZm9yRWFjaCgodikgPT4gdi5hZGQobG9vcERpc3RhbmNlKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbExvb3BlclR5cGUgPSB7XG4gICAgbG9vcFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuXG5leHBvcnQgdHlwZSBTY3JvbGxQcm9ncmVzc1R5cGUgPSB7XG4gIGdldDogKG46IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxQcm9ncmVzcyhsaW1pdDogTGltaXRUeXBlKTogU2Nyb2xsUHJvZ3Jlc3NUeXBlIHtcbiAgY29uc3QgeyBtYXgsIGxlbmd0aCB9ID0gbGltaXRcblxuICBmdW5jdGlvbiBnZXQobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjdXJyZW50TG9jYXRpb24gPSBuIC0gbWF4XG4gICAgcmV0dXJuIGxlbmd0aCA/IGN1cnJlbnRMb2NhdGlvbiAvIC1sZW5ndGggOiAwXG4gIH1cblxuICBjb25zdCBzZWxmOiBTY3JvbGxQcm9ncmVzc1R5cGUgPSB7XG4gICAgZ2V0XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFsaWdubWVudFR5cGUgfSBmcm9tICcuL0FsaWdubWVudCdcbmltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbFR5cGUgfSBmcm9tICcuL1NsaWRlc1RvU2Nyb2xsJ1xuaW1wb3J0IHsgYXJyYXlMYXN0LCBtYXRoQWJzIH0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2Nyb2xsU25hcHNUeXBlID0ge1xuICBzbmFwczogbnVtYmVyW11cbiAgc25hcHNBbGlnbmVkOiBudW1iZXJbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2Nyb2xsU25hcHMoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBhbGlnbm1lbnQ6IEFsaWdubWVudFR5cGUsXG4gIGNvbnRhaW5lclJlY3Q6IE5vZGVSZWN0VHlwZSxcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW10sXG4gIHNsaWRlc1RvU2Nyb2xsOiBTbGlkZXNUb1Njcm9sbFR5cGVcbik6IFNjcm9sbFNuYXBzVHlwZSB7XG4gIGNvbnN0IHsgc3RhcnRFZGdlLCBlbmRFZGdlIH0gPSBheGlzXG4gIGNvbnN0IHsgZ3JvdXBTbGlkZXMgfSA9IHNsaWRlc1RvU2Nyb2xsXG4gIGNvbnN0IGFsaWdubWVudHMgPSBtZWFzdXJlU2l6ZXMoKS5tYXAoYWxpZ25tZW50Lm1lYXN1cmUpXG4gIGNvbnN0IHNuYXBzID0gbWVhc3VyZVVuYWxpZ25lZCgpXG4gIGNvbnN0IHNuYXBzQWxpZ25lZCA9IG1lYXN1cmVBbGlnbmVkKClcblxuICBmdW5jdGlvbiBtZWFzdXJlU2l6ZXMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBncm91cFNsaWRlcyhzbGlkZVJlY3RzKVxuICAgICAgLm1hcCgocmVjdHMpID0+IGFycmF5TGFzdChyZWN0cylbZW5kRWRnZV0gLSByZWN0c1swXVtzdGFydEVkZ2VdKVxuICAgICAgLm1hcChtYXRoQWJzKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZVVuYWxpZ25lZCgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNsaWRlUmVjdHNcbiAgICAgIC5tYXAoKHJlY3QpID0+IGNvbnRhaW5lclJlY3Rbc3RhcnRFZGdlXSAtIHJlY3Rbc3RhcnRFZGdlXSlcbiAgICAgIC5tYXAoKHNuYXApID0+IC1tYXRoQWJzKHNuYXApKVxuICB9XG5cbiAgZnVuY3Rpb24gbWVhc3VyZUFsaWduZWQoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBncm91cFNsaWRlcyhzbmFwcylcbiAgICAgIC5tYXAoKGcpID0+IGdbMF0pXG4gICAgICAubWFwKChzbmFwLCBpbmRleCkgPT4gc25hcCArIGFsaWdubWVudHNbaW5kZXhdKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsU25hcHNUeXBlID0ge1xuICAgIHNuYXBzLFxuICAgIHNuYXBzQWxpZ25lZFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgU2Nyb2xsQ29udGFpbk9wdGlvblR5cGUgfSBmcm9tICcuL1Njcm9sbENvbnRhaW4nXG5pbXBvcnQgeyBTbGlkZXNUb1Njcm9sbFR5cGUgfSBmcm9tICcuL1NsaWRlc1RvU2Nyb2xsJ1xuaW1wb3J0IHtcbiAgYXJyYXlGcm9tTnVtYmVyLFxuICBhcnJheUlzTGFzdEluZGV4LFxuICBhcnJheUxhc3QsXG4gIGFycmF5TGFzdEluZGV4XG59IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFNsaWRlUmVnaXN0cnlUeXBlID0ge1xuICBzbGlkZVJlZ2lzdHJ5OiBudW1iZXJbXVtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZVJlZ2lzdHJ5KFxuICBjb250YWluU25hcHM6IGJvb2xlYW4sXG4gIGNvbnRhaW5TY3JvbGw6IFNjcm9sbENvbnRhaW5PcHRpb25UeXBlLFxuICBzY3JvbGxTbmFwczogbnVtYmVyW10sXG4gIHNjcm9sbENvbnRhaW5MaW1pdDogTGltaXRUeXBlLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlLFxuICBzbGlkZUluZGV4ZXM6IG51bWJlcltdXG4pOiBTbGlkZVJlZ2lzdHJ5VHlwZSB7XG4gIGNvbnN0IHsgZ3JvdXBTbGlkZXMgfSA9IHNsaWRlc1RvU2Nyb2xsXG4gIGNvbnN0IHsgbWluLCBtYXggfSA9IHNjcm9sbENvbnRhaW5MaW1pdFxuICBjb25zdCBzbGlkZVJlZ2lzdHJ5ID0gY3JlYXRlU2xpZGVSZWdpc3RyeSgpXG5cbiAgZnVuY3Rpb24gY3JlYXRlU2xpZGVSZWdpc3RyeSgpOiBudW1iZXJbXVtdIHtcbiAgICBjb25zdCBncm91cGVkU2xpZGVJbmRleGVzID0gZ3JvdXBTbGlkZXMoc2xpZGVJbmRleGVzKVxuICAgIGNvbnN0IGRvTm90Q29udGFpbiA9ICFjb250YWluU25hcHMgfHwgY29udGFpblNjcm9sbCA9PT0gJ2tlZXBTbmFwcydcblxuICAgIGlmIChzY3JvbGxTbmFwcy5sZW5ndGggPT09IDEpIHJldHVybiBbc2xpZGVJbmRleGVzXVxuICAgIGlmIChkb05vdENvbnRhaW4pIHJldHVybiBncm91cGVkU2xpZGVJbmRleGVzXG5cbiAgICByZXR1cm4gZ3JvdXBlZFNsaWRlSW5kZXhlcy5zbGljZShtaW4sIG1heCkubWFwKChncm91cCwgaW5kZXgsIGdyb3VwcykgPT4ge1xuICAgICAgY29uc3QgaXNGaXJzdCA9ICFpbmRleFxuICAgICAgY29uc3QgaXNMYXN0ID0gYXJyYXlJc0xhc3RJbmRleChncm91cHMsIGluZGV4KVxuXG4gICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBjb25zdCByYW5nZSA9IGFycmF5TGFzdChncm91cHNbMF0pICsgMVxuICAgICAgICByZXR1cm4gYXJyYXlGcm9tTnVtYmVyKHJhbmdlKVxuICAgICAgfVxuICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICBjb25zdCByYW5nZSA9IGFycmF5TGFzdEluZGV4KHNsaWRlSW5kZXhlcykgLSBhcnJheUxhc3QoZ3JvdXBzKVswXSArIDFcbiAgICAgICAgcmV0dXJuIGFycmF5RnJvbU51bWJlcihyYW5nZSwgYXJyYXlMYXN0KGdyb3VwcylbMF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gZ3JvdXBcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVSZWdpc3RyeVR5cGUgPSB7XG4gICAgc2xpZGVSZWdpc3RyeVxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBMaW1pdFR5cGUgfSBmcm9tICcuL0xpbWl0J1xuaW1wb3J0IHsgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcbmltcG9ydCB7IGFycmF5TGFzdCwgbWF0aEFicywgbWF0aFNpZ24gfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBUYXJnZXRUeXBlID0ge1xuICBkaXN0YW5jZTogbnVtYmVyXG4gIGluZGV4OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgU2Nyb2xsVGFyZ2V0VHlwZSA9IHtcbiAgYnlJbmRleDogKHRhcmdldDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikgPT4gVGFyZ2V0VHlwZVxuICBieURpc3RhbmNlOiAoZm9yY2U6IG51bWJlciwgc25hcDogYm9vbGVhbikgPT4gVGFyZ2V0VHlwZVxuICBzaG9ydGN1dDogKHRhcmdldDogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikgPT4gbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxUYXJnZXQoXG4gIGxvb3A6IGJvb2xlYW4sXG4gIHNjcm9sbFNuYXBzOiBudW1iZXJbXSxcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgbGltaXQ6IExpbWl0VHlwZSxcbiAgdGFyZ2V0VmVjdG9yOiBWZWN0b3IxRFR5cGVcbik6IFNjcm9sbFRhcmdldFR5cGUge1xuICBjb25zdCB7IHJlYWNoZWRBbnksIHJlbW92ZU9mZnNldCwgY29uc3RyYWluIH0gPSBsaW1pdFxuXG4gIGZ1bmN0aW9uIG1pbkRpc3RhbmNlKGRpc3RhbmNlczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIHJldHVybiBkaXN0YW5jZXMuY29uY2F0KCkuc29ydCgoYSwgYikgPT4gbWF0aEFicyhhKSAtIG1hdGhBYnMoYikpWzBdXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kVGFyZ2V0U25hcCh0YXJnZXQ6IG51bWJlcik6IFRhcmdldFR5cGUge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gbG9vcCA/IHJlbW92ZU9mZnNldCh0YXJnZXQpIDogY29uc3RyYWluKHRhcmdldClcbiAgICBjb25zdCBhc2NEaWZmc1RvU25hcHMgPSBzY3JvbGxTbmFwc1xuICAgICAgLm1hcCgoc25hcCwgaW5kZXgpID0+ICh7IGRpZmY6IHNob3J0Y3V0KHNuYXAgLSBkaXN0YW5jZSwgMCksIGluZGV4IH0pKVxuICAgICAgLnNvcnQoKGQxLCBkMikgPT4gbWF0aEFicyhkMS5kaWZmKSAtIG1hdGhBYnMoZDIuZGlmZikpXG5cbiAgICBjb25zdCB7IGluZGV4IH0gPSBhc2NEaWZmc1RvU25hcHNbMF1cbiAgICByZXR1cm4geyBpbmRleCwgZGlzdGFuY2UgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvcnRjdXQodGFyZ2V0OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCB0YXJnZXRzID0gW3RhcmdldCwgdGFyZ2V0ICsgY29udGVudFNpemUsIHRhcmdldCAtIGNvbnRlbnRTaXplXVxuXG4gICAgaWYgKCFsb29wKSByZXR1cm4gdGFyZ2V0XG4gICAgaWYgKCFkaXJlY3Rpb24pIHJldHVybiBtaW5EaXN0YW5jZSh0YXJnZXRzKVxuXG4gICAgY29uc3QgbWF0Y2hpbmdUYXJnZXRzID0gdGFyZ2V0cy5maWx0ZXIoKHQpID0+IG1hdGhTaWduKHQpID09PSBkaXJlY3Rpb24pXG4gICAgaWYgKG1hdGNoaW5nVGFyZ2V0cy5sZW5ndGgpIHJldHVybiBtaW5EaXN0YW5jZShtYXRjaGluZ1RhcmdldHMpXG4gICAgcmV0dXJuIGFycmF5TGFzdCh0YXJnZXRzKSAtIGNvbnRlbnRTaXplXG4gIH1cblxuICBmdW5jdGlvbiBieUluZGV4KGluZGV4OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogVGFyZ2V0VHlwZSB7XG4gICAgY29uc3QgZGlmZlRvU25hcCA9IHNjcm9sbFNuYXBzW2luZGV4XSAtIHRhcmdldFZlY3Rvci5nZXQoKVxuICAgIGNvbnN0IGRpc3RhbmNlID0gc2hvcnRjdXQoZGlmZlRvU25hcCwgZGlyZWN0aW9uKVxuICAgIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG4gIH1cblxuICBmdW5jdGlvbiBieURpc3RhbmNlKGRpc3RhbmNlOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pOiBUYXJnZXRUeXBlIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRWZWN0b3IuZ2V0KCkgKyBkaXN0YW5jZVxuICAgIGNvbnN0IHsgaW5kZXgsIGRpc3RhbmNlOiB0YXJnZXRTbmFwRGlzdGFuY2UgfSA9IGZpbmRUYXJnZXRTbmFwKHRhcmdldClcbiAgICBjb25zdCByZWFjaGVkQm91bmQgPSAhbG9vcCAmJiByZWFjaGVkQW55KHRhcmdldClcblxuICAgIGlmICghc25hcCB8fCByZWFjaGVkQm91bmQpIHJldHVybiB7IGluZGV4LCBkaXN0YW5jZSB9XG5cbiAgICBjb25zdCBkaWZmVG9TbmFwID0gc2Nyb2xsU25hcHNbaW5kZXhdIC0gdGFyZ2V0U25hcERpc3RhbmNlXG4gICAgY29uc3Qgc25hcERpc3RhbmNlID0gZGlzdGFuY2UgKyBzaG9ydGN1dChkaWZmVG9TbmFwLCAwKVxuXG4gICAgcmV0dXJuIHsgaW5kZXgsIGRpc3RhbmNlOiBzbmFwRGlzdGFuY2UgfVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2Nyb2xsVGFyZ2V0VHlwZSA9IHtcbiAgICBieURpc3RhbmNlLFxuICAgIGJ5SW5kZXgsXG4gICAgc2hvcnRjdXRcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQW5pbWF0aW9uc1R5cGUgfSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBDb3VudGVyVHlwZSB9IGZyb20gJy4vQ291bnRlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IFNjcm9sbFRhcmdldFR5cGUsIFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5cbmV4cG9ydCB0eXBlIFNjcm9sbFRvVHlwZSA9IHtcbiAgZGlzdGFuY2U6IChuOiBudW1iZXIsIHNuYXA6IGJvb2xlYW4pID0+IHZvaWRcbiAgaW5kZXg6IChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY3JvbGxUbyhcbiAgYW5pbWF0aW9uOiBBbmltYXRpb25zVHlwZSxcbiAgaW5kZXhDdXJyZW50OiBDb3VudGVyVHlwZSxcbiAgaW5kZXhQcmV2aW91czogQ291bnRlclR5cGUsXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZSxcbiAgdGFyZ2V0VmVjdG9yOiBWZWN0b3IxRFR5cGUsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZVxuKTogU2Nyb2xsVG9UeXBlIHtcbiAgZnVuY3Rpb24gc2Nyb2xsVG8odGFyZ2V0OiBUYXJnZXRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgZGlzdGFuY2VEaWZmID0gdGFyZ2V0LmRpc3RhbmNlXG4gICAgY29uc3QgaW5kZXhEaWZmID0gdGFyZ2V0LmluZGV4ICE9PSBpbmRleEN1cnJlbnQuZ2V0KClcblxuICAgIHRhcmdldFZlY3Rvci5hZGQoZGlzdGFuY2VEaWZmKVxuXG4gICAgaWYgKGRpc3RhbmNlRGlmZikgYW5pbWF0aW9uLnN0YXJ0KClcblxuICAgIGlmIChpbmRleERpZmYpIHtcbiAgICAgIGluZGV4UHJldmlvdXMuc2V0KGluZGV4Q3VycmVudC5nZXQoKSlcbiAgICAgIGluZGV4Q3VycmVudC5zZXQodGFyZ2V0LmluZGV4KVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NlbGVjdCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzdGFuY2UobjogbnVtYmVyLCBzbmFwOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2Nyb2xsVGFyZ2V0LmJ5RGlzdGFuY2Uobiwgc25hcClcbiAgICBzY3JvbGxUbyh0YXJnZXQpXG4gIH1cblxuICBmdW5jdGlvbiBpbmRleChuOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleEN1cnJlbnQuY2xvbmUoKS5zZXQobilcbiAgICBjb25zdCB0YXJnZXQgPSBzY3JvbGxUYXJnZXQuYnlJbmRleCh0YXJnZXRJbmRleC5nZXQoKSwgZGlyZWN0aW9uKVxuICAgIHNjcm9sbFRvKHRhcmdldClcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNjcm9sbFRvVHlwZSA9IHtcbiAgICBkaXN0YW5jZSxcbiAgICBpbmRleFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IFNjcm9sbEJvZHlUeXBlIH0gZnJvbSAnLi9TY3JvbGxCb2R5J1xuaW1wb3J0IHsgU2Nyb2xsVG9UeXBlIH0gZnJvbSAnLi9TY3JvbGxUbydcbmltcG9ydCB7IFNsaWRlUmVnaXN0cnlUeXBlIH0gZnJvbSAnLi9TbGlkZVJlZ2lzdHJ5J1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZUZvY3VzVHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVGb2N1cyhcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXSxcbiAgc2Nyb2xsVG86IFNjcm9sbFRvVHlwZSxcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGUsXG4gIGV2ZW50U3RvcmU6IEV2ZW50U3RvcmVUeXBlLFxuICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlclR5cGVcbik6IFNsaWRlRm9jdXNUeXBlIHtcbiAgbGV0IGxhc3RUYWJQcmVzc1RpbWUgPSAwXG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICBldmVudFN0b3JlLmFkZChkb2N1bWVudCwgJ2tleWRvd24nLCByZWdpc3RlclRhYlByZXNzLCBmYWxzZSlcbiAgICBzbGlkZXMuZm9yRWFjaChhZGRTbGlkZUZvY3VzRXZlbnQpXG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlclRhYlByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdUYWInKSBsYXN0VGFiUHJlc3NUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNsaWRlRm9jdXNFdmVudChzbGlkZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBmb2N1cyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgY29uc3QgZGlmZlRpbWUgPSBub3dUaW1lIC0gbGFzdFRhYlByZXNzVGltZVxuXG4gICAgICBpZiAoZGlmZlRpbWUgPiAxMCkgcmV0dXJuXG5cbiAgICAgIHJvb3Quc2Nyb2xsTGVmdCA9IDBcbiAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2Yoc2xpZGUpXG4gICAgICBjb25zdCBncm91cCA9IHNsaWRlUmVnaXN0cnkuZmluZEluZGV4KChncm91cCkgPT4gZ3JvdXAuaW5jbHVkZXMoaW5kZXgpKVxuXG4gICAgICBpZiAoIWlzTnVtYmVyKGdyb3VwKSkgcmV0dXJuXG5cbiAgICAgIHNjcm9sbEJvZHkudXNlRHVyYXRpb24oMClcbiAgICAgIHNjcm9sbFRvLmluZGV4KGdyb3VwLCAwKVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlRm9jdXMnKVxuICAgIH1cblxuICAgIGV2ZW50U3RvcmUuYWRkKHNsaWRlLCAnZm9jdXMnLCBmb2N1cywge1xuICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVGb2N1c1R5cGUgPSB7XG4gICAgaW5pdFxuICB9XG4gIHJldHVybiBzZWxmXG59XG4iLCJpbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIFZlY3RvcjFEVHlwZSA9IHtcbiAgZ2V0OiAoKSA9PiBudW1iZXJcbiAgc2V0OiAobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKSA9PiB2b2lkXG4gIGFkZDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxuICBzdWJ0cmFjdDogKG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcikgPT4gdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVmVjdG9yMUQoaW5pdGlhbFZhbHVlOiBudW1iZXIpOiBWZWN0b3IxRFR5cGUge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWVcblxuICBmdW5jdGlvbiBnZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiB2b2lkIHtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBhZGQobjogVmVjdG9yMURUeXBlIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgKz0gbm9ybWFsaXplSW5wdXQobilcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KG46IFZlY3RvcjFEVHlwZSB8IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlIC09IG5vcm1hbGl6ZUlucHV0KG4pXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVJbnB1dChuOiBWZWN0b3IxRFR5cGUgfCBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpc051bWJlcihuKSA/IG4gOiBuLmdldCgpXG4gIH1cblxuICBjb25zdCBzZWxmOiBWZWN0b3IxRFR5cGUgPSB7XG4gICAgZ2V0LFxuICAgIHNldCxcbiAgICBhZGQsXG4gICAgc3VidHJhY3RcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5cbmV4cG9ydCB0eXBlIFRyYW5zbGF0ZVR5cGUgPSB7XG4gIGNsZWFyOiAoKSA9PiB2b2lkXG4gIHRvOiAodGFyZ2V0OiBudW1iZXIpID0+IHZvaWRcbiAgdG9nZ2xlQWN0aXZlOiAoYWN0aXZlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGUoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50XG4pOiBUcmFuc2xhdGVUeXBlIHtcbiAgY29uc3QgdHJhbnNsYXRlID0gYXhpcy5zY3JvbGwgPT09ICd4JyA/IHggOiB5XG4gIGNvbnN0IGNvbnRhaW5lclN0eWxlID0gY29udGFpbmVyLnN0eWxlXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgZnVuY3Rpb24geChuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoJHtufXB4LDBweCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24geShuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlM2QoMHB4LCR7bn1weCwwcHgpYFxuICB9XG5cbiAgZnVuY3Rpb24gdG8odGFyZ2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVyblxuICAgIGNvbnRhaW5lclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zbGF0ZShheGlzLmRpcmVjdGlvbih0YXJnZXQpKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGRpc2FibGVkID0gIWFjdGl2ZVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKTogdm9pZCB7XG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm5cbiAgICBjb250YWluZXJTdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIGlmICghY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogVHJhbnNsYXRlVHlwZSA9IHtcbiAgICBjbGVhcixcbiAgICB0byxcbiAgICB0b2dnbGVBY3RpdmVcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBhcnJheUtleXMgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgVmVjdG9yMUQsIFZlY3RvcjFEVHlwZSB9IGZyb20gJy4vVmVjdG9yMWQnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcblxudHlwZSBTbGlkZUJvdW5kVHlwZSA9IHtcbiAgc3RhcnQ6IG51bWJlclxuICBlbmQ6IG51bWJlclxufVxuXG50eXBlIExvb3BQb2ludFR5cGUgPSB7XG4gIGxvb3BQb2ludDogbnVtYmVyXG4gIGluZGV4OiBudW1iZXJcbiAgdHJhbnNsYXRlOiBUcmFuc2xhdGVUeXBlXG4gIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEVHlwZVxuICB0YXJnZXQ6ICgpID0+IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBTbGlkZUxvb3BlclR5cGUgPSB7XG4gIGNhbkxvb3A6ICgpID0+IGJvb2xlYW5cbiAgY2xlYXI6ICgpID0+IHZvaWRcbiAgbG9vcDogKCkgPT4gdm9pZFxuICBsb29wUG9pbnRzOiBMb29wUG9pbnRUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlTG9vcGVyKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgdmlld1NpemU6IG51bWJlcixcbiAgY29udGVudFNpemU6IG51bWJlcixcbiAgc2xpZGVTaXplczogbnVtYmVyW10sXG4gIHNsaWRlU2l6ZXNXaXRoR2FwczogbnVtYmVyW10sXG4gIHNuYXBzOiBudW1iZXJbXSxcbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdLFxuICBsb2NhdGlvbjogVmVjdG9yMURUeXBlLFxuICBzbGlkZXM6IEhUTUxFbGVtZW50W11cbik6IFNsaWRlTG9vcGVyVHlwZSB7XG4gIGNvbnN0IHJvdW5kaW5nU2FmZXR5ID0gMC41XG4gIGNvbnN0IGFzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcylcbiAgY29uc3QgZGVzY0l0ZW1zID0gYXJyYXlLZXlzKHNsaWRlU2l6ZXNXaXRoR2FwcykucmV2ZXJzZSgpXG4gIGNvbnN0IGxvb3BQb2ludHMgPSBzdGFydFBvaW50cygpLmNvbmNhdChlbmRQb2ludHMoKSlcblxuICBmdW5jdGlvbiByZW1vdmVTbGlkZVNpemVzKGluZGV4ZXM6IG51bWJlcltdLCBmcm9tOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBpbmRleGVzLnJlZHVjZSgoYTogbnVtYmVyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYSAtIHNsaWRlU2l6ZXNXaXRoR2Fwc1tpXVxuICAgIH0sIGZyb20pXG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXNJbkdhcChpbmRleGVzOiBudW1iZXJbXSwgZ2FwOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIGluZGV4ZXMucmVkdWNlKChhOiBudW1iZXJbXSwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVtYWluaW5nR2FwID0gcmVtb3ZlU2xpZGVTaXplcyhhLCBnYXApXG4gICAgICByZXR1cm4gcmVtYWluaW5nR2FwID4gMCA/IGEuY29uY2F0KFtpXSkgOiBhXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBmaW5kU2xpZGVCb3VuZHMob2Zmc2V0OiBudW1iZXIpOiBTbGlkZUJvdW5kVHlwZVtdIHtcbiAgICByZXR1cm4gc25hcHMubWFwKChzbmFwLCBpbmRleCkgPT4gKHtcbiAgICAgIHN0YXJ0OiBzbmFwIC0gc2xpZGVTaXplc1tpbmRleF0gKyByb3VuZGluZ1NhZmV0eSArIG9mZnNldCxcbiAgICAgIGVuZDogc25hcCArIHZpZXdTaXplIC0gcm91bmRpbmdTYWZldHkgKyBvZmZzZXRcbiAgICB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRMb29wUG9pbnRzKFxuICAgIGluZGV4ZXM6IG51bWJlcltdLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIGlzRW5kRWRnZTogYm9vbGVhblxuICApOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IHNsaWRlQm91bmRzID0gZmluZFNsaWRlQm91bmRzKG9mZnNldClcblxuICAgIHJldHVybiBpbmRleGVzLm1hcCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGluaXRpYWwgPSBpc0VuZEVkZ2UgPyAwIDogLWNvbnRlbnRTaXplXG4gICAgICBjb25zdCBhbHRlcmVkID0gaXNFbmRFZGdlID8gY29udGVudFNpemUgOiAwXG4gICAgICBjb25zdCBib3VuZEVkZ2UgPSBpc0VuZEVkZ2UgPyAnZW5kJyA6ICdzdGFydCdcbiAgICAgIGNvbnN0IGxvb3BQb2ludCA9IHNsaWRlQm91bmRzW2luZGV4XVtib3VuZEVkZ2VdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBsb29wUG9pbnQsXG4gICAgICAgIHNsaWRlTG9jYXRpb246IFZlY3RvcjFEKC0xKSxcbiAgICAgICAgdHJhbnNsYXRlOiBUcmFuc2xhdGUoYXhpcywgc2xpZGVzW2luZGV4XSksXG4gICAgICAgIHRhcmdldDogKCkgPT4gKGxvY2F0aW9uLmdldCgpID4gbG9vcFBvaW50ID8gaW5pdGlhbCA6IGFsdGVyZWQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0UG9pbnRzKCk6IExvb3BQb2ludFR5cGVbXSB7XG4gICAgY29uc3QgZ2FwID0gc2Nyb2xsU25hcHNbMF1cbiAgICBjb25zdCBpbmRleGVzID0gc2xpZGVzSW5HYXAoZGVzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIGNvbnRlbnRTaXplLCBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZFBvaW50cygpOiBMb29wUG9pbnRUeXBlW10ge1xuICAgIGNvbnN0IGdhcCA9IHZpZXdTaXplIC0gc2Nyb2xsU25hcHNbMF0gLSAxXG4gICAgY29uc3QgaW5kZXhlcyA9IHNsaWRlc0luR2FwKGFzY0l0ZW1zLCBnYXApXG4gICAgcmV0dXJuIGZpbmRMb29wUG9pbnRzKGluZGV4ZXMsIC1jb250ZW50U2l6ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbkxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxvb3BQb2ludHMuZXZlcnkoKHsgaW5kZXggfSkgPT4ge1xuICAgICAgY29uc3Qgb3RoZXJJbmRleGVzID0gYXNjSXRlbXMuZmlsdGVyKChpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIHJldHVybiByZW1vdmVTbGlkZVNpemVzKG90aGVySW5kZXhlcywgdmlld1NpemUpIDw9IDAuMVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBsb29wKCk6IHZvaWQge1xuICAgIGxvb3BQb2ludHMuZm9yRWFjaCgobG9vcFBvaW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCwgdHJhbnNsYXRlLCBzbGlkZUxvY2F0aW9uIH0gPSBsb29wUG9pbnRcbiAgICAgIGNvbnN0IHNoaWZ0TG9jYXRpb24gPSB0YXJnZXQoKVxuICAgICAgaWYgKHNoaWZ0TG9jYXRpb24gPT09IHNsaWRlTG9jYXRpb24uZ2V0KCkpIHJldHVyblxuICAgICAgdHJhbnNsYXRlLnRvKHNoaWZ0TG9jYXRpb24pXG4gICAgICBzbGlkZUxvY2F0aW9uLnNldChzaGlmdExvY2F0aW9uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsb29wUG9pbnRzLmZvckVhY2goKGxvb3BQb2ludCkgPT4gbG9vcFBvaW50LnRyYW5zbGF0ZS5jbGVhcigpKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVMb29wZXJUeXBlID0ge1xuICAgIGNhbkxvb3AsXG4gICAgY2xlYXIsXG4gICAgbG9vcCxcbiAgICBsb29wUG9pbnRzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyVHlwZSB9IGZyb20gJy4vRXZlbnRIYW5kbGVyJ1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnLi91dGlscydcblxudHlwZSBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlID0gKFxuICBlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsXG4gIG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXVxuKSA9PiBib29sZWFuIHwgdm9pZFxuXG5leHBvcnQgdHlwZSBTbGlkZXNIYW5kbGVyT3B0aW9uVHlwZSA9IGJvb2xlYW4gfCBTbGlkZXNIYW5kbGVyQ2FsbGJhY2tUeXBlXG5cbmV4cG9ydCB0eXBlIFNsaWRlc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKSA9PiB2b2lkXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNsaWRlc0hhbmRsZXIoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyVHlwZSxcbiAgd2F0Y2hTbGlkZXM6IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlXG4pOiBTbGlkZXNIYW5kbGVyVHlwZSB7XG4gIGxldCBtdXRhdGlvbk9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyXG4gIGxldCBkZXN0cm95ZWQgPSBmYWxzZVxuXG4gIGZ1bmN0aW9uIGluaXQoZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlKTogdm9pZCB7XG4gICAgaWYgKCF3YXRjaFNsaWRlcykgcmV0dXJuXG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0Q2FsbGJhY2sobXV0YXRpb25zOiBNdXRhdGlvblJlY29yZFtdKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICBlbWJsYUFwaS5yZUluaXQoKVxuICAgICAgICAgIGV2ZW50SGFuZGxlci5lbWl0KCdzbGlkZXNDaGFuZ2VkJylcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmIChkZXN0cm95ZWQpIHJldHVyblxuICAgICAgaWYgKGlzQm9vbGVhbih3YXRjaFNsaWRlcykgfHwgd2F0Y2hTbGlkZXMoZW1ibGFBcGksIG11dGF0aW9ucykpIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrKG11dGF0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXIpIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3Qgc2VsZjogU2xpZGVzSGFuZGxlclR5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEV2ZW50SGFuZGxlclR5cGUgfSBmcm9tICcuL0V2ZW50SGFuZGxlcidcbmltcG9ydCB7IG9iamVjdEtleXMgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHtcbiAgW2tleTogbnVtYmVyXTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVxufVxuXG5leHBvcnQgdHlwZSBTbGlkZXNJblZpZXdPcHRpb25zVHlwZSA9IEludGVyc2VjdGlvbk9ic2VydmVySW5pdFsndGhyZXNob2xkJ11cblxuZXhwb3J0IHR5cGUgU2xpZGVzSW5WaWV3VHlwZSA9IHtcbiAgaW5pdDogKCkgPT4gdm9pZFxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG4gIGdldDogKGluVmlldz86IGJvb2xlYW4pID0+IG51bWJlcltdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZXNJblZpZXcoXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlLFxuICB0aHJlc2hvbGQ6IFNsaWRlc0luVmlld09wdGlvbnNUeXBlXG4pOiBTbGlkZXNJblZpZXdUeXBlIHtcbiAgY29uc3QgaW50ZXJzZWN0aW9uRW50cnlNYXA6IEludGVyc2VjdGlvbkVudHJ5TWFwVHlwZSA9IHt9XG4gIGxldCBpblZpZXdDYWNoZTogbnVtYmVyW10gfCBudWxsID0gbnVsbFxuICBsZXQgbm90SW5WaWV3Q2FjaGU6IG51bWJlcltdIHwgbnVsbCA9IG51bGxcbiAgbGV0IGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBsZXQgZGVzdHJveWVkID0gZmFsc2VcblxuICBmdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICAgIGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgKGVudHJpZXMpID0+IHtcbiAgICAgICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG5cbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2xpZGVzLmluZGV4T2YoPEhUTUxFbGVtZW50PmVudHJ5LnRhcmdldClcbiAgICAgICAgICBpbnRlcnNlY3Rpb25FbnRyeU1hcFtpbmRleF0gPSBlbnRyeVxuICAgICAgICB9KVxuXG4gICAgICAgIGluVmlld0NhY2hlID0gbnVsbFxuICAgICAgICBub3RJblZpZXdDYWNoZSA9IG51bGxcbiAgICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NsaWRlc0luVmlldycpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBjb250YWluZXIucGFyZW50RWxlbWVudCxcbiAgICAgICAgdGhyZXNob2xkXG4gICAgICB9XG4gICAgKVxuXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlKSA9PiBpbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHNsaWRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGludGVyc2VjdGlvbk9ic2VydmVyKSBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICBkZXN0cm95ZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJblZpZXdMaXN0KGluVmlldzogYm9vbGVhbik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gb2JqZWN0S2V5cyhpbnRlcnNlY3Rpb25FbnRyeU1hcCkucmVkdWNlKFxuICAgICAgKGxpc3Q6IG51bWJlcltdLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleClcbiAgICAgICAgY29uc3QgeyBpc0ludGVyc2VjdGluZyB9ID0gaW50ZXJzZWN0aW9uRW50cnlNYXBbaW5kZXhdXG4gICAgICAgIGNvbnN0IGluVmlld01hdGNoID0gaW5WaWV3ICYmIGlzSW50ZXJzZWN0aW5nXG4gICAgICAgIGNvbnN0IG5vdEluVmlld01hdGNoID0gIWluVmlldyAmJiAhaXNJbnRlcnNlY3RpbmdcblxuICAgICAgICBpZiAoaW5WaWV3TWF0Y2ggfHwgbm90SW5WaWV3TWF0Y2gpIGxpc3QucHVzaChpbmRleClcbiAgICAgICAgcmV0dXJuIGxpc3RcbiAgICAgIH0sXG4gICAgICBbXVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldChpblZpZXc6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyW10ge1xuICAgIGlmIChpblZpZXcgJiYgaW5WaWV3Q2FjaGUpIHJldHVybiBpblZpZXdDYWNoZVxuICAgIGlmICghaW5WaWV3ICYmIG5vdEluVmlld0NhY2hlKSByZXR1cm4gbm90SW5WaWV3Q2FjaGVcblxuICAgIGNvbnN0IHNsaWRlSW5kZXhlcyA9IGNyZWF0ZUluVmlld0xpc3QoaW5WaWV3KVxuXG4gICAgaWYgKGluVmlldykgaW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcbiAgICBpZiAoIWluVmlldykgbm90SW5WaWV3Q2FjaGUgPSBzbGlkZUluZGV4ZXNcblxuICAgIHJldHVybiBzbGlkZUluZGV4ZXNcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFNsaWRlc0luVmlld1R5cGUgPSB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICAgIGdldFxuICB9XG5cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEF4aXNUeXBlIH0gZnJvbSAnLi9BeGlzJ1xuaW1wb3J0IHsgTm9kZVJlY3RUeXBlIH0gZnJvbSAnLi9Ob2RlUmVjdHMnXG5pbXBvcnQgeyBhcnJheUlzTGFzdEluZGV4LCBhcnJheUxhc3QsIG1hdGhBYnMsIFdpbmRvd1R5cGUgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgdHlwZSBTbGlkZVNpemVzVHlwZSA9IHtcbiAgc2xpZGVTaXplczogbnVtYmVyW11cbiAgc2xpZGVTaXplc1dpdGhHYXBzOiBudW1iZXJbXVxuICBzdGFydEdhcDogbnVtYmVyXG4gIGVuZEdhcDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTbGlkZVNpemVzKFxuICBheGlzOiBBeGlzVHlwZSxcbiAgY29udGFpbmVyUmVjdDogTm9kZVJlY3RUeXBlLFxuICBzbGlkZVJlY3RzOiBOb2RlUmVjdFR5cGVbXSxcbiAgc2xpZGVzOiBIVE1MRWxlbWVudFtdLFxuICByZWFkRWRnZUdhcDogYm9vbGVhbixcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbik6IFNsaWRlU2l6ZXNUeXBlIHtcbiAgY29uc3QgeyBtZWFzdXJlU2l6ZSwgc3RhcnRFZGdlLCBlbmRFZGdlIH0gPSBheGlzXG4gIGNvbnN0IHdpdGhFZGdlR2FwID0gc2xpZGVSZWN0c1swXSAmJiByZWFkRWRnZUdhcFxuICBjb25zdCBzdGFydEdhcCA9IG1lYXN1cmVTdGFydEdhcCgpXG4gIGNvbnN0IGVuZEdhcCA9IG1lYXN1cmVFbmRHYXAoKVxuICBjb25zdCBzbGlkZVNpemVzID0gc2xpZGVSZWN0cy5tYXAobWVhc3VyZVNpemUpXG4gIGNvbnN0IHNsaWRlU2l6ZXNXaXRoR2FwcyA9IG1lYXN1cmVXaXRoR2FwcygpXG5cbiAgZnVuY3Rpb24gbWVhc3VyZVN0YXJ0R2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzbGlkZVJlY3QgPSBzbGlkZVJlY3RzWzBdXG4gICAgcmV0dXJuIG1hdGhBYnMoY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0W3N0YXJ0RWRnZV0pXG4gIH1cblxuICBmdW5jdGlvbiBtZWFzdXJlRW5kR2FwKCk6IG51bWJlciB7XG4gICAgaWYgKCF3aXRoRWRnZUdhcCkgcmV0dXJuIDBcbiAgICBjb25zdCBzdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYXJyYXlMYXN0KHNsaWRlcykpXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShgbWFyZ2luLSR7ZW5kRWRnZX1gKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lYXN1cmVXaXRoR2FwcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHNsaWRlUmVjdHNcbiAgICAgIC5tYXAoKHJlY3QsIGluZGV4LCByZWN0cykgPT4ge1xuICAgICAgICBjb25zdCBpc0ZpcnN0ID0gIWluZGV4XG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGFycmF5SXNMYXN0SW5kZXgocmVjdHMsIGluZGV4KVxuICAgICAgICBpZiAoaXNGaXJzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgc3RhcnRHYXBcbiAgICAgICAgaWYgKGlzTGFzdCkgcmV0dXJuIHNsaWRlU2l6ZXNbaW5kZXhdICsgZW5kR2FwXG4gICAgICAgIHJldHVybiByZWN0c1tpbmRleCArIDFdW3N0YXJ0RWRnZV0gLSByZWN0W3N0YXJ0RWRnZV1cbiAgICAgIH0pXG4gICAgICAubWFwKG1hdGhBYnMpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZVNpemVzVHlwZSA9IHtcbiAgICBzbGlkZVNpemVzLFxuICAgIHNsaWRlU2l6ZXNXaXRoR2FwcyxcbiAgICBzdGFydEdhcCxcbiAgICBlbmRHYXBcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQXhpc1R5cGUgfSBmcm9tICcuL0F4aXMnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUgfSBmcm9tICcuL05vZGVSZWN0cydcbmltcG9ydCB7XG4gIGFycmF5S2V5cyxcbiAgYXJyYXlMYXN0LFxuICBhcnJheUxhc3RJbmRleCxcbiAgaXNOdW1iZXIsXG4gIG1hdGhBYnNcbn0gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IHR5cGUgU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlID0gJ2F1dG8nIHwgbnVtYmVyXG5cbmV4cG9ydCB0eXBlIFNsaWRlc1RvU2Nyb2xsVHlwZSA9IHtcbiAgZ3JvdXBTbGlkZXM6IDxUeXBlPihhcnJheTogVHlwZVtdKSA9PiBUeXBlW11bXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2xpZGVzVG9TY3JvbGwoXG4gIGF4aXM6IEF4aXNUeXBlLFxuICB2aWV3U2l6ZTogbnVtYmVyLFxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlLFxuICBsb29wOiBib29sZWFuLFxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGUsXG4gIHNsaWRlUmVjdHM6IE5vZGVSZWN0VHlwZVtdLFxuICBzdGFydEdhcDogbnVtYmVyLFxuICBlbmRHYXA6IG51bWJlcixcbiAgcGl4ZWxUb2xlcmFuY2U6IG51bWJlclxuKTogU2xpZGVzVG9TY3JvbGxUeXBlIHtcbiAgY29uc3QgeyBzdGFydEVkZ2UsIGVuZEVkZ2UsIGRpcmVjdGlvbiB9ID0gYXhpc1xuICBjb25zdCBncm91cEJ5TnVtYmVyID0gaXNOdW1iZXIoc2xpZGVzVG9TY3JvbGwpXG5cbiAgZnVuY3Rpb24gYnlOdW1iZXI8VHlwZT4oYXJyYXk6IFR5cGVbXSwgZ3JvdXBTaXplOiBudW1iZXIpOiBUeXBlW11bXSB7XG4gICAgcmV0dXJuIGFycmF5S2V5cyhhcnJheSlcbiAgICAgIC5maWx0ZXIoKGkpID0+IGkgJSBncm91cFNpemUgPT09IDApXG4gICAgICAubWFwKChpKSA9PiBhcnJheS5zbGljZShpLCBpICsgZ3JvdXBTaXplKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5U2l6ZTxUeXBlPihhcnJheTogVHlwZVtdKTogVHlwZVtdW10ge1xuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gW11cblxuICAgIHJldHVybiBhcnJheUtleXMoYXJyYXkpXG4gICAgICAucmVkdWNlKChncm91cHM6IG51bWJlcltdLCByZWN0QiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjdEEgPSBhcnJheUxhc3QoZ3JvdXBzKSB8fCAwXG4gICAgICAgIGNvbnN0IGlzRmlyc3QgPSByZWN0QSA9PT0gMFxuICAgICAgICBjb25zdCBpc0xhc3QgPSByZWN0QiA9PT0gYXJyYXlMYXN0SW5kZXgoYXJyYXkpXG5cbiAgICAgICAgY29uc3QgZWRnZUEgPSBjb250YWluZXJSZWN0W3N0YXJ0RWRnZV0gLSBzbGlkZVJlY3RzW3JlY3RBXVtzdGFydEVkZ2VdXG4gICAgICAgIGNvbnN0IGVkZ2VCID0gY29udGFpbmVyUmVjdFtzdGFydEVkZ2VdIC0gc2xpZGVSZWN0c1tyZWN0Ql1bZW5kRWRnZV1cbiAgICAgICAgY29uc3QgZ2FwQSA9ICFsb29wICYmIGlzRmlyc3QgPyBkaXJlY3Rpb24oc3RhcnRHYXApIDogMFxuICAgICAgICBjb25zdCBnYXBCID0gIWxvb3AgJiYgaXNMYXN0ID8gZGlyZWN0aW9uKGVuZEdhcCkgOiAwXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IG1hdGhBYnMoZWRnZUIgLSBnYXBCIC0gKGVkZ2VBICsgZ2FwQSkpXG5cbiAgICAgICAgaWYgKGluZGV4ICYmIGNodW5rU2l6ZSA+IHZpZXdTaXplICsgcGl4ZWxUb2xlcmFuY2UpIGdyb3Vwcy5wdXNoKHJlY3RCKVxuICAgICAgICBpZiAoaXNMYXN0KSBncm91cHMucHVzaChhcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBncm91cHNcbiAgICAgIH0sIFtdKVxuICAgICAgLm1hcCgoY3VycmVudFNpemUsIGluZGV4LCBncm91cHMpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTaXplID0gTWF0aC5tYXgoZ3JvdXBzW2luZGV4IC0gMV0gfHwgMClcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKHByZXZpb3VzU2l6ZSwgY3VycmVudFNpemUpXG4gICAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ3JvdXBTbGlkZXM8VHlwZT4oYXJyYXk6IFR5cGVbXSk6IFR5cGVbXVtdIHtcbiAgICByZXR1cm4gZ3JvdXBCeU51bWJlciA/IGJ5TnVtYmVyKGFycmF5LCBzbGlkZXNUb1Njcm9sbCkgOiBieVNpemUoYXJyYXkpXG4gIH1cblxuICBjb25zdCBzZWxmOiBTbGlkZXNUb1Njcm9sbFR5cGUgPSB7XG4gICAgZ3JvdXBTbGlkZXNcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgQWxpZ25tZW50IH0gZnJvbSAnLi9BbGlnbm1lbnQnXG5pbXBvcnQgeyBBbmltYXRpb25zLCBBbmltYXRpb25zVHlwZSwgQW5pbWF0aW9uc1VwZGF0ZVR5cGUgfSBmcm9tICcuL0FuaW1hdGlvbnMnXG5pbXBvcnQgeyBBeGlzLCBBeGlzVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IENvdW50ZXIsIENvdW50ZXJUeXBlIH0gZnJvbSAnLi9Db3VudGVyJ1xuaW1wb3J0IHsgRHJhZ0hhbmRsZXIsIERyYWdIYW5kbGVyVHlwZSB9IGZyb20gJy4vRHJhZ0hhbmRsZXInXG5pbXBvcnQgeyBEcmFnVHJhY2tlciB9IGZyb20gJy4vRHJhZ1RyYWNrZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBFdmVudFN0b3JlLCBFdmVudFN0b3JlVHlwZSB9IGZyb20gJy4vRXZlbnRTdG9yZSdcbmltcG9ydCB7IExpbWl0VHlwZSB9IGZyb20gJy4vTGltaXQnXG5pbXBvcnQgeyBOb2RlUmVjdFR5cGUsIE5vZGVSZWN0cyB9IGZyb20gJy4vTm9kZVJlY3RzJ1xuaW1wb3J0IHsgT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBQZXJjZW50T2ZWaWV3LCBQZXJjZW50T2ZWaWV3VHlwZSB9IGZyb20gJy4vUGVyY2VudE9mVmlldydcbmltcG9ydCB7IFJlc2l6ZUhhbmRsZXIsIFJlc2l6ZUhhbmRsZXJUeXBlIH0gZnJvbSAnLi9SZXNpemVIYW5kbGVyJ1xuaW1wb3J0IHsgU2Nyb2xsQm9keSwgU2Nyb2xsQm9keVR5cGUgfSBmcm9tICcuL1Njcm9sbEJvZHknXG5pbXBvcnQgeyBTY3JvbGxCb3VuZHMsIFNjcm9sbEJvdW5kc1R5cGUgfSBmcm9tICcuL1Njcm9sbEJvdW5kcydcbmltcG9ydCB7IFNjcm9sbENvbnRhaW4gfSBmcm9tICcuL1Njcm9sbENvbnRhaW4nXG5pbXBvcnQgeyBTY3JvbGxMaW1pdCB9IGZyb20gJy4vU2Nyb2xsTGltaXQnXG5pbXBvcnQgeyBTY3JvbGxMb29wZXIsIFNjcm9sbExvb3BlclR5cGUgfSBmcm9tICcuL1Njcm9sbExvb3BlcidcbmltcG9ydCB7IFNjcm9sbFByb2dyZXNzLCBTY3JvbGxQcm9ncmVzc1R5cGUgfSBmcm9tICcuL1Njcm9sbFByb2dyZXNzJ1xuaW1wb3J0IHsgU2Nyb2xsU25hcHMgfSBmcm9tICcuL1Njcm9sbFNuYXBzJ1xuaW1wb3J0IHsgU2xpZGVSZWdpc3RyeSwgU2xpZGVSZWdpc3RyeVR5cGUgfSBmcm9tICcuL1NsaWRlUmVnaXN0cnknXG5pbXBvcnQgeyBTY3JvbGxUYXJnZXQsIFNjcm9sbFRhcmdldFR5cGUgfSBmcm9tICcuL1Njcm9sbFRhcmdldCdcbmltcG9ydCB7IFNjcm9sbFRvLCBTY3JvbGxUb1R5cGUgfSBmcm9tICcuL1Njcm9sbFRvJ1xuaW1wb3J0IHsgU2xpZGVGb2N1cywgU2xpZGVGb2N1c1R5cGUgfSBmcm9tICcuL1NsaWRlRm9jdXMnXG5pbXBvcnQgeyBTbGlkZUxvb3BlciwgU2xpZGVMb29wZXJUeXBlIH0gZnJvbSAnLi9TbGlkZUxvb3BlcidcbmltcG9ydCB7IFNsaWRlc0hhbmRsZXIsIFNsaWRlc0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9TbGlkZXNIYW5kbGVyJ1xuaW1wb3J0IHsgU2xpZGVzSW5WaWV3LCBTbGlkZXNJblZpZXdUeXBlIH0gZnJvbSAnLi9TbGlkZXNJblZpZXcnXG5pbXBvcnQgeyBTbGlkZVNpemVzIH0gZnJvbSAnLi9TbGlkZVNpemVzJ1xuaW1wb3J0IHsgU2xpZGVzVG9TY3JvbGwsIFNsaWRlc1RvU2Nyb2xsVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBUcmFuc2xhdGUsIFRyYW5zbGF0ZVR5cGUgfSBmcm9tICcuL1RyYW5zbGF0ZSdcbmltcG9ydCB7IGFycmF5S2V5cywgYXJyYXlMYXN0LCBhcnJheUxhc3RJbmRleCwgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBWZWN0b3IxRCwgVmVjdG9yMURUeXBlIH0gZnJvbSAnLi9WZWN0b3IxZCdcblxuZXhwb3J0IHR5cGUgRW5naW5lVHlwZSA9IHtcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnRcbiAgb3duZXJXaW5kb3c6IFdpbmRvd1R5cGVcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4gIGF4aXM6IEF4aXNUeXBlXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uc1R5cGVcbiAgc2Nyb2xsQm91bmRzOiBTY3JvbGxCb3VuZHNUeXBlXG4gIHNjcm9sbExvb3BlcjogU2Nyb2xsTG9vcGVyVHlwZVxuICBzY3JvbGxQcm9ncmVzczogU2Nyb2xsUHJvZ3Jlc3NUeXBlXG4gIGluZGV4OiBDb3VudGVyVHlwZVxuICBpbmRleFByZXZpb3VzOiBDb3VudGVyVHlwZVxuICBsaW1pdDogTGltaXRUeXBlXG4gIGxvY2F0aW9uOiBWZWN0b3IxRFR5cGVcbiAgb3B0aW9uczogT3B0aW9uc1R5cGVcbiAgcGVyY2VudE9mVmlldzogUGVyY2VudE9mVmlld1R5cGVcbiAgc2Nyb2xsQm9keTogU2Nyb2xsQm9keVR5cGVcbiAgZHJhZ0hhbmRsZXI6IERyYWdIYW5kbGVyVHlwZVxuICBldmVudFN0b3JlOiBFdmVudFN0b3JlVHlwZVxuICBzbGlkZUxvb3BlcjogU2xpZGVMb29wZXJUeXBlXG4gIHNsaWRlc0luVmlldzogU2xpZGVzSW5WaWV3VHlwZVxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxUeXBlXG4gIHRhcmdldDogVmVjdG9yMURUeXBlXG4gIHRyYW5zbGF0ZTogVHJhbnNsYXRlVHlwZVxuICByZXNpemVIYW5kbGVyOiBSZXNpemVIYW5kbGVyVHlwZVxuICBzbGlkZXNIYW5kbGVyOiBTbGlkZXNIYW5kbGVyVHlwZVxuICBzY3JvbGxUbzogU2Nyb2xsVG9UeXBlXG4gIHNjcm9sbFRhcmdldDogU2Nyb2xsVGFyZ2V0VHlwZVxuICBzY3JvbGxTbmFwTGlzdDogbnVtYmVyW11cbiAgc2Nyb2xsU25hcHM6IG51bWJlcltdXG4gIHNsaWRlSW5kZXhlczogbnVtYmVyW11cbiAgc2xpZGVGb2N1czogU2xpZGVGb2N1c1R5cGVcbiAgc2xpZGVSZWdpc3RyeTogU2xpZGVSZWdpc3RyeVR5cGVbJ3NsaWRlUmVnaXN0cnknXVxuICBjb250YWluZXJSZWN0OiBOb2RlUmVjdFR5cGVcbiAgc2xpZGVSZWN0czogTm9kZVJlY3RUeXBlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVuZ2luZShcbiAgcm9vdDogSFRNTEVsZW1lbnQsXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gIHNsaWRlczogSFRNTEVsZW1lbnRbXSxcbiAgb3duZXJEb2N1bWVudDogRG9jdW1lbnQsXG4gIG93bmVyV2luZG93OiBXaW5kb3dUeXBlLFxuICBvcHRpb25zOiBPcHRpb25zVHlwZSxcbiAgZXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJUeXBlXG4pOiBFbmdpbmVUeXBlIHtcbiAgLy8gT3B0aW9uc1xuICBjb25zdCB7XG4gICAgYWxpZ24sXG4gICAgYXhpczogc2Nyb2xsQXhpcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RhcnRJbmRleCxcbiAgICBsb29wLFxuICAgIGR1cmF0aW9uLFxuICAgIGRyYWdGcmVlLFxuICAgIGRyYWdUaHJlc2hvbGQsXG4gICAgaW5WaWV3VGhyZXNob2xkLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiBncm91cFNsaWRlcyxcbiAgICBza2lwU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICB3YXRjaFJlc2l6ZSxcbiAgICB3YXRjaFNsaWRlcyxcbiAgICB3YXRjaERyYWdcbiAgfSA9IG9wdGlvbnNcblxuICAvLyBNZWFzdXJlbWVudHNcbiAgY29uc3QgcGl4ZWxUb2xlcmFuY2UgPSAyXG4gIGNvbnN0IG5vZGVSZWN0cyA9IE5vZGVSZWN0cygpXG4gIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBub2RlUmVjdHMubWVhc3VyZShjb250YWluZXIpXG4gIGNvbnN0IHNsaWRlUmVjdHMgPSBzbGlkZXMubWFwKG5vZGVSZWN0cy5tZWFzdXJlKVxuICBjb25zdCBheGlzID0gQXhpcyhzY3JvbGxBeGlzLCBkaXJlY3Rpb24pXG4gIGNvbnN0IHZpZXdTaXplID0gYXhpcy5tZWFzdXJlU2l6ZShjb250YWluZXJSZWN0KVxuICBjb25zdCBwZXJjZW50T2ZWaWV3ID0gUGVyY2VudE9mVmlldyh2aWV3U2l6ZSlcbiAgY29uc3QgYWxpZ25tZW50ID0gQWxpZ25tZW50KGFsaWduLCB2aWV3U2l6ZSlcbiAgY29uc3QgY29udGFpblNuYXBzID0gIWxvb3AgJiYgISFjb250YWluU2Nyb2xsXG4gIGNvbnN0IHJlYWRFZGdlR2FwID0gbG9vcCB8fCAhIWNvbnRhaW5TY3JvbGxcbiAgY29uc3QgeyBzbGlkZVNpemVzLCBzbGlkZVNpemVzV2l0aEdhcHMsIHN0YXJ0R2FwLCBlbmRHYXAgfSA9IFNsaWRlU2l6ZXMoXG4gICAgYXhpcyxcbiAgICBjb250YWluZXJSZWN0LFxuICAgIHNsaWRlUmVjdHMsXG4gICAgc2xpZGVzLFxuICAgIHJlYWRFZGdlR2FwLFxuICAgIG93bmVyV2luZG93XG4gIClcbiAgY29uc3Qgc2xpZGVzVG9TY3JvbGwgPSBTbGlkZXNUb1Njcm9sbChcbiAgICBheGlzLFxuICAgIHZpZXdTaXplLFxuICAgIGdyb3VwU2xpZGVzLFxuICAgIGxvb3AsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHN0YXJ0R2FwLFxuICAgIGVuZEdhcCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHsgc25hcHMsIHNuYXBzQWxpZ25lZCB9ID0gU2Nyb2xsU25hcHMoXG4gICAgYXhpcyxcbiAgICBhbGlnbm1lbnQsXG4gICAgY29udGFpbmVyUmVjdCxcbiAgICBzbGlkZVJlY3RzLFxuICAgIHNsaWRlc1RvU2Nyb2xsXG4gIClcbiAgY29uc3QgY29udGVudFNpemUgPSAtYXJyYXlMYXN0KHNuYXBzKSArIGFycmF5TGFzdChzbGlkZVNpemVzV2l0aEdhcHMpXG4gIGNvbnN0IHsgc25hcHNDb250YWluZWQsIHNjcm9sbENvbnRhaW5MaW1pdCB9ID0gU2Nyb2xsQ29udGFpbihcbiAgICB2aWV3U2l6ZSxcbiAgICBjb250ZW50U2l6ZSxcbiAgICBzbmFwc0FsaWduZWQsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBwaXhlbFRvbGVyYW5jZVxuICApXG4gIGNvbnN0IHNjcm9sbFNuYXBzID0gY29udGFpblNuYXBzID8gc25hcHNDb250YWluZWQgOiBzbmFwc0FsaWduZWRcbiAgY29uc3QgeyBsaW1pdCB9ID0gU2Nyb2xsTGltaXQoY29udGVudFNpemUsIHNjcm9sbFNuYXBzLCBsb29wKVxuXG4gIC8vIEluZGV4ZXNcbiAgY29uc3QgaW5kZXggPSBDb3VudGVyKGFycmF5TGFzdEluZGV4KHNjcm9sbFNuYXBzKSwgc3RhcnRJbmRleCwgbG9vcClcbiAgY29uc3QgaW5kZXhQcmV2aW91cyA9IGluZGV4LmNsb25lKClcbiAgY29uc3Qgc2xpZGVJbmRleGVzID0gYXJyYXlLZXlzKHNsaWRlcylcblxuICAvLyBBbmltYXRpb25cbiAgY29uc3QgdXBkYXRlOiBBbmltYXRpb25zVXBkYXRlVHlwZSA9ICh7XG4gICAgZHJhZ0hhbmRsZXIsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIHNjcm9sbEJvZHksXG4gICAgc2Nyb2xsQm91bmRzLFxuICAgIHNjcm9sbExvb3BlcixcbiAgICBzbGlkZUxvb3BlcixcbiAgICB0cmFuc2xhdGUsXG4gICAgbG9jYXRpb24sXG4gICAgYW5pbWF0aW9uLFxuICAgIG9wdGlvbnM6IHsgbG9vcCB9XG4gIH0pID0+IHtcbiAgICBpZiAoIWxvb3ApIHNjcm9sbEJvdW5kcy5jb25zdHJhaW4oZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSlcbiAgICBzY3JvbGxCb2R5LnNlZWsoKVxuXG4gICAgY29uc3Qgc2hvdWxkU2V0dGxlID0gc2Nyb2xsQm9keS5zZXR0bGVkKClcbiAgICBjb25zdCB3aXRoaW5Cb3VuZHMgPSAhc2Nyb2xsQm91bmRzLnNob3VsZENvbnN0cmFpbigpXG4gICAgY29uc3QgaGFzU2V0dGxlZCA9IGxvb3AgPyBzaG91bGRTZXR0bGUgOiBzaG91bGRTZXR0bGUgJiYgd2l0aGluQm91bmRzXG5cbiAgICBpZiAoaGFzU2V0dGxlZCAmJiAhZHJhZ0hhbmRsZXIucG9pbnRlckRvd24oKSkge1xuICAgICAgYW5pbWF0aW9uLnN0b3AoKVxuICAgICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3NldHRsZScpXG4gICAgfVxuICAgIGlmICghaGFzU2V0dGxlZCkgZXZlbnRIYW5kbGVyLmVtaXQoJ3Njcm9sbCcpXG5cbiAgICBpZiAobG9vcCkge1xuICAgICAgc2Nyb2xsTG9vcGVyLmxvb3Aoc2Nyb2xsQm9keS5kaXJlY3Rpb24oKSlcbiAgICAgIHNsaWRlTG9vcGVyLmxvb3AoKVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZS50byhsb2NhdGlvbi5nZXQoKSlcbiAgfVxuXG4gIGNvbnN0IGFuaW1hdGlvbiA9IEFuaW1hdGlvbnMob3duZXJEb2N1bWVudCwgb3duZXJXaW5kb3csICgpID0+IHVwZGF0ZShlbmdpbmUpKVxuXG4gIC8vIFNoYXJlZFxuICBjb25zdCBmcmljdGlvbiA9IDAuNjhcbiAgY29uc3Qgc3RhcnRMb2NhdGlvbiA9IHNjcm9sbFNuYXBzW2luZGV4LmdldCgpXVxuICBjb25zdCBsb2NhdGlvbiA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHRhcmdldCA9IFZlY3RvcjFEKHN0YXJ0TG9jYXRpb24pXG4gIGNvbnN0IHNjcm9sbEJvZHkgPSBTY3JvbGxCb2R5KGxvY2F0aW9uLCB0YXJnZXQsIGR1cmF0aW9uLCBmcmljdGlvbilcbiAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gU2Nyb2xsVGFyZ2V0KFxuICAgIGxvb3AsXG4gICAgc2Nyb2xsU25hcHMsXG4gICAgY29udGVudFNpemUsXG4gICAgbGltaXQsXG4gICAgdGFyZ2V0XG4gIClcbiAgY29uc3Qgc2Nyb2xsVG8gPSBTY3JvbGxUbyhcbiAgICBhbmltYXRpb24sXG4gICAgaW5kZXgsXG4gICAgaW5kZXhQcmV2aW91cyxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgdGFyZ2V0LFxuICAgIGV2ZW50SGFuZGxlclxuICApXG4gIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gU2Nyb2xsUHJvZ3Jlc3MobGltaXQpXG4gIGNvbnN0IGV2ZW50U3RvcmUgPSBFdmVudFN0b3JlKClcbiAgY29uc3Qgc2xpZGVzSW5WaWV3ID0gU2xpZGVzSW5WaWV3KFxuICAgIGNvbnRhaW5lcixcbiAgICBzbGlkZXMsXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGluVmlld1RocmVzaG9sZFxuICApXG4gIGNvbnN0IHsgc2xpZGVSZWdpc3RyeSB9ID0gU2xpZGVSZWdpc3RyeShcbiAgICBjb250YWluU25hcHMsXG4gICAgY29udGFpblNjcm9sbCxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxDb250YWluTGltaXQsXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgc2xpZGVJbmRleGVzXG4gIClcbiAgY29uc3Qgc2xpZGVGb2N1cyA9IFNsaWRlRm9jdXMoXG4gICAgcm9vdCxcbiAgICBzbGlkZXMsXG4gICAgc2xpZGVSZWdpc3RyeSxcbiAgICBzY3JvbGxUbyxcbiAgICBzY3JvbGxCb2R5LFxuICAgIGV2ZW50U3RvcmUsXG4gICAgZXZlbnRIYW5kbGVyXG4gIClcblxuICAvLyBFbmdpbmVcbiAgY29uc3QgZW5naW5lOiBFbmdpbmVUeXBlID0ge1xuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgb3duZXJXaW5kb3csXG4gICAgZXZlbnRIYW5kbGVyLFxuICAgIGNvbnRhaW5lclJlY3QsXG4gICAgc2xpZGVSZWN0cyxcbiAgICBhbmltYXRpb24sXG4gICAgYXhpcyxcbiAgICBkcmFnSGFuZGxlcjogRHJhZ0hhbmRsZXIoXG4gICAgICBheGlzLFxuICAgICAgcm9vdCxcbiAgICAgIG93bmVyRG9jdW1lbnQsXG4gICAgICBvd25lcldpbmRvdyxcbiAgICAgIHRhcmdldCxcbiAgICAgIERyYWdUcmFja2VyKGF4aXMsIG93bmVyV2luZG93KSxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgYW5pbWF0aW9uLFxuICAgICAgc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCb2R5LFxuICAgICAgc2Nyb2xsVGFyZ2V0LFxuICAgICAgaW5kZXgsXG4gICAgICBldmVudEhhbmRsZXIsXG4gICAgICBwZXJjZW50T2ZWaWV3LFxuICAgICAgZHJhZ0ZyZWUsXG4gICAgICBkcmFnVGhyZXNob2xkLFxuICAgICAgc2tpcFNuYXBzLFxuICAgICAgZnJpY3Rpb24sXG4gICAgICB3YXRjaERyYWdcbiAgICApLFxuICAgIGV2ZW50U3RvcmUsXG4gICAgcGVyY2VudE9mVmlldyxcbiAgICBpbmRleCxcbiAgICBpbmRleFByZXZpb3VzLFxuICAgIGxpbWl0LFxuICAgIGxvY2F0aW9uLFxuICAgIG9wdGlvbnMsXG4gICAgcmVzaXplSGFuZGxlcjogUmVzaXplSGFuZGxlcihcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGV2ZW50SGFuZGxlcixcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgc2xpZGVzLFxuICAgICAgYXhpcyxcbiAgICAgIHdhdGNoUmVzaXplLFxuICAgICAgbm9kZVJlY3RzXG4gICAgKSxcbiAgICBzY3JvbGxCb2R5LFxuICAgIHNjcm9sbEJvdW5kczogU2Nyb2xsQm91bmRzKFxuICAgICAgbGltaXQsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIHRhcmdldCxcbiAgICAgIHNjcm9sbEJvZHksXG4gICAgICBwZXJjZW50T2ZWaWV3XG4gICAgKSxcbiAgICBzY3JvbGxMb29wZXI6IFNjcm9sbExvb3Blcihjb250ZW50U2l6ZSwgbGltaXQsIGxvY2F0aW9uLCBbXG4gICAgICBsb2NhdGlvbixcbiAgICAgIHRhcmdldFxuICAgIF0pLFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0OiBzY3JvbGxTbmFwcy5tYXAoc2Nyb2xsUHJvZ3Jlc3MuZ2V0KSxcbiAgICBzY3JvbGxTbmFwcyxcbiAgICBzY3JvbGxUYXJnZXQsXG4gICAgc2Nyb2xsVG8sXG4gICAgc2xpZGVMb29wZXI6IFNsaWRlTG9vcGVyKFxuICAgICAgYXhpcyxcbiAgICAgIHZpZXdTaXplLFxuICAgICAgY29udGVudFNpemUsXG4gICAgICBzbGlkZVNpemVzLFxuICAgICAgc2xpZGVTaXplc1dpdGhHYXBzLFxuICAgICAgc25hcHMsXG4gICAgICBzY3JvbGxTbmFwcyxcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgc2xpZGVzXG4gICAgKSxcbiAgICBzbGlkZUZvY3VzLFxuICAgIHNsaWRlc0hhbmRsZXI6IFNsaWRlc0hhbmRsZXIoY29udGFpbmVyLCBldmVudEhhbmRsZXIsIHdhdGNoU2xpZGVzKSxcbiAgICBzbGlkZXNJblZpZXcsXG4gICAgc2xpZGVJbmRleGVzLFxuICAgIHNsaWRlUmVnaXN0cnksXG4gICAgc2xpZGVzVG9TY3JvbGwsXG4gICAgdGFyZ2V0LFxuICAgIHRyYW5zbGF0ZTogVHJhbnNsYXRlKGF4aXMsIGNvbnRhaW5lcilcbiAgfVxuXG4gIHJldHVybiBlbmdpbmVcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuXG50eXBlIENhbGxiYWNrVHlwZSA9IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUsIGV2dDogRW1ibGFFdmVudFR5cGUpID0+IHZvaWRcbnR5cGUgTGlzdGVuZXJzVHlwZSA9IFBhcnRpYWw8eyBba2V5IGluIEVtYmxhRXZlbnRUeXBlXTogQ2FsbGJhY2tUeXBlW10gfT5cblxuZXhwb3J0IHR5cGUgRW1ibGFFdmVudFR5cGUgPSBFbWJsYUV2ZW50TGlzdFR5cGVba2V5b2YgRW1ibGFFdmVudExpc3RUeXBlXVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYmxhRXZlbnRMaXN0VHlwZSB7XG4gIGluaXQ6ICdpbml0J1xuICBwb2ludGVyRG93bjogJ3BvaW50ZXJEb3duJ1xuICBwb2ludGVyVXA6ICdwb2ludGVyVXAnXG4gIHNsaWRlc0NoYW5nZWQ6ICdzbGlkZXNDaGFuZ2VkJ1xuICBzbGlkZXNJblZpZXc6ICdzbGlkZXNJblZpZXcnXG4gIHNjcm9sbDogJ3Njcm9sbCdcbiAgc2VsZWN0OiAnc2VsZWN0J1xuICBzZXR0bGU6ICdzZXR0bGUnXG4gIGRlc3Ryb3k6ICdkZXN0cm95J1xuICByZUluaXQ6ICdyZUluaXQnXG4gIHJlc2l6ZTogJ3Jlc2l6ZSdcbiAgc2xpZGVGb2N1czogJ3NsaWRlRm9jdXMnXG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50SGFuZGxlclR5cGUgPSB7XG4gIGluaXQ6IChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpID0+IHZvaWRcbiAgZW1pdDogKGV2dDogRW1ibGFFdmVudFR5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgb246IChldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKSA9PiBFdmVudEhhbmRsZXJUeXBlXG4gIG9mZjogKGV2dDogRW1ibGFFdmVudFR5cGUsIGNiOiBDYWxsYmFja1R5cGUpID0+IEV2ZW50SGFuZGxlclR5cGVcbiAgY2xlYXI6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50SGFuZGxlcigpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgbGV0IGxpc3RlbmVyczogTGlzdGVuZXJzVHlwZSA9IHt9XG4gIGxldCBhcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlXG5cbiAgZnVuY3Rpb24gaW5pdChlbWJsYUFwaTogRW1ibGFDYXJvdXNlbFR5cGUpOiB2b2lkIHtcbiAgICBhcGkgPSBlbWJsYUFwaVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dDogRW1ibGFFdmVudFR5cGUpOiBDYWxsYmFja1R5cGVbXSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyc1tldnRdIHx8IFtdXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2dDogRW1ibGFFdmVudFR5cGUpOiBFdmVudEhhbmRsZXJUeXBlIHtcbiAgICBnZXRMaXN0ZW5lcnMoZXZ0KS5mb3JFYWNoKChlKSA9PiBlKGFwaSwgZXZ0KSlcbiAgICByZXR1cm4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gb24oZXZ0OiBFbWJsYUV2ZW50VHlwZSwgY2I6IENhbGxiYWNrVHlwZSk6IEV2ZW50SGFuZGxlclR5cGUge1xuICAgIGxpc3RlbmVyc1tldnRdID0gZ2V0TGlzdGVuZXJzKGV2dCkuY29uY2F0KFtjYl0pXG4gICAgcmV0dXJuIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZihldnQ6IEVtYmxhRXZlbnRUeXBlLCBjYjogQ2FsbGJhY2tUeXBlKTogRXZlbnRIYW5kbGVyVHlwZSB7XG4gICAgbGlzdGVuZXJzW2V2dF0gPSBnZXRMaXN0ZW5lcnMoZXZ0KS5maWx0ZXIoKGUpID0+IGUgIT09IGNiKVxuICAgIHJldHVybiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcigpOiB2b2lkIHtcbiAgICBsaXN0ZW5lcnMgPSB7fVxuICB9XG5cbiAgY29uc3Qgc2VsZjogRXZlbnRIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGVtaXQsXG4gICAgb2ZmLFxuICAgIG9uLFxuICAgIGNsZWFyXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEFsaWdubWVudE9wdGlvblR5cGUgfSBmcm9tICcuL0FsaWdubWVudCdcbmltcG9ydCB7IEF4aXNEaXJlY3Rpb25PcHRpb25UeXBlLCBBeGlzT3B0aW9uVHlwZSB9IGZyb20gJy4vQXhpcydcbmltcG9ydCB7IFNsaWRlc1RvU2Nyb2xsT3B0aW9uVHlwZSB9IGZyb20gJy4vU2xpZGVzVG9TY3JvbGwnXG5pbXBvcnQgeyBTY3JvbGxDb250YWluT3B0aW9uVHlwZSB9IGZyb20gJy4vU2Nyb2xsQ29udGFpbidcbmltcG9ydCB7IERyYWdIYW5kbGVyT3B0aW9uVHlwZSB9IGZyb20gJy4vRHJhZ0hhbmRsZXInXG5pbXBvcnQgeyBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZSB9IGZyb20gJy4vUmVzaXplSGFuZGxlcidcbmltcG9ydCB7IFNsaWRlc0hhbmRsZXJPcHRpb25UeXBlIH0gZnJvbSAnLi9TbGlkZXNIYW5kbGVyJ1xuaW1wb3J0IHsgU2xpZGVzSW5WaWV3T3B0aW9uc1R5cGUgfSBmcm9tICcuL1NsaWRlc0luVmlldydcblxuZXhwb3J0IHR5cGUgTG9vc2VPcHRpb25zVHlwZSA9IHtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93blxufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVPcHRpb25zVHlwZTxUeXBlIGV4dGVuZHMgTG9vc2VPcHRpb25zVHlwZT4gPSBUeXBlICYge1xuICBhY3RpdmU6IGJvb2xlYW5cbiAgYnJlYWtwb2ludHM6IHtcbiAgICBba2V5OiBzdHJpbmddOiBPbWl0PFBhcnRpYWw8Q3JlYXRlT3B0aW9uc1R5cGU8VHlwZT4+LCAnYnJlYWtwb2ludHMnPlxuICB9XG59XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNUeXBlID0gQ3JlYXRlT3B0aW9uc1R5cGU8e1xuICBhbGlnbjogQWxpZ25tZW50T3B0aW9uVHlwZVxuICBheGlzOiBBeGlzT3B0aW9uVHlwZVxuICBjb250YWluZXI6IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgbnVsbFxuICBzbGlkZXM6IHN0cmluZyB8IEhUTUxFbGVtZW50W10gfCBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiB8IG51bGxcbiAgY29udGFpblNjcm9sbDogU2Nyb2xsQ29udGFpbk9wdGlvblR5cGVcbiAgZGlyZWN0aW9uOiBBeGlzRGlyZWN0aW9uT3B0aW9uVHlwZVxuICBzbGlkZXNUb1Njcm9sbDogU2xpZGVzVG9TY3JvbGxPcHRpb25UeXBlXG4gIGRyYWdGcmVlOiBib29sZWFuXG4gIGRyYWdUaHJlc2hvbGQ6IG51bWJlclxuICBpblZpZXdUaHJlc2hvbGQ6IFNsaWRlc0luVmlld09wdGlvbnNUeXBlXG4gIGxvb3A6IGJvb2xlYW5cbiAgc2tpcFNuYXBzOiBib29sZWFuXG4gIGR1cmF0aW9uOiBudW1iZXJcbiAgc3RhcnRJbmRleDogbnVtYmVyXG4gIHdhdGNoRHJhZzogRHJhZ0hhbmRsZXJPcHRpb25UeXBlXG4gIHdhdGNoUmVzaXplOiBSZXNpemVIYW5kbGVyT3B0aW9uVHlwZVxuICB3YXRjaFNsaWRlczogU2xpZGVzSGFuZGxlck9wdGlvblR5cGVcbn0+XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T3B0aW9uczogT3B0aW9uc1R5cGUgPSB7XG4gIGFsaWduOiAnY2VudGVyJyxcbiAgYXhpczogJ3gnLFxuICBjb250YWluZXI6IG51bGwsXG4gIHNsaWRlczogbnVsbCxcbiAgY29udGFpblNjcm9sbDogJ3RyaW1TbmFwcycsXG4gIGRpcmVjdGlvbjogJ2x0cicsXG4gIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICBpblZpZXdUaHJlc2hvbGQ6IDAsXG4gIGJyZWFrcG9pbnRzOiB7fSxcbiAgZHJhZ0ZyZWU6IGZhbHNlLFxuICBkcmFnVGhyZXNob2xkOiAxMCxcbiAgbG9vcDogZmFsc2UsXG4gIHNraXBTbmFwczogZmFsc2UsXG4gIGR1cmF0aW9uOiAyNSxcbiAgc3RhcnRJbmRleDogMCxcbiAgYWN0aXZlOiB0cnVlLFxuICB3YXRjaERyYWc6IHRydWUsXG4gIHdhdGNoUmVzaXplOiB0cnVlLFxuICB3YXRjaFNsaWRlczogdHJ1ZVxufVxuXG5leHBvcnQgdHlwZSBFbWJsYU9wdGlvbnNUeXBlID0gUGFydGlhbDxPcHRpb25zVHlwZT5cbiIsImltcG9ydCB7IExvb3NlT3B0aW9uc1R5cGUsIENyZWF0ZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9PcHRpb25zJ1xuaW1wb3J0IHsgb2JqZWN0S2V5cywgb2JqZWN0c01lcmdlRGVlcCwgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgT3B0aW9uc1R5cGUgPSBQYXJ0aWFsPENyZWF0ZU9wdGlvbnNUeXBlPExvb3NlT3B0aW9uc1R5cGU+PlxuXG5leHBvcnQgdHlwZSBPcHRpb25zSGFuZGxlclR5cGUgPSB7XG4gIG1lcmdlT3B0aW9uczogPFR5cGVBIGV4dGVuZHMgT3B0aW9uc1R5cGUsIFR5cGVCIGV4dGVuZHMgT3B0aW9uc1R5cGU+KFxuICAgIG9wdGlvbnNBOiBUeXBlQSxcbiAgICBvcHRpb25zQj86IFR5cGVCXG4gICkgPT4gVHlwZUFcbiAgb3B0aW9uc0F0TWVkaWE6IDxUeXBlIGV4dGVuZHMgT3B0aW9uc1R5cGU+KG9wdGlvbnM6IFR5cGUpID0+IFR5cGVcbiAgb3B0aW9uc01lZGlhUXVlcmllczogKG9wdGlvbnNMaXN0OiBPcHRpb25zVHlwZVtdKSA9PiBNZWRpYVF1ZXJ5TGlzdFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPcHRpb25zSGFuZGxlcihvd25lcldpbmRvdzogV2luZG93VHlwZSk6IE9wdGlvbnNIYW5kbGVyVHlwZSB7XG4gIGZ1bmN0aW9uIG1lcmdlT3B0aW9uczxUeXBlQSBleHRlbmRzIE9wdGlvbnNUeXBlLCBUeXBlQiBleHRlbmRzIE9wdGlvbnNUeXBlPihcbiAgICBvcHRpb25zQTogVHlwZUEsXG4gICAgb3B0aW9uc0I/OiBUeXBlQlxuICApOiBUeXBlQSB7XG4gICAgcmV0dXJuIDxUeXBlQT5vYmplY3RzTWVyZ2VEZWVwKG9wdGlvbnNBLCBvcHRpb25zQiB8fCB7fSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wdGlvbnNBdE1lZGlhPFR5cGUgZXh0ZW5kcyBPcHRpb25zVHlwZT4ob3B0aW9uczogVHlwZSk6IFR5cGUge1xuICAgIGNvbnN0IG9wdGlvbnNBdE1lZGlhID0gb3B0aW9ucy5icmVha3BvaW50cyB8fCB7fVxuICAgIGNvbnN0IG1hdGNoZWRNZWRpYU9wdGlvbnMgPSBvYmplY3RLZXlzKG9wdGlvbnNBdE1lZGlhKVxuICAgICAgLmZpbHRlcigobWVkaWEpID0+IG93bmVyV2luZG93Lm1hdGNoTWVkaWEobWVkaWEpLm1hdGNoZXMpXG4gICAgICAubWFwKChtZWRpYSkgPT4gb3B0aW9uc0F0TWVkaWFbbWVkaWFdKVxuICAgICAgLnJlZHVjZSgoYSwgbWVkaWFPcHRpb24pID0+IG1lcmdlT3B0aW9ucyhhLCBtZWRpYU9wdGlvbiksIHt9KVxuXG4gICAgcmV0dXJuIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBtYXRjaGVkTWVkaWFPcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gb3B0aW9uc01lZGlhUXVlcmllcyhvcHRpb25zTGlzdDogT3B0aW9uc1R5cGVbXSk6IE1lZGlhUXVlcnlMaXN0W10ge1xuICAgIHJldHVybiBvcHRpb25zTGlzdFxuICAgICAgLm1hcCgob3B0aW9ucykgPT4gb2JqZWN0S2V5cyhvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9KSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgbWVkaWFRdWVyaWVzKSA9PiBhY2MuY29uY2F0KG1lZGlhUXVlcmllcyksIFtdKVxuICAgICAgLm1hcChvd25lcldpbmRvdy5tYXRjaE1lZGlhKVxuICB9XG5cbiAgY29uc3Qgc2VsZjogT3B0aW9uc0hhbmRsZXJUeXBlID0ge1xuICAgIG1lcmdlT3B0aW9ucyxcbiAgICBvcHRpb25zQXRNZWRpYSxcbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzXG4gIH1cbiAgcmV0dXJuIHNlbGZcbn1cbiIsImltcG9ydCB7IEVtYmxhQ2Fyb3VzZWxUeXBlIH0gZnJvbSAnLi9FbWJsYUNhcm91c2VsJ1xuaW1wb3J0IHsgT3B0aW9uc0hhbmRsZXJUeXBlIH0gZnJvbSAnLi9PcHRpb25zSGFuZGxlcidcbmltcG9ydCB7IEVtYmxhUGx1Z2luc1R5cGUsIEVtYmxhUGx1Z2luVHlwZSB9IGZyb20gJy4vUGx1Z2lucydcblxuZXhwb3J0IHR5cGUgUGx1Z2luc0hhbmRsZXJUeXBlID0ge1xuICBpbml0OiAoXG4gICAgZW1ibGFBcGk6IEVtYmxhQ2Fyb3VzZWxUeXBlLFxuICAgIHBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdXG4gICkgPT4gRW1ibGFQbHVnaW5zVHlwZVxuICBkZXN0cm95OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQbHVnaW5zSGFuZGxlcihcbiAgb3B0aW9uc0hhbmRsZXI6IE9wdGlvbnNIYW5kbGVyVHlwZVxuKTogUGx1Z2luc0hhbmRsZXJUeXBlIHtcbiAgbGV0IGFjdGl2ZVBsdWdpbnM6IEVtYmxhUGx1Z2luVHlwZVtdID0gW11cblxuICBmdW5jdGlvbiBpbml0KFxuICAgIGVtYmxhQXBpOiBFbWJsYUNhcm91c2VsVHlwZSxcbiAgICBwbHVnaW5zOiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiBFbWJsYVBsdWdpbnNUeXBlIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gcGx1Z2lucy5maWx0ZXIoXG4gICAgICAoeyBvcHRpb25zIH0pID0+IG9wdGlvbnNIYW5kbGVyLm9wdGlvbnNBdE1lZGlhKG9wdGlvbnMpLmFjdGl2ZSAhPT0gZmFsc2VcbiAgICApXG4gICAgYWN0aXZlUGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHBsdWdpbi5pbml0KGVtYmxhQXBpLCBvcHRpb25zSGFuZGxlcikpXG5cbiAgICByZXR1cm4gcGx1Z2lucy5yZWR1Y2UoXG4gICAgICAobWFwLCBwbHVnaW4pID0+IE9iamVjdC5hc3NpZ24obWFwLCB7IFtwbHVnaW4ubmFtZV06IHBsdWdpbiB9KSxcbiAgICAgIHt9XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpOiB2b2lkIHtcbiAgICBhY3RpdmVQbHVnaW5zID0gYWN0aXZlUGx1Z2lucy5maWx0ZXIoKHBsdWdpbikgPT4gcGx1Z2luLmRlc3Ryb3koKSlcbiAgfVxuXG4gIGNvbnN0IHNlbGY6IFBsdWdpbnNIYW5kbGVyVHlwZSA9IHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfVxuICByZXR1cm4gc2VsZlxufVxuIiwiaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVUeXBlIH0gZnJvbSAnLi9FbmdpbmUnXG5pbXBvcnQgeyBFdmVudFN0b3JlIH0gZnJvbSAnLi9FdmVudFN0b3JlJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyLCBFdmVudEhhbmRsZXJUeXBlIH0gZnJvbSAnLi9FdmVudEhhbmRsZXInXG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucywgRW1ibGFPcHRpb25zVHlwZSwgT3B0aW9uc1R5cGUgfSBmcm9tICcuL09wdGlvbnMnXG5pbXBvcnQgeyBPcHRpb25zSGFuZGxlciB9IGZyb20gJy4vT3B0aW9uc0hhbmRsZXInXG5pbXBvcnQgeyBQbHVnaW5zSGFuZGxlciB9IGZyb20gJy4vUGx1Z2luc0hhbmRsZXInXG5pbXBvcnQgeyBFbWJsYVBsdWdpbnNUeXBlLCBFbWJsYVBsdWdpblR5cGUgfSBmcm9tICcuL1BsdWdpbnMnXG5pbXBvcnQgeyBpc1N0cmluZywgV2luZG93VHlwZSB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCB0eXBlIEVtYmxhQ2Fyb3VzZWxUeXBlID0ge1xuICBjYW5TY3JvbGxOZXh0OiAoKSA9PiBib29sZWFuXG4gIGNhblNjcm9sbFByZXY6ICgpID0+IGJvb2xlYW5cbiAgY29udGFpbmVyTm9kZTogKCkgPT4gSFRNTEVsZW1lbnRcbiAgaW50ZXJuYWxFbmdpbmU6ICgpID0+IEVuZ2luZVR5cGVcbiAgZGVzdHJveTogKCkgPT4gdm9pZFxuICBvZmY6IEV2ZW50SGFuZGxlclR5cGVbJ29mZiddXG4gIG9uOiBFdmVudEhhbmRsZXJUeXBlWydvbiddXG4gIGVtaXQ6IEV2ZW50SGFuZGxlclR5cGVbJ2VtaXQnXVxuICBwbHVnaW5zOiAoKSA9PiBFbWJsYVBsdWdpbnNUeXBlXG4gIHByZXZpb3VzU2Nyb2xsU25hcDogKCkgPT4gbnVtYmVyXG4gIHJlSW5pdDogKG9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLCBwbHVnaW5zPzogRW1ibGFQbHVnaW5UeXBlW10pID0+IHZvaWRcbiAgcm9vdE5vZGU6ICgpID0+IEhUTUxFbGVtZW50XG4gIHNjcm9sbE5leHQ6IChqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzY3JvbGxQcmV2OiAoanVtcD86IGJvb2xlYW4pID0+IHZvaWRcbiAgc2Nyb2xsUHJvZ3Jlc3M6ICgpID0+IG51bWJlclxuICBzY3JvbGxTbmFwTGlzdDogKCkgPT4gbnVtYmVyW11cbiAgc2Nyb2xsVG86IChpbmRleDogbnVtYmVyLCBqdW1wPzogYm9vbGVhbikgPT4gdm9pZFxuICBzZWxlY3RlZFNjcm9sbFNuYXA6ICgpID0+IG51bWJlclxuICBzbGlkZU5vZGVzOiAoKSA9PiBIVE1MRWxlbWVudFtdXG4gIHNsaWRlc0luVmlldzogKCkgPT4gbnVtYmVyW11cbiAgc2xpZGVzTm90SW5WaWV3OiAoKSA9PiBudW1iZXJbXVxufVxuXG5mdW5jdGlvbiBFbWJsYUNhcm91c2VsKFxuICByb290OiBIVE1MRWxlbWVudCxcbiAgdXNlck9wdGlvbnM/OiBFbWJsYU9wdGlvbnNUeXBlLFxuICB1c2VyUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4pOiBFbWJsYUNhcm91c2VsVHlwZSB7XG4gIGNvbnN0IG93bmVyRG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnRcbiAgY29uc3Qgb3duZXJXaW5kb3cgPSA8V2luZG93VHlwZT5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3XG4gIGNvbnN0IG9wdGlvbnNIYW5kbGVyID0gT3B0aW9uc0hhbmRsZXIob3duZXJXaW5kb3cpXG4gIGNvbnN0IHBsdWdpbnNIYW5kbGVyID0gUGx1Z2luc0hhbmRsZXIob3B0aW9uc0hhbmRsZXIpXG4gIGNvbnN0IG1lZGlhSGFuZGxlcnMgPSBFdmVudFN0b3JlKClcbiAgY29uc3QgZXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyKClcbiAgY29uc3QgeyBtZXJnZU9wdGlvbnMsIG9wdGlvbnNBdE1lZGlhLCBvcHRpb25zTWVkaWFRdWVyaWVzIH0gPSBvcHRpb25zSGFuZGxlclxuICBjb25zdCB7IG9uLCBvZmYsIGVtaXQgfSA9IGV2ZW50SGFuZGxlclxuICBjb25zdCByZUluaXQgPSByZUFjdGl2YXRlXG5cbiAgbGV0IGRlc3Ryb3llZCA9IGZhbHNlXG4gIGxldCBlbmdpbmU6IEVuZ2luZVR5cGVcbiAgbGV0IG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCBFbWJsYUNhcm91c2VsLmdsb2JhbE9wdGlvbnMpXG4gIGxldCBvcHRpb25zID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlKVxuICBsZXQgcGx1Z2luTGlzdDogRW1ibGFQbHVnaW5UeXBlW10gPSBbXVxuICBsZXQgcGx1Z2luQXBpczogRW1ibGFQbHVnaW5zVHlwZVxuXG4gIGxldCBjb250YWluZXI6IEhUTUxFbGVtZW50XG4gIGxldCBzbGlkZXM6IEhUTUxFbGVtZW50W11cblxuICBmdW5jdGlvbiBzdG9yZUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyOiB1c2VyQ29udGFpbmVyLCBzbGlkZXM6IHVzZXJTbGlkZXMgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IGN1c3RvbUNvbnRhaW5lciA9IGlzU3RyaW5nKHVzZXJDb250YWluZXIpXG4gICAgICA/IHJvb3QucXVlcnlTZWxlY3Rvcih1c2VyQ29udGFpbmVyKVxuICAgICAgOiB1c2VyQ29udGFpbmVyXG4gICAgY29udGFpbmVyID0gPEhUTUxFbGVtZW50PihjdXN0b21Db250YWluZXIgfHwgcm9vdC5jaGlsZHJlblswXSlcblxuICAgIGNvbnN0IGN1c3RvbVNsaWRlcyA9IGlzU3RyaW5nKHVzZXJTbGlkZXMpXG4gICAgICA/IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHVzZXJTbGlkZXMpXG4gICAgICA6IHVzZXJTbGlkZXNcbiAgICBzbGlkZXMgPSA8SFRNTEVsZW1lbnRbXT5bXS5zbGljZS5jYWxsKGN1c3RvbVNsaWRlcyB8fCBjb250YWluZXIuY2hpbGRyZW4pXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbmdpbmUob3B0aW9uczogT3B0aW9uc1R5cGUpOiBFbmdpbmVUeXBlIHtcbiAgICBjb25zdCBlbmdpbmUgPSBFbmdpbmUoXG4gICAgICByb290LFxuICAgICAgY29udGFpbmVyLFxuICAgICAgc2xpZGVzLFxuICAgICAgb3duZXJEb2N1bWVudCxcbiAgICAgIG93bmVyV2luZG93LFxuICAgICAgb3B0aW9ucyxcbiAgICAgIGV2ZW50SGFuZGxlclxuICAgIClcblxuICAgIGlmIChvcHRpb25zLmxvb3AgJiYgIWVuZ2luZS5zbGlkZUxvb3Blci5jYW5Mb29wKCkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnNXaXRob3V0TG9vcCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgbG9vcDogZmFsc2UgfSlcbiAgICAgIHJldHVybiBjcmVhdGVFbmdpbmUob3B0aW9uc1dpdGhvdXRMb29wKVxuICAgIH1cbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZShcbiAgICB3aXRoT3B0aW9ucz86IEVtYmxhT3B0aW9uc1R5cGUsXG4gICAgd2l0aFBsdWdpbnM/OiBFbWJsYVBsdWdpblR5cGVbXVxuICApOiB2b2lkIHtcbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cblxuICAgIG9wdGlvbnNCYXNlID0gbWVyZ2VPcHRpb25zKG9wdGlvbnNCYXNlLCB3aXRoT3B0aW9ucylcbiAgICBvcHRpb25zID0gb3B0aW9uc0F0TWVkaWEob3B0aW9uc0Jhc2UpXG4gICAgcGx1Z2luTGlzdCA9IHdpdGhQbHVnaW5zIHx8IHBsdWdpbkxpc3RcblxuICAgIHN0b3JlRWxlbWVudHMoKVxuXG4gICAgZW5naW5lID0gY3JlYXRlRW5naW5lKG9wdGlvbnMpXG5cbiAgICBvcHRpb25zTWVkaWFRdWVyaWVzKFtcbiAgICAgIG9wdGlvbnNCYXNlLFxuICAgICAgLi4ucGx1Z2luTGlzdC5tYXAoKHsgb3B0aW9ucyB9KSA9PiBvcHRpb25zKVxuICAgIF0pLmZvckVhY2goKHF1ZXJ5KSA9PiBtZWRpYUhhbmRsZXJzLmFkZChxdWVyeSwgJ2NoYW5nZScsIHJlQWN0aXZhdGUpKVxuXG4gICAgaWYgKCFvcHRpb25zLmFjdGl2ZSkgcmV0dXJuXG5cbiAgICBlbmdpbmUudHJhbnNsYXRlLnRvKGVuZ2luZS5sb2NhdGlvbi5nZXQoKSlcbiAgICBlbmdpbmUuYW5pbWF0aW9uLmluaXQoKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuaW5pdCgpXG4gICAgZW5naW5lLnNsaWRlRm9jdXMuaW5pdCgpXG4gICAgZW5naW5lLmV2ZW50SGFuZGxlci5pbml0KHNlbGYpXG4gICAgZW5naW5lLnJlc2l6ZUhhbmRsZXIuaW5pdChzZWxmKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIGlmIChlbmdpbmUub3B0aW9ucy5sb29wKSBlbmdpbmUuc2xpZGVMb29wZXIubG9vcCgpXG4gICAgaWYgKGNvbnRhaW5lci5vZmZzZXRQYXJlbnQgJiYgc2xpZGVzLmxlbmd0aCkgZW5naW5lLmRyYWdIYW5kbGVyLmluaXQoc2VsZilcblxuICAgIHBsdWdpbkFwaXMgPSBwbHVnaW5zSGFuZGxlci5pbml0KHNlbGYsIHBsdWdpbkxpc3QpXG4gIH1cblxuICBmdW5jdGlvbiByZUFjdGl2YXRlKFxuICAgIHdpdGhPcHRpb25zPzogRW1ibGFPcHRpb25zVHlwZSxcbiAgICB3aXRoUGx1Z2lucz86IEVtYmxhUGx1Z2luVHlwZVtdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGFjdGl2YXRlKG1lcmdlT3B0aW9ucyh7IHN0YXJ0SW5kZXggfSwgd2l0aE9wdGlvbnMpLCB3aXRoUGx1Z2lucylcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncmVJbml0JylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlQWN0aXZhdGUoKTogdm9pZCB7XG4gICAgZW5naW5lLmRyYWdIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5ldmVudFN0b3JlLmNsZWFyKClcbiAgICBlbmdpbmUudHJhbnNsYXRlLmNsZWFyKClcbiAgICBlbmdpbmUuc2xpZGVMb29wZXIuY2xlYXIoKVxuICAgIGVuZ2luZS5yZXNpemVIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNIYW5kbGVyLmRlc3Ryb3koKVxuICAgIGVuZ2luZS5zbGlkZXNJblZpZXcuZGVzdHJveSgpXG4gICAgZW5naW5lLmFuaW1hdGlvbi5kZXN0cm95KClcbiAgICBwbHVnaW5zSGFuZGxlci5kZXN0cm95KClcbiAgICBtZWRpYUhhbmRsZXJzLmNsZWFyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuICAgIG1lZGlhSGFuZGxlcnMuY2xlYXIoKVxuICAgIGRlQWN0aXZhdGUoKVxuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdkZXN0cm95JylcbiAgICBldmVudEhhbmRsZXIuY2xlYXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8oaW5kZXg6IG51bWJlciwganVtcD86IGJvb2xlYW4sIGRpcmVjdGlvbj86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghb3B0aW9ucy5hY3RpdmUgfHwgZGVzdHJveWVkKSByZXR1cm5cbiAgICBlbmdpbmUuc2Nyb2xsQm9keVxuICAgICAgLnVzZUJhc2VGcmljdGlvbigpXG4gICAgICAudXNlRHVyYXRpb24oanVtcCA9PT0gdHJ1ZSA/IDAgOiBvcHRpb25zLmR1cmF0aW9uKVxuICAgIGVuZ2luZS5zY3JvbGxUby5pbmRleChpbmRleCwgZGlyZWN0aW9uIHx8IDApXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxOZXh0KGp1bXA/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgbmV4dCA9IGVuZ2luZS5pbmRleC5hZGQoMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhuZXh0LCBqdW1wLCAtMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFByZXYoanVtcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICBzY3JvbGxUbyhwcmV2LCBqdW1wLCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsTmV4dCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBuZXh0ID0gZW5naW5lLmluZGV4LmFkZCgxKS5nZXQoKVxuICAgIHJldHVybiBuZXh0ICE9PSBzZWxlY3RlZFNjcm9sbFNuYXAoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuU2Nyb2xsUHJldigpOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2ID0gZW5naW5lLmluZGV4LmFkZCgtMSkuZ2V0KClcbiAgICByZXR1cm4gcHJldiAhPT0gc2VsZWN0ZWRTY3JvbGxTbmFwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFNuYXBMaXN0KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNjcm9sbFNuYXBMaXN0XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxQcm9ncmVzcygpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuc2Nyb2xsUHJvZ3Jlc3MuZ2V0KGVuZ2luZS5sb2NhdGlvbi5nZXQoKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdGVkU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXguZ2V0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU2Nyb2xsU25hcCgpOiBudW1iZXIge1xuICAgIHJldHVybiBlbmdpbmUuaW5kZXhQcmV2aW91cy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzSW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVzTm90SW5WaWV3KCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gZW5naW5lLnNsaWRlc0luVmlldy5nZXQoZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBwbHVnaW5zKCk6IEVtYmxhUGx1Z2luc1R5cGUge1xuICAgIHJldHVybiBwbHVnaW5BcGlzXG4gIH1cblxuICBmdW5jdGlvbiBpbnRlcm5hbEVuZ2luZSgpOiBFbmdpbmVUeXBlIHtcbiAgICByZXR1cm4gZW5naW5lXG4gIH1cblxuICBmdW5jdGlvbiByb290Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHJvb3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRhaW5lck5vZGUoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBjb250YWluZXJcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlTm9kZXMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIHNsaWRlc1xuICB9XG5cbiAgY29uc3Qgc2VsZjogRW1ibGFDYXJvdXNlbFR5cGUgPSB7XG4gICAgY2FuU2Nyb2xsTmV4dCxcbiAgICBjYW5TY3JvbGxQcmV2LFxuICAgIGNvbnRhaW5lck5vZGUsXG4gICAgaW50ZXJuYWxFbmdpbmUsXG4gICAgZGVzdHJveSxcbiAgICBvZmYsXG4gICAgb24sXG4gICAgZW1pdCxcbiAgICBwbHVnaW5zLFxuICAgIHByZXZpb3VzU2Nyb2xsU25hcCxcbiAgICByZUluaXQsXG4gICAgcm9vdE5vZGUsXG4gICAgc2Nyb2xsTmV4dCxcbiAgICBzY3JvbGxQcmV2LFxuICAgIHNjcm9sbFByb2dyZXNzLFxuICAgIHNjcm9sbFNuYXBMaXN0LFxuICAgIHNjcm9sbFRvLFxuICAgIHNlbGVjdGVkU2Nyb2xsU25hcCxcbiAgICBzbGlkZU5vZGVzLFxuICAgIHNsaWRlc0luVmlldyxcbiAgICBzbGlkZXNOb3RJblZpZXdcbiAgfVxuXG4gIGFjdGl2YXRlKHVzZXJPcHRpb25zLCB1c2VyUGx1Z2lucylcbiAgc2V0VGltZW91dCgoKSA9PiBldmVudEhhbmRsZXIuZW1pdCgnaW5pdCcpLCAwKVxuICByZXR1cm4gc2VsZlxufVxuXG5kZWNsYXJlIG5hbWVzcGFjZSBFbWJsYUNhcm91c2VsIHtcbiAgbGV0IGdsb2JhbE9wdGlvbnM6IEVtYmxhT3B0aW9uc1R5cGUgfCB1bmRlZmluZWRcbn1cblxuRW1ibGFDYXJvdXNlbC5nbG9iYWxPcHRpb25zID0gdW5kZWZpbmVkXG5cbmV4cG9ydCBkZWZhdWx0IEVtYmxhQ2Fyb3VzZWxcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEVtYmxhQ2Fyb3VzZWwgZnJvbSAnZW1ibGEtY2Fyb3VzZWwnXG5pbXBvcnQge1xuICAgIGFkZFRodW1iQnRuc0NsaWNrSGFuZGxlcnMsXG4gICAgYWRkVG9nZ2xlVGh1bWJCdG5zQWN0aXZlXG59IGZyb20gJy4vYnV0dG9ucy5lczYnXG5cbmNsYXNzIFlURHluYW1pY3NHYWxsZXJ5IHtcbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBPUFRJT05TID0ge1xuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgT1BUSU9OU19USFVNQlMgPSB7XG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBheGlzOiAneScsXG4gICAgICAgICAgICBkcmFnRnJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ybXNsaWRlc2hvd19fdmlld3BvcnQnKVxuICAgICAgICBjb25zdCB2aWV3cG9ydE5vZGVUaHVtYkNhcm91c2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJtc2xpZGVzaG93LXRodW1ic19fdmlld3BvcnQnKVxuICAgICAgICBjb25zdCBlbWJsYUFwaU1haW4gPSBFbWJsYUNhcm91c2VsKHZpZXdwb3J0Tm9kZU1haW5DYXJvdXNlbCwgT1BUSU9OUylcbiAgICAgICAgY29uc3QgZW1ibGFBcGlUaHVtYiA9IEVtYmxhQ2Fyb3VzZWwodmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCwgT1BUSU9OU19USFVNQlMpXG5cbiAgICAgICAgY29uc3QgcmVtb3ZlVGh1bWJCdG5zQ2xpY2tIYW5kbGVycyA9IGFkZFRodW1iQnRuc0NsaWNrSGFuZGxlcnMoXG4gICAgICAgICAgICBlbWJsYUFwaU1haW4sXG4gICAgICAgICAgICBlbWJsYUFwaVRodW1iXG4gICAgICAgIClcbiAgICAgICAgY29uc3QgcmVtb3ZlVG9nZ2xlVGh1bWJCdG5zQWN0aXZlID0gYWRkVG9nZ2xlVGh1bWJCdG5zQWN0aXZlKFxuICAgICAgICAgICAgZW1ibGFBcGlNYWluLFxuICAgICAgICAgICAgZW1ibGFBcGlUaHVtYlxuICAgICAgICApXG5cbiAgICAgICAgZW1ibGFBcGlNYWluXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUaHVtYkJ0bnNDbGlja0hhbmRsZXJzKVxuICAgICAgICAgICAgLm9uKCdkZXN0cm95JywgcmVtb3ZlVG9nZ2xlVGh1bWJCdG5zQWN0aXZlKVxuXG4gICAgICAgIGVtYmxhQXBpVGh1bWJcbiAgICAgICAgICAgIC5vbignZGVzdHJveScsIHJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMpXG4gICAgICAgICAgICAub24oJ2Rlc3Ryb3knLCByZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUpXG4gICAgfVxufVxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgKG5ldyBZVER5bmFtaWNzR2FsbGVyeSkuaW5pdCgpO1xufSk7Il0sIm5hbWVzIjpbImFkZFRodW1iQnRuc0NsaWNrSGFuZGxlcnMiLCJlbWJsYUFwaU1haW4iLCJlbWJsYUFwaVRodW1iIiwic2xpZGVzVGh1bWJzIiwic2xpZGVOb2RlcyIsInNjcm9sbFRvSW5kZXgiLCJtYXAiLCJfIiwiaW5kZXgiLCJzY3JvbGxUbyIsImZvckVhY2giLCJzbGlkZU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZFRvZ2dsZVRodW1iQnRuc0FjdGl2ZSIsInRvZ2dsZVRodW1iQnRuc1N0YXRlIiwic2VsZWN0ZWRTY3JvbGxTbmFwIiwicHJldmlvdXMiLCJwcmV2aW91c1Njcm9sbFNuYXAiLCJzZWxlY3RlZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsIm9uIiwiaXNOdW1iZXIiLCJzdWJqZWN0IiwiaXNTdHJpbmciLCJpc0Jvb2xlYW4iLCJpc09iamVjdCIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIm1hdGhBYnMiLCJuIiwiTWF0aCIsImFicyIsIm1hdGhTaWduIiwic2lnbiIsImRlbHRhQWJzIiwidmFsdWVCIiwidmFsdWVBIiwiZmFjdG9yQWJzIiwiZGlmZiIsImFycmF5S2V5cyIsImFycmF5Iiwib2JqZWN0S2V5cyIsIk51bWJlciIsImFycmF5TGFzdCIsImFycmF5TGFzdEluZGV4IiwibWF4IiwibGVuZ3RoIiwiYXJyYXlJc0xhc3RJbmRleCIsImFycmF5RnJvbU51bWJlciIsInN0YXJ0QXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJBcnJheSIsImZyb20iLCJpIiwib2JqZWN0Iiwia2V5cyIsIm9iamVjdHNNZXJnZURlZXAiLCJvYmplY3RBIiwib2JqZWN0QiIsInJlZHVjZSIsIm1lcmdlZE9iamVjdHMiLCJjdXJyZW50T2JqZWN0Iiwia2V5IiwiYXJlT2JqZWN0cyIsImlzTW91c2VFdmVudCIsImV2dCIsIm93bmVyV2luZG93IiwiTW91c2VFdmVudCIsIkFsaWdubWVudCIsImFsaWduIiwidmlld1NpemUiLCJwcmVkZWZpbmVkIiwic3RhcnQiLCJjZW50ZXIiLCJlbmQiLCJtZWFzdXJlIiwic2VsZiIsIkV2ZW50U3RvcmUiLCJsaXN0ZW5lcnMiLCJub2RlIiwidHlwZSIsImhhbmRsZXIiLCJvcHRpb25zIiwicGFzc2l2ZSIsInJlbW92ZUxpc3RlbmVyIiwibGVnYWN5TWVkaWFRdWVyeUxpc3QiLCJhZGRMaXN0ZW5lciIsInB1c2giLCJjbGVhciIsImZpbHRlciIsIkFuaW1hdGlvbnMiLCJvd25lckRvY3VtZW50IiwidXBkYXRlIiwiZG9jdW1lbnRWaXNpYmxlSGFuZGxlciIsInRpbWVTdGVwIiwibGFzdFRpbWVTdGFtcCIsImFuaW1hdGlvbkZyYW1lIiwibGFnIiwiaW5pdCIsImhpZGRlbiIsInJlc2V0IiwiZGVzdHJveSIsInN0b3AiLCJhbmltYXRlIiwidGltZVN0YW1wIiwidGltZUVsYXBzZWQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIkF4aXMiLCJheGlzIiwiY29udGVudERpcmVjdGlvbiIsImlzUmlnaHRUb0xlZnQiLCJpc1ZlcnRpY2FsIiwic2Nyb2xsIiwiY3Jvc3MiLCJzdGFydEVkZ2UiLCJnZXRTdGFydEVkZ2UiLCJlbmRFZGdlIiwiZ2V0RW5kRWRnZSIsIm1lYXN1cmVTaXplIiwibm9kZVJlY3QiLCJoZWlnaHQiLCJ3aWR0aCIsImRpcmVjdGlvbiIsIkxpbWl0IiwibWluIiwicmVhY2hlZE1pbiIsInJlYWNoZWRNYXgiLCJyZWFjaGVkQW55IiwiY29uc3RyYWluIiwicmVtb3ZlT2Zmc2V0IiwiY2VpbCIsIkNvdW50ZXIiLCJsb29wIiwibG9vcEVuZCIsImNvdW50ZXIiLCJ3aXRoaW5MaW1pdCIsImdldCIsInNldCIsImNsb25lIiwiRHJhZ0hhbmRsZXIiLCJyb290Tm9kZSIsInRhcmdldCIsImRyYWdUcmFja2VyIiwibG9jYXRpb24iLCJhbmltYXRpb24iLCJzY3JvbGxCb2R5Iiwic2Nyb2xsVGFyZ2V0IiwiZXZlbnRIYW5kbGVyIiwicGVyY2VudE9mVmlldyIsImRyYWdGcmVlIiwiZHJhZ1RocmVzaG9sZCIsInNraXBTbmFwcyIsImJhc2VGcmljdGlvbiIsIndhdGNoRHJhZyIsImNyb3NzQXhpcyIsImZvY3VzTm9kZXMiLCJub25QYXNzaXZlRXZlbnQiLCJpbml0RXZlbnRzIiwiZHJhZ0V2ZW50cyIsImdvVG9OZXh0VGhyZXNob2xkIiwic25hcEZvcmNlQm9vc3QiLCJtb3VzZSIsInRvdWNoIiwiZnJlZUZvcmNlQm9vc3QiLCJiYXNlU3BlZWQiLCJpc01vdmluZyIsInN0YXJ0U2Nyb2xsIiwic3RhcnRDcm9zcyIsInBvaW50ZXJJc0Rvd24iLCJwcmV2ZW50U2Nyb2xsIiwicHJldmVudENsaWNrIiwiaXNNb3VzZSIsImVtYmxhQXBpIiwiZG93bklmQWxsb3dlZCIsImRvd24iLCJwcmV2ZW50RGVmYXVsdCIsInVwIiwiY2xpY2siLCJhZGREcmFnRXZlbnRzIiwibW92ZSIsImlzRm9jdXNOb2RlIiwibm9kZU5hbWUiLCJpbmNsdWRlcyIsImZvcmNlQm9vc3QiLCJib29zdCIsImFsbG93ZWRGb3JjZSIsImZvcmNlIiwidGFyZ2V0Q2hhbmdlZCIsIm5leHQiLCJiYXNlRm9yY2UiLCJieURpc3RhbmNlIiwiZGlzdGFuY2UiLCJieUluZGV4IiwiaXNNb3VzZUV2dCIsImJ1dHRvbnMiLCJidXR0b24iLCJwb2ludGVyRG93biIsInVzZUZyaWN0aW9uIiwidXNlRHVyYXRpb24iLCJyZWFkUG9pbnQiLCJlbWl0IiwiaXNUb3VjaEV2dCIsInRvdWNoZXMiLCJsYXN0U2Nyb2xsIiwibGFzdENyb3NzIiwiZGlmZlNjcm9sbCIsImRpZmZDcm9zcyIsImNhbmNlbGFibGUiLCJwb2ludGVyTW92ZSIsImN1cnJlbnRMb2NhdGlvbiIsInJhd0ZvcmNlIiwicG9pbnRlclVwIiwiZm9yY2VGYWN0b3IiLCJzcGVlZCIsImZyaWN0aW9uIiwic3RvcFByb3BhZ2F0aW9uIiwiRHJhZ1RyYWNrZXIiLCJsb2dJbnRlcnZhbCIsInN0YXJ0RXZlbnQiLCJsYXN0RXZlbnQiLCJyZWFkVGltZSIsImV2dEF4aXMiLCJwcm9wZXJ0eSIsImNvb3JkIiwiZXhwaXJlZCIsImRpZmZEcmFnIiwiZGlmZlRpbWUiLCJpc0ZsaWNrIiwiTm9kZVJlY3RzIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiUGVyY2VudE9mVmlldyIsIlJlc2l6ZUhhbmRsZXIiLCJjb250YWluZXIiLCJzbGlkZXMiLCJ3YXRjaFJlc2l6ZSIsIm5vZGVSZWN0cyIsInJlc2l6ZU9ic2VydmVyIiwiY29udGFpbmVyU2l6ZSIsInNsaWRlU2l6ZXMiLCJkZXN0cm95ZWQiLCJyZWFkU2l6ZSIsImRlZmF1bHRDYWxsYmFjayIsImVudHJpZXMiLCJlbnRyeSIsImlzQ29udGFpbmVyIiwic2xpZGVJbmRleCIsImluZGV4T2YiLCJsYXN0U2l6ZSIsIm5ld1NpemUiLCJkaWZmU2l6ZSIsInJlSW5pdCIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZU5vZGVzIiwiY29uY2F0Iiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJTY3JvbGxCb2R5IiwiYmFzZUR1cmF0aW9uIiwiYm9keVZlbG9jaXR5Iiwic2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsRHVyYXRpb24iLCJzY3JvbGxGcmljdGlvbiIsInJhd0xvY2F0aW9uIiwicmF3TG9jYXRpb25QcmV2aW91cyIsInNlZWsiLCJpc0luc3RhbnQiLCJkaXJlY3Rpb25EaWZmIiwic2V0dGxlZCIsImR1cmF0aW9uIiwidmVsb2NpdHkiLCJ1c2VCYXNlRHVyYXRpb24iLCJ1c2VCYXNlRnJpY3Rpb24iLCJTY3JvbGxCb3VuZHMiLCJsaW1pdCIsInB1bGxCYWNrVGhyZXNob2xkIiwiZWRnZU9mZnNldFRvbGVyYW5jZSIsImZyaWN0aW9uTGltaXQiLCJkaXNhYmxlZCIsInNob3VsZENvbnN0cmFpbiIsImVkZ2UiLCJkaWZmVG9FZGdlIiwiZGlmZlRvVGFyZ2V0Iiwic3VidHJhY3QiLCJ0b2dnbGVBY3RpdmUiLCJhY3RpdmUiLCJTY3JvbGxDb250YWluIiwiY29udGVudFNpemUiLCJzbmFwc0FsaWduZWQiLCJjb250YWluU2Nyb2xsIiwicGl4ZWxUb2xlcmFuY2UiLCJzY3JvbGxCb3VuZHMiLCJzbmFwc0JvdW5kZWQiLCJtZWFzdXJlQm91bmRlZCIsInNjcm9sbENvbnRhaW5MaW1pdCIsImZpbmRTY3JvbGxDb250YWluTGltaXQiLCJzbmFwc0NvbnRhaW5lZCIsIm1lYXN1cmVDb250YWluZWQiLCJ1c2VQaXhlbFRvbGVyYW5jZSIsImJvdW5kIiwic25hcCIsInN0YXJ0U25hcCIsImVuZFNuYXAiLCJsYXN0SW5kZXhPZiIsInNuYXBBbGlnbmVkIiwiaXNGaXJzdCIsImlzTGFzdCIsInNjcm9sbEJvdW5kIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJzbGljZSIsIlNjcm9sbExpbWl0Iiwic2Nyb2xsU25hcHMiLCJTY3JvbGxMb29wZXIiLCJ2ZWN0b3JzIiwiam9pbnRTYWZldHkiLCJzaG91bGRMb29wIiwibG9vcERpc3RhbmNlIiwidiIsIlNjcm9sbFByb2dyZXNzIiwiU2Nyb2xsU25hcHMiLCJhbGlnbm1lbnQiLCJjb250YWluZXJSZWN0Iiwic2xpZGVSZWN0cyIsInNsaWRlc1RvU2Nyb2xsIiwiZ3JvdXBTbGlkZXMiLCJhbGlnbm1lbnRzIiwibWVhc3VyZVNpemVzIiwic25hcHMiLCJtZWFzdXJlVW5hbGlnbmVkIiwibWVhc3VyZUFsaWduZWQiLCJyZWN0cyIsInJlY3QiLCJnIiwiU2xpZGVSZWdpc3RyeSIsImNvbnRhaW5TbmFwcyIsInNsaWRlSW5kZXhlcyIsInNsaWRlUmVnaXN0cnkiLCJjcmVhdGVTbGlkZVJlZ2lzdHJ5IiwiZ3JvdXBlZFNsaWRlSW5kZXhlcyIsImRvTm90Q29udGFpbiIsImdyb3VwIiwiZ3JvdXBzIiwicmFuZ2UiLCJTY3JvbGxUYXJnZXQiLCJ0YXJnZXRWZWN0b3IiLCJtaW5EaXN0YW5jZSIsImRpc3RhbmNlcyIsInNvcnQiLCJhIiwiYiIsImZpbmRUYXJnZXRTbmFwIiwiYXNjRGlmZnNUb1NuYXBzIiwic2hvcnRjdXQiLCJkMSIsImQyIiwidGFyZ2V0cyIsIm1hdGNoaW5nVGFyZ2V0cyIsInQiLCJkaWZmVG9TbmFwIiwidGFyZ2V0U25hcERpc3RhbmNlIiwicmVhY2hlZEJvdW5kIiwic25hcERpc3RhbmNlIiwiU2Nyb2xsVG8iLCJpbmRleEN1cnJlbnQiLCJpbmRleFByZXZpb3VzIiwiZGlzdGFuY2VEaWZmIiwiaW5kZXhEaWZmIiwidGFyZ2V0SW5kZXgiLCJTbGlkZUZvY3VzIiwicm9vdCIsImV2ZW50U3RvcmUiLCJsYXN0VGFiUHJlc3NUaW1lIiwiZG9jdW1lbnQiLCJyZWdpc3RlclRhYlByZXNzIiwiYWRkU2xpZGVGb2N1c0V2ZW50IiwiZXZlbnQiLCJjb2RlIiwiRGF0ZSIsImdldFRpbWUiLCJzbGlkZSIsImZvY3VzIiwibm93VGltZSIsInNjcm9sbExlZnQiLCJmaW5kSW5kZXgiLCJjYXB0dXJlIiwiVmVjdG9yMUQiLCJpbml0aWFsVmFsdWUiLCJ2YWx1ZSIsIm5vcm1hbGl6ZUlucHV0IiwiVHJhbnNsYXRlIiwidHJhbnNsYXRlIiwieCIsInkiLCJjb250YWluZXJTdHlsZSIsInN0eWxlIiwidG8iLCJ0cmFuc2Zvcm0iLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJTbGlkZUxvb3BlciIsInNsaWRlU2l6ZXNXaXRoR2FwcyIsInJvdW5kaW5nU2FmZXR5IiwiYXNjSXRlbXMiLCJkZXNjSXRlbXMiLCJyZXZlcnNlIiwibG9vcFBvaW50cyIsInN0YXJ0UG9pbnRzIiwiZW5kUG9pbnRzIiwicmVtb3ZlU2xpZGVTaXplcyIsImluZGV4ZXMiLCJzbGlkZXNJbkdhcCIsImdhcCIsInJlbWFpbmluZ0dhcCIsImZpbmRTbGlkZUJvdW5kcyIsImZpbmRMb29wUG9pbnRzIiwiaXNFbmRFZGdlIiwic2xpZGVCb3VuZHMiLCJpbml0aWFsIiwiYWx0ZXJlZCIsImJvdW5kRWRnZSIsImxvb3BQb2ludCIsInNsaWRlTG9jYXRpb24iLCJjYW5Mb29wIiwiZXZlcnkiLCJfcmVmIiwib3RoZXJJbmRleGVzIiwic2hpZnRMb2NhdGlvbiIsIlNsaWRlc0hhbmRsZXIiLCJ3YXRjaFNsaWRlcyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJtdXRhdGlvbiIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJjaGlsZExpc3QiLCJTbGlkZXNJblZpZXciLCJ0aHJlc2hvbGQiLCJpbnRlcnNlY3Rpb25FbnRyeU1hcCIsImluVmlld0NhY2hlIiwibm90SW5WaWV3Q2FjaGUiLCJpbnRlcnNlY3Rpb25PYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwicGFyZW50RWxlbWVudCIsImNyZWF0ZUluVmlld0xpc3QiLCJpblZpZXciLCJsaXN0IiwicGFyc2VJbnQiLCJpc0ludGVyc2VjdGluZyIsImluVmlld01hdGNoIiwibm90SW5WaWV3TWF0Y2giLCJTbGlkZVNpemVzIiwicmVhZEVkZ2VHYXAiLCJ3aXRoRWRnZUdhcCIsInN0YXJ0R2FwIiwibWVhc3VyZVN0YXJ0R2FwIiwiZW5kR2FwIiwibWVhc3VyZUVuZEdhcCIsIm1lYXN1cmVXaXRoR2FwcyIsInNsaWRlUmVjdCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiU2xpZGVzVG9TY3JvbGwiLCJncm91cEJ5TnVtYmVyIiwiYnlOdW1iZXIiLCJncm91cFNpemUiLCJieVNpemUiLCJyZWN0QiIsInJlY3RBIiwiZWRnZUEiLCJlZGdlQiIsImdhcEEiLCJnYXBCIiwiY2h1bmtTaXplIiwiY3VycmVudFNpemUiLCJwcmV2aW91c1NpemUiLCJFbmdpbmUiLCJzY3JvbGxBeGlzIiwic3RhcnRJbmRleCIsImluVmlld1RocmVzaG9sZCIsIl9yZWYyIiwiZHJhZ0hhbmRsZXIiLCJzY3JvbGxMb29wZXIiLCJzbGlkZUxvb3BlciIsInNob3VsZFNldHRsZSIsIndpdGhpbkJvdW5kcyIsImhhc1NldHRsZWQiLCJlbmdpbmUiLCJzdGFydExvY2F0aW9uIiwic2Nyb2xsUHJvZ3Jlc3MiLCJzbGlkZXNJblZpZXciLCJzbGlkZUZvY3VzIiwicmVzaXplSGFuZGxlciIsInNjcm9sbFNuYXBMaXN0Iiwic2xpZGVzSGFuZGxlciIsIkV2ZW50SGFuZGxlciIsImFwaSIsImdldExpc3RlbmVycyIsImUiLCJjYiIsIm9mZiIsImRlZmF1bHRPcHRpb25zIiwiYnJlYWtwb2ludHMiLCJPcHRpb25zSGFuZGxlciIsIm1lcmdlT3B0aW9ucyIsIm9wdGlvbnNBIiwib3B0aW9uc0IiLCJvcHRpb25zQXRNZWRpYSIsIm1hdGNoZWRNZWRpYU9wdGlvbnMiLCJtZWRpYSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwibWVkaWFPcHRpb24iLCJvcHRpb25zTWVkaWFRdWVyaWVzIiwib3B0aW9uc0xpc3QiLCJhY2MiLCJtZWRpYVF1ZXJpZXMiLCJQbHVnaW5zSGFuZGxlciIsIm9wdGlvbnNIYW5kbGVyIiwiYWN0aXZlUGx1Z2lucyIsInBsdWdpbnMiLCJfcmVmMyIsInBsdWdpbiIsImFzc2lnbiIsIm5hbWUiLCJFbWJsYUNhcm91c2VsIiwidXNlck9wdGlvbnMiLCJ1c2VyUGx1Z2lucyIsImRlZmF1bHRWaWV3IiwicGx1Z2luc0hhbmRsZXIiLCJtZWRpYUhhbmRsZXJzIiwicmVBY3RpdmF0ZSIsIm9wdGlvbnNCYXNlIiwiZ2xvYmFsT3B0aW9ucyIsInBsdWdpbkxpc3QiLCJwbHVnaW5BcGlzIiwic3RvcmVFbGVtZW50cyIsInVzZXJDb250YWluZXIiLCJ1c2VyU2xpZGVzIiwiY3VzdG9tQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImNoaWxkcmVuIiwiY3VzdG9tU2xpZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZUVuZ2luZSIsIm9wdGlvbnNXaXRob3V0TG9vcCIsImFjdGl2YXRlIiwid2l0aE9wdGlvbnMiLCJ3aXRoUGx1Z2lucyIsIl9yZWY0IiwicXVlcnkiLCJvZmZzZXRQYXJlbnQiLCJkZUFjdGl2YXRlIiwianVtcCIsInNjcm9sbE5leHQiLCJzY3JvbGxQcmV2IiwicHJldiIsImNhblNjcm9sbE5leHQiLCJjYW5TY3JvbGxQcmV2Iiwic2xpZGVzTm90SW5WaWV3IiwiaW50ZXJuYWxFbmdpbmUiLCJjb250YWluZXJOb2RlIiwic2V0VGltZW91dCIsIllURHluYW1pY3NHYWxsZXJ5IiwiT1BUSU9OUyIsIk9QVElPTlNfVEhVTUJTIiwidmlld3BvcnROb2RlTWFpbkNhcm91c2VsIiwidmlld3BvcnROb2RlVGh1bWJDYXJvdXNlbCIsInJlbW92ZVRodW1iQnRuc0NsaWNrSGFuZGxlcnMiLCJyZW1vdmVUb2dnbGVUaHVtYkJ0bnNBY3RpdmUiXSwic291cmNlUm9vdCI6IiJ9