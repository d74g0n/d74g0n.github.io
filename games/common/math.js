// -=-=- OBJECT VERSION::
const RND = {
    Bool: function () {
        return Math.random() >= 0.5;
    },
    Num: function (min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    Color: {
        Hex: function () {
            return `#${(0x1000000 | (Math.floor(Math.random()*16777215))).toString(16).substring(1).toUpperCase()}`;
        },
        RGB: function () {
            return `rgb(${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))})`;
        },
        RGBA: function (opacity=1){
             return `rgba(${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},opacity)`;
        }
    },
}

// -=-=- REDUNANT::

function RNDBool() {
    let random_boolean = Math.random() >= 0.5;
    return random_boolean;
}

function RNDNum(min, max) {
    var random = Math.floor(Math.random() * (max - min)) + min;
    return random;
}

function RNDHexColor() {
     return `#${(0x1000000 | (Math.floor(Math.random()*16777215))).toString(16).substring(1).toUpperCase()}`;
//    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function RNDRGBColor() {
    return `rgb(${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))})`; 
}

function RNDRGBColor() {
    return `rgba(${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},${Math.floor(Math.random() * (255))},opacity)`;
}
