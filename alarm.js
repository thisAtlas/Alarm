/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";
//Har lavet følgende for at forkorte det at hente et element i HTML-en.
var getID = function(value){ return document.getElementById( value ); };

var m15, m20, m30, m45, m60;
var is15t, is20t, is30t, is45t, is60t;

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	getID("min").addEventListener("touchstart", whichAlarm, false);
	
	date();
	time();
	whichAlarm();
	// Opdaterer loops en gang hvert sekundt.
	setInterval(loop, 1000);
}
function loop() {
	date();
	time();
	whichAlarm();
	whatToSend();
}
function whatToSend() {
	if (is15t == true) {
		//sendToArduino('a');
		console.log("sending 15");
	}else if (is15t == false) {
		//sendToArduino('b');
		console.log("stopping 15");
	}
	if (is20t == true) {
		//sendToArduino('c');
		console.log("sending 20");
	}else if (is20t == false) {
		//sendToArduino('d');
		console.log("stopping 20");
	}
	if (is30t == true) {
		//sendToArduino('e');
		console.log("sending 30");
	}else if (is30t == false) {
		//sendToArduino('f');
	}
	if (is45t == true) {
		//sendToArduino('g');
		console.log("sending 45");
	}else if (is45t == false) {
		//sendToArduino('h');
		console.log("stopping 45");
	}
	if (is60t == true) {
		//sendToArduino('i');
		console.log("sending 60");
	}else if (is60t == false) {
		//sendToArduino('j');
		console.log("stopping 60");
	}
}
function whichAlarm() {
	getID("whichAlarm").innerHTML="";
	m15 = getID("15min");
	m20 = getID("20min");
	m30 = getID("30min");
	m45 = getID("45min");
	m60 = getID("60min");
	
	if(m15.checked==true) {
		getID("whichAlarm").innerHTML+="15 minute cycle. ";
		console.log("15min");
		is15t = true;
	}else if(m15.checked==false) {
		is15t = false;
	}
	if(m20.checked==true) {
		getID("whichAlarm").innerHTML+="20 minute cycle. ";
		console.log("20min");
		is20t = true;
	}else if(m20.checked==false) {
		is20t = false;
	}
	if(m30.checked==true) {
		getID("whichAlarm").innerHTML+="30 minute cycle. ";
		console.log("30min");
		is30t = true;
	}else if(m30.checked==false) {
		is30t = false;
	}
	if(m45.checked==true) {
		getID("whichAlarm").innerHTML+="45 minute cycle. ";
		console.log("45min");
		is45t = true;
	}else if(m45.checked==false) {
		is45t = false;
	}
	if(m60.checked==true) {
		getID("whichAlarm").innerHTML+="60 minute cycle. ";
		console.log("60min");
		is60t = true;
	}else if(m60.checked==false) {
		is60t = false;
	}
	if (m15.checked==false && m20.checked==false && m30.checked==false && 
		m45.checked==false && m60.checked==false){
		getID("whichAlarm").innerHTML="No alarm selected.";
		console.log("no alarm");
	}
}
function date() {
	getID("date").innerHTML="Today is ";
	var d = new Date();
	var weekday = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	getID("date").innerHTML += weekday[d.getDay()] + ", the ";
	
	var date = new Date();
	getID("date").innerHTML += date.getDay();
	if(date.getDay()==1 || date.getDay()==21 || date.getDay()==31) {
		getID("date").innerHTML += "st ";
	} else if(date.getDay()==2 || date.getDay()==22) {
		getIDById("date").innerHTML += "nd ";
	} else if (date.getDay()==3 || date.getDay()==23) {
		getID("date").innerHTML += "rd ";
	} else {
		getID("date").innerHTML += "th ";
	}
	getID("date").innerHTML += "of "
	var m = new Date();
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	getID("date").innerHTML += month[m.getMonth()] + " ";
	
	var year = new Date();
	getID("date").innerHTML += year.getFullYear();
}
function time() {
	getID("time").innerHTML = "The time is: ";
	var t = new Date();
	if(t.getHours()<10) {
		getID("time").innerHTML += "0"+t.getHours()+":";
	}else{
		getID("time").innerHTML += t.getHours()+":";
	}
	if(t.getHours()==0) {
		date();
	}
	var t2 = new Date();
	if(t2.getMinutes()<10) {
		getID("time").innerHTML += "0"+t2.getMinutes()+":";
	}else{
		getID("time").innerHTML += t2.getMinutes()+":";
	}
	var t3 = new Date();
	if(t3.getSeconds()<10) {
		getID("time").innerHTML += "0"+t3.getSeconds();
	}else{
		getID("time").innerHTML += t3.getSeconds();
	}
}

/* Bluetooth funktionerne starter her. De bruges når vi forbinder til bluetooth-enheden
 * på vores produkt.
 */
function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}
/* I onConnect() kaldes bluetoothSerial.subscribe, der kaldes når data modtages.
 * Data skal sendes med et slut tegn. I dette eksempel er det \n, som indgår i
 * Arduino-kommandoen println().
 */
function onConnect() {
	bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
	getID("statusDiv").innerHTML="Connected to " + macAddress;
}
function onMessage(data) {
	getID("reply").innerHTML=data;
}
function sendToArduino(data) {
	bluetoothSerial.write(data);
}
function onDisconnect() {
	alert("Disconnected");
	getID("statusDiv").innerHTML="Disconnected.";
}
function subscribeFailed() {
	alert("subscribe failed");
}