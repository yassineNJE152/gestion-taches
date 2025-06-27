export function addTask(text, list, errorMsg, save = true) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromStorage(text);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);

  if (save) {
    saveTaskToStorage(text);
  }

  errorMsg.textContent = "";
}

export function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks(list, addTask, errorMsg) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task, list, errorMsg, false));
}

export function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function isTaskAlreadySaved(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.includes(text);
}
