const express = require('express');
const app = express();
const server = require('http').createServer(app);
server
    .listen(80, () => {
        console.log('Server started listening...');
    });
