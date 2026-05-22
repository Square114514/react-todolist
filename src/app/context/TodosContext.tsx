"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Todo from "../types/Todo";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodoAction } from "../types/TodoActions";
import todosReducer from "../reducers/todosReducer";
import toast from "react-hot-toast";

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
}

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todo_list_data", []);

  const dispatchAndPersist = useCallback(
    (action: TodoAction) => {
      setTodos((prev) => todosReducer(prev, action));

      // 副作用必须放在 updater 外：updater 在渲染阶段执行，且开发模式可能被调用两次
      if (action.type === "ADD") toast.success("Todo added");
      if (action.type === "DELETE") toast.success("Todo deleted");
    },
    [setTodos],
  );

  const addTodo = useCallback(
    (text: string) => {
      dispatchAndPersist({
        type: "ADD",
        payload: {
          text,
          id: uuidv4(),
          createdAt: Date.now(),
        },
      });
    },
    [dispatchAndPersist],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      dispatchAndPersist({
        type: "DELETE",
        payload: { id },
      });
    },
    [dispatchAndPersist],
  );

  const editTodo = useCallback(
    (id: string, newText: string) => {
      dispatchAndPersist({
        type: "EDIT",
        payload: {
          id: id,
          text: newText,
        },
      });
    },
    [dispatchAndPersist],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      dispatchAndPersist({
        type: "TOGGLE",
        payload: {
          id,
        },
      });
    },
    [dispatchAndPersist],
  );

  const clearCompleted = useCallback(() => {
    dispatchAndPersist({ type: "CLEAR_COMPLETED" });
  }, [dispatchAndPersist]);

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
      clearCompleted,
    }),
    [todos, addTodo, deleteTodo, editTodo, toggleTodo, clearCompleted],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodosContext(): TodosContextValue {
  const ctx = useContext(TodosContext);
  if (ctx === null)
    throw new Error("useTodosContext must be used within TodosProvider");
  return ctx;
}
