var macAddress = "00:06:66:7D:83:BF";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
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
    document.getElementByID("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
}
/* Data modtaget fra arduinoen vises i "fraArduino".
 */
function onMessage(data) {
	document.getElementById("reply").innerHTML="Data: "+data;
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