import time
import sys
from gpiozero import Device,OutputDevice
from gpiozero.pins.mock import MockFactory

import threading
from functools import wraps

def delay(delay=0.):
    """
    Decorator delaying the execution of a function for a while.
    """
    def wrap(f):
        @wraps(f)
        def delayed(*args, **kwargs):
            timer = threading.Timer(delay, f, args=args, kwargs=kwargs)
            timer.start()
        return delayed
    return wrap

class Timer():
    toClearTimer = False
    def setTimeout(self, fn, time):
        isInvokationCancelled = False
        @delay(time)
        def some_fn():
                if (self.toClearTimer is False):
                        fn()
                else:
                    print('Invokation is cleared!')        
        some_fn()
        return isInvokationCancelled
    def setClearTimer(self):
        self.toClearTimer = True
# end class Timer

class Stepper:
    def __init__(self, pin1, pin2, pin3, pin4):
        self.isStarted = False
        IN1 = OutputDevice(pin1)
        IN2 = OutputDevice(pin2)
        IN3 = OutputDevice(pin3)
        IN4 = OutputDevice(pin4)
        self.stepPins = [IN1, IN2, IN3, IN4]    # Motor GPIO pins
        self.stepDir = -1                       # Set to 1 for clockwise
                                                # Set to -1 for anti-clockwise
                                                
        self._mode = 1                          # mode = 1: Low Speed ==> Higher Power
                                                # mode = 0: High Speed ==> Lower Power

        if self._mode:                          # High Power, Low Speed
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
        else:                                   # Low Power, High speed
            seq = [                             # Define step sequence as shown in manufacturers datasheet
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ]
        self.stepCount = len(self.seq)
        if len(sys.argv) > 1:                   # Read wait time from command line
            self.waitTime = int(sys.argv[1])/float(1000)
        else:                          
            self.waitTime = 0.004               # 2 miliseconds was the maximun speed got on my tests
        self.stepCounter = 0

    def mode(self, mode):
        self._mode = mode % 2
        print('Stepper:mode', self._mode)

    def start(self):
        print('Stepper:start')
        self.isStarted = True
        while self.isStarted:                             # Start main loop
            for pin in range(0, 4):
                xPin = self.stepPins[pin]       # Get GPIO
                if self.seq[self.stepCounter][pin] != 0:
                    xPin.on()
                else:
                    xPin.off()

            self.stepCounter += self.stepDir
            if (self.stepCounter >= self.stepCount):
                self.stepCounter = 0
            if (self.stepCounter < 0):
                self.stepCounter = self.stepCount+self.stepDir
            time.sleep(self.waitTime)           # Wait before moving on

    def stop(self):
        print('Stepper:stop')
        self.isStarted = False
# end class Stepper

#Device.pin_factory = MockFactory()

stepper = Stepper(25, 8, 7, 1)
timer = Timer()
def stop():
    stepper.stop()
    print('stopped.')
def start():
    stepper.start()
    print('started.')
def mode(mode):
    stepper.mode(mode)
    print('set mode:', mode)

# argumentless wrapper functions
def mode0():
    stepper.mode(0)

def mode1():
    stepper.mode(1)

timer.setTimeout(start, 3)
timer.setTimeout(stop, 5)
timer.setTimeout(start, 7)
timer.setTimeout(mode1, 8)
timer.setTimeout(mode0, 18)
print('setup ready')
