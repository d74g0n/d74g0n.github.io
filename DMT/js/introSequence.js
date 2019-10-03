let IntroSequence = {
    aDMT: undefined,
    introMusic: undefined,
    music01: undefined,
    sfxUnlatch: undefined,
    sfxDoorclose: undefined,
    dn_full: undefined,
    debugging: false,
    aniscale: 6.01,
    gradientfader: 0,
    colorA: 'rgba(0,0,0,0.2)',
    colorB: 'blue',
    colorC: 'skyblue',
    messaging: function () {}, // need some messaging toggles for fades etc.
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
        IntroSequence.sfxUnlatch = new Audio('audio/dlatch.mp3');

        IntroSequence.sfxUnlatch.addEventListener('loadeddata', () => {
            IntroSequence.sfxUnlatch.volume = 0.8;
            if (IntroSequence.debugging) {
                console.log('I have loaded sfxUnlatch');
            }
        })
        IntroSequence.sfxDoorclose = new Audio('audio/dclose.mp3');

        IntroSequence.sfxDoorclose.addEventListener('loadeddata', () => {
            IntroSequence.sfxDoorclose.volume = 0.8;
            if (IntroSequence.debugging) {
                console.log('I have loaded sfxDoorclose');
            }
        })
        IntroSequence.music01 = new Audio('music/01.mp3');

        IntroSequence.music01.addEventListener('loadeddata', () => {
            IntroSequence.music01.volume = 0.8;
            if (IntroSequence.debugging) {
                console.log('I have loaded music01');
            }
        })
        IntroSequence.dn_full = new Audio('audio/dn_full.mp3');

        IntroSequence.dn_full.addEventListener('loadeddata', () => {
            IntroSequence.dn_full.volume = 0.8;
            if (IntroSequence.debugging) {
                console.log('I have loaded dn_full');
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
    tweakEmitterDataA: function () {
        // portch smoking effect::
        EMIT.x = canvas.width / 2 - 22;
        EMIT.emitRate = 16;
        EMIT.setWind(1.9, -1.5);
        EMIT.amount = 4;
        EMIT.setsFadePoint(0.005);
        EMIT.setalphaDecay(0.01);
        EMIT.setscalerate(0.1);
        EMIT.reinit();
        EMIT.isOn = true;
    },
    tweakEmitterDataB: function () {
        // portch smoking effect::
        //unsused::
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
        EMIT.takepuff();
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
            //            ctx.imageSmoothingEnabled = false;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));
            EMIT.tick();
            EMIT.setWind(1.5);

            if (sigstep > 150) {
                sigstep = 150;
            }
            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, sigstep); //draw SIG

            knobtree += 0.005;
            ctx.save();
            ctx.globalAlpha = knobtree.toFixed(1);
            ctx.drawImage(IntroSequence.outsideview, 0, -400 - steps, 640, 1000); //draw SET
            ctx.restore();

            ctx.save();
            ctx.globalAlpha = 1;
            ctx.drawImage(IntroSequence.book, ((canvas.width / 2) - 20), (canvas.height - 110) - steps, -45, 45);
            ctx.drawImage(IntroSequence.outsideFG, 232, 290 - steps, 200, 150);
            ctx.restore();

            if (sigstep > 120 && sigstep < 122) {
                IntroSequence.tweakEmitterDataA();
                EMIT.y = (canvas.height - 100) - steps;
                EMIT.amount = 12;
                EMIT.isOn = true;
                EMIT.emitRate = 16;
                EMIT.setWind(1.9, -1.5);
            }

            if (sigstep >= 122) {
                EMIT.setWind(1.9, -1.5);
                ctx.save();
                ctx.globalAlpha = 1;
                EMIT.y = canvas.height - 100 - steps;
                EMIT.tick();
                ctx.restore();
            }

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
        //        ctx.globalAlpha = 1;
        ctx.drawImage(image, left, top - yoffset, image.width * s, image.height * s);
    },
    init: function () {
        IntroSequence.loadAudio();
        IntroSequence.signature = IntroSequence.loadSignature();
        IntroSequence.outsideview = IntroSequence.loadOutsides();
        IntroSequence.outsideFG = IntroSequence.loadOutsideFG();
        IntroSequence.book = IntroSequence.loadPlayer();
        canvas.onclick = function () {
            IntroSequence.start();
            //    canvas.onclick = undefined; // so it don't start more than once!
            canvas.onclick = null; // so it don't start more than once!
        }
        writeText('click to start', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'red', 'bottom', 'center');
    },
    hasStarted: false,
    start: function () {
        IntroSequence.introMusic.play();

        // debugging: skipahead:
        //        IntroSequence.portchbegin();
        //        EMIT.isOn = false;
        //        ctx.GlobalAlpha = 1;
        //        ctx.imageSmoothingEnabled = true;
        //        IntroSequence.PanDownOutsides();

        //TRUESTART::
        IntroSequence.zoomOutSignature();
    },
    finished: function () {
        console.log(`[5][complete] - INTROSEQUENCE COMPLETE`);
        //        console.log(`[5b][complete] - CLEAN UP IntroSequence Object`);

        IntroSequence.introMusic.pause();
        background('black');
        IntroSequence.sfxDoorclose.play();
        setTimeout(function(){
        IntroSequence.music01.play();    
         writeText('Your Mom Gay', canvas.width / 2, canvas.height / 2, '48px monospace', 'black', 'pink', 'bottom', 'center');
   
        },1000);
        
        setTimeout(function(){
         IntroSequence.dn_full.play();  
   
        },1500);
        
        
//             IntroSequence.dn_full.play();  
        //        IntroSequence.portchbegin();

    },
    portchbegin: function () {
        console.log(`[6][portchbegin] - portchbegin]`);
        ctx.imageSmoothingEnabled = true;

        cS.On();

        let doorState = {
            frame: 0,
        }

        function drawSet() {

            ctx.save();
            ctx.globalAlpha = 1;
            background(gradientV(IntroSequence.colorA, IntroSequence.colorB, IntroSequence.colorC));
            IntroSequence.centerDrawRiser(IntroSequence.signature, 1, 150); //draw SIG
            ctx.drawImage(IntroSequence.outsideview, 0, -400, 640, 1000);

            function drawOpendoor() {

                doorState.frame++;

                if (doorState.frame == 1) {
                    IntroSequence.sfxUnlatch.play();
                }

                ctx.save();
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.rect(
                    271,
                    334,
                    24,
                    66);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            if (cS.DoorAni) {
                drawOpendoor();
            }

            ctx.drawImage(IntroSequence.book, canvas.width / 2 - 20 + portchBook.x, canvas.height - 110 + portchBook.y, -45, 45);
            ctx.drawImage(IntroSequence.outsideFG, 232, 290, 200, 150);
            EMIT.tick();
            ctx.restore();
            if (portchBook.x > 62) {
                ctx.save();
                TB.say(`No Need to go that way`, canvas.width / 2 - 20 + portchBook.x, canvas.height - 132 + portchBook.y);
                ctx.restore();
            }
        }
        //init controller?
        function portchloop() {
            portchBook.tick(); //process control forces
            drawSet();
            if (!IntroSequence.hasStarted) {
                requestAnimationFrame(portchloop);
            } else {
                console.log('portchloop hasended');
                IntroSequence.finished();
            }
        }

        IntroSequence.tweakEmitterDataA();
        portchloop();
    },
}

IntroSequence.init();
const EMIT = new SmokeEmitter(canvas.width / 2, canvas.height / 2, 12);
