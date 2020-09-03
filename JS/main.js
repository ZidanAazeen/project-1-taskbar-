//Define UI element
let taskForm = document.querySelector('#add-task-form');
let addTask = document.querySelector('#add-task');
let filterList = document.querySelector('#filter-list');
let taskUl = document.querySelector('ul');
let clearTask = document.querySelector('#clear-task');

//define event listeners
taskForm.addEventListener('submit', inputTask);
taskUl.addEventListener('click', removeTask);
clearTask.addEventListener('click', clearFullTask);
filterList.addEventListener('keyup', filterData);
document.addEventListener('DOMContentLoaded', taskInBrowser);

//define functions
function inputTask(e) {
    if (addTask.value === '') {
        alert('Add some task first');
    } else {
        let taskLi = document.createElement('li');
        taskLi.appendChild(document.createTextNode(addTask.value + ' '));
        taskUl.appendChild(taskLi);
        let crossLink = document.createElement('a');
        crossLink.setAttribute('href', '#');
        crossLink.innerHTML = 'x';
        taskLi.appendChild(crossLink);

        //local storage store
        storeTaskInLocalStorage(addTask.value);
        addTask.value = '';
    }
    e.preventDefault();
}

//remove task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let removeEle = e.target.parentElement;
            removeEle.remove();
            removeFromLS(removeEle);
        }
    }
}

//clear full task
function clearFullTask() {
    // taskUl.innerHTML = '';
    while (taskUl.firstChild) {
        taskUl.removeChild(taskUl.firstChild);
    }
    localStorage.clear();
}

//define filter data 
function filterData(e) {
    let inputFilter = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let checkingLi = task.firstChild.textContent;
        if (checkingLi.toLowerCase().indexOf(inputFilter) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

//store in local storage 
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//getting data in browser
function taskInBrowser() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let taskLi = document.createElement('li');
        taskLi.appendChild(document.createTextNode(task + ' '));
        taskUl.appendChild(taskLi);
        let crossLink = document.createElement('a');
        crossLink.setAttribute('href', '#');
        crossLink.innerHTML = 'x';
        taskLi.appendChild(crossLink);
    })
}

//remove task from local store
function removeFromLS(removeTask) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let removeTasks = removeTask;
    removeTasks.removeChild(removeTasks.lastChild);
    tasks.forEach((first, second) => {
        if (removeTasks.textContent.trim() === first) {
            tasks.splice(second, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}