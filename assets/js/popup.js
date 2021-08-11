const timeElementRef = document.querySelector('#time');
const nameElementRef = document.querySelector('#name');
const currentTime = new Date().toLocaleTimeString();

timeElementRef.innerHTML = `The time is ${currentTime}`;

chrome.action.setBadgeText(
  {
    text: 'TIME'
  },
  () => {
    console.log('Finished settings badge text.');
  }
);

chrome.storage.sync.get(['name'], (items) => {
  const name = items.name ?? 'Unknown';
  nameElementRef.textContent = `Your name is ${name}`;
});
