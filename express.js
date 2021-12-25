const express = require('express');
const app = express();
const server = require('http')
    .createServer(app);

app
    .get('*', async (req, res) => {
        console.log(req.method, req.path, req.params);
        res.send('Request received ' + Math.floor(Math.random() * 1000000));
    });

server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
