/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:98:60";
var num;
//Har lavet følgende for at forkorte det at hente et element i HTML-en.
var getID = function(value){ return document.getElementById( value ); };

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
	date();
	time();
	// Opdaterer 'uret' på skærmen hvert sekundt.
	setInterval(time, 1000);
	
	numberGen();
	
	var	aHour = getID("aHour"),
		aMinute = getID("aMinute"),
		aSecond = getID("aSecond"),
		aSwitch = getID("aSwitch"),
		aOff = getID("turnOff"),
		refreshTime = 500,
		alarmTimer = null;
}
function numberGen() {
	num = Math.ceil(Math.random()*5);
	parseFloat(num);
	console.log(num);
	getID("numDiv").innerHTML+=num;
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
	sendToArduino(num);
}
function onMessage(data) {
	getID("reply").innerHTML="Data: "+data;
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