let menustate = {
    isOpen: true,
    isGrabbed: false,
    isLocked: false,
    bankvis: true,
    readout: function () {
//        console.log(`isOpen:${menustate.isOpen}`);
        console.log(`isGrabbed:${menustate.isGrabbed}`);
//        console.log(`bankvis:${menustate.bankvis}`);
    },
    processState: function () {
        if (menustate.isOpen) {

        }
        if (menustate.isGrabbed) {

        }
        if (menustate.isLocked) {
            return 'locked';
        }
    }
}

let devreadout = function () {
    setInterval(menustate.readout,1000);
}

devreadout();


const menu_main = document.getElementById('Menu');

const btnBank = document.getElementById('btnBank');

//const menu_drag = document.getElementById('menu_header');

//const inputChan = document.getElementById('chaninput');



function closeclick() {
    console.log('closeClick');

// check if delta time on grabrelease is long enough!
    
    
    transitionToggle();
    ToggleMenu();
    setbtnBankVis();

//    menustate.readout(); // DEBUGGER
    //    menu_main.style.transition = 'unset';
}


function transitionToggle() {
    menu_main.style.transition = '0.5s';

    setTimeout(function () {
        menu_main.style.transition = 'unset';
    }, 501);
}


function ToggleMenu() {
    //    menu_main.style.transition = '4s ease-in-out 1s';

    
    if (menustate.isOpen) {
        setMenuSmall();
    } else {
        setMenuExpanded();
    }
    
    
}

function setMenuSmall() {
    console.log('setMenuSmall triggered');
    menu_main.style.width = "14px";
    menu_main.style.height = "14px";
    menustate.isOpen = false;
}

function setMenuExpanded() {
    console.log('setMenuSmall triggered');
    menu_main.style.width = "100px";
    menu_main.style.height = "100px";
    menustate.isOpen = true;
}

function setbtnBankVis() {
    //    if (menustate.bankvis) {
    if (!menustate.isOpen) {
        btnBank.style.visibility = 'hidden';
    } else {
        btnBank.style.visibility = 'visible';
    }
//    menustate.bankvis = !menustate.bankvis;
}



    ToggleMenu();
dragElement(menu_main);




function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        console.log('D-header');
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
        //        console.log('D-NONheader');
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
//        menustate.isGrabbed = true;
    }

    function elementDrag(e) {
        menustate.isGrabbed = true;
        
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        menustate.isGrabbed = false;

    }
}

console.log(`drag-loaded`);
