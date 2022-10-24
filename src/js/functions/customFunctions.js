export const removeCustomClass = (item, customClass) => {
    item.classList.remove(customClass);
}
// ----------------------------------------------------
export const addCustomClass = (item, customClass) => {
    item.classList.add(customClass);
}
// ----------------------------------------------------
export const removeClassInArray = (arr, customClass) => {
    arr.map((item) => {
        item.classList.remove(customClass);
    });
}
// ----------------------------------------------------
export const addClassInArray = (arr, customClass) => {
    arr.map((item) => {
        item.classList.add(customClass);
    });
}
// ----------------------------------------------------
export const toggleClassInArray = (arr, customClass) => {
    arr.map((item) => {
        item.classList.toggle(customClass);
    });
}
//-----------------------------------------------------
export const elementHeight = (el, variableName) => {
    // el -- сам елемент (но не коллекция)
    // variableName -- строка, имя создаваемой переменной
    if(el) {
        function initListener(){
            const elementHeight = el.offsetHeight;
            document.querySelector(':root').style.setProperty(`--${variableName}`, `${elementHeight}px`);
        }
        window.addEventListener('DOMContentLoaded', initListener)
        window.addEventListener('resize', initListener)
    }
}