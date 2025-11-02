const STORAGE_KEY = "task-tracker.tasks";

/**
 * fetchTasks - it read tasks array from the localStorage and
 * @returns {Array}
 */
export const fetchTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("fetchTasks:", e);
    return [];
  }
};

/**
 * saveTasks - it save tasks array to localStorage
 * @param {Array} tasks
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("saveTasks:", e);
  }
};
