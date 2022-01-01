#!/usr/bin/env python3
import RPi.GPIO as GPIO  # Import Raspberry Pi GPIO library
from time import sleep  # Import the sleep function from the time module

GPIO.setwarnings(False)  # Ignore warning for now
GPIO.setmode(GPIO.BOARD)  # Use physical pin numbering

# Set pin 7 to be an output pin and set initial value to low (off)
GPIO.setup(7, GPIO.OUT, initial=GPIO.LOW)

value = False
while True:                     # Run forever
    print('GPIO4 (pin7):',value)
    sleep(1)                    # Sleep for 1 second
    GPIO.output(7, value)   # Turn on
    value = not value
