"use client";

import { createContext, useContext, type ReactNode } from "react";
import useTodos from "../hooks/useTodos";
import Todo, { TodoPriority } from "../types/Todo";

export type TodosContextValue = {
  todos: Todo[];
  addTodo: (text: string, priority?: TodoPriority) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string, priority?: TodoPriority) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const value = useTodos();

  return <TodosContext value={value}>{children}</TodosContext>;
}

export function useTodosContext(): TodosContextValue {
  const ctx = useContext(TodosContext);

  if (ctx === null)
    throw new Error("useTodosContext must be used within TodosProvider");

  return ctx;
}
