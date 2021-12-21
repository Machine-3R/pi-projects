const events = require('events');

class Engine extends events.EventEmitter {
    #running = false;

    constructor() {
        super();
        this.on('start', () => {
            console.log('on start me beginning to work...')
        });
        this.on('stop', () => {
            console.log('finally weekend...')
        });
    }

    start() {
        this.emit('start');
        setTimeout(() => {
            this.#running = true;
            this.emit('started');
        }, 1000)
    }

    stop() {
        this.emit('stop');
        setTimeout(() => {
            this.#running = false;
            this.emit('stopped');
        }, 2000)
    }
}

class Button extends events.EventEmitter {

    constructor(name) {
        super();
        this.name = name || "unnamed";
        super.on('on', () => {
            console.log('Button', this.name, 'is pressed.');
        })
        super.on('off', () => {
            console.log('Button', this.name, 'is released.')
        });
    }

    on() {
        this.emit('on');
    }

    off() {
        this.emit('off');
    }
}

// init components
let b1 = new Button('B1');
let b2 = new Button();
let engine = new Engine();
let rail = {
    length: 100 // cm
}

// setup components
b1.position = 2; // cm
b2.position = 98; // cm
engine.position = 50 // cm
engine.speed = 10; // cm/s

