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
    colorA: 'rgba(0,0,0,0.2)',
    colorB: 'blue',
    colorC: 'skyblue',
    loadAudio: function () {
        IntroSequence.aDMT = new Audio('audio/DMT.mp3');
        IntroSequence.aDMT.addEventListener('loadeddata', () => {
            IntroSequence.aDMT.volume = 0.7;
            if (IntroSequence.debugging) {
                console.log('I have loaded aDMT');
            }
        })
        IntroSequence.introMusic = new Audio('audio/introtune.mp3');

        IntroSequence.introMusic.addEventListener('loadeddata', () => {
            IntroSequence.introMusic.volume = 0.6;
            if (IntroSequence.debugging) {
                console.log('I have loaded introMusic');
            }
        })
    },
    loadImage: function (path) {
        let image = new Image();
        image.src = path;
        return image;
    },
    loadSignature: function () {
        return IntroSequence.loadImage("img/sig_splash.png");
    },
    loadOutsideFG: function () {
        return IntroSequence.loadImage("img/alphahouseFG.png");
    },
    loadOutsides: function () {
        return IntroSequence.loadImage("img/alphahouse.png");
    },
    loadPlayer: function () {
        return IntroSequence.loadImage("img/booka.png");
    },
    zoomOutSignature: function () {
        // This one matters::
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

        //garbagecleanup
        IntroSequence.zoomOutSignature = undefined;
        
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
            IntroSequence.FadeInWorldView();
        } else {
            requestAnimationFrame(IntroSequence.zoomOutCleanUp);
        }
    },
    FadeInWorldView: function () {
        
        //garbagecleanup
        IntroSequence.zoomOutCleanUp = undefined;
        
        let fadesteps = 12;

        function doit() {
            fadesteps--;
            ctx.globalAlpha = 1;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));
            EMIT.setWind(1);
            EMIT.tick();

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
        doit();
    },
    PanDownOutsides: function () {
        
        //garbagecleanup
        IntroSequence.FadeInWorldView = undefined;
        
        let steps = -400;
        let sigstep = 0;
        ctx.globalAlpha = 1;


        function doPan() {
            steps += 0.4;
            sigstep += 0.15;
            ctx.globalAlpha = 1;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));

            EMIT.tick();
            EMIT.setWind(1.5);
            EMIT.isOn = false;

            if (sigstep > 150) {
                sigstep = 150;
            }
            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, sigstep); //draw SIG

            knobtree += 0.005;
            ctx.globalAlpha = knobtree.toFixed(1);
            ctx.drawImage(IntroSequence.outsideview, 0, -400 - steps, 640, 1000); //draw SET

            //fun to watch:
            //            ctx.drawImage(IntroSequence.book, ((canvas.width/2)-20), (canvas.height - 110), -45, 45);
            //            ctx.drawImage(IntroSequence.outsideFG, 232, 290, 200, 150);

            if (sigstep >= 130) {

                ctx.save();
                ctx.globalAlpha = 1;
                EMIT.tick();
                ctx.restore();

            }

            ctx.drawImage(IntroSequence.book, ((canvas.width / 2) - 20), (canvas.height - 110) - steps, -45, 45);
            ctx.drawImage(IntroSequence.outsideFG, 232, 290 - steps, 200, 150);

            if (steps > 0) {
                if (IntroSequence.debugging) {

                    console.log('[4][done] - PanDownOutsides');
                }

                IntroSequence.portchbegin();
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
        IntroSequence.outsideFG = IntroSequence.loadOutsideFG();
        IntroSequence.book = IntroSequence.loadPlayer();
    },
    start: function () {
        IntroSequence.introMusic.play();


        // debugging: skipahead:
        //        IntroSequence.portchbegin();

        //TRUESTART::
        IntroSequence.zoomOutSignature();
    },
    finished: function () {
        console.log(`[5][complete] - INTROSEQUENCE COMPLETE`);
        //        console.log(`[5b][complete] - CLEAN UP IntroSequence Object`);



//        IntroSequence.portchbegin();

    },
    portchbegin: function () {
        console.log(`[6][portchbegin] - portchbegin]`);
        ctx.imageSmoothingEnabled = true;

        function prepEmitterData() {


            // portch smoking effect::
            EMIT.x = canvas.width / 2 - 32;
            EMIT.y = canvas.height - 100;
            EMIT.emitRate = 6;
            EMIT.setWind(1, -2);
            EMIT.amount = 2;
            EMIT.setsFadePoint(0.05);
            EMIT.setalphaDecay(0.005);
            EMIT.setscalerate(0.05);
            EMIT.reinit();
            EMIT.isOn = true;

        }

        function drawSet() {
            ctx.save();
            ctx.globalAlpha = 1;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));
            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, 150); //draw SIG
            ctx.drawImage(IntroSequence.outsideview, 0, -400, 640, 1000);
            ctx.drawImage(IntroSequence.book, canvas.width / 2 - 20, canvas.height - 110, -45, 45);
            ctx.drawImage(IntroSequence.outsideFG, 232, 290, 200, 150);
            EMIT.tick();
            ctx.restore();
        }
        //init controller?

        function portchloop() {
            drawSet();

            if (!hasStarted) {
                requestAnimationFrame(portchloop);
            } else {
                console.log('portchloop hasended');
                IntroSequence.finished();
            }
        }

        let hasStarted = false;

        prepEmitterData();

        setTimeout(function () {
            hasStarted = true;
            console.log('timeoutended - loop killed');
        }, 65000)
        portchloop();

    },

}

IntroSequence.init();
const EMIT = new SmokeEmitter(canvas.width / 2, canvas.height / 2, 12);
//  Signature Fade out needed on start Game Trigger.
//  writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'lime', 'bottom', 'center');
//writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'lime', 'bottom', 'center');
writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'red', 'bottom', 'center');
