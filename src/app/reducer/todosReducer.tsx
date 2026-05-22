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
      };
      return [newTodo, ...state];
    }

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
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

    case "SET_TODOS":
      return action.payload.todos;

    default:
      return state;
  }
}
