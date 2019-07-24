function keepOnScreen(elmid) {
    
    let elm = document.getElementById(elmid);
    
    
    let properties = {
        left: elm.style.left,
        right: elm.style.right,
        top: elm.style.top,
        bottom: elm.style.bottom,
    }
    
    let p = properties;
    
    if (p.left < 0) {
        p.left = "0px";
    }
}