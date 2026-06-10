"use client";
import { useCallback, useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import List from "./List";
import TodoStats from "./TodoStats";
import FilterBar from "./FilterBar";
import Title from "./Title";
import { FilterType, SortOrder } from "../types/Todo";
import { useTodosContext } from "../context/TodosContext";
import Pagination from "./Pagination";

export default function TodoList() {
  const { todos } = useTodosContext();

  const [filter, setFilter] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback((searchText: string) => {
    setSearchQuery(searchText.toLowerCase());
    setCurrentPage(1);
  }, []);

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

  const totalPages = Math.max(1, Math.ceil(proceededTodos.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedTodos = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;

    return proceededTodos.slice(start, start + pageSize);
  }, [safeCurrentPage, proceededTodos, pageSize]);

  return (
    <div className="w-full max-w-4xl bg-amber-50 rounded-2xl shadow-xl p-8 dark:bg-gray-900 transition">
      <Title />
      <AddTodo />
      <TodoStats />
      <FilterBar
        currentFilter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setCurrentPage(1);
        }}
        currentSort={sortOrder}
        onSortChange={() => {
          setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
          setCurrentPage(1);
        }}
        onSearch={handleSearch}
      />
      <List todos={paginatedTodos} />
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={proceededTodos.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onSizeChange={setPageSize}
      />
    </div>
  );
}
