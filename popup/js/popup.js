const addTaskRef = document.querySelector('#add-task');
const taskContainerRef = document.querySelector('#task-container');

const tasks = [];

addTaskRef.addEventListener('click', () => addTask());

const renderTask = (taskNum) => {
  const taskRow = document.createElement('div');
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  text.value = tasks[taskNum];

  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
  deleteBtn.addEventListener('click', () => {
    deleteTask(taskNum);
  });
  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);
  taskContainerRef.appendChild(taskRow);
};

const addTask = () => {
  const taskNum = tasks.length;
  tasks.push('');
  renderTask(taskNum);
};

const deleteTask = (taskNum) => {
  tasks.splice(taskNum, 1);
  renderTasks();
};

const renderTasks = () => {
  taskContainerRef.textContent = '';
  tasks.forEach((taskText, taskNum) => renderTask(taskNum));
};
