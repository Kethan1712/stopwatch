let hours = 0;
let minutes = 0;
let seconds = 0;
let intervalId;
let lapCount = 0;

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');
const progressRingCircle = document.querySelector('.progress-ring-circle');

const radius = progressRingCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressRingCircle.style.strokeDasharray = circumference;
progressRingCircle.style.strokeDashoffset = circumference;

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    intervalId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 60) {
            hours++;
            minutes = 0;
        }
        displayHours.textContent = padZero(hours);
        displayMinutes.textContent = padZero(minutes);
        displaySeconds.textContent = padZero(seconds);

        const progress = (seconds + minutes * 60 + hours * 3600) / (24 * 3600); // Assuming 24-hour max
        progressRingCircle.style.strokeDashoffset = circumference * (1 - progress);
    }, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetStopwatch() {
    clearInterval(intervalId);
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 0;
    displayHours.textContent = '00';
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    progressRingCircle.style.strokeDashoffset = circumference;
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function recordLap() {
    lapCount++;
    const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}
