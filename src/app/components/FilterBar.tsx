import { useState } from "react";
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

    if (!text) return;

    onSearch(text);
    setInputValue("");
  };

  return (
    <div className="flex gap-3 mb-5 items-baseline">
      <div>
        {filters.map((filter) => (
          <button
            className={`border-b-2 px-4 hover:border-b-emerald-500 transition ${
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
        className="hover:text-emerald-700 transition"
        onClick={onSortChange}
      >
        {currentSort === "latest" ? "latest" : "oldest"}
      </button>

      <div className="flex ml-auto gap-2 bg-gray-50 rounded-lg px-2  shadow-md">
        <input
          className="border-b-2 border-emerald-700 focus:outline-none focus:border-emerald-600 focus:shadow-xl hover:border-b-emerald-500 transition"
          type="text"
          placeholder="search your todos"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          className="bg-gray-500 px-2 py-0.5 text-white rounded-lg  hover:bg-gray-600 transition"
          onClick={() => handleSubmit()}
        >
          Search
        </button>
      </div>
    </div>
  );
}
