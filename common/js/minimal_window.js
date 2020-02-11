// opens the 'popout' browser form with a url.  a minified browser window.

let idnum = 0;

function openMinWindow(requrl) {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

    
    
    open(requrl, `minwin${idnum}`, params);
    idnum++;
}

function openMinWindowId(requrl = '/', reqid = 'test2') {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

    open(requrl, `minwin${idnum}`, params);
    idnum++;
}

console.log(`[common/js/minimal_window.js][loaded]`);