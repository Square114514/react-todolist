import { memo, useState } from "react";
import Todo from "../types/Todo";
import { useTodosContext } from "../context/TodosContext";

interface ItemProps {
  todo: Todo;
}

function TodoItem({ todo }: ItemProps) {
  const { deleteTodo, editTodo, toggleTodo } = useTodosContext();

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
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <input
            className="dark:text-gray-300 dark:border-b-gray-100 flex-1 px-4 py-3 border-b-2 min-w-80 h-8 border-gray-800 focus:outline-none focus:border-gray-400 focus:shadow-md transition"
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
          <span
            className={`text-lg ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 font-medium dark:text-gray-200"
            }`}
          >
            {" "}
            {todo.text}
          </span>
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
