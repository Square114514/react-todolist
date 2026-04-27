import { FilterType } from "../types/Todo";

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterBar({
  currentFilter,
  onFilterChange,
}: FilterProps) {
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div className="flex gap-3 mb-5">
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
  );
}
