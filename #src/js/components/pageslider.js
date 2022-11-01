//======================================================================

//Срабатывает при определённом размере окна
document.addEventListener("DOMContentLoaded", () => {
  //   Добавление класса при определённом разрешении
  if ($(window).width() > 767) {
    $("main").addClass("page");
  } else {
    $("main").removeClass("page");
  }
  // this is used whenever the window is resized
  $(window).resize(function () {
    if ($(window).width() > 767) {
      $("main").addClass("page");
    } else {
      $("main").removeClass("page");
    }
  });
  const width = window.innerWidth;
  if (width > 767) {
    const slider = new Swiper(".page", {
      wrapperClass: "page__wrapper",
      slideClass: "page__screen",
      direction: "vertical",
      slidesPerView: "auto",
      keyboard: {
        enable: true,
        onlyInViewport: true,
        pageUpDown: true,
      },
      mousewheel: {
        sensitivity: 1,
      },
      watchOverflow: true,
      speed: 800,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      pagination: {
        el: ".page__pagination",
        type: "bullets",
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet-active",
      },
      scrollbar: {
        el: ".page__scroll",
        dragClass: "page__drag-scroll",
        draggable: true,
      },
    });
  }
});
