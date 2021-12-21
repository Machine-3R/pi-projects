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
let value = 0;
rpio.open(7, rpio.OUTPUT, value);

// toggle led every second
let t = setInterval(function() {
    value++;
    rpio.write(7, value%2);
    console.log(value, value%2, rpio.read(7));
}, 1000);

// end interval after 10 seconds
// script will end
setTimeout(function(){
    clearInterval(t);
}, 10000);