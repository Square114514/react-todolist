import Todo from "../types/Todo";
import { createTodoFromAddPayload, TodoAction } from "../types/TodoActions";

export default function todosReducer(
  state: Todo[],
  action: TodoAction,
): Todo[] {
  switch (action.type) {
    case "ADD": {
      const newTodo: Todo = createTodoFromAddPayload(action.payload);
      return [newTodo, ...state];
    }

    case "DELETE": {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case "EDIT": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );
    }

    case "TOGGLE": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    }

    case "CLEAR_COMPLETED": {
      return state.filter((todo) => !todo.completed);
    }

    default: {
      const _exhaustive: never = action; // 把 action 赋给一个类型为 never 的变量: 以后若在 TodoAction 里加了新 type 却忘了写分支，会报错
      return state;
    }
  }
}
