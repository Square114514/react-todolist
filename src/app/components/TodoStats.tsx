import { useTodosContext } from "../context/TodosContext";

export default function TodoStats() {
  const { todos, clearCompleted } = useTodosContext();
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed === true).length;

  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <span className="text-sm text-gray-600">
        Completed: {completed} | Total: {total}
      </span>

      {completed > 0 ? (
        <button
          className="text-sm text-gray-600 hover:text-amber-600"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
