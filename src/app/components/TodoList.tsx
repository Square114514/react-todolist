"use client";
import { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "../types/Todo";
import List from "./List";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(), //从 Date 改为 uuid
      text,
      completed: false,
      createAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // 从 function 改为 const
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-xl p-8">
      <h1 className="text-5xl font-bold mb-4 text-emerald-900">TodoList</h1>
      <AddTodo onAdd={addTodo} />
      <List todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
}
