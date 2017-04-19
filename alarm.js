/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";

var deadline = "nill";


function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
	var num = Math.ceil(Math.random()*5);
	document.getElementById("numDiv").innerHTML+=num + " ";
	
	date();
	time();
}
function date() {
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
	
	var year = new Date();
	document.getElementById("date").innerHTML += year.getFullYear();
}
function time() {
	var t = new Date();
	document.getElementById("time").innerHTML += t.getHours() + ":";
	var t2 = new Date();
	document.getElementById("time").innerHTML += t2.getMinutes() + ":";
	var t3 = new Date();
	document.getElementById("time").innerHTML += t3.getSeconds() + ":";
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
    document.getElementById("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
}
/* Data modtaget fra arduinoen vises i "reply".
 */
function onMessage(data) {
	document.getElementById("reply").innerHTML="Data: "+data;
	document.getElementById("reply").innerHTML+=num;
	sendToArduino(numb);
}
/* bluetoothSerial.write sender data af formen 
 * ArrayBuffer, string, array of integers, eller et Uint8Array.
 * I dette eksempel sendes en string 
 */
function sendToArduino(data) {
        bluetoothSerial.write(data);
}
function onDisconnect() {
        alert("Disconnected");
        document.getElementById("statusDiv").innerHTML+="Disconnected.";
}
function subscribeFailed() {
        alert("subscribe failed");
}