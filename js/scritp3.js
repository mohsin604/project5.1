
const wrapper3 = document.querySelector(".wrapper3");
const carousel3 = document.querySelector(".carousel3");
const firstcard3Width = carousel3.querySelector(".card3").offsetWidth;
const arrowBtns3 = document.querySelectorAll(".wrapper3 i");
const carousel3Childrens = [...carousel3.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let card3PerView = Math.round(carousel3.offsetWidth / firstcard3Width);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carousel3Childrens.slice(-card3PerView).reverse().forEach(card3 => {
    carousel3.insertAdjacentHTML("afterbegin", card3.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carousel3Childrens.slice(0, card3PerView).forEach(card3 => {
    carousel3.insertAdjacentHTML("beforeend", card3.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel3.classList.add("no-transition");
carousel3.scrollLeft = carousel3.offsetWidth;
carousel3.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns3.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel3.scrollLeft += btn.id == "left" ? -firstcard3Width : firstcard3Width;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel3.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel3.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel3.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel3.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel3.scrollLeft === 0) {
        carousel3.classList.add("no-transition");
        carousel3.scrollLeft = carousel3.scrollWidth - (2 * carousel3.offsetWidth);
        carousel3.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel3.scrollLeft) === carousel3.scrollWidth - carousel3.offsetWidth) {
        carousel3.classList.add("no-transition");
        carousel3.scrollLeft = carousel3.offsetWidth;
        carousel3.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper3.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel3.scrollLeft += firstCard3dWidth, 2500);
}
autoPlay();

carousel3.addEventListener("mousedown", dragStart);
carousel3.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel3.addEventListener("scroll", infiniteScroll);
wrapper3.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper3.addEventListener("mouseleave", autoPlay);

 
 