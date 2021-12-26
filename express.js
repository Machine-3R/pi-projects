const express = require('express');
const app = express();
const server = require('http')
    .createServer(app);

app
    .get('/*', (req, res) => {
        console.log('requested:'.req);
        res.sendFile(__dirname + '/public/index.html');
    })
    .get('*', async (req, res) => {
        console.log(req.method, req.path, req.params);
        res.send('Request received ' + Math.floor(Math.random() * 1000000));
    });

server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
