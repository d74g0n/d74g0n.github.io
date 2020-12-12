const scanvas = document.getElementById('outputCanvas');
const sctx = scanvas.getContext('2d');
let global = {};

sctx.imageSmoothingEnabled = false;
scanvas.width = 320;
scanvas.height = 32;

const canvas = document.getElementById('char_edit');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
canvas.width = 32;
canvas.height = 32;

function loadSpriteSheet(path = 'SpriteStrip.png') {
    function setspritesheet() {
        sctx.drawImage(this, 0, 0, 320, 32);
        global.spirtesheet = this;
    }
    const image = new Image();
    image.onload = setspritesheet;
    image.src = path;
}
loadSpriteSheet(`SpriteStrip.png`);


function layerParts(i = 0) {
    //    ctx.translate(0.5, 0.5);
    ctx.imagineSmoothingEnabled = false;
    ctx.save();
    for (i = 0; i < 5; i++) {
        ctx.drawImage(scanvas, 32 * i, 0, 320, 32, 0, 0, 320, 32);
    }
    ctx.restore();
}

setTimeout(layerParts, 1500);
//layerParts(0);



function grayScale(context, canvas) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
        pixels[i] = grayscale; // red
        pixels[i + 1] = grayscale; // green
        pixels[i + 2] = grayscale; // blue
        //pixels[i+3]              is alpha
    }
    //redraw the image in black & white
    context.putImageData(imgData, 0, 0);
}

setTimeout(function () {
    grayScale(sctx, scanvas)
}, 1000);

function createBuffer(img=scanvas,tint='#FF0000') {

    let x = ctx;

    // create offscreen buffer, 
    buffer = document.createElement('canvas');
    buffer.width = fg.width;
    buffer.height = fg.height;
    bx = buffer.getContext('2d');


    // fill offscreen buffer with the tint color
//    bx.fillStyle = '#FF0000'
    bx.fillStyle = tint;
    bx.fillRect(0, 0, buffer.width, buffer.height);

    bx.globalCompositeOperation = "destination-atop";
    bx.drawImage(fg, 0, 0);
        // to tint the image, draw it first
        x.drawImage(fg,0,0);

        //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
        x.globalAlpha = 0.5;
        x.drawImage(buffer,0,0);
}


