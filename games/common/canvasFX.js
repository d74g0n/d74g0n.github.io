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

