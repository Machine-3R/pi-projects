const chokidar = require('chokidar');
const fs = require('fs');

let FSWatcher = chokidar.watch('/sys/class/gpio/gpio*/*', {
    persistent: true, // default: true
    ignoreInitial: false, // fire events for addDir and unlinkDir
    followSymlinks: true,
    ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        '/sys/class/gpio/gpiochip0', // GPIO controller
        '/sys/class/gpio/gpiochip100',// GPIO controller
        /\/sys\/class\/gpio\/gpio.\/device/,
        /\/sys\/class\/gpio\/gpio.\/subsystem/,
    ]
});

FSWatcher
    .on('ready', () => {
        console.log('ready');
    })
    // .on('all', (event, path, stats) => {
    //     console.log('all:', event, path, stats);
    // })
    .on('add', (path, stats) => {
        console.log('added file:', path);
    })
    .on('change', (path, stats) => {
        fs.readFile(path, 'utf8', (err, data) => {
            console.log('changed file:', path, '=>', data);
        });
    })
    .on('unlink', (path) => {
        console.log('deleted file:');
    })
    .on('addDir', (path, stats) => {
        console.log('added dir:', path);
    })
    .on('unlinkDir', (path, stats, extra) => {
        console.log('deleted dir:', path);
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