function RNDBool(){
    let random_boolean = Math.random() >= 0.5;
    return random_boolean;
}

function RNDNum(min,max){
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    return random;
}
