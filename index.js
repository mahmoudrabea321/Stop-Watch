// DOM Elements
const display = document.getElementById("display");
const startBtn = document.getElementById("startbtn");
const stopBtn = document.getElementById("stopbtn");
const resetBtn = document.getElementById("resetbtn");

// Stopwatch variables
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

// Format time to always show 2 digits
function formatTime(time) {
  return time.toString().padStart(2, '0');
}

// Format milliseconds to always show 2 digits
function formatMilliseconds(time) {
  return time.toString().padStart(2, '0');
}

// Update the display
function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  // Calculate time components
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  // Update display
  display.textContent = 
    `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
}

// Start the stopwatch
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    
    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

// Stop the stopwatch
function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    
    // Update button states
    startBtn.disabled = false;
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  
  // Reset display
  display.textContent = "00:00:00.00";
  
  // Update button states
  startBtn.disabled = false;
  stopBtn.disabled = false;
}

// Initialize button states
stopBtn.disabled = true;