import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import './gallery.scss';
import {
    addThumbButtonsClickHandlers,
    addToggleThumbButtonsActive,
    addPrevNextButtonsClickHandlers
} from './buttons.es6';

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
        const navMode = ['thumbnav', 'dotnav'].includes(container.dataset.nav)
            ? container.dataset.nav
            : '';
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
                '(max-width: 639px)': {axis: mobileAxis}
            }
        };
        const optionsThumbs = {
            align: 'start',
            axis: thumbAxis,
            dragFree: true,
            loop: false,
            breakpoints: {
                '(max-width: 639px)': {axis: mobileThumbAxis}
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

        const plugins = autoplay ? [Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: autoplayPause,
            stopOnFocusIn: autoplayPause
        })] : [];
        const emblaMain = EmblaCarousel(viewportNodeMainCarousel, options, plugins);
        const cleanups = [];
        let emblaThumb = null;

        const syncSlides = () => {
            const selected = emblaMain.selectedScrollSnap();
            emblaMain.slideNodes().forEach((slide, index) => {
                const active = index === selected;
                slide.setAttribute('aria-hidden', active ? 'false' : 'true');
                slide.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((control) => {
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
                emblaThumb = EmblaCarousel(viewportNodeThumbCarousel, optionsThumbs, [WheelGesturesPlugin()]);
            }

            cleanups.push(
                addThumbButtonsClickHandlers(emblaMain, navNodes),
                addToggleThumbButtonsActive(emblaMain, navNodes, emblaThumb)
            );

            if (emblaThumb && prevThumbBtnNode && nextThumbBtnNode) {
                cleanups.push(addPrevNextButtonsClickHandlers(
                    emblaThumb,
                    prevThumbBtnNode,
                    nextThumbBtnNode
                ));
            }
        }

        if (prevMainBtnNode && nextMainBtnNode) {
            cleanups.push(addPrevNextButtonsClickHandlers(
                emblaMain,
                prevMainBtnNode,
                nextMainBtnNode
            ));
        }

        const cleanup = () => {
            emblaMain.off('select', syncSlides);
            emblaMain.off('reInit', syncSlides);
            cleanups.forEach((cleanup) => cleanup());
            emblaThumb?.destroy();
            emblaMain.slideNodes().forEach((slide) => {
                slide.removeAttribute('aria-hidden');
                slide.querySelectorAll('[data-rm-gallery-tabindex]').forEach((control) => {
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

const galleryText = document.documentElement.lang.toLowerCase().startsWith('ru')
    ? {image: 'Изображение', open: 'Открыть изображение'}
    : {image: 'Image', open: 'Open image'};

const productSlide = (container, media, index, total, template = null) => {
    const slide = template?.cloneNode(true) || document.createElement('div');
    if (!template) slide.className = 'el-item rmslideshow__slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} / ${total}`);
    slide.removeAttribute('aria-hidden');
    slide.querySelectorAll('[data-rm-gallery-tabindex]').forEach((control) => {
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

const productThumb = (container, media, index, anchorClass, template = null) => {
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

const updateProductGallery = (container, media = []) => {
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

const productGalleryText = document.documentElement.lang.toLowerCase().startsWith('ru')
    ? {image: 'Открыть изображение', video: 'Открыть видео'}
    : {image: 'Open image', video: 'Open video'};

const productGalleryItem = (container, media, index, template = null) => {
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
        if (type === 'image') link.dataset.type = 'image'; else delete link.dataset.type;
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

const updateProductGalleryGridVisibility = (container) => {
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

    const hideToggle = !hasHiddenItems || (expanded && container.dataset.collapse !== 'true');
    if (more) more.hidden = hideToggle;
    toggle.hidden = hideToggle;
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggle.textContent = expanded
        ? container.dataset.showLessLabel || 'Show less'
        : container.dataset.showMoreLabel || 'Show more';
};

const initProductGalleryGrid = (container) => {
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

const updateProductGalleryGrid = (container, media = []) => {
    const items = container.querySelector('.rm-product-gallery__items');
    if (!items) return;
    const more = items.querySelector('.rm-product-gallery__more');
    const itemTemplate = items.querySelector('[data-rm-product-gallery-item]');
    items.querySelectorAll('[data-rm-product-gallery-item]').forEach((item) => item.remove());
    media.forEach((entry, index) => items.insertBefore(productGalleryItem(container, entry, index, itemTemplate), more));
    container.dataset.expanded = 'false';
    container.hidden = media.length === 0;
    updateProductGalleryGridVisibility(container);
    window.UIkit?.update?.(container);
};

const initGalleries = (root = document) => {
    if (root.matches?.('.rmslideshow')) {
        new YTDynamicsGallery().init(root);
    }

    root.querySelectorAll?.('.rmslideshow').forEach((element) => {
        new YTDynamicsGallery().init(element);
    });

    if (root.matches?.('[data-rm-product-gallery-grid]')) initProductGalleryGrid(root);
    root.querySelectorAll?.('[data-rm-product-gallery-grid]').forEach(initProductGalleryGrid);
};

const destroyGalleries = (root) => {
    if (root.matches?.('.rmslideshow')) {
        root.rmGalleryDestroy?.();
    }

    root.querySelectorAll?.('.rmslideshow').forEach((element) => element.rmGalleryDestroy?.());
};

const observeGalleries = () => {
    initGalleries();

    document.addEventListener('radicalmart:product-change', (event) => {
        const scope = event.target;
        const product = event.detail?.product;
        if (!scope?.querySelectorAll || !product) return;
        scope.querySelectorAll('[data-rm-product-gallery="true"]').forEach((gallery) => {
            if (gallery.closest('[data-rm-product-scope]') === scope) {
                updateProductGallery(gallery, product.media || []);
            }
        });
        scope.querySelectorAll('[data-rm-product-gallery-grid][data-sync-product-media="true"]').forEach((gallery) => {
            if (gallery.closest('[data-rm-product-scope]') === scope) {
                updateProductGalleryGrid(gallery, product.mediaAll || product.media || []);
            }
        });
    });

    new MutationObserver((records) => {
        records.forEach(({addedNodes, removedNodes}) => {
            addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    initGalleries(node);
                }
            });
            removedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    destroyGalleries(node);
                }
            });
        });
    }).observe(document.documentElement, {childList: true, subtree: true});
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeGalleries, {once: true});
} else {
    observeGalleries();
}
