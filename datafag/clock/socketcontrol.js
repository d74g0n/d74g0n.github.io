var mycounter = 0
//var socket = io();
var socket = io.connect('http://159.203.4.98:3333');
//var mediaurl = "https://i.imgur.com/Yvf21Na.png";
//var mediaurl = "https://i.imgur.com/MzXHli4.jpg";
//var mediaurl = "https://media.giphy.com/media/d2Z1uF2QgFFYSJtm/giphy.gif";
var mediaurl = "https://media.giphy.com/media/jWs1nLMJEliBa/giphy.gif";
mediaurl = "https://media.giphy.com/media/5tw2hrF6z9DHgKISKa/giphy.gif"; //new gif i made
$('form').submit(function(){
socket.emit('chat message', $('#m').val());
$('#m').val('');
return false;
});
socket.on('clockdata', function(msg){ 
mediaurl = msg.media;
$('#masterulist').prepend($('<li id="imagelist"><a href="' + msg.link + '" target="_blank"><img src="' + mediaurl + '" style="width:100px;height:100px;"/></a> </li>'));
//document.body.style.backgroundImage = "url("+ mediaurl +")";
});

setInterval(function(){ 


	if (document.body.style.backgroundImage != "url("+ mediaurl +")") {
		
			document.body.style.backgroundImage = "url("+ mediaurl +")";
		
	} 
	
 }, 3000);