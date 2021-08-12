const timeOptionRef = document.querySelector('#time-option');
const saveBtnRef = document.querySelector('#save-btn');

timeOptionRef.addEventListener('change', (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    timeOptionRef.value = 25;
  }
});

saveBtnRef.addEventListener('click', (event) => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOptionRef.value,
    isRunning: false
  });
});

chrome.storage.local.get(['timeOption'], (res) => {
  timeOptionRef.value = res.timeOption ?? 25;
});
