const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
// Lấy tất cả ảnh để đếm số lượng slide
const images = document.querySelectorAll(".carousel img");

let currentSlideIndex = 0;
let autoInterval; // Chỉ còn biến cho interval

// Số lượng slide thực tế trong HTML
const totalSlides = images.length;
// Chiều rộng một slide, bằng chiều rộng của carousel
let slideWidth = 0; 


// Cập nhật vị trí ảnh bằng cách cuộn ngang (scrollLeft)
function updateCarousel() {
    // Đảm bảo slideWidth được cập nhật trước khi cuộn
    slideWidth = carousel.clientWidth;
    // Cuộn carousel đến vị trí của slide hiện tại
    carousel.scrollLeft = currentSlideIndex * slideWidth;
    // Giữ cho cả hai mũi tên luôn hiển thị trong chế độ Looping
    arrowBtns[0].style.display = "block";
    arrowBtns[1].style.display = "block";
}

// Chuyển slide tiếp theo (Next)
function nextSlide() { // Bỏ tham số check
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
    } else {
        // Logic chuyển từ ảnh cuối về ảnh đầu (Looping)
        currentSlideIndex = 0;
    }
    updateCarousel();
}

// Quay lại slide trước (Previous)
function prevSlide() { // Bỏ tham số check
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
    } else {
        // Logic chuyển từ ảnh đầu về ảnh cuối (Looping)
        currentSlideIndex = totalSlides - 1;
    }
    updateCarousel();
}

// --- Autoplay Logic (Chạy liên tục) ---

// Bắt đầu tự động chạy
function autoPlay() {
    // Thiết lập interval để gọi nextSlide mỗi 3000ms.
    autoInterval = setInterval(nextSlide, 3000);
}


// --- Event Listeners ---

// Sự kiện cho nút điều hướng
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // 1. Dừng interval cũ
        clearInterval(autoInterval); 
        
        // 2. Thực hiện chuyển slide
        if (btn.id === "left") {
            prevSlide();
        } else {
            nextSlide();
        }
        
        // 3. Khởi động lại interval (đảm bảo bộ đếm được reset)
        autoPlay(); 
    });
});

// Cập nhật lại slideWidth và vị trí khi cửa sổ được thay đổi kích thước
window.addEventListener("resize", () => {
    slideWidth = carousel.clientWidth;
    updateCarousel(); // Giữ slide hiện tại trong tầm nhìn
});



// Khởi tạo vị trí carousel và bắt đầu autoplay khi trang tải xong
window.addEventListener('load', () => {
    // Tính toán slideWidth ban đầu
    slideWidth = carousel.clientWidth; 
    updateCarousel(); 
    autoPlay();
});