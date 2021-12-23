function onload() {
   
    socket = io();
    socket
        .on("welcome", (msg) => {
            console.log('server:', msg);

            let div = document.createElement('div');
            div.innerHTML = 'Server says: '+ msg;
            document.body.appendChild(div);
        })
        .on('gpio.change', (channel, value) => {
            console.log('channel', channel, 'changed to ', value);
        })

}

let script = document.createElement('script');
script.src = '/socket.io/socket.io.js';
script.addEventListener('load', onload);
document.head.appendChild(script);
