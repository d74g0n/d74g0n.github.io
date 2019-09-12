const _verbose = true;



const canvas = document.querySelector('canvas');
// commonly known as ctx.
const ctx = (function initCanvas() {
    canvas.width = CanvasDefault.cdx();
    canvas.height = CanvasDefault.cdy();
    canvas.style.border = '2px solid green';
    if (_verbose) {
        console.log('[LOAD][canvas.js]|[Dimensions:(W:' + canvas.width + ' H:' + canvas.height + ')]');
    }
    return canvas.getContext('2d');
})();
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ CANVAS SECTION ]