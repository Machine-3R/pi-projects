
const Controller = require('./controller.js');
const Motor = require('./stepper-motor.js');

let m1 = new Motor('m1');
let c1 = new Controller(m1);

console.log(c1.motor);
console.log(c1, c1.speed);
c1.speed = 3;
console.log(c1, c1.speed);

