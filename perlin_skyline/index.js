function drawcity() {

    function WIP(x = -10, w = 20) {

        //            let w = 10;
        let h = 180;
        let minBheight = 30;
        buildingABasic(x, w, h - RNDNum(0, h - minBheight));
    }
    background(gradientV());
//    horizontalLine(canvas.height * 0.7);


    let w = 10 + RNDNum(5, 15);

    for (let x = (RNDNum(-25, -5)); x < canvas.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
        //            WIP(x,(RNDNum(10, 30)));
    }

    setColor('black');


    ctx.globalAlpha = 0.5;

    setColor('black');
    drawRect(0, GD.horizonY, canvas.width, canvas.height * 0.2);

    background(gradientV());
    ctx.globalAlpha = 1;

    GD.horizonY += 2;

    for (let x = (RNDNum(-25, -5)); x < canvas.width; x += w + 1) {
        w = 10 + RNDNum(5, 15);
        WIP(x, w);
        //            WIP(x,(RNDNum(10, 30)));
    }

    setColor('black');


    ctx.globalAlpha = 0.5;

    setColor('black');
    drawRect(0, GD.horizonY, canvas.width, canvas.height * 0.2);

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
    
    GD.horizonY -= 7;
}

let timer = setInterval(drawcity, 1000/3);

