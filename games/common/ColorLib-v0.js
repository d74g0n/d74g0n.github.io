// loadable as CONST due to no internal value changes?
global.ColorLibrary = {
    defaultColor: '0x441020',
    getBriteMap: function () {
        let Brightmap = _LEDSTRIP.pixelData.map(function (pdval) {
            return ColorLibrary.getHEXAvg("0x" + (0x1000000 | pdval).toString(16).substring(1));
        });
        return Brightmap;
    },
    Uint2Hex: function (uInt32) {
        return "0x" + (0x1000000 | uInt32).toString(16).substring(1);
    },
    int1Hex: function (inty) {
        //        test in webby
        return inty.toString(16);
    },
    getHEXAvg: function (hex) {
        hex = hex.replace('0x', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        let mean = r + g + b / 3;
        let meanhex = mean.toString(16);
        //        console.log('meanHEX: ' + meanhex);
        //        console.log('meanINT: ' + mean);
        return Math.floor(mean);
    },
    chk255: function (num) {
        // keeps num within 0-255;
        if (num < 0) {
            num = 0;
        }
        if (num > 255) {
            num = 255;
        }
        return num;
    },
    RndInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    RndBool: function () {
        return Math.random() >= 0.5;
    },
    RndHEX: function () {
        return '0x' + Math.floor(Math.random() * 16777215).toString(16);
    },
    RndHEXLimited: function (r = 255, g = 255, b = 255) {
        let mr = ColorLibrary.RndInt(r);
        let mg = ColorLibrary.RndInt(g);
        let mb = ColorLibrary.RndInt(b);
        return ColorLibrary.RGBtoHEX(mr, mg, mb);

    },
    RndGREENHEX: function () {
        //new
        return "0x" +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(ColorLibrary.RndInt(maxval) + minval, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() + '';
    },
    RndREDHEX: function (maxval = 255, minval = 0) {
        //new
        return "0x" +
            ("0" + parseInt(ColorLibrary.RndInt(maxval) + minval, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() + '';
    },
    RndBLUEHEX: function () {
        //new
        return "0x" +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(0, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(ColorLibrary.RndInt(maxval) + minval, 10).toString(16)).slice(-2).toUpperCase() + '';
    },
    RGBtoHEX: function (ra = 0, ga = 0, ba = 0) {
        if (ra < 0) {
            ra = 0;
        }
        if (ga < 0) {
            ga = 0;
        }
        if (ba < 0) {
            ba = 0;
        }
        return "0x" +
            ("0" + parseInt(ra, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(ga, 10).toString(16)).slice(-2).toUpperCase() +
            ("0" + parseInt(ba, 10).toString(16)).slice(-2).toUpperCase() + '';

    },
    HEXtoRGB: function (hex = '0x000000') { // returns rgbobject string 
        hex = hex.replace('0x', '');
        // future::
        // let RGBstr = 'rgb('+parseInt(hex.substring(0, 2), 16)+','+parseInt(hex.substring(2, 4), 16)+','+rgbobject.b = parseInt(hex.substring(4, 6), 16)+')';
        var rgbobject = {};
        rgbobject.r = parseInt(hex.substring(0, 2), 16);
        rgbobject.g = parseInt(hex.substring(2, 4), 16);
        rgbobject.b = parseInt(hex.substring(4, 6), 16);
        return rgbobject;
    },
    stepHue: function (hex = '0x000000', step = 0) {
        hex = hex.replace('0x', '');
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
        return "0x" + (0x1000000 | rgb).toString(16).substring(1).toUpperCase();
    },
    getComplimentary: function (hex = '0x000000') {
        return ColorLibrary.stepHue(hex, 180);
    },
    addColors: function (hexA, hexB) {
        var rgbA = ColorLibrary.HEXtoRGB(hexA);
        var rgbB = ColorLibrary.HEXtoRGB(hexB);
        var r = rgbA.r + rgbB.r;
        var g = rgbA.g + rgbB.g;
        var b = rgbA.b + rgbB.b;
        r = ColorLibrary.chk255(r);
        g = ColorLibrary.chk255(g);
        b = ColorLibrary.chk255(b);
        rgb = b | (g << 8) | (r << 16);
        return "0x" + (0x1000000 | rgb).toString(16).substring(1).toUpperCase();
    },
    subtractColors: function (hexA, hexB = '0x151515') {
        var rgbA = ColorLibrary.HEXtoRGB(hexA);
        var rgbB = ColorLibrary.HEXtoRGB(hexB);
        var r = rgbA.r - rgbB.r;
        var g = rgbA.g - rgbB.g;
        var b = rgbA.b - rgbB.b;
        r = ColorLibrary.chk255(r);
        g = ColorLibrary.chk255(g);
        b = ColorLibrary.chk255(b);
        rgb = b | (g << 8) | (r << 16);
        return "0x" + (0x1000000 | rgb).toString(16).substring(1).toUpperCase();
    },
    mirrorFirstCenter: function (arr) {
        // aka Mirror Reverse
        var end = arr.length;
        for (var i = 0; i < end; i++) {
            arr.unshift(arr[i + i]); // FUCKING MIRROR
        }
        return arr;
    },
    mirrorLastCenter: function (arr) {
        // aka Mirror
        var end = arr.length - 1;
        for (var i = end; i >= 0; i--) {
            arr.push(arr[i]); // FUCKING MIRROR
        }
        return arr;
    },
    Mirror: function (arr) {
        // [1,2] => [1,2,2,1]
        return ColorLibrary.mirrorLastCenter(arr);
    },
    MirrorReverse: function (arr) {
        // [1,2] => [2,1,1,2]
        return ColorLibrary.mirrorFirstCenter(arr);
    },
    RainbowArr: function (step = 10, color = ColorLibrary.defaultColor, len = _LEDSTRIP.ledsOnStrip) {
        let rainbowstrip = [];
        for (i = 0; i < len; i++) {
            color = ColorLibrary.stepHue(color, step);
            rainbowstrip.push(color);
        }
        return rainbowstrip;
    },
    ColorLuminance: function (hex, lum) {

        // validate hex string
//        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        hex = String(hex).replace('0x', '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
//        var rgb = "#",
        var rgb = "0x",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    },
}
