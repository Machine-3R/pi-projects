var console = require('console'),
    gpio = require('rpi-gpio'),
    pin = 18,
    led = false;

function error(err) {
    err && console.log(err);
}

function toggle() {
    led = !led;
    console.log("pin:", pin, "=", led);
    gpio.write(pin, led, error);
}

// setup
gpio.setup(pin, gpio.DIR_OUT, error);

// toggle led every second
const action = setInterval(toggle, 1000);

// handle script end
setTimeout(
    function () {
        clearInterval(action);
        console.log("Done.");
    }
, 10000);
