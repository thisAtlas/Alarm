/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	
	/* Følgende EventListener's registrer om man rører ved div-elementerne.
	 * Rør man ved dem aktiverer de deres funktioner som ses nedenfor.
	 */
	document.getElementById("off").addEventListener("touchstart", sendOff, false);
	document.getElementById("off").addEventListener("touchend", sendOff, false);
	
	document.getElementById("speedDown").addEventListener("touchstart", sendSpeedDown, false);
	document.getElementById("speedDown").addEventListener("touchend", sendForward, false);
	
	document.getElementById("speedUp").addEventListener("touchstart", sendSpeedUp, false);
	document.getElementById("speedUp").addEventListener("touchend", sendForward, false);
	
	document.getElementById("forward").addEventListener("touchstart", sendForward, false);
	document.getElementById("forward").addEventListener("touchend", sendOff, false);
	
	document.getElementById("left").addEventListener("touchstart", sendLeft, false);
	document.getElementById("left").addEventListener("touchend", sendOff, false);
	
	document.getElementById("right").addEventListener("touchstart", sendRight, false);
	document.getElementById("right").addEventListener("touchend", sendOff, false);
	
	document.getElementById("back").addEventListener("touchstart", sendBack, false);
	document.getElementById("back").addEventListener("touchend", sendOff, false);
}
/* Følgende funktioner aktiverer når man starter eller slutter touch på vores div-elementer.
 * De sender en enkelt char (i string-format) til funktionen sendToArduino(data).
 */
function sendOff() {
	sendToArduino('s');
}
function sendSpeedDown() {
	sendToArduino('-');
}
function sendSpeedUp() {
	sendToArduino('+');
}
function sendForward() {
	sendToArduino('a');
}
function sendLeft() {
	sendToArduino('v');
}
function sendRight() {
	sendToArduino('h');
}
function sendBack() {
	sendToArduino('b');
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
/* Data modtaget fra arduinoen vises i "fraArduino".
 */
function onMessage(data) {
	document.getElementById("fraArduino").innerHTML="Data: "+data;
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
        statusDiv.innerHTML+="Disconnected.";
}
function subscribeFailed() {
        alert("subscribe failed");
}