function wordPro(msg, confidence) {
    let wordarr = sentance_to_word_array(msg);
    if (wordarr.length > 1) {
        findCommand(wordarr);
    }
}


function sentance_to_word_array(sentance) {
    // add space for ending marker.
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

    let str = wordlist[0];
    if (str[0] == undefined) {
        wordlist[0] = str.substr(1);
        wordlist.shift();

    }

    console.log(wordlist);
    return wordlist;
}


let robot_commands = {
    read: {
        all: {
            chat: function () {
                console.log('trigger read all chat');
            }
        }
    },
    you: {
        are: {
            gay: function () {
                console.log('Yup You ARE Gay');
            }
        }
    },
    show: {
        time: function () {
            console.log('hook time toggle command here');
        },
        face: function () {
            console.log('hook face toggle command here');
        }
    },
    showtime: {

    },

    look: {
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined,
        pp: undefined,
    }
}


function verifySingle(wordlist) {

    if (robot_commands[wordlist[0]]) {
        console.log(`command ${wordlist[0]} found`);
        return true;
    }
    return false;
}

function verifyDouble(wordlist) {

    if (robot_commands[wordlist[0]][wordlist[1]]) {
        console.log(`child ${wordlist[1]} found`);

        //check::
        //if function of it exists run it; other wise return true;
        if (typeof robot_commands[wordlist[0]][wordlist[1]] == "function") {


            // call function::
            console.log('EXECUTION');
            robot_commands[wordlist[0]][wordlist[1]]();
            return false;
        } else {
            return true;
        }

    }

    return false;
}

function verifyTriple(wordlist) {

    if (robot_commands[wordlist[0]][wordlist[1]][wordlist[2]]) {
        console.log(`TRIPLE child ${wordlist[2]} found`);


        if (typeof robot_commands[wordlist[0]][wordlist[1]][wordlist[2]] == "function") {
            console.log('EXECUTION');
            robot_commands[wordlist[0]][wordlist[1]][wordlist[2]]();
            return false;
        } else {
            return true;
        }





    } else {


    }
    return false;

}


function trimWordlist(wordlist) {

    if (wordlist.length > 1) {
        wordlist.shift();
    }

    return wordlist;
}

function findCommand(wordlist) {

    if (verifySingle(wordlist)) {

        console.log('we made it folks');
        if (verifyDouble(wordlist)) {
            console.log('we double made it folks');
        }
        if (verifyTriple(wordlist)) {
            console.log('we triple made it folks');
        }


    } else {


        if (wordlist.length > 1) {
            findCommand(trimWordlist(wordlist));
        } else {
            console.log('sentance complete');
        }



    }

}

console.log('word_processing_slave');
