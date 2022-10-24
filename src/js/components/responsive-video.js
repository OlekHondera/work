const mainVideo = window.innerWidth;

if (mainVideo <= 768) {
  $(".mainVideo").html(
    '<video class="background-video" autoplay muted loop><source src="../video/dober6401.webm" type="video/webm" /><source src="../video/D22.mp4" type="video/mp4" /></video>'
  );
}
const prVideo = window.innerWidth;

if (prVideo <= 768) {
  $(".mainVideo").html(
    '<video class="background-video" autoplay muted loop><source src="../video/dober6401.webm" type="video/webm" /><source src="../video/D22.mp4" type="video/mp4" /></video>'
  );
}
