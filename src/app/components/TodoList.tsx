"use client";
import { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "../types/Todo";
import List from "./List";

let nextId: number = 1;

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: nextId++,
      text: text,
      completed: false,
      createAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  }

  return (
    <div>
      <h1>TodoList</h1>
      <AddTodo onAdd={addTodo} />
      <List todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
}
