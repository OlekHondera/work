const swiper = new Swiper(".results__slider", {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const mobSlider = new Swiper(".mobileSlider", {
  slidesPerView: 1,
  spaceBetween: 70,
  grid: {
    rows: 2,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
