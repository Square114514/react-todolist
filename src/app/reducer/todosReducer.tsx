import Todo from "../types/Todo";
import { TodoAction } from "../types/TodoActions";
import { v4 as uuidv4 } from "uuid";

export function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD": {
      const newTodo: Todo = {
        id: uuidv4(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
        priority: action.payload.priority ?? "medium", // 默认 medium
      };
      return [newTodo, ...state];
    }

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              priority: action.payload.priority ?? todo.priority,
            }
          : todo,
      );

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);
  }
}
