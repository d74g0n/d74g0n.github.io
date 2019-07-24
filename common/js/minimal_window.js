
// opens the 'popout' browser form with a url.  a minified browser window.

function openMinWindow(requrl) {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

            open(requrl, 'test', params);
        }

        function openMinWindowId(requrl = '/', reqid = 'test') {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

            open(requrl, reqid, params);
        }

