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

gpio.setup(7, gpio.DIR_OUT, gpio.EDGE_BOTH);
gpio.setup(32, gpio.DIR_IN, gpio.EDGE_BOTH)
 
gpio
    .on('change', (channel, value) => {
        console.log('channel', channel, 'changed to ', value);
        io.emit('gpio.change', { channel, value });
    });


server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
