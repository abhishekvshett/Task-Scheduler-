// Access DOM elements
const taskNameInput = document.getElementById('task-name');
const taskTimeInput = document.getElementById('task-time');
const taskRecurrenceInput = document.getElementById('task-recurrence');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Task array to hold all tasks
let tasks = [];

// Function to add a new task
addTaskButton.addEventListener('click', () => {
  const taskName = taskNameInput.value;
  const taskTime = new Date(taskTimeInput.value);
  const taskRecurrence = taskRecurrenceInput.value;

  if (taskName && taskTime && taskRecurrence) {
    const task = {
      name: taskName,
      time: taskTime,
      recurrence: taskRecurrence,
    };

    // Add task to the task array
    tasks.push(task);
    
    // Display task in the task list
    displayTasks();

    // Set a notification for this task
    setNotification(task);

    // Clear the form
    taskNameInput.value = '';
    taskTimeInput.value = '';
    taskRecurrenceInput.value = 'none';
  }
});

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    
    li.innerHTML = `
      <div class="task-name">${task.name}</div>
      <div class="task-time">${task.time.toLocaleString()}</div>
      <div class="task-recurrence">Recurrence: ${task.recurrence}</div>
    `;
    
    taskList.appendChild(li);
  });
}

// Function to set notifications for tasks
function setNotification(task) {
  const now = new Date();
  const timeDifference = task.time - now;

  // Check if the task time is in the future
  if (timeDifference > 0) {
    setTimeout(() => {
      alert(`Reminder: ${task.name} is due now!`);

      // If the task is recurring, set up a new notification based on recurrence
      if (task.recurrence === 'daily') {
        task.time.setDate(task.time.getDate() + 1); // Add one day
      } else if (task.recurrence === 'weekly') {
        task.time.setDate(task.time.getDate() + 7); // Add one week
      } else if (task.recurrence === 'monthly') {
        task.time.setMonth(task.time.getMonth() + 1); // Add one month
      } else {
        return;
      }

      // Set a new notification for the next occurrence
      setNotification(task);

      // Notify again for the next recurrence
    }, timeDifference);
  }
}
