const rpio = require('rpio');
rpio.init({
    gpiomem: true,
    mapping: 'physical',
    mock: 'raspi-3',
    close_on_exit: true
});

/*
 * Set the initial state to low.  The state is set prior to the pin
 * being actived, so is safe for devices which require a stable setup.
 */
rpio.open(7, rpio.OUTPUT, rpio.LOW);

/*
 * The sleep functions block, but rarely in these simple programs does
 * one care about that.  Use a setInterval()/setTimeout() loop instead
 * if it matters.
 */
for (var i = 0; i < 5; i++) {
        /* On for 1 second */
        rpio.write(7, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        rpio.write(7, rpio.LOW);
        rpio.msleep(500);
}