.. image:: https://raw.githubusercontent.com/Nekmo/micropython-presentacion/master/logo.png
    :width: 100%

|

.. image:: https://img.shields.io/github/actions/workflow/status/Nekmo/micropython-presentacion/build.yml?style=flat-square&branch=master
  :target: https://github.com/Nekmo/micropython-presentacion/actions?query=workflow%3ABuild
  :alt: Latest CI build status


========================================================================
(WIP) Micropython: programación fácil y para todos de microcontroladores
========================================================================
Hasta hace no mucho, para programar microcontroladores requeríamos utilizar variantes de lenguajes como C/C++, quedando
fuera de nuestro alcance lenguajes populares y sencillos como Python. No obstante, los nuevos microcontroladores como
ESP32 o Raspberry Pi Pico, más potentes y con mayores recursos, han abierto la puerta a variantes de estos lenguajes,
como es el caso de Micropython. Veremos los primeros pasos, ejemplos prácticos como control de leds, formas de
comunicación, instalación de paquetes, limitaciones y más. Se recomienda disponer de conocimientos previos de Python,
aunque no es esencial. Si no conoces el mundo de los microcontroladores, ¡esta es tu charla! Micropython es una de las
formas más fáciles, cómodas, rápidas y divertidas de adentrarse.

La presentación está `disponible online <https://nekmo.github.io/micropython-presentacion/>`_ (WIP) ya compilada
para su visualización.


Requisitos y contenido
----------------------
No es necesarios conocimientos previos de microcontroladores, pero sí es recomendable conocer Python, ya que habrán
ejemplos prácticos utilizando este lenguaje de programación, en su variante Micropython. Esta versión es compatible con
las versiones estándar de Python, aunque con limitaciones. La presentación se divide en:

* Bienvenida e introducción.
* Qué son y para qué se usan los microcontroladores.
* Variantes y características, centrado en ESP32.
* Los conectores GPIO y esquema de un microcontrolador.
* Esquema, código y demostración de encender un LED.
* Código y demostración de uso analógico de un LED.
* Esquema, código y demostración de uso de un botón.
* Esquema, código y demostración de conectar un led RGB.
* Protocolos de comunicación.
* Esquema, código y demostración de un led WS2812.
* Esquema, código y demostración de un sensor y pantalla I2C.
* Código y demostración de un coche.
* Punto final a la presentación.
* Agradecimientos asociaciones, colaboradores y público.
* Formas de contacto.
* Turno de preguntas.

Motivación
----------
Ser un punto de introducción a los microcontroladores y a Micropython, sin necesidad de conocer ninguno de los dos.
Aunque será imposible conocerlos en detalle en tan solo 45 minutos, se verán los casos más sencillos como luces LED o
interruptores, y algunos más complejos como sensores y protocolos de comunicación. No será posible detenerse mucho
tiempo en cada ejemplo, pero el código y las demostraciones seguirán disponibles en esta presentación.

Acerca de
---------
La presente charla ha sido realizada para `Python Málaga <https://www.python-malaga.es/>`_, con fecha de presentación
el 20-21 de junio de 2025 en `OpenSouthCode <https://www.opensouthcode.org/>`_.

Compilación
-----------
Para compilar desde el código fuente se requiere Python 3 instalado, estando probado sólo bajo Python 3.12. Se
recomienda ejecutar los siguientes pasos en un
`virtualenv <https://nekmo.com/es/blog/python-virtualenvs-y-virtualenvwrapper/>`_::

    # Clonar proyecto
    git clone https://github.com/Nekmo/micropython-presentacion.git
    cd micropython-presentacion
    # Instalar dependencias
    pip install -r requirements.txt
    # Compilar ficheros de estilos
    sassc _static/theme.scss _static/theme.css
    # Compilar presentación
    make revealjs

Tras la compilación puede verse los ficheros resultantes en el directorio ``_build``.


Copyright
=========
Licencia MIT. Ver fichero ``LICENSE.txt``.

Nekmo 2025.

