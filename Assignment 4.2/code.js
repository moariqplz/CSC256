// Initialize an array to hold the tasks
let tasks = [];

// Function to add a new task
function addTask() {
    // Get the input value
    const inputElement = document.getElementById('taskInput');
    const taskText = inputElement.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new task object
        const newTask = {
            text: taskText,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Update the task list display
        displayTasks();

        // Clear the input field
        inputElement.value = "";
    } else {
        alert("Please enter a task.");
    }
}

// Function to toggle the completion status of a task
function toggleTaskCompletion(index) {
    // Toggle the completed status of the task
    tasks[index].completed = !tasks[index].completed;

    // Update the task list display
    displayTasks();
}

// Function to remove completed tasks
function clearCompletedTasks() {
    // Filter out the completed tasks
    tasks = tasks.filter(task => !task.completed);

    // Update the task list display
    displayTasks();
}

// Function to display tasks in the HTML
function displayTasks() {
    // Get the task list element
    const taskListElement = document.getElementById('taskList');
    
    // Clear the current list
    taskListElement.innerHTML = "";

    // Iterate through the tasks array
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        // Add a completed class if the task is completed
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Add a click event to toggle completion status
        listItem.addEventListener('click', () => toggleTaskCompletion(i));

        // Append the list item to the task list
        taskListElement.appendChild(listItem);
    }
}

// Add event listeners to buttons
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('clearCompletedButton').addEventListener('click', clearCompletedTasks);

// Initial display of tasks (empty initially)
displayTasks();