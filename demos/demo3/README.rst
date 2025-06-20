Demo 3
######

En esta demo se detecta la pulsación de un botón, mostrándose por consola el estado del mismo.

Debes modificar el número de PIN al que estés utilizando en tu microcontrolador, si fuese necesario.

.. code-block:: python

   button = Pin(1, Pin.IN, Pin.PULL_UP)


El uso de la resistencia pull-up evita que el PIN quede flotante cuando el botón no está pulsado, lo que podría generar
lecturas erróneas. Ésta es una resistencia interna del microcontrolador, por lo que no es necesario añadir una
resistencia externa.

Componentes
===========

- Microcontrolador compatible con Micropython, como ESP32 o Raspberry Pi Pico.
- Botón.

Instalación
===========

- Identifica el número de PIN al que vas a conectar el LED en tu microcontrolador, usando el esquema proporcionado por
  el fabricante.
- Conecta un terminal del botón al PIN seleccionado y el otro terminal a tierra (GND). No es necesario añadir una
  resistencia, ya que el microcontrolador cuenta con una resistencia pull-up interna.

Simulación
==========

https://wokwi.com/projects/430963109299119105
