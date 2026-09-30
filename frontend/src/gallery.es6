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

const updateProductGallery = (container, media = []) => {
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

const initGalleries = (root = document) => {
    if (root.matches?.('.rmslideshow')) {
        new YTDynamicsGallery().init(root);
    }

    root.querySelectorAll?.('.rmslideshow').forEach((element) => {
        new YTDynamicsGallery().init(element);
    });
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
