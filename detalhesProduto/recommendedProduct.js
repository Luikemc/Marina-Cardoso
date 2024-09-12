export function initializeSwiper() {
    $(document).ready(function() {
        var swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            slidesPerView: "auto",
            loop: !0,
            autoplay: { delay: 4e3 },
            speed: 800,
            centeredSlides: false,
            slidesPerView: "auto",
            breakpoints: {
                768: {
                    slidesPerView: 5,
                },
                576: {
                    slidesPerView: 0,
                }
            },
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 3,
                slideShadows: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    });
}