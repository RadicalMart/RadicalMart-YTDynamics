export const addThumbButtonsClickHandlers = (emblaApiMain, slidesThumbs) => {
    const scrollToIndex = slidesThumbs.map(
        (_, index) => (event) => {
            event.preventDefault();
            emblaApiMain.scrollTo(index);
        }
    );

    slidesThumbs.forEach((slideNode, index) => {
        slideNode.addEventListener('click', scrollToIndex[index], false);
    });

    return () => {
        slidesThumbs.forEach((slideNode, index) => {
            slideNode.removeEventListener('click', scrollToIndex[index], false);
        });
    };
};

export const addToggleThumbButtonsActive = (emblaApiMain, slidesThumbs, emblaApiThumb = null) => {
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

    emblaApiMain
        .on('select', toggleThumbBtnsState)
        .on('reInit', toggleThumbBtnsState);
    toggleThumbBtnsState();

    return () => {
        slidesThumbs.forEach((slide) => {
            slide.classList.remove('rmslideshow-thumbs__slide--selected');
            slide.classList.remove('uk-active');
            slide.removeAttribute('aria-current');
        });
    };
};

export const addPrevNextButtonsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = (event) => {
        event.preventDefault();
        emblaApi.scrollPrev();
    };
    const scrollNext = (event) => {
        event.preventDefault();
        emblaApi.scrollNext();
    };
    prevBtn.addEventListener('click', scrollPrev, false);
    nextBtn.addEventListener('click', scrollNext, false);

    const removeTogglePrevNextButtonsActive = addTogglePrevNextButtonsActive(
        emblaApi,
        prevBtn,
        nextBtn
    );

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

    emblaApi
        .on('select', togglePrevNextBtnsState)
        .on('init', togglePrevNextBtnsState)
        .on('reInit', togglePrevNextBtnsState);

    return () => {
        prevBtn.removeAttribute('disabled');
        nextBtn.removeAttribute('disabled');
    };
}
