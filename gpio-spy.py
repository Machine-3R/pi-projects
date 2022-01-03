try:
    import RPi.GPIO as GPIO
except:
    print("Import error: RPi.GPIO! Fallback: Mock.GPIO.")
    import Mock.GPIO as GPIO
import sys
import getopt
import time


def getRaspiModel(argument):
    # Detect Raspberry Pi model
    switcher = {
        "0002": "Model B Revision 1.0 256Mb",
        "0003": "Model B Revision 1.0 + ECN0001 256Mb",
        "0004": "Model B Revision 2.0 256Mb",
        "0005": "Model B Revision 2.0 256Mb",
        "0006": "Model B Revision 2.0 256Mb",
        "0007": "Model A 256Mb",
        "0008": "Model A 256Mb",
        "0009": "Model A 256Mb",
        "000d": "Model B Revision 2.0 512Mb",
        "000e": "Model B Revision 2.0 512Mb",
        "000f": "Model B Revision 2.0 512Mb",
        "0010": "Model B+ 512Mb",
        "0012": "Model A+ 256Mb",
        "0013": "Model B+ 512Mb",
        "13": "Model B+ 512Mb",  # https://github.com/kgbplus/gpiotest/issues/7
        "0015": "Model A+ 256/512Mb",
        "a01040": "2 Model B Revision 1.0 1Gb",
        "a01041": "2 Model B Revision 1.1 1Gb",
        "a21041": "2 Model B Revision 1.1 1Gb",
        "a22042": "2 Model B (with BCM2837) 1Gb",
        "900021": "Model A+ 512Mb",
        "900032": "Model B+ 512Mb",
        "900092": "Zero Revision 1.2 512Mb",
        "900093": "Zero Revision 1.3 512Mb",
        "920093": "Zero Revision 1.3 512Mb",
        "9000c1": "Zero W Revision 1.1 512Mb",
        "a02082": "3 Model B 1Gb",
        "a22082": "3 Model B 1Gb",
        "a32082": "3 Model B 1Gb",
        "a020d3": "3 Model B+ 1Gb",
        "9020e0": "3 Model A+ 512Mb",
        "a03111": "4 Model B 1Gb",
        "b03111": "4 Model B 2Gb",
        "b03112": "4 Model B 2Gb",
        "bo3114": "4 Model B 2Gb",
        "c03111": "4 Model B 4Gb",
        "c03112": "4 Model B 4Gb",
        "c03114": "4 Model B 4Gb",
        "d03114": "4 Model B 8Gb",
        "c03130": "Pi 400 4Gb",
        "b03140": "Compute Module 4 2Gb",
    }
    return switcher.get(argument, "not supported")


def getGpioNum(argument):
    # Return number of GPIO lines
    switcher = {
        "0002": 17,
        "0003": 17,
        "0004": 17,
        "0005": 17,
        "0006": 17,
        "0007": 17,
        "0008": 17,
        "0009": 17,
        "000d": 17,
        "000e": 17,
        "000f": 17,
        "0010": 26,
        "0012": 26,
        "0013": 26,
        "13": 26,
        "0015": 26,
        "a01040": 26,
        "a01041": 26,
        "a21041": 26,
        "a22042": 26,
        "900021": 26,
        "900032": 26,
        "900092": 26,
        "900093": 26,
        "920093": 26,
        "9000c1": 26,
        "a02082": 26,
        "a22082": 26,
        "a32082": 26,
        "a020d3": 26,
        "9020e0": 26,
        "a03111": 26,
        "b03111": 26,
        "c03111": 26,
        "c03112": 26,
        "b03112": 26,
        "c03114": 26,
        "d03114": 26,
        "c03130": 26,
        "b03140": 26,
    }
    return switcher.get(argument, 17)


def initGpio(firstrun=0):
    # Init GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(0)

    # Init GPIO pins, set event_detect callbacks, save initial states etc.
    for i, channel in enumerate(gpio_ch):
        if not gpio_inout[i]:
            GPIO.setup(
                channel,
                GPIO.IN,
                pull_up_down=GPIO.PUD_DOWN if gpio_pud[i] == 0 else GPIO.PUD_UP
            )
            GPIO.add_event_detect(
                channel,
                GPIO.BOTH,
                callback=gpio_callback,
                bouncetime=debounce
            )
            gpio_state[i] = GPIO.input(channel)  # Primary state


def gpio_callback(channel):
    # Callback fucntion - waiting for event, changing gpio states
    global gpio_state
    gpio_state[gpio_ch.index(channel)] = GPIO.input(channel)
    print(
        "Channel:" + str(channel),
        " changed " + ("(on)" if GPIO.input(channel) else "(off)")
    )


# start script
try:
    # Detect Raspberry Pi model
    RaspiModel = getRaspiModel(GPIO.RPI_INFO['REVISION'])
    if (RaspiModel == "not supported"):
        raise RuntimeError('hardware not supported')
    print('RPi model:', RaspiModel)

    # Detect GPIO parameters
    # gpio_ch - array of GPIO lines numbers
    gpio_num = getGpioNum(GPIO.RPI_INFO['REVISION'])
    if (gpio_num == 17):
        gpio_ch = [0, 1, 4, 7, 8, 9, 10, 11,
                   14, 15, 17, 18, 21, 22, 23, 24, 25]
    else:
        gpio_ch = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                   15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
    debounce = 200

    # Init vars
    # 3 main structures:
    # gpio_state stores current states of GPIO pins
    # gpio_inout stores where pin configured to be IN or OUT
    # gpio_pud stores pin's pullup state
    gpio_state = [0 for _ in range(gpio_num)]
    gpio_inout = [0 for _ in range(gpio_num)]
    gpio_pud = [0 for _ in range(gpio_num)]
    log = ['' for _ in range(6)]
    print(gpio_inout)

    # Init GPIO
    initGpio()

    # Main loop
    while True:
        time.sleep(0.1)

except KeyboardInterrupt:
    print('stopped by user.')
except Exception as e:
    print(e)

finally:
    print('closed.')
