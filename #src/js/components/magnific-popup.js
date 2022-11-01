//Доработать!!!!

$(function () {
  $(".about__video--link").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  $(".gallery__slider").slick();
});
