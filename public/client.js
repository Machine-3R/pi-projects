function onload() {
   
    socket = io();
    socket
        .on("welcome", (msg) => {
            console.log(msg);
        })
        .on('gpio.change', (channel, value) => {
            console.log('channel', channel, 'changed to ', value);
        })

}

let script = document.createElement('script');
script.src = '/socket.io/socket.io.js';
script.addEventListener('load', onload);
document.head.appendChild(script);