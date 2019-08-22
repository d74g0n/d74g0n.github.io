let Pal = {
    wall: 'white',
    //    ceiling: '#fdffd9',
    ceiling: '#4d4d4d',
    //    floor: '#876e2f',
    floor: '#674e0f',
    wood: 'brown',
}

let RoomProps = {
    width: canvas.width,
    height: canvas.height,
    ceiling: {
        top: 0,
        height: 50,
    },
    floor: {
        height: 180,
    },
    computer: {
        lightT: false,
        lightB: true,
        blinkmodolo: 10,
    },
    tv: {
        isOn: true,
        modolo: 60,
        gradient: undefined,
    }

}
const RP = RoomProps;

let Global = {
    paths: {
        desk: `/games/bookinBasement/img/deska.png`,
        book: `/games/bookinBasement/img/booka.png`,
        bookshelf: `/games/bookinBasement/img/bookshelfd.png`,
        trashf: `/games/bookinBasement/img/trashf.png`,
        trashe: `/games/bookinBasement/img/trashe.png`,
        couch: `/games/bookinBasement/img/couchd.png`,
        tv: `/games/bookinBasement/img/televisiontop.png`,
        speecha: `/games/bookinBasement/img/speecha.png`,
        arta: `/games/bookinBasement/img/arta.png`,
    },
    images: {
        desk: undefined,
        book: undefined,
        bookshelf: undefined,
        trashf: undefined,
        trashe: undefined,
        couch: undefined,
        tv: undefined,
        speecha: undefined,
        arta: undefined,
    },
};
const G = Global;

function BlinkComputerLights(frame) {

    function blink(frame) {
        if (frame % RP.computer.blinkmodolo == 0) {
            RP.computer.lightT = !RP.computer.lightT;
            RP.computer.lightB = !RP.computer.lightB;
        }

        if (RP.computer.lightT) {
            fillCicle(212, 504 - RP.floor.height, 1, 'red');
        } else {
            fillCicle(212, 504 - RP.floor.height, 1, 'black');
        }

        if (RP.computer.lightB) {
            fillCicle(212, 508 - RP.floor.height, 1, 'red');
        } else {
            fillCicle(212, 508 - RP.floor.height, 1, 'black');
        }
    }

    blink(frame);
}


function drawRoomBase(Xoffset = 0, Yoffset = 0) {
    // ceiling::    
    setColor(Pal.ceiling);
    drawRect(0 + Xoffset, RP.ceiling.top, canvas.width - Xoffset, RP.ceiling.height +
        Yoffset);

    //floor:
    setColor(Pal.floor);
    drawRect(0 + Xoffset, canvas.height - RP.floor.height + (Yoffset * 2), canvas.width - Xoffset, RP.floor.height - (Yoffset * 2));

    //wall::
    setColor(gradientV('rgba(150,150,100,0.9)', 'rgba(70,70,30,1)', 'rgba(0,0,0,0.9)'));
    drawRect(0 + Xoffset, RP.ceiling.top + RP.ceiling.height + Yoffset, canvas.width - Xoffset, canvas.height - RP.floor.height - RP.ceiling.height + Yoffset);
}

drawRoomBase();




function loadImage(path, id) {
    function setspritesheet() {
        Global.images[id] = this;
    }
    let image = new Image(); // Using optional size for image
    image.onload = setspritesheet;
    image.src = path;
    return image;
}

// SO MUCH SIZE REDUCTION NEEDED ON IMAGES OOPH!
Global.images.desk = loadImage(Global.paths.desk, `desk`);
Global.images.book = loadImage(Global.paths.book, `book`);
Global.images.bookshelf = loadImage(Global.paths.bookshelf, `bookshelf`);
Global.images.couch = loadImage(Global.paths.couch, `couch`);
Global.images.trashf = loadImage(Global.paths.trashf, `trashf`);
Global.images.trashe = loadImage(Global.paths.trashe, `trashe`);
//Global.images.tv = loadImage(Global.paths.tv, `tv`);
Global.images.speecha = loadImage(Global.paths.speecha, `speecha`);
Global.images.arta = loadImage(Global.paths.arta, `arta`);



function drawPropLayer() {

    // wall details
    function PlaceWallDetails() {
        // RP.floor.height is the Yoffset essentially;
        setStrokeColor('rgba(70,70,30,0.5)');
        drawline(70, canvas.height - RP.floor.height, 69, RP.ceiling.height); // VertLine - Walls Intersecting
        setStrokeColor('rgba(70,70,30,1)');
        ctx.lineWidth = 4;
        drawline(70, 408 - RP.floor.height, canvas.width, 408 - RP.floor.height);
        drawline(70, 408 - RP.floor.height, 0, 422 - RP.floor.height);


        // BASEBOARD TRIM
        ctx.lineWidth = 8;
        setStrokeColor('rgba(200,200,170,0.9)');
        drawline(70, canvas.height - RP.floor.height, canvas.width, canvas.height - RP.floor.height);
        ctx.lineWidth = 1;
        setStrokeColor('black');
        drawline(70, canvas.height - RP.floor.height-2, canvas.width, canvas.height - RP.floor.height-2);
    }
    PlaceWallDetails();

    function PlacePainting() {
        ctx.rotate(0.02);
        superdrawImage(Global.images.arta, 0, 0, 132, 74, 255, 305 - RP.floor.height, 128, 64);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    PlacePainting();

    superdrawImage(Global.images.trashe, 0, 0, 512, 512, 355, 455 - RP.floor.height, 64, 64);
    superdrawImage(Global.images.bookshelf, 0, 0, 256, 256, 150, 400 - RP.floor.height, 75, 108);

    // desk (ontop of bookshelf and trashe/f)
    superdrawImage(Global.images.desk, 0, 0, 256, 256, 200, 355 - RP.floor.height, 200, 200);


    //    setColor('blue');

    // TV SCREEN::
    //    setColor(gradientH());
    function PlaceTV() {

        if (RP.tv.isOn){
        
        if (RP.tv.gradient == undefined || frame % RP.tv.modolo == 0){
            RP.tv.gradient = gradientH(RNDHexColor(), RNDHexColor(), RNDHexColor());
        }
                
        setColor(RP.tv.gradient);
//        setColor(gradientH(RNDHexColor(), RNDHexColor(), RNDHexColor()));
     
        GlobalAlpha(frame/150);
        drawRect(150, 360 - RP.floor.height, 50, 36);
        GlobalAlpha(1);
        }else {
             setColor('black');
            drawRect(150, 360 - RP.floor.height, 50, 36);
        }
        
//        superdrawImage(Global.images.tv, 0, 0, 1248, 808, 145, 355 - RP.floor.height, 85, 50);
    }
    PlaceTV();
    
    
    drawImage(Global.images.couch, -70, 430 - RP.floor.height, 256, 256);


//    superdrawImage(Global.images.speecha, 0, 0, 600, 147, 30, 415 - RP.floor.height, 128, 32);

    
//    writeText(`I am book!`, 55, 418 - RP.floor.height, '18px serif', Pal.floor, Pal.ceiling, 'top', 'left');

    //    writeText(`The Book In The Basement`, canvas.width / 2, 270 - RP.floor.height, '38px serif', Pal.floor, Pal.ceiling, 'top', 'center');

    superdrawImage(Global.images.book, 0, 0, 128, 128, 5, 455 - RP.floor.height, 64, 64);

}


