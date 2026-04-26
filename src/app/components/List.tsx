import Todo from "../types/Todo";
import TodoItem from "./TodoItem";

interface ListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function List({ todos, onDelete, onToggle }: ListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-400 mt-6">No todos~</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
