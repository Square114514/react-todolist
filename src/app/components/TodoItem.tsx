import { memo, useState } from "react";
import Todo, { TodoPriority } from "../types/Todo";
import { useTodosContext } from "../context/TodosContext";

interface ItemProps {
  todo: Todo;
}

function TodoItem({ todo }: ItemProps) {
  const { deleteTodo, editTodo, toggleTodo } = useTodosContext();
  const priorities: TodoPriority[] = ["low", "medium", "high"];
  const [priority, setPriority] = useState(todo.priority ?? "medium");

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    const newText = editText.trim();

    if (!newText) return;

    editTodo(todo.id, newText, priority);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-wrap sm:flex-nowrap mb-3 items-center gap-2 bg-white rounded-lg shadow-sm p-3 hover:shadow-lg transition dark:bg-gray-800">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <input
          type="checkbox"
          className="shrink-0"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <input
              className="min-w-0 flex-1 w-0 px-2 sm:px-3 py-1 border-b-2 h-8 border-gray-800 text-gray-900 placeholder:text-gray-500 dark:text-gray-300 dark:border-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-400 focus:shadow-md transition"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEdit();
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditText(todo.text);
                  setPriority(todo.priority ?? "medium");
                }
              }}
              autoFocus
            />
            <select
              className="shrink-0 py-1 pl-1 border-2 border-emerald-700 rounded-md bg-white text-sm text-gray-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 cursor-pointer dark:bg-gray-800 dark:text-gray-200 dark:border-emerald-600"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriority)}
              aria-label="priority"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="min-w-0">
            <span
              className={`text-lg mx-2 ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800 font-medium dark:text-gray-200"
              }`}
            >
              {todo.text}
            </span>
            <span
              className={` text-xs px-2 py-0.5 rounded-full ${
                priority === "high"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : priority === "medium"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {priority}
            </span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 gap-2 ml-auto">
        {isEditing ? (
          <button
            className="bg-gray-500 text-white rounded-lg min-w-15 px-2 py-1 hover:bg-gray-600 transition"
            onClick={() => handleEdit()}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-gray-500 text-white rounded-lg min-w-15 px-2 py-1 hover:bg-gray-600 transition"
            onClick={() => {
              setEditText(todo.text);
              setPriority(todo.priority ?? "medium");
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}

        <button
          className="bg-amber-500 text-white rounded-lg px-3 py-1 hover:bg-amber-600 transition"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default memo(TodoItem); // 避免无意义重渲染
