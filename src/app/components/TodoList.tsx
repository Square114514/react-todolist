"use client";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import Todo, { FilterType, SortOrder } from "../types/Todo";
import List from "./List";
import { v4 as uuidv4 } from "uuid";
import TodoStats from "./TodoStats";
import FilterBar from "./FilterBar";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todo_list_data"); // 禁用了 SSR，可以直接读取 localStorage，不会有水合错误
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo_list_data", JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const proceededTodos = todos // 优化三个链式调用的顺序（原本filter、sort、search
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) => {
      return todo.text.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      if (sortOrder === "oldest") return a.createdAt - b.createdAt;
      else return b.createdAt - a.createdAt;
    });

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(), //从 Date 改为 uuid
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // 从 function 改为 const
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const changeFilter = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const changeSort = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const searchTodo = (searchText: string) => {
    setSearchQuery(searchText.toLowerCase());
  };

  return (
    <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-xl p-8">
      <h1 className="text-5xl font-bold mb-4 text-emerald-900">TodoList</h1>
      <AddTodo onAdd={addTodo} />
      <TodoStats todos={todos} onClear={clearCompleted} />
      <FilterBar
        currentFilter={filter}
        onFilterChange={changeFilter}
        currentSort={sortOrder}
        onSortChange={changeSort}
        onSearch={searchTodo}
      />
      <List
        todos={proceededTodos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}
