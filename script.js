document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);
  input.value = "";
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    li.remove();
    updateTasks();
  };

  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  const taskEls = document.querySelectorAll("#taskList li");
  const tasks = Array.from(taskEls).map(li => ({
    text: li.firstChild.textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}