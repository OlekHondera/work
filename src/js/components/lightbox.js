import _vars from '../_vars';
import '../vendor/lightbox';
import '../vendor/lg-video';

_vars.video.map((item)=> {
    lightGallery(item, {
        controls: 0,
        showinfo: 0,
        rel: 0
    });
});
