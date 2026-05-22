import Todo from "../types/Todo";
import TodoItem from "./TodoItem";

interface ListProps {
  todos: Todo[];
}

export default function List({ todos }: ListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No todos~
        <br />
        Try changing filters or add a new task.
      </p>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
