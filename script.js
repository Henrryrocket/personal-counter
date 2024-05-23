const timers = [
    { displayId: 'display1', startStopBtnId: 'startStopBtn1', resetBtnId: 'resetBtn1', localStorageKey: 'timer1' },
    { displayId: 'display2', startStopBtnId: 'startStopBtn2', resetBtnId: 'resetBtn2', localStorageKey: 'timer2' },
    { displayId: 'display3', startStopBtnId: 'startStopBtn3', resetBtnId: 'resetBtn3', localStorageKey: 'timer3' },
    { displayId: 'display4', startStopBtnId: 'startStopBtn4', resetBtnId: 'resetBtn4', localStorageKey: 'timer4' },
];

timers.forEach(timer => {
    let startTime;
    let updatedTime;
    let difference = 0;
    let tInterval;
    let running = false;

    const display = document.getElementById(timer.displayId);
    const startStopBtn = document.getElementById(timer.startStopBtnId);
    const resetBtn = document.getElementById(timer.resetBtnId);

    // Load saved time from localStorage
    if (localStorage.getItem(timer.localStorageKey)) {
        difference = parseInt(localStorage.getItem(timer.localStorageKey), 10);
        if (!isNaN(difference)) {
            updateTime();
        }
    }

    startStopBtn.addEventListener('click', () => {
        if (!running) {
            startTime = new Date().getTime() - difference;
            tInterval = setInterval(updateTime, 1000);
            startStopBtn.innerHTML = "Detener";
            running = true;
        } else {
            clearInterval(tInterval);
            difference = new Date().getTime() - startTime;
            localStorage.setItem(timer.localStorageKey, difference);
            running = false;
            startStopBtn.innerHTML = "Iniciar";
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Iniciar";
        difference = 0;
        localStorage.setItem(timer.localStorageKey, difference);
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
});

// Theme toggle button
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
toggleThemeBtn.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
        document.documentElement.removeAttribute('data-theme');
        toggleThemeBtn.textContent = 'Modo Oscuro';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleThemeBtn.textContent = 'Modo Claro';
    }
});
