const chokidar = require('chokidar');
const fs = require('fs');

let FSWatcher = chokidar
    .watch('/sys/class/gpio/', {
        persistent: true, // default: true
        ignoreInitial: true, // fire events for addDir and unlinkDir
        followSymlinks: true,
        events: 'add,change,unlink,addDir,unlinkDir,error',
        ignored: [
            /(^|[\/\\])\../, // ignore dotfiles
            '/sys/class/gpio/gpiochip*', // GPIO controller
            '/sys/class/gpio/*xport',
            /\/sys\/class\/gpio\/gpio\d*\/device/,
            /\/sys\/class\/gpio\/gpio\d*\/subsystem/,
            // /\/sys\/class\/gpio\/gpio\d*\/uevent/,
            // /\/sys\/class\/gpio\/gpio\d*\/active_low/,
            // /\/sys\/class\/gpio\/gpio\d*\/edge/,
        ],
        cwd: '/sys/class/gpio'
    })
    .on('ready', () => {
        console.log('ready', FSWatcher.getWatched());
    })
    .on('all', (event, path, stats) => {
        console.log('all:', event, path);
    })
    .on('error', (err) => {
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
