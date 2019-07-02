// New:
const isDebugging = false;
let deltalist = [];


var messageul = document.getElementById("messages");
var msglist = [];
document.getElementById("RDCheck").checked = true;
//addtoarray("hello world");

var mycounter = 0

var filteron = false;// USED?

let goodies = ["http://pbs.twimg.com/media/D-Zdr1AU0AAg309.png:large"];

let clownfilter = ["http://pbs.twimg.com/media/D-cQSmnW4AAzDUB.jpg:large", "http://pbs.twimg.com/media/D-cQgF1XYAAljiV.jpg:large", "http://pbs.twimg.com/media/D-cOxvIUYAALjrR.jpg:large", "http://pbs.twimg.com/media/D-cS4sXUYAA5mRj.jpg:large", "http://pbs.twimg.com/media/D-bpW07XYAAl-kL.jpg:large", "http://pbs.twimg.com/media/D-biP4-XsAAaM3s.jpg:large", "http://pbs.twimg.com/media/D-cUzWYXsAAKd77.jpg:large", "http://pbs.twimg.com/tweet_video_thumb/D-buDN-X4AE-UED.jpg:large", "http://pbs.twimg.com/media/D-cVTUBU0AAidSc.jpg:large", "http://pbs.twimg.com/tweet_video_thumb/D-cVYHhU8AAkI_B.jpg:large", "http://pbs.twimg.com/media/D-cV7PbXsAAz7Vf.jpg:large", "http://pbs.twimg.com/media/D-Zm4yvW4AAs9KH.jpg:large", "http://pbs.twimg.com/media/D-cZOkEUIAMQFF3.jpg:large", "http://pbs.twimg.com/media/D-cZ8x7UEAAy50A.jpg:large", "http://pbs.twimg.com/media/D-cajUEVUAAdasD.jpg:large", "http://pbs.twimg.com/tweet_video_thumb/D-cdVn3XUAEPeQz.jpg:large", "http://pbs.twimg.com/tweet_video_thumb/D-cdocBW4AAxBNE.jpg:large","http://pbs.twimg.com/tweet_video_thumb/D-b0z38WsAAePIw.jpg:large","http://pbs.twimg.com/media/D-cQyK7X4AALOtv.jpg:large","http://pbs.twimg.com/media/D-cWkLqWkAAkU3k.jpg:large","http://pbs.twimg.com/media/D-ZRXeAW4Ac3X-x.jpg:large","http://pbs.twimg.com/media/D-ceUtpUEAEHIK-.png:large","http://pbs.twimg.com/media/D-cfrwjUYAIv0v1.jpg:large","http://pbs.twimg.com/media/D-AsVFBWsAAXjT1.jpg:large","http://pbs.twimg.com/media/D-ajM3zXUAAa7it.jpg:large","http://pbs.twimg.com/media/D-cpYFOU0AA3kCe.jpg:large"];

let pornfilter = ["http://pbs.twimg.com/media/D-chLHZUYAARUGP.jpg:large","http://pbs.twimg.com/ext_tw_video_thumb/1145909414001434624/pu/img/QG7rD968GRxEBQrj.jpg:large"];

let DeltaA = new Date();



function addtoarray(data) {

    msglist.unshift(data);

}

function isIteminArray(item, arrayData) {
    // this function is returning true or false for match; that is nested in a != conditional for posting html.
    // reset variables:
    let matched = false;
    let matchtype = undefined;
    let testline = undefined;
    // mark time:
    
    
    
    if (DeltaA) {
        let delta = (new Date() - DeltaA)/1000;
        deltalist.push(delta);
        
        let deltasum = 0;
        deltalist.forEach(function(num){
            deltasum += num;
        });
        
        let deltamean = deltasum / deltalist.length;
        
        console.log(`[Last Post:][${delta}s]`);
        console.log(`[PPS]=>[${deltamean.toFixed(2)}s]-of-[${deltalist.length}]`);
        timeelm.innerHTML = `[${deltalist.length}]-[${deltamean.toFixed(2)}sec]`;
        DeltaA = new Date();
    }
    
    

    if (isDebugging) {
        console.log(`DEBUG->${item.media_url}`);
    }

    for (var i = 0; i < (arrayData.length); i++) {
        //	var testline = arrayData[i].medialink.toString();
        testline = arrayData[i].media_url;
        //var testline = arrayData[i];

        if (testline == item.media_url) {
            matchtype = 'Redundant Data';
            matched = true;
            return true; // checking if this is good.  match is match amirite?

        } else {
            //console.log('NO MATCH DETECTED');
        }
    }

    pornfilter.forEach(function (x) {

        if (x == item.media_url) {
            if (isDebugging) {
                console.log(`PORN: true x:${x} mediaURL:${testline}`);
            }
            matchtype = 'Flakk/GayPorn';
            matched = true;
//            return true;
        }

    });
    
    clownfilter.forEach(function (x) {

        if (x == item.media_url) {
            if (isDebugging) {
                console.log(`CLOWNFILTER: true x:${x} mediaURL:${testline}`);
            }
            matchtype = 'Clown/Low IQ';
            matched = true;
//            return true;
        }

    });



    if (matched) {
        console.log(`[msredunancycheck][Redundant:${matched}]->[${matchtype}]`);
        console.log(`Filtered LINK ->${item.media_url}`);
        return true;
    } else {
        matchtype = 'unique';
        console.log(`[msredunancycheck][Redundant:${matched}]->[${matchtype}]`);
        return false;
    }
}
