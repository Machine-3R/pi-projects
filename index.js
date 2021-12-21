const rpio = require('rpio');
rpio.init({
    gpiomem: true,
    mapping: 'physical',
    mock: 'raspi-3',
    close_on_exit: true
});

let motor = {
    _pins: [18, 22, 24, 26],
    values: [rpio.LOW, rpio.LOW, rpio.LOW, rpio.HIGH],
    up: function () {
        this.values.unshift(this.values.pop());
        return this.pins();
    },
    down: function () {
        this.values.push(this.values.shift());
        return this.pins();
    },
    pins: function () {
        return Object.assign.apply({}, this._pins.map((v, i) => ({ [v]: this.values[i] })));
    }
};
console.log('start', motor.pins());

rpio.open(18, rpio.OUTPUT, rpio.LOW);
rpio.open(22, rpio.OUTPUT, rpio.LOW);
rpio.open(24, rpio.OUTPUT, rpio.LOW);
rpio.open(26, rpio.OUTPUT, rpio.LOW);

let t = setInterval(function() {
    let pins = motor.up();
    console.log(pins);
    for ( let pin in pins) {
        rpio.write(pin, pins[pin]);
    }
}, 100);

setTimeout(function() {
    clearInterval(t);
}, 10000);