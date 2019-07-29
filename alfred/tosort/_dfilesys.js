// citation: https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
// imagedownloadv2.js
let fs = require('fs'),
    request = require('request'),
    path = require('path');

//

let _dfiles = {
    isDebugging: true,
    imgdownload: function (uri, filename, callback) {
        if (ensureDirectoryExistence(filename)) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        }
    },
    ensureDirectoryExistence: function (filePath) {
        // dependancy of imgdownload
        let dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            if (_dfiles.isDebugging) {
                console.log('[DIRCHK][FOUND][' + dirname + ']');
            }
            return true;
        }
        _dfiles.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
        if (_dfiles.isDebugging) {
            console.log('[ensureDirectoryExistence][created][' + dirname + ']');
        }
    },
    appendTextFile: function (filename, logdata) {
        fs.appendFile(filename, logdata + '\n', (err) => {
            if (err) throw err;
            console.log('[logLine][' + filename + '] : [' + logdata + ']');
        });
    },
}


let timemgmt = {
    
}

let returnGlobalObj = function (){
    if(document) {
        console.log('assumed run in browser');
        return document;
    }
    if(global) {
        console.log('assumed run in nodejs');
        return global;
    }
}

console.log(returnGlobalObj());