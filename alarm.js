/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	var num = Math.ceil(Math.random()*5);
	getElementById("num").innerHTML+=num + " ";
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
	getElementById("reply").innerHTML+=num;
	sendToArduino(num);
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