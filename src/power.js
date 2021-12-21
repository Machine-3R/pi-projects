const events = require('events');

class Power extends events.EventEmitter {
    #power;

    constructor(val = false) {
        if (val !== !!val) {
            throw 'Boolean expected';
        }
        super();
        this.#power = !!val;
    }

    power(val = null) {
        if (val === null) {
            return this.#power;
        }
        if (val !== !!val) {
            throw 'Boolean expected';
        }
        this.emit('power-set', val);
        if (this.#power !== val) {
            this.#power = val;
            this.emit('power-change', val);
            this.#power && this.emit('power-on');
            !this.#power && this.emit('power-off');
        }
        return this;
    }
}

let p1 = new Power(false);
let p2 = new Power(false);
let p3 = new Power(false);

p1.on('power-set', (val) => {
    console.log('p1 set to', val);
    setTimeout(function () {
        p2.power(val);
    }, 1000);
});
p2.on('power-set', (val) => {
    console.log('p2 set to', val);
    setTimeout(function () {
        p3.power(val);
    }, 2000);
});
p3.on('power-set', (val) => {
    console.log('p3 set to', val);
    setTimeout(function () {
        p1.power(!val);
    }, 3000);
});

p1.power(false);

setTimeout(function () {
    process.exit(1);
}, 20000);
