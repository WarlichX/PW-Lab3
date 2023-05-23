"use strict";

// Get elements from the DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

// Array to store the tasks
let tasks = [];

// Function to render the tasks on the page
function renderTasks() {
  // Clear the existing lists
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // Render tasks in the "to-do" and "done" lists
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('flex', 'items-center', 'justify-between', 'border', 'border-gray-300', 'rounded', 'px-4', 'py-2');
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded focus:outline-none done-btn">Done</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none remove-btn">Remove</button>
      </div>
    `;

    // Add event listeners to the buttons
    const doneButton = taskItem.querySelector('.done-btn');
    doneButton.addEventListener('click', () => markTaskAsDone(task));
    
    const removeButton = taskItem.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => removeTask(task));

    // Append the task item to the appropriate list
    if (task.done) {
      doneList.appendChild(taskItem);
    } else {
      todoList.appendChild(taskItem);
    }
  });
}

// Function to add a new task
function addTask(text) {
  const task = {
    text,
    done: false
  };

  tasks.push(task);
  renderTasks();
  saveTasksToLocalStorage();
}

// Function to mark a task as done
function markTaskAsDone(task) {
  task.done = true;
  renderTasks();
  saveTasksToLocalStorage();
}

// Function to remove a task
function removeTask(task) {
  const index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasksToLocalStorage();
  }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Event listener for the form submission
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    addTask(text);
    todoInput.value = '';
  }
});

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
