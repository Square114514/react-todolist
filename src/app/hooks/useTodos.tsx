"use client";

import { useCallback, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { todosReducer } from "../reducer/todosReducer";
import Todo from "../types/Todo";

const STORAGE_KEY = "todo_list_data";

function readTodosFromStorage(): Todo[] {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

export default function useTodos() {
  const [todos, dispatch] = useReducer(
    todosReducer,
    undefined, // initialArg：传给 init 的种子
    () => readTodosFromStorage(), // init：惰性初始化函数
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      console.error("Failed to save todo_list_data");
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", payload: { text } });
    toast.success("Todo added");
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
    toast.success("Todo deleted");
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    dispatch({ type: "EDIT", payload: { id, text: newText } });
    toast.success("Todo edited");
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE", payload: { id } });
    toast.success("Todo toggled");
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "CLEAR_COMPLETED" });
    toast.success("Completed todos cleared");
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
  };
}
