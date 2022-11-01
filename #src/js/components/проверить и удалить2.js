const slider = new Swiper(".some-slider", {
  loop: true,
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});
// //Исчезающий текст
// const formBtn = document.querySelector(".send__button");
// const formText = document.querySelector(".form-text");
//
// formBtn.addEventListener("click", () => {
//   formText.classList.add("form-active");
// });
// function removeFormClass() {
//   formText.classList.remove("form-active");
// }
// setInterval(removeFormClass, 6000);
//Исчезающий текст
//Очистка формы после отправки
// document.addEventListener("submit", (e) => {
//   // Отключаем событие по умолчанию
//   e.prevent.Default();
//   // Очищаем поля формы
//   e.target.reset();
// });
//Очистка формы после отправки

// formBtn.addEventListener("click", formclick);
//добавление класса по клику и дальнейшее его удаление через 4 сек
// $(".addcart").addClass("active").delay(4000).queue(function(){
//   $(this).removeClass("active").dequeue();
// });
//          /Smooth Scroll FullScreen
//=================================================

//          /Smooth Scroll Mobile
// //========Custom Select================================================
// var x, i, j, l, ll, selElmnt, a, b, c;
// /* Look for any elements with the class "custom-select": */
// x = document.getElementsByClassName("custom-select");
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /* For each element, create a new DIV that will act as the selected item: */
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /* For each element, create a new DIV that will contain the option list: */
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /* For each option in the original select element,
//     create a new DIV that will act as an option item: */
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", function (e) {
//       /* When an item is clicked, update the original select box,
//       and the selected item: */
//       var y, i, k, s, h, sl, yl;
//       s = this.parentNode.parentNode.getElementsByTagName("select")[0];
//       sl = s.length;
//       h = this.parentNode.previousSibling;
//       for (i = 0; i < sl; i++) {
//         if (s.options[i].innerHTML == this.innerHTML) {
//           s.selectedIndex = i;
//           h.innerHTML = this.innerHTML;
//           y = this.parentNode.getElementsByClassName("same-as-selected");
//           yl = y.length;
//           for (k = 0; k < yl; k++) {
//             y[k].removeAttribute("class");
//           }
//           this.setAttribute("class", "same-as-selected");
//           break;
//         }
//       }
//       h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function (e) {
//     /* When the select box is clicked, close any other select boxes,
//     and open/close the current select box: */
//     e.stopPropagation();
//     closeAllSelect(this);
//     this.nextSibling.classList.toggle("select-hide");
//     this.classList.toggle("select-arrow-active");
//   });
// }
//
// function closeAllSelect(elmnt) {
//   /* A function that will close all select boxes in the document,
//   except the current select box: */
//   var x,
//     y,
//     i,
//     xl,
//     yl,
//     arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i);
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//     }
//   }
// }
//
// /* If the user clicks anywhere outside the select box,
// then close all select boxes: */
// document.addEventListener("click", closeAllSelect);
// //========/Custom Select================================================
// $("select").change(function () {
//   var option = $(this).find("option:selected");
//   window.location.href = option.data("url");
// });
// let ruLang = document.querySelector(".ru-lang");
// ruLang.addEventListener("click", () => {
//   document.location.href = "http://www.site.ru";
// });
// let cards = document.querySelectorAll(".card__service");
// let bttn = document.querySelector(".services__button");
// bttn.addEventListener("click", function () {
//   document.getElementById("myBtn").style.display = "none";
//   cards.forEach((item) => {
//     item.classList.remove("disnone");
//   });
// });
//

//=================================================
