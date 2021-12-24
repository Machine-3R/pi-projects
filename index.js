const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const open = require('open');
const gpio = require('rpi-gpio');

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send(`<html><body>Testing<script src="/client.js"></script></body></html>`);
});

function openBrowser() {
    return setTimeout(async () => {
        await open('http://localhost:8080/')
            .catch(err => {
                console.log(err);
            });
    }, 1000);
}
let t = openBrowser();

// start communications
io
    .on('connection', (socket) => {
        console.log('a user connected');
        t && clearTimeout(t);

        socket
            .on('disconnect', () => {
                console.log('user disconnected');
            });

        gpio.on('change', (channel, value) => {
            console.log('channel', channel, 'changed to ', value);
            socket.emit('gpio.change', channel, value);
        })

        socket.emit('welcome', 'Welcome on this server.');
    });

// start server
// open browser
server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
