const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const open = require('open');
const gpio = require('rpi-gpio');

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
            <script src="client.js"></script>
        </head>
    </html>
    `);
});

// function openBrowser() {
//     return setTimeout(async () => {
//         await open('http://localhost:80/')
//             .catch(err => {
//                 console.log(err);
//             });
//     }, 1000);
// }
// let t = openBrowser();

// // start communications
// io
//     .on('connection', (socket) => {
//         console.log('a user connected');
//         t && clearTimeout(t);

//         socket
//             .on('disconnect', () => {
//                 console.log('user disconnected');
//             });

//         gpio.on('change', (channel, value) => {
//             console.log('channel', channel, 'changed to ', value);
//             socket.emit('gpio.change', channel, value);
//         })

//         socket.emit('welcome', 'Welcome on this server.');
//     });

// gpio.setup(7, gpio.DIR_LOW, function (err) {
//     if (err) throw err;

//     let value = false;
//     let t = setInterval(function () {
//         value = !value;
//         gpio.write(7, value, function (err) {
//             if (err) throw err;
//             console.log('Written to pin 7:', value);
//         });
//     }, 1000);

//     setTimeout(function () {
//         clearInterval(t);
//         gpio.destroy(function (...incoming) {
//             console.log(incoming);
//         });
//     }, 10000);
// });

// start server
// open browser
server
    .listen(80, () => {
        console.log('Server started listening...');
    });
