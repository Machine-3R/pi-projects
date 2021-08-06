//const gpio = require('rpi-gpio');

//gpio.setup(18, gpio.DIR_OUT, err => {console.error(err);});

console.log("Hello world");
var led = 0;
function toggle() {
    led = (led+1)%2;
    console.log("led:", led);
}
const action = setInterval(toggle, 1000);
setTimeout(function(){clearInterval(action);}, 10000);
