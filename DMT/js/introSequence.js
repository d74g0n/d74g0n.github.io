// needs audio now:
canvas.onclick = function () {
    IntroSequence.start();
    canvas.onclick = undefined; // so it don't start more than once!
}

let IntroSequence = {
    aDMT: undefined,
    introMusic: undefined,
    debugging: false,
    aniscale: 6.01,
    gradientfader: 0,
//    colorA: 'black',
    colorA: 'rgba(0,0,0,0.2)',
    colorB: 'blue',
    colorC: 'skyblue',
//    colorC: 'rgba(0,0,0,0)',
    loadAudio: function () {
        IntroSequence.aDMT = new Audio('audio/DMT.mp3');
        IntroSequence.aDMT.addEventListener('loadeddata', () => {
            if (IntroSequence.debugging) {
                console.log('I have loaded aDMT');
            }
        })



        IntroSequence.introMusic = new Audio('audio/introtune.mp3');

        IntroSequence.introMusic.addEventListener('loadeddata', () => {
            if (IntroSequence.debugging) {
                console.log('I have loaded introMusic');
            }
        })



        //        IntroSequence.introMusic.load();
        //        IntroSequence.aDMT.load();


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
        //        return loadImage("img/housevan.png");
        return loadImage("img/alphahouse.png");
    },
    zoomOutSignature: function () {

        ctx.imageSmoothingEnabled = true;
        EMIT.tick();

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
            IntroSequence.aniscale = 30;

            //trying to insert noise::
            let playPromise = IntroSequence.aDMT.play();
            if (playPromise !== null) {
                playPromise.catch(() => {
                    IntroSequence.aDMT.play();
                })
            }

            IntroSequence.zoomOutCleanUp();
        }
    },
    zoomOutCleanUp: function () {



        if (IntroSequence.gradientfader >= 1) {
            IntroSequence.gradientfader = 1;
        } else {
            IntroSequence.gradientfader += 0.005;
        }
        ctx.globalAlpha = IntroSequence.gradientfader;
        background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));

        EMIT.tick();
        EMIT.isOn = false;

        ctx.globalAlpha = 1;
        IntroSequence.centerDraw(IntroSequence.signature, 1);
        IntroSequence.aniscale -= 0.1;
        if (IntroSequence.aniscale < 0) {
            if (IntroSequence.debugging) {
                console.log('[2][done] - zoomOutCleanUp');
            }
            //            setTimeout(IntroSequence.FadeInWorldView, 500);
            IntroSequence.FadeInWorldView();
        } else {

            requestAnimationFrame(IntroSequence.zoomOutCleanUp);
        }
    },
    FadeInWorldView: function () {

        let fadesteps = 12;

        function doit() {
            
            fadesteps--;
            ctx.globalAlpha = 1;

            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));


//            ctx.drawImage(IntroSequence.outsideview, 0, 0, 640, 2000);
//            ctx.globalAlpha = 1;
            EMIT.tick();


            //            ctx.globalAlpha = 1;
            IntroSequence.centerDraw(IntroSequence.signature, 1);
            if (fadesteps <= 0) {
                if (IntroSequence.debugging) {
                    console.log('[3][done] - FadeInWorldView');
                }
                IntroSequence.PanDownOutsides();
            } else {
                requestAnimationFrame(doit);
            }
        }
//        let alphaknob = 0; // ALL THIS CAN BE REMOVED
        doit();
    },
    PanDownOutsides: function () {
        let steps = -400;
        let sigstep = 0;
        ctx.globalAlpha = 1;

      
        
        function doPan() {

            steps += 0.4;
            sigstep += 0.15;
            ctx.globalAlpha = 1;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));
            //            background(gradientV('red', 'blue', 'skyblue')); //draw BG

            EMIT.tick();
            EMIT.setWind(1);
            EMIT.isOn = false;

            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, sigstep); //draw SIG



            knobtree += 0.005;
            ctx.globalAlpha = knobtree.toFixed(1);
            
            ctx.drawImage(IntroSequence.outsideview, 0, -400 - steps, 640, 1000); //draw SET




            if (steps > 0) {
                if (IntroSequence.debugging) {
                    console.log('[4][done] - PanDownOutsides');
                }
                IntroSequence.finished();
            } else {
                requestAnimationFrame(doPan);
            }
        }
        let knobtree = 0;
        doPan();
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
    start: function () {
        IntroSequence.introMusic.play();
        IntroSequence.zoomOutSignature();
    },
    finished: function () {
        console.log(`[5][complete] - INTROSEQUENCE COMPLETE`);
        console.log(`[5b][complete] - CLEAN UP IntroSequence Object`);
    },

}
IntroSequence.init();



//  Signature Fade out needed on start Game Trigger.



//writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'lime', 'bottom', 'center');
writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'lime', 'bottom', 'center');
