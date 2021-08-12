const addTaskRef = document.querySelector('#add-task');
const taskContainerRef = document.querySelector('#task-container');

const tasks = [];

const addTask = () => {
  const taskNum = tasks.length;
  tasks.push('');
  const taskRow = document.createElement('div');
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';

  text.addEventListener('change', () => {
    tasks[taskNum] = text.value;
    console.log(tasks);
  });

  const deleteBtn = document.createElement('input');
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';
  deleteBtn.addEventListener('click', () => {
    taskk.splice(taskNum, 1);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);
  taskContainerRef.appendChild(taskRow);
};

addTaskRef.addEventListener('click', () => addTask());
