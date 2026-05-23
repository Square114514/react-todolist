"use client";

import { useState } from "react";
import { useTodosContext } from "../context/TodosContext";
import { TodoPriority } from "../types/Todo";

export default function AddTodo() {
  const { addTodo } = useTodosContext();
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");

  const priorities: TodoPriority[] = ["low", "medium", "high"];

  const handleSubmit = () => {
    const text = inputValue.trim();

    if (!text) return;

    addTodo(text, priority);
    setInputValue("");
  };

  return (
    <div className="flex items-center mb-2 gap-4">
      <input
        className="flex-1 px-4 py-3 border-b-2 w-full h-9 border-emerald-700 text-gray-900 placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400 focus:outline-none focus:border-emerald-600 focus:shadow-xl hover:border-b-emerald-500 transition"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="input your todos"
      />
      <select
        className="py-1 pl-1 border-2 border-emerald-700 rounded-md bg-white text-gray-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 cursor-pointer dark:bg-gray-800 dark:text-gray-200 dark:border-emerald-600"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TodoPriority)}
        aria-label="priority"
      >
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>
      <button
        className="bg-emerald-600 text-white text-lg px-5 py-2 rounded-xl hover:bg-emerald-700 hover:shadow-lg transition"
        onClick={handleSubmit}
      >
        Add Todo
      </button>
    </div>
  );
}
