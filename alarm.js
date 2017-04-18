/* Adressen på vores Bluetooth-Dongle (Password er 1234). 
 * MAC-addressen er unik til hver Bluetooth-dongle, så hvis vi bruger en anden skal MAC-adressen skiftes.
 */
var macAddress = "00:06:66:7D:83:BF";

function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
	alert("device:ready");
}
function onConnect() {
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
    document.getElementById("statusDiv").innerHTML="Connected to " + macAddress + ".";
	alert("connected");
}
function onMessage(data) {
	document.getElementById("reply").innerHTML="Data: "+data;
}
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