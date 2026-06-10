interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSizeChange: (pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 15] as const;

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onSizeChange,
}: PaginationProps) {
  if (totalItems <= pageSize) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {start} - {end} / {totalItems}
        </span>
        <select
          value={pageSize}
          aria-label="pagesize"
          className="rounded-md border border-gray-200 bg-white pl-1 py-0.5 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          onChange={(e) => {
            onSizeChange(Number(e.target.value)); // 读出来是 string，所以转换成 number
            onPageChange(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((p) => {
            return (
              <option key={p} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg px-3 py-1.5 text-sm text-gray-700 transition hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-300"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
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
