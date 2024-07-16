import EmblaCarousel from 'embla-carousel'
import {
    addThumbBtnsClickHandlers,
    addToggleThumbBtnsActive
} from './buttons.es6'

class YTDynamicsGallery {
    init() {
        const OPTIONS = {

        }
        const OPTIONS_THUMBS = {
            align: 'center',
            axis: 'y',
            dragFree: true,
            loop: true
        }

        const viewportNodeMainCarousel = document.querySelector('.rmslideshow__viewport')
        const viewportNodeThumbCarousel = document.querySelector('.rmslideshow-thumbs__viewport')
        const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS)
        const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS)

        const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(
            emblaApiMain,
            emblaApiThumb
        )
        const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(
            emblaApiMain,
            emblaApiThumb
        )

        emblaApiMain
            .on('destroy', removeThumbBtnsClickHandlers)
            .on('destroy', removeToggleThumbBtnsActive)

        emblaApiThumb
            .on('destroy', removeThumbBtnsClickHandlers)
            .on('destroy', removeToggleThumbBtnsActive)
    }
}


document.addEventListener('DOMContentLoaded', function () {
    (new YTDynamicsGallery).init();
});