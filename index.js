var isWindows = !!require("os-name")().match(/Windows[.]*/gi),
    process = require('process'),
    console = require('console'),
    gpio = require('rpi-gpio'),
    led = {
        value: false,
        pin: 12,
        toggle: function () {
            this.value = !this.value;
//            console.log("pin:", this.pin, "=", this.value);
            !isWindows && gpio.write(this.pin, this.value, error);
        }
    },
    stepper = {
        pins: [18, 22, 24, 26],
        sequences: [
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1]
        ],
        step: 0,

        init: function () {
            for (var i in this.pins) {
                var pin = this.pins[i];
                !isWindows && gpio.setup(pin, gpio.DIR_OUT);
            }
            console.log('Stepper initiated..');
            this.status();
        },
        forward: function () {
            this.step = (this.step + 1) % this.pins.length;
            this._move();
        },
        backward: function () {
            this.step = (this.step + this.pins.length - 1) % this.pins.length;
            this._move();
        },
        _move: function () {
            var values = this.sequences[this.step];
            for (var i in this.pins) {
                var pin = this.pins[i];
                var value = values[i];
                !isWindows && gpio.write(pin, value);
            }
            this.status();
        },
        status() {
//            console.log("step", this.step);
        }
    };

function error(err) {
    err && console.log(err);
}

console.log("Starting...");

// setup led
!isWindows && gpio.setup(led.pin, gpio.DIR_OUT, error);

// toggle led every second
const action = setInterval(led.toggle, 1000);

// construct stepper
stepper.init();

// stepper forward
setTimeout(function () {
    stepper.forward();
}, 100);

//stepper backward



// handle script end
setTimeout(function () {
    clearInterval(action);
    !isWindows && gpio.destroy(error);
    console.log("Done.");
    return process.exit(1);
}, 11000);
