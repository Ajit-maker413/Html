// Get elements
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDate");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var filter = document.getElementById("filter");
// Task array
var tasks = [];
// Add task
addBtn.addEventListener("click", function () {
    var text = taskInput.value.trim();
    var date = dueDateInput.value;
    if (text === "")
        return;
    var task = {
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
function displayTasks() {
    taskList.innerHTML = "";
    var filteredTasks = tasks;
    if (filter.value === "completed") {
        filteredTasks = tasks.filter(function (t) { return t.completed; });
    }
    else if (filter.value === "pending") {
        filteredTasks = tasks.filter(function (t) { return !t.completed; });
    }
    var _loop_1 = function (task) {
        var li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        var span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = function () {
            task.completed = !task.completed;
            displayTasks();
        };
        var dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = task.date;
        var delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "small";
        delBtn.onclick = function () {
            tasks = tasks.filter(function (t) { return t.id !== task.id; });
            displayTasks();
        };
        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    };
    for (var _i = 0, filteredTasks_1 = filteredTasks; _i < filteredTasks_1.length; _i++) {
        var task = filteredTasks_1[_i];
        _loop_1(task);
    }
}
// Filter change
filter.addEventListener("change", displayTasks);
