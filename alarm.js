var macAddress = "00:06:66:7D:83:BF";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}
function onConnect() {
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
    document.getElementByID("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
}
function onMessage(data) {
	document.getElementById("fraArduino").innerHTML="Data: "+data;
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