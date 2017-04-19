/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";
var num;

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
	date();
	time();
	setInterval(time, 1000);
	numberGen();
	console.log(num);
	document.getElementById("numDiv").innerHTML+=num;
	sendToArduino(num);
}
function numberGen() {
	num = Math.ceil(Math.random()*5);
}
function date() {
	document.getElementById("date").innerHTML="Today is ";
	var d = new Date();
	var weekday = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	document.getElementById("date").innerHTML += weekday[d.getDay()] + ", the ";
	
	var date = new Date();
	document.getElementById("date").innerHTML += date.getDay();
	if(date.getDay()==1 || date.getDay()==21 || date.getDay()==31) {
		document.getElementById("date").innerHTML += "st ";
	} else if(date.getDay()==2 || date.getDay()==22) {
		document.getElementByIdById("date").innerHTML += "nd ";
	} else if (date.getDay()==3 || date.getDay()==23) {
		document.getElementById("date").innerHTML += "rd ";
	} else {
		document.getElementById("date").innerHTML += "th ";
	}
	document.getElementById("date").innerHTML += "of "
	var m = new Date();
	var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	document.getElementById("date").innerHTML += month[m.getMonth()] + " ";
	
	var year = new Date();
	document.getElementById("date").innerHTML += year.getFullYear();
}
function time() {
	document.getElementById("time").innerHTML = "The time is: ";
	var t = new Date();
	if(t.getHours()<10) {
		document.getElementById("time").innerHTML += "0"+t.getHours()+":";
	}else{
		document.getElementById("time").innerHTML += t.getHours()+":";
	}
	if(t.getHours()==0) {
		date();
	}
	var t2 = new Date();
	if(t2.getMinutes()<10) {
		document.getElementById("time").innerHTML += "0"+t2.getMinutes()+":";
	}else{
		document.getElementById("time").innerHTML += t2.getMinutes()+":";
	}
	var t3 = new Date();
	if(t3.getSeconds()<10) {
		document.getElementById("time").innerHTML += "0"+t3.getSeconds();
	}else{
		document.getElementById("time").innerHTML += t3.getSeconds();
	}
}
/* Bluetooth funktionerne starter her. De er givet til os af lærer.
 */
function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}
/* I onConnect() kaldes bluetoothSerial.subscribe, der kaldes når data modtages.
 * Data skal sendes med et slut tegn. I dette eksempel er det \n, der indgår i
 * Arduino-kommandoen println().
 */
function onConnect() {
	bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
	document.getElementById("statusDiv").innerHTML="Connected to " + macAddress;        		
}
function onMessage(data) {
	document.getElementById("reply").innerHTML="Data: "+data;
}
function sendToArduino(data) {
	bluetoothSerial.write(data);
}
function onDisconnect() {
	alert("Disconnected");
	document.getElementById("statusDiv").innerHTML="Disconnected.";
}
function subscribeFailed() {
	alert("subscribe failed");
}