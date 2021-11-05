const ID_SELECTORS = {
    carousel: 'carousel',
    navToggle: 'nav-toggle',
    headerNav: 'header-nav',
    header: 'header',
};

const CLASSNAMES = {
    navOpen: 'nav-open',
    indicators: 'indicators',
    slide: 'slide',
    activeSlide: 'active',
};

// DOM elements
const headerEl = document.getElementById(ID_SELECTORS.header);
const navigationEl = document.getElementById(ID_SELECTORS.headerNav);
const navToggleEl = document.getElementById(ID_SELECTORS.navToggle);
const navItemsEls = document.querySelectorAll(`#${ID_SELECTORS.headerNav} li a`);
const carouselEl = document.getElementById(ID_SELECTORS.carousel);
const headerHeight = headerEl.offsetHeight;

// Navigation
if (navigationEl) {
    const handleToggleNav = () => {
        navigationEl.classList.toggle(CLASSNAMES.navOpen);
        navToggleEl.classList.toggle(CLASSNAMES.navOpen);
    };

    const handleNavItemClick = (ev) => {
        ev.preventDefault();
        const sectionID = ev.currentTarget.getAttribute('data-section-id');
        const sectionEl = document.getElementById(sectionID);
        const sectionOffset = sectionEl.offsetTop;

        window.scrollTo({
            top: sectionOffset - headerHeight,
            behavior: 'smooth'
        });

        handleToggleNav();
    };

    navToggleEl.onclick = handleToggleNav;
    navItemsEls.forEach((navItem) => {
        navItem.onclick = handleNavItemClick;
    });
}

// Carousel
if (carouselEl) {
    const slidesEls = carouselEl.querySelectorAll(`.${CLASSNAMES.slide}`);
    const numberOfSlides = slidesEls.length;
    const indicatorsContainerEl = carouselEl.getElementsByClassName(CLASSNAMES.indicators)[0];

    const setSlide = (slideIndex) => {
        const indicatorEls = indicatorsContainerEl.querySelectorAll('li');

        slidesEls.forEach((slide, currentSlideIndex) => {
            const isActiveSlide = slideIndex === currentSlideIndex;
            slide.style.opacity = isActiveSlide ? 1 : 0;
            slide.style.visibility = isActiveSlide ? 'visible' : 'hidden';
        });

        indicatorEls.forEach((indicatorEl, currentSlideIndex) => {
            const isActiveSlide = slideIndex === currentSlideIndex;
            if (isActiveSlide) {
                indicatorEl.classList.add(CLASSNAMES.activeSlide);
            } else {
                indicatorEl.classList.remove(CLASSNAMES.activeSlide);
            }
        });
    }

    for (let index = 0; index < numberOfSlides; index++) {
        const indicator = document.createElement('li');
        indicator.onclick = () => setSlide(index);
        indicatorsContainerEl.appendChild(indicator);
    }

    setSlide(0);
}
