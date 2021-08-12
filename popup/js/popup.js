const addTaskRef = document.querySelector('#add-task');
const taskContainerRef = document.querySelector('#task-container');

const addTask = () => {
  const taskRow = document.createElement('div');
  const deleteBtn = document.createElement('input');
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = 'Enter a task...';
  deleteBtn.type = 'button';
  deleteBtn.value = 'X';

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);
  taskContainerRef.appendChild(taskRow);
};

addTaskRef.addEventListener('click', () => addTask());
