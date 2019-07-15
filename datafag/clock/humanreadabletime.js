function startTime() {
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = formatTime(m);
    s = formatTime(s);
	if (h > 12) { h-=12 };
	if (h == 0) { 
	h=12;
	};
    document.getElementById('numbers').innerHTML =
    h + ":" + m + ":" + s;
	document.title = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function formatTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function helpMenu() {
	
	alert("Hello again! Current Control Legend: "+"\n"+"H = Here"+"\n"+"Nums1-0 = Time Color"+"\n"+"Shift+Nums = Shadow Color"+"\n"+"Spacebar = Show/Hide MemeBuffer"+"\n"+"\n"+"**WARNING-MEMEBUFFER DOES NOT AUTOCLEAR"+"\n"+"\n"+"Thank you for being curious. ~d74g0n");
	
	
}