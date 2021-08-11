const nameInputRef = document.querySelector('#name-input');
const saveBtnRef = document.querySelector('#save-btn');

saveBtnRef.addEventListener('click', () => {
  const name = nameInputRef.value;
  chrome.storage.sync.set({ name }, () => {
    console.log(`Name is set to ${name}`);
  });
});

chrome.storage.sync.get(['name', 'test'], (items) => {
  nameInputRef.value = items.name;
});
