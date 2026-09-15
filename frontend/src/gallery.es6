import EmblaCarousel from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Fade from 'embla-carousel-fade';
import {
    addThumbButtonsClickHandlers,
    addToggleThumbButtonsActive,
    addPrevNextButtonsClickHandlers
} from './buttons.es6';

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
            emblaMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS, [Fade()]),
            emblaThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS, [WheelGesturesPlugin()])

        let removeThumbBtnsClickHandlers = addThumbButtonsClickHandlers(emblaMain, emblaThumb),
            removeToggleThumbBtnsActive = addToggleThumbButtonsActive(emblaMain, emblaThumb),
            removeThumbPrevNextBtnsClickHandlers = addPrevNextButtonsClickHandlers(emblaThumb, prevThumbBtnNode, nextThumbBtnNode);

        emblaMain
            .on('destroy', removeThumbBtnsClickHandlers)
            .on('destroy', removeToggleThumbBtnsActive)
            .on('destroy', removeThumbPrevNextBtnsClickHandlers);

        emblaThumb
            .on('destroy', removeThumbBtnsClickHandlers)
            .on('destroy', removeToggleThumbBtnsActive)
            .on('destroy', removeThumbPrevNextBtnsClickHandlers);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let rmslideshows = document.querySelectorAll('.rmslideshow');

    for (let i = 0; i < rmslideshows.length; i++) {
        (new YTDynamicsGallery).init(rmslideshows[i]);
    }
});