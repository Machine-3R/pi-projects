var isWindows = !!require("os-name")().match(/Windows[.]*/gi),
    process = require('process'),
    console = require('console'),
    gpio = require('rpi-gpio'),
    led = {
        value: false,
        pin: 12,
        toggle: function () {
            this.value = !this.value;
            console.log("pin:", this.pin, "=", this.value);
            !isWindows && gpio.write(this.pin, this.value, error);
        }
    };

function blink(err) {
    err && console.log(err) && process.exit(1);
    
    const action = setInterval(led.toggle, 1000);

// handle script end
    setTimeout(function () {
        clearInterval(action);
        !isWindows && gpio.destroy(error);
        console.log("Done.");
        return process.exit(1);
    }, 11000);
}

console.log("Starting...");

// setup led
!isWindows && gpio.setup(led.pin, gpio.DIR_OUT, blink);

// toggle led every second
