import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';
import vars from '../_vars';
import { elementHeight } from '../functions/customFunctions';





// import { getHeaderHeight } from '../functions/header-height';

import {addCustomClass} from '../functions/customFunctions'

let mobileMenu = document.querySelector('.mobile-menu');
let burger = document.querySelector('.site-menu');
let burgerClose = document.querySelector('.mobile-menu__close');

const mobileMenuHandler = function( menu, button) {
    button.addEventListener('click', function(){
        elementHeight(vars.menu, "menu-height");
        menu.classList.toggle('active');
        button.classList.toggle('active');
        disableScroll();

    })
}

const hideMenuHandler = function(menu, button) {
    menu.classList.remove('active');
    button.classList.remove('active');
    enableScroll()
}

mobileMenuHandler(mobileMenu,burger);
burgerClose.addEventListener('click', function(e){
    hideMenuHandler(mobileMenu,burger);
});

document.querySelector('.fixed-button__close').addEventListener('click', function(){
    document.querySelector('.fixed-button').classList.add('hide')
})


