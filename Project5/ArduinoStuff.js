const express = require('express');
const app = express();

const {SerialPort} = require('serialport');

var port = 3000;
var arduinoCOMPort = "COM8";

var arduinoPort = new SerialPort(arduinoCOMPort,{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

arduinoPort.on('open',function() {
    console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {
    return res.send('Working');
})

app.get('/:action', function (req, res) { 
    var action = req.params.action || req.param('action');

    if(action == '0') {
        arduinoPort.write("0");
        res.send('Actipn 0 was sent successfully');
        return;
    } 
    if(action == '1'){
        arduinoPort.write("1");
        res.send('Action 1 was sent successfully');
        return;
    } 
    res.send('Invalid Action: ' + action);
    return;
});

app.listen(port, function () {
    console.log('Arduino server listening on port http://localhost:' + port);
});
