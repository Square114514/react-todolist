import Todo from "../types/Todo";
import TodoItem from "./TodoItem";

interface ListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function List({ todos, onDelete, onToggle }: ListProps) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}
