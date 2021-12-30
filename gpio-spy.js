const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

class Spy {
    constructor() {
        this.ready = false;
        this.pins = [];
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
            .on('ready', ()=> {
                 let watched = this.watcher.getWatched();
                 console.log('watched:', watched);
                 let gpios = watched['.'];
                 console.log('gpios:', gpios);
                 this.ready = true;
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
}

class Pin {
    constructor(gpio, direction, value) {
        this.gpio = parseInt(gpio) || null;
        this.direction = direction || 'in';
        this.value = '' + parseInt(value) || '0';
    }
}

module.exports = {
    Spy
}