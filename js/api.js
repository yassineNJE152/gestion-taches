export async function fetchTasksFromAPI() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!response.ok) {
    throw new Error("Erreur API");
  }
  return await response.json();
}
