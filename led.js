var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_LOW, function (err) {
    if (err) throw err;

    let value = false;
    let t = setInterval(function () {
        value = !value;
        gpio.write(7, value, function (err) {
            if (err) throw err;
            console.log('Written to pin 7:', value);
        });
    }, 1000);

    setTimeout(function () {
        clearInterval(t);
        gpio.reset();
        process.kill(process.pid, 'SIGTERM');
    }, 10000);
});
