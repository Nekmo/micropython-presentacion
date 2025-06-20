Demo 6
######

En esta demo dispondremos de un sensor de temperatura y humedad SHT41, y una pantalla OLED SSD1306, mostrando la
temperatura y humedad en tiempo real. Debes modificar los números de PIN utilizados en tu microcontrolador, si fuese
necesario. Adicionalmente, puede ser necesario modificar la dirección I2C del sensor SHT41 y de la pantalla OLED
SSD1306, si no son las predeterminadas.

Los pines pueden encontrarse en la siguiente línea de código:

.. code-block:: python

    i2c = I2C(0, scl=Pin(1), sda=Pin(2))


Y las direcciones I2C en:

.. code-block:: python

    oled = ssd1306.SSD1306_I2C(128, 64, i2c, 0x3C)
    sensor = sht4x.SHT4X(i2c, 0x44)

Puedes instalar los paquetes necesarios usando upip, aunque se encuentran también disponibles en la misma carpeta del
ejemplo.

Componentes
===========

- Microcontrolador compatible con Micropython, como ESP32 o Raspberry Pi Pico.
- Sensor de temperatura y humedad SHT41.
- Pantalla OLED SSD1306.

Instalación
===========

- Identifica los dos pines a los que vas a conectar el sensor de temperatura y humedad, usando el esquema proporcionado
  por el fabricante. Decide cuál será el pin de reloj (SCL) y cuál el de datos (SDA). En este ejemplo, se utiliza el
  pin 1 para SCL y el pin 2 para SDA.
- Identifica en tu placa los conectores de alimentación de 5V y tierra (GND)
- Conecta el pin de reloj (SCL) del sensor SHT41 al pin 1 de tu microcontrolador y el pin de datos (SDA) al pin 2,
  según el ejemplo anterior.
- Conecta el pin de alimentación (VCC) del sensor SHT41 al voltaje de 3.3V o 5V, según las especificaciones del sensor,
  y el pin de tierra (GND) al de tierra de tu microcontrolador.
- Conecta la pantalla OLED SSD1306 de la misma manera. Puedes conectar directamente los pines SCL y SDA del sensor
  SHT41 a la pantalla OLED SSD1306, ya que ambas utilizan el mismo bus I2C. Haz lo propio con los pines de alimentación
  y tierra.


Simulación
==========

https://wokwi.com/projects/431057983406486529
