import './_button/header_button.js'

//Smooth Scroll
// $("#menu-item-29 a").on("click", function (e) {
//     e.preventDefault();
//     // var e = $(this).data("goto");
//     $(".menu__button").click();
//     $("html, body").animate({ scrollTop: $("#contacts").offset().top - 30 }, 400);
// });
//
// $("#menu-item-28 a").on("click", function (e) {
//     e.preventDefault();
//     // var e = $(this).data("goto");
//     $(".menu__button").click();
//     $("html, body").animate({ scrollTop: $("#form").offset().top - 30 }, 400);
// });
//
// $("form button").click(function () {
//     let t = $(this).closest("form"),
//         e = t.attr("action");
//
//     if (t.valid()) {
//         $.ajax({
//             url: e,
//             type: "post",
//             dataType: "html",
//             data: t.serialize(),
//             success: function (e) {
//                 t.find("input").val(""),
//                     t.find("textarea").val(""),
//                     $(".form-text").show(),
//                     setTimeout(function () {
//                         $(".form-text").hide();
//                     }, 5e3);
//             },
//             error: function () {
//                 t.find(".form-text").html("Заявка отправлена");
//             },
//         });
//     }
// });
