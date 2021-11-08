
//import StepperMotor from "./stepper-motor.js"
const Motor = require('./stepper-motor.js');

let m1 = new Motor('m1');
let m2 = new Motor('m2');
console.log(m1, m1.current(),m2, m2.current());
m1.next();
m2.previous();
console.log(m1, m1.current(),m2, m2.current());
m1.next();
m2.previous();
console.log(m1, m1.current(),m2, m2.current());
m1.next();
console.log(m1, m1.current(),m2, m2.current());
console.log(m1, m1.current(),m2, m2.current());
m1.previous();
console.log(m1, m1.current(),m2, m2.current());
m1.previous();
console.log(m1, m1.current(),m2, m2.current());
m1.previous();
console.log(m1, m1.current(),m2, m2.current());

