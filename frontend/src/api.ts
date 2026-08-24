export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // response had no JSON body
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function listTasks(): Promise<Task[]> {
  return fetch(`${BASE}/tasks`).then((r) => handle<Task[]>(r));
}

export function createTask(title: string): Promise<Task> {
  return fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then((r) => handle<Task>(r));
}

export function updateTask(
  id: number,
  updates: Partial<Pick<Task, 'title' | 'completed'>>
): Promise<Task> {
  return fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }).then((r) => handle<Task>(r));
}

export function deleteTask(id: number): Promise<void> {
  return fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' }).then((r) => handle<void>(r));
}
