export type TodoPriority = "low" | "medium" | "high";

export default interface Todo {
  id: string; // 从 Date 改为 uuid
  text: string;
  completed: boolean;
  createdAt: number;
  priority: TodoPriority;
}

export type FilterType = "all" | "active" | "completed";

export type SortOrder = "latest" | "oldest";

export type PriorityFilter = "all" | TodoPriority;
