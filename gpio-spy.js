const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;

class Spy extends EventEmitter {
    constructor() {
        super();
        this.ready = false;
        this.pins = {
            stack: [],
            add(pin) {
                if (!(pin instanceof Pin)) throw 'Pin object expected.';
                !this.get(pin.gpio) || this.stack.push(pin);
            },
            get(gpio) {
                return this.stack.filter((pin) => {
                    return pin.gpio === gpio;
                });
            }
        };
        this.watcher = chokidar
            .watch('/sys/class/gpio/gpio*/*', {
                persistence: true,
                ignored: [
                    '/sys/class/gpio/gpiochip*'
                ],
                ignoreInitial: true,
                followSymlinks: false,
                cwd: '/sys/class/gpio'
            })
            .on('ready', () => {
                //                console.log('watched:', this.watcher.getWatched());
                let gpios = this.watcher.getWatched()['.'];
                //                console.log('gpios:', gpios);
                gpios.forEach((name) => {
                    let gpio = parseInt(name.slice(4));
                    let direction = fs.readFileSync('/sys/class/gpio/' + name + '/direction','utf8');
                    let value = fs.readFileSync('/sys/class/gpio/' + name + '/value','utf8');
                    
                    this.pins.add(new Pin(
                        gpio,
                        direction,
                        value
                    ));
                });
                this.ready = true;
                this.emit('ready');
            })
            .on('add', (path) => {
                console.log('added file:', this.ready, path);
            })
            .on('change', (path) => {
                console.log('changed file:', path);
            })
            .on('unlink', (path) => {
                console.log('deleted file:', path);
            })
            .on('addDir', (path) => {
                console.log('added dir:', path);
            })
            .on('unlinkDir', (path) => {
                console.log('deleted dir:', path);
            })
            .on('error', (err) => {
                console.log('ERROR:', err);
            });
    }

    getPins() {
        return this.pins.stack;
    }
}

class Pin {
    constructor(gpio, direction, value) {
        console.log(gpio,direction,value);
        this.gpio = 1 && gpio || null;
        this.direction = [Pin.DIR_IN, Pin.DIR_OUT].indexOf(direction) !== -1 ? direction : null;
        this.value = !!value ? 1 : 0;
    }
}
Pin.DIR_IN = 'in';
Pin.DIR_OUT = 'out';

module.exports = {
    Spy
}