//======================================================================

var wideVideo =
  '<video playsinline autoplay muted loop><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/desktop/doberFHD.mp4" type="video/mp4" /><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/desktop/dober2k.webm" type="video/webm"/></video>';
var wideVideoMobile =
  '<video playsinline autoplay muted loop><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/desktop/dober720p.mp4" type="video/mp4" /><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/desktop/dober720p.webm" type="video/webm" /></video>';
var narrowVideo =
  '<video playsinline autoplay muted loop><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/mobile/dober480.mp4" type="video/mp4" /><source src="https://dober.agency/wp-content/themes/dober-agency/assets/video/mobile/dober720.webm" type="video/webm" /></video>';
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 450) {
    document.querySelector(".mainVideo").innerHTML = wideVideo;
  } else {
    document.querySelector(".mainVideo").innerHTML = narrowVideo;
  }
});

if (window.innerWidth < 900) {
  function doOnOrientationChange() {
    switch (window.orientation) {
      case -90:
      case 90:
        document.querySelector(".mainVideo").innerHTML = wideVideoMobile;
        break;
      default:
        document.querySelector(".mainVideo").innerHTML = narrowVideo;
        break;
    }
  }
  window.addEventListener("orientationchange", doOnOrientationChange);
}

// Initial execution if needed
doOnOrientationChange();

const menuButton = document.querySelector(".menu__button"),
  menuList = document.querySelector(".menu__list");
menuButton.addEventListener("click", function (t) {
  let e = "true" === menuButton.getAttribute("aria-expanded") || "false";
  menuButton.setAttribute("aria-expanded", !e),
    menuButton.classList.toggle("menu__button--open"),
    menuList.classList.toggle("menu__list--open");
});

$("#menu-item-29 a").on("click", function (e) {
  e.preventDefault();
  $(".menu__button").click();
  $("html, body").animate({ scrollTop: $("#contacts").offset().top - 30 }, 400);
});

$("#menu-item-28 a").on("click", function (e) {
  e.preventDefault();
  $(".menu__button").click();
  $("html, body").animate({ scrollTop: $("#form").offset().top - 120 }, 400);
});

$("form button").click(function () {
  let t = $(this).closest("form"),
    e = t.attr("action");

  if (t.valid()) {
    $.ajax({
      url: e,
      type: "post",
      dataType: "html",
      data: t.serialize(),
      success: function (e) {
        t.find("input").val(""),
          t.find("textarea").val(""),
          $(".form-text").show(),
          setTimeout(function () {
            $(".form-text").hide();
          }, 5e3);
      },
      error: function () {
        t.find(".form-text").html("Заявка отправлена");
      },
    });
  }
});

$("form button").click(function () {
  if ($(".send__input").hasClass("error")) {
    $(".send__input").addClass("send__input-error");
  } else {
    $(".send__input").removeClass("send__input-error");
  }
});
