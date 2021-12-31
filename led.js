var gpio = require('rpi-gpio');

gpio.on('change',(channel, value) =>{
    console.log('channel:', channel, 'value:', value);
});

gpio.setup(7, gpio.DIR_OUT, gpio.EDGE_BOTH);

let value = false;
let t = setInterval(function () {
    value = !value;
    gpio.write(7, value, function (err) {
        if (err) throw err;
        console.log('GPIO4 (pin 7):', value);
    });
}, 1000);
setTimeout(function () {
    clearInterval(t);
    gpio.destroy((err) => {
        console.log(err);
    });
    process.kill(process.pid, 'SIGTERM');
}, 10000);
