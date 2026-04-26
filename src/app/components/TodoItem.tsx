import Todo from "../types/Todo";

interface ItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TodoItem({ todo, onDelete, onToggle }: ItemProps) {
  return (
    <li className="flex mb-3 items-center justify-between bg-white rounded-lg shadow-sm p-3">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={`text-lg ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800 font-medium"
          }`}
        >
          {" "}
          {todo.text}{" "}
        </span>
      </div>
      <button
        className="bg-amber-500 text-white rounded-lg px-3 py-1 hover:bg-amber-600 transition"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}
