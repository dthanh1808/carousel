
let currentIndex = 0;
let autoInterval;
let isTransitioning = false;
let slideWidth = carousel.clientWidth;

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const images = Array.from(document.querySelectorAll(".carousel img"));



// --- Clone slide đầu & cuối để smooth loop ---
const firstClone = images[0].cloneNode(true); 
const lastClone = images[images.length - 1].cloneNode(true); 
carousel.appendChild(firstClone); 
carousel.insertBefore(lastClone, images[0]); 
const slides = Array.from(carousel.querySelectorAll("img"));
const totalSlides = slides.length;

// --- Cập nhật vị trí carousel ---
function updateCarousel(smooth = true) {
    // scroll đến slide hiện tại, có thể bật tắt smooth
    carousel.scrollTo({
        left: currentIndex * slideWidth,
        behavior: smooth ? "smooth" : "auto"
    });
}

// --- Next slide ---
function nextSlide() {
    if (isTransitioning) return; // nếu đang chuyển thì không làm gì
    isTransitioning = true;

    currentIndex++; // tăng index
    updateCarousel(); // cập nhật vị trí

    setTimeout(() => {
        // nếu tới clone cuối → reset về slide thật đầu
        if (currentIndex === totalSlides - 1) {
            currentIndex = 1; 
            updateCarousel(false); 
        }
        isTransitioning = false; 
    }, 500);
}

// --- Previous slide ---
function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex--; 
    updateCarousel(); 

    setTimeout(() => {
       
        if (currentIndex === 0) {
            currentIndex = totalSlides - 2; 
            updateCarousel(false); 
        }
        isTransitioning = false;
    }, 500);
}

// --- Autoplay ---
function autoPlay() {
    autoInterval = setInterval(nextSlide, 3000); 
}

// --- Event listeners ---
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(autoInterval);
        if (btn.id === "left") {
            prevSlide(); 
        } else {
            nextSlide();
        }
        autoPlay(); 
    });
});

// --- Resize window ---
window.addEventListener("resize", () => {
    slideWidth = carousel.clientWidth;
    updateCarousel(false); 
});

// --- Khởi tạo ---
window.addEventListener("load", () => {
    slideWidth = carousel.clientWidth;
    currentIndex = 1; 
    updateCarousel(false); 
    autoPlay(); 
});
