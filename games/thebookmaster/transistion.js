let sunBG = {
    buffer: undefined,
    btx: undefined,
    frame: 1,
    modoloA: 30,
    x: canvas.width / 2,
    y: canvas.height / 2,
    //    img: loadImage('/games/bookInBasement/img/sunspan.png'),
    img: undefined,
    init: function () {
        console.log(`init it`);
        sunBG.img = loadImage('/games/bookInBasement/img/sunspan.png');
        sunBG.img.onload = function () {
//            sunBG.tintImage(sunBG.img, '#d74000');
            sunBG.tintImage();
            sunBG.bools.isTinted = true;
        }

        sunBG.buffer = document.createElement('canvas');
        sunBG.btx = sunBG.buffer.getContext('2d');

    },
    tintImage(img = sunBG.img, tint = random_hexColor()) {
        sunBG.buffer.width = img.width;
        sunBG.buffer.height = img.height;
        //        console.log(sunBG.buffer);
        // fill offscreen buffer with the tint color
        sunBG.btx.fillStyle = tint;
//        sunBG.btx.clearRect(0, 0, sunBG.buffer.width, sunBG.buffer.height);
        sunBG.btx.fillRect(0, 0, sunBG.buffer.width, sunBG.buffer.height);
        // destination atop makes a result with an alpha channel 
        // identical to fg, but with all pixels retaining their original color *as far as I can tell*
        sunBG.btx.globalCompositeOperation = "destination-atop";
        sunBG.btx.globalAlpha = 0.8;
        
        sunBG.btx.drawImage(sunBG.img, 0, 0);
//        ctx.drawImage(sunBG.img, 0, 0);

        //then set the global alpha to the amound that you want to tint it, and draw the buffer 

        sunBG.tinted = sunBG.btx.getImageData(0,0,img.width,img.height);

        ctx.putImageData(sunBG.tinted,0,0);
        //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
        //        return sunBG.buffer;

    },

    r: 2,
    vr: 0.01,
    gear: 1,
    bools: {
        isSlowing: false,
        isTinted: false,
    },
    s: 1,
    a: 0.5,
    drawSelf: function () {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        rotateCanvas(sunBG.r);
        ctx.globalAlpha = sunBG.a;

        if (sunBG.bools.isTinted) {
            //            sunBG.btx.globalAlpha = 0.9;

            ctx.globalAlpha = 1;
            ctx.putImageData(sunBG.tinted,0,0);
//            superdrawImage(sunBG.tinted, 0, 0, sunBG.img.width, sunBG.img.height, -(sunBG.img.width * 10 / 2), (-sunBG.img.height * 10 / 2), sunBG.img.width * 10, sunBG.img.height * 10);
//            superdrawImage(sunBG.buffer, 0, 0, sunBG.img.width, sunBG.img.height, -(sunBG.img.width * 10 / 2), (-sunBG.img.height * 10 / 2), sunBG.img.width * 10, sunBG.img.height * 10);
            //            superdrawImage(sunBG.tintImage(sunBG.img, '#d74000'), 0, 0, sunBG.img.width, sunBG.img.height, -(sunBG.img.width * 10 / 2), (-sunBG.img.height * 10 / 2), sunBG.img.width * 10, sunBG.img.height * 10);

            ctx.globalAlpha = 0.8;
            superdrawImage(sunBG.img, 0, 0, sunBG.img.width, sunBG.img.height, -(sunBG.img.width * 10 / 2), (-sunBG.img.height * 10 / 2), sunBG.img.width * 10, sunBG.img.height * 10);

        }


        //        superdrawImage(sunBG.img, 0, 0, sunBG.img.width, sunBG.img.height, -(sunBG.img.width * 10 / 2), (-sunBG.img.height * 10 / 2), sunBG.img.width * 10, sunBG.img.height * 10);

        ctx.restore();
    },
    tick: function () {

        sunBG.progress();
        sunBG.bounds();
        sunBG.drawSelf();
    },
    bounds: function () {
        if (sunBG.r >= 360) {
            sunBG.r -= 360;
        }
    },
    progress: function () {
        sunBG.frame++;
        sunBG.r += sunBG.vr;

        if (!sunBG.bools.isSlowing && sunBG.frame % sunBG.modoloA == 0 && sunBG.vr < 5) {
            sunBG.vr += 0.1 * sunBG.gear;
        }

        if (sunBG.bools.isSlowing) {
            sunBG.vr -= 0.1 * sunBG.gear;
        }

    },
}




//
//
//function tintImage(img, tint = random_hexColor()) {
//
//
//    // fill offscreen buffer with the tint color
//    bx.fillStyle = tint;
//    bx.clearRect(0, 0, buffer.width, buffer.height);
//    bx.fillRect(0, 0, buffer.width, buffer.height);
//    // destination atop makes a result with an alpha channel 
//    // identical to fg, but with all pixels retaining their original color *as far as I can tell*
//    bx.globalCompositeOperation = "destination-atop";
//    bx.drawImage(this.image, 0, 0);
//
//    //then set the global alpha to the amound that you want to tint it, and draw the buffer 
//
//
//    //DRAW BUFFER ON TOP WITH ALPHA As TINT AMOUNT
//    sunBG.buffer = buffer;
//    //    return buffer;
//
//}


function random_hexColor() {
    // sand - "#dede90"
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function random_range(min, max) {
    return Math.random() * (+max - +min) + +min;
}

function random_bool() {
    return Math.random() >= 0.5;
}



function posSine(val) {
    return (Math.sin(val) + 1);
}

function sine(val) {
    // radians btw.
    return Math.sin(val);
}

function percentage(val = 1, percentageOf = 255) {
    return (val / 1) * percentageOf;
}

function percentage2(val = 1, percentageOf = 255) {
    return ((val / 2) * percentageOf).toFixed(2);
}

function colourSine(sineInput) {
    return percentage2(posSine(sineInput));
}

function singleSineRBGA(valA, valB = valA, valC = valA) {
    //    console.log(`rgba(${colourSine(valA)},${colourSine(valB)},${colourSine(valC)},1)`);
    return `rgba(${colourSine(valA)},${colourSine(valB)},${colourSine(valC)},1)`;
}

sunBG.init();

document.onclick = function () {
    //    background('green');
    sunBG.gear++;
    //    sunBG.tick();
}

let counter = 1;

function viewerLoop() {
    counter++;
    ctx.globalAlpha = 1;
    background('green');
    //    background(singleSineRBGA(counter/300,counter/500,counter/800));
    //    background(singleSineRBGA(counter / 30, 0.1, counter / 80));
    sunBG.tick();

    requestAnimationFrame(viewerLoop);
}

viewerLoop();


//sunBG.tintImage(sunBG.img, '#00FF0F');
//sunBG.im