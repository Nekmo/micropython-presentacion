import apa106
from machine import Pin
from time import sleep

NUM_LEDS = 3
PIN_NUM = 1

leds = apa106.APA106(Pin(PIN_NUM), NUM_LEDS)
colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]
positions = list(range(NUM_LEDS))

while True:
    for i in range(NUM_LEDS):
        leds[i] = colors[positions[i]]
    leds.write()
    positions = [(pos + 1) % NUM_LEDS for pos in positions]
    sleep(0.5)
