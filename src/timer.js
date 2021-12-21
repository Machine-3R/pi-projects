const events = require('events');
const { clearInterval } = require('timers');

class TimerEventEmmiter extends events.EventEmitter {
    #interval = null;
    constructor() {
        super();
        this.start();
    }
    start() {
        this.stop();
        this.#interval = setInterval(() => {
            let t = Date.now();
            this.eventNames()
                .filter(eventName => {
                    return eventName < t;
                })
                .forEach(eventName => {
                    this.emit(eventName);
                })
        }, 1000)
    }
    stop() {
        this.#interval && clearInterval(this.#interval);
    }
}

const tee = new TimerEventEmmiter();
let t = Date.now() + 5000
tee.once(t, () => {
    console.log(Date.now(), 'only once...');
});
tee.on(t, () => {
    console.log(Date.now(), 'on...');
});

// control runtime
// run every second for 15 secs
t = setInterval(() => {
    console.log(Date.now())
}, 1000);
setTimeout(()=>{
    clearInterval(t);
    tee.stop();
}, 10000);

