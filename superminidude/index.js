 //    RUNTIME
background(mycol.greenl);

 let tinyDude = {
     blocksize: 10,
     shirtcolor: '#393276',
     pantcolor: '#111111',
     haircolor: 'khaki',
     skincolor: '#FFDDAA',
     purp: '#393276',
 }
  const td = tinyDude;

 let sequences = {
     runfwd: ['f', 'rfrb', 'rfra', 'f', 'rfla', 'rflb'],
     spin: ['f', 'fr', 'r', 'br', 'b', 'bl', 'l', 'fl'],
     walkr: ['fr', 'r', 'br', 'r'],
     walkl: ['fl', 'l', 'bl', 'l'],
 }
 const ani = sequences;

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
             selectedAnimation = ani.runfwd;
//             selectedAnimation = ani.walkl;
             break;
         case 1:
             selectedAnimation = ani.spin;
             break;
         case 2:
            selectedAnimation = ani.runfwd;
             break;
         case 3:
             selectedAnimation = ani.spin;
//            selectedAnimation = ani.walkr;
             break;
     }

     if (huecycle > 360) {
         huecycle -= 360;
     }
     //                ctx.shadowColor = tinyDude.shirtcolor;
     ctx.shadowColor = stepHue(huecycle++, '#FFD700');
     ctx.shadowBlur = 4 + counter;

     canvas.style.borderColor = stepHue(180, tinyDude.shirtcolor);


     tinyDude.shirtcolor = stepHue(1, tinyDude.shirtcolor);
     background(stepHue(huecycle++, '#440000'));
     newWaveHorizon(4, stepHue(-huecycle, '#4D8F5E'));
     //                newWaveSkies(-4, stepHue(huecycle++, '#440000'));
     newWaveSkies(-10, stepHue(huecycle++, '#440000'));
     selectDrawCase(selectedAnimation[counter]);
     counter++;
 }

 //            forwardRunAL(canvas.width / 2, canvas.height / 2);

 setInterval(aniloop, 1000 / 15);
