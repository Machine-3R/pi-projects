const chokidar = require('chokidar');

let FSWatcher = chokidar.watch('/sys/class/gpio/**/*', {
    persistent: true, // default: true
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    ignoreInitial: false, // fire events for addDir and unlinkDir
    followSymlinks: true,
});

FSWatcher
    .on('ready', () => {
        console.log('ready');
    })
    // .on('all', (event, path, stats) => {
    //     console.log('all:', event, path, stats);
    // })
    .on('add', (path, stats) => {
        console.log('added file:', path, stats);
    })
    .on('change', (path, stats) => {
        console.log('changed file:', path, stats);
    })
    .on('unlink', (path) => {
        console.log('deleted file:', path);
    })
    .on('addDir', (path, stats) => {
        console.log('added dir:', path, stats);
    })
    .on('unlinkDir', (path, stats, extra) => {
        console.log('deleted dir:', path, stats, extra);
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