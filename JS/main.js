'user strict';
window.addEventListener('load', toggleButtonLogo);
window.addEventListener('resize', toggleButtonLogo);


function toggleButtonLogo() {
    const logo = document.querySelector('.user');
    if(window.innerWidth <= 600){
         logo.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    } else {
        logo.innerHTML = 'LOGO';
    }

}