
class Controller {
    #speed = 0;
    #motor = null;
    
    constructor(motor) {
        this.#motor = motor;
    }
    
    get speed() {
        return this.#speed;
    }
    
    set speed(val) {
        this.#speed = val;
        return this;
    }
    
    get motor() {
        return {
            id: this.#motor.id,
            sequence: this.#motor.current()
        }
    }
}

module.exports = Controller;