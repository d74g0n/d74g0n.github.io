// needs audio now:


let IntroSequence = {
    aDMT: undefined,
    introMusic: undefined,
    debugging: true,
    aniscale: 6.01,
    loadAudio: function () {
        IntroSequence.aDMT = new Audio('audio/DMT.mp3');
        IntroSequence.introMusic = new Audio('audio/introtune.mp3');
        IntroSequence.introMusic.load();
        IntroSequence.aDMT.load();


    },
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

            //trying to insert noise::
            let playPromise = IntroSequence.aDMT.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    IntroSequence.aDMT.play();
                })
            }

            //            IntroSequence.aDMT.play();



            IntroSequence.zoomOutCleanUp();
        }
    },
    zoomOutCleanUp: function () {
        IntroSequence.centerDraw(IntroSequence.signature, 1);
        IntroSequence.aniscale -= 0.1;
        if (IntroSequence.aniscale < 0) {
            if (IntroSequence.debugging) {
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

                IntroSequence.finished();
                0

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
        IntroSequence.loadAudio();
        IntroSequence.signature = IntroSequence.loadSignature();
        IntroSequence.outsideview = IntroSequence.loadOutsides();

        //        IntroSequence.introMusic.play();
        //trying to insert noise::

    },
    finished: function () {
        console.log(`[5][complete] - INTROSEQUENCE COMPLETE`);
    },

}
IntroSequence.init();

function musicGo() {
    let playPromise = IntroSequence.introMusic.play();
    if (playPromise !== null) {
        playPromise.catch(() => {
            IntroSequence.introMusic.play();
        })
    }

    IntroSequence.zoomOutSignature();
}
setTimeout(musicGo, 1000);






//var audio = new Audio('audio/DMT.mp3');
//audio.play();
