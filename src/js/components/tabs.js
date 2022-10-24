import { removeClassInArray,addCustomClass } from "../functions/customFunctions";

const tabParents = [...document.querySelectorAll('[data-tabs-parrent]')];
tabParents.map((tabParent) => {
    if(tabParent) {
        const tabNav = [...tabParent.querySelectorAll("[data-tab]")];
        const tabContent = [...tabParent.querySelectorAll("[data-tab-content]")];

        tabNav.map((nav) => {
            nav.addEventListener('click', (e) => {
                e.preventDefault();
                const activeTabAttr = e.target.getAttribute("data-tab");
                removeClassInArray(tabNav, 'active');
                removeClassInArray(tabContent, 'active');
                addCustomClass(tabParent.querySelector(`[data-tab="${activeTabAttr}"]`),'active');
                addCustomClass(tabParent.querySelector(`[data-tab-content="${activeTabAttr}"]`), 'active');
            });
        });
    }
});