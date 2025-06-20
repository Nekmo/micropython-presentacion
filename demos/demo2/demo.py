from machine import Pin, PWM
from time import sleep

led = PWM(Pin(1), freq=1000)

while True:
    for i in range(0, 1024, 10):
        led.duty(i)
        sleep(0.01)
    for i in range(1023, -1, -10):
        led.duty(i)
        sleep(0.01)
