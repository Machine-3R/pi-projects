const { Spy, Pin } = require('./gpio-spy.js');

let spy = new Spy();
spy
    .on('ready', () => {
        console.log('Spy ready:', spy.getPins());
    })
    .on('change', () => {
        console.log('Spy detected change.');
    })
