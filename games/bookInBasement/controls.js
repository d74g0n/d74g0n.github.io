// -=-=-=-=-=-=-=-=-=-=-=-[ declarations ]=-=-=-=-=-=-=-=-=-=-=-=-=
// -=- Main controller object - processed each tick for calculations.
let ControllerState = {
    l: false,
    r: false,
    u: false,
    d: false,
    space: false,
    alt: false,
    ctrl: false,
}
const CS = ControllerState;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
let allInputs = ['LIFE'];

function addInput(val) {
    if (val !== 'Shift') {
        allInputs.push(val);
    }
}

function readOutAllInputs() {
    let compiledInputs;
    allInputs.forEach(function (val) {
        compiledInputs += val;
    });
    return compiledInputs;
}
// -=-=-=- bottlenecking is not an issue; only one event/key is executed/processed at a time
// -=-=- what if I am holding 2 keys at once? = not a problem as aforesaid.
function onControllerPress(val) {
    switch (val) {
        case 68:
            // D code block
            CS.r = true;
            break;
        case 65:
            // A code block
            CS.l = true;
            break;
        case 87:
            // W code block
            CS.u = true;
            break;
        case 83:
            // S code block
            CS.d = true;
            break;
        default:
            // FAIL code block
            console.log(`no case detected`);

    }
}

function onControllerRelease(val) {
    switch (val) {
        case 68:
            // D code block
            CS.r = false;
            break;
        case 65:
            // A code block
            CS.l = false;
            break;
        case 87:
            // W code block
            CS.u = false;
            break;
        case 83:
            // S code block
            CS.d = false;
            break;
        default:
            // FAIL code block
            console.log(`no case detected`);

    }
}

function setCtrlAltState(ev) {
    CS.alt = ev.altKey;
    CS.ctrl = ev.ctrlKey;
}

let debugging = true;

function controllerDebuggingMessanger(ev, id = 'TBA') {
    console.log(ev);
    console.log(`[${id}]ev.key - ${ev.key}`);
    console.log(`[${id}]ev.keyCode - ${ev.keyCode}`);
    console.log(`[${id}]ev.altKey - ${ev.altKey}`);
    console.log(`[${id}]ev.ctrlKey - ${ev.ctrlKey}`);
}
// -=-=-=-=-=-= MAIN IS HERE:
// Entery point of controller KEY DOWN events
function checkControllerStates(ev) {
    if (debugging) {
        controllerDebuggingMessanger(ev, 'KEYON');
    }
    setCtrlAltState(ev);
    onControllerPress(ev.keyCode);
    if (!undefined) {
        addInput(ev.key);
    }
}
// Entery point of controller UP events
function checkControllerUNStates(ev) {
    if (debugging) {
        controllerDebuggingMessanger(ev, 'KEYOFF');
    }
    setCtrlAltState(ev);
    onControllerRelease(ev.keyCode);


}
document.onkeydown = checkControllerStates;
document.onkeyup = checkControllerUNStates;
