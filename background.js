chrome.alarms.create({ periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer'], (res) => {
    const time = res.timer ?? 0;
    chrome.storage.local.set({ timer: time + 1 });
    chrome.action.setBadgeText({ text: `${time + 1}` });
    if (time % 1000 === 0) {
      this.registration.showNotification('Unicorn Timer', {
        body: '1 second has passed',
        icon: 'assets/images/icon.png'
      });
    }
  });
});
