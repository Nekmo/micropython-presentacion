Demo 1
######

En esta demo se hace parpadear un LED cada medio segundo, entre encendido y apagado.

Debes modificar el número de PIN al que estés utilizando en tu microcontrolador, si fuese necesario.

.. code-block:: python

    led = Pin(1, Pin.OUT)


Componentes
===========

- Microcontrolador compatible con Micropython, como ESP32 o Raspberry Pi Pico.
- LED.
- Resistencia de 330 ohmios (opcional, para limitar la corriente al LED).

Instalación
===========

- Identifica el número de PIN al que vas a conectar el LED en tu microcontrolador, usando el esquema proporcionado por
  el fabricante.
- Emplea una resistencia de 330 ohmios en serie con el LED para limitar la corriente, si dispones de una.
- Conecta el ánodo del LED (la pata más larga) al PIN seleccionado y el cátodo (la pata más corta) a tierra (GND).

Simulación
==========

https://wokwi.com/projects/430962530153768961
