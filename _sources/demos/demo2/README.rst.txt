Demo 2
######

En esta demo se enciende y apaga un LED de forma gradual, gracias a la modulación por ancho de pulso (PWM).

Debes modificar el número de PIN al que estés utilizando en tu microcontrolador, si fuese necesario.

.. code-block:: python

   led = PWM(Pin(1), freq=1000)


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

https://wokwi.com/projects/430964218492361729
