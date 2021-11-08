class StepperMotor {
    #index = 0;
    static sequences = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
    ];
    
    constructor(id) {
        this.id = id;
    }

    current() {
        return StepperMotor.sequences[ this.#index ];
    }

    next() {
        this.#index = (this.#index + StepperMotor.sequences.length + 1) % StepperMotor.sequences.length;
        return this;
    }

    previous() {
        this.#index = (this.#index + StepperMotor.sequences.length - 1) % StepperMotor.sequences.length;
        return this;
    }
}

module.exports = StepperMotor;


