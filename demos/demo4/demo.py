from machine import Pin, PWM
from time import sleep
import urandom

r = PWM(Pin(1), freq=1000)
g = PWM(Pin(2), freq=1000)
b = PWM(Pin(3), freq=1000)


def set_color(red, green, blue):
    r.duty(red)
    g.duty(green)
    b.duty(blue)


while True:
    red = urandom.getrandbits(10)
    green = urandom.getrandbits(10)
    blue = urandom.getrandbits(10)
    set_color(red, green, blue)
    sleep(1)
