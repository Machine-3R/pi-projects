import time
import sys
from gpiozero import OutputDevice


class Stepper:
    def __init__(self, IN1, IN2, IN3, IN4):
        self.stepPins = [IN1, IN2, IN3, IN4]    # Motor GPIO pins</p><p>
        self.stepDir = -1                       # Set to 1 for clockwise
                                                # Set to -1 for anti-clockwise
        self.mode = 1                           # mode = 1: Low Speed ==> Higher Power
                                                # mode = 0: High Speed ==> Lower Power

        if self.mode:                           # Low Speed ==> High Power
            self.seq = [                        # Define step sequence as shown in manufacturers datasheet
                [1, 0, 0, 1],
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 1],
                [0, 0, 0, 1]
            ]
        else:                                   # High Speed ==> Low Power
            seq = [                             # Define step sequence as shown in manufacturers datasheet
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        self.stepCount = len(self.seq)
        if len(sys.argv) > 1:  # Read wait time from command line
            self.waitTime = int(sys.argv[1])/float(1000)
        else:
            self.waitTime = 0.004    # 2 miliseconds was the maximun speed got on my tests
        self.stepCounter = 0

    def run(self):
        while True:                          # Start main loop
            for pin in range(0, 4):
                xPin = self.stepPins[pin]          # Get GPIO
                if self.seq[self.stepCounter][pin] != 0:
                    xPin.on()
                else:
                    xPin.off()

            self.stepCounter += self.stepDir
            if (self.stepCounter >= self.stepCount):
                self.stepCounter = 0
            if (self.stepCounter < 0):
                self.stepCounter = self.stepCount+self.stepDir
            time.sleep(self.waitTime)     # Wait before moving on
# end class Stepper

IN1 = OutputDevice(25)
IN2 = OutputDevice(8)
IN3 = OutputDevice(7)
IN4 = OutputDevice(1)

stepper = Stepper(IN1, IN2, IN3, IN4)
stepper.run()
