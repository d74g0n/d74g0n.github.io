//function Monotone(val) {
//    return `rgba(${val},${val},${val},1)`;
//}
function Monotone(val) {
    return `rgba(${255-val},${255-val},${255-val},1)`;
}

function rainbowLines(val, modu = 20) {
    let modval = Math.floor(val);
    //    console.log(`floorVal: ${modval}`);

    function rainbow(flooredval) {
        let modval = flooredval;
        let val = modval;
        if (modval < 25) {
            return setColor(`rgba(${val},0,0,1)`);
        }

        if (modval < 50) {
            return setColor(`rgba(0,${val},0,1)`);
        }

        if (modval < 75) {
            return setColor(`rgba(0,0,${val},1)`);
        }

        if (modval < 100) {
            return setColor(`rgba(${val},0,0,1)`);
        }

        if (modval < 125) {
            return setColor(`rgba(0,${val},0,1)`);
        }

        if (modval < 150) {
            return setColor(`rgba(0,0,${val},1)`);
        }

        if (modval < 175) {
            return setColor(`rgba(${val},0,0,1)`);
        }

        if (modval < 200) {
            return setColor(`rgba(0,${val},0,1)`);
        }

        if (modval < 225) {
            return setColor(`rgba(0,0,${val},1)`);
        }

        if (modval < 250) {
            return setColor(`rgba(0,0,${val},1)`);
        }

    }




    if (modval % modu == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } else {
        rainbow(modval);
    }

    if (modval % modu + 1 == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } else {
        rainbow(modval);
    }

    if (modval % modu - 1 == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } else {
        rainbow(modval);
    }

}


function contourLines(val, modu = 20) {

    let modval = Math.floor(val);
    //    console.log(`floorVal: ${modval}`);

    if (modval % modu == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } 

    if (modval % modu + 1 == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } 

    if (modval % modu - 1 == 0) {
        return setColor(`rgba(0,0,0,1)`);
    } 


    return setColor(`rgba(${val/2},0,0,1)`);


}


function stepHue(step, hex = `0000EE`) {
    step *= 1.4;
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if (max == r && g >= b) {
            h = 1.0472 * (g - b) / d;
        } else if (max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if (max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if (max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }
    h = h / 6.2832 * 360.0 + 0;
    h += step; // Number to play with.
    if (h > 360) {
        h -= 360;
    }
    h /= 360;
    if (s === 0) {
        r = g = b = l;
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 | rgb).toString(16).substring(1).toUpperCase();
}


function colorValue(val) {
    if (val < 50) { // Ocean bottom
        return `rgba(0,0,${val*0.7},1)`;
    }

    if (val < 100) {
        //        return `rgba(0,0,${val},0.9)`;
        return `rgba(0,0,${val*1.5},1)`;
    }

    if (val > 100 && val < 110) { // BEACH ZONE
        return `rgba(255,255,${val*1.5},1)`;
    }

    if (val < 150) { // GRASSLAND
        //        return `red`;
        //        return `rgba(${val/2},${val*0.9},0,1)`;
        //        return `rgba(${(val*0.2)},${val*0.9},0,1)`;
        return `rgba(${(val*0.2)},${val*1.1},0,1)`;
    }

    if (val < 180) { // GRASSLA ND2
        //        return `red`;
        //        return `rgba(${val/2},${val*0.9},0,1)`;
        return `rgba(${val+(val*0.2)},${val*0.9},0,1)`;
    }

    if (val > 180 && val < 200) { // MNT ZONE
        //        return 'white';
        return `rgba(${255-val*1.1},${255-val*1.1},${255-val*1.1},1)`;
    }

    if (val < 250) { // MNT PEAK
        //        return 'red';
        //        return `rgba(${255-val},${255-val},${255-val},0.9)`;
        return `rgba(${255-val*0.5},${255-val*0.5},${255-val*0.5},1)`;
    }

    return 'white';
}
