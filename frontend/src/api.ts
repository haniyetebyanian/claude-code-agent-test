export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const API_BASE = "/api/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Failed to create task");
  }
  return res.json();
}

export async function updateTask(
  id: number,
  data: { completed?: boolean; title?: string }
): Promise<Task> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
