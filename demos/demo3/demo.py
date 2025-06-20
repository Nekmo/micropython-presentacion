from machine import Pin
from time import sleep

button = Pin(1, Pin.IN, Pin.PULL_UP)

while True:
    state = not button.value()
    print(int(state))
    sleep(0.1)
