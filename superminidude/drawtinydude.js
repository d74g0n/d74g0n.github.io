//background('#4D8F5E');

let tinyDude = {
    blocksize: 10,
    shirtcolor: '#393276',
    pantcolor: '#111111',
    haircolor: 'khaki',
    skincolor: '#FFDDAA',
    skincolorShade: '#997A6B',
    purp: '#393276',
}
const td = tinyDude;

let sequences = {
    runfwd: ['f', 'rfrb', 'rfra', 'f', 'rfla', 'rflb'],
    spin: ['f', 'fr', 'r', 'br', 'b', 'bl', 'l', 'fl'],
    runleft: ['l', 'rldd', 'rlcc', 'l', 'rlbb', 'rlaa'],
    runright: ['r', 'rrdd', 'rrcc', 'r', 'rrbb', 'rraa'],
    runaway: ['b', 'raaa', 'rabb', 'b', 'racc', 'radd'],
    //     runright: ['r','rraa','rrbb','r','rrcc','rrdd'],
}
const ani = sequences;


/*
All the functions to draw the tiny guy are here.
namenclature after 8 point compass

BlackLeft B BackRight
   Left ->|<- Right
  FwdLeft F FwdRight

    BL B BR
     L 0 R
    FL F FR

todo: 
- colors for forground and background.  Arms swung back are darker (hueshift but literal shader)
- joystick

- perlin noise cityscape

*/

// unused:
function forwardHair(x, y) {
    // my hair
    setColor(td.haircolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 3.2, td.blocksize * 3, td.blocksize * 3);
    setColor(td.shirtcolor);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}
// RUN FORWARD ANIMATION FRAMES:
function forwardRunAR(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    //    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 2, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);

    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
}

function forwardRunAL(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 1, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 4, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 1, td.blocksize);
    drawSquare(x + td.blocksize * 1, y - td.blocksize, td.blocksize);

    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
}

function forwardRunBR(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 2, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);

    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
}

function forwardRunBL(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    //    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 1, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 4, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 1, td.blocksize);
    drawSquare(x + td.blocksize * 1, y - td.blocksize, td.blocksize);

    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
}
// RUN LEFT ANIMATION FRAMES:
function RunLeftA(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2.5, y + td.blocksize * 1, td.blocksize);
    drawSquare(x + td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    // left Arm
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize * 3, td.blocksize * 2);
    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize, td.blocksize);
}

function RunLeftB(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    drawSquare(x + td.blocksize * 0.5, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize * 3, td.blocksize * 2);
    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize, td.blocksize);
}

function RunLeftC(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 1.5, y + td.blocksize * 2, td.blocksize);
    //right leg:
    drawSquare(x + td.blocksize * 0.5, y + td.blocksize * 1, td.blocksize);
    //    // right Arm
    //    drawSquare(x + td.blocksize * 0.5, y - td.blocksize*2, td.blocksize);
    //    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize * 3, td.blocksize * 2);
    //left hand
    //    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x - td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}

function RunLeftD(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2.5, y + td.blocksize * 1, td.blocksize);
    //right leg:
    drawSquare(x + td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    // head
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize * 3, td.blocksize * 2);
    //left hand
    drawSquare(x - td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}
// RUN RIGHT ANIMATION FRAMES:
function RunRightA(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2.5, y + td.blocksize * 1, td.blocksize);
    drawSquare(x + td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 3, td.blocksize * 2);
    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
}

function RunRightB(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 1.5, y + td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 0.5, y + td.blocksize * 1, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 3, td.blocksize * 2);
    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
}

function RunRightC(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2.5, y + td.blocksize * 1, td.blocksize);
    //right leg:
    drawSquare(x + td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    //    // right Arm
    //    drawSquare(x + td.blocksize * 0.5, y - td.blocksize*2, td.blocksize);
    //    drawSquare(x + td.blocksize * 1.5, y - td.blocksize, td.blocksize);
    // head
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 3, td.blocksize * 2);
    //left hand
    //    setColor(td.skincolorShade); // SHADEME! REFACTOR INTO FUNCTION THAT MATHS COLOR DARKER
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}

function RunRightD(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2.5, y + td.blocksize * 1, td.blocksize);
    //right leg:
    drawSquare(x + td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize);
    // head
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 3, td.blocksize * 2);
    //left hand
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}
// RUN AWAY ANIMATION FRAMES:
function runAwayA(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:

    // left leg:
    setColor(td.skincolor);
    //    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    //    drawSquare(x - td.blocksize * 4, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);
}

function runAwayB(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:

    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    //    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    //    drawSquare(x - td.blocksize * 4, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 2, td.blocksize);
    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);
}

function runAwayC(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:

    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    //    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 4, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 1, td.blocksize);
    //    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);
}

function runAwayD(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:

    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    //    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize * 2, td.blocksize);
    drawSquare(x - td.blocksize * 4, y - td.blocksize, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize * 1, td.blocksize);
    //    drawSquare(x + td.blocksize * 3, y - td.blocksize, td.blocksize);
}
// CORE STILL FRAMES:
// Core Facing:
function forwardFacing(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 4, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize, td.blocksize);
    drawSquare(x + td.blocksize * 3, y, td.blocksize);

    if (false) {
        forwardHair(x, y);
    }

    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    facemask(x - td.blocksize, y - td.blocksize * 3);
}
// Core Back:
function backFacing(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 4, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y - td.blocksize, td.blocksize);
    drawSquare(x + td.blocksize * 3, y, td.blocksize);
}
// Core Forward Right:
function forwardRightFacing(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 2, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 3, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 2, y, td.blocksize);
    // head
    setColor(td.skincolor);
    drawSquare(x, y - td.blocksize * 3, td.blocksize * 2);
}
// Core Forward Left:
function forwardLeftFacing(x, y) {
    //AKA FACING CAMERA 
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    //                drawSquare(x - td.blocksize * 3, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 3, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 1, y - td.blocksize, td.blocksize);
    drawSquare(x + td.blocksize * 2, y, td.blocksize);
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y - td.blocksize * 3, td.blocksize * 2);
}
// Core Back right:
function backRightFacing(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    // drawSquare(x - td.blocksize * 2, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 3, y, td.blocksize);
    // right Arm
    drawSquare(x + td.blocksize * 1, y - td.blocksize, td.blocksize);
    drawSquare(x + td.blocksize * 2, y, td.blocksize);

}
// Core Back left:
function backLeftFacing(x, y) {
    // head
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y - td.blocksize * 3, td.blocksize * 2);
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 2, y - td.blocksize * 2, td.blocksize * 4, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 2, y + td.blocksize * 1, td.blocksize * 4, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 2, y + td.blocksize * 2, td.blocksize);
    // right leg:
    // setColor(td.skincolor);
    drawSquare(x + td.blocksize * 1, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 2, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 3, y, td.blocksize);
    // right Arm
    //    drawSquare(x + td.blocksize * 1, y - td.blocksize, td.blocksize);
    drawSquare(x + td.blocksize * 2, y, td.blocksize);
}
// Core Left
function leftFacing(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 0.5, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y, td.blocksize);
    // head
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize * 3, td.blocksize * 2);
}
// Core Right
function rightFacing(x, y) {
    // shirt:
    setColor(td.shirtcolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 2, td.blocksize * 3, td.blocksize * 3);
    // pants:
    setColor(td.pantcolor);
    drawRect(x - td.blocksize * 1.5, y + td.blocksize * 1, td.blocksize * 3, td.blocksize * 1);
    // Skin Color things:
    // left leg:
    setColor(td.skincolor);
    drawSquare(x - td.blocksize * 0.5, y + td.blocksize * 2, td.blocksize);
    // left Arm
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
    drawSquare(x - td.blocksize * 0.5, y, td.blocksize);
    // head
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize * 3, td.blocksize * 2);
    //    only head moves from left to right
}


function facemask(x, y) {
    let fg = new Image();
//    fg.width = td.blocksize / 2;
//    fg.height = td.blocksize / 2;
//    fg.src = "/common/img/punisher_black.png";
    fg.src = "/common/img/punisher_med_white.png";
    fg.onload = function () {
        ctx.globalAlpha = 0.1;
        ctx.drawImage(this, x-td.blocksize*0.25, y,td.blocksize*2.5,td.blocksize*2);
        ctx.globalAlpha = 1;
        
    }
}
//
//        fg = new Image();
////        fg.src = 'http://uncc.ath.cx/LayerCake/images/16/3.png';
////        fg.src = "/common/img/skull.png";
////        fg.src = "/common/img/punisher_med_white.png";
//        fg.src = "/common/img/punisher_black.png";
