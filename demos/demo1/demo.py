from machine import Pin
from time import sleep

led = Pin(1, Pin.OUT)

while True:
    led.on()
    sleep(0.5)
    led.off()
    sleep(0.5)
