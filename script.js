let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.innerHTML = "Detener";
        running = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Iniciar";
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = "Iniciar";
    display.innerHTML = "00:00:00";
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds;
}
