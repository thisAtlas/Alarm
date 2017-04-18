var macAdress = "00:06:66:7D:83:BF";

function init() {
	
}

function onDeviceReady() {
	bluetoothSerial.connect(macAdress, onConnect, onDisconnect);
}
function onConnect() {
	bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
	document.getElementByID("status").innerHTML="Connected to " + macAdress + ".";
}
function onDisconnect() {
	alert("Disconnected");
	getElementByID("status").innerHTML+="Disconnected.";
}
function onMessage(data) {
	document.getElementByID("reply").innerHTML="Data: "+data;
}
function sendToArduino(data) {
	bluetoothSerial.write(data);
}
function subscribeFailed() {
	alert("subscribe failed");
}