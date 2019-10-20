const _M = {
    rnd: {
        bool: function () {
            return Math.random() >= 0.5;
        },
        range: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        hex: function () {
            return `#${(0x1000000 | (Math.floor(Math.random()*16777215))).toString(16).substring(1).toUpperCase()}`;
        },
    },
    Perl: {},

} 
