alert('client.js loaded');
var console = {
    container: document.querySelector('#console') || function () {
        let div = document.createElement('div');
        div.id = "console";
        return document.body.appendChild(div);
    }(),
    log: function (...values) {
        let now = new Date();
        let div = document.createElement('div');
        div.id = "log";
        div.innerHTML = '<span>'
            + now.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
            + '.'
            + now.getMilliseconds() + '</span>';
        div.innerHTML += " " + values.join(' ');
        this.container.appendChild(div);
    }
};
console.log(1, 'a', 3, true, false, { name: 'object' });
function onload() {

    socket = io();
    socket
        .on("welcome", (msg) => {
            console.log('server:', msg);
        })
        .on('gpio.change', (channel, value) => {
            console.log('channel', channel, 'changed to ', value);
        })

}

let script = document.createElement('script');
script.src = '/socket.io/socket.io.js';
script.addEventListener('load', onload);
document.head.appendChild(script);
