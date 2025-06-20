import json
import time
import network
import web
from hardware import I2C
from hardware import Pin
from web import WebSocket
import uasyncio as asyncio

i2c0 = I2C(0, scl=Pin(26), sda=Pin(0), freq=400000)
i2c0.writeto_mem(0x38, 0x00, bytearray([0, 0, 0, 0]))

ap = network.WLAN(network.AP_IF)
ap.active(True)
ap.config(essid='roverc.pro', password='roverc.pro', authmode=network.AUTH_WPA_WPA2_PSK)

while not ap.active():
    time.sleep(1)

ip = ap.ifconfig()[0]
print('IP:', ip)

app = web.App(host='0.0.0.0', port=80)


def normalize_value(value: int | float) -> bytes:
    value = int(value)
    if value >= 128:
        value = 127  # The maximum value in positive is 127
    if value < 0:
        value = (256 + value)
    return value.to_bytes(1, "big")


def coords_to_mecano_wheels(x: int, y: int, maximum: int = 127):
    r1 = x + y
    r2 = -x + y
    r3 = -x + y
    r4 = x + y
    values = [r1, r2, r3, r4]
    max_val = max(abs(v) for v in values)
    if max_val > maximum:
        factor = maximum / max_val
        values = [v * factor for v in values]
    return [normalize_value(v) for v in values]


async def serve_static(w, filename, mimetype):
    # write http headers
    w.write('HTTP/1.0 200 OK\r\n')
    w.write(f'Content-Type: {mimetype}; charset=utf-8\r\n')
    w.write('\r\n')
    # write page body
    with open(filename, 'r') as f:
        w.write(f.read())
    # drain stream buffer
    await w.drain()


# root route handler
@app.route('/')
async def handler(r, w):
    return await serve_static(w, "index.html", "text/html")


# root route handler
@app.route('/joy.min.js')
async def serve_script(r, w):
    return await serve_static(w, "joy.min.js", "application/javascript")


# /ws WebSocket route handler
@app.route('/ws')
async def ws_handler(r, w):
    # upgrade connection to WebSocket
    ws = await WebSocket.upgrade(r, w)
    latest = None
    while True:
        evt = await ws.recv()
        if evt is None or evt['type'] == 'close':
            # handle closed stream/close event
            break
        elif evt['type'] == 'text':
            # print received messages and echo them
            print('Received:', evt['data'])
            data = json.loads(evt['data'])
            if "x" in data and "y" in data:
                x, y = data['x'], data['y']
                if (x, y) == latest:
                    continue
                try:
                    wheel1, wheel2, wheel3, wheel4 = coords_to_mecano_wheels(x, y)
                except OverflowError:
                    continue
                print("Wheels:", *(w[0] for w in (wheel1, wheel2, wheel3, wheel4)))
                i2c0.writeto_mem(0x38, 0x00, b"".join([wheel1, wheel2, wheel3, wheel4]))
                latest = x, y
            elif "claw" in data:
                value = 8 if data["claw"] else 87
                i2c0.writeto_mem(0x38, 0x10, value.to_bytes(1, 'big'))


# Start event loop and create server task
loop = asyncio.get_event_loop()
loop.create_task(app.serve())
loop.run_forever()
