const rpio = require('rpio');
rpio.init({
    gpiomem: true,
    mapping: 'physical',
    mock: 'raspi-3',
    close_on_exit: true
});

rpio.open(15, rpio.INPUT, rpio.PULL_UP);

function pollcb(pin)
{
        /*
         * Wait for a small period of time to avoid rapid changes which
         * can't all be caught with the 1ms polling frequency.  If the
         * pin is no longer down after the wait then ignore it.
         */
        rpio.msleep(20);

        if (rpio.read(pin))
                return;

        console.log('Button pressed on pin P%d', pin);
}

rpio.poll(15, pollcb, rpio.POLL_LOW);