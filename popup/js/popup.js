const addTaskRef = document.querySelector('#add-task');
const taskContainerRef = document.querySelector('#task-container');
const startTimerBtnRef = document.querySelector('#start-timer');
const resetTimerBtnRef = document.querySelector('#reset-timer');
const timeRef = document.querySelector('#time');

let tasks = [];

chrome.storage.sync.get(['tasks'], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

addTaskRef.addEventListener('click', () => addTask());
startTimerBtnRef.addEventListener('click', () => {
  chrome.storage.local.get(['isRunning'], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning
      },
      () => {
        startTimerBtnRef.textContent = !res.isRunning
          ? 'Pause Timer'
          : 'Start Timer';
      }
    );
  });
});

resetTimerBtnRef.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false
    },
    () => {
      startTimerBtnRef.textContent = 'Start Timer';
    }
  );
});
const renderTask = (taskNum) => {
  const taskRow = document.createElement('div');
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];
  text.className = 'task-input';

  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
  deleteTask.className = 'task-delete';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
    saveTasks();
  });
  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);
  taskContainerRef.appendChild(taskRow);
};

const addTask = () => {
  const taskNum = tasks.length;
  tasks.push('');
  renderTask(taskNum);
  saveTasks();
};

const deleteTask = (taskNum) => {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
};

const saveTasks = () => {
  chrome.storage.sync.set({
    tasks
  });
};

const renderTasks = () => {
  taskContainerRef.textContent = '';
  tasks.forEach((taskText, taskNum) => renderTask(taskNum));
};

const updateTime = () => {
  chrome.storage.local.get(['timer', 'timeOption'], (res) => {
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      '0'
    );
    let seconds = '00';
    if (res.timer % 60 !== 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, '0');
    }
    timeRef.textContent = `${minutes}:${seconds}`;
  });
};

updateTime();
setInterval(updateTime, 1000);
