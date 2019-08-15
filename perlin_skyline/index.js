function drawcity() {

    function WIP(x = -10, w = 20) {
        let h = 180;  //REFACTOR - FUTURE: PEARL height
        let minBheight = 30; // isn't this handled by doorheight?
        buildingABasic(x, w, h - RNDNum(0, h - minBheight));
    }

    //drawbasesky:
    background(gradientV());

    
    let w = 10 + RNDNum(5, 15); // PERLIN WIDTH
    // ALL RND CONVERTS TO PERLIN INPUTS:
    for (let x = (RNDNum(-25, -5)); x < canvas.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
    }


    ctx.globalAlpha = 0.5;
    background(gradientV());
    ctx.globalAlpha = 1;

    GD.horizonY += 2;

    for (let x = (RNDNum(-25, -5)); x < canvas.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
    }

    ctx.globalAlpha = 0.5;
    background(gradientV());
    ctx.globalAlpha = 1;

    GD.horizonY += 5;


    for (let x = (RNDNum(-20, -10)); x < canvas.width; x += w + 2) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);

        //              WIP(x,(RNDNum(10, 30)));
    }
    setColor('black');
    drawRect(0, GD.horizonY, canvas.width, canvas.height * 0.3);
    
    GD.horizonY = Math.floor(canvas.height * 0.7);  // reset horizon
}

let timer = setInterval(drawcity, 1000/3);

