const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth - 1 ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const firstImgWidth = firstImg.clientWidth + 14;

        carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(showHideIcons, 600);
    });
});

const autoSlide = () => {
    if (!isDragStart) return;
    isDragStart = false;
    if (!isDragging) return;

    const firstImgWidth = firstImg.clientWidth + 14;
    const movedBy = prevScrollLeft - carousel.scrollLeft;
    if (Math.abs(movedBy) < firstImgWidth / 3) {
        carousel.scrollLeft = prevScrollLeft;
    } else {
        const targetScroll = movedBy > 0
            ? Math.floor(carousel.scrollLeft / firstImgWidth) * firstImgWidth
            : Math.ceil(carousel.scrollLeft / firstImgWidth) * firstImgWidth;

        carousel.scrollLeft = targetScroll;
    }
    setTimeout(showHideIcons, 60);
}

const dragStart = (e) => {
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    isDragStart = true;
    carousel.classList.add("dragging"); 
    isDragging = false; 
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    const currentPageX = e.pageX || e.touches[0].pageX;

    positionDiff = currentPageX - prevPageX;

    carousel.scrollLeft = prevScrollLeft - positionDiff;

    showHideIcons();
}

const dragStop = () => {
    if (!isDragStart) return;

    if (isDragging) {
        autoSlide(); 
    } else {
        carousel.classList.remove("dragging");
        isDragStart = false; 
    }

    carousel.classList.remove("dragging"); 
    isDragging = false;
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
document.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop); 
carousel.addEventListener("mouseleave", () => {
    if (isDragStart) dragStop();
});
document.addEventListener("touchend", dragStop);

window.addEventListener('load', showHideIcons);

window.addEventListener('resize', showHideIcons);




