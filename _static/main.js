
function addDiv(el, className) {
    var div;
    div = document.createElement('div');
    div.classList = className;
    el.append(div);
    return div;
}

function addDivs(elements, className) {
    for (var i = 0; i < elements.length; i++) {
        addDiv(elements[i], className);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    /* Add green-lines to the slides */
    var greenBgs = document.querySelectorAll("[data-background-hash='0#36760dnullnullnullnullnull']");
    greenBgs.forEach((el) => {
        el.classList.add("green-lines");
        [...Array(10).keys()].forEach((i) => {
            addDiv(el, `light x${i}`);
        });
    });

    /* Add star to the slides */
    var starsBgs = document.querySelectorAll("[data-background-hash='0#090a0fnullnullnullnullnull']");
    starsBgs.forEach((el) => {
        el.classList.add("stars");
        [...Array(10).keys()].forEach((i) => {
            addDiv(el, `star${i}`);
        });
    });

    /* Add circuit to the slides */
    var circuitBgs = document.querySelectorAll("[data-background-hash='0#DDDDDDnullnullnullnullnull']");
    circuitBgs.forEach((el) => {
        el.classList.add("circuit");
        for (var i = 0; i < 5; i++) {
            addDiv(el, `gray-shape gray-shape-${i}`);
        }
        // const wrap = addDiv(el, "circuit-wrap");
        // addDiv(wrap, "top-plane");
        // addDiv(wrap, "bottom-plane");
    });


    // Reveal.on('slidechanged', (event) => {
    //     // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    //     playAsciinema(event.currentSlide);
    //     playAsciinema(event.previousSlide);
    //
    //     let iframe = event.currentSlide.querySelector("iframe");
    //
    //     // Reload this iframe to fix a width issue with the plot.ly graph.
    //     if (iframe) {
    //         iframe.src = iframe.src;
    //     }
    // });
    //
    // /* Add waves to the slides */
    // var starBg = document.querySelectorAll("[data-background-hash='0#333333nullnullnullnullnull']");
    // for (var i = 0; i < starBg.length; i++) {
    //     console.log(starBg[i]);
    //     addDiv(starBg[i], "waves");
    // }
    //
    // /* Add bubbles to the slides */
    // var starBg = document.querySelectorAll("[data-background-hash='0#4973ffnullnullnullnullnull']");
    // for (var i = 0; i < starBg.length; i++) {
    //     console.log(starBg[i]);
    //     var div = addDiv(starBg[i], "bubbles");
    //     for (var j = 0; j < 50; j++) {
    //         addDiv(div, "bubble");
    //     }
    // }
    //
    // /* Add boxes to the slides */
    // var starBg = document.querySelectorAll("[data-background-hash='0#4e54c8nullnullnullnullnull']");
    // for (var i = 0; i < starBg.length; i++) {
    //     console.log(starBg[i]);
    //     var div = addDiv(starBg[i], "boxes");
    //     for (var j = 0; j < 10; j++) {
    //         addDiv(div, "box");
    //     }
    // }
    //
    // /* Gray */
    // var starBg = document.querySelectorAll("[data-background-hash='0#fcfcfcnullnullnullnullnull']");
    // for (var i = 0; i < starBg.length; i++) {
    //     console.log(starBg[i]);
    //     var div = addDiv(starBg[i], "gray-shapes");
    //     for (var j = 0; j < 5; j++) {
    //         addDiv(div, "gray-shape");
    //     }
    // }
    //
    // /* Diagonals */
    // var starBg = document.querySelectorAll("[data-background-hash='0#6c36c3nullnullnullnullnull']");
    // for (var i = 0; i < starBg.length; i++) {
    //     console.log(starBg[i]);
    //     var div = addDiv(starBg[i], "diagonals");
    //     for (var j = 0; j < 3; j++) {
    //         addDiv(div, "diagonal");
    //     }
    // }

});

function getCurrentSlide() {
    const section = document.querySelector(".reveal .slides section.present");
    if (section.querySelectorAll("section").length > 0) {
        return section.querySelector("section.present");
    } else {
        return section;
    }
}

// Micropython
let port, writer, reader;
let keepReading = false;
let readBuffer = "";

async function toggleSerialConnection() {
    if (port) {
        await disconnectSerial();
    } else {
        await connectSerial();
    }
}

async function connectSerial() {
    try {
        ports = await navigator.serial.getPorts();
        if(ports.length > 0) {
            port = ports[0];
            try {
                await port.open({ baudRate: 115200 });
            } catch (_) {}
        } else {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
        }

        const decoder = new TextDecoderStream();
        const encoder = new TextEncoderStream();

        port.readable.pipeTo(decoder.writable);
        reader = decoder.readable.getReader();

        encoder.readable.pipeTo(port.writable);
        writer = encoder.writable.getWriter();

        keepReading = true;
        readLoop();

        updateUIConnection(true);
        logOutput("✅ Conectado al ESP32-S3");
    } catch (err) {
        console.error(err);
        logOutput("❌ Error al conectar: " + err.message);
    }
}

async function disconnectSerial() {
    keepReading = false;

    try {
        await writer.write("\x03"); // Ctrl+C
        await writer.write("\x02"); // Ctrl+B
    } catch (e) {
        console.warn("No se pudo enviar Ctrl+C o Ctrl+B:", e);
    }

    try {
        if (reader) {
            try {
                await reader.cancel();
            } catch (e) {
                console.warn("No se pudo cancelar el reader:", e);
            }
            try {
                await reader.releaseLock();
            } catch (e) {
                console.warn("No se pudo liberar el reader:", e);
            }
        }

        if (writer) {
            try {
                await writer.close();
            } catch (e) {
                console.warn("No se pudo cerrar el writer:", e);
            }
            try {
                await writer.releaseLock();
            } catch (e) {
                console.warn("No se pudo liberar el writer:", e);
            }
        }

        if (port) {
            try {
                await port.close();
            } catch (e) {
                console.warn("No se pudo cerrar el puerto:", e);
            }
        }
    } catch (err) {
        console.warn("Error al cerrar conexión:", err);
    }

    reader = null;
    writer = null;
    port = null;
    updateUIConnection(false);
    logOutput("🔌 Desconectado del ESP32-S3");
}

function updateUIConnection(connected) {
    const indicator = document.querySelectorAll(".status-indicator");
    const connectBtn = document.querySelectorAll(".connect");
    const sendBtn = document.querySelectorAll(".send");
    const restartBtn = document.querySelectorAll(".restart");

    indicator.forEach((el) => {
        el.style.background = connected ? "green" : "red";
    });

    connectBtn.forEach((el) => {
        el.textContent = connected ? "Desconectar" : "Conectar";
    });

    sendBtn.forEach((el) => {
        el.disabled = !connected;
    });

    restartBtn.forEach((el) => {
        el.disabled = !connected;
    });

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendCode(rawCode) {
    if (!writer) {
        logOutput("⚠️ No estás conectado al ESP32-S3.");
        return;
    }

    await writer.write("\x03"); // Ctrl+C

    await delay(100);

    await writer.write("\x05");
    await delay(50);
    await writer.write(rawCode);
    await writer.write("\x04");
}

async function readLoop() {
    while (keepReading) {
        try {
            const { value, done } = await reader.read();
            if (done) break;
            if (value) {
                readBuffer += value;
                let lines = readBuffer.split(/\r?\n/);
                readBuffer = lines.pop();
                lines.forEach(logOutput);
            }
        } catch (err) {
            console.error("Lectura interrumpida", err);
            break;
        }
    }
}

function logOutput(text) {
    const output = getCurrentSlide().querySelector(".terminal");
    output.textContent += text + "\n";
    output.scrollTop = output.scrollHeight;
}

async function restartESP() {
    console.log(port);
    if (!writer) {
        logOutput("⚠️ No estás conectado al ESP32-S3.");
        return;
    }

    const resetCode = 'import machine\nmachine.reset()\n';

    try {
        await writer.write("\x03"); // Ctrl+C
        await writer.write("\x02"); // Ctrl+B
        await delay(100);
        await sendCode(resetCode);
        await delay(500);
        logOutput("🔁 Reinicio solicitado (machine.reset()).");
        await delay(3000);
        await connectSerial();
    } catch (e) {
        logOutput("❌ Error al enviar el comando de reinicio: " + e.message);
    }
}


// Editor
function addEditor(rootEl, monaco) {
    let editor;

    let preEl = rootEl.querySelector("pre");
    let toolbarEl = rootEl.querySelector(".toolbar");
    let fontSizeEl = toolbarEl.querySelector(".font-size");
    let themeEl = toolbarEl.querySelector(".theme");
    let containerEl = rootEl.querySelector(".container");

    let connectEl = toolbarEl.querySelector(".connect");
    let sendEl = toolbarEl.querySelector(".send");
    let restartEl = toolbarEl.querySelector(".restart");
    let toggleVideoEl = toolbarEl.querySelector(".toggle-video");

    let editorEl = rootEl.querySelector(".editor");
    let resizerEl = rootEl.querySelector(".resizer");
    let terminalEl = rootEl.querySelector(".terminal");

    editor = monaco.editor.create(editorEl, {
        value: preEl.textContent,
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 20,
        minimap: { enabled: false }
    });

    fontSizeEl.addEventListener("change", e => {
        const size = parseInt(e.target.value);
        editor.updateOptions({ fontSize: size });
        terminalEl.style.fontSize = size + "px";
    });

    themeEl.addEventListener("change", e => {
        monaco.editor.setTheme(e.target.value);
    });

    let isResizing = false;

    connectEl.addEventListener("click", async (e) => {
        await toggleSerialConnection();
    });

    sendEl.addEventListener("click", async (e) => {
        const code = editor.getValue();
        await sendCode(code);
    });

    restartEl.addEventListener("click", async (e) => {
        await restartESP();
    });

    toggleVideoEl.addEventListener("click", (e) => {
        const cameraBox = document.getElementById("camera-box");
        if (cameraBox.classList.contains("demo")) {
            cameraBox.classList.remove("demo");
            cameraBox.classList.add("camera");
            toggleVideoEl.textContent = "Vídeo";
        } else {
            cameraBox.classList.remove("camera");
            cameraBox.classList.add("demo");
            toggleVideoEl.textContent = "Cámara";
        }
        applyDemoVideo();
    });

    resizerEl.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isResizing = true;
        document.body.style.cursor = "row-resize";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;
        const containerTop = containerEl.getBoundingClientRect().top;
        const newEditorHeight = e.clientY - containerTop - resizerEl.offsetHeight / 2;
        const minHeight = 50;
        const maxHeight = containerEl.clientHeight - 50;
        const clamped = Math.max(minHeight, Math.min(newEditorHeight, maxHeight));
        editorEl.style.height = clamped + "px";
        terminalEl.style.height = (containerEl.clientHeight - clamped - resizerEl.offsetHeight) + "px";
        editor.layout();
    });

    document.addEventListener("mouseup", () => {
        isResizing = false;
        document.body.style.cursor = "default";
    });

}

(async () => {
    // 1. Cargar Monaco desde ESM CDN (sin RequireJS, sin define())
    const monaco = await import('https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/+esm');

    document.body.querySelectorAll(".micropython-demo").forEach((el) => {
        addEditor(el, monaco);
    });

})();

// Cámara
let streamStarted = false;
let currentStream = null;

async function loadCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const select = document.getElementById('camera-select');
        select.innerHTML = "";
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Cámara ${index + 1}`;
            select.appendChild(option);
        });
    } catch (e) {
        console.error("Error al enumerar cámaras:", e);
    }
}

async function startCameraWithDevice(deviceId) {
    const box = document.getElementById("camera-box");
    const video = box.querySelector("video");
    const cameraFocus = document.getElementById("camera-focus");
    const cameraBrightness = document.getElementById("camera-brightness");
    const cameraColorTemperature = document.getElementById("camera-color-temperature");
    const cameraContrast = document.getElementById("camera-contrast");
    const cameraExposureTime = document.getElementById("camera-exposure-time");
    const cameraSaturation = document.getElementById("camera-saturation");
    const cameraSharpness = document.getElementById("camera-sharpness");

    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } }
        });
        currentStream = stream;
        video.srcObject = stream;
        box.style.display = "block";
        streamStarted = true;

        if (currentStream && currentStream.getVideoTracks().length > 0) {
            const track = currentStream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            const settings = track.getSettings();
            if (capabilities.focusDistance) {
                cameraFocus.max = capabilities.focusDistance.max;
                cameraFocus.min = capabilities.focusDistance.min;
                cameraFocus.value = settings.focusDistance;
                cameraFocus.enabled = true;
            } else {
                cameraFocus.value = "";
                cameraFocus.enabled = false;
            }
            if (capabilities.brightness) {
                cameraBrightness.max = capabilities.brightness.max;
                cameraBrightness.min = capabilities.brightness.min;
                cameraBrightness.value = settings.brightness;
                cameraBrightness.enabled = true;
            } else {
                cameraBrightness.value = "";
                cameraBrightness.enabled = false;
            }
            if (capabilities.colorTemperature) {
                cameraColorTemperature.max = capabilities.colorTemperature.max;
                cameraColorTemperature.min = capabilities.colorTemperature.min;
                cameraColorTemperature.value = settings.colorTemperature;
                cameraColorTemperature.enabled = true;
            } else {
                cameraColorTemperature.value = "";
                cameraColorTemperature.enabled = false;
            }
            if (capabilities.contrast) {
                cameraContrast.max = capabilities.contrast.max;
                cameraContrast.min = capabilities.contrast.min;
                cameraContrast.value = settings.contrast;
                cameraContrast.enabled = true;
            } else {
                cameraContrast.value = "";
                cameraContrast.enabled = false;
            }
            if (capabilities.exposureTime) {
                cameraExposureTime.max = capabilities.exposureTime.max;
                cameraExposureTime.min = capabilities.exposureTime.min;
                cameraExposureTime.value = settings.exposureTime;
                cameraExposureTime.enabled = true;
            } else {
                cameraExposureTime.value = "";
                cameraExposureTime.enabled = false;
            }
            if (capabilities.saturation) {
                cameraSaturation.max = capabilities.saturation.max;
                cameraSaturation.min = capabilities.saturation.min;
                cameraSaturation.value = settings.saturation;
                cameraSaturation.enabled = true;
            } else {
                cameraSaturation.value = "";
                cameraSaturation.enabled = false;
            }
            if (capabilities.sharpness) {
                cameraSharpness.max = capabilities.sharpness.max;
                cameraSharpness.min = capabilities.sharpness.min;
                cameraSharpness.value = settings.sharpness;
                cameraSharpness.enabled = true;
            } else {
                cameraSharpness.value = "";
                cameraSharpness.enabled = false;
            }
        }
    } catch (e) {
        alert("No se pudo acceder a la cámara: " + e.message);
    }
}

async function toggleCamera() {
    const box = document.getElementById("camera-box");
    const select = document.getElementById("camera-select");

    const deviceId = select.value;

    if (!streamStarted) {
        await startCameraWithDevice(deviceId);
    } else {
        box.style.display = "none";
        streamStarted = false;
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        currentStream = null;
        document.querySelector("#camera-box video").srcObject = null;
    }
}

function applyCameraConstraint(property, value) {
    const track = currentStream.getVideoTracks()[0];
    track.applyConstraints({ advanced: [{ [property]: value }] });
}

function slideToggleCamera(slide) {
    const box = document.getElementById("camera-box");
    const controls = document.getElementById("camera-controls");
    if (slide.querySelector(".micropython-demo")) {
        box.classList.remove("hidden");
        controls.style.display = "block";
    } else {
        box.classList.add("hidden");
        controls.style.display = "none";
    }
}

function applyDemoVideo(currentSlide) {
    const micropythonDemoVideo = currentSlide.querySelector(".micropython-demo-video");
    if (micropythonDemoVideo) {
        const cameraBox = document.getElementById("camera-box");
        const clonedMicropythonDemoVideo = micropythonDemoVideo.cloneNode(true);
        const lastMicropythonDemoVideo = cameraBox.querySelector(".micropython-demo-video");
        if (lastMicropythonDemoVideo) {
            lastMicropythonDemoVideo.remove();
        }
        cameraBox.appendChild(clonedMicropythonDemoVideo);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    /* Add camera-box */
    document.body.insertAdjacentHTML('beforeend', `
      <div id="camera-box" class="demo">
        <video autoplay muted playsinline id="camera-video"></video>
      </div>
      <div id="camera-controls">
          <button>📹</button>
          <div class="controls" style="display:none;">
              <button onclick="toggleCamera()">Act./Des.</button>
              <label for="camera-select">cámara:</label>
              <select id="camera-select"></select>
              <label for="camera-select">Focus:</label>
              <input id="camera-focus" type="number" />
              <label for="camera-select">Brightness:</label>
              <input id="camera-brightness" type="number" />
              <label for="camera-select">Temperature:</label>
              <input id="camera-color-temperature" type="number" />
              <label for="camera-select">Contrast:</label>
              <input id="camera-contrast" type="number" />
              <label for="camera-select">Exp. Time:</label>
              <input id="camera-exposure-time" type="number" />
              <label for="camera-select">Saturation:</label>
              <input id="camera-saturation" type="number" />
              <label for="camera-select">Sharpness:</label>
              <input id="camera-sharpness" type="number" />
          </div>
      </div>
    `);

    document.getElementById("camera-select").addEventListener("change", async (e) => {
        if (streamStarted) {
            await startCameraWithDevice(e.target.value);
        }
    });

    const cameraFocus = document.getElementById("camera-focus");
    cameraFocus.addEventListener("change", async (e) => {
        const track = currentStream.getVideoTracks()[0];
        await track.applyConstraints({ focusMode: "manual", advanced: [{ focusDistance: parseInt(e.target.value) }] });
    });

    // Add event listeners for camera controls
    [
        {name: "camera-brightness", property: "brightness"},
        {name: "camera-color-temperature", property: "colorTemperature"},
        {name: "camera-contrast", property: "contrast"},
        {name: "camera-exposure-time", property: "exposureTime"},
        {name: "camera-saturation", property: "saturation"},
        {name: "camera-sharpness", property: "sharpness"},
    ].forEach(({name, property}) => {
        const input = document.getElementById(name);
        input.addEventListener("change", (e) => applyCameraConstraint(property, parseInt(e.target.value)));
    });

    document.querySelector("#camera-controls button").addEventListener("click", (e) => {
        const controls = document.querySelector("#camera-controls .controls");
        if (controls.style.display === "none") {
            controls.style.display = "inline-block";
            e.target.textContent = "❌";
        } else {
            controls.style.display = "none";
            e.target.textContent = "📹";
        }
    });

    window.addEventListener("load", async () => {
        await loadCameras();
        try {
            const permissions = await navigator.permissions.query({ name: "camera" });
            if (permissions.state === "granted") {
                toggleCamera();
            }
        } catch (e) {
            console.log("No se pudo comprobar permisos de cámara: " + e.message);
        }
    });

    (function makeDraggable() {
        const box = document.getElementById("camera-box");
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        box.addEventListener("mousedown", e => {
            const rect = box.getBoundingClientRect();
            if (e.offsetX > rect.width - 20 && e.offsetY > rect.height - 20) return;
            isDragging = true;
            offsetX = e.clientX - box.offsetLeft;
            offsetY = e.clientY - box.offsetTop;
        });

        document.addEventListener("mousemove", e => {
            if (isDragging) {
                box.style.left = `${e.clientX - offsetX}px`;
                box.style.top = `${e.clientY - offsetY}px`;
                box.style.right = "auto";
            }
        });

        document.addEventListener("mouseup", () => isDragging = false);
    })();

    Reveal.on('slidechanged', (event) => {
        slideToggleCamera(event.currentSlide);
        applyDemoVideo(event.currentSlide);
    });
    slideToggleCamera(getCurrentSlide());
    applyDemoVideo(getCurrentSlide());
});

document.addEventListener("DOMContentLoaded", function(event) {
    /* Autoplay video */
    Reveal.on('slidechanged', (event) => {
        const videos = event.currentSlide.querySelectorAll("video");
        videos.forEach((video) => {
            if (video && video.paused) {
                video.play().catch((e) => {
                    console.warn("No se pudo reproducir el video:", e);
                });
            }
        });
    });
});
