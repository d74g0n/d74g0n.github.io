/*
Text to speech / spech recognition is one unit.
official -> https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

grumpy user notes:
- https required for mic access 
- popups have to be allowed before it can be used to open windows by voice command
- needs help screen by saying help



debugger notes:
- redunancy on say
- has to be mouseclickon body to activate responses since 2018
- 17 voices to date.

refactor considerations:

break up scripts into components from sense perspective hear>say.
hear.js - initialize all the components
speak.js - if initialized speak components. (almost none)

speechprocessor.js - 



*/


let Alfred = {
    face: document.getElementById('face'),
    frame: 0,
    tick: function () {
        this.frame++;
        if (this.frame > 360) {
            this.frame = 0;
        }
    },
    isTalking: false,
    voice: 4,
}
const Al = Alfred;


// -=-=-=-=-=-=- Settings::
let isRepeatingYou = false;
// -=-=-=-=-=-=- Parse Speech::
function ParseSentance(sentance) {
    sentance += ' ';
    let wordlist = [];
    let word = new String();

    for (i = 0; i < sentance.length; i++) {
        if (sentance[i] == ' ') {
            wordlist.push(word);
            word = '';
        } else {
            word += sentance[i];
            // console.log('[parsing]:[' + word + ']');
        }
    }
    // console.log('[wordlist]:' + wordlist);
    ParseWords(wordlist);
    //    return wordlist;
}

function ParseWords(wordlist = undefined) {
    if (!wordlist) {
        wordlist = ['nowordlist'];
        console.log('[CommandParser][ERROR:WORDLIST]');
    }

    for (i = 0; i < wordlist.length; i++) {
        let word = wordlist[i];
        if (i < wordlist.length - 1) {
            commands(wordlist[i], wordlist[i + 1]);
        } else {
            commands(wordlist[i]);
        }
    }

}

function commands(word, nextword) {

    function OpenSomething(nextword) {

        switch (nextword.toLowerCase()) {
            case 'fox':
                _QLinks.OpenFox();
                break;
            case 'argus':
                _QLinks.OpenArgus();

                break;
            default:
                console.log('[word][' + word + '][NOMATCH]');
        }

    }

    if (word == 'open') {
        OpenSomething(nextword.toLowerCase());
    }

    if (word == 'close' && nextword == 'all') {
        speak("here we go");
        _QLinks.CloseAll();
    }

    if (word == 'thank' && nextword == 'you') {
        speak("you are welcome");
    }

    if (word == 'hello') {
        speak("Hello to you to");
    }

    if (word) {
        Al.isTalking = true;
        if (Al.voice <= 0){
            var voices = window.speechSynthesis.getVoices();
            Al.voice = voices.length-1;
            
        }
//        msg.voice = voices[Al.voice--];
        //-=-=-=-=-=-=-=-=-=-=-=-=-=- EXPERIEMENTAL
        Al.voice--;        
        console.log(`Al.voice${Al.voice}`);
        speak(word);
        DelayisTalkingFalse(1);
    }

}

function URLinTAB(url) {
    return window.open(url, '_blank');
}

function URLinNEWWINDOW(url = 'http://d74g0n.com', windowName = 'newWindow', windowFeatures) {
    window.open(url, windowName, windowFeatures);
}

// https://en.wikipedia.org/w/index.php?search=Book+of+Revelation&title=Special%3ASearch&profile=advanced&fulltext=1&advancedSearch-current=%7B%22namespaces%22%3A%5B0%5D%7D&ns0=1

let _QLinks = {
    ArgusWindow: undefined,
    FoxWindow: undefined,
    OpenFox: function () {
        _QLinks.FoxWindow = window.open('http://usnewslive.tv/foxnewslive/', "___FOX");
    },
    OpenArgus: function () {
        _QLinks.ArgusWindow = window.open('http://d74g0n.github.io/', "___ARGUS");
    },
    OpenEDM: function () {
        //        https://www.youtube.com/watch?v=pbYywV8fgag&feature=youtu.be&list=RDzSKF_YCsbCs


    },
    OpenKodi: function () {
        //        window.open('http://192.168.0.20:8080/', 'KodiRemote', "width=200,height=100");
        //        _QLinks.KodiWindow = window.open('http://192.168.0.20:8080/', 'KodiRemote', "toolbar=no,scrollbars=yes,resizable=no,top=-800,left=-100,width=800,height=600,menubar=no");

        //        _QLinks.KodiWindow = window.open("http://192.168.0.20:8080/", "___KodiRemote", "fullscreen=yes");

        _QLinks.KodiWindow = window.open("http://192.168.0.20:8080/", "___KodiRemote", "resizable=yes, scrollbars=yes, titlebar=yes, width=800, height=900, top=0, left=0");

        //        _QLinks.KodiWindow = window.open('http://google.com', 'Google', "toolbar=no,scrollbars=yes,resizable=no,top=-200,left=-100,width=800,height=600,menubar=no");
        //        URLinNEWWINDOW('http://192.168.0.20:8080/', 'KodiRemote', 'fullscreen=1');
    },
    CloseKodi: function () {
        if (_QLinks.KodiWindow) {
            _QLinks.KodiWindow.close();
        }
    },
    CloseAll: function () {
        if (_QLinks.ArgusWindow) {
            _QLinks.ArgusWindow.close();
        }
        if (_QLinks.FoxWindow) {
            _QLinks.FoxWindow.close();
        }


    },
}
// -=-=-=-=-=-=- Speech to Text::

try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    //    console.log(recognition);
    recognition.continuous = true;
    listenNow();
    //    recognition.start(); // NEW NEW
} catch (e) {
    console.error(e);
}

function listenNow() {
    //    speak("ah yes, I can hear you");
    recognition.start();
}

//document.body.onclick = listenNow();

function StopListening() {
    //    speak("I will stop listening now");
    recognition.stop();
}



function htmlReadouts(msg) {
    msg = msg + '<br>';
    document.getElementById('readout').innerHTML += msg;
}

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function (event) {

    Al.isTalking = true;

    //    console.log(event);
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var confidence = event.results[current][0].confidence;

    //    document.transcript = transcript;

    htmlReadouts('<h5 id="confidenceReadout">[' + (confidence * 100).toFixed(2) + '%]</h5> ' + transcript + ' ');
    //    htmlReadouts('<h5 id="confidenceReadout">[' + (confidence * 100).toFixed(2) + '%]</h5>[ ' + transcript + ' ]');
    //    htmlReadouts('<h5>[' + (confidence * 100).toFixed(2) + '%]</h5>[ ' + transcript + ' ]');
    //    document.getElementById('readout').innerHTML += '<br>' + '<p id="hearing">' + transcript + '</p>';



    if (transcript[0] == ' ') {
        transcript = transcript.slice(1);
        ParseSentance(transcript);
    } else {
        ParseSentance(transcript);
    }

    console.log('[' + (confidence * 100).toFixed(2) + '%][' + transcript + ']');

    if (isRepeatingYou) {
        speak(transcript);
    }


    DelayisTalkingFalse(1);


};

function DelayisTalkingFalse(sec = 1) {
    {

        if (sec > 2) {

        } else {
            sec *= 1000;
        }

        // THIS IS THE TURN OFF FLICKER
        setTimeout(function () {
            Al.isTalking = false;
        }, sec);
    }
}


recognition.onsoundstart = function () {
    console.log('Some sound is being received');

    Al.isTalking = true;
    DelayisTalkingFalse(2);
}

recognition.onstart = function () {
    document.title = 'Alfred [Listening]';
    console.log('[listening]');
}

recognition.onspeechend = function () {
    document.title = 'Alfred [sleeping]';
    //    speak("Going to sleep now.");
    console.log('[sleeping]');
    setTimeout(listenNow, 1000);
}

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        //        speak("I hear nothing");
        console.log('No speech was detected. Try again.');
        setTimeout(listenNow, 1000);
    };
}
// -=-=-=-=-=-=- Text to Speech::

function speak(message) {
    var msg = new SpeechSynthesisUtterance(message);
    var voices = window.speechSynthesis.getVoices();
    //    console.log(voices);
    msg.voice = voices[Al.voice];
    
    Al.isTalking = true;
    window.speechSynthesis.speak(msg);
    DelayisTalkingFalse(1);
    
    console.log(`${message}`);
//    console.log(`click on screen to activate responses`);
}

/*setInterval(function () {
    console.log('called');
    let tester = document.getElementById("speakbtn");
    tester.onclick();


}, 2000);*/


speak("init");
