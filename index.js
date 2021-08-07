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
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        step: 3,

        init: function () {
            for (var i in this.pins) {
                var pin = this.pins[i];
                console.log('setup:', pin);
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
            var combi = {};
            for (var i in this.pins) {
                try {
                    var pin = this.pins[i];
                    var value = values[i];
                    combi[pin] = value;
                    !isWindows && gpio.write(pin, value);
                    console.log('pin:', pin, 'value:', value);
                } catch (err) {
                    console.log(pin, value, err);
                    process.exit(0);
                }
            }
            this.status(combi);
        },
        status(...extra) {
            var values = this.sequences[this.step];
            console.log("step", this.step, extra);
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
setInterval(function () {
    stepper.forward();
}, 1000);

//stepper backward



// handle script end
setTimeout(function () {
//    clearInterval(action);
    !isWindows && gpio.destroy(error);
    console.log("Done.");
    return process.exit(1);
}, 11000);
