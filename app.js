// Sélection des éléments HTML
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const errorMsg = document.getElementById("error-msg");

// Charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadTasksFromAPI(); // appel à l’API
});

// Écouteur pour ajouter une tâche
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();

  if (taskText === "") {
    errorMsg.textContent = "⚠️ Entrez une tâche !";
    return;
  }

  errorMsg.textContent = "";
  addTask(taskText);
  input.value = "";
});

// Ajouter une tâche (DOM + localStorage)
function addTask(text) {
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
  saveTaskToStorage(text);
}

// Sauvegarder dans localStorage
function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger depuis localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task));
}

// Supprimer du localStorage
function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Appeler l'API pour récupérer 5 tâches
async function loadTasksFromAPI() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

    if (!response.ok) {
      throw new Error("Erreur API");
    }

    const apiTasks = await response.json();

    apiTasks.forEach(task => {
      if (!isTaskAlreadySaved(task.title)) {
        addTask(task.title);
      }
    });

  } catch (error) {
    errorMsg.textContent = "❌ Impossible de charger les tâches depuis l'API.";
  }
}

// Vérifier si une tâche existe déjà dans le stockage
function isTaskAlreadySaved(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.includes(text);
}
