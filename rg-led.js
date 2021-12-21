var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, gpio.DIR_LOW, function (err) {
    if (err) throw err;

    let value = false;
    let t = setInterval(function () {
        value = !value;
        gpio.write(7, value, function (err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    }, 1000);

    setTimeout(function () {
        clearInterval(t);
    }, 10000);
});
