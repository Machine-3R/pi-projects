const express = require('express');
const app = express();
const server = require('http')
    .createServer(app);
const io = require('socket.io')(server);

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

server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
