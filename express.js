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

{ // pin 7 led blink
    gpio.setup(7, gpio.DIR_OUT);
    let value = false;
    t1 = setInterval(function () {
        gpio.read(7, function (err, data) {
            console.log('7:', value);
            value = !data;
        });
        gpio.write(7, value);
        gpio.emit('change', 7, value);
    }, 1000);

    setTimeout(function () {
        clearInterval(t1);
        console.log('cleared interval.');
        gpio.reset();
        console.log('gpio reset.')
    }, 10000);
}
{ // steppermotor
    gpio.setup(18, gpio.DIR_OUT);
    gpio.setup(22, gpio.DIR_OUT);
    gpio.setup(24, gpio.DIR_OUT);
    gpio.setup(26, gpio.DIR_OUT);
    let step = [0, 0, 0, 1]
    console.log(step);
    t2 = setInterval(function () {
        step.push(step.shift());
        console.log(step);
        gpio.write(18, step[0]);
        gpio.write(22, step[1]);
        gpio.write(24, step[2]);
        gpio.write(26, step[3]);
    }, 100);
    setTimeout(function () {
        clearInterval(t2);
    }, 3000)
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
