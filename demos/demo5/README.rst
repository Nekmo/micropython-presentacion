Demo 5
######

En esta demo se encienden tres LEDs APA106 (también conocidos como WS2812B), necesitando tan solo 1 cable de datos
para controlarlos, además de alimentación y tierra. Estos LEDs son direccionables individualmente, alternando entre
rojo, verde y azul en esta demo.

Debes modificar el número de PIN utilizado en tu microcontrolador, si fuese necesario.

.. code-block:: python

   PIN_NUM = 1


Componentes
===========

- Microcontrolador compatible con Micropython, como ESP32 o Raspberry Pi Pico.
- 3 LED APA106 (WS2812B).
- Resistencia de 330 ohmios (opcional, para limitar la corriente al LED).

Instalación
===========

- Identifica el número de PIN al que vas a conectar el primer LED en tu microcontrolador, usando el esquema
  proporcionado por el fabricante.
- Identifica el PIN de alimentación (VCC) y tierra (GND) de los LEDs APA106 (WS2812B) que vas a utilizar. La tensión
  de alimentación debe ser de 5V.
- Emplea una resistencia de 330 ohmios en el cable de datos del LED APA106 (WS2812B) para limitar la corriente si
  dispones de una.
- Identifica cada uno de los pines de los LEDs APA106 (WS2812B):
  - El pin más corto es el de entrada de datos (Data In).
  - El pin más largo es el de tierra (GND).
  - El pin que está entre la entrada de datos y tierra es el de alimentación (VCC).
  - El pin restante es el de salida de datos (Data Out), que se conecta al siguiente LED APA106 (WS2812B) si hay más,
    a la entrada de datos del siguiente LED.
- Conecta el pin de entrada de datos del primer LED APA106 (WS2812B) al PIN seleccionado en tu microcontrolador.
- Conecta el pin de salida de datos del primer LED APA106 (WS2812B) al pin de entrada de datos del segundo LED APA106
  (WS2812B), y así sucesivamente si hay más LEDs.
- Conecta el pin de alimentación (VCC) de los LEDs APA106 (WS2812B) al voltaje de 5V y el pin de tierra (GND) a tierra
  (GND) de tu microcontrolador.

Simulación
==========

https://wokwi.com/projects/431056405050983425
