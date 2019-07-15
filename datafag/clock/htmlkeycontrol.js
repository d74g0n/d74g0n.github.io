var togglelist = true;

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 49: // 1
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px gold";	
		} else {
		document.getElementById('numbers').style.color = "gold";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.1";
		}
	  break; 
	case 50: // 2
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px black"
		} else {
		document.getElementById('numbers').style.color = "black";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.2";
		}
      break;
    case 51: // 3
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px red"
		} else {
		document.getElementById('numbers').style.color = "red";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.3";
		}
      break;
    case 52: // 4
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px white"
		} else {
		document.getElementById('numbers').style.color = "white";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.4";
		}
      break;
    case 53: // 5
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px blue"
		} else {
		document.getElementById('numbers').style.color = "blue";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.5";
		}
      break;
    case 54: // 6
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px green"
		} else {
		document.getElementById('numbers').style.color = "green";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.6";
		}
      break;
    case 55: // 7
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px orange"
		} else {
		document.getElementById('numbers').style.color = "orange";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.7";
		}
      break;	  
    case 56: // 8
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px orangered"
		} else {
		document.getElementById('numbers').style.color = "orangered";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.8";
		}
      break;	  
    case 57: // 9
		if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px purple"
		} else {	  
		document.getElementById('numbers').style.color = "purple";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "0.9";
		}
      break;	  
	 case 48: // 0
	 	if (event.shiftKey) {
		document.getElementById('numbers').style.textShadow = "4px 5px 25px transparent"
		} else {
		document.getElementById('numbers').style.color = "transparent";
		}
		if (event.ctrlKey) {
		document.getElementById('imagelist').style.opacity = "1";
		}
      break;
	 case 72: // H
		alert("Hello again! Current Control Legend: "+"\n"+"H = Here"+"\n"+"Nums1-0 = Time Color"+"\n"+"Shift+Nums = Shadow Color"+"\n"+"Spacebar = Show/Hide MemeBuffer"+"\n"+"\n"+"**WARNING-MEMEBUFFER DOES NOT AUTOCLEAR"+"\n"+"\n"+"Thank you for being curious. ~d74g0n");
      break;	  
	  
	case 32: // Spacebar
	  
	  if (togglelist) {
	  //seen
	//  document.getElementById('numbers').style.visibility = "hidden";
	  document.getElementById('masterulist').style.visibility = "visible";
	  } else {
	  //unseen
  	 // document.getElementById('numbers').style.visibility = "visible";
	  document.getElementById('masterulist').style.visibility = "hidden";
      }
	  
	  togglelist = !togglelist;
	  
	  break;	
  }
});



/*
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A

	//  document.getElementById('numbers').style.background = "blue";
      break;
    case 87: // W
 
	//  document.getElementById('numbers').style.background = "transparent";
      break;
  }
});

*/