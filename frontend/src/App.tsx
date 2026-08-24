import { useEffect, useState, type FormEvent } from 'react';
import { type Task, listTasks, createTask, updateTask, deleteTask } from './api';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setError(null);
      setTasks(await listTasks());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    try {
      setError(null);
      const task = await createTask(value);
      setTasks((prev) => [task, ...prev]);
      setTitle('');
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleToggle(task: Task) {
    try {
      setError(null);
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleDelete(id: number) {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          value={title}
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.target.value)}
          aria-label="New task title"
        />
        <button type="submit" disabled={!title.trim()}>
          Add
        </button>
      </form>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="muted">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task completed' : 'task'}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <span className="title">{task.title}</span>
              </label>
              <button
                className="delete"
                onClick={() => handleDelete(task.id)}
                aria-label={`Delete ${task.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {!loading && tasks.length > 0 && (
        <p className="muted">
          {remaining} of {tasks.length} remaining
        </p>
      )}
    </main>
  );
}
