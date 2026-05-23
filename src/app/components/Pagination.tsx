interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalItems <= pageSize) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {start}-{end} / {totalItems}
      </span>

      <div className="flex items-center gap-2">
        <button
          className="rounded-lg px-3 py-1.5 text-sm text-gray-700 transition hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentPage} / {totalPages}
        </span>
        <button
          className="rounded-lg px-3 py-1.5 text-sm text-gray-700 transition hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
