import { TodoPriority } from "./Todo";

export type TodoAction =
  | { type: "ADD"; payload: { text: string; priority?: TodoPriority } }
  | { type: "DELETE"; payload: { id: string } }
  | {
      type: "EDIT";
      payload: { id: string; text: string; priority?: TodoPriority };
    }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" };
