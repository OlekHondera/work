// // --------header------------------------------
// (() => {
//     const menuButton = document.querySelector(".menu__button");
//     const menuList = document.querySelector(".menu__list");
//
//     menuButton.addEventListener("click", () => {
//         let expanded =
//             menuButton.getAttribute("aria-expanded") === "true" || "false";
//         menuButton.setAttribute("aria-expanded", !expanded);
//         menuButton.classList.toggle("menu__button--open");
//         menuList.classList.toggle("menu__list--open");
//     });
// })();
// //--------/header------------------------------
// import {getName} from "./modules/second.js";
// import {bindModal} from "./partials/modals.js";
// getName();bindModal();
import './_vendor';
// import './_functions';
import './_components';
import './components/accordion.js'