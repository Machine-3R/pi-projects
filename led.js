const Gpio = require('onoff').Gpio;
let led = new Gpio(7, 'out');

// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(function() {
     led.writeSync(led.readSync() ^ 1);
}, 200);

// Stop blinking the LED after 5 seconds
setTimeout(function() {
  clearInterval(iv); // Stop blinking
  led.unexport();    // Unexport GPIO and free resources
}, 5000);
