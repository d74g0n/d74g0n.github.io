//BROKEN UNFINISHED STUFF


function createDivTag(id = 'common'){
    let newDiv = document.createElement('DIV');
    newDiv.id = id;
    console.log(newDiv);
    return newDiv;
}



//createDivTag('hello');


let papa = document.getElementById('mything');
//papa.appendChild(createDivTag('datkid'));
console.log(papa);





let parentelm;

function adcreateElement(ParentElmid = undefined, ElmType = 'DIV') {
    //    let newElm = document.createElement("CANVAS");    
    let newElm = document.createElement(ElmType);


    if (document.getElementById(ParentElmid)) {
        parentelm = document.getElementById(ParentElmid);
    } else {
        console.log('[BODY tag used]');
        parentelm = document.body;
    }
    console.log(newElm);

    debugStyle(newElm);

//    parentelm.appendChild(newElm);
    
    document.getElementById('mything').appendChild(newElm);
//    parentelm.appendChild(newElm);

    return newElm;
}

function debugStyle(Elm) {

    Elm.style.border = "2px solid gold";
    Elm.style.width = "50vw";
    Elm.style.background = "red";

    return Elm;


}

//adcreateElement('mything','span');
