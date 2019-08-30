let TOSSet = {
    firstHall: [0, 1, 0, 0, 0, 0, 1, 0,2],
    level: [],
    leveldoors: [],
    scale: {
        panel: 204,
    }
}
const SET = TOSSet;

function buildHallway(buildarr = SET.firstHall) {

    let hall = [];

    buildarr.forEach(function (instructs,index) {
        
        let tmppanel = undefined;
        let tmpdoor = undefined;
        let tmpfloor = undefined;
        switch (instructs) {
            case 0:
//                console.log(`push new panel with growing x Offset: ${index}*${SET.scale.panel}=${index*SET.scale.panel}`);
                tmppanel = new TOSPanel(index*SET.scale.panel);
                tmppanel.init();
                hall.push(tmppanel);
                // tmppanel = undefined?
                break;
            case 1:
//                console.log(`create panel, push new door as detail on panel, push panel`);
                tmppanel = new TOSPanel(index*SET.scale.panel);
                tmppanel.init();              
                tmpdoor = new TOSDoor(index*SET.scale.panel);
                tmppanel.detailList.push(tmpdoor);
                hall.push(tmppanel);
                SET.leveldoors.push(tmpdoor);
                // code block
                break;
            case 2:
//                console.log(`FLOOR FIRST`);
                tmpfloor = new TOSfloor();
                hall.unshift(tmpfloor);
                break;
            default:
                console.log(`NOCASE:${instructs}`);
        }
        
        

    });
    return hall;
}

function drawSet(setarr){
    setarr.forEach(function(data,index){
        setarr[index].tick();
    });
}

function setInitialization(){
    SET.level = buildHallway(SET.firstHall);
}


