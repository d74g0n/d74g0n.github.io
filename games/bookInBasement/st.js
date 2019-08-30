let StarTrek = {
    colTlite: `#fe7354`,
    colTdark: `#d03926`,
    colMlite: `#b8b7bd`,
    colMdark: `#a4aeba`,
    //    colMdark: `#000000`,
}
const ST = StarTrek;

let qframe = 0;
let qoffset = 0;

function mainLoop() {
    qframe++;

    //  background('#00aeba'); // debug color
    background('#d03926');
    //    DrawHallway(qoffset);
    //    DrawHallway(qoffset);
    floor.drawSelf();
    Panel.drawSelf();
    Panel2.drawSelf();
    door.drawSelf(qframe);
    
//    DrawHallway(-100);

    //looping background stuff:
    if (qframe % 2 == 0) {
        qoffset--;
        if (qoffset <= -204) {
            qoffset = 0;
            console.log(`ani jumped to 0`);
        }
    }
    if (qframe > 100) {
        qframe = 0;
        console.log(`frame reset`);
    }

    requestAnimationFrame(mainLoop);
}

// 0-0-00-0-0 ALL TEMP CLASS WERKS
//let Panel = new TOSPanel(10, 50, 200, 60);
//let Panel2 = new TOSPanel(214, 50, 200, 60); //delta 204x
//Panel.init();
//Panel2.init();
//let door = new TOSDoor(10, 50, 200, 60);
//let floor = new TOSfloor(50);

//Panel.drawSelf();

//mainLoop();

function DrawHallway(xoffset) {
    // function factorish.
    stFlooring();
        stPanel(214);
        stPanel(418);
    doorway();
    //    panelPopper(1 + xoffset, undefined, 200, undefined, 3);

}
//create spacefloor::
function stFlooring() {
    setColor(`pink`);

    function FlooringGradient(y, h) {
        let gradient = ctx.createLinearGradient(0, 352, 0, canvas.height);
        gradient.addColorStop(0, `#d18882`);
        gradient.addColorStop(0.1, `pink`);
        gradient.addColorStop(1, `#d18882`);
        //debugger
        ctx.fillStyle = gradient;
    }

    FlooringGradient();

    drawRect(0, 352, canvas.width, canvas.height);
}
//create spacewall panel::
function stPanel(x = 10, y = 50, w = 200, h = 60) {
    // Top Orange:
    //    setColor(ST.colTlite);

    function TopPanelGradient(y, h) {
        let gradient = ctx.createLinearGradient(0, 200, 0, h);
        gradient.addColorStop(0, ST.colTdark);
        gradient.addColorStop(0.3, ST.colTdark);
        gradient.addColorStop(1, ST.colTlite);
        //debugger
        ctx.fillStyle = gradient;
    }

    function BottomPanelGradient(y, h) {
        let gradient = ctx.createLinearGradient(0, y, 0, h * 4);
        gradient.addColorStop(0, ST.colMdark);
        gradient.addColorStop(0.3, ST.colMdark);
        gradient.addColorStop(1, ST.colMlite);
        //debugger
        ctx.fillStyle = gradient;
    }

    TopPanelGradient(y, h);
    //    setColor(gradientV(ST.colTlite, ST.colTdark, ST.colTlite));
    drawRect(x, y, w, h);
    // lines and details:
    ctx.lineWidth = 4;
    setStrokeColor('black');
    // horz:
    drawline(x, y, x + w, y);
    drawline(x, y + h * 5, x + w, y + h * 5);
    ctx.lineWidth = 6;
    drawline(x + (w / 20), y + h * 5, x + w - (w / 20), y + h * 5);
    // vert:
    ctx.lineWidth = 4;
    drawline(x, y, x, y + h * 5);
    drawline(x + w, y, x + w, y + h * 5);
    // Mid Grey:
    //    setColor(ST.colMlite);
    setColor(BottomPanelGradient(y, h));
    drawRect(x, y + h, w, h * 4);

}

function doorway(x = 10, y = 50, w = 200, h = 60) {
    
    function openness(factor = doorwidth/2.25){
        
        
        if (factor > doorwidth/2.25){
            factor = doorwidth/2.25;
        }

        setColor('rgba(50,50,50,1)');
        drawRect(panelHcenter-factor, doorT, factor*2, doorH-1);
        strokeRect(panelHcenter-factor, doorT, factor*2, doorH-1);
        
    }
    
    
    stPanel(10, 50, 200, 60); // do some nums here

    setStrokeColor('blacks');
    ctx.lineWidth = 2;
    let panelHcenter = x + (w / 2);
    let doorwidth = w - (w * 0.25);
    let doorL = panelHcenter - (doorwidth /2);
    let doorT = y + (h * 2);
    let doorH = h*3;



    setColor('purple');
    drawRect(doorL, doorT, doorwidth, doorH-1);
    strokeRect(doorL, doorT, doorwidth, doorH-1);
    drawline(panelHcenter,doorT,panelHcenter,doorT + doorH-1);
//    strokeRect(50, 50, 200, 250);

    openness(qframe);

}
//create many spacewall panels::
function panelPopper(x = 10, y = 50, w = 200, h = 60, num = 1) {

    for (i = 0; i <= num; i++) {
        stPanel(x, y, w, h);
        x += w + 3.5;
    }
    //stPanel(100, 50, 200, 60);
    //stPanel(301, 50, 200, 60);
    //stPanel(502, 50, 50, 60);
    //stPanel(553, 50, 50, 60);
}
