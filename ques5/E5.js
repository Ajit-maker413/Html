// Array to store tasks
let tasks = [];

const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', addTask);
filter.addEventListener('change', renderTasks);

function addTask() {
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (text === '') return;

    tasks.push({
        text: text,
        completed: false,
        due: dueDate ? new Date(dueDate) : null
    });

    sortTasks();
    taskInput.value = '';
    dueDateInput.value = '';
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function sortTasks() {
    tasks.sort((a, b) => {
        if (!a.due) return 1;
        if (!b.due) return -1;
        return a.due - b.due;
    });
}

function renderTasks() {
    taskList.innerHTML = '';
    const currentFilter = filter.value;

    tasks.forEach((task, index) => {
        if (currentFilter === 'completed' && !task.completed) return;
        if (currentFilter === 'pending' && task.completed) return;

        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.innerHTML = task.text +
            (task.due ? `<div class="date">Due: ${task.due.toDateString()}</div>` : '');
        span.onclick = () => toggleTask(index);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.className = 'small';
        delBtn.onclick = () => removeTask(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}
