//BL B BR
// L 0 R
//FL F FR

function forwardHair(x, y) {
    // my hair
    setColor(td.haircolor);
    drawRect(x - td.blocksize * 1.5, y - td.blocksize * 3.2, td.blocksize * 3, td.blocksize * 3);
    setColor(td.shirtcolor);
    drawSquare(x - td.blocksize * 0.5, y - td.blocksize, td.blocksize);
}

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
}

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
    drawSquare(x - td.blocksize * 2.5, y - td.blocksize*3, td.blocksize * 2);
}

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
    drawSquare(x + td.blocksize * 0.5, y - td.blocksize*3, td.blocksize * 2);
//    only head moves from left to right
}
