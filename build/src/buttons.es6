export const addThumbButtonsClickHandlers = (emblaApiMain, emblaApiThumb) => {
    const slidesThumbs = emblaApiThumb.slideNodes()

    const scrollToIndex = slidesThumbs.map(
        (_, index) => () => emblaApiMain.scrollTo(index)
    )

    slidesThumbs.forEach((slideNode, index) => {
        slideNode.addEventListener('click', scrollToIndex[index], false)
    })

    return () => {
        slidesThumbs.forEach((slideNode, index) => {
            slideNode.removeEventListener('click', scrollToIndex[index], false)
        })
    }
}

export const addToggleThumbButtonsActive = (emblaApiMain, emblaApiThumb) => {
    const slidesThumbs = emblaApiThumb.slideNodes()

    const toggleThumbBtnsState = () => {
        emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
        const previous = emblaApiMain.previousScrollSnap()
        const selected = emblaApiMain.selectedScrollSnap()
        slidesThumbs[previous].classList.remove('rmslideshow-thumbs__slide--selected')
        slidesThumbs[selected].classList.add('rmslideshow-thumbs__slide--selected')
    }

    emblaApiMain.on('select', toggleThumbBtnsState)
    emblaApiThumb.on('init', toggleThumbBtnsState)

    return () => {
        const selected = emblaApiMain.selectedScrollSnap()
        slidesThumbs[selected].classList.remove('rmslideshow-thumbs__slide--selected')
    }
}

export const addPrevNextButtonsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => {
        emblaApi.scrollPrev()
    }
    const scrollNext = () => {
        emblaApi.scrollNext()
    }
    prevBtn.addEventListener('click', scrollPrev, false)
    nextBtn.addEventListener('click', scrollNext, false)

    const removeTogglePrevNextButtonsActive = addTogglePrevNextButtonsActive(
        emblaApi,
        prevBtn,
        nextBtn
    )

    return () => {
        removeTogglePrevNextButtonsActive()
        prevBtn.removeEventListener('click', scrollPrev, false)
        nextBtn.removeEventListener('click', scrollNext, false)
    }
}

function addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn) {
    let togglePrevNextBtnsState = () => {
        if (emblaApi.canScrollPrev()) {
            prevBtn.removeAttribute('disabled')
        } else {
            prevBtn.setAttribute('disabled', 'disabled')
        }

        if (emblaApi.canScrollNext()) {
            nextBtn.removeAttribute('disabled')
        } else {
            nextBtn.setAttribute('disabled', 'disabled')
        }
    }

    emblaApi
        .on('select', togglePrevNextBtnsState)
        .on('init', togglePrevNextBtnsState)
        .on('reInit', togglePrevNextBtnsState)

    return () => {
        prevBtn.removeAttribute('disabled')
        nextBtn.removeAttribute('disabled')
    }
}