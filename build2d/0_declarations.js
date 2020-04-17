const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');

const bgbuffer = document.getElementById('buffer_background');
const bgctx = bgbuffer.getContext('2d');

const skybuffer = document.getElementById('buffer_skybuild');
const skyctx = skybuffer.getContext('2d');

const viivbuffer =
    document.getElementById('buffer_viiv');
const viivctx = viivbuffer.getContext('2d');
let level = {
    h: 512,
    w: 1024,
};

let buffers = {
    output: canvas,
    bg: bgbuffer,
    sky: skybuffer,
    viiv: viivbuffer,
    tbd_tint: undefined,
};

function buffer_properties() {
    canvas.width = 512;
    canvas.height = 256;
    canvas.style.background = 'transparent';

    buffers.bg.width = level.w;
    buffers.bg.height = level.h;
    buffers.bg.style.background = 'red';

    skybuffer.width = buffers.bg.width;
    skybuffer.height = buffers.bg.height;
    skybuffer.style.background = 'transparent';

    buffers.viiv.width = 64;
    buffers.viiv.height = 64;
    buffers.viiv.style.background = 'white';


}
buffer_properties();

function debugMsging(msg) {
    if (clogging) {
        console.log(msg);
    }
}

const clog = debugMsging;