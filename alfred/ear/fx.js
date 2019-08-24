function animationLoop() {
    if (Al.isTalking) {
        // NOTEABLE! += style.filter works wonderfully.
//        Al.face.style.filter = `drop-shadow(0px 4px 4px ${RNDHexColor()})`;
        Al.face.style.filter = `drop-shadow(0px -20px 10px ${RNDHexColor()})`;
        Al.face.style.filter += `drop-shadow(0px 20px 10px ${RNDHexColor()})`;
        Al.face.style.filter += `drop-shadow(10px 0px 10px ${RNDHexColor()})`;
        Al.face.style.filter += `drop-shadow(-10px 0px 10px ${RNDHexColor()})`;
//        Al.face.style.filter = `drop-shadow(0px 4px ${(4+Al.frame)} ${RNDHexColor()})`;
    }
    Al.tick();
    requestAnimationFrame(animationLoop);
}



animationLoop();
