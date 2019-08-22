// -=- UNIVERSAL::

// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}



// -=-=- EXPERIMENTAL::
function FX_Chopshop(image, scale = 10) {
    //so spritesheet like scale block size chop

    for (i = 0; i < canvas.height; i+=scale) {
        for (i = 0; i < canvas.width; i+=scale) {

        }
    }
}




function FX_bufferChop(canvas = canvas) {


    var primaryCtx = canvas.getContext("2d");

    var secondaryCanvas = document.createElement("canvas"),
        secondaryCtx = secondaryCanvas.getContext("2d");

    function drawFrame() {
        requestAnimationFrame(drawFrame);
        secondaryCtx.fillStyle = "#f00";
        secondaryCtx.fillRect(10, 10, 20, 20);
        primaryCtx.drawImage(secondaryCanvas);
    }


}


(function drawFrame() {
    requestAnimationFrame(drawFrame);
    primaryCtx.save(); //Freeze redraw
    primaryCtx.fillStyle = "#f00";
    primaryCtx.fillRect(10, 10, 20, 20);
    primaryCtx.restore(); //And now do the redraw
})();
