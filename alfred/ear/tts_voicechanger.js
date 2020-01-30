/*
uses tts as voice changer
-=-=-=-=-=-=-=-
USAGE:
document.onclick = function() {
//    readout.innerHTML = 'begin speaking...';
    let VC = new TTS_Voice_Changer(5, readout);
};
*/

class TTS_Voice_Changer {
    constructor(voicenum, element) {
        this.id = 'voice changer';
        this.voicenum = voicenum;
        this.showConfidence = false;
        this.voices = window.speechSynthesis.getVoices();
        this.element = element;
        this.init();
    }

    nextVoice() {
        this.voicenum++;
    }

    lastVoice() {
        this.voicenum--;
    }

    listenNow(recognition) {
        recognition.start();
    }

    StopListening(recognition) {
        recognition.stop();
    }

    init() {
        const ME = this;
        try {
            var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            var recognition = new SpeechRecognition();
            recognition.continuous = true;
            this.listenNow(recognition);
        } catch (e) {
            console.error(e);
        }

        // for animations and stuff; to trigger when sound starts::
        //        recognition.onsoundstart = function () {
        //            console.log('Some sound is being received');
        //        }

        recognition.onstart = function () {
            console.log('[unmuted]');
        }

        recognition.onspeechend = function () {
            console.log('[muted]');
            setTimeout(function(){ME.listenNow(recognition)}, 200);
        }

        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                console.log('No speech was detected.');
                setTimeout(function(){ME.listenNow(recognition)}, 200);
            };
        }

        recognition.onresult = function (event) {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            var confidence = event.results[current][0].confidence;
            console.log('[' + (confidence * 100).toFixed(2) + '%][' + transcript + ']');
            // 'this' is hijacked by speechrecognition so ME is used.
            ME.confidence = `  ${(confidence * 100).toFixed(2)}%`;
            ME.speak(transcript);
        };

        this.recognition = recognition;
        console.log(`ttsVC v1.0 init complete`);

    }

    speak(message) {

        if (this.showConfidence) {
            this.element.innerHTML = message + this.confidence;
        } else {
            this.element.innerHTML = message;
        }
        var msg = new SpeechSynthesisUtterance(message);
        this.voices = window.speechSynthesis.getVoices();
        msg.voice = this.voices[this.voicenum];
        window.speechSynthesis.speak(msg);
        
        console.log(`${message}`);
    }



}
