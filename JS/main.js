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
    const categoriesButton = qsa('.category-button');
    const categoriesContent = qsa('.container');

    const categoriesButtonArray = Array.from(categoriesButton);
    const categoriesContentArray = Array.from(categoriesContent);


    // for (let index = 0; index < categoriesContentArray.length; index++) {
    //    console.log(categoriesContentArray[index]);
        
    // }
    
    // Tabs button
    categoriesButtonArray.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            categoriesButtonArray.forEach((tab) => tab.classList.remove('active') )
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

