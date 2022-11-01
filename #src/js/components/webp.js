//Support Webp
let isSupportWebp =
  !![].map &&
  document
    .createElement("canvas")
    .toDataURL("image/webp")
    .indexOf("data:image/webp") === 0;
if (isSupportWebp) {
  document.documentElement.classList.add("webp");
}
