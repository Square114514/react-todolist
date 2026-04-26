import Todo from "../types/Todo";

interface ItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TodoItem({ todo, onDelete, onToggle }: ItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span> {todo.text} </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
