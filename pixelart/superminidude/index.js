/*
To Do - Refactor Always

1 - add 4 more directions

2 - add joystick

3 - add jump

4 - add text bubble or something.


always consider 'autochess' dynasty tactics 2 stuff.




bonus

- sun
- noise-generated-buildings-skyline
- palm tree?
- topdown;
*/ 

//    RUNTIME

 function selectDrawCase(drawcase) {

     switch (drawcase) {
         case 'b':
             backFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'br':
             backRightFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'r':
             rightFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'fr':
             forwardRightFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'f':
             forwardFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'fl':
             forwardLeftFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'l':
             leftFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'bl':
             backLeftFacing(canvas.width / 2, canvas.height / 2);
             break;
         case 'rfra':
             forwardRunAR(canvas.width / 2, canvas.height / 2);
             break;
         case 'rfrb':
             forwardRunBR(canvas.width / 2, canvas.height / 2);
             break;
         case 'rfla':
             forwardRunAL(canvas.width / 2, canvas.height / 2);
             break;
         case 'rflb':
             forwardRunBL(canvas.width / 2, canvas.height / 2);
             break;
         case 'rldd':
             RunLeftD(canvas.width / 2, canvas.height / 2);
             break;
         case 'rlcc':
             RunLeftC(canvas.width / 2, canvas.height / 2);
             break;
         case 'rlbb':
             RunLeftB(canvas.width / 2, canvas.height / 2);
             break;
         case 'rlaa':
             RunLeftA(canvas.width / 2, canvas.height / 2);
             break;
         case 'rraa':
             RunRightA(canvas.width / 2, canvas.height / 2);
             break;
         case 'rrbb':
             RunRightB(canvas.width / 2, canvas.height / 2);
             break;
         case 'rrcc':
             RunRightC(canvas.width / 2, canvas.height / 2);
             break;
         case 'rrdd':
             RunRightD(canvas.width / 2, canvas.height / 2);
             break;
         case 'raaa':
             runAwayA(canvas.width / 2, canvas.height / 2);
             break;
         case 'rabb':
             runAwayB(canvas.width / 2, canvas.height / 2);
             break;
         case 'racc':
             runAwayC(canvas.width / 2, canvas.height / 2);
             break;
         case 'radd':
             runAwayD(canvas.width / 2, canvas.height / 2);
             break;

     }

 }

 let counter = 0;
 let huecycle = 0;
 let selectedAnimation = ani.runfwd;

 function aniloop() {

     if (counter > selectedAnimation.length - 1) {
         counter = 0;
     }

     switch (anipicker) {
         case 0:
             selectedAnimation = ani.runleft;
             break;
         case 1:
             selectedAnimation = ani.runaway;
             break;
         case 2:
             selectedAnimation = ani.runright;
             break;
         case 3:
             selectedAnimation = ani.runfwd;
             break;
         case 4:
             selectedAnimation = ani.spin;
             break;
         case 5:
             selectedAnimation = ani.runfwd;
             break;
             //         case 6:
             //             selectedAnimation = ani.runright;
             //             break;
             //         case 7:
             //             selectedAnimation = ani.spin;
             //             break;
     }

     if (huecycle > (360 * 2)) {
         huecycle = 1;
     }
     //                ctx.shadowColor = tinyDude.shirtcolor;
     //     ctx.shadowColor = stepHue(huecycle++, '#FFD700');




     ctx.shadowColor = stepHue(huecycle, '#FFD700');
     //     ctx.shadowBlur = 4 + counter;
     ctx.shadowBlur = 4 + Math.floor(huecycle / 90);
     ctx.imageSmoothingEnabled = false;

     canvas.style.borderColor = stepHue(180, tinyDude.shirtcolor);
     qstick.style.borderColor = stepHue(180, tinyDude.shirtcolor);
     UnderTextLineA.style.color = stepHue(90, tinyDude.shirtcolor);
     UnderTextLineB.style.color = stepHue(-90, tinyDude.shirtcolor);

     tinyDude.shirtcolor = stepHue(1, tinyDude.shirtcolor);
     //     background(stepHue(huecycle, '#440000'));
     background(stepHue(huecycle, '#222200'));
     //     newWaveHorizon(4, stepHue(-huecycle, '#4D8F5E'));

     //     newWaveHorizon((huecycle/36).toFixed(0), stepHue(-huecycle, '#4D8F5E'));
     //     newWaveHorizon(Math.floor(4+(huecycle/90)), '#4D8F5E');
     newWaveHorizon(Math.floor(4 - (huecycle / 90)), stepHue(-(huecycle / 2), '#4D8F5E'));
     newWaveSkies(Math.floor(-4 - (huecycle / 90)), stepHue(huecycle * 1.25, '#440000'));

     function horizonMist() {
         //     setColor(stepHue((huecycle*1.75), '#FF44FF'));
//         setColor(stepHue(180, tinyDude.shirtcolor));
//         setColor(stepHue((-225), '#330000'));
         setColor(stepHue(Math.floor(huecycle), '#331100'));
//         setColor(stepHue(-270, tinyDude.shirtcolor));
         ctx.globalAlpha = 0.8;
         drawRect(0, canvas.height / 2 - td.blocksize / 2, canvas.width, td.blocksize);
         ctx.globalAlpha = 1;
         //                newWaveSkies(-4, stepHue(huecycle++, '#440000'));
     }
     horizonMist();
     //     newWaveSkies(-10, stepHue(huecycle++, '#440000'));
//     selectDrawCase(ani.runaway[counter]);
     selectDrawCase(selectedAnimation[counter]);
     huecycle++;
     
     counter++; //HAX
     
 }




 //runAwayA(canvas.width / 2, canvas.height / 2);
 //runAwayB(canvas.width / 2, canvas.height / 2);
 //runAwayC(canvas.width / 2, canvas.height / 2);
 //runAwayD(canvas.width / 2, canvas.height / 2);

 function autoflipanimations() {
     anipicker--;
     //                console.log(anipicker--);
     if (anipicker < 0) {
         anipicker = anitotals;
     }
 }

 setInterval(autoflipanimations, 2500);

// setInterval(aniloop, 1000 / 15);
 setInterval(aniloop, 1000 / 15);
