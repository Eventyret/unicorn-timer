const timeRef = document.querySelector('#time');
const nameRef = document.querySelector('#name');
const timerRef = document.querySelector('#timer');
const startBtnRef = document.querySelector('#start-timer');
const stopBtnRef = document.querySelector('#stop-timer');
const resetBtnRef = document.querySelector('#reset-timer');

function updateTimeElements() {
  const currentTime = new Date().toLocaleTimeString();
  chrome.storage.local.get(['timer'], (res) => {
    const time = res.timer ?? 0;
    timerRef.textContent = `The timer is at: ${time} seconds`;
  });
  timeRef.innerHTML = `The time is ${currentTime}`;
}
updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(['name'], (items) => {
  const name = items.name ?? 'Unknown';
  nameRef.textContent = `Your name is ${name}`;
});

startBtnRef.addEventListener('click', () => {
  chrome.storage.local.set({ isRunning: true });
});
stopBtnRef.addEventListener('click', () => {
  chrome.storage.local.set({ isRunning: false });
});
resetBtnRef.addEventListener('click', () => {
  chrome.storage.local.set({ isRunning: false, timer: 0 });
});
