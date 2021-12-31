const chokidar = require('chokidar');
const fs = require('fs');

let FSWatcher = chokidar
    .watch('.', {
        persistent: true, // default: true
        ignoreInitial: true,
        ignored: [
            //            /(^|[\/\\])\../, // ignore dotfiles
            '/sys/class/gpio/gpiochip*', // GPIO controller
            '/sys/class/gpio/*xport',
            '/sys/class/gpio/gpio*/device',
            '/sys/class/gpio/gpio*/subsystem',
        ],
        cwd: '/sys/class/gpio'
    })
    .on('ready', function () {
        console.log('ready', this.getWatched());
    })
    .on('all', function (event, path, stats) {
        console.log('all:', event, path);
    })
    .on('error', function (err) {
        console.log('error:', err);
        /** known error on unlinking empty dir */
        // Error: EPERM: operation not permitted, watch
        // at FSEvent.FSWatcher._handle.onchange(internal / fs / watchers.js: 178: 28) {
        //     errno: -4048,
        //     syscall: 'watch',
        //     code: 'EPERM',
        //     filename: null
        // }
    })
    ;
