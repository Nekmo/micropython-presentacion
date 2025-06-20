from machine import Pin, I2C
from time import sleep
import ssd1306
import sht4x

i2c = I2C(0, scl=Pin(1), sda=Pin(2))
print(i2c.scan())
oled = ssd1306.SSD1306_I2C(128, 64, i2c, 0x3C)
sensor = sht4x.SHT4X(i2c, 0x44)

while True:
    temperature, humidity = sensor.measurements
    oled.fill(0)
    oled.text("Temp: {:.1f} C".format(temperature), 0, 0)
    oled.text("Hum:  {:.1f} %".format(humidity), 0, 20)
    oled.show()
    sleep(2)
