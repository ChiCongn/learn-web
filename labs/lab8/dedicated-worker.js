document.getElementById("FileUpload1").onchange = function () {
    const previewImg = document.querySelector("img.preview");
    const targetCanvas = document.querySelector("canvas.target");
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        // Show original image
        previewImg.src = reader.result;
        previewImg.classList.remove("nodisplay");

        // Delay processing to allow browser to repaint
        setTimeout(() => {
            // Draw image onto canvas
            targetCanvas.width = previewImg.clientWidth;
            targetCanvas.height = previewImg.clientHeight;

            const ctx = targetCanvas.getContext("2d");
            ctx.drawImage(previewImg, 0, 0, targetCanvas.width, targetCanvas.height);

            // Initialize Web Worker
            const worker = new Worker("imgproc.js");

            // Handle processed result from worker
            worker.onmessage = (e) => {
                const processedPixels = e.data;
                const imageData = new ImageData(processedPixels, targetCanvas.width, targetCanvas.height);
                ctx.putImageData(imageData, 0, 0);

                // Show processed canvas
                targetCanvas.classList.remove("nodisplay");
            };

            // Extract image pixel data and send to worker
            const imgData = ctx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
            worker.postMessage(imgData.data);
        }, 100);
    };

    reader.readAsDataURL(file);
};