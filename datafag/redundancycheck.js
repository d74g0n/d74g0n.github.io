// This script holds client redundancy and the time element.

// New:
let isDebugging = false;
let deltalist = [];

var messageul = document.getElementById("messages");
var msglist = [];
document.getElementById("RDCheck").checked = true;

var mycounter = 0
var filteron = false; // USED?
let goodies = ["http://pbs.twimg.com/media/D-Zdr1AU0AAg309.png:large"];
let DeltaA = new Date();


function timeReadout(deltamean) {

    timeelm.innerHTML = `[${deltalist.length}]@[${deltamean.toFixed(2)}s]`;
}


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
        let delta = (new Date() - DeltaA) / 1000;
        deltalist.push(delta);

        let deltasum = 0;
        deltalist.forEach(function (num) {
            deltasum += num;
        });

        let deltamean = deltasum / deltalist.length;

        if (isDebugging) {
            console.log(`[Last Post:][${delta}s]`);
            console.log(`[PPS]=>[${deltamean.toFixed(2)}s]-of-[${deltalist.length}]`);
        }
        // TIME CODE::

        timeReadout(deltamean);


        //        timeelm.innerHTML = `[${deltalist.length}]-[${deltamean.toFixed(2)}sec]`;

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
