// --------header------------------------------
const menuButton = document.querySelector(".menu__button");
const menuList = document.querySelector(".menu__list");

menuButton.addEventListener("click", function (e) {
  let expanded = menuButton.getAttribute("aria-expanded") === "true" || "false";
  menuButton.setAttribute("aria-expanded", !expanded);
  document.body.classList.toggle("_lock");
  menuButton.classList.toggle("menu__button--open");
  menuList.classList.toggle("menu__list--open");
});

//  Плавный скролл к секции. Пример: <a href="#" class="scroll" data-target=".slide-1">Slide</a>
$(".scroll").click(function (e) {
  e.preventDefault();
  var target = $(this).data("goto");

  $(".menu__button").click();

  $("html, body").animate(
    {
      scrollTop: $(target).offset().top - 30,
    },
    400
  );
});

//          Smooth Scroll FullScreen
if (".page__bullet:last-child") {
  let smooth = document.querySelector(".bulletScroll");
  smooth.addEventListener("click", () => {
    document.querySelector(".page__bullet:last-child").click();
  });
}

//--------/header------------------------------
