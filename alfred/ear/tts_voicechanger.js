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


class TTS_Voice_Changer {
    constructor(voicenum = 4, element) {
        this.id = 'voice changer';
        this.voicenum = voicenum;
        this.element = element;

        this.init();
    }

    nextVoice() {
        this.voicenum++;
    }

    lastVoice() {
        this.voicenum--;
    }

    listenNow() {
        recognition.start();
    }

    StopListening() {
        recognition.stop();
    }

    speak(message) {
        this.element.innerHTML = message;
        var msg = new SpeechSynthesisUtterance(message);
        var voices = window.speechSynthesis.getVoices();
        console.log(voices);
        msg.voice = voices[this.voicenum];

        window.speechSynthesis.speak(msg);

        console.log(`${message}`);
        //    console.log(`click on screen to activate responses`);
    }

    init() {
        try {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            var recognition = new SpeechRecognition();
            recognition.continuous = true;
            this.listenNow();
        } catch (e) {
            console.error(e);
        }

        recognition.onsoundstart = function () {
            console.log('Some sound is being received');
        }

        recognition.onstart = function () {
            console.log('[listening]');
        }

        recognition.onspeechend = function () {
            console.log('[sleeping]');
            setTimeout(this.listenNow, 1000);
        }

        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                console.log('No speech was detected. Try again.');
                setTimeout(this.listenNow, 1000);
            };
        }

        recognition.onresult = function (event) {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            var confidence = event.results[current][0].confidence;
            console.log('[' + (confidence * 100).toFixed(2) + '%][' + transcript + ']');
            this.speak(transcript);
        };

        this.speak('TTS has been initialized');
        console.log(`init complete`);

    } // init end





}


//let VC = new TTS_Voice_Changer(4);
