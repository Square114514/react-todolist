import { memo, useState } from "react";
import Todo from "../types/Todo";
import { useTodosContext } from "../context/TodosContext";

interface ItemProps {
  todo: Todo;
}

function TodoItem({ todo }: ItemProps) {
  const { deleteTodo, editTodo, toggleTodo } = useTodosContext();
  const priority = todo.priority ?? "medium";

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    const newText = editText.trim();

    if (!newText) return;

    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li className="flex mb-3 items-center justify-between bg-white rounded-lg shadow-sm p-3 hover:shadow-lg transition dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <input
            className="dark:text-gray-300 dark:border-b-gray-100 flex-1 px-4 py-3 border-b-2 min-w-65 h-8 border-gray-800 focus:outline-none focus:border-gray-400 focus:shadow-md transition"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") {
                setIsEditing(false);
                setEditText(todo.text);
              }
            }}
            autoFocus
          ></input>
        ) : (
          <div>
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

      <div className="flex gap-2">
        {isEditing ? (
          <button
            className="bg-gray-500 text-white rounded-lg w-15 py-1 hover:bg-gray-600 transition"
            onClick={() => handleEdit()}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
            }}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-gray-500 text-white rounded-lg w-15 py-1 hover:bg-gray-600 transition"
            onClick={() => setIsEditing(true)}
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
