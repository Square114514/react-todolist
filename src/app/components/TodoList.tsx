"use client";
import { useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import List from "./List";
import TodoStats from "./TodoStats";
import FilterBar from "./FilterBar";
import Title from "./Title";
import { FilterType, SortOrder } from "../types/Todo";
import { useTodosContext } from "../context/TodosContext";

export default function TodoList() {
  const { todos } = useTodosContext();

  const [filter, setFilter] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const proceededTodos = useMemo(() => {
    return todos // 优化三个链式调用的顺序（原本filter、sort、search
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
  }, [todos, filter, sortOrder, searchQuery]); // 使用useMemo，依赖变化才重新计算

  return (
    <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-xl p-8 dark:bg-gray-900 transition">
      <Title />
      <AddTodo />
      <TodoStats />
      <FilterBar
        currentFilter={filter}
        onFilterChange={(newFilter) => setFilter(newFilter)}
        currentSort={sortOrder}
        onSortChange={() =>
          setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
        }
        onSearch={(searchText) => setSearchQuery(searchText.toLowerCase())}
      />
      <List todos={proceededTodos} />
    </div>
  );
}
