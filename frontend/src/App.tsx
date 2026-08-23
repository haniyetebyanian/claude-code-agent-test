import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
  type Task,
} from "./api";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError("Could not load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setError(null);
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create task");
    }
  }

  async function handleToggle(task: Task) {
    try {
      setError(null);
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch {
      setError("Could not update task");
    }
  }

  async function handleDelete(id: number) {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Could not delete task");
    }
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          maxLength={255}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
