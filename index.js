var console = require('console'),
    gpio = require('rpi-gpio'),
    led = {
        value: false,
        pin: 12,
        toggle: function() {
            this.value = !this.value;
            console.log("pin:", this.pin, "=", this.value);
            gpio.write(this.pin, this.value, error);
        }
    };

function error(err) {
    err && console.log(err);
}

console.log("Starting...");

// setup led
gpio.setup(led.pin, gpio.DIR_OUT, error);

// toggle led every second
const action = setInterval(led.toggle, 1000);

// handle script end
setTimeout(
    function () {
        clearInterval(action);
        gpio.destroy(error);
        console.log("Done.");
    }
, 5000);
