// Make dragon make this noise go.
// Then refactor into object and package up.
// do assetloader.
let debugging = true;
let aniscale = 6.01;

// loadings:
function loadSignature() {
    function loadImage(path) {
        let image = new Image();
        image.src = path;
        return image;
    }
    return loadImage("img/sig_splash.png");
}
const signature = loadSignature();

function loadOutsides() {
    function loadImage(path) {
        let image = new Image();
        image.src = path;
        return image;
    }
    return loadImage("img/housevan.png");
}
const outsideview = loadOutsides();
// main work:
function centerDraw(image, s = 1) {
    //    middleofcanvas::
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let ix = image.width * s / 2;
    let iy = image.height * s / 2;

    let left = cx - ix;
    let top = cy - iy;
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.globalAlpha = 0.8;
    ctx.rect(left, top, image.width * s, image.height * s);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.drawImage(image, left, top, image.width * s, image.height * s);
}

function zoomOutSignature() {
    if (aniscale > 1) {
        aniscale -= 0.1;
    } else {
        aniscale = 1;
    }

    centerDraw(signature, aniscale);

    if (aniscale > 1) {
        requestAnimationFrame(zoomOutSignature);
    } else {
        if (debugging) {
            console.log('[1][done] - zoomOutSignature');
        }
        //reset aniscale::
        aniscale = 10;
        zoomOutCleanUp();
    }
}

function zoomOutCleanUp() {
    centerDraw(signature, 1);
    aniscale -= 0.1;
    if (aniscale < 0) {
        if (debugging) {
            console.log('[2][done] - zoomOutCleanUp');
        }
        setTimeout(FadeInWorldView, 500);
    } else {

        requestAnimationFrame(zoomOutCleanUp);
    }
}

function FadeInWorldView() {
    let fadesteps = 24;

    function doit() {
        fadesteps--;
        ctx.globalAlpha = 1 / fadesteps;
        ctx.drawImage(outsideview, 0, 0, 640, 2000);
        ctx.globalAlpha = 1;
        centerDraw(signature, 1);
        if (fadesteps == 0) {
            if (debugging) {
                console.log('[3][done] - FadeInWorldView');
            }
            PanDownOutsides();
        } else {
            requestAnimationFrame(doit);
        }
    }
    doit();
}

function PanDownOutsides() {
    let steps = -400;
    let sigstep = 0;

    function doit() {
        steps += 0.5;
        sigstep += 0.15;
        ctx.drawImage(outsideview, 0, -400 - steps, 640, 1000);
        ctx.globalAlpha = 1;
        if (sigstep > 50) {
            ctx.globalAlpha = 0.1;
        }
        centerDrawRiser(signature, 1, sigstep);
        if (steps > 0) {
            if (debugging) {
                console.log('[4][done] - PanDownOutsides');
            }
        } else {
            requestAnimationFrame(doit);
        }
    }
    doit();
}

function centerDrawRiser(image, s = 1, yoffset = 0) {
    //    middleofcanvas::
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let ix = image.width * s / 2;
    let iy = image.height * s / 2;

    let left = cx - ix;
    let top = cy - iy;
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.globalAlpha = 0.8;
    ctx.rect(left, top - yoffset, image.width * s, image.height * s);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.drawImage(image, left, top - yoffset, image.width * s, image.height * s);
}

//execution entry point::
//zoomOutSignature();


let IntroSequence = {
    debugging: true,
    aniscale: 6.01,

    loadSignature: function () {
        function loadImage(path) {
            let image = new Image();
            image.src = path;
            return image;
        }
        return loadImage("img/sig_splash.png");
    },
    loadOutsides: function () {
        function loadImage(path) {
            let image = new Image();
            image.src = path;
            return image;
        }
        return loadImage("img/housevan.png");
    },
    zoomOutSignature: function () {
        if (IntroSequence.aniscale > 1) {
            IntroSequence.aniscale -= 0.1;
        } else {
            IntroSequence.aniscale = 1;
        }

        IntroSequence.centerDraw(IntroSequence.signature, IntroSequence.aniscale);

        if (IntroSequence.aniscale > 1) {
            requestAnimationFrame(IntroSequence.zoomOutSignature);
        } else {
            if (IntroSequence.debugging) {
                console.log('[1][done] - zoomOutSignature');
            }
            //reset aniscale::
            IntroSequence.aniscale = 10;
            IntroSequence.zoomOutCleanUp();
        }
    },
    zoomOutCleanUp: function () {
        IntroSequence.centerDraw(signature, 1);
        IntroSequence.aniscale -= 0.1;
        if (IntroSequence.aniscale < 0) {
            if (debugging) {
                console.log('[2][done] - zoomOutCleanUp');
            }
            setTimeout(IntroSequence.FadeInWorldView, 500);
        } else {

            requestAnimationFrame(IntroSequence.zoomOutCleanUp);
        }
    },
    FadeInWorldView: function () {
        let fadesteps = 24;

        function doit() {
            fadesteps--;
            ctx.globalAlpha = 1 / fadesteps;
            ctx.drawImage(IntroSequence.outsideview, 0, 0, 640, 2000);
            ctx.globalAlpha = 1;
            IntroSequence.centerDraw(IntroSequence.signature, 1);
            if (fadesteps == 0) {
                if (IntroSequence.debugging) {
                    console.log('[3][done] - FadeInWorldView');
                }
                IntroSequence.PanDownOutsides();
            } else {
                requestAnimationFrame(doit);
            }
        }
        doit();
    },
    PanDownOutsides: function () {
        let steps = -400;
        let sigstep = 0;

        function doit() {
            steps += 0.5;
            sigstep += 0.15;
            ctx.drawImage(IntroSequence.outsideview, 0, -400 - steps, 640, 1000);
            ctx.globalAlpha = 1;
            if (sigstep > 50) {
                ctx.globalAlpha = 0.1;
            }
            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, sigstep);
            if (steps > 0) {
                if (IntroSequence.debugging) {
                    console.log('[4][done] - PanDownOutsides');
                }
                
                IntroSequence.finished();0
                
            } else {
                requestAnimationFrame(doit);
            }
        }
        doit();
    },
    centerDraw: function (image, s = 1) {
        //    middleofcanvas::
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        let ix = image.width * s / 2;
        let iy = image.height * s / 2;

        let left = cx - ix;
        let top = cy - iy;
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.globalAlpha = 0.8;
        ctx.rect(left, top, image.width * s, image.height * s);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.drawImage(image, left, top, image.width * s, image.height * s);
    },
    centerDrawRiser: function (image, s = 1, yoffset = 0) {
        //    middleofcanvas::
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        let ix = image.width * s / 2;
        let iy = image.height * s / 2;

        let left = cx - ix;
        let top = cy - iy;
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.globalAlpha = 0.8;
        ctx.rect(left, top - yoffset, image.width * s, image.height * s);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.drawImage(image, left, top - yoffset, image.width * s, image.height * s);
    },
    init: function () {
        IntroSequence.signature = IntroSequence.loadSignature();
        IntroSequence.outsideview = IntroSequence.loadOutsides();
    },
    finished: function () {
        console.log(`[5][complete] - INTROSEQUENCE COMPLETE`);
    },

}
IntroSequence.init();
IntroSequence.zoomOutSignature();







//-=-=- DEPRECIATED:::

//OLD Bouncy:
//let pingpong = false;
function zoominoutloop() {
    aniscale += 0.01;

    if (aniscale > 1) {
        aniscale = 0.01;
        pingpong = !pingpong;
    }

    if (!pingpong) {
        centerDraw(signature, aniscale);
    } else {
        centerDraw(signature, aniscale - 1);
    }

    requestAnimationFrame(zoominoutloop);
}
