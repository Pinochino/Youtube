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



// Category button
window.addEventListener('DOMContentLoaded', buttonCategories);

function buttonCategories() {
    const categoriesButton = qsa('.categories .category-button');
    const categoriesContent = qsa('.container');

    const categoriesButtonArray = Array.from(categoriesButton);
    const categoriesContentArray = Array.from(categoriesContent);

    // Tabs button

   categoriesButton.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        categoriesButton.forEach(tab => tab.classList.remove('active'))
        tab.classList.add('active');
        categoriesContent.forEach(content => {content.classList.remove('active')})
        categoriesContent[index].classList.add('active')
    })
   })


    // Responsive
    if (window.innerWidth <= 600) {
        const categoriesSubset = categoriesButtonArray.slice(categoriesButtonArray.length - 5, categoriesButtonArray.length);
        categoriesSubset.forEach(data => {
            
            data.style.display='none'
        });
    } else if (window.innerWidth >= 600 &&window.innerWidth <= 912) {
        const lastItem = categoriesButtonArray[categoriesButtonArray.length - 1];
        lastItem.innerHTML = `<i class='bx bx-chevron-right' style="font-size: 25px; width: 25px; height: 25px; color: black"></i>`;
    } else if (window.innerWidth >= 913 ){
        const categoriesSubset = categoriesButtonArray.slice(categoriesButtonArray.length -2, categoriesButtonArray.length);
        categoriesSubset.forEach(data => {
            
            data.style.display='none'
        });
    }
}

window.addEventListener('DOMContentLoaded', Carousel);

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

window.addEventListener('DOMContentLoaded', toggleSidebar);

function toggleSidebar () {

    const sidebar = qs('.sidebar')
    const toggleBtn = qs('#toggle-btn')
    const contentBody = qs('.body-content')
    const main = qs('.content')
    const content = qsa('.container')
    const navside = qs('#nav-side')
    const header = qs('#header')
    const closeBtn = qs('#close-btn');
   
    const icon = `<li class="list-item active">
                        <a href="">
                           <yt-icon id="icon" class="guide-icon style-scope ytd-mini-guide-entry-renderer"><!--css-build:shady--><!--css-build:shady--><span class="yt-icon-shape yt-spec-icon-shape"><div style="width: 100%; height: 100%; display: block; fill: currentcolor;" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path></svg></div></span></yt-icon>
                            <span class="link-name" style="--i:1">Bạn</span>
                        </a>
                    </li>`

    const listItem = qsa('.list-item');
    const listItemArray = Array.from(listItem);
        listItemArray.forEach((item, index) => {
            if (index >= 4) {
                item.style.display = 'none';
            } else if(index === 3 && !sidebar.classList.remove('active')){
                item.innerHTML = icon;
            }
        });



    window.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.add('active');
    }
});
    
    toggleBtn.addEventListener('click', () => { 

        if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
            navside.classList.add('positive')
            // main.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            closeBtn.addEventListener('click', () => {
                navside.classList.remove('positive')
            })
        } else {
            sidebar.classList.toggle('active')

            if (sidebar.classList.contains('active')) {
                listItemArray.forEach(item => item.style.display = 'block');
            } else {
                listItemArray.forEach((item, index) => {
                    if (index >= 4) {
                        item.style.display = 'none';
                    }
                });
            
            }
           
            contentBody.classList.toggle('active');
           Array.from(content).map((data) => {
            data.classList.toggle('positive');
           })
            header.classList.toggle('active');
        }
    })
}

// Fetch API from Yotube
window.addEventListener('DOMContentLoaded', getVideoYoutube)
// async function getVideoYoutube() {
//     const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUAuUUnT6oDeKwE6v1NGQxug&key=AIzaSyAcLZkCSU8jXCoGGxPxWv4htPq2yZ3o-ns`;
//     const data = await fetch(url);

//     if (!data.ok) {
//         return `The status ${data.status}`;
//     }

//     return data.json();
// }

function getVideoYoutube() {

    const heading = qsa('.video-heading');
    const itemImages = qsa('.item-image');

    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=84&playlistId=UUAuUUnT6oDeKwE6v1NGQxug&key=AIzaSyAcLZkCSU8jXCoGGxPxWv4htPq2yZ3o-ns`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.items.forEach((el, index) => {
            if (heading[index] && itemImages[index]) {
                itemImages[index].src = el.snippet.thumbnails.maxres.url;
                heading[index].innerHTML = el.snippet.title;
            }
        });
    })
    .catch(error => {
        console.log(error);
    })
}


window.addEventListener('DOMContentLoaded', getCommentYoutube)
async function getCommentYoutube() {
    const API_KEY = `AIzaSyAcLZkCSU8jXCoGGxPxWv4htPq2yZ3o-ns`;
    const CHANEL_ID =  `dQw4w9WgXcQ`;
    const commentText = qsa('.comment-text');

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${CHANEL_ID}&maxResults=20`
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            data.items.forEach((el, index) => {
                if (commentText[index]) {
                    commentText[index].innerHTML = el.snippet.topLevelComment.snippet.textDisplay;
                }
            })
        }
       
    } catch (error) {
        console.error(`Error is: ${error}`)
    }
}
