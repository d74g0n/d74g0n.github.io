let Engine = {
    load: {
        Image: function (path) {
            let image = new Image();
            image.src = path;
            return image;
        },
    },
    create: {
        buffer: function (id, w, h) {

            let buffer =

                return buffer;
        },
        tintImage: function (img, tint = random_hexColor()) {
            // fill offscreen buffer with the tint color
            bx.fillStyle = tint;
            bx.clearRect(0, 0, buffer.width, buffer.height);
            bx.fillRect(0, 0, buffer.width, buffer.height);
            // destination atop makes a result with an alpha channel 
            // identical to fg, but with all pixels retaining their original color *as far as I can tell*
            bx.globalCompositeOperation = "destination-atop";
            bx.drawImage(this.image, 0, 0);
            //then set the global alpha to the amound that you want to tint it, and draw the buffer 
            //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
            return buffer;
        },
    }

}

console.log(`[book engine]`);

//
//const buffer = document.createElement('canvas');
//const bx = buffer.getContext('2d');
//
//function initBuffer(img = smokeImage) {
//    let fg = img;
//    buffer.width = fg.width;
//    buffer.height = fg.height;
//}


//tintImage(img, tint = random_hexColor()) {
//    // fill offscreen buffer with the tint color
//    bx.fillStyle = tint;
//    bx.clearRect(0, 0, buffer.width, buffer.height);
//    bx.fillRect(0, 0, buffer.width, buffer.height);
//    // destination atop makes a result with an alpha channel 
//    // identical to fg, but with all pixels retaining their original color *as far as I can tell*
//    bx.globalCompositeOperation = "destination-atop";
//    bx.drawImage(this.image, 0, 0);
//    //then set the global alpha to the amound that you want to tint it, and draw the buffer 
//    //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
//    return buffer;
//}
