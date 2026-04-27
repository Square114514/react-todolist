import Todo from "../types/Todo";

export default function TodoStats({ todos }: { todos: Todo[] }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed === true).length;

  return (
    <div className="mb-6">
      <span className="text-sm text-gray-600">
        Total: {total} | Completed: {completed}
      </span>
    </div>
  );
}
