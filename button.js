var gpio = require('rpi-gpio');

gpio.on('change',(channel, value) =>{
    console.log('channel:', channel, 'value:', value);
});
gpio.setup(32, gpio.DIR_OUT, gpio.EDGE_BOTH);
