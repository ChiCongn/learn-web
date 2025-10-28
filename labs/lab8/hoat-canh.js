const jackFrames = [
    "./jump0.gif",
    "./jump1.gif",
    "./jump2.gif",
    "./jump3.gif"
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

const frames = jackFrames.length;

let curPosition = 0;
let direction = "up";
let jumpingInterval = null;

function jump() {
    if (direction === "up") {
        if (curPosition === jackFrames.length - 1) {
            curPosition--;
            direction = "down";
        } else {
            curPosition++;
        }
    } else {
        if (curPosition === 0) {
            curPosition++;
            direction = "up";
        } else {
            curPosition--;
        }
    }

    const jackImg = document.getElementById("jack");
    if (jackImg) jackImg.src = jackFrames[curPosition].src;
}

function startJumping() {
    stopJumping(); // clear old interval if any
    console.log("start jumping");
    jumpingInterval = setInterval(jump, 200);
}

function stopJumping() {
    console.log("stop jumping");
    if (jumpingInterval) {
        clearInterval(jumpingInterval);
        jumpingInterval = null;
    }
}
