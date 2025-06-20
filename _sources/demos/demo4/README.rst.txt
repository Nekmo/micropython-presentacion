Demo 3
######

En esta demo se enciende un LED RGB con patrones de colores aleatorios.

Debes modificar los siguientes pines utilizados en tu microcontrolador, si fuese necesario.

.. code-block:: python

   r = PWM(Pin(1), freq=1000)
   g = PWM(Pin(2), freq=1000)
   b = PWM(Pin(3), freq=1000)



Componentes
===========

- Microcontrolador compatible con Micropython, como ESP32 o Raspberry Pi Pico.
- LED RGB.
- 3 resistencias de 220 ohmios (opcional, para limitar la corriente al LED).

Instalación
===========

- Identifica los números de pines a los que vas a conectar el LED en tu microcontrolador, usando el esquema
  proporcionado por el fabricante. Necesitarás tres pines, uno para cada color del LED RGB.
- Emplea una resistencia de 220 ohmios en serie con cada color del LED RGB para limitar la corriente, si dispones de
  ellas.
- Conecta el ánodo de cada color del LED RGB a los pines seleccionados y el cátodo común (generalmente el pin más largo)
  a tierra (GND). El pin que está solo, al lado del más largo (tierra), es el correspondiente al color rojo. Los dos
  restantes son los colores verde y azul, siendo el más lejano el azul y el más cercano al rojo el verde.

Simulación
==========

https://wokwi.com/projects/430969137319883777
