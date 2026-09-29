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
        const thumbAxis = container.dataset.thumbAxis === 'y' ? 'y' : 'x';
        const navMode = ['thumbnav', 'dotnav'].includes(container.dataset.nav)
            ? container.dataset.nav
            : '';
        const loop = container.dataset.loop !== 'false';
        const watchDrag = container.dataset.drag !== 'false';
        const duration = Math.max(10, Math.min(60, Number(container.dataset.duration) || 30));
        const autoplay = container.dataset.autoplay === 'true';
        const autoplayDelay = Math.max(3000, Math.min(20000, Number(container.dataset.autoplayDelay) || 7000));
        const autoplayPause = container.dataset.autoplayPause !== 'false';
        const mobileAxis = orientation === 'vertical'
            ? {'(max-width: 639px)': {axis: 'x'}}
            : {};
        const mobileThumbAxis = thumbAxis === 'y'
            ? {'(max-width: 639px)': {axis: 'x'}}
            : {};
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

        const plugins = autoplay ? [Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false,
            stopOnMouseEnter: autoplayPause,
            stopOnFocusIn: autoplayPause
        })] : [];
        const emblaMain = EmblaCarousel(viewportNodeMainCarousel, options, plugins);
        const cleanups = [];
        let emblaThumb = null;

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

        emblaMain.on('destroy', () => {
            cleanups.forEach((cleanup) => cleanup());
            emblaThumb?.destroy();
            delete container.dataset.rmGalleryReady;
        });
    }
}

const initGalleries = (root = document) => {
    if (root.matches?.('.rmslideshow')) {
        new YTDynamicsGallery().init(root);
    }

    root.querySelectorAll?.('.rmslideshow').forEach((element) => {
        new YTDynamicsGallery().init(element);
    });
};

const observeGalleries = () => {
    initGalleries();

    new MutationObserver((records) => {
        records.forEach(({addedNodes}) => {
            addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    initGalleries(node);
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
