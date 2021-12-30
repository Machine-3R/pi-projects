const chokidar = require('chokidar');
const fs = require('fs');

let dir = '/sys/class/gpio/gpio*/*';
let options = {
    persistent: true, // default: true
    ignoreInitial: false, // fire events for addDir and unlinkDir
    followSymlinks: true,
    events: 'add,change,unlink,addDir,unlinkDir,error',
    ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        '/sys/class/gpio/gpiochip0', // GPIO controller
        '/sys/class/gpio/gpiochip100',// GPIO controller
        /\/sys\/class\/gpio\/gpio\d*\/device/,
        /\/sys\/class\/gpio\/gpio\d*\/subsystem/,
    ]
};
let ready = false;
let FSWatcher = chokidar.watch(dir, options);
FSWatcher
    .on('ready', () => {
        console.log('ready', FSWatcher.getWatched()['/sys/class/gpio']);
        ready = true;
    })
    // .on('all', (event, path, stats) => {
    //     console.log('all:', event, path);
    // })
    .on('add', (path, stats) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('added file:', ready, path, '=>', data.trim());
        });
    })
    .on('change', (path, stats) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('changed file:', path, '=>', data.trim());
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

// delayed led blinking
// setTimeout(function () {
//     var gpio = require('rpi-gpio');

//     gpio.setup(7, gpio.DIR_LOW, function (err) {
//         if (err) throw err;

//         let value = false;
//         let t = setInterval(function () {
//             value = !value;
//             gpio.write(7, value, function (err) {
//                 if (err) throw err;
//                 console.log('Written to pin 7:', value);
//             });
//         }, 1000);

//         setTimeout(function () {
//             clearInterval(t);
//             // gpio.destroy(() => {
//             // });
//             process.kill(process.pid,'SIGTERM');
//         }, 10500);
//     });

// }, 10000);
