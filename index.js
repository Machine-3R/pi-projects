var console = require('console'),
    gpio = require('rpi-gpio'),
    pin = 18,
    led = false;

function toggle() {
    led = !led;
    console.log("pin:", pin, "=", led);
    gpio.write(pin, led, (err)=> {
        err && console.log(err);
    });
}

// setup
gpio.setup(pin, gpio.DIR_OUT, err => {
    err && console.log(err);
});

// toggle led every second
const action = setInterval(toggle, 1000);

// handle script end
setTimeout(
    function () {
        clearInterval(action);
//        gpio.destroy();
    }
, 10000);
