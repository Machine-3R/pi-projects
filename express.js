const express = require('express');
const app = express();
const server = require('http')
    .createServer(app);
const io = require('socket.io')(server);
const gpio = require('rpi-gpio');
const gpiop = require('rpi-gpio').promise;

app
    .use(express.static('public'));

io
    .on('connection', (socket) => {
        console.log('a user connected');

        socket
            .on('disconnect', () => {
                console.log('user disconnected');
            });

        socket.emit('welcome', 'Welcome on this server.');
    });

gpio.setup(7, gpio.DIR_OUT);
{ // pin 7 led blink
    let value = false;
    t = setInterval(function () {
        gpio.read(7, function (err, data) {
            console.log('7:', value);
            value = !data;
        });
        gpio.write(7, value);
        gpio.emit('change', 7, value);
    }, 1000);

    setTimeout(function () {
        clearInterval(t);
        console.log('cleared interval.');
        gpio.reset();
        console.log('gpio reset.')
    }, 10000);
}

//gpio.setup(32, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio
    .on('change', (channel, value) => {
        console.log('change:', 'channel', channel, 'changed to ', value);
        io.emit('gpio.change', { channel, value });
    });

server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
