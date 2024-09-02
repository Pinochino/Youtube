'user strict';
function id(id) {
    return document.getElementById(id);
}
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}

window.addEventListener('load', toggleButtonLogo);
window.addEventListener('resize', toggleButtonLogo);


function toggleButtonLogo() {
    const logo = qs('.user');
    if (window.innerWidth <= 600) {
        logo.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    } else {
        logo.innerHTML = 'LOGO';
    }
}


window.addEventListener('load', buttonCategories);

function buttonCategories() {
    const categoriesButton = qsa('.categories .category-button');
    const categoriesContent = qsa('.container');

    const categoriesButtonArray = Array.from(categoriesButton);
    const categoriesContentArray = Array.from(categoriesContent);

    // Tabs button
    categoriesButtonArray.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            categoriesButtonArray.forEach((tab) => tab.classList.remove('active'))
            tab.classList.add('active')

            categoriesContentArray.forEach(data => data.classList.remove('active'))
            categoriesContentArray[index].classList.add('active')
        })
    })


    // Responsive
    if (window.innerWidth <= 600) {
        const categoriesSubset = categoriesButtonArray.slice(categoriesButtonArray.length - 5, categoriesButtonArray.length);
        categoriesSubset.forEach(data => {
            data.innerHTML = `<i class='bx bx-chevron-right' style="font-size: 25px; width: 25px; height: 25px; color: black"></i>`;
        });
    } else if (window.innerWidth = 912) {
        const lastItem = categoriesButtonArray[categoriesButtonArray.length - 1];
        lastItem.innerHTML = `<i class='bx bx-chevron-right' style="font-size: 25px; width: 25px; height: 25px; color: black"></i>`;
    }
}

window.addEventListener('load', Carousel);

function Carousel() {
    const carousel = document.querySelector('.carousel');
    const firstImg = document.querySelectorAll('.card')[0];
    const arrowIcons = document.querySelectorAll('.carousel i');
    
    let isDragStart = false, prevPageX, prevScrollLeft;
    
    const showHideIcon = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
        arrowIcons[0].style.display = carousel.scrollLeft === 0 ? 'none' : 'block';
        arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? 'none' : 'block';
    };
    
    arrowIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            let firstImgWidth = firstImg.clientWidth + 14; // getting first image width & adding 14 margin value
            // if clicked icon is left, reduce with value from the carousel scroll left else add to it
            carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcon(), 60);
        });
    });

    const dragStart = (e) => {
        // updating global variables value on mouse down event
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        // scrolling images/carousel to left according to mouse pointer
        if (!isDragStart) return;
        e.preventDefault();
        carousel.classList.add('dragging');
        let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcon();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove('dragging');
    };

    carousel.addEventListener('mousedown', dragStart);
    // carousel.addEventListener('touchstart', dragStart);

    carousel.addEventListener('mousemove', dragging);
    // carousel.addEventListener('touchmove', dragging);

    carousel.addEventListener('mouseup', dragStop);
    carousel.addEventListener('mouseleave', dragStop);
    carousel.addEventListener('touchend', dragStop);
}


