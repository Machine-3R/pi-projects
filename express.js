const express = require('express');
const app = express();
const server = require('http').createServer(app);
server
    .listen(8080, () => {
        console.log('Server started listening...');
    });
