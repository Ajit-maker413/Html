// Task type
type Task = {
    id: number;
    text: string;
    date: string;
    completed: boolean;
};

// Get elements
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const filter = document.getElementById("filter") as HTMLSelectElement;

// Task array
let tasks: Task[] = [];

// Add task
addBtn.addEventListener("click", (): void => {
    const text: string = taskInput.value.trim();
    const date: string = dueDateInput.value;

    if (text === "") return;

    const task: Task = {
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    dueDateInput.value = "";

    displayTasks();
});

// Display tasks
function displayTasks(): void {
   taskList.innerHTML = "";


    let filteredTasks: Task[] = tasks;

    if (filter.value === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filter.value === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    for (let task of filteredTasks) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = (): void => {
            task.completed = !task.completed;
            displayTasks();
        };

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = task.date;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "small";
        delBtn.onclick = (): void => {
            tasks = tasks.filter(t => t.id !== task.id);
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    }
}

// Filter change
filter.addEventListener("change", displayTasks);
