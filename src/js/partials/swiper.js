//Настройки слайдера== ДОДЕЛАТЬ!!!!
let swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 32,
  grid: {
    rows: 2,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    dynamicBullets: true,
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    //   320: {
    //     slidesPerView: 1,
    //   },
    //   480: {
    //     slidesPerView: 2,
    //   },
    //   992: {
    //     slidesPerView: 3,
    //   },
  },
});
