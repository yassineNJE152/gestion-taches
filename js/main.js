import {
  addTask,
  saveTaskToStorage,
  loadTasks,
  isTaskAlreadySaved
} from './taskManager.js';

import { fetchTasksFromAPI } from './api.js';

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const errorMsg = document.getElementById("error-msg");

// Ajouter une tâche manuellement
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = input.value.trim();

  if (taskText === "") {
    errorMsg.textContent = "⚠️ Entrez une tâche !";
    return;
  }

  addTask(taskText, list, errorMsg);
  input.value = "";
});

// Chargement initial
document.addEventListener("DOMContentLoaded", async () => {
  loadTasks(list, addTask, errorMsg);

  try {
    const tasks = await fetchTasksFromAPI();

    const exemples = [
      "Planifier la réunion d'équipe",
      "Envoyer le rapport mensuel",
      "Réviser le cahier des charges",
      "Contacter le client X",
      "Mettre à jour la documentation technique"
    ];

    let i = 0;

    tasks.forEach(t => {
      const customTitle = exemples[i] || `Tâche ${i + 1}`;
      if (!isTaskAlreadySaved(customTitle)) {
        addTask(customTitle, list, errorMsg);
      }
      i++;
    });

  } catch (err) {
    errorMsg.textContent = "❌ Erreur chargement API.";
  }
});
