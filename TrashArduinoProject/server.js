const express = require('express');
const app = express();
const {SerialPort} = require('serialport');

var port = 3000;
var arduinoCOMPort = "COM6"; //use correct port for your setup


var arduinoPort = new SerialPort({
    path: arduinoCOMPort,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

// add listener to read from serial port
const {ReadlineParser} = require('@serialport/parser-readline');
var response;
const parser = new ReadlineParser({delimiter: "\r\n"});
arduinoPort.pipe(parser);


parser.on("data", function (data) {
response = data;
console.log("Received data from port: " + data);
});


arduinoPort.on('open',function() {
console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});


// middleware to load static files
const path = require('path');
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, '/index.htm'));
})


// Ensure you have this line near the top of your file to read form data:
app.use(express.urlencoded({ extended: true }));

app.post('/send-text', function (req, res) {
// Extract the names from the form
const firstName = req.body.first_name;
const lastName = req.body.last_name;

// We join them with a comma so the Arduino knows where to split them
// Format: "John,Doe\n"
const dataToSend = firstName + "," + lastName + "\n";

arduinoPort.write(dataToSend, function(err) {
    if (err) {
        return res.status(500).send('Error writing to Serial Port');
    }
    console.log('Sent to Arduino: ' + dataToSend);
    res.send('Names sent! LCD updated with: ' + firstName + ' ' + lastName);
});
});


app.listen(port, function () {
console.log('Arduino server listening on port http://localhost:' + port);
});