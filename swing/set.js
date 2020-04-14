//setup MainCanvas and SetBuildCanvas::

const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
const set_buffer = document.getElementById('Set_Canvas');
const setctx = set_buffer.getContext('2d');

function setup_CanvasSystem() {
    canvas.width = 512;
    canvas.height = 256;
    canvas.style.background = 'red';

    set_buffer.width = 1024;
    set_buffer.height = 512;
    set_buffer.style.background = 'white';
}
setup_CanvasSystem();


function build_set() {
    setctx.fillStyle = "blue";

    setctx.fillRect(0, 0, set_buffer.width, set_buffer.height / 2);
    setctx.fillStyle = "green";
    setctx.fillRect(0, set_buffer.height / 2, set_buffer.width, set_buffer.height / 2);

    setctx.font = "30px Arial";
    //    setctx.fillText('set_buffer', 25, 35);
    setctx.fillText('set_buffer this is a canvas image of the map', 50, set_buffer.height / 2);
}

build_set();

let setPan = 0;

function drawSet(w, h) {
    // draw the set_buffer as an image.
    drawImage(set_buffer, 0, -100);
    //    drawImage(set_buffer, setPan--, -100);
}
