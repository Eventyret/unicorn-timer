const nameInputRef = document.querySelector('#name-input');
const timeInputRef = document.querySelector('#time-input');
const saveBtnRef = document.querySelector('#save-btn');

saveBtnRef.addEventListener('click', () => {
  const name = nameInputRef.value;
  const notificationTime = timeInputRef.value;
  chrome.storage.sync.set({ name, notificationTime }, () => {
    console.log(`Name is set to ${name}`);
  });
});

chrome.storage.sync.get(['name', 'notificationTime'], (item) => {
  nameInputRef.value = item.name ?? '';
  timeInputRef.value = item.notificationTime ?? 1000;
});
