const wrapper60 = document.querySelector(".wrapper60");
const carousel60 = document.querySelector(".carousel60");
const firstcard60Width = carousel60.querySelector(".card60").offsetWidth;
const arrowBtns59 = document.querySelectorAll(".wrapper60 i");
const carousel60Childrens = [...carousel60.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of card60s that can fit in the carousel60 at once
let card60PerView = Math.round(carousel60.offsetWidth / firstcard60Width);

// Insert copies of the last few card60s to beginning of carousel60 for infinite scrolling
carousel60Childrens.slice(-card60PerView).reverse().forEach(card60 => {
    carousel60.insertAdjacentHTML("afterbegin", card60.outerHTML);
});

// Insert copies of the first few card60s to end of carousel60 for infinite scrolling
carousel60Childrens.slice(0, card60PerView).forEach(card60 => {
    carousel60.insertAdjacentHTML("beforeend", card60.outerHTML);
});

// Scroll the carousel60 at appropriate postition to hide first few duplicate card60s on Firefox
carousel60.classList.add("no-transition");
carousel60.scrollLeft = carousel60.offsetWidth;
carousel60.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel60 left and right
arrowBtns59.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel60.scrollLeft += btn.id == "left" ? -firstcard60Width : firstcard60Width;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel60.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel60
    startX = e.pageX;
    startScrollLeft = carousel60.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel60 based on the cursor movement
    carousel60.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel60.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel60 is at the beginning, scroll to the end
    if(carousel60.scrollLeft === 0) {
        carousel60.classList.add("no-transition");
        carousel60.scrollLeft = carousel60.scrollWidth - (2 * carousel60.offsetWidth);
        carousel60.classList.remove("no-transition");
    }
    // If the carousel60 is at the end, scroll to the beginning
    else if(Math.ceil(carousel60.scrollLeft) === carousel60.scrollWidth - carousel60.offsetWidth) {
        carousel60.classList.add("no-transition");
        carousel60.scrollLeft = carousel60.offsetWidth;
        carousel60.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel60
    clearTimeout(timeoutId);
    if(!wrapper60.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel60 after every 2500 ms
    timeoutId = setTimeout(() => carousel60.scrollLeft += firstcard60Width, 2500);
}
autoPlay();

carousel60.addEventListener("mousedown", dragStart);
carousel60.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel60.addEventListener("scroll", infiniteScroll);
wrapper60.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper60.addEventListener("mouseleave", autoPlay);




 
