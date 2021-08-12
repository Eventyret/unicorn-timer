const addTaskRef = document.querySelector('#add-task');
const taskContainerRef = document.querySelector('#task-container');
const startTimerBtnRef = document.querySelector('#start-timer');

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
const renderTask = (taskNum) => {
  const taskRow = document.createElement('div');
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];

  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
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
