import vars from '../_vars';
import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import { removeClassInArray,addCustomClass, removeCustomClass } from "../functions/customFunctions";

const {overlay, activeClass, modalsButton , modals} = vars;

const commonFunction = function() {
    removeCustomClass(overlay, activeClass);
    removeClassInArray(modals, activeClass);
    enableScroll();
}

function buttonClickHandler(e,buttonAttribute, activeClass) {
    e.preventDefault();
    const currentModalId = e.target.getAttribute(`${buttonAttribute}`);
    const curentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);

    addCustomClass(overlay, activeClass);
    addCustomClass(curentModal, activeClass);
    disableScroll();
}

function overlayClickHandler(e, activeClass){
    const closeBtn = overlay.querySelector(`${'[data-popup]'}.${activeClass} .close`)
    closeBtn && closeBtn.addEventListener('click', commonFunction);
    if (e.target === overlay) commonFunction();
}

function modalInit(buttonsArray, buttonAttribute ,activeClass) {
    buttonsArray.map(function(btn){
        btn.addEventListener('click', (e) => buttonClickHandler(e, buttonAttribute, activeClass));
    })
}

overlay?.addEventListener('click', (e) => overlayClickHandler(e, activeClass));
modalInit(modalsButton, "data-btn-modal", activeClass);















// if (overlay) {
//   plunkModalBtns(propositionBtns,overlay,propositionModal);
//   plunkModalBtns(identBtns,overlay,identModal);

//   hideModalHandler(propositionModal);
//   hideModalHandler(identMobileModal);
//   hideModalHandler(identModal);

//   overlay.addEventListener('click', function(e){
//     if (e.target.classList.contains('overlay')) {
//       hideModal(overlay,propositionModal);
//       hideModal(overlay,identModal);
//     }
//   });
// }


