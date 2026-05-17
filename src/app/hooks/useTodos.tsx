"use client";

import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import Todo from "../types/Todo";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todo_list_data", []);

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: uuidv4(), //从 Date 改为 uuid
        text,
        completed: false,
        createdAt: Date.now(),
      };

      setTodos((prev) => [newTodo, ...prev]);
      toast.success("Todo added");
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id)); // 从 function 改为 const
      toast.success("Todo deleted");
    },
    [setTodos],
  );

  const editTodo = useCallback(
    (id: string, newText: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo,
        ),
      );
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  return {
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
  };
}
