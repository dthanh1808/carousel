const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const images = Array.from(document.querySelectorAll(".carousel img"));

let currentIndex = 0;
let autoInterval;
let isTransitioning = false;
let slideWidth = carousel.clientWidth;

// --- Clone slide đầu & cuối để smooth loop ---
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);
carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, images[0]);
const slides = Array.from(carousel.querySelectorAll("img"));
const totalSlides = slides.length;

// --- Cập nhật vị trí carousel ---
function updateCarousel(smooth = true) {
    carousel.scrollTo({
        left: currentIndex * slideWidth,
        behavior: smooth ? "smooth" : "auto"
    });
}

// --- Next slide ---
function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    updateCarousel();

    setTimeout(() => {
        // Khi tới clone cuối → reset về slide thật đầu
        if (currentIndex === totalSlides - 1) {
            currentIndex = 1; // slide thật đầu
            updateCarousel(false); // tắt smooth để không nhảy lộ
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
        // Khi tới clone đầu → reset về slide thật cuối
        if (currentIndex === 0) {
            currentIndex = totalSlides - 2; // slide thật cuối
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
    currentIndex = 1; // bắt đầu từ slide thật đầu
    updateCarousel(false);
    autoPlay();
});

