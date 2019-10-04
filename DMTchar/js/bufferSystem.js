let Dbuffer = {
    init: function () {
        console.log(`[Dbuffer.init]`);
    },
    style: {
        w: undefined,
        h: undefined,
        set: function (w = 0, h = 0) {
            Dbuffer.style.w = w;
            Dbuffer.style.h = h;
        },
        setByImage: function (img) {
            buffer.width = img.width;
            buffer.height = img.height;
        },
    },
    create: {
        buffer: function (w, h) {
            //          let buffer = document.createElement('canvas');
            //          let bx = buffer.getContext('2d');
            let buffer = document.createElement('canvas');
            buffer.bx = buffer.getContext('2d');
            return buffer;
        },
        tintbuffer: function (img, tint) {
            return buffer;
        }
    },
    buffer: [],

}
