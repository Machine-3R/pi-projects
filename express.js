const express = require('express');
const app = express();
const server = require('http')
    .createServer(app);
const io = require('socket.io')(server);
const gpio = require('rpi-gpio');

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

gpio
    .setup(7, gpio.DIR_LOW, async function (err) {
        if (err) throw err;

        let value = false;
        let t = setInterval(function () {
            value = !value;
            gpio.write(7, value, function (err) {
                if (err) throw err;
                console.log('Written to pin');
            });
        }, 1000);

        setTimeout(function () {
            clearInterval(t);
        }, 10000);
    });

gpio
    .on('change', async (channel, value) => {
        console.log('channel', channel, 'changed to ', value);
        io.emit('gpio.change', { channel, value });
    })

server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
