const wordProc = {
    convert: {
        sentance_to_word_array: function (sentance) {
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
            return wordlist;
        },
        word_array_to_letter_array: function (wordlist) {
            +++
        },
    },
}


console.log(wordProc.convert.sentance_to_word_array('hello how are you, you big geek?'));



//
//
//function ParseSentance(sentance) {
//    sentance += ' ';
//    let wordlist = [];
//    let word = new String();
//
//    for (i = 0; i < sentance.length; i++) {
//        if (sentance[i] == ' ') {
//            wordlist.push(word);
//            word = '';
//        } else {
//            word += sentance[i];
//            // console.log('[parsing]:[' + word + ']');
//        }
//    }
//    // console.log('[wordlist]:' + wordlist);
//    ParseWords(wordlist);
//    //    return wordlist;
//}
