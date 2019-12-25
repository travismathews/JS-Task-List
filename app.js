// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

// Load all event listeners

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear Tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from LS

function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"</i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });
}

//Add task

function addTask(e) {
    if(taskInput.value === ''){
        alert('Please add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"</i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();

}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        //console.log(e.target);
        if(confirm('Are you sure you want to remove the task?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(){
    // As the task list grows innerHTML takes longer than the while loop
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display ="block"
        } else {
            task.style.display = 'none';
        }


    });
}












