function noise() {
    return Math.random() * 0.5 + 0.5;
}

function colorDistance(scale, dest, src) {
    return (scale * dest + (1 - scale) * src);
}

function processSepia(binaryData) {
    for (let i = 0; i < binaryData.length; i += 4) {
        let r = binaryData[i];
        let g = binaryData[i + 1];
        let b = binaryData[i + 2];

        binaryData[i] = colorDistance(noise(), (r * 0.393) + (g * 0.769) + (b * 0.189), r);
        binaryData[i + 1] = colorDistance(noise(), (r * 0.349) + (g * 0.686) + (b * 0.168), g);
        binaryData[i + 2] = colorDistance(noise(), (r * 0.272) + (g * 0.534) + (b * 0.131), b);
    }
}

let ports = [];
let lastProcessedData = null;

onconnect = function (event) {
    const port = event.ports[0];
    ports.push(port);

    if (lastProcessedData) {
        port.postMessage({ type: "processed", data: lastProcessedData });
    }

    port.onmessage = function (e) {
        const msg = e.data;

        if (msg.type === "process") {
            let pixels = msg.data;
            processSepia(pixels);
            lastProcessedData = pixels;

            // Gửi kết quả cho tất cả các tab đang kết nối
            ports.forEach(p => p.postMessage({ type: "processed", data: pixels }));
        }
    };
};
