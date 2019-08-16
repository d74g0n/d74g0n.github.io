/*TODONOTES

- could add pearl Antenna.

all boolean toggles become perlin noise controlled.


*/

let GeoData = {
    horizonY: Math.floor(canvas.height * 0.7),
    top: 190,
}
const GD = GeoData;

function buildingABasic(x, w, h) {

    let Building = {
        id: 'tallboy',
        windowpad: 2,
        Top: GD.horizonY - h,
    }
    const B = Building;

    if (h > GD.top) {
        h = GD.top;
    }
    let bTop = GD.horizonY - h;



    //    let h = 10;

    //base
    setColor('black');
    drawRect(x, B.Top, w, h);

    //windows

    let windowY = B.top + 4;
    let floorHeight = 4;
    let doorHeight = 4;

    let lightcolor = 'rgba(156,156,156,1)';

    //    setColor('gold');
    //    drawRect(x + 2, B.Top + 4, w / 3 - 4, 2);
    //    drawRect(x + 2 + (w * .2), B.Top + 4, w / 3 - 4, 2);
    //    drawRect(x + 2 + (w * .4), B.Top + 4, w / 3 - 4, 2);
    //    drawRect(x + 2 + (w * .6), B.Top + 4, w / 3 - 4, 2);

    for (let floors = (h / 4); floors > doorHeight; floors--) {
        if (RNDBool()) {
            //            setColor('yellow');
            setColor(windowLight(RNDNum(0, 255)));
        } else {
            setColor('black');
        }
        drawRect(x + 2, B.Top + 4 + floorHeight, w / 3 - 4, 2);

        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
            //            setColor(lightcolor);
        } else {
            setColor('black');
        }




        drawRect(x + 2 + (w * .2), B.Top + 4 + floorHeight, w / 3 - 4, 2);
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
            //             setColor(lightcolor);
        } else {
            setColor('black');
        }
        drawRect(x + 2 + (w * .4), B.Top + 4 + floorHeight, w / 3 - 4, 2);
        if (RNDBool()) {
            setColor(windowLight(RNDNum(0, 255)));
            //              setColor(lightcolor);
        } else {
            setColor('black');
        }
        drawRect(x + 2 + (w * .6), B.Top + 4 + floorHeight, w / 3 - 4, 2);

        floorHeight += 4;

        if (B.top + 4 + floorHeight >= GD.horizonY - 100) {
            floors = -100;
        }



    }





    //console.log(`BTOP-${(GD.horizonY - h)}`);
    if (GD.horizonY - h <= 50) {

        // un-hardcode color for twinkle:
        // airplane saftey lights:
        fillCircle(x + (w * .1), bTop, w / 15, 'red');
        fillCircle(x + (w * .5), bTop, w / 15, 'red');
        fillCircle(x + (w * .9), bTop, w / 15, 'red');

        fillCircle(x + (w * .1), bTop, w / 25, 'white');
        fillCircle(x + (w * .5), bTop, w / 25, 'white');
        fillCircle(x + (w * .9), bTop, w / 25, 'white');
    }
}


function windowLight(val = '50') {
    return `rgba(255,255,${val},1)`;
}
