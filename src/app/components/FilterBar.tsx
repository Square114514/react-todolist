import { useEffect, useState } from "react";
import { FilterType, SortOrder } from "../types/Todo";

interface FilterProps {
  currentFilter: FilterType;
  currentSort: SortOrder;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: () => void;
  onSearch: (text: string) => void;
}

export default function FilterBar({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
  onSearch,
}: FilterProps) {
  const filters: FilterType[] = ["all", "active", "completed"];
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const text = inputValue.trim();

    if (!text) {
      onSearch("");
      return;
    } // fix: 为空时不再筛选

    onSearch(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  const handleClear = () => {
    onSearch("");
    setInputValue("");
  };

  return (
    <div className="flex gap-3 mb-5 items-baseline">
      <div>
        {filters.map((filter) => (
          <button
            className={`border-b-2 px-4 hover:border-b-emerald-500 transition dark:text-gray-300 ${
              currentFilter === filter
                ? "border-b-emerald-600 border-b-3 shadow-lg"
                : ""
            }`}
            key={filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <button
        className="hover:text-emerald-700 transition dark:text-gray-300"
        onClick={onSortChange}
      >
        {currentSort === "latest" ? "latest" : "oldest"}
      </button>

      <div className="flex ml-auto gap-2 bg-gray-50 rounded-lg px-2 pt-1 shadow-md dark:bg-gray-800 dark:border-gray-500">
        <input
          className="border-b-2 border-emerald-700 bg-transparent text-gray-900 placeholder:text-gray-500 dark:text-gray-200 dark:placeholder:text-gray-400 focus:outline-none focus:border-emerald-600 focus:shadow-xl hover:border-b-emerald-500 transition"
          type="text"
          placeholder="search your todos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClear();
          }}
        />
        <button
          className=" px-2 text-gray-600 rounded-lg  hover:bg-gray-300 transition dark:text-gray-400"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
