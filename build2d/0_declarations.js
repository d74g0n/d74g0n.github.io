const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');

const bgbuffer = document.getElementById('buffer_background');
const bgctx = bgbuffer.getContext('2d');

const skybuffer = document.getElementById('buffer_skybuild');
const skyctx = skybuffer.getContext('2d');

let level = {
    h: 512,
    w: 1024,
};


let buffers = {
    output: canvas,
    bg: bgbuffer,
    sky: skybuffer,
    tbd_tint: undefined,
};

function buffer_properties() {
    canvas.width = 512;
    canvas.height = 256;
    canvas.style.background = 'transparent';



    //    buffers.bg.width = 1024;
    buffers.bg.width = level.w;
    //    buffers.bg.width = 4056;
    //    buffers.bg.height = 512;
    buffers.bg.height = level.h;
    buffers.bg.style.background = 'red';

    //    skybuffer.width = 512;
    skybuffer.width = buffers.bg.width;
    //    skybuffer.height = 256;
    skybuffer.height = buffers.bg.height;
    skybuffer.style.background = 'transparent';



}
buffer_properties();

//console.log();


function debugMsging(msg) {
    if (isDebugging) {
        console.log(msg);
    }
}

const clog = debugMsging;
