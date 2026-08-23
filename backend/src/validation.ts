export function validateTitle(title: unknown): string | null {
  if (typeof title !== "string") {
    return "Title must be a string";
  }

  const trimmed = title.trim();

  if (trimmed.length === 0) {
    return "Title is required";
  }

  if (trimmed.length > 255) {
    return "Title must be at most 255 characters";
  }

  return null;
}

export function validateCompleted(completed: unknown): string | null {
  if (typeof completed !== "boolean") {
    return "Completed must be a boolean";
  }

  return null;
}
